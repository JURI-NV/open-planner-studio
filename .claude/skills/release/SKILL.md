---
name: release
description: Use ONLY when the user explicitly invokes /release, or in their own words asks to cut, tag, or publish a release / new version of Open Planner Studio. NEVER auto-trigger from ordinary commit, push, build, or version-bump work — only on an explicit release request.
---

# Release — Open Planner Studio

## Overzicht
De **runbook** voor het uitbrengen van een nieuwe versie. Alleen draaien bij een
expliciete `/release` (of een verzoek om een release/nieuwe versie in eigen woorden).

**Kernprincipe:** een release is **onomkeerbaar en naar buiten gericht** — een `v*`-tag
triggert CI-builds, publicatie op GitHub én auto-update naar álle gebruikers. `/release`
is het startsein voor de vóórbereiding, maar de **tag-push is de enige harde akkoord-poort**:
dáár vraag je één keer expliciet bevestiging (versie + de bullets) vóór je pusht. Alles
daarvóór is omkeerbaar — bereid het compleet voor. **Vlak vóór die akkoord-poort draait verplicht
een critreview tier 2** (stap 11).

De zes eisen van de user zitten hieronder verweven: (1) volledige commit-historie sinds de
vorige release bekijken · (2) release notes = een paar bullets, geen ellenlange tekst ·
(3) die ellenlange tekst gaat in `docs/CHANGELOG.md` — **in het Engels**, de uitgebreide beschrijving
per uitgebrachte versie (élke versie, geen gaten; géén `Ongepubliceerd`-kop, geen los-vast archief) ·
(4) wiki bijwerken waar nodig —
**allebei**: in-app gidsen (`public/docs`) én de GitHub-wiki · (5) oude worktrees opruimen ·
(6) zelf aanvullen (de volledige technische procedure hieronder, incl. `CLAUDE.md` bijwerken — stap 6).

## Vaste feiten
- **Versie = CalVer** `YYYY.M.patch` (bv. `2026.7.13`); tags krijgen een `v`-prefix (`v2026.7.13`).
- `npm run bump X.Y.Z` synct `package.json` + `src-tauri/tauri.conf.json` + lockfile.
  `src-tauri/Cargo.toml` blijft **bewust `0.1.0`** — niet aanraken.
- Release gebeurt **vanaf `main`**; feature-branch eerst mergen.
- `release.yml` bouwt + signeert installers en publiceert `latest.json`; `snap.yml` verpakt de
  `.deb` tot Snap. Beide vuren op een `v*`-tag.
- **De releasetekst heeft één bron**: `docs/release-notes/vX.Y.Z.md` (alleen de bullets).
  `scripts/release-notes.mjs` maakt daar de releasepagina-markdown én de platte updater-tekst van;
  `release.yml` roept dat zelf aan. Het bestand moet dus **in de getagde commit** zitten.
- Repo `OpenAEC-Foundation/open-planner-studio`: main vereist PR's, maar Nozzit's account
  bypasst (direct pushen landt met een "Bypassed rule violations"-melding).

## Fase A — Voorbereiden (alles omkeerbaar, nog geen tag)

### 1. Historie sinds de vorige release (eis 1)
```bash
PREV=$(git tag --sort=-creatordate | grep '^v' | head -1)
git log --oneline "$PREV"..HEAD
```
Lees de **volledige** lijst door. Dit is de bron voor zowel de changelog (uitgebreid) als de
notes (paar bullets). Groepeer mentaal per rubriek: Added / Changed / Fixed / Documentation.

### 2. Kies de nieuwe versie
Meestal patch +1 binnen dezelfde maand (`2026.7.12` → `2026.7.13`); nieuwe maand → `2026.8.0`.

### 3. `docs/CHANGELOG.md` — de uitgebreide versiebeschrijving (eis 3)
De changelog bevat **uitsluitend secties van échte, uitgebrachte versies** — **géén `Ongepubliceerd`-kop**,
geen los-vast archief van elke wijziging. Het is per uitgebrachte versie de **uitgebreide beschrijving**
(de lange tegenhanger van de korte release notes uit stap 4). **Elke uitgebrachte versie hoort erin —
geen gaten.**
- **Uitvoering: aparte Sonnet-subagent.** Delegeer het schrijven aan een dedicated Sonnet-subagent
  met een dichte brief — jij levert de git-context/scope uit stap 1, de subagent schrijft de sectie,
  jij reviewt de output tegen de git-log. Niet zelf inline typen.
