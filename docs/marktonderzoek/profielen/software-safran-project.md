# Safran Project (Safran Software Solutions)

*Profiel opgesteld: 25 juli 2026. Alle webbronnen geraadpleegd op 25 juli 2026.*

> **Naamsverwarring vooraf.** "Safran" is óók de naam van de Franse beursgenoteerde lucht- en ruimtevaartgroep (Safran S.A., CFM-motoren). Die twee hebben **niets** met elkaar te maken. Dit profiel gaat over **Safran Software Solutions AS** uit Stavanger, Noorwegen (safran.com). Een groot deel van de zoekresultaten op "Safran" gaat over de Franse groep; dat vertroebelt marktonderzoek, recruitment en zelfs de vindbaarheid van het product zelf — een reëel commercieel nadeel voor de leverancier.

---

## 1. Wat het is

### Leverancier en historie

| | |
|---|---|
| **Leverancier** | Safran Software Solutions AS |
| **Hoofdkantoor** | Stavanger, Noorwegen; kantoren o.a. in het VK, VS/Canada, Midden-Oosten, Australië |
| **Opgericht** | 1997 — onafhankelijk bevestigd: Enhetsregisteret org.nr **879388252**, registratiedatum **16-12-1997**, Stavanger, NACE 58.290 |
| **Omvang** | **29 werknemers** volgens het Noorse Enhetsregisteret (data.brreg.no) — een klein softwarebedrijf, geen enterprise-leverancier van P6-formaat |
| **Eigendom** | Onderdeel van **JDM Technology Group** (Canada/internationaal), overname aangekondigd **eind september / begin oktober 2021** (bronnen lopen uiteen: PR Newswire 30-09, Silverpeak 01-10, EV Private Equity 04-10-2021) |
| **Eerdere eigenaar** | PE-fonds **Progressus** (via EV Private Equity), meerderheidsbelang sinds 2012 |
| **Certificering** | ISO 9001; profileert zich als "Carbon Neutral Plus" |
| **CEO ten tijde van overname** | Richard Wood (bleef aan) |

Het bedrijf begon met het ondersteunen van de Noorse olie- en gassector. Een van de eerste grote klanten was **Aker Kværner** (nu Aker Solutions), dat Safran koos voor de engineering- en constructieplanning van topsides voor Statoil (nu Equinor). Onder Progressus (2012→2021) is de portfolio verbreed (Safran Risk, cloud, web-companions) en is geografisch uitgebreid buiten Noorwegen. Sinds 2021 zit Safran in JDM Technology Group, een verzameling bouw-/projectsoftwarebedrijven (o.a. Explorer Software, Spearhead Software) — een "buy-and-hold"-groep, geen VC-achtige groeispeler. *Inschatting: het JDM-eigenaarschap wijst op een stabiel-cash-flow-regime met incrementele productontwikkeling, niet op agressieve herbouw van het platform.*

### Productfamilie

| Product | Rol |
|---|---|
| **Safran Project** | Vlaggenschip: enterprise planning, scheduling, kosten, EVM, wijzigingsbeheer, portfolio. Database-gebaseerd (SQL Server/Oracle), Windows-desktopclient. |
| **Safran Planner** | Lichtgewicht, bestandsgebaseerde planner (`.SPX`) voor kleinere projecten / snelle schema's. SRA als add-on. |
| **Safran Risk** | Kwantitatieve schedule- én kostenrisicoanalyse (Monte Carlo, JCL). Ontwikkeld vanaf 2015 mede door het oorspronkelijke **Pertmaster**-ontwikkelteam. |
| **Safran Risk Manager** | Kwalitatief risicoregister / samenwerkingsplatform. |
| **Safran Web Access** (Companion) | Browsergebaseerd voortgang melden en rapportbibliotheek. |
| **Safran Project Viewer** (Companion) | Read-only viewer op live data. |
| **Integration API / Data Reporting Utility+API** | Koppelvlakken voor derde systemen. |
| **Integrator for SAP**, **Marine Manager** | Verticale/ERP-koppelingen. |
| **Safran Cloud** | Beheerde **private** cloud (gehoste desktopstack), geen echte multi-tenant SaaS. |

### Doelgroep, gebruikers, sectoren, regio's

- **Doelgroep:** mid-market tot enterprise organisaties met **kapitaalintensieve projecten**, turnarounds/shutdowns en operationeel onderhoud — dus EPC-contractors, asset-owners en engineeringbureaus, niet de algemene "team-collaboratie"-markt.
- **Typische gebruiker:** de professionele **planner / project controls-engineer** (dezelfde persoon die anders Primavera P6 draait), plus kosten-/EVM-analisten en risicoanalisten. Niet bedoeld voor gelegenheidsgebruikers (daarvoor is Safran Planner of Web Access).
- **Sectoren:** olie & gas (dominant), energie/renewables, engineering & construction, aerospace & defence, nutsbedrijven, publieke sector, maakindustrie, marine/scheepsbouw.
- **Regio's:** sterk oververtegenwoordigd in **Noorwegen en Noordwest-Europa** (Noordzee-cluster), daarnaast VK, Midden-Oosten, Noord-Amerika en Australië via partners/resellers.
- **Genoemde klanten:** Equinor, Aker Solutions, Aibel, AECOM, MPR Associates. In een klantendatabase (AppsRunTheWorld) is de klantenbasis "het meest geconcentreerd in Olie, Gas en Chemie" en "het meest geconcentreerd in Noorwegen"; van de getraceerde klanten zit **100% boven de 1.000 medewerkers** (33% in 1.001–10.000, 67% boven 10.000). ***Correctie na verificatie:*** die percentages zijn gebaseerd op **slechts drie getraceerde klanten** (Equinor, Aker Solutions, Aibel) in de gratis weergave van AppsRunTheWorld — het is dus een n=3-steekproef, geen marktdata. Het is een *aanwijzing* voor enterprise-focus, geen bewijs.
- **Schaalvoorbeeld:** in de Aker Solutions-case rond het **Kristin**-platform gebruikten "ongeveer 100 mensen Safran dagelijks", met activiteitennetwerken "van voorheen onhanteerbare omvang".

---

## 2. Functionaliteit en techniek

### Architectuur en platform

- **Windows-desktopclient** met Office-achtige **ribbon-UI** (tabbladen, quick-access toolbar, vier panes: tabel, barchart/Gantt, informatiepaneel, tijdlijn). 64-bits applicatielaag.
- **Twee installatievormen:**
  - *Enterprise*: gedeelde **MS SQL Server** of **Oracle**-database, gelijktijdige multi-user toegang, centraal beheer.
  - *Personal*: lokale **SQL LocalDB**, single-user/offline, kan ook naar de bedrijfsdatabase verbinden.
- **Geen native webapplicatie voor plannen.** "Cloud" = Safran Cloud, een door Safran beheerde **private cloud** die dezelfde desktopstack host. Web Access/Project Viewer zijn browsergebaseerd maar beperkt tot voortgang melden, rapporten en read-only inzage.
- Netwerklicenties werden historisch geregeld via een gedeeld licentiebestand (`SPEN7.lic` op een UNC-pad) voor v22.2 en ouder — een oud maar in de praktijk pragmatisch model.
- Versienummering is inmiddels jaargebonden (v20.x, v22.2, **v25.1**). Vanaf **v25.1** zijn de oude bestandsformaten `.SP` en `.SPP` niet meer ondersteund; `.SPX` is het huidige formaat.

### CPM-engine

- Volwaardige **CPM/netwerkanalyse** met vroegste/laatste data, float en kritiek pad ("Appendix A – Network Analysis/Scheduling" in de documentatie).
- Onderscheidend: je kunt **per activiteit bepalen of die in de netwerkanalyse meedoet** — dat kan P6 niet. Ook toegestaan: **activity-ID's langer dan 20 tekens** en omschrijvingen langer dan 120 tekens (P6-limieten).
- Sterk in **what-if / alternatieve schema's**: schema's vergelijken, alternatieve scenario's naast het hoofdplan, doorrekenen van wijzigingsimpact.
- Bij import van P6/MSP kun je kiezen of Safran **hercalculeert** of de geïmporteerde data laat staan — expliciete erkenning dat engines onderling verschillen.

### Kalenders

- **Kalendersets** per project; werkuren/dag, werkdagen/week, niet-werkbare periodes; meerdere kalenders binnen één project; geavanceerde features als **kalenders samenvoegen** en printopties.
- **Bekende valkuil:** "calendar overflow"-waarschuwingen wanneer activiteiten buiten de gedefinieerde kalenderspanne vallen; Safran adviseert de kalender minstens een jaar voorbij de projectdata te laten lopen. Kalendereenheden (dagen/uren/minuten) kunnen bij import automatisch worden aangepast — een klassieke bron van datumverschillen.

