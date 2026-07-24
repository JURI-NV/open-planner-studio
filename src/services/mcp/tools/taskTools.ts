// MCP-toolmodule (taak T19, spec §Tool-set Muteren + §Overig): mutatietools voor taken en relaties,
// plus undo/redo en run_cpm. Alle namen dragen de service-prefix `planner_` (spec §Naamgeving); elke
// tool draagt een beschrijving (de AI kiest tools op beschrijving) en de standaard MCP-annotaties.
//
// Alle échte mutaties lopen via `runMutateTool` → `runInMcpTransaction`: één undo-stap, één
// herberekening, géén bestands-/save-side-effects. Per-item-weigeringen zijn ZACHT (spec §batch: één
// rotte regel rolt nooit alles terug) en komen als `itemRejections` terug; structurele fouten
// (kringverwijzing, taak-niet-gevonden bij een enkelvoudige tool) zijn HARD via `McpStepError`.
//
// `undo`/`redo`/`run_cpm` lopen NIET via de transactie (ze beheren hun eigen undo-stack, resp. zijn
// een pure herberekening) maar wél via dezelfde guards (`guardNonTransactional`).
import type { McpContext, McpToolDef, McpToolOk, McpToolResult } from '../contracts';
import {
  buildEnvelope,
  guardNonTransactional,
  McpStepError,
  runMutateTool,
  toolError,
  type MutationOutcome,
} from './runtime';
import { useAppStore } from '@/state/appStore';
import { draft, type BulkTaskItem } from '@/state/mcpTransaction';
import { validate, progress } from '@/state/mcpValidation';
import type { SequenceType } from '@/types/sequence';

const SEQ_TYPES: SequenceType[] = ['FINISH_START', 'FINISH_FINISH', 'START_START', 'START_FINISH'];
const isSeqType = (v: unknown): v is SequenceType => typeof v === 'string' && (SEQ_TYPES as string[]).includes(v);

const STD_ANNOT = { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false };

// --- gedeelde helpers ----------------------------------------------------------------------------

/** Envelop voor de niet-transactionele tools (undo/redo/run_cpm): store-envelop + context-vlaggen. */
function okEnvelope(ctx: McpContext) {
  const env = buildEnvelope();
  env.paused = ctx.paused;
  env.readOnly = ctx.readOnly;
  return env;
}

/** Herrekende datums per taak (na de eind-runCPM uit de store gelezen). */
function freshDates(ids: string[]): { id: string; earlyStart: string; earlyFinish: string }[] {
  const tasks = useAppStore.getState().tasks;
  return ids.map((id) => {
    const t = tasks.find((x) => x.id === id);
    return { id, earlyStart: t?.time.earlyStart ?? '', earlyFinish: t?.time.earlyFinish ?? '' };
  });
}

/** Projecteinde + optioneel de capped-taken (onwerkbaar-venster-signaal) uit het verse cpmResult. */
function projectEndInfo(): { projectEnd: string; cappedTaskIds?: string[] } {
  const cpm = useAppStore.getState().cpmResult;
  const cappedTaskIds = cpm?.cappedTaskIds && cpm.cappedTaskIds.length > 0 ? cpm.cappedTaskIds : undefined;
  return { projectEnd: cpm?.projectEnd ?? '', ...(cappedTaskIds ? { cappedTaskIds } : {}) };
}

/** Vervang de `data` van een geslaagd resultaat door een verrijkte payload (post-transactie gelezen). */
function enrichOk(res: McpToolResult, build: () => unknown): McpToolResult {
  if (res.ok) (res as McpToolOk).data = build();
  return res;
}

