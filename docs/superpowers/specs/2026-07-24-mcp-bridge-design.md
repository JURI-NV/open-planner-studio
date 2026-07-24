# Ontwerp: MCP-bridge voor Open Planner Studio (fase 1)

*Status: concept ter review — 2026-07-24. Voortgekomen uit brainstorm; nog niet door de user goedgekeurd als definitieve spec.*

## Doel & fasering

Open Planner Studio krijgt AI-integratie via het Model Context Protocol (PLAN.md Fase 5, §5.1/§5.2). Besloten fasering:

- **Fase 1 (dit ontwerp): AI ↔ draaiende desktop-app.** Claude (Code/Desktop) koppelt aan een geopend app-venster, leest en bewerkt het live plan; de user ziet alles direct in de UI, met undo.
- **Fase 2 (later): headless.** Dunne Node-stdio-wrapper om dezelfde dispatcher + tool-laag, werkt op IFC-bestanden zonder draaiende app.
- **Fase 3 (later): REST-API.** Zelfde Rust-server krijgt REST-routes op dezelfde tool-laag.

Fase 1 is Tauri-only (de web-build krijgt dit niet, net als de updater).

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
Tool-laag (TypeScript) → bestaande store-acties + engine (runCPM, scheduleAnalysis, ifcWriter, …)
        ▼
Live UI — wijzigingen direct zichtbaar, mét undo/redo
```

Scheiding: **Rust weet niets van MCP** (forwardt HTTP-bodies, bewaakt token + localhost-bind); **TS weet niets van HTTP** (krijgt JSON-RPC-berichten aangereikt). Rust blijft dun; de protocol- en tool-laag is headless testbaar op Node.

Koppelen = één regel: `claude mcp add --transport http ops http://localhost:<poort>/mcp` met het token als `Authorization: Bearer`-header.

### Componenten

