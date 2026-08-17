import { createSnapshot } from './snapshot';
import type { AppState } from './appStore';

/**
 * Transactie-helpers voor het muterende-actie-ritueel (audit P8, bevinding F4/A6).
 *
 * Vóór deze helpers werd het ritueel ~50× met de hand herhaald door `src/state/slices/` heen:
 *   - openen: `s.undoStack.push(createSnapshot(s)); s.redoStack = [];`
 *   - sluiten: `s.isDirty = true;` (vaak + `s.scheduleStale = true;`)
 * Handmatige herhaling laat divergentie insluipen op auteursgeheugen. Deze twee functies zetten het
 * ritueel op ÉÉN plek, terwijl het gedrag per actie EXACT gelijk blijft:
 *
 *   set((s) => {
 *     ...eventuele guard-returns (géén snapshot bij een no-op!)...
 *     beginUndoable(s);        // snapshot + redo-wis, ná de guards en vóór de mutatie
 *     ...mutatie...
 *     finishMutation(s, { stale: true });  // isDirty (+ optioneel scheduleStale)
 *   });
 *   get().recomputeViewRows();  // trailing recomputes blijven bewust expliciet (per-actie-specifiek)
 *
 * BEWUSTE ASYMMETRIEËN blijven uitdrukbaar:
 *   - "dirty zonder undo": roep alleen `finishMutation` aan, NIET `beginUndoable`. LET OP — de
 *     project-mutators (setProject/setCalendar/setStatusDate/setProgressMode/setProjectCalendar)
 *     waren hiervan het voorbeeld, maar zijn sinds pakket H wél undoable: het volledige `project`
 *     zit nu in de snapshot en dat mag alleen zolang élke project-mutator een snapshot pusht
 *     (invariant, zie de kop van `snapshot.ts`).
 *   - "undo zonder stale" (WBS-nummering, structuur-CRUD, baselines): `finishMutation(s)` zonder
 *     `stale` laat `scheduleStale` bewust met rust.
 *
 * De trailing recomputes (`recomputeViewRows`/`recomputeResourceLoad`) blijven per actie expliciet
 * ná de `set()` staan: hun aanwezigheid, volgorde en conditie (bv. alleen bij `moved`) verschillen
 * per actie en horen bij de recipe, niet bij het generieke ritueel.
 */

/**
 * Coalesce-marker (pakket H): welke keyed mutatie pushte als laatste een snapshot, bij welke
 * push-volgnummer en in welk document. Bewust MODULE-state en geen store-state: het is puur een
 * bewerkings-"sessie"-hint en hoort niet in het documentcontract/de snapshot thuis.
 *
 * Bewaking = key + volgnummer + document. Elke ándere mutatie pusht een snapshot (volgnummer
 * wijzigt ⇒ mismatch) én zet de marker op `null` (geen key). `undo`/`redo` en een documentwissel
 * wissen hem expliciet.
 *
 * De bewaking was hiervoor de STACKDIEPTE (`undoStack.length`). Dat kan niet meer sinds de stack
 * op `MAX_UNDO` begrensd is: zodra het plafond bereikt is blijft de diepte constant bij elke
 * push, waardoor een volgende bewerking met dezelfde key ten onrechte als voortzetting zou gelden
 * en twee losse bewerkingen tot één undo-stap zouden versmelten. Een monotone teller heeft dat
 * probleem niet. (Referentievergelijking op de bovenste snapshot kan hier NIET: binnen een
 * Immer-producer levert `s.undoStack[n]` een draft-proxy op i.p.v. het oorspronkelijke object.)
 */
let coalesce: { key: string; seq: number; docId: string } | null = null;

/**
 * Bovengrens op de undo-historie.
 *
 * De oorspronkelijke aanleiding was geheugen: `createSnapshot` deep-cloonde toen élke bewerking
 * (~4,95 MB per snapshot bij 5.000 taken), en omdat `undoStack`/`redoStack` ÍN het documentcontract
 * zitten hield élk geopend document zijn volledige historie vast — geheugen ≈ bewerkingen ×
 * projectgrootte × open documenten. Sinds de snapshot per referentie deelt (zie `snapshot.ts`) is
 * dat argument grotendeels weg: opeenvolgende snapshots delen alles wat niet veranderde, dus een
 * stap kost nog ongeveer de objecten die die ene bewerking aanraakte.
 *
 * De grens blijft staan, nu om de andere reden die er altijd al onder lag: een ONBEGRENSDE historie
 * houdt élke tussentoestand levend, dus ook de volledige takenlijst van vóór een grote verwijdering
 * of import. Honderd stappen is ruim genoeg voor de bewerkingssessie die een gebruiker in zijn hoofd
 * heeft en houdt de bovengrens eindig.
 */
export const MAX_UNDO = 100;

/** Monotoon volgnummer over alle undo-pushes — de identiteit van de coalescing-reeks (zie boven). */
let undoSeq = 0;

/**
 * Push een snapshot op de undo-stack en houd de historie begrensd: bij overschrijding valt de
 * OUDSTE stap eruit. Enige plek waar op `undoStack` gepusht wordt, zodat de grens en het
 * volgnummer niet per callsite opnieuw onderhouden hoeven te worden.
 */
export function pushUndoSnapshot(s: AppState, base: AppState = s): void {
  s.undoStack.push(createSnapshot(base));
  if (s.undoStack.length > MAX_UNDO) s.undoStack.shift();
  undoSeq++;
}

/** Wis de coalesce-marker: de eerstvolgende `beginUndoable` pusht gegarandeerd een verse snapshot.
 *  Verplicht ná undo/redo en bij een documentwissel (zie de marker-docstring). */
