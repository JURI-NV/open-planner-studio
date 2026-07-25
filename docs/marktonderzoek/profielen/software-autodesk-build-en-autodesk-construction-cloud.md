# Autodesk Build & Autodesk Construction Cloud (sinds maart 2026: **Autodesk Forma** / **Forma Build**)

**Profiel t.b.v. marktonderzoek planningssoftware**
Opgesteld: 25 juli 2026 · Analist: software-analist marktonderzoek
Onderzoeksbasis: 16 WebSearch-opdrachten (EN/DE/NL) + gerichte WebFetch op leverancierssite, officiële Autodesk-helpdocumentatie, Autodesk Platform Services (APS), investor relations, en review-/vakbronnen (G2, Capterra, TrustRadius, SoftwareConnect, SoftwareFinder, Constructable, OMR, Architosh).

> **Leeswijzer bij bedragen.** Autodesk publiceert voor dit portfolio géén openbare lijstprijzentabel meer; de eigen prijspagina leidt naar "Get a Quote". Alle bedragen hieronder komen daarom uit derde bronnen en zijn expliciet gemarkeerd als **[LIJSTPRIJS-INDICATIE]**, **[DERDENBRON]** of **[SCHATTING]**. Ze zijn richtinggevend, niet contractueel.

---

## 0. Kernoordeel in één alinea (samenvatting vooraf)

Autodesk Build/ACC — sinds 24–25 maart 2026 hernoemd tot **Forma Build** binnen **Autodesk Forma** — is een zeer sterk *bouwmanagement- en documentplatform* met een uitstekende BIM-koppeling, maar het is **géén planningspakket**. De Schedule-tool bevat **geen netwerkplanning-engine**: hij importeert planningen uit Primavera P6, MS Project en Asta Powerproject, toont ze als Gantt/lijst en hangt er projectdata aan, maar rekent zelf geen CPM door. Autodesk's eigen documentatie bevestigt dit expliciet: bij een geaccepteerde wijzigingssuggestie "maakt de schedule manager de wijziging in de externe schedule authoring tool en importeert vervolgens de bijgewerkte versie". Voor een IFC-gebaseerde open-source planner is ACC/Forma daarmee vooral **een consument van planningsdata en een gesloten eindstation**: er is geen Schedule-API, geen planning-export, en geen enkele ondersteuning voor `IfcWorkSchedule`/`IfcTask`.

---

## 1. Wat het is

### 1.1 Leverancier

| Item | Gegeven |
|---|---|
| Leverancier | Autodesk, Inc. (NASDAQ: ADSK) |
| Opgericht | 1982 |
| Hoofdkantoor | San Francisco, CA, VS |
| Omzet FY2026 (boekjaar t/m 31 jan 2026) | **$7.206 mln**, +18% j-o-j |
| AECO-productfamilie FY2026 | **$3.583 mln**, +22% j-o-j |
| Q4 FY2026 omzet | $1.957 mln, +19% |
| Vrije kasstroom FY2026 | $2.409 mln, +54% |
| Licentie | Volledig proprietary, SaaS-abonnement |

Autodesk noemde bij de FY26-jaarcijfers (persbericht 26 februari 2026) expliciet "outperformance in AECO, particularly in construction and emerging markets". Construction wordt niet als aparte omzetlijn gerapporteerd.

### 1.2 Historie en eigendom — een platform dat is *samengekocht*

Dit is essentieel om het product te begrijpen, want het verklaart veel van de kritiek.

| Jaar | Overname | Bedrag | Wat het werd |
|---|---|---|---|
| 2018 | **Assemble Systems** | n.b. | model-gebaseerde hoeveelheden/status |
| dec 2018 | **PlanGrid** | **$875 mln** | veldtekeningen/mobiel → kern van Autodesk Build |
| dec 2018 | **BuildingConnected** | **$275 mln** (netto van cash) | aanbesteding/bid management |
| aug 2020 | **Pype** | n.b. | submittals/closeout-automatisering |
| dec 2021 | **ProEst** | n.b. | cloud-calculatie |
| 2024 | **Payapps** | n.b. | betalingsaanvragen/termijnstaten |

Autodesk gaf naar eigen zeggen **meer dan $1,1 mrd** uit aan Assemble, BuildingConnected, PlanGrid en Pype samen.

**Tijdlijn platform:**
- **nov 2019** — Autodesk Construction Cloud (ACC) aangekondigd: PlanGrid + BuildingConnected + Assemble + BIM 360 onder één merk.
- **2021** — Autodesk Build gelanceerd als opvolger van BIM 360 Build/PlanGrid.
- **±2022–2023** — Schedule-tool toegevoegd aan Autodesk Build.
- **17 feb 2026** — Autodesk kondigt rebranding aan.
- **24–25 maart 2026** — **ACC wordt Autodesk Forma.** Ingangsdatum bevestigd door Autodesk-blog (bijgewerkt 25 maart 2026) en Architosh (31 maart 2026).
- **25 maart 2026** — lancering **Forma Build Essentials** voor kleine/middelgrote aannemers.

### 1.3 De naamswijziging van maart 2026 (belangrijk voor iedereen die dit onderzoek leest)

| Oude naam | Nieuwe naam (vanaf 24/25 maart 2026) |
|---|---|
| Autodesk Construction Cloud (ACC) | **Autodesk Forma** |
| Autodesk Docs | **Forma Data Management** |
| BIM Collaborate Pro | **Forma Design Collaboration** |
| **Autodesk Build** | **Forma Build** |
| Autodesk Takeoff | **Forma Takeoff** |
| Autodesk Estimate | **Forma Estimate** |
| Forma (het oorspronkelijke conceptontwerp-product) | **Forma Site Design** |
| Accounts | **Hubs** |
| Account admins | **Hub Admins** |

Nieuwe bundelnamen: *Forma for Preconstruction*, *Forma for Model Management*, *Forma for Construction Operations*.

Autodesk benadrukt: "No data migration", "No regional storage changes", "**No URL, login, API, or integration changes**", "No licensing or user provisioning changes", "No workflow disruptions". Het is dus een merkoperatie, geen technische migratie. IDC-analist Jeffrey Hojlo onderschrijft de strategie: "A platform approach that unifies project data and processes across the lifecycle is essential."

> **Waarschuwing voor het onderzoek:** in de markt, in reviews en in reseller-prijslijsten lopen de namen "ACC", "Autodesk Build" en "Forma Build" op dit moment (juli 2026) volledig door elkaar. Ook Autodesk's eigen helpsites gebruiken nog beide. Verwar "Forma Site Design" (conceptontwerp/haalbaarheid) niet met "Autodesk Forma" (het hele platform).

### 1.4 Doelgroep, sectoren en regio's

**Primaire doelgroep:** hoofdaannemers (GC's), bouwmanagementbureaus, opdrachtgevers/asset owners, en ontwerpteams die al in het Autodesk-ecosysteem zitten (Revit/AutoCAD/Civil 3D/Navisworks).

**Sectoren waar het echt gebruikt wordt** (goed onderbouwd): commerciële utiliteitsbouw, healthcare, datacenters, onderwijs, industriebouw, woningbouw-op-schaal — kortom overal waar Revit-gebaseerde BIM-coördinatie de dominante werkstroom is.

**Zwakkere positie** (goed onderbouwd uit concurrentiepositionering): zware infrastructuur/civiel en megaprojecten met formele project controls, waar Oracle Primavera P6 + Aconex de facto standaard blijven, en waar Bentley (SYNCHRO/ProjectWise) sterk staat.

**Regio's** — *[SCHATTING, gebaseerd op Autodesk's kanaalstructuur, lokale prijs-/helpdomeinen (construction.autodesk.de, .eu), en de FY26-uitspraak over "emerging markets"]*: sterkst in Noord-Amerika; substantieel in VK/Ierland, DACH, Benelux, Nordics; groeiend in Australië/NZ, Midden-Oosten (Golfstaten), India en Zuidoost-Azië. Autodesk noemde "emerging markets" expliciet als outperformer in FY26.

