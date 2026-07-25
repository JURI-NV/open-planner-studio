# Wrike — diepgaand softwareprofiel

**Categorie:** collaboratief werkbeheer (CWM) / project- en portfoliomanagement (PPM-light)
**Onderzoeksdatum:** 25 juli 2026
**Analist:** softwareanalyse t.b.v. marktonderzoek planningssoftware (context: opdrachtgever bouwt een open-source, IFC-gebaseerde bouwplanner)

> **Methodologische waarschuwing vooraf.** Tijdens dit onderzoek was het WebSearch-budget van de sessie uitgeput; het onderzoek is uitgevoerd met directe WebFetch-opdrachten op bekende bron-URL's. Daarnaast blokkeerden verschillende reviewplatforms geautomatiseerde toegang: **G2 (HTTP 403), Capterra (404), TrustRadius (403), Gartner Peer Insights (403), Reddit (geblokkeerd), Trustpilot (403), Forbes Advisor (403), PCMag (geblokkeerd), TechRepublic (403), Cloudwards (503), community.wrike.com (503)**. Reviewmateriaal komt daarom uit **Software Advice, GetApp, SelectHub en Tech.co**, aangevuld met **community-threadtitels die zichtbaar zijn in de zoekresultaten van help.wrike.com**. Waar een claim niet primair te verifiëren viel, staat dat expliciet als `[SCHATTING]` of `[NIET GEVERIFIEERD]` vermeld.

---

## 1. Wat het is

### Leverancier en historie

Wrike is in **2006** opgericht door **Andrew Filev**, die het bedrijf aanvankelijk zelf financierde; de bètaversie verscheen in december 2006. De financieringsgeschiedenis verliep als volgt:

| Jaar | Gebeurtenis | Bedrag |
|---|---|---|
| 2012 | Angel-financiering, TMT Investments | $1 mln |
| okt 2013 | Bain Capital | $10 mln |
| mei 2015 | Serie B (Scale Venture Partners, DCM Ventures, Bain Capital) — op dat moment 8.000 klanten, 200 medewerkers, 30.000 nieuwe gebruikers/maand | $15 mln |
| nov 2018 | Meerderheidsinvestering Vista Equity Partners | niet gepubliceerd |
| jan 2021 | **Citrix kondigt overname aan** (afgerond maart 2021) | **$2,25 mrd** |
| 31 jan 2022 | Citrix zelf overgenomen door Vista Equity Partners + Evergreen Coast Capital ($16,5 mrd); Citrix fuseert met TIBCO tot Cloud Software Group | — |
| sep 2022 | Wrike afgesplitst van Citrix Systems | — |
| **juli 2023** | **Eigendom overgedragen aan Symphony Technology Group (STG)** | niet gepubliceerd |

De Citrix-episode is relevant voor de risicobeoordeling: Wrike is in twee-en-een-half jaar tijd drie keer van eigenaar gewisseld (Vista → Citrix → Cloud Software Group → STG). STG is een private-equityhuis dat bekendstaat om carve-outs en kostenoptimalisatie. De huidige CEO is **Thomas Scott**.

**Prijs van de STG-transactie:** niet publiek gemaakt. `[SCHATTING]` Op basis van de $2,25 mrd die Citrix in 2021 betaalde en de gebruikelijke afwaardering bij PE-carve-outs uit die periode, ligt een transactiewaarde in de orde van $0,8–1,5 mrd voor de hand — dit is een gevolgtrekking, geen gerapporteerd cijfer.

### Schaal en bereik (bron: wrike.com/about, opgehaald 25-07-2026)

- **20.000+ klantorganisaties** in **140 landen**
- **2 mln+ gebruikers**
- **1.000+ medewerkers** ("Wrikers worldwide")
- **Grootste enkele account: 215.000+ gebruikers**
- Acht kantoren over drie regio's: Amerika (hoofdkantoor **San Diego**, Costa Rica, datacenter San Jose), Europa (Cyprus, Tsjechië, Frankrijk, Estland, Ierland, datacenter Parijs), Azië-Pacific (India, Japan, Australië)

> Let op een inconsistentie in de bronnen: Wikipedia noemt **San Jose, Californië** als hoofdkantoor (verhuisd uit Mountain View in 2016), terwijl de eigen about-pagina in juli 2026 **San Diego** als hoofdkantoor aanwijst en San Jose alleen als datacenterlocatie. De San Diego-vermelding is recenter en primair; ik houd San Diego aan.

De **EU-datacenterlocatie in Parijs** is voor Nederlandse/Europese bouwbedrijven relevant: Wrike biedt daarmee een EU-datacenteroptie voor AVG-gevoelige projectdata.

### Doelgroep, typische gebruikers, sectoren

Wrike positioneert zich sinds 2024–2026 nadrukkelijk als **"the trusted work delivery platform for people and AI. A system of record for your work"** (CEO Thomas Scott). Het is geen bouwplanner en presenteert zich ook niet als zodanig — pogingen om `wrike.com/construction-project-management/` en `wrike.com/teams/construction-project-management/` op te halen leverden **404's** op; er is geen actieve, onderhouden bouwlandingspagina meer.

**Kerndoelgroepen in de praktijk:**

- **Marketing- en creatieteams** (historisch de sterkste basis — proofing, request forms, digital asset management-integraties)
- **Professional services / bureaus** (Wrike for Professional Services, urenregistratie, factureerbare uren, budgetten)
- **PMO's en portfoliomanagement** bij middelgrote en grote ondernemingen
- **IT- en productteams**
- **Operations / cross-functionele teams** bij enterprises

Genoemde referentieklanten in reviewbronnen: Walmart, Siemens, San Francisco 49ers `[NIET GEVERIFIEERD — afkomstig uit project-management.com, een pagina die overigens verouderde prijsinformatie toont]`.

**Regio's:** sterkst in Noord-Amerika, met substantiële aanwezigheid in West-Europa en groeiend in APAC. De veertien+ ondersteunde interfacetalen en de EU-datacenteroptie maken het bruikbaar in Europa.

**Bouw als sector:** Wrike wordt in de bouw wel gebruikt — help.wrike.com-zoekresultaten tonen ~40 communitythreads waarin bouwbedrijven hun gebruik beschrijven — maar dat is opportunistisch gebruik door bouworganisaties voor kantoor-, voorbereidings- en overheadwerk, niet voor werkplanning op de bouwplaats. Er is **geen enkele bouwspecifieke functionaliteit**: geen submittals, geen RFI's, geen opleverpuntenlijsten, geen tekeningbeheer, geen BIM/IFC.

---

## 2. Functionaliteit en techniek — heeft Wrike een echte CPM-engine?

Dit is de kernvraag voor dit marktonderzoek, en het antwoord is genuanceerder dan bij de meeste werkbeheertools. **Wrike is in 2025–2026 duidelijk opgeschoven richting echte netwerkplanning en zit nu in een grijs middengebied: méér dan een balkenschema, minder dan een CPM-engine.**

### 2.1 Wat er wél is (en dat is meer dan verwacht)

