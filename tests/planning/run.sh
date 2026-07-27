#!/usr/bin/env bash
# Planning-CPM-regressietests — draait alle testbatterijen tegen de ECHTE Zustand-store +
# CPM-rekenmotor (headless, via esbuild-bundel). Geen testrunner-dependency nodig; gebruikt
# de esbuild die al met Vite meekomt.
#
#   bash tests/planning/run.sh            # alle batterijen
#   bash tests/planning/run.sh cases-relations.json   # één batterij
#
# Exit 0 = alles groen, exit 1 = minstens één afwijking.
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$DIR/../.." && pwd)"
OUT="$DIR/.harness.mjs"

# Elke gebouwde bundel wordt hier bijgehouden voor de tijdzone-matrix onderaan. Expliciet
# bijhouden i.p.v. een glob op "$DIR"/.*.mjs, want zo'n glob pakt ook verouderde artefacten
# van inmiddels verwijderde checks op (die daarna eeuwig blijven meedraaien).
BUNDLES=()

"$ROOT/node_modules/.bin/esbuild" "$DIR/harness.ts" \
  --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
  --define:import.meta.env.DEV=false \
  --define:import.meta.env.PROD=true \
  --define:import.meta.env.MODE='"production"' \
  --define:__OPS_DEV_INSTANCE__='"test"' \
  --outfile="$OUT" >/dev/null 2>&1

if [ "$#" -gt 0 ]; then
  FILES=()
  for f in "$@"; do FILES+=("$DIR/$f"); done
  RUN_HOLIDAYS=0
else
  FILES=("$DIR"/cases-*.json)
  RUN_HOLIDAYS=1   # volledige run: ook de holiday-generator-checks (fase 2.8a, §10.2)
fi

STATUS=0

