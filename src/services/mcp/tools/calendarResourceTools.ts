// MCP-toolmodule (taak T20, spec §Tool-set Muteren + §Werkpakket 5 + het §level_resources-contract):
// kalender-, toewijzings-, nivelleer-, project- en baseline-mutaties. Zelfde bouwwijze als
// `taskTools.ts` (T19): `planner_`-prefix, verplichte description, de vier MCP-annotaties, een
// JSON-schema met EXPLICIETE eenheden, en alle échte mutaties via `runMutateTool` →
// `runInMcpTransaction` (één undo-stap, één herberekening, geen bestands-/save-side-effects).
//
// Drie doorlopende conventies uit T19:
//   1. ZACHTE per-item-weigeringen (`itemRejections`) — één rotte regel rolt nooit de hele bulk terug;
//      structurele fouten van een ENKELVOUDIGE tool zijn hard via `McpStepError`.
//   2. LEGE-BATCH-SNELPAD — een bulk met statisch nul uitvoerbare items betreedt géén transactie
//      (geen spurious undo-snapshot, geen redo-wipe door een AI-no-op). De classificatie draait
//      daarom in een GEDEELDE helper die zowel het snelpad als de transactie-fn voedt.
//   3. `enrichOk` — de respons-`data` wordt ná de transactie opnieuw uit de VERSE store opgebouwd.
//
// SCHRIJFKANT SPREEKT DE LEESKANT (harde eis): de veldnamen zijn identiek aan de T18-leestools —
// `assignmentId`, `unitsPerDay`, `curve`. Een AI die `get_task` leest kan die id's/velden dus
// rechtstreeks in `manage_assignments` terugstoppen.
import type { McpToolDef, McpToolOk } from '../contracts';
import {
  guardNonTransactional,
  McpStepError,
  runMutateTool,
  toolError,
  type MutationOutcome,
} from './runtime';
import { enrichOk, okDirect, projectEndInfo } from './helpers';
import { useAppStore } from '@/state/appStore';
import { draft } from '@/state/mcpTransaction';
import { validate } from '@/state/mcpValidation';
import { resolveCalendarHolidays } from '../calendarGenerate';
import { ensureFreshSchedule } from '../staleGuard';
import { createDefaultCalendar } from '@/engine/calendar/defaultCalendar';
import { computeMoveDelta } from '@/engine/moveProject';
import { diffDays } from '@/utils/dateUtils';
import type { HolidayGenParams } from '@/engine/calendar/generateCalendarHolidays';
import type { Holiday, WorkCalendar } from '@/types/calendar';
import type { ResourceCurve } from '@/types/resource';
import type { Project } from '@/types/project';
import type { LevelingOptions, LevelingResult } from '@/engine/scheduler/ResourceLeveler';

const STD_ANNOT = { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false };

type Rejection = { id: string; reason: string };
type StoreState = ReturnType<typeof useAppStore.getState>;

/** Kalenderdagen tussen twee ISO-datums; 0 zodra één van beide ontbreekt (leeg projecteinde). */
function safeDiffDays(a: string, b: string): number {
  if (!a || !b) return 0;
  const d = diffDays(a, b);
  return Number.isFinite(d) ? d : 0;
}

// =================================================================================================
// planner_update_calendar (WP5)
//
// Dispatch per item (spec §WP5 regel 58):
//   - id staat in de bibliotheek                     ⇒ wijzigen (draft.updateCalendar);
//   - id is de PROJECTKALENDER maar staat er nog niet ⇒ eerst `ensureProjectCalendarInLibrary`
//     (WP5b-promotie: op een vers document leeft de projectkalender alleen als cache `s.calendar`),
//     dán wijzigen — de respons meldt `promoted: true`;
//   - onbekend id + `create: true`                    ⇒ aanmaken (draft.addCalendar);
//   - onbekend id zónder `create`                     ⇒ ZACHTE weigering.
// Holidays lopen altijd via `resolveCalendarHolidays` (meng-semantiek WP5d): generator-basis en/of
// rauwe uitzonderingen, met `becameLiteral` per item terug zodra `generation` daardoor vervalt.
// =================================================================================================

interface CalendarItem {
  id: string;
  create?: boolean;
  name?: string;
  description?: string;
  workDays?: number[];
  workStartHour?: number;
  workEndHour?: number;
  hoursPerDay?: number;
  generate?: HolidayGenParams;
  rawHolidays?: Holiday[];
}

/** Velden die een item BETEKENISVOL maken; een update-item zonder één hiervan is een no-op-weigering. */
const CAL_FIELD_KEYS: (keyof CalendarItem)[] = [
  'name', 'description', 'workDays', 'workStartHour', 'workEndHour', 'hoursPerDay', 'generate', 'rawHolidays',
];

type CalendarPlan =
  | { mode: 'update'; item: CalendarItem; targetId: string; needsPromotion: boolean }
  | { mode: 'create'; item: CalendarItem };

/**
 * Statische classificatie van een kalender-batch (bestaan / projectkalender-promotie / create /
 * leeg-item). GEDEELD door het lege-batch-snelpad en de transactie-fn, zodat beide exact dezelfde
 * weigeringen produceren.
 */
