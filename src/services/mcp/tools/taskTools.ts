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
import type { McpToolDef, McpToolOk, McpToolResult } from '../contracts';
// Alleen als TYPE geïmporteerd (SYNC-2): `import type` wordt bij het compileren volledig weggestreept,
// dus dit legt géén runtime-import naar `batchTool` (dat zelf via de leaf-module `toolIndex` opzoekt).
import type { BatchStepTool } from './batchTool';
import {
  guardNonTransactional,
  McpStepError,
  runMutateTool,
  toolError,
  type MutationOutcome,
} from './runtime';
import { enrichOk, freshDates, okDirect, okEnvelope, projectEndInfo } from './helpers';
import { useAppStore } from '@/state/appStore';
import { draft, type BulkTaskItem } from '@/state/mcpTransaction';
import { validate, progress } from '@/state/mcpValidation';
import {
  parseTaskFields,
  TASK_FIELDS_DOC,
  TASK_FIELD_NAMES,
  TASK_FIELD_SCHEMA_PROPERTIES,
  type TaskFieldContext,
  type TaskFieldPatch,
} from './taskFields';
import type { SequenceType } from '@/types/sequence';
import type { Task } from '@/types/task';
import { createDefaultTaskTime } from '@/utils/taskDefaults';
import { formatDate } from '@/utils/dateUtils';

const SEQ_TYPES: SequenceType[] = ['FINISH_START', 'FINISH_FINISH', 'START_START', 'START_FINISH'];
const isSeqType = (v: unknown): v is SequenceType => typeof v === 'string' && (SEQ_TYPES as string[]).includes(v);

const STD_ANNOT = { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false };

// De gedeelde post-transactie-helpers (okEnvelope/freshDates/projectEndInfo/enrichOk/okDirect) staan
// sinds T20 in `./helpers.ts` — dezelfde conventie geldt voor de kalender-/resource-tools.

// --- batchStep-kernen (SYNC-2) -------------------------------------------------------------------
//
// Elke bulk-mutatietool is opgesplitst in drie stukken, zodat hij zowel los (via `handler`) als als
// batch-stap (via `batchStep`) bruikbaar is — met exact ÉÉN implementatie van de mutatie:
//   1. `parseX(args)`  — pure vormvalidatie; geeft de geparste args terug, of een foutboodschap als
//                        string. Beide aanroepers zetten die string om in hún foutvorm.
//   2. `xCore(...)`    — de SYNCHRONE, transactie-vrije mutatie ⇒ `MutationOutcome`. Opent zelf géén
//                        transactie, pusht geen snapshot en draait geen CPM: de eigenaar (losse call
//                        = `runMutateTool`, batch = `planner_batch`) bezit die.
//   3. `handler`       — guards + backup + eigen transactie via `runMutateTool`, en verrijkt de Ok met
//                        verse datums (`enrichOk`). Die verrijking is bewust NIET in de kern gezet: in
//                        een batch is de planning midden-in nog niet herberekend, dus verse datums per
//                        stap zouden daar liegen; `planner_batch` rapporteert de kale kern-`data` en
//                        herberekent aan het eind.
// `batchStep` gooit waar de handler een `McpToolErr` teruggeeft: binnen een batch is een vormfout een
// STRUCTURELE stapfout die de hele batch hoort terug te rollen (spec §Compositie), geen zachte weigering.

/** Zet een `parseX`-foutboodschap om in de harde stapfout die de batch-loop verwacht. */
function stepValidationError(message: string): McpStepError {
  return new McpStepError('VALIDATION', message);
}