export function resetUndoCoalescing(): void {
  coalesce = null;
}

/**
 * Suppressie-vlag voor MCP-bulk/batch-transacties (WP0). Zolang deze aanstaat geeft `beginUndoable`
 * een early-return: de per-mutator-snapshots worden onderdrukt zodat de transactie zelf ÉÉN snapshot
 * vooraf kan nemen ("één bulk = één undo-stap"). Bewust MODULE-state, net als de coalesce-marker —
 * een puur uitvoerings-"venster"-hint die niet in het documentcontract/de snapshot thuishoort.
 * Alleen `runInMcpTransaction` (mcpTransaction.ts) zet 'm, strikt synchroon aan/uit rond de callback.
 */
let mcpTransactionActive = false;

/** Zet de MCP-transactie-suppressie aan/uit. Uitsluitend aangeroepen door `runInMcpTransaction`,
 *  die de vlag synchroon rond de mutatie-callback beheert (aan vóór, uit ná — óók bij een throw). */
export function setMcpTransactionActive(active: boolean): void {
  mcpTransactionActive = active;
}

/**
 * Diepteteller voor bulk-transacties (K-item 32).
 *
 * Zonder dit pusht élke mutator zijn eigen snapshot. Dat gebeurt echt: `api.data.addTask` is de
 * enige manier waarop een extensie taken kan aanmaken, dus een importer die duizend taken toevoegt
 * laat duizend undo-stappen achter voor wat de gebruiker als één handeling ziet. Toen de snapshot
 * nog deep-cloonde was het bovendien kwadratisch in tijd én geheugen (1 + 2 + … + n taken gekloond);
 * dat deel is weg sinds hij per referentie deelt, de undo-stap-vervuiling niet.
 *
 * Een TELLER en geen boolean, zodat een geneste `withTransaction` de buitenste niet voortijdig
 * opheft. Module-state, net als de coalesce-marker en de MCP-vlag: een uitvoerings-"venster",
 * geen documentdata.
 */
let batchDepth = 0;

/** Loopt er een bulk-transactie? Dan neemt die de ene snapshot en zwijgen de mutators. */
export function isBatchActive(): boolean {
  return batchDepth > 0;
}

/** Uitsluitend door `withTransaction` aangeroepen, synchroon rond de callback (ook bij een throw). */
export function enterBatch(): void {
  batchDepth++;
}

export function exitBatch(): void {
  if (batchDepth > 0) batchDepth--;
}

/**
 * Open een ongedaan-maakbare mutatie: leg de huidige staat op de undo-stack en wis de redo-stack.
 * ROEP DIT AAN NÁ eventuele guard-returns en VÓÓR de mutatie — zo vervuilt een no-op de undo-stack
 * niet (bewust patroon door de hele state-laag: acties pushen de snapshot pas als er echt iets
 * verandert). `createSnapshot` leest de projectdata key-gedreven uit het documentcontract.
 *
 * `coalesceKey` (optioneel) voegt ÉÉN undo-stap samen voor een reeks directe herhalingen van
 * dezelfde bewerking. Nodig voor LIVE-committerende invoervelden: `DateTextInput` committeert per
 * toetsaanslag (`handleChange` → `commitFrom`), en omdat `parseFlexibleDate` een jaar van 2 én 3
 * cijfers accepteert levert het intypen van "01062030" drie geldige commits op ("2020-06-01",
 * "0203-06-01", "2030-06-01"). Zonder coalescing zou dat drie undo-stappen met onzin-tussenwaarden
 * opleveren — plus drie volledige deep clones en drie gewiste redo-stacks. Elke andere mutatie,
 * undo, redo of documentwissel breekt de reeks af, dus alleen aaneengesloten herhalingen van
 * dezelfde bewerking vallen samen.
 */
export function beginUndoable(s: AppState, opts?: { coalesceKey?: string }): void {
  // Suppressie: binnen een MCP-transactie (WP0) óf een bulk-transactie (`withTransaction`,
  // K-item 32) is de ene snapshot al vooraf genomen; de individuele mutators mogen er dan géén
  // pushen. Early-return vóór álle snapshot-/coalesce-logica.
  if (mcpTransactionActive || batchDepth > 0) return;
  const key = opts?.coalesceKey;
  if (key && coalesce && coalesce.key === key && coalesce.seq === undoSeq && coalesce.docId === s.activeDocumentId) {
    // Voortzetting van dezelfde bewerking: de bestaande snapshot dekt de begintoestand al.
    if (s.redoStack.length) s.redoStack = [];
    return;
  }
  // De snapshot moet de PLAIN pre-mutatie-basisstaat vastleggen, niet de draft `s` — `createSnapshot`
  // normaliseert dat zelf via `original()` (zie de kop van snapshot.ts, incl. waarom dat klopt zolang
  // de conventie "guards; beginUndoable; mutatie" wordt aangehouden). Hier stond diezelfde
  // normalisatie ook nog een keer; één definitie is genoeg.
  pushUndoSnapshot(s);
  s.redoStack = [];
  coalesce = key ? { key, seq: undoSeq, docId: s.activeDocumentId } : null;
}

/**
 * Sluit een mutatie af: markeer het document als gewijzigd (`isDirty`) en — indien de mutatie
 * datum-beïnvloedend was (`stale: true`, A6) — de planning als verouderd. `stale` default `false`,
 * zodat puur niet-datum-rakende mutaties (WBS-nummering, structuur-CRUD, baselines) `scheduleStale`
 * bewust NIET zetten (gedocumenteerde asymmetrie).
 */
export function finishMutation(s: AppState, opts?: { stale?: boolean }): void {
  s.isDirty = true;
  if (opts?.stale) s.scheduleStale = true;
}