**Marktsegment-mismatch** (uit reviewanalyse): voor GC's met $20M–$150M jaaromzet weegt de implementatie- en beheerlast van ACC vaak niet op tegen de baten, tenzij BIM-coördinatie de kernactiviteit is.

---

## 2. Functionaliteit en techniek — met een strenge blik op de planning-engine

### 2.1 Wat het platform als geheel doet

Forma Build (voorheen Autodesk Build) is een breed bouwmanagementpakket: documentbeheer (Files/Sheets), issues, RFI's, submittals, formulieren, dagrapporten, foto's, assets, kwaliteit & veiligheid, kosten (Cost Management), meer-/minderwerk, betalingen (Payapps), en **Schedule**. Daaromheen: Forma Data Management (CDE), Forma Design Collaboration, Model Coordination (clashdetectie), Forma Takeoff/Estimate, BuildingConnected/TradeTapp (aanbesteding), Pype AutoSpecs/Closeout.

### 2.2 De Schedule-tool — het hart van deze beoordeling

#### Wat er wél in zit

**Import (uitsluitend import):** volgens de officiële Autodesk-helppagina *Import a Schedule*:
- **Primavera P6** — `.xer` en `.xml`
- **Microsoft Project** — `.mpp` en `.xml`
- **Asta Powerproject** — `.pp`

**Visualisatie & samenwerking:**
- Gantt-weergave en lijstweergave; kalender- en chartweergaven.
- Filteren/zoeken op datum, resources, status; "Search thousands of schedule items or filter by date, resources or status".
- Filteren op kritieke items en het inzien van relaties/afhankelijkheden per activiteit.
- **Versievergelijking:** "Visually stack up to 5 different versions of the schedule to quickly understand the trends and changes".
- **Referenties koppelen:** "Link critical construction documents like Files, Photos, Issues, Sheets and Assets to schedule activity items" — plus RFI's, submittals en Cost-items.
- **Cost-integratie:** koppeling schedule ↔ budget voor tijdgebonden kosten en cashflowprognose.
- **Schedule Suggestions:** teamleden met rechten "Contribute" of hoger dienen wijzigingsvoorstellen in; schedule managers krijgen notificaties en zetten de status op *in review / mitigated / allowed*.
- Mobiel: activiteiten van vandaag/week/maand bekijken en doorzoeken.
- Granulaire rechten per projectlid.

**Work Plan (korte-termijnplanning / lean):**
- Losse (independent) én aan de masterplanning gekoppelde (connected) werkplannen in de cloud.
- Taken en subtaken met start/einddatum, duur, % gereed, work type, status.
- Toewijzen aan persoon, bedrijf, rol, **WBS-element** en **locatie**.
- **Handoffs** (voorgaande en volgende afhankelijkheden) tussen taken.
- Swimlane- of lijstweergave.
- **Lookaheads** van 1, 2 of 3 weken.
- **Commitments & metrics** — commitment-tracking met prestatiemeting (functioneel vergelijkbaar met PPC/Percent Plan Complete uit Last Planner). "Committed tasks are locked from unauthorized changes, while still allowing authorized replanning when needed."
- **Boundary-trigger:** waarschuwing wanneer "a connected task's dates are updated and end up falling outside the parent task's boundary".
- Autodesk positioneert dit expliciet als "Lean Construction principles in the context of the master schedule".

#### Wat er *niet* in zit — de harde conclusie

**Er zit geen netwerkplanning-engine onder de Schedule-tool.** Bewijs, in volgorde van hardheid:

1. **Autodesk's eigen blog over Schedule Suggestions is beslissend:**
   > "If the suggestion is allowed, the schedule manager makes the update in **the external schedule authoring tool** and then imports the updated version to Autodesk Build."

   Er is dus geen enkele mogelijkheid om binnen ACC een datum te wijzigen en de planning te laten doorrekenen. De doorrekening gebeurt per definitie elders.

2. **Autodesk's eigen productpagina:**
   > "Schedule Managers can upload schedules from **traditional schedule authoring software**."

3. **Autodesk's eigen blog bij de lancering:**
   > "Upload schedule data from **CPM software such as Primavera P6, ASTA PowerProject, or Microsoft Project** into Autodesk Build."
   Het CPM gebeurt in die pakketten, niet in ACC.

4. **De help-documentatie noemt nergens** critical-path-berekening, baselines, kalenderdefinities, resource-levelling of constraint-verwerking als functies van de Schedule-tool. De workflow-pagina *Schedule Management* op de leverancierssite noemt 4D-simulatie, model-planningkoppeling, kritiek pad, baselines en resourcebeheer eveneens **niet**.

5. **Een verrader in de help:** volgens *Import a Schedule* tonen P6 XML-planningen die de **longest-path-berekeningsmethode** gebruiken **alle activiteiten als niet-kritiek** in ACC. Dat kan alleen als ACC de kritiekpad-vlag *overneemt uit het importbestand* in plaats van hem zelf te berekenen. Een echte CPM-engine zou dit gewoon zelf uitrekenen. Dit is het sterkste technische bewijs dat de "critical"-markering in ACC een geïmporteerd attribuut is, geen berekend resultaat.

6. **Community-verzoeken** om geïmporteerde P6-planningen te kunnen bewerken/verwijderen ("Schedule version Edit/Delete (P6 file)") bevestigen dat de geïmporteerde planning in de praktijk read-only is.

#### Beoordeling per planningsdiscipline

| Planningsdiscipline | Aanwezig in Forma Build? | Toelichting |
|---|---|---|
| **Klassieke CPM / netwerkplanning** | ❌ **Nee** | Geen forward/backward pass, geen float-berekening, geen constraint-oplossing. Kritiek pad komt uit het importbestand. |
| **Relatietypen (FS/SS/FF/SF), lead/lag** | ⚠️ Alleen weergave | Relaties zijn zichtbaar per activiteit; ACC berekent er niets mee. In Work Plan bestaan "handoffs" als lichte voorganger/opvolger-koppelingen zonder doorrekening. |
| **Kalenders** | ❌ Geen engine | Geen configureerbare projectkalenders/werktijdregels als rekenobject. Kalenderdata komt mee uit het importbestand voor weergave. |
| **Resources** | ⚠️ Beperkt | Filteren op resources; toewijzen van personen/bedrijven/rollen in Work Plan. **Geen resource-histogram, geen levelling, geen resource-gedreven duurberekening.** |
| **Baselines** | ⚠️ Surrogaat | Geen formele baseline-functionaliteit. Wél versie-stacking (max. 5 versies) om trends te zien — nuttig, maar geen baseline-variantieanalyse in de zin van P6/Asta. |
| **Locatiegebaseerd / flowline / LBMS** | ❌ Nee | Er is een `Location`-attribuut om taken aan te hangen, maar geen flowline-/tijd-wegdiagram, geen locatie-gebaseerde doorrekening (geen Vico/Tilos/Spider-equivalent). |
| **Takt planning** | ❌ Nee | Geen takt-zones, geen takt-tijdberekening. |
| **Lean / pull planning** | ✅ **Ja, redelijk sterk** | Work Plan met swimlanes, handoffs, lookaheads, commitments en metrics. Dit is het functioneel *sterkste* planningsonderdeel van het pakket. |
| **4D-simulatie** | ❌ **Niet in ACC/Forma Build** | 4D zit bij Autodesk in **Navisworks TimeLiner** (desktop), dat een model koppelt aan een *externe* planning. Zie 2.3. |
| **Monte Carlo / risicoanalyse** | ❌ Nee | Geen probabilistische planning. |
| **Verdiende waarde (EVM)** | ⚠️ Indirect | Via Cost-integratie is cashflowprognose mogelijk; geen echte EVM-engine (geen BCWP/BCWS/CPI/SPI). |

