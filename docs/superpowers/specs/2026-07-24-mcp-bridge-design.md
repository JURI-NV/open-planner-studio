# Ontwerp: MCP-bridge voor Open Planner Studio (fase 1) — v2.2

*Status: v2.2 — 2026-07-24. Historie: v1 → 7 scenario-critreviews (7× no-go) → v2 (must-fixes) → v2.1 (`batch`-tool) → 7 herreviews (7× no-go, convergerend op het batch-transactiefundament) → v2.2 verwerkt alle herreview-must-fixes + UI-hoofdstuk. Ter review door de user.*

## Doel & fasering

Open Planner Studio krijgt AI-integratie via het Model Context Protocol (PLAN.md Fase 5, §5.1/§5.2). Besloten fasering:

- **Fase 1 (dit ontwerp): AI ↔ draaiende desktop-app.** Claude (Code/Desktop) koppelt aan een geopend app-venster, leest en bewerkt het live plan; de user ziet alles direct in de UI, met undo.
- **Fase 2 (later): headless.** Dunne Node-stdio-wrapper om dezelfde dispatcher + tool-laag, werkt op IFC-bestanden zonder draaiende app.
- **Fase 3 (later): REST-API.** Zelfde Rust-server krijgt REST-routes op dezelfde tool-laag.

Fase 1 is Tauri-only (de web-build krijgt dit niet, net als de updater).

**Kerninzicht uit de reviews:** de tool-laag is géén verzameling dunne wrappers. Fase 1 omvat een expliciet transactieprimitief, store-/engine-uitbreidingen en validatielagen. Die staan hieronder als eigen werkpakketten.

## Architectuur

```
Claude Code / Claude Desktop
        │  streamable HTTP (JSON-RPC) + Bearer-token
        ▼
127.0.0.1:3877/mcp  ← klein Rust-servertje in de Tauri-shell (dom doorgeefluik)
        │  Tauri event → webview, antwoord terug via kanaal (strikt geserialiseerd, ruime timeout)
        ▼
McpDispatcher (TypeScript, webview)  ← protocol: initialize / tools/list / tools/call / ping
        ▼
Tool-laag (TypeScript) → transactieprimitief + store-acties + engine (runCPM, variance, ifcWriter, …)
        ▼
Live UI — wijzigingen direct zichtbaar, mét undo/redo
```

Scheiding: **Rust weet niets van MCP** (forwardt HTTP-bodies, bewaakt token + localhost-bind); **TS weet niets van HTTP**. Rust blijft dun; de protocol- en tool-laag is headless testbaar op Node. Koppelen = één regel: `claude mcp add --transport http ops http://localhost:3877/mcp` met het token als `Authorization: Bearer`-header.

### Componenten

- **`src-tauri/src/mcp_bridge.rs`** (~150-200 regels): tiny HTTP-server op 127.0.0.1, alleen actief na opt-in. Checkt Bearer-token, stuurt request-body als Tauri-event naar de webview, wacht met timeout op antwoord. Requests strikt één-voor-één; timeout ruim genoeg voor grote batches (te verifiëren bij implementatie).
- **`src/services/mcp/`** (nieuw, TS): `dispatcher.ts` (minimale streamable-HTTP-MCP-afhandeling, geen SDK-dependency), `tools/` (tooldefinities: JSON-schema + handler), `server.ts` (levenscyclus + status voor de UI), `activityLog.ts` (ring-buffer voor het activiteitenpaneel).
- **Store-uitbreidingen**: werkpakketten hieronder.
- **UI**: hoofdstuk "UI: AI-modus" hieronder.

## Werkpakket 0 — het transactieprimitief (fundament van bulk én batch)

Elke bestaande store-mutator roept zelf `beginUndoable` aan en veel roepen zelf `runCPM`/`recomputeViewRows`/`recomputeResourceLoad` aan (o.a. `applyLeveling`, `moveProject`, de assignment- en kalenderacties). "Eén bulk/batch = één undo-stap, één herberekening" is daarmee onhaalbaar zonder nieuw mechanisme. Gekozen ontwerp:

