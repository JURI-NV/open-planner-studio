// Rasternavigatie-contract (issue #48) — de gedeelde kern onder de takentabel én de resourcetabel.
//
// De aanleiding: de resourcetabel had geen enkele toetsenbordnavigatie, terwijl de takentabel die
// al had. Bij het delen van die logica zijn er twee eigenschappen die STIL kunnen afdrijven en die
// geen enkele andere batterij raakt:
//
//  (a) RANDGEDRAG. `neighbourGridCell` moet `null` teruggeven aan de rand — niet klemmen op
//      zichzelf. Beide tabellen bouwen daar hun "Enter/↓ op de laatste rij ⇒ nieuwe rij" op; een
//      buur die naar zichzelf klemt maakt die functie onbereikbaar (de takentabel deed dit
//      voorheen met Math.max/min + een gelijkheidscheck; dat is hier één keer vastgelegd).
//
//  (b) TOETSBELEID in een LIVE raster (elke cel is al een echt invoerveld — de resourcetabel).
//      ↑/↓ mogen daar ALLEEN in een tekstveld navigeren. Pakken we ze ook af in een `<select>`
//      (type/kalender/ploeg) of in een `<input type=number>` (max. eenheden), dan is de
//      optiekeuze resp. de spinner onbruikbaar — een regressie die je niet ziet in een
//      "werkt de navigatie?"-test, want de navigatie werkt dan juist te goed.
//
// Draait via run.sh. Exit 0 = alles groen.
import {
  neighbourGridCell, isLastGridRow, controlKindOf, liveGridNavDirection,
  type GridControlKind, type GridDirection,
} from '@/utils/gridNavigation';

const diffs: string[] = [];
let checks = 0;
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
  }
};

// ── 1. Buurcel-rekensom ────────────────────────────────────────────────────────────────────
const rows = ['r1', 'r2', 'r3'];
const cols = ['name', 'type', 'maxUnits'] as const;
const nb = (rowId: string, field: string, d: GridDirection) =>
  neighbourGridCell(rows, cols, { rowId, field: field as typeof cols[number] }, d);

eq('midden ↓', nb('r2', 'type', 'down'), { rowId: 'r3', field: 'type' });
eq('midden ↑', nb('r2', 'type', 'up'), { rowId: 'r1', field: 'type' });
eq('midden →', nb('r2', 'type', 'right'), { rowId: 'r2', field: 'maxUnits' });
eq('midden ←', nb('r2', 'type', 'left'), { rowId: 'r2', field: 'name' });

// (a) — randen geven null, ze klemmen NIET op zichzelf.
eq('bovenrand ↑', nb('r1', 'name', 'up'), null);
eq('onderrand ↓', nb('r3', 'name', 'down'), null);
eq('linkerrand ←', nb('r2', 'name', 'left'), null);
eq('rechterrand →', nb('r2', 'maxUnits', 'right'), null);

// Onbekende rij/kolom (rij weggefilterd, kolom verborgen) ⇒ null, nooit een gok.
eq('onbekende rij', nb('weg', 'name', 'down'), null);
eq('onbekend veld', nb('r2', 'weg', 'down'), null);

// Randgeval: één rij / één kolom.
eq('enkele rij ↓', neighbourGridCell(['solo'], cols, { rowId: 'solo', field: 'name' }, 'down'), null);
eq('enkele rij ↑', neighbourGridCell(['solo'], cols, { rowId: 'solo', field: 'name' }, 'up'), null);
eq('lege kolomlijst', neighbourGridCell(rows, [], { rowId: 'r1', field: 'name' }, 'down'), null);
eq('lege rijenlijst', neighbourGridCell([], cols, { rowId: 'r1', field: 'name' }, 'down'), null);

// Diagonaal bestaat niet: alleen één as verandert per stap.
eq('↓ houdt de kolom', nb('r1', 'maxUnits', 'down'), { rowId: 'r2', field: 'maxUnits' });
eq('→ houdt de rij', nb('r3', 'name', 'right'), { rowId: 'r3', field: 'type' });

// ── 2. Laatste rij ─────────────────────────────────────────────────────────────────────────
eq('laatste rij', isLastGridRow(rows, 'r3'), true);
eq('niet de laatste rij', isLastGridRow(rows, 'r2'), false);
eq('lege lijst heeft geen laatste rij', isLastGridRow([], 'r1'), false);
// De concept-rij van de resourcetabel hangt ACHTER de echte rijen; zolang hij openstaat is de
// laatste ECHTE rij dus niet meer "de laatste" en opent Enter daar geen tweede concept-rij.
eq('concept-rij is de laatste', isLastGridRow([...rows, '__draft'], '__draft'), true);
eq('met concept-rij is r3 niet meer de laatste', isLastGridRow([...rows, '__draft'], 'r3'), false);