### Resource- en kostenmodel

- **Resourcesets** met resources van het type **Cost** of **Quantity**, elk met tarieven (unit rates).
- Onbeperkt aantal toewijzingen per activiteit; **resource-histogrammen**, vraag-vs-beschikbaarheid, **portfolio-brede** resourcecapaciteit over projecten heen, en **resource levelling** met prioritering.
- **Kostenbeheersing en EVM** zijn eersteklas burgers, geen add-on: performance measurement, meerdere earned value-methoden, S-curves, kostenrapportage.
- **Scope-/wijzigingsbeheer met een change register en Variation Orders** — een functie die P6 Professional niet in deze vorm heeft en die in EPC-contracten zwaar telt.
- **Tot 680 userfields** per project (reference, text, date, flag, decimal, duration, outline codes, computed fields) — zeer ruime uitbreidbaarheid van het datamodel zonder maatwerkcode.

### Baselines — het "plan set"-model

Safran onderhoudt **vier gelijktijdige datumsets**, wat het opvallendst afwijkt van P6/MSP:

1. **Original** — de oorspronkelijke baseline-snapshot
2. **Baseline** — de meest recente baseline
3. **Current** — het resterende werk
4. **Live** — directe wijzigingen, vóór herbaselining

Daarmee kun je "wat is er veranderd sinds de baseline" en "wat gebeurt er als ik dit nu doe" tegelijk in één schema zien, zonder losse baseline-projecten te beheren. Dit is een van de sterkste technische onderscheiders.

### Risico / Monte-Carlo

- **In Safran Project zelf** zit sinds v5 een ingebouwde schedule risk analysis-module: duurtijd-onzekerheid modelleren en Monte Carlo draaien **zonder aparte software**. Ook Safran Planner heeft SRA als betaalde add-on.
- **Safran Risk** is het volwaardige QSRA/QCRA-product: geïntegreerde **kosten- én scheduling-risico** op één platform, **Joint Confidence Level (JCL)**, geavanceerde correlatiemodellering, geautomatiseerde sensitiviteitsanalyse (inclusief mijlpalen, hammocks en kosten), risico-gecorrigeerde Gantt- en cashflowweergaven, en stochastisch doorrekenen van mitigatiemaatregelen (kosten-batenafweging).
- **Performance:** Safran claimt op basis van een "onafhankelijk onderzoek" dat Safran Risk **97% sneller** is dan OPRA (Oracle Primavera Risk Analysis / Pertmaster); een klantcitaat spreekt van "40 uur werk in OPRA nu in minuten". *Kanttekening: dit is leveranciersmarketing; onafhankelijke benchmarks zijn niet publiek.* Wel geloofwaardig gegeven dat OPRA een 32-bits, uitgefaseerd product is dat Oracle niet meer doorontwikkelt.
- **Herkomst:** Safran Risk is vanaf 2015 ontwikkeld met betrokkenheid van het **oorspronkelijke Pertmaster-team** — Pertmaster werd in 2006 door Primavera overgenomen en werd Primavera Risk Analysis. Safran Risk is daarmee feitelijk de geestelijke opvolger van PRA, wat verklaart waarom onafhankelijke risico-consultants (o.a. Emerald Associates, IQRM) het als default-migratiepad van PRA aanbevelen.

### 4D / BIM

- **Geen 4D-simulatie, geen BIM-integratie, geen IFC.** In de volledige productdocumentatie, de productpagina's en het buildingSMART-implementatieregister is **geen enkel spoor** van IFC-, Navisworks- of Synchro-koppelingen te vinden. Safran is een *project controls*-tool, geen bouwvisualisatietool. Wie 4D wil, exporteert XER en voedt daarmee Synchro/Navisworks. Zie ook §6.

### Portfolio en rapportage

- **Multi-project management** via *Project Groups*; "Integrated Plan" voor het inlezen van contractorschema's en interne overdrachten — precies het EPC-scenario waarbij tientallen onderaannemersschema's samenkomen.
- Portfolio-brede filtering/groepering, drill-down op live data, resourcecapaciteit over de portfolio.
- **Rapportage** is een sterk punt: geautomatiseerde **rapportpakketten**, S-curves, histogrammen, performance charts, PERT-charts, **Schedule Health Assessment**, **Float Trend Analysis**, **Six-Period Summary**, en overheidsrapportformats (relevant voor defensie/publieke sector). Rapporten kunnen direct naar de Web Access-bibliotheek worden gepubliceerd.

### Schaalbaarheid

- ***Gecorrigeerd:*** de eerder geciteerde leveranciersclaim **"unlimited activity capacity"** is bij verificatie **niet terug te vinden** — niet op safran.com, niet in docs.safran.com en niet via zoekmachines (nul treffers op de exacte frase). Wat Safran wél letterlijk claimt op de Planner-productpagina is *"Manage an unlimited number of resources"* — **resources, geen activiteiten**. Behandel "onbeperkt aantal activiteiten" dus als **onbevestigd**; er is überhaupt geen gepubliceerd activiteitenmaximum, in geen van beide richtingen.
- Technisch onderbouwd: 64-bits applicatielaag "vereist voor grote schema's", SQL Server/Oracle-backend voor gelijktijdige multi-user toegang, projectgroepen voor portfolio-aggregatie.
- Praktijkanker: ~100 gelijktijdige dagelijkse gebruikers op één offshore-megaproject.
- ***Inschatting (niet door de leverancier bevestigd):*** schema's van **50.000–200.000 activiteiten** zijn realistisch werkbaar in een goed ingerichte enterprise-installatie; boven die orde wordt in de praktijk (zoals bij P6) opgesplitst in projectgroepen/subprojecten. Monte-Carlo-runs op tienduizenden activiteiten zijn expliciet het doelgebied van Safran Risk.

---

## 3. Prijzen

**Belangrijke waarschuwing vooraf:** Safran publiceert **geen prijslijst**. Noch safran.com, noch Safran Cloud, noch de partner-marktplaats (SoftwareOne) noemt bedragen; alles loopt via "enquire now"/offerte. Alle onderstaande bedragen komen van **review-aggregators** die hun cijfers deels van elkaar overnemen en deels afleiden — ze spreken elkaar tegen en moeten als **indicatief** worden gelezen, niet als lijstprijs.