function classifyCalendars(s: StoreState, items: CalendarItem[]): { plans: CalendarPlan[]; rejections: Rejection[] } {
  const plans: CalendarPlan[] = [];
  const rejections: Rejection[] = [];
  for (const item of items) {
    const label = typeof item?.id === 'string' ? item.id : String(item?.id);
    if (!item || typeof item.id !== 'string' || item.id === '') {
      rejections.push({ id: label, reason: 'elk kalender-item vereist een niet-lege string-`id`' });
      continue;
    }
    const inLibrary = s.calendars.some((c) => c.id === item.id);
    const isProjectCal = item.id === s.calendar.id;
    const hasFields = CAL_FIELD_KEYS.some((k) => item[k] !== undefined);
    if (inLibrary || isProjectCal) {
      if (!hasFields) {
        rejections.push({ id: item.id, reason: 'geen wijzigingen opgegeven (naam/werkdagen/uren/generate/rawHolidays)' });
        continue;
      }
      plans.push({ mode: 'update', item, targetId: item.id, needsPromotion: !inLibrary });
      continue;
    }
    if (item.create === true) {
      plans.push({ mode: 'create', item });
      continue;
    }
    rejections.push({
      id: item.id,
      reason: `kalender '${item.id}' bestaat niet in dit document; geef \`create: true\` mee om hem aan te maken (kalender-id's zijn per document)`,
    });
  }
  return { plans, rejections };
}

/** Spanne voor `computeGenerateSpan` (via resolveCalendarHolidays). Bij AANMAAK geven we bewust een
 *  LEEG projecteinde door: dan geldt de create-spanne (startjaar−1 t/m startjaar+3) i.p.v. een
 *  spanne rond een einddatum die nog niets met deze nieuwe kalender te maken heeft. */
function calendarSpan(s: StoreState, forCreate: boolean): { projectStart: string; projectEnd: string } {
  return {
    projectStart: s.project.startDate,
    projectEnd: forCreate ? '' : (s.project.endDate || s.cpmResult?.projectEnd || ''),
  };
}

/** De scalaire (niet-holiday) velden van een item als `Partial<WorkCalendar>`. */
function calendarFieldPatch(item: CalendarItem): Partial<WorkCalendar> {
  const patch: Partial<WorkCalendar> = {};
  if (item.name !== undefined) patch.name = item.name;
  if (item.description !== undefined) patch.description = item.description;
  if (item.workDays !== undefined) patch.workDays = item.workDays;
  if (item.workStartHour !== undefined) patch.workStartHour = item.workStartHour;
  if (item.workEndHour !== undefined) patch.workEndHour = item.workEndHour;
  if (item.hoursPerDay !== undefined) patch.hoursPerDay = item.hoursPerDay;
  return patch;
}