- **`runInMcpTransaction(fn)`** in `src/state/transaction.ts`: zet een module-vlag die `beginUndoable` onderdrukt; de transactie neemt zelf éxact één snapshot vooraf. Binnen de transactie draaien mutaties als **draft-primitieven** — varianten van de store-logica die géén eigen snapshot en géén eigen recompute doen. Aan het eind: één `runCPM`, één `recomputeViewRows`, één `recomputeResourceLoad`.
- **Draft-primitieven vereist voor het hele batch-oppervlak**, niet alleen taken/relaties: taken (`addTasks`/`updateTasks`/`deleteTasks`/`moveTask`), relaties (`addSequences`/`removeSequences`), kalenders, assignments, leveling, project (`setProject`/`moveProject`). Tools die geen draft-variant hebben, zijn van `batch` uitgesloten (zie batch-sectie).
- **Rollback-pad, expliciet:** mutaties en `runCPM` leven in aparte producers (genest `set()` kan niet in Immer). Bij een falende stap óf `cpmResult.error` ná de eindherberekening: `restoreSnapshot` van de vooraf genomen snapshot + `resetUndoCoalescing()`. De snapshot omvat ook `baselines`/kalenders, dus de rollback is compleet.
- **Vastgelegde invarianten:** (a) `runCPM` pusht nooit een undo-snapshot (bestaand gedrag; wordt nu een gedocumenteerde invariant — de batch-atomiciteit rust erop); (b) een batch draait volledig **synchroon** (geen `await` tussen stappen) — daardoor kan de user fysiek niet mid-batch van tabblad wisselen en volstaat één drift-/dialoog-check bij batch-start.
- **Te exporteren bouwstenen:** `applyProgressInvariants` (nu module-privaat in taskSlice) en `hasBlockingDialogOpen` (nu module-privaat in shortcutRegistry) verhuizen naar exporteerbare plekken; de MCP-laag dupliceert geen dialoog-flag-lijsten.

## Werkpakket 1-8 — store-/engine-uitbreidingen