**Vier afhankelijkheidstypen — volledig.**
Bron: help.wrike.com, *Task Dependencies on the Gantt Chart*.

| Type | Wrike's definitie |
|---|---|
| Finish to Start (FS) | "Task B can't start before task A is finished" |
| Start to Start (SS) | "Task B can't start before task A starts" |
| Finish to Finish (FF) | "Task B can't finish before task A is finished" |
| Start to Finish (SF) | "Task A can't finish before Task B starts" |

Bij herplanning geldt: "all dependent active tasks are automatically rescheduled". Taken met status *voltooid, geannuleerd, uitgesteld of verwijderd* schuiven **niet** mee.

**Lead- en lagtijd — aanwezig, maar beperkt.**
Bron: help.wrike.com, *Lead and Lag Time in Task Dependencies* (artikel 1500005126941).
Invoer gebeurt in de kolom **Predecessors**: `-getal` voor lead (overlap), `+getal` voor lag (wachttijd). **Alleen in dagen.** Beschikbaar op Team, Business, Pinnacle, Apex (en legacy Professional/Business/Enterprise); niet op Free.
Gedocumenteerde beperking, letterlijk: *"You can specify lead/lag time only from the table portion of the Gantt chart. When you drag and drop a task on the timeline, lead/lag isn't automatically added."*

**Kritiek pad met float — sinds 2026.**
Bron: help.wrike.com, *Critical Path* (artikel 209604189).
- **Total Float**: "shows how long a task can be delayed without delaying the overall project finish date"
- **Free Float**: "shows how long a task can be delayed without delaying any of its immediate successor tasks"
- Beschikbaar op **Business, Legacy Enterprise, Pinnacle en Apex**; **niet op Free en Team**
- Float-kolommen bestaan **uitsluitend in de New Gantt Chart**, niet in de Classic Gantt
- **Niet zichtbaar** voor Collaborators, Contributors en Viewers

De uitrol is recent: de release-notities in het helpcentrum tonen *"New Gantt Is Now the Default — Featuring Enhanced Critical Path with Float Visibility"* en een release-item *"Required Fields in Workflows, Critical Path in the New Gantt Chart"* gedateerd **20-04-2026**. Kritiek pad met float is dus in Wrike ongeveer **drie maanden oud** op het moment van schrijven.

**Kalenders en werkschema's.**
Bron: help.wrike.com, *Creating Custom Work Schedule* (artikel 1500005123581).
Accountbeheerders maken aangepaste werkschema's met (a) werkdagen, (b) **dagcapaciteit in uren per gebruiker**, (c) kalenderuitzonderingen/feestdagen. Schema's worden **per gebruiker toegewezen**, kunnen gedupliceerd worden, en er zijn bedrijfsbrede niet-werkdagen. Beschikbaar op **Business, Pinnacle, Apex** (en legacy Business/Enterprise); **niet op Free en Team**. Individuele gebruikers voeren zelf vakanties, extra werkdagen en capaciteitswijzigingen in als kalenderuitzonderingen.

**Duur en datumberekening.**
Bron: help.wrike.com, *Scheduling a Task* (artikel 1500005217782).
- Duur in **uren, minuten of dagen**; "If you change the duration of the task the due date is shifted according to the changes you've made" — duur stuurt dus wél de einddatum aan
- Optie **"Working days only"** staat standaard aan; uitzetten laat weekenden meetellen
- **Mijlpaal** = taak waarvan de startdatum wordt verwijderd
- **Backlog** = taken zonder datums, onderaan de tijdlijn
- **Harde limiet: taakduur mag 1.095 dagen (3 jaar) niet overschrijden**

**Baselines — zeer recent uitgebreid.**
Bron: help.wrike.com, *Baseline Tracking* en release-notes juli 2026.
Wrike onderscheidt **baselines** ("your main benchmark") van **Gantt-snapshots** ("checkpoints"). Er is een aparte **Set baseline**-permissie. Gantt-snapshots tonen kolommen **Baseline Start** en **Baseline Due**. In **juli 2026** zijn *Auto-Generated Baseline Fields* toegevoegd: **Baseline start, Baseline due, Baseline duration en Baseline due variance** — als echte, rapporteerbare velden in plaats van alleen een visuele overlay. De marketingpagina bevestigt dit expliciet: baselines worden "into reportable fields rather than visual snapshots alone" geschreven, zodat teams "track schedule variance in dashboards and custom formulas" kunnen.

**Resource- en kostenmodel.**
- **Wrike Resource**: job roles (functierollen), task effort (inspanning), workload charts, bookings (reserveringen op folder-/projectniveau), timesheets, factureerbare uren, capaciteitsbeheer. Resources kunnen op **job-role-niveau** worden gepland, "not the individual" — nuttig voor capaciteitsplanning vóór namen bekend zijn.
- **Budgettering**: onderscheid tussen **cost rate** ("the internal hourly cost of a service, used to calculate your company's labor costs") en **billing rate** (klanttarief); **Custom Hourly Rates for Projects**; financiële velden en formules zoals `Budget - Actual fees` en `Budget - Actual cost`.
- **Budgettering en geavanceerde resource-/capaciteitsplanning zitten pas vanaf Pinnacle** (bron: wrike.com/price).

**API en platform.**
- **REST API v4**, OAuth 2.0, webhooks
- Endpoints o.a.: `tasks`, `/tasks/{id}/dependencies` (GET/POST/PUT/DELETE, inclusief "Change relationType of task dependency"), `folders`, `projects`, `timelogs`, `customfields`, `workschedules` (+ capacity changes, exceptions, partial exceptions, duplicate), `bookings`, `jobroles`, hourly rates
- **Rate limits: 400 requests/minuut per gebruiker, 5.000/minuut per IP-adres**; overschrijding geeft `too_many_requests`
- **Wrike Datahub API** en **BI Export** naar Tableau/Power BI
- **MCP-ondersteuning** (Model Context Protocol) voor koppeling met Claude, ChatGPT en Microsoft Copilot Studio — recent toegevoegd

### 2.2 Wat er níet is — en waarom Wrike geen echte CPM-tool is

Wees hier streng, want dit is precies waar werkbeheertools zichzelf overschatten.

**(a) De kritiek-padbepaling is een heuristiek, geen gedocumenteerde forward/backward pass.**
Wrike's eigen definitie in het helpartikel luidt: het gaat om *"The latest scheduled task in a folder, project, or space"* plus *"Any dependent task where even a one-day delay would push out the final task's end date."* Dat is een beschrijving van een resultaat, niet van een algoritme. Er is **geen documentatie van late start / late finish als velden**, geen projectvoltooiingsdatum als expliciete berekende grootheid, geen datum-datum. Een echte CPM-engine publiceert ES/EF/LS/LF per activiteit; Wrike publiceert alleen total float en free float in de New Gantt. Het verschil is niet academisch: zonder LS/LF kun je geen fatsoenlijke vertragingsanalyse doen.