// =================================================================================================
// planner_add_tasks
// =================================================================================================
/** Bouw de validatiecontext voor de veld-allowlist. `task` afwezig ⇒ een NIEUWE taak (add_tasks). */
function fieldContext(
  s: ReturnType<typeof useAppStore.getState>,
  task?: Task,
): TaskFieldContext {
  return {
    currentIsMilestone: task?.isMilestone ?? false,
    hasChildren: (task?.childIds.length ?? 0) > 0,
    hasAssignments: task ? s.assignments.some((a) => a.taskId === task.id) : false,
    // De projectkalender-id telt mee: op een vers document staat die alleen als cache in `s.calendar`
    // (`calendars` is dan leeg), maar hij is wel degelijk een geldige taak-kalender.
    calendarExists: (id: string) => s.calendars.some((c) => c.id === id) || id === s.calendar.id,
  };
}

/** Eén geparst `add_tasks`-item: de bulk-only sleutels apart, de rest als gevalideerde veld-patch. */
interface ParsedAddItem {
  tempId: string;
  parentId?: string;
  position?: number;
  patch: TaskFieldPatch;
}

/** Vormvalidatie van `add_tasks`; string = foutboodschap. */
function parseAddTasks(args: unknown): ParsedAddItem[] | string {
  const a = (args ?? {}) as { tasks?: unknown };
  if (!Array.isArray(a.tasks) || a.tasks.length === 0) {
    return 'add_tasks vereist een niet-lege `tasks`-array';
  }
  const st = useAppStore.getState();
  const seenTemp = new Set<string>();
  const parsed: ParsedAddItem[] = [];
  for (const it of a.tasks) {
    if (!it || typeof it !== 'object' || Array.isArray(it)) return 'elk taak-item moet een object zijn';
    const raw = it as Record<string, unknown>;
    if (typeof raw.tempId !== 'string' || typeof raw.name !== 'string') {
      return 'elk taak-item vereist een string-`tempId` en -`name`';
    }
    // Statische toolniveau-fout: dubbele tempId ⇒ VALIDATION VÓÓR enige transactie/backup (geen
    // spurious snapshot; draft.addTasks zou dit anders pas ín de transactie als throw vangen).
    const tid = raw.tempId;
    if (seenTemp.has(tid)) return `dubbele tempId '${tid}' binnen de call`;
    seenTemp.add(tid);
    if (raw.parentId !== undefined && typeof raw.parentId !== 'string') {
      return `taak '${tid}': \`parentId\` moet een string zijn (bestaand taak-id of tempId uit deze call)`;
    }
    if (raw.position !== undefined && (typeof raw.position !== 'number' || !Number.isInteger(raw.position))) {
      return `taak '${tid}': \`position\` moet een geheel getal zijn`;
    }
    // De inhoudelijke velden lopen door DEZELFDE allowlist als `update_tasks.fields` — een onbekende
    // sleutel (`duration_days`, `time`, …) is hier een HARDE VALIDATION-fout: add_tasks kent geen
    // per-item-weigering (het contract is de volledige tempId→realId-map, alles of niets).
    const { tempId: _t, parentId: _p, position: _pos, ...fields } = raw;
    void _t; void _p; void _pos;
    const res = parseTaskFields(fields, fieldContext(st));
    if (!res.ok) return `taak '${tid}': ${res.reason}`;
    parsed.push({
      tempId: tid,
      ...(typeof raw.parentId === 'string' ? { parentId: raw.parentId } : {}),
      ...(typeof raw.position === 'number' ? { position: raw.position } : {}),
      patch: res.patch,
    });
  }
  return parsed;
}

/**
 * Synchrone, transactie-vrije kern van `add_tasks`. Vertaalt de duur-velden naar het `time`-object
 * dat `draft.addTask` verwacht: ALTIJD via `createDefaultTaskTime` (die leidt ook een consistente
 * `scheduleFinish` af) — nooit een met de hand gevuld half `TaskTime`.
 */
