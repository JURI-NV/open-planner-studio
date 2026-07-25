# Buildertrend — diepgaand softwareprofiel

*Marktonderzoek planningssoftware — profiel opgesteld 25 juli 2026.*
*Alle bedragen in USD tenzij anders vermeld. Schattingen zijn expliciet gemarkeerd met **[SCHATTING]**.*

---

## 0. Kern in vijf regels

Buildertrend is een Amerikaans SaaS-pakket voor **residentiële bouw-MKB** (woningbouw, verbouw, gespecialiseerde onderaannemers) dat het hele bedrijfsproces van lead tot garantie in één systeem stopt. Planning is één van ~20 modules, geen product op zich. Er zit een **Gantt met afhankelijkheden en kritiek-pad-markering** in, maar **geen volwaardige netwerkplanning-engine**: geen zichtbare float, geen constraints, geen resource-leveling, geen kalender per resource. Prijs is sinds 2026 **niet meer publiek** en wordt gequoteerd op basis van jouw jaarlijkse bouwvolume; historisch $339–$1.099/maand voor onbeperkte gebruikers. Op interoperabiliteitsgebied is dit **een van de meest gesloten pakketten in dit onderzoek**: geen publieke API, geen IFC, geen XER/MPP, en een gedocumenteerd exit-probleem.

---

## 1. Wat het is

### 1.1 Leverancier en historie

| Feit | Waarde | Bron |
|---|---|---|
| Juridische entiteit | Buildertrend Solutions, Inc. | Persbericht CoConstruct-overname |
| Hoofdkantoor | Omaha, Nebraska (VS) | buildertrend.com/about/ |
| Opgericht | 2006 | buildertrend.com/about/ |
| Oprichters | Dan Houghton, Steve Dugger, Jeff Dugger | buildertrend.com/about/ |
| Eigendom | Private equity: HGGC (sinds dec 2020), Bain Capital Tech Opportunities (sinds feb 2021), Serent Capital | hggc.com, baincapital.com, persbericht |

**Tijdlijn (officiële mijlpalen van Buildertrend zelf):**

- **2006** — opgericht met drie man in Omaha.
- **2008** — 80% groei ondanks de kredietcrisis; uitbreiding van nieuwbouw naar verbouw/remodeling.
- **2011** — eerste internationale expansie: **Australië en Nieuw-Zeeland**.
- **2012** — iOS-/Android-apps, 100.000 gebruikers.
- **2018** — Buildertrend University, Pro Websites.
- **2019** — 500 medewerkers, 1 miljoen gebruikers, rebranding.
- **24 december 2020** — HGGC doet een "significant investment" in Buildertrend (status bij HGGC vandaag nog steeds "Current", partner sinds 2020).
- **24 februari 2021** — overname van CoConstruct (zie §1.2).
- **2023** — rebrand; CBUSA formeel in de Buildertrend-familie.
- **juni 2025** — eerste echte AI-feature: AI-powered Client Updates.
- **Q1–Q2 2026** — Bill Pay, tax recognition, progress invoicing.

**Huidige schaal (officiële claims op buildertrend.com):** 20.000+ bouwbedrijven, 1 miljoen+ bouwprofessionals, 2 miljoen+ projecten, 1,5 miljoen+ app-downloads, "100+ landen".

### 1.2 De CoConstruct-fusie — wat er precies gebeurde

Dit is een belangrijk stuk van het verhaal, want het verklaart zowel Buildertrends marktdominantie als de prijsdynamiek.

**De deal (persbericht 24 februari 2021, buildertrend.com/press-releases/coconstruct-acquisition/):**

- Buildertrend (Omaha, NE) neemt **CoConstruct** (Charlottesville, VA) over — tot dan toe zijn belangrijkste directe concurrent in residentiële bouw-PM.
- Financiering: **Bain Capital Tech Opportunities** en **HGGC** leveren de groei-investering; **Serent Capital** (bestaande CoConstruct-investeerder) herinvesteert in de gecombineerde entiteit. Dealbedrag is nooit openbaar gemaakt.
- Gecombineerde schaal bij closing: **23.000+ klanten, 1,1 miljoen+ gebruikers, $200+ miljard jaarlijkse bouwwaarde**.
- Leiding: Dan Houghton (mede-oprichter/CEO Buildertrend) leidt het gecombineerde bedrijf, met mede-oprichters Steve Dugger en Jeff Dugger. **Donny Wyatt**, oprichter van CoConstruct, wordt integratieadviseur — dus geen operationele rol.
- Adviseurs: Spurrier Capital Partners (financieel), Cooley LLP en Kirkland & Ellis LLP (juridisch).

**Wat er meekwam: CBUSA.** CoConstruct had in **oktober 2020** CBUSA overgenomen, de grootste Amerikaanse inkoopcombinatie (group purchasing organization) voor woningbouwers. Buildertrend kreeg die er dus gratis bij en verkoopt het inkoopvoordeel sindsdien als extra argument.

**Wat er met CoConstruct is gebeurd — de uitfasering.** Dit is het commercieel meest relevante deel:

- **April 2022** — laatste productupdate van CoConstruct; ontwikkeling stopt.
- **2026** — coconstruct.com meldt zelf dat "CoConstruct's transition to Buildertrend is entering its final phase" en stuurt alle klanten naar Buildertrend.
- **31 maart 2027** — volgens de best gedocumenteerde bron kunnen er geen nieuwe projecten meer worden aangemaakt en wordt bestaande data **read-only**. *(Bron: brcks.io, 11-07-2026 — let op: dit is een concurrent die migranten wil werven; de datum is niet door Buildertrend zelf bevestigd in een bron die ik kon ophalen. **[SCHATTING/te verifiëren]**, maar het patroon "final phase" is wél bevestigd door coconstruct.com zelf.)*

**Waarom dit ertoe doet voor prijs:** CoConstruct-klanten zaten historisch op $99–$599/maand. Het enige door de leverancier aangeboden migratiepad is Buildertrend, dat in het gepubliceerde tijdperk $499–$1.099/maand kostte en nu volumegebaseerd quoteert. Voor een deel van de CoConstruct-basis is dit dus een gedwongen prijsverdubbeling of erger. Dat is precies het scenario waar concurrenten (JobTread, BuildBook, Buildern, BRCKS, Built Simple) nu campagne op voeren.

### 1.3 Doelgroep

**Formeel doelsegment volgens Buildertrend zelf** (pricing-intake, geraadpleegd 25-07-2026): bouwers die **5+ projecten per jaar** draaien, met een omzet in de zes- tot achtcijferige range. De intake-formulier vraagt om je type bouwbedrijf en je jaarlijkse bouwvolume, ingedeeld in **11 volumebrackets van $0–499K tot $31M+**.

**Feitelijk gebruikersprofiel:** 61% van de reviewers heeft **2–50 medewerkers** (Software Advice). Dit is dus MKB tot lagere midmarket, geen enterprise.

**Sectoren waar het echt gebruikt wordt:**
- Custom home builders / nieuwbouw eengezinswoningen — kernmarkt.
- Remodelers / verbouwbedrijven — tweede kernmarkt (sinds 2008).
- Gespecialiseerde onderaannemers (specialty contractors) — derde segment.
- Licht commercieel — wordt geprobeerd, maar reviews zijn hier consequent negatief over ("limited scheduling complexity for large commercial projects").
- **Niet** gebruikt in: infra, industrie, utiliteitsbouw, grootschalige GC-projecten. Daar zit Procore / Autodesk / P6.

