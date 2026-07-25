# Sablono — diepgaand softwareprofiel

*Marktonderzoek planningssoftware · opgesteld 25 juli 2026*
*Alle webbronnen geraadpleegd op 25-07-2026, tenzij anders vermeld.*

> **Leeswijzer bij de betrouwbaarheid.** Sablono publiceert géén lijstprijzen en heeft een zeer dunne
> publieke reviewbasis (9 Capterra-reviews, 31 G2-reviews). Waar ik geen primaire bron kon vinden,
> staat dat er expliciet bij als **[SCHATTING]** of **[NIET GEVERIFIEERD]**. De sterkste harde bron in
> dit profiel is de publieke OpenAPI-specificatie van Sablono (v1.35.0), die het interne datamodel
> blootlegt — die is doorslaggevend voor de vraag of er een echte netwerkplanning-engine onder zit.

---

## 1. Wat het is

### Leverancier en juridische entiteit

| Item | Gegeven |
|---|---|
| Naam | Sablono GmbH |
| Zetel | Kiefholzstraße 3–4, 12435 Berlijn, Duitsland |
| Handelsregister | Amtsgericht Charlottenburg (Berlijn), **HRB 150583 B** |
| Inschrijving | 13 juni 2013 (oprichtingsakte 22 mei 2013) |
| Oprichters | Lukas Olbrich (CEO), Sven Richter (CFO), Florian Meichsner (COO) — alle drie ruim 13 jaar later nog in functie |
| Werktalen product | Duits, Engels, Spaans (website); app meertalig |
| Zelfpositionering | "Construction Execution System" / "Construction Execution Platform" |

Sablono is een Duits (Berlijns) SaaS-bedrijf dat sinds 2013 bestaat en opvallend
oprichter-stabiel is. Het is géén klassiek planningshuis: het bedrijf is opgekomen uit de
SAP/HANA-hoek (eerste plaats SAP HANA Innovation Award 2017; Hasso Plattner Ventures is
investeerder) en heeft zich van meet af aan gericht op *uitvoering* in plaats van *voorbereiding*.

### Eigendom en financiering

- **Seed:** Nemetschek SE, Hasso Plattner Ventures, High-Tech Gründerfonds (HTGF), Allplan.
- **Serie A:** **€5,3 miljoen**, aangekondigd **27 mei 2021**. Lead: **Bachmaier Invest GmbH** —
  de investeringsmaatschappij van **Thomas Bachmaier, oprichter van Thinkproject**. Nemetschek SE
  co-investeerde. Thomas Bachmaier en Matt Wheelis (VP Industry Strategy, Nemetschek SE) traden toe
  tot de adviesraad.
- **Totaal opgehaald:** ca. **$7,84 mln** over 3 rondes (Tracxn-data) — bescheiden naar
  contech-maatstaven.
- Sablono claimde bij de Serie A **al winstgevend te zijn geweest vóór de ronde**.
- Noord-Data meldt **7 bekende actieve aandeelhouders**; omzet- en personeelscijfers zitten daar
  achter een betaalmuur.

> **Strategisch relevant:** Nemetschek SE is aandeelhouder. Dat verklaart de (inmiddels verouderde)
> koppeling met het Allplan-platform *bim+*, en maakt Sablono een logische overnamekandidaat binnen
> de Nemetschek-groep. **[SPECULATIE — geen aankondiging bekend per juli 2026.]**

### Doelgroep

Sablono richt zich op partijen die **veel herhaling** in hun werk hebben:

- **Hoofdaannemers** op grote, repetitieve projecten (hoogbouw-woningbouw, hotels, studentenhuisvesting).
- **Gespecialiseerde onderaannemers / trade contractors** — met name gevelbouw, binnenafbouw
  (fit-out), installatietechniek, heiwerk, brandwerende doorvoeringen.
- **EPC's in zonne-energie** — inmiddels een volwaardige tweede markt.
- **Modulaire bouw en prefab** — badkamer- en keukenmodules, gevel- en balkonproductie.

Rollen die expliciet worden bediend: kwaliteitsmanagement, **quantity surveyor** (belangrijk in het
VK), uitvoeringsmanagement, planning & project controls, bedrijfsleiding, juridisch & inkoop.

### Sectoren en regio's waar het écht gebruikt wordt

Op basis van gepubliceerde klantcases en casestudies — dit is dus wat Sablono zelf durft te tonen:

| Regio | Bewijs uit klantcases |
|---|---|
| **Verenigd Koninkrijk** (sterkste markt) | Lendlease (150 Bishopsgate, Londen), Morgan Sindall (300 Manor Road, Londen — "10.000+ projecturen bespaard"), Robertson, Interserve. Sterk gedreven door de **Building Safety Act** en de "golden thread"-documentatieplicht |
| **DACH** (thuismarkt) | Dreßler Bau (raamovereenkomst), Schneider Fassaden, Gerstl Bau |
| **Midden-Oosten** | BESIX + SsangYong E&C — Uptown Tower, Dubai |
| **Australië** | Lendlease — One Sydney Harbour |
| **Frankrijk / Benelux** | Bouygues genoemd als klant; Franse blog bestaat maar is nagenoeg leeg — **[SCHATTING: aanwezigheid is dun]** |
| **Spanje / LatAm** | Volledige Spaanstalige site en casestudies (FT Construction – The Hills Residences) |
| **Hernieuwbare energie** | **Q Energy** — 295,6 MW zonneportfolio, ca. 600 MW in aanbouw |

**Beoordeling regio's:** het zwaartepunt ligt duidelijk bij **VK-hoogbouw en DACH-afbouw**, met
zonne-energie als groeimarkt. Er is geen zichtbare Nederlandse of Belgische referentie.

---

## 2. Functionaliteit en techniek

### Het kernconcept: activiteit-op-object

Dit is de architectonische kern en het belangrijkste verschil met klassieke planningssoftware.
De publieke OpenAPI-specificatie (`reporting.openapi.json`, v1.35.0) legt het datamodel exact bloot:

```
structure   (hiërarchie, parent_id → boom van locaties: gebouw / verdieping / zone)
   └── deliverable   (het OBJECT: "Appartement 305", "Gevelpaneel A-12", "PV-tafel 214")
          └── activity   (de TAAK op dat object, geïnstantieerd uit een processjabloon)
```

Je definieert één keer een **processjabloon** (Prozessvorlage) — bijvoorbeeld een afbouwketen van
40 stappen: metal stud zetten → leidingwerk → isolatie → beplating → stucwerk → schilderwerk →
oplevering. Dat sjabloon wordt vervolgens **gerepliceerd over elk object**. Bij 200 appartementen
× 40 activiteiten krijg je 8.000 activiteiten — precies het rekenvoorbeeld dat Sablono zelf op de
prijspagina gebruikt.

