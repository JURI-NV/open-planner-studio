# Bijdragen aan Open Planner Studio

Fijn dat je meedoet. Deze pagina beschrijft wat je nodig hebt om een wijziging
door de poort te krijgen. Kort samengevat: **`npm run verify` moet groen zijn**,
en de rest van dit document legt uit waarom de dingen zijn zoals ze zijn.

*English: this project's working language is Dutch — code comments, commit
messages and the canonical source translations are Dutch. Issues and pull
requests in English are welcome and will be answered in English.*

## Opzetten

```bash
git clone https://github.com/OpenAEC-Foundation/open-planner-studio.git
cd open-planner-studio
npm ci            # ci, niet install — de lockfile is bindend
npm run dev       # browserversie op http://localhost:3007
npm run tauri:dev # desktopversie (Tauri 2, Rust-toolchain nodig)
```

Node 22 is wat CI draait. Voor `tauri:dev`/`tauri:build` heb je daarnaast een
Rust-toolchain nodig en op Linux de systeembibliotheken uit `ci.yml`.

Meerdere worktrees tegelijk draaien mag: `tauri:dev` kiest per worktree een eigen
poort en eigen auto-save-bestanden.

## De poort

```bash
npm run verify
```

Dat is letterlijk hetzelfde commando dat CI, de release-gate en de deploy-gate
draaien — één definitie, in `package.json`. Als het lokaal groen is, is het in CI
groen. Het omvat:

| onderdeel | wat |
|---|---|
| `npm run typecheck` | `tsc --noEmit` over `src/` én over `scripts/`+`tests/` |
| `npm test` | de vier gedragssuites (planning, library, mcp, dev-server) |
| `npm run verify:examples` | de voorbeeldprojecten in `examples/` |
| `npm run verify:docs` | de in-app documentatie, 14 talen |
| `npm run verify:i18n` | ontbrekende vertaalsleutels t.o.v. `nl` |

Losse onderdelen draaien kan ook — zie de commando-lijst boven in
[`CLAUDE.md`](CLAUDE.md). Tijdens het werk is `npm run test:planning` meestal
genoeg; draai `npm run verify` voor je pusht.

Er is **geen linter en geen formatter**. `tsc` staat op `strict` met
`noUnusedLocals`/`noUnusedParameters`, dus dode code valt vanzelf op. Volg de
stijl van de omringende code.

## Dingen die makkelijk misgaan

Vier valkuilen die vaker fout gaan dan de rest. De achtergrond staat in
[`CLAUDE.md`](CLAUDE.md); dit is de korte versie.

1. **IFC is het bestandsformaat, niet een export.** Nieuwe projectdata moet
   round-trippen door `src/services/ifc/` — anders is het weg na opslaan en
   opnieuw openen. Er is geen apart JSON-projectformaat.
2. **Planning is handmatig, niet reactief.** `runCPM` draait niet vanzelf na een
   wijziging. Roep het aan nadat je taken, relaties of de kalender muteert.
3. **De Gantt is een `<canvas>`.** Visueel gedrag zit in
   `src/engine/renderer/`, niet in React-componenten.
4. **De webbuild is productie.** Alles wat `@tauri-apps/*` aanraakt moet achter
   een `isTauri()`-check of een dynamische import — een top-level import breekt
   de browserversie, die live staat.

Zichtbare tekst gaat altijd door `t(...)`. Voeg nieuwe sleutels toe aan `nl`
(de bron) én aan de andere dertien locales; `npm run verify:i18n` controleert
dat, inclusief de CLDR-meervoudscategorieën per taal.

## Commits en pull requests

- Conventional commits met een scope: `fix(ifc): …`, `feat(ui): …`,
  `test(planning): …`, `docs(…)`, `chore(…)`, `ci(…)`.
- Commitberichten in het Nederlands, in de gebiedende wijs.
- Beschrijf in de body **waarom**, niet wat het diff al laat zien. Een regel
  over hoe je het geverifieerd hebt is meer waard dan een opsomming van
  gewijzigde bestanden.
- Eén onderwerp per pull request. Kleine PR's worden sneller gelezen.
- Vermeld in de PR hoe je het getest hebt, en welke suite je gedraaid hebt.

Raakt je wijziging planningscode? Voeg een casus toe aan `tests/planning/` —
zie [`tests/planning/README.md`](tests/planning/README.md). Voor een bugfix is
een casus die eerst rood staat de beste beschrijving van de bug.

## Documentatie

- [`CLAUDE.md`](CLAUDE.md) — de diepe architectuurgids, ook nuttig voor mensen.
- [`PLAN.md`](PLAN.md) — de roadmap.
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md) — noemenswaardige wijzigingen.
- [`docs/TODO.md`](docs/TODO.md) — wat er nog ligt; goede plek om iets te zoeken
  om aan te beginnen.
- [`docs/extensions.md`](docs/extensions.md) — extensies schrijven.

Verandert je wijziging iets aan de architectuur of aan een commando, werk dan
`CLAUDE.md` en `AGENTS.md` in dezelfde PR bij.

## Beveiliging

Meld beveiligingsproblemen **niet** via een issue. Zie
[`SECURITY.md`](SECURITY.md).

## Licentie

Deze code staat onder LGPL-3.0-or-later. Door bij te dragen ga je ermee akkoord
dat je bijdrage onder diezelfde licentie wordt uitgebracht.
