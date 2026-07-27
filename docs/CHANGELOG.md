# Changelog

This document describes, **per released version**, what that release of Open Planner Studio
contains — the detailed, substantive counterpart to the short release notes. Every released
version has its own section (no gaps); the newest is at the top. It is deliberately not a
running archive of every individual commit: within a version there is a curated description,
grouped by whichever category applies (`Added`, `Changed`, `Fixed`, `Documentation`).

## v2026.7.13 — 2026-07-27

### Added
- **An AI assistant can now operate the app directly, through a built-in MCP (Model Context
  Protocol) server.** The new `src/services/mcp/` layer (about two dozen files) exposes roughly
  38 `planner_`-prefixed tools — ten read tools (project overview, tasks, critical path,
  resources, histogram, calendars, baselines) and mutation tools for tasks, dependencies,
  resources, calendars, baselines, documents and files — plus a `planner_batch` executor that
  runs up to 100 scripted steps as one atomic transaction with temporary-id resolution across
  steps. A new AI ribbon tab turns the bridge on/off and opens a *Connection details* dialog
  (endpoint, Authorization header, a ready-to-paste JSON config fragment and connect prompt,
  with the tool count read live from the registry) instead of a client-specific, truncated CLI
  line. Safety is explicit: pause, read-only and an auto-backup (capped at 10 snapshots per
  document) sit next to a ring-buffer activity panel that lists every tool call the assistant
  made. A new `ops-aiAutostart` setting (default off) can start the bridge together with the
  app. New in-app guide "Connecting an AI assistant (MCP)" (NL+EN) documents what the assistant
  can and cannot do — including the resource-library fields it is not allowed to touch (see
  below).
