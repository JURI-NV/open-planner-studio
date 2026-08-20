# Etappe 2 — Primavera XER lezen, getrouw aan P6 op vier assen

*Levend etappeplan, aangemaakt 2026-08-20 na drie verkenningsrondes (corpus-inventaris,
MPXJ-referentiestudie, eigen-laag-inventaris — rapporten in de sessie van die dag). Eigenaar van
dit document is de orkestrator; besluiten en bevindingen worden hier bijgeschreven zoals bij
`2026-08-17-plan-mpp-nul-afwijkingen.md`.*

## §1 Doel

**Open Planner Studio opent Primavera XER-bestanden (.xer) native, en is daarbij getrouw aan
P6's eigen opgeslagen rekenuitvoer op vier assen: early start, early finish, late start en late
finish — plus de totale en vrije float.** Over alle leesbare, door P6 doorgerekende bestanden van
het XER-corpus geldt na import + herberekening (`runCPM`): exact nul afwijkingen op de vier
datum-assen, en float-gelijkheid binnen de uur-eenheid van het formaat. De baseline bestaat
uitsluitend uit nullen, zonder één reason-pin — het `GOAL_ZERO_DEVIATIONS`-model van etappe 1,
maar dan met zes tellers per bestand in plaats van vier.

Dit is bewust ambitieuzer dan etappe 1 op precies het punt waar etappe 1 blind was: de
.mpp-meetlat kon alleen datums meten, waardoor float-fouten (de R2/B3-klasse restpunten) alleen
door reviewers met handwerk gevonden werden. XER levert P6's float gewoon als kolom mee — dus
maken we hem tot poort.

**Wat er níét in deze etappe zit**: XER schríjven (export) — dat is een eigen, latere etappe
(MPXJ's `PrimaveraXERFileWriter` is er de referentie voor; registratie in `docs/TODO.md` bij Z20
van deze etappe). En de taaktypes/effort-driven-mótor blijft de aparte etappe uit
`2026-08-18-spec-taaktypes-effort-driven.md`; hier worden P6's duration- en activiteitstypes wél
gelezen en bewaard (superset-voedingsdata), maar sturen ze geen berekening.

## §2 Waarom dit de juiste volgende stap is