const updateCalendar: McpToolDef = {
  name: 'planner_update_calendar',
  description:
    'Wijzig of maak werkkalenders (bulk — één call = één ongedaan-maak-stap). Per item: een BESTAAND ' +
    'kalender-id wijzigen, of een onbekend id met `create: true` aanmaken (onbekend id zónder `create` ' +
    'wordt zacht geweigerd). LET OP: kalender-id\'s zijn PER DOCUMENT — een geïmporteerd of ander ' +
    'document herbouwt kalenders via `create`, het hergebruikt nooit een id uit een ander document. ' +
    'Feestdagen kunnen op twee manieren: `generate` (land/regio/bouwvak — de generator materialiseert ' +
    'de dagen over de projectspanne) en/of `rawHolidays` (letterlijke uitzonderingen, bijv. ' +
    'vorstverlet). Worden er rauwe dagen toegevoegd, dan wordt de generator-herkomst gewist en is de ' +
    'kalender voortaan LETTERLIJK (`becameLiteral: true` per item) — hergenereren kan dan niet meer. ' +
    'Een kalender die geen enkele werkdag meer overlaat levert géén fout maar een prominente ' +
    'waarschuwing met `cappedTaskIds`: die taken pasten niet meer in hun venster.',
  kind: 'mutate',
  batchable: true,
  // Een kalenderwijziging kan bestaande feestdagen/werkdagen (en daarmee de planning) overschrijven.
  annotations: { ...STD_ANNOT, destructiveHint: true },
  inputSchema: {
    type: 'object',
    properties: {
      calendars: {
        type: 'array',
        minItems: 1,
        description: 'De te wijzigen/aan te maken kalenders; alles in één transactie.',
        items: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', description: 'Bestaand kalender-id; bij `create: true` een vrij te kiezen aanduiding (het echte id komt terug als `id`, jouw waarde als `requestedId`).' },
            create: { type: 'boolean', description: 'Maak de kalender aan als het id niet bestaat.' },
            name: { type: 'string' },
            description: { type: 'string' },
            workDays: {
              type: 'array',
              items: { type: 'integer', minimum: 1, maximum: 7 },
              description: 'Werkdagen als ISO-weekdagnummers (1 = maandag … 7 = zondag).',
            },
            workStartHour: { type: 'number', description: 'Begin werkdag in UREN (0–24), bijv. 7.' },
            workEndHour: { type: 'number', description: 'Einde werkdag in UREN (0–24), bijv. 16.' },
            hoursPerDay: { type: 'number', description: 'Netto werkuren per werkdag (UREN), bijv. 8.' },
            generate: {
              type: 'object',
              description: 'Generator-basis voor feestdagen; de jaarspanne wordt uit het project afgeleid.',
              required: ['country'],
              properties: {
                country: { type: 'string', description: 'Landcode van de feestdagenset (bijv. NL, DE, BE, FR).' },
                region: { type: 'string', description: 'Bundesland/landsdeel/kanton; weglaten = landelijk.' },
                bouwvak: { type: 'string', enum: ['geen', 'noord', 'midden', 'zuid'], description: 'Alleen NL; default `geen`.' },
              },
            },
            rawHolidays: {
              type: 'array',
              description: 'Letterlijke uitzonderingen (vorstverlet, bedrijfssluiting). Toevoegen wist de generator-herkomst.',
              items: {
                type: 'object',
                required: ['name', 'startDate', 'endDate'],
                properties: {
                  name: { type: 'string' },
                  startDate: { type: 'string', description: 'ISO-datum (JJJJ-MM-DD), inclusief.' },
                  endDate: { type: 'string', description: 'ISO-datum (JJJJ-MM-DD), inclusief.' },
                },
              },
            },
          },
        },
      },
    },
    required: ['calendars'],
  },
  async handler(args, ctx) {
    const a = args as { calendars?: unknown };
    if (!Array.isArray(a.calendars) || a.calendars.length === 0) {
      return toolError(ctx, 'VALIDATION', 'update_calendar vereist een niet-lege `calendars`-array');
    }
    const items = a.calendars as CalendarItem[];

    // Lege-batch-snelpad: statisch nul uitvoerbare items ⇒ direct Ok mét de weigeringen, zónder
    // transactie/backup/snapshot/redo-wipe.
    {
      const pre = classifyCalendars(useAppStore.getState(), items);
      if (pre.plans.length === 0) {
        const g = guardNonTransactional(ctx);
        if (g) return g;
        return okDirect(ctx, { calendars: [], warnings: [], projectEnd: projectEndInfo().projectEnd }, pre.rejections);
      }
    }

    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      const { plans, rejections } = classifyCalendars(useAppStore.getState(), items);
      const rows: Record<string, unknown>[] = [];
      for (const plan of plans) {
        const item = plan.item;
        const wantsHolidays = item.generate !== undefined || item.rawHolidays !== undefined;

        if (plan.mode === 'create') {
          // Basis = de app-default (ma-vr 07-16); de opgegeven velden overschrijven hem. Het id van
          // de default wordt weggegooid: draft.addCalendar genereert een vers, document-lokaal id.
          const { id: _ignored, ...base } = createDefaultCalendar();
          const cal: Omit<WorkCalendar, 'id'> = { ...base, name: item.name ?? 'Nieuwe kalender', ...calendarFieldPatch(item) };
          let becameLiteral = false;
          if (wantsHolidays) {
            const r = resolveCalendarHolidays(
              { generate: item.generate, rawHolidays: item.rawHolidays },
              calendarSpan(useAppStore.getState(), true),
              { holidays: base.holidays, generation: base.generation },
            );
            cal.holidays = r.holidays;
            cal.generation = r.generation;
            becameLiteral = r.becameLiteral;
          }
          const newId = draft.addCalendar(cal);
          rows.push({ id: newId, requestedId: item.id, created: true, promoted: false, becameLiteral });
          continue;
        }

        // WP5b: doel is de projectkalender die nog niet in de bibliotheek staat ⇒ eerst promoveren.
        // `ensureProjectCalendarInLibrary` is puur additief (geen undo-snapshot, geen recompute) en
        // dus transactie-veilig.
        let promoted = false;
        if (plan.needsPromotion) {
          useAppStore.getState().ensureProjectCalendarInLibrary();
          promoted = true;
        }
        const existing = useAppStore.getState().calendars.find((c) => c.id === plan.targetId);
        if (!existing) {
          // Kan alleen bij een defect in de promotie — harde stap-fout i.p.v. stil doorgaan.
          throw new McpStepError('NOT_FOUND', `kalender '${plan.targetId}' bestaat niet (na promotie)`);
        }
        const updates = calendarFieldPatch(item) as Partial<WorkCalendar>;
        let becameLiteral = false;
        if (wantsHolidays) {
          const r = resolveCalendarHolidays(
            { generate: item.generate, rawHolidays: item.rawHolidays },
            calendarSpan(useAppStore.getState(), false),
            { holidays: existing.holidays, generation: existing.generation },
          );
          updates.holidays = r.holidays;
          // BEWUST altijd zetten: bij `becameLiteral` is `r.generation` undefined en MOET de
          // bestaande herkomst gewist worden (anders zou een regenerate de rauwe dagen wegvagen).
          updates.generation = r.generation;
          becameLiteral = r.becameLiteral;
        }
        draft.updateCalendar(plan.targetId, updates);
        rows.push({ id: plan.targetId, created: false, promoted, becameLiteral });
      }
      return { data: { calendars: rows }, itemRejections: rejections };
    });

    return enrichOk(res, () => {
      const rows = ((res as McpToolOk).data as { calendars: Record<string, unknown>[] }).calendars;
      const { projectEnd, cappedTaskIds } = projectEndInfo();
      // WP7-beleid: een onwerkbaar venster is een WAARSCHUWING, geen fout — de kalenderwijziging
      // blijft gecommit; de AI hoort dit prominent aan de user te melden.
      const warnings: string[] = [];
      if (cappedTaskIds) {
        warnings.push(
          `Onwerkbaar venster: ${cappedTaskIds.length} taak/taken konden niet binnen deze kalender worden ingepland ` +
          `(zie cappedTaskIds). De kalenderwijziging IS toegepast — controleer werkdagen en feestdagen.`,
        );
      }
      return { calendars: rows, warnings, projectEnd, ...(cappedTaskIds ? { cappedTaskIds } : {}) };
    });
  },
};

// =================================================================================================
// planner_manage_assignments
//
// Bulk over vier acties. De pre-validatie draait `validate.assignmentAllowed` INCREMENTEEL tegen een
// gesimuleerde, meegroeiende toewijzingsverzameling: een tweede identieke `add` binnen dezelfde call
// wordt daardoor zacht geweigerd (zonder simulatie zou de dubbeltelling-guard hem missen, want de
// store bevat de eerste toewijzing pas ná de transactie-stap). Move/remove werken de simulatie
// eveneens bij, zodat "verplaats weg en wijs opnieuw toe" binnen één call gewoon kan.
// =================================================================================================

type AssignmentAction =
  | { action: 'add'; taskId: string; resourceId: string; unitsPerDay: number; curve?: ResourceCurve }
  | { action: 'update'; assignmentId: string; unitsPerDay?: number; curve?: ResourceCurve }
  | { action: 'move'; assignmentId: string; taskId: string }
  | { action: 'remove'; assignmentId: string };

/** Gesimuleerde toewijzing tijdens de pre-validatie (alleen de velden die de guards lezen). */
interface SimAssignment { id: string; taskId: string; resourceId: string; unitsPerDay: number }

