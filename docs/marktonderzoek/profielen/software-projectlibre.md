# ProjectLibre — diepgaand softwareprofiel

**Onderzoeksdatum:** 25 juli 2026
**Analist:** marktonderzoek planningssoftware
**Onderzochte versies:** ProjectLibre Desktop 1.9.8 (28/30 april 2025) en ProjectLibre Cloud AI 2.0 (mei 2026)

> **Methodische opmerking.** Dit profiel is opgebouwd uit primaire bronnen (leverancierssite, officiële handleiding, broncode-repository op SourceForge, officieel supportforum) aangevuld met reviewaggregators, AlternativeTo, Hacker News en Wikipedia. G2, Capterra, TrustRadius, Reddit en Software Suggest blokkeerden geautomatiseerde toegang (HTTP 403/404); waar reviewsentiment wordt geciteerd, komt dat uit Software Advice/GetApp (dezelfde reviewpool), AlternativeTo en Hacker News. Alle bedragen, aantallen en data staan met bron-URL in de bronnenlijst. **Alles wat een schatting is, is expliciet gemarkeerd met "SCHATTING".**

---

## 1. Wat het is

### Leverancier en eigendom

ProjectLibre wordt ontwikkeld door **ProjectLibre Inc.**, een privaat bedrijf met vestigingen in San Mateo (Californië, VS) en Parijs (Frankrijk), dat naar eigen zeggen "remote-first" werkt. Oprichters zijn **Marc O'Brien** en **Laurent Chretienneau**.

### Historie — de lijn Projity → OpenProj → Serena → ProjectLibre

De historie is essentieel om het product te begrijpen, want ze verklaart zowel de technische kwaliteit van de planningskern als de trage ontwikkeling:

| Jaar | Gebeurtenis |
|---|---|
| 2007 | Marc O'Brien, Howard Katz en Laurent Chretienneau richten **Projity** op en brengen **OpenProj** uit |
| jan 2008 | OpenProj 1.0 verlaat bèta; >4 miljoen downloads in 142 landen |
| eind 2008 | Projity wordt overgenomen door **Silver Lake Partners** via dochter **Serena Software** |
| nov 2008 | Ontwikkeling en support van OpenProj worden feitelijk stopgezet; latere commits introduceren regressies en OpenProj verliest zijn MS Project-compatibiliteit |
| 2012 | De oorspronkelijke oprichters starten **ProjectLibre**; eerste release augustus 2012 |
| 2012–2019 | Reeks desktopreleases (1.5.9 t/m 1.9.1) |
| jan 2021 | Versie **1.9.3** — daarna vier jaar stilte op de desktop |
| 2023–2025 | Focus verschuift naar **ProjectLibre Cloud** (proprietary SaaS) |
| apr 2025 | Versie **1.9.8** — Java 21/jpackage, ARM-builds, prestatie- en toolbarfixes |
| 2025 | Vier grote Cloud-releases tegenover één desktoprelease |
| mei 2026 | **ProjectLibre Cloud AI 2.0** gepositioneerd als "the Enterprise Replacement for Microsoft Project Online" |
| jul 2026 | Cloud-upgradecampagne voor teams; desktop nog steeds op 1.9.8 |

Belangrijk: ProjectLibre is **geen fork** van OpenProj maar een herstart door dezelfde oprichters op dezelfde codebasis-lijn (`com.projity.*` packages leven nog steeds in de broncode — de Projity-erfenis is letterlijk aanwezig).

### Doelgroep en typische gebruikers

Het product is de facto in tweeën gesplitst:

- **Desktop (gratis, open source):** individuele projectmanagers, ZZP'ers, MKB, onderwijs, overheden en NGO's met licentiebudgetdruk, en gebruikers in opkomende markten. Positionering: "de #1 vervanging van Microsoft Project" voor de **enkele gebruiker met één project tegelijk**.
- **Cloud (betaald, gesloten):** organisaties met meerdere projecten en teams, met portfolio-overzicht, gedeelde resourcepool en rolgebaseerde rechten. De leverancier zegt zelf expliciet dat de desktop "ideaal is voor individuen en één project" en dat teams moeten upgraden.

### Sectoren en regio's

De leverancier claimt **193 landen** (soms "200+", cijfers zijn intern inconsistent), **alle zeven continenten**, **31 talen** in de gebruikersinterface en **1.700+ universiteiten**. Er is geen sectorspecifieke functionaliteit: ProjectLibre is een generieke CPM-planner zonder bouw-, engineering- of software-specifieke modules. Genoemde referenties in oudere reviewliteratuur (Clinton Foundation, IBM, Cisco, Boeing, Caterpillar) zijn **leveranciersclaims uit ca. 2015 en niet verifieerbaar**; behandel ze met scepsis — een gratis download zegt niets over organisatiebrede adoptie.

Regionaal is de kracht juist het ontbreken van een regionaal zwaartepunt: het is waarschijnlijk het meest wereldwijd gedistribueerde planningspakket in zijn categorie, precies omdat het gratis en offline is.

---

## 2. Functionaliteit en techniek

### Heeft het een échte CPM-engine? — Ja, en dat is een reëel verschil

Dit moet expliciet gezegd worden, omdat de markt vol staat met "werkbeheer"-tools (monday.com, Asana, ClickUp, Trello-achtigen) die alleen een balkje tekenen op basis van handmatig ingevoerde start- en einddata, zonder netwerkdoorrekening. **ProjectLibre hoort niet in die categorie.** Het is een echte netwerkplanner met een forward/backward pass, geërfd uit de OpenProj/Projity-engine die inmiddels bijna twintig jaar oud is.

Concreet geverifieerd in de officiële handleiding (ProjectLibre_Doc_v1.9.8):

| Capability | Status | Bewijs |
|---|---|---|
| **Afhankelijkheidstypen** | **FS, SS, FF, SF** — alle vier | Officiële handleiding, expliciet met FS als default |
| **Lag / lead** | Ja, positieve én negatieve lag | Officiële handleiding |
| **Kritiek pad** | Ja, berekend en rood weergegeven in Gantt | Officiële handleiding |
| **Total slack** | Ja, als aparte balkstijl aan/uit te zetten | Officiële handleiding |
| **Free slack** | **Niet gedocumenteerd** | Ontbreekt in handleiding |
| **Netwerkdiagram (PERT)** | Ja | Leveranciersdocumentatie + productpagina |
| **WBS** | Ja, hiërarchische decompositie | Leveranciersdocumentatie |
| **Kalenders** | Ja: standaardkalender, eigen kalenders (bv. 24-uurs kraan), **resourcekalenders per persoon/middel**, feestdagen en niet-werkdagen | Officiële handleiding |
| **Constraints** | Aanwezig (constraint-iconen in de takenlijst; Cloud noemt "Must Finish"), maar **niet uitgewerkt in de handleiding** | Handleiding noemt alleen de iconen; Cloud AI 2.0-pagina noemt "Baselines, Constraints" |
| **Baselines** | Ja, **tot 10 benoemde baselines** met schema-, resource- en kostendata | Officiële handleiding |
| **Resourcemodel** | Werk- en materiaalresources, toewijzingen, %-toewijzing, resource usage-view en histogram | Officiële handleiding |
| **Resource leveling** | Aanwezig, maar **nauwelijks gedocumenteerd**; het algoritme en de mate van automatisering worden niet beschreven | Handleiding is expliciet vaag hierover |
| **Kostenmodel** | Ja: standaardtarieven, overwerktarieven, budgettracking | Officiële handleiding |
| **Earned Value (EVM)** | **Geadverteerd** ("Earned Value Costing") maar **niet terug te vinden in de handleiding** — geen BCWS/BCWP/ACWP/CPI/SPI-beschrijving | Discrepantie tussen marketing en documentatie |
| **Taaktypen (fixed duration/units/work)** | Milestones bevestigd; de klassieke drie taaktypen worden **niet expliciet bevestigd** in de handleiding — waarschijnlijk aanwezig via de OpenProj-erfenis, **SCHATTING** | — |

**Oordeel over de engine:** de kern is serieus en volwassen. FS/SS/FF/SF met negatieve lag, resourcekalenders en tien baselines is meer dan wat het overgrote deel van de moderne SaaS-werkbeheertools biedt. De **documentatie** van die kern is echter beduidend zwakker dan de kern zelf, wat betekent dat gevorderd gebruik (constraints, leveling, EVM) neerkomt op uitproberen en gokken.

