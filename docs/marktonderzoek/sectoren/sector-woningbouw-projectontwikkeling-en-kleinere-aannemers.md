# Sectoronderzoek: Woningbouw, projectontwikkeling en kleinere aannemers

**Onderdeel van:** wereldwijd marktonderzoek planningssoftware
**Datum onderzoek:** 25 juli 2026
**Scope:** residentiële nieuwbouw (grondgebonden + gestapeld), projectontwikkeling, verbouw/renovatie, en het brede mkb-aannemerssegment (hoofdaannemers < ~250 medewerkers, onderaannemers, zzp-bouw)
**Onderzoeksmethode:** directe bronraadpleging van leverancierspagina's (prijslijsten), review-aggregatoren (Capterra/GetApp/Software Advice/SelectHub), analistenrapporten (Mordor Intelligence, Verified Market Reports), brancheorganisaties (AGC, NAHB, Bouwend Nederland, AFNL), statistiekbureaus (CBS, US Census, Europese Commissie) en waarborginstellingen (Woningborg, SWK, NHBC).

> **Methodologische waarschuwing vooraf.** De zoekmachine-quota van deze sessie was uitgeput; het onderzoek is daarom uitgevoerd met ~60 directe WebFetch-raadplegingen op leveranciers-, analisten-, branche- en overheidsbronnen in plaats van via zoekopdrachten. Elk cijfer hieronder heeft een directe bron-URL. Waar ik geen primaire bron kon bemachtigen, staat dat er expliciet bij — die punten zijn gemarkeerd als **[ONGEVERIFIEERD]** en mogen niet als feit worden doorgegeven. Alle marktomvang-berekeningen zijn gemarkeerd als **[SCHATTING]** met de volledige rekenketen erbij.

---

## 0. Managementsamenvatting