function classifyAssignments(
  s: StoreState,
  actions: AssignmentAction[],
): { plans: { index: number; action: AssignmentAction }[]; rejections: Rejection[] } {
  const plans: { index: number; action: AssignmentAction }[] = [];
  const rejections: Rejection[] = [];
  let sim: SimAssignment[] = s.assignments.map((a) => ({
    id: a.id, taskId: a.taskId, resourceId: a.resourceId, unitsPerDay: a.unitsPerDay,
  }));
  /** De vorm die `validate.assignmentAllowed` leest, met de GESIMULEERDE toewijzingen. */
  const simState = () => ({ tasks: s.tasks, sequences: s.sequences, assignments: sim });

  actions.forEach((act, index) => {
    if (!act || typeof (act as { action?: unknown }).action !== 'string') {
      rejections.push({ id: `#${index}`, reason: 'elk item vereist een `action` (add | update | move | remove)' });
      return;
    }
    switch (act.action) {
      case 'add': {
        const label = `${act.taskId}->${act.resourceId}`;
        if (typeof act.taskId !== 'string' || typeof act.resourceId !== 'string') {
          rejections.push({ id: label, reason: '`add` vereist string-`taskId` en -`resourceId`' });
          return;
        }
        if (!s.resources.some((r) => r.id === act.resourceId)) {
          rejections.push({ id: label, reason: `resource '${act.resourceId}' bestaat niet` });
          return;
        }
        const guard = validate.assignmentAllowed(simState(), act.taskId, act.resourceId, act.unitsPerDay);
        if (!guard.ok) {
          rejections.push({ id: label, reason: guard.reason });
          return;
        }
        // Simulatie bijwerken: een volgende identieke `add` botst nu op de dubbeltelling-guard.
        sim = [...sim, { id: `sim-${index}`, taskId: act.taskId, resourceId: act.resourceId, unitsPerDay: act.unitsPerDay }];
        plans.push({ index, action: act });
        return;
      }
      case 'update': {
        const cur = sim.find((x) => x.id === act.assignmentId);
        if (!cur) {
          rejections.push({ id: String(act.assignmentId), reason: `toewijzing '${act.assignmentId}' bestaat niet` });
          return;
        }
        const hasUnits = act.unitsPerDay !== undefined;
        const hasCurve = act.curve !== undefined;
        if (!hasUnits && !hasCurve) {
          rejections.push({ id: act.assignmentId, reason: 'geen `unitsPerDay` of `curve` opgegeven' });
          return;
        }
        if (hasUnits && !(typeof act.unitsPerDay === 'number' && Number.isFinite(act.unitsPerDay) && act.unitsPerDay > 0)) {
          rejections.push({ id: act.assignmentId, reason: `ongeldige unitsPerDay ${String(act.unitsPerDay)} (eenheden/dag, strikt positief vereist)` });
          return;
        }
        if (hasUnits) cur.unitsPerDay = act.unitsPerDay!;
        plans.push({ index, action: act });
        return;
      }
      case 'move': {
        const cur = sim.find((x) => x.id === act.assignmentId);
        if (!cur) {
          rejections.push({ id: String(act.assignmentId), reason: `toewijzing '${act.assignmentId}' bestaat niet` });
          return;
        }
        const target = s.tasks.find((t) => t.id === act.taskId);
        if (!target) {
          rejections.push({ id: act.assignmentId, reason: `doeltaak '${act.taskId}' bestaat niet` });
          return;
        }
        if (target.isMilestone || target.childIds.length > 0) {
          rejections.push({ id: act.assignmentId, reason: `doeltaak '${act.taskId}' is een mijlpaal/verzameltaak; die dragen geen resources` });
          return;
        }
        if (sim.some((x) => x.id !== cur.id && x.taskId === act.taskId && x.resourceId === cur.resourceId)) {
          rejections.push({ id: act.assignmentId, reason: `resource '${cur.resourceId}' is al toegewezen aan taak '${act.taskId}' (verplaatsen zou de last dubbel tellen)` });
          return;
        }
        cur.taskId = act.taskId;
        plans.push({ index, action: act });
        return;
      }
      case 'remove': {
        if (!sim.some((x) => x.id === act.assignmentId)) {
          rejections.push({ id: String(act.assignmentId), reason: `toewijzing '${act.assignmentId}' bestaat niet` });
          return;
        }
        sim = sim.filter((x) => x.id !== act.assignmentId);
        plans.push({ index, action: act });
        return;
      }
      default:
        rejections.push({ id: `#${index}`, reason: `onbekende actie '${(act as { action: string }).action}' (add | update | move | remove)` });
    }
  });
  return { plans, rejections };
}