### Platform en architectuur

- **Taal/technologie:** Java, UI in **Swing** — een GUI-toolkit die door Oracle al lang niet meer actief doorontwikkeld wordt.
- **Distributie:** vanaf 1.9.8 gebouwd met **jpackage** op **Java 21**, met ARM-ondersteuning; daarvoor een losse `.jar` (22,6 MB) plus systeem-JRE.
- **Platforms:** Windows, macOS, Linux; via de jar ook BSD en Solaris.
- **Native bestandsformaat:** `.pod` — een eigen binair formaat.
- **Codeomvang/modules:** zes modules — `projectlibre_core`, `projectlibre_ui`, `projectlibre_exchange`, `projectlibre_reports`, `projectlibre_contrib`, `projectlibre_build`.

### Schaalbaarheid — hoeveel taken realistisch?

Er is **geen officieel gepubliceerde limiet** en geen gepubliceerde benchmark. Wat wel bekend is:

- De **desktop** is een single-user Swing-applicatie die het hele projectmodel in het Java-geheugen houdt. Gebruikers melden traagheid ("unusable, very slow") en het ontbreken van basale weergave-optimalisaties. Release 1.9.8 bevatte expliciet "performance fixes", wat bevestigt dat prestaties een bekend pijnpunt waren.
- **SCHATTING (gemiddeld vertrouwen):** comfortabel werken tot ~1.000–2.000 taken; daarboven merkbare vertraging bij scrollen, herberekenen en Gantt-tekenen. Enkele duizenden taken is waarschijnlijk het praktische plafond op de desktop. Dit is *niet* het niveau van Primavera P6 of Asta Powerproject, die routinematig 50.000+ activiteiten aan.
- De **Cloud** zou zelf "hundreds or thousands of tasks" met responsieve navigatie claimen. **Bij hercontrole (25-07-2026) is dit citaat niet terug te vinden**: noch de Cloud-AI-pagina noch de Cloud AI 2.0-productpagina noemt enig taakaantal. Behandel deze claim als **onbevestigd** — er is dus ook voor de Cloud geen gepubliceerde schaalindicatie.
- **Multi-project consolidatie op de desktop bestaat niet.** Meerdere projecten, een gedeelde enterprise-resourcepool en portfolio-analyse zitten uitsluitend in de betaalde Cloud.

### Bekende technische mankementen (geverifieerd)

1. **HiDPI/4K-schaling ontbreekt.** Gebruikers melden dat menu-items op 4K-schermen onleesbaar klein zijn. De ProjectLibre-organisatie erkent dit in het eigen forum als een Java Swing-beperking waarvoor "a significant update" nodig is — en verwijst gebruikers naar de Cloud, waar schaling wél werkt.
2. **macOS Apple Silicon start niet.** Versie 1.9.8 crasht of start helemaal niet op M1/M2/M4-Macs door een ontbrekende `libharfbuzz.0.dylib`. Het officiële advies was aanvankelijk **teruggaan naar 1.9.3 uit 2021**. De werkende oplossing (Homebrew + `brew install harfbuzz`) komt uit de community, niet van de leverancier, en is niet in de installatiedocumentatie opgenomen. De draad loopt van **mei 2025 tot juni 2026** zonder officiële fix.
3. **Kalenderwijzigingen werken niet automatisch door** in de planning — openstaande forumklacht van juli 2026.
4. **Taken zijn niet te herordenen** zonder knippen-plakken, waarbij afhankelijkheden verloren gaan — gemeld op AlternativeTo als blokkerend voor grotere projecten.

---

## 3. Prijzen

### ProjectLibre Desktop

| Item | Prijs | Bron | Datum |
|---|---|---|---|
| ProjectLibre Desktop (alle functies) | **€/$ 0,00 — gratis, geen functiebeperking, geen seat-limiet, PDF-export zonder restricties** | projectlibre.com/projectlibre-desktop/ | 25-07-2026 |
| Licentie | **CPAL 1.0** (Common Public Attribution License) | Wikipedia / SourceForge projectpagina | 25-07-2026 |
| Handleiding (12 talen) | Gratis (Google Docs) | projectlibre.com/projectlibre-documentation/ | 25-07-2026 |
| Donaties | Vrijwillig | project-management.com review | historisch |

### ProjectLibre Cloud

| Item | Prijs | Bron | Datum |
|---|---|---|---|
| ProjectLibre Cloud, per gebruiker | **$ 9,99 per gebruiker per maand, jaarlijks gefactureerd** | projectlibre.com blogpost "ProjectLibre Cloud: Upgrade for Teams and Companies" | gepubliceerd 13-07-2026, gecontroleerd 25-07-2026 |
| **Minimaal aantal seats** | **3 gebruikers** — letterlijke bronformulering: *"ProjectLibre Cloud is available for just $9.99 per user per month, billed annually, for teams of three or more users."* **Nuance na hercontrole:** dit is een doelgroep-formulering, geen expliciet gepubliceerde harde ondergrens; de leverancier zegt nergens "minimum 3 seats required". Behandel de 3-seatgrens als *waarschijnlijk* maar niet hard bevestigd. | idem | 13-07-2026 |
| Per gebruiker per jaar | **$ 119,88** — *eigen berekening (12 × $9,99)* | afgeleid | 25-07-2026 |
| Minimale jaarcontractwaarde | **$ 359,64 per jaar** (3 × $119,88) — *eigen berekening* | afgeleid | 25-07-2026 |
| Upgrade naar Cloud AI 2.0 voor bestaande abonnees | **Gratis** | projectlibre.com blogpost Cloud AI 2.0 | 18-05-2026 |
| Gratis proefperiode | Beschikbaar, maar **vereist een zakelijk e-mailadres** en handmatige provisioning; **duur niet gepubliceerd** | projectlibre.com/trial/ + Cloud AI 2.0-pagina | 25-07-2026 |
| Enterprise-staffels / volumekorting | **Niet gepubliceerd** | — | 25-07-2026 |
| Add-ons | **Geen gepubliceerde add-onprijzen**; AI-functionaliteit lijkt in de basisprijs inbegrepen | — | 25-07-2026 |
| Maandelijkse (niet-jaarlijkse) betaling | **GECORRIGEERD.** De eerdere formulering ("alle communicatie noemt jaarlijkse facturering") klopt niet. De blogpost van 13-07-2026 zegt *"billed annually"*, maar de Cloud-AI-productpagina spreekt van *"a simple monthly subscription"* en een *"monthly fee"* — zónder bedrag. De leverancierscommunicatie is dus **intern tegenstrijdig** over de facturatiecyclus; of maandelijks betalen daadwerkelijk kan, en tegen welke prijs, is niet vast te stellen. | projectlibre.com/projectlibre-pm-artificial-intelligence-cloud/ vs. blogpost 13-07-2026 | 25-07-2026 |
| Prijzen in EUR/GBP | **Niet gepubliceerd** — alleen USD | — | 25-07-2026 |

**Kritische observatie over prijstransparantie.** ProjectLibre heeft **geen publieke prijspagina**. `projectlibre.com/pricing` geeft HTTP 404. De enige vindbare prijs staat in een blogpost van 13 juli 2026. Wikipedia noemt eveneens $9,99/gebruiker/maand. Voor een product dat zichzelf positioneert als de vervanger van Microsoft Project Online is het ontbreken van een prijspagina, gepubliceerde staffels, SLA-voorwaarden en security-/compliance-documentatie een serieus inkoop-obstakel — zeker voor Europese aanbestedingen, waar prijstransparantie en verwerkersovereenkomsten formeel vereist zijn.

**Prijsvergelijking (context, SCHATTING op basis van algemeen bekende lijstprijzen — niet in dit onderzoek geverifieerd):** $9,99/gebruiker/maand ligt substantieel onder Microsoft Project Plan 3 en ver onder Primavera P6 EPPM. Als prijsargument is dat sterk; als er echter geen SLA, geen datalocatiegarantie en geen gepubliceerde beveiligingsdocumentatie tegenover staat, is de vergelijking niet zuiver.

---

## 4. VOORDELEN

1. **Het is een échte CPM-netwerkplanner, geen balkenschema-tekenaar.** FS/SS/FF/SF met positieve én negatieve lag, forward/backward pass, kritiek pad in rood, total slack, netwerkdiagram en WBS — allemaal geverifieerd in de officiële handleiding. Dit onderscheidt ProjectLibre fundamenteel van moderne werkbeheer-SaaS (monday, Asana, ClickUp, Trello) die alleen handmatig ingevoerde data visualiseren. Wie echte doorrekening nodig heeft, krijgt die hier gratis.