- **Taal: Engels.** De changelog staat bewust in het Engels (publiek/internationaal), afwijkend van de
  verder Nederlandse projecttaal. Rubrieken heten `### Added`, `### Changed`, `### Fixed`, `### Documentation`.
- **Bron = de commit-historie uit stap 1.** De git-log is de waarheid; schrijf een gecureerde
  beschrijving, geen kale commit-dump.
- Voeg **bovenaan, direct onder de intro** een nieuwe kop `## vX.Y.Z — YYYY-MM-DD` toe met de
  uitgebreide beschrijving per rubriek: welke feature/bug, wortel-oorzaak, welk bestand, waarom.
  Hier **mág** het uitgebreid. Spiegel de stijl van de bestaande entries (Engels, inhoudelijk).

### 4. Release-notes — een paar bullets in `docs/release-notes/vX.Y.Z.md` (eis 2)
Schrijf 3–6 korte bullets in **platte tekst** (geen markdown-opsmuk — ze gaan óók in de
updater-dialoog via `latest.json`, die geen markdown rendert). Geen alinea's, geen
wortel-oorzaak-verhalen: dat staat al in de changelog.

Sla ze op als **`docs/release-notes/vX.Y.Z.md`** en commit dat bestand mee met de bump (stap 10).
Dit bestand is de **enige bron** voor zowel de GitHub-releasepagina als het `notes`-veld in
`latest.json` — `release.yml` zet allebei zelf, er is ná de tag géén handwerk meer. Zet er
**alleen de bullets** in: de kop (`## What's New in vX.Y.Z`) en het Downloads-blok worden
aangebouwd door `scripts/release-notes.mjs`.

Controleer beide vormen vóór je tagt:
```bash
node scripts/release-notes.mjs vX.Y.Z --format=body    # de GitHub-releasepagina
node scripts/release-notes.mjs vX.Y.Z --format=notes   # het latest.json-notes-veld
```
- Situationeel: was de vorige updater kapot, zet **bovenaan** een korte
  handmatige-download-waarschuwing (zoals bij v2026.7.8).
- Vergeet je dit bestand, dan valt de release terug op een generieke tekst en een leeg
  `notes`-veld — precies de situatie van v2026.7.12. De `gate`-job logt daar een warning voor,
  vóór de build; lees die dus.

### 5. Docs & wiki bijwerken (eis 4 — allebei)
**Uitvoering: aparte Sonnet-subagent die de `wiki`-skill aanroept** (los van de changelog-subagent
uit stap 3 — disjuncte bestanden, mag parallel). Die skill is de volledige brief; kernmandaat:
**elke doc-claim dubbelchecken tegen de commits van deze release** en bijwerken waar de doc achterloopt.
Ze dekt beide bronnen:
- **In-app gidsen** `public/docs/<lang>/<id>.md` — docs worden **in EN + NL** geschreven/bijgewerkt
  (de brontalen); de overige locales volgen **maandelijks** in een aparte vertaalronde, niet per release.
  `verify:docs` eist **alleen `nl` + `en`** en valideert de andere talen enkel wanneer ze er zijn —
  een **nieuw** artikel in EN+NL houdt de poort dus groen, zónder stubs voor de overige talen.
- **GitHub-wiki** — een build-artefact uit repo-bronnen (`public/docs/en`, `docs/wiki/*`, changelog)
  via `scripts/publish-wiki.mjs`. Nooit de wiki direct bewerken.

Hier in **Fase A alleen voorbereiden + verifiëren** (bronnen bijwerken, `npm run publish:wiki` dry-run,
dode-link-check — alles groen). De daadwerkelijke `-- --push` = publiceren en gebeurt in **Fase B
(stap 18)**, gedekt door de akkoord-poort.