Relevante velden op `activity`:

| Veld | Betekenis |
|---|---|
| `activity_class_id` | identificeert activiteiten uit hetzelfde processjabloon |
| `sequence_position` | *"The topological index in the **per deliverable** process graph"* |
| `planned_labour` | integer: hoeveel mensen gepland zijn |
| `responsible_team` / `confirming_team` | uitvoerende en controlerende ploeg (vrije tekst) |
| `has_checklist` | is er een QA-proces vereist |
| `current_state` | laatst gerapporteerde status |

### Zit er een échte netwerkplanning-engine onder? — streng beoordeeld

**Wat er wél is.** De API exposeert per activiteit een `baseline_schedule` met:

- `user_defined_start` / `user_defined_end` — datums uit de geïmporteerde baseline
- `earliest_start` / `earliest_end` — *"The earliest possible date after evaluating dependencies and user defined dates"*
- `latest_start` / `latest_end` — *"The latest possible date after evaluating dependencies and user defined dates"*
- `planned_duration` met eenheden `wd` / `d` / `wh` / `h` (werkdagen, dagen, werkuren, uren)

Dat betekent: er **is** een datumrekenmachine met een **voorwaartse én achterwaartse pass** over de
processketen, met een werkkalender eronder (de eenheden `wd`/`wh` impliceren een kalender die
niet-werkbare tijd overslaat). Sablono's eigen Duitstalige release-blog bevestigt dit: datums worden
berekend uit *"de Solltermin van de taak, de gedefinieerde werkkalender, de processketen van het
sjabloon en de activiteitsduren."* Dat is meer dan een platte takenlijst — het is echte
constraint-propagatie.

**Wat er níet is.** De specificatie is even veelzeggend in wat ontbreekt:

| CPM-kenmerk | Aanwezig? |
|---|---|
| Total float / free float | **Nee** — geen enkel float-veld in het schema |
| Kritieke-padvlag | **Nee** |
| Relatietypen FS / SS / FF / SF | **Nee** — geen relatie-object, geen type-enum |
| Lead / lag (uitloop/overlap) | **Nee** |
| Netwerklogica *tussen* objecten | **Nee** — de procesgraaf is expliciet *"per deliverable"* |
| Kalenderobject in de API | **Nee** — kalenders zijn niet exporteerbaar |
| Resource-objecten / resourcebibliotheek | **Nee** — alleen `planned_labour` (integer) en teamnamen als tekst |
| Resource-nivellering / -egalisatie | **Nee** |
| Meerdere baselines | **Nee** — precies één `baseline_schedule` |
| Wat-als-scenario's | **Nee** |
| Constraints (SNET/FNLT enz.) | **Nee** — alleen "user defined" datums als anker |

**Oordeel.** Sablono heeft een **datumpropagatie-engine over per-object processketens, verankerd
aan geïmporteerde baseline-datums** — geen algemene CPM-netwerkengine. Het kritieke pad van een
project loopt in de praktijk *dwars door objecten heen* (appartement 305 wacht op de steiger die
appartement 210 bedient); precies die logica bestaat in Sablono's exportmodel niet. Het is
**activiteit-op-object, niet activiteit-op-pijl of activiteit-op-knoop**.

Sablono zegt dit ook zelf, en dat siert het bedrijf: de Duitstalige pagina over
bouwplanningssoftware positioneert het product expliciet als **aanvulling naast** Oracle Primavera
en Asta Powerproject, niet als vervanging — *"Integrationen mit P6, MS Project, Asta und Excel"*.
De marketingpagina "Planning and Scheduling" noemt de woorden kritiek pad, float, nivellering en
kalenderbeheer nergens.

Bevestigend extern signaal: de door de sector veelgebruikte
**Last Planner & Takt Software Directory van Lean Construction Blog** (19 tools: Touchplan, LCMD,
VisiLean, Sitedrive, Aphex, Outbuild, inTakt, vPlanner e.a.) **vermeldt Sablono niet**. Ondanks de
lean-marketing wordt het door de lean-planningsgemeenschap dus niet als planningstool geteld.

### Lean- en pull-functionaliteit

Er is een **Lean Board / weekwerkplan**: een digitaal alternatief voor het plakbriefjesbord, dat
automatisch wordt voorgevuld uit de projectplanning en waarin activiteiten met een paar klikken
herpland of uitgesteld worden, gekoppeld aan de voortgangs- en kwaliteitsdatabase.

Maar de kerninstrumenten van het **Last Planner System** ontbreken in de publieke documentatie:
geen **PPC** (Percent Plan Complete), geen **commitment-/beloftenregistratie**, geen
**constraint log / make-ready-proces**, geen **pull-sessie**, geen **taktplanning** met
taktzones en taktduur. De lean-laag is **functioneel ondiep** — het is een digitaal weekbord,
geen productieplanningssysteem.

### 4D, BIM en visualisatie

- **Visual Tracker:** je uploadt plattegronden, aanzichten en tekeningen; Sablono kleurt daar de
  status overheen. Dit is **2D-overlay**, geen 3D.
- **4D-simulatie:** **afwezig**. Geen tijdlijnsimulatie op een model.
- **BIM:** een oud supportartikel meldt *"importeer je 3D-model in Sablono via het bim+-platform"*
  (Allplan/Nemetschek). Dit komt **niet meer voor in het actuele functieoverzicht** — de
  productpagina "Features Overview" noemt BIM, IFC, 3D en 4D geen enkele keer.
  **[SCHATTING: de bim+-koppeling is de facto legacy/uitgefaseerd.]**

### Voortgang, kwaliteit en commercieel

Dit is waar het product wél diep gaat:

- **Statusregistratie:** `started` → `first_finished` → `finished` → `rejected` / `confirmed`, elk
  met datum én rapporteur (`date_and_reporter`). Plus `available_since` — het moment waarop een
  activiteit vrijkwam doordat alle directe voorgangers gereed/goedgekeurd waren. Dat is een
  uitstekende basis voor doorlooptijd- en verstoringsanalyse.
- **QR-codes** op objecten voor snelle statusupdates op de bouwplaats.
- **Mobiele app** (iOS/Android) met **offline-modus** — cruciaal in kelders en liftschachten.
- **Geotagged fotodocumentatie** (o.a. afgestemd op de Britse Part L-eisen).
- **QA-checklists** op activiteitniveau, met sign-off op activiteiten én op gebreken.
- **Automatische overdrachtsmeldingen** van de ene onderaannemer naar de volgende — dit is de
  kernwaarde van het product: trade-to-trade handover.