// =================================================================================================
// planner_add_tasks
// =================================================================================================
const addTasks: McpToolDef = {
  name: 'planner_add_tasks',
  description:
    'Maak één of meer taken aan (geneste WBS in één call). Elk item heeft een client-gekozen `tempId` ' +
    '(uniek binnen de call); `parentId` mag een bestaand taak-id of een `tempId` uit dezelfde call zijn. ' +
    '`position` is de invoeg-index binnen de ouder en klemt stil naar [0, aantal siblings]. Een mijlpaal ' +
    '(`isMilestone`) heeft per definitie duur 0. Retourneert de volledige tempId→realId-map, de herrekende ' +
    'earlyStart/earlyFinish per aangemaakte taak en het projecteinde.',
  kind: 'mutate',
  batchable: true,
  annotations: { ...STD_ANNOT },
  inputSchema: {
    type: 'object',
    properties: {
      tasks: {
        type: 'array',
        minItems: 1,
        description: 'De aan te maken taken (top-down aangemaakt; tempId-parents mogen in willekeurige volgorde staan).',
        items: {
          type: 'object',
          required: ['tempId', 'name'],
          properties: {
            tempId: { type: 'string', description: 'Client-gekozen tijdelijk id, uniek binnen de call; sleutel in de terugmap.' },
            name: { type: 'string' },
            parentId: { type: 'string', description: 'Bestaand taak-id of een tempId uit dezelfde call; weglaten = wortel.' },
            position: { type: 'integer', description: 'Invoeg-index binnen de ouder; klemt stil naar [0, aantal siblings].' },
            isMilestone: { type: 'boolean', description: 'Mijlpaal (duur 0).' },
            description: { type: 'string' },
          },
        },
      },
    },
    required: ['tasks'],
  },
  async handler(args, ctx) {
    const a = args as { tasks?: unknown };
    if (!Array.isArray(a.tasks) || a.tasks.length === 0) {
      return toolError(ctx, 'VALIDATION', 'add_tasks vereist een niet-lege `tasks`-array');
    }
    for (const it of a.tasks) {
      if (!it || typeof (it as any).tempId !== 'string' || typeof (it as any).name !== 'string') {
        return toolError(ctx, 'VALIDATION', 'elk taak-item vereist een string-`tempId` en -`name`');
      }
    }
    const tasks = a.tasks as BulkTaskItem[];
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      const map = draft.addTasks(tasks);
      return { data: { created: Object.fromEntries(map) } };
    });
    return enrichOk(res, () => {
      const created = (res as McpToolOk).data as { created: Record<string, string> };
      const { projectEnd, cappedTaskIds } = projectEndInfo();
      return {
        created: created.created,
        tasks: freshDates(Object.values(created.created)),
        projectEnd,
        ...(cappedTaskIds ? { cappedTaskIds } : {}),
      };
    });
  },
};

// =================================================================================================
// planner_update_tasks
// =================================================================================================
const FORBIDDEN_PROGRESS_IN_FIELDS = (fields: any): string | null => {
  if (fields && typeof fields === 'object') {
    if ('status' in fields) return 'gebruik `progress`, niet `fields.status`, voor voortgang';
    const time = fields.time;
    if (time && typeof time === 'object' && ('completion' in time || 'actualStart' in time || 'actualFinish' in time)) {
      return 'gebruik `progress`, niet `fields.time.*`, voor voortgang/actuals';
    }
  }
  return null;
};

