# Rapport-exportopties — balkkleuren, statuslijn, volg-weergave — ontwerpdoc

**Datum:** 2026-08-14
**Issues:** #21 punt 1 (nieuwe ronde: balkkleuren bij het plotten) + #54 (statuslijn, volg-weergave)
**Status:** ontwerp goedgekeurd; implementatie via `docs/superpowers/plans/2026-08-14-rapport-export-opties.md`

---

## 1. Context & doel

De Gantt-rapportexport is functioneel compleet (vector-PDF, paginering, preview), maar drie wensen
uit #21/#54 ontbreken:

1. **Balkkleuren bij export** — nu uitsluitend kritiek-pad-kleuren (rood/oranje/blauw). Gewenst:
   meerdere kleurmodi, o.a. kleur per uitvoerende resource ("metselaar geel, loodgieter groen").
2. **Statuslijn in export** — op het scherm bestaan de statusdatumlijn en voortgangslijn al; de
   printlaag kent alleen een "vandaag"-lijn.
3. **Volg weergave** — de export tekent de volledige takenboom; filter/groepering/sortering/
   inklapstatus van de schermweergave worden genegeerd.

Kernprincipe van het ontwerp: **de printlaag blijft dom**. ReportPanel levert rijen + opties, pure
modules rekenen kleuren/segmenten uit, `renderReport` tekent wat hij krijgt. Preview (canvas) én
PDF-export (vector) draaien op hetzelfde `Draw2D`-interface, dus één wijziging dekt beide.

## 2. Vastgelegde besluiten (uit de brainstorm met de user)

| # | Besluit |
|---|---------|
| B1 | Resource krijgt een **kleurveld** (`Resource.color?: string`, hex), automatisch toegekend bij aanmaak, door de gebruiker wijzigbaar in de resource-editor. |
| B2 | Kleuren gelden **voor de export**; op het scherm komt alléén een klein kleuraccentje (dun streepje op de taakbalk in de resourcekleur, achter een eigen Beeld-toggle). **Herzien na user-test (2026-08-17):** een EXPLICIET gekozen `Task.color` wint óók op het scherm — ook boven kritiek-rood, dat als rode rand om de balk leesbaar blijft (spiegel van de rapportmodi); en het scherm-accent verlicht te donkere resourcekleuren in het donkere thema (`ensureThemeVisible`, hue behouden — de export blijft de exacte kleur). |
| B3 | Statuslijn in het rapportpaneel als **letterlijke 3-opties-dropdown**: Geen / Statusdatumlijn / Voortgangslijn. |
| B4 | "Volg weergave" = **volledige WYSIWYG**: de export tekent exact de `viewRows` van het scherm (filter, groepering, sortering én inklapstatus). Print-tabel behoudt zijn eigen vaste kolommen. |
| B5 | In resource-modus: **resourcekleur als vulling + rode rand om kritieke taken**; taak zonder resource valt terug op neutraal blauw. |
| B6 | "Elke taak een eigen kleur" = **beide varianten**: automatische regenboog (hash op taak-id) ën het bestaande `Task.color`-veld als aparte modi. |
| B7 | Kleurtoewijzing: **nieuwe resources automatisch** (eerste vrije paletkleur) + **hash-fallback** voor kleurloze resources (deterministisch, muteert géén data — werkt direct voor elk bestaand project). |
| B8 | Taak met meerdere resources: **balk in segmenten** naar rato van `units` per resource. |
| B9 | Architectuur: printlaag accepteert **doorgegeven rijen** (benadering 1); géén eigen view-pijplijn, géén self-flatten wanneer rijen worden meegegeven. |

## 3. Datamodel & kleurenbron

**`Resource.color?: string`** (hex) — `src/types/resource.ts`.

- **IFC-round-trip** via het bestaande `OPS_`-Pset-patroon (`ifcPsets.ts`), net als `Task.color`
  (PSet `Color`). De kleur reist mee in project-IFC en pool-export/import.
- **Bewust níét** in `RESOURCE_DIFF_FIELDS` — kleur is presentatie, geen planningsdata; een andere
  kleur mag nooit een *"wijkt af"*-markering tussen bibliotheek en project triggeren. Vastgelegd in
  een library-test (kleur wijzigen → géén `deviated`).
- **Auto-toewijzing** bij aanmaak (bibliotheek én project): eerste paletkleur die nog niet in
  gebruik is.
- **Hash-fallback**: kleurloze resources krijgen weergavekleur `hash(resourceId) → palet[index]`.
  Deterministisch op elke machine, muteert niets, niets te migreren.
- **Kleurkiezer** in de bestaande gedeelde resource-editor.
- **`Task.color`** bestaat al (IFC-round-trip, scherm gebruikt hem voor niet-kritieke taken) maar is
  nergens instelbaar en de print negeert hem. Modus *per taak — eigen kleur* maakt het veld compleet:
  kleurkiezer in `TaskPropertiesPanel` + print gebruikt hem.

**Nieuw palet** `src/engine/renderer/resourcePalette.ts`: vaste reeks van 12 printvriendelijke
kleuren, dienend voor resourcekleuren én de automatische per-taak-regenboog. Printvriendelijk =
onderling onderscheidbaar, óók in grijswaarden (verschillende lichtheid), geen botsing met de
kritiek-roodtint.

## 4. Kleurmodi in de printlaag

Nieuw `PrintOptions`-veld `barColorMode: 'critical' | 'task' | 'auto' | 'resource'`
(default `'critical'`). Pure module `src/services/print/barColors.ts` vertaalt per taak naar één
kleur óf segmenten:

| Modus | Regel |
|---|------|
| `critical` | Huidige gedrag: rood (kritiek) / oranje (bijna-kritiek) / blauw. |
| `task` | `Task.color` als gezet; anders critical-logica. |
| `auto` | `hash(taskId) → palet[index]` — stabiel bij herordenen. |
| `resource` | Segmenten naar rato van `units` per resource, in `resourceDisplayColor(resource)` (eigen kleur of hash-fallback). Zonder resource → neutraal blauw. |

- Kritiek pad in niet-critical-modi: **rode rand** om de balk (±1px `PRINT_COLORS.critical`);
  vulling is de moduskleur.
- Balk smaller dan ~12 px in resource-modus → solide eerste-kleur i.p.v. segmenten.
- Mijlpalen volgen dezelfde modusregel; zonder resource de huidige paarse ruit.
- Voltooiings-overlay komt óver de segmenten zoals nu óver de solide kleur.
- **Legenda beweegt mee**: `task`/`auto` → alleen "rode rand = kritiek pad"; `resource` →
  kleurvakje + resourcenaam per zichtbare resource (volgorde eerste voorkomen) + cap met
  *"en N meer"*-regel; `critical` → zoals nu.

## 5. Statuslijn

Nieuw `PrintOptions`-veld `statusLine: 'none' | 'statusDate' | 'progress'` (default `'none'`).

- `statusDate`: verticale stippellijn op `project.statusDate` in de statusdatum-kleur met label —
  zelfde patroon als de bestaande today-lijn (`setLineDash` bestaat al in `Draw2D`).
- `progress`: de voortgangslijn zoals `GanttRenderer.drawProgressLine` die tekent. Die logica wordt
  naar een gedeelde pure helper gehesen (posities per rij + verbindingspunten), zodat scherm en
  print dezelfde definitie delen.
- Geen `statusDate` gezet → beide lijnopties tekenen niets; het rapportpaneel toont een korte hint
  *"Stel eerst een statusdatum in"* onder de dropdown.

## 6. Volg weergave — rijen naar de printlaag

Nieuw optioneel veld `options.rows?: ViewRow[]` op `renderReport`:

- Checkbox **uit** (default): ReportPanel levert geen rijen → huidige gedrag (volledige boom).
- Checkbox **aan**: ReportPanel levert `viewRows` uit de store. Print tekent die rijen; taken onder
  een ingeklapte groep staan er niet in. WYSIWYG.
- Groepsband-rijen (`kind: 'group'`) krijgen een eigen band-weergave in de print (naam +
  samenvattingsbalk over de groep) — het enige nieuwe tekenpad.
- Relatielijnen: alleen tussen paren waarvan béide endpoints zichtbaar zijn (zelfde regel als
  scherm).
- Intern normaliseert `renderReport` beide invoervormen (boom vs. rijen) naar één rij-type.
- Print-tabel behoudt eigen vaste kolommen (WBS, naam, duur, datums, voltooiing) — kolominstellingen
  volgen niet (bewuste scope-afbakening).

## 7. UI & instellingen

- ReportPanel (Gantt-instellingenblok): dropdown **Statuslijn** (3), dropdown **Balkkleuren** (4),
  checkbox **Volg weergave**.
- Persistentie: drie nieuwe velden in `ReportSettings` (`reportSettings.ts`, één
  `ops-reportSettings`-sleutel, tolerante per-veld parse incl. fallback bij onbekende waardes).
- i18n: nieuwe sleutels in `report`-namespace; nl+en bron, 14 locales aanvullen (`verify:i18n` poort).
- Scherm-accent: toggle **"Resource-accent"** op de Beeld-tab (persisted via losse `ops-`-sleutel
  zoals `showProgressLine`). Aan = `GanttRenderer` tekent op elke taakbalk een dun streepje
  (±3 px onderrand) in de resourcekleur, gesegmenteerd bij meerdere resources. Balkvulling blijft
  kritiek-pad-gekleurd.

## 8. Tests

- `tests/planning/check-bar-colors.ts` (nieuw): palet-uniekheid + grijswaardenonderscheid,
  hash-stabiliteit, auto-toewijzing, hash-fallback muteert niets, segmentverdeling naar rato van
  units (exact vullend incl. afronding), smalbalk-fallback, rode-rand-regel per modus, mijlpalen.
- `tests/planning/check-print-report.ts` (nieuw): `renderReport` tegen een recording-`Draw2D`-stub:
  rijen-volg-modus tekent exact de viewRows, statuslijn op juiste x (of niet), kleurmodi produceren
  juiste fill-kleuren/segmenten, legenda-inhoud per modus.
- IFC-batterij uitbreiden: `Resource.color` round-trip; pool-export/import behoudt kleur.
- `tests/library/`: kleurwijziging triggert géén afwijkingsstatus.
- `tests/planning/check-renderer.ts` uitbreiden met resource-accent.
- Poort: `npm run verify` + visuele QA in de dev-build (preview vs. export).

## 9. Buiten scope

Kleurmodi via MCP-tools, tabelkolommen volgen in export, kleurmodi op het scherm (behalve accent),
CJK/RTL-printzaken, baseline-gerelateerde kleuren.

## 10. Fasering

1. Data: `Resource.color` + IFC + bibliotheek-persistentie + auto-toewijzing + `resourcePalette.ts`
   + hash-fallback + palet-test.
2. Kleurlogica: `barColors.ts` + tests.
3. Printlaag: `PrintOptions`-velden, rijen-normalisatie, kleurmodi + legenda, statuslijn,
   recording-Draw2D-tests.
4. UI: ReportPanel-besturing, `ReportSettings`, Beeld-toggle + accent, i18n.
5. Docs (nl+en + 12 overige) + TODO + visuele QA + `npm run verify`.
