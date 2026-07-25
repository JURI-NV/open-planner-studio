# Dwarsdoorsnede-thema: Open source en gratis alternatieven in planningssoftware

**Marktonderzoek planningssoftware — themarapport**
Peildatum van alle cijfers: **25 juli 2026** (tenzij anders vermeld)
Opdrachtgever-context: Open Planner Studio, een open-source, IFC-native bouwplanner

---

## 1. Samenvatting

Het open-source landschap voor planningssoftware is **breed maar ondiep, en scherp tweeledig**. Er zijn tientallen projecten, maar ze vallen uiteen in twee categorieën die zelden overlappen:

1. **Commercieel gefinancierde open-core platforms** (OpenProject, Odoo, Tuleap, Plane, Taiga) — gezond, actief, goed onderhouden, maar het zijn *werk- en taakmanagementsystemen*, geen planningsengines. Hun "Gantt" is een tijdlijnvisualisatie, geen CPM-solver met kalenders, constraints, float en resource-nivellering.
2. **Klassieke desktop-planners met echte scheduling-diepte** (ProjectLibre, GanttProject, LibrePlan, Plan/KDE) — functioneel het dichtst bij MS Project/Primavera, maar structureel **onderfinancierd, traag en fragiel**. Dit is precies het segment waar open source het al twintig jaar niet redt.

De harde cijfers maken het contrast pijnlijk zichtbaar. In de afgelopen 52 weken registreerde OpenProject **15.205 commits**; GanttProject **237**; LibrePlan **159** (waarvan **41** in het laatste kwartaal — en **0 in de laatste zes weken**). Bron: GitHub `/stats/participation`, opgehaald 25-7-2026.

> **Correctie na verificatie (25-7-2026):** een eerdere versie van dit rapport meldde "6 commits in het laatste kwartaal" voor LibrePlan. Dat was een leesfout: de **6** is de waarde van één enkele week in het weekprofiel, niet het kwartaaltotaal. Het werkelijke totaal over de laatste 13 weken is **41**. De conclusie ("fragiel, bus-factor 1") blijft staan en wordt door het juiste cijfer eerder versterkt dan verzwakt — de activiteit is namelijk *volledig* naar nul gezakt in de laatste zes weken. Zie §Verificatie, punt V1.

Vier bevindingen springen eruit:

