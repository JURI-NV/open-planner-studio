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

# STATUS staat bewust HIER al (en niet pas na de argumentafhandeling): `bundle_check`
# hieronder zet hem, en die wordt al aangeroepen vóór dat punt.
STATUS=0

# Bundel één check-script met esbuild.
#
# Twee dingen die hier bewust anders zijn dan voorheen (bevinding K9b):
#  1. Alleen STDOUT wordt onderdrukt — dat is enkel esbuilds groottemelding. STDERR NIET:
#     een compilefout moet zichtbaar zijn. Voorheen ging er `2>&1` overheen, waardoor een
#     syntaxfout in één check-script een run opleverde met exitcode 1 en NUL regels uitvoer.
#     In CI (deze suite is sinds kort een blokkerende poort in release.yml en live.yml) was
#     dat een rode job met een lege log: je zag niet eens wélke check stuk was.
#  2. Mislukt het bundelen, dan breekt de suite NIET af maar loopt hij door met STATUS=1.
#     Onder `set -e` sneuvelde voorheen alles ná de kapotte check — inclusief de resterende
#     batterijen en alle 431 cases — zodat één fout de rest van het beeld verborg.
#
# Aanroepen als:  if bundle_check "$DIR/check-x.ts" "$XCHECK"; then node "$XCHECK" || STATUS=1; fi
# De `if`-vorm is nodig: een functie die 1 teruggeeft binnen een `if`-conditie triggert `set -e` niet.
bundle_check () {
  local src="$1" out="$2"
  # --log-level=error: esbuild schrijft zijn groottemelding naar STDERR (niet stdout), dus die
  # lekte mee zodra we stderr doorlieten. Dit dempt de samenvatting maar laat fouten staan.
  if ! "$ROOT/node_modules/.bin/esbuild" "$src" --log-level=error \
      --bundle --platform=node --format=esm --alias:@="$ROOT/src" \
      --define:import.meta.env.DEV=false \
      --define:import.meta.env.PROD=true \
      --define:import.meta.env.MODE='"production"' \
      --define:__OPS_DEV_INSTANCE__='"test"' \
      --outfile="$out" >/dev/null; then
    echo "XX  bundelen mislukt: $(basename "$src") — zie de esbuild-fout hierboven"
    STATUS=1
    return 1
  fi
  BUNDLES+=("$out")
  return 0
}

# De hoofd-harness draagt alle CPM-cases. Mislukt dit bundelen, dan kunnen de cases niet
# draaien; de checks hieronder wél, dus we breken niet af maar slaan alleen de case-run over.
HARNESS_OK=1
bundle_check "$DIR/harness.ts" "$OUT" || HARNESS_OK=0
# $OUT hoort niet in BUNDLES: de tijdzone-matrix draait hem apart, mét "${FILES[@]}".
if [ "$HARNESS_OK" -eq 1 ]; then unset 'BUNDLES[-1]'; fi

# ── Batterij-inventaris (bevinding K10b) ───────────────────────────────────────────────────────
# De casus-bestanden worden geglobd. Een batterij die bij een rebase/merge/verkeerde `git checkout`
# verdwijnt, verdwijnt daarmee STIL: de run blijft groen, alleen met een lager totaal — en niemand
# kent het totaal uit zijn hoofd. Daarom een EXPLICIETE lijst, in beide richtingen gecontroleerd:
# een ontbrekend bestand is rood, en een nieuw bestand dat hier niet staat óók (anders loopt de
# lijst stil achter en bewaakt hij niets meer). Nieuwe batterij ⇒ naam hieronder bijzetten.
EXPECTED_BATTERIES=(
  advanced-cpm baselines boundary calendar calibration constraints driving edge float
  hours hours-relations kalenders lag-advanced milestone-kinds milestones move-project
  probes progress relations resource-leveling resource-load view
)

