# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Browser-dev via scripts/dev-server.mjs (poort per worktree, dubbelstart-guard)
npm run build        # tsc && vite build → dist/ (noEmit staat in tsconfig)
npm run typecheck    # tsc --noEmit op src/ én op tsconfig.tests.json (scripts/ + tests/)
npm run preview      # Serve the built bundle
npm run tauri:dev    # Run the desktop app (Tauri 2) via scripts/tauri-dev.mjs
npm run tauri:build  # Produce desktop installers
npm run bump X.Y.Z   # CalVer-versie syncen (package.json + tauri.conf.json + lock; Cargo.toml blijft bewust 0.1.0)
npm run gen:examples     # Voorbeeldprojecten (public/examples) opnieuw genereren
npm run verify:examples  # Poort: de gebundelde voorbeelden laden/rekenen door zoals verwacht
npm run verify:docs      # Poort: in-app gidsen — nl+en hard vereist, overige 12 talen indien aanwezig
npm run publish:wiki     # GitHub-wiki genereren uit repo-bronnen (dry-run; `-- --push` publiceert)
bash tests/planning/run.sh   # CPM/kalender-regressiesuite (data-driven cases, headless op Node via esbuild)
```

`npm run dev` gaat via `scripts/dev-server.mjs`: dat wijst deze worktree via `scripts/dev-port.mjs` een **vaste** poort toe (verankerd aan de worktree-root, ≥3007), claimt een guard-slot via `scripts/dev-lock.mjs` zodat een tweede start in dezelfde worktree wordt geweigerd in plaats van stilletjes een andere poort te pakken, stempelt `.claude/launch.json` met die poort (zodat `preview_start` meteen de juiste worktree opent), en spawnt dan pas Vite. `tauri:dev` (`scripts/tauri-dev.mjs`) doet hetzelfde en start `tauri dev` met een matchende `--config` `devUrl` plus `OPS_DEV_PORT`/`OPS_DEV_INSTANCE`/`OPS_DEV_GUARDED` in de env (de geneste `dev`-start slaat de toewijzing dan over). Zo kunnen **meerdere worktrees hun dev- en desktopbuild tegelijk draaien** — elk met een eigen poort (het venster laadt nooit de Vite van een andere worktree) en eigen `recovery.<slug>.*`-auto-save-bestanden (concurrent instanties overschrijven elkaar niet in de gedeelde `appDataDir`). `vite.config.ts` leest `OPS_DEV_PORT` met `strictPort`; `App.tsx` leest de slug via de `__OPS_DEV_INSTANCE__`-define.

There is no unit-test runner (vitest/jest) and no lint script. `tsc` is the main static check — draai `npm run typecheck` (dekt óók `scripts/` en `tests/`, incl. het casus-schema) in plaats van alleen `npm run build`; TypeScript is in `strict` mode with `noUnusedLocals`/`noUnusedParameters`, so build failures often surface dead code. De behavioral suites staan in `tests/`: `tests/planning/` is de hoofdsuite — data-driven CPM/kalender-cases (434 cases over 22 batterijen) plus losse `check-*.ts`-batterijen (IFC-round-trip en STEP-stringveiligheid, recovery-integriteit en -isolatie, meldingen, undo-begrenzing, export-guard, werkdagen-as, i18n-pluralvormen, SVG-sanitizer, "net geüpdatet"-vergelijklogica, …) die de echte store + `CPMSolver`/`CalendarEngine` headless op Node draaien, afgesloten met een tijdzone-matrix (`bash tests/planning/run.sh`, exit 0/1; zie `tests/planning/README.md`). Daarnaast `tests/mcp/` (MCP-tools headless tegen de echte store), `tests/library/` en `tests/dev-server/`. Run de planningssuite na elke wijziging aan scheduling-code.

**De suite print "alles groen" ook bij exit 1** wanneer het bundelen faalt — vertrouw op de **exitcode** plus `grep '^XX'`, nooit alleen op de tail.

CI (`.github/workflows/`): `ci.yml` runs `tauri build --no-bundle` on Ubuntu/Windows/macOS; `live.yml` deploys the browser build (`dist/`) to `open-planner-studio.open-aec.com` on every push to `main` — the web build is a real production deployment, not just a dev target; `release.yml` builds installers on `v*` tags and `snap.yml` volgt daarna via `workflow_run` (zie *Auto-update & releases* below). **`live.yml` en `release.yml` draaien allebei eerst dezelfde poortenrij** — `tsc --noEmit` op src én op `tsconfig.tests.json`, de CPM/kalender-regressiesuite, `verify:examples` en `verify:docs` — en `release.yml` controleert bovendien dat de tag overeenkomt met de gebumpte versie. Een rode suite blokkeert dus zowel de deploy als de release; draai die poorten lokaal vóór je pusht.

Path alias: `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig.json`). Use it consistently in imports.

## Architecture

This is a Tauri 2 desktop app (Rust shell + React 19 frontend) for construction planning, part of the OpenAEC-Foundation desktop-app family (LGPL-3.0; extension system and styling follow Open Calc Studio). The browser build is production-deployed (`live.yml`) and functionally near-complete: since v2026.7.11 it does its own file I/O (File System Access API on Chromium, download-fallback elsewhere) and auto-save recovery (IndexedDB). **Only the in-app updater is Tauri-only.** The split is still gated behind a runtime check:

```ts
const isTauri = () => '__TAURI_INTERNALS__' in window;
```

Any code that touches `@tauri-apps/*` must be either dynamically imported inside an `isTauri()` branch (see `App.tsx` auto-save) or otherwise guarded — top-level imports of Tauri plugins will break the web build.

### The Rust backend is thin — file I/O uses JS plugins, not `invoke`

De `invoke_handler` in `src-tauri/src/main.rs` telt precies drie commands: `install_kind` (uit `src-tauri/src/commands/mod.rs`) plus `mcp_bridge_start`/`mcp_bridge_stop` (uit `src-tauri/src/mcp_bridge.rs`, zie *AI-assistent* hieronder). `install_kind` wordt aangeroepen vanuit `src/services/updater/updaterService.ts` om het installatietype (appimage/snap/deb/native) te detecteren en de updater te poorten. (The unused `read_file`/`write_file` commands were removed for finding K6a: everything in the `invoke_handler` is reachable via `window.__TAURI_INTERNALS__.invoke(...)`, extension code included, and those two did no path validation and bypassed the `plugin-fs` scope. Houd die lat aan: elk nieuw command is publiek oppervlak.) All real file I/O funnels through `src/services/fileAccess/` — a runtime-dispatched abstraction (`index.ts` kiest Tauri↔web met een `FileRef`-model) met een Tauri-backend (`plugin-fs` + `plugin-dialog`) en een web-backend (File System Access API + download-fallback): `fileSlice` (open/save/export), `src/services/recovery/recoveryStore.ts` (auto-save) en `ReportPanel.tsx` (rapport-export) draaien er allemaal op; handle-backed recente-bestanden via `fileAccess/recentFiles.ts`. Follow that pattern — breid `fileAccess` uit, geen nieuwe Rust-command — when adding file operations. All IFC parsing/serialization, scheduling, and rendering are TypeScript; Rust is just the shell. Enabled plugins: `fs`, `dialog`, `shell`, `store`, `os`, `updater`, `process`, `clipboard-manager`; app id `org.openaec.planner`.

### IFC is the native file format, not a sidecar

The application's persistence model is IFC 4.3 (buildingSMART). Loading a project = parsing IFC via `src/services/ifc/ifcReader`; saving = serializing the entire app state via `ifcWriter`. There is no separate JSON project format. When adding new domain data (tasks, sequences, resources, assignments, calendar), it must round-trip through the IFC layer or it will be lost on save/reload. CSV/MS Project/P6 services in `src/services/` are import/export adapters, not the source of truth. The other `src/services/` areas — `fileAccess/` (Tauri↔web bestands-I/O + handle-backed recents), `recovery/` (auto-save/restore, Tauri fs + web IndexedDB), `benchmark/` (ingebouwde benchmark-tool via Instellingen), `print/` (printvoorbeeld), `pdf/` (vector-PDF-export via `pdf-lib`, met rasterfallback voor CJK/RTL), `updater/`, `feedback/` (feedbackdialoog + screenshot-annotator), `mcp/` (AI-assistent, zie hieronder) and `debug/appLog` (log-bus achter de DebugTerminal) — are app plumbing with no IFC impact. `library/` is de uitzondering: bibliotheekdata is app-globaal, maar herkomststempels round-trippen wél door het project-IFC (zie *Resourcebibliotheken*).

### Rendering: Canvas 2D, not DOM

The Gantt chart is drawn imperatively to a `<canvas>` via `src/engine/renderer/` (`GanttRenderer`). Bars, dependencies, the timescale, and hit-testing all live in renderer code — not React components. When changing visual behavior of the Gantt, edit the renderer; React only owns the surrounding chrome (ribbon, panels, dialogs, status bar). The table view (`TableEditor`) is a separate DOM-based editor over the same store.

### State: één Zustand + Immer store, samengesteld uit slices

`src/state/appStore.ts` is een compositie-root: `create<AppState>()(immer(...))` spreidt veertien slice-creators uit `src/state/slices/` (project, task, sequence, resource, schedule, history, view, ui, file, extension, document, structure, baseline, library). Elke slice is getypeerd als `AppSlice<XSlice>` (zie `slices/types.ts`) tegen de **volledige** `AppState`, zodat cross-slice acties (runCPM, undo/redo, newProject, file-I/O) gewoon de hele Immer-draft muteren. Nieuwe state/acties horen in de passende slice; `slices/types.ts` bevat daarnaast gedeelde type/enum-definities (`ViewState`, `UIState`, …). Domain-types staan in `src/types/`. De renderer leest alleen uit de store.

Multi-document is **single-active**: het actieve document leeft op top-level (project/tasks/sequences/… zoals altijd), zodat alle slices, componenten en de renderer single-document blijven. `documentSlice` bewaart de overige geopende documenten als losse `DocumentPayload`-snapshots en swapt top-level ↔ payload bij `switchDocument`/`newDocument`/`closeDocument`. Per-document: project, kalender, taken/relaties/resources/toewijzingen, selectie, `cpmResult`, `view`, `collapsedTaskIds`, undo/redo-stacks, `filePath`, `isDirty`. App-globaal (niet geswapt): de rest van `ui` en `taskClipboard` (zo werkt kopiëren/plakken tussen documenten). Er is altijd minstens één document; het laatste sluiten reset naar een leeg document. De document-chrome-UI staat in `src/components/layout/DocumentChrome/`: `DocumentTabBar`, `ProjectRail` en `SwitcherPill` zijn drie instelbare stijlen (`ui.documentChromeStyle` ∈ `'tabs' | 'rail' | 'switcher'`, persistent), plus een `ProjectOverview`-overlay en `CloseDocumentDialog` met 3-weg sluitbevestiging (opslaan/niet opslaan/annuleren); Ctrl/⌘ 1–9 springt naar het n-de document. `openFile`/`openRecentFile` openen in een **nieuw** document tenzij het actieve tabblad nog leeg en ongewijzigd is (`isActivePristine` in `fileSlice`); "Nieuw" opent de projectwizard (`ProjectInfoDialog` met kalender-presets en faseringssjablonen, via `ui.showNewProjectDialog`) in plaats van een kaal `newProject()`.

Scheduling is **manual, not reactive**: the `runCPM` action instantiates `CalendarEngine` + `CPMSolver` (`src/engine/scheduler/`) inline and writes computed fields (early/late dates, total float, critical-path flag) straight back via Immer — it does not re-run on every edit. It is triggered explicitly by F5, the ribbon **Calculate** button, the menu, and after an IFC load. Editing tasks without calling `runCPM` leaves the schedule stale, so call it after mutating tasks/sequences/calendar. Undo/redo is snapshot-based: mutating actions push a full `Snapshot` onto `undoStack` before mutating.

### Ribbon-driven UI

The shell is a Microsoft Office-style ribbon (`src/components/layout/Ribbon`) with tabs Start / Planning / Resources / Relaties / Beeld / Instellingen / Tabel / IFC / Rapport, plus an **AI** tab that only appears when `ui.aiMode` is on, plus a Backstage view (`src/components/backstage/`) for File — sections: recent, examples, export, import, print, project-info, settings, extensions, library, help (`BackstageSection` in `slices/types.ts`). The active tab is in `ui.activeRibbonTab`. Right-hand panels (`TaskPropertiesPanel`, `TableEditor`, `IFCPanel`, `ReportPanel`, `DebugTerminal`) are mounted conditionally based on UI state and the collapse state in `ui.rightPanelCollapsed` / `ui.rightPanelWidth`. Global dialogs (`UpdateDialog`, `JustUpdatedDialog`, `FeedbackDialog` + `ScreenshotAnnotator`, `ProjectInfoDialog`, `LibraryLinkDialog`, `CloseDocumentDialog`) mount from `App.tsx` behind `ui.show*` flags. De gedeelde `Dialog` heeft een focus-trap (Tab/Shift+Tab blijven in de modal); dialogen die elkaar zouden overlappen worden geweerd via een gedeelde guard (`hasBlockingDialogOpen`). Gebruikerzichtbare meldingen lopen sinds K8a via **één** kanaal, gevoed vanuit de store — geen losse `alert()`/ad-hoc toasts erbij bouwen.

### i18n

Fourteen locales (`nl, en, fr, de, es, zh, it, pt, pl, tr, ar, ja, ko, fa`) via `react-i18next`, configured in `src/i18n/config.ts`; each locale has four namespaces (`common`, `task`, `report`, `menu`). Alleen Engels wordt eager geladen; de rest komt lazy binnen via `loadLocale()` (Vite splitst per taal een eigen async chunk), dus vertalingen zijn niet synchroon beschikbaar direct na een taalwissel. `ar` and `fa` are RTL — `RTL_LOCALES` drives `document.documentElement.dir`. i18n initializes and falls back to **English** (`lng`/`fallbackLng: 'en'`); on startup `initLocale()` picks the saved preference, otherwise the OS/browser locale — it is not hard-defaulted to one language. The project's *working* language is Dutch, though: code comments, commit messages, and the canonical source translations are Dutch. Always go through `t(...)`; never hard-code visible text.

### Settings persistence

`src/utils/settingsStore.ts` persists settings to `localStorage` only, under `ops-`-prefixed keys — it does **not** use `@tauri-apps/plugin-store` (that package is a dependency but unused here). De **load**-kant loopt declaratief via `src/utils/settingsRegistry.ts`: één descriptor per instelling (localStorage-sleutel → validator/parser → doelveld in `UIState`), naar het `SHORTCUTS`-patroon. Een nieuwe instelling toevoegen = één entry daar, eventueel een dunne `saveX`-wrapper in `settingsStore.ts`, plus de gedeelde UI. Twee bewuste afwijkers worden expliciet in `loadAllSettings()` afgehandeld: thema (`initTheme()` migreert legacy-namen 7 → 3, persisteert de conversie en levert áltijd een waarde) en bouwmodus (synchroon, want de kalenderfabriek leest 'm direct). Sleutels die buiten de opstart-hydratatie lazy laden (layouts, workTimePresets, welcomeSeen, locale) staan bewust níét in het register. Settings-UI-conventie: elke instelling moet op alle drie de plekken verschijnen — tandwiel-popup (⚙), Instellingen-ribbontab en Backstage → Instellingen — door één gedeeld component te gebruiken (`src/components/settings/SettingsPanelContent`).

Separately, project **auto-save** draait zowel in Tauri als in de browser: een debounced (800 ms) store-subscription in `App.tsx` schrijft per open document één IFC-snapshot naar een gedeelde backend (`src/services/recovery/recoveryStore.ts` — Tauri: `appDataDir` via `plugin-fs`; web: IndexedDB) als `recovery[.<slug>].<docId>.ifc` plus een `recovery[.<slug>].documents.json`-manifest, met opruimen van verouderde snapshots, hersteld bij de volgende start. De oude enkele `recovery[.<slug>].ifc` wordt alleen nog als legacy-fallback gelezen.

### Auto-update & releases

Versies zijn CalVer (`YYYY.M.patch`), gelijkgehouden tussen `package.json` en `src-tauri/tauri.conf.json` via `npm run bump` (`Cargo.toml` blijft bewust `0.1.0`). De volledige runbook staat in de **`release`-skill** (`.claude/skills/release/`) — draai die bij een release in plaats van de stappen los te herhalen; een `v*`-tag is onomkeerbaar en auto-update naar alle gebruikers. Release-flow in het kort: `npm run bump <versie>` → commit → tag `v*` → push; `release.yml` bouwt en signeert installers (Windows via Azure Trusted Signing; macOS universal, met `app`-target voor de updater) en publiceert `latest.json`; `snap.yml` verpakt daarna de release-`.deb` tot Snap (`snap/snapcraft.yaml`). De in-app updater checkt stil bij het opstarten (`App.tsx` → `updaterService`, `UpdateDialog`): endpoint is de GitHub-release-`latest.json`, geverifieerd met de minisign-pubkey in `tauri.conf.json`; Snap/AppImage-installs slaan de updater over (detectie via het `install_kind`-command). Ná een geslaagde update toont `JustUpdatedDialog` één keer wat er nieuw is: `ui.justUpdated` wordt gezet door de versievergelijking tegen de bewaarde `ops-lastVersion`, en `src/services/updater/releaseInfo.ts` haalt de release-omschrijving, het grootteverschil en de tijd tussen releases op bij de GitHub Releases-API (pure functies, headless getest in `tests/planning/check-just-updated.ts`).

### Extensiesysteem

Naar het model van Open Calc Studio (`OpenAEC-Foundation/open-calc-studio`): een extensie is een ZIP (of los `.js`) met `manifest.json` + `main.js` (CommonJS, exporteert `onLoad(api)`/`onUnload()`). Volledig frontend — geen Rust. Code in `src/extensions/` (types, api, loader, service), state in `extensionSlice`. Opslag: IndexedDB `ops-extensions`; uitvoering: `new Function(...)`-sandbox waarvan `require()` alleen `'open-planner-studio'` teruggeeft; permissies (`ribbon`, `events`, …) worden per API-call afgedwongen. UI: Backstage → Extensies (beheer/installeren/catalogus) en Backstage → Importeren (extensie-importers); extensie-ribbon-knoppen renderen via `ExtensionRibbonGroups`. Catalogus: `open-planner-studio-extensions/catalog.json` op GitHub raw (30 min cache). Extensies zijn app-niveau data (geen projectdata) — geen IFC-round-trip-impact; importer-resultaten (`ImportResult`) zijn gewone store-data. Zelftest-haken: `window.__OPS__.extensions.*` (dev-only). Auteurshandleiding: `docs/extensions.md`.

### AI-assistent (MCP-bridge) — Tauri-only, protocol in TypeScript

Een externe AI-client (Claude Code e.d.) kan de app aansturen via MCP. De verdeling spiegelt de
rest van de architectuur: **Rust is een dom doorgeefluik, alle logica is TS.**
`src-tauri/src/mcp_bridge.rs` bindt een `tiny_http`-server op uitsluitend `127.0.0.1:<poort>`,
bewaakt een Bearer-token, weigert elk request met een `Origin`-header (DNS-rebinding-bescherming),
serialiseert requests strikt één-voor-één en forwardt de body als Tauri-event `mcp://request` naar
de webview; het antwoord komt terug via `mcp://response` (id-correlatie), status via `mcp://status`.
Het kent niets van MCP of JSON-RPC.

De hele protocol- en toollaag zit in `src/services/mcp/`: `server.ts` (levenscyclus, token, event-
bedrading — álle `@tauri-apps/*`-imports dynamisch achter `isTauri()`, zodat de web-build blijft
bouwen), `dispatcher.ts`, `schemaValidate.ts` (schema's worden in de dispatcher afgedwongen, óók
binnen `planner_batch` — een draaiboek mag de poort niet omzeilen), `toolRegistry.ts`/`toolIndex.ts`,
`staleGuard.ts` (`ensureFreshSchedule`), `backup.ts` (AI-backups per document in `appDataDir`,
`MAX_PER_DOC = 10`) en `activityLog.ts` (ring-buffer achter het AI-activiteitenpaneel). De 38
`planner_*`-tools staan in `src/services/mcp/tools/` (taken, relaties, resources, kalender, project,
baselines, documenten/bestanden, leestools, en `planner_batch` als transactionele executor met
temp-id-resolutie).

Veiligheid is state, geen conventie: `ui.aiMode` (de hele AI-tab en bridge verschijnen pas hierdoor),
`ui.aiPaused`, `ui.aiReadOnly` en `ui.aiServerStatus` leven in `uiSlice`; de per-request `McpContext`
leest ze live, plus een drift-anker (`expectedDocId`) zodat een tool nooit op het verkeerde document
landt. Instellingen staan onder de bekende `ops-`-prefix (`ops-aiMode`, `ops-aiAutostart` — default
**uit**, want een luisterende poort openen is een bewuste keuze —, `ops-aiAutoBackup`, `ops-mcpPort`,
`ops-mcpToken`); `src/hooks/useAiAutostart.ts` start de bridge desgewenst mee met de app, eenmalig
per app-sessie zodat een handmatige stop niet stil ongedaan wordt gemaakt.

De kern-bouwstenen nemen hun Tauri-randen als injecteerbare functies, zodat alles headless testbaar
is — zie `tests/mcp/`. Nieuwe tool ⇒ contract in `contracts.ts`, schema erbij, registreren in
`toolRegistry.ts`, en een case in `tests/mcp/`.

### Resourcebibliotheken

De bibliotheek (`librarySlice`) is app-globaal, net als extensies — niet per-document geswapt.
Persistentie via een `isTauri()`-gesplitste `libraryStore`: IndexedDB `ops-library` in de browser,
`ops-library.json` in `appDataDir` op desktop. Herkomststempels en bibliotheekbinding round-trippen
door het project-IFC via het bestaande `OPS_`-pset-patroon. De **bibliotheek is de bron** met de
volledige resource-editor; het project toont de inzet, en toewijzen vanuit de bibliotheek *is*
materialiseren (geen los "kopiëren"/"bijwerken-uit"). De Resources-tab kent daarom een
Bibliotheek- en een Projectweergave, met markeringen voor *wijkt af* / *niet meer in de bibliotheek*
en een gedeelde `LibraryLinkDialog` voor koppelen en afwijkingen. Let op de terminologie: code en
IFC gebruiken nog `companyId`/`companyName`, de **gebruikersterm is "resourcebibliotheek"** —
"bedrijf" alleen waar het echt over de organisatie gaat. Zie `docs/library.md`.

## Docs

- [PLAN.md](PLAN.md) — large project plan, source of truth for roadmap.
- [docs/TODO.md](docs/TODO.md) — lopende to-do-lijst met dingen die nog gedaan moeten worden.
- [docs/CHANGELOG.md](docs/CHANGELOG.md) — per **uitgebrachte** versie de uitgebreide beschrijving (Engels). Wordt alleen tijdens een release bijgewerkt (zie de `release`-skill) — geen `Ongepubliceerd`-kop, geen commit-dump.
- [docs/self-test-harness.md](docs/self-test-harness.md) — how Claude drives the app to self-test changes. Tier 1 (default): Playwright MCP (`.mcp.json`) + the dev-only `window.__OPS__` hook (installed by `src/utils/devBridge.ts`: store, log-bus, `extensions.*`) against the **browser** dev build (`npm run dev` — de poort wordt per worktree toegewezen en gestempeld in `.vscode/launch.json`, dus lees hem uit de dev-server-uitvoer in plaats van 3007 aan te nemen) — assert via store state, not canvas pixels. Tier 2 (opt-in): `tauri-driver` for the real desktop window.
- [docs/superpowers/](docs/superpowers/) — actieve ontwerp- en implementatiedocs (`specs/` + `plans/`: auto-update, snap-packaging, multi-worktree-dev-isolatie, dev-server dual-guard, UI-overhaul, planning-correctheid-testplan, B1.1-bibliotheekmodel, MCP-bridge fase 1, "je bent net geüpdatet"-dialoog, werkdagen-as en verticale drag).
- [docs/onderhoudbaarheid/](docs/onderhoudbaarheid/) — het onderhoudbaarheidsonderzoek: deelrapporten, critreviews en een visueel overzicht. Bron van de "K-items" die in commitberichten opduiken (K2 STEP-strings, K4/K5 recovery, K6a Rust-oppervlak, K7 export-guard, K8 meldingen/`isDirty`, K9–K11 CI-poorten).
- [docs/planning-test-bevindingen.md](docs/planning-test-bevindingen.md) — bevindingen van het CPM-correctheidsonderzoek dat de `tests/planning/`-suite opleverde.
- [docs/archive/superpowers/](docs/archive/superpowers/) — historical design docs and implementation plans for shipped features (zoom, debug terminal, stylebook). Archived; useful for context on *why* something was built, not *what* exists now — verify against current code.
- [docs/extensions.md](docs/extensions.md) — handleiding voor extensie-auteurs (manifest, API, installeren).
- [docs/library.md](docs/library.md) — resourcebibliotheken (B1/B1.1): bibliotheek als bron met projectinzet, herkomststempels, pool-IFC-export/-import, bekende beperkingen (geen sync tussen machines).
- [tests/planning/README.md](tests/planning/README.md) — hoe de CPM/kalender-regressiesuite werkt en hoe je cases toevoegt.
- `public/docs/<taal>/*.md` — de **in-app gidsen** achter Backstage → Help (viewer met taalkiezer, stale-waarschuwing en 14-taal-fallback). Brontalen zijn `nl` + `en`; die twee eist `npm run verify:docs` hard, de overige twaalf worden alleen gevalideerd wanneer ze bestaan (vertalingen volgen maandelijks, niet per release).
- `docs/wiki/` + `scripts/publish-wiki.mjs` — de GitHub-wiki is een **build-artefact** uit `public/docs/en`, `docs/wiki/*` en de changelog. Nooit de wiki direct bewerken; genereer met `npm run publish:wiki` (zie de `wiki`-skill).
