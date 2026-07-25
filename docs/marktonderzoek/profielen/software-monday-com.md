# monday.com — diepgaand softwareprofiel

**Categorie:** Work OS / collaboratief werkbeheer met Gantt-weergave
**Onderzoeksdatum:** 25 juli 2026
**Analist-oordeel in één zin:** monday.com is een uitstekend werkbeheerplatform met een Gantt-*weergave*, maar **geen netwerkplanner** — het mist de fundamenten (duur, kalender, float, lag, constraints) die een CPM-engine definiëren.

> **Methodologische kanttekening.** Deze sessie had het WebSearch-budget uitgeput; het onderzoek is daarom uitgevoerd met gerichte WebFetch-opdrachten op primaire bronnen (monday.com prijspagina, `developer.monday.com` API-referentie, monday.com blog/featurepagina's, `ir.monday.com`, Wikipedia, stockanalysis.com) en op reviewaggregators (Software Advice, GetApp, PeerSpot, SourceForge) plus Hacker News. `support.monday.com`, G2, Capterra, TrustRadius, Gartner Peer Insights, Trustpilot en Reddit gaven **HTTP 403 / blokkade** en konden niet worden geraadpleegd. Waar een claim daardoor niet primair is te verifiëren, staat dat expliciet vermeld als *[SCHATTING]* of *[BEOORDELING]*.
>
> **Nagecontroleerd.** Dit profiel is op 25-07-2026 onderworpen aan een onafhankelijke, adversariële fact-check die elke kernbewering probeerde te weerleggen. Uitkomst en correcties staan in **[§ Verificatie](#verificatie)** onderaan; correcties in de lopende tekst zijn gemarkeerd met *[GECORRIGEERD]*, *[INGETROKKEN]* of *[ONZEKER]*.

---

## 1. Wat het is

### Leverancier en historie

| | |
|---|---|
| **Leverancier** | monday.com Ltd. |
| **Hoofdkantoor** | Tel Aviv, Israël |
| **Opgericht** | februari 2012, als **dapulse** — een spin-off van Wix.com, waar het product sinds 2010 werd ontwikkeld |
| **Oprichters** | Roy Mann en Eran Zinman |
| **Startkapitaal** | $1,5 mln seed |
| **Commerciële lancering** | 2014 |
| **Naamswijziging** | dapulse → monday.com in 2017 |
| **Eigendom** | Beursgenoteerd — Nasdaq, ticker **MNDY**, IPO 10 juni 2021 |
| **Medewerkers** | 3.155 (2025); **20% reductie aangekondigd juli 2026** |
| **Klanten** | 245.000+ (2025, Wikipedia) / "over 250,000 customers" (monday.com eigen opgave, 2026) |

Bron: [Wikipedia — Monday.com](https://en.wikipedia.org/wiki/Monday.com), opgehaald 25-07-2026; [monday.com/construction](https://monday.com/construction), opgehaald 25-07-2026.

### Doelgroep en typische gebruikers

monday.com positioneert zich als **"Work OS"** — een horizontaal, configureerbaar platform waarop elke afdeling zijn eigen werkstroom bouwt. Het productportfolio is inmiddels opgesplitst in vier apart gelicentieerde lijnen:

- **monday work management** — algemeen projectwerk/taken (bevat de Gantt-view)
- **monday CRM** — sales
- **monday dev** — software/agile
- **monday service** — servicedesk/ticketing

**Typische gebruiker:** een teamleider of afdelingsmanager in een organisatie van 5–500 medewerkers, zonder planningsspecialisatie, die een gedeeld overzicht wil van wie-wat-wanneer. Niet een planner met AACE/PMI-achtergrond.

**Sectoren:** marketing en creatief, IT/ops, HR, sales, productontwikkeling, professional services. Bouw is een **secundaire verticale** waar monday.com actief op adverteert (`monday.com/construction`) met eigenaren, planners, hoofdaannemers en onderaannemers als doelgroep en genoemde referenties **HOLT CAT** en **Falkbuilt** — maar het aanbod dáár draait om veld-kantoorcommunicatie, RFI's, documenten, foto's en budget-op-hoofdlijnen, **niet om planning**.

**Regio's:** wereldwijd, met een uitgesproken self-service/product-led-groeimodel en zeer zware advertentie-uitgaven. Sterk in Noord-Amerika, EMEA, APAC en Israël; oververtegenwoordigd in het SMB- en lower-mid-market-segment. Op Hacker News wordt monday.com herhaaldelijk gekarakteriseerd als "generic project management" tussen gespecialiseerde dev-tools en enterprise-suites, met opvallend hoge marketinguitgaven als onderscheidend kenmerk.

---

## 2. Functionaliteit en techniek — de CPM-toets

Dit is de kernvraag van dit profiel: **heeft monday.com een echte CPM-engine, of tekent het alleen een balkenschema?** Het antwoord is ondubbelzinnig het tweede. Hieronder eerst wat monday.com claimt, dan wat het datamodel feitelijk toestaat.

### 2.1 Wat monday.com zelf claimt

Op de featurepagina staan letterlijk **"Task dependencies"**, **"Critical paths"**, **"Baselines"** en **"Milestones"** als Gantt-capabilities.
Bron: [monday.com/features/gantt](https://monday.com/features/gantt), opgehaald 25-07-2026.

Op de eigen blog gaat monday.com verder en claimt een échte berekening:

> *"Team members input activities and dependencies, and monday.com automatically calculates the critical path, highlighting it directly within the Gantt chart view."*
> *"When timelines shift, the automation engine instantly propagates changes through all dependent activities, updating start and end dates automatically."*

Bron: [monday.com/blog/project-management/critical-path-method/](https://monday.com/blog/project-management/critical-path-method/), opgehaald 25-07-2026.

### 2.2 Wat het datamodel feitelijk biedt — de officiële kolomtypelijst

De API-referentie somt **alle** kolomtypen op: 27 schrijfbare, 6 read-only, 1 berekende (34 totaal).

**Schrijfbaar (27):** Button, Checkbox, Color picker, Connect boards, Country, Date, **Dependency**, Dropdown, Email, Files, **Hour**, Link, Location, Long text, monday doc, Numbers, People, Phone, Rating, Status, Subitems, Tags, Text, **Timeline**, **Time tracking**, Vote, **Week**, World clock.

> *[GECORRIGEERD 25-07-2026]* Een eerdere versie van dit profiel noemde "31 schrijfbare" en telde daarbij `Name` en `Board relation` mee; die staan niet in de officiële lijst schrijfbare kolomtypen (en de opsomming zelf kwam op 30, niet 31). Hertelling op de bron geeft **27 / 6 / 1**. De inhoudelijke conclusie verandert niet.
**Read-only:** Creation log, Formula, Item ID, Last updated, Mirror, Progress tracking.
**Berekend:** Auto number.

Bron: [developer.monday.com — Column types reference](https://developer.monday.com/api-reference/reference/column-types-reference), opgehaald 25-07-2026.

**Wat er dus níet is — en dit is beslissend:**

> Er bestaat **geen `duration`-, `work`-, `effort`-, `cost`-, `rate`- of `baseline`-kolomtype**. Niet als schrijfbaar type, niet als read-only type.

Dat is geen detail. In klassieke CPM is **duur de invoer** en zijn **datums de uitvoer** van de forward/backward pass. In monday.com is een taak een `Timeline`-kolom — een **vaste datumrange** (`from` / `to`, ISO 8601). De gebruiker typt datums in; de tool schuift die hooguit door. De logische richting is dus omgekeerd ten opzichte van elke echte planningstool. Zonder duur als eerste-klas veld kan er per definitie geen netwerkberekening bestaan.

### 2.3 Afhankelijkheidstypen: FS/SS/FF/SF — wel in de UI, niet in de data

De API-documentatie is hierover pijnlijk expliciet:

> *"Relationship types are not currently exposed by the API."*
> De UI staat toe: *"Finish-to-start, Start-to-start, Finish-to-finish, Start-to-finish"* — maar de API geeft alleen terug **wélke** items gekoppeld zijn, **niet het type relatie**.

Bron: [developer.monday.com — Dependency column](https://developer.monday.com/api-reference/reference/dependency), opgehaald 25-07-2026.

In plaats van relatietypen kent de dependency-kolom een `dependency_mode` met drie standen:

| Modus | Gedrag (letterlijk uit de docs) |
|---|---|
| **Flexible** | *"The linked date or timeline shifts automatically, but allows some overlap between the predecessor and successor item."* |
| **Strict** | *"The linked date or timeline shifts automatically and enforces strict sequencing — the dependent item cannot start until its predecessor is fully complete."* |
| **No action** | *"No automatic adjustment is made to dates or timelines when a dependency changes state."* |

Aanvullende beperking uit dezelfde bron: `dependency_mode` werkt **alleen** op boards die een Date- of Timeline-kolom bevatten; boards zonder die kolommen gedragen zich als `no_action`, ongeacht de instelling.

**Analyse:** dit is een *event-gedreven doorschuifmechanisme*, geen deterministische netwerkherberekening. "Flexible" laat zelfs overlap toe — dat is precies het tegenovergestelde van een gesloten logisch netwerk.

### 2.4 Lags en leads

**Niet ondersteund.** De dependency-documentatie bevat **geen enkele vermelding** van lag- of lead-tijd. Er is geen veld, geen API-property, geen semantiek in de `dependency_mode`-modi.

Voor bouwplanning is dit alleen al diskwalificerend. Standaardconstructies als *"ontkisten: FS + 7 werkdagen uithardingstijd"*, *"gevelmontage start SS + 10 dagen na ruwbouwstart"* of *"oplevering FF − 5 dagen"* zijn **niet modelleerbaar**. De workaround — een dummy-taak "wachttijd" invoegen — is een bekende antipatroon die de planning vervuilt en niets oplost bij herberekening.

### 2.5 Kalenders

Het enige kalendergerelateerde dat de documentatie noemt is een `show_weekends`-instelling op de Timeline-kolom, die bepaalt **of weekenden in de visualisatie worden getoond**.
Bron: [developer.monday.com — Timeline column](https://developer.monday.com/api-reference/reference/timeline), opgehaald 25-07-2026.

Wat ontbreekt:
- geen **projectkalender** (basiswerkweek, werktijden)
- geen **taakkalenders** (afwijkende kalender per activiteit)
- geen **resourcekalenders** (ploegendienst, deeltijd, verlof)
- geen **feestdagen** of nationale kalenders
- geen **niet-werkbare perioden** (bouwvak, vorstverlet, weerverlet)
- geen **shifts / meerdere ploegen per dag**

Praktisch gevolg: een activiteit van "10 dagen" heeft in monday.com geen betekenis los van de ingetypte einddatum, en een verschuiving houdt geen rekening met welke dagen werkbaar zijn. Voor een internationaal bouwproject — waar juist de kalender het verschil maakt — is dit onbruikbaar.

### 2.6 Kritiek pad en float

Hier zit de scherpste tegenstelling tussen marketing en datamodel.

**Feit:** er bestaat **geen total-float- of free-float-veld** — niet als kolomtype, niet als API-property, niet als filterbaar attribuut. Uit de volledige kolomtypelijst blijkt dat float nergens wordt opgeslagen of blootgesteld.

**[BEOORDELING]** Als er geen float bestaat, kan er geen backward pass zijn uitgevoerd waarvan het resultaat wordt bewaard. Het "kritieke pad" dat monday.com toont, is naar alle waarschijnlijkheid een **markering van de langste aaneengesloten ketting van gekoppelde items** — niet het resultaat van een forward/backward pass met LS/LF-berekening. monday.com publiceert nergens een algoritmebeschrijving of definitie van hoe het kritieke pad wordt bepaald; dit oordeel is daarom een gefundeerde afleiding uit het datamodel, geen geverifieerd feit.

**Gevolg:** je kunt in monday.com geen antwoord krijgen op de vragen die een planner dagelijks stelt: *hoeveel speling heeft deze activiteit?*, *welke near-critical paden lopen risico?*, *wat is het netto-effect op de einddatum van 5 dagen vertraging op deze activiteit?* Dat maakt de tool ongeschikt voor **vertragingsanalyse (delay analysis)**, **EOT-claims (extension of time)** en elke contractueel houdbare planning.

### 2.7 Constraints

**Volledig afwezig.** Geen `Start No Earlier Than`, `Finish No Later Than`, `Must Start On`, `Must Finish On`, `As Late As Possible`, geen deadlines-als-constraint. De enige "constraint" is de dependency-modus strict/flexible.

### 2.8 Baselines

monday.com noemt de **"Gantt Baseline"** als functie: *"allows you to visualize your current project's progression against the planned timeline"*.
Bron: [monday.com/blog/project-management/gantt-chart/](https://monday.com/blog/project-management/gantt-chart/), opgehaald 25-07-2026.

**Beperkingen:**
- Het is één **visuele** baseline, geen dataobject: er is geen baseline-kolomtype in de API.
- Geen **meerdere genummerde baselines** (Baseline 0–10 zoals in MS Project, of meerdere baselines in P6).
- Geen **baseline-duur, baseline-kosten, baseline-werk** per activiteit — die velden bestaan niet.
- Daarmee ook geen **variance-analyse** (SV, CV) en geen **earned value** (BCWS/BCWP/ACWP, SPI/CPI).

### 2.9 Resource- en kostenmodel

- **Workload-view** bestaat, maar toont belasting per persoon op basis van item-aantallen of een numerieke kolom — er is geen resource-pool met een capaciteit gedefinieerd tegen een kalender.
- Geen **resource leveling**, niet automatisch en niet handmatig-ondersteund.
- Geen **rate-** of **cost-kolom**; budgetteren gebeurt met `Numbers` + `Formula`.
- De `Formula`-kolom is **read-only** en de `Mirror`-kolom kent rollup-beperkingen: parent-items met berekende rollup-waarden **kunnen niet direct gemuteerd worden** — je moet de child-items bijwerken.
- Enterprise-reviewers op PeerSpot noemen expliciet dat het *"difficult"* is om met getallen voor budgettracking te werken, met *"limitations in vertical calculations and subitem formulas"*.
- Software Advice-reviewers noemen *"limited budgeting/forecasting capabilities"* als concrete zwakte.

Bronnen: [PeerSpot — monday.com reviews](https://www.peerspot.com/products/monday-com-reviews); [Software Advice — monday.com](https://www.softwareadvice.com/project-management/monday-profile/), beide opgehaald 25-07-2026.

**Belangrijk:** **Resource management én portfolio management zitten uitsluitend in het Enterprise-plan.** Voor een planningsafdeling betekent dat: Enterprise, of geen resourcefunctionaliteit.

### 2.10 WBS en hiërarchie

- Structuur: Workspace → Board → Group → Item → Subitem.
- Subitems kunnen **maximaal 5 niveaus diep** genest worden (API-docs). Cycli worden voorkomen (een item kan geen voorouder van zichzelf worden).
- Geen echte **WBS-codering**, geen samenvattende taken die duur/kosten/werk op de klassieke manier oprollen, geen activiteitscodes / activity codes zoals in P6.

### 2.11 Platform en schaalbaarheid

**API-limieten** (bron: [developer.monday.com — Rate limits](https://developer.monday.com/api-reference/reference/rate-limits), opgehaald 25-07-2026):

| Limiet | Free / Basic / Standard | Pro | Enterprise |
|---|---|---|---|
| API-calls per dag | 1.000 | 10.000 (soft) | 25.000 (soft) |
| Queries per minuut | 1.000 | 2.500 | 5.000 |
| Gelijktijdige requests | 40 | 100 | 250 |
| Complexity per query | 5 mln punten | 5 mln | 5 mln |
| Complexity per minuut (personal token) | 1 mln (trial/free/NGO) | 10 mln | 10 mln |

Aanvullend: 5.000 requests per 10 seconden per IP-adres.

**Query-paginatie:** standaard 25 items per query, **maximaal 100**; voor volledige uitlezing van een board moet je `items_page` gebruiken. Voor een planning van 5.000 activiteiten betekent dat minimaal 50 paginerende calls — bij 1.000 calls/dag op Standard is bidirectionele synchronisatie feitelijk onmogelijk.

**Maximum items per board:** **niet gedocumenteerd.** monday.com publiceert geen harde bovengrens. Wél is "traagheid bij grote boards" een van de meest consistente klachten in reviews:
- *"Performance lag on large boards"* — GetApp
- *"Performance slowdowns when handling large data volumes or complex projects"* — SourceForge

**[SCHATTING] Realistisch werkbaar volume voor planningsdoeleinden: enkele honderden tot circa 1.000–2.000 regels per board.** Daarboven wordt de Gantt-weergave traag en operationeel onhandelbaar. Ter kalibratie: een middelgrote bouwplanning in Primavera P6 telt 5.000–20.000 activiteiten, een megaproject 50.000+. monday.com zit één tot twee ordes van grootte onder wat een klassieke CPM-tool aankan. Deze schatting is afgeleid uit de consistente reviewsignalen en de API-paginatiegrenzen; monday.com publiceert zelf geen prestatiecijfers.

### 2.12 Samenvattend technisch oordeel

| CPM-fundament | monday.com | Oordeel |
|---|---|---|
| Duur als invoerveld | ❌ afwezig (alleen datumrange) | **Blokkerend** |
| Forward/backward pass | ❌ geen bewijs, geen float-opslag | **Blokkerend** |
| Total float / free float | ❌ afwezig | **Blokkerend** |
| Werkkalenders (project/taak/resource) | ❌ alleen `show_weekends` | **Blokkerend** |
| Lags / leads op relaties | ❌ afwezig | **Blokkerend** |
| Relatietypen FS/SS/FF/SF | ⚠️ in UI aanwezig, **niet in API** | Ernstig beperkt |
| Constraints (SNET/FNLT/MSO/ALAP) | ❌ afwezig | **Blokkerend** |
| Baselines | ⚠️ één visuele baseline, geen dataobject | Beperkt |
| Kritiek pad | ⚠️ geclaimd, waarschijnlijk visuele ketenmarkering *[BEOORDELING]* | Onbetrouwbaar |
| Resourcekalender + leveling | ❌ afwezig | **Blokkerend** |
| Kostenmodel (rate/cost) | ❌ alleen Numbers/Formula | **Blokkerend** |
| Earned value | ❌ afwezig | Blokkerend |
| WBS-codering | ❌ alleen 5 niveaus subitems | Beperkt |

**Conclusie:** monday.com is een **schedule visualiser met dependency-propagatie**, niet een netwerkplanner. De marketingclaim dat het *"automatically calculates the critical path"* is niet onderbouwd door een datamodel dat float, duur of kalenders kent. Wie deze tool inzet voor contractueel gestuurde planning, plant feitelijk met een gekleurd balkenschema.

---

## 3. Prijzen

**Alle bedragen: bron [monday.com/pricing](https://monday.com/pricing), opgehaald 25 juli 2026. Bedragen in USD, exclusief btw; het uiteindelijke bedrag wordt bepaald door het factuurland.**

### 3.1 monday work management (de lijn met de Gantt-view)

| Plan | Prijs/zetel/mnd (**jaarbetaling**) | Prijs/zetel/mnd (maandbetaling) | Kernbeperkingen |
|---|---|---|---|
| **Free** | $0 | $0 | **Max. 2 zetels**, 3 boards, 3 docs, 8 kolomtypen, 200+ templates, iOS/Android |
| **Basic** | **$9** | **onbekend** *[ONZEKER]* | Onbeperkte items, onbeperkte viewers, 1.000 AI-credits/mnd. **Geen Gantt.** |
| **Standard** | **$12** | **onbekend** *[ONZEKER]* | **Timeline & Gantt-view**, kalenderweergave, 250 automatiserings-/integratie-acties/mnd, gastentoegang, 1.000 API-calls/dag, 2.000 AI-credits |
| **Pro** | **$19** | **onbekend** *[ONZEKER]* | 25.000 acties/mnd, privéboards, tijdregistratie, geavanceerde kolommen, 10.000 API-calls/dag, 3.000 AI-credits |
| **Enterprise** | **op aanvraag** | — | 250.000 acties/mnd, **portfoliomanagement**, **resource management**, multi-level permissions, 25.000 API-calls/dag, 24/7 support |

De jaarprijzen $0 / $9 / $12 / $19 zijn bij herverificatie op 25-07-2026 opnieuw rechtstreeks van `monday.com/pricing` gelezen en **bevestigd**; ook GetApp en Software Advice noemen $9 als instapprijs.

**Toelichting op maandprijzen — [GECORRIGEERD 25-07-2026].** De prijspagina toont standaard de jaarprijs en vermeldt *"Yearly SAVE 18%"*; de FAQ voegt toe: *"The monthly plan is not discounted so if you are looking to save, we recommend the yearly plan."* De maandprijzen voor **work management** zijn ook bij herhaalde fetches (met en zonder `?billing=monthly`) **niet uit de gerenderde pagina te lezen** — de client-side toggle rendert niet.

De eerdere schatting **~$11 / $15 / $23, afgeleid uit de 18%-korting, is ingetrokken: de afleidingsmethode is weerlegd door monday.com's eigen prijspagina's.** De CRM-lijn, die op dezelfde site *wél* beide bedragen toont, hanteert $12→$18, $17→$25 en $28→$41 — een verhouding van ongeveer **1,5×**, oftewel ~33% besparing bij jaarbetaling, niet 18%. Het gepubliceerde "18%" is dus geen bruikbare rekenfactor. Zou dezelfde 1,5×-verhouding voor work management gelden, dan komt maandbetaling eerder rond **$13–14 / $18 / $28** uit — maar dat is een **extrapolatie uit een andere productlijn en niet geverifieerd**. De eerder genoemde "historische" maandprijzen $12 / $14 / $24 konden bij deze controle **niet aan enige bron worden gekoppeld** en zijn verwijderd. **Verifieer maandprijzen in een live checkout.**

### 3.2 Zetelminima en zetelblokken

- **Gratis plan: maximaal 2 zetels.**
- **Betaalde plannen: minimaal 3 zetels.** Bevestigd op de prijspagina, letterlijk: *"Plans start from 3 users."* Dit minimum geldt aantoonbaar voor **alle vier de productlijnen** (work management, CRM, dev, service).
- De zetelkiezer op de prijspagina staat standaard op **10 zetels**; boven de 40 gebruikers verwijst de pagina naar sales: *"If you want to sign up more than 40 users, you can request a quote from our sales team to get an exact price."*
- **[ONZEKER — afgezwakt 25-07-2026]** Eerder stond hier dat monday.com zetels in vaste **blokken** verkoopt (3, 5, 10, 15, 20, 25, 30, 40, 50…), met als gevolg dat een team van 11 er 15 betaalt (~36% opslag). **Die claim is bij herverificatie niet te onderbouwen.** De prijspagina en FAQ bevestigen alleen het minimum van 3, de default van 10 in de kiezer en de sales-drempel bij 40; er is **geen brontekst gevonden die zegt dat tussenliggende aantallen niet gekocht kunnen worden**. De zelfbedieningskiezer toont weliswaar sprongen, maar dat is een UI-keuze en geen aangetoonde factureringsregel. **Behandel de blokopslag niet als feit**; het enige harde kosteneffect voor kleine teams is het minimum van 3 zetels.
- **Onbeperkte viewers** (alleen-lezen) zijn inbegrepen vanaf Basic. Dit is een belangrijk positief punt: stakeholders en opdrachtgevers kosten niets.

### 3.3 Enterprise

Prijs is **niet publiek**. *[SCHATTING]* Op basis van de gebruikelijke opslag boven Pro ligt Enterprise doorgaans in de orde van **$28–$40 per zetel per maand bij jaarbetaling**, met een minimale contractomvang in de tientallen zetels. Dit is een marktinschatting en **geen door monday.com gepubliceerd cijfer**. Voor elke serieuze planningstoepassing is Enterprise feitelijk verplicht, omdat **resource management en portfoliomanagement uitsluitend daar zitten**.

### 3.4 Overige productlijnen (allemaal apart gelicentieerd)

| Lijn | Basic/Standard | Standard/Pro | Pro/hoogste | Top |
|---|---|---|---|---|
| **monday CRM** | Basic $12 jaar / $18 mnd | Standard $17 / $25 | Pro $28 / $41 | Ultimate op aanvraag |
| **monday dev** | Basic $9 | Standard $12 | Pro $20 | Enterprise op aanvraag |
| **monday service** | — | Standard $31 | Pro $45 | Enterprise op aanvraag |

Bron: [monday.com/pricing](https://monday.com/pricing), 25-07-2026. CRM kent eveneens een minimum van 3 zetels.

### 3.5 Add-ons en verborgen kosten

- **AI-credits** zijn gerantsoeneerd per plan (1.000 / 2.000 / 3.000 per maand); extra credits kosten bij. *"Costs vary by tool complexity."*
- **Marketplace-apps** van derden worden vaak **apart per zetel** gefactureerd — inclusief de geavanceerde Gantt-/planningsapps die de tekortkomingen van de native view moeten opvangen.
- **Automatiseringsacties** zijn gecapt (250 op Standard!). Een organisatie die serieus automatiseert wordt naar Pro geduwd — een sprong van $12 → $19, oftewel **+58%**.
- **API-limieten** dwingen dezelfde upgrade af: 1.000 calls/dag op Standard is te weinig voor elke echte integratie.
- Elke productlijn (Work Management / CRM / Dev / Service) wordt **afzonderlijk** betaald; er is geen bundel-alles-tarief.

### 3.6 Rekenvoorbeeld TCO *[SCHATTING]*

| Scenario | Berekening | Jaarkosten |
|---|---|---|
| 10 planners, Pro, jaarbetaling | 10 × $19 × 12 | **$2.280** — maar zónder resource management |
| 11 zetels (team van 11), Pro | 11 × $19 × 12 | **$2.508** — de eerdere regel rekende met 15 zetels wegens "blokafronding"; die aanname is ingetrokken *(zie §3.2)* |
| 25 zetels, Enterprise *[schatting $32]* | 25 × $32 × 12 | **~$9.600** *[ONZEKER — Enterprise-tarief is nergens gepubliceerd]* |

De regel "10 planners op Pro = $2.280/jaar" is narekenbaar en klopt bij de bevestigde jaarprijs van $19 (10 × $19 × 12 = $2.280).

Ter vergelijking: één Primavera P6 Professional-licentie ligt in dezelfde orde als het hele Pro-team, maar levert wél een volwaardige CPM-engine.

---

## 4. VOORDELEN

1. **Uitzonderlijk lage adoptiedrempel.** Dit is consistent het meest genoemde pluspunt over alle reviewbronnen heen: 4,6/5 op Software Advice (6.074 geverifieerde reviews, "FrontRunner 2026"), 4,6/5 op GetApp (65% vijfsterren), 4,7/5 op PeerSpot (238 reviews, **98% zou het aanbevelen**), 4,8/5 op SourceForge (98 reviews). Reviewers noemen de visuele, kleurgecodeerde interface toegankelijk voor zowel technische als niet-technische gebruikers. Een team is binnen een uur productief — iets wat van geen enkele klassieke CPM-tool gezegd kan worden.

2. **Zeer sterke no-code automatiseringsmotor.** 250 → 25.000 → 250.000 acties per maand naargelang het plan. Statusflows, goedkeuringsroutes, escalaties, meldingen en integratie-triggers zijn zonder code te bouwen. Dit is objectief superieur aan wat MS Project of P6 op dit vlak bieden en verklaart een groot deel van de aantrekkingskracht.

3. **Volwassen, goed gedocumenteerde GraphQL-API.** Eén endpoint (`https://api.monday.com/v2`), gedateerde versionering (bv. `version=2024-04`), publiek introspecteerbaar schema via `/v2/get_schema` in zowel JSON als SDL, queries én mutations combineerbaar in één request, plus een `llms.txt`-documentatie-index. Dit is beter gedocumenteerd en toegankelijker dan de API's van vrijwel alle bouwspecifieke planningstools. Bron: [developer.monday.com](https://developer.monday.com/api-reference/docs/introduction-to-graphql).

4. **Onbeperkte viewers op elk betaald plan.** Alleen-lezen toegang kost niets. Voor een bouwcontext met veel meekijkende partijen (opdrachtgever, directievoering, onderaannemers, adviseurs) is dit een substantieel financieel voordeel ten opzichte van tools die per benoemde gebruiker rekenen.

5. **Vier dependency-typen instelbaar in de UI (FS/SS/FF/SF) plus twee propagatiemodi.** Ondanks de zware kritiek verderop: dit is méér dan wat generieke concurrenten als Trello, Notion of Basecamp bieden, en zet monday.com in de bovenste helft van de work-management-categorie.

6. **Breed integratie- en marketplace-ecosysteem.** Slack, Gmail, Google Drive, Microsoft Teams, GitHub, Jira en honderden andere connectoren, plus 19 webhook-events voor eigen integraties (item created/deleted/archived/moved, column value changed, subitem-events, updates). 24/7 support vanaf de hogere plannen.

7. **Mobiele apps met offlinemodus.** monday.com adverteert expliciet met veld-naar-kantoor-communicatie: realtime delen van bestanden, foto's, RFI's en updates via de mobiele app **met offline werken**. Voor bouwplaatsen zonder dekking is dat functioneel relevant. Bron: [monday.com/construction](https://monday.com/construction).

8. **Financieel zeer solide leverancier.** Omzet 2025 van **$1,232 mrd** (+26,8% j-o-j), **netto winst $118,7 mln**, beursgenoteerd op Nasdaq, 3.155 medewerkers, 245.000+ klanten. Het risico dat de leverancier verdwijnt of het product staakt is laag — een reëel voordeel ten opzichte van kleinere planningsleveranciers.

9. **Eén platform voor meer dan alleen planning.** Werkbeheer, CRM, servicedesk, dev-tracking, documenten en dashboards in één omgeving. Voor kleinere organisaties vermindert dat toolwildgroei en integratielast aanzienlijk.

10. **Zeer snelle time-to-value en self-service inkoop.** Geen implementatietraject, geen consultant, creditcard en starten. Voor een aannemer die vandaag structuur wil in zijn takenlijst is dat een legitiem en onderschat voordeel.

---

## 5. NADELEN

1. **Geen echte CPM-engine — het fundament ontbreekt.** Geen duur-veld, geen float-veld, geen constraints, geen lags, geen kalenders. De volledige officiële kolomtypelijst (27 schrijfbaar + 6 read-only + 1 berekend) bevat **geen duration, work, effort, cost, rate of baseline**. Het geclaimde "kritieke pad" is *[BEOORDELING]* een visuele ketenmarkering, geen berekend resultaat van een backward pass — er is immers nergens float om te bewaren. Voor contractueel houdbare planning, EOT-claims of forensic delay analysis is de tool onbruikbaar. De kloof tussen de blogclaim *"monday.com automatically calculates the critical path"* en het datamodel is de scherpste bevinding van dit onderzoek.

2. **Geen kalendermodel.** De enige kalenderfunctie in de documentatie is `show_weekends` op de Timeline-kolom — een **weergave**-instelling. Geen feestdagen, geen ploegendiensten, geen taak- of resourcekalenders, geen bouwvak of vorstverlet. Een taak die "10 dagen" duurt heeft in monday.com geen kalendergebonden betekenis, en een verschuiving houdt geen rekening met werkbare dagen.

3. **Geen lag/lead op relaties.** De dependency-documentatie noemt lag of lead nergens. Basale bouwlogica zoals *"FS + 7 dagen uithardingstijd beton"* of *"SS + 10 dagen"* is niet te modelleren. De enige workaround — dummy-wachttaken — vervuilt het netwerk en overleeft geen herberekening.

4. **Relatietypen zijn niet uit te lezen via de API.** Letterlijk uit de officiële docs: *"relationship types are not currently exposed by the API"* — de API geeft alleen terug wélke items gekoppeld zijn, niet of het FS, SS, FF of SF is. **Dit maakt monday.com structureel een data-eiland voor planningslogica:** zelfs de logica die je zelf in de UI hebt ingevoerd, kun je er niet volledig uit halen. Elke export of migratie is per definitie lossy.

5. **Geen kosten- of resourcemodel.** Geen rate-, cost-, work- of effort-kolom; budgetteren gaat met Numbers + read-only Formula-kolommen, met bekende beperkingen (parent-items met rollup-waarden kunnen niet direct gemuteerd worden). PeerSpot-reviewers noemen het *"difficult"* om met getallen voor budgettracking te werken en wijzen op *"limitations in vertical calculations and subitem formulas"*; Software Advice noemt *"limited budgeting/forecasting capabilities"*. Resource management zit bovendien **uitsluitend op Enterprise**.

6. **Prestatieproblemen op grote boards.** Een van de meest consistente klachten over alle bronnen: *"performance lag on large boards"* (GetApp), *"performance slowdowns when handling large data volumes or complex projects"* (SourceForge). Er is **geen gedocumenteerd maximum aantal items per board** — monday.com publiceert geen prestatiegrenzen, wat op zichzelf een risico is bij inkoop. *[SCHATTING]* boven ~1.000–2.000 regels wordt de Gantt onwerkbaar.

7. **Agressieve plan-fragmentatie duwt de rekening omhoog.** Gantt/Timeline pas vanaf **Standard**; tijdregistratie pas vanaf **Pro**; resource- én portfoliomanagement pas op **Enterprise**. Automatiseringsacties zijn op Standard gecapt op 250/maand — belachelijk laag — wat een upgrade naar Pro (+58% prijs) afdwingt. GetApp-reviewers: *"advanced features locked behind higher-tier plans"*; PeerSpot: kosten worden *"high as advanced features are tied to higher plans"* en het platform is *"less cost-efficient as team sizes grow"*.

8. **Minimum 3 zetels maakt kleine teams duur.** Het gratis plan is met 2 zetels, 3 boards, 3 docs en 8 kolomtypen nauwelijks meer dan een demo — bevestigd op de prijspagina. Elk betaald plan begint bij 3 zetels (*"Plans start from 3 users"*), dus een soloplanner betaalt minimaal 3× de zetelprijs. Reviewers noemen de prijs *"expensive for small teams or solo users"*. **[ONZEKER]** De eerder genoemde "zetelblokken" (team van 11 betaalt er 15) kon niet worden onderbouwd en is afgezwakt — zie §3.2.

9. **API-limieten op de lagere plannen blokkeren integratie.** 1.000 calls/dag op Free/Basic/**Standard** — het plan waar de Gantt in zit — is voor elke bidirectionele synchronisatie te weinig, zeker gezien de paginatiegrens van 100 items per query. Een board van 5.000 regels kost al 50 calls per volledige uitlezing.

10. **Rapportage op programma- en portfolioniveau is zwak.** Enterprise-reviewers op PeerSpot melden dat het *"harder to generate high-level program views"* is en dat de rapportagelaag meer flexibiliteit nodig heeft over verschillende boardstructuren heen. SourceForge-reviewers noemen de rapportage *"basic relative to feature set"*.

11. **Notificatieruis, bugs en een zwakkere mobiele app.** PeerSpot: notificaties zijn *"not trustworthy"* en *"very overwhelming"*. GetApp: *"limited mobile app functionality"* en *"frequent bugs and glitches"*. Software Advice: mobiele app blijft achter op desktop; navigatie is complex voor nieuwe gebruikers; ook *"overt integration of AI features is disappointing"*.

12. **Leveranciersrisico op productrichting (actueel, juli 2026).** Op 22 juli 2026 kondigde monday.com in een SEC-filing een **reductie van 20% van het personeelsbestand** aan als onderdeel van een herstructurering rond een *"AI-driven growth strategy"* (TechCrunch, Business Insider, Fast Company, Jefferies-analyse). Het aandeel staat op **-50% YTD** (koers $77,43 op 24-07-2026) en de marktkapitalisatie is **$3,32 mrd**. *[ONZEKER]* De eerder genoemde daling van "~77,5%" is niet herleidbaar tot een gepubliceerd cijfer — stockanalysis.com toont −50% YTD en −44% over zes maanden; een −77,5% verwijst vermoedelijk naar de afstand tot de piekkoers, maar dat referentiepunt is niet vastgesteld. Planningsdiepte was nooit de strategische prioriteit en wordt dat met deze herpositionering vrijwel zeker ook niet. Bron: [stockanalysis.com/stocks/mndy](https://stockanalysis.com/stocks/mndy), opgehaald 25-07-2026.

---

## 6. Interoperabiliteit

### 6.1 Planningsformaten

| Formaat | Ondersteuning | Toelichting |
|---|---|---|
| **XER** (Primavera P6) | ❌ **Niet ondersteund** | Geen native import/export, geen door monday.com ondersteunde marketplace-route |
| **P6 XML** | ❌ **Niet ondersteund** | Idem |
| **MPP** (MS Project binair) | ❌ **Geen native ondersteuning** | *[SCHATTING]* Er zijn/waren marktplaats-apps van derden, maar geen officiële route. Praktijk: via CSV/Excel omweg |
| **MSPDI / MS Project XML** | ❌ **Niet ondersteund** | Geen enkel spoor in de documentatie |
| **CSV / Excel** | ✅ **Wel** | Import naar een board en export van een board. **De enige echte uitwisselingsroute.** |
| **PDF-export** | ✅ Wel | Weergave-export, geen data |

**Kritieke kanttekening bij de CSV/Excel-route:** een CSV-export uit monday.com bevat de item-namen, statussen, mensen en datumranges — maar **niet de relatietypen** (die zijn immers ook niet via de API beschikbaar), **niet de lags** (bestaan niet), **niet de duur** (bestaat niet als veld), **niet de kalender** (bestaat niet). Wat je exporteert is een **lijst met balken**, geen planning.

### 6.2 IFC 4.3 / openBIM — **volledig afwezig**

Dit is voor de opdrachtgever het belangrijkste punt en het antwoord is onomwonden negatief.

monday.com heeft **geen enkele vorm van BIM-, IFC- of openBIM-ondersteuning**:

- Geen **`IfcWorkSchedule`** — het concept "planning als object" bestaat niet
- Geen **`IfcTask`** — met bijbehorende `IfcTaskTime` (ScheduleStart/ScheduleFinish/ScheduleDuration, ActualStart/ActualFinish, FreeFloat/TotalFloat, IsCritical)
- Geen **`IfcRelSequence`** — en dus geen `SequenceType` (START_START / START_FINISH / FINISH_START / FINISH_FINISH) en geen `TimeLag`
- Geen **`IfcWorkCalendar`** / `IfcWorkTime` / `IfcRecurrencePattern` — logisch, want er is helemaal geen kalendermodel
- Geen **`IfcResource`** / `IfcConstructionResource` / `IfcResourceTime`
- Geen koppeling van taken aan **`IfcProduct`** via `IfcRelAssignsToProcess` — dus geen 4D
- Geen **BCF**, geen **IDS**, geen IFC-viewer, geen enkele integratie met Solibri, Navisworks, Synchro, Bexel, Vico of vergelijkbaar

**Conclusie:** monday.com kan **niet dienen als bron of doel in een IFC-gebaseerde planningsketen**. Een hypothetische export naar IFC 4.3 zou alleen `IfcTask`-objecten met `ScheduleStart`/`ScheduleFinish` kunnen opleveren, plus `IfcRelSequence`-relaties **zonder `SequenceType` en zonder `TimeLag`** — semantisch betekenisloze koppelingen. Er zou geen `IfcWorkCalendar` zijn, geen `ScheduleDuration`, geen float, geen `IsCritical` die iets betekent.

### 6.3 API en webhooks

- **API:** GraphQL, één endpoint `https://api.monday.com/v2`. Gedateerde versionering (`?version=2024-04`). Publiek schema via `/v2/get_schema` (introspection JSON of SDL). Queries en mutations combineerbaar; variabelen ondersteund.
- **Rate limits:** zie §2.11. Kort: 1.000 calls/dag op Standard, 10.000 op Pro, 25.000 op Enterprise.
- **Paginatie:** max 100 items per query, `items_page` voor volledige boards.
- **Webhooks:** 19 events — item created/deleted/archived/restored/moved to group, column value changed (algemeen en status-specifiek), column created, subitem created/name changed/moved/archived/deleted, update created/edited/deleted. URL max 255 tekens; retry één keer per minuut gedurende 30 minuten. JWT-authenticatie mogelijk bij integratie-app-tokens.
- **Belangrijke leemte:** er is **geen webhook op schema- of dependency-wijzigingen**. Je kunt dus niet betrouwbaar reageren op planningsmutaties — alleen op datumkolom-wijzigingen als generieke `change_column_value`-events. Voor een integrerende planner is dat een serieus probleem.

Bronnen: [developer.monday.com — GraphQL introductie](https://developer.monday.com/api-reference/docs/introduction-to-graphql), [Rate limits](https://developer.monday.com/api-reference/reference/rate-limits), [Webhooks](https://developer.monday.com/api-reference/reference/webhooks), [Items](https://developer.monday.com/api-reference/reference/items), alle opgehaald 25-07-2026.

### 6.4 Betekenis voor een open-source, IFC-gebaseerde planner

1. **monday.com is geen concurrent.** Het speelt in een andere categorie (werkbeheer, niet netwerkplanning) en heeft geen IFC-ambitie.
2. **monday.com is een mogelijke integratiepartner, maar alleen eenrichtings.** Je kunt taken vanuit een IFC-planner naar monday.com pushen als uitvoerings-/statusboard voor het veld. Andersom terugtrekken is beperkt tot status, voortgang, opmerkingen en bestanden — nooit tot planningslogica.
3. **De praktische brug is CSV** — met bewust verlies van relatietypen, lags, duur en kalender. Documenteer dat verlies expliciet als je zo'n import bouwt.
4. **Het interessantste leerpunt is UX, niet techniek.** monday.com heeft bewezen dat een kleurrijke, direct begrijpelijke planningsinterface met onbeperkte kijkers een enorme markt aanboort. Precies dáár schieten klassieke CPM-tools tekort. Een open-source IFC-planner die monday.com's toegankelijkheid combineert met echte CPM-semantiek zou een gat vullen dat op dit moment door niemand wordt bediend.

---

## 7. Marktpositie

### Financiële ontwikkeling

| Boekjaar | Omzet | Bedrijfsresultaat | Nettoresultaat |
|---|---|---|---|
| 2021 | $308,2 mln | −$126,1 mln | −$129,3 mln |
| 2022 | $519,0 mln | −$152,0 mln | −$136,9 mln |
| 2023 | $729,7 mln | −$38,6 mln | −$1,9 mln |
| 2024 | $972,0 mln | −$21,0 mln | +$32,4 mln |
| **2025** | **$1.232 mln** (+26,8%) | −$1,75 mln | **+$118,7 mln** |
| TTM t/m 31-03-2026 | ~$1.301 mln | — | — |

Bron: [stockanalysis.com/stocks/mndy/financials](https://stockanalysis.com/stocks/mndy/financials/), opgehaald 25-07-2026. Totale activa 2025: $2,11 mrd; eigen vermogen $1,246 mrd (Wikipedia).

### Waar monday.com sterk is, en waarom

- **SMB en lower mid-market wereldwijd.** Dit is het thuisterrein. Product-led growth, self-service inkoop, zeer zware marketinguitgaven en een lage instapdrempel maken monday.com het standaardantwoord op *"we hebben iets nodig om ons werk bij te houden."*
- **Horizontale werkbeheerbehoefte.** Marketingteams, ops, HR, IT, creatieve bureaus, professional services — overal waar de behoefte "gestructureerd samenwerken" is en niet "netwerkplanning".
- **In de bouw:** kleinere aannemers, ontwikkelaars, installateurs en toeleveranciers, voor taakbeheer, RFI's, documenten, foto's en budget-op-hoofdlijnen. **Niet** bij de planningsafdelingen van grote aannemers — die draaien P6, Asta Powerproject of MS Project.

### Belangrijkste concurrenten

| Segment | Concurrenten |
|---|---|
| **Directe (work management)** | Asana, ClickUp, Smartsheet, Wrike, Airtable, Notion, Atlassian Jira, Basecamp, Microsoft Planner / Project for the Web |
| **Klassieke CPM (waar monday.com níet meespeelt)** | Oracle Primavera P6, Microsoft Project, Asta Powerproject, TILOS, Deltek Acumen, Spider Project |
| **Bouwspecifiek** | Procore, Autodesk Construction Cloud, Fieldwire, Buildertrend, PlanRadar |
| **4D/BIM-planning** | Synchro 4D, Navisworks TimeLiner, Bexel Manager, Vico Office |

PeerSpot-reviewers vergelijken monday.com in de praktijk vooral met **Airtable, Smartsheet en Asana**, en merken op dat die concurrenten op AI-vlak *"more sophisticated"* zijn en op onboarding *"more streamlined"*.

### Trend (stand juli 2026)

De trendlijn is **duidelijk gekanteld**:

- Omzetgroei vertraagt (van >60% in 2021–22 naar 26,8% in 2025).
- Het aandeel daalde in februari 2026 met 21% op zorgen over **AI-disruptie** van de horizontale SaaS-categorie.
- Juli 2026: **20% personeelsreductie**, aangekondigd in een SEC-filing, expliciet gemotiveerd als *"AI-driven growth strategy"* (TechCrunch, Business Insider, Fast Company, 22 juli 2026). Jefferies merkt op dat de reductie het personeelsbestand terugbrengt naar FY24-niveau en de winstgevendheid versterkt.
- Aandeel **−50% year-to-date**, −44% over zes maanden; marktkapitalisatie **$3,32 mrd**, koers $77,43 (24-07-2026). Analistenconsensus blijft niettemin "Buy" met een gemiddeld koersdoel van $108,33 (25 analisten).
- Het bedrijf bevestigt niettemin dat FY26 *"in-line with or above its guidance"* uitkomt.
- Juni 2026: lancering **Monday Ventures**, een $200 mln durfkapitaalfonds voor Israëlische startups.

**Strategische duiding:** monday.com verbreedt naar *functies* (CRM, service, dev, AI-agents), niet naar *diepte in projectplanning*. De kans dat een echte CPM-engine wordt gebouwd is **[BEOORDELING]** zeer klein — het past niet bij de doelgroep, niet bij de architectuur (het datamodel zou fundamenteel om moeten) en niet bij de huidige AI-gerichte herpositionering.

---

## 8. Eindoordeel

### Wel geschikt voor

- **SMB's en afdelingen zonder planningsspecialist** die grip willen op taken, statussen, verantwoordelijkheden en deadlines.
- **Bouwbedrijven voor het niet-planningswerk:** RFI's, keuringen, opleverpunten, documentbeheer, vergunningen, veldrapportage, foto's, goedkeuringsroutes. Hier is monday.com daadwerkelijk goed.
- **Organisaties waar adoptie zwaarder weegt dan planningsdiepte** — een perfecte P6-planning die niemand opent is minder waard dan een grof bord dat het hele team dagelijks bijwerkt.
- **Als frontend naast een echte planningstool:** de planner werkt in P6/MSP, de uitvoering ziet een afgeleid, leesbaar bord in monday.com. Dit is de meest verdedigbare inzet.
- **Programma-/portfoliocoördinatie op hoofdlijnen** (Enterprise), zolang niemand doet alsof de balken een berekende planning zijn.

### Niet geschikt voor

- **Contractueel gestuurde bouwplanning.** Zonder duur, float, kalenders, lags en constraints is geen enkele planning verdedigbaar tegenover een opdrachtgever, een arbiter of een rechter.
- **Vertragingsanalyse en EOT-claims.** Zonder float en zonder baseline-als-dataobject is time-impact-analyse, as-planned-vs-as-built of windows-analyse onmogelijk.
- **Resource-geleveled planning.** Geen resourcekalenders, geen capaciteitsmodel, geen leveling.
- **Grote planningen.** *[SCHATTING]* boven ~1.000–2.000 regels loopt de tool vast; klassieke bouwplanningen zitten daar één tot twee ordes boven.
- **4D/BIM-workflows.** Geen IFC, geen productkoppeling, geen 4D — punt.
- **Kostengestuurde planning en earned value.** Geen rate, geen cost, geen BCWS/BCWP.
- **Elke situatie waarin "duur", "kalender", "float" en "lag" contractuele betekenis hebben.**

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Nee — en het pretendeert dat zelf ook niet echt, behalve in zijn marketing.**

monday.com concurreert met Asana, ClickUp en Smartsheet, niet met Primavera P6, MS Project of Asta Powerproject. Het verschil is niet gradueel maar **categorisch**: de tool mist het datamodel waarop CPM rust. Een balk met een begin- en einddatum die meeschuift als zijn voorganger verschuift, is geen planning — het is een agenda met pijlen.

Het scherpste bezwaar is dat monday.com dit onderscheid **actief vervaagt**. De featurepagina belooft "Critical paths" en "Baselines"; de blog claimt dat het platform *"automatically calculates the critical path"*. Een koper zonder planningsachtergrond leest dat als "dit vervangt MS Project". Dat is niet zo, en het verschil komt pas aan het licht wanneer er een claim op tafel ligt en niemand de speling kan aantonen.

### Betekenis voor een open-source, IFC-gebaseerde planner

1. **Geen concurrent — wel een referentie.** monday.com is het bewijs dat er een enorme markt is voor toegankelijke, visueel aantrekkelijke planningsinterfaces. Neem de UX-lessen over: kleurcodering, directe manipulatie, nul-drempel-onboarding, onbeperkte kijkers, automatiseringsregels in gewone taal.
2. **Het gat is precies gedefinieerd.** monday.com heeft de UX zonder de CPM-semantiek; P6 en MSP hebben de semantiek zonder de UX; en niemand van hen heeft IFC. Een open-source planner die alle drie combineert — echte CPM (duur, kalenders, float, lags, constraints), toegankelijke UI, en IFC 4.3 als native formaat — bedient een positie die op dit moment leeg is.
3. **Integratie: eenrichtings, en documenteer het verlies.** Een monday.com-koppeling is verdedigbaar als *statuskanaal naar het veld*. Bouw hem nooit als planningsbron, en waarschuw expliciet dat relatietypen, lags, duur en kalender bij export verloren gaan — dat is geen implementatiekeuze maar een eigenschap van monday.com's API.
4. **Concurrentievoordeel om te benoemen.** "Wij berekenen echt een kritiek pad — met een werkkalender, met total float per activiteit, met lags op relaties — en we slaan dat op in IFC 4.3 zodat u er over tien jaar nog bij kunt." Dat is een claim die monday.com niet kan maken, en het is precies waar de markt op vastloopt.

---

## Bronnenlijst

Alle bronnen geraadpleegd op **25 juli 2026**.

### Primaire bronnen — leverancier

1. [monday.com — Pricing](https://monday.com/pricing) — plantiers, prijzen per zetel/maand, zetelminima, gratis tier, plan-features
2. [monday.com — Gantt feature page](https://monday.com/features/gantt) — geclaimde Gantt-functies (task dependencies, critical paths, baselines, milestones)
3. [monday.com — Critical Path Method (blog)](https://monday.com/blog/project-management/critical-path-method/) — de claim over automatische CPM-berekening
4. [monday.com — Gantt chart (blog)](https://monday.com/blog/project-management/gantt-chart/) — Gantt Baseline, dependencies, milestones
5. [monday.com — Construction](https://monday.com/construction) — bouwaanbod, referentieklanten (HOLT CAT, Falkbuilt), 250.000+ klanten
6. [monday.com Investor Relations](https://ir.monday.com/) — (navigatie bereikbaar; kerncijfers via secundaire bron)

### Primaire bronnen — technische documentatie

7. [developer.monday.com — Column types reference](https://developer.monday.com/api-reference/reference/column-types-reference) — **volledige kolomtypelijst; bewijs dat duration/work/cost/rate/baseline ontbreken**
8. [developer.monday.com — Dependency column](https://developer.monday.com/api-reference/reference/dependency) — **"relationship types are not currently exposed by the API"**; dependency_mode flexible/strict/no_action; geen lag/lead
9. [developer.monday.com — Timeline column](https://developer.monday.com/api-reference/reference/timeline) — datumrange-model, `show_weekends`, milestone-visualisatie, rollup-beperkingen
10. [developer.monday.com — Rate limits](https://developer.monday.com/api-reference/reference/rate-limits) — API-calls per dag/minuut per plan, complexity, concurrency
11. [developer.monday.com — Items](https://developer.monday.com/api-reference/reference/items) — paginatie (default 25, max 100), subitem-diepte max 5
12. [developer.monday.com — Webhooks](https://developer.monday.com/api-reference/reference/webhooks) — 19 events; geen schedule-/dependency-events
13. [developer.monday.com — Introduction to GraphQL](https://developer.monday.com/api-reference/docs/introduction-to-graphql) — API-architectuur, versionering, publiek schema

### Reviews en gebruikerservaringen

14. [Software Advice — monday.com profile](https://www.softwareadvice.com/project-management/monday-profile/) — 4,6/5 uit 6.074 reviews; kritiek op prijs, mobiele app, budgettering, AI-integratie
15. [GetApp — monday.com](https://www.getapp.com/project-management-planning-software/a/monday-com/) — 4,6/5 uit 6.074 reviews, 65% vijfsterren; *"performance lag on large boards"*, *"frequent bugs and glitches"*
16. [PeerSpot — monday.com reviews](https://www.peerspot.com/products/monday-com-reviews) — 4,7/5 uit 238 reviews, 98% recommend; kritiek op programma-rapportage, formules/budget, notificaties, kosten bij schaal
17. [SourceForge — monday.com](https://sourceforge.net/software/product/monday.com/) — 4,8/5 uit 98 reviews; performance bij grote datavolumes, basale rapportage
18. [Hacker News (via Algolia)](https://hn.algolia.com/api/v1/search?query=monday.com%20project%20management) — o.a. *"Ask HN: Does anyone use monday.com?"*; kritiek op ontbrekende kernfunctionaliteit in lagere tiers

### Bedrijfs- en marktinformatie

19. [Wikipedia — Monday.com](https://en.wikipedia.org/wiki/Monday.com) — historie, oprichters, IPO, omzet 2025, medewerkers, klantenaantal, Monday Ventures
20. [stockanalysis.com — MNDY](https://stockanalysis.com/stocks/mndy) — marktkapitalisatie, koersontwikkeling, nieuwskoppen juli 2026 (20% personeelsreductie, AI-herstructurering)
21. [stockanalysis.com — MNDY financials](https://stockanalysis.com/stocks/mndy/financials/) — omzet-, bedrijfsresultaat- en nettowinsthistorie 2021–2025 + TTM

### Niet toegankelijk tijdens dit onderzoek (HTTP 403 / geblokkeerd)

`support.monday.com` (helpcentrum — alle Gantt-, baseline- en importartikelen), `g2.com`, `capterra.com`, `trustradius.com`, `gartner.com/reviews`, `trustpilot.com`, `reddit.com` (incl. r/projectmanagement en r/construction), `forbes.com/advisor`, `pcmag.com`, `techradar.com`, `thedigitalprojectmanager.com`, `cloudwards.net`, `community.monday.com` (vereist login).
Waar deze bronnen normaal gesproken bewijs hadden geleverd (met name het monday.com-helpcentrum voor de exacte Gantt-baseline- en kritiek-pad-documentatie, en Reddit/vakfora voor praktijkervaringen van planners), steunt dit profiel op de officiële API-documentatie — die op de doorslaggevende punten (kolomtypen, relatietypen, kalender, lags) juist explicieter en betrouwbaarder is dan marketingpagina's.

---

## Overzicht van gemarkeerde schattingen en beoordelingen

| # | Claim | Status |
|---|---|---|
| 1 | Maandbetalingsprijzen work management | **[INGETROKKEN 25-07-2026]** — de afleiding uit de 18%-korting is weerlegd door monday.com's eigen CRM-prijzen (verhouding ~1,5×). Maandprijs work management is **onbekend**; extrapolatie ~$13–14/$18/$28, niet geverifieerd |
| 2 | Zetelblokken (3, 5, 10, 15, 20, 25, 30, 40…) | **[ONZEKER — afgezwakt 25-07-2026]** — geen brontekst gevonden die vaste blokken bevestigt; alleen minimum 3, default 10 en sales-drempel bij 40 zijn primair bevestigd |
| 3 | Enterprise ~$28–$40/zetel/maand | **[SCHATTING]** — marktinschatting; monday.com publiceert geen Enterprise-prijs |
| 4 | Realistisch max. ~1.000–2.000 regels per board | **[SCHATTING]** — afgeleid uit reviewsignalen en API-paginatie; geen gepubliceerde limiet |
| 5 | "Kritiek pad" is een visuele ketenmarkering, geen berekende backward pass | **[BEOORDELING]** — gefundeerde afleiding uit het ontbreken van float-opslag; monday.com publiceert geen algoritme |
| 6 | MPP-import alleen via marketplace-apps van derden | **[SCHATTING]** — marketplace kon niet volledig worden uitgelezen; geen officiële route gevonden |
| 7 | Kans op een echte CPM-engine in de toekomst is zeer klein | **[BEOORDELING]** — gebaseerd op doelgroep, datamodelarchitectuur en de AI-herpositionering van juli 2026 |
| 8 | TCO-rekenvoorbeelden | **[SCHATTING]** — rekensommen op basis van lijstprijzen, exclusief onderhandelde korting. De Pro-sommen zijn narekenbaar bij de bevestigde $19; de Enterprise-som staat of valt met een niet-gepubliceerd tarief |
| 9 | Marktkapitalisatiedaling "−77,5%" | **[ONZEKER]** — niet herleidbaar; bevestigd zijn −50% YTD, −44% over 6 maanden en $3,32 mrd marktkap |

---

## Verificatie

**Adversariële fact-check uitgevoerd op 25-07-2026** — opzet: elke kernbewering actief proberen te *weerleggen* met onafhankelijke of primaire bronnen, niet bevestigen. Het WebSearch-budget van de sessie was uitgeput; de controle is daarom volledig met gerichte WebFetch op primaire bronnen (monday.com prijspagina's per productlijn, `developer.monday.com`, Wikipedia, stockanalysis.com) plus twee reviewaggregators gedaan. `support.monday.com`, `zapier.com`, `tech.co` en `efficient.app` gaven 403/404/429 en konden niet worden gebruikt.

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | **Jaarprijzen work management:** Free $0 / Basic $9 / Standard $12 / Pro $19 per zetel/mnd; Enterprise op aanvraag | **Bevestigd** — direct herlezen op de prijspagina; secundair bevestigd door GetApp en Software Advice ($9 instapprijs) | [monday.com/pricing](https://monday.com/pricing) · [getapp.com](https://www.getapp.com/project-management-planning-software/a/monday-com/pricing/) · [softwareadvice.com](https://www.softwareadvice.com/project-management/monday-profile/) |
| 2 | **Maandprijzen ~$11 / $15 / $23**, afgeleid uit de 18%-jaarkorting; "historisch $12/$14/$24" | **Gecorrigeerd (weerlegd)** — de 18% is géén bruikbare rekenfactor: monday.com's eigen CRM-pagina toont $12→$18, $17→$25, $28→$41, dus ~1,5× (≈33% besparing). Werkelijke maandprijs work management blijft **onleesbaar** in beide fetches; schatting ingetrokken, extrapolatie ~$13–14/$18/$28 expliciet als onbevestigd gemarkeerd. Voor "$12/$14/$24 historisch" is geen enkele bron gevonden — verwijderd | [monday.com/crm/pricing](https://monday.com/crm/pricing) · [monday.com/pricing](https://monday.com/pricing) |
| 3 | **Minimum 3 zetels** op alle betaalde plannen; zetelkiezer default 10, sales boven 40 | **Bevestigd** — letterlijk *"Plans start from 3 users"* en *"If you want to sign up more than 40 users, you can request a quote from our sales team"*; het 3-zetelminimum staat óók op de CRM-, dev- en service-prijspagina's | [monday.com/pricing](https://monday.com/pricing) · [monday.com/crm/pricing](https://monday.com/crm/pricing) · [monday.com/dev/pricing](https://monday.com/dev/pricing) · [monday.com/service/pricing](https://monday.com/service/pricing) |
| 4 | **Zetels worden in blokken verkocht** (3, 5, 10, 15, 20, 25, 30, 40…), team van 11 betaalt er 15 (+36%) | **Onzeker (afgezwakt)** — poging tot weerlegging geslaagd voor zover mogelijk: de FAQ noemt uitsluitend het minimum van 3 en de drempel van 40 en zegt niets over verplichte blokken; er is geen brontekst die tussenliggende aantallen uitsluit. Claim gedegradeerd van [SCHATTING] naar [ONZEKER]; de TCO-regel is herrekend naar 11 zetels | [monday.com/pricing](https://monday.com/pricing) (FAQ) |
| 5 | **Featuregating:** Gantt/Timeline pas vanaf Standard, tijdregistratie pas vanaf Pro, resource- én portfoliomanagement uitsluitend Enterprise; automatiseringsacties 250 / 25.000 / 250.000; AI-credits 1.000 / 2.000 / 3.000 | **Bevestigd** — alle zes de gates staan zo op de prijspagina; *"Portfolio management"* en *"Resource management"* komen uitsluitend in de Enterprise-kolom voor. Dit onderbouwt de conclusie dat Enterprise feitelijk verplicht is voor planningswerk | [monday.com/pricing](https://monday.com/pricing) |
| 6 | **Overige productlijnen:** CRM $12/$17/$28, dev $9/$12/$20, service $31/$45 (jaar, min. 3 zetels) | **Bevestigd** — alle drie de prijspagina's afzonderlijk opgehaald; CRM toont bovendien maandprijzen $18/$25/$41 en een Ultimate-tier op aanvraag | [monday.com/crm/pricing](https://monday.com/crm/pricing) · [monday.com/dev/pricing](https://monday.com/dev/pricing) · [monday.com/service/pricing](https://monday.com/service/pricing) |
| 7 | **Onbeperkte gratis viewers vanaf Basic**; Free = 2 zetels / 3 boards / 3 docs / 8 kolomtypen | **Bevestigd** — FAQ: *"Unlimited free viewers… read-only access to your account data, with no editing rights"*, inbegrepen vanaf Basic; Free-plan-specificatie letterlijk *"Up to 2 seats"*, *"Up to 3 boards"*, *"Up to 3 Docs"*, *"8 column types"* | [monday.com/pricing](https://monday.com/pricing) |
| 8 | **Enterprise ~$28–$40/zetel/mnd** | **Onzeker** — blijft onverifieerbaar; monday.com publiceert geen Enterprise-tarief en er is geen onafhankelijke bron gevonden die een bedrag noemt. Uitsluitend bruikbaar als marktinschatting, niet als cijfer | — |
| 9 | **Geen CPM-fundament:** geen duration/work/effort/cost/rate/baseline-kolomtype; relatietypen FS/SS/FF/SF niet via API; geen lag/lead; alleen `show_weekends` als "kalender" | **Bevestigd** (kern) / **gecorrigeerd** (telling) — geen van de zes ontbrekende kolomtypen bestaat. Dependency-doc letterlijk: relatietype *"is not currently exposed by the API"*; lag/lead komt er nergens in voor; `dependency_mode` = flexible/strict/no_action. Timeline-kolom: `from`/`to` ISO 8601, géén duration-veld, geen werkdagen/feestdagen. **Correctie:** het aantal kolomtypen is 27 schrijfbaar / 6 read-only / 1 berekend (34), niet 31/6/1 — de oude opsomming telde `Name` en `Board relation` ten onrechte mee en kwam zelf op 30 | [column-types-reference](https://developer.monday.com/api-reference/reference/column-types-reference) · [dependency](https://developer.monday.com/api-reference/reference/dependency) · [timeline](https://developer.monday.com/api-reference/reference/timeline) |
| 10 | **Marketingclaim:** *"monday.com automatically calculates the critical path"* en *"the automation engine instantly propagates changes through all dependent activities"* | **Bevestigd** — beide zinnen staan verbatim op de blogpagina. De featurepagina noemt letterlijk *"Critical paths"*, *"Baselines"*, *"Task dependencies"*, *"Milestones"* en noemt duration, float, lag/lead of werkkalenders nergens. De spanning tussen claim en datamodel is daarmee hard onderbouwd; het oordeel dát het een visuele ketenmarkering is blijft terecht **[BEOORDELING]** | [blog/critical-path-method](https://monday.com/blog/project-management/critical-path-method/) · [features/gantt](https://monday.com/features/gantt) |
| 11 | **API-limieten:** 1.000 / 10.000 / 25.000 calls per dag; 40/100/250 gelijktijdig; paginatie default 25, max 100; subitems max 5 niveaus | **Bevestigd** — alle waarden exact; aanvullend 5.000 requests per 10 s per IP en reset om middernacht UTC. Paginatie *"The default is 25, and the maximum is 100"* en de 5-niveaugrens staan in de items-referentie | [rate-limits](https://developer.monday.com/api-reference/reference/rate-limits) · [items](https://developer.monday.com/api-reference/reference/items) |
| 12 | **Bedrijfscijfers:** omzet 2025 $1.232 mrd (+26,8%), nettowinst $118,7 mln, 3.155 medewerkers, 245.000+/250.000+ klanten, IPO 10-06-2021 Nasdaq MNDY, opgericht 2012 als dapulse | **Bevestigd** — omzetreeks 2021–2025 en resultaten exact gelijk; TTM t/m maart 2026 $1.301 mrd (+25,4%). Klantenaantal *"Join over 250,000 customers"* staat letterlijk op de bouwpagina; Wikipedia bevestigt 245.000+, 3.155 medewerkers, oprichters Mann/Zinman, $1,5 mln seed (aug. 2012), Wix-spin-off, hernoeming 2017, Monday Ventures ($200 mln, juni 2026) | [stockanalysis.com/mndy/financials](https://stockanalysis.com/stocks/mndy/financials/) · [en.wikipedia.org/wiki/Monday.com](https://en.wikipedia.org/wiki/Monday.com) · [monday.com/construction](https://monday.com/construction) |
| 13 | **Marktpositie juli 2026:** 20% personeelsreductie, aandeel −51% YTD, marktkap ~$3,3 mrd, daling ~77,5% | **Deels bevestigd / gecorrigeerd** — de 20%-reductie met AI-motivering en de marktkap van **$3,32 mrd** zijn bevestigd; YTD is **−50%** (niet −51%) en 6-maands −44%. De **"−77,5%"-daling is niet herleidbaar** tot enig gepubliceerd cijfer en is als [ONZEKER] gemarkeerd. Nuance toegevoegd die het pessimisme relativeert: analistenconsensus staat op "Buy" met koersdoel $108,33 | [stockanalysis.com/stocks/mndy](https://stockanalysis.com/stocks/mndy/) |
| 14 | **Reviewscores:** Software Advice 4,6/5 uit 6.074 reviews | **Bevestigd** — score, aantal reviews en de genoemde zwaktes (hoge prijs, mobiele app, budgettering/forecasting) kloppen; aanvullend blijkt 73% van de reviewers uit organisaties met 1–200 medewerkers te komen, wat de SMB-positionering onderbouwt | [softwareadvice.com](https://www.softwareadvice.com/project-management/monday-profile/) |

### Wat deze controle níet heeft kunnen weerleggen

De **CPM-kernconclusie van het profiel staat overeind en is versterkt.** Alle vier de blokkerende bevindingen — geen duur-veld, geen float, geen lags, geen kalendermodel — zijn opnieuw en rechtstreeks in monday.com's eigen API-referentie bevestigd, en de tegenoverliggende marketingclaims zijn verbatim geverifieerd. Er is bij deze controle geen enkele aanwijzing gevonden voor een verborgen duur-, float- of kalendermodel.

### Wat wel is gesneuveld

De zwakke plek van het profiel zat uitsluitend in **prijsafgeleiden, niet in de functionele analyse**: de maandprijzen (afleidingsmethode weerlegd), de zetelblokken (onbewijsbaar) en de marktkapitalisatiedaling (niet herleidbaar). Alle drie waren afgeleide of onthouden cijfers zonder directe brontekst — precies de categorie die bij een adversariële controle als eerste bezwijkt.