const manageAssignments: McpToolDef = {
  name: 'planner_manage_assignments',
  description:
    'Beheer resource-toewijzingen in bulk (één call = één ongedaan-maak-stap). Per item één `action`: ' +
    '`add` (`taskId`, `resourceId`, `unitsPerDay` = eenheden per WERKDAG waarbij 1 = 100% / één ' +
    'persoon, optioneel `curve`), `update` (`assignmentId` + `unitsPerDay` en/of `curve`), `move` ' +
    '(`assignmentId` naar een andere `taskId`) of `remove` (`assignmentId`). De id\'s en veldnamen zijn ' +
    'exact die van de leestools (get_task/list_resources), dus je kunt ze rechtstreeks terugstoppen. ' +
    'Toewijzen kan alleen op een BLADTAAK (geen mijlpaal, geen verzameltaak) en dezelfde resource mag ' +
    'maar één keer op dezelfde taak staan — een tweede toewijzing zou de last dubbel tellen en wordt ' +
    'zacht geweigerd, óók als het duplicaat binnen deze ene call zit. Geweigerde items komen terug in ' +
    '`itemRejections`; de geldige items blijven gewoon staan.',
  kind: 'mutate',
  batchable: true,
  annotations: { ...STD_ANNOT },
  inputSchema: {
    type: 'object',
    properties: {
      actions: {
        type: 'array',
        minItems: 1,
        description: 'De uit te voeren toewijzings-acties, in volgorde.',
        items: {
          type: 'object',
          required: ['action'],
          properties: {
            action: { type: 'string', enum: ['add', 'update', 'move', 'remove'] },
            taskId: { type: 'string', description: 'Bij `add`: de bladtaak. Bij `move`: de NIEUWE bladtaak.' },
            resourceId: { type: 'string', description: 'Alleen bij `add`.' },
            assignmentId: { type: 'string', description: 'Bij `update`/`move`/`remove`; exact het id uit de leestools.' },
            unitsPerDay: { type: 'number', exclusiveMinimum: 0, description: 'Eenheden per WERKDAG (1 = 100% = één persoon/stuk; 0,5 = halve dag).' },
            curve: {
              type: 'string',
              enum: ['UNIFORM', 'FRONT_LOADED', 'BACK_LOADED', 'BELL', 'EARLY_PEAK', 'LATE_PEAK'],
              description: 'Verdeelcurve over de duur; weglaten = UNIFORM.',
            },
          },
        },
      },
    },
    required: ['actions'],
  },
  async handler(args, ctx) {
    const a = args as { actions?: unknown };
    if (!Array.isArray(a.actions) || a.actions.length === 0) {
      return toolError(ctx, 'VALIDATION', 'manage_assignments vereist een niet-lege `actions`-array');
    }
    const actions = a.actions as AssignmentAction[];

    // Lege-batch-snelpad (zie T19-reviewfix Issue 2).
    {
      const pre = classifyAssignments(useAppStore.getState(), actions);
      if (pre.plans.length === 0) {
        const g = guardNonTransactional(ctx);
        if (g) return g;
        return okDirect(
          ctx,
          { added: [], updated: [], moved: [], removed: [], projectEnd: projectEndInfo().projectEnd },
          pre.rejections,
        );
      }
    }

    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      const { plans, rejections } = classifyAssignments(useAppStore.getState(), actions);
      const added: Record<string, unknown>[] = [];
      const updated: string[] = [];
      const moved: { assignmentId: string; taskId: string }[] = [];
      const removed: string[] = [];
      for (const { action } of plans) {
        switch (action.action) {
          case 'add': {
            const id = draft.assignResource(action.taskId, action.resourceId, action.unitsPerDay, action.curve);
            added.push({
              assignmentId: id,
              taskId: action.taskId,
              resourceId: action.resourceId,
              unitsPerDay: action.unitsPerDay,
              ...(action.curve ? { curve: action.curve } : {}),
            });
            break;
          }
          case 'update': {
            const patch: { unitsPerDay?: number; curve?: ResourceCurve } = {};
            if (action.unitsPerDay !== undefined) patch.unitsPerDay = action.unitsPerDay;
            if (action.curve !== undefined) patch.curve = action.curve;
            draft.updateAssignment(action.assignmentId, patch);
            updated.push(action.assignmentId);
            break;
          }
          case 'move': {
            draft.moveAssignment(action.assignmentId, action.taskId);
            moved.push({ assignmentId: action.assignmentId, taskId: action.taskId });
            break;
          }
          case 'remove': {
            draft.unassignResource(action.assignmentId);
            removed.push(action.assignmentId);
            break;
          }
        }
      }
      return { data: { added, updated, moved, removed }, itemRejections: rejections };
    });

    return enrichOk(res, () => ({
      ...((res as McpToolOk).data as object),
      projectEnd: projectEndInfo().projectEnd,
    }));
  },
};

// =================================================================================================
// planner_level_resources (spec §level_resources-contract)
//
// Volgorde: guards → `ensureFreshSchedule` (WP8-patroon: een stale planning maakt de before/after-
// delta's onzin; `runCPM` pusht per invariant nooit een undo-snapshot, dus dit kost geen undo-stap)
// → preview → optioneel commit. `dryRun` gaat NIET door een transactie: er valt niets te backuppen
// of terug te rollen (`levelResources` is een pure preview-berekening op de store).
// De respons draagt ALTIJD het volledige LevelingResult.
// =================================================================================================

function levelingData(r: LevelingResult, dryRun: boolean, recomputed: boolean, constrainToFloat: boolean) {
  const calendarDays = safeDiffDays(r.projectEndBefore, r.projectEndAfter);
  const unresolvedCount = Object.keys(r.unresolved).length;
  const warnings: string[] = [];
  if (!constrainToFloat && calendarDays !== 0) {
    warnings.push(
      `De projecteinddatum VERSCHUIFT: ${r.projectEndBefore} → ${r.projectEndAfter} (${calendarDays > 0 ? '+' : ''}${calendarDays} kalenderdagen). ` +
      'Dit is het gevolg van `constrainToFloat: false`; met `true` blijft de einddatum heilig.',
    );
  }
  if (unresolvedCount > 0) {
    warnings.push(
      `${unresolvedCount} taak/taken houden een onopgeloste piek; zie \`unresolvedReasons\` ` +
      '(INTRINSIC_OVERRUN = de taak vraagt op zichzelf al meer dan de capaciteit, CALENDAR_MISMATCH = ' +
      'resource- en taakkalender sluiten niet aan, INSUFFICIENT_CAPACITY = er is domweg te weinig capaciteit).',
    );
  }
  return {
    dryRun,
    recomputed,
    constrainToFloat,
    delays: r.delays,
    unresolved: r.unresolved,
    unresolvedReasons: r.unresolvedReasons,
    shifts: r.shifts,
    projectEndBefore: r.projectEndBefore,
    projectEndAfter: r.projectEndAfter,
    projectEndDelta: { before: r.projectEndBefore, after: r.projectEndAfter, calendarDays },
    warnings,
  };
}