Dit is qua **aantal bedrijven** verreweg het grootste segment van de bouwmarkt en qua **omzet per bedrijf** verreweg het kleinste. In Nederland alleen al zijn er 269.845 bouwbedrijven, waarvan 233.700 ~~eenmanszaken~~ **bedrijven met één werkzame persoon** ([CBS, Q3 2026](https://www.cbs.nl/nl-nl/cijfers/detail/81588NED)) — **[TERMINOLOGISCHE CORRECTIE]**: CBS-tabel 81588NED is ingedeeld naar *bedrijfsgrootte in werkzame personen*, niet naar rechtsvorm. "1 werkzame persoon" ≠ "eenmanszaak"; een bv met één dga valt er ook onder, en de CBS-cijfers zelf konden in deze verificatie niet opnieuw worden opgehaald (StatLine gaf 503); in de VS meer dan 919.000 vestigingen ([AGC, Q1 2023](https://www.agc.org/learn/construction-data)); in de EU is "tot 95% van de bouw-, architecten- en ingenieursbedrijven een micro-onderneming of mkb" ([Europese Commissie](https://single-market-economy.ec.europa.eu/sectors/construction_en)).

De planningsmarkt hier gedraagt zich fundamenteel anders dan in infra/olie-en-gas/defensie:

1. **Planning is geen zelfstandig product maar een module.** Vrijwel niemand in dit segment koopt losse planningssoftware. Ze kopen een all-in-one bouwmanagementsuite (Buildertrend, JobTread, Contractor Foreman, Knowify, Buildxact, BuildBook) waarin planning één van acht tot vijftien modules is, náást offertes, calculatie, urenregistratie, facturatie, klantportaal en fotodocumentatie.
2. **Excel is de marktleider, niet een leverancier.** De grootste concurrent is een spreadsheet plus een whiteboard plus WhatsApp. Dit is geen anekdote maar volgt logisch uit de bedrijfsgroottedistributie: 86,6% van de Nederlandse bouwbedrijven heeft één werkzame persoon ([CBS](https://www.cbs.nl/nl-nl/cijfers/detail/81588NED)) — die koopt geen planningssoftware.
3. **Betalingsbereidheid is laag in absolute zin, maar niet nul.** De hele suite kost $588–$6.110 per jaar (zie §3; Buildxact Master jaarplan is $6.110/jr, niet $6.108). Toegerekend naar het planningsdeel is dat grofweg $150–$1.500 per bedrijf per jaar. Vergelijk: één Primavera P6-seat kost $2.750–$3.520+ eenmalig, exclusief jaarlijkse support ([Software Connect](https://www.softwareconnect.com/roundups/best-construction-scheduling-software/)).
4. **De formele planningsstandaarden uit de zware sectoren (EVMS/EIA-748, DCMA 14-point, AACE forensische RP's, XER/P6 XML-levering) spelen hier vrijwel geen rol.** Wat hier wél contractueel bindt: bouwtijd in *werkbare werkdagen*, termijnschema's/betaaltermijnen gekoppeld aan bouwfasen, garantie- en waarborgregelingen (Woningborg/SWK in NL, NHBC in het VK), en bij Amerikaanse bouwers het *draw schedule* van de bouwfinancier.
5. **Het gat waar een open-source, IFC-gebaseerde planner in past** is niet "goedkoper dan Procore" maar: (a) een *echte* CPM-planner met kalenders en afhankelijkheden voor bedrijven die nu Excel gebruiken omdat MS Project te duur/te zwaar is; (b) herhaalbaarheid — dezelfde 40 taken × 60 woningen, wat de suites slecht ondersteunen; (c) datasoevereiniteit en export-vrijheid, want vendor lock-in is de meest genoemde klacht in dit segment.

---

## 1. Wat deze sector bijzonder maakt qua planning

### 1.1 Schaal en doorlooptijd

| Kenmerk | Woningbouw/mkb-aannemerij | Ter vergelijking: infra/industrie |
|---|---|---|
| Projectwaarde | € 150k – € 40 mln | € 50 mln – € 5 mrd |
| Doorlooptijd | 3 weken (badkamer) – 30 maanden (appartementencomplex) | 3 – 10+ jaar |
| Aantal planningsactiviteiten | 20 – 600 | 5.000 – 250.000 |
| Aantal gelijktijdige projecten per bedrijf | 3 – 60 | 1 – 5 |
| Aparte planner in dienst? | Zelden; de uitvoerder/projectleider plant erbij | Ja, meerdere fulltime planners |

Procore's eigen documentatie bevestigt precies deze scheiding: bij "residential construction for a small development" maakt de projectmanager de planning zelf, terwijl "a large commercial project" een "experienced and senior scheduler in charge" vereist ([Procore Library](https://www.procore.com/library/construction-scheduling)).

**Consequentie voor software:** de planning wordt gemaakt door iemand die er *geen* opleiding voor heeft en er *geen* dag per week aan kan besteden. Een tool die drie dagen training vergt, verliest. Dit is de belangrijkste enkelvoudige verklaring waarom Excel wint van MS Project in dit segment.

### 1.2 Het portfolio-probleem in plaats van het complexiteits-probleem

Het onderscheidende kenmerk van dit segment is niet dat de projecten ingewikkeld zijn — het is dat er **veel tegelijk lopen met gedeelde resources**. Een verbouwaannemer met 12 man draait 25 projecten parallel. De vraag is nooit "wat is het kritieke pad van project X" maar "welke ploeg moet volgende week waar zijn, en welke drie klanten moet ik bellen omdat de stukadoor uitvalt".

Dit is precies wat de mkb-suites goed doen en wat klassieke CPM-tools (P6, MS Project, Asta) slecht doen zonder zware configuratie. Het is ook waarom Buildertrend's hoogst gewaardeerde functie "Job Scheduling" is met **4,72 / 5** ([Software Advice](https://www.softwareadvice.com/construction/buildertrend-profile/)) — de kalender/agenda-kant werkt, niet de netwerkplanning-kant.

### 1.3 Resourcecomplexiteit: onderaannemers, niet eigen personeel

De resource in dit segment is niet een genivelleerde arbeidscapaciteitscurve, maar een **beschikbaarheidsafspraak met een externe partij** die zelf 20 andere klanten heeft. Kenmerken:

- De aannemer heeft **geen commando** over de resource. Hij kan niet "levelen"; hij kan alleen bellen en herplannen.
- Onderaannemers werken vaak in **vaste ploeggroottes** (twee stukadoors, één installateur + hulp). Fractionele toewijzing (0,4 FTE) is betekenisloos.
- De typische keten is 8–20 onderaannemers per woning, met sterke volgorde-afhankelijkheid (ruwbouw → dak → kozijnen/waterdicht → installaties ruwbouw → isolatie/afbouw → installaties afbouw → stuc → tegels → keuken → schilder → oplevering).
- Hoofdoorzaak van vertraging is zelden een verkeerde CPM-berekening; het is **een onderaannemer die niet komt opdagen of een levering die te laat is**. Planningssoftware die alleen rekent en niet communiceert, heeft in dit segment weinig waarde. Dat verklaart waarom Buildertrend's meest gewaardeerde eigenschap "real-time schedule updates and notifications" is ([Software Advice](https://www.softwareadvice.com/construction/buildertrend-profile/)) en waarom de suites allemaal gratis onderaannemers-/klantportalen aanbieden (JobTread: "Unlimited customer and vendor portal users" inbegrepen — [JobTread pricing](https://www.jobtread.com/pricing)).

### 1.4 Repetitiviteit — het onderbenutte kenmerk

Woningbouw is de meest **repetitieve** vorm van bouwen die er is: 60 identieke rijwoningen, 200 identieke appartementen, 14 gestandaardiseerde afbouwstappen. Dit is precies waar **Line of Balance (LOB)** en **takt-planning** voor gemaakt zijn. Procore noemt LOB expliciet als "designed for repetitive work across multiple units, like high-rise construction… displays the rate at which these tasks need to be performed to maintain a continuous flow of work" ([Procore Library](https://www.procore.com/library/construction-scheduling)).

**Dit is een structureel gat.** Vrijwel geen enkele mkb-suite ondersteunt LOB, takt of locatiegebaseerd plannen. Wie het wél wil, moet naar Asta Powerproject (heeft line-of-balance), Vico/Trimble, of Tilos — alle drie ver buiten het prijsbereik van dit segment. In de praktijk lossen woningbouwers dit op met een Excel-matrix (bouwnummers in de rijen, activiteiten in de kolommen, datums in de cellen). Zie §7.

### 1.5 Contractuele eisen — heel anders dan in infra

| Land/regime | Wat de planning contractueel afdwingt | Bron |
|---|---|---|
| **NL — Woningborg** | Modelovereenkomst nieuwbouw 2024 (versie 01-01-2026); "Garantie- en waarborgregelingen Nieuwbouw incl. bijlage A" (versie 28-10-2025); Woningborg adviseert expliciet over **"Termijnregelingen"** — het betaalschema gekoppeld aan bouwfasen | [Woningborg kennisbank](https://www.woningborggroep.nl/kennisbank/?type=Downloads), [Woningborg](https://www.woningborggroep.nl/) |
| **NL — SWK** | Oudste waarborgfonds (sinds 1978); "toetst of deelnemers voldoen aan de gestelde kwaliteitseisen" en verstrekt waarborgcertificaten aan kopers | [SWK](https://www.swk.nl/) |
| **VK — NHBC** | "The UK's Leading Provider of Warranty and Insurance for New-Built Homes" (sinds 1936); polissen beschermen ~1,2 miljoen woningen | [NHBC](https://www.nhbc.co.uk/) |
| **VS** | Bouwfinanciering via *construction loan draw schedule*: uitbetaling per bouwfase na inspectie | zie §5.4 **[ONGEVERIFIEERD]** |

De cruciale sectorspecifieke contractvorm in Nederland is de **koop-/aannemingsovereenkomst** waarin de bouwtijd wordt uitgedrukt in **werkbare werkdagen**, niet in kalenderdagen. Dat is geen detail: het betekent dat de contractuele einddatum een *functie* is van het aantal onwerkbare dagen (vorst, neerslag, wind) en dat de kalender-engine van de planningssoftware in feite een contractueel instrument is. Vrijwel geen mkb-suite modelleert dit; Excel kan het ook niet, dus in de praktijk telt men handmatig.

> **[ONGEVERIFIEERD]** De exacte kortingsbedragen bij te late oplevering — UAV 2012 § 42 (standaardkorting per dag) en het promillage per kalenderdag in de Woningborg/SWK-modelovereenkomst — heb ik in dit onderzoek **niet** uit een primaire bron kunnen bevestigen. De brondocumenten staan achter downloadformulieren op [woningborggroep.nl/kennisbank](https://www.woningborggroep.nl/kennisbank/?type=Downloads); wetten.overheid.nl leverde bij raadpleging de Aanbestedingswet 2012 in plaats van de UAV. Deze bedragen moeten voor gebruik apart worden nagezocht. Wat wél vaststaat uit de bron: Woningborg publiceert modelovereenkomsten en garantieregelingen met vaste versiedata en adviseert over termijnregelingen.

> **[ONGEVERIFIEERD]** De Wet kwaliteitsborging voor het bouwen (Wkb) — die voor gevolgklasse 1 (grotendeels woningbouw) een onafhankelijke kwaliteitsborger, een borgingsplan, een bouwmelding vooraf en een gereedmelding met opleverdossier introduceert — is planningsrelevant omdat het **harde inspectiemomenten in de planning verankert** en meldingstermijnen kent. Ik kon rijksoverheid.nl en iplo.nl in deze sessie niet bereiken (404). De exacte termijnen (vaak genoemd: 4 weken bouwmelding vooraf, 2 weken gereedmelding voor ingebruikname) zijn **niet geverifieerd** en moeten worden nagezocht.

### 1.6 Kosten van vertraging

Hier verschilt de sector wezenlijk van infra. Bij infra is vertraging duur door *staande organisatiekosten* en LD's (liquidated damages) van tienduizenden euro's per dag. In woningbouw/ontwikkeling zit de pijn ergens anders:

1. **Financieringslast van de ontwikkelaar.** Een project van € 20 mln met 70% vreemd vermogen tegen ~7% ontwikkelrente kost circa € 82.000 rente per maand vertraging. *(Rekenvoorbeeld — [SCHATTING], eigen berekening: 20 mln × 0,70 × 0,07 / 12 = € 81.667.)* Bij een grondpositie die al twee jaar op de balans staat, tikt dit door vanaf dag één.
2. **Boeterente/vergoeding aan kopers.** Bij te late oplevering van een koopwoning is de aannemer een dagvergoeding verschuldigd aan de koper (zie [ONGEVERIFIEERD] hierboven voor het exacte promillage). Bij 60 woningen tegelijk vermenigvuldigt dit met 60.
3. **Doorlopende kosten van de kleine aannemer.** Voor een verbouwaannemer met 12 man is de pijn niet een boete maar **leegloop**: als project A een week uitloopt en project B nog niet kan starten, betaalt hij 12 man voor niets. Dit is de reden dat portfolio-planning (§1.2) belangrijker is dan projectplanning.
4. **Verkoop-/verhuurderving.** Een appartementencomplex dat drie maanden later oplevert, mist drie maanden huur of een verkoopseizoen.

**Belangrijk nuance voor positionering:** deze kosten zijn hoog in absolute zin, maar ze worden **niet als softwareprobleem herkend**. De mkb-aannemer schrijft vertraging toe aan "de installateur kwam niet" of "het weer", niet aan "mijn planning deugde niet". Dat drukt de betalingsbereidheid voor planningssoftware structureel — zie §3.5.

---

## 2. Welke planningssoftware hier daadwerkelijk gebruikt wordt

### 2.1 Rangorde naar geïnstalleerde basis (mijn inschatting, onderbouwd)

**[SCHATTING]** — er bestaat geen publieke installed-base-telling voor dit segment. Onderstaande rangorde is afgeleid uit reviewvolumes op Capterra (als proxy voor gebruikersaantallen in het mkb), leveranciersclaims en de bedrijfsgroottedistributie.

| # | Tool | Positie in dit segment | Onderbouwing |
|---|---|---|---|
| **1** | **Microsoft Excel / Google Sheets** | Absolute marktleider. Balkschema's als gekleurde cellen, bouwnummers × activiteiten-matrices, weekplanningen | Volgt uit bedrijfsgroottedistributie: 233.700 van 269.845 NL-bouwbedrijven zijn eenmanszaken ([CBS](https://www.cbs.nl/nl-nl/cijfers/detail/81588NED)); 95% van EU-bouwbedrijven is micro/mkb ([EC](https://single-market-economy.ec.europa.eu/sectors/construction_en)) |
| **2** | **Papier / whiteboard / WhatsApp-groep** | Nog steeds dominant bij < 10 man. De "planning" is een geprint A3 in de keet | zie hierboven |
| **3** | **Buildertrend (incl. het opgeslokte CoConstruct)** | De facto standaard voor Amerikaanse woningbouwers en verbouwers | "Trusted by 20,000+ builders" ([Buildertrend](https://buildertrend.com/)); 2.486 reviews op Capterra/GetApp ([GetApp](https://www.getapp.com/construction-software/a/buildertrend/)); CoConstruct-migratie "entering its final phase" ([CoConstruct](https://www.coconstruct.com/pricing)) |
| **4** | **Microsoft Project (desktop)** | De "serieuze" planning: gebruikt door de grotere woningbouwers en door projectleiders die het van een vorige werkgever kennen. Vaak één losse licentie per bedrijf | Project Standard 2024 $679,99 / Project Professional 2024 $1.129,99 eenmalig ([Microsoft](https://www.microsoft.com/en-us/microsoft-365/project/project-management-software)) |
| **5** | **Generieke werkbeheer-tools (monday.com, Smartsheet, Trello, Asana, ClickUp)** | Groeiend snel; goedkoop, vertrouwd, geen bouwjargon. Smartsheet wordt expliciet gepositioneerd als "Microsoft Project alternative" | monday.com vanaf $9/gebruiker/mnd, Smartsheet vanaf $9–$12 ([SelectHub](https://www.selecthub.com/construction-scheduling-software/), [Capterra](https://www.capterra.com/construction-scheduling-software/)) |
| **6** | **Prijsvechter-suites: Contractor Foreman, JobTread, BuildBook, Knowify, Buildxact, ConstructionOnline (UDA)** | De snelst groeiende laag. Alle hebben Gantt, alle onder $500/mnd | Zie prijstabel §3.1 |
| **7** | **Procore** | Aanwezig bij de bovenkant van dit segment (grote woningbouwers, multifamily-ontwikkelaars), maar structureel te duur voor de onderkant | Prijs op basis van Annual Construction Volume; "unlimited users" ([Procore](https://www.procore.com/pricing)); reviewer: prijs "simply astronomical", "reserved for large organizations"; >60% van de reviews komt van bedrijven met 11–200 medewerkers ([Software Advice](https://www.softwareadvice.com/construction/procore-profile/)) |
| **8** | **Asta Powerproject (Eleco)** | Sterk bij Britse volume-huisbouwers en middelgrote NL/DE-aannemers; heeft line-of-balance en 4D. Nauwelijks bij de kleine aannemer | "more than 100,000 professionals worldwide"; productlijn Asta Vision / Asta 4D / Asta Enterprise / Asta Siteprogress / Asta Connect; geen publieke prijs ([Eleco](https://eleco.com/products/asta-powerproject/)) |
| **9** | **Nationale ERP-/bouwpakketten** | NL: Exact voor Bouw (voorheen Bouw7), Kraan Bouwcomputing, Syntess, 12Build-ecosysteem. DE: Nevaris, BRZ. Planning is hier bijproduct van de administratie | Exact voor Bouw: Essentials €129 / Plus €229 / Professional €359 per maand excl. btw ([Exact](https://www.exact.com/nl/producten/bouw)) |
| **10** | **Gratis/open source: ProjectLibre, GanttProject, OpenProject** | Reële aanwezigheid bij prijsgevoelige gebruikers | ProjectLibre: "Trusted by 8.2 M+ users", "Downloaded Over 8,200,000", "193 COUNTRIES", "20K Trusted Companies" ([ProjectLibre](https://www.projectlibre.com/)). **[ONZEKER — zelfgerapporteerd en intern tegenstrijdig]**: dezelfde homepage claimt tegelijk "10M Active Users" en "200+ Countries" naast de 8,2 mln / 193 landen, en gebruikt "users" en "downloads" door elkaar voor hetzelfde getal. Het zijn cumulatieve downloads sinds 2012, wereldwijd en over álle sectoren — niet bouwspecifiek en geen actieve-gebruikersmeting. GanttProject: GPL3, MS Project import/export, CSV/Excel/PDF/PNG-export, resources en kosten ([GanttProject](https://www.ganttproject.biz/)) |
| **11** | **Oracle Primavera P6** | Vrijwel afwezig. Alleen waar een woningbouwer ook infra/utiliteit doet, of bij een grote ontwikkelaar met een corporate standaard | $2.750–$3.520+ per gebruiker (perpetual), excl. jaarlijkse support — "Enterprise-level scheduling" ([Software Connect](https://www.softwareconnect.com/roundups/best-construction-scheduling-software/)) |

### 2.2 Wie gebruikt wat — per rol in de keten

| Rol | Wat ze gebruiken | Waarom |
|---|---|---|
| **Particuliere opdrachtgever** (koper van een woning) | Niets. Krijgt een PDF-planning of een datum in een brief | Geen planningsbehoefte, wel informatiebehoefte. Dit is exact waar de klantportalen van Buildertrend/BuildBook/JobTread op mikken |
| **Woningcorporatie / institutionele belegger** | Excel + het projectportaal van de aannemer; soms een eigen vastgoed-ERP | Stuurt op mijlpalen en betaaltermijnen, niet op activiteiten |
| **Projectontwikkelaar** | Excel voor de ontwikkelfasering (grond → bestemmingsplan → vergunning → verkoop → start bouw → oplevering); MS Project bij de grotere partijen; nooit P6 | De ontwikkelplanning is 30–80 regels over 3–7 jaar met veel externe afhankelijkheden (procedures, bezwaar, voorverkooppercentage) — CPM is hier grotendeels overkill, maar scenario's ("wat als de vergunning 6 maanden later komt") zijn heel waardevol |
| **Hoofdaannemer, groot (> 100 man, volume-woningbouw)** | Asta Powerproject of MS Project voor de bouwplanning; Procore of een nationale ERP eromheen; Excel voor de bouwnummer-matrix | Heeft wél een werkvoorbereider/planner; heeft herhaling, dus LOB/takt loont |
| **Hoofdaannemer, klein/middel (5–100 man)** | **Dit is het kernsegment.** Buildertrend / JobTread / Contractor Foreman / Buildxact / Exact voor Bouw, of gewoon Excel | Suite-logica: één abonnement dat offerte, planning, uren, facturatie en klantcommunicatie dekt |
| **Verbouw-/renovatieaannemer** | BuildBook, Houzz Pro, Buildertrend, Excel | Klantcommunicatie en selecties/keuzelijsten zijn belangrijker dan CPM |
| **Onderaannemer / specialistische installateur** | Veldtools en service-planning: Fieldwire, eSUB, Jobber, Housecall Pro, ServiceTitan; of Excel/agenda | Plant *ploegen over jobs*, niet activiteiten binnen één job. Fieldwire Basic is gratis tot 5 gebruikers/3 projecten ([Fieldwire](https://www.fieldwire.com/pricing/)) |
| **Zzp'er** | Agenda-app + WhatsApp | Nul betalingsbereidheid voor planningssoftware |
| **Architect / adviseur / constructeur** | Eigen deadlinelijst in Excel of een bureau-PM-tool; volgt de aannemersplanning passief | Bureaus plannen mensen over opdrachten, niet bouwactiviteiten |
| **Kwaliteitsborger (NL, Wkb)** | Eigen borgingsplan-tooling; leest de aannemersplanning om inspectiemomenten te prikken | Nieuw sinds Wkb; koppelvlak nog nauwelijks gedigitaliseerd |

### 2.3 Marktconcentratie

Analistendata laat zien dat de zware jongens de *bestedingen* domineren maar niet de *aantallen*: de top 5 (Oracle, Autodesk, Procore, Trimble, Bentley) had "approximately 45% of 2025 revenue" in bouwmanagementsoftware ([Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/construction-management-software-market)). Diezelfde bron zet 46,72% van de bestedingen in 2025 bij *general contractors* en 44,38% van de deployments bij projecten van USD 50–500 mln — dus grotendeels bóven ons segment.

De aanbiederskant in het woningbouw-/mkb-segment is daarentegen **extreem gefragmenteerd**: tientallen suites van $49 tot $499 per maand, plus tientallen nationale spelers. Capterra's categorie "construction scheduling software" alleen al lijst tientallen producten met sterk uiteenlopende positionering ([Capterra](https://www.capterra.com/construction-scheduling-software/)).

---

## 3. Wat ervoor betaald wordt

### 3.1 Geverifieerde prijslijsten (juli 2026, allemaal direct van de leverancier tenzij anders vermeld)

| Product | Instapprijs | Middenprijs | Topprijs | Planning inbegrepen? | Bron |
|---|---|---|---|---|---|
| **Contractor Foreman** | Basic $49/mnd ($588/jr), 1 gebruiker | Plus $166/mnd ($1.997/jr), 8 gebruikers | Unlimited $332/mnd ($3.984/jr), onbeperkt | Ja, Gantt in **alle** tiers; 30 dagen proef; 100 dagen geld-terug bij jaarplan | [contractorforeman.com/pricing](https://www.contractorforeman.com/pricing/) |
| **BuildBook** | Solo $79/mnd jaarlijks ($99 maandelijks), 1 gebruiker | Team $149/mnd ($179), 2–5 gebruikers | Business vanaf $249/mnd ($299), 6–8 gebruikers; extra gebruiker $20/mnd of $200/jr | Ja, Gantt op elk betaald niveau; onbeperkt projecten/klanten/onderaannemers | [buildbook.co/pricing](https://www.buildbook.co/pricing) |
| **Knowify** | Core $99/mnd jaarlijks ($149 maandelijks), 1 gebruiker, +$29/extra gebruiker | Advanced $329/mnd jaarlijks ($399), 10 gebruikers | Enterprise op aanvraag, onbeperkt | Ja, in alle tiers. Add-ons: Service Pro $99/mnd, equipment tracking $25/voertuig/mnd | [knowify.com/pricing](https://www.knowify.com/pricing/) |
| **JobTread** | $199/mnd basis, 1 interne gebruiker | +$20/gebruiker (2–10), $15 (11–20), $10 (21–30), $5 (31+) | — | Ja; **geen contract, geen setupkosten, gratis implementatie/training/support**; 20% korting bij jaarbetaling; onbeperkt klant- en leveranciersportaalgebruikers | [jobtread.com/pricing](https://www.jobtread.com/pricing) |
| **Buildxact (VS)** | Go: **gratis** (5 credits) | Foundation $169/mnd jaarlijks ($199 maandelijks) — **planning NIET inbegrepen** | Pro $339/mnd ($399) mét Schedules; Master $509/mnd ($599) | Planning pas vanaf Pro. Onbeperkt gebruikers in alle betaalde tiers; 15% jaarkorting, 12 maanden commitment; AI-add-ons $99–$149/mnd | [buildxact.com/us/pricing](https://www.buildxact.com/us/pricing/) |
| **Buildertrend** | Prijs op aanvraag; derde partij noemt **$499/mnd** startpunt | — | — | Onbeperkt gebruikers en projecten; 10% korting bij jaarlijkse vooruitbetaling; setup/datamigratie, Learning Academy en live trainingen aangeboden zonder gepubliceerde prijs | [buildertrend.com/pricing](https://buildertrend.com/pricing/); $499: [Software Advice](https://www.softwareadvice.com/construction/buildertrend-profile/) en [Software Connect](https://www.softwareconnect.com/roundups/best-construction-scheduling-software/) |
| **CoConstruct** | $499/mnd (kleine/middelgrote bedrijven), volgens derde partij | — | — | **Product wordt uitgefaseerd**: "CoConstruct's transition to Buildertrend is entering its final phase" | [SelectHub](https://www.selecthub.com/construction-scheduling-software/); status: [coconstruct.com/pricing](https://www.coconstruct.com/pricing) |
| **ConstructionOnline (UDA)** | $475 startprijs (Capterra) / $49 per gebruiker/mnd (SelectHub) — bronnen wijken af | — | — | Gantt-planning ("GamePlan") kernproduct; 607 reviews, 4,5/5 | [Capterra](https://www.capterra.com/construction-scheduling-software/), [SelectHub](https://www.selecthub.com/construction-scheduling-software/) |
| **Fieldwire (Hilti)** | Basic **gratis**: 5 gebruikers, 3 projecten | Pro $39/gebruiker/mnd (jaarlijks) | Business $64; Business Plus $89 | Taken/scheduling ja, klassieke Gantt niet expliciet vermeld op de prijspagina; BIM-viewer vanaf Business | [fieldwire.com/pricing](https://www.fieldwire.com/pricing/) |
| **Procore** | Geen publieke prijs. Model: **jaarlijkse fee per product op basis van Annual Construction Volume (ACV)** — "the aggregate dollar value of the construction work across your projects". Onbeperkt gebruikers, data en 24/7 support. Field Productivity geprijsd per FTE | Derde partij noemt ~~$375/mnd~~ **"just under $400/month for smaller volume builders"** als startpunt — **[GECORRIGEERD bij verificatie]**: de bron formuleert het niet als $375 | — | Ja, scheduling-module | [procore.com/pricing](https://www.procore.com/pricing); $375: [Software Connect](https://www.softwareconnect.com/roundups/best-construction-scheduling-software/) |
| **Microsoft Project (desktop, eeuwigdurend)** | **Project Standard 2024: $679,99** eenmalig — Gantt, netwerkdiagrammen, baselines, mijlpalen, resource leveling | **Project Professional 2024: $1.129,99** eenmalig — plus volledig resourcebeheer en timesheets | Project Server Subscription Edition: prijs via partner | Ja, volwaardige CPM | [microsoft.com](https://www.microsoft.com/en-us/microsoft-365/project/project-management-software) |
| **Smartsheet** | Vanaf $9–$12 per gebruiker/mnd volgens aggregatoren | — | Enterprise op aanvraag (10+ leden) | Gantt, afhankelijkheden, baselines (Business), tijdlijnweergave | [SelectHub](https://www.selecthub.com/construction-scheduling-software/), [Capterra](https://www.capterra.com/construction-scheduling-software/) |
| **monday.com** | $9/gebruiker/mnd | — | — | Gantt/tijdlijn | [SelectHub](https://www.selecthub.com/construction-scheduling-software/) |
| **Exact voor Bouw (NL, voorheen Bouw7)** | Essentials **€129/mnd** excl. btw — projectbeheer, offertebeheer, medewerkersplanning | Plus **€229/mnd** — + boekhouding, 2 mobiele gebruikers | Professional **€359/mnd** — + kwaliteitsbeheer, **projecttijdlijn en capaciteitsplanning** | Ja, volledige planning pas in Professional | [exact.com/nl/producten/bouw](https://www.exact.com/nl/producten/bouw) |
| **Oracle Primavera P6** | **$2.750 – $3.520+ per gebruiker (perpetual), excl. jaarlijkse support** — **[GECORRIGEERD]**: dezelfde bron noemt naast "$2,750/user (perpetual license)" óók "$3,520+ one-time" en "starts at over $3,000 for a single license"; de perpetual-licentie komt bovendien met een jaarlijkse onderhouds-/supportfee | — | — | Enterprise-CPM; buiten bereik van dit segment | [Software Connect](https://www.softwareconnect.com/roundups/best-construction-scheduling-software/) |
| **NetPoint** | $500 startprijs | — | — | Grafische padmethode-planner, 35 reviews | [Capterra](https://www.capterra.com/construction-scheduling-software/) |
| **eSUB** | $49/gebruiker/mnd — kleine/middelgrote onderaannemers | — | — | Onderaannemersgericht | [SelectHub](https://www.selecthub.com/construction-scheduling-software/) |
| **LetsBuild** | $20/gebruiker/mnd | — | — | Europees; middelgroot | [SelectHub](https://www.selecthub.com/construction-scheduling-software/) |
| **ProjectLibre / GanttProject** | **€0** (open source) | — | — | Ja, CPM en resources; GanttProject onder GPL3 met MS Project-import/export | [projectlibre.com](https://www.projectlibre.com/), [ganttproject.biz](https://www.ganttproject.biz/) |

> **Let op — tegenstrijdige bronnen.** Voor Buildertrend circuleren zowel $99/mnd ([SelectHub](https://www.selecthub.com/construction-scheduling-software/)) als $499/mnd ([Software Advice](https://www.softwareadvice.com/construction/buildertrend-profile/), [Software Connect](https://www.softwareconnect.com/roundups/best-construction-scheduling-software/)). Buildertrend zelf publiceert geen prijs en zegt alleen dat pricing "tailored to meet the unique needs of your business" is ([buildertrend.com/pricing](https://buildertrend.com/pricing/)). De $99 is waarschijnlijk een verouderde of promotionele instapprijs; $399–$599/mnd is het realistische bereik voor een werkende configuratie. Behandel beide getallen als onzeker.

### 3.2 Typische jaarlijkse contractwaarde per bedrijfsgrootte

**[SCHATTING]** — afgeleid uit de prijstabel hierboven.

| Bedrijfsgrootte | Typisch pakket | Jaarwaarde software totaal | Toerekening aan planningsfunctie |
|---|---|---|---|
| Zzp / 1–3 man | Excel, gratis tools, hooguit Contractor Foreman Basic | **$0 – $600** | ~$0 – $150 |
| 4–10 man | Contractor Foreman Standard/Plus, BuildBook Team, Knowify Core, Buildxact Foundation | **$1.200 – $2.500** | ~$250 – $600 |
| 10–40 man | JobTread, Buildertrend, Buildxact Pro, Knowify Advanced, Exact voor Bouw Professional | **$2.500 – $8.000** | ~$500 – $1.800 |
| 40–150 man (woningbouwer/ontwikkelaar) | Buildertrend/Procore + 1–3 MS Project- of Asta-licenties | **$8.000 – $60.000** | ~$1.500 – $12.000 |
| 150–500 man | Procore (ACV-gebaseerd) + Asta Enterprise + BI | **$40.000 – $250.000+** | ~$8.000 – $50.000 |

Toerekeningspercentage planning: 20–30% van een all-in-one suite, gebaseerd op het aandeel van planning in het aantal functiemodules. **Dit is een aanname, geen meting.**

### 3.3 Implementatie- en trainingskosten

Wat de bronnen expliciet zeggen:

- **JobTread:** "No contract or setup fees", "Free implementation, training, and support" ([JobTread](https://www.jobtread.com/pricing)). Dit is een concurrentiewapen tegen Buildertrend.
- **Contractor Foreman:** geen setupfees genoemd in de prijsdocumentatie; 30 dagen gratis proef, 100 dagen geld-terug bij jaarplannen ([Contractor Foreman](https://www.contractorforeman.com/pricing/)).
- **Buildertrend:** biedt "Setup and data migration", "Buildertrend Learning Academy" en "Live Virtual Trainings" aan; **geen prijzen vermeld** ([Buildertrend](https://buildertrend.com/pricing/)). Dat is de klassieke structuur waarin onboarding als eenmalige fee bovenop het abonnement komt.
- **Procore:** "Implementation services are mentioned as available but no pricing details provided"; benadrukt "no hidden fees" ([Procore](https://www.procore.com/pricing)).
- **Buildxact:** jaarplannen vereisen 12 maanden commitment ([Buildxact](https://www.buildxact.com/us/pricing/)).

**Structurele observatie:** dit segment tolereert **geen** implementatieprojecten. Waar in infra een P6-implementatie met WBS-ontwerp, kalenderconfiguratie en codificatie tientallen dagen consultancy kost, is de norm hier *self-service onboarding binnen een week*. Leveranciers die gratis implementatie aanbieden (JobTread) gebruiken dat expliciet als differentiator. De verborgen implementatiekost is niet consultancy maar **de eigen tijd van de eigenaar/uitvoerder** — en die wordt als hoog en pijnlijk ervaren.

### 3.4 De totale kostenrekening voor de koper

Voor een woningbouwer met 25 man ziet het er zo uit **[SCHATTING]**:

| Post | Bedrag/jaar |
|---|---|
| Suite-abonnement (bv. Buildertrend, ~$499/mnd) | ~$6.000 |
| 1 × MS Project Professional (afgeschreven over 3 jaar) | ~$375 |
| Onboarding/datamigratie jaar 1 (eenmalig) | $0 – $3.000 |
| Interne tijd voor implementatie (80 uur × €60) | ~€4.800 (verborgen) |
| Doorlopende interne beheertijd (2 uur/week × €60) | ~€6.200/jaar (verborgen) |
| **Zichtbare softwarekost** | **~$6.400/jaar** |
| **Werkelijke totale kost** | **~€17.000/jaar** |

~~De verborgen kosten zijn 2–3× de licentiekosten.~~ **[GECORRIGEERD — rekenfout].** Uit de tabel zelf: €4.800 + €6.200 = €11.000 verborgen tegenover ~$6.400 zichtbaar = **1,7×**, niet 2–3×. En dat is nog de gunstigste lezing, want de tabel telt een **eenmalige** post (€4.800 implementatietijd) op bij **jaarlijkse** posten en telt USD en EUR ongewisseld bij elkaar op. Vergelijk je alleen de terugkerende bedragen — €6.200 beheertijd tegen ~$6.400 licentie — dan is de verhouding **~1,0×**. De inhoudelijke conclusie blijft staan (de verborgen kosten zijn minstens even groot als de licentie), maar de factor "2–3×" is niet uit deze tabel af te leiden. Dat is waarom "gratis" of "goedkoop" alléén niet wint in dit segment: *tijd tot eerste waarde* is de echte valuta.

### 3.5 Betalingsbereidheid: **laag in absolute zin, matig-tot-redelijk in relatieve zin** — en waarom

**Waarom laag:**

1. **Zeer dunne marges.** Woningbouw- en verbouwmarges liggen typisch op 3–8% nettowinst; software wordt afgezet tegen die marge, niet tegen de omzet.
2. **Planning wordt niet als bron van verlies erkend.** Zie §1.6: de aannemer wijt vertraging aan onderaannemers en weer.
3. **De koper is de eigenaar zelf.** Er is geen inkoopafdeling, geen ICT-budget, geen businesscase-proces. De beslissing wordt genomen door iemand die dezelfde week een bestelbus moet kopen. Dat maakt de vergelijking niet "software A vs. software B" maar "software vs. een tweede uitvoerder".
4. **Reviewbewijs.** Buildertrend scoort 4,3/5 op "Value for Money" tegen 4,7/5 op support ([GetApp](https://www.getapp.com/construction-software/a/buildertrend/)) — de laagste dimensie op één na. Reviewers zeggen letterlijk: "This is quiet an expensive software for a small company to manage" en één 1-ster-review noemt het "way too expensive" ([Software Advice](https://www.softwareadvice.com/construction/buildertrend-profile/)). GetApp signaleert bovendien dat "costs rise quickly with more projects" en dat gebruikers de prijsstelling "confusing or unexpectedly high" vinden ([GetApp](https://www.getapp.com/construction-software/a/buildertrend/)).
5. **Procore is het schoolvoorbeeld van het prijsplafond.** Value for Money 4,13/5 — de laagste van alle dimensies; reviewers noemen de kosten "simply astronomical" en "reserved for large organizations or major projects", en wijzen expliciet op het ACV-model dat "prohibitively expensive for smaller firms" is ([Software Advice](https://www.softwareadvice.com/construction/procore-profile/)).

**Waarom niet nul — en waar de bereidheid wél zit:**

1. **Er wordt wél betaald, maar voor de suite.** $199–$499 per maand is een geaccepteerd prijspunt gebleken; JobTread, Buildertrend en Buildxact draaien er allemaal op. Het is de *stapeling* die weerstand oproept, niet het bedrag op zich.
2. **Betaald wordt voor klantcommunicatie en geld, niet voor planning.** De volgorde van betalingsbereidheid in dit segment is: (1) offertes/calculatie winnen werk → (2) facturatie/meerwerk brengt geld binnen → (3) klantportaal voorkomt ruzie → (4) urenregistratie → (5) *dan pas* planning. Een losstaand planningsproduct verkoopt hier structureel slecht.
3. **De ACV-prijsmodellen worden gehaat maar geaccepteerd aan de bovenkant.** Procore's model — een jaarfee per product op basis van totale bouwvolume, met onbeperkt gebruikers ([Procore](https://www.procore.com/pricing)) — is aantrekkelijk voor bedrijven met veel gebruikers en weinig volume, en straffend voor het omgekeerde.
4. **Gratis werkt.** Fieldwire's gratis tier (5 gebruikers, 3 projecten) en Buildxact's gratis "Go" zijn geen liefdadigheid maar acquisitiekanalen ([Fieldwire](https://www.fieldwire.com/pricing/), [Buildxact](https://www.buildxact.com/us/pricing/)). ProjectLibre's 8,2 miljoen downloads bewijzen dat het gratis-kanaal in deze doelgroep enorm is ([ProjectLibre](https://www.projectlibre.com/)).

---

## 4. Hoe groot is dit segment?

### 4.1 Top-down: de bovenliggende markten

| Markt | Omvang | Jaar | Groei | Bron |
|---|---|---|---|---|
| Bouwmanagementsoftware, wereldwijd | **USD 10,62 mrd** | 2025 | → USD 11,58 mrd (2026) → **USD 17,81 mrd (2031)**, CAGR **8,99%** | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/construction-management-software-market) |
| — waarvan general contractors | 46,72% van de bestedingen | 2025 | — | idem |
| — waarvan mid-size projecten ($50–500 mln) | 44,38% van de deployments | 2025 | grote projecten (> $500 mln) groeien met 9,22% CAGR | idem |
| — concentratie top 5 (Oracle, Autodesk, Procore, Trimble, Bentley) | ~45% van de omzet | 2025 | — | idem |
| Bouwplanningssoftware (scheduling) specifiek, wereldwijd | **USD 3,12 mrd** | 2025 | → **USD 6,78 mrd (2034)**, CAGR **9,25%** (2026–2034). **[ONZEKER — bron rekent niet rond]**: 3,12 → 6,78 over 2025–2034 (9 jaar) is 9,0% CAGR, niet 9,25%; en dezelfde pagina noemt 3,12 mrd elders voor **2024**, wat 8,1% zou geven. Verified Market Reports is een aggregator zonder gepubliceerde methodologie — behandel dit cijfer als indicatief, niet als meting | [Verified Market Reports](https://www.verifiedmarketreports.com/product/construction-scheduling-software-market/) |
| Amerikaanse bouwmarkt (bouwvolume) | USD 1,9 biljoen | 2021 | AAGR > 3% (2023–2026) | [SelectHub](https://www.selecthub.com/construction-scheduling-software/) |
| Amerikaanse bouwmarkt (recenter) | ~USD 2,1 biljoen structures/jaar; ~8,0 mln werknemers | Q1 2023 | — | [AGC](https://www.agc.org/learn/construction-data) |
| Procore (grootste zuivere speler) | omzet **USD 1,32 mrd** in 2025 (+14,83% t.o.v. USD 1,15 mrd in 2024); beurswaarde USD 6,46 mrd | 2025 | — | [Stock Analysis](https://stockanalysis.com/stocks/pcor/) |

### 4.2 De bedrijvenpopulatie (de noemer voor bottom-up)

| Gebied | Aantal bouwbedrijven | Jaar | Bron |
|---|---|---|---|
| **VS** | **> 919.000 vestigingen**; ~8,0 mln werknemers. **Let op: dit zijn vestigingen mét loonpersoneel** (BLS-QCEW-basis, UI-gedekt); zzp'ers/non-employers zitten er niet in. BLS geeft voor Q4 2025 956.863 particuliere bouwvestigingen bij ~8,3 mln werknemers | Q1 2023 | [AGC](https://www.agc.org/learn/construction-data), [BLS IAG](https://www.bls.gov/iag/tgs/iag23.htm) |
| **Nederland** | **269.845 bedrijven** (SBI F Bouwnijverheid), waarvan **233.700 met 1 werkzame persoon**; ≈ **36.000 bedrijven met personeel**; 105 bedrijven met 250–500 werknemers | Q3 2026 | [CBS StatLine 81588NED](https://www.cbs.nl/nl-nl/cijfers/detail/81588NED) |
| **EU** | 18 mln directe banen; ~9% van het EU-bbp; **"tot 95%" micro-ondernemingen of mkb** | n.b. | [Europese Commissie](https://single-market-economy.ec.europa.eu/sectors/construction_en) |
| **NL brancheorganisaties** | Bouwend Nederland ~4.600 leden; bouwsector ~10% bbp, bijna €100 mrd productie/jaar. AFNL: ruim 1.200 bedrijven | n.b. | [Bouwend Nederland](https://www.bouwendnederland.nl/over-ons), [AFNL](https://www.aannemersfederatie.nl/) |
| **VK (indicatie garantiedekking)** | NHBC-polissen beschermen ~1,2 mln woningen | n.b. | [NHBC](https://www.nhbc.co.uk/) |

> Noot: de laatste beschikbare US County Business Patterns-data is 2023; 2024-data verschijnt zomer 2026 ([US Census](https://www.census.gov/programs-surveys/cbp.html)). Een uitsplitsing naar NAICS 2361 (Residential Building Construction) heb ik in deze sessie niet kunnen ophalen.

### 4.3 Bottom-up berekening — **[SCHATTING, eigen berekening]**

**Stap 1 — Adresseerbare bedrijven (met personeel, in koopkrachtige markten).**

Zzp'ers en eenmanszaken sluit ik uit: zij kopen geen planningssoftware. In Nederland blijft dan over: 269.845 − 233.700 ≈ **36.145 bedrijven met meer dan één werkzame persoon** ([CBS](https://www.cbs.nl/nl-nl/cijfers/detail/81588NED)).

- **VS:** 919.000 vestigingen ([AGC](https://www.agc.org/learn/construction-data)). ~~Aanname: ~65% is een bedrijf met personeel → ~600.000.~~ **[GECORRIGEERD — rekenfout, dubbele aftrek].** Het AGC-cijfer is BLS-QCEW-data en telt uitsluitend vestigingen *mét* loonpersoneel (UI-gedekt): 919.000 vestigingen bij 8,0 mln werknemers = 8,7 werknemers per vestiging, wat onmogelijk is als zzp'ers meetelden. Ter controle geeft BLS voor Q4 2025 956.863 particuliere bouwvestigingen bij ~8,3 mln werknemers ([BLS IAG Construction](https://www.bls.gov/iag/tgs/iag23.htm)). Er hoeft dus **geen** "met personeel"-correctie meer overheen; alleen een vestiging→bedrijf-correctie (multi-vestigingsbedrijven), grofweg ×0,85–0,90 op basis van de SUSB-systematiek, die eveneens alleen werkgeversbedrijven telt ([US Census SUSB](https://www.census.gov/programs-surveys/susb.html)) → **~780.000–830.000 werkgeversbedrijven**. Daarvan woningbouw-/kleinbouw-gerelateerd 65% (blijft een **onbevestigde aanname**) → **~510.000–540.000** in plaats van 390.000.
- **EU:** schaal Nederland (17,9 mln inwoners → 36.145 bedrijven met personeel) naar de EU (~449 mln inwoners) = 36.145 × 25,1 ≈ 907.000. Corrigeer neerwaarts voor lagere bedrijfsdichtheid in Zuid- en Oost-Europa: **~700.000**. Daarvan woningbouw-gerelateerd 65% → **~455.000**. **[ONZEKER — waarschijnlijk te laag].** Eurostat telt voor 2023 **~4 miljoen** bouwondernemingen in de EU met 13,9 mln werkzame personen, waarvan 94,2% micro-ondernemingen (<10 personen) ([Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Businesses_in_the_construction_sector)). Twee problemen: (a) de bevolkingsschaling is niet nodig én misleidend — Nederland heeft 6,7% van alle EU-bouwondernemingen bij 4,0% van de bevolking, dus de NL-dichtheid is juist ruim bovengemiddeld; (b) de uitkomst van 700.000 impliceert dat slechts 17,5% van de EU-bouwondernemingen personeel heeft, een verhouding die is overgenomen uit het land met het hoogste aandeel solo-zelfstandigen in de bouw van de EU. Een realistischer band is **1,0–1,6 mln** EU-bouwbedrijven met personeel, ofwel **~650.000–1.040.000** woningbouwgerelateerd.
- **VK, Canada, Australië/NZ, Japan, Zuid-Korea samen:** **~250.000** (schatting op basis van bevolkings- en bouwvolume-verhouding tot de VS). **[ONGEVERIFIEERD]** — dit getal is niet uit een bron afgeleid.
- **Totaal adresseerbaar:** ~~**~1.095.000 bedrijven**~~ → na correctie **~1,4 – 1,8 miljoen bedrijven** wereldwijd in koopkrachtige markten. Zie de waarschuwing bij Stap 2: deze noemer draagt het eindantwoord niet.

**Stap 2 — Penetratie van betaalde bouwsoftware.**

Er is geen betrouwbare publieke penetratiemeting voor dit segment. Ankerpunten: Buildertrend claimt "20,000+ builders" ([Buildertrend](https://buildertrend.com/)); ConstructionOnline heeft 607 reviews, Contractor Foreman 835, Buildertrend 2.486, Procore 2.667 op Capterra ([Capterra](https://www.capterra.com/construction-scheduling-software/)) — de reviewvolumes suggereren gebruikersbases in de orde van tienduizenden per aanbieder, niet honderdduizenden. Bij ~30 relevante aanbieders wereldwijd en gemiddeld 5.000–15.000 klanten elk kom je op **150.000–450.000 betalende bedrijven**, ofwel ~~14–41% penetratie~~. Ik neem het midden: **25% → ~275.000 betalende bedrijven.**

> **[METHODEWAARSCHUWING — toegevoegd bij verificatie].** Deze stap is **circulair en niet load-bearing**. De 150.000–450.000 komt uit leverancierstellingen, wordt vervolgens omgerekend naar een penetratiepercentage tégen dezelfde noemer die hier wordt geschat, en daarna weer met die noemer vermenigvuldigd. Het percentage voegt dus geen informatie toe; het importeert alleen de fout van de noemer. Met de gecorrigeerde noemer (1,4–1,8 mln, zie Stap 1) zakt de penetratie naar **~15–20%** terwijl het aantal betalende bedrijven onveranderd ~275.000 blijft. Het eindantwoord van §4.3 wordt in werkelijkheid volledig gedragen door twee ongefundeerde aannames: **275.000 betalende bedrijven** (afgeleid uit "~30 aanbieders × 5.000–15.000 klanten", zelf een schatting zonder bron) en **$2.400 gemiddelde jaarbesteding**. De hele bedrijvenpopulatie-analyse is decoratief. Bovendien is de reviewvolume-proxy instabiel: Buildertrend's eigen homepage citeert "4.5 rating on Capterra (based on 5,000 reviews)" ([Buildertrend](https://buildertrend.com/)) tegenover de 2.486 die GetApp toont ([GetApp](https://www.getapp.com/construction-software/a/buildertrend/)) — een factor 2 binnen hetzelfde Gartner-platform.

**Stap 3 — Gemiddelde jaarbesteding.**

Uit §3.2: gewogen gemiddelde jaarlijkse softwarebesteding in dit segment ≈ **$2.400 per bedrijf** (veel bedrijven op $600–$2.500, een kleinere kop op $8.000–$60.000).

→ **Totale bestedingen aan bouwmanagementsoftware in het woningbouw-/mkb-segment: 275.000 × $2.400 ≈ USD 660 mln per jaar.**

**Stap 4 — Het planningsdeel eruit lichten.**

Planning is 20–30% van de functionele waarde van een suite (aanname, §3.2). Plus de losse planningstools die dit segment ook koopt (MS Project-licenties bij $679,99–$1.129,99 eenmalig, Smartsheet/monday-seats, Asta bij de bovenkant, ProjectLibre gratis).

→ **Planningsdeel: $660 mln × 25% ≈ USD 165 mln, plus ~USD 60 mln aan losse planningstools ≈ USD 225 mln per jaar.**

### 4.4 Kruiscontrole tegen de top-down cijfers

| Route | Uitkomst voor het planningsdeel in dit segment |
|---|---|
| **Bottom-up (§4.3)** | ~USD 225 mln |
| **Via bouwmanagementsoftware:** USD 10,62 mrd wereldwijd (2025, [Mordor](https://www.mordorintelligence.com/industry-reports/construction-management-software-market)); aandeel woningbouw/mkb geschat op 15–20% (het segment heeft veel bedrijven maar lage prijzen, en Mordor legt 44,38% bij projecten van $50–500 mln) → USD 1,6–2,1 mrd; daarvan planning 10–15% → **USD 160–320 mln** |
| **Via de scheduling-markt:** USD 3,12 mrd wereldwijd (2025, [VMR](https://www.verifiedmarketreports.com/product/construction-scheduling-software-market/)); het woningbouw/mkb-aandeel is klein omdat P6/Powerproject/Acumen-seats bij infra en enterprise zitten — geschat 6–10% → **USD 190–310 mln** |

~~**De drie routes convergeren.**~~ **[GECORRIGEERD — de convergentie is schijn].** Drie bezwaren, toegevoegd bij verificatie:

1. **Routes 2 en 3 zijn onderling tegenstrijdig.** Route 2 neemt aan dat planning **10–15%** van de bouwmanagementsoftware-besteding is. Route 3 gebruikt een zelfstandige scheduling-markt van USD 3,12 mrd naast een bouwmanagementmarkt van USD 10,62 mrd — dat is **29,4%**. Beide kunnen niet waar zijn. Ofwel het 10–15%-aandeel is een factor 2–3 te laag, ofwel de VMR-scheduling-markt overlapt maar deels met Mordor's afbakening. Zolang dat niet is opgelost, zijn routes 2 en 3 geen onafhankelijke bevestigingen van elkaar.
2. **Routes 2 en 3 zijn niet onafhankelijk van elkaar** — beide zijn top-down analistencijfers waar vervolgens twee vrij gekozen percentagebanden overheen gaan (15–20% × 10–15%, respectievelijk 6–10%). Met vrij gekozen banden convergeert elke route op elk gewenst getal; de "convergentie" is een gevolg van de bandkeuze, niet een empirische bevestiging.
3. **Route 1 is na correctie geen bottom-up route** — zie de methodewaarschuwing in §4.3 Stap 2.

De uitkomst blijft bruikbaar als **orde van grootte**, maar de onzekerheidsband is realistisch eerder **USD 150–450 mln** dan USD 200–280 mln. Ik houd aan, met die kanttekening:

> ### 🔹 Segmentomvang planningssoftware voor woningbouw, projectontwikkeling en kleinere aannemers
> **USD 200 – 280 miljoen per jaar (2026), middenschatting ≈ USD 235 miljoen.** **[SCHATTING — lage betrouwbaarheid; reële band eerder USD 150–450 mln]**
> *(Noot: het rekenkundige midden van 200–280 is 240, niet 235; 235 volgt uit de bottom-up-uitkomst van 225 en is dus geen bandmidden.)*
>
> Ingebed in een bredere markt van **USD 1,6 – 2,1 miljard per jaar** aan bouwmanagementsoftware voor ditzelfde segment, waarin planning één module is. **[SCHATTING]**
>
> Beide getallen exclusief het niet-gemonetiseerde deel: Excel, papier, en de ~8,2 miljoen ProjectLibre-downloads ([ProjectLibre](https://www.projectlibre.com/)).

### 4.5 Groeirichting

- **Marktgroei ligt hoger dan het enterprise-segment.** De bouwmanagementsoftwaremarkt groeit met **8,99% CAGR** naar USD 17,81 mrd in 2031 ([Mordor](https://www.mordorintelligence.com/industry-reports/construction-management-software-market)); scheduling specifiek met **9,25% CAGR** naar USD 6,78 mrd in 2034 ([VMR](https://www.verifiedmarketreports.com/product/construction-scheduling-software-market/)).
- **Binnen dit segment ligt de groei hoger dan het marktgemiddelde**, want de groei komt uit *penetratie* (van Excel naar software) en niet uit prijsverhoging. **[SCHATTING]: 10–14% per jaar** voor de komende vijf jaar.
- **Consolidatie is gaande.** Buildertrend heeft CoConstruct volledig geabsorbeerd — "CoConstruct's transition to Buildertrend is entering its final phase" ([CoConstruct](https://www.coconstruct.com/pricing)) — en Bouw7 is opgegaan in Exact ([Exact](https://www.exact.com/nl/producten/bouw)). Fieldwire is onderdeel van Hilti. Verwacht verdere opkoop van niche-suites.
- **Tegenwind:** dit segment is cyclisch en rentegevoelig. Procore's beurswaarde daalde 42% ([Stock Analysis](https://stockanalysis.com/stocks/pcor/)) ondanks 14,83% omzetgroei — de markt prijst afkoelende bouwactiviteit in. Bij een woningbouwdip zeggen kleine aannemers als eerste hun abonnementen op.
- **Structurele meewind:** generatiewissel (opvolgers zijn digitaal opgevoed), personeelstekort (dwingt tot efficiëntie), en in NL de Wkb-documentatieplicht.

---

## 5. Sector-specifieke eisen en standaarden

### 5.1 Wat hier **niet** geldt — en waarom dat strategisch belangrijk is

Dit is het scherpste onderscheid met de infra-/defensie-/olie-en-gassector.

| Standaard | Toepasselijkheid in woningbouw/mkb | Toelichting |
|---|---|---|
| **EVMS / EIA-748 (Earned Value Management System)** | **Vrijwel nul** | Een 32-criteria EVMS-regime hoort bij grote Amerikaanse federale contracten. Een woningbouwer met 30 man zal dit nooit tegenkomen. Uitzondering: gesubsidieerde/militaire woningbouw in de VS. **[ONGEVERIFIEERD]** — de exacte dollargrenzen waarboven DoD EVMS eist, heb ik niet uit een primaire bron kunnen bevestigen (acq.osd.mil gaf 503). |
| **DCMA 14-Point Schedule Assessment** | **Vrijwel nul** | Ontstaan bij het Amerikaanse Defense Contract Management Agency. Wordt in dit segment nooit toegepast. Deltek Acumen Fuse — het gereedschap dat dit soort checks doet — evalueert "schedule health against 600+ metrics aligned with DCMA, DOE, NASA, GAO, and AACE" ([Deltek](https://www.deltek.com/en/products/project-and-portfolio-management/acumen)) en richt zich expliciet op de zware sectoren. **[ONGEVERIFIEERD]** — de 14 afzonderlijke drempelwaarden (logic, leads, lags, relationship types, hard constraints, high float, negative float, high duration, invalid dates, resources, missed tasks, critical path test, CPLI, BEI) heb ik in dit onderzoek niet uit een primaire bron kunnen verifiëren; drie pogingen (dcma.mil, projectmanagement.com, projectcontrolacademy.com) faalden. |
| **AACE Recommended Practices** (o.a. forensische vertragingsanalyse) | **Zeer laag** | AACE's RP's "are aligned with the Total Cost Management Framework, and establish the technical foundation for our educational and certification products"; ze zijn gratis voor leden en te koop voor niet-leden ([AACE](https://web.aacei.org/resources/publications/recommended-practices)). In dit segment komen ze alleen in beeld bij een escalerend geschil boven ~€5 mln. **[ONGEVERIFIEERD]** — de specifieke RP-nummers (29R-03 forensic schedule analysis, 52R-06, 27R-03, 14R-90) staan niet op de gefetchte pagina; die lijst zit achter "Current RPs". |
| **Verplichte leverformaten XER / P6 XML** | ~~**Nul**~~ → **Verwaarloosbaar** | **[GECORRIGEERD — te absoluut geformuleerd].** "Geen enkele opdrachtgever" is een universele negatieve bewering die niet te bewijzen is en waarvoor tegenvoorbeelden bestaan: door de Amerikaanse overheid gefinancierde meergezins-/sociale woningbouw (HUD, FAR-gebaseerde contracten) en sommige aanbestede corporatieprojecten kennen wél formele CPM-schema-eisen, inclusief soms een specifiek bestandsformaat. Deze tegenvoorbeelden zijn in dit onderzoek **niet uit een primaire bron geverifieerd**; de juiste formulering is "in het gros van dit segment afwezig", niet "nul". Er is in het typische mkb-woningbouwproject geen opdrachtgever die een .xer-bestand eist. De de-facto uitwisselformaten zijn **PDF** (de geprinte balkplanning), **Excel/CSV**, en soms **.mpp / MS Project XML**. GanttProject's ondersteuning van "Microsoft Project format (import/export), CSV and Excel exports, PDF and PNG exports" ([GanttProject](https://www.ganttproject.biz/)) dekt exact wat dit segment nodig heeft. |
| **Formele schedule audits / claim-analyse** | **Zeldzaam** | Geschillen worden opgelost via de Raad van Arbitrage voor de Bouw (NL) of bemiddeling, meestal op basis van correspondentie en dagboeken — niet op basis van een window-analyse. |

**Strategische implicatie:** een planningstool voor dit segment mag géén EVMS/DCMA/AACE-bagage meeslepen. Die functionaliteit is hier dood gewicht dat de UI verzwaart en de leercurve verhoogt — precies de twee dingen die dit segment niet verdraagt. Omgekeerd geldt: als een tool die functies wél heeft (voor de infra-sector), moeten ze **standaard verborgen** zijn.

### 5.2 Wat hier **wél** geldt

| Eis | Wat het betekent voor de planning |
|---|---|
| **Bouwtijd in werkbare werkdagen (NL/BE)** | De contractuele einddatum verschuift automatisch met onwerkbare dagen (vorst, neerslag, wind). De planningskalender is hierdoor een **contractueel instrument**. Vereist: kalendertype "werkbare werkdagen", registratie van onwerkbare dagen, en automatische doorrekening naar de opleverdatum. **Vrijwel geen mkb-suite ondersteunt dit.** |
| **Termijnregelingen / betaaltermijnen gekoppeld aan bouwfasen (NL)** | Woningborg adviseert expliciet over "Termijnregelingen" ([Woningborg](https://www.woningborggroep.nl/)). De planning bepaalt wanneer termijnen factureerbaar worden (ruwe vloer begane grond, dak waterdicht, stucwerk gereed…). Planning ↔ cashflow zijn hier direct gekoppeld. |
| **Garantie- en waarborgregelingen (NL: Woningborg/SWK; VK: NHBC)** | Woningborg publiceert "Modelovereenkomst nieuwbouw 2024 versie 01-01-2026" en "Garantie- en waarborgregelingen Nieuwbouw incl. bijlage A" (28-10-2025) ([Woningborg kennisbank](https://www.woningborggroep.nl/kennisbank/?type=Downloads)). SWK "toetst of deelnemers voldoen aan de gestelde kwaliteitseisen" ([SWK](https://www.swk.nl/)). Deze regelingen leggen vaste opleveringsprocedures en hersteltermijnen op die als mijlpalen in de planning horen. |
| **Wkb — kwaliteitsborging (NL)** | **[ONGEVERIFIEERD]** — introduceert een onafhankelijke kwaliteitsborger met een borgingsplan, verplichte inspectiemomenten tijdens de bouw, en een opleverdossier. Planningsimpact: de kwaliteitsborger moet er *op het juiste moment* zijn (voordat het werk wordt afgedekt), wat harde inspectiemijlpalen in het bouwschema afdwingt. Bron niet bereikbaar in deze sessie; verifiëren. |
| **VS: construction loan draw schedule** | **[ONGEVERIFIEERD]** — bij Amerikaanse bouwers stuurt de bouwfinancier op een uitbetalingsschema per bouwfase, met inspectie voorafgaand aan elke draw. De planning is daarmee direct gekoppeld aan de liquiditeit van de bouwer. Niet uit een primaire bron bevestigd in dit onderzoek. |
| **CDM 2015 construction phase plan (VK)** | **[ONGEVERIFIEERD]** — verplicht bouwfaseplan voor vrijwel elk project, ook kleine. Niet geverifieerd. |
| **Openbaar aanbesteed (sociale huur/corporaties)** | Waar corporaties of gemeenten aanbesteden, komen er wél formelere planningseisen bij (planning bij inschrijving, mijlpalenoverzicht, soms een S-curve). Nog steeds geen XER. |

### 5.3 De planningsmethoden die hier daadwerkelijk gebruikt worden

Procore's eigen overzicht noemt vier methoden ([Procore Library](https://www.procore.com/library/construction-scheduling)):

1. **CPM (Critical Path Method)** — "push planning"; "identifies the sequence of tasks that has the longest duration, thereby determining the shortest possible project duration". In dit segment gebruikt door de bovenkant, meestal in vereenvoudigde vorm.
2. **Last Planner System (LPS) / pull planning** — "work is planned based on the readiness and capacity of the workforce". Groeiend in NL/Scandinavië; goed passend bij het onderaannemersprobleem van §1.3, want het is een *afsprakensysteem* en niet een rekensysteem.
3. **PERT** — drie-puntsschattingen. Praktisch afwezig in dit segment.
4. **Line of Balance (LOB)** — "designed for repetitive work across multiple units, like high-rise construction". **Precies wat woningbouw nodig heeft en vrijwel nergens beschikbaar is in het betaalbare segment.**

Daarnaast, niet door Procore genoemd maar in de praktijk dominant: **de kalender-/agendaweergave** (wie is welke week waar) en de **bouwnummer-matrix in Excel**.

### 5.4 IFC / openBIM in dit segment

- IFC is de open ISO-standaard voor bouwdata en bevat sinds IFC4 planningsentiteiten (`IfcTask`, `IfcWorkSchedule`, `IfcWorkCalendar`, `IfcWorkTime`, `IfcRelSequence`, `IfcTaskTime`) waarmee een volledige CPM-planning **in het bouwmodel zelf** kan worden opgeslagen. **[ONGEVERIFIEERD]** — buildingsmart.org en iso.org gaven in deze sessie beide 403; ik kon de exacte ISO-aanduiding (ISO 16739-1) en de entiteitenlijst niet uit een primaire bron bevestigen. Verifiëren voor publicatie.
- **Praktische adoptie in dit segment is laag.** BIM is in de woningbouw grotendeels een ontwerp- en calculatie-instrument (Revit/Archicad → hoeveelheden), zelden een uitvoeringsinstrument. Fieldwire biedt bijvoorbeeld pas vanaf de Business-tier ($64/gebruiker/mnd) een BIM-viewer ([Fieldwire](https://www.fieldwire.com/pricing/)).
- **Maar:** repetitieve woningbouw is de ideale 4D-toepassing (60 identieke woningen, elk met dezelfde 40 taken). De koppeling model ↔ planning is hier conceptueel triviaal en waardevol — en commercieel onbediend, omdat 4D-tools (Synchro, Navisworks, Asta 4D, Vico) allemaal in het enterprise-prijssegment zitten. Eleco's productlijn bevat "Asta 4D" ([Eleco](https://eleco.com/products/asta-powerproject/)), zonder publieke prijs.

---

## 6. Voor- en nadelen van de gebruikte pakketten — specifiek in deze sectorcontext

### 6.1 Excel / Google Sheets

**Voordelen in deze context**
- Kost niets extra's; iedereen heeft het al en kan het al.
- Oneindig vormvrij: de bouwnummer × activiteiten-matrix, het weekrooster, de S-curve en de termijnstaat passen er allemaal in.
- Uitwisselbaar met iedereen — de onderaannemer kan het openen, de opdrachtgever ook.
- Geen leverancier, geen abonnement, geen lock-in, geen internetverbinding nodig.
- Direct printbaar naar A3 voor de keet.

**Nadelen in deze context**
- **Geen afhankelijkheidslogica.** Als de fundering een week uitloopt, moet je 200 cellen handmatig verschuiven. Dit is de kernpijn.
- Geen kritiek pad, geen speling, dus geen inzicht in wélke vertraging er echt toe doet.
- Geen kalenderrekenwerk: werkbare werkdagen, vakanties en bouwvak worden met de hand geteld.
- Geen versiebeheer — er circuleren zes versies via e-mail.
- Geen resourceconflictdetectie over projecten heen: precies het portfolioprobleem van §1.2.
- Geen voortgangsregistratie of baseline-vergelijking, dus geen bruikbaar bewijs bij een geschil.

### 6.2 Buildertrend (inclusief CoConstruct)

**Voordelen**
- Volledig gericht op residentiële bouwers; woordenschat en workflows kloppen.
- **Onbeperkt gebruikers en projecten** ([Buildertrend](https://buildertrend.com/pricing/)) — je hoeft niet te rekenen bij het toevoegen van een uitvoerder.
- Sterkste onderdeel is precies wat dit segment nodig heeft: "Job Scheduling" scoort **4,72/5**, met lof voor "real-time schedule updates and notifications" ([Software Advice](https://www.softwareadvice.com/construction/buildertrend-profile/)).
- Uitstekende support: **4,7/5** ([GetApp](https://www.getapp.com/construction-software/a/buildertrend/)) — belangrijk in een segment zonder eigen ICT.
- Klantportaal, selecties en fotodocumentatie voorkomen ruzie met de koper.
- Grootste installed base (20.000+ bouwers, [Buildertrend](https://buildertrend.com/)) betekent dat onderaannemers het vaker al kennen.

**Nadelen**
- **Prijs.** 4,3/5 op value for money; "costs rise quickly with more projects"; gebruikers vinden de prijsstelling "confusing or unexpectedly high" ([GetApp](https://www.getapp.com/construction-software/a/buildertrend/)). Reviewers: "quiet an expensive software for a small company to manage", "way too expensive" ([Software Advice](https://www.softwareadvice.com/construction/buildertrend-profile/)). Geen gepubliceerde prijs op de eigen site ([Buildertrend](https://buildertrend.com/pricing/)) — je moet bellen om te weten wat het kost.
- **Leercurve ondanks de belofte.** Ease of use 4,37/5 met tegenstrijdige reviews: "very streamlined, easy to use" naast "a learning curve", "complex for new users" en "The product user experience is absolutely awful" ([Software Advice](https://www.softwareadvice.com/construction/buildertrend-profile/)).
- **De planning is een kalender, geen netwerk.** Voor echte CPM-analyse (kritiek pad, speling, wat-als-scenario's, baselines) is het te licht. Wie serieus wil plannen, exporteert alsnog naar Excel of MS Project.
- Geen line-of-balance/takt, dus geen goede ondersteuning voor repetitieve woningbouw.
- **Lock-in.** IFC bestaat niet in deze wereld; je data zit in hun cloud in hun formaat.
- Overname van CoConstruct betekent gedwongen migratie voor die klanten ([CoConstruct](https://www.coconstruct.com/pricing)) — precies het soort gebeurtenis dat mensen naar alternatieven doet kijken.

### 6.3 Procore

**Voordelen**
- Onbeperkt gebruikers, data en 24/7 support; je kunt de hele keten (onderaannemers, architect, opdrachtgever) erin trekken zonder per-seat-kosten ([Procore](https://www.procore.com/pricing)).
- Modulair te kopen: "pick and choose which Procore products you want to purchase" ([Procore](https://www.procore.com/pricing)).
- Zeer sterk in taakvoortgang (4,77/5) en workflowbeheer (4,68/5) ([Software Advice](https://www.softwareadvice.com/construction/procore-profile/)).
- Marktleiderstatus geeft integraties en een ecosysteem.

**Nadelen in dít segment**
- **Het ACV-prijsmodel is fundamenteel vijandig aan kleine bouwers.** Prijs op basis van "the aggregate dollar value of the construction work across your projects" ([Procore](https://www.procore.com/pricing)) betekent dat een woningbouwer met €25 mln omzet en 8 medewerkers betaalt alsof hij een groot bedrijf is. Reviewer: het model maakt het "prohibitively expensive for smaller firms"; de kosten zijn "simply astronomical", "reserved for large organizations or major projects" ([Software Advice](https://www.softwareadvice.com/construction/procore-profile/)).
- **Te zwaar procesmatig.** Een reviewer met 2–10 medewerkers meldt dat voor "small, routine maintenance projects, the heavy administrative processes" de uitvoering vertragen ([Software Advice](https://www.softwareadvice.com/construction/procore-profile/)).
- Laagste score op value for money: **4,13/5** ([Software Advice](https://www.softwareadvice.com/construction/procore-profile/)).
- Meer dan 60% van de reviews komt van bedrijven met 11–200 medewerkers ([Software Advice](https://www.softwareadvice.com/construction/procore-profile/)) — de zwaartepunt ligt boven het kernsegment.
- De schedulingmodule is niet Procore's sterkste kant; grote gebruikers importeren P6/MS Project-planningen.

### 6.4 Microsoft Project

**Voordelen**
- **Echte CPM**: Gantt, netwerkdiagrammen, baselines, mijlpalen, resource leveling in Standard 2024 ($679,99); volledig resourcebeheer en timesheets in Professional 2024 ($1.129,99) ([Microsoft](https://www.microsoft.com/en-us/microsoft-365/project/project-management-software)).
- **Eenmalige aanschaf mogelijk** — dat past bij een sector die abonnementsmoe is. Eén licentie van $679,99 die vijf jaar meegaat is $136/jaar; goedkoper dan elke suite.
- Universeel herkend; een .mpp of een geprinte MS Project-balk wordt door iedereen geaccepteerd.
- Rijk aan kalenderfunctionaliteit — kan werkbare-werkdagen-achtige kalenders benaderen.

**Nadelen in dít segment**
- **Onhandelbaar voor niet-planners.** De leercurve is de standaardreden waarom mensen terugvallen op Excel.
- **Enkelproject-denken.** Portfolio-/resourcebeheer over 25 gelijktijdige projecten vereist Project Server/Project Online — buiten bereik. Project Server Subscription Edition heeft geen publieke prijs en vereist een partner ([Microsoft](https://www.microsoft.com/en-us/microsoft-365/project/project-management-software)).
- Geen bouwspecifieke functies: geen line-of-balance, geen weer-/onwerkbare-dagenregistratie, geen onderaannemersportaal, geen fotodocumentatie, geen koppeling met termijnstaten.
- Geen samenwerking. De planning zit op de laptop van één persoon.
- Geen IFC, geen 4D.
- Microsoft's eigen richting is Planner/Project Plan-abonnementen; de desktopvariant voelt als legacy.

### 6.5 De prijsvechter-suites (Contractor Foreman, JobTread, BuildBook, Knowify, Buildxact)

**Voordelen**
- **Prijs.** Contractor Foreman Basic $588/jaar ([Contractor Foreman](https://www.contractorforeman.com/pricing/)); BuildBook Solo $79/mnd jaarlijks ([BuildBook](https://www.buildbook.co/pricing)); Knowify Core $99/mnd jaarlijks ([Knowify](https://www.knowify.com/pricing/)). Dit is een orde van grootte onder Buildertrend/Procore.
- **Lage instapdrempel.** JobTread: "No contract or setup fees", "Free implementation, training, and support" ([JobTread](https://www.jobtread.com/pricing)). Contractor Foreman: 30 dagen proef + 100 dagen geld-terug ([Contractor Foreman](https://www.contractorforeman.com/pricing/)). Buildxact "Go" is gratis ([Buildxact](https://www.buildxact.com/us/pricing/)).
- **Gantt in de basis.** Contractor Foreman heeft Gantt in *alle* tiers ([Contractor Foreman](https://www.contractorforeman.com/pricing/)); BuildBook op elk betaald niveau ([BuildBook](https://www.buildbook.co/pricing)).
- Gunstige schaalcurves voor teams: JobTread's extra gebruikers zakken van $20 naar $5 per maand ([JobTread](https://www.jobtread.com/pricing)).

**Nadelen**
- **De planning is oppervlakkig.** Een balkenschema met slepen-en-neerzetten en soms FS-relaties; geen serieus kritiek pad, geen speling, geen kalendersemantiek, geen baselines, geen wat-als.
- **Verkapte upsell.** Buildxact zet Schedules pas in de Pro-tier van $339/mnd; de $169-tier heeft géén planning ([Buildxact](https://www.buildxact.com/us/pricing/)). Wie voor planning komt, betaalt de duurdere tier.
- **Gebruikerslimieten bijten.** Knowify Core is 1 gebruiker + $29 per extra ([Knowify](https://www.knowify.com/pricing/)); BuildBook Business is 6–8 gebruikers ([BuildBook](https://www.buildbook.co/pricing)). Bij groei stapelt dat.
- **Commitment.** Buildxact-jaarplannen vereisen 12 maanden ([Buildxact](https://www.buildxact.com/us/pricing/)).
- **Geen interoperabiliteit.** Geen IFC, geen P6 XML, meestal ook geen MS Project-uitwisseling. Data-export is de zwakke plek van de hele categorie.
- **Overnamerisico.** Zie CoConstruct → Buildertrend ([CoConstruct](https://www.coconstruct.com/pricing)) en Bouw7 → Exact ([Exact](https://www.exact.com/nl/producten/bouw)).

### 6.6 Generieke tools (monday.com, Smartsheet, Trello)

**Voordelen:** goedkoop ($9–$12/gebruiker/mnd — [SelectHub](https://www.selecthub.com/construction-scheduling-software/), [Capterra](https://www.capterra.com/construction-scheduling-software/)); iedereen snapt ze; flexibel; goede mobiele apps; Smartsheet wordt bewust gepositioneerd als "Microsoft Project alternative" ([Software Connect](https://www.softwareconnect.com/roundups/best-construction-scheduling-software/)).

**Nadelen:** je bouwt je eigen bouwproces na en beheert dat zelf; geen bouwkalenders; geen termijnstaten; geen onderaannemersportaal; en per-gebruiker-prijzen worden duur zodra je 30 onderaannemers wilt toevoegen. De Gantt is een visualisatie, geen rekenmachine.

### 6.7 Asta Powerproject

**Voordelen:** echte bouwplanner met line-of-balance en 4D (Asta 4D); "more than 100,000 professionals worldwide"; volledige productlijn met web-portaal (Asta Vision), veld-app (Asta Siteprogress) en samenwerkingstool (Asta Connect) ([Eleco](https://eleco.com/products/asta-powerproject/)). Bij Britse volume-huisbouwers de facto standaard.

**Nadelen:** geen publieke prijs — "Email the team" ([Eleco](https://eleco.com/products/asta-powerproject/)) — wat op zichzelf al signaleert dat het niet voor het mkb is. Desktopgeoriënteerd, echte planner nodig, leercurve.

### 6.8 Open source (ProjectLibre, GanttProject)

**Voordelen:** gratis; ProjectLibre claimt 8,2 mln gebruikers in 193 landen en 20.000+ bedrijven ([ProjectLibre](https://www.projectlibre.com/)); GanttProject is GPL3 met MS Project-import/export en CSV/Excel/PDF/PNG-export ([GanttProject](https://www.ganttproject.biz/)) — precies de formaten die dit segment gebruikt. Geen lock-in.

**Nadelen:** allebei zijn ze **MS Project-klonen**, geen bouwtools. Geen bouwkalenders, geen line-of-balance, geen weer, geen termijnstaten, geen onderaannemersportaal, geen IFC, geen 4D, geen mobiel, geen samenwerking. GanttProject's site vermeldt zelfs geen kritiek pad expliciet ([GanttProject](https://www.ganttproject.biz/)). De UI's ogen gedateerd. Ze bewijzen dat de *vraag* naar gratis planning enorm is, maar bedienen die vraag alleen op het niveau van "MS Project maar dan gratis".

---

## 7. Openingen: waar zijn gebruikers ontevreden en waar zit het gat

### 7.1 De vier geverifieerde ontevredenheidsclusters

1. **Prijs en prijstransparantie.**
   Buildertrend value for money 4,3/5; "costs rise quickly with more projects"; prijsstelling "confusing or unexpectedly high" ([GetApp](https://www.getapp.com/construction-software/a/buildertrend/)). Procore value for money 4,13/5; kosten "simply astronomical" ([Software Advice](https://www.softwareadvice.com/construction/procore-profile/)). Beide leveranciers publiceren **geen prijs** ([Buildertrend](https://buildertrend.com/pricing/), [Procore](https://www.procore.com/pricing)) — het "bel ons voor een prijs"-model wordt in dit segment als onaangenaam ervaren, in een sector die gewend is aan directe getallen.

2. **Complexiteit en leercurve.**
   Buildertrend ease of use 4,37/5 met "a learning curve", "complex for new users", "The product user experience is absolutely awful" ([Software Advice](https://www.softwareadvice.com/construction/buildertrend-profile/)). Procore: "heavy administrative processes" vertragen kleine projecten ([Software Advice](https://www.softwareadvice.com/construction/procore-profile/)).

3. **Prijs-per-schaal mismatch.**
   ACV-gebaseerde prijzen (Procore) straffen bedrijven met hoge omzet en weinig gebruikers; per-gebruikersprijzen (Fieldwire $39–$89, Knowify +$29/gebruiker, Smartsheet/monday) straffen bedrijven die de hele onderaannemersketen willen betrekken. Er is geen model dat past bij "kleine organisatie, veel externe partijen, veel gelijktijdige projecten".

4. **Planning is de zwakke module in de betaalbare suites.**
   Dit is de kernconstatering. In elke prijsklasse onder de $500/maand is de "Gantt" een sleepbaar balkenschema zonder echte netwerklogica. En in de klasse die wél echte CPM heeft (MS Project $679,99–$1.129,99, Asta zonder publieke prijs, P6 $2.750/gebruiker), is niets bouwspecifiek voor woningbouw.

### 7.2 De zeven gaten — geordend naar relevantie voor een open-source, IFC-gebaseerde planner

#### Gat 1 — Echte CPM voor mensen die nu Excel gebruiken (⭐ grootste kans)
Er zit een leeg gebied tussen "gekleurde Excel-cellen" en "MS Project/P6". De prijsvechter-suites vullen dat niet: hun planning rekent niet. Een gratis, moderne planner die *wél* een kritiek pad, speling, kalenders en afhankelijkheden berekent en toch in twintig minuten te leren is, heeft geen betaalde concurrent in dit segment. ProjectLibre's 8,2 miljoen downloads ([ProjectLibre](https://www.projectlibre.com/)) bewijzen de vraag, maar ProjectLibre is een MS Project-kloon uit een ander tijdperk, niet een bouwtool.

#### Gat 2 — Werkbare werkdagen en weerkalenders (⭐ sterk gedifferentieerd, Europees)
De contractuele bouwtijd in NL/BE-woningbouwcontracten is uitgedrukt in **werkbare werkdagen**. Geen enkele mkb-suite en geen enkele generieke tool modelleert dit; Excel kan het niet. Een kalender-engine die onwerkbare dagen registreert, doorrekent naar de contractuele opleverdatum en daar een auditbaar logboek van bijhoudt, is een concreet, contractueel waardevol en technisch afgebakend onderscheidend kenmerk. Voor een tool die al een `CalendarEngine` heeft, is dit een uitbreiding, geen herbouw.

#### Gat 3 — Repetitieve woningbouw: line of balance / takt / bouwnummer-matrix (⭐ ongebruikelijk sterk)
Procore erkent LOB als de methode voor "repetitive work across multiple units" ([Procore](https://www.procore.com/library/construction-scheduling)) — en biedt het zelf niet in bruikbare vorm aan het mkb. Asta 4D en Vico zitten in het enterprise-prijssegment ([Eleco](https://eleco.com/products/asta-powerproject/)). Het resultaat is dat elke woningbouwer een Excel-matrix bouwt van bouwnummers × activiteiten. Een planner die een taakblok kan **repliceren over locaties** (60 woningen, 4 bouwstromen), automatisch ploegcontinuïteit bewaakt en zowel een Gantt als een LOB-diagram toont, bedient een reële, dagelijkse, onbediende behoefte.

#### Gat 4 — Portfolio-resourceconflicten over gelijktijdige projecten (⭐ dagelijkse pijn)
De echte vraag in dit segment is "waar moet ploeg 3 volgende week zijn" (§1.2). MS Project kan dit niet zonder Project Server; de suites hebben wel een kalender maar geen conflictdetectie mét CPM-doorrekening. Een simpele weergave "deze onderaannemer is in week 34 dubbel geboekt over projecten A en C — verschuiving van A kost 3 dagen kritiek pad" is precies de brug tussen de planning die niemand bijhoudt en de vraag die iedereen elke maandag heeft.

#### Gat 5 — Datasoevereiniteit en exit-vrijheid (⭐ onderschat, maar reëel)
Vendor lock-in is in dit segment geen theoretisch risico maar een geleefde ervaring: CoConstruct-klanten worden gedwongen naar Buildertrend gemigreerd ([CoConstruct](https://www.coconstruct.com/pricing)), Bouw7-klanten naar Exact ([Exact](https://www.exact.com/nl/producten/bouw)), en Buildertrend/Procore publiceren hun prijzen niet ([Buildertrend](https://buildertrend.com/pricing/), [Procore](https://www.procore.com/pricing)) zodat verlengingsonderhandelingen ondoorzichtig blijven. Een tool waarvan het **bestandsformaat een open ISO-standaard is** (IFC) en die lokaal draait, verkoopt hier een echt en begrepen voordeel — mits het argument in hun taal wordt gebracht ("je planning blijft van jou, ook als wij verdwijnen"), niet in openBIM-jargon.

#### Gat 6 — Planning ↔ termijnstaat/cashflow
Woningborg adviseert expliciet over "Termijnregelingen" ([Woningborg](https://www.woningborggroep.nl/)); de betaaltermijnen hangen aan bouwfasen. Als de planning schuift, schuift de facturatie mee — en daarmee de liquiditeit van een bedrijf met dunne marges. De suites doen facturatie én planning maar koppelen ze niet aan mijlpalen; MS Project doet planning maar geen geld. Een mijlpaal-gedreven termijn-/cashflowprojectie uit de planning is een klein stukje functionaliteit met onevenredig veel gepercipieerde waarde in dit segment.

#### Gat 7 — 4D voor de rest van ons
Repetitieve woningbouw is de eenvoudigste 4D-toepassing die bestaat, en juist daar is 4D onbereikbaar: BIM-viewers beginnen bij Fieldwire Business ($64/gebruiker/mnd, [Fieldwire](https://www.fieldwire.com/pricing/)) en echte 4D zit bij Asta 4D/Synchro/Navisworks zonder publieke prijs ([Eleco](https://eleco.com/products/asta-powerproject/)). Een tool die IFC leest en `IfcTask`-koppelingen aan modelelementen legt, kan hier gratis leveren wat nu €10.000+ kost. **Kanttekening:** dit is een groeikans, geen instapkans — de gemiddelde verbouwaannemer heeft geen IFC-model. Positioneer 4D als de reden waarom de *bovenkant* van dit segment (volume-woningbouwers, ontwikkelaars met een BIM-verplichting) naar het product komt, niet als de reden waarom de onderkant instapt.

### 7.3 Wat een open-source planner in dit segment **niet** moet doen

- **Geen EVMS, DCMA 14-point of AACE-forensiek in de standaard-UI.** Zie §5.1: die standaarden gelden hier niet, en hun aanwezigheid maakt het product zwaarder en enger. Als de functionaliteit er voor een andere sector toch is, verberg haar.
- **Geen concurrentie met de suites op offertes/facturatie/CRM.** Dat is hun kernwaarde en hun verdedigingslinie; daar valt niet in te breken met een planningstool. Wél: goed integreren of exporteren.
- **Geen "gratis Procore"-positionering.** Procore's probleem in dit segment is niet alleen de prijs maar de zwaarte ("heavy administrative processes" — [Software Advice](https://www.softwareadvice.com/construction/procore-profile/)). Een gratis versie van iets te zwaars is nog steeds te zwaar.
- **Geen per-gebruiker-denken.** Het aantal betrokkenen per project (onderaannemers, koper, kwaliteitsborger) is groot en het aantal *planners* is één. Elk model waarin het delen van een planning geld kost, botst met de sectorrealiteit.
- **Niet onderschatten hoe belangrijk printen en PDF is.** De planning in de keet hangt op papier. Een goede A3/A1-print- en PDF-export is in dit segment geen bijzaak maar een aankoopcriterium.

### 7.4 De scherpste positionering — samengevat

> **"Een echte bouwplanner voor de aannemer die nu in Excel plant: kritiek pad en kalenders die kloppen, werkbare werkdagen, 60 woningen in één handeling, en je bestand blijft van jou."**

De concurrent is Excel, niet Procore. Het winstpunt is niet prijs (Excel is al gratis) maar **de vier dingen die Excel niet kan**: automatisch doorschuiven bij vertraging, kritiek pad, kalenderrekenwerk in werkbare werkdagen, en repetitie over bouwnummers. Het risico is niet functionaliteit maar **tijd tot eerste waarde**: als het langer duurt dan een uur om de eerste bruikbare planning te maken, verliest het van de spreadsheet die er al staat.

---

## 8. Onzekerheden en aanbevolen vervolgonderzoek

| Onderwerp | Status | Actie |
|---|---|---|
| UAV 2012 § 42 kortingsbedrag per dag | **[ONGEVERIFIEERD]** — wetten.overheid.nl leverde de Aanbestedingswet | Officiële UAV 2012-tekst opzoeken |
| Promillage vergoeding per kalenderdag in Woningborg/SWK-modelovereenkomst | **[ONGEVERIFIEERD]** — brondocument achter downloadformulier | "Modelovereenkomst nieuwbouw 2024 versie 01-01-2026" downloaden via [Woningborg kennisbank](https://www.woningborggroep.nl/kennisbank/?type=Downloads) |
| Wkb-termijnen (bouwmelding, gereedmelding, opleverdossier) | **[ONGEVERIFIEERD]** — rijksoverheid.nl en iplo.nl niet bereikbaar (404) | Opnieuw raadplegen |
| Definitie/drempels onwerkbaar weer (vorst, neerslag, wind) | **[ONGEVERIFIEERD]** — UWV 503, Bouwend Nederland en Arbouw niet vindbaar | Regeling onwerkbaar weer + cao Bouw & Infra raadplegen |
| DCMA 14-point exacte drempelwaarden | **[ONGEVERIFIEERD]** — drie bronnen faalden (403/404) | Alleen relevant als het rapport ook de infra-sector dekt |
| EIA-748 / EVMS dollargrenzen | **[ONGEVERIFIEERD]** — acq.osd.mil gaf 503 | idem |
| IFC 4.3 ISO-aanduiding + planningsentiteiten | **[ONGEVERIFIEERD]** — buildingsmart.org en iso.org gaven 403 | [technical.buildingsmart.org](https://technical.buildingsmart.org/standards/ifc/) opnieuw proberen |
| Buildertrend werkelijke prijs ($99 vs $499) | **Tegenstrijdige bronnen** | Offerte aanvragen of recentere reviewdata |
| Aantal residentiële bouwbedrijven VS (NAICS 2361) | **Niet opgehaald** | US Census CBP 2023-dataset ([census.gov](https://www.census.gov/programs-surveys/cbp.html)) |
| Procore klantaantallen en ARPC | **Niet opgehaald** — investor-PDF's gaven 403 | 10-K/10-Q via SEC EDGAR |
| Harde statistiek "% aannemers dat Excel gebruikt voor planning" | **Niet gevonden** | JBKnowledge ConTech Report of Dodge SmartMarket-rapport; de bewering in dit rapport steunt op de bedrijfsgroottedistributie, niet op een directe meting |

---

## 9. Bronnenlijst

### Leveranciers — prijzen en productinformatie
1. Buildertrend — Pricing: https://buildertrend.com/pricing/
2. Buildertrend — Homepage ("20,000+ builders"): https://buildertrend.com/
3. Buildertrend — Blog, construction scheduling software: https://buildertrend.com/blog/construction-scheduling-software/
4. CoConstruct — Pricing/transitiepagina: https://www.coconstruct.com/pricing
5. Procore — Pricing (ACV-model): https://www.procore.com/pricing
6. Procore — Library, Construction Scheduling (CPM/LPS/PERT/LOB): https://www.procore.com/library/construction-scheduling
7. Contractor Foreman — Pricing: https://www.contractorforeman.com/pricing/
8. JobTread — Pricing: https://www.jobtread.com/pricing
9. Buildxact (VS) — Pricing: https://www.buildxact.com/us/pricing/
10. Knowify — Pricing: https://www.knowify.com/pricing/
11. BuildBook — Pricing: https://www.buildbook.co/pricing
12. Fieldwire — Pricing: https://www.fieldwire.com/pricing/
13. Exact voor Bouw (voorheen Bouw7) — Producten/prijzen: https://www.exact.com/nl/producten/bouw
14. Microsoft — Project management software (perpetual prijzen): https://www.microsoft.com/en-us/microsoft-365/project/project-management-software
15. Microsoft — Vergelijk Project-versies: https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software
16. Eleco (Elecosoft) — Asta Powerproject: https://eleco.com/products/asta-powerproject/
17. Deltek — Acumen (600+ metrics, DCMA/DOE/NASA/GAO/AACE): https://www.deltek.com/en/products/project-and-portfolio-management/acumen
18. ProjectLibre: https://www.projectlibre.com/
19. GanttProject: https://www.ganttproject.biz/
20. Smartsheet — Pricing: https://www.smartsheet.com/pricing

### Review- en vergelijkingsplatforms
21. Software Advice — Buildertrend profiel (prijs $499/mnd, scheduling 4,72/5, ease of use 4,37/5): https://www.softwareadvice.com/construction/buildertrend-profile/
22. Software Advice — Procore profiel (value for money 4,13/5, "astronomical", ACV-kritiek): https://www.softwareadvice.com/construction/procore-profile/
23. GetApp — Buildertrend (4,5/5, 2.486 reviews, value 4,3, support 4,7): https://www.getapp.com/construction-software/a/buildertrend/
24. Capterra — Construction Scheduling Software categorie (prijzen en reviewvolumes): https://www.capterra.com/construction-scheduling-software/
25. Software Connect — Best Construction Scheduling Software (Procore $375/mnd, Buildertrend $499/mnd, P6 $2.750/gebruiker): https://www.softwareconnect.com/roundups/best-construction-scheduling-software/
26. SelectHub — Construction Scheduling Software (segmentindeling en prijzen): https://www.selecthub.com/construction-scheduling-software/

### Analistenrapporten
27. Mordor Intelligence — Construction Management Software Market (USD 10,62 mrd 2025 → 17,81 mrd 2031, CAGR 8,99%; GC's 46,72%; top 5 ~45%): https://www.mordorintelligence.com/industry-reports/construction-management-software-market
28. Verified Market Reports — Construction Scheduling Software Market (USD 3,12 mrd 2025 → 6,78 mrd 2034, CAGR 9,25%): https://www.verifiedmarketreports.com/product/construction-scheduling-software-market/
29. Stock Analysis — Procore Technologies (omzet USD 1,32 mrd 2025, +14,83%): https://stockanalysis.com/stocks/pcor/

### Statistiek, branche en overheid
30. CBS StatLine 81588NED — Bedrijven naar bedrijfstak/bedrijfsgrootte (269.845 bouwbedrijven NL, Q3 2026): https://www.cbs.nl/nl-nl/cijfers/detail/81588NED
31. AGC of America — Construction Data (919.000 vestigingen, 8,0 mln werknemers, $2,1 biljoen, Q1 2023): https://www.agc.org/learn/construction-data
32. Europese Commissie — Construction sector (18 mln banen, ~9% bbp, tot 95% mkb): https://single-market-economy.ec.europa.eu/sectors/construction_en
33. Bouwend Nederland — Over ons (~4.600 leden, ~10% bbp, bijna €100 mrd productie): https://www.bouwendnederland.nl/over-ons
34. Aannemersfederatie Nederland (AFNL) — ruim 1.200 bedrijven: https://www.aannemersfederatie.nl/
35. US Census Bureau — County Business Patterns (2023 laatste data, 2024 zomer 2026): https://www.census.gov/programs-surveys/cbp.html
36. NAHB: https://www.nahb.org/
37. US Census Bureau — New Residential Construction: https://www.census.gov/construction/nrc/index.html

### Waarborg, garantie en contractstandaarden
38. Woningborg Groep — Homepage (waarborgcertificaten, termijnregelingen): https://www.woningborggroep.nl/
39. Woningborg Groep — Kennisbank/downloads (Modelovereenkomst nieuwbouw 2024 v. 01-01-2026; Garantie- en waarborgregelingen Nieuwbouw incl. bijlage A, 28-10-2025): https://www.woningborggroep.nl/kennisbank/?type=Downloads
40. SWK — Stichting Waarborgfonds Koopwoningen (sinds 1978): https://www.swk.nl/
41. NHBC (VK) — warranty provider, ~1,2 mln beschermde woningen: https://www.nhbc.co.uk/
42. AACE International — Recommended Practices: https://web.aacei.org/resources/publications/recommended-practices

### Niet-bereikbare bronnen (voor transparantie over de gaten in §8)
43. buildingSMART — IFC standaard (403): https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/ en https://technical.buildingsmart.org/standards/ifc/
44. Rijksoverheid — Wkb (404): https://www.rijksoverheid.nl/onderwerpen/bouwregelgeving/wet-kwaliteitsborging-voor-het-bouwen
45. UWV — onwerkbaar weer (503): https://www.uwv.nl/nl/onwerkbaar-weer
46. DCMA (geen 14-point-informatie op de site): https://www.dcma.mil/
47. G2 — Buildertrend reviews (403): https://www.g2.com/products/buildertrend/reviews
48. Grand View Research — Construction Management Software Market (403): https://www.grandviewresearch.com/industry-analysis/construction-management-software-market
49. NBS/Glenigan — Digital Construction Report 2023 (data achter downloadformulier; 723 respondenten, juli–september, ~70% VK): https://www.thenbs.com/knowledge/digital-construction-report-2023
50. Procore Investor Relations (PDF's 403): https://investors.procore.com/

---

*Rapport opgesteld op 25 juli 2026. Alle prijzen zoals gepubliceerd op de raadpleegdatum. Marktomvangcijfers gemarkeerd als **[SCHATTING]** zijn eigen berekeningen met de volledige rekenketen in §4.3; ze zijn geen analistencijfers. Punten gemarkeerd als **[ONGEVERIFIEERD]** zijn niet uit een primaire bron bevestigd en moeten vóór extern gebruik worden nagezocht — zie §8.*

---

## Verificatie

**Uitgevoerd:** 25 juli 2026, adversariële fact-check. Methode: elke bewering actief proberen te wéérleggen met onafhankelijke bronraadpleging; alle doorgerekende schattingen zelfstandig nagerekend. De zoekmachine-quota van deze sessie was uitgeput, dus de controle is gedaan met directe fetches op primaire bronnen. **13 beweringen gecontroleerd: 6 bevestigd, 5 gecorrigeerd, 2 onzeker.**

### V1 — Bottom-up Stap 1, VS: 919.000 vestigingen × 65% "met personeel" × 65% woningbouw = 390.000 → **GECORRIGEERD (rekenfout)**

De belangrijkste fout in het rapport. Het AGC-cijfer is BLS-QCEW-data en telt uitsluitend vestigingen **met loonpersoneel** (UI-gedekt). Bewijs: 919.000 vestigingen bij 8,0 mln werknemers = 8,7 werknemers per vestiging — onmogelijk als zzp'ers meetelden (de VS telt daarnaast circa 3 mln non-employer bouwbedrijven, die in dit cijfer ontbreken). BLS bevestigt de systematiek: 956.863 particuliere bouwvestigingen bij ~8,3 mln werknemers in Q4 2025. De "×65% is een bedrijf met personeel"-stap is dus een **dubbele aftrek**. Correcte keten: 919.000 vestigingen → ~780.000–830.000 werkgeversbedrijven (vestiging→bedrijf ≈ ×0,85–0,90, conform de SUSB-systematiek die eveneens alleen werkgevers telt) → ×65% woningbouwgerelateerd ≈ **510.000–540.000**, niet 390.000. Onderschatting van ~35%. De 65%-woningbouwaanname zelf blijft onbevestigd.
Bronnen: https://www.agc.org/learn/construction-data · https://www.bls.gov/iag/tgs/iag23.htm · https://www.census.gov/programs-surveys/susb.html

### V2 — Bottom-up Stap 1, EU: NL-bevolkingsschaling → 700.000 bedrijven met personeel → 455.000 → **GECORRIGEERD (methodisch onhoudbaar, richting: te laag)**

Eurostat telt voor 2023 **~4 miljoen** bouwondernemingen in de EU, 13,9 mln werkzame personen, 94,2% micro (<10 personen). Twee weerleggingen: (a) de bevolkingsschaling is overbodig én verkeerd om — Nederland heeft 6,7% van alle EU-bouwondernemingen bij 4,0% van de EU-bevolking, dus de NL-dichtheid ligt juist ruim bóven het gemiddelde, terwijl het rapport neerwaarts corrigeert "voor lagere bedrijfsdichtheid"; (b) de uitkomst van 700.000 impliceert dat slechts 17,5% van de EU-bouwondernemingen personeel heeft — een verhouding die één-op-één is overgenomen uit het EU-land met het hoogste aandeel solo-zelfstandigen in de bouw. Realistischer: 1,0–1,6 mln EU-bouwbedrijven met personeel, ofwel ~650.000–1.040.000 woningbouwgerelateerd.
Bron: https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Businesses_in_the_construction_sector

### V3 — "~1.095.000 adresseerbare bedrijven" en de 25%-penetratie → **GECORRIGEERD (circulair; noemer draagt de conclusie niet)**

Na V1 + V2 wordt de adresseerbare basis **~1,4–1,8 mln** in plaats van 1.095.000. Belangrijker is de structurele fout: Stap 2 leidt 150.000–450.000 betalende bedrijven af uit leverancierstellingen, rekent dát om naar een penetratiepercentage tégen de noemer die op dat moment wordt geschat, en vermenigvuldigt vervolgens weer met dezelfde noemer. Het percentage voegt geen informatie toe — het importeert alleen de fout van de noemer. Gevolg: met de gecorrigeerde noemer zakt de penetratie naar ~15–20% terwijl het eindantwoord onveranderd blijft. Het cijfer van USD 225 mln rust in werkelijkheid volledig op twee ongefundeerde aannames: **275.000 betalende bedrijven** ("~30 aanbieders × 5.000–15.000 klanten" — zelf een schatting zonder bron) en **$2.400 gemiddelde jaarbesteding** (afgeleid uit een eigen tabel in §3.2 die zelf als [SCHATTING] is gemarkeerd). De hele bedrijvenpopulatie-analyse is decoratief. Aanvullend: de reviewvolume-proxy is instabiel — Buildertrend's eigen homepage citeert "4.5 rating on Capterra (based on 5,000 reviews)" tegenover 2.486 op GetApp, hetzelfde Gartner-platform.
Bronnen: https://buildertrend.com/ · https://www.getapp.com/construction-software/a/buildertrend/ · https://www.capterra.com/construction-scheduling-software/

### V4 — "Drie convergerende routes" → **GECORRIGEERD (convergentie is schijn; routes 2 en 3 spreken elkaar tegen)**

Nagerekend: route 2 neemt aan dat planning **10–15%** van de bouwmanagementsoftware-besteding is. Route 3 gebruikt een scheduling-markt van USD 3,12 mrd naast een bouwmanagementmarkt van USD 10,62 mrd — dat is **29,4%**, een factor 2–3 hoger. Beide aannames kunnen niet tegelijk waar zijn. Verder zijn routes 2 en 3 niet onafhankelijk (beide top-down analistencijfers met vrij gekozen percentagebanden eroverheen: 15–20% × 10–15%, respectievelijk 6–10%) en is route 1 na V3 geen echte bottom-up. Met vrij gekozen banden convergeert elke route op elk gewenst getal. Realistische onzekerheidsband: **USD 150–450 mln** in plaats van USD 200–280 mln. Ook: het rekenkundige midden van 200–280 is 240, niet de gepresenteerde "middenschatting" van 235.
Bronnen: https://www.mordorintelligence.com/industry-reports/construction-management-software-market · https://www.verifiedmarketreports.com/product/construction-scheduling-software-market/

### V5 — Rekenketen §4.3 Stap 2→4 (275.000 × $2.400 = $660 mln; × 25% = $165 mln; + $60 mln = $225 mln) → **BEVESTIGD (rekenkundig correct)**

Alle tussenstappen nagerekend en correct: 275.000 × 2.400 = 660.000.000 ✓; 660 × 0,25 = 165 ✓; 165 + 60 = 225 ✓. Ook correct: 269.845 − 233.700 = 36.145 ✓; 233.700/269.845 = 86,6% ✓; 449/17,9 = 25,1 en 36.145 × 25,1 ≈ 907.000 ✓; 700.000 × 0,65 = 455.000 ✓; €20 mln × 0,70 × 0,07 / 12 = €81.667 ✓; Contractor Foreman $49 × 12 = $588 ✓ en $332 × 12 = $3.984 ✓; Buildxact $399 × 0,85 = $339 ✓; MS Project $679,99 / 5 jaar = $136/jr ✓; $1.129,99 / 3 jaar ≈ $377 ✓. De rekenfouten zitten dus niet in de aritmetiek maar in de aannames en in de bronlezing (V1, V6).

### V6 — "Verborgen kosten zijn 2–3× de licentiekosten" (§3.4) → **GECORRIGEERD (rekenfout)**

Uit de tabel zelf: €4.800 + €6.200 = €11.000 verborgen tegenover ~$6.400 zichtbaar = **1,7×**, niet 2–3×. Bovendien telt de tabel een eenmalige post (€4.800 implementatietijd) op bij jaarlijkse posten, en worden USD- en EUR-bedragen ongewisseld opgeteld. Alleen terugkerend vergeleken: €6.200 tegen ~$6.400 ≈ **1,0×**. De kwalitatieve conclusie ("verborgen kosten zijn minstens even groot als de licentie") houdt stand; de factor niet. Bron: interne consistentiecontrole van §3.4.

### V7 — Mordor: USD 10,62 mrd (2025) → 11,58 mrd (2026) → 17,81 mrd (2031), CAGR 8,99%; GC's 46,72%; midsize-projecten 44,38%; top-5 ~45% → **BEVESTIGD**

Alle vijf cijfers letterlijk teruggevonden op de bron, inclusief de zin "The top five suppliers Oracle, Autodesk, Procore, Trimble, and Bentley Systems collectively captured roughly 45% of 2025 revenue". CAGR nagerekend: 10,62 × 1,0899⁶ = 17,80 ✓ en 10,62 × 1,0899 = 11,58 ✓. Kanttekening: de vendorsectie van diezelfde Mordor-pagina noemt als top 5 Oracle, **Bentley, Procore, Microsoft, Trimble** — Autodesk ontbreekt daar en Microsoft staat erbij; de bron is op dit punt zelf niet consistent.
Bron: https://www.mordorintelligence.com/industry-reports/construction-management-software-market

### V8 — Verified Market Reports: USD 3,12 mrd (2025) → 6,78 mrd (2034), CAGR 9,25% → **ONZEKER (bron rekent niet rond)**

Cijfers letterlijk aanwezig op de bron, maar nagerekend klopt de CAGR niet met de eindpunten: 3,12 → 6,78 over 2025–2034 (9 jaar) = **9,0%**, niet 9,25%. En dezelfde pagina noemt USD 3,12 mrd elders voor **2024**, wat 8,1% over 10 jaar zou geven. Verified Market Reports publiceert geen methodologie en is een aggregator. Aangezien route 3 van de omvangschatting volledig op dit cijfer rust (V4), is de betrouwbaarheid van die route laag. Alleen als indicatie gebruiken.
Bron: https://www.verifiedmarketreports.com/product/construction-scheduling-software-market/

### V9 — Prijzen: Microsoft Project, Contractor Foreman, Buildxact, Buildertrend → **BEVESTIGD (één micro-correctie)**

Letterlijk geverifieerd bij de leverancier: Project Standard 2024 **$679,99** en Project Professional 2024 **$1.129,99** eenmalig ✓. Contractor Foreman jaarplannen Basic $49/$588, Standard $105/$1.264, Plus $166/**$1.997**, Pro $221/$2.654, Unlimited $332/$3.984 — met scheduling/Gantt in **alle** tiers ✓ (het rapport rondde $1.997 correct over uit de bron, niet uit 166×12=1.992). Buildxact US: Go gratis, Foundation $169/$199 (**zonder** Schedules), Pro $339/$399 (**mét** Schedules), Master $509/$599 ✓ — kleine correctie: Master jaarplan is **$6.110/jr**, niet $6.108. Buildertrend homepage: "Trusted by 20,000+ builders running complex, high-value projects" ✓. GetApp Buildertrend: 4,5/5, 2.486 reviews, value for money 4,3, support 4,7 ✓ (ease of use toont daar 4,4; het rapport citeert 4,37 van Software Advice — beide bestaan naast elkaar).
Bronnen: https://www.microsoft.com/en-us/microsoft-365/project/project-management-software · https://www.contractorforeman.com/pricing/ · https://www.buildxact.com/us/pricing/ · https://buildertrend.com/ · https://www.getapp.com/construction-software/a/buildertrend/

### V10 — "Eén Primavera P6-seat kost $2.750 eenmalig" en "Procore vanaf $375/mnd" → **GECORRIGEERD (selectieve bronlezing)**

Dezelfde Software Connect-pagina die het rapport citeert vermeldt naast "Starting Price: $2,750/user (perpetual license)" óók "**$3,520+ one-time**" en "Primavera P6 by Oracle… **starts at over $3,000** for a single license". Het rapport pikte consequent het laagste getal. Bovendien is een perpetual Oracle-licentie niet compleet zonder de jaarlijkse onderhouds-/supportfee, die in de §1.3-vergelijking met suite-abonnementen ontbreekt en die vergelijking systematisch in het voordeel van P6 kleurt. Voor Procore noemt dezelfde bron nu "**just under $400/month** for smaller volume builders", niet $375.
Bron: https://www.softwareconnect.com/roundups/best-construction-scheduling-software/

### V11 — Procore: omzet USD 1,32 mrd 2025 (+14,83%), beurswaarde USD 6,46 mrd, −42% → **BEVESTIGD**

Alle cijfers teruggevonden: FY2025 omzet $1,32 mrd tegen $1,15 mrd in FY2024, groei 14,83%; marktkapitalisatie $6,46 mrd, −42,0%; koers $42,83 binnen een 52-weeksbereik van $38,03–$82,32. Nagerekend: 1,32/1,15 = 1,1478 ✓. Kanttekening bij de *interpretatie* in §4.5: de −42% is een koers-/waarderingsbeweging waar meerdere verklaringen voor bestaan (SaaS-multiple-compressie sectorbreed, groeivertraging, rentestand); het rapport schrijft haar zonder bewijs toe aan "afkoelende bouwactiviteit". Dat is een plausibele maar ongetoetste causale claim.
Bron: https://stockanalysis.com/stocks/pcor/

### V12 — "233.700 eenmanszaken" (§0) en de CBS-basis → **ONZEKER (terminologisch onjuist; bron niet herbevestigd)**

CBS-tabel 81588NED deelt in naar **bedrijfsgrootte in werkzame personen**, niet naar rechtsvorm. "1 werkzame persoon" is dus niet gelijk aan "eenmanszaak" — een bv met alleen een dga valt er ook onder. Het rapport gebruikt de twee door elkaar in §0 en §2.1. Het onderliggende argument (86,6% van de NL-bouwbedrijven is een eenpitter en koopt geen planningssoftware) blijft geldig. CBS StatLine gaf bij deze verificatie een 503 en kon niet worden herbevestigd; de peildatum Q3 2026 is dus niet onafhankelijk gecontroleerd.
Bron: https://www.cbs.nl/nl-nl/cijfers/detail/81588NED (503 bij verificatie)

### V13 — "Verplichte leverformaten XER / P6 XML: **Nul**" (§5.1) en "EU: tot 95% micro/mkb" → **gemengd**

De EC-bewering is **BEVESTIGD**, letterlijk: "Up to 95% of construction, architecture, and civil engineering firms are micro-enterprises or small and medium-sized enterprise (SMES)", "18 million direct jobs", "about 9% of the EU's GDP" ✓.
De XER-bewering is **GECORRIGEERD**: "Nul" en "geen enkele opdrachtgever" zijn universele negatieve claims die niet te bewijzen zijn, en er bestaan tegenvoorbeelden — door de Amerikaanse overheid gefinancierde meergezins-/sociale woningbouw (HUD, FAR-gebaseerde contracten) en sommige aanbestede corporatieprojecten kennen wél formele CPM-schema-eisen. Die tegenvoorbeelden zijn in deze verificatie niet uit een primaire bron bevestigd; de veilige formulering is "in het gros van dit segment afwezig", niet "nul". De strategische conclusie van §5.1 (geen EVMS/DCMA-bagage in de standaard-UI) blijft overeind.
Bron: https://single-market-economy.ec.europa.eu/sectors/construction_en

### Samenvattend oordeel over de beweerde segmentomvang

De kop-bewering — **USD 200–280 mln/jaar voor het planningsdeel, ingebed in USD 1,6–2,1 mrd bouwmanagementsoftware, groei 10–14%/jaar** — is als **orde van grootte** verdedigbaar, maar de onderbouwing is zwakker dan het rapport suggereert. De aritmetiek klopt (V5), de externe cijfers die als anker dienen kloppen (V7, V9, V11), maar de drie "convergerende" routes zijn niet onafhankelijk en spreken elkaar op één punt hard tegen (V4), de bottom-up route bevat een echte rekenfout in de VS-stap (V1) en een onhoudbare EU-schaling (V2), en het eindantwoord wordt gedragen door twee ongefundeerde aannames in plaats van door de gepresenteerde bedrijvenpopulatie (V3). **Gebruik USD 150–450 mln als eerlijke band, met ~USD 235 mln als werkhypothese en expliciete vermelding dat dit geen analistencijfer is.** De groeischatting van 10–14%/jaar is een eigen opslag bovenop gepubliceerde CAGR's van 8,99% en 9,0–9,25% en is nergens onafhankelijk onderbouwd — behandel die als **onzeker**.