# Holiday-generator-checks (feestdagen-engine, los van de CPM-cases).
if [ "$RUN_HOLIDAYS" -eq 1 ]; then
  CHECK="$DIR/.holidays-check.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-holidays.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$CHECK" >/dev/null 2>&1
  BUNDLES+=("$CHECK")
  node "$CHECK" || STATUS=1

  # Datetime-substraat + duur-parser-checks (fase 2.8b golf 0, §8 — los van de CPM-cases).
  DTCHECK="$DIR/.datetime-check.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-datetime.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$DTCHECK" >/dev/null 2>&1
  BUNDLES+=("$DTCHECK")
  node "$DTCHECK" || STATUS=1

  # "Je bent net geüpdatet"-vergelijklogica (releaseInfo.ts — pure functies, los van de CPM-cases).
  JUCHECK="$DIR/.just-updated-check.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-just-updated.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$JUCHECK" >/dev/null 2>&1
  BUNDLES+=("$JUCHECK")
  node "$JUCHECK" || STATUS=1

  # CalendarEngine uur-modus-checks (fase 2.8b golf 1, §4/§9 — engine-primitieven, los van de CPM-cases).
  CHCHECK="$DIR/.calendar-hours-check.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-calendar-hours.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$CHCHECK" >/dev/null 2>&1
  BUNDLES+=("$CHCHECK")
  node "$CHCHECK" || STATUS=1

  # Adapter-uur-precisie-checks (fase 2.8b golf 4, §7 — IFC/P6/MSPDI uur-round-trip + dag-discriminator).
  ADCHECK="$DIR/.adapters-hours-check.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-adapters-hours.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$ADCHECK" >/dev/null 2>&1
  BUNDLES+=("$ADCHECK")
  node "$ADCHECK" || STATUS=1

  # Geavanceerde-CPM golf-0-checks (fase 2.9 — datamodel + plumbing default-inert, los van de CPM-cases).
  ACPMCHECK="$DIR/.advanced-cpm-check.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-advanced-cpm.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$ACPMCHECK" >/dev/null 2>&1
  BUNDLES+=("$ACPMCHECK")
  node "$ACPMCHECK" || STATUS=1

  # moveAssignment-checks (fase 2.10, golf D, item 4 — headless tegen de echte store, guards +
  # resourceIds-boekhouding, los van de CPM-cases).
  MACHECK="$DIR/.move-assignment-check.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-move-assignment.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$MACHECK" >/dev/null 2>&1
  BUNDLES+=("$MACHECK")
  node "$MACHECK" || STATUS=1

  # "Project verplaatsen"-checks (pakket D1 — veld-voor-veld shift-verdicten, R7-feestdagendekking,
  # preview-zuiverheid en de R8/R9-guards; headless tegen de echte store + pure engine-helpers,
  # los van de CPM-cases in cases-move-project.json).
  MPCHECK="$DIR/.move-project-check.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-move-project.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$MPCHECK" >/dev/null 2>&1
  BUNDLES+=("$MPCHECK")
  node "$MPCHECK" || STATUS=1

  # moveTask-cykelguard + addTask.notes-checks (fase 2.10 onderdeel 2, QA-fixes P1/4 — headless
  # tegen de echte store, los van de CPM-cases).
  MTCHECK="$DIR/.move-task-check.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-move-task.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$MTCHECK" >/dev/null 2>&1
  BUNDLES+=("$MTCHECK")
  node "$MTCHECK" || STATUS=1

  # Documentcontract-checks (audit P10, F1/F3 — key-gedreven capture/hydrate/reset, Snapshot-subset,
  # B3-regressie, recovery-round-trip; headless tegen de echte store, los van de CPM-cases).
  DCCHECK="$DIR/.document-contract-check.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-document-contract.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$DCCHECK" >/dev/null 2>&1
  BUNDLES+=("$DCCHECK")
  node "$DCCHECK" || STATUS=1

  # Gantt-cull-regressie: de speling-band mag niet verdwijnen zolang hij zichtbaar is. De cull in
  # drawTaskBar keek alleen naar de BALK-extent, terwijl de band ná de balk doorloopt — een band die
  # nog honderden pixels in beeld stond verdween daardoor mee. Draait de echte renderer met een
  # opnemende 2D-context-stub (aantoonbaar rood tegen de oude cull).
  GFCHECK="$DIR/.gantt-float-cull.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-gantt-float-cull.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$GFCHECK" >/dev/null 2>&1
  BUNDLES+=("$GFCHECK")
  node "$GFCHECK" || STATUS=1

  # Tijd-as-consolidatie (issue #21 punt 5, fase 0): geconsolideerde `timeAxis.dateToX`/`xToDate`/
  # `xToDayOffset` vs. letterlijk-gekopieerde OUDE formules (printPreview/GanttCanvas/GanttRenderer/
  # useBarDrag), plus een live-render-vergelijking van de grid-`startOffset`. Bewijst dat de
  # consolidatie geen pixel verandert (docs/superpowers/werkdagen-as-ontwerp.md §3.2).
  AXCHECK="$DIR/.axis-consolidation.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-axis-consolidation.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$AXCHECK" >/dev/null 2>&1
  BUNDLES+=("$AXCHECK")
  node "$AXCHECK" || STATUS=1

  # WorkdayAxis (issue #21 punt 5, fase 1): de nieuwe gecomprimeerde-werkdagen-as, headless en
  # nog niet aangesloten op de renderer/UI. Round-trip datum→index→datum, kleef-rechts-naadlanding
  # voor za/zo/feestdag, 5-werkdagen-span over weekend+feestdag = 5 kolommen, consistentie met
  # CalendarEngine.workDaysBetween/addWorkDays, sub-dag-fracties, lazy-groei + groei-plafond
  # (docs/superpowers/werkdagen-as-ontwerp.md §2, §8 fase 1).
  WDCHECK="$DIR/.workday-axis.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-workday-axis.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$WDCHECK" >/dev/null 2>&1
  BUNDLES+=("$WDCHECK")
  node "$WDCHECK" || STATUS=1

  # Header-datumregel onder compressie (issue #21 punt 5, vervolg): `drawTimelineHeader` gebruikte
  # nog een kalenderdag-aanname (`scrollX/zoom`) voor zijn zichtbare-bereik, die bij compressie +
  # voldoende scroll steeds verder achterliep op het werkelijk zichtbare venster — bij genoeg
  # scroll viel de tick-loop stil vóórdat hij het canvas bereikte (LEGE/zwarte datumregel). Bewijst
  # nu, over een zoom×scrollX-raster: geen stapelende labels binnen één header-rij, volle
  # canvas-dekking van de onderste rij onder compressie, en algebraïsche byte-identiek-heid van de
  # nieuwe as-index-bereiksberekening t.o.v. de oude formule zodra compressie UIT staat.
  HCCHECK="$DIR/.header-compress.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-header-compress.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$HCCHECK" >/dev/null 2>&1
  BUNDLES+=("$HCCHECK")
  node "$HCCHECK" || STATUS=1

  # i18n-pluralisatie-contract voor de telsleutels van "Project verplaatsen…". Een ontbrekende
  # plural-categorie valt bij i18next NIET terug op de _other van dezelfde taal maar op fallbackLng,
  # en zet er dus Engels neer (in het Pools al zichtbaar bij twee items). Deze check eist per taal
  # exact de categorieën die Intl.PluralRules opgeeft, en vuurt ze daarna nog echt af.
  I18NCHECK="$DIR/.i18n-plurals.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-i18n-plurals.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$I18NCHECK" >/dev/null 2>&1
  BUNDLES+=("$I18NCHECK")
  node "$I18NCHECK" || STATUS=1

  # Icoon-sanitizer (bevinding K6a): extensie-geleverde iconen worden nog steeds als inline SVG
  # gerenderd, maar uitsluitend herbouwd uit een allowlist. Deze check draait de DOM-vrije
  # beslissings- en herbouwlaag (allowlists, harde verwijderingen, waardecheck, serialisatie) tegen
  # de bekende aanvalsvectoren én tegen een legitiem lucide-achtig icoon dat intact moet blijven.
  # De parse-stap zelf valt hier buiten: Node heeft geen DOMParser (zie de kop van het script).
  SVGCHECK="$DIR/.svg-sanitizer.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-svg-sanitizer.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$SVGCHECK" >/dev/null 2>&1
  BUNDLES+=("$SVGCHECK")
  node "$SVGCHECK" || STATUS=1

  # Undo-grens + coalescing (prioriteitsitem 8). De undo-stack is begrensd op MAX_UNDO; die grens
  # maakt `undoStack.length` als coalescing-identiteit onbruikbaar (constant bij een volle stack),
  # dus die is een monotoon volgnummer geworden. Geen enkele CPM-case duwt 100+ stappen door de
  # stack, dus zonder deze batterij is beide ongedekt.
  UNDOCHECK="$DIR/.undo-bound.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-undo-bound.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$UNDOCHECK" >/dev/null 2>&1
  BUNDLES+=("$UNDOCHECK")
  node "$UNDOCHECK" || STATUS=1

  # Export-guard (bevinding K7). Exports schrijven CPM-datums naar derden; zonder guard ging een
  # verouderde planning het bestand in. De subtiele helft: na een cyclus staat `scheduleStale` al
  # op false terwijl `task.time` oud is, dus een guard op alleen die vlag exporteert stil verkeerd.
  EXPCHECK="$DIR/.export-guard.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-export-guard.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$EXPCHECK" >/dev/null 2>&1
  BUNDLES+=("$EXPCHECK")
  node "$EXPCHECK" || STATUS=1

  # IFC-round-trip-contract (fase 3, P11, bevinding A2/F2). Twee stappen:
  #  (1) COMPILE-AFDWINGING van de fixture-volledigheid — de hoofd-tsconfig sluit tests/ uit, dus een
  #      eigen tsconfig die alleen check-ifc-roundtrip.ts typecheckt (`satisfies Required<...>`); een
  #      nieuw domeinveld → compile-fout → fixture MOET bijgewerkt (zelf-uitbreidende batterij).
  #  (2) De round-trip zelf: writeIFC→readIFC veld-voor-veld + idempotentie + KNOWN_GAPS.
  node "$ROOT/node_modules/.bin/tsc" --noEmit -p "$DIR/tsconfig.roundtrip.json" || STATUS=1

  RTCHECK="$DIR/.ifc-roundtrip-check.mjs"
  "$ROOT/node_modules/.bin/esbuild" "$DIR/check-ifc-roundtrip.ts" \
    --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
    --define:import.meta.env.DEV=false \
    --define:import.meta.env.PROD=true \
    --define:import.meta.env.MODE='"production"' \
    --define:__OPS_DEV_INSTANCE__='"test"' \
    --outfile="$RTCHECK" >/dev/null 2>&1
  BUNDLES+=("$RTCHECK")
  node "$RTCHECK" || STATUS=1
