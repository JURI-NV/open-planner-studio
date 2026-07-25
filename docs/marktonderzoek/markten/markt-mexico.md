# Marktonderzoek: projectplanning-/schedulingsoftware in Mexico

*Regio: Latijns-Amerika · Onderzoeksdatum: juli 2026 · Taal van de markt: Spaans*

---

## 1. Samenvatting

Mexico is een van de twee grootste bouwmarkten van Latijns-Amerika — samen met Brazilië — en groeit hard door nearshoring-fabrieken (Monterrey, Bajío, grensstaten) en megaprogramma's van de overheid: MXN 1,2 biljoen aan spoorprojecten tot 2030, MXN 624,6 mrd aan elektriciteitsinfrastructuur en MXN 173 mrd aan snelwegen ([GlobeNewswire/GlobalData](https://www.globenewswire.com/news-release/2026/02/12/3237443/0/en/Mexico-Construction-Industry-Databook-Report-2026-Nearshoring-Data-Centers-Rail-Megaprojects-Accelerates-the-Next-Investment-Cycle-Forecast-to-2030.html)).

> **[Geverifieerd juli 2026]** De eerdere formulering "de tweede bouwmarkt van LatAm (na Brazilië)" is **niet houdbaar als vaststaand feit**: Statista's overzicht van de bouw-GDP per land zet Mexico in 2024 juist op **nummer 1** in Latijns-Amerika en de Caraïben, met Brazilië tweede ([Statista, Construction industry in Latin America](https://www.statista.com/topics/10673/construction-industry-in-latin-america/), [Latin America: construction GDP 2024, by country](https://www.statista.com/statistics/1089163/value-construction-industry-latin-america-country/)); andere bronnen noemen Brazilië dominant. De rangorde hangt af van de gekozen maatstaf (bouw-GDP in USD, output, of omzet) en van de wisselkoers. Zie §Verificatie.

De planningssoftwaremarkt heeft een **uitgesproken tweelagenstructuur**:

1. **Een uniek Mexicaans "precios unitarios"-ecosysteem.** Openbare aanbestedingen onder de *Ley de Obras Públicas y Servicios Relacionados con las Mismas* (LOPSRM) vereisen gedetailleerde eenheidsprijsanalyses (APU) plus **programma's van uitvoering (programas de obra)** — of de wet daarbij letterlijk een *ruta crítica* eist, is **niet op artikelniveau bevestigd** (zie §Verificatie #15). Daardoor domineert een lokaal duopolie — **Opus (Ecosoft)** en **Neodata** — dat kostencalculatie én Gantt/CPM-planning combineert in één pakket, in formaten die overheidsinstanties accepteren. Vrijwel elke Mexicaanse aannemer die op overheidswerk inschrijft heeft één van beide. ([opus-planet.mx](https://opus-planet.mx/blog/ley-de-obras-publicas-en-mexico/), [analisisdepreciosunitarios.com](https://analisisdepreciosunitarios.com/que-es-mejor-opus-o-neodata))
2. **Internationale planningstools als tweede laag.** **Microsoft Project** is de feitelijke standaard voor "pure" Gantt/CPM-planning bij aannemers en ingenieursbureaus; **Oracle Primavera P6** is de norm bij grote infrastructuur, olie & gas (Pemex-omgeving), energie (CFE) en industriële EPC-projecten — zichtbaar in vacatures voor "programador de obra" met P6-eis ([Indeed México](https://mx.indeed.com/q-programador-de-obra-empleos.html)) en een levendig P6-cursusaanbod ([cursosopus.com](https://cursosopus.com/curso-primavera-p6/), [controldeproyectos.com](https://controldeproyectos.com/courses/p6/)).

De markt is **prijsgevoelig**: perpetual licenties met lokale prijzen in MXN (Opus: MXN 15.740–38.360, ≈ USD 900–2.200 bij de koers van juli 2026) verslaan dure USD-abonnementen; piraterij van Opus/Neodata/MS Project is wijdverbreid (kopieën voor MXN 500–600 op MercadoLibre). Dat maakt Mexico kansrijk voor betaalbare, legale P6/MSP-alternatieven — mits met Spaanse UI, ondersteuning van overheidsformaten en lokale prijsstelling.

**Marktomvang (schatting, met verhoogde onzekerheid):** projectmanagementsoftware in heel Latijns-Amerika zou USD 550,6 mln zijn geweest in 2023 (CAGR 17,7% t/m 2030, [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/latin-america)) — **dit cijfer kon in juli 2026 niet onafhankelijk worden bevestigd** (bron achter 403; geen enkele externe vindplaats van "550,6 mln"). Een onafhankelijke tweede meting komt lager uit: Cognitive Market Research schat de PM-softwaremarkt in **Zuid-Amerika** op USD 357,56 mln in 2024 bij 15,4% CAGR ([Cognitive Market Research](https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report)). Mexico's CAGR van **14,7% (2023–2030) is verbatim bevestigd**, maar komt uit een **Noord-Amerika**-rapport waarin Mexico wordt vergeleken met de VS en Canada — niet met LatAm-landen; de eerdere kwalificatie "hoogste CAGR van de regio [LatAm]" is dus geschrapt ([KBV Research](https://www.kbvresearch.com/north-america-project-management-software-market/)). **Schatting: Mexico ≈ USD 110–140 mln (2023) voor alle PM-software; het bouw-specifieke plannings-/schedulingsegment ≈ USD 25–45 mln/jaar** (redenering in §2). Behandel deze bandbreedtes als orde-van-grootte, niet als meting.

---

## 2. Marktomvang

### Onderliggende bouwmarkt

| Indicator | Waarde | Jaar | Bron |
|---|---|---|---|
| Mexicaanse bouwmarkt | **USD 109,52 mrd (2025) → USD 114,07 mrd (2026) → USD 154,11 mrd (2035); CAGR 3,40% (2026–2035)** | 2025 | [NextMSC](https://www.nextmsc.com/report/mexico-construction-market) |
| Bouwproductiegroei | +3,6% (2025), gedempt door VS-tarieven; andere raming: −3,6% in 2025, herstel 2,6%/jr 2026–2029 | 2025 | [GlobalData via GlobeNewswire](https://www.globenewswire.com/news-release/2025/10/31/3178190/0/en/Mexico-Construction-Industry-2025-Output-to-Expand-by-3-6-This-Year-As-Nearshoring-Tailwinds-Soften-the-Effects-of-US-Tariffs-and-Slashed-Remittances-Inflows-Forecast-to-2029.html), [Yahoo Finance/GlobalData](https://finance.yahoo.com/news/mexico-construction-industry-report-2025-151700255.html) |
| Spoorprogramma (Plan México) | MXN 1,2 biljoen (≈ USD 69 mrd @ 17,47), 5.645 km, 24 staten, tot 2030 | 2025–2030 | [GlobeNewswire](https://www.globenewswire.com/news-release/2026/02/12/3237443/0/en/Mexico-Construction-Industry-Databook-Report-2026-Nearshoring-Data-Centers-Rail-Megaprojects-Accelerates-the-Next-Investment-Cycle-Forecast-to-2030.html) |
| Elektriciteitsplan 2025–2030 | MXN 624,6 mrd (≈ USD 35,8 mrd @ 17,47), 29,1 GW | 2025–2030 | idem |
| Snelwegenprogramma 2025–2030 | MXN 173 mrd (≈ USD 9,9 mrd @ 17,47) | 2025 | idem |

> **[Gecorrigeerd juli 2026 — grootste fout in dit rapport]** De eerdere regel "USD 341,4 mrd (2024); prognose USD 604,6 mrd in 2030 (CAGR 9%)" was **op alle drie de punten onjuist** en werd bovendien aan NextMSC toegeschreven. De opgevraagde NextMSC-pagina meldt USD **109,52 mrd (2025)** → USD **154,11 mrd (2035)** bij **3,40% CAGR** — een factor ~3 lager in niveau en ~3x lager in groei. De oude cijfers waren ook intern inconsistent: 341,4 → 604,6 over zes jaar impliceert 10,0% CAGR, niet 9%. Gebruik de bovenstaande, actuele reeks. ([NextMSC](https://www.nextmsc.com/report/mexico-construction-market))

> **[Gecorrigeerd juli 2026 — wisselkoers]** De USD-equivalenten van de megaprogramma's waren gebaseerd op een impliciete koers van ~20,0–20,7 MXN/USD (USD 58 / 31,3 / 8,5 mrd). De DOF-gemiddelde koers over juli 2026 was **17,47 MXN/USD** (bandbreedte 17,39–17,60; Banxico-FIX 17,5130 op 25-07-2026), waardoor de USD-bedragen 15–18% te laag stonden. De MXN-bedragen zelf zijn onveranderd en blijven de betrouwbaarste weergave.

*Let op: de richting blijft eenduidig — een grote markt met veel infrastructuur- en industriebouw, precies de segmenten die formele CPM-planning vragen — maar het absolute niveau is fors lager dan eerder in dit rapport stond.*

### Softwaremarkt

| Indicator | Waarde | Jaar | Bron |
|---|---|---|---|
| PM-software Latijns-Amerika | USD 550,6 mln; CAGR 17,7% (2024–2030) — **niet verifieerbaar**, zie noot | 2023 | [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/latin-america) |
| PM-software Zuid-Amerika (2e meting) | USD 357,56 mln; CAGR 15,4% t/m 2031 | 2024 | [Cognitive Market Research](https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report) |
| LatAm-aandeel in wereldmarkt | 8,3%; Brazilië nr. 1, daarna Mexico, Argentinië, Colombia — **onbevestigd** | 2023/24 | idem (via zoekresultaat) |
| Mexico CAGR PM-software | 14,7% (2023–2030) — **binnen Noord-Amerika** (VS/Canada/Mexico), niet binnen LatAm | 2023 | [KBV Research](https://www.kbvresearch.com/north-america-project-management-software-market/) |

> **[Gecorrigeerd juli 2026 — bronattributie]** Het KBV-rapport dekt "U.S., Mexico, Canada, and Rest of North America" en stelt letterlijk: *"the Mexico market would witness a CAGR of 14.7% during (2023 - 2030)"* (rapport-CAGR 13,1%, basisjaar 2023, VS-markt USD 4.787,9 mln in 2030). Het percentage klopt dus, maar KBV **vergelijkt Mexico nergens met LatAm-landen**; de bewering "hoogste CAGR van LatAm" had geen bron en is verwijderd.

> **[Onzeker juli 2026]** Het Grand View-cijfer (USD 550,6 mln) kon niet worden gereproduceerd: de bronpagina gaf 403 en een exacte-frase-zoektocht op "550.6 million" leverde nul vindplaatsen op. De enige onafhankelijke regionale meting die wél te vinden was, ligt lager en dekt een kleiner gebied (Zuid-Amerika, USD 357,56 mln in 2024). Alle Mexico-afgeleiden hieronder erven deze onzekerheid.

**Schatting Mexico (expliciet gemarkeerd als schatting):**
- Als Brazilië ~35–40% van de LatAm-markt pakt en Mexico ~20–25%, dan is **PM-software in Mexico ≈ USD 110–140 mln (2023)**, richting **≈ USD 285–365 mln in 2030** bij 14,7% CAGR.
  - **[Gecorrigeerd juli 2026 — rekenfout]** Hier stond "USD 250–300 mln in 2030". Dat is te laag: 1,147⁷ = 2,612 (2023→2030 is zeven jaar compounding), dus 110 × 2,612 ≈ 287 en 140 × 2,612 ≈ 366. De juiste doorrekening is **USD 285–365 mln**. NB: de aanname dat Brazilië duidelijk groter is dan Mexico staat op gespannen voet met de Statista-rangorde uit §1 — als Mexico feitelijk de grootste bouwmarkt is, is dit aandeel eerder een onder- dan een overschatting.
- Het bouw-specifieke plannings-/schedulingsegment (Gantt/CPM: P6, MS Project-gebruik in bouw, Opus/Neodata-planningsmodules, lean-planningstools) is daarvan naar schatting 20–30%: **≈ USD 25–45 mln/jaar**. Onderbouwing: bouw is in Mexico een van de grootste PM-softwareafnemers vanwege de LOPSRM-verplichtingen, maar het gros van Opus/Neodata-omzet zit in calculatie (precios unitarios), niet in pure scheduling.
- **Aantal planners (schatting):** de bouwsector telt honderdduizenden bedrijven (CMIC claimt zelf **"más de 18 mil empresas del sector construcción"** — ruim 18.000 aangesloten bouwbedrijven, niet de eerder genoemde ~10.000; [CMIC](https://www.cmic.org/delegaciones/); er zijn daarnaast tienduizenden actieve aannemers op overheidsaanbestedingen). Computrabajo toonde ~1.900 openstaande bouw-vacatures, waaronder tientallen expliciet "programador de obra" met P6/MSP-eis ([Computrabajo](https://mx.computrabajo.com/trabajo-de-programador-de-obra)). Schatting: **orde 30.000–60.000 professionals** die regelmatig planningssoftware (Gantt/CPM) bedienen; het aantal Opus/Neodata-calculatiegebruikers ligt aanzienlijk hoger (orde 100.000+, inclusief zzp'ers en studenten).

---

## 3. Gebruikte software: marktpositie en prijzen

### Rangorde (kwalitatief, gebaseerd op vacatures, cursusaanbod, resellerlandschap en vakmedia)

**Tier 1 — de Mexicaanse standaard (calculatie + planning gecombineerd):**

#### 1. Opus (Ecosoft) — lokale marktleider
- **Wie:** vrijwel alle mkb- en middelgrote aannemers die op overheidswerk inschrijven; ook overheden zelf (module "Dependencias"). Zeer sterk in obra pública. ([ecosoft.com.mx](https://www.ecosoft.com.mx/pages/modulo-presupuesto.html), [opus-planet.mx](https://opus-planet.mx/))
- **Wat:** Módulo 1 Presupuesto Programable (calculatie + programmeerbaar budget), **Módulo 2 Planeación y Control (Gantt/ruta crítica, voortgang, resources)**, Módulo 3 Compras; database ECOSTOS (60.000+ insumos, 200+ parametrische matrices).
- **Prijs:** permanente licenties (*"LICENCIA PERMANENTE"*) **MXN 15.740 – 38.360** (≈ **USD 900–2.200** @ 17,47 MXN/USD, juli 2026) afhankelijk van module en updateperiode; de leverancier biedt **vier** updatetermijnen: 6 maanden, 1, 2 of 3 jaar gratis updates. Huidige versie: **OPUS 25** (uitgebracht mei 2025). Modules: M1 Presupuesto programable, M2 Planeación y control, M3 Administración de compras, plus de gebundelde OPUS Suite de obras ([opus-planet.mx/precios](https://opus-planet.mx/precios/)).
  - **[Gecorrigeerd juli 2026 — licentiemodel]** Eerder stond "complete Suite de Obra ≈ MXN 32.000–35.000/**jaar**". Dat is fout: het volledige assortiment op de prijspagina is **perpetual**, geen jaarabonnement. De MXN 38.360 aan de bovenkant van de band is een eenmalige, permanente licentie (Suite met de langste updatetermijn), geen jaarbedrag.
  - **[Onzeker juli 2026]** De per-module bedragen (Módulo 1 ≈ MXN 18.000–20.000) en het onderhoudstarief (MXN 7.245–13.755/jr) staan **niet** op de prijspagina van de leverancier — die toont alleen de band MXN 15.740–38.360 en zet de exacte bedragen achter keuzemenu's. Deze subcijfers stammen uit een derdenblog en zijn niet onafhankelijk bevestigd; behandel ze als indicatief.
- **Positie:** CapEx-model (perpetual + updates); gepercipieerd als moderner en gebruiksvriendelijker dan Neodata; het aanbestedingsmodule-ecosysteem is een moat.

#### 2. Neodata — de andere helft van het duopolie
- **Wie:** van zzp-calculators tot grote corporates; grote aannemers gebruiken ook Neodata ERP Construcción voor multi-project financieel beheer. ([neodata.mx](https://neodata.mx/precios-unitarios))
- **Wat:** Precios Unitarios (met programa de obra/Gantt), ERP Construcción; database ConstruBase.
- **Prijs:** publiceert geen lijstprijzen; via distributeurs. Marktreferentie: **PU Win+ ≈ MXN 11.350/jaar** ([analisisdepreciosunitarios.com](https://analisisdepreciosunitarios.com/que-es-mejor-opus-o-neodata)); NB: aanbiedingen van MXN 500–600 op MercadoLibre/softmex zijn illegale kopieën — een indicator van de omvangrijke piraterij in dit segment ([MercadoLibre](https://listado.mercadolibre.com.mx/neodata-precios-unitarios)).
  - **[Gecorrigeerd juli 2026 — licentiemodel]** De typering "abonnement, OpEx" als *het* Neodata-model is onjuist. Neodata PU Win+ wordt in de markt in **twee** varianten aangeboden: een **"Versión Permanente, Sin Nube"** (perpetual) en een aparte **jaarlicentie** ("vigencia de un año") via distributeurs zoals NOORHS Latinoamérica. Het bedrag van MXN 11.350 hoort bij de jaarvariant, niet bij het hele portfolio. (Actuele build ten tijde van controle: PU Win+ v25.6.0, januari 2026.)
  - **[Onzeker juli 2026]** Het bedrag MXN 11.350/jaar zelf kon niet bij een distributeur worden geverifieerd (prijspagina's gaven 429/403). Eén derdenblog is de enige vindplaats — behandel als indicatief, niet als lijstprijs.
- **Positie:** duopolist met Opus; sterker in grote organisaties (ERP), lager instapmodel voor freelancers.

**Tier 2 — internationale planningsstandaarden:**

#### 3. Microsoft Project — de breedste "echte" planner
- **Wie:** aannemers, ingenieursbureaus, projectmanagementbureaus, industrie; standaard onderwezen door CMIC/ICIC ("Planeación y Control de Proyectos de Construcción con Microsoft Project") ([cmic.org.mx](https://www.cmic.org.mx/servicios/icic/)).
- **Prijs (es-mx, gecontroleerd juli 2026):** **"Planner y Project Plan 3": USD 30,00 per gebruiker per maand, jaarlijks betaald** (= **USD 360/jaar**), excl. IVA; **Planner Plan 1: USD 10,00** per gebruiker/maand jaarlijks betaald ([microsoft.com/es-mx](https://www.microsoft.com/es-mx/microsoft-365/planner/microsoft-planner-plans-and-pricing) — identiek aan de en-us-pagina).
  - **[Gecorrigeerd juli 2026 — prijs]** Hier stond "USD 36/gebruiker/maand of USD 360/jaar". Dat was intern tegenstrijdig (36 × 12 = 432, niet 360) én te hoog: Microsofts eigen Mexicaanse pagina noemt letterlijk *"USD$30.00 usuario al mes, pagado anualmente"*. Het jaarbedrag van USD 360 klopt; het maandbedrag is **USD 30**, niet 36. Let op de conventie: dit is een **jaarcontract dat maandelijks wordt weergegeven**, geen maand-tot-maand-prijs.
  - **[Bevestigd juli 2026]** **Project Plan 5 gaat per 1 mei 2026 End of Sale** — en gaat verder dan het rapport meldde: de dienst wordt op **30 september 2026 volledig uitgefaseerd** (werkt daarna niet meer), samen met Project Online Essentials. Microsoft-bericht MC1253809 ([tophhie.cloud/MC1253809](https://www.tophhie.cloud/m365-message-center/message/mc1253809/), [UT Arlington OIT](https://websites.uta.edu/oit/2026/04/10/project-essentials-retirement/)). Dat is voor Mexicaanse Plan 5-gebruikers een concreet migratiemoment — en een verkoopkans voor alternatieven.
  - Desktop-perpetuals (Project Standard/Professional) via resellers als office365mexico.com.mx.
- **Positie:** #1 in gebruiksbreedte voor pure scheduling; USD-prijs is voor kleine bureaus fors → veel oude/illegale desktopversies in omloop.

#### 4. Oracle Primavera P6 — standaard voor groot werk
- **Wie:** olie & gas (Pemex-contractors), energie (CFE-projecten), grote infra- en industriële EPC's, internationale aannemers en nearshoring-fabrieksbouwers; vacatures eisen expliciet P6 (o.a. Grupo Constructor Industrial, Atitalaquia — industriegordel Hidalgo) ([Indeed](https://mx.indeed.com/q-programador-de-obra-empleos.html), [OCC](https://www.occ.com.mx/empleos/de-primavera-project/)).
- **Prijs:** Oracle publiceert **geen openbare prijslijst** voor Primavera (de officiële price-list-PDF is offline/404), dus alle bedragen zijn afgeleid van partners en resellers en lopen sterk uiteen. Bandbreedte na hercontrole: **perpetual ≈ USD 2.500–4.240 per named user** + **22% support/jaar**; **cloud ≈ USD 3.600 per gebruiker/jaar bij afname vanaf 25 gebruikers**.
  - **[Gecorrigeerd juli 2026 — prijs]** Eerder stond "perpetual ≈ USD 3.500–3.520 per seat" en "cloud ≈ USD 1.300–2.500 per gebruiker/jaar". Beide bands zijn te smal respectievelijk te laag. Een Oracle-partner-prijslijst (bijgewerkt juni 2025) noemt **P6 Professional USD 3.880** met **USD 854 eerstejaars support (22%)** en **P6 EPPM USD 4.240** met **USD 933 support**, plus **P6 Cloud USD 305 per gebruiker per maand met een minimum van 25 gebruikers** — dat is **≈ USD 3.660 per gebruiker per jaar**, ruwweg het **anderhalf- tot bijna drievoudige** van de eerder genoemde cloudband ([PRM Yazılım, Oracle-partner](https://prmyazilim.com/en/primavera-p6-pricing)). Aggregators noemen daarnaast USD 2.500–3.500 per gebruiker perpetual ([ITQlick](https://www.itqlick.com/primavera-p6/pricing), [Contractors&Builders](https://contractorsandbuilders.com/pricing/oracle-primavera/)). **Conclusie: het 22%-supportpercentage is bevestigd, maar de absolute P6-bedragen zijn onzeker en licentie-SKU-afhankelijk — noem ze altijd als band, nooit als één getal.** Het minimum van 25 cloudgebruikers is voor Mexicaanse mkb-aannemers een extra, vaak onderbelichte drempel.
  - Verkoop in Mexico via Oracle-partners/gecertificeerde distributeurs (o.a. PSG) en zelfs Amazon MX ([amazon.com.mx](https://www.amazon.com.mx/Primavera-Professional-Project-Management-Software/dp/B01EZ30VX8)).
- **Positie:** onbetwiste norm in het topsegment; groot cursusecosysteem in het Spaans ([cursosopus.com](https://cursosopus.com/curso-primavera-p6/) — P6-basiscursus MXN 1.750; [controldeproyectos.com](https://controldeproyectos.com/courses/p6/), [idtamexico.com](http://www.idtamexico.com/idta/cursos-de-primavera-project-planer/), [leanconstructionmexico.com.mx](https://www.leanconstructionmexico.com.mx/post/planificaci%C3%B3n-de-proyectos-con-primavera-p6)). Voor mkb onbetaalbaar → ruimte voor alternatieven.

**Tier 3 — cloud/SaaS-uitdagers en lean-tools:**

#### 5. Prisma Master (Prisma Platforms) — Mexicaanse cloud-uitdager
- **Wie:** moderne mkb-aannemers en calculatiebureaus; positioneert zich als "het enige 100% cloud precios-unitarios-pakket van Mexico", maandelijks geüpdatete database, **Procore- en BIM-integratie** ([prismamaster.mx](https://prismamaster.mx/)).
- **Prijs:** abonnementen (maandelijks); lijstprijzen achter demo-muur ([prismamaster.mx/planes](https://prismamaster.mx/planes)).
- **Voordelen (eigen analyse, zie §5):** cloud, samenwerking, lage instap, Procore-koppeling, eigen academy. **Nadelen:** jong, kleinere database dan Ecostos/ConstruBase, minder geaccepteerd als "standaard" bij dependencias, internetafhankelijk.

#### 6. ProPlanner (IPSUM) — Latijns-Amerikaans/Mexicaans lean-planningsplatform
- **Wie:** general contractors die Lean/Last Planner System toepassen; opgericht 2016 in LatAm (nu VS); gebruikt in 10+ landen, partner van o.a. Haskell ([ipsumapp.co](https://www.ipsumapp.co/), [Highways Today](https://highways.today/2021/08/10/ipsum-proplanner/)).
- **Financiering (gecorrigeerd juli 2026):** de ronde van **>USD 2,7 mln (aangekondigd 23 juni 2022)** werd **geleid door Insight Partners**, met **Dysruptek** (de VC-arm van The Haskell Company), **Suffolk Technologies**, **STO Building Group** en **Thornton Tomasetti**, plus angels Riggs Kubiak en Meirav Oren ([PR Newswire, primaire aankondiging](https://www.prnewswire.com/news-releases/proplanner-raises-more-than-2-7-million-to-transform-construction-scheduling-301574278.html)).
  - **[Gecorrigeerd juli 2026 — investeerders]** Eerder stond "gefinancierd door Cemex Ventures, Manutara en Insight Partners (USD 2,7 mln ronde)". Dat **klopt alleen voor Insight Partners** en vermengt twee financieringsrondes: **Cemex Ventures** en **Dreamit** waren vroegere (seed-)investeerders — samen ~USD 1 mln volgens [Tracxn](https://tracxn.com/d/companies/ipsum/) — en worden **niet genoemd** in het persbericht van de USD 2,7 mln-ronde. **Manutara is in geen van beide bronnen terug te vinden.** De strategische kern van deze cap table is dus niet het Cemex-netwerk maar een cluster van **Amerikaanse GC's/engineers** (Haskell, Suffolk, STO, Thornton Tomasetti) — relevant, want dat verklaart de VS-kanteling en verzwakt het argument dat ProPlanner via Cemex een Mexicaans distributievoordeel heeft.
- **Prijs:** SaaS, prijs op aanvraag.
- **Voordelen (eigen analyse):** Spaanstalig, web + mobiel, expliciet gericht op vervanging van "MS Project + Excel"-workflows, Cemex-netwerk. **Nadelen:** lean-planning is complementair aan (niet vervangend voor) CPM-contractplanning; adoptie vereist cultuurverandering; klein bedrijf.

#### 7. Procore — groeiend bij grotere aannemers
- Construction-managementplatform (met scheduling-module en MS Project/P6-koppeling); in Spaanstalige markten actief gepusht; integratiepartner van Prisma Master ([procore.com/es-es](https://www.procore.com/es-es/gestion-de-proyectos), [comparasoftware.com](https://www.comparasoftware.com/construccion)). Prijs: op aanvraag (typisch % van projectvolume). Positie in Mexico: top-segment GC's en ontwikkelaars; nog beperkt in mkb door prijs.

#### 8. Generieke work-managementtools: Smartsheet, Monday.com, Wrike, Asana
- Gebruikt door ontwikkelaars, PMO's en industriële klanten voor voortgangsbewaking over meerdere bouwfronten; genoemd in Mexicaanse overzichten van bouwsoftware ([comparasoftware.com](https://www.comparasoftware.com/construccion), [brickwalling.mx](https://brickwalling.mx/project-management-en-construccion-por-que-es-clave-para-evitar-sobrecostos-y-retrasos/)). Prijzen: Monday ~USD 9–19, Wrike ~USD 10–25 per gebruiker/maand (internationale lijstprijzen). **[Onzeker/gecorrigeerd juli 2026]** De eerder genoemde band voor **Smartsheet (USD 9–19)** ligt te laag: Smartsheets eigen prijspagina hanteert inmiddels Pro- en Business-tarieven **boven** die band (orde USD 12–24 per member/maand bij jaarfacturatie, hoger bij maandfacturatie), met Enterprise op offertebasis en een minimum van 3 members voor Business ([smartsheet.com/pricing](https://www.smartsheet.com/pricing)). De exacte bedragen waren bij controle niet betrouwbaar uit te lezen — behandel als indicatief. Positie: complementair; geen serieuze CPM-motoren, maar ze eten wel budget uit dezelfde pot.

#### 9. Gratis/open source: ProjectLibre, GanttProject, OpenProject
- **ProjectLibre** wordt in de Spaanstalige wereld breed gepromoot als gratis MSP-alternatief en in onderwijs/mkb gebruikt (compatibel met .mpp) ([guiasopensource.net](https://guiasopensource.net/aplicaciones-de-escritorio/projectlibre-alternativa-open-source-microsoft-project/), [luisreyes.es](https://luisreyes.es/cinco-alternativas-libres-de-microsoft-project/)). In een piraterijgevoelige markt is "gratis en legaal" een reëel kanaal; belangrijke benchmark voor elk betaalbaar alternatief.

**Tier 4 — ERP's met planningsfunctie en niche-tools:**

#### 10. Enkontrol — Mexicaanse bouw-ERP (40+ jaar, 450+ klanten)
- ERP voor constructoras/inmobiliarias: precios unitarios, control de obra, **programas de obra**, inkoop, GIS, REPSE-portal ([enkontrol.com](https://enkontrol.com/)). Prijs: op aanvraag (enterprise). Planning is hier een ERP-module, geen standalone planner.
- Vergelijkbare Mexicaanse ERP/controle-spelers: **AddControl ERP** ([addcontrol-erp.com](https://addcontrol-erp.com/)), ProyecPro, SQL Obras, DataObra, Auranet ([comparasoftware.com](https://www.comparasoftware.com/construccion)).

#### 11. Campeón Plus (Maldonado Software) — legacy-nichespeler
- Ooit volwaardig calculatie+planning+boekhouding-pakket; vandaag sterk gekrompen t.o.v. Opus/Neodata, moeilijk vindbare prijzen/support → legacy-status ([analisisdepreciosunitarios.com](https://analisisdepreciosunitarios.com/que-es-mejor-opus-o-neodata)). Zie §5 voor voor-/nadelen.

#### 12. Touchplan, Bentley Synchro, TILOS, ALICE — internationale niches
- **Touchplan** (Last Planner-SaaS) wordt in LatAm via lean-consultancies verkocht ([touchplan.io](https://touchplan.io/)). **Synchro 4D/TILOS/ALICE**: geen bewijs gevonden van brede Mexicaanse adoptie; het Tren Maya-project draaide vooral op ISTRAM ISPOL + BIM-methodiek voor engineering ([istram.mx](https://www.istram.mx/tren-maya/), [rfaeco.com](https://www.rfaeco.com/bim-e-istram-en-el-tren-maya/)) — 4D-scheduling-tools blijven vooralsnog marginaal. **Asta Powerproject, Spider Project, Sciforma, Safran, Deltek Open Plan, Phoenix, nPlan, Nodes & Links: geen noemenswaardige Mexicaanse aanwezigheid gevonden** (geen Spaanstalige resellers/cursussen/vacatures aangetroffen — afwezigheid als bevinding).

---

## 4. Lokale bijzonderheden

1. **Wettelijk kader stuurt de toolkeuze.** De LOPSRM en het bijbehorende reglement verplichten inschrijvers op federale obra pública tot gedetailleerde programma's (uitvoering, personeel, machines, materialen) en eenheidsprijsanalyses in door de dependencia voorgeschreven formaten; ook staats-/gemeentelijk werk volgt gelijkaardige handleidingen ([LOPSRM, diputados.gob.mx](https://www.diputados.gob.mx/LeyesBiblio/pdf/LOPSRM.pdf), [Reglamento](https://www.diputados.gob.mx/LeyesBiblio/regley/Reg_LOPSRM.pdf), [gids Universidad Veracruzana](https://www.uv.mx/contraloria/files/2013/02/11.Guia-para-la-Planeacion-Programacion-Presupuestacion-Adjudicacion-Ejecucion-y-Entrega-Recepcion-de-la-Obra-Publica-Contemplada-en-los-Municipios.pdf)). Opus en Neodata bestaan bij gratie van deze formaten — **een buitenlands planningspakket zonder export naar deze aanbestedingsformaten kan het obra-pública-segment niet bedienen.** Anders dan in bv. de VS is er géén algemene "P6/XER verplicht"-eis; P6 wordt de facto geëist in de Pemex/CFE/EPC-wereld, niet de jure in de wet.
   - **[Bevestigd + geactualiseerd juli 2026]** De kernbewering is overeind gebleven: er is **geen wettelijke verplichting tot P6 of enig ander specifiek pakket**; de wet schrijft *deliverables en formaten* voor, geen software. Wél ontbrak een belangrijke actualisering: de LOPSRM (oorspronkelijk DOF **04-01-2000**) is **niet vervangen door een nieuwe wet**, maar wel **ingrijpend hervormd** door een decreet "por el que se reforman, adicionan y derogan diversas disposiciones" gepubliceerd in het DOF op **16 april 2025**, gevolgd door een verdere hervorming op **14 november 2025** (harmonisatie met het Código Nacional de Procedimientos Civiles y Familiares). De wet telt daarmee twaalf hervormingen sinds 2000 ([diputados.gob.mx, reformhistorie LOPSRM](https://www.diputados.gob.mx/LeyesBiblio/ref/lopsrm.htm)). Wie het obra-pública-segment bedient, moet de post-april-2025-versie volgen; de bronlinks in dit rapport zijn bijgewerkt van `http://` naar `https://`.
   - **[Onzeker juli 2026]** De specifieke bewering dat de aanbestedingsstukken expliciet een **"ruta crítica"** (kritiek pad) eisen, kon **niet op artikelniveau in de wet of het Reglamento worden geverifieerd** (zoekmachines blokkeerden, wetsteksten niet doorzoekbaar binnen de controle). Dat gedetailleerde *programas de ejecución* verplicht zijn, is breed gedocumenteerd; dat de term "ruta crítica" een **wettelijke** eis is, blijft onbevestigd en steunt in dit rapport op één leveranciersblog (opus-planet). Niet als juridisch feit presenteren zonder artikelverwijzing.
2. **Duopolie met database-lock-in.** Ecostos (Opus) en ConstruBase (Neodata) — actuele insumo-prijsdatabases — creëren hoge overstapkosten en versterken het duopolie ([analisisdepreciosunitarios.com](https://analisisdepreciosunitarios.com/que-es-mejor-opus-o-neodata)).
3. **Prijsgevoeligheid en piraterij.** Illegale kopieën van Opus/Neodata voor MXN 500–600 worden openlijk verkocht ([sistemascontables.info](https://sistemascontables.info/construccion/neodata-pu-win-2025), [MercadoLibre](https://listado.mercadolibre.com.mx/costo-licencia-neodata-precios-unitarios)). Legale, betaalbare alternatieven (of freemium) hebben hier een reële opening; pure USD-prijsstelling is een handicap — lokale MXN-prijzen en perpetual opties worden gewaardeerd.
4. **Sterke opleidings-/certificeringscultuur.** CMIC's opleidingsinstituut ICIC (sinds 1978) geeft landelijk cursussen "Planeación y Control con Microsoft Project" en Opus-seminars ([cmic.org.mx](https://www.cmic.org.mx/servicios/icic/), [icic.org.mx](https://icic.org.mx/cursos/)); UNAM's División de Educación Continua doceert Neodata ([mineria.unam.mx](https://www.mineria.unam.mx/neodata-basico-%28precios-unitarios%29-CDA371-2025)); talloze private P6-academies ([controldeproyectos.com](https://controldeproyectos.com/courses/p6/), [aprendum.mx](https://www.aprendum.mx/curso-online-planificacion-y-control-proyectos-con-oracle-primavera-p6/)). Wie de markt in wil, moet dit kanaal (cursussen, certificaten, universiteiten) bespelen — tools worden geleerd vóór ze gekocht worden.
5. **Nearshoring verschuift de vraag.** Industriële fabrieksbouw (VS/Aziatische opdrachtgevers, EPC-contracten) importeert P6-/Procore-workflows en Engelstalige rapportage-eisen naar Monterrey, Saltillo, Querétaro en de Bajío — daar groeit de vraag naar P6-planners het hardst (vacature-clusters in industriële corridors, [Indeed](https://mx.indeed.com/q-programador-de-obra-empleos.html)).
6. **Taal:** Spaans is een harde eis voor mkb en overheid; het topsegment (EPC/nearshoring) werkt tweetalig. RTL/i18n-inspanning is beperkt: één taal opent de hele markt plus de rest van Spaanstalig LatAm.
7. **Lean Construction-beweging.** Actieve gemeenschap (Lean Construction México, IPSUM/ProPlanner, Cemex-ecosysteem) — Last Planner wordt gepromoot als aanvulling op CPM ([leanconstructionmexico.com.mx](https://www.leanconstructionmexico.com.mx/en), [leanconstructionblog.com](https://leanconstructionblog.com/Last-Planner-and-Takt-Software-Directory.html)).

---

## 5. Voor- en nadelen van lokale/niche-pakketten

### Opus (Ecosoft) — Mexicaans
| Voordelen | Nadelen |
|---|---|
| De facto standaard voor obra pública; formaten door dependencias geaccepteerd | Desktop/Windows-centrisch; cloud-functionaliteit beperkt |
| Modern(ste) UI van het duopolie; lagere leercurve ([vergelijking](https://analisisdepreciosunitarios.com/que-es-mejor-opus-o-neodata)) | Planning (Módulo 2) is functioneel basaal vergeleken met P6/MSP (geen geavanceerd resource-leveling/baselines-beheer) |
| Ecostos-database (60.000+ insumos), FASAR-updates | Perpetual + langere updatetermijn loopt op tot MXN 38.360 voor multi-module gebruik (eenmalig, niet per jaar — zie §3) |
| Permanente licentie (geen verplicht abonnement) | Lock-in op eigen bestandsformaat; zwakke interoperabiliteit (geen IFC/XER) |
| Groot distributeurs- en cursusnetwerk | Veel piraterij ondermijnt legale waardeperceptie |

### Neodata — Mexicaans
| Voordelen | Nadelen |
|---|---|
| Duopolist; ERP Construcción voor grote organisaties | Interface geldt als gedateerder dan Opus |
| Laagdrempelige jaarlicentie (PU Win+ ≈ MXN 11.350/jr, indicatief) én een perpetual "Versión Permanente" | Geen publieke prijslijst; koop via distributeurs; prijs niet onafhankelijk te verifiëren |
| ConstruBase-database; UNAM doceert het | Desktop-architectuur; cloud beperkt |
| Sterke positie bij corporates (multi-project financieel) | Planningsmodule ondergeschikt aan calculatie; geen open uitwisselformaten |

### Prisma Master — Mexicaans (cloud)
| Voordelen | Nadelen |
|---|---|
| Enige 100% cloud-oplossing voor precios unitarios; samenwerking in realtime ([prismamaster.mx](https://prismamaster.mx/)) | Jonge speler; kleinere installed base en database |
| Maandelijkse database-updates; Procore/BIM-integratie | Abonnementsmodel stuit op CapEx-voorkeur van traditionele aannemers |
| Eigen academy + dubbelcertificering (marketingkanaal) | Acceptatie van outputformaten bij alle dependencias nog niet bewezen; internetafhankelijk |

### Campeón Plus (Maldonado Software) — Mexicaans (legacy)
| Voordelen | Nadelen |
|---|---|
| Lange trajectorie; ooit compleet (calculatie t/m boekhouding); loyale oude gebruikersbasis | Sterk gekrompen marktaandeel; schaarse informatie over actuele versies/prijzen/support ([bron](https://analisisdepreciosunitarios.com/que-es-mejor-opus-o-neodata)) |
| Goedkoop in tweedehands/legacy-context | Verouderde technologie; risico op discontinuïteit; nauwelijks cursusaanbod |

### ProPlanner (IPSUM) — Mexicaans/LatAm (lean)
| Voordelen | Nadelen |
|---|---|
| Spaanstalige, mobiele Last Planner-SaaS; USD 2,7 mln-ronde **geleid door Insight Partners** met Dysruptek/Suffolk/STO/Thornton Tomasetti ([PR Newswire](https://www.prnewswire.com/news-releases/proplanner-raises-more-than-2-7-million-to-transform-construction-scheduling-301574278.html)) | Geen CPM-contractplanner — vult P6/MSP aan, vervangt ze niet |
| Bewezen bij internationale GC's (Haskell), 10+ landen | Vereist lean-methodiekadoptie (cultuurdrempel); cap table is overwegend **Amerikaans**, niet Mexicaans — Cemex Ventures was een vroegere seed-investeerder, geen deelnemer aan de 2,7 mln-ronde |
| Web + app, gericht op vervanging Excel-chaos op de bouwplaats | Klein bedrijf, prijs op aanvraag, beperkte publieke reviews |

### Enkontrol / AddControl e.a. — Mexicaanse ERP's
| Voordelen | Nadelen |
|---|---|
| Diep-Mexicaans (REPSE, CFDI, obra pública-workflows); 450+ klanten, 40 jaar (Enkontrol, [enkontrol.com](https://enkontrol.com/)) | Enterprise-implementaties: duur, lange doorlooptijd |
| Programa de obra geïntegreerd met inkoop/financiën | Planning is bijzaak; geen geavanceerde CPM-engine; niet los te kopen |

---

## 6. Implicaties voor een betaalbaar P6/MSP-alternatief (zoals Open Planner Studio)

*(analyse, geen brongegeven)*

- **Opening:** het gat tussen "gratis-maar-beperkt/illegaal" (ProjectLibre, piraterij) en "duur-USD" (P6 ≈ USD 2.500–4.240 perpetual of ~USD 3.660/gebruiker/jaar cloud vanaf 25 seats; MSP USD 360/jr) is in Mexico groter dan in NW-Europa; een legale planner met lokale prijs in MXN, Spaanse UI en solide CPM zit precies in dat gat. Ter kalibratie: USD 360/jaar is ≈ MXN 6.300 per gebruiker per jaar bij de koers van juli 2026 — dat is de prijsdrempel waar een alternatief onder moet blijven.
- **Extra tijdvenster (nieuw, juli 2026):** de **End of Sale van Project Plan 5 op 1 mei 2026 en de volledige uitfasering op 30 september 2026** dwingen elke Mexicaanse Plan 5-/Project Online-gebruiker tot een migratiebesluit binnen dit kalenderjaar. Dat is een scherp afgebakend instapmoment voor een alternatief.
- **Vereisten:** (1) vlekkeloze Spaanse lokalisatie; (2) import/export MPP/XER om naast de gevestigde orde te functioneren; (3) exporteerbare programas de obra in door dependencias geaccepteerde vormen (Excel-sjablonen!) als opstap naar obra pública; (4) cursus-/academiestrategie via ICIC/universiteiten.
- **Niet doen:** concurreren met Opus/Neodata op precios unitarios — dat is een ander product met database-moat.

---

## 7. Bronnen

**Markt & macro**
- https://www.grandviewresearch.com/horizon/outlook/project-management-software-market/latin-america — LatAm PM-software USD 550,6 mln (2023), CAGR 17,7% — *niet verifieerbaar juli 2026 (403)*
- https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report — Zuid-Amerika PM-software USD 357,56 mln (2024), CAGR 15,4% *(onafhankelijke tweede meting)*
- https://www.kbvresearch.com/north-america-project-management-software-market/ — Mexico CAGR 14,7% *(binnen Noord-Amerika, niet LatAm)*
- https://www.nextmsc.com/report/mexico-construction-market — bouwmarkt **USD 109,52 mrd (2025) → 154,11 mrd (2035), CAGR 3,40%** *(vervangt de eerdere onjuiste 341,4/604,6/9%)*
- https://www.statista.com/statistics/1089163/value-construction-industry-latin-america-country/ — bouw-GDP LatAm per land (Mexico vs Brazilië)
- https://www.globenewswire.com/news-release/2026/02/12/3237443/0/en/Mexico-Construction-Industry-Databook-Report-2026-Nearshoring-Data-Centers-Rail-Megaprojects-Accelerates-the-Next-Investment-Cycle-Forecast-to-2030.html — spoor-/energie-/wegenprogramma's
- https://www.globenewswire.com/news-release/2025/10/31/3178190/0/en/Mexico-Construction-Industry-2025-Output-to-Expand-by-3-6-This-Year-As-Nearshoring-Tailwinds-Soften-the-Effects-of-US-Tariffs-and-Slashed-Remittances-Inflows-Forecast-to-2029.html — output +3,6% (2025)
- https://finance.yahoo.com/news/mexico-construction-industry-report-2025-151700255.html — alternatieve raming −3,6% (2025)
- https://www.trade.gov/country-commercial-guides/mexico-construction — US Commercial Guide bouw Mexico

**Software, prijzen, posities**
- https://opus-planet.mx/precios/ — Opus-prijzen MXN 15.740–38.360
- https://analisisdepreciosunitarios.com/cuanto-cuesta-el-programa-opus — Opus prijsgids 2025
- https://analisisdepreciosunitarios.com/que-es-mejor-opus-o-neodata — Opus/Neodata-vergelijking, prijzen, Campeón Plus, Prisma
- https://www.ecosoft.com.mx/pages/modulo-presupuesto.html — Opus M1
- https://neodata.mx/precios-unitarios — Neodata PU
- https://listado.mercadolibre.com.mx/neodata-precios-unitarios — piraterij-indicatie
- https://prismamaster.mx/ en https://prismamaster.mx/planes — Prisma Master
- https://www.microsoft.com/es-mx/microsoft-365/planner/microsoft-planner-plans-and-pricing — **Planner y Project Plan 3: USD 30,00/gebruiker/maand, jaarlijks betaald (= USD 360/jr)**; Planner Plan 1 USD 10,00
- https://www.tophhie.cloud/m365-message-center/message/mc1253809/ , https://websites.uta.edu/oit/2026/04/10/project-essentials-retirement/ — Project Plan 5 End of Sale 1-5-2026, volledige uitfasering 30-9-2026
- https://prmyazilim.com/en/primavera-p6-pricing — Oracle-partnerprijzen P6 (Pro USD 3.880 / EPPM USD 4.240 + 22%; Cloud USD 305 p/m, min. 25 users)
- https://www.prnewswire.com/news-releases/proplanner-raises-more-than-2-7-million-to-transform-construction-scheduling-301574278.html — ProPlanner USD 2,7 mln, geleid door Insight Partners (23-6-2022)
- https://www.diputados.gob.mx/LeyesBiblio/ref/lopsrm.htm — reformhistorie LOPSRM (hervormingen DOF 16-4-2025 en 14-11-2025)
- https://www.cmic.org/delegaciones/ — CMIC: "más de 18 mil empresas"
- https://www.taradigm.com/how-much-does-primavera-p6-cost/ — P6-prijzen
- https://www.projectmanagertemplate.com/post/primavera-p6-cost-understanding-license-vs-subscription-models — P6 licentie vs abonnement
- https://primaverascheduling.com/home/buy-primavera-software/ — P6 perpetual ~USD 3.500
- https://www.amazon.com.mx/Primavera-Professional-Project-Management-Software/dp/B01EZ30VX8 — P6 via Amazon MX
- https://www.ipsumapp.co/ , https://startup-weekly.com/Constructiontech-startup-ProPlanner-raises-2-7m-to-transform-construction-scheduling/ , https://highways.today/2021/08/10/ipsum-proplanner/ — IPSUM/ProPlanner
- https://enkontrol.com/ — Enkontrol ERP (450+ klanten)
- https://addcontrol-erp.com/ — AddControl
- https://www.comparasoftware.com/construccion — Mexicaans bouwsoftware-overzicht
- https://www.procore.com/es-es/gestion-de-proyectos — Procore ES
- https://touchplan.io/ , https://leanconstructionblog.com/Last-Planner-and-Takt-Software-Directory.html — lean-tools
- https://guiasopensource.net/aplicaciones-de-escritorio/projectlibre-alternativa-open-source-microsoft-project/ — ProjectLibre ES

**Regelgeving, opleiding, arbeidsmarkt**
- http://www.diputados.gob.mx/LeyesBiblio/pdf/LOPSRM.pdf — Ley de Obras Públicas
- http://www.diputados.gob.mx/LeyesBiblio/regley/Reg_LOPSRM.pdf — Reglamento LOPSRM
- https://opus-planet.mx/blog/ley-de-obras-publicas-en-mexico/ — LOPSRM-gids voor contractors
- https://www.uv.mx/contraloria/files/2013/02/11.Guia-para-la-Planeacion-Programacion-Presupuestacion-Adjudicacion-Ejecucion-y-Entrega-Recepcion-de-la-Obra-Publica-Contemplada-en-los-Municipios.pdf — programmeringsgids gemeentelijke obra pública
- https://www.cmic.org.mx/servicios/icic/ , https://icic.org.mx/cursos/ — CMIC/ICIC-opleidingen (MS Project, Opus)
- https://www.mineria.unam.mx/neodata-basico-%28precios-unitarios%29-CDA371-2025 — UNAM Neodata-cursus
- https://cursosopus.com/curso-primavera-p6/ , https://controldeproyectos.com/courses/p6/ , http://www.idtamexico.com/idta/cursos-de-primavera-project-planer/ , https://www.aprendum.mx/curso-online-planificacion-y-control-proyectos-con-oracle-primavera-p6/ — P6-cursussen Mexico
- https://mx.indeed.com/q-programador-de-obra-empleos.html , https://mx.computrabajo.com/trabajo-de-programador-de-obra , https://www.occ.com.mx/empleos/de-primavera-project/ — vacatures programador de obra (P6/MSP)
- https://www.istram.mx/tren-maya/ , https://www.rfaeco.com/bim-e-istram-en-el-tren-maya/ — Tren Maya-tooling

*Schattingen in dit rapport zijn expliciet als zodanig gemarkeerd; alle overige cijfers dragen een bron-URL.*

---

## Verificatie

*Adversariële fact-check, uitgevoerd 25 juli 2026. Methode: elke bewering is actief geprobeerd te **weerleggen** met bronnen die het rapport zélf niet noemde (leverancierspagina's, primaire wetsbronnen, persberichten, Oracle-partners, onafhankelijke marktbureaus). Doorgerekende schattingen zijn nagerekend. Waar een bron onbereikbaar was of bronnen elkaar tegenspreken, staat het oordeel op **onzeker** in plaats van dat de bewering blijft staan.*

**Samenvattend oordeel: 16 beweringen gecontroleerd — 4 bevestigd, 8 gecorrigeerd, 4 onzeker. De ernstigste fout is de omvang van de Mexicaanse bouwmarkt (factor ~3 te hoog). De strategische conclusies van §6 blijven overeind; de onderbouwende cijfers niet.**

| # | Bewering | Oordeel | Onderbouwing | Bron |
|---|---|---|---|---|
| 1 | Mexicaanse bouwmarkt USD 341,4 mrd (2024) → USD 604,6 mrd (2030), CAGR 9% | **Gecorrigeerd (ernstig)** | De geciteerde bron meldt bij navraag USD **109,52 mrd (2025)** → USD **154,11 mrd (2035)** bij **3,40%** CAGR — ruim een factor 3 lager in niveau én in groei. De oude cijfers waren daarnaast intern inconsistent: 341,4 → 604,6 over zes jaar impliceert 10,0% CAGR, niet 9%. | [nextmsc.com](https://www.nextmsc.com/report/mexico-construction-market) |
| 2 | Mexico is de **tweede** bouwmarkt van LatAm, na Brazilië | **Onzeker (betwist)** | Statista's overzicht van bouw-GDP per land zet Mexico in 2024 juist **eerste** in Latijns-Amerika en de Caraïben, met Brazilië tweede; andere bronnen noemen Brazilië dominant. Uitkomst hangt af van maatstaf (bouw-GDP vs. output vs. omzet) en wisselkoers. Geformuleerd als "een van de twee grootste". Dit raakt ook de aandeelaanname onder de marktomvangschatting. | [statista.com/topics/10673](https://www.statista.com/topics/10673/construction-industry-in-latin-america/), [statista.com/statistics/1089163](https://www.statista.com/statistics/1089163/value-construction-industry-latin-america-country/) |
| 3 | Mexico PM-software groeit met 14,7% CAGR, **de hoogste van LatAm** | **Gecorrigeerd** | Het percentage is verbatim juist (*"the Mexico market would witness a CAGR of 14.7% during (2023 - 2030)"*), maar komt uit een **Noord-Amerika**-rapport dat Mexico naast de VS, Canada en "Rest of North America" zet. KBV vergelijkt Mexico nergens met LatAm-landen. De superlatief is verwijderd. | [kbvresearch.com](https://www.kbvresearch.com/north-america-project-management-software-market/) |
| 4 | Doorrekening: Mexico USD 110–140 mln (2023) → **USD 250–300 mln in 2030** bij 14,7% CAGR | **Gecorrigeerd (rekenfout)** | 2023→2030 = 7 jaar compounding; 1,147⁷ = 2,612. 110 × 2,612 ≈ 287; 140 × 2,612 ≈ 366. Correcte uitkomst: **USD 285–365 mln**, niet 250–300. (De basisband 110–140 volgt wél correct uit 550,6 × 20–25%.) | eigen herberekening |
| 5 | LatAm PM-softwaremarkt USD 550,6 mln (2023), CAGR 17,7% | **Onzeker** | Bronpagina gaf 403; een exacte-frasezoektocht op "550.6 million" leverde **nul** onafhankelijke vindplaatsen op. De enige traceerbare regionale tweede meting ligt lager en dekt een kleiner gebied: Zuid-Amerika USD 357,56 mln (2024), 15,4% CAGR. Alle Mexico-afgeleiden erven deze onzekerheid. | [cognitivemarketresearch.com](https://www.cognitivemarketresearch.com/regional-analysis/south-america-project-management-software-market-report) |
| 6 | MS Project Plan 3 kost **USD 36/gebruiker/maand** of USD 360/jaar | **Gecorrigeerd** | Microsofts eigen Mexicaanse pagina noemt *"USD$30.00 usuario al mes, pagado anualmente"* — identiek aan de en-us-pagina. De bewering was ook intern tegenstrijdig (36 × 12 = 432 ≠ 360). Het jaarbedrag USD 360 klopt; het maandbedrag is **USD 30**, en het is een **jaarcontract per maand weergegeven**, geen maand-tot-maandprijs. | [microsoft.com/es-mx](https://www.microsoft.com/es-mx/microsoft-365/planner/microsoft-planner-plans-and-pricing) |
| 7 | Project Plan 5 gaat per **1 mei 2026** uit de verkoop | **Bevestigd (en aangevuld)** | End of Sale 1 mei 2026 bevestigd; het rapport miste dat de dienst op **30 september 2026 volledig wordt uitgefaseerd** (samen met Project Online Essentials). Toegevoegd als concreet migratievenster in §6. | [MC1253809](https://www.tophhie.cloud/m365-message-center/message/mc1253809/), [UTA OIT](https://websites.uta.edu/oit/2026/04/10/project-essentials-retirement/) |
| 8 | Primavera P6: perpetual **USD 3.500–3.520/seat**, cloud **USD 1.300–2.500/gebruiker/jaar**, +22% support | **Gecorrigeerd** | Oracle publiceert geen openbare Primavera-prijslijst (officiële PDF 404), dus alles is reseller-afgeleid. Een Oracle-partnerlijst (juni 2025) noemt P6 Professional **USD 3.880** (support USD 854) en P6 EPPM **USD 4.240** (USD 933), en P6 Cloud **USD 305/gebruiker/maand met minimum 25 gebruikers** ≈ **USD 3.660/gebruiker/jaar** — ruwweg 1,5–2,8× de gestelde cloudband. Het **22%-supportpercentage is bevestigd**; de absolute bedragen zijn SKU-afhankelijk en horen als band te worden genoemd. Het 25-gebruikersminimum is een relevante, eerder ontbrekende mkb-drempel. | [prmyazilim.com](https://prmyazilim.com/en/primavera-p6-pricing), [itqlick.com](https://www.itqlick.com/primavera-p6/pricing) |
| 9 | Opus: permanente licenties **MXN 15.740–38.360**, Suite **MXN 32–35k/jaar** | **Deels bevestigd, deels gecorrigeerd** | De band MXN 15.740–38.360 en de aanduiding *"LICENCIA PERMANENTE"* zijn bevestigd op de leverancierspagina (versie OPUS 25, mei 2025; vier updatetermijnen: 6 mnd / 1 / 2 / 3 jaar — niet "6 mnd–3 jr" als continuüm). **Fout in het licentiemodel:** de Suite-prijs is een **eenmalige perpetual licentie, geen jaarbedrag**; "/jaar" is geschrapt. | [opus-planet.mx/precios](https://opus-planet.mx/precios/) |
| 10 | Opus MXN 15.740–38.360 ≈ **USD 850–2.100** | **Gecorrigeerd (wisselkoers)** | De conversie impliceerde ~18,4 MXN/USD. De DOF-gemiddelde koers over juli 2026 was **17,47** (bandbreedte 17,39–17,60; Banxico-FIX 17,5130 op 25-07-2026) → **USD 900–2.200**. Dezelfde fout, groter van omvang, zat in de megaprojectbedragen: die gebruikten ~20,0–20,7 MXN/USD, waardoor USD 58/31,3/8,5 mrd ~15–18% te laag stonden (juist: ≈ USD 69 / 35,8 / 9,9 mrd). MXN-bedragen zelf ongewijzigd en betrouwbaarder. | DOF/Banxico-koersnoteringen juli 2026 |
| 11 | Opus Módulo 1 ≈ MXN 18.000–20.000; onderhoud Suite MXN 7.245–13.755/jr | **Onzeker** | Deze subcijfers staan **niet** op de prijspagina van de leverancier — die toont uitsluitend de band en verbergt bedragen achter keuzemenu's. Enige vindplaats is een derdenblog. Als indicatief gemarkeerd. | [opus-planet.mx/precios](https://opus-planet.mx/precios/) |
| 12 | Neodata PU Win+ ≈ **MXN 11.350/jaar (abonnement, OpEx)** | **Gecorrigeerd (licentiemodel) + onzeker (bedrag)** | Neodata PU Win+ wordt in **twee** varianten verkocht: een **"Versión Permanente, Sin Nube"** (perpetual) én een aparte jaarlicentie ("vigencia de un año") via distributeurs zoals NOORHS. De typering "abonnement" als hét model is dus onjuist. Het bedrag zelf kon bij geen distributeur worden bevestigd (429/403) — indicatief. Actuele build ten tijde van controle: v25.6.0 (jan. 2026). | distributeur-listings NOORHS Latinoamérica; productaankondigingen PU Win+ v25.6.0 |
| 13 | ProPlanner/IPSUM: USD 2,7 mln gefinancierd door **Cemex Ventures, Manutara en Insight Partners** | **Gecorrigeerd** | Het primaire persbericht (23 juni 2022) noemt **Insight Partners als lead**, met **Dysruptek** (Haskell), **Suffolk Technologies**, **STO Building Group** en **Thornton Tomasetti**. **Cemex Ventures en Dreamit waren eerdere seed-investeerders** (~USD 1 mln, Tracxn) en komen in deze ronde niet voor; **Manutara is in geen enkele bron terug te vinden**. Twee rondes waren vermengd. Gevolg voor de analyse: de cap table is overwegend Amerikaans, wat het veronderstelde Mexicaanse Cemex-distributievoordeel verzwakt. | [PR Newswire](https://www.prnewswire.com/news-releases/proplanner-raises-more-than-2-7-million-to-transform-construction-scheduling-301574278.html), [Tracxn](https://tracxn.com/d/companies/ipsum/) |
| 14 | LOPSRM verplicht gedetailleerde programma's; **géén wettelijke P6-eis** — P6 is de facto, niet de jure | **Bevestigd (kern) + geactualiseerd** | De kernbewering houdt stand: de wet schrijft *deliverables en formaten* voor, geen software; er is geen wettelijke P6/XER-verplichting. Wel ontbrak actualisering: de LOPSRM (DOF 04-01-2000) is **niet vervangen**, maar wél hervormd bij decreet in het DOF van **16 april 2025** en opnieuw op **14 november 2025** (12 hervormingen sinds 2000). Links bijgewerkt naar https. | [diputados.gob.mx/LeyesBiblio/ref/lopsrm.htm](https://www.diputados.gob.mx/LeyesBiblio/ref/lopsrm.htm) |
| 15 | Aanbestedingsstukken eisen een **"ruta crítica"** (kritiek pad) | **Onzeker** | Dat gedetailleerde *programas de ejecución* verplicht zijn, is breed gedocumenteerd; dat de term **"ruta crítica" een wettelijke eis** is, kon **niet op artikelniveau** in wet of Reglamento worden bevestigd. De bewering steunt in het rapport op één leveranciersblog. Niet als juridisch feit presenteren zonder artikelverwijzing. | wet-/reglementtekst niet doorzoekbaar binnen de controle |
| 16 | Enkontrol: **40+ jaar, 450+ klanten**, met module *Programa de Obra* — en CMIC ~10.000+ leden | **Enkontrol bevestigd; CMIC gecorrigeerd** | Enkontrol claimt op de eigen site letterlijk *"más de 40 años"* en *"+450 Clientes nos respaldan"*, en voert **Programa de Obra** als module binnen Suite Construcción — alle drie bevestigd. **CMIC** claimt echter zelf *"más de 18 mil empresas del sector construcción"*, niet ~10.000; bijgesteld naar boven. | [enkontrol.com](https://enkontrol.com/), [cmic.org/delegaciones](https://www.cmic.org/delegaciones/) |

### Niet gecontroleerd / resterende risico's

- **Smartsheet USD 9–19 per gebruiker/maand** is als **onzeker** gemarkeerd: Smartsheets eigen prijspagina hanteert inmiddels hogere tarieven (orde USD 12–24 per member/maand bij jaarfacturatie, minimum 3 members op Business), maar de exacte bedragen waren niet betrouwbaar uit te lezen. Monday (USD 9–19) en Wrike (USD 10–25) zijn niet apart geverifieerd.
- De **kwalitatieve marktleiderschapsclaims** ("Opus/Neodata-duopolie", "vrijwel elke aannemer op overheidswerk heeft er één") zijn **niet falsifieerbaar gemaakt**: er bestaat geen openbare installed-base- of marktaandeelmeting voor dit segment. Ze steunen op één vergelijkingsblog plus indirecte signalen (cursusaanbod, vacatures, distributeurs). Behandel als plausibele hypothese, niet als gemeten feit.
- **Prisma Master's claim "het enige 100% cloud precios-unitarios-pakket van Mexico"** is een **onbevestigde eigen marketingclaim** van de leverancier; de prijspagina was niet bereikbaar (403). Niet overnemen als vaststelling.
- De **piraterij-omvang** (kopieën à MXN 500–600) berust op marktplaatsadvertenties — een indicatie van bestaan, geen meting van omvang. Het rapport trekt hieruit conclusies over prijsgevoeligheid die directioneel aannemelijk maar kwantitatief ongefundeerd zijn.
- De **GlobalData-megaprojectbedragen** (spoor/energie/wegen) zijn overgenomen uit de oorspronkelijke persberichten; alleen de USD-omrekening is gecorrigeerd, de onderliggende MXN-bedragen en scope zijn niet onafhankelijk hergecontroleerd.

*Enkele bronnen waren tijdens de controle onbereikbaar (Grand View 403, Statista redirect-loop, Oracle-prijslijst 404, ITQlick/Contractors&Builders 403, distributeurspagina's 429). Waar dat het oordeel bepaalde, staat het expliciet in de tabel.*
