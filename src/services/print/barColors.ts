// Pure kleurengine voor scherm en rapport. De nieuwe API ontvangt één app-globale selectie en
// een BarColorContext; de tijdelijke legacy-overload houdt tussencommits compileerbaar totdat alle
// bestaande scherm-/printaanroepers in taken 3 en 4 zijn omgezet.
import { paletteColorForId, resourceDisplayColor } from '@/engine/renderer/resourcePalette';
import {
  effectiveBarColorSelection,
  resolveBarCategoryValues,
  type BarCategoryValue,
  type BarColorContext,
} from '@/services/print/barColorCategories';
import type { BarColorSelection } from '@/types/barColor';
import type { Resource, ResourceAssignment } from '@/types/resource';
import type { Task } from '@/types/task';

/** @deprecated Tijdelijke brug voor nog niet gemigreerde aanroepers. */
export type BarColorMode = 'critical' | 'task' | 'auto' | 'resource';

export interface BarPalette {
  critical: string;
  normal: string;
  nearCritical: string;
  milestone: string;
  /** Neutrale kleur voor taken zonder waarde in de gekozen categorie. */
  uncategorized?: string;
}

export type BarFill =
  | { kind: 'solid'; fill: string; outline?: string }
  | { kind: 'segments'; segments: { color: string; weight: number }[]; outline?: string };

export const SEGMENT_MIN_PX = 12;
const DEFAULT_UNCATEGORIZED = '#94A3B8';

/** Critical-kleuring negeert bewust het oude Task.color-veld. */
function criticalFill(task: Task, palette: BarPalette): string {
  if (task.isMilestone) return palette.milestone;
  if (task.time.isCritical) return palette.critical;
  if (task.time.isNearCritical) return palette.nearCritical;
  return palette.normal;
}

/** Exacte oude critical-vulling, uitsluitend voor de tijdelijke overload. */
function legacyCriticalFill(task: Task, palette: BarPalette): string {
  if (task.isMilestone) return palette.milestone;
  if (task.time.isCritical) return palette.critical;
  if (task.time.isNearCritical) return palette.nearCritical;
  return task.color || palette.normal;
}

/** Bestaande hulpfunctie voor Resource accent en tijdelijke legacy-aanroepers. */
export function assignmentsFor(
  taskId: string,
  resources: ReadonlyArray<Resource>,
  assignments: ReadonlyArray<ResourceAssignment>,
): { color: string; unitsPerDay: number; resourceId: string; name: string }[] {
  const byId = new Map(resources.map(resource => [resource.id, resource]));
  const rows: { color: string; unitsPerDay: number; resourceId: string; name: string }[] = [];
  for (const assignment of assignments) {
    if (assignment.taskId !== taskId) continue;
    const resource = byId.get(assignment.resourceId);
    if (!resource) continue;
    rows.push({
      color: resourceDisplayColor(resource),
      unitsPerDay: assignment.unitsPerDay,
      resourceId: resource.id,
      name: resource.name,
    });
  }
  return rows;
}

function displayColor(value: BarCategoryValue, palette: BarPalette): string {
  if (value.isNone) return palette.uncategorized ?? DEFAULT_UNCATEGORIZED;
  return value.color ?? paletteColorForId(value.key);
}