const updateTasks: McpToolDef = {
  name: 'planner_update_tasks',
  description:
    'Wijzig bestaande taken. Per item: `fields` (kale veld-merge — naam, duur, constraints, kalender; ' +
    'GEEN voortgangsvelden) en/of `progress` (voortgangspad: `completion` in PROCENTEN 0–100, optioneel ' +
    '`actualStart`/`actualFinish` als ISO-datum). Voortgang > 0 leidt de actualStart af; actuals ná de ' +
    'projectstatusdatum of buiten 0–100 worden per item zacht geweigerd — geldige items blijven staan. ' +
    'Hefboom-tip: hypothetische uitloop = duur of SNET-constraint (via `fields`); geregistreerde voortgang ' +
    '= actuals mét statusdatum (via `progress`).',
  kind: 'mutate',
  batchable: true,
  annotations: { ...STD_ANNOT },
  inputSchema: {
    type: 'object',
    properties: {
      updates: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' },
            fields: { type: 'object', description: 'Kale veld-merge (Partial<Task>) zonder voortgangsvelden.' },
            progress: {
              type: 'object',
              properties: {
                completion: { type: 'number', minimum: 0, maximum: 100, description: 'Voltooiing in PROCENTEN (0–100).' },
                actualStart: { type: 'string', description: 'ISO-datum; mag niet ná de statusdatum liggen.' },
                actualFinish: { type: 'string', description: 'ISO-datum; ≥ actualStart en niet ná de statusdatum.' },
              },
            },
          },
        },
      },
    },
    required: ['updates'],
  },
  async handler(args, ctx) {
    const a = args as { updates?: unknown };
    if (!Array.isArray(a.updates) || a.updates.length === 0) {
      return toolError(ctx, 'VALIDATION', 'update_tasks vereist een niet-lege `updates`-array');
    }
    const updates = a.updates as { id: string; fields?: any; progress?: any }[];
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      const statusDate = useAppStore.getState().project.statusDate;
      const rejections: { id: string; reason: string }[] = [];
      const applied: string[] = [];
      for (const u of updates) {
        const id = u.id;
        const exists = validate.taskExists(useAppStore.getState(), id);
        if (exists) { rejections.push(exists); continue; }
        let touched = false;
        if (u.fields !== undefined) {
          const forbidden = FORBIDDEN_PROGRESS_IN_FIELDS(u.fields);
          if (forbidden) { rejections.push({ id, reason: forbidden }); }
          else { draft.updateTaskFields(id, u.fields); touched = true; }
        }
        if (u.progress !== undefined) {
          let pr: { applied: true } | { applied: false; reason: string } = { applied: false, reason: 'niet-uitgevoerd' };
          useAppStore.setState((s) => { pr = progress.applyProgressUpdate(s, id, u.progress, statusDate); });
          if (pr.applied) touched = true;
          else rejections.push({ id, reason: pr.reason });
        }
        if (touched) applied.push(id);
      }
      return { data: { updated: applied }, itemRejections: rejections };
    });
    return enrichOk(res, () => {
      const updated = ((res as McpToolOk).data as { updated: string[] }).updated;
      return { updated, tasks: freshDates(updated), projectEnd: projectEndInfo().projectEnd };
    });
  },
};

// =================================================================================================
// planner_delete_tasks
// =================================================================================================
const deleteTasks: McpToolDef = {
  name: 'planner_delete_tasks',
  description:
    'Verwijder taken op id (inclusief hun subboom, relaties en toewijzingen). Een onbekend id wordt per ' +
    'item zacht geweigerd; de rest wordt verwijderd. Retourneert de verwijderde id\'s en het nieuwe projecteinde.',
  kind: 'mutate',
  batchable: true,
  annotations: { ...STD_ANNOT, destructiveHint: true },
  inputSchema: {
    type: 'object',
    properties: { ids: { type: 'array', minItems: 1, items: { type: 'string' } } },
    required: ['ids'],
  },
  async handler(args, ctx) {
    const a = args as { ids?: unknown };
    if (!Array.isArray(a.ids) || a.ids.length === 0) {
      return toolError(ctx, 'VALIDATION', 'delete_tasks vereist een niet-lege `ids`-array');
    }
    const ids = a.ids as string[];
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      const rejections: { id: string; reason: string }[] = [];
      const deleted: string[] = [];
      for (const id of ids) {
        const exists = validate.taskExists(useAppStore.getState(), id);
        if (exists) { rejections.push(exists); continue; }
        draft.deleteTask(id);
        deleted.push(id);
      }
      return { data: { deleted }, itemRejections: rejections };
    });
    return enrichOk(res, () => ({
      deleted: ((res as McpToolOk).data as { deleted: string[] }).deleted,
      projectEnd: projectEndInfo().projectEnd,
    }));
  },
};

