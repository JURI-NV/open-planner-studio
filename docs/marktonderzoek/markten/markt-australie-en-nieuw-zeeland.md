# Marktonderzoek: projectplanning-/schedulingsoftware in Australië en Nieuw-Zeeland (Oceanië)

**Peildatum onderzoek:** 25 juli 2026
**Regio:** Australië (AU) + Nieuw-Zeeland (NZ)
**Scope:** software voor projectplanning/scheduling met Gantt/CPM — bouw-/infra-specifiek, mijnbouwplanning, project-controls-platformen, generieke projectmanagementtools en lokale/regionale pakketten.
**Valuta-omrekening gebruikt in dit rapport:** 1 AUD = 0,69879 USD; 1 NZD = 0,57881 USD (ECB-referentiekoersen via frankfurter.dev, datum 24-07-2026 — https://api.frankfurter.dev/v1/latest?base=AUD&symbols=USD,NZD).

> **Leeswijzer bij cijfers.** Elk cijfer heeft een bron-URL. Waar geen publieke bron bestaat (met name: aantallen planners, softwarebestedingen per segment) staat er expliciet **[EIGEN SCHATTING]** met de gebruikte redenering en aannames. Waar een cijfer via een zoekmachine-snippet is verkregen en niet op de primaire pagina kon worden geverifieerd, staat **[via zoekresultaat, niet primair geverifieerd]**.

---

## 1. Samenvatting

**De kern in tien punten:**

1. **Oceanië is een "P6-land" aan de bovenkant en een "MS Project + Excel-land" aan de onderkant.** Oracle Primavera P6 is de de-facto standaard voor grote infrastructuur, mijnbouw, energie, olie & gas en defensie; Microsoft Project domineert het middensegment en de consultancy-/ingenieurskant; Excel blijft in het MKB en op korte-termijnniveau alomtegenwoordig. De Melbournse standaardauteur Eastwood Harris (Paul E. Harris) formuleert het als: *"The three main scheduling and control software packages used in Australia in the building, construction and resources industries are Microsoft Project, Oracle Primavera P6 and Elecosoft (Asta) Powerproject"* ([eastwoodharris.com](https://www.eastwoodharris.com/), via zoekresultaat). **[ONZEKER na verificatie 25-07-2026: de homepage is opgehaald; de site voert inderdaad boekenreeksen voor precies deze drie pakketten (Elecosoft Powerproject, Primavera P6, Microsoft Project), maar het geciteerde zinsdeel staat er **niet** letterlijk op. Bovendien vermeldt de site een **Brits** telefoonnummer (+44 203 174 0070), wat de aanduiding "Melbournse auteur" op zijn minst gedateerd maakt. Het productaanbod ondersteunt de strekking; het citaat zelf is niet primair bevestigd — gebruik het niet als woordelijke bron.]**

2. **Asta Powerproject is de sterke derde en groeit specifiek bij gebouwbouwers (Tier 1 builders).** Elecosoft/Eleco heeft één dominante ANZ-reseller, Solid Support (AU/NZ + Zuidoost-Azië), met eigen Australische helpdesk ([solidsupport.com.au/asta-powerproject](https://solidsupport.com.au/asta-powerproject/)). Referentiecase: Kapitol Group ("Tier One Australian builder") met **50+ Asta-gebruikers** en **10–15 live projecten** tegelijk ([solidsupport.com.au/kapitol-asta-powerproject](https://solidsupport.com.au/kapitol-asta-powerproject/)).

3. **De regio is een netto-*exporteur* van planningsoftware in één niche: mijnbouw.** Australië heeft een compleet eigen cluster van mine-scheduling-vendors — **Deswik** (Brisbane, **2008**; overname door Sandvik **aangekondigd december 2021**, daarna afgerond in 2022; AUD 79 mln omzet rolling-12m okt-2021; ~300 medewerkers; 10.000+ licenties) **[GECORRIGEERD: oprichtingsjaar 2007 → 2008 en "april 2022" → aankondiging december 2021, conform Sandviks eigen persbericht]**, **RPMGlobal/XPAC** (Brisbane, ASX:RUL; FY25-omzet **A$76,7 mln**, ARR **A$71,8 mln**, waarvan **24% "Scheduling"**), **Alastri** (overgenomen door Micromine, Perth) en **Minemax** (Perth; inmiddels onder Datamine). Micromine zelf werd in 2022 voor **A$900 mln** overgenomen door AspenTech. Zie §4.4.

4. **Prijzen zijn hoog en in AUD gepubliceerd — de regio krijgt géén korting.** Oracle P6 Professional (PPM) kost bij de Australische Platinum-partner Prescience **A$5.820 licentie + A$1.280 eerstejaars onderhoud = A$7.100 lijst** (A$6.809 met 5% webshopkorting) per named user ([prescience.com.au](https://www.prescience.com.au/product/primavera-p6-ppm/)). P6 EPPM: **A$6.360 + A$1.399 = A$7.759** ([prescience.com.au](https://www.prescience.com.au/product/primavera-p6-eppm/)). Omgerekend ≈ USD 4.960 resp. USD 5.422 — bovenin de wereldwijde bandbreedte.

5. **Asta is per zittende planner juist opvallend goedkoop en ANZ-exclusief geprijsd:** **A$2.060 per jaar** voor een single-user subscriptie inclusief 12 maanden Australische support, met de expliciete vermelding *"This licence is only available for Australian and New Zealand users"* ([solidsupport.com.au/buy-powerproject](https://solidsupport.com.au/buy-powerproject/)). Dat is ≈ USD 1.439/jaar — ongeveer een derde van de jaarlijkse kosten van P6 in jaar 1.

6. **Contractuele dwang is de belangrijkste aankoopdriver, niet functionaliteit.** Transport for NSW publiceert een eigen **Scheduling Schema and Specification**: *"This schema defines a standard structure for the organisation of project activities in Primavera P6"* ([transport.nsw.gov.au](https://www.transport.nsw.gov.au/news-and-events/reports-and-publications/scheduling-schema-and-specification)); de TfNSW Standard Requirements schrijven **Earned Value Management using Primavera P6** voor ([5TP-FT-425](https://www.transport.nsw.gov.au/sites/default/files/media/documents/2017/TfNSW%20Standard%20requirements%20(Contract%20version)%205TP-FT-425-1.0.pdf)). Defensie werkt met **AS 4817** (Australian Standard for EVM) + het Defence Supplement via ASDEFCON-templates.

7. **Nieuw-Zeeland is een kleine, sterk aan Australië gekoppelde satellietmarkt.** NZ heeft geen eigen CPM-vendor van betekenis; het kanaal loopt via Australische resellers (Solid Support voor Asta, Australische Oracle-partners voor P6) plus lokale trainers (o.a. Caduceus, Auckland). Volume: op Seek NZ ~114 "Primavera P6 Scheduler"- en ~111 "Planner"-vacatures tegen ~244/255 in Australië — grofweg een factor 2 kleiner in vacatureflow [via zoekresultaat, niet primair geverifieerd].

8. **De onderliggende markt is groot en groeit.** Australische bouwproductie: **A$83,36 mrd in het maartkwartaal 2026** (seizoensgecorrigeerd; gebouwen A$44,71 mrd, civiel A$38,65 mrd) → ordegrootte **A$333 mrd/jaar** ([ABS](https://www.abs.gov.au/statistics/industry/building-and-construction/construction-work-done-australia-preliminary/latest-release)). De publieke infrastructuurpijplijn staat op **A$242 mrd over vijf jaar**, een record ([Infrastructure Australia via emumoney](https://emumoney.com.au/news/20260407-infrastructure-pipeline-record-spending)). NZ: bouwwerk in uitvoering **NZD 31 mrd** (jaar t/m dec 2025, −7,2%) en een nationale pijplijn van ca. **NZD 275 mrd / ~12.000 projecten** ([Stats NZ / Te Waihanga, via zoekresultaat](https://tewaihanga.govt.nz/the-pipeline)).

9. **Mijn schatting van de directe softwaremarkt:** de **kernmarkt voor CPM-planningsseats** (bouw/infra/energie/defensie, exclusief mijnbouwplanning) in AU+NZ bedraagt **A$18–30 mln (USD 13–21 mln) per jaar**; inclusief project-controls-platformen, 4D, schedule-risk, korte-termijnplanning én ANZ-mijnbouwplanning kom ik op **A$116–210 mln (USD 81–147 mln) per jaar**. Volledige onderbouwing in §3.3. **[GECORRIGEERD bij verificatie 25-07-2026: hier stond A$130–210 mln (USD 90–147 mln); dat is in tegenspraak met de eigen optelling in §3.3, die A$115,5–210 mln geeft. De ondergrens van de samenvatting was ~12% te hoog.]** **[EIGEN SCHATTING]** Externe marktrapporten voor de bredere categorie "construction management software Australia" lopen sterk uiteen: USD 165 mln (2032, DataBridge) tot USD 443 mln (2030, Grand View) — zie §3.4.

10. **Aantal planners:** ik schat **8.000–14.000 professionele planners/schedulers in Australië** en **1.000–2.000 in Nieuw-Zeeland**, met een harde kern van ca. 4.000–6.500 die dagelijks in P6/Asta/MSP werkt. **[EIGEN SCHATTING]**, onderbouwd in §3.2. **[GECORRIGEERD: hier stond 4.000–6.000; de tabel in §3.2 hanteert 4.000–6.500.]**

**Wat dit betekent voor een nieuwe Gantt/CPM-tool:** de toegangsdrempel is niet de functionaliteit maar de **XER/XML-interoperabiliteit en de contractuele acceptatie**. Zonder betrouwbare P6-XER-import/-export is een product in AU/NZ onverkoopbaar aan alles wat met een overheidscontract of een Tier-1-onderaannemingsketen te maken heeft. Zie §8.

---

## 2. Methode, dekking en betrouwbaarheid

- **Bronnen:** primaire vendor-/reseller-pagina's (prijzen rechtstreeks uit Australische webshops geëxtraheerd), overheidspublicaties (ABS, Transport for NSW, Te Waihanga, Infrastructure Australia), beursdocumenten (RPMGlobal FY2025 investor presentation, PDF), acquisitieberichten, salaris- en vacaturebronnen, plus zoekmachine-resultaten voor breedtedekking.
- **Beperking 1:** de zoekbudgetten van dit onderzoek dwongen tot een mix van zoekmachine-snippets en directe pagina-fetches. Cijfers die uitsluitend uit een snippet komen, zijn als zodanig gemarkeerd.
- **Beperking 2:** er bestaat **geen publieke, betrouwbare marktomvangstatistiek** specifiek voor "CPM-planningsoftware in Oceanië". Alle omvangcijfers in §3.3 zijn eigen bottom-up schattingen; de externe rapporten in §3.4 meten een bredere en anders afgebakende categorie en spreken elkaar tegen.
- **Beperking 3:** enterprise-prijzen (InEight, Bentley SYNCHRO, RIB, Deswik, Oracle Primavera Cloud) zijn vrijwel altijd offerte-gebaseerd; publieke lijstprijzen ontbreken structureel.

---

## 3. Marktomvang

### 3.1 De onderliggende bouw-, infrastructuur- en mijnbouwmarkt

**Australië**

| Indicator | Waarde | Periode | Bron |
|---|---|---|---|
| Totale bouwproductie (construction work done, seizoensgecorrigeerd) | **A$83.360,6 mln** per kwartaal (≈ A$333 mrd/jaar) | maartkwartaal 2026, gepubliceerd 27-05-2026 | [ABS](https://www.abs.gov.au/statistics/industry/building-and-construction/construction-work-done-australia-preliminary/latest-release) |
| — waarvan gebouwen | A$44.708,6 mln | maartkwartaal 2026 | idem |
| — waarvan civiel/engineering | A$38.652,0 mln | maartkwartaal 2026 | idem |
| Kwartaalgroei totaal | +3,4% (civiel +6,9%, gebouwen +0,6%) | maartkwartaal 2026 | idem |
| Totale bouwmarkt (breed gedefinieerd) | **A$1,14 biljoen**, waarvan 28% publiek | Infrastructure Australia | [infrastructureaustralia.gov.au](https://www.infrastructureaustralia.gov.au) [via zoekresultaat] |
| Publieke major-infrastructuurpijplijn (5 jaar) | **A$242 mrd** — hoogste ooit gemeten; +A$29 mrd j-o-j | 2025/2026-rapportage | [Infrastructure Australia](https://www.infrastructureaustralia.gov.au) / [emumoney](https://emumoney.com.au/news/20260407-infrastructure-pipeline-record-spending) |
| Verwachte piek "major projects pipeline" | **A$80,3 mrd** in boekjaar 2026 | ANZ Research, april 2025 | [ANZ bluenotes](https://www.anz.com.au/bluenotes/2025/april/birch-australia-major-projects-pipeline/) |
| Projectvoorbeelden (schaal) | North East Link Melbourne **A$26,2 mrd**; North-South Corridor Adelaide **A$15,4 mrd**; Cross River Rail Brisbane **>A$10 mrd**; WestConnex **A$16 mrd** | 2025/2026 | [ANZ](https://www.anz.com.au/bluenotes/2025/april/birch-australia-major-projects-pipeline/), [Aphex](https://www.aphex.co/updates/construction-scheduling-software-in-australia) |
| Verwachte arbeidstekort bouw | **300.000 werkenden** tekort per medio 2027 zonder productiviteitshervorming | Infrastructure Australia | [via zoekresultaat](https://www.infrastructureaustralia.gov.au) |

**Nieuw-Zeeland**

| Indicator | Waarde | Periode | Bron |
|---|---|---|---|
| Value of building work put in place | **NZD 31 mrd** (−7,2% j-o-j) | jaar t/m december 2025 | [Stats NZ, via zoekresultaat](https://www.stats.govt.nz/) |
| — residentieel / niet-residentieel | NZD 19 mrd / NZD 12 mrd | idem | idem |
| Kwartaalwaarde | NZD 7,8 mrd (−8,5% j-o-j) | junikwartaal 2025 | idem |
| Nationale infrastructuurpijplijn | **~NZD 275 mrd** over ~12.000 projecten (meest recente update); NZD 237 mrd / 9.200 projecten in juni 2025; NZD 206,9 mrd in maart 2025 | 2025–2026 | [Te Waihanga](https://tewaihanga.govt.nz/the-pipeline) [via zoekresultaat] |
| Pijplijn als % bbp | ">4% van het bbp aan geplande infrastructuur" | juni 2025 | idem |

**Interpretatie.** De Australische bouwmarkt is momenteel in een **infrastructuur-hoogconjunctuur met een tekort aan mensen**, terwijl de Nieuw-Zeelandse bouwmarkt **krimpt** (−7,2% j-o-j) maar wel een grote pijplijn heeft. Dat verschil is relevant voor softwareverkoop: in AU is de bottleneck personeel (dus: tools die planners productiever maken verkopen goed); in NZ is de bottleneck budget (dus: prijs is doorslaggevender, en gratis/goedkope alternatieven winnen terrein).

### 3.2 Ordegrootte van het aantal planners **[EIGEN SCHATTING]**

Er is geen officiële telling. Ik leid een bandbreedte af uit drie onafhankelijke indicatoren:

**Indicator A — vacaturevoorraad (momentopname).**
Op Seek Australia stonden ~**244** vacatures onder "Primavera P6 Scheduler" en ~**255** onder "Primavera P6 Planner"; LinkedIn AU ~**234**–**347**; Jora ~**238** [alle via zoekresultaat, niet primair geverifieerd — Seek en Jora blokkeren directe uitlezing]. Deze verzamelingen overlappen sterk; ik neem als werkhypothese **~300–450 unieke openstaande P6-gerelateerde planningsvacatures in AU** op een willekeurig moment.

**Rekenstap:** bij een gemiddelde advertentieduur van ~1 maand impliceert 300–450 gelijktijdige vacatures **~3.600–5.400 vervullingen per jaar**. Bij een gemiddelde functieverblijfsduur van 2,5–3,5 jaar (hoog verloop, veel contracting) hoort een populatie van **~9.000–19.000**. Omdat een deel van die vacatures dubbeltelt en een deel "P6-wenselijk" i.p.v. "P6-vereist" is, corrigeer ik naar beneden.

**Indicator B — beroepsmix.** De Australische bouwsector telt ordegrootte 1,2–1,3 miljoen werkenden. Planners/schedulers zijn in een projectorganisatie typisch 0,3–1% van de projectstaf, geconcentreerd bij Tier 1/2-aannemers, ingenieursbureaus, opdrachtgevers en mijnbouw. Voeg daaraan toe: mijnbouw (mine planners/schedulers, apart beroep), energie/renewables, defensie, olie & gas en maintenance-planning (turnarounds).

**Indicator C — NZ-verhouding.** Seek NZ: ~114 "Primavera P6 Scheduler" en ~111 "Planner" vacatures tegen ~244/255 in AU [via zoekresultaat]. Dat suggereert een NZ/AU-verhouding van ruwweg **0,45 in vacatureflow** — hoger dan de bevolkingsverhouding (~0,20), wat wijst op een NZ-markt die relatief planner-intensief adverteert (kleinere vaste teams, meer inhuur), maar in absolute aantallen klein blijft.

> **[VERIFICATIE 25-07-2026 — interne tegenspraak, indicator C draagt zijn eigen conclusie niet.]** Nagerekend: 114/244 = 0,467 en 111/255 = 0,435, dus de **0,45** is correct berekend. Maar diezelfde indicator wordt vervolgens genegeerd: de conclusietabel hieronder geeft NZ 1.000–2.000 tegen AU 8.000–14.000, oftewel een NZ/AU-verhouding van **0,07–0,25** — een factor 2 tot 6 lager dan wat indicator C oplevert, zonder dat die correctie ergens wordt beargumenteerd. Eén van beide moet fout zijn. De waarschijnlijkste verklaring is dat de Seek NZ-tellingen niet vergelijkbaar zijn met de Seek AU-tellingen (andere matching-breedte bij kleine resultaatsets), wat betekent dat **indicator C geen bruikbaar bewijs is** en dat de NZ-schatting feitelijk alleen op de bevolkings-/bouwmarktverhouding rust. Beide vacaturereeksen komen bovendien uit zoekmachine-snippets en konden **niet** primair worden geverifieerd (Seek/Jora blokkeren uitlezing; het zoekbudget van deze verificatieronde was uitgeput). **Behandel de NZ-planneraantallen als onzeker.**

**Conclusie (schatting):**

| Groep | Australië | Nieuw-Zeeland |
|---|---|---|
| Professionele planners/schedulers (breed: project + maintenance + mine planning) | **8.000 – 14.000** | **1.000 – 2.000** |
| Waarvan "harde kern" die dagelijks in P6/Asta/MSP een CPM-netwerk onderhoudt | **4.000 – 6.500** | **500 – 1.000** |
| Waarvan primair P6 | **~55–65% van de harde kern** | **~50–60%** |
| Waarvan primair MS Project | **~20–30%** | **~25–35%** |
| Waarvan primair Asta Powerproject | **~8–15%** (geconcentreerd bij gebouwbouwers) | **~5–12%** |

De verdelingspercentages zijn **[EIGEN SCHATTING]** op basis van (a) de Eastwood Harris-uitspraak dat exact deze drie pakketten de Australische markt vormen, (b) de vacature-mix waarin P6 veruit het vaakst als harde eis staat, (c) het feit dat Asta één ANZ-reseller heeft met een beperkt aantal grote accounts, en (d) de observatie van Australische consultants dat P6 wordt gebruikt *"for multi-contractor major programmes needing enterprise structure and audit-grade control"* en MS Project *"where the delivery environment is smaller or client-mandated"* ([Nomads PS](https://www.nomadsps.com.au/services/primavera-p6-scheduling)).

### 3.3 Omvang van de softwaremarkt — eigen bottom-up berekening **[EIGEN SCHATTING]**

**Laag 1 — CPM-planningsseats (bouw, infra, energie, defensie, olie & gas; excl. mijnbouwplanning)**

Aannames:
- Harde kern planners AU+NZ: **4.500–7.500** (midden van §3.2).
- Daarnaast "occasional users" met eigen seat (projectmanagers, engineering managers, controls-analisten): factor **1,4–1,8×** de harde kern → totaal **6.300–13.500 betaalde seats**. Ik reken conservatief met **7.000–11.000 seats**.
- Gemengde jaarlijkse kosten per seat, gewogen naar het marktaandeel hierboven:
  - P6 perpetual: eenmalig A$5.820–6.360 (afschrijving 5 jaar ≈ A$1.164–1.272/jr) **plus** onderhoud: jaar 1 A$1.280–1.399 (= 22% van de lijstprijs), **jaar 2 en verder echter A$917 (PPM) resp. A$1.003 (EPPM)** → **≈ A$2.150–2.350 per seat per jaar** over jaar 1–5.
    > **[GECORRIGEERD bij verificatie 25-07-2026.]** Hier stond "22% jaarlijks onderhoud ≈ A$1.280–1.399/jr → ≈ A$2.450–2.670 per seat per jaar". Prescience vermeldt op beide productpagina's expliciet: *"Oracle has advised that the following (GST exc) fee will apply in Year 2. Estimated 2nd Year Oracle Maintenance will be no more than: A$917"* (PPM) resp. **A$1.003** (EPPM). Dat is **15,8% van de lijstprijs**, niet 22%. Herberekend: PPM A$5.820 + A$1.280 + 4×A$917 = A$10.768 over vijf jaar = **A$2.154/jaar**; EPPM A$6.360 + A$1.399 + 4×A$1.003 = A$11.771 = **A$2.354/jaar**. De oorspronkelijke reeks overschatte de P6-seatkosten met 14–24%.
  - Asta Powerproject subscriptie: **A$2.060/jaar**. *(Primair geverifieerd.)*
  - MS Project Plan 3: USD 30/user/maand ≈ **A$515/jaar** (omgerekend) tot Project Professional 2024 perpetual **AU$2.299** eenmalig (≈ A$460/jaar bij 5 jaar afschrijving). *(AU-prijs primair geverifieerd.)*
  - Gewogen gemiddelde: **≈ A$1.500–2.000 per seat per jaar**. *(Nagerekend bij verificatie met de gecorrigeerde P6-prijs en de marktaandelen uit §3.2 (60% P6 / 27% MSP / 13% Asta): A$1.684–1.819 per seat per jaar. Dat valt binnen de opgegeven bandbreedte, dus de correctie hierboven raakt **wel** de P6-deelberekening maar **niet** de uitkomst van laag 1.)*
- **Laag 1 = 7.000–11.000 × A$1.500–2.000 ≈ A$10,5 – 22 mln/jaar.** Met een opslag voor EPPM-server-/enterprise-componenten, concurrent licenties en Oracle Primavera Cloud-abonnementen (minimaal 5 licenties, [Equiv](https://www.equivtech.com.au/Equiv-Technologies-Primavera-Licensing-Partner-in-Australia.html)): **A$18–30 mln (USD 13–21 mln) per jaar**.

**Laag 2 — aangrenzende project-controls-software (bouw/infra)**

| Segment | Schatting AU+NZ per jaar | Redenering |
|---|---|---|
| Schedule-analyse & risk (Deltek Acumen Fuse/Risk, Safran Risk, Primavera Risk) | **A$4–9 mln** | Prescience is Deltek's exclusieve Acumen-partner in AU; Fuse A$9.452, volledige suite A$17.975 per seat; geschat 300–700 actieve seats bij Tier-1-aannemers, opdrachtgevers en claims-consultants |
| Project-controls-platformen (InEight, Oracle Primavera Unifier/Aconex-controls, Prescience Cloud) | **A$25–45 mln** | InEight heeft twee AU-kantoren (South Melbourne, Brisbane) en telt CPB Contractors en John Holland tot zijn gebruikers; enterprise-contracten in de A$0,5–3 mln/jaar-klasse bij ~15–30 grote afnemers |
| 4D/BIM-planning (Bentley SYNCHRO, Asta 4D, Trimble) | **A$8–15 mln** | Toegepast op megaprojecten (bv. ACCIONA op het Victoriaanse Level Crossing Removal Project) |
| Lineaire planning (TILOS) | **A$1–3 mln** | Nichetool voor weg/spoor/pijpleiding; één AU-reseller (Delta Solutions) |
| Korte-termijn/veldplanning (Aphex, Assignar en vergelijkbaar) | **A$12–25 mln** | Aphex A$61–88/gebruiker/maand met minimaal 10 seats; op megaprojecten 50–150 gebruikers per project (Sydney Gateway: 150 engineers; WestConnex: 15 engineers + 50+ onderaannemers) |
| Owner-side controls (Mastt e.d.) | **A$3–8 mln** | A$165/project/maand-model; sterk bij publieke opdrachtgevers en councils |
| **Subtotaal laag 2** | **A$53–105 mln** | |

**Laag 3 — mijnbouwplanning/-scheduling in ANZ**

| Vendor | Wereldwijde referentie | Aandeel ANZ **[EIGEN SCHATTING]** | ANZ-omzet/jaar |
|---|---|---|---|
| Deswik (Sandvik) | AUD 79 mln omzet rolling-12m per okt-2021 ([bron](https://promfgmedia.com/sandvik-to-acquire-australia-based-leading-mine-planning-software-company-deswik.php)); 10.000+ licenties | 25–35% (thuismarkt, hoge dekking bij BHP/Rio/Fortescue-toeleveranciers en contractors) | **A$25–40 mln** (na groei sinds 2021) |
| RPMGlobal (XPAC/XECUTE) | FY25-omzet A$76,7 mln; ARR A$71,8 mln waarvan **24% Scheduling** (≈ A$17,2 mln ARR) ([investor presentation FY2025](https://rpmglobal.com/wp-content/uploads/2025/08/20250826-Investor-Presentation-FY2025-Full-Year-Review.pdf)) | 20–30% van de scheduling-ARR | **A$3,5–5 mln** |
| Micromine Alastri | Micromine overgenomen door AspenTech (2022, **A$900 mln**); Alastri overgenomen 2021 | 35–50% (Perth-basis, sterke AU-open-pit-penetratie) | **A$8–15 mln** |
| Minemax (Datamine), Maptek, MineSched, Hexagon MinePlan | — | — | **A$8–15 mln** samen |
| **Subtotaal laag 3** | | | **A$45–75 mln** |

**Totale directe softwaremarkt AU+NZ (mijn schatting):**

| Afbakening | AUD/jaar | USD/jaar (×0,69879) |
|---|---|---|
| **Eng** (alleen CPM-planningsseats bouw/infra/energie/defensie) | **A$18–30 mln** | **USD 13–21 mln** |
| **Middenbreed** (+ risk/4D/lineair/korte-termijn/controls-platformen) | **A$71–135 mln** | **USD 50–94 mln** |
| **Breed** (+ ANZ-mijnbouwplanning) | **A$116–210 mln** | **USD 81–147 mln** |
| **Zeer breed** (+ generieke werkbeheer-SaaS met Gantt die feitelijk voor projectplanning wordt ingezet: Smartsheet, monday.com, Asana, Wrike, Jira-plug-ins) | **+A$150–350 mln** | **+USD 105–245 mln** |

**Groei.** Ik schat de kern-CPM-markt op **2–5% per jaar in AUD** (volumegroei door de infrastructuurpijplijn, gedempt door prijsdruk vanuit goedkopere alternatieven en de krimpende NZ-bouw), en de aangrenzende project-controls-/veldplanningslaag op **12–20% per jaar** (substitutie van Excel/PowerPoint door SaaS). Dat sluit aan bij RPMGlobal's eigen FY26-guidance van **A$88–92 mln omzet tegen A$76,7 mln in FY25** (+14,7–19,9%) ([bron](https://rpmglobal.com/wp-content/uploads/2025/08/20250826-Investor-Presentation-FY2025-Full-Year-Review.pdf)) en bij de externe CAGR-schattingen in §3.4. **[EIGEN SCHATTING]**

> **[VERIFICATIE 25-07-2026 — cijfers kloppen, de redenering niet.]** Alle RPMGlobal-getallen zijn regel voor regel teruggevonden in de FY2025-presentatie (omzet $76,7m/+6%, ARR $71,8m per 25-08-25, Scheduling **24%** van de ARR en 21% van de TCV, TCV-verkoop $100,8m, subscriptie-omzet $54,8m/+20%, brutomarge 96,3%, net revenue retention 115%, gross retention 94%, guidance "*Total Revenue will be in the range of $88 million to $92 million (FY25: $76.7 million)*"). De **gebruikte redenering** is echter zwak op drie punten: (a) RPMGlobal is een **mijnbouwsoftwarebedrijf**, geen bouw-/infra-project-controlsleverancier — het valideert laag 3, niet de 12–20% die aan laag 2 wordt toegekend; (b) FY26 is **guidance**, geen gerealiseerde groei, terwijl de gerealiseerde FY25-omzetgroei slechts **+6%** was; (c) de ARR-brug in dezelfde presentatie laat zien dat de groei mede uit **FX en upsell** komt. Groeicijfer daarom als **onzeker** te behandelen.

**Valuta-effect op de marktomvang.** Omdat vrijwel alle grote vendors (Oracle, Microsoft, Bentley, Deltek, Trimble) in USD prijzen en de AUD in 2026 rond de 0,70 USD staat, betekent een AUD-daling van 10% een directe kostenstijging van ~11% voor Australische afnemers zonder dat er functionaliteit bijkomt. Australische resellers vangen dit deels op door AUD-prijslijsten die met vertraging worden herzien; het verschil tussen de Equiv-notering van 2024 (P6 EPPM **A$5.775 + A$1.270 = A$7.050**) en de Prescience-notering van 2026 (**A$6.360 + A$1.399 = A$7.759**) is **+10,1% in twee jaar** en is grotendeels valuta-/lijstprijsindexatie. **[VERIFICATIE 25-07-2026: beide noteringen zijn primair bevestigd; +10,1% is correct nagerekend (7.759/7.050). Twee kanttekeningen. (1) A$5.775 + A$1.270 = A$**7.045**, niet 7.050 — de afrondingsfout staat in de bron zelf ("Total = 7050 AUD"), het rapport neemt hem over; op de procentuele uitkomst maakt het niets uit (+10,13% i.p.v. +10,06%). (2) Zwaarder: de Equiv-notering heet op die pagina uitdrukkelijk een **"average price as per 2024"** van een **andere reseller**, geen lijstprijs. Een tweepuntsvergelijking tussen twee verschillende verkopers met twee verschillende prijsbegrippen kan geen prijsindexatie aantonen. **De conclusie "grotendeels valuta-/lijstprijsindexatie" is onzeker** — bij AUD/USD rond 0,70 in beide jaren zou pure valuta-doorwerking juist géén +10% verklaren.]**

### 3.4 Externe marktrapporten (ter vergelijking — andere afbakening, sterk uiteenlopend)

| Bron | Afbakening | Cijfer | Basisjaar / CAGR |
|---|---|---|---|
| DataBridge Market Research | Australia construction management software | **USD 165,45 mln in 2032** | basis 2025, CAGR 8,23% ([link](https://www.databridgemarketresearch.com/nucleus/australia-construction-management-software-market)) |
| Grand View Research | Australia construction & design software | **USD 443,1 mln in 2030** | basis 2025, CAGR 11,3% ([link](https://www.grandviewresearch.com/horizon/outlook/construction-and-design-software-market/australia)) |
| 6Wresearch | Australia construction management solution | **USD 346 mln (2025) → USD 414 mln (2032)** — **primair geverifieerd 25-07-2026** | CAGR 2,6% (2026–2032) ([link](https://www.6wresearch.com/industry-report/australia-construction-management-solution-marketoutlook)) |
| TheReportCubes | Australia digital construction | **USD 70 mln (2025) → USD 200,44 mln (2034)** | CAGR 12,40% ([link](https://www.thereportcubes.com/report-store/digital-construction-market-australia)) |

> **Waarschuwing.** Deze vier rapporten verschillen onderling met **ongeveer een factor 5** voor hetzelfde jaar. **[GECORRIGEERD: hier stond "factor 6".]** Nagerekend voor basisjaar 2025: 6Wresearch USD 346 mln (primair geverifieerd) tegen TheReportCubes USD 70 mln = **factor 4,9**; Grand View impliceert USD ~259 mln (443,1 ÷ 1,113⁵) en DataBridge impliceert USD ~95 mln (165,45 ÷ 1,0823⁷). Voor 2032 is de spreiding kleiner: DataBridge 165 mln tegen 6Wresearch 414 mln = factor 2,5. De interne consistentie van TheReportCubes klopt wel (70 × 1,124⁹ = 200,44). Ze zijn syndicated en niet transparant onderbouwd. Gebruik ze uitsluitend als grofste ordegrootte-indicatie; mijn eigen bottom-up cijfers in §3.3 zijn expliciet onderbouwd en daarom beter traceerbaar.

---

## 4. Gebruikte software: wie gebruikt wat, en de rangorde

### 4.1 Rangorde in één tabel

| # | Pakket | Positie in AU/NZ | Typische gebruikers | Prijsindicatie (AU) |
|---|---|---|---|---|
| 1 | **Oracle Primavera P6** (PPM/EPPM) | **Marktleider bij grote projecten**; de-facto contractstandaard | Tier-1-aannemers, ingenieursbureaus, mijnbouw, olie & gas, defensie, staatsagentschappen (TfNSW, QR, Main Roads) | A$7.100 (PPM) / A$7.759 (EPPM) lijst, jaar 1, per named user |
| 2 | **Microsoft Project** (desktop + Plan 1/3/5) | **Volumeleider naar aantal seats**; standaard in het midden- en kleinsegment en bij consultants | Ingenieursbureaus, kleinere aannemers, opdrachtgeversorganisaties, IT/PMO | AU$2.299 (Professional 2024) / AU$1.149 (Standard 2024) perpetual; Plan 3 USD 30/user/mnd |
| 3 | **Elecosoft Asta Powerproject** | **Sterke derde, groeiend bij gebouwbouwers**; één ANZ-reseller | Tier-1/2 builders (bv. Kapitol), MEP-onderaannemers, sommige civiele aannemers | **A$2.060/jaar** single-user subscriptie (ANZ-exclusief) |
| 4 | **Deswik** (Sandvik) | **Marktleider mijnbouwplanning**, Australisch product | Ondergrondse + open-pit mijnbouw, mining contractors, kolen/goud/koper | Offerte; niet publiek |
| 5 | **InEight** (Kiewit) | **Sterke positie in AU project controls**, twee AU-kantoren | CPB Contractors, John Holland en vergelijkbare grote civiele aannemers | Enterprise-offerte |
| 6 | **Micromine Alastri / RPMGlobal XPAC / Minemax / Maptek** | Australische mijnbouw-schedulingcluster | Open-pit mijnbouw, kortetermijn-mijnplanning | Offerte |
| 7 | **Aphex** | **Snelgroeiend voor korte-termijn/veldplanning op megaprojecten** | WestConnex, Sydney Gateway, rail/metro, renewables | **A$61 / A$88 per gebruiker/maand**, min. 10 seats |
| 8 | **Deltek Acumen (Fuse/Risk/360)** | Standaard voor schedule-kwaliteit en QSRA bij grote programma's | Project-controls-teams, opdrachtgevers, claim-consultants | **A$9.452** (Fuse) / **A$17.975** (volledige suite) |
| 9 | **Bentley SYNCHRO 4D** | Niche maar zichtbaar op megaprojecten | ACCIONA (Victoria Level Crossing Removal), tunnel-/brugprojecten | Virtuoso-abonnement, 12-maandslicentie; offerte |
| 10 | **Trimble TILOS** | Niche lineaire planning; één AU-reseller | Weg, spoor, pijpleiding | Offerte |
| 11 | **RIB CCS Candy / iTWO** | Beperkt maar reëel; sterk bij civiele aannemers met Zuid-Afrikaanse wortels | Civiele aannemers AU (support Perth) + NZ (Auckland) | Offerte; derden schatten USD 150–300/gebruiker/maand [niet-officieel] |
| 12 | **Smartsheet / monday.com / Asana / Wrike / Jira+plug-ins** | Groot in volume, klein in "echte" CPM | PMO's, corporate projecten, overheden voor programmaportfolio's | Smartsheet Pro ≈ A$13–17/lid/mnd; monday Standard USD 12/seat/mnd |
| 13 | **Mastt** | Australische owner-side controls-SaaS, snelgroeiend | Overheden, councils, opdrachtgevers, PMC's | **A$165/project/maand** (Professional) |
| 14 | **Buildxact / Beams / Databuild / Cheops / Jobpac / Workbench (NZ)** | Lokale bouw-ERP/estimating met lichte planning | Residentiële en kleine commerciële bouwers | Buildxact **A$169–509/maand** |
| 15 | **ProjectLibre / GanttProject / OpenProject** | Marginaal; incidenteel bij kleine bureaus, studenten, onderaannemers | — | Gratis / open source |
| 16 | **Excel** | **Feitelijk nummer 2 of 3 naar gebruiksfrequentie** | Overal, met name lookaheads, tenderprogramma's en MKB | — |
| — | **Nodes & Links, ALICE Technologies, Spider Project, Safran** | **Zeer beperkte tot verwaarloosbare aanwezigheid in AU/NZ** — geen lokale resellers of casestudy's gevonden | — | — |

### 4.2 Oracle Primavera P6 — de standaard

**Positie.** P6 is in Oceanië de standaard voor alles wat "major project" heet. Australische specialisten formuleren het scherp: *"Primavera P6 is the scheduling backbone of Australian major projects"* en *"badly built P6 programmes are behind more disputes than most contracts"* ([Nomads PS](https://www.nomadsps.com.au/services/primavera-p6-scheduling)).

**Gebruikers.**
- **Overheidsagentschappen:** Transport for NSW (eigen P6-schema, zie §6.1), Queensland Rail, Queensland Government, Main Roads WA, Sydney Metro, Victorian Big Build-programma's.
- **Mijnbouwmajors:** BHP, Rio Tinto, Fortescue — expliciet genoemd als klanten van het Australische project-controlsbureau PPSS, dat werkt op *"$12B+ in capital project value"* over 200+ projecten ([ppss.net.au](https://ppss.net.au/)).
- **Ingenieursbureaus:** AECOM, Aurecon (idem PPSS-klantenlijst).
- **Sectoren:** *"construction, infrastructure, oil & gas, mining, and government"*, incl. *"metro rail projects in Sydney"* en *"energy infrastructure in WA"* ([SPH Planning](https://sphplanning.com.au/comprehensive-primavera-p6-consulting-services-in-australia/)); en recenter datacenters en renewables ([Nomads PS](https://www.nomadsps.com.au/services/primavera-p6-scheduling)).

**Licentiemodel (belangrijk voor prijsbegrip).** Van de Australische Oracle-partner Equiv Technologies ([bron](https://www.equivtech.com.au/Equiv-Technologies-Primavera-Licensing-Partner-in-Australia.html)):
- Perpetual, **named user**, niet deelbaar tussen twee personen.
- **22% van de licentiekosten per jaar** aan Annual Maintenance & Support (AMC), verplicht om te mogen upgraden; selectief betalen alleen in upgradejaren is niet toegestaan.
- **Geen licentiebestand of activatiecode** — *"Oracle licenses operate on a trust-based system, there is no license code or tangible file for Primavera."* Dit is de technische reden waarom informeel/onderlicentie-gebruik in de praktijk voorkomt (zie §6.7).
- P6 EPPM bevat restricted-use-licenties voor Oracle Analytics Publisher, Content Server en WebLogic Standard; volledige licenties zijn nodig zodra men buiten P6 rapporteert of clustert.
- **Team Member**- en **Web Services**-licenties zijn losse, goedkopere SKU's — bv. 5 EPPM + 100 Team Member voor een site-organisatie.
- **Oracle Primavera Cloud (OPC)** kent een **minimum van 5 licenties**; modules: Portfolio & Capital Planning, Progress, Schedule, Task Management.

### 4.3 Microsoft Project

Naar seats waarschijnlijk het grootste pakket in de regio, maar zelden het contractueel voorgeschreven pakket op megaprojecten. Rol: (a) ingenieursbureaus en consultants, (b) opdrachtgeverskant, (c) kleinere aannemers, (d) client-mandated situaties. Australische scheduling-dienstverleners noemen standaard *"industry-leading software such as Microsoft Project and Primavera P6"* ([Efficient Schedule, Perth](https://www.efficientschedule.com.au/)) en *"Primavera P6, MS Project, Excel or Powerpoint"* ([FR2 Infrastructure](https://fr2.com.au/services/scheduling/)) — die laatste opsomming is veelzeggend over de feitelijke toolmix.

### 4.4 Het Australische mijnbouw-schedulingcluster (regionale bijzonderheid van wereldformaat)

Dit is de meest onderscheidende eigenschap van de regio: **Australië is de mondiale thuisbasis van mine-planning-/schedulingsoftware.**

| Vendor | Basis | Status | Kerncijfers |
|---|---|---|---|
| **Deswik** | Brisbane, opgericht **2008** [gecorrigeerd, was 2007] | Overname door **Sandvik aangekondigd december 2021** (afgerond 2022) [gecorrigeerd, was "april 2022"], onderdeel Digital Mining Technologies | Omzet **AUD 79 mln** (rolling 12m, okt 2021, waarvan ~45% recurring, EBITA-marge ~30%); **~300 medewerkers**; **14 kantoren in 10 landen**; **>10.000 licenties**; koopprijs niet openbaar. *(Alle vetgedrukte cijfers geverifieerd tegen de Sandvik-tekst; oprichtingsjaar en overnamedatum weken af.)* Modules o.a. Deswik.Planning (scheduling, sterk ondergronds), Deswik.NOVA (open pit + blending/haulage), Deswik.OPS (shift management), Deswik.Spatial (CAD). Optimalisatietools APEX/BOLT via overname Polymathian (feb 2023). Bronnen: [Sandvik/ProMfg](https://promfgmedia.com/sandvik-to-acquire-australia-based-leading-mine-planning-software-company-deswik.php), [Mining Software Reviews](https://www.miningsoftwarereviews.com/vendor/deswik), [Sandvik](https://www.mining.sandvik/en/digital-solutions/mine-planning-and-optimization/integrated-mine-planning-solutions/) |
| **RPMGlobal (XPAC, XECUTE, XERAS)** | Brisbane, **ASX: RUL** | Beursgenoteerd, sinds 2 april 2025 pure-play software (Advisory verkocht aan SLR voor **A$63,0 mln** EV) | FY2025: omzet **A$76,7 mln** (+6%); ARR **A$71,8 mln** (25-08-2025); TCV-verkoop **A$100,8 mln** (+31%); subscriptierevenue **A$54,8 mln** (+20%); brutomarge **96,3%**; net revenue retention **115%**; **Scheduling = 24% van de ARR** en 21% van de FY25-TCV; A$200 mln aan voorgecontracteerde niet-opzegbare omzet; FY26-guidance **A$88–92 mln**. XPAC bestaat sinds **1980**. Genoemde klanten: BHP (wereldwijde mobiele vloot op één AMT-instantie), Rio Tinto (XECUTE, FY26), Kinross, Freeport, Barrick, First Quantum, Newmont. Bron: [FY2025 Investor Presentation (PDF)](https://rpmglobal.com/wp-content/uploads/2025/08/20250826-Investor-Presentation-FY2025-Full-Year-Review.pdf) |
| **Alastri** | Perth/Brisbane | Overgenomen door **Micromine (Perth), september 2021**; Micromine zelf overgenomen door **AspenTech in 2022 voor A$900 mln** | Producten: Production Scheduler (korte termijn, Gantt-gebaseerd), Tactical Scheduler (middellange termijn, geautomatiseerd), Rapid Reserver, Haul Infinity, Spatial Conformetrics. Bron: [alastri.com](https://www.alastri.com/software/), [micromine.com/alastri](https://www.micromine.com/alastri/) |
| **Minemax** | Perth + Denver | Inmiddels onder **Datamine** (minemax.com leidt door naar Datamine) | Minemax Scheduler optimaliseert schema, trucking, dumpsequentie en cut-off-grades met IBM CPLEX. Bron: [minemax.com](https://www.minemax.com/) |
| **Maptek** | Adelaide | Australisch, privaat | Vulcan/Evolution — mine-planning en scheduling-optimalisatie |

**Waarom dit ertoe doet.** Voor een aannemer in Perth of Brisbane is "planningsoftware" niet automatisch P6: bij een mijnbouwklant is het net zo vaak Deswik of Alastri, met eigen Gantt-weergaven en eigen scheduling-engines die niets met CPM te maken hebben (ze optimaliseren op materiaalstromen en equipment, niet op logische afhankelijkheden). De P6-laag zit er dan **boven** (kapitaalprojecten, shutdowns, EPC-scope), niet in de operationele mijnplanning.

### 4.5 Project-controls-platformen en add-ons

- **InEight** (dochter van Kiewit, HQ Scottsdale): twee Australische kantoren — **Level 4, 80 Market Street, South Melbourne VIC 3205** en **120 Brunswick Street, New Farm, Brisbane QLD 4005** ([ineight.com](https://ineight.com/)). Gebruikers in AU o.a. **CPB Contractors** en **John Holland** [via zoekresultaat]. Het platform integreert *"cost management, scheduling, forecasting, change management and earned value management (EVM) into a single, connected platform"* ([ineight.com](https://ineight.com/products/ineight-project-controls/)). Volgens een gebruikersanalyse zijn de gebruikers van het InEight Project Controls Platform *"most concentrated in Australia and United States"* — Australië is dus een kernmarkt, geen bijzaak.
- **Deltek Acumen**: Prescience Technology is *"Deltek's exclusive Acumen partner in Australia, delivering Acumen training across the nation each month"* ([prescience.com.au/training](https://www.prescience.com.au/training/)). Prijzen (AUD, excl. GST, lijst → webshop): **Acumen Fuse A$9.452 → A$9.083,65**; **Fuse+Risk+360 (volledige suite) A$17.975 → A$17.238,30**; **Risk+360 als add-on op bestaande Fuse A$9.452 → A$9.083,65** ([prescience.com.au](https://www.prescience.com.au/product-category/software/)).
- **Oracle Aconex** — historisch de belangrijkste Australische AEC-softwaresucces: Melbourne-bedrijf, in december 2017 door Oracle gekocht voor **USD 1,2 mrd** (A$7,80 per aandeel), *"the largest AEC tech acquisition globally"*. Aconex is documentbeheer/collaboration, geen scheduler, maar het bepaalt wel de Oracle-loyaliteit van veel Australische opdrachtgevers en daarmee indirect de P6-positie. Bron: [Oracle persbericht, 2017](https://www.oracle.com/corporate/pressrelease/oracle-buys-aconex-121717.html) [via zoekresultaat].

### 4.6 Korte-termijn- en veldplanning (de snelst groeiende laag)

**Aphex** is de duidelijkste winnaar in dit segment in AU:
- Opgericht **2018**, HQ Londen met vestiging **Sydney**; CEO Jason Lancini heeft een Australische aannemersachtergrond (BMD, John Holland, Costain); seed-ronde **USD 2,0 mln** in september 2024 [via zoekresultaat].
- Prijzen (per gebruiker per maand, minimaal 10 seats): **Pro A$61 / Pro+ A$88**, met de opmerking *"AUD pricing is periodically reviewed to align with our base currency"* en keuze uit een **Australisch datacenter** ([aphex.co/pricing](https://www.aphex.co/pricing)). Ter vergelijking: GBP 45/65, USD 85/123.
- Australische referenties: **WestConnex** (A$16 mrd, 33 km snelweg) waar *"15 engineers own and update their plans directly"* met wekelijkse updates die tijdens kritieke sprints dagelijks worden, gecoördineerd over **50+ onderaannemers**; en **Sydney Gateway** met *"150 engineers working across earthworks, structures, utilities, and traffic disciplines"* ([aphex.co](https://www.aphex.co/updates/construction-scheduling-software-in-australia)).
- Aphex importeert uit **P6, MS Project en Asta** en integreert met ArcGIS ([GetApp AU](https://www.getapp.com.au/software/2062269/aphex)) — een expliciete "laag boven het CPM-model"-strategie in plaats van vervanging.

**Assignar** (Australisch, workforce-/plant-scheduling voor aannemers) publiceert geen prijzen ([assignar.com/pricing](https://www.assignar.com/pricing)).

### 4.7 Generieke werk-/projectmanagementtools

Deze tools worden in AU/NZ veel gebruikt voor programmabeheer, portfolio-tracking en niet-bouwprojecten, maar zelden als contractueel programma:

| Tool | Prijs | Bron |
|---|---|---|
| **Smartsheet** | Pro ca. **A$13 (jaarlijks) / A$17 (maandelijks)** per lid per maand; Business ca. **A$27 / A$35**; Enterprise op offerte (10+ leden). AUD-prijzen worden expliciet getoond op de prijspagina. *(De prijstabel werd bij extractie samengevoegd; de USD-referentie is Pro $9/$12 en Business $19/$24 — de AUD-getallen volgen dezelfde jaarlijks/maandelijks-splitsing.)* **[interpretatie gemarkeerd]** | [smartsheet.com/pricing](https://www.smartsheet.com/pricing) |
| **monday.com** (Work Management) | Basic **USD 9**, Standard **USD 12**, Pro **USD 19** per seat/maand; Enterprise op offerte | [monday.com/pricing](https://monday.com/pricing) |
| **Microsoft Planner/Project-abonnementen** | Planner Plan 1 **USD 10**, Planner and Project Plan 3 **USD 30**, Plan 5 **USD 55** per gebruiker/maand (juli 2026) | [learn.microsoft.com](https://learn.microsoft.com/en-au/answers/questions/4433838/which-kind-of-license-request-for-planner-advanced), [costbench.com](https://costbench.com/software/project-management/microsoft-project/) |
| **Microsoft Project desktop (AU-prijzen)** | **Project Professional 2024: AU$2.299,00** eenmalig; **Project Standard 2024: AU$1.149,00** eenmalig | [microsoft.com/en-au](https://www.microsoft.com/en-au/microsoft-365/project/compare-microsoft-project-management-software) |

Asana, Wrike en Jira (met Gantt-plug-ins als BigPicture/Structure.Gantt) zijn in AU/NZ present maar spelen in bouw/infra vrijwel geen rol als contractprogramma; ze zitten in IT-PMO's en corporate-transformatieportfolio's.

### 4.8 Open source

ProjectLibre, GanttProject en OpenProject hebben in AU/NZ **geen noemenswaardige institutionele voetafdruk** in bouw/infra: geen resellers, geen trainingsaanbod bij de gevonden Australische trainingsaanbieders, geen vermelding in vacature-eisen. Ze worden gebruikt door individuele onderaannemers, studenten en kleine bureaus. De reden is structureel: zonder betrouwbare **XER-uitwisseling** en zonder een leverancier die een programma kan verdedigen bij een claim, is open source in dit contractklimaat een risico. Zie §8.

### 4.9 Excel en PowerPoint

Excel is in AU/NZ geen "restcategorie" maar een echt planningsplatform:
- Australische planningsdienstverleners noemen Excel en PowerPoint in één adem met P6 en MSP als de tools die ze inzetten ([FR2 Infrastructure](https://fr2.com.au/services/scheduling/)).
- Aphex' eigen marktbeschrijving voor Australië: teams vertrouwden *"on spreadsheets and static Gantt charts"* en *"as projects have grown more complex — with multiple contractors, tighter deadlines, and ever-changing site conditions — those tools are no longer enough"* ([aphex.co](https://www.aphex.co/updates/construction-scheduling-software-in-australia)).
- Het Australische/NZ-MKB werkt met gratis Excel-templates (Planyard, NextMinute, Smartsheet, ProjectManager bieden allemaal Australisch gerichte templates) [via zoekresultaat].

---

## 5. Prijzen, licentiemodellen en bijkomende kosten

### 5.1 Overzichtstabel softwareprijzen (AU, excl. GST tenzij vermeld)

| Product | Model | Lijstprijs AUD | Netto/actieprijs AUD | USD-equiv. (×0,69879) | Bron |
|---|---|---|---|---|---|
| **Primavera P6 Professional (PPM)** | Perpetual, named user, jaar 1 incl. verplicht onderhoud | Licentie **A$5.820** + onderhoud **A$1.280** = **A$7.100** | **A$6.809** (5% webshopkorting, alleen op licentie) | ≈ USD 4.960 / 4.757 | [Prescience](https://www.prescience.com.au/product/primavera-p6-ppm/) |
| **Primavera P6 EPPM** | Perpetual, named user, jaar 1 | Licentie **A$6.360** + onderhoud **A$1.399** = **A$7.759** | **A$7.441** | ≈ USD 5.422 / 5.200 | [Prescience](https://www.prescience.com.au/product/primavera-p6-eppm/) |
| **Primavera P6 EPPM (2024-notering)** | idem | **A$5.775** + AMC **A$1.270** = **A$7.050** ("average price as per 2024") | — | ≈ USD 4.926 | [Equiv](https://www.equivtech.com.au/Equiv-Technologies-Primavera-Licensing-Partner-in-Australia.html) |
| **Oracle AMC (onderhoud) jaar 2+** | Jaarlijks, verplicht voor upgrades | **Bronnen spreken elkaar tegen.** Equiv: *"22% payment of the license cost each year"*. Prescience noteert op beide P6-productpagina's daarentegen een door **Oracle opgegeven** tweedejaarsbedrag van **A$917** (PPM) resp. **A$1.003** (EPPM) = **15,8% van de lijstprijs** | — | — | [Equiv](https://www.equivtech.com.au/Equiv-Technologies-Primavera-Licensing-Partner-in-Australia.html) vs. [Prescience PPM](https://www.prescience.com.au/product/primavera-p6-ppm/) / [EPPM](https://www.prescience.com.au/product/primavera-p6-eppm/) |
| **Oracle P6 PPM — onderhoud jaar 2 (geverifieerd)** | Jaarlijks | **A$917** ("no more than", GST exc) | — | ≈ USD 641 | [Prescience](https://www.prescience.com.au/product/primavera-p6-ppm/) |
| **Oracle P6 EPPM — onderhoud jaar 2 (geverifieerd)** | Jaarlijks | **A$1.003** ("no more than", GST exc) | — | ≈ USD 701 | [Prescience](https://www.prescience.com.au/product/primavera-p6-eppm/) |
| **Oracle Primavera Cloud (OPC)** | Abonnement, **minimaal 5 licenties** | Niet publiek | — | — | [Equiv](https://www.equivtech.com.au/Equiv-Technologies-Primavera-Licensing-Partner-in-Australia.html) |
| **Asta Powerproject (single user)** | 12-maands subscriptie incl. AU-support, updates en upgrades | **A$2.060/jaar** | — | ≈ USD 1.439 | [Solid Support](https://solidsupport.com.au/buy-powerproject/) |
| **Asta Powerproject concurrent / BIM-add-ons** | Offerte via helpdesk | Niet publiek | — | — | idem |
| **Microsoft Project Professional 2024** | Perpetual | **AU$2.299,00** — bedrag geverifieerd; de toevoeging "incl. GST" staat **niet** op de pagina en is een aanname **[onzeker]**. US-lijstprijs voor hetzelfde product: **USD 1.129,99** → AU-prijs is **+42% (+29% ex-GST)** | — | ≈ USD 1.607 | [Microsoft AU](https://www.microsoft.com/en-au/microsoft-365/project/compare-microsoft-project-management-software) / [Microsoft US](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) |
| **Microsoft Project Standard 2024** | Perpetual | **AU$1.149,00** (geverifieerd; US-lijst **USD 679,99**) | — | ≈ USD 803 | idem |
| **Planner and Project Plan 3** | Abonnement | USD 30/gebruiker/maand (≈ A$43) | — | USD 360/jaar | [costbench](https://costbench.com/software/project-management/microsoft-project/) |
| **Deltek Acumen Fuse** | Perpetual/seat | **A$9.452** | **A$9.083,65** | ≈ USD 6.605 / 6.348 | [Prescience](https://www.prescience.com.au/product-category/software/) |
| **Deltek Acumen Fuse+Risk+360 (suite)** | idem | **A$17.975** | **A$17.238,30** | ≈ USD 12.560 / 12.046 | idem |
| **Aphex Pro** | SaaS, min. 10 seats | **A$61/gebruiker/maand** | — | ≈ USD 43 | [aphex.co/pricing](https://www.aphex.co/pricing) |
| **Aphex Pro+** | idem | **A$88/gebruiker/maand** | — | ≈ USD 61 | idem |
| **Mastt Professional** | Per project | **$165/maand** (gemiddelde kosten per project; onbeperkt aantal gebruikers) | — | ≈ USD 115 | [mastt.com/pricing](https://www.mastt.com/pricing) |
| **Buildxact** (AU) | SaaS per bedrijf | **A$199 / A$399 / A$599 per maand** (maandelijks) — **A$169 / A$339 / A$509** bij jaarbetaling (A$2.030 / A$4.070 / A$6.110 per jaar); add-ons +A$99 tot +A$149/maand; excl. GST | — | ≈ USD 118–356/mnd | [buildxact.com/au/pricing](https://www.buildxact.com/au/pricing/) |
| **Smartsheet Pro / Business** | SaaS per lid | ca. **A$13–17** / **A$27–35** per lid/maand (AUD-prijzen staan op de prijspagina) **[interpretatie]** | — | — | [smartsheet.com/pricing](https://www.smartsheet.com/pricing) |
| **RIB CCS Candy** | Offerte | Niet publiek; derden schatten **USD 150–300/gebruiker/maand** (1 user) tot **USD 10.000–20.000/maand** (100 users) **[niet-officiële schatting van derden]** | — | — | [via zoekresultaat](https://www.rib-software.com/) |
| **Bentley SYNCHRO** | Virtuoso Subscription: 12-maandslicentie + training, of enterprise-offerte | Niet publiek | — | — | [virtuosity.bentley.com](https://virtuosity.bentley.com/product/synchro/) |
| **Trimble TILOS** | Offerte / demo | Niet publiek | — | — | [Delta Solutions AU](https://deltasolutions.com.au/tilos/) |
| **Deswik, XPAC, Alastri, Minemax** | Offerte, meestal modulair per seat + jaarlijks onderhoud | Niet publiek | — | — | vendorwebsites |

### 5.2 Kortingen en onderhandelingsruimte

- **Standaard-webshopkorting:** Australische Oracle-resellers geven **5%** (Prescience) tot **10%** (Successful Projects) korting op de softwarelijstprijs, **nooit op het eerstejaars onderhoud** ([Prescience](https://www.prescience.com.au/product/primavera-p6-ppm/), [Successful Projects](https://successfulprojects.com.au/primavera-p6-eppm-price/) [via zoekresultaat]).
- **Creditcardtoeslag:** Prescience rekent **1,9% surcharge** op creditcardtransacties ([bron](https://www.prescience.com.au/product/primavera-p6-ppm/)) — kenmerkend voor de Australische betaalcultuur.
- **Volume/enterprise:** bij >25 seats verschuift de onderhandeling naar Oracle direct of een ELA; kortingen van 20–40% op lijst zijn in die klasse gangbaar in enterprise-software, maar er is **geen publieke bron** die dat voor de ANZ-Primavera-markt bevestigt. **[EIGEN SCHATTING]**
- **Goedkopere SKU-mix:** de meest gebruikte kostenbesparing is het combineren van weinig volledige EPPM-licenties met veel **Team Member**- of **Web Services**-licenties, wat de partner expliciet aanbeveelt: *"if a customer plans to use only 5 licenses for planning ... but needs to assign Team Member access to 100 individuals working on-site, they can purchase 100 Team Member licenses alongside with 5 EPPM licenses"* ([Equiv](https://www.equivtech.com.au/Equiv-Technologies-Primavera-Licensing-Partner-in-Australia.html)).

### 5.3 Trainingskosten

| Aanbieder | Aanbod | Prijs |
|---|---|---|
| **PMAI** | Oracle-gecertificeerde P6 Foundation & Advanced, meerdere steden | **vanaf A$1.499 + GST** ([pmai.com.au](https://pmai.com.au/primavera-p6-training)) |
| **Prescience Technology** | *"Australia's first Oracle Approved Education Center"*; P6 Fundamentals (2 dagen), P6 Advanced (2 dagen), P6 Administration (2 dagen), plus volledige Oracle University-catalogus; klassikaal in heel APAC + dedicated in-house | Prijzen niet publiek op de site ([prescience.com.au/training](https://www.prescience.com.au/training/)) |
| **Solid Support** | Asta Powerproject modules 1–5 (basis → BIM), elk ~4–6 uur, live via MS Teams of on-site, incl. handleidingen en post-training support; tailored courses mogelijk | "Per Person Per Module"-prijs niet publiek ([solidsupport.com.au/powerproject-training](https://solidsupport.com.au/powerproject-training/)) |
| **Overige AU-aanbieders** | Logitrain, Spoclearn (Sydney/Melbourne/Brisbane/Perth/Adelaide), Advanced Training, Corporate Training Solutions, Equiv, Successful Projects | Prijzen doorgaans op aanvraag |
| **NZ** | Caduceus Systems (Auckland, 30 jaar AECO-ervaring), The Knowledge Academy (Auckland), Enliten IT | Prijzen op aanvraag [via zoekresultaat] |
| **Boeken/zelfstudie** | **Eastwood Harris** (Melbourne) publiceert de facto de standaard-handboeken voor **Microsoft Project, Primavera P6 PPM, P6 EPPM Web én Asta Powerproject** ([eastwoodharris.com](https://www.eastwoodharris.com/)) — een Australische auteur die wereldwijd de referentie is voor deze drie pakketten |

**Realistische kostprijs van een opgeleide P6-planner in jaar 1 [EIGEN SCHATTING]:** licentie + onderhoud A$7.100 + twee cursussen (fundamentals + advanced) A$3.000–5.000 = **A$10.000–12.000 aan tooling en opleiding**, exclusief salaris.

### 5.4 Consultancy- en inhuurtarieven

| Rol | Tarief | Bron |
|---|---|---|
| Project Scheduler (vast, gemiddeld) | **A$140.000/jaar**, bandbreedte A$120.000–160.000 | [Clicks IT Recruitment](https://clicks.com.au/job-salary/project-scheduler/) |
| Project Scheduler (contract, dagtarief) | **A$935/dag** gemiddeld; gepubliceerde bandbreedte **A$500–800/dag** (rate to contractor, incl. super, excl. on-costs en agency-marge); *"rates occasionally higher in Government roles or roles that require security clearances"* | [Clicks](https://clicks.com.au/job-salary/project-scheduler/) |
| Project Planner (gemiddeld) | **A$134.350/jaar**; 90e percentiel **A$209.480** | [Glassdoor AU](https://www.glassdoor.com.au/Salaries/project-planner-salary-SRCH_KO0,15.htm) |
| Project Scheduler (breder gemiddelde) | A$104.250 (Glassdoor), A$94.095 (Indeed), A$130.790 (Jora) | [Glassdoor](https://www.glassdoor.com.au/Salaries/project-scheduler-salary-SRCH_KO0,17.htm), [Indeed AU](https://au.indeed.com/career/project-scheduler/salaries), [Jora AU](https://au.jora.com/s/Project-Scheduler-salary) |
| Specialistische project-controls-consultancy | Geen publieke tarieven; PPSS positioneert *"senior practitioners embedded"* met 15+ jaar ervaring | [ppss.net.au](https://ppss.net.au/) |

**Verhouding tooling : arbeid.** Een P6-licentie van A$7.100 is ongeveer **5% van één jaarsalaris** van een planner (A$140.000) of **~7,6 dagen** aan contractortarief (A$935/dag). Dit is de kernreden waarom prijs in dit segment **geen** doorslaggevende aankoopfactor is; contractuele acceptatie en dataportabiliteit zijn dat wél. Voor het MKB (kleine bouwers, onderaannemers) ligt dat precies omgekeerd — daar is A$7.100 prohibitief en wint Excel of een A$169/maand-pakket.

---

## 6. Lokale bijzonderheden

### 6.1 Australië — aanbesteding en contracteisen

**Transport for NSW (het scherpste voorbeeld).**
- TfNSW publiceert een openbare **Scheduling Schema and Specification**: *"This schema defines a standard structure for the organisation of project activities in Primavera P6."* ([transport.nsw.gov.au](https://www.transport.nsw.gov.au/news-and-events/reports-and-publications/scheduling-schema-and-specification)). Dit is de facto een verplichte WBS-/coderingsstructuur voor aannemers.
- De TfNSW Standard Requirements (contractversie **5TP-FT-425**) beschrijven **Earned Value Management using Primavera P6** voor het meten van kostenprestaties op basis van geïntegreerde tijd-, kosten- en scope-elementen ([PDF](https://www.transport.nsw.gov.au/sites/default/files/media/documents/2017/TfNSW%20Standard%20requirements%20(Contract%20version)%205TP-FT-425-1.0.pdf)). Er is ook een PSC-versie (**5TP-FT-410**) voor Professional Services Contractors ([PDF](https://www.transport.nsw.gov.au/sites/default/files/media/documents/2017/tfnsw-standard-requirements-psc-version-5tp-ft-410.pdf)).
- **[VERIFICATIE 25-07-2026 — de bewering was te zwak geformuleerd.]** Het PDF (56 pagina's) is opgehaald en doorzocht. Het document beperkt zich níet tot een EVM-definitie: het bevat een **expliciete softwareverplichting**. Letterlijk: *"The Contractor must develop, status and maintain the Contractor's Program in Primavera P6 on the Principal's planning environment. The Contractor will be given access to the Principal's planning environment via Citrix at no extra cost to the Contractor."* En over uitwisseling: *"(XER format). The Principal will import the Contractor's Program into the Principal's Primavera planning environment database."* De EVM-definitie zelf luidt: *"Method of measuring and reporting project cost performance based on integrated time, cost and scope elements in accordance with 'TfNSW Quality Management System – Earned Value Management using Primavera P6'."* Dit is dus een harde P6- én XER-verplichting, geen aanbeveling — sterker bewijs voor §1 punt 6 en §8 punt 1 dan het rapport zelf gaf.
- **Twee kanttekeningen bij dat bewijs.** (a) **Vintage:** het document draagt "© TfNSW 2015", versie 5TP-FT-425/**1.0** en de kop "UNCONTROLLED WHEN PRINTED". Of dit in 2026 nog de geldende versie is, is **niet vastgesteld** — behandel het als bewijs dat de eis bestaat, niet dat deze exacte tekst nu nog van kracht is. (b) **Tegenwicht voor de marktomvang:** omdat TfNSW de aannemer *"via Citrix at no extra cost"* toegang geeft tot de **eigen** P6-omgeving, hoeft die aannemer voor dat werk mogelijk **geen eigen P6-seat** te kopen. Dat verzwakt de aanname in §3.3 dat contractuele P6-dwang zich één-op-één vertaalt in betaalde seats, en werkt naar beneden op laag 1.
- **Praktisch gevolg:** een aannemer die op NSW-transportwerk bouwt, moet in P6 kunnen leveren — in de voorgeschreven schemastructuur, met XER- of P6-XML-uitwisseling. Dat is de sterkste enkele verklaring voor de P6-dominantie in de regio.

**Defensie.**
- Het Australische Department of Defence past **AS 4817** (Australian Standard for Earned Value Management) toe op daarvoor aangewezen contracten, samen met het **Defence Supplement to AS 4817-2006**, via **ASDEFCON**-templates; er zijn **Integrated Baseline Reviews (IBR)** en EVM-systeemreviews (CASG-handbook) [via zoekresultaat].
- Belangrijk: **Defence schrijft de norm voor, niet het pakket.** In de praktijk voldoet vrijwel alleen P6 (of MSP + een EVM-engine) aan de eisen, maar er is geen formele softwaredwang. Wel gelden **security clearances**, wat cloud-tooling zonder Australische datasoevereiniteit uitsluit.

**Standaardcontracten.**
- **AS 4000** (General Conditions of Contract) is in **2025 herzien** — de eerste update in 28 jaar, met o.a. een nieuwe clausule 44 over Personal Property Securities Act-zekerheden, herschreven definities en nieuwe GST-bepalingen [via zoekresultaat]. AS 4000 en AS 2124 bevatten programma-clausules die een programma vereisen, maar **schrijven geen software of CPM-methodiek voor**; de detaillering gebeurt in de projectspecifieke Annexure en in agency-specificaties zoals die van TfNSW of GC21 (NSW).
- **NEC/FIDIC:** NEC (met name NEC3/NEC4 ECC) wordt in AU/NZ minder gebruikt dan in het VK, maar komt voor bij water- en energieprojecten en in Nieuw-Zeeland. NEC's Accepted Programme-regime (clausule 31/32) is qua discipline vergelijkbaar met de NZS 3910-regeling hieronder. FIDIC komt vooral voor bij internationaal gefinancierde projecten en in de Pacific.

**Praktisch: XER als lingua franca.** Het uitwisselingsformaat dat contractueel gevraagd wordt is vrijwel altijd **P6 XER** (soms P6-XML of MPP). Asta-gebruikers werken hier omheen: *"Asta Powerproject's ability to import and export Microsoft Project & P6 files means Planners can work natively in Asta while still exchanging programmes in agreed format for clients and partners"* ([Kapitol-case, Solid Support](https://solidsupport.com.au/kapitol-asta-powerproject/)). Dit is exact het gat waar een nieuwkomer doorheen moet.

### 6.2 Nieuw-Zeeland — aanbesteding en contracteisen

- **NZS 3910:2023** (herziene standaardvoorwaarden voor bouw) maakt het programma tot een **contractueel controlleerdocument**: *"the Accepted Programme is a critical contractual control document that supports time, cost, and risk management"*; onder **clausule 9.2.1** geldt in de praktijk *"No programme = no way to assess extensions of time"* — zonder ingediend/geaccepteerd programma kan een aannemer geen EOT-claim onderbouwen [LinkedIn-analyses van NZ-praktijkjuristen, via zoekresultaat].
- **NZTA (Waka Kotahi)** publiceert de Contract Procedures Manual (SM021) en de State Highway Network Outcomes Contract Management Manual (SM034); in de gevonden documentatie is **geen expliciete softwareverplichting** aangetroffen — NZ is op dit punt minder prescriptief dan TfNSW. Bronnen: [NZTA SM021](https://www.nzta.govt.nz/resources/20-05-contract-procedures-manual-sm021).
- **Praktisch gevolg:** in NZ is de druk om P6 te gebruiken **contractueel zwakker** maar **cultureel sterk** — omdat de grote aannemers (Fletcher, Downer, Fulton Hogan, McConnell Dowell, HEB) trans-Tasman opereren en dezelfde project-controls-standaarden hanteren als in Australië. Vacatures in NZ vragen expliciet om *"developing both tender and deliver programmes using Primavera P6"* ([TRS](https://www.trs.co.nz/)) en om planners met *"Primavera P6 and Microsoft Project"* (Eliwa Project Controls, Auckland) [via zoekresultaat].

### 6.3 Normen, forensische planning en geschillen

- De **Society of Construction Law Delay and Disruption Protocol (2nd edition)** is in Australië de gangbare referentie voor EOT- en disruptieclaims, naast **AACE International Recommended Practice 29R-03** (Forensic Schedule Analysis).
- Belangrijke Australische nuance: een uitspraak van de **NSW Supreme Court** stelt dat *"the mere presence or otherwise of a delay analysis method in the Society of Construction Law (UK) Delay and Disruption Protocol (2nd Edition) should not determine its appropriateness for any given case"* [via zoekresultaat] — Australische rechters accepteren dus methodepluralisme, wat de vraag naar hoogwaardige, verdedigbare **as-built/as-planned-data** eerder vergroot dan verkleint.
- Er is een levendige markt van forensische schedule-analisten (o.a. Anvelo, Orizo Consult, Expert Services International) [via zoekresultaat]. Voor softwareleveranciers betekent dit: **auditability, baseline-integriteit en volledige verandergeschiedenis zijn verkoopargumenten**, geen bijzaken.
- **AACE International** heeft een **Australian Section** (ontstaan uit de AACE Melbourne Section, **1977**, uitgegroeid tot de Australian Section in de jaren '80), actief in Sydney, Melbourne, Brisbane en Perth. De **PSP** (Planning & Scheduling Professional) is samen met de CCP de meest gevraagde AACE-certificering; AACE meldt wereldwijd ~**4.179** gecertificeerden [via zoekresultaat] — geen ANZ-uitsplitsing beschikbaar.
- **Kritiek van binnenuit:** Mosaic Project Services (Melbourne, Patrick Weaver) — de bekendste Australische kennisbron over scheduling — stelt dat de Australische praktijk kampt met *"insufficient training and credentialing of planners and schedulers"*, te veel nadruk op het programma als statisch contractdocument in plaats van *"a tool for proactively managing time to the benefit of all of the parties to a contract"*, en een over-afhankelijkheid van CPM ([mosaicprojects.com.au](https://mosaicprojects.com.au/PMKI-SCH-010.php)).

### 6.4 Opleidings- en beroepscultuur

- **Volwassen maar informeel gecertificeerd.** Er is geen wettelijke registratie voor planners. De erkenning loopt via AACE (PSP/CCP), AIPM/PMI (algemene PM-certificering) en vooral via **Oracle-gecertificeerde trainingen** bij Australische partners.
- **Sterke lokale trainingsinfrastructuur.** Prescience is *"Australia's first Oracle Approved Education Center"* en verkoopt daarnaast de volledige Oracle University-catalogus ([bron](https://www.prescience.com.au/training/)). Aanbieders zijn actief in Sydney, Melbourne, Brisbane, Perth en Adelaide.
- **Consultancy-cultuur.** Een dichte laag gespecialiseerde bureaus verkoopt planning als dienst: PPSS (Brisbane; BHP, Rio Tinto, Fortescue, AECOM, Aurecon, Queensland Government, Queensland Rail; A$12 mrd+ aan kapitaalprojecten over 200+ projecten), SPH Planning, Nomads PS, Efficient Schedule (Perth, 108 St Georges Terrace), Scheduling Solutions (WA-focus, olie & gas/mijnbouw), FR2 Infrastructure, Project Scheduling AU. Dit betekent dat een deel van de "markt" niet uit licenties bestaat maar uit **uitbestede planning**, waarbij de consultant zijn eigen licentie meeneemt.
- **Hoge tarieven.** Zie §5.4: A$935/dag gemiddeld voor een contracting scheduler; A$500–800/dag als gepubliceerde bandbreedte. Dit maakt automatisering economisch aantrekkelijk en verklaart de snelle adoptie van Aphex-achtige tools op megaprojecten.

### 6.5 Resellers en distributiekanaal

| Vendor | ANZ-kanaal | Bijzonderheden |
|---|---|---|
| Oracle Primavera | **Prescience Technology** (Milton QLD; Oracle Specialized Platinum Partner + Approved Education Center), **Equiv Technologies** (top-10 Oracle License Partner in AU), **Successful Projects**, plus Oracle direct | Prescience is tevens **Deltek's exclusieve Acumen-partner in Australië** |
| Elecosoft Asta Powerproject | **Solid Support** — *"the leading provider of Asta Powerproject software sales & support in Australia and New Zealand"*, met eigen AU-helpdesk, ook actief in Zuidoost-Azië | Verkoopt Powerproject, Asta 4D en Asta Vision (cloud portfolio) |
| Trimble TILOS | **Delta Solutions** (AU) | Claimt *"4 out of 5 global leaders in linear infrastructure construction trust TILOS"* |
| Bentley SYNCHRO | Bentley direct + Virtuosity-webshop; lokale dienstverleners zoals BIM Technologies (Perth/Melbourne/Sydney) | |
| InEight | Direct, vanuit South Melbourne en Brisbane | |
| RIB CCS (Candy/BuildSmart) | Eigen AU-support in **Perth** (+61 8 6244 1313, ccsaus.com) en **NZ-support in Auckland** (+64 212 833 822); internationaal callcenter 1800 185 438 | |
| Deswik / RPMGlobal / Micromine / Maptek | Direct, vanuit Brisbane/Perth/Adelaide | Thuismarkt: geen tussenlaag |

**Structurele observatie:** het ANZ-kanaal is **dun en geconcentreerd** — vaak één reseller per product. Dat maakt markttoetreding relatief eenvoudig (één partner volstaat om distributie te hebben) maar ook fragiel (die ene partner bepaalt je marktpositie).

### 6.6 Valuta-effecten en prijsniveau

- Alle grote schedulingvendors prijzen in **USD**; ANZ-afnemers betalen in AUD/NZD via reseller-prijslijsten die met vertraging worden geïndexeerd. Bij AUD ≈ 0,70 USD ([ECB via frankfurter.dev, 24-07-2026](https://api.frankfurter.dev/v1/latest?base=AUD&symbols=USD,NZD) — koers primair geverifieerd: AUD/USD 0,69879, AUD/NZD 1,2073, datum 2026-07-24) is de effectieve Australische prijs voor P6 EPPM (A$7.759 ≈ USD 5.422) **hoger dan de gangbare Amerikaanse straatprijs**, wat lokaal regelmatig als "Australia tax" wordt ervaren.

> **[VERIFICATIE 25-07-2026 — bevestigd, met een harder bewijsstuk dan het rapport zelf gebruikt, én één tegenvoorbeeld.]** Microsoft publiceert beide prijslijsten, dus de vergelijking is exact te maken: Project Professional 2024 kost **AU$2.299** op microsoft.com/en-au en **USD 1.129,99** op microsoft.com/en-us. AU$2.299 = USD 1.607, dus **+42,2%**; zelfs na aftrek van 10% GST (AU$2.090 = USD 1.460) blijft **+29,2%**. Dat is de sterkste beschikbare onderbouwing van de "Australia tax" en verdient een plaats in §5.1. **Tegenvoorbeeld:** Aphex doet exact het omgekeerde — A$61/A$88 tegen een USD-lijstprijs van USD 85/123, dus de AUD-prijs ligt ~50% **onder** de USD-prijs (A$61 = USD 43). De stelling "de regio krijgt géén korting" (§1 punt 4) geldt dus voor de Amerikaanse incumbents, niet voor uitdagers die marktaandeel kopen. Let op: de USD-equivalentkolom in §5.1 rekent Aphex mechanisch om naar USD 43/61 en verhult daarmee dat Aphex' eigen USD-tarief USD 85/123 is.
- ~~**NZ betaalt structureel meer dan AU**: NZD ≈ 0,579 USD tegen AUD ≈ 0,699 USD ... **NZD 2.487 per Asta-licentie per jaar** — 21% meer in eigen valuta.~~ **[GECORRIGEERD — dit was een denkfout.]** De kruiskoers en het NZD-bedrag kloppen (2.060 × 1,2073 = NZD 2.487,0; koers primair geverifieerd), maar de **conclusie** is onjuist. Dat NZD 2.487 een groter getal is dan AUD 2.060 is louter een gevolg van de rekeneenheid, niet van een prijsopslag: het is exact dezelfde reële prijs. "NZ betaalt 21% meer" is een valuta-illusie. Een echt NZ-nadeel zou moeten blijken uit een hogere prijs **in dezelfde valuta**, uit koopkrachtverschil of uit NZ-specifieke toeslagen — geen van drieën is in dit onderzoek aangetoond. Wat wél overeind blijft: Asta's ANZ-prijs geldt uitdrukkelijk óók voor NZ-gebruikers, dus NZ koopt tegen het Australische tarief.
- **Uitzondering:** Asta's ANZ-exclusieve prijspunt (A$2.060/jaar) en Aphex' expliciete AUD-prijslijst met AU-datacenter zijn voorbeelden van vendors die de regio bewust apart prijzen om marktaandeel te winnen.

### 6.7 Excel en informele/onderlicentiëring

- **Excel** is structureel aanwezig, zie §4.9. Op korte-termijnniveau (lookaheads, dagplanning) is Excel/PowerPoint tot voor kort de norm geweest en op veel middelgrote projecten nog steeds.
- **Informele licenties.** Twee mechanismen maken dit in de regio waarschijnlijk:
  1. **Oracle Primavera kent geen technische licentie-afdwinging.** De Australische partner stelt het onomwonden: *"Oracle licenses operate on a trust-based system, there is no license code or tangible file for Primavera."* ([Equiv](https://www.equivtech.com.au/Equiv-Technologies-Primavera-Licensing-Partner-in-Australia.html)). Naleving berust dus volledig op audits en interne governance. Op projecten met veel inhuurkrachten die hun eigen P6-installatie meebrengen, is de licentiestatus in de praktijk moeilijk te controleren.
  2. **Named-user-model versus roulerende bezetting.** Omdat een P6-licentie strikt persoonsgebonden is (*"it is a named user license, and each license is intended for use by only one user"*), botst het model met de Australische praktijk van contractors die in en uit projecten rouleren.
- **Kwantificering:** BSA/IDC's Global Software Survey rapporteert historisch een **unlicensed-softwarepercentage van ~20% voor Australië en ~18% voor Nieuw-Zeeland**, tegen ~37% wereldwijd [via zoekresultaat; dit betreft een oudere editie van de BSA-survey — behandel als indicatie, niet als actueel cijfer]. Dat plaatst AU/NZ in de laagste mondiale categorie, maar met een absolute omvang die voor een A$7.100-pakket relevant blijft.
- **Sancties/exportbeperkingen:** er zijn **geen** exportcontroles of sancties die de handel in planningsoftware in AU/NZ raken. **[ONZEKER na verificatie 25-07-2026 — grotendeels juist, maar te absoluut geformuleerd en niet primair verifieerbaar gekregen.]** Er is bij deze verificatieronde **geen** bewijs gevonden van een regime dat de in- of verkoop van generieke CPM-/Gantt-software in AU of NZ beperkt, en de redenering is plausibel: AU en NZ zijn nauwe bondgenoten van de VS (herkomstland van Oracle en Microsoft) en generieke projectplanningssoftware staat niet op een dual-use-lijst. Drie nuances die het rapport onbenoemd laat en die géén van beide kanten hard konden worden vastgesteld (de betreffende overheidsdomeinen — defence.gov.au, dfat.gov.au — weigerden verbinding, en het zoekbudget was uitgeput): (a) het Australische regime van de **Defence Trade Controls Act 2012**, in 2024 uitgebreid met strafbaarstellingen rond het beschikbaar stellen van gereguleerde technologie aan buitenlandse personen **binnen** Australië, raakt niet de software zelf maar wél wie op defensieprogramma's toegang mag hebben tot planningsdata; (b) Australische autonome sancties beperken levering **aan** gesanctioneerde landen/entiteiten, wat een AU-gevestigde vendor bij export raakt, niet de binnenlandse markt; (c) US-exportcontrole op software van Amerikaanse herkomst geldt formeel wel, maar zonder praktische beperking richting AU/NZ. **Conclusie: strekking bevestigd, absolute formulering afzwakken naar "geen bekende beperkingen voor generieke planningssoftware".** De relevante beperkingen zijn (a) **datasoevereiniteit** bij defensie- en kritieke-infrastructuurwerk (Australische hosting vereist — Aphex adverteert daarom expliciet met een AU-datacenter), (b) **security clearances** voor personeel op defensiewerk, en (c) de **Security of Critical Infrastructure Act** die voor sommige assets aanvullende eisen aan softwareleveranciers stelt.

---

## 7. Lokale en niche-pakketten: concrete voor- en nadelen

Onderstaande beoordelingen zijn gebaseerd op vendordocumentatie, reseller-materiaal, casestudy's en reviewbronnen zoals hierboven geciteerd; waar het om een oordeel gaat (niet om een feit), is dat een **analyse van de onderzoeker**, niet een gemeten uitkomst.

### 7.1 Asta Powerproject (Elecosoft) — via Solid Support

**Voordelen**
- **Prijs/prestatie is uitzonderlijk voor de regio:** A$2.060/jaar all-in tegenover A$7.100 in jaar 1 en **A$917–1.003/jaar** daarna voor P6 **[GECORRIGEERD: hier stond A$1.280–1.399/jaar; zie §5.1. Asta's voordeel in de jaren ná jaar 1 is dus kleiner dan het rapport suggereerde — P6 is in stationaire toestand juist ruim twee keer goedkoper per jaar dan Asta. Het Asta-voordeel zit in de instap, niet in de doorlopende kosten.]**
- **Bouwlogica in plaats van EPC-logica:** bar-chart-gedreven werken, line-of-balance, spreadsheet-achtige invoer — Australische builders vinden het aantoonbaar sneller aanleerbaar dan P6 ("project managers could quickly learn" was een expliciet selectiecriterium bij Kapitol).
- **Volledige ANZ-supportketen:** Australische helpdesk, on-site training in modules, lokale consultants ([Solid Support](https://solidsupport.com.au/asta-powerproject/)).
- **Interoperabiliteit als kernstrategie:** import/export naar MSP en P6 maakt het mogelijk intern in Asta te werken en extern in het contractformaat te leveren.
- **4D/BIM en cloud-portfolio (Asta Vision / Vision Live) met Power BI-integratie** — bij Kapitol expliciet doorslaggevend.

**Nadelen**
- **Geen contractuele status.** Geen enkele Australische opdrachtgever schrijft Asta voor; de aannemer draagt altijd het conversierisico naar XER.
- **Enkelvoudig kanaalrisico:** één reseller in de hele regio. Als de relatie hapert, is er geen alternatieve supportroute.
- **Kleinere talentenpool:** vacatures vragen bijna altijd P6, zelden Asta; nieuwe planners moeten worden omgeschoold.
- **Zwakker in enterprise-resource- en portfoliobeheer** dan P6 EPPM bij zeer grote, multi-contractor-programma's.
- **Beperkte zichtbaarheid in mijnbouw en olie & gas** — vrijwel uitsluitend een gebouwen-/bouwtool in deze regio.

### 7.2 Aphex (korte-termijn/veldplanning)

**Voordelen**
- **Lost een echt Australisch probleem op:** coördinatie van tientallen tot honderden engineers en 50+ onderaannemers op megaprojecten, waar Excel-lookaheads fataal falen.
- **Transparante AUD-prijslijst** (A$61/A$88 per gebruiker/maand) met **Australisch datacenter** — belangrijk voor overheids- en defensiewerk.
- **Niet-vervangend positioneren:** importeert uit P6/MSP/Asta en integreert met ArcGIS, dus geen strijd met de contractuele CPM-laag.
- **Sterke Australische referenties** (WestConnex, Sydney Gateway) en een CEO met achtergrond bij Australische aannemers (BMD, John Holland).

**Nadelen**
- **Minimaal 10 seats** sluit kleine aannemers uit; op 10 seats is Pro+ al A$10.560/jaar.
- **Geen volwaardige CPM-engine/contractprogramma:** het blijft een laag *boven* het baselineprogramma; voor EOT-claims moet je terug naar P6/Asta.
- **Jong en klein bedrijf** (opgericht 2018, USD 2,0 mln seed in 2024) — leveranciersrisico op contracten met 5–10 jaar looptijd.
- **Twee-tools-realiteit:** organisaties betalen zowel P6 als Aphex, wat de totale toolkosten per planner verdubbelt of meer.

### 7.3 Mastt (Australische owner-side project controls)

**Voordelen**
- **Per-project-prijsmodel met onbeperkte gebruikers** (A$165/maand Professional) — past uitstekend bij Australische publieke opdrachtgevers en councils met veel stakeholders en weinig licentiebudget.
- **Importeert P6- en MSP-bestanden** en biedt een Schedule-module met activities, milestones, phases en timeline ([mastt.com/pricing](https://www.mastt.com/pricing)).
- **Australisch bedrijf met AU-supportnummer**, dus lokale aanwezigheid en tijdzone.

**Nadelen**
- **Geen echte CPM-engine:** het is rapportage-/governance-tooling over een elders opgesteld programma, niet een planningstool.
- **Owner-side georiënteerd:** aannemers hebben er weinig aan voor productieplanning.
- **Nog beperkte diepgang** in resource- en kostenmodellering vergeleken met InEight of Primavera Unifier.

### 7.4 Buildxact, Beams, Databuild, Cheops, Jobpac (AU) en Workbench (NZ)

**Voordelen**
- **Betaalbaar en lokaal:** Buildxact A$169–509 per maand voor een heel bedrijf, met AU-specifieke prijzen en leverancierskoppelingen ([buildxact.com/au/pricing](https://www.buildxact.com/au/pricing/)).
- **Geïntegreerd met calculatie, inkoop en boekhouding** — voor een residentiële bouwer is dat waardevoller dan CPM.
- **Workbench (NZ)** bedient zowel NZ als Australië (AU-telefoonnummer +61 1800 113 628, klanten in Melbourne en NSW) en is sterk in contractkostenbeheersing bij vaste-prijscontracten ([workbench.co.nz](https://www.workbench.co.nz/)).

**Nadelen**
- **Planning is een bijzaak.** Alleen Buildxact adverteert expliciet met scheduling; bij Databuild, Beams, Cheops en Jobpac is planning niet het zwaartepunt (die liggen bij calculatie, job costing en financiën).
- **Geen CPM/critical path, geen kalendermodellering, geen baseline-vergelijking** op het niveau dat een contractprogramma vereist.
- **Geen XER-uitwisseling:** onbruikbaar zodra men in een Tier-1-onderaannemingsketen komt.
- **Kleine leveranciers**, beperkte internationalisering, en bij Jobpac inmiddels onderdeel van Trimble (productstrategie buiten AU bepaald).

### 7.5 RIB CCS Candy

**Voordelen**
- **Uniek geïntegreerd:** één keten van BOQ → calculatie → programma → kostenbeheersing → certificering; *"Candy's planning tools allows businesses to gain an overview of all available resources and effectively plan and report on project statuses"* en het koppelt *"Bill of Quantity (BOQ), estimate and program"* in één platform.
- **Sterk bij civiele aannemers**, met name die met Zuid-Afrikaanse of internationale herkomst; lokale support in **Perth** en **Auckland**.
- **Programma is direct gekoppeld aan de calculatie** — een echt onderscheid ten opzichte van P6, waar het programma altijd los staat van het BOQ.

**Nadelen**
- **De planningsmodule is zwakker dan een dedicated scheduler** — het is een calculatiepakket met planning erbij, niet omgekeerd.
- **Geen transparante prijs**; derde partijen schatten USD 150–300/gebruiker/maand voor één gebruiker oplopend tot USD 10.000–20.000/maand bij 100 gebruikers [niet-officiële schatting].
- **Beperkte marktzichtbaarheid in AU/NZ**: nauwelijks publieke casestudy's, geen ecosysteem van trainers.
- **Steile leercurve** en een gedateerde gebruikerservaring volgens reviewbronnen.

### 7.6 De Australische mijnbouwschedulers (Deswik, XPAC, Alastri, Minemax)

**Voordelen**
- **Wereldklasse en lokaal ontwikkeld** — Deswik met 10.000+ licenties wereldwijd, XPAC in gebruik sinds 1980, Alastri met sterke open-pit-UX.
- **Domeinspecifieke optimalisatie** die generieke CPM-tools nooit kunnen bieden: haulage, blending, cut-off-grades, blast-/dig-blokken, equipment-simulatie.
- **Zeer hoge retentie en ARR-kwaliteit** — RPMGlobal rapporteert 94% gross en 115% net revenue retention op abonnementen.
- **Australische support en tijdzone** voor Australische mijnen.

**Nadelen**
- **Niet CPM-gebaseerd.** Voor een aannemer die een kapitaalproject bij een mijn uitvoert, blijft P6 noodzakelijk — deze tools vervangen dat niet.
- **Zeer duur en offerte-gebaseerd**; geen enkele van deze vendors publiceert prijzen.
- **Consolidatie-risico:** Deswik → Sandvik, Alastri → Micromine → AspenTech, Minemax → Datamine. De onafhankelijkheid en roadmapzekerheid staan onder druk; RPMGlobal is de laatste grote onafhankelijke Australische speler.
- **Zware implementatie** met verplichte consultancy.

### 7.7 InEight

**Voordelen**
- **Echt geïntegreerd project controls** (kosten, planning, forecasting, change, EVM) in één platform, wat in AU een schaars goed is.
- **Twee Australische kantoren** en aantoonbare Tier-1-klanten (CPB Contractors, John Holland).
- **Kiewit-DNA:** ontworpen door en voor een grote civiele aannemer, wat aansluit bij de Australische zelfuitvoerende aannemerscultuur.

**Nadelen**
- **Enterprise-only**: geen transparante prijs, lange implementatietrajecten, hoge instapkosten.
- **De schedulingcomponent is niet de sterkste laag**; veel InEight-klanten draaien alsnog P6 ernaast.
- **Beperkte NZ-aanwezigheid.**

### 7.8 Nodes & Links, ALICE Technologies, Spider Project, Safran

Ondanks gerichte zoekacties in beide markten heb ik **geen ANZ-resellers, ANZ-casestudy's of ANZ-vacature-eisen** gevonden voor deze vier pakketten. Conclusie: **verwaarloosbare marktaanwezigheid in Oceanië per juli 2026.** Voor zover AI-gestuurde schedule-analyse in AU wordt toegepast, loopt dat via **Deltek Acumen Fuse** (schedulekwaliteit), **Primavera Risk / Safran Risk** in incidentele gevallen, en via in-house Power BI-analyses. **[EIGEN CONCLUSIE op basis van negatieve zoekresultaten; afwezigheid van bewijs is geen bewijs van afwezigheid, maar het contrast met de vele treffers voor P6, Asta en Aphex is significant.]**

---

## 8. Implicaties voor een nieuwe Gantt/CPM-tool in deze regio

1. **XER is de toegangspoort, niet de UI.** Zonder betrouwbare P6-XER-import én -export (inclusief WBS, kalenders, relaties met lag, constraints, resources, codes en baselines) is een product uitgesloten van elk werk dat via TfNSW, Queensland Rail, Main Roads WA, Defence of een Tier-1-onderaannemingsketen loopt. Asta bewijst dat dit werkt als strategie: intern eigen model, extern het contractformaat.
2. **De prijsruimte onder A$2.060/jaar is bezet noch leeg.** Asta zit op A$2.060, P6 op **~A$920–2.350/jaar effectief** **[GECORRIGEERD: was "~A$1.300–2.700"; ondergrens = het geverifieerde tweedejaarsonderhoud A$917, bovengrens = de herberekende 5-jaars gemiddelde seatkosten A$2.354 — zie §3.3]**, MS Project op ~A$460–515/jaar. Een nieuwkomer moet ofwel duidelijk onder A$500/jaar/seat zitten (MKB, onderaannemers, NZ) ofwel op functionaliteit concurreren die geen van deze drie levert.
3. **Het MKB en Nieuw-Zeeland zijn de zachte flank.** In het AU-MKB en in de krimpende NZ-bouwmarkt is A$7.100 onbespreekbaar en is Excel de zittende concurrent. Dat is de enige plek waar een gratis of goedkope, open tool realistisch marktaandeel kan pakken.
4. **Auditability verkoopt.** Door de claimcultuur (SCL Protocol, AACE 29R-03, NSW Supreme Court-jurisprudentie) is een volledig, onweerlegbaar wijzigings- en baseline-logboek een commercieel argument, geen technisch detail.
5. **Datasoevereiniteit is een harde eis** bij defensie- en kritieke-infrastructuurwerk; een desktop- of self-hosted-optie is daar een voordeel ten opzichte van pure SaaS.
6. **Eén reseller kan volstaan.** Het kanaal is dun (Solid Support voor Asta in heel ANZ, Delta Solutions voor TILOS, twee à drie Oracle-partners). Een enkele goede lokale partner met eigen helpdesk en trainingsaanbod is de gebruikelijke route naar marktacceptatie.
7. **Lineaire planning en 4D zijn onderbediende niches** ten opzichte van de infrastructuurpijplijn: TILOS heeft één reseller, SYNCHRO is duur en Bentley-gebonden. Voor weg-, spoor- en pijpleidingwerk in AU/NZ is dit een reëel gat.

---

## 9. Belangrijkste onzekerheden in dit rapport

| Onderwerp | Onzekerheid | Impact |
|---|---|---|
| Marktaandelen per pakket | Geen enkele publieke survey meet dit voor AU/NZ; de verdeling in §3.2 is een eigen schatting op basis van kwalitatief bewijs | Hoog |
| Aantal planners | Afgeleid uit vacatureflow en beroepsmix; geen officiële telling | Hoog |
| Softwarebestedingen per laag | Volledig bottom-up geconstrueerd; enterprise-prijzen zijn niet publiek | Hoog |
| Aandeel ANZ in mijnbouwvendor-omzet | Geen vendor rapporteert geografische uitsplitsing op dit niveau | Middel-hoog |
| Smartsheet AUD-prijzen | De prijstabel werd bij extractie samengevoegd; interpretatie is aangegeven | Laag |
| BSA unlicensed-percentages | Waarschijnlijk uit een oudere editie; niet primair geverifieerd | Laag-middel |
| Seek-/LinkedIn-vacaturetellingen | Uit zoekresultaat-snippets; job boards blokkeren directe uitlezing | Middel |
| Te Waihanga pijplijnwaarde | Meerdere waarden circuleren (NZD 206,9 / 237 / 275 mrd) naar peildatum | Laag |
| P6-onderhoud vanaf jaar 2 | Twee Australische resellers spreken elkaar tegen (22% vs. 15,8% van de lijstprijs); gecorrigeerd naar de door Oracle opgegeven bedragen, zie §5.1 en **Verificatie #3** | Middel |
| Actualiteit TfNSW 5TP-FT-425 | Document draagt "© TfNSW 2015 / v1.0"; of dit in 2026 nog de geldende versie is, is niet vastgesteld — zie **Verificatie #11** | Middel |
| Groeivoet laag 2 (12–20%) | Onderbouwd met een mijnbouwsoftwarebedrijf (RPMGlobal) en met guidance i.p.v. realisatie — zie **Verificatie #9** | Middel-hoog |

> **Zie de sectie [Verificatie](#verificatie) onderaan** voor een onafhankelijke toets van zeventien kernbeweringen tegen de primaire bronnen, inclusief vier feitelijke correcties en één rechtgezette denkfout.

---

## 10. Bronnen

**Overheid, statistiek en pijplijn**
- Australian Bureau of Statistics — Construction Work Done, Australia, Preliminary (maartkwartaal 2026): https://www.abs.gov.au/statistics/industry/building-and-construction/construction-work-done-australia-preliminary/latest-release
- Infrastructure Australia: https://www.infrastructureaustralia.gov.au
- Infrastructure pipeline (ANZIP, Infrastructure Partnerships Australia): https://infrastructurepipeline.org
- EmuMoney — "Australia's $242B Infrastructure Pipeline": https://emumoney.com.au/news/20260407-infrastructure-pipeline-record-spending
- ANZ bluenotes — "Australian major projects: building to a peak?": https://www.anz.com.au/bluenotes/2025/april/birch-australia-major-projects-pipeline/
- Te Waihanga / NZ Infrastructure Commission — The Pipeline: https://tewaihanga.govt.nz/the-pipeline
- Stats NZ — Value of building work put in place: https://www.stats.govt.nz/
- Harrison Barratt — Australian construction market outlook 2026: https://www.harrisonbarratt.com.au/blog/australian-construction-market-outlook-2026-450-billion-pipeline-drives-record-infrastructure-growth
- Hubexo APAC — Australia construction outlook 2026: https://apac.hubexo.com/press-release/australia-construction-outlook-for-2026/

**Contract- en normeisen**
- Transport for NSW — Scheduling Schema and Specification: https://www.transport.nsw.gov.au/news-and-events/reports-and-publications/scheduling-schema-and-specification
- TfNSW Standard Requirements (Contract version) 5TP-FT-425: https://www.transport.nsw.gov.au/sites/default/files/media/documents/2017/TfNSW%20Standard%20requirements%20(Contract%20version)%205TP-FT-425-1.0.pdf
- TfNSW Standard Requirements (PSC version) 5TP-FT-410: https://www.transport.nsw.gov.au/sites/default/files/media/documents/2017/tfnsw-standard-requirements-psc-version-5tp-ft-410.pdf
- NZTA Waka Kotahi — Contract Procedures Manual SM021: https://www.nzta.govt.nz/resources/20-05-contract-procedures-manual-sm021
- Mosaic Project Services (Melbourne) — scheduling knowledge index: https://mosaicprojects.com.au/PMKI-SCH-010.php

**Prijzen en resellers**
- Prescience Technology — P6 Professional (PPM): https://www.prescience.com.au/product/primavera-p6-ppm/
- Prescience Technology — P6 EPPM: https://www.prescience.com.au/product/primavera-p6-eppm/
- Prescience Technology — softwarecatalogus (Acumen-prijzen): https://www.prescience.com.au/product-category/software/
- Prescience Technology — training: https://www.prescience.com.au/training/
- Equiv Technologies — Primavera-licentiegids AU: https://www.equivtech.com.au/Equiv-Technologies-Primavera-Licensing-Partner-in-Australia.html
- Successful Projects — P6 EPPM price: https://successfulprojects.com.au/primavera-p6-eppm-price/
- Compass Consult — Oracle P6 pricing in Australia: https://compassconsult.co/a-comprehensive-breakdown-of-oracle-p6-pricing-in-australia/
- Solid Support — Buy Powerproject (A$2.060/jaar): https://solidsupport.com.au/buy-powerproject/
- Solid Support — Asta Powerproject (ANZ-reseller): https://solidsupport.com.au/asta-powerproject/
- Solid Support — Kapitol casestudy: https://solidsupport.com.au/kapitol-asta-powerproject/
- Solid Support — Powerproject training: https://solidsupport.com.au/powerproject-training/
- Microsoft Australia — Project vergelijkingspagina (AU$2.299 / AU$1.149): https://www.microsoft.com/en-au/microsoft-365/project/compare-microsoft-project-management-software
- CostBench — Microsoft Project pricing (juli 2026): https://costbench.com/software/project-management/microsoft-project/
- Microsoft Learn — Planner/Project plan pricing: https://learn.microsoft.com/en-au/answers/questions/4433838/which-kind-of-license-request-for-planner-advanced
- Aphex — pricing (AUD): https://www.aphex.co/pricing
- Smartsheet — pricing (met AUD): https://www.smartsheet.com/pricing
- monday.com — pricing: https://monday.com/pricing
- Buildxact AU — pricing: https://www.buildxact.com/au/pricing/
- Mastt — pricing: https://www.mastt.com/pricing
- Assignar — pricing: https://www.assignar.com/pricing
- PMAI — Primavera P6 training Australia (vanaf A$1.499 + GST): https://pmai.com.au/primavera-p6-training
- Bentley Virtuosity — SYNCHRO: https://virtuosity.bentley.com/product/synchro/
- Delta Solutions (AU) — TILOS: https://deltasolutions.com.au/tilos/
- ECB-referentiekoersen via frankfurter.dev (24-07-2026): https://api.frankfurter.dev/v1/latest?base=AUD&symbols=USD,NZD

**Vendors en marktpositie**
- Eastwood Harris (Melbourne) — handboeken MSP / P6 PPM / P6 EPPM / Asta Powerproject: https://www.eastwoodharris.com/
- Elecosoft/Eleco — Asta Powerproject: https://eleco.com/products/asta/asta-powerproject/
- InEight — Project Controls: https://ineight.com/products/ineight-project-controls/
- InEight — bedrijfs-/locatie-informatie: https://ineight.com/
- Bentley — SYNCHRO: https://www.bentley.com/software/synchro/
- Cadalyst — 4D planning, ACCIONA op Victoria's Level Crossing Removal: https://blog.cadalyst.com/architecture-infrastructure-construction-solutions/4d-planning-expands-digital-delivery-of-construction-projects
- Trimble — TILOS: https://construction.trimble.com/en/products/tilos
- RIB Software: https://www.rib-software.com/en/
- Deswik: https://www.deswik.com/products/planning
- Mining Software Reviews — Deswik-profiel (Brisbane 2007, Sandvik 2022, 10.000+ licenties): https://www.miningsoftwarereviews.com/vendor/deswik
- ProMfg Media — Sandvik neemt Deswik over (AUD 79 mln omzet, ~300 medewerkers, 14 kantoren): https://promfgmedia.com/sandvik-to-acquire-australia-based-leading-mine-planning-software-company-deswik.php
- Sandvik — Integrated mine planning solutions: https://www.mining.sandvik/en/digital-solutions/mine-planning-and-optimization/integrated-mine-planning-solutions/
- RPMGlobal — FY2025 Investor Presentation (PDF): https://rpmglobal.com/wp-content/uploads/2025/08/20250826-Investor-Presentation-FY2025-Full-Year-Review.pdf
- RPMGlobal — FY2025 Annual Report (PDF): https://rpmglobal.com/wp-content/uploads/2025/08/20250826-2025-Annual-Report-Board-26Aug25-Final.pdf
- RPMGlobal — XPAC: https://www.rpmglobal.com/product/xpac/
- Alastri: https://www.alastri.com/software/
- Micromine — Alastri: https://www.micromine.com/alastri/
- Minemax (nu Datamine): https://www.minemax.com/
- Oracle — persbericht overname Aconex (USD 1,2 mrd, 2017): https://www.oracle.com/corporate/pressrelease/oracle-buys-aconex-121717.html
- Workbench International (NZ): https://www.workbench.co.nz/
- Trimble — Jobpac Connect (AU): https://construction.trimble.com/en-au/products/jobpac-connect

**Consultancy, arbeidsmarkt en praktijk**
- PPSS — project controls consultancy (BHP, Rio Tinto, Fortescue, AECOM, Aurecon, QLD Government, Queensland Rail): https://ppss.net.au/
- SPH Planning — P6 consulting Australia: https://sphplanning.com.au/comprehensive-primavera-p6-consulting-services-in-australia/
- Nomads PS — Primavera P6 scheduling: https://www.nomadsps.com.au/services/primavera-p6-scheduling
- Project Scheduling AU: https://www.projectscheduling.com.au/primavera-p6-scheduling-expert
- Efficient Schedule (Perth): https://www.efficientschedule.com.au/
- Scheduling Solutions (WA): https://schedulingsolutions.com.au/
- FR2 Infrastructure — scheduling (P6, MS Project, Excel, PowerPoint): https://fr2.com.au/services/scheduling/
- Aphex — "The Go-To Construction Scheduling Software in Australia" (WestConnex, Sydney Gateway): https://www.aphex.co/updates/construction-scheduling-software-in-australia
- GetApp Australia — Aphex: https://www.getapp.com.au/software/2062269/aphex
- Clicks IT Recruitment — Project Scheduler salary & rates: https://clicks.com.au/job-salary/project-scheduler/
- Glassdoor AU — Project Planner: https://www.glassdoor.com.au/Salaries/project-planner-salary-SRCH_KO0,15.htm
- Glassdoor AU — Project Scheduler: https://www.glassdoor.com.au/Salaries/project-scheduler-salary-SRCH_KO0,17.htm
- Indeed AU — Project Scheduler: https://au.indeed.com/career/project-scheduler/salaries
- Jora AU — Project Scheduler: https://au.jora.com/s/Project-Scheduler-salary
- Hays Australia — Salary Guide FY26/27: https://www.hays.com.au/salary-guide

**Marktrapporten (derden, uiteenlopend)**
- DataBridge Market Research — Australia construction management software: https://www.databridgemarketresearch.com/nucleus/australia-construction-management-software-market
- Grand View Research — Australia construction & design software: https://www.grandviewresearch.com/horizon/outlook/construction-and-design-software-market/australia
- 6Wresearch — Australia construction management solution: https://www.6wresearch.com/industry-report/australia-construction-management-solution-marketoutlook
- TheReportCubes — Australia digital construction: https://www.thereportcubes.com/report-store/digital-construction-market-australia

---

*Opgesteld 25 juli 2026. Alle bedragen in AUD tenzij anders vermeld; USD-equivalenten berekend tegen 1 AUD = 0,69879 USD en 1 NZD = 0,57881 USD (24-07-2026). Cijfers gemarkeerd met [EIGEN SCHATTING] zijn afleidingen van de onderzoeker met de vermelde aannames en geen gemeten waarden.*

---

## Verificatie

**Uitgevoerd:** 25 juli 2026, door een onafhankelijke fact-checker met als opdracht de kernbeweringen actief te **weerleggen**, niet te bevestigen.

**Methode.** Twaalf falsifieerbare kernbeweringen geselecteerd (marktomvang en de onderliggende redenering, prijzen, marktleiderschap, contract-/aanbestedingseisen, sancties). Elke bewering is (a) waar mogelijk tegen de **primaire bron** gehouden — niet tegen het zoekresultaat waaruit het rapport putte — en (b) volledig **nagerekend**. Waar bronnen WebFetch blokkeerden, is de pagina alsnog opgehaald met een directe HTTP-request met browser-user-agent; PDF's zijn lokaal geparsed. Alle rekenwerk is met een script gecontroleerd, niet uit het hoofd.

**Beperking van deze verificatieronde.** Het zoekmachinebudget van de sessie was bij aanvang uitgeput (200/200). Verificatie kon daardoor alleen via **gerichte fetches van bekende URL's** plaatsvinden, niet via nieuwe brede zoekacties. Gevolg: beweringen die alleen met nieuw zoekwerk te weerleggen zijn (vacaturetellingen, marktaandelen per pakket, afwezigheid van Nodes & Links/ALICE/Spider/Safran, salaristabellen, NZS 3910, Deltek-exclusiviteit, InEight-klanten) zijn **niet** getoetst en blijven staan op het betrouwbaarheidsniveau dat §9 er zelf aan geeft. Vier bronnen bleven onbereikbaar: Grand View Research (403), DataBridge (403), defence.gov.au en dfat.gov.au (verbinding geweigerd).

### Oordeel per bewering

| # | Bewering | Oordeel | Bron waartegen getoetst |
|---|---|---|---|
| 1 | **Bottom-up marktomvang, alle optellingen** (laag 1 = 7.000–11.000 × A$1.500–2.000 = A$10,5–22 mln; laag 2 = A$53–105 mln; laag 3 = A$45–75 mln; middenbreed A$71–135 mln; breed A$116–210 mln; USD-omrekening) | **Bevestigd** — elke optelling en omrekening klopt exact. Laag 3 telt op tot 44,5 (afgerond 45) en breed tot 115,5 (afgerond 116); USD breed 80,7–146,7 ≈ 81–147. Zie ook #2 | Eigen herberekening van §3.3 + [koers](https://api.frankfurter.dev/v1/latest?base=AUD&symbols=USD,NZD) |
| 2 | **Samenvatting §1 punt 9: "breed = A$130–210 mln (USD 90–147 mln)"** | **Gecorrigeerd** → A$116–210 mln (USD 81–147 mln). De samenvatting sprak de eigen berekening in §3.3 tegen; de ondergrens was ~12% te hoog. Idem §1 punt 10: harde kern 4.000–6.000 → 4.000–6.500 | Interne consistentiecontrole tegen §3.3/§3.2 |
| 3 | **P6-seatkosten: "22% jaarlijks onderhoud ≈ A$1.280–1.399/jr → A$2.450–2.670 per seat per jaar"** | **Gecorrigeerd** → **A$2.150–2.350**. De verkoper meldt zelf een door Oracle opgegeven **tweedejaarsbedrag van A$917 (PPM) / A$1.003 (EPPM)** = 15,8% van de lijstprijs, niet 22%. Herberekend: (5.820 + 1.280 + 4×917)/5 = A$2.154; (6.360 + 1.399 + 4×1.003)/5 = A$2.354. **Het rapport citeerde alleen de 22%-bron (Equiv) en negeerde de tegenspraak bij de bron die het voor de prijzen zelf gebruikt.** Doorwerking gecorrigeerd in §5.1, §7.1 en §8. **Uitkomst laag 1 blijft staan:** gewogen gemiddelde met de nieuwe P6-prijs = A$1.684–1.819, binnen de opgegeven A$1.500–2.000 | [Prescience PPM](https://www.prescience.com.au/product/primavera-p6-ppm/) en [EPPM](https://www.prescience.com.au/product/primavera-p6-eppm/) vs. [Equiv](https://www.equivtech.com.au/Equiv-Technologies-Primavera-Licensing-Partner-in-Australia.html) |
| 4 | **P6-lijstprijzen: PPM A$5.820 + A$1.280 = A$7.100 (A$6.809 netto); EPPM A$6.360 + A$1.399 = A$7.759 (A$7.441); 5% korting alleen op licentie; excl. GST; 1,9% creditcardtoeslag** | **Bevestigd** — alle zeven bedragen letterlijk teruggevonden, inclusief *"Our 5% online store discount applies to perpetual licence only. It is not applicable to First Year Maintenance"*, *"Price excludes GST"* en *"1.9% surcharge for all credit card transactions"*. Ook Deltek Acumen bevestigd: Fuse A$9.452 → A$9.083,65; suite A$17.975 → A$17.238,30 | [Prescience PPM](https://www.prescience.com.au/product/primavera-p6-ppm/) / [EPPM](https://www.prescience.com.au/product/primavera-p6-eppm/) |
| 5 | **Equiv-notering 2024 (A$5.775 + A$1.270 = A$7.050) → +10,1% in twee jaar, "grotendeels valuta-/lijstprijsindexatie"** | **Onzeker.** Bedragen en het percentage kloppen (bron zegt letterlijk *"Total = 7050 AUD (Average price as per 2024)"*, hoewel 5.775+1.270 = **7.045**). Maar het is een **"average price"** van een **andere reseller** vergeleken met een lijstprijs — dat kan geen prijsindexatie aantonen, en bij een vrijwel gelijke AUD/USD-koers in beide jaren verklaart valuta de +10% juist níet | [Equiv](https://www.equivtech.com.au/Equiv-Technologies-Primavera-Licensing-Partner-in-Australia.html) |
| 6 | **Asta Powerproject A$2.060/jaar, single user, incl. AU/NZ-support, ANZ-exclusief** | **Bevestigd** — bedrag, periode, inbegrepen support/updates/upgrades én de zin *"This licence is only available for Australian and New Zealand users"* alle letterlijk aangetroffen | [Solid Support](https://solidsupport.com.au/buy-powerproject/) |
| 7 | **Microsoft Project AU$2.299 / AU$1.149; "de regio krijgt géén korting"** | **Bevestigd en versterkt.** Beide AU-bedragen exact. De US-lijstprijs (USD 1.129,99 / 679,99) maakt de "Australia tax" hard meetbaar: **+42%**, of **+29%** na aftrek van GST. Twee kleine correcties: de toevoeging "incl. GST" staat niet op de Microsoft-pagina (aanname), en het beeld kantelt bij uitdagers — **Aphex prijst de regio juist ~50% goedkoper** dan zijn eigen USD-lijst | [Microsoft AU](https://www.microsoft.com/en-au/microsoft-365/project/compare-microsoft-project-management-software) + [Microsoft US](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) |
| 8 | **Aphex A$61 / A$88 per gebruiker/maand, min. 10 seats, AU-datacenter** | **Bevestigd** — bedragen, het minimum van 10 seats, de USD/GBP/EUR/CAD-tarieven, de zin over periodieke AUD-herziening en de keuze *"UK or Australian datacentres"* alle aangetroffen. A$88 × 10 × 12 = A$10.560/jaar klopt | [Aphex](https://www.aphex.co/pricing) |
| 9 | **RPMGlobal FY25/FY26 (omzet A$76,7 mln, ARR A$71,8 mln, 24% Scheduling ≈ A$17,2 mln, TCV A$100,8 mln, marge 96,3%, NRR 115%, guidance A$88–92 mln) als onderbouwing voor 12–20% groei in project-controls** | **Cijfers bevestigd, redenering onzeker.** Alle getallen regel voor regel teruggevonden in de primaire presentatie (ook 21% Scheduling in de TCV en 94% gross retention); 24% × 71,8 = 17,2 en de ANZ-afleiding 3,45–5,17 ≈ "A$3,5–5" kloppen; guidance = +14,7–19,9%. **Maar** RPMGlobal is mijnbouwsoftware (laag 3), guidance is geen realisatie, en de gerealiseerde FY25-groei was slechts **+6%** — het valideert de 12–20% voor laag 2 niet | [RPMGlobal FY2025 Investor Presentation (PDF, lokaal geparsed)](https://rpmglobal.com/wp-content/uploads/2025/08/20250826-Investor-Presentation-FY2025-Full-Year-Review.pdf) |
| 10 | **Deswik: Brisbane, opgericht 2007, overgenomen door Sandvik april 2022, AUD 79 mln omzet rolling-12m okt-2021, ~300 medewerkers, 14 kantoren in 10 landen, >10.000 licenties** | **Deels gecorrigeerd.** Omzet, medewerkers, kantoren/landen, licenties en Brisbane letterlijk bevestigd (plus: ~45% recurring, EBITA-marge ~30%). Twee fouten: Sandvik schrijft *"established in **2008**"*, niet 2007, en de overname is *"December 2021: Sandvik has signed an agreement to acquire"* — aangekondigd december 2021, niet "april 2022" | [Sandvik-persbericht via ProMfg Media](https://promfgmedia.com/sandvik-to-acquire-australia-based-leading-mine-planning-software-company-deswik.php) |
| 11 | **Contracteis: TfNSW schrijft Primavera P6 voor (Scheduling Schema + 5TP-FT-425)** | **Bevestigd en sterker dan geclaimd.** Het 56-pagina-PDF is opgehaald en doorzocht: *"The Contractor must develop, status and maintain the Contractor's Program in Primavera P6 on the Principal's planning environment"*, met levering *"(XER format)"* en Citrix-toegang *"at no extra cost"*. Dit is een harde software- én formaateis, geen loutere EVM-definitie. **Twee kanttekeningen:** het document draagt "© TfNSW 2015 / versie 1.0 / UNCONTROLLED WHEN PRINTED" (actualiteit **niet** vastgesteld), en de gratis Citrix-toegang betekent dat P6-dwang zich **niet** één-op-één in betaalde seats vertaalt — dat werkt naar beneden op laag 1 | [TfNSW 5TP-FT-425 (PDF, lokaal geparsed)](https://www.transport.nsw.gov.au/sites/default/files/media/documents/2017/TfNSW%20Standard%20requirements%20(Contract%20version)%205TP-FT-425-1.0.pdf) |
| 12 | **Sancties/exportbeperkingen raken de handel in planningsoftware in AU/NZ niet** | **Onzeker (strekking bevestigd, formulering te absoluut).** Geen tegenbewijs gevonden en de redenering is plausibel, maar de claim is **negatief** en de relevante overheidsbronnen waren onbereikbaar. Ontbrekende nuances toegevoegd in §6.7: de Defence Trade Controls Act 2012 (uitgebreid in 2024) raakt wie op defensiewerk toegang mag hebben tot planningsdata; autonome sancties raken export ván AU; US-exportcontrole geldt formeel op software van Amerikaanse herkomst | Niet primair verifieerbaar in deze ronde (defence.gov.au / dfat.gov.au weigerden verbinding) |
| 13 | **Aantal planners: 8.000–14.000 AU / 1.000–2.000 NZ, afgeleid uit 300–450 vacatures en 2,5–3,5 jaar verblijfsduur** | **Onzeker.** De rekenstap klopt (300–450 × 12 = 3.600–5.400 vervullingen; × 2,5–3,5 = 9.000–18.900) en 114/244 en 111/255 geven inderdaad ~0,45. **Maar de conclusietabel is intern strijdig met de eigen indicator C:** NZ 1.000–2.000 tegen AU 8.000–14.000 is een verhouding van 0,07–0,25, een factor 2–6 onder de 0,45 uit indicator C, zonder onderbouwing van die correctie. Bovendien berust de hele afleiding op niet-primair-geverifieerde snippets | Interne consistentiecontrole; brontellingen niet toetsbaar (zoekbudget uitgeput, Seek/Jora blokkeren) |
| 14 | **Externe rapporten "verschillen met een factor 6"** | **Gecorrigeerd** → factor **≈5**. Voor 2025: 6Wresearch USD 346 mln tegen TheReportCubes USD 70 mln = 4,9×. 6Wresearch is primair bevestigd (USD 346 mln 2025 → USD 414 mln 2032, CAGR 2,6%). Grand View en DataBridge blokkeerden (403); hun impliciete 2025-waarden (USD ~259 mln resp. ~95 mln) zijn afgeleid uit de in het rapport genoemde CAGR's en dus **onzeker** | [6Wresearch](https://www.6wresearch.com/industry-report/australia-construction-management-solution-marketoutlook) |
| 15 | **ABS-bouwproductie A$83.360,6 mln (maartkwartaal 2026), gebouwen A$44.708,6 mln, civiel A$38.652,0 mln, +3,4%/+0,6%/+6,9%, gepubliceerd 27-05-2026** | **Bevestigd** — alle zes cijfers en de publicatiedatum exact; 44.708,6 + 38.652,0 = 83.360,6 klopt, evenals de annualisering naar ~A$333 mrd | [ABS](https://www.abs.gov.au/statistics/industry/building-and-construction/construction-work-done-australia-preliminary/latest-release) |
| 16 | **Wisselkoersen 1 AUD = 0,69879 USD / 1 NZD = 0,57881 USD (24-07-2026)** | **Bevestigd** — API geeft AUD/USD 0,69879 en AUD/NZD 1,2073 per 2026-07-24; de afgeleide NZD/USD (0,69879 ÷ 1,2073 = 0,57880) klopt. **Maar de conclusie die eraan wordt opgehangen is gecorrigeerd:** "NZ betaalt 21% meer in eigen valuta" (§6.6) is een valuta-illusie — NZD 2.487 is exact dezelfde reële prijs als AUD 2.060 | [frankfurter.dev](https://api.frankfurter.dev/v1/latest?base=AUD&symbols=USD,NZD) |
| 17 | **Eastwood Harris-citaat over "the three main scheduling and control software packages used in Australia"** | **Onzeker.** De site voert boekenreeksen voor precies die drie pakketten, wat de strekking steunt, maar het citaat staat niet letterlijk op de aangehaalde pagina en de site vermeldt een **Brits** telefoonnummer (+44 203 174 0070), wat de aanduiding "Melbournse auteur" op zijn minst gedateerd maakt | [eastwoodharris.com](https://www.eastwoodharris.com/) |

### Samenvattend oordeel

**De hoofdconclusies van het rapport houden stand.** De belangrijkste kwantitatieve pijlers — P6- en Asta-prijzen, Aphex-prijzen, Microsoft-prijzen, de ABS-bouwcijfers, de RPMGlobal-cijfers, de Deswik-kerncijfers, de wisselkoersen en de contractuele P6-dwang bij TfNSW — zijn stuk voor stuk tegen de primaire bron gehouden en bleken **exact** gequoteerd. Op één punt is het rapport zelfs te terughoudend: de TfNSW-eis is een expliciete P6/XER-verplichting, geen aanbeveling.

**Vier zaken zijn feitelijk gecorrigeerd:** de tegenstrijdige marktomvang in de samenvatting (A$130 → A$116 mln ondergrens), de P6-onderhoudskosten vanaf jaar 2 (22% → 15,8%, met doorwerking op de seatkosten), het oprichtingsjaar en de overnamedatum van Deswik, en de spreiding tussen de externe marktrapporten (factor 6 → ~5).

**Eén analytische fout is rechtgezet:** de bewering dat Nieuw-Zeeland 21% meer betaalt is een rekeneenheid-illusie, geen prijsverschil.

**Vier claims blijven onzeker** en zijn als zodanig gemarkeerd: de planneraantallen (intern strijdig met de eigen NZ-indicator), de prijsindexatie-conclusie uit de Equiv-vergelijking, de absolute formulering over sancties, en het Eastwood Harris-citaat. Daarnaast blijft de groeivoet van 12–20% voor laag 2 zwak onderbouwd, omdat het bewijsstuk (RPMGlobal) uit een ander marktsegment komt.

**Wat opvalt aan de fouten die er wél waren:** ze wijzen allemaal dezelfde kant op — de marktomvang en de kosten per planner werden systematisch aan de hoge kant afgerond. Dat de uitkomst van laag 1 desondanks overeind blijft, komt doordat de opgegeven bandbreedte (A$1.500–2.000 per seat) ruim genoeg was om de fout op te vangen, niet doordat de onderliggende berekening klopte.