**(b) Meervoudige afhankelijkheden worden vereenvoudigd — en dat is een echte modelleerfout.**
Letterlijk uit *Task Dependencies on the Gantt Chart*: bij een taak met zowel een SS- als een FF-relatie *"only the Finish-to-Finish (FF) dependency is considered."* Een correcte CPM-engine neemt het **maximum van alle beperkingen** — SS en FF zijn beide bindend en de vroegste start is de strengste van de twee. Wrike gooit er één weg. Dit betekent dat Wrike's netwerkoplossing in samengestelde situaties aantoonbaar afwijkt van de standaardpraktijk (PMBOK/AACE, en van hoe P6 en MS Project rekenen).

**(c) Geen constraint-typen.**
In de volledige helpdocumentatie is **geen enkele verwijzing gevonden** naar de klassieke beperkingstypen: *Start No Earlier Than*, *Finish No Later Than*, *Must Start On*, *As Late As Possible*, *Deadline*. Er zijn alleen start-/einddatums en afhankelijkheden. `[Gebaseerd op afwezigheid in een helpcentrum met >1.000 artikelen; sterke aanwijzing, geen expliciete ontkenning door de leverancier.]`

**(d) Geen resource levelling.**
Gerichte doorzoeking van het helpcentrum op resource levelling leverde niets op. Wrike heeft workload charts die **overbelasting tonen**, maar geen automatische of semi-automatische nivellering die datums verschuift op basis van resourcebeschikbaarheid. Resource-constrained scheduling — de kern van bouwcapaciteitsplanning — ontbreekt.

**(e) Geen datum-datum / voortgangsupdate-model.**
Er is geen aanwijzing voor een **data date (statusdatum)**, geen **retained logic vs. progress override**, geen **remaining duration** als afzonderlijk veld, geen omgang met **out-of-sequence progress**. Voor de bouw is dit fataal: het maandelijkse bijwerken van een aannemersplanning draait juist om die begrippen. Wrike werkt met "percentage voltooid" en statussen, niet met een voortschrijdende statusdatum die het netwerk opnieuw doorrekent vanaf een peildatum. `[Sterke gevolgtrekking uit volledige afwezigheid in documentatie en API.]`

**(f) Geen multi-kalender op activiteitsniveau.**
Werkschema's hangen aan **gebruikers**, niet aan **activiteiten**. In bouwplanning heb je routinematig meerdere kalenders naast elkaar nodig: 5-daagse werkweek voor arbeid, 7-daagse continue kalender voor uitharding van beton, een kalender met weerverletdagen voor buitenwerk, een aparte kalender voor een onderaannemer. Wrike kent alleen een vinkje **"Working days only"** per taak plus het schema van de toegewezen persoon. Dat is te grof.

**(g) Geen earned value / geen S-curves als standaard.**
Er zijn budgetvelden en formules (`Budget - Actual cost`), maar geen gedocumenteerde EVM-grootheden (PV/EV/AC, CPI/SPI, BCWS/BCWP). Kostenbelading van activiteiten met een tijdgefaseerde uitkomst is niet standaard aanwezig; je bouwt het na met custom fields en formules.

**(h) Geen forensische planningsfunctionaliteit.**
Geen time impact analysis, geen fragnet-invoeging, geen windows-analyse, geen DCMA 14-point schedule quality check, geen activity codes, geen WBS-codestructuur in de zin van P6. Voor claimafhandeling en contractuele planningsverplichtingen (NEC, FIDIC, UAV-GC-achtige regimes) is Wrike ongeschikt.

**(i) Nieuwe Gantt is nog niet volwassen.**
Uit de zichtbare communitythreadtitels in het helpcentrum: *"New Gantt chart - critical path is incorrect"*, *"Bug Report: Critical Path fails to surface 'starts-too-early' conflicts"*, *"New gantt chart doesn't keep configurations"*, *"Export to PDF feature for the New Gantt Chart"* (nog niet beschikbaar), en klachten dat de nieuwe Gantt "doesn't offer as much features as the former". De nieuwe Gantt werd in september 2025 algemeen beschikbaar en is inmiddels standaard, maar draagt in juli 2026 nog steeds functiepariteitsschuld ten opzichte van de Classic Gantt.

### 2.3 Platform en schaalbaarheid

- **Levering:** pure SaaS (multi-tenant cloud). Web, desktop-apps (Windows/macOS) en mobiel (iOS/Android). **Geen on-premise optie.**
- **Datacenters:** VS (San Jose) en EU (Parijs)
- **Harde gedocumenteerde limieten:** taakduur ≤ **1.095 dagen**; API **400 req/min per gebruiker**, **5.000 req/min per IP**
- **Opslag per plan:** Free 2 GB per account; Team tot 2 GB per gebruiker; Business 5 GB per gebruiker; Pinnacle 15 GB per gebruiker; Apex 50 GB per gebruiker
- **Realistisch aantal taken:** Wrike publiceert **geen** maximum aantal taken per project of per account. Het grootste account telt 215.000+ gebruikers, wat op enorme datavolumes wijst. Maar dat is accountbreed, niet per planning.

`[SCHATTING — belangrijk voor de opdrachtgever]` Op basis van consistente gebruikersmeldingen over "lag and slow performance" en het feit dat de Gantt een browsergebaseerde weergave over een generieke takenlijst is, schat ik het **praktische werkbare bereik van één Wrike-Gantt op ruwweg 500–2.000 taken**, met merkbare degradatie daarboven. Ter vergelijking: een bouwplanning voor een middelgroot utiliteitsproject telt al snel 2.000–5.000 activiteiten, een groot infraproject 10.000–50.000. Primavera P6 verwerkt honderdduizenden activiteiten per project. **Dit cijfer is een inschatting, niet door Wrike gepubliceerd of door mij getest.**

### 2.4 Eindoordeel op de techniekvraag

**Wrike is geen echte CPM-tool, maar het is ook niet meer eerlijk om te zeggen dat het "alleen een balkenschema tekent".** Het heeft alle vier de relatietypen, lead/lag in dagen, kritiek pad, total en free float, werkkalenders met dagcapaciteit, en sinds juli 2026 rapporteerbare baselinevelden. Dat is aanzienlijk meer netwerkplanning dan Asana, monday.com, Trello of Notion bieden.

Maar het is een **CPM-benadering, geen CPM-implementatie**: de kritiek-padbepaling is heuristisch beschreven zonder LS/LF-velden, meervoudige afhankelijkheden worden aantoonbaar verkeerd samengevoegd (alleen FF telt bij SS+FF), beperkingstypen ontbreken, resource levelling ontbreekt, en er is geen statusdatum-/voortgangsmodel. Voor bouwplanning waar de planning een **contractueel document** is, is dat diskwalificerend.

---

## 3. Prijzen

**Primaire bron: <https://www.wrike.com/price/> — opgehaald 25 juli 2026.** Alle bedragen in USD, facturering op **jaarbasis per gebruiker** tenzij anders vermeld.

### Abonnementen

