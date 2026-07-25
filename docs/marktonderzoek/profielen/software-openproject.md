# OpenProject — diepgaand softwareprofiel

**Onderzoeksdatum:** 25 juli 2026
**Onderzochte versie:** OpenProject 17.6.0 (uitgebracht 8 juli 2026)
**Categorie:** Open-source project- en portfoliomanagement (PPM) / werkbeheer met Gantt
**Korte typering:** Duitse open-source PM-suite met een balkenschema en FS-afhankelijkheden — **géén echte CPM-netwerkplanner**.

> **Methodologische opmerking (transparantie):** dit profiel is opgebouwd uit directe WebFetch-onderzoek op de leverancierssite, de officiële documentatie, Wikipedia, GitHub (inclusief code-search in de broncode) en reviewaggregatoren. Het WebSearch-budget van de sessie was uitgeput; daarnaast blokkeerden **G2, TrustRadius, Gartner Peer Insights, Capterra en Reddit** geautomatiseerde toegang (HTTP 403/404). De gebruikerssentiment-sectie steunt daarom op GetApp/Software Advice (188 reviews), SourceForge/Slashdot en de officiële documentatie zelf. Dat is een echte beperking en wordt hieronder per punt gemarkeerd. Waar een uitspraak een eigen inschatting is, staat er expliciet **[SCHATTING]**.

---

## 1. Wat het is

### Leverancier en eigendom

| Aspect | Gegeven |
|---|---|
| Commerciële entiteit | **OpenProject GmbH** (Duitsland, Berlijn) |
| Stichting | **OpenProject Foundation** — opgericht oktober 2012, geregistreerd als Duitse vereniging (e.V.) juni 2013 |
| Oprichter/CEO | Niels Lindenthal |
| Licentie | **GNU GPL v3** (echte copyleft-open-source, geen "open core met gesloten kern") |
| Technologie | Ruby on Rails (backend), Angular (frontend), PostgreSQL 16+ |
| Organisatie | Remote-first; team verspreid over Duitsland, Frankrijk, VK, Spanje, Griekenland, VS, Nepal, Kenia, Panama, Roemenië |
| Laatste release | 17.6.0 (8 juli 2026); maandelijkse tot zeswekelijkse releasecadans |

### Historie

OpenProject is in **2010** ontstaan als fork van **ChiliProject**, dat zelf een fork was van **Redmine** — de klassieke Ruby-issue-tracker. De fork werd gemotiveerd door zaken die niet via plug-ins op te lossen waren: prestaties, beveiliging en toegankelijkheid. Versie 1.0 verscheen op 4 oktober 2012.

Die afstamming is geen trivia: **het verklaart de architectuur van vandaag.** OpenProject is in de kern een issue-tracker met een datummodel eromheen. De centrale entiteit heet nog altijd *work package* (werkpakket) — een ticket met een status, een type, een toegewezen persoon en optioneel een begin- en einddatum. Het is géén activiteitennetwerk dat vanuit een planningsalgoritme is opgebouwd. Alles in sectie 2 volgt uit dit ene feit.

Belangrijke commerciële/institutionele mijlpaal: in **april 2025** nam **BWI** (de IT-dienstverlener van de Duitse Bundeswehr) OpenProject in gebruik binnen de Bundeswehr, als onderdeel van **openDesk** — het Microsoft-365-alternatief voor de publieke sector dat wordt ontwikkeld door **ZenDiS** (Zentrum für Digitale Souveränität), een door de Duitse federale overheid gefinancierde GmbH. OpenProject is daarmee de projectmanagement-component van de Duitse soevereine-werkplek-stack.

### Business model

Eén codebase, twee edities:

- **Community Edition** — gratis, GPLv3, self-hosted, onbeperkt aantal gebruikers, volledige broncode.
- **Enterprise Edition** — dezelfde codebase, extra functies ontgrendeld met een **licentiesleutel**. Beschikbaar als Enterprise cloud (gehost door OpenProject, EU-datacenters) of Enterprise on-premises.

Dit is een eerlijker open-core-model dan bij veel concurrenten: de Community Edition is een volwaardig, bruikbaar product en niet een uitgeklede demo. De paywall zit op governance-, integratie- en portfolio-functies, niet op de kernplanning.

### Doelgroep, typische gebruikers, sectoren en regio's

**Primaire doelgroep:** organisaties die om redenen van *datasoevereiniteit, privacy of licentiekosten* geen SaaS uit de VS willen of mogen gebruiken. Dat is de kern van de propositie, sterker dan enige functionele claim.

**Sectoren en referentieklanten** (van openproject.org, opgehaald 25-07-2026):

- **Publieke sector:** Stadt Köln, Landratsamt Enzkreis, Charité Berlin, Bundeswehr/BWI via openDesk
- **Grootbedrijf:** Siemens, Deutsche Bahn, Fraunhofer-Gesellschaft, AMG
- **Onderwijs/onderzoek:** Hochschule Coburg, KSat e.V. Stuttgart (CubeSat SOURCE)
- **Non-profit/NGO:** Greenpeace, fLotte Berlin
- **Tech:** Linux Foundation

**Regio's:** zwaartepunt onmiskenbaar **DACH (Duitsland, Oostenrijk, Zwitserland)**, met uitloop naar de rest van de EU. De Duitse overheidsband (openDesk/ZenDiS), de EUR-prijzen, de CET-supporttijden en het lidmaatschap van PM² Alliance, Open Source Business Alliance, FSFE, NOYB — en, *aanvullend geverifieerd*, Open Source Initiative (OSI) en CH Open — bevestigen dat. Buiten Europa is OpenProject vooral bekend als "de open-source Jira-vervanger", niet als planningstool.

**Typische gebruiker:** een IT-, R&D- of interne-projectenafdeling van 25–500 medewerkers, met een mix van agile en klassieke projecten, en een IT-afdeling die zelf een Docker- of Kubernetes-stack kan draaien. **Niet** een planner op een bouwplaats.

---

## 2. Functionaliteit en techniek — strenge beoordeling

Dit is de sectie die telt. De opdracht vraagt expliciet om streng te zijn over tools die "alleen een balkenschema tekenen zonder echte netwerkplanning". **OpenProject is precies zo'n tool.** Hieronder puntsgewijs onderbouwd uit de officiële documentatie en de broncode.

### 2.1 CPM-engine: NEE — en dat is geen grijs gebied

**OpenProject heeft geen Critical Path Method-engine.** Onderbouwing, cumulatief:

1. **De documentatie noemt "kritiek pad" nergens.** De Gantt-documentatie en de scheduling-documentatie bevatten geen enkele vermelding van critical path, CPM, float, slack, early/late dates of network analysis.
2. **Alleen een forward pass.** De automatische planningsmodus berekent: *"an automatically-scheduled work package with predecessors will automatically start one working day after the finish date of the nearest predecessor."* Dat is een voorwaartse doorrekening. Er is **geen backward pass**, dus er zijn geen late start / late finish-data. Zonder late dates is er per definitie **geen total float**, en zonder total float is er **geen kritiek pad**.
3. **Geen float- of slack-veld.** Er bestaat geen attribuut voor totale of vrije speling op een werkpakket — noch in de UI, noch in de API-resource, noch als filterbare kolom.
4. **Geen spoor van CPM in de broncode.** Een code-zoekopdracht op `repo:opf/openproject` levert 0 treffers voor CPM-begrippen. ⚠️ **Gecorrigeerd na verificatie:** een eerdere versie van dit profiel voerde hier "0 feature requests *critical path* op GitHub" op als bewijs dat het "niet op de bouwlijst staat". Die redenering is ongeldig: **GitHub Issues staan uit op `opf/openproject`** (`has_issues: false`, GitHub API 25-07-2026). Er kúnnen daar dus geen feature requests staan. OpenProject beheert zijn backlog op `community.openproject.org` — dat vereist login en is in dit onderzoek niet toegankelijk geweest. De juiste formulering is: *er is geen publiek verifieerbaar bewijs dat CPM gepland staat*, niet *het staat aantoonbaar niet gepland*. De afwezigheid in de documentatie en in zeven opeenvolgende 17.x-releases blijft wél gedegen onderbouwd.
5. **De roadmap gaat een andere kant op.** Release 17.0.0 (januari 2026) — het grootste release van het jaar — leverde realtime document-collaboratie, Programs & Portfolios, meeting-management en een herontworpen projecthome. **Nul** scheduling-, Gantt-, afhankelijkheids- of resourcefuncties.

**Wat OpenProject wél doet** is *dependency propagation*: als je een voorganger verschuift, schuiven automatisch geplande opvolgers mee. Dat is nuttig, maar het is een fundamenteel andere klasse dan CPM. Het beantwoordt "wat schuift er mee?" en niet "welke keten bepaalt de einddatum, en hoeveel ruimte heeft de rest?".

**Verdict: dit is een balkenschema met kettingdoorschuiving, geen netwerkplanning.**

### 2.2 Afhankelijkheidstypen: alleen FS

OpenProject kent **zeven** relatiesoorten (paren) tussen werkpakketten — *gecorrigeerd: een eerdere versie schreef "acht", terwijl de onderstaande tabel en de documentatie er zeven noemen*:

| Relatie | Beïnvloedt datums? |
|---|---|
| **Predecessor (voorganger) / Successor (opvolger)** | **JA** — de enige |
| Parent / Child (hiërarchie) | Ja, maar via rollup, niet als netwerklogica |
| Related to | Nee |
| Duplicates / Duplicated by | Nee |
| Blocks / Blocked by | Nee (alleen statuswijzigingen) |
| Includes / Part of | Nee |
| Requires / Required by | Nee |

De documentatie is expliciet: *"The predecessor/successor relation is the only one that can constrain or affect the dates of work packages."*

Die ene relatie is **uitsluitend Finish-to-Start**. De documentatie noemt start-to-start, finish-to-finish en start-to-finish **nergens**, en de rekenregel ("begint één werkdag na de finish van de dichtstbijzijnde voorganger") is hardgecodeerd FS.

**Consequenties voor bouwplanning — dit is ernstig:**