- **Audit trail** voor zowel voortgang als kwaliteit, onveranderbaar.
- **Commercial Dashboard / Planned Works Valuation:** koppeling van voortgang aan
  betalingswaardering — `cost_package` en `cost_package_entry` zitten in de API.
- **Look-Ahead Planning:** een vooruitblik die apart staat van de baseline; *"Changing your
  look-ahead schedule on Sablono will never change your baseline dates."*

### Platform en schaalbaarheid

| Aspect | Gegeven |
|---|---|
| Type | Pure cloud-SaaS (web) + native mobiele apps iOS/Android met offline-modus |
| Hosting | **AWS, regio Frankfurt**; back-ups in Parijs; contractspartij AWS Luxemburg |
| Certificering | **ISO 27001:2022** |
| Encryptie | TLS 1.2/1.3 in transit, **AES-256** at rest, back-ups volledig versleuteld |
| Pentesten | Jaarlijks onafhankelijk; **geen bug-bountyprogramma** |
| Back-up | 3-2-1-regel; RPO 1 uur voor delen van het systeem, dagelijkse back-ups, continu ca. elke 15 min |
| AVG/GDPR | Klant = verwerkingsverantwoordelijke, Sablono = verwerker; *"you own the data at all times"* |
| Schaal (claim) | *">100.000 activiteiten per project"* |
| Schaal (contractueel) | Track/Trace: **max. 5 projecten, 10.000 activiteiten per project** |

De securityhouding is voor een bedrijf van deze omvang **bovengemiddeld netjes**: EU-hosting,
ISO 27001:2022, expliciete verwerkersrol. Dat is een reëel voordeel bij Europese aanbestedingen.

---

## 3. Prijzen

### Het eerlijke antwoord: er zijn geen publieke lijstprijzen

Ik heb de prijspagina's in drie talen opgehaald en de ruwe HTML doorzocht op valutasymbolen en
bedragen — **nul treffers**. Ook Capterra, Capterra.de, Software Advice en Slashdot tonen geen
startprijs; Software Advice noteert letterlijk *"Starting Price: Custom quote"*. Er is dus **geen
enkel verifieerbaar bedrag** publiek beschikbaar.

*Bron: https://www.sablono.com/en/pricing en https://www.sablono.com/de/preise, geraadpleegd
25-07-2026; https://www.softwareadvice.com/construction/sablono-profile/, geraadpleegd 25-07-2026.*

### Wat wél vaststaat over het licentiemodel

**De drie pakketten** (bron: prijspagina EN/DE, 25-07-2026):

| | **Track** | **Trace** | **Flow** |
|---|---|---|---|
| Pitch | Vervang spreadsheet-trackers door realtime voortgang | Verminder risico en herstelwerk door kwaliteit realtime vast te leggen | Versnel projecten door onderaannemers te verbinden |
| Aantal projecten | 5 | 5 | *Scale as you go* |
| Activiteiten | 10.000 per project | 10.000 per project | Custom |
| Gebruikers | — | — | **Onbeperkt** |
| Activity Tracker, mobiele app, foto's | ✔ | ✔ | ✔ |
| Baseline Scheduling, Look-Ahead | ✔ | ✔ | ✔ |
| Dashboards | Planned vs Actual Essentials | + Quality Essentials | **Advanced Analytics** |
| Workflow-sjablonen | zonder sign-off & QA | volledig | volledig |
| QA-checklists, sign-off, kwaliteits-audit trail | ✘ | ✔ | ✔ |
| Rechten binnen eigen bedrijf | ✔ | ✔ | ✔ |
| **Cross-company samenwerking (onderaannemers)** | ✘ | ✘ | **✔** |
| Automatische overdrachtsmeldingen | ✘ | ✘ | ✔ |
| **Reporting API voor BI** | ✘ | ✘ | **✔** |
| Onboarding inbegrepen | 1 uur online | 1 uur online | 2 uur online |
| Dedicated Success/Account Manager | ✘ | ✘ | ✔ |

*(De Duitstalige pagina vermeldt 2 uur onboarding voor álle pakketten — een inconsistentie tussen
de taalversies per 25-07-2026.)*

**Voorwaarden:**

- *"Alle prijzen zijn maandprijzen en worden jaarlijks vooruit betaald."*
- **Minimale looptijd: 12 maanden.** (Beide taalversies, 25-07-2026.)
- **30 dagen gratis proef, per project** — niet per account. Na afloop worden alle projectleden
  automatisch **Reviewer (alleen-lezen)**; data blijft behouden maar doorwerken vereist een
  abonnement. Data uit de ene proef is niet overdraagbaar naar de andere.

**De prijsdrijvers** (supportartikel *"How much does it cost to use Sablono"*, 25-07-2026), letterlijk:

> *"The subscription fee ... depends on a couple of parameters such as the size of the project(s),
> **project value**, number of activities you would want to monitor, and, in some cases, also the
> number of users you need on your project."*

Dit is dus **geen simpel per-gebruiker-per-maand-model**. Het is een **hybride project­licentie**
waarin het aantal activiteiten de dominante variabele is en — opvallend — **de aanneemsom van het
project meeweegt**. Waardegebaseerde prijsstelling op de projectomvang is in deze markt
ongebruikelijk en betekent dat dezelfde functionaliteit op een duurder project meer kost.

**Definitie "actieve gebruiker"** (prijspagina FAQ): *"anyone who has accessed Sablono during a given
period — whether to simply review information or to actively contribute."* Ook meelezers tellen dus mee.

**Onderaannemers betalen niet zelf:** *"all costs will be covered for you through the main contractor
or client."* Dit is het klassieke hoofdaannemer-betaalt-model.

### Bijkomende kosten (implementatie)

| Post | Status |
|---|---|
| Onboarding boven de inbegrepen 1–2 uur | **Betaald** — "Bookable Service Packages" |
| Onboarding User Training | **Betaald** |
| Consulting | **Betaald** |
| Sablono-Led Project Setup ("for a faster go-live") | **Betaald**, alleen bij Flow |
| **Full Project Export Service** | **Betaald** — *"available for an additional charge"* |
| Custom T&C's | Alleen bij Flow |

> **Let op dit laatste punt.** Zelf een volledig project in één keer exporteren kost extra geld.
> Losse PDF- en CSV-exports zijn wel inbegrepen in alle pakketten. Zie §6.

### Prijsindicatie

