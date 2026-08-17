// Commandoregister (K-item 34) — headless tegen de ECHTE Zustand-store.
//
// WAAROM DEZE BATTERIJ. Elf acties stonden twee keer los gedefinieerd: als React-hook in
// `ribbonConfig.tsx` en als imperatieve `run(store)` in `shortcutRegistry.ts`, zonder gedeeld id en
// zonder iets dat ze bij elkaar hield. Ze wáren al uit elkaar gelopen — de zoomstap verschilde
// (apart gerepareerd) en `toggleHistogram` stond letterlijk twee keer uitgeschreven. Nu is er één
// definitie, en die is puur genoeg om hier volledig te toetsen.
//
// Drie delen:
//  1. GEDRAG — elk commando tegen de echte store: doet `run` wat het moet doen, en klopt
//     `isEnabled` in beide richtingen (aan én uit)?
//  2. HET CONTRACT dat het `indent`-geval mogelijk maakt: `run` mag niet stil niets doen wanneer
//     `isEnabled` false is. Het lint grijst de knop uit, maar de sneltoets vuurt wél en moet dan
//     uitleggen waarom er niets gebeurt (issue #26).
//  3. BRON — geen van de twee registers definieert deze acties nog zelf. Zonder die check kan
//     iemand er morgen weer een tweede definitie naast zetten en is de consolidatie stil ongedaan.
//
// Draait via run.sh. Exit 0 = alles groen.
// MOET de eerste import blijven: `@/i18n/config` raakt `document` bij het laden, en imports worden
// gehoist — losse statements hierboven zouden te laat draaien. Zie domStub.ts.
import './domStub';
import { useAppStore } from '@/state/appStore';
import { COMMANDS, isCommandEnabled, type Command } from '@/state/commands';
import { ZOOM_STEP } from '@/utils/ganttViewport';

const S = () => useAppStore.getState();

let checks = 0;
const diffs: string[] = [];
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
  }
};
const run = (cmd: Command) => cmd.run(S());
const enabled = (cmd: Command) => isCommandEnabled(cmd, S());

// ── 0) Elk commando dat een `isEnabled` heeft, moet in BEIDE richtingen waarneembaar zijn. ──
// Deze bewaker staat vooraan omdat hij de checks hieronder pas betekenis geeft: een `isEnabled`
// die in deze fixture altijd hetzelfde teruggeeft, toetst niets.
const enabledSeen = new Map<string, Set<boolean>>();
const observe = (cmd: Command) => {
  if (!cmd.isEnabled) return;
  const set = enabledSeen.get(cmd.id) ?? new Set<boolean>();
  set.add(enabled(cmd));
  enabledSeen.set(cmd.id, set);
};

// ── 1) undo / redo ───────────────────────────────────────────────────────────
S().newProject();
observe(COMMANDS.undo);
eq('01 undo: uitgeschakeld op een verse store (lege undo-stack)', enabled(COMMANDS.undo), false);
eq('02 redo: uitgeschakeld op een verse store', enabled(COMMANDS.redo), false);

observe(COMMANDS.redo);
const idA = S().addTask({ name: 'Fundering' });
observe(COMMANDS.undo);
eq('03 undo: ingeschakeld zodra er iets te herroepen valt', enabled(COMMANDS.undo), true);
run(COMMANDS.undo);
eq('04 undo: de taak is weg', S().tasks.some(t => t.id === idA), false);
observe(COMMANDS.redo);
eq('05 redo: ingeschakeld na een undo', enabled(COMMANDS.redo), true);
run(COMMANDS.redo);
eq('06 redo: de taak is terug', S().tasks.some(t => t.id === idA), true);