**Samengevat:** de Schedule-tool is een **planning-viewer met een collaboratieschil en een lean-korte-termijnplanner erop**. Als "planningsdiepte" wordt gemeten aan CPM-vermogen, scoort dit pakket vrijwel nul. Als het wordt gemeten aan *distributie en contextualisering* van een elders gemaakte planning, scoort het uitstekend.

### 2.3 4D: waar Autodesk het wél doet — en de gaten daarin

Autodesk's 4D-verhaal loopt **niet** via ACC/Forma Build, maar via **Navisworks Manage/Simulate + TimeLiner** (desktop):
- TimeLiner "enables you to link your model to an external construction schedule for visual time and cost based planning".
- Werkstroom: Revit-model → Navisworks (NWC/NWD) → TimeLiner koppelt taken aan objecten, o.a. via Search Sets en "Auto-Attach Using Rules" op Revit-parameters.
- Geplande vs. werkelijke datums vergelijkbaar; kosten aan taken toewijsbaar.
- Modellen én ruwe planningsbestanden kunnen in ACC worden opgeslagen als CDE, maar de 4D-koppeling zelf gebeurt lokaal in Navisworks.

**Gaten:** de 4D-koppeling is een desktopbestand (NWD/NWF), geen cloudobject; hij is niet gedeeld/gelijktijdig bewerkbaar; en de koppeling model↔planning leeft **buiten** ACC's Schedule-tool. Er is dus geen doorlopende keten van ACC-Schedule naar 4D. Vergeleken met **Bentley SYNCHRO 4D** — dat planning-authoring, CPM en 4D in één product combineert — is Autodesk's 4D-aanbod fragmentarisch en verouderd van architectuur.

Navisworks Manage zit in de bundel *Forma for Model Management*.

### 2.4 Platform en schaalbaarheid

- **Architectuur:** multi-tenant cloud-SaaS; webclient + iOS/Android-app (de ACC Mobile App heet sinds maart 2026 "Autodesk Forma"). Desktop Connector voor bestandssynchronisatie.
- **Datacenters/regio's:** regionale dataopslag (o.a. VS, EU, AUS); de rebrand bracht "no regional storage changes".
- **Schaal:** bewezen op zeer grote programma's; Autodesk bracht in februari 2026 een AI-module voor voortgangsregistratie (as-built vs. BIM) uit die gericht is op projecten boven **$500 mln**.
- **Gerapporteerde knelpunten:** reviewers melden "occasional syncing issues or slow performance may occur with large projects" en een "laggy" mobiele app.
- **Offline:** beperkt; reviewers noemen "reliance on internet connectivity" als nadeel. PlanGrid-erfenis geeft de veldtekeningen wel enige offline-capaciteit.

---

## 3. Prijzen

### 3.1 Het licentiemodel

- **Per benoemde gebruiker** (named user), jaarabonnement — het dominante model voor Forma Build.
- **Onbeperkte gebruikers per account/project** ("Unlimited Users") — offerte op maat; het model dat grote GC's meestal nemen zodat onderaannemers gratis kunnen meedoen.
- **Historisch: sheet-/projectlimieten** — oudere Build-tiers werden begrensd op aantal sheets (550 / 5.000 / onbeperkt) en aantal projecten.
- **Bundels** — *Forma for Preconstruction*, *Forma for Model Management*, *Forma for Construction Operations*; alle drie met "Get a Quote".
- Autodesk beschrijft het zelf als "flexible user, project, and account-based pricing".
- Retourbeleid: 30 dagen bij jaar-/meerjarenabonnement, 15 dagen bij maandabonnement.
- Gratis proefversie beschikbaar, geen creditcard vereist; geen gratis versie.

### 3.2 Bedragen

> **De officiële prijspagina (`construction.autodesk.com/pricing/`, geraadpleegd 25 juli 2026) toont géén enkel bedrag** — alleen bundels met "Get a Quote"/"Learn More". Ook `autodesk.com/products/forma-build/buy` rendert de prijstabel client-side en levert bij ophalen geen bedragen. Alle onderstaande cijfers zijn daarom **derdenbronnen**.

#### Forma Build / Autodesk Build

| Variant | Bedrag | Valuta/termijn | Bron | Geraadpleegd | Status |
|---|---|---|---|---|---|
| Forma Build — per gebruiker, maandelijks | **$165** | USD / gebruiker / maand | Capterra (prijspagina Autodesk Build) | 25-07-2026 | [DERDENBRON] |
| Forma Build — per gebruiker, maandelijks | **$175** | USD / gebruiker / maand | SoftwareConnect | 25-07-2026 | [DERDENBRON] |
| Forma Build — per gebruiker, **jaarlijks gefactureerd** | **$117** | USD / gebruiker / maand ≈ **$1.404/jr** | SoftwareConnect | 25-07-2026 | [DERDENBRON] |
| **Forma Build Essentials** (nieuw, mrt 2026) | **$100** | USD / maand, één gebruiker | SoftwareConnect | 25-07-2026 | [DERDENBRON] |
| Build — 550 sheets, 1–2 projecten | **$700** | USD / gebruiker / jaar | ITQlick / SelectHub | 25-07-2026 | [LIJSTPRIJS-INDICATIE, mogelijk verouderd] |
| Build — 5.000 sheets | **$1.225** | USD / gebruiker / jaar | ITQlick / SelectHub | 25-07-2026 | [LIJSTPRIJS-INDICATIE, mogelijk verouderd] |
| Build — onbeperkt sheets | **$2.285** | USD / gebruiker / jaar | ITQlick / SelectHub | 25-07-2026 | [LIJSTPRIJS-INDICATIE, mogelijk verouderd] |
| Onbeperkt gebruikers | offerte op maat | — | Capterra / SoftwareConnect | 25-07-2026 | [DERDENBRON] |

#### Overige Forma-modules

| Product | Bedrag | Termijn | Bron | Status |
|---|---|---|---|---|
| Forma Data Management (Autodesk Docs) | **$500** | USD / gebruiker / jaar | G2 (via zoekresultaat) | [DERDENBRON] |
| Autodesk Docs (afwijkende opgave) | **$745** | USD / gebruiker / jaar | reseller-bron | [DERDENBRON — conflicteert met bovenstaande] |
| BIM Collaborate (niet-Pro) | **$705** | USD / gebruiker / jaar | G2 (via zoekresultaat) | [DERDENBRON] |
| Forma Design Collaboration (BIM Collaborate **Pro**) | **$1.284** | USD / gebruiker / jaar | reseller (Autodesk-partner) | [DERDENBRON] |
| BIM Collaborate Pro (afwijkende opgave) | vanaf **$900** | USD / jaar | Novedge | [DERDENBRON — conflicteert] |
| Forma Takeoff | **$1.250** | USD / gebruiker / jaar | G2 (via zoekresultaat) | [DERDENBRON] |
| Autodesk Forma portfolio, bandbreedte | **$500 – $1.625** | USD / jaar, afhankelijk van plan | G2 pricing 2026 | [DERDENBRON] |

#### Lokale valuta

- **EUR:** er is **geen publieke, officiële EUR-lijstprijs** gevonden. `construction.autodesk.eu` redirect sinds de rebrand naar `autodesk.com/eu/products/forma-build/buy`, waar de prijstabel client-side rendert. Het Duitse reviewplatform **OMR** vermeldt letterlijk: *"The provider does not communicate any price information"* — de daar getoonde €9/€29-tiers zijn **sjabloon-placeholders van OMR zelf, géén Autodesk-prijzen**. Niet gebruiken.
- **[SCHATTING]** Op basis van Autodesk's gangbare EU-opslag (ruwweg pariteit USD↔EUR met 5–15% opslag) komt Forma Build per benoemde gebruiker in de EU indicatief uit op **€1.300 – €1.700 per gebruiker per jaar**. Dit is een afgeleide schatting, geen gepubliceerde prijs.

#### Implementatiekosten (vaak onderschat)

