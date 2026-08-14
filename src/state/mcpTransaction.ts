import { useAppStore } from './appStore';
import { createSnapshot, restoreSnapshot, type Snapshot } from './snapshot';
import { resetUndoCoalescing, setMcpTransactionActive } from './transaction';
import { generateId } from '@/utils/id';
import { formatDate } from '@/utils/dateUtils';
import { createDefaultTaskTime } from '@/utils/taskDefaults';
import { deriveWbsCodes, applyWbsNumbering } from '@/utils/wbs';
import { syncProjectCalendar } from './syncProjectCalendar';
import type { DurationType, Task } from '@/types/task';
import type { Sequence } from '@/types/sequence';
import type { WorkCalendar } from '@/types/calendar';
import type { Resource, ResourceAssignment, ResourceCurve } from '@/types/resource';
import type { Project } from '@/types/project';
import type { LevelingResult } from '@/engine/scheduler/ResourceLeveler';

/** Herintreedbaarheids-wachter: `true` zolang een `runInMcpTransaction` loopt. Los van de
 *  `beginUndoable`-suppressievlag in transaction.ts (die stuurt de mutators aan) — deze stuurt puur
 *  de reentrancy-guard. Module-lokaal en synchroon beheerd: de transactie draait zonder `await`, dus
 *  een geneste aanroep kan alleen synchroon vanuit de callback komen. */
let mcpTransactionInProgress = false;

/**
 * Het transactieprimitief van de MCP-bridge (spec §Werkpakket 0).
 *
 * "Eén bulk/batch = één undo-stap, één herberekening". Elke bestaande store-mutator pusht zelf een
 * undo-snapshot (via `beginUndoable`) en veel draaien zelf `runCPM`/`recompute*`. Om een reeks
 * mutaties tot ÉÉN atomaire, ongedaan-maakbare stap samen te voegen zet deze helper:
 *
 *   1. neemt zelf ÉÉN snapshot vooraf en pusht die op de undo-stack (nieuwe undoable actie ⇒
 *      redo-stack wissen), in een eigen `set()`-producer;
 *   2. zet de suppressie-vlag aan zodat elke `beginUndoable` binnen de callback een no-op is;
 *   3. draait `fn()` — die mag meerdere `set()`-producers doen (draft-primitieven, T2);
 *   4. zet de vlag weer uit (in een `finally`, dus óók bij een throw);
 *   5. draait ÉÉNMAAL de eindherberekening: `runCPM` (pusht per invariant a nooit een snapshot),
 *      `recomputeViewRows`, `recomputeResourceLoad`;
 *   6. bij een throw in `fn` óf een `cpmResult.error` ná stap 5: VOLLEDIGE rollback — de vooraf
 *      genomen snapshot terugzetten (`restoreSnapshot` herstelt óók `cpmResult`/kalenders/baselines,
 *      dus geen achterblijvende error-banner), de gepushte snapshot poppen, de redo-stack herstellen
 *      en `resetUndoCoalescing()`; return `{ ok: false }`;
 *   7. bij succes óók `resetUndoCoalescing()` — de handmatige push wijzigde de stackdiepte zonder de
 *      coalesce-marker te raken, en een latere keyed user-edit mag daar niet tegenaan coalescen.
 *
 * BEWUST: mutaties en `runCPM` leven in APARTE producers — genest `set()` binnen een Immer-producer
 * kan niet. De transactie draait volledig SYNCHROON (geen `await` tussen stappen), zodat de user
 * fysiek niet mid-transactie van document kan wisselen.
 *
 * NIET HERINTREEDBAAR: de suppressie-vlag en de vooraf-snapshot zijn gedeelde module-toestand; een
 * geneste aanroep zou een tweede snapshot pushen en de vlag te vroeg uitzetten. Daarom weigert een
 * aanroep terwijl er al een transactie loopt met een throw — de guard staat VÓÓR álle state-mutatie.
 * Roept de callback tóch een geneste transactie aan, dan propageert die throw naar de buitenste `try`
 * en rolt de buitenste transactie schoon terug ({ ok: false }, store/stacks onaangeroerd).
 *
 * BEKENDE BENIGNE RANDSTAAT: op een VERSE store staat `calendars: []` (de projectkalender leeft dan
 * alleen als cache in `s.calendar`). Het rollback-pad gebruikt `restoreSnapshot`, dat via
 * `syncProjectCalendar` (§9.1) de projectkalender-cache tot bibliotheek-entry promoot wanneer die
 * ontbreekt — ná een rollback op zo'n kaal document staat `cal-default` dus in de bibliotheek. Dit is
 * BESTAAND, app-breed restore-gedrag (undo/redo doet exact hetzelfde) en géén artefact van deze
 * transactie; op elk document dat al eens is hersteld of een bibliotheek-entry heeft, is het een no-op.
 */