**Regio's waar het écht gebruikt wordt:**
- **Verenigde Staten** — ~84% van de klantenbasis. Dominant.
- **Canada** — tweede markt.
- **Australië / Nieuw-Zeeland** — derde markt, actief sinds 2011, maar klein (in publieke trackers enkele tientallen tot ~78 getrackte klanten — **[SCHATTING]**, trackerdata is notoir incompleet).
- **Verenigd Koninkrijk / Ierland / continentaal Europa** — verwaarloosbaar. Geen lokale prijzen, geen lokale btw/CIS-functionaliteit, geen lokaal supportteam gevonden. Concurrenten positioneren zich expliciet tegen de "geographic mismatch of US-based platforms".
- **Nederland/België** — geen aanwijzingen voor noemenswaardig gebruik. Geen Nederlandstalige UI, geen NL-boekhoudkoppelingen (geen Exact, geen Twinfield, geen AFAS), geen UAV/STABU/NEN-aansluiting.

De claim "100+ landen" moet gelezen worden als "er logt weleens iemand in uit 100+ landen", niet als "actief verkocht in 100+ landen".

---

## 2. Functionaliteit en techniek

### 2.1 Positionering van de planningsmodule

Buildertrend is **geen planningspakket**. Het is een bedrijfsvoeringsplatform waar planning één module in is. De modules:

- **Sales**: CRM, leads, offertes/proposals, digitale handtekening.
- **Project management**: **Schedule**, To-Do's, Daily Logs, Change Orders, Selections, Plans & Specs/documentbeheer, RFI's, warranty.
- **Financieel**: estimating, takeoff, bidding, budget/job costing, WIP-rapportage, purchase orders, facturatie, Bill Pay, betalingsverwerking, lien waivers.
- **Communicatie**: klantportaal, subcontractorportaal, messaging.
- **Tijd**: Time Clock met labor codes gekoppeld aan het budget.

De Schedule is gekoppeld aan Change Orders, Invoices, Selections en Bids — dat is de echte kracht: de planning is niet los, maar hangt aan de commerciële en financiële objecten.

### 2.2 Wat de planning wél kan — feitelijk

Op basis van Buildertrends eigen productpagina, helpcenter-fragmenten en hun eigen whitepaper *"Your guide to scheduling success in Buildertrend"*:

**Weergaven**
- **Gantt** — "allows you to link and rearrange schedule items with ease. This means when you move one item, the others follow suit and adjust accordingly, keeping everything in order." Kan één project of **alle projecten tegelijk** tonen (multi-project overzicht met één balk per project).
- **Maand / Week / Dag** — kalenderweergaven, met optioneel To-Do's, deadlines van owner invoices en selecties erbij.
- **Agenda** — takenlijst per persoon; "seeing how much one person has on their plate".
- **Baseline-weergave** — vergelijkt huidige start/werkdagen/einde met de oorspronkelijke.
- **Workday-weergave** — toont werkdagen vs. niet-werkdagen (feestdag, regen, extra weekendwerk). Expliciet bedoeld om met de opdrachtgever te delen.
- **Phases-lijst** — gegroepeerd op fase-tag.

**Logica**
- **Predecessors**: **Finish-to-Start** en **Start-to-Start** zijn beide expliciet in de helpdocumentatie beschreven (drag-and-drop van de cirkel aan begin/eind van een balk).
- **Lag**: ondersteund (positieve lag; lead = negatieve lag wordt in de generieke docs beschreven).
- **Critical path**: onderdeel van de **"Advanced Schedule"**; het kritieke pad wordt **blauw** gemarkeerd in de Gantt. Buildertrends eigen definitie: "the longest sequence of dependent tasks that determine the minimum duration needed to complete a project".
- **Automatische doorschuif**: verschuiven van een voorganger schuift opvolgers mee.
- **Baselines**: "acts as a screenshot, so if schedule items aren't completed on time or moved, it shows where the time went and why that job is behind."

**Kalenders**
- Standaard werkdagen per organisatie/project ("setting default workdays … avoids scheduling tasks on non-working days").
- **Workday Exceptions** voor feestdagen, kantoorsluitingen, weerdagen.

**Resources (in de brede zin)**
- Toewijzing van interne gebruikers én **trade partners** (onderaannemers) aan schedule items.
- **Overlap-drempel per gebruiker**: je kunt per gebruiker instellen hoeveel gelijktijdige schedule items maximaal zijn toegestaan; bij overschrijding volgt een **in-app waarschuwing** wanneer je de planning live zet. Dit is de enige capaciteitscontrole in het product.
- Linked To-Do's: to-do's hangen aan schedule items en schuiven mee.

**Operationeel**
- **Schedule Confirmations**: onderaannemers bevestigen of ze de ingeplande datum accepteren.
- Meldingen bij wijziging via **sms, e-mail of push**, per gebruiker instelbaar.
- **Reoccurring items**, **tags**, kleurcodering per trade/taaktype.
- **Sjablonen**: planningssjablonen, ook aan te maken vanuit afgesloten projecten.
- **Mobiel** met **offline** toegang tot de planning.
- **Eenrichtings**-kalendersync naar Google, Outlook of iCal.

### 2.3 Wat de planning níét kan — de strenge toets

De opdracht vraagt streng te zijn over de vraag of er een echte netwerkplanning-engine onder zit. Het antwoord is: **nee, niet in de zin waarin een planner dat bedoelt.** Onderbouwing per ontbrekend element:

| Element van een echte CPM-engine | Aanwezig in Buildertrend? | Toelichting |
|---|---|---|
| Forward/backward pass | Deels — voorwaartse doorrekening bestaat aantoonbaar | Achterwaartse pass wordt nergens beschreven en de uitkomst ervan (late dates) is nergens zichtbaar |
| **Total float / free float** | **Niet gevonden** | Geen veld, geen kolom, geen filter, geen rapport in enige documentatie of review. Zonder float is "critical path" hooguit een langste-pad-markering, geen floatanalyse |
| Late start / late finish | **Niet gevonden** | idem |
| Relatietypen FF en SF | **Niet gedocumenteerd** | Alleen FS en SS zijn expliciet beschreven. **[SCHATTING]**: FF/SF ontbreken waarschijnlijk |
| Constraints (SNET, FNLT, MSO, deadlines) | **Niet gevonden** | Geen enkele bron noemt taak-constraints |
| Meerdere kalenders (per taak/resource) | **Niet gevonden** | Eén set werkdagen + uitzonderingen, op project/organisatieniveau |
| Resource-loading (uren/hoeveelheden per taak) | **Nee** | Alleen "wie is toegewezen", geen hoeveelheden |
| Resource-histogram / S-curve | **Nee** | — |
| Resource-leveling / smoothing | **Nee** | Enige mechanisme is een overlap-teller met waarschuwing |
| Kostenbelasting op planningsactiviteiten | **Nee** | Job costing is een aparte financiële module, niet activiteit-geladen |
| Earned value (BCWS/BCWP/CPI/SPI) | **Nee** | WIP-rapportage is boekhoudkundig, geen EVM op de planning |
| Baselines (meervoud, versies) | **Beperkt** | Eén "snapshot"; geen aanwijzing voor meerdere genummerde baselines of baseline-varianten |
| Locatiegebaseerde planning / flowline / LBMS | **Nee** | — |
| Takt / lean pull planning / Last Planner | **Nee** | Schedule Confirmations komen in de buurt van commitment-tracking, maar er is geen pull-planningsproces, geen PPC-meting, geen constraint log |
| 4D-simulatie / BIM-koppeling | **Nee** | Geen model-viewer, geen 4D, geen IFC |
| Monte Carlo / risicoanalyse | **Nee** | — |
| WBS-hiërarchie met meerdere niveaus | **Beperkt** | Fasen/tags als groepering; geen echte multi-level WBS met rollups |
| Schedule-kwaliteitscontrole (DCMA-14 e.d.) | **Nee** | — |