function addTasksCore(items: ParsedAddItem[]): MutationOutcome {
  const st = useAppStore.getState();
  const anchor = st.project.startDate || formatDate(new Date());
  const bulk: BulkTaskItem[] = items.map((it) => {
    const top = it.patch.top;
    const tp = it.patch.time;
    let time: Task['time'] | undefined;
    if (tp) {
      // Geen expliciete duur ⇒ dezelfde default als draft.addTask (mijlpaal 0, anders 5 werkdagen).
      const days = tp.scheduleDuration ?? (top.isMilestone ? 0 : 5);
      time = createDefaultTaskTime(anchor, days);
      if (tp.durationType !== undefined) time.durationType = tp.durationType;
    }
    return {
      ...top,
      name: top.name as string,
      tempId: it.tempId,
      ...(it.parentId !== undefined ? { parentId: it.parentId } : {}),
      ...(it.position !== undefined ? { position: it.position } : {}),
      ...(time ? { time } : {}),
    };
  });
  const map = draft.addTasks(bulk);
  return { data: { created: Object.fromEntries(map) } };
}

const addTasks: BatchStepTool = {
  name: 'planner_add_tasks',
  description:
    'Maak één of meer taken aan (geneste WBS in één call). Elk item heeft een client-gekozen `tempId` ' +
    '(uniek binnen de call); `parentId` mag een bestaand taak-id of een `tempId` uit dezelfde call zijn. ' +
    'Laat een tempId ALTIJD met `tmp-` of `tmp_` beginnen (bijv. `tmp-fundering`) — binnen ' +
    '`planner_batch` is dat de GERESERVEERDE syntax waarop latere stappen hun verwijzingen herkennen; ' +
    'een tempId zonder die prefix laat de hele batch falen. ' +
    '`position` is de invoeg-index binnen de ouder en klemt stil naar [0, aantal siblings]. ' +
    'Geef de DUUR direct mee met `duration` (hele werkdagen; zonder dat veld krijgt een taak de ' +
    'standaard 5 werkdagen). Een mijlpaal (`isMilestone`) heeft per definitie duur 0 — `duration` > 0 ' +
    'is daar een fout. ' + TASK_FIELDS_DOC + ' Bij add_tasks is een onbekende sleutel een HARDE fout ' +
    '(de hele call faalt), niet een per-item-weigering. Retourneert de volledige tempId→realId-map, de ' +
    'herrekende earlyStart/earlyFinish per aangemaakte taak en het projecteinde.',
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
            tempId: {
              type: 'string',
              pattern: '^tmp[-_]',
              description:
                'Client-gekozen tijdelijk id, uniek binnen de call; sleutel in de terugmap. MOET met ' +
                '`tmp-` of `tmp_` beginnen (gereserveerde batch-syntax, bijv. `tmp-fundering`): alleen ' +
                'zo kan planner_batch verwijzingen in latere stappen veilig vervangen zonder ooit vrije ' +
                'tekst te raken. Buiten een batch is de prefix niet verplicht, maar wél aangeraden.',
            },
            parentId: { type: 'string', description: 'Bestaand taak-id of een tempId uit dezelfde call; weglaten = wortel.' },
            position: { type: 'integer', description: 'Invoeg-index binnen de ouder; klemt stil naar [0, aantal siblings].' },
            // Exact dezelfde velden als `update_tasks.fields` — één allowlist voor aanmaken én wijzigen.
            ...TASK_FIELD_SCHEMA_PROPERTIES,
          },
          additionalProperties: false,
        },
      },
    },
    required: ['tasks'],
  },
  batchStep(args) {
    const parsed = parseAddTasks(args);
    if (typeof parsed === 'string') throw stepValidationError(parsed);
    return addTasksCore(parsed);
  },
  async handler(args, ctx) {
    const parsed = parseAddTasks(args);
    if (typeof parsed === 'string') return toolError(ctx, 'VALIDATION', parsed);
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => addTasksCore(parsed));
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

/**
 * Valideer `fields` van één update-item tegen de allowlist (`taskFields.ts`), ná het
 * voortgangs-verbod. Retourneert de te schrijven patch of een reden. ALLES-OF-NIETS per item: is er
 * ook maar één onbekende/ongeldige sleutel, dan wordt het hele `fields`-blok geweigerd en blijft de
 * taak ONGEWIJZIGD (een `progress` in hetzelfde item loopt wél gewoon door — bewuste granulariteit).
 */
