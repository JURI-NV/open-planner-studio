import { Task, type ExternalLink } from '@/types/task';
import { createDefaultTaskTime, mergeTaskTime } from '@/utils/taskDefaults';
import type { Sequence } from '@/types/sequence';
import type { ResourceAssignment } from '@/types/resource';
import { generateId } from '@/utils/id';
import { formatDate } from '@/utils/dateUtils';
import { deriveWbsCodes, applyWbsNumbering, flattenOrder } from '@/utils/wbs';
import type { WbsTemplate } from '@/utils/wbsTemplates';
import { beginUndoable, finishMutation } from '../transaction';
import type { AppSlice, SiblingDirection } from './types';

/**
 * Zelfstandige kopie van een takenselectie (incl. subtaken), de interne
 * relaties en resource-toewijzingen. Deep-cloned bij het kopiëren, zodat
 * plakken ook werkt nadat de originelen gewijzigd of verwijderd zijn.
 * App-state, géén projectdata: rondt niet door de IFC-laag en zit niet in
 * de undo/redo-snapshots.
 */
export interface TaskClipboard {
  tasks: Task[];
  sequences: Sequence[];
  assignments: ResourceAssignment[];
}

export interface TaskSlice {
  tasks: Task[];
  selectedTaskIds: string[];
  taskClipboard: TaskClipboard | null;
  addTask: (task: Partial<Task> & {
    name: string;
    /** Golf 1 (fase 2.10, Insert-sneltoets/contextmenu "invoegen boven/onder"): plaats de nieuwe
     *  taak vlak vóór/ná `anchorId` binnen diens ouder, i.p.v. achteraan. Zonder → exact het
     *  huidige gedrag (bestaande callers ONGEWIJZIGD: achteraan childIds/tasks). Een onbekende
     *  `anchorId` valt stil terug op het default-gedrag (stille tolerantie, zoals elders). */
    position?: { anchorId: string; where: 'above' | 'below' };
  }) => string;
  updateTask: (id: string, updates: Partial<Task>, opts?: { coalesceKey?: string }) => void;
  deleteTask: (id: string) => void;
  /** Verplaats `id` onder een nieuwe ouder (null = root). `position` afwezig ⇒ byte-identiek aan het
   *  oude gedrag (achteraan childIds, rauwe array ongemoeid). `position` aanwezig ⇒ insert op die
   *  index — consistent in childIds (zichtbare volgorde niet-root, visibleRows.ts) ÉN in de rauwe
   *  s.tasks-array (root-volgorde + WBS via flattenOrder, dat childIds negeert); dubbele-volgorde-
   *  principe als store-`addTask` met anker. Out-of-range positie klemt naar [0, aantal siblings]. */
  moveTask: (id: string, newParentId: string | null, position?: number) => void;
  /** Issue #21 punt 1 (fase 1): verticaal taak-verslepen — verplaatst `id` naar een exacte positie
   *  (i.p.v. `moveTask`'s "altijd achteraan"). `target.parentId` = nieuwe ouder (`null` = root);
   *  `target.childIndex` = gewenste 0-based positie in diens kindlijst, geklemd op `[0..length]`.
   *  Houdt (net als `addTask`-position) ALLE drie waarheidsbronnen synchroon: `parentId`,
   *  `childIds` van oude+nieuwe ouder, én de rauwe `s.tasks`-array (enkel-node-splice, geen
   *  block-move — `flattenOrder` groepeert toch op `parentId`). Guards (in volgorde): onbekende
   *  taak/ouder, cykel (nieuwe ouder = zichzelf of een afstammeling), en no-op (zelfde ouder +
   *  zelfde effectieve index) ⇒ stil niets doen, geen undo-entry. Raakt `task.time` nergens aan.
   *  `scheduleStale` alleen bij reparent (andere ouder) — pure herordening binnen dezelfde ouder
   *  raakt geen summary-rollups, net als `reorderSibling`. */
  moveTaskTo: (id: string, target: { parentId: string | null; childIndex: number }) => void;
  /** Issue #26 (vervolgmelding op punt 6): verplaats een hele SELECTIE naar één doelpositie, met
   *  behoud van hun onderlinge (weergave)volgorde en in ÉÉN undo-stap. Gebruikt door beide
   *  sleep-hooks zodra de gesleepte rij deel uitmaakt van een meervoudige selectie; één losse rij
   *  blijft via `moveTaskTo` lopen. Regels: (a) een geselecteerde taak waarvan óók een voorouder
   *  geselecteerd is valt weg — die lift al mee met zijn ouder; (b) is `target.parentId` één van de
   *  te verplaatsen taken of een afstammeling daarvan, dan gebeurt er HELEMAAL niets (half
   *  verplaatsen is erger dan niets doen); (c) niets veranderd ⇒ geen undo-stap; (d) de selectie
   *  zelf blijft ongewijzigd. Verder identiek aan `moveTaskTo` (WBS-hernummering, `stale` alleen
   *  bij een echte reparent). */
  moveTasksTo: (ids: string[], target: { parentId: string | null; childIndex: number }) => void;
  selectTask: (id: string, multi?: boolean, range?: boolean) => void;
  selectTaskRange: (fromId: string, toId: string) => void;
  deselectAll: () => void;
  /** Golf 1 (fase 2.10, Ctrl/Cmd+A): selecteer alle ZICHTBARE taken — leest `viewRows` (dezelfde
   *  zichtbaarheids-afleiding als de tabel/Gantt, respecteert dus ingeklapte groepen/summaries).
   *  Geen undo: selectie is geen documentdata (zoals `selectTask`/`deselectAll` hierboven). */
  selectAllTasks: () => void;
  /** Golf 4 (fase 2.10, box-selection): zet de selectie op precies `ids` (vervangen), of voeg ze toe
   *  aan de bestaande selectie (`additive`, Ctrl/Cmd tijdens het slepen). Geen undo: selectie is
   *  geen documentdata (zelfde regel als `selectAllTasks`/`deselectAll` hierboven). */
  selectTasks: (ids: string[], additive: boolean) => void;
  /** Golf 1 (fase 2.10, Ctrl/Cmd+Alt+↑/↓): verwissel `taskId` met zijn vorige/volgende sibling
   *  binnen dezelfde ouder (top-level: de root-lijst). No-op aan de rand. Puur volgorde — raakt
   *  GEEN tijden/CPM, dus (in tegenstelling tot de meeste taak-acties) GEEN scheduleStale. */
  reorderSibling: (taskId: string, direction: SiblingDirection) => void;
  /** Kopieer de opgegeven takken (default: de huidige selectie) incl. subtaken naar het klembord. */
  copyTasks: (ids?: string[]) => void;
  /** Plak het klembord als nieuwe takken; geeft de nieuwe root-ids terug (leeg als er niets te plakken viel). */
  pasteTasks: () => string[];
  /** Hernummer alle WBS-codes uit de boompositie (1.2.3.4) — de expliciete variant van wbsAutoNumber. */
  renumberWbs: () => void;
  /** Inspringen (MSP Alt+Shift+→): elke taak wordt kind van zijn voorgaande zichtbare sibling. */
  indentTasks: (ids: string[]) => void;
  /** Uitspringen (MSP Alt+Shift+←): elke taak wordt sibling ná zijn huidige ouder. */
  outdentTasks: (ids: string[]) => void;
  /** Voeg een WBS-sjabloon in onder een ouder (null = rootniveau); geeft de nieuwe root-id terug. */
  insertWbsTemplate: (template: WbsTemplate, parentId: string | null) => string | null;
  /** Voortgang (fase 2.6): zet completion (0..1), dwingt de §3.2-invarianten af (auto-actualStart bij
   *  completion>0, remainingTime afgeleid, status). scheduleStale alleen als er een statusdatum is. */
  setTaskProgress: (taskId: string, completion: number, opts?: { coalesceKey?: string }) => void;
  /** Werkelijke start (fase 2.6). undefined = wissen. Retourneert false als de datum ná de
   *  statusdatum ligt (geweigerd, geen mutatie — de UI toont een toast). `opts.coalesceKey` voegt
   *  de per-toetsaanslag-commits van het LIVE-committerende datumveld tot één undo-stap samen. */
  setActualStart: (taskId: string, date: string | undefined, opts?: { coalesceKey?: string }) => boolean;
  /** Werkelijke einde (fase 2.6): zet completion=1 + status COMPLETED. undefined = wissen.
   *  Retourneert false als de datum ná de statusdatum ligt (geweigerd). `opts.coalesceKey` als bij
   *  setActualStart. */
  setActualFinish: (taskId: string, date: string | undefined, opts?: { coalesceKey?: string }) => boolean;
  /** Taak-kalender (fase 2.8a, §7.3): wijs een bibliotheek-kalender toe (undefined = projectkalender).
   *  Dwingt niets af — zet alleen `calendarId` + undo-snapshot + scheduleStale (datum-beïnvloedend). */
  setTaskCalendar: (taskId: string, calendarId: string | undefined) => void;
  /** Externe (cross-project) dependency (fase 2.9, §4.5/§5.5): voeg een link toe (genereert de id),
   *  geeft de nieuwe link-id terug. Datum-beïnvloedend ⇒ scheduleStale. */
  addExternalLink: (taskId: string, link: Omit<ExternalLink, 'id'>) => string;
  /** Verwijder een externe link van een taak (fase 2.9). Datum-beïnvloedend ⇒ scheduleStale. */
  removeExternalLink: (taskId: string, linkId: string) => void;
}

