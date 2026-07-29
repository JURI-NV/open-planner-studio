import { useAppStore } from '@/state/appStore';
import { withTransaction } from '@/state/batchTransaction';
import { firstRowIndexByTask } from '@/engine/view/visibleRows';
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
 * Het ANKER voor "Invoegen boven/onder" over een reikwijdte (issue #45, nasleep): de BOVENSTE
 * (`above`) respectievelijk ONDERSTE (`below`) taak van de reikwijdte, in de volgorde ZOALS DE
 * GEBRUIKER ZE OP HET SCHERM ZIET (`viewRows`).
 *
 * Waarom de zichtbare volgorde en niets anders. Bij een meervoudige selectie zijn er drie
 * kandidaat-volgordes, en twee daarvan zijn onvoorspelbaar voor de gebruiker:
 *  - de KLIKVOLGORDE (`selectedTaskIds`) — Ctrl+klik duwt achteraan aan (`selectTask`), dus wie
 *    van onder naar boven selecteert krijgt een ander anker dan wie van boven naar beneden
 *    selecteert. Precies het gedrag dat de eigenaar als "werkt niet zoals je zou verwachten"
 *    meldde: de nieuwe taak landde midden IN de selectie.
 *  - de RAUWE `tasks`-array — dat is de documentvolgorde, die na indent/outdent en boomopbouw niet
 *    één-op-één met het scherm loopt.
 * Alleen "bovenste/onderste zoals getoond" is voorspelbaar, en het is dezelfde volgorde die de
 * Gantt en de tabel renderen (§4.1 van de weergave-pijplijn).
 *
 * Randgevallen, bewust zo:
 *  - NIET-AANEENGESLOTEN selectie (taak 1, 3 en 5): dezelfde regel, geen uitzondering — `above`
 *    landt boven 1, `below` onder 5. De nieuwe taak omsluit de hele selectie; dat is de enige
 *    uitkomst die niet van een willekeurig "gat" afhangt.
 *  - Selectie over MEERDERE OUDERS: het anker is altijd een taak die de gebruiker écht selecteerde,
 *    dus de nieuwe taak erft de ouder en het inspringniveau van die uiterste taak (`addTask` doet
 *    dat al). `above` en `below` kunnen dan in verschillende takken landen — dat is correct: dat is
 *    letterlijk waar de bovenste en de onderste selectieregel staan. We raden geen
 *    gemeenschappelijke ouder; dat zou de taak op een plek zetten die niemand aanwees.
 *  - Een geselecteerde taak die NIET zichtbaar is (ingeklapte ouder, actief filter) heeft geen
 *    schermpositie. Zijn er zichtbare taken in de reikwijdte, dan tellen alleen die mee; is er
 *    geen enkele zichtbaar, dan valt de rangschikking terug op de documentvolgorde van `tasks`.
 *  - Gegroepeerde weergave kan één taak in meerdere banden tonen; dan telt de EERSTE rij, net als
 *    bij de relatiepijlen (`firstRowIndexByTask`).
 *
 * Geeft `undefined` bij een lege reikwijdte — de aanroeper voegt dan achteraan toe (`addTask`
 * zonder `position`), exact het bestaande "geen selectie"-gedrag van de Insert-sneltoets.
 */
export function insertAnchorForScope(ids: string[], where: 'above' | 'below'): string | undefined {
  if (ids.length === 0) return undefined;
  if (ids.length === 1) return ids[0];

  const { viewRows, tasks } = useAppStore.getState();
  const rowIndex = firstRowIndexByTask(viewRows);
  const zichtbaar = ids.filter((id) => rowIndex.has(id));

  let rank: (id: string) => number;
  let pool: string[];
  if (zichtbaar.length > 0) {
    pool = zichtbaar;
    rank = (id) => rowIndex.get(id)!;
  } else {
    const docIndex = new Map(tasks.map((t, i) => [t.id, i]));
    pool = ids;
    rank = (id) => docIndex.get(id) ?? Number.MAX_SAFE_INTEGER;
  }

  let best = pool[0];
  for (const id of pool) {
    if (where === 'above' ? rank(id) < rank(best) : rank(id) > rank(best)) best = id;
  }
  return best;
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
   * "Invoegen boven/onder": ÉÉN nieuwe taak voor de hele reikwijdte — niet één per geselecteerde
   * taak. Het anker is de uiterste taak van de reikwijdte in schermvolgorde (zie
   * `insertAnchorForScope`); `addTask` regelt daarna zelf de ouder, de `childIds`-volgorde en de
   * ene undo-stap. Rechtsklik buiten de selectie ⇒ alleen die taak, net als bij de rest van het
   * menu (`contextMenuOutlineScope`).
   */
  insert(taskId: string, where: 'above' | 'below', name: string): void {
    const anchorId = insertAnchorForScope(contextMenuOutlineScope(taskId), where);
    useAppStore.getState().addTask(anchorId ? { name, position: { anchorId, where } } : { name });
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
