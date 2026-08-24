// Karakterisering vóór store-/Ganttgrenswerk: de afzonderlijke DOM-tabel opent een naamcel via
// het toetsenbord, commit met Enter en bewaart één undo-stap.
import { expect, seedProject, state, test } from './fixtures/ops';

test('TableEditor commit en Ctrl+Z lopen via echte toetsenbordinteractie', async ({ page, ops: _ops }) => {
  const [firstId] = await seedProject(page, [
    { name: 'Oorspronkelijke naam', start: '2026-09-07', finish: '2026-09-18', durationDays: 10 },
    { name: 'Volgende rij', start: '2026-09-07', finish: '2026-09-18', durationDays: 10 },
  ]);
  const before = await state(page);

  await page.getByRole('button', { name: /^(Table|Tabel)$/ }).click();
  const table = page.getByTestId('task-table-editor');
  await expect(table).toBeVisible();
  const nameCell = page.locator(
    `[data-testid="task-cell"][data-task-id="${firstId}"][data-field-key="name"]`,
  );

  // Eén gewone klik vestigt de cursor en opent direct; Escape herstelt rasterfocus. De daarop
  // volgende Enter is de letterlijke toetsenbordhandeling die de cel opnieuw opent.
  await nameCell.locator('.cursor-text').click();
  await expect(nameCell.locator('input')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(table).toBeFocused();
  await page.keyboard.press('Enter');

  const input = nameCell.locator('input');
  await expect(input).toBeFocused();
  await input.fill('Naam via toetsenbord');
  await page.keyboard.press('Enter');

  await expect.poll(() => state(page).then(snapshot => (
    snapshot.tasks.find(task => task.id === firstId)?.name
  ))).toBe('Naam via toetsenbord');
  const committed = await state(page);
  expect(committed.undoDepth).toBe(before.undoDepth + 1);

  // Enter navigeert volgens bestaand tabelgedrag naar de volgende rij; Escape geeft het globale
  // Ctrl+Z-pad daarna weer de focus zonder een tweede mutatie te veroorzaken.
  await page.keyboard.press('Escape');
  await expect(table).toBeFocused();
  await page.keyboard.press('Control+z');

  await expect.poll(() => state(page).then(snapshot => (
    snapshot.tasks.find(task => task.id === firstId)?.name
  ))).toBe('Oorspronkelijke naam');
  const restored = await state(page);
  expect(restored.undoDepth).toBe(before.undoDepth);
  expect(restored.redoDepth).toBe(before.redoDepth + 1);
});