function resolveFieldsPatch(
  state: ReturnType<typeof useAppStore.getState>,
  id: string,
  fields: unknown,
): { ok: true; patch: TaskFieldPatch } | { ok: false; reason: string } {
  const forbidden = FORBIDDEN_PROGRESS_IN_FIELDS(fields);
  if (forbidden) return { ok: false, reason: forbidden };
  const task = state.tasks.find((t) => t.id === id);
  const res = parseTaskFields(fields, fieldContext(state, task));
  return res.ok ? { ok: true, patch: res.patch } : { ok: false, reason: res.reason };
}

/** Statische pre-classificatie van één update-item (existentie + fields-validatie), gedeeld door het
 *  lege-batch-snelpad en (impliciet) de transactie-fn. `progress`-geldigheid is DYNAMISCH en valt
 *  bewust buiten deze statische check (zie de restgeval-noot bij de handler). */
function classifyUpdate(
  state: ReturnType<typeof useAppStore.getState>,
  u: { id: string; fields?: any; progress?: any },
): { executable: true } | { executable: false; rejection: { id: string; reason: string } } {
  const missing = validate.taskExists(state, u.id);
  if (missing) return { executable: false, rejection: missing };
  const hasFields = u.fields !== undefined;
  const fieldsRes = hasFields ? resolveFieldsPatch(state, u.id, u.fields) : null;
  const hasProgress = u.progress !== undefined;
  if ((fieldsRes && fieldsRes.ok) || hasProgress) return { executable: true };
  return {
    executable: false,
    rejection: { id: u.id, reason: fieldsRes && !fieldsRes.ok ? fieldsRes.reason : 'geen `fields` of `progress` opgegeven' },
  };
}

/** Vormvalidatie van `update_tasks`; string = foutboodschap. */
function parseUpdateTasks(args: unknown): { id: string; fields?: any; progress?: any }[] | string {
  const a = (args ?? {}) as { updates?: unknown };
  if (!Array.isArray(a.updates) || a.updates.length === 0) {
    return 'update_tasks vereist een niet-lege `updates`-array';
  }
  return a.updates as { id: string; fields?: any; progress?: any }[];
}

/** Synchrone, transactie-vrije kern van `update_tasks`. */
function updateTasksCore(updates: { id: string; fields?: any; progress?: any }[]): MutationOutcome {
  const statusDate = useAppStore.getState().project.statusDate;
  const rejections: { id: string; reason: string }[] = [];
  const applied: string[] = [];
  for (const u of updates) {
    const id = u.id;
    const exists = validate.taskExists(useAppStore.getState(), id);
    if (exists) { rejections.push(exists); continue; }
    let touched = false;
    let rejectedHere = false;
    if (u.fields !== undefined) {
      const res = resolveFieldsPatch(useAppStore.getState(), id, u.fields);
      if (!res.ok) { rejections.push({ id, reason: res.reason }); rejectedHere = true; }
      else { draft.patchTaskFields(id, res.patch.top, res.patch.time); touched = true; }
    }
    if (u.progress !== undefined) {
      let pr: { applied: true } | { applied: false; reason: string } = { applied: false, reason: 'niet-uitgevoerd' };
      useAppStore.setState((s) => { pr = progress.applyProgressUpdate(s, id, u.progress, statusDate); });
      if (pr.applied) touched = true;
      else { rejections.push({ id, reason: pr.reason }); rejectedHere = true; }
    }
    if (touched) applied.push(id);
    else if (!rejectedHere) rejections.push({ id, reason: 'geen `fields` of `progress` opgegeven' });
  }
  return { data: { updated: applied }, itemRejections: rejections };
}

