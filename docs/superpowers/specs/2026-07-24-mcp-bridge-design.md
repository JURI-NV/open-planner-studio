# Ontwerp: MCP-bridge voor Open Planner Studio (fase 1) — v2

*Status: v2 na 7 scenario-critreviews (alle zeven no-go op v1; alle must-fixes hieronder verwerkt) — 2026-07-24. Ter review door de user.*

## Doel & fasering

Open Planner Studio krijgt AI-integratie via het Model Context Protocol (PLAN.md Fase 5, §5.1/§5.2). Besloten fasering:

- **Fase 1 (dit ontwerp): AI ↔ draaiende desktop-app.** Claude (Code/Desktop) koppelt aan een geopend app-venster, leest en bewerkt het live plan; de user ziet alles direct in de UI, met undo.
- **Fase 2 (later): headless.** Dunne Node-stdio-wrapper om dezelfde dispatcher + tool-laag, werkt op IFC-bestanden zonder draaiende app.
- **Fase 3 (later): REST-API.** Zelfde Rust-server krijgt REST-routes op dezelfde tool-laag.

Fase 1 is Tauri-only (de web-build krijgt dit niet, net als de updater).

**Belangrijkste inzicht uit de reviews:** de tool-laag is *géén* verzameling dunne wrappers op bestaande store-acties. Fase 1 omvat expliciet ook store-/engine-uitbreidingen (batch-primitieven, document-duplicatie, kalender-dispatch, validaties met rollback). Die staan hieronder als eigen werkpakket.

## Architectuur

```
Claude Code / Claude Desktop
        │  streamable HTTP (JSON-RPC) + Bearer-token
        ▼
127.0.0.1:<poort>/mcp  ← klein Rust-servertje in de Tauri-shell (dom doorgeefluik)
        │  Tauri event → webview, antwoord terug via kanaal
        ▼
McpDispatcher (TypeScript, webview)  ← protocol: initialize / tools/list / tools/call / ping
        ▼
Tool-laag (TypeScript) → batch-store-acties + engine (runCPM, variance, ifcWriter, …)
        ▼
Live UI — wijzigingen direct zichtbaar, mét undo/redo
```

Scheiding: **Rust weet niets van MCP** (forwardt HTTP-bodies, bewaakt token + localhost-bind); **TS weet niets van HTTP** (krijgt JSON-RPC-berichten aangereikt). Rust blijft dun; de protocol- en tool-laag is headless testbaar op Node.

Koppelen = één regel: `claude mcp add --transport http ops http://localhost:<poort>/mcp` met het token als `Authorization: Bearer`-header.

### Componenten

- **`src-tauri/src/mcp_bridge.rs`** (~150-200 regels): tiny HTTP-server op 127.0.0.1, alleen actief na opt-in. Checkt Bearer-token, stuurt request-body als Tauri-event naar de webview, wacht met timeout op antwoord, geeft terug. Geen parsing van de inhoud. **Te verifiëren bij implementatie:** requests strikt geserialiseerd (één tegelijk de webview in) en de timeout ruim genoeg voor een grote bulk-call.
- **`src/services/mcp/`** (nieuw, TS): `dispatcher.ts` (minimale streamable-HTTP-MCP-afhandeling, geen SDK-dependency), `tools/` (tooldefinities: JSON-schema + handler), `server.ts` (levenscyclus).
- **Store-uitbreidingen** (zie werkpakket hieronder) in de bestaande slices.
- **Instellingen-UI**: blok "AI-koppeling (MCP)" in `SettingsPanelContent` (en dus op alle drie de plekken: ⚙, ribbon-Instellingen, Backstage): aan/uit, poort, token genereren/kopiëren, kant-en-klaar `claude mcp add …`-commando. i18n, 14 talen.

## Werkpakket store/engine-uitbreidingen (nieuw werk, geen wrappers)