// =================================================================================================
// planner_move_task — roept de slice-actie `moveTask` DIRECT binnen de transactie aan; de
// suppressievlag dekt de `beginUndoable`, de trailing `recomputeViewRows` is redundant maar onschadelijk.
// =================================================================================================
const moveTask: McpToolDef = {
  name: 'planner_move_task',
  description:
    'Verplaats een taak naar een nieuwe ouder (`newParentId: null` = wortel) en optioneel een `position` ' +
    '(invoeg-index binnen de ouder; klemt stil naar [0, aantal siblings]). Een taak onder zichzelf of een ' +
    'eigen afstammeling plaatsen is een harde fout.',
  kind: 'mutate',
  batchable: true,
  annotations: { ...STD_ANNOT },
  inputSchema: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      newParentId: { type: ['string', 'null'], description: 'Nieuw ouder-id, of null voor wortelniveau.' },
      position: { type: 'integer', description: 'Invoeg-index binnen de ouder; klemt stil naar [0, aantal siblings].' },
    },
    required: ['id', 'newParentId'],
  },
  async handler(args, ctx) {
    const a = args as { id?: unknown; newParentId?: unknown; position?: unknown };
    if (typeof a.id !== 'string') return toolError(ctx, 'VALIDATION', 'move_task vereist een string-`id`');
    if (!(a.newParentId === null || typeof a.newParentId === 'string')) {
      return toolError(ctx, 'VALIDATION', '`newParentId` moet een string of null zijn');
    }
    const id = a.id;
    const newParentId = a.newParentId as string | null;
    const position = typeof a.position === 'number' ? a.position : undefined;
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      const st = useAppStore.getState();
      if (!st.tasks.some((t) => t.id === id)) throw new McpStepError('NOT_FOUND', `taak '${id}' bestaat niet`);
      if (newParentId !== null) {
        if (!st.tasks.some((t) => t.id === newParentId)) {
          throw new McpStepError('NOT_FOUND', `nieuwe ouder '${newParentId}' bestaat niet`);
        }
        // Cykel-preventie: newParentId mag niet id zelf of een afstammeling van id zijn.
        let cur = st.tasks.find((t) => t.id === newParentId);
        while (cur) {
          if (cur.id === id) throw new McpStepError('VALIDATION', 'kan een taak niet onder zichzelf of een eigen afstammeling plaatsen');
          cur = cur.parentId ? st.tasks.find((t) => t.id === cur!.parentId) : undefined;
        }
      }
      useAppStore.getState().moveTask(id, newParentId, position);
      return { data: { moved: id } };
    });
    return enrichOk(res, () => ({
      moved: id,
      tasks: freshDates([id]),
      projectEnd: projectEndInfo().projectEnd,
    }));
  },
};

