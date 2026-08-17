# To-do

Lijst met dingen die we nog willen doen, afgeleid van de roadmap in
[PLAN.md](../PLAN.md) (§6, "Functionaliteiten — Roadmap in 6 Fases").
Hieronder staan **alleen items die nog niet in de code zitten** — wat al af is
(zie Gantt/CPM-engine, IFC/CSV/MSP/P6 I/O, thema's, undo/redo, 14 talen) is
weggelaten. Per fase gegroepeerd zodat het terug te koppelen is naar PLAN.md.

Werkwijze: voeg nieuwe items toe in de juiste fase. Afgeronde items worden uit
deze lijst verwijderd — wat klaar is, staat in de changelog en git-historie.

## Openstaand

### Uit de critreview van release v2026.8.0 (2026-08-17)
- [ ] **Perf: met het bezettingsoverzicht open draait er een volledige CPM-solve per bewerking van
  het actieve document.** `getOpenDocumentPayloads()` levert óók het actieve document mee, met
  `scheduleStale = s.scheduleStale` — na elke bewerking `true`. De `useMemo` in
  `ResourceOccupancyView` invalideert dan op `activeTasks`/`activeAssignments` en
  `computeLibraryOccupancy` rekent het actieve document synchroon in de render efemeer door over de
  vólledige takenlijst. Op de schaal die `relationRules.ts` zelf noemt (3000 taken / 1500 relaties:
  700 ms–2,6 s) is dat merkbaar hakkelen tijdens typen. De §7-snit heeft de bibliotheek-*load*
  teruggebracht maar de solve niet meegerekend. Richting: het actieve document overslaan in de
  efemere tak (het heeft `useAutoCalcCPM` of F5), of de solve memoïseren per payload-referentie.
- [ ] **`platformRefusesWrites` is een sessie-brede latch zonder uitweg.**
  `src/services/fileAccess/webBackend.ts`: één `NotAllowedError`/`SecurityError` stuurt de rest van
  de sessie élke opslag naar de downloadmap, ook in een browser waar in-place schrijven prima werkt.
  Reset bestaat alleen als `resetWebWriteRefusalForTests()`. `SecurityError` is juist het
  "geen geldige gebruikersactivatie"-geval, dus een programmatische save kan de latch omzetten en
  daarmee de handmatige Ctrl+S daarna degraderen. Richting: alleen op `NotAllowedError` latchen en
  `SecurityError` als eenmalige fout behandelen. (Nog te bevestigen: of een web-buildpad
  `saveFileDialog` zonder gebruikersactivatie kan bereiken.)
- [ ] **De acht nieuwe voorbeeld-resourcesets staan buiten elke poort.** `verify:examples` eist
  overallocatie juist wél (regel ~196 in `verifyShowcase`, alleen voor showcases), dus niets bewaakt
  dat de acht nieuwe sets overallocatie-vrij blijven. Ze zijn nu gemeten schoon; de eerstvolgende
  topologie-wijziging kan ze stil overbezet maken. Overweeg een assertie.
- [ ] **`deleteTasksBulk` kan een dode undo-stap achterlaten.** Met ≥2 ids pusht `withTransaction`
  onvoorwaardelijk een snapshot; zijn álle ids al weg, dan blijft die stap staan. Het 1-id-pad
  ontwijkt dat bewust.
- [ ] **De thema-map in `index.html` is een handkopie van `THEME_MIGRATION`** in
  `settingsStore.ts`. Vandaag identiek (acht sleutels, zelfde defaults), maar niets bewaakt dat —
  precies de duplicatieklasse die dit project elders wél dichtzet.
- [ ] **`relationRules.ts` is de bron van de regel, niet de poort.** `pasteTasks` (`taskSlice.ts`
  ~978) en het tak-uit-sjabloon-pad (~1060) pushen `s.sequences` zonder `relationVerdict`, dus een
  tak kopiëren die een spookrelatie bevat maakt er weer een. Verdedigbaar als kopie-van-bestaande-
  data (net als import), maar de changelog van v2026.8.0 beweert "single source of truth" — zet
  óf de code óf die tekst recht.
- [ ] **`verify-docs.ts` poort 7e telt tools met een regex** (`/['"](planner_[a-z_]+)['"]/g`) over
  `src/services/mcp/tools/`, dus ook tool-namen in beschrijvingsproza. Vandaag klopt de telling
  (39), maar een beschrijving die een niet-bestaande tool noemt glipt erdoor.
- [ ] **Mijlpaal met start maar zonder finish is niet relatie-sleepbaar.** `getRelationSourceAt`
  eist beide datums, `drawMilestone` alleen een start — hij wordt dus getekend maar is geen
  sleepbron. Randgeval.

### Bedrijfsbibliotheken (B1.1) — vervolgen (2026-07-24)
- [ ] **B1b — bezettingsoverzicht** over open documenten (binnen één bedrijf/pool; bouwt op de
  herkomststempels + Resources-tab Bedrijfsweergave uit B1.1). Zie docs/library.md
  "Bekende beperkingen". In uitvoering — ontwerpdoc:
  docs/superpowers/specs/2026-08-14-b1b-bezettingsoverzicht-design.md (incl. §5a-histogram
  per poolitem, besluit eigenaar 2026-08-14).
- [ ] **B1b-vervolg: "alle resources"-histogram verkennen** (wens eigenaar 2026-08-14). De
  per-dag-data ligt er na B1b al (`dailyLoad` per booking). Drie kandidaatvormen, kiezen ná
  praktijkervaring met v1: (a) totaalsom over alle poolitems zoals "All resources" in het
  projecthistogram, met rood op dagen waarop minstens één item boven zijn capaciteit zit;
  (b) mini-histogram/sparkline per tabelrij, elk op eigen schaal met eigen capaciteitslijn;
  (c) heatmap resources × dagen met bezetting-t.o.v.-capaciteit als celkleur (de klassieke
  "resource usage"-weergave, schaalt het best bij grote pools).
- [ ] **B1c — nivelleren tegen restcapaciteit** (besluit eigenaar 2026-08-14): vanuit een
  conflictregel het veroorzakende document activeren en dáár nivelleren tegen
  bedrijfscapaciteit mín de boekingen van de andere open documenten. Eigen ontwerpdoc ná
  oplevering B1b; zie het B1b-ontwerpdoc §12 voor de open ontwerpvragen. Echt simultaan
  cross-document nivelleren blijft aan onderhoudbaarheidsitem 41 (`createAppStore()`) hangen.
- [ ] **Gedeelde opslag/sync** tussen machines (wortel van alle drie de B1.1-beperkingen: pool-
  divergentie tussen planners, bezettingsoverzicht dat alleen de eigen machine ziet, en
  stilzwijgend overschrijven tussen twee tabbladen/vensters op dezelfde machine).
- [ ] **Kalenderpromotie naar de Resources-tab** verhuizen — momenteel een bewuste fase-1-interim
  in Backstage → Bibliotheek (resourcepromotie/-CRUD is al verhuisd). Zie docs/library.md
  "Resources-tab: Bedrijfsweergave en Projectweergave".
- [ ] **Cross-document-plakken verliest resource-toewijzingen stil** (bestaand gedrag van vóór
  B1.1, herbevestigd in de B1.1-vlootverificatie). Toewijzingen wijzen naar resource-id's van het
  brondocument; plak je taken in een ánder document, dan blijven die id's onopgelost en verdwijnen
  de toewijzingen zonder melding. Minstens een melding is de korte-termijn-fix; via de
  herkomststempels (§spec) zou het ook automatisch kunnen herkoppelen aan dezelfde gedeelde
  bedrijfspool-resource, mits beide documenten aan hetzelfde bedrijf gebonden zijn.
- [ ] **Twee gelijknamige bedrijven zijn in selectors niet te onderscheiden.** De
  bedrijfsselectors (projectinfo, koppeldialoog) tonen alleen de bedrijfsnaam; bij twee bedrijven
  met dezelfde naam (bv. na hernoemen of dubbele import) valt met het blote oog niet te zien welke
  van de twee je selecteert. Kandidaat-fix: secundair kenmerk tonen (aanmaakdatum, id-fragment) bij
  naamcollisie.
- [ ] **Projectinfo-selector toont visueel "geen bedrijf" bij een binding aan een niet-meer-
  bestaand bedrijf.** `project.companyId` behoudt de dode id wanneer het gekoppelde bedrijf
  inmiddels verwijderd is; de selector valt dan terug op "geen bedrijf" i.p.v. de binding zichtbaar
  als kapot te markeren. Verder onschadelijk (los-gedrag, geen dataverlies) — presentatie-polish.
- [ ] **Herkenning-performance-schaalgrens bij grote pools (1000+ items).** `computeRecognition()`
  (LibraryLinkDialog) herberekent bij elke render zonder memoization; bij bedrijfspools met 1000+
  resources/kalenders kan dat merkbaar worden. Niet gemeten binnen B1.1-scope (pools in de
  vlootverificatie waren klein); kandidaat-fix: memoiseren op pool-/documentversie zoals elders in
  de store.
- [ ] **Undo na ontkoppelen laat een inconsistente tussenstaat achter.** `unbindProject`/
  `bindProjectToCompany` doen `beginUndoable()`, maar `project.companyId` valt (op `wbsAutoNumber`
  na) bewust buiten de undo-snapshot (B3-uitzondering in `src/state/snapshot.ts`). Een Ctrl+Z na
  ontkoppelen zet dus de `libraryOrigin`-stempels terug op een project dat ontkoppeld blíjft. Geen
  dataverlies (los-gedrag, stempels zijn inert en zelfherstellend bij terugkoppelen), maar wel
  verwarrend. Gevonden bij de critreview op de ProjectInfo-unificatie (2026-07-25).
- [ ] **Standaardbibliotheek zou een gegenereerd id moeten krijgen i.p.v. de vaste
  `DEFAULT_COMPANY_ID`-constante** (critreview F1/F8 op pool-import, issue #19). Vrijwel elke
  installatie heeft hooguit één resourcebibliotheek onder dat vaste id — waardoor `importPoolAsNewCompany`
  het (terecht) als `isReservedCompanyId` behandelt en er nooit de identiteit uit een geïmporteerd
  bestand voor behoudt. Praktisch gevolg: een meegestuurd project van een eenpitter-collega (de
  meest voorkomende situatie) herkent zijn bibliotheek na "toevoegen als nieuwe resourcebibliotheek"
  niet automatisch — de ontvanger moet de herkenningsstap zelf één keer doorlopen (zie
  docs/library.md "Bekende beperkingen" en de gebruikersgids). Zou het standaardbedrijf bij de
  EERSTE start een vers gegenereerd id krijgen (i.p.v. de gedeelde constante), dan werkt automatische
  herkenning ook voor eenpitters. Vergt een migratie voor bestaande installaties (opgeslagen
  bibliotheken én de `libraryOrigin`-stempels die al naar `DEFAULT_COMPANY_ID` wijzen) — daarom nu
  niet gedaan; `DEMO_COMPANY_ID` blijft sowieso bewust vast (idempotente seed, spec-eis).
- [x] **Niemand heeft gemeten of de MCP-tools de bibliotheekstempels bijwerken.** *(gemeten
  2026-07-27, geen defect)* Het stempelbeheer blijkt correct: `planner_manage_resources` en
  `planner_update_calendar` laten `libraryOrigin` met rust en werken `syncedHash` niet bij, op alle
  drie de routes (direct, via `planner_batch`, en bij aanmaken/verwijderen). Een MCP-wijziging op een
  gevolgd veld levert dus netjes `deviated` op, een wijziging op `maxUnits` blijft `in-sync` (die zit
  bewust niet in `RESOURCE_DIFF_FIELDS`), en een resource die de AI in een gekoppeld project aanmaakt
  wordt projecteigen zonder stempel. Vastgepind in `tests/mcp/cases-bibliotheek.ts` (9 tests,
  mutatie-getest tegen beide faalvormen). Bijvangst uit die meting: het blind meeschrijven van de
  hash zou érger zijn dan gedacht — `fileHash === syncedHash` leest als `behind`, en `behind` wordt
  door `runOpenBoundary` stil ververst naar de poolwaarden, waarmee de AI-bewerking geruisloos zou
  verdwijnen in plaats van alleen onbevraagd te blijven.
- [x] **De MCP-bridge mag schrijven waar de gebruiker niet mag — ontwerpbeslissing, geen defect.**
  *(besloten én gebouwd 2026-07-27: spiegelen)* Volgde uit de meting hierboven. `ResourcePanel`
  rendert naam, type, tarief/uur en eenheid als platte tekst zodra er een herkomststempel op zit
  (`isResourceFieldLocked`), en `description` heeft in de projectweergave niet eens een kolom —
  precies de vijf `RESOURCE_DIFF_FIELDS` die `planner_manage_resources` wél gewoon schreef. De
  mechaniek klopte, maar de gemeten uitkomst was een afwijkingsdialoog over een wijziging die de
  gebruiker niet met eigen handen had kúnnen maken; koos hij daar "bibliotheekwaarden gebruiken", dan
  draaide de AI-bewerking terug. De tool weigert die velden nu op een gestempeld item en noemt de
  twee routes die wél werken (in de bibliotheek wijzigen, of eerst losmaken); een gemengde update
  sneuvelt in zijn geheel, zodat er geen half toegepaste stille no-op ontstaat. Gating en UI-slot
  delen één bron (`onOpenStatusForResource` + `isResourceFieldLocked` + `RESOURCE_DIFF_FIELDS`), en
  `planner_list_resources` geeft per geërfde rij een `library`-blok (company/status/lockedFields)
  zodat een assistent het slot ziet in plaats van erin te lopen. De pool zelf is bewust NIET via MCP
  muteerbaar gemaakt: app-globale data, raakt projecten die niet openstaan, valt buiten de
  projecthistorie. Kalenders houden hun bestaande gedrag — daar kent de UI geen slot, dus is
  'deviated' juist de gespiegelde uitkomst.
- [ ] **"Losmaken van de bibliotheek" als MCP-actie.** Directe vervolgstap op het punt hierboven: de
  weigering verwijst naar losmaken als de begaanbare route, maar de bridge kan die route alleen
  bénoemen, niet lopen — de assistent moet de gebruiker vragen het handmatig te doen.
  `unlinkResourceFromLibrary` bestaat al als store-actie, is projectlokaal en ongedaan te maken.
  Overwegen: dezelfde actie voor kalenders, en of het een eigen tool wordt of een `action` op
  `planner_manage_resources`.
- [ ] **Crash-herstel reset de bibliotheek-UI-vlaggen niet.** `newDocument()`, `closeDocument()`,
  `newProject()` en `createNewProject()` zetten `ui.showLibraryLinkDialog`/`ui.libraryRefreshNotice`
  inmiddels alle vier terug (zie de asserts in `tests/library/check-library-slice.ts`), maar
  `restoreDocuments()` doet dat niet expliciet. Dat pad draait bij het opstarten van de app, vóór
  enige gebruikersinteractie, dus het risico dat er een vlag uit een vorige sessie overleeft is klein
  — maar het is niet gemeten en de dialoog rendert onvoorwaardelijk zodra de vlag waar is, dus een
  blijven-staande vlag toont een leeg koppel-/afwijkingsscherm. Vervolgstap: nagaan of de vlaggen het
  herstelpad überhaupt kunnen bereiken, en zo ja dezelfde twee regels toevoegen plus een assert.
- [x] **GROOT-showcase "Nieuwbouw Appartementencomplex De Vaart" overalloceert 10 van zijn 12
  resources, terwijl het ontwerpdocument expliciet maar 1 belooft.** *(gefixt 2026-07-27)*
  Oorzaak was inderdaad de generator: `scripts/showcase-groot.ts` dimensioneerde de pools op ÉÉN
  toren terwijl de drie torens per ontwerp parallel lopen (en de niet-uniforme curves het tempo
  bovendien op enkele dagen concentreren). Elke pool is nu op de gemeten worst case gezet —
  3 × de piek van één toren, per toren afzonderlijk gemeten met de echte `computeResourceLoad`:
  Betonvlechters 4→6, Timmerlieden 4→12, Gevelbouwer 2→6, Liftleverancier 1→3, Tegelzetters 3→15,
  Keukenmonteurs 2→9, Installateurs 4→18, Schilders 3→15. Torenkraan (1, met capaciteitsstap naar
  2) en Stukadoors (3) houden bewust hun krappe capaciteit: dat zijn de twee bedoelde knelpunten.
  Resultaat: 261 → 80 overgealloceerde resource-dagen, 10 → 2 pools; beide resterende knelpunten
  zijn met de echte nivelleerder volledig oplosbaar (80 → 0 dagen, 0 onopgeloste taken) — vóór de
  fix bleven er 4 pools zélfs ná nivellering staan. `maxUnits` raakt de CPM-datums niet
  (resources-design §3), empirisch bevestigd: alle 260 taken houden identieke ES/EF/LS/LF/TF/
  kritiek-vlaggen en `criticalPaths` blijft 2. De ontbrekende bovengrens is ook gedicht:
  `scripts/verify-examples.ts` assert nu naast `overalloc.length > 0` óók `<= 2` voor GROOT, met
  de namen in de foutboodschap; die assert is aantoonbaar rood gezien tegen de oude data.

### MCP-bridge — robuustheid van de server zelf (2026-07-27)

> Gemeten tijdens de eerste echte koppelpoging. Beide punten gaan niet over de tools maar over de
> schil eromheen: de bridge kan in een toestand raken waarin hij nog luistert maar niets meer
> beantwoordt, zonder dat iemand dat merkt. Dat is dezelfde faalklasse als de stille no-ops die deze
> ronde zijn opgeruimd — alleen een laag dieper.

- [x] **Snap: werkt de MCP-bridge onder confinement?** *(gemeten 2026-07-30 op de geïnstalleerde
  snap 2026.7.13 rev 1 — JA, volledig)* De vraag kwam op omdat `snap/snapcraft.yaml` alleen
  `network` plugde (client-only) terwijl de storebeschrijving de MCP-server aanprijst. Gemeten
  uitkomst: binden lukt tóch. Een TCP-listener op 127.0.0.1 slaagt binnen `snap run --shell`, en de
  geïnstalleerde app luisterde daadwerkelijk op 3877 met een werkende bridge. De hele keten is
  end-to-end gedraaid tegen die snap (dit was T24, dat nooit echt gelopen had): geen token ⇒ 401,
  fout token ⇒ 401, `Origin`-header ⇒ 403, `initialize` ⇒ serverInfo 2026.7.13, `tools/list` ⇒ 39
  tools met uitsluitend de `planner_`-prefix, en een echte `tools/call` op het geopende document met
  correcte envelope. Alle antwoorden kwamen direct — geen spoor van het 120s-timeout-beeld.
  Oorzaak dat het zonder `network-bind` werkt: `browser-support` staat in het seccomp-profiel
  bind/listen/accept toe "for anonymous sockets", en er zijn geen AppArmor-inet-regels die het
  alsnog mediëren. `network-bind` is alsnog toegevoegd — niet als reparatie, maar om die
  afhankelijkheid vast te leggen: nu hangt het luisteren aan een plug die er voor WebKit zit.
  Ook gemeten in dezelfde ronde: **"Backup-map openen" werkt onder confinement.** `openBackupFolder`
  (`src/services/mcp/backup.ts`) maakt de map aan en roept `open()` uit `plugin-shell` aan, wat op
  Linux op xdg-open uitkomt. Binnen `snap run --shell` gaf `xdg-open` op de ai-backups-map exitcode 0
  én startte er daadwerkelijk een bestandsbeheerder (nautilus). Kanttekening: getest is het
  MECHANISME (xdg-open door de portal), niet de knop zelf in de AI-tab. De geopende map bevatte
  bovendien echte backups — twee documentmappen, waarvan één het `activeDocumentId` uit de
  bridge-envelope — dus ook het backup-schrijfpad werkt onder confinement (appDataDir valt binnen
  `~/snap/open-planner-studio/`, dus zonder `home`-plug-afhankelijkheid).
- [ ] **De bridge merkt niet dat het venster erachter weg is.** Gemeten: het venster dat poort 3877
      bezat had een hot-reload gehad, waardoor de frontend-listeners uit `createBridgeController`
      verdwenen waren. De Rust-kant bleef luisteren; élke aanvraag liep vast tot de 120s-timeout.
      Ook een aanvraag **zonder token** — die hoort puur in Rust op een 401 te stranden en raakt de
      webview helemaal niet — bleef hangen, dus één blokkerend verzoek zet via de serialisatie-mutex
      ook al het verkeer erachter vast. Een client ziet dan geen fout maar twee minuten stilte.
      Richtingen: de auth-/Origin-/methode-afwijzingen vóór de mutex afhandelen (die hebben de
      webview niet nodig), een korte hartslag naar de frontend met een snelle "geen luisteraar"-fout
      i.p.v. de volledige timeout, en de frontend zijn listeners laten herstellen na een reload.
      Hot reload bestaat alleen in dev, maar een gecrashte of vastgelopen webview in een echte
      installatie geeft exact hetzelfde beeld.
- [ ] **Een tweede app-instantie is onzichtbaar voor de gebruiker.** De dubbele bewaker
      (`scripts/tauri-dev.mjs`) verhindert twee dev-servers, maar niet twee app-vensters — terwijl de
      bridge-poort een singleton is. Wie als tweede start krijgt "poort bezet", wat klopt maar niet
      vertelt dát er al een ander venster luistert (laat staan welk). Waargenomen na een crash van de
      ontwikkelomgeving: een verweesde instantie hield de poort vast terwijl de gebruiker in een
      nieuwer venster zat te kijken. Richting: bij "poort bezet" onderzoeken of het onze eigen app is
      en dat benoemen in de statusmelding.

### IFC-lezer — resterende punten uit de release-review v2026.7.13 (2026-07-27)

> Gevonden bij de hyperkritische review op de releasekandidaat, nadat die twee keer op de
> `DATA;`-sectiegrens was misgegaan. De blokkerende gevallen zijn gerepareerd en vastgepind in
> `tests/planning/check-step-strings.ts` (batterij 9); dit zijn de resten die de release niet
> tegenhielden.

- [ ] **Een rauwe apostrof in een taaknaam in de DATA-sectie verliest nog steeds stil data.** Een
      handgeschreven of door een derde tool geschreven `#2=IFCTASK('g2',$,'Van 't Hof',…)` levert
      nul taken op zonder fout: de sectiegrens wórdt gevonden, dus `no-data-section` vuurt niet, en
      de quote-bewuste entiteitsscan loopt daarna uit de pas. v2026.7.12 gaf hier 2 taken met een
      verminkte naam. Onze eigen writer produceert dit niet (taaknamen gaan altijd door `ifcStr`),
      dus eigen bestanden zijn veilig — maar een geïmporteerd bestand kan er zo uitzien. Richting:
      per entiteit detecteren dat de scan een niet-afgesloten string tegenkomt en dan óf de regel
      overslaan met een melding, óf de hele lezing als getypeerde fout afkeuren. Niet stil nul.
- [ ] **De leesfouten zijn hardgecodeerd Nederlands.** `not-step`, `truncated` en `no-data-section`
      gooien een Nederlandse `message` die via `notify({ detail })` letterlijk in de UI belandt —
      ook in een Engelse, Japanse of Arabische interface. Richting: de `reason` is al getypeerd, dus
      een `messageKey` per reason en de vertaling bij de aanroeper.

### IFC-kalenderbibliotheek — resterende punten (2026-07-27)

> Gevonden tijdens het overzetbaar maken van uurkalenders via de MCP-bridge. Alle drie zijn
> **beschreven** in de tool-descriptions en met tests vastgepind, dus niets gebeurt stil. De
> eerste bleek bij nadere inspectie al opgelost (zie hieronder); de resterende twee staan nog open.

- [x] **Een kalender zonder taak of resource verdwijnt bij opslaan+herladen.** *(achterhaald,
      opgelost door de A2-fix, geverifieerd 2026-07-27)* Dit was voorafbestaand gedrag (`ifcReader.
      extractCalendarLibrary` bouwde de bibliotheek uitsluitend uit `IFCRELASSIGNSTOCONTROL`-
      relaties), maar B1.1 heeft de beperking al opgeheven: de A2-fix in `extractCalendarLibrary`
      vangt nu ook alle overige `IFCWORKCALENDAR`-entiteiten op (behalve de projectkalender) die
      geen relatie hebben — nodig omdat een naar de bibliotheek gepromote kalender anders zijn
      `libraryOrigin`-stempel verloor. Empirisch bevestigd met een write→read round-trip van een
      project met een kalender zonder enige taak/resource-koppeling: de kalender komt terug met
      naam en uren intact.
- [ ] **Per weekdag verschillende uurbanden overleven een round-trip niet.** IFC draagt één
      werkweek-patroon, dus alle werkdagen krijgen bij herladen de banden van de eerste werkdag —
      een korte vrijdag komt terug als kopie van maandag. Zelfde route als hierboven zou dit ook
      oplossen.
- [ ] **Wélke kalender de projectdefault is, kan de bridge niet wisselen** (de inhoud ervan wel, via
      het id uit `projectDefaultId`). `update_project.calendarId` weigert nu met die uitleg. Beoordeel
      of dat een echte beperking moet blijven of gewoon nog gebouwd moet worden.

### Solver/presentatie — resterende punten (2026-07-20)

> De vier oorspronkelijke punten uit de 2.10-showcase-triage zijn afgerond op 2026-07-20; zie de
> changelog. Twee ervan bleken een andere oorzaak te hebben dan het item beschreef: de `TF=-4` was
> geen hard-pin-interactie maar een off-by-one plus feestdag-blinde dag-index in de
> showcase-generator, en het "plan vs. forecast"-punt was geen presentatiekwestie maar een echte
> bug in het eigenschappenpaneel. Onderstaande punten zijn er tijdens dat werk bij gevonden.

> **Onderzocht op 2026-07-20 (headless probes tegen de echte solver).** Het vermoeden bestond uit
> twee armen; er bleek er één echt te zijn.
>
> **VERWORPEN — de uur-pred/dag-succ-arm.** Daar ontbreken de grensvlaggen terecht: `predDoneAt` is
> in uurmodus letterlijk de identiteit (`CalendarEngine.ts:495-498`), dus beide takken van de
> forward-uitdrukking leveren dezelfde instant en er valt niets te spiegelen. Empirisch bevestigd:
> alle varianten met vlaggen geven niet-negatieve float. **Niet opnieuw onderzoeken.**

- [ ] **Anker versus berekend: `scheduleStart` als datamodel-vraag.** Het paneelveld is op
      2026-07-20 gelijkgetrokken met de vier andere oppervlakken (toont `earlyStart || scheduleStart`,
      schrijft bij wijziging naar het anker), maar de onderliggende modellering blijft verwarrend: in
      de tabel typ je een datum die naar `scheduleStart` gaat terwijl de cel daarna de berekende
      datum toont — je invoer *lijkt* genegeerd. Nette oplossing = het anker alleen bewaren bij taken
      zonder voorgangers, óf het als apart "Plan"-veld benoemen en overal consistent labelen
      ("Anker" vs "Berekend"). Raakt store, IFC-round-trip, `TableEditor`, `TaskDialog`, paneel,
      `check-ifc-roundtrip.ts` en i18n — eigen golf. Let op het regressierisico dat in
      `src/state/slices/scheduleSlice.ts:96-100` beschreven staat (taak blijft op zijn gedrifte
      datum hangen na het verwijderen van een relatie).

### Klein
- [ ] **Raster-terugval van de rapport-export heeft geen paginalimiet.** Gemeten 2026-07-27 tijdens
      issue #25: de PREVIEW is inmiddels afgedekt (`maxPages` in `paginateCanvasToTiles`, 30 vellen),
      maar `exportRaster()` in `ReportPanel.tsx` niet — en dat mag ook niet zomaar, want een export
      moet compleet zijn. Daar bestaan dus álle `rows * cols` pagina-canvassen tegelijk vóór de
      omzetting naar JPEG, op `SUPERSAMPLE = 2`. Een A3-vel is daarmee ~2382×1684×4 ≈ 16 MB; het
      gemeten scenario van 300 taken met `timelineColumns: 8` (20 rijen × 8 kolommen = 160 pagina's)
      komt op ~2,5 GB. Let op wanneer dit toeslaat: raster is de `catch`-terugval van de vector-tak,
      dus precies op het moment dat de vector-export net gefaald is. `MAX_TIMELINE_COLUMNS = 32`
      begrenst het wel, maar staat nog steeds honderden pagina's toe. Pre-existing gedrag, geen
      regressie van #25 — dat werk maakte het pad alleen makkelijker bereikbaar (één dropdown i.p.v.
      een handmatige zoominstelling). Fix-richting: pagina's streamend omzetten naar JPEG en het
      canvas per pagina vrijgeven i.p.v. ze allemaal vast te houden, of één pagina-canvas hergebruiken.
- [ ] **Taakdatumvelden pushen 3 undo-stappen per ingetypte datum.** `DateTextInput` commit live bij
      elke toetsaanslag en `parseFlexibleDate` accepteert een jaar al bij 2 cijfers, dus "01062030"
      levert commits op voor 2020-06-01, 0203-06-01 en 2030-06-01 — elk met een volledige snapshot.
      Gemeten en bevestigd op 2026-07-20; pre-existing, geen regressie. De infrastructuur om dit te
      verhelpen staat er inmiddels: `beginUndoable(s, { coalesceKey })` in `src/state/transaction.ts`
      (gebruikt door `setStatusDate`). Voor `updateTask` kan de key niet generiek zijn — die zou ook
      niet-datumbewerkingen en opeenvolgende Gantt-sleepacties samenvoegen — dus per veld kiezen.
      **Onderzocht 2026-07-20:** 13 gebruiksplekken geïnventariseerd, 10 problematisch en 3 lokaal
      (veilig). Correctie op de eerdere formulering: de start/finish-cellen in `TableEditor` zijn
      géén `DateTextInput` en committeren al één keer. **Advies uit dat onderzoek: los het bij de
      bron op** met een `commitMode`-prop (commit-op-blur) in plaats van per-actie coalesce-keys —
      de gedeelde `task-sections`-componenten voeden zowel het eigenschappenpaneel als de
      taakdialoog, dus een fix in het veld zelf dekt beide in één keer.
- [ ] **Recovery-robuustheid bij een corrupt herstelbestand.** Sinds 2026-07-20 rekent
      `restoreDocuments` het herstelde document door (`runCPM`), net als elk ander laadpad. Een
      corrupte of afgekapte recovery-snapshot na een crash laat het opstarten daardoor klappen in
      plaats van doormodderen. Overweeg een defensieve afhandeling rond die ene aanroep, met een
      zichtbare melding in plaats van een stille catch.
- [x] **`project.endDate` overleeft opslaan + herladen niet.** *(gefixt 2026-07-20)* `ifcWriter` schrijft
      `planEnd = max(scheduleFinish)` en gebruikt `project.endDate` alleen als fallback bij nul
      taken; de reader leest dat terug ín `project.endDate`. Elke ingevulde contractuele einddatum
      gaat dus verloren bij een round-trip — los van Move Project, dat het veld correct meeschuift.
      Het huidige gedrag is met toelichting vastgelegd in `check-move-project.ts` (check 151), zodat
      een fix die check rood maakt.
      **Aanpak (besloten 2026-07-20):** contractuele datums krijgen eigen persistentie in het
      `OPS_ProjectSettings`-pset (precedent: `wbsAutoNumber` en de statusdatum zitten daar al, met een
      gedocumenteerde reden in `ifcWriter.ts` ~regel 308). `IFCWORKPLAN.StartTime/FinishTime` blijven
      ongewijzigd de *afgeleide* plan-omvang dragen — dat is semantisch juist en andere IFC-tools
      lezen die slots. Lezer: pset wint, anders terugvallen op het WORKPLAN-slot, zodat bestaande
      bestanden zich exact als vandaag gedragen.
      **Twee valkuilen die de fix moet afdekken:**
      (1) Een lege `endDate` moet léég terugkomen. De golden rule van dat pset (alleen schrijven wat
      gezet is) zou bij `''` niets wegschrijven, waarna de lezer terugvalt op het WORKPLAN-slot en de
      afgeleide datum alsnog invult — dezelfde bug, verplaatst naar het lege geval. De lezer moet
      "veld aanwezig maar leeg" van "veld afwezig" kunnen onderscheiden.
      (2) **`check-ifc-roundtrip.ts` geeft hier valse zekerheid.** Regel ~377 vergelijkt
      `project.startDate`/`endDate` wél, maar de fixture heeft `endDate: '2026-07-24'` (regel ~257)
      terwijl de laatste taak op diezelfde datum eindigt (regel ~184) — afgeleid en contractueel
      vallen samen, dus het verlies is per constructie onzichtbaar en de check passeert zonder iets
      te bewijzen. De fixture moet contractuele datums krijgen die expliciet afwijken van de
      taak-span, anders bewijst ook de fix niets.
      **Uitgevoerd 2026-07-20** volgens bovenstaande aanpak. Beide valkuilen afgedekt: de lege
      einddatum wordt als NominalValue `$` geschreven ("aanwezig maar leeg") zodat de lezer hem van
      een afwezig veld kan onderscheiden, en de round-trip-fixture heeft nu contractuele datums los
      van de taak-span. De gap is uit KNOWN_GAPS naar de echte vergelijking verhuisd en check 151
      legt het juiste gedrag vast. Rood/groen bewezen; live in de devbuild bevestigd.
      Restpunt: `public/examples/*.ifc` zijn niet geregenereerd en bevatten de nieuwe
      pset-properties dus nog niet — onschadelijk (ze lezen via de WORKPLAN-terugval), maar bij een
      volgende `gen:examples`-run komen ze er vanzelf bij.
- [ ] **Mijlpaal horizontaal verslepen om de datum te wijzigen.** Nu geblokkeerd door dezelfde
      `getTaskBarBounds`-null die het relatie-tekenen blokkeerde (opgelost in spec 2026-08-14). Raakt
      `barDrag`: bij een 0-duurtaak mag alleen een body-sleep armen, nooit een resize-greep, en
      snapping/undo/uur-modus moeten kloppen.
- [ ] **`useDependencyDraw.ts` toetst de drop-x tegen `ui.leftPanelWidth`, terwijl de overige
      canvas-hittests `taskTableWidth` gebruiken.** Uitzoeken of dat een bug is.
### Klein — bulk-mutaties: tweede kwadratische factor (2026-07-29)
- [ ] **`applyWbsNumbering` + `recomputeViewRows` draaien per mutatie.** `withTransaction`
      (K-item 32) haalde de snapshot-kant eruit: bij 600 `addTask`-aanroepen ging het van
      4528 ms naar 1533 ms en van 100 naar 1 undo-stap. Maar de schaling bleef ~3,5× bij een
      verdubbeling van n, dus er is een tweede kwadratische factor: beide functies zijn O(n) en
      worden n keer aangeroepen. `flattenOrder` is al gede-kwadrateerd, dus dát is het niet.
      *Aanpak:* binnen een lopende batch de hernummering en de viewRows-herberekening uitstellen
      tot het einde van de transactie. Let op: dan ziet code BÍNNEN de batch verouderde
      `wbsCode`/`viewRows` — dat is een gedragswijziging, geen pure optimalisatie, en hoort
      daarom niet stilzwijgend in K-item 32. Hangt samen met item 36 (prestaties).

### Klein — zes Gantt-schakelaars slaan aan terwijl de Gantt niet in beeld is (2026-07-29)
- [ ] **Beeld-tab: histogram, baseline-overlay, voortgangslijn, statusdatumlijn, mini-map en
      split view zijn actief te schakelen terwijl `GanttCanvas` helemaal niet gemount is.** Gemeten
      met het volledige resource-paneel open: `showHistogram` gaat op `true`, de knop kleurt oranje,
      `ganttVisible: false` en er verandert niets zichtbaars. Alle zes wonen ín `GanttCanvas` (het
      histogram rond `:1521`), niet in de rechter-rail — anders dan Vastzetten/Eigenschappen, die
      via de `setUI`-invarianten in `uiSlice` (`:171-199`) inmiddels wél de rail uitklappen.
      *Dit is één ontwerpprobleem, geen zes bugs.* Losstaand één ervan repareren is een plakker;
      de generieke regel "toon de Gantt bij het aanzetten van een Gantt-optie" doortrekken is
      juist schadelijk — dan gooit het aanvinken van de voortgangslijn je resource-tabel dicht.
      *Aanpak (keuze nodig):* de zes uitschakelen met een tooltip zolang de Gantt niet zichtbaar is,
      óf de volledige-paneelmodus zo vormgeven dat hij de Gantt niet verdringt. Kwam boven bij het
      herstelwerk rond issue #46.

### Klein — de indirecte route naar een spookrelatie is volledig stil (2026-08-14)
- [ ] **Structuurmutaties kunnen een bladtaak-met-relaties tot verzameltaak maken zonder enig
      signaal.** De mijlpaal-relaties-tak (`docs/superpowers/specs/2026-08-14-mijlpaal-relaties-
      design.md`, §5a) blokkeert alleen het *directe* pad — een relatie rechtstreeks naar een
      verzameltaak leggen — met een leesbare weigering. Het *indirecte* pad via `indentTasks`,
      `moveTaskTo`, `addTask({ parentId })` en `insertWbsTemplate` is stil: een project met A→B
      waar de gebruiker C onder B inspringt, maakt A→B met terugwerkende kracht tot spookrelatie.
      De Gantt tekent de pijl identiek, er komt geen melding, en F5 verschuift de planning zonder
      uitleg. De enige aanwijzing is het waarschuwingsdriehoekje in het Relaties-paneel (niet
      standaard open, visueel niet te onderscheiden van de bestaande lead-waarschuwingen daar).
      MCP meldt hier ook niets: `planner_add_tasks` met een `parentId` maakt de spookrelaties
      zonder een woord, en de leestools melden per relatie nergens "zonder effect".
      *Kandidaat-aanpak:* dezelfde samenvattende melding als na het laden (`notifications.
      summaryRelationsIgnored`) afvuren wanneer een structuurmutatie relaties zonder effect maakt,
      óf de spookpijl in de Gantt gestippeld/gedimd tekenen zodra `hasSummaryEndpoint` waar is.
      Gevonden bij de eindreview op die tak.

### Distributie & Release

#### Sleutelbeheer — vier velden die alleen de eigenaar kan invullen (2026-07-28)
`docs/release-secrets.md` inventariseert de negen secrets van de uitleverketen, maar vier
velden staan er nog als `⟨IN TE VULLEN⟩` in. Ze zijn per definitie niet uit de repo af te
leiden. Zolang ze leeg zijn is dat document een inventarisatie en géén herstelplan.

- [ ] **Bewaarplek van de minisign-privésleutel en zijn wachtwoord vastleggen.** Dit is de
      enige onherstelbare sleutel in de hele keten: zijn publieke helft
      (`28AC8F08A87C90CD`) staat hardgecodeerd in `tauri.conf.json` en zit dus in élke
      uitgeleverde binary, en Tauri's updater kent één `pubkey`-veld — geen lijst, dus geen
      reservesleutel meeleveren. Kwijt = elke bestaande installatie permanent afgesneden
      van auto-updates, zonder weg terug. De GitHub-secret telt **niet** als back-up: die
      is write-only. Minimum: sleutel én wachtwoord (op gescheiden plekken) in een gedeelde
      password manager, plus één offline kopie.
- [ ] **Een tweede persoon toegang geven.** Nu is de bus factor 1 op precies die sleutel.
- [ ] **Vervaldatum van `AZURE_CLIENT_SECRET` (en het certificaatprofiel) vastleggen**, met
      een agenda-herinnering een maand van tevoren die niet aan één persoon hangt. Verloopt
      uit zichzelf en breekt dan midden in een release — ná de onomkeerbare tag-push.
- [ ] **Vervaldatum van `SNAPCRAFT_STORE_CREDENTIALS` vastleggen**, idem. Verlopen
      credentials laten de publish-stap falen terwijl de rest van de release slaagt.

Het migratiepad voor de sleutel staat al uitgeschreven in `docs/release-secrets.md` §2 —
met de dwingende volgorde, en het werkt alléén zolang de oude sleutel er nog is.

#### Snap-packaging — follow-ups
Snap-packaging is werkend en zit op `main` (zie changelog +
[ontwerp](superpowers/specs/2026-06-26-snap-packaging-design.md)): `snap/snapcraft.yaml`
(core22, strict, gnome-extensie) herverpakt de release-deb, en `snap.yml` bouwt op
tag-push de `.snap` als release-asset. Geverifieerd via een `workflow_dispatch`-run tegen
`v2026.6.0` (groene build, geldig `.snap`, WebKitGTK uit de gnome-runtime). Wat rest:

### Distributie & Release — release notes in de in-app updater

### Kwaliteit & verificatie

- [ ] **Geen enkele poort raakt het Tauri-asset-protocol — een hele klasse desktopbugs is
  structureel onzichtbaar.** Aangetoond 2026-07-28: in de uitgeleverde `.deb` v2026.7.13 toonde
  Backstage → Help bij élk artikel "Artikel niet gevonden", terwijl alle 354 artikelen gewoon in de
  binary zaten (gefixt in `e257770`). Oorzaak: `tauri-utils` kent de extensie `md` niet en valt terug
  op `MimeType::Html`, dus de webview labelt elk artikel als `text/html` — en onze eigen
  SPA-fallback-guard verwierp precies dat.
  **Waarom niets het ving:** dev, de webdeploy én `npm run tauri:dev` gaan allemaal via Vite, dat
  `.md` wél correct serveert. Alleen een gebundelde build met embedded assets vertoont het. CI bouwt
  die wel (`tauri build --no-bundle`) maar start hem nooit. `verify:docs` bewijst dat de bestanden
  kloppen, niets bewijst dat de app ze kán laden.
  **Nog steeds latent** (uit de audit bij die fix): `.ifc`-voorbeelden (`Backstage.tsx`,
  `HelpPanel.tsx`) krijgen op de desktop óók `text/html` en overleven alleen doordat dat pad geen
  header-check heeft — zet iemand daar ooit een guard neer, dan breken de voorbeelden op dezelfde
  manier. Idem `pdf/hbSubset.ts`: `arrayBuffer()` is veilig, maar een overstap naar
  `WebAssembly.instantiateStreaming` zou op de desktop stukgaan op het content-type.
  **Kandidaat-poort:** de gebundelde binary in CI daadwerkelijk starten en één asset per uitgeleverd
  bestandstype (`.md`, `.ifc`, `.wasm`, fonts) laten laden — of, veel goedkoper, een headless check
  die de extensies die wij uitleveren aftoetst tegen de MIME-tabel van de gebruikte `tauri-utils` en
  waarschuwt zodra er één op de HTML-fallback landt. Dat laatste is geen echte end-to-end-poort,
  maar had deze bug wél gevangen.

- [ ] **ResourceLeveler-schaalbaarheid (gemeten 2026-07-06, benchmark tegen de echte engine).**
  De leveler groeit ~kwadratisch met het taakaantal (dag-modus: 100 taken=0,15s, 500=6,2s,
  2000≈100s geëxtrapoleerd; uur-modus is consequent ~4× sneller: 500=1,5s, 2000=25,3s gemeten).
  Oorzaak: `computePF` draait `solve()` per pick in een lus. Geen 2.8b-regressie (dag-gedrag was
  altijd zo) en de CPM-solve zelf is prima (2000 taken = 37-81 ms, ruim onder de 2s-lat), maar
  voor projecten >500 taken met nivellering is dit merkbaar. Kandidaat-verbeteringen:
  incrementele her-solve of PF-caching per iteratie. De banden-memoization uit 2.8b §5.6 is
  gemeten en werkt (0 nieuwe cache-fills bij een tweede solve op dezelfde kalenders).
  Benchmark-scripts: `/tmp/ops-perf/` (bench.ts + run.sh, herbruikbaar).

- [ ] **D2 — opslaan naar een Web Worker verhuizen (prestatie-audit, geparkeerd 2026-07-23).**
  Uit de prestatie-audit ([`superpowers/prestatie-modulariteit-audit.md`](superpowers/prestatie-modulariteit-audit.md)):
  de IFC-serialisatie bij auto-save draait op de hoofd-thread en kan bij grote projecten een
  korte hik geven. De pijn is al fors verzacht door de throttle (eens/10 s) en de dirty-cache
  (alleen gewijzigde documenten her-serialiseren, `src/hooks/useAutoSave.ts`), dus dit is een
  *nice-to-have*, geen blokker. *Aanpak:* `ifcWriter` in een Web Worker draaien zodat het
  serialiseren de UI nooit blokkeert. **Let op:** dit zou de eerste Web Worker in de app zijn —
  nieuwe infrastructuur (berichtenverkeer, foutafhandeling), dus met een frisse aanloop bouwen,
  niet er even tussendoor. Verificatie-eis: de worker moet **byte-identieke** IFC produceren
  t.o.v. de huidige synchrone `writeIFC` (git-archive-vergelijking, zoals bij A1/A2).
- [ ] **C3 — canvas-heralloc / renderer-hergebruik (prestatie-audit, geparkeerd 2026-07-23).**
  Marginale winst nadat de pijl-culling (C1) al binnen is; in de browser-preview bovendien
  lastig hard te bewijzen (het canvas composit niet in een verborgen tab). Alleen oppakken als
  een concrete meting laat zien dat het nog ergens knelt. Zie de audit voor de context.

- [ ] **Driedubbele eindverificatie van fase 2 (uitgesteld op 2026-07-04).** Na afronding van
  fase 2.5 was een uiterst grondige verificatie gepland maar die is doorgeschoven; uitvoeren
  zodra fase 2 verder gevorderd is (bv. na 2.7 of als afsluiter samen met §2.10). De volledige
  werkwijze ligt klaar als workflow-script:
  [`docs/superpowers/workflows/triple-verify.js`](superpowers/workflows/triple-verify.js)
  (vóór gebruik `ROOT`/`TMP` en de prompts actualiseren — zie de kopcommentaar).

  **Werkwijze in het kort — per onderdeel 1 Opus + 2 Sonnet die exact hetzelfde doen, plus een
  Opus-rechter:**
  1. *Onderdelen.* De app wordt opgeknipt in 8 gebieden die samen alles dekken: CPM-kern &
     kalenders, resource-belasting & curves, nivellering & smoothing, state-management &
     documenten, IFC-round-trip, P6/MSPDI/CSV-adapters, UI in de browser, en voorbeelden &
     generator. Bij uitvoering ná 2.6/2.7 uitbreiden met die featuresets (baselines/voortgang
     resp. weergaven) — de prompts in het script per gebied bijwerken.
  2. *Drie onafhankelijke controleurs per onderdeel* (1× Opus, 2× Sonnet) krijgen een
     **identieke**, zeer gedetailleerde audit-opdracht: alles checken wat met dat onderdeel te
     maken heeft. Harde regels: strikt read-only in de repo, eigen tmp-map per agent,
     verwachtingen éérst met de hand uitrekenen en dan pas headless probes draaien tegen de
     echte store/solver (esbuild-patroon van `tests/planning/run.sh`), suite + `tsc` draaien;
     het UI-onderdeel gebruikt een al draaiende dev-server + eigen playwright-core-instantie
     met screenshots als bewijs. "Alles OK" mag alleen na aantoonbaar uitgevoerde checks.
  3. *Gestructureerde rapporten.* Elke controleur levert via een afgedwongen schema: verdict
     (OK/ISSUES_FOUND), de volledige lijst daadwerkelijk uitgevoerde checks, en bevindingen
     met ernst (BLOKKEREND/HOOG/MIDDEL/LAAG), faalscenario + bestand:regel en bewijs.
  4. *Per onderdeel een Opus-rechter* die de drie rapporten adversarieel weegt: elke bevinding
     zélf verifiëren in de code of met een eigen probe vóór bevestiging (een bevinding die maar
     één van de drie zag is verdacht maar kan juist de echte zijn), tegenspraken zelf
     beslechten, OK-verdicts toetsen op dekking van de opdracht en de belangrijkste ontbrekende
     check zelf alsnog doen, en bevindingen zonder reproduceerbaar bewijs verwerpen. Output:
     bevestigd/verworpen/dekkingsgaten + één eindoordeel-zin per onderdeel.
  5. *Afronding.* Bevestigde bevindingen gewogen per ernst rapporteren; fixes zijn een aparte
     vervolgronde (zelfde fix-golf-aanpak als na de fase-2.5-reviews).

### Fase 2 — Professionele Planning (v0.5)

> §2.1 Volledige dependencies is afgerond (lag-eenheid, procent-lag, leads, driving-markering,
> relatietabel, path tracing) — zie changelog en
> [ontwerp](superpowers/specs/2026-07-02-volledige-dependencies-design.md).

> §2.2 WBS & structuur is afgerond (auto-nummering, activity codes, custom fields,
> groeperingsweergave, WBS-templates; kopieer/plak bestond al) — zie changelog en
> [ontwerp](superpowers/specs/2026-07-02-wbs-structuur-design.md). Bewust v2: WBS-maskers/
> prefixen, hiërarchische codewaarden, indicator-velden/formules, adapter-export van
> codes/velden (CSV/MSPDI/P6), N×N-matrix.

> §2.3 Constraints & deadlines is afgerond (alle 8 datum-constraints in CPM met
> P6-soft-semantiek, deadline per taak, negatieve float, Gantt-indicatoren +
> statusbar-waarschuwingen) — zie changelog en
> [ontwerp](superpowers/specs/2026-07-02-constraints-deadlines-design.md).
> Bewust 2.9: logica-brekende Mandatory-pins, secundaire constraints,
> scheduling-options (float-berekeningswijze, honor-toggle, retained logic).

> §2.4 Mijlpalen is afgerond (start-/eindmijlpalen via het dag-granulaire
> grens-model naar P6-voorbeeld, verplichte/contractuele mijlpalen met
> inspectiemoment-knop, mijlpalen-overzicht als tweede rapporttype) — zie
> changelog en [ontwerp](superpowers/specs/2026-07-02-mijlpalen-design.md).
> Bewust later: MTA/baseline-variance (vereist 2.6-snapshots),
> checklijsten bij inspectiemomenten (fase 3.2).

> §2.5 Resources is afgerond (vijf resourcetypes incl. ploeg, tijd-gefaseerde
> capaciteit, toewijzingen met units/dag + zes verdeelcurves, belasting- en
> overallocatie-engine in runCPM, resource-nivellering én smoothing via serieel
> SGS met float-constraint, Resources-ribbontab + beheerpaneel + histogramstrook
> + nivelleer-dialoog, IFC/P6/MSPDI-round-trip, taak-prioriteit) — zie changelog
> en [ontwerp](superpowers/specs/2026-07-03-resources-design.md). Bewust later:
> resource-kalenders zijn nu informatief (registry), nog niet hard afgedwongen in
> de scheduling; kostenkoppeling van resources hoort bij fase 3.5.

> §2.6 Baselines & voortgang is afgerond (statusdatum-gestuurde CPM met
> actual-pinning en data-date-vloer, voortgangsregistratie met afgedwongen
> invarianten, Retained Logic/Progress Override, out-of-sequence-detectie,
> onbeperkte benoemde baselines met precies één actieve, baseline-overlay +
> statusdatumlijn + voortgangslijn in de Gantt, variance-rapport als derde
> rapporttype, IFC/MSPDI/P6/CSV-round-trip) — zie changelog en
> [ontwerp](superpowers/specs/2026-07-04-baselines-voortgang-design.md). Bewust
> later: meerdere voortgangslijnen/statuslijnen, MSPDI-baselineslots 1-10,
> P6-baseline-round-trip, per-relatie out-of-sequence-override; physical-%/
> work-% als aparte dimensie hoort bij fase 3.5.

> §2.7 Weergaven is afgerond (werkende tijdschaal-keuze jaar t/m dag met afgeleid label
> + recenter, kolom-configuratie incl. resource-kolom, geneste AND/OR-filters met
> veldtype-bewuste editor, groeperen tot 2 niveaus + multi-key-sorteren, één gedeelde
> zichtbare-rijenlijst voor tabel én Gantt, structuur-vergrendeling buiten boommodus,
> custom layouts, presentation mode (F11), split view binnen één document, mini-map,
> auto-bereken-instelling op de 3 surfaces) — zie changelog en
> [ontwerp](superpowers/specs/2026-07-04-weergaven-design.md). Bewust later:
> rollup-totalen per groepsband (fase 3.5/3.9), split view met twee verschillende
> documenten (vergt store-singleton-refactor), per-bestand-layouts (IFC-pset), en
> inline bewerken van de resource-kolom (blijft read-only; toewijzen via het
> eigenschappenpaneel).

#### 2.8 Kalender-uitbreidingen

> §2.8a is afgerond (jaar-onafhankelijke feestdagen-engine met 7 landensets incl. Duitse
> Bundesländer, Pasen-algoritme, substitutieregels en de lustrum-regel voor Bevrijdingsdag;
> bouwvak nu opt-in via de wizardkeuze met default geen; de resource-kalenderregistry
> gepromoveerd tot een gedeelde kalender-bibliotheek voor project, taken én resources;
> taak-specifieke kalenders in de CPM met de voorganger-kalender-lagregel; wizard
> land/regio/bouwvak/winterstop + preview; kalenderdialoog als bibliotheekbeheer met
> feestdagen-genereren; Gantt-naamlabel op meerdaagse feestdagblokken; IFC-reader-gat gedicht
> (werkweek/uren round-trippen nu); multi-kalender + taak-kalender round-trip in IFC/MSPDI/P6)
> — zie changelog en
> [ontwerp](superpowers/specs/2026-07-04-kalenders-design.md). Bewust later: uren-/
> minuten-scheduling en dag/nacht-ploegenkalenders zijn 2.8b (hieronder); per-rij
> Gantt-arcering op afwijkende taak-kalenders volgt later; een instelbare
> lag-kalender-scheduling-option (P6's "Calendar for scheduling Relationship Lag") is fase 2.9;
> weer-/vorstafhankelijk winterverlet is fase 4 (2.8a kent alleen een vaste winterstop-periode);
> de bouwvak-tabeldatums zijn adviesdata (Bouwend Nederland).

> **Fase-splitsing (besluit user 2026-07-04):** 2.8 wordt in twee delen uitgevoerd.
> **2.8a** = feestdagen/bouwvak/kalender-bibliotheek/taak-kalenders (afgerond, hierboven);
> **2.8b** = uren-/minuten-based scheduling + de uur-tijdschaal, als apart ontworpen
> vervolgfase (raakt solver, alle adapters, renderer én IFC — te groot om mee te liften).

> §2.8b: hoofdschakelaar Urenplanning (instelling, default uit) + gemengde dag/uur-planning
> toestaan; werktijd-banden per weekdag (meerdere banden, nachtploeg over middernacht) met
> dag/2-ploegen/3-ploegen/nacht/24-7-presets en een banden-editor (opslaan als preset,
> per-weekdag instellen, kopiëren naar alle werkdagen); uur-tijdschaal in de Gantt (bestaande
> `timelineTiers` geactiveerd); drie duurweergave-modi (automatisch/altijd dagen/altijd uren)
> met mixed-kalender-waarschuwing; taakbalk-opsplitsing bij onderbrekingen (nooit/bij
> selectie/altijd); minuut-precieze round-trip in P6-XML, MSPDI en IFC; datumvelden herbouwd
> als getypte dag/maand/jaar-segmenten met een datumnotatie-instelling; diverse
> kalenderdialoog-fixes. Volledig vertaald in alle 14 talen — zie changelog en
> [ontwerp](superpowers/specs/2026-07-06-uren-scheduling-design.md). Bewust later: instelbare
> lag-kalender-optie (P6's "Calendar for scheduling Relationship Lag") is fase 2.9; sub-dag
> resource-nivellering (per-uur/per-shift capaciteits-emmers) blijft dag-emmer-gebaseerd;
> tijdzone/DST-bewuste scheduling; per-rij Gantt-arcering op afwijkende taak-kalenders.
> **Status: gemerged op main (golven 0-6, sinds 2026-07-06); visuele QA en fix-golf lopen nog.
> CHANGELOG-note staat onder `Ongepubliceerd` in afwachting van het versionslag.**

#### 2.9 Geavanceerde CPM

> §2.9: de CPM-kern is "compleet" gemaakt t.o.v. P6/MSP, bovenop de 2.8b-uren-erfenis en in dag- én
> uur-modus. Constraints compleet (logica-brekende **Mandatory Start/Finish**-pins die ES/LF resp.
> EF/LS onvoorwaardelijk pinnen en negatieve float upstream drijven, **secundaire** P6-constraint met
> validatie van de verboden combinaties, en constraints uur-modus-correct tot de minuut);
> **hammock-taken** (afgeleide span tussen start-/finish-driver, her-spannend bij verschuivende
> dragers, backward-druk loopt niet door de hammock, altijd uitgesloten van het kritieke pad);
> **externe (cross-project) dependencies** via bevroren P6-*External-Dates*-ankers (FS/SS/FF/SF, beide
> richtingen, ghost-weergave + per-link/projectbreed verversen, ontbrekende-bron-gedrag zonder
> live multi-document-solve); **near-critical-analyse** met instelbare drempel (default uit; aangezet
> default 2 werkdagen, fractioneel in uur-modus); **meerdere kritieke paden / float paths**
> (driving-logic-peel FREE_FLOAT + TF-rangschikking, `floatPath`-nummer per taak, `criticalPaths`);
> **interfering float** (tf−ff, getekend/fractioneel); en een project-scoped **Berekening**-blok
> (lag-kalender-keuze, kritiek-definitie TF≤x / longest-path, TF-berekeningswijze, open-ended-kritiek,
> near-critical-drempel, float-paths). Interop: taak-constraints round-trippen nu óók in P6-XML en
> MSPDI (voorheen leeg), met hard/secundair-uitbreiding en custom psets
> (`OPS_Hammock`/`OPS_ExternalLink`/`OPS_SchedulingOptions`). Testbatterij: `cases-advanced-cpm.json`
> (dag + uur, incl. FF/SF-uur-ankers, gemengd dag/uur-net, fractionele near-critical) +
> `check-advanced-cpm.ts` + universele harness-invarianten (interfering=tf−ff, criticalPaths[0]==
> criticalPath, hammock nooit floatPath/near-critical) over álle cases. Zie changelog en
> [ontwerp](superpowers/specs/2026-07-06-geavanceerde-cpm-design.md). Bewust later: live cross-project
> solve (vergt store-singleton-refactor); Expected-Finish-constraint; independent float; de
> spec-conforme `IfcRelAssociatesConstraint`-graf; sub-shift-nivellering van hammocks; native
> P6/MSPDI LOE/external round-trip waar de veldcodes UNVERIFIED zijn.
> **Status: gemerged op main (fase-2.9-branch, merge f79ae82 — 9 golven + QA + fix-golven);
> CHANGELOG-note staat onder `Ongepubliceerd` in afwachting van het versionslag.**

#### 2.10 Gebruikersdocumentatie & showcase-voorbeelden (afsluiter van fase 2)

> **AFGEROND (v2026.7.9 + v2026.7.10, 2026-07-07 t/m 2026-07-10).** Sneltoets-register + Ctrl+/-overzicht,
> contextmenu's (4 oppervlakken), box-selectie, taakdialoog-parity via gedeelde task-sections,
> taak-aantekeningen (IFC-pset `OPS_TaskNotes`), toewijzing verplaatsen, ConfirmDialog, relatietype-popover,
> gedockt/versleepbaar resourcepaneel, first-startup (welkom + 7-staps rondleiding + feedback-slotstap),
> 3 woningbouw-showcases klein/middel/groot (generator-schema uitgebreid; `verify:examples` als levend
> contract), en volledige in-app-documentatie NL+EN (25 artikelen, F1/Backstage-viewer, `verify:docs`).
> Zie changelog, de specs in `superpowers/specs/2026-07-07-2.10-*` en de git-historie van `fase-2.10`.
> Bewust doorgeschoven: drag-and-drop toewijzing-verplaatsen; sneltoets-herbinden; 12 extra doc-talen.

### Fase 3 — Bouwsector & Nederlandse Features (v1.0)

#### 3.1 Lean Construction & Last Planner System
- [ ] Phase Planning / Pull Planning (faseplanningsbord)
- [ ] Look-ahead Planning (6-8 weken vooruit, constraint-check)
- [ ] Weekly Work Plan (weekplanning met commitments)
- [ ] Commitment tracking (wie belooft wat)
- [ ] PPC-berekening (Percent Plan Complete) + dashboard
- [ ] Variance/Root Cause analysis
- [ ] Constraint log (belemmeringen-register)
- [ ] Constraint-ready indicator (taak kan starten: groen/rood)
- [ ] Make-ready process tracking
- [ ] Takt planning (repetitieve eenheden, bijv. per verdieping)
- [ ] Kanban-bord weergave
- [ ] Digitaal post-it bord (collaborative planning)
- [ ] Dagstart-dashboard (daily huddle board)
- [ ] Naadloze integratie LPS ↔ CPM (geen dubbel werk)

#### 3.2 Nederlandse bouwstandaarden
- [ ] RAW-besteksposten koppelen aan taken
- [ ] STABU-bestekscodes in WBS
- [ ] UAV-gc ondersteuning (Systems Engineering, V&V-planning)
- [ ] BRL-normen koppelen aan inspectiemomenten
- [ ] Wkb (Wet kwaliteitsborging) kwaliteitsborgingsplan-integratie
- [ ] CROW-publicaties referenties (bijv. CROW 400)
- [ ] Nederlandse aanbestedingsfasen (Aanbestedingswet 2012)
- [ ] VISI-koppeling (NL bouwcommunicatiestandaard)
- [ ] BLVC-plan (Bereikbaarheid, Leefbaarheid, Veiligheid, Communicatie)
- [ ] Asbestinventarisatie-milestones
- [ ] Omgevingsvergunning-milestones
- [ ] V&G-plan taken (veiligheidsmaatregelen)
- [ ] Bouwlogistiek planning

#### 3.3 Duitse/DACH bouwstandaarden
- [ ] VOB/B ondersteuning (Terminplanung conform VOB)
- [ ] HOAI-fasen (Leistungsphasen 1-9) als WBS-structuur
- [ ] DIN-normen referenties

#### 3.4 Earned Value Management (EVM)
- [ ] BCWP, BCWS, ACWP berekeningen
- [ ] CPI (Cost Performance Index)
- [ ] SPI (Schedule Performance Index)
- [ ] EAC (Estimate at Completion)
- [ ] S-curve (cumulatieve voortgang/kosten)
- [ ] Kostencurve (gepland vs. werkelijk)
- [ ] Cashflow-prognose
- [ ] EVM-dashboard

#### 3.5 Kosten & budget
- [ ] **Man-uren/kosten-totalen en budget-rollup als volwaardige feature.** De ResourcePanel-kolom
      "Totaal" (fase-2.5-review) toont nu enkel Σ eenheden × uren/dag × tarief per resource — een
      eerste, eerlijke stap. Bouw dit uit tot echte man-uren- en kostentotalen per taak/WBS-tak met
      rollup naar projectniveau (budget), inclusief materiaal en een baseline-vergelijking.
- [ ] Kostenberekening per taak (uren × tarief + materiaal)
- [ ] Budget vs. actual kosten tracking
- [ ] Cost loading (kosten verspreid over taakduur)
- [ ] Kostenrapportage
- [ ] Budget-overschrijding waarschuwingen

#### 3.6 Weergave-uitbreidingen
- [ ] Netwerkdiagram (PDM/Activity-on-Node)
- [ ] Line of Balance (LOB) diagram voor repetitieve werken
- [ ] Kalenderweergave (maandoverzicht)
- [ ] Timeline-weergave (horizontale tijdlijn, MS Project-stijl)

#### 3.7 Bouwspecifieke features
- [ ] Weercondities per taak (buitenwerk/binnenwerk markering)
- [ ] Inspectiemomenten als verplichte mijlpalen met checklijst
- [ ] Fasering-templates (fundering, ruwbouw, afbouw, installatie, oplevering)
- [ ] Seizoensgebonden restricties (geen buitenwerk in winter)
- [ ] Kraanplanning (beschikbaarheid, capaciteit)
- [ ] Bouwplaatsinrichting-milestones

#### 3.8 Import/export
> Zie ook GitHub-issue #17 (DutchSailor, 2026-07-06): onderbouwd formaten-voorstel met NL-marktanalyse
> ("6+2"-lijst). Kern klopt met onze richting; prioriteiten hieronder daarop aangescherpt.
- [ ] **Primavera XER import/export** — tekstformaat, native in TS haalbaar (geen JVM); samen met ons
  bestaande PMXML dekt dit de P6-wereld. Hoogste interop-prioriteit na fase 2 (issue #17).
- [ ] **iCalendar (.ics) export** — mijlpalen/deadlines naar agenda-apps; goedkoop, hoge waarde (issue #17).
- [ ] MS Project MPP import (readonly) — realistisch alleen via MPXJ (JVM): NIET als core-dependency
  (strijdig met lichte Tauri/web-architectuur); route = optionele externe converter (MPXJ-CLI/sidecar)
  óf gebruikers MSPDI laten exporteren. Besluit gedocumenteerd in issue #17-triage (2026-07-07).
  **Distributie via het extensiesysteem met "managed tools" (user-besluit 2026-07-07):** de
  catalogus-extensie declareert in zijn manifest een benodigd hulpprogramma (naam, downloadUrl uit
  onze eigen releases, sha256-checksum, grootte); de APP-KERN — niet de extensie — beheert daarop de
  volledige binary-levenscyclus: één bevestigingsvraag bij installatie, download + checksum-verificatie,
  opslag in de app-datamap, updates bij een nieuwere manifest-declaratie, opruimen bij de-installatie.
  De extensie-sandbox blijft ongewijzigd (JS mag alleen declareren/vragen, nooit zelf processen of
  bestanden beheren); de gebruiker hoeft nooit over Java/binaries na te denken. Web-versie: dezelfde
  extensie toont "alleen desktop". Generiek bouwen (herbruikbaar voor toekomstige zware extensies).
- [ ] Asta Powerproject PP import — zelfde MPXJ-afweging als MPP; zelfde converter-route.
- [ ] **KYP Project REST API-integratie (onderzoek)** — de facto NL-bouwplanningstool zonder publieke
  export; directe API-koppeling zou een unieke NL-USP zijn. Eerst: API-toegang/partnerschap verkennen
  (issue #17).
- [ ] Primavera XML (PMXML) import/export — bestaat sinds fase 2 (P6 XML round-trip, sinds v2026.7.7
  minuut-precies); dit punt is de restcontrole dat we P6's PMXML-dialectvarianten breed genoeg dekken.
- [ ] SVG-export van Gantt (PNG bestaat al)
- [ ] Clipboard-ondersteuning (kopieer taken naar Excel)
- [ ] MSPDI native `<Notes>`-mapping voor taak-aantekeningen (fase 2.10, item 1) — momenteel
  bewust weggelaten-met-warn (lossy voor onze checklist-vorm met done-vlaggen + parse-
  complexiteit); IFC blijft de verliesloze route (`OPS_TaskNotes`-pset).

#### 3.9 Rapportage
- [ ] Afdrukken naar printer (multi-page)
- [ ] Rapport-wizard (kies inhoud, layout, filters)
- [ ] Standaard rapporten: taaklijst, kritiek pad, resources, voortgang
- [ ] Custom rapporten (kies velden, groepering, filters)
- [ ] Grafische rapporten (histogrammen, pie charts)
- [ ] Look-ahead rapport (komende 3/6/8 weken)
- [ ] Voortgangsrapport (per periode)
- [ ] Executive dashboard (samenvatting op 1 pagina)
- [ ] Opleverpuntenlijst
- [ ] Kostenrapport

> §3.10 Volledige meertaligheid is afgerond (14 locales) — staat daarom niet als to-do.

### Fase 4 — 4D/5D BIM & Geavanceerde Analyse (v2.0)

#### 4.1 4D BIM
- [ ] IFC-gebouwmodel laden en renderen (Three.js + web-ifc)
- [ ] Taken koppelen aan IFC-elementen (drag & drop)
- [ ] 4D simulatie: tijdlijn-animatie
- [ ] Bouwfase-visualisatie (kleurcodering per status)
- [ ] Scrub door tijdlijn (slider)
- [ ] Camera-posities opslaan
- [ ] Screenshot/video-export van simulatie
- [ ] BIM-model filteren op verdieping/sectie
- [ ] Transparantie voor toekomstige elementen

#### 4.2 5D kosten-koppeling
- [ ] Quantity takeoff vanuit BIM-model
- [ ] Kosten koppelen aan IFC-elementen
- [ ] 5D visualisatie (kosten per fase in 3D)
- [ ] Cumulatieve kostencurve gekoppeld aan 4D-simulatie

#### 4.3 Risico-analyse
- [ ] Probabilistische duurschatting (3-point: optimistisch/realistisch/pessimistisch)
- [ ] Monte Carlo simulatie (Rust backend)
- [ ] Tornado-diagram (gevoeligheidsanalyse)
- [ ] Risico-register met koppeling aan taken
- [ ] Confidence level-analyse (P50, P80, P90 einddatums)
- [ ] Weather-risk integration (historische weersdata)

#### 4.4 Claims & delay analysis
- [ ] As-planned vs. as-built vergelijking (visueel)
- [ ] Time Impact Analysis (TIA)
- [ ] Window analysis (period-by-period delay)
- [ ] Delay-rapport genereren
- [ ] Snapshot-vergelijking (wijzigingen per periode)
- [ ] Trend-analyse (voortgang per week/maand)

#### 4.5 Clashdetectie & ruimtelijke analyse
- [ ] Detectie gelijktijdige werkzaamheden op zelfde locatie
- [ ] Kraanreikwijdte-analyse
- [ ] Hijszone-conflicten
- [ ] Logistieke route-conflicten
- [ ] Veiligheidszone-analyse

#### 4.6 Geavanceerde weergaven
- [ ] Tijd-weg diagram (lineaire projecten: wegen, tunnels, spoor)
- [ ] 3D Gantt (locatie × tijd × activiteit)
- [ ] Resource-heatmap (overbelasting visueel)
- [ ] Dashboard-builder (drag & drop widgets)

### Fase 5 — AI, Automatisering & Integratie (v3.0)

#### 5.1 MCP-server (AI-integratie)
- [ ] MCP-server voor Claude en andere AI-assistenten
- [ ] Alle planning-operaties als MCP tools (zie PLAN.md §5.2 tool-lijst)
- [ ] Natural language planning ("maak fundering in week 10, 3 dagen, 2 timmerlieden")
- [ ] AI-gestuurde planning suggesties
- [ ] AI risico-analyse
- [ ] AI resource-optimalisatie
- [ ] AI duurschatting op basis van historische data
- [ ] Conversational planning (chat-interface in app)
- [ ] Publieke TypeScript API-laag (`window.planner`) als basis hiervoor

#### 5.3 ERPNext-integratie
- [ ] Projecten synchroniseren (planning ↔ ERP)
- [ ] Inkoop-triggers vanuit planning (materiaalbestelling bij start taak)
- [ ] Timesheet-koppeling (uren ↔ voortgang)
- [ ] Factuurmomenten koppelen aan mijlpalen
- [ ] Kosten-synchronisatie (budget ERP ↔ planning)
- [ ] Subcontractor-management

#### 5.4 Automatisering
- [ ] Macro's/scripting (TypeScript API)
- [ ] REST API (voor externe integraties)
- [ ] Regels/triggers (als X dan Y)
- [ ] Batch-updates (bulk wijzigingen)
- [ ] Automatische resource-toewijzing (AI-gestuurd)
- [ ] Templates met parametrisering (bijv. "woning, 3 verdiepingen, met kelder")
- [ ] Planning-validatie regels (check op ontbrekende dependencies)

#### 5.5 Externe integraties
- [ ] BIM Collaboration Format (BCF) import/export
- [ ] Relatics-koppeling (UAV-gc SE)
- [ ] VISI-koppeling (communicatieprotocol)
- [ ] Procore-koppeling
- [ ] BIM360/Autodesk Construction Cloud koppeling
- [ ] Trimble Connect koppeling
- [ ] Webhook-ondersteuning (events naar externe systemen)

### Fase 6 — Samenwerking, Cloud & Enterprise (v4.0)

#### 6.1 Multi-user samenwerking
- [ ] Gelijktijdig bewerken (CRDT-based conflict resolution)
- [ ] Gebruikersrechten/rollen (admin, planner, viewer, subcontractor)
- [ ] Audit trail (volledige wijzigingslog: wie/wanneer/wat)
- [ ] Commentaar per taak (threaded discussions)
- [ ] @mentions en notificaties
- [ ] Bijlagen per taak (foto's, PDF's, documenten)
- [ ] Subcontractor-portal (beperkte toegang)

#### 6.2 Cloud-synchronisatie
- [ ] Cloud storage backend (self-hosted of managed)
- [ ] Realtime sync (WebSocket/CRDT)
- [ ] Offline mode (werk lokaal, sync later)
- [ ] Versiegeschiedenis (terugkeren naar eerdere versie)
- [ ] Project-sharing (link delen)
- [ ] Multi-project portfolio-overzicht

#### 6.3 Mobiele app
- [ ] PWA of native Tauri Mobile
- [ ] Voortgang registreren in het veld (foto + % gereed)
- [ ] Dagplanning bekijken
- [ ] Push-notificaties
- [ ] Offline voortgangsregistratie
- [ ] QR-code scanning voor locatie-registratie

#### 6.4 Enterprise features
- [ ] Single Sign-On (SSO) / SAML / OAuth2
- [ ] LDAP/Active Directory integratie
- [ ] Multi-project resource pool
- [ ] Portfolio-management (overzicht alle projecten)
- [ ] Cross-project dependencies
- [ ] Organisatie-breed dashboard
- [ ] Capaciteitsplanning (organisatie-niveau)
- [ ] Compliance-rapportage (BRL, Wkb, VOB/B)
- [ ] Data-export voor BI-tools (Power BI, Tableau)
- [ ] White-label opties

#### 6.5 Communicatie & notificaties
- [ ] E-mail notificaties bij wijzigingen
- [ ] Push-notificaties (desktop + mobiel)
- [ ] Weekrapport automatisch genereren en versturen
- [ ] Slack/Teams integratie
- [ ] Agenda-integratie (Outlook, Google Calendar)
