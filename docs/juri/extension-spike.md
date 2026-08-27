# T0.4 — Extensie-spike HTTP: conclusie

**Spike-bestanden:** `docs/juri/extension-spike/manifest.json` + `docs/juri/extension-spike/main.js`
— een echte, valide extensie (permissies `ribbon`, `events`, `network`) volgens `docs/extensions.md`.
Twee ribbon-knoppen: "JURI: naar server sturen" (leest de planning via `api.data.get*()` en `POST`'t
'm als JSON naar een lokaal endpoint) en "JURI: van server laden" (`GET`'t terug en roept
`api.data.loadProject(...)` aan).

**Bewezen, niet alleen beredeneerd:** de extensie is headless gedraaid via exact hetzelfde
uitvoeringscontract als `src/extensions/extensionLoader.ts` gebruikt in productie (`new
Function(module, exports, require)`, met `require('open-planner-studio')` → de echte
`getExtensionSdk()`), gebonden aan een echte `createAppStoreContext()` en de echte
`createExtensionApi(...)`, tegen een triviale lokale HTTP-echoserver (toegestaan per de
taakomschrijving: "je kunt de HTTP-endpoint stubben met een trivial local echo server"). Resultaat:

```
tasks before round trip: [ 'Funderingswerken (spike)', 'Ruwbouw (spike)' ]
registered ribbon buttons: [ 'JURI: naar server sturen', 'JURI: van server laden' ]
[info] Planning gepost (2 taken).
after POST, server holds bytes: 3560
tasks after local mutation (pre-load): [ ..., 'Should be replaced by server load' ]
[info] Planning geladen (2 taken).
tasks after loading from server: [ 'Funderingswerken (spike)', 'Ruwbouw (spike)' ]
ROUND TRIP OK: local store -> extension -> HTTP -> extension -> local store, tasks identical = true
```

(De tussenstap "lokale mutatie vóór laden" bewijst dat de laad-knop de store echt overschrijft
vanuit de server, en niet toevallig een ongewijzigde store matcht.)

## Conclusie: **fork-route (T1.1–T1.3), niet extensie-route — voor de opslaan-flow zelf**

De spike bewijst dat een extensie planningsdata **kan** heen en weer sturen naar een HTTP-endpoint
via een handmatige actie. Maar de vraag die telt is niet "kan een extensie data versturen" — dat
kon al via `api.data.*` + de globale `fetch` (geen sandbox, zie `docs/extensions.md`'s
"Beperkingen") — de vraag is **of een extensie het bestaande opslaan-gedrag (Ctrl+S, "Bestand →
Opslaan") kan overnemen of ombuigen naar de server.** Dat kan niet, en dat is aantoonbaar uit het
API-oppervlak zelf, niet uit een gok:

- Het volledige `ExtensionApi`-oppervlak (`docs/extensions.md`, "API-overzicht"; geverifieerd tegen
  `src/extensions/extensionApi.ts`) bestaat uit `importers`, `data`, `events`, `ui`
  (`addRibbonButton` + `showNotification`), `settings`, `assets`, `pdfFonts`. Er is geen `api.file.*`,
  geen `api.save.*`, geen manier om een bestaande actie te overschrijven — `addRibbonButton` voegt
  uitsluitend een NIEUWE knop toe.
- `sdk.hostEvents` kent precies drie events: `projectLoaded`, `projectNew`, `scheduleCalculated`
  (`src/extensions/index.ts`/`docs/extensions.md`). Geen `beforeSave`/`saveRequested`/`willClose`
  — er is dus ook geen manier om "vlak vóór opslaan" in te haken en de bestemming te wijzigen.
  `importers.register` voegt alleen een NIEUW *import*-formaat toe aan Bestand → Importeren; het
  raakt de *opslaan*-kant niet.
- `src/services/fileAccess/index.ts` (de enige plek die `saveFile`/`saveToRef`/Ctrl+S aanstuurt,
  zie `docs/juri/ontwerp-serverbackend.md`) wordt nergens door het extensiesysteem aangeroepen of
  geïnjecteerd — extensies en `fileAccess` zijn twee volledig losse subsystemen.

M.a.w.: een extensie kan een **parallelle, handmatige** "naar server sturen"-knop bouwen (precies
wat de spike doet), maar kan **nooit** maken dat de gebruikers-vertrouwde Ctrl+S/"Opslaan" daad-
werkelijk naar de server schrijft — dat blijft altijd een tweede, aparte actie naast het echte
opslaan, met alle risico op "welke versie is nu de waarheid?"-verwarring die daarbij hoort. Voor
JURI's eindarchitectuur (server als centrale opslag, Ctrl+S = nieuwe versie) is dat onvoldoende: dat
vereist de derde `fileAccess`-backend uit T1.1–T1.3 (`serverBackend.ts`, een 3-way backend-selectie
in `index.ts`), precies zoals het implementatieplan al verwachtte. De spike bevestigt die
verwachting met bewijs in plaats van aanname.

**Wat de extensie-route wél goed is voor:** een tussenstap-demo, een "exporteer naar JURI"-knop voor
gebruikers die nog niet over zijn naar de server-backend, of een ontwikkel-tijd-hulpmiddel om de
server-API te beproeven zonder de kern aan te raken — maar niet voor de uiteindelijke, naadloze
save/load-flow die het implementatieplan beoogt.
