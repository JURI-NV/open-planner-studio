// Balkkleurmodi voor de rapportexport (#21 punt 1-nieuw, ontwerpdoc 2026-08-14 §4). PUUR: één
// functie per balk, geen Draw2D/store — headless testbaar. De printlaag (printPreview.ts) vertaalt
// het resultaat naar fill-/roundRect-/strokeRect-aanroepen; de scherm-accent-renderer gebruikt
// `assignmentsFor` direct.
//
// Modi (PrintOptions.barColorMode):
//  - 'critical': huidige gedrag — kritiek rood, bijna-kritiek oranje, rest blauw (default).
//  - 'task':     Task.color als gezet, anders critical-logica (B6).
//  - 'auto':     hash op taak-id → paletkleur; stabiel bij herordenen (B6).
//  - 'resource': segmenten naar rato van unitsPerDay per toegewezen resource; zonder toewijzing
//                neutraal blauw; kleurloze resource → hash-fallback (B5/B7/B8).
// Kritieke taken krijgen in de NIET-critical-modi een rode outline i.p.v. massaal rood (B5) — de
// vulling blijft de modus trouw, het kritieke pad blijft leesbaar.
import { paletteColorForId, resourceDisplayColor } from '@/engine/renderer/resourcePalette';
import type { Task } from '@/types/task';
import type { Resource, ResourceAssignment } from '@/types/resource';

export type BarColorMode = 'critical' | 'task' | 'auto' | 'resource';

/** De kleuren die de printlaag doorgeeft — bewust letterlijk (geen PRINT_PALETTE-import): zo blijft
 *  deze module vrij van de themePalette-module en volledig headless testbaar. */
export interface BarPalette {
  critical: string;
  normal: string;
  nearCritical: string;
  milestone: string;
}

/** Eén kleuradvies voor een balk: solide, of gesegmenteerd (meer resources op één taak). */
export type BarFill =
  | { kind: 'solid'; fill: string; outline?: string }
  | { kind: 'segments'; segments: { color: string; weight: number }[]; outline?: string };

/** Drempel waaronder segmenten zinloos zijn (onleesbare reepjes) → solide eerste kleur (§4). */
export const SEGMENT_MIN_PX = 12;

/** De critical-logica van vóór deze feature, gedeeld door 'critical' en de 'task'-fallback.
 *  Spiegelt printPreview's oorspronkelijke kleurkeuze (critical → nearCritical → normal), plus
 *  Task.color als laatste eigen kleur — precies wat de oude code voor niet-kritieke bladbalken al
 *  kon (al gebruikte de print het niet); in critical-modus blijft Task.color dus werkend. */
function criticalFill(task: Task, pal: BarPalette): string {
  if (task.isMilestone) return pal.milestone;
  if (task.time.isCritical) return pal.critical;
  if (task.time.isNearCritical) return pal.nearCritical;
  return task.color || pal.normal;
}

/** Toegewezen resources voor een taak, als (displaykleur, units)-paren in toewijzingsvolgorde.
 *  Onbekende resource-id's (dode toewijzing) worden overgeslagen. */
export function assignmentsFor(
  taskId: string,
  resources: ReadonlyArray<Resource>,
  assignments: ReadonlyArray<ResourceAssignment>,
): { color: string; unitsPerDay: number; resourceId: string; name: string }[] {
  const byId = new Map(resources.map(r => [r.id, r]));
  const out: { color: string; unitsPerDay: number; resourceId: string; name: string }[] = [];
  for (const a of assignments) {
    if (a.taskId !== taskId) continue;
    const res = byId.get(a.resourceId);
    if (!res) continue;
    out.push({ color: resourceDisplayColor(res), unitsPerDay: a.unitsPerDay, resourceId: res.id, name: res.name });
  }
  return out;
}

/**
 * Kleuradvies voor één balk. `barPx` is de balkbreedte in logische px (alleen nodig voor de
 * smalbalk-fallback; ontbreekt ⇒ segmenten altijd toestaan). Mijlpalen zijn altijd solide (ruit).
 * In 'critical'-modus is de uitkomst exact de oude kleurkeuze — geen outline.
 */
export function computeBarColors(
  task: Task,
  resources: ReadonlyArray<Resource>,
  assignments: ReadonlyArray<ResourceAssignment>,
  mode: BarColorMode,
  pal: BarPalette,
  barPx?: number,
): BarFill {
  // Mijlpalen: één ruit, geen segmenten. In de modus-modi wél de modus-kleur (indien bepaalbaar).
  if (task.isMilestone) {
    if (mode === 'critical') return { kind: 'solid', fill: pal.milestone };
    if (mode === 'task') {
      if (task.color) return { kind: 'solid', fill: task.color, outline: task.time.isCritical ? pal.critical : undefined };
      return { kind: 'solid', fill: pal.milestone };
    }
    if (mode === 'auto') {
      return { kind: 'solid', fill: paletteColorForId(task.id), outline: task.time.isCritical ? pal.critical : undefined };
    }
    // resource: eerste toegewezen resource, anders de milestone-kleur.
    const rows = assignmentsFor(task.id, resources, assignments);
    return { kind: 'solid', fill: rows.length > 0 ? rows[0].color : pal.milestone, outline: task.time.isCritical ? pal.critical : undefined };
  }

  // Samenvattende taken (childIds > 0) vallen buiten de modi: hun balk is structuur (summary-stijl),
  // geen inzet — de printlaag tekent ze zoals altijd. Voor de volledigheid leveren we wel gewoon
  // het critical-advies; de aanroeper kiest er de summary-opmaak voor.
  const outline = mode !== 'critical' && task.time.isCritical ? pal.critical : undefined;

  if (mode === 'auto') return { kind: 'solid', fill: paletteColorForId(task.id), outline };

  if (mode === 'task') {
    if (task.color) return { kind: 'solid', fill: task.color, outline };
    return { kind: 'solid', fill: criticalFill(task, pal) };
  }

  if (mode === 'resource') {
    const rows = assignmentsFor(task.id, resources, assignments);
    if (rows.length === 0) return { kind: 'solid', fill: pal.normal, outline };
    if (rows.length === 1) return { kind: 'solid', fill: rows[0].color, outline };
    if (barPx !== undefined && barPx < SEGMENT_MIN_PX) return { kind: 'solid', fill: rows[0].color, outline };
    const total = rows.reduce((a, r) => a + r.unitsPerDay, 0) || 1;
    return { kind: 'segments', segments: rows.map(r => ({ color: r.color, weight: r.unitsPerDay / total })), outline };
  }

  return { kind: 'solid', fill: criticalFill(task, pal) };
}