/**
 * Uitkomst van `planTaskPlacement`: WAAR een taak na de mutatie moet staan.
 * `index` is de reeds op `[0..n]` geklemde positie in de kindlijst van de nieuwe ouder, gemeten
 * in `siblingIdsAfterRemoval` (die lijst ZÓNDER de taak zelf — de mutatie is immers
 * eerst-verwijderen-dan-invoegen). `siblingIdsAfterRemoval` wordt ook gebruikt om het juiste
 * anker in de rauwe `s.tasks`-array te vinden.
 */
interface TaskPlacement {
  parentId: string | null;
  index: number;
  siblingIdsAfterRemoval: string[];
}

/**
 * Bepaalt de doelpositie van een taak ZONDER iets te muteren. Gedeeld door `moveTaskTo`
 * (rij-slepen, issue #21) en `outdentTasks` (uitspringen, issue #26) zodat uitspringen niet
 * opnieuw uit de pas kan lopen met slepen: één plek waar de guards, het klemmen én de
 * ankerbepaling wonen.
 *
 * Guards (in volgorde) ⇒ `null`, en `null` betekent voor de aanroeper: HELEMAAL niets doen —
 * geen undo-snapshot, geen halftoegepaste state:
 *  1. onbekende taak;
 *  2. onbekende doel-ouder (`null` = root is altijd geldig);
 *  3. cykel — de nieuwe ouder is de taak zelf of een afstammeling ervan (loop omhoog door de
 *     ouderketen, met visited-set tegen corrupte parentId-cycli uit een kapot IFC);
 *  4. no-op — zelfde ouder én zelfde effectieve index; alleen wanneer `opts.rejectNoOp` aanstaat.
 *     `curIdx` (index MÉT zichzelf) en `index` (index ZONDER zichzelf) zijn rechtstreeks
 *     vergelijkbaar: alles vóór `curIdx` blijft na verwijdering ongewijzigd.
 *
 * De root-"kindlijst" bestaat niet als array: de root-siblingvolgorde is de relatieve volgorde
 * binnen de rauwe `tasks`-array (zie `flattenOrder` in utils/wbs.ts, de `!parentId`-root-scan in
 * engine/view/visibleRows.ts en de toelichting in engine/view/dropTarget.ts).
 */
function planTaskPlacement(
  tasks: Task[],
  id: string,
  target: { parentId: string | null; childIndex: number },
  opts: { rejectNoOp: boolean },
): TaskPlacement | null {
  // Guard 1: taak bestaat.
  const task = tasks.find(t => t.id === id);
  if (!task) return null;

  // Guard 2: doel-ouder bestaat (of is root = null).
  const newParentId = target.parentId;
  if (newParentId !== null && !tasks.some(t => t.id === newParentId)) return null;

  // Guard 3: cykel.
  if (newParentId !== null) {
    const bezocht = new Set<string>();
    let cur: Task | undefined = newParentId === id ? task : tasks.find(t => t.id === newParentId);
    while (cur && !bezocht.has(cur.id)) {
      if (cur.id === id) return null; // newParentId is id zelf, of een afstammeling van id
      bezocht.add(cur.id);
      cur = cur.parentId ? tasks.find(t => t.id === cur!.parentId) : undefined;
    }
  }

  const oldParentId = task.parentId;
  const oldParent = oldParentId ? tasks.find(t => t.id === oldParentId) : undefined;
  const newParent = newParentId ? tasks.find(t => t.id === newParentId) : undefined;

  const siblingIdsAfterRemoval = newParent
    ? newParent.childIds.filter(cid => cid !== id)
    : tasks.filter(t => !t.parentId && t.id !== id).map(t => t.id);
  const index = Math.max(0, Math.min(target.childIndex, siblingIdsAfterRemoval.length));

  // Guard 4: no-op (alleen op verzoek — zie doc hierboven).
  if (opts.rejectNoOp && newParentId === oldParentId) {
    const curIdx = oldParent
      ? oldParent.childIds.indexOf(id)
      : tasks.filter(t => !t.parentId).map(t => t.id).indexOf(id);
    if (index === curIdx) return null;
  }

  return { parentId: newParentId, index, siblingIdsAfterRemoval };
}

/**
 * Voert een `planTaskPlacement`-plan uit en houdt ALLE drie de waarheidsbronnen synchroon:
 * `task.parentId`, de `childIds` van oude+nieuwe ouder, én de rauwe `tasks`-array.
 *
 * De rauwe array verhuist als ENKELE NODE (geen block-move van de subtree): kinderen blijven via
 * `parentId` gewoon hangen en `flattenOrder` groepeert toch op `parentId`, dus een verspreide
 * subtree is functioneel prima — exact zoals `reorderSibling`'s root-swap de array al
 * niet-aaneengesloten maakt zonder dat display/WBS breekt.
 *
 * Roep dit alleen aan met een plan dat op dezelfde (ongewijzigde) `tasks` is berekend; de
 * aanroeper doet de undo-snapshot, `applyWbsNumbering` en `finishMutation`.
 */
function applyTaskPlacement(tasks: Task[], id: string, plan: TaskPlacement): void {
  const task = tasks.find(t => t.id === id);
  if (!task) return; // kan niet: guard 1 van planTaskPlacement dekt dit al (defensief).
  const oldParent = task.parentId ? tasks.find(t => t.id === task.parentId) : undefined;
  const newParent = plan.parentId ? tasks.find(t => t.id === plan.parentId) : undefined;

  // childIds (display-bron, zie visibleRows.ts): verwijderen uit oude ouder, invoegen in nieuwe.
  if (oldParent) oldParent.childIds = oldParent.childIds.filter(cid => cid !== id);
  task.parentId = plan.parentId;
  if (newParent) newParent.childIds.splice(plan.index, 0, id);

  // Rauwe tasks-array (WBS/flatten + root-volgorde, zie utils/wbs.ts flattenOrder).
  const rawIdx = tasks.findIndex(t => t.id === id);
  const [node] = tasks.splice(rawIdx, 1);
  if (plan.index >= plan.siblingIdsAfterRemoval.length) {
    // Achteraan: vlak ná het laatste element van de kindgroep in de rauwe array (of, als er
    // geen enkele sibling is, gewoon achteraan de hele array).
    const lastSiblingId = plan.siblingIdsAfterRemoval[plan.siblingIdsAfterRemoval.length - 1];
    const lastSiblingRawIdx = lastSiblingId ? tasks.findIndex(t => t.id === lastSiblingId) : -1;
    if (lastSiblingRawIdx >= 0) tasks.splice(lastSiblingRawIdx + 1, 0, node);
    else tasks.push(node);
  } else {
    // Vóór het element dat nu (ná verwijdering van `id`) op `plan.index` staat.
    const anchorId = plan.siblingIdsAfterRemoval[plan.index];
    const anchorRawIdx = tasks.findIndex(t => t.id === anchorId);
    if (anchorRawIdx >= 0) tasks.splice(anchorRawIdx, 0, node);
    else tasks.push(node);
  }
}