const updateTasks: BatchStepTool = {
  name: 'planner_update_tasks',
  description:
    'Wijzig bestaande taken. Per item: `fields` (naam, DUUR in werkdagen, constraints, deadline, ' +
    'kalender, …; GEEN voortgangsvelden) en/of `progress` (voortgangspad: `completion` in PROCENTEN ' +
    '0–100, optioneel `actualStart`/`actualFinish` als ISO-datum). ' + TASK_FIELDS_DOC + ' Een ' +
    'geweigerd `fields`-blok laat de taak volledig ONGEWIJZIGD (nooit een halve merge). ' +
    'Voortgang > 0 leidt de actualStart af; actuals ná de ' +
    'projectstatusdatum of buiten 0–100 worden per item zacht geweigerd — geldige items blijven staan. ' +
    'Hefboom-tip: hypothetische uitloop = duur of SNET-constraint (via `fields`); geregistreerde voortgang ' +
    '= actuals mét statusdatum (via `progress`). Merk op: één taak-id kan tegelijk in `updated` én in de ' +
    'weigeringen verschijnen (bijv. `fields` geweigerd maar `progress` toegepast) — bewuste granulariteit.',
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
            fields: {
              type: 'object',
              description:
                `Te wijzigen velden (expliciete allowlist: ${TASK_FIELD_NAMES.join(', ')}). Namen ` +
                'spiegelen planner_get_task. Een onbekende sleutel wordt geweigerd — nooit stil genegeerd.',
              properties: { ...TASK_FIELD_SCHEMA_PROPERTIES },
              additionalProperties: false,
            },
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
  // Géén lege-batch-snelpad nodig: dat snelpad bestaat alleen om een overbodige TRANSACTIE (snapshot +
  // redo-wipe + backup) te vermijden, en binnen een batch bezit `planner_batch` die al. Zijn er nul
  // uitvoerbare items, dan levert de kern gewoon `updated: []` met alle weigeringen.
  batchStep(args) {
    const parsed = parseUpdateTasks(args);
    if (typeof parsed === 'string') throw stepValidationError(parsed);
    return updateTasksCore(parsed);
  },
  async handler(args, ctx) {
    const parsed = parseUpdateTasks(args);
    if (typeof parsed === 'string') return toolError(ctx, 'VALIDATION', parsed);
    const updates = parsed;
    // Lege-batch-snelpad (reviewfix Issue 2): zijn er statisch nul uitvoerbare items (alle id's
    // onbekend / alleen verboden fields / niets opgegeven), return dan direct Ok mét de weigeringen —
    // zónder transactie/backup/snapshot/redo-wipe. RESTGEVAL: een item dat pas DYNAMISCH wordt
    // geweigerd (bv. progress buiten 0–100 op een bestaande taak) telt hier wél als uitvoerbaar en
    // betreedt de transactie; is er verder nul effect, dan kan die ene transactie nog een snapshot
    // pushen. Bewuste rest — de meest voorkomende klasse (existentie/statische fouten) valt hier vooraf af.
    {
      const st = useAppStore.getState();
      const staticRej: { id: string; reason: string }[] = [];
      let anyExecutable = false;
      for (const u of updates) {
        const c = classifyUpdate(st, u);
        if (c.executable) anyExecutable = true;
        else staticRej.push(c.rejection);
      }
      if (!anyExecutable) {
        const g = guardNonTransactional(ctx);
        if (g) return g;
        return okDirect(ctx, { updated: [], tasks: [], projectEnd: projectEndInfo().projectEnd }, staticRej);
      }
    }
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => updateTasksCore(updates));
    return enrichOk(res, () => {
      const updated = ((res as McpToolOk).data as { updated: string[] }).updated;
      return { updated, tasks: freshDates(updated), projectEnd: projectEndInfo().projectEnd };
    });
  },
};

// =================================================================================================
// planner_delete_tasks
// =================================================================================================
/** Vormvalidatie van `delete_tasks`; string = foutboodschap. */
function parseIdList(args: unknown, toolLabel: string): string[] | string {
  const a = (args ?? {}) as { ids?: unknown };
  if (!Array.isArray(a.ids) || a.ids.length === 0) {
    return `${toolLabel} vereist een niet-lege \`ids\`-array`;
  }
  return a.ids as string[];
}