2. **Volledig gratis, zonder functionele afknijping.** Geen seat-limiet, geen taakbovengrens, geen watermerk, geen betaalde export. PDF-export en alle views zitten in de gratis versie. Bij vrijwel elke commerciële concurrent is de gratis tier een uitgeklede demo; hier is de gratis versie het volledige product.

3. **Open source onder CPAL 1.0, met beschikbare broncode.** De volledige Java-broncode van 1.9.8 staat op SourceForge. Dat betekent: geen harde vendor lock-in op de kern, mogelijkheid tot eigen fixes en forks, en auditeerbaarheid. Voor overheden en organisaties met een open-source-eerst-beleid is dat formeel een pluspunt (met belangrijke nuance — zie nadeel 2).

4. **Volwassen resource- en kostenmodel voor een gratis tool.** Resourcekalenders per persoon of middel (bijvoorbeeld een 24-uurs kraan), standaard- en overwerktarieven, resource usage-view met histogram, en **tot tien benoemde baselines** met schema-, resource- én kostendata. Tien baselines is meer dan veel betaalde tools bieden.

5. **Directe .mpp-migratie en een MS Project-achtige ribbon-UI.** Bestaande Microsoft Project-bestanden gaan direct open en de interface is bewust gemodelleerd naar MS Project. Voor een organisatie die van MS Project af wil, is de overstapdrempel — leercurve én dataconversie — minimaal. Reviewers noemen dit consistent als de belangrijkste reden om te kiezen.

6. **Echt cross-platform, inclusief Linux.** Eén Java-codebase voor Windows, macOS en Linux (plus BSD/Solaris via de jar). Op Linux is er nauwelijks een serieus alternatief voor klassieke CPM-desktopplanning; ProjectLibre vult daar een reëel gat.

7. **Ongeëvenaarde distributie en meertaligheid in zijn categorie.** ~7,8–8,4 miljoen downloads, circa 19.700 downloads per week op SourceForge (juli 2026), 193+ landen, **31 UI-talen** en gratis handleidingen in 12 talen. Voor internationaal opererende organisaties en voor onderwijs is die taaldekking uitzonderlijk.

8. **Sterke onderwijs- en trainingspositie.** 1.700+ universiteiten gebruiken het. Dat levert een gestage stroom afgestudeerden op die de tool kennen, en maakt het een logische keuze voor PM-cursussen, certificeringstrajecten (PMI/PRINCE2-achtig plannen) en pilots.

9. **Werkt volledig offline, zonder account.** Geen registratie, geen cloudafhankelijkheid, geen telemetriedwang, geen advertenties. Dat maakt het bruikbaar in gesloten, geclassificeerde of slecht geconnecteerde omgevingen — een categorie waar de meeste moderne concurrenten simpelweg niet inzetbaar zijn.

10. **Agressieve cloudprijs bij een reëel marktvenster.** $9,99/gebruiker/maand (jaarlijks gefactureerd, gericht op teams vanaf 3 gebruikers) is scherp geprijsd, en de end-of-life van Microsoft Project Online geeft ProjectLibre Cloud AI 2.0 een concreet, actueel migratieverhaal met directe .mpp-import. **Onafhankelijk bevestigd én gedateerd:** Microsoft Learn vermeldt letterlijk *"Microsoft Project Online will be retired in September 2026"* — het marktvenster is dus echt en bovendien acuut (nog circa twee maanden op de onderzoeksdatum). Dit was in de eerdere versie een onbevestigde leveranciers-premisse; het is nu een geverifieerd feit met datum.

---

## 5. NADELEN

1. **De desktopontwikkeling ligt praktisch stil.** Tussen versie **1.9.3 (8 januari 2021)** en **1.9.8 (30 april 2025)** zit een gat van **ruim vier jaar** met, blijkens de publieke commithistorie, feitelijk geen tussentijdse publieke ontwikkeling. Sinds april 2025 is er **niets meer verschenen** (stand 25 juli 2026 — vijftien maanden). De volledige publieke repository telt **circa 134 commits** over dertien jaar. Versies 1.9.4 t/m 1.9.7 zijn **nooit publiek uitgebracht**. In 2025 kreeg de Cloud vier grote releases, de desktop één. De richting is onmiskenbaar.

2. **"Open source" in naam, gesloten in praktijk.** Er is **geen officiële GitHub-repository**, geen publieke issue tracker, geen pull-request-workflow en geen zichtbare community-governance. De code verschijnt als grote, ondoorzichtige drops in een SourceForge-git-repo. De grootste GitHub-mirrors halen 82 en 63 sterren — verwaarloosbaar. Er is dus geen realistische route voor externe bijdragers en geen levensvatbare fork-gemeenschap als de leverancier ermee stopt. Dit ondermijnt het belangrijkste strategische argument voor open source: continuïteit onafhankelijk van de leverancier.

3. **macOS op Apple Silicon is al ruim een jaar kapot.** ProjectLibre 1.9.8 start niet op M1/M2/M4-Macs vanwege een ontbrekende `libharfbuzz` — het officiële advies was terugvallen op versie **1.9.3 uit 2021**. De werkende workaround komt uit de community (Homebrew) en is nooit in de officiële installatiedocumentatie opgenomen. De forumdraad loopt van **mei 2025 tot juni 2026** zonder oplossing. Voor een van de drie ondersteunde platformen is dat een fundamenteel supportfalen.

4. **De Java Swing-interface is technisch verouderd.** Geen HiDPI/4K-schaling: menu-items zijn op moderne schermen onleesbaar klein, en de leverancier erkent zelf dat hiervoor "a significant update" nodig is — en verwijst gebruikers naar de betaalde Cloud. Reviewers op GetApp/Software Advice noemen de interface consistent "outdated and less modern", met "graphics and navigation sometimes lacking polish" en functies die moeilijk te vinden zijn.

5. **Zeer beperkte interoperabiliteit — het grootste inhoudelijke bezwaar.** Geen **.mpp-export** (alleen openen), geen **XER**, geen **P6 XML/PMXML**, geen gedocumenteerde **CSV- of Excel-import/export**, geen **IFC**. De enige echte uitwisselbrug is MS Project XML (MSPDI). Het native `.pod`-formaat kan door derden (MPXJ) alleen **gelezen** worden, niet geschreven — wat betekent dat je data er wel in kan, maar er alleen via een lossy XML-conversie weer uit komt. Zie sectie 6 voor de volledige analyse.

6. **De documentatie is dun en loopt achter op de marketing.** De officiële handleiding beschrijft **constraints niet** (alleen de iconen), **earned value niet** (geen BCWS/BCWP/ACWP/CPI/SPI, terwijl "Earned Value Costing" prominent geadverteerd wordt), **free slack niet**, en **resource leveling alleen vaag** ("choosing appropriate percentage may be a better way to start this kind of resource leveling" — het algoritme en de automatiseringsgraad blijven onbesproken). AlternativeTo-gebruikers melden bovendien dat "help links go to removed pages". Gevorderd gebruik is daarmee grotendeels trial-and-error.

7. **De desktop kent geen samenwerking, geen multi-project en geen gedeelde resourcepool.** Alles wat een organisatie nodig heeft zodra er meer dan één planner of meer dan één project is — portfolio, enterprise resource pool, rolgebaseerde rechten, gelijktijdig bewerken — zit uitsluitend achter het betaalde Cloud-abonnement. De gratis versie is nadrukkelijk een eenpersoonstool, en de leverancier zegt dat inmiddels ook zelf.

8. **Concrete werkbaarheidsklachten uit de praktijk.** Taken kunnen niet worden herordend zonder knippen-plakken, waarbij afhankelijkheden resetten — direct blokkerend bij grotere plannen. Verder: ontbrekende basale weergave-opties (taaknamen op de balken, overlappende pijlen), traagheid ("unusable, very slow and with a bad ergonomy"), en een openstaande klacht van juli 2026 dat **gewijzigde werkdagen in een kalender niet automatisch doorwerken in de planning** — een correctheidsprobleem in de scheduling-kern, niet slechts een UI-ergernis. Het scherpste publieke oordeel blijft de Hacker News-reactie: *"I tried ProjectLibre and it just felt horribly, horribly broken."*