// ── 2) delete ────────────────────────────────────────────────────────────────
S().deselectAll();
observe(COMMANDS.delete);
eq('07 delete: uitgeschakeld zonder selectie', enabled(COMMANDS.delete), false);
S().selectTask(idA);
observe(COMMANDS.delete);
eq('08 delete: ingeschakeld met selectie', enabled(COMMANDS.delete), true);
const undoBefore = S().undoStack.length;
const idB = S().addTask({ name: 'Ruwbouw' });
S().selectTasks([idA, idB], false);
run(COMMANDS.delete);
eq('09 delete: beide geselecteerde taken zijn weg', S().tasks.filter(t => t.id === idA || t.id === idB).length, 0);
eq('10 delete: één handeling = één undo-stap (niet N)', S().undoStack.length, undoBefore + 2); // addTask + delete
run(COMMANDS.undo);
eq('11 delete: één undo brengt ze allebei terug', S().tasks.filter(t => t.id === idA || t.id === idB).length, 2);

// ── 3) indent / outdent — het contract dat afwijkt van het rapportvoorstel ───
// In boommodus: gewoon inspringen.
S().setGroup([]);
const idParent = S().addTask({ name: 'Ouder' });
const idChild = S().addTask({ name: 'Kind' });
S().selectTasks([idChild], false);
observe(COMMANDS.indent);
eq('12 indent: ingeschakeld in boommodus met selectie', enabled(COMMANDS.indent), true);
run(COMMANDS.indent);
eq('13 indent: de taak hangt nu onder zijn voorganger', S().tasks.find(t => t.id === idChild)?.parentId, idParent);
observe(COMMANDS.outdent);
run(COMMANDS.outdent);
eq('14 outdent: de taak staat weer op het hoogste niveau', S().tasks.find(t => t.id === idChild)?.parentId, null);

// Zonder selectie: uitgeschakeld.
S().deselectAll();
observe(COMMANDS.indent);
eq('15 indent: uitgeschakeld zonder selectie', enabled(COMMANDS.indent), false);

// BUITEN boommodus is `isEnabled` false, maar `run` mag NIET stil niets doen — dat is precies het
// geval waarvoor `run` en `isEnabled` los van elkaar staan. Het lint grijst de knop uit; de
// sneltoets vuurt en moet uitleggen waarom er niets gebeurt (issue #26).
S().selectTasks([idChild], false);
S().setGroup([{ field: { src: 'builtin', key: 'taskType' }, dir: 'asc' }]);
observe(COMMANDS.indent);
observe(COMMANDS.outdent);
eq('16 indent: uitgeschakeld buiten boommodus (het lint grijst de knop uit)', enabled(COMMANDS.indent), false);
const parentBefore = S().tasks.find(t => t.id === idChild)?.parentId ?? null;
const noticeBefore = S().ui.structureLockedNotice;
run(COMMANDS.indent);
eq('17 indent buiten boommodus: de structuur blijft ongewijzigd',
  S().tasks.find(t => t.id === idChild)?.parentId ?? null, parentBefore);
eq('18 indent buiten boommodus: de melding-teller loopt op (geen stille no-op)',
  S().ui.structureLockedNotice, noticeBefore + 1);
run(COMMANDS.outdent);
eq('19 outdent buiten boommodus: ook een melding, geen stilte',
  S().ui.structureLockedNotice, noticeBefore + 2);
S().setGroup([]);

// ── 4) zoom — de asymmetrie die deze consolidatie blootlegde ────────────────
const zoomBegin = S().view.zoom;
run(COMMANDS.zoomIn);
eq('20 zoomIn: precies één stap omhoog', S().view.zoom, zoomBegin + ZOOM_STEP);
run(COMMANDS.zoomOut);
eq('21 zoomOut: precies terug op het startpunt', S().view.zoom, zoomBegin);

