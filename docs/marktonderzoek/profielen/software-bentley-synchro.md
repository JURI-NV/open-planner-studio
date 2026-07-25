# Bentley SYNCHRO — diepgaand softwareprofiel

*Marktonderzoek planningssoftware — profiel opgesteld 25 juli 2026*
*Alle prijzen en versienummers zijn geverifieerd op de hieronder genoemde datum. Schattingen en onzekere punten zijn expliciet gemarkeerd met **[SCHATTING]** of **[ONZEKER]**.*
*Adversariële hercontrole uitgevoerd 25-07-2026 — zie de sectie **[Verificatie](#verificatie)** onderaan. Bijgestelde passages zijn in de tekst gemarkeerd met **[GECORRIGEERD]**.*

---

## 0. Samenvatting in één alinea

SYNCHRO is Bentley Systems' 4D-bouwplanningsportfolio: een zware Windows-desktopapplicatie (SYNCHRO 4D, voorheen SYNCHRO Pro) met een échte CPM-engine, plus een cloud-/mobielfamilie op Bentley's iTwin-platform (historisch Control, Field, Perform en Cost — **[GECORRIGEERD]** Bentley's productpagina noemt per 25-07-2026 alleen nog SYNCHRO 4D en SYNCHRO Perform; zie sectie 2). Het onderscheidt zich van Autodesk Navisworks TimeLiner doordat het geen visualisatielaag is maar een volwaardig planningsinstrument: taakduren, logica, kalenders, baselines, resources en kosten zitten er echt in. De prijs (USD 4.980 per gebruiker per jaar lijstprijs), de leercurve, de hardware-eisen (32 GB RAM, 16 GB GPU aanbevolen) en de Windows-only desktop maken het een tool voor gespecialiseerde 4D-planners bij grote aannemers en megaprojecten — niet voor het MKB of de incidentele gebruiker. Voor een IFC-first open-source planner is de belangrijkste bevinding dat SYNCHRO's IFC-ondersteuning **asymmetrisch** is: IFC gaat er als geometrie in, maar planningsdata reist in de praktijk via XER/P6 XML/MSPDI — niet via IfcWorkSchedule/IfcTask.

---

## 1. Wat het is

### Leverancier

**Bentley Systems, Incorporated** — Exton, Pennsylvania (VS). Opgericht in 1984 door Keith A. Bentley en Barry J. Bentley; beursgang september 2020 (Nasdaq: **BSY**, S&P 400-component).

| Kerncijfer (boekjaar 2025) | Waarde |
|---|---|
| Omzet | USD 1.501,8 miljoen (+11,0%; +10,1% op constante valuta) |
| ARR (31-12-2025) | USD 1.462,1 miljoen (2024: USD 1.283,3 miljoen) |
| ARR-groei | +11,5% op constante valuta |
| Vrije kasstroom | USD 520,2 miljoen |
| Medewerkers | ± 5.800 |
| Aanwezigheid | 45 landen, 189 markten |
| Omzetverwachting 2026 | USD 1.685–1.715 miljoen (+11–13% cc); ARR-groei 10,5–12,5%; FCF USD 500–570 miljoen |
| CEO | Nicholas Cumins (sinds juli 2024, eerste niet-familie-CEO) |

Bron: [Bentley Systems — Q4 en FY2025-resultaten (investors.bentley.com)](https://investors.bentley.com/news-releases/news-release-details/bentley-systems-announces-fourth-quarter-and-full-year-2025), primair geverifieerd 25-07-2026; bedrijfsprofiel via [Wikipedia — Bentley Systems](https://en.wikipedia.org/wiki/Bentley_Systems) (S&P 400-component, opgericht 1984, Synchro-overname 2018 zonder bekendgemaakte prijs).

Bentley's bredere portfolio: MicroStation, de OpenX-familie (OpenRoads, OpenRail, OpenBridge, OpenBuildings), ProjectWise, iTwin, en de recentere acquisities Seequent (geowetenschappen) en Cesium (3D-geospatial).

### Historie en eigendom

- **2001** — Synchro Software Ltd wordt opgericht in het **Verenigd Koninkrijk**; pionier in 4D-bouwsequencing. ([AEC Magazine, 21-02-2019](https://aecmag.com/features/bentley-synchro/))
- **± 2010** — Productlijn bestaat uit *Synchro Professional 4.3* (volledig, server-compatibel) en *Synchro Project Constructor* (standalone SketchUp-georiënteerd werkstation, **USD 990** = 825 licentie + 165 jaaronderhoud). Systeemeisen destijds: 3,0 GHz dual-core, 2 GB RAM, Windows XP/Vista. ([Project Controls Online](https://projectcontrolsonline.com/syncro/))
- **Juni 2018** — **Bentley Systems neemt Synchro Software over**; overnamesom niet bekendgemaakt. Doel: 4D-modellering verbreden van industriële plants (waar Bentley al ConstructSIM had) naar gebouwen en civiele infrastructuur. Chris Barron (Bentley) destijds over de meerwaarde t.o.v. klassieke planningstools: *"it gets down several levels below what you'd have on a P6."* ([AEC Magazine, 26-06-2018](https://aecmag.com/news/news-bentley-acquires-synchro-for-4d-construction-modelling/))
- **2022** — Uitbreiding met **SYNCHRO Cost** en **SYNCHRO Perform**; 4D/5D-modelauthoring in SYNCHRO 4D. ([AEC Magazine, 23-11-2022](https://aecmag.com/construction/bentley-enhances-synchro-construction-management-solution/))
- **November 2025** — Op *Year in Infrastructure 2025* onthult Bentley **SYNCHRO+**: een herontworpen, AI-ondersteunde opvolger van SYNCHRO 4D met "Bentley Copilot". Early Access december 2025, algemene beschikbaarheid **2026**. ([Bentley blog, nov. 2025](https://blog.bentley.com/software/bentley-unveils-synchro-at-yii-2025-ushering-in-a-new-era-of-ai-powered-4d-construction-planning/))

### Doelgroep en typische gebruikers

| Rol | Gebruik |
|---|---|
| Planner / scheduler (4D-specialist) | Bouwt en onderhoudt het 4D-model; primaire desktopgebruiker |
| BIM-coördinator / VDC-manager | Federeert modellen, koppelt geometrie aan taken |
| Uitvoeringsteam / werkvoorbereiding | Faseringsstudies, ruimte-/logistiekconflicten, methodestatements |
| Calculator / tendermanager | Model-based QTO, methodebevestiging in de tenderfase |
| Projectcontroller | EVA, voortgang, Power BI-rapportage |
| Veldpersoneel | SYNCHRO Field / Perform op tablet en telefoon |
| Opdrachtgever / bouwmanagement | Reviewen en goedkeuren van uitvoeringsplannen |

**Sectoren** (per GetApp-classificatie): bouw, civiele techniek, bouwmaterialen. In de praktijk: grote infrastructuur (rail, tunnels, water, bruggen), complexe hoogbouw, stadions, industriële en energieprojecten.

**Regio's**: wereldwijd, met historisch zwaartepunt in het **Verenigd Koninkrijk** (Synchro's herkomst; Crossrail, Tideway), verder Noord-Amerika, continentaal Europa, Midden-Oosten en Azië-Pacific.

### Opvallende klanten en referentieprojecten

| Project | Details |
|---|---|
| **Crossrail / Elizabeth Line** (Londen) | Malcolm Taylor (head of technical information): de 4D-modellen konden *"show the progress of design and installation at any particular point in time"* en hielpen conflicten opsporen *"that were not normally apparent from regular Gantt charts."* (AEC Magazine, 2018) |
| **Tideway** (grootste waterinfraproject VK) | Costain/VINCI/Bachy JV met SYNCHRO 4D + ProjectWise + OpenBuildings. **[GEPRECISEERD]** De casestudy meldt *"cut the program by over 90 days across two years"* (dus 90+ dagen over **twee jaar**, niet in één klap), ± **£300.000 directe** en **> £1 miljoen indirecte** besparing, sommige fasen 50% gecomprimeerd, risicorapportagetijd −20%. Let op: dit is een **door Bentley zelf gepubliceerde** casestudy ([casestudies.com](https://www.casestudies.com/company/bentley/case-study/costain-vinci-bachy-jv-industrializes-delivery-of-uks-largest-water-infrastructure-project)) — geen onafhankelijke verificatie |
| **Chase Center** (San Francisco) | Mortenson \| Clark organiseerde **151.000+ modelcomponenten**; winnaar *Year in Infrastructure 2019* in de categorie 4D-bouwmodellering |
| **Espai Barça / Camp Nou** (FC Barcelona) | 4D + mixed reality voor de fasering van de stadionrenovatie tussen wedstrijden door ([AEC Magazine](https://aecmag.com/news/news-4d-construction-modelling-helping-transform-fc-barcelona-stadium/)) |
| **Tantek 4D** | "Tallest Modular-Built High-Rise in the World" |

---

## 2. Functionaliteit en techniek

### Productfamilie

| Module | Platform | Functie |
|---|---|---|
| **SYNCHRO 4D** (voorheen SYNCHRO Pro) | Windows-desktop | Kernproduct: 4D-modellering, CPM-planning, QTO, simulatie, animatie |
| **SYNCHRO Control** | Web/cloud (iTwin) | Connected data environment, modelbeheer, review, IFC-export, delen |
| **SYNCHRO Field** | iOS 15+, Android 9+ (64-bit) | Veldtoegang: statuscontroles, werkplanning, inspecties |
| **SYNCHRO Perform** | Web + mobiel | Dagelijkse productiviteit, EVA-KPI's, dagboeken, timesheets, tickets, veldkosten, dag-/weekrapporten |
| **SYNCHRO Cost** | Web | Multicontractbeheer, betalingsaanvragen, change orders, budgetbewaking |
| **SYNCHRO Notes / Crew** (legacy) | Mobiel | Audio-/foto-notities met transcriptie, uren- en materieelregistratie |
| **SYNCHRO+** | Desktop **én** web, op Bentley Infrastructure Cloud + iModel | Aangekondigde opvolger met AI-copilot; Early Access dec. 2025, GA 2026 |

> **[GECORRIGEERD — productlijn is smaller geworden]** Bentley's eigen productpagina [bentley.com/software/synchro](https://www.bentley.com/software/synchro/) noemt op 25-07-2026 nog maar **twee** producten bij naam: **SYNCHRO 4D** (desktop) en **SYNCHRO Perform** (web/mobiel). De URL `bentley.com/software/synchro-control/` geeft **HTTP 404**, en een site-beperkte zoekopdracht op bentley.com levert geen actuele pagina voor SYNCHRO Control of SYNCHRO Cost op. SYNCHRO Field wordt nog wel door Bentley-partner [Aufiero](https://bentley.aufieroinformatica.com/en/synchro-eng/) beschreven. Conclusie: de bovenstaande vijfdelige moduletabel weerspiegelt de situatie van ± 2022–2024; **Control en Cost zijn als afzonderlijk gemarkeerde producten niet meer te verifiëren** en zijn vermoedelijk opgegaan in Perform / Bentley Infrastructure Cloud. Alle uitspraken elders in dit profiel die op Control of Cost leunen (waaronder de IFC-exportroute en de "complete office-to-field-portfolio"-claim) zijn daarmee **[ONZEKER]**.

### CPM-engine

SYNCHRO bevat een **volwaardige CPM-planner** — dit is het belangrijkste technische onderscheid met Navisworks TimeLiner:

- Echte duurvelden, logische relaties (FS/SS/FF/SF), constraints
- Kritiekepadberekening en **realtime herberekening** bij wijziging
- Kalenders met instelbare werkdagen en werkuren
- Directe visuele validatie: de rode tijdlijn door de planning slepen toont onmiddellijk de gevolgen van planningskeuzes
- Volgens een technische vergelijking: SYNCHRO is *"full-blown CPM scheduling software"*, terwijl in Navisworks TimeLiner *"tasks only have start and end dates — there's not even a field for duration"* ([LinkedIn-analyse, Dmytro Torianyk](https://www.linkedin.com/pulse/comparing-synchro-navisworks-timeliner-4d-planning-dmytro-torianyk-apm9f))

De Bentley-kennisbank omschrijft SYNCHRO 4D Pro als *"a complete CPM scheduling tool for construction"* met kritiekepadberekening, resourcebeheer en baselinetracking (KB0017484, bentleysystems.service-now.com).

### Resource- en kostenmodel

- **Resources**: 3D-resources (modelelementen), materieel/equipment, arbeid, materiaal. De kolom "3D Resource" toont per taak hoeveel elementen zijn gekoppeld.
- Toewijzing via **filters en auto-matching-regels** (resourcetoewijzing), naast handmatig koppelen.
- **Kosten**: vaste én variabele kosten op taken en op resources; kosten importeerbaar en aanpasbaar via bestandsinterfaces. Rapportage via **Earned Value Analysis**.
- **5D**: sinds 2022 is 4D/5D-modelauthoring geïntegreerd; model-based QTO genereert hoeveelheden die aan WBS/CBS worden gekoppeld.
- **Power BI-connector** met kant-en-klare Project-EVA-tab en Project-Gantt-tab (bevestigd in de officiële productdatasheet, © 2025).

### Baselines, scenario's en risico

- **Onbeperkt scenario's en baselines** opslaan, met side-by-side vergelijkende analyse — expliciet genoemd als voordeel t.o.v. Navisworks, dat geen baseline- of scenariovergelijking kent.
- **Risicobuffers**: buffers op activiteitenketens om het kritieke pad te beschermen, zodat geïdentificeerde risico's gemitigeerd worden zonder onnodige herplanning.
- **Monte-Carlo / probabilistische risicoanalyse**: **[ONZEKER — geen bewijs gevonden]**. In geen enkele officiële datasheet, kennisbankartikel of review is een ingebouwde Monte-Carlo-simulator aangetroffen. **[SCHATTING]** Het is waarschijnlijk dat kwantitatieve schemarisicoanalyse buiten SYNCHRO gebeurt (Primavera Risk Analysis, Safran Risk, Acumen Risk) en dat SYNCHRO alleen deterministische buffers biedt. Wie Monte-Carlo nodig heeft, moet uitgaan van een tweede tool.

### Portfolio en rapportage

- Federatie van meerdere modellen tot één 4D-model; cloudsamenwerking via connected data environment.
- Rapportage: EVA-KPI's, geplande-vs-werkelijke visualisatie, dag- en weekrapporten (Perform), Power BI-export.
- **Portfoliomanagement over meerdere projecten** is beperkt: SYNCHRO 4D is projectgericht; portfolio-overzicht loopt via Bentley Infrastructure Cloud / Control en Perform. **[SCHATTING]** Voor echt multi-project-portfolioplanning (resource-pooling over projecten heen) is SYNCHRO zwakker dan Primavera P6 EPPM of Oracle Primavera Cloud.

### Platform, hardware en schaalbaarheid

Officiële systeemeisen (Bentley productdatasheet SYNCHRO 4D, © 2025):

| | Specificatie |
|---|---|
| **Minimum** | Windows 10 64-bit, Windows 11 64-bit of Windows Server 2016; 2,8 GHz octa-core |
| **Aanbevolen** | 4 GHz octa-core, of 5 GHz octa-core "enterprise specification" |
| **Aanbevolen (reseller-detail)** | 4 GHz octa-core, **32 GB+ RAM**, **16 GB grafische kaart**, dual monitor 2560×1600 ([Aufiero Informatica](https://bentley.aufieroinformatica.com/en/synchro-eng/)) |

**Schaalbaarheid — realistisch aantal activiteiten:**

Bentley's eigen formulering bij de minimumspecificatie: *"The Minimum Specification accommodates a project with several thousand tasks, and some 3D information"* (Bentley kennisbank, via zoekresultaat). Hogere specificaties zijn er expliciet voor grotere projecten.

**[SCHATTING]** Op basis van deze formulering, het Chase Center-referentieproject (151.000+ modelcomponenten) en de zwaarte van de aanbevolen hardware:
- **Minimumspec**: enkele duizenden activiteiten (orde 2.000–5.000) met beperkte geometrie
- **Aanbevolen spec (32 GB / 16 GB GPU)**: comfortabel tot orde **20.000–50.000 activiteiten** met een groot federatief model
- **Enterprise spec**: 100.000+ activiteiten en honderdduizenden modelelementen zijn haalbaar, maar de praktische begrenzing is bijna altijd de **3D-geometrie**, niet het aantal taken — Bentley voegde in v6.5.6 een "Triangulate Shells"-optie toe juist omdat *"3D View might seem slower during camera interactions"*.
- Harde, door de leverancier gepubliceerde plafonds zijn **niet openbaar**; bovenstaande bandbreedtes zijn een schatting op basis van indirecte bronnen.

**Laatst geverifieerde versie**: SYNCHRO 4D Pro **2025 (v6.5.6)** — bevestigd als titel van Bentley-kennisbankartikel KB0045870, opgehaald 25-07-2026. Versiehistorie: 2021 = v6.4, 2022 = v6.5, 2023 = v6.5.3, 2024/2025 = v6.5.x. **[ONZEKER]** Dat dit in juli 2026 nog de *actuele* release is, kon **niet** worden aangetoond: er is geen Bentley-pagina gevonden die een 2026-release of v6.6 bevestigt, maar evenmin een pagina die v6.5.6 als huidig markeert. Gezien de SYNCHRO+-Early-Access in december 2025 is een nieuwere release aannemelijk; behandel het versienummer als "laatst bevestigd", niet als "huidig".

---

## 3. Prijzen

> **Belangrijke context:** Bentley verkoopt SYNCHRO grotendeels via directe verkoop en Enterprise License Subscriptions (ELS); alleen SYNCHRO 4D staat met een echte lijstprijs in Bentley's eigen webshop **Virtuosity**. Alle overige modules zijn "op aanvraag". Via de Virtuosity-eStore is het model **volledig termijn-abonnement** (12 maanden, geen perpetual optie) — dat is direct geverifieerd. **[ONZEKER]** De sterkere formulering "Bentley biedt sinds jaren *überhaupt* geen perpetual licenties meer voor SYNCHRO" is **niet** te staven: er is geen Bentley-verklaring gevonden die perpetual voor ELS/directe verkoop uitsluit. Bentley's eigen productpagina noemt geen enkel licentiemodel expliciet.

### Geverifieerde lijstprijs

| Product | Prijs | Term / model | Bron | Datum |
|---|---|---|---|---|
| **SYNCHRO 4D** | **USD 4.980,00** (excl. btw) | 12-maands *practitioner license*, incl. **2 Keys** (trainings-/servicecredits) | [en.virtuosity.com/synchro-4d](https://en.virtuosity.com/synchro-4d) — "Special Price USD 4,980.00" | opgehaald **25-07-2026** |
| SYNCHRO 4D (bevestiging) | USD 4.980 vóór belasting per jaar | idem; twee weken proefversie beschikbaar op aanvraag | [thetoolstrunk.com](https://thetoolstrunk.com/how-much-is-synchro-4d/) | artikel gepubliceerd **08-04-2026** |

### Overige gerapporteerde bedragen (lagere betrouwbaarheid)

| Product | Gerapporteerd bedrag | Bron | Kanttekening |
|---|---|---|---|
| SYNCHRO 4D | USD **4.280,00** /jaar ("special price on Virtuosity") | [zoftwarehub.com](https://www.zoftwarehub.com/products/synchro/pricing) | **Bevestigd als verouderd**: de pagina vermeldt zelf "last updated 18 november 2025" en voegt toe "prices vary by region". Het is dezelfde Virtuosity-actieprijs, maar van vóór de huidige notering — niet een regionale variant |
| SYNCHRO 4D | **€ 4.375** per practitioner-licentie per jaar | [pricingnow.com](https://pricingnow.com/question/synchro-pricing/) | **[ONZEKER]** — pagina "updated 8 maart 2026", maar noemt **geen enkele bron, leverancier of methode**. Aggregatorsite met vermoedelijk geautomatiseerd gegenereerde inhoud. Ligt wel in dezelfde orde van grootte als de USD-prijs |
| SYNCHRO **Control** | **€ 1.313** per licentie per jaar | pricingnow.com | **[ONZEKER]** — zelfde kanttekening; Bentley publiceert zelf geen prijs ("Contact Us") |
| SYNCHRO **Field** | **€ 394** per licentie per jaar | pricingnow.com | **[ONZEKER]** — zelfde kanttekening |
| SYNCHRO (onbenoemde instap) | vanaf **USD 695 per maand** | [SelectHub](https://www.selecthub.com/p/construction-scheduling-software/synchro/) én [zoftwarehub.com](https://www.zoftwarehub.com/products/synchro/pricing) | **[GECORRIGEERD — geen SelectHub-exclusief cijfer]** Hetzelfde bedrag staat óók als "starting price" op Zoftware, náást de $4.280-notering. Twee aggregators die hetzelfde getal dragen zijn geen twee onafhankelijke bronnen; dit is vermoedelijk één circulerend datapunt. Komt niet overeen met de eStore-prijs ($4.980/jr ≈ $415/mnd). Behandelen als **niet-betrouwbaar**, niet als "indicatief" |
| SYNCHRO **Notes / Crew** (legacy mobiel) | **USD 29,99** per gebruiker per maand | [SourceForge productpagina](https://sourceforge.net/software/product/SYNCHRO/) | Losstaande veld-apps, niet de 4D-desktop |
| *Historisch* — Synchro **Project Constructor** (pre-Bentley, ± 2010) | USD **990** (825 licentie + 165 jaaronderhoud) | [projectcontrolsonline.com](https://projectcontrolsonline.com/syncro/) | Illustreert het **verlaten perpetual + onderhoud-model**; niet meer verkrijgbaar |

### Licentiemodellen en staffels

- **Virtuoso Subscription** (Virtuosity eStore): 12 maanden, één *practitioner* (benoemde gebruiker), inclusief Keys — credits inwisselbaar voor training, mentoring en consultancy. Geschikt voor 1–enkele gebruikers; zelfbediening, creditcard.
- **Enterprise License Subscription (ELS)** / raamovereenkomsten: Bentley's standaard voor grotere afnemers, met toegang tot het bredere portfolio en verrekening op gebruik. **Bedragen zijn niet openbaar** en worden per onderhandeling bepaald. **[SCHATTING]** Bij volumes vanaf circa 10 seats zijn kortingen van 15–35% op de lijstprijs gangbaar in deze markt; harde bronnen ontbreken.
- **Minimale afname**: één practitioner-licentie via de eStore; geen gepubliceerd minimum voor ELS.
- **Modules/add-ons**: Control, Field, Perform en Cost worden apart gelicentieerd, allemaal "Contact Us". Training en implementatie zijn aparte kostenposten (Keys of losse diensten).
- **Proefversie**: twee weken, op aanvraag.

### Realistische totale eigendomskosten

**[SCHATTING]** Voor een team van 5 4D-planners plus 20 veldgebruikers, eerste jaar:
- 5 × SYNCHRO 4D à USD 4.980 = **± USD 25.000**
- Control + Field/Perform voor 20 veldgebruikers: **± USD 10.000–25.000** (afgeleid van de € 394/€ 1.313-indicaties; onzeker)
- Werkstations (32 GB RAM, professionele GPU): 5 × **± USD 3.000–4.500** = **USD 15.000–22.500**
- Training/implementatie: **USD 10.000–25.000**
- **Totaal eerste jaar: ruwweg USD 60.000–100.000**, daarna USD 35.000–50.000 per jaar aan licenties.

---

## 4. VOORDELEN

1. **Een echte CPM-engine, geen visualisatielaag.** Taakduren, netwerklogica, constraints, kritiekepadberekening en kalenders met werkdagen/-uren zitten in het product zelf, met realtime herberekening. Dit is het beslissende verschil met Navisworks TimeLiner, waar taken alleen start- en einddata hebben en zelfs geen duurveld bestaat. Je kunt in SYNCHRO daadwerkelijk plannen, niet alleen tonen. *(technische vergelijking Torianyk; Bentley KB0017484)*

2. **Onbeperkte baselines en scenario's met side-by-side vergelijking.** Meerdere uitvoeringsvarianten naast elkaar zetten en tegen de baseline afzetten is standaardfunctionaliteit. Navisworks heeft dit helemaal niet. Voor claim- en vertragingsanalyse is dat een wezenlijk voordeel.

3. **Sterkste schema-koppeling van de geteste 4D-tools.** In de peer-reviewde ÉTS-vergelijking (2024) scoort SYNCHRO **3/3** op "persistent link met de bronplanning" (Navisworks 2) en als enige naast Fuzor punten op **bidirectionele koppeling** (SYNCHRO 2, Navisworks 0). De synchronisatiemodi *skip / synchronize / consolidate / integrate* geven fijnmazige controle over wat er bij een update wel en niet wordt overschreven — cruciaal, omdat opnieuw importeren de bestaande 3D-koppelingen vernietigt.

4. **Brede import vanuit alle gangbare planningspakketten.** Primavera P6 (XER én XML), MS Project (MPP en XML), Asta Powerproject en Excel/CSV. Een reviewer noemt letterlijk als sterk punt: *"Importing schedule data from all common sources including P6, Asta, MS Project, and Excel."* Dat maakt SYNCHRO inzetbaar bovenop de bestaande planningsketen zonder die te vervangen.

5. **Model-based QTO en 5D.** Het opdelen ("slice and dice") van ontwerpmodellen in constructeerbare werkgebieden met **automatisch berekende hoeveelheden**, gekoppeld aan WBS/CBS en kosten — met behoud van de oorspronkelijke ontwerpintentie. Navisworks en de meeste 4D-viewers kunnen dit niet.

6. **Efficiënte animatie via Usage Profiles.** Waar Navisworks per element een aparte Animator-scène vereist ("unproductive due to the time and difficulty"), definieer je in SYNCHRO één *usage profile* dat je op alle elementen met dezelfde animatiestijl toepast. De ÉTS-studie noemt dit expliciet als tijdsbesparing.

7. **Directe visuele planningsvalidatie.** De ÉTS-onderzoekers noemen dit *"a very interesting feature"*: de rode tijdlijn slepen om onmiddellijk het effect van planningsbeslissingen op de voortgang te zien — snelle what-if zonder exportcyclus.

8. **Compleet office-to-field-portfolio op één cloud.** 4D (desktop) → Control (CDE) → Field (mobiel) → Perform (productiviteit/EVA) → Cost (contracten en betalingen), allemaal op Bentley Infrastructure Cloud/iTwin. **[ONZEKER — bijgesteld]** Deze vijfdelige keten is per 25-07-2026 **niet meer te verifiëren** op bentley.com: de productpagina noemt alleen SYNCHRO 4D en SYNCHRO Perform, en `/software/synchro-control/` geeft 404. De datasheet (© 2025) bevestigt wél generiek dat *"web and mobile applications extend the value of the 4D construction model"* en dat het model doorloopt *"into field workflows for status checks, work planning, review, and inspections within the SYNCHRO portfolio."* Het *bereik* klopt dus; de *productnamen* zijn mogelijk verouderd.

9. **Bewezen op megaprojecten.** Crossrail, Tideway (90+ dagen programmareductie over twee jaar, ± £300k direct + > £1 mln indirecte besparing), Chase Center (151.000+ componenten; Year in Infrastructure 2019, categorie *"Going Digital for Advancements in 4D Construction Modeling"* — geverifieerd via Cadalyst), Camp Nou. **Kanttekening bij herverificatie:** de *kwantitatieve* cijfers (Tideway, Chase Center) komen uit **door Bentley uitgegeven of Bentley-gesponsorde** casestudy- en awardmateriaal. Dat de projecten SYNCHRO gebruikten staat vast; de toegeschreven besparingen zijn **niet onafhankelijk geverifieerd** en moeten niet als harde ROI-bewijzen worden gepresenteerd.

10. **Consistent hoge gebruikerswaardering, met name voor support.** Software Advice (herverifieerd 25-07-2026): **4,7/5** over **32 reviews** — 22× vijf sterren, 9× vier, 1× drie, **0× één of twee**; subscores gebruiksgemak 4,3 / support **4,5** / value for money **4,1** / functionaliteit 4,3. Zoftware **4,6/5** over 97 reviews; SelectHub **94% zou aanbevelen** over 36 reviews. **Kanttekening:** Capterra, GetApp en Software Advice zijn alle drie eigendom van Gartner en **delen dezelfde reviewpool** — dat is één bron, geen drie. Met 32 reviews is de steekproef bovendien klein.

---

## 5. NADELEN

1. **Prijs, vooral voor kleinere partijen.** USD 4.980 per gebruiker per jaar is een reëel toetredingsdrempel. Reviewers zeggen het onomwonden: *"the price is high and expensive for smaller companies"* (Capterra). SelectHub noteert als beperking: *"The software's cost and licensing model might be difficult to justify for smaller firms."* Van alle subscores is **value for money met 4,1/5 de laagste** — bij een algemeen cijfer van 4,7 is dat een veelzeggende uitschieter.

2. **Zware leercurve — het is geen tool voor incidenteel gebruik.** Een senior planning manager: *"The software is very difficult to become completely familiar with for the occasional user."* Een ander: *"Learning curve from MS Project, P6, or Suretrak. Hard to figure out options and customization."* SelectHub: *"New team members might struggle to learn the software quickly due to its complexity."* De praktische consequentie: je hebt een toegewijde 4D-specialist nodig, niet een planner die er af en toe in duikt.

3. **Gedateerde, overvolle interface.** De traditionele toolbar-UI wordt beschreven als *"cluttered and less intuitive"* (Torianyk), en SelectHub noteert: *"Some users find it less intuitive to navigate compared to other 4D modeling software."* Dat Bentley SYNCHRO+ (2026) juist rond "intuitive design" positioneert, bevestigt dat dit een erkend probleem is.

4. **Hardware-eisen die in de praktijk beperkend zijn.** *"Requiring a dedicated graphics card can be prohibitive"* (Capterra). De aanbevolen configuratie — 32 GB+ RAM en een 16 GB grafische kaart — betekent een professioneel werkstation per gebruiker, bovenop de licentie. Laptops van de zaak volstaan meestal niet.

5. **Data-synchronisatie is frustrerend.** *"Syncing in data and updating files can be frustrating"* (Capterra); Zoftware noemt "Synchronization" expliciet als zwakte, evenals *"complex model representation management can be tedious."* SelectHub: het datasynchroniseren is *"cumbersome."* Dit is het meest herhaalde inhoudelijke klachtpunt over alle reviewplatforms heen.

6. **Geen automatische 3D↔taak-koppeling in de geteste versie.** In de ÉTS-vergelijking scoort SYNCHRO **0/3** op "automatic linking capability", tegen **3/3** voor zowel Navisworks als Fuzor: *"With the Synchro tool, linking between the 3D dimension and the schedule must be done manually, which may not pose a problem for small-scale projects. However, for considerably large projects, it would be advantageous to have the ability to perform this linking automatically."* **[Versiekanttekening]** De test gebruikte v2021; nieuwere versies bieden filters en auto-matching-regels voor resourcetoewijzing. Regelgebaseerd koppelen is dus deels aanwezig, maar de bruikbaarheid ervan is aantoonbaar zwakker dan bij de concurrentie.

7. **Onderhoudslast van het 4D-model.** Zoftware noteert als zwakte: *"Updating videos and models requires significant time investment."* SelectHub bevestigt dat het onderhouden van 4D-video's een aanzienlijke tijdsinvestering vergt. Een 4D-model is geen eenmalige investering maar een doorlopende verplichting.

8. **Windows-only desktop.** Geen macOS, geen Linux, geen volwaardige browserversie voor het authoring-werk (Windows 10/11 64-bit of Windows Server 2016). SYNCHRO+ belooft webtoegang, maar dat is 2026-materiaal.

9. **Vendor lock-in op meerdere niveaus.** Eigen projectformaat `.sp` / `.spx`; de iTwin Schedules API is **read-only** — Bentley's eigen documentatie stelt letterlijk dat *"POST and PATCH endpoints will be available in the future"* (herverifieerd 25-07-2026, geldt voor projecten op v6.5+). Je kunt planningsdata er programmatisch uithalen, maar er niets in terugschrijven. **[GECORRIGEERD]** De eerdere deelclaim "IFC-export vereist SYNCHRO Control" is bij herverificatie **niet bevestigd** en verwijderd uit dit nadeel: de onafhankelijke ÉTS-studie beschrijft IFC-export rechtstreeks vanuit de desktop. Het lock-in-argument rust dus op het eigen projectformaat en de read-only API, niet op een cloudpoort voor IFC.

10. **Terugweg naar P6 is problematisch.** Gebruikers melden dat directe export van SYNCHRO 4D naar P6 moeizaam is en dat de indirecte route via MS Project betrouwbaarder blijkt. Bovendien: *"refreshing from Synchro to the external source is not possible if the source file is a Ms Project file"* (ÉTS 2024) — de bidirectionele synchronisatie werkt met Primavera, maar niet met MS Project als bron.

11. **Bidirectionele 3D-koppeling die niet werkt.** De ÉTS-onderzoekers noteren over SYNCHRO Pro: het integreert *"a bidirectional linking option in the program, although this functionality is not operational."* Een gedocumenteerde functie die in de praktijk niet functioneert.

12. **Versiestabiliteit en regressies.** De ÉTS-onderzoekers moesten terugvallen op versie 2021 *"following some difficulties encountered with a newer version, notably the inability to integrate the Microsoft Project schedule"* — Bentley-technici moesten de oude versie aanleveren. Een kernimportfunctie die in een nieuwere release breekt, is een serieus signaal over releasekwaliteit.

13. **Geen ingebouwde probabilistische risicoanalyse.** **[ONZEKER — niet aangetroffen]** Er is geen Monte-Carlo-functionaliteit gevonden in datasheets, kennisbank of reviews. Alleen deterministische risicobuffers op activiteitenketens. Wie kwantitatieve schemarisicoanalyse nodig heeft, koopt een tweede tool.

14. **Praktische ergonomie in het 3D-venster.** De ÉTS-onderzoekers: *"When integrating the model into Synchro Pro, I noticed that it was impossible to select an individual element directly from the 3D model. At each attempt, the entire model was selected"* — wat selectie via de boomstructuur afdwong, *"not always straightforward and time-consuming."* Ook: Revit-families worden niet ondersteund.

15. **Roadmap-onzekerheid rond SYNCHRO+.** SYNCHRO+ (GA 2026) is expliciet gepositioneerd als *"not merely an upgrade"* maar een herontworpen product op een andere architectuur (Infrastructure Cloud + iModel). Voor bestaande gebruikers met grote SYNCHRO 4D-projectbestanden betekent dat migratierisico en onzekerheid over hoe lang de klassieke desktop nog wordt doorontwikkeld. **[SCHATTING]** Gezien Bentley's patroon bij eerdere productmigraties is een overlapperiode van meerdere jaren waarschijnlijk, maar Bentley heeft geen einddatum voor SYNCHRO 4D Pro gepubliceerd.

---

## 6. Interoperabiliteit

> **Dit is de sectie die er voor een open-source, IFC-gebaseerde planner het meest toe doet.**

### Planningsformaten

| Richting | Formaten |
|---|---|
| **Import** | Primavera P6 **XER** en **P6 XML**; Microsoft Project **MPP** en **XML (MSPDI)**; **Asta Powerproject**; **Excel / CSV** |
| **Export** | MS Project **XML**, Primavera **P6 en P3**, **IFC**, **Microsoft Excel** *(ÉTS 2024, geverifieerd op SYNCHRO 4D Pro)* |
| **Synchronisatie** | Persistent én bidirectioneel met de bronplanning, met de modi *skip / synchronize / consolidate / integrate* |

**Beperkingen in de praktijk:**
- Opnieuw importeren van een planning **vernietigt bestaande 3D-koppelingen** — je moet de synchronisatiefunctie gebruiken, niet re-import.
- **Refresh naar de bron werkt niet met MS Project-bronbestanden**; wel met Primavera. (ÉTS 2024)
- Gebruikers melden dat **directe export naar P6 moeizaam** is; de omweg via MS Project wordt als betrouwbaarder beschreven.
- P6 XML wordt aanbevolen boven XER om baselinedata niet te beschadigen.

### 3D-/modelformaten

- **± 40 tot 50+ bestandstypen/applicaties**, afhankelijk van de bron ("40+ Bentley and 3rd party file types" volgens Bentley). **[GECORRIGEERD]** De eerder genoemde "~58 volgens reseller-documentatie" is bij herverificatie **niet teruggevonden**: de reseller-pagina ([Aufiero](https://bentley.aufieroinformatica.com/en/synchro-eng/), opgehaald 25-07-2026) spreekt van *"interoperable with over 50 CAD applications"* — applicaties, niet bestandstypen. Het getal 58 is verwijderd.
- Genoemd: **IFC**, DGN, DWG, DWF, RVT (via Revit-plugin), SKP, FBX, 3D PDF, 3DS, CATIA V5, SolidWorks, HSF.
- Meerdere bestandstypen tegelijk importeerbaar in één federatief project.
- **Revit-families worden niet ondersteund** (ÉTS 2024).
- Eigen projectformaat: **`.sp` / `.spx`** (Synchro Project).

### IFC — gedetailleerd

**Import:** IFC-geometrie wordt ondersteund als 3D-bronformaat. De ÉTS-studie noemt IFC-compatibiliteit expliciet als een van de punten waarop SYNCHRO en Fuzor zich onderscheiden.

**Export:** hier spreken de bronnen elkaar tegen en is het profiel bij herverificatie bijgesteld.

| Bron | Wat er staat | Status |
|---|---|---|
| Bentley SYNCHRO-forum (indirect geciteerd) | *"Bentley iModel supports export to IFC 4.3 RC1, IFC 2X3 and IFC 2X3 CV 2.0. This requires using SYNCHRO Control."* | **[ONZEKER]** — bij herverificatie op 25-07-2026 kon de oorspronkelijke forumpost niet worden teruggevonden; enkelvoudige, niet-primaire bron |
| [Bentley iTwin Synchronization/Export API](https://developer.bentley.com/api-groups/synchronization/) (primair, herverifieerd 25-07-2026) | Ondersteunde export: *"IFC 4.3, IFC 2x3, IFC2x3 CV 2.0, IFC4 RV 1.2 and IFC4.3 ABV"* — **zonder** de aanduiding "RC1" | **Geverifieerd** |
| Sanon & Boton, ÉTS 2024 (onafhankelijk, getest op SYNCHRO 4D Pro v2021) | *"it is possible to export the schedule in several formats such as Ms Project XML, Primavera P6 and P3, IFC, and Microsoft Excel"* — vanuit de **desktop**, zonder vermelding van Control | **Geverifieerd (PDF-tekst)** |

> **[GECORRIGEERD] Twee bijstellingen t.o.v. de eerste versie van dit profiel:**
> 1. **"IFC 4.3 RC1" is niet houdbaar als vaste bewering.** Bentley's *eigen, actuele* developer-documentatie noemt gewoon **IFC 4.3** (plus IFC4.3 ABV). De "RC1"-formulering komt uit één forumcitaat dat niet opnieuw te vinden was en waarschijnlijk verouderd is. De eerdere conclusie "IFC-versie-actualiteit: matig" was daarmee **te hard geformuleerd**. Wat wél blijft staan: Bentley publiceert geen conformiteitsverklaring tegen **ISO 16739-1:2024**, dus toets bij aanbesteding zelf.
> 2. **"IFC-export vereist SYNCHRO Control" is intern tegenstrijdig en niet bevestigd.** De onafhankelijke ÉTS-studie beschrijft IFC-export rechtstreeks vanuit SYNCHRO 4D Pro desktop. Bovendien is SYNCHRO Control als los product op bentley.com niet meer aantoonbaar (zie de correctie bij de moduletabel). De claim is verlaagd naar **[ONZEKER]** en mag niet als vaststaand nadeel worden gebruikt.
>
> Bentley SYNCHRO staat **niet** als afzonderlijk gecertificeerd product op de buildingSMART-lijst van gecertificeerde software (buildingsmart.org was tijdens dit onderzoek niet direct bereikbaar; **[ONZEKER]** — verifieer bij aanbesteding).

**IfcWorkSchedule / IfcTask — het cruciale punt:**

**[ONZEKER / niet aangetoond]** Er is in dit onderzoek **geen publieke documentatie gevonden** waaruit blijkt dat SYNCHRO planningsdata schrijft of leest als **`IfcWorkSchedule`**, **`IfcTask`** of **`IfcTaskTime`**. Alle aangetroffen documentatie beschrijft IFC bij SYNCHRO als een **geometrieformaat**; de planningsuitwisseling loopt consequent via XER, P6 XML, MSPDI en CSV. Een academische feasibility-studie naar IFC-gebaseerde 4D-simulatie in commerciële platforms bestaat (ASC 2018), maar was tijdens dit onderzoek niet bereikbaar (HTTP 503).

Dit is relevant, want IFC 4.3 ondersteunt planningsdata wél volwaardig: *"basic task time information (scheduled start time, scheduled finish time, duration) is now directly attached to IfcTask through the TaskTime attribute"* ([buildingSMART IFC 4.3-specificatie](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/lexical/IfcTask.htm)).

**Conclusie voor de opdrachtgever:** SYNCHRO's IFC-ondersteuning is **asymmetrisch en geometrie-georiënteerd**. Er zit een reëel gat tussen wat IFC 4.3 als standaard kan (volledige werkschema's in open formaat) en wat de marktleider in 4D er daadwerkelijk mee doet. Dat is tegelijk een kans (een IFC-native planner vult een echt gat) en een waarschuwing (uitwisseling mét SYNCHRO zal in de praktijk via **P6 XML/XER/MSPDI** moeten lopen, niet via IFC — wie alleen IFC ondersteunt, praat niet met SYNCHRO).

### API's en automatisering

| API | Mogelijkheden | Beperking |
|---|---|---|
| **iTwin Schedules API** | Leest **tasks, resources, resource statuses, resource groups, user fields** uit een SYNCHRO 4D Infrastructure Cloud-project (**v6.5+**) | **Alleen GET.** Bentley: *"POST and PATCH endpoints will be available in the future."* User Fields kunnen miljoenen rijen bevatten met bijbehorende performanceproblemen |
| **iModels API** | Centrale opslag van projectdata | — |
| **Synchronization API** | Engineering data omzetten naar web-viewbare vorm; **IFC-export** | Vereist cloudprojecten |
| **Forms / Issues / Changed Elements API** | Reviewworkflows, wijzigingsdetectie | — |
| **Webhooks API** | Abonneren op iTwin-events | — |
| **Power BI-connector** | Kant-en-klare EVA- en Gantt-rapportage | — |

**Kernconstatering:** er is **geen ondersteunde schrijfweg** naar SYNCHRO-planningen via API. Integraties kunnen data uitlezen, maar terugschrijven moet via bestandsimport (XER/XML). Dat beperkt tweerichtingsintegraties fundamenteel.

### Interoperabiliteitsscore samengevat

| Aspect | Oordeel |
|---|---|
| Planning importeren (P6/MSP/Asta/Excel) | **Sterk** |
| Planning exporteren | **Redelijk** (MSP XML/P6/P3/IFC/Excel), maar P6-export in de praktijk moeizaam |
| 3D-modelimport | **Zeer sterk** (40+ formaten; reseller: 50+ CAD-applicaties) |
| IFC-geometrie in | **Goed** |
| IFC-planning (IfcWorkSchedule/IfcTask) | **Niet aangetoond** — waarschijnlijk afwezig |
| IFC-versie-actualiteit | **Redelijk** — Bentley's actuele API-documentatie noemt IFC **4.3** (en 4.3 ABV); de eerdere "RC1"-lezing is niet houdbaar. Wel: **geen aangetoonde bSI-certificering** |
| API schrijven | **Afwezig** (read-only) |
| Open formaten als primaire opslag | **Nee** — eigen `.sp`/`.spx` |

---

## 7. Marktpositie

### Waar sterk, en waarom

SYNCHRO is het sterkst waar **planningsdiepte en modelcomplexiteit samenkomen**:

- **Megaprojecten en complexe infrastructuur** (rail, tunnels, water, bruggen, stadions, energie) waar de fasering zelf het risico is en 4D contractueel of door de opdrachtgever wordt geëist.
- **Lineaire projecten**: de productdatasheet noemt expliciet *"tackle the spatial challenges of linear projects"* — een gebied waar Navisworks zwak is.
- **Organisaties die al in het Bentley-ecosysteem zitten** (ProjectWise, OpenRoads/OpenRail/OpenBuildings, iTwin): SYNCHRO is dan een logische uitbreiding met een gedeelde datalaag.
- **Verenigd Koninkrijk en Noordwest-Europa**, historisch de thuisbasis van Synchro Software en van de zwaarste 4D-referenties (Crossrail, Tideway).

### Belangrijkste concurrenten

| Concurrent | Positionering t.o.v. SYNCHRO |
|---|---|
| **Autodesk Navisworks (TimeLiner)** | De facto standaard qua verspreiding en gratis Freedom-viewer; ondersteunt 60+ formaten. Maar **geen duurvelden, geen logica, geen kalenders, geen baselines** — puur visualisatie. SYNCHRO wint op planning, Navisworks op UI, clashdetectie en deelbaarheid |
| **Fuzor** (Kalloc Studios) | De "nieuwe generatie": in de ÉTS-vergelijking (2024) totaalscore **54** tegen **41** voor zowel SYNCHRO als Navisworks. Wint op 4D-functionaliteit, 3D-manipulatie, rendering, VR en automatisch koppelen. Reëel bedreigend voor SYNCHRO's positie |
| **Asta Powerproject BIM** (Elecosoft) | Sterk in het VK; planner-first met 4D erbij, lagere prijs, lagere leercurve |
| **Bexel Manager** | 4D/5D met sterke QTO en modelanalyse, agressiever geprijsd |
| **Oracle Primavera Cloud / P6** | De planningsbron waar SYNCHRO bovenop draait, niet direct een 4D-concurrent — maar wel de plek waar het schema-eigenaarschap ligt |
| **Trimble / Vico Office** | Vico is grotendeels uitgefaseerd; Trimble bedient de markt nu anders |
| **InEight, Procore** | Bredere projectcontrols/bouwmanagement, minder diep in 4D |

### Trend

**Groeiend, maar vanuit een kleine basis.** Signalen:

- Bentley-breed: omzet 2025 **+11%**, ARR **+11,5%**, verwachting 2026 ARR-groei 10,5–12,5% — gezonde, stabiele groei, al is dat concernbreed en niet specifiek SYNCHRO.
- Marktrapporten voor 4D/BIM-software voorspellen **8,9–14,9% CAGR** tot 2034/2035 (dataintelo, Fortune Business Insights, MarketsandMarkets).
- **Maar**: de ÉTS-onderzoekers stellen nuchter vast dat *"adoption rates remain relatively low, primarily due to various factors including limited client demand, specific organizational challenges, as well as varying levels of user experience and competence"*, en dat *"certain technical obstacles related to currently available software in the market may also hinder the adoption of 4D simulation."* 4D is na twintig jaar nog steeds geen standaardpraktijk.
- Bentley's zware inzet op **SYNCHRO+ met AI (GA 2026)** is een expliciete poging om 4D uit de specialistenhoek te halen — het bevestigt dat toegankelijkheid het belangrijkste groeiobstakel is.

**Verplichtstellingen:** 4D wordt op grote publieke infraprojecten (VK, Scandinavië, Nederland, Singapore) steeds vaker via BIM-uitvoeringsplannen geëist, maar **[ONZEKER]** — er is geen mandaat gevonden dat SYNCHRO *bij naam* voorschrijft. De eisen zijn tool-agnostisch geformuleerd, wat gunstig is voor open alternatieven.

**[SCHATTING] Positionering:** SYNCHRO is niet de meest verspreide 4D-tool (dat is Navisworks, dankzij bundeling in de Autodesk AEC Collection), maar wel de meest *diepgaande* voor planners, en het is marktleider in het segment "4D als serieus planningsinstrument op megaprojecten". De positie wordt aan de onderkant aangevallen door goedkopere, toegankelijker tools (Asta, Bexel) en aan de bovenkant door technisch modernere (Fuzor).

---

## 8. Eindoordeel

### Voor wie is dit de juiste keuze

- **Grote aannemers en joint ventures op megaprojecten** (> €100 miljoen) met een toegewijd 4D-/VDC-team en professionele workstations. Hier verdient de licentie zich terug in één vermeden faseringsfout.
- **Organisaties die Primavera P6 als planningsbron hebben** en 4D als analyse- en communicatielaag daarbovenop willen. SYNCHRO's P6-synchronisatie is de sterkste van het veld.
- **Bedrijven die al Bentley-breed werken** (ProjectWise, OpenRail/OpenRoads, iTwin). De gedeelde datalaag en één leverancierrelatie zijn dan reële voordelen.
- **Projecten met contractuele 4D-eisen of hoge faseringrisico's**: stadsbinnenstedelijk bouwen, spoor met treinvrije periodes, stadions met wedstrijdschema's, ziekenhuizen in bedrijf.
- **Wie de hele keten van kantoor tot veld bij één leverancier wil**: Control/Field/Perform/Cost is een dekkingsgraad die weinig concurrenten evenaren.

### Voor wie niet

- **MKB en kleinere aannemers.** USD 4.980 per gebruiker per jaar plus een werkstation van €3.000+ plus training — de reviewers zeggen zelf dat het kostenmodel voor kleinere firma's moeilijk te rechtvaardigen is.
- **Incidentele gebruikers.** *"Very difficult to become completely familiar with for the occasional user"* is geen kleine kanttekening maar de kern: zonder iemand die er wekelijks in werkt, verdampt de investering.
- **Teams zonder zware Windows-workstations**, of die op macOS/Linux werken.
- **Wie een open, IFC-first uitwisseling wil.** Eigen `.sp`/`.spx`-formaat, geen aangetoonde IfcWorkSchedule/IfcTask-ondersteuning, en een **read-only** API. Dit is een gesloten systeem met open-formaat-koppelvlakken aan de randen. *(Bijgesteld: "IFC-export alleen via de betaalde cloudlaag" en "IFC 4.3 nog op RC1" zijn bij herverificatie niet bevestigd — zie sectie 6.)*
- **Wie Monte-Carlo-risicoanalyse in dezelfde tool verwacht** — dat zit er niet in.
- **Wie primair mooie animaties wil.** Dan is Fuzor of Navisworks goedkoper en sneller; SYNCHRO's meerwaarde zit in de planning, en het product loopt zelfs het risico *"misconstrued as an animation or viz tool"* te worden (AEC Magazine).

### Wat dit betekent voor een open-source, IFC-gebaseerde planner

1. **Het IFC-planningsgat is echt.** De marktleider in 4D gebruikt IFC voor geometrie, niet voor schema's. IFC 4.3's `IfcWorkSchedule`/`IfcTask`/`IfcTaskTime` zijn onderbenut in commerciële tools. Een planner die planningen *native* in IFC 4.3 opslaat en round-trippt, doet iets dat SYNCHRO aantoonbaar niet doet.
2. **Maar IFC alleen is niet genoeg om mee te praten.** Om überhaupt data uit te wisselen met de bestaande keten moet een open planner **P6 XML, XER en MSPDI** ondersteunen. Dat is waar de schema's daadwerkelijk leven.
3. **De read-only API van SYNCHRO is een structurele kans.** Er is geen ondersteunde manier om planningsdata *terug* te schrijven naar SYNCHRO. Een open tool die wél tweerichtingsverkeer biedt op open formaten heeft daar een fundamenteel argument.
4. **Onderschat de CPM-lat niet.** SYNCHRO's voorsprong op Navisworks is precies wat een serieuze planner moet hebben: duren, logica, constraints, kalenders met werkuren, kritiek pad met total float, meerdere baselines, scenariovergelijking. Dat is de minimale functionele lat voor geloofwaardigheid bij professionele planners.
5. **De zwakke plekken van SYNCHRO wijzen de weg**: automatisch regelgebaseerd koppelen van model aan taken, een niet-overvolle UI, lichte hardware-eisen, betrouwbare bidirectionele synchronisatie, en werken op andere platforms dan Windows. Dat is precies de lijst waar reviewers en onderzoekers over klagen.

---

## Bronnenlijst

Alle bronnen opgehaald op **25 juli 2026**, tenzij anders vermeld.

### Leverancier en officiële documentatie
1. [Bentley — SYNCHRO productoverzicht](https://www.bentley.com/software/synchro/)
2. [Bentley — Product Data Sheet SYNCHRO 4D (PDF, © 2025)](https://www.bentley.com/wp-content/uploads/PDS-SYNCHRO-4D-LTR-EN-LR.pdf) — systeemeisen, kernfuncties, Power BI-connector
3. [Virtuosity (Bentley eStore) — SYNCHRO 4D](https://en.virtuosity.com/synchro-4d) — lijstprijs USD 4.980,00
4. [Bentley blog — SYNCHRO+ onthuld op YII 2025 (nov. 2025)](https://blog.bentley.com/software/bentley-unveils-synchro-at-yii-2025-ushering-in-a-new-era-of-ai-powered-4d-construction-planning/)
5. [Bentley ServiceNow-kennisbank — SYNCHRO 4D Pro 2025 (v6.5.6) release](https://bentleysystems.service-now.com/community?id=kb_article_view&sysparm_article=KB0045870)
6. Bentley ServiceNow-kennisbank KB0017484 — SYNCHRO 4D Pro als CPM-planningstool; importformaten
7. [Bentley iTwin developer — Schedules API](https://developer.bentley.com/apis/schedules/) — read-only, POST/PATCH aangekondigd
8. [Bentley iTwin developer — API-overzicht](https://developer.bentley.com/apis/)
9. [Bentley iTwin developer — Synchronization/Export API (IFC-formaten)](https://developer.bentley.com/api-groups/synchronization/)
10. [Aufiero Informatica (Bentley-partner) — SYNCHRO productdetails](https://bentley.aufieroinformatica.com/en/synchro-eng/) — aanbevolen specificaties, SYNCHRO Field-platformeisen

### Reviewplatforms
11. [Capterra — SYNCHRO reviews](https://www.capterra.com/p/35289/Synchro/reviews/) — 4,7/5, 32 reviews
12. [Software Advice — SYNCHRO reviews](https://www.softwareadvice.com/product/6302-Synchro/reviews/) — subscores incl. value for money 4,1
13. [GetApp — SYNCHRO reviews en features](https://www.getapp.com/construction-software/a/synchro/reviews/) en [productpagina](https://www.getapp.com/project-management-planning-software/a/synchro/)
14. [SelectHub — SYNCHRO analyse](https://www.selecthub.com/p/construction-scheduling-software/synchro/) — 94% aanbeveling, 36 reviews, beperkingen
15. [Zoftware — SYNCHRO reviews](https://www.zoftwarehub.com/products/synchro/reviews) — 4,6/5, 97 reviews
16. [Zoftware — SYNCHRO pricing](https://www.zoftwarehub.com/products/synchro/pricing)
17. [SourceForge — SYNCHRO (Notes/Crew) productpagina](https://sourceforge.net/software/product/SYNCHRO/) — USD 29,99/gebruiker/maand
18. G2 (g2.com/products/synchro/reviews) — **niet toegankelijk** (HTTP 403)
19. TrustRadius (trustradius.com/products/bentley-systems-synchro) — **niet toegankelijk** (HTTP 403)
20. Gartner Peer Insights — **niet toegankelijk** (HTTP 403)

### Prijsbronnen
21. [TheToolsTrunk — "How Much Is Synchro 4D?" (gepubliceerd 08-04-2026)](https://thetoolstrunk.com/how-much-is-synchro-4d/) — bevestigt USD 4.980
22. [PricingNow — SYNCHRO pricing](https://pricingnow.com/question/synchro-pricing/) — **[ONZEKER]**, € 4.375 / € 1.313 / € 394
23. [Project Controls Online — Synchro (historisch, pre-Bentley)](https://projectcontrolsonline.com/syncro/) — Project Constructor USD 990 perpetual + onderhoud

### Onafhankelijke technische analyse
24. **Sanon, S. & Boton, C. (2024)** — *"Comparative Study of Three 4D Simulation Software"*, Proceedings of the Creative Construction Conference 2024, École de Technologie Supérieure Montréal. DOI: [10.3311/CCC2024-157](https://doi.org/10.3311/CCC2024-157) — [PDF](https://espace2.etsmtl.ca/id/eprint/29768/1/Boton-C-2024-29768.pdf). *De belangrijkste onafhankelijke bron in dit profiel: scoretabel Navisworks 41 / Synchro 41 / Fuzor 54, exportformaten incl. IFC, automatisch koppelen 0/3, bidirectionele link, MS Project-refreshbeperking.*
25. [Torianyk, D. — "Comparing SYNCHRO and Navisworks Timeliner for 4D Planning" (LinkedIn)](https://www.linkedin.com/pulse/comparing-synchro-navisworks-timeliner-4d-planning-dmytro-torianyk-apm9f)
26. [Saadani, T. — "Navisworks vs Synchro" (Medium)](https://medium.com/@takouasaadani/navisworks-vs-synchro-a-comprehensive-comparison-for-4d-simulations-and-schedule-management-in-d67ed4a55908)
27. Rasheed & co. (2018) — *"A Feasibility Study of IFC-Based BIM 4D Simulation Using Commercial Platforms"*, ASC — ascpro0.ascweb.org/archives/cd/2018/paper/CPRT119002018.pdf — **niet bereikbaar** (HTTP 503)

### Vakpers en marktcontext
28. [AEC Magazine — "Bentley acquires Synchro for 4D construction modelling" (26-06-2018)](https://aecmag.com/news/news-bentley-acquires-synchro-for-4d-construction-modelling/)
29. [AEC Magazine — "Bentley Synchro" achtergrondartikel (21-02-2019)](https://aecmag.com/features/bentley-synchro/) — oprichting VK 2001, Crossrail, Camp Nou
30. [AEC Magazine — "Bentley enhances Synchro construction management tool" (23-11-2022)](https://aecmag.com/construction/bentley-enhances-synchro-construction-management-solution/) — Cost en Perform
31. [AEC Magazine — 4D bij FC Barcelona stadion](https://aecmag.com/news/news-4d-construction-modelling-helping-transform-fc-barcelona-stadium/)
32. [Case Studies — Costain/VINCI/Bachy JV, Tideway](https://www.casestudies.com/company/bentley/case-study/costain-vinci-bachy-jv-industrializes-delivery-of-uks-largest-water-infrastructure-project)
33. [Cadalyst blog — Chase Center, 151.000+ componenten](https://blog.cadalyst.com/architecture-infrastructure-construction-solutions/synchronize-your-construction-documents-and-components)
34. [Wikipedia — Bentley Systems](https://en.wikipedia.org/wiki/Bentley_Systems) — historie, financiën, acquisities
35. [Bentley Systems — Q4 en volledig boekjaar 2025, persbericht (investors.bentley.com)](https://investors.bentley.com/news-releases/news-release-details/bentley-systems-announces-fourth-quarter-and-full-year-2025) — **primaire bron, toegevoegd bij de hercontrole van 25-07-2026** (verving de eerdere "via zoekresultaten"-notering): omzet USD 1.501,8 mln, ARR USD 1.462,1 mln, FCF USD 520,2 mln, guidance 2026
35b. [Bentley — SYNCHRO 4D gratis proefversie (landingspagina)](https://www.bentley.com/lp/synchro-4d-trial-free-download/) — twee weken, op aanvraag

### Standaarden
36. [buildingSMART — IFC 4.3 specificatie, IfcTask](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/HTML/lexical/IfcTask.htm) — TaskTime-attribuut
37. [buildingSMART — IFC 4.3 release](https://standards.buildingsmart.org/IFC/RELEASE/IFC4_3/)
38. buildingSMART gecertificeerde software — **niet toegankelijk** (HTTP 403); SYNCHRO-certificering **[ONZEKER]**

---

## Methodologische verantwoording

- Dit profiel is opgesteld met **WebFetch-onderzoek** via meerdere zoekmachines (DuckDuckGo HTML, Bing RSS, Brave Search) en directe fetches van leveranciers-, review- en documentatiepagina's. De WebSearch-quota van de sessie was bij aanvang uitgeput; alle bevindingen komen uit direct opgehaalde pagina's.
- **Niet bereikbaar tijdens dit onderzoek**: G2, TrustRadius, Gartner Peer Insights, Reddit (r/projectmanagement, r/construction, r/civilengineering), Planning Planet (allen HTTP 403 of blokkade). De gebruikersstemmen in dit profiel komen daardoor uit Capterra, Software Advice, GetApp, SelectHub en Zoftware, plus onafhankelijk academisch onderzoek — vijf onafhankelijke reviewbronnen die onderling **consistent** zijn (leercurve, prijs, synchronisatie, hardware), wat het vertrouwen in de bevindingen ondersteunt.
- Waar bronnen elkaar tegenspreken (met name prijzen) zijn **alle** waarden vermeld, met de betrouwbaarste bron eerst.
- Alle eigen gevolgtrekkingen zijn gemarkeerd als **[SCHATTING]**; alles wat niet kon worden geverifieerd als **[ONZEKER]**.

---

## Verificatie

*Adversariële hercontrole uitgevoerd op **25 juli 2026**. Opzet: van elke bewering is actief geprobeerd haar te **weerleggen** met een andere bron dan die in het oorspronkelijke profiel stond, of met de primaire bron zelf in plaats van een citaat daarvan. De ÉTS-studie is ditmaal niet via samenvattingen maar via **volledige tekstextractie uit de PDF** gecontroleerd. Beperking: het WebSearch-budget van de sessie was uitgeput, dus verificatie liep via directe fetches en zoekmachine-endpoints; DuckDuckGo gaf CAPTCHA's, Bing leverde bruikbare maar magere resultaten.*

### Prijs en licentiemodel

| # | Bewering | Oordeel | Toelichting en bron |
|---|---|---|---|
| 1 | **SYNCHRO 4D kost USD 4.980,00 excl. btw voor een 12-maands practitioner-licentie incl. 2 Keys** | **Bevestigd** | Live opgehaald bij de primaire bron: prijs USD 4.980,00, termijn 12 maanden, "2 Keys … credits that can be redeemed for expert services and tailored training", met de expliciete disclaimer *"Keys do not represent number of licenses"*. Onafhankelijk bevestigd door een derde partij: *"USD 4,980 before tax for a 12-month practitioner license"*. → [en.virtuosity.com/synchro-4d](https://en.virtuosity.com/synchro-4d) · [thetoolstrunk.com](https://thetoolstrunk.com/how-much-is-synchro-4d/) (datePublished 2026-04-08) |
| 2 | **Alternatieve notering USD 4.280/jaar is een oudere prijs** | **Bevestigd (en aangescherpt)** | De pagina dateert zichzelf op **18-11-2025** en beschrijft het als dezelfde Virtuosity-"special price". Het profiel opperde ook "regionaal"; dat is nu geschrapt — het is aantoonbaar gewoon ouder. → [zoftwarehub.com/products/synchro/pricing](https://www.zoftwarehub.com/products/synchro/pricing) |
| 3 | **pricingnow: € 4.375 / € 1.313 / € 394 per licentie per jaar** | **Onzeker (bevestigd als citaat, niet als feit)** | De bedragen staan er letterlijk, met "12-month subscription with access to customized training and services", pagina bijgewerkt 08-03-2026. Maar de pagina noemt **geen bron, geen leverancier en geen methode**. Blijft [ONZEKER]. → [pricingnow.com/question/synchro-pricing](https://pricingnow.com/question/synchro-pricing/) |
| 4 | **SelectHub noemt "vanaf USD 695 per maand"** | **Gecorrigeerd** | Het bedrag staat er ("Starting price $695, Monthly"), maar het is **geen SelectHub-exclusief datapunt**: exact hetzelfde getal staat als "starting price" op Zoftware. Twee aggregators met één getal ≠ twee onafhankelijke bronnen. Status verlaagd van "indicatief" naar "niet-betrouwbaar". → [selecthub.com](https://www.selecthub.com/p/construction-scheduling-software/synchro/) · [zoftwarehub.com](https://www.zoftwarehub.com/products/synchro/pricing) |
| 5 | **SYNCHRO Notes/Crew USD 29,99 per gebruiker per maand** | **Bevestigd** | "$29.99/month/user", listing beschrijft inderdaad de legacy mobiele apps Notes en Crew, met free trial. → [sourceforge.net/software/product/SYNCHRO](https://sourceforge.net/software/product/SYNCHRO/) |
| 6 | **Model is volledig abonnement; geen perpetual meer** | **Gedeeltelijk gecorrigeerd** | Bevestigd vóór de eStore: Virtuosity verkoopt uitsluitend **12-maands term-licenties**, geen perpetual optie. **Niet** bevestigd als algemene uitspraak: er is geen Bentley-verklaring gevonden die perpetual voor ELS/directe verkoop uitsluit. De absolute formulering is afgezwakt. → [en.virtuosity.com](https://en.virtuosity.com/) |
| 7 | **Proefversie: 2 weken op aanvraag** | **Bevestigd** | *"Dive into the full suite of SYNCHRO 4D features for two full weeks"*; expliciet **niet** instant download — *"A Bentley representative will contact you to review your needs, confirm eligibility, and determine next steps"*. → [bentley.com/lp/synchro-4d-trial-free-download](https://www.bentley.com/lp/synchro-4d-trial-free-download/) |
| 8 | **ELS-staffels niet openbaar; [SCHATTING] 15–35% korting vanaf ± 10 seats; TCO jaar 1 USD 60.000–100.000** | **Onzeker (ongewijzigd)** | Geprobeerd te weerleggen: geen enkele publieke Bentley-bron met ELS-bedragen of volumestaffels gevonden. De kortingsrange en de TCO-berekening blijven **niet-onderbouwde schattingen** en zijn als zodanig gemarkeerd. Ze mogen niet als marktdata worden geciteerd. |

### Technische en interoperabiliteitsclaims

| # | Bewering | Oordeel | Toelichting en bron |
|---|---|---|---|
| 9 | **iTwin Schedules API is read-only (alleen GET)** | **Bevestigd** | Documentatie stelt letterlijk *"POST and PATCH endpoints will be available in the future"*; geen PUT/DELETE. Vereist project op **v6.5 of later**. → [developer.bentley.com/apis/schedules](https://developer.bentley.com/apis/schedules/) |
| 10 | **IFC-export vereist SYNCHRO Control** | **Gecorrigeerd → onzeker** | Actief weerlegd: de onafhankelijke ÉTS-studie beschrijft schedule-export naar IFC **rechtstreeks vanuit SYNCHRO 4D Pro desktop** (*"export the schedule in several formats such as Ms Project XML, Primavera P6 and P3, IFC, and Microsoft Excel"*). Het oorspronkelijke forumcitaat was niet terug te vinden. Claim verwijderd uit nadeel 9 en uit het eindoordeel. → [ÉTS-PDF](https://espace2.etsmtl.ca/id/eprint/29768/1/Boton-C-2024-29768.pdf) |
| 11 | **IFC-ondersteuning zit op 4.3 "RC1"** | **Gecorrigeerd** | Bentley's eigen actuele API-documentatie noemt *"IFC 4.3, IFC 2x3, IFC2x3 CV 2.0, IFC4 RV 1.2 and IFC4.3 ABV"* — **zonder** "RC1". De scorecard-regel "IFC-versie-actualiteit: matig" is bijgesteld naar "redelijk". Wat blijft: geen aangetoonde bSI-certificering. → [developer.bentley.com/api-groups/synchronization](https://developer.bentley.com/api-groups/synchronization/) |
| 12 | **Geen aangetoonde IfcWorkSchedule/IfcTask-ondersteuning** | **Onzeker (ongewijzigd, kernbevinding)** | Opnieuw geprobeerd te weerleggen via Bentley's export-API-documentatie: die noemt uitsluitend IFC-**schema's**, nergens planningsentiteiten. Ook de ÉTS-PDF noemt IFC alleen in een rij exportformaten, zonder enige uitspraak over taakdata. Blijft "niet aangetoond" — géén positief bewijs van afwezigheid, maar wel consistent afwezig in alle geraadpleegde documentatie. |
| 13 | **ÉTS-scores: totaal 41 / 41 / 54; automatisch koppelen SYNCHRO 0 (Navisworks 3, Fuzor 3); bidirectionele schemakoppeling SYNCHRO 2 (Navisworks 0); persistente schemakoppeling SYNCHRO 3 (Navisworks 2); getest op v2021** | **Bevestigd (alle zes)** | Letterlijk uit de tekstextractie van de PDF: *"Total 41 41 54"*; *"Automatic linking capability (3D+planning) … 3 0 3"*; *"Bidirectional Link between Two Schedules … 0 2 3"*; *"Persistent Link with the Source Schedule … 2 3 3"*; *"As for Synchro 4D Pro, the version used was 2021, following some difficulties encountered with a newer version, notably the inability to integrate the Microsoft Project schedule."* → [ÉTS-PDF](https://espace2.etsmtl.ca/id/eprint/29768/1/Boton-C-2024-29768.pdf), DOI [10.3311/CCC2024-157](https://doi.org/10.3311/CCC2024-157) |
| 14 | **Refresh naar de bron werkt niet met MS Project-bronbestanden; bidirectionele 3D-koppeling niet operationeel; Revit-families niet ondersteund; individueel element niet selecteerbaar in 3D-venster** | **Bevestigd (alle vier)** | Letterlijk: *"refreshing from Synchro to the external source is not possible if the source file is a Ms Project file"*; *"it integrates a bidirectional linking option in the program, although this functionality is not operational"*; *"although Revit families are not supported"*; *"it was impossible to select an individual element directly from the 3D model. At each attempt, the entire model was selected"*. Let op: alles geldt voor **v2021**. → ÉTS-PDF |
| 15 | **Aanbevolen hardware: 4 GHz octa-core, 32 GB+ RAM, 16 GB GPU, dual monitor 2560×1600** | **Bevestigd** | Reseller-pagina noemt exact deze vier waarden. Bentley's eigen datasheet bevestigt de laag eronder: *"MINIMUM: Windows 10 64-bit, Windows 11 64-bit, or Windows Server 16, 2.8 GHz Octa Core / RECOMMENDED: 4 GHz Octa Core or 5 GHz Octa Core enterprise specification"*. → [Aufiero](https://bentley.aufieroinformatica.com/en/synchro-eng/) · [PDS-SYNCHRO-4D (© 2025)](https://www.bentley.com/wp-content/uploads/PDS-SYNCHRO-4D-LTR-EN-LR.pdf) |
| 16 | **"± 40 tot 58 bestandstypen"** | **Gecorrigeerd** | Het getal **58** is niet terug te vinden. De reseller schrijft *"interoperable with over 50 CAD applications"* — applicaties, geen bestandstypen. Bijgesteld naar "40+ formaten; 50+ CAD-applicaties". → [Aufiero](https://bentley.aufieroinformatica.com/en/synchro-eng/) |
| 17 | **Power BI-connector met EVA- en Gantt-tab; "spatial challenges of linear projects"** | **Bevestigd** | Beide letterlijk in de officiële datasheet: bijschriften *"SYNCHRO 4D Power BI Connector Project EVA Tab"* en *"… Project Gantt Tab"*, en de key feature *"Tackle the spatial challenges of linear projects"*. **Kanttekening:** de datasheet bevat **géén** import/exportformatenlijst en **géén** "several thousand tasks"-passage — die claims steunen op de kennisbank, niet op de datasheet. → [PDS-SYNCHRO-4D](https://www.bentley.com/wp-content/uploads/PDS-SYNCHRO-4D-LTR-EN-LR.pdf) |
| 18 | **[SCHATTING] Schaalbaarheid 20.000–50.000 activiteiten op aanbevolen spec, 100.000+ op enterprise** | **Onzeker (ongewijzigd)** | Geprobeerd te weerleggen: Bentley publiceert nergens activiteitenplafonds; de datasheet zwijgt erover. De bandbreedtes zijn een **eigen extrapolatie** uit één kennisbankzin en blijven volledig speculatief. Niet citeren als vendorinformatie. |
| 19 | **Geen ingebouwde Monte-Carlo/probabilistische risicoanalyse** | **Onzeker (ongewijzigd)** | Opnieuw gezocht in de volledige datasheettekst: geen enkele vermelding van Monte Carlo, probabilistiek of kwantitatieve risicoanalyse — alleen generieke "reduce project risks". Consistent met de oorspronkelijke bevinding, maar blijft een bewijs-van-afwezigheid. |

### Product, eigendom en marktclaims

| # | Bewering | Oordeel | Toelichting en bron |
|---|---|---|---|
| 20 | **Productfamilie 4D / Control / Field / Perform / Cost** | **Gecorrigeerd** | Sterkste weerlegging van deze ronde. Bentley's productpagina noemt op 25-07-2026 nog maar **twee** producten: SYNCHRO 4D en SYNCHRO Perform. `bentley.com/software/synchro-control/` geeft **HTTP 404**; site-beperkt zoeken levert geen actuele Control- of Cost-pagina op. SYNCHRO Field bestaat nog blijkens de reseller. De vijfdelige moduletabel is verouderd; afhankelijke claims (voordeel 8, IFC-exportroute) zijn afgezwakt. → [bentley.com/software/synchro](https://www.bentley.com/software/synchro/) |
| 21 | **Huidige versie is SYNCHRO 4D Pro 2025 (v6.5.6)** | **Gecorrigeerd naar "laatst bevestigde versie"** | Het kennisbankartikel met die titel bestaat (KB0045870), maar **niets bewijst dat het in juli 2026 nog de actuele release is** — en er is evenmin bewijs voor v6.6 of een 2026-release gevonden. Bij een product met Early Access in dec. 2025 is "huidig" een te sterke claim. → [KB0045870](https://bentleysystems.service-now.com/community?id=kb_article_view&sysparm_article=KB0045870) |
| 22 | **Bentley FY2025: omzet USD 1,502 mld (+11%), ARR-groei 11,5%, FCF ± USD 520 mln, guidance 2026 USD 1,69–1,72 mld** | **Bevestigd en gepreciseerd** | Primaire bron in plaats van "via zoekresultaten": omzet **USD 1.501,8 mln** (+11,0%; +10,1% cc), ARR **USD 1.462,1 mln** (v.j. 1.283,3), ARR-groei **11,5% cc**, FCF **USD 520,2 mln**. Guidance 2026: **USD 1.685–1.715 mln** (het profiel rondde af naar 1,69–1,72 mld; nu exact) plus FCF USD 500–570 mln. → [investors.bentley.com — Q4/FY2025](https://investors.bentley.com/news-releases/news-release-details/bentley-systems-announces-fourth-quarter-and-full-year-2025) |
| 23 | **Bentley opgericht 1984 door Keith A. en Barry J. Bentley; Nasdaq BSY; S&P 400-component; Synchro overgenomen 2018, prijs niet bekendgemaakt; CEO Nicholas Cumins sinds juli 2024** | **Bevestigd** | Alle vijf onderdelen bevestigd: *"Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984"*, "S&P 400"-component, Nasdaq: BSY, *"Also in 2018, the company acquired Synchro"* zonder prijs, Cumins als eerste niet-familielid aan het roer (juli 2024). *(Kleine nuance: de infobox noemt ook Raymond B. Bentley als medeoprichter; de lopende tekst noemt er twee.)* → [Wikipedia — Bentley Systems](https://en.wikipedia.org/wiki/Bentley_Systems) |
| 24 | **SYNCHRO+: onthuld op YII 2025, Early Access dec. 2025, GA 2026, desktop én web op Infrastructure Cloud + iModel, "niet slechts een upgrade"** | **Bevestigd** | Alle onderdelen bevestigd, inclusief het citaat *"It's not just an upgrade. It will reimagine how construction teams plan and deliver work."* → [blog.bentley.com](https://blog.bentley.com/software/bentley-unveils-synchro-at-yii-2025-ushering-in-a-new-era-of-ai-powered-4d-construction-planning/) |
| 25 | **Reviewscores: 4,7/5 over 32 reviews, value for money 4,1 als laagste subscore** | **Bevestigd, met bronkritiek** | Exact bevestigd: 4,7/5, 32 reviews (22×5, 9×4, 1×3, 0×1–2), subscores gebruiksgemak 4,3 / support 4,5 / **value for money 4,1** / functionaliteit 4,3. **Maar:** Capterra, GetApp en Software Advice delen als Gartner-eigendommen dezelfde reviewpool — het profiel presenteerde dit als drie bronnen. Toegevoegd als kanttekening. → [softwareadvice.com](https://www.softwareadvice.com/product/6302-Synchro/reviews/) |
| 26 | **Referentiecijfers Tideway (90 dagen, £1 mln) en Chase Center (151.000+ componenten, YII 2019)** | **Gedeeltelijk gecorrigeerd** | Chase Center exact bevestigd, inclusief awardcategorie *"Going Digital for Advancements in 4D Construction Modeling"*. Tideway gepreciseerd: *"cut the program by over 90 days **across two years**"*, ± £300k **direct** + > £1 mln **indirect** (het profiel voegde die twee samen tot "£1 miljoen besparing"). Beide cijfers komen uit **Bentley-eigen** casestudy-/awardmateriaal — als voordeel 9 herschreven van "harde cijfers" naar "niet onafhankelijk geverifieerd". → [casestudies.com](https://www.casestudies.com/company/bentley/case-study/costain-vinci-bachy-jv-industrializes-delivery-of-uks-largest-water-infrastructure-project) · [Cadalyst](https://blog.cadalyst.com/architecture-infrastructure-construction-solutions/synchronize-your-construction-documents-and-components) |
| 27 | **[SCHATTING] Marktleider in "4D als serieus planningsinstrument"; Navisworks het meest verspreid** | **Onzeker (ongewijzigd)** | Geen marktaandeelcijfers per 4D-tool gevonden. Bentley's eigen datasheet claimt *"The industry leader in visual planning and 4D modeling"* — dat is leveranciersmarketing, geen bewijs. De positioneringsuitspraak blijft terecht als [SCHATTING] gemarkeerd; ook de bewering dat **geen enkel mandaat SYNCHRO bij naam voorschrijft** kon niet worden weerlegd en blijft [ONZEKER]. |

### Samenvatting van de hercontrole

- **27 beweringen getoetst.** Uitkomst: **14 bevestigd**, **8 gecorrigeerd of gepreciseerd**, **5 blijven onzeker**.
- **De zwaarste correctie is de productlijn** (#20): Control en Cost zijn als afzonderlijke, actueel gemarkete producten niet meer aantoonbaar op bentley.com. Dat ondermijnt twee afgeleide claims — de IFC-exportroute via Control en het "vijfdelige office-to-field-portfolio".
- **De prijskern houdt stand.** USD 4.980 is dubbel geverifieerd, waarvan één keer live bij de primaire bron. De omliggende aggregatorprijzen zijn allemaal zwakker gebleken dan het profiel suggereerde: $4.280 is aantoonbaar ouder, $695 is één circulerend getal in plaats van een SelectHub-bevinding, en pricingnow noemt nog steeds geen bron.
- **De ÉTS-studie is de sterkste bron in dit profiel** en overleefde volledige verificatie tegen de originele PDF-tekst — alle tien de eruit overgenomen datapunten kloppen letterlijk. Wel geldt overal de versiekanttekening **v2021**.
- **Twee claims werden in het profiel te hard gesteld** en zijn afgezwakt: "IFC 4.3 RC1" (weersproken door Bentley's actuele documentatie) en "geen perpetual meer" (alleen voor de eStore te verifiëren).
- **Wat structureel niet te verifiëren is:** ELS-prijzen, volumekortingen, activiteitenplafonds en marktaandeel. Alle vier zijn eigen schattingen. Ze staan gemarkeerd, maar mogen in een besluitvormingsdocument niet als marktdata worden overgenomen.