Ik geef bewust géén concreet bedrag: elke publiek circulerende "prijs" voor Sablono die ik kon
vinden was afkomstig van scraper-sites zonder onderbouwing. Wat ik wél kan zeggen:

- **[SCHATTING]** Uit de opgegeven bedrijfsomvang (zie §7: ca. 29 medewerkers en ca. $3,2 mln ARR,
  zelf ook een schatting van een derde partij) volgt bij enkele honderden actieve projecten een
  ordegrootte van **enkele duizenden tot enkele tienduizenden euro's per project per jaar**. Dit is
  een afgeleide redenering, **geen bronvermelding**, en kan er factoren naast zitten.
- Voor een aanbesteding is de enige betrouwbare route: offerte opvragen, met opgave van aantal
  projecten, aantal activiteiten, aantal actieve gebruikers en aanneemsom.

---

## 4. VOORDELEN

1. **Het activiteit-op-object-model past werkelijk bij repetitief werk.** Eén processjabloon van
   40 stappen, uitgerold over 200 appartementen, geeft 8.000 gedetailleerde, individueel volgbare
   activiteiten zonder dat een planner 8.000 regels hoeft te tikken. In Primavera P6 of Asta
   Powerproject is diezelfde granulariteit theoretisch mogelijk maar praktisch onwerkbaar — daar
   plant men op zone- of verdiepingsniveau. Dit is Sablono's echte, verdedigbare bestaansrecht.

2. **Trade-to-trade-overdracht is geautomatiseerd en dat is de kernpijn die het oplost.**
   Zodra de voorganger een activiteit op een object afmeldt (en eventueel laat aftekenen), krijgt
   de volgende ploeg automatisch bericht dat het werkfront vrij is. Het API-veld `available_since`
   registreert dat moment expliciet, wat later meetbaar maakt hoe lang een vrijgegeven werkfront
   ongebruikt bleef liggen. Dat is een analyse die klassieke planningstools niet kunnen leveren.

3. **Onbetwistbare audit trail voor voortgang én kwaliteit.** Elke statuswijziging draagt datum én
   rapporteur; foto's zijn geotagged. Dit maakt het product bijzonder sterk in het VK, waar de
   **Building Safety Act** een "golden thread" van informatie voor higher-risk buildings
   voorschrijft. Reviewers noemen het expliciet nuttig bij geschilbeslechting: *"who did what and when."*

4. **Bewezen op zeer grote, complexe projecten.** 150 Bishopsgate en One Sydney Harbour (Lendlease),
   Uptown Tower Dubai (BESIX/SsangYong), 300 Manor Road (Morgan Sindall, met een claim van
   10.000+ bespaarde projecturen), Q Energy met een zonneportfolio van 295,6 MW. Dit zijn geen
   pilotprojecten maar vlaggenschepen bij internationale aannemers.

5. **Sterke, EU-conforme securityhouding voor een bedrijf van deze omvang.** ISO 27001:2022,
   AWS Frankfurt met back-up in Parijs, AES-256 at rest, TLS 1.3, jaarlijkse pentest, en een
   expliciete verwerker-rol met *"you own the data at all times."* Voor Europese
   overheids- en corporate-inkoop is dit een reëel selectievoordeel.

6. **Offline-modus die er echt toe doet.** De mobiele app werkt zonder verbinding — noodzakelijk in
   kelders, parkeergarages en liftschachten. Voor een product waarvan de hele waarde afhangt van
   registratie op de plek van het werk, is dit geen bijzaak.

7. **Uitzonderlijk gewaardeerde klantondersteuning.** Klantenservice scoort **5,0/5** op zowel
   Capterra als Software Advice. Reviewers: *"Customer support is second to none; the Sablono team
   always offers support."* Bij Flow zit een dedicated Project Success Manager én Account Manager.

8. **Lage instapdrempel voor de bouwplaats.** Meerdere reviewers melden dat gebruikers geen training
   nodig hebben: *"Software is very user friendly, easy to project set up and very powerful. Users
   do not need training."* Statusupdates via QR-scan. Dat is beslissend bij meertalige ploegen met
   hoog personeelsverloop — precies de doelgroep.

9. **Baseline blijft beschermd.** Look-ahead-wijzigingen raken de baselinedatums nooit. Dat houdt
   plan-versus-werkelijk-KPI's zuiver en voorkomt de klassieke fout waarbij een geplande datum
   stilletjes meebeweegt met de vertraging.

10. **Voortgang gekoppeld aan betaling.** Het Commercial Dashboard en de Planned Works Valuation
    zetten geregistreerde voortgang direct om in waardering — inclusief `cost_package`-structuren in
    de API. Dat maakt het product interessant voor quantity surveyors, een rol die de meeste
    voortgangstools negeren.

---

## 5. NADELEN

1. **Er zit geen echte netwerkplanning-engine onder — en je hebt dus nog steeds P6 of Powerproject
   nodig.** Geen total float, geen kritiek pad, geen FS/SS/FF/SF-relatietypen, geen lead/lag, geen
   netwerklogica tússen objecten, geen resource-nivellering, geen meerdere baselines, geen wat-als.
   De procesgraaf is expliciet *"per deliverable"*. Sablono is dus een **extra systeem naast** je
   planningstool, met dubbele invoer en een permanent synchronisatievraagstuk. Een reviewer
   (Planning Manager, civiele techniek) verwoordt het droog: *"Programming features could be easier
   compared to Microsoft Project dependency methods."*

2. **Baselinedatums zijn niet te wijzigen.** Letterlijk uit een Capterra-review (Commercial Manager):
   *"Unable to change programme base dates."* Wat als kracht is bedoeld (zuivere KPI's, zie
   voordeel 9) slaat in de praktijk om in starheid zodra een project formeel wordt herzien — en op
   meerjarige bouwprojecten gebeurt dat gewoon.

3. **Slecht bestand tegen wijzigingen op de bouwplaats.** *"Flexibility and practical site changes
   remain challenging"* (Technical Engineer). Het processjabloon-model is krachtig zolang het werk
   uniform is; zodra objecten van elkaar gaan afwijken, vecht je tegen het model. Renovatie is
   expliciet lastig: *"Applicability for renovation projects is possible but somewhat complex in
   process setup."* Ironisch, want remediation/renovatie is juist een gepromote toepassing.

4. **Look-ahead werkt aantoonbaar niet goed voor verdiepingsgewijze woningbouw.** Een projectmanager
   meldt: *"Scheduling and look-ahead generation didn't work well for residential projects due to
   floor-based workflows."* Dat is precies de logica die een echte netwerkengine of een
   locatiegebaseerde/flowline-planner wél aankan — en die hier ontbreekt.