// =================================================================================================
// planner_add_dependencies — pre-validatie (bestaan + dedup incrementeel + kring over de UNIE);
// kring ⇒ harde CYCLE + volledige rollback; duplicaat ⇒ zachte weigering.
// =================================================================================================
const addDependencies: McpToolDef = {
  name: 'planner_add_dependencies',
  description:
    'Voeg relaties tussen taken toe. Per item: `predecessorId`, `successorId`, `type` ' +
    '(FINISH_START | FINISH_FINISH | START_START | START_FINISH) en optioneel `lag` in werkdagen ' +
    '(negatief = lead). Onbekende taak-id\'s of een reeds bestaande relatie worden per item zacht ' +
    'geweigerd; een kringverwijzing (over de bestaande én voorgestelde relaties) is een harde fout die ' +
    'de hele call terugrolt.',
  kind: 'mutate',
  batchable: true,
  annotations: { ...STD_ANNOT },
  inputSchema: {
    type: 'object',
    properties: {
      dependencies: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['predecessorId', 'successorId', 'type'],
          properties: {
            predecessorId: { type: 'string' },
            successorId: { type: 'string' },
            type: { type: 'string', enum: SEQ_TYPES },
            lag: { type: 'number', description: 'Vaste lag in werkdagen (negatief = lead). Default 0.' },
          },
        },
      },
    },
    required: ['dependencies'],
  },
  async handler(args, ctx) {
    const a = args as { dependencies?: unknown };
    if (!Array.isArray(a.dependencies) || a.dependencies.length === 0) {
      return toolError(ctx, 'VALIDATION', 'add_dependencies vereist een niet-lege `dependencies`-array');
    }
    const deps = a.dependencies as { predecessorId: string; successorId: string; type: string; lag?: number }[];
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      const st = useAppStore.getState();
      const rejections: { id: string; reason: string }[] = [];
      const candidates: { predecessorId: string; successorId: string; type: SequenceType; lag?: number }[] = [];
      // Dedup incrementeel tegen de bestaande relaties + de groeiende set kandidaten.
      const seen = new Set(st.sequences.map((s) => `${s.predecessorId}|${s.successorId}|${s.type}`));
      for (const d of deps) {
        const label = `${d.predecessorId}->${d.successorId}`;
        if (!isSeqType(d.type)) { rejections.push({ id: label, reason: `onbekend relatietype '${d.type}'` }); continue; }
        if (!st.tasks.some((t) => t.id === d.predecessorId)) { rejections.push({ id: label, reason: `voorganger '${d.predecessorId}' bestaat niet` }); continue; }
        if (!st.tasks.some((t) => t.id === d.successorId)) { rejections.push({ id: label, reason: `opvolger '${d.successorId}' bestaat niet` }); continue; }
        const key = `${d.predecessorId}|${d.successorId}|${d.type}`;
        if (seen.has(key)) { rejections.push({ id: label, reason: 'relatie bestond al' }); continue; }
        seen.add(key);
        candidates.push({ predecessorId: d.predecessorId, successorId: d.successorId, type: d.type, lag: d.lag });
      }
      // Kring over de UNIE (bestaande + alle kandidaten) ⇒ harde stap-fout.
      const cyc = validate.noCycle(st, candidates.map((c) => ({ predecessorId: c.predecessorId, successorId: c.successorId })));
      if (cyc) throw new McpStepError('CYCLE', `kringverwijzing gedetecteerd: ${cyc.join(' → ')}`);
      const added: string[] = [];
      for (const c of candidates) {
        const newId = draft.addSequence({
          predecessorId: c.predecessorId,
          successorId: c.successorId,
          type: c.type,
          lagDays: typeof c.lag === 'number' ? c.lag : 0,
        });
        if (newId) added.push(newId);
        else rejections.push({ id: `${c.predecessorId}->${c.successorId}`, reason: 'relatie bestond al' });
      }
      return { data: { added }, itemRejections: rejections };
    });
    return enrichOk(res, () => ({
      added: ((res as McpToolOk).data as { added: string[] }).added,
      projectEnd: projectEndInfo().projectEnd,
    }));
  },
};

// =================================================================================================
// planner_remove_dependencies — gekozen vorm: `{ ids }` = sequence-id's (zoals get_project_overview /
// get_task ze teruggeven). Geen dedicated draft-primitief; verwijderen via een draft-stijl setState
// binnen de transactie (snapshot-/recompute-vrij — de suppressievlag + eind-runCPM dekken hem).
// =================================================================================================
const removeDependencies: McpToolDef = {
  name: 'planner_remove_dependencies',
  description:
    'Verwijder relaties op hun sequence-id (zoals get_project_overview / get_task die teruggeven). Een ' +
    'onbekend id wordt per item zacht geweigerd. Retourneert de verwijderde id\'s en het nieuwe projecteinde.',
  kind: 'mutate',
  batchable: true,
  annotations: { ...STD_ANNOT, destructiveHint: true },
  inputSchema: {
    type: 'object',
    properties: { ids: { type: 'array', minItems: 1, items: { type: 'string' }, description: 'Sequence-id\'s.' } },
    required: ['ids'],
  },
  async handler(args, ctx) {
    const a = args as { ids?: unknown };
    if (!Array.isArray(a.ids) || a.ids.length === 0) {
      return toolError(ctx, 'VALIDATION', 'remove_dependencies vereist een niet-lege `ids`-array');
    }
    const ids = a.ids as string[];
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      const st = useAppStore.getState();
      const rejections: { id: string; reason: string }[] = [];
      const toRemove = new Set<string>();
      const removed: string[] = [];
      for (const id of ids) {
        if (st.sequences.some((s) => s.id === id)) { toRemove.add(id); removed.push(id); }
        else rejections.push({ id, reason: `relatie '${id}' bestaat niet` });
      }
      if (toRemove.size > 0) {
        useAppStore.setState((s) => {
          s.sequences = s.sequences.filter((x) => !toRemove.has(x.id));
          s.isDirty = true;
        });
      }
      return { data: { removed }, itemRejections: rejections };
    });
    return enrichOk(res, () => ({
      removed: ((res as McpToolOk).data as { removed: string[] }).removed,
      projectEnd: projectEndInfo().projectEnd,
    }));
  },
};