1. **Batch-primitieven** (op het transactieprimitief): taken, relaties, kalenders, assignments — bulk in één transactie.
2. **WBS-in-één-call** — `add_tasks` met client-gekozen `tempId`'s; `parentId`/positie mag naar een `tempId` verwijzen; aanmaak top-down; onbekende `parentId` = harde toolfout vóór mutatie. **Cross-step-resolutie:** de batch-executor bezit de tempId→realId-map en herschrijft de args van latere stappen (relaties, assignments, updates) vóór dispatch.
3. **Relatie-validatie + rollback** — pre-validatie van id-bestaan + cyclus-check; kring of `cpmResult.error` → transactie-rollback met leesbare fout.
4. **`duplicateDocument`** — kopieert de actieve payload naar een nieuw `DocumentEntry` en: **maakt de kopie actief** (top-level swap zoals `switchDocument`), verzet de drift-verwachting mee, **nult `filePath` én `fileHandle`** (anders overschrijft de eerstvolgende Ctrl+S van de user het bronbestand!), zet `isDirty = true`, **deep-clonet de `clone`-rolvelden** (geen gedeelde arrays met de bron), en geeft de variant een naam via `project.name` + " (variant)" — er bestaat geen los titelveld, dus dit muteert bewust de projectnaam (round-tript mee in IFC).
5. **Kalender-dispatch + generator-pad** — `get_calendars` levert de **unie** van projectkalender-cache en bibliotheek (dedup, `isProjectDefault`, gebruikt-door). `update_calendar` promoot zo nodig eerst (`ensureProjectCalendarInLibrary`), bewerkt daarna als draft-primitief (dus bulk = één undo-stap — niet via de zelf-snapshottende `setCalendar`/`updateCalendar`); onbekend id = toolfout; **aanmaken kan óók** (draft-variant van `addCalendar`) — kalender-id's zijn per-document, dus een importdocument herbouwt kalenders, hergebruikt geen id's uit een ander document (toolbeschrijving waarschuwt). Generator-pad: `{ generate: {...} }` → `materializeHolidays`, met een contract dat 1-op-1 op `HolidayGenParams` past (land/regio/bouwvak-keuzes; jaarspanne afgeleid via `computeGenerateSpan` — géén los "feestdagen"-veld). **Meng-semantiek gedefinieerd:** generator-basis + extra rauwe uitzonderingen worden samengevoegd; zodra rauwe dagen worden toegevoegd wordt `generation` gewist én meldt de respons dat de kalender voortaan "letterlijk" is (geen regenerate meer). Geverifieerd: de kalenderdialoog wist handmatige feestdagen niet bij heropslaan — het mengmodel is houdbaar.
6. **`moveTask` met positie** — store-actie krijgt een positie-argument.
7. **Guards & validaties** (harde toolfouten, geen stil klemmen): voortgang op verzameltaken; completion buiten 0–100; `actualFinish < actualStart`; actuals/voortgang zonder statusdatum; mijlpaal met duur > 0; assignment-invarianten (leaf-only, geen mijlpaal/summary, units > 0, geen dubbele resource op één taak — de store-acties no-op'en hier nu stil). **Voortgangspad, precies:** `update_tasks` past voor voortgangsvelden de vólledige setter-logica toe — range-validatie 0–100 → conversie naar 0–1 → `completion > 0` zonder actualStart ⇒ actualStart afleiden → `completion < 1` ⇒ actualFinish wissen → dán `applyProgressInvariants` (de invariant-functie alléén is een deelverzameling en zou taken op 40% als NOT_STARTED zonder gepinde actualStart achterlaten). **Onwerkbaar-venster-detectie = engine-wijziging:** `addWorkDays` retourneert bij het bereiken van de 366-dagen-scan een expliciet `capped`-signaal (nu een gewoon-ogende datum zonder markering); de na-kalenderwijziging-check gebruikt `hasWorkingDays` (lege werkweek) + dat signaal ("taak X is niet meer inplanbaar").
8. **`save_baseline`-staleness-guard** — bij `scheduleStale` eerst herberekenen (of weigeren); geen auto-herrekenende mutator (bewuste uitzondering). **Uitgesloten van `batch`** (zie batch-sectie).

## Tool-set (33)

### Lezen (10)

| Tool | Contract (kern) |
|---|---|
| `get_project_info` | metadata, statistieken, statusdatum, `scheduleStale`, kalender-samenvatting |
| `get_project_overview` | complete WBS-boom, compact; gegarandeerd volledige relatiegraaf (één call volstaat voor structuuranalyse) |
| `list_tasks` | filters: kritiek, status, datumvenster, `zonder_relaties`; compacte rijen |
| `get_task` | detail incl. assignments (resource, units, curve), constraints, kalender |
| `get_critical_path` | **afgeplatte kritieke-taak-set (topo-volgorde) + driving-relaties gefilterd op paren waarvan beide eindpunten kritiek zijn**; per taak float. Reconstructie van de keten is client-werk en staat zo in de beschrijving. Gescheiden parallelle ketens (`criticalPaths`) alleen beschikbaar bij `longestPath`-modus — die afhankelijkheid wordt in de respons gemeld, niet stilzwijgend aangenomen. |
| `list_resources` | resources incl. capaciteit en toewijzings-samenvatting |
| `get_resource_histogram` | params: `resourceIds`, datumvenster, bucket `dag`/`week`. **Herberekent vers op de huidige staat; waarschuwt bij `scheduleStale`.** Levert load + capacity (weekbucket = som én piekdag), `overallocatedDays` altijd dag-granulair, en **per overbelaste bucket de veroorzakende assignments** — dit laatste is een nieuwe, gescopete engine-pass (attributie alleen voor overbelaste buckets; O(assignments×duur + pieken)), als eigen werkpakket. |
| `get_calendars` | unie cache+bibliotheek, `isProjectDefault`, gebruikt-door |
| `compare_baseline` | alleen afwijkers + `projectEndDelta`; disclosure: delta's in werkdagen op de huidige projectkalender — **na een kalenderwijziging is de meetlat zelf veranderd** (magnitudes met een korrel zout; richting/selectie blijft betrouwbaar) |
| `analyze_delay` | vereist actieve baseline (anders nette fout). **Oplevering-effect = `projectEndDelta`** — nooit een som van per-taak-delta's (cascade-dubbeltelling); de N kritieke schuivers met hun individuele delta's zijn lokalisatie/verklaring. |

### Muteren (13)

`add_tasks`, `update_tasks` (voortgangspad WP7; hefboom-documentatie: *hypothetische* uitloop = duur of SNET-constraint — die constraint blijft zichtbaar in het schema; *geregistreerde* voortgang = actuals mét statusdatum), `delete_tasks`, `move_task` (ouder + positie), `add_dependencies`, `remove_dependencies`, `manage_assignments` (bulk add/update-units/move/remove; pre-validatie WP7; per-item-rapportage), `level_resources`, `clear_leveling`, `update_calendar` (bulk + aanmaken + generator; WP5), `update_project` (naam, statusdatum, startdatum = `setProject`: ankert alleen nieuwe taken — dus vóór `add_tasks`), `move_project` (verschuift de bestaande planning), `save_baseline` (staleness-guard; niet in `batch`).

**`level_resources`-contract:** parameters `constrainToFloat` (true = smoothing binnen de float, einddatum heilig — de hoofdroute in use-case 5) en optioneel `resourceIds`, plus **`dryRun`**: preview zonder mutatie. De respons bevat altijd het volledige `LevelingResult`: shifts, unresolved + `unresolvedReasons` (`INTRINSIC_OVERRUN`/`CALENDAR_MISMATCH`/`INSUFFICIENT_CAPACITY`), `projectEndBefore/After` — de AI kan de user uitleggen wát er schoof en waaróm pieken bleven. Bij `constrainToFloat: false` schuift de einddatum: de respons meldt de delta prominent. `level_resources` reset zelf eerst alle leveling-delays (idempotent); `clear_leveling` ervóór is zinloos en de beschrijving zegt dat. In een batch draait vóór een `level_resources`-stap eerst een verse herberekening (anders kloppen de before/after-delta's niet).

### Documenten (4)

`list_documents` (per document: titel, `isDirty`, actief, **projectstart uit `project.startDate` (het anker) en projecteinde uit `cpmResult.projectEnd`**, taakaantal, plus een `stale`/"nog niet doorgerekend"-signaal — na een crash-herstel heeft alleen het actieve document een verse berekening; niet-actieve herstelde documenten melden "niet doorgerekend" tot ze bezocht of herrekend zijn), `new_document` (= store-`newDocument()`, leeg, géén projectwizard), `duplicate_document` (WP4), `switch_document`. De AI sluit geen documenten en beslist niet over opslaan.

### Compositie (1): `batch`

Eén call met een draaiboek: `steps: [{ tool, args }, …]` (max 100 stappen), synchroon en in volgorde uitgevoerd binnen het actieve document, als één `runInMcpTransaction`. Semantiek:

- **Eén undo-snapshot** (transactieprimitief, WP0); herberekening éénmaal aan het eind, plus tussentijds vóór een leesstap of `level_resources`-stap die op mutaties volgt.
- **Gedeelde temp-id-namespace**: de executor houdt de tempId→realId-map bij en herschrijft args van latere stappen.
- **Stap-fouten vs item-weigeringen:** een *stap-niveau*-fout (onbekende tool, foute args, geblokkeerde dialoog, kringverwijzing, `cpmResult.error`) → volledige rollback + rapport (uitgevoerd/gefaald/niet-bereikt). *Per-item*-weigeringen binnen een bulk-stap (bijv. één van twintig voortgangsregels ongeldig) zijn **zacht**: de geldige items worden toegepast, de geweigerde per item met reden gerapporteerd, de stap telt als geslaagd, en de batch-respons zet deel-weigeringen **prominent** bovenaan — nooit stil. Dit geldt ook voor losse bulk-tools buiten een batch.
- **Leesstappen:** alleen een *slot*-leesstap is zinvol — batch-args liggen vast bij inzenden, dus een vroege leesstap kan latere stappen niet voeden. Naam→ID-matching hoort als losse call vóór de batch. De toolbeschrijving zegt dit expliciet.
- **Toegestaan:** tools met draft-primitieven + leestools. **Uitgesloten:** `batch` zelf, `undo`/`redo`, document-tools, `export_ifc`/`import_schedule`, `save_baseline` (baseline hoort een losse, bewuste nulmeting op een vers schema te zijn — binnen een batch-snapshot zou een rollback de baseline mee-wissen en is de volgorde-semantiek onbepaald).
- **Bewust géén scripttaal** (JS/loops): een tweede, zwakkere sandbox met onbeheersbare undo-/beveiligingssemantiek; het draaiboek is declaratief en auditbaar. Wie echt wil programmeren heeft het extensiesysteem.

### Overig (5)

`undo`/`redo` (per-document — geverifieerd geswapt met het document; gedeelde stack met de user binnen één document, de beschrijving waarschuwt), `run_cpm`, `export_ifc`, `import_schedule`.

### Bestands-tools: eerlijke semantiek

- **fs-scope:** de Tauri-capability dekt `$HOME` (recursief), niet de hele schijf; buiten de scope een nette fout. *(Exacte mapping te verifiëren bij implementatie.)*
- **`export_ifc`:** weigert overschrijven zonder expliciete `overwrite: true`.
- **`import_schedule`:** volgt het bestaande laadpatroon: hergebruikt een leeg-en-ongewijzigd actief tabblad (`isActivePristine`), anders een nieuw document — er is geen merge. **Het drift-anker verzet mee naar het resulterende document** (net als bij `switch_document`/`new_document`/`duplicate_document`), anders zet de import zichzelf klem. Per-formaat-verlies in de beschrijving: CSV = geen kalender (default!), geen resources/assignments; P6 = Nonlabor → EQUIPMENT; MSPDI = rijkst. Kanttekening (bewust geaccepteerd): het pad komt uit de AI-args, niet uit een user-dialoog — de bestandskeuze-instemming verschuift naar de opt-in van de bridge zelf; resultaat is altijd zichtbaar als tabblad.

## Sessie-semantiek & respons-contract

- **Envelop op elke respons:** `activeDocumentId` + documenttitel + `scheduleStale` (+ pauze/alleen-lezen-status, zie UI).
- **Fail-closed op document-drift:** de tool-laag onthoudt het verwachte document-id; het anker verzet bij `switch_document`, `new_document`, `duplicate_document` én `import_schedule`. Wisselt de user zelf van tabblad, dan faalt elke muterende tool met "actief document is gewijzigd: was X, nu Y — bevestig met switch_document". Leestools mogen door. Binnen een batch is één check bij start voldoende (synchrone uitvoering).
- **Dialoog-guard:** bij een blokkerende dialoog/overlay (geëxporteerde `hasBlockingDialogOpen`, incl. projectoverzicht en presentatiemodus) een fout die benoemt wélke dialoog blokkeert.
- **Wat-als-patroon:** niet via `undo` (gedeelde LIFO-stack) maar via `duplicate_document` → wat-als in de kopie → user beslist. Voor claim-werk (use-case 3): **preconditie = een actieve baseline die dateert van vóór de vertraging**; nooit de baseline ná de wat-als opslaan (nulmeting = vervuild).
- **Mutaties op ID, nooit op naam;** matching via overview/list, bevestiging bij meerdere kandidaten.
- **Weekrapport zonder baseline** (use-case 2): expliciet gedefinieerde terugval — statusoverzicht + deadline-schendingen; géén "X dagen achter"-signaal mogelijk; de AI adviseert de user eerst `save_baseline` te (laten) doen. "Achterlopend" = baseline-variance; een earned-schedule-afleiding op de statusdatum is bewust géén fase 1.

## UI: AI-modus

- **Instelling** (gedeeld blok in `SettingsPanelContent` → automatisch op alle drie de plekken: ⚙, ribbon-Instellingen, Backstage): toggle **AI-modus** (`ops-aiMode`, persistent). Aan = AI-tabblad zichtbaar; uit = tabblad weg én bridge geforceerd gestopt. Bewust de enige instelling daar — de bediening leeft op het tabblad.
- **AI-ribbontab** (conditioneel, zoals andere tabs), drie groepen:
  1. **Server** — start/stop + statusindicator (uit / live op poort / poort-bezet-fout), gevoed door `server.ts`-status in `ui`-state; klein status-indicatortje ook in de statusbalk.
  2. **Verbinding** — poortveld, token (verborgen; kopieer + regenereer met waarschuwing dat bestaande koppelingen breken), kant-en-klare `claude mcp add …`-regel met kopieerknop.
  3. **Veiligheid & activiteit** — **pauzeknop** (bridge blijft live; mutaties krijgen tijdelijk een nette "gepauzeerd door gebruiker"-fout; leestools mogen door) en **alleen-lezen-schakelaar** (mutaties geweigerd zolang actief) — twee vlaggen in de tool-laag, status zichtbaar in de envelop; plus de knop naar het **AI-activiteitenpaneel**.
- **AI-activiteitenpaneel** (rechterpaneel, mount-mechaniek als `DebugTerminal`): live lijst per tool-aanroep — tijdstip, tool, compacte args-samenvatting ("add_tasks: 42 taken"), duur, ✓/✗ met reden; klik klapt volledige args/respons uit; een `batch` is één regel met uitklapbare sub-stappen. Gevoed door `activityLog.ts` (eigen ring-buffer, patroon van de log-bus; debug-terminal blijft ongemoeid).
- Alle teksten via `t(...)`, 14 talen.

## Beveiliging & levenscyclus

Standaard **uit**; opt-in via Instellingen (AI-modus) + start op het AI-tabblad. Token crypto-random via `settingsStore`. Poort instelbaar (default 3877); bezet → duidelijke fout. Alleen 127.0.0.1. Fout token → 401 zonder details. Bridge stopt netjes bij uitzetten en afsluiten. Web-build en dev-bridge onaangeraakt.

## Prestatie

Benchmark 2026-07-24 (ingebouwde tool, headless): cpm-mediaan 1000 taken = 11 ms, 2500 = 29 ms, 5000 = 63 ms. Herrekenen per (bulk-)aanroep is goedkoop; het transactieprimitief voorkomt N× snapshot/recompute. Responsgrootte is de schaarse resource: compacte contracten, filters, bucketing; de headless batterij meet payload-groottes op het 2500-taken-benchmarkproject.

## Testen

1. **Headless (poort 1):** batterij naast `tests/planning/` — dispatcher + alle tools op Node tegen de echte store. Expliciete cases voor elk stil-faal-patroon: onbekende `parentId`; kringverwijzing → rollback; vers-project-kalender; completion out-of-range; `actualFinish < actualStart`; actuals zonder statusdatum; voortgang op summary; **voortgangspad: 40%-taak krijgt STARTED + afgeleide actualStart**; document-drift; **drift-anker na `import_schedule` en `duplicate_document`**; stale baseline; onwerkbaar venster (capped-signaal); batch: één undo-stap over heterogene stappen, rollback bij kring, temp-id-resolutie over stappen, per-item-deelweigering zichtbaar; `duplicate_document`: `filePath`/`fileHandle` genuld, kopie actief, geen gedeelde arrays; `list_documents` na simulated-restore ("niet doorgerekend"-signaal); pauze/alleen-lezen-vlaggen. Exitcode is de poort.
2. **End-to-end (poort 2):** `npm run tauri:dev` + echte MCP-client; slotdemo samen met de user.
3. `tsc`-build groen; bestaande planning-suite ongemoeid groen.

## Openstaande te-verifiëren punten ([VERMOED])

- Exacte fs-scope-mapping `fs:allow-home-*-recursive` → `$HOME/**` (canonicalisatie/symlinks).
- Rust-event-serialisatie + timeout onder een grote batch.
- Token-omvang van overview/histogram op het 2500-taken-project (meting in de batterij).
- `computeVariance` per-taak-kalender-resolutie als latere verfijning.
- IFC-`GlobalId`-gedrag bij identieke taak-ID's in bron en variant (twee losse bestanden; vermoedelijk onschadelijk).

*(Opgelost t.o.v. v2.1: de kalenderdialoog wist handmatig geïnjecteerde feestdagen níet bij heropslaan — geverifieerd; mengmodel houdbaar.)*

## Bijlage: 7 use-cases (leidraad voor tool-beschrijvingen en demo's)

1. **Planning opzetten vanuit bestek** — één `batch`: `update_project` (naam + start éérst) → `update_calendar` (generator: bouwvak) → `add_tasks` (geneste WBS, temp-id's) → `add_dependencies` (temp-id's) → slot-`get_project_overview`. Eén call, één undo-stap.
2. **Voortgang verwerken op vrijdagmiddag** — losse matching-lezing (`get_project_overview`) vóóraf → `batch`: `update_project` (statusdatum) → `update_tasks` (voortgangspad WP7; per-item-weigeringen zichtbaar) → slot-lezing → weekrapport uit filters + `compare_baseline` (mits baseline; anders de gedefinieerde terugval).
3. **Vertraging + claim** — preconditie: baseline van vóór de vertraging. `duplicate_document` (kopie wordt actief) → `batch`: `update_tasks` (duur/SNET) → `compare_baseline` → `get_critical_path` → `analyze_delay` (`projectEndDelta`) → rapport; user beslist over de kopie.
4. **Onderaannemersplanning opschonen** — `import_schedule` (drift-anker verzet mee naar het importdocument) → opschonen in dát document via één `batch` (`move_task` met positie, `update_tasks`, `add_dependencies`; wezen via `list_tasks(zonder_relaties)`). Kalender: herbouwbron is expliciet het generator-pad óf een losse lezing uit het masterdocument (`switch_document` → `get_calendars` → terug → `update_calendar` mét aanmaken); id's zijn per-document.
5. **Resource-pieken gladstrijken** — `get_resource_histogram` (week-bucket, veroorzakers, vers herrekend) → `level_resources` (`dryRun` voor preview, dan toepassen; `constrainToFloat: true`) → onopgeloste pieken uitleggen via `unresolvedReasons`; verfijning via `manage_assignments`/`update_tasks`.
6. **Kalenderonderhoud** — losse `save_baseline` (vers schema, staleness-guard) → `batch`: `update_calendar` (bulk; generator-bouwvak + rauwe vorstverletdagen, meng-semantiek WP5; onwerkbaar-venster-signaal) → slot-lezing → `compare_baseline` (disclosure: meetlat is mee veranderd).
7. **Faseringsvarianten in een tender** — per variant: `switch_document`(basis) → `duplicate_document` → `batch` met de aanpassingen. Daarna `list_documents` (einddatums + stale-signalen) voor de vergelijking. De verplichte switch-terug-naar-basis staat in de toolbeschrijving (anders ontstaat een cascade van varianten-van-varianten).
