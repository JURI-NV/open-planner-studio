# Spec — B1.1: het bedrijfscentrische model (v2, na drievoudige critreview)

Datum: 2026-07-23 · Status: ontwerp v2, ter review user · Vervangt de gebruikerservaring van B1; bouwt op het B1-fundament.
v2 verwerkt de bevindingen van drie onafhankelijke reviews (2× modelgetrouwheid, 1× uitvoerbaarheid);
de genomen besluiten zijn gemarkeerd met **(besluit)**.

## 1. Kernprincipe (de omkering)

Een **bedrijf ís een resourcebibliotheek**: dé verzameling resources en kalenders van dat bedrijf.
Alle projecten van dat bedrijf werken vanuit die ene verzameling — één waarheid, gedeeld over
projecten. Een project "gebruikt" een resource door hem **aan een taak toe te wijzen**; dat is de
enige gebruik-handeling. Kopiëren, toevoegen-uit, bijwerken-uit en promoveren bestaan voor de
gebruiker niet meer — die choreografie zakt onder de motorkap.

## 2. Concepten

- **Koppeling project ↔ bedrijf**: zichtbaar en expliciet, ALTIJD — óók bij één bedrijf **(besluit,
  lost de eenpitter-botsing op die beide getrouwheidsreviews vonden)**: de wizard en Projectinfo
  tonen steeds "Bedrijf: Mijn bedrijf ▾ / geen (los project)". Eén regel, geen concept-uitleg; de
  B1-regel "verberg bedrijfs-UI bij ≤1 bedrijf" vervalt voor déze ene plek en blijft gelden voor
  alle overige selectors (import, herkenningsstap). Nooit meer een koppeling die stiekem ontstaat.
- **De koppeling pint op de bedrijfsentiteit** (`companyId`) **(besluit)**. Het bestaande
  vrije-tekstveld "company" in Projectinfo is een ánder ding (IFC-opdrachtgever/organisatie-
  metadata); dat blijft bestaan maar krijgt een ondubbelzinnig label ("Opdrachtgever/organisatie")
  zodat de twee nooit verward worden.
- **Los project** (geen bedrijf): heeft géén bibliotheek; alles leeft in het projectbestand. Dit is
  exact de toestand van een geëxporteerd/ontvangen bestand — één "los"-toestand, geen apart
  mechanisme. Los mag, gekoppeld is de norm.
- **Identiteitsstempels blijven onder de motorkap** (herkomst {companyId, libraryItemId,
  poolVersion}) — voor opslaan, delen, verversen en herkennen. De gebruiker ziet ze nooit.

## 3. Waarheid: het verversingsmodel **(besluit — de kernkeuze uit de uitvoerbaarheidsreview)**

"Pool = waarheid" wordt NIET gerealiseerd door overal live uit de pool te lezen (dat zou zes-plus
leesplekken, de extensie-API en het store-model breken), en NIET door de hele pool in `s.resources`
te spiegelen (dat zou de golden rule bedreigen). Het wordt **kopie-met-verversing op grenzen**:

- Projectresources blijven zoals nu kopieën in de per-document-store; álle bestaande consumenten
  (histogram, leveling, tabel, renderer, extensies, writer) blijven ongewijzigd daaruit lezen.
- Gestempelde kopieën worden **ververst vanuit de pool** op drie momenten: (1) bij het openen van
  een gekoppeld bestand, (2) bij het activeren van een geopend document (documentwissel), en
  (3) direct, voor het actieve document én alle geopende documenten, wanneer een poolitem wordt
  bewerkt of verwijderd. Effect voor de gebruiker: "wijzig het tarief in het bedrijf en het geldt
  overal" — zonder live-koppelingsarchitectuur.
- Verversing is een **dirty-zonder-undo**-mutatie (bestaande patroon): het document wordt vuil
  (zijn inhoud is echt veranderd), er komt geen undo-stap bij. Ctrl+Z na een verversing kan de
  oude waarden tijdelijk terugbrengen; de eerstvolgende grens ververst opnieuw (zelfhelend,
  gedocumenteerd gedrag).
- `s.resources` bevat **nooit** de hele pool — alleen gematerialiseerde items (§4). De golden rule
  en de writer/reader blijven daardoor onaangeroerd; er is geen pre-save-filter nodig.
- Poolitem verwijderd ⇒ de projectkopie blijft functioneren op zijn laatste waarden (geen
  dataverlies), in de projectweergave discreet gemarkeerd "niet meer in het bedrijf".
