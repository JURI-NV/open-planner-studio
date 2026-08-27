# CLAUDE-JURI.md

Aanvulling op CLAUDE.md voor de JURI-fork. Lees beide.

## Wat we hier doen
Open Planner Studio omvormen tot een webapplicatie met centrale opslag, versiebeheer en
opmerkingen. We bouwen GEEN planningsengine, Gantt-renderer, .mpp-lezer of rapportagemodule —
die bestaan en zijn beter dan wat we zelf zouden maken.

## Vijf harde regels
1. Nieuwe domeindata moet round-trippen door `src/services/ifc/`, met een testcase in
   `tests/planning/`. Zo niet, dan is de data weg na opslaan en heropenen. Dit is de meest
   voorkomende manier waarop hier een feature stil kapot gaat.
2. Bestands- en netwerk-I/O gaat via `src/services/fileAccess/`. Nooit een nieuw Rust-command.
3. Alles wat `@tauri-apps/*` aanraakt: dynamische import binnen een `isTauri()`-tak. Een
   top-level import breekt de webbuild, en de webbuild is ons doel.
4. Geen nieuwe structurele verantwoordelijkheid aan `TableEditor`. Expliciete architectuurgrens.
5. De Gantt is Canvas 2D, geen DOM. Visueel gedrag wijzigen = `src/engine/renderer/`.
   `npm run verify:gantt-boundaries` handhaaft dit.

## Twee regels over de fork
6. Nieuwe code in nieuwe bestanden waar het kan. Elke gewijzigde upstream-regel is werk bij elke
   volgende merge. Kun je het niet vermijden, zet dan in de commitmessage waarom.
7. Upstream blijft een remote. We volgen releases; we takken niet permanent af.

## Testen
`npm run verify` is de poort. Beoordeel op de EXITCODE, nooit op de laatste regels output — de
planningssuite print "alles groen" ook bij exit 1 als het bundelen faalt. Bij planningscode:
`npm run test:planning` na elke wijziging.

## Werkvorm
Eerst een plan, getoetst aan de regels hierboven. Dan bouwen. Alleen wat in de taak staat —
geen aangrenzende verbeteringen.
