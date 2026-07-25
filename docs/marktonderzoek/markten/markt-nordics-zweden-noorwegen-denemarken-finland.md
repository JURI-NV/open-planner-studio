# Marktonderzoek: projectplanning-/schedulingsoftware in de Nordics (Zweden, Noorwegen, Denemarken, Finland)

*Datum: 25 juli 2026. Onderzoeksmethode: direct bronnenonderzoek (leveranciers-sites in het Zweeds, Noors, Deens, Fins en Engels, marktrapporten, opdrachtgeversdocumentatie). NB: het WebSearch-quotum van de onderzoekssessie was uitgeput; alle bevindingen komen uit rechtstreeks opgevraagde primaire bronnen (WebFetch) aangevuld met domeinkennis die hieronder expliciet als **[inschatting]** of **[achtergrondkennis, niet los geverifieerd]** is gemarkeerd.*

> **Let op — dit rapport is adversarieel gefact-checkt op 25 juli 2026.** Aantoonbare fouten zijn in de tekst zelf gecorrigeerd en met ⚠️ of *cursieve* noten gemarkeerd. Zie **[§8 Verificatie](#8-verificatie)** voor het oordeel per bewering. Belangrijkste correcties: een **rekenfout in de marktomvangsafleiding** (§2), **onjuiste bbp-ankers** (§2), een **onjuiste klantenlijst bij Antura** (§3.5), en de **niet te staven claim dat P6 een contracteis is bij Noorse/Zweedse overheidsopdrachtgevers** (§4.2).

---

## 1. Samenvatting

De Nordics vormen een kleine maar uitzonderlijk koopkrachtige en digitaal volwassen markt voor planningssoftware. Kernbevindingen:

- **Microsoft Project blijft de volumestandaard** bij aannemers, ingenieursbureaus en overheden in alle vier de landen, maar wordt in de bouw steeds vaker aangevuld of vervangen door specialistische tools. **[inschatting op basis van bronnenpatroon]**
- **Elke van de vier landen heeft een eigen, sterke lokale planningstraditie en eigen pakketten**: Zweden (Elecosoft/Consultec-erfenis: Powerproject + Bidcon; Projectplace; Antura), Noorwegen (Safran, Omega 365, ISY/Norconsult — sterk gedreven door olie & gas en openBIM-mandaten van Statsbygg), Finland (wereldcentrum van *location-based scheduling*: Admicom/Tocoman Planner, Sitedrive, VisiLean, PlanMan) en Denemarken (takt/LBS-consultancy Exigo met het pakket Tactplan; GenieBelt/LetsBuild-erfenis).
- **Uniek t.o.v. vrijwel elke andere markt**: in Finland en Denemarken is niet het Gantt/CPM-paradigma maar **locatiegebaseerd plannen (paikka-aikakaavio / cyklogram / takt)** de professionele norm bij grote aannemers — een directe erfenis van Vico/DynaProject (Olli Seppänen, Aalto).
- **Noorwegen is wereldleider in openBIM-eisen**: Statsbygg stelt via **SIMBA** informatieleveringseisen (buildingSMART/IFC/IDS) aan al zijn bouwprojecten ([simba.statsbygg.no](https://simba.statsbygg.no/)). Dit maakt de markt ontvankelijk voor IFC-native planningstools.
- **Olie & gas (Noorwegen) is een aparte high-end niche**: Safran Project (Stavanger, opgericht 1997) en Primavera P6 zijn daar de standaard; Omega 365 (PIMS) levert de projectbeheersings-suite eromheen.
- Marktomvang: **geschat USD 195–290 mln/jaar** voor projectmanagement-software over alle sectoren in de Nordics, waarvan **grofweg EUR 35–75 mln/jaar** voor planning/scheduling in bouw & infra (zie §2 voor de redenering; beide cijfers zijn **schattingen met een brede bandbreedte**). *Gecorrigeerd bij verificatie: de onderliggende seat-berekening bevatte een rekenfout en de bbp-ankers waren onjuist — zie §8.*
- Prijstolerantie is hoog: Finse en Deense takt-tools vragen zonder probleem €500–700 per project per maand (Sitedrive, gepubliceerd), en de markt betaalt voor P6/Safran-seats van duizenden euro's per jaar. Engels werkt overal als voertaal, maar de succesvolste pakketten zijn wél gelokaliseerd (Powerproject levert Zweeds, Deens én Noors mee).

---

## 2. Marktomvang

### Ankerpunten (gesourced)

| Cijfer | Waarde | Bron |
|---|---|---|
| Wereldwijde markt projectmanagement-software, 2025 | USD 9,76 mrd | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market) |
| Prognose 2026 → 2031 | USD 11,27 mrd → USD 23,09 mrd | idem |
| CAGR 2026–2031 | 15,42% | idem |
| Aandeel Noord-Amerika 2025 | 36,12% | idem |

Mordor geeft geen aparte Nordics-uitsplitsing; Europa wordt omschreven als "steady gains", gedreven door GDPR/datalokalisatie.

### Afleiding Nordics **[schatting, expliciete redenering]**

1. **Alle sectoren.** De Nordics (~27,8 mln inwoners, ~0,34% van de wereldbevolking) hebben samen een bbp van ca. **USD 2,20 biljoen** — IMF-ramingen 2026: Zweden 760 mrd, Noorwegen 599 mrd, Denemarken 504 mrd, Finland 338 mrd — oftewel **~1,7% van het wereld-bbp** (USD 126,3 biljoen), *niet* ~2% zoals eerder in dit rapport stond ([IMF-cijfers via List of countries by GDP (nominal)](https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal))). De regio behoort wel tot de hoogste software-uitgaven per capita ter wereld, dus een aandeel bóven het bbp-aandeel is verdedigbaar. Bij een aandeel van 2–3% van de wereldmarkt voor PM-software komt dat op **USD 195–290 mln in 2025** voor projectmanagement-software over alle sectoren. **[schatting; let op dat 2–3% neerkomt op 1,2–1,7× het bbp-aandeel — dat is een aanname, geen meting]**
2. **Bouw/infra-specifieke planning (Gantt/CPM/LBS).** De bouwproductie in de vier landen samen werd hier eerder op EUR 180–210 mrd/jaar geschat; die orde is **niet bevestigd** — de enige onafhankelijke raming die we vonden komt op USD 135 mrd voor de Scandinavische bouwmarkt in 2025 ([Emergen Research](https://www.emergenresearch.com/industry-report/scandinavia-construction-market)), al verschillen definities (markt vs. productie, wel/niet Finland). Het personeelsbestand van ruwweg 1,0–1,2 mln werkenden is eveneens onbevestigd; Zweden alleen telt ca. 370.000 fte (2023). **[onzeker]** Het aantal professionele planners/werkvoorbereiders met een betaalde planningsseat schatten we op **20.000–35.000** (grote aannemers 1 planner per ~30–60 fte; plus ingenieursbureaus, opdrachtgevers, olie & gas). Tegen een gemengde seatprijs van €600–1.200/jaar (MS Project Plan 3 onderin, P6/Safran/Powerproject bovenin) geeft dat **EUR 12–42 mln/jaar voor kern-CPM/LBS-seats** — de eerder vermelde EUR 20–40 mln was een **rekenfout** (20.000 × €600 = €12 mln; 35.000 × €1.200 = €42 mln); inclusief takt-/veldplanningsplatforms met projectprijzen (Sitedrive €538–690/project/maand, Tactplan, VisiLean, LetsBuild) en PPM-implementaties in bouw en infra komt de totale bouwgerichte planningsmarkt naar schatting op **EUR 35–75 mln/jaar (2025/2026)**. **[schatting, brede bandbreedte]**
3. **Groei.** Wereldwijd 15,4% CAGR (Mordor); voor de al sterk gepenetreerde Nordics is **8–12%/jaar** realistischer, met bovengemiddelde groei in het takt/LBS-segment (Sitedrive claimt zelf bouwtijdverkortingen van 15% tot 50%, [sitedrive.com](https://www.sitedrive.com/)). **[schatting]**

---

## 3. Gebruikte software: marktpositie en prijzen

### 3.1 Volumestandaard

**Microsoft Project / Planner** — alomtegenwoordig bij aannemers, ingenieursbureaus (COWI, Ramboll, Sweco, AFRY, Norconsult, Multiconsult) en overheden; het de-facto uitwisselingsformaat (.mpp) in aanbestedingen zonder specifieke eis. **[inschatting; positie niet per land becijferd]** Prijzen (VS-lijstprijzen, gesourced):

- Planner Plan 1: **$10/gebruiker/maand**; Planner & Project Plan 3: **$30/gebruiker/maand** — beide **bij jaarabonnement met automatische verlenging** ("user/month, paid yearly"); maandelijks opzegbaar is duurder ([microsoft.com](https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing), pagina opnieuw opgevraagd juli 2026). Plan 5: **$55/gebruiker/maand** — staat *niet* op Microsofts eigen plannenpagina; alleen via derden bevestigd ([Secureframe](https://secureframe.com/marketplace/microsoft/planner-and-project-plan-5)) **[onzeker]**
- Project Standard 2024: **$679,99 eenmalig**; Project Professional 2024: **$1.129,99 eenmalig** (perpetual, één device); Project Server Subscription Edition: via partner ([microsoft.com](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software), opnieuw geverifieerd juli 2026)

### 3.2 Bouwspecifieke CPM-pakketten

**Asta Powerproject (Eleco/Elecosoft, VK — met sterke Zweedse poot)**
- Positie: het belangrijkste bouwspecifieke CPM-alternatief voor MS Project in Zweden en breder Scandinavië. Eleco heeft een volwaardige Zweedse organisatie (het vroegere Consultec, Skellefteå — **in 2003 overgenomen door het Britse Elecosoft plc**) die Powerproject samen met calculatiepakket **Bidcon** als de facto standaardcombinatie bij Zweedse aannemers verkoopt ("Bidcon – byggbranschens kalkylprogram", klanten o.a. ByggPartner, Wästbygg) ([eleco.com/se](https://eleco.com/se/)). Powerproject wordt geleverd in **13 talen: Engels (AU/UK/US), Deens, Nederlands, Fins, Duits, Noors, Zweeds, Frans, Pools, Spaans, Italiaans en Turks** — dus óók **Fins**, wat het rapport eerder wegliet en wat Powerproject in alle vier de Nordics-landen gelokaliseerd maakt; wereldwijd 100.000+ gebruikers, klanten o.a. Skanska, BAM, Bouygues, Mace, Kier ([eleco.com](https://eleco.com/products/powerproject/), opnieuw geverifieerd juli 2026). Historische context: Consultec's eigen planner **PlanCon** is in Zweden geleidelijk vervangen door Powerproject. **[achtergrondkennis]**
- Licenties: single user, concurrent serverlicentie, SaaS-abonnement (ook Mac), edu-licenties ([eleco.com](https://eleco.com/products/powerproject/)). Eleco publiceert geen lijstprijzen. Derden noemen **£880/gebruiker/jaar voor een single-user-abonnement** ([Software Finder](https://softwarefinder.com/project-management-software/powerproject)) en **$2.000/gebruiker/jaar** ([ITQlick](https://www.itqlick.com/asta-powerproject/pricing)). De eerder vermelde "£1.500–2.500 perpetual per seat" is **niet te staven**; de abonnementsordegrootte (~£70–110/gebruiker/maand) sluit wél aan bij de £880/jaar van derden. **[onzeker — geen leverancierslijstprijs]**

**Oracle Primavera P6 (EPPM/PPM)**
- Positie: standaard voor megaprojecten en infra (o.a. spoor/weg/energie) en in de Noorse olie & gas-keten; "the standard for planning and scheduling" ([oracle.com](https://www.oracle.com/construction-engineering/primavera-p6/)). ⚠️ **Bij verificatie NIET bevestigd**: er is in openbare Noorse en Zweedse bronnen geen bewijs gevonden dat Bane NOR, Nye Veier of Trafikverket P6 of XER contractueel *voorschrijven*. Een studie naar BIM-eisen in 16 grote Noorse infraprojecten (≥500 mln NOK, waarvan 9 van Nye Veier en 2 van Bane NOR) noemt geen enkele planningssoftware-eis. Behandel "P6 verplicht bij overheidswerk" in de Nordics als **onbewezen**; wat wél aannemelijk blijft is dat P6 de facto veel gebruikt wordt in de olie & gas-EPC-keten. **[onzeker — claim afgezwakt]**
- Prijzen: Oracle publiceert geen lijstprijzen (pagina verwijst naar sales; [oracle.com](https://www.oracle.com/construction-engineering/primavera-p6/)). Derden noemen **P6 Professional ca. USD 3.100–3.520 per perpetual gebruikerslicentie** en **P6 EPPM ca. USD 2.750/gebruiker + ~22% onderhoud/jaar** ([Oracle Licensing Experts](https://www.oraclelicensingexperts.com/), [ITQlick](https://www.itqlick.com/primavera-p6/pricing)); cloud-/abonnementsvormen worden gerapporteerd op **USD 3.000–25.000 per gebruiker per *jaar*** (≈ USD 250–2.080/gebruiker/maand). De eerdere schattingen (USD 2.500–3.000 perpetual; USD 175–250/gebruiker/maand cloud) waren daarmee **te laag**. **[gecorrigeerd, blijft onzeker — geen Oracle-lijstprijs]**

**Safran Project / Safran Planner / Safran Risk (Safran Software Solutions, Stavanger, Noorwegen — lokale speler)**
- Positie: dé Noorse planningssoftware, opgericht **1997 in Stavanger** — onafhankelijk bevestigd in het Noorse handelsregister: Safran Software Solutions AS, org.nr **879388252**, opgericht 30-09-1997, Prof. Olav Hanssens vei 11, 4021 Stavanger ([yra.no](https://yra.no/en/company/879388252)) — groot geworden met de olie & gas-industrie; klanten o.a. **Aker BP, Aker Solutions, Aibel, ABB, AECOM, Meyer Turku** (Finse scheepswerf) ([safran.com/about-us](https://www.safran.com/about-us), [safran.com](https://www.safran.com/products/safran-project)). Onderdeel van JDM Technology Group. In de Noorse offshore-keten naast/boven P6 gepositioneerd, sterk in geïntegreerde schedule-risk-analyse.
- Prijzen: niet gepubliceerd (30 dagen trial; op aanvraag) ([safran.com](https://www.safran.com/products/safran-project)). Ordegrootte high-end: **duizenden euro's per seat per jaar**. **[schatting]**

**Elecosoft/Eleco-suite rond Powerproject**: Asta Enterprise (multi-user), Asta Siteprogress (mobiel), Asta Vision (webportaal) ([eleco.com](https://eleco.com/products/powerproject/)) — relevant voor grotere Zweedse/Noorse aannemers.

**Bentley Synchro, TILOS, ALICE, nPlan, Nodes & Links, Deltek Open Plan, Spider Project, Sciforma, Phoenix PM, RIB Candy/iTWO** — in de Nordics niche: Synchro 4D en TILOS (lineaire infra) duiken op bij grote infraprojecten en bij ingenieursbureaus; AI-schedulingtools (ALICE, nPlan, Nodes & Links) worden op megaprojecten gepilot; RIB en Deltek Open Plan spelen er nauwelijks een rol in de bouwplanning (Deltek is in Denemarken groot met Maconomy, maar dat is ERP/PSA, geen scheduling). **[inschatting; geen afzonderlijke bronnen opgevraagd]**

### 3.3 Locatiegebaseerd/takt — de Noords-Finse specialiteit

**Admicom Planner & Admicom Tempo (Finland — lokale speler; ex-Tocoman)**
- Positie: **Admicom Planner wordt door Admicom zélf** — letterlijk — **"Suomen suosituin rakennustyömaan aikatauluhallinnan ohjelmisto"** genoemd (Finlands populairste software voor bouwplaats-planningsbeheer). Dit is **marketingtekst van de leverancier, geen onafhankelijk gemeten marktaandeel**; er is geen onafhankelijke bron gevonden die het leiderschap bevestigt. **[onzeker — leveranciersclaim]** Het pakket is de voortzetting van Tocoman Aikataulu / Schedule Planner, geworteld in de Vico Control/DynaProject-lijn van locatiegebaseerd plannen (paikka-aikakaavio); **Admicom nam Tocoman Oy in maart 2020 over** (beursbericht 10-03-2020). Admicom bedient o.a. **Skanska, SRV en YIT** ([admicom.com/fi](https://www.admicom.com/fi/ratkaisut/projektinhallinta)). **[Vico/DynaProject-afstamming: achtergrondkennis]**
- Prijzen (gepubliceerd, zeldzaam transparant; opnieuw geverifieerd juli 2026): **Admicom Tempo (web-based aikataulutus) vanaf €29/maand; Vision €49/maand; Insite €79/maand; Bauhub €125/maand per project; Quantima €199/maand; Estima €199/maand** — dus suite-prijzen €29–199/maand ([admicom.com/fi](https://www.admicom.com/fi/ratkaisut/projektinhallinta)). Let op: alleen bij Bauhub is de eenheid expliciet *per project*; bij de rest staat er geen gebruikersaantal bij, dus "per gebruiker" is **niet** vastgesteld.

**Sitedrive (Sitedrive Oy, Helsinki — lokale speler, Fira-spin-off)**
- Positie: takt-/productieplanningsplatform ("factory-style production"); 300+ bouwplaatsen; klanten o.a. **Skanska, Caverion, Saint-Gobain, Hartela, Bonava en AF Gruppen (NO)**; UI in o.a. Fins, Noors en Deens; integreert met MS Project, Power BI en BIM ([sitedrive.com](https://www.sitedrive.com/)).
- Prijzen (gepubliceerd): **projectgebaseerd, onbeperkte gebruikers**: pilot 1 project €690/maand (12 mnd); 3 projecten €1.685/maand (€562/project); 6 projecten €3.300/maand; 9 projecten €4.840/maand; enterprise op maat ([sitedrive.com/pricing](https://www.sitedrive.com/pricing)).

**Tactplan (Denemarken — lokale speler)**
- Positie: Deens platform voor **location-based scheduling + takt + Gantt/CPM** ("waar én wanneer"), voortgekomen uit 15 jaar praktijk; klanten o.a. **NCC, Skanska Sverige, MT Højgaard, Per Aarsleff, CG Jensen, Enemærke & Petersen, Jorton, Mestergruppen (NO), Haahtela (FI)**; actief in heel de Nordics plus **Spanje en Costa Rica** — de eerdere vermelding "Polen" is **onjuist**, Tactplans eigen klantenoverzicht toont Spaanse (CAAT Valencia, Victor Tormo) en Costa Ricaanse (Volio Trejos) referenties, geen Poolse ([tactplan.com](https://tactplan.com/), opnieuw geverifieerd juli 2026). Wordt in Denemarken gepusht door consultancy **Exigo** (klanten: Vejdirektoratet, Energinet, Aarsleff, CG Jensen, NCC, Siemens, DTU; claim: 15–20% kortere bouwtijd via LBS) ([exigo.dk](https://exigo.dk/en/)).
- Prijzen: op maat, 14 dagen trial ([tactplan.com](https://tactplan.com/)).

**VisiLean (Helsinki, Finland — lokale speler met VK/India-kantoren)**
- Positie: cloud-platform voor **Last Planner System + takt + CPM + live 4D BIM**; importeert P6-, MS Project- en Powerproject-planningen; klanten o.a. Implenia, Mace, GRAHAM, Sisk ([visilean.com](https://visilean.com/)).
- Prijzen: niet gepubliceerd (demo/op aanvraag) ([visilean.com](https://visilean.com/)).

**PlanMan (Finland — lokale speler)**
- Fins planningspakket (Gantt/jana-aikataulu + paikka-aikakaavio, blokschema's, ritme-planning, resource- en kostenmodules), populair bij kleinere Finse aannemers en werkvoorbereiders. ⚠️ **Gecorrigeerd**: PlanMan is géén los "goedkoper alternatief voor Tocoman/Admicom" — **PlanMan Project en Tocoman Aikataulu zijn zusterprogramma's**; PlanMan en Tocoman hebben ruim tien jaar samen aan Tocoman Aikataulu ontwikkeld, en die lijn is nu opgegaan in Admicom Planner. De positionering is dus complementair/gedeelde codebasis, niet puur concurrerend. Site ([planman.fi](https://planman.fi/)) was tijdens dit onderzoek niet bereikbaar (503, vermoedelijk geo-block); bovenstaande is via derde bronnen gereconstrueerd.

**Trimble/Vico-erfenis (Finland)**: Vico Control/Schedule Planner (uit het Finse DynaProject) leeft technisch voort in Trimble-producten en inhoudelijk in Admicom Planner; de methodiek (flowline) is in het Finse hbo/universitair onderwijs standaard. **[achtergrondkennis]**

### 3.4 Noorse projectbeheersings-suites

**Omega 365 (Ølensvåg, Noorwegen — lokale speler; voorheen Omega, met PIMS als vlaggenschipproduct)**
- Positie: SaaS-suite voor project- en asset-management over de hele levenscyclus, dominant in de Noorse energiesector; hoofdkantoor in **Ølensvåg** (Kvassanesvegen 4) met 26 vestigingen; klanten o.a. **Aibel, Vår Energi, BKK AS**, plus internationaal **Frimley Health NHS Foundation Trust, GATE Energy en Northern Endurance Partnership** — de eerder genoemde "Humber Carbon Capture" staat niet op de site; het CCS-project dat er wél staat is Northern Endurance Partnership ([omega365.com](https://omega365.com/), opnieuw geverifieerd juli 2026). NB: **PIMS is een product van Omega 365, geen voormalige bedrijfsnaam.** Planning zit als module in een bredere projectbeheersings-suite; vaak naast Safran/P6. Prijzen niet gepubliceerd.

**ISY-familie (Norconsult Digital, Noorwegen — lokale speler)**
- Positie: Noorse toolfamilie voor de bouw; het zwaartepunt ligt bij calculatie/beheersing (**ISY Prosjekt Økonomi**, **ISY Project Controls**, ISY Road) ([norconsultdigital.no](https://norconsultdigital.no/)). Voor pure fremdriftsplanning grijpen Noorse aannemers vooral naar MS Project, Powerproject of Safran. **[inschatting]** Prijzen niet gepubliceerd.

### 3.5 Algemene PM/PPM-tools die in deze markt serieus voor planning worden gebruikt

- **Projectplace (Planview)** — **van oorsprong Zweeds** (Stockholm, 1998), collaboratief werkbeheer met geïntegreerde Gantt + Kanban; nog altijd breed gebruikt in Zweedse organisaties, incl. bouwgerelateerde projectorganisaties; één all-in prijsplan, prijs alleen op aanvraag ([planview.com](https://www.planview.com/products-solutions/products/projectplace/), [pricing](https://www.planview.com/products-solutions/products/projectplace/projectplace-pricing/)); historisch rond $29/gebruiker/maand **[schatting]**.
- **Antura Projects (Göteborg, Zweden — lokale speler)** — PPM/resource-management sinds 2001, 400+ implementaties, kantoren in Göteborg/Stockholm/Kopenhagen (alle drie bevestigd). ⚠️ **Klantenlijst gecorrigeerd**: **Trafikverket, Region Stockholm, Migrationsverket, SAAB en Atlas Copco staan géén van alle op Antura's eigen klantenoverzicht** en zijn nergens anders als Antura-klant terug te vinden — die opsomming was onjuist. Wél genoemde klanten zijn o.a. **Försäkringskassan, Swedavia, Jernhusen, Göteborg Energi, Outokumpu, Munters, Mycronic, Fagerhult, Duni Group, Wallenstam** en de gemeenten **Umeå, Nacka, Karlskrona en Kristianstad** ([antura.se/kunder](https://www.antura.se/kunder)). ISO 27001, Zweedse cloud. Bevat projectplanning met Gantt; prijs op aanvraag. Nog steeds sterk in de Zweedse (semi-)publieke sector — maar dan bij overheidsdiensten, gemeenten en staatsbedrijven, niet aantoonbaar bij Trafikverket.
- **Smartsheet, monday.com, Wrike, Asana** — gangbaar voor lichtere planning bij ontwikkelaars, installateurs en projectbureaus; SaaS-prijzen ca. €9–25/gebruiker/maand **[achtergrondkennis-lijstprijzen, niet per land geverifieerd]**.
- **LetsBuild (GenieBelt + APROPLAN)** — GenieBelt was een Kopenhaagse start-up voor bouwplanning/voortgang die **op 31 januari 2019** fuseerde met het Brusselse APROPLAN tot LetsBuild (bevestigd; de gefuseerde onderneming telde bij aankondiging ca. 120 medewerkers); het gecombineerde platform (10.000+ actieve gebruikers) ligt inmiddels weer onder de APROPLAN-vlag met focus op kwaliteits-/site-management ([aproplan.com](https://www.aproplan.com/about-us)). In Denemarken resteert vooral de erfenis: bewezen appetijt voor site-planningstools.
- **Gratis/open source: ProjectLibre, GanttProject, OpenProject** — in deze koopkrachtige markt vooral in onderwijs en bij zzp'ers; commercieel marginaal. **[inschatting]**
- **Dalux (Denemarken)** — wereldspeler in BIM-veldsoftware (geen CPM-planning, wel takt-/opleververwante veldprocessen); relevant als kanaal- en integratiepartner in DK/NO/SE/FI. **[achtergrondkennis; niet afzonderlijk opgevraagd]**

### 3.6 Indicatieve rangorde per land **[inschatting op basis van bovenstaande bronnen]**

| Land | #1 volume | Sterk bouwspecifiek | Lokale kampioenen | High-end/infra |
|---|---|---|---|---|
| Zweden | MS Project | **Powerproject (+Bidcon)** | Projectplace, Antura, Tactplan (groeiend) | P6 (Trafikverket-megaprojecten) |
| Noorwegen | MS Project | Powerproject (no-versie), Safran | **Safran, Omega 365, ISY** | **P6 + Safran** (olie & gas, Bane NOR/Nye Veier) |
| Denemarken | MS Project | **Tactplan/LBS (Exigo)** | Tactplan, (ex-GenieBelt), Dalux-ecosysteem | P6 (Femern, metro) |
| Finland | MS Project | **Admicom Planner/Tempo** | Admicom/Tocoman, Sitedrive, VisiLean, PlanMan | P6 (industrie/nucleair) |

⚠️ *Verificatienoot bij deze tabel: de kolom "High-end/infra" is een inschatting. De koppeling van P6 aan Trafikverket-, Bane NOR-/Nye Veier-, Femern- of Fins nucleair werk is met openbare bronnen **niet** bevestigd (zie §4.2). Ook de #1-positie van MS Project is nergens per land becijferd. Lees de tabel als hypothese, niet als meting.*

---

## 4. Lokale bijzonderheden

1. **openBIM/IFC-mandaten (Noorwegen voorop).** Statsbygg's **SIMBA** is "een informatiestandaard en methodiek die voorspelbaar en bruikbaar BIM-gebruik in alle Statsbygg-bouwprojecten borgt", op buildingSMART-leest; **IDS (Information Delivery Specification) wordt de nieuwe eisen-standaard** en vervangt mvdXML ([simba.statsbygg.no](https://simba.statsbygg.no/)). Statsbygg stelt **sinds 2011** BIM-eisen aan al zijn projecten ([statsbygg.no](https://www.statsbygg.no/nyheter/ny-versjon-av-bim-krav/)) — het rapport zei eerder "ca. 2010"; 2011 is de gedocumenteerde datum. Twee nuances: de SIMBA-homepage zelf noemt **IFC niet expliciet** (wel IDS/mvdXML), en nergens staat in juridische bewoordingen dát naleving verplicht is — het is een opdrachtgeverstandaard die via projectcontracten doorwerkt, niet een wettelijk mandaat. Voor een IFC-native planner (zoals een IFC 4.3-gebaseerde tool) blijft dit niettemin een van de meest ontvankelijke markten ter wereld.
2. **Aanbestedings-/contracteisen planning.** ⚠️ **Deze claim is bij verificatie niet houdbaar gebleken en hier afgezwakt.** Gericht zoeken in het Zweeds en Noors leverde **geen enkel publiek document** waarin Trafikverket, Bane NOR, Nye Veier of het Femern-project Primavera P6, XER of een ander specifiek planningsformaat contractueel voorschrijven; een studie van BIM-eisen in 16 grote Noorse infraprojecten (≥500 mln NOK, waaronder 9 Nye Veier- en 2 Bane NOR-projecten) noemt in het geheel geen planningssoftware-eis. Behandel "P6 is verplicht bij overheidswerk in de Nordics" dus als **onbewezen**. Wat wél plausibel blijft: in de Noorse olie & gas-EPC-keten zijn P6- en Safran-uitwisseling en gestandaardiseerde voortgangsrapportage (S-curves, WBS-koppeling) in de praktijk gangbaar, maar ook dat is hier niet met een primair eisendocument onderbouwd. **[onzeker]** Aparte correctie: **NS 3420 is géén kostenstandaard** maar de Noorse standaard voor *beskrivelsestekster* — gestandaardiseerde postbeschrijvingen en hoeveelhedenlijsten voor bouw- en installatiewerk, die pas secundair voor calculatie en afrekening worden gebruikt. Bij reguliere gebouwbouw is geen formaat verplicht; .mpp en pdf-tijdschema's domineren. **[inschatting]**
3. **Locatiegebaseerde planningscultuur (uniek).** Finland: paikka-aikakaavio (flowline) is de professionele norm — geworteld in DynaProject/Vico en Aalto-onderzoek; Admicom noemt zijn Planner Finlands populairste bouwplanningssoftware ([admicom.com/fi](https://www.admicom.com/fi/ratkaisut/projektinhallinta)). Denemarken: Exigo/Tactplan claimen 15–20% bouwtijdreductie met LBS ([exigo.dk](https://exigo.dk/en/)); klanten tot en met Vejdirektoratet. Een pakket dat alléén klassiek Gantt/CPM biedt, mist in FI/DK een kernverwachting.
4. **Taal.** Engels werkt overal als voertaal; toch leveren winnaars lokale UI's: Powerproject in het Zweeds, Deens, Noors **én Fins** — alle vier de Nordics-talen dus ([eleco.com](https://eleco.com/products/powerproject/)), Sitedrive in Fins, Noors en Deens (plus Engels, Spaans, Frans, Tsjechisch; [sitedrive.com](https://www.sitedrive.com/)), Admicom volledig Fins. Voor Finland is een Finse UI vrijwel een vereiste onder uitvoerders.
5. **Prijscontext en betalingsbereidheid.** Gepubliceerde lokale prijzen liggen hoog en per project i.p.v. per seat wint terrein: Sitedrive €538–690/project/maand met onbeperkte gebruikers ([sitedrive.com/pricing](https://www.sitedrive.com/pricing)); Admicom €29–199/maand per module ([admicom.com/fi](https://www.admicom.com/fi/ratkaisut/projektinhallinta)). Hoge arbeidskosten maken ROI-verhalen (minder planner-uren, kortere bouwtijd) zeer effectief.
6. **Opleidingscultuur.** Leveranciers verdienen substantieel aan cursussen (Eleco SE en Norconsult Digital adverteren trainingsprogramma's prominent; ([eleco.com/se](https://eleco.com/se/), [norconsultdigital.no](https://norconsultdigital.no/))); hogescholen onderwijzen flowline (FI) en BIM/IFC (NO) standaard.
7. **Consolidatie.** De markt consolideert rond suites, met geverifieerde jaartallen: **Elecosoft plc kocht Consultec (SE) in 2003**, **Planview kocht Projectplace (SE) in 2014**, **APROPLAN (BE) en GenieBelt (DK) fuseerden op 31 januari 2019 tot LetsBuild**, **Admicom kocht Tocoman (FI) in maart 2020**, en JDM Technology Group kocht Safran (NO). Stand-alone planners worden modules in bredere bouw-suites.

---

## 5. Voor- en nadelen van lokale/niche-pakketten

*(Analyse op basis van leveranciersdocumentatie en positionering; reviews-sites waren deels niet bereikbaar (G2/Capterra 403/404). Waar geen onafhankelijke reviewbron beschikbaar was, is dit oordeel als analyse van de onderzoeker te lezen.)*

**Safran Project/Planner (NO)**
- Voordelen: zeer sterke geïntegreerde schedule + risk (Monte Carlo) in één omgeving; bewezen bij Aker BP/Aibel-schaal; Noorse support en verankering in de offshore-keten ([safran.com](https://www.safran.com/products/safran-project)).
- Nadelen: onbekend buiten olie & gas/zware industrie; geen publieke prijzen (lange salescycli); kleiner ecosysteem van planners dan P6, dus schaarser personeel; desktop-zwaar.

**Omega 365 (NO)**
- Voordelen: één datamodel voor hele projectlevenscyclus (engineering → operations), digital twin-ambitie, sterke Noorse energiereferenties ([omega365.com](https://omega365.com/)).
- Nadelen: suite-lock-in; planning is geen kernonderscheider (vaak alsnog Safran/P6 ernaast); enterprise-implementatietrajecten, niets voor mkb.

**ISY (Norconsult Digital, NO)**
- Voordelen: diepe verankering in Noorse standaarden en gemeentepraktijk; sterke calculatie/beheersing ([norconsultdigital.no](https://norconsultdigital.no/)).
- Nadelen: geen echt zelfstandig schedulingproduct in de huidige portfolio; eigendom van een ingenieursbureau (Norconsult) kan concurrerende bureaus afschrikken.

**Admicom Planner/Tempo (FI)**
- Voordelen: naar eigen zeggen marktleider in FI (leveranciersclaim, niet onafhankelijk bevestigd — zie §3.3); echte paikka-aikakaavio/LBS-methodiek; onderdeel van complete Finse bouw-suite (calculatie t/m facturatie); transparante lage instapprijs (Tempo €29/mnd) ([admicom.com/fi](https://www.admicom.com/fi/ratkaisut/projektinhallinta)).
- Nadelen: vrijwel uitsluitend Fins/Finland-gericht; Planner is desktop-erfgoed uit de Tocoman/Vico-lijn **[achtergrondkennis]**; suite-koppeling maakt losse adoptie buiten Admicom-klanten minder logisch; niet IFC-planningsgericht.

**Sitedrive (FI)**
- Voordelen: modern takt-platform, onbeperkte gebruikers per project (adoptie op de bouwplaats), gepubliceerde prijzen, integraties (MS Project, Power BI, BIM), sterke referenties (Skanska, AF Gruppen) ([sitedrive.com](https://www.sitedrive.com/), [pricing](https://www.sitedrive.com/pricing)).
- Nadelen: prijs per project is fors voor kleine aannemers (€690/mnd pilot); geen volwaardige CPM-engine voor contractuele masterplanning — wordt naast, niet in plaats van, P6/MSP gebruikt; jong bedrijf.

**Tactplan (DK)**
- Voordelen: combineert LBS/takt én Gantt/CPM in één tool (zeldzaam); kosten-/hoeveelhedenintegratie (EVM, cashflow); Nordics-brede referenties (NCC, Skanska Sverige, MT Højgaard); mobiele voortgang ([tactplan.com](https://tactplan.com/)).
- Nadelen: geen gepubliceerde prijzen; klein bedrijf tegenover Oracle/Microsoft/Eleco; buiten Nordics beperkt bewezen; consultancy-gedreven adoptie (Exigo) maakt succes persoonsafhankelijk.

**VisiLean (FI)**
- Voordelen: enige die Last Planner + takt + 4D BIM native combineert; importeert P6/MSP/Powerproject; internationale enterprise-referenties (Implenia, Mace) ([visilean.com](https://visilean.com/)).
- Nadelen: prijs op aanvraag; vergt lean-volwassenheid van de organisatie; in de Nordics zelf minder zichtbaar dan Sitedrive/Tactplan **[inschatting]**.

**PlanMan (FI)**
- Voordelen: goedkoop Fins alternatief met Gantt + flowline; laagdrempelig voor mkb-aannemers. **[achtergrondkennis]**
- Nadelen: kleine leverancier, beperkte integraties/BIM; site was tijdens onderzoek onbereikbaar buiten Finland (503) — illustratief voor puur binnenlandse focus ([planman.fi](https://planman.fi/)).

**Projectplace (SE)** — Voordelen: intuïtief, Gantt+Kanban, Zweedse wortels en naamsbekendheid; Nadelen: geen bouwspecifieke functies (geen CPM-float-analyse, geen LBS), prijs niet transparant ([planview.com](https://www.planview.com/products-solutions/products/projectplace/)).

**Antura (SE)** — Voordelen: Zweedse cloud/ISO 27001, sterk in de publieke sector (o.a. Försäkringskassan, Swedavia, Jernhusen en diverse gemeenten — **niet** Trafikverket, zie correctie in §3.5), volwaardige PPM ([antura.se/kunder](https://www.antura.se/kunder)); Nadelen: PPM-, geen bouwplanningstool; Gantt is basaal t.o.v. P6/Powerproject **[inschatting]**.

---

## 6. Implicaties voor een nieuwkomer (zoals een open, IFC-native planner) **[analyse]**

- Noorwegen (Statsbygg/SIMBA, IDS) is de logischste bres voor een **IFC 4.3-native** planningstool: openBIM is er contractueel verankerd en geen enkele gevestigde planner is IFC-native.
- In FI/DK is **flowline/takt-weergave** naast Gantt/CPM vrijwel een instapeis; in SE is **koppeling calculatie↔planning** (Bidcon→Powerproject-patroon) de norm.
- Prijsanker: onder MS Project Plan 3 ($30/gebruiker/maand **bij jaarafname**, ≈ $360/gebruiker/jaar) zit de volumemarkt; €29/maand (Admicom Tempo) is het bewezen instappunt voor bouwspecifiek; projectprijzen met onbeperkte gebruikers (Sitedrive-model: €538–690/project/maand) zijn het groeimodel.

---

## 7. Bronnen

1. Mordor Intelligence — Project Management Software Systems Market: https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market
2. Microsoft Planner plans & pricing: https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing
3. Microsoft Project vergelijking/prijzen (Standard/Professional 2024): https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software
4. Oracle Primavera P6: https://www.oracle.com/construction-engineering/primavera-p6/
5. Eleco/Elecosoft — Asta Powerproject: https://eleco.com/products/powerproject/
6. Eleco Zweden (Bidcon, Powerproject, klanten): https://eleco.com/se/
7. Safran Software Solutions — About (Stavanger, 1997): https://www.safran.com/about-us
8. Safran Project (klanten, trial): https://www.safran.com/products/safran-project
9. Omega 365 (Noorwegen): https://omega365.com/
10. Norconsult Digital / ISY: https://norconsultdigital.no/
11. Statsbygg SIMBA (BIM-eisen, IDS): https://simba.statsbygg.no/
12. Admicom/Tocoman projectinhallinta (Planner "Suomen suosituin", Tempo €29, prijzen): https://www.admicom.com/fi/ratkaisut/projektinhallinta
13. Sitedrive (product, klanten): https://www.sitedrive.com/
14. Sitedrive pricing: https://www.sitedrive.com/pricing
15. Tactplan (Denemarken): https://tactplan.com/
16. Exigo (Denemarken, LBS, klanten): https://exigo.dk/en/
17. VisiLean (Helsinki): https://visilean.com/
18. Planview Projectplace: https://www.planview.com/products-solutions/products/projectplace/ en https://www.planview.com/products-solutions/products/projectplace/projectplace-pricing/
19. Antura (Zweden): https://www.antura.se/
20. APROPLAN/LetsBuild: https://www.aproplan.com/about-us
21. PlanMan (Finland; onbereikbaar tijdens onderzoek): https://planman.fi/

*Alle niet-gesourcete cijfers zijn expliciet gemarkeerd als schatting of achtergrondkennis.*

---

## 8. Verificatie

*Adversariële fact-check, uitgevoerd 25 juli 2026. Werkwijze: elke bewering is actief geprobeerd te **weerleggen** met bronnen die het oorspronkelijke rapport niet noemde (handelsregisters, IMF/Wikipedia-bbp-tabellen, prijsvergelijkers, persberichten, klantenpagina's van leveranciers, zoekopdrachten in het Zweeds, Noors en Fins). Doorgerekende schattingen zijn nagerekend. Bij twijfel is de bewering als **onzeker** gemarkeerd in plaats van te blijven staan.*

### 8.1 Marktomvang en de redenering erachter

| # | Bewering | Oordeel | Onderbouwing | Bron |
|---|---|---|---|---|
| 1 | Mordor: wereldmarkt PM-software USD 9,76 mrd (2025), 11,27 → 23,09 mrd (2026→2031), CAGR 15,42%, NA-aandeel 36,12% | **bevestigd** | Pagina opnieuw opgevraagd; alle vier cijfers matchen letterlijk. Ook intern consistent nagerekend: 11,27 × 1,1542⁵ = 23,09 ✓ en 11,27 / 9,76 = 1,155 ✓. Wel te vermelden: dit is één vendor-forecast uit een eigen ramingsmodel, geen gemeten omzet | https://www.mordorintelligence.com/industry-reports/project-management-software-systems-market |
| 2 | Nordics-bbp "ca. USD 1,9–2,0 biljoen (~2% van het wereld-bbp)" | **gecorrigeerd** | IMF-ramingen 2026: Zweden 760,5 + Noorwegen 599,4 + Denemarken 503,8 + Finland 337,7 = **USD 2.201 mrd ≈ 2,20 biljoen**. Wereld-bbp USD 126,3 biljoen → aandeel **1,74%**, niet ~2%. Bbp dus onderschat, wereldaandeel overschat | https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal) |
| 3 | Seat-berekening: 20.000–35.000 seats × €600–1.200/jaar = "EUR 20–40 mln/jaar" | **gecorrigeerd (rekenfout)** | Nagerekend: ondergrens 20.000 × €600 = **€12 mln**; bovengrens 35.000 × €1.200 = **€42 mln**. De gepubliceerde €20–40 mln volgt niet uit de eigen inputs. Doorwerking: totale bouwgerichte planningsmarkt bijgesteld van EUR 45–80 mln naar **EUR 35–75 mln** | eigen herberekening van de in §2 vermelde inputs |
| 4 | Bouwproductie Nordics "EUR 180–210 mrd/jaar", 1,0–1,2 mln werkenden | **onzeker** | Niet te staven. Enige onafhankelijke raming gevonden: Scandinavische bouwmarkt USD 135 mrd (2025) — fors lager, al verschillen de definities (markt vs. productie, wel/niet Finland). Werkgelegenheid: Zweden alleen ca. 370.000 fte (2023), waardoor 1,0–1,2 mln voor vier landen aan de hoge kant oogt | https://www.emergenresearch.com/industry-report/scandinavia-construction-market ; https://gitnux.org/nordic-construction-industry-statistics/ |
| 5 | Nordics-bevolking ~27,5 mln, ~0,34% van de wereldbevolking | **bevestigd (afgerond)** | SE ~10,6 + NO ~5,6 + DK ~6,0 + FI ~5,6 ≈ **27,8 mln**; bij een wereldbevolking van ~8,2 mrd is dat 0,34% ✓ | idem GDP-tabel hierboven |

### 8.2 Prijzen en licentiemodellen

| # | Bewering | Oordeel | Onderbouwing | Bron |
|---|---|---|---|---|
| 6 | Microsoft: Planner Plan 1 $10 en Planner & Project Plan 3 $30 per gebruiker/maand | **bevestigd, maar onvolledig weergegeven** | Pagina opnieuw opgevraagd juli 2026: beide bedragen kloppen, maar staan er expliciet als **"user/month, paid yearly"** — het zijn dus **jaarabonnementsprijzen met automatische verlenging**, niet maandelijks opzegbare tarieven. Die nuance ontbrak in het rapport en is toegevoegd | https://www.microsoft.com/en-us/microsoft-365/planner/microsoft-planner-plans-and-pricing |
| 7 | Microsoft Plan 5 $55/gebruiker/maand | **onzeker** | Staat **niet** op Microsofts eigen plannenpagina (die toont alleen de gratis versie, Plan 1 en Plan 3). Alleen via derden bevestigd op $55/gebruiker/maand. Als lijstprijs plausibel, maar niet primair gesourced | https://secureframe.com/marketplace/microsoft/planner-and-project-plan-5 ; https://costbench.com/software/project-management/microsoft-project/ |
| 8 | Project Standard 2024 $679,99 en Professional 2024 $1.129,99 eenmalig | **bevestigd** | Beide bedragen letterlijk teruggevonden op Microsofts vergelijkingspagina, expliciet als "one-time purchase" (perpetual) | https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software |
| 9 | Powerproject "£1.500–2.500 perpetual per seat, SaaS £70–110/gebruiker/maand" | **onzeker / deels gecorrigeerd** | Eleco publiceert geen lijstprijzen (eigen shop gaf HTTP 429). Derden noemen **£880/gebruiker/jaar** voor een single-user-abonnement en **$2.000/gebruiker/jaar**. De perpetual-schatting is nergens te staven; de abonnementsschatting (£840–1.320/jaar) bracket wél de £880/jaar van derden | https://softwarefinder.com/project-management-software/powerproject ; https://www.itqlick.com/asta-powerproject/pricing |
| 10 | Primavera P6 "USD 2.500–3.000 perpetual + 22% onderhoud; cloud USD 175–250/gebruiker/maand" | **gecorrigeerd (te laag), blijft onzeker** | Oracle publiceert geen lijstprijs. Derden: P6 Professional **ca. USD 3.100–3.520 per perpetual gebruikerslicentie**; P6 EPPM ca. USD 2.750/gebruiker + ~22% support (≈ USD 605/jaar); abonnements-/cloudvormen **USD 3.000–25.000 per gebruiker per JAAR** (≈ USD 250–2.080/maand). De genoemde $175–250/maand ligt onder elke gevonden bron | https://www.itqlick.com/primavera-p6/pricing ; https://www.oraclelicensingexperts.com/ |
| 11 | Sitedrive: pilot €690/mnd (12 mnd, 1 project), 3 projecten €1.685/mnd, 6 €3.300/mnd, 9 €4.840/mnd, onbeperkte gebruikers | **bevestigd (exact)** | Prijspagina opnieuw opgevraagd: alle vier de bedragen, de 12-maandslooptijd en "unlimited users for all active projects" kloppen letterlijk. Per-projectprijzen nagerekend: 1.685/3 = €562 ✓, 3.300/6 = €550 ✓, 4.840/9 = €538 ✓ — de in §1 en §5 gebruikte spreiding €538–690/project/maand is correct afgeleid. Facturering is **jaarlijks** bij de 3/6/9-staffels | https://www.sitedrive.com/pricing |
| 12 | Admicom: Tempo €29, Vision €49, Insite €79, Bauhub €125/project per maand | **bevestigd, met eenheidsvoorbehoud** | Alle bedragen letterlijk teruggevonden (plus Quantima en Estima à €199/mnd, die het rapport wegliet). Belangrijke nuance: alleen bij **Bauhub** staat de eenheid expliciet als *per project*; bij de andere modules staat géén gebruikersaantal, dus "per gebruiker" is niet vastgesteld | https://www.admicom.com/fi/ratkaisut/projektinhallinta |
| 13 | Tactplan, VisiLean, Omega 365, Antura, Projectplace: prijs op aanvraag | **bevestigd** | Op alle vijf de leverancierssites opnieuw gecontroleerd; geen enkele publiceert tarieven. Tactplan: "a product tailored to your specific requirements", VisiLean alleen "book a demo" | https://tactplan.com/ ; https://visilean.com/ ; https://omega365.com/ |

### 8.3 Claims over marktleiderschap en dominantie

| # | Bewering | Oordeel | Onderbouwing | Bron |
|---|---|---|---|---|
| 14 | Admicom Planner is "Finlands populairste bouwplanningssoftware" / marktleider FI | **onzeker (leveranciersclaim)** | De zin bestaat, maar is Admicoms **eigen marketingtekst** en luidt letterlijk "Suomen suosituin rakennustyömaan aikatauluhallinnan ohjelmisto" (iets nauwer dan het rapport citeerde). Geen onafhankelijke marktaandeelmeting gevonden. In §3.6 en §5 stond het als feit; dat is teruggebracht tot een leveranciersclaim | https://www.admicom.com/fi/ratkaisut/projektinhallinta |
| 15 | "MS Project blijft de volumestandaard" in alle vier de landen | **onzeker** | Nergens per land becijferd; geen installed-base- of marktaandeelbron gevonden voor de Nordics. Blijft een redelijke maar ongetoetste hypothese; als zodanig gemarkeerd in de tabel van §3.6 | — (geen bron gevonden) |
| 16 | Powerproject: 100.000+ gebruikers wereldwijd, 13 talen incl. Zweeds/Deens/Noors | **bevestigd én aangevuld** | "More than 100,000 professionals worldwide" ✓ en exact 13 talen ✓ — maar de lijst bevat óók **Fins** (Engels AU/UK/US, Deens, Nederlands, Fins, Duits, Noors, Zweeds, Frans, Pools, Spaans, Italiaans, Turks). Het rapport liet Fins weg, wat de Nordics-conclusie versterkt in plaats van verzwakt: Powerproject is in alle vier de landen gelokaliseerd | https://eleco.com/products/powerproject/ |
| 17 | Safran opgericht 1997 in Stavanger | **bevestigd (primair register)** | Onafhankelijk geverifieerd in het Noorse handelsregister buiten de leverancierssite om: **Safran Software Solutions AS, org.nr 879388252**, opgericht 30-09-1997, geregistreerd 16-12-1997, Prof. Olav Hanssens vei 11, 4021 Stavanger | https://yra.no/en/company/879388252 |
| 18 | Antura-klanten: Trafikverket, Region Stockholm, Migrationsverket, SAAB, Atlas Copco | **gecorrigeerd (onjuist)** | **Geen van de vijf** staat op Antura's eigen klantenpagina (ruim 40 namen), en gericht zoeken op "Antura + Trafikverket" leverde geen enkele bevestiging. Wél geverifieerd: Försäkringskassan, Swedavia, Jernhusen, Göteborg Energi, Outokumpu, Munters, Mycronic, Fagerhult, Duni Group, Wallenstam en de gemeenten Umeå, Nacka, Karlskrona, Kristianstad. Oprichting 2001, kantoren Göteborg/Stockholm/Kopenhagen en 400+ implementaties zijn wél bevestigd | https://www.antura.se/kunder |
| 19 | Tactplan-klanten NCC, Skanska Sverige, MT Højgaard; actief in Nordics + "Spanje/Polen" | **deels gecorrigeerd** | Klanten bevestigd ✓ (plus Per Aarsleff, CG Jensen, Enemærke & Petersen, Jorton, Mestergruppen, Haahtela). **"Polen" is onjuist**: de buitenlandse referenties zijn Spaans (CAAT Valencia, Victor Tormo) en **Costa Ricaans** (Volio Trejos). Ook bevestigd dat Tactplan LBS/takt én Gantt/CPM in één tool combineert | https://tactplan.com/ |
| 20 | Exigo claimt 15–20% kortere bouwtijd; klanten Vejdirektoratet, Energinet, Aarsleff, CG Jensen, NCC, Siemens, DTU | **bevestigd (exact)** | Letterlijk: "we also typically reduce the construction time by a minimum of 15-20% without increasing resources". Alle zeven genoemde klantlogo's teruggevonden. Ook bevestigd dat Exigo Tactplan actief promoot (Tactplan Schedule / Tactplan Control) | https://exigo.dk/en/ |
| 21 | Sitedrive: 300+ bouwplaatsen, klanten Skanska/Caverion/Saint-Gobain/Hartela/Bonava/AF Gruppen, 15–50% tijdwinst | **bevestigd** | Alle zes klanten teruggevonden (plus Fira, Betonmast, Backe), "over 300 jobsites" ✓, en de claim "cut construction times by 15% from day one, up to 50% long-term" ✓. Blijft een **leveranciersclaim** zonder onafhankelijke meting | https://www.sitedrive.com/ |

### 8.4 Aanbestedings- en contracteisen

| # | Bewering | Oordeel | Onderbouwing | Bron |
|---|---|---|---|---|
| 22 | P6/XER-uitwisseling is gangbare **contracteis** bij Bane NOR, Nye Veier, Trafikverket; Femern en Trafikverket-megaprojecten "draaien op P6" | **weerlegd voor zover toetsbaar → onzeker** | Gericht gezocht in het Zweeds en Noors ("Trafikverket Primavera P6 krav tidplan upphandling", "Bane NOR Nye Veier Primavera P6 krav fremdriftsplan kontrakt") en op Femern: **geen enkel publiek document** schrijft P6, XER of enig ander planningsformaat voor. Een analyse van BIM-eisen in 16 grote Noorse infraprojecten (≥500 mln NOK; 9× Nye Veier, 2× Bane NOR) noemt geen planningssoftware-eis. De claim "P6 is verplicht bij overheidswerk" is voor de Nordics **niet onderbouwd** en in §4.2 afgezwakt | zoekverificatie via https://html.duckduckgo.com/ ; Novorender-analyse BIM-krav norske infrastrukturprosjekter |
| 23 | Statsbygg eist "al sinds ca. 2010" IFC-leveringen; SIMBA stelt IFC/IDS-eisen aan alle projecten | **gecorrigeerd** | Statsbygg stelt BIM-eisen aan al zijn projecten **sinds 2011** (gedocumenteerd), niet "ca. 2010". Twee nuances toegevoegd: de SIMBA-homepage noemt **IFC niet expliciet** (wel dat IDS van buildingSMART mvdXML gaat vervangen), en er staat nergens in juridische bewoordingen dat naleving verplicht is — het is een opdrachtgeverstandaard die via contracten doorwerkt. Het SIMBA-citaat zelf ("informatiestandaard en methodiek … in alle byggeprosjekter i Statsbygg") is wél correct | https://simba.statsbygg.no/ ; https://www.statsbygg.no/nyheter/ny-versjon-av-bim-krav/ |
| 24 | "PNS/WBS-koppeling aan NS 3420/kostenstandaarden" | **gecorrigeerd** | **NS 3420 is geen kostenstandaard** maar de Noorse standaard voor *beskrivelsestekster*: gestandaardiseerde postbeschrijvingen en hoeveelhedenlijsten voor bouw-, anleggs- en installatiewerk, primair bedoeld voor eenduidige aanbestedingsbeschrijvingen; calculatie en afrekening zijn afgeleide toepassingen | zoekverificatie NS 3420 (Standard Norge-beschrijvingen via derden) |

### 8.5 Overige gecontroleerde feiten

| # | Bewering | Oordeel | Onderbouwing | Bron |
|---|---|---|---|---|
| 25 | GenieBelt (Kopenhagen) fuseerde in 2019 met APROPLAN tot LetsBuild | **bevestigd, aangescherpt** | Aangekondigd **31 januari 2019**, Kopenhagen + Brussel, ca. 120 medewerkers bij de fusie | https://www.tech.eu/ ; PRWeb-persbericht 31-01-2019 |
| 26 | Projectplace: Zweeds, Stockholm 1998, nu van Planview | **bevestigd, aangevuld** | Opgericht **september 1998 in Stockholm**; **Planview nam het in 2014 over**. De in het rapport genoemde "historisch rond $29/gebruiker/maand" blijft een ongetoetste schatting — Planview publiceert geen tarieven | https://www.planview.com/products-solutions/products/projectplace/ |
| 27 | Elecosoft/Eleco kocht Consultec (Skellefteå) | **bevestigd, jaartal toegevoegd** | "År 2003 bytte Consultec ägare när brittiska Elecosoft plc förvärvade Consultec-koncernen"; zetel Skellefteå ✓ | zoekverificatie Zweedse bedrijfsbronnen |
| 28 | Admicom nam Tocoman over | **bevestigd, jaartal toegevoegd** | Beursbericht **10-03-2020**: "Admicom Oyj toteuttaa strategisen yrityskaupan hankkimalla helsinkiläisen ohjelmistoyritys Tocoman Oy:n" | Admicom Oyj yhtiötiedote 10-03-2020 |
| 29 | PlanMan is een "goedkoper alternatief voor Tocoman/Admicom" | **gecorrigeerd** | PlanMan Project en Tocoman Aikataulu zijn **zusterprogramma's**: PlanMan en Tocoman hebben ruim tien jaar samen aan Tocoman Aikataulu ontwikkeld, en die lijn is opgegaan in Admicom Planner. De relatie is dus (deels) coöperatief, niet puur concurrerend. Functionaliteit (jana-aikataulu, paikka-aikakaavio, blokschema's, ritme, resources, kosten) wél bevestigd | zoekverificatie Finse bronnen (planman.fi zelf onbereikbaar, HTTP 503) |
| 30 | Omega 365: Ølensvåg, klanten Aibel/Vår Energi/BKK, "NHS, Humber Carbon Capture"; "voorheen Omega/PIMS" | **deels gecorrigeerd** | Hoofdkantoor **Ølensvåg (Kvassanesvegen 4)**, 26 vestigingen ✓; Aibel, Vår Energi, BKK AS ✓. Maar "**Humber** Carbon Capture" staat er niet — de genoemde referenties zijn **Frimley Health NHS Foundation Trust, GATE Energy en Northern Endurance Partnership**. Ook: **PIMS is een product van Omega 365, geen voormalige bedrijfsnaam** | https://omega365.com/ |
| 31 | VisiLean: Helsinki, importeert P6/MSP/Powerproject, klanten Implenia/Mace/GRAHAM/Sisk | **bevestigd, aangevuld** | Kantoren Helsinki, Londen en Ahmedabad; import uit "Primavera P6, MS Project, or Asta Powerproject" met behoud van baselines/WBS/logica/kalenders ✓; klanten ook Goldbeck, Galliford Try, Mercury Engineering, Casais, SMP Alliance | https://visilean.com/ |

### 8.6 Restrisico's

- **Eén-bron-afhankelijkheid bij de marktomvang.** De hele §2-redenering hangt aan één vendor-forecast (Mordor) plus twee aannames (bbp-aandeel → softwareaandeel; aantal seats). Geen van beide aannames is gemeten. De uitkomst is een orde van grootte, geen raming: behandel EUR 35–75 mln als een bandbreedte met een factor 2 onzekerheid.
- **Leveranciersclaims blijven leveranciersclaims.** De 15–20% (Exigo), 15–50% (Sitedrive) en "Suomen suosituin" (Admicom) zijn alle drie letterlijk correct geciteerd, maar geen ervan is onafhankelijk gemeten. Niet als marktfeit doorgeven.
- **Prijzen van Oracle, Eleco, Tactplan, VisiLean, Omega 365, Antura en Planview zijn niet publiek.** Alle bedragen voor die pakketten komen uit prijsvergelijkers van derden en kunnen verouderd of regiospecifiek zijn; de Amerikaanse Microsoft-lijstprijzen zijn bovendien **VS-lijstprijzen**, niet de Zweedse/Noorse/Deense/Finse tarieven inclusief btw en valuta-opslag.
- **Websearch-beperking.** Zowel het oorspronkelijke onderzoek als deze verificatie draaide zonder algemene zoek-API; verificatie verliep via directe fetches en een HTML-zoekproxy. Enkele bronnen (Worldometer, StatisticsTimes, Eleco-webshop, G2/Capterra) gaven HTTP 403/429 en konden niet worden geraadpleegd.