- **`src-tauri/src/mcp_bridge.rs`** (~150-200 regels): tiny HTTP-server op 127.0.0.1, alleen actief na opt-in. Checkt Bearer-token, stuurt request-body als Tauri-event naar de webview, wacht met timeout op antwoord, geeft terug. Geen parsing van de inhoud.
- **`src/services/mcp/`** (nieuw, TS):
  - `dispatcher.ts` — minimale streamable-HTTP-MCP-afhandeling (initialize, tools/list, tools/call, ping). Geen SDK-dependency.
  - `tools/` — tooldefinities (JSON-schema + handler), gebouwd op dezelfde fundering als de extensie-API (`extMappers`-DTO's waar mogelijk), werkend op het **actieve document**.
  - `server.ts` — levenscyclus: luistert naar het Tauri-event, start/stopt met de instelling.
- **Instellingen-UI**: blok "AI-koppeling (MCP)" in `SettingsPanelContent` (en dus op alle drie de plekken: ⚙, ribbon-Instellingen, Backstage): aan/uit, poort, token genereren/kopiëren, kant-en-klaar `claude mcp add …`-commando. i18n, 14 talen.

## Tool-set (28)

**Lezen (10):** `get_project_info`, `get_project_overview`, `list_tasks` (filters), `get_task`, `get_critical_path`, `list_resources`, `get_resource_histogram`, `get_calendars`, `analyze_delay`, `compare_baseline`.

**Muteren (11, allemaal auto-herrekenend):** `add_tasks` (bulk, met `parentId`/positie), `update_tasks` (bulk; incl. voortgang, actuals, constraints, `calendarId` — `add_constraint` uit §5.2 is hierin opgegaan), `delete_tasks`, `move_task` (hiërarchie/volgorde), `add_dependencies` (bulk), `remove_dependencies`, `assign_resource`, `update_calendar` (aanmaken/wijzigen: werkdagen, feestdagen/uitzonderingen), `update_project` (naam, start, statusdatum, projectkalender), `save_baseline`.

**Documenten (3):** `list_documents`, `new_document`, `switch_document`. De AI opent en wisselt, maar **sluit niets en beslist niet over opslaan** — dat blijft bij de user.

**Overig (5):** `undo`, `redo`, `run_cpm`, `export_ifc`, `import_schedule` (expliciete absolute paden, Tauri-fs).

Vervallen t.o.v. PLAN.md §5.2 (onderliggende feature bestaat niet): `run_monte_carlo`, `get_ppc`, `suggest_optimization` (de AI kan optimalisaties voorstellen door lees-/analysetools te combineren).

### Ontwerpbesluiten tool-laag

- **Auto-herberekenen:** elke muterende tool eindigt zelf met CPM-herberekening en retourneert direct de bijgewerkte datums (geraakte taken + projecteinde + kritiek-vlag). Bulk-tools herrekenen één keer per aanroep. Benchmark 2026-07-24 (ingebouwde tool, headless): cpm-mediaan 1000 taken = 11 ms, 2500 = 29 ms, 5000 = 63 ms — per-aanroep herrekenen is goedkoop. `run_cpm` blijft als expliciete verversing (bijv. nadat de user zelf in de UI wijzigde).
- **Undo voor de AI:** `undo`/`redo` op de bestaande snapshot-stacks. Zelfde stack als de user's Ctrl+Z: één bulk-aanroep = één snapshot = één undo-stap; de user kan AI-wijzigingen dus ook zelf terugdraaien. Tool-beschrijving waarschuwt dat `undo` ook de laatste handmatige stap van de user kan raken.
- **Overzicht:** `get_project_overview` levert de complete WBS-boom compact — per taak WBS-code, naam, duur, start/einde, voortgang, kritiek-vlag, relaties in verkorte notatie. Leestools melden expliciet of de planning stale is.
- **Hiërarchie:** `add_tasks` accepteert `parentId` + positie; `move_task` verplaatst (andere ouder/volgorde) — dekt indent/outdent en herstructureren.
- **Foutafhandeling:** guard bij openstaande modale dialoog of ontbrekend document → nette toolfout. Validatiefouten (onbekende ID, kringverwijzing) → leesbare MCP-toolfout, geen crash.

## Beveiliging & levenscyclus

Standaard **uit**; opt-in via Instellingen. Token crypto-random, gegenereerd bij eerste gebruik, opgeslagen via `settingsStore`. Poort instelbaar (default n.t.b., bijv. 3877); bezet → duidelijke foutmelding, geen stil doorschuiven. Alleen 127.0.0.1. Fout token → 401 zonder details. Bridge stopt netjes bij uitzetten en afsluiten. Web-build en dev-bridge onaangeraakt.

## Testen

1. **Headless (poort 1):** testbatterij naast `tests/planning/` die dispatcher + alle tools op Node draait tegen de echte store — JSON-RPC erin, effect op store/CPM eruit. Zelfde esbuild-aanpak; exitcode is de poort.
2. **End-to-end (poort 2):** `npm run tauri:dev` + echte curl/MCP-client tegen de draaiende desktop-app; slotdemo (Claude bouwt live een planning) samen met de user.
3. `tsc`-build groen; bestaande planning-suite ongemoeid groen.

## Bijlage: 7 use-cases (leidraad voor tool-beschrijvingen en demo's)

1. **Planning opzetten vanuit bestek/tenderstuk** — werkvoorbereider plakt projectomschrijving; AI bouwt WBS (`add_tasks`), relaties (`add_dependencies`), kalender (`update_calendar`), live in de Gantt.
2. **Voortgang verwerken op vrijdagmiddag** — mail uitvoerder erin; `update_tasks` (voortgang/actuals) → auto-herberekening → `list_tasks`-filters → AI schrijft weekrapport.
3. **Vertraging doorrekenen + claim-onderbouwing** — `save_baseline` → `update_tasks` → `compare_baseline` + `get_critical_path` + `analyze_delay`; als vrijblijvende wat-als via `undo`.
4. **Onderaannemersplanning opschonen** — `import_schedule` (P6/MSP) → AI spoort ontbrekende relaties op uit `list_tasks`-data, koppelt kalender, trekt structuur gelijk.
5. **Resource-pieken gladstrijken** — `get_resource_histogram` → `update_tasks` op taken met speling → herberekening bevestigt. (Automatische `level_resources` = latere fase; engine heeft `ResourceLeveler`.)
6. **Kalenderonderhoud** — bouwvak/vorstverlet: `save_baseline` → `update_calendar` → auto-herberekening → `compare_baseline`.
7. **Faseringsvarianten in een tender** — varianten naast elkaar via `new_document`/`switch_document`/`list_documents`; vergelijking door de AI over de leesdata heen.