- **Het "zombie-revival"-patroon is reëel.** LibrePlan bracht op 12 mei 2026 versie 1.6.0 uit — de eerste release sinds **1.4.1 op 15 april 2015**. Een gat van elf jaar. ([releases.atom](https://github.com/LibrePlan/libreplan/releases.atom), 25-7-2026). Zulke projecten zijn niet dood, maar wel onbetrouwbaar als fundament.
- **Bibliotheken presteren beter dan applicaties.** MPXJ — één onderhouder, LGPL — leest 20+ planningsformaten en levert **maandelijkse releases** (v16.5.0 op 3-7-2026, tien releases sinds januari 2026) met 251 commits/jaar. Als infrastructuur is open source in deze markt wél geslaagd; als eindgebruikersproduct niet.
- **De financiering van het open BIM-ecosysteem is verbluffend klein.** De hele IfcOpenShell/Bonsai-stack — de facto de open-source IFC-infrastructuur wereldwijd — draait op een geschat **jaarbudget van $25.620,18** met **$92.887,21 totaal opgehaald** sinds oprichting. ([Open Collective](https://opencollective.com/opensourcebim), 25-7-2026.)
- **4D/IFC-planning is een gat, geen verzadigde markt.** OpenProject BIM levert IFC-viewer + BCF maar **geen 4D-koppeling** van model aan planning (€6,95 p/member/maand, min. 5 users). Bonsai's scheduling-documentatie draagt letterlijk de melding "🚧 **Work in Progress** - This page is **incomplete**". Niemand bezet de positie die Open Planner Studio kiest.

Waarom open source marginaal bleef, laat zich terugbrengen tot één mechanisme: **in planning is het bestandsformaat de markt, en dat formaat was tot voor kort proprietary**. Zolang de uitwisselstandaard `.mpp` en `.xer` heet, is elk open alternatief per definitie een tweederangs importeur. IFC 4.3 (ISO 16739-1:2024) verandert die vergelijking voor het eerst structureel — dat is de strategische kern van dit rapport.

---

## 2. Methode en bronkwaliteit

### 2.1 Wat is gedaan

Dit onderzoek leunt **primair op eerstehands bronnen**: leverancierswebsites en prijspagina's, GitHub-API-statistieken (commit- en release-telemetrie), SourceForge-downloadstatistieken, Open Collective-financiën, en normatieve documentatie van buildingSMART.

Waar mogelijk is **gemeten in plaats van geciteerd**. Commit-activiteit komt uit `api.github.com/repos/{owner}/{repo}/stats/participation` — een objectieve telling van wekelijkse commits over 52 weken, niet uit een persbericht. Releasecadans komt uit de `releases.atom`-feeds, niet uit changelog-marketing.

### 2.2 Expliciete beperking van dit onderzoek

**Het zoekbudget voor websearch van deze sessie was uitgeput voordat het onderzoek begon.** Dat heeft concrete gevolgen die de lezer moet meewegen:

| Wat wél gelukt is | Wat **niet** gelukt is |
|---|---|
| Directe fetches op leverancierssites en prijspagina's | Analistenrapporten (Gartner Magic Quadrant, Forrester Wave) — niet vindbaar zonder zoekmachine |
| GitHub-API telemetrie (commits, releases, stars) | Vendor-neutrale marktaandeelcijfers voor MS Project/Primavera |
| SourceForge-downloadstatistieken | Aanbestedingsdocumenten met expliciete P6/MSP-eisen |
| Open Collective-financiën | Vakpers-artikelen en onafhankelijke reviews |
| buildingSMART/ISO-referenties (deels) | iso.org zelf (HTTP 403), buildingsmart.org (HTTP 403) |

**Consequentie:** de secties over *marktaandeel* en *waarom open source marginaal bleef* zijn deels **analytisch afgeleid** in plaats van extern bevestigd. Ik markeer die passages consequent als schatting of redenering. De secties over *licentie, activiteit, verdienmodel en prijs* rusten wel op harde primaire bronnen.

### 2.3 Bronclassificatie die ik hanteer

| Klasse | Betekenis | Voorbeeld in dit rapport |
|---|---|---|
| **HARD** | Meetbaar, reproduceerbaar, niet-promotioneel | GitHub commit-tellingen; prijspagina's; Open Collective-boekhouding |
| **HARD-ish** | Feitelijk maar door de partij zelf gepubliceerd | Odoo "28 miljoen gebruikers"; SourceForge-downloadtellers |
| **MARKETING** | Zelfrapportage zonder verificatiemogelijkheid, vaak inconsistent | ProjectLibre "10M Active Users" |
| **SCHATTING** | Mijn eigen afleiding, met redenering erbij | Verhouding downloads↔actieve gebruikers |

Ik pas dit hieronder expliciet toe — met name op ProjectLibre, waar de zelfgerapporteerde cijfers elkaar aantoonbaar tegenspreken (§5.1).

---

## 3. Het landschap in één overzicht

| Project | Licentie | Type | Echte CPM-engine? | Verdienmodel | Bron (opgehaald 25-7-2026) |
|---|---|---|---|---|---|
| **ProjectLibre** | CPAL-1.0 | Desktop (Java) | Ja | Gratis desktop + betaalde Cloud AI | [sourceforge.net/projects/projectlibre](https://sourceforge.net/projects/projectlibre/) |
| **GanttProject** | GPL-3.0 | Desktop (Java/Kotlin) | Beperkt | Donaties ("pay what you wish") + Cloud | [ganttproject.biz](https://www.ganttproject.biz/) |
| **OpenProject** | GPL-3.0 | Web (Ruby) | Nee | Open core; Enterprise €5,95–15,95 p/u/m | [openproject.org/pricing](https://www.openproject.org/pricing/) |
| **Taiga** | MPL-2.0 | Web (Python) | Nee | Cloud-tiers €5–60/maand (flat) | [taiga.io/deployment-pricing-options](https://taiga.io/deployment-pricing-options/) |
| **Redmine** | GPLv2 | Web (Ruby) | Nee | Geen; plugin-ecosysteem (1.306 plugins) | [redmine.org](https://www.redmine.org/projects/redmine/wiki/Download) |
| **Tuleap** | GPLv2 | Web (PHP) | Nee | Enterprise, prijs op aanvraag | [tuleap.com](https://www.tuleap.com/) |
| **Odoo Project** | LGPLv3 (Community) | Web (Python) | Nee | Open core; $24,90–49,00 p/u/m | [odoo.com/pricing](https://www.odoo.com/pricing) |
| **LibrePlan** | AGPL-3.0 | Web (Java) | Ja | Uitsluitend donaties | [libreplan.dev](https://www.libreplan.dev/) |
| **Plan (KDE/Calligra)** | GPL | Desktop (C++) | Ja | Geen | [invent.kde.org/office/calligraplan](https://invent.kde.org/office/calligraplan) |
| **MPXJ** | LGPL-2.1 | Bibliotheek (Java/.NET/Python/Ruby) | n.v.t. (leest ze) | Geen (individuele onderhouder) | [mpxj.org](https://www.mpxj.org/) |
| **Plane** | AGPL-3.0 | Web (TypeScript) | Nee | Open core; $6–13 per seat/m | [plane.so/pricing](https://plane.so/pricing) |
| **Vikunja** | AGPL-3.0-or-later | Web (Go) | Nee | Cloud €4–5 p/u/m | [vikunja.io/pricing](https://vikunja.io/pricing) |
| **Leantime** | AGPL-3.0 | Web (PHP) | Nee | Open core + cloud | [github.com/Leantime/leantime](https://github.com/Leantime/leantime) |
| **Kanboard** | MIT | Web (PHP) | Nee | Geen | [github.com/kanboard/kanboard](https://github.com/kanboard/kanboard) |
| **Worklenz** | AGPL-3.0 | Web (TypeScript) | Nee | Open core + cloud | [github.com/Worklenz/worklenz](https://github.com/Worklenz/worklenz) |
| **IfcOpenShell / Bonsai** | LGPL-3.0 | Bibliotheek + Blender-addon | Deels (ifc4d) | Donaties (~$25,6k/jr) | [opencollective.com/opensourcebim](https://opencollective.com/opensourcebim) |

**Observatie bij de tabel:** exact drie projecten in deze lijst hebben een echte netwerkplanningsengine met kalenders en kritiek pad — ProjectLibre, LibrePlan en Plan (KDE). Alle drie zijn Java/C++-desktop- of legacy-webapplicaties, alle drie zwak gefinancierd. De gezonde, goed gefinancierde projecten hebben géén CPM-engine. **Dat is geen toeval; het is de kern van het marktfalen** (uitgewerkt in §9).

---

## 4. Activiteitsmeting: harde repository-telemetrie

Dit is de meest objectieve maatstaf die publiek beschikbaar is. Alle cijfers uit `api.github.com/repos/{owner}/{repo}/stats/participation` en `/repos/{owner}/{repo}`, opgehaald **25 juli 2026**.

| Project | Commits laatste 52 wk | Waarvan laatste 13 wk | Sterren | Forks | Laatste push |
|---:|---:|---:|---:|---:|---|
| OpenProject | **15.205** | 4.771 | 15.666 | 3.381 | 2026-07-25 |
| IfcOpenShell | **2.863** | 715 | 2.667 | 942 | 2026-07-25 |
| Plane | **1.043** | ~87 | 55.040 | 5.102 | 2026-07-25 |
| Redmine (mirror) | **621** | 164 | 5.992 | 2.454 | 2026-07-25 |
| MPXJ | **247** | 73 | 338 | 116 | 2026-07-24 |
| GanttProject | **237** | 44 | 1.082 | 339 | 2026-07-18 |
| LibrePlan | **159** | **41** (0 in laatste 6 wk) | 347 | 181 | 2026-07-11 |
| Odoo (monorepo) | n.b. | n.b. | 53.274 | 33.233 | 2026-07-25 |
| Leantime | n.b. | n.b. | 11.071 | 1.079 | 2026-07-25 |
| Kanboard | n.b. | n.b. | 9.741 | 1.980 | 2026-07-24 |
| Taiga (kaleidos-ventures/taiga) | 0 | 0 | 564 | 83 | **2023-12-13** |
| Open Planner Studio | n.b. | n.b. | **5** | 0 | 2026-07-25 |

> **Herhaalbaarheidsnoot (toegevoegd na verificatie).** Alle cijfers hierboven zijn bij hercontrole op 25-7-2026 opnieuw opgehaald en gecorrigeerd naar de op dat moment gemeten waarden. Twee dingen om te weten voordat je deze tabel als vast gegeven behandelt: (a) sterren en forks lopen dagelijks op, dus kleine verschillen met een eerdere meting zijn drift, geen fout; (b) `/stats/participation` is een **schuivend** venster van 52 weken — als er een week af valt en een week bij komt, verandert het totaal zonder dat er iets aan het project veranderd is. De 13-weken-kolom is daardoor het minst reproduceerbaar (MPXJ mat bij hercontrole 73 in plaats van 52). Gebruik deze tabel voor **orden van grootte**, niet voor exacte vergelijkingen tussen meetmomenten.

### Interpretatie — en drie waarschuwingen

**Waarschuwing 1: sterren meten aandacht, niet gezondheid.** Plane heeft 55.026 sterren tegenover OpenProject's 15.663, maar OpenProject levert **vijftien keer zoveel commits**. Sterren zijn een populariteitssignaal uit de ontwikkelaarscultuur, geen adoptie- of kwaliteitsmaat. Ze correleren vooral met marketing en met hoe recent een project op Hacker News stond.

**Waarschuwing 2: het Taiga-cijfer is misleidend zonder context.** De repository `kaleidos-ventures/taiga` staat sinds 13-12-2023 stil en heeft **nul releases** ([releases.atom](https://github.com/kaleidos-ventures/taiga/releases.atom), leeg, 25-7-2026). Maar de klassieke backend `taigaio/taiga-back` is wél actief, met commits t/m **22 juli 2026** ([commits/main.atom](https://github.com/taigaio/taiga-back/commits/main.atom)). Taiga heeft dus een *architecturale herstart laten doodbloeden* en is teruggevallen op de oude codebase. Dat is een ander verhaal dan "verlaten", en een belangrijk waarschuwingssignaal over grote rewrites in vrijwilligersprojecten.

**Waarschuwing 3: monorepo-commits zijn niet vergelijkbaar.** Odoo's cijfers en OpenProject's 15.205 commits bevatten vertalingen, CI-configuratie en dependency-bumps. Ik heb ze niet gefilterd. De **orde van grootte** is betekenisvol (15.205 vs. 159 is geen meetfout), de precieze verhouding niet.

### De activiteitsklassen

Ik onderscheid drie regimes, met een expliciete drempelredenering:

- **Industrieel (>1.000 commits/jaar):** OpenProject, IfcOpenShell, Plane. Betaalde ontwikkelaars. Voorspelbare releases. Veilig om op te bouwen.
- **Onderhouden (100–1.000):** Redmine, MPXJ, GanttProject. Werkt, maar tempo is gebonden aan één tot enkele personen.
- **Fragiel (sterk pulserend, met stilstand):** LibrePlan — 159 commits over het jaar, waarvan 41 in het laatste kwartaal, maar **nul in de laatste zes weken**. Technisch levend, praktisch afhankelijk van één individu. *(Merk op dat de drempel hier niet "<100 commits" is: LibrePlan haalt 159. Wat het project fragiel maakt is niet het jaartotaal maar het **patroon** — bursts afgewisseld met volledige stilstand, zonder onderliggende basiscadans. Zie §5.7 en §Verificatie V1.)*

---

## 5. Projectanalyses

### 5.1 ProjectLibre — het grootste bereik, de zwakste cijfers

ProjectLibre is verreweg het meest gedownloade open-source alternatief voor MS Project. Het staat onder de **Common Public Attribution License 1.0 (CPAL)** — een OSI-goedgekeurde maar ongebruikelijke licentie met een *attributieverplichting* (het "Powered by"-badgevereiste), wat het in de praktijk minder aantrekkelijk maakt voor herverpakking dan GPL of MIT.

**Harde adoptiecijfers:**

| Metriek | Waarde | Bron | Klasse |
|---|---|---|---|
| Downloads 1-7-2025 t/m 25-7-2026 | **779.618** | [SourceForge stats](https://sourceforge.net/projects/projectlibre/files/stats/timeline?dates=2025-07-01+to+2026-07-25) | HARD |
| Downloads deze week | 19.762 | SourceForge projectpagina | HARD |
| Cumulatief (SourceForge) | "7.8M+ downloads in 193 countries" | SourceForge | HARD-ish |
| Laatste bestandsupdate | 2025-04-30 | SourceForge | HARD |

**En dan de zelfrapportage** — hier begint het probleem. Op één en dezelfde dag (25-7-2026) beweren drie bronnen drie verschillende dingen:

| Bewering | Bron | Beoordeling |
|---|---|---|
| "7.8M+ downloads in 193 countries" | SourceForge-projectpagina | Plausibel, consistent met telemetrie |
| "Downloaded Over 8,200,000" / "Trusted by 8.2 M+ users" | [projectlibre.com](https://www.projectlibre.com/) | Downloads worden hier stilzwijgend **omgezet in "users"** |
| **"10M Active Users"** | projectlibre.com, zelfde pagina | **Onhoudbaar** — meer "actieve gebruikers" dan totale downloads |
| "more than 8.4 million times across over 200 countries" (juli 2026) | [Wikipedia](https://en.wikipedia.org/wiki/ProjectLibre) | Consistent met de downloadtrend |

**Kritische lezing:** de claim "10M Active Users" staat op dezelfde pagina als "8,2M+ downloads". Een product kan niet meer actieve gebruikers hebben dan het ooit downloads had. Dit is **MARKETING**, geen data, en het diskwalificeert de gebruikerscijfers van deze leverancier als input voor marktramingen.

**Mijn eigen schatting van de werkelijke actieve gebruikersbasis** (gemarkeerd als SCHATTING):
Redenering — 779.618 downloads over 13 maanden. Desktopsoftware zonder auto-update genereert per actieve gebruiker ruwweg 1–2 downloads per jaar (herinstallaties, meerdere machines, nieuwe versies), en een groot deel van de downloads zijn eenmalige proefinstallaties die nooit tot gebruik leiden. Bij een conversie van 15–30% naar terugkerend gebruik kom ik op **grofweg 100.000–250.000 daadwerkelijk actieve gebruikers wereldwijd**. De officiële SourceForge-vermelding "250K+ community" ligt aan de bovenkant van die bandbreedte en is daarmee de geloofwaardigste van de gepubliceerde cijfers. *Onzekerheid hierop is hoog; behandel als orde van grootte, niet als getal.*

**Verdienmodel:** desktop gratis en open source; inkomsten uit **ProjectLibre Cloud AI**, een proprietary SaaS. Prijzen worden **niet publiek gemaakt** — zowel `/pricing/` als de productpagina tonen geen bedragen, alleen "request a trial" met verplicht zakelijk e-mailadres ([projectlibre.com/product/projectlibre-cloud](https://www.projectlibre.com/product/projectlibre-cloud/), 25-7-2026). Dat is een klassiek enterprise-sales-signaal en tegelijk een transparantieprobleem.

**Beoordeling:** ProjectLibre bewijst dat er **massale latente vraag** is naar een gratis MS Project-vervanger — ruim **730.000 downloads per jaar** is geen niche. *(Gecorrigeerd: de 779.618 downloads beslaan 1-7-2025 t/m 25-7-2026, dus 12,8 maanden, niet twaalf. Op jaarbasis is dat 779.618 ÷ 12,8 × 12 ≈ **731.000**, niet "780.000 per jaar" zoals een eerdere versie stelde — een overschatting van circa 7%. De orde van grootte, en dus het argument, verandert niet.)* Maar het bewijst óók dat downloadvolume zich niet vanzelf vertaalt in een duurzame organisatie: de desktopcode is in ruim een jaar niet vernieuwd (laatste bestandsupdate 30-4-2025) terwijl de aandacht naar de cloud-SaaS is verschoven.

### 5.2 GanttProject — het gedisciplineerde kleine project

GPL-3.0, ontwikkeld door BarD Software. **Stabiele versie 3.3, uitgebracht 15 januari 2024, laatste update 30 januari 2025; bèta 3.4 IV op 11 mei 2026** ([ganttproject.biz](https://www.ganttproject.biz/), 25-7-2026).

Releasehistorie ([releases.atom](https://github.com/bardsoftware/ganttproject/releases.atom), 25-7-2026):

| Release | Datum |
|---|---|
| ganttproject-3.3.3316 | 2025-12-07 |
| ganttproject-3.3.3312 | 2024-10-01 |
| ganttproject-3.3.3309 | 2024-05-29 |
| ganttproject-3.3.3300 | 2024-01-15 |
| ganttproject-3.2.3200 | 2022-03-21 |

**Verdienmodel:** "pay what you wish" — alle pakketten gratis beschikbaar, met de optie een betaalde download te kiezen en zelf het bedrag te bepalen. Daarnaast **GanttProject Cloud**, omschreven als "a commercial cloud-based project and collaboration server". Prijzen zijn **niet publiek**: zowel `ganttproject.biz/cloud` als `ganttproject.cloud` leverden geen prijsinformatie (25-7-2026; `ganttproject.cloud/pricing` gaf HTTP 404).

**Adoptie:** de SourceForge-distributie telt **231 downloads per week** ([sourceforge.net/projects/ganttproject](https://sourceforge.net/projects/ganttproject/), 25-7-2026) — ruwweg **1,2% van ProjectLibre's 19.762**. Let op: GanttProject distribueert primair via de eigen site, dus dit onderschat het werkelijke volume aanzienlijk. Het is een *ondergrens*, geen totaal.

**Beoordeling:** met 237 commits/jaar en een release-interval dat volgens de eigen releasefeed varieert van **circa 4 tot 22 maanden** is dit een **beheerst, duurzaam eenmansbedrijfsproject**. *(Gecorrigeerd: een eerdere versie sprak van "8–18 maanden". Dat is met de bovenstaande tabel niet te rijmen: 3.2.3200 → 3.3.3300 duurde 22 maanden, 3.3.3300 → 3.3.3309 slechts 4,5 maanden. De spreiding is dus groter en onregelmatiger dan gesuggereerd.)* Let ook op een inconsistentie aan de bronkant: `ganttproject.biz` noemt als "Latest update: 30 Jan, 2025", terwijl de GitHub-releasefeed een nieuwere build toont (3.3.3316, 7-12-2025). Dat is een verouderde leverancierspagina, geen tegenstrijdige meting. Geen groeiverhaal, maar ook geen sterfgeval: al twintig jaar levend. Functioneel dekt het WBS, afhankelijkheden, basiskalenders en resource-toewijzing — maar niet de diepte van MS Project (geen volwaardige constraint-typen, beperkte nivellering, geen baseline-vergelijking op het niveau van commerciële tools).

### 5.3 OpenProject — het gezondste open-core platform, maar geen planner

Met **15.205 commits in 52 weken** is OpenProject veruit het actiefste project in dit onderzoek. GPL-3.0, Duits (OpenProject GmbH). Releasecadans is strak maandelijks: v17.6.0 (8-7-2026), v17.5.1 (15-6-2026), v17.5.0 (10-6-2026).

**Prijsstructuur** ([openproject.org/pricing](https://www.openproject.org/pricing/), 25-7-2026) — HARD:

| Editie | Prijs | Minimum |
|---|---|---|
| Community | Gratis | — |
| Enterprise Basic | **€5,95** p/gebruiker/maand | 25 gebruikers |
| Enterprise Professional | **€10,95** p/gebruiker/maand | 25 gebruikers |
| Enterprise Premium | **€15,95** p/gebruiker/maand | 100 gebruikers |
| Corporate | Op aanvraag | 250 gebruikers |
| **BIM-add-on** | **+€1,00** p/gebruiker | — |

Meerjarige contracten geven korting ("5 months free for 2-year, 11 months free for 4-year"). Gebruikers worden per naam geteld, in stappen van 5.

**De open-core-snede is instructief** ([pricing/#features](https://www.openproject.org/pricing/#features), 25-7-2026). Wat opvalt is hoe *chirurgisch* de gratisheid begrensd wordt:

- **Gantt-charts: in Community.** Basisplanning wordt niet gegijzeld.
- **Baselines: half in Community.** Letterlijk: *"Set a project baseline and compare changes with yesterday. The full baseline feature, which allows comparisons with any date (range), is part of the Enterprise version."* Je krijgt de functie, maar met een kunstmatig venster van één dag.
- **SSO: Enterprise-only.** Klassiek — de functie die alleen grote organisaties nodig hebben.
- **2FA, custom fields, boards, tijdregistratie, kosten: Community.**
- **BIM (IFC-viewer, BCF-beheer): betaalde add-on.** *(Nuance na verificatie: de Revit-integratie wordt op de BIM-pagina aangekondigd als "to come soon" en is dus nog niet beschikbaar; een eerdere versie noemde haar als bestaande functie.)*

Dit is een goed uitgevoerd open-core-model: de individuele gebruiker krijgt een compleet product, de organisatie betaalt voor governance, integratie en schaal. De "baseline-met-één-dag"-truc is de meest expliciete illustratie die ik in dit hele onderzoek ben tegengekomen van hoe open core *precies* de grens legt waar de betalingsbereidheid begint.

**OpenProject BIM** ([openproject.org/bim-project-management](https://www.openproject.org/bim-project-management/), 25-7-2026): **€6,95 per member per maand** (jaarlijks gefactureerd, min. 5 gebruikers). Biedt IFC-upload en browser-viewer ("view the 3D models directly in the browser without the need for expensive software or licenses") plus BCF-issuebeheer.

> **Cruciale constatering voor de opdrachtgever:** de OpenProject BIM-pagina noemt **geen 4D-scheduling** — geen koppeling van IFC-elementen aan planningstaken, geen tijdgebonden sequencing van geometrie. Het is coördinatie (viewer + issues), niet planning. Ook OpenProject's Gantt is een tijdlijn zonder CPM-solver: geen kritiek pad, geen float-berekening, geen kalenderregels op taakniveau, geen resource-nivellering.

**Beoordeling:** OpenProject bewijst dat open source in dit domein commercieel kán. Maar het bewijst het door *geen planningssoftware te zijn* — het is projectmanagement-collaboratie. De echte planningsdiepte is nergens in het assortiment aanwezig.

### 5.4 Redmine — het onverwoestbare fundament

GPLv2, sinds 2006, oorspronkelijk van Jean-Philippe Lang. Het officiële repository is Subversion (`svn.redmine.org`); GitHub is een mirror ([redmine/redmine](https://github.com/redmine/redmine), 5.992 sterren, 2.454 forks).

**Releasestatus** ([redmine.org Download](https://www.redmine.org/projects/redmine/wiki/Download), 25-7-2026) — HARD:

| Versie | Datum | Status |
|---|---|---|
| **7.0.0** | **2026-06-30** | Laatste stabiele (nieuwe features, bugfixes, security) |
| 6.1.3 | 2026-06-15 | Alleen bugfixes + security |
| 6.0.10 | 2026-06-15 | Alleen kritieke security-updates |
| 5.1.13 | 2026-06-15 | **Unsupported** (niet meer onderhouden) |

*(Gecorrigeerd: een eerdere versie merkte alle drie de oudere lijnen aan als "Onderhouden". De downloadpagina onderscheidt ze expliciet, en 5.1.x staat er als **unsupported**. Er zijn dus drie ondersteunde lijnen, niet vier.)*

Drie ondersteunde versielijnen (7.0.x, 6.1.x, 6.0.x) plus één uitgefaseerde, met een major release in juni 2026 — dat is disciplinair beter dan de meeste commerciële producten. 621 commits/jaar via de mirror.

**Plugin-ecosysteem** — het echte verhaal. De officiële plugindirectory telt **1.306 plugins** verdeeld over 131 pagina's ([redmine.org/plugins](https://www.redmine.org/plugins?page=20), 25-7-2026). Dit is de grootste extensie-economie in het open-source planningslandschap, en het draagt Redmine's tekortkomingen: Gantt-verbeteringen, agile boards, en CRM zitten allemaal in plugins.

**Functionele diepte:** ontoereikend als planner. Redmine's eigen featurelijst noemt *"Automatic gantt and calendar based on issues start and due dates"* — de Gantt is een **afgeleide visualisatie van issue-datums**, geen planningsmodel. Er is geen netwerklogica, geen afhankelijkheidsberekening, geen kritiek pad. Ondersteunt wel 49 talen.

**Verdienmodel: geen.** Redmine heeft geen bedrijf, geen SaaS, geen enterprise-editie. Het overleeft op vrijwilligers en op dienstverleners die eromheen een praktijk bouwen. Dat is **twintig jaar lang gelukt** — het sterkste tegenargument tegen de stelling dat open source zonder verdienmodel niet overleeft. Maar het gaat ten koste van innovatietempo.

### 5.5 Tuleap — Franse soevereiniteit, ondoorzichtige prijzen

GPLv2, ontwikkeld door Enalean (Frankrijk). Positionering is expliciet soevereiniteitsgedreven: *"an open source solution developed in France"* met *"auditable code"* en *"Auditable open source core, with no black box"* ([tuleap.com](https://www.tuleap.com/), 25-7-2026).

**Belangrijke observatie over vindbaarheid:** Tuleap heeft **geen bronrepository op GitHub**. `github.com/Enalean/tuleap` geeft HTTP 404 (25-7-2026); alleen randrepo's bestaan (docker-images, documentatie). De broncode leeft op eigen infrastructuur (Gerrit op tuleap.net). Dat is legitiem — maar het betekent dat Tuleap **onzichtbaar is in elke GitHub-gebaseerde ontdekkingsroute**, wat in 2026 een aanzienlijk adoptienadeel is. Ook `enalean.com` redirect nu naar `tuleap.com`, wat op een herpositionering van de bedrijfsidentiteit wijst.

**Prijzen: niet publiek.** Zowel `/pricing` als `/start-now/` tonen geen bedragen; het model is quote-based ("a quote tailored to your context", "No commitment, no payment required"). Voor een leverancier die soevereiniteit en transparantie als kernbelofte voert, is de afwezigheid van transparante prijzen een opvallende inconsistentie.

**Functionele diepte:** ALM-suite (issue tracking, agile, documenten, git/gerrit, testbeheer). Geen CPM-planning.

### 5.6 Odoo Project — het commerciële succesverhaal dat de regel bevestigt

Odoo is met afstand het financieel succesvolste open-source bedrijf in dit landschap, en tegelijk het minst relevant als planningssoftware.

**Harde financiële cijfers** ([Wikipedia/Odoo](https://en.wikipedia.org/wiki/Odoo), 25-7-2026; secundair, maar met traceerbare onderliggende bronnen):

| Metriek | Waarde | Jaar |
|---|---|---|
| Omzet | **€282 miljoen** (+33% j-o-j) | 2023 |
| Waardering | **$5,26 miljard** | nov 2024 |
| Secondary round | **$500 miljoen** (CapitalG, Sequoia, BlackRock) | nov 2024 |
| Funding | $90 miljoen | 2019 |
| Medewerkers | 2.200+ | 2023 |

Odoo's eigen site claimt actueel **"28 million users worldwide"**, **"8,000+"** medewerkers, **21.000+** partners en 50.000+ community-apps ([odoo.com/page/about-us](https://www.odoo.com/page/about-us), 25-7-2026).

*Kritische noot:* het medewerkersaantal springt van 2.200 (2023, Wikipedia) naar 8.000+ (2026, eigen site). Dat is bijna een verviervoudiging in drie jaar. Niet onmogelijk voor Odoo's groeitempo, maar de definitie kan verschillen (inclusief partners of contractors). Behandel "8.000+" als **HARD-ish**, niet als geverifieerd.

**Licentiemodel:** Community onder **LGPLv3**; Enterprise proprietary. Dit is het strengste open-core-model in dit rapport — hele applicaties zitten achter de Enterprise-muur.

**Prijzen** ([odoo.com/pricing](https://www.odoo.com/pricing), 25-7-2026) — HARD:

| Plan | Prijs (jaarlijks) | Regulier | Inhoud |
|---|---|---|---|
| One App Free | **$0** | — | Eén app, onbeperkt gebruikers, Odoo Online |
| Standard | **$24,90** p/u/m | $31,10 | Alle apps, Odoo Online |
| Custom | **$49,00** p/u/m | $61,00 | Alle apps + Odoo.sh/on-premise, Studio, API |

**Planningsfunctionaliteit:** Odoo Project biedt een Gantt-view — *"a timeline that gives you an overview of your tasks, their dependencies, and planned dates"* ([odoo.com/app/project](https://www.odoo.com/app/project), 25-7-2026) — plus Kanban en lijstweergave, en een aparte Planning-app. **Geen kritiek pad, geen resource-nivellering, geen baselines.** De Project-app is bovendien "Free, forever, with unlimited users" als je hem als enige app gebruikt.

**Les:** Odoo bewijst dat open source miljardenwaarderingen kan halen — maar via **ERP-breedte**, niet via planningsdiepte. De €282 miljoen komt uit boekhouding, verkoop, voorraad en HR. Projectplanning is een bijproduct.

### 5.7 LibrePlan — de elfjarige winterslaap

Dit is het meest leerzame geval in het hele onderzoek.

LibrePlan is AGPL-3.0, een Java-webapplicatie, oorspronkelijk gefinancierd door *"Fundación para o Fomento da Calidade Industrial e o Desenvolvemento Tecnolóxico de Galicia"* ([README](https://github.com/LibrePlan/libreplan), 25-7-2026). Het is functioneel een van de **weinige open-source tools met echte planningsdiepte**: resource load van mensen én machines, materiaalregistratie, voortgangsrapportage, uitbesteding.

**De releasegeschiedenis is de hele analyse** ([releases.atom](https://github.com/LibrePlan/libreplan/releases.atom), 25-7-2026):

| Release | Datum | Interval |
|---|---|---|
| libreplan-1.6.1 | **2026-06-11** | 1 maand |
| libreplan-1.6.0 | **2026-05-12** | **11 jaar, 1 maand** |
| libreplan-1.4.1 | 2015-04-15 | 2 jaar |
| libreplan-1.4.0 | 2013-04-29 | |
| libreplan-1.3.3 | 2012-12-21 | |

Elf jaar stilte, dan twee releases in dertig dagen. Het commitpatroon bevestigt het beeld: 159 commits in 52 weken, met het weekprofiel `[...,1,3,0,37,3,3,0,9,11,12,7,16,20,11,2,2,0,0,6,0,0,0,0,0,0]`. Dat toont een **burst rond de 1.6.0/1.6.1-releases en daarna stilte**: 41 commits in het laatste kwartaal, en **nul in de laatste zes weken**.

*(Correctie: een eerdere versie las hier "slechts 6 commits in het laatste kwartaal". De 6 in het weekprofiel is de waarde van één week, niet het kwartaaltotaal; 13 weken sommeren tot 41. Het narratief verandert niet — de zes aaneengesloten nulweken aan het eind zijn zelfs een scherper signaal dan het oorspronkelijke, foute getal.)*

**Verdienmodel:** uitsluitend donaties. De site zegt letterlijk: *"funded only by donations from people like you"* en *"Without you, LibrePlan can't exist"* ([libreplan.dev](https://www.libreplan.dev/), 25-7-2026).

**Wat dit leert (SCHATTING, gebaseerd op het patroon):** het profiel — jarenlange stilte, plotse burst, dan opnieuw wegebbende activiteit — is kenmerkend voor **één gemotiveerd individu die een verlaten codebase adopteert**. Zulke revivals zijn waardevol maar structureel kwetsbaar: het bus-factor is 1. Bovendien is de technologiestack (Java 8, Tomcat 8, ZK-framework, CutyCapt + Xvfb voor printen) inmiddels zwaar verouderd, wat de modernisering onevenredig duur maakt.

**Voor de opdrachtgever is dit de belangrijkste waarschuwing in het rapport:** LibrePlan had alles wat Open Planner Studio wil zijn — echte planningsdiepte, open licentie, institutionele startfinanciering — en verloor het momentum toen de subsidie stopte. Functionele kwaliteit redt een project niet; **een verdienmodel of een permanente onderhoudsstructuur wel**.

### 5.8 Plan (KDE / Calligra Plan) — institutioneel maar marginaal

Onderdeel van de KDE Calligra-suite, GPL, C++. Het huidige repository op `invent.kde.org/office/calligraplan` toont **3.271 commits** en werd op 16 mei 2020 aangemaakt (migratie vanuit oudere infrastructuur) ([invent.kde.org/office/calligraplan](https://invent.kde.org/office/calligraplan), 25-7-2026).

Plan is functioneel serieus — het heeft taakafhankelijkheden, resource-toewijzing, kritiek pad en kostenberekening. Maar het lijdt aan een dubbele marginalisatie: het is (a) desktop-only in een SaaS-tijdperk en (b) gebonden aan de Calligra-suite, die zelf ver achterloopt op LibreOffice. Het is geen actief gepromoot product.

> **Gecorrigeerd na verificatie — Plan is wél actief in onderhoud.** Een eerdere versie van deze paragraaf stelde dat de onderhoudsstatus niet vast te stellen was, en vermoedde op grond van een HTTP 404 op `apps.kde.org/plan/` dat het product was afgestoten. Dat vermoeden is **onjuist gebleken**. Via de GitLab-API van KDE (`invent.kde.org/api/v4/projects/office%2Fcalligraplan/repository/commits`) zijn recente commits opgehaald: **22-7-2026** ("GIT_SILENT Sync po/docbooks with svn"), **14-7-2026** ("reactivate tjscheduler plugin on Windows" en "fix unit test 2: 'TaskJugglerTester'"), **13-7-2026** ("CI - Flatpak - Update Runtime to 6.11") en 7-7-2026. Dat is geen vertaal- of botverkeer alleen: er wordt in juli 2026 aan de **TaskJuggler-scheduler-plugin** en aan de bijbehorende unittests gewerkt — precies het planningsdeel van de applicatie. Een 404 op een marketingpagina is dus geen bewijs van een dood project; het is bewijs van een verhuisde marketingpagina. Zie §Verificatie V3.

*Resterende bronbeperking:* er zijn nog steeds geen recente **releases** vastgesteld (alleen commits). Actief onderhoud aan de codebase en een actieve releasecadans zijn niet hetzelfde; de conclusie "institutioneel maar marginaal" blijft daarom overeind, maar de onderbouwing verschuift van "waarschijnlijk verlaten" naar "levend maar zonder zichtbare productdistributie".

### 5.9 MPXJ — het onbetwiste open-source succes

Dit is het project dat als enige in dit landschap onbetwistbaar geslaagd is, en het is geen applicatie maar een **bibliotheek**.

**Licentie:** LGPL-2.1 (GitHub-metadata) / *"Distributed under the terms of the GNU LGPL"* ([mpxj.org](https://www.mpxj.org/)). LGPL is bewust gekozen: het staat gebruik in gesloten commerciële producten toe, mits de bibliotheek zelf vrij blijft.

**Activiteit:** 251 commits/52 weken en een **maandelijkse releasecadans** — tien releases tussen 13-1-2026 en 3-7-2026:

| Versie | Datum | | Versie | Datum |
|---|---|---|---|---|
| v16.5.0 | 2026-07-03 | | v16.1.0 | 2026-04-04 |
| v16.4.1 | 2026-06-22 | | v16.0.0 | 2026-03-11 |
| v16.4.0 | 2026-06-10 | | v15.3.1 | 2026-02-06 |
| v16.3.0 | 2026-06-01 | | v15.3.0 | 2026-02-02 |
| v16.2.0 | 2026-05-12 | | v15.2.0 | 2026-01-13 |

*(Aangevuld na verificatie: **v16.1.0 (4-4-2026)** ontbrak in de oorspronkelijke tabel, waardoor die negen releases toonde terwijl de tekst — terecht — tien releases claimde. Met v16.1.0 erbij kloppen tekst en tabel weer.)*

Bron: [releases.atom](https://github.com/joniles/mpxj/releases.atom), 25-7-2026. Maven Central bevestigt 16.5.0 als actuele publicatie ([central.sonatype.com](https://central.sonatype.com/artifact/net.sf.mpxj/mpxj), 25-7-2026).

**Formaatdekking** — de werkelijke waarde. MPXJ **leest**: MPX, MPP, MSPDI, MPD, Planner, P6 PMXML, XER, P3, SureTrak, Asta Powerproject, Asta Easyplan, Phoenix, Fasttrack, GanttProject, TurboProject, ConceptDraw PROJECT, Synchro, Gantt Designer, SDEF, Sage 100 Contractor Schedule Grid, Project Commander, Deltek Open Plan BK3, Edraw Project EDPX — plus live koppelingen naar Microsoft Project Server, Microsoft Planner, P6 Web Services en Oracle Primavera Cloud.

Het **schrijft**: MPX, MSPDI, PMXML, XER, Planner, SDEF.

Beschikbaar voor **Java, .NET (via IKVM), Python, Ruby (Gem) en PHP (via de PHP/Java Bridge)**. *(Aangevuld: PHP ontbrak in de oorspronkelijke opsomming; mpxj.org noemt het expliciet.)*

**Waarom dit werkt terwijl applicaties falen — mijn analyse:**

1. **Scherp afgebakend probleem.** "Lees planningsbestanden" heeft een eindige, toetsbare definitie. Een planningsapplicatie heeft dat niet — die concurreert op UX, support, integraties en vertrouwen.
2. **Geen UI, dus geen designschuld.** De grootste kostenpost van desktopsoftware ontbreekt volledig.
3. **De asymmetrie van formaatkennis.** Elk reverse-engineered formaat is permanente waarde die niemand hoeft te herhalen. Applicatiefeatures verouderen; formaatparsers niet.
4. **LGPL maakt commerciële adoptie legaal.** Gesloten producten kunnen MPXJ insluiten, wat de gebruikersbasis — en dus de bugrapporten — veel breder maakt dan bij GPL.

Met 338 sterren is MPXJ minder "populair" dan Plane (55.026), maar het is oneindig veel invloedrijker: het is de facto de interoperabiliteitslaag van de hele planningsindustrie.

### 5.10 Nieuwere en experimentele projecten

| Project | Licentie | Sterren | Commits/52wk | Prijs | Positionering |
|---|---|---:|---:|---|---|
| **Plane** | AGPL-3.0 | 55.026 | 1.043 | Free (≤12 users) / $6 / $13 per seat/m | "Open-source Jira, Linear, Monday, ClickUp alternative" |
| **Leantime** | AGPL-3.0 | 11.063 | n.b. | Open core + cloud | Neurodiversiteit-gericht ("ADHD, Autism, dyslexia in mind") |
| **Kanboard** | MIT | 9.742 | n.b. | Gratis | Minimalistisch Kanban |
| **Vikunja** | AGPL-3.0-or-later | 4.900 | n.b. | Self-host gratis; €4–5 p/u/m cloud | "The task manager you actually own" (Go/Vue) |
| **Worklenz** | AGPL-3.0 | 3.100 | n.b. | Open core + cloud | Heeft Gantt-view + resource scheduler |
| **Focalboard** | NOASSERTION | 26.317 | n.b. | — | Overgedragen aan `mattermost-community` |

Bronnen: GitHub API en projectpagina's, 25-7-2026. [Plane pricing](https://plane.so/pricing), [Vikunja pricing](https://vikunja.io/pricing).

**Twee patronen:**

**Patroon 1: AGPL is de nieuwe standaard.** Plane, Vikunja, Leantime en Worklenz kozen alle AGPL-3.0. Dat is een bewuste anti-hyperscaler-keuze: AGPL dwingt netwerkgebruikers tot broncodevrijgave, wat AWS-achtige herverpakking blokkeert en het SaaS-verdienmodel van de maker beschermt. De prijs is dat AGPL-code voor veel bedrijven juridisch onbruikbaar is als bibliotheek — een reden waarom MPXJ's LGPL-keuze zo veel slimmer was voor een *component*.

**Patroon 2: Focalboard is een waarschuwing over corporate stewardship.** Met 26.317 sterren was het een van de populairste open-source projectborden. Het is verplaatst van `mattermost/` naar `mattermost-community/` — de standaardroute waarlangs een bedrijf een product afstoot zonder het formeel te archiveren. De laatste push (18-5-2026) is vermoedelijk onderhoudsverkeer. **Les:** een open-source project dat door één bedrijf wordt gedragen erft het strategische risico van dat bedrijf. 26.000 sterren beschermen nergens tegen.

**Geen van deze nieuwe projecten heeft een CPM-engine.** Ze concurreren allemaal met Jira/Trello/Asana, niet met MS Project/Primavera. Het planningssegment blijft onaangeraakt door de nieuwe generatie.

---

## 6. Verdienmodellen vergeleken

| Model | Voorbeelden | Werkt het? | Bewijs |
|---|---|---|---|
| **Open core (feature-gating)** | OpenProject, Odoo, Plane, Leantime | **Ja, bewezen** | Odoo €282 mln omzet (2023); OpenProject 15.205 commits/jr |
| **Betaalde SaaS naast gratis desktop** | ProjectLibre, GanttProject | Deels — desktop stagneert | ProjectLibre-desktop niet geüpdatet sinds 30-4-2025 |
| **Enterprise support/quote-based** | Tuleap | Onbekend (geen data) | Geen publieke prijzen |
| **Pure donaties** | LibrePlan, IfcOpenShell/Bonsai | **Nee, structureel ontoereikend** | LibrePlan: 11 jaar geen release. IfcOpenShell: ~$25,6k/jaar |
| **Geen model, vrijwilligers** | Redmine, Kanboard, MPXJ | Ja voor **onderhoud**, nee voor **innovatie** | Redmine 20 jaar levend; feature-set uit 2010 |

### 6.1 Het donatiemodel gemeten

Dit verdient een aparte behandeling, omdat het voor een nieuw open-source project de meest verleidelijke — en meest misleidende — optie is.

**IfcOpenShell / Bonsai Open Collective** ([opencollective.com/opensourcebim](https://opencollective.com/opensourcebim), 25-7-2026) — HARD, want dit is publieke boekhouding:

| Metriek | Bedrag |
|---|---|
| Totaal opgehaald (sinds oprichting) | **$92.887,21** |
| Totaal uitbetaald | $69.711,97 |
| Huidig saldo | $23.175,24 |
| **Geschat jaarbudget** | **$25.620,18** |
| Aantal contributors | 305 |
| Grootste zakelijke donateur | Cyril Waechter / BIM Insight — $10.400 sinds nov 2022 |
| Grootste individuele donateur | "FOSS-is-the-future" — $14.550 sinds feb 2024 |

**Deze cijfers verdienen het om te blijven hangen.** IfcOpenShell is de fundamentele open-source IFC-bibliotheek — gebruikt door Bonsai/BlenderBIM, door onderzoekers wereldwijd, door commerciële producten. Het levert 2.863 commits per jaar. En het jaarbudget is **$25.620** — minder dan één junior ontwikkelaar in West-Europa kost.

Ter vergelijking: één OpenProject Enterprise Premium-contract voor 100 gebruikers levert €15,95 × 100 × 12 = **€19.140 per jaar** op. Eén contract. Het hele open BIM-ecosysteem draait op ongeveer het equivalent van **1,2 zulke deals**.

*(Gecorrigeerd: een eerdere versie zei "anderhalve zulke deal" en vergeleek daarbij dollars rechtstreeks met euro's. $25.620,18 is bij een koers van ~1,09 ongeveer **€23.500**; €23.500 ÷ €19.140 = **1,23**. Zelfs zonder valuta-omrekening kom je op 1,34 — in geen van beide gevallen op anderhalf. Het punt wordt er niet zwakker op: het gaat nog steeds om **één enkel middelgroot softwarecontract** tegenover de financiering van de complete open-source-IFC-infrastructuur.)*

**Conclusie:** donaties financieren *betrokkenheid*, geen *ontwikkeling*. Ze zijn geschikt als aanvulling of als signaal van goodwill, nooit als primaire financieringsbron voor een product dat met commerciële software moet concurreren. Elk plan dat op donaties rekent, moet uitgaan van orde-grootte $10k–50k per jaar — niet meer.

---

## 7. Functionele diepte versus commerciële tools

De vergelijking die er in de bouw toe doet is niet "kan het Kanban" maar "kan het een echte netwerkplanning".

| Capaciteit | MS Project / P6 | ProjectLibre | LibrePlan | GanttProject | OpenProject | Odoo/Plane/Redmine |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| CPM met vroeg/laat-datums | ✅ | ✅ | ✅ | Deels | ❌ | ❌ |
| Kritiek pad + total float | ✅ | ✅ | ✅ | Deels | ❌ | ❌ |
| Kalenders (project/taak/resource) | ✅ | ✅ | ✅ | Basis | ❌ | ❌ |
| Constraint-typen (SNET, FNLT, MSO…) | ✅ | ✅ | Deels | ❌ | ❌ | ❌ |
| Lags/leads incl. negatieve lag | ✅ | ✅ | ✅ | Deels | ❌ | ❌ |
| Resource-nivellering | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Baselines + variance | ✅ | ✅ | ✅ | ❌ | Deels¹ | ❌ |
| Earned Value (EVM) | ✅ | Deels | ✅ | ❌ | ❌ | ❌ |
| **4D-koppeling aan BIM-geometrie** | Via add-on² | ❌ | ❌ | ❌ | ❌³ | ❌ |
| Uitwisseling met P6/MSP | ✅ | ✅ (XML) | Beperkt | Beperkt | ❌ | ❌ |

¹ Community: alleen vergelijking met gisteren; volledige baselines zijn Enterprise ([openproject.org/pricing/#features](https://www.openproject.org/pricing/#features), 25-7-2026).
² Bijv. Synchro (Bentley), Navisworks TimeLiner — aparte, betaalde producten.
³ OpenProject BIM biedt IFC-viewer + BCF, geen 4D-sequencing ([openproject.org/bim-project-management](https://www.openproject.org/bim-project-management/), 25-7-2026).

**Prijsanker aan de commerciële kant** ([microsoft.com](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software), 25-7-2026) — HARD:

- Microsoft Project Standard 2024: **$679,99** eenmalig
- Microsoft Project Professional 2024: **$1.129,99** eenmalig
- Oracle Primavera P6: **geen publieke prijs** ([oracle.com](https://www.oracle.com/construction-engineering/primavera-p6/), 25-7-2026)

De prijsparaplu is dus reëel: ~$680–1.130 per zitplaats voor MS Project. Bij P6 ligt het aanzienlijk hoger, maar Oracle publiceert niets — een informatieasymmetrie die op zichzelf een marktbarrière is.

---

## 8. Adoptie: wat de cijfers wel en niet zeggen

| Project | Beste beschikbare adoptiecijfer | Klasse |
|---|---|---|
| ProjectLibre | 779.618 downloads (13 mnd, SourceForge) | **HARD** |
| ProjectLibre | "7.8M+ downloads", "250K+ community", "1.700+ universities" | HARD-ish |
| ProjectLibre | "10M Active Users" | **MARKETING — intern tegenstrijdig** |
| Odoo | 28 miljoen gebruikers; €282 mln omzet (2023) | HARD-ish / HARD |
| GanttProject | 231 downloads/week via SourceForge (ondergrens) | HARD |
| Redmine | 1.306 plugins in de officiële directory | HARD |
| OpenProject | Geen gepubliceerd installatiecijfer | — |
| Tuleap | Geen gepubliceerd cijfer | — |
| LibrePlan | Geen gepubliceerd cijfer | — |
| IfcOpenShell/Bonsai | 305 financiële contributors; $25,6k jaarbudget | HARD |

**Methodologische waarschuwing.** Downloadtellers zijn de zwakste veelgebruikte metriek in open source. Ze tellen bots, mirrors, CI-pipelines, herinstallaties en verlaten proefinstallaties. Ze zeggen iets over **belangstelling**, nauwelijks iets over **gebruik**, en niets over **betalingsbereidheid**.

De enige echt betrouwbare adoptiesignalen in dit landschap zijn indirect: Odoo's omzet (mensen betalen), Redmine's 1.306 plugins (mensen investeren tijd), en IfcOpenShell's 305 donateurs (mensen geven geld). Alle drie zijn *revealed preference* — gedrag met kosten, niet een klik.

---

## 9. Waarom open source in deze markt marginaal bleef

Dit is de analytische kern. Ik onderscheid zeven mechanismen. **De eerste vier zijn met de verzamelde data onderbouwd; de laatste drie zijn beredeneerde hypotheses die ik zonder analistenbronnen niet hard kon bevestigen — als zodanig gemarkeerd.**

### 9.1 Het bestandsformaat was de markt — en het was gesloten *(onderbouwd)*

In planning is uitwisseling geen feature maar de bestaansvoorwaarde. Een aannemer die met een opdrachtgever werkt, moet `.xer` of `.mpp` kunnen leveren. Zolang die formaten proprietary en ongedocumenteerd waren, was elk open alternatief structureel een **tweederangs importeur**: altijd achterlopend, altijd met verliesposten in de conversie.

Het bewijs zit in MPXJ's bestaan: er was zoveel behoefte aan formaatvertaling dat een aparte bibliotheek met 20+ formaten en maandelijkse releases economisch levensvatbaar werd als vrijwilligersproject. Dat is een **markt die zijn eigen falen documenteert**.

### 9.2 De diepe functionaliteit is saai en duur *(onderbouwd)*

Een CPM-solver die correct omgaat met kalenders, negatieve lags, constraint-conflicten, gesplitste taken en resource-nivellering is **honderden mensmaanden werk zonder enige visuele beloning**. Het is precies het soort werk dat vrijwilligers níet doen: er is geen screenshot die indruk maakt, geen Hacker News-post, geen ster.

De data bevestigen het: de projecten mét CPM (ProjectLibre, LibrePlan, Plan) zijn allemaal ooit **institutioneel gefinancierd** (respectievelijk via Projity's commerciële voorganger, de Galicische innovatiestichting, en KDE). Geen enkele is spontaan uit een community ontstaan.

*(Gecorrigeerd na verificatie: een eerdere versie voegde hieraan toe "en alle drie stagneerden toen de financiering wegviel". Dat geldt aantoonbaar voor ProjectLibre (desktop sinds 30-4-2025 niet vernieuwd) en LibrePlan (elf jaar geen release), maar **niet** voor Plan/KDE, dat in juli 2026 actieve commits kent, inclusief werk aan de schedulerplugin — zie §5.8 en §Verificatie V3. Het patroon "institutionele financiering, daarna stilstand" is dus twee van de drie, niet drie van de drie. Dat verzwakt de generalisatie, en het is bovendien opvallend dat juist het project dat níet van een aflopende projectsubsidie afhing maar van een **permanente vrijwilligersgemeenschap** het langste doorloopt — een aanwijzing die het rapport in §12.2 Risico 1 eigenlijk zou moeten meewegen.)*

Omgekeerd: alles wat wél spontaan uit communities ontstaat — Kanban-borden, issue trackers, tijdlijnen — heeft **geen planningsengine**. Plane (55.026 sterren), Leantime, Vikunja, Worklenz: nul CPM.

### 9.3 Donaties financieren geen productontwikkeling *(onderbouwd)*

Zie §6.1. $25.620 per jaar voor het hele open BIM-ecosysteem. LibrePlan: elf jaar geen release na het wegvallen van de subsidie. Dit is geen anekdote maar een structureel patroon: het donatiemodel levert ongeveer één tot twee ordes van grootte te weinig op voor concurrerende productontwikkeling.

### 9.4 Open core werkt — maar duwt weg van planning *(onderbouwd)*

De commercieel gezonde projecten (OpenProject, Odoo, Plane) verdienen aan **seats, samenwerking en integratie** — niet aan rekenkracht. Hun betalende klant is een organisatie met veel gebruikers, niet een planner met een moeilijk netwerk.

Daaruit volgt logisch dat hun roadmap wegloopt van CPM: een betere solver verkoopt geen extra seats. OpenProject's featurematrix laat dat prachtig zien — Gantt zit in Community (want het is een *checkbox* die je nodig hebt om mee te dingen), maar SSO zit in Enterprise (want dát is wat een organisatie doet betalen). Planningsdiepte verschijnt in geen van beide kolommen, omdat het in dit verdienmodel geen omzet genereert.

### 9.5 Certificering en aansprakelijkheid *(hypothese — niet bevestigd)*

In infrastructuur- en overheidsprojecten worden planningen contractueel afgedwongen: claims, vertragingsanalyses en boeteclausules steunen op het planningsbestand. Mijn hypothese is dat opdrachtgevers daarom een **aansprakelijke leverancier** eisen, wat een vrijwilligersproject per definitie uitsluit.

*Ik heb dit niet kunnen bevestigen.* Ik kon geen aanbestedingsdocumenten of contractspecificaties ophalen (geen zoekmachine beschikbaar; zie §2.2). De redenering is plausibel en sluit aan bij Oracle's keuze om P6-prijzen niet te publiceren (typisch voor relatiegedreven enterprise-verkoop), maar dat is indirect bewijs.

### 9.6 Netwerkeffecten via opleiding en arbeidsmarkt *(hypothese — niet bevestigd)*

Planners worden opgeleid in P6 en MS Project; vacatures vragen erom; certificeringen bestaan ervoor. Dat creëert een zelfversterkende cyclus die technisch superieure alternatieven niet doorbreken.

*Indirect signaal:* ProjectLibre claimt gebruik op "1.700+ universities" ([SourceForge](https://sourceforge.net/projects/projectlibre/), 25-7-2026). Als dat klopt, is er onderwijspenetratie zonder navenante professionele adoptie — wat de hypothese ondersteunt dat de barrière **niet bij het aanleren** ligt maar bij de professionele omgeving. Ik kon geen arbeidsmarktdata ophalen om dit te toetsen.

### 9.7 Fragmentatie en het ontbreken van een schelpunt *(deels onderbouwd)*

Er zijn tientallen open-source planningsprojecten, geen enkele met kritieke massa. De activiteitstabel in §4 laat een lange staart zien waarin geen enkele desktop-planner boven 250 commits/jaar komt. Vergelijk met de webwereld, waar één project (OpenProject) 15.205 commits haalt.

Verzwarend: Tuleap ontbreekt volledig op GitHub (§5.5) en Taiga heeft zijn eigen rewrite laten stranden (§4). De ontdekbaarheid en het vertrouwen die uit een geconcentreerd ecosysteem voortkomen, ontbreken hier.

---

## 10. Het 4D/IFC-deelsegment specifiek

Dit is het segment dat er voor de opdrachtgever werkelijk toe doet, en het verdient een aparte behandeling omdat de conclusie tegengesteld is aan de rest van het rapport.

### 10.1 De normatieve basis is nu open

**IFC is een officiële internationale norm: ISO 16739-1:2024.** Dit is bij verificatie **primair bevestigd** via een onafhankelijke normendistributeur (EVS, het Estse normalisatie-instituut): designatie `ISO 16739-1:2024`, titel *"Industry Foundation Classes (IFC) for data sharing in the construction and facility management industries — Part 1: Data schema"*, **publicatiedatum 22-3-2024** ([evs.ee](https://www.evs.ee/en/iso-16739-1-2024), 25-7-2026). De scope noemt expliciet de toevoeging van *"information required for infrastructure facilities including bridges, roads, railways, waterways and port facilities"* — dat is precies wat IFC 4.3 kenmerkt. De meest recente formele specificatie is **IFC4.3 Add2 (2024)**.

> **Belangrijke correctie op de normhistorie.** Een eerdere versie van dit rapport suggereerde dat de ISO-status van IFC nieuw is en dat dáármee de barrière uit §9.1 wegvalt. Dat klopt niet. De normreeks loopt aantoonbaar veel verder terug:
>
> | Norm | Gepubliceerd | Status |
> |---|---|---|
> | **ISO 16739:2013** | 21-3-2013 | Ingetrokken 11-1-2019 ([evs.ee](https://www.evs.ee/en/iso-16739-2013)) |
> | **ISO 16739-1:2018** | 23-11-2018 | Ingetrokken 22-3-2024 ([evs.ee](https://www.evs.ee/en/iso-16739-1-2018)) |
> | **ISO 16739-1:2024** | 22-3-2024 | Geldig ([evs.ee](https://www.evs.ee/en/iso-16739-1-2024)) |
>
> IFC is dus al **sinds maart 2013** een volwaardige ISO-norm, niet sinds 2024. Wat 2024 toevoegt is infrastructuurdekking, niet de openheid zelf.

Belangrijker: IFC 4.3 bevat een **volwaardig planningsdatamodel**. De officiële documentatie definieert:

> *"An IfcWorkSchedule represents a task schedule of a work plan, which in turn can contain a set of schedules for different purposes."*
> — [ifc43-docs.standards.buildingsmart.org/IfcWorkSchedule](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm), 25-7-2026

Het model omvat `IfcWorkSchedule` (met `CreationDate`, `Creators`, `Purpose`, `Duration`, `TotalFloat`, `StartTime`, `FinishTime`, `PredefinedType`), gekoppeld aan taken via `IfcRelAssignsToControl`, met nesting via `IfcRelAggregates`/`IfcRelNests`. Beide citaten in deze paragraaf zijn woordelijk geverifieerd tegen de officiële documentatie. Een detail dat implementeerders vaak missen en dat de documentatie expliciet maakt: *"Please note that a work calendar shall be assigned to the summary task and not the work schedule"* — de kalender hangt aan de summary task, niet aan het schema.

> **Correctie: het planningsdatamodel is níet nieuw in IFC 4.3.** De entiteitspagina's van buildingSMART geven de introductieversie letterlijk:
> - `IfcWorkSchedule` — *"HISTORY New entity in IFC2.0."* (met `PredefinedType` toegevoegd in IFC4)
> - `IfcWorkCalendar` — *"HISTORY New entity in IFC4."*
>
> Het scheduling-datamodel bestaat dus al sinds IFC2.0 (schema) respectievelijk IFC4 (kalenders), en is **sinds ISO 16739:2013 genormaliseerd**. IFC 4.3 verfijnt het, maar introduceert het niet.

**Wat dit betekent voor de these van §9.1 — herzien.** De oorspronkelijke formulering ("voor het eerst in de geschiedenis van dit marktsegment is het uitwisselformaat voor planning een open ISO-norm") is **feitelijk onjuist** en is hier vervangen. Een open, ISO-genormaliseerd planningsdatamodel bestaat al ruim tien jaar. Dat dwingt tot een eerlijker en preciezer argument:

- Het is **niet** zo dat de barrière uit §9.1 in 2024 wegviel. Als de enkele beschikbaarheid van een open norm voldoende was geweest, was het gat tussen 2013 en 2026 gevuld — en dat is niet gebeurd.
- Wat er *wél* veranderd is, is niet de norm maar het **ecosysteem eromheen**: een volwassen open implementatie (IfcOpenShell, 2.863 commits/jaar), infrastructuurdekking in 4.3, en breed groeiende IFC-eisen bij opdrachtgevers.
- Voor de opdrachtgever is dat een **zwakker maar betrouwbaarder** fundament dan het oorspronkelijke rapport suggereerde: IFC-native persistentie is verdedigbaar op grond van toolketen en opdrachtgeverseisen, **niet** op grond van "de norm is eindelijk open". Dat laatste argument valt niet te verdedigen tegenover een goed geïnformeerde criticus, en het is beter het nu te laten vallen dan het in een investeringsgesprek te verliezen.

### 10.2 Wat er al bestaat — en wat niet

| Speler | Wat het doet | Wat het níet doet |
|---|---|---|
| **IfcOpenShell `ifc4d`** | Converteert IFC ↔ MS Project XML, P6 XML/XER, Asta Powerproject (import); exporteert naar P6 XML en MS Project | Is een **conversielaag**, geen planningsapplicatie; geen UI, geen CPM-berekening |
| **Bonsai (ex-BlenderBIM)** | Blender-addon voor IFC-authoring; noemt "Costing and scheduling" en "4D BIM visualization" | Documentatie draagt **"🚧 Work in Progress - This page is incomplete"**; geen zelfstandige planner; vereist Blender-kennis |
| **OpenProject BIM** | IFC-viewer in browser + BCF-issuebeheer, €6,95 p/member/maand | **Geen 4D**, geen koppeling model↔planning, geen CPM |
| **Synchro / Navisworks TimeLiner** | Volwaardige 4D | Proprietary, duur, vereist bestaande P6/MSP-planning als input |

Bronnen: [IfcOpenShell/src/ifc4d](https://github.com/IfcOpenShell/IfcOpenShell/tree/v0.8.0/src/ifc4d), [docs.bonsaibim.org](https://docs.bonsaibim.org/guides/costing_and_scheduling/index.html), [openproject.org/bim-project-management](https://www.openproject.org/bim-project-management/) — alle 25-7-2026.

### 10.3 De conclusie voor dit segment

**Er is geen open-source, IFC-native planningsapplicatie met een echte CPM-engine.** Dat is geen bewering over een verwaarloosde niche; het is een vaststelling na inspectie van elk relevant project in dit landschap.

De bestaande stukken liggen er wel:
- de **norm** (IFC 4.3 / ISO 16739-1:2024, met een compleet scheduling-datamodel);
- de **conversielaag** (IfcOpenShell `ifc4d`, MPXJ);
- de **geometrie** (IfcOpenShell, web-ifc);
- de **coördinatie** (OpenProject BIM, BCF).

Wat ontbreekt is het middenstuk: **een planner die IFC als eigen bestandsformaat behandelt en er een correcte netwerkplanning op uitvoert**. Dat is precies de positie van Open Planner Studio.

---

## 11. Expliciete onzekerheden

Ik som ze op zodat de lezer weet waar dit rapport dun is.

1. **Geen analistenbronnen.** Gartner, Forrester en IDC-materiaal ontbreekt volledig (zoekbudget uitgeput, §2.2). Elke uitspraak over marktaandeel in dit rapport is afgeleid, niet gemeten.
2. **Geen aanbestedingsdocumenten.** De hypothese dat contracten P6/MSP voorschrijven (§9.5) is onbevestigd. Dit is potentieel de belangrijkste barrière voor Open Planner Studio en verdient gericht vervolgonderzoek.
3. ~~**ISO 16739-1:2024 via secundaire bron.**~~ **OPGELOST.** iso.org blijft 403, maar de norm is bevestigd via de onafhankelijke normendistributeur EVS: ISO 16739-1:2024, gepubliceerd 22-3-2024, inclusief de voorgangers ISO 16739:2013 en ISO 16739-1:2018. Dit bracht tegelijk een **inhoudelijke fout** aan het licht (§10.1): IFC is al sinds 2013 ISO-genormaliseerd, niet sinds 2024.
4. ~~**Status van Plan (KDE) onvaststelbaar.**~~ **OPGELOST — en het vermoeden was fout.** Via de KDE GitLab-API zijn commits van 7, 13, 14 en 22 juli 2026 vastgesteld, inclusief werk aan de TaskJuggler-schedulerplugin. Plan wordt actief onderhouden (§5.8).
5. **Tuleap grotendeels ondoorzichtig.** Geen publieke prijzen, geen GitHub-bronrepo, geen releasecadans vastgesteld. Alle vier de release-notes-URL's die ik probeerde gaven 404. De Tuleap-analyse in §5.5 is daardoor de zwakst onderbouwde in dit rapport.
6. **Odoo-medewerkersaantal inconsistent.** 2.200 (2023, Wikipedia) versus "8.000+" (2026, eigen site). Definitieverschil waarschijnlijk; niet opgelost.
7. **Commit-tellingen zijn ongefilterd.** Inclusief merges, vertalingen, dependency-bumps. Bruikbaar als orde van grootte, niet als productiviteitsmaat.
8. **Downloadcijfers meten geen gebruik.** Behandel alle downloadgetallen in §8 als belangstellingsindicatoren.
9. **Enkele leverancierspagina's leverden geen inhoud** door JavaScript-rendering (GanttProject about/download, OpenProject about-us, ProjectLibre pricing). Waar dat het geval was, heb ik het expliciet vermeld in plaats van het gat op te vullen.

---

## 12. Betekenis voor een open-source, IFC-gebaseerde planner (Open Planner Studio)

Open Planner Studio positioneert zich exact op het snijvlak dat dit onderzoek als leeg heeft geïdentificeerd: **echte CPM-diepte** (de LibrePlan/ProjectLibre-kant) gecombineerd met **IFC als native formaat** (de IfcOpenShell/buildingSMART-kant), in een moderne, onderhoudbare stack. Hieronder wat de data concreet betekenen voor die keuze.

### 12.1 Vijf dingen die het onderzoek bevestigt

**1. De positie is werkelijk onbezet.** Geen enkel project in dit landschap combineert CPM met IFC-native opslag. OpenProject BIM heeft IFC zonder planning; ProjectLibre en LibrePlan hebben planning zonder IFC; IfcOpenShell `ifc4d` heeft conversie zonder applicatie; Bonsai heeft ambitie met onvoltooide documentatie. Dat is een zeldzaam schoon wit vlak.

**2. IFC-als-bestandsformaat is een verdedigbare gok — maar niet om de reden die hier eerst stond.** *(Herzien na verificatie; zie §10.1 en §Verificatie V2.)* De oorspronkelijke redenering luidde: §9.1 wees het gesloten uitwisselformaat aan als hoofdoorzaak van het falen, en ISO 16739-1:2024 "verwijdert die barrière". Die redenering houdt geen stand. IFC is al ISO-norm sinds **ISO 16739:2013**, en `IfcWorkSchedule` bestaat sinds **IFC2.0**, `IfcWorkCalendar` sinds **IFC4**. De open norm was er dus ruimschoots vóór 2024, en er is in die dertien jaar géén open-source IFC-native planner ontstaan.

Dat is een **ongemakkelijk maar belangrijk signaal**: de beschikbaarheid van een open norm is aantoonbaar *niet voldoende* om dit gat te vullen. Wie de positie wil claimen, moet uitleggen wat er nú anders is. De eerlijke antwoorden zijn: (a) een volwassen open IFC-implementatie die er in 2013 nog niet was (IfcOpenShell, 2.863 commits/jaar), (b) infrastructuurdekking in 4.3 die de norm pas bruikbaar maakt voor GWW-planning, en (c) IFC-eisen die inmiddels door opdrachtgevers worden gesteld in plaats van door leveranciers aangeboden. Die drie zijn te onderbouwen; "de norm is eindelijk open" niet. **De architectuurkeuze zelf — IFC als native persistentie, geen JSON-formaat ernaast — blijft verdedigbaar; alleen de rechtvaardiging ervoor moet anders geformuleerd.**

**3. De vraag is aantoonbaar aanwezig.** ProjectLibre's 779.618 downloads in dertien maanden bewijzen dat er honderdduizenden mensen per jaar actief zoeken naar een gratis MS Project-vervanger. Dat is geen speculatieve markt.

**4. Correctheid is het enige verdedigbare fundament — en die is meetbaar.** Het lokale project heeft `tests/planning/` met 21 casebatterijen (kalenders, constraints, float, lags, milestones, resource-leveling, IFC-roundtrip, progress, baselines). Dit onderzoek verklaart waarom dat de juiste investering is: elk concurrerend open-source project faalde óf op planningsdiepte óf op continuïteit. Een geverifieerd correcte solver is het enige dat je niet met marketing kunt namaken, en het is precies het werk dat vrijwilligersprojecten overslaan (§9.2).

**5. Bibliotheken overleven applicaties.** MPXJ's succes (§5.9) tegenover LibrePlan's elf jaar stilte (§5.7) suggereert een concrete strategie: **zorg dat de waardevolle kern als herbruikbare component kan overleven, zelfs als de applicatie stagneert.** Voor Open Planner Studio betekent dat: de CPM/kalender-engine (`src/engine/scheduler/`) en de IFC-lezer/schrijver (`src/services/ifc/`) zo scheiden van de UI dat ze zelfstandig waarde houden. De architectuur — engine en services los van de Canvas-renderer en React-chrome — ondersteunt dit al; het is de moeite waard dat expliciet te bewaken.

### 12.2 Vier risico's die het onderzoek blootlegt

**Risico 1: het LibrePlan-scenario.** LibrePlan had planningsdiepte, een open licentie en institutionele startfinanciering — en verloor elf jaar. **Functionele kwaliteit beschermt niet tegen stilvallen.** Het enige dat beschermt is een structuur die onderhoud volhoudt als de initiële motivatie afneemt.

*Concrete implicatie:* beslis vroeg wat het continuïteitsmodel is. De data zeggen: donaties zijn het niet ($25,6k/jaar voor het hele open BIM-ecosysteem, §6.1). Open core werkt aantoonbaar (Odoo, OpenProject) — maar §9.4 waarschuwt dat het de roadmap weg van planningsdiepte trekt. Een derde route, gegeven de bouwsector: **betaalde dienstverlening rond een volledig vrije applicatie** (implementatie, IFC-mapping voor specifieke opdrachtgevers, koppelingen naar P6/MSP-workflows). Dat houdt het product eerlijk vrij en financiert het onderhoud met werk dat inhoudelijk bijdraagt.

**Risico 2: interoperabiliteit is nog steeds een toegangseis.** Ook al is IFC nu open, de bestaande keten draait op P6 en MS Project. Een planner die geen `.xer` of MSPDI kan uitwisselen, valt buiten elke aannemersketen — ongeacht hoe goed de IFC-ondersteuning is.

*Concrete implicatie:* de aanwezigheid van `src/services/p6/` en `src/services/msproject/` naast `src/services/ifc/` is geen bijzaak maar een toegangsvoorwaarde. Overweeg expliciet of MPXJ (LGPL-2.1, 20+ formaten, maandelijkse releases) als referentie of als component kan dienen — het is de enige plek in dit hele landschap waar formaatkennis is geconcentreerd, en zelf 20 formaten reverse-engineeren is geen verstandige besteding van schaarse tijd.

**Risico 3: de bewijslast bij open source is hoger.** §9.5 (onbevestigd maar plausibel): in claim- en boetegevoelige projecten wil de opdrachtgever een aansprakelijke partij. Een open-source planner moet dat compenseren met **verifieerbaarheid**: reproduceerbare berekeningen, gedocumenteerde afwijkingen ten opzichte van P6/MSP-semantiek, en een testsuite die publiek aantoonbaar maakt dat de solver correct is. De bestaande `tests/planning/`-suite is hiervoor niet alleen een ontwikkelinstrument maar potentieel een **verkoopargument** — publiceer de resultaten.

**Risico 4: corporate stewardship en bus-factor.** Focalboard (26.317 sterren, stilletjes afgestoten naar `mattermost-community`) en LibrePlan (bus-factor 1) illustreren de twee faalwijzen. Voor een project onder een stichtingsstructuur zoals OpenAEC-Foundation is de eerste minder relevant, de tweede zeer.

### 12.3 Waar de differentiatie zit

Gegeven het landschap zijn dit de assen waarop Open Planner Studio zich onderscheidt, gerangschikt naar verdedigbaarheid:

| As | Verdedigbaarheid | Waarom |
|---|---|---|
| **IFC-native persistentie** | **Hoog** | Niemand doet dit; ISO-verankerd; niet na te bootsen zonder architecturale herbouw |
| **Geverifieerde CPM-correctheid** | **Hoog** | Duur, saai, meetbaar — precies wat concurrenten overslaan |
| **4D-koppeling model ↔ planning** | **Hoog** | Het gat dat OpenProject BIM en Bonsai allebei openlaten |
| Meertaligheid (14 locales, incl. RTL) | Middel | Bouw is internationaal; ProjectLibre's bereik in 193 landen bewijst de vraag; wél kopieerbaar |
| Desktop + browser vanuit één codebase | Middel | Verlaagt de drempel enorm (geen installatie), maar technisch navolgbaar |
| Extensiesysteem | Middel | Redmine's 1.306 plugins bewijzen dat dit ecosystemen draagt — maar pas ná kritieke massa |

### 12.4 De ene zin die het onderzoek samenvat

*Open source faalde in planningssoftware omdat het uitwisselformaat gesloten was en de diepe functionaliteit duur en onzichtbaar; IFC 4.3 heeft het eerste probleem opgelost, en het tweede is precies het probleem waarvoor een klein, gedisciplineerd, testgedreven project het beste gereedschap is dat er bestaat.*

---

## Bronnenoverzicht

Alle bronnen opgehaald op **25 juli 2026**.

**Repository-telemetrie (GitHub API)**
- https://api.github.com/repos/opf/openproject (+ `/stats/participation`)
- https://api.github.com/repos/LibrePlan/libreplan (+ `/stats/participation`)
- https://api.github.com/repos/joniles/mpxj (+ `/stats/participation`)
- https://api.github.com/repos/redmine/redmine (+ `/stats/participation`)
- https://api.github.com/repos/makeplane/plane (+ `/stats/participation`)
- https://api.github.com/repos/IfcOpenShell/IfcOpenShell (+ `/stats/participation`)
- https://api.github.com/repos/kanboard/kanboard
- https://api.github.com/repos/Leantime/leantime
- https://api.github.com/repos/odoo/odoo
- https://api.github.com/repos/mattermost-community/focalboard
- https://api.github.com/search/repositories?q=taiga+in:name+org:kaleidos-ventures

**Releasefeeds**
- https://github.com/bardsoftware/ganttproject/releases.atom
- https://github.com/opf/openproject/releases.atom
- https://github.com/LibrePlan/libreplan/releases.atom
- https://github.com/joniles/mpxj/releases.atom
- https://github.com/kaleidos-ventures/taiga/releases.atom (leeg)
- https://github.com/taigaio/taiga-back/commits/main.atom

**Prijs- en productpagina's**
- https://www.openproject.org/pricing/ · https://www.openproject.org/pricing/#features
- https://www.openproject.org/bim-project-management/
- https://www.odoo.com/pricing · https://www.odoo.com/app/project · https://www.odoo.com/page/about-us
- https://taiga.io/deployment-pricing-options/
- https://plane.so/pricing
- https://vikunja.io/pricing
- https://www.ganttproject.biz/
- https://www.tuleap.com/ · https://www.tuleap.com/start-now/
- https://www.projectlibre.com/ · https://www.projectlibre.com/product/projectlibre-cloud/
- https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software
- https://www.oracle.com/construction-engineering/primavera-p6/

**Downloadstatistieken**
- https://sourceforge.net/projects/projectlibre/
- https://sourceforge.net/projects/projectlibre/files/stats/timeline?dates=2025-07-01+to+2026-07-25
- https://sourceforge.net/projects/ganttproject/

**Financiën**
- https://opencollective.com/opensourcebim
- https://en.wikipedia.org/wiki/Odoo

**Normen en IFC**
- https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm
- https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkCalendar.htm *(toegevoegd bij verificatie — HISTORY-notitie)*
- https://www.evs.ee/en/iso-16739-1-2024 *(toegevoegd bij verificatie — vervangt iso.org, dat 403 geeft)*
- https://www.evs.ee/en/iso-16739-1-2018 *(toegevoegd bij verificatie)*
- https://www.evs.ee/en/iso-16739-2013 *(toegevoegd bij verificatie)*
- https://en.wikipedia.org/wiki/Industry_Foundation_Classes
- https://github.com/IfcOpenShell/IfcOpenShell/tree/v0.8.0/src/ifc4d
- https://docs.bonsaibim.org/ · https://docs.bonsaibim.org/guides/costing_and_scheduling/index.html
- https://bonsaibim.org/

**Projectdocumentatie**
- https://www.redmine.org/projects/redmine/wiki/Download · .../Features · https://www.redmine.org/plugins?page=20
- https://www.mpxj.org/ · https://central.sonatype.com/artifact/net.sf.mpxj/mpxj
- https://www.libreplan.dev/ · https://github.com/LibrePlan/libreplan
- https://invent.kde.org/office/calligraplan
- https://www.projeqtor.com/en/
- https://github.com/go-vikunja/vikunja · https://github.com/Worklenz/worklenz
- https://en.wikipedia.org/wiki/ProjectLibre · https://en.wikipedia.org/wiki/Comparison_of_project_management_software
- https://github.com/OpenAEC-Foundation/open-planner-studio

**Niet-toegankelijke bronnen (transparantiehalve vermeld)**
- https://www.iso.org/standard/84123.html — HTTP 403
- https://technical.buildingsmart.org/standards/ifc/ — HTTP 403
- https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/ — HTTP 403
- https://github.com/Enalean/tuleap — HTTP 404 (bestaat niet)
- https://ganttproject.cloud/pricing — HTTP 404
- https://www.projectlibre.com/pricing/ — HTTP 404
- https://apps.kde.org/plan/ — HTTP 404 *(let op: dit is géén bewijs dat het project dood is — zie §Verificatie V3, waar via de KDE GitLab-API actieve ontwikkeling in juli 2026 is vastgesteld)*
- Tuleap release notes (4 URL-varianten geprobeerd) — alle HTTP 404

---

## Verificatie

**Adversariële fact-check, uitgevoerd 25-7-2026.** Opzet: van de 12 belangrijkste falsifieerbare beweringen is actief geprobeerd ze te **weerleggen** met onafhankelijke bronnen — normteksten in plaats van samenvattingen, prijspagina's in plaats van tabellen, en eigen herberekening van elke doorgerekende schatting. Waar de bewering standhield staat *bevestigd*; waar ze sneuvelde is de tekst hierboven **direct aangepast** en staat hier *gecorrigeerd*.

Beperking van deze controle: het WebSearch-budget van de sessie was ook nu uitgeput (200/200), dus verificatie verliep via gerichte fetches op bekende URL's. Zoekmachine-afhankelijke claims (§9.5 aanbestedingen, §9.6 arbeidsmarkt, analistencijfers) blijven daardoor **ongetoetst** — precies zoals het rapport zelf al aangaf.

### Gecorrigeerd (5)

| # | Bewering (oorspronkelijk) | Oordeel | Bevinding | Bron |
|---|---|---|---|---|
| **V1** | LibrePlan had "slechts **6** commits in het laatste kwartaal" (§1, §4 ×2, §5.7) | **Gecorrigeerd** | Leesfout. De 6 is één weekwaarde. De laatste 13 weken van `all` zijn `[20,11,2,2,0,0,6,0,0,0,0,0,0]` = **41**. Jaartotaal is 159, niet 158. Het rapport weersprak zichzelf: het juiste getal was af te leiden uit het weekprofiel dat het zelf citeerde. Narratief blijft overeind — de laatste **zes weken staan op nul**, wat een scherper fragiliteitssignaal is dan de foute 6. | [api.github.com/repos/LibrePlan/libreplan/stats/participation](https://api.github.com/repos/LibrePlan/libreplan/stats/participation) |
| **V2** | "**Voor het eerst** in de geschiedenis van dit marktsegment is het uitwisselformaat voor planning een open ISO-norm" (§10.1), en daarop gebouwd: "IFC 4.3 verwijdert die barrière" (§12.1 punt 2) | **Gecorrigeerd — meest ingrijpend** | Feitelijk onjuist, en het draagt de strategische kern van het rapport. IFC is ISO sinds **ISO 16739:2013** (21-3-2013), daarna 16739-1:2018 (23-11-2018), daarna 16739-1:2024 (22-3-2024). Het planningsmodel is nóg ouder: `IfcWorkSchedule` is *"HISTORY New entity in **IFC2.0**"*, `IfcWorkCalendar` *"New entity in **IFC4**"*. Er was dus ruim tien jaar een open, ISO-genormaliseerd planningsdatamodel — en er ontstond in die periode géén open-source IFC-native planner. Dat weerlegt de causale claim: openheid van de norm was aantoonbaar niet de bindende beperking. §10.1 en §12.1 zijn herschreven naar een zwakker maar houdbaar argument (toolketen + opdrachtgeverseisen, niet normstatus). | [evs.ee/iso-16739-2013](https://www.evs.ee/en/iso-16739-2013) · [evs.ee/iso-16739-1-2018](https://www.evs.ee/en/iso-16739-1-2018) · [IfcWorkSchedule](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkSchedule.htm) · [IfcWorkCalendar](https://ifc43-docs.standards.buildingsmart.org/IFC/RELEASE/IFC4x3/HTML/lexical/IfcWorkCalendar.htm) |
| **V3** | Plan (KDE) is vermoedelijk niet meer als zelfstandige applicatie gepromoot / status onvaststelbaar (§5.8, §11 punt 4) | **Gecorrigeerd** | Weerlegd. De KDE GitLab-API toont commits op **22-7-2026**, **14-7-2026** (twee, waaronder *"reactivate tjscheduler plugin on Windows"* en een fix aan `TaskJugglerTester`), **13-7-2026** en 7-7-2026. Er wordt actief aan het **schedulergedeelte** gewerkt. De HTTP 404 op `apps.kde.org/plan/` was een verhuisde pagina, geen doodverklaring — een goede illustratie van waarom een 404 nooit als negatief bewijs mag gelden. | [invent.kde.org API — commits](https://invent.kde.org/api/v4/projects/office%2Fcalligraplan/repository/commits?per_page=5) |
| **V4** | "$25.620 jaarbudget ≈ **anderhalve** OpenProject-deal van €19.140" (§6.1) | **Gecorrigeerd (rekenfout + valutamix)** | €15,95 × 100 × 12 = €19.140 klopt. De verhouding niet: het rapport deelde **dollars door euro's** zonder omrekening. $25.620,18 ≈ **€23.500** (koers ~1,09); €23.500 ÷ €19.140 = **1,23**. Zelfs ongecorrigeerd is het 1,34 — nooit 1,5. Retorisch punt blijft geldig, getal is aangepast naar 1,2. | [opencollective.com/opensourcebim](https://opencollective.com/opensourcebim) · [openproject.org/pricing](https://www.openproject.org/pricing/) |
| **V5** | Diverse kleinere onnauwkeurigheden | **Gecorrigeerd** | (a) "**780.000 downloads per jaar**" — de 779.618 beslaan 12,8 maanden, dus ~**731.000**/jaar (7% te hoog). (b) GanttProject "release-interval **8–18 maanden**" — de eigen tabel geeft **4,5 tot 22** maanden. (c) MPXJ-releasetabel toonde 9 releases terwijl de tekst er tien claimde; **v16.1.0 (4-4-2026)** ontbrak — tekst had gelijk. (d) Redmine 5.1.13 staat als **unsupported**, niet "onderhouden" (drie ondersteunde lijnen, niet vier). (e) MPXJ ondersteunt ook **PHP**. (f) OpenProject's Revit-integratie is *"to come soon"*, nog niet geleverd. | [mpxj releases.atom](https://github.com/joniles/mpxj/releases.atom) · [redmine.org Download](https://www.redmine.org/projects/redmine/wiki/Download) · [mpxj.org](https://www.mpxj.org/) · [openproject.org/bim-project-management](https://www.openproject.org/bim-project-management/) |

### Bevestigd (7)

| # | Bewering | Oordeel | Verificatie | Bron |
|---|---|---|---|---|
| **V6** | LibrePlan's elfjarige gat: 1.4.1 op 15-4-2015 → 1.6.0 op 12-5-2026 → 1.6.1 op 11-6-2026 | **Bevestigd** | Exact. Alle drie de datums en de tussenliggende releases (1.4.0 29-4-2013, 1.3.3 21-12-2012) komen letterlijk overeen. Dit is de best onderbouwde bewering in het rapport. | [releases.atom](https://github.com/LibrePlan/libreplan/releases.atom) |
| **V7** | OpenProject-prijzen €5,95 / €10,95 / €15,95, minima 25/25/100, Corporate 250, BIM +€1,00, per naam in stappen van 5; BIM-editie €6,95 p/member/m, jaarlijks, min. 5; **geen 4D** | **Bevestigd** | Elk bedrag en elk minimum exact. De BIM-pagina noemt inderdaad nergens 4D-scheduling of koppeling IFC↔taak; genoemde functies zijn 3D-viewer, BCF, taken, Gantt, kosten. Ook de baseline-quote is **woordelijk** juist: *"Set a project baseline and compare changes with yesterday. The full baseline feature… is part of the Enterprise version."* | [pricing](https://www.openproject.org/pricing/) · [pricing/#features](https://www.openproject.org/pricing/#features) · [bim-project-management](https://www.openproject.org/bim-project-management/) |
| **V8** | Odoo-prijzen $0 / $24,90 ($31,10) / $49,00 ($61,00); MS Project Standard 2024 **$679,99**, Professional 2024 **$1.129,99**; Plane free ≤12 / $6 / $13; Vikunja €4–5 | **Bevestigd** | Alle prijspunten exact zoals gepubliceerd. Ik heb hier specifiek geprobeerd te weerleggen (Odoo's "Custom"-tier wordt elders vaak als $37,40 genoemd) — de actuele pagina bevestigt $49,00/$61,00. | [odoo.com/pricing](https://www.odoo.com/pricing) · [microsoft.com](https://www.microsoft.com/en-us/microsoft-365/project/compare-microsoft-project-management-software) · [plane.so/pricing](https://plane.so/pricing) · [vikunja.io/pricing](https://vikunja.io/pricing) |
| **V9** | IfcOpenShell/Bonsai: $92.887,21 opgehaald, $69.711,97 uitbetaald, $23.175,24 saldo, **$25.620,18** jaarbudget, 305 contributors | **Bevestigd** | Alle vijf bedragen exact. Interne consistentie nagerekend: 92.887,21 − 69.711,97 = **23.175,24** ✓. Dit is publieke boekhouding en verdient de HARD-classificatie die het rapport geeft. | [opencollective.com/opensourcebim](https://opencollective.com/opensourcebim) |
| **V10** | Redmine 7.0.0 op 30-6-2026; **1.306 plugins** over 131 pagina's | **Bevestigd** | Beide exact. De paginering toont letterlijk `(1301-1306/1306)` op pagina 131 — het rapport citeerde pagina 20 en kwam toch op het juiste totaal. | [redmine.org Download](https://www.redmine.org/projects/redmine/wiki/Download) · [redmine.org/plugins?page=131](https://www.redmine.org/plugins?page=131) |
| **V11** | `Enalean/tuleap` bestaat niet op GitHub; Taiga-splitsing (rewrite bevroren 13-12-2023, `taiga-back` actief) | **Bevestigd** | Gerichte org-brede zoekopdracht op `user:Enalean` levert 30 randrepo's (docker, documentatie, VS Code-extensie) en **geen bronrepo**. `kaleidos-ventures/taiga`: laatste push 13-12-2023, 564 sterren. `taigaio/taiga-back`: commits t/m **22-7-2026**. De interpretatie "gestrande rewrite, teruggevallen op oude codebase" houdt stand. | GitHub-zoekopdracht `user:Enalean` · [taiga-back commits](https://github.com/taigaio/taiga-back/commits/main.atom) |
| **V12** | ProjectLibre: CPAL-1.0, 19.762 downloads/week, "7,8M+ in 193 countries", "250K+ community", laatste update 30-4-2025; en de tegenstrijdige claim **"10M Active Users"** naast "8,2M+ downloads" | **Bevestigd** | Alles exact, inclusief de tegenstrijdigheid — die is géén verkeerde weergave. `projectlibre.com` toont woordelijk *"Downloaded Over 8,200,000"*, *"Trusted by 8.2 M+ users"*, *"10M Active Users"*, *"193 COUNTRIES"* én *"200+ Countries"* op dezelfde pagina. De MARKETING-classificatie is terecht. De SourceForge-teller stond bij hercontrole op **780.201** voor hetzelfde bereik (779.618 in het rapport) — normale aangroei binnen dezelfde dag. | [sourceforge.net/projects/projectlibre](https://sourceforge.net/projects/projectlibre/) · [projectlibre.com](https://www.projectlibre.com/) |

### Onzeker (3)

| # | Bewering | Oordeel | Waarom |
|---|---|---|---|
| **V13** | ProjectLibre heeft **100.000–250.000** actieve gebruikers (§5.1, SCHATTING) | **Onzeker — niet toetsbaar** | De rekensom is intern consistent, maar rust volledig op twee **ongefundeerde parameters**: "1–2 downloads per actieve gebruiker per jaar" en "15–30% conversie naar terugkerend gebruik". Beide zijn nergens onderbouwd en de uitkomst is er hoog gevoelig voor — bij 5% conversie kom je op ~35.000, bij 50% op ~400.000. Dat is meer dan een orde van grootte spreiding. Het rapport markeert dit terecht als schatting met hoge onzekerheid; ik kan het noch bevestigen noch weerleggen en adviseer het **niet** als getal te gebruiken. |
| **V14** | Odoo "**28 miljoen** gebruikers" en "**8.000+**" medewerkers | **Onzeker** | Zelfrapportage zonder verificatiemogelijkheid; niet onafhankelijk getoetst. De Wikipedia-cijfers die het rapport wél citeert (€282 mln omzet 2023 +33%, $5,26 mrd waardering nov 2024, $500 mln secondary met CapitalG/Sequoia/BlackRock, $90 mln in 2019, 2.200+ medewerkers 2023) zijn **correct weergegeven** — maar Wikipedia blijft een secundaire bron, dus dit is bevestigde *citatie*, geen bevestigd *feit*. Het rapport signaleert de sprong 2.200 → 8.000+ zelf en behandelt haar terecht als HARD-ish. |
| **V15** | §9.5 (aansprakelijkheid/aanbestedingen) en §9.6 (opleiding/arbeidsmarkt) | **Onzeker — ongetoetst** | Het rapport markeert beide zelf als onbevestigde hypotheses; die eerlijkheid is correct en wordt hier bevestigd, niet opgelost. Met uitgeput zoekbudget kon ik geen aanbestedingsteksten of arbeidsmarktdata ophalen. **Aanbeveling:** dit is de grootste resterende blinde vlek. Omdat §9.5 in §12.2 tot "Risico 3" wordt gepromoveerd, hangt een concrete productaanbeveling aan een niet-geverifieerde aanname. Toets dit gericht voordat er beslissingen op worden gebouwd. |

### Wat deze controle betekent voor het vertrouwen in het rapport

**Vertrouwen: middel-hoog, met één belangrijke uitzondering.**

Het meetbare deel is opvallend degelijk. Alle prijzen, alle licenties, alle releasedatums, de complete Open Collective-boekhouding, de plugintelling en de normteksten kwamen woordelijk overeen — inclusief details waar een slordig rapport zou struikelen (de baseline-quote, de "unsupported"-status, `(1301-1306/1306)`). De §2.2-beperkingen zijn eerlijk en niet cosmetisch opgeschreven. Twee van de negen zelfgemelde onzekerheden bleken bij nacontrole **oplosbaar**, en in één geval (Plan/KDE) was het zelfgemelde vermoeden bovendien onjuist in het nadeel van het rapport zelf.

De uitzondering is **V2**, en die is niet klein. De bewering dat IFC 4.3 "voor het eerst" een open uitwisselnorm voor planning oplevert, is de scharnierclaim: §9.1 stelt de diagnose, §10.1 verklaart haar opgelost, §12.1 leidt er de strategische aanbeveling uit af. Die keten is gebroken — niet omdat IFC geen goede keuze is, maar omdat de *reden* die het rapport geeft niet klopt en bij het eerste kritische tegenvragen zou bezwijken. Dat het gat tussen 2013 en 2026 bestond terwijl de norm al open was, is bovendien op zichzelf een bevinding die het rapport had moeten verontrusten: het suggereert dat er nog een niet-geïdentificeerde barrière is. Gecombineerd met de ongetoetste §9.5 is dat de belangrijkste openstaande onderzoeksvraag.

De correcties V1, V4 en V5 zijn nauwkeurigheidsfouten die geen enkele conclusie omkeren.