**Onafhankelijke bevestiging.** Een vergelijkende bron karakteriseert Buildertrend als een *"field-facing platform"* dat draait om *"turning schedule items into task execution, approvals, and progress updates"* in plaats van *"traditional CPM-oriented dependency logic"*, en stelt dat de *"scheduling depth can feel limited for complex, multi-phase critical path needs"* — expliciet in contrast met Microsoft Project, Primavera P6 en Asta Powerproject, "which emphasize dependency-driven rescheduling and baseline variance analysis" (zipdo.co). Een tweede bron stelt het botter: "Not as powerful as dedicated tools like Primavera P6 or Microsoft Project, but sufficient for most commercial projects."

Capterra's samengevatte nadelen bevatten letterlijk: *"Limited scheduling complexity for large commercial projects"* en *"The scheduling function is considered basic and insufficient for complex commercial projects requiring advanced customization."*

**Eindoordeel op dit punt:** Buildertrend heeft een **taakgestuurde bouwkalender met afhankelijkheidsdoorrekening en een langste-pad-markering**. Dat is voldoende voor een woningbouwproject van 60–200 activiteiten waar de echte variabelen leverbetrouwbaarheid van onderaannemers en klantselecties zijn. Het is **onvoldoende** voor floatgestuurde sturing, claimanalyse, resourceoptimalisatie of contractuele planningsverplichtingen. Wie een planning moet opleveren die door een opdrachtgever of jurist wordt getoetst, gebruikt dit pakket niet.

### 2.4 Platform en schaalbaarheid

- **Architectuur**: multi-tenant SaaS, browser + native iOS/Android-apps. Geen on-premise, geen private cloud.
- **Identity**: **Auth0** als identity provider. De loginflow (`login.buildertrend.com/authorize`) toont `audience=https://api.buildertrend.net/` met scopes `btapi:external`, `btapi:builder:read`, `btapi:user:read`, `btapi:internal`. **Er bestaat dus wel degelijk een REST-API met een als "external" gemarkeerde scope — hij is alleen niet aan klanten beschikbaar gesteld.** Dat is een bewuste commerciële keuze, geen technische beperking.
- **Offline**: de mobiele app kan de planning zonder wifi tonen en bijwerken.
- **Schaalbaarheid**: onbeperkte gebruikers en onbeperkte projecten in elk abonnement; multi-project Gantt met één balk per project. Praktische bovengrens is niet technisch maar functioneel: de planningsdiepte houdt op lang voordat de datavolumes problematisch worden.
- **Performance-klachten**: reviews melden trage mobiele app op oudere toestellen en projecten die soms niet laden op telefoon.
- **Rechten**: rolgebaseerd (interne gebruikers, trade partners, owners), met aparte portals per rol. Geen aanwijzing voor fijnmazige veldniveau-permissies of SSO/SAML voor klanten.

---

## 3. Prijzen

### 3.1 De actuele situatie: geen lijstprijs meer

**Officieel (buildertrend.com/pricing/, geraadpleegd 25-07-2026):**

- **Geen gepubliceerde prijzen.** De pagina zegt: "Get your custom quote for the platform that does it all."
- Prijs wordt bepaald na een intakeformulier: type bouwbedrijf + **jaarlijks bouwvolume**, ingedeeld in **11 brackets van $0–499K tot $31M+**, plus implementatietijdlijn en contactgegevens. Daarna belt sales.
- Inbegrepen in elk pakket: **onbeperkt gebruikers, onbeperkt projecten**, alle kernfunctionaliteit (project management, sales, klantbeheer, financiële tools, integraties), live support (telefoon/chat/e-mail), Learning Academy en Help Center.
- **Promotie op de pagina: 10% korting bij vooruitbetaling van een jaarabonnement.**
- Geen setup-/implementatiefee genoemd op de pagina.

**Wat dit betekent:** Buildertrend is in 2026 overgestapt van gepubliceerde tiers naar **waardegebaseerde prijsstelling op omzetvolume**. Concreet gevolg: als jouw bouwvolume groeit, kun je bij verlenging in een duurdere bracket vallen — een prijsverhoging die losstaat van algemene prijsindexatie. Dat is de meest genoemde klacht in §5.

### 3.2 De laatst gepubliceerde lijstprijzen (2024–2025)

Deze tiers stonden tot begin 2026 op de site en circuleren nog breed. **Bron: meerdere secundaire bronnen, onderling consistent; niet meer op de leverancierssite te verifiëren.**

| Plan | Jaarlijks vooruitbetaald | Maandelijks | Kernfunctionaliteit |
|---|---|---|---|
| **Essential** | **$339/mnd** | $399–$499/mnd | Planning, offertes, klantportaal, facturatie, basiscommunicatie |
| **Advanced** | **$599/mnd** | $699–$799/mnd | + estimating, takeoff, change orders, budget/job costing |
| **Complete** | **$829/mnd** | $999–$1.099/mnd | + selections, warranty, RFI's, geavanceerde rapportage |

Bronnen: downtobid.com/blog/buildertrend-pricing (geraadpleegd 25-07-2026); getonecrew.com/post/buildertrend-pricing (geraadpleegd 25-07-2026); zoekmachine-snippet van buildertrend.com/pricing waarin de drie tiers $339 / $599 / $1.099 werden getoond (geraadpleegd 25-07-2026).

**Andere prijsopgaven die circuleren (met waarschuwing):**
- **Software Advice** (geraadpleegd 25-07-2026): "plans starting at $499/month". Consistent met de maandelijkse Essential-prijs.
- **SelectHub** (geraadpleegd 25-07-2026): "startprijs $99/maand", "$299/maand voor 3 gebruikers". Dit is vrijwel zeker **verouderde data uit ~2019** en niet representatief voor 2026. **[Onbetrouwbaar — niet gebruiken.]**
- **Capterra AU** (geraadpleegd 25-07-2026): geen startprijs; "flat rate", prijs beschikbaar in **AUD/USD**. Er is geen gepubliceerde AUD-lijstprijs gevonden. **[SCHATTING]**: AU-klanten krijgen een omgerekende USD-prijs of een lokaal onderhandelde AUD-prijs; Buildertrend voert geen aparte AU-prijslijst.
- **Geen EUR-prijzen.** Buildertrend verkoopt niet actief in de eurozone; er is geen NL/BE/DE prijslijst.

### 3.3 Bijkomende kosten

| Post | Bedrag | Bron / status |
|---|---|---|
| **Buildertrend Boost** (onboarding/coaching) | **Gratis** bij jaarcontract; **~$100/mnd** bij maandcontract | projul.com, getonecrew.com (secundair, 2026) |
| Extra coaching/onboarding | **$400–$2.000 eenmalig** | getonecrew.com ($400–$1.500), projul.com ($500–$2.000) — **[SCHATTING]**, bandbreedtes lopen uiteen |
| Betalingsverwerking creditcard | **~2,9–2,99% (+ $0,30/transactie)** | downtobid.com, getonecrew.com |
| Betalingsverwerking ACH | Vast bedrag per transactie | downtobid.com |
| Gratis proefperiode | **Geen** | downtobid.com |
| Geld-terug-garantie | 30 dagen | downtobid.com |

