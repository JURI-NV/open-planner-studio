# Elecosoft Asta Powerproject — diepgaand softwareprofiel

**Onderzoeksdatum:** 25 juli 2026
**Analist:** software-analist, marktonderzoek planningssoftware
**Onderzocht in het kader van:** benchmark voor een open-source, IFC-gebaseerde bouwplanner (Open Planner Studio)

---

## 0. Verantwoording en betrouwbaarheid van dit profiel

**Methode.** Dit profiel is gebaseerd op directe raadpleging (WebFetch) van: de leverancierssite (eleco.com, inclusief de Duitse vestigingssite), de officiële producthelp (help.elecosoft.com), de officiële release notes, de UK-overheidsinkoopcatalogus G-Cloud 14 (Crown Commercial Service), de investor-relationspagina's van Eleco plc, twee reviewaggregators (Capterra, GetApp, Software Advice), een Amerikaanse reseller met openbare prijslijst (Projects Analytics), en drie onafhankelijke vergelijkingsbronnen (Eastwood Harris, ScheduleReader, PBC Today). Zoekopdrachten liepen via DuckDuckGo-HTML/Lite als vervanging voor de reguliere zoektool.

**Beperkingen — expliciet vermeld voor eerlijkheid:**

| Bron | Status | Gevolg |
|---|---|---|
| Reddit (r/projectmanagement, r/construction, r/civilengineering) | Volledig geblokkeerd voor deze omgeving | Geen directe citaten van Reddit; wel één via zoeksnippet |
| G2 | HTTP 403 | Geen G2-scores of -citaten |
| TrustRadius | HTTP 403 | Geen TrustRadius-data |
| Gartner Peer Insights | Niet bereikbaar/geen listing gevonden | Ontbreekt |
| Planning Planet forum | HTTP 403 op threadniveau | Alleen threadtitels via zoeksnippets |
| shop.eleco.com (webshop) | Herhaald HTTP 429 (rate limit) | Prijs alleen via zoeksnippet — zie §3, gemarkeerd |

Waar een cijfer of bewering **niet** hard uit een geraadpleegde bron komt, staat er expliciet **[SCHATTING]** of **[NIET GEVERIFIEERD]** bij. Reviewscores komen van slechts 34 reviews — statistisch dun, en dat is een relevante bevinding op zichzelf (zie §5).

---

## 1. Wat het is

### 1.1 Product

**Asta Powerproject** (vaak kortweg "Powerproject", in Duitsland ook "Asta") is Windows-desktop-planningssoftware voor de bouw: CPM-planning, Gantt, resources, kosten, baselines, risicoanalyse en geïntegreerde 4D/BIM. Het is geen generieke projectmanagementtool met een bouwsausje, maar een tool waarvan de datamodel- en UI-keuzes zijn gemaakt vanuit bouwplanningspraktijk (voortgangsperioden, taakkalenders per balk, line of balance, meerdere rapportagedata).

