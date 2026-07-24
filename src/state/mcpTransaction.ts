import { useAppStore } from './appStore';
import { createSnapshot, restoreSnapshot, type Snapshot } from './snapshot';
import { resetUndoCoalescing, setMcpTransactionActive } from './transaction';
import { generateId } from '@/utils/id';
import { formatDate } from '@/utils/dateUtils';
import { createDefaultTaskTime } from '@/utils/taskDefaults';
import { deriveWbsCodes, applyWbsNumbering } from '@/utils/wbs';
import { syncProjectCalendar } from './syncProjectCalendar';
import type { Task } from '@/types/task';
import type { Sequence } from '@/types/sequence';
import type { WorkCalendar } from '@/types/calendar';
import type { ResourceAssignment, ResourceCurve } from '@/types/resource';
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
      if (parentId !== null && !s.tasks.some((t) => t.id === parentId)) {
        throw new Error(`draft.addTask: onbekende parentId '${parentId}'`);
      }

      const task: Task = {
        id,
        name: partial.name,
        description: partial.description || '',
        wbsCode: partial.wbsCode || '',
        taskType: partial.taskType || (s.ui.constructionMode ? 'CONSTRUCTION' : 'USERDEFINED'),
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
   */
  updateTaskFields(id: string, updates: Partial<Task>): void {
    useAppStore.setState((s) => {
      const idx = s.tasks.findIndex((t) => t.id === id);
      if (idx < 0) return;
      Object.assign(s.tasks[idx], updates);
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
