# Marktonderzoek: projectplanning-/schedulingsoftware in Rest Latijns-Amerika (Chili, Colombia, Peru, Argentinië)

*Datum onderzoek: juli 2026. Regio: Latijns-Amerika, cluster "Rest LatAm" — Chili, Colombia, Peru, Argentinië. Alle bedragen USD tenzij anders vermeld. Schattingen zijn expliciet als **[SCHATTING]** gemarkeerd.*

---

## 1. Samenvatting

- **Tweelagenmarkt.** De markt splitst scherp in (a) een kapitaalprojecten-segment (mijnbouw in Chili/Peru, olie & gas in Argentinië/Vaca Muerta, infra-concessies/PPP's in Colombia en Chili) waar **Oracle Primavera P6 de onbetwiste standaard** is en vaak letterlijk als "excluyente" (harde eis) in vacatures en contracten staat, en (b) de brede bouw-/vastgoedsector waar **Microsoft Project de facto standaard** is, aangevuld met lokale kosten-/ERP-pakketten die een Gantt-module meenemen (S10 in Peru, SINCO in Colombia, Notrasnoches/Unysoft in Chili, DataObra in Argentinië).
- **P6 is een carrière-eis, geen keuze.** Bij Antofagasta Minerals, Codelco-contractors en mijnbouwaannemers staat P6 als "excluyente" in vacatures. In Peru geldt hetzelfde voor de grote mijnbouwprojecten; YPF in Argentinië werft inmiddels expliciet op **Oracle Primavera Cloud**. *(Gecorrigeerd: de eerdere claim "ca. 75% van de vacatures voor ingeniero de planificación eist P6" is verwijderd — dat percentage staat niet op de aangehaalde bronnen [Ecospace](https://www.ecospace.cl/curso/25/oracle-primavera-p6) en [PMI Santiago](https://www.pmi.cl/blog/conoce-primavera-p6-en-una-nueva-escuela-de-proyectos-de-pmi-santiago-chile-chapter-7848); PMI Santiago zegt alleen ongekwantificeerd dat "de meeste bedrijven" om P6-training vragen. Zie §Verificatie.)*
- **Overheid buiten de mijnbouw is MS Project-land.** De Peruaanse regelgeving eist een PERT-CPM-programma én een "cronograma valorizado de ejecución de obra" — en de MEF-richtlijn voor het expediente técnico noemt **MS PROJECT letterlijk bij naam** in de verplichte inhoudsopgave (geverifieerd in de primaire bron, zie §4.2; de institutionele verwijzing "OSCE" is mogelijk verouderd — inmiddels OECE). Het Colombiaanse staatsopleidingsinstituut SENA geeft gratis nationale cursussen "Microsoft Project: aplicación en la programación de obras" — dat verankert MS Project als volksstandaard in de bouw.
- **Chili is het meest volwassen en meest "lean"**: naast P6/MS Project bestaat er een uniek lokaal Last Planner-ecosysteem (IMPERA van GEPUC/UC, nu Gepro) dat wereldwijd vrijwel nergens anders zo'n positie heeft.
- **Marktomvang cluster**: **[SCHATTING] ~USD 150–190 mln (2025)** aan generieke projectmanagementsoftware voor de vier landen samen, waarvan **~USD 35–60 mln** echte Gantt/CPM-planningssoftware voor bouw/engineering/mijnbouw; groei ~15–16%/jaar. *(Gecorrigeerd: de oude bandbreedte 130–170 mln rustte op een rekenfout — zie §2.2. Twee onafhankelijke afleidingen komen nu uit op ~153–191 mln (top-down) en ~170 mln (bottom-up uit de landencijfers van Cognitive Market Research). De ~35–60 mln voor Gantt/CPM specifiek blijft een ongevalideerde eigen splitsing — geen bron kwantificeert dit subsegment; behandel als orde-van-grootte, niet als meting.)*
- **Kans voor lichtere tools**: buiten mijnbouw en megaprojecten is de markt onderbediend: MS Project wordt als te duur/te log ervaren, lokale pakketten zijn kostengedreven (presupuestos) met zwakke planning, en gratis alternatieven (ProjectLibre) worden vooral op universiteiten gebruikt. Spaanstalige lokalisatie, XER/MPP-uitwisseling en lage prijs zijn de toetredingssleutels.

---

## 2. Marktomvang en groei

### 2.1 Gepubliceerde cijfers (regio-niveau)

| Metriek | Waarde | Jaar | Bron |
|---|---|---|---|
| Projectmanagementsoftware Latijns-Amerika (omzet) | USD 550,6 mln | 2023 | [Grand View Research – LatAm PM Software Outlook](https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/latin-america) |
| Idem, prognose | USD 1.727,6 mln | 2030 | idem |
| Idem, CAGR 2024–2030 | 17,7% | — | idem |
| Aandeel LatAm in wereldwijde PM-softwaremarkt | 7,5% | 2023 | idem |
| PM-software Zuid-Amerika | **USD 525,281 mln**; CAGR 14,899% (2025–2033) | 2025 | [Cognitive Market Research – South America PM Software](https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report) |
| — idem, landensplitsing (2024) | Brazilië 153,04 · **Argentinië 60,07** · Colombia 31,82 · Peru 29,32 · Chili 25,74 · overig Z-Amerika 57,57 mln | 2024 | idem |
| Construction & design software LatAm | USD 782,9 mln (2024) → USD 1.410,8 mln (2030), **impliceert CAGR 10,3%** | 2024 | [Grand View Research – LatAm Construction & Design Software](https://www.grandviewresearch.com/horizon/outlook/construction-and-design-software-market/latin-america) |
| Construction-management-software LatAm | USD 382,15 mln tegen 2032, CAGR 9,43% (2026–2032) | prognose | [SNS Insider – CMS Market](https://www.snsinsider.com/reports/construction-management-software-market-3303) |

### 2.2 Afleiding voor het cluster Chili + Colombia + Peru + Argentinië

> **[GECORRIGEERD — rekenfout in de oorspronkelijke afleiding]** De vorige versie extrapoleerde USD 550,6 mln (2023) met 17,7% CAGR naar "~USD 650 mln in 2025". Dat is één jaar groei, niet twee: 550,6 × 1,177² = **USD 762,8 mln (2025)**. De oude basis was daarmee 17% te laag. (Ter controle: 550,6 × 1,177⁷ = 1.722,9 ≈ de door Grand View genoemde 1.727,6 mln voor 2030, dus het brontriplet is intern consistent — alleen de tussenstap was fout.)

**Afleiding A — top-down.** Brazilië en Mexico zijn samen goed voor naar schatting 60–65% van de LatAm-softwarebestedingen (Brazilië ~35–40%, Mexico ~20–25%). Chili, Colombia, Peru en Argentinië vertegenwoordigen samen grofweg 25–30% van het regionale bbp en — door de mijnbouw- en infra-intensiteit van Chili en Peru — een bovengemiddeld aandeel in *planning*-software specifiek. 20–25% van een gecorrigeerde LatAm-basis van USD 762,8 mln (2025) geeft **USD 153–191 mln**.

**Afleiding B — bottom-up (nieuw, sterker).** Cognitive Market Research publiceert wél landencijfers voor 2025 (waarden 2024): Argentinië 60,07 + Colombia 31,82 + Peru 29,32 + Chili 25,74 = **USD 146,95 mln (2024)**; doorgerekend met hun eigen landen-CAGR's (15,2–16,3%) → **USD 170,2 mln (2025)**.

- **Generieke PM-software, 4-landencluster: ~USD 150–190 mln (2025)** — de overlap van beide afleidingen.
- **Gantt/CPM-planningssoftware voor bouw/engineering/mijnbouw (de scope van dit rapport): ~USD 35–60 mln/jaar** — **[ONGEVALIDEERD]** eigen splitsing; geen enkele geraadpleegde bron kwantificeert dit subsegment apart. Opbouw: P6-licenties/-subscripties in mijnbouw/energie/infra (grootste waardeblok), MS Project-abonnementen in de bredere bouw, en lokale pakketten (S10, SINCO, ONDAC, DataObra) waarvan alleen het planningsdeel meetelt.
- **Groei: ~15–16%/jaar** (gecorrigeerd van 15–18%: CMR's landen-CAGR's liggen op 15,2–16,3%; alleen Grand View's regiobrede 17,7% ligt hoger), gedreven door de Chileens-Peruaanse koper-/lithium-investeringsgolf, Colombiaanse 5G-concessies (eerste golf: 14 projecten, COP 21,79 billones — geverifieerd bij [ANI](https://www.ani.gov.co/proyectos-concesiones-del-bicentenario-5g)) en Vaca Muerta/RIGI-megaprojecten in Argentinië (o.a. YPF's USD 25 mrd LLL Oil-project — [Mejor Energía](https://www.mejorenergia.com.ar/noticias/2026/05/15/5613-ypf-presento-al-rigi-el-proyecto-lll-oil-un-plan-para-el-shale-oil-de-vaca-muerta-por-usd-25000-millones)).

> **[BETROUWBAARHEIDSWAARSCHUWING]** De twee marktomvangbronnen zijn onderling én intern inconsistent. (a) Grand View (LatAm, USD 762,8 mln in 2025) en Cognitive Market Research (Zuid-Amerika, USD 525,3 mln in 2025) verschillen fors, terwijl Zuid-Amerika het grootste deel van LatAm-ex-Mexico is. (b) CMR's eigen landencijfers voor 2024 sommeren tot USD 357,6 mln, wat tegenover hun 2025-totaal van 525,3 mln een sprong van +46,9% impliceert — onverenigbaar met hun eigen CAGR van 14,9%. Beide zijn syndicated aggregator-rapporten zonder gepubliceerde methodologie. Behandel elk cijfer in deze paragraaf als orde-van-grootte met een foutmarge van minstens ±40%, niet als meting.

### 2.3 Ordegrootte gebruikers/planners

**[SCHATTING]** Op basis van vacaturedichtheid (**199** openstaande P6-treffers in Chili op Jooble, gecontroleerd 25 juli 2026 — [Jooble](https://cl.jooble.org/trabajo-primavera-p6); de eerder genoemde 161 voor mei 2026 is verouderd), het zeer dichte trainingsaanbod in alle vier landen en de omvang van de mijnbouw-/EPC-sector:

> **[METHODOLOGISCH VOORBEHOUD]** Een Jooble-teller is een trefwoordtreffer over geaggregeerde en vaak dubbel geposte vacatures, geen telling van functies die P6 daadwerkelijk eisen. Het getal fluctueert per dag en is ongeschikt als basis voor een gebruikersaantal. De onderstaande aantallen zijn daarom niet meer dan een orde-van-grootte.

- **Actieve P6-gebruikers cluster: ~15.000–25.000** (Chili ~6–9k, Peru ~4–7k, Colombia ~3–5k, Argentinië ~2–4k). **[TEGENSPRAAK]** Deze landenvolgorde staat haaks op de enige beschikbare landendata: Cognitive Market Research zet **Argentinië** met USD 60,07 mln (2024) op eenzame hoogte als grootste PM-softwaremarkt van de vier — ruim meer dan Chili (25,74) en Peru (29,32) samen. De volgorde hierboven is afgeleid uit mijnbouwintensiteit en vacaturedichtheid, niet uit bestedingen; als CMR klopt, is Argentinië structureel onderschat in dit rapport.
- **MS Project-gebruikers (planning in bouw/engineering): ~150.000–300.000** — een orde van grootte meer; SENA-cursussen alleen al bereiken duizenden cursisten per jaar.
- **Professionele planners (functietitel planificador/programador): ~30.000–50.000** in de vier landen samen.

---

## 3. Gebruikte software: marktpositie en prijzen

### 3.1 Rangorde (cluster-breed)

| # | Pakket | Positie in dit cluster | Kernsegment |
|---|---|---|---|
| 1 | **Oracle Primavera P6** (Professional/EPPM) | Dominant in mijnbouw, olie & gas, grote infra; contractueel/HR-matig verankerd ("excluyente") | Mijnbouwers, EPC's, grote aannemers, concessionarissen |
| 2 | **Microsoft Project** (Plan 3/5, Standard/Professional) | De facto standaard in de brede bouw en bij overheden; door SENA (CO) en OSCE-praktijk (PE) institutioneel verankerd | Aannemers, ingenieursbureaus, overheden |
| 3 | **Oracle Primavera Cloud (OPC)** | Snelst groeiende opvolger van P6 bij grote opdrachtgevers (YPF werft er expliciet op) | Owners, energie, mijnbouw |
| 4 | **Lokale kosten/ERP-pakketten met planningsmodule** — S10 (PE), SINCO ADPRO (CO), ONDAC & Unysoft (CL), DataObra (AR) | Per land sterk; planning is bijzaak naast presupuestos | MKB-aannemers, vastgoedontwikkelaars |
| 5 | **IMPERA (Chili)** | Uniek lokaal Last Planner-pakket, sterke positie in Chileense gebouwenbouw | Aannemers die Lean/LPS toepassen |
| 6 | **monday.com / Smartsheet / Wrike** | Groeiend in algemene PM buiten de bouw; Platinum-partner actief in CL/PE/EC/AR/CO | Diensten, IT, corporates |
| 7 | **TILOS (lineair), Bentley Synchro 4D, RIB Candy/Presto** | Niche: lineaire infra, 4D-BIM, aannemerskostprijs+planning; dealers aanwezig (MetaControl, BIMERS) | Infra-EPC's, wegen/pijpleidingen |
| 8 | **ProjectLibre / open source** | Gratis MS Project-kloon; vooral universiteiten en micro-aannemers | Onderwijs, MKB |

*Niet of nauwelijks aangetroffen in dit cluster: Asta Powerproject, Phoenix PM, Spider Project, Sciforma, Safran, Deltek Open Plan, nPlan, ALICE — geen zichtbare dealers, cursussen of vacatures in de vier landen (belangrijke negatieve bevinding: de "challenger"-laag die in Europa/VS bestaat, ontbreekt hier vrijwel volledig; het gat tussen P6 en MS Project is leeg).*

### 3.2 Prijzen en licentiemodellen

| Pakket | Lijstprijs / model | Bron |
|---|---|---|
| **Primavera P6 Professional** | USD 2.500 perpetual + USD 550/jr onderhoud (jaar 1 ≈ USD 3.050) — **[ONBEVESTIGD: derdenprijs, geen Oracle-lijstprijs]** | [ProjectManager.com](https://www.projectmanager.com/es/primavera-p6), [Taradigm](https://www.taradigm.com/how-much-does-primavera-p6-cost/) |
| — *let op* | **Oracle publiceert géén openbare prijslijst voor Primavera.** De [Oracle price-list-index](https://www.oracle.com/us/corporate/pricing/price-lists/index.html) bevat 20 prijslijsten (Technology, Applications, Fusion, Siebel, PeopleSoft, JD Edwards, MySQL, Java …) en géén enkele voor Primavera of Construction & Engineering; de [P6-productpagina](https://www.oracle.com/industries/construction-engineering/primavera-p6/) noemt geen prijs en geen licentiemodel en verwijst naar "Contact us". Alle P6-bedragen hieronder zijn dus reseller-/derdenschattingen, geen lijstprijzen. | eigen controle, juli 2026 |
| — lokale prijscontext Chili | CLP 4.119.900 incl. IVA (webaanbieding; lijst CLP 5.159.360) voor perpetual 1 user + 1 jr support = **USD 4.354 incl. IVA / USD 3.659 excl. IVA** (koers CLP 946,24/USD, 25-7-2026) | [Comgrap Store (Chili)](https://comgrapstore.cl/software/oracle/primavera-p6-professional-licencia-perpetua-1-usuario/), koers [mindicador.cl](https://mindicador.cl/api) |
| **Primavera P6 EPPM** | USD 2.750 perpetual + USD 605/jr onderhoud — **[ONBEVESTIGD: derdenprijs]** | [ProjectManager.com](https://www.projectmanager.com/es/primavera-p6) |
| **Oracle Primavera Cloud** | **USD 130/user/mnd** — enige concreet gepubliceerde resellerprijs: USD 7.800/jaar voor een 5-user starterpack (= USD 130/user/mnd), extra gebruikers USD 1.560/jr elk; **minimumafname 5 users, jaartermijn**. *(Gecorrigeerd: de eerder genoemde instap "vanaf USD 49/user/mnd" is nergens actueel terug te vinden en is vermoedelijk een verouderde Capterra-vermelding; de effectieve instapdrempel is USD 7.800/jaar.)* | [CDP Inc.](https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users) |
| **Microsoft Planner Plan 1 / Planner & Project Plan 3** | **USD 10,00 resp. USD 30,00 per gebruiker/maand, jaarlijks betaald** (bevestigd op de Amerikaanse Microsoft-prijspagina, juli 2026) | [Microsoft (en-us)](https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing) |
| **Planner & Project Plan 5** | **[ONZEKER]** de eerder vermelde USD 55/user/mnd staat **niet meer op Microsofts publieke prijspagina** — die toont in juli 2026 alleen Planner (in M365), Plan 1 en Plan 3. Plan 5 loopt via volumelicenties/partner; behandel USD 55 als historisch, niet als geverifieerde actuele lijstprijs. | [Microsoft (en-us)](https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing) |
| **Microsoft Project (perpetual)** | Project Standard 2024 **USD 679,99** eenmalig; Project Professional 2024 **USD 1.129,99** eenmalig | [Microsoft – compare project management software](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) |
| **monday.com / Smartsheet / Wrike** | **[SCHATTING/lijstprijs-indicatie]** ~USD 9–25 per seat/mnd, jaarlijks; implementatie via LatAm-partners (o.a. Platinum-partner met vestigingen in CL/PE/EC/AR/CO) | [HCO Insights](https://www.hco.com/es/insights/que-es-monday.com-y-por-que-es-importante-para-empresas-latinoamericanas) |
| **TILOS** (Trimble, lineaire planning) | **[SCHATTING]** ~USD 5.000–8.000 per licentie; verkoop via dealer MetaControl (Chili/Peru/Centraal-Amerika, sinds 1998) | [Tilos Americas – dealers](https://tilosamericas.com/locate-a-dealer-2/), [Capterra TILOS](https://www.capterra.com/p/235928/TILOS/) |
| **Bentley Synchro 4D** | licentie/abonnement via Virtuosity/partners (BIMERS in Chili); prijs op aanvraag, **[SCHATTING]** ~USD 2.500–5.000/jr per seat | [Virtuosity](https://es.virtuosity.com/synchro-4d), [BIMERS Chile](https://bimers.cl/service/synchro-4d-2/) |
| **RIB Candy** | abonnement per gebruiker (cloud), prijs via RIB CCS; **[SCHATTING]** ~USD 100–200/user/mnd; in PE/CL via comparasoftware zichtbaar aangeboden | [Capterra Candy](https://www.capterra.com/p/126567/Candy/), [Comparasoftware Perú](https://www.comparasoftware.pe/candy-ccs-proyectos-construccion) |
| **RIB Presto** (presupuestos + planning, Spaanstalig) | perpetual + onderhoud via lokale distributeurs (o.a. PCCAD LatAm); prijs op aanvraag, **[SCHATTING]** ~EUR 1.500–3.000 per licentie | [PCCAD LatAm](https://pccadla.com/software/rib-presto/), [Espacio BIM](https://www.espaciobim.com/presto) |
| **S10 ERP (Peru)** | modulair ERP, prijs op aanvraag (module Presupuestos + integratie) | [S10 Perú](https://www.s10peru.com/presupuestos/) |
| **SINCO ERP/ADPRO (Colombia)** | SaaS/ERP, prijs op aanvraag. **[ONBEVESTIGD]** het getal ">2.543 bouwbedrijven" is op sinco.co niet terug te vinden — de tellerwidget rendert als "0 Empresas en Colombia y Latinoamérica". Het is hoe dan ook een leveranciersclaim zonder onafhankelijke bevestiging. | [SINCO](https://www.sinco.co/), [Comparasoftware CO](https://www.comparasoftware.co/sinco-erp) |
| **ONDAC (Chili)** *(voorheen als "Notrasnoches" opgevoerd)* | ERP-plannen op Comparasoftware staan als "**SETUP INICIAL** desde 1,5 UF + IVA" (contable-tributair en remuneraties) resp. 2 UF voor de combinatie; het bouw-ERP zelf staat op "**Bajo Cotización**". 1,5 UF = CLP 61.267 = **USD 65 excl. / USD 77 incl. IVA** (UF 40.844,79 en CLP 946,24/USD op 25-7-2026) — niet "≈ USD 60". Presupuesto-software (Evolution) en Manual de Precios: prijs niet gepubliceerd. | [Comparasoftware CL](https://www.comparasoftware.cl/notrasnoches-erp), [Ondac](https://ondac.com/), [mindicador.cl](https://mindicador.cl/api) |
| **Unysoft ERP (Chili)** | modulair web-ERP, prijs op aanvraag | [Unysoft](https://unysoft.cl/), [Comparasoftware CL](https://www.comparasoftware.cl/unysoft) |
| **DataObra (Argentinië)** | licentie/abonnement, prijs op aanvraag (historisch éénmalige licentie + updates) | [DataObra](https://www.dataobra.net/), [Comparasoftware AR](https://www.comparasoftware.com.ar/dataobra-construccion) |
| **IMPERA (Chili)** | SaaS op aanvraag via Gepro/GEPUC | [impera.cl](https://www.impera.cl/), [Gepro](https://gepro.cl/servicios/impera/) |
| **ProjectLibre** | gratis (open source), MPP-import/export | [ProjectLibre-overzicht (AR)](https://librerialatijera.com.ar/proyecto-libre/) |

### 3.3 Per pakket: wie gebruikt het en waarom

**Oracle Primavera P6** — Gebruikt door: mijnbouwers (Codelco, BHP/Escondida, Antofagasta Minerals in Chili; Quellaveco/Las Bambas-achtige projecten in Peru), hun EPC's en contractors (Soletanche Bachy, Tecnologías Cobra e.v.a.), energiebedrijven, metro-/snelwegprojecten. Vacatures noemen P6 routinematig "excluyente" ([Antofagasta Minerals-vacatures](https://chilepaisminero.com/antofagasta-minerals-empleo-marzo-abril-2025/), [trabajo.org Antofagasta](https://cl.trabajo.org/empleo-planificador+de+proyectos+de+obra+minera/Antofagasta), [Indeed Chile](https://cl.indeed.com/q-primavera-p6-empleos.html)). **[GECORRIGEERD]** De eerdere zin "cursusaanbieders melden dat ~75% van de planner-vacatures P6 eist en dat het gebruik zich uitbreidt naar retail, metro en snelwegen" is niet houdbaar: geen van beide aangehaalde pagina's bevat dat percentage of die sectorclaim. De [Ecospace-cursuspagina](https://www.ecospace.cl/curso/25/oracle-primavera-p6) geeft alleen cursusinhoud en -prijs en noemt geen enkele arbeidsmarktstatistiek; het [PMI Santiago-blog](https://www.pmi.cl/blog/conoce-primavera-p6-en-una-nueva-escuela-de-proyectos-de-pmi-santiago-chile-chapter-7848) stelt slechts ongekwantificeerd dat "de meeste bedrijven in alle sectoren" om P6-training vragen. Bovendien zijn cursusaanbieders commercieel belanghebbend bij een hoog P6-vraagcijfer — ongeschikt als onafhankelijke bron. Wat wél overeind blijft: P6 komt als "excluyente" in concrete mijnbouwvacatures voor, en een trefwoordzoektocht op Jooble Chili geeft 199 treffers (25-7-2026). Het trainingsecosysteem is in alle vier landen dicht: PUCV, RedCapacitación, CVA (CL); RyB, Risk Perú, TEDI (PE); Planicontrol (AR).

**Microsoft Project** — Het werkpaard van de "gewone" bouw: aannemers, ingenieursbureaus, gemeenten, ministeries. In Peru gekoppeld aan S10 in het standaard-duo "S10 + MS Project" dat in vrijwel elke kostencursus zit ([CERSA](https://cersa.org.pe/cursos/costos-presupuestos-y-programacion-de-obras-con-s10-y-ms-project/), [CCIP](https://ccipperu.com/producto/costos-presupuestos-y-programacion-de-obras-con-s10-y-ms-project/), [Gesconvial](https://gesconvial.com.pe/courses/costos-y-presupuestos-programacion-de-obras-s10-agosto-2025/)). In Colombia geeft staatsinstituut SENA een gratis landelijk 40-uurs cursus "Microsoft Project: aplicación en la programación de obras" ([SENA/Betowa](https://betowa.sena.edu.co/oferta/microsoft-project-aplicacion-en-la-programacion-de-obras?programId=87329&modality=V), [SENA PDF](https://zajuna.sena.edu.co/cms-oferta/48_21310002.pdf)).

**Oracle Primavera Cloud** — Groeit bij owners: YPF (Argentinië) zoekt een "Planning & Tool Manager" specifiek voor Oracle Primavera Cloud-implementatie in Vaca Muerta ([LM Neuquén/Mase](https://mase.lmneuquen.com/vaca-muerta/trabajo-vaca-muerta-ofertas-laborales-activas-ypf-techint-pluspetrol-y-vmos-n1221633)).

**monday.com / Smartsheet / Wrike** — Buiten de bouw (IT, diensten, marketing, corporates) in opmars; monday.com heeft een Platinum-partner met kantoren in Chili, Peru, Ecuador, Argentinië en Colombia ([HCO](https://www.hco.com/es/insights/que-es-monday.com-y-por-que-es-importante-para-empresas-latinoamericanas)). Voor serieuze CPM-planning in de bouw spelen ze (nog) geen rol van betekenis.

**TILOS / Synchro / Candy / Presto** — Niches met echte maar kleine voetafdruk: TILOS via dealer MetaControl (Chili/Peru, sinds 1998 betrokken bij grote lineaire projecten — [tilosamericas.com](https://tilosamericas.com/locate-a-dealer-2/)); Synchro 4D via BIM-integrators als BIMERS Chile ([bimers.cl](https://bimers.cl/service/synchro-4d-2/)); RIB Candy wordt in Peru/Chili aangeboden ([Comparasoftware PE](https://www.comparasoftware.pe/candy-ccs-proyectos-construccion)); Presto (RIB, Spaans) is bekend in academische en aannemerskringen ([USACH-artikel via rib-software.es](https://www.rib-software.es/pdf/Art%C3%ADculos/Consideraciones-de-licitacion-con-Presto-USACH.pdf)).

**ProjectLibre** — Gratis MPP-compatibele kloon, vooral gebruikt op universiteiten en door micro-aannemers; Spaanstalige documentatie en actieve verspreiding in de regio ([librerialatijera.com.ar](https://librerialatijera.com.ar/proyecto-libre/)).

---

## 4. Lokale bijzonderheden per land

### 4.1 Chili
- **Mijnbouw dicteert de standaard**: P6 "excluyente" in vacatures; Codelco's Vicepresidencia de Proyectos werkt met formele projectcontrols-kaders in aanbestedingen ([Codelco licitaciones](https://www.codelco.com/licitaciones-en-proceso)); regiovereiste "residencia en Región de Antofagasta" komt vaak bovenop de P6-eis ([trabajo.org](https://cl.trabajo.org/oferta-1401-a9d78418e9d2e35cab13f894c728eceb)).
- **Concessies/PPP's (MOP-DGC)**: gestandaardiseerd systeem van bidding bases met goedkeuring van Hacienda; programma's van werken en Gantt-onderbouwing zijn vast onderdeel van de bases ([KPMG Infrastructure Insights Chile](https://assets.kpmg.com/content/dam/kpmg/cl/pdf/2024/advisory/infrastructure_insights-ed-04_esp.pdf)).
- **Lean/Last Planner-cultuur**: uniek sterk; academisch verankerd via GEPUC (Universidad Católica) met eigen software IMPERA en wetenschappelijke literatuur over LPS-tooling ([SciELO Chile](https://www.scielo.cl/scielo.php?pid=S0718-50732020000200126&script=sci_arttext), [Ingeniería UC](https://www.ing.uc.cl/publicaciones/recomendaciones-e-indicadores-claves-para-una-exitosa-implementacion-del-sistema-last-planner-en-proyectos-de-edificacion/)).
- **Prijscontext** *(gecorrigeerd — appels met peren)*: de oude claim "~40% boven de US-lijstprijs" vergeleek een Chileense prijs **inclusief** 19% IVA met een Amerikaanse prijs **exclusief** btw. Consistent doorgerekend (koers CLP 946,24/USD, 25-7-2026): Comgraps aanbiedingsprijs CLP 4.119.900 incl. IVA = USD 3.659 excl. IVA, oftewel **+20%** boven de US-jaar-1-referentie van USD 3.050; tegen Comgraps *lijst*prijs CLP 5.159.360 incl. IVA (= USD 4.582 excl. IVA) is het **+50%**. De juiste formulering is dus "+20% (aanbieding) tot +50% (lijst)", niet "~40%" — en de US-referentie zelf is een derdenschatting, geen Oracle-lijstprijs. UF-gebaseerde abonnementen zijn gebruikelijk bij lokale software.
- **Opleiding**: dicht aanbod (PUCV, RedCapacitación, Ecospace, CVA, PMI Santiago Chapter met eigen "Escuela de Proyectos").

### 4.2 Peru
- **Regelgeving stuurt het formaat — en noemt MS Project bij naam.** **[BEVESTIGD EN AANGESCHERPT]** Uit de MEF-richtlijn *Pautas para elaborar el expediente técnico* (primaire bron, eigen tekstextractie uit de PDF) blijkt dat het contenido básico van het expediente técnico letterlijk voorschrijft: *"Cronograma valorizado de ejecución de obra, Calendario de adquisición de materiales, Cronograma de Ejecución de Obras **(MS PROJECT)**"* én, als aparte regel, *"Programa de ejecución de obras **(PER-CPM)**"* [sic — kennelijke typefout voor PERT-CPM]. MS Project staat dus niet alleen "in de praktijk" in de stukken, het staat met naam in de MEF-checklist — sterker bewijs dan het rapport oorspronkelijk claimde. Let wel: de gebruikte term is *cronograma valorizado de ejecución de obra*; de in dit rapport eerder gebruikte term "calendario de avance de obra valorizado (CAOV)" komt in dit MEF-document niet voor ([MEF-richtlijn expediente técnico](https://www.mef.gob.pe/contenidos/inv_publica/docs/capacitaciones/Pautas_para_elaborar_expediente_tecnico.pdf)).
- **[ONZEKER — mogelijk verouderde institutionele verwijzing]** Dit rapport verwijst naar "OSCE" en de "Ley de Contrataciones del Estado" (Ley 30225) als vigerend kader. Het domein **oece.gob.pe is live en leidt door naar gob.pe/oece**, wat erop wijst dat het toezichtsorgaan inmiddels **OECE** (Organismo Especializado para las Contrataciones Públicas Eficientes) heet, onder een nieuwe Ley General de Contrataciones Públicas. De exacte wetsverwijzing en ingangsdatum konden niet onafhankelijk worden geverifieerd (gob.pe blokkeert geautomatiseerd ophalen; es.wikipedia's OSCE-artikel is niet bijgewerkt). **Te verifiëren vóór publicatie**; de inhoudelijke eis (CPM + cronograma valorizado) is er hoogstwaarschijnlijk niet door veranderd, de institutionele naamgeving wel.
- **S10 + MS Project is het nationale duo** voor kosten + planning; elke serieuze bouwprofessional volgt die combinatiecursus ([CERSA](https://cersa.org.pe/cursos/costos-presupuestos-y-programacion-de-obras-con-s10-y-ms-project/) e.v.a.).
- **Mijnbouw = P6**, inclusief Chileens-Peruaanse kruisbestuiving (dezelfde contractors, bv. Soletanche Bachy Perú werft P6-planners voor Chileense sites — [trabajo.org](https://cl.trabajo.org/oferta-1401-099dde2594b2ef9b503fc9e514eb815c)); cursussen combineren P6 met Last Planner en Power BI ([Risk Perú](https://riskperu.com/cursos/planificacion-y-control-de-proyectos-en-construccion-y-mineria-con-primavera-p6-last-planner-power-bi-y-chatgpt/)).
- **Fórmula polinómica** (wettelijke prijsindexering) is een lokale eis die planningen aan valorisatie koppelt — buitenlandse software ondersteunt dit niet native; lokale pakketten (S10) wel.

### 4.3 Colombia
- **SENA-effect**: gratis, landelijke MS Project-cursussen voor bouwprogrammering maken MS Project tot de bodemstandaard ([SENA](https://betowa.sena.edu.co/oferta/microsoft-project-aplicacion-en-la-programacion-de-obras?modality=V)).
- **Concessies 4G/5G (ANI)**: contract- en interventoría-regime (toezichthouders valideren functionele eenheden voor betaling) creëert vraag naar professionele scheduling en earned value bij concessionarissen en interventores; eerste 5G-golf = 14 projecten / COP 21,79 bln ([ANI](https://www.ani.gov.co/proyectos-concesiones-del-bicentenario-5g), [contrato de concesión 5G](https://www.ani.gov.co/sites/default/files/contrato_de_concesion_5g.pdf), [El Colombiano](https://www.elcolombiano.com/negocios/las-concesiones-5g-arrancan-con-14-megaobras-LE17642687)).
- **Lokale ERP-laag is sterk**: SINCO ERP/ADPRO (naar eigen zeggen >2.543 bouwbedrijven in LatAm — [sinco.co](https://www.sinco.co/)), Construdata (Legis, kostendata + software), plus metroKUBIKO, ProyecPro, DataObra-varianten ([Comparasoftware CO](https://www.comparasoftware.co/construccion), [GuiaTIC](https://guiatic.com/co/360-software-para-gestion-de-obras-sector-construccion-sistemas-erp-constructoras)).
- P6 concentreert zich bij grote concessionarissen, olie (Ecopetrol-keten) en internationale EPC's; de brede aannemersmarkt is MS Project/Excel.

### 4.4 Argentinië
- **Obra pública-formalisme**: aanbestedingen eisen "Plan de Trabajos y Curva de Inversión" (S-curve op basis van Gantt), met standaardsjablonen bij o.a. Vialidad Nacional en provinciale portalen — vaak gewoon in Excel/MS Project aangeleverd ([Vialidad Nacional pliego](https://www2.vialidad.gob.ar/sites/default/files/licitaciones/7121/pliego-obra/IF-2021-28643097-APN-DS%25DNV.pdf), [Córdoba instructivo](https://compraspublicas.cba.gov.ar/wp-content/uploads/2021/06/INSTRUCTIVO-PLAN-DE-TRABAJO-Y-CURVA-DE-INVERSION-1-1.pdf)).
- **Vaca Muerta professionaliseert**: YPF, Techint, Pluspetrol en VMOS werven planners; YPF standaardiseert op Oracle Primavera Cloud + Power BI ([Mase/LM Neuquén](https://mase.lmneuquen.com/vaca-muerta/trabajo-vaca-muerta-ofertas-laborales-activas-ypf-techint-pluspetrol-y-vmos-n1221633)); P6-training via Planicontrol e.a. ([planicontrol.com](https://www.planicontrol.com/curso/primavera-p6-nivel-fundamental)).
- **Macro-volatiliteit** (inflatie, wisselkoers) maakt perpetual-licenties in USD lastig; lokale pakketten (DataObra) winnen op peso-prijzen en maandelijkse prijsupdate-databases.

### 4.5 Clusterbrede bijzonderheden
- **Taal**: Spaanstalige UI en training zijn feitelijk verplicht voor het brede segment; P6 wordt in het Engels gebruikt in mijnbouw/EPC (Engels is daar werktaal in projectcontrols), maar cursussen zijn in het Spaans.
- **XER-uitwisseling** is de lingua franca in mijnbouw/energie: contractors moeten XER-bestanden bij owners aanleveren; wie hier wil meespelen zonder P6-import/export staat buitenspel.
- **Opleidingscultuur**: sterk diploma-/certificaatgedreven; een dichte laag commerciële trainers (CERSA, CACP, Gesconvial, RedCapacitación, PMI-chapters) fungeert de facto als distributiekanaal voor softwarestandaarden.
- **Resellers**: Comgrap (CL, Oracle), MetaControl (CL/PE, TILOS), BIMERS (CL, Bentley), PCCAD (LatAm, RIB), HCO e.a. (monday.com Platinum, CL/PE/EC/AR/CO).

---

## 5. Lokale/niche-pakketten: voor- en nadelen (eigen beoordeling)

### 5.1 S10 ERP (Peru) — [s10peru.com](https://www.s10peru.com/presupuestos/)
De nationale standaard voor kosten/presupuestos, met ERP-modules en koppeling naar planning.
- **Voordelen**: de facto verplichte kost voor Peruaanse obra pública (APU's, fórmula polinómica, cronograma valorizado native); enorme installed base en cursusaanbod; integreert presupuesto ↔ planning ↔ valorizaciones zoals de OSCE-praktijk het eist.
- **Nadelen**: verouderde desktop-UX (klassiek Windows-ERP); planning zelf is zwak — vrijwel iedereen exporteert naar MS Project voor het echte CPM-werk; alleen Peru-relevant (regelgeving hardcoded); prijs niet transparant (offerte).

### 5.2 SINCO ERP / ADPRO (Colombia) — [sinco.co](https://www.sinco.co/soluciones/administracion-de-proyectos-de-construccion)
Colombiaans bouw-ERP met projectadministratiemodule (ADPRO): budgetstructuur, cronograma's, earned value.
- **Voordelen**: gebouwd rond Colombiaanse uitvoeringspraktijk (capítulos/subcapítulos/ítems); real-time kostencontrole gekoppeld aan planningsactiviteiten (earned value); multimoneda. *(De ">2.500 bedrijven"-claim is geschrapt als voordeel: het cijfer is niet op sinco.co terug te vinden — de tellerwidget toont "0 Empresas" — en is hoe dan ook een onbevestigde leveranciersclaim.)*
- **Nadelen**: het is een ERP, geen planningstool — CPM-diepgang (constraints, float-analyse, resource leveling) ontbreekt; vendor lock-in op de hele administratie; prijs op aanvraag en implementatietraject nodig; buiten Colombia/Andes-regio weinig bekend.

### 5.3 ONDAC (Chili) — [ondac.com](https://ondac.com/), [Comparasoftware](https://www.comparasoftware.cl/notrasnoches-erp)
**[GECORRIGEERD — naam én cijfers]** Dit onderdeel stond eerder als "Notrasnoches / Ondac, Chileense marktleider in presupuestos met geclaimde 71% marktaandeel, >1.900 klanten en >4.500 licenties". Twee problemen:
1. **De leverancier heet ONDAC.** Het domein notrasnoches.cl is niet meer van dit bedrijf — het geeft een 301-redirect naar hostdescuento.com (een hostingaanbieder). "Notrasnoches" leeft alleen nog voort als inlogdomein (gestion.notrasnoches.com) voor ONDAC's Construction Solution. Het als zelfstandige marktleider opvoeren van "Notrasnoches" is onjuist.
2. **De cijfers 71% / 1.900 / 4.500 zijn nergens terug te vinden.** Noch [ondac.com](https://ondac.com/) noch de aangehaalde [Comparasoftware-pagina](https://www.comparasoftware.cl/notrasnoches-erp) noemt een marktaandeel, klantenaantal of licentieaantal. Schrappen of expliciet als onbevestigde leveranciersclaim markeren; een marktaandeel van 71% mag niet onbewezen in een marktrapport staan.

ONDAC verkoopt aantoonbaar wel: Evolution Cloud, Presupuesto de Obra Evolution (+Plus), Adjuster, Estimate, Gestión de Costos, Subcontratos, Ondac Data, Guía de Obras en de Manual de Precios (prijzendatabase).
- **Voordelen**: dé Chileense kostendatabase (materiaal-/activiteitprijzen) — gemeenten, universiteiten en overheden gebruiken het als referentie; laagdrempelige UF-abonnementen; decennialange lokale support.
- **Nadelen**: primair een presupuesto-tool, geen echte scheduler (geen serieuze CPM/resource-engine); desktop-erfenis; alleen-Chili-focus; planning gebeurt ernaast in MS Project.

### 5.4 DataObra (Argentinië) — [dataobra.net](https://www.dataobra.net/)
Argentijns pakket voor presupuesto + certificaten + Gantt-planning voor aannemers.
- **Voordelen**: Gantt-module ingebouwd (taken, relaties, certificados de avance); periodiek geactualiseerde prijsdatabases — cruciaal bij Argentijnse inflatie; multi-empresa/multi-moneda; peso-geprijsd en lokaal ondersteund.
- **Nadelen**: planning is basaal (geen float-/risicoanalyse, geen multiuser-scheduling op schaal); gedateerde technologie; kleine organisatie erachter (continuïteitsrisico); geen positie buiten Argentinië.

### 5.5 IMPERA (Chili) — [impera.cl](https://www.impera.cl/), [Gepro](https://gepro.cl/servicios/impera/)
Last Planner System-software, ontwikkeld door GEPUC (Universidad Católica), ~15 jaar praktijkhistorie, nu via Gepro vermarkt; app + web, Gantt + Kanban + LPS-metrics (PPC, oorzaken van niet-naleving).
- **Voordelen**: Spaanstalige LPS-tool met academische onderbouwing (SciELO-publicaties); sluit exact aan op de sterke Chileense lean-bouwcultuur; commitment-tracking en betrouwbaarheidsmetrics die P6/MS Project niet bieden; mobiel/terrein-gericht. *(De superlatief "enige volwassen Spaanstalige LPS-tool **ter wereld**" is geschrapt — een wereldwijde exclusiviteitsclaim is niet te onderbouwen en niet getoetst tegen Spaanse/Mexicaanse LPS-aanbieders.)*
- **Bevestigd**: [impera.cl](https://www.impera.cl/) beschrijft uitsluitend Last Planner-, Kanban- en Visual-Management-functionaliteit (taken naar status geblokkeerd/pending/klaar, registratie van niet-nalevingsoorzaken, restricties vanaf mobiel) — **geen CPM/kritieke-pad-engine**, en er staat geen prijs op de site. De positionering "aanvulling op, geen vervanging van, de masterplanning" klopt dus.
- **Nadelen**: geen CPM-engine — het vervangt de masterplanning niet en moet naast P6/MS Project draaien; markt beperkt tot lean-adopters (vooral Chili, wat Peru/Colombia); SaaS-prijs niet publiek; afhankelijk van één klein team/instituut.

### 5.6 Unysoft ERP (Chili) — [unysoft.cl](https://unysoft.cl/)
Chileens web-ERP voor bouw: presupuesto, programación, controle, facturatie.
- **Voordelen**: 100% web/modulair; koppelt planning aan budgetcontrole en onderaannemersbeheer; Chileense e-facturatie (DTE) native.
- **Nadelen**: planningsmodule is administratief (voortgang/controle), geen scheduling-engine; kleine speler naast Notrasnoches/iConstruye; prijs op aanvraag.

---

## 6. Strategische observaties voor een licht planningsalternatief (Open Planner Studio-perspectief)

1. **Het middenveld is leeg**: tussen P6 (te duur/te zwaar — in Chili aantoonbaar USD 3.659 excl. IVA voor één perpetual seat + 1 jaar support, en Oracle Primavera Cloud met een minimumafname van USD 7.800/jaar voor 5 users) en Excel/lokale ERP-Gantt (te zwak) zit in deze vier landen vrijwel niets — de Powerproject/Phoenix-laag die in de VS/EU bestaat, ontbreekt. *(Kanttekening: het "ontbreken" van Asta Powerproject, Spider Project, Safran e.a. in §3.1 is een **negatieve bevinding uit afwezigheid van zoekresultaten**, niet uit een leveranciersinventarisatie — afwezigheid van bewijs, niet bewijs van afwezigheid.)*
2. **Toetredingseisen**: Spaanse UI (aanwezig in OPS via i18n), MPP- én XER-import/export (XER is de valuta in mijnbouw), cronograma valorizado / S-curve-export (PE/AR-aanbestedingsformaten), lage of gratis instapprijs (SENA-/universiteitskanaal).
3. **Distributie loopt via trainers**: wie CERSA/SENA/PMI-chapters/RedCapacitación als kanaal wint, wint de volgende generatie planners.
4. **Browser-first is een voordeel**: lokale IT-omgevingen zijn heterogeen; de web-build zonder installatie past goed bij MKB-aannemers en overheden.

---

## 7. Bronnen (selectie, alle geraadpleegd juli 2026)

**Markt & cijfers**
- https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/latin-america
- https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report
- https://www.grandviewresearch.com/horizon/outlook/construction-and-design-software-market/latin-america
- https://www.snsinsider.com/reports/construction-management-software-market-3303
- https://www.businesswire.com/news/home/20250423900619/en/Latin-America-Construction-Industry-Report-2025-Brazil-Chile-Argentina-Colombia-Mexico-Market-Size-Forecast-by-Value-and-Volume-2020-2029---ResearchAndMarkets.com

**Prijzen**
- https://comgrapstore.cl/software/oracle/primavera-p6-professional-licencia-perpetua-1-usuario/
- https://www.projectmanager.com/es/primavera-p6
- https://www.taradigm.com/how-much-does-primavera-p6-cost/ en https://www.taradigm.com/how-much-does-primavera-cloud-cost/
- https://www.microsoft.com/es-mx/microsoft-365/planner/microsoft-planner-plans-and-pricing
- https://www.capterra.com/p/145503/Oracle-Primavera/ ; https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users

**Chili**
- https://www.pmi.cl/blog/conoce-primavera-p6-en-una-nueva-escuela-de-proyectos-de-pmi-santiago-chile-chapter-7848
- https://www.ecospace.cl/curso/25/oracle-primavera-p6 ; https://formacioncontinuapucv.cl/programas/curso-primavera-p6-para-gestion-de-proyectos-6/
- https://chilepaisminero.com/antofagasta-minerals-empleo-marzo-abril-2025/ ; https://cl.indeed.com/q-primavera-p6-empleos.html ; https://cl.jooble.org/trabajo-primavera-p6
- https://www.impera.cl/ ; https://gepro.cl/servicios/impera/ ; https://www.scielo.cl/scielo.php?pid=S0718-50732020000200126&script=sci_arttext
- https://www.comparasoftware.cl/construccion ; https://unysoft.cl/ ; https://ondac.com/ ; https://www.comparasoftware.cl/notrasnoches-erp
- https://www.codelco.com/licitaciones-en-proceso ; https://assets.kpmg.com/content/dam/kpmg/cl/pdf/2024/advisory/infrastructure_insights-ed-04_esp.pdf

**Peru**
- https://cersa.org.pe/cursos/costos-presupuestos-y-programacion-de-obras-con-s10-y-ms-project/ ; https://ccipperu.com/producto/costos-presupuestos-y-programacion-de-obras-con-s10-y-ms-project/
- https://www.s10peru.com/presupuestos/ ; https://gesconvial.com.pe/courses/costos-y-presupuestos-programacion-de-obras-s10-agosto-2025/
- https://waltervillavicencio.com/exigencias-normativas-en-la-lce-y-su-reglamento-respecto-al-cronograma-en-obras-publicas/
- https://www.mef.gob.pe/contenidos/inv_publica/docs/capacitaciones/Pautas_para_elaborar_expediente_tecnico.pdf
- https://riskperu.com/cursos/planificacion-y-control-de-proyectos-en-construccion-y-mineria-con-primavera-p6-last-planner-power-bi-y-chatgpt/

**Colombia**
- https://www.sinco.co/ ; https://www.sinco.co/soluciones/administracion-de-proyectos-de-construccion ; https://www.comparasoftware.co/sinco-erp
- https://betowa.sena.edu.co/oferta/microsoft-project-aplicacion-en-la-programacion-de-obras?programId=87329&modality=V ; https://zajuna.sena.edu.co/cms-oferta/48_21310002.pdf
- https://www.ani.gov.co/proyectos-concesiones-del-bicentenario-5g ; https://www.ani.gov.co/sites/default/files/contrato_de_concesion_5g.pdf ; https://www.elcolombiano.com/negocios/las-concesiones-5g-arrancan-con-14-megaobras-LE17642687
- https://www.comparasoftware.co/construccion ; https://guiatic.com/co/360-software-para-gestion-de-obras-sector-construccion-sistemas-erp-constructoras

**Argentinië**
- https://mase.lmneuquen.com/vaca-muerta/trabajo-vaca-muerta-ofertas-laborales-activas-ypf-techint-pluspetrol-y-vmos-n1221633
- https://www.mejorenergia.com.ar/noticias/2026/05/15/5613-ypf-presento-al-rigi-el-proyecto-lll-oil-un-plan-para-el-shale-oil-de-vaca-muerta-por-usd-25000-millones
- https://www.dataobra.net/ ; https://www.comparasoftware.com.ar/dataobra-construccion ; https://www.comparasoftware.com.ar/construccion
- https://www2.vialidad.gob.ar/sites/default/files/licitaciones/7121/pliego-obra/IF-2021-28643097-APN-DS%25DNV.pdf ; https://compraspublicas.cba.gov.ar/wp-content/uploads/2021/06/INSTRUCTIVO-PLAN-DE-TRABAJO-Y-CURVA-DE-INVERSION-1-1.pdf
- https://www.planicontrol.com/curso/primavera-p6-nivel-fundamental ; https://librerialatijera.com.ar/proyecto-libre/

**Niche/4D/lineair**
- https://tilosamericas.com/locate-a-dealer-2/ ; https://www.capterra.com/p/235928/TILOS/
- https://bimers.cl/service/synchro-4d-2/ ; https://es.virtuosity.com/synchro-4d
- https://www.comparasoftware.pe/candy-ccs-proyectos-construccion ; https://www.capterra.com/p/126567/Candy/
- https://pccadla.com/software/rib-presto/ ; https://www.espaciobim.com/presto
- https://www.hco.com/es/insights/que-es-monday.com-y-por-que-es-importante-para-empresas-latinoamericanas

---

## Verificatie

*Adversariële fact-check, uitgevoerd 25 juli 2026. Opzet: elke bewering actief proberen te weerleggen met bronnen buiten de door het rapport aangehaalde set, plus narekening van alle doorgerekende schattingen. Waar een cijfer alleen bij een belanghebbende partij (leverancier, cursusaanbieder) te vinden was, is dat als zodanig gemarkeerd in plaats van overgenomen.*

**Samenvatting: 14 beweringen gecontroleerd — 4 bevestigd, 8 gecorrigeerd, 2 onzeker.**

| # | Bewering | Oordeel |
|---|---|---|
| 1 | Extrapolatie LatAm-markt naar 2025 | **gecorrigeerd** |
| 2 | Clusteromvang USD 130–170 mln | **gecorrigeerd** |
| 3 | PM-software Zuid-Amerika USD 300,9 mln | **gecorrigeerd** |
| 4 | Construction & design software CAGR 11% | **gecorrigeerd** |
| 5 | Oracle P6 lijstprijs USD 2.500 + 550 | **onzeker** |
| 6 | Primavera Cloud "vanaf USD 49/user/mnd" | **gecorrigeerd** |
| 7 | MS Project Plan 3 USD 30 / Plan 5 USD 55 | **gedeeltelijk bevestigd / Plan 5 onzeker** |
| 8 | Chileense P6-prijs "~40% boven US-lijst" | **gecorrigeerd** |
| 9 | ONDAC/Notrasnoches 1,5 UF ≈ USD 60 | **gecorrigeerd** |
| 10 | Notrasnoches 71% marktaandeel / 1.900 klanten | **gecorrigeerd (geschrapt)** |
| 11 | SINCO >2.543 bouwbedrijven | **gecorrigeerd (geschrapt)** |
| 12 | "75% van Chileense planner-vacatures eist P6" | **gecorrigeerd (geschrapt)** |
| 13 | Peru eist CPM + MS Project bij overheidswerk | **bevestigd (en aangescherpt)** |
| 14 | Colombia 5G: 14 projecten / COP 21,79 billones | **bevestigd** |

---

**1. "LatAm PM-softwaremarkt ~USD 650 mln in 2025, geëxtrapoleerd uit USD 550,6 mln (2023) met 17,7% CAGR" — GECORRIGEERD (rekenfout).**
Twee jaar groei, niet één: 550,6 × 1,177² = **762,8**, niet 650. De basis was 17,3% te laag. Controle op interne consistentie van het brontriplet: 550,6 × 1,177⁷ = 1.722,9 ≈ de genoemde 1.727,6 mln voor 2030, en de impliciete CAGR uit 550,6→1.727,6 over 7 jaar is 17,75% — het triplet klopt dus, alleen de tussenstap was fout. Narekening met Python; brontriplet zelf niet onafhankelijk verifieerbaar (grandviewresearch.com geeft HTTP 403 op geautomatiseerd ophalen).
Bron: eigen narekening; https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/latin-america (niet toegankelijk voor verificatie)

**2. "Cluster Chili+Colombia+Peru+Argentinië: USD 130–170 mln (2025)" — GECORRIGEERD naar ~USD 150–190 mln.**
De oude bandbreedte erfde de rekenfout uit punt 1. Herberekend langs twee wegen: (a) top-down 20–25% van de gecorrigeerde basis 762,8 = **153–191 mln**; (b) bottom-up uit de landencijfers van Cognitive Market Research (Argentinië 60,07 + Colombia 31,82 + Peru 29,32 + Chili 25,74 = 146,95 mln in 2024, doorgerekend met hun eigen landen-CAGR's = **170,2 mln in 2025**). Beide wegen overlappen op ~150–190 mln. Opvallend: de top van de oude bandbreedte was toevallig ongeveer goed, de onderbouwing niet.
Bron: https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report

**3. "PM-software Zuid-Amerika: USD 300,9 mln (2025), CAGR 14,9%" — GECORRIGEERD naar USD 525,281 mln, CAGR 14,899%.**
De aangehaalde bron noemt zelf 525,281 mln voor 2025 — het rapport gaf een 43% te laag cijfer weer. De CAGR (14,9%) klopte wel. De bron levert bovendien een landensplitsing die het rapport niet gebruikte, en die de aanname "Chili is de grootste van de vier" tegenspreekt: **Argentinië is met USD 60,07 mln (2024) veruit de grootste**, meer dan Chili (25,74) en Peru (29,32) samen. Toegevoegd als expliciete tegenspraak in §2.3.
Bron: https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report

**4. "Construction & design software LatAm: 782,9 (2024) → 1.410,8 (2030), CAGR 11%" — GECORRIGEERD naar 10,3%.**
(1.410,8/782,9)^(1/6) − 1 = **10,31%**. Bij 11% zou 2030 uitkomen op 1.464,3 mln, niet 1.410,8. Het verschil is klein maar het rapport presenteerde een afgerond cijfer als bronwaarde.
Bron: eigen narekening op de in het rapport geciteerde reeks

**5. "Primavera P6 Professional: USD 2.500 perpetual + USD 550/jr onderhoud" — ONZEKER.**
Niet te bevestigen én niet te weerleggen, maar het label "lijstprijs" is onjuist: **Oracle publiceert helemaal geen openbare prijslijst voor Primavera.** De Oracle price-list-index bevat 20 prijslijsten (Technology, Applications, Fusion, Siebel, PeopleSoft, JD Edwards, Engineered Systems, MySQL, Java …) en géén voor Primavera of Construction & Engineering; controle van de Applications-prijslijst-PDF bevestigt dat Primavera daar niet in staat. De P6-productpagina van Oracle noemt geen prijs en geen licentiemodel (perpetual vs. subscription) en verwijst naar "Contact us". De bedragen in het rapport komen van ProjectManager.com en Taradigm — derden, geen leverancier. In §3.2 als zodanig gemarkeerd.
Bronnen: https://www.oracle.com/us/corporate/pricing/price-lists/index.html · https://www.oracle.com/industries/construction-engineering/primavera-p6/ · https://www.oracle.com/assets/applications-price-list-070574.pdf

**6. "Oracle Primavera Cloud vanaf USD 49/user/mnd" — GECORRIGEERD naar USD 130/user/mnd met minimumafname.**
De enige concreet gepubliceerde resellerprijs is USD 7.800/jaar voor een 5-user starterpack — de pagina rekent dat zelf voor als "$130/month/user" — met extra gebruikers à USD 1.560/jaar. Er is dus geen instap à USD 49; de effectieve drempel is **USD 7.800 per jaar**, ruim 2,5× de instap die het rapport suggereerde. Dat versterkt overigens de kernstelling van §6 (het middenveld is leeg) in plaats van haar te ondermijnen.
Bron: https://cdp-inc.com/products/software/purchase-oracle-primavera-cloud-5-users

**7. "Microsoft Planner & Project Plan 3 USD 30, Plan 5 USD 55, Planner Plan 1 USD 10 per gebruiker/maand" — GEDEELTELIJK BEVESTIGD; Plan 5 ONZEKER.**
Geverifieerd op Microsofts *Amerikaanse* prijspagina (het rapport citeerde alleen de es-mx-versie): Planner Plan 1 = "$10.00 user/month, paid yearly" en Planner and Project Plan 3 = "$30.00 user/month, paid yearly", beide met jaarabonnement — dus per gebruiker per **maand** bij **jaarcontract**, zoals het rapport stelde. **Plan 5 staat er echter niet meer op**: de pagina toont in juli 2026 alleen Planner (in M365), Plan 1 en Plan 3. De USD 55 is daarmee niet als actuele publieke lijstprijs te bevestigen. Aanvullend geverifieerd en toegevoegd: Project Standard 2024 USD 679,99 en Project Professional 2024 USD 1.129,99 eenmalig.
Bronnen: https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing · https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software

**8. "Chileense reseller-prijzen voor P6 liggen ~40% boven de US-lijstprijs" — GECORRIGEERD (appels met peren).**
De vergelijking zette een Chileense prijs **inclusief** 19% IVA naast een Amerikaanse prijs **exclusief** btw. De Comgrap-pagina is wel exact zoals geciteerd (aanbieding CLP 4.119.900 incl. IVA, doorgestreepte lijstprijs CLP 5.159.360, perpetual 1 user + 1 jaar Oracle-support). Consistent doorgerekend bij CLP 946,24/USD: aanbieding = USD 4.354 incl. / **USD 3.659 excl. IVA** → **+20%** t.o.v. USD 3.050; lijstprijs = USD 4.582 excl. IVA → **+50%**. "~40%" is geen van beide. De USD-omrekening in §3.2 ("~USD 4.300–4.400 incl. btw") was overigens correct.
Bronnen: https://comgrapstore.cl/software/oracle/primavera-p6-professional-licencia-perpetua-1-usuario/ · koers en UF via https://mindicador.cl/api (25-7-2026: UF 40.844,79; dólar observado CLP 946,24)

**9. "Notrasnoches/Ondac: plannen vanaf 1,5 UF + IVA per maand (≈ USD 60)" — GECORRIGEERD.**
Twee fouten. (a) Omrekening: 1,5 UF = CLP 61.267 = **USD 65 excl. IVA / USD 77 incl. IVA**, niet ~USD 60. (b) Toewijzing: op de aangehaalde pagina staat "1,5 UF + IVA" bij de plannen *Contable Tributario Web* en *Remuneraciones y RR.HH* — boekhoud- en salarismodules — en het is er aangeduid als **setup inicial**, niet als de doorlopende prijs van een bouw-/planningsmodule. Het ERP-plan (Gestión Empresa) staat op "Bajo Cotización".
Bronnen: https://www.comparasoftware.cl/notrasnoches-erp · https://mindicador.cl/api

**10. "Notrasnoches: Chileense marktleider presupuestos, 71% marktaandeel, >1.900 klanten, >4.500 licenties" — GECORRIGEERD (geschrapt).**
Geen van de drie getallen staat op enige bereikbare bron, inclusief de twee die het rapport zelf aanhaalt. Bovendien klopt de bedrijfsnaam niet: **notrasnoches.cl geeft een 301-redirect naar hostdescuento.com** (een hostingaanbieder) — het domein is niet meer van deze leverancier. "Notrasnoches" bestaat alleen nog als inlogdomein (gestion.notrasnoches.com) van **ONDAC**, dat wel aantoonbaar actief is met Evolution/Presupuesto de Obra en de Manual de Precios, maar op zijn site geen marktaandeel, klantenaantal of licentieaantal claimt. Een onbewezen marktaandeelclaim van 71% is de zwaarste vorm van marktleiderschapsbewering en hoort niet ongefundeerd in een marktrapport; naam en cijfers zijn in §3.1, §3.2, §5.3 en §2.2 gecorrigeerd.
Bronnen: https://ondac.com/ · https://www.comparasoftware.cl/notrasnoches-erp · eigen HTTP-controle van notrasnoches.cl

**11. "SINCO: >2.543 aangesloten bouwbedrijven in LatAm" — GECORRIGEERD (geschrapt).**
Op sinco.co is dit getal niet terug te vinden: de statistiek-widget rendert als "**0** Empresas en Colombia y Latinoamérica" (een niet-ingevulde/JS-geanimeerde teller). Het gaat hoe dan ook om een zelfclaim van de leverancier zonder onafhankelijke bevestiging. De schijnprecisie van "2.543" suggereert een nauwkeurigheid die de bron niet levert.
Bron: https://www.sinco.co/

**12. "Ca. 75% van de Chileense vacatures voor ingeniero de planificación eist Primavera P6" — GECORRIGEERD (geschrapt).**
Weerlegd door de aangehaalde bronnen zelf te lezen. De Ecospace-cursuspagina bevat **geen enkele** arbeidsmarktstatistiek — alleen cursusinhoud, docenten en prijs. Het PMI Santiago-blog bevat geen percentage en ook niet de in het rapport geclaimde uitbreiding "naar retail, metro en snelwegen"; het zegt slechts ongekwantificeerd dat "de meeste bedrijven in alle sectoren" om P6-training vragen. Beide bronnen zijn bovendien commercieel belanghebbend bij een hoog vraagcijfer. Ook gecorrigeerd: de vacaturetelling op Jooble Chili staat op **199** (25-7-2026), niet 161 (mei 2026) — en zo'n teller is een trefwoordtreffer over dubbel geposte aggregaties, geen telling van functies die P6 eisen; als basis voor het gebruikersaantal in §2.3 is die ongeschikt.
Bronnen: https://www.ecospace.cl/curso/25/oracle-primavera-p6 · https://www.pmi.cl/blog/conoce-primavera-p6-en-una-nueva-escuela-de-proyectos-de-pmi-santiago-chile-chapter-7848 · https://cl.jooble.org/trabajo-primavera-p6

**13. "Peruaanse aanbestedingsregels eisen een CPM-programma; MS Project in de praktijk" — BEVESTIGD en AANGESCHERPT.**
De sterkste bevinding van deze controle, en sterker dan het rapport zelf claimde. De MEF-richtlijn is als PDF opgehaald en de tekst is geëxtraheerd: in het contenido básico van het expediente técnico staat letterlijk *"Cronograma valorizado de ejecución de obra, Calendario de adquisición de materiales, Cronograma de Ejecución de Obras **(MS PROJECT)**"* en, als aparte verplichte regel, *"Programa de ejecución de obras **(PER-CPM)**"* [sic, kennelijke typefout voor PERT-CPM]. MS Project wordt dus **bij naam genoemd** in het overheidsdocument — het is niet slechts "de praktijk". Twee nuances: het document gebruikt *cronograma valorizado de ejecución de obra*, niet de door het rapport gebruikte term "calendario de avance de obra valorizado (CAOV)"; en Primavera en S10 komen in het document niet voor.
Bron: https://www.mef.gob.pe/contenidos/inv_publica/docs/capacitaciones/Pautas_para_elaborar_expediente_tecnico.pdf (eigen tekstextractie, 51 pagina's)

**14. "Colombia 5G-concessies: eerste golf 14 projecten, COP 21,79 billones" — BEVESTIGD.**
De ANI bevestigt "14 proyectos multimodales" in de eerste golf met "una inversión de 21,79 billones de pesos". Aanvullend uit dezelfde bron: het programma bestaat uit twee golven, drie wegprojecten zijn inmiddels gegund (o.a. Nueva Malla Vial del Valle del Cauca, COP 1,22 bln; Accesos Norte 2, COP 1,3 bln) en vijf initiatieven zitten in aanbesteding.
Bron: https://www.ani.gov.co/proyectos-concesiones-del-bicentenario-5g

---

### Aanvullende bevindingen buiten de 14 getoetste beweringen

- **Beide marktomvangbronnen zijn onbetrouwbaar (zie waarschuwing in §2.2).** Grand View (LatAm USD 762,8 mln in 2025) en Cognitive Market Research (Zuid-Amerika USD 525,3 mln in 2025) verschillen fors terwijl Zuid-Amerika het leeuwendeel van LatAm-ex-Mexico is. Erger: CMR's eigen landencijfers voor 2024 sommeren tot USD 357,6 mln, wat tegenover hun 2025-totaal een sprong van **+46,9%** impliceert — onverenigbaar met hun eigen CAGR van 14,9%. Beide zijn syndicated aggregator-rapporten zonder gepubliceerde methodologie. Elk marktomvangcijfer in dit rapport verdient een foutmarge van minstens ±40%.
- **De uitsplitsing "~USD 35–60 mln echte Gantt/CPM-software"** is een eigen splitsing die door geen enkele bron wordt gekwantificeerd. Als [ONGEVALIDEERD] gemarkeerd in §2.2.
- **IMPERA — deelbevestiging.** impera.cl beschrijft uitsluitend Last Planner-, Kanban- en Visual-Management-functionaliteit en **geen CPM/kritieke-pad-engine**; de conclusie van §5.5 ("vervangt de masterplanning niet") klopt dus. De site publiceert geen prijs en claimt geen klantaantallen. De superlatief "enige volwassen Spaanstalige LPS-tool **ter wereld**" is wel geschrapt: een wereldwijde exclusiviteitsclaim is niet onderbouwd.
- **Peru: institutionele verwijzing mogelijk verouderd (ONZEKER).** Het rapport noemt "OSCE" en de Ley de Contrataciones del Estado als vigerend kader. Het domein oece.gob.pe is live en leidt door naar gob.pe/oece, wat wijst op opvolging door **OECE** onder een nieuwe Ley General de Contrataciones Públicas. Niet hard te verifiëren: gob.pe blokkeert geautomatiseerd ophalen (HTTP 418/503) en het Spaanstalige Wikipedia-artikel over OSCE is niet bijgewerkt. Als expliciet voorbehoud in §4.2 opgenomen; te controleren vóór publicatie.
- **De negatieve bevinding in §3.1** ("geen Asta Powerproject, Spider Project, Safran, nPlan, ALICE aangetroffen") berust op afwezigheid van zoekresultaten, niet op een leveranciersinventarisatie. Als methodologisch voorbehoud toegevoegd in §6.

### Beperkingen van deze controle

Drie bronnen weigerden geautomatiseerd ophalen en konden niet onafhankelijk worden geverifieerd: **grandviewresearch.com** (HTTP 403 — de kerncijfers 550,6 / 1.727,6 / 17,7% zijn dus alleen op interne consistentie getoetst, niet aan de bron), **snsinsider.com** (HTTP 403 — de regel over USD 382,15 mln tegen 2032 is ongecontroleerd gebleven) en **gob.pe** (HTTP 418/503). De websearch-quota van deze sessie was uitgeput; de controle steunt daarom op gerichte ophaalacties van primaire bronnen (leverancierssites, overheids-PDF's, prijslijsten, koersen-API) in plaats van op brede zoekopdrachten. Claims over marktaandeel en gebruikersaantallen in dit rapport zijn structureel zwak onderbouwd: vrijwel alle beschikbare cijfers komen van belanghebbende partijen.
