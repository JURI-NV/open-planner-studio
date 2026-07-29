import { useAppStore } from '@/state/appStore';
import { withTransaction } from '@/state/batchTransaction';
import type { Task } from '@/types/task';

/**
 * Reikwijdte en uitvoering van de taak-contextmenu-acties (issue #42, issue #45).
 *
 * DOM-vrij en JSX-vrij met opzet: `GanttCanvas.tsx` is een canvas-component die zich headless niet
 * laat draaien, terwijl juist déze laag — welke taken raakt een menuklik, en hoeveel undo-stappen
 * kost dat — de regressiegevoelige helft is. Zie `tests/planning/check-context-menu-scope.ts`.
 */

/**
 * De AANGEKLIKTE taak is de handgreep, de SELECTIE is de reikwijdte: zit de aangeklikte taak in de
 * huidige selectie, dan geldt de actie voor de hele selectie; zit hij er niet in, dan alleen voor
 * die ene taak. Dat is precies de conventie die dit project al hanteert bij verticaal slepen
 * ("slepen verplaatst de hele selectie", issue #26) — draai hem niet om.
 *
 * De selectie wordt LIVE uit de store gelezen en niet uit een render-closure, zodat de
 * selectiecorrectie die `handleContextMenu` bij het openen doet (rechtsklik buiten de selectie ⇒
 * die ene taak wordt de selectie) hoe dan ook is meegenomen op het moment dat je het item aanklikt.
 */
export function contextMenuOutlineScope(taskId: string): string[] {
  const selected = useAppStore.getState().selectedTaskIds;
  return selected.includes(taskId) ? selected : [taskId];
}

/**
 * Voer een per-taak-mutator uit over de hele reikwijdte als ÉÉN ongedaan-maakbare stap.
 *
 * Waarom dit moet (issue #45). `updateTask`, `setTaskCalendar`, `setTaskProgress` en `deleteTask`
 * zijn per-taak-acties die elk zelf `beginUndoable` aanroepen. Naïef in een lus zou één menuklik dus
 * N undo-stappen kosten, terwijl de gebruiker één handeling deed en die met één Ctrl+Z terug
 * verwacht. `withTransaction` neemt de snapshot één keer vooraf en onderdrukt die van de mutators.
 *
 * Bij een reikwijdte van één taak wordt de mutator RECHTSTREEKS aangeroepen, zonder transactie.
 * Dat is geen optimalisatie maar gedragsbehoud: `withTransaction` pusht zijn snapshot
 * onvoorwaardelijk, terwijl de mutators een no-op-guard hebben die juist géén undo-stap achterlaat
 * (`setTaskCalendar` op een taak die die kalender al heeft). De enkelvoudige route blijft daarmee
 * exact het gedrag van vóór deze fix.
 */
function applyToIds(ids: string[], run: (id: string) => void): void {
  if (ids.length === 0) return;
  if (ids.length === 1) { run(ids[0]); return; }
  withTransaction(() => { for (const id of ids) run(id); });
}

/**
 * De muterende contextmenu-acties, elk over de hele reikwijdte en elk goed voor precies één
 * undo-stap. Bewust hier en niet als inline-closures in `GanttCanvas.tsx`: zo draait de
 * regressiebatterij letterlijk dezelfde functies als de UI.
 */
export const contextMenuBulk = {
  /** `indentTasks`/`outdentTasks` nemen zelf al een lijst en pushen zelf al één (lazy) snapshot. */
  indent(taskId: string): void {
    useAppStore.getState().indentTasks(contextMenuOutlineScope(taskId));
  },

  outdent(taskId: string): void {
    useAppStore.getState().outdentTasks(contextMenuOutlineScope(taskId));
  },

  /**
   * Mijlpaal aan/uit met de AANGEKLIKTE taak als anker: de nieuwe waarde wordt uit die ene taak
   * afgeleid en op de hele reikwijdte gezet. Een per-taak-toggle zou bij een gemengde selectie
   * nooit een voorspelbare uitkomst geven — dezelfde afweging waarom het contextmenu bewust
   * aparte Inklappen/Uitklappen-items heeft in plaats van één toggle (issue #42).
   */
  toggleMilestone(task: Task): void {
    const isMilestone = !task.isMilestone;
    applyToIds(contextMenuOutlineScope(task.id), (id) => useAppStore.getState().updateTask(id, { isMilestone }));
  },

  setCalendar(taskId: string, calendarId: string | undefined): void {
    // Voorfilteren op taken die écht wijzigen, zodat de no-op-guard van `setTaskCalendar` ook in
    // de bulkroute overeind blijft: een selectie die al volledig op deze kalender staat mag geen
    // (lege) undo-stap opleveren.
    const { tasks } = useAppStore.getState();
    const ids = contextMenuOutlineScope(taskId)
      .filter((id) => tasks.find((t) => t.id === id)?.calendarId !== calendarId);
    applyToIds(ids, (id) => useAppStore.getState().setTaskCalendar(id, calendarId));
  },

  setProgress(taskId: string, completion: number): void {
    applyToIds(contextMenuOutlineScope(taskId), (id) => useAppStore.getState().setTaskProgress(id, completion));
  },

  setPriority(taskId: string, priority: number): void {
    applyToIds(contextMenuOutlineScope(taskId), (id) => useAppStore.getState().updateTask(id, { priority }));
  },

  /**
   * Verwijderen doet mee met de reikwijdte: wie vijf taken selecteert en Verwijderen kiest, verwacht
   * dat er vijf verdwijnen — er één weghalen is misleidend. Er is geen bevestigingsdialoog (die
   * bestaat nergens in de app voor taken; ook de lintknop en Delete verwijderen de hele selectie
   * ongevraagd); de terugweg is Ctrl+Z, en dat is nu precies één stap voor de hele bulk.
   *
   * `deleteTask` verwijdert de hele subboom plus de bijbehorende relaties/toewijzingen. Zit een
   * ouder én haar kind in de selectie, dan is de tweede aanroep een stille no-op — de lijst is
   * vooraf vastgelegd, dus de lus loopt niet mis op ids die er niet meer zijn.
   */
  remove(taskId: string): void {
    applyToIds(contextMenuOutlineScope(taskId), (id) => useAppStore.getState().deleteTask(id));
  },
};
