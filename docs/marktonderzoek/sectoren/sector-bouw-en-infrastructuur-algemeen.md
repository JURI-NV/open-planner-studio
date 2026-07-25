# Sectorrapport: Bouw en infrastructuur (algemeen)

**Marktonderzoek planningssoftware — sectorale deelmarkt**
Onderzoeksdatum: 25 juli 2026
Scope: aannemers (hoofd- en onder-), opdrachtgevers (publiek en privaat), ingenieurs- en adviesbureaus. Kernpakketten: Oracle Primavera P6, Microsoft Project, Elecosoft/Eleco Asta Powerproject, Bentley SYNCHRO, ALICE Technologies — plus de omringende laag (Deltek, InEight, Safran, Touchplan, Planera, ScheduleReader).

> **Leeswijzer bij betrouwbaarheid.** Elk cijfer heeft een bron-URL. Cijfers die ik zelf heb afgeleid of geschat staan expliciet gemarkeerd met **[SCHATTING]**. Cijfers uit secundaire blogs/marketingpagina's die ik niet bij de primaire bron kon verifiëren staan gemarkeerd met **[ONBEVESTIGD]**. De hardste cijfers in dit rapport komen uit openbare aanbestedingsdocumenten (UK G-Cloud 14 prijslijsten) en uit een FHWA-goedgekeurde staatsspecificatie — die zijn contractueel bindend en dus betrouwbaarder dan vendor-marketing.

---

## 1. Wat deze sector bijzonder maakt qua planning

### 1.1 Schaal en doorlooptijd