| Plan | Prijs (USD/gebruiker/maand, jaarlijks) | Prijs per jaar | Zetels | Opslag | Kernfuncties |
|---|---|---|---|---|---|
| **Free** | $0 | $0 | Onbeperkt | 2 GB/account | Web/desktop/mobiel, basis taak- en projectbeheer, board view, table view. **Geen Gantt, geen kritiek pad, geen lead/lag.** |
| **Team** | **$10** | $120 | **2–15** | tot 2 GB/gebruiker | Alles uit Free + AI Essentials, deelbare dashboards, **"Interactive Gantt charts"**, lead/lag. **Geen kritiek pad, geen float, geen werkschema's.** |
| **Business** | **$25** | $300 | **5–200** | 5 GB/gebruiker | Alles uit Team + AI Elite, workspace templates, standaardintegraties, **kritiek pad + total/free float**, **custom work schedules**. |
| **Pinnacle** | **Op aanvraag** | — | niet gespecificeerd | 15 GB/gebruiker | Alles uit Business + **geavanceerde resource- en capaciteitsplanning**, **budgettering (financiën volgen)**, geavanceerde rapportage/BI, 3× AI Elite-acties. |
| **Apex** (nieuw) | **Op aanvraag** | — | niet gespecificeerd | 50 GB/gebruiker | Alles uit Pinnacle + onbeperkte whiteboards, **Wrike Integrate**, **Wrike Sync**, 10× AI Elite-acties. |

> **Afwijking in bronnen:** Tech.co (opgehaald 25-07-2026) noemt de Business-prijs **$24,80/gebruiker/maand**; Wrike's eigen prijspagina toont op dezelfde dag **$25**. Waarschijnlijk een recente afronding naar boven of een regionale weergave. Reken op **$25**.

### Add-ons (bron: wrike.com/price, 25-07-2026)

| Add-on | Prijs |
|---|---|
| **Wrike Whiteboard** | **$15/gebruiker/maand** |
| Wrike Integrate (iPaaS) | Op aanvraag |
| Wrike Two-Way Sync | Op aanvraag |
| Wrike Datahub | Op aanvraag |
| **Wrike Lock** (klantbeheerde encryptiesleutels) | Op aanvraag |
| AI Elite action pack | Op aanvraag |

`[SCHATTING]` Wrike Lock werd historisch als los enterprise-item verkocht in de orde van **$10–15/gebruiker/maand**; Wrike Integrate in de orde van **$5–10/gebruiker/maand** afhankelijk van actievolume. Deze bedragen zijn **niet gepubliceerd** en berusten op marktpraktijk — behandel ze als indicatief.

### Reële kosten voor een bouworganisatie — rekenvoorbeeld

`[SCHATTING — de Pinnacle-prijs is niet gepubliceerd]` Op basis van de vuistregel dat Pinnacle circa 1,7–2,0× Business kost, kom je op **$42–50/gebruiker/maand**. Voor een planningsafdeling die kritiek pad, float, werkkalenders, resourceplanning én budgettering nodig heeft, is **Pinnacle het minimum**:

| Scenario | Plan | Zetels | Kosten/jaar `[SCHATTING]` |
|---|---|---|---|
| Klein bouwbedrijf, alleen planners | Business | 10 | **$3.000** (hard cijfer) |
| Middelgroot, planners + projectleiding + resource/budget | Pinnacle | 40 | **$20.000–24.000** |
| Enterprise met integraties en encryptiesleutels | Apex + add-ons | 150 | **$90.000–130.000+** |

### Belangrijke prijsstructurele opmerkingen

1. **Zetelminima en -maxima bijten.** Team stopt bij **15 gebruikers**, Business bij **200**. Een organisatie die door 200 zetels heen groeit, wordt gedwongen naar Pinnacle/Apex met niet-gepubliceerde prijzen — een klassieke lock-in-trap.
2. **Business heeft een minimum van 5 zetels.** Een planningsafdeling van 2 personen betaalt dus voor 5 (**$1.500/jaar**) of moet genoegen nemen met Team, wat géén kritiek pad heeft.
3. **De functies die je voor planning nodig hebt, zitten hoog.** Kritiek pad en float: Business+. Werkkalenders: Business+. Resource-/capaciteitsplanning en budgettering: **Pinnacle+**, dus prijs op aanvraag.
4. **Maandelijkse facturering:** de FAQ-pagina (`wrike.com/price/faq/`) gaf een **404**; de prijspagina vermeldt uitsluitend "annual per-user basis". `[SCHATTING]` Wrike hanteerde historisch een maandelijkse optie met circa 20–25% opslag; ga daar niet blind van uit — laat het bevestigen door sales.
5. **Valuta:** alleen USD-prijzen gepubliceerd. EUR/GBP-prijzen lopen via sales. `[NIET GEVERIFIEERD]`
6. **Non-profit-/onderwijskorting:** niet aangetroffen op de opgehaalde pagina's. `[NIET GEVERIFIEERD]`

---

## 4. VOORDELEN — 8 onderbouwde punten

1. **Alle vier de afhankelijkheidstypen plus lead/lag — zeldzaam in deze categorie.** FS, SS, FF én SF zijn volledig geïmplementeerd, met lead/lag in dagen via de Predecessors-kolom (`-3` / `+5`). De overgrote meerderheid van de werkbeheerconcurrenten (Asana, monday.com, Trello, Notion, Basecamp) doet alleen FS of helemaal geen relaties. *(Bron: help.wrike.com, Task Dependencies on the Gantt Chart; Lead and Lag Time in Task Dependencies)*

2. **Kritiek pad mét total float én free float — en beide correct onderscheiden.** Sinds april 2026 toont de New Gantt beide floatsoorten in eigen kolommen, met negatieve float die automatisch achterstand markeert. Wrike definieert ze bovendien correct: total float t.o.v. de projecteinddatum, free float t.o.v. de directe opvolgers. Dat is een echt planningsconcept, geen marketingversiering. *(Bron: help.wrike.com, Critical Path)*

3. **Rapporteerbare baselinevelden, niet alleen een visuele overlay.** Sinds juli 2026 genereert Wrike **Baseline start, Baseline due, Baseline duration en Baseline due variance** als velden die je in dashboards, filters en custom formules kunt gebruiken. Daarmee kun je schedule variance over een hele portfolio meten — iets waar veel duurdere PPM-tools moeite mee hebben. *(Bron: help.wrike.com, Baseline Tracking + release-notes juli 2026)*

4. **Werkschema's met echte dagcapaciteit in uren.** Niet alleen "welke dagen zijn werkdagen", maar **hoeveel uur per dag per persoon**, plus kalenderuitzonderingen die medewerkers zelf kunnen invullen (vakantie, extra werkdagen, capaciteitswijzigingen). Dat is een volwassener capaciteitsmodel dan de meeste concurrenten. *(Bron: help.wrike.com, Creating Custom Work Schedule; Managing Daily Capacity in Work Schedules)*

5. **Resourceplanning op functierolniveau vóórdat namen bekend zijn.** Job roles + bookings op folder-/projectniveau maken capaciteitsplanning mogelijk zonder individuele toewijzing — "management at the job role level, not the individual". Voor voorcalculatie en tenderfase is dat precies de juiste abstractie.

