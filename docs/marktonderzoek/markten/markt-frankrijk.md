# Marktonderzoek: projectplanning-/schedulingsoftware in Frankrijk

*Datum onderzoek: juli 2026. Regio: West-Europa. Focus: Gantt/CPM-planningssoftware voor de bouw (BTP — bâtiment et travaux publics) plus algemene projectplanningstools voor zover serieus gebruikt voor planning.*

---

## 1. Samenvatting

Frankrijk is de op één of twee na grootste bouwmarkt van Europa, met wereldspelers als **Vinci, Bouygues, Eiffage, Colas, Spie batignolles en NGE**, een enorm nucleair programma (EDF/Framatome: EPR2, Hinkley Point C, Sizewell C, NUWARD SMR) en megaprojecten als het **Grand Paris Express** (4 nieuwe metrolijnen, in dienststelling 2026–2031). De planningsmarkt valt uiteen in drie duidelijk gescheiden lagen:

1. **Megaproject/industrie-laag**: **Oracle Primavera P6** is de onbetwiste standaard bij nucleair (EDF, Framatome, Orano, Edvance), grote infra (Grand Paris, ferroviair) en EPC/olie & gas. Franstalige vacaturesites tonen doorlopend 60–80 openstaande "planificateur Primavera P6"-posities. **TILOS** (tijd-weg) is sterk bij lineaire projecten (SNCF, Colas Rail, Egis Rail, Bouygues, Eiffage, Vinci Construction als referenties van de Franse distributeur).
2. **Bâtiment/OPC-laag**: de typisch Franse **OPC-missie** (Ordonnancement, Pilotage, Coordination — een wettelijk verankerde, aparte planningsrol in het Franse bouwproces) draait overweldigend op **MS Project**, aangevuld met Excel-Gantt. Dit is een cultureel unicum: planning wordt bij gebouwen vaak niét door de aannemer maar door een extern OPC-bureau gedaan.
3. **Franse SaaS-laag**: een opvallend rijke, eigen software-industrie — zowel PPM-zwaargewichten van Franse origine (**Planisware**; en **Sciforma**, dat echter in 2025 door het Amerikaanse **Planview** is overgenomen — zie §3.2) als een dichte laag Franstalige BTP-tools voor mkb-aannemers (**Obat, Graneet, Alobees, Optim'BTP, Onaya, Batiscript, Mediabat, Vertuoza** [Belgisch], **Finalcad, Teamoty**) en generieke Franse planners (**PlanningPME, Visual Planning, Bubble Plan, Beesbusy, Yookkan, Gouti**).

Taal is een echte toetredingsdrempel: Franstalige UI, support en documentatie zijn de facto vereist (mede door de loi Toubon en de sterke voorkeur voor "hébergement en France"). Een fr-locale is voor elk pakket dat hier serieus wil meedoen noodzakelijk, geen nice-to-have.

**Geschatte marktomvang** (expliciete schatting, zie §2): **€185–240 miljoen/jaar** voor projectplanning-/schedulingsoftware in Frankrijk breed, waarvan **€60–90 miljoen** bouwspecifieke planning (licenties + SaaS, excl. diensten), groeiend met ~10–15%/jaar. *(Gecorrigeerd bij verificatie: de eerdere bandbreedte €180–300 mln volgde niet uit de eigen rekensom in §2.2 — zie §8.)*

---

## 2. Marktomvang

### 2.1 Referentiecijfers (wereld/Europa)

- Wereldmarkt projectmanagementsoftware: **USD 9,76 mld (2025)**, prognose **USD 23,09 mld in 2031**, CAGR **15,42%** (2026–2031) — [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market). *(Bij verificatie letterlijk teruggevonden op de bron; ook intern consistent: 9,76 × 1,1542⁶ ≈ 23,1.)*
- Alternatieve raming: **USD 9,54 mld (2024)** → USD 24,3 mld (2033), CAGR 10,92% — [Strategic Revenue Insights](https://www.strategicrevenueinsights.com/fr/industry/project-management-software-systems-market). *(Nagerekend: (24,3/9,54)^(1/9) − 1 = 10,95%, dus de gepubliceerde 10,92% klopt binnen afronding. Bron zelf is een low-tier rapportverkoper — behandel als indicatie, niet als bewijs.)*
- Europa is volgens Mordor een "steady performer" met compliance-gedreven adoptie (GDPR/datalokalisatie); geen apart Frankrijk-cijfer gepubliceerd in de openbare samenvattingen. Wel publiceert Mordor **Noord-Amerika = 36,12% marktaandeel (2025)** en Azië-Pacific als snelste groeier (16,06% CAGR) — dat maakt een Europees aandeel van ~25–30% plausibel maar niet bewezen.

### 2.2 Afleiding Frankrijk (SCHATTING, expliciet beredeneerd)

Er bestaat geen openbaar, betrouwbaar Frankrijk-specifiek cijfer voor deze niche. Redenering:

- Europa neemt doorgaans ~25–30% van de wereldwijde softwaremarkt voor zijn rekening; Frankrijk is ~14–16% van de West-Europese IT-markt (2e/3e economie van Europa).
- 9,76 mld × 27,5% (Europa) × 15% (Frankrijk) = **USD 403 mln (~€370 mln bij ±1,08 USD/EUR)** voor projectmanagementsoftware *in brede zin* (incl. work management à la Monday/Asana). *(Nagerekend en juist; let op dat de €-omrekening wisselkoersgevoelig is: bij 1,16 USD/EUR wordt het ~€347 mln.)*
- Beperkt tot echte **planning/scheduling met Gantt/CPM** (P6, MS Project, Powerproject, TILOS, PPM-planning, BTP-planningstools): naar schatting 50–65% daarvan → **€185–240 mln/jaar (2025)**. **[GECORRIGEERD]** De oorspronkelijke tekst noemde hier €180–300 mln; de bovengrens €300 mln komt neer op 81% van €370 mln en is dus onverenigbaar met de eigen 50–65%-aanname. 50% × €370 mln = €185 mln; 65% × €370 mln = €240 mln.
- Bouwspecifiek deel: bouwinvesteringen zijn in Frankrijk goed voor ~11% van het bbp (**€334 mld investeringen op €2.979 mld bbp in 2025 = 11,2%** — [FIEC Statistical Report, landenprofiel Frankrijk](https://fiec-statistical-report.eu/france)) en de sector is bovengemiddeld planningsintensief (OPC-cultuur, megaprojecten) → **schatting €60–90 mln/jaar** voor bouw-scheduling (≈ een derde van de gecorrigeerde bandbreedte). **Let op de definitie:** ~11% geldt voor bouw*investeringen/output*; de bruto **toegevoegde waarde** van de bouw ligt in de Franse nationale rekeningen aanmerkelijk lager (grootteorde 5–6% van het bbp). Wie het cijfer als "aandeel in het bbp" leest, overschat de sector ruwweg met een factor twee.
- Groei: 10–15%/jaar, in lijn met de mondiale CAGR-ramingen hierboven.

### 2.3 Ordegrootte gebruikers/planners (SCHATTING)

- Fulltime professionele planners ("planificateur", "planificateur OPC", "ingénieur planning"): het beroep heeft een eigen OPIIEC-beroepsfiche ([Opiiec — Planificateur OPC](https://www.opiiec.fr/metiers/83024-planificateur-opc)); Indeed toont structureel **75+ vacatures alleen al voor P6-planners** ([Indeed.fr](https://fr.indeed.com/q-planificateur-projet-primavera-p6-emplois.html)), Glassdoor 64 landelijk ([Glassdoor](https://www.glassdoor.fr/Emploi/france-planificateur-projet-primavera-p6-emplois-SRCH_IL.0,6_IN86_KO7,40.htm)). **[GECORRIGEERD — te laag]** Onafhankelijke controle op een niet in dit rapport genoemd jobboard geeft een fors hoger volume: **HelloWork toont 272 treffers voor "Primavera P6" in Frankrijk** ([HelloWork](https://www.hellowork.com/fr-fr/emploi/recherche.html?k=Primavera+P6)), met o.a. Assystem, Capgemini, In Genium en Cowork Engineering als werkgevers. Die 272 is een bredere trefwoordmatch (inclusief interim/duplicaten) en dus geen zuivere telling, maar de in §1 genoemde "60–80 openstaande posities" is aantoonbaar de ondergrens, niet het bereik. Op basis van de vacature-omloopsnelheid en de omvang van nucleair + infra + OPC-bureaus: **schatting 10.000–20.000 fulltime planners**, waarvan enkele duizenden P6-gebruikers (blijft een schatting; geen brontelling gevonden).
- Salarisindicatie planners: **€32k–55k/jaar**. **[GECORRIGEERD — ondergrens]** De eerder genoemde €40k–55k geldt hooguit voor Île-de-France/nucleair; actuele advertenties tonen een bredere spreiding: In Genium "Planificateur Projet – Nucléaire – Primavera P6" (Lyon) **€32.000–40.000**, Cowork Engineering "Ingénieur Planning Primavera P6" (internationaal HVDC-project) **€45.000–55.000** ([HelloWork](https://www.hellowork.com/fr-fr/emploi/recherche.html?k=Primavera+P6); vergelijk [Framatome careers](https://www.framatome.com/fr/candidats/offres-emplois/planificateur-du-projet-nuward-smr-f-h-ref-2026-25401/)).
- Bredere Gantt-gebruikers (MS Project-licenties, BTP-SaaS-abonnees, conducteurs de travaux die plannen): **schatting 150.000–400.000**.

---

## 3. Gebruikte software: marktpositie en prijzen

### 3.1 Top-laag: megaprojecten, industrie, infra

#### Oracle Primavera P6 — de standaard voor complexe projecten
- **Positie**: "la référence dès que la complexité dépasse un certain seuil" volgens de Franse project-controls-consultancy SIPCO (Rennes); dominant in EPC, infra, energie ([SIPCO](https://www.sipco-france.fr/blog/primavera-p6-vs-ms-project-lequel-choisir-pour-vos-projets-industriels)). **Vinci Construction France werft actief P6-planners** ([vacature](https://talents.studysmarter.co.uk/companies/vinci-construction-france/defence-primavera-p6-planner-scheduling-resources-25444795/)); Framatome/EDF gebruiken P6 als ruggengraat van de nucleaire planning, incl. dedicated "administrateur de la base Primavera"-rollen voor Hinkley Point C ([LinkedIn/Framatome](https://fr.linkedin.com/jobs/view/planificateur-administrateur-de-la-base-primavera-projet-nucl%C3%A9aire-hpc-f-h-at-framatome-3745033477), [Framatome](https://www.framatome.com/fr/candidats/offres-emplois/planificateurrice-projets-nucleaires-travaux-neufs-f-h-ref-2026-26078/)).
- **Prijs — GEEN OFFICIËLE LIJSTPRIJS BESCHIKBAAR; alle onderstaande bedragen zijn derdenschattingen.** **[GECORRIGEERD]** Oracle publiceert geen prijslijst voor Primavera: de officiële prijslijstpagina bevat wél Technology, Fusion, Siebel, JD Edwards, MySQL enz. maar **géén Construction & Engineering/Primavera-lijst** ([Oracle price lists](https://www.oracle.com/corporate/pricing/)), en de Primavera-Cloud-productpagina toont uitsluitend "Request a demo / Contact us" ([Oracle Primavera Cloud](https://www.oracle.com/construction-engineering/primavera-cloud-project-management/)). De in dit rapport aangehaalde Capterra-pagina noemt bovendien als startprijs **"$100 per year"** en ondersteunt de hieronder genoemde bedragen dus níet ([Capterra](https://www.capterra.com/p/145503/Oracle-Primavera/)).
  - Circulerende (niet-officiële) indicaties: P6 Professional **$2.500 perpetual + ~$550/jr onderhoud** → **~$3.050 eerste jaar**. *De oorspronkelijke tekst noemde hier "~$2.570 eerste jaar", wat een rekenfout is: $2.500 + $550 = $3.050.* Merk op dat $550 exact 22% van $2.500 is — het gebruikelijke Oracle-supportpercentage, wat de plausibiliteit van het koppel ondersteunt maar niet bewijst.
  - P6 EPPM **$2.750 perpetual + $605/jr onderhoud** (= $3.355 eerste jaar; $605 is eveneens 22%); **P6 EPPM Cloud ~$125/gebruiker/maand**; Progress Reporter Cloud ~$12/gebr/mnd. **Alle vier onbevestigd** — behandel als orde-van-grootte, niet als prijs ([ProjectManager.com](https://www.projectmanager.com/fr/quest-ce-que-primavera-p6)).
  - In de praktijk loopt Frankrijk via partnerofferte (zie *Lokale kanalen*); reken op korting/bundeling ten opzichte van elke VS-lijstprijs.
- **Lokale kanalen**: Oracle-partners zoals **MESLI Consulting** (Massy, licentieverkoop + training — [mesli-consulting.com](https://www.mesli-consulting.com/our-activities/oracle-solutions/sale-of-primavera-p6-licenses/), [formationprimavera.fr](https://formationprimavera.fr/)) en consultancies als SIPCO Project Control.
- **Gebruikers**: grote aannemers (génie civil-divisies), EDF/Framatome/Orano en hun hele nucleaire toeleverketen, Grand Paris-contractanten, olie & gas (TotalEnergies-keten), defensie (Naval Group).

#### Microsoft Project — het werkpaard van de OPC en het bâtiment
- **Positie**: de dominante tool bij OPC-bureaus, maîtrise d'œuvre en middelgrote aannemers; OPC-opleidingen (IPTIC, Ordre des architectes) noemen expliciet MS Project (naast Excel-Gantt en Primavera) als kerncompetentie ([IPTIC](https://iptic.fr/formations/pratiques-professionnelles-reglementaires/coordination-securite/opc-ordonnancement-pilotage-coordination-et-planification/), [Opiiec](https://www.opiiec.fr/metiers/83024-planificateur-opc)).
- **Prijs Frankrijk (gecontroleerd op microsoft.com/fr-fr, juli 2026)** — **[GECORRIGEERD]**:
  - **Planner and Project Plan 3: 26,00 € HT per gebruiker/maand, bij jaarbetaling** ("utilisateur/mois, paiement annuel") — [Microsoft FR](https://www.microsoft.com/fr-fr/microsoft-365/planner/project-plan-3). De eerder genoemde "~€28,70–30/gebr/mnd" is **te hoog**; €28,70 lijkt bovendien een verhaspeling van de Plan 1-prijs.
  - **Planner (Plan 1): 8,70 € HT per gebruiker/maand, jaarbetaling.**
  - **Microsoft Planner** (basis) is inbegrepen in Microsoft 365-abonnementen.
  - **Plan 5: niet meer als koopoptie aanwezig** op de Franse Microsoft-site — de plan-vergelijking toont nog uitsluitend Planner, Plan 1 en Plan 3. Dat is consistent met de claim dat de nieuwverkoop van "Planner and Project Plan 5" is gestopt, maar **de datum 1 mei 2026 kon niet bij Microsoft zelf worden bevestigd** (de Microsoft Learn-servicebeschrijving is van 2023 en noemt Plan 1/3/5 nog alle drie) — [Microsoft Learn](https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-online-service-description). Behandel de datum als onbevestigd, het einde van de nieuwverkoop als waarschijnlijk.
  - Let op bij vergelijken: Franse prijzen zijn **HT (excl. btw) en veronderstellen jaarverplichting**; maandelijks opzegbaar ligt hoger.

#### TILOS (Trimble) — tijd-weg-planning voor lineaire infra
- **Positie**: nummer 1 voor lineaire projecten (spoor, weg, pijpleidingen). Exclusieve Franse distributeur: **Projet Linéaire** (tilosfrance.com) — bevestigd. Franse referenties bevestigd en aangevuld: **SNCF, Bouygues, Eiffage, Vinci Construction, Total, Colas Rail, Egis Rail** plus **Guintoli, Systra en Spiecapag** ([tilosfrance.com](https://www.tilosfrance.com/), [sectoren](https://www.tilosfrance.com/secteurs-application-tilos/tilos-construction-autoroute)). Het product wordt **nog steeds actief verkocht en onderhouden door Trimble** — geen end-of-life/end-of-sale-melding op de productpagina ([Trimble Construction — TILOS](https://construction.trimble.com/en/products/tilos)). De claim "SNCF-ingenieursdivisie beveelt het expliciet aan" staat alleen op de distributeurssite en is **niet onafhankelijk bevestigd**.
- **Prijs**: alleen op offerte; **noch Trimble noch de Franse distributeur publiceert een prijs** (beide tonen enkel "demo aanvragen") — geverifieerd. De circulerende indicatie van ~€4.000–6.000 per seat perpetual blijft daarmee **ONBEVESTIGD**; niet als planningsgetal gebruiken.

#### Elecosoft (Asta) Powerproject
- **Positie**: wereldwijd **"more than 100,000 professionals"** — bevestigd op de vendorsite; **Frans staat expliciet in de talenlijst** (naast EN-AU/UK/US, DA, NL, FI, DE, NO, SV, PL, ES, IT, TR) — bevestigd. In Frankrijk duidelijk kleiner dan in VK/Duitsland/Benelux (positionering blijft SCHATTING op basis van bronschaarste); verkoop via resellers ([Elecosoft](https://eleco.com/products/asta/asta-powerproject/), [G2](https://www.g2.com/products/asta-powerproject/reviews)). Licenties: **single user (device-gebonden), concurrent server, SaaS-cloudabonnement** — bevestigd; prijs uitsluitend op aanvraag (14-daagse trial, verkoop via +44 1844 261 700). De indicatie ~£1.200–2.000/seat is **ONBEVESTIGD** — Elecosoft publiceert geen enkel bedrag.

#### Bentley Synchro 4D
- **Positie**: het 4D BIM-planningsreferentiepunt bij grote Franse aannemers (BIM/VDC-teams van Vinci/Bouygues-dochters op grote projecten); prijs niet publiek, via Bentley/Virtuosity op offerte ([Bentley](https://www.bentley.com/software/synchro/), [Capterra](https://www.capterra.com/p/35289/Synchro/)).

#### Overige internationale specialisten (aanwezig maar niche)
- **ALICE Technologies** (generatieve scheduling; pilots bij Europese majors, koppelt aan P6 — [alicetechnologies.com](https://www.alicetechnologies.com/alice-optimize)), **Nodes & Links / nPlan** (AI-schedule-analytics, vooral via VK-megaprojecten waar Franse majors aan meebouwen), **RIB Candy/iTWO** (beperkt in Frankrijk; RIB is er vooral met CRM/estimating), **Sciforma/Safran/Deltek Open Plan/Spider Project** (Sciforma: zie 3.2; de rest marginaal in Frankrijk). — Positionering deels SCHATTING op basis van vacature-/referentieschaarste in Franse bronnen.

### 3.2 Franse PPM-industrie (van oorsprong eigen zwaargewichten — één daarvan inmiddels Amerikaans)

#### Planisware — Franse wereldspeler in PPM
- Hoofdkantoor **Parijs** (bevestigd), **beursgenoteerd op Euronext Paris**: ticker **PLNW**, ISIN **FR001400PFU4**, opgenomen in de **CAC Mid & Small**, beurswaarde ca. **€1,40 mld** ([Boursorama](https://www.boursorama.com/cours/1rPPLNW/)). **600+ blue-chip-klanten** — letterlijk bevestigd op de vendorsite. **"4x Leader in Gartner APMR MQ"** — bevestigd, met als meest recente de *2025 Gartner Magic Quadrant for Adaptive Project Management & Reporting*; let op dat dit de **APMR**-MQ is, niet een generieke "Gartner MQ". Producten: **Enterprise**, **Orchestra** (turnkey PPM, van oorsprong het Franse NQI Orchestra), en daarnaast **Horizon**, **Nova**, PSA plus een expliciete **Engineering & Construction**-vertical ([planisware.com](https://www.planisware.com/)). Sterk bij Franse industrie (auto, farma, defensie, energie) voor portfolioplanning mét Gantt/CPM. Prijs: enterprise, op offerte (SCHATTING: doorgaans zes cijfers per jaar voor grote uitrol — geen bron gevonden).
- **Nuance op "IPO 2024"**: de beursnotering zelf is bevestigd, maar de investor-relationspagina toont geregistreerde documenten uit **september 2023** (Registration Document I.23-030, Securities Note 23-414) — de eerste, afgeblazen beursgang. Het jaartal 2024 voor de daadwerkelijke introductie is **niet primair bevestigd** ([Planisware IR](https://www.planisware.com/investors)).

#### Sciforma — **niet langer een onafhankelijke Franse speler: overgenomen door Planview (VS)**
- **[GECORRIGEERD — materieel]** Het rapport presenteerde Sciforma als Franse PPM-veteraan naast Planisware. Dat klopt niet meer: **Planview (Austin, Texas) heeft Sciforma in 2025 overgenomen** en het product hernoemd — *"Sciforma Vantage (now Planview® ProjectAdvantage)"* ([Planview — About Sciforma](https://www.planview.com/acquisitions/about-sciforma/)). Zowel **sciforma.fr/fr als sciforma.com/fr redirecten inmiddels (HTTP 301) naar planview.com**; de zelfstandige Franse website bestaat niet meer. Daarmee heeft Frankrijk in dit segment feitelijk nog **één** eigen PPM-wereldspeler (Planisware), niet twee — zie de gecorrigeerde formulering in §4.7.
- Functioneel blijft het een PPM met volwaardige CPM-planning voor ETI/grote organisaties (industrie, publiek, gezondheidszorg), nu onder Planview-vlag en -roadmap; koopadvies vergt dus een leverancierscontinuïteitscheck.
- **Prijs [GECORRIGEERD]**: de geclaimde instapprijs **"vanaf €10/gebr/mnd" wordt door de eigen bron niet (meer) ondersteund** — Appvizer vermeldt voor beide tiers (Moyenne/Grande Entreprise) uitsluitend **"sur demande"** ([Appvizer](https://www.appvizer.fr/operations/ppm/sciforma)). Er is geen publieke lijstprijs; de eerder genoemde €20–40/gebr/mnd blijft een onbevestigde schatting.

### 3.3 Franstalige BTP-tools (mkb-aannemers) — de lokale laag

Bron voor de vergelijking: [independant.io comparatief](https://independant.io/logiciel-planning-chantier/), [Obat-blog](https://www.obat.fr/blog/logiciel-planning-chantier/), [Qonto top-10](https://qonto.com/fr/blog/gestion-entreprise/btp-construction/logiciel-planning-chantier), [Alobees-vergelijkingen](https://www.alobees.com/en/conseils/best-construction-planning-software-2025), [Skello](https://www.skello.io/blog/logiciels-planning-chantier).

*Prijzen hieronder zijn bij verificatie rechtstreeks op de tarievenpagina's van de leveranciers gecontroleerd (juli 2026); afwijkingen t.o.v. de oorspronkelijke tabel zijn gemarkeerd.*

| Pakket | Herkomst | Doelgroep | Prijs (indicatie) | Positie |
|---|---|---|---|---|
| **Obat** | FR | zzp/TPE | **€25/mnd HT** alleen micro-entreprise *niet-btw-plichtig* bij jaarbetaling; btw-plichtige artisan/PME: **€39/mnd HT (jaar)** of **€49/mnd HT (maand)** — **per bedrijf, niet per gebruiker** [GECORRIGEERD] | facturatie-eerst, Gantt-planning; transparantste prijzen |
| **Alobees** | FR | TPE/kleine PME (5–100 medewerkers) | **€40/mnd HT per bedrijf + €10/mnd HT per gebruiker** (Standard) → €50/mnd bij 1 gebruiker, maar schaalt mee [GEPRECISEERD] | mobiel-eerst werfopvolging + ploegplanning (geen Gantt-weergave op de site genoemd) |
| **Graneet** | FR | PME | **geen publieke bedragen**; tiers op *bedrijfsomzet* (€1–3M / €3–6M / €6–10M / €10–50M / Groupe "sur devis") — de eerder genoemde €200–800/mnd is **onbevestigd** [GECORRIGEERD] | financieel gedreven BTP-ERP met planningsmodule |
| **Vertuoza** | BE (fr-talig) | TPE/PME | offerte (4 packs) | alles-in-één devis→facturatie→planning |
| **Optim'BTP** | FR | TPE/PME | offerte | incl. materieelbeheer |
| **Onaya** (Aquitem) | FR | PME/ETI | offerte, modulair | gevestigde Franse BTP-suite |
| **Batiscript** (Script&Go) | FR | PME | offerte, modulair | planning + opvolging + oplevering (OPR) |
| **Mediabat** | FR | ambacht/TPE | offerte | devis/planning met Gantt |
| **Finalcad** | FR | TPE–ETI | freemium | Franse pionier werf-apps, taken/opvolging |
| **Fieldwire by Hilti** | US/LI | TPE/PME | gratis instap **bevestigd**: Basic $0/gebr/mnd (max. 5 gebruikers, 3 projecten, 100 sheets); betaald $39 / $64 / $89 per gebr/mnd bij jaarbetaling | Gantt/kanban-werfplanning, sterk verspreid |
| **Procore** | US | PME/ETI | offerte | platform, koppelt met MSP/P6 ([procore.com/fr](https://www.procore.com/fr/gestion-de-projet/planning)) |
| **LetsBuild** (ex-Aproplan/GenieBelt) | BE/DK | PME/ETI | offerte | realtime multi-projectplanning |
| **Teamoty** | FR | GC's/majors | offerte | lean/takt-planning ("planification collaborative"), gebruikt op Franse werven van grote aannemers — **teamoty.com gaf bij hercontrole opnieuw HTTP 503**; alle claims blijven onbevestigde vendorinformatie |

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
6. **Planisware** (en het naar Planview overgegane **Sciforma/ProjectAdvantage**) — PPM-laag industrie/enterprise.
7. **Synchro 4D, Powerproject, Procore, LetsBuild, Fieldwire** — uitdager-/nicheposities.
8. **ALICE, Nodes & Links, nPlan** — vroege AI-adoptie op megaprojecten.

---

## 4. Lokale bijzonderheden

1. **De OPC-missie als aparte planningsmarkt.** Uniek Frans: bij gebouwen wordt planning/coördinatie vaak uitbesteed als aparte wettelijk omkaderde missie (erfenis loi MOP, nu Code de la commande publique), uitgevoerd door gespecialiseerde OPC-bureaus met een eigen OPQIBI-kwalificatie ([Smart Formation](https://smartformation.eu/courses/ordonnancement-pilotage-et-coordination-qualification-opqibi-0302/), [Ordre des architectes](https://www.architectes.org/formations/assurer-la-mission-opc-ordonnancement-pilotage-coordination)). **Verificatiestatus:** dat OPQIBI een OPC-kwalificatie kent, is bevestigd — "OPC (ordonnancement, pilotage, coordination)" staat in de zoeknomenclatuur op [opqibi.com](https://www.opqibi.com/). Het **exacte codenummer 0302 kon niet bij OPQIBI zelf worden geverifieerd** (de nomenclatuur zit achter een interactieve zoekmodule; directe code-URL's geven 404) — behandel het nummer als onzeker, de kwalificatie als bestaand. Ook de juridische verankering (erfenis loi MOP, nu Code de la commande publique) kon niet via Legifrance worden nagelopen. Deze bureaus zijn een homogene MS Project/Excel-doelgroep.
2. **Nucleair als planningsmotor.** EDF/Framatome-programma's (EPR2, HPC, Sizewell C, NUWARD) creëren structurele vraag naar P6-planners en P6-database-administrators; kennis van "PMBOK + P6 + nucleaire mijlpalen" is een vast profiel ([Framatome](https://www.framatome.com/fr/candidats/offres-emplois/planificateur-du-projet-nuward-smr-f-h-ref-2026-25401/)).
3. **Megaproject-eisen.** Op Grand Paris Express-, SNCF- en nucleaire contracten worden planningseisen (software/uitwisselformaat) in het CCTP vastgelegd; concrete publieke CCTP-clausules die P6/XER verplichten zijn niet vrij online in te zien, maar de vacature- en toolingpraktijk (P6-databases per project, TILOS bij spoor) wijst op de facto P6/XER-verplichting op deze programma's — **markeer als goed onderbouwde aanname, geen gepubliceerde regel** ([Grand Paris Express marchés](https://www.grandparisexpress.fr/march%C3%A9s), [CCTP-uitleg](https://aoconquete.fr/article-cctp/)). **Verificatie:** deze hedge is bij hercontrole terecht gebleken en blijft staan — er is géén gepubliceerde aanbestedingsregel gevonden die P6 of XER voorschrijft. Wat wél onafhankelijk bevestigd is, is de omvang van het onderliggende programma (Grand Paris Express: **4 nieuwe lijnen 15/16/17/18, 200 km, 68 stations, indienststelling 2026–2031**, plus de in 2024 geopende verlenging van lijn 14 — [Société des grands projets](https://www.societedesgrandsprojets.fr/grand-paris-express)) en de daaraan gekoppelde P6-arbeidsvraag (272 HelloWork-treffers, §2.3). **Formuleer dit richting klanten dus als marktpraktijk, nooit als "P6 is verplicht bij overheidswerk" — die sterkere bewering is niet houdbaar.**
4. **Taaleis.** De loi Toubon (1994) wordt breed aangehaald als verplichting om werkdocumentatie in het Frans te stellen. **Verificatiestatus: onzeker in de details** — de precieze reikwijdte (geldt die ook voor software-UI en technische documentatie? welke uitzondering voor uit het buitenland ontvangen stukken?) kon in dit onderzoek niet bij een officiële bron (Legifrance/travail-emploi.gouv.fr) worden nagelezen; die pagina's gaven 404/500/bot-blokkade. Behandel dit als **commercieel argument met juridische kleuring, niet als een geverifieerde compliance-eis**. Gecombineerd met de cultuurvoorkeur betekent het praktisch wel: zonder volledige Franse locale, Franse support en liefst Franse hosting geen serieuze kans in het mkb-segment. Franse comparatifs benadrukken expliciet "hébergement en France" en "support en français" als koopcriteria ([Obat-blog](https://www.obat.fr/blog/logiciel-planning-chantier/)).
5. **Opleidingscultuur.** Sterk ontwikkeld trainingsecosysteem: CPF-financierbare P6-/MS Project-opleidingen (MESLI/formationprimavera.fr, Instituto Labs voor P6-wegenprojecten, IPTIC en de Ordre des architectes voor OPC) ([formationprimavera.fr](https://formationprimavera.fr/), [institutolabs.com](https://www.institutolabs.com/courses/planification-et-pilotage-de-projets-routiers-avec-primavera-p6/)).
6. **Reseller-/consultancylandschap.** Oracle-partners: MESLI Consulting (Massy) voor licenties/training; project-controls-bureaus als SIPCO (Rennes) voor P6/MSP-implementatie; Projet Linéaire als exclusieve TILOS-distributeur; detacheerders (Astek, Alten, Assystem) leveren planners aan nucleair/infra.
7. **Sterke eigen software-industrie — maar aan het consolideren.** Frankrijk is één van de weinige Europese landen met een eigen PPM-wereldspeler (**Planisware**, Euronext Paris) én een dicht net van lokale BTP-SaaS — buitenlandse toetreders concurreren dus tegen Franstalige, lokaal gewortelde alternatieven in elk segment. **[GECORRIGEERD]** Sciforma hoort hier niet meer bij: het is in 2025 door **Planview (VS)** overgenomen en heet nu Planview ProjectAdvantage ([Planview](https://www.planview.com/acquisitions/about-sciforma/)). De onderliggende trend is dus juist het *tegenovergestelde* van softwaresoevereiniteit: de Franse PPM-laag consolideert richting Amerikaanse eigenaren, wat het "hébergement/éditeur français"-verkoopargument voor nieuwkomers eerder sterker dan zwakker maakt.

---

## 5. Lokale/niche-pakketten: voor- en nadelen

*(alleen pakketten die buiten Frankrijk nauwelijks opduiken; beoordeling op basis van Franse comparatifs/reviews en vendordocumentatie — waar mager onderbouwd, gemarkeerd)*

**Obat** — ✚ zeer transparante prijzen, **per bedrijf in plaats van per gebruiker** (gunstig voor kleine ploegen), sterk in devis/facturatie + eenvoudige Gantt, groot bereik onder zzp/TPE. ✚ Franstalig alles. ✖ de veelgeciteerde "vanaf €25/mnd" geldt **alleen voor niet-btw-plichtige micro-entreprises bij jaarbetaling**; een gewone btw-plichtige artisan of PME betaalt €39/mnd HT (jaar) of €49/mnd HT (maand) — realistischer instapniveau. ✖ planning is bijzaak naast facturatie; geen CPM, geen resources-nivellering; niet geschikt boven ~50 medewerkers ([obat.fr/tarifs](https://www.obat.fr/tarifs), [independant.io](https://independant.io/logiciel-planning-chantier/)).

**Alobees** — ✚ mobiel-eerst, werfopvolging en ploegplanning sterk; doelgroep is blijkens de eigen site bedrijven met **5–100 medewerkers**. ✖ de prijs is **niet** een vast bedrag: **€40/mnd HT per bedrijf + €10/mnd HT per gebruiker**, dus een ploeg van 10 zit al op €140/mnd HT. ✖ geen financiële modules, geen echte CPM-planning; de site noemt **geen Gantt-weergave** — het is werklast-/ploegplanning ([alobees.com/tarifs](https://www.alobees.com/tarifs), [Skello](https://www.skello.io/blog/avis-graneet-alternatives)).

**Graneet** — ✚ financieel stuurmiddel (marges per chantier) met geïntegreerde planning; modern, PME-gericht. ✖ **prijzen volledig ondoorzichtig**: geen enkel bedrag publiek, tiers zijn gedefinieerd op *bedrijfsomzet* (€1–3M t/m €10–50M, daarboven "sur devis") — de in omloop zijnde €200–800/mnd is onbevestigd. ✖ planning ondergeschikt aan financiën ([graneet.com/tarifs](https://www.graneet.com/tarifs), [Skello](https://www.skello.io/blog/avis-graneet-alternatives)).

**Onaya (Aquitem)** — ✚ gevestigde, complete Franse BTP-suite (devis→planning→facturatie), modulair, PME/ETI. ✖ gedateerde UX (veelgehoord in comparatifs), on-prem-erfenis, offerte-prijzen ([independant.io](https://independant.io/logiciel-planning-chantier/)).

**Optim'BTP** — ✚ incl. materieel-/wagenparkbeheer, geliefd bij TP-bedrijven. ✖ planning is resource-gericht, geen CPM ([independant.io](https://independant.io/logiciel-planning-chantier/)).

**Batiscript (Script&Go)** — ✚ sterke koppeling planning ↔ opleveringen (OPR/réserves), tablets op de werf. ✖ modulaire prijsopbouw ondoorzichtig; planning minder diep dan MSP ([batiscript.com](https://www.batiscript.com/gantt-chantier/)).

**Mediabat** — ✚ goedkoop, ambachtsgericht, Gantt in werfopvolging. ✖ verouderde look, klein ecosysteem ([probatiment.com](https://www.probatiment.com/planning-de-chantier/)).

**PlanningPME (Target Skills)** — ✚ zeer snelle ploeg-/resourceplanning, Excel/Outlook-koppeling, 20+ landen maar kern-DNA Frans mkb. ✖ geen projectlogica (geen afhankelijkheden/CPM), desktop-erfenis ([planningpme.fr](https://www.planningpme.fr/)).

**Visual Planning (Stilog)** — ✚ extreem configureerbaar (resources, materieel, ploegen), Franse hosting. ✖ configuratie vergt consultancy; geen CPM (vendordocumentatie; beperkte onafhankelijke reviews — SCHATTING).

**Bubble Plan / Beesbusy / Yookkan / Gouti** — ✚ intuïtief, goedkoop, Franse hosting en support (belangrijk koopargument). ✖ lichte Gantts zonder CPM/baselines; niet bouwspecifiek ([obat.fr](https://www.obat.fr/blog/logiciel-planning-chantier/)).

**Teamoty** — ✚ enige Franse takt-/lean-scheduling-tool, flow-gebaseerde werfplanning, gebruikt door grote Franse GC's (vendorclaims). ✖ nichemethodiek vergt lean-cultuur; weinig onafhankelijke reviews; prijs op offerte. (Onderbouwing beperkt — vendorinformatie; site was tijdens onderzoek onbereikbaar.)

**Sciforma (nu Planview ProjectAdvantage)** — ✚ Franse roots, volwaardige CPM + PPM, sterke resource-capaciteitsplanning, schaalbaar ETI→enterprise. ✖ implementatietraject nodig; UI minder modern dan nieuwe SaaS; **geen publieke instapprijs** (Appvizer toont "sur demande"; de eerder geciteerde €10/gebr/mnd is vervallen). ✖✖ **Hoort strikt genomen niet meer in deze §5-lijst van "buiten Frankrijk nauwelijks opduikende" pakketten**: sinds de overname door Planview (2025) is het een internationaal product onder Amerikaanse eigendom, met een eigen Franse site die niet meer bestaat ([Planview](https://www.planview.com/acquisitions/about-sciforma/), [Appvizer](https://www.appvizer.fr/operations/ppm/sciforma), [chef-de-projet.fr](https://chef-de-projet.fr/sciforma/)).

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

### 7.1 Aanvullende bronnen uit de verificatieronde (niet in het oorspronkelijke rapport)

- https://www.planview.com/acquisitions/about-sciforma/ — overname Sciforma door Planview (2025), hernoemd tot Planview ProjectAdvantage
- https://www.boursorama.com/cours/1rPPLNW/ — Planisware beursgegevens (PLNW, FR001400PFU4, CAC Mid & Small)
- https://www.planisware.com/investors — Planisware investor relations (registratiedocumenten sept. 2023)
- https://www.oracle.com/corporate/pricing/ — Oracle-prijslijstoverzicht (bevat géén Primavera/Construction & Engineering-lijst)
- https://www.oracle.com/construction-engineering/primavera-cloud-project-management/ — Primavera Cloud, geen gepubliceerde prijs
- https://construction.trimble.com/en/products/tilos — TILOS actief bij Trimble, geen EOL, geen prijs
- https://www.obat.fr/tarifs — Obat-tarieven
- https://www.alobees.com/tarifs — Alobees-tarieven
- https://www.graneet.com/tarifs — Graneet-tarieven (omzet-tiers, geen bedragen)
- https://www.fieldwire.com/pricing/ — Fieldwire-plannen incl. gratis Basic
- https://www.hellowork.com/fr-fr/emploi/recherche.html?k=Primavera+P6 — onafhankelijke vacaturetelling + salarisbanden
- https://fiec-statistical-report.eu/france — FIEC-landenprofiel Frankrijk (bouwinvesteringen vs. bbp)
- https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-online-service-description — Microsoft Project-servicebeschrijving
- https://www.opqibi.com/ — OPQIBI-nomenclatuur (OPC-kwalificatie aanwezig; codenummer niet verifieerbaar)

---

## 8. Verificatie

*Adversariële fact-check, uitgevoerd juli 2026. Methode: elke bewering is actief geprobeerd te wéérleggen met bronnen die het rapport zelf niet noemt — bij voorkeur de leverancier/uitgever zelf (primaire prijs- en productpagina's) in plaats van vergelijkingsblogs. Doorgerekende schattingen zijn opnieuw uitgerekend. Waar de bron de bewering niet droeg, is de bewering afgezwakt of als onzeker gemarkeerd in plaats van te laten staan.*

**Score: 12 beweringen gecontroleerd — 5 bevestigd, 6 gecorrigeerd, 1 onzeker.** Zwaartepunt van de fouten: prijzen (te hoog of niet-bestaand) en één materieel verouderde bedrijfsfeit (Sciforma).

### 8.1 Overzicht

| # | Bewering | Oordeel |
|---|---|---|
| 1 | Marktomvang €180–300 mln (afleiding §2.2) | **gecorrigeerd** → €185–240 mln |
| 2 | Bouwspecifiek €60–110 mln; bouw ~11% bbp | **gecorrigeerd** → €60–90 mln; 11% is *investeringen*, niet toegevoegde waarde |
| 3 | Mordor: 9,76 mld → 23,09 mld, CAGR 15,42% | **bevestigd** |
| 4 | P6 Professional ~$2.570 eerste jaar | **gecorrigeerd** → rekenfout; $3.050, en geen officiële lijstprijs |
| 5 | P6 EPPM Cloud $125/gebr/mnd | **onzeker** → Oracle publiceert niets; geciteerde bron zegt iets anders |
| 6 | MS Project Plan 3 ~€28,70–30/gebr/mnd | **gecorrigeerd** → €26,00 HT/gebr/mnd, jaarbetaling |
| 7 | Plan 5-nieuwverkoop stopt 1 mei 2026 | **gecorrigeerd/genuanceerd** → stop aannemelijk, datum onbevestigd |
| 8 | Sciforma = Franse PPM-veteraan, v.a. €10/gebr/mnd | **gecorrigeerd** → in 2025 overgenomen door Planview (VS); prijs "sur demande" |
| 9 | Planisware: 600+ klanten, Euronext, 4× Gartner Leader | **bevestigd** (IPO-jaartal 2024 genuanceerd) |
| 10 | Obat v.a. €25/mnd, Alobees v.a. €50/mnd, Graneet €200–800/mnd | **gecorrigeerd** op alle drie |
| 11 | P6/XER de facto verplicht op Grand Paris/nucleair | **bevestigd als hedge** — geen gepubliceerde regel; niet als "verplicht" verkopen |
| 12 | Powerproject 100.000+ gebruikers, Frans beschikbaar; TILOS actief bij Trimble | **bevestigd** (prijsindicaties blijven onbevestigd) |

### 8.2 Per bewering

**1. Geclaimde marktomvang €180–300 mln/jaar — GECORRIGEERD.**
De redenering in §2.2 is intern inconsistent. Nagerekend: 9,76 mld × 27,5% × 15% = **USD 403 mln**, bij ±1,08 USD/EUR ≈ €370 mln. Het rapport past daar vervolgens "50–65%" op toe, wat **€185–240 mln** oplevert — niet €180–300 mln. De gepubliceerde bovengrens van €300 mln komt neer op **81%** van de basis en is dus niet af te leiden uit de eigen aanname. Gecorrigeerd in §1 en §2.2. Aanvullende kanttekening toegevoegd: de €-omrekening is wisselkoersgevoelig (bij 1,16 USD/EUR wordt de basis €347 mln). *Onderbouwing: eigen herberekening op de brongetallen.* Bron: https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market

**2. Bouwspecifiek €60–110 mln, want "bouw ~11% van het bbp" — GECORRIGEERD.**
Het percentage klopt op één lezing en is misleidend op de andere. FIEC geeft voor Frankrijk 2025 **€334 mld bouwinvesteringen op €2.979 mld bbp = 11,2%** — dus ~11% is correct voor bouw*investeringen/output*. Maar de **bruto toegevoegde waarde** van de bouwsector (de gangbare "aandeel in het bbp"-maat) ligt in de grootteorde 5–6%; wie 11% als bbp-aandeel leest, overschat de sector ruwweg tweevoudig. De definitie is in §2.2 expliciet gemaakt en het afgeleide bedrag is meegeschaald met correctie 1 naar **€60–90 mln**. Bron: https://fiec-statistical-report.eu/france

**3. Mordor-wereldmarktcijfers — BEVESTIGD.**
Letterlijk teruggevonden op de bron: USD 9,76 mld (2025), USD 23,09 mld (2031), CAGR 15,42%, forecast period 2026–2031. Ook intern consistent (9,76 × 1,1542⁶ ≈ 23,1). De tweede raming (Strategic Revenue Insights, 10,92%) is nagerekend op 10,95% — klopt binnen afronding, maar de uitgever is een low-tier rapportverkoper; als indicatie behandeld. Nieuw toegevoegd uit dezelfde bron: Noord-Amerika 36,12% marktaandeel (2025), wat de 27,5%-aanname voor Europa plausibel maakt zonder haar te bewijzen. Bron: https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market

**4. Primavera P6 Professional "~$2.570 eerste jaar ($2.500 + ~$550)" — GECORRIGEERD (rekenfout én bronfout).**
$2.500 + $550 = **$3.050**, niet $2.570. Bovendien: **Oracle publiceert geen prijslijst voor Primavera.** Het officiële prijslijstoverzicht bevat Technology, Fusion, Siebel, JD Edwards, MySQL enz., maar géén Construction & Engineering-lijst; de gezochte `construction-engineering-price-list.pdf` geeft 404. De in het rapport geciteerde Capterra-pagina noemt als startprijs **"$100 per year"** en ondersteunt de genoemde bedragen dus niet. Alle bedragen zijn nu expliciet als niet-officiële derdenschatting gemarkeerd; wel opgemerkt dat $550/$2.500 en $605/$2.750 beide exact 22% zijn (Oracle's gebruikelijke supportpercentage), wat de plausibiliteit ondersteunt zonder te bewijzen. Bronnen: https://www.oracle.com/corporate/pricing/ · https://www.capterra.com/p/145503/Oracle-Primavera/

**5. "P6 EPPM Cloud $125/gebruiker/maand" — ONZEKER.**
Oracle's eigen Primavera Cloud-productpagina toont uitsluitend "Request a demo / Contact us" en geen enkel bedrag. Geen onafhankelijke bevestiging gevonden; de geciteerde bron zegt iets anders (zie 4). Als onbevestigde orde-van-grootte gemarkeerd, niet verwijderd. Zelfde status voor Progress Reporter Cloud $12/gebr/mnd. Bron: https://www.oracle.com/construction-engineering/primavera-cloud-project-management/

**6. "MS Project Plan 3: ~€28,70–30/gebr/mnd" — GECORRIGEERD (te hoog).**
Microsoft Frankrijk noemt op de eigen productpagina **26,00 € HT per gebruiker/maand bij jaarbetaling** ("utilisateur/mois, paiement annuel"). Plan 1 (Planner) staat op **8,70 € HT/gebr/mnd**; de "€28,70" in het rapport lijkt een verhaspeling daarvan. Toegevoegd dat Franse prijzen HT zijn en jaarverplichting veronderstellen — precies het onderscheid waar prijsvergelijkingen misgaan. Bron: https://www.microsoft.com/fr-fr/microsoft-365/planner/project-plan-3

**7. "Microsoft stopt nieuwe verkoop van Planner and Project Plan 5 per 1 mei 2026" — GECORRIGEERD/GENUANCEERD.**
Richting bevestigd, datum niet. Op de Franse Microsoft-site is Plan 5 **niet meer als koopoptie aanwezig**: de plan-vergelijking toont nog uitsluitend Microsoft Planner, Planner (Plan 1) en Planner and Project (Plan 3). Dat ondersteunt het einde van de nieuwverkoop. De specifieke datum 1 mei 2026 kon echter bij Microsoft zelf niet worden bevestigd, en de Microsoft Learn-servicebeschrijving (laatst bijgewerkt 2023) noemt Plan 1/3/5 nog alle drie. Datum als onbevestigd gemarkeerd. Bronnen: https://www.microsoft.com/fr-fr/microsoft-365/planner/project-plan-5 · https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/project-online-service-description

**8. "Sciforma — Franse PPM-veteraan, vanaf €10/gebr/mnd" — GECORRIGEERD (materieel; belangrijkste vondst).**
Twee fouten in één claim.
*(a) Eigendom:* **Planview (Austin, Texas) heeft Sciforma in 2025 overgenomen**; het product heet nu *Planview ProjectAdvantage* (voorheen Sciforma Vantage). Zowel **sciforma.fr/fr als sciforma.com/fr redirecten met HTTP 301 naar planview.com** — de zelfstandige Franse site bestaat niet meer, en de bronlink in het oorspronkelijke rapport is daarmee dood. Sciforma kan dus niet langer worden opgevoerd als bewijs dat Frankrijk twéé eigen PPM-wereldspelers heeft; dat zijn er nog één (Planisware). Dit raakt ook de strategische conclusie in §4.7: de trend is consolidatie richting Amerikaans eigendom, niet Franse softwaresoevereiniteit — aangepast.
*(b) Prijs:* de geciteerde bron draagt de claim niet meer. Appvizer toont voor beide tiers (Moyenne/Grande Entreprise) **"sur demande"**, geen €10/gebr/mnd. Bronnen: https://www.planview.com/acquisitions/about-sciforma/ · https://www.appvizer.fr/operations/ppm/sciforma

**9. Planisware: 600+ blue-chip-klanten, Euronext Paris (IPO 2024), 4× Gartner MQ Leader, HQ Parijs — BEVESTIGD, met één nuance.**
"600+ Blue Chip Customers", HQ Parijs en het badge **"4x Leader in Gartner APMR MQ"** staan letterlijk op de vendorsite; de meest recente is de *2025 Gartner Magic Quadrant for Adaptive Project Management & Reporting* — toegevoegd dat het specifiek de APMR-MQ betreft, niet een generieke Gartner-MQ. Beursnotering onafhankelijk bevestigd: ticker **PLNW**, ISIN **FR001400PFU4**, Euronext Paris, CAC Mid & Small, beurswaarde ca. **€1,40 mld**. *Nuance:* het jaartal 2024 is niet primair bevestigd — de IR-pagina toont registratiedocumenten uit september 2023 (de afgeblazen eerste beursgang), dus "IPO 2024" is aannemelijk maar niet hier bewezen. Bronnen: https://www.boursorama.com/cours/1rPPLNW/ · https://www.planisware.com/ · https://www.planisware.com/investors

**10. BTP-SaaS-prijzen (Obat v.a. €25/mnd, Alobees v.a. €50/mnd, Graneet €200–800/mnd) — ALLE DRIE GECORRIGEERD.**
Gecontroleerd op de tarievenpagina's van de leveranciers zelf in plaats van op vergelijkingsblogs.
- **Obat:** €25/mnd HT geldt **uitsluitend voor niet-btw-plichtige micro-entreprises bij jaarbetaling** (maandelijks €32). Een btw-plichtige artisan of PME — precies de doelgroep die het rapport noemt — betaalt **€39/mnd HT (jaar)** of **€49/mnd HT (maand)**. Wel gunstig: prijs is **per bedrijf, niet per gebruiker**. Bron: https://www.obat.fr/tarifs
- **Alobees:** geen vast maandbedrag maar **€40/mnd HT per bedrijf + €10/mnd HT per gebruiker**. "Vanaf €50" klopt dus alleen bij één gebruiker; bij tien zit je op €140/mnd HT. Ook opgemerkt: de site noemt geen Gantt-weergave, wel ploeg-/werklastplanning. Bron: https://www.alobees.com/tarifs
- **Graneet:** **geen enkel bedrag publiek.** De tiers zijn gedefinieerd op *bedrijfsomzet* (€1–3M / €3–6M / €6–10M / €10–50M / Groupe "sur devis"), niet op gebruikersaantal. De €200–800/mnd is onbevestigd en als zodanig gemarkeerd. Bron: https://www.graneet.com/tarifs

**11. Aanbestedings-/contracteis "P6/XER de facto verplicht op Grand Paris, SNCF en nucleair" — BEVESTIGD ALS HEDGE.**
Het rapport hedgede deze claim al correct ("goed onderbouwde aanname, geen gepubliceerde regel") en die hedge houdt stand: er is **geen gepubliceerde aanbestedingsregel gevonden die P6 of XER voorschrijft**. Wat wél onafhankelijk bevestigd is, is de schaal van het programma: Grand Paris Express omvat **4 nieuwe lijnen (15, 16, 17, 18), 200 km, 68 stations, indienststelling 2026–2031**, plus de in 2024 geopende verlenging van lijn 14 — exact zoals het rapport stelt. Expliciete waarschuwing toegevoegd: de sterkere formulering "P6 is verplicht bij overheidswerk" is **niet houdbaar** en mag niet in klantmateriaal belanden. Bron: https://www.societedesgrandsprojets.fr/grand-paris-express

**12. Powerproject 100.000+ gebruikers en Franstalig; TILOS nog actief bij Trimble — BEVESTIGD.**
Elecosoft claimt zelf "more than 100,000 professionals worldwide" en noemt **Frans expliciet** in de talenlijst (naast EN-AU/UK/US, DA, NL, FI, DE, NO, SV, PL, ES, IT, TR); de drie licentievormen (single user device-gebonden, concurrent server, SaaS) kloppen; er is **geen publieke prijs**, dus de indicatie £1.200–2.000/seat blijft onbevestigd. TILOS wordt **nog steeds actief verkocht en onderhouden door Trimble** — geen end-of-life-melding — en Projet Linéaire is bevestigd als exclusieve Franse distributeur, met referenties SNCF, Bouygues, Eiffage, Vinci Construction, Total, Colas Rail en Egis Rail (aangevuld met Guintoli, Systra, Spiecapag). Ook hier **geen gepubliceerde prijs** bij fabrikant noch distributeur, dus de €4.000–6.000/seat is onbevestigd. Bronnen: https://eleco.com/products/asta/asta-powerproject/ · https://construction.trimble.com/en/products/tilos · https://www.tilosfrance.com/

### 8.3 Overige aantekeningen bij de verificatie

- **Fieldwire "gratis instap" — bevestigd en aangevuld:** Basic $0/gebr/mnd bij max. 5 gebruikers / 3 projecten / 100 sheets; betaald Pro $39, Business $64, Business Plus $89 per gebr/mnd bij jaarbetaling. Bron: https://www.fieldwire.com/pricing/
- **Vacaturevolume P6 — gecorrigeerd naar boven:** het rapport noemt 60–80 (§1) resp. 75+ (§2.3). Een jobboard dat het rapport niet gebruikt, **HelloWork, toont 272 treffers** voor "Primavera P6" in Frankrijk, met Assystem, Capgemini, In Genium en Cowork Engineering als werkgevers. De 272 is een brede trefwoordmatch inclusief duplicaten en is dus geen zuivere telling, maar 60–80 is aantoonbaar de ondergrens. Bron: https://www.hellowork.com/fr-fr/emploi/recherche.html?k=Primavera+P6
- **Planner-salarissen — ondergrens gecorrigeerd:** de opgegeven €40k–55k geldt hooguit voor Île-de-France/nucleair. Actuele advertenties tonen €32.000–40.000 (In Genium, Lyon, nucleair) tot €45.000–55.000 (Cowork Engineering, HVDC). Aangepast naar €32k–55k. Zelfde bron.
- **OPQIBI-code 0302 — onzeker:** dat OPQIBI een OPC-kwalificatie kent is bevestigd (staat in de zoeknomenclatuur), maar het codenummer 0302 kon niet bij OPQIBI zelf worden nagelopen; directe code-URL's geven 404 en de nomenclatuur zit achter een interactieve module. Ook de juridische verankering van de OPC-missie (loi MOP → Code de la commande publique) kon niet via Legifrance worden geverifieerd. Bron: https://www.opqibi.com/
- **Loi Toubon — onzeker in de details:** de reikwijdte (software-UI? technische documentatie? uitzondering voor buitenlandse stukken?) kon niet bij een officiële bron worden nagelezen — Legifrance en travail-emploi.gouv.fr gaven 404/500/bot-blokkade. Als commercieel argument met juridische kleuring gemarkeerd, niet als geverifieerde compliance-eis.
- **Teamoty — status ongewijzigd:** teamoty.com gaf bij hercontrole opnieuw **HTTP 503**. Alle claims over dit pakket blijven onbevestigde vendorinformatie; de bestaande markering in §5 is terecht.
- **Alobees/Sage — signaal, niet bevestigd:** op de tarievenpagina van Alobees staat een regel **"Sage e-chantier Alobees" (€240/jaar per bedrijf bij 1 jaar verbintenis)**, wat op een OEM- of distributieband met Sage wijst. De homepage bevestigt geen Sage-eigendom. Niet in de hoofdtekst verwerkt; als open punt genoteerd voor de volgende ronde.

### 8.4 Methodologische waarschuwing voor hergebruik van dit rapport

Het patroon in de gevonden fouten is systematisch en waarschijnlijk niet tot Frankrijk beperkt: **prijzen zijn overgenomen uit vergelijkingsblogs (Appvizer, Skello, independant.io, ProjectManager.com) in plaats van van de tarievenpagina van de leverancier.** In alle vier de gecontroleerde gevallen (Sciforma, Obat, Graneet, MS Project) week de blogprijs af van de werkelijke prijs, telkens in de richting van "goedkoper en simpeler dan het is" — en in twee gevallen (Graneet, Sciforma) bestaat de genoemde prijs helemaal niet publiek. Twee terugkerende valkuilen: (i) **instapprijzen gelden vaak voor een randgeval** (niet-btw-plichtige micro-entreprise, één gebruiker, jaarbetaling) en niet voor de genoemde doelgroep; (ii) **per bedrijf ≠ per gebruiker** — Obat en Graneet rekenen per bedrijf, Alobees mengt beide, Microsoft en Fieldwire rekenen per gebruiker. Wie de tabel in §3.3 gebruikt voor concurrentiepositionering, moet elke regel opnieuw bij de bron nalopen. Daarnaast: één bedrijfsfeit was ruim een jaar verouderd (Sciforma/Planview) — controleer bij elke genoemde leverancier of de vendorsite nog bestaat en niet redirect.