5. **Fouten in het bouwlogboek zijn onherstelbaar.** *"Impossible to change progress entries in the
   construction log"* (Civil Engineer). De onveranderbare audit trail (voordeel 3) is tegelijk een
   valkuil: een verkeerd gescande QR-code of een per ongeluk afgemelde activiteit blijft staan.

6. **Volledig afhankelijk van moderne telefoons met bereik en data.** *"All participants need recent
   mobile devices with strong signal and data plans"* en *"Sometimes lose signal using the mobile
   app"*. Ondanks de offline-modus is dit een reële implementatiedrempel bij onderaannemers met
   krappe marges en oude toestellen — en die moet de hoofdaannemer oplossen én betalen.

7. **Beperkte koppelbaarheid met derde software.** Letterlijk uit een review: *"Connectivity to
   third-party software is limited."* Zie §6 — de publieke API is uitsluitend lezend en ververst
   maar één keer per dag.

8. **Volstrekt ondoorzichtige prijsstelling, mét waardegebaseerd element.** Geen enkel publiek
   bedrag, in geen enkele taal, op geen enkele reviewsite. Bovendien weegt de **aanneemsom van het
   project** mee in de prijs — dezelfde functionaliteit kost op een duurder project meer. Combineer
   dat met een **minimale looptijd van 12 maanden** en je kunt niet zonder verkoopgesprek
   budgetteren, laat staan benchmarken.

9. **Volledige projectexport kost extra.** Losse PDF's en CSV's zijn inbegrepen, maar *"you can
   export your full project using our Full Project Export Service, which is available for an
   additional charge."* Betalen om je eigen data in één keer mee te nemen is een klassiek
   vendor-lock-in-signaal, en staat op gespannen voet met Sablono's eigen belofte *"you own the data
   at all times."*

10. **De reviewbasis is te dun om op te leunen — en de 5,0 is niet geloofwaardig.** 9 reviews op
    Capterra met een perfecte 5,0/5 gemiddeld, terwijl de subscores (gebruiksgemak 4,4;
    functionaliteit 4,4; prijs-kwaliteit 4,4) daar niet mee rijmen. 31 reviews op G2. Voor een
    bedrijf van 13 jaar oud is dat opvallend weinig, en het patroon wijst op door de leverancier
    geworven reviews. **[SCHATTING: het werkelijke gemiddelde ligt lager.]** Behandel de
    positieve cijfers met scepsis; de *cons* in diezelfde reviews zijn de bruikbaardere signalen.

11. **Lean is marketing-diep, niet functioneel diep.** Er is een weekbord, maar geen PPC, geen
    constraint log / make-ready, geen commitment-registratie, geen taktzones. Veelzeggend: Sablono
    ontbreekt in de **Last Planner & Takt Software Directory** van Lean Construction Blog, waar 19
    concurrenten wél staan. Wie echt Last Planner of taktplanning wil, koopt hier het verkeerde product.

12. **Geen BIM, geen IFC, geen 4D.** De Visual Tracker is een 2D-tekeningoverlay. De oude
    bim+-koppeling is uit het actuele functieoverzicht verdwenen. In een markt waarin
    concurrenten juist naar modelgekoppelde uitvoering bewegen, is dit een structureel gat.

---

## 6. Interoperabiliteit

> **Dit hoofdstuk is voor de opdrachtgever het belangrijkst**, gegeven de bouw van een
> open-source, IFC-gebaseerde planner.

### Import

| Formaat / bron | Ondersteund? | Bron & opmerking |
|---|---|---|
| **Oracle Primavera P6** | **Ja** (geclaimd) | Productpagina Baseline Scheduling: *"import your current baseline schedule from various tools including P6, MS Project, Asta or Excel"* |
| **Microsoft Project** | **Ja** (geclaimd) | idem; release-blog 2.11 bevestigt import |
| **Asta Powerproject** | **Ja**, met **terugschrijven** | Release-blog 2.11: import én export terug naar Asta |
| **Excel** | **Ja** | idem |
| **Autodesk** | Genoemd | Activity Tracker-pagina noemt "Autodesk" bij compatibiliteit, zonder specificatie |
| **Exacte bestandsformaten** (XER, P6 XML, MPP, MSPDI, XLSX) | **[NIET GEVERIFIEERD]** | Sablono noemt consequent alleen productnamen, nooit bestandsformaten. De detailhandleidingen zitten achter een login (`app.sablono.com`). Ik kon dit niet bevestigen en gok er niet naar |
| **IFC (IfcWorkSchedule / IfcTask)** | **Nee** — geen enkel bewijs | Ontbreekt volledig in het functieoverzicht, de sitemap, de API-spec en alle productpagina's |
| **BCF** | **Nee** — geen enkel bewijs | idem |
| **3D-model** | Alleen legacy via **bim+** (Allplan/Nemetschek) | Verouderd supportartikel; niet meer in het actuele functieoverzicht |

### Export

| Route | Beschikbaarheid |
|---|---|
| PDF-rapporten (incl. QA-checklistrapporten bij Trace) | Alle pakketten |
| **CSV-data** vanuit `app.sablono.com` | Alle pakketten |
| **Volledige projectexport in één keer** | **Betaalde dienst** |
| Terugschrijven van voortgang naar Asta Powerproject | Ja (release-blog 2.11) |
| Terugschrijven naar P6 / MS Project | Genoemd als "voortgang terugvoeren", zonder detail — **[NIET GEVERIFIEERD]** |
| **Reporting API** | **Alleen Flow** (duurste pakket) |

### De Reporting API — hard beoordeeld

Openbare specificatie: `https://developers.sablono.com/docs/api/v1/reporting.openapi.json`
(OpenAPI 3.0.0, **versie 1.35.0**, server `https://api.sablono.com/reporting`).

**Alle acht endpoints zijn `GET`:**

```
GET /{project_id}/structures      GET /{project_id}/checklists
GET /{project_id}/deliverables    GET /{project_id}/cost-packages
GET /{project_id}/activities      GET /{project_id}/notes
GET /{project_id}/images          GET /{project_id}/files/{id}
```

Uit de spec, letterlijk:

> *"The Sablono API for **exporting** data from the sablono platform into your own database or
> reporting software. **All reports are generated once a day and cached for 24 hours.** You can
> request the content in json or csv format."*

> *"Authentication and Authorization is handled by api keys. **To get an api key contact the Sablono
> support team and request a key for a given project.**"*

Vier harde beperkingen:

1. **Volledig alleen-lezen.** Nul schrijf-endpoints. Je kunt niets creëren, wijzigen of
   synchroniseren. Tweerichtingsintegratie bouwen is onmogelijk.