// ── 5) toggleHistogram — was letterlijk twee keer uitgeschreven ─────────────
const histoBegin = S().ui.showHistogram;
localStorage.removeItem('ops-showHistogram');
run(COMMANDS.toggleHistogram);
eq('22 toggleHistogram: schakelt om', S().ui.showHistogram, !histoBegin);
// De PERSISTENTIE hoort bij het commando, niet bij de knop. Stond die alleen in het lint, dan
// onthield Ctrl+Shift+H de stand niet — en dat verschil zag je pas na een herstart.
eq('23 toggleHistogram: de stand wordt weggeschreven',
  localStorage.getItem('ops-showHistogram'), JSON.stringify(!histoBegin));
run(COMMANDS.toggleHistogram);
eq('24 toggleHistogram: en weer terug', S().ui.showHistogram, histoBegin);
eq('25 toggleHistogram: ook de teruggezette stand wordt weggeschreven',
  localStorage.getItem('ops-showHistogram'), JSON.stringify(histoBegin));

// ── 6) De bewaker op deel 0: elke isEnabled is in beide standen gezien. ─────
for (const cmd of Object.values(COMMANDS) as Command[]) {
  if (!cmd.isEnabled) continue;
  checks++;
  const seen = enabledSeen.get(cmd.id);
  if (!seen || seen.size < 2) {
    diffs.push(`26 ${cmd.id}: isEnabled is in deze fixture nooit ${seen?.has(true) ? 'false' : 'true'} geweest — die check is dan vacuüm`);
  }
}

// ── 7) Bron: geen tweede definitie meer in de twee registers. ───────────────
{
  const { readFileSync, existsSync } = await import('node:fs');
  const { fileURLToPath } = await import('node:url');
  const { join, dirname } = await import('node:path');
  let root = dirname(fileURLToPath(import.meta.url));
  while (!existsSync(join(root, 'package.json')) && dirname(root) !== root) root = dirname(root);
  const ribbonPath = join(root, 'src/components/layout/Ribbon/ribbonConfig.tsx');
  const shortcutPath = join(root, 'src/hooks/keyboard/shortcutRegistry.ts');

  checks++;
  if (!existsSync(ribbonPath) || !existsSync(shortcutPath)) {
    diffs.push('25 bron-assert overgeslagen: registers niet gevonden vanaf de bundelplek');
  } else {
    const ribbon = readFileSync(ribbonPath, 'utf8');
    const shortcuts = readFileSync(shortcutPath, 'utf8');

    // Elk gedeeld commando moet in BEIDE registers via COMMANDS lopen.
    for (const id of Object.keys(COMMANDS)) {
      eq(`26.${id} het lint gebruikt COMMANDS.${id}`, ribbon.includes(`COMMANDS.${id}`), true);
      eq(`27.${id} de sneltoetsen gebruiken COMMANDS.${id}`, shortcuts.includes(`COMMANDS.${id}`), true);
    }

    // En de weggehaalde implementaties mogen niet terugkomen. Dit zijn de letterlijke fragmenten
    // die er vóór K-item 34 stonden; ze staan hier zodat een teruggeplaatste kopie omvalt in
    // plaats van stil naast het register te gaan leven.
    const verdwenen: [string, string, string][] = [
      ['lint', 'onClick: () => undo()', ribbon],
      ['lint', 'onClick: () => redo()', ribbon],
      ['lint', 'deleteTasksBulk(', ribbon],
      ['lint', 'indentTasks(', ribbon],
      ['lint', 'outdentTasks(', ribbon],
      ['lint', 'saveShowHistogram(', ribbon],
      ['sneltoets', 'store.indentTasks(', shortcuts],
      ['sneltoets', 'store.outdentTasks(', shortcuts],
      ['sneltoets', 'deleteTasksBulk(store', shortcuts],
      ['sneltoets', 'saveShowHistogram(', shortcuts],
      ['sneltoets', 'store.setZoom(store.view.zoom', shortcuts],
    ];
    for (const [waar, fragment, bron] of verdwenen) {
      eq(`28 ${waar}: geen eigen implementatie meer van "${fragment}"`, bron.includes(fragment), false);
    }
  }
}

// ── Uitslag ──────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  commands: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  commands: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