const levelResources: McpToolDef = {
  name: 'planner_level_resources',
  description:
    'Nivelleer resource-pieken door taken binnen hun speling (of daarbuiten) te verschuiven. ' +
    '`constrainToFloat: true` (default) = gladstrijken BINNEN de speling: de projecteinddatum blijft ' +
    'heilig en pieken die niet oplosbaar zijn blijven staan. `constrainToFloat: false` = de einddatum ' +
    'mag opschuiven; de respons meldt die verschuiving dan prominent in `projectEndDelta` en ' +
    '`warnings`. Met `resourceIds` beperk je het tot bepaalde resources (materiaal wordt altijd ' +
    'overgeslagen); met `dryRun: true` krijg je een volledige PREVIEW zonder ook maar iets te ' +
    'wijzigen — aan te raden vóór je toepast. De respons bevat altijd het volledige resultaat: ' +
    '`delays` (toegepaste vertraging in werkdagen), `shifts` (elke taak wiens start opschuift), ' +
    '`unresolved` + `unresolvedReasons` (waaróm een piek bleef staan) en projecteinde vóór/na. ' +
    'De nivellering reset zichzelf eerst volledig, dus opnieuw draaien stapelt niet.',
  kind: 'mutate',
  batchable: true,
  annotations: { ...STD_ANNOT },
  inputSchema: {
    type: 'object',
    properties: {
      constrainToFloat: {
        type: 'boolean',
        description: 'true (default) = alleen binnen de totale speling schuiven, einddatum blijft heilig. false = einddatum mag verschuiven.',
      },
      resourceIds: {
        type: 'array',
        items: { type: 'string' },
        description: 'Beperk tot deze resources; weglaten = alle hernieuwbare resources (materiaal telt nooit mee).',
      },
      dryRun: { type: 'boolean', description: 'true = alleen preview; er wordt NIETS gewijzigd en er ontstaat geen ongedaan-maak-stap.' },
    },
  },
  async handler(args, ctx) {
    const a = (args ?? {}) as { constrainToFloat?: unknown; resourceIds?: unknown; dryRun?: unknown };
    if (a.constrainToFloat !== undefined && typeof a.constrainToFloat !== 'boolean') {
      return toolError(ctx, 'VALIDATION', '`constrainToFloat` moet een boolean zijn');
    }
    if (a.resourceIds !== undefined && !Array.isArray(a.resourceIds)) {
      return toolError(ctx, 'VALIDATION', '`resourceIds` moet een array van resource-id\'s zijn');
    }
    const constrainToFloat = a.constrainToFloat !== false; // default true (de hoofdroute)
    const dryRun = a.dryRun === true;
    const options: LevelingOptions = {
      constrainToFloat,
      ...(Array.isArray(a.resourceIds) ? { resourceIds: a.resourceIds as string[] } : {}),
    };

    // Guards vóór de (potentieel dure) herberekening; `runMutateTool` draait ze zo dadelijk nogmaals
    // plus de backup — dat is bewust: een gepauzeerde bridge mag ook geen recompute uitlokken.
    const g = guardNonTransactional(ctx);
    if (g) return g;

    const fresh = ensureFreshSchedule();
    if (fresh.error) {
      return toolError(ctx, 'VALIDATION', `planning kon niet worden herrekend vóór het nivelleren: ${fresh.error}`);
    }

    if (dryRun) {
      const preview = useAppStore.getState().levelResources(options);
      return okDirect(ctx, levelingData(preview, true, fresh.recomputed, constrainToFloat), []);
    }

    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      const preview = useAppStore.getState().levelResources(options);
      draft.applyLeveling(preview);
      return { data: preview };
    });
    return enrichOk(res, () =>
      levelingData((res as McpToolOk).data as LevelingResult, false, fresh.recomputed, constrainToFloat),
    );
  },
};

// =================================================================================================
// planner_clear_leveling
// =================================================================================================
const clearLeveling: McpToolDef = {
  name: 'planner_clear_leveling',
  description:
    'Wis alle nivellerings-vertragingen, zodat elke taak weer op zijn ongenivelleerde datum staat. ' +
    'Let op: `planner_level_resources` reset de vertragingen ZELF voordat het rekent — deze tool ' +
    'vooraf draaien is dus zinloos. Gebruik hem alleen om een eerdere nivellering ongedaan te maken ' +
    'zonder een nieuwe te berekenen.',
  kind: 'mutate',
  batchable: true,
  annotations: { ...STD_ANNOT, destructiveHint: true, idempotentHint: true },
  inputSchema: { type: 'object', properties: {} },
  async handler(_args, ctx) {
    const count = useAppStore.getState().tasks.filter((t) => t.levelingDelay !== undefined).length;
    // No-op-snelpad (spiegelt de store-`clearLeveling`-guard): niets te wissen ⇒ geen transactie,
    // geen undo-snapshot, geen redo-wipe.
    if (count === 0) {
      const g = guardNonTransactional(ctx);
      if (g) return g;
      return okDirect(ctx, { cleared: 0, projectEnd: projectEndInfo().projectEnd }, []);
    }
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      draft.clearLeveling();
      return { data: { cleared: count } };
    });
    return enrichOk(res, () => ({ cleared: count, projectEnd: projectEndInfo().projectEnd }));
  },
};

// =================================================================================================
// planner_update_project
// =================================================================================================
const ISO_DATE = /^\d{4}-\d{2}-\d{2}/;