- **Implementatieduur: 3 tot 6 maanden**, met toegewijde IT-resources.
- "Onboarding often requires a third-party consultant" — er is geen consultant-vrij onboardingpad.
- Totale kosten omvatten "implementation, training, and integrations" bovenop licenties.
- Prijs schaalt mee met bouwvolume, wat het duur maakt voor groeiende organisaties.
- **[SCHATTING]** Voor een middelgrote GC met 50–150 gebruikers is een eenmalige implementatie-/trainingspost van **€25.000 – €120.000** realistisch, sterk afhankelijk van integraties en datamigratie.

### 3.3 Waarschuwing bij prijsvergelijking

De cijfers uit derdenbronnen lopen fors uiteen ($117 vs. $165 vs. $175 per gebruiker/maand; Docs $500 vs. $745). Twee oorzaken:
1. **Autodesk verkoopt hoofdzakelijk via offerte en resellers**, met kortingen op volume, meerjarigheid en Enterprise Business Agreements (EBA). Lijstprijs ≠ betaalde prijs.
2. **Verouderde tiernamen circuleren nog.** Enkele aggregators tonen tiers "Nailgun ($39/mnd)", "Dozer ($59/mnd)" en "Crane ($119/mnd)" — dat zijn **historische PlanGrid-abonnementsnamen**, geen actuele Forma Build-tiers. Ze zijn hier bewust *niet* in de hoofdtabel opgenomen.

Reviewers waarderen "value for money" niettemin relatief hoog (Capterra 4,3/5 op prijs-kwaliteit; SoftwareFinder 9/10), terwijl tegelijk "expensive for smaller businesses" en "pricing is opaque" structureel terugkeren.

---

## 4. VOORDELEN

1. **Ongeëvenaarde koppeling tussen ontwerp-BIM en uitvoering.** Omdat Revit, Civil 3D, AutoCAD en Navisworks van dezelfde leverancier komen, is de weg van model naar bouwplaats korter en betrouwbaarder dan bij welke concurrent ook. ACC "bridges the gap between design and construction more effectively than any other platform". Voor BIM-gedreven organisaties is dit het beslissende argument.

2. **Eén samenhangende CDE met echt goed documentbeheer.** Sheets, versiebeheer, markups, issues en RFI's zitten in dezelfde omgeving als de modellen. Reviewers noemen dit consistent als sterkste punt: "Document management is so easy and the range of tools designed specifically for architecture and construction is impressive."

3. **De Schedule-tool ontsluit de planning voor mensen die nooit P6 openen.** Dit is het werkelijke probleem dat de tool oplost: de planning uit P6/MSP/Asta wordt doorzoekbaar, filterbaar en mobiel beschikbaar voor uitvoerders en onderaannemers, zonder P6-licentie of -training. Dat is een reële en onderschatte waarde.

4. **Rijke contextualisering van planningsactiviteiten.** Aan elke activiteit kunnen Files, Photos, Issues, Sheets, Assets, RFI's, submittals en Cost-items worden gehangen. Geen enkel klassiek planningspakket (P6, MSP, Asta) biedt dit niveau van koppeling met werkelijke projectdocumentatie.

5. **Solide lean/korte-termijnplanning (Work Plan).** Swimlanes, handoffs, 1/2/3-weeks lookaheads, commitments met prestatiemetriek, en een boundary-trigger die waarschuwt als een gekoppelde taak buiten de moeder-activiteit valt. Dit is functioneel het volwassenste planningsonderdeel van het pakket en dekt de Last-Planner-achtige werkwijze goed af.

6. **Planning ↔ kosten in één keten.** De koppeling met Cost Management levert tijdgebonden kostenplanning en **cashflowprognose** op projectniveau — een integratie die je bij losse planningspakketten zelf moet bouwen.

7. **Versievergelijking als praktisch trendinstrument.** Tot vijf planningsversies visueel over elkaar stapelen geeft snel inzicht in schuif- en trendgedrag, zonder formele baseline-analyse.

8. **Bewezen schaalbaarheid en financiële soliditeit.** AECO-omzet van $3,58 mrd (+22% in FY26) en $2,4 mrd vrije kasstroom betekenen dat dit product de komende tien jaar zeker blijft bestaan en doorontwikkeld wordt — voor een 10-jarig bouwproject een reëel selectiecriterium. In februari 2026 verscheen bovendien een AI-voortgangsmodule voor projecten >$500 mln.

9. **Breed, volwassen partner- en kennisecosysteem.** Wereldwijd resellernetwerk, Autodesk University-materiaal, een grote implementatiepartnermarkt en een omvangrijke community — beschikbaarheid van kennis en personeel is zelden een probleem.

10. **Sterke governance en rechtenstructuur.** Granulaire permissies per project en per tool, regionale dataopslag, en auditeerbaarheid — vereisten die opdrachtgevers in gereguleerde sectoren (zorg, overheid, datacenters) stellen.

---

## 5. NADELEN

1. **Er zit geen planning-engine in — dit is geen planningssoftware.** De Schedule-tool kan geen enkele datum doorrekenen. Autodesk's eigen documentatie schrijft voor dat wijzigingen "in the external schedule authoring tool" worden gemaakt en daarna opnieuw geïmporteerd. Je hebt dus **altijd** een aparte P6-, MSP- of Asta-licentie nodig; ACC is een extra kostenpost bovenop je planningspakket, geen vervanging ervan.

2. **De kritiekpad-markering wordt geïmporteerd, niet berekend — en gaat aantoonbaar mis.** De help vermeldt dat P6 XML-planningen met de longest-path-berekeningsmethode in ACC **alle activiteiten als niet-kritiek** tonen. Een planner die in ACC naar het kritieke pad kijkt, kan dus stil een volledig fout beeld krijgen. Dat is een veiligheidsrisico voor besluitvorming, niet slechts een ongemak.

3. **Eenrichtingsverkeer: geen round-trip naar P6/MS Project.** Er is geen gedocumenteerde export van planningsdata terug naar XER, MPP of MSPDI. Werk dat in Work Plan wordt gedaan — commitments, werkelijke voortgang, herplanning door uitvoerders — vloeit **niet** terug naar de masterplanning. De planner moet handmatig overtypen. Dit is het grootste operationele bezwaar in de praktijk.

4. **Geen Schedule-API en geen Workplan-API.** In de volledige APS/ACC-API-catalogus ontbreekt elke scheduling-API. Een community-verzoek stelt letterlijk: "The potential of Workplan is limited by the lack of any accessible APIs and webhooks." Planningsdata die in ACC zit, is programmatisch niet te ontsluiten. Voor integratiepartijen en voor dit onderzoek is dat een hard blok.

5. **Fragmentarische architectuur — "aan elkaar geknoopte overnames".** Reviewers verwoorden het scherp: ACC is "a collection of acquired tools stitched together, not one unified system" en "different modules feel like different products (because they basically are)". Gevolg: inconsistente UX, dubbele concepten en verschillende datamodellen tussen BIM 360-, PlanGrid- en Assemble-erfenis.

6. **Trage productontwikkeling.** "Product iteration moves slowly" doordat Autodesk legacy-architectuur over meerdere overgenomen producten moet onderhouden. Voor een tool die in 2022 werd gelanceerd en in 2026 nog steeds geen rekenkern of API heeft, is dat empirisch zichtbaar.

7. **Zware, dure implementatie.** Drie tot zes maanden, toegewijde IT-resources, en "onboarding often requires a third-party consultant" — er is geen consultant-vrij pad. Voor GC's met $20M–$150M jaaromzet weegt die overhead volgens reviewanalyse vaak niet op tegen de baten.

8. **Ondoorzichtige en hoge prijsstelling.** Autodesk publiceert geen prijzen; G2 constateert "does not publish pricing publicly". De prijs schaalt mee met bouwvolume. Reviewers: "the price has been tough to swallow", "expensive for smaller businesses", "worth the investment but not affordable". Bij een modulair model stapelen Docs + Build + Takeoff + BIM Collaborate Pro snel op tot vier- tot vijfduizend dollar per gebruiker per jaar.

