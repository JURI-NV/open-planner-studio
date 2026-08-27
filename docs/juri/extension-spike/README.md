# T0.4 extensie-spike — hoe dit gedraaid en getest is

`manifest.json` + `main.js` in deze map zijn een echte, valide extensie (permissies `ribbon`,
`events`, `network`, zie `docs/extensions.md`). De conclusie staat in `docs/juri/extension-spike.md`.

## Hoe dit bewezen is (niet alleen gelezen)

Er is een driver-script gedraaid dat, headless in Node (geen browser, geen Tauri), exact het
uitvoeringscontract van `src/extensions/extensionLoader.ts` volgt:

1. Een echte `createAppStoreContext()` opzetten en met `addTask(...)` twee taken toevoegen.
2. Een echte `createExtensionApi('juri-http-spike', ['ribbon','events','network'], undefined, ctx, host)`
   bouwen (dezelfde functie die de app zelf gebruikt).
3. `main.js` inlezen en uitvoeren via `new Function('module', 'exports', 'require', code)` met een
   `require`-shim die alleen `'open-planner-studio'` teruggeeft (→ de echte `getExtensionSdk()`) —
   hetzelfde CommonJS-sandbox-patroon als de productie-loader.
4. `module.exports.onLoad(api)` aanroepen; dat registreert twee ribbon-knoppen in
   `ctx.store.getState().extensionRibbonButtons`.
5. Een triviale lokale HTTP-echoserver starten (`node:http`, poort 8934) — POST bewaart de laatst
   ontvangen body, GET geeft 'm terug. Dit stubt de backend; er is geen echte JURI-API in deze
   spike.
6. De knop "JURI: naar server sturen" se `onClick()` handmatig aanroepen (simuleert een muisklik) →
   POST naar de echoserver.
7. Een extra taak lokaal toevoegen (bewijst dat de volgende stap écht van de server leest, niet
   toevallig de ongewijzigde store matcht).
8. De knop "JURI: van server laden" se `onClick()` aanroepen → GET + `api.data.loadProject(...)`.
9. Vergelijken: de taken vóór stap 6 en ná stap 8 zijn identiek; de extra taak uit stap 7 is weg.

Resultaat (volledige output in `docs/juri/extension-spike.md`):

```
ROUND TRIP OK: local store -> extension -> HTTP -> extension -> local store, tasks identical = true
```

Het driver-script zelf is niet meegecommit (het is een eenmalig bewijs-script, geen onderdeel van
de suite of de extensie) — de reproductiestappen hierboven volstaan om het na te bouwen: een
`createAppStoreContext()`, `createExtensionApi(...)` en de `new Function(...)`-executie zijn alle
drie bestaande, publieke bouwstenen uit `src/extensions/` en `src/state/appStore.ts`.