9. **Support is minimaal en de community is klein.** Het officiële forum telt **55 topics en 178 reacties** in de desktopsectie — voor een product met miljoenen downloads is dat verwaarloosbaar. Reviews op SourceForge zijn **uitgeschakeld** ("This project does not allow reviews to be posted"). In de reviewscores is **customer support de laagste deelscore (3,8/5)**. Er is geen SLA, geen betaalde supportoptie voor de desktop en geen zichtbare responstijdgarantie.

10. **Prijs- en leveranciers-transparantie schieten tekort.** Geen publieke prijspagina (`/pricing` geeft 404); de enige prijs staat in een blogpost. Geen gepubliceerde enterprise-staffels, geen SLA, geen datalocatie- of AVG-/verwerkersinformatie, geen securitycertificeringen (SOC 2, ISO 27001) gevonden. De trial vereist een zakelijk e-mailadres en handmatige provisioning. Voor Europese zakelijke inkoop is dit een reëel afbreukrisico.

11. **De marketingcijfers zijn intern inconsistent en daarmee onbetrouwbaar.** Bij hercontrole op 25-07-2026 staan op de **homepage alleen al** naast elkaar: "Trusted by 8.2 M+ users", "Downloaded Over 8,200,000", "Replacing Microsoft Project In 193 COUNTRIES", "on all 7 CONTINENTS", "20+ years of experience", "20K trusted companies", "200+ countries" én "10M active users". Meer actieve gebruikers (10M) dan downloads (8,2M) is logisch onmogelijk, en 193 vs. 200+ landen staat op dezelfde pagina. Wikipedia noemt weer "more than 8.4 million times across over 200 countries", de documentatiepagina "8.2 million users in 193 countries" en SourceForge 7,8 miljoen totaal. *(De eerder genoteerde claim "250.000+ community members" is bij hercontrole niet op de homepage teruggevonden — mogelijk elders op de site of inmiddels verwijderd; behandel als onbevestigd.)* Behandel **alle** door de leverancier gepubliceerde adoptiecijfers als marketing, niet als data.

---

## 6. Interoperabiliteit — apart en streng beoordeeld

Dit is voor een opdrachtgever die een open-source, IFC-gebaseerde planner bouwt de belangrijkste sectie, dus hier de harde feiten.

### Wat ProjectLibre wél kan

| Formaat | Lezen | Schrijven | Opmerking |
|---|---|---|---|
| **`.pod`** (native) | Ja | Ja | Eigen binair Java-formaat; door de handleiding aanbevolen als "highest reliability" |
| **`.mpp`** (Microsoft Project) | **Ja** | **Nee** | Reviewliteratuur noemt expliciet MS Project **2003, 2007, 2010**. Nieuwere MPP-versies openen in de praktijk vaak wel (het binaire formaat is sinds 2007 grotendeels stabiel), maar dit wordt nergens officieel gegarandeerd. |
| **MS Project XML (MSPDI)** | Ja | **Ja** | De enige echte tweewegbrug naar de buitenwereld |
| **PDF** | — | Ja | Print/export zonder restricties |

### Wat ProjectLibre níet kan

| Formaat / interface | Status | Consequentie |
|---|---|---|
| **`.xer` (Primavera P6)** | **Niet ondersteund** | Geen uitwisseling met de aannemers- en infrastructuurwereld, waar XER de facto standaard is |
| **P6 XML / PMXML** | **Niet ondersteund** | Idem |
| **`.mpp` schrijven** | **Niet ondersteund** | Je kunt MS Project-bestanden binnenhalen maar niet terugleveren in hetzelfde formaat — eenrichtingsverkeer richting de MS Project-wereld |
| **CSV / Excel import-export** | **Niet gedocumenteerd** | Geen ondersteunde route voor bulkimport uit calculatie- of ERP-systemen |
| **IFC 4.3 — `IfcWorkSchedule`, `IfcTask`, `IfcWorkCalendar`, `IfcRelSequence`** | **Volledig afwezig** | Zie hieronder |
| **4D BIM / koppeling met modellen** | **Afwezig** | Geen enkele BIM-integratie |
| **Locatiegebaseerde planning (LBMS), takt, line-of-balance** | **Afwezig** | Geen bouwspecifieke planningsmethodieken |
| **Publieke REST/GraphQL API** | **Geen documentatie gevonden** | Eén aggregator (SourceForge Software-listing) vinkt "API" aan, maar er is geen enkele API-documentatie, geen developerportal en geen SDK vindbaar. **Behandel als niet-bestaand tot het tegendeel blijkt.** |
| **Integraties met derde partijen (Jira, Slack, ERP, Teams)** | **Geen genoemd** | SourceForge-listing: "no third-party integrations are currently listed" |
| **Plugin-/extensiesysteem** | **Afwezig** | Geen uitbreidingsmodel voor derden |

### De IFC-conclusie

**ProjectLibre heeft nul IFC-ondersteuning.** Geen IFC-import, geen IFC-export, geen enkele verwijzing naar `IfcWorkSchedule`, `IfcTask`, `IfcWorkCalendar` of `IfcRelSequence` in de broncode-modules, de handleiding, de productpagina's of de release-notes. Het datamodel is dat van Projity uit 2007 — een MS Project-kloon-datamodel dat ruim voor de buildingSMART-scheduling-uitbreidingen is ontworpen en nooit is meegegroeid.

**Wat dat betekent voor een IFC-native open-source planner:** ProjectLibre is *niet* de concurrent op de IFC-as — het is de concurrent op de **positionerings-as** ("gratis open-source vervanger van MS Project"). Het bezet die naam en die zoekopdracht al veertien jaar met miljoenen downloads. De relevante strategische lessen:

- Het **beschikbare interoperabiliteitsgat is groot en onbezet**: de enige serieuze open-source CPM-desktop ter wereld kan geen XER, geen P6 XML, geen CSV, geen IFC en kan zelfs geen .mpp terugschrijven. Een planner die IFC 4.3 als *native* formaat gebruikt én XER/MSPDI kan lezen en schrijven, staat functioneel in een andere klasse.
- Het **technische gat is even groot**: Java Swing zonder HiDPI, een gebroken macOS-build en een release per vier jaar tegenover een moderne browser-/desktop-hybride.
- Tegelijk is de **planningskern van ProjectLibre inhoudelijk serieus** (FS/SS/FF/SF met lag, resourcekalenders, tien baselines). Dat is de lat waar de CPM-engine van een geloofwaardig alternatief minimaal overheen moet — een tool die alleen FS-relaties en één baseline kent, is voor een MS Project-vluchteling geen stap vooruit.
- De `.pod`-lock-in is een **positioneringskans**: ProjectLibre-gebruikers die willen migreren, kunnen hun data alleen via MSPDI-XML naar buiten krijgen. Een importeur die MSPDI én `.pod` (leesbaar via MPXJ) aankan, opent direct een migratiepad naar een installed base van miljoenen.

---

## 7. Marktpositie

### Waar het sterk staat, en waarom

ProjectLibre bezet één zeer specifieke, zeer waardevolle positie: **de standaard-antwoord-tool op de vraag "wat is een gratis alternatief voor Microsoft Project?"**. Die positie is verdiend en verdedigd door:

- **Merk en zoekvindbaarheid.** Veertien jaar consequent dezelfde positionering, meerdere SourceForge "Project of the Month"-awards (2012, 2015, 2016, 2019), InfoWorld "Best of Open Source Software", en vermelding in Opensource.com's top 10.
- **Distributievolume.** Circa 18.500–19.800 downloads per week op SourceForge alleen al (juli 2026; de projectpagina toont 19.762, de bestandenpagina 18.537 — de teller fluctueert) — die instroom is de facto onbetwist in deze categorie.
- **Onderwijskanaal.** 1.700+ universiteiten creëren een zelfversterkende cyclus van bekendheid.
- **Regio's zonder licentiebudget.** Waar een MS Project-licentie een reëel obstakel is, is ProjectLibre vaak de enige optie met een echte CPM-engine.

### Belangrijkste concurrenten