De actuele versie is **Asta Powerproject 2026.1**. De 2026-generatie is achterwaarts compatibel met versie 17 ("Full backward combability with Version 17"); de generatie **Asta Powerproject 2026** werd volgens de eigen releasepagina **medio juni 2025** uitgebracht — 2026.1 is de daaropvolgende punt-release.
*Bron: [help.elecosoft.com — release notes 2026.1](https://help.elecosoft.com/powerproject_release_notes/english/Content/HTML%20Topics/2026_1.htm), geraadpleegd 25-07-2026; [eleco.com/asta-powerproject-2026](https://eleco.com/asta-powerproject-2026/), geraadpleegd 25-07-2026.*
> **Verificatiecorrectie (25-07-2026):** het eerder vermelde buildnummer **18.0.02.001** staat *niet* in de release notes en kon in de verificatieronde nergens worden bevestigd — verwijderd. Ook "uitgebracht medio juni" zonder jaartal was misleidend: de releasepagina noemt medio juni **2025** voor de 2026-generatie.

### 1.2 Leverancier, eigendom en historie

**Eleco plc** — beursgenoteerd aan de Londense AIM onder ticker **ELCO**. Koers op onderzoeksdatum: **130,50p**, 52-weeksbereik 106,50–175,40.
*Bron: [ir.eleco.com/investor-relations](https://ir.eleco.com/investor-relations/), geraadpleegd 25-07-2026.*

**Belangrijke bevinding — actieve rebranding.** Tijdens dit onderzoek bleek `elecosoft.com` een **HTTP 301 permanent redirect** te geven naar `eleco.com`. Het concern hernoemt zichzelf van *Elecosoft* terug naar *Eleco*; de productnaam "Asta Powerproject" blijft. Merkarchitectuur in transitie: op productpagina's staat nog "Elecosoft", contact-e-mail is nog `powerproject@elecosoft.com`, de helpsite draait nog op `help.elecosoft.com`. Voor inkopers betekent dit rommelige documentatie en verwarrende URL's in de komende jaren.
*Bron: eigen waarneming redirect elecosoft.com → eleco.com, 25-07-2026; [eleco.com](https://eleco.com/), geraadpleegd 25-07-2026.*

**Merkenportfolio Eleco:** Asta Powerproject, Asta Estimate (calculatie), IconSystem (cloud-BIM-samenwerking), ShireSystem (CMMS), Pemac (onderhoudsmanagement, overgenomen 14 januari 2025), PM3, Kivue Perform, Staircon, Statcon.
*Bron: [eleco.com](https://eleco.com/) en [ir.eleco.com](https://ir.eleco.com/investor-relations/), 25-07-2026.*

**Historie.** Powerproject is **in 1986 ontwikkeld en uitgebracht door het Britse Asta Development**; **Eleco plc nam Asta Development in 2006 over**. Planning Planet-threads over Powerproject dateren tot minstens 2006. De licentieserver bestaat "sinds Powerproject 8". Rond versie 16 heeft Elecosoft de merknaam *Asta* formeel teruggebracht over de hele planningsuite (Asta Powerproject, Asta Vision, Asta Enterprise, Asta SiteProgress, Asta Connect), omdat het product in de markt toch al "Asta" werd genoemd.
*Bron: [eleco.com — "Elecosoft brings back Asta brand"](https://eleco.com/news/elecosof-brings-back-asta-brand-represent-scheduling-suite/) ("Asta Powerproject was first developed and released in 1986 by the company Asta Development ... prior to the company's acquisition by Eleco in 2006"), geraadpleegd 25-07-2026; [support.astadev.de/lizenzen](https://support.astadev.de/lizenzen), 25-07-2026.*
> **Verificatiecorrectie (25-07-2026):** de eerdere formulering "stamt uit de jaren '90" was **onjuist** — het is 1986. Het eerder als **[NIET GEVERIFIEERD]** gemarkeerde overnamejaar **2006** is nu wél bevestigd, met de leverancier zelf als bron.

### 1.3 Financiële omvang en gezondheid (FY2025)

| Metriek | FY2025 | Verandering |
|---|---|---|
| Omzet | £38,8 mln | +20% |
| Totaal terugkerende omzet (TRR) | £31,3 mln (2024: £24,9 mln) | +26% |
| ARR | £34,3 mln | +29% |
| Aandeel terugkerend in omzet | 81% (record) | — |
| Adjusted EBITDA | £10,2 mln (2024: £7,7 mln) | +32% |
| Adjusted profit before tax | £7,3 mln (2024: £5,4 mln) | +35% |
| **Perpetual licentie-omzet** | **£545k** | **van £1.013k (−46%)** |

**Omzet per regio (FY2025):**

| Regio | Omzet | Aandeel | Groei |
|---|---|---|---|
| Verenigd Koninkrijk | £18,4 mln | 47% | +16% |
| Rest van Europa (incl. Pemac) | £7,7 mln | 20% | +47% |
| Scandinavië | £6,9 mln | 18% | +18% |
| **Duitsland** | **£3,3 mln** | **8%** | **+8%** |
| **VS** | **£1,5 mln** | **4%** | **−10%** |
| Rest van de wereld | £1,1 mln | 3% | +50% |

**Omzet per segment:** Building Lifecycle £31,1 mln (80%, +29%); CAD & Visualisatie £5,8 mln (15%, −10%); overig/derden £1,9 mln (5%).

*Bron: [ir.eleco.com/regulatory/final-results-8](https://ir.eleco.com/regulatory/final-results-8/), geraadpleegd 25-07-2026. Volledig jaarverslag: [Eleco plc Annual Report 2025 (PDF)](https://ir.eleco.com/wp-content/uploads/2026/05/5770_Eleco-plc-Annual-Report-2025_Hyperlink.pdf).*

**Interpretatie.** De bijna-halvering van perpetual-omzet naar £545k (−46%) is het duidelijkste signaal in de cijfers: eeuwigdurende licenties zijn feitelijk uitgefaseerd. Wie in 2026 Powerproject koopt, koopt een abonnement. De VS-krimp van 10% laat zien dat de Angelsaksische expansie buiten het VK niet lukt — Primavera P6 en Microsoft Project houden daar stand.

### 1.4 Doelgroep, gebruikers, sectoren en regio's

- **Gebruikersaantal:** meer dan **100.000 professionals wereldwijd**.
  *Bron: [eleco.com/products/asta-powerproject](https://eleco.com/products/asta-powerproject/) en [eleco.com/de/produkte/asta/asta-powerproject](https://eleco.com/de/produkte/asta/asta-powerproject/), 25-07-2026.*
- **VK-penetratie:** "vertrouwd door **90 van de top 100 hoofdaannemers in het VK**". **Let op:** dit is een leverancier-afkomstig marketingcijfer dat per bron en per jaar verschilt — reseller PM ERA noemt **94** van de top 100. Het getal is nergens onafhankelijk geauditeerd en er is geen definitie van "top 100" bij vermeld. Behandel het als orde van grootte ("de overgrote meerderheid"), niet als exact cijfer.
  *Bronnen: [PBC Today, 22-09-2023](https://www.pbctoday.co.uk/news/digital-construction-news/construction-software-news/nodes-links-to-work-on-asta-powerproject-with-elecosoft/132745/) (90); [pmera.com — Powerproject](https://www.pmera.com/software/powerproject/) (94). Beide geraadpleegd 25-07-2026.*
- **Typische gebruikers:** bouwplanners, projectmanagers, uitvoerders/site managers, werkvoorbereiders bij hoofdaannemers, gespecialiseerde onderaannemers en woningbouwers.
- **Sectoren:** woningbouw, utiliteitsbouw, industriebouw, infrastructuur en civiele techniek, wegenonderhoud (highways maintenance), mijnbouw en grondverzet.
- **Genoemde klanten:** Balfour Beatty, BAM Construction (VK/Ierland), McGee, HOCHTIEF; in Duitsland **STRABAG, PORR, Leonhard Weiss**.
  *Bron: [eleco.com/de/produkte/asta/asta-powerproject](https://eleco.com/de/produkte/asta/asta-powerproject/) en PBC Today, 25-07-2026.*
- **Talen:** Engels (meerdere regionale varianten), Deens, Nederlands, Fins, Duits, Noors, Zweeds, Frans, Pools, Spaans, Italiaans, Turks.
  *Bron: [eleco.com/products/asta/asta-powerproject](https://eleco.com/products/asta/asta-powerproject/), 25-07-2026.*
- **Erkenning:** twaalf opeenvolgende jaren "Project Management Software of the Year" bij de UK Construction Computing Awards, plus "Company of the Year" (FY2025).
  *Bron: [ir.eleco.com/regulatory/final-results-8](https://ir.eleco.com/regulatory/final-results-8/), 25-07-2026.*

---

## 2. Functionaliteit en techniek

### 2.1 CPM-engine — het sterkste technische argument

Powerproject heeft, van de drie grote spelers, aantoonbaar de meest configureerbare planningsengine. Volgens de vergelijkende analyse van Paul E. Harris (Eastwood Harris, auteur van de standaardhandboeken over alle drie de pakketten):

- **Instelbaar algoritme:** "many scheduling options to allow the imitation of either Microsoft Project or P6 scheduling algorithms" — je kunt Powerproject het rekengedrag van MSP óf van P6 laten nabootsen. Dat is uniek en direct relevant bij gemengde ketens.
- **Onbeperkt aantal links tussen twee activiteiten:** waar MS Project maar één relatie tussen twee taken toestaat, staat Powerproject er meerdere toe, "allowing a partial critical path through activities". Dat maakt gedeeltelijke overlap van bouwactiviteiten (bijv. wapenen → storten → ontkisten per stort) modelleerbaar zonder kunstmatige opsplitsing.
- **Link categories:** links kunnen worden gecategoriseerd, opgemaakt en **aan- of uitgezet**. Daarmee zijn "multiple build options in one schedule" mogelijk — meerdere bouwvolgorden in één bestand, in plaats van drie losse scenariobestanden.
- **Relink around completed tasks:** logica herstelt zich rond afgeronde taken.

*Bron: [Eastwood Harris — Comparison of Microsoft Project, Oracle Primavera P6 and Elecosoft Asta Powerproject](https://eastwoodharris.com/comparison-of-microsoft-project-oracle-primavera-p6-and-elecosoft-asta-powerproject/), geraadpleegd 25-07-2026.*

### 2.2 Kalenders

Powerproject toont **per taak de eigen niet-werktijd achter of op de balk**: "each task is displayed with its own calendar". Dit lost expliciet het bekende MS Project-probleem op dat je geen kalenders met verschillende urenlengtes per dag kunt hebben zonder dat de duur in dagen fout wordt ("there is only one factor to calculate the duration in days" in MSP).

Aanvullend, en typisch bouw:
- **Task snapping** — resterende duren worden op hele of halve dagen afgerond.
- **"Task start on new day"** — voorkomt dat een grote betonstort een uur voor werkdageinde begint.

*Bron: Eastwood Harris, geraadpleegd 25-07-2026.*

### 2.3 Resource- en kostenmodel

- Twee resourcetypen: **permanent** (arbeid, materieel) en **consumable** (verbruiksmateriaal).
- **Task Work-functie** voor het beheren van materiaalhoeveelheden — expliciet genoemd als het middel om "mining and earth moving operations using resources for the mobile equipment" te modelleren, iets wat MS Project niet kan omdat het geen "Units per Time period as a production rate for a Material Resource" ondersteunt.
- **Histogrammen** van resourcegebruik, kosten, taakwerk en scheduling-dagen, met zichtbare over- en onderbezetting.
- **Multi-currency**: rijker dan P6 — bij export naar Primavera worden alle bedragen platgeslagen naar één valuta (zie §6).
- Taakpools en codebibliotheken voor snel opbouwen van plannen; sinds 2026.1 kunnen code- en resourcelijsten uit Excel/Word in de Library Explorer geplakt worden.

*Bronnen: Eastwood Harris; [help.elecosoft.com — histogrammen](https://help.elecosoft.com/powerproject/english/help/); [help.elecosoft.com — Primavera-uitwisseling](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Starting_work/Primavera/Xfer_Primavera.htm); release notes 2026.1. Alle 25-07-2026.*

### 2.4 Baselines — beter dan beide concurrenten

- **Onbeperkt aantal baselines**, waarvan er **tot 10 tegelijk in de Gantt getoond** kunnen worden.
- Baselines krijgen een **naam en beschrijving** (MS Project kan baselines niet benoemen).
- **Volledige baselinedata** zichtbaar vanuit het huidige project, inclusief resource-eigenschappen én relaties (MS Project bewaart geen kritiek pad, relaties of constraints in een baseline; P6 bewaart wel volledige kopieën maar heeft het verwarrende "Planned Dates"-mechanisme).

*Bron: Eastwood Harris; ScheduleReader-vergelijking ("up to 10 displayable baselines with resource and cost data" versus P6's "unlimited baselines but displays only 4 with limited data"), beide 25-07-2026.*

### 2.5 Voortgang, korte-cyclusplanning en progress periods — de kernkracht

Dit is waar Powerproject in de dagelijkse bouwpraktijk het verschil maakt, en het rechtvaardigt de aanwijzing "kracht bij korte-cyclus bouwplanning".

**Progress periods** zijn bibliotheekobjecten met drie elementen: een **rapportdatum**, een **lijnstijl**, en **kleuren/arceringen** waarmee balken worden geschaduwd. Kenmerken:

- **Hiërarchisch te nestelen** — bijvoorbeeld maandperioden met daaronder weekperioden, elk met eigen visuele signatuur. Je ziet dus in één Gantt in welke week welk werk daadwerkelijk is gemaakt.
- **Progress entry period**: de periode waar nieuwe voortgang standaard tegen wordt geboekt; moet vóór elke week- of maandupdate ververst worden — vergeten leidt tot voortgang op de verkeerde periode.
- **Vergrendelbaar**: historische of te vroege toekomstige perioden kunnen worden gelockt tegen per ongeluk boeken.
- Meerdere voortgangsboekingen binnen één periode zijn toegestaan.

Aanvullend:
- **Meerdere Report Dates (data dates/status dates)** kunnen aan het begin van het project worden gezet — P6 en MSP kennen er in de praktijk één.
- **Meerdere splits in verleden én toekomst**, met behoud van baseline.
- **Drie verschillende tijdschalen**, waarbij elke tijdsegment van de Gantt zijn eigen schaal kan hebben (SureTrak-achtig) — dus een 6-weeks lookahead in dagen naast het jaarplan in maanden, in één beeld.

*Bronnen: [help.elecosoft.com — Using progress periods](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Progress/Using_progress_periods/Using_progress_periods.htm); Eastwood Harris. Beide 25-07-2026.*

### 2.6 Line of Balance

Ingebouwde LOB-grafieken voor repetitief werk via **unit networks** — sets gekoppelde taken die per locatie/kavel/verdieping herhalen. In woningbouw is elk bouwnummer een unit network; de LOB toont per bouwfase één lijn over alle locaties.

- "The rate of production of a stage is indicated by the steepness of its line"; afstand tussen lijnen toont afhankelijkheden.
- Knelpunten zijn zichtbaar als gebroken lijnen die doorwerken naar volgende fasen.
- Verschillende ploegen/gangs kunnen eigen productiesnelheden krijgen.
- Voortgang kan in de LOB-grafiek gemarkeerd worden ("Show progress" checkbox).

*Bron: [help.elecosoft.com — Introduction to Line of Balance graphs](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/LOB/LOB_intro.htm), 25-07-2026.*

### 2.7 Risico / Monte Carlo

Risicoanalyse is een **standaardonderdeel** van Powerproject — het product wordt door de leverancier zelf gepositioneerd als "powerfully simple project management **and risk analysis** software". In een officieel Elecosoft-webinar over risicoanalyse wordt gesteld: "All risk functionality comes standard with the software at no extra cost."

Dat is commercieel relevant: bij Oracle is kwantitatieve risicoanalyse historisch een aparte aankoop (Primavera Risk Analysis), net als Deltek Acumen Risk of Safran Risk.

**Kanttekening [NIET VOLLEDIG GEVERIFIEERD]:** ik heb géén officiële documentatiepagina kunnen openen die de diepte van de Monte Carlo-implementatie beschrijft (verdelingstypen, aantal iteraties, risicoregister, correlatie, criticality/cruciality-index, risicopadanalyse). Op basis van de marketingpositionering en het ontbreken van diepgaande technische documentatie is mijn **[SCHATTING]** dat de risicomodule geschikt is voor standaard drie-punts-schattingen en tornado-/histogramuitvoer, maar niet de analytische diepgang van Safran Risk of Primavera Risk Analysis heeft. Wie QSRA volgens strikte opdrachtgeverseisen moet leveren, moet dit expliciet laten aantonen in een proof of concept.

*Bron: [Elecosoft Powerproject webinar 6 — Risk Analysis](https://www.youtube.com/watch?v=hgPrQpeMscA) via zoeksnippet; [eleco.com/products/asta-powerproject](https://eleco.com/products/asta-powerproject/). Beide 25-07-2026.*

### 2.8 4D / BIM — Powerproject BIM (Asta 4D)

**Positionering:** "Powerproject BIM is an integrated module for Asta Powerproject which enables you to easily link the tasks in your project plan with 3D model components for 4D planning in one solution." Het onderscheidende punt tegenover Synchro en Navisworks is dat plannen en 4D-visualisatie **in dezelfde applicatie** zitten — geen export-import-cyclus tussen twee producten.

**Functionaliteit:**
- Realtime koppeling: "Instantly see the impact of changes in the 3D view as you update the Gantt chart."
- Scenario's draaien om procesverbeteringen te toetsen vóór uitvoering.
- Planned-versus-actual-visualisatie.
- Video-export van de bouwvolgorde.
- Gratis viewer voor stakeholders (**.PPV**-formaat, met bijbehorend IFC-model of IFC-groepsmodel).

**IFC-ondersteuning (kern voor dit onderzoek):**
- Modellen worden ingelezen als **IFC**. **[ONZEKER — verificatie 25-07-2026]** De eerder vermelde ondersteunde varianten "**IFC 2x3, 2x4 en 4**" en de verwijzing naar het "IFC4-datamodel" konden bij hercontrole op **geen enkele** van de geciteerde pagina's worden teruggevonden (`Schedule_from_IFC`, `Group_models_IFC_info_PP`, `eleco.com/products/asta/asta-powerproject-4d`); gerichte zoekopdrachten leverden evenmin een Elecosoft-bron op die schemaversies noemt. Elecosoft documenteert publiekelijk alleen dát IFC wordt ingelezen, **niet welke schemaversies**. Behandel de versielijst als onbevestigd en vraag dit expliciet uit bij een PoC. Merk ook op dat "IFC 2x4" geen officiële buildingSMART-release is — 2x4 was de werktitel van wat IFC4 werd, wat de claim extra verdacht maakt.
- Bronapplicaties: Revit, ArchiCAD, Tekla, "or other BIM tools that export IFC".
- **IFC group models** bundelen 3D-modellen zodat hun properties in Powerproject beschikbaar komen.
- **UDF-mapping:** IFC-properties worden gemapt op Powerproject user-defined fields van type string, integer of float. Bij taken met meerdere gekoppelde objecten worden integer- en float-waarden **gesommeerd** en string-waarden **geconcateneerd** (behalve bij identieke waarden).
- **Automatische schemageneratie uit het model:** een wizard bouwt de projecthiërarchie op basis van gekozen IFC-properties (typisch `Site`, `Building`, `BuildingStorey`), optioneel met aanmaak van codebibliotheken per unieke propertywaarde.

**Gedocumenteerde beperkingen van die automatische generatie:**
- Kale 3D-modellen zonder properties leveren nauwelijks bruikbare schema's op.
- Properties met veel lege waarden zijn ongeschikt als hiërarchieniveau.
- Modellen met terrein-/site-objecten moeten expliciet worden uitgesloten.
- Items kunnen achteraf niet tussen bovenliggende summary tasks verplaatst worden.
- Na afloop moet handmatig gecontroleerd worden of alle 3D-objecten aan taken zijn gekoppeld.

**Prestatie:** release 2026.1 vermeldt als gefixte issue dat "Asta Powerproject 4D opens very large 3D models significantly faster" — wat impliceert dat dit tot recent een reëel probleem was.

*Bronnen: [eleco.com/products/asta/asta-powerproject-4d](https://eleco.com/products/asta/asta-powerproject-4d/); [help.elecosoft.com — Schedule from IFC](https://help.elecosoft.com/powerproject_bim/english/help/Content/HTML%20Topics/Building_a_project_schedule/Schedule_from_IFC.htm); [help.elecosoft.com — IFC group models / properties](https://help.elecosoft.com/powerproject_bim/english/help/Content/HTML%20Topics/Group_models/Group_models_IFC_info_PP.htm); release notes 2026.1. Alle 25-07-2026.*

### 2.9 Multi-user, portfolio en de omliggende productfamilie

| Component | Wat het is | Deployment |
|---|---|---|
| **Asta Powerproject** | Kernproduct, planning + 4D + risico | Windows desktop |
| **Asta Enterprise** | Meerdere gebruikers tegelijk in gedeelde programmabestanden, gesynchroniseerde realtime updates; 3-tier architectuur op **SQL Server of Oracle** | Server/on-prem |
| **Asta Vision** | Webportal: centraal schemabeheer, BI-dashboards, workflowautomatisering, geïntegreerde rapportage | Cloud/web |
| **Asta Vision Live** | Gelijktijdige multi-usersamenwerking via Vision | Cloud/web |
| **Asta Vision Plus** | "Governed project data hub": **API** naar programmadata, revisiehistorie BI-toegankelijk, trendanalyse, forecasting, gestandaardiseerde codes/kalenders/workflows, audit trails | Cloud/web |
| **Asta SiteProgress** | Mobiele voortgangsregistratie vanaf de bouwplaats (iOS/Android); sinds 2026 federated identity via Microsoft Entra ID | Mobiel |
| **Asta Connect** | Collaboratief taakbeheer | Cloud |
| **Asta Project Viewer** | Gratis viewer voor stakeholders zonder licentie | Desktop |
| **EasyPlan** *(ontbrak in de eerste versie van dit profiel)* | "A lean stand alone version of Asta Powerproject suited for smaller contractors or work packages"; wordt gepositioneerd als complementair aan Powerproject — uitvoerders/pakketteams plannen erin terwijl het hoofdprogramma in Powerproject blijft. Wisselt bestanden uit met Primavera en MS Project. Staat in de officiële prijslijst 2023 mét abonnements- én perpetual-varianten | Windows desktop |
| **AstaGPT** | Browser-gebaseerde AI-assistent, getraind op de Elecosoft-helpdocumentatie (~1,5 miljoen woorden); ondersteunt 150+ talen; dekt Asta Powerproject, Asta Vision en SiteProgress. **Let op: dit is een documentatie-chatbot, geen planningsintelligentie** — bevestigd bij hercontrole. *(De eerdere vermelding "gelanceerd op de Asta Innovation Summit (Nashville)" staat niet op de productpagina en is **onbevestigd** — verwijderd als feit.)* | Browser |

*Bronnen: [eleco.com/products/asta-powerproject](https://eleco.com/products/asta-powerproject/); [eleco.com/products/asta-powerproject/asta-vision](https://eleco.com/products/asta-powerproject/asta-vision/); [ScheduleReader-vergelijking](https://schedulereader.com/asta-powerproject-vs-primavera-p6/); [eleco.com/products/asta/astagpt](https://eleco.com/products/asta/astagpt/); release notes 2026.1. Alle 25-07-2026.*

### 2.10 Platform

- **Primair Windows desktop.**
- **SaaS:** cloud-gehoste versie, browsertoegang (IE 11, Edge, Firefox, Chrome, Safari, Opera). Uitdrukkelijk **niet mobiel-geoptimaliseerd**.
- **macOS:** alleen via de SaaS-variant in de browser — er is geen native Mac-client.
- **Mobiel:** alleen via SiteProgress-app (apart gelicentieerd).
- **Uptime-garantie SaaS:** 99,8% met service credits; onderhoudsvenster 19:00–23:00.

*Bron: [G-Cloud 14 — Asta Powerproject SaaS, service-ID 159955281882828](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828), geraadpleegd 25-07-2026; [eleco.com/products/asta/asta-powerproject](https://eleco.com/products/asta/asta-powerproject/).*

### 2.11 Schaalbaarheid — hoeveel activiteiten realistisch?

**Er is geen gepubliceerde harde limiet.** De officiële documentatiepagina "Maximising performance with large projects" erkent het probleem echter openlijk:

> "If you are working with a particularly large project, you may notice that Asta Powerproject works more slowly than it does when you work with smaller projects. This is normally a result of the large amounts of tasks and allocations that are included in the project, and the number of calculations that Asta Powerproject has to make as you work with the project."

En: "The more (tasks and allocations) you have in a single chart, the slower Asta Powerproject will work."

**Officiële mitigatie-adviezen** (die tegelijk de aard van het probleem verraden):
1. Splits in **subcharts** met expanded tasks en summary groups — "Expanded tasks are generally more effective than summary tasks in this respect".
2. Vermijd rollup-velden in de spreadsheet — "can cause Asta Powerproject's performance to suffer".
3. Gebruik **hammocks in plaats van filters** om niet-aaneengesloten taken te benaderen.
4. **Verberg allocatielijnen** in de balkweergave wanneer niet nodig — "can improve performance significantly".
5. Sluit histogrammen wanneer niet nodig.
6. Gebruik drag-and-drop in plaats van knippen/plakken.

**Praktische inschatting [SCHATTING, gebaseerd op de officiële mitigatiehandleiding, het ontbreken van gepubliceerde benchmarks en gebruikersmeldingen over crashes bij grote bestanden]:** een enkel programma van enkele duizenden tot circa 10.000–20.000 activiteiten is comfortabel werkbaar mits gestructureerd in subcharts; daarboven begint hinder en wordt disciplinaire opsplitsing noodzakelijk. Voor megaprojecten met honderdduizenden activiteiten in één integraal model is Primavera P6 architectonisch beter toegerust — Eastwood Harris schrijft: *"The great advantage of P6 is the ability to handle massive amounts of data"*. Dit cijfer is **niet** door de leverancier bevestigd en moet met een pilot op eigen data worden getoetst.

*Bron: [help.elecosoft.com — Maximising performance with large projects](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Structuring_your_project/Maximise_performance/Maximising.htm), 25-07-2026; Eastwood Harris; [softwareadvice.com reviews](https://www.softwareadvice.com/project-management/powerproject-profile/), 25-07-2026.*

---

## 3. Prijzen

Powerproject is **niet transparant geprijsd** op de eigen productpagina — die verwijst naar een proefaanvraagformulier en het salesnummer +44 1844 261 700. Er zijn echter meerdere openbare bronnen met concrete bedragen, waaronder één officiële overheidsinkoopcatalogus. Alle bedragen hieronder zijn **exclusief btw** tenzij anders vermeld.

### 3.1 Overzicht gevonden lijstprijzen

| Bedrag | Wat | Bron | Bronkwaliteit | Datum geraadpleegd |
|---|---|---|---|---|
| **£1.113 / gebruiker / jaar** | Asta Powerproject **SaaS**, 12 maanden, vooraf betaald, excl. btw, incl. 1 GB opslag per gebruiker | [G-Cloud 14, Crown Commercial Service, service-ID 159955281882828](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828) | **Hoogste — officiële overheidsinkoopcatalogus, door leverancier zelf ingediend** | 25-07-2026 |
| **US$ 1.340 / jaar** | **Named seat** annual subscription — "purchased upfront and installed onto a single Windows PC"; incl. één dag gratis virtuele training | [Projects Analytics (US-reseller)](https://projectsanalytics.com/purchase-powerproject-licenses/) | Hoog — openbare resellerprijslijst met winkelwagen | 25-07-2026 |
| **US$ 2.200 / jaar** | **Concurrent license** annual subscription — "software installed locally, but license held in the Cloud"; gedeeld over meerdere gebruikers | [Projects Analytics](https://projectsanalytics.com/purchase-powerproject-licenses/) | Hoog | 25-07-2026 |
| **US$ 1.675 / gebruiker / jaar** | Genoteerde startprijs, abonnement | [Capterra](https://www.capterra.com/p/173782/Powerproject/), [GetApp](https://www.getapp.com/project-management-planning-software/a/powerproject/), [Software Advice](https://www.softwareadvice.com/project-management/powerproject-profile/) | Middel — aggregators, doorgaans leverancier-aangeleverd | 25-07-2026 |
| **£1.470 / jaar** ⚠️ | Single user, jaarabonnement, directe webshop | shop.eleco.com/products/asta-powerproject-uk | **ZEER LAAG — zie waarschuwing hieronder** | 25-07-2026 |
| **US$ 1.495** (list US$ 1.575) | "Asta PowerProject is licensed for Concurrent use" — periode/licentietype (perpetual of abonnement) **niet vermeld**; pagina positioneert het als "the perfect replacement for SureTrak", wat op verouderde content wijst | [PSG Inc (US-reseller)](https://www.psgincs.com/product/asta-powerproject-construction-software/) | Laag — waarschijnlijk verouderde resellerpagina, maar wél een echte tweede resellerprijs | 25-07-2026 (nieuw in verificatieronde) |
| **£880 / jaar** | "single-user subscription license starts at £880 per annum"; concurrent en SaaS "at custom rates" | [pricingnow.com](https://pricingnow.com/question/powerproject-pricing/) (bijgewerkt 08-03-2026); ook [softwarefinder.com](https://softwarefinder.com/project-management-software/powerproject) | **Laag — derdepartij-prijsblog, niet herleidbaar tot leverancier; behandel als instap-/kortingsniveau of verouderd** | 25-07-2026 |
| **vanaf US$ 2.000 / gebruiker / jaar** | "total cost per license that starts at $2000 per user/year, there are additional costs such as customization, data migration" | [ITQlick](https://www.itqlick.com/asta-powerproject/faq) — via zoeksnippet; site gaf HTTP 403 | **Laag — en aantoonbaar intern inconsistent:** ITQlick noemt op vergelijkingspagina's óók "$1,300 per license" | 25-07-2026 |

> ⚠️ **Verificatiewaarschuwing bij £1.470 (shop.eleco.com), 25-07-2026.** In de verificatieronde is `shop.eleco.com` opnieuw benaderd via de productpagina, `/collections/all` en het Shopify-endpoint `/products.json` — **alle drie HTTP 429**. Aanvullend zijn `site:shop.eleco.com`-zoekopdrachten gedraaid: de productpagina's komen wel terug in de index, maar **zonder enige prijssnippet in GBP**. Het bedrag £1.470 kon dus in twee onafhankelijke pogingen **niet worden gereproduceerd**, ook niet als snippet. Bronkwaliteit verlaagd van "Middel" naar **"zeer laag / onbevestigd"**. Gebruik dit bedrag niet in een vergelijking zonder eerst zelf de webshop te openen.
>
> **Gevolg voor het "32%-verschil"-argument.** De conclusie in §5.10 dat de eigen webshop (£1.470) en de eigen G-Cloud-opgave (£1.113) "32% uit elkaar liggen" rust volledig op dit onbevestigde bedrag en is daarmee **niet houdbaar als hard feit**. De bredere observatie — dat de openbare prijsbronnen meer dan een factor twee uiteenlopen — blijft wél overeind, ook zónder £1.470: £880 tot US$2.200 is op zichzelf al ruim factor twee.

### 3.2 Licentiemodellen

Officieel worden vier modellen gevoerd:

1. **Single user / Einzelplatz** — één gebruiker, één apparaat (Windows-pc).
2. **Concurrent / server licence** — sinds Powerproject 8 bestaat de **Asta Lizenzserver**: een centrale dienst op een eigen server die clients van licenties voorziet. Ook als netwerklicentie beschikbaar. Bij de Amerikaanse reseller wordt de licentie in de cloud gehouden terwijl de software lokaal draait.
3. **SaaS-cloudabonnement** — toegang via browser, ook op Mac.
4. **Education** — **gratis** onderwijslicenties voor instellingen, via aanvraag ("Bildungslizenzen: kostenlos").

*Bronnen: [eleco.com/products/asta/asta-powerproject](https://eleco.com/products/asta/asta-powerproject/); [support.astadev.de/lizenzen](https://support.astadev.de/lizenzen); [eleco.com/de/produkte/asta/asta-powerproject](https://eleco.com/de/produkte/asta/asta-powerproject/); [Projects Analytics](https://projectsanalytics.com/purchase-powerproject-licenses/). Alle 25-07-2026.*

### 3.3 Perpetual + onderhoud

**Perpetual licenties zijn feitelijk uitgefaseerd.** Eleco rapporteert over FY2025 een perpetual licentie-omzet van **£545k**, terug van **£1.013k** (−46%), en beschrijft de eigen situatie als "post our SaaS financial transition". Er is **op de huidige leverancierskanalen** geen publiek gepubliceerde perpetual-prijslijst meer — zie echter de nuancering hieronder over de prijslijst van januari 2023.

**[SCHATTING]** Historisch lag het model op een eenmalige licentie in de orde van £2.000–3.500 per seat plus 18–22% jaarlijks onderhoud — dit is een **schatting op basis van gangbare marktverhoudingen in dit segment en is in dit onderzoek niet met een bron bevestigd**. Ga er bij nieuwe aanschaf in 2026 van uit dat perpetual niet meer aangeboden wordt, of alleen na stevige onderhandeling bij grote volumes.

**[NIEUW — verificatieronde 25-07-2026] Nuancering: er *is* een recente officiële perpetual-prijslijst geweest.** Er bestaat een document *"Powerproject End User Price List 2023"* (januari 2023, **in euro's**) dat expliciet **zowel abonnementen (1-, 2- en 3-jarige termijnen) als perpetual licenties met jaarlijkse maintenance** bevat, voor single-user én concurrent, plus SiteProgress en Powerproject Vision. Het document is alleen via Scribd gevonden en gaf een laadfout, dus de **concrete bedragen konden niet worden gelezen**. De stelling "er is geen publieke perpetual-prijslijst meer" moet daarom worden gelezen als: *niet meer op de leverancierskanalen van 2026*, terwijl er tot ten minste januari 2023 een officiële perpetual-prijslijst circuleerde. Dit is de meest kansrijke aanknoping voor wie de perpetual-schatting hierboven wél hard wil maken — vraag Eleco of een reseller om de historische prijslijst.
*Bron: [scribd.com — Powerproject End User Price List 2023](https://www.scribd.com/document/693881805/Powerproject-End-User-Price-List-2023) (bestaan van het document bevestigd via zoekindex; inhoud niet leesbaar), 25-07-2026.*

*Bron: [ir.eleco.com/regulatory/final-results-8](https://ir.eleco.com/regulatory/final-results-8/), 25-07-2026.*

### 3.4 Modules en add-ons

**Geen enkele module heeft een gepubliceerde lijstprijs.** Voor Powerproject BIM/4D, Asta Enterprise, Asta Vision, Asta Vision Plus, Asta Connect en SiteProgress geldt uitsluitend "op aanvraag" via sales of een erkende reseller.

Wat wél vaststaat:
- **Risicoanalyse is inbegrepen** — "All risk functionality comes standard with the software at no extra cost" (Elecosoft-webinar). Dit is een reëel kostenvoordeel tegenover Oracle, waar QSRA een aparte aankoop is.
- **Project Viewer is gratis** — stakeholders hebben geen licentie nodig om plannen te bekijken.
- **4D is een module**, dus een meerprijs bovenop de basislicentie.
- **SiteProgress is apart gelicentieerd**.
- **Asta Vision Plus (de API-laag) is een apart betaald product** — zie §6, dit is de duurste implicatie voor wie wil integreren.

**[SCHATTING]** Op basis van de aggregatorprijzen (US$1.675–2.000 als "startprijs" versus de reseller-basisprijs van US$1.340) is mijn inschatting dat een compleet ingerichte werkplek met 4D en Vision-toegang in de orde van **US$ 2.500–4.000 per gebruiker per jaar** ligt. Dit is **niet geverifieerd** en dient uitsluitend als budgetteringsindicatie.

### 3.5 Staffels, minimale afname, bijkomende kosten

- **Enterprise-staffels:** niet gepubliceerd. pricingnow.com noemt drie tiers (Basic / Pro met 4D / Enterprise met eigen database, "custom pricing") — **[bron van lage kwaliteit, behandel als indicatief]**.
- **Minimale afname:** niet gepubliceerd; G-Cloud vermeldt geen minimum contractomvang.
- **Lineaire schaling:** pricingnow rekent voor: 10 gebruikers ≈ £8.800/jaar, 100 gebruikers ≈ £88.000/jaar — dat wijst op **weinig tot geen volumekorting in de listprijs** [lage bronkwaliteit]. In de praktijk zullen grote aannemers wél korting bedingen [SCHATTING].
- **Bijkomende kosten (genoemd):** implementatie, datamigratie, training, en "anticipated annual price increases during renewal periods". Instructeurgeleide training kost extra; on-site support kost extra.
- **Inbegrepen in het SaaS-abonnement:** Q&A over gebruik, toegangsondersteuning, back-upbeheer, alle software-updates, videotrainingsbibliotheek en online tutorials.
- **Proefperiode:** 14 dagen volgens G-Cloud en de Duitse site; 30 dagen (verlengbaar) volgens de Duitse supportsite — **inconsistente informatie tussen leverancierskanalen**.

*Bronnen: [G-Cloud 14](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828); [pricingnow.com](https://pricingnow.com/question/powerproject-pricing/); [support.astadev.de/lizenzen](https://support.astadev.de/lizenzen). Alle 25-07-2026.*

---

## 4. VOORDELEN

**1. Echt bouwspecifieke planningssemantiek, niet een generieke tool met bouwlabels.**
Progress periods met hiërarchische week-in-maand-nesting, meerdere report dates, task snapping op hele/halve dagen, "task start on new day" tegen betonstorten die een uur voor werkeinde beginnen, meerdere splits in verleden én toekomst met behoud van baseline. Dit zijn stuk voor stuk oplossingen voor problemen die alleen een bouwplanner heeft. Geen enkele concurrent heeft deze combinatie.
*Onderbouwing: [help.elecosoft.com — Using progress periods](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Progress/Using_progress_periods/Using_progress_periods.htm); [Eastwood Harris-vergelijking](https://eastwoodharris.com/comparison-of-microsoft-project-oracle-primavera-p6-and-elecosoft-asta-powerproject/).*

**2. De meest configureerbare CPM-engine van de drie grote pakketten.**
Instelbaar om óf MS Project óf P6-scheduling na te bootsen; onbeperkt aantal links tussen twee activiteiten voor een partieel kritiek pad; link-categorieën die aan/uit kunnen zodat meerdere bouwvarianten in één bestand leven in plaats van in drie losse bestanden; "relink around completed tasks". Voor scenariowerk en tenderplanning is dat een substantieel productiviteitsverschil.
*Onderbouwing: Eastwood Harris.*

**3. Kalenders per taak, zichtbaar op de balk — lost een reëel MSP-defect op.**
Elke taak toont zijn eigen niet-werktijd achter of op de balk. MS Project kan aantoonbaar geen kalenders met verschillende urenlengtes per dag hanteren zonder dat de duur in dagen fout wordt. Bij ploegendiensten, weekendwerk, winterstops en vorstverlet is dit het verschil tussen een kloppende en een misleidende planning.
*Onderbouwing: Eastwood Harris.*

**4. Superieur baselinebeheer.**
Onbeperkt aantal baselines, tot 10 gelijktijdig zichtbaar in de Gantt, elk met naam en beschrijving, en met volledige data inclusief resource-eigenschappen en relaties. P6 toont er in de praktijk 4 met beperkte data; MS Project kan baselines niet eens benoemen en bewaart geen relaties of kritiek pad. Voor claims, vertragingsanalyse en NEC-achtige contractadministratie is dit direct geld waard.
*Onderbouwing: Eastwood Harris; [ScheduleReader](https://schedulereader.com/asta-powerproject-vs-primavera-p6/).*

**5. Line of Balance ingebouwd, met unit networks.**
Repetitief werk — woningbouw per bouwnummer, verdiepingen, tunnelsegmenten, wegvakken — wordt gemodelleerd als herhaalde unit networks en getoond als productielijnen waarvan de steilheid het tempo weergeeft. Ploegen kunnen eigen productiesnelheden krijgen; knelpunten verschijnen als gebroken lijnen die zichtbaar doorwerken. Dit is de takttijd-/flow-planning die de bouw daadwerkelijk gebruikt, zonder aparte tool zoals TILOS.
*Onderbouwing: [help.elecosoft.com — LOB intro](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/LOB/LOB_intro.htm).*

**6. 4D/BIM in dezelfde applicatie als de planning — geen tweede product, geen tweede licentie.**
Wijzig de Gantt en zie de 3D-view direct meebewegen; draai scenario's; exporteer bouwvolgordevideo's; deel met een gratis viewer. De concurrentie vereist Synchro of Navisworks náást de planningstool, met een export-importcyclus die in de praktijk verwatert. Bovendien kan Powerproject een **schemahiërarchie automatisch genereren uit IFC-properties** (Site/Building/BuildingStorey) — een echte tijdwinst bij modelrijke projecten.
*Onderbouwing: [eleco.com/products/asta/asta-powerproject-4d](https://eleco.com/products/asta/asta-powerproject-4d/); [help.elecosoft.com — Schedule from IFC](https://help.elecosoft.com/powerproject_bim/english/help/Content/HTML%20Topics/Building_a_project_schedule/Schedule_from_IFC.htm).*

**7. Risicoanalyse standaard inbegrepen, zonder meerprijs.**
"All risk functionality comes standard with the software at no extra cost." Bij Oracle is Primavera Risk Analysis historisch een aparte aanschaf, net als Safran Risk of Acumen Risk. Voor organisaties die risicoanalyse contractueel moeten leveren maar geen apart specialistenpakket willen kopen, scheelt dit een volledige licentielijn.
*Onderbouwing: [Elecosoft webinar 6 — Risk Analysis](https://www.youtube.com/watch?v=hgPrQpeMscA).*

**8. Grafisch en presentatiematig sterker dan P6.**
Eastwood Harris somt op wat P6 níét kan tonen: free float bars, verschillende niet-werktijd per layout, graphics op de Gantt, individuele balkkleuring, resourcebalken. Powerproject kan dat wel, plus drie verschillende tijdschalen waarbij elk tijdsegment een eigen schaal kan hebben. Reviewers noemen consistent "excellent graphical output for client presentations". Voor een branche waarin de planning ook een communicatie- en contractdocument is, telt dat zwaar.
*Onderbouwing: Eastwood Harris; [softwareadvice.com](https://www.softwareadvice.com/project-management/powerproject-profile/).*

**9. Aanzienlijk lagere instapdrempel dan P6, met goede support-scores.**
Reviewgemiddelde 4,5/5 over 34 reviews, met Ease of Use 4,3, Functionality 4,6, Customer Support 4,6, Value for Money 4,4 — en geen enkele 1- of 2-sterrenreview. Gebruikers noemen "very easy to use, the library and code structure is brilliant" en drag-and-drop dat in P6 ontbreekt. Een Reddit-gebruiker vatte het samen als "as user friendly as [MS] Project but has the functionality of P6".
*Onderbouwing: [Capterra](https://www.capterra.com/p/173782/Powerproject/); [GetApp](https://www.getapp.com/project-management-planning-software/a/powerproject/); [Software Advice](https://www.softwareadvice.com/project-management/powerproject-profile/); [ScheduleReader](https://schedulereader.com/asta-powerproject-vs-primavera-p6/); Reddit r/Construction via zoeksnippet.*

**10. Gratis viewer en gratis onderwijslicenties — verstandige ecosysteemstrategie.**
De Project Viewer laat opdrachtgevers, onderaannemers en uitvoerders plannen bekijken zonder licentiekosten, wat de effectieve distributie van een plan enorm vergroot. Onderwijsinstellingen krijgen gratis licenties, wat de instroom van getrainde planners in de VK/DE-markt voedt. P6 heeft geen ingebouwde gratis viewer (daar leeft een hele derdepartijmarkt zoals ScheduleReader op).
*Onderbouwing: [eleco.com/products/asta/asta-powerproject](https://eleco.com/products/asta/asta-powerproject/); [eleco.com/de/produkte/asta/asta-powerproject](https://eleco.com/de/produkte/asta/asta-powerproject/); ScheduleReader.*

**11. Financieel stabiele, groeiende leverancier met diepgeworteld VK-ecosysteem.**
Eleco plc groeide FY2025 met 20% omzet naar £38,8 mln, ARR +29% naar £34,3 mln, 81% terugkerende omzet, adjusted PBT +35%. Twaalf opeenvolgende jaren "Project Management Software of the Year". Negentig van de honderd grootste Britse hoofdaannemers gebruiken het. Voor een VK-aannemer betekent dat: beschikbare planners op de arbeidsmarkt, ketenpartners die hetzelfde bestandsformaat lezen, en lage kans dat de leverancier omvalt.
*Onderbouwing: [ir.eleco.com/regulatory/final-results-8](https://ir.eleco.com/regulatory/final-results-8/); [PBC Today](https://www.pbctoday.co.uk/news/digital-construction-news/construction-software-news/nodes-links-to-work-on-asta-powerproject-with-elecosoft/132745/).*

---

## 5. NADELEN

**1. Prestatieproblemen bij grote programma's — door de leverancier zelf gedocumenteerd.**
De officiële help erkent: "you may notice that Asta Powerproject works more slowly... This is normally a result of the large amounts of tasks and allocations". De aanbevolen mitigaties (verberg allocatielijnen, vermijd rollup-velden, gebruik hammocks in plaats van filters, sluit histogrammen) zijn workarounds die functionaliteit inleveren voor snelheid. Reviewers melden bovendien "occasional software crashes with large file sizes". Dat een release in 2026 nog als fix vermeldt dat "4D opens very large 3D models significantly faster" bevestigt dat dit een aanhoudend thema is.
*Onderbouwing: [help.elecosoft.com — Maximising performance](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Structuring_your_project/Maximise_performance/Maximising.htm); [Software Advice](https://www.softwareadvice.com/project-management/powerproject-profile/); [release notes 2026.1](https://help.elecosoft.com/powerproject_release_notes/english/Content/HTML%20Topics/2026_1.htm).*

**2. Geen volwaardige portfolio- en capital-planninglaag.**
Asta Enterprise is in essentie gedeelde multi-usertoegang tot programmabestanden op SQL/Oracle — geen portfolio-analytics. De onafhankelijke vergelijking noemt bij Powerproject expliciet "capital planning absent" als zwakte, waar P6 juist uitblinkt in "capital planning" en geavanceerde what-if-analyse. Voor een concern dat 400 projecten tegelijk moet prioriteren op kapitaalbeslag en resourceconflicten schiet dit tekort. Asta Vision/Vision Plus vult dit deels aan met BI en forecasting, maar dat is een aparte, betaalde productlijn — geen inbegrepen portfoliomodule.
*Onderbouwing: [ScheduleReader](https://schedulereader.com/asta-powerproject-vs-primavera-p6/); [eleco.com — Asta Vision](https://eleco.com/products/asta-powerproject/asta-vision/).*

**3. Geen API in het standaardproduct.**
De officiële G-Cloud 14-servicebeschrijving, door de leverancier zelf ingediend, antwoordt op de vraag naar een API onomwonden: **"Not available."** Automatisering moet via VBA/OLE-macro's (COM) binnen de Windows-client — een technologie uit de jaren '90, Windows-gebonden, niet server-side draaibaar, slecht te versiebeheren en onbruikbaar vanuit een moderne CI- of dataplatform-context. Een echte API bestaat alleen in **Asta Vision Plus**, een apart betaald product. Wie in 2026 een planningstool koopt die zonder meerprijs geen programmeerbare interface heeft, koopt een integratieprobleem.
*Onderbouwing: [G-Cloud 14, service-ID 159955281882828](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828); [help.elecosoft.com — Using OLE with VB and VBA](https://help.elecosoft.com/powerproject/english/help/); [eleco.com — Asta Vision Plus](https://eleco.com/products/asta-powerproject/asta-vision/).*

**4. Vendor lock-in via het gesloten binaire .PP-formaat — en de documentatie geeft het toe.**
Het native formaat `.PP` is binair, ongedocumenteerd en zonder Powerproject niet te lezen. De officiële Primavera-uitwisselingspagina adviseert letterlijk om een geïmporteerd Primavera-project daarna **in .PP op te slaan om elementen te behouden die de uitwisselingsformaten niet dragen**. Dat is de definitie van lock-in: de volledige waarde van je planning bestaat alleen binnen het product. Er is geen open, gedocumenteerde serialisatie van het planningsmodel — geen IFC-uitvoer van het schema, geen open XML-schema van .PP.
*Onderbouwing: [help.elecosoft.com — Data transfer between Asta Powerproject and Primavera](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Starting_work/Primavera/Xfer_Primavera.htm).*

**5. Substantieel dataverlies bij uitwisseling met Primavera — precies gedocumenteerd, en flink.**
Bij export naar P6 gaat aantoonbaar verloren of verandert:
- **Baselines verdwijnen volledig bij XER-formaat** (alleen XML behoudt ze) — voor de bouw, waar baselines de contractuele basis zijn, is dat ernstig;
- **taaknamen worden afgekapt op 120 tekens**;
- **hammocks worden Level of Effort-taken**;
- **elapsed-time lags worden omgezet naar werktijd** — wat de logica verandert;
- **summary task links moeten worden herbouwd** of vervangen door mijlpalen;
- **multi-currency wordt platgeslagen naar één valuta** die je bij export moet kiezen;
- **boolean- en URL-UDF's worden platte tekst**;
- **Unicode gaat verloren bij XER** (alleen XML behoudt het);
- **durations worden fout** wanneer de projectdag niet 8 uur is, omdat P6 8-urige werkdagen als standaard hanteert.
De leverancier waarschuwt zelf: "some of the information from your Asta Powerproject project may be lost as not all data can be exported to XML or XER format."
*Onderbouwing: [help.elecosoft.com — Xfer_Primavera](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Starting_work/Primavera/Xfer_Primavera.htm) en [Primavera_exporting](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Starting_work/Primavera/Primavera_exporting.htm).*

**6. Windows-only, met een halfslachtige Mac- en mobielverhaal.**
Er is geen native macOS-client; Mac-gebruikers moeten de SaaS-variant in een browser gebruiken. Die SaaS-webinterface is volgens de eigen G-Cloud-opgave **"no mobile optimisation"**. Mobiel werken kan alleen via de apart gelicentieerde SiteProgress-app, die voortgang registreert maar niet plant. Voor organisaties met een gemengd of Mac-gericht IT-landschap is dit een reële blokkade.
*Onderbouwing: [G-Cloud 14](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828); [eleco.com/products/asta/asta-powerproject](https://eleco.com/products/asta/asta-powerproject/).*

**7. Leercurve voor gevorderde functionaliteit; functies zijn slecht vindbaar.**
Eastwood Harris noteert dat Powerproject "takes longer to learn" dan de concurrentie juist vanwege de featurerijkdom. Reviewers: "Some functions are difficult to learn how to use"; "advanced features can be difficult to locate"; "some interface functions feel disjointed or unintuitive"; "only as powerful as the set up time put into it". De ease-of-use-score (4,3) is de op één na laagste van alle subscores. De software is makkelijk te beginnen en moeilijk te beheersen — en juist de bouwspecifieke kroonjuwelen (progress periods, link categories, LOB, unit networks) zitten in het moeilijke deel.
*Onderbouwing: [Eastwood Harris](https://eastwoodharris.com/comparison-of-microsoft-project-oracle-primavera-p6-and-elecosoft-asta-powerproject/); [Capterra](https://www.capterra.com/p/173782/Powerproject/); [GetApp](https://www.getapp.com/project-management-planning-software/a/powerproject/).*

**8. Zwakke internationale herkenning buiten VK/DACH/Scandinavië — en de VS krimpt.**
Reviewers noemen expliciet "limited global market awareness outside the UK". Eastwood Harris wijst op lage Australische marktpenetratie en "fewer trained operators available". De cijfers bevestigen het: VS-omzet **daalde 10%** in FY2025 naar £1,5 mln (4% van de groepsomzet), Duitsland groeide met slechts 8% — de traagste regio na de VS. Praktische gevolgen: schaars personeel, weinig lokale trainers, opdrachtgevers die het formaat niet accepteren, en bij internationale joint ventures onvermijdelijk terugvallen op P6.
*Onderbouwing: [Software Advice](https://www.softwareadvice.com/project-management/powerproject-profile/); Eastwood Harris; [ir.eleco.com/regulatory/final-results-8](https://ir.eleco.com/regulatory/final-results-8/).*

**9. Prijsniveau fors, abonnementsdwang, en jaarlijkse verhogingen.**
US$1.340–2.200 per gebruiker per jaar (reseller) tegenover Microsoft Project Plan 3 in de orde van US$30/gebruiker/maand, en generieke alternatieven op Capterra die tussen US$9 en US$49 per gebruiker per maand liggen. Perpetual is uitgefaseerd (perpetual-omzet −46% naar £545k), dus er is geen uitstap uit de terugkerende kostenstroom meer. *Nuance uit de verificatieronde:* voor kleinere aannemers en pakketteams bestaat **EasyPlan**, een afgeslankte standalone Powerproject-variant, die het instapniveau verlaagt — de prijs daarvan is echter evenmin publiek. Prijsbronnen wijzen bovendien op "anticipated annual price increases during renewal periods" en op bijkomende kosten voor implementatie, datamigratie en instructeurgeleide training.
*Onderbouwing: [Projects Analytics](https://projectsanalytics.com/purchase-powerproject-licenses/); [Capterra](https://www.capterra.com/p/173782/Powerproject/); [ir.eleco.com/regulatory/final-results-8](https://ir.eleco.com/regulatory/final-results-8/); [pricingnow.com](https://pricingnow.com/question/powerproject-pricing/).*

**10. Volstrekt ondoorzichtige moduleprijzen — budgetteren is gokken.**
Geen enkele module (4D/BIM, Enterprise, Vision, Vision Plus, SiteProgress, Connect) heeft een publieke prijs. De gepubliceerde bedragen die er wél zijn, spreken elkaar bovendien tegen: £880, £1.113, US$1.340, US$1.495, US$1.675, US$2.000, US$2.200 — een spreiding van ruim **factor twee** tussen bronnen. Eén aggregator (ITQlick) spreekt zichzelf zelfs tegen: $2.000/gebruiker/jaar op de ene pagina, $1.300 per licentie op de andere. Zelfs de proefperiode wordt inconsistent opgegeven: **14 dagen** op G-Cloud én op de Duitse productpagina van Eleco, **30 dagen** ("Ab Installation lässt sich Powerproject 30 Tage lang testen", verlengbaar) op de Duitse supportsite — een tegenstrijdigheid tussen twee kanalen van dezelfde leverancier, in de verificatieronde opnieuw bevestigd. Dat is een onnodig moeilijk inkoopproces.

*Correctie 25-07-2026: het eerder genoemde £1.470 van shop.eleco.com — en daarmee het "32% verschil tussen eigen webshop en eigen G-Cloud-opgave" — is **niet reproduceerbaar** en uit deze opsomming verwijderd (zie de waarschuwing in §3.1). De conclusie zelf houdt stand zonder dat bedrag.*
*Onderbouwing: alle prijsbronnen in §3; [G-Cloud 14](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828) versus shop.eleco.com; [support.astadev.de/lizenzen](https://support.astadev.de/lizenzen).*

**11. Import/export vraagt structureel handmatige verificatie.**
GetApp-reviewers noemen "import/export functionality requires significant data verification" en "complex formatting when receiving files in different templates" als terugkerend bezwaar. Gecombineerd met de gedocumenteerde verliezen uit punt 5 betekent dit dat elke uitwisseling met de keten een handmatige controleslag kost — precies de plek waar in de praktijk fouten in de contractuele planning ontstaan.
*Onderbouwing: [GetApp](https://www.getapp.com/project-management-planning-software/a/powerproject/); [Capterra](https://www.capterra.com/p/173782/Powerproject/).*

**12. Dunne, mogelijk selectieve reviewbasis en beperkte openbare risicodocumentatie.**
Slechts 34 reviews op Capterra/GetApp/Software Advice, met **nul** 1- of 2-sterrenreviews — een verdeling die eerder duidt op geworven reviews dan op een representatieve steekproef. Bovendien konden G2, TrustRadius en Gartner Peer Insights in dit onderzoek niet worden geraadpleegd, en is er geen openbare technische documentatie over de diepte van de risico-/Monte Carlo-module gevonden. Voor een inkoopbeslissing van deze omvang is de onafhankelijke bewijsbasis mager; een proof of concept op eigen data is geen luxe maar noodzaak.
*Onderbouwing: reviewaantallen op [Capterra](https://www.capterra.com/p/173782/Powerproject/), [GetApp](https://www.getapp.com/project-management-planning-software/a/powerproject/), [Software Advice](https://www.softwareadvice.com/project-management/powerproject-profile/); eigen onderzoeksbeperkingen §0.*

---

## 6. Interoperabiliteit — kern voor een IFC-gebaseerde open planner

### 6.1 Native formaten

| Formaat | Rol | Openheid |
|---|---|---|
| **.PP** | Native projectbestand | **Gesloten binair, ongedocumenteerd.** Enige formaat dat het volledige model draagt |
| **.PPV** | Viewer-bestand, met bijbehorend IFC-model of IFC-groepsmodel | Gesloten; alleen leesbaar met de gratis Project Viewer |

### 6.2 Import en export van planningsdata

**Export** (officiële opgave op G-Cloud 14): **CSV, HTML, XML, MPP, XER, Excel & SQL** via ingebouwde exportfuncties, plus het native .PP.
Uit de helpdocumentatie blijkt specifiek:
- **Microsoft Project:** MPP, Microsoft Project XML (MSPDI) en MPX.
- **Primavera:** **XER** en **P6 XML**, via de dialoog "Primavera XML & XER Export Options".
- Sinds 2026.1: optie **"Export implied bar links for WBS hierarchy"** bij XER-export.

**Import:** **CSV, XML, MPP, XER, XLS**.

*Bronnen: [G-Cloud 14](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828); [help.elecosoft.com — Primavera_exporting](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Starting_work/Primavera/Primavera_exporting.htm); [release notes 2026.1](https://help.elecosoft.com/powerproject_release_notes/english/Content/HTML%20Topics/2026_1.htm). Alle 25-07-2026.*

### 6.3 XER versus P6 XML — de afwegingen die de leverancier zelf documenteert

| Aspect | XER | P6 XML |
|---|---|---|
| Baselines | **Niet meegenomen** | Wel meegenomen |
| Unicode | Niet ondersteund | Wel ondersteund |
| Valuta | In de header opgenomen — geen giswerk | Moet bij export worden opgegeven; alles wordt naar één valuta omgerekend |

**Gedocumenteerde conversieverliezen** (beide richtingen): namen afgekapt op 120 tekens, hammocks → Level of Effort, elapsed lags → werktijd, summary-links moeten worden herstructureerd of vervangen door mijlpalen, boolean/URL-UDF's → tekst, duurfouten bij een projectdag ≠ 8 uur. Officiële aanbeveling: sla een geïmporteerd Primavera-project daarna op als .PP.

*Bron: [help.elecosoft.com — Xfer_Primavera](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Starting_work/Primavera/Xfer_Primavera.htm), 25-07-2026.*

### 6.4 IFC — kritische bevinding

**IFC wordt uitsluitend gebruikt als invoerformaat voor 3D-geometrie, niet als planningsformaat.**

Wat Powerproject **wél** doet met IFC:
- **Import van IFC-modellen** voor 4D. Bronnen: Revit, ArchiCAD, Tekla en elke tool die IFC exporteert. **[ONZEKER]** Welke IFC-schemaversies precies worden ondersteund is **niet publiek gedocumenteerd** — zie de verificatienoot in §2.8; de eerder genoemde lijst "IFC 2x3, 2x4 en 4" is niet reproduceerbaar uit de bronnen.
- **IFC group models** om meerdere modellen te bundelen en hun properties beschikbaar te maken.
- **UDF-mapping**: IFC-properties worden via het tabblad "UDF Transfer" in Model Properties gemapt op user-defined fields van type string, integer of float. Bij meerdere objecten per taak: integers/floats worden **gesommeerd**, strings **geconcateneerd**. Datums die als IFC-string binnenkomen sorteren alfanumeriek, niet chronologisch — een bekende valkuil.
- **Automatische schemahiërarchie uit IFC-properties** (Site, Building, BuildingStorey), optioneel met codebibliotheken per unieke propertywaarde.

Wat Powerproject **niet** doet, voor zover in dit onderzoek vastgesteld:
- **Er is geen enkele aanwijzing gevonden dat Powerproject planningsdata naar IFC schrijft.** Geen export van `IfcWorkSchedule`, `IfcTask`, `IfcTaskTime`, `IfcRelSequence`, `IfcWorkCalendar` of `IfcResource`. De officiële exportlijst (CSV, HTML, XML, MPP, XER, Excel, SQL) bevat **geen IFC**. **[Dit is een negatieve bevinding: afwezigheid van bewijs in de geraadpleegde documentatie en de officiële G-Cloud-exportopgave. Ik heb geen bron gevonden die IFC-planningsexport bevestigt óf expliciet ontkent — behandel als zeer waarschijnlijk maar niet 100% zeker.]**

**Betekenis voor een open, IFC-gebaseerde planner:**
1. **De markt is asymmetrisch en dat is de opening.** De marktleider in de VK-bouw consumeert IFC (geometrie) maar produceert het niet (planning). Het IFC 4.3-planningsdeel — `IfcWorkSchedule`, `IfcTask`, `IfcRelSequence`, `IfcWorkCalendar` — wordt door de dominante speler niet als persistentieformaat gebruikt. Een planner die het planningsmodel zelf IFC-native maakt, biedt iets dat Powerproject structureel niet biedt: een planning die zonder de leverancier leesbaar blijft.
2. **De realistische koppelingsrichting is duidelijk.** IFC-geometrie kan naar Powerproject; planningsdata moet via **MSPDI (MS Project XML)**, **P6 XML**, **XER** of **CSV**. Wie interoperabel wil zijn met Powerproject-gebruikers, moet die vier formaten robuust ondersteunen — met bijzondere aandacht voor de verliesposten die Eleco zelf documenteert (baselines alleen in XML, 120-tekens namen, kalenders met afwijkende dagduur).
3. **.PP direct lezen is geen begaanbare weg.** Gesloten, ongedocumenteerd binair formaat.
4. **De IFC-property-mapping van Powerproject is een goed na te volgen patroon.** Het UDF Transfer-mechanisme met sommatie voor numerieke en concatenatie voor tekstuele properties bij meerdere objecten per taak is een pragmatische oplossing voor het n-op-1-probleem tussen model en planning, en is de moeite van het kopiëren waard.
5. **De automatische schemageneratie uit Site/Building/BuildingStorey is de te evenaren lat** — inclusief de gedocumenteerde zwakke plekken (lege properties, site-objecten, geen verplaatsing tussen parents) die een nieuwe implementatie beter kan aanpakken.

*Bronnen: [help.elecosoft.com — Schedule_from_IFC](https://help.elecosoft.com/powerproject_bim/english/help/Content/HTML%20Topics/Building_a_project_schedule/Schedule_from_IFC.htm); [help.elecosoft.com — Group_models_IFC_info_PP](https://help.elecosoft.com/powerproject_bim/english/help/Content/HTML%20Topics/Group_models/Group_models_IFC_info_PP.htm); [G-Cloud 14 exportopgave](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828); [eleco.com/products/asta/asta-powerproject-4d](https://eleco.com/products/asta/asta-powerproject-4d/). Alle 25-07-2026.*

### 6.5 API's en programmatische toegang

| Kanaal | Status | Beperking |
|---|---|---|
| **REST/HTTP API in standaardproduct** | **Niet beschikbaar** ("API: Not available" in de eigen G-Cloud 14-opgave) | — |
| **VBA / OLE-automatisering (COM)** | Beschikbaar in de Windows-client; macro's via de Visual Basic Editor onder View → Macros | Windows-gebonden, client-side, vereist geïnstalleerde Powerproject, moeilijk versiebeheerbaar |
| **Asta Vision Plus API** | Beschikbaar — "a secure, structured way to access Asta Powerproject programme data including projects, tasks, workflows, progress periods, code libraries, and calendars"; bidirectionele stromen naar veldtools, BI, ERP, BIM en AI | **Apart betaald product**, cloudgebonden |
| **Macro-engine voor maatwerk** | Beschikbaar; instellingen per gebruiker of gebruikersgroep configureerbaar | — |

*Bronnen: [G-Cloud 14](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828); [help.elecosoft.com — Using OLE with VB and VBA / Using macros](https://help.elecosoft.com/powerproject/english/help/); [eleco.com — Asta Vision Plus](https://eleco.com/products/asta-powerproject/asta-vision/). Alle 25-07-2026.*

### 6.6 Koppelingen met derde partijen

- **Bentley SYNCHRO 4D Pro** kan Powerproject-schema's importeren, maar **vereist dat Powerproject op dezelfde computer geïnstalleerd is** — een COM-gebaseerde koppeling, geen bestandsuitwisseling.
  *Bron: Bentley Systems community, via zoeksnippet, 25-07-2026.*
- **Deltek Acumen** en **Trimble TILOS** wisselen data uit met Powerproject via macro-gebaseerde mechanismen.
- **Nodes & Links** (AI-planningsanalyse) analyseert, prognosticeert en simuleert Powerproject-bestanden; partnerschap sinds 22 september 2023, met BAM Construction als vroege klant.
  *Bron: [PBC Today](https://www.pbctoday.co.uk/news/digital-construction-news/construction-software-news/nodes-links-to-work-on-asta-powerproject-with-elecosoft/132745/), 25-07-2026.*
- **ScheduleReader** en vergelijkbare viewers lezen P6-XER, **niet** .PP — er is dus geen breed derdepartij-viewerecosysteem voor Powerproject buiten Eleco's eigen gratis viewer.
- **Databaseniveau:** Asta Enterprise draait op SQL Server of Oracle; SQL-export is een genoemd uitvoerkanaal. Dat biedt in een Enterprise-opstelling een leesroute naar de data, zij het via een niet-gedocumenteerd schema. **[SCHATTING: bruikbaar voor BI-doeleinden, riskant en niet ondersteund voor schrijfoperaties.]**

---

## 7. Marktpositie

### 7.1 Waar sterk, en waarom

**Verenigd Koninkrijk — dominant.** Negentig (volgens één reseller 94) van de honderd grootste Britse hoofdaannemers gebruiken Powerproject; 47% van Eleco's omzet (£18,4 mln, +16%) komt uit het VK. Twaalf opeenvolgende jaren "Project Management Software of the Year" bij de UK Construction Computing Awards, plus "Company of the Year" — beide bevestigd in de FY2025-resultaten.

> **Verificatiecorrectie (25-07-2026):** het eerder hier geciteerde superlatief *"the UK construction industry's most widely used project scheduling tool"* stond zonder bron in het profiel en kon in de verificatieronde **niet aan enige bron worden toegewezen** — het is als citaat verwijderd. De onderliggende strekking blijft ondersteund door het top-100-cijfer en het VK-omzetaandeel, maar er is **geen onafhankelijke marktaandeelmeting** (geen G2/Gartner/TrustRadius-data beschikbaar, zie §0) die "meest gebruikte" hard maakt. Behandel de VK-dominantie als goed onderbouwd op leverancierscijfers, niet als geverifieerd marktaandeel.

*Waarom:* het product is gebouwd rond de Britse aannemerspraktijk — voortgangsperioden, contractuele baselines, presentatiekwaliteit Gantt's die als contractdocument dienen. Daarbovenop werkt een netwerkeffect: de hele keten leest .PP, de arbeidsmarkt levert Asta-planners, en onderwijsinstellingen krijgen gratis licenties waardoor de instroom in stand blijft. Dat is een verdedigingswal die geen concurrent snel slecht.

**Duitsland en DACH — sterke tweede positie.** £3,3 mln omzet (8% van de groep, +8%), met STRABAG, PORR en Leonhard Weiss als referenties, een eigen Duitstalige site en supportorganisatie (astadev.de). De groei van 8% is echter de op één na traagste van alle regio's — de positie is gevestigd maar niet expansief.

**Scandinavië en Ierland.** £6,9 mln (18%, +18%). Eleco heeft daar via Staircon/Consultec en Pemac diepe lokale wortels.

**Nederland.** Eleco heeft een Nederlandse vestiging en Powerproject is in het Nederlands gelokaliseerd — maar er zijn in dit onderzoek geen omzetcijfers of referentieklanten voor Nederland specifiek gevonden. **[Nederland valt onder "Rest van Europa"; aparte cijfers ontbreken.]**

### 7.2 Waar zwak

- **Verenigde Staten:** £1,5 mln, slechts 4% van de omzet, en **−10% in FY2025**. P6 en MS Project domineren; Procore beheerst de bredere bouwsoftwaremarkt.
- **Australië:** Eastwood Harris noteert expliciet lage marktpenetratie en weinig getrainde operators.
- **Midden-Oosten en Azië:** in dit onderzoek geen aanwijzingen voor betekenisvolle aanwezigheid gevonden; P6 is daar de facto standaard bij grote infrastructuur.

### 7.3 Belangrijkste concurrenten

| Concurrent | Positionering versus Powerproject |
|---|---|
| **Oracle Primavera P6** | De directe rivaal. Wint op massale datasets ("the ability to handle massive amounts of data" — Eastwood Harris), portfolio/capital planning, claims/"reflection"-functionaliteit, en wereldwijde herkenning. Verliest op grafiek, drag-and-drop, baseline-weergave, bouwspecifieke voortgangsfuncties en ontbrekende gratis viewer |
| **Microsoft Project** | Wint op prijs en universele beschikbaarheid. Verliest hard op kalenders (kan geen afwijkende dagduren correct verwerken), baselines (niet benoembaar, geen relaties/kritiek pad), en één relatie per takenpaar |
| **Bentley SYNCHRO** | 4D-specialist; sterker in pure 4D-diepte, maar vereist een aparte planningstool ernaast en importeert Powerproject alleen via een lokale COM-koppeling |
| **Autodesk Navisworks** | 4D/coördinatie; sterk in clash detection, zwak als planningsengine |
| **Trimble TILOS** | Lineaire/tijd-weg-planning voor infrastructuur; Powerproject dekt dit deels met Line of Balance |
| **Deltek Acumen, Safran Risk** | Specialistische risico-/schemakwaliteitsanalyse; Powerproject's inbegrepen risicomodule is breder toegankelijk maar naar verwachting minder diep **[SCHATTING]** |
| **Nodes & Links** | Was concurrent op AI-schema-analyse, is sinds 2023 partner |
| **Procore, Smartsheet, monday.com, Contractor Foreman** | Genoemd als alternatieven op reviewsites, maar functioneel niet vergelijkbaar — geen serieuze CPM-engine. Wél gevaarlijk als "goed genoeg" voor kleinere aannemers, tegen US$9–49 per gebruiker per maand |

### 7.4 Trend

**Stabiel tot licht groeiend, met een duidelijke geografische scheefheid.**

- Concernbreed groeit Eleco hard (omzet +20%, ARR +29%, adjusted PBT +35%), maar een deel daarvan komt uit de Pemac-acquisitie en andere merken; "Rest van Europa" groeide 47% mede dankzij die overname.
- Het Building Lifecycle-segment waar Asta onder valt groeide 29% naar £31,1 mln — gezond.
- De SaaS-transitie is grotendeels voltooid (81% terugkerende omzet tegen 77% in 2024; perpetual −46% naar £545k). Dat is financieel gezond maar betekent voor klanten permanente kostenstromen.
- **De kernmarkt VK groeit met 16% — solide maar niet explosief, en in een markt waar het product al 90% van de top-100 bedient is er weinig ruimte voor volumegroei.** Verdere groei moet uit prijsstijging, modules (Vision Plus, 4D, SiteProgress) en internationale expansie komen — en die laatste lukt aantoonbaar niet in de VS.
- **Productstrategisch** verschuift het zwaartepunt naar de cloudlaag: Asta Vision, Vision Live, Vision Plus (API + BI + forecasting) en AstaGPT. De desktopclient blijft het rekenhart, maar de nieuwe waarde — en de nieuwe prijsstelling — zit in de omliggende cloudproducten.

### 7.5 Verplichtstellingen en mandaten

- **Er is geen bekende verplichtstelling van Powerproject gevonden.** Marktaandeel is verworven, niet voorgeschreven.
- **[SCHATTING, niet geverifieerd in dit onderzoek]** Het omgekeerde is wel een structurele rem: bij grote Britse en internationale infrastructuurprogramma's schrijven opdrachtgevers regelmatig P6/XER-oplevering voor. Powerproject-gebruikers moeten dan exporteren naar XER — met alle gedocumenteerde verliezen uit §6.3, waaronder het verlies van baselines. Dit is een terugkerend praktisch probleem, maar ik heb in dit onderzoek geen specifieke contractdocumenten kunnen inzien die dit hard maken.

---

## 8. Eindoordeel

### Voor wie is dit de juiste keuze

**1. Britse en Ierse hoofdaannemers en gespecialiseerde onderaannemers.** Hier is de keuze bijna vanzelfsprekend: 90 van de top-100 gebruikt het, de keten leest je bestanden, de arbeidsmarkt levert getrainde planners, en de bouwspecifieke functionaliteit past op de contractpraktijk. Afwijken kost meer dan het oplevert.

**2. Bouwers van repetitief werk.** Woningbouw per bouwnummer, hoogbouwverdiepingen, tunnelsegmenten, wegvakken, renovatieprogramma's. De combinatie van Line of Balance met unit networks, taakkalenders per balk en hiërarchische voortgangsperioden is precies wat takttijdplanning nodig heeft, en het zit in de basislicentie.

**3. Organisaties met korte-cyclus voortgangsregistratie als kernproces.** Wekelijkse of tweewekelijkse voortgangsrondes, gelaagd onder maandrapportages, met visueel onderscheid per periode en vergrendelde historie — dat doet geen andere tool zo goed. Dit is de sterkste concrete reden om Powerproject te kiezen.

**4. Middelgrote tot grote aannemers die 4D willen zonder een tweede product.** Als 4D-simulatie waardevol is maar geen aparte Synchro-licentie plus workflow rechtvaardigt, is de geïntegreerde module een pragmatische en aantoonbaar goedkopere route — inclusief automatische schemageneratie uit IFC-properties.

**5. Duitse, Oostenrijkse en Scandinavische bouwbedrijven** met lokale support, lokalisatie en referenties als STRABAG, PORR en Leonhard Weiss.

**6. Organisaties die risicoanalyse contractueel moeten leveren maar geen specialistenpakket willen kopen** — mits de diepte van de risicomodule vooraf in een proof of concept is getoetst.

### Voor wie is dit níét de juiste keuze

**1. Organisaties met zeer grote portfolio's of megaprojecten in één integraal model.** De leverancier documenteert zelf prestatiedegradatie met het aantal taken en allocaties, adviseert workarounds die functionaliteit inleveren, en er is geen echte portfolio-/capital-planninglaag ("capital planning absent"). Bij honderden gelijktijdige projecten met kapitaalprioritering, of bij programma's van honderdduizenden activiteiten, is P6 architectonisch de juiste keuze.

**2. Organisaties die zwaar op integratie en automatisering leunen.** Geen API in het standaardproduct — de leverancier zegt dit letterlijk in zijn eigen overheidsinkoopopgave. Automatisering via VBA/COM is Windows-gebonden en niet server-side draaibaar. Een echte API kost een extra product (Vision Plus). Wie planningsdata in een datawarehouse, een CI-pijplijn of een AI-workflow wil hebben, betaalt daar apart en cloudgebonden voor.

**3. Wie waarde hecht aan dataeigenaarschap en open formaten.** Het native .PP-formaat is gesloten en ongedocumenteerd; de leverancier adviseert zelf om na Primavera-import in .PP op te slaan omdat de uitwisselingsformaten data verliezen. Er is geen IFC-uitvoer van het planningsmodel. Je planning is een gijzelaar van het product.

**4. Organisaties in contractketens waar P6/XER-oplevering verplicht is.** Dan werk je permanent met een dubbele waarheid en een exportslag die aantoonbaar baselines, Unicode, namen boven 120 tekens, hammocks en elapsed lags beschadigt. Beter direct in het voorgeschreven pakket werken.

**5. Mac-gerichte of mobiel-first organisaties.** Geen native Mac-client, de SaaS-webinterface is expliciet niet mobiel-geoptimaliseerd, en mobiel werken beperkt zich tot voortgangsregistratie via een apart gelicentieerde app.

**6. Kleine aannemers en zzp'ers met eenvoudige planningsbehoeften.** US$1.340–2.200 per gebruiker per jaar is niet te rechtvaardigen tegenover MS Project of generieke tools van US$9–49 per gebruiker per maand, als je de bouwspecifieke functionaliteit toch niet gebruikt.

**7. Organisaties buiten VK/DACH/Scandinavië zonder specifieke reden.** In de VS (krimpend), Australië, het Midden-Oosten en Azië ontbreken getrainde planners, lokale support en ketenacceptatie. Het netwerkeffect dat het product in het VK zo sterk maakt, werkt daar tegen je.

### Slotsom voor een open, IFC-gebaseerde planner

Powerproject is het functionele ijkpunt dat een bouwspecifieke planner moet halen: **voortgangsperioden met hiërarchische nesting, taakkalenders zichtbaar per balk, meerdere links tussen twee taken, link-categorieën voor bouwvarianten in één bestand, benoembare baselines met volledige data, en Line of Balance met unit networks.** Dat is de lat.

Tegelijk zit de strategische opening precies in wat Powerproject níét doet. De marktleider van de Britse bouw **consumeert** IFC voor geometrie maar **produceert** het niet voor planning: geen `IfcWorkSchedule`, geen `IfcTask`, geen open serialisatie van het planningsmodel. Daarbovenop levert hij geen API in het standaardproduct en houdt hij zijn native formaat gesloten — twee eigenschappen die in 2026 steeds slechter verdedigbaar worden.

Een planner die het planningsmodel zelf IFC 4.3-native maakt, biedt dus iets dat de marktleider structureel niet biedt. De praktische eisen die daaruit volgen zijn helder: **robuuste MSPDI-, P6 XML-, XER- en CSV-uitwisseling** (want dat is de enige taal die Powerproject-gebruikers spreken), **met expliciete aandacht voor de verliesposten die Eleco zelf documenteert** — baselines die alleen in XML overleven, namen die op 120 tekens afbreken, en kalenders met afwijkende dagduren die stilzwijgend de duren corrumperen.

---

## Bronnenlijst

Alle bronnen geraadpleegd op **25 juli 2026**, tenzij anders vermeld.

### Leverancier — product en documentatie
1. [Eleco — Asta Powerproject (productoverzicht)](https://eleco.com/products/asta-powerproject/)
2. [Eleco — Asta Powerproject (features en licentiemodellen)](https://eleco.com/products/asta/asta-powerproject/)
3. [Eleco — Asta Powerproject 4D / Powerproject BIM](https://eleco.com/products/asta/asta-powerproject-4d/)
4. [Eleco — Asta Vision en Asta Vision Plus](https://eleco.com/products/asta-powerproject/asta-vision/)
5. [Eleco — Asta Powerproject 2026 (releaseoverzicht)](https://eleco.com/asta-powerproject-2026/)
6. [Eleco — bedrijfshomepage](https://eleco.com/) (elecosoft.com geeft HTTP 301 naar eleco.com)
7. [Eleco Duitsland — Asta Powerproject](https://eleco.com/de/produkte/asta/asta-powerproject/)
8. [Asta Development / Elecosoft Duitsland — licentie-informatie](https://support.astadev.de/lizenzen)
9. [Elecosoft Help — Asta Powerproject 2026.1 release notes](https://help.elecosoft.com/powerproject_release_notes/english/Content/HTML%20Topics/2026_1.htm)
10. [Elecosoft Help — Maximising performance with large projects](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Structuring_your_project/Maximise_performance/Maximising.htm)
11. [Elecosoft Help — Using progress periods](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Progress/Using_progress_periods/Using_progress_periods.htm)
12. [Elecosoft Help — Introduction to Line of Balance graphs](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/LOB/LOB_intro.htm)
13. [Elecosoft Help — Data transfer between Asta Powerproject and Primavera](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Starting_work/Primavera/Xfer_Primavera.htm)
14. [Elecosoft Help — Primavera XML & XER export options](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Starting_work/Primavera/Primavera_exporting.htm)
15. [Elecosoft Help (BIM) — Creating a project schedule automatically from a 3D model](https://help.elecosoft.com/powerproject_bim/english/help/Content/HTML%20Topics/Building_a_project_schedule/Schedule_from_IFC.htm)
16. [Elecosoft Help (BIM) — Using IFC group models to make IFC properties available](https://help.elecosoft.com/powerproject_bim/english/help/Content/HTML%20Topics/Group_models/Group_models_IFC_info_PP.htm)
17. [Elecosoft — Powerproject webinar 6: Risk Analysis (YouTube)](https://www.youtube.com/watch?v=hgPrQpeMscA) *(via zoeksnippet)*

### Officiële inkoop- en financiële bronnen
18. [UK Crown Commercial Service — G-Cloud 14, Asta Powerproject SaaS, service-ID 159955281882828](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828) — **primaire prijsbron: £1.113/gebruiker/jaar**
19. [Eleco plc — Investor Relations](https://ir.eleco.com/investor-relations/)
20. [Eleco plc — Final Results FY2025](https://ir.eleco.com/regulatory/final-results-8/)
21. [Eleco plc — Annual Report 2025 (PDF)](https://ir.eleco.com/wp-content/uploads/2026/05/5770_Eleco-plc-Annual-Report-2025_Hyperlink.pdf)

### Prijsbronnen — handel en aggregators
22. [Projects Analytics — Purchase Asta Powerproject Licenses](https://projectsanalytics.com/purchase-powerproject-licenses/) — US$1.340 named seat, US$2.200 concurrent
23. [Capterra — Asta Powerproject](https://www.capterra.com/p/173782/Powerproject/) — US$1.675/gebruiker/jaar; 4,5/5 over 34 reviews
24. [Capterra UK — Powerproject](https://www.capterra.co.uk/software/173782/powerproject)
25. [GetApp — Asta Powerproject](https://www.getapp.com/project-management-planning-software/a/powerproject/)
26. [Software Advice — Asta Powerproject profiel en reviews](https://www.softwareadvice.com/project-management/powerproject-profile/)
27. [pricingnow.com — Powerproject pricing](https://pricingnow.com/question/powerproject-pricing/) *(bijgewerkt 08-03-2026; lage bronkwaliteit)*
28. [softwarefinder.com — Powerproject](https://softwarefinder.com/project-management-software/powerproject) *(lage bronkwaliteit)*
29. [ITQlick — Asta PowerProject FAQ](https://www.itqlick.com/asta-powerproject/faq) *(via zoeksnippet; site gaf HTTP 403; lage bronkwaliteit)*
30. shop.eleco.com/products/asta-powerproject-uk — £1.470/jaar *(**onbevestigd**: oorspronkelijk alleen via zoeksnippet; in de verificatieronde van 25-07-2026 in drie pogingen niet reproduceerbaar — HTTP 429 op productpagina, `/collections/all` en `/products.json`, en geen prijssnippet meer in de zoekindex. Zie §3.1 en verificatiepunt 4)*

### Onafhankelijke analyse en vergelijkingen
31. [Eastwood Harris (Paul E. Harris) — Comparison of Microsoft Project, Oracle Primavera P6 and Elecosoft Asta Powerproject](https://eastwoodharris.com/comparison-of-microsoft-project-oracle-primavera-p6-and-elecosoft-asta-powerproject/) — **belangrijkste technische vergelijkingsbron**
32. [ScheduleReader — Asta Powerproject vs Primavera P6](https://schedulereader.com/asta-powerproject-vs-primavera-p6/)
33. [PBC Today — Nodes & Links to work on Asta Powerproject with Elecosoft (22-09-2023)](https://www.pbctoday.co.uk/news/digital-construction-news/construction-software-news/nodes-links-to-work-on-asta-powerproject-with-elecosoft/132745/) — bron voor "90 van de top 100 UK hoofdaannemers"
34. [Digital Construction Connect — Balfour Beatty using Asta Powerproject](https://www.digitalconstructionconnect.com/guest-blogs/balfour-beatty-using-asta-powerproject-to-rewrite-programme-management-procedures/) *(HTTP 403; alleen titel/snippet)*
35. Bentley Systems Community — SYNCHRO interoperability with Asta Powerproject *(via zoeksnippet)*
36. Reddit r/Construction, thread xnsj5c *(Reddit geblokkeerd; alleen via zoeksnippet)*
37. Planning Planet — [forum Asta Powerproject](https://planningplanet.com/forums/asta-powerproject/411577/powerproject-planning-planet) *(HTTP 403; alleen titels/snippets)*

### Aanvullende bronnen uit de verificatieronde (25-07-2026)
38. [Eleco — "Elecosoft brings back Asta brand to represent scheduling suite"](https://eleco.com/news/elecosof-brings-back-asta-brand-represent-scheduling-suite/) — **primaire bron voor 1986 (eerste release) en 2006 (overname door Eleco)**
39. [Eleco — AstaGPT](https://eleco.com/products/asta/astagpt/)
40. [PM ERA Inc. — Powerproject](https://www.pmera.com/software/powerproject/) — noemt **94** van de top 100 (tegenover PBC Today's 90)
41. [PSG Inc — ASTA PowerProject](https://www.psgincs.com/product/asta-powerproject-construction-software/) — US$1.495 (list US$1.575), concurrent
42. [Scribd — Powerproject End User Price List 2023](https://www.scribd.com/document/693881805/Powerproject-End-User-Price-List-2023) — bestaan bevestigd, inhoud niet leesbaar; bevat perpetual + maintenance in euro's
43. shop.eleco.com — EasyPlan-productvermelding ("a lean stand alone version of Asta Powerproject") via zoekindex

### Niet toegankelijk tijdens dit onderzoek
- G2 (HTTP 403) · TrustRadius (HTTP 403) · Gartner Peer Insights (geen listing gevonden) · Reddit (geblokkeerd) · SourceForge/Slashdot (HTTP 404) · **shop.eleco.com (HTTP 429 — in de verificatieronde opnieuw drie keer, ook via `/collections/all` en `/products.json`)** · Scribd-prijslijst 2023 (laadfout) · itqlick.com (HTTP 403)

---

## Verificatie

**Uitgevoerd:** 25 juli 2026, adversariële fact-check door een tweede analist.
**Methode:** de belangrijkste falsifieerbare beweringen zijn niet bevestigd maar **actief geprobeerd te weerleggen**, met directe raadpleging van primaire bronnen (G-Cloud 14, ir.eleco.com, eleco.com, help.elecosoft.com, support.astadev.de) plus nieuwe, niet eerder gebruikte bronnen (Eleco-nieuwsarchief, PM ERA, PSG Inc, Scribd-prijslijst, Shopify-endpoints van shop.eleco.com). Waar een bewering niet reproduceerbaar bleek, is zij in de tekst hierboven aangepast of gedegradeerd — niet stilzwijgend blijven staan.

**Beperking van deze ronde:** het WebSearch-budget van de sessie was uitgeput; alle verificatie liep via directe fetches en via DuckDuckGo-lite/HTML als zoekproxy. Reddit, G2, TrustRadius en Gartner bleven ook nu ontoegankelijk, dus de onafhankelijke reviewbasis is niet verbreed.

### Prijzen en licentiemodellen

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| 1 | **£1.113 per gebruiker per jaar**, Asta Powerproject SaaS, G-Cloud 14, service-ID 159955281882828, leverancier ELECOSOFT UK LTD | **Bevestigd** | Bedrag, eenheid en service-ID exact bevestigd op de bron. *Deelclaims niet bevestigd:* "excl. btw" en "incl. 1 GB opslag per gebruiker" staan niet expliciet in de opgehaalde listing — behandel die twee details als onzeker | [G-Cloud 14, service 159955281882828](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828) |
| 2 | **US$1.340/jaar named seat** en **US$2.200/jaar concurrent** bij reseller Projects Analytics, incl. één dag gratis virtuele training | **Bevestigd** | Beide bedragen, beide licentieomschrijvingen ("installed onto a single Windows PC" / "license held in the Cloud") en de gratis trainingsdag letterlijk teruggevonden. De pagina biedt géén perpetual-optie — consistent met §3.3 | [projectsanalytics.com](https://projectsanalytics.com/purchase-powerproject-licenses/) |
| 3 | **US$1.675 per gebruiker per jaar** als startprijs op Capterra/GetApp/Software Advice | **Bevestigd** | Capterra toont "$1,675 Per User, Per Year". Meteen ook de reviewclaims geverifieerd: 4,5/5 over **34** reviews, Ease of Use 4,3, Features 4,6, Support 4,6, Value 4,4 — alle vijf exact correct | [capterra.com](https://www.capterra.com/p/173782/Powerproject/) |
| 4 | **£1.470/jaar single user op shop.eleco.com** | **Gecorrigeerd → onbevestigd** | **Niet reproduceerbaar.** Drie fetchpogingen (productpagina, `/collections/all`, Shopify `/products.json`) gaven alle HTTP 429; `site:shop.eleco.com`-zoekopdrachten leverden wél de productpagina's op maar **geen enkele prijssnippet in GBP**. Bronkwaliteit verlaagd naar "zeer laag"; het daarop gebaseerde "32%-verschil"-argument in §5.10 is als hard feit ingetrokken | shop.eleco.com (HTTP 429); zoekindex zonder prijssnippet |
| 5 | **£880/jaar** volgens pricingnow.com / softwarefinder.com, en **vanaf US$2.000** volgens ITQlick — beide lage bronkwaliteit | **Bevestigd (inclusief de lage kwaliteit)** | ITQlick's onbetrouwbaarheid is nu aantoonbaar: dezelfde aggregator noemt "$2000 per user/year" op de prijspagina en "$1,300 per license" op een vergelijkingspagina. Dat rechtvaardigt de kwalificatie "modelmatige schatting", en méér | ITQlick-pagina's via zoekindex |
| 6 | **Nieuwe vondst — niet in het oorspronkelijke profiel:** US-reseller PSG Inc noemt **US$1.495** (list US$1.575) voor "Asta PowerProject ... licensed for Concurrent use" | **Toegevoegd, lage betrouwbaarheid** | Wijkt sterk af van Projects Analytics' US$2.200 concurrent. De pagina positioneert het product als "the perfect replacement for SureTrak" en noemt geen versie of looptijd — vrijwel zeker verouderde content, maar het is een echte tweede resellerprijs en vergroot de gedocumenteerde spreiding | [psgincs.com](https://www.psgincs.com/product/asta-powerproject-construction-software/) |
| 7 | Licentiemodellen: single user, concurrent/serverlicentie via **Asta Lizenzserver sinds Powerproject 8**, SaaS (enige route naar Mac), gratis onderwijslicenties | **Bevestigd** | Duitse supportsite letterlijk: "Seit Powerproject 8 gibt es den Asta Lizenzserver, der als zentraler Dienst auf einem Ihrer Server die Clients mit Powerproject Lizenzen versorgt", plus aparte Netzwerklizenz en Schulversion. Gratis onderwijs bevestigd op de Duitse productpagina: "Wir stellen unsere Projektmanagementsoftware Bildungseinrichtungen kostenlos zur Verfügung". *Kanttekening:* de SaaS-variant wordt op astadev.de **niet** genoemd — die claim leunt op eleco.com/G-Cloud, niet op de Duitse supportsite | [support.astadev.de/lizenzen](https://support.astadev.de/lizenzen); [eleco.com/de/produkte/asta/asta-powerproject](https://eleco.com/de/produkte/asta/asta-powerproject/) |
| 8 | **Perpetual is feitelijk uitgefaseerd**; perpetual-omzet FY2025 £0,5 mln van £1,0 mln; "post our SaaS financial transition" | **Bevestigd, met correctie op de cijfers en een nuance** | Exacte cijfers zijn **£545k (FY2025) tegen £1.013k (FY2024)** — een daling van **46%**, niet 50%; "gehalveerd" is licht overdreven en is in §1.3 en §3.3 gecorrigeerd. Het citaat "post our SaaS financial transition" is letterlijk bevestigd. **Nuance:** er bestaat een officiële *"Powerproject End User Price List 2023"* (januari 2023, euro's) mét perpetual + jaarlijkse maintenance, dus "geen publieke perpetual-prijslijst meer" geldt voor 2026, niet historisch | [ir.eleco.com/regulatory/final-results-8](https://ir.eleco.com/regulatory/final-results-8/); [Scribd-prijslijst 2023](https://www.scribd.com/document/693881805/Powerproject-End-User-Price-List-2023) |
| 9 | **[SCHATTING]** perpetual historisch £2.000–3.500/seat + 18–22% onderhoud | **Onzeker — blijft schatting** | Niet weerlegd, maar ook niet bevestigd: de enige vindbare officiële perpetual-prijslijst (2023, euro's) was niet leesbaar. De schatting blijft als zodanig gemarkeerd; er is nu wel een concrete bron aangewezen om haar te toetsen | idem |
| 10 | **Geen enkele module heeft een gepubliceerde prijs**; risicoanalyse inbegrepen, Project Viewer gratis, 4D betaalde module, SiteProgress apart gelicentieerd | **Bevestigd** | Geen moduleprijs gevonden op eleco.com, G-Cloud of enige reseller. Asta Vision Plus is expliciet "an upgrade to Asta Vision" — dus een aparte betaalde laag, zoals gesteld | [eleco.com — Asta Vision](https://eleco.com/products/asta-powerproject/asta-vision/) |
| 11 | **[SCHATTING]** volledig ingerichte werkplek met 4D + Vision = US$2.500–4.000/gebruiker/jaar | **Onzeker — blijft schatting** | Geen enkele bron bevestigt of weerlegt dit. Blijft uitsluitend budgetteringsindicatie | — |
| 12 | Staffels niet gepubliceerd; pricingnow rekent lineair (10 ≈ £8.800, 100 ≈ £88.000) | **Onzeker** | De lineariteit is een eigenschap van een lage-kwaliteitsbron, geen leveranciersgegeven. G-Cloud vermeldt inderdaad geen minimumcontractomvang. De conclusie "weinig volumekorting in de listprijs" mag niet zwaarder wegen dan de bron | [G-Cloud 14](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828) |
| 13 | **Proefperiode inconsistent: 14 versus 30 dagen** | **Bevestigd** | G-Cloud: "typically 14 days". Duitse productpagina Eleco: "kostenlose 14-tägige Testversion". Duitse supportsite: "Ab Installation lässt sich Powerproject 30 Tage lang testen", verlengbaar. De tegenstrijdigheid tussen leverancierskanalen is echt | [G-Cloud 14](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828); [eleco.com/de](https://eleco.com/de/produkte/asta/asta-powerproject/); [support.astadev.de](https://support.astadev.de/lizenzen) |

### Eigendom, levenscyclus en marktclaims

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| 14 | Eleco plc, AIM/LSE, ticker **ELCO**, koers 130,50p, 52-weeksbereik 106,50–175,40 | **Bevestigd** | Ticker en alle drie de koersgetallen exact | [ir.eleco.com](https://ir.eleco.com/investor-relations/) |
| 15 | FY2025: omzet £38,8 mln (+20%), TRR £31,3 mln, ARR £34,3 mln, 81% terugkerend, EBITDA +32%, PBT +35%; regio's UK £18,4/Rest Europa £7,7/Scandinavië £6,9/Duitsland £3,3/VS £1,5 (−10%)/RoW £1,1 | **Bevestigd** | Alle cijfers exact. **Aangevuld:** adjusted EBITDA £10,2 mln en adjusted PBT £7,3 mln in absolute termen (stonden als "—" in de tabel), Rest of World +50%, en het terugkerende aandeel was 77% in 2024 | [ir.eleco.com/regulatory/final-results-8](https://ir.eleco.com/regulatory/final-results-8/) |
| 16 | **Powerproject "stamt uit de jaren '90"**; overnamejaar door Eleco **[NIET GEVERIFIEERD]** | **Gecorrigeerd** | **Fout.** Eleco's eigen nieuwsartikel: "Asta Powerproject was first developed and released in **1986** by the company Asta Development ... prior to the company's **acquisition by Eleco in 2006**". Het jaartal is met een decennium gecorrigeerd en de eerder onbevestigde overname (2006) is nu hard | [eleco.com — Asta brand](https://eleco.com/news/elecosof-brings-back-asta-brand-represent-scheduling-suite/) |
| 17 | **elecosoft.com geeft HTTP 301 naar eleco.com** (actieve rebranding) | **Bevestigd** | Redirect onafhankelijk gereproduceerd: 301 Moved Permanently, elecosoft.com → eleco.com. Helpdocumentatie draait inderdaad nog op help.elecosoft.com | eigen waarneming, 25-07-2026 |
| 18 | **Meer dan 100.000 professionals wereldwijd** | **Bevestigd** | "supports more than 100,000 professionals worldwide" (EN) en "unterstützt über 100.000 Bauprofis weltweit" (DE). *Blijft een niet-geauditeerd leverancierscijfer* | [eleco.com](https://eleco.com/products/asta-powerproject/); [eleco.com/de](https://eleco.com/de/produkte/asta/asta-powerproject/) |
| 19 | **90 van de top 100 UK-hoofdaannemers** | **Bevestigd als citaat, gecorrigeerd als feit** | PBC Today bevestigt "90 of the top 100 main contractors in the UK". Maar reseller PM ERA noemt **94** van de top 100 — het is een variabel marketingcijfer zonder definitie van "top 100" en zonder audit. In §1.4 gekwalificeerd als orde van grootte | [PBC Today](https://www.pbctoday.co.uk/news/digital-construction-news/construction-software-news/nodes-links-to-work-on-asta-powerproject-with-elecosoft/132745/); [pmera.com](https://www.pmera.com/software/powerproject/) |
| 20 | **"the UK construction industry's most widely used project scheduling tool"** (§7.1) | **Gecorrigeerd → verwijderd** | Stond zonder bron in het profiel en kon aan **geen enkele** bron worden toegewezen; gerichte zoekopdracht op de exacte frase leverde nul resultaten. Als citaat geschrapt, met een expliciete noot dat er geen onafhankelijke marktaandeelmeting bestaat | eigen zoekverificatie, 25-07-2026 |
| 21 | **Twaalf opeenvolgende jaren "Project Management Software of the Year"** + "Company of the Year" | **Bevestigd** | "12th consecutive year" en "Company of the Year" beide letterlijk in de FY2025-resultaten | [ir.eleco.com/regulatory/final-results-8](https://ir.eleco.com/regulatory/final-results-8/) |
| 22 | **Klanten:** STRABAG, PORR, Leonhard Weiss (DE) | **Bevestigd** | Alle drie op de Duitse productpagina | [eleco.com/de](https://eleco.com/de/produkte/asta/asta-powerproject/) |
| 23 | Productfamilie (Powerproject, Enterprise, Vision, Vision Live, Vision Plus, SiteProgress, Connect, Project Viewer, AstaGPT) | **Gecorrigeerd → aangevuld** | Familie klopt, maar **EasyPlan ontbrak**: "a lean stand alone version of Asta Powerproject suited for smaller contractors or work packages", complementair aan het hoofdprogramma en met eigen abonnements- én perpetual-varianten in de prijslijst 2023. Dat is direct relevant voor §5.9 en §8 ("te duur voor kleine aannemers") — er bestaat een goedkopere instap die het profiel niet noemde. Toegevoegd aan §2.9 | shop.eleco.com-vermeldingen via zoekindex; prijslijst 2023 |
| 24 | AstaGPT gelanceerd op de **Asta Innovation Summit (Nashville)** | **Gecorrigeerd → onbevestigd** | De productpagina noemt geen Nashville en geen summit. Wel bevestigd: documentatie-chatbot, 150+ talen, getraind op ~1,5 miljoen woorden helpdocumentatie, dekt Powerproject/Vision/SiteProgress. Nashville-vermelding als feit verwijderd | [eleco.com/products/asta/astagpt](https://eleco.com/products/asta/astagpt/) |

### Technische claims

| # | Bewering | Oordeel | Toelichting | Bron |
|---|---|---|---|---|
| 25 | **Geen API in het standaardproduct** ("Not available" op G-Cloud); echte API alleen in Asta Vision Plus | **Bevestigd** | G-Cloud-listing: "No API offered". Eleco's eigen Vision-pagina: "The Asta Vision API gives secure, structured access to Asta Vision and Asta Powerproject programme data" en Vision Plus is "an upgrade to Asta Vision". De kern van nadeel §5.3 staat overeind | [G-Cloud 14](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828); [eleco.com — Asta Vision](https://eleco.com/products/asta-powerproject/asta-vision/) |
| 26 | **Export CSV, HTML, XML, MPP, XER, Excel, SQL; import CSV, XML, MPP, XER, XLS — geen IFC in de exportlijst** | **Bevestigd** | Beide lijsten exact bevestigd op G-Cloud. IFC komt in geen van beide voor | [G-Cloud 14](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828) |
| 27 | **IFC-ondersteuning: IFC 2x3, 2x4 en 4; "IFC4-datamodel"** | **Gecorrigeerd → onzeker** | **Niet reproduceerbaar.** Op geen van de drie geciteerde pagina's (`Schedule_from_IFC`, `Group_models_IFC_info_PP`, de 4D-productpagina) staat een IFC-schemaversie; twee gerichte zoekopdrachten leverden geen Elecosoft-bron met versienummers op. Bovendien is "IFC 2x4" geen officiële buildingSMART-release (het was de werktitel van IFC4), wat de claim extra verdacht maakt. In §2.8 en §6.4 als **onbevestigd** gemarkeerd | eigen hercontrole van de drie geciteerde help-/productpagina's |
| 28 | **Powerproject schrijft geen planningsdata naar IFC** (geen IfcWorkSchedule/IfcTask/IfcRelSequence-export) | **Bevestigd voor zover een negatieve claim bevestigbaar is** | De officiële G-Cloud-exportlijst bevat geen IFC, en de BIM-helpdocumentatie behandelt uitsluitend import ("The process described focuses on importing IFC models to generate schedules, not exporting schedules back to IFC"). Er blijft geen bron die IFC-planningsexport bevestigt **of** expliciet ontkent — de oorspronkelijke voorzichtige formulering in §6.4 is correct en blijft staan. **Dit is de strategisch belangrijkste bevinding van het profiel en hij overleeft de tegenproef** | [help.elecosoft.com — Schedule_from_IFC](https://help.elecosoft.com/powerproject_bim/english/help/Content/HTML%20Topics/Building_a_project_schedule/Schedule_from_IFC.htm); [G-Cloud 14](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828) |
| 29 | **IFC-property-mapping:** integers/floats gesommeerd, strings geconcateneerd (behalve bij identieke waarden), via tabblad UDF Transfer | **Bevestigd** | Letterlijk: "the IFC property values are summed for integer and float-type fields" en "concatenated together, except where values are identical" | [help.elecosoft.com — Group_models_IFC_info_PP](https://help.elecosoft.com/powerproject_bim/english/help/Content/HTML%20Topics/Group_models/Group_models_IFC_info_PP.htm) |
| 30 | **Onbeperkt aantal links tussen twee activiteiten**; instelbaar MSP-/P6-algoritme; link categories aan/uit; task snapping; "task start on new day"; kalender per taak op de balk | **Bevestigd** | Alle zes letterlijk teruggevonden bij Eastwood Harris, inclusief het betonstort-voorbeeld ("so large concrete pours do not start one hour before the end of the day"). MS Project "only supports one relationship between two activities" bevestigd | [Eastwood Harris](https://eastwoodharris.com/comparison-of-microsoft-project-oracle-primavera-p6-and-elecosoft-asta-powerproject/) |
| 31 | **Baselines:** onbeperkt aantal, tot 10 gelijktijdig in de Gantt met resource- en kostendata; P6 toont er 4 met beperkte data | **Bevestigd** | ScheduleReader: Powerproject "Save unlimited baselines, shows up to 10 with resource and cost data"; P6 "Save unlimited baselines, shows only 4 with limited data". Eastwood Harris bevestigt "up to 10 Baselines may be displayed in the Gantt Chart" | [ScheduleReader](https://schedulereader.com/asta-powerproject-vs-primavera-p6/); Eastwood Harris |
| 32 | **"capital planning absent"** bij Powerproject | **Bevestigd** | ScheduleReader-vergelijkingstabel: capital planning "Yes" bij P6, "No" bij Powerproject | [ScheduleReader](https://schedulereader.com/asta-powerproject-vs-primavera-p6/) |
| 33 | P6 "designed to handle massive datasets" — als citaat van Eastwood Harris | **Gecorrigeerd** | **Verkeerd citaat.** De werkelijke formulering is *"The great advantage of P6 is the ability to handle massive amounts of data"*. De strekking klopt, het citaat niet; in §2.11 en §7.3 vervangen door de echte tekst | [Eastwood Harris](https://eastwoodharris.com/comparison-of-microsoft-project-oracle-primavera-p6-and-elecosoft-asta-powerproject/) |
| 34 | Powerproject "takes longer to learn"; lage marktpenetratie in Australië | **Bevestigd** | Beide letterlijk: "takes longer to learn" vanwege "many more scheduling options and functions than either P6 or Microsoft project"; "Asta Powerproject does not have a high market penetration in Australia" | [Eastwood Harris](https://eastwoodharris.com/comparison-of-microsoft-project-oracle-primavera-p6-and-elecosoft-asta-powerproject/) |
| 35 | **Versie 2026.1, build 18.0.02.001, uitgebracht medio juni**; achterwaarts compatibel met v17 | **Gecorrigeerd** | Versienummer 2026.1 en de v17-compatibiliteit kloppen ("Full backward combability with Version 17"). Maar het **buildnummer 18.0.02.001 staat niet in de release notes en is nergens bevestigd** — verwijderd. Ook "medio juni" zonder jaartal was misleidend: de releasepagina noemt medio juni **2025** voor de 2026-generatie | [release notes 2026.1](https://help.elecosoft.com/powerproject_release_notes/english/Content/HTML%20Topics/2026_1.htm); [eleco.com/asta-powerproject-2026](https://eleco.com/asta-powerproject-2026/) |
| 36 | 4D opent zeer grote 3D-modellen sneller in 2026.1; nieuwe checkbox "Export implied bar links for WBS hierarchy" bij XER-export | **Bevestigd** | Beide letterlijk in de release notes. De implicatie dat grote modellen tot recent een reëel probleem waren, wordt door de notes zelf ondersteund ("appeared to cause the application to stop responding") | [release notes 2026.1](https://help.elecosoft.com/powerproject_release_notes/english/Content/HTML%20Topics/2026_1.htm) |
| 37 | **Geen gepubliceerde limiet op aantal activiteiten**; praktische inschatting 10.000–20.000 | **Onzeker — blijft schatting** | De officiële "Maximising performance"-pagina bevestigt de prestatiedegradatie, maar het getal 10.000–20.000 komt uit geen enkele bron. Correct gemarkeerd als [SCHATTING]; niet weerlegbaar zonder pilot | [help.elecosoft.com — Maximising performance](https://help.elecosoft.com/powerproject/english/help/Content/HTML_Topics/Conceptual/Structuring_your_project/Maximise_performance/Maximising.htm) |
| 38 | SaaS **niet mobiel-geoptimaliseerd**; uptime 99,8% met service credits | **Bevestigd** | G-Cloud: "Designed for use on mobile devices: No" en "99.8% uptime guarantee. Service credits offered in the event of any extended downtime" | [G-Cloud 14](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/159955281882828) |

### Samenvattend oordeel van de fact-check

**Het profiel houdt goed stand.** Van 38 gecontroleerde beweringen zijn er **24 bevestigd**, **9 gecorrigeerd**, **4 als onzeker gemarkeerd** en **1 als nieuwe vondst toegevoegd** (de tweede resellerprijs). De harde kern — G-Cloud-prijs, resellerprijzen, alle FY2025-financials, het ontbreken van een API, de exportformaatlijst zónder IFC, en de centrale strategische bevinding dat Powerproject IFC wél consumeert maar niet produceert — overleeft de tegenproef zonder uitzondering.

**De belangrijkste correcties, in volgorde van belang** (de overige twee zijn de precieze perpetual-cijfers — £545k van £1.013k, een daling van 46% in plaats van "gehalveerd" — en de nuancering van "90 van de top 100" tot een variabel, niet-geauditeerd marketingcijfer dat elders 94 luidt):
1. **Oorsprongsjaar 1986, niet "de jaren '90"** — een fout van een decennium; tegelijk is de overname door Eleco in **2006** nu wél bevestigd (was [NIET GEVERIFIEERD]).
2. **£1.470 van shop.eleco.com is niet reproduceerbaar** — en daarmee valt het "32% verschil tussen twee eigen kanalen"-argument weg. De bredere spreidingsconclusie blijft overeind.
3. **De IFC-versielijst "2x3, 2x4 en 4" is niet vindbaar** in de geciteerde bronnen en bevat bovendien een niet-bestaande release (2x4). Voor een IFC-gericht onderzoek is dit de gevoeligste correctie.
4. **Het citaat over P6 en "massive datasets" was verkeerd geciteerd.**
5. **Het buildnummer 18.0.02.001 bestaat niet in de bronnen**; en "medio juni" bleek medio juni **2025**.
6. **Het superlatief "most widely used" had geen bron** en is geschrapt.
7. **EasyPlan ontbrak volledig** uit de productfamilie — relevant omdat het de conclusie "te duur voor kleine aannemers" nuanceert.

**Waar het profiel bewust voorzichtig was, was dat terecht.** De vier expliciete [SCHATTING]-markeringen (perpetual-prijsniveau, volledig ingerichte werkplek, activiteitenlimiet, diepte van de risicomodule) zijn geen van alle te bevestigen of te weerleggen; ze blijven schattingen en zijn correct als zodanig gelabeld. De aanbeveling om ze in een proof of concept te toetsen is de juiste.

**Restrisico.** De onafhankelijke bewijsbasis blijft dun: G2, TrustRadius, Gartner en Reddit waren ook in deze ronde onbereikbaar, en de 34 reviews op Capterra/GetApp/Software Advice zijn nog steeds de enige gestructureerde gebruikersdata. Bovendien leunt een aanzienlijk deel van de technische vergelijking op één auteur (Paul E. Harris / Eastwood Harris) — betrouwbaar en verifieerbaar geciteerd, maar wel een enkele stem. Het strengste openstaande punt blijft de **prijs van de modules**: daar is in twee onderzoeksrondes geen enkel publiek bedrag voor gevonden, en zonder offerte is elke totale eigendomskostenberekening giswerk.
