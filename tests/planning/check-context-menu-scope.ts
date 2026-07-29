// Contextmenu-reikwijdte + undo-kosten (issue #45) — headless tegen de ECHTE Zustand-store,
// via exact de functies die `GanttCanvas.tsx` aan het contextmenu hangt (`contextMenuBulk`).
//
// De bug: Indent, Outdent, Mijlpaal aan/uit, Kalender toewijzen, Voortgang en Prioriteit werkten op
// de AANGEKLIKTE taak in plaats van op de selectie; `Verwijderen` had dezelfde beperking. Twee
// eigenschappen die daarbij stil kunnen afdrijven en hier allebei worden vastgezet:
//
//   (a) REIKWIJDTE — zit de aangeklikte taak in de selectie, dan geldt de hele selectie; zit hij er
//       niet in, dan alleen die ene taak (de conventie van issue #26/#42).
//   (b) UNDO-KOSTEN — één menuklik is één handeling en moet met ÉÉN Ctrl+Z terug. Dat is de helft
//       die een naïeve `for`-lus over `updateTask`/`setTaskCalendar`/`setTaskProgress`/`deleteTask`
//       kapotmaakt zonder dat de zichtbare uitkomst verandert: elk van die mutators roept zelf
//       `beginUndoable` aan, dus drie taken zouden drie undo-stappen kosten.
//
// Draait via run.sh. Exit 0 = alles groen.
import { useAppStore } from '@/state/appStore';
import { contextMenuOutlineScope, contextMenuBulk, insertAnchorForScope } from '@/components/canvas/contextMenuScope';
import type { Task } from '@/types/task';

const S = () => useAppStore.getState();
const diffs: string[] = [];
let checks = 0;
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
  }
};

const task = (id: string): Task | undefined => S().tasks.find(t => t.id === id);

/** Verse projectstate met vier root-taken; B/C/D worden de selectie, A blijft de controle. */
function verseVier(): { a: string; b: string; c: string; d: string } {
  S().newProject();
  const [a, b, c, d] = ['A', 'B', 'C', 'D'].map(n => S().addTask({ name: `Taak ${n}` }));
  S().selectTasks([b, c, d], false);
  return { a, b, c, d };
}

// ── 0) De reikwijdteregel zelf ──────────────────────────────────────────────────────────────
{
  const { a, b, c, d } = verseVier();
  eq('01 aangeklikte taak IN de selectie ⇒ hele selectie', contextMenuOutlineScope(c), [b, c, d]);
  eq('02 aangeklikte taak BUITEN de selectie ⇒ alleen die taak', contextMenuOutlineScope(a), [a]);
  S().deselectAll();
  eq('03 lege selectie ⇒ alleen de aangeklikte taak', contextMenuOutlineScope(d), [d]);
}

// ── 1) Mijlpaal aan/uit — anker + één undo-stap ─────────────────────────────────────────────
{
  const { a, b, c, d } = verseVier();
  const undoVoor = S().undoStack.length;
  contextMenuBulk.toggleMilestone(task(c)!);
  eq('04 mijlpaal: alle drie geselecteerde taken zijn mijlpaal',
    [b, c, d].map(id => !!task(id)?.isMilestone), [true, true, true]);
  eq('05 mijlpaal: de niet-geselecteerde taak blijft ongemoeid', !!task(a)?.isMilestone, false);
  eq('06 mijlpaal: precies één undo-stap voor de hele bulk', S().undoStack.length - undoVoor, 1);
  S().undo();
  eq('07 mijlpaal: één Ctrl+Z draait alle drie terug',
    [b, c, d].map(id => !!task(id)?.isMilestone), [false, false, false]);

  // Anker-regel: klikken op een taak die AL mijlpaal is zet de hele selectie terug op gewoon,
  // ook als de rest van de selectie dat nog niet was (gemengde selectie ⇒ voorspelbare uitkomst).
  S().updateTask(c, { isMilestone: true });
  S().selectTasks([b, c, d], false);
  contextMenuBulk.toggleMilestone(task(c)!);
  eq('08 mijlpaal: anker is mijlpaal ⇒ hele selectie wordt gewone taak',
    [b, c, d].map(id => !!task(id)?.isMilestone), [false, false, false]);
}

