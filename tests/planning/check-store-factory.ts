// De store-context: iedere instantie bezit niet alleen state, maar ook haar uitvoeringsmetadata.
//
// AANLEIDING. Een kale tweede Zustandstore leek onafhankelijk, maar de undo-coalescing,
// batchdiepte en bulktransactie waren module- of singletongebonden. Dat is erger dan geen factory:
// de scheiding ziet er betrouwbaar uit terwijl een handeling in B undo van A kan onderdrukken.
//
// `createAppStoreContext()` maakt de grens expliciet. `createAppStore()` blijft de kale
// compatibiliteitsfactory en de gemounte productinterface blijft één singleton gebruiken.
// Deze batterij test documentstate, runtimes, interleaved mutaties en het app-globale klembord.
//
// Draait via run.sh. Exit 0 = alles groen.
import './domStub';
import {
  appStoreContext,
  createAppStore,
  createAppStoreContext,
  useAppStore,
} from '@/state/appStore';
import { capturePayload } from '@/state/documentContract';
import { createBatchTransactions } from '@/state/runtime/createBatchTransactions';

const diffs: string[] = [];
let checks = 0;
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
  }
};

// ── 1. Twee contexten zijn state- én runtimegescheiden ────────────────────────
const contextA = createAppStoreContext();
const contextB = createAppStoreContext();
const A = contextA.store;
const B = contextB.store;

eq('1 de factory levert twee verschillende stores', A === B, false);
eq('1a geen van beide is de singleton', A === useAppStore || B === useAppStore, false);
eq('1b iedere context levert een verschillend runtimeobject', contextA.runtime === contextB.runtime, false);
eq('1c de singleton is ook een contextinstantie', appStoreContext.store === useAppStore, true);
const bareStore = createAppStore();
eq('1d createAppStore blijft een kale Zustandstore leveren',
  ['getState', 'setState', 'subscribe']
    .every(k => typeof (bareStore as unknown as Record<string, unknown>)[k] === 'function'), true);

eq('2 A start zonder taken', A.getState().tasks.length, 0);
eq('2a B ook', B.getState().tasks.length, 0);
eq('2b maar niet met hetzelfde state-object', A.getState() === B.getState(), false);

// ── 2. Projectdata is per instantie ───────────────────────────────────
{
  const a1 = A.getState().addTask({ name: 'alleen in A' });
  eq('3 A heeft de taak', A.getState().tasks.length, 1);
  eq('3a B niet', B.getState().tasks.length, 0);
  eq('3b de singleton is niet geraakt', useAppStore.getState().tasks.some(t => t.id === a1), false);

  const b1 = B.getState().addTask({ name: 'alleen in B' });
  B.getState().addTask({ name: 'en nog een in B' });
  eq('4 B heeft er nu twee', B.getState().tasks.length, 2);
  eq('4a A nog steeds één', A.getState().tasks.length, 1);

  A.getState().updateTask(a1, { name: 'hernoemd in A' });
  eq('5 de naam in A veranderde', A.getState().tasks[0]?.name, 'hernoemd in A');
  eq('5a die in B niet', B.getState().tasks.find(t => t.id === b1)?.name, 'alleen in B');

  A.getState().setProject({ name: 'Project A' });
  B.getState().setProject({ name: 'Project B' });
  eq('6 projectnaam A', A.getState().project.name, 'Project A');
  eq('6a projectnaam B', B.getState().project.name, 'Project B');

  A.getState().addResource({ name: 'Kraan A', type: 'EQUIPMENT', description: '', maxUnits: 1 });
  eq('7 resource in A', A.getState().resources.length, 1);
  eq('7a niet in B', B.getState().resources.length, 0);
}

// ── 3. Undo/redo is per instantie ────────────────────────────────────
{
  const diepteA = A.getState().undoStack.length;
  const diepteB = B.getState().undoStack.length;
  eq('8 beide hebben een eigen undo-stack met eigen diepte', diepteA === diepteB, false);

  const naamVoor = B.getState().tasks[0]?.name;
  B.getState().addTask({ name: 'derde in B' });
  eq('9 B groeide', B.getState().tasks.length, 3);
  eq('9a A niet', A.getState().tasks.length, 1);

  B.getState().undo();
  eq('10 undo op B draaide B terug', B.getState().tasks.length, 2);
  eq('10a en liet A met rust', A.getState().tasks.length, 1);
  eq('10b de eerste taak van B is ongemoeid', B.getState().tasks[0]?.name, naamVoor);

  const redoB = B.getState().redoStack.length;
  A.getState().undo();
  eq('11 undo op A liet de redo-stack van B staan', B.getState().redoStack.length, redoB);
}