- **Afwijkingen bij openen: vragen, niet stil verversen (besluit user, 2026-07-23).** Wijken bij
  het openen van een bestand de waarden van gestempelde items af van de pool (een collega wijzigde
  bijv. een tarief in het rondgestuurde bestand — zoiets doet iemand niet zonder reden), dan toont
  de app éénmalig een afwijkingenoverzicht met per item (of in bulk) twee keuzes: **bedrijfswaarden
  gebruiken** (ververs het bestand) of **bestandswaarden overnemen in het bedrijf** (de pool wordt
  bijgewerkt en de nieuwe waarde geldt overal — één waarheid blijft in beide richtingen intact).
  Geen afwijkingen ⇒ geen vraag, gewoon openen. De verversingen op de andere twee grenzen
  (documentwissel, pool-edit) blijven stil — daar kán geen externe wijziging in zitten. Het
  overzicht deelt zijn vormtaal met de herkenningsstap (§5): afwijking tonen, gebruiker beslist.

## 4. Het Resources-tabblad = de werkplek

Voor een **gekoppeld** project toont het tabblad de **bedrijfspool**. Twee weergaven, schakelbaar:

- **Bedrijfsweergave** (default): alle resources van het bedrijf (gelezen uit de pool). CRUD hier =
  CRUD op het bedrijf: nieuw ⇒ direct in het bedrijf, voor alle projecten; bewerken/verwijderen ⇒
  geldt overal (via §3-verversing), met een licht visueel signaal "geldt voor alle projecten".
  Bedrijfs-edits vallen buiten de document-undo **(besluit)**: Ctrl+Z raakt alleen projectacties;
  het signaal maakt dat begrijpelijk. (Eigen undo-kanaal voor bedrijfs-edits = later, bekend punt.)
- **Projectweergave**: wat dít project **bevat** — aan taken toegewezen items plus items die uit het
  bestand meekwamen. ("Gebruikt" reserveren we voor toegewezen; vandaar "bevat" **(besluit,
  terminologie)**.)

**Toewijzen = materialiseren.** De toewijzings-pickers (taakeigenschappen, ribbon) tonen naast de
projectitems ook de poolitems; kies je een poolitem, dan wordt het onder de motorkap
gematerialiseerd (kopie + stempel, mét meereizende kalender — ALTIJD, ook in fase 1, zie §9)
via de bestaande, geteste kopieerlogica. Voor een **los** project toont het tabblad zoals vanouds
alleen de projectresources.

**Projectgebonden items in een gekoppeld project** (niet-gematchte restanten uit §5) zijn een
**tijdelijke, zichtbaar gemarkeerde resttoestand** — geen tweede bibliotheekje **(besluit)**; de
projectweergave biedt per item "alsnog het bedrijf in tillen / koppelen".

## 5. Koppelen & herkennen (vervangt alle kopieer-dialogen)

Bij het koppelen van een project aan een bedrijf — in de wizard, of achteraf via Projectinfo —
start automatisch de **herkenningsstap** zodra het project al eigen resources/kalenders heeft:

1. **Matcher (besluit):** voorstellen op exacte, genormaliseerde naam (trim + hoofdletterongevoelig).
   Geen fuzzy matching in v1. Bij géén of meerdere kandidaten: geen voorstel — de gebruiker kan per
   item handmatig een poolitem kiezen of het item het bedrijf in tillen. Tarief/type worden als
   context getoond, beslissen nooit automatisch.
2. De gebruiker bevestigt per stuk of in bulk → gematchte items worden gelinkt (gestempeld) en
   volgen voortaan het bedrijf (incl. directe verversing naar de poolwaarden, zichtbaar in het
   overzicht vóór bevestiging).
3. Niet-gematchte items: per stuk of in bulk het bedrijf in tillen, of projectgebonden laten (§4).

Eén scherm, met per item: projectwaarde, voorgestelde match (of keuzelijst), gevolg. Dit is het
enige nieuwe UX-oppervlak van B1.1 en wordt in het implementatieplan volledig uitgetekend — het
mag onder geen beding een verkapte "toevoegen uit bibliotheek"-dialoog worden: het draait om
koppelen/optillen bij een koppelmoment, nooit om items één voor één een project in kopiëren.
Omkoppelen naar een ander bedrijf doorloopt dezelfde stap; ontkoppelen maakt het project los
(inhoud blijft, als projectgebonden kopieën).

## 6. Wat verdwijnt, wat blijft (onder de motorkap) **(besluit, expliciet per onderdeel)**