- **Geen SS met lag** → je kunt geen overlappende ploegen modelleren. "Wapening start 3 dagen na start bekisting" is niet uitdrukbaar.
- **Geen FF** → "afbouw klaar tegelijk met oplevering installaties" is niet uitdrukbaar.
- **Geen SF** → zeldzaam, maar bij ploegenwissels en just-in-time-logistiek wel gebruikt.
- Er is **wel lag** (in werkdagen, positief én negatief) op de FS-relatie. Negatieve lag is een noodgreep waarmee je overlap kunt *nabootsen*, maar het is geen SS: de logica breekt zodra de duur van de voorganger verandert, want de overlap is absoluut in plaats van relatief aan het startpunt.

Voor lijnvormige of gefaseerde bouwwerken (wegen, tunnels, verdiepingsgewijze afbouw) — waar SS/FF met lag de standaardgrammatica is — is een FS-only model **praktisch onbruikbaar**.

### 2.3 Constraints: afwezig

Er zijn **geen datumbeperkingen** in de MS-Project/P6-zin: geen *Start No Earlier Than*, *Finish No Later Than*, *Must Start On*, *As Late As Possible*, geen deadlines met negatieve-speling-signalering.

Wat er in de plaats komt is de tweedeling **manual vs. automatic scheduling** per werkpakket:

- **Manual (standaard):** jij zet de datums; relaties bestaan wel maar doen niets. *"Manually-scheduled work packages can still have predecessor, successor, parent or child relations, but these relations will not affect the manually input dates."*
- **Automatic:** datums worden afgeleid van voorgangers of kinderen; je kunt ze niet meer zelf zetten (wel de duur).

Dat is in feite een binaire "pin dit vast"-schakelaar, geen constraint-model. Er is geen manier om te zeggen "start niet vóór de vergunningsdatum, maar schuif verder gerust op". **[SCHATTING]** In de praktijk betekent dit dat planners het merendeel van hun werkpakketten op *manual* zetten om controle te houden — waarmee het hele netwerk inert wordt en de Gantt degradeert tot een handmatig getekend staafdiagram.

Merk ook op dat *manual* de **standaard** is. OpenProject is dus out-of-the-box een tekentool, en netwerkgedrag is opt-in per taak.

### 2.4 Kalenders: instance-breed, en dat is een harde blokkade

Dit is misschien wel de meest onderschatte beperking.

Werkdagen worden ingesteld onder **Administration → Calendar and dates**: werkdagen (standaard ma–vr), uren per dag (standaard 8), en losse niet-werkdagen/feestdagen die je per stuk toevoegt.

De documentatie waarschuwt letterlijk:

> *"As an instance-level setting, any change here will affect the scheduling of all work packages in all projects."*

En:

> *"Changing this setting will reschedule work packages automatically"* — wat *"a couple of minutes to hours"* kan duren en een lawine aan notificaties genereert.

Dat betekent concreet:

- **Eén kalender voor de hele installatie.** Geen kalender per project.
- **Geen kalenders per resource of per ploeg.** Geen weekendploeg, geen 2- of 3-ploegendienst, geen 6-daagse werkweek naast een 5-daagse.
- **Geen kalenders per taak** anders dan één binaire ontsnappingsklep: een "working days only"-schakelaar per werkpakket die niet-werkdagen volledig negeert (dus 7-daags rekent). Alles of niets.
- **Geen shift patterns, geen uurroosters, geen seizoenskalenders.**

Voor een internationale organisatie is dit al pijnlijk (Duitse feestdagen gelden dan ook voor het Spaanse team). Voor bouw — waar betonstorten in het weekend doorloopt, waar onderaannemers verschillende werkweken hebben en waar winterstops per discipline verschillen — is het **diskwalificerend**.

### 2.5 Resourcemodel: officieel niet aanwezig

Hier hoef ik niet te interpreteren; de eigen documentatie zegt het:

> *"OpenProject currently does not yet support resource management."*

met de toevoeging dat resourcemanagement *"is scheduled in our roadmap as one of main topics"* — een belofte die, gezien de inhoud van release 17.0.0, in juli 2026 nog niet is ingelost.

Wat ontbreekt:
- Geen resourcepool met capaciteiten
- Geen toewijzingspercentages of eenheden
- Geen overallocatiedetectie
- Geen resource leveling of smoothing
- Geen resourcehistogram
- Geen effort-driven scheduling (duur volgt niet uit werk ÷ inzet)
- Geen kalenders per resource (zie 2.4)

Wat er wél is: een werkpakket heeft één **assignee** (en een accountable), er is **tijdregistratie**, en er is een **Team planner** (Enterprise add-on) die toewijzingen per persoon op een tijdlijn toont. Dat laatste is een *visualisatie* van wie wat wanneer doet — geen capaciteitsberekening. Het waarschuwt niet als iemand 300% belast is.

Reviewers bevestigen dit onafhankelijk: *"The budgeting and resources management feature is cumbersome and lacks resource status notification"* (Software Advice/GetApp).

### 2.6 Kostenmodel: aanwezig maar ondiep

Het **Budgets**-module kan wel wat:

- **Cost types** met een prijs per eenheid, systeembreed geconfigureerd
- **Planned unit costs**: eenheden × prijs per eenheid
- **Planned labor costs**: uren × uurtarief van de gebruiker (tarieven kunnen per datumbereik verschillen)
- Werkelijke kosten worden geboekt via tijdregistratie en unit-boekingen op werkpakketten die aan een budget hangen
- Toont het bestede percentage van het budget

Beperkingen:

- *"Budgets are currently limited to a single project"* — **geen budgetconsolidatie over projecten heen**. Voor een aannemer met een projectenportefeuille is dat een showstopper op programmaniveau.
- **Geen Earned Value Management.** Geen PV/EV/AC, geen CPI/SPI, geen prognose bij voltooiing (EAC). Voor overheidsopdrachten die EVM contractueel eisen (Amerikaanse en steeds vaker Europese infrastructuurprogramma's) is dat direct diskwalificerend.
- **Geen cashflow-curve over de tijd**, geen S-curve uit het budget.
- Geen kostenresourcetypen los van uur- en eenheidsprijzen.

### 2.7 Baselines: het is geen baseline

OpenProject noemt zijn functie "Baseline", maar dat is een ongelukkige naam. Het is een **"wat is er veranderd sinds datum X"-diff** op de werkpakkettabel, geen bevroren momentopname van de planning.

- Het toont welke werkpakketten sinds een referentiemoment zijn **toegevoegd, verwijderd of gewijzigd**.
- **Community Edition:** alleen "changes since yesterday".
- **Enterprise:** presets (gisteren, laatste werkdag, vorige week, vorige maand), specifieke datums en aangepaste bereiken.

Harde beperkingen uit de documentatie:

1. Het is geen opgeslagen, benoembare snapshot die je later kunt terughalen of naast meerdere andere baselines kunt leggen.
2. **Filterafhankelijk** — de vergelijking geldt alleen binnen dezelfde filtercontext; verander je het filter, dan verandert de uitkomst.
3. **Verwijderde werkpakketten zijn onzichtbaar**, want verwijderhistorie wordt niet bewaard.
4. Oude waarden verschijnen alleen voor **zichtbare kolommen**.
5. Sommige attributen hebben geen wijzigingshistorie (watchers, bijlagen, opmerkingen).

Wat je hiermee **niet** kunt: meerdere genummerde baselines aanhouden (BL0, BL1, revisie na claim), baseline-versus-actueel-variantie per taak rapporteren, of een vertragingsanalyse (delay/disruption) onderbouwen. In een contractuele bouwomgeving, waar de baseline hét juridische ankerpunt van elke claim is, is dit **volstrekt ontoereikend**.

### 2.8 Voortgang en WBS

- Voortgang via **% complete**, met een keuze tussen statusgebaseerde en werkgebaseerde voortgangsmodus; velden **Work** en **Remaining work**; rollup naar ouders.
- Hiërarchie via parent/child, wat feitelijk als **WBS** dient. Er is geen apart, hernummerbaar WBS-codeveld zoals in P6 of MS Project; de structuur is de boom zelf.
- **Milestones** bestaan als apart werkpakkettype en worden als ruit getoond.
- **Phases** bestaan als type met een periode.

### 2.9 Rendering en de Gantt zelf

De Gantt is een Angular-component (DOM/SVG), geen canvas. Functioneel:

- Slepen om datums te verzetten; randen slepen om de duur te wijzigen
- Blauwe lijnen voor voorganger/opvolger-relaties
- Rode stippellijn voor vandaag
- Zwarte/rode "clamps" voor het datumbereik van ouders
- Ruiten voor mijlpalen
- Niet-werkdagen donkerder gearceerd bij dag-zoomniveau
- Zoomknoppen plus auto-zoom, en een zen-modus voor volledig scherm
- Labelposities configureerbaar (links, rechts, uiterst rechts)
- **PDF-export van de Gantt is een Enterprise add-on**; anders print je via de browser (*"optimized for Chrome"*)

### 2.10 Platform en schaalbaarheid

Officiële richtlijnen (docs, opgehaald 25-07-2026). *Gecorrigeerd:* de tabel is in de documentatie geschaald op **totaal aantal actieve gebruikers**, met daarbij de kanttekening dat het werkelijke verbruik sterk van het aantal **gelijktijdige** gebruikers afhangt — niet, zoals een eerdere versie stelde, primair op gelijktijdige gebruikers:

| Gebruikers | CPU | RAM | Web workers |
|---|---|---|---|
| ≤ 200 | 4 cores (≥2 GHz) | 4 GB | 2 |
| ~500 | 8 | 8 GB | 4 |
| ~1500 | 16 | 16 GB | 8 |

- Minimaal 20 GB schijf; per ~500 extra gebruikers +20–50 GB.
- **PostgreSQL 16 of hoger** is officieel vereist sinds OpenProject 16.0.0 (13–15 werken mogelijk maar zonder support); migratie naar 17 aanbevolen. Extensies `pg_trgm`, `btree_gist`, `unaccent` vereist.
- Deployment: **Docker** (AMD64 + ARM64, aanbevolen), pakketten (.deb/.rpm voor Ubuntu 20.04–22.04, Debian 11–12, RHEL/CentOS 9.x, SLES 15), **Kubernetes via Helm** voor horizontaal schaalbare omgevingen. *Genuanceerd:* de documentatie noemt **80.000–100.000 gebruikers** als **voorbeeldconfiguratie** voor enterprise-multitenancy, niet als officieel maximum — er wordt geen bovengrens gepubliceerd.
- **Windows Server wordt niet ondersteund.**
- Horizontaal schalen vereist gedeelde externe PostgreSQL, memcached en gedeelde opslag (NFS).
- Browsers: alleen de laatste versies van Firefox, Edge, Chrome, Safari.

**Realistisch aantal taken — [SCHATTING], niet gedocumenteerd:** OpenProject publiceert geen limieten op werkpakketten. Op basis van de architectuur (PostgreSQL-backend, gepagineerde tabelweergaven, DOM-gebaseerde Gantt-rendering, en nested-set/closure-achtige hiërarchie-updates in Rails):

- **Per instance:** honderdduizenden werkpakketten zijn haalbaar, mits goed geïndexeerd en met voldoende RAM. De database is niet het knelpunt.
- **Per Gantt-weergave:** hier zit de pijn. **[SCHATTING]** enkele honderden tot circa **1.000 werkpakketten** blijft vlot; daarboven wordt DOM-rendering merkbaar traag en wordt de weergave onwerkbaar. Een klassiek P6-bouwschema van 20.000–50.000 activiteiten in één netwerk is **buiten bereik** — niet zozeer omdat de opslag het niet aankan, maar omdat er geen algoritme is dat er iets zinnigs mee doet en geen weergave die het toont.
- De grootste praktische rem is niet volume maar de globale herplanning: één wijziging in de instance-brede werkdagen kan *"a couple of minutes to hours"* rekenen — een indicatie dat de herplanningsroutine niet op grote netwerken is geoptimaliseerd.

### 2.11 Samenvattend technisch oordeel

| Kenmerk | Aanwezig? |
|---|---|
| Echte CPM-engine (forward + backward pass) | **Nee** |
| Kritiek pad | **Nee** |
| Total/free float | **Nee** |
| FS-afhankelijkheid | Ja |
| SS / FF / SF | **Nee** |
| Lag (positief/negatief) | Ja, in werkdagen, alleen op FS |
| Datumconstraints (SNET/FNLT/MSO/ALAP) | **Nee** |
| Kalenders per project | **Nee** (alleen instance-breed) |
| Kalenders per resource/ploeg | **Nee** |
| Resourcecapaciteit / overallocatie | **Nee** (officieel bevestigd) |
| Resource leveling | **Nee** |
| Effort-driven scheduling | **Nee** |
| Kostenmodel | Beperkt (unit + labor; single-project) |
| Earned Value Management | **Nee** |
| Echte baselines | **Nee** (alleen een diff) |
| Mijlpalen / fasen / WBS-hiërarchie | Ja |
| Voortgang (% compleet, work/remaining) | Ja |
| Gantt met drag & drop | Ja |

---

## 3. Prijzen

Alle bedragen van **https://www.openproject.org/pricing/**, opgehaald **25 juli 2026**. Prijzen in **EUR, per gebruiker per maand, bij jaarbetaling**. Dezelfde prijzen gelden voor Enterprise cloud én Enterprise on-premises.

### Hoofdstaffel

| Plan | Prijs p/gebruiker/maand | Minimum gebruikers | Indicatie jaarbedrag bij minimum **[berekend]** | Support |
|---|---|---|---|---|
| **Community** | **€0** | geen minimum | €0 | Community (forum/tickets) |
| **Basic** | **€5,95** | **25** | €1.785/jaar | E-mail, ma–vr 9:30–16:00 CET |
| **Professional** | **€10,95** | **25** | €3.285/jaar | + telefoon, ma–vr 9:30–17:00 CET |
| **Premium** | **€15,95** | **100** | €19.140/jaar | + remote hands, installatiehulp, ma–vr 9:30–17:30 CET |
| **Corporate** | **op aanvraag** | **250** | n.t.b. | + toegewijde support-engineer + onboardingmanager (3 uur inbegrepen) |

*Jaarbedragen zijn mijn eigen vermenigvuldiging (prijs × minimum gebruikers × 12), niet door OpenProject zo gepubliceerd.*

### Contractduur en kortingen

| Looptijd | Effect |
|---|---|
| 1 maand | **+€1,00 per gebruiker per maand** opslag |
| 1 jaar | standaardtarief (bovenstaande bedragen) |
| 2 jaar | **5 maanden gratis** |
| 3 jaar | **8 maanden gratis** |
| 4 jaar | **11 maanden gratis** |
| 5 jaar | **15 maanden gratis** |

De meerjarenkortingen zijn agressief: bij 5 jaar betaal je effectief 45 van 60 maanden — een korting van **25%**.

### Voorwaarden

- Gebruikers worden in **stappen van 5** afgenomen.
- **Upgrades** kunnen op elk moment (pro rata verrekend); **downgrades** pas aan het einde van de abonnementsperiode.
- **Proefperiode:** 14 dagen gratis, zowel cloud als on-premises (via proeflicentiesleutel).

### Add-ons

| Add-on | Prijs | Bron |
|---|---|---|
| **BIM** (als add-on op een Enterprise-plan) | **+€1,00 per gebruiker per maand** | openproject.org/pricing, 25-07-2026 |
| **BIM Edition** (zelfstandig product) | **€6,95 per lid per maand**, jaarlijks gefactureerd, **minimaal 5 gebruikers** (≈ €417/jaar) | openproject.org/bim-project-management/, 25-07-2026 |

> **Let op de inconsistentie:** de prijspagina noemt BIM als €1,00-add-on bovenop een Enterprise-plan (dus vanaf 25 gebruikers), terwijl de BIM-productpagina een zelfstandig pakket van €6,95/gebruiker/maand met slechts 5 gebruikersminimum adverteert. Dit zijn kennelijk twee verschillende inkooproutes. Voor een klein bouwbureau is de **zelfstandige BIM Edition (5 gebruikers, ≈€417/jaar)** verreweg de goedkoopste ingang. Verifieer dit bij verkoop vóór budgettering.

### Prijsobservaties

- **De minimumafname is de echte drempel.** Een team van 8 kan niet voor 8 zetels op Basic; je betaalt er 25. Effectieve instapprijs Enterprise = **€1.785/jaar**, ongeacht teamgrootte. Voor kleine bureaus is Community daarmee de facto de enige optie.
- **Premium springt naar 100 zetels.** De sprong van Professional (25 min.) naar Premium (100 min.) is een factor 5,8 in jaarbedrag. Functies als **LDAP-groepssynchronisatie** en **portfoliomanagement** zitten in Premium — organisaties die alleen LDAP-sync nodig hebben moeten dus naar ≥100 zetels.
- **Prijs-kwaliteit in absolute zin is uitstekend.** €5,95–€15,95 per gebruiker per maand ligt onder Jira Premium, ver onder Smartsheet Business en in een andere wereld dan Primavera P6 EPPM of MS Project Plan 5.
- **Community is echt gratis en echt bruikbaar.** Onbeperkte gebruikers, volledige Gantt, volledige API, volledige BIM-viewer via de open BIM-module. De kostenbarrière is nul; de kosten zitten in hosting en beheer.
- **Derde-partijnotering:** SourceForge en Slashdot vermelden "vanaf €247,50 per jaar" (geverifieerd aanwezig, 25-07-2026). Dat komt met geen enkele huidige staffel overeen en is **verouderd**; negeren. Ondersteunende afleiding: €247,50 = 5 gebruikers × €4,95/maand × 10 maanden — precies de oude OpenProject-staffel (minimum 5 zetels, jaarbetaling met 2 maanden gratis) van vóór de huidige 25-zetelsminima. Dat verklaart het bedrag en bevestigt dat het een legacy-notering is.

### TCO-kanttekening **[SCHATTING]**

Voor de Community Edition is de licentie €0, maar de werkelijke kosten zijn niet nul: server (of Kubernetes-cluster), PostgreSQL-beheer, back-ups, TLS, updates elke 4–6 weken, en een beheerder die Rails-deployments begrijpt. **[SCHATTING]** reken op 0,1–0,3 FTE beheer voor een middelgrote installatie, ofwel grofweg €8.000–€25.000 per jaar aan interne kosten — wat voor teams onder ~30 gebruikers duurder uitpakt dan de Enterprise-cloud. Dat is precies de rekensom waarmee OpenProject GmbH zijn cloud verkoopt.

---

## 4. Voordelen

1. **Echte, volledige open source onder GPLv3 — geen open-core-schijnvertoning.** Community en Enterprise delen één codebase; Enterprise-functies worden ontgrendeld met een sleutel. De gratis editie is geen uitgeklede demo maar een productieklaar product met onbeperkte gebruikers, volledige Gantt, volledige REST-API en de BIM-module. Voor een organisatie die vendor lock-in structureel wil vermijden is dit een fundamenteel ander risicoprofiel dan bij SaaS-concurrenten.

2. **Datasoevereiniteit en publieke-sector-geloofwaardigheid van het hoogste niveau.** On-premises deployment, EU-hosting, GDPR-conform, en — doorslaggevend — opname in **openDesk**, de door ZenDiS ontwikkelde soevereine werkplek van de Duitse federale overheid, met uitrol bij de **Bundeswehr via BWI** (april 2025). Voor Europese overheden die aantoonbaar van Amerikaanse cloud af moeten, is dat een referentie die geen concurrent kan evenaren. Ook Stadt Köln, Charité en Landratsamt Enzkreis staan als publieke referenties.

3. **Uitzonderlijk gunstige prijs per functie.** €5,95–€15,95 per gebruiker per maand voor een suite met Gantt, boards, tijdregistratie, kostenbudgetten, wiki, meetings, documenten en portfolio's ligt structureel onder Jira, Smartsheet en Wrike, en is niet vergelijkbaar met de kosten van P6 of MS Project. Meerjarenkortingen tot 25% (5 jaar = 15 maanden gratis) versterken dat.

4. **Zeer brede functionele dekking buiten de planning om.** Eén platform voor werkpakketten, agile boards, Kanban, sprints, wiki, documenten met realtime co-editing (nieuw in 17.0), notulen/meetings, tijd- en kostenregistratie, en sinds 17.0 **Programs & Portfolios**. Voor een organisatie die vijf losse tools wil consolideren is dat een reële besparing — ook aan integratiewerk.

5. **Volwassen, goed gedocumenteerde REST-API met hypermedia-ontwerp.** APIv3 is HAL+JSON met HATEOAS, OAuth 2.0 (met RFC 8414/9728 discovery), webhooks, en **SCIM** (RFC 7643/7644) voor identity provisioning. Daarnaast een officiële CLI (`opf/openproject-cli`), een Excel-synchronisatie-add-in en een Python-bibliotheek. Voor een integratiepartij is dit uitstekend gereedschap; wat de UI niet kan, kun je zelf bouwen.

6. **Werkelijk open BIM-koppeling via BCF.** De BIM-editie bevat een browsergebaseerde IFC-viewer (meerdere modellen tegelijk, 2D/3D, doorsneden, model tree, property inspector) én een **BCF v2.1 REST-API** plus BCF-XML import/export. Issues op modelelementen zijn dus uitwisselbaar met Solibri, BIMcollab, Navisworks en Revit (er is een officiële Revit-add-in). Voor issue-management is dit echte, standaardconforme interoperabiliteit — en het draait zonder dure viewerlicenties.

7. **Goede zelfhosting-ergonomie en bewezen horizontale schaalbaarheid.** Docker-images voor AMD64 én ARM64, .deb/.rpm-pakketten, en **Helm-charts voor Kubernetes tot 80.000–100.000 gebruikers**. Systeemeisen zijn bescheiden (4 CPU / 4 GB voor 200 gebruikers). Voor een IT-afdeling met containerervaring is dit een van de makkelijker self-hosted enterprise-apps.

8. **Consistente, snelle releasecadans en een levendig project.** 17.0.0 (jan 2026) t/m 17.6.0 (juli 2026) — ongeveer maandelijks. **15.666 GitHub-sterren, 3.381 forks, 284 contributors, 20M+ downloads** geclaimd (25-07-2026). Dat is geen hobbyproject dat morgen kan verdwijnen; er zit een commercieel bedrijf met betalende overheidsklanten achter.

9. **Sterke gebruikerswaardering in de breedte.** 4,6/5 over **188 geverifieerde reviews** op GetApp/Software Advice, met slechts 2 reviews van 1–2 sterren. Gebruikers prijzen de functieomvang, aanpasbaarheid en prijs-kwaliteit. Het product frustreert zijn doelgroep dus niet — mits die doelgroep geen CPM nodig heeft.

10. **Ingebouwde meertaligheid en toegankelijkheidsambitie.** Vertalingen via een apart community-project (`opf/openproject-translations`); toegankelijkheid was een van de oorspronkelijke motieven voor de fork uit ChiliProject — relevant omdat EU-overheden aan WCAG/EN 301 549 moeten voldoen.

---

## 5. Nadelen

1. **Geen CPM-engine, geen kritiek pad, geen float — de kernfunctie van planningssoftware ontbreekt.** Er is uitsluitend een forward pass ("start één werkdag na de finish van de dichtstbijzijnde voorganger"); geen backward pass, dus geen late dates, dus geen totale speling, dus geen kritiek pad. De documentatie noemt CPM nergens en de broncode bevat geen CPM-begrippen. *Gecorrigeerd:* de eerder gebruikte onderbouwing "0 feature requests *critical path* op GitHub" is **geschrapt als bewijs** — GitHub Issues staan uit op `opf/openproject` (`has_issues: false`), dus die nul zegt niets; de backlog staat op het login-afgeschermde `community.openproject.org`. Dat CPM *niet gepland* zou zijn is daarmee **niet publiek verifieerbaar**; dat het er *nu niet is*, staat wel vast. Wie moet kunnen antwoorden op "welke keten bepaalt mijn einddatum en hoeveel ruimte heeft de rest?" krijgt van OpenProject geen antwoord — alleen een balkenschema dat meeschuift.

2. **Alleen Finish-to-Start-afhankelijkheden; geen SS, FF of SF.** Van de acht relatietypen beïnvloedt er precies één de datums, en die is hardgecodeerd FS. Overlappende werkzaamheden — de kern van elke bouw- of infraplanning — zijn alleen na te bootsen met negatieve lag, wat breekt zodra de duur van de voorganger verandert (de overlap is absoluut, niet relatief). Voor gefaseerde of lijnvormige werken is dit praktisch onbruikbaar.

3. **Eén werkdagenkalender voor de hele installatie.** De documentatie is expliciet: *"any change here will affect the scheduling of all work packages in all projects."* Geen kalender per project, per resource, per ploeg of per discipline; geen shift patterns; alleen een binaire per-taak-ontsnappingsklep die niet-werkdagen volledig negeert. Weekendploegen, tweeploegendiensten, verschillende onderaannemerskalenders en per-land-feestdagen zijn niet te modelleren. Bovendien kan het wijzigen van deze instelling *"a couple of minutes to hours"* herplanning kosten en een notificatielawine veroorzaken.

4. **Resourcemanagement bestaat officieel niet.** Niet mijn conclusie maar hun eigen documentatie: *"OpenProject currently does not yet support resource management."* Geen capaciteiten, geen toewijzingspercentages, geen overallocatiewaarschuwingen, geen leveling, geen histogram, geen effort-driven scheduling. De Enterprise "Team planner" visualiseert wie wat wanneer doet maar rekent niets uit. Reviewers bevestigen het: *"the budgeting and resources management feature is cumbersome and lacks resource status notification."* Het staat al jaren op de roadmap als "main topic" en release 17.0.0 leverde er niets van.

5. **"Baseline" is geen baseline.** Het is een "wat is er veranderd sinds datum X"-diff, geen bevroren, benoembare snapshot. In de Community Edition zelfs alleen "sinds gisteren". Het resultaat is filterafhankelijk, verwijderde werkpakketten zijn onzichtbaar (verwijderhistorie wordt niet bijgehouden), en oude waarden verschijnen alleen voor zichtbare kolommen. Meerdere genummerde baselines (BL0/BL1/revisie na claim), baseline-vs-actueel-variantierapportage en vertragingsanalyse zijn onmogelijk. In een contractuele bouwomgeving, waar de baseline het juridische ankerpunt van elke claim is, is dat diskwalificerend.

6. **Geen datumconstraints en manual scheduling als standaard.** Er is geen *Start No Earlier Than*, *Finish No Later Than*, *Must Start On*, *As Late As Possible*, geen deadline met negatieve-speling-signalering. In plaats daarvan een binaire manual/automatic-schakelaar per taak — en **manual is de standaard**, waarbij relaties bestaan maar niets doen. **[SCHATTING]** Het voorspelbare gevolg is dat planners uit behoefte aan controle het merendeel op manual laten staan, waarmee het netwerk inert wordt en de Gantt tot een handgetekend staafdiagram degradeert.

7. **Geen Earned Value Management en budgetten zitten opgesloten per project.** De documentatie: *"Budgets are currently limited to a single project."* Geen consolidatie over een portefeuille, geen PV/EV/AC, geen CPI/SPI, geen EAC-prognose, geen S-curve. Voor programma's waar EVM contractueel verplicht is, valt OpenProject direct af.

8. **Geen enkele koppeling met de gevestigde planningsformaten.** Geen MS Project (MPP of MSPDI-XML), geen Primavera XER, geen P6 XML. De officiële MS-Project-"integratie" is een workaround uit de documentatie: *"you can export your MS Project file to Excel and then synchronize it with OpenProject."* Dat verliest per definitie relaties, lags, kalenders, constraints en baselines — je houdt een lijst met datums over. Er is ook geen directe Jira-integratie: *"We do not provide a direct integration between OpenProject and JIRA ourselves."* Uitwisseling met de rest van de planningswereld is dus in de praktijk eenrichtingsverkeer via platte tabellen.

9. **De IFC-ondersteuning is uitsluitend visualisatie en issues — geen planningsdata.** Een code-search in de volledige `opf/openproject`-repository levert **nul treffers voor `IfcTask` en `IfcWorkSchedule`** (25-07-2026). De BIM-module bestaat uit een IFC-geometrieviewer (`ifc_conversion_job`) plus BCF-issuebeheer. Er is **geen 4D-planning**: de documentatie legt nergens een verband tussen modelelementen en Gantt-taken, en de BIM-gids bevat geen 4D-sectie. Het model is een plaatje om issues op te prikken, geen planningsobject. Ook worden de ondersteunde IFC-schemaversies nergens gedocumenteerd.

10. **Enterprise-paywall op verwachte basisfuncties, met hoge zetelminima.** Reviewers klagen dat Kanban/boards, baselines, Gantt-PDF-export en de Team planner betaald zijn. Erger is de staffelstructuur: Basic en Professional vereisen **25 gebruikers**, Premium **100**. Een team van acht dat alleen SSO wil, betaalt voor 25 zetels op Professional; wie LDAP-groepssynchronisatie of portfolio's nodig heeft moet naar Premium en dus ≥100 zetels. Verder gemeld: geen offline-toegang, *"poor backend integration capability compared to alternative PPM tools"*, een te korte proefperiode van 14 dagen, en een leercurve op de administratiekant.

11. **Scheduling is aantoonbaar geen ontwikkelprioriteit.** Release 17.0.0 (januari 2026) — het vlaggenschipreleases van het jaar — leverde realtime documentcollaboratie, Programs & Portfolios, meeting-management en een nieuwe projecthome. **Niets** over scheduling, Gantt, afhankelijkheden, kalenders of resources. Wie hoopt dat de planningsgaten binnenkort gedicht worden, leest de roadmap verkeerd: OpenProject beweegt richting collaboratie en portfolio-governance, weg van netwerkplanning.

---

## 6. Interoperabiliteit

Deze sectie is extra relevant omdat de opdrachtgever een open-source, IFC-gebaseerde planner bouwt.

### 6.1 Overzicht per formaat

| Formaat | Import | Export | Opmerking |
|---|---|---|---|
| **Primavera XER** | **Nee** | **Nee** | Geen enkele Primavera-integratie gedocumenteerd |
| **Primavera P6 XML** | **Nee** | **Nee** | Idem |
| **MS Project MPP** | **Nee** | **Nee** | Officiële workaround: MPP → Excel → Excel-sync |
| **MSPDI (MS Project XML)** | **Nee** | **Nee** | Niet ondersteund |
| **CSV** | Ja | Ja | Werkpakketten en projectlijsten |
| **XLS / Excel** | Ja | Ja | Plus tweewegs **Excel-synchronisatie-add-in** (`opf/OpenProjectExcel`) |
| **PDF** | n.v.t. | Ja | Werkpakketten, projectlijsten; **Gantt-PDF is Enterprise** |
| **IFC** | Ja (viewer) | Ja (download origineel) | **Alleen geometrie**; geen IfcTask/IfcWorkSchedule |
| **BCF-XML 2.1** | **Ja** | **Ja** | Volwaardig, plus **BCF REST-API v2.1** |
| **iCal** | Ja (subscribe) | Ja | Meetings en agenda's |

### 6.2 API's

- **APIv3** — REST, **HAL+JSON**, HATEOAS/hypermedia. Dekt work packages (incl. relations en hiërarchie), projects, time entries, costs, users/groups/memberships, activities, attachments, documents, queries, custom fields, en sinds 17.0 portfolios/programs. **OAuth 2.0** met `/.well-known/` discovery (RFC 8414 / RFC 9728). **Webhooks** aanwezig. **Geen GraphQL.**
- **BCF REST-API v2.1** — buildingSMART-standaard, in de BIM-module.
- **SCIM** (RFC 7643/7644) — identity provisioning, Corporate-tier.
- **MCP Server** — Professional-tier add-on (LLM-integratie).
- **CLI** — `opf/openproject-cli` (Go), officieel.
- Ecosysteem: `pyopenproject` (Python), community-integraties voor Slack, Mattermost, Toggl, TimeCamp — met de expliciete disclaimer *"We do not guarantee error-free and seamless use of the Community plugins."*

### 6.3 Integraties

**Officieel:** GitHub, GitLab, Nextcloud (met SSO in Corporate), OneDrive/SharePoint (Enterprise; sinds 17.0 gesplitst, met `Sites.Selected`-permissiemodel), XWiki (Enterprise), openDesk (Corporate), Revit-add-in (BIM), Excel-sync.

**Niet aanwezig:** Jira (*"We do not provide a direct integration"* — alleen API, Excel-sync of derde partijen zoals ALM Toolbox), Primavera, MS Project, Autodesk Construction Cloud, Procore, Synchro/Bentley.

### 6.4 IFC-analyse — de kern voor deze opdrachtgever

Dit is het scherpste punt van het hele profiel.

**Wat OpenProject met IFC doet:** de BIM-module accepteert IFC-uploads, converteert ze via een achtergrondjob (`modules/bim/app/workers/bim/ifc_models/ifc_conversion_job.rb`, in een aparte `ifc_conversion`-queue met eigen `bimworker`-container) naar een browservriendelijk viewerformaat, en toont ze in een webviewer met model tree, 2D/3D, doorsneden en property inspector. Meerdere modellen kunnen tegelijk worden getoond en gecombineerd.

**Wat OpenProject níét met IFC doet:**

- **`IfcTask` en `IfcWorkSchedule` komen nul keer voor in de volledige broncode** (GitHub code-search op `repo:opf/openproject`, 25-07-2026). De IFC-planningsentiteiten worden dus **noch gelezen, noch geschreven, noch gemodelleerd**.
- Daarmee ontbreken automatisch ook `IfcWorkPlan`, `IfcRelSequence` (de IFC-representatie van afhankelijkheden met lag en sequencetype), `IfcWorkCalendar`, `IfcWorkTime` en `IfcResource`.
- **Geen 4D.** De BIM-documentatie legt nergens een koppeling tussen modelelementen en Gantt-taken; er is geen 4D-simulatie, geen tijdslider over het model, geen `IfcRelAssignsToProcess`-achtige koppeling tussen product en proces.
- De **ondersteunde IFC-schemaversies worden nergens gedocumenteerd** — niet op de productpagina, niet in de BIM-gids, niet in de installatiedocumentatie. Er is dus geen enkele publieke toezegging over IFC 2x3, IFC4 of **IFC 4.3**.

**Conclusie voor de opdrachtgever:** OpenProject behandelt IFC als *geometrie om issues op te prikken*, niet als *een gegevensmodel waarin een planning kan leven*. De persistentie van OpenProject is zijn eigen PostgreSQL-schema; IFC is een geïmporteerd bijlagebestand. Dat is exact tegengesteld aan een architectuur waarin IFC 4.3 het native formaat is en `IfcWorkSchedule`/`IfcTask`/`IfcRelSequence` de bron van waarheid vormen.

Praktische gevolgen:

- **Er is geen migratiepad of round-trip tussen OpenProject en een IFC-native planner.** De enige gemeenschappelijke taal zou CSV/Excel zijn — en die verliest relaties, lags, kalenders en hiërarchie.
- **Er is wél een reëel raakvlak op BCF.** OpenProject's BCF 2.1-API is standaardconform en volwassen. Een IFC-native planner die BCF-issues wil uitwisselen (bijvoorbeeld: koppel een planningsafwijking aan een modelissue) kan daar zonder problemen tegenaan praten. Dat is de enige zinvolle integratierichting.
- **OpenProject is geen concurrent op IFC-planning, maar een aanvullend systeem.** Het overlapt op werkbeheer en issues, niet op schemamodellering. **[SCHATTING]** Een realistisch coëxistentiescenario is: OpenProject als organisatiebreed werkbeheer- en issuesysteem, de IFC-planner als het planningsinstrument, gekoppeld via BCF en APIv3.

**Strategische lezing voor de opdrachtgever:** OpenProject bewijst dat er een grote, betalende Europese markt is voor open-source, self-hosted, GPL-gelicentieerde projectsoftware met publieke-sector-vertrouwen — en laat tegelijk een gat van formaat open. Het heeft de distributie, de overheidsreferenties en het BIM-vertrouwen, maar **geen CPM, geen SS/FF/SF, geen echte kalenders, geen resources, geen echte baselines en geen IFC-planningsdata**. Dat is precies de ruimte die een IFC-native, CPM-correcte open-source planner kan innemen: niet als OpenProject-vervanger, maar als het planningsinstrument dat OpenProject aantoonbaar niet is en blijkens zijn roadmap ook niet wil worden.

---

## 7. Marktpositie

### Waar sterk, en waarom

1. **Duitse en Europese publieke sector — dominant en structureel verankerd.** De opname in **openDesk** (ZenDiS, Duitse federale overheid) maakt OpenProject niet zomaar een leverancier maar een *onderdeel van het Duitse soevereine-IT-beleid*. De uitrol bij de **Bundeswehr via BWI** (april 2025) is de zwaarst mogelijke referentie. Stadt Köln, Landratsamt Enzkreis en Charité versterken dat beeld. Dit is een positie die geen commerciële SaaS-concurrent op korte termijn kan aanvallen, omdat de aankoopcriteria (broncode-inzage, on-premises, GPL, EU-hosting) hen categorisch uitsluiten.

2. **Zelf-hostende, privacygevoelige organisaties in het algemeen.** Onderzoeksinstellingen (Fraunhofer, Hochschule Coburg), NGO's (Greenpeace) en beveiligingsbewuste bedrijven kiezen om dezelfde reden.

3. **Atlassian-vluchtelingen.** OpenProject positioneert zich expliciet als *"A powerful Jira alternative"* en richt zijn marketing op organisaties die door het einde van Jira Server/Data Center gedwongen worden te migreren en niet naar Atlassian Cloud willen. **[SCHATTING]** dit is momenteel waarschijnlijk de snelstgroeiende instroom buiten de publieke sector.

4. **Open-source-first-organisaties.** Linux Foundation als klant is symbolisch veelzeggend.

### Waar zwak

- **Bouw en infrastructuur.** Ondanks de BIM-editie ontbreekt alles wat een bouwplanner nodig heeft (zie sectie 2 en 5). De BIM-editie verkoopt aan BIM-coördinatoren voor issue-management, niet aan planners.
- **Programma's met contractuele planningseisen.** Geen EVM, geen echte baselines, geen kritiek pad → uitgesloten van opdrachten die deze eisen stellen.
- **Grote, complexe netwerken.** Zie schaalbaarheidsschatting in 2.10.
- **Noord-Amerika.** Zwakke aanwezigheid; de aankoopdrijfveer (datasoevereiniteit tegen Amerikaanse cloud) werkt daar niet.

### Belangrijkste concurrenten

| Segment | Concurrenten | Verhouding |
|---|---|---|
| Open-source PM | Redmine, Taiga, Focalboard, Plane, Vikunja, Kanboard, ProjeQtOr | OpenProject is de commercieel meest volwassen; Redmine is de directe voorouder en nog altijd wijdverbreid |
| Commercieel werkbeheer | Jira, Asana, Monday.com, ClickUp, Wrike, Smartsheet, Notion | Concurreert op prijs en soevereiniteit, niet op UX-polish |
| Enterprise PPM | MS Project/Planner Premium, Planview, Clarity, Sciforma | OpenProject is goedkoper maar mist EVM, resourcecapaciteit en portfolio-diepte |
| **Klassieke CPM** | **Primavera P6, MS Project, Asta Powerproject, Deltek Acumen, Spider Project** | **Geen concurrent — andere productcategorie** |
| Bouwplanning/4D | Synchro (Bentley), Navisworks, Fuzor, Vico | Geen concurrent; OpenProject heeft geen 4D |
| openDesk-stack-genoten | Nextcloud, Open-Xchange, Univention, XWiki, Element | Partners, geen concurrenten |

### Cijfers en trend

| Metriek | Waarde | Datum/bron |
|---|---|---|
| GitHub-sterren (`opf/openproject`) | **15.666** | GitHub API, 25-07-2026 |
| GitHub-forks | **3.381** | GitHub API, 25-07-2026 |
| Open **pull requests** | 202 | GitHub API, 25-07-2026 — *gecorrigeerd:* GitHub Issues staan **uit** op deze repo (`has_issues: false`); het veld `open_issues_count` telt hier dus uitsluitend openstaande PR's, geen issues |
| Contributors | 284 | openproject.org, 25-07-2026 |
| Downloads (claim leverancier) | **20M+** | openproject.org, 25-07-2026 |
| Reviewscore | 4,6/5 over 188 reviews | GetApp / Software Advice, 25-07-2026 |
| Reviewscore | 4,5/5 over 2 reviews | SourceForge / Slashdot, 25-07-2026 |
| Omzet | **Niet openbaar** | OpenProject GmbH publiceert geen cijfers |
| Aantal betalende klanten | **Niet openbaar** | — |

**Omzetschatting [SCHATTING — zwak onderbouwd, alleen als orde van grootte]:** OpenProject GmbH is een Duitse GmbH zonder publieke financiële rapportage. Op basis van teamgrootte (verspreid over ~10 landen, naar de vacature- en teampagina te oordelen enkele tientallen mensen), de prijsstaffels en de aard van de klantenkring (overheden op meerjarige contracten met minimaal 25–250 zetels), ligt de jaaromzet naar schatting in de orde van grootte van **enkele miljoenen tot circa tien miljoen euro per jaar**. Dit is nadrukkelijk een gok op basis van indirecte signalen en mag niet als feit worden gerapporteerd.

**Trend:** de richting van het product is helder en consistent — **weg van planning, richting collaboratie en portfolio-governance**. Release 17.0.0 (realtime documenten, Programs & Portfolios, meetings) bevestigt dat, evenals de Enterprise-add-onlijst (SSO, SCIM, SharePoint, project life cycle, project initiation requests). Commercieel is dat rationeel: de publieke sector koopt governance en soevereiniteit, geen kritiek pad. Voor wie planning zoekt, betekent het dat de kloof eerder groter dan kleiner wordt.

---

## 8. Eindoordeel

### Voor wie wel

- **Europese overheden en semi-publieke instellingen** die om beleidsredenen soevereine, on-premises, open-source software moeten gebruiken. Voor hen is OpenProject vaak niet de beste maar de *enige toelaatbare* keuze — en het is een goede.
- **Organisaties die Jira Server/Data Center ontvluchten** en een self-hosted alternatief met vergelijkbare functieomvang zoeken tegen lagere kosten.
- **IT-, R&D- en interne-projectafdelingen (25–500 gebruikers)** met gemengde agile/klassieke werkwijzen, waar de "planning" bestaat uit fasen, mijlpalen en een globale tijdlijn — niet uit een doorgerekend netwerk.
- **Privacy- en beveiligingsgevoelige sectoren** (zorg, defensie, onderzoek, NGO's) met eigen infrastructuur.
- **BIM-coördinatoren die een goedkope, standaardconforme BCF-issuehub zoeken** met browsergebaseerde IFC-viewer — dit is een reëel sterk punt, mits je het als issuemanagement en niet als planning inzet.
- **Organisaties met een integratiecapaciteit**, die via APIv3 zelf kunnen bouwen wat de UI niet biedt.

### Voor wie niet

- **Iedereen die een kritiek pad nodig heeft.** Aannemers, infrabouwers, EPC-contractors, scheepsbouw, turnarounds, complexe engineeringprogramma's. Er is geen CPM, en zeven opeenvolgende 17.x-releases hebben er niets aan gedaan. *(Gecorrigeerd: de eerdere toevoeging "het staat niet eens als wens geregistreerd" is geschrapt — die steunde op een GitHub-issuezoekopdracht op een repo waar Issues uitstaan. Zie Verificatie, bewering 15.)*
- **Planners die SS/FF/SF met lag nodig hebben.** Elke gefaseerde of lijnvormige uitvoering.
- **Organisaties met ploegendiensten, meerdere werkweken of per-onderaannemer-kalenders.** Eén instance-brede kalender maakt dat onmogelijk.
- **Iedereen die resourcecapaciteit moet plannen of nivelleren.** Officieel niet ondersteund.
- **Programma's met EVM- of baseline-variantieverplichtingen**, of met claim- en vertragingsanalyse. De "Baseline" is een diff, geen baseline; dat houdt geen contractuele toets.
- **Organisaties die schema's moeten uitwisselen met opdrachtgevers of ketenpartners in P6 of MS Project.** Er is geen XER, geen P6 XML, geen MPP, geen MSPDI. Excel-heen-en-weer verliest de netwerklogica volledig.
- **Wie 4D-BIM wil.** Bestaat niet in OpenProject.
- **Kleine teams (<25) die Enterprise-functies willen.** De zetelminima maken dat onbetaalbaar; voor hen is Community de enige rationele keuze.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee — en het presenteert zich ook niet als zodanig.**

OpenProject is een uitstekend *werkbeheerplatform* met een Gantt-visualisatie. Het is geen *planningsinstrument*. Het onderscheid is niet academisch maar operationeel: het verschil zit in de vraag of het systeem het schema **berekent** of alleen **tekent**. OpenProject tekent. De enige berekening is een voorwaartse kettingdoorschuiving over FS-relaties — nuttig, maar het is de eenvoudigste denkbare vorm van datumpropagatie en het levert geen van de grootheden op waarop planningsbesluiten worden genomen: geen late dates, geen speling, geen kritiek pad, geen resourceconflicten, geen baselinevariantie.

Wie OpenProject naast Primavera P6, Asta Powerproject of zelfs MS Project Desktop legt, vergelijkt twee verschillende productcategorieën. De juiste vergelijkingsgroep is Jira, Asana, Monday en Redmine — en binnen díé groep is OpenProject een sterke, eerlijk geprijsde, principieel open speler met een unieke Europese overheidspositie.

**Voor de opdrachtgever die een open-source, IFC-4.3-native planner bouwt, is het strategische signaal tweeledig.** Ten eerste: het *marktbewijs* is geleverd. Er bestaat een grote, betalende Europese markt voor GPL-gelicentieerde, self-hosted projectsoftware met publieke-sector-vertrouwen, en OpenProject heeft die markt met 20M+ downloads en federale Duitse adoptie ontsloten. Ten tweede: het *gat* is exact en meetbaar. OpenProject heeft de distributie, de overheidsreferenties en zelfs een IFC-viewer — maar geen CPM, geen SS/FF/SF, geen projectkalenders, geen resources, geen echte baselines en **nul regels code die `IfcTask` of `IfcWorkSchedule` kennen**. De publieke roadmapsignalen wijzen niet op inhalen: 17.0.0 t/m 17.6.0 leverden nul scheduling-, afhankelijkheids-, kalender- of resourcefuncties. *(Genuanceerd: OpenProject beheert zijn backlog op het login-afgeschermde `community.openproject.org`; de bewering dat CPM er definitief niet komt, is een gefundeerde inschatting op basis van de releasekoers, geen geverifieerd feit — zie Verificatie, bewering 15.)* Het is naar alle waarschijnlijkheid een structurele, blijvende opening.

---

## Bronnen

Alle URL's opgehaald op **25 juli 2026**, tenzij anders vermeld.

**Leverancier — product en prijs**
1. [OpenProject — Pricing](https://www.openproject.org/pricing/) — alle staffels, minima, meerjarenkortingen, BIM-add-on, proefperiode
2. [OpenProject — Homepage](https://www.openproject.org/) — downloadclaim, contributors, referentieklanten, positionering
3. [OpenProject — About us](https://www.openproject.org/about-us/) — oprichter, teamverdeling, lidmaatschappen
4. [OpenProject — Enterprise edition](https://www.openproject.org/enterprise-edition/) — Enterprise-positionering
5. [OpenProject — BIM project management](https://www.openproject.org/bim-project-management/) — BIM-editie, zelfstandige prijs €6,95/lid/maand, IFC-viewer, BCF

**Leverancier — officiële documentatie**
6. [Gantt chart — Scheduling](https://www.openproject.org/docs/user-guide/gantt-chart/scheduling/) — manual vs. automatic, forward pass, lag, "nearest predecessor"
7. [Gantt chart (module)](https://www.openproject.org/docs/user-guide/gantt-chart/) — visuele features, PDF-export Enterprise, geen CPM-vermelding
8. [Work package relations and hierarchies](https://www.openproject.org/docs/user-guide/work-packages/work-package-relations-hierarchies/) — alle 8 relatietypen; *"the only one that can constrain or affect the dates"*
9. [Baseline comparison](https://www.openproject.org/docs/user-guide/work-packages/baseline-comparison/) — diff-karakter, Community "sinds gisteren", 5 beperkingen
10. [Budgets](https://www.openproject.org/docs/user-guide/budgets/) — unit/labor costs, *"limited to a single project"*, geen EVM
11. [Time and costs](https://www.openproject.org/docs/user-guide/time-and-costs/) — *"OpenProject currently does not yet support resource management"*
12. [Calendars and dates (admin)](https://www.openproject.org/docs/system-admin-guide/calendars-and-dates/) — *"any change here will affect the scheduling of all work packages in all projects"*, uren per dag, feestdagen
13. [Set and change dates](https://www.openproject.org/docs/user-guide/work-packages/set-change-dates/) — datepicker, duur, "working days only"-toggle
14. [Enterprise guide](https://www.openproject.org/docs/enterprise-guide/) — volledige add-onlijst per tier (Basic/Professional/Premium/Corporate)
15. [System requirements](https://www.openproject.org/docs/installation-and-operations/system-requirements/) — CPU/RAM-staffels, PostgreSQL 16+, Helm tot 80–100K gebruikers, geen Windows
16. [API documentation](https://www.openproject.org/docs/api/) — APIv3, HAL+JSON, OAuth2, SCIM, BCF 2.1, geen GraphQL
17. [Integrations (admin guide)](https://www.openproject.org/docs/system-admin-guide/integrations/) — MS Project-workaround via Excel, geen Jira-integratie, geen Primavera
18. [BIM guide](https://www.openproject.org/docs/bim-guide/) — IFC-viewer, BCF-issues, Revit-add-in; geen 4D-sectie
19. [BIM guide — IFC viewer](https://www.openproject.org/docs/bim-guide/ifc-viewer/) — viewerfuncties; geen Gantt-koppeling, geen schemaversies
20. [Project lists / export](https://www.openproject.org/docs/user-guide/projects/project-lists/) — XLS/CSV/PDF-export
21. [Release notes (overzicht)](https://www.openproject.org/docs/release-notes/) — versietijdlijn 17.0.0 t/m 17.6.0
22. [Release notes 17.0.0](https://www.openproject.org/docs/release-notes/17-0-0/) — headline features; **geen** scheduling/Gantt/resource-verbeteringen

**Onafhankelijk / derden**
23. [Wikipedia — OpenProject](https://en.wikipedia.org/wiki/OpenProject) — ChiliProject/Redmine-fork 2010, v1.0 okt 2012, Foundation e.V. juni 2013, GPLv3, Rails/Angular/PostgreSQL, BWI/Bundeswehr april 2025, v17.6.0
24. [openDesk (ZenDiS)](https://opendesk.eu/en/) — samenstelling van de soevereine werkplek, ZenDiS GmbH sinds januari 2024
25. [GitHub — opf/openproject](https://github.com/opf/openproject) — 15.666 sterren, 3.381 forks, 202 open issues, Ruby, topics incl. `ifc`/`bcf`/`gantt` (via GitHub API, 25-07-2026)
26. GitHub code-search `repo:opf/openproject IfcWorkSchedule OR IfcTask` — **0 resultaten** (25-07-2026)
27. GitHub issue-search `repo:opf/openproject "critical path"` — 0 resultaten (25-07-2026), **maar niet-zeggend**: GitHub Issues zijn uitgeschakeld op deze repo (`has_issues: false`, GitHub API). Deze bron is als bewijsmateriaal ingetrokken.
28. GitHub code-search `repo:opf/openproject IFC ifc_conversion` — 4 treffers, w.o. `modules/bim/app/workers/bim/ifc_models/ifc_conversion_job.rb` en `docker/prod/bimworker`
29. [GetApp — OpenProject reviews](https://www.getapp.com/project-management-planning-software/a/openproject/reviews/) — 4,6/5 over 188 reviews; klachten over leercurve, betaalde functies, proefperiode
30. [Software Advice — OpenProject reviews](https://www.softwareadvice.com/project-management/openproject-profile/reviews/) — *"budgeting and resources management feature is cumbersome"*, geen offline toegang, *"poor backend integration capability"*
31. [SourceForge — OpenProject](https://sourceforge.net/software/product/OpenProject/) — 4,5/5 (2 reviews); Kanban achter betaalmuur; trage majorreleases
32. [Slashdot — OpenProject](https://slashdot.org/software/p/OpenProject/) — bevestiging reviews; verouderde prijsnotering €247,50/jaar
33. [GitHub — opf/OpenProjectExcel](https://github.com/opf/OpenProjectExcel) — Excel-synchronisatie-add-in
34. [GitHub — opf/openproject-cli](https://github.com/opf/openproject-cli) — officiële CLI voor APIv3

**Niet toegankelijk tijdens dit onderzoek** (HTTP 403/404 op geautomatiseerde toegang; hun ontbreken is een erkende beperking van dit profiel):
- G2 (`g2.com/products/openproject/reviews`) — 403
- TrustRadius (`trustradius.com/products/openproject/reviews`) — 403
- Gartner Peer Insights (`gartner.com/reviews/.../openproject`) — 403
- Capterra (`capterra.com/p/162060/OpenProject/`) — 404/403
- Reddit (r/projectmanagement, r/construction) — geblokkeerd voor deze fetch-tool
- OpenProject Community-forum (`community.openproject.org`) — vereist login voor werkpakketinhoud

---

## Verificatie

Adversariële controle uitgevoerd **25 juli 2026**. Werkwijze: elke bewering is actief geprobeerd te *weerleggen* met een onafhankelijke ophaal van de primaire bron (WebFetch) of de GitHub REST API, niet met een bevestigingszoektocht. Het WebSearch-budget van de sessie was uitgeput, dus derde-partijbronnen zijn alleen via directe URL gecontroleerd; G2/TrustRadius/Capterra/Gartner blijven ontoegankelijk.

### Prijzen en licentiemodel

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Community Edition gratis, GPLv3, onbeperkt aantal gebruikers | **Bevestigd** — licentie `GPL-3.0` bevestigd via GitHub API; "no minimum users", €0 | [pricing](https://www.openproject.org/pricing/) · [GitHub API](https://api.github.com/repos/opf/openproject) |
| 2 | Basic €5,95 p/gebruiker/maand, min. **25** gebruikers | **Bevestigd** — letterlijk "€5.95 per user per month", 25 minimum | [pricing](https://www.openproject.org/pricing/) |
| 3 | Professional €10,95, min. **25** | **Bevestigd** — letterlijk "€10.95 per user per month" | [pricing](https://www.openproject.org/pricing/) |
| 4 | Premium €15,95, min. **100** | **Bevestigd** — letterlijk "€15.95 per user per month" | [pricing](https://www.openproject.org/pricing/) |
| 5 | Corporate op aanvraag, min. **250** | **Bevestigd** — "On request", 250 minimum | [pricing](https://www.openproject.org/pricing/) |
| 6 | Maandbetaling +€1,00 p/gebruiker/maand | **Bevestigd** — letterlijk "1 month (+€1.00 per user)" | [pricing](https://www.openproject.org/pricing/) |
| 7 | Meerjarenkorting 2/3/4/5 jaar = 5/8/11/15 maanden gratis | **Bevestigd** — alle vier de waarden letterlijk | [pricing](https://www.openproject.org/pricing/) |
| 8 | Gebruikers in stappen van 5; 14 dagen proef | **Bevestigd** — "Users can be selected in increments of 5"; "14 days free" (cloud) en "14 days free trial license key" (on-premises) | [pricing](https://www.openproject.org/pricing/) |
| 9 | BIM-add-on +€1,00 p/gebruiker/maand bovenop Enterprise | **Bevestigd** — "BIM +€1.00 per user" | [pricing](https://www.openproject.org/pricing/) |
| 10 | Zelfstandige BIM Edition €6,95 per lid/maand, jaarlijks, min. 5 gebruikers | **Bevestigd** — "€ 6.95 Per member per month. Billed annually", "Minimum 5 users". De **gesignaleerde inconsistentie tussen prijspagina en BIM-pagina is reëel** en blijft staan | [bim-project-management](https://www.openproject.org/bim-project-management/) |
| 11 | Derde-partijnotering "vanaf €247,50/jaar" is verouderd | **Bevestigd** — bedrag staat er nog; komt met geen huidige staffel overeen. Afleiding 5 × €4,95 × 10 mnd = €247,50 (oude staffel) toegevoegd als *onderbouwde reconstructie*, niet als bronfeit | [SourceForge](https://sourceforge.net/software/product/OpenProject/) |
| 12 | LDAP-groepssync en portfoliomanagement zitten pas in Premium (≥100 zetels) | **Bevestigd** — "Portfolio management" en "LDAP users and group sync" staan in Premium; SSO+MCP Server in Professional; SCIM in Corporate; Team planner, Baseline en Gantt-PDF al in Basic | [enterprise-guide](https://www.openproject.org/docs/enterprise-guide/) |

**Netto: nul prijsfouten.** De volledige prijssectie is regel voor regel gereproduceerd op de primaire bron.

### CPM- en planningsfunctionaliteit

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 13 | Geen CPM/kritiek pad/float; documentatie noemt het nergens | **Bevestigd** — Gantt- én scheduling-documentatie noemen critical path, float, slack, late dates en backward pass geen enkele keer | [gantt-chart](https://www.openproject.org/docs/user-guide/gantt-chart/) · [scheduling](https://www.openproject.org/docs/user-guide/gantt-chart/scheduling/) |
| 14 | Alleen forward pass: "one working day after the finish date of the nearest predecessor" | **Bevestigd** — citaat letterlijk juist | [scheduling](https://www.openproject.org/docs/user-guide/gantt-chart/scheduling/) |
| 15 | "0 feature requests critical path op GitHub" ⇒ "staat niet op de bouwlijst" | **GECORRIGEERD — dit was de ernstigste fout in het profiel.** De zoekopdracht geeft inderdaad 0 treffers, maar **GitHub Issues staan uit** op `opf/openproject` (`has_issues: false`). Er kúnnen daar geen feature requests staan; de backlog leeft op het login-afgeschermde `community.openproject.org`. De nul is een artefact van het zoekoppervlak, geen bewijs van afwezigheid. Sectie 2.1, nadeel 1 en bron 27 zijn herschreven; de conclusie "CPM ontbreekt nú" blijft overeind, de conclusie "CPM staat niet gepland" is teruggebracht tot "niet publiek verifieerbaar" | [GitHub API](https://api.github.com/repos/opf/openproject) |
| 16 | Alleen predecessor/successor beïnvloedt datums | **Bevestigd** — "The predecessor/successor relation is the only one that can constrain or affect the dates of work packages" | [relations](https://www.openproject.org/docs/user-guide/work-packages/work-package-relations-hierarchies/) |
| 17 | Geen SS/FF/SF; alleen FS met lag in werkdagen | **Bevestigd** — geen enkele vermelding van start-to-start, finish-to-finish of start-to-finish; lag wel: "the minimum number of working days to keep in between the two work packages", inclusief negatieve waarden. Ook 17.0.0 t/m 17.6.0 voegen niets toe | [relations](https://www.openproject.org/docs/user-guide/work-packages/work-package-relations-hierarchies/) · [17.6.0](https://www.openproject.org/docs/release-notes/17-6-0/) |
| 18 | "Acht relatietypen" | **Gecorrigeerd → zeven.** De documentatie noemt zeven relatiesoorten (paren); de eigen tabel in het profiel had ook al zeven rijen | [relations](https://www.openproject.org/docs/user-guide/work-packages/work-package-relations-hierarchies/) |
| 19 | Manual scheduling is de standaard; relaties doen dan niets | **Bevestigd** — "By default, all work packages in OpenProject are manually scheduled" en "these relations will not affect the manually input dates" | [scheduling](https://www.openproject.org/docs/user-guide/gantt-chart/scheduling/) |
| 20 | Eén instance-brede werkdagenkalender; geen kalender per project | **Bevestigd, sterker dan geciteerd** — de docs voegen expliciet toe: "It is currently not possible to define working days at a project-level." Ook "a couple of minutes to hours" is letterlijk juist | [calendars-and-dates](https://www.openproject.org/docs/system-admin-guide/calendars-and-dates/) |
| 21 | "OpenProject currently does not yet support resource management" | **Bevestigd** — citaat woordelijk correct, inclusief roadmap-vermelding | [time-and-costs](https://www.openproject.org/docs/user-guide/time-and-costs/) |
| 22 | Budgets beperkt tot één project; geen EVM | **Bevestigd** — "Budgets are currently limited to a single project. They cannot be shared across multiple projects." Geen EVM/CPI/SPI/EAC/S-curve in de documentatie | [budgets](https://www.openproject.org/docs/user-guide/budgets/) |
| 23 | "Baseline" is een diff, niet een snapshot; Community alleen "sinds gisteren"; 5 beperkingen | **Bevestigd, met aanvulling** — Community is gebonden aan een vast vergelijkingsmoment van **08:00 lokale tijd**; alle vijf beperkingen zijn woordelijk terug te vinden, plus een zesde: "It is not possible to compare between two different filter queries" | [baseline-comparison](https://www.openproject.org/docs/user-guide/work-packages/baseline-comparison/) |
| 24 | Gantt-PDF-export is Enterprise | **Bevestigd** — "This feature is an Enterprise add-on… in plans Basic, Professional, Premium, Corporate" | [gantt-chart](https://www.openproject.org/docs/user-guide/gantt-chart/) |
| 25 | Release 17.0.0 bevat nul scheduling-/Gantt-/resourcefuncties | **Bevestigd** — headline features zijn realtime documentcollaboratie, Programs & Portfolios, meetings, projecthome-herontwerp, toegankelijkheid, privacy. Enige kalenderitem is een iCal-abonnement voor **meetings**. Ook 17.6.0 bevat niets op dit vlak | [17.0.0](https://www.openproject.org/docs/release-notes/17-0-0/) · [17.6.0](https://www.openproject.org/docs/release-notes/17-6-0/) |

### IFC en interoperabiliteit

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 26 | `IfcTask` en `IfcWorkSchedule` komen nul keer voor in de broncode | **Bevestigd** — beide code-searches afzonderlijk herhaald: `total_count: 0`. In tegenstelling tot bewering 15 is deze nul **wél zeggend**, want code search werkt op de repo-inhoud, niet op een uitgeschakelde functie | GitHub code search `repo:opf/openproject IfcTask` / `IfcWorkSchedule` |
| 27 | Geen MPP/MSPDI/XER/P6-XML; MS-Project alleen via Excel-omweg | **Onzeker (niet herverifieerd)** — de documentatiepagina *Integrations* is in deze ronde niet opnieuw opgehaald wegens budget. Consistent met alle overige bevindingen, maar niet zelfstandig hergecontroleerd | [integrations](https://www.openproject.org/docs/system-admin-guide/integrations/) |

### Cijfers, marktpositie en bedrijfsfeiten

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 28 | 15.666 sterren, 3.381 forks | **Bevestigd op de eenheid nauwkeurig** — `stargazers_count: 15666`, `forks_count: 3381`. (De homepage noemt zelf 15.660; de API is leidend) | [GitHub API](https://api.github.com/repos/opf/openproject) |
| 29 | "202 open issues" | **Gecorrigeerd → 202 open pull requests.** Omdat Issues uitstaan telt `open_issues_count` hier uitsluitend PR's | [GitHub API](https://api.github.com/repos/opf/openproject) |
| 30 | 284 contributors, 20M+ downloads | **Bevestigd als leverancierclaim** — beide getallen staan letterlijk op de homepage. Niet onafhankelijk toetsbaar; blijft een claim van OpenProject zelf | [openproject.org](https://www.openproject.org/) |
| 31 | 4,6/5 over 188 reviews, slechts 2 reviews van 1–2 sterren | **Bevestigd, exact** — 125×5, 54×4, 7×3, 0×2, 2×1 = 188 | [GetApp](https://www.getapp.com/project-management-planning-software/a/openproject/reviews/) |
| 32 | Versie 17.6.0, uitgebracht 8 juli 2026; ~maandelijkse cadans | **Bevestigd** — 17.0.0 (14-01-2026), 17.1.0 (11-02), 17.2.0 (11-03), 17.3.0 (15-04), 17.4.0 (13-05), 17.5.0 (10-06), 17.6.0 (08-07). Strak maandelijks | [release-notes](https://www.openproject.org/docs/release-notes/) |
| 33 | Fork van ChiliProject (2010), zelf fork van Redmine; Foundation okt 2012 / e.V. juni 2013; GPLv3; Rails+Angular | **Bevestigd** — inclusief motief "performance, security, and accessibility" en registratienummer VR 32487 | [Wikipedia](https://en.wikipedia.org/wiki/OpenProject) |
| 34 | Versie 1.0 op **4 oktober 2012** | **Onzeker** — de bron bevestigt de Foundation-oprichting in oktober 2012, maar de exacte releasedatum 4 oktober is in deze ronde niet teruggevonden. Dag-precisie niet gedekt | [Wikipedia](https://en.wikipedia.org/wiki/OpenProject) |
| 35 | Niels Lindenthal is oprichter/CEO | **Bevestigd** — "Founder and CEO OpenProject". Let op: **Wikipedia noemt geen oprichter**; de about-us-pagina is hier de enige bron | [about-us](https://www.openproject.org/about-us/) |
| 36 | BWI/Bundeswehr april 2025 via openDesk (ZenDiS) | **Bevestigd** — "In April 2025, the German military IT provider BWI agreed to use OpenProject as part of openDesk within the Bundeswehr" | [Wikipedia](https://en.wikipedia.org/wiki/OpenProject) |
| 37 | Referentieklanten Siemens, Stadt Köln, Deutsche Bahn, Fraunhofer, Linux Foundation, Greenpeace, Charité, AMG | **Bevestigd** — alle acht logo's staan op de homepage; ook Hochschule Coburg, Enzkreis, KSat/CubeSat SOURCE en fLotte Berlin als casestudy's | [openproject.org](https://www.openproject.org/) |
| 38 | Team over DE/FR/UK/ES/GR/US/NP/KE/PA/RO; lid van PM² Alliance, OSBA, FSFE, NOYB | **Bevestigd, aangevuld** — alle tien landen kloppen; ook lid van **OSI** en **CH Open**, die ontbraken | [about-us](https://www.openproject.org/about-us/) |
| 39 | PostgreSQL 16+ vereist sinds 16.0.0; geen Windows Server; systeemeisenstaffel | **Bevestigd** — "officially supports PostgreSQL version 16 or above since OpenProject 16.0.0"; Windows "not officially supported"; staffel 4/4/2, 8/8/4, 16/16/8 klopt | [system-requirements](https://www.openproject.org/docs/installation-and-operations/system-requirements/) |
| 40 | Staffel geschaald op **gelijktijdige** gebruikers | **Gecorrigeerd** — de tabel is geschaald op *totaal actieve* gebruikers, met een aanvullende opmerking dat gelijktijdigheid het werkelijke verbruik bepaalt | [system-requirements](https://www.openproject.org/docs/installation-and-operations/system-requirements/) |
| 41 | Helm/Kubernetes "tot 80.000–100.000 gebruikers" | **Genuanceerd** — dat getal is een **voorbeeldconfiguratie** voor enterprise-multitenancy, geen gepubliceerd maximum | [system-requirements](https://www.openproject.org/docs/installation-and-operations/system-requirements/) |
| 42 | Omzetschatting "enkele miljoenen tot ~€10 mln" | **Onzeker — en dat is in het profiel correct gelabeld.** OpenProject GmbH publiceert geen cijfers; niet toetsbaar. Mag niet als feit worden overgenomen | — |

### Samenvattend oordeel van de fact-check

**Van de 42 gecontroleerde beweringen: 33 bevestigd, 6 gecorrigeerd of genuanceerd, 3 onzeker.**

De prijssectie — het zwaartepunt van deze controle — is **foutloos**: alle bedragen, zetelminima, betalingstermijnen, meerjarenkortingen en add-onprijzen zijn woordelijk gereproduceerd op openproject.org, inclusief de gesignaleerde inconsistentie tussen de prijspagina en de BIM-productpagina, die echt bestaat.

De functionele kern — geen CPM, geen backward pass, geen float, alleen FS met lag, één instance-brede kalender, geen resourcemanagement, budgetten per project, "Baseline" als diff — is **integraal bevestigd op de primaire documentatie**, op meerdere punten met sterkere formuleringen dan het profiel gebruikte (met name de expliciete zin dat werkdagen niet op projectniveau instelbaar zijn).

**De enige inhoudelijk ernstige fout is bewering 15.** Het profiel gebruikte "0 GitHub feature requests" als bewijs dat CPM niet op de roadmap staat, terwijl GitHub Issues op die repository simpelweg uitgeschakeld zijn. Dat is een klassieke drogreden van afwezig bewijs op een verkeerd zoekoppervlak, en hij droeg gewicht in zowel sectie 2.1 als nadeel 1 als het eindoordeel. De strekking van het profiel overleeft de correctie ruimschoots — CPM ontbreekt aantoonbaar in het product en in zeven opeenvolgende releases — maar de bewijskracht voor "en het komt er ook niet" is teruggebracht tot wat ze werkelijk is: een gefundeerde inschatting op basis van de releasekoers, geen vaststaand feit.
