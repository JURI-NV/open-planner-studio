import { useAppStore } from '@/state/appStore';
import { withTransaction } from '@/state/batchTransaction';

/**
 * Bulk-acties over een lijst taak-ids als ÉÉN ongedaan-maakbare stap (issue #45, en de
 * gelijktrekking van lintknop/Delete/Backspace daarna).
 *
 * Bewust in `src/state/` en niet in de component-boom (naar het model van `relationActions.ts` en
 * `taskInsertActions.ts`): het contextmenu (`components/canvas/contextMenuScope.ts`), de lintknop
 * Verwijderen (`ribbonConfig.tsx`) én de Delete/Backspace-sneltoetsen (`shortcutRegistry.ts`)
 * draaien zo letterlijk dezelfde functie — en de headless regressiebatterij
 * (`tests/planning/check-context-menu-scope.ts`) ook.
 */

/**
 * Voer een per-taak-mutator uit over de hele lijst als ÉÉN ongedaan-maakbare stap.
 *
 * Waarom dit moet (issue #45). `updateTask`, `setTaskCalendar`, `setTaskProgress` en `deleteTask`
 * zijn per-taak-acties die elk zelf `beginUndoable` aanroepen. Naïef in een lus zou één handeling
 * dus N undo-stappen kosten, terwijl de gebruiker één handeling deed en die met één Ctrl+Z terug
 * verwacht. `withTransaction` neemt de snapshot één keer vooraf en onderdrukt die van de mutators.
 *
 * Bij een lijst van één taak wordt de mutator RECHTSTREEKS aangeroepen, zonder transactie.
 * Dat is geen optimalisatie maar gedragsbehoud: `withTransaction` pusht zijn snapshot
 * onvoorwaardelijk, terwijl de mutators een no-op-guard hebben die juist géén undo-stap achterlaat
 * (`setTaskCalendar` op een taak die die kalender al heeft). De enkelvoudige route blijft daarmee
 * exact het gedrag van vóór deze fix.
 */
export function applyToTaskIds(ids: readonly string[], run: (id: string) => void): void {
  if (ids.length === 0) return;
  if (ids.length === 1) { run(ids[0]); return; }
  withTransaction(() => { for (const id of ids) run(id); });
}

/**
 * Verwijder een lijst taken als ÉÉN undo-stap — de gedeelde route achter het contextmenu-item
 * Verwijderen, de lintknop Verwijderen en Delete/Backspace. Vóór deze gelijktrekking lusten de
 * lintknop en de sneltoetsen kaal `deleteTask` per id: vijf taken wissen kostte daar vijf
 * Ctrl+Z's, terwijl het contextmenu het sinds issue #45 al als één transactie deed.
 *
 * `deleteTask` verwijdert de hele subboom plus de bijbehorende relaties/toewijzingen. Zit een
 * ouder én haar kind in de lijst, dan is de tweede aanroep een stille no-op — de lijst wordt
 * vooraf vastgelegd (kopie), dus de lus loopt niet mis op ids die er niet meer zijn, óók niet
 * wanneer de aanroeper `selectedTaskIds` doorgeeft en `deleteTask` de selectie muteert.
 */
export function deleteTasksBulk(ids: readonly string[]): void {
  const frozen = [...ids];
  applyToTaskIds(frozen, (id) => useAppStore.getState().deleteTask(id));
}