2. **Latentie van 24 uur.** Een platform dat "realtime voortgang" verkoopt, levert via de API data
   die tot een etmaal oud is. Voor een operationele koppeling is dat onbruikbaar.
3. **Sleutel per project, handmatig via support.** Geen self-service, geen OAuth, geen
   automatische provisioning. Bij honderd projecten honderd supportverzoeken.
4. **Alleen in het duurste pakket (Flow).** Track- en Trace-klanten hebben geen API.

### Openheid — eindbeoordeling voor een IFC-gebaseerde open-source planner

**Sablono is een gesloten, proprietary SaaS-silo.** De onderbouwing:

- **Geen IFC, in geen enkele vorm.** Geen IfcWorkSchedule, geen IfcTask, geen IFC 4.3, geen
  IFC-import of -export. Voor een IFC-native planner is er letterlijk geen formaatbrug.
- **Geen IFC-GUID in het datamodel.** Dit is het scherpste technische bezwaar. Het `deliverable`-object
  — Sablono's equivalent van een bouwdeel — heeft alleen `id` (een Sablono-UUID) en `code`
  (*"a per project, unique, **user defined** identifier"*). Er is **geen veld voor een externe of
  IFC-GlobalId**. Elke koppeling tussen een Sablono-object en een IFC-entiteit moet dus via de
  handmatig ingevoerde `code` lopen — tekstmatig, per project afgesproken, en breekbaar zodra
  iemand een naamconventie wijzigt. Er is geen stabiele, machine-leesbare identiteitsbrug.
- **Geen BCF.** Terwijl het product vol zit met issues, gebreken en sign-offs — precies waar BCF
  voor bedoeld is. Kwaliteitsdata blijft opgesloten.
- **Alleen-lezen API met 24-uurscache, achter het duurste pakket.** Synchronisatie is uitgesloten.
- **Volledige export is een betaalde dienst.**
- **Geen open-source componenten, geen self-hosting, geen open dataformaat.**

**Wat wél in het voordeel pleit** — en dat moet ook gezegd:

- De **OpenAPI-specificatie is publiek en van goede kwaliteit**: netjes gedocumenteerd, met
  beschrijvingen per veld. Dat is meer transparantie dan veel concurrenten bieden en het is de
  reden dat ik het datamodel in §2 zo precies kon beoordelen.
- **CSV-export zit in álle pakketten**, ook de goedkoopste.
- **JSON én CSV** als API-responsformaat.
- **Expliciete data-eigendomsverklaring**: *"you own the data at all times."*
- **EU-hosting en ISO 27001:2022** — geen datasoevereiniteitsprobleem.

**Conclusie:** eenrichtingsverkeer ís mogelijk — je kunt via de API of CSV voortgangsdata *uit*
Sablono trekken en die naast een IFC-planning leggen. Maar een echte, tweezijdige, op IFC-GUID's
gebaseerde koppeling is met de huidige API **niet te bouwen**. Voor een open, IFC-gebaseerd
planningsproject is Sablono geen partner, hooguit een databron — en dan nog met een dag vertraging.

---

## 7. Marktpositie

### Waar het sterk staat, en waarom

Sablono bezet een **smalle maar echte niche**: de granulaire uitvoerings- en kwaliteitsregistratie
van **herhalend werk op grote projecten**, in het gat tussen de klassieke planning (P6, Asta) en de
generieke projectmanagementplatformen (Procore, Autodesk Build).

Drie bastions:

1. **Britse hoogbouw-woningbouw en remediation.** Hier valt alles samen: veel identieke
   appartementen (het activiteit-op-object-model werkt), veel onderaannemers (trade-to-trade
   handover is de pijn), en de **Building Safety Act** die een golden thread van
   informatie afdwingt (de audit trail wordt een wettelijke noodzaak in plaats van een wens).
   Dit is Sablono's beste product-marktcombinatie, en de regelgeving werkt als rugwind.

2. **DACH-afbouw en gevelbouw.** De thuismarkt, met raamovereenkomsten bij aannemers als
   Dreßler Bau en gespecialiseerde gevelbouwers zoals Schneider Fassaden. Hier concurreert het met
   Duitse lean-tools (LCMD, inTakt) en met Excel.

3. **Zonne-energie-EPC's.** De nieuwste en snelstgroeiende markt. Een PV-park is de zuiverste
   denkbare toepassing van het model: tienduizenden vrijwel identieke objecten (tafels, strings,
   heipalen) met een korte, identieke activiteitenketen per stuk. Q Energy met 295,6 MW en ca.
   600 MW in aanbouw is het uithangbord.

### Concurrentie

| Categorie | Spelers | Verhouding tot Sablono |
|---|---|---|
| **Klassieke planning** | Oracle Primavera P6, Asta Powerproject, MS Project | **Geen concurrent — complement.** Sablono zegt dit zelf. Klanten draaien beide |
| **Computer-vision-voortgang** | **Buildots**, Disperse, OpenSpace | **Directe concurrent.** Sablono schrijft er zelf een aanvalsblog over. Buildots meet automatisch via helmcamera's; Sablono vereist handmatige melding. Sablono's tegenargument (menselijke verantwoordelijkheid, realtime i.p.v. dagelijkse snapshot) is verdedigbaar, maar de arbeidsloze meting van CV is een structurele dreiging |
| **Lean/Last Planner/takt** | Touchplan, VisiLean, LCMD, Sitedrive, Aphex, Outbuild, inTakt, vPlanner | **Concurrent in de perceptie, niet in functionaliteit.** Sablono ontbreekt in de LPS/takt-directory — het verliest deals waarin echte pull- of taktplanning gevraagd wordt |
| **Generieke bouwplatformen** | Procore, Autodesk Build, Fieldwire (Hilti), Thinkproject | **Concurrent op budget en platformconsolidatie.** Grootste bedreiging: een inkoper die "één platform" wil. Sablono's verweer is diepte in activiteitgranulariteit |
| **Excel** | — | Nog altijd de meest genoemde vervangen oplossing in de reviews. Realistisch de grootste concurrent |

### Omvang, omzet en gebruikers