**Realistische jaarlijkse TCO [SCHATTING], gebaseerd op de secundaire bronnen:**
- Klein bouwbedrijf, Essential, maandelijks: **~$5.000/jaar**.
- Midmarket, Advanced/Complete, jaarlijks: **~$8.000–$12.500/jaar** inclusief onboarding in jaar 1.
- Plus 2,9% over alle via het platform verwerkte klantbetalingen — bij $2M doorgezette betalingen is dat **$58.000/jaar** extra, wat de licentiekosten volledig in de schaduw stelt. Dit is de post die in vergelijkingen structureel wordt vergeten.

### 3.4 Historische prijstrend

Dit is de scherpste kant van het verhaal en wordt uit meerdere onafhankelijke hoeken bevestigd:

- **2018–2019**: instapprijs rond **$99–$199/maand**.
- **2022**: forse verhogingen gerapporteerd; contractanten noemen **50–65% verhoging bij verlenging**.
- **2023–2024**: geherstructureerde tiers Essential/Advanced/Complete, van "high-$300s" tot $1.000+.
- **2026**: geen publieke prijzen meer; volumegebaseerde quotes.

**Directe gebruikersuitspraken:**
- *"At the beginning of the year they were going to raise our prices from like $350 to $800."* — r/Construction, thread "Buildertrend feedback".
- *"Buildertrend increases its monthly payments for all three subscription plans after two months for nothing really."* — r/Contractor.
- *"Price increases are frustrating. It was half this cost 3 years ago."* — geciteerd in een Australische vergelijking (builtsimple.com.au).

### 3.5 Contractvoorwaarden

- Jaarabonnement met **automatische verlenging**.
- Opzeggen vereist **schriftelijke kennisgeving vóór de verlengingsdatum**, verstuurd door de accountbeheerder aan de customer success representative.
- Bij tussentijdse opzegging: *"CUSTOMER WILL NOT BE ISSUED A REFUND FOR THE MOST RECENT SUBSCRIPTION FEE OR ANY PREVIOUSLY CHARGED FEES"* — de dienst loopt door tot de eerstvolgende verlengingsdatum.
- Buildertrend stelt in BBB-reacties dat jaarcontracten bindend zijn onder hun voorwaarden, maar heeft in individuele gevallen wel terugbetaald.

---

## 4. VOORDELEN

1. **Echt end-to-end voor woningbouw-MKB, met de planning ingebed in het commerciële proces.** De Schedule hangt aan Change Orders, Invoices, Selections en Bids. Een goedgekeurd meerwerk kan dus in dezelfde omgeving de planning raken en de klant zien wat het met de opleverdatum doet. Geen enkel klassiek planningspakket doet dit; daar is de planning een eiland naast het ERP.

2. **Onbeperkt gebruikers en projecten in de prijs — inclusief gratis toegang voor onderaannemers en opdrachtgevers.** Trade partners en owners loggen in via eigen portals zonder extra licentie. Voor een bedrijf met 8 interne mensen en 40 vaste onderaannemers is dat economisch onvergelijkbaar met per-seat-modellen (P6, MSP, Procore-achtige constructies).

3. **Support is aantoonbaar het sterkste onderdeel.** Capterra: **klantenservice 4,7/5** over **2.486 reviews** — dat is een uitzonderlijk hoge score voor een pakket in deze prijsklasse. SelectHub: **92% van de support-reviewers positief**. Live chat, telefoon én e-mail zitten in elk abonnement, plus Learning Academy en Help Center.

4. **Volwassenheid en netwerkeffect.** 20.000+ bouwbedrijven, 1M+ gebruikers, 2M+ projecten. Capterra 4,5/5 (2.486 reviews), G2 4,3 (ca. 5.000 reviews), 90% zou het aanbevelen. Praktisch gevolg: veel Amerikaanse onderaannemers kennen de interface al uit andere projecten, wat de adoptiedrempel per project verlaagt.

5. **De planning is voldoende voor het beoogde doel, en netjes uitgevoerd.** FS- en SS-relaties met lag, automatische doorschuif van opvolgers, kritiek pad in blauw, baselines, werkdagen met uitzonderingen voor feestdagen/weer, fasen en tags, herhalende items, sjablonen (ook uit afgesloten projecten), en zes verschillende weergaven waaronder een multi-project Gantt. Voor een 120-activiteiten woningbouwplanning is dit compleet.

6. **Veld-eerst ontworpen, met offline planning.** iOS/Android met offline toegang tot de planning, en meldingen bij wijzigingen via sms/e-mail/push per gebruiker instelbaar. Dat is precies het punt waarop desktop-planningspakketten in de woningbouw falen.

7. **Schedule Confirmations sluiten de lus met onderaannemers.** Subs zien "when they're needed and if they're approved to start work" en bevestigen actief. Dit is de enige lean-achtige mechaniek in het product en het is de mechaniek die er in de woningbouw het meest toe doet.

8. **Sjablonen maken herhaalbaar bouwen echt herhaalbaar.** Een woningbouwer die 30 keer hetzelfde type huis bouwt, zet een nieuwe planning in minuten op. Sjablonen kunnen ook uit afgesloten projecten worden gemaakt, dus de geleerde lessen komen terug in het sjabloon.

9. **Financiële diepte die planningspakketten niet hebben.** Job costing met labor codes uit de Time Clock, WIP-rapportage, purchase orders, lien waivers, betalingsverwerking, en koppelingen met QuickBooks, Xero en Sage Intacct. Voor een bouwer die één systeem wil, is dit het argument.

10. **Eenvoudige overbezettingssignalering.** Per gebruiker/trade partner instelbare maximale overlap met een in-app waarschuwing bij het live zetten van de planning. Primitief vergeleken met resource-leveling, maar het vangt wel het meest voorkomende praktijkprobleem (dezelfde onderaannemer op drie plekken tegelijk) af.

---

## 5. NADELEN

1. **Geen echte netwerkplanning-engine.** Geen zichtbare total/free float, geen late dates, geen taak-constraints, geen resource-leveling, geen kalender per resource, FF/SF-relaties niet gedocumenteerd, geen EVM, geen multi-level WBS met rollups. Capterra vat de reviewconsensus samen als *"Limited scheduling complexity for large commercial projects"* en *"the scheduling function is considered basic and insufficient for complex commercial projects requiring advanced customization."* Onafhankelijke vergelijkingen plaatsen het expliciet onder MS Project, P6 en Asta Powerproject.

2. **Prijsintransparantie sinds 2026 en volumegebaseerde quotes.** Lijstprijzen zijn van de site verwijderd; je moet een salesgesprek in met opgave van je jaarlijkse bouwvolume voordat je een getal ziet. Het directe gevolg: **groei van je bedrijf leidt tot prijsverhoging los van algemene indexatie**. Benchmarken tegen alternatieven is hierdoor systematisch moeilijker gemaakt.

3. **Forse prijsstijgingen bij verlenging, herhaaldelijk gerapporteerd.** 50–65% verhogingen genoemd rond 2022; een Reddit-gebruiker meldt een voorgestelde sprong van $350 naar $800/maand; een Australische bron citeert "It was half this cost 3 years ago". Dit is het meest consistente negatieve thema over alle bronnen heen.

4. **Vendor lock-in door gebrekkige data-export.** BBB-review van een langjarige klant: *"there is no simple or bulk way to download years' worth of files, photos, proposals, and customer information."* Capterra noemt "data export difficulties when canceling service" bij de standaardnadelen. Eén reviewer zegt zich *"forced to continue paying for a platform"* te voelen om bij historische data te kunnen. Voor een systeem dat je hele projectarchief bevat is dit een structureel risico, geen detail.