fi

node "$OUT" "${FILES[@]}" || STATUS=1

# ── Tijdzone-matrix ────────────────────────────────────────────────────────────────────────
# De hele suite draaide altijd onder de tijdzone van de machine, waardoor een tijdzone-
# afhankelijke datumbug (K1: `parseDate` las een UTC-instant met lokale getters uit) onzichtbaar
# bleef op een Europese laptop maar 120 cases roodmaakte in New York. Deze matrix herdraait de
# AL GEBOUWDE bundels onder een andere TZ — bundelen is de dure stap en het artefact zelf is
# tijdzone-onafhankelijk, dus dit kost alleen de looptijd van de checks. De tsc-typecheck van
# het round-trip-contract hoort hier bewust niet bij (compile-stap, tijdzone-onafhankelijk).
#
# De set dekt de vier manieren waarop een datum kan verschuiven:
#   UTC               referentie/nulpunt (offset 0, geen DST)
#   America/New_York  negatieve offset MÉT DST — de klassieke "dag valt terug"-zone
#   Pacific/Midway    extreem negatief (UTC−11), grootste terugval
#   Pacific/Auckland  extreem positief (UTC+12/+13), grootste vooruitsprong
#   Atlantic/Azores   DST-variant die over UTC+0/−1 kantelt; op het ankerpunt 2026-06-01 van de
#                     suite staat hij op +0, dus alleen deze zone betrapt fouten die pas buiten
#                     de zomer (wintertijd = −1) zichtbaar worden.
# Alleen bij een volledige run — met een losse batterij als argument is dit onnodige looptijd.
if [ "$RUN_HOLIDAYS" -eq 1 ]; then
  echo ""
  echo "── Tijdzone-matrix (herdraait de gebouwde bundels onder andere TZ) ──"
  for TZONE in UTC America/New_York Pacific/Midway Pacific/Auckland Atlantic/Azores; do
    TZ_STATUS=0
    TZ_LOG=""
    for BUNDLE in "${BUNDLES[@]}" "$OUT"; do
      if [ "$BUNDLE" = "$OUT" ]; then
        BUNDLE_OUT="$(TZ="$TZONE" node "$OUT" "${FILES[@]}" 2>&1)" || TZ_STATUS=1
      else
        BUNDLE_OUT="$(TZ="$TZONE" node "$BUNDLE" 2>&1)" || TZ_STATUS=1
      fi
      TZ_LOG+="--- $(basename "$BUNDLE") ---"$'\n'"$BUNDLE_OUT"$'\n'
    done
    if [ "$TZ_STATUS" -eq 0 ]; then
      echo "TZ $TZONE: groen"
    else
      echo "TZ $TZONE: ROOD — volledige uitvoer volgt"
      printf '%s\n' "$TZ_LOG"
      STATUS=1
    fi
  done
fi

exit "$STATUS"