| Segment | Concurrenten | Positie van ProjectLibre |
|---|---|---|
| **Gratis / open source desktop-CPM** | GanttProject (GPL), OpenProject (GPL, web), Redmine, TaskJuggler, Gantt Project-forks | **Marktleider** in downloads en naamsbekendheid; GanttProject is simpeler maar actiever onderhouden |
| **Betaald generiek PM** | Microsoft Project / Planner Premium, Smartsheet, Wrike, monday.com, ProjectManager.com, Zoho Projects | Verliest op UI, samenwerking, integraties en support; wint uitsluitend op prijs |
| **Zware CPM / bouw & infra** | Primavera P6, Asta Powerproject, Deltek Open Plan/Acumen, Spider Project, Tilos, Synchro (4D) | **Niet competitief.** Geen XER, geen 4D, geen LBMS, geen schaalbaarheid boven enkele duizenden taken |
| **Cloud-PPM na Project Online-EOL** | Microsoft Planner Premium, Smartsheet, Celoxis, Planview, Sciforma | ProjectLibre Cloud AI 2.0 is een geloofwaardige *prijsvechter*, maar mist gepubliceerde SLA's, compliance en enterprise-referenties |

### Trend

De trendlijn is helder en gaat twee kanten op tegelijk:

- **Desktop: aflopend.** Eén release in vijf jaar, een kapotte macOS-build, geen HiDPI, en een leverancier die gebruikers met UI-klachten expliciet naar de betaalde Cloud verwijst. Het product wordt niet formeel EOL verklaard, maar het wordt ook niet meer serieus onderhouden. **SCHATTING (hoog vertrouwen):** de desktop functioneert nu vooral als gratis acquisitiekanaal voor de Cloud.
- **Cloud: opkomend maar onbewezen.** Vier grote releases in 2025, AI-functies, portfolio, enterprise resourcepool, real-time samenwerking, en een scherpe timing rond de end-of-life van Microsoft Project Online — die door Microsoft zelf is bevestigd op **september 2026** (Microsoft Learn, Project Online service description). Publiek bewijs van tractie is er echter nauwelijks: **7 topics en 12 reacties** in het Cloud-forum, geen klantcases met namen, geen omzetcijfers, geen analistendekking (Gartner Peer Insights bevat geen substantieel ProjectLibre-profiel).

### Gebruikersaantallen en omzet

- **Downloads:** ~7,8 miljoen (SourceForge-teller, juli 2026) tot 8,2–8,4 miljoen (leveranciersclaim). ~19.700/week.
- **Actieve gebruikers:** de claim "10M active users" is **niet geloofwaardig** — dat is meer dan het totale aantal downloads.
- **Betaalde Cloud-abonnees:** **niet gepubliceerd**.
- **Omzet:** **niet gepubliceerd; geen funding-informatie toegankelijk** (Crunchbase blokkeerde toegang).
- **SCHATTING (laag vertrouwen):** gegeven de zeer beperkte Cloud-forumactiviteit, het ontbreken van enterprise-referenties, van analistendekking en van een salesorganisatie, is een orde van grootte van enkele duizenden betaalde seats aannemelijk. Bij $119,88 per seat per jaar komt dat neer op **een jaaromzet in de lage enkele miljoenen dollars of minder**. Dit is een geïnformeerde gok op basis van indirecte signalen, **geen gemeten cijfer** — behandel het als zodanig.
- **Teamgrootte:** niet gepubliceerd. Op basis van de commitfrequentie en de releasecadans: **SCHATTING (gemiddeld vertrouwen)** een zeer klein team, waarschijnlijk minder dan tien mensen, met de desktop grotendeels in onderhoudsmodus.

---

## 8. Eindoordeel

### Voor wie wél

- **De individuele projectmanager die van Microsoft Project af moet om budgetredenen** en één project tegelijk plant met enkele honderden taken. Hier is ProjectLibre uitstekend: gratis, vertrouwde ribbon, opent bestaande .mpp-bestanden, echte CPM eronder.
- **Onderwijs en training.** Studenten leren echte netwerkplanning — FS/SS/FF/SF, kritiek pad, slack, baselines, resourcekalenders — zonder licentiekosten, in 31 talen. In deze rol is ProjectLibre moeilijk te verslaan.
- **Linux-gebruikers die klassieke CPM-planning nodig hebben.** Er is nauwelijks alternatief.
- **Offline, gesloten of slecht geconnecteerde omgevingen** waar cloud-SaaS categorisch niet mag of niet kan.
- **Windows-gebruikers.** Nadrukkelijk *niet* macOS: op Apple Silicon is het product al meer dan een jaar feitelijk onbruikbaar zonder handmatige Homebrew-ingrepen.

### Voor wie níet

- **Bouw-, infra- en engineering-organisaties die met aannemers en opdrachtgevers plannen uitwisselen.** Geen XER, geen P6 XML, geen .mpp-export. Je kunt niet meepraten in de keten. Dit alleen al diskwalificeert ProjectLibre voor serieus contractueel bouwplanwerk.
- **Iedereen met een BIM- of 4D-ambitie.** Geen IFC, geen modelkoppeling, geen locatiegebaseerde planning, geen takt.
- **Grote programma's.** Boven enkele duizenden activiteiten loopt de Swing-desktop vast; multi-project consolidatie bestaat op de desktop niet.
- **Teams die samenwerken.** De gratis versie is per definitie eenpersoons; alles daarboven vereist het Cloud-abonnement, dat zijn enterprise-claims nog niet publiek heeft waargemaakt.
- **Organisaties met formele inkoop-, security- of AVG-eisen.** Geen SLA, geen gepubliceerde compliance, geen prijspagina, geen datalocatiegarantie.
- **Organisaties die open source kiezen vanwege continuïteitsgaranties.** De governance biedt die garantie niet: geen GitHub, geen issue tracker, geen bijdragersproces, geen levensvatbare fork-gemeenschap. Als ProjectLibre Inc. morgen stopt, stopt ProjectLibre.

### Is dit een serieus alternatief voor klassieke CPM-tools?

**Gedeeltelijk — en de scheidslijn is scherp.**

**Ja** ten opzichte van **Microsoft Project Standard voor de individuele planner**. Op het niveau van de scheduling-kern doet ProjectLibre wat het moet doen: het rekent een netwerk door, ondersteunt alle vier de relatietypen met lag, kent resourcekalenders en tot tien baselines, en toont een echt kritiek pad. Dat is meer dan het overgrote deel van de moderne werkbeheer-SaaS aankan. Wie ProjectLibre afdoet als "gratis speelgoed" heeft het mis over de engine.

**Nee** ten opzichte van **Primavera P6, Asta Powerproject of Deltek** — en niet marginaal, maar categorisch. Het schaalt niet naar programmaniveau, wisselt niet uit met de industriestandaarden, heeft geen 4D, geen LBMS, geen risicoanalyse (Monte Carlo), geen multi-project baselines en geen enterprise-governance.

Het werkelijke risico zit echter niet in de functionaliteit maar in de **onderhoudsstatus**. Een tool met één release in vijf jaar, een al veertien maanden gebroken macOS-build, geen HiDPI-ondersteuning, een leverancier die UI-problemen beantwoordt met een verwijzing naar zijn betaalde product, en een open-source-governance die feitelijk geen externe bijdragen toelaat — dat is geen fundament om vijf jaar projectplanning op te bouwen. De open-source-vlag suggereert een continuïteitsgarantie die de governance in de praktijk niet levert.

**Samengevat:** ProjectLibre is de beste gratis klassieke CPM-desktop die er is, en tegelijk een product dat zichtbaar aan het einde van zijn levenscyclus is terwijl de leverancier zijn energie naar een gesloten cloudproduct verplaatst. Als vergelijkingspunt en als bron van functionele eisen is het waardevol; als strategisch platform voor de komende jaren is het dat niet.

---

## Bronnen

Alle URL's geraadpleegd op **25 juli 2026**, tenzij anders vermeld.