export function runInMcpTransaction(fn: () => void): { ok: true } | { ok: false; error: string } {
  // Reentrancy-guard: VÓÓR elke state-mutatie. Een geneste aanroep zou de gedeelde module-toestand
  // (vlag + vooraf-snapshot) corrumperen — weigeren met een throw is het enige veilige gedrag.
  if (mcpTransactionInProgress) {
    throw new Error('runInMcpTransaction is niet herintreedbaar');
  }

  // Stap 1: snapshot van de PLAIN pre-transactie-staat (niet van een draft — zie beginUndoable/B1).
  const snapshot: Snapshot = createSnapshot(useAppStore.getState());
  // Redo-stack bewaren zodat een rollback exact terug is bij "vóór" (op succes wissen we hem, als
  // nieuwe undoable actie; bij rollback is er niets gebeurd en zetten we hem terug).
  const prevRedo = useAppStore.getState().redoStack;

  const rollback = (error: string): { ok: false; error: string } => {
    useAppStore.setState((s) => {
      restoreSnapshot(s, snapshot);
      s.undoStack.pop(); // de in stap 1 gepushte snapshot verwijderen (restoreSnapshot raakt undoStack niet)
      s.redoStack = prevRedo;
    });
    resetUndoCoalescing();
    return { ok: false, error };
  };

  // Stap 1 (vervolg): de vooraf-snapshot als enige undo-stap voor de hele transactie.
  useAppStore.setState((s) => {
    s.undoStack.push(snapshot);
    s.redoStack = [];
  });

  // Stap 2-4: reentrancy-wachter + suppressie aan, callback draaien, beide ALTIJD weer uit (finally,
  // óók bij een throw). De cpm-error-check en de rollback daarop staan bewust ná het finally.
  mcpTransactionInProgress = true;
  setMcpTransactionActive(true);
  try {
    fn();
  } catch (e) {
    return rollback(e instanceof Error ? e.message : String(e));
  } finally {
    mcpTransactionInProgress = false;
    setMcpTransactionActive(false);
  }

  // Stap 5: één eindherberekening (ná het finally: de suppressie-vlag staat nu uit).
  useAppStore.getState().runCPM();
  useAppStore.getState().recomputeViewRows();
  useAppStore.getState().recomputeResourceLoad();

  // Stap 6: een kringverwijzing (of andere solver-fout) ⇒ volledige rollback.
  const cpm = useAppStore.getState().cpmResult;
  if (cpm?.error) {
    return rollback(cpm.error);
  }

  // Stap 7: geslaagd — coalesce-marker resetten (de handmatige push wijzigde de stackdiepte).
  resetUndoCoalescing();
  return { ok: true };
}

// =================================================================================================
// Draft-primitieven (taak T2, spec §Werkpakket 0 "draft-primitieven vereist voor het hele
// batch-oppervlak").
//
// Elk primitief is een SNAPSHOT-VRIJE, RECOMPUTE-VRIJE variant van de bijbehorende store-actie,
// bedoeld om BINNEN `runInMcpTransaction` te draaien. Ze roepen bewust NIET `beginUndoable`,
// `finishMutation` of een recompute/`runCPM` aan: de transactie neemt zelf één snapshot vooraf en
// draait éénmaal de eindherberekening. Ze zijn ONAFHANKELIJK van de T1-suppressievlag — ze pushen
// überhaupt geen snapshot, dus of de vlag aan- of uitstaat maakt niet uit (buiten een transactie
// missen ze alleen de undo-stap/recompute, wat correct is: ze horen niet los aangeroepen te worden).
//
// Elk primitief muteert via een eigen `useAppStore.setState(...)`-Immer-producer (de gekozen
// consistente vorm) en zet `isDirty` (de `finishMutation`-tegenhanger); `scheduleStale` wordt bewust
// NIET gezet — de eind-`runCPM` van de transactie wist die vlag hoe dan ook.
//
// GUARD-SEMANTIEK: waar de store-actie op een triviale foutconditie STIL terugvalt (onbekend id,
// mijlpaal-/samenvattings-doeltaak, ongeldige eenheden), GOOIT het draft-primitief in plaats daarvan
// een herkenbare fout. Binnen een transactie propageert die throw naar `runInMcpTransaction`, dat
// schoon terugrolt ({ ok: false, error }); de tool-laag (T4+) vangt 'm en rapporteert per item.
// Rijkere validatie (bv. leaf-only-pre-checks) hoort in T4 — deze throws zijn de laatste vangrail.
// =================================================================================================

/** Geldige capaciteit/eenheden (spiegelt `isValidUnits` in resourceSlice, daar niet geëxporteerd):
 *  strikt positief en eindig. 0/negatief/NaN is nooit een geldige toewijzing. */
function isValidUnits(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n) && n > 0;
}