6. **Volwassen, breed en goed gedocumenteerd API-platform.** REST v4 met OAuth 2.0, webhooks, en endpoints voor vrijwel alles wat telt: `dependencies` (inclusief wijzigen van relationType), `workschedules` met capacity changes en exceptions, `bookings`, `jobroles`, `timelogs`, `customfields`. Ruime rate limits (400/min per gebruiker, 5.000/min per IP). Plus Datahub API en BI-export naar Tableau/Power BI. Voor een organisatie die wil integreren of migreren is dit uitstekend gereedschap.

7. **Sterke, consistente gebruikerswaardering op schaal.** Software Advice: **4,4/5 over 3.027 geverifieerde reviews** (bruikbaarheid 4,2 / support 4,3 / prijs-kwaliteit 4,2 / functionaliteit 4,3). SelectHub aggregeert **85% tevredenheid over 8.888 reviews** van vijf platforms. Tech.co geeft 4,4/5. Dat is een breed en stabiel positief signaal, geen cherry-picking.

8. **EU-datacenter en enterprise-beveiliging.** Datacenter in Parijs naast San Jose, SSO, 2FA, en **Wrike Lock** voor klantbeheerde encryptiesleutels. Voor Europese organisaties met AVG-eisen op projectdata is dat een concreet voordeel boven Amerikaanse concurrenten zonder EU-regio. *(Bron: wrike.com/about; Tech.co: "Excellent security options, including single sign-on and two-factor authentication")*

---

## 5. NADELEN — 10 eerlijke punten

1. **Meervoudige afhankelijkheden worden aantoonbaar fout samengevoegd.** Wrike's eigen documentatie stelt dat wanneer een taak zowel een SS- als een FF-relatie heeft, *"only the Finish-to-Finish (FF) dependency is considered."* Een correcte CPM-engine neemt het maximum van álle bindende beperkingen. Dit is geen randgeval — in bouwplanningen met overlappende werkgangen (SS+FF-paren zijn dáár juist de standaardconstructie voor parallel werk) levert Wrike systematisch te vroege startdata op. *(Bron: help.wrike.com, Task Dependencies on the Gantt Chart)*

2. **Het kritieke pad wordt door gebruikers als onbetrouwbaar gerapporteerd.** In het helpcentrum zichtbare communitythreads: *"New Gantt chart - critical path is incorrect"* en *"Bug Report: Critical Path fails to surface 'starts-too-early' conflicts"*. Voor een functie die drie maanden oud is en die je gebruikt om deadlines te bewaken, is dat een serieus vertrouwensprobleem.

3. **De herplanningsengine doet niet wat planners verwachten.** Concrete gebruikersklacht via SelectHub: *"When a delay happens, the system doesn't always adjust the way you'd expect… Wrike left them with the original dates… wasted a full workday."* Dat is precies de kernbelofte van netwerkplanning die hier faalt.

4. **De nieuwe Gantt heeft functiepariteitsschuld ten opzichte van de oude.** Gebruikers melden dat de New Gantt *"doesn't offer as much features as the former"*, dat hij configuraties niet bewaart (*"New gantt chart doesn't keep configurations"*), en dat **PDF-export voor de New Gantt ontbreekt** (openstaand verzoek). Bestaande Gantt-export is bovendien statisch: *"Current Gantt Chart exports are static, users can't adjust the visible timeframe, zoom level, or export window."* Je bent gedwongen naar de nieuwe Gantt (die is sinds 2026 standaard) maar levert daarmee functionaliteit in.

5. **Geen resource levelling en geen beperkingstypen.** Workload charts tónen overbelasting maar lossen niets op — er is geen automatische nivellering. En er is geen enkel constraint-type (Start No Earlier Than, Must Finish On, As Late As Possible, Deadline). Twee fundamentele CPM-bouwstenen ontbreken volledig.

6. **Geen statusdatum-/voortgangsmodel — fataal voor bouwupdates.** Geen data date, geen remaining duration, geen retained logic vs. progress override, geen omgang met out-of-sequence progress. De maandelijkse planningsactualisatie die elke aannemer moet leveren, kun je in Wrike niet volgens de regels uitvoeren. `[Gevolgtrekking uit volledige afwezigheid in documentatie en API — sterke aanwijzing, geen expliciete leverancierserkenning.]`

7. **Steile leercurve en overweldigende interface — de meest consistente klacht in alle reviewbronnen.** Software Advice/GetApp: *"Interface can feel overwhelming for new users."* SelectHub citeert een manager: *"some team members found the interface overwhelming, especially with all the available features"* en dat teams *"often defaulted to email instead of logging issues in Wrike, which created gaps in tracking."* Tech.co scoort Wrike op gebruiksgemak 4,1/5 tegen 4,5/5 voor monday.com. Voor bouwuitvoerders en onderaannemers — geen powerusers — is dit een reëel adoptierisico.

8. **Prestatieproblemen bij omvang.** GetApp-reviews melden *"lag and slow performance"*; SelectHub noemt *"occasional desktop app lag"* als gedocumenteerde beperking. Combineer dat met de harde limiet van 1.095 dagen taakduur en het ontbreken van gepubliceerde taaklimieten, en de schaalbaarheid voor grote bouwplanningen is op zijn best onbewezen. `[SCHATTING: praktisch bereik 500–2.000 taken per Gantt.]`

9. **Prijsstructuur is duur, ondoorzichtig en gefragmenteerd.** *"Pricing can be prohibitive, confusing, and restrictive, especially for small teams"* (GetApp). De functies die planners nodig hebben zijn gelaagd over drie prijspunten: Gantt op Team ($10), kritiek pad + kalenders op Business ($25), resource- en budgetplanning pas op **Pinnacle (prijs op aanvraag)**. Whiteboards kosten **$15/gebruiker/maand extra** — meer dan het hele Team-abonnement. Business is bovendien geplafonneerd op 200 zetels. Tech.co: Wrike is duurder dan ClickUp ($7/gebruiker/maand).

10. **Geen telefonische of live-chat-support, en drie eigenaarswisselingen in vier jaar.** Tech.co noemt expliciet *"No phone or live chat customer support"*. Daarnaast: Vista → Citrix ($2,25 mrd, 2021) → Cloud Software Group (2022) → **Symphony Technology Group (juli 2023)**. Drie PE-gedreven eigenaarswisselingen in korte tijd, met een sterke strategische zwenking naar AI in 2026 (AI Agent Builder, OpenAI GPT Store, Strategic Portfolio Management). Voor een tool waarin je meerjarige projectplanningen onderbrengt, is die instabiliteit een leveranciersrisico dat je moet meewegen.

---

## 6. Interoperabiliteit — cruciaal gezien de IFC-context