/**
 * De siblinglijst van `parentId` in DISPLAY-volgorde. Voor een echte ouder is dat gewoon zijn
 * `childIds`; op rootniveau bestaat die array niet — daar is de volgorde de relatieve volgorde
 * binnen de rauwe `tasks`-array (dezelfde afleiding als in `planTaskPlacement`, `outdentTasks` en
 * engine/view/dropTarget.ts). Gedeeld door `moveTasksTo`, dat na elke plaatsing opnieuw moet meten
 * waar een taak werkelijk geland is.
 */
function siblingIdsOf(tasks: Task[], parentId: string | null): string[] {
  if (parentId === null) return tasks.filter(t => !t.parentId).map(t => t.id);
  return tasks.find(t => t.id === parentId)?.childIds ?? [];
}

/**
 * Voortgang-invarianten (§3.2), toegepast op een task-draft ná elke progress-mutatie:
 * actualFinish ⇒ completion 1 + actualStart + COMPLETED; completion 1 ⇒ actualFinish (default =
 * statusdatum, anders de taak se EIGEN geplande finish — MSP-semantiek: afvinken op 100% zonder
 * expliciete datum maakt de geplande datums de actuals, NOOIT "vandaag"); actualStart zonder
 * finish ⇒ STARTED; niets ⇒ NOT_STARTED; remainingTime = round(scheduleDuration × (1 − completion)).
 *
 * H1 (Opus-review T15-iteratie-2, app-brede regressie): vóór deze fix viel de `completion===1`-tak
 * zónder statusdatum terug op `formatDate(new Date())` ("vandaag"). Zolang `CPMSolver`'s VOLTOOID-
 * branch zelf ook een statusdatum vereiste was dat onschadelijk (de solver negeerde `actualFinish`
 * toch); sinds T15 (c2, `7a40a5ab`) is die branch UNCONDITIONEEL — een taak zonder statusdatum die
 * de gebruiker op 100% zet, teleporteerde daardoor letterlijk naar de dag van vandaag (en sleepte
 * haar opvolgers mee via de gewone FS-relatiewiskunde). De juiste terugval is de taak se EIGEN,
 * al-berekende finish (`earlyFinish` — bij een verse taak byte-identiek aan `scheduleFinish`, ná een
 * `runCPM` de laatst getoonde Gantt-datum): dat is precies wat MS Project zelf doet ("Mark on Track"/
 * 100%-invullen zonder statusdatum kopieert de GEPLANDE datums naar de actuals, nooit de kalenderdag
 * van vandaag). Zie `check-task-slice.ts`'s `prog-h1-geen-teleport-naar-vandaag`-case voor het
 * mutatiebewijs (terugzetten naar `formatDate(new Date())` laat die case rood uitslaan — behalve
 * toevallig op de dag dat de test draait, vandaar dat de case een DATUM VER IN HET VERLEDEN gebruikt
 * die nooit met "vandaag" kan samenvallen).
 */
export function applyProgressInvariants(task: Task, statusDate: string | undefined): void {
  const time = task.time;
  if (time.actualFinish) {
    time.completion = 1;
    if (!time.actualStart) time.actualStart = time.actualFinish;
    task.status = 'COMPLETED';
  } else if (time.completion >= 1) {
    time.actualFinish = statusDate || time.earlyFinish || time.scheduleFinish;
    if (!time.actualStart) time.actualStart = time.actualFinish;
    task.status = 'COMPLETED';
  } else if (time.actualStart) {
    task.status = 'STARTED';
  } else {
    task.status = 'NOT_STARTED';
  }
  time.remainingTime = Math.round(time.scheduleDuration * (1 - time.completion));
}