De bouw is qua absolute omvang de grootste bedrijfstak ter wereld. De wereldwijde bouwproductie bedroeg **US$ 10,7 biljoen in 2020**, met een prognose naar **US$ 13,3 biljoen in 2025** en **US$ 15,2 biljoen in 2030** — een groei van 42% (US$ 4,5 biljoen) over het decennium, met gemiddeld 3,6% per jaar, hoger dan industrie of dienstverlening ([Oxford Economics / Marsh McLennan, Future of Construction](https://www.oxfordeconomics.com/resource/future-of-construction/)).

Wat planning hier anders maakt dan in vrijwel elke andere sector:

- **Projectduur van 2 tot 15 jaar.** Een planning is geen sprintbord maar een juridisch document dat een decennium meegaat en tientallen keren wordt geactualiseerd.
- **Activiteitenaantallen in de tienduizenden.** InEight noemt een klantcase (Pattern Energy, Amerikaans schoon-energieproject) met **ruim 80.000 activiteiten** in één planning ([InEight Schedule](https://ineight.com/products/ineight-schedule/)). Dat is de bovenkant, maar 5.000–20.000 activiteiten is normaal voor een groot infraproject.
- **Meerdere planningsniveaus tegelijk.** Level 1 (mijlpalen voor de directie), Level 2/3 (contractueel CPM-netwerk), Level 4/5 (werkvoorbereiding, look-ahead van 4–6 weken). De SCDOT-specificatie codificeert dit expliciet als "Level 1 – Minimal Schedule" versus "Level 2 – Standard Critical Path Method (CPM) Schedule" ([SCDOT Supplemental Specification "Construction Schedules", 1 januari 2026, FHWA-approved](https://www.scdot.org/content/dam/scdot-legacy/business/technicalpdfs/supspecs/Construction%20Schedules%20Supplemental%20Specification%20(01-26)%20FHWA%20approved.pdf)).
- **Meerdere partijen delen één netwerk.** De hoofdaannemer bezit de planning, maar tientallen onderaannemers, de opdrachtgever, de directievoerder en de financiers lezen en betwisten haar.

### 1.2 Resourcecomplexiteit

Bouwplanning is niet alleen tijd maar tijd × ruimte × materieel × arbeid × geld × weer:

- **Kalendercomplexiteit is een first-class probleem.** De SCDOT-spec eist projectspecifieke kalenders met alle feestdagen en contractuele beperkingen, plus **verplicht een 7-daagse kalender voor uithardingsperioden en zettings-/voorbelastingsperioden** — die lopen immers door in het weekend. Reguliere werkactiviteiten draaien op een 5-daagse kalender. Eén planning bevat dus routinematig 5, 6 of 10 verschillende kalenders naast elkaar ([SCDOT, sectie III.D.11–13](https://www.scdot.org/content/dam/scdot-legacy/business/technicalpdfs/supspecs/Construction%20Schedules%20Supplemental%20Specification%20(01-26)%20FHWA%20approved.pdf)).
  Dit is precies waar Microsoft Project structureel struikelt: MSP gebruikt "a single duration factor for all calendars", wat compatibiliteitsproblemen geeft bij multi-kalenderprojecten, terwijl P6 per kalender een eigen duration factor kent ([Eastwood Harris, Comparison of Microsoft Project, Oracle Primavera P6 and Elecosoft Asta Powerproject](https://eastwoodharris.com/comparison-of-microsoft-project-oracle-primavera-p6-and-elecosoft-asta-powerproject/)).
- **Weer als planbare variabele.** De SCDOT-spec eist dat activiteitsduren "normally anticipated amounts of inclement weather days" bevatten — het weer moet dus in de duur zitten, niet als aparte buffer.
- **Kostenbelading (cost loading) is verplicht, niet optioneel.** SCDOT: "Cost load the schedule with sufficient information (…) to provide for monetary and quantitative tracking of the work by the SCDOT." De planning is daarmee tegelijk het termijnstaat-instrument.
- **Ruimtelijke conflicten.** Twee ploegen kunnen niet tegelijk in dezelfde bouwlaag/sectie werken. Dat is een constraint die CPM niet natuurlijk uitdrukt — vandaar het bestaan van 4D (SYNCHRO, Navisworks), taktplanning en locatiegebaseerde planning (Tilos, Vico).

### 1.3 Contractuele eisen: de planning ís het contract

Dit is het unieke kenmerk van deze sector. In vrijwel geen andere bedrijfstak is het planningsbestand zelf een contractueel deliverable met eigen betalingsregime en sancties.

Concreet, uit de SCDOT-specificatie (bindend voor alle SCDOT-contracten vanaf 1-1-2026):

| Element | Contractuele eis |
|---|---|
| Software | "Maintain CPM schedules using a currently supported version of **Oracle's Primavera P6**. Coordinate into the Oracle Primavera version used by SCDOT." |
| Leveringsformaat | "Upload each CPM schedule submission to the SCDOT Construction Extranet site in **.xer format**" — plus PDF-uitdraaien geformatteerd op 11×17 inch landscape |
| Templates | SCDOT levert templates voor eigen pay items en kalenders |
| Betaalpost | Pay item **1080300 CPM PROGRESS SCHEDULE, eenheid LS (lump sum)** — 60% bij acceptatie baseline, 40% bij acceptatie as-built |
| Sanctie Level 1 | "Failure to submit the look-ahead schedule as specified may result in the **withholding of partial payment estimates**" |
| Sanctie Level 2 | Getrapte handhaving via SVI (Schedule Variance Index): monitoring → Preliminary Notice of Delinquency → PND met bonding notice → Recovery Schedule → **Notice of Default** |

Bron: [SCDOT Construction Schedules Supplemental Specification (01-26), FHWA approved](https://www.scdot.org/content/dam/scdot-legacy/business/technicalpdfs/supspecs/Construction%20Schedules%20Supplemental%20Specification%20(01-26)%20FHWA%20approved.pdf)

Dat een Amerikaanse staat in een FHWA-goedgekeurde specificatie letterlijk één commercieel product bij naam noemt (Oracle Primavera P6) en één proprietary bestandsformaat (.xer) verplicht stelt, is de meest concrete vorm van vendor lock-in die in deze markt bestaat — en tegelijk de scherpste omschrijving van de toegangsbarrière voor elk alternatief.

Vergelijkbaar aan Europese/Britse kant: Oracle verkoopt een **aparte NEC4-variant** van Primavera Unifier (£180/gebruiker/maand tegen £132 voor de standaardversie — 36% opslag alleen voor NEC4-contractlogica), wat aantoont dat contractstandaarden hier een eigen productlijn rechtvaardigen ([Oracle Primavera Pricing, G-Cloud 14, doc. BD.G14.OCS.002, mei 2024](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf)). Elecosoft biedt op zijn beurt een aparte cursus "Using Asta Powerproject within NEC Contracts" à £500 per deelnemer ([Elecosoft G-Cloud 14 pricing, mei 2024](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/93278/159955281882828-pricing-document-2024-05-07-1230.pdf)).

### 1.4 Float-eigendom: een juridisch concept dat in de software moet zitten

De SCDOT-spec bepaalt: *"The project owns the float and thus, float is not for the exclusive use or benefit of either SCDOT or the Contractor. Negative float in the original Baseline Schedule and Revised Baseline Schedules is not allowed. **Float suppression or sequestration is not allowed.**"* Verboden praktijken worden expliciet opgesomd: zinloze logische relaties, buitensporig lange duren, buitensporige lags, niet-contractuele constraints.

Dit betekent dat de planningstool niet alleen moet kunnen rekenen, maar de rekenwijze **auditeerbaar** moet maken. Een opdrachtgever moet kunnen aantonen dat de aannemer speling verstopt. Dat is een compleet andere ontwerpeis dan "snel een Gantt maken".

### 1.5 Kosten van vertraging

Dit is de economische motor onder de hele betalingsbereidheid in deze sector.

- Een McKinsey-review van **meer dan 300 projecten met een contractwaarde boven US$ 1 miljard** vond gemiddelde kostenoverschrijdingen van circa **80%** en schemavertragingen van circa **50%** ([OpenSpace, Construction project delay statistics](https://www.openspace.ai/blog/construction-project-delay-statistics/)).
- **98%** van de projecten kent kostenoverschrijding, vertraging of beide (McKinsey, via dezelfde bron).
- Slechts **25%** van de projecten wordt opgeleverd binnen 10% van de oorspronkelijke deadline (KPMG, via dezelfde bron).
- **75%** van de bouwprojecten loopt vertraging op (ScienceDirect, via dezelfde bron).
- Eén jaar vertraging correleert gemiddeld met **+4,64%** kostenoverschrijding ([ScienceDirect, energie-infrastructuurprojecten](https://www.sciencedirect.com/science/article/abs/pii/S2214629625001380)).
- Rekenvoorbeeld dagkosten: een project van US$ 50 miljoen over drie jaar komt neer op ongeveer **US$ 45.662 contractwaarde per dag**; 30% vertraging benadert US$ 15 miljoen aan kosten (Deltek, via OpenSpace). Voor een datacenter van 100 MW à US$ 950 miljoen over drie jaar is dat ruim **US$ 850.000 per dag** ([Foresight, The True Cost of Delays at Scale](https://www.foresight.works/blog/the-true-cost-of-delays-at-scale)).
- ALICE Technologies claimt met generatieve planning **tot 17% kortere bouwduur, tot 14% lagere arbeidskosten en 12% lagere materieelkosten** ([ALICE pricing/FAQ](https://www.alicetechnologies.com/pricing)) — vendor-claim, dus richtinggevend, niet bewezen.
- BIM-adoptie reduceert projecttijd met **tot 7%** (ASCE Library, via OpenSpace).

**Waarom dit ertoe doet voor softwarebudgetten:** bij US$ 45.000–850.000 vertragingskosten per dag is een licentie van US$ 2.500 per planner per jaar economisch irrelevant. Eén vermeden dag betaalt de hele planningsafdeling. Dat verklaart de hoge betalingsbereidheid (§3) — én het gebrek aan prijsdruk waardoor P6 al jaren nauwelijks in prijs beweegt.

---

## 2. Welke planningssoftware daadwerkelijk wordt gebruikt — rangorde en gebruikersgroepen

### 2.1 Rangorde (gewogen naar contractuele zwaarte, niet naar aantal installaties)

**Tier 1 — de contractuele standaard**

**1. Oracle Primavera P6 (EPPM en Professional).** De facto standaard voor grote commerciële bouw en infrastructuur wereldwijd. Oracle positioneert het zelf als *"The Standard for Planning and Scheduling"* en als *"the industry's only solution that combines CPM contract scheduling and task management in a single cloud environment"*, met genoemde klanten ITER, Assystem, Clayco en Swinerton ([Oracle Primavera P6](https://www.oracle.com/industries/construction-engineering/primavera-p6/)). Eastwood Harris plaatst P6 bij "large commercial buildings", "medium and large civil construction" en "almost all resource companies in the mining, oil and gas industries", met als kernargument dat P6 *"forces schedulers to update a schedule properly"* ([Eastwood Harris](https://eastwoodharris.com/comparison-of-microsoft-project-oracle-primavera-p6-and-elecosoft-asta-powerproject/)).

P6's positie is niet primair technisch maar **contractueel afgedwongen**: USACE, NAVFAC en talrijke state DOT's schrijven het voor (§5).

**2. Microsoft Project.** Volumekampioen, maar in de zwaarste contractuele segmenten tweede keus. Eastwood Harris: MSP leidt bij "residential builders, Architects and Quantity Surveyors" en "smaller civil construction companies", vooral door bekendheid en gemak. Het claimniveau van "Microsoft Project handles 80% of commercial construction scheduling" **[ONBEVESTIGD]** komt uit een blogvergelijking ([constructionbids.ai](https://constructionbids.ai/blog/oracle-primavera-alternative-construction)) en heb ik niet bij een analistenbron kunnen verifiëren; behandel het als indicatie van perceptie, niet als meetwaarde.

**3. Elecosoft / Eleco Asta Powerproject.** Regionale zwaargewicht: dominant in het Verenigd Koninkrijk, Ierland, en sterk in Duitsland, Scandinavië en de Benelux. Asta Powerproject wordt gebruikt door **meer dan 100.000 professionals wereldwijd** ([Elecosoft](https://elecosoft.com/us/products/asta/asta-powerproject/features/)) en won in FY2025 voor het **twaalfde opeenvolgende jaar** "Project Management Software of the Year" bij de UK Construction Computing Awards ([Eleco plc, Final Results FY2025](https://ir.eleco.com/regulatory/final-results-8/)). De claim "73% of UK infrastructure contractors use Asta Powerproject as their primary scheduling tool" **[ONBEVESTIGD]** komt eveneens van constructionbids.ai en is niet onafhankelijk te staven.

Eleco's geografische omzetverdeling FY2025 bevestigt de regionale concentratie: **UK £18,4 mln (47%), overig Europa £7,7 mln (20%), Scandinavië £6,9 mln (18%), Duitsland £3,3 mln (8%), VS £1,5 mln (4%)** op een totaal van £38,8 mln ([Eleco plc FY2025](https://ir.eleco.com/regulatory/final-results-8/)). De VS-positie is dus verwaarloosbaar — daar regeert P6.

**Tier 2 — de laag bovenop de planning**

**4. Bentley SYNCHRO (4D/5D).** Geen CPM-vervanger maar een 4D-schil. Bentley zegt letterlijk: *"Create a schedule, or integrate with third-party scheduling software, (such as P6, Asta Powerproject, etc.)"* ([Bentley SYNCHRO](https://www.bentley.com/software/synchro/)). Productlijn: SYNCHRO 4D (desktop authoring), SYNCHRO Perform (web/mobiel), SYNCHRO Field. Genoemde referenties: Laing O'Rourke (Surrey Hills level crossing — *"4D model enabled the team to develop construction staging plans 71,5% faster"*), ACCIONA, Clark Construction Group, en Sacramento Regional County Sanitation (*"Digital Twin Saves USD 400 Million"*).

**5. Deltek Acumen Fuse / Open Plan.** De schedulekwaliteits- en DCMA-laag. Deltek positioneert Acumen Fuse expliciet als de tool met ingebouwde DCMA-metrieken en Open Plan als DCMA-conforme scheduler ([Deltek, DCMA 14-Point Assessment](https://www.deltek.com/en/project-and-portfolio-management/project-scheduling/dcma-14-point-assessment)).

**6. ALICE Technologies.** Generatieve/optimaliserende planning. Geen publieke prijs; gericht op *"GCs and owners in the infrastructure, industrial, and commercial sectors"* die het inzetten op *"projects with a construction value of at least $75M"* ([ALICE pricing](https://www.alicetechnologies.com/pricing)). Dit is een bewuste keuze voor de allergrootste projecten — bij kleinere projecten loont de optimalisatie de licentie niet.

**7. InEight Schedule.** Owner-/capital-projects-hoek. Positioneert zich expliciet tégen P6: *"more connected and accessible approach"* versus *"complex, disconnected scheduling tools"*, gericht op transport, power & renewables, nucleair, water, olie/gas/chemie en mijnbouw ([InEight Schedule](https://ineight.com/products/ineight-schedule/)).

**Tier 3 — lean/pull planning en nieuwe generatie**

**8. Touchplan, Nialli, Hoylu, vPlanner.** Last Planner System / pull planning. Belangrijke nuance uit een concurrentanalyse: Touchplan is *"not a CPM scheduling platform"*, Nialli *"lacks logic-driven dependencies"*, Hoylu heeft *"no CPM engine, requires separate master schedule"* ([Planera, Primavera P6 alternatives](https://www.planera.io/post/primavera-p6-alternatives)). Deze tools leven naast, niet in plaats van, het CPM-netwerk.

**9. Planera, Outbuild, Nodes & Links, SmartPM, Foresight.** De nieuwe generatie: cloud-native CPM, schedule-analytics en AI. Planera hanteert volume-gebaseerde prijzen met onbeperkt aantal gebruikers per project — een expliciete aanval op het per-seat-model van P6.

**10. Phoenix Project Manager.** Traditionele CPM voor kleinere aannemers; *"no cloud collaboration, siloed workflows"* (Planera).

**11. Trimble Tilos.** Lineaire/locatiegebaseerde planning voor wegen, spoor en pijpleidingen — een niche die CPM-Gantt structureel niet dekt (de tijd-afstand-diagram).

**12. ScheduleReader.** Geen planner maar een symptoom: een compleet product dat alleen bestaat om **.xer- en P6-XML-bestanden leesbaar te maken voor mensen zonder P6-licentie**, vanaf **US$ 344 per jaar** ([ScheduleReader](https://schedulereader.com/)). Genoemde klanten: Airbus, Siemens, Maersk Oil, Sandia National Laboratories. Het bestaansrecht van deze productcategorie is het scherpste bewijs van de interoperabiliteitspijn in deze sector (§7).

### 2.2 Wie gebruikt wat

| Rol | Primair pakket | Secundair | Waarom |
|---|---|---|---|
| **Publieke opdrachtgever (DOT, USACE, NAVFAC, Rijkswaterstaat-achtige diensten)** | P6 (voorgeschreven), Primavera Unifier / Oracle Primavera Cloud | Deltek Acumen Fuse voor review; ScheduleReader voor niet-planners | Uniformiteit over honderden contracten; auditeerbaarheid; XER als archiefformaat |
| **Private opdrachtgever / ontwikkelaar** | Oracle Primavera Cloud, InEight, Unifier | MSP bij kleinere portefeuilles | Portefeuille- en kapitaalplanning belangrijker dan diepe CPM |
| **Hoofdaannemer (groot, ENR-top / Europese top)** | P6 (VS, MEA, APAC) of Asta Powerproject (UK/IE/DE/NL/SE) | SYNCHRO/Navisworks voor 4D; Touchplan voor lean; Acumen voor kwaliteit | Contractuele leveringsplicht + eigen productieplanning |
| **Hoofdaannemer (midden)** | Asta Powerproject of MS Project | Excel | Kosten van P6-implementatie niet te dragen; Planera noemt expliciet *"limited support for mid-size GC workflows"* als P6-tekort |
| **Onderaannemer / specialist** | MS Project, Excel, of alleen lezen (ScheduleReader/PDF) | Outbuild, Buildertrend | Levert data ín het netwerk van de hoofdaannemer maar bezit het niet |
| **Ingenieurs-/adviesbureau** | P6 (voor opdrachtgeverstoetsing en forensische analyse), MS Project (eigen ontwerpplanning) | Acumen Fuse, Safran/Primavera Risk voor QSRA | Toetsende rol; claimanalyse |
| **Claim-/forensisch expert** | P6 + Acumen Fuse + eigen Excel/Access-analyse | Historische P3/Suretrak-bestanden | Moet as-built netwerken reconstrueren uit maandelijkse XER-updates |

### 2.3 Marktconcentratie

De vijf grootste leveranciers in construction management software — **Oracle, Autodesk, Procore, Trimble en Bentley Systems — hielden samen circa 45% van de omzet in 2025**, wat volgens de analist ruimte laat voor nichespelers ([Mordor Intelligence, Construction Management Software Market](https://www.mordorintelligence.com/industry-reports/construction-management-software-market)). Voor het smallere *scheduling*-segment ligt de concentratie hoger, omdat Oracle daar dominant is en Autodesk/Procore/Trimble er nauwelijks diepe CPM leveren.

---

## 3. Wat ervoor betaald wordt

### 3.1 Harde licentieprijzen uit openbare aanbestedingsdocumenten

Dit is de betrouwbaarste prijsdata die publiek beschikbaar is: de UK **G-Cloud 14**-prijsbladen zijn juridisch bindende raamovereenkomstprijzen voor de Britse publieke sector.

#### Oracle — direct (doc. BD.G14.OCS.002, mei 2024)
Bron: [Oracle Primavera Pricing G-Cloud 14](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf)

| Product | Prijs per Hosted Named User | Minimum | Jaarbedrag p.p. |
|---|---|---|---|
| **Primavera P6 EPPM Cloud Service** | **£220 / maand** | **25 gebruikers** | **£2.640** |
| P6 Progress Reporter | £24 / maand | geen | £288 |
| P6 EPPM Web Services | £36 / maand | geen | £432 |
| **P6 EPPM UK Government Cloud** | **£439 / maand** | **50 gebruikers** | **£5.268** |
| Oracle Primavera **Schedule** Cloud (OPC) | £96 / maand | 5 | £1.152 |
| OPC Task Management | £44 / maand | 5 | £528 |
| OPC Progress | £10 / maand | 5 | £120 |
| OPC Portfolio & Capital Planning | £176 / maand | 5 | £2.112 |
| Primavera Unifier Project Controls | £132 / maand | 25 | £1.584 |
| **Unifier Project Controls mét NEC4** | **£180 / maand** | 25 | £2.160 |
| Unifier Essentials for Building Owners | £80 / maand | 25 | £960 |
| Unifier Earned Value Management (add-on) | £44 / maand | 5 | £528 |
| Unifier Portal User | £2 / maand | 100 | £24 |
| Unifier Team for External Collaborators | £44 / maand | 10 | £528 |
| — idem mét NEC4 | £56 / maand | 10 | £672 |
| Oracle Aconex Enterprise | £46 / maand | 5 | £552 |
| Construction Intelligence Cloud Analytics | £40 / maand | 10 | £480 |
| Construction Intelligence — per databron (P6, Unifier, Aconex, OPC) | **£799 / maand per bron** | — | £9.588 |
| Extra non-productieomgeving | £3.954 / maand | — | £47.448 |

Volumekortingen (alle producten): 101–200 gebruikers −10%, 201–500 −15%, 501–1.000 −20%, 1.001+ −25%.

**Instapdrempels — het cijfer dat het meest zegt over deze markt:**
- P6 EPPM Cloud minimum = 25 × £220 × 12 = **£66.000 per jaar** voordat je één regel planning hebt getekend. **[SCHATTING op basis van de gepubliceerde minima — eigen berekening]**
- P6 EPPM UK Government Cloud minimum = 50 × £439 × 12 = **£263.400 per jaar**. **[SCHATTING, eigen berekening]**

#### Oracle — via reseller th3rdcurve (G-Cloud 14, ingangsdatum 30 april 2024)
Bron: [Oracle Primavera – Pricing document, th3rdcurve Ltd](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/710699/219564152717676-pricing-document-2024-05-03-1330.pdf)

| Product | Min. aantal | Jaarprijs per licentie |
|---|---|---|
| OPC Schedule (incl. Progress & Task Management) | 5 | **£950** |
| OPC add-ons (Capital Planning, Cost Controls, Facility Mgmt, Project Delivery Mgmt, Real Estate Mgmt) | 1 | £7.549 elk |
| **P6 EPPM (incl. Progress Reporter & Data Access)** | 1 | **£358** |
| P6 EPPM | 25 | **£2.185** |
| Primavera Analytics (add-on) | 25 | £795 |
| Virtual Desktop (hosted omgeving) | 1 | £9.932 |
| Extra non-productieomgeving | 1 | **£39.332** |
| Extra 50 GB databaseopslag | 1 | £1.192 |
| Primavera Unifier Facilities & Asset Mgmt (incl. EVM) | 25 | £1.311 |

Plus **10% extra korting bij minimaal 100 licenties per product**.

> Let op de opvallende inconsistentie: dezelfde reseller noteert P6 EPPM op £358/jaar bij minimum 1 licentie én £2.185/jaar bij minimum 25. Dat suggereert twee verschillende SKU's/rechten onder dezelfde naam. In de praktijk is de onderhandelde prijs sterk klantafhankelijk — dat is zelf een bevinding: **de prijs van P6 is niet transparant, zelfs niet binnen één publiek raamcontract.**

#### Elecosoft Asta Powerproject (G-Cloud 14, mei 2024)
Bron: [Asta Powerproject SaaS Pricing Document for G-Cloud 14](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/93278/159955281882828-pricing-document-2024-05-07-1230.pdf)

| Post | Prijs (excl. BTW) |
|---|---|
| **12 maanden Asta Powerproject SaaS-abonnement** | **£1.113 per gebruiker, vooruit te betalen** — incl. 1 GB online opslag, poolbaar binnen de organisatie |
| Openbare training: 2-daagse "Introduction to Asta Powerproject" | **£950 per persoon** |
| 1-daagse modules: Cost & Resource Planning / Progress Reporting / **Asta Powerproject binnen NEC Contracts** | **£500 per deelnemer** |
| Dedicated training op locatie of privé-online (max. 8 deelnemers) | vanaf **£360 per dag per persoon** + reis/verblijf |
| Professional Services (templates, integratie met ERP/calculatie/CRM, dashboardrapportage) | **vanaf £1.430 per dag**, time & materials |

Capterra UK noteert een instapprijs van **US$ 1.675 per gebruiker** met gratis proefversie, en licentievormen: standalone, concurrent én add-ons (4D BIM, Vision-dashboards, Connect) ([Capterra UK, Asta Powerproject](https://www.capterra.co.uk/software/173782/powerproject)).

#### Microsoft Project (officiële Microsoft-prijzen)
Bron: [Microsoft, Compare project management software](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)

| Product | Prijs |
|---|---|
| Project Professional 2024 (eenmalige aankoop) | **US$ 1.129,99** |
| Project Standard 2024 (eenmalige aankoop) | **US$ 679,99** |
| Project Server Subscription Edition | prijs op aanvraag via partner |

De cloudplannen (Plan 1 US$ 10, Plan 3 US$ 30, Plan 5 US$ 55 per gebruiker per maand) worden genoemd door derden **[ONBEVESTIGD op de door mij opgehaalde Microsoft-vergelijkingspagina]** ([constructionbids.ai](https://constructionbids.ai/blog/oracle-primavera-alternative-construction)).

#### Overige pakketten

| Product | Prijs | Bron / status |
|---|---|---|
| ALICE Technologies | Geen publieke prijs; custom quote. Onbeperkt aantal gebruikers en opslag inbegrepen. Minimum projectomvang **US$ 75 mln bouwwaarde** | [ALICE pricing](https://www.alicetechnologies.com/pricing) |
| ALICE, indicatief bedrag | **US$ 50.000–150.000 per jaar** afhankelijk van projectvolume | **[ONBEVESTIGD]** — secundaire bron, geciteerd via zoekresultaat aibuildingtools.com |
| Bentley SYNCHRO | Geen publieke prijs; "consumption-based pricing model updated on a quarterly basis"; reseller noemt US$ 1.900/jaar | **[ONBEVESTIGD]**, [Bentley SYNCHRO](https://www.bentley.com/software/synchro/) noemt zelf geen prijs |
| ScheduleReader | **vanaf US$ 344 per jaar** (Standard/PRO/Mac/Online) | [ScheduleReader](https://schedulereader.com/) |
| P6 Professional on-prem | US$ 2.150 / gebruiker / jaar | **[ONBEVESTIGD]**, [constructionbids.ai](https://constructionbids.ai/blog/oracle-primavera-alternative-construction) |
| P6 EPPM cloud | US$ 3.000–5.000 / gebruiker / jaar afhankelijk van modules | **[ONBEVESTIGD]**, idem |
| Asta Powerproject | US$ 1.200–1.800 / gebruiker / jaar | **[ONBEVESTIGD]**, idem |
| Phoenix Project Manager | US$ 1.500–2.400 / gebruiker / jaar | **[ONBEVESTIGD]**, idem |

### 3.2 Implementatie-, training- en dienstenkosten

Dit is waar het écht duur wordt, en het is structureel groter dan de licentie.

| Post | Bedrag | Bron |
|---|---|---|
| Asta Powerproject basistraining (2 dagen) | £950 p.p. | [Elecosoft G-Cloud 14](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/93278/159955281882828-pricing-document-2024-05-07-1230.pdf) |
| Asta specialistische module (1 dag, o.a. NEC) | £500 p.p. | idem |
| Asta professional services | vanaf £1.430 per dag | idem |
| Oracle-implementatieconsulting | US$ 5.000–15.000 | **[ONBEVESTIGD]**, constructionbids.ai |
| Oracle University-training | US$ 2.000–8.000 per planner | **[ONBEVESTIGD]**, constructionbids.ai |
| Onafhankelijke planningsconsultant (dagtarief) | **US$ 800–2.500 per dag**; uurtarief US$ 100–200 | [Highspire, Construction Management Consulting Fees](https://www.highspire.com/construction-management-consulting-fees/) |
| Vaste planner (VS), gemiddeld | **US$ 43,70/uur ofwel US$ 90.889 per jaar** (jan. 2026) | [ZipRecruiter, Construction Scheduler Salary](https://www.ziprecruiter.com/Salaries/Construction-Scheduler-Salary) |
| Planner/Scheduler I – Construction (VS), instapniveau | US$ 34/uur ≈ US$ 70.767 per jaar (juli 2026) | [Salary.com](https://www.salary.com/research/salary/benchmark/planner-scheduler-i-construction-salary) |

**Kernverhouding [SCHATTING, eigen afleiding]:** de jaarlijkse licentiekosten van een planner (£1.100–£2.700) bedragen circa **1,5% tot 4%** van diens volledig belaste jaarkosten (US$ 90.889 salaris + circa 30% werkgeverslasten ≈ US$ 118.000 ≈ £93.000). De software is dus economisch een afrondingsfout ten opzichte van de mens die haar bedient. Dit is de belangrijkste verklaring voor de prijselasticiteit in deze markt: **prijs is bijna nooit de reden om van pakket te wisselen; wél de reden om planners géén licentie te geven** — wat de vraag naar goedkope viewers (ScheduleReader) verklaart.

### 3.3 Typische contractwaarden

**[SCHATTING, eigen berekening op basis van de bovenstaande gepubliceerde tarieven]:**

| Organisatietype | Aantal planningsseats | Jaarlijkse softwarecontractwaarde |
|---|---|---|
| Onderaannemer / klein bureau | 1–3 | £0–4.000 (vaak alleen MSP of Excel) |
| Middelgrote aannemer (regionaal) | 5–15 | £6.000–40.000 (Asta of MSP) |
| Grote hoofdaannemer, nationaal | 25–100 | £60.000–270.000 (P6 EPPM of Asta enterprise) |
| Grote hoofdaannemer, internationaal (ENR-top 50) | 200–800 | £400.000–1.800.000, incl. 15–20% volumekorting |
| Publieke opdrachtgever / DOT | 50–300 (Government Cloud) | £260.000–1.600.000 |
| + 4D-laag (SYNCHRO/ALICE) op megaproject | projectlicentie | £40.000–120.000 per project **[ONBEVESTIGD, afgeleid van de ALICE-indicatie]** |
| + Analytics-databronnen (Oracle CIC) | per bron | £9.588 per jaar per gekoppelde bron |

### 3.4 Betalingsbereidheid: **hoog**, maar asymmetrisch

**Hoog, en om vijf redenen:**

1. **De asymmetrie tussen licentiekosten en vertragingskosten is extreem.** Zie §1.5: US$ 45.000–850.000 per dag vertraging tegenover circa US$ 3.000 per planner per jaar aan software. De ROI-som is triviaal.
2. **De software is contractueel verplicht.** Bij SCDOT, USACE en NAVFAC is P6 geen keuze maar een aanbestedingsvoorwaarde. Er is geen substituut waar de aannemer op kan uitwijken; de prijselasticiteit is daarmee vrijwel nul.
3. **De software is betaalbaar gesteld als pay item.** SCDOT betaalt de CPM Progress Schedule als aparte lump-sum-post (60/40 bij baseline/as-built). De opdrachtgever financiert de planning dus expliciet.
4. **Het is een claimverdedigingsinstrument.** De maandelijkse XER-updates zijn het bewijsmateriaal in een latere delay claim die tientallen miljoenen waard kan zijn. Slechte planningsdata kost letterlijk de zaak.
5. **Switchkosten zijn hoog en zichtbaar.** Herbouwen van templates, hertrainen van planners, hercertificeren van processen, en verlies van historische baselines. Planera noemt P6-implementaties met "months-long implementation timelines".

**Maar de betalingsbereidheid is asymmetrisch verdeeld — en dáár zitten de gaten:**

- **Diep, niet breed.** Organisaties betalen graag £2.640 per jaar voor 25 kernplanners, maar weigeren £2.640 × 400 voor iedereen die de planning moet lézen. Vandaar dat ScheduleReader een levensvatbaar bedrijf is op US$ 344 per jaar, en dat Oracle een "Portal User" op **£2 per maand** in de prijslijst heeft staan — een prijs die uitsluitend bestaat om het leesprobleem af te vangen.
- **Bij de opdrachtgever hoger dan bij de aannemer.** Opdrachtgevers dragen het portefeuillerisico en hebben publieke verantwoordingsplicht; aannemers zien planning vaak als overhead.
- **Bij de midden-aannemer laag.** Planera identificeert dit expliciet als P6-tekort: *"High cost for smaller teams"*, *"user-based pricing model"*, *"limited support for mid-size GC workflows"* ([Planera](https://www.planera.io/post/primavera-p6-alternatives)). Dit segment werkt op Excel of MSP omdat het P6-instapniveau van £66.000 per jaar economisch onverdedigbaar is.
- **Bij de onderaannemer vrijwel nul.** Deze levert data in maar bezit geen licentie. Structureel de zwakste schakel in de datastroom.

---

## 4. Segmentomvang: schatting met expliciete redenering

### 4.1 De analistencijfers (drie onafhankelijke bronnen, drie definities)

| Bron | Definitie | Waarde | Prognose | CAGR |
|---|---|---|---|---|
| [The Business Research Company / Research and Markets, okt. 2025](https://www.globenewswire.com/news-release/2025/10/22/3170911/28124/en/Construction-Schedule-Software-Market-Report-2025-Digital-Tools-Drive-Rapid-Growth-Reaching-US-2-09-Billion-by-2029.html) | Construction **schedule** software | US$ 1,31 mrd (2024) → **US$ 1,44 mrd (2025)** | US$ 2,09 mrd (2029) | 10,1% (24→25); 9,8% (25→29) |
| [WiseGuy Reports](https://www.wiseguyreports.com/reports/construction-scheduling-software-market) | Construction **scheduling** software | US$ 2.307,4 mln (2024) → **US$ 2.452,7 mln (2025)** | US$ 4.500 mln (2035) | 6,3% (2026–2035) |
| [Eleco plc FY2025-jaarverslag, citerend "independent research"](https://ir.eleco.com/regulatory/final-results-8/) | Construction **project management** software | **≈ US$ 1,9 mrd** wereldwijd | — | "high single to mid double-digit rates annually" |

De drie definities convergeren opvallend goed rond **US$ 1,4–2,5 mrd voor 2025**, met een middenwaarde rond **US$ 1,9 mrd** — precies het getal dat Eleco (een beursgenoteerde speler die het echt moet weten) in zijn jaarverslag noemt.

WiseGuy's regionale verdeling voor 2024: Noord-Amerika US$ 900 mln → US$ 1.700 mln in 2035; APAC → US$ 1.300 mln in 2035; cloud US$ 980 mln (2024) → US$ 1.800 mln (2035), on-premise US$ 770 mln → US$ 1.550 mln, hybride US$ 602,7 mln (2024).

### 4.2 De bredere context (om de deelmarkt te plaatsen)

| Bron | Markt | Waarde |
|---|---|---|
| [Fortune Business Insights](https://www.fortunebusinessinsights.com/construction-software-market-110155) | Construction software totaal | US$ 10,76 mrd (2025) → US$ 11,78 mrd (2026) → **US$ 24,72 mrd (2034)**, CAGR 9,70% |
| idem | Waarvan **Project Management & Scheduling** | **US$ 3,43 mrd (2024)** |
| idem | Waarvan eindgebruiker **Builders & Contractors** | US$ 4,88 mrd (2024) — grootste segment |
| idem | Regionaal | NA 42,5% (US$ 4,58 mrd, 2025); Europa 25,4% (US$ 2,74 mrd); APAC 14,0% (US$ 1,51 mrd); MEA 12,3%; Zuid-Amerika 5,7%; VS alleen US$ 2,72 mrd (2026) |
| [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/construction-management-software-market) | Construction management software | US$ 11,58 mrd (2026) → **US$ 17,81 mrd (2031)**, CAGR 8,99% |
| idem | **Project Management & Scheduling als aandeel** | **40,91% van de markt in 2025** |
| idem | **General Contractors als aandeel van de uitgaven** | **46,72% in 2025** |
| idem | Cloud-aandeel | 63,83% van de omzet 2025 |
| idem | **Projecten US$ 50–500 mln** | 44,38% van de implementaties in 2025; projecten >US$ 500 mln groeien 9,22% |
| [The Business Research Company](https://www.thebusinessresearchcompany.com/report/construction-software-global-market-report) | Construction software (engere definitie) | US$ 4,56 mrd (2025) → US$ 5,12 mrd (2026) → US$ 7,77 mrd (2030), CAGR 12,4% |

### 4.3 Eigen bottom-up-controle **[SCHATTING]**

**Methode A — top-down vanuit bouwproductie.**
Wereldwijde bouwproductie 2025 ≈ US$ 13,3 biljoen ([Oxford Economics](https://www.oxfordeconomics.com/resource/future-of-construction/)).
Aanname **[SCHATTING]**: alleen projecten boven circa US$ 10 mln worden met een echt CPM-netwerk gepland; dat is grofweg 35–45% van de wereldwijde output, dus circa US$ 4,7–6,0 biljoen.
Aanname **[SCHATTING]**: de licentiekosten van planningssoftware bedragen circa 0,02–0,04% van die bouwwaarde (afgeleid van: één planner per US$ 30–80 mln bouwwaarde, à US$ 2.000–3.000 licentie per jaar).
→ **US$ 0,9 mrd – US$ 2,4 mrd.** Consistent met de analisten.

**Methode B — bottom-up vanuit seats × prijs.**

| Laag | Geschat aantal seats wereldwijd **[SCHATTING]** | Gem. all-in jaarprijs **[SCHATTING]** | Omzet |
|---|---|---|---|
| Diepe CPM-seats (P6, Asta, Open Plan, Phoenix, Tilos, InEight) | 250.000 – 400.000 | US$ 1.800 – 2.600 | US$ 0,45 – 1,04 mrd |
| 4D / risico / analytics-laag (SYNCHRO, Acumen, Safran, ALICE, SmartPM, Nodes & Links) | 60.000 – 120.000 | US$ 2.500 – 4.000 | US$ 0,15 – 0,48 mrd |
| Lichte/lookahead/lean-planning (Touchplan, Outbuild, Planera, planningsmodules in Procore/Buildertrend/ACC) | 500.000 – 1.200.000 | US$ 350 – 700 | US$ 0,18 – 0,84 mrd |
| Viewers en portal-seats (ScheduleReader, Oracle Portal User, P6 Progress Reporter) | 400.000 – 900.000 | US$ 40 – 300 | US$ 0,02 – 0,27 mrd |
| **Totaal** | | | **US$ 0,8 – 2,6 mrd** |

De onderbouwing van de seat-aantallen: Asta Powerproject alléén claimt **meer dan 100.000 professionals wereldwijd** ([Elecosoft](https://elecosoft.com/us/products/asta/asta-powerproject/features/)), en Asta is buiten UK/DE/SE/BNL marginaal. Als P6 in de bouwsector 2–3× zo groot is als Asta, kom je op 300.000–400.000 diepe seats. Dat is de basis voor de bandbreedte.

### 4.4 Conclusie segmentomvang

> **Puntschatting: circa US$ 1,9 miljard wereldwijde softwareomzet in 2025** voor bouw- en infrastructuurplanningssoftware in enge zin (CPM-planning, 4D-sequencing, schedule-analytics), met een **bandbreedte van US$ 1,4 – 2,5 miljard** afhankelijk van definitie. **[SCHATTING, geconvergeerd uit drie analistenbronnen plus twee eigen bottom-up-methoden]**
>
> **Groeirichting: +6% tot +10% per jaar**, met een prognose van **US$ 2,1 mrd in 2029** (TBRC, strikte definitie) tot **US$ 4,5 mrd in 2035** (WiseGuy, ruime definitie). De groei zit *niet* in prijsstijging van de kernpakketten (P6-prijzen bewegen al jaren nauwelijks) maar in (a) verschuiving naar cloud, (b) uitbreiding naar 4D/AI/analytics-lagen bovenop de bestaande planning, en (c) geografische uitbreiding in APAC.

**Belangrijke nuance voor wie een product in deze markt wil positioneren:** de softwaremarkt is klein ten opzichte van de dienstenlaag eromheen. Bij een planner-jaarloon van US$ 90.889 ([ZipRecruiter](https://www.ziprecruiter.com/Salaries/Construction-Scheduler-Salary)) en consultanttarieven van US$ 800–2.500 per dag ([Highspire](https://www.highspire.com/construction-management-consulting-fees/)) bedraagt de arbeids- en dienstenmarkt rond bouwplanning naar schatting **US$ 30–60 miljard per jaar wereldwijd** **[SCHATTING: 350.000 planners × US$ 90.000 gemiddeld wereldwijd gecorrigeerd voor lagelonenlanden ≈ US$ 20–35 mrd, plus claim-/forensische en implementatiediensten]**. De softwareomzet is dus **circa 3–6% van de totale bestedingen aan bouwplanning**. Wie de dienstenlaag efficiënter maakt, vangt meer waarde dan wie de licentie goedkoper maakt.

---

## 5. Sector-specifieke eisen en standaarden

### 5.1 Verplichte software en leveringsformaten

**SCDOT (South Carolina DOT), FHWA-goedgekeurd, geldig vanaf 1-1-2026:**
- *"Maintain CPM schedules using a currently supported version of **Oracle's Primavera P6**. Coordinate into the Oracle Primavera version used by SCDOT."*
- *"Upload each CPM schedule submission to the SCDOT Construction Extranet site in **.xer format**."*
- Native scheduleschedule (.xer) plus PDF op 11×17 landscape.
- SCDOT levert eigen templates voor pay items en kalenders.
Bron: [SCDOT Construction Schedules Supplemental Specification (01-26)](https://www.scdot.org/content/dam/scdot-legacy/business/technicalpdfs/supspecs/Construction%20Schedules%20Supplemental%20Specification%20(01-26)%20FHWA%20approved.pdf)

**USACE (US Army Corps of Engineers) — 10 verplichte P6-instellingen:**
1. Activity Codes op **Project Level** (niet Global of EPS)
2. Kalenders op **Project Level** (niet Global of Resource)
3. Duration type: **Fixed Duration & Units**
4. Percent complete type: **Physical**
5. Time Period Preferences: standaard (8 u/dag, 40 u/week)
6. Kritieke activiteiten: **Longest Path**
7. Schedule options: **Retained Logic**
8. Cost loading: lump-sum labor resource
9. Activity ID: maximaal 10 tekens
10. Activity Name: maximaal 30 tekens

Daarnaast: *"P6 Professional ship with utilities that allow the conversion of XER file to **SDEF** formatted text files. You may be requested to provide these when working with USACE."*
Bron: [Ten Six, Understanding the Primavera P6 – USACE Mandatory Requirements](https://tensix.com/understanding-the-primavera-p6-usace-mandatory-requirements/)

Ook NYSDOT en TDOT publiceren eigen P6-handleidingen en -specificaties ([NYSDOT P6 CPM Scheduler's Guide](https://www.dot.ny.gov/main/business-center/contractors/construction-division/construction-repository/P6_CPM_Schedulers_Guide_v1-0.pdf); [TDOT Schedule Guidance for Projects that require a P6 generated schedule](https://www.tn.gov/content/dam/tn/tdot/construction/cpm-schedules/20241106_SOG%20for%20P6%20CPM%20Schedules.pdf)).

**Formaten die feitelijk gelden als sectorstandaard:**
| Formaat | Eigenaar | Rol |
|---|---|---|
| **.XER** | Oracle (proprietary, ongedocumenteerd) | De feitelijke uitwisselings- en archiefstandaard in de bouw. Contractueel voorgeschreven. |
| **P6 XML** | Oracle | Officieel uitwisselformaat, breder ondersteund maar minder gebruikt in contracten |
| **SDEF** (Standard Data Exchange Format) | US Army Corps of Engineers | Vaste-kolom-tekstformaat, verplicht bij USACE |
| **.MPP / MS Project XML** | Microsoft | Dominant buiten zwaar-contractuele projecten |
| **.PP** | Elecosoft | Asta Powerproject-eigen formaat |
| **IFC 4.3 (ISO 16739-1:2024)** | buildingSMART / ISO | Open standaard; sinds april 2024 met infrastructuurdekking. **Nauwelijks gebruikt voor planningsuitwisseling** — de open bres in deze markt (§7). Officiële aanduiding IFC 4.3.2.0 ([buildingSMART Technical, IFC schema specifications](https://technical.buildingsmart.org/standards/ifc/ifc-schema-specifications/)) |

### 5.2 DCMA 14-Point Assessment

Ontwikkeld door de Defense Contract Management Agency in 2005 om schema's van projecten boven US$ 20 miljoen te toetsen; inmiddels breed overgenomen in de bouw als de facto kwaliteitsprotocol ([SmartPM, The DCMA 14 Checks](https://smartpm.com/blog/dcma-14-checks); [Deltek](https://www.deltek.com/en/project-and-portfolio-management/project-scheduling/dcma-14-point-assessment)). Toegepast door *"transit authorities, hospital systems, airport programs, and major owner-rep firms as a baseline acceptance requirement for P6 schedules"* ([ScheduleLens](https://schedulelens.com/blog/dcma-14-point-assessment/)).

| # | Check | Drempel |
|---|---|---|
| 1 | Missing Logic | < 5% taken zonder predecessor/successor |
| 2 | Leads (negatieve lag) | 0 taken |
| 3 | Lags | ≤ 5% van de taken met positieve lag |
| 4 | Relationship Types | ≥ 90% FS; < 5% SS; ≤ 5% FF; 0% SF |
| 5 | Hard Constraints | ≤ 5% van de taken |
| 6 | High Float | ≤ 5% met float > 44 werkdagen |
| 7 | Negative Float | 0% |
| 8 | High Duration | ≤ 5% met duur > 44 werkdagen |
| 9 | Invalid Dates | 0 taken |
| 10 | Resources | elke taak ≥ 1 dag heeft een resource (optioneel) |
| 11 | Missed Tasks | ≤ 5% te laat afgerond t.o.v. baseline |
| 12 | Critical Path Test | proportionele verlenging bij geforceerde 600-daagse activiteit |
| 13 | CPLI (Critical Path Length Index) | ≥ 1,0 (≤ 0,95 = fail) |
| 14 | BEI (Baseline Execution Index) | ≥ 1,0 |

Bron: [SmartPM](https://smartpm.com/blog/dcma-14-checks) (drempels), [Deltek](https://www.deltek.com/en/project-and-portfolio-management/project-scheduling/dcma-14-point-assessment) (bevestiging).

**Bekende kritiek** (relevant voor productdifferentiatie): de 44-werkdagen-drempel bij High Float houdt geen rekening met projectduur en geldt uniform voor een halfjaarsproject en een tweejarig project; het verbod op negatieve lags is omstreden en *"rejecting negative lags may open up the owner to liability"*; SmartPM concludeert dat de richtlijnen *"by no means perfect nor without controversy"* zijn.

### 5.3 EVMS / ANSI-EIA-748

- Compliance met de **32 guidelines** van EIA-748 is verplicht bij Amerikaanse defensiecontracten (cost- of incentive-type) vanaf **US$ 20 miljoen**; een formele **EVMS-validatie** is vereist vanaf **US$ 50 miljoen** ([AcqNotes, NDIA EIA 748 Earned Value Management](https://acqnotes.com/acqnote/tasks/ansi-eia-748-earned-value-management); [DFARS 252.234-7002](https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.)).
- Contractrapportage omvat het Contract Performance Report (CPR) en de **Integrated Master Schedule (IMS)**; compliance wordt getoetst tijdens een **Integrated Baseline Review (IBR)** of surveillance review ([DOE EVMS Training Snippet](https://www.energy.gov/sites/prod/files/2015/12/f27/Snippet_3.1A_with_notes.pdf); [DOE EVMS Compliance Review SOP](https://www.energy.gov/projectmanagement/articles/evms-compliance-review-standard-operating-procedure-ecrsop)).
- Oracle prijst Earned Value Management als aparte Unifier-add-on à **£44 per gebruiker per maand** ([Oracle G-Cloud 14](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf)) — EVM is dus zelfs bij de marktleider géén standaardfunctionaliteit maar een betaalde uitbreiding.

### 5.4 AACE-praktijken en forensische analyse

- **AACE International Recommended Practice 29R-03, Forensic Schedule Analysis** (TCM Framework 6.4) is het wereldwijd erkende raamwerk voor delay-claimanalyse: het levert *"a comprehensive reference on the application of critical path method (CPM) scheduling within forensic contexts"* met een volledige taxonomie van methoden en implementatieprotocollen ([AACE 29R-03 via Academia](https://www.academia.edu/9571800/AACE_International_Recommended_Practice_No_29R_03_FORENSIC_SCHEDULE_ANALYSIS_TCM_Framework_6_4_Forensic_Performance_Assessment); [Long International, AACE 29R-03 Forensic Schedule Analysis Methods](https://www.long-intl.com/articles/schedule-analysis-method-2/)).
- In internationale arbitrage wordt 29R-03 naast het **SCL Delay & Disruption Protocol (2e editie)** gebruikt; de twee worden beschreven als complementair, waarbij 29R-03 de gedetailleerde methodetechniek levert voor gelijktijdige vertraging, versnelling en meerdere (bijna-)kritieke paden ([Ankura, Harmonizing SCL D&D2 and AACE 29R-03](https://ankura.com/insights/harmonizing-scl-dd2-and-aace-29r-03-complementary-frameworks-for-forensic-delay-analysis-in-international-arbitration)).
- AACE publiceert daarnaast een *Professional Practice Guide to Forensic Schedule Analysis* ([AACE PPG inhoudsopgave](https://web.aacei.org/docs/default-source/ppg_toc/toc_4060-28.pdf)).

**Wat dit betekent voor software:** de forensische praktijk vereist dat elke maandelijkse update **onveranderd bewaard** blijft als apart bestand, dat data dates exact reproduceerbaar zijn, en dat de rekenwijze (retained logic vs. progress override, longest path vs. total float) traceerbaar is. Dat is een archiverings- en determinisme-eis, geen feature-eis. P6 wint hier omdat de XER-reeks over tien jaar herrekenbaar blijft.

### 5.5 Audits en acceptatieprocedures

De SCDOT-spec toont hoe de audit in de praktijk werkt:
- Baseline binnen vaste termijn, acceptatie door de Resident Construction Engineer.
- **Maandelijkse Schedule Updates verplicht, ongeacht de betalingssituatie**; niet-indienen leidt tot inhouding.
- Revised Baseline bij significante scopewijziging of toegekende termijnverlenging.
- **Recovery Schedule** op verzoek bij achterstand.
- **As-Built Schedule** als laatste update — en pas dan wordt de resterende 40% van de pay item betaald.
- Meting via de **Schedule Variance Index (SVI)** zoals Primavera die berekent; SVI-banden bepalen automatisch de escalatietrap (monitoring → PND → PND met bonding notice → Notice of Default).

---

## 6. Voor- en nadelen van de gebruikte pakketten in déze sectorcontext

### 6.1 Oracle Primavera P6

**Werkt goed hier**
- **Multi-kalender is correct geïmplementeerd.** Elke kalender heeft een eigen duration factor, wat multi-kalenderprojecten (werkkalender + 7-daagse uithardingskalender + winterstop) beheersbaar maakt ([Eastwood Harris](https://eastwoodharris.com/comparison-of-microsoft-project-oracle-primavera-p6-and-elecosoft-asta-powerproject/)).
- **Dwingt disciplinaire updatepraktijk af.** *"P6 forces schedulers to update a schedule properly"* en *"it is far easier and quicker to update a schedule than Microsoft Project"* (Eastwood Harris). Voor een maandelijkse contractuele update over 10.000 activiteiten is dat doorslaggevend.
- **Onbeperkt aantal baselines met visuele vergelijking** (Eastwood Harris) — essentieel voor claims.
- **Databasearchitectuur** verwerkt grote datavolumes; EPPM ondersteunt multi-project met geïntegreerde rapportage.
- **Activity Steps** breken complexe activiteiten op zonder de Gantt te vervuilen ([ScheduleReader](https://schedulereader.com/microsoft-project-vs-primavera-p6-what-are-the-differences/)).
- **Contractuele acceptatie is gegarandeerd.** Geen enkele opdrachtgever weigert een P6-XER.

**Wringt hier**
- **Grafisch zwak.** *"Graphically less powerful than most other"* planningssoftware; standaardweergaven vereisen altijd handmatige herformattering (Eastwood Harris). Voor een sector waarin de planning aan directies, gemeenteraden en juryleden gepresenteerd wordt, is dat een reëel probleem.
- **Kan niet alle baseline-resourcedata lezen** en toont irrelevante "Planned Dates" wanneer geen baseline bestaat (Eastwood Harris) — bekende bron van interpretatiefouten.
- **Laagste score op gebruiksgemak.** Ease-of-Use **3,7/5** tegenover Functionality 4,4 en Value for Money 4,0, over 182 reviews (overall 4,4/5) ([Software Advice, Oracle Primavera Cloud reviews](https://www.softwareadvice.com/construction/primaverp6eppm-profile/reviews/)). Terugkerend citaat: *"The complexity of using this tool makes it extremely challenging to train people on it."*
- **Beperkte aanpasbaarheid.** *"Limited modification options"* frustreert klanten met afwijkende processen (Software Advice).
- **Instapdrempel van £66.000 per jaar** (25 seats minimum bij £220/maand) sluit de hele midden-aannemersmarkt uit.
- **Complexe IT-eisen** (Oracle/SQL-databases) en implementaties van maanden ([Planera](https://www.planera.io/post/primavera-p6-alternatives)).
- **Interface verouderd**: meerdere reviewers noemen dat de interface modernisering behoeft om met vergelijkbare platforms mee te kunnen (Software Advice).

### 6.2 Microsoft Project

**Werkt goed hier**
- **Universeel uitwisselbaar.** Meest verspreid, dus bestandsuitwisseling tussen bedrijven is triviaal (Eastwood Harris).
- **Circa een derde van de prijs van P6** (Eastwood Harris) — en met de eenmalige aankoop van Project Professional 2024 à US$ 1.129,99 ([Microsoft](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)) is het kapitaalbeslag laag.
- **Intuïtief, lijkt op Excel.** Cruciaal in een sector waar de projectleider zelf moet kunnen meekijken.

**Wringt hier — en dit zijn harde technische blokkades, geen smaakkwesties**
- **Slechts één relatie tussen twee taken mogelijk.** Dat maakt "ladder scheduling" (SS + FF tussen dezelfde twee activiteiten — de standaardmanier om doorlopend lijnwerk te modelleren) onmogelijk (Eastwood Harris). Voor wegenbouw, spoor en pijpleidingen is dat diskwalificerend.
- **Kan geen verschillende uurkalenders gebruiken zonder duurfouten** (Eastwood Harris). Zie §1.2: kalenderdiversiteit is inherent aan bouw.
- **Baselines zijn slechts partieel**, geen volledige projectkopieën (Eastwood Harris) — fataal voor claimanalyse.
- **Resourcekalenders overschrijven taakkalenders onvoorspelbaar** (Eastwood Harris).
- **Moeite met het modelleren van grondverzet- en mijnbouwoperaties** (Eastwood Harris).
- Planera noemt daarnaast: *"not construction-specific, struggles at scale"*.

### 6.3 Elecosoft / Eleco Asta Powerproject

**Werkt goed hier**
- **Bouwspecifiek ontworpen** en biedt volgens Eastwood Harris *"the most extensive scheduling options"*: onbeperkte baseline-links, partiële baselines, multi-split-mogelijkheden.
- **Leads en lags berekend op predecessor én/of successor** — precies de flexibiliteit die lijnwerk en overlappende bouwstromen vereisen (Eastwood Harris).
- **Kan niet-werktijd achter of op elke balk tonen** — een schijnbaar klein detail dat op de bouwplaats het verschil maakt tussen een leesbare en een misleidende planning.
- **Lagere implementatiekosten** dankzij concurrent licenses en een **gratis reader** (Eastwood Harris) — dat lost het lees-probleem van §3.4 structureel op.
- **Meest flexibele multi-project**: meerdere projecten in één bestand óf in een database, met gelijktijdige multi-user toegang (Eastwood Harris).
- **Prijs**: £1.113 per gebruiker per jaar SaaS zonder minimumaantal ([Elecosoft G-Cloud 14](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/93278/159955281882828-pricing-document-2024-05-07-1230.pdf)) tegenover £2.640 bij P6 EPPM met minimum 25. Bij 25 seats: £27.825 versus £66.000 — **Asta is op dat punt 2,4× goedkoper** **[SCHATTING, eigen berekening uit beide G-Cloud-prijsbladen]**.
- **4D BIM als add-on** in dezelfde tool, plus Asta Vision-dashboards en de nieuwe Asta Estimate die *"cost, carbon, and schedule data into a single workflow"* integreert ([Eleco FY2025](https://ir.eleco.com/regulatory/final-results-8/)).
- Reviewers: 4,5/5 over 34 reviews, 90% zou aanbevelen; *"ease of use is a definite headline positive"*, snel Gantt-charts, effectief voor what-if-analyse ([Capterra UK](https://www.capterra.co.uk/software/173782/powerproject)).

**Wringt hier**
- **Contracten schrijven vaak P6 of MS Project voor** (Eastwood Harris) — de doodsteek buiten de regio's waar Asta gevestigd is. Zie de SCDOT-spec: daar staat letterlijk "Oracle's Primavera P6".
- **Lage marktpenetratie buiten Noordwest-Europa** maakt het *"difficult to find people who know how to operate"* (Eastwood Harris). Eleco haalt slechts **4% van zijn omzet (£1,5 mln) uit de VS** ([Eleco FY2025](https://ir.eleco.com/regulatory/final-results-8/)).
- **Steilere leercurve** door de omvang van de functionaliteit (Eastwood Harris; ook als con genoemd door Capterra-reviewers).
- **Import/export-nauwkeurigheid blijft een probleem** ondanks verbeteringen, en **stabiliteit**: *"crashes more than other software"* ([Capterra UK](https://www.capterra.co.uk/software/173782/powerproject)).
- **Desktopgericht met beperkte veldtoegankelijkheid** ([Planera](https://www.planera.io/post/primavera-p6-alternatives)).
- **UI-inconsistenties**: opmaakfuncties verspreid over verschillende plekken (Capterra).

### 6.4 Bentley SYNCHRO

**Werkt goed hier**
- **Echte 4D/5D-authoring** met model-splitting om constructibele componenten te maken, constructiegeometrie, mixed reality, en web/mobiele toegang voor voortgang uit het veld ([Bentley SYNCHRO](https://www.bentley.com/software/synchro/); [Bentley persbericht](https://www.businesswire.com/news/home/20221110006078/en/Bentley-Systems-Enhances-SYNCHRO-Construction-Management-Solution-with-New-Capabilities-and-Applications)).
- **Aantoonbaar effect op sequencing**: Laing O'Rourke ontwikkelde bouwfaseringsplannen **71,5% sneller** met het 4D-model; Sacramento Regional County Sanitation claimt **US$ 400 miljoen besparing** via digital twin (Bentley).
- **Werkt bovenop bestaande planners** — geen rip-and-replace: *"integrate with third-party scheduling software (such as P6, Asta Powerproject, etc.)"*.

**Wringt hier**
- **Geen CPM-vervanger.** Er blijft een tweede tool nodig, met alle synchronisatieproblemen van dien.
- **Geen prijstransparantie**; consumption-based model dat per kwartaal wijzigt — lastig te budgetteren in een projectorganisatie die met vaste aanneemsommen werkt.
- **Vereist een bruikbaar 3D-model**, wat op infraprojecten (vooral bestaande/lineaire infrastructuur) vaak niet beschikbaar of niet consistent gecodeerd is.

### 6.5 ALICE Technologies

**Werkt goed hier**
- Genereert en optimaliseert duizenden uitvoeringsvarianten; claimt **tot 17% kortere bouwduur, 14% lagere arbeidskosten, 12% lagere materieelkosten** ([ALICE](https://www.alicetechnologies.com/pricing)).
- **Onbeperkt aantal gebruikers en opslag** inbegrepen — een expliciete breuk met het per-seat-model dat het lees-probleem creëert.
- Vangt precies het gat op dat CPM structureel niet dekt: CPM valideert een gegeven plan, maar zoekt geen alternatieven.

**Wringt hier**
- **Economisch alleen verdedigbaar boven US$ 75 miljoen bouwwaarde** (ALICE). Dat sluit >95% van alle bouwprojecten uit **[SCHATTING op basis van de projectgrootteverdeling; Mordor meldt dat projecten van US$ 50–500 mln 44,38% van de implementaties vormen]**.
- **Geen publieke prijs**, verkoopproces via meerstaps-intakeformulier — hoge frictie.
- Vereist zeer gestructureerde inputdata (recepten, productiviteitscijfers, materieelvloot) die de meeste aannemers niet gestandaardiseerd hebben.
- Indicatie **US$ 50.000–150.000 per jaar** **[ONBEVESTIGD]** plaatst het buiten bereik van alles onder de megaprojectklasse.

### 6.6 De lean/pull-planningstools (Touchplan, Nialli, Hoylu, vPlanner)

**Werkt goed hier:** digitaliseren de Last Planner-sessie, lookahead-coördinatie en constraint-tracking — waar het echte werk op de bouwplaats gecoördineerd wordt.

**Wringt hier:** het zijn geen planners. Touchplan is *"not a CPM scheduling platform"* zonder master-schedulebeheer; Nialli *"lacks logic-driven dependencies"*; Hoylu heeft *"no CPM engine, requires separate master schedule"* ([Planera](https://www.planera.io/post/primavera-p6-alternatives)). Het resultaat is de klassieke tweedeling: het contractuele netwerk in P6 en de werkelijke uitvoeringsplanning op post-its/Touchplan, die uit elkaar lopen.

---

## 7. Openingen: ontevredenheid en gaten

### 7.1 Het interoperabiliteitsgat — het grootste

**Bewijs 1:** Er bestaat een volwaardig commercieel product (ScheduleReader, vanaf US$ 344/jaar, klanten Airbus, Siemens, Maersk Oil, Sandia National Laboratories) waarvan de enige functie is om **XER- en P6-XML-bestanden leesbaar te maken voor mensen zonder P6-licentie**. Het pitcht letterlijk het vervangen van *"static PDFs with interactive insights"* en het opheffen van *"the old-fashioned way of sending and receiving projects in .pdf format"* ([ScheduleReader](https://schedulereader.com/)).

**Bewijs 2:** Oracle prijst een **"Portal User" op £2 per maand met minimum 100 gebruikers** in zijn eigen G-Cloud-prijslijst — een SKU die alleen bestaat om het leesprobleem intern af te vangen zonder de dure seats te verwateren ([Oracle G-Cloud 14](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf)).

**Bewijs 3:** Elecosoft levert een **gratis reader** bij Asta Powerproject als expliciet verkoopargument (Eastwood Harris).

**Bewijs 4:** Capterra-reviewers noemen bij Asta Powerproject expliciet dat *"import/export data accuracy issues persist despite improvements"* ([Capterra UK](https://www.capterra.co.uk/software/173782/powerproject)).

**De opening:** het uitwisselformaat van deze sector (.XER) is een ongedocumenteerd, proprietary formaat van één leverancier, contractueel voorgeschreven door overheidsopdrachtgevers. Er is geen open, gedocumenteerde, ISO-gestandaardiseerde route voor planningsdata — terwijl die er voor geometrie wél is (IFC/ISO 16739-1:2024). Elke partij in de keten die het netwerk moet lézen betaalt daar apart voor, of krijgt een PDF.

### 7.2 Het IFC-gat: geometrie is open, tijd is dat niet

IFC 4.3 ADD2 is sinds april 2024 **ISO 16739-1:2024** ([buildingSMART Technical](https://technical.buildingsmart.org/standards/ifc/ifc-schema-specifications/)) en dekt met de 4.3-uitbreiding ook infrastructuur. Het schema bevat een volledige planningsstructuur (`IfcWorkSchedule`, `IfcTask`, `IfcTaskTime`, `IfcRelSequence`, `IfcWorkCalendar`, `IfcResource`, `IfcCostItem`), maar de praktijk gebruikt IFC vrijwel uitsluitend voor geometrie.

De open-source toolchain bestaat wel: IfcOpenShell is *"the open source IFC toolkit and geometry engine"* met ondersteuning voor **IFC2X3, IFC4 en IFC4X3** en formaten IFC-SPF, IFCJSON, IFCXML, IFCHDF5 en IFCSQL, met *"a native IFC authoring API"* ([IfcOpenShell](https://ifcopenshell.org/)). Maar er is geen breed gebruikte CPM-planner die IFC als **native projectformaat** hanteert.

**De opening — en dit is de kern voor een open-source, IFC-gebaseerde planner:**
1. **Eén bestand voor geometrie én tijd.** Vandaag: IFC-model + los XER + Excel-koppeltabel + Navisworks/SYNCHRO om ze te verbinden. Elke wijziging in één van drieën verbreekt de koppeling.
2. **Open, auditeerbaar archief.** De forensische praktijk (§5.4) vereist dat maandelijkse updates over 10 jaar reproduceerbaar blijven. Een ISO-gestandaardiseerd, tekstueel, gedocumenteerd formaat is daar objectief beter voor dan een ongedocumenteerde binaire XER die alleen door de huidige P6-versie leesbaar is.
3. **Leesrecht zonder licentie.** Als het contractuele planningsbestand een IFC is, kan elke onderaannemer het openen met gratis tooling. Dat verwijdert de hele ScheduleReader-/Portal-User-laag als kostenpost bij de klant.
4. **Aanbestedingsargument.** Publieke opdrachtgevers die IFC/openBIM al eisen voor geometrie hebben een principieel argument om het ook voor tijd te eisen — en zijn tegelijk juist de partijen die vandaag P6/XER bij naam voorschrijven. Dat is de moeilijkste maar meest waardevolle deur.

### 7.3 Het midden-marktgat

Planera's eigen concurrentanalyse benoemt de P6-uitstapredenen expliciet: *"steep learning curve"*, maandenlange implementaties, *"high cost for smaller teams"* met een user-based prijsmodel, *"complex IT requirements"* (Oracle/SQL-databases), interfacecomplexiteit en *"limited support for mid-size GC workflows"* ([Planera](https://www.planera.io/post/primavera-p6-alternatives)).

Kwantitatief: P6 EPPM Cloud kost minimaal **£66.000 per jaar** (25 seats × £220 × 12). Mordor meldt dat **projecten van US$ 50–500 mln 44,38% van de implementaties** vormen ([Mordor](https://www.mordorintelligence.com/industry-reports/construction-management-software-market)) — dat zijn precies de projecten die te groot zijn voor MS Project (§6.2: geen dubbele relaties, geen multi-kalender, partiële baselines) en te klein voor de P6-instapdrempel. Deze groep werkt vandaag met MS Project of Excel, tegen de technische beperkingen in.

### 7.4 Het presentatiegat

P6 is *"graphically less powerful than most other"* software, standaardweergaven vereisen altijd herformattering (Eastwood Harris). Asta-reviewers noemen als con dat het *"difficult to present to unfamiliar users"* is en dat opmaakfuncties over de UI verspreid zijn ([Capterra](https://www.capterra.co.uk/software/173782/powerproject)). En de SCDOT-specificatie eist letterlijk **PDF-uitdraaien op 11×17 inch landscape** — dat is de staat van planningscommunicatie in 2026.

Voor een sector waarin de planning aan directies, toezichthouders, financiers en uiteindelijk arbiters gepresenteerd moet worden, is renderkwaliteit geen cosmetiek maar functionaliteit.

### 7.5 Het schedulekwaliteitsgat

DCMA-14 is de de facto kwaliteitsstandaard maar wordt met **aparte tooling** gedraaid (Deltek Acumen Fuse, Open Plan, SmartPM, ScheduleLens) — dus na afloop, als aparte stap, in een apart product met eigen licentie. De checks zelf zijn eenvoudig te implementeren (percentages open logica, lags, hard constraints, float, relatietypes). Er is geen technische reden waarom een planner ze niet **tijdens het plannen** kan tonen.

Bovendien is de standaard zelf betwist: de 44-werkdagengrens houdt geen rekening met projectduur; het lead-verbod kan de opdrachtgever aansprakelijkheid opleveren; SmartPM zelf noemt de richtlijnen *"by no means perfect nor without controversy"* ([SmartPM](https://smartpm.com/blog/dcma-14-checks)). Een tool die de checks **configureerbaar** maakt (drempels per contract, per opdrachtgever) heeft daar een reëel voordeel.

### 7.6 Het float-transparantiegat

De SCDOT-spec verbiedt float suppression en somt vijf concrete verboden praktijken op (zinloze relaties, te lange duren, excessieve lags, niet-contractuele constraints, relaties die een activiteit blokkeren die kon doorlopen). Maar er is **geen standaardtool die deze vijf detecteert**. Opdrachtgevers doen dit vandaag met handmatige review of dure consultants (US$ 800–2.500 per dag, [Highspire](https://www.highspire.com/construction-management-consulting-fees/)). Dit is geautomatiseerd detecteerbaar en direct aan het contract te koppelen.

### 7.7 Het kalendergat

Multi-kalenderafhandeling is de scherpste technische scheidslijn tussen P6 (goed) en MS Project (kapot) — de single duration factor van MSP maakt multi-kalenderprojecten onbetrouwbaar (Eastwood Harris). Elke nieuwe planner die deze markt in wil, moet kalenders vanaf dag één correct doen: per-kalender duration factors, 7-daagse uithardings-/zettingskalenders naast 5-daagse werkkalenders, contractuele feestdagen en werkbeperkingen, en weerdagen ingebakken in duren (SCDOT §III.D.10–13). Dit is niet optioneel en niet later toe te voegen.

### 7.8 Het "tweede systeem"-gat (lean vs. CPM)

Het contractuele netwerk (P6) en de werkelijke uitvoeringsplanning (Touchplan/post-its/lookahead) zijn vandaag twee gescheiden werelden — Touchplan is expliciet *"not a CPM scheduling platform"* en Hoylu vereist *"separate master schedule"* ([Planera](https://www.planera.io/post/primavera-p6-alternatives)). SCDOT codificeert die tweedeling zelfs (Level 1 look-ahead versus Level 2 CPM). Een planner die beide niveaus in één datamodel houdt — waarbij de 4-weeks look-ahead een view op het CPM-netwerk is in plaats van een apart bestand — pakt een pijn die geen van de gevestigde partijen oplost.

### 7.9 Waar géén opening zit — de realiteitscheck

Eerlijkheidshalve, want dit bepaalt de haalbare strategie:

- **Contractuele voorschriften zijn niet te omzeilen.** Zolang SCDOT, USACE en NAVFAC "Oracle's Primavera P6" en ".xer format" in de specificatie schrijven, is elk alternatief in die contracten hooguit een **voorbereidingstool** die uiteindelijk naar XER moet exporteren. Een IFC-native planner die geen betrouwbare XER/P6-XML-export heeft, is voor de Amerikaanse infrastructuurmarkt onbruikbaar.
- **Prijs is niet de doorslaggevende factor** in het topsegment (§3.4): de licentie is 1,5–4% van de kosten van de planner. "Gratis" wint hier geen enkel gevecht dat "correct en geaccepteerd" verliest.
- **Netwerkeffecten zijn sterk.** Eastwood Harris' oordeel over Asta — *"low market penetration means difficult to find people who know how to operate"* — geldt a fortiori voor elke nieuwkomer. De arbeidsmarkt van planners is P6-getraind.
- **De markt is klein.** US$ 1,4–2,5 mrd wereldwijd voor de hele scheduling-softwaremarkt (§4), waarvan de top-5 leveranciers in de bredere CMS-markt al ~45% houden ([Mordor](https://www.mordorintelligence.com/industry-reports/construction-management-software-market)). Dit is geen markt waarin een nieuwkomer op volume kan winnen; wel een waarin een open standaard een structurele positie kan innemen.

### 7.10 De scherpst gedefinieerde opening, samengevat

**[SCHATTING/oordeel]** De meest verdedigbare positie voor een open-source, IFC-gebaseerde planner in deze sector is:

1. **Native IFC 4.3 (ISO 16739-1:2024) als projectformaat** — geometrie en tijd in één auditeerbaar, open, tekstueel bestand. Dit is de enige structurele differentiatie die geen gevestigde partij kan kopiëren zonder haar eigen lock-in op te geven.
2. **Betrouwbare XER- en P6-XML-import/-export** als toegangsticket. Zonder dit is de Amerikaanse en Midden-Oostenmarkt gesloten.
3. **Correcte multi-kalender-CPM vanaf de kern** — per-kalender duration factors, retained logic/progress override, longest path — omdat dit precies de scheidslijn is waar MS Project faalt en het midden-marktgat ontstaat.
4. **DCMA-14 en float-suppressiedetectie tijdens het plannen**, met configureerbare drempels — verandert een aparte, dure nabewerkingsstap in een ingebouwde kwaliteitscontrole.
5. **Gratis leesbaarheid voor de hele keten** — vernietigt de economische logica onder de ScheduleReader-/Portal-User-laag en lost het probleem op dat opdrachtgevers en onderaannemers vandaag met PDF's oplossen.
6. **Presentatiekwaliteit als functionaliteit, niet als cosmetiek** — omdat de planning in deze sector een communicatie- en bewijsdocument is.
7. **Midden-markt als beachhead** (projecten US$ 50–500 mln, 44,38% van de implementaties volgens Mordor), niet de megaprojecten waar P6 contractueel vastligt.

---

## Bronnenlijst

### Openbare aanbestedings- en contractdocumenten (primair, hoogste betrouwbaarheid)
1. [SCDOT, Construction Schedules Supplemental Specification (01-26), FHWA approved, geldig vanaf 1 januari 2026](https://www.scdot.org/content/dam/scdot-legacy/business/technicalpdfs/supspecs/Construction%20Schedules%20Supplemental%20Specification%20(01-26)%20FHWA%20approved.pdf)
2. [Oracle Primavera Pricing – G-Cloud 14 Framework Cloud Software, doc. BD.G14.OCS.002, mei 2024 (UK Digital Marketplace)](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/717959/423103118187025-pricing-document-2024-05-03-0915.pdf)
3. [Oracle Primavera – Pricing document, th3rdcurve Ltd, ingangsdatum 30 april 2024 (UK Digital Marketplace, G-Cloud 14)](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/710699/219564152717676-pricing-document-2024-05-03-1330.pdf)
4. [Elecosoft UK Ltd, Asta Powerproject SaaS: Pricing Document for G-Cloud 14, mei 2024 (UK Digital Marketplace)](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/93278/159955281882828-pricing-document-2024-05-07-1230.pdf)
5. [NYSDOT, Primavera P6 CPM Scheduler's Guide v1.0](https://www.dot.ny.gov/main/business-center/contractors/construction-division/construction-repository/P6_CPM_Schedulers_Guide_v1-0.pdf)
6. [TDOT, Schedule Guidance for Projects that require a P6 generated schedule (6 nov. 2024)](https://www.tn.gov/content/dam/tn/tdot/construction/cpm-schedules/20241106_SOG%20for%20P6%20CPM%20Schedules.pdf)
7. [DFARS 252.234-7002 Earned Value Management System](https://www.acquisition.gov/dfars/252.234-7002-earned-value-management-system.)
8. [US DOE, EVMS Training Snippet 3.1A](https://www.energy.gov/sites/prod/files/2015/12/f27/Snippet_3.1A_with_notes.pdf)
9. [US DOE, EVMS Compliance Review Standard Operating Procedure (ECRSOP)](https://www.energy.gov/projectmanagement/articles/evms-compliance-review-standard-operating-procedure-ecrsop)

### Bedrijfsrapportage (primair)
10. [Eleco plc, Final Results FY2025 (Investor Relations)](https://ir.eleco.com/regulatory/final-results-8/)
11. [Eleco plc Annual Report 2024](https://eleco.com/wp-content/uploads/2025/05/5621_Eleco-plc-Annual-Report-2024_Hyperlink.pdf)

### Leverancierspagina's
12. [Oracle, Primavera P6 Enterprise Project Portfolio Management](https://www.oracle.com/industries/construction-engineering/primavera-p6/)
13. [Bentley Systems, SYNCHRO: Digital Construction Delivery Software](https://www.bentley.com/software/synchro/)
14. [Bentley Systems persbericht, SYNCHRO Construction Management Solution (nov. 2022)](https://www.businesswire.com/news/home/20221110006078/en/Bentley-Systems-Enhances-SYNCHRO-Construction-Management-Solution-with-New-Capabilities-and-Applications)
15. [ALICE Technologies, AI Construction Project Scheduling Software Pricing](https://www.alicetechnologies.com/pricing)
16. [Elecosoft, Asta Powerproject Features](https://elecosoft.com/us/products/asta/asta-powerproject/features/)
17. [Microsoft, Compare project management software (Project 2024 prijzen)](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software)
18. [InEight Schedule](https://ineight.com/products/ineight-schedule/)
19. [ScheduleReader](https://schedulereader.com/)
20. [ScheduleReader, Microsoft Project vs Primavera P6: What Are the Differences?](https://schedulereader.com/microsoft-project-vs-primavera-p6-what-are-the-differences/)
21. [Planera, Top 10 Primavera P6 Alternatives](https://www.planera.io/post/primavera-p6-alternatives)
22. [IfcOpenShell — open source IFC toolkit](https://ifcopenshell.org/)

### Standaarden
23. [buildingSMART Technical, IFC Schema Specifications (IFC 4.3 ADD2 = ISO 16739-1:2024)](https://technical.buildingsmart.org/standards/ifc/ifc-schema-specifications/)
24. [AACE International RP 29R-03, Forensic Schedule Analysis (TCM Framework 6.4)](https://www.academia.edu/9571800/AACE_International_Recommended_Practice_No_29R_03_FORENSIC_SCHEDULE_ANALYSIS_TCM_Framework_6_4_Forensic_Performance_Assessment)
25. [AACE International, Professional Practice Guide to Forensic Schedule Analysis (inhoudsopgave)](https://web.aacei.org/docs/default-source/ppg_toc/toc_4060-28.pdf)
26. [Long International, AACE 29R-03 Forensic Schedule Analysis Methods](https://www.long-intl.com/articles/schedule-analysis-method-2/)
27. [Ankura, Harmonizing SCL D&D2 and AACE 29R-03](https://ankura.com/insights/harmonizing-scl-dd2-and-aace-29r-03-complementary-frameworks-for-forensic-delay-analysis-in-international-arbitration)
28. [AcqNotes, NDIA EIA-748 Earned Value Management](https://acqnotes.com/acqnote/tasks/ansi-eia-748-earned-value-management)
29. [Deltek, What is the DCMA 14-Point Assessment?](https://www.deltek.com/en/project-and-portfolio-management/project-scheduling/dcma-14-point-assessment)
30. [SmartPM, The DCMA 14 Checks: Schedule Quality Assessment](https://smartpm.com/blog/dcma-14-checks)
31. [ScheduleLens, DCMA 14-Point Assessment: Complete Guide with P6 Walkthrough](https://schedulelens.com/blog/dcma-14-point-assessment/)
32. [Ron Winter Consulting, DCMA 14-Point Assessment (PSP)](https://www.ronwinterconsulting.com/DCMA_14-Point_Assessment.pdf)
33. [Ten Six, Understanding the Primavera P6 – USACE Mandatory Requirements](https://tensix.com/understanding-the-primavera-p6-usace-mandatory-requirements/)

### Marktonderzoek en analistenrapporten
34. [GlobeNewswire / Research and Markets, Construction Schedule Software Market Report 2025 (US$ 2,09 mrd tegen 2029)](https://www.globenewswire.com/news-release/2025/10/22/3170911/28124/en/Construction-Schedule-Software-Market-Report-2025-Digital-Tools-Drive-Rapid-Growth-Reaching-US-2-09-Billion-by-2029.html)
35. [WiseGuy Reports, Construction Scheduling Software Market](https://www.wiseguyreports.com/reports/construction-scheduling-software-market)
36. [Fortune Business Insights, Construction Software Market](https://www.fortunebusinessinsights.com/construction-software-market-110155)
37. [Mordor Intelligence, Construction Management Software Market 2026–2031](https://www.mordorintelligence.com/industry-reports/construction-management-software-market)
38. [The Business Research Company, Construction Software Global Market Report](https://www.thebusinessresearchcompany.com/report/construction-software-global-market-report)
39. [Oxford Economics / Marsh McLennan, Future of Construction (wereldwijde bouwproductie 2020–2030)](https://www.oxfordeconomics.com/resource/future-of-construction/)
40. [Grand View Research, Construction Management Software Market Report (403 bij ophalen; alleen als referentie)](https://www.grandviewresearch.com/industry-analysis/construction-management-software-market-report)

### Vakpers, vergelijkingen en gebruikersreviews
41. [Eastwood Harris, Comparison of Microsoft Project, Oracle Primavera P6 and Elecosoft Asta Powerproject](https://eastwoodharris.com/comparison-of-microsoft-project-oracle-primavera-p6-and-elecosoft-asta-powerproject/)
42. [Capterra UK, Asta Powerproject — prijzen en reviews](https://www.capterra.co.uk/software/173782/powerproject)
43. [Software Advice, Oracle Primavera Cloud / P6 EPPM reviews (182 reviews)](https://www.softwareadvice.com/construction/primaverp6eppm-profile/reviews/)
44. [AEC Magazine, Bentley enhances Synchro construction management solution](https://aecmag.com/construction/bentley-enhances-synchro-construction-management-solution/)
45. [constructionbids.ai, Best Oracle Primavera P6 Alternatives (2026) — **secundair, prijsclaims onbevestigd**](https://constructionbids.ai/blog/oracle-primavera-alternative-construction)
46. [SelectHub, Microsoft Project vs Primavera P6](https://www.selecthub.com/project-management-software/microsoft-project-vs-primavera-p6/)
47. [ITQlick, Oracle Primavera P6 Plans & Hidden Fees (403 bij ophalen; alleen als referentie)](https://www.itqlick.com/oracle-primavera-p6/pricing)

### Vertragingsstatistiek en projectprestaties
48. [OpenSpace, Construction project delay statistics (aggregeert McKinsey, KPMG, AGC, ASCE, Deltek)](https://www.openspace.ai/blog/construction-project-delay-statistics/)
49. [ScienceDirect, Beyond economies of scale: construction cost overrun risks and time delays in global energy infrastructure projects](https://www.sciencedirect.com/science/article/abs/pii/S2214629625001380)
50. [Foresight, The True Cost of Delays at Scale](https://www.foresight.works/blog/the-true-cost-of-delays-at-scale)
51. [Cato Institute, Megaprojects: Over Budget, Over Time, Over and Over](https://www.cato.org/policy-report/january/february-2017/megaprojects-over-budget-over-time-over-over)

### Arbeidsmarkt en tarieven
52. [ZipRecruiter, Construction Scheduler Salary (jan. 2026)](https://www.ziprecruiter.com/Salaries/Construction-Scheduler-Salary)
53. [Salary.com, Planner/Scheduler I – Construction Salary (juli 2026)](https://www.salary.com/research/salary/benchmark/planner-scheduler-i-construction-salary)
54. [Salary.com, Construction Scheduler Salary](https://www.salary.com/research/salary/listing/construction-scheduler-salary)
55. [Highspire, How Much Are Construction Management Consulting Fees?](https://www.highspire.com/construction-management-consulting-fees/)

---

## Bijlage: overzicht van alle gemarkeerde schattingen

| # | Schatting | Basis |
|---|---|---|
| S1 | P6 EPPM Cloud instapdrempel £66.000/jaar | 25 × £220 × 12, uit de gepubliceerde G-Cloud-minima |
| S2 | P6 UK Government Cloud instapdrempel £263.400/jaar | 50 × £439 × 12, idem |
| S3 | Asta 2,4× goedkoper dan P6 EPPM bij 25 seats | £27.825 vs. £66.000, beide uit G-Cloud 14 |
| S4 | Licentiekosten = 1,5–4% van de volledig belaste jaarkosten van een planner | £1.100–2.700 licentie tegen US$ 90.889 salaris + ~30% werkgeverslasten |
| S5 | Typische jaarlijkse contractwaarden per organisatietype (tabel §3.3) | Gepubliceerde tarieven × geschatte seat-aantallen |
| S6 | Top-down segmentomvang US$ 0,9–2,4 mrd | US$ 13,3 bln bouwproductie × 35–45% CPM-gepland × 0,02–0,04% softwarequote |
| S7 | Bottom-up segmentomvang US$ 0,8–2,6 mrd | Seat-aantallen × prijs per laag (tabel §4.3), verankerd op Asta's >100.000 gebruikers |
| S8 | **Puntschatting segment US$ 1,9 mrd (2025)**, bandbreedte US$ 1,4–2,5 mrd | Convergentie van drie analistenbronnen + S6 + S7 |
| S9 | Dienstenlaag rond bouwplanning US$ 30–60 mrd/jaar | ~350.000 planners × gecorrigeerd loon + consultancy/claimdiensten |
| S10 | Softwareomzet = 3–6% van de totale bestedingen aan bouwplanning | S8 / S9 |
| S11 | ALICE's US$ 75 mln-drempel sluit >95% van de projecten uit | Projectgrootteverdeling, gekruist met Mordor's 44,38% voor US$ 50–500 mln |
| S12 | 4D-laag op megaproject £40.000–120.000 per project | Afgeleid van de ALICE-indicatie (onbevestigd) |
| S13 | Strategische positionering §7.10 | Eigen oordeel op basis van alle bovenstaande bevindingen |