9. **Veldbruikbaarheid blijft achter bij het kantoor.** "Field tools feel like they were built for the office"; "superintendents who just want to pull up a drawing and log a note shouldn't need a training session". Meerdere bronnen melden dat velduitvoerders het platform mijden omdat het te ingewikkeld is. De mobiele app wordt beschreven als "laggy".

10. **Prestatie- en flexibiliteitsklachten.** "Occasional syncing issues or slow performance may occur with large projects"; beperkte maatwerkmogelijkheden in rapporten en formulieren; "rigid predefined workflows" die lastig aan te passen zijn aan afwijkende projectbehoeften; een permissiesysteem dat als "overly complex" wordt ervaren; autopublish alleen wekelijks; en ingediende inspectieformulieren die zelfs door de indiener niet heropend kunnen worden.

11. **Geen locatiegebaseerde planning, geen takt, geen 4D in het platform.** Voor woningbouw, renovatie en repetitieve bouw — waar flowline/LBMS en takt de facto de beste methodes zijn — biedt ACC niets. 4D vereist een aparte Navisworks-desktoplicentie en levert een bestandsgebonden, niet-gedeelde koppeling op.

---

## 6. Interoperabiliteit — en de openheidsbeoordeling voor een IFC-gebaseerde open-source planner

### 6.1 Formaatmatrix

| Formaat | Import | Export | Opmerking |
|---|---|---|---|
| **Primavera P6 XER** (`.xer`) | ✅ | ❌ | Help waarschuwt: "Importing XER files may cause issues with non-English characters. Using the XML files is preferable." Voor Nederlandse/Duitse activiteitomschrijvingen met diakrieten is dit een reëel probleem. |
| **Primavera P6 XML** (`.xml`) | ✅ | ❌ | **"Only XML Schema Version 20.12 is supported."** Eén enkele schemaversie — zeer restrictief. Longest-path-planningen verliezen hun kritiekpad-markering. |
| **MS Project MPP** (`.mpp`) | ✅ | ❌ | Binair, proprietary formaat. |
| **MS Project XML / MSPDI** (`.xml`) | ✅ | ❌ | — |
| **Asta Powerproject** (`.pp`) | ✅ | ❌ | Opvallend en positief: weinig platforms lezen `.pp` native. Sterk voor de Britse markt. |
| **CSV / Excel** (planningsdata) | ❌ niet gedocumenteerd | ❌ | Geen gedocumenteerde CSV-route voor planningen. (Wel CSV/Excel voor andere modules zoals Cost en Assets.) |
| **IFC — geometrie** (IFC2x3 / IFC4) | ✅ | ⚠️ beperkt | IFC-bestanden zijn te uploaden naar Docs, te bekijken, te aggregeren in Design Collaboration en in Revit te linken via Desktop Connector. Dit is **modelgeometrie**. |
| **IFC 4.3 — `IfcWorkSchedule` / `IfcTask` / `IfcWorkPlan`** | ❌ **Nee** | ❌ **Nee** | **Geen enkele ondersteuning gevonden, in geen enkele bron.** ACC/Forma Build kent het IFC-planningsdomein niet. Autodesk's IFC 4.3-inspanningen zitten in **Civil 3D** (infra-geometrie: wegen, spoor, bruggen) — dus in het geometriedomein, niet in het planningsdomein. |
| **BCF** | ⚠️ niet native gedocumenteerd | ⚠️ | ACC Issues is een proprietary issue-model. BCF-uitwisseling loopt in de praktijk via derden (BIMcollab, Solibri en vergelijkbare connectoren). **[Niet geverifieerd in officiële Autodesk-documentatie tijdens dit onderzoek.]** |
| **API's (APS/Forge)** | ⚠️ deels | ⚠️ | Zie 6.2. |

### 6.2 API's: breed platform, planning-gat

Autodesk Platform Services (APS, voorheen Forge) is een serieus ontwikkelplatform. Beschikbare API's voor ACC/Forma omvatten Data Management, Model Derivative, Viewer, Webhooks, Data Exchange, Parameters, Automation, plus ACC-specifieke API's voor Account Admin, Issues, RFI's, Document Management, Model Coordination en meer. Er is een Data Connector om data naar BI-tools te trekken.

**Maar:** in geen enkele geraadpleegde API-index — noch de APS Forma-overzichtspagina, noch de ACC-API-referentie — komt een **Schedule API** of **Workplan API** voor. Dit is bevestigd via twee onafhankelijke fetches en een community-feature-request die precies dit gemis aankaart.

**Gevolg:** planningsdata die je in ACC importeert, kun je er programmatisch niet weer uithalen. ACC is voor planningsdata een **data-eindstation**.

### 6.3 Openheidsbeoordeling — expliciet vanuit het perspectief van de opdrachtgever

De opdrachtgever bouwt een open-source, IFC-gebaseerde planner. Oordeel per dimensie:

| Dimensie | Score | Onderbouwing |
|---|---|---|
| **Openheid planningsdata (in)** | 🟡 **Redelijk** | XER, P6 XML, MPP, MSPDI en `.pp` worden gelezen. Dat is een breed importpalet. |
| **Openheid planningsdata (uit)** | 🔴 **Gesloten** | Geen enkele gedocumenteerde planning-export. Wat erin gaat, komt er niet uit. |
| **API-toegang tot planning** | 🔴 **Gesloten** | Geen Schedule-/Workplan-API, geen webhooks op planningsobjecten. |
| **IFC-planningsdomein** | 🔴 **Afwezig** | `IfcWorkSchedule`, `IfcTask`, `IfcWorkPlan`, `IfcTaskTime` worden niet ondersteund, niet gelezen en niet geschreven. |
| **IFC-geometriedomein** | 🟢 **Goed** | IFC-upload, -weergave, -aggregatie en Revit-koppeling werken; Autodesk is mede-oprichter van buildingSMART en zit in de strategic advisory council. |
| **Bestandsformaat als bron** | 🔴 **Gesloten** | Het canonieke datamodel is Autodesk's clouddatabase; er is geen open, zelfbeschrijvend projectbestand. |
| **Zelf te hosten / on-premises** | 🔴 **Niet mogelijk** | Uitsluitend Autodesk-cloud. |
| **Licentie** | 🔴 **Proprietary** | Gesloten broncode, abonnementsplicht. |

**Netto: ACC/Forma is voor het planningsdomein een gesloten systeem met een open voordeur en geen achterdeur.**

**Strategische implicatie voor een IFC-gebaseerde open-source planner:**

- **Concurrentie? Nauwelijks.** ACC is geen planningsengine en zal dat op korte termijn niet worden. Wie een echte netwerkplanner bouwt, concurreert met P6, MS Project, Asta, Spider en Bentley SYNCHRO — niet met ACC.
- **Complementariteit? Sterk — mits eenrichtingsverkeer acceptabel is.** De meest kansrijke positionering is: de open planner produceert IFC 4.3 (`IfcWorkSchedule`/`IfcTask`) **én** exporteert P6 XML (schema 20.12) of MSPDI, zodat de planning in ACC/Forma geïmporteerd kan worden voor distributie naar het veld. Dat maakt de open planner een volwaardig alternatief voor P6 *als authoring tool* binnen een ACC-werkstroom.
- **Concreet advies:** ondersteuning voor **P6 XML volgens schema 20.12** is voor een open planner een hoogwaardige, relatief goedkope interoperabiliteitswinst — het is de enige XML-schemaversie die ACC accepteert en tevens de meest robuuste route (XER geeft tekenset-problemen). Beschouw dit als de "ACC-compatibiliteitssleutel".
- **Waarschuwing:** verwacht geen data terug uit ACC. Zolang er geen Schedule-API is, kan een externe planner geen voortgang, commitments of veldmutaties uit ACC ophalen. Bouw daar geen afhankelijkheid op.
- **Marktkans:** het feit dat de grootste BIM-leverancier ter wereld in 2026 nog steeds geen planningsengine en geen IFC-planningsondersteuning heeft, laat een reëel gat open in de openBIM-planningsketen.