**Leverancier (primair)**
1. ProjectLibre homepage — https://www.projectlibre.com/
2. ProjectLibre Desktop productpagina — https://projectlibre.com/projectlibre-desktop/
3. ProjectLibre Cloud AI productpagina — https://www.projectlibre.com/projectlibre-pm-artificial-intelligence-cloud/
4. ProjectLibre Cloud AI 2.0 productpagina — https://www.projectlibre.com/product/projectlibre-cloud
5. Blog: "ProjectLibre Cloud: Upgrade for Teams and Companies" (13 juli 2026) — https://www.projectlibre.com/projectlibre-cloud-upgrade-for-teams-and-companies/ — **bron van de prijs $9,99/gebruiker/maand, jaarlijks, minimaal 3 gebruikers**
6. Blog: "ProjectLibre Cloud AI 2.0 — The Enterprise Replacement for Microsoft Project Online" (18 mei 2026) — https://projectlibre.com/projectlibre-cloud-ai-2-0-the-enterprise-replacement-for-microsoft-project-online/
7. Blog: "ProjectLibre in 2025: Powering the World's Projects" (15 januari 2026) — https://projectlibre.com/projectlibre-in-2025-powering-the-worlds-projects-and-accelerating-into-2026/
8. Over ons — https://projectlibre.com/about-us/
9. Documentatie-overzicht — https://projectlibre.com/projectlibre-documentation/
10. **Officiële handleiding ProjectLibre_Doc_v1.9.8 (Engels)** — https://docs.google.com/document/d/1RC1s_1GVzLd_T2M3NJrJo3ATIBIheWE_c8nWHJffm3Y/ — **bron voor FS/SS/FF/SF, lag, kalenders, 10 baselines, total slack, .pod, MSPDI-export**
11. Blog-overzicht — https://www.projectlibre.com/blog
12. Sitemap — https://www.projectlibre.com/sitemap.xml (en /wp-sitemap-posts-page-1.xml, /wp-sitemap-posts-topic-1.xml)

**Officieel forum (klachten en bugs)**
13. Forumoverzicht — https://www.projectlibre.com/forums/ en https://projectlibre.com/forum/discussions/ — **55 desktoptopics / 178 reacties**
14. "ProjectLibre Desktop update 1.9.8" — https://projectlibre.com/topic/projectlibre-desktop-update-1-9-8/ — **4K/HiDPI-erkenning, macOS-crash**
15. "Can't open ProjectLibre on M1 Mac" — https://projectlibre.com/topic/cant-open-projectlibre-on-m1-mac/ — **harfbuzz-bug, mei 2025 t/m juni 2026 onopgelost**
16. "Massive importation capability" — https://projectlibre.com/topic/massive-importation-capability/ — **.mpp-import één bestand tegelijk in Cloud**

**Broncode en releases**
17. SourceForge projectpagina — https://sourceforge.net/projects/projectlibre/ — **1.9.8, 30-04-2025; 19.762 downloads/week; 7,8 mln totaal; CPAL 1.0; reviews uitgeschakeld**
18. SourceForge releasearchief — https://sourceforge.net/projects/projectlibre/files/ProjectLibre/ — **versiehistorie 1.5.9 (2014) t/m 1.9.8 (2025); geen 1.9.4–1.9.7**
19. SourceForge git-commitlog — https://sourceforge.net/p/projectlibre/code/ci/master/log/ — **gat 08-01-2021 → 30-04-2025**
20. SourceForge broncodetree — https://sourceforge.net/p/projectlibre/code/ci/master/tree/ — **zes modules**
21. GitHub-mirror claur/ProjectLibre — https://github.com/claur/ProjectLibre — **63 sterren, 44 forks, 134 commits**
22. GitHub-mirror smartqubit/projectlibre — 82 sterren, 38 forks (via GitHub-zoekopdracht)

**Referentie en historie**
23. Wikipedia — ProjectLibre — https://en.wikipedia.org/wiki/ProjectLibre — **CPAL, Java, 8,4 mln downloads, 1.700 universiteiten, $9,99/maand Cloud**
24. Wikipedia — OpenProj — https://en.wikipedia.org/wiki/OpenProj — **Projity, Silver Lake/Serena-overname, stopzetting nov 2008**
25. Wikipedia — Comparison of project management software — https://en.wikipedia.org/wiki/Comparison_of_project_management_software

**Interoperabiliteit**
26. MPXJ — ondersteunde formaten — https://www.mpxj.org/supported-formats/ — **MPP read-only; MSPDI/MPX/XER/PMXML read+write**
27. MPXJ — ProjectLibre .pod lezen — https://www.mpxj.org/howto-read-projectlibre/ — **.pod alleen lezen vanaf v1.5.5; schrijven niet ondersteund**

**Reviews en community**
28. Software Advice — ProjectLibre reviews — https://www.softwareadvice.com/project-management/projectlibre-profile/reviews/ — **4,4/5 uit 43 reviews; support 3,8; ease of use 4,0; value 4,6; functionality 4,2**
29. GetApp — ProjectLibre reviews — https://www.getapp.com/project-management-planning-software/a/projectlibre/reviews/ — **cons: verouderde interface, navigatie, visuele afwerking**
30. AlternativeTo — https://alternativeto.net/software/projectlibre/about/ — **kritiek: ontbrekende weergavefuncties, dode help-links, traagheid, taken niet herordenbaar**
31. Hacker News (Algolia API) — https://hn.algolia.com/api/v1/search?query=ProjectLibre — **"horribly, horribly broken" (2016); zeer lage HN-tractie**
32. Slashdot software-listing — https://slashdot.org/software/p/ProjectLibre/
33. SourceForge software-listing — https://sourceforge.net/software/product/ProjectLibre/ — **1 review; "no third-party integrations currently listed"**
34. Project-Management.com review — https://project-management.com/projectlibre-software-review/ — **MS Project 2003/2007/2010-compatibiliteit; CPAL; genoemde referentieklanten**
35. SoftwareSuggest — https://www.softwaresuggest.com/projectlibre — **profiel niet geclaimd, geen reviews**

**Toegevoegd tijdens de verificatieronde (25 juli 2026)**
36. Microsoft Learn — Project Online service description — https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/microsoft-project-online-service-description — **"Microsoft Project Online will be retired in September 2026"**
37. Microsoft Tech Community — "Microsoft Project Online is retiring: What you need to know" — https://techcommunity.microsoft.com/blog/plannerblog/microsoft-project-online-is-retiring-what-you-need-to-know/4450558 — aankondiging waarnaar Microsoft Learn verwijst
38. SourceForge — reviewpagina ProjectLibre — https://sourceforge.net/projects/projectlibre/reviews/ — **"This project does not allow reviews to be posted"**
39. GitHub Search API — repo's met "projectlibre" in de naam — **73 treffers, geen officiële repo van ProjectLibre Inc.; smartqubit 82★/38 forks (laatste push 2022-10-04), claur 63★/44 forks/134 commits (laatste push 2025-04-30)**
40. ProjectLibre-handleiding v1.9.8, mobiele weergave — https://docs.google.com/document/d/1RC1s_1GVzLd_T2M3NJrJo3ATIBIheWE_c8nWHJffm3Y/mobilebasic — **letterlijke citaten voor FS/FF/SF/SS, negatieve lag, 10 baselines, resourcekalenders, total slack, leveling, constraints**