| Formaat | Import | Export | Bron / opmerking |
|---|---|---|---|
| **IFC 4.3 (IfcWorkSchedule / IfcTask)** | ❌ **Nee** | ❌ **Nee** | Doorzoeking van help.wrike.com op "BIM IFC Revit AutoCAD construction": **geen enkel resultaat over native ondersteuning**. Geen CAD-import, geen BIM-modelintegratie. |
| **Primavera P6 (.xer)** | ❌ **Nee** | ❌ **Nee** | Zoekopdracht "Primavera P6 XER" op help.wrike.com: letterlijk *"No results for 'Primavera P6 XER'"*. |
| **P6 XML** | ❌ Nee | ❌ Nee | Idem — geen enkele vermelding. |
| **MS Project (.mpp)** | ✅ **Ja** | ❌ **Nee** | *"Files can be imported from MS Project to Wrike, but you can't export data from Wrike to MS Project."* Import via Import > MS Project in de doelmap/-project/-space. |
| **MSPDI (MS Project XML)** | ⚠️ Onduidelijk | ❌ Nee | Het detailartikel (20960514) gaf een 404; welke extensies exact (.mpp / .xml / .mpx) worden geaccepteerd is niet vastgesteld. `[NIET GEVERIFIEERD]` |
| **Excel / XLS** | ✅ Ja | ✅ Ja | Bulkimport van folders, projecten, subfolders en subprojecten. Afhankelijkheden via een tekstsyntaxis in de predecessorkolom, bijv. **`2SS`** voor start-to-start. Export via *Exporting Table Chart Reports to Excel*. |
| **CSV** | ⚠️ Beperkt | ⚠️ Beperkt | Genoemd, maar niet apart gedocumenteerd naast XLS. `[NIET GEVERIFIEERD]` |
| **PDF** | — | ✅ Ja (statisch) | Gantt-download beschikbaar voor Classic; **ontbreekt nog voor de New Gantt**. Export is statisch: geen instelbaar tijdvenster, zoomniveau of exportvenster. |
| **iCal** | ⚠️ Onbekend | ⚠️ Onbekend | Niet vastgesteld in de doorzochte documentatie. `[NIET GEVERIFIEERD]` |
| **REST API v4** | ✅ | ✅ | OAuth 2.0, webhooks. Endpoints: tasks, `/tasks/{id}/dependencies` (incl. wijzigen relationType), folders, projects, timelogs, customfields, workschedules (+ capacity changes/exceptions), bookings, jobroles, hourly rates. **400 req/min per gebruiker, 5.000 req/min per IP.** |
| **BI-export** | — | ✅ | Wrike Datahub API + BI Export naar Tableau/Power BI (Datahub is add-on / Pinnacle+). |
| **MCP** | ✅ | ✅ | Model Context Protocol-server voor Claude, ChatGPT en Microsoft Copilot Studio. |

### Wat dit betekent voor een IFC-gebaseerde open-source planner

De conclusie is scherp: **Wrike is voor een IFC-workflow een gesloten eindpunt.**

- **Er is geen IFC-pad.** Niet in, niet uit. Er bestaat geen concept van `IfcTask`, `IfcWorkSchedule`, `IfcWorkCalendar` of 4D-koppeling aan bouwelementen. Wrike-taken kennen geen relatie met bouwobjecten.
- **Het is een eenrichtings-doodlopende weg richting de bouwketen.** Je kunt MS Project *naar binnen* halen, maar je krijgt **niets** in MPP of XER *naar buiten*. Zodra een planning in Wrike zit, kun je hem niet meer teruggeven aan een hoofdaannemer die P6 of MS Project draait, behalve via handmatige Excel-tussenstappen die relaties, lags, kalenders en baselines verliezen.
- **De API is de enige serieuze integratieroute** — en die is goed genoeg. `/tasks/{id}/dependencies` met relationType, plus `workschedules` met capaciteit en uitzonderingen, geeft je genoeg om een tweerichtingsbrug te bouwen. Een open-source IFC-planner zou een Wrike-connector kunnen schrijven die `IfcTask`↔Wrike-task en `IfcRelSequence`↔Wrike-dependency mapt.
- **De semantische mapping verliest wel informatie.** Wrike kent geen constraints, geen LS/LF, geen datum-datum, geen activiteitskalenders en geen resource-nivellering. Een IFC-planning met `IfcTaskTime` (inclusief `EarlyStart`, `LateStart`, `FreeFloat`, `TotalFloat`, `IsCritical`) is **rijker** dan wat Wrike kan opslaan. De rondgang IFC → Wrike → IFC is lossy.
- **Praktische positionering:** Wrike is voor deze opdrachtgever eerder een **doelsysteem voor uitgifte** (het managementteam wil de planning zien in de tool die het bedrijf toch al gebruikt) dan een bron- of uitwisselingsformaat. Bouw de connector als eenrichtings-push, niet als synchronisatie.

---

## 7. Marktpositie

### Waar Wrike sterk staat, en waarom

- **Marketing- en creatieteams.** Dit is Wrike's historische kernmarkt en nog steeds zijn sterkste. Proofing (afbeeldingen en video), request forms, blueprints, en integraties met digital asset management maken het een natuurlijke keuze voor bureaus en interne marketingafdelingen.
- **Professional services.** De combinatie van urenregistratie, factureerbare uren, cost rate vs. billing rate, custom hourly rates per project en budgetformules maakt Wrike bruikbaar als lichte PSA-tool.
- **Middelgrote tot grote ondernemingen met cross-functioneel werk.** Het grootste account telt 215.000+ gebruikers; dat is geen bescheiden schaal. Wrike's kracht ligt in het standaardiseren van aanvraag- en goedkeuringsstromen over veel afdelingen heen.
- **Configureerbaarheid.** SelectHub noemt "customizable" als eerste sterkte: aanpasbare views, workflows, custom fields en formules. Wrike is een platform waarop je een proces bouwt, geen kant-en-klare oplossing.
- **Enterprise-beveiliging en EU-datacenter.** SSO, 2FA, Wrike Lock met klantbeheerde sleutels, datacenter Parijs.

### Belangrijkste concurrenten

| Segment | Concurrenten | Wrike's positie |
|---|---|---|
| **Collaboratief werkbeheer** | monday.com, Asana, ClickUp, Smartsheet, Notion | Wrike is functioneel dieper (echte relaties, float, kalenders) maar minder gebruiksvriendelijk. Tech.co: monday.com 4,7/5 totaal vs. Wrike 4,4/5; gebruiksgemak 4,5 vs. 4,1. ClickUp is fors goedkoper ($7 vs. $10/$25). |
| **Marketing work management** | Adobe Workfront, Asana | Directe strijd met Workfront; Wrike goedkoper en toegankelijker, Workfront dieper geïntegreerd in de Adobe-stack. |
| **Enterprise PPM** | Planview, Clarity, ServiceNow SPM, Microsoft Project for the web / Planner Premium | Wrike duwt hier sinds juli 2026 naar binnen met **Strategic Portfolio Management**; nog een uitdager, geen gevestigde speler. |
| **Klassieke CPM-planning** | **Oracle Primavera P6, Microsoft Project Desktop, Asta Powerproject, Deltek Acumen** | **Wrike concurreert hier niet en probeert dat ook niet.** Geen XER, geen P6 XML, geen MPP-export, geen levelling, geen forensische analyse. |
| **Bouwspecifiek** | Procore, Autodesk Construction Cloud, Bluebeam, Fieldwire, Buildertrend, Asta Powerproject | **Wrike is hier volledig afwezig** — geen bouwlandingspagina meer (404), geen submittals/RFI's/oplevering/tekeningbeheer/BIM. |