1. **Batch-primitieven** — `addTasks`, `addSequences`, `updateTasks`, `deleteTasks` (en bulk-kalender, zie 5): één `beginUndoable`-snapshot, alle mutaties in de draft, één `finishMutation`, daarna één `runCPM` + één `recomputeViewRows`. Voortgangsvelden (`completion`/`actualStart`/`actualFinish`) lopen per taak door `applyProgressInvariants` (dezelfde logica als de dedicated setters) — **nooit** via de generieke `Object.assign`-route van `updateTask`.
2. **WBS-in-één-call** — `add_tasks` accepteert temp-id's: elk item krijgt een door de client gekozen `tempId`, en `parentId`/positie mag naar een `tempId` uit dezelfde call verwijzen. Aanmaak top-down zodat `childIds` klopt. Onbekende `parentId` (geen bestaand id, geen tempId) = harde toolfout vóór er iets gemuteerd wordt — geen stille dump op rootniveau.
3. **Relatie-validatie + rollback** — `add_dependencies` pre-valideert id-bestaan en draait een cyclus-check; introduceert de batch tóch een kring (of eindigt `runCPM` in `cpmResult.error`), dan wordt de snapshot teruggerold en komt er een leesbare toolfout. Geen kapotte relaties + niet-doorgerekende planning achterlaten.
4. **`duplicateDocument`** — nieuwe documentSlice-actie: kopieert de actieve payload naar een nieuw `DocumentEntry` (verse undo-stacks, `isDirty` op basis van bron, eigen titel "… (variant)"), zonder schijf-round-trip.
5. **Kalender-dispatch + generator-pad** — de app heeft een dubbel kalendermodel (projectkalender-cache `s.calendar` + bibliotheek `s.calendars`, initieel leeg). De tool-laag: (a) `get_calendars` levert de **unie**, gededupliceerd, met `isProjectDefault` en welke taken/resources elke kalender gebruiken; (b) `update_calendar` promoot zo nodig eerst de projectkalender naar de bibliotheek (`ensureProjectCalendarInLibrary`) en dispatcht dan naar `setCalendar`/`updateCalendar` — een onbekend kalender-id is een toolfout, geen stille no-op; (c) bulk: meerdere kalenders in één call = één undo-stap, één herberekening; (d) uitzonderingen kunnen ook **generator-gevoed**: `{ generate: { land/regio, jaar, bouwvak, feestdagen } }` → `materializeHolidays` (de AI hoeft geen datums te gokken); bij rauwe holiday-injectie wordt `generation`-metadata gewist (zelfde als de P6/MSPDI-readers doen).
6. **`moveTask` met positie** — store-actie krijgt een positie-argument (index/anchor binnen de nieuwe ouder); tot die tijd belooft de tool geen "volgorde".
7. **Guards & validaties** (harde toolfouten i.p.v. stil klemmen/negeren):
   - completion/actuals op een taak met kinderen → fout (of expliciet gedefinieerde rollup; gekozen: fout).
   - completion-eenheid: **0–100** in het JSON-schema; out-of-range = fout, geen klem.
   - `actualFinish >= actualStart` afdwingen.
   - actuals/voortgang zonder gezette statusdatum → fout met uitleg ("zet eerst de statusdatum via update_project") — zonder statusdatum zijn actuals voor de CPM inert en ongevalideerd.
   - mijlpaal met `duration > 0` → fout.
   - na een kalenderwijziging: na-check (`hasWorkingDays` + detectie van gecapte/sentinel-datums uit `addWorkDays`' 366-dagen-scan) → waarschuwing "taak X is niet meer inplanbaar" in de response.
8. **`save_baseline`-staleness-guard** — staat de planning stale, dan eerst herberekenen (of weigeren met fout); nooit stale datums als nulmeting vastleggen. `save_baseline` is **geen** auto-herrekenende mutator (bewuste uitzondering, expliciet hier vastgelegd).

## Tool-set v2 (32)

### Lezen (10)

| Tool | Contract (kern) |
|---|---|
| `get_project_info` | metadata, statistieken, statusdatum, `scheduleStale`, kalender-samenvatting |
| `get_project_overview` | complete WBS-boom, compact: WBS-code, naam, duur, start/einde, voortgang, kritiek, relaties verkort; gegarandeerd volledige relatiegraaf (één call volstaat voor structuuranalyse) |
| `list_tasks` | filters (o.a. kritiek, status, datumvenster, `zonder_relaties` voor wezen); compacte rijen |
| `get_task` | detail incl. assignments (resource, units, curve), constraints, kalender |
| `get_critical_path` | geordende keten(s) mét driving-relaties (`criticalPath` + `drivingSequenceIds`), per taak float |
| `list_resources` | resources incl. capaciteit en toewijzings-samenvatting |
| `get_resource_histogram` | params: `resourceIds`, datumvenster, bucket (`dag`/`week`); levert load + capacity + `overallocatedDays` + per piek de veroorzakende assignments |
| `get_calendars` | unie cache+bibliotheek, `isProjectDefault`, gebruikt-door (taken/resources) |
| `compare_baseline` | alleen afwijkers (`status !== onSchedule`) + `projectEndDelta`; vermeldt de bekende beperking dat delta's in werkdagen op de projectkalender gemeten worden |
| `analyze_delay` | **gedefinieerd als compositie**: baseline-variance ∩ kritiek pad → "deze N kritieke taken schoven, samen X werkdagen effect op de oplevering", incl. vereiste actieve baseline (anders nette fout). Geen verborgen analyse-engine — dit contract is alles wat de tool belooft. |

### Muteren (13 — auto-herrekenend tenzij anders vermeld)

`add_tasks` (bulk, temp-id/geneste WBS, positie), `update_tasks` (bulk; voortgang via invariant-setters; hefboom-documentatie in de beschrijving: *hypothetische* uitloop = duur of SNET-constraint, *geregistreerde* voortgang = actuals mét statusdatum), `delete_tasks`, `move_task` (ouder + positie), `add_dependencies` (bulk, pre-validatie + rollback), `remove_dependencies`, `manage_assignments` (bulk; add/update-units/move/remove — dekt alle vier de store-acties), `level_resources` (wrap `levelResources`+`applyLeveling`; `constrainToFloat`-toggle = smoothing binnen de float, optioneel `resourceIds`), `clear_leveling`, `update_calendar` (bulk + generator-pad; velden expliciet: werkweek, holidays/uitzonderingen — géén sub-dag-precisie, dat valt buiten het `Holiday`-model), `update_project` (naam, statusdatum, **startdatum = `setProject`**: ankert alleen nieuwe taken, verschuift niets — moet dus vóór `add_tasks`), `move_project` (wrap `moveProject`: verschuift de hele bestaande planning), `save_baseline` (met staleness-guard; niet auto-herrekenend).

### Documenten (4)

`list_documents` (verrijkt: per document titel, `isDirty`, actief, projectstart/-einde, taakaantal — varianten vergelijken zonder boom-dumps), `new_document` (**= store-`newDocument()`, leeg, géén projectwizard** — de wizard zou via de dialoog-guard alle vervolg-tools blokkeren), `duplicate_document` (variant van het actieve plan), `switch_document`. De AI sluit geen documenten en beslist niet over opslaan — dat blijft bij de user.

### Overig (5)

`undo`/`redo` (per-document; beschrijving waarschuwt: gedeelde stack met de user én per-document gescoped), `run_cpm` (expliciete verversing), `export_ifc`, `import_schedule`.

### Bestands-tools: eerlijke semantiek

- **fs-scope:** de Tauri-capability dekt `$HOME` (recursief), niet de hele schijf. Beide tools accepteren alleen paden binnen de scope en geven daarbuiten een nette fout die dat uitlegt. *(Te verifiëren bij implementatie: exacte scope-mapping van `fs:allow-home-*-recursive`.)*
- **`export_ifc`:** weigert een bestaand bestand te overschrijven zonder expliciete `overwrite: true`.
- **`import_schedule`:** opent **altijd een nieuw document** (er bestaat geen merge in de app; wie wil samenvoegen doet dat via de AI: lezen uit doc A, schrijven in doc B). Per-formaat-verlies gedocumenteerd in de toolbeschrijving: CSV = geen kalender (default-kalender!), geen resources/assignments; P6 = Nonlabor → EQUIPMENT; MSPDI = rijkst.

## Sessie-semantiek & respons-contract

- **Elke tool-response** bevat een envelop: `activeDocumentId` + documenttitel + `scheduleStale`.
- **Fail-closed op document-drift:** de tool-laag onthoudt het document-id van de laatste `switch_document`/`new_document`/`duplicate_document` (of de eerste call). Wisselt de user ondertussen zelf van tabblad, dan geeft elke *muterende* tool een fout ("actief document is gewijzigd: was X, nu Y — bevestig met switch_document") in plaats van stil in het verkeerde document te schrijven. Leestools mogen door (met de envelop als signaal).
- **Bulk-responses** rapporteren per item succes/fout (id + reden); een deel-weigering is zichtbaar, nooit stil.
- **Dialoog-guard:** bij een blokkerende dialoog/overlay (`hasBlockingDialogOpen`, incl. projectoverzicht en presentatiemodus) geven tools een fout die benoemt **welke** dialoog blokkeert.
- **Wat-als-patroon:** hypothesen niet via `undo` terugdraaien (gedeelde LIFO-stack; klikt de user tussendoor, dan draait `undo` het verkeerde terug). Het voorgeschreven patroon in de tool-beschrijvingen: `duplicate_document` → wat-als in de kopie → conclusies → user beslist wat er met de kopie gebeurt.
- **Mutaties op ID, nooit op naam:** toolbeschrijvingen dwingen de AI eerst te matchen via overview/list (WBS-code + naam) en bij meerdere kandidaten om bevestiging te vragen.

## Beveiliging & levenscyclus

Standaard **uit**; opt-in via Instellingen. Token crypto-random, gegenereerd bij eerste gebruik, opgeslagen via `settingsStore`. Poort instelbaar (default 3877); bezet → duidelijke foutmelding, geen stil doorschuiven. Alleen 127.0.0.1. Fout token → 401 zonder details. Bridge stopt netjes bij uitzetten en afsluiten. Web-build en dev-bridge onaangeraakt.

## Prestatie

Benchmark 2026-07-24 (ingebouwde tool, headless): cpm-mediaan 1000 taken = 11 ms, 2500 = 29 ms, 5000 = 63 ms. Auto-herrekenen per (bulk-)aanroep is goedkoop. De batch-primitieven voorkomen dat de undo-/view-laag (snapshots, `recomputeViewRows`) N× per bulk draait. Responsgrootte is de echte schaarse resource: compacte contracten, filters en bucketing zoals hierboven; de headless testbatterij meet ook payload-groottes op het 2500-taken-benchmarkproject.

## Testen

1. **Headless (poort 1):** testbatterij naast `tests/planning/` die dispatcher + alle tools op Node draait tegen de echte store — JSON-RPC erin, effect op store/CPM eruit. Expliciete cases voor elk stil-faal-patroon uit de reviews: onbekende `parentId`, kringverwijzing (rollback!), vers-project-kalender, completion out-of-range, actualFinish < actualStart, actuals zonder statusdatum, summary-voortgang, document-drift, stale baseline, onwerkbaar taakvenster. Zelfde esbuild-aanpak; exitcode is de poort.
2. **End-to-end (poort 2):** `npm run tauri:dev` + echte curl/MCP-client tegen de draaiende desktop-app; slotdemo (Claude bouwt live een planning) samen met de user.
3. `tsc`-build groen; bestaande planning-suite ongemoeid groen.

## Openstaande te-verifiëren punten (uit de reviews, [VERMOED])

- Exacte fs-scope-mapping `fs:allow-home-*-recursive` → `$HOME/**`.
- Event-serialisatie + timeout Rust↔webview onder een grote bulk-call.
- Of `CalendarForm` bij heropslaan van een kalender mét `generation`-metadata handmatig geïnjecteerde feestdagen wist (raakt werkpakket 5d).
- Token-omvang van overview/histogram op het 2500-taken-benchmarkproject (meting in de headless batterij).
- `computeVariance` meet werkdag-delta's op één kalender; per-taak-kalender-resolutie is een mogelijke verfijning.

## Bijlage: 7 use-cases (herschreven na review; leidraad voor tool-beschrijvingen en demo's)

1. **Planning opzetten vanuit bestek/tenderstuk** — `update_project` (naam + **start éérst**) → `update_calendar` (generator: bouwvak) → `add_tasks` (geneste WBS, temp-id's, één call) → `add_dependencies` (bulk, gevalideerd) → resultaat live in de Gantt.
2. **Voortgang verwerken op vrijdagmiddag** — `update_project` (statusdatum = vandaag) → matching via `get_project_overview` (WBS-code + naam, bevestiging bij ambiguïteit) → `update_tasks` (voortgang via invariant-setters; leaf-taken only) → weekrapport uit `list_tasks`-filters + `compare_baseline` (mits baseline; "achterlopend" = baseline-variance — een statusdatum-gebaseerde earned-schedule-afleiding is bewust géén fase 1).
3. **Vertraging doorrekenen + claim-onderbouwing** — hypothese in een kopie: `duplicate_document` → `update_tasks` (duur/SNET, níet actuals) → `compare_baseline`/`get_critical_path` (keten + driving-relaties)/`analyze_delay` (variance ∩ kritiek pad) → rapport; user beslist over de kopie.
4. **Onderaannemersplanning opschonen** — `import_schedule` opent een **nieuw document**; AI schoont dát document op: wezen via `list_tasks(zonder_relaties)`, structuur via `move_task` (met positie), kalender herbouwen via `get_calendars` (uit eigen doc) + `update_calendar` (in importdoc). Geen merge-belofte.
5. **Resource-pieken gladstrijken** — `get_resource_histogram` (week-bucket, incl. veroorzakers) → `level_resources` met `constrainToFloat` (einddatum heilig) als hoofdroute; handmatig bijsturen via `manage_assignments`/`update_tasks` als verfijning.
6. **Kalenderonderhoud** — `save_baseline` (na verse berekening) → `update_calendar` (bulk, generator-gevoed: bouwvak-regio + jaar; vorstverlet als hele dagen — sub-dag kan het model niet) → `compare_baseline` toont kant-en-klaar welke taken schuiven.
7. **Faseringsvarianten in een tender** — `duplicate_document` per variant → aanpassen → `list_documents` (verrijkt) vergelijkt doorlooptijden in één call; user ziet varianten als tabbladen en beslist.