### 6. `CLAUDE.md` bijwerken
`CLAUDE.md` is de architectuur-/commando-referentie voor Claude Code zelf (niet gedekt door
`verify:docs`, dus rot stil weg als niemand 'm checkt). Loop de historie uit stap 1 langs op
wijzigingen die iets claimen dat er nu in staat: nieuwe/gewijzigde npm-scripts, nieuwe of
hernoemde `src/services/`- of `state/slices/`-modules, nieuwe Tauri-plugins/commands, gewijzigde
architectuurpatronen (bv. file-I/O-pad, IFC-roundtrip, ribbon/backstage-structuur), nieuwe i18n-
namespaces/locales, of een gewijzigde release-/CI-procedure. Werk `CLAUDE.md` bij waar het
achterloopt; laat het onaangeroerd als er niets architecturaal relevants is veranderd sinds de
vorige release. Kan gecombineerd worden met de doc-subagent uit stap 5 (zelfde soort werk,
zelfde soort dubbelcheck-tegen-de-commits), of los.

### 7. Kwaliteitspoorten (eind-poort — zelf draaien, alles groen)
```bash
npx tsc --noEmit
bash tests/planning/run.sh | tee /tmp/suite.log; echo "exit=${PIPESTATUS[0]}"
grep "^XX" /tmp/suite.log || echo "geen XX-falers"
npm run build
npm run verify:examples
npm run verify:docs
```
De suite print "alles groen" **óók bij exit 1** — vertrouw op **exitcode + `grep ^XX`**, nooit
alleen de tail. Bij een rode poort: niet verder.

### 8. Oude worktrees opruimen (eis 5)
```bash
git worktree list
git branch --merged main          # welke branches zijn al binnen
```
Verwijder alleen worktrees die (a) gemergd of dood zijn **én** (b) geen ongecommit werk of
draaiende dev-server hebben:
```bash
git -C <pad> status --porcelain   # leeg = veilig
git worktree remove <pad>
git worktree prune
```
Twijfel? Laten staan en de user erop wijzen. **Nooit** een worktree met ongemergd werk weggooien.

## Fase B — Uitgeven (onomkeerbaar — hier de akkoord-poort)

### 9. Merge naar main
Merge de release-branch → `main` (indien nog niet) en push.

### 10. Bump + commit
De releasetekst uit stap 4 moet **mee de tag in** — `release.yml` leest hem uit de getagde commit.
```bash
npm run bump X.Y.Z
git add docs/release-notes/vX.Y.Z.md
git commit -am "chore(release): vX.Y.Z"
```

### 11. Critreview tier 2 — vóór je om release-akkoord vraagt
Draai vóór de akkoord-poort een **hyperkritische review, tier 2 (Opus, volle scope)** op de
release-kandidaat: de changelog-diff (de nieuwe sectie), de release notes en de volledige scope
sinds de vorige tag. Dispatch één review-subagent die de `hyperkritische-review`-skill aanroept
(zie de `critreview`-skill voor het opzetten). **Geen go?** Eerst fixen, dan pas verder. Verplicht —
de user wil de review-uitkomst zien vóór de akkoord-vraag.

### 12. ⛔ AKKOORD-POORT
Toon de user: de **versie**, de **paar bullets**, en dat CI nu gaat bouwen + publiceren +
auto-updaten naar alle gebruikers. Wacht op een expliciet "ja". Dit is de enige harde vraag —
de user bewaakt releases streng. (Bij een eenmalig verleend mandaat: nog steeds versie + notes
tonen, maar door.)

### 13. Tag + push → CI vuurt
```bash
git tag -a vX.Y.Z -m "Open Planner Studio vX.Y.Z"
git push origin main
git push origin vX.Y.Z
```

### 14. Workflows monitoren
```bash
gh run list --limit 5
gh run watch <run-id>       # of een achtergrond-lus op gh run list
```
`release.yml` (installers + `latest.json`) en `snap.yml` moeten beide groen worden.

### 15. Releaseteksten controleren (zet `release.yml` zelf — eis 2)
Sinds `fe0afb1` zet de workflow beide teksten uit `docs/release-notes/vX.Y.Z.md`: `create-release`
de releasepagina, `publish-release` het `notes`-veld in `latest.json`. **Niets te doen — wel te
controleren**, want de notes-stap is `continue-on-error` en faalt dus zichtbaar-maar-niet-blokkerend:
```bash
gh release view vX.Y.Z --json body --jq .body | head -5
curl -sSL https://github.com/OpenAEC-Foundation/open-planner-studio/releases/latest/download/latest.json \
  | node -e 'const j=JSON.parse(require("fs").readFileSync(0,"utf8")); console.log(j.version, "| notes:", j.notes.length, "tekens")'
```
Verwacht: jouw bullets in de body (mét Downloads-sectie eronder) en een niet-lege `notes`.
De `/latest/download/`-CDN kan even de oude versie serveren — hercontroleer bij twijfel, of pak
het asset rechtstreeks via `gh release download`.

### 16. Alleen bij een lege/generieke tekst — handmatig herstel
Klopt stap 15 niet (bestand vergeten, notes-stap rood), repareer dan achteraf:
```bash
mkdir -p /tmp/rel
node scripts/release-notes.mjs vX.Y.Z --format=body  > /tmp/rel/body.md
node scripts/release-notes.mjs vX.Y.Z --format=notes > /tmp/rel/notes.txt
gh release edit vX.Y.Z --notes-file /tmp/rel/body.md
gh release download vX.Y.Z -p latest.json -D /tmp/rel --clobber
node -e 'const fs=require("fs"),p="/tmp/rel/latest.json";
  const j=JSON.parse(fs.readFileSync(p,"utf8"));
  j.notes=fs.readFileSync("/tmp/rel/notes.txt","utf8");
  fs.writeFileSync(p,JSON.stringify(j,null,2));
  console.log("notes:",j.notes.length,"tekens")'
gh release upload vX.Y.Z /tmp/rel/latest.json --clobber
```
Ontbrak het bronbestand, voeg het dan alsnog toe aan `main` — anders herhaalt het zich.

### 17. Slotverificatie
```bash
gh release view vX.Y.Z --json assets --jq '.assets | length'
```
Check: de **volledige set assets** aanwezig (per-platform installers + hun `.sig`'s +
`latest.json` — vergelijk met de vorige release i.p.v. met een onthouden aantal), versie in
`latest.json` = X.Y.Z, en alle platform-download-URL's geven 200
(`curl -sI`). Updater-endpoint wijst naar deze versie.

### 18. Wiki publiceren
Na akkoord (stap 12) is de wiki-push gewoon een release-stap — geen aparte vraag. De wiki-subagent
uit stap 5 (of jij) draait via de `wiki`-skill:
```bash
npm run publish:wiki -- --push
```
Daarna live-checken: fetch de Home + een gewijzigde pagina en bevestig dat de wijziging live staat.

## Gotchas
| Val | Waarom |
|-----|--------|
| macOS auto-update | Vereist de **`app`-target** in `bundle.targets`; zonder → alleen `.dmg`, geen `darwin`-updater-entry. |
| Windows re-sign | Na Azure-signing klopt de updater-`.sig` niet meer; `release.yml` herbouwt de `.nsis.zip` zelf + haalt de URL via de release-API (spaties→punten in assetnamen → anders 404). |
| Snap/AppImage | Slaan de in-app updater over (Snap Store werkt zelf bij). Detectie via `install_kind`. |
| Cargo.toml | Blijft `0.1.0` — `bump` raakt 'm bewust niet. |
| Versie-sync worktrees | Na een release lopen open worktrees achter op de versie; sync main→worktree waar relevant. |
| latest.json markdown | De updater rendert geen markdown netjes → notes in `latest.json` = platte tekst. `scripts/release-notes.mjs --format=notes` stript inline-markdown, maar schrijf de bullets alsnog opmaak-arm. |
| Releasetekst vergeten | Zonder `docs/release-notes/vX.Y.Z.md` krijgt de release de generieke tekst en een leeg `notes`-veld (zoals v2026.7.12). Terugval breekt niets, maar de tekst is dan fout — let op de gate-warning. |
| CLAUDE.md | Geen `verify:docs`-poort, dus rot stil weg — stap 6 is de enige check. |

## Rode vlaggen — stop
- Tag pushen vóór de akkoord-poort (stap 12).
- Een poort (tsc/suite/build/verify) rood en tóch doorgaan.
- De suite-tail als bewijs nemen i.p.v. exitcode + `grep ^XX`.
- Een worktree verwijderen met ongecommit werk of een draaiende dev-server.
- Uitgebreide verhalen in de release notes proppen — die horen in de changelog.