### Trend

- **Sterke AI-zwenking in 2026.** De persberichtenpagina toont in juli 2026: **AI Agent Builder** (conversationele agent-bouwer, ook beschikbaar in de OpenAI GPT Store), **Strategic Portfolio Management**, en MCP-ondersteuning voor Claude/ChatGPT/Copilot Studio. De AI Elite-actielimieten zijn expliciet een verkoophefboom geworden (Pinnacle 3×, Apex 10×). Wrike verkoopt zichzelf nu als *"the trusted work delivery platform for people and AI"*.
- **Gelijktijdige verdieping van de planningskern.** Opvallend: terwijl AI de marketingboodschap domineert, is Wrike in 2025–2026 juist ook echte planningsfunctionaliteit gaan bouwen — New Gantt algemeen beschikbaar (sep 2025), kritiek pad met float (apr 2026), auto-gegenereerde baselinevelden (jul 2026). Dat suggereert dat Wrike de enterprise-PPM-markt serieus aanvalt. Het is een beweging in de goede richting, maar hij is jong en bugvrij is hij niet.
- **Nieuw Apex-plan.** De introductie van een vijfde, hoogste laag boven Pinnacle wijst op een klassieke PE-monetiseringsstrategie: functies naar boven verschuiven en de bovenkant duurder maken.

### Gebruikersaantallen en omzet

**Hard (bron: wrike.com/about, 25-07-2026):** 20.000+ klantorganisaties, 140 landen, 2 mln+ gebruikers, 1.000+ medewerkers, grootste account 215.000+ gebruikers.

**Omzet:** Wrike is in private-equityhanden (STG) en publiceert **geen** financiële cijfers. Growjo, Sacra en 6sense waren tijdens dit onderzoek niet bereikbaar (403/404).
`[SCHATTING — expliciet gemarkeerd]` Afgeleid uit de Citrix-transactie van $2,25 mrd in januari 2021: bij de SaaS-multiples van dat moment (10–15× ARR) impliceert dat een ARR van ruwweg **$150–225 mln in 2020/2021**. Met 2 mln gebruikers waarvan een deel op het gratis plan, en bij bescheiden groei onder PE-eigendom, schat ik de huidige ARR op **$200–300 mln**. **Dit is een berekende gevolgtrekking op basis van transactiewaarde en multiples, geen gerapporteerd cijfer — behandel het als een orde van grootte, niet als een feit.**

---

## 8. Eindoordeel

### Voor wie wel

- **Marketing-, creatieve en communicatieafdelingen binnen bouw- en vastgoedorganisaties.** Voor tenderteams, communicatie en documentgoedkeuring is Wrike uitstekend: proofing, request forms, workflows.
- **Bouwgerelateerde professional-services-organisaties** — architecten-, ingenieurs- en adviesbureaus die projecten op uren en budgetten sturen in plaats van op een kritiek pad. Cost rate vs. billing rate, timesheets en projectbudgetten zijn hier de juiste gereedschappen.
- **PMO's die portfolio-overzicht willen** over veel middelgrote projecten, waarbij de individuele planning niet contractueel bindend is. De nieuwe baselinevelden maken portfoliobrede schedule-variance-rapportage realistisch.
- **Organisaties die het als vervanger van Asana/monday.com overwegen** en méér planningsdiepte willen: Wrike is daar objectief de sterkste optie van het stel.
- **Voorbereiding en engineering in de bouw** (het kantoorwerk vóór de schop de grond in gaat): tekeningengoedkeuring, vergunningen, inkooptrajecten, leveranciersafstemming. Daar volstaan Wrike's relaties en kalenders prima.

### Voor wie niet

- **Iedereen die een contractueel bindende bouwplanning moet leveren.** Geen datum-datum, geen retained logic/progress override, geen remaining duration, geen constraint-typen, geen multi-kalender per activiteit, geen resource levelling, geen LS/LF-velden, en een gedocumenteerde fout in de behandeling van SS+FF-combinaties. Een planning uit Wrike overleeft geen planningsreview van een opdrachtgever of een claimdeskundige.
- **Grote projecten.** Taakduur is gelimiteerd op 1.095 dagen (3 jaar) — dat sluit meerjarige infraprojecten al bij de eerste hoofdactiviteit uit. Prestatieklachten en het ontbreken van gepubliceerde taaklimieten maken planningen boven `[SCHATTING]` ~2.000 activiteiten riskant.
- **Organisaties in een P6- of MS-Project-keten.** Je kunt MS Project importeren maar niets exporteren. Geen XER, geen P6 XML. Wrike is een eenrichtingsput in de bouwketen.
- **Uitvoeringsteams op de bouwplaats.** Geen submittals, RFI's, opleverpunten, tekeningbeheer, dagrapporten of BIM/IFC. Procore, Autodesk Construction Cloud en Fieldwire doen dit; Wrike doet er niets van.
- **Kleine planbureaus.** Business heeft een minimum van 5 zetels ($1.500/jaar) en Team — het enige goedkope plan — heeft **geen** kritiek pad, geen float en geen aangepaste werkkalenders. De prijs-functieverhouding is voor een klein planningsteam ongunstig.

### Is Wrike een serieus alternatief voor klassieke CPM-tools?

**Nee — maar met een belangrijke nuance die je in dit marktonderzoek niet moet weglaten.**

Wrike is in 2025–2026 het werkbeheerpakket geworden dat het dichtst bij echte netwerkplanning komt. Vier relatietypen, lead/lag, kritiek pad, total én free float, werkkalenders met dagcapaciteit, en rapporteerbare baselinevelden — dat is een serieuze planningsbasis waar Asana, monday.com en ClickUp niet in de buurt komen. Wie stelt dat Wrike "alleen maar een balkenschema tekent" heeft de releases van april en juli 2026 gemist.

Maar het blijft een **CPM-benadering, geen CPM-implementatie**. De drie diskwalificerende gebreken zijn:

1. **Rekenkundig incorrect bij samengestelde relaties** — bij SS+FF telt alleen FF, terwijl het maximum van beide bindend hoort te zijn. Dat is geen ontbrekende feature maar een fout in de engine.
2. **Geen voortgangsmodel** — zonder datum-datum, remaining duration en retained-logic-keuze kun je een lopende bouwplanning niet volgens de regels van het vak bijwerken.
3. **Geen uitgangspad** — geen XER, geen P6 XML, geen MPP-export. Wat erin gaat, komt er niet in bruikbare planningsvorm uit.