/** Synchrone, transactie-vrije kern van `delete_tasks`. */
function deleteTasksCore(ids: string[]): MutationOutcome {
  const rejections: { id: string; reason: string }[] = [];
  const deleted: string[] = [];
  for (const id of ids) {
    const exists = validate.taskExists(useAppStore.getState(), id);
    if (exists) { rejections.push(exists); continue; }
    draft.deleteTask(id);
    deleted.push(id);
  }
  return { data: { deleted }, itemRejections: rejections };
}

const deleteTasks: BatchStepTool = {
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
  // Zie de noot bij update_tasks: het lege-batch-snelpad is puur transactie-vermijding en dus
  // overbodig binnen een batch.
  batchStep(args) {
    const parsed = parseIdList(args, 'delete_tasks');
    if (typeof parsed === 'string') throw stepValidationError(parsed);
    return deleteTasksCore(parsed);
  },
  async handler(args, ctx) {
    const parsed = parseIdList(args, 'delete_tasks');
    if (typeof parsed === 'string') return toolError(ctx, 'VALIDATION', parsed);
    const ids = parsed;
    // Lege-batch-snelpad (reviewfix Issue 2): bestaat geen enkel id, return dan direct Ok mét de
    // weigeringen — zónder transactie/backup/snapshot/redo-wipe.
    {
      const st = useAppStore.getState();
      const staticRej = validate.tasksExist(st, ids);
      if (staticRej.length === ids.length) {
        const g = guardNonTransactional(ctx);
        if (g) return g;
        return okDirect(ctx, { deleted: [], projectEnd: projectEndInfo().projectEnd }, staticRej);
      }
    }
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => deleteTasksCore(ids));
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
/** Vormvalidatie van `move_task`; string = foutboodschap. */
function parseMoveTask(args: unknown): { id: string; newParentId: string | null; position?: number } | string {
  const a = (args ?? {}) as { id?: unknown; newParentId?: unknown; position?: unknown };
  if (typeof a.id !== 'string') return 'move_task vereist een string-`id`';
  if (!(a.newParentId === null || typeof a.newParentId === 'string')) {
    return '`newParentId` moet een string of null zijn';
  }
  return {
    id: a.id,
    newParentId: a.newParentId as string | null,
    ...(typeof a.position === 'number' ? { position: a.position } : {}),
  };
}

/** Synchrone, transactie-vrije kern van `move_task`. Structurele fouten (onbekend id, kringouder)
 *  gooien een `McpStepError` — die code overleeft de rollback van beide aanroepers. */
function moveTaskCore(p: { id: string; newParentId: string | null; position?: number }): MutationOutcome {
  const { id, newParentId, position } = p;
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
}

const moveTask: BatchStepTool = {
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
  batchStep(args) {
    const parsed = parseMoveTask(args);
    if (typeof parsed === 'string') throw stepValidationError(parsed);
    return moveTaskCore(parsed);
  },
  async handler(args, ctx) {
    const parsed = parseMoveTask(args);
    if (typeof parsed === 'string') return toolError(ctx, 'VALIDATION', parsed);
    const id = parsed.id;
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => moveTaskCore(parsed));
    return enrichOk(res, () => ({
      moved: id,
      tasks: freshDates([id]),
      projectEnd: projectEndInfo().projectEnd,
    }));
  },
};

/** Statische classificatie van een relatie-batch (type-geldigheid + endpoint-bestaan + dedup
 *  incrementeel tegen de bestaande relaties én de groeiende kandidatenset). Gedeeld door het
 *  lege-batch-snelpad en de transactie-fn; de kring-check is GEEN onderdeel (die draait alleen op de
 *  kandidaten, ín de transactie, als harde stap-fout). */