| Bron | Bedrag | Model | Datum bron |
|---|---|---|---|
| Capterra – [capterra.com/p/139090/Safran-Project](https://www.capterra.com/p/139090/Safran-Project/) | **£2.700 eenmalig** ("one-time"), gratis proefversie | Perpetual/eenmalig, per seat *(aanname)* | pagina 2026 |
| Software Advice – [softwareadvice.com](https://www.softwareadvice.com/project-management/safran-project-management-profile/) | **£2.700 eenmalig**, gratis proefversie | idem (zelfde databron als Capterra – beide Gartner Digital Markets) | pagina 2026 |
| ITQlick – [itqlick.com/safran-project/pricing](https://www.itqlick.com/safran-project/pricing) | ~~$50/mnd (1), $400/mnd (10), $3.500/mnd (100), $30.000/mnd (1.000)~~ **verouderd**; huidige ITQlick-pagina (2026): **vanaf $150 per gebruiker/mnd**, ~**$1.200/mnd** voor 10 gebruikers, **$10.000+/mnd** voor 100 | abonnement, staffel | okt 2024 → **herzien 2026** |
| ITQlick (idem) | Implementatie **$5.000–$50.000**; onderhoud "enkele honderden tot enkele duizenden $ per jaar" | eenmalig + jaarlijks | okt 2024 (niet opnieuw bevestigd; ITQlick-pagina gaf HTTP 403 bij directe fetch) |
| SoftwareSuggest – [softwaresuggest.com/safran-project](https://www.softwaresuggest.com/safran-project) | ~~$20 per gebruiker/maand~~ — **pagina toont per 25-07-2026 géén bedrag meer**, alleen "Get Detailed Safran Project pricing as per your requirements" | – | jul 2025 → **ingetrokken** |
| Software Finder – [softwarefinder.com](https://softwarefinder.com/project-management-software/safran-project) | **Geen bedrag.** Pagina zegt letterlijk "Custom" + "A one-time license fee is available from Safran" en "There is no access to the free version of the software. However, the Safran Project software Demo is available for a free trial" | eenmalige licentie, custom | 2026 |
| Plan Academy (vakblog) – [planacademy.com](https://www.planacademy.com/3-coming-project-scheduling-tools-may-not-know/) | "**vergelijkbaar geprijsd met Primavera P6 Professional**", maar "meer functies voor dat prijskaartje" | – | artikel |

### Interpretatie

- ***Correctie na verificatie (25-07-2026):*** twee van de vier aggregator-cijfers hielden geen stand. Het bedrag **$150 per gebruiker/maand hoort bij ITQlick, niet bij Software Finder** — Software Finder noemt helemaal geen bedrag maar "Custom" plus "one-time license fee". SoftwareSuggest toont het eerder geciteerde **$20/gebruiker/maand niet meer**. ITQlick heeft zijn hele staffel herzien: de okt-2024-reeks ($50 → $30.000/mnd) is vervangen door $150/gebruiker/mnd oplopend naar $10.000+/mnd bij 100 gebruikers. **Conclusie: de aggregatorbedragen zijn niet alleen onderling inconsistent, ze zijn ook instabiel over de tijd — behandel ze als ruis, niet als data.**
- Wat er ná verificatie overblijft aan hard materiaal is mager: **£2.700 eenmalig** (Capterra/Software Advice, één Gartner-Digital-Markets-databron, dus feitelijk één waarneming) en de kwalitatieve bevestiging bij Software Finder dat het model **eenmalig/perpetual** is en dat er **geen gratis versie** bestaat (wel een demo/trial). Dat is consistent met een perpetual-per-seat-model, en het spreekt de abonnementsstaffels van ITQlick tegen.
- **Meest geloofwaardige ankerpunt** blijft de vakinhoudelijke uitspraak van Plan Academy: *prijspariteit met Primavera P6 Professional*. ***Correctie op het P6-referentiegetal:*** de eerder genoemde **≈US$2.750** is niet de prijs van P6 *Professional* maar de base licence per application user van **P6 EPPM**; P6 **Professional** perpetual wordt door resellers rond **≈US$3.100–3.520 per named user** geoffreerd, met **≈22% jaarlijks support**. Daarmee klopt ook de oude toevoeging "P6 EPPM aanzienlijk hoger" niet zonder meer — de instapprijs per user ligt bij EPPM juist lager, de kosten zitten daar in de server-/enterprise-componenten. ***Beide P6-getallen zijn resellerindicaties, geen Oracle-lijstprijs.***
- **Werkbare schatting voor een Nederlandse/Europese koper (expliciet: SCHATTING):**
  - *Safran Project*, enterprise, per named user: **€3.000–€6.000 perpetual** + **18–22% jaarlijks onderhoud**, óf **€1.200–€3.000 per gebruiker per jaar** als abonnement.
  - *Safran Planner*: substantieel goedkoper, orde **€700–€1.500 per seat**; SRA-module apart bijgeprijsd.
  - *Safran Risk*: als gespecialiseerd QSRA-product doorgaans **duurder per seat dan de planner** — orde **€6.000–€12.000 perpetual per seat** of €2.500–€5.000/jaar; typisch worden er maar enkele seats afgenomen (risico-analisten).
  - *Implementatie/migratie/training*: **€15.000–€100.000+** afhankelijk van omvang; database-inrichting, code sets, rapportsjablonen en datamigratie uit P6 zijn de kostenposten.
  - *Safran Cloud (private hosting)*: opslag bovenop de licentie, orde **20–40%** van de licentiewaarde per jaar.
- **Minimumafname:** niet gepubliceerd. *Inschatting: Safran verkoopt niet aan losse gebruikers; realistisch startpunt is een enterprise-deal met meerdere seats plus onderhoud.* Er is wel een **gratis proefversie/demo** (Capterra/Software Advice; Software Finder bevestigt "Demo is available for a free trial"), maar **geen gratis versie** — Software Finder is daar expliciet in. *(Capterra's productkaart bevat een tegenstrijdige "free version"-vlag; die aggregatorvlag is niet betrouwbaar en wordt hier niet gevolgd.)*
- **Modules/add-ons met eigen prijskaartje** (bedragen onbekend, allemaal licentie-gecontroleerd): Safran Risk, Risk Manager, Web Access, Project Viewer, **Integration API**, **Data Reporting Utility/API** (documentatie noemt expliciet "license controlled"), Integrator for SAP, Marine Manager.

**Conclusie prijzen:** dit is enterprise-software met offertegedreven pricing. Er is **geen** publieke lijstprijs en er zijn **geen** publieke aanbestedingsdocumenten met Safran-bedragen gevonden (o.a. gezocht via Noorse doffin/mercell-termen — geen treffers).

---

## 4. VOORDELEN

1. **Alles-in-één project controls-stack zonder toolketen.** Scheduling, kostenbeheersing, EVM, wijzigings-/scopebeheer én Monte-Carlo-risicoanalyse zitten in één applicatie op één database. In de P6-wereld heb je daarvoor P6 Professional + P6 EPPM + een cost-tool (EcoSys/Cobra) + PRA/Acumen nodig — vier producten, vier interfaces, vier datastromen. Plan Academy noemt dit letterlijk "meer functies voor hetzelfde prijskaartje".
2. **Het vier-datumsets-model (Original / Baseline / Current / Live) is technisch superieur voor claim- en veranderingsbeheer.** Je ziet in één schema tegelijk het oorspronkelijke plan, de laatste baseline, de forecast en het live doorgerekende effect van een nog niet vastgezette wijziging. Voor EPC-projecten met veel variation orders is dat direct geld waard.
3. **Ingebouwde scope-/wijzigingsregistratie met Variation Orders.** De impact van een wijziging op resources en tijdlijn wordt realtime doorgerekend en is als apart object herleidbaar — precies wat contractueel bewijsbare vertragingsanalyse vraagt en wat in P6 met workarounds (extra activiteiten, codes) moet.
4. **Serieuze, snelle risico-engine met de juiste afkomst.** Safran Risk is (vanaf 2015) ontwikkeld met het oorspronkelijke **Pertmaster**-team; het levert geïntegreerde kosten- én schedulerisico op één platform met **Joint Confidence Level** en volwassen correlatiemodellering. Met Oracle's PRA feitelijk dood (niet meer doorontwikkeld) is Safran Risk het meest genoemde migratiepad in de QSRA-praktijk, ook door onafhankelijke consultants.
5. **Bewezen schaal op megaprojecten.** ~100 dagelijkse gebruikers op één offshore-platformproject bij Aker Solutions, met activiteitennetwerken "van voorheen onhanteerbare omvang"; SQL Server/Oracle-backend en 64-bits client voor grote schema's. *(De eerder genoemde leveranciersclaim "unlimited activity capacity" is bij verificatie niet gevonden — zie §2, Schaalbaarheid. Het schaalargument rust dus op de Kristin-case en de architectuur, niet op een gepubliceerd capaciteitsgetal.)*
6. **Extreem ruim uitbreidbaar datamodel zonder maatwerk.** Tot **680 userfields** in acht typen (inclusief berekende velden en outline codes) betekent dat bedrijfsspecifieke coderingen, WBS-varianten en KPI's in de standaardapplicatie passen — geen custom development, geen upgradepijn.
7. **Sterke, kant-en-klare rapportage.** Rapportpakketten, S-curves, histogrammen, PERT, **Schedule Health Assessment**, **Float Trend Analysis**, **Six-Period Summary** en overheidsrapportformats zitten in de doos, en publiceren rechtstreeks naar de webrapportbibliotheek. Bij P6 is een vergelijkbare set doorgaans BI-maatwerk.
8. **Flexibeler CPM-semantiek dan P6.** Activiteiten kunnen individueel in/uit de netwerkanalyse worden gezet; activity-ID's en omschrijvingen zijn niet beperkt tot 20/120 tekens. Klinkt klein, is in praktijk een veelvoorkomende bron van frustratie bij P6-migraties.
9. **Diepe domeinkennis in olie & gas en turnarounds.** Bijna 30 jaar in de Noordzee-EPC-wereld, met referenties als Equinor, Aker Solutions en Aibel. Interfacemanagement, contractorschema-integratie en turnaround-planning zitten in het productdenken, niet als afterthought.
10. **Bekende, laagdrempelige UI-metafoor.** Office-achtige ribbon met vier vaste panes; door meerdere reviewers en de eigen trainingsdocumentatie omschreven als vertrouwd voor Excel/Word-gebruikers. De handvol reviews scoort ease of use 9/10.

---

## 5. NADELEN

1. **Verouderde codebase en gedateerde UI.** Plan Academy noemt de codebase expliciet "dated"; meerdere reviewers op Capterra/Software Advice zeggen dat het ontwerp "een verouderde indruk maakt" en "modernisering nodig heeft". Symptomatisch: de FAQ bevat nog een instructie om **High-DPI-schaling handmatig te overriden** via het compatibiliteitstabblad van de EXE — een Windows-workaround uit het XP/7-tijdperk.
2. **Windows-desktop-only voor het echte werk; geen echte SaaS.** "Safran Cloud" is een **private, beheerde hosting** van dezelfde desktopstack, geen multi-tenant webapplicatie. De web-companions (Web Access, Project Viewer) doen alleen voortgang melden en read-only rapportage. Geen macOS, geen Linux, geen browser-planning. In 2026 is dat een strategisch achterstandje ten opzichte van Oracle Primavera Cloud, InEight en Planera.
3. **Zware infrastructuurvoetafdruk.** Enterprise-gebruik vereist SQL Server of Oracle, 64-bits clients/drivers, IIS + .NET Core-hosting voor de API's, Windows Server 2012 R2+ en DBA-capaciteit. De Personal-variant draait op SQL LocalDB, maar dan verlies je juist het multi-userdeel. Voor kleinere organisaties is de TCO daardoor structureel hoger dan de licentieprijs suggereert.
4. **Zorgelijke API-beveiliging.** De Integration API gebruikt **Basic Authentication tegen een `api_user`-tabel in de database, met wachtwoorden opgeslagen in platte tekst**, blijkens de eigen documentatie. Voor een tool die in olie & gas en defensie draait is dat een lastig te verdedigen ontwerpkeuze en een reëel security-review-obstakel.
5. **Export naar P6 is lossy en vereist handwerk.** De documentatie erkent zelf dat "Safran Project een veel uitgebreidere applicatie is dan Primavera", waardoor **periodieke statusinformatie, Variation Orders en subprojecten niet meegaan**. Er bestaat een aparte **XER Export Checks**-tool om inconsistenties vooraf op te sporen. Fora-commentaar is scherper: Safran exporteert "niet erg goed" naar P6 en vereist "massaging". Bij gefilterde exports waarschuwt de documentatie dat de netwerklogica kapot kan gaan.
6. **Import-frictie vanuit P6.** Slechts **één project per XER-import** (multi-project-XER's moeten eerst worden opgesplitst); **LOE-activiteiten** komen alleen goed over als hammocks bij exact de juiste SS/FF-linkconfiguratie, anders veranderen linktypes stilzwijgend; **kalendereenheden worden automatisch aangepast**; en datums verschillen sowieso doordat de engines anders rekenen. Voor XER's naar P6 ouder dan 16.2 moet je het bestand handmatig naar ANSI-encoding omzetten, waarbij **niet-Latijnse tekens in vraagtekens veranderen**.
7. **Zeer dunne onafhankelijke reviewbasis en geen analistendekking.** Capterra en Software Advice tonen **drie** reviews (4,3/5), waarvan de meest positieve van een *klein marketingteam* komt en de andere twee uit *food & beverage* en *telecom* — reviewers die vrijwel zeker niet de EPC-doelgroep vertegenwoordigen. G2/TrustRadius hebben nauwelijks volume, en er is geen Gartner Magic Quadrant-positie. Als koper kun je je oordeel dus niet op peer reviews baseren; je bent aangewezen op referentiebezoeken.
8. **Kleine talentenpool en beperkt ecosysteem.** De wereldwijde populatie van planners die Safran kan bedienen is een fractie van de P6-populatie. Trainingen, boeken, YouTube-content, forumkennis, sjablonen en consultants zijn schaars buiten Noorwegen/VK. Bij verloop van je hoofdplanner is vervanging moeilijker en duurder dan bij P6 of MS Project.
9. **Zichtbare vendor lock-in in het bestandsformaat.** *(Genuanceerd na verificatie: bij Safran **Project** in enterprise-opstelling is de primaire opslag de **SQL Server/Oracle-database**, niet een bestand; `.SPX` is het gesloten uitwisselings-/exportformaat dat Project en Planner delen — de documentatie zegt letterlijk "Safran Planner and Safran Project both use \*.SPX". Voor Safran Planner is `.SPX` wél het echte native bestandsformaat.)* **`.SP` en `.SPP` zijn met v25.1 volledig uitgezet** ("From v25.1 \*.SP and \*.SPP is no longer supported"), wat betekent dat oude archieven onleesbaar worden zonder migratie. De enige neutrale uitwegen zijn XER en MS Project XML — en die verliezen juist de Safran-specifieke functies (variation orders, subprojecten, plan sets, userfields) die de tool onderscheiden. Wat Safran bijzonder maakt, is precies wat je niet mee kunt nemen.
10. **Geen 4D/BIM en geen IFC.** Voor bouw- en infrastructuurprojecten waar openBIM-verplichtingen gelden, ontbreekt elke native koppeling naar modellen. Zie §6 — voor een IFC-georiënteerde opdrachtgever is dit het belangrijkste gat.
11. **Prijs en prijsopaciteit.** Meerdere bronnen noemen Safran duurder in implementatie dan alternatieven en er is geen gratis versie. Er is bovendien **geen enkele publieke prijs**; elke vergelijking begint met een salesgesprek. Dat is een reële drempel in aanbestedingen waar TCO vooraf moet worden onderbouwd.
12. **Merkverwarring met Safran S.A.** De naamcollisie met de Franse lucht- en ruimtevaartgroep vervuilt zoekresultaten, documentatievindbaarheid en zelfs interne inkoopadministratie — een klein maar hardnekkig operationeel ongemak.

---

## 6. Interoperabiliteit (extra belangrijk voor een IFC-gebaseerde open-source planner)

### Ondersteunde bestandsformaten

| Formaat | Import | Export | Opmerkingen |
|---|:--:|:--:|---|
| **Safran `.SPX`** | ✔ | ✔ | Gesloten uitwisselingsformaat, **gedeeld door Project én Planner** ("Both Safran Project and Safran Planner can read this format"); export in twee varianten: v20.x en v7.x. Native *bestands*formaat voor Planner; Safran Project zelf slaat op in SQL Server/Oracle |
| **Safran `.SP` / `.SPP`** | ✖ | ✖ | Legacy; **vanaf v25.1 niet meer ondersteund** |
| **Primavera P6 `.XER`** | ✔ | ✔ | Hoofdroute richting P6. Import: één project per bestand. Export via **XER Export Checks**; verliest periodieke status, Variation Orders, subprojecten |
| **Microsoft Project XML (MSPDI)** | ✔ | ✔ | Configureerbare veldmapping tussen Safran-userfields en MSP-velden |
| **P6 XML (PMXML)** | ✖ | ✖ | **Niet gedocumenteerd** — alleen XER. Beperking t.o.v. moderne P6-uitwisseling (PMXML draagt meer data en meerdere projecten) |
| **`.MPP` (native MS Project)** | ✖ | ✖ | Niet ondersteund; MSP moet als XML exporteren |
| **CSV / Excel (volledig project)** | ✖ | ✖ | Geen gedocumenteerde project-round-trip. Excel-uitvoer bestaat wél voor **rapportdata** en voor **ruwe simulatiedata uit Safran Risk** naar Excel/BI |
| **IFC 4.3 (`IfcWorkSchedule`, `IfcTask`, `IfcWorkCalendar`)** | ✖ | ✖ | **Volledig afwezig.** Geen vermelding in productdocumentatie, productpagina's of het buildingSMART-implementatieregister |
| **MPXJ** | ? | – | ***Onbevestigd — claim afgezwakt.*** MPXJ is een **bibliotheek, geen bestandsformaat**; er bestaat geen ".MPXJ"-bestand. Bij verificatie is **geen enkele MPXJ-vermelding** gevonden op docs.safran.com (incl. de Safran Risk-introductiepagina) of elders. Dat Safran MPXJ intern gebruikt is een **plausibele maar onbewezen** gevolgtrekking |

### API's en koppelingen

- **Safran Project Integration API** — on-premises te hosten service (IIS 7.0+, **.NET 8.0 Core**, opgewaardeerd vanaf .NET Framework 4.8). Ondersteunt select/create/delete/update op: projecten, project previews, **code sets**, **activiteiten en activity links**, **kalendersets**, **change orders**, **resourcedefinities en -toewijzingen**, **outline codes**. Vereist toegang tot de MS SQL- of Oracle-database. Compatibel vanaf Safran Project v7, v20+ is de norm. **Basic auth met plaintext wachtwoorden** in een `api_user`-tabel.
- **Data Reporting Utility + Data Reporting API** — aggregatiejobs definiëren en resultaten uitlezen; door Safran zelf omschreven als **"restricted"** met **"limited integration possibilities"**; voor echte integratie verwijst men naar de Integration API. Licentie-gecontroleerd.
- **Direct SQL** — omdat alles in SQL Server/Oracle staat, is databasetoegang in de praktijk vaak de gebruikte integratieroute (o.a. via "Advanced SQL"-referentievelden die andere tabellen aanspreken).
- **Integrator for SAP** — kant-en-klare ERP-koppeling voor kosten/actuals.
- **Safran Risk** — importeert P6 `.XER` en MS Project `.XML`; exporteert ruwe simulatiedata naar Excel/BI; kan schema's rechtstreeks vanuit derde systemen aanmaken/wijzigen. *(De eerder vermelde "MPXJ-import" is niet in de documentatie terug te vinden — zie de formaattabel hierboven.)*

### Wat dit betekent voor een open-source, IFC-gebaseerde planner

1. **Directe IFC-uitwisseling met Safran bestaat niet en komt er waarschijnlijk niet.** Safran positioneert zich in project controls, niet in openBIM; er is geen enkel signaal (roadmap, documentatie, buildingSMART-registratie) van IFC-ondersteuning. Reken hier niet op.
2. **De enige realistische brug is XER, met MSPDI als tweede.** Wie data wil uitwisselen met een Safran-huishouding bouwt een **XER-writer/reader** (en/of een MS Project XML-adapter). XER is een gedocumenteerd-genoeg, tab-gescheiden formaat; MSPDI is een open XSD en aanzienlijk makkelijker om correct te implementeren. **Advies: begin met MSPDI (MS Project XML) en voeg XER daarna toe** — beide worden door Safran in beide richtingen ondersteund.
3. **MPXJ is het te overwegen hergebruikspad — maar let op de licentie.** ***Twee correcties op de eerdere tekst:***
   - **Licentie: MPXJ is LGPL-2.1, niet Apache.** De README stelt: *"MPXJ is distributed under the terms of the GNU LGPL."* Dat is een wezenlijk verschil voor deze opdrachtgever: Open Planner Studio is zelf **LGPL-3.0**, en LGPL-2.1 → LGPL-3.0 is alleen combineerbaar als het MPXJ-project de gebruikelijke "of enige latere versie"-clausule voert. **Dit moet vóór adoptie juridisch worden nagelopen**; de eerdere aanname "Apache, dus zorgeloos" was fout.
   - **Lezen ≠ schrijven.** MPXJ **leest** een zeer breed scala (MPX, MPP, MSPDI, MPD, Planner, P6 PMXML én XER, P3, SureTrak, Asta Powerproject/Easyplan, Phoenix, Fasttrack, GanttProject, Synchro, SDEF, Deltek Open Plan BK3 en meer), maar **schrijft** slechts **MPX, MSPDI, PMXML, XER, Planner en SDEF**. MPP en Asta zijn dus *read-only*. Voor de export-kant van deze planner is dat precies goed (MSPDI + XER + PMXML worden geschreven), maar de eerdere formulering "leest/schrijft XER, PMXML, MSPDI, MPP, Planner, Asta" was onjuist.
   - Dat Safran zelf MPXJ gebruikt is **niet bevestigd** (zie de formaattabel); het argument voor MPXJ staat op eigen benen en niet op dat vermoeden. Beschikbaar in Java met .NET-, Ruby- en Python-poorten.
4. **Positioneringskans: IFC als natuurlijke opslag.** De architectuur van deze opdrachtgever (IFC 4.3 als *native* formaat, `IfcWorkSchedule`/`IfcTask` round-trip) is precies waar Safran — en P6, en Asta — geen antwoord op hebben. Voor bouw-/infraprojecten met openBIM-verplichtingen (o.a. Noorse Statens vegvesen, Nederlandse RWS/ProRail-uitvragen) is dat een echt differentiërend punt, geen nice-to-have.
5. **Neem de lossy-realiteit over.** Safran documenteert eerlijk dat rijkere concepten (variation orders, subprojecten, periodieke status) niet door XER passen. Een IFC-planner die met Safran/P6-huishoudens moet praten, moet hetzelfde expliciet maken: definieer welke IFC-entiteiten mappen naar XER/MSPDI en welke bewust achterblijven, en geef de gebruiker vóór export een **export-check** zoals Safran dat doet. Die UX-keuze is het kopiëren waard.
6. **Kalender- en engine-verschillen zijn een bekende valkuil.** Safran waarschuwt zelf dat datums na import verschillen doordat elke tool zijn eigen netwerkanalyse heeft, en biedt daarom een expliciete keuze "wel/niet hercalculeren" bij import. Een open-source planner die IFC-schema's inleest zou diezelfde keuze moeten aanbieden — het is de enige eerlijke manier om verschil tussen engines af te handelen. Let ook op kalendereenheden (dagen/uren/minuten) en op kalenderspanne (Safran adviseert ≥1 jaar marge om "calendar overflow" te vermijden).

---

## 7. Marktpositie

### Waar sterk, en waarom

- **Noorwegen / Noordzee-olie & gas.** Dit is de thuisbasis en de vesting. Equinor, Aker Solutions en Aibel zijn de bekendste namen; de gebruikersconcentratie zit onmiskenbaar in Noorwegen en in de olie-/gas-/chemiesector. De reden is historisch én functioneel: Safran is samen met deze EPC-contractors ontworpen rond interfacemanagement, contractorschema-integratie, variation orders en turnarounds.
- **Kwantitatieve risicoanalyse wereldwijd.** Safran **Risk** heeft een aanmerkelijk breder bereik dan Safran Project. Nu Oracle's Primavera Risk Analysis (Pertmaster) feitelijk end-of-life is, wordt Safran Risk door onafhankelijke consultants routinematig als opvolger aanbevolen, vooral voor JCL-analyses, geavanceerde correlatie en grote schema's. Dit is momenteel de sterkste groeimotor van het bedrijf. *(Inschatting op basis van de consultant-literatuur, niet uit omzetcijfers.)*
- **Turnarounds / shutdowns en onderhoud.** Compacte, resource-kritische, hoog-frequente planningen waar EVM en wijzigingsbeheer samenkomen.
- **Aerospace & defence en publieke sector**, mede door de aanwezigheid van overheidsrapportformats en EVM-diepgang.

### Belangrijkste concurrenten

| Segment | Concurrenten |
|---|---|
| **Enterprise CPM-scheduling** | **Oracle Primavera P6 (Professional + EPPM)** — de facto standaard en de directe tegenstander; **Oracle Primavera Cloud (OPC)**; **Asta Powerproject** (sterk in UK-bouw); **Microsoft Project / Project for the web** |
| **Project controls / kosten** | **EcoSys** (Hexagon), **InEight**, **ARES PRISM**, **Deltek Cobra/Acumen** |
| **QSRA / risico** | **Oracle Primavera Risk Analysis** (uitgefaseerd), **Deltek Acumen Risk**, **Primavera Cloud Risk Analysis**, **@RISK/Palisade**, **Full Monte** |
| **Nieuwe generatie** | **Planera**, **ALICE Technologies**, **nPlan**, **Touchplan/Lean-tools** |
| **4D/BIM (aangrenzend)** | **Bentley Synchro**, **Autodesk Navisworks** — geen directe concurrenten, wel waar Safran een gat laat |

### Trend

***Inschatting op basis van de verzamelde signalen (geen publieke omzetcijfers gevonden):***

- **Safran Project: stabiel tot licht krimpend in relatieve marktaandeel.** De installed base in Noordzee-olie & gas is loyaal en plakkerig, maar het product is Windows-desktop met een erkend gedateerde codebase in een markt die naar cloud/web beweegt. Onder JDM-eigendom (een consolidator, geen groeikapitaal) is een fundamentele herbouw van de client onwaarschijnlijk; het patroon wijst op onderhoud en incrementele releases (v25.1 etc.).
- **Safran Risk: groeiend.** Het vacuüm dat Oracle's afbouw van PRA achterlaat, wordt actief opgevuld; Safran heeft daar een geloofwaardig technisch én personeel (Pertmaster-team) verhaal en aantoonbare performancevoordelen. Dit is waar het bedrijf mondiaal terrein wint.
- **Geen bekende verplichtstellingen.** Er zijn geen aanwijzingen gevonden voor overheids- of opdrachtgeversmandaten die Safran voorschrijven. In de praktijk is het omgekeerde relevanter: **veel opdrachtgevers eisen P6/XER-deliverables**, wat betekent dat Safran-gebruikers vrijwel altijd een XER-exportverplichting hebben — precies daar waar hun tool data verliest.

---

## 8. Eindoordeel

### Voor wie is Safran Project de juiste keuze

- **EPC-contractors en asset-owners in olie & gas, energie en offshore**, met name in Noordwest-Europa, die kapitaalprojecten of turnarounds draaien met zwaar wijzigings-/variation-order-verkeer. Hier is Safran functioneel eerder beter dan P6, niet slechter — en de referentiebasis is lokaal en verifieerbaar.
- **Organisaties die scheduling, kosten, EVM, wijzigingsbeheer én QSRA in één applicatie willen** in plaats van een toolketen te integreren. Als het alternatief P6 + EPPM + EcoSys + Acumen is, is Safran zowel goedkoper als eenvoudiger te beheren.
- **Teams die serieuze kwantitatieve risicoanalyse doen** en van Primavera Risk Analysis af moeten. Voor die groep is Safran **Risk** vrijwel zonder meer aan te raden, ook als het onderliggende schema in P6 blijft staan — het product staat prima op zichzelf.
- **Organisaties met bestaande Windows/SQL Server/Oracle-infrastructuur en interne DBA-capaciteit**, die on-premises of private cloud verkiezen boven publieke SaaS (bijvoorbeeld om data-residency- of defensieredenen).

### Voor wie niet

- **Bouw- en infrastructuurorganisaties die op openBIM/IFC inzetten.** Geen IFC, geen 4D, geen BIM-koppeling. Voor projecten met IFC-verplichtingen is Safran een dood spoor in de modelketen.
- **Wie een moderne web-/cloudervaring verwacht.** Plannen kan alleen in een Windows-desktopclient; "cloud" is gehoste desktop. Mac-, Linux- en browser-first organisaties vallen af.
- **Kleine tot middelgrote organisaties en losse aannemers.** De TCO (licentie + database + implementatie + training + schaarse specialisten) is niet te rechtvaardigen onder een bepaalde projectomvang; Asta Powerproject, MS Project of een moderne SaaS-tool past beter.
- **Organisaties waar de opdrachtgever P6-deliverables afdwingt en de schema's intensief heen-en-weer moeten.** De XER-brug is bruikbaar maar lossy en foutgevoelig; wie dagelijks XER-uitwisselt met een klant, heeft minder wrijving als hij zelf ook P6 draait.
- **Wie op onafhankelijke reviews en analistenrapporten wil kunnen leunen bij de aanschafbeslissing.** Die zijn er nauwelijks; je moet referentiebezoeken en een pilot doen.

### Relevantie voor de opdrachtgever (open-source, IFC-gebaseerde planner)

Safran is **geen directe concurrent** van een open-source IFC-planner — het speelt in een ander segment (zware enterprise project controls, per-seat betaald, database-gebonden) en in een andere sector (olie & gas boven bouw). Wat het wel is, is een **rijke bron van ontwerplessen**:

- **Overnemen:** het vier-datumsets-model (Original/Baseline/Current/Live), de expliciete **export-check vóór uitwisseling**, de keuze "wel/niet hercalculeren bij import", de rijke maar declaratieve userfields, en de kant-en-klare analyserapporten (float trend, schedule health).
- **Vermijden:** gesloten native formaat met harde deprecaties, plaintext-wachtwoorden in de API, en het ontbreken van een neutrale volledige-datadump (CSV/JSON/IFC) waardoor de eigen sterkste features onexporteerbaar zijn.
- **Kans:** de interoperabiliteitshoek. Safran ondersteunt XER en MSPDI, geen IFC. Een planner die IFC 4.3 *native* opslaat én XER/MSPDI kan lezen en schrijven, spreekt beide werelden — en dat kan momenteel niemand in dit veld goed.

---

## Bronnen

Alle URL's geraadpleegd op **25 juli 2026**.

### Leverancier — product en marketing
1. Safran Software Solutions — bedrijfssite (UK) — https://www.safran.com/en-gb/
2. Safran Project — productpagina — http://www.safran.com/project
3. Safran Planner — productpagina — https://www.safran.com/en-gb/project-management-scheduling-software
4. Safran Risk — risk analytics solutions — https://www.safran.com/en-gb/risk-analytics-solutions
5. Safran Cloud Services — https://www.safran.com/cloud
6. Safran blog — "Why you should upgrade from Oracle Primavera Risk Analysis to Safran Risk" — https://www.safran.com/blog/why-you-should-upgrade-from-oracle-primavera-risk-analysis-to-safran-risk-technology
7. Safran — Migrating from Oracle Primavera Risk Analysis to Safran Risk (knowledge portal) — https://www.safran.com/content/migrating-from-oracle-primavera-risk-analysis-to-safran-risk-knowledge-portal
8. Safran — case study Aker Solutions — https://www.safran.com/case-studies/aker-solutions
9. Safran Planner Overview (PDF) — https://www.safran.com/hubfs/Safran%20Planner%20Overview.pdf *(binair; niet uitleesbaar bij fetch)*

### Officiële documentatie
10. Safran Documentation Center — https://docs.safran.com/
11. Documentatie-index (llms.txt) — https://docs.safran.com/llms.txt
12. Brief introduction to Safran Project (basistraining) — https://docs.safran.com/docs/safran-project-basic-training-course-brief-introduction-to-safran-project
13. Importing and Exporting Projects — https://docs.safran.com/docs/importing-and-exporting-projects-1
14. Exporting data from a Safran Project Database — https://docs.safran.com/docs/safran-project-exporting-data-from-a-safran-project-database
15. Safran Planner — Importing and Exporting Projects — https://docs.safran.com/docs/safran-planner-importing-and-exporting-projects
16. Frequently Asked Questions — https://docs.safran.com/docs/frequently-asked-questions
17. Integration API — Introduction — https://docs.safran.com/docs/safran-project-integration-api-introduction
18. Integration API — Installation — https://docs.safran.com/docs/safran-project-integration-api-installation
19. Integration API — Basic Authentication — https://docs.safran.com/docs/safran-project-integration-api-basic-authentication
20. Integration API — Connection Strings — https://docs.safran.com/docs/safran-project-integration-api-connection-strings
21. Data Reporting API — https://docs.safran.com/docs/safran-project-data-reporting-api
22. Safran Web Access — Requirements — https://docs.safran.com/docs/safran-web-access-requirements
23. Safran Risk — Introduction — https://docs.safran.com/docs/safran-risk-introduction

### Eigendom en bedrijfsinformatie
24. JDM Technology Group — overname Safran (persbericht) — https://jdmtechnologygroup.com/risk-assessment-and-project-management-software-maker-safran-acquired-by-jdm-technology-group/
25. EV Private Equity — "Safran Software Solutions Acquired by JDM Technology Group" — https://www.evprivateequity.no/safran-software-solutions-acquired-by-jdm-technology-group/
26. PR Newswire — overname Safran door JDM Technology Group — https://www.prnewswire.co.uk/news-releases/risk-assessment-and-project-management-software-maker-safran-acquired-by-jdm-technology-group-819574889.html
27. JDM Technology Group — bedrijfspagina Safran — https://jdmtechnologygroup.com/companies/safran/
28. Safran blog — "Safran Software Solutions has announced new leadership" — https://www.safran.com/blog/safran-under-new-ownership

### Reviews, prijzen en aggregators
29. Capterra — Safran Project (prijs £2.700 eenmalig, 4,3/5 uit 3 reviews) — https://www.capterra.com/p/139090/Safran-Project/
30. Software Advice — Safran Project — https://www.softwareadvice.com/project-management/safran-project-management-profile/
31. Software Finder — Safran Project reviews — https://softwarefinder.com/project-management-software/safran-project/reviews
32. ITQlick — Safran Project pricing (okt 2024) — https://www.itqlick.com/safran-project/pricing
33. ITQlick — Safran Project vs Primavera P6 — https://www.itqlick.com/compare/safran-project/primavera-p6-enterprise-project-portfolio-management
34. SoftwareSuggest — Safran Project pricing (jul 2025) — https://www.softwaresuggest.com/safran-project
35. GoodFirms — Safran Project reviews & pricing — https://www.goodfirms.co/software/safran-project
36. SourceForge — Safran Project alternatives — https://sourceforge.net/software/product/Safran-Project/alternatives
37. SoftwareOne Marketplace — Safran Web Access — https://platform.softwareone.com/product/safran-web-access/PCP-3807-6304

### Vakcommunity en onafhankelijke analyse
38. Plan Academy — "3 Up-and-Coming Project Scheduling Tools You May Not Know About" — https://www.planacademy.com/3-coming-project-scheduling-tools-may-not-know/
39. Planning Planet — wiki Safran Project — https://planningplanet.com/wiki/422635/safran-project
40. Planning Planet — forum "Primavera vs Safran" — http://www.planningplanet.com/forums/planning-scheduling-programming-discussion/415131/primavera-vs-safran *(HTTP 403 bij directe fetch; inhoud via zoekresultaten)*
41. Planning Planet — forum "Replacing Primavera – best alternative?" — https://planningplanet.com/forums/planning-scheduling-programming-discussion/633970/replacing-primavera-best-alternative *(HTTP 403 bij directe fetch; inhoud via zoekresultaten)*
42. Emerald Associates — "Why you should upgrade from Oracle Primavera Risk Analysis to Safran Risk" (deel 1 & 2) — https://www.emerald-associates.com/item/part-1-why-you-should-upgrade-from-oracle-primavera-risk-analysis-to-safran-risk.html
43. IQRM — "Primavera Risk Analysis: The Practitioner's Guide to Schedule Risk Modeling" — https://iqrm.net/blog/primavera-risk-analysis
44. LinkedIn (Pedram Danesh-Mand) — "Acumen Risk, Primavera Risk Analysis, Safran Risk AND Primavera Cloud Risk" — https://www.linkedin.com/pulse/acumen-risk-primavera-analysis-safran-cloud-our-pedram-danesh-mand
45. LinkedIn (Santosh Bhat) — "Importing P6 Duration Uncertainties to Safran Risk" — https://www.linkedin.com/pulse/importing-p6-duration-uncertainties-safran-risk-santosh-bhat
46. Constrofacilitator — "9 Project Scheduling Software with Built-In Risk Simulation & Monte Carlo Analysis" — https://constrofacilitator.com/9-project-scheduling-software-with-built-in-risk-simulation-monte-carlo-analysis/

### Klanten en marktdata
47. AppsRunTheWorld — Safran Project customers database — https://www.appsruntheworld.com/customers-database/products/view/safran-project
48. ProjectControlsOnline — Safran — https://projectcontrolsonline.com/safran

### IFC-referentie (afwezigheid vastgesteld)
49. buildingSMART Technical — IFC software implementations register (geen Safran-vermelding) — https://technical.buildingsmart.org/ifc-software-implementations/ *(HTTP 403 bij hercontrole 25-07-2026; zie §Verificatie #15)*
50. buildingSMART Technical — IFC standaard — https://technical.buildingsmart.org/standards/ifc/

### Aanvullende bronnen uit de verificatieronde (25-07-2026)
51. Enhetsregisteret (Brønnøysundregistrene) — API-record Safran Software Solutions AS, org.nr 879388252 — https://data.brreg.no/enhetsregisteret/api/enheter?navn=Safran%20Software%20Solutions
52. Silverpeak Investment Banking — adviseur bij de JDM-overname (datum 01-10-2021) — https://www.silverpeakib.com/silverpeak-advisors-on-risk-assessment-and-project-management-software-maker-safran-acquisition-by-jdm-technology-group/
53. Sortis Invest — Safran Software Solutions acquired by JDM Technology Group — https://www.sortisinvest.com/safran-software-solutions-a-leading-vendor-of-risk-and-project-management-software-has-been-acquired-by-jdm-technology-group/
54. Crunchbase — acquisition record JDM Technology Group / Safran Software Solutions — https://www.crunchbase.com/acquisition/jdm-technology-group-acquires-safran-software-solutions--4bbdbc44
55. Safran docs — Userfields (bevestiging 680 userfields) — https://docs.safran.com/docs/userfields
56. MPXJ — projectsite, ondersteunde lees-/schrijfformaten — https://www.mpxj.org/
57. MPXJ — broncode en licentie (LGPL-2.1) — https://github.com/joniles/mpxj
58. Emerald Associates — About Safran ("designed by the project risk experts that brought Pertmaster to market") — https://www.emerald-associates.com/software/safran/about-safran.html
59. Primavera Systems — persbericht overname Pertmaster Ltd. en ProSight Inc., 12 december 2006 — via brm.com

---

### Verantwoording en beperkingen van dit onderzoek

- **Prijzen zijn niet vendor-bevestigd.** Safran publiceert geen prijslijst; alle bedragen komen van aggregators die elkaar tegenspreken. De in §3 gegeven bandbreedtes zijn **expliciet als schatting gemarkeerd**.
- **De onafhankelijke reviewbasis is extreem dun** (3 reviews op Capterra/Software Advice, verwaarloosbaar volume op G2/TrustRadius, geen Gartner Peer Insights-dekking van betekenis). Kwalitatieve oordelen in §4 en §5 leunen daarom zwaarder op **technische analyse van de officiële documentatie** en op vakcommunity-bronnen (Planning Planet, Plan Academy, risico-consultants) dan op reviewscores.
- **Planning Planet-forumdraden gaven HTTP 403 bij directe fetch;** hun inhoud is via zoekresultaat-samenvattingen meegenomen en als zodanig gemarkeerd.
- **Geen Reddit-materiaal gevonden** over Safran in r/projectmanagement, r/construction of r/civilengineering — het product is in die communities feitelijk afwezig, wat op zichzelf een marktpositie-signaal is.
- **Geen aanbestedingsdocumenten met Safran-bedragen gevonden** (o.a. gezocht met Noorse termen rond doffin/mercell/rammeavtale).
- **Groei-/omzetcijfers van Safran Software Solutions zijn niet publiek**; de trendinschatting in §7 is als schatting gemarkeerd en gebaseerd op productsignalen (eigendomsstructuur, releasepatroon, PRA-vacuüm), niet op financiële data.

---

## Verificatie

*Adversariële controle uitgevoerd op 25 juli 2026. Opzet: elke bewering actief proberen te **weerleggen** met bronnen die nog niet in het profiel stonden (Noors handelsregister, M&A-adviseurs, MPXJ-project, primaire Safran-documentatie), niet alleen bevestiging zoeken. Waar de tegencontrole afweek, is de brontekst hierboven aangepast.*

### Samenvatting

**21 beweringen gecontroleerd: 11 bevestigd, 8 gecorrigeerd, 2 onzeker.** De correcties concentreren zich in **§3 Prijzen** en in de **MPXJ-passage van §6** — precies de twee plekken waar het profiel op secundaire aggregators en op gevolgtrekking leunde in plaats van op primaire bronnen. De technische kern (documentatie-gebaseerde claims over formaten, userfields, API-beveiliging, plan sets) hield onverkort stand.

### Per bewering

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Opgericht 1997, HQ Stavanger | **Bevestigd** (+ aangevuld: org.nr 879388252, reg. 16-12-1997, 29 werknemers) | [data.brreg.no/enhetsregisteret](https://data.brreg.no/enhetsregisteret/api/enheter?navn=Safran%20Software%20Solutions) |
| 2 | Overname door JDM aangekondigd **30 september 2021** | **Gecorrigeerd** → "eind sept./begin okt. 2021"; bronnen geven 30-09 (PR Newswire), 01-10 (Silverpeak) en 04-10 (EV PE). Eén exacte datum claimen is niet houdbaar | [silverpeakib.com](https://www.silverpeakib.com/silverpeak-advisors-on-risk-assessment-and-project-management-software-maker-safran-acquisition-by-jdm-technology-group/), [evprivateequity.no](https://www.evprivateequity.no/safran-software-solutions-acquired-by-jdm-technology-group/) |
| 3 | Eerdere eigenaar Progressus/EV Private Equity sinds 2012 | **Bevestigd** ("Progressus invested in 2012"; JDM verwierf volledige equity) | [evprivateequity.no](https://www.evprivateequity.no/safran-software-solutions-acquired-by-jdm-technology-group/) |
| 4 | ITQlick: $50/$400/$3.500/$30.000 per maand (okt 2024) | **Gecorrigeerd** — ITQlick heeft de staffel herzien naar **$150/gebruiker/mnd**, ~$1.200 (10 gebruikers), $10.000+ (100). De okt-2024-reeks is achterhaald | ITQlick-pagina's via zoekresultaten (directe fetch gaf HTTP 403) |
| 5 | Software Finder: "vanaf $150 per gebruiker/maand" | **Gecorrigeerd** — **foutieve toeschrijving**. Software Finder noemt géén bedrag ("Custom", "one-time license fee"); de $150 is van ITQlick | [softwarefinder.com](https://softwarefinder.com/project-management-software/safran-project) |
| 6 | SoftwareSuggest: $20 per gebruiker/maand (jul 2025) | **Gecorrigeerd** — pagina toont **geen bedrag meer**, alleen een offerteformulier. Cijfer ingetrokken | [softwaresuggest.com/safran-project](https://www.softwaresuggest.com/safran-project) |
| 7 | Capterra/Software Advice: £2.700 eenmalig, 3 reviews, 4,3/5 | **Bevestigd** (£2.700 "One Time", 3 reviews, 4,3/5). *Kanttekening: Capterra toont tegenstrijdig ook een "free version"-vlag; Software Finder zegt expliciet dat er geen gratis versie is — die laatste is gevolgd* | [capterra.com/p/139090](https://www.capterra.com/p/139090/Safran-Project/), [softwarefinder.com](https://softwarefinder.com/project-management-software/safran-project) |
| 8 | P6 Professional ≈US$2.750 perpetual + 22% onderhoud, EPPM hoger | **Gecorrigeerd** — $2.750 is de **EPPM** base per application user; **P6 Professional** wordt rond **$3.100–3.520** geoffreerd. De toevoeging "EPPM aanzienlijk hoger" is per-user onjuist | Resellerbronnen via zoekresultaten (o.a. projectmanagertemplate.com); geen Oracle-lijstprijs beschikbaar |
| 9 | Leverancier claimt **"unlimited activity capacity"** | **Gecorrigeerd** — frase **nergens vindbaar** (safran.com, docs.safran.com, zoekmachines: nul treffers). Wat Safran wél claimt is *"Manage an unlimited number of resources"* — resources, geen activiteiten | [safran.com/en-gb/project-management-scheduling-software](https://www.safran.com/en-gb/project-management-scheduling-software) |
| 10 | Tot **680 userfields** over 8 typen | **Bevestigd**, letterlijk: *"Safran Project lets you define up to 680 unique userfields… spread out over eight field types"* (o.a. 100 reference, 100 text, 100 flag, 30 outline codes, 50 computed) | [docs.safran.com/docs/userfields](https://docs.safran.com/docs/userfields) |
| 11 | Vanaf **v25.1** geen `.SP`/`.SPP` meer; XER-import één project per bestand | **Bevestigd**, letterlijk: *"From v25.1 \*.SP and \*.SPP is no longer supported"* en *"only one project can be imported at a time"* | [docs.safran.com/docs/importing-and-exporting-projects-1](https://docs.safran.com/docs/importing-and-exporting-projects-1) |
| 12 | `.SPX` is "het native formaat" | **Gecorrigeerd (nuance)** — `.SPX` is een **gedeeld** Project/Planner-uitwisselingsformaat (*"Both Safran Project and Safran Planner can read this format"*); Safran Project zelf slaat op in SQL Server/Oracle. Exportlijst: SPX v20.x, SPX v7.x, MS Project XML, XER — **geen PMXML, geen IFC** (claim bevestigd) | [docs.safran.com/docs/safran-project-exporting-data-from-a-safran-project-database](https://docs.safran.com/docs/safran-project-exporting-data-from-a-safran-project-database) |
| 13 | Integration API: Basic auth, **wachtwoorden in platte tekst** | **Bevestigd**, letterlijk: *"Basic authentication uses the database \"api_user\" table…"* en *"Be aware that the password is stored in plain text."* Dit is de scherpste nadeel-claim in het profiel en hij klopt woordelijk | [docs.safran.com/docs/safran-project-integration-api-basic-authentication](https://docs.safran.com/docs/safran-project-integration-api-basic-authentication) |
| 14 | Safran Risk vanaf 2015, door het oorspronkelijke Pertmaster-team; Pertmaster in 2006 door Primavera overgenomen | **Bevestigd** — Emerald Associates (onafhankelijke reseller/consultant): *"developed by the same team that developed Pertmaster"*; Primavera-persbericht 12-12-2006 over overname Pertmaster Ltd. | emerald-associates.com; Primavera-persbericht 12-12-2006 |
| 15 | Geen IFC/BIM/4D | **Bevestigd voor zover falsifieerbaar** — documentatie-index (llms.txt) bevat **geen** IFC-, BIM- of 4D-pagina; exportlijst bevat geen IFC. *Let op: de buildingSMART-implementatiepagina gaf bij hercontrole HTTP 403, dus dat deelbewijs is niet opnieuw geverifieerd — de conclusie rust nu op Safrans eigen documentatie* | [docs.safran.com/llms.txt](https://docs.safran.com/llms.txt) |
| 16 | MPXJ: Safran Risk importeert ".MPXJ"; MPXJ is Apache-gelicentieerd en leest/schrijft o.a. MPP en Asta | **Gecorrigeerd (drie fouten)** — (a) MPXJ is een **bibliotheek, geen bestandsformaat**, en er is **geen MPXJ-vermelding** in Safrans documentatie; (b) licentie is **LGPL-2.1, niet Apache** (*"MPXJ is distributed under the terms of the GNU LGPL"*) — relevant omdat deze opdrachtgever LGPL-3.0 is; (c) MPXJ **schrijft** alleen MPX, MSPDI, PMXML, XER, Planner en SDEF — MPP en Asta zijn **read-only** | [mpxj.org](https://www.mpxj.org/), [github.com/joniles/mpxj](https://github.com/joniles/mpxj) |
| 17 | Aker Solutions/Kristin: ~100 dagelijkse gebruikers | **Bevestigd**, letterlijk: *"On Kristin it was in the region of 100 people"* en *"networks of previously unmanageable sizes"* | [safran.com/case-studies/aker-solutions](https://www.safran.com/case-studies/aker-solutions) |
| 18 | Safran Cloud = beheerde **private** cloud, geen multi-tenant SaaS | **Bevestigd**, letterlijk: *"your own private and secure cloud… fully-managed by Safran experts"* | [safran.com/cloud](https://www.safran.com/cloud) |
| 19 | AppsRunTheWorld: 100% van klanten >1.000 medewerkers | **Onzeker → afgezwakt** — cijfer klopt, maar berust op **n=3** getraceerde klanten (Equinor, Aker Solutions, Aibel). Geen marktdata, hooguit een aanwijzing | [appsruntheworld.com](https://www.appsruntheworld.com/customers-database/products/view/safran-project) |
| 20 | Safran Risk "97% sneller dan OPRA" op basis van "onafhankelijk onderzoek" | **Onzeker (zoals al gemarkeerd)** — de claim staat woordelijk op safran.com (*"Independent study found Safran Risk runs 97% faster than OPRA (Pertmaster)"*), maar **het onderzoek zelf is nergens publiek** en de uitvoerder wordt niet genoemd. Blijft onverifieerbare leveranciersmarketing | safran.com/en-gb/ (homepage) |
| 21 | High-DPI-workaround via het compatibiliteitstabblad van de EXE | **Bevestigd**, letterlijk in de FAQ: *"Go to the Compatibility tab… Check the box for High DPI scaling override"* (geldt voor Risk, Project én Planner) | [docs.safran.com/docs/frequently-asked-questions](https://docs.safran.com/docs/frequently-asked-questions) |

### Wat dit betekent voor het gebruik van dit profiel

1. **De prijssectie is het zwakste deel en moet zo behandeld worden.** Van de vijf aggregatorcijfers hielden er na hercontrole twee stand, werd er één fout toegeschreven, verdween er één van de bronpagina en werd er één herzien. De aggregators zijn **onderling inconsistent én instabiel over de tijd**. De SCHATTING-bandbreedtes in §3 blijven staan als schatting, maar hun onderbouwing is nu aantoonbaar dunner dan de oorspronkelijke tabel suggereerde. Gebruik ze niet in een businesscase zonder offerte.
2. **De documentatie-gebaseerde claims zijn solide.** Alles wat rechtstreeks uit docs.safran.com kwam (680 userfields, v25.1-deprecatie, XER-één-project-per-import, plaintext API-wachtwoorden, exportformaten) is woordelijk bevestigd. Dat is de betrouwbare kern van dit profiel.
3. **Twee claims waren "te mooi geformuleerd" en zijn teruggebracht:** "unlimited activity capacity" (bestaat niet als vendorclaim) en de MPXJ-passage (drie fouten in één alinea, waarvan de licentiefout Apache→LGPL-2.1 direct relevant is voor de architectuurkeuzes van deze opdrachtgever).
4. **Het bedrijf is kleiner dan het profiel impliceerde:** 29 werknemers volgens het Noorse handelsregister. Dat versterkt de nadelen rond ecosysteem, talentenpool en roadmap-tempo (§5.8, §7) — en het maakt de "stabiel tot licht krimpend"-inschatting in §7 eerder aan de voorzichtige kant.

### Beperkingen van deze verificatieronde

- **Drie bronnen waren niet direct fetchbaar** en zijn via zoekresultaat-snippets gecontroleerd in plaats van via de volledige pagina: ITQlick (HTTP 403), buildingSMART implementatieregister (HTTP 403) en de Noorse bedrijvenzoeker proff.no (HTTP 503). De op die bronnen gebaseerde oordelen (#4, #8, #15) zijn daarmee **iets zwakker onderbouwd** dan de rest.
- **Het budget voor zoekopdrachten was uitgeput** bij aanvang; verificatie is uitgevoerd met directe URL-fetches plus een alternatieve zoekingang. Enkele randbeweringen zijn daardoor **niet** getoetst, met name: de vier-datumsets-terminologie (Original/Baseline/Current/Live) als exacte Safran-benaming, de ".NET 8.0 Core"-versie van de Integration API, de concurrentenlijst in §7 en de reviewer-achtergronden in §5.7. Die staan onveranderd en blijven **ongeverifieerd**, niet bevestigd.
- **Geen enkele prijs is vendor-bevestigd.** Er is opnieuw geen prijslijst, geen aanbestedingsdocument en geen offerte-artefact gevonden. Dat is na twee onderzoeksrondes een robuuste negatieve bevinding: **Safran publiceert werkelijk geen prijzen.**