| Metriek | Waarde | Betrouwbaarheid |
|---|---|---|
| Opgehaald kapitaal | ca. $7,84 mln over 3 rondes; Serie A €5,3 mln (mei 2021) | **Goed** — meerdere bronnen, eigen persbericht |
| Winstgevendheid | Winstgevend vóór de Serie A | Bedrijfsclaim 2021, sindsdien niet herbevestigd |
| Projectwaarde onder beheer | *"projecten met een waarde van meer dan €15 miljard"* | Bedrijfsclaim, mei 2021 — inmiddels vijf jaar oud |
| Medewerkers | ca. **29** | **[SCHATTING]** — aggregator, niet geverifieerd; Northdata houdt dit achter een betaalmuur |
| ARR | ca. **$3,2 mln** (2025) | **[SCHATTING]** — aggregator, onbevestigd |
| Waardering | ca. **$9,6 mln** (2025) | **[SCHATTING]** — aggregator, onbevestigd |
| Aantal klanten/gebruikers | **Onbekend** — nergens gepubliceerd | — |

**Interpretatie.** Dit is een **klein, kapitaalefficiënt, waarschijnlijk winstgevend nichebedrijf** —
geen schaalende scale-up. Ruim dertien jaar na oprichting, vijf jaar na een bescheiden Serie A en
geen vervolgronde: dat wijst op gecontroleerde, organische groei binnen een smalle niche, niet op
een groeispurt. Voor een inkoper heeft dat twee kanten: **stabiliteit en toewijding** aan één
probleem, maar ook **beperkte R&D-capaciteit** tegenover Procore, Autodesk en het door
durfkapitaal gevoede Buildots.

### Trend

- **Vóór Sablono:** de Britse Building Safety Act creëert wettelijke vraag naar exact wat Sablono
  levert. Zonne-energie schaalt hard en past perfect bij het model. Prefab en modulaire bouw groeien.
- **Tégen Sablono:** computer vision maakt handmatige voortgangsmelding op termijn overbodig.
  Platformconsolidatie drukt puntoplossingen weg. Het ontbreken van BIM/IFC en 4D wordt een steeds
  zichtbaarder gat nu de rest van de sector naar modelgekoppelde uitvoering beweegt. De
  eenrichtings-API met 24-uurscache verhoudt zich slecht tot een markt die naar open data beweegt.
- **[SPECULATIE]** Met Nemetschek als aandeelhouder en Thomas Bachmaier (Thinkproject) als
  lead-investeerder en adviseur, is een strategische overname een plausibel scenario. Geen
  aankondiging bekend per juli 2026.

---

## 8. Eindoordeel

**Sablono is een goed product dat consequent verkeerd begrepen wordt als planningssoftware. Dat is
het niet, en het bedrijf beweert dat zelf ook niet.**

Wat het wél is: een **uitvoerings- en oplevereringsplatform voor herhalend werk**, gebouwd op een
overtuigend en eigenzinnig datamodel (activiteit-op-object, uitgerold via processjablonen), met
uitstekende trade-to-trade-overdracht, een onbetwistbare audit trail en een terecht geroemde
klantenservice. Op grote, repetitieve projecten — VK-hoogbouw, DACH-afbouw, PV-parken — lost het een
echt probleem op dat P6 en Asta principieel niet kúnnen oplossen, omdat die tools op zone- in plaats
van objectniveau plannen.

**Over de netwerkplanning-engine, streng geoordeeld:** die zit er niet. Er is wel degelijk meer dan
een takenlijst — de API bewijst een voorwaartse én achterwaartse pass (`earliest_*` / `latest_*`)
met een werkkalender eronder, wat echte constraint-propagatie is. Maar er is geen float, geen
kritiek pad, geen relatietypen, geen lead/lag, geen resource-nivellering, geen wat-als, en — het
meest bepalend — **de procesgraaf is expliciet "per deliverable"**. De netwerklogica die op een
bouwplaats juist dwars door objecten heen loopt, bestaat in dit model niet. Sablono vervangt je
planningstool niet; het komt ernaast te staan, met alle dubbele invoer van dien.

**Voor de opdrachtgever, die een open-source IFC-gebaseerde planner bouwt, is het oordeel scherp:**
Sablono is een **gesloten systeem** en biedt nauwelijks aanknopingspunten. Geen IFC in welke vorm
dan ook, geen BCF, en — het zwaarstwegende punt — **geen veld voor een externe of IFC-GlobalId op
het `deliverable`-object**, waardoor er geen stabiele identiteitsbrug naar een IFC-model bestaat.
De API is uitsluitend lezend, ververst één keer per etmaal, vereist een handmatig door support
uitgegeven sleutel per project, en is alleen beschikbaar in het duurste pakket. Volledige
projectexport kost extra geld. Wat er aan openheid tegenover staat — een publieke, goed
gedocumenteerde OpenAPI-spec, CSV-export in alle pakketten, EU-hosting, een expliciete
data-eigendomsverklaring — is netjes, maar volstrekt onvoldoende voor tweezijdige integratie.
Sablono kan hooguit dienen als **databron met een dag vertraging**, nooit als koppelpartner.

**Zakelijk** is Sablono een klein (ca. 29 medewerkers **[schatting]**), kapitaalefficiënt,
waarschijnlijk winstgevend nichebedrijf met een opvallend stabiel oprichtersteam en indrukwekkende
vlaggenschipklanten. De ondoorzichtige prijsstelling — géén publiek bedrag in welke taal dan ook,
mét een waardegebaseerd element op de aanneemsom en een minimumlooptijd van twaalf maanden — is een
serieus bezwaar voor iedere professionele inkoper: benchmarken is onmogelijk zonder verkoopgesprek.

**Koop Sablono als** je veel identieke eenheden bouwt, meerdere onderaannemers moet coördineren op
overdrachtsmomenten, en een wettelijke of contractuele bewijsplicht hebt (Building Safety Act,
oplevering, betalingswaardering) — en accepteer dat het naast je bestaande planningstool komt.

**Koop het niet als** je een planningstool zoekt, echte Last Planner- of taktplanning wilt, met
BIM/IFC of 4D werkt, unieke in plaats van repetitieve objecten bouwt, of een open, realtime,
tweezijdig koppelbaar systeem nodig hebt.

**Eindcijfer als planningssoftware: 3/10** — het is de verkeerde categorie; het claimt dit zelf ook niet.
**Eindcijfer als uitvoerings- en oplevereringsplatform voor herhalend werk: 7,5/10.**
**Eindcijfer op openheid en interoperabiliteit: 2,5/10** — de publieke OpenAPI-spec en CSV-export in
alle pakketten redden het van een lagere score; het ontbreken van IFC, BCF, schrijftoegang en een
externe-ID-veld drukt het diep omlaag.

---

## Bronnen

Alle bronnen geraadpleegd op **25 juli 2026**.

### Leverancier — primair