5. **Contractueel onvriendelijk.** Jaarcontract met automatische verlenging, opzegging alleen schriftelijk vóór de verlengingsdatum en alleen door de accountbeheerder, en **geen restitutie** bij tussentijdse opzegging — de dienst loopt gewoon door tot de verlengingsdatum.

6. **BBB-rating 1,09/5 (11 reviews), niet BBB-geaccrediteerd.** De thema's: facturatie voor niet-gebruikte diensten, geweigerde restituties, en verkoopgedrag — *"pressure sales people"* die beloftes doen die het product niet waarmaakt, en demo's die *"leave out all the shortcomings"*. Het lage aantal reviews maakt de score statistisch zwak, maar de themaconsistentie met Capterra en Reddit maakt hem wel geloofwaardig.

7. **Leercurve en inconsistente UI.** Capterra: "steep learning curve due to numerous features" en "inconsistent user interface across different sections". Software Advice citeert reviewers over een "unintuitive interface" met *"10x more clicking than needed"*. SelectHub: **83% van de reviewers wil meer aanpassingsmogelijkheden**.

8. **De QuickBooks-koppeling is een terugkerend pijnpunt.** SelectHub: **~60% van de reviewers meldt dat de QuickBooks-integratie "took some time and effort"**. Capterra noemt "frequent complaints about QuickBooks integration not functioning as promised". Voor een pakket dat zijn financiële diepte als kernargument voert, is dat de verkeerde plek om te falen.

9. **Notificatie-overload en mobiele performance.** GetApp-reviewers noemen "overwhelming email notifications"; Capterra meldt projecten die soms niet laden op telefoons — precies op het moment dat je op de bouwplaats staat. Een Australische vergelijking citeert "Mobile app is sluggish on older phones".

10. **Feature-bloat versus daadwerkelijk gebruik.** Gebruikers melden "we don't use half the features" terwijl ze wel de volledige tierprijs betalen. Voor bedrijven onder ~$500K jaarlijks bouwvolume concluderen meerdere bronnen dat de investering zich niet terugverdient.

11. **Het onderliggende adoptieprobleem blijft onopgelost.** Fora-consensus onder aannemers: *"subs won't update these platforms"* en de projectleider werkt alsnog alles handmatig bij. Dat is geen fout van Buildertrend specifiek, maar het ondergraaft wel de kernbelofte "de planning is de single source of truth" — en het is de reden dat Schedule Confirmations bestaan.

12. **Supportkwaliteit onder druk bij groei.** Ondanks de hoge scores melden meerdere bronnen dat "support quality has declined as they've grown" en dat de responstijden zijn opgelopen. **[Anekdotisch; de kwantitatieve scores wijzen nog steeds de andere kant op.]**

---

## 6. Interoperabiliteit — beoordeling van openheid

Dit is voor een open-source, IFC-gebaseerde planner de meest relevante paragraaf. Het oordeel is ondubbelzinnig.

### 6.1 Formaten

| Formaat / standaard | Ondersteund? | Onderbouwing |
|---|---|---|
| **Primavera XER** | **Nee** | Geen enkele vermelding in leveranciersdocumentatie, reviews of migratiegidsen |
| **P6 / PMXML (Primavera XML)** | **Nee** | idem |
| **MPP (Microsoft Project)** | **Nee** | Geen import of export gevonden |
| **MSPDI / MS Project XML** | **Nee** | idem |
| **CSV / Excel** | **Ja — dit is het feitelijke uitwisselformaat** | Schedule items zijn als Excel te exporteren; concurrenten documenteren migratie expliciet als "exporting your data as an Excel file from Buildertrend". Import gaat via sjablonen en Excel/CSV-routes |
| **PDF** | **Ja** (weergave/afdruk) | Standaard rapportuitvoer |
| **ICS / kalendersync** | **Ja, maar eenrichtings** | "seamlessly one-way integrates with your Google, Outlook or iCal calendar" — uitgaand only |
| **IFC 2x3 / IFC 4 / IFC 4.3** | **Nee** | Geen enkele IFC-ondersteuning, geen model-viewer |
| **IfcWorkSchedule / IfcTask / IfcWorkCalendar** | **Nee** | Buildertrend heeft geen buildingSMART-aansluiting van welke aard dan ook |
| **BCF (BIM Collaboration Format)** | **Nee** | Geen issue-/coördinatiemodel in BCF-zin |
| **COBie** | **Nee** | — |
| **4D / model-koppeling** | **Nee** | Alleen indirect: derde partijen (bijv. PlusDesignBuild) kunnen calculatiegegevens uit een 3D-model naar Buildertrend duwen — eenrichtings, en dat is calculatiedata, geen geometrie of planningskoppeling |

### 6.2 API

**Er is geen publieke API.** De onderbouwing is meervoudig en consistent:

- **`developers.buildertrend.com` bestaat niet** (DNS resolvet niet — zelf geverifieerd, 25-07-2026). Een onafhankelijke analyse bevestigt hetzelfde voor `developer.buildertrend.com`.
- Onafhankelijke analyse (usecarly.com, 19-07-2026): *"Buildertrend does not publish a public API a customer can use. There's no developer portal"*, geen in-app scherm waar een klant een API-key genereert, en *"There is no official Buildertrend app on Zapier."*
- API Report Card (supergood.ai): **grade F** — *"No public API. Buildertrend integrates through a curated marketplace (QuickBooks, Xero, HubSpot, Salesforce, Gusto); anything custom requires a partnership or hired freelancers."* Let op: deze bron verkoopt zelf UI-automatiseringsdiensten en is dus belanghebbend — maar het feitelijke gegeven (geen developer portal) is onafhankelijk verifieerbaar.
- API-Evangelist (GitHub) profileert Buildertrend als **"non-public (partner-only) API provider"**.
- Derden bieden expliciet *"Production APIs for tools with no API"* aan om Buildertrend te ontsluiten via UI-automatisering — het bestaan van die markt is zelf het bewijs.

**Technisch bestaat de API wél.** De Auth0-loginflow van buildertrend.com onthult `audience=https://api.buildertrend.net/` met scopes `btapi:external`, `btapi:builder:read`, `btapi:user:read` en `btapi:internal`. Er is dus een REST-API met een expliciet als *external* gemarkeerde scope. **De afwezigheid van klanttoegang is een commerciële keuze, geen technische beperking.** Dat maakt het oordeel strenger, niet milder.

### 6.3 Marketplace

De volledige officiële integratielijst bestaat uit **acht partners** (buildertrend.com integration-sitemap, geraadpleegd 25-07-2026):

QuickBooks · Xero · Sage Intacct · Salesforce · HubSpot · Pipedrive · Gusto · Home Depot Pro Xtra

Dat is: **drie boekhoudpakketten, drie CRM's, één payroll, één inkoop.** Nul bouwkundige integraties. Geen BIM, geen calculatie-uitwisseling, geen document-/tekeningstandaard, geen planningsuitwisseling. Ter vergelijking: Procore's App Marketplace telt honderden apps.

### 6.4 Oordeel over openheid

**Buildertrend is een van de meest gesloten pakketten in dit onderzoek.** De vier assen:

| As | Score | Toelichting |
|---|---|---|
| Open dataformaat | **Zeer gesloten** | Geen open native format; alles leeft in de tenant |
| Open standaarden | **Afwezig** | Nul buildingSMART/openBIM/planningsstandaarden |
| Programmatische toegang | **Gesloten** | API bestaat, klant komt er niet bij |
| Exit-vrijheid | **Slecht** | Geen bulk-export; expliciet gedocumenteerd probleem bij opzegging |