check_batteries () {
  local f base b missing=() unexpected=()
  local -A want=() have=()
  for b in "${EXPECTED_BATTERIES[@]}"; do want[$b]=1; done
  for f in "$DIR"/cases-*.json; do
    base="$(basename "$f")"; base="${base#cases-}"; base="${base%.json}"
    have[$base]=1
    if [ -z "${want[$base]:-}" ]; then unexpected+=("$base"); fi
  done
  for b in "${EXPECTED_BATTERIES[@]}"; do
    if [ -z "${have[$b]:-}" ]; then missing+=("$b"); fi
  done
  if [ "${#missing[@]}" -gt 0 ]; then
    echo "XX  batterij-inventaris: ONTBREEKT ${#missing[@]} bestand(en): ${missing[*]}"
    echo "    (verwacht tests/planning/cases-<naam>.json — verdwenen bij een rebase/checkout?)"
    STATUS=1
  fi
  if [ "${#unexpected[@]}" -gt 0 ]; then
    echo "XX  batterij-inventaris: ${#unexpected[@]} batterij(en) niet in EXPECTED_BATTERIES: ${unexpected[*]}"
    echo "    (nieuwe batterij? zet de naam bij in EXPECTED_BATTERIES bovenin dit script)"
    STATUS=1
  fi
  if [ "${#missing[@]}" -eq 0 ] && [ "${#unexpected[@]}" -eq 0 ]; then
    echo "OK  batterij-inventaris: ${#EXPECTED_BATTERIES[@]}/${#EXPECTED_BATTERIES[@]} casusbestanden aanwezig"
  fi
}
check_batteries

if [ "$#" -gt 0 ]; then
  FILES=()
  for f in "$@"; do FILES+=("$DIR/$f"); done
  RUN_HOLIDAYS=0
else
  FILES=("$DIR"/cases-*.json)
  RUN_HOLIDAYS=1   # volledige run: ook de holiday-generator-checks (fase 2.8a, §10.2)
fi