**Niet toegankelijk tijdens dit onderzoek (geblokkeerd, 403/404)**
- G2 (https://www.g2.com/products/projectlibre/reviews) — HTTP 403
- Capterra (https://www.capterra.com/p/151114/ProjectLibre/) — HTTP 404
- TrustRadius (https://www.trustradius.com/products/projectlibre/reviews) — HTTP 403
- Reddit r/projectmanagement — geblokkeerd voor geautomatiseerde toegang
- Crunchbase (bedrijfs- en fundinggegevens) — HTTP 403
- The Digital Project Manager — HTTP 403
- TechRepublic — HTTP 403
- Gartner Peer Insights — geen substantieel ProjectLibre-profiel gevonden

---

## Verificatie

**Verificatiedatum:** 25 juli 2026. **Methode:** adversariële hercontrole — per bewering is actief geprobéérd haar te *weerleggen* met een onafhankelijke of primaire bron, niet haar te bevestigen. Ook deze ronde was WebSearch niet beschikbaar (sessiequota uitgeput); alle controles zijn gerichte WebFetch-opdrachten plus de GitHub-API. Dat betekent dat afwezigheid van tegenbewijs hier zwakker weegt dan gebruikelijk: er is niet breed gezocht naar *andere* bronnen die een claim zouden kunnen tegenspreken.

### Prijsstelling en licentiemodel

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 1 | Cloud kost **$9,99 per gebruiker per maand, jaarlijks gefactureerd** | **Bevestigd** — letterlijk: *"ProjectLibre Cloud is available for just $9.99 per user per month, billed annually, for teams of three or more users."* Onafhankelijk bevestigd door Wikipedia ("$9.99 per user per month") | https://www.projectlibre.com/projectlibre-cloud-upgrade-for-teams-and-companies/ · https://en.wikipedia.org/wiki/ProjectLibre |
| 2 | **Minimaal 3 seats** | **Gecorrigeerd (afgezwakt)** — de bron zegt *"for teams of three or more users"*. Dat is een doelgroepformulering, geen expliciet gepubliceerde harde ondergrens; nergens staat "minimum 3 seats required". Als *waarschijnlijk maar niet hard* markeren. Afgeleide bedragen ($119,88 p.p.p.j. en $359,64 minimale contractwaarde) zijn rekenkundig correct, maar de $359,64 erft deze onzekerheid | idem |
| 3 | **Geen maandelijkse betaaloptie**; alle communicatie noemt jaarlijkse facturering | **Gecorrigeerd — dit was fout.** De Cloud-AI-productpagina spreekt expliciet van *"a simple monthly subscription"* en een *"monthly fee"* (zonder bedrag), terwijl de blogpost *"billed annually"* zegt. De leverancierscommunicatie is intern tegenstrijdig; de facturatiecyclus is dus onbepaald in plaats van "alleen jaarlijks" | https://www.projectlibre.com/projectlibre-pm-artificial-intelligence-cloud/ |
| 4 | **Geen publieke prijspagina — `/pricing` geeft HTTP 404** | **Bevestigd** — opnieuw opgevraagd, server antwoordt HTTP 404 Not Found. Ook de Cloud AI 2.0-productpagina en de Cloud-AI-pagina noemen geen enkel bedrag | https://www.projectlibre.com/pricing (404) · https://www.projectlibre.com/product/projectlibre-cloud |
| 5 | Desktop **volledig gratis, CPAL 1.0, geen seat-/taaklimiet, geen functionele afknijping, PDF-export zonder restricties** | **Bevestigd** — productpagina: *"free, open source"*, *"Free and open source forever"*, *"without licensing fees"*, geen enkele vermelding van taak-, seat- of exportbeperking. Licentie CPAL 1.0 onafhankelijk bevestigd door SourceForge ("Common Public Attribution License 1.0 (CPAL)"), Wikipedia en de project-management.com-review | https://projectlibre.com/projectlibre-desktop/ · https://sourceforge.net/projects/projectlibre/ · https://en.wikipedia.org/wiki/ProjectLibre |
| 6 | **Handleidingen in 12 talen, gratis** | **Bevestigd** — 12 talen expliciet genoemd (Engels, Arabisch, Nederlands, Frans, Duits, Hindi, Italiaans, Japans, Koreaans, Pools, Portugees, Spaans), gratis beschikbaar | https://projectlibre.com/projectlibre-documentation/ |
| 7 | **Cloud AI 2.0 gratis upgrade voor bestaande abonnees (18-05-2026)** | **Bevestigd** — letterlijk: *"ProjectLibre Cloud AI 2.0 will be provided as a FREE upgrade for all current subscribers."* | https://projectlibre.com/projectlibre-cloud-ai-2-0-the-enterprise-replacement-for-microsoft-project-online/ |
| 8 | **Trial vereist zakelijk e-mailadres + handmatige provisioning, duur niet gepubliceerd** | **Bevestigd** — letterlijk: *"Trial Now: Requires company email"* en *"trials require company email address to get provisioned"*; nergens een trialduur | https://www.projectlibre.com/product/projectlibre-cloud |
| 9 | **Geen SLA, geen SOC 2 / ISO 27001, geen datalocatiegarantie gepubliceerd** | **Bevestigd** — op geen van de drie Cloud-pagina's staat een SLA of certificering; de enige securitytekst is de vage marketingzin *"industry-leading security measures and robust encryption protocols"*, met alleen een privacybeleid en algemene voorwaarden in de footer. *Kanttekening:* dit is een negatieve bewering die alleen via de publieke site is getoetst — documenten achter een salesmuur zijn niet uit te sluiten | https://www.projectlibre.com/projectlibre-pm-artificial-intelligence-cloud/ · https://www.projectlibre.com/product/projectlibre-cloud |

### CPM- en planningsfunctionaliteit

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 10 | **Alle vier afhankelijkheidstypen (FS/SS/FF/SF), FS als default** | **Bevestigd** in de officiële handleiding: *"FS (the default option), FF, SF, and SS. FS stands for Finish-to-Start … FF implies Finish-to-Finish, SF indicates Start-to-Finish, and SS means Start-to-Start."* | ProjectLibre-handleiding v1.9.8 (docs.google.com/document/d/1RC1s…/mobilebasic) |
| 11 | **Positieve én negatieve lag** | **Bevestigd**: *"addition of lag (if a positive number a delay before the next task starts or if negative the second task starts before the finish of the predecessor)"* | idem |
| 12 | **Kritiek pad berekend en rood weergegeven** | **Bevestigd**: *"The color code now shows the critical path in read [sic]; the logic of the dependencies shows that critical path."* | idem |
| 13 | **Total slack aan/uit als balkstijl; free slack niet gedocumenteerd** | **Bevestigd** — total slack expliciet als toggle onder Bar Styles (*"toggle the 'Total Slack' bar on…"*); free slack komt in de handleiding niet voor | idem |
| 14 | **Tot 10 benoemde baselines** | **Bevestigd**, letterlijk: *"it is possible to freeze and save 10 baseline schedules at different times with its name."* | idem |
| 15 | **Resourcekalenders per persoon/middel (24-uurs kraan)** | **Bevestigd**, letterlijk: *"It is possible to assign a separate base calendar to each Resource/Person. E.g. A crane may have a 24 hours calendar, while the crane-drivers each have an 8 or 12 hours calendar…"* | idem |
| 16 | **Resource leveling nauwelijks gedocumenteerd; constraints alleen als icoon; EVM geadverteerd maar niet in de handleiding** | **Bevestigd** — leveling beperkt zich tot *"choosing appropriate percentage may be a better way to start this kind of resource leveling"*; constraints tot *"If you apply a constraint on a task there will appear an icon in the cell"*; earned value komt in de handleiding niet voor, terwijl "Earned Value Costing" wél op de desktop- én Cloud-productpagina's staat. De marketing-documentatiekloof is dus reëel | ProjectLibre-handleiding · https://projectlibre.com/projectlibre-desktop/ · https://www.projectlibre.com/product/projectlibre-cloud |
| 17 | **MSPDI (MS Project XML) is de enige tweewegbrug; .mpp alleen lezen; .pod native** | **Bevestigd, met kanttekening.** De handleiding bevestigt XML-uitwisseling (*"compatible with any other project management software that can read and write xml-formatted documents. Obviously, that includes MS Project"*) en `.pod` als native formaat. Onafhankelijke bevestiging dat MPP schrijven niet bestaat komt van MPXJ (*"MPXJ supports read only access to MPP files"*). **Onzeker blijft** of ProjectLibre werkelijk géén CSV-export heeft — dit is in beide onderzoeksrondes alleen als "niet gedocumenteerd" vastgesteld, niet als "afwezig bewezen" | ProjectLibre-handleiding · https://www.mpxj.org/supported-formats/ |
| 18 | **MPXJ kan `.pod` alleen lezen (vanaf 1.5.5), niet schrijven** | **Bevestigd**, letterlijk: *"MPXJ can read POD files written by ProjectLibre version 1.5.5 and later versions."* Geen schrijfondersteuning gedocumenteerd — de `.pod`-eenrichtingsanalyse in sectie 6 houdt stand | https://www.mpxj.org/howto-read-projectlibre/ |
| 19 | **Cloud claimt "hundreds or thousands of tasks"** | **Gecorrigeerd — niet reproduceerbaar.** Geen van de Cloud-pagina's noemt enig taakaantal. Claim verwijderd/afgezwakt in sectie 2 | https://www.projectlibre.com/projectlibre-pm-artificial-intelligence-cloud/ · https://www.projectlibre.com/product/projectlibre-cloud |
| 20 | **Schaalplafond ~1.000–2.000 taken op de desktop** | **Onzeker — blijft SCHATTING.** Geen benchmark, geen gepubliceerde limiet, geen tegenbewijs gevonden. De markering "SCHATTING (gemiddeld vertrouwen)" is terecht en moet blijven staan | — |

### Onderhoudsstatus, gebruikersaantallen en marktpositie

| # | Bewering | Oordeel | Bron |
|---|---|---|---|
| 21 | **Gat 1.9.3 (08-01-2021) → 1.9.8 (april 2025); 1.9.4–1.9.7 nooit publiek uitgebracht; niets meer sinds april 2025** | **Bevestigd via drie onafhankelijke ingangen.** SourceForge-bestandenarchief toont 1.9.3 op 2021-01-08 en 1.9.8 op 2025-04-28, met niets ertussen. De commitlog springt van januari 2021 naar april 2025; nieuwste commit 30-04-2025 (*"New builds using jpackage supporting Java 21 and ARM architecture"*). De GitHub-mirror claur/ProjectLibre heeft als laatste push **2025-04-30** — vijftien maanden stilte, onafhankelijk bevestigd. *Datumnuance:* 1.9.8 wordt afwisselend op 28 en 30 april 2025 gedateerd (SourceForge-bestanden en Wikipedia: 28 april; SourceForge-projectpagina en commitlog: 30 april) | https://sourceforge.net/projects/projectlibre/files/ProjectLibre/ · https://sourceforge.net/p/projectlibre/code/ci/master/log/ · GitHub API |
| 22 | **Geen officiële GitHub-repo; mirrors halen 82 en 63 sterren; ~134 commits** | **Bevestigd via GitHub-API.** smartqubit/projectlibre: **82 sterren, 38 forks**, laatste push 2022-10-04. claur/ProjectLibre: **63 sterren, 44 forks, 134 commits**, laatste push 2025-04-30. Van de 73 GitHub-repo's met "projectlibre" in de naam is er géén van ProjectLibre Inc.; nummer 3 haalt 4 sterren. *Kleine nuance:* claur/ProjectLibre heeft 2 openstaande pull requests, dus enige externe bijdrage wordt wél geprobeerd — op een niet-officiële mirror | GitHub Search API + repo-metadata |
| 23 | **SourceForge-reviews uitgeschakeld** | **Bevestigd**, letterlijk: *"This project does not allow reviews to be posted."* | https://sourceforge.net/projects/projectlibre/reviews/ |
| 24 | **Forum: 55 desktoptopics / 178 reacties; 7 cloudtopics / 12 reacties** | **Bevestigd** — exact deze aantallen op de overzichtspagina | https://projectlibre.com/forum/discussions/ |
| 25 | **macOS Apple Silicon: `libharfbuzz`-fout, mei 2025 – juni 2026 onopgelost, workaround uit de community** | **Bevestigd** — foutmelding *"Library not loaded: /opt/homebrew/opt/harfbuzz/lib/libharfbuzz.0.dylib"*; draad loopt van **14-05-2025 t/m 28-06-2026** (≈13 maanden); officieel advies was aanvankelijk terugvallen op 1.9.3; de werkende oplossing (`brew install harfbuzz`) komt van forumgebruikers | https://projectlibre.com/topic/cant-open-projectlibre-on-m1-mac/ |
| 26 | **Reviewscores: 4,4/5 uit 43 reviews; support laagste deelscore 3,8** | **Bevestigd, exact** — ease of use 4,0; value for money 4,6; features 4,2; customer support 3,8. Cons consistent: *"outdated and less modern compared to alternatives"*, *"graphics and navigation sometimes lacking polish"*, *"certain features are harder to find"* | https://www.getapp.com/project-management-planning-software/a/projectlibre/reviews/ |
| 27 | **AlternativeTo-kritiek: taken niet herordenbaar, dode help-links, traagheid** | **Bevestigd, letterlijk** — *"you can NOT reorder tasks without copy/pasting which reset dependencies"*, *"The help links go to removed pages"*, *"very slow and with a bad ergonomy"*. Nieuw aangetroffen en nog scherper: gebruikers noemen het *"almost unusable"* boven ~10 taken door ontbrekende weergavefuncties | https://alternativeto.net/software/projectlibre/about/ |
| 28 | **Gebruikersaantallen: 7,8–8,4 mln downloads, 193–200+ landen, 31 talen, 1.700+ universiteiten; "10M active users" ongeloofwaardig** | **Bevestigd, inclusief de inconsistentie.** Wikipedia: *"more than 8.4 million times across over 200 countries"*, *"used in over 1,700 universities"*, *"31 languages"*. SourceForge: 7,8 mln totaal, 19.762 downloads/week (bestandenpagina toont 18.537 — teller fluctueert). Homepage toont tegelijk 8,2 mln downloads én "10M active users" én zowel "193 countries" als "200+ countries". De conclusie "behandel adoptiecijfers als marketing" is terecht. *"250.000+ community members" niet teruggevonden — onbevestigd* | https://en.wikipedia.org/wiki/ProjectLibre · https://sourceforge.net/projects/projectlibre/ · https://www.projectlibre.com/ |
| 29 | **Historie Projity → OpenProj → Serena → ProjectLibre** | **Bevestigd** — Marc O'Brien, Howard Katz en Laurent Chretienneau, OpenProj 1.0 uit bèta op **10 januari 2008**, *"In late 2008, Projity was acquired by Silver Lake Partners … via its subsidiary at that time, Serena Software"*, *"In November 2008, support and development of OpenProj appeared suspended"*, *"downloaded over 4,000,000 times in over 142 countries"* | https://en.wikipedia.org/wiki/OpenProj |
| 30 | **Marktvenster: end-of-life van Microsoft Project Online** | **Bevestigd én aangescherpt.** Dit was een onbevestigde leveranciers-premisse; Microsoft bevestigt het nu zelf met datum: *"Microsoft Project Online will be retired in September 2026."* Datum toegevoegd aan voordeel 10 en aan de trendanalyse | https://learn.microsoft.com/en-us/office365/servicedescriptions/project-online-service-description/microsoft-project-online-service-description |
| 31 | **Referentieklanten (Clinton Foundation, IBM, Cisco, Boeing, Caterpillar) zijn onverifieerbare leveranciersclaims uit ca. 2015** | **Bevestigd als terechte waarschuwing.** De lijst is teruggevonden in de project-management.com-review (Clinton Foundation, Giorgio Armani, McKesson, Abbot, IBM, Turner, ST Microelectronics, Flextronics, Kiewit, Accenture, EADS, Cisco, AMD, Caterpillar, Medtronic, Boeing, Husqvarna), maar zonder enige primaire onderbouwing of casestudy. De scepsis in sectie 1 blijft dus staan | https://project-management.com/projectlibre-software-review/ |
| 32 | **Omzetschatting: enkele duizenden betaalde seats, lage enkele miljoenen dollars** | **Onzeker — blijft nadrukkelijk SCHATTING (laag vertrouwen).** Geen omzet-, abonnee- of fundinggegevens publiek; Crunchbase blijft ontoegankelijk. Niet als cijfer citeren | — |

### Samenvatting van de correcties

Drie beweringen zijn feitelijk **gecorrigeerd**: (a) de claim dat alle communicatie jaarlijkse facturering noemt — de Cloud-AI-pagina spreekt van een *"simple monthly subscription"*/*"monthly fee"*, dus de leverancier is intern tegenstrijdig; (b) de Cloud-claim "hundreds or thousands of tasks" — niet reproduceerbaar op enige leverancierspagina; (c) de 3-seatgrens — afgezwakt van harde ondergrens naar doelgroepformulering. Eén bewering is **aangescherpt met een primaire bron**: de retirement van Microsoft Project Online is door Microsoft gedateerd op september 2026. Alle overige prijs-, licentie-, CPM- en onderhoudsclaims zijn **bevestigd**, meerdere via twee of drie onafhankelijke ingangen. De schattingen (schaalplafond, omzet, teamgrootte) blijven **onzeker** en zijn als zodanig gemarkeerd.

---

**Beperking van dit onderzoek.** De WebSearch-quota van de sessie was uitgeput voordat het onderzoek begon; alle bevindingen komen daarom uit gerichte WebFetch-opdrachten op bekende en via sitemaps ontdekte URL's. De grote reviewplatforms (G2, Capterra, TrustRadius) en Reddit blokkeerden geautomatiseerde toegang. Het gebruikerssentiment in dit profiel steunt daardoor zwaarder op Software Advice/GetApp (43 reviews), AlternativeTo, het officiële forum en Hacker News dan wenselijk zou zijn. De primaire bronnen — leverancierssite, officiële handleiding, broncoderepository, releasearchief en supportforum — zijn wél volledig geraadpleegd, en de belangrijkste harde conclusies (prijs, licentie, releasecadans, formaatondersteuning, macOS-bug, HiDPI-erkenning) rusten op die primaire bronnen.