---

## 7. Marktpositie

### 7.1 Positie en concentratie

De top vijf leveranciers — **Oracle, Autodesk, Procore, Trimble en Bentley Systems** — namen samen circa **45% van de omzet in 2025** in de markt voor bouwmanagementsoftware. De markt is dus gematigd geconcentreerd maar competitief.

Autodesk's AECO-productfamilie ($3,58 mrd in FY26, +22%) maakt Autodesk in absolute omvang de grootste AEC-softwareleverancier ter wereld, al is dat cijfer inclusief Revit, AutoCAD en Civil 3D en dus niet gelijk aan "construction cloud"-omzet. Autodesk publiceert **geen** ACC-specifieke omzet-, gebruikers- of projectaantallen. *[Elke publieke claim over "X miljoen ACC-projecten" moet als marketing worden behandeld.]*

### 7.2 Concurrentieveld

| Concurrent | Waar sterker | Waar ACC/Forma wint |
|---|---|---|
| **Procore** (>$1 mrd omzet, ~7,4% marktaandeel, 38% internationale groei in 2025) | Pure GC-projectmanagement, financiën, veldbruikbaarheid, open marktplaats met honderden integraties, transparanter gebruiksmodel (onbeperkt gebruikers) | BIM-coördinatie, modelintegratie, ontwerp-naar-uitvoering |
| **Oracle Primavera P6 + Aconex** | **Echte CPM-engine**, project controls, resourcebeheer, risicoanalyse, megaprojecten en infrastructuur ("gold standard for document management and project controls on large-scale, high-stakes infrastructure projects") | Modelgedreven werkstromen, moderne UX, kosten voor middelgrote projecten |
| **Bentley SYNCHRO / ProjectWise** | **Geïntegreerde 4D + planning-authoring in één product**, infrastructuur, digital twins | Gebouwsector, Revit-ecosysteem, ecosysteemomvang |
| **Trimble (Tekla, Viewpoint, e-Builder)** | Constructieve staal-/betonbouw, opdrachtgeverszijde, ERP-koppeling | Ontwerpintegratie, platformbreedte |
| **Asta Powerproject (Elecosoft)** | Sterke CPM met bouw-specifieke UX, dominant in VK; ACC **leest** juist Asta-bestanden | ACC is complementair, geen concurrent |
| **Touchplan, vPlanner, Lean-specialisten** | Diepere pull-planning/Last Planner-functionaliteit | ACC's Work Plan zit in dezelfde omgeving als documenten en kosten |
| **Nichespelers locatiegebaseerd** (Tilos, Spider, Vico-erfgoed) | Flowline/LBMS, takt | ACC biedt hier niets |

### 7.3 Trend

1. **Consolidatie onder één merk.** De ACC→Forma-rebrand (maart 2026) verenigt ontwerp-, coördinatie- en uitvoeringsproducten onder één "industry cloud". Autodesk beweegt volgens Architosh "beyond file-based collaboration toward granular, cloud-native project data sharing".
2. **AI als differentiator.** Februari 2026: AI-module voor voortgangsregistratie (as-built vs. BIM) voor projecten >$500 mln. Verwacht dat Autodesk hier de komende jaren zwaar op inzet — waarschijnlijk eerder dan op een planningsengine. *[SCHATTING]*
3. **Neerwaartse marktbeweging.** Forma Build Essentials (maart 2026, indicatief $100/maand) is een duidelijke poging het mkb te bereiken, waar Procore en Buildertrend sterk staan.
4. **Planning blijft een structurele blinde vlek.** Sinds de lancering van de Schedule-tool (±2022) is er in vier jaar geen rekenkern, geen export en geen API bijgekomen. *[SCHATTING]* De kans dat Autodesk binnen 24 maanden een eigen CPM-engine levert is laag; een overname van een planningsleverancier is aannemelijker dan eigen bouw.

---

## 8. Eindoordeel

**Autodesk Build / ACC — nu Forma Build binnen Autodesk Forma — is een uitstekend bouwmanagementplatform en een zwak planningsproduct. Die twee oordelen moeten strikt gescheiden blijven.**

Als **CDE en uitvoeringsplatform** is het wereldklasse: de brug van Revit-model naar bouwplaats is korter en betrouwbaarder dan bij elke concurrent, het documentbeheer is volwassen, de governance is serieus, en de financiële positie van de leverancier (AECO $3,58 mrd, +22%; $2,4 mrd vrije kasstroom) garandeert continuïteit. Voor een BIM-gedreven hoofdaannemer of opdrachtgever is het een verdedigbare, vaak de beste keuze.

Als **planningssoftware faalt het bij de eerste toets.** Er zit geen netwerkplanning-engine onder. De Schedule-tool is een viewer met een collaboratieschil: hij importeert P6/MSP/Asta, toont Gantt, hangt er documenten en kosten aan, en biedt daarnaast een verrassend degelijke lean-korte-termijnplanner (Work Plan) met lookaheads, handoffs en commitment-metrics. Maar hij berekent geen datums, geen float en geen kritiek pad — die vlag komt uit het importbestand, en gaat bij P6-longest-path-planningen aantoonbaar mis. Autodesk's eigen documentatie schrijft voor dat elke wijziging in het externe authoring-pakket gebeurt en opnieuw wordt geïmporteerd. Wie ACC koopt, koopt geen planningspakket maar een tweede licentie bovenop P6, MS Project of Asta.

De ernstigste structurele tekortkomingen zijn **eenrichtingsverkeer** en **het ontbreken van elke API**. Werk dat in Work Plan gebeurt — precies het werk dat het dichtst bij de werkelijkheid op de bouwplaats staat — vloeit niet terug naar de masterplanning en is programmatisch niet te ontsluiten. Dat maakt ACC voor planningsdata een eindstation, en het ondermijnt de belofte van "één bron van waarheid" juist op het punt waar die het meest zou tellen.

**Voor de opdrachtgever die een open-source, IFC-gebaseerde planner bouwt, is het oordeel helder en bruikbaar:**

- ACC/Forma is **geen concurrent** — het heeft geen planningsengine en bouwt er naar alle waarschijnlijkheid ook geen.
- ACC/Forma is voor het planningsdomein **gesloten**: geen export, geen API, en **nul ondersteuning voor `IfcWorkSchedule`/`IfcTask`/`IfcWorkPlan`**. Autodesk's IFC 4.3-inspanningen zitten volledig in het geometriedomein (Civil 3D).
- De praktische integratieroute is **eenrichtingsverkeer via P6 XML, schema 20.12** — de enige XML-schemaversie die ACC accepteert, en robuuster dan XER (dat op niet-Engelse tekens stukloopt). Dit is de goedkoopste hoogwaardige interoperabiliteitswinst die een open planner kan boeken.
- Het feit dat de grootste BIM-leverancier ter wereld in 2026 geen planningsengine en geen IFC-planningsondersteuning heeft, is niet alleen een tekortkoming van Autodesk — het is een **open marktgat in de openBIM-planningsketen**.

**Score voor het doel "planningssoftware": 3/10.**
**Score voor het doel "bouwmanagement-/BIM-platform": 8,5/10.**
**Score voor "openheid van planningsdata": 2/10.**

---

## Bronnen

### Officiële Autodesk-bronnen