- **Resource libraries (issue #19, partly): a resource pool that lives above individual projects,
  with company binding, provenance and a real editor.** Issue #19 also asked for a cross-project
  overview of where each resource is already booked, to spot double-bookings; that part is not in
  this release and the issue stays open for it. The Resources tab now has two views — a
  Library view that is the source of truth (with its own inline table editor, replacing an old
  `window.prompt()`-based one) and a Project view showing what a project actually assigns from
  it. Identity fields (name, type, description, rate, unit) follow the library and become
  read-only in the project once a resource is linked; assignment fields (max units,
  availability, which calendar to use) stay per-project and editable, governed by a shared
  `RESOURCE_DIFF_FIELDS` diff so the UI and the MCP bridge can never disagree about what is
  locked. A shared `LibraryLinkDialog` handles linking, resolving deviations and reviewing what
  changed since the last sync; libraries round-trip through project IFC files as an
  `OPS_Library` pset with origin stamps, and can be imported either as a new library or to
  replace an existing one. The bundled showcase projects now share one demo resource library.
  The user-facing term "company" was renamed to "resource library" throughout the app.
- **Dragging rows vertically now moves the whole selection, in both the Gantt table and the WBS
  table (issue #21 pt. 1, issue #26).** Dragging one row of a multi-row selection used to move
  only that row and leave the rest behind; a new `moveTasksTo` store action, built on shared
  placement helpers, now moves the entire selection together, in view order, as one undo step,
  and does nothing at all — rather than partially moving the group — if the drop target sits
  inside the dragged selection itself. The underlying single-row drag (`moveTaskTo` +
  `resolveDropTarget`) is shared between the canvas and the table so both behave identically.
- **Gantt/histogram timeline improvements (issue #21 pt. 2/3/5).** A new `compressNonWorkdays`
  setting collapses non-working days out of the timeline axis (a headless `WorkdayAxis`, shared
  by the Gantt and the histogram), so a project with long weekends or holiday blocks no longer
  wastes horizontal space on days nothing happens; horizontal dragging under compression now
  moves tasks in working days rather than calendar days. The day header shows week numbers in
  day view and, from zoom level 40 onward, the day-of-week name next to the day number.
  Ctrl/⌘+click now multi-selects task bars on the canvas (a mousedown hit-test used to reset the
  selection before the modifier key was read). The task properties panel now warns when a task
  spans a long non-working stretch (a holiday or shutdown longer than 7 calendar days), naming
  the dominant holiday.
- **The WBS/task table can now be edited like a spreadsheet (issue #26, requested by Manu
  Varkey).** One click on a cell edits it immediately with the existing value pre-selected; F2
  re-edits without replacing; arrow keys move the cursor without entering edit mode; Enter on
  the last row appends a new sibling task and moves the cursor into its name field; Tab/Shift+Tab
  indent and outdent the selection at row level while staying cell-navigation inside a cell
  (matching MS Project); rows can be dragged vertically using the same placement logic as the
  Gantt. Structural edits are blocked while the table is filtered, sorted or grouped —
  previously silently, now with a banner and a one-click reset. Fixed along the way: the
  progress cell now goes through `setTaskProgress` instead of writing the raw field directly, so
  it respects the status-date invariants and automatic actual-start behavior.
- **Reports gained page-layout controls (issue #25): adjustable font size, a repeatable header,
  and a timeline spread over multiple pages.** `reportFontScale` (90/100/110/125%) scales fonts,
  row height, header/footer and table width relative to the fixed timeline zoom, so text prints
  larger without changing how many rows fit; "repeat header on every page" (on by default) and
  "timeline over 1–8 pages" let a wide schedule print legibly instead of being squeezed onto one
  sheet. All fifteen settings on the Report tab are now persisted — previously none of them
  were, so the panel reset on every reload. A shared `tileLayout.ts` replaced pagination math
  that used to be duplicated between the raster preview and the vector PDF backend.
- **Interface font family and text size are now configurable (issue #25.4).** A
  default/system/serif/mono font choice and a 90–125% text-scale setting apply through shared
  CSS variables — including the Gantt and histogram canvas renderers, which previously
  hardcoded their font stack in up to 17 places, and 60 inline pixel font-size declarations
  across ten chrome stylesheets that didn't scale with the rest of the UI. Row height and bar
  geometry on the canvas stay fixed on purpose, so the scale setting affects text only, not
  layout, there.
- **A "you were just updated" dialog appears once after an in-app update completes.** It
  compares the previous and new version via the GitHub Releases API — install size difference,
  days since the previous release, the release description, and an OS-aware asset choice — and
  is gated to never show alongside the welcome or recovery dialogs at startup.
- **The in-app help viewer got its own language picker, independent of the UI language**, with a
  per-article English fallback and a warning banner on any language other than Dutch/English
  (those are translated less frequently). `verify:docs` grew from checking 2 to 14 languages,
  including heading/link-parity and drift checks against the English source, so a translation
  that silently drops a section or a link now fails the build.
- **Developer tooling: the browser dev server now gets the same per-worktree isolation the
  desktop dev build already had, plus a double-start guard.** `npm run dev` used to hand Vite a
  bare port and fail (or, worse, silently serve a second worktree's code into an already-open
  window) when two checkouts were active. It now runs through `scripts/dev-server.mjs`, which
  allocates a port anchored to the worktree root, claims a guard slot so a second start in the
  same worktree is refused outright instead of drifting to another port, and stamps
  `.claude/launch.json` so tooling opens the right worktree. Port allocation and the lock
  protocol (atomic rename-claim + verify + link, stress-tested with 8 concurrent stealers) are
  shared with `scripts/tauri-dev.mjs`, which was refactored onto the same helpers and passes
  `OPS_DEV_GUARDED` down so a nested `dev` start doesn't allocate twice. Only relevant when
  developing the app — no user-visible change.

### Changed
- **Startup and bundle size.** Twenty dialogs, Backstage, the tour overlay and the rarely-open
  panels (IFC, Report, AI activity, Debug Terminal) now load via `React.lazy` instead of eagerly,
  cutting the app's eager
  first-load JS by about 17% (288,723 → 239,644 bytes gzip). Translations for all but English
  now load per-language on demand instead of all 14 locales upfront, cutting eager JS by
  roughly 41% in that change alone (488,982 → 287,864 bytes gzip) with no flash of untranslated
  text, since the active locale loads before first paint. Auto-save now re-serializes only
  documents that actually changed instead of every open document on every tick (measured: 318 ms
  → 64 ms with one dirty document out of five open), and the Gantt's long-free-period scan is
  memoized instead of re-running on every store mutation.
- **Continued modularity cleanup, with byte- and pixel-identical output verified before and
  after.** The IFC writer/reader's hardcoded `IFCTASK`/`IFCTASKTIME` field layouts became shared
  slot descriptors (one source of truth instead of three); the Gantt, histogram, minimap and
  print renderers now read colors from one shared `themePalette` and share a `timeAxis` module
  instead of duplicating date-to-pixel math; and `TaskTime` was split into four typed,
  compile-time-checked roles (input/computed/analysis/tracking) so it's clear which fields a
  caller may write versus which `runCPM` overwrites. Verified with SHA-256 diffs of IFC output
  and a 10,686-call canvas draw-log comparison across 22 fixtures — zero differences.
- **Zoom-and-drag ("drag") is now the default Gantt navigation mode** (issue #22), and the
  horizontal scrollbar now spans only the chart area instead of running the full window width
  under the frozen task-name column, which was confusing since only the timeline actually
  scrolls. Anyone who had already picked a mode keeps their choice.

### Fixed
- **Dates near a month boundary could shift by a day depending on the machine's timezone.**
  `parseDate` built a UTC-midnight instant and then read it back with local getters, so under
  any negative UTC offset a date one day early was possible — invisible on a machine in Europe,
  but the regression suite dropped to 311/431 under `TZ=America/New_York`. The calendar part is
  now read textually from the ISO string instead. `tests/planning/run.sh` now re-runs the built
  suite under five timezones (UTC, New York, Midway, Auckland, Azores) on every full run so this
  class of bug can't hide again.
- **Task names or notes containing `);`, `/* */`, `ENDSEC;`, `DATA;` or an apostrophe could
  silently corrupt a saved project.** The IFC parser split on those substrings without tracking
  whether they were inside a quoted string, so ordinary Dutch text like "Fase 1 (ruwbouw); fase
  2" could truncate the parsed section or drop the wrong number of arguments — worst case, a
  duration of 7 came back as 5 on reopen, with no error. The writer had the matching bug: an
  apostrophe in a project name, author or company produced syntactically invalid STEP output.
  All three parsing sites now share one quote-aware scanner; the header writer quotes those
  three fields properly. Files written by earlier versions keep opening: because their header can
  contain that unbalanced apostrophe, the `DATA;` section boundary is located line-anchored rather
  than by scanning quote-aware from the first byte — a quote-aware scan desynchronises on such a
  header and would find no data section at all. A file with no `DATA;` boundary now raises a typed
  read error instead of quietly opening as an empty project on top of the original file's path.
- **Three compounding bugs in crash recovery could silently lose an entire relationship
  network, or let one instance overwrite another's recovered work.** Auto-save wrote recovery
  snapshots non-atomically and the reader had no truncation check, so an interrupted write
  (crash mid-save) could leave a complete-looking project with all its tasks but none of its
  dependencies — no error, and the broken snapshot was then deleted after "recovering" it;
  snapshots are now written to a temp file and atomically renamed, and a truncated or non-STEP
  file is now rejected with a typed error. Baselines were separately dropped during recovery
  because the recovery input builder enumerated fields by hand and missed two of them. And two
  app windows (or two duplicated browser tabs) sharing the same recovery storage would overwrite
  and delete each other's snapshots; recovery bookkeeping is now scoped per installation/session,
  with a single-instance guard for the desktop build (skipped for concurrent dev instances) and
  a per-tab Web Lock in the browser.
- **Exporting to CSV/MS Project/Primavera P6 could silently ship dates from a stale,
  un-recalculated schedule.** Automatic recalculation is off by default and mutations only
  flagged the schedule as stale via a small status-bar note; every exporter wrote
  `task.time.earlyStart` regardless. Export now recomputes a stale schedule first and refuses to
  export if that recompute hits a dependency cycle, on both the ribbon export path and the
  Report tab's PDF export (which has no Gantt canvas mounted, so the existing cycle warning
  never reached it there).
- **Save and recovery failures used to fail completely silently, and the unsaved-changes
  indicator could lie.** The only user-facing feedback channel was a local toast inside the
  Gantt canvas, invisible from Backstage, the table or the report panel — exactly where an
  export or save is triggered. A new store-driven notification channel (errors stick, info fades
  after 5s, repeats within a channel collapse into one with a counter) now surfaces all eight
  previously-silent failure points, including `saveFile`, which had no try/catch at all.
  Separately, `isDirty` was being cleared based on when a save *started*, not what was actually
  on disk when a slow native save dialog finally returned — anything typed in between was marked
  as saved while sitting in no file at all; it's now compared against the actual serialized
  content.
- **A release could ship, get signed, and auto-update everyone's installation even with a
  failing test suite.** `ci.yml`'s four gates (typecheck, planning suite, `verify:examples`,
  `verify:docs`) only ran on pushes/PRs to `main` — a release tag matched neither, and
  `live.yml`'s production deploy had no gate at all. Both workflows now run the same blocking
  gate before creating a release or deploying; `release.yml` additionally checks the tag against
  `package.json`/`tauri.conf.json` so a forgotten `npm run bump` can't ship a version the
  auto-updater silently treats as unchanged; and `snap.yml` now triggers on `workflow_run` after
  the release workflow instead of on tag push (which GitHub-token-created tags never fire),
  fixing v2026.7.12 shipping without a Snap asset. Separately, `scripts/` and `tests/` (about 19k
  lines) were never typechecked — they run through esbuild, which strips types without checking
  them — so a case file with nonsense keys or an `expect: {}` could pass silently; a new
  `tsconfig.tests.json` closes that gate and is now part of both CI and the release checks.
- **Two independent hardening fixes.** An extension's SVG icon was rendered as raw HTML in
  three places, including the extensions list — which runs before a user ever enables an
  extension, so a disabled extension's icon alone could execute script; icons are now parsed and
  rebuilt through a strict allowlist that strips event handlers, `href`, inline `style` and
  script-capable elements. And the Rust shell's unused `read_file`/`write_file` commands, which
  did no path validation and bypassed the `plugin-fs` scope, were removed entirely — unused by
  the frontend, but reachable from extension code via `window.__TAURI_INTERNALS__.invoke(...)`.
  Separately, `postcss` was bumped 8.5.15 → 8.5.18 for GHSA-r28c-9q8g-f849 (not reachable here,
  since postcss only ever processes the app's own build-time CSS, but the patch was free).
- **Three UI clipping/overflow bugs reported by users.** The Save As/Update/Manage ribbon button
  row could cut text off mid-letter in a longer language (#29); the report panel's Company Name
  field could overflow past the panel edge because a `!w-auto` utility class overrode its
  intended `width: 100%` (#28); and the Gantt minimap's viewport indicator and canvas could
  exceed the strip's bounds when zoomed out past the project period or when the canvas hadn't
  yet stretched to fill its container (#30).
- **Four pre-existing task-structure bugs, all found while testing this release's drag and
  table work.** Outdenting a task placed it at the end of its new parent's children instead of
  directly after its former parent, contradicting a years-old interface comment; reordering a
  non-root sibling updated the tree's `childIds` but not the raw task array that WBS numbering
  and row order are actually derived from, so the WBS column could disagree with what was on
  screen; a downward drag-and-drop reorder within the same parent landed one position too far
  because the drop-target resolver and the actual move used different reference lists; and a
  corrupted `parentId` cycle from a hand-edited IFC file could hang the app in an infinite
  ancestor walk. All four now share the same placement helpers and cycle guards as the new
  multi-selection drag.
- **A stray `$` (IFC's "no value" marker) could appear as literal text in the properties
  panel.** Four optional text slots (task description, WBS code, resource/calendar description)
  used a plain quote-stripper instead of the shared null-aware helper, so an unset field
  round-tripped as the character "$" instead of nothing — visible across every task in a bundled
  showcase. Files already re-saved with the literal "$" need a one-time manual cleanup; it can't
  be told apart from an intentional "$" automatically. Also fixed: the constraint dropdown's
  "(ASAP)" suffix used to slide under the panel's collapse arrow because the two constraint
  fields were laid out side-by-side instead of stacked.
- **Undo history had no upper bound**, and each edit deep-clones the changed fields (~4.95 MB
  per snapshot at 5,000 tasks) with per-document undo/redo stacks kept for every open — even
  inactive — document, so memory scaled with edits × project size × open documents. It's now
  capped at 100 steps. Separately, a document restored from crash recovery showed no staleness
  warning even though it hadn't been recalculated (`switchDocument` never calls `runCPM`), so it
  could look like a valid, up-to-date schedule with no critical path or float actually computed;
  it's now marked stale on restore. And typing into an "actual start"/"actual finish" date field
  used to push one undo step per keystroke, since those fields go through dedicated setters that
  lacked the coalescing key the rest of the undo overhaul already had — completing that earlier
  work, they now coalesce into one step per edit.
- **Keyboard focus could escape an open dialog.** Tab/Shift+Tab had no boundary, so keyboard
  navigation could tab out into the app behind a modal. A shared `useFocusTrap` hook now keeps
  focus inside the panel, focuses the first focusable element on open, and restores focus to the
  trigger on close — applied to all 18 dialogs built on the shared `Dialog` component plus the
  two dialogs with their own overlay (Feedback, Settings).

### Documentation
- **The repository claimed LGPL-3.0 in five places (README, PLAN.md, CLAUDE.md, the wiki) but
  shipped no license file at all**, which legally defaults to all-rights-reserved and left the
  README's license badge showing "unknown". `LICENSE` (LGPL-3.0, which incorporates GPL-3.0 by
  reference) and `LICENSE.GPL` were added verbatim from gnu.org, and `package.json` now declares
  `LGPL-3.0-or-later`.
- **The GitHub wiki is now generated from the same sources as the in-app manual** instead of
  maintained separately: `scripts/publish-wiki.mjs` builds it from the English manual, the
  wiki-specific pages (Home, Features, Installation, Contributing, Extensions-Authoring) and
  this changelog, rewriting cross-links to wiki pages and stamping a "generated — don't edit"
  banner. Dry-run by default; `--push` publishes at release time.
- **The in-app manual is now available in all 14 supported languages**, not just Dutch and
  English — 25 articles translated into the remaining 12 (300 files), with domain terms (float,
  summary task, resource leveling, …) matched to each language's existing UI terminology rather
  than translated freestanding. Two new articles were added in Dutch and English: "Resource
  libraries" and "Connecting an AI assistant (MCP)".
- **README screenshots refreshed** to the current app (main Gantt view with critical path,
  progress and milestones; the Report tab's live A3 print preview; the task context menu),
  replacing outdated captures.
- **A repository-wide maintainability audit was carried out and recorded**
  (`docs/onderhoudbaarheid/`) — ten area reports plus independent critical reviews of each,
  correcting several of its own early claims (a timezone bug reproduced under
  `TZ=America/New_York` that cut the suite to 311/431, three XSS sites, a missing undo cap, a
  missing staleness guard on export) before turning into the fixes listed above.

## v2026.7.12 — 2026-07-23

### Added
- **PDF report export is now vector-based with selectable text (issue #23).** The export of the
  Gantt report, the milestone overview and the variance report previously embedded the rendered
  preview as a single raster image in the PDF file — sharpness depended on the canvas resolution
  and nothing could be selected or searched. The export now draws directly as PDF vectors
  (lines, fills and embedded, subsetted text) via `pdf-lib`, so the result stays sharp at every
  zoom level and text is selectable/searchable — exactly as expected from a "real" PDF.
  This applies to Latin, Cyrillic and Greek text (embedded with the bundled Inter font, see
  below); documents with **CJK text (Chinese/Japanese/Korean) or RTL text
  (Arabic/Persian)** are detected automatically by the export and fall back to the old
  raster export — still perfectly legible, but not selectable. Vector CJK will come later via
  an extension; vector RTL follows in a later phase. (Under the hood, RTL shaping/bidi and
  CJK harfbuzz subsetting are already in place and exposed behind a font-provider extension API.)
- **Move project…** — a feature that shifts the entire schedule to a new start date in one go,
  with a calendar-aware warning when the project end or the project duration ends up different
  than chosen (see the accompanying i18n fixes under *Fixed*).
- **Built-in benchmark tool** — reachable via Settings; measures the compute time of the
  scheduling engine (including `runCPM`) on the user's own machine, as a frame of reference for
  the performance work below. App plumbing, no IFC impact.

### Changed
- **The print/export font for reports has changed from the system font stack to the bundled
  Inter.** This belongs with the vector export above: the old preview/export measured
  text widths with whichever font the operating system happened to offer first in the stack, which
  differed per platform (and sometimes per machine). Now it is always Inter, so the layout is
  deterministic across Windows/macOS/Linux/browser. Side effect: existing exports may come out
  slightly differently on re-export — a slightly different text width can make a line wrap or
  run on, which in turn can shift the number of pages. Functionally identical, visually not
  necessarily pixel-equal to an export from before this change.
- **Project data can now be undone.** Name, description, author, company, start and end date,
  data date, progress mode, calculation options and the project-calendar choice were until now
  entirely outside undo. They are now in the snapshot and every change is an undo step, with an
  equality check in front of it so that saving-without-change does not produce an empty step. This
  immediately repaired two existing half-restore bugs: undo after deleting a calendar or saving
  the calendar library did restore the library but not the project calendar, after which the
  internal cache stayed pointed at the wrong calendar. A typed-in data date now costs one undo
  step instead of three (the date field commits on every keystroke).
- **The large example project got a second construction stream.** It showed multiple critical
  paths only thanks to the data error described under *Fixed*; with correct data there was one
  path left. Phase 7 has been expanded into a genuine parallel stream: as soon as the parking deck
  is poured, its own crew starts on the garage fit-out, which runs via the outdoor area with no
  float to the same delivery date as the towers. Bonus: the temporary construction road was
  previously torn up while the towers still had to go up — that order is now correct.
- **The IFC writer no longer writes the derived analysis properties.** The pset `OPS_Analysis`
  (interfering float, near-critical, float-path number) contained solely output of the
  scheduling calculation with no user input; all 589 tasks in the examples reproduced their
  stored values bit-exact after recalculation. That saves about 157 kB in the bundled
  examples — the web selection went from 726 to 567 kB — and roughly a fifth of every automatic
  intermediate save, which runs every 800 ms per open document. Existing files with these
  properties load unchanged; crash recovery now recalculates, just like every other load path.
- **Performance of the scheduling engine (based on the new performance audit).** Byte-identical
  results, only faster: `CalendarEngine` now computes working days numerically/arithmetically with
  an allocation-free `isWorkDay` instead of day-by-day with date strings (the audit pointed to
  this as the main culprit, effectively O(n²) on large schedules); the summary rollup uses an
  id→task `Map` instead of a linear `find` per task; and the undo snapshot is taken from the
  ordinary pre-mutation state instead of from the Immer draft.

### Fixed (minor items from the 2.10 triage, 2026-07-20)
- **The calendar warning for "Move project…" contained an empty message.** The
  warning fires on two independent symptoms — the project end shifts by a different
  number of calendar days than chosen, and/or the project duration in working days changes — but
  always named both. If only one occurred, it stated something meaningless: "the project duration
  goes from 177 to 177 working days", or the other way around "the end shifts 11 calendar days
  instead of 11". Both cases occur in practice; in a schedule without public holidays in the
  shifted window, "only the end shifts" is even the common case. Now three variants with their own
  text.
- **"Move project…" showed plurals for a single item.** The warning lines wrote
  "1 tasks have a hard Mandatory pin" and "1 external links"; the detail line turned it into
  "1 deadlines". The five count keys now use i18next pluralization in all fourteen languages.
  In the process a catch surfaced: if one plural category is missing in a language, i18next does
  **not** fall back to the `_other` of that same language but to `fallbackLng` — a Polish user
  with two items would then see English text. Every language therefore has exactly the categories
  that CLDR prescribes (Polish four, Arabic six), guarded by the new battery `check-i18n-plurals`.
  The detail line was rebuilt from one sentence with five counts to "label: count", in which the
  label does not agree with the number; zero categories now drop out instead of showing
  "0 deadlines".
- **Lag was lost in the backward hour calculation with a milestone predecessor.** In the
  finish-start relationship the boundary flags `predEndsBeginOfDay`/`succIsFinishMs` did double
  duty: alongside the finish normalization they also suppressed the lag, whereas the day
  calculation always applies the lag and lets the flags decide only about the day step. The result
  was a wrong total float and a wrong critical path in hour-based scheduling — the same schedule
  gave `tf=1` and non-critical in hour mode versus `tf=0` and critical in day mode. Forward and
  backward calculation thus contradicted each other. Five new cases in `cases-hours-relations.json`
  capture it, including a negative lag (lead) and day-parity anchors.
- **Day/hour asymmetry with a start-milestone predecessor.** The hour branch pulled the day-start
  anchor of a start milestone via `prevWorkInstant` back to the previous band end, whereas such a
  milestone has no real finish instant and the day branch actually keeps the target-date label.
  Work-equivalent, but the milestone showed a late finish on the previous working day in hour mode.
  The day side was covered nowhere — existing milestone cases asserted early but no late dates —
  and now has a parity anchor.
- **Completed tasks in the large example project appeared to overrun.** The generator wrote
  actual dates from hand-written working-day indices in which `finishDay − startDay == dur`,
  whereas the index translation counts inclusively; moreover that translation only skipped weekends
  and no public holidays, causing a task to start on Good Friday. Every completed task therefore got
  a day of apparent overrun, which in the backward calculation stacked back up to `TF=-4` on the
  start milestone. Actual dates now come from the fully-computed, calendar-aware schedule and the
  data date is derived from the planned end of the crane erection instead of from a fixed day index.
  The example now has zero tasks with negative float. Two cases in `cases-progress.json` capture the
  underlying solver behavior (completed as planned ⇒ float 0; overrun ⇒ negative float).
- **The properties panel showed a different start date than the Gantt bar.** Four surfaces
  (bar, tooltip, table, task dialog) show the computed date; the panel was the only one showing the
  raw anchor date. Measured across all 24 examples this ran up to 484 days of difference, and in the
  large example 246 of the 249 tasks diverged — the panel simply showed the project start date for
  almost every task. The field now shows the computed date and writes to the anchor only on a real
  change, with an explanatory hint in all 14 languages.
- **The contractual project dates did not survive the IFC round-trip** — the deliberately set
  project start/end date was not reliably read back on save-and-reload. Sealed and covered.
- **Ribbon dropdowns went wrong after the portal fix.** The RibbonDropdown panel (including the
  timescale) lost its width; dropdown menus such as Milestone were clipped by the ribbon itself;
  and the right-click menu fell below the window for milestones low in the task list. All three
  fixed.
- **Empty undo steps on delete actions.** `removeSequence`, `deleteTask`, `removeResource`,
  `removeCalendar` and `deleteBaseline` pushed an undo snapshot before their filter, so a call
  with an unknown id left an empty step behind.

### Documentation
- **OFL-1.1 license text vendored with the bundled Inter** (`src/services/pdf/fonts/Inter-OFL.txt`
  + explanation in `src/services/pdf/fonts/README.md`) — the Open Font License requires the
  license text to be bundled with the font; that obligation was still missing since Inter was
  vendored as a raw TTF in phase 0/1 of the vector-PDF export (issue #23).
- The guide **Reports & printing** (`gids-rapporten-printen`, nl+en) has been updated for the
  vector export: an explanation that the PDF file now stays sharp at every zoom level and contains
  selectable/searchable text, plus the CJK/RTL raster fallback.
- README provided with a badge bar (version/CI/deploy/suite/languages/license) and a
  download-counter badge; the performance & modularity audit has been recorded as a measurement
  report with a phased plan.

## v2026.7.11 — 2026-07-20

### Added
- **Opening and saving files in the browser.** The web version was until now fully usable
  except for file I/O — which sat behind a desktop check. That gap is closed:
  - **Open, save, save-as and export** (IFC, CSV, MS Project, Primavera P6) now work
    in the browser as well.
  - **Browsers with the File System Access API** — in practice the Chromium family (Chrome, Edge,
    Opera, Brave, Vivaldi, …): you open a file, edit it and save with Ctrl+S **over the same
    file**, exactly as on the desktop. The browser asks for write permission once.
  - **Browsers without that API** — currently Firefox and Safari: a clean fallback, opening via a
    file picker and saving as a download. In-place overwriting is not possible there; nor is it
    suggested.
  - The app looks at the **capability, not the browser name** (feature detection). If a
    browser rolls out the API later, in-place saving works there automatically — without a new
    version.
  - **Recent files** can be reopened in browsers with that API (the reference to the
    file is kept, not just the name). If the support is missing, the list is
    hidden instead of showing non-working items.
  - **Auto-save and crash recovery** now work in the browser too: on every change a (debounced)
    snapshot per open document is kept, and after a crash or accidental close the app offers
    to recover on startup. If you close the tab with unsaved changes, the browser
    warns first.
  - The desktop version does not change as a result: it uses the same shared layer with the
    existing file-system behavior.
- **Construction-mode toggle** — a construction-agnostic mode for use outside the construction
  context (design: `docs/superpowers/specs/2026-07-13-bouwmodus-toggle-design.md`).

### Changed
- **Large cleanup round based on a modularity audit of the entire codebase.** No
  functional changes, but structurally fewer places where the same mistake can arise again:
  one canonical document contract for per-document state (capture/restore/undo), a transaction
  helper that replaces a pattern repeated 50×, one shared load path, a pset registry that couples
  the IFC reader and writer, a declarative ribbon and settings registry, shared dialog primitives,
  a stable extension facade with a central permission table, one relationship-math module, and
  `App.tsx` reduced from 741 to 345 lines.
- **Test coverage expanded** with batteries that permanently guard the just-closed gaps:
  IFC round-trip, document contract and Gantt-float visibility.

### Fixed
- **Eight gaps through which data was lost on save have been closed.** The storage contract
  now demonstrably round-trips completely (with a new test battery that permanently enforces this).
- **Opening lost activity codes and custom fields.** All open paths now run through one shared
  load implementation, so structural data no longer silently drops out.
- **The fast save route in the browser dropped fields** (activity codes, custom fields,
  baselines, calendar library). All state→IFC routes now build their data in one place.
- **Float disappeared on horizontal scroll.** The float band was skipped together with the task
  bar as soon as that bar scrolled off the left edge, even when the band itself was still clearly
  visible.
- **Gantt dragging:** dragging the bar edge now writes the correct (inclusive working-day)
  duration, and every duration is reachable — including the initial value.
- **Non-working days were always shaded as Saturday/Sunday** instead of according to the
  project calendar; crew and deviating calendars now display correctly.
- **Crash when switching document** after a recovery action (a frozen calendar list was
  mutated). Permanently guarded with a regression test.
- **PDF export revised**: multiple pages, page orientation and a preview that matches
  the result.
- **View tab and title bar** overlapped on a narrow window; the display options now sit in a
  2×2 grid.
- **Settings**: cleaner layout, uniform checkboxes and working keyboard operation in dropdowns.
- **Security update**: `serde_with` 3.18.0 → 3.21.0 (GHSA-7gcf-g7xr-8hxj).
- **Development environment**: on a second dev server Vite watched all git worktrees along
  (could exceed the system limit for file watching), and conversely ignored all files
  when you ran the dev server from within a worktree — causing changes not to come through.

## v2026.7.10 — 2026-07-10

Completion of phase 2.10 (parts 4 and 5).

### Added
- **In-app documentation** — a built-in help viewer with complete user documentation in
  Dutch and English: a real quick-start, nine task-oriented guides (Planning & WBS, Relationships
  & constraints, Calendars & hours, Resources, Baselines, Critical path, Import/export, Reports &
  printing, Shortcuts & controls) and fifteen reference articles (R1–R15). A `verify:docs` script
  guards that the bundled content stays complete and consistent.
- **Three residential-construction showcases (SMALL / MEDIUM / LARGE)** that together use all
  app features, including advanced schema extensions and an external (cross-project) link. They
  replace the earlier ad-hoc "large" examples with an ascending series that starts small and runs
  up to a fully filled schedule.

### Fixed
- **"Export PDF" in the Report panel actually generated a PNG.** The button now delivers a
  genuine PDF file, in high resolution.
- **The progress line and the data-date line** got their correct dash pattern and thickness back
  (equal to the today line, 4/4 pattern, 2 px), after a regression in which the progress line
  fanned out and the data-date line was drawn twice.
- **False "hard pin violated" message** in a showcase removed (data fix), plus the MEDIUM
  showcase leveling corrected.
- **Small UX items**: the context-menu item "Set constraint…" on the task bar removed, an
  invisible grab zone instead of a visible 5 px drag edge on the right panel, and the
  tour can be restarted from Settings with the tour tooltip inside the window.

## v2026.7.9 — 2026-07-07

Phase 2.10 (parts 1–3): controls, shortcuts and the first-start experience.

### Added
- **Shortcut foundation** with a central registry and store helpers, plus a
  **shortcut overview dialog** (Ctrl+/). Reorder runs via Alt+arrow (Ctrl+Alt+arrow collided with
  a GNOME workspace switch), with Alt+left/right as indent/outdent aliases.
- **Context-menu expansion** across the Gantt and table, and **box selection**: a drag frame that
  selects tasks by row intersection.
- **Task notes** — a free note field per task (on request from the field).
- **First-startup experience** — a `WelcomeDialog` on the very first start, followed by a
  7-step `TourOverlay` that guides through the most important parts and ends at the feedback button.
- Further UI building blocks: a shared **ConfirmDialog** (replaces separate `window.confirm`
  calls), a relationship-type popover, a resource dock and `moveAssignment`.

### Fixed
- QA fix waves on the new controls: parent-move corruption on reorder, popover select behavior,
  Enter in dialogs, `addTask.notes`, and reveal-on-select that may only fire on a click in the left
  task list.

## v2026.7.8 — 2026-07-07

The bulk is phase 2.9; alongside that an important Windows updater hotfix.

### Added
- **Advanced CPM (phase 2.9)** — the critical-path engine has been made complete relative to
  Primavera P6 and MS Project, in both day and hour-based scheduling (design:
  `docs/superpowers/specs/2026-07-06-geavanceerde-cpm-design.md`):
  - **All constraint types in the calculation.** Alongside the existing "soft" constraints, now
    also **logic-breaking Mandatory Start/Finish pins**: a pinned task is placed unconditionally on
    its date — even if a predecessor is then not finished on time — and the resulting
    negative float is driven upstream (to the predecessors) instead of through the pin.
    A **secondary constraint** per task (P6's primary + secondary), with live validation that
    rejects impossible combinations. Constraints now work **hour-precise**: a date-with-time is
    honored to the minute on an hour calendar, a date-without-time stays day-anchored.
  - **Hammock tasks (Level of Effort).** A hammock derives its duration from the distance between
    its start driver and finish driver and **stretches automatically** when those drivers shift; it
    never counts in the critical path and puts no float pressure on its drivers.
  - **External (cross-project) links.** Refer to a task in another file via a
    **frozen anchor date** (P6 External Dates), for all four relationship types and both
    directions. The external task shows as a **ghost bar**; anchors can be **refreshed** per link
    and project-wide, and a non-loaded source gets a "stale" mark. No live two-document
    recalculation.
  - **Near-critical analysis.** A configurable threshold marks tasks with little float (an amber
    band between critical and normal; in the high-contrast theme with a block pattern). Off by
    default; when enabled the threshold is 2 working days and the display follows the duration unit
    (days or hours, fractional).
  - **Multiple critical paths / float paths.** Parallel chains are numbered (`floatPath` per
    task) via driving-logic peeling or total-float ranking, with a configurable maximum.
  - **Interfering float** — the float a task can absorb without hitting the project end
    but which shifts intermediate tasks (total float − free float), drawn and fractional.
  - **Calculation-settings block on the project.** A new project section for the calculation
    choices: lag-calendar choice, critical definition (float threshold or longest path),
    float-calculation method, open-ended-tasks-critical, near-critical threshold and float paths.
    On the project (not app-wide), so that the same file gives the same schedule everywhere.
  - **Interop.** Task constraints now also round-trip in **P6-XML and MSPDI** (previously they were
    lost on export), including the hard/secondary extension; hammocks, external links and the
    Calculation block preserve their data via custom IFC property sets.
  - **Fully backwards-compatible:** every new option defaults to exactly the existing behavior;
    documents from before 2.9 calculate and serialize byte-for-byte identically.
  - The CPM regression suite grew along to **369 hand-computed cases** (incl. FF/SF-hour and a
    completeness sweep), all existing cases unchanged green.

### Fixed
- **Windows auto-update could not unpack the installer.** The zip crate used a backend that could
  not read the NSIS updater zip; the deflate backend is now forced so that the Windows updater
  does unpack the package (updater hotfix, also merged back to main).
- **A schedule opened on "today" instead of at its own project period** (issue #16). On
  opening, fit-to-project is now applied and the view jumps to the project window; on
  selection, task bars are brought into view (reveal-on-select).
- **The Calculation section committed live** instead of via a draft — a half-filled choice could
  already take effect; it now works draft-based.
- **The Columns dialog did not let all available fields be added**; that is now possible.
- **The working-time editor stayed hidden** on some hour presets; it is now immediately visible on
  every hour preset, with an explanation at "Save as preset".

## v2026.7.7 — 2026-07-06

### Added
- **Hour-based scheduling (phase 2.8b)** — scheduling becomes hour/minute-aware, on top of the
  day-granular core of 2.8a (design: `docs/superpowers/specs/2026-07-06-uren-scheduling-design.md`):
  - **Main toggle Hour-based scheduling** (Settings, **default off**): switches on the hour/
    minute scheduling — an hour timescale, crews with working-time bands and hour-precise
    task bars. Off ⇒ the app keeps the byte-for-byte same day-granular behavior from before
    2.8b. A separate setting **"Allow mixed day/hour scheduling"** for documents that
    combine both kinds of tasks/calendars.
  - **Working-time bands per weekday** on the calendar: multiple bands per day (breaks), bands
    that run over midnight (night shift) and a full **24/7** form. Ready-made
    **crew presets** (day shift, 2 shifts, 3 shifts, night shift, 24/7) plus a
    band editor (add band, save as own preset, set per weekday, copy
    to all working days) with a live derived hours/day indicator.
  - **Hour timescale in the Gantt**: the already-present hour/quarter-hour tiers (`timelineTiers`,
    dead until now since phase 2.7) are activated as soon as a calendar has hour data.
  - **Three duration-display modes** in the settings: automatic (own unit per task),
    always days, always hours — with a warning on mixed calendars in the task table
    and three separate duration input fields (days/hours/total hours) in the task dialog.
  - **Task-bar splitting at interruptions**: configurable never/on selection/always, so that
    a task running over a break or night block can be shown visually as separate segments
    instead of as one continuous bar.
  - **Minute-precise interop**: P6-XML, MSPDI and IFC now read and write sub-day duration and
    times losslessly (previously everything was rounded to whole days); documents without
    hour data round-trip unchanged.
  - **Date fields rebuilt**: typeable day/month/year segments instead of a single
    text field, with a project-wide date-notation setting and accompanying
    calendar-dialog fixes.
  - Fully translated in all 14 languages; the CPM regression suite reached **319 hand-computed
    cases**.
  - **Deliberate limitations**: a configurable lag-calendar option (P6's "Calendar for scheduling
    Relationship Lag") is phase 2.9; sub-day resource leveling (per-hour/per-shift
    capacity buckets) stays day-bucket-based; timezone/DST-aware scheduling and
    per-row Gantt shading on deviating task calendars follow later.

### Fixed
- The band editor no longer corrupted the `hoursPerDay` of ordinary day calendars; typing over a
  filled date segment now replaces the content; in the calendar/wizard dialog Enter executes the
  primary action and Cancel reverts the changes (buffer model). The "fixed winter shutdown" toggle
  has been removed from the generator (it belongs in the public-holidays generator).

## v2026.7.6 — 2026-07-04

### Added
- **Calendar extensions (phase 2.8a)** — the calendar becomes a first-class, multiple,
  year-independent concept (design:
  `docs/superpowers/specs/2026-07-04-kalenders-design.md`):
  - **Year-independent public-holidays engine** (`src/engine/calendar/holidays.ts`): rule-based
    instead of a hard-coded 2026 list, with an Easter algorithm and substitution rules (e.g.
    King's Day on Sunday → 26 April, UK public holidays that fall on the weekend → next
    Monday). **Seven country sets**: NL, **Germany incl. all 16 Bundesländer**, Belgium,
    France (+ Alsace-Moselle), United Kingdom (EN-WLS/SCT/NIR), Austria and Switzerland.
    Liberation Day (5 May) follows the **lustrum rule**: only in years divisible by 5 is it
    generated as a public holiday (in other years optionally selectable).
  - **Construction holiday is now opt-in via the wizard choice** (none/North/Central/South), with
    **default none** — the old default calendar silently baked three weeks of construction holiday
    (region North) into every new project, which in the phase-2.5 QA made a 5-day task look like a
    "stretched bar of four weeks". The regional construction-holiday dates come from a verified data
    table per year with an approximation fallback for years outside the table.
  - **Calendar library**: the resource-calendar registry (phase 2.5) has been promoted to the
    project-wide library (`calendars: WorkCalendar[]`) that project, tasks and resources
    all refer to — one central place instead of an implicit project calendar plus a
    separate resource registry. Existing documents migrate automatically (inline project calendar
    becomes library entry "Project calendar").
  - **Task-specific calendars in the CPM**: every task can get its own calendar
    (`Task.calendarId`, fallback project calendar); the solver computes duration, float and
    constraint snaps per task in its own calendar via an engine cache. **Predecessor-
    calendar lag rule**: the lag between two tasks counts in the calendar of the *predecessor*
    (P6 default), while the successor-derived start time snaps in the calendar of the *successor*
    — forward and backward pass mirror this split exactly, so that float stays symmetric.
  - **Wizard** (`ProjectInfoDialog`): country/region dropdown (Bundesland for Germany, country part
    for the UK, canton for Switzerland), the construction-holiday choice, a fixed-winter-shutdown
    checkbox (default off) and a compact public-holidays preview with an expandable list — replaces
    the old, year-bound 3-presets dropdown.
  - **Calendar dialog as library management**: a list of all library calendars with
    active/project-default marking, new/duplicate/delete, and a new **"Generate public
    holidays…"** button that opens the same country/region/construction-holiday generator as the
    wizard — also for existing projects, not only on creation.
  - **Gantt name label on multi-day holiday blocks**: blocks wider than a few zoom pixels
    now show their name (e.g. "Construction holiday (North)") in the shading zone, so it is
    immediately visible which public holiday or vacation period is in the schedule.
  - **IFC-reader gap closed**: the work week and working hours now actually read back from
    `IFCRECURRENCEPATTERN`/`IFCTIMEPERIOD` (previously a 6- or 7-day calendar silently fell
    back to the Mon-Fri default on reload). Multiple named calendars and the
    task-calendar link round-trip via `IfcRelAssignsToControl` and a new
    OPS pset (rule-set id/construction-holiday choice).
  - **Multi-calendar and task-calendar round-trip** also in **MSPDI** (`Calendars` +
    `Task CalendarUID`, made effective) and **P6-XML** (`StandardWorkWeek`/
    `HolidayOrExceptions`, `CalendarObjectId` per activity). Loss matrix in the design doc §8.4.
  - Fully translated in all 14 languages; the test suite grew from 280 to **289 hand-computed
    cases**, all existing cases unchanged green, `verify:examples` byte-identical.
  - **Deliberate limitations**: hour/minute-based scheduling and day/night crew calendars are
    **phase 2.8b** (the data model stays day-granular — an hour calendar now has no effect on
    the solver); per-row Gantt shading on deviating task calendars follows **later** (the global
    column shading stays on the project calendar, MSP behavior); a configurable lag-calendar option
    (P6's "Calendar for scheduling Relationship Lag") is **phase 2.9** — 2.8a fixes
    predecessor calendar as an internal constant; weather/frost-dependent winter downtime is
    **phase 4** (2.8a knows only a fixed, annually recurring winter-shutdown period); the
    construction-holiday table dates are **advisory dates** (Bouwend Nederland) that become less
    precise further into the future with an approximation fallback.

### Fixed
- Eight QA findings from the 2.8a walkthrough corrected, plus the 24/7-preset labels translated in
  the remaining languages.

## v2026.7.5 — 2026-07-04

### Added
- **Views (phase 2.7)** — real, saveable views on the View ribbon tab (design:
  `docs/superpowers/specs/2026-07-04-weergaven-design.md`):
  - **Timescale repair**: the until-now dead timescale choice has been replaced by a
    working dropdown (Year/Quarter/Month/Week/Day) that maps to zoom presets; the
    displayed label is **derived** from the actual zoom level (so it can never
    desync from the drawn axis again) and the viewport recenters on the midpoint of the
    current window when switching scale.
  - **One shared visible-rows list** (`computeViewRows`) for table and Gantt: filter,
    grouping and sorting are henceforth computed in exactly one place, so that table and
    Gantt canvas can structurally no longer diverge (structural parity).
  - **Column configuration** in the task table: visibility, order and width per column,
    across builtin fields, activity codes, custom fields and a new **resource column**
    (comma-separated join via assignments, read-only in 2.7).
  - **Nested AND/OR filters** with a P6-like editor (All/Any groups, field-type-aware
    value input: text/number/date/dropdown for codes/resources), including
    "show summaries" behavior (non-matching parents of a match stay visible, dimmed).
  - **Grouping up to 2 levels** over any field (WBS, activity code, custom field, resource,
    task type) with a band header + count, and unlimited **multi-key sorting** (stable sort,
    respects the WBS hierarchy within tree mode).
  - **Structure locking outside tree mode**: indent/outdent and task dragging are
    disabled as soon as filter/group/sort is active (structure mutations are only
    well-defined in pure tree mode); value mutations (cell edits, adding,
    deleting) always remain possible.
  - **Custom layouts**: save/apply/rename/delete/manage, app-global
    (localStorage, not per document), with silent tolerance for fields that no longer
    exist in the current document.
  - **Presentation mode** (F11) via the real Fullscreen API: all chrome (title bar, ribbon,
    document tabs, status bar, properties panel) disappears, only the Gantt full-bleed
    remains; Escape or the browser/OS fullscreen closes it.
  - **Split view** within one document: two independent time windows side by side on
    the same shared rows and vertical scroll — for example a detail week next to a
    faraway milestone.
  - **Mini-map**: a light thumbnail strip of the entire schedule with a draggable
    viewport frame.
  - **Auto-calculate setting** (three surfaces: gear ⚙, Settings ribbon tab and
    backstage) plus the "Calculate" naming consolidated into one i18n key everywhere
    (ribbon, menu, properties panel).
  - Fully translated in all 14 languages; the test suite grew from 256 to **280
    hand-computed cases**, all existing cases unchanged green.
  - **Deliberate limitations**: the hour timescale waits on hour/minute scheduling (phase 2.8) —
    the data model is day-granular, an hour axis would mislead now; rollup totals per
    group band (sum duration/costs/units) follow later (phase 3.5/3.9); a split view with
    **two different documents** requires a store-singleton refactor and is deliberately
    later; layouts are app-global and do not round-trip in the IFC file
    (per-file layouts are deliberately later).

### Fixed
- QA findings 2.7: a unique Milestone label in the field catalog (was duplicated) and the
  Gantt tooltip via i18n.

## v2026.7.4 — 2026-07-04

### Added
- **Baselines & progress (phase 2.6)** — data-date-driven CPM, real
  progress tracking and unlimited baselines (design:
  `docs/superpowers/specs/2026-07-04-baselines-voortgang-design.md`):
  - **Data date** (P6 *data date*) on the project: drives the CPM forward pass —
    completed tasks are clamped to their actuals, started-not-completed
    tasks place their remaining work from the data date, and not-started tasks
    cannot start before the data date. No data date set ⇒ the behavior is
    byte-for-byte equal to before 2.6.
  - **Real progress tracking**: percent-complete, actual start and
    actual finish (the until-now dead `TaskTime` fields) with enforced
    invariants (an actual finish implies 100%, 100% implies an
    actual finish, filling in a percentage automatically sets an actual
    start, actuals may never lie after the data date). `remainingTime` is always
    derived from the percentage.
  - **Retained Logic / Progress Override** as project-wide progress mode: determines
    how the remaining work of a task that finished before its predecessor
    relates to the network logic.
  - **Out-of-sequence detection**: tasks that show progress while their predecessor
    relationship (FS/SS/FF/SF) logically contradicts it, are marked and reported as a
    warning — blocks nothing, follows the chosen progress mode.
  - **Unlimited, named baselines** (P6-style snapshots) with exactly one active;
    management via a baseline dialog (save/rename/delete/activate) in the
    Planning tab.
  - **In the Gantt**: a data-date line, a baseline overlay (thin sub-bar per
    task against the recorded baseline dates) and a progress line (MSP zigzag that
    bulges out per row to the progress position) — all three separately toggleable.
  - **Variance report** as the third report type in the Report panel: baseline vs.
    current start/end per task, delta in working days, status (on schedule/later/
    earlier/new/removed) and a project-end summary.
  - Round-trip through **IFC 4.3** (actuals in the already-existing but until-now
    unused `IfcTaskTime` slots 14-18 — spec-conform; data date/
    progress mode in `OPS_ProjectSettings`; baselines double-track via a
    lossless `OPS_Baselines` JSON plus `.BASELINE.` schedule headers for
    interop), **MSPDI** (full: Baseline0, `<StatusDate>`, actuals), **P6-XML**
    (best-effort: actuals + data date; P6 baselines are a documented
    loss) and **CSV** (new actual-start/-end columns, deliberately without
    baselines/data date). Golden rule preserved: files without 2.6 data
    round-trip bit-identically.
  - Fully translated in all 14 languages; the CPM regression suite grew from 240 to
    **256 hand-computed cases**, all existing cases unchanged green.
  - **Deliberate limitations**: no costs/work/Earned Value (SPI/CPI/BCWP) — that is
    phase 3.5; P6 baselines are not exported (best-effort, documented
    loss); setting the data date/progress mode is not undoable
    (same precedent as the project calendar — undo via clearing + recalculating).

### Fixed
- QA findings 2.6: the compact-ribbon overlap and F5/Ctrl+S from input fields.

## v2026.7.3 — 2026-07-03

### Added
- **Resources (phase 2.5)** — resource management, load, overallocation and
  automatic leveling (design: `docs/superpowers/specs/2026-07-03-resources-design.md`):
  - **Five resource types**: labor (people), equipment (cranes, machines,
    scaffolding), material (concrete, steel, wood), subcontractor and crew. Crews
    bundle other resources; every resource has a maximum capacity,
    unit and optionally its own calendar.
  - **Time-phased capacity**: the availability of a resource can change per
    period (availability steps) — e.g. three carpenters until week 10,
    five after that.
  - **Resource assignment to tasks** with units per day and six distribution curves
    (uniform, front-loaded, back-loaded, bell, and ascending and descending), so that
    the deployment is spread realistically over the task duration. Assignment is only
    possible on workable (leaf) tasks.
  - **Load and overallocation engine** in the calculation (F5 / Calculate): per
    resource the daily load is summed and compared with the capacity;
    overload is marked.
  - **Resource histogram** as a strip under the Gantt, with a shared time axis,
    capacity line, red peaks above the line, a resource picker with
    overallocation badges and drill-down tooltip; the height is adjustable and
    persistent.
  - **Automatic resource leveling and smoothing**: a serial placement
    algorithm (SGS) shifts tasks within their float to resolve overallocation,
    sorted by priority/float/start date. Leveling goes via a
    dialog with an up-front preview (shifts, new end date, remaining
    conflicts) and can be applied or cancelled with one click.
  - **Task priority** (0–1000; 1000 = do not level) drives which tasks get
    precedence under scarcity.
  - **Resources ribbon tab** with a management panel (resources + capacity steps +
    calendar link), an assignments section in the task properties panel, the
    histogram strip and the leveling dialog.
  - Round-trip through **IFC 4.3** (incl. `IfcCrewResource`, `OPS_Resource`/
    `OPS_Assignments`/`OPS_Leveling` psets, an `IfcWorkCalendar` per resource and
    `IfcTask.Priority`) and import/export via **Primavera P6-XML** and **MS Project
    MSPDI** — resources, assignments, curves and resource calendars travel along.
    Golden rule: files without resources stay bit-identical.
  - Fully translated in all 14 languages; the CPM regression suite grew from 202 to
    **231 hand-computed cases** (incl. leveling and smoothing scenarios), all
    existing cases unchanged green.
- **Example projects in Backstage** — a new section **File → Examples**
  exposes the bundled example schedules (cards with name, description and
  tags). Clicking opens the example in a new tab (no source file, so
  saving becomes save-as). The list is data-driven via
  `public/examples/manifest.json`, so new examples come
  in without a code change. Works in the web and desktop build. The section now shows two groups:
  the three **showcase schedules** at the top (badge "All features"), below them the
  **simple examples** (manifest field `category`).
- **Example generator rebuilt (`npm run gen:examples`)** — the examples are now
  fully built by the app itself via the real store + `runCPM()` + `writeIFC`
  (instead of a hand-rebuilt IFC writer, which had drifted). Drift between the
  examples and the app is thereby structurally impossible. New:
  - **Three showcase schedules** (residential / infra / renovation) that together use all
    app features: all four relationship types + lags/leads/%-lag/ELAPSEDTIME,
    date constraints + deadlines incl. a deliberate conflict with negative float,
    start/finish/mandatory milestones, activity codes + custom fields, all five
    resource types with crew hierarchy, resource calendars, availabilitySteps, all
    six assignment curves, an overallocation solvable with leveling and a
    pinned task (priority 1000).
  - **Year-independent dates**: projects anchor relatively ("first Monday of
    March, next year"); NL public holidays (incl. Easter derivatives) and the construction holiday
    are computed per year, so that regenerating always yields current dates.
  - **Twenty sector examples enriched** with real phase overlap (SS/FF relationships,
    leads and %-lags on the phase boundaries) and varied calendars, so that a
    realistic critical path **with float** arises (55–86% critical instead of nearly
    everything). The two old, hand-built "large" examples have been replaced
    by the showcases.
  - **Verification** (`npm run verify:examples`): every file goes through the real
    `readIFC` with asserts on counts, round-trip stability and present features.

### Changed
- **Recovery dialog in the app itself** — on startup after an unexpected
  shutdown the recovery question now appears as its own, styled React dialog
  (`RecoveryDialog`) instead of a native OS dialog. The dialog shows, per document to
  recover, the project name, the file path (if known), the number of
  tasks and the timestamp of the last auto-save snapshot. Escape defers the choice
  without cleaning up the recovery files; the auto-save is postponed until
  the choice is made, so that the snapshots are not overwritten prematurely.
  (This was desktop-only at the time; since v2026.7.11 the browser build also has recovery, via
  IndexedDB.)
- The default task priority is now an explicit value (500) instead of empty,
  so that priority weighs in predictably during leveling; an explicitly filled-in
  0 is preserved (was previously silently corrected to 500 in the MSPDI export).

### Fixed
- Product/code-review findings on the resource features: an honest leveling preview with fresh
  floats, first-class derived state and histogram refresh; validation, popover behavior, Y-scale,
  explanation and a total column in the management panel; and the resource name that was
  squeezed out in the assignment row. The IFC/P6 adapters got correct assignment keys, a
  correct P6 rate, a spec-conform `IfcTask` and units as a fraction.
- Collapsed subtasks appeared at the bottom of the table instead of staying hidden; the
  "parent task" field has been removed from the task dialog when editing.
- i18n final sweep: hundreds of translation keys in the twelve remaining languages filled in and an
  orphaned key cleaned up (incl. a German `clearLeveling` label that broke mid-word in the ribbon).

## v2026.7.2 — 2026-07-03

### Added
- **Milestones (phase 2.4)** — start/finish milestones, mandatory milestones and a
  milestone overview (design: `docs/superpowers/specs/2026-07-02-mijlpalen-design.md`):
  - **Start and finish milestones** (P6 *Start/Finish Milestone*) via a day-granular
    boundary model: a start milestone anchors on a day start, a finish milestone on a
    day end (end of working day F = start of the next working day). FS to a finish milestone lands
    on the finish day itself; an FS/SS successor of a finish milestone starts the working day after.
    `undefined` = automatic (the anchor follows the binding relationship side) — existing
    files calculate bit-equally. Golden invariant: an inserted milestone
    never shifts the chain.
  - **Mandatory (contractual) milestones**: `mandatory` flag with a double-diamond in the
    Gantt; date guarding via the existing 2.3 constraints (FNLT/MFO → negative float).
    The ribbon milestone button is a menu: start milestone, finish milestone or
    **inspection point** (finish milestone + task type Inspection + mandatory).
  - **Milestone overview** as the second report type in the Report panel: a table with
    kind, date, constraint/deadline date, float, mandatory and status
    (on schedule / critical / late, color-coded), printable; a summary with
    mandatory and late counters.
  - Round-trip through IFC 4.3 (`OPS_Milestone` pset; automatic writes nothing) and
    P6-XML (activity type `Start`/`Finish Milestone`, kind is preserved on import).
  - Test suite grown from 176 to **202 hand-computed cases** (battery
    `cases-milestone-kinds.json`), all existing cases unchanged green.
- **Indent/outdent of tasks** (MSP convention): Alt+Shift+→/← and buttons in
  Planning → Structure; indenting makes a task a child of its preceding sibling,
  outdenting makes it a sibling after its parent — subtrees ride along, WBS auto-numbering
  renumbers and it is one undo step.
- **Resizable task table** in the Gantt: drag the divider line (150–800 px,
  persistent); replaces the fixed width of 350 px.
- **Compact ribbon mode**: a small arrow at the bottom right of the ribbon
  (Word-web style) collapses the ribbon to a single row of 40 px instead of 94 px —
  for small screens; the state is remembered.

### Changed
- The milestone checkbox in the properties panel now sets the duration to 0 and disables the
  duration field; the tables consistently show duration 0 for milestones (was: silent divergence).
- New milestones no longer get the task type Inspection by default
  (that is now reserved for the inspection point).

### Fixed
- **In-app updater on .deb installations (Ubuntu/Debian)**: .deb installs got only
  manual update instructions, on the outdated assumption that the Tauri updater cannot replace .deb
  in-place. The updater plugin (≥2.6; we run 2.10.1) does do that —
  it matches the `linux-x86_64-deb` entry in `latest.json` via the bundle-type stamp in
  the binary and installs via pkexec/sudo + `dpkg -i`. The update dialog on .deb
  now shows the normal "Download and install" button; the manual copy-paste command and
  the download-page button remain as a fallback when the installation fails.
- **Windows auto-update broke due to a draft URL in `latest.json`**: the re-sign step in
  `release.yml` took over the download URL from the GitHub API while the release was still draft,
  causing the `windows-x86_64(-nsis)` entries to point to an `untagged-…` URL that
  404s after publication (as happened in v2026.7.1). The workflow now builds the stable
  `releases/latest/download/` URL itself from the asset name; the `latest.json` of release
  v2026.7.1 was repaired in place (all URLs verified 200, signatures unchanged).
- **Sharp app icon on Linux**: the runtime window icon was 32×32 (first PNG in
  `bundle.icon`), causing docks to show an upscaled blurry icon. `icon.png` (512 px)
  is now at the front, 256×256/512×512 fill the hicolor slots in the `.deb`/snap and all
  sizes have been regenerated from the 1024px vector source (incl. `snap/gui/icon.png`).

## v2026.7.1 — 2026-07-02

### Added
- **Constraints & deadlines (phase 2.3)** — date constraints, deadlines and negative float
  (design: `docs/superpowers/specs/2026-07-02-constraints-deadlines-design.md`):
  - **All 8 date constraints in CPM** (ASAP, ALAP, SNET, SNLT, FNET, FNLT, MSO, MFO) with
    **P6 soft semantics**: constraints never break the network logic — early-side types are
    lower bounds in the forward pass, late-side types upper bounds in the backward pass;
    MSO/MFO work as P6's *Start On*/*Finish On* (both bounds at once); ALAP shifts to
    zero-free-float (P6 model, and the relationship then becomes correctly driving). Constraint
    dates snap to working days. The logic-breaking Mandatory pin is deliberately §2.9.
  - **Deadline per task** (MSP model, soft): bounds only the late finish — bars never
    move; float is measured up to the deadline and negative on overrun.
  - **Negative float**: total float is now drawn (min of start and finish float,
    MSP-safe) and `critical = float ≤ 0`; missed deadlines and violated constraints
    propagate negative float through the predecessor chain (DCMA checks 5/7 as a frame).
  - **Indicators**: constraint pin on the bar edge (blue = early-side, violet = late-side,
    red = violated), deadline arrow on the deadline date (green/red), P6 asterisk after
    the date in the table, negative float red in the float column and warning counters in the
    status bar.
  - Round-trip via `OPS_Constraints` pset (IfcTaskTime has no constraint slots);
    test suite 159 → **176 hand-computed cases**.
- Dependabot alert #12 (glib `VariantStrIter`, RUSTSEC-2024-0429) assessed and dismissed
  as *not used*: the API is used by neither the app nor Tauri's gtk3 path and the fix (glib 0.20)
  requires GTK4 bindings that Tauri 2 does not use — revisit on a Tauri migration.

## v2026.7.0 — 2026-07-02

### Added
- **WBS & structure (phase 2.2)** — the structure layer at a professional level
  (design: `docs/superpowers/specs/2026-07-02-wbs-structuur-design.md`):
  - **Automatic WBS numbering** (1.2.3.4 from the tree position): new projects
    number live on every structure mutation (on/off via Planning → Structure);
    existing files keep their free codes (MSP model) with an explicit
    **Renumber WBS** action. New tasks also get a derived
    code without auto, and pasting renumbers the pasted branch (no more code duplicates).
  - **Activity codes** (P6 model): project-bound code types (e.g. Location,
    Discipline) with values (code + description + color), max one value per
    type per task; management via the new dialog *Codes & fields*, assignment in
    the properties panel and as table columns.
  - **Custom fields**: typed user fields (text/number/integer/
    cost/date/yes-no) per task, visible as table columns.
  - **Multiple WBS breakdowns**: View → *Group by* shows table and Gantt as
    bands per code value (color strip + label, P6 Group & Sort style) — the
    industry standard for location × discipline without a second saved tree.
  - **WBS templates** (Asta task-pools style): right-click on a summary task
    → *Save branch as template* (tasks + internal relationships incl. lag); inserting and
    managing via Planning → Structure → *Templates*. App-level (localStorage).
  - **IFC 4.3 round-trip** for all of this: definitions as `IfcPropertySetTemplate`
    (+ `IfcPropertyEnumeration` for code types, declared via `IfcRelDeclares`),
    values per task as `OPS_CustomFields`/`OPS_ActivityCodes` psets with
    typed values, project flag in `OPS_ProjectSettings`; lossless
    meta-JSON for own files and template fallback for third-party files.
  - Copy/paste of WBS branches already existed; the new fields ride along and
    pasting now also preserves `lagUnit`/`lagPercent` of internal relationships (fix).
- **Full dependencies (phase 2.1)** — the relationship model has been brought to the level of
  professional planners (design:
  `docs/superpowers/specs/2026-07-02-volledige-dependencies-design.md`):
  - **Lag unit per relationship**: working days (default) or **calendar days** (24/7, e.g. curing
    of concrete) — IFC-conform as `IfcTaskDurationEnum` (`WORKTIME`/`ELAPSEDTIME`); notation `2d`
    vs. `3ed` in editors, CSV and MSPDI (LagFormat 8).
  - **Percentage lag** (e.g. `SS+50%`, MS Project semantics): percentage of the duration of the
    predecessor, re-evaluated on every CPM run; round-trips via IFC (`IfcRatioMeasure`)
    and MSPDI (LagFormat 19/20); P6 export bakes out to fixed hours (with a log message).
  - **Negative lag (lead) rounded**: the clamp on the project start remains (P6/MSP-conform) but a
    **truncated lead** is now marked, as is a lead larger than the predecessor duration;
    leads serialize ISO-8601-conform (`-P2D`) and the swapped `IfcLagTime` attributes
    (LagValue ↔ DurationType) have been corrected — old files remain readable.
  - **Driving/non-driving relationships** (P6 definition: relationship free float = 0, ties
    allowed): solid vs. dashed arrows in the Gantt (red = critical driving line),
    ⚡ indicator in the properties panel and the relationship table.
  - **Relationship table** — new ribbon tab *Relationships*: all relationships in one sortable,
    inline editable table (predecessor, type, lag, successor, driving, free float per relationship,
    warnings) + "new relationship from selection"; the Manage button on the Planning tab opens it.
  - **Path tracing** (MSP Task Path style): trace buttons (predecessors/successors) on the
    Planning and Relationships tab + context menu "Trace path" — transitive predecessors gold,
    successors purple (driving chains darker), the rest dimmed; Escape stops.
  - Relationships are now also **editable** in the properties panel (type + lag notation
    `2d/3ed/50%/-25e%`); new store action `updateSequence` with undo.
  - Test suite expanded: 129 → **159 cases** (new batteries `cases-lag-advanced.json` and
    `cases-driving.json`; harness knows `lagUnit`/`lagPercent`/`drivingSet`/`truncatedLeadSet`).

### Fixed
- **The manual `.deb` install command in the update dialog** accidentally also matched the
  `amd64.deb.sig` asset, causing `$url` to contain two URLs and `curl` to fail with
  "URL rejected: Malformed input to a URL function". The grep now matches on the closing quote.

## v2026.6.1 — 2026-06-29

### Added
- **In-app feedback button → GitHub issue** with an optional screenshot and a full-screen
  annotation editor (inline text tool, OK confirmation before anything goes to GitHub). The
  feedback button got a rotating label to make it more visible.
- **Working snap packaging** — `snap/snapcraft.yaml` (core22, strict confinement,
  gnome extension) that repackages the release `.deb`, plus a restored `snap.yml` workflow that
  triggers on tag push and `workflow_dispatch`, downloads the release deb instead of rebuilding the
  app, attaches the `.snap` as a release asset and publishes to the Snap Store once
  the store credential exists.
- **Auto-save on every change** — the recovery snapshot is henceforth written on every mutation
  (debounced) instead of at fixed moments.

### Fixed
- **CPM correctness** — seven verified issues from a new planning-correctness test plan:
  CPM relationships, lag/lead, milestones and free float are now correct, the `scheduleStart` drift
  on recalculation is gone, and a review round sealed the IFC lead, WBS late rollup and various
  hang/robustness cases.
- The canvas context menu now also closes on a click-outside (not only on Escape); the
  clipboard image in the feedback tool is built via `Image.new(rgba,w,h)` instead of from
  raw bytes; and the auto-assign workflow got the `issues:write` permission.

### Documentation
- Test plan and findings for planning correctness (CPM/relationships/milestones/calendar) recorded,
  and the design + the to-do for working snap packaging.

## v2026.6.0 — 2026-06-24

A large leap of ~146 commits that took the app from a prototype to a genuinely extensible,
self-updating product (highlights).

### Added
- **Cross-platform in-app auto-update** (Tauri updater) on Windows, macOS and Linux — the
  flagship of this release. The app checks silently on startup against the GitHub-release
  `latest.json`, verified with a minisign pubkey; macOS got an `app` target and Windows
  a re-sign step so that the updater can install the package.
- **Extension system** (modeled on Open Calc Studio) — an extension is a ZIP or loose
  `.js` file (`manifest.json` + `main.js`) that registers importers and ribbon buttons.
  Loader with IndexedDB storage and a `new Function` sandbox, a scoped host API with
  permission checks and event bus, host events (`host:project-loaded`/`-new`/`schedule-calculated`),
  a real host SDK via `require('open-planner-studio')`, management via Backstage → Extensions /
  Import, an example extension and a public catalog repo.
- **Multi-document** — `documentSlice` keeps track of multiple opened projects (active at
  top-level, inactive as a payload snapshot); three switch styles (horizontal tabs /
  project rail / title-bar pill) with a shared project-overview overlay, per-document view/
  undo/selection/dirty, shared clipboard, `Ctrl/⌘ 1–9`, multi-document recovery and a 3-way
  close confirmation (Save / Don't save / Cancel).
- **New-project wizard** (`ProjectInfoDialog`) with name/client/start date, a
  calendar preset and a phasing template — with this **Phase 1 is complete**.
- **Copy/paste tasks** (Ctrl+C / Ctrl+V) including subtasks and internal relationships.
- **CAD-style zoom**: cursor-anchored zooming with a tier-driven timescale header,
  week-start awareness and shortcuts (+/−/0/Ctrl+0 fit-to-project).
- **Debug terminal** overlay, a shared **settings unification** across three surfaces, a
  reusable themed **Select** dropdown, a work-calendar dialog, a **self-test harness**
  (Tier 1 Playwright + `window.__OPS__`, Tier 2 `ops-test` channel), Linux desktop-icon metadata
  and per-worktree isolation of port and recovery file so that multiple desktop builds can
  run at once.

### Changed
- **Modern UI overhaul** — a cool "Soft-Depth" look across all surfaces (Phase 1 cool
  tokens, shadow/radius, AA control edge and fonts; Phase 2 across the whole app), on top of an
  OpenAEC stylebook alignment (fonts + tokens, theme reduction from 7 to 3 with migration).
- **Store architecture** — the monolithic Zustand store has been split into ten slices
  (`src/state/slices/`); `appStore.ts` is now a composition root. No behavior change.
- **Performance** — O(n³)/O(n²) lookups in IFC nesting and the drawing of Gantt arrows
  eliminated; `isTauri()` centralized in `src/utils/platform.ts`; CI to Node 24-compatible
  Actions versions; eleven of twelve Dependabot vulnerabilities patched.

### Fixed
- **Scheduler** — the critical path is now correct (no more phantom float on predecessors) and
  `runCPM` can no longer freeze or crash on odd/invalid data.
- **Light-mode contrast** improved (deeper tint, visible edges/lines, bright amber, WCAG AA).
- **Extension robustness**: `minAppVersion` is enforced, the own ZIP parser reads sizes from
  the central directory, and a failed activation cleanly cleans up its UI registrations;
  `removeResource`/`unassignResource` clean up orphaned ids; XML-import detection more robust
  (P6 before MS Project; unknown format throws).
- Various: the update-dialog grep accidentally matched the `.sig` asset, the file extension is
  ensured on save (Linux/GTK), STEP entities are terminated with `;` (invalid IFC output
  fixed, incl. the example generator), the default end date follows the duration and theme names
  are translated in the theme picker.

### Documentation
- `CLAUDE.md` added/updated (architecture, multi-worktree dev setup, i18n/settings/
  Rust facts), the README architecture corrected, a to-do list and this changelog document
  set up, the UI-overhaul spec and the self-test-harness documentation recorded, and `read_file`/
  `write_file` in the Rust backend documented as a deliberate escape hatch.

## v2026.2.0 — 2026-02-23

First public release (seed). This is one squashed initial commit plus a handful of
follow-ups; the granular history behind it is missing.

### Added
- **The core of Open Planner Studio** — a construction-planning application with **Gantt charts**
  (imperative on canvas), a **CPM scheduler** with a calendar engine and the **native IFC 4.3
  file format** (reading and writing via `ifcReader`/`ifcWriter`, no separate project format).
  Around the Gantt: a **ribbon** UI, an Excel-like **table editor**, an **IFC code editor**,
  a **report panel** with an inline live print preview, draggable task bars, collapsible
  WBS chapters and a right-click context menu.
- **Multilingual with 14 languages** (i18next + OS-locale detection), a **Settings dialog**, a
  **4-theme system** (Dark, Light, Blue, High Contrast) with CSS variables from which the
  canvas renderer also reads its colors, and a **custom title bar** with working window buttons.
- CalVer versioning (`YYYY.M.B`), two bundled example IFC schedules and the
  release/CI plumbing (bundling, Azure Trusted Signing for the Windows installer).