Verdwijnt (UI + ui-flags + hun i18n-strings, niets verweesd achterlaten):
- `AddFromLibraryDialog` + ResourcePanel-knop "Toevoegen uit bibliotheek".
- `UpdateFromLibraryDialog` + ResourcePanel-knop "Bijwerken uit bibliotheek".
- De **resource**-promoveerknop "+ Uit project" in de Bibliotheek-sectie. De **kalender**-variant
  blijft in fase 1 staan als interim (enige pad om kalenders in de pool te krijgen) en verhuist in
  fase 2 naar de kalender-UI **(besluit, lost de §5↔§8-botsing uit review A op)**.
- De wizard-checkbox "na aanmaken toevoegen uit bibliotheek" — vervangen door de bedrijfskeuze.

Blijft, onder de motorkap, hergebruikt (de zwaar geteste slice-laag):
- `addLibraryResourceToProject`/`addLibraryCalendarToProject` → materialisatie bij toewijzen.
- `copy*/diff*/apply*`-kernfuncties → verversing (§3) en herkenningsscherm (§5).
- `promote*ToPool` → "het bedrijf in tillen" (§5) en nieuw-aanmaken in de bedrijfsweergave (§4).
- `updateProject*FromLibrary` → het verversingsprimitief.
- `bindProjectToCompany` → krijgt eindelijk zijn UI (wizard/Projectinfo).
De bijbehorende slice-tests blijven; het plan benoemt per actie "blijft (hergebruikt door X)".

## 7. Backstage → Bibliotheek krimpt tot bedrijvenbeheer

Bedrijven aanmaken/hernoemen/verwijderen, standaardbedrijf, pool-export (tevens backup) en
pool-import met de bestaande dempingswaarschuwing + sync-uitleg. Plus (fase 1, interim) de
kalender-promoveerknop. De resource-werkplek is het Resources-tabblad (§4).

## 8. Opslaan, laden en delen

- **Opslaan ("gebeiteld" onverkort):** het bestand bevat wat het project bevat (§4-projectweergave)
  — gematerialiseerde items met hun actuele waarden, stempels en de bedrijfsbinding. Nooit de hele
  pool. Golden rule (los project zonder bedrijfsgebruik ⇒ byte-identiek aan pre-B1) blijft gelden
  en blijft door de bestaande suites bewaakt.
- **Openen met bekend bedrijf:** §3-verversing draait; het project valt direct in het model.
- **Openen zonder dat bedrijf (ontvanger):** gedraagt zich als los, volledig werkend op de
  meegereisde kopieën; koppelen aan een eigen bedrijf kan via §5.
- Writer/reader en het opslagformaat veranderen niet.

## 9. Kalenders: zelfde principe, gefaseerd zonder tussenvorm-gaten

Resources gaan voorop. Harde voorwaarden voor fase 1 **(besluit, uit de uitvoerbaarheidsreview)**:
materialisatie neemt de meereizende kalender áltijd mee (zodat `resource.calendarId` nooit naar een
niet-bestaande projectkalender wijst), en het kalender-promoveerpad blijft bestaan (§6). Fase 2
brengt de kalender-UI naar hetzelfde model (bedrijfsverzameling zichtbaar waar kalenders beheerd
worden; projectdefault kiesbaar uit de bedrijfsset).

## 10. Histogram over projecten heen = B1b

Bezetting is een bedrijfsvraag: het histogram **zal** (als B1b-vervolg, niet in B1.1 zelf) de
belasting van bedrijfsresources over alle projecten van het bedrijf op deze machine tonen. B1.1
legt er het fundament voor; de machine-grens blijft gedocumenteerd (sync-vervolgproject).

## 11. Wat onverkort blijft van B1 (het fundament)

Opslagformaat en round-trip, golden rule, pool-opslag (IndexedDB/appDataDir), export/import met
demping, quote-bewuste parser, alle bestaande checks (190+395), i18n-infrastructuur en de
gedocumenteerde sync-beperkingen. Nieuw t.o.v. B1 in de fundamentlaag is uitsluitend het
verversingsmechanisme van §3 — dat is een toevoeging bovenop de bestaande primitieve functies,
geen wijziging eraan.

## 12. Migratie & compatibiliteit

- Bestanden mét stempels: vallen bij openen met bekend bedrijf direct in het model (§3/§8).
- Bestanden zónder stempels: openen als los; §5 is hun instap.
- Bestaande pools/bedrijven: ongewijzigd bruikbaar.
- Verwijderde dialogen laten geen dode ui-state of i18n-wezen achter; `docs/library.md` wordt
  herschreven naar dit model, incl. de beperkingen en het §3-scherpe-randje.

## 13. Buiten scope

Echte sync (vervolgproject), B1b-histogram-implementatie, eigen undo-kanaal voor bedrijfs-edits,
fuzzy naam-matching, bedrijfsoverstijgende resources, IFCX.
