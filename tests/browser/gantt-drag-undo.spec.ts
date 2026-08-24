// Karakterisering vóór de structurele Gantt-/store-refactors: de echte canvas-sleep en Ctrl+Z
// moeten samen exact één undoable handeling blijven vormen.
import { barPoint, expect, seedProject, state, test } from './fixtures/ops';

test('Gantt bodydrag wijzigt de datum en Ctrl+Z herstelt exact één handeling', async ({ page, ops: _ops }) => {
  const [taskId] = await seedProject(page, [{
    name: 'Sleepbare taak',
    start: '2026-09-07',
    finish: '2026-09-18',
    durationDays: 10,
  }]);
  const before = await state(page);
  const beforeTask = before.tasks.find(task => task.id === taskId)!;
  const point = await barPoint(page, taskId);

  await page.mouse.move(point.x, point.y);
  await page.mouse.down();
  await page.mouse.move(point.x + 72, point.y, { steps: 6 });
  await page.mouse.up();

  await expect.poll(() => state(page).then(snapshot => (
    snapshot.tasks.find(task => task.id === taskId)?.scheduleStart
  ))).not.toBe(beforeTask.scheduleStart);
  const dragged = await state(page);
  expect(dragged.undoDepth).toBe(before.undoDepth + 1);
  expect(dragged.redoDepth).toBe(0);

  await page.keyboard.press('Control+z');

  await expect.poll(() => state(page).then(snapshot => (
    snapshot.tasks.find(task => task.id === taskId)?.scheduleStart
  ))).toBe(beforeTask.scheduleStart);
  const restored = await state(page);
  const restoredTask = restored.tasks.find(task => task.id === taskId)!;
  expect(restoredTask.scheduleFinish).toBe(beforeTask.scheduleFinish);
  expect(restored.undoDepth).toBe(before.undoDepth);
  expect(restored.redoDepth).toBe(before.redoDepth + 1);
});