// ── 4. Batchruntime is contextgebonden ────────────────────────────────────
{
  const batchA = createAppStoreContext();
  const batchB = createAppStoreContext();
  const txB = createBatchTransactions(batchB);
  const appVoor = capturePayload(useAppStore.getState());
  const aVoor = capturePayload(batchA.store.getState());
  const aUndoVoor = batchA.store.getState().undoStack.length;
  const bUndoVoor = batchB.store.getState().undoStack.length;
  const appUndoVoor = useAppStore.getState().undoStack.length;

  txB.withTransaction(() => {
    eq('12 tijdens de batch is alleen runtime B actief', batchB.runtime.isBatchActive(), true);
    eq('12a runtime A blijft buiten de batch', batchA.runtime.isBatchActive(), false);
    batchB.store.getState().addTask({ name: 'bulk in B' });
    batchB.store.getState().addTask({ name: 'bulk in B 2' });
  });
  eq('12b twee mutators in B leveren één B-snapshot',
    batchB.store.getState().undoStack.length, bUndoVoor + 1);
  eq('12c A krijgt door batch B geen snapshot', batchA.store.getState().undoStack.length, aUndoVoor);
  eq('12d de app-singleton krijgt door batch B geen snapshot',
    useAppStore.getState().undoStack.length, appUndoVoor);
  eq('12e A blijft byte-inhoudelijk gelijk', capturePayload(batchA.store.getState()), aVoor);
  eq('12f de app-singleton blijft byte-inhoudelijk gelijk', capturePayload(useAppStore.getState()), appVoor);
  eq('12g runtime B sluit na de callback', batchB.runtime.isBatchActive(), false);

  const interleavedA = createAppStoreContext();
  const interleavedB = createAppStoreContext();
  const txInterleavedB = createBatchTransactions(interleavedB);
  const interleavedAUndoVoor = interleavedA.store.getState().undoStack.length;
  const interleavedBUndoVoor = interleavedB.store.getState().undoStack.length;
  txInterleavedB.withTransaction(() => {
    interleavedB.store.getState().addTask({ name: 'B binnen eigen batch' });
    interleavedA.store.getState().addTask({ name: 'A tijdens batch B' });
  });
  eq('13 mutatie A tijdens batch B krijgt een eigen undo-stap',
    interleavedA.store.getState().undoStack.length, interleavedAUndoVoor + 1);
  eq('13a batch B houdt precies één eigen undo-stap',
    interleavedB.store.getState().undoStack.length, interleavedBUndoVoor + 1);
}

// ── 5. Klembord blijft app-globaal; paste-undo hoort bij de doelcontext ────────
{
  const pasteA = createAppStoreContext();
  const pasteB = createAppStoreContext();
  const appVoor = capturePayload(useAppStore.getState());
  const aVoor = capturePayload(pasteA.store.getState());
  const sourceId = pasteB.store.getState().addTask({ name: 'kopieerbare tak' });
  pasteB.store.getState().copyTasks([sourceId]);
  const clipboardVoor = pasteB.store.getState().taskClipboard;
  pasteB.store.getState().newDocument();
  eq('14 copyTasks-klembord overleeft een documentwissel in dezelfde appcontext',
    pasteB.store.getState().taskClipboard, clipboardVoor);

  const bUndoVoor = pasteB.store.getState().undoStack.length;
  const pasted = pasteB.store.getState().pasteTasks();
  eq('14a paste op B maakt één nieuwe root', pasted.length, 1);
  eq('14b paste op B pusht alleen op B één snapshot',
    pasteB.store.getState().undoStack.length, bUndoVoor + 1);
  eq('14c paste op B gebruikt de klembordinhoud', pasteB.store.getState().tasks[0]?.name, 'kopieerbare tak');
  eq('14d paste op B laat A byte-inhoudelijk gelijk', capturePayload(pasteA.store.getState()), aVoor);
  eq('14e paste op B laat de app-singleton byte-inhoudelijk gelijk', capturePayload(useAppStore.getState()), appVoor);
}

// ── 6. De singleton blijft de singleton ────────────────────────────────────
{
  eq('15 useAppStore heeft de bekende Zustandvorm',
    ['getState', 'setState', 'subscribe']
      .every(k => typeof (useAppStore as unknown as Record<string, unknown>)[k] === 'function'), true);
  eq('15a de singleton levert een volledige AppState',
    ['project', 'tasks', 'sequences', 'resources', 'assignments', 'ui', 'view', 'undoStack']
      .every(k => k in useAppStore.getState()), true);

  const C = createAppStore();
  const D = createAppStore();
  for (const veld of ['tasks', 'sequences', 'resources', 'assignments', 'undoStack', 'redoStack'] as const) {
    eq(`16 "${veld}" is niet gedeeld tussen twee verse instanties`,
      (C.getState() as unknown as Record<string, unknown>)[veld]
        === (D.getState() as unknown as Record<string, unknown>)[veld],
      false);
  }
}

// ── Uitslag ────────────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK: store-factory — ${checks} checks groen`);
} else {
  console.log(`XX store-factory — ${diffs.length} van ${checks} checks rood:`);
  for (const d of diffs) console.log(`   XX ${d}`);
  process.exit(1);
}