// ── 3. Soort besturingselement ─────────────────────────────────────────────────────────────
eq('select', controlKindOf({ tagName: 'SELECT' }), 'select');
eq('textarea', controlKindOf({ tagName: 'TEXTAREA' }), 'text');
eq('input zonder type', controlKindOf({ tagName: 'INPUT' }), 'text');
eq('input text', controlKindOf({ tagName: 'INPUT', type: 'text' }), 'text');
eq('input number', controlKindOf({ tagName: 'INPUT', type: 'number' }), 'number');
eq('input checkbox', controlKindOf({ tagName: 'INPUT', type: 'checkbox' }), 'other');
eq('button', controlKindOf({ tagName: 'BUTTON' }), 'other');
eq('niets', controlKindOf(null), 'other');
eq('kleine letters tellen ook', controlKindOf({ tagName: 'input', type: 'NUMBER' }), 'number');

// ── 4. Toetsbeleid in een live raster ──────────────────────────────────────────────────────
const dir = (key: string, control: GridControlKind, mod: Record<string, boolean> = {}) =>
  liveGridNavDirection({ key, ...mod }, control);

// Enter navigeert op ELK besturingselement (er is geen formulier, dus de toets is vrij).
for (const control of ['text', 'number', 'select', 'other'] as GridControlKind[]) {
  eq(`Enter op ${control}`, dir('Enter', control), 'down');
  eq(`Shift+Enter op ${control}`, dir('Enter', control, { shiftKey: true }), 'up');
}

// (b) — ↑/↓ ALLEEN in een tekstveld.
eq('↓ in tekst', dir('ArrowDown', 'text'), 'down');
eq('↑ in tekst', dir('ArrowUp', 'text'), 'up');
eq('↓ in select blijft de optiekeuze', dir('ArrowDown', 'select'), null);
eq('↑ in select blijft de optiekeuze', dir('ArrowUp', 'select'), null);
eq('↓ in number blijft de spinner', dir('ArrowDown', 'number'), null);
eq('↑ in number blijft de spinner', dir('ArrowUp', 'number'), null);
eq('↓ op overig', dir('ArrowDown', 'other'), null);

// Modifiers zijn van de globale sneltoetsen (in-/uitspringen, zoom) — nooit van het raster.
for (const mod of ['altKey', 'ctrlKey', 'metaKey']) {
  eq(`${mod}+Enter`, dir('Enter', 'text', { [mod]: true }), null);
  eq(`${mod}+↓`, dir('ArrowDown', 'text', { [mod]: true }), null);
}
// Shift hoort bij Enter (omhoog) maar niet bij de pijltjes: Shift+↑/↓ is tekstselectie.
eq('Shift+↓ in tekst', dir('ArrowDown', 'text', { shiftKey: true }), null);
eq('Shift+↑ in tekst', dir('ArrowUp', 'text', { shiftKey: true }), null);

// Overige toetsen laten we met rust — anders is typen in de cel stuk.
for (const key of ['a', ' ', 'Tab', 'Escape', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Backspace']) {
  eq(`${key} is geen navigatie`, dir(key, 'text'), null);
}

// ── 5. Gecombineerd: een verticale loop door een resource-achtig raster ─────────────────────
// Naboots van wat de browser meet: ↓↓↑ + Enter + Shift+Enter in de naamkolom van 3 rijen.
{
  let cur: { rowId: string; field: string } | null = { rowId: 'r1', field: 'name' };
  const pad: string[] = [];
  const stap = (d: GridDirection, control: GridControlKind, key: string) => {
    const richting = liveGridNavDirection({ key, shiftKey: d === 'up' && key === 'Enter' }, control);
    if (!richting) { pad.push('(geen)'); return; }
    const next = cur && neighbourGridCell(rows, cols, cur as { rowId: string; field: typeof cols[number] }, richting);
    if (next) cur = next;
    pad.push(cur!.rowId);
  };
  stap('down', 'text', 'ArrowDown');
  stap('down', 'text', 'ArrowDown');
  stap('up', 'text', 'ArrowUp');
  stap('down', 'text', 'Enter');
  stap('up', 'text', 'Enter');
  eq('loop door de naamkolom', pad, ['r2', 'r3', 'r2', 'r3', 'r2']);
}

// ── Verslag ────────────────────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  rasternavigatie: ${checks}/${checks} groen`);
  process.exit(0);
}
for (const d of diffs) console.log(`XX  ${d}`);
console.log(`XX  rasternavigatie: ${diffs.length}/${checks} FOUT`);
process.exit(1);