1. Sablono — homepage · https://www.sablono.com/
2. Sablono — **Packages / prijzen (EN)** · https://www.sablono.com/en/pricing
3. Sablono — **Preise (DE)** · https://www.sablono.com/de/preise
4. Sablono — Features Overview · https://www.sablono.com/en/product/features-overview
5. Sablono — Baseline Scheduling · https://www.sablono.com/en/product/payment-valuation-and-intelligence/baseline-scheduling
6. Sablono — Look-Ahead Planning · https://www.sablono.com/en/product/payment-valuation-and-intelligence/look-ahead-planning
7. Sablono — Activity Tracker · https://www.sablono.com/en/product/progress-and-workflows/activity-tracker
8. Sablono — Visual Tracker · https://www.sablono.com/en/product/progress-and-workflows/visual-tracker
9. Sablono — Prozessvorlagen (DE) · https://www.sablono.com/de/produkt/fortschrittserfassung-und-workflows/prozessvorlagen
10. Sablono — Planning & Scheduling (outcome) · https://www.sablono.com/en/solutions/outcomes/planning-and-scheduling
11. Sablono — Renewable Energy · https://www.sablono.com/en/solutions/sectors/renewable-energy
12. Sablono — Remediation Work · https://www.sablono.com/en/solutions/use-cases/building-construction/remediation-work
13. Sablono — Building Safety Act · https://www.sablono.com/solutions/building-safety-act
14. Sablono — Team · https://www.sablono.com/en/company/team
15. Sablono — **Security and Compliance** (ISO 27001:2022, AES-256, AWS Frankfurt) · https://www.sablono.com/legal/security-and-compliance
16. Sablono — sitemap (gebruikt voor URL-inventarisatie) · https://www.sablono.com/sitemap.xml

### Leverancier — blog / releasenotes

17. Sablono — **Serie-A-financiering** (€5,3 mln, 27-05-2021) · https://www.sablono.com/de/blog/sablono-serie-a-finanzierung
18. Sablono — **Automatische Terminplanberechnung für Aktivitäten** (datumberekening, werkkalender) · https://www.sablono.com/de/blog/automatische-terminplanberechnung-fuer-aktivitaeten
19. Sablono — **Neue Schnittstellen und Integrationen verfügbar** (v2.11: MS Project, Asta, Primavera) · https://www.sablono.com/de/blog/neue-schnittstellen-und-integrationen-verfuegbar
20. Sablono — **Projektsprachen und Abhängigkeiten** (v2.14: afhankelijkheden binnen processjablonen) · https://www.sablono.com/de/blog/projektsprachen-und-abhaengigkeiten
21. Sablono — **Bauzeitplanungssoftware** (positionering náást P6/Asta) · https://www.sablono.com/de/blog/bauzeitplanungssoftware
22. Sablono — Digital Lean Construction: Weekly Workplan & Lean Board · https://www.sablono.com/en/blog/digital-lean-construction-sablonos-weekly-workplan-lean-board
23. Sablono — Buildots Competitors (concurrentiepositionering) · https://www.sablono.com/en/blog/buildots-competitors

### Leverancier — technische documentatie (doorslaggevend voor §2 en §6)

24. Sablono — **Reporting API documentatie** · https://developers.sablono.com/docs/api/v1/
25. Sablono — **OpenAPI-specificatie v1.35.0** (datamodel, endpoints, schedule-velden) · https://developers.sablono.com/docs/api/v1/reporting.openapi.json

### Leverancier — supportcentrum

26. Sablono Support — **How much does it cost to use Sablono** (prijsparameters incl. project value) · https://support.sablono.com/en/articles/3084491-how-much-does-it-cost-to-use-sablono
27. Sablono Support — **Is Sablono BIM compatible** (legacy bim+-koppeling) · https://support.sablono.com/en/articles/3084539-is-sablono-bim-compatible
28. Sablono Support — **30-day Sablono trial** · https://support.sablono.com/en/articles/12713053-everything-you-need-to-know-about-your-30-day-sablono-trial
29. Sablono Support — **Is my data hosted in a secure way** (AWS Frankfurt/Parijs, GDPR-rollen) · https://support.sablono.com/en/articles/9263073-is-my-data-on-sablono-hosted-in-a-secure-way

### Onafhankelijke reviews

30. **Capterra — Sablono Platform Reviews** (5,0/5 uit 9 reviews; pros én cons geciteerd) · https://www.capterra.com/p/186436/sablono/reviews/
31. **Software Advice — Sablono Platform profiel** (subscores, "Starting Price: Custom quote", geen gratis proef vermeld) · https://www.softwareadvice.com/construction/sablono-profile/
32. Capterra Duitsland — Sablono · https://www.capterra.com.de/software/186436/sablono
33. G2 — Sablono Reviews (31 reviews; pagina blokkeert geautomatiseerde toegang, aantal via zoekresultaat) · https://www.g2.com/products/sablono/reviews
34. Slashdot — Sablono (geen reviews aanwezig) · https://slashdot.org/software/p/Sablono/

### Bedrijfs- en marktdata

35. **North Data — Sablono GmbH, HRB 150583 B** (registratie, 7 aandeelhouders; financiën achter betaalmuur) · https://www.northdata.de/Sablono+GmbH,+Berlin/HRB+150583+B
36. **Lean Construction Blog — Last Planner & Takt Software Directory** (19 tools; Sablono ontbreekt) · https://leanconstructionblog.com/Last-Planner-and-Takt-Software-Directory.html
37. Tracxn — Sablono financieringsoverzicht (ca. $7,84 mln totaal) — via zoekresultaat, niet direct geraadpleegd
38. Aggregatorschattingen ARR/medewerkers/waardering (~$3,2 mln ARR, ~29 fte, ~$9,6 mln waardering, 2025) — **[SCHATTING, onbevestigd]**, via zoekresultaat

### Methodologische aantekening

De WebSearch-quota van deze sessie was uitgeput; het onderzoek is uitgevoerd met directe
WebFetch- en HTTP-ophaalacties op leveranciers-, support-, developer- en reviewsites, aangevuld met
DuckDuckGo-HTML-zoekopdrachten via WebFetch. G2 (HTTP 403), ITQlick (HTTP 403) en de
premium-secties van North Data waren niet toegankelijk; de gedetailleerde import-/exporthandleidingen
van Sablono staan achter een login op `app.sablono.com`. Waar dit tot onzekerheid leidt — met name
de exacte ondersteunde bestandsformaten (XER, P6 XML, MPP, MSPDI) en de actuele bedrijfscijfers —
is dat in de tekst gemarkeerd als **[NIET GEVERIFIEERD]** of **[SCHATTING]** in plaats van ingevuld
met aannames.