1. Autodesk Forma — Pricing. https://construction.autodesk.com/pricing/ (geraadpleegd 25-07-2026; toont geen bedragen, alleen "Get a Quote")
2. Autodesk — Forma Build kopen. https://www.autodesk.com/products/forma-build/buy en https://www.autodesk.com/eu/products/forma-build/buy (geraadpleegd 25-07-2026)
3. Autodesk Forma — Schedule tool. https://construction.autodesk.com/tools/schedule/ (geraadpleegd 25-07-2026)
4. Autodesk Forma — Schedule Management workflow. https://construction.autodesk.com/workflows/schedule-management/ (geraadpleegd 25-07-2026)
5. Autodesk Forma — Bauzeitplanung (DE). https://construction.autodesk.de/workflows/schedule-management/ en https://construction.autodesk.de/tools/schedule/
6. **Autodesk Help — Import a Schedule** (formaten, schema 20.12, XER-tekensetwaarschuwing, longest-path). https://help.autodesk.com/cloudhelp/ENU/Build-Schedule/files/work-schedule/Import_Schedule.html (geraadpleegd 25-07-2026)
7. **Autodesk Help — About Schedule and Workplan.** https://help.autodesk.com/cloudhelp/ENU/Build-Schedule/files/About_Schedule.html (geraadpleegd 25-07-2026)
8. Autodesk Help — Working with Schedule / Schedule Settings. https://help.autodesk.com/view/BUILD/ENU/?guid=Schedule_work en `?guid=Schedule_Settings`
9. **Autodesk Digital Builder — "Autodesk Construction Cloud Is Now Autodesk Forma: Here's What That Means for You"** (naammapping, effectieve datum). https://www.autodesk.com/blogs/construction/autodesk-construction-cloud-is-now-autodesk-forma-heres-what-that-means-for-you/ (bijgewerkt 25-03-2026)
10. **Autodesk Digital Builder — "Keep Projects on Track with the New Schedule Tool in Autodesk Build"** ("Upload schedule data from CPM software such as Primavera P6, ASTA PowerProject, or Microsoft Project"). https://www.autodesk.com/blogs/construction/autodesk-build-schedule-tool/
11. **Autodesk Digital Builder — "Have You Tried?: Schedule Suggestions"** (beslissend citaat over externe authoring tool). https://www.autodesk.com/blogs/construction/have-you-tried-schedule-suggestions/
12. Autodesk Digital Builder — "Have You Tried? Work Planning within the Schedule Tool in Forma Build". https://www.autodesk.com/blogs/construction/have-you-tried-work-planning-within-the-schedule-tool-in-autodesk-build/
13. Autodesk Digital Builder — "Have you tried it? Workplan Commitments and Metrics in Forma Build". https://www.autodesk.com/blogs/construction/have-you-tried-it-workplan-commitments-and-metrics-in-autodesk-build/
14. Autodesk Digital Builder — Construction Schedule Management Software. https://www.autodesk.com/blogs/construction/construction-schedule-management-software/
15. **Autodesk Platform Services — Forma/ACC API-overzicht** (geen Schedule-API). https://aps.autodesk.com/developer/overview/autodesk-construction-cloud (geraadpleegd 25-07-2026)
16. Autodesk Platform Services — ACC API-referentie. https://aps.autodesk.com/en/docs/acc/v1/reference/ en https://aps.autodesk.com/apis-and-services/autodesk-construction-cloud-acc-apis
17. Autodesk — BIM Interoperability / openBIM & buildingSMART. https://www.autodesk.com/uk/industry/bim/interoperability en https://www.autodesk.com/solutions/aec/bim/interoperability
18. Autodesk Help — Navisworks TimeLiner overzicht. https://help.autodesk.com/cloudhelp/2024/ENU/Navisworks-Timeliner/files/GUID-D0D36E3D-F1D0-43B6-AB4E-2E7799B340A3.htm
19. Autodesk Help — Work with IFC Files (Design Collaboration). https://help.autodesk.com/cloudhelp/ENU/Collab-Models/files/Design_Collab_IFC_Files.html
20. Autodesk Support — Workflow for linking IFCs into a cloud Revit project. https://www.autodesk.com/support/technical/article/caas/sfdcarticles/sfdcarticles/Workflow-for-incorporating-IFCs-into-a-cloud-Revit-project.html
21. Autodesk Community — "Workplan API's" (feature request; ontbrekende API's/webhooks). https://forums.autodesk.com/t5/forma-for-construction-ideas/workplan-api-s/idi-p/13912228
22. Autodesk Community — "Schedule version Edit/Delete (P6 file)". https://forums.autodesk.com/t5/acc-ideas/schedule-version-edit-delete-p6-file/idi-p/13359570
23. Autodesk — Lean Construction solutions. https://www.autodesk.com/solutions/lean-construction
24. Autodesk University — "Centralize Project Schedule Management Using Autodesk Forma Schedule" (2024). https://www.autodesk.com/autodesk-university/class/Centralize-Project-Schedule-Management-Using-Autodesk-Construction-Cloud-Schedule-2024

### Financieel / investor relations

25. **Autodesk — persbericht FY2026 Q4 en jaarcijfers** (26-02-2026): totale omzet $7.206 mln (+18%), AECO $3.583 mln (+22%), Q4 $1.957 mln (+19%), FCF $2.409 mln (+54%). https://www.prnewswire.com/news-releases/autodesk-inc-announces-fiscal-2026-fourth-quarter-results-302698740.html
26. Autodesk Investors — FY2026 Q4 & full-year results. https://investors.autodesk.com/static-files/33bd3b7b-9a3d-43e6-a7b6-1b5e9933f83a
27. Autodesk — Form 10-K FY2026 (SEC). https://www.sec.gov/Archives/edgar/data/769397/000076939726000015/adsk-20260131.htm
28. Investing.com — Autodesk Q4 FY26 slides. https://www.investing.com/news/company-news/autodesk-q4-fy26-slides-strong-earnings-beat-54-cash-flow-surge-93CH-4530277

### Overnames en historie

29. Autodesk — Completes PlanGrid Acquisition ($875 mln). https://investors.autodesk.com/news-releases/news-release-details/autodesk-completes-plangrid-acquisition
30. Autodesk News — To Acquire PlanGrid. https://adsknews.autodesk.com/en/pressrelease/autodesk-to-acquire-plangrid/
31. Construction Dive — Autodesk integrates BuildingConnected with PlanGrid ($275 mln netto van cash). https://www.constructiondive.com/news/autodesk-integrates-buildingconnected-with-plangrid/561218/
32. Construction Dive — Autodesk completes Pype acquisition. https://www.constructiondive.com/news/autodesk-acquires-pype-for-its-growing-contech-cloud/582085/
33. Autodesk News — To Acquire ProEst. https://adsknews.autodesk.com/en/pressrelease/autodesk-to-acquire-cloud-based-estimating-company-proest/
34. Engineering.com — Autodesk to expand AEC digital transformation with Payapps acquisition. https://www.engineering.com/autodesk-to-expand-aec-digital-transformation-with-payapps-acquisition/
35. Construction Digital — Autodesk Build launches schedule management tool. https://constructiondigital.com/technology-and-ai/autodesk-build-launches-schedule-management-tool

### Rebrand-analyse (derden)

36. **Architosh — "Autodesk Construction Cloud (ACC) is now Autodesk Forma"** (31-03-2026; IDC-commentaar Jeffrey Hojlo; Forma Build Essentials). https://architosh.com/2026/03/autodesk-construction-cloud-acc-is-now-autodesk-forma/
37. Eagle Point Software — ACC Rebrands to Autodesk Forma. https://eaglepoint.com/blog/autodesk-construction-cloud-rebrands-to-autodesk-forma/
38. Graitec — ACC changes its name to Autodesk Forma. https://graitec.com/ca-en/blog/autodesk-construction-cloud-changes-its-name-to-autodesk-forma/
39. ARKANCE — Autodesk Forma & Autodesk Construction Cloud. https://arkance.world/global/resources/read/product-updates/autodesk-forma-autodesk-construction-cloud
40. CADnotes — Autodesk Forma: One Platform to Rule the AEC Lifecycle. https://www.cad-notes.com/autodesk-forma-one-platform-to-rule-the-aec-lifecycle/

### Prijsbronnen (derden)

41. **Capterra — Autodesk Build Pricing** ($165/gebruiker/maand; gratis proef). https://www.capterra.com/p/255145/Autodesk-Build/pricing/ (geraadpleegd 25-07-2026)
42. **SoftwareConnect — Autodesk Forma Build reviews & pricing** (Essentials $100/mnd; $175/gebruiker/mnd; $117/gebruiker/mnd jaarlijks). https://softwareconnect.com/reviews/autodesk-build/ (geraadpleegd 25-07-2026)
43. G2 — Autodesk Forma (formerly ACC) Pricing 2026 ($500–$1.625; Docs $500/jr; BIM Collaborate $705/jr; Takeoff $1.250/jr). https://www.g2.com/products/autodesk-forma-formerly-autodesk-construction-cloud/pricing
44. TrustRadius — Autodesk Build Pricing 2026. https://www.trustradius.com/products/autodesk-build/pricing
45. ITQlick — Autodesk Build pricing ($700 / $1.225 / $2.285 per jaar naar sheet-tier). https://www.itqlick.com/autodesk-build/pricing
46. SelectHub — Autodesk Build reviews, pricing & features. https://www.selecthub.com/p/construction-management-software/autodesk-build/
47. **OMR (DE) — Autodesk Construction Cloud pricing** ("The provider does not communicate any price information"; getoonde €9/€29 zijn sjabloon-placeholders). https://omr.com/en/reviews/product/autodesk-construction-cloud/pricing
48. Softabase — ACC Pricing 2026: Plans, Costs & Hidden Fees. https://softabase.com/pricing/autodesk-construction-cloud
49. Contractors & Builders — ACC Pricing 2026. https://contractorsandbuilders.com/pricing/autodesk-acc/
50. Vendr — Autodesk Software Pricing & Plans 2026. https://www.vendr.com/marketplace/autodesk
51. Novedge — BIM Collaborate Pro subscription (vanaf $900/jr). https://novedge.com/products/buy-bim-collaborate-pro-subscription
52. Bimeco — ACC vs BIM Collaborate Pro vs Autodesk Docs: pricing & comparison. https://www.bim.com.sg/blog/bim-collaborate-vs-pro/
53. ICN (NL) — Autodesk Construction Cloud. https://icn.nl/autodesk-construction-cloud/
54. Autodesk NL — Cloudservices/subscription. https://www.autodesk.com/nl/subscription/cloud-services

### Reviews en kritiek

55. **Constructable — ACC Reviews, Pricing and Alternatives** (april 2026; "collection of acquired tools stitched together"; implementatie 3–6 maanden; veldbruikbaarheid; $20M–$150M-segment). https://constructable.ai/blog/autodesk-construction-cloud-reviews-pricing-alternatives
56. **SoftwareFinder — ACC Review: Pros, Cons & Features 2026** (4,6/5 uit 28 reviews; permissiesysteem, autopublish, formulieren). https://softwarefinder.com/construction/autodesk-construction-cloud/reviews
57. Capterra — Autodesk Forma / ACC Reviews 2026. https://www.capterra.com/p/218046/Autodesk-Construction-Cloud/reviews/
58. Capterra UK — Autodesk Build Pricing, Cost & Reviews. https://www.capterra.co.uk/software/1032637/autodesk-build
59. Capterra DE — Autodesk Construction Cloud Erfahrungen, Vor- und Nachteile. https://www.capterra.com.de/software/218046/autodesk-construction-cloud
60. GetApp DE — Autodesk Construction Cloud Bewertungen. https://www.getapp.de/reviews/104519/autodesk-construction-cloud
61. G2 — ACC Vor- und Nachteile (pros & cons). https://www.g2.com/products/autodesk-construction-cloud/reviews?qs=pros-and-cons
62. AKG Software (DE) — ACC-Whitepaper. https://www.akgsoftware.com/wp-content/uploads/2025/05/ACC-Whitepaper.pdf
63. SourceForge — Autodesk Build Reviews 2026. https://sourceforge.net/software/product/Autodesk-Build/

### Markt en concurrentie

64. Mordor Intelligence — Construction Management Software Market Size & Growth Trends 2026–2031 (top-5 ≈ 45% van omzet 2025). https://www.mordorintelligence.com/industry-reports/construction-management-software-market
65. OpenPR — Construction Management Software Market Strategic Outlook 2026–2033. https://www.openpr.com/news/4501086/construction-management-software-market-strategic-outlook
66. SelectHub — Procore vs Aconex 2026. https://www.selecthub.com/construction-management-software/procore-vs-aconex/
67. Dan Cumberland Labs — Construction Technology Companies: The Vendors Reshaping AEC. https://dancumberlandlabs.com/blog/construction-technology-companies/
68. StockTitan — "Powerful New Advancements Strengthen Autodesk Construction..." https://www.stocktitan.net/news/ADSK/powerful-new-advancements-strengthen-autodesk-construction-7oy8y21kzn19.html

### IFC-referentie

69. buildingSMART — IFC 4.3.2 `IfcWorkSchedule`. https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm
70. buildingSMART — IFC 4.3 `IfcTask`. http://www.bim-times.com/ifc/IFC4_3/buildingsmart/IfcTask.htm
71. buildingSMART — IFC 4.3 `IfcWorkPlan`. http://www.bim-times.com/ifc/IFC4_3/buildingsmart/IfcWorkPlan.htm
72. Autodesk Blog — What's new in openBIM and Infrastructure: IFC 4.3 for Civil 3D. https://www.autodesk.com/blogs/aec/2023/05/12/whats-new-in-openbim-and-infrastructure-ifc-4-3-for-civil-3d/
73. Autodesk IFC Manual — IFC 4.3 Support (Civil 3D). https://autodesk.ifc-manual.com/civil3d/ifc-4.3-support
74. IfcOpenShell — `construction_scheduling_task.ifc` voorbeeldbestand. https://github.com/IfcOpenShell/files/blob/master/construction_scheduling_task.ifc

---

## Bijlage A — Expliciete markering van schattingen

De volgende uitspraken in dit profiel zijn **schattingen of afleidingen**, niet uit primaire bronnen bevestigd:

| # | Uitspraak | Basis |
|---|---|---|
| 1 | Regionale verspreiding (NA sterkst; VK/DACH/Benelux/Nordics substantieel; groei in APAC/Midden-Oosten) | Afgeleid uit Autodesk's lokale domeinen, kanaalstructuur en de FY26-uitspraak over "emerging markets" |
| 2 | EU-prijsindicatie **€1.300–€1.700 per gebruiker per jaar** voor Forma Build | Afgeleid van USD-derdenbronnen + gangbare Autodesk EU-opslag; **geen gepubliceerde prijs** |
| 3 | Implementatiekosten **€25.000–€120.000** voor 50–150 gebruikers | Afgeleid van de gedocumenteerde 3–6 maanden doorlooptijd en consultant-afhankelijkheid |
| 4 | Lanceringsjaar Schedule-tool "±2022" | Niet exact gedateerd in de geraadpleegde bronnen |
| 5 | Lage kans op een eigen Autodesk-CPM-engine binnen 24 maanden; overname aannemelijker | Analistenoordeel op basis van vier jaar stilstand in het planningsdomein |
| 6 | AI-investering krijgt prioriteit boven planningsengine | Analistenoordeel op basis van de AI-release van feb 2026 |

Daarnaast is één punt **niet geverifieerd**: de mate van **native BCF-ondersteuning** in ACC/Forma. In de geraadpleegde officiële documentatie is geen native BCF-import/-export voor ACC Issues aangetroffen; in de praktijk verloopt BCF-uitwisseling via derde partijen. Dit verdient bij een vervolgonderzoek een gerichte controle.

## Bijlage B — Terminologie-waarschuwing voor het vervolgonderzoek

Bij het samenvoegen van dit profiel met andere profielen: let op dat **"Forma"** in Autodesk-materiaal van vóór maart 2026 verwijst naar het conceptontwerp-/haalbaarheidsproduct (nu **Forma Site Design**), en in materiaal van ná maart 2026 naar het **hele platform**. Bronnen die "Autodesk Forma" en "Autodesk Construction Cloud" als twee verschillende producten naast elkaar zetten, dateren van vóór de rebrand. Dit is een reële bron van verwarring in vrijwel alle actuele derdenbronnen.