function computeSelectionColors(
  task: Task,
  selection: BarColorSelection,
  context: BarColorContext,
  palette: BarPalette,
  barPx?: number,
): BarFill {
  if (selection.mode === 'critical') {
    return { kind: 'solid', fill: criticalFill(task, palette) };
  }

  const outline = task.time.isCritical ? palette.critical : undefined;
  if (selection.mode === 'auto') {
    return { kind: 'solid', fill: paletteColorForId(task.id), outline };
  }

  const effective = effectiveBarColorSelection(selection, context).effective;
  // De fallback van een onbeschikbaar veld is altijd category/taskType.
  if (effective.mode !== 'category') {
    return { kind: 'solid', fill: criticalFill(task, palette) };
  }
  const values = resolveBarCategoryValues(task, effective.field, context);
  const firstColor = displayColor(values[0], palette);

  // Een mijlpaal is één ruit; één waarde en een smalle balk hebben evenmin leesbare segmenten.
  if (task.isMilestone || values.length === 1 || (barPx !== undefined && barPx < SEGMENT_MIN_PX)) {
    return { kind: 'solid', fill: firstColor, outline };
  }

  const total = values.reduce((sum, value) => sum + Math.max(0, value.weight), 0) || 1;
  return {
    kind: 'segments',
    segments: values.map(value => ({
      color: displayColor(value, palette),
      weight: Math.max(0, value.weight) / total,
    })),
    outline,
  };
}

export function computeBarColors(
  task: Task,
  selection: BarColorSelection,
  context: BarColorContext,
  palette: BarPalette,
  barPx?: number,
): BarFill;
/** @deprecated Tijdelijke overload; verdwijnt zodra alle renderers het gedeelde contract gebruiken. */
export function computeBarColors(
  task: Task,
  resources: ReadonlyArray<Resource>,
  assignments: ReadonlyArray<ResourceAssignment>,
  mode: BarColorMode,
  palette: BarPalette,
  barPx?: number,
): BarFill;
export function computeBarColors(
  task: Task,
  selectionOrResources: BarColorSelection | ReadonlyArray<Resource>,
  contextOrAssignments: BarColorContext | ReadonlyArray<ResourceAssignment>,
  paletteOrMode: BarPalette | BarColorMode,
  barPxOrPalette?: number | BarPalette,
  legacyBarPx?: number,
): BarFill {
  if (!Array.isArray(selectionOrResources)) {
    return computeSelectionColors(
      task,
      selectionOrResources as BarColorSelection,
      contextOrAssignments as BarColorContext,
      paletteOrMode as BarPalette,
      barPxOrPalette as number | undefined,
    );
  }

  const resources = selectionOrResources as ReadonlyArray<Resource>;
  const assignments = contextOrAssignments as ReadonlyArray<ResourceAssignment>;
  const mode = paletteOrMode as BarColorMode;
  const palette = barPxOrPalette as BarPalette;
  const context: BarColorContext = {
    activityCodeTypes: [],
    customFieldDefs: [],
    resources,
    assignments,
    noneLabel: '(geen)',
  };

  // De oude task-modus blijft alleen in deze compileerbrug functioneel. Nieuwe aanroepers kunnen
  // hem niet kiezen en de brug wordt bij de UI-migratie verwijderd.
  if (mode === 'task') {
    const outline = task.time.isCritical ? palette.critical : undefined;
    if (task.color) return { kind: 'solid', fill: task.color, outline };
    return { kind: 'solid', fill: legacyCriticalFill(task, palette) };
  }
  if (mode === 'resource') {
    const outline = task.time.isCritical ? palette.critical : undefined;
    const rows = assignmentsFor(task.id, resources, assignments);
    if (task.isMilestone) {
      return {
        kind: 'solid',
        fill: rows.length > 0 ? rows[0].color : palette.milestone,
        outline,
      };
    }
    if (rows.length === 0) return { kind: 'solid', fill: palette.normal, outline };
    if (rows.length === 1 || (legacyBarPx !== undefined && legacyBarPx < SEGMENT_MIN_PX)) {
      return { kind: 'solid', fill: rows[0].color, outline };
    }
    const total = rows.reduce((sum, row) => sum + row.unitsPerDay, 0) || 1;
    return {
      kind: 'segments',
      segments: rows.map(row => ({ color: row.color, weight: row.unitsPerDay / total })),
      outline,
    };
  }
  if (mode === 'auto') {
    return computeSelectionColors(task, { mode: 'auto' }, context, palette, legacyBarPx);
  }
  return { kind: 'solid', fill: legacyCriticalFill(task, palette) };
}

export type { BarCategoryValue, BarColorContext };
