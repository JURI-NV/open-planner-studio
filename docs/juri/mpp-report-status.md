# T0.2 — `.mpp`-fideliteitsrapport-script: status

**Script geschreven:** `scripts/juri/mpp-report.ts`. **NOG NIET gedraaid tegen echte bestanden** —
er zijn op dit moment geen JURI-eigen `.mpp`-bestanden beschikbaar in deze omgeving. Dit blokkeert
het belangrijkste onderdeel van heel Fase 0 (implementatieplan §T0.2: "Als de datums niet kloppen
op jullie eigen bestanden, stopt het hier" / Poort A-vraag 1).

## Wat wél is gedaan

- Het patroon van `scripts/run-ts.mjs` gevolgd (esbuild-bundel → Node, `@/`-alias, geen React/geen
  store nodig) — zelfde aanpak als `scripts/generate-examples.ts`.
- Aangeroepen als: `node scripts/run-ts.mjs scripts/juri/mpp-report.ts <map> [output.csv]`.
- Leest `readMPP()` (`src/services/mpp/mppReader.ts`, `export function readMPP(bytes: Uint8Array,
  labels?: ImportLabels): ImportResult`) rechtstreeks aan op elk `*.mpp`-bestand in de opgegeven
  map (niet-recursief).
- Per taak worden WBS, naam, start/einde (`task.time.scheduleStart`/`scheduleFinish`), duur
  (minuten indien uur-modus, anders werkdagen), relaties/voorgangers (`predecessorId(type,lag)`,
  afgeleid uit `Sequence[]` via `successorId === task.id`) en `calendarId` naar CSV geschreven.
- Per bestand wordt onderscheiden: **OK** (N taken gelezen), **GEWEIGERD** (`MppUnsupportedError`
  met `mppCode` `MPP_LEGACY` — MPP8/9/12 — of `MPP_ENCRYPTED` — wachtwoord-versleuteld; beide
  worden door `assertReadable()` in `mppContainer.ts` herkend en gooien vóórdat er ook maar één
  taak gelezen wordt), of **FOUT** (elke andere exception — corrupt bestand, onverwachte
  structuur).
- Het script raakt de app niet: geen store, geen React, alleen `fs` + de bestaande, alleen-lezen
  MPP-reader — exact zoals de taakomschrijving vereist.
- Getypecheckt via `npm run typecheck` (onderdeel van de volledige `npm run verify`-run, zie
  `docs/juri/baseline-verify.md` — geen typefouten in dit bestand of de aanroep van `readMPP`).

## Wat NIET is gedaan (bewust, per instructie)

- **Geen synthetische/gefabriceerde `.mpp`-testbestanden gemaakt.** De opdracht was expliciet: niet
  doen alsof er data is. Het script is dus alleen door lezing/typecheck geverifieerd, niet
  end-to-end tegen een echt `.mpp`-bestand gedraaid.
- Geen aannames over de exacte MS Project-datums die JURI's eigen bestanden zouden moeten opleveren
  — dat is precies wat het script straks moet meten, niet iets wat hier is voorspeld.

## Wat er nog moet gebeuren (blokkerend voor Poort A-vraag 1)

JURI moet **ongeveer 10 representatieve eigen `.mpp`-bestanden** aanleveren. Zodra die er zijn:

1. `node scripts/run-ts.mjs scripts/juri/mpp-report.ts <map-met-bestanden>` draaien.
2. De CSV-uitvoer naast een MS Project-eigen export (of de UI zelf) leggen en per taak start/einde
   vergelijken.
3. Voor elk geweigerd bestand (MPP8/9/12 of versleuteld) navragen of dat een acceptabele beperking
   is, of dat er alsnog een conversieslag nodig is (bv. "Opslaan als" naar een nieuwer formaat in MS
   Project vóór import).
4. Pas na deze stap kan Poort A-vraag 1 ("Kloppen de datums op eigen bestanden?") beantwoord
   worden — dit rapport doet dat expliciet NIET voor JURI.