// ── 2) Kalender toewijzen ───────────────────────────────────────────────────────────────────
{
  const { a, b, c, d } = verseVier();
  const calId = S().addCalendar({ ...S().calendars[0], name: 'Testkalender' });
  S().selectTasks([b, c, d], false);
  const undoVoor = S().undoStack.length;
  contextMenuBulk.setCalendar(c, calId);
  eq('09 kalender: alle drie geselecteerde taken kregen de kalender',
    [b, c, d].map(id => task(id)?.calendarId), [calId, calId, calId]);
  eq('10 kalender: de niet-geselecteerde taak blijft ongemoeid', task(a)?.calendarId, undefined);
  eq('11 kalender: precies één undo-stap voor de hele bulk', S().undoStack.length - undoVoor, 1);
  S().undo();
  eq('12 kalender: één Ctrl+Z draait alle drie terug',
    [b, c, d].map(id => task(id)?.calendarId), [undefined, undefined, undefined]);

  // De no-op-guard van `setTaskCalendar` moet ook in de bulkroute overeind blijven: een selectie
  // die al volledig op deze kalender staat mag geen (lege) undo-stap opleveren.
  S().selectTasks([b, c, d], false);
  contextMenuBulk.setCalendar(c, calId);
  const undoNaEerste = S().undoStack.length;
  contextMenuBulk.setCalendar(c, calId);
  eq('13 kalender: tweede identieke bulk = no-op, geen undo-stap', S().undoStack.length - undoNaEerste, 0);
}

// ── 3) Voortgang ────────────────────────────────────────────────────────────────────────────
{
  const { a, b, c, d } = verseVier();
  const undoVoor = S().undoStack.length;
  contextMenuBulk.setProgress(c, 0.5);
  eq('14 voortgang: alle drie geselecteerde taken op 50%',
    [b, c, d].map(id => task(id)?.time.completion), [0.5, 0.5, 0.5]);
  eq('15 voortgang: de niet-geselecteerde taak blijft op 0', task(a)?.time.completion, 0);
  eq('16 voortgang: precies één undo-stap voor de hele bulk', S().undoStack.length - undoVoor, 1);
  S().undo();
  eq('17 voortgang: één Ctrl+Z draait alle drie terug',
    [b, c, d].map(id => task(id)?.time.completion), [0, 0, 0]);
}

// ── 4) Prioriteit ───────────────────────────────────────────────────────────────────────────
{
  const { a, b, c, d } = verseVier();
  const prioVoorA = task(a)?.priority;
  const undoVoor = S().undoStack.length;
  contextMenuBulk.setPriority(c, 900);
  eq('18 prioriteit: alle drie geselecteerde taken op 900',
    [b, c, d].map(id => task(id)?.priority), [900, 900, 900]);
  eq('19 prioriteit: de niet-geselecteerde taak blijft ongemoeid', task(a)?.priority, prioVoorA);
  eq('20 prioriteit: precies één undo-stap voor de hele bulk', S().undoStack.length - undoVoor, 1);
  S().undo();
  eq('21 prioriteit: één Ctrl+Z draait alle drie terug',
    [b, c, d].map(id => task(id)?.priority), [prioVoorA, prioVoorA, prioVoorA]);
}

// ── 5) Inspringen / uitspringen ─────────────────────────────────────────────────────────────
{
  const { a, b, c, d } = verseVier();
  const undoVoor = S().undoStack.length;
  contextMenuBulk.indent(c);
  eq('22 inspringen: alle drie geselecteerde taken hangen onder taak A',
    [b, c, d].map(id => task(id)?.parentId), [a, a, a]);
  eq('23 inspringen: precies één undo-stap voor de hele bulk', S().undoStack.length - undoVoor, 1);

  S().selectTasks([b, c, d], false);
  const undoVoorUit = S().undoStack.length;
  contextMenuBulk.outdent(c);
  eq('24 uitspringen: alle drie geselecteerde taken staan weer op rootniveau',
    [b, c, d].map(id => task(id)?.parentId), [null, null, null]);
  eq('25 uitspringen: precies één undo-stap voor de hele bulk', S().undoStack.length - undoVoorUit, 1);
  S().undo();
  eq('26 uitspringen: één Ctrl+Z zet alle drie terug onder taak A',
    [b, c, d].map(id => task(id)?.parentId), [a, a, a]);
}