const updateProject: McpToolDef = {
  name: 'planner_update_project',
  description:
    'Wijzig projectgegevens: `name`, `description`, `author`, `company`, `statusDate` (de peildatum ' +
    'waarop voortgang wordt geregistreerd — zónder deze datum weigert het voortgangspad van ' +
    'update_tasks) en `startDate`. BELANGRIJK over `startDate`: dat is UITSLUITEND het anker voor ' +
    'NIEUW aan te maken taken — het verschuift GEEN enkele bestaande taak. Wil je de hele bestaande ' +
    'planning opschuiven, gebruik dan `planner_move_project`. Zet `startDate` dus vóór add_tasks, ' +
    'niet erna. `statusDate: null` (of een lege string) wist de statusdatum.',
  kind: 'mutate',
  batchable: true,
  annotations: { ...STD_ANNOT },
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      author: { type: 'string' },
      company: { type: 'string' },
      startDate: { type: 'string', description: 'ISO-datum (JJJJ-MM-DD). Anker voor NIEUWE taken; verschuift bestaande taken NIET.' },
      statusDate: { type: ['string', 'null'], description: 'ISO-datum (JJJJ-MM-DD) of null om te wissen.' },
    },
  },
  async handler(args, ctx) {
    const a = (args ?? {}) as Record<string, unknown>;
    const updates: Partial<Project> = {};
    for (const key of ['name', 'description', 'author', 'company'] as const) {
      if (a[key] !== undefined) {
        if (typeof a[key] !== 'string') return toolError(ctx, 'VALIDATION', `\`${key}\` moet een string zijn`);
        updates[key] = a[key] as string;
      }
    }
    if (a.startDate !== undefined) {
      if (typeof a.startDate !== 'string' || !ISO_DATE.test(a.startDate)) {
        return toolError(ctx, 'VALIDATION', '`startDate` moet een ISO-datum zijn (JJJJ-MM-DD)');
      }
      updates.startDate = a.startDate;
    }
    // Wissen loopt NIET via de veld-merge: `Object.assign({ statusDate: undefined })` laat de sleutel
    // met waarde `undefined` achter, terwijl de store-actie `setStatusDate` hem echt `delete`t. Die
    // vorm houden we aan (IFC-serialisatie en de statusdatum-guards lezen op sleutel-aanwezigheid).
    let clearStatusDate = false;
    if (a.statusDate !== undefined) {
      if (a.statusDate === null || a.statusDate === '') {
        clearStatusDate = true;
      } else if (typeof a.statusDate !== 'string' || !ISO_DATE.test(a.statusDate)) {
        return toolError(ctx, 'VALIDATION', '`statusDate` moet een ISO-datum zijn (JJJJ-MM-DD) of null');
      } else {
        updates.statusDate = a.statusDate;
      }
    }
    const touched = [...Object.keys(updates), ...(clearStatusDate ? ['statusDate'] : [])];
    if (touched.length === 0) {
      return toolError(ctx, 'VALIDATION', 'update_project vereist minstens één veld (name/description/author/company/startDate/statusDate)');
    }

    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      draft.setProject(updates);
      if (clearStatusDate) {
        useAppStore.setState((s) => {
          delete s.project.statusDate;
          s.project.modifiedAt = new Date().toISOString();
          s.isDirty = true;
        });
      }
      return { data: { updated: touched } };
    });
    return enrichOk(res, () => {
      const p = useAppStore.getState().project;
      return {
        updated: touched,
        project: { name: p.name, startDate: p.startDate, statusDate: p.statusDate ?? null },
        // Herinnering in de payload zelf: de AI leest data vaak eerder dan de beschrijving.
        note: '`startDate` is alleen het anker voor NIEUWE taken; gebruik planner_move_project om de bestaande planning te verschuiven.',
        projectEnd: projectEndInfo().projectEnd,
      };
    });
  },
};

