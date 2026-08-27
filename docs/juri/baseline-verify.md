# T0.1 — Baseline `npm run verify`

Fork: `JURI-NV/open-planner-studio` (upstream: `OpenAEC-Foundation/open-planner-studio`), branch
`juri/fase0-baseline`, commit at time of this run: HEAD of a fresh `git clone`.

Machine: Windows 10, Git Bash (MINGW64), Node v24.14.0, npm 11.9.0.

## Steps run

```bash
npm ci
npx playwright install --with-deps --only-shell chromium
npm run verify
```

`npm ci` and the Playwright install both completed cleanly (exit 0, 205 packages, 0
vulnerabilities; Chromium Headless Shell + ffmpeg + winldd downloaded).

## Result: `npm run verify` exit code **1** — NOT 0

Per this repo's own `CLAUDE.md` warning ("de planningssuite print 'alles groen' ook bij exit 1
wanneer het bundelen faalt — vertrouw op de exitcode, nooit op de tail"), the exit code was
captured explicitly and separately from the output:

```
npm run verify > verify-output.log 2>&1
echo "EXITCODE:$?"   # → EXITCODE:1
```

Wall-clock duration: **≈ 3 minutes** (log file birth 12:24:56, last write 12:27:58 local time).

The tail of the output is exactly the trap the warning describes: every suite prints `OK`, and the
CPM/calendar harness prints `TOTAAL: 560/560 (alles groen)` — a reader who judges by the last
lines of output would conclude success. The actual exit code is 1.

## Root cause (verbatim)

`npm run verify` runs `typecheck && lint && test && verify:examples && verify:docs && verify:i18n
&& verify:store-boundaries && verify:gantt-boundaries && verify:cycles && verify:audit`. The
top-level `typecheck` step (`tsc --noEmit && tsc --noEmit -p tsconfig.tests.json`) passed — `lint`
and `test` both started afterward, which they would not have if the `&&`-chain had stopped there.

The actual failure is inside `npm test` → `test:planning` → `bash tests/planning/run.sh`, at line
659:

```bash
node "$ROOT/node_modules/.bin/tsc" --noEmit -p "$DIR/tsconfig.check.json" || STATUS=1
```

This crashes with (captured verbatim from the log):

```
C:\GITHUB\juri-builder-evaluatie\.claude\worktrees\agent-a589dcd698c9d35a6\open-planner-studio\node_modules\.bin\tsc:2
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
          ^^^^^^^

SyntaxError: missing ) after argument list
    at wrapSafe (node:internal/modules/cjs/loader:1743:18)
    at Module._compile (node:internal/modules/cjs/loader:1786:20)
    ...
Node.js v24.14.0
```

**Diagnosis:** on Windows, `node_modules/.bin/tsc` (no extension) is npm's POSIX `#!/bin/sh` shim
(there are separate `.cmd` and `.ps1` siblings for native Windows shells). `run.sh` invokes it as
`node "$ROOT/node_modules/.bin/tsc" ...` — i.e. it feeds a **shell script** to `node` as if it were
JavaScript. Node tries to parse `basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")` as JS and
fails immediately. This reproduces on any Windows checkout run through Git Bash/MSYS (confirmed:
`uname -a` on this machine reports `MINGW64_NT-10.0-19045`), because npm always generates this
POSIX shim on Windows regardless of Node/npm version — it is not specific to this machine's Node
v24/npm 11.