// ── 6) Verwijderen ──────────────────────────────────────────────────────────────────────────
{
  const { a, b, c, d } = verseVier();
  const undoVoor = S().undoStack.length;
  contextMenuBulk.remove(c);
  eq('27 verwijderen: alle drie geselecteerde taken zijn weg',
    [b, c, d].map(id => !!task(id)), [false, false, false]);
  eq('28 verwijderen: de niet-geselecteerde taak staat er nog', !!task(a), true);
  eq('29 verwijderen: precies één undo-stap voor de hele bulk', S().undoStack.length - undoVoor, 1);
  S().undo();
  eq('30 verwijderen: één Ctrl+Z brengt alle drie terug',
    [b, c, d].map(id => !!task(id)), [true, true, true]);
}

// Ouder + kind samen geselecteerd: `deleteTask` neemt de subboom mee, dus de tweede aanroep is een
// stille no-op. De lus mag daar niet op stukgaan, en het blijft één undo-stap.
{
  S().newProject();
  const ouder = S().addTask({ name: 'Ouder' });
  const kind = S().addTask({ name: 'Kind', parentId: ouder });
  const rest = S().addTask({ name: 'Rest' });
  S().selectTasks([ouder, kind], false);
  const undoVoor = S().undoStack.length;
  contextMenuBulk.remove(ouder);
  eq('31 verwijderen: ouder én kind weg', [!!task(ouder), !!task(kind)], [false, false]);
  eq('32 verwijderen: de rest staat er nog', !!task(rest), true);
  eq('33 verwijderen: ouder+kind samen kost één undo-stap', S().undoStack.length - undoVoor, 1);
}

// ── 7) Rechtsklik BUITEN de selectie raakt alleen die ene taak ───────────────────────────────
{
  const { a, b, c, d } = verseVier(); // selectie = B, C, D
  contextMenuBulk.setProgress(a, 0.25);
  eq('34 buiten de selectie: alleen de aangeklikte taak wijzigt', task(a)?.time.completion, 0.25);
  eq('35 buiten de selectie: de selectie blijft ongemoeid',
    [b, c, d].map(id => task(id)?.time.completion), [0, 0, 0]);
}