// =================================================================================================
// planner_move_project — wrapt de bestaande slice-actie `moveProject` binnen de transactie.
//
// ROUTE-KEUZE (zelfde als T19's `move_task`): we roepen de slice-actie DIRECT aan i.p.v. een eigen
// draft-primitief te bouwen. De verschuif-logica (project-, taak-, resource- en baseline-datums,
// exacte-datum-pinning i.p.v. Δ-drift) leeft in `moveProject` en mag niet gedupliceerd worden. De
// transactie-suppressievlag dekt de interne `beginUndoable`, zodat het één undo-stap blijft.
//
// DUBBELE runCPM — BEWUST GEACCEPTEERD: `moveProject` draait na zijn `set()` zelf `runCPM()` (+
// `requestFitToProject`), en `runInMcpTransaction` draait aan het eind nóg een keer `runCPM`. Dat is
// één overbodige herberekening. Het alternatief — de verschuif-logica hier nabouwen zonder de
// trailing recompute — zou de enige bron van waarheid dupliceren en bij elke wijziging in
// `moveProject` stil uit de pas gaan lopen. `runCPM` is idempotent en pusht geen undo-snapshot
// (invariant a), dus de dubbele run is puur rekenwerk, geen semantisch verschil.
// =================================================================================================
const moveProject: McpToolDef = {
  name: 'planner_move_project',
  description:
    'Verschuif de HELE bestaande planning zodat het project op `newStartDate` begint: alle taken en ' +
    'resource-datums schuiven mee. Dit is het tegenovergestelde van `planner_update_project.startDate` ' +
    '(dat alleen het anker voor nieuwe taken zet). Let op: de KALENDERS schuiven bewust NIET mee — ' +
    'feestdagen en bouwvak liggen op vaste datums, dus de einddatum kan met een ánder aantal dagen ' +
    'verspringen dan de verschuiving zelf; de respons meldt beide. Baselines blijven standaard staan ' +
    '(een baseline bestaat om afwijking te meten); met `shiftBaselines: true` schuiven ze mee.',
  kind: 'mutate',
  batchable: true,
  annotations: { ...STD_ANNOT },
  inputSchema: {
    type: 'object',
    properties: {
      newStartDate: { type: 'string', description: 'Nieuwe projectstart als ISO-datum (JJJJ-MM-DD).' },
      shiftBaselines: { type: 'boolean', description: 'Laat opgeslagen baselines meeschuiven; default false.' },
    },
    required: ['newStartDate'],
  },
  async handler(args, ctx) {
    const a = (args ?? {}) as { newStartDate?: unknown; shiftBaselines?: unknown };
    if (typeof a.newStartDate !== 'string' || !ISO_DATE.test(a.newStartDate)) {
      return toolError(ctx, 'VALIDATION', '`newStartDate` moet een ISO-datum zijn (JJJJ-MM-DD)');
    }
    const newStartDate = a.newStartDate;
    const shiftBaselines = a.shiftBaselines === true;

    const s0 = useAppStore.getState();
    const delta = computeMoveDelta(s0.project.startDate, newStartDate);
    if (!Number.isFinite(delta)) {
      return toolError(ctx, 'VALIDATION', `kan de verschuiving niet bepalen vanaf projectstart '${s0.project.startDate}'`);
    }
    // No-op-snelpad: Δ=0 ⇒ `moveProject` muteert niets; dan ook geen transactie/undo-stap.
    if (delta === 0) {
      const g = guardNonTransactional(ctx);
      if (g) return g;
      return okDirect(
        ctx,
        { moved: false, deltaDays: 0, taskCount: s0.tasks.length, reason: 'de projectstart is al deze datum', projectEnd: projectEndInfo().projectEnd },
        [],
      );
    }
    const projectEndBefore = s0.cpmResult?.projectEnd ?? '';

    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      const out = useAppStore.getState().moveProject(newStartDate, { shiftBaselines });
      if (!out.moved) throw new McpStepError('VALIDATION', `verschuiven naar '${newStartDate}' leverde geen wijziging op`);
      return { data: out };
    });

    return enrichOk(res, () => {
      const out = (res as McpToolOk).data as { moved: boolean; deltaDays: number; taskCount: number };
      const { projectEnd, cappedTaskIds } = projectEndInfo();
      const endDeltaDays = safeDiffDays(projectEndBefore, projectEnd);
      return {
        ...out,
        newStartDate,
        shiftBaselines,
        projectEndBefore,
        projectEnd,
        endDeltaDays,
        ...(endDeltaDays !== out.deltaDays
          ? { note: `Het einde schuift ${endDeltaDays} kalenderdagen op terwijl de start ${out.deltaDays} dagen opschuift — de kalender (feestdagen/bouwvak) grijpt in.` }
          : {}),
        ...(cappedTaskIds ? { cappedTaskIds } : {}),
      };
    });
  },
};

// =================================================================================================
// planner_save_baseline (WP8 staleness-guard; UITGESLOTEN van batch)
//
// ROUTE-KEUZE (zelfde als `move_task`/`move_project`): de slice-actie `saveBaseline` wordt DIRECT
// binnen de transactie aangeroepen — er is geen draft-variant en de snapshot-logica (leaf-taken,
// early-datums met schedule-fallback, actief zetten) hoort niet gedupliceerd te worden. De
// suppressievlag dekt de interne `beginUndoable`, dus het blijft één undo-stap.
//
// `batchable: false` is normatief (spec §Compositie): een baseline hoort een losse, bewuste
// nulmeting op een vers schema te zijn; binnen een batch-snapshot zou een rollback hem mee-wissen
// en is de volgorde-semantiek onbepaald.
// =================================================================================================
const saveBaseline: McpToolDef = {
  name: 'planner_save_baseline',
  description:
    'Leg de huidige planning vast als baseline (nulmeting) en maak die direct actief; latere ' +
    'afwijkingen meet je ertegen af met compare_baseline/analyze_delay. Is de planning nog niet ' +
    'doorgerekend, dan wordt eerst herrekend zodat de baseline op verse datums staat (`recomputed` ' +
    'meldt dat). Deze tool kan NIET als stap in een batch draaien: een baseline hoort een losse, ' +
    'bewuste nulmeting te zijn. Zonder `name` krijgt de baseline een oplopende standaardnaam.',
  kind: 'mutate',
  batchable: false,
  annotations: { ...STD_ANNOT },
  inputSchema: {
    type: 'object',
    properties: { name: { type: 'string', description: 'Naam van de baseline; weglaten = "Baseline N".' } },
  },
  async handler(args, ctx) {
    const a = (args ?? {}) as { name?: unknown };
    if (a.name !== undefined && typeof a.name !== 'string') {
      return toolError(ctx, 'VALIDATION', '`name` moet een string zijn');
    }

    const g = guardNonTransactional(ctx);
    if (g) return g;

    // WP8: eerst herrekenen bij een stale planning (runCPM pusht geen undo-snapshot).
    const fresh = ensureFreshSchedule();
    if (fresh.error) {
      return toolError(ctx, 'VALIDATION', `planning kon niet worden herrekend vóór de baseline: ${fresh.error}`);
    }

    const name = (a.name as string | undefined) || `Baseline ${useAppStore.getState().baselines.length + 1}`;
    const res = await runMutateTool(ctx, 'mutate', (): MutationOutcome => {
      const id = useAppStore.getState().saveBaseline(name);
      return { data: { baselineId: id } };
    });

    return enrichOk(res, () => {
      const id = ((res as McpToolOk).data as { baselineId: string }).baselineId;
      const bl = useAppStore.getState().baselines.find((b) => b.id === id);
      return {
        baselineId: id,
        name,
        recomputed: fresh.recomputed,
        taskCount: bl?.tasks.length ?? 0,
        projectEnd: bl?.projectEnd ?? projectEndInfo().projectEnd,
      };
    });
  },
};

/** Alle T20-tools als vlakke module-array (registreer via één regel in toolRegistry.MODULES). */
export const calendarResourceTools: McpToolDef[] = [
  updateCalendar,
  manageAssignments,
  levelResources,
  clearLeveling,
  updateProject,
  moveProject,
  saveBaseline,
];