- `docs/TODO.md` (issue #17): *"Primavera XER import/export — tekstformaat, native in TS haalbaar
  (geen JVM); samen met ons bestaande PMXML dekt dit de P6-wereld. Hoogste interop-prioriteit."*
  In de bouwpraktijk is de .xer vaak het enige dat een aannemer aangeleverd krijgt.
- Het fundament ligt er: de format-registry maakt een `.xer`-entry een patroonvolgend haakje
  (lazy chunk, dialoogfilters, i18n-fouten — het .mpp-stramien), de meetkern van het
  fidelity-harnas is formaat-agnostisch, en de solver leest `schedulingOptions` al volledig
  terwijl nog geen enkele lezer ze vult — XER's SCHEDOPTIONS-tabel wordt de eerste.
- Het corpus is er al, en het is publiek: 93 crawl-bestanden (P6 5.0 t/m 24.x), 21.096 taken
  waarvan 17.963 (85%) alle vier orakel-assen dragen, plus een meegecrawld raamwerk met 13
  scenario's waarvan de uitkomsten door echt P6 23.12 zijn geverifieerd. Geen bedrijfsdata nodig:
  bestandsnamen mogen dit keer gewoon in tests en commits.

## §3 De twee meetlatten

1. **Corpus-orakel (bulk)**: P6 bewaart zijn laatste rekenuitvoer per taak in de TASK-tabel —
   `early_start_date`/`early_end_date`/`late_start_date`/`late_end_date`/`total_float_hr_cnt`/
   `free_float_hr_cnt`. Een eigen `xerGroundTruth` leest die velden met een **onafhankelijke,
   minimale tabelscan** — bewust een tweede parser naast de echte lezer, zodat een bug in de
   lezer niet in de meetlat kan doorsijpelen (de les van F7 uit de etappe-1-eindreview: gedeelde
   veldkaarten zijn common-mode; hier houden we zelfs de tabel-tokenizer gescheiden).
   Statussemantiek hoort bij de meetlat: voltooide taken hebben lege early-velden en meten op
   `act_`-datums; per bestand kan de float-kolom leeg zijn terwijl de datums gevuld zijn
   (gemeten: dat is een deelveld-gat, geen alles-of-niets) — de teller-administratie kent daarom
   per as een "meetbaar"-aantal naast het afwijkingental.
2. **P6-geverifieerde scenario's (scherp)**: de `p6-comparison`-map bevat 13 kleine cases
   (FS/SS/FF/SF-lag, ALAP, SNET+FNLT, mandatory start/finish, multi-kalender, feestdagen,
   in-progress/retained-logic, completed-successor, out-of-sequence) met per case ES/EF/LS/LF/
   TF/FF zoals **echt P6 23.12** ze produceerde. Die worden een eigen, corpus-onafhankelijke
   casebatterij (`cases-p6-verified.json`) in de planningssuite — de XER-tegenhanger van
   etappe 1's corpusloze cases, maar met een externe autoriteit als bron. De twee cases die het
   raamwerk zelf buiten de matrix hield (fractional-lag, dangling-relationship) worden
   overgenomen als gedocumenteerde niet-reproduceerbaar-in-P6-randgevallen, geen poort.

Niet-orakel-bestanden (de ongerekende fixtures, de opzettelijk kapotte robuustheidsbestanden,
het DROID-skelet) tellen niet in de fidelity-poort maar in de **parser-poort**: leesbaar-of-
nette-typed-fout, nooit een crash of een stil half project.

## §4 Harde regels (geërfd uit etappe 1, plus de XER-eigen)

1. **Het opgeslagen antwoord is meetlat, nooit uitkomst.** De scheiding is in XER formeel:
   `early_*`/`late_*`/`*_float_hr_cnt`/`driving_path_flag`/`float_path` zijn REKENUITVOER en
   mogen uitsluitend door `xerGroundTruth` gelezen worden; `target_*`, `act_*`, `cstr_*`,
   `duration_type`, `task_type`, `suspend_date`/`resume_date` en de relaties zijn INVOER en zijn
   het domein van de lezer. De lezer importeert geen enkel `early_`/`late_`/float-veld — ook
   niet "tijdelijk", ook niet als terugval. Drie afgekeurde pogingen in etappe 1 zijn het
   waarschuwende precedent.
2. **De veld-als-signaal-regel** (vastgelegd bij etappe 1, §Aandachtspunten etappe 2):
   veld-aanwezigheid op `Task` ís semantiek-signaal — `resume` gezet betekent vandaag "MSP-
   hervattingsconventie". De XER-lezer zet een bestaand veld alleen als de P6-betekenis
   aantoonbaar identiek is; elke afwijkende semantiek wordt een **bron-vlag** naar het
   O6-patroon (default uit ⇒ byte-identiek, uitsluitend door de betreffende lezer gezet).
   Verwachte flag-isatie-kandidaten, gemeten in te plannen in plaats van als verrassing: de
   lag-kalender (in P6 een SCHEDOPTIONS-instelling, bij ons al `schedulingOptions.lagCalendar` —
   eindelijk een echte vuller), retained logic vs. progress override (P6-expliciet;
   `progressMode` bestaat), en de Z10/Z11-relatieregels waar P6 eigen semantiek blijkt te hebben.
3. **Corpus is publiek**: de 93 crawlbestanden mogen bij naam in tests, commits en rapporten.
   Duiken er ooit bedrijfs-XER-bestanden op, dan geldt daarvoor de hash-only-regel van etappe 1
   onverkort.
4. **MPXJ (LGPL-2.1) uitsluitend lezen-om-te-begrijpen**; onafhankelijk herimplementeren,
   herkomstvermelding per bestand met klasse-/methodeverwijzing, nooit code overnemen. Zelfde
   regel voor het meegecrawlde cpp-cpm-engine-raamwerk (alleen de *data* van p6-comparison is
   bruikbaar als meetlat; hun engine-code is geen referentie).
5. **Exitcode is de poort, nooit de tail**; blast-radius meten vóór verbreden; regels formuleren
   op de invoer; diagnose op bladniveau; elke nieuwe decodeerregel krijgt een corpusloze
   (synthetische) fixture naast zijn corpuspin.
6. **Reviewpijplijn**: verse Sonnet-implementer per taak → Opus-review voor motor-, meetlat- en
   byte/grammatica-werk, Sonnet-spec-review voor mechanisch werk → fixronde bij dezelfde
   implementer → her-check bij dezelfde reviewer. Reviewers draaien mutatiebewijzen zelf na.
   Mergen één taak per keer met de fidelity-tellers vóór/ná in het merge-commit.

## §5 Openstaande eigenaarsbesluiten (X-O1 t/m X-O4)

- **X-O1 — multi-project-XER.** 6 corpusbestanden dragen meerdere projecten in één bestand
  (tot 15). P6 markeert het geëxporteerde hoofdproject (`export_flag`). Voorstel: het
  hoofdproject openen als document en de overige projecten als extra documenten aanbieden
  (zelfde multi-document-model als de app al heeft), met cross-project-relaties als
  `externalLinks`. Minimaal alternatief: alleen het hoofdproject, met een melding hoeveel
  projecten er nog meer in zaten. **Tot besloten: het minimale alternatief bouwen; de
  meerdocument-variant als vervolgtaak registreren.**
- **X-O2 — baseline-projecten.** XER kent geen apart baselinetype; een baseline is een tweede
  PROJECT-rij waarnaar `sum_base_proj_id` verwijst. Voorstel: bij het openen van het
  hoofdproject een gekoppeld baselineproject als OPS-baseline materialiseren (we hebben
  meerdere-baselines-infrastructuur). Kandidaat voor de tweede helft van de etappe; geen
  goal-voorwaarde.
- **X-O3 — de float-assen in de eindpoort.** Voorstel en aanname van dit plan: TF/FF tellen
  volwaardig mee in de nul-poort, met de uur-eenheid van het formaat als vergelijkingsprecisie
  en per as een "meetbaar"-teller (lege kolommen meten niet). Mocht de residu-iteratie een
  principieel P6-float-definitieverschil blootleggen dat niet via `schedulingOptions`
  (totalFloatMode, criticalDefinition) te vangen is, dan gaat dat als beslispunt terug naar de
  eigenaar — niet stilzwijgend versoepelen.
- **X-O4 — encoding-gok.** XER draagt geen encoding-declaratie; de industrie-defacto is CP1252,
  het corpus bevat ook UTF-8, MacRoman en Windows-1254. Voorstel: BOM-detectie → anders een
  lichte heuristiek (geldige-UTF-8-toets over het hele bestand; bij falen CP1252), en de
  gebruikte keuze in de openingsmelding benoemen wanneer er niet-ASCII-tekens in zaten. Geen
  gebruikersinstelling in deze etappe.

## §6 Banen en taken

Vier banen, elk een eigen worktree (`.claude/worktrees/xer-{meetlat,lezer,motor,data}`), zoals
etappe 1. X-nummering; volgorde binnen een baan is dwingend, banen lopen parallel na X0/X1.

### SERIEEL VOORAF

**X0 — Typen, harness-skelet, registry-stub.** Task-/ImportResult-velden die de etappe nodig
heeft als compile-gedekte typen (P6-duration-type en -activiteitstype als opgeslagen data —
*eigen* velden naast `mspTaskType`, geen hergebruik: de veld-als-signaal-regel geldt ook voor
typen; suspend/resume-herkomstvlag; zie X8). Corpusscan-tooling (`OPS_XER_CORPUS`-env naar het
patroon van `OPS_MPP_CORPUS`). Nog géén registry-entry — die komt pas bij X4, als er echt
gelezen wordt. **Acceptatie**: typecheck-poorten; een lege-lezer-run produceert een lege maar
welgevormde baseline.

**X1 — De meetlat éérst (baan M).** `tests/planning/xerGroundTruth.ts`: onafhankelijke, minimale
%T/%F/%R-scan die per taak de zes orakel-assen + status + act-datums levert, met eigen
encoding-afhandeling. `xerFidelity.ts` op de generieke meetkern (zelfde `solveProject`-keten,
zelfde classificatie exact/sameday/diff/missing, uitgebreid met de float-assen).
`check-xer-fidelity.ts` met per-bestand-pinning (bestandsnaam als sleutel — publiek corpus),
zes tellers + zes meetbaar-tellers, `OPS_XER_FIDELITY_REPORT`-modi, en de reason-verplichting
bij elke niet-nul-pin (de wacht tijdens de etappe; de eindpoort vervangt hem in X12).
Plus: de p6-comparison-extractie naar `cases-p6-verified.json` met een generator-script dat de
13 comparison.csv's omzet (herkomst: alleen de data). **Acceptatie**: mutatie-bewezen
(meetlatveld verleggen ⇒ rood); de dag-grens-normalisatie die het raamwerk zelf toepaste is
gedocumenteerd en bewust overgenomen of verworpen.

### BAAN F — formaat en lezer

**X2 — XER-grammatica.** `src/services/xer/xerTables.ts`: ERMHDR (versie + veld 9 =
default-valuta), %T/%F/%R/%E, tabs zonder escaping, `""`-quotes, DEL-DEL-multiline in
notitievelden (incl. BOM/NUL-strip — P6-viezigheid, herkomst MPXJ `NotesHelper`), de
lege-eerste-token-continuatieregel, onbekende tabellen overslaan, en de **CURRTYPE-tweepas**:
decimaal- en duizendtekens komen uit het bestand zelf en bepalen het getalparsen van álle
andere tabellen. Encoding per X-O4. Fout-tolerantie is een bewuste keuze: kapotte rijen
verzamelen in een import-rapportstructuur (geen stille skip zoals MPXJ's default, geen harde
crash) — de openingsmelding (X10) toont het aantal. **Acceptatie**: de drie opzettelijk kapotte
corpusbestanden (`p6xer-malformed.xer`, `p6xer-encodings.xer`, `p6xer-empty_tables.xer`) en de
zeven `kedular-*`-randgevallen lezen zonder crash met de verwachte rapportinhoud, gepind per
bestand; synthetische fixtures voor elke grammaticaregel; de platte-variant-bestanden zonder
%F-headers geven een nette typed fout.

**X3 — De kalenderdecoder.** `src/services/xer/xerCalendarData.ts`: de structured-text-grammatica
(`(nr||naam(veld|waarde|…)(kinderen…))`, DEL-DEL-gescheiden) als eigen tokenizer;
DaysOfWeek (dag 1-7, s/f-uurblokken, 24-uurs én AM/PM-notatie), Exceptions (`d|n` =
dagen-sinds-1899-12-30, mét of zónder afwijkende uren), lege kalender ⇒ P6-default ma-vr
08:00-16:00 (gedocumenteerd P6-gedrag), `base_clndr_id`-hiërarchie in een tweede pas,
`clndr_type` (global/project/resource), en de uren-per-periode-velden met de
afleiding-uit-weekuren-terugval — inclusief de gedocumenteerde waarschuwing dat P6 die velden
niet valideert. Aansluiting op de bestaande `subdayIo.ts`-promotie (uur- vs dagmodus) — de
holiday-bewuste laag uit etappe 1 werkt hier door. **Acceptatie**: corpusloze fixtures per
grammatica-element; corpuspin op het 124-kalender-monster (`rehab-2.xer`); de
kalenderpromotie-discriminatoren gedragen zich identiek aan de P6-XML-route (pariteitstest
tegen `parseP6StandardWorkWeek` op een equivalent kalenderpaar).

**X4 — Kern-mapping + registry-entry.** `src/services/xer/xerReader.ts`: PROJECT (hoofdproject
via `export_flag`, X-O1-minimum met telling), PROJWBS (sorteren op `(parent_wbs_id, seq_num)` —
de bestandvolgorde is onbetrouwbaar), TASK (statussen `TK_*`; milestones uit `TT_Mile`/
`TT_FinMile`/`TT_StartMile`; `TT_LOE` → `isHammock`; `TT_WBS`-summary; duration- en
activiteitstype als opgeslagen data), TASKPRED (`PR_*` én de prefixloze variant uit oudere
tools — gemeten in 6 bestanden), constraints (`CS_*` incl. mandatory → `hard`), en de
`ExternalRelation`-klasse voor cross-project-randen. Format-registry-entry (`kind: 'text'`,
lazy chunk, `canBeSaveTarget` blijft IFC-only), i18n-foutmeldingen in 14 talen naar het
.mpp-patroon. **Acceptatie**: eerste fidelity-nulmeting over het corpus draait en pint; de
schone-baseline-cases (`01-small-clean-baseline` e.d.) op exact nul op de datum-assen.

### BAAN S — motor en semantiek

**X5 — SCHEDOPTIONS en de vlaggen.** De eerste lezer die `project.schedulingOptions` vult:
`sched_calendar_on_relationship_lag` → `lagCalendar` (P6-default: predecessor), retained
logic/progress override → `progressMode`, critical-definitie en float-modus voor zover de
tabel ze draagt. Elke instelling die ons huidige default-gedrag zou veranderen wordt
blast-radius-gemeten over het corpus vóór hij doorwerkt. **Acceptatie**: de
in-progress/retained-logic- en completed-successor-cases uit `cases-p6-verified.json` groen;
corpusbestanden zonder SCHEDOPTIONS byte-identiek aan vóór deze taak.

**X6 — Resources en toewijzingen.** RSRC/RSRCRATE/TASKRSRC: het rollen-vs-resources-ID-
botsingsprobleem (aparte naamruimten), units-schalen (de 1.000.000- en ×100-conventies zijn
per veld verschillend — herkomst MPXJ, onafhankelijk verifiëren tegen corpuswaarden),
`TT_Rsrc`-activiteiten en de resourcekalender-koppeling. Het curves-dossier is klein en
afgebakend: 2 corpusrijen met `curv_id` (beide in `rehab-2.xer`) plus de RSRCCURVDATA-tabel
(21-punts verdeling) — mappen naar onze curve-typen op best-fit, met de rauwe 21 punten als
opgeslagen data (eigenaarsprincipe; voedsel voor de latere contour-engine, zelfde patroon als
`timephasedContours`). **Acceptatie**: corpuspins op de resource-rijke bestanden
(`Roads_Project_TEC.xer`, `rehab-2.xer`); geen datumbeweging op bestanden zonder resources.

**X7 — Suspend/resume en voortgang.** P6's suspend/resume ↔ ons `TaskTime.stop`/`resume` —
hiér slaat de veld-als-signaal-regel toe: het veld bestaat, maar de huidige solver-semantiek
eromheen is de MSP-conventie uit etappe 1. Eerst meten (de 22 corpustaken met suspend), dan
per verschil een bron-vlag naar het O6-patroon in plaats van stil hergebruik. P6-voortgang
(act-datums, `complete_pct_type`-varianten) tegen de bestaande actuals-invarianten.
**Acceptatie**: het out-of-sequence-scenario uit de P6-geverifieerde cases groen; de
suspend-dragende bestanden gepind; mutatiebewijs op elke nieuwe vlag-tak.

### BAAN D — data en randen

**X8 — Activity codes, UDF's, notities.** ACTVTYPE/ACTVCODE/TASKACTV → onze bestaande
`activityCodeTypes`-structuren (119.878 corpus-koppelingen — de zwaarste datamassa van de
etappe; prestatie meten op `rehab-2.xer` en `Hotel Project.xer`); UDFTYPE/UDFVALUE → onze
`customFieldDefs` (datatype-mapping); memo-tabellen → taaknotities (DEL-DEL-decodering uit X2).
**Acceptatie**: round-trip door het IFC (de bestaande psets dragen dit al — aantonen, niet
aannemen); tellingen gepind per corpusbestand.

**X9 — Documentcontract, round-trip en exportranden.** Alle nieuwe velden (P6-typen,
herkomstvlaggen, rauwe curvepunten) door het documentcontract en de IFC-round-trip; de
exportranden warnen naar het bestaande patroon (MSPDI/P6-XML-writers: wat een XER-import draagt
en de exporteur niet uitdrukken kan); `moveProject`-verdicten; MCP-leeskant conform het
etappe-1-besluit. **Acceptatie**: het mutatiebewijs-stramien van Z14 (property weg ⇒ rood op
precies dat veld; byte-identieke examples zonder regeneratie).

**X10 — Melding en gidsen.** De openingsmelding voor .xer naar het Z16-model: echte tellingen
(overgeslagen kapotte rijen, meegelezen extra projecten (X-O1), encoding-keuze bij niet-ASCII),
`severity: info`, 14 talen, CLDR-pluralen. Gidsen (nl+en): een eigen "Primavera P6 (.xer)
openen"-artikel naar het model van de .mpp-gids — elke planningsclaim met code-/testverwijzing,
en een eerlijke paragraaf over wat er (nog) niet meekomt (multi-project, baselines tot X-O2,
curves-als-verdeling). `verify:docs`-poort. **Acceptatie**: mutatiebewijzen op melding, i18n en
manifest, zoals Z16.

### SERIEEL — afronding

**X11 — Browser-gebruikstest** (aparte agent, tier 1): openen van de dossierselectie
(schone baseline, `rehab-2.xer`, multi-kalender, negatieve float, het torture-bestand),
IFC-opslaan/heropenen met veldbehoud, F5-stabiliteit, meldingen en gidslinks, taalwissel,
undo/documentwissel — het Z18-draaiboek, plus de nieuwe vraag: blijft de app vlot op de
119k-koppelingen-bestanden.

**X12 — Residu naar nul en de eindpoort.** Detail-rapportage per as → classificeren op
bladniveau → echte fout fixen met bewijs, of escaleren per §5/X-O3; "pinnen met reden" bestaat
niet als uitweg. Daarna `GOAL_ZERO_DEVIATIONS_XER` aan (zes tellers + reason-verbod +
meetbaar-dekking-bewaking naar het F1-model: `gemetenExact === meetbaar` per as), TODO-registraties
(XER-export; multi-document-variant van X-O1; X-O2 indien onafgemaakt), en de hyperkritische
Opus-eindreview over de volledige etappe-diff — inclusief de sluiproute-scan op de
invoer/meetlat-scheiding van §4.1.

## §7 Parallellisering

```
X0 ─ X1 (serieel)
          ├── baan F: X2 → X3 → X4 ──┐
          ├── baan S: (na X4) X5 → X6 → X7 ──┤
          ├── baan D: (na X4) X8 → X9 → X10 ─┤
          └────────────────── X11 → X12 (serieel)
```
Baan S en D hangen op X4 (er moet een lezer zijn); binnen F is de volgorde dwingend
(grammatica → kalender → mapping). De meetlat (X1) staat vóór alles, net als in etappe 1 —
en om dezelfde reden: wie eerst bouwt en dan meet, meet zijn eigen aannames.

## §8 Risico's, eerlijk benoemd

1. **De float-assen zijn onontgonnen terrein.** Etappe 1 heeft de datum-assen van de motor
   glashard gemaakt, maar float is nooit tegen een extern orakel gemeten. Verwacht hier de
   zwaarste dossiers: P6's float-definities (start/finish/smallest), de omgang met open einden
   (`makeOpenEndedCritical`), ALAP, en negatieve float (63 corpustaken, geconcentreerd in twee
   bestanden — dat worden dossiers). Dit is tegelijk de grootste winst: elke gevonden fout hier
   verbetert de motor voor álle formaten.
2. **`clndr_data` is de bytepuzzel van deze etappe** — kleiner dan de .mpp-CFB-wereld, maar met
   dezelfde valkuilcategorie (een eigen grammatica, AM/PM-verrassingen, epoch-conversie,
   ongevalideerde uren-per-dag-velden die de uur→dag-omrekening van álle duren en floats
   bepalen). De uren-per-dag-afleiding raakt de fidelity van elk bestand; blast-radius-discipline
   vanaf dag één.
3. **Encoding en getalnotatie zitten ín het bestand** (CURRTYPE-tweepas, CP1252-gok). Fouten
   hier zijn stil en corrumperen tekst of getallen zonder rood scherm — vandaar de
   robuustheidsbestanden als eigen poort in X2.
4. **Schaal**: `rehab-2.xer` (6.977 taken, 52.640 toewijzingen, 81k code-koppelingen) is 2×
   het grootste bestand dat de app ooit las. De 5000-taken-prestatie-eis van de eigenaar staat;
   X11 meet het expliciet.
5. **Scope-verleiding.** Multi-project, baselines en XER-export zijn elk een halve etappe op
   zich; X-O1/X-O2 begrenzen ze bewust. De goal is lezen-getrouw-op-vier-assen — al het andere
   is registreerbare vervolgambitie.