# Holiday-generator-checks (feestdagen-engine, los van de CPM-cases).
if [ "$RUN_HOLIDAYS" -eq 1 ]; then
  CHECK="$DIR/.holidays-check.mjs"
  if bundle_check "$DIR/check-holidays.ts" "$CHECK"; then node "$CHECK" || STATUS=1; fi

  # Datetime-substraat + duur-parser-checks (fase 2.8b golf 0, §8 — los van de CPM-cases).
  DTCHECK="$DIR/.datetime-check.mjs"
  if bundle_check "$DIR/check-datetime.ts" "$DTCHECK"; then node "$DTCHECK" || STATUS=1; fi

  # "Je bent net geüpdatet"-vergelijklogica (releaseInfo.ts — pure functies, los van de CPM-cases).
  JUCHECK="$DIR/.just-updated-check.mjs"
  if bundle_check "$DIR/check-just-updated.ts" "$JUCHECK"; then node "$JUCHECK" || STATUS=1; fi

  # "Bestaat dit tekst-asset echt?"-poort van de in-app help (textAsset.ts — pure functies +
  # injecteerbare fetch). Zet de desktopbug vast waarbij een content-type-check ALLE help-artikelen
  # verwierp: de Tauri-webview labelt elke onbekende extensie (.md) als text/html.
  TACHECK="$DIR/.text-asset-check.mjs"
  if bundle_check "$DIR/check-text-asset.ts" "$TACHECK"; then node "$TACHECK" || STATUS=1; fi

  # CalendarEngine uur-modus-checks (fase 2.8b golf 1, §4/§9 — engine-primitieven, los van de CPM-cases).
  CHCHECK="$DIR/.calendar-hours-check.mjs"
  if bundle_check "$DIR/check-calendar-hours.ts" "$CHCHECK"; then node "$CHCHECK" || STATUS=1; fi

  # Adapter-uur-precisie-checks (fase 2.8b golf 4, §7 — IFC/P6/MSPDI uur-round-trip + dag-discriminator).
  ADCHECK="$DIR/.adapters-hours-check.mjs"
  if bundle_check "$DIR/check-adapters-hours.ts" "$ADCHECK"; then node "$ADCHECK" || STATUS=1; fi

  # Geavanceerde-CPM golf-0-checks (fase 2.9 — datamodel + plumbing default-inert, los van de CPM-cases).
  ACPMCHECK="$DIR/.advanced-cpm-check.mjs"
  if bundle_check "$DIR/check-advanced-cpm.ts" "$ACPMCHECK"; then node "$ACPMCHECK" || STATUS=1; fi

  # moveAssignment-checks (fase 2.10, golf D, item 4 — headless tegen de echte store, guards +
  # resourceIds-boekhouding, los van de CPM-cases).
  MACHECK="$DIR/.move-assignment-check.mjs"
  if bundle_check "$DIR/check-move-assignment.ts" "$MACHECK"; then node "$MACHECK" || STATUS=1; fi

  # "Project verplaatsen"-checks (pakket D1 — veld-voor-veld shift-verdicten, R7-feestdagendekking,
  # preview-zuiverheid en de R8/R9-guards; headless tegen de echte store + pure engine-helpers,
  # los van de CPM-cases in cases-move-project.json).
  MPCHECK="$DIR/.move-project-check.mjs"
  if bundle_check "$DIR/check-move-project.ts" "$MPCHECK"; then node "$MPCHECK" || STATUS=1; fi

  # moveTask-cykelguard + addTask.notes-checks (fase 2.10 onderdeel 2, QA-fixes P1/4 — headless
  # tegen de echte store, los van de CPM-cases).
  MTCHECK="$DIR/.move-task-check.mjs"
  if bundle_check "$DIR/check-move-task.ts" "$MTCHECK"; then node "$MTCHECK" || STATUS=1; fi

  # Documentcontract-checks (audit P10, F1/F3 — key-gedreven capture/hydrate/reset, Snapshot-subset,
  # B3-regressie, recovery-round-trip; headless tegen de echte store, los van de CPM-cases).
  DCCHECK="$DIR/.document-contract-check.mjs"
  if bundle_check "$DIR/check-document-contract.ts" "$DCCHECK"; then node "$DCCHECK" || STATUS=1; fi

  # Band-collapse (issue #35): "alle groepen in-/uitklappen" via de echte store-acties. De valkuil
  # is de sleutelbron: een ingeklapte band emit zijn subbanden niet, dus een route via `viewRows`
  # slaat precies de al-dichtgeklapte takken over. Aantoonbaar rood tegen die naïeve route.
  BCCHECK="$DIR/.band-collapse.mjs"
  if bundle_check "$DIR/check-band-collapse.ts" "$BCCHECK"; then node "$BCCHECK" || STATUS=1; fi

  # Gantt-cull-regressie: de speling-band mag niet verdwijnen zolang hij zichtbaar is. De cull in
  # drawTaskBar keek alleen naar de BALK-extent, terwijl de band ná de balk doorloopt — een band die
  # nog honderden pixels in beeld stond verdween daardoor mee. Draait de echte renderer met een
  # opnemende 2D-context-stub (aantoonbaar rood tegen de oude cull).
  GFCHECK="$DIR/.gantt-float-cull.mjs"
  if bundle_check "$DIR/check-gantt-float-cull.ts" "$GFCHECK"; then node "$GFCHECK" || STATUS=1; fi

  # Pijlrouting (issue #41): relatielijnen worden vóór de balken getekend, dus alles wat onder een
  # balk door loopt is onzichtbaar. De vaste elleboog `fromX+8` lag bij SS midden ín de voorganger-
  # balk en liep bij krappe/achterwaartse relaties dwars door de OPVOLGERbalk (incl. pijlkop).
  # Toetst met de echte renderer + opnemende stub dat geen enkel pijlsegment nog binnen een
  # balkrechthoek valt, over een zoom×scrollX-raster.
  ARCHECK="$DIR/.arrow-routing.mjs"
  if bundle_check "$DIR/check-arrow-routing.ts" "$ARCHECK"; then node "$ARCHECK" || STATUS=1; fi

  # Tijd-as-consolidatie (issue #21 punt 5, fase 0): geconsolideerde `timeAxis.dateToX`/`xToDate`/
  # `xToDayOffset` vs. letterlijk-gekopieerde OUDE formules (printPreview/GanttCanvas/GanttRenderer/
  # useBarDrag), plus een live-render-vergelijking van de grid-`startOffset`. Bewijst dat de
  # consolidatie geen pixel verandert (docs/superpowers/werkdagen-as-ontwerp.md §3.2).
  AXCHECK="$DIR/.axis-consolidation.mjs"
  if bundle_check "$DIR/check-axis-consolidation.ts" "$AXCHECK"; then node "$AXCHECK" || STATUS=1; fi

  # WorkdayAxis (issue #21 punt 5, fase 1): de nieuwe gecomprimeerde-werkdagen-as, headless en
  # nog niet aangesloten op de renderer/UI. Round-trip datum→index→datum, kleef-rechts-naadlanding
  # voor za/zo/feestdag, 5-werkdagen-span over weekend+feestdag = 5 kolommen, consistentie met
  # CalendarEngine.workDaysBetween/addWorkDays, sub-dag-fracties, lazy-groei + groei-plafond
  # (docs/superpowers/werkdagen-as-ontwerp.md §2, §8 fase 1).
  WDCHECK="$DIR/.workday-axis.mjs"
  if bundle_check "$DIR/check-workday-axis.ts" "$WDCHECK"; then node "$WDCHECK" || STATUS=1; fi

  # Header-datumregel onder compressie (issue #21 punt 5, vervolg): `drawTimelineHeader` gebruikte
  # nog een kalenderdag-aanname (`scrollX/zoom`) voor zijn zichtbare-bereik, die bij compressie +
  # voldoende scroll steeds verder achterliep op het werkelijk zichtbare venster — bij genoeg
  # scroll viel de tick-loop stil vóórdat hij het canvas bereikte (LEGE/zwarte datumregel). Bewijst
  # nu, over een zoom×scrollX-raster: geen stapelende labels binnen één header-rij, volle
  # canvas-dekking van de onderste rij onder compressie, en algebraïsche byte-identiek-heid van de
  # nieuwe as-index-bereiksberekening t.o.v. de oude formule zodra compressie UIT staat.
  HCCHECK="$DIR/.header-compress.mjs"
  if bundle_check "$DIR/check-header-compress.ts" "$HCCHECK"; then node "$HCCHECK" || STATUS=1; fi

  # i18n-pluralisatie-contract voor de telsleutels van "Project verplaatsen…". Een ontbrekende
  # plural-categorie valt bij i18next NIET terug op de _other van dezelfde taal maar op fallbackLng,
  # en zet er dus Engels neer (in het Pools al zichtbaar bij twee items). Deze check eist per taal
  # exact de categorieën die Intl.PluralRules opgeeft, en vuurt ze daarna nog echt af.
  I18NCHECK="$DIR/.i18n-plurals.mjs"
  if bundle_check "$DIR/check-i18n-plurals.ts" "$I18NCHECK"; then node "$I18NCHECK" || STATUS=1; fi

  # Het "vandaag"-label in de printkopstrook. Lag vóór `drawTimelineHeader` en werd daardoor in de
  # RASTER-preview weggeschilderd, terwijl het in de VECTOR-PDF (waar alle tekst boven alle vormen
  # staat) juist overleefde en pal op het dagcijfer landde — "Vand29ag". Deze check bewaakt de drie
  # eigenschappen die dat uitsluiten: getekend ná de kopstrook-overschildering, geen overlap met een
  # dagcijfer, en binnen het chartgebied — over talen × papierformaten × lettergroottes.
  TODAYCHECK="$DIR/.today-label.mjs"
  if bundle_check "$DIR/check-today-label.ts" "$TODAYCHECK"; then node "$TODAYCHECK" || STATUS=1; fi

  # Icoon-sanitizer (bevinding K6a): extensie-geleverde iconen worden nog steeds als inline SVG
  # gerenderd, maar uitsluitend herbouwd uit een allowlist. Deze check draait de DOM-vrije
  # beslissings- en herbouwlaag (allowlists, harde verwijderingen, waardecheck, serialisatie) tegen
  # de bekende aanvalsvectoren én tegen een legitiem lucide-achtig icoon dat intact moet blijven.
  # De parse-stap zelf valt hier buiten: Node heeft geen DOMParser (zie de kop van het script).
  SVGCHECK="$DIR/.svg-sanitizer.mjs"
  if bundle_check "$DIR/check-svg-sanitizer.ts" "$SVGCHECK"; then node "$SVGCHECK" || STATUS=1; fi

  # Undo-grens + coalescing (prioriteitsitem 8). De undo-stack is begrensd op MAX_UNDO; die grens
  # maakt `undoStack.length` als coalescing-identiteit onbruikbaar (constant bij een volle stack),
  # dus die is een monotoon volgnummer geworden. Geen enkele CPM-case duwt 100+ stappen door de
  # stack, dus zonder deze batterij is beide ongedekt.
  UNDOCHECK="$DIR/.undo-bound.mjs"
  if bundle_check "$DIR/check-undo-bound.ts" "$UNDOCHECK"; then node "$UNDOCHECK" || STATUS=1; fi

  # Export-guard (bevinding K7). Exports schrijven CPM-datums naar derden; zonder guard ging een
  # verouderde planning het bestand in. De subtiele helft: na een cyclus staat `scheduleStale` al
  # op false terwijl `task.time` oud is, dus een guard op alleen die vlag exporteert stil verkeerd.
  EXPCHECK="$DIR/.export-guard.mjs"
  if bundle_check "$DIR/check-export-guard.ts" "$EXPCHECK"; then node "$EXPCHECK" || STATUS=1; fi

  # STEP-string-veiligheid (bevinding K2). De parser was string-onveilig in drie lagen (sectie-split,
  # commentaar-strip, entity-regex) en de writer interpoleerde naam/auteur/bedrijf RAUW in de header.
  # `);`, `(…)` en `ENDSEC;` zijn normale plantekst; het ergste geval was een STILLE duurwijziging
  # bij opslaan+heropenen. Draait de echte keten store→writeIFC→readIFC per faalvector, plus een
  # onafhankelijke syntaxcontrole op de FILE_NAME-header.
  SSCHECK="$DIR/.step-strings.mjs"
  if bundle_check "$DIR/check-step-strings.ts" "$SSCHECK"; then node "$SSCHECK" || STATUS=1; fi

  # Recovery-integriteit (bevinding K4). `readIFC` had NUL throws: een afgekapte snapshot leverde
  # stil een gedeeltelijk hersteld document op (bij 80% afkappen: alle taken, NUL relaties — een
  # planning die compleet oogt en geen logicanetwerk heeft), waarna clearRecovery() hem opruimde.
  # Deze batterij eist dat onzin-invoer en afgekapte bestanden een IfcParseError gooien, én dat een
  # leeg-maar-geldig project (0 taken) gewoon doorparst — dat laatste borgt het INGETROKKEN
  # voorstel om snapshots op taakaantal te filteren.
  RECCHECK="$DIR/.recovery-integrity.mjs"
  if bundle_check "$DIR/check-recovery-integrity.ts" "$RECCHECK"; then node "$RECCHECK" || STATUS=1; fi

  # Recovery-isolatie tussen instanties (bevinding K5). De opruimlogica veegde op PREFIX door de
  # gedeelde appDataDir. Twee gelijktijdige vensters wisten daarmee elkaars snapshots — en omdat
  # de productie-base (`recovery`) een prefix is van elke dev-base (`recovery.<slug>`), wiste één
  # start van de productiebuild ONVOORWAARDELIJK de snapshots van alle dev-worktrees. Deze
  # batterij vuurt de pure beslissingslaag (naamherkenning + de twee opruimplanners) af tegen een
  # gemengde directorylisting; de Tauri-I/O zelf draait niet headless.
  RISOCHECK="$DIR/.recovery-isolation.mjs"
  if bundle_check "$DIR/check-recovery-isolation.ts" "$RISOCHECK"; then node "$RISOCHECK" || STATUS=1; fi

  # Meldingenkanaal (bevinding K8). De app had geen gebruikerszichtbaar foutkanaal: mislukte
  # opslag, mislukte auto-save en corrupte invoer hadden alle drie hetzelfde symptoom — niets.
  # Deze batterij bewaakt de drie eigenschappen die stil kunnen afdrijven: samenvouwen op
  # dedupeKey (de auto-save probeert het elke 10 s opnieuw), een fout die bij het aftoppen niet
  # door een info verdrongen wordt, en app-globale opslag — zit `notifications` straks per ongeluk
  # in het documentcontract, dan verdwijnt een opslaanfout bij een tabwissel of een Ctrl+Z.
  NOTIFCHECK="$DIR/.notifications.mjs"
  if bundle_check "$DIR/check-notifications.ts" "$NOTIFCHECK"; then node "$NOTIFCHECK" || STATUS=1; fi

  # IFC-round-trip-contract (fase 3, P11, bevinding A2/F2). Twee stappen:
  #  (1) COMPILE-AFDWINGING van de fixture-volledigheid — de hoofd-tsconfig sluit tests/ uit, dus een
  #      eigen tsconfig die alleen check-ifc-roundtrip.ts typecheckt (`satisfies Required<...>`); een
  #      nieuw domeinveld → compile-fout → fixture MOET bijgewerkt (zelf-uitbreidende batterij).
  #  (2) De round-trip zelf: writeIFC→readIFC veld-voor-veld + idempotentie + KNOWN_GAPS.
  node "$ROOT/node_modules/.bin/tsc" --noEmit -p "$DIR/tsconfig.roundtrip.json" || STATUS=1

  RTCHECK="$DIR/.ifc-roundtrip-check.mjs"
  if bundle_check "$DIR/check-ifc-roundtrip.ts" "$RTCHECK"; then node "$RTCHECK" || STATUS=1; fi
fi

if [ "$HARNESS_OK" -eq 1 ]; then
  node "$OUT" "${FILES[@]}" || STATUS=1
else
  echo "XX  cases overgeslagen: de harness kon niet gebundeld worden (zie de fout hierboven)"
fi

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
    # $OUT alleen meenemen als de harness gebouwd is; anders draaien we een niet-bestaand bestand.
    MATRIX=("${BUNDLES[@]}")
    [ "$HARNESS_OK" -eq 1 ] && MATRIX+=("$OUT")
    for BUNDLE in "${MATRIX[@]}"; do
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