export const createTaskSlice: AppSlice<TaskSlice> = (set, get) => ({
  tasks: [],
  selectedTaskIds: [],
  taskClipboard: null,

  addTask: (partial) => {
    const id = generateId('task');
    set((s) => {
      beginUndoable(s);

      const now = s.project.startDate || formatDate(new Date());

      // Golf 1 (fase 2.10, Insert/contextmenu "invoegen boven/onder"): een geldige `position`
      // bepaalt zowel de OUDER (die van de anker) als de invoegplek — de aanroeper hoeft dan geen
      // (of een niet-matchende) `parentId` mee te geven. Onbekende anchorId ⇒ stille tolerantie:
      // terugval op het standaardgedrag (achteraan, partial.parentId).
      const anchorTask = partial.position
        ? s.tasks.find(t => t.id === partial.position!.anchorId)
        : undefined;
      const parentId = anchorTask ? anchorTask.parentId : (partial.parentId || null);
      // Overerving (2026-08-14): een taak met een bestaande ouder neemt diens taskType over als de
      // aanroeper zelf geen taskType opgeeft — vóór de bouwmodus-brede default. Geldt alleen op het
      // moment van aanmaken; indenteren/verslepen van een bestaande taak laat taskType met rust.
      // Zelfde regel in het MCP-pad: zie mcpTransaction.ts draft.addTask.
      const parentTask = parentId ? s.tasks.find(t => t.id === parentId) : undefined;

      const task: Task = {
        id,
        name: partial.name,
        description: partial.description || '',
        wbsCode: partial.wbsCode || '',
        // Bouwmodus (2026-07-13): neutraal taaktype-default in bouw-agnostische modus (USERDEFINED)
        // i.p.v. CONSTRUCTION. Alleen de default bij aanmaken verandert; de enum blijft intact.
        taskType: partial.taskType || parentTask?.taskType || (s.ui.constructionMode ? 'CONSTRUCTION' : 'USERDEFINED'),
        status: partial.status || 'NOT_STARTED',
        isMilestone: partial.isMilestone || false,
        milestoneKind: partial.milestoneKind,
        mandatory: partial.mandatory,
        // ?? i.p.v. || : priority 0 is een geldige waarde (laagste, levelt als eerste weg) en
        // mag niet stilzwijgend naar de default 500 vallen.
        priority: partial.priority ?? 500,
        parentId,
        childIds: [],
        // T14b (gebruikstestbevinding, ernst hoog — dataverlies): een meegegeven `partial.time` wordt
        // veld-voor-veld gemerged met de verse default i.p.v. ongewijzigd overgenomen — anders bleef
        // een ontbrekend veld (bv. `completion`) `undefined` tot writeIFC crashte op
        // `time.completion.toFixed(1)`. Zelfde regel in het MCP-pad: zie mcpTransaction.ts draft.addTask.
        time: mergeTaskTime(createDefaultTaskTime(now, partial.isMilestone ? 0 : 5), partial.time),
        resourceIds: partial.resourceIds || [],
        color: partial.color,
        constraint: partial.constraint,
        // Fase 2.9 (§3.1/§4.3): secundaire constraint doorgeven zodat de solver hem als tweede
        // grens meerekent. Afwezig ⇒ undefined ⇒ byte-identiek default-document.
        constraint2: partial.constraint2,
        // Fase 2.9 (§3.2/§4.4): hammock/LOE-vlag doorgeven zodat de solver de afgeleide-span-tak
        // draait. Afwezig ⇒ undefined ⇒ byte-identiek default-document.
        isHammock: partial.isHammock,
        // Fase 2.9 (§3.3/§4.5): externe (cross-project) dependencies doorgeven zodat de solver ze als
        // bevroren datum-grenzen meerekent. Afwezig ⇒ undefined ⇒ byte-identiek default-document.
        externalLinks: partial.externalLinks,
        deadline: partial.deadline,
        calendarId: partial.calendarId,
        // QA-fix (fase 2.10, onderdeel 2, bevinding 4): notes werd hier vergeten — de andere
        // optionele velden (constraint2/isHammock/externalLinks/...) volgen wél al dit patroon.
        notes: partial.notes,
      };

      // Zonder `position` (of een onbekende anker): exact het bestaande gedrag — achteraan.
      // Mét een geldige anker: vlak vóór/ná de anker inserten, zowel in de rauwe array (bepaalt
      // de ROOT-siblingvolgorde, zie reorderSibling hieronder + wbs.ts/flattenOrder) als in de
      // childIds van de ouder (bepaalt de zichtbare volgorde voor niet-root taken, zie
      // engine/view/visibleRows.ts) — zo blijven beide consistent met de anker-positie.
      if (anchorTask) {
        const anchorIdx = s.tasks.findIndex(t => t.id === anchorTask.id);
        const insertAt = partial.position!.where === 'above' ? anchorIdx : anchorIdx + 1;
        s.tasks.splice(insertAt, 0, task);
      } else {
        s.tasks.push(task);
      }

      // Add to parent's children
      if (task.parentId) {
        const parent = s.tasks.find(t => t.id === task.parentId);
        if (parent) {
          if (anchorTask) {
            const anchorChildIdx = parent.childIds.indexOf(anchorTask.id);
            const insertAt = anchorChildIdx >= 0
              ? (partial.position!.where === 'above' ? anchorChildIdx : anchorChildIdx + 1)
              : parent.childIds.length;
            parent.childIds.splice(insertAt, 0, id);
          } else {
            parent.childIds.push(id);
          }
        }
      }

      // WBS-code: bij auto-nummering de hele boom bijwerken; anders alleen deze taak een
      // afgeleide code geven wanneer de aanroeper er geen meegaf (lege codes breken de
      // CSV/MSP-export en -herimport, die op dotted codes koppelen).
      if (s.project.wbsAutoNumber) {
        applyWbsNumbering(s.tasks);
      } else if (!partial.wbsCode) {
        task.wbsCode = deriveWbsCodes(s.tasks).get(id) ?? '';
      }

      finishMutation(s, { stale: true }); // nieuwe taak (A6): planning verouderd tot F5.
    });
    get().recomputeViewRows();
    return id;
  },

  updateTask: (id, updates, opts) => {
    set((s) => {
      const idx = s.tasks.findIndex(t => t.id === id);
      if (idx < 0) return; // onbekend id: geen snapshot, geen loze undo-stap (R3).
      beginUndoable(s, opts); // snapshot pas ná de guard, vóór de mutatie; `opts` = coalesceKey (bv. balk-sleep = 1 stap).
      // T14b-vervolg (gebruikstestbevinding): `updates.time` (indien meegegeven) apart mergen tegen
      // de BESTAANDE tijd van de taak i.p.v. 'm via Object.assign in zijn geheel te laten vervangen —
      // anders wist een PARTIEEL time-object (bv. via de publieke `api.data.updateTask`, waar de
      // `ExtTaskTime`-volledigheid niet op runtime wordt afgedwongen) stil bestaande verplichte velden
      // (completion/floats/…) tot een lege plek diezelfde writeIFC-crash weer opende. Zie
      // `mergeTaskTime` in taskDefaults.ts voor de ADD-vs-UPDATE-basissemantiek.
      const { time, ...rest } = updates;
      Object.assign(s.tasks[idx], rest);
      if (time) s.tasks[idx].time = mergeTaskTime(s.tasks[idx].time, time);
      // Datum-rakende mutatie (duur/start/constraint/mijlpaal → planning verouderd tot F5, A6).
      finishMutation(s, { stale: true });
    });
    get().recomputeViewRows();
  },

  setTaskCalendar: (taskId, calendarId) => {
    set((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      if (task.calendarId === calendarId) return; // no-op: geen snapshot, geen stale
      beginUndoable(s);
      task.calendarId = calendarId; // undefined = projectkalender
      finishMutation(s, { stale: true }); // taak-kalender-toewijzing is datum-beïnvloedend (§5.4).
    });
    get().recomputeViewRows();
  },

  addExternalLink: (taskId, link) => {
    const id = generateId('extlink');
    set((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      beginUndoable(s);
      const full: ExternalLink = { ...link, id };
      task.externalLinks = [...(task.externalLinks ?? []), full];
      finishMutation(s, { stale: true }); // een bevroren datum-grens is datum-beïnvloedend (§4.5).
    });
    get().recomputeViewRows();
    return id;
  },

  removeExternalLink: (taskId, linkId) => {
    set((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task || !task.externalLinks) return;
      const next = task.externalLinks.filter((l) => l.id !== linkId);
      if (next.length === task.externalLinks.length) return; // no-op: niets verwijderd
      beginUndoable(s);
      task.externalLinks = next.length > 0 ? next : undefined;
      finishMutation(s, { stale: true });
    });
    get().recomputeViewRows();
  },

  deleteTask: (id) => {
    set((s) => {
      const task = s.tasks.find(t => t.id === id);
      if (!task) return; // onbekend id: geen snapshot, geen loze undo-stap.
      beginUndoable(s);

      // Remove from parent
      if (task.parentId) {
        const parent = s.tasks.find(t => t.id === task.parentId);
        if (parent) {
          parent.childIds = parent.childIds.filter(cid => cid !== id);
        }
      }

      // Remove child tasks recursively
      const removeIds = new Set<string>();
      const collectChildren = (taskId: string) => {
        removeIds.add(taskId);
        const t = s.tasks.find(tt => tt.id === taskId);
        if (t) t.childIds.forEach(collectChildren);
      };
      collectChildren(id);

      s.tasks = s.tasks.filter(t => !removeIds.has(t.id));
      s.sequences = s.sequences.filter(
        seq => !removeIds.has(seq.predecessorId) && !removeIds.has(seq.successorId)
      );
      s.assignments = s.assignments.filter(a => !removeIds.has(a.taskId));
      s.selectedTaskIds = s.selectedTaskIds.filter(sid => !removeIds.has(sid));
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      finishMutation(s, { stale: true }); // datum-rakende mutatie (A6): planning verouderd tot F5.
    });
    get().recomputeViewRows();
  },

  moveTask: (id, newParentId, position) => {
    set((s) => {
      const task = s.tasks.find(t => t.id === id);
      if (!task) return;

      // Cykel-preventie (QA-fix P1, fase 2.10 onderdeel 2): newParentId mag niet id zelf zijn,
      // en niet een afstammeling van id — anders ontstaat een lus in de boom (oneindige loops in
      // flattenOrder/viewRows). Geweigerd ⇒ GEEN snapshot, GEEN mutatie: geen halftoegepaste
      // state. Dit is de enige plek die parentId/childIds mag muteren (zie TaskDialog.handleSave —
      // die haalt parentId daarom uit de kale `updateTask`-patch en roept in plaats daarvan dit aan).
      // `position` verandert deze guards NIET: een geweigerde move blijft ook mét positie geweigerd.
      if (newParentId != null) {
        // Review issue #21 pt. 1: visited-set voorkomt een oneindige lus (app-bevriezing) op
        // corrupte parentId-cycli die id zelf niet bevatten (bereikbaar via een corrupt IFC —
        // extractNesting zet parentId zonder cykelcheck). flattenOrder overleeft zo'n cyclus
        // al met een seen-set; deze walk nu ook.
        const bezocht = new Set<string>();
        let cur: Task | undefined = newParentId === id ? task : s.tasks.find(t => t.id === newParentId);
        while (cur && !bezocht.has(cur.id)) {
          if (cur.id === id) return; // newParentId is id zelf, of een afstammeling van id
          bezocht.add(cur.id);
          cur = cur.parentId ? s.tasks.find(t => t.id === cur!.parentId) : undefined;
        }
      }

      beginUndoable(s);

      // Remove from old parent
      if (task.parentId) {
        const oldParent = s.tasks.find(t => t.id === task.parentId);
        if (oldParent) {
          oldParent.childIds = oldParent.childIds.filter(c => c !== id);
        }
      }

      // Add to new parent
      task.parentId = newParentId;

      // Insert op `position` (T12), of — zonder positie — achteraan, volgens het dubbele-
      // volgorde-principe van de store-`addTask` met anker. WBS-nummering (flattenOrder) leest de
      // RAUWE array-volgorde en negeert childIds; de zichtbare volgorde van niet-root taken leest
      // juist childIds (visibleRows.ts). Daarom moet de invoegplek op BEIDE plekken kloppen — ook
      // zonder expliciete `position` (voorheen liet die tak de rauwe array ongemoeid, waardoor het
      // WBS-nummer de oude array-positie van vóór de move bleef volgen terwijl de taak zichtbaar
      // achteraan verscheen: gerapporteerde 3.1/3.2/3.3-bug, taskDialog "parent wijzigen").
      //
      // (1) childIds van de nieuwe ouder — zichtbare volgorde voor niet-root taken.
      if (newParentId) {
        const newParent = s.tasks.find(t => t.id === newParentId);
        if (newParent) {
          const at = position === undefined
            ? newParent.childIds.length
            : Math.max(0, Math.min(position, newParent.childIds.length));
          newParent.childIds.splice(at, 0, id);
        }
      }
      // (2) rauwe s.tasks-array — root-volgorde + WBS. Haal de taak eruit en zet 'm terug zó dat
      // hij — gerekend over alléén zijn siblings (taken met dezelfde parentId, in array-volgorde)
      // — op index `position` (of, zonder positie, achteraan) staat. Nakomelingen blijven staan
      // waar ze staan; flattenOrder herbouwt de boom uit parentId, dus alleen de sibling-volgorde
      // van deze taak telt.
      const fromIdx = s.tasks.findIndex(t => t.id === id);
      const [moved] = s.tasks.splice(fromIdx, 1);
      const sibIdx: number[] = [];
      s.tasks.forEach((t, i) => { if (t.parentId === newParentId) sibIdx.push(i); });
      const at = position === undefined
        ? sibIdx.length
        : Math.max(0, Math.min(position, sibIdx.length)); // klem naar [0, aantal siblings]
      let insertAt: number;
      if (at < sibIdx.length) {
        insertAt = sibIdx[at];                       // vóór de huidige `at`-de sibling
      } else if (sibIdx.length > 0) {
        insertAt = sibIdx[sibIdx.length - 1] + 1;    // achter de laatste sibling
      } else if (newParentId) {
        const p = s.tasks.findIndex(t => t.id === newParentId);
        insertAt = p >= 0 ? p + 1 : s.tasks.length;  // enig kind: vlak achter de ouder
      } else {
        insertAt = s.tasks.length;                   // enige root: achteraan
      }
      s.tasks.splice(insertAt, 0, moved);

      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      finishMutation(s, { stale: true }); // datum-rakende mutatie (A6): planning verouderd tot F5.
    });
    get().recomputeViewRows();
  },

  moveTaskTo: (id, target) => {
    set((s) => {
      const task = s.tasks.find(t => t.id === id);
      if (!task) return;
      const oldParentId = task.parentId; // vóór de mutatie lezen (bepaalt hieronder `stale`).

      // Alle guards (onbekende taak/ouder, cykel, no-op) zitten in de gedeelde planner; `null` ⇒
      // GEEN snapshot, GEEN mutatie. `rejectNoOp: true` — slepen naar de eigen plek mag geen
      // undo-entry of dirty-vlag opleveren.
      const plan = planTaskPlacement(s.tasks, id, target, { rejectNoOp: true });
      if (!plan) return;

      beginUndoable(s); // één undo-stap, géén coalesceKey (één aanroep per geslaagde move).
      applyTaskPlacement(s.tasks, id, plan);

      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      // Pure herordening (zelfde ouder) ⇒ géén stale (identiek aan reorderSibling: raakt geen
      // tijden/CPM). Reparent (andere ouder) ⇒ stale:true — summary-rollups (vroege start/einde)
      // verschuiven, dat herberekent alleen F5/runCPM. De taak zelf (`task.time`) blijft ongemoeid.
      finishMutation(s, { stale: plan.parentId !== oldParentId });
    });
    get().recomputeViewRows();
  },

  moveTasksTo: (ids, target) => {
    set((s) => {
      // ---- 1. Onbekende ids weg, en afstammelingen van een mede-geselecteerde taak weg ----------
      // Een kind verhuist automatisch mee met zijn ouder (de subboom hangt aan `parentId`), dus
      // een apart verplaatst kind zou zichzelf uit de meeverhuisde ouder trekken. `indentTasks`/
      // `outdentTasks` lossen ditzelfde probleem op met een diepste-eerst-sortering; hier is
      // wegfilteren juist, want de groep landt op één doelpositie.
      const geselecteerd = new Set(ids.filter(id => s.tasks.some(t => t.id === id)));
      /** Loopt de ouderketen van `id` omhoog en meldt of daar een mede-geselecteerde taak in zit.
       *  Visited-set tegen corrupte parentId-cycli uit een kapot IFC (zoals in planTaskPlacement). */
      const heeftGeselecteerdeVoorouder = (id: string): boolean => {
        const bezocht = new Set<string>([id]);
        let cur = s.tasks.find(t => t.id === id);
        cur = cur?.parentId ? s.tasks.find(t => t.id === cur!.parentId) : undefined;
        while (cur && !bezocht.has(cur.id)) {
          if (geselecteerd.has(cur.id)) return true;
          bezocht.add(cur.id);
          cur = cur.parentId ? s.tasks.find(t => t.id === cur!.parentId) : undefined;
        }
        return false;
      };
      const teVerplaatsen = [...geselecteerd].filter(id => !heeftGeselecteerdeVoorouder(id));
      if (teVerplaatsen.length === 0) return;

      // ---- 2. Sorteren op WEERGAVEvolgorde ----------------------------------------------------
      // Niet op selectievolgorde: de groep hoort in zijn oorspronkelijke volgorde neer te komen,
      // ook als de gebruiker eerst de onderste en daarna de bovenste rij aanklikte.
      const order = flattenOrder(s.tasks).map(t => t.id);
      const gesorteerd = teVerplaatsen.sort((a, b) => order.indexOf(a) - order.indexOf(b));

      // ---- 3. Cykelguard op GROEPSniveau ------------------------------------------------------
      // `planTaskPlacement` guardt dit per taak, maar dan zou de ene helft van de groep wél en de
      // andere niet verhuizen. Een groep die je op zichzelf (of op een eigen afstammeling) dropt
      // doet daarom HELEMAAL niets: geen snapshot, geen mutatie.
      if (target.parentId !== null) {
        const groep = new Set(gesorteerd);
        const bezocht = new Set<string>();
        let cur = s.tasks.find(t => t.id === target.parentId);
        while (cur && !bezocht.has(cur.id)) {
          if (groep.has(cur.id)) return;
          bezocht.add(cur.id);
          cur = cur.parentId ? s.tasks.find(t => t.id === cur!.parentId) : undefined;
        }
      }

      // ---- 4. Eén voor één plaatsen, elk direct ná zijn voorganger -----------------------------
      let snapshotPushed = false;
      let reparented = false;
      /** De vorige taak van de groep die daadwerkelijk op zijn plek staat; de volgende landt er
       *  direct achter. `null` = nog geen enkele geplaatst ⇒ start op `target.childIndex`. */
      let vorigeId: string | null = null;
      for (const id of gesorteerd) {
        const task = s.tasks.find(t => t.id === id);
        if (!task) continue;

        // De doelindex opnieuw AFLEIDEN uit de werkelijke positie van de voorganger — niet blind
        // ophogen. `planTaskPlacement` klemt en telt tegen de siblinglijst ZÓNDER `id` zelf, dus
        // meten we hier in exact diezelfde lijst. Blind `idx + 1` gaat mis zodra `id` vóór de
        // voorganger stond (de lijst schuift dan een plek op) — dat keert de volgorde om of laat
        // gaten vallen.
        let childIndex = target.childIndex;
        if (vorigeId !== null) {
          // `id` er expliciet uit: `planTaskPlacement` klemt en telt tegen de siblinglijst ZÓNDER
          // de verplaatste taak (zie `siblingIdsAfterRemoval`). Meten we hier in de lijst MÉT `id`,
          // dan is de index één te hoog zodra `id` momenteel vóór de voorganger staat.
          const siblingsZonderId = siblingIdsOf(s.tasks, target.parentId).filter(x => x !== id);
          const vorigeIdx = siblingsZonderId.indexOf(vorigeId);
          // −1 kan alleen bij een kapotte boom: dan achteraan, net als de fallbacks elders.
          childIndex = vorigeIdx >= 0 ? vorigeIdx + 1 : siblingsZonderId.length;
        }

        const oudeOuder = task.parentId;
        // `rejectNoOp: false`: de no-op-guard mag hier geen legitieme herplaatsing tegenhouden —
        // hij zou ook `vorigeId` niet bijwerken en daarmee de rest van de groep verkeerd plaatsen.
        // De no-op-detectie doen we hieronder zelf, puur om te bepalen of er iets te ondoen valt.
        const plan = planTaskPlacement(s.tasks, id, { parentId: target.parentId, childIndex }, { rejectNoOp: false });
        if (!plan) continue; // onbekende doel-ouder of cykel (stap 3 dekt de groep al) ⇒ overslaan.

        // Staat de taak al precies goed? Dan niets muteren (en dus ook geen undo-stap forceren),
        // maar wél als voorganger tellen — hij stáát immers op de doelpositie. `curIdx` (index MÉT
        // zichzelf) en `plan.index` (ZONDER zichzelf) zijn direct vergelijkbaar, zie guard 4.
        const curIdx = siblingIdsOf(s.tasks, oudeOuder).indexOf(id);
        if (plan.parentId !== oudeOuder || plan.index !== curIdx) {
          // Lazy snapshot: pas bij de EERSTE échte verplaatsing, één keer voor de hele groep.
          // Vóór enige draft-mutatie, zoals de conventie in state/transaction.ts voorschrijft.
          if (!snapshotPushed) {
            beginUndoable(s);
            snapshotPushed = true;
          }
          applyTaskPlacement(s.tasks, id, plan);
          if (plan.parentId !== oudeOuder) reparented = true;
        }
        vorigeId = id;
      }

      if (!snapshotPushed) return; // niets verplaatst ⇒ geen undo-stap, geen dirty-vlag.
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      // Zelfde regel als `moveTaskTo`: pure herordening binnen dezelfde ouder raakt geen
      // summary-rollups; wisselde minstens één taak van ouder, dan is de planning verouderd.
      finishMutation(s, { stale: reparented });
      // De selectie blijft bewust ongemoeid: de gebruiker heeft na de sleep nog dezelfde taken vast.
    });
    get().recomputeViewRows();
  },

  indentTasks: (ids) => {
    set((s) => {
      // Kandidaat-ouder = de voorgaande sibling in de weergavevolgorde (flattenOrder).
      // Geen voorgaande sibling => no-op voor die taak. De subboom lift mee via parentId.
      // Binnen een meervoudige selectie springt een aaneengesloten blok als geheel in:
      // geselecteerde voorgaande siblings worden overgeslagen als kandidaat-ouder,
      // anders nest het blok trapsgewijs in elkaar.
      const selected = new Set(ids);
      let changed = false;
      let snapshotPushed = false;
      const order = flattenOrder(s.tasks).map(t => t.id);
      for (const id of order) {
        if (!selected.has(id)) continue;
        const task = s.tasks.find(t => t.id === id);
        if (!task) continue;
        const idx = order.indexOf(id);
        let newParentId: string | null = null;
        for (let i = idx - 1; i >= 0; i--) {
          const cand = s.tasks.find(t => t.id === order[i]);
          if (!cand) continue;
          if (cand.parentId === task.parentId && !selected.has(cand.id)) {
            newParentId = cand.id;
            break;
          }
          // Voorbij het bereik van dezelfde ouder (omhoog de boom uit): stoppen.
          if (cand.id === task.parentId) break;
        }
        if (!newParentId) continue;
        if (!snapshotPushed) {
          beginUndoable(s);
          snapshotPushed = true;
        }
        if (task.parentId) {
          const oldParent = s.tasks.find(t => t.id === task.parentId);
          if (oldParent) oldParent.childIds = oldParent.childIds.filter(c => c !== id);
        }
        task.parentId = newParentId;
        const newParent = s.tasks.find(t => t.id === newParentId);
        if (newParent) newParent.childIds.push(id);
        changed = true;
      }
      if (!changed) return;
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      finishMutation(s, { stale: true }); // datum-rakende mutatie (A6): planning verouderd tot F5.
    });
    get().recomputeViewRows();
  },

  outdentTasks: (ids) => {
    set((s) => {
      // Diepste taken eerst zodat een geselecteerde ouder+kind-combinatie niet dubbelt.
      const order = flattenOrder(s.tasks).map(t => t.id);
      const sorted = [...ids].sort((a, b) => order.indexOf(b) - order.indexOf(a));
      let changed = false;
      let snapshotPushed = false;
      for (const id of sorted) {
        const task = s.tasks.find(t => t.id === id);
        if (!task || !task.parentId) continue;
        const parent = s.tasks.find(t => t.id === task.parentId);
        if (!parent) continue;

        // Doel (issue #26): sibling DIRECT ná de voormalige ouder — precies wat de
        // interface-comment hierboven belooft. Zoek daarvoor de positie van `parent` in DIENS
        // eigen siblinglijst: de childIds van de grootouder, of — als `parent` op rootniveau
        // staat — de root-volgorde uit de rauwe array (zie engine/view/dropTarget.ts).
        // Dat root-geval was het echte gat: daar werd de volgorde vroeger helemaal niet
        // bijgewerkt, waardoor de taak op zijn oude (meestal laatste) array-plek bleef staan.
        const parentSiblingIds = parent.parentId
          ? (s.tasks.find(t => t.id === parent.parentId)?.childIds ?? [])
          : s.tasks.filter(t => !t.parentId).map(t => t.id);
        const parentIdx = parentSiblingIds.indexOf(parent.id);
        // `parent` niet in zijn eigen siblinglijst (corrupte state): achteraan, zoals vroeger.
        const childIndex = parentIdx >= 0 ? parentIdx + 1 : parentSiblingIds.length;

        // Zelfde plaatsingslogica als rij-slepen (`moveTaskTo`), inclusief het synchroon houden
        // van parentId + childIds + rauwe array. `rejectNoOp: false`: uitspringen is per definitie
        // een reparent, dus de no-op-guard kan hier nooit terecht afgaan — uitgezet zodat hij een
        // legitieme herplaatsing niet per ongeluk kan tegenhouden.
        const plan = planTaskPlacement(
          s.tasks, id, { parentId: parent.parentId, childIndex }, { rejectNoOp: false },
        );
        if (!plan) continue; // alleen bij een kapotte boom (bv. verweesde grootouder-id).

        // Lazy snapshot: pas bij de EERSTE échte wijziging, zodat een volledig geweigerde poging
        // géén undo-stap oplevert — en meerdere taken samen precies één undo-stap.
        if (!snapshotPushed) {
          beginUndoable(s);
          snapshotPushed = true;
        }
        applyTaskPlacement(s.tasks, id, plan);
        changed = true;
      }
      if (!changed) return;
      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      finishMutation(s, { stale: true }); // datum-rakende mutatie (A6): planning verouderd tot F5.
    });
    get().recomputeViewRows();
  },

  selectTask: (id, multi = false, range = false) =>
    set((s) => {
      if (range && s.selectedTaskIds.length > 0) {
        // Shift+click: select range from last selected to clicked task
        const lastSelected = s.selectedTaskIds[s.selectedTaskIds.length - 1];
        const flatIds = s.tasks.map(t => t.id);
        const fromIdx = flatIds.indexOf(lastSelected);
        const toIdx = flatIds.indexOf(id);
        if (fromIdx >= 0 && toIdx >= 0) {
          const start = Math.min(fromIdx, toIdx);
          const end = Math.max(fromIdx, toIdx);
          const rangeIds = flatIds.slice(start, end + 1);
          // Merge with existing selection (union)
          const merged = new Set([...s.selectedTaskIds, ...rangeIds]);
          s.selectedTaskIds = Array.from(merged);
        } else {
          s.selectedTaskIds = [id];
        }
      } else if (multi) {
        const idx = s.selectedTaskIds.indexOf(id);
        if (idx >= 0) {
          s.selectedTaskIds.splice(idx, 1);
        } else {
          s.selectedTaskIds.push(id);
        }
      } else {
        s.selectedTaskIds = [id];
      }
    }),

  selectTaskRange: (fromId, toId) =>
    set((s) => {
      const flatIds = s.tasks.map(t => t.id);
      const fromIdx = flatIds.indexOf(fromId);
      const toIdx = flatIds.indexOf(toId);
      if (fromIdx >= 0 && toIdx >= 0) {
        const start = Math.min(fromIdx, toIdx);
        const end = Math.max(fromIdx, toIdx);
        s.selectedTaskIds = flatIds.slice(start, end + 1);
      }
    }),

  deselectAll: () =>
    set((s) => {
      s.selectedTaskIds = [];
    }),

  selectAllTasks: () =>
    set((s) => {
      s.selectedTaskIds = s.viewRows
        .filter((row): row is Extract<typeof row, { kind: 'task' }> => row.kind === 'task')
        .map((row) => row.task.id);
    }),

  selectTasks: (ids, additive) =>
    set((s) => {
      if (!additive) {
        s.selectedTaskIds = [...ids];
        return;
      }
      const merged = new Set([...s.selectedTaskIds, ...ids]);
      s.selectedTaskIds = Array.from(merged);
    }),

  reorderSibling: (taskId, direction) => {
    set((s) => {
      const task = s.tasks.find(t => t.id === taskId);
      if (!task) return;

      if (task.parentId) {
        // Niet-root: sibling-volgorde = childIds-volgorde van de ouder (zie visibleRows.ts).
        const parent = s.tasks.find(t => t.id === task.parentId);
        if (!parent) return;
        const idx = parent.childIds.indexOf(taskId);
        if (idx < 0) return;
        const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (swapIdx < 0 || swapIdx >= parent.childIds.length) return; // rand: no-op
        const otherId = parent.childIds[swapIdx];

        beginUndoable(s);
        const tmp = parent.childIds[idx];
        parent.childIds[idx] = parent.childIds[swapIdx];
        parent.childIds[swapIdx] = tmp;

        // Rauwe s.tasks-array meeschuiven (WBS/flattenOrder-bron, zie utils/wbs.ts) —
        // ENKEL-NODE-splice, exact zoals moveTaskTo hierboven (:414-434): alleen `taskId`
        // zelf verhuist relatief t.o.v. `otherId`, subtrees blijven via parentId gewoon
        // hangen. Zonder deze stap loopt de WBS-nummering (raw-array-volgorde) uit de pas
        // met de weergave (childIds-volgorde, zie visibleRows.ts:242).
        const rawIdx = s.tasks.findIndex(t => t.id === taskId);
        const [node] = s.tasks.splice(rawIdx, 1);
        const otherRawIdx = s.tasks.findIndex(t => t.id === otherId);
        if (direction === 'up') {
          s.tasks.splice(otherRawIdx, 0, node); // vóór otherId
        } else {
          s.tasks.splice(otherRawIdx + 1, 0, node); // ná otherId
        }
      } else {
        // Root-niveau: er is geen aparte root-childIds-array — de sibling-volgorde is de
        // relatieve positie binnen de rauwe `s.tasks`-array (zie flattenOrder in utils/wbs.ts en
        // de `tasks.filter(t => !t.parentId)`-root-scan in visibleRows.ts/printPreview/ifcWriter).
        // Verwissel daarom de twee betrokken taken op hun ABSOLUTE array-slot; alle andere taken
        // (root of niet) behouden hun eigen plek.
        const rootIds = s.tasks.filter(t => !t.parentId).map(t => t.id);
        const idx = rootIds.indexOf(taskId);
        const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (swapIdx < 0 || swapIdx >= rootIds.length) return; // rand: no-op

        const otherId = rootIds[swapIdx];
        const absA = s.tasks.findIndex(t => t.id === taskId);
        const absB = s.tasks.findIndex(t => t.id === otherId);

        beginUndoable(s);
        const tmp = s.tasks[absA];
        s.tasks[absA] = s.tasks[absB];
        s.tasks[absB] = tmp;
      }

      if (s.project.wbsAutoNumber) applyWbsNumbering(s.tasks);
      // Geen scheduleStale: pure volgorde-mutatie, raakt geen tijden/CPM (golf 1-spec, expliciet).
      finishMutation(s);
    });
    get().recomputeViewRows();
  },

  copyTasks: (ids) =>
    set((s) => {
      const sourceIds = ids ?? s.selectedTaskIds;
      if (sourceIds.length === 0) return;

      // Selectie uitbreiden met alle (klein)kinderen, net als bij verwijderen.
      const idSet = new Set<string>();
      const collect = (taskId: string) => {
        if (idSet.has(taskId)) return;
        idSet.add(taskId);
        const t = s.tasks.find(tt => tt.id === taskId);
        if (t) t.childIds.forEach(collect);
      };
      sourceIds.forEach(collect);

      const tasks = s.tasks.filter(t => idSet.has(t.id));
      if (tasks.length === 0) return;

      // Alleen relaties waarvan beide uiteinden mee gekopieerd worden.
      const sequences = s.sequences.filter(
        seq => idSet.has(seq.predecessorId) && idSet.has(seq.successorId),
      );
      const assignments = s.assignments.filter(a => idSet.has(a.taskId));

      // Deep-clone: het klembord blijft geldig na latere edits/undo van de bron.
      s.taskClipboard = JSON.parse(JSON.stringify({ tasks, sequences, assignments }));
    }),

  pasteTasks: () => {
    const newRootIds: string[] = [];
    set((s) => {
      const clip = s.taskClipboard;
      if (!clip || clip.tasks.length === 0) return;

      beginUndoable(s);

      const copiedIds = new Set(clip.tasks.map(t => t.id));
      const resourceExists = new Set(s.resources.map(r => r.id));

      // Geplakte roots komen als sibling van de (eerst) geselecteerde taak;
      // zonder selectie op rootniveau.
      const anchor = s.selectedTaskIds.length > 0
        ? s.tasks.find(t => t.id === s.selectedTaskIds[0])
        : undefined;
      const targetParentId = anchor ? anchor.parentId : null;

      // Verse id voor elke gekopieerde taak.
      const idMap = new Map<string, string>();
      for (const t of clip.tasks) idMap.set(t.id, generateId('task'));

      for (const src of clip.tasks) {
        const newId = idMap.get(src.id)!;
        const parentInClip = !!src.parentId && copiedIds.has(src.parentId);
        if (!parentInClip) newRootIds.push(newId);

        const task: Task = {
          ...JSON.parse(JSON.stringify(src)),
          id: newId,
          parentId: parentInClip ? idMap.get(src.parentId!)! : targetParentId,
          childIds: src.childIds.filter(c => copiedIds.has(c)).map(c => idMap.get(c)!),
          // Verweesde resourceverwijzingen overslaan.
          resourceIds: src.resourceIds.filter(r => resourceExists.has(r)),
        };
        s.tasks.push(task);
      }

      // Nieuwe roots aan de doelouder hangen.
      if (targetParentId) {
        const parent = s.tasks.find(t => t.id === targetParentId);
        if (parent) parent.childIds.push(...newRootIds);
      }

      // Interne relaties opnieuw aanmaken met de nieuwe ids. Spread behoudt óók de
      // optionele lag-velden (lagUnit/lagPercent) — die vielen hier eerder stil weg.
      for (const seq of clip.sequences) {
        s.sequences.push({
          ...seq,
          id: generateId('seq'),
          predecessorId: idMap.get(seq.predecessorId)!,
          successorId: idMap.get(seq.successorId)!,
        });
      }

      // Resource-toewijzingen opnieuw aanmaken (resources die niet meer bestaan overslaan).
      // Spread behoudt óók het optionele curve-veld — net als bij sequences hierboven.
      for (const a of clip.assignments) {
        if (!resourceExists.has(a.resourceId)) continue;
        s.assignments.push({
          ...a,
          id: generateId('asgn'),
          taskId: idMap.get(a.taskId)!,
        });
      }

      // WBS: geplakte takken zouden anders de codes van hun bron letterlijk dupliceren.
      // Auto-nummering ⇒ hele boom; anders alleen de geplakte tak een afgeleide code geven.
      if (s.project.wbsAutoNumber) {
        applyWbsNumbering(s.tasks);
      } else {
        const codes = deriveWbsCodes(s.tasks);
        for (const newId of idMap.values()) {
          const t = s.tasks.find(x => x.id === newId);
          const code = codes.get(newId);
          if (t && code !== undefined) t.wbsCode = code;
        }
      }

      s.selectedTaskIds = newRootIds;
      finishMutation(s, { stale: true }); // geplakte taken (A6): planning verouderd tot F5.
    });
    get().recomputeViewRows();
    return newRootIds;
  },

  renumberWbs: () => {
    set((s) => {
      beginUndoable(s);
      applyWbsNumbering(s.tasks);
      finishMutation(s);
    });
    get().recomputeViewRows();
  },

  insertWbsTemplate: (template, parentId) => {
    if (template.tasks.length === 0) return null;
    let newRootId: string | null = null;
    set((s) => {
      beginUndoable(s);

      const startDate = s.project.startDate || formatDate(new Date());
      const idMap = new Map<string, string>();
      for (const tt of template.tasks) idMap.set(tt.id, generateId('task'));

      for (const tt of template.tasks) {
        const id = idMap.get(tt.id)!;
        const parent = tt.parentId ? idMap.get(tt.parentId)! : parentId;
        if (tt.parentId === null) newRootId = id;
        s.tasks.push({
          id,
          name: tt.name,
          description: tt.description,
          wbsCode: '',
          taskType: tt.taskType,
          status: 'NOT_STARTED',
          isMilestone: tt.isMilestone,
          priority: 500,
          parentId: parent ?? null,
          childIds: template.tasks.filter(c => c.parentId === tt.id).map(c => idMap.get(c.id)!),
          time: createDefaultTaskTime(startDate, tt.isMilestone ? 0 : tt.durationDays),
          resourceIds: [],
        });
      }
      if (parentId && newRootId) {
        const parent = s.tasks.find(t => t.id === parentId);
        if (parent) parent.childIds.push(newRootId);
      }
      for (const q of template.sequences) {
        s.sequences.push({
          ...q,
          id: generateId('seq'),
          predecessorId: idMap.get(q.predecessorId)!,
          successorId: idMap.get(q.successorId)!,
        });
      }

      // WBS-codes: auto ⇒ hele boom; anders alleen de ingevoegde tak afleiden.
      if (s.project.wbsAutoNumber) {
        applyWbsNumbering(s.tasks);
      } else {
        const codes = deriveWbsCodes(s.tasks);
        for (const id of idMap.values()) {
          const task = s.tasks.find(t2 => t2.id === id);
          const code = codes.get(id);
          if (task && code !== undefined) task.wbsCode = code;
        }
      }

      if (newRootId) s.selectedTaskIds = [newRootId];
      finishMutation(s, { stale: true }); // ingevoegd WBS-sjabloon (A6): planning verouderd tot F5.
    });
    get().recomputeViewRows();
    return newRootId;
  },

  setTaskProgress: (taskId, raw, opts) => {
    set((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      beginUndoable(s, opts); // `opts` = coalesceKey (bv. slider-sleep = 1 stap).
      const completion = Math.max(0, Math.min(1, raw));
      task.time.completion = completion;
      // §3.2: completion>0 zonder actualStart ⇒ auto actualStart (MSP-conventie: % ⇒ gestart).
      if (completion > 0 && !task.time.actualStart) {
        task.time.actualStart = task.time.earlyStart || task.time.scheduleStart;
      }
      // Voortgang teruggedraaid onder 100% ⇒ een verouderd actualFinish laten vallen.
      if (completion < 1) task.time.actualFinish = undefined;
      applyProgressInvariants(task, s.project.statusDate);
      // H1 (Opus-review T15-iteratie-2): ALTIJD stale — sinds `applyProgressInvariants`'s
      // completion===1-tak niet meer op een statusdatum leunt (die pint nu altijd op actuals/eigen
      // finish, zie de toelichting daar) én de IN-PROGRESS-tak in CPMSolver (M1) evenmin, is elke
      // voortgangsmutatie datum-beïnvloedend, met of zonder statusdatum. Het oude commentaar
      // ("alleen datum-beïnvloedend mét statusdatum") was juist tot vóór die fixes.
      finishMutation(s, { stale: true });
    });
    get().recomputeViewRows();
  },

  setActualStart: (taskId, date, opts) => {
    let accepted = true;
    set((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      // Actuals liggen nooit ná de statusdatum: weigeren i.p.v. stil klemmen (§3.2, BESLIST).
      // Weigering pusht GÉÉN snapshot (return vóór beginUndoable) — ongewijzigd gedrag.
      if (date && s.project.statusDate && date > s.project.statusDate) { accepted = false; return; }
      beginUndoable(s, opts); // `opts` = coalesceKey: per-toetsaanslag-commits van één datumveld = 1 undo-stap.
      task.time.actualStart = date || undefined;
      applyProgressInvariants(task, s.project.statusDate);
      // H1 (Opus-review T15-iteratie-2) — zie de toelichting bij `setTaskProgress` hierboven.
      finishMutation(s, { stale: true });
    });
    get().recomputeViewRows();
    return accepted;
  },

  setActualFinish: (taskId, date, opts) => {
    let accepted = true;
    set((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return;
      if (date && s.project.statusDate && date > s.project.statusDate) { accepted = false; return; }
      beginUndoable(s, opts); // `opts` = coalesceKey: per-toetsaanslag-commits van één datumveld = 1 undo-stap.
      task.time.actualFinish = date || undefined;
      // Finish wissen terwijl de taak op 100% stond ⇒ terug naar in-uitvoering (anders re-default
      // de invariant meteen een nieuw actualFinish en is wissen onmogelijk).
      if (!date && task.time.completion >= 1) task.time.completion = 0;
      applyProgressInvariants(task, s.project.statusDate);
      // H1 (Opus-review T15-iteratie-2) — zie de toelichting bij `setTaskProgress` hierboven.
      finishMutation(s, { stale: true });
    });
    get().recomputeViewRows();
    return accepted;
  },
});