`STATUS=1` from this line is what ultimately fails `run.sh`'s exit code, which propagates through
`npm test` → `npm run verify`, giving the overall exit 1 — while every check that runs *after* line
659 in the same script (which is all of them, since the script doesn't abort early) still prints
`OK`/`alles groen`, because `STATUS=1` is only consulted at the very end.

**This is not a real type error.** Running the *intended* check directly, via the actual JS
entrypoint instead of the broken shim, passes cleanly:

```bash
$ node node_modules/typescript/bin/tsc --noEmit -p tests/planning/tsconfig.check.json
$ echo $?
0
```

So the IFC-round-trip-contract compile-enforcement step itself (the thing `tests/planning/run.sh`
line 659 is trying to run) is green. The only thing broken is *how* `run.sh` invokes `tsc` on
Windows/Git-Bash — a bug in the OPS test harness itself (`tests/planning/run.sh:659`), not in JURI
code, not in the fork's own additions (there are none yet on this branch), and not a real
type-safety regression.

## What follows from this for the "Poort A" gate

Per the implementatieplan's own acceptance criterion for T0.1 ("`npm run verify` exit 0 op een
schone clone, gedocumenteerd. Faalt hij, dan is dat het eerste probleem en niet iets om omheen te
werken"): **this criterion is not met.** The exit code is 1 on this machine/OS combination. No fix
was attempted here (Fase 0 is explicitly "geen productcode", and `tests/planning/run.sh` is an
unmodified upstream file — patching it is Fase-1-or-later territory and needs its own decision,
possibly reported upstream). This needs a human decision before Fase 1: either (a) fix
`tests/planning/run.sh` line 659 to invoke `tsc` correctly on Windows (e.g. call the shim as an
executable rather than via `node`, or call `node_modules/typescript/bin/tsc` directly) and confirm
that upstream doesn't already have a fix in a newer commit, or (b) treat this as "only run
`verify` on Linux/macOS" for JURI's own workflow and document that constraint.

## Everything else in the run

Excluding the one failure above, every suite and check that ran did pass:

- `tsc --noEmit` (main + tests config): pass
- `eslint src`: pass
- `test:planning` (`tests/planning/run.sh`): every individual battery printed `OK`/`alles groen`,
  including the headline CPM/calendar harness (`TOTAAL: 560/560 (alles groen)`), across the base
  run and the full 5-zone tijdzone-matrix rerun (UTC, America/New_York, Pacific/Midway,
  Pacific/Auckland, Atlantic/Azores) — only the harness's own exit code (via the tsc-shim bug
  above) was non-zero.
- `test:library`, `test:mcp`, `test:dev-server`, `test:browser`: all reported green in the log.
- `verify:examples`, `verify:docs`, `verify:i18n`, `verify:store-boundaries`,
  `verify:gantt-boundaries`, `verify:cycles`, `verify:audit`: all reported green.

Two pre-existing, expected/benign error traces appear repeatedly in the log (part of the
`notifications`/`extintegrity` batteries' own negative-path test cases, not failures):
`Failed to open example "kapot.ifc": ... reason: 'not-step'` (a deliberately-corrupt fixture) and
`Save failed: ReferenceError: window is not defined` (a deliberate headless-environment negative
case). Both batteries that produce these traces reported `OK`.

## T0.2 status

See `docs/juri/mpp-report-status.md`.

## Final re-run (after T0.1–T0.4 deliverables were added)

Per the task's closing instruction, `npm run verify` was run once more on `juri/fase0-baseline`
after all Fase 0 deliverables were in place (`CLAUDE-JURI.md`, `scripts/juri/mpp-report.ts`,
`docs/juri/**`), again judged strictly on exit code:

```
npm run verify > verify-final.log 2>&1; echo "EXITCODE:$?"   # → EXITCODE:1
```

**Same result, same single cause.** The final log is byte-length-identical in structure to the
first run (2674 lines) and contains exactly one occurrence of `SyntaxError: missing ) after
argument list` at the same location (`tests/planning/run.sh:659`'s broken `node
node_modules/.bin/tsc` invocation, see above) — a `grep` for other error/failure patterns across
the full final log found nothing beyond that one known cause and the pre-existing benign negative-
test traces (`kapot.ifc`, `window is not defined`, ZIP-install-rejection cases) already described
above. **The new JURI files (T0.1–T0.4) introduce no additional failures** — `typecheck`, `lint`,
and every suite/check other than the Windows tsc-shim bug remained green, confirming the exit-1
cause is entirely pre-existing OPS test-harness infrastructure, not anything added on this branch.
