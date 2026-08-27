# T0.3 — Ontwerpnota derde `fileAccess`-backend

Analyse-only, per de taakomschrijving: geen code gewijzigd. Bronnen gelezen:
`src/services/fileAccess/index.ts` (79 regels), `webBackend.ts` (259 regels), `recentFiles.ts` (84
regels), `src/state/slices/fileSlice.ts` (625 regels), `src/services/formatRegistry.ts` (174
regels).

## 1. Welke van de 5 functies hebben een serverimplementatie nodig?

| Functie | Server nodig? | Waarom |
|---|---|---|
| `openFileDialog` | **Ja**, maar niet als dialoog | Vervangt geen OS-picker maar wordt aangestuurd door de documentbrowser (T1.5): de gebruiker kiest een project/versie in een Backstage-paneel, en dat paneel roept iets aan dat dezelfde `Promise<OpenedFile \| null>`-vorm teruggeeft (bv. via een module-level "pending resolver" die de documentbrowser bij een keuze aanroept — hetzelfde patroon dat een `<input type=file>`-picker al gebruikt in `webBackend.ts`'s `openViaInput`). |
| `saveFileDialog` | **Ja** | "Opslaan als" naar de server: nieuw project aanmaken, of een bestaand project als doel kiezen — een POST naar `/api/projects` of de eerste `/api/projects/{id}/versions`. |
| `saveToRef` | **Ja** | In-place opslaan: `POST /api/projects/{id}/versions` met `If-Match: <etag>` — de kern van "Ctrl+S schrijft een nieuwe versie". |
| `readFromRef` | **Ja** | `GET /api/versions/{id}/content` (tekst) — nodig om een recent-entry te heropenen. |
| `readBytesFromRef` | **Nee, praktisch niet aanroepbaar** | Zie toelichting hieronder. Moet wel bestaan voor de typehandtekening/exhaustiviteit, maar de servertak wordt in de praktijk nooit uitgevoerd. |

**Toelichting `readBytesFromRef`:** deze route bestaat alleen voor *binaire* bronformaten
(`formatRegistry.ts`'s `binaryExtensions()` levert vandaag uitsluitend `mpp`). Een server-`FileRef`
kan echter alleen ontstaan via `saveFileDialog`/`saveToRef` (T1.2), en die twee schrijven **altijd**
IFC-tekst (`content: string` — zie `fileSlice.saveFile`/`saveFileAs`, die zelf `writeIFC(...)`
aanroepen vóórdat `saveFileDialog`/`saveToRef` worden aangeroepen). Route 1 uit de analysenota (IFC
als blob) bevestigt dit: de server bewaart nooit een `.mpp`-brontekst, alleen IFC. Een server-ref
wijst dus per constructie nooit naar binaire inhoud. De functie moet er zijn (de `FileRef`-union is
exhaustief afgehandeld, zie §2), maar kan gewoon `null` teruggeven voor `kind: 'server'` — een
no-op, geen gat.

## 2. Minimale wijziging van de binaire `isTauri() ? … : …`-ternary naar 3-way

Vandaag, per functie in `index.ts` (5×, identiek patroon):

```ts
export function openFileDialog(...): Promise<OpenedFile | null> {
  return isTauri() ? openFileDialogTauri(...) : openFileDialogWeb(...);
}
```

Voorstel: één gedeelde backend-kiezer, gebouwd op een **build-time** vlag (niet een runtime-toggle
— dat is expliciet de T1.3-acceptatie-eis: "zonder API-configuratie is het gedrag byte-identiek aan
upstream"):

```ts
// Nieuw, klein blok bovenaan index.ts:
const SERVER_BACKEND_ENABLED = Boolean(import.meta.env.VITE_JURI_API_BASE_URL);

type Backend = 'tauri' | 'web' | 'server';
function activeBackend(): Backend {
  if (isTauri()) return 'tauri';
  return SERVER_BACKEND_ENABLED ? 'server' : 'web';
}
```

En elke van de 5 functies wordt een 3-tak `switch` (of een kleine lookup-tabel met 3 kolommen i.p.v.
2) in plaats van de ternary:

```ts
export function openFileDialog(filters: FileFilter[], opts?: OpenDialogOpts): Promise<OpenedFile | null> {
  switch (activeBackend()) {
    case 'tauri': return openFileDialogTauri(filters, opts);
    case 'server': return openFileDialogServer(filters, opts);
    default: return openFileDialogWeb(filters, opts);
  }
}
```

**Waarom dit de bestaande twee paden niet raakt:** `isTauri()` blijft de eerste, hoogste-prioriteit
check (ongewijzigd gedrag in Tauri); zonder `VITE_JURI_API_BASE_URL` op build-time is
`activeBackend()` voor elke niet-Tauri-omgeving exact `'web'`, dus elke bestaande call-site
retourneert letterlijk hetzelfde als vandaag — geen enkele regel in `tauriBackend.ts`/`webBackend.ts`
hoeft te veranderen. Dit is precies de "byte-identiek zonder configuratie"-testcase die T1.3 al
eist.

**Omvang:** `index.ts` groeit van ~79 naar ~110–120 regels (5× een 2-regel-ternary wordt een 5-regel
switch, plus de `activeBackend()`-helper). Eén nieuw bestand `serverBackend.ts` (schatting 150–250
regels: vijf functies + een kleine fetch-wrapper met foutmapping naar de bestaande conventie —
"netwerkfout ⇒ `null`/`false`, geen exception", zie T1.2's eigen acceptatie-eis).

## 3. `canBeSaveTarget` — waar het zit, en wat een server-ref ervoor betekent

De vlag zelf zit in `formatRegistry.ts` (`ReadFormat.canBeSaveTarget?: boolean`, regel 30), gezet op
precies één entry (`IFC_FORMAT`, `canBeSaveTarget: true` — elk ander formaat is impliciet `false`).
Geconsumeerd door `saveTargetFor(readFormat, ref, name)` (regels 128–138), die op zijn beurt door
`fileSlice.openFile`/`openRecentFile` wordt aangeroepen om te beslissen of het geopende bestand een
opslaan-doel krijgt.

**Belangrijke bevinding: dit stuk hoeft NIET te veranderen voor server-support.** Een server-ref is,
per route 1 uit de analysenota, altijd een IFC-document — dus precies het formaat dat vandaag al
`canBeSaveTarget: true` heeft. De logica "is dit formaat een geldig opslagdoel" is al formaat-
gebaseerd, niet backend-gebaseerd, en dat blijft correct.

**Wat wél moet veranderen, en dat is het echte werk:** `saveTargetFor`'s returntype is vandaag
hard 2-koloms getypeerd —

```ts
export function saveTargetFor(...): { filePath: string | null; fileHandle: FileSystemFileHandle | null }
```

— en `fileSlice`'s state volgt dat: `AppState` heeft **twee aparte optionele velden**
(`filePath: string | null`, `fileHandle: FileSystemFileHandle | null`) in plaats van één
`fileRef: FileRef | null`-veld, ook al bestaat de `FileRef`-union (`{kind:'path'}` / `{kind:'handle'}`)
al in `fileAccess/index.ts`. `fileSlice.saveFile` bouwt het opslaan-doel zelfs terug tot een `FileRef`
door de twee losse velden weer samen te voegen (regels 288–290):

```ts
const ref: FileRef | null = state.fileHandle
  ? { kind: 'handle', handle: state.fileHandle }
  : (isTauri() && state.filePath ? { kind: 'path', path: state.filePath } : null);
```

Een derde variant kan hier op twee manieren bij: (a) een derde parallel state-veld
(`fileServerRef: { projectId: string; versionId: string | null; etag?: string } | null`), of (b) een
refactor van `filePath`/`fileHandle` naar één `fileRef: FileRef | null`-veld. Optie (a) is de
kleinere upstream-diff (regel 6 van `CLAUDE-JURI.md`: "nieuwe code in nieuwe bestanden waar het
kan") — het raakt `saveTargetFor`'s returntype (+1 veld), de twee state-velden in `AppState`
(+1 veld), en de drie plekken in `fileSlice.ts` die vandaag `state.fileHandle`/`state.filePath`
lezen/zetten (`saveFile`, `saveFileAs`, `applyLoadedProject`'s `opts.filePath`/`opts.fileHandle`).
Optie (b) is architecturaal netter maar raakt alle bestaande Tauri/web-paden — precies het risico
dat regel 6 wil vermijden. **Advies: optie (a) voor T1.1/T1.4.**

**Omvang:** `formatRegistry.ts`'s `saveTargetFor` +2 tot 5 regels. `fileSlice.ts`: het nieuwe
state-veld (documentContract.ts moet het ook kennen, zie §5-analoog hieronder — een nieuw
document-veld moet door `DOCUMENT_FIELDS` heen, anders overleeft het geen documentwissel/undo) +
de drie call-sites hierboven, samen geschat 40–70 geraakte regels in `fileSlice.ts` +
`documentContract.ts` + `snapshot.ts`/`ifcSaveInput.ts` (die laatste twee raken vermoedelijk niet
inhoudelijk, maar moeten wel gecontroleerd worden — het documentcontract-mechanisme dwingt dat af
met een compile-fout als je het vergeet, zie `CLAUDE.md`'s eigen beschrijving van
`documentContract.ts`).

## 4. `recentFiles.ts` — wat een serialiseerbare server-ref vereenvoudigt

`RecentEntry.ref: FileRef` is al generiek getypeerd, dus structureel hoeft er weinig te veranderen.
De concrete vereenvoudigingen:

- **Dedupe-identiteit wordt synchroon en trivial.** `sameRef()` (regels 21–27) vergelijkt vandaag
  `a.path === b.path` voor Tauri (synchroon, triviaal) maar `await a.handle.isSameEntry(b.handle)`
  voor web-handles — een **asynchrone browser-API-aanroep** die zelf kan falen (`try { ... } catch {
  return false; }`). Een server-ref-vergelijking is `a.projectId === b.projectId` — synchroon, geen
  falen mogelijk, geen `await` nodig in de dedupe-lus.
- **Geen vervalrisico.** Een `FileSystemFileHandle` kan zijn permissie verliezen (vandaar de hele
  `queryPermission`/`requestPermission`-dans in `webBackend.ts`'s `readRefWeb`) of überhaupt
  ongeldig worden (bestand verwijderd/verplaatst, browser-sessie voorbij). Een server-ref
  (`{projectId, versionId}`) is gewoon JSON: hij "verloopt" nooit op een manier die de client kan
  detecteren zonder een netwerkcall, en het herstelpad bij een 404 (project verwijderd) is een
  gewone HTTP-foutafhandeling, geen browser-permissie-UI.
- **Geen `isSameEntry`-catch-complexiteit, geen IndexedDB-vs-legacy-localStorage-migratie-zorg voor
  het nieuwe pad** — de bestaande `migrateLegacy()` (regels 29–51) blijft ongewijzigd voor
  Tauri/web; een server-ref heeft simpelweg geen legacy-vorm om van te migreren.

**Omvang:** `recentFiles.ts` zelf: vrijwel niets (`sameRef` krijgt +2 regels voor de derde tak).
Het echte werk zit niet in vereenvoudiging maar in de nieuwe tak zelf toevoegen — verwaarloosbaar
t.o.v. §2/§3.

## 5. Is `Task.id` stabiel over opslaan/heropenen? — **NEE, aantoonbaar niet**

Dit was de belangrijkste vraag van T0.3, en het antwoord weerspreekt de aanname in het
implementatieplan zelf (§2: "Task.id is stabiel en is de basis van de IFC-GUID
(`ifcGuid(task.id)`)").

**Codepad:** `src/services/ifc/ifcReader.ts`, functie `extractTasks`, regel 741:

```ts
for (const te of taskEntities) {
  const id = generateId('task');   // ← NIEUW, willekeurig id, bij ÉLKE read
  ...
}
```

Elke keer dat een IFC-bestand gelezen wordt — of dat nu de eerste keer is, een herlaad, of een
tweede sessie die dezelfde opgeslagen versie opent — krijgt elke taak een **vers, willekeurig**
`task.id` via `generateId('task')`. Er is geen poging om het id te reconstrueren uit de
`IFCTASK`-`GlobalId` in het bestand (er is wel een `taskStepIdMap`, maar die mapt STEP-`#id` →
nieuw-gegenereerd-id, puur voor gebruik binnen dezelfde read-pass — niet persistent).

De schrijfkant (`ifcWriter.ts`) bevestigt het gevolg: `guidOf(ctx, task.id)` (regel 98,
`writeTask`-aanroep op regel 891) hasht het **in-memory** `task.id` naar een GlobalId. Omdat dat
`task.id` bij elke read willekeurig is, is de resulterende `GlobalId` dat ook: opslaan-heropenen-
opslaan geeft een ANDER `IFCTASK.GlobalId` voor dezelfde semantische taak dan de vorige keer.

**Empirisch bewijs** (niet alleen code-lezing — script gedraaid tegen een echt voorbeeldbestand,
`examples/01-grachtenpand-amsterdam.ifc`, 51 taken):

1. Hetzelfde bestand **twee keer onafhankelijk gelezen** (twee "sessies" die dezelfde opgeslagen
   versie openen): 0 van de 51 taken behielden hetzelfde `task.id`; 0 van de 51 hadden dus ook
   dezelfde `ifcGuid(task.id)`.
2. Een echte round trip (`readIFC` → `writeIFC` → `readIFC`): 0 van de 51 `task.id`'s kwamen overeen
   met de eerste read.
3. Twee onafhankelijke save-cycli op dezelfde brondata: 0 van de 51 afgeleide GUID's kwamen overeen.

Voorbeeldregel uit de output: taak met WBS `1` had bij read #1 `id=task-mtbe7yf5o8po2` (GUID
`PVj7bVDnMx1ZVFRlUBR$cn`) en bij read #2 van **exact dezelfde bytes** `id=task-mtbe7yfcumn1121`
(GUID `ylZfmt4lxlbXQTlVJfk5NX`).

**Gevolg voor het opmerkingen-/wijzigingsvoorstelsysteem (fase 5) uit het implementatieplan:**
`ifcGuid(task.id)` is in de HUIDIGE codebase **niet bruikbaar** als stabiele externe sleutel over
versies/sessies heen — precies het mechanisme waarop het hele opmerkingenmodel (`§2` van het
implementatieplan: "Opmerkingen en wijzigingsvoorstellen hangen aan die GUID") zou moeten rusten.
Twee routes om dit op te lossen, geen van beide gratis:

- **(A) `task.id` echt persistent maken.** De IFC-schrijver/-lezer zou een taak-eigen, stabiel
  identifier-veld moeten round-trippen (bv. een eigen `OPS_`-pset-veld met het interne id, zoals
  `library.ts`'s herkomststempels al doen — zie `CLAUDE.md`'s "Resourcebibliotheken"-sectie voor het
  precedent) in plaats van `generateId('task')` bij elke read. Dit raakt de IFC-lezer/-schrijver
  zelf — kernfunctionaliteit die "ONGEWIJZIGD" hoort te blijven volgens de eigen architectuurtabel
  in het implementatieplan (§2: `src/services/ifc/` staat daar expliciet als "ONGEWIJZIGD").
- **(B) De externe sleutel baseren op iets dat wél stabiel is: `wbsCode`, of een apart, door de
  server toegekend en in een `OPS_`-pset bewaard commentaar-anker-id.** WBS is echter niet
  betrouwbaar stabiel bij herstructurering (een taak verplaatsen in de boom wijzigt zijn WBS-code,
  zie `assignHierarchyAndWbs` in `mppReader.ts`) — bruikbaar als eerste benadering, niet als
  langetermijnoplossing.

**Dit hoort als expliciet punt op de agenda vóór Fase 5 (Wijzigingen & opmerkingen) begint** — het
is geen blocker voor Fase 0/1 (de server-backend zelf heeft geen stabiel taak-id nodig, alleen het
IFC-document als geheel), maar wél voor elk ontwerp dat op `ifcGuid(task.id)` als sleutel leunt.

## Samenvatting: concreet wijzigingsvoorstel per bestand (T1.1–T1.4, nog NIET gebouwd)

| Bestand | Aard van de wijziging | Geschatte regels |
|---|---|---|
| `src/services/fileAccess/index.ts` | `FileRef`-union +1 variant, 5 ternaries → 5 switches + `activeBackend()`-helper | ~30–40 gewijzigd/toegevoegd |
| `src/services/fileAccess/serverBackend.ts` (nieuw) | 5 functies + fetch-wrapper + foutmapping | ~150–250 nieuw |
| `src/services/formatRegistry.ts` | `saveTargetFor`'s returntype +1 veld | ~5–10 gewijzigd |
| `src/state/slices/fileSlice.ts` | nieuw `fileServerRef`-veld lezen/zetten in `saveFile`/`saveFileAs`/`applyLoadedProject` | ~30–50 gewijzigd |
| `src/state/documentContract.ts` | nieuw state-veld registreren (`DOCUMENT_FIELDS`) — compile-afgedwongen | ~5–10 toegevoegd |
| `src/services/fileAccess/recentFiles.ts` | `sameRef()` derde tak | ~2–5 gewijzigd |
| `src/state/appStore.ts` / `AppState`-type | nieuw veld in de state-vorm | ~2–5 toegevoegd |

Totaal geschat: **~230–370 regels**, verspreid over 1 nieuw bestand en 6 bestaande — geen van de
bestaande Tauri/web-paden zelf hoeft inhoudelijk te veranderen (alleen uit te breiden met een derde
tak), wat aansluit bij `CLAUDE-JURI.md`-regel 6 (nieuwe code in nieuwe bestanden waar het kan).