**Wat dit betekent voor een open-source IFC-planner:**

1. **Buildertrend is geen integratiepartner en zal dat ook niet worden.** Er is geen technisch aanknopingspunt en geen commerciële prikkel voor Buildertrend om er één te bieden.
2. **De enige realistische brug is CSV/Excel-uitwisseling van schedule items** (id, naam, start, werkdagen, einde, voorganger, toegewezen partij, fase/tag). Wie interoperabiliteit met Buildertrend-gebruikers wil, bouwt een CSV-importprofiel — niet meer, niet minder.
3. **Buildertrends geslotenheid is een verkoopargument voor het alternatief.** Het exit-probleem is niet anekdotisch maar door reviewers, BBB-klachten en review-aggregators gedocumenteerd. Een planner die IFC 4.3 als native, leesbaar, leverancieronafhankelijk bestandsformaat gebruikt, adresseert exact de klacht die Buildertrend-klanten zelf formuleren.
4. **De doelgroepen overlappen slechts gedeeltelijk.** Buildertrend verkoopt bedrijfsvoering aan Amerikaanse woningbouwers; een IFC-planner verkoopt planning aan een BIM-bewuste markt. De concurrentie zit niet in de planningsmodule maar in de vraag "welk systeem is mijn bron van waarheid".

---

## 7. Marktpositie

### 7.1 Waar sterk, en waarom

**Onbetwiste marktleider in residentiële bouwmanagementsoftware in Noord-Amerika.** Een concurrentievergelijking formuleert het als: *"Buildertrend is the market leader in residential PM with mature product depth"*; een andere: *"Buildertrend remains the standard for residential builders needing integrated CRM and client portals."*

De redenen:
- **20 jaar voorsprong** in een markt waar de meeste concurrenten na 2018 zijn opgericht.
- **De concurrent is opgekocht.** Met CoConstruct verdween de enige vergelijkbaar volwassen speler in hetzelfde segment. Die klantenbasis wordt nu gedwongen gemigreerd (read-only per **31-3-2027 [te verifiëren]**).
- **Breedte in plaats van diepte.** Voor een bouwer met 15 man is "één systeem dat alles doet" waardevoller dan "het beste planningspakket".
- **Netwerkeffect via onderaannemers en opdrachtgevers**, die gratis meedoen.
- **Marketingclaim**: "powering over half of new home builds in the U.S." — **[Marketingclaim, niet onafhankelijk geverifieerd; behandelen als onbevestigd.]**

### 7.2 Omvang en financiën

| Metriek | Waarde | Status |
|---|---|---|
| Klanten | 20.000+ bouwbedrijven | Officieel (buildertrend.com) |
| Gebruikers | 1M+ bouwprofessionals | Officieel |
| Projecten | 2M+ | Officieel |
| Klanten bij fusie (2021) | 23.000+ | Officieel persbericht |
| Jaarlijkse bouwwaarde op platform (2021) | $200+ miljard | Officieel persbericht |
| Omzet | **$171,6M (RocketReach) – $182,2M (Growjo/Compworth)** | **[SCHATTING — derdenschattingen, geen gepubliceerde cijfers. Buildertrend is privaat en publiceert niets.]** |
| Medewerkers | 500 (officieel, 2019); 735–900+ (derden); 501–1.000 (Similarweb-band) | **[SCHATTING voor alles na 2019]** |
| Waardering | ~$320M (Prospeo, multiple-schatting) | **[SCHATTING — zeer onbetrouwbaar. Bij $175M ARR en gangbare verticale-SaaS-multiples ligt een reële waardering vermoedelijk aanzienlijk hoger. Niet gebruiken zonder betere bron.]** |

### 7.3 Concurrenten

**Direct, residentieel MKB (VS/Canada):**
- **JobTread** — publiceert wél prijzen ($199/mnd + $20/gebruiker), budget-first workflow, voert actieve migratiecampagnes op CoConstruct-vluchtelingen. De scherpste directe bedreiging.
- **Contractor Foreman** — prijsvechter.
- **Houzz Pro** — sterk in leadgeneratie via het Houzz-netwerk.
- **BuildBook, Buildern, Projul, Builder Prime, BuilderMaxPro** — nieuwere, goedkopere of AI-gepositioneerde uitdagers.

**Regionaal:**
- **Built Simple** (Australië) — claimt 40–60% goedkoper voor vergelijkbare omvang, met lokale support.
- **BRCKS** (VK/Ierland) — £40/seat/maand, gratis subcontractor-seats, lokale compliance.

**Aangrenzend, commercieel/GC:** Procore (de referentie voor complexe commerciële projecten), Autodesk Construction Cloud, Fieldwire.

**Aangrenzend, planning:** MS Project, Primavera P6, Asta Powerproject — andere categorie; ze concurreren niet om dezelfde koper, maar ze definiëren wel de lat waaraan Buildertrends planning wordt afgemeten en niet voldoet.

### 7.4 Trend

- **Consolidatiefase is voorbij.** CoConstruct is verwerkt en wordt uitgezet; CBUSA is geïntegreerd. Er zijn geen nieuwe overnames gevonden na 2023.
- **De groeimotor is verschoven naar financiële modules en betalingsverwerking**: Bill Pay (feb 2026), tax recognition en progress invoicing (Q2 2026). Dat is logisch — betalingsvolume schaalt met klantomzet, licenties niet.
- **De prijs is naar boven bewogen richting midmarket.** Het onderste segment (<$500K bouwvolume) wordt de facto afgestoten naar JobTread, Contractor Foreman en BuildBook.
- **AI is nog grotendeels marketing.** Er is één echte AI-feature (AI Client Updates, juni 2025, die uit Daily Logs/Schedule/Change Orders/Invoices een wekelijkse klantupdate schrijft). Er is **geen AI-assistent, geen AI-calculatie/takeoff, geen AI in messaging, geen unified "Buildertrend AI"-product**.
- **Structurele kwetsbaarheden:** prijsdruk van onderaf; een gesloten API in een markt die steeds meer richting integratie beweegt; geen enkel antwoord op BIM/openBIM terwijl dat in Europa en delen van Noord-Amerika opdrachtgevers-eis wordt; en een groeiende groep klanten die het exit-probleem inmiddels kent.

---

## 8. Eindoordeel

**Buildertrend is een uitstekend bedrijfsvoeringsplatform voor Amerikaanse woningbouwers, en een middelmatig planningsinstrument dat zichzelf als planningsinstrument verkoopt.**

Wat het goed doet, doet het echt goed: de planning zit ingebed in een keten die van lead tot garantie loopt, opdrachtgevers en onderaannemers zitten gratis in hetzelfde systeem, de mobiele app werkt offline, en de support scoort 4,7/5 over bijna 2.500 reviews. Voor een bouwer die 15 tot 60 woningen per jaar bouwt en één systeem wil, is dit een verdedigbare, misschien zelfs de verstandigste keuze in Noord-Amerika.

Maar op de vraag die dit onderzoek stelt — **zit er een echte netwerkplanning-engine onder?** — is het antwoord nee. Er is een Gantt met FS- en SS-relaties, lag, automatische doorschuif, een blauwe kritiek-pad-markering en een baseline-snapshot. Er is **geen zichtbare float, geen late dates, geen constraints, geen resource-loading, geen leveling, geen kalender per resource, geen EVM, geen FF/SF, geen 4D, geen locatiegebaseerde of lean-planning**. Het is een taakgestuurde bouwkalender met dependency-doorrekening. Dat is genoeg om een woningbouwproject te coördineren; het is niet genoeg om een planning te sturen, te analyseren of te verdedigen. Reviewers zeggen dit ook letterlijk zodra het project complexer wordt dan een woning.