/**
 * Eén item van een `draft.addTasks`-bulk (spec §Werkpakket 2). Alle velden die `draft.addTask`
 * accepteert (via `Partial<Task>` — `name`, `time`, `taskType`, …), plus drie bulk-only velden:
 *  - `tempId`  — door de client gekozen, UNIEK binnen de call; wordt de sleutel in de terugmap.
 *  - `parentId` — een ECHT bestaand taak-id ÓF een `tempId` uit dezelfde call (voor geneste aanmaak).
 *  - `position` — insert-index binnen de ouder (`parent.childIds`, of de wortelvolgorde bij `null`);
 *    afwezig ⇒ achteraan. Een out-of-range index klemt STIL naar `[0, lengte]` (negatief ⇒ 0,
 *    te groot ⇒ achteraan) — geen fout; de tool-schema-beschrijving (T19) leunt op deze regel.
 */
export type BulkTaskItem = Partial<Task> & {
  name: string;
  tempId: string;
  position?: number;
};

export const draft = {
  /**
   * Snapshot/recompute-vrije variant van de store-`addTask`: zelfde veld-afleiding (TaskTime-defaults,
   * mijlpaal ⇒ duur 0 tenzij expliciete `time`, anker op `s.project.startDate`, WBS-afleiding,
   * `parent.childIds` gevuld). Retourneert het nieuwe id. Een opgegeven-maar-ONBEKENDE `parentId`
   * valt hier NIET stil op root terug (zoals de UI-`position`-tolerantie) maar GOOIT — een batch die
   * naar een niet-bestaande ouder wijst is een fout, niet een stille root-taak.
   */
  addTask(partial: Partial<Task> & { name: string }): string {
    const id = generateId('task');
    useAppStore.setState((s) => {
      const now = s.project.startDate || formatDate(new Date());
      const parentId = partial.parentId ?? null;
      // Onbekende parentId ⇒ herkenbare fout (VÓÓR enige mutatie, dus geen halve state).
      const parentTask = parentId !== null ? s.tasks.find((t) => t.id === parentId) : undefined;
      if (parentId !== null && !parentTask) {
        throw new Error(`draft.addTask: onbekende parentId '${parentId}'`);
      }

      const task: Task = {
        id,
        name: partial.name,
        description: partial.description || '',
        wbsCode: partial.wbsCode || '',
        // Overerving (2026-08-14): zie taskSlice.ts addTask — zelfde regel, MCP-pad (ook gebruikt
        // door draft.addTasks, die top-down per item deze functie aanroept).
        taskType: partial.taskType || parentTask?.taskType || (s.ui.constructionMode ? 'CONSTRUCTION' : 'USERDEFINED'),
        status: partial.status || 'NOT_STARTED',
        isMilestone: partial.isMilestone || false,
        milestoneKind: partial.milestoneKind,
        mandatory: partial.mandatory,
        priority: partial.priority ?? 500,
        parentId,
        childIds: [],
        time: partial.time || createDefaultTaskTime(now, partial.isMilestone ? 0 : 5),
        resourceIds: partial.resourceIds || [],
        color: partial.color,
        constraint: partial.constraint,
        constraint2: partial.constraint2,
        isHammock: partial.isHammock,
        externalLinks: partial.externalLinks,
        deadline: partial.deadline,
        calendarId: partial.calendarId,
        notes: partial.notes,
      };

      s.tasks.push(task);
      if (parentId) {
        const parent = s.tasks.find((t) => t.id === parentId);
        if (parent) parent.childIds.push(id);
      }

      // WBS: auto-nummering ⇒ hele boom; anders alleen deze taak een afgeleide code geven wanneer de
      // aanroeper er geen meegaf (lege codes breken de CSV/MSP-koppeling).
      if (s.project.wbsAutoNumber) {
        applyWbsNumbering(s.tasks);
      } else if (!partial.wbsCode) {
        task.wbsCode = deriveWbsCodes(s.tasks).get(id) ?? '';
      }

      s.isDirty = true;
    });
    return id;
  },

  /**
   * Geneste WBS in ÉÉN aanroep (spec §Werkpakket 2). Maakt een reeks taken aan die naar elkaar mogen
   * verwijzen via client-gekozen `tempId`'s, en retourneert de VOLLEDIGE `tempId`→`realId`-map van
   * álle aangemaakte taken (ook diep genest). Bedoeld om BINNEN `runInMcpTransaction` te draaien (net
   * als de andere draft-primitieven: geen eigen snapshot/recompute).
   *
   * PRE-VALIDATIE (VÓÓR de eerste `draft.addTask`-aanroep — een falende batch laat NUL taken achter;
   * de transactie rolt sowieso terug, maar de pre-check maakt de fout goedkoop en de message precies):
   *   - dubbele `tempId` binnen de call ⇒ throw;
   *   - `parentId` die geen bestaand taak-id én geen `tempId` uit de call is ⇒ throw (noemt de boosdoener);
   *   - mijlpaal met een expliciete `time` van duur > 0 ⇒ throw (WP7-regel, hier als aanmaak-validatie);
   *   - cykel in `tempId`-parents (a onder b, b onder a) ⇒ throw.
   *
   * AANMAAK is TOP-DOWN: de items worden topologisch gesorteerd zodat een ouder altijd vóór zijn
   * kinderen wordt aangemaakt (tempId-parents mogen in willekeurige — ook omgekeerde — inputvolgorde
   * staan). Elk item loopt via `draft.addTask` (append), met de `tempId`-parent vertaald naar het echte
   * id uit de tot dan toe opgebouwde map.
   *
   * POSITIE: `position` is de insert-index binnen `parent.childIds` (of de wortelvolgorde bij een
   * `null`-ouder). Om `childIds`-volgorde (zichtbaar, visibleRows.ts) én rauwe-array-volgorde (WBS-
   * nummering, wbs.ts/flattenOrder) consistent te houden — precies zoals de store-`addTask` met een
   * anker doet — worden BEIDE bijgewerkt. Een out-of-range `position` klemt STIL naar `[0, lengte]`
   * (negatieve index ⇒ 0, index > aantal siblings ⇒ achteraan) — dit is bewust geen fout. Items met
   * een positie worden in INPUTvolgorde toegepast (meerdere posities in dezelfde ouder stapelen dus
   * voorspelbaar).
   */
  addTasks(items: BulkTaskItem[]): Map<string, string> {
    // ---- Pre-validatie (VÓÓR enige mutatie) ----------------------------------------------------
    // 1) Dubbele tempId's binnen de call.
    const tempIds = new Set<string>();
    for (const item of items) {
      if (tempIds.has(item.tempId)) {
        throw new Error(`draft.addTasks: dubbele tempId '${item.tempId}' binnen de call`);
      }
      tempIds.add(item.tempId);
    }

    // 2) Elke parentId moet een bestaand taak-id ÓF een tempId uit de call zijn.
    const existingIds = new Set(useAppStore.getState().tasks.map((t) => t.id));
    for (const item of items) {
      const p = item.parentId ?? null;
      if (p !== null && !existingIds.has(p) && !tempIds.has(p)) {
        throw new Error(
          `draft.addTasks: onbekende parentId '${p}' (geen bestaand taak-id en geen tempId uit de call)`,
        );
      }
    }

    // 3) Mijlpaal met expliciete duur > 0 (WP7: een mijlpaal is per definitie duur 0).
    for (const item of items) {
      if (item.isMilestone && item.time && item.time.scheduleDuration > 0) {
        throw new Error(
          `draft.addTasks: mijlpaal '${item.tempId}' mag geen duur > 0 hebben (scheduleDuration=${item.time.scheduleDuration})`,
        );
      }
    }

    // 4) Topologische sort (ouders vóór kinderen) met cykeldetectie op tempId-parents.
    const byTempId = new Map(items.map((it) => [it.tempId, it]));
    const visitState = new Map<string, 1 | 2>(); // 1 = in behandeling, 2 = klaar
    const sorted: BulkTaskItem[] = [];
    const visit = (item: BulkTaskItem) => {
      const st = visitState.get(item.tempId);
      if (st === 2) return;
      if (st === 1) throw new Error(`draft.addTasks: cykel in tempId-parents rond '${item.tempId}'`);
      visitState.set(item.tempId, 1);
      const p = item.parentId ?? null;
      if (p !== null && tempIds.has(p)) visit(byTempId.get(p)!);
      visitState.set(item.tempId, 2);
      sorted.push(item);
    };
    for (const item of items) visit(item);

    // ---- Aanmaak (top-down, via draft.addTask) -------------------------------------------------
    const idMap = new Map<string, string>();
    for (const item of sorted) {
      // tempId/position zijn bulk-only; de rest is een gewoon draft.addTask-payload.
      const { tempId, position: _position, parentId, ...taskFields } = item;
      const rawParent = parentId ?? null;
      // Een tempId-parent vertalen naar zijn echte id; een bestaand id blijft zichzelf.
      const resolvedParent =
        rawParent !== null && idMap.has(rawParent) ? idMap.get(rawParent)! : rawParent;
      const realId = draft.addTask({ ...taskFields, parentId: resolvedParent });
      idMap.set(tempId, realId);
    }

    // ---- Positie (in INPUTvolgorde) ------------------------------------------------------------
    const positioned = items.filter((it) => it.position !== undefined);
    if (positioned.length > 0) {
      useAppStore.setState((s) => {
        for (const item of positioned) {
          const id = idMap.get(item.tempId)!;
          const task = s.tasks.find((t) => t.id === id);
          if (!task) continue;
          const pos = item.position!;

          if (task.parentId) {
            const parent = s.tasks.find((t) => t.id === task.parentId);
            if (!parent) continue;
            // childIds: uit de huidige slot halen en op de geklemde index herinvoegen.
            const curChild = parent.childIds.indexOf(id);
            if (curChild >= 0) parent.childIds.splice(curChild, 1);
            const clamped = Math.max(0, Math.min(pos, parent.childIds.length));
            parent.childIds.splice(clamped, 0, id);
            // Rauwe array: sibling-array-volgorde gelijktrekken met childIds (flattenOrder/WBS leest
            // array-volgorde onder de ouder). De taak vóór de opvolgende sibling inschuiven (of ná de
            // voorgaande sibling / direct ná de ouder als enig kind).
            const curArr = s.tasks.findIndex((t) => t.id === id);
            const [obj] = s.tasks.splice(curArr, 1);
            const nextId = parent.childIds[clamped + 1];
            let insertAt: number;
            if (nextId !== undefined) {
              insertAt = s.tasks.findIndex((t) => t.id === nextId);
            } else {
              const prevId = parent.childIds[clamped - 1];
              insertAt =
                prevId !== undefined
                  ? s.tasks.findIndex((t) => t.id === prevId) + 1
                  : s.tasks.findIndex((t) => t.id === task.parentId) + 1;
            }
            s.tasks.splice(insertAt, 0, obj);
          } else {
            // Wortel: de zichtbare/WBS-wortelvolgorde IS de array-volgorde onder de wortels.
            const curArr = s.tasks.findIndex((t) => t.id === id);
            const [obj] = s.tasks.splice(curArr, 1);
            const rootIds = s.tasks.filter((t) => !t.parentId).map((t) => t.id);
            const clamped = Math.max(0, Math.min(pos, rootIds.length));
            const nextRootId = rootIds[clamped];
            const insertAt =
              nextRootId !== undefined ? s.tasks.findIndex((t) => t.id === nextRootId) : s.tasks.length;
            s.tasks.splice(insertAt, 0, obj);
          }
        }
        // WBS-auto-nummering herafleiden nu de volgorde definitief is (spiegelt draft.addTask).
        if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
        s.isDirty = true;
      });
    }

    return idMap;
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`addSequence`: dedup op (predecessor, successor,
   * type) — meerdere relatietypes tussen hetzelfde paar blijven toegestaan. Retourneert het nieuwe id,
   * of `null` wanneer een exact duplicaat is genegeerd.
   */
  addSequence(seq: Omit<Sequence, 'id'>): string | null {
    const id = generateId('seq');
    let result: string | null = null;
    useAppStore.setState((s) => {
      const exists = s.sequences.some(
        (e) => e.predecessorId === seq.predecessorId && e.successorId === seq.successorId && e.type === seq.type,
      );
      if (exists) return; // duplicaat: result blijft null
      s.sequences.push({ ...seq, id });
      s.isDirty = true;
      result = id;
    });
    return result;
  },

  /**
   * Kale veld-merge op een taak (snapshot/recompute-vrij), ZONDER de voortgangsinvarianten — die
   * lopen in T4 via de dedicated invariant-setters. Onbekend id ⇒ stille no-op (zoals de store-
   * `updateTask`); geen throw, want een leeg-effect-merge is geen structurele fout.
   *
   * `time` wordt bewust SHALLOW GEMERGED in plaats van vervangen: een `Object.assign` van de hele
   * `time`-tak wiste anders in één klap de CPM-datums, floats, actuals en completion van elke sleutel
   * die de aanroeper niet toevallig meestuurde. De MCP-toollaag zet `time` sowieso niet meer
   * rechtstreeks (zie `patchTaskFields` + `taskFields.ts`); deze merge is de vangrail voor elke
   * andere aanroeper.
   */
  updateTaskFields(id: string, updates: Partial<Task>): void {
    useAppStore.setState((s) => {
      const idx = s.tasks.findIndex((t) => t.id === id);
      if (idx < 0) return;
      const { time, ...rest } = updates;
      Object.assign(s.tasks[idx], rest);
      if (time) Object.assign(s.tasks[idx].time, time);
      s.isDirty = true;
    });
  },

  /**
   * VELD-VOOR-VELD-patch op een taak (snapshot/recompute-vrij): top-level velden plus expliciet
   * benoemde `time`-SLEUTELS. Bedoeld voor de MCP-toollaag, die zijn invoer eerst door de allowlist
   * van `services/mcp/tools/taskFields.ts` haalt.
   *
   * Verschil met `updateTaskFields`: hier kan een aanroeper per constructie geen hele geneste tak
   * meegeven — `timePatch` kent alleen `scheduleDuration`, `durationType` en de expliciete
   * `clearDurationMinutes`. Dat laatste is nodig omdat `durationMinutes` op een uur-kalender de BRON
   * VAN WAARHEID is (`durationDaysOf`): een achtergebleven minutenwaarde zou een zojuist gezette
   * dag-duur stil overrulen. `delete` (niet `= undefined`) houdt het Task-object schoon voor de
   * IFC-round-trip. Onbekend id ⇒ stille no-op (zoals `updateTaskFields`).
   */
  patchTaskFields(
    id: string,
    top: Partial<Task>,
    timePatch?: { scheduleDuration?: number; durationType?: DurationType; clearDurationMinutes?: boolean },
  ): void {
    useAppStore.setState((s) => {
      const idx = s.tasks.findIndex((t) => t.id === id);
      if (idx < 0) return;
      const task = s.tasks[idx];
      Object.assign(task, top);
      if (timePatch) {
        if (timePatch.scheduleDuration !== undefined) task.time.scheduleDuration = timePatch.scheduleDuration;
        if (timePatch.durationType !== undefined) task.time.durationType = timePatch.durationType;
        if (timePatch.clearDurationMinutes) delete task.time.durationMinutes;
      }
      s.isDirty = true;
    });
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`deleteTask`: verwijdert de taak + al haar
   * (klein)kinderen recursief, en ruimt relaties, assignments, selectie én de `childIds`-verwijzing
   * bij de ouder op. Onbekend id ⇒ stille no-op (zoals de store).
   */
  deleteTask(id: string): void {
    useAppStore.setState((s) => {
      const task = s.tasks.find((t) => t.id === id);
      if (!task) return;

      if (task.parentId) {
        const parent = s.tasks.find((t) => t.id === task.parentId);
        if (parent) parent.childIds = parent.childIds.filter((cid) => cid !== id);
      }

      const removeIds = new Set<string>();
      const collectChildren = (taskId: string) => {
        removeIds.add(taskId);
        const t = s.tasks.find((tt) => tt.id === taskId);
        if (t) t.childIds.forEach(collectChildren);
      };
      collectChildren(id);

      s.tasks = s.tasks.filter((t) => !removeIds.has(t.id));
      s.sequences = s.sequences.filter(
        (seq) => !removeIds.has(seq.predecessorId) && !removeIds.has(seq.successorId),
      );
      s.assignments = s.assignments.filter((a) => !removeIds.has(a.taskId));
      s.selectedTaskIds = s.selectedTaskIds.filter((sid) => !removeIds.has(sid));
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      s.isDirty = true;
    });
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`addCalendar`: voegt een bibliotheek-kalender toe
   * en houdt de gedenormaliseerde projectkalender-cache (`s.calendar`) in sync (`syncProjectCalendar`,
   * §9.1 — dat is cache-sync, geen snapshot/recompute). Retourneert het nieuwe id.
   */
  addCalendar(cal: Omit<WorkCalendar, 'id'>): string {
    const id = generateId('cal');
    useAppStore.setState((s) => {
      s.calendars.push({ ...cal, id });
      syncProjectCalendar(s);
      s.isDirty = true;
    });
    return id;
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`updateCalendar`: merge-t velden op een
   * bibliotheek-kalender en synct de projectkalender-cache (§9.1). Onbekend id ⇒ herkenbare fout
   * (de tool-laag WP5 valideert dat vooraf; dit is de vangrail).
   */
  updateCalendar(id: string, updates: Partial<WorkCalendar>): void {
    useAppStore.setState((s) => {
      const idx = s.calendars.findIndex((c) => c.id === id);
      if (idx < 0) throw new Error(`draft.updateCalendar: onbekende kalender-id '${id}'`);
      Object.assign(s.calendars[idx], updates);
      syncProjectCalendar(s);
      s.isDirty = true;
    });
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`addResource`. Retourneert het nieuwe id. De
   * eenheden-guard (§2.4) is hier — net als bij `assignResource` — een FOUT i.p.v. een stille
   * terugval: een resource met 0/negatieve capaciteit is nooit bedoeld.
   */
  addResource(res: Omit<Resource, 'id'>): string {
    const id = generateId('res');
    useAppStore.setState((s) => {
      if (!isValidUnits(res.maxUnits)) {
        throw new Error(`draft.addResource: ongeldige maxUnits ${String(res.maxUnits)} (strikt positief vereist)`);
      }
      s.resources.push({ ...res, id });
      s.isDirty = true;
    });
    return id;
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`updateResource`. Onbekend id ⇒ herkenbare fout
   * (de store-actie valt stil terug; de tool-laag pre-valideert, dit is de vangrail).
   *
   * TWEE BEWUSTE AFWIJKINGEN van de store-actie:
   *   1. GEEN "weigeren-met-behoud" op `maxUnits`. De UI filtert een ongeldige capaciteit stil uit de
   *      patch (comfort bij tikken in een invoerveld); via de bridge zou dat precies het veld stil
   *      laten verdampen dat de aanroeper wilde zetten — dus fout.
   *   2. Een sleutel met waarde `undefined` VERWIJDERT het veld (`delete`) i.p.v. het op `undefined`
   *      te zetten. Zo is een gewist optioneel veld (`costPerHour`, `calendarId`, …) niet te
   *      onderscheiden van een veld dat er nooit was — dat houdt het object schoon voor de
   *      IFC-round-trip (zelfde regel als `patchTaskFields`).
   */
  updateResource(id: string, updates: Partial<Resource>): void {
    useAppStore.setState((s) => {
      const idx = s.resources.findIndex((r) => r.id === id);
      if (idx < 0) throw new Error(`draft.updateResource: onbekende resource-id '${id}'`);
      if ('maxUnits' in updates && !isValidUnits(updates.maxUnits)) {
        throw new Error(`draft.updateResource: ongeldige maxUnits ${String(updates.maxUnits)} (strikt positief vereist)`);
      }
      const target = s.resources[idx] as unknown as Record<string, unknown>;
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined) delete target[key];
        else target[key] = value;
      }
      s.isDirty = true;
    });
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`removeResource`: verwijdert de resource, ÁL zijn
   * toewijzingen, de verweesde `task.resourceIds`-verwijzingen en het ploeg-lidmaatschap van zijn
   * leden (`parentId`). Onbekend id ⇒ herkenbare fout.
   *
   * Retourneert het VOLLEDIGE voor/na-verschil, zodat de tool-laag exact kan rapporteren wat er
   * meeging in plaats van het te schatten (audit-bevinding M1 bij `delete_tasks`: een cascade die
   * niet volledig gerapporteerd wordt, leest als "er is niets anders gebeurd").
   */
  removeResource(id: string): {
    removedAssignmentIds: string[];
    affectedTaskIds: string[];
    orphanedCrewMemberIds: string[];
  } {
    const report = { removedAssignmentIds: [] as string[], affectedTaskIds: [] as string[], orphanedCrewMemberIds: [] as string[] };
    useAppStore.setState((s) => {
      if (!s.resources.some((r) => r.id === id)) {
        throw new Error(`draft.removeResource: onbekende resource-id '${id}'`);
      }
      // Voor/na vastleggen VÓÓR de filters (strings uit de draft kopiëren, geen draft-referenties).
      const doomed = s.assignments.filter((a) => a.resourceId === id);
      report.removedAssignmentIds = doomed.map((a) => String(a.id));
      report.affectedTaskIds = [...new Set(doomed.map((a) => String(a.taskId)))];
      report.orphanedCrewMemberIds = s.resources.filter((r) => r.parentId === id).map((r) => String(r.id));

      s.resources = s.resources.filter((r) => r.id !== id);
      s.assignments = s.assignments.filter((a) => a.resourceId !== id);
      for (const task of s.tasks) {
        const idx = task.resourceIds.indexOf(id);
        if (idx >= 0) task.resourceIds.splice(idx, 1);
      }
      // Ploeg-lidmaatschap opruimen: leden van een verwijderde CREW vallen terug op geen ouder.
      // `delete` i.p.v. `= undefined` — zie de noot bij updateResource (IFC-round-trip).
      for (const r of s.resources) {
        if (r.parentId === id) delete r.parentId;
      }
      s.isDirty = true;
    });
    return report;
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`assignResource`. Leaf-only/mijlpaal-guard en
   * eenheden-validatie (§2.4) worden hier tot FOUT verheven i.p.v. stil genegeerd (de tool-laag T4
   * pre-valideert; dit is de vangrail). Retourneert het nieuwe assignment-id.
   */
  assignResource(taskId: string, resourceId: string, unitsPerDay: number, curve?: ResourceCurve): string {
    const id = generateId('asgn');
    useAppStore.setState((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) throw new Error(`draft.assignResource: onbekende taskId '${taskId}'`);
      if (task.isMilestone || task.childIds.length > 0) {
        throw new Error(`draft.assignResource: kan geen resource toewijzen aan een mijlpaal/samenvattingstaak '${taskId}'`);
      }
      if (!isValidUnits(unitsPerDay)) {
        throw new Error(`draft.assignResource: ongeldige unitsPerDay ${String(unitsPerDay)} (strikt positief vereist)`);
      }
      s.assignments.push({ id, taskId, resourceId, unitsPerDay, curve });
      if (!task.resourceIds.includes(resourceId)) task.resourceIds.push(resourceId);
      s.isDirty = true;
    });
    return id;
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`updateAssignment`. Onbekend id ⇒ fout. Behoudt de
   * store-"weiger-met-behoud"-semantiek: een ongeldige `unitsPerDay` wordt uit de patch gefilterd,
   * een gelijktijdige `curve`-wijziging gaat wél door.
   */
  updateAssignment(assignmentId: string, updates: Partial<Pick<ResourceAssignment, 'unitsPerDay' | 'curve'>>): void {
    useAppStore.setState((s) => {
      const idx = s.assignments.findIndex((a) => a.id === assignmentId);
      if (idx < 0) throw new Error(`draft.updateAssignment: onbekende assignmentId '${assignmentId}'`);
      let patch = updates;
      if ('unitsPerDay' in patch && !isValidUnits(patch.unitsPerDay)) {
        patch = { ...patch };
        delete patch.unitsPerDay;
      }
      if (Object.keys(patch).length === 0) return;
      Object.assign(s.assignments[idx], patch);
      s.isDirty = true;
    });
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`moveAssignment`: verplaatst een toewijzing naar
   * `newTaskId` (units/curve blijven ongewijzigd) en werkt `resourceIds` op oude én nieuwe taak bij.
   * De store-guards (onbekend id, mijlpaal-/samenvattings-doel, dubbele resource-op-taak) worden hier
   * tot FOUT verheven i.p.v. `false` terug te geven.
   */
  moveAssignment(assignmentId: string, newTaskId: string): void {
    useAppStore.setState((s) => {
      const assignment = s.assignments.find((a) => a.id === assignmentId);
      if (!assignment) throw new Error(`draft.moveAssignment: onbekende assignmentId '${assignmentId}'`);
      const newTask = s.tasks.find((t) => t.id === newTaskId);
      if (!newTask) throw new Error(`draft.moveAssignment: onbekende taskId '${newTaskId}'`);
      if (newTask.isMilestone || newTask.childIds.length > 0) {
        throw new Error(`draft.moveAssignment: doeltaak '${newTaskId}' is een mijlpaal/samenvattingstaak`);
      }
      const alreadyOnTarget = s.assignments.some(
        (a) => a.taskId === newTaskId && a.resourceId === assignment.resourceId,
      );
      if (alreadyOnTarget) {
        throw new Error(`draft.moveAssignment: resource '${assignment.resourceId}' is al toegewezen aan taak '${newTaskId}'`);
      }

      const oldTaskId = assignment.taskId;
      assignment.taskId = newTaskId;

      const stillOnOld = s.assignments.some(
        (a) => a.taskId === oldTaskId && a.resourceId === assignment.resourceId,
      );
      if (!stillOnOld) {
        const oldTask = s.tasks.find((t) => t.id === oldTaskId);
        const idx = oldTask?.resourceIds.indexOf(assignment.resourceId) ?? -1;
        if (oldTask && idx >= 0) oldTask.resourceIds.splice(idx, 1);
      }
      if (!newTask.resourceIds.includes(assignment.resourceId)) {
        newTask.resourceIds.push(assignment.resourceId);
      }
      s.isDirty = true;
    });
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`unassignResource`: verwijdert de toewijzing en
   * schoont `task.resourceIds` op wanneer er geen andere toewijzing van dezelfde resource op de taak
   * resteert. Onbekend id ⇒ fout.
   */
  unassignResource(assignmentId: string): void {
    useAppStore.setState((s) => {
      const removed = s.assignments.find((a) => a.id === assignmentId);
      if (!removed) throw new Error(`draft.unassignResource: onbekende assignmentId '${assignmentId}'`);
      s.assignments = s.assignments.filter((a) => a.id !== assignmentId);
      const stillAssigned = s.assignments.some(
        (a) => a.taskId === removed.taskId && a.resourceId === removed.resourceId,
      );
      if (!stillAssigned) {
        const task = s.tasks.find((t) => t.id === removed.taskId);
        const idx = task?.resourceIds.indexOf(removed.resourceId) ?? -1;
        if (task && idx >= 0) task.resourceIds.splice(idx, 1);
      }
      s.isDirty = true;
    });
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`applyLeveling`: schrijft alle `levelingDelay`-
   * waarden (idempotent — reset eerst álles, dan de nieuwe delays). GEEN eigen `runCPM`: de transactie
   * herrekent aan het eind en verwerkt de delays dan precies één keer.
   */
  applyLeveling(result: LevelingResult): void {
    useAppStore.setState((s) => {
      for (const task of s.tasks) {
        const d = result.delays[task.id];
        task.levelingDelay = d !== undefined && d > 0 ? d : undefined;
      }
      s.isDirty = true;
    });
  },

  /** Snapshot/recompute-vrije variant van de store-`clearLeveling`: zet alle `levelingDelay` terug op
   *  undefined. GEEN eigen `runCPM` (de transactie herrekent). */
  clearLeveling(): void {
    useAppStore.setState((s) => {
      for (const task of s.tasks) task.levelingDelay = undefined;
      s.isDirty = true;
    });
  },

  /**
   * Snapshot/recompute-vrije variant van de store-`setProject`: merge-t projectvelden en bumpt
   * `modifiedAt`. Ankert alleen NIEUWE taken op `startDate` (bestaande planning verschuift niet — dat
   * is `moveProject`). De store-no-op-guard (`projectChanges`) wordt hier weggelaten: binnen een
   * transactie is de snapshot al genomen, dus een leeg-effect-merge kost niets extra's.
   */
  setProject(updates: Partial<Project>): void {
    useAppStore.setState((s) => {
      Object.assign(s.project, updates);
      s.project.modifiedAt = new Date().toISOString();
      s.isDirty = true;
    });
  },
};