// ── 8) Invoegen boven / onder bij een MEERVOUDIGE selectie (issue #45, nasleep) ──────────────
//
// De bug: beide routes ankerden op één willekeurige taak. Het contextmenu nam de AANGEKLIKTE taak
// (dus "boven" landde midden in de selectie als je op de middelste taak rechtsklikte); de
// Insert-sneltoets nam `selectedTaskIds[0]`, de EERST AANGEKLIKTE taak — van onder naar boven
// selecteren gaf dus een ander resultaat dan van boven naar beneden. De regel is nu: boven de
// bovenste, onder de onderste, gemeten in de volgorde zoals de gebruiker ze ziet.
{
  const zichtbaar = (): string[] =>
    S().viewRows.flatMap(r => (r.kind === 'task' ? [r.task.name] : []));

  // 8a — aaneengesloten selectie, rechtsklik midden in de selectie.
  {
    const { c } = verseVier(); // A B C D, selectie = B, C, D
    const aantalVoor = S().tasks.length;
    const undoVoor = S().undoStack.length;
    contextMenuBulk.insert(c, 'above', 'Nieuw');
    eq('36 invoegen boven: landt boven de BOVENSTE van de selectie, niet boven de aangeklikte',
      zichtbaar(), ['Taak A', 'Nieuw', 'Taak B', 'Taak C', 'Taak D']);
    eq('37 invoegen: precies één nieuwe taak voor de hele selectie', S().tasks.length - aantalVoor, 1);
    eq('38 invoegen: precies één undo-stap', S().undoStack.length - undoVoor, 1);
    S().undo();
    eq('39 invoegen: één Ctrl+Z draait de invoeging terug',
      zichtbaar(), ['Taak A', 'Taak B', 'Taak C', 'Taak D']);
  }
  {
    const { c } = verseVier();
    contextMenuBulk.insert(c, 'below', 'Nieuw');
    eq('40 invoegen onder: landt onder de ONDERSTE van de selectie',
      zichtbaar(), ['Taak A', 'Taak B', 'Taak C', 'Taak D', 'Nieuw']);
  }

  // 8b — de klikvolgorde van de selectie mag niets uitmaken (dit was de sneltoets-bug).
  {
    const { b, c, d } = verseVier();
    S().selectTasks([d, c, b], false); // van onder naar boven geselecteerd
    eq('41 anker "boven" volgt de SCHERMvolgorde, niet de klikvolgorde',
      insertAnchorForScope(S().selectedTaskIds, 'above'), b);
    eq('42 anker "onder" volgt de SCHERMvolgorde, niet de klikvolgorde',
      insertAnchorForScope(S().selectedTaskIds, 'below'), d);
    contextMenuBulk.insert(c, 'above', 'Nieuw');
    eq('43 invoegen boven na omgekeerde klikvolgorde: nog steeds boven de bovenste',
      zichtbaar(), ['Taak A', 'Nieuw', 'Taak B', 'Taak C', 'Taak D']);
  }

  // 8c — rechtsklik BUITEN de selectie: alleen die ene taak telt (dezelfde bereikregel als de rest).
  {
    const { a } = verseVier(); // selectie = B, C, D
    contextMenuBulk.insert(a, 'below', 'Nieuw');
    eq('44 buiten de selectie: het anker is de aangeklikte taak',
      zichtbaar(), ['Taak A', 'Nieuw', 'Taak B', 'Taak C', 'Taak D']);
  }

  // 8d — niet-aaneengesloten selectie: de nieuwe taak omsluit de hele selectie.
  {
    const { a, c } = verseVier();
    S().selectTasks([a, c], false); // A en C, met B ertussen
    contextMenuBulk.insert(c, 'above', 'Nieuw');
    eq('45 niet-aaneengesloten: "boven" landt boven de bovenste (A), niet in het gat',
      zichtbaar(), ['Nieuw', 'Taak A', 'Taak B', 'Taak C', 'Taak D']);
  }
  {
    const { a, c } = verseVier();
    S().selectTasks([a, c], false);
    contextMenuBulk.insert(a, 'below', 'Nieuw');
    eq('46 niet-aaneengesloten: "onder" landt onder de onderste (C)',
      zichtbaar(), ['Taak A', 'Taak B', 'Taak C', 'Nieuw', 'Taak D']);
  }

  // 8e — selectie over MEERDERE OUDERS: het anker is de uiterste geselecteerde taak, dus de nieuwe
  // taak erft diens ouder en inspringniveau. "Boven" en "onder" landen dan in verschillende takken.
  const verseBoom = () => {
    S().newProject();
    const p1 = S().addTask({ name: 'P1' });
    const a1 = S().addTask({ name: 'A1', parentId: p1 });
    const a2 = S().addTask({ name: 'A2', parentId: p1 });
    const p2 = S().addTask({ name: 'P2' });
    const b1 = S().addTask({ name: 'B1', parentId: p2 });
    const b2 = S().addTask({ name: 'B2', parentId: p2 });
    return { p1, a1, a2, p2, b1, b2 };
  };
  {
    const { p1, a2, b1 } = verseBoom();
    S().selectTasks([b1, a2], false); // bewust omgekeerd geselecteerd
    contextMenuBulk.insert(b1, 'above', 'Nieuw');
    eq('47 meerdere ouders: "boven" landt boven A2, binnen P1',
      zichtbaar(), ['P1', 'A1', 'Nieuw', 'A2', 'P2', 'B1', 'B2']);
    eq('48 meerdere ouders: de nieuwe taak erft de ouder van het anker',
      S().tasks.find(t => t.name === 'Nieuw')?.parentId, p1);
  }
  {
    const { p2, a2, b1 } = verseBoom();
    S().selectTasks([a2, b1], false);
    contextMenuBulk.insert(a2, 'below', 'Nieuw');
    eq('49 meerdere ouders: "onder" landt onder B1, binnen P2',
      zichtbaar(), ['P1', 'A1', 'A2', 'P2', 'B1', 'Nieuw', 'B2']);
    eq('50 meerdere ouders: de nieuwe taak erft de ouder van het anker',
      S().tasks.find(t => t.name === 'Nieuw')?.parentId, p2);
  }

  // 8f — lege reikwijdte: geen anker ⇒ de aanroeper voegt achteraan toe (bestaand gedrag van de
  // Insert-sneltoets zonder selectie).
  {
    verseVier();
    S().deselectAll();
    eq('51 lege selectie ⇒ geen anker', insertAnchorForScope(S().selectedTaskIds, 'above'), undefined);
  }
}

// ── Uitslag ──────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  context-menu-scope-check: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  context-menu-scope-check: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