Commercieel is het beeld gemengd tot ongunstig. De prijs is in acht jaar van ~$99 naar honderden tot ruim duizend dollar per maand gegaan, verhogingen van 50–65% bij verlenging zijn meermaals gerapporteerd, en sinds 2026 is er **geen publieke prijs meer** — je moet je bouwvolume opgeven voordat je een getal ziet, wat betekent dat groei automatisch prijsverhoging is. Daarbovenop komt ~2,9% betalingsverwerking, die bij enige omvang de licentiekosten ruimschoots overtreft. De jaarcontracten verlengen automatisch en kennen geen restitutie.

Op openheid is het oordeel hard: **dit is een van de meest gesloten pakketten in dit onderzoek.** Geen publieke API (terwijl de Auth0-flow bewijst dat er een externe API-scope bestáát die klanten niet krijgen), geen Zapier-app, acht marketplace-integraties die allemaal boekhouding of CRM zijn, nul open standaarden, en een door BBB-klachten en Capterra-reviews gedocumenteerd exit-probleem — *"there is no simple or bulk way to download years' worth of files, photos, proposals, and customer information."* Wie hier tien jaar in zit, zit vast.

**Voor de opdrachtgever, concreet:**
- Buildertrend is **geen benchmark voor planningsfunctionaliteit** — de lat ligt bij MS Project, P6 en Asta, niet hier.
- Buildertrend is **wel een benchmark voor UX, mobiel gebruik, stakeholdercommunicatie en onboarding**. Op die assen verliezen traditionele planningspakketten, en dat is de reden dat dit product 20.000 bouwbedrijven heeft. Een open-source planner die die assen negeert, wint geen gebruikers ongeacht hoe correct zijn CPM is.
- Buildertrend is **geen integratiedoelwit.** De enige realistische brug is een CSV-importprofiel voor schedule items.
- Buildertrend is **wel een argument.** IFC 4.3 als native, leesbaar, leverancieronafhankelijk bestandsformaat is het directe antwoord op de best gedocumenteerde klacht van Buildertrends eigen klanten. Dat is een positioneringskans, niet alleen een technische keuze.

**Samengevat:** sterk product, verkeerde categorie voor deze studie, en een leerzaam voorbeeld van hoe een gesloten datamodel zich op termijn tegen de gebruiker keert.

---

## Bronnen

Alle bronnen geraadpleegd op **25 juli 2026**, tenzij anders vermeld. Waar een bron zelf een publicatiedatum draagt, is die vermeld.

**Leverancier (primair)**
1. Buildertrend — Pricing. https://buildertrend.com/pricing/ (custom quote, onbeperkt gebruikers/projecten, 10% jaarkorting, volume-intake)
2. Buildertrend — About us. https://buildertrend.com/about/ (oprichting 2006, oprichters, mijlpalen 2008/2011/2012/2018/2019/2023, 1M+ gebruikers, 2M+ projecten)
3. Buildertrend — Homepage. https://buildertrend.com/ ("Trusted by 20,000+ builders", Capterra 4,5 / G2 4,3, "over half of new home builds in the U.S.")
4. Buildertrend — Schedule (productpagina). https://buildertrend.com/project-management/schedule/ (Gantt, predecessors/dependencies, critical path method, baselines, work calendar overlays, kleurcodering, meldingen, offline mobiel, sjablonen)
5. Buildertrend — Subcontractor software. https://buildertrend.com/communication/subcontractor-software/ (subportaal, eigen login, planningsinzage, goedkeuring om te starten)
6. Buildertrend — *Your guide to scheduling success in Buildertrend* (whitepaper PDF, gepubliceerd 04-2021). https://buildertrend.com/wp-content/uploads/2021/04/GC-Your-Guide-to-Scheduling-Success-v2-compressed.pdf (Gantt-gedrag, baseline-"screenshot", workday expectations, phases list, Agenda/Month/Week/Day, linked To-Do's, **overlap-drempel per gebruiker**, eenrichtings-kalendersync, sjablonen uit afgesloten projecten, multi-project Gantt)
7. Buildertrend — Persbericht CoConstruct-overname (24-02-2021). https://buildertrend.com/press-releases/coconstruct-acquisition/ (datum, Bain Capital Tech Opportunities + HGGC + Serent Capital, 23.000+ klanten, 1,1M gebruikers, $200+ mrd, leiderschap, CBUSA okt 2020, adviseurs)
8. Buildertrend — integration-sitemap.xml. https://buildertrend.com/integration-sitemap.xml (volledige marketplace: Sage Intacct, Pipedrive, Salesforce, HubSpot, Home Depot Pro Xtra, Gusto, Xero, QuickBooks)
9. Buildertrend — Auth0-loginflow (`login.buildertrend.com/authorize`), waargenomen bij een redirect vanaf buildertrend.com (audience `https://api.buildertrend.net/`, scopes `btapi:external`, `btapi:builder:read`, `btapi:user:read`, `btapi:internal`)
10. Buildertrend Help Center — Schedule Overview / Advanced Schedule Overview. https://helpcenter.buildertrend.net/s/article/Schedule-Overview en /Advanced-Schedule-Overview (Finish-To-Start én Start-To-Start predecessors via drag-and-drop; Advanced Schedule = Critical Path, Workday Exceptions, Phases, Tags, Reoccurring Items, Notifications, Schedule Confirmations; kritiek pad blauw; default workdays). *Let op: de artikelen zelf waren niet direct op te halen (Salesforce-renderer); de citaten komen uit zoekmachine-snippets van deze URL's.*
11. CoConstruct — coconstruct.com ("CoConstruct's transition to Buildertrend is entering its final phase")

**Investeerders**
12. HGGC — Portfolio: Buildertrend. https://hggc.com/portfolio/buildertrend/ (investering 24-12-2020, status "Current", partner sinds 2020)
13. Bain Capital — case study Buildertrend ("transformational merger… 23,000+ construction clients")

**Reviewplatforms**
14. Capterra — Buildertrend Reviews. https://www.capterra.com/p/70092/Buildertrend/reviews/ (4,5/5 over 2.486 reviews; ease of use 4,4; customer service 4,7; cons: steep learning curve, inconsistente UI, data-exportproblemen bij opzegging, **limited scheduling complexity for large commercial projects**, QuickBooks-klachten, mobiele laadproblemen)
15. Capterra Australia — Buildertrend. https://www.capterra.com.au/software/70092/buildertrend (flat rate, AUD/USD, 90% aanbeveling, identieke cons-set voor AU-markt)
16. GetApp — Buildertrend. https://www.getapp.com/construction-software/a/buildertrend/ (4,5/5, 2.400+ reviews; ease of use 4,4 / features 4,3 / value 4,3 / support 4,7; 7 integraties; "overwhelming email notifications")
17. Software Advice — Buildertrend profile. https://www.softwareadvice.com/construction/buildertrend-profile/ (FAQ "plans starting at $499/month"; job scheduling 4,72/5; contract management 3,25/5; supplier management 3,44/5; **"10x more clicking than needed"**; 61% van gebruikers heeft 2–50 medewerkers)
18. SelectHub — Buildertrend. https://www.selecthub.com/construction-project-management-software/buildertrend/ (#3 in categorie, 90% satisfaction over 1.577 reviews; 92% positief over support; **60% noemt QuickBooks-integratie moeizaam**; **83% wil meer aanpasbaarheid**; verouderde prijsopgave $99/$299 — niet gebruiken)
19. Better Business Bureau — Buildertrend (Omaha, NE). https://www.bbb.org/us/ne/omaha/profile/computer-software/buildertrend-0714-300027310/customer-reviews (**1,09/5 over 11 reviews**, niet geaccrediteerd; thema's: facturatie, geweigerde restituties, "pressure sales people", demo's die "leave out all the shortcomings", **"there is no simple or bulk way to download years' worth of files, photos, proposals, and customer information"**)

