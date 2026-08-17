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
 *     `stale` laat `scheduleStale` bewust met rust. LET OP: `stale` betekent "datum-rakend", niet
 *     "de vlag moet blijven staan" — acties die zélf `runCPM` aanroepen (moveProject, applyLeveling,
 *     clearLeveling) zetten hem tóch, want `finishMutation` hangt er meer aan dan alleen de vlag
 *     (het verlaten van "datums zoals opgeslagen", issue #63).
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
 * Zonder dit pusht élke mutator zijn eigen deep-clone-snapshot. Een lus van n toevoegingen kloont
 * dus 1 + 2 + … + n taken — kwadratisch. Dat gebeurt echt: `api.data.addTask` is de enige manier
 * waarop een extensie taken kan aanmaken, dus een importer die duizend taken toevoegt betaalt
 * duizend snapshots én laat duizend undo-stappen achter voor wat de gebruiker als één handeling ziet.
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
 * bewust NIET zetten (gedocumenteerde asymmetrie). Datum-beïnvloedende mutaties verlaten daarnaast
 * de modus "datums zoals opgeslagen" (issue #63) — zie de onderbouwing in de body hieronder.
 */
export function finishMutation(s: AppState, opts?: { stale?: boolean }): void {
  s.isDirty = true;
  if (opts?.stale) s.scheduleStale = true;
  // "Datums zoals opgeslagen" (issue #63): élke datum-rakende bewerking verlaat de modus. Eén regel
  // op één plek, zodat alle muterende callsites het erven i.p.v. het per actie te herhalen.
  //
  // De snapshot is op dit punt al door `beginUndoable` gepusht MÉT de modus aan, dus Ctrl+Z herstelt
  // modus, datums en cpmResult in één stap — daarmee vervult deze uitgang zijn kant van de
  // contract-invariant (zie de kop van `snapshot.ts`: een veld mag in de snapshot staan dan en
  // slechts dan als élke mutator ervan een snapshot pusht). Binnen een MCP- of bulk-transactie
  // zwijgt `beginUndoable`, maar dan heeft de omvattende transactie zijn ene snapshot al vóór de
  // eerste mutatie genomen — óók met de modus aan; de keten klopt daar dus net zo goed.
  //
  // Zonder dit zou een half-opgeslagen/half-bewerkte planning ontstaan zonder dat iets aangeeft
  // welke datum welke is. Herrekenen doet deze functie bewust NIET (ze draait binnen een
  // Immer-producer); dat is het werk van `useExitRecordedDates` (of van F5, route B).
  //
  // Waarom `opts?.stale` als voorwaarde: de "undo zonder stale"-gevallen hierboven (WBS-nummering,
  // structuur-CRUD, baselines) raken geen datums, dus wat er op het scherm staat is nog steeds
  // exact wat het bestand zei. De modus daar verlaten zou het aanbod stil weggooien én de getoonde
  // datums onverklaard achterlaten — er is dan immers geen `scheduleStale` die een herberekening
  // uitlokt. `stale` is daarmee de eerlijke lezing van "datum-rakend"; de drie acties die zélf
  // herrekenen (moveProject, applyLeveling, clearLeveling) zetten de vlag sinds de review van taak 6
  // dan ook gewoon, ook al wist hun eigen `runCPM` hem meteen weer — anders zouden ze de modus pas
  // via die `runCPM` verlaten, in een tweede undo-stap met een tussentoestand die niemand zag.
  if (opts?.stale && s.datesAsRecorded) {
    s.datesAsRecorded = false;
    s.recordedDates = null;
  }
}

/**
 * Zet de "verouderd"-vlag voor de handvol paden die BUITEN het `finishMutation`-ritueel om de
 * INVOER van een toekomstige berekening veranderen: de niet-undoable bibliotheek-verversingen
 * (`refreshBehindItems`, `resolveDeviation`, `refreshAllDocumentsFromPool`). Die zetten bewust géén
 * snapshot en géén `isDirty` — ze veranderen kalenderwaarden, niet de getoonde datums.
 *
 * ZE MOGEN DE MODUS "DATUMS ZOALS OPGESLAGEN" DAAROM NIET VERLATEN (issue #63): zonder snapshot zou
 * dat de invariant van `snapshot.ts` breken — een latere undo zou `datesAsRecorded: true` uit een
 * oudere snapshot terugzetten terwijl de datums dat niet meer zijn (bug-klasse B3). Maar ze mogen de
 * modus ook niet als "verouderd" bestempelen, en dát is wat deze helper regelt.
 *
 * Waarom: in de modus staat op het scherm wat het BESTAND zei, niet een berekening. "Verouderd" is
 * een uitspraak over de berekening, dus `showRecordedDates` houdt `scheduleStale` daar al bewust op
 * `false`. Een kalenderverversing verandert wat een toekomstige berekening zou opleveren, niet wat er
 * nu staat — de weergave blijft dus waar.
 *
 * Er gaat niets verloren: de modus verlaten rekent altijd door. Route A (`finishMutation`) zet
 * `scheduleStale` zelf en `useExitRecordedDates` rekent; route B (F5) ís de berekening. Beide werken
 * dan met de zojuist ververste kalenders.
 *
 * En het sluit de enige toestand af waarin een STILLE herberekening de modus zonder undo-stap kon
 * verlaten: zowel `ensureFreshSchedule` (AI-leestools) als `recalculateStaleSleepingDocuments`
 * sturen op `scheduleStale`. Met deze regel is "modus aan én verouderd" onbereikbaar.
 *
 * Structureel getypeerd, want hij wordt zowel op een `AppState`-draft als op een `DocumentPayload`
 * van een SLAPEND document toegepast.
 */
export function markScheduleStale(s: { scheduleStale: boolean; datesAsRecorded: boolean }): void {
  if (s.datesAsRecorded) return;
  s.scheduleStale = true;
}
