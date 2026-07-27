import { original } from 'immer';
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
 * Bovengrens op de undo-historie. `createSnapshot` deep-cloont de 'clone'-velden bij ELKE
 * bewerking; de eigen prestatie-audit meet ~4,95 MB per snapshot bij 5.000 taken. Zwaarder weegt
 * dat `undoStack`/`redoStack` ÍN het documentcontract zitten: élk inactief geopend document houdt
 * zijn volledige historie vast, dus het geheugen schaalt als bewerkingen × projectgrootte × open
 * documenten. Zonder grens groeit dat onbeperkt.
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
  const key = opts?.coalesceKey;
  if (key && coalesce && coalesce.key === key && coalesce.seq === undoSeq && coalesce.docId === s.activeDocumentId) {
    // Voortzetting van dezelfde bewerking: de bestaande snapshot dekt de begintoestand al.
    if (s.redoStack.length) s.redoStack = [];
    return;
  }
  // B1 (prestatie): kloon de snapshot van de PLAIN pre-mutatie-basisstaat via Immer's `original()`,
  // niet van de draft `s`. `createSnapshot` deep-cloont de 'clone'-velden met JSON; op een draft
  // proxy't die kloon élk bezocht object (gemeten ~145 ms @5000 taken), op plain state niet (~19 ms).
  // Byte-identiek zolang `beginUndoable` VÓÓR enige draft-mutatie in zijn producer wordt aangeroepen
  // (de conventie "guards; beginUndoable; mutatie"): dan is `original(s)` inhoudelijk gelijk aan de
  // draft op dit punt — dezelfde kloon-inhoud, alleen plain i.p.v. proxied. `?? s` is een defensieve
  // terugval (zou `original` ooit undefined geven), die alleen de oude, tragere vorm herstelt.
  const base = (original(s) as AppState | undefined) ?? s;
  pushUndoSnapshot(s, base);
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