// =================================================================================================
// planner_undo / planner_redo — gedeelde undo-stack PER DOCUMENT (ook de user schrijft erin). Één
// tool-mutatie = één stap. Niet-transactioneel: de store-acties beheren de stack zelf.
// =================================================================================================
const undo: McpToolDef = {
  name: 'planner_undo',
  description:
    'Maak de laatste ongedaan-maakbare wijziging in het ACTIEVE document ongedaan (één stap). Let op: de ' +
    'undo-stack is per document en wordt GEDEELD met de gebruiker — een undo kan dus een handmatige ' +
    'wijziging van de gebruiker terugdraaien. Voor wat-als-werk: gebruik duplicate_document, niet undo.',
  kind: 'other',
  batchable: false,
  annotations: { ...STD_ANNOT },
  inputSchema: { type: 'object', properties: {} },
  handler(_args, ctx): McpToolResult {
    const g = guardNonTransactional(ctx);
    if (g) return g;
    useAppStore.getState().undo();
    const cpm = useAppStore.getState().cpmResult;
    return { ok: true, envelope: okEnvelope(ctx), data: { projectEnd: cpm?.projectEnd ?? '' } };
  },
};

const redo: McpToolDef = {
  name: 'planner_redo',
  description:
    'Herhaal de laatst ongedaan gemaakte wijziging in het ACTIEVE document (één stap). De redo-stack is ' +
    'per document en gedeeld met de gebruiker; een nieuwe wijziging wist de redo-stack.',
  kind: 'other',
  batchable: false,
  annotations: { ...STD_ANNOT },
  inputSchema: { type: 'object', properties: {} },
  handler(_args, ctx): McpToolResult {
    const g = guardNonTransactional(ctx);
    if (g) return g;
    useAppStore.getState().redo();
    const cpm = useAppStore.getState().cpmResult;
    return { ok: true, envelope: okEnvelope(ctx), data: { projectEnd: cpm?.projectEnd ?? '' } };
  },
};

// =================================================================================================
// planner_run_cpm — expliciete, geforceerde herberekening (CPM + kalender). Niet-transactioneel:
// runCPM pusht nooit een undo-snapshot (invariant), dus geen eigen undo-stap.
// =================================================================================================
const runCpm: McpToolDef = {
  name: 'planner_run_cpm',
  description:
    'Herbereken de planning expliciet (kritieke-pad-methode + kalender) en wis daarmee `scheduleStale`. ' +
    'Retourneert het projecteinde, de projectduur (werkdagen) en een kritieke-pad-samenvatting. Mutaties ' +
    'herrekenen zelf al; gebruik dit om een verouderde planning te verversen of het resultaat op te vragen.',
  kind: 'other',
  batchable: false,
  annotations: { ...STD_ANNOT, idempotentHint: true },
  inputSchema: { type: 'object', properties: {} },
  handler(_args, ctx): McpToolResult {
    const g = guardNonTransactional(ctx);
    if (g) return g;
    useAppStore.getState().runCPM();
    const cpm = useAppStore.getState().cpmResult;
    return {
      ok: true,
      envelope: okEnvelope(ctx),
      data: {
        projectEnd: cpm?.projectEnd ?? '',
        projectDuration: cpm?.projectDuration ?? 0,
        criticalTaskCount: cpm?.criticalPath.length ?? 0,
        criticalPathTaskIds: cpm?.criticalPath ?? [],
        ...(cpm?.error ? { error: cpm.error } : {}),
      },
    };
  },
};

/** Alle T19-tools als vlakke module-array (registreer via één regel in toolRegistry.MODULES). */
export const taskTools: McpToolDef[] = [
  addTasks,
  updateTasks,
  deleteTasks,
  moveTask,
  addDependencies,
  removeDependencies,
  undo,
  redo,
  runCpm,
];