**Fora / gebruikersstemmen**
20. r/Construction — "Buildertrend feedback". https://www.reddit.com/r/Construction/comments/14z3wl0/ — *"At the beginning of the year they were going to raise our prices from like $350 to $800."* *(via zoekmachine-snippet; reddit.com was in deze sessie niet direct benaderbaar)*
21. r/Contractor — "Any other contractor app you are happy to use…". https://www.reddit.com/r/Contractor/comments/12ta9tm/ — *"Buildertrend increases its monthly payments for all three subscription plans after two months for nothing really."* *(via snippet)*
22. r/Construction — "Experience with buildertrend?". https://www.reddit.com/r/Construction/comments/10qa9jc/ (kernthema: is het de kosten waard; subs updaten de planning niet, PM werkt alsnog handmatig bij) *(via snippet)*

**Prijsanalyses (secundair — geen officiële lijstprijzen meer verifieerbaar)**
23. DownToBid — Buildertrend Pricing in 2026. https://downtobid.com/blog/buildertrend-pricing (Essential $399–499 / $339 jaarlijks; Advanced $699–799 / $599; Complete $999–1.099 / $829; Boost gratis bij jaarcontract, $100/mnd maandelijks; ~2,99% cc-fee; geen trial, 30 dagen geld terug; TCO $8.000–10.000 midmarket)
24. GetOneCrew — Buildertrend Pricing: Full 2026 Breakdown. https://www.getonecrew.com/post/buildertrend-pricing (identieke tierbandbreedtes; onboarding $400–1.500; 2,9% + $0,30; "price increases of 50% or more at renewal"; jaar-1 Advanced $8.788–12.288)
25. Projul — Buildertrend Pricing 2026: Volume-Based Quotes Explained. https://projul.com/blog/buildertrend-pricing-analysis-2026/ (historische trend 2018–2019 $99–199 → 2022 "50–65% increases at renewal" → 2023–24 tiers → 2026 volumequotes; 11 volumebrackets; Boost; coaching $500–2.000) — **let op: Projul is een directe concurrent; behandelen als belanghebbende bron**
26. Built Simple (AU) — vergelijking Built Simple vs Buildertrend vs Procore. https://builtsimple.com.au/blog/built-simple-vs-buildertrend-vs-procore ("Price increases are frustrating. It was half this cost 3 years ago"; "we don't use half the features"; "support quality has declined as they've grown"; "mobile app is sluggish on older phones"; 40–60% duurder dan lokaal alternatief) — **concurrentbron**
27. BuildBook — How to cancel your Buildertrend account. https://buildbook.co/blog/how-to-cancel-your-buildertrend-account — **concurrentbron**
28. Build IT Systems — "Cancelling your Buildertrend account" (31-01-2024). https://blog.builditsystems.com/post/2024/01/31/cancelling-your-buildertrend-account-yeah-breaking-up-is-hard-to-do (auto-renewal, schriftelijke opzegging vóór verlenging, **"CUSTOMER WILL NOT BE ISSUED A REFUND FOR THE MOST RECENT SUBSCRIPTION FEE OR ANY PREVIOUSLY CHARGED FEES"**, advies om zelf alles te exporteren)

**API / interoperabiliteit**
29. UseCarly — "Buildertrend AI in 2026: What It Actually Does" (19-07-2026). https://www.usecarly.com/blog/buildertrend-ai/ (**"Buildertrend does not publish a public API a customer can use. There's no developer portal"**; developer.buildertrend.com resolvet niet; **"There is no official Buildertrend app on Zapier"**; AI Client Updates juni 2025 is de enige echte AI-feature; Bill Pay is een approvals-workflow)
30. Supergood — API Report Card: Buildertrend. https://supergood.ai/api-report-card/buildertrend (**grade F**; "No public API… anything custom requires a partnership or hired freelancers") — **belanghebbende bron (verkoopt UI-automatisering)**
31. API Evangelist — buildertrend. https://github.com/api-evangelist/buildertrend ("non-public (partner-only) API provider")
32. Buildern — How to import schedule items from Buildertrend to Buildern. https://help.buildern.com/en/articles/13774055-... (migratie loopt via **Excel-export uit Buildertrend**) — **concurrentbron**
33. Eigen verificatie: `developers.buildertrend.com` resolvet niet (DNS ENOTFOUND, 25-07-2026)

**Marktcontext**
34. BRCKS — "CoConstruct shutting down: alternatives" (11-07-2026). https://www.brcks.io/blog/coconstruct-shutting-down-alternatives/ (tijdlijn: feb 2021 overname; **april 2022 laatste productupdate**; **31 maart 2027 read-only**; CoConstruct legacy $99–599/mnd vs Buildertrend $499–1.099; JobTread $199/mnd + $20/gebruiker) — **concurrentbron; de 2027-datum is niet door Buildertrend bevestigd**
35. CBUSA — "CBUSA and CoConstruct join the Buildertrend family". https://cbusa.us/blog/cbusa-coconstruct-join-buildertrend/
36. ZipDo — Building schedule software / Construction project scheduling software. https://zipdo.co/best/building-schedule-software/ (Buildertrend als **"field-facing platform"**, "turning schedule items into task execution, approvals, and progress updates" i.p.v. "traditional CPM-oriented dependency logic"; "scheduling depth can feel limited for complex, multi-phase critical path needs"; contrast met MS Project / P6 / Asta Powerproject)
37. Project5Pi — Construction general contracting comparison 2026. https://project5pi.com/blog/posts/construction-general-contracting-comparison-2026 ("Buildertrend remains the standard for residential builders needing integrated CRM and client portals")
38. B2BSalesTools — Buildertrend vs JobTread (2026). https://b2bsalestools.com/compare/buildertrend-vs-jobtread/ ("Buildertrend is the market leader in residential PM with mature product depth")
39. BuildersDigest — "Procore vs Buildertrend vs the new wave: a 2026 buyer's framework". https://buildersdigest.co/articles/procore-vs-buildertrend-vs-new-wave-2026-buyers-framework
40. Growjo / Compworth / RocketReach / Similarweb / Prospeo — omzet-, medewerkers- en waarderingsschattingen ($171,6M–$182,2M omzet; 501–1.000 medewerkers; ~$320M waardering). **Alle cijfers zijn modelmatige schattingen van derden; Buildertrend publiceert geen financiële gegevens.**

**Methodologische opmerking.** De WebSearch-tool was in deze sessie uitgeput; het onderzoek is uitgevoerd met directe WebFetch-ophalingen en met DuckDuckGo/Bing/Brave/Yahoo als zoekproxy's. Reddit was niet direct benaderbaar — Reddit-citaten komen uit zoekmachine-snippets en zijn als zodanig gemarkeerd. G2 en TrustRadius blokkeerden geautomatiseerde toegang (HTTP 403); hun scores zijn overgenomen zoals door Buildertrend zelf en door aggregators gerapporteerd. Waar een bron een commercieel belang heeft bij een negatief oordeel over Buildertrend (Projul, BRCKS, Built Simple, BuildBook, Buildern, Supergood) is dat expliciet bij de bron vermeld, en is de betreffende claim waar mogelijk tegen een neutrale bron gelegd.