Voor de opdrachtgever die een **open-source, IFC-gebaseerde planner** bouwt is de conclusie tweeledig. Ten eerste: **Wrike is geen concurrent** — het speelt in een andere markt (werkbeheer, niet bouwplanning) en heeft nul IFC-, BIM- of bouwfunctionaliteit. Ten tweede, en nuttiger: **Wrike is een goede maatstaf voor wat "genoeg CPM" betekent voor de niet-specialistische markt**, en dankzij de goed gedocumenteerde REST API v4 een realistisch **integratiedoel**. Een eenrichtings-connector die `IfcTask` → Wrike-task en `IfcRelSequence` → Wrike-dependency (met relationType en lag) pusht, is technisch goed haalbaar en geeft managementlagen zicht op de planning in de tool die zij toch al gebruiken. Verwacht daarbij informatieverlies: IFC's `IfcTaskTime` met `EarlyStart`, `LateStart`, `FreeFloat`, `TotalFloat` en `IsCritical` is rijker dan Wrike's datamodel kan vasthouden.

---

## Bronnen

Alle bronnen opgehaald op **25 juli 2026**, tenzij anders vermeld.

**Leverancier — primair**
1. [Wrike Pricing](https://www.wrike.com/price/) — plannen, prijzen, zetellimieten, add-ons
2. [Wrike About](https://www.wrike.com/about/) — historie, eigendom, leiderschap, klant-/gebruikersaantallen, kantoren
3. [Wrike Newsroom](https://www.wrike.com/news/) — AI Agent Builder, Strategic Portfolio Management (juli 2026)
4. [Wrike Gantt Chart features](https://www.wrike.com/features/gantt-chart/) — claims over kritiek pad, float, baselines

**Officiële documentatie — help.wrike.com**
5. [Critical Path (art. 209604189)](https://help.wrike.com/hc/en-us/articles/209604189-Critical-Path) — total/free float, planbeschikbaarheid, beperkingen
6. [Task Dependencies on the Gantt Chart (art. 209604229)](https://help.wrike.com/hc/en-us/articles/209604229-Task-Dependencies-on-the-Gantt-Chart) — FS/SS/FF/SF, SS+FF-vereenvoudiging
7. [Lead and Lag Time in Task Dependencies (art. 1500005126941)](https://help.wrike.com/hc/en-us/articles/1500005126941-Lead-and-Lag-Time-in-Task-Dependencies) — invoersyntaxis, beperkingen, plannen
8. [Creating Custom Work Schedule (art. 1500005123581)](https://help.wrike.com/hc/en-us/articles/1500005123581-Creating-Custom-Work-Schedule) — werkdagen, dagcapaciteit, uitzonderingen
9. [Scheduling a Task (art. 1500005217782)](https://help.wrike.com/hc/en-us/articles/1500005217782-Scheduling-a-Task) — duur, working-days-only, mijlpalen, 1.095-daagse limiet
10. [help.wrike.com — zoekresultaten "critical path"](https://help.wrike.com/hc/en-us/search?query=critical+path) — release-items apr 2026, bugmeldingen
11. [help.wrike.com — zoekresultaten "baseline"](https://help.wrike.com/hc/en-us/search?query=baseline) — Baseline Tracking, auto-gegenereerde baselinevelden juli 2026
12. [help.wrike.com — zoekresultaten "New Gantt Chart release notes"](https://help.wrike.com/hc/en-us/search?query=New+Gantt+Chart+release+notes+2026) — functiepariteitsklachten
13. [help.wrike.com — zoekresultaten import/export MS Project](https://help.wrike.com/hc/en-us/search?query=import+MS+Project+MPP+export) — MPP-import, geen MPP-export
14. [help.wrike.com — zoekresultaten "Primavera P6 XER"](https://help.wrike.com/hc/en-us/search?query=Primavera+P6+XER) — *"No results"*
15. [help.wrike.com — zoekresultaten "BIM IFC Revit AutoCAD"](https://help.wrike.com/hc/en-us/search?query=BIM+IFC+Revit+AutoCAD+construction) — geen native ondersteuning
16. [help.wrike.com — zoekresultaten opslag/planlimieten](https://help.wrike.com/hc/en-us/search?query=storage+space+limit+per+plan+active+tasks) — GB per plan
17. [help.wrike.com — zoekresultaten resource management](https://help.wrike.com/hc/en-us/search?query=Wrike+Resource+bookings+job+roles+allocation+capacity+planning) — job roles, bookings, workload
18. [help.wrike.com — zoekresultaten budget/kosten](https://help.wrike.com/hc/en-us/search?query=budget+cost+rate+billable) — cost rate vs. billing rate, financiële velden
19. [help.wrike.com — zoekresultaten export](https://help.wrike.com/hc/en-us/search?query=export+Excel+CSV+PDF+Gantt+chart+data) — statische Gantt-export, ontbrekende PDF voor New Gantt
20. [help.wrike.com — zoekresultaten API rate limits](https://help.wrike.com/hc/en-us/search?query=rate+limit+API+requests+per+minute) — 400/min per gebruiker, 5.000/min per IP

**Developerdocumentatie**
21. [Wrike Developers — overview](https://developers.wrike.com/overview/) — API v4, OAuth 2.0, scopes
22. [Wrike Developers — portal](https://developers.wrike.com/) — webhooks, Datahub API, BI Export, MCP
23. [Wrike Developers — llms.txt](https://developers.wrike.com/llms.txt) — volledige endpointlijst (dependencies, workschedules, bookings, jobroles, timelogs, customfields)
24. [Wrike API v4 — dependencies endpoint](https://developers.wrike.com/api/v4/dependencies/)

**Reviews en onafhankelijke analyse**
25. [Software Advice — Wrike reviews](https://www.softwareadvice.com/project-management/wrike-profile/reviews/) — 4,4/5 over 3.027 reviews, deelscores, klachten
26. [GetApp — Wrike reviews](https://www.getapp.com/project-management-planning-software/a/wrike/reviews/) — prestatie-, prijs- en complexiteitsklachten
27. [SelectHub — Wrike](https://www.selecthub.com/p/project-management-software/wrike/) — 85% tevredenheid over 8.888 reviews; citaat over herplanning die niet werkt
28. [Tech.co — Wrike review](https://tech.co/project-management-software/wrike-review) — 4,4/5, prijzen, ontbrekende telefoon-/chatsupport, vergelijking ClickUp/monday.com
29. [project-management.com — Wrike review](https://project-management.com/wrike-software-review/) — referentieklanten *(let op: prijsinformatie op deze pagina is verouderd)*

**Bedrijfsgeschiedenis**
30. [Wikipedia — Wrike](https://en.wikipedia.org/wiki/Wrike) — oprichting, financieringsrondes, Citrix-overname $2,25 mrd, Vista/Cloud Software Group, STG juli 2023

**Niet toegankelijk tijdens dit onderzoek** (voor volledigheid en reproduceerbaarheid): G2 (403), Capterra (404), TrustRadius (403), Gartner Peer Insights (403), Reddit r/projectmanagement en r/construction (geblokkeerd), Trustpilot (403), Forbes Advisor (403), PCMag (geblokkeerd), TechRepublic (403), Cloudwards (503), community.wrike.com (503), Growjo (403), Sacra (404), 6sense (404), Enlyft (403).