function classifyDeps(
  st: ReturnType<typeof useAppStore.getState>,
  deps: { predecessorId: string; successorId: string; type: string; lag?: number }[],
): {
  candidates: { predecessorId: string; successorId: string; type: SequenceType; lag?: number }[];
  rejections: { id: string; reason: string }[];
} {
  const rejections: { id: string; reason: string }[] = [];
  const candidates: { predecessorId: string; successorId: string; type: SequenceType; lag?: number }[] = [];
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
  return { candidates, rejections };
}

// =================================================================================================
// planner_add_dependencies — pre-validatie (bestaan + dedup incrementeel + kring over de UNIE);
// kring ⇒ harde CYCLE + volledige rollback; duplicaat ⇒ zachte weigering.
// =================================================================================================
/** Vormvalidatie van `add_dependencies`; string = foutboodschap. */
function parseAddDeps(args: unknown): { predecessorId: string; successorId: string; type: string; lag?: number }[] | string {
  const a = (args ?? {}) as { dependencies?: unknown };
  if (!Array.isArray(a.dependencies) || a.dependencies.length === 0) {
    return 'add_dependencies vereist een niet-lege `dependencies`-array';
  }
  return a.dependencies as { predecessorId: string; successorId: string; type: string; lag?: number }[];
}

/** Synchrone, transactie-vrije kern van `add_dependencies`. Een kring is een HARDE stapfout. */
function addDependenciesCore(
  deps: { predecessorId: string; successorId: string; type: string; lag?: number }[],
): MutationOutcome {
  const st = useAppStore.getState();
  const { candidates, rejections } = classifyDeps(st, deps);
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
}

const addDependencies: BatchStepTool = {
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
  batchStep(args) {
    const parsed = parseAddDeps(args);
    if (typeof parsed === 'string') throw stepValidationError(parsed);
    return addDependenciesCore(parsed);
  },
  async handler(args, ctx) {
    const parsed = parseAddDeps(args);
    if (typeof parsed === 'string') return toolError(ctx, 'VALIDATION', parsed);
    const deps = parsed;
    // Lege-batch-snelpad (reviewfix Issue 2): levert de statische classificatie nul kandidaten (alle
    // items onbekend/dubbel/verkeerd type), return dan direct Ok mét de weigeringen — zónder
    // transactie/backup/snapshot/redo-wipe.
    {
      const pre = classifyDeps(useAppStore.getState(), deps);
      if (pre.candidates.length === 0) {
        const g = guardNonTransactional(ctx);
        if (g) return g;
        return okDirect(ctx, { added: [], projectEnd: projectEndInfo().projectEnd }, pre.rejections);
      }
    }
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => addDependenciesCore(deps));
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
/** Synchrone, transactie-vrije kern van `remove_dependencies`. */
function removeDependenciesCore(ids: string[]): MutationOutcome {
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
}

const removeDependencies: BatchStepTool = {
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
  batchStep(args) {
    const parsed = parseIdList(args, 'remove_dependencies');
    if (typeof parsed === 'string') throw stepValidationError(parsed);
    return removeDependenciesCore(parsed);
  },
  async handler(args, ctx) {
    const parsed = parseIdList(args, 'remove_dependencies');
    if (typeof parsed === 'string') return toolError(ctx, 'VALIDATION', parsed);
    const ids = parsed;
    // Lege-batch-snelpad (reviewfix Issue 2): bestaat geen enkele opgegeven relatie, return dan direct
    // Ok mét de weigeringen — zónder transactie/backup/snapshot/redo-wipe.
    {
      const st = useAppStore.getState();
      const existing = new Set(st.sequences.map((s) => s.id));
      if (!ids.some((id) => existing.has(id))) {
        const g = guardNonTransactional(ctx);
        if (g) return g;
        const rej = ids.map((id) => ({ id, reason: `relatie '${id}' bestaat niet` }));
        return okDirect(ctx, { removed: [], projectEnd: projectEndInfo().projectEnd }, rej);
      }
    }
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => removeDependenciesCore(ids));
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
