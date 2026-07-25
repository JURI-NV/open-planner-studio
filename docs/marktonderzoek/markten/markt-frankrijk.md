# Marktonderzoek: projectplanning-/schedulingsoftware in Frankrijk

*Datum onderzoek: juli 2026. Regio: West-Europa. Focus: Gantt/CPM-planningssoftware voor de bouw (BTP — bâtiment et travaux publics) plus algemene projectplanningstools voor zover serieus gebruikt voor planning.*

---

## 1. Samenvatting

Frankrijk is de op één of twee na grootste bouwmarkt van Europa, met wereldspelers als **Vinci, Bouygues, Eiffage, Colas, Spie batignolles en NGE**, een enorm nucleair programma (EDF/Framatome: EPR2, Hinkley Point C, Sizewell C, NUWARD SMR) en megaprojecten als het **Grand Paris Express** (4 nieuwe metrolijnen, in dienststelling 2026–2031). De planningsmarkt valt uiteen in drie duidelijk gescheiden lagen:

1. **Megaproject/industrie-laag**: **Oracle Primavera P6** is de onbetwiste standaard bij nucleair (EDF, Framatome, Orano, Edvance), grote infra (Grand Paris, ferroviair) en EPC/olie & gas. Franstalige vacaturesites tonen doorlopend 60–80 openstaande "planificateur Primavera P6"-posities. **TILOS** (tijd-weg) is sterk bij lineaire projecten (SNCF, Colas Rail, Egis Rail, Bouygues, Eiffage, Vinci Construction als referenties van de Franse distributeur).
2. **Bâtiment/OPC-laag**: de typisch Franse **OPC-missie** (Ordonnancement, Pilotage, Coordination — een wettelijk verankerde, aparte planningsrol in het Franse bouwproces) draait overweldigend op **MS Project**, aangevuld met Excel-Gantt. Dit is een cultureel unicum: planning wordt bij gebouwen vaak niét door de aannemer maar door een extern OPC-bureau gedaan.
3. **Franse SaaS-laag**: een opvallend rijke, eigen software-industrie — zowel PPM-zwaargewichten van Franse origine (**Planisware**, **Sciforma**) als een dichte laag Franstalige BTP-tools voor mkb-aannemers (**Obat, Graneet, Alobees, Optim'BTP, Onaya, Batiscript, Mediabat, Vertuoza** [Belgisch], **Finalcad, Teamoty**) en generieke Franse planners (**PlanningPME, Visual Planning, Bubble Plan, Beesbusy, Yookkan, Gouti**).

Taal is een echte toetredingsdrempel: Franstalige UI, support en documentatie zijn de facto vereist (mede door de loi Toubon en de sterke voorkeur voor "hébergement en France"). Een fr-locale is voor elk pakket dat hier serieus wil meedoen noodzakelijk, geen nice-to-have.

**Geschatte marktomvang** (expliciete schatting, zie §2): **€180–300 miljoen/jaar** voor projectplanning-/schedulingsoftware in Frankrijk breed, waarvan **€60–110 miljoen** bouwspecifieke planning (licenties + SaaS, excl. diensten), groeiend met ~10–15%/jaar.

---

## 2. Marktomvang

### 2.1 Referentiecijfers (wereld/Europa)

- Wereldmarkt projectmanagementsoftware: **USD 9,76 mld (2025)**, prognose **USD 23,09 mld in 2031**, CAGR **15,42%** (2026–2031) — [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market).
- Alternatieve raming: **USD 9,54 mld (2024)** → USD 24,3 mld (2033), CAGR 10,92% — [Strategic Revenue Insights](https://www.strategicrevenueinsights.com/fr/industry/project-management-software-systems-market).
- Europa is volgens Mordor een "steady performer" met compliance-gedreven adoptie (GDPR/datalokalisatie); geen apart Frankrijk-cijfer gepubliceerd in de openbare samenvattingen.

### 2.2 Afleiding Frankrijk (SCHATTING, expliciet beredeneerd)

Er bestaat geen openbaar, betrouwbaar Frankrijk-specifiek cijfer voor deze niche. Redenering:

- Europa neemt doorgaans ~25–30% van de wereldwijde softwaremarkt voor zijn rekening; Frankrijk is ~14–16% van de West-Europese IT-markt (2e/3e economie van Europa).
- 9,76 mld × 27,5% (Europa) × 15% (Frankrijk) ≈ **USD 400 mln (~€370 mln)** voor projectmanagementsoftware *in brede zin* (incl. work management à la Monday/Asana).
- Beperkt tot echte **planning/scheduling met Gantt/CPM** (P6, MS Project, Powerproject, TILOS, PPM-planning, BTP-planningstools): naar schatting 50–65% daarvan → **€180–300 mln/jaar (2025)**.
- Bouwspecifiek deel: de bouw is in Frankrijk goed voor ~11% van het bbp en is bovengemiddeld planningsintensief (OPC-cultuur, megaprojecten) → **schatting €60–110 mln/jaar** voor bouw-scheduling.
- Groei: 10–15%/jaar, in lijn met de mondiale CAGR-ramingen hierboven.

### 2.3 Ordegrootte gebruikers/planners (SCHATTING)

- Fulltime professionele planners ("planificateur", "planificateur OPC", "ingénieur planning"): het beroep heeft een eigen OPIIEC-beroepsfiche ([Opiiec — Planificateur OPC](https://www.opiiec.fr/metiers/83024-planificateur-opc)); Indeed toont structureel **75+ vacatures alleen al voor P6-planners** ([Indeed.fr](https://fr.indeed.com/q-planificateur-projet-primavera-p6-emplois.html)), Glassdoor 64 landelijk ([Glassdoor](https://www.glassdoor.fr/Emploi/france-planificateur-projet-primavera-p6-emplois-SRCH_IL.0,6_IN86_KO7,40.htm)). Op basis van de vacature-omloopsnelheid en de omvang van nucleair + infra + OPC-bureaus: **schatting 10.000–20.000 fulltime planners**, waarvan enkele duizenden P6-gebruikers.
- Salarisindicatie planners: **€40k–55k/jaar** (Île-de-France, nucleair; Glassdoor/Framatome-vacatures — [Glassdoor](https://www.glassdoor.fr/Emploi/ile-de-france-planificateur-primavera-p6-emplois-SRCH_IL.0,13_IS4493_KO14,40.htm), [Framatome careers](https://www.framatome.com/fr/candidats/offres-emplois/planificateur-du-projet-nuward-smr-f-h-ref-2026-25401/)).
- Bredere Gantt-gebruikers (MS Project-licenties, BTP-SaaS-abonnees, conducteurs de travaux die plannen): **schatting 150.000–400.000**.

---

## 3. Gebruikte software: marktpositie en prijzen

### 3.1 Top-laag: megaprojecten, industrie, infra

#### Oracle Primavera P6 — de standaard voor complexe projecten
- **Positie**: "la référence dès que la complexité dépasse un certain seuil" volgens de Franse project-controls-consultancy SIPCO (Rennes); dominant in EPC, infra, energie ([SIPCO](https://www.sipco-france.fr/blog/primavera-p6-vs-ms-project-lequel-choisir-pour-vos-projets-industriels)). **Vinci Construction France werft actief P6-planners** ([vacature](https://talents.studysmarter.co.uk/companies/vinci-construction-france/defence-primavera-p6-planner-scheduling-resources-25444795/)); Framatome/EDF gebruiken P6 als ruggengraat van de nucleaire planning, incl. dedicated "administrateur de la base Primavera"-rollen voor Hinkley Point C ([LinkedIn/Framatome](https://fr.linkedin.com/jobs/view/planificateur-administrateur-de-la-base-primavera-projet-nucl%C3%A9aire-hpc-f-h-at-framatome-3745033477), [Framatome](https://www.framatome.com/fr/candidats/offres-emplois/planificateurrice-projets-nucleaires-travaux-neufs-f-h-ref-2026-26078/)).
- **Prijs** (VS-lijstprijzen, in Frankrijk vergelijkbaar in €): P6 Professional **~$2.570 eerste jaar** ($2.500 perpetual + ~$550/jr onderhoud); P6 EPPM **$2.750 perpetual** (+$605/jr onderhoud); **P6 EPPM Cloud $125/gebruiker/maand**; Progress Reporter Cloud $12/gebr/mnd ([ProjectManager.com](https://www.projectmanager.com/fr/quest-ce-que-primavera-p6), [Capterra](https://www.capterra.com/p/145503/Oracle-Primavera/)).
- **Lokale kanalen**: Oracle-partners zoals **MESLI Consulting** (Massy, licentieverkoop + training — [mesli-consulting.com](https://www.mesli-consulting.com/our-activities/oracle-solutions/sale-of-primavera-p6-licenses/), [formationprimavera.fr](https://formationprimavera.fr/)) en consultancies als SIPCO Project Control.
- **Gebruikers**: grote aannemers (génie civil-divisies), EDF/Framatome/Orano en hun hele nucleaire toeleverketen, Grand Paris-contractanten, olie & gas (TotalEnergies-keten), defensie (Naval Group).

#### Microsoft Project — het werkpaard van de OPC en het bâtiment
- **Positie**: de dominante tool bij OPC-bureaus, maîtrise d'œuvre en middelgrote aannemers; OPC-opleidingen (IPTIC, Ordre des architectes) noemen expliciet MS Project (naast Excel-Gantt en Primavera) als kerncompetentie ([IPTIC](https://iptic.fr/formations/pratiques-professionnelles-reglementaires/coordination-securite/opc-ordonnancement-pilotage-coordination-et-planification/), [Opiiec](https://www.opiiec.fr/metiers/83024-planificateur-opc)).
- **Prijs Frankrijk**: **Planner & Project Plan 3: ~€28,70–30/gebr/mnd**; Plan 5 ~$55/gebr/mnd (VS-prijs); let op: Microsoft stopt nieuwe verkoop van "Planner and Project Plan 5" per **1 mei 2026** — portfolio verschuift naar Planner/Premium ([Microsoft FR](https://www.microsoft.com/fr-fr/microsoft-365/planner/project-plan-3), [Senetic FR](https://www.senetic.fr/product/CFQ7TTC0HDB0-0002_P1MP1M), [The Digital Project Manager](https://thedigitalprojectmanager.com/tools/microsoft-project-pricing/)).

#### TILOS (Trimble) — tijd-weg-planning voor lineaire infra
- **Positie**: nummer 1 voor lineaire projecten (spoor, weg, pijpleidingen). Exclusieve Franse distributeur: **Projet Linéaire** (tilosfrance.com). Franse referenties: **SNCF, Bouygues, Eiffage, Vinci Construction, Total, Colas Rail, Egis Rail**; SNCF-ingenieursdivisie beveelt het expliciet aan voor spoorprojecten ([tilosfrance.com](https://www.tilosfrance.com/), [sectoren](https://www.tilosfrance.com/secteurs-application-tilos/tilos-construction-autoroute)).
- **Prijs**: alleen op offerte via distributeur (internationaal circuleren indicaties van ~€4.000–6.000 per seat perpetual — SCHATTING, niet op de Franse site gepubliceerd).

#### Elecosoft (Asta) Powerproject
- **Positie**: wereldwijd 100.000+ gebruikers, **beschikbaar in het Frans**, maar in Frankrijk duidelijk kleiner dan in VK/Duitsland/Benelux; verkoop via resellers ([Elecosoft](https://eleco.com/products/asta/asta-powerproject/), [G2](https://www.g2.com/products/asta-powerproject/reviews)). Licenties: single user, concurrent server, SaaS; prijs op aanvraag (internationale indicatie ~£1.200–2.000/seat of SaaS-abonnement — SCHATTING).

#### Bentley Synchro 4D
- **Positie**: het 4D BIM-planningsreferentiepunt bij grote Franse aannemers (BIM/VDC-teams van Vinci/Bouygues-dochters op grote projecten); prijs niet publiek, via Bentley/Virtuosity op offerte ([Bentley](https://www.bentley.com/software/synchro/), [Capterra](https://www.capterra.com/p/35289/Synchro/)).

#### Overige internationale specialisten (aanwezig maar niche)
- **ALICE Technologies** (generatieve scheduling; pilots bij Europese majors, koppelt aan P6 — [alicetechnologies.com](https://www.alicetechnologies.com/alice-optimize)), **Nodes & Links / nPlan** (AI-schedule-analytics, vooral via VK-megaprojecten waar Franse majors aan meebouwen), **RIB Candy/iTWO** (beperkt in Frankrijk; RIB is er vooral met CRM/estimating), **Sciforma/Safran/Deltek Open Plan/Spider Project** (Sciforma: zie 3.2; de rest marginaal in Frankrijk). — Positionering deels SCHATTING op basis van vacature-/referentieschaarste in Franse bronnen.

### 3.2 Franse PPM-industrie (eigen zwaargewichten)

#### Planisware — Franse wereldspeler in PPM
- Hoofdkantoor **Parijs**, beursgenoteerd (Euronext Paris, IPO 2024), **600+ blue-chip-klanten** (o.a. Philips, Pfizer, Ford, ABB), 4× Leader in Gartner MQ; producten **Enterprise** (grote portfolio's), **Orchestra** (turnkey PPM, van oorsprong het Franse NQI Orchestra), plus een expliciete **Engineering & Construction**-vertical ([planisware.com](https://www.planisware.com/)). Sterk bij Franse industrie (auto, farma, defensie, energie) voor portfolioplanning mét Gantt/CPM. Prijs: enterprise, op offerte (SCHATTING: doorgaans zes cijfers per jaar voor grote uitrol).

#### Sciforma — Franse PPM-veteraan (30+ jaar)
- PPM met volwaardige CPM-planning; doelgroep ETI/grote organisaties (industrie, publiek, gezondheidszorg). Vermelde instapprijs **vanaf €10/gebr/mnd** bij Appvizer (realistischer voor volwaardige PPM-seats: €20–40/gebr/mnd — SCHATTING) ([sciforma.fr](https://sciforma.fr/fr), [Appvizer](https://www.appvizer.fr/operations/ppm/sciforma), [comparatif-logiciels.fr](https://www.comparatif-logiciels.fr/avis-sciforma/)).

### 3.3 Franstalige BTP-tools (mkb-aannemers) — de lokale laag

Bron voor de vergelijking: [independant.io comparatief](https://independant.io/logiciel-planning-chantier/), [Obat-blog](https://www.obat.fr/blog/logiciel-planning-chantier/), [Qonto top-10](https://qonto.com/fr/blog/gestion-entreprise/btp-construction/logiciel-planning-chantier), [Alobees-vergelijkingen](https://www.alobees.com/en/conseils/best-construction-planning-software-2025), [Skello](https://www.skello.io/blog/logiciels-planning-chantier).

| Pakket | Herkomst | Doelgroep | Prijs (indicatie) | Positie |
|---|---|---|---|---|
| **Obat** | FR | zzp/TPE | vanaf **€25/mnd** | facturatie-eerst, Gantt-planning; transparantste prijzen |
| **Alobees** | FR | TPE/kleine PME | vanaf **€50/mnd** | mobiel-eerst werfopvolging + planning |
| **Graneet** | FR | PME | **€200–800/mnd** (offerte) | financieel gedreven BTP-ERP met planningsmodule |
| **Vertuoza** | BE (fr-talig) | TPE/PME | offerte (4 packs) | alles-in-één devis→facturatie→planning |
| **Optim'BTP** | FR | TPE/PME | offerte | incl. materieelbeheer |
| **Onaya** (Aquitem) | FR | PME/ETI | offerte, modulair | gevestigde Franse BTP-suite |
| **Batiscript** (Script&Go) | FR | PME | offerte, modulair | planning + opvolging + oplevering (OPR) |
| **Mediabat** | FR | ambacht/TPE | offerte | devis/planning met Gantt |
| **Finalcad** | FR | TPE–ETI | freemium | Franse pionier werf-apps, taken/opvolging |
| **Fieldwire by Hilti** | US/LI | TPE/PME | gratis instap | Gantt/kanban-werfplanning, sterk verspreid |
| **Procore** | US | PME/ETI | offerte | platform, koppelt met MSP/P6 ([procore.com/fr](https://www.procore.com/fr/gestion-de-projet/planning)) |
| **LetsBuild** (ex-Aproplan/GenieBelt) | BE/DK | PME/ETI | offerte | realtime multi-projectplanning |
| **Teamoty** | FR | GC's/majors | offerte | lean/takt-planning ("planification collaborative"), gebruikt op Franse werven van grote aannemers — beperkte publieke info (SCHATTING/vendorclaims) |

### 3.4 Generieke Franse planners & work management

- **PlanningPME** (Target Skills, FR): resource-/werkplanning, veel gebruikt in BTP-mkb voor ploeg-/materieelplanning (geen CPM); 30 dagen gratis trial, prijzen op tarieventabel ([planningpme.fr](https://www.planningpme.fr/)).
- **Visual Planning** (Stilog IST, FR): configureerbare resource-planning, sterke BTP-verticals; prijs op offerte.
- **Bubble Plan, Beesbusy, Yookkan, Gouti** (allen FR): lichte Gantt-/projecttools; verkoopargumenten: Franse hosting, Franstalige support, eenvoud ([Obat-blog](https://www.obat.fr/blog/logiciel-planning-chantier/)).
- **Wrike, Smartsheet, Monday, Asana, ClickUp, Notion**: aanwezig in de tertiaire sector; voor échte bouwplanning marginaal (SCHATTING op basis van afwezigheid in Franse BTP-comparatifs).
- **Open source**: **ProjectLibre** en **GanttProject** worden in Franse gidsen consequent als gratis MS Project-alternatief genoemd, populair bij studenten/kleine bureaus ([independant.io](https://independant.io/logiciel-planning-chantier/), [probatiment.com](https://www.probatiment.com/planning-de-chantier/)); **OpenProject** (DE) in de publieke sector die soevereiniteit zoekt (SCHATTING).

### 3.5 Rangorde (synthese; positie deels SCHATTING)

1. **MS Project** — grootste geïnstalleerde basis (OPC, MOE, aannemers, industrie).
2. **Excel** — nog altijd de feitelijke nummer 1 qua aantal "plannings de chantier" bij kleine bedrijven (genoemd in vrijwel elke Franse gids).
3. **Oracle Primavera P6** — waarde-leider; standaard op alles wat groot/nucleair/infra is.
4. **Franse BTP-SaaS** (Obat/Alobees/Graneet/Onaya/Optim'BTP…) — snelst groeiende segment in volume.
5. **TILOS** — niche-leider lineaire infra.
6. **Planisware/Sciforma** — PPM-laag industrie/enterprise.
7. **Synchro 4D, Powerproject, Procore, LetsBuild, Fieldwire** — uitdager-/nicheposities.
8. **ALICE, Nodes & Links, nPlan** — vroege AI-adoptie op megaprojecten.

---

## 4. Lokale bijzonderheden

1. **De OPC-missie als aparte planningsmarkt.** Uniek Frans: bij gebouwen wordt planning/coördinatie vaak uitbesteed als aparte wettelijk omkaderde missie (erfenis loi MOP, nu Code de la commande publique), uitgevoerd door gespecialiseerde OPC-bureaus met eigen kwalificatie (**OPQIBI 0302**) ([Smart Formation](https://smartformation.eu/courses/ordonnancement-pilotage-et-coordination-qualification-opqibi-0302/), [Ordre des architectes](https://www.architectes.org/formations/assurer-la-mission-opc-ordonnancement-pilotage-coordination)). Deze bureaus zijn een homogene MS Project/Excel-doelgroep.
2. **Nucleair als planningsmotor.** EDF/Framatome-programma's (EPR2, HPC, Sizewell C, NUWARD) creëren structurele vraag naar P6-planners en P6-database-administrators; kennis van "PMBOK + P6 + nucleaire mijlpalen" is een vast profiel ([Framatome](https://www.framatome.com/fr/candidats/offres-emplois/planificateur-du-projet-nuward-smr-f-h-ref-2026-25401/)).
3. **Megaproject-eisen.** Op Grand Paris Express-, SNCF- en nucleaire contracten worden planningseisen (software/uitwisselformaat) in het CCTP vastgelegd; concrete publieke CCTP-clausules die P6/XER verplichten zijn niet vrij online in te zien, maar de vacature- en toolingpraktijk (P6-databases per project, TILOS bij spoor) wijst op de facto P6/XER-verplichting op deze programma's — **markeer als goed onderbouwde aanname, geen gepubliceerde regel** ([Grand Paris Express marchés](https://www.grandparisexpress.fr/march%C3%A9s), [CCTP-uitleg](https://aoconquete.fr/article-cctp/)).
4. **Taaleis.** De loi Toubon (1994) verplicht Frans voor werkdocumentatie; gecombineerd met de cultuurvoorkeur betekent dit: zonder volledige Franse locale, Franse support en liefst Franse hosting geen serieuze kans in het mkb-segment. Franse comparatifs benadrukken expliciet "hébergement en France" en "support en français" als koopcriteria ([Obat-blog](https://www.obat.fr/blog/logiciel-planning-chantier/)).
5. **Opleidingscultuur.** Sterk ontwikkeld trainingsecosysteem: CPF-financierbare P6-/MS Project-opleidingen (MESLI/formationprimavera.fr, Instituto Labs voor P6-wegenprojecten, IPTIC en de Ordre des architectes voor OPC) ([formationprimavera.fr](https://formationprimavera.fr/), [institutolabs.com](https://www.institutolabs.com/courses/planification-et-pilotage-de-projets-routiers-avec-primavera-p6/)).
6. **Reseller-/consultancylandschap.** Oracle-partners: MESLI Consulting (Massy) voor licenties/training; project-controls-bureaus als SIPCO (Rennes) voor P6/MSP-implementatie; Projet Linéaire als exclusieve TILOS-distributeur; detacheerders (Astek, Alten, Assystem) leveren planners aan nucleair/infra.
7. **Sterke eigen software-industrie.** Frankrijk is één van de weinige Europese landen met eigen PPM-wereldspelers (Planisware, Sciforma) én een dicht net van lokale BTP-SaaS — buitenlandse toetreders concurreren dus tegen Franstalige, lokaal gewortelde alternatieven in elk segment.

---

## 5. Lokale/niche-pakketten: voor- en nadelen

*(alleen pakketten die buiten Frankrijk nauwelijks opduiken; beoordeling op basis van Franse comparatifs/reviews en vendordocumentatie — waar mager onderbouwd, gemarkeerd)*

**Obat** — ✚ zeer transparante prijzen (v.a. €25/mnd), sterk in devis/facturatie + eenvoudige Gantt, groot bereik onder zzp/TPE. ✚ Franstalig alles. ✖ planning is bijzaak naast facturatie; geen CPM, geen resources-nivellering; niet geschikt boven ~50 medewerkers ([independant.io](https://independant.io/logiciel-planning-chantier/), [obat.fr](https://www.obat.fr/blog/logiciel-planning-chantier/)).

**Alobees** — ✚ mobiel-eerst, werfopvolging en ploegplanning sterk, v.a. €50/mnd. ✖ geen financiële modules, geen echte CPM-planning ([Skello](https://www.skello.io/blog/avis-graneet-alternatives)).

**Graneet** — ✚ financieel stuurmiddel (marges per chantier) met geïntegreerde planning; modern, PME-gericht. ✖ prijzig (€200–800/mnd), planning ondergeschikt aan financiën, prijzen niet transparant ([Skello](https://www.skello.io/blog/avis-graneet-alternatives)).

**Onaya (Aquitem)** — ✚ gevestigde, complete Franse BTP-suite (devis→planning→facturatie), modulair, PME/ETI. ✖ gedateerde UX (veelgehoord in comparatifs), on-prem-erfenis, offerte-prijzen ([independant.io](https://independant.io/logiciel-planning-chantier/)).

**Optim'BTP** — ✚ incl. materieel-/wagenparkbeheer, geliefd bij TP-bedrijven. ✖ planning is resource-gericht, geen CPM ([independant.io](https://independant.io/logiciel-planning-chantier/)).

**Batiscript (Script&Go)** — ✚ sterke koppeling planning ↔ opleveringen (OPR/réserves), tablets op de werf. ✖ modulaire prijsopbouw ondoorzichtig; planning minder diep dan MSP ([batiscript.com](https://www.batiscript.com/gantt-chantier/)).

**Mediabat** — ✚ goedkoop, ambachtsgericht, Gantt in werfopvolging. ✖ verouderde look, klein ecosysteem ([probatiment.com](https://www.probatiment.com/planning-de-chantier/)).

**PlanningPME (Target Skills)** — ✚ zeer snelle ploeg-/resourceplanning, Excel/Outlook-koppeling, 20+ landen maar kern-DNA Frans mkb. ✖ geen projectlogica (geen afhankelijkheden/CPM), desktop-erfenis ([planningpme.fr](https://www.planningpme.fr/)).

**Visual Planning (Stilog)** — ✚ extreem configureerbaar (resources, materieel, ploegen), Franse hosting. ✖ configuratie vergt consultancy; geen CPM (vendordocumentatie; beperkte onafhankelijke reviews — SCHATTING).

**Bubble Plan / Beesbusy / Yookkan / Gouti** — ✚ intuïtief, goedkoop, Franse hosting en support (belangrijk koopargument). ✖ lichte Gantts zonder CPM/baselines; niet bouwspecifiek ([obat.fr](https://www.obat.fr/blog/logiciel-planning-chantier/)).

**Teamoty** — ✚ enige Franse takt-/lean-scheduling-tool, flow-gebaseerde werfplanning, gebruikt door grote Franse GC's (vendorclaims). ✖ nichemethodiek vergt lean-cultuur; weinig onafhankelijke reviews; prijs op offerte. (Onderbouwing beperkt — vendorinformatie; site was tijdens onderzoek onbereikbaar.)

**Sciforma** — ✚ Franse roots, volwaardige CPM + PPM, sterke resource-capaciteitsplanning, schaalbaar ETI→enterprise. ✖ implementatietraject nodig; UI minder modern dan nieuwe SaaS; instapprijs misleidend laag t.o.v. reële uitrolkosten ([Appvizer](https://www.appvizer.fr/operations/ppm/sciforma), [chef-de-projet.fr](https://chef-de-projet.fr/sciforma/)).

**Planisware Orchestra** — ✚ turnkey Franse PPM voor PMO's, snelle uitrol, Gantt/CPM inbegrepen, sterke lokale supportorganisatie. ✖ enterprise-prijsstelling, overkill voor pure werfplanning ([planisware.com](https://www.planisware.com/)).

---

## 6. Implicaties voor een nieuwkomer (bv. Open Planner Studio)

- **fr-locale is tafelinzet**; documentatie, support en marketing in het Frans bepalen geloofwaardigheid. Franse hosting/soevereiniteit is een expliciet koopargument.
- Het onbezette gat: **echte CPM/Gantt-planning, Franstalig, betaalbaar, tussen Excel/Obat en MS Project/P6 in** — precies waar OPC-bureaus en middelgrote aannemers zitten. Open source + IFC-native + gratis webversie is daar onderscheidend.
- Interop-eisen: **MPP/XML (MS Project) en XER (P6) import** zijn praktisch verplicht om in OPC-/megaproject-ketens mee te draaien; tijd-weg-weergave opent de TILOS-niche.

---

## 7. Bronnen

- https://www.sipco-france.fr/blog/primavera-p6-vs-ms-project-lequel-choisir-pour-vos-projets-industriels
- https://www.projectmanager.com/fr/quest-ce-que-primavera-p6
- https://www.capterra.com/p/145503/Oracle-Primavera/
- https://www.mesli-consulting.com/our-activities/oracle-solutions/sale-of-primavera-p6-licenses/
- https://formationprimavera.fr/
- https://www.institutolabs.com/courses/planification-et-pilotage-de-projets-routiers-avec-primavera-p6/
- https://talents.studysmarter.co.uk/companies/vinci-construction-france/defence-primavera-p6-planner-scheduling-resources-25444795/
- https://fr.indeed.com/q-planificateur-projet-primavera-p6-emplois.html
- https://www.glassdoor.fr/Emploi/france-planificateur-projet-primavera-p6-emplois-SRCH_IL.0,6_IN86_KO7,40.htm
- https://www.framatome.com/fr/candidats/offres-emplois/planificateur-du-projet-nuward-smr-f-h-ref-2026-25401/
- https://fr.linkedin.com/jobs/view/planificateur-administrateur-de-la-base-primavera-projet-nucl%C3%A9aire-hpc-f-h-at-framatome-3745033477
- https://www.microsoft.com/fr-fr/microsoft-365/planner/project-plan-3
- https://www.senetic.fr/product/CFQ7TTC0HDB0-0002_P1MP1M
- https://thedigitalprojectmanager.com/tools/microsoft-project-pricing/
- https://www.tilosfrance.com/ (distributeur Projet Linéaire; referenties SNCF, Bouygues, Eiffage, Vinci, Colas Rail, Egis Rail)
- https://www.tilosfrance.com/secteurs-application-tilos/tilos-construction-autoroute
- https://eleco.com/products/asta/asta-powerproject/
- https://www.g2.com/products/asta-powerproject/reviews
- https://www.bentley.com/software/synchro/
- https://www.capterra.com/p/35289/Synchro/
- https://www.alicetechnologies.com/alice-optimize
- https://www.planisware.com/
- https://sciforma.fr/fr
- https://www.appvizer.fr/operations/ppm/sciforma
- https://www.comparatif-logiciels.fr/avis-sciforma/
- https://chef-de-projet.fr/sciforma/
- https://independant.io/logiciel-planning-chantier/
- https://www.obat.fr/blog/logiciel-planning-chantier/
- https://qonto.com/fr/blog/gestion-entreprise/btp-construction/logiciel-planning-chantier
- https://www.alobees.com/en/conseils/best-construction-planning-software-2025
- https://www.skello.io/blog/logiciels-planning-chantier
- https://www.skello.io/blog/avis-graneet-alternatives
- https://www.vertuoza.com/fr-fr/blog/meilleurs-logiciels-de-suivi-de-chantier
- https://www.batiscript.com/gantt-chantier/
- https://www.probatiment.com/planning-de-chantier/
- https://www.planningpme.fr/
- https://www.procore.com/fr/gestion-de-projet/planning
- https://www.opiiec.fr/metiers/83024-planificateur-opc
- https://iptic.fr/formations/pratiques-professionnelles-reglementaires/coordination-securite/opc-ordonnancement-pilotage-coordination-et-planification/
- https://www.architectes.org/formations/assurer-la-mission-opc-ordonnancement-pilotage-coordination
- https://smartformation.eu/courses/ordonnancement-pilotage-et-coordination-qualification-opqibi-0302/
- https://www.grandparisexpress.fr/march%C3%A9s
- https://aoconquete.fr/article-cctp/
- https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market
- https://www.strategicrevenueinsights.com/fr/industry/project-management-software-systems-market
- https://www.societedesgrandsprojets.fr/grand-paris-express
