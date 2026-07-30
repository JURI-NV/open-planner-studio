/**
 * Toetsenbordnavigatie in tabelvormige editors — de PURE kern, gedeeld door de twee rasters die de
 * app kent (issue #48).
 *
 * De app heeft bewust twee verschillende raster-*mechanieken*, en die zijn niet samen te voegen:
 *
 * - De **takentabel** (`TableEditor`) is een spreadsheet: er is precies ÉÉN bewerk-input tegelijk,
 *   de cursor is React-state (`activeCell`/`editCell`) en de rest van de cellen zijn `<span>`s.
 * - De **resourcetabel** (`ResourcePanel`) is een formulierraster: ELKE cel is altijd een echt
 *   invoerveld/`<select>`. De cursor is daar dus geen state maar de DOM-focus.
 *
 * Wat ze wél delen is de rekensom "welke cel ligt in richting X" en het beleid "welke toets is een
 * navigatie". Precies dat staat hier — headless, zonder React en zonder DOM, zodat
 * `tests/planning/check-grid-nav.ts` het kan afdwingen. De cursor-mechaniek blijft per tabel:
 * `TableEditor` gebruikt `neighbourGridCell` in zijn state-machine, de resourcetabel via
 * `useLiveGridNav` (`components/panels/hooks/`) om de DOM-focus te verzetten.
 */

export type GridDirection = 'up' | 'down' | 'left' | 'right';

export interface GridCellRef<F extends string = string> {
  rowId: string;
  field: F;
}

/**
 * Buurcel over (rijen × velden). `null` = geen buur: je staat aan de rand, of de rij/het veld komt
 * niet (meer) in de lijst voor. De aanroeper beslist wat "geen buur" betekent — de takentabel én de
 * resourcetabel maken er allebei "Enter/↓ op de laatste rij ⇒ nieuwe rij" van.
 */
export function neighbourGridCell<F extends string>(
  rowIds: readonly string[],
  fields: readonly F[],
  cell: GridCellRef<F>,
  direction: GridDirection,
): GridCellRef<F> | null {
  const rowIndex = rowIds.indexOf(cell.rowId);
  const colIndex = fields.indexOf(cell.field);
  if (rowIndex === -1 || colIndex === -1) return null;

  let newRow = rowIndex;
  let newCol = colIndex;
  if (direction === 'up') newRow = rowIndex - 1;
  else if (direction === 'down') newRow = rowIndex + 1;
  else if (direction === 'left') newCol = colIndex - 1;
  else newCol = colIndex + 1;

  if (newRow < 0 || newRow >= rowIds.length) return null;
  if (newCol < 0 || newCol >= fields.length) return null;
  return { rowId: rowIds[newRow], field: fields[newCol] };
}

/** Is dit de laatste rij van het raster? (Bepaalt of "geen buur naar beneden" een nieuwe rij wordt.) */
export function isLastGridRow(rowIds: readonly string[], rowId: string): boolean {
  return rowIds.length > 0 && rowIds[rowIds.length - 1] === rowId;
}

/**
 * Soort besturingselement onder de cursor. Bewust op een structureel type (geen `Element`), zodat
 * het beleid hieronder zonder DOM te testen is.
 */
export type GridControlKind = 'text' | 'number' | 'select' | 'other';

export function controlKindOf(el: { tagName: string; type?: string } | null | undefined): GridControlKind {
  if (!el) return 'other';
  const tag = el.tagName.toUpperCase();
  if (tag === 'SELECT') return 'select';
  if (tag === 'TEXTAREA') return 'text';
  if (tag !== 'INPUT') return 'other';
  const type = (el.type ?? 'text').toLowerCase();
  if (type === 'number' || type === 'range') return 'number';
  if (type === 'checkbox' || type === 'radio' || type === 'button' || type === 'submit') return 'other';
  return 'text';
}

export interface GridKeyEventLike {
  key: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
}

/**
 * Beleid voor een LIVE raster (elke cel is al een echt invoerveld): welke richting hoort bij deze
 * toets?
 *
 * - **Enter** navigeert altijd omlaag, **Shift+Enter** omhoog — op élk besturingselement. Enter
 *   heeft in een los invoerveld/`<select>` geen eigen betekenis (er is geen formulier om te
 *   versturen), dus die toets is vrij. Dit is ook precies wat de melder van #48 vroeg.
 * - **↑/↓** navigeren ALLEEN in een tekstveld. In een `<select>` kiezen ze de volgende optie en in
 *   een `<input type=number>` stappen ze de waarde — dat native gedrag afpakken zou de kalender-,
 *   type- en ploegkolom en de max.eenheden-spinner onbruikbaar maken. In de takentabel speelt dat
 *   niet, want daar is de cel in bewerking altijd een gewoon tekstveld.
 * - Alt/Ctrl/⌘ erbij ⇒ nooit: dat zijn de globale sneltoetsen (in-/uitspringen, zoom).
 */
export function liveGridNavDirection(e: GridKeyEventLike, control: GridControlKind): 'up' | 'down' | null {
  if (e.altKey || e.ctrlKey || e.metaKey) return null;
  if (e.key === 'Enter') return e.shiftKey ? 'up' : 'down';
  if (e.shiftKey) return null;
  if (control !== 'text') return null;
  if (e.key === 'ArrowDown') return 'down';
  if (e.key === 'ArrowUp') return 'up';
  return null;
}
