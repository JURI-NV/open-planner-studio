// WP0 / taak T2 — draft-primitieven: snapshot-vrije, recompute-vrije mutatoren voor gebruik BINNEN
// `runInMcpTransaction`. Draait headless tegen de ECHTE Zustand-store (via de harness) — geen mock.
// Bewijst per primitief het store-gelijke gedrag ZONDER eigen snapshot/recompute: elke transactie
// levert exact één undo-stap, en de eind-runCPM verwerkt de mutaties precies één keer.
import { useAppStore, test, assert, assertEq, run } from './harness';
import { runInMcpTransaction, draft } from '@/state/mcpTransaction';
import { createSnapshot } from '@/state/snapshot';

const store = useAppStore;

// Warm-up: breng de projectkalender in de bibliotheek (restore-steady-state). Een verse store heeft
// `calendars: []`; het rollback-/restore-pad promoot de projectkalender-cache tot bibliotheek-entry
// (syncProjectCalendar, §9.1). Door hier één edit te undo'en staat `cal-default` al in de bibliotheek,
// zodat de kalender-tests hieronder tegen een bestaande projectkalender-entry werken.
store.getState().addTask({ name: 'warmup' });
store.getState().undo();

// --- 1) addTask -----------------------------------------------------------------------------------
test('draft.addTask binnen transactie ⇒ undoStack +1, parent.childIds gevuld, correcte parentId', () => {
  const parentId = store.getState().addTask({ name: 'ouder' });
  const before = store.getState().undoStack.length;

  let childId = '';
  const res = runInMcpTransaction(() => {
    childId = draft.addTask({ name: 'kind', parentId });
  });

  assert(res.ok, 'transactie hoort te slagen');
  assertEq(store.getState().undoStack.length, before + 1, 'undoStack moet met exact 1 groeien (één transactie-snapshot)');
  const parent = store.getState().tasks.find((t) => t.id === parentId);
  assert(!!parent && parent.childIds.includes(childId), 'parent.childIds hoort de nieuwe taak te bevatten');
  const child = store.getState().tasks.find((t) => t.id === childId);
  assertEq(child?.parentId, parentId, 'de nieuwe taak hoort de juiste parentId te dragen');
});

test('draft.addTask onbekende parentId ⇒ transactie faalt schoon (geen halve mutatie)', () => {
  const beforeSnap = JSON.stringify(createSnapshot(store.getState()));
  const beforeLen = store.getState().undoStack.length;

  const res = runInMcpTransaction(() => {
    draft.addTask({ name: 'wees', parentId: 'bestaat-niet' });
  });

  assert(!res.ok, 'transactie hoort te falen op de onbekende parentId');
  assert(!res.ok && res.error.toLowerCase().includes('parent'), 'foutmelding hoort de onbekende parent te noemen');
  assertEq(JSON.stringify(createSnapshot(store.getState())), beforeSnap, 'store-inhoud onaangeroerd na de schone rollback');
  assertEq(store.getState().undoStack.length, beforeLen, 'undoStack onaangeroerd na rollback');
  assert(!store.getState().tasks.some((t) => t.name === 'wees'), 'de weestaak mag niet zijn aangemaakt');
});

test('draft.addTask mijlpaal ⇒ duur 0, gewone taak ⇒ default 5', () => {
  let msId = '';
  let normalId = '';
  const res = runInMcpTransaction(() => {
    msId = draft.addTask({ name: 'mijlpaal', isMilestone: true });
    normalId = draft.addTask({ name: 'gewoon' });
  });
  assert(res.ok, 'transactie hoort te slagen');
  assertEq(store.getState().tasks.find((t) => t.id === msId)?.time.scheduleDuration, 0, 'mijlpaal hoort duur 0 te krijgen');
  assertEq(store.getState().tasks.find((t) => t.id === normalId)?.time.scheduleDuration, 5, 'gewone taak hoort default-duur 5 te krijgen');
});

// --- 2) addSequence -------------------------------------------------------------------------------
test('draft.addSequence dedupt op (pred, succ, type)', () => {
  const a = store.getState().addTask({ name: 'seq-a' });
  const b = store.getState().addTask({ name: 'seq-b' });

  let first: string | null = null;
  let second: string | null = 'nog-niet-gezet';
  const res = runInMcpTransaction(() => {
    first = draft.addSequence({ predecessorId: a, successorId: b, type: 'FINISH_START', lagDays: 0 });
    second = draft.addSequence({ predecessorId: a, successorId: b, type: 'FINISH_START', lagDays: 0 });
  });

  assert(res.ok, 'transactie hoort te slagen');
  assert(first !== null, 'eerste relatie hoort te worden aangemaakt (id terug)');
  assertEq(second, null, 'exact duplicaat hoort null terug te geven (dedup)');
  const count = store.getState().sequences.filter(
    (s) => s.predecessorId === a && s.successorId === b && s.type === 'FINISH_START',
  ).length;
  assertEq(count, 1, 'er hoort precies één FS-relatie tussen a en b te bestaan');
});

// --- 3) updateTaskFields --------------------------------------------------------------------------
test('draft.updateTaskFields voert een kale veld-merge uit', () => {
  const id = store.getState().addTask({ name: 'merge-oud' });
  const before = store.getState().undoStack.length;

  const res = runInMcpTransaction(() => {
    draft.updateTaskFields(id, { name: 'merge-nieuw', description: 'beschrijving' });
  });

  assert(res.ok, 'transactie hoort te slagen');
  assertEq(store.getState().undoStack.length, before + 1, 'één transactie-snapshot');
  const t = store.getState().tasks.find((x) => x.id === id);
  assertEq(t?.name, 'merge-nieuw', 'naam hoort gemerged te zijn');
  assertEq(t?.description, 'beschrijving', 'beschrijving hoort gemerged te zijn');
});

// --- 4) deleteTask --------------------------------------------------------------------------------
test('draft.deleteTask ruimt relaties, assignments en parent.childIds op', () => {
  const parentId = store.getState().addTask({ name: 'del-parent' });
  const childId = store.getState().addTask({ name: 'del-child', parentId });
  const otherId = store.getState().addTask({ name: 'del-other' });
  const seqId = store.getState().addSequence({ predecessorId: childId, successorId: otherId, type: 'FINISH_START', lagDays: 0 });
  const resId = store.getState().addResource({ name: 'del-res', type: 'LABOR', description: '', maxUnits: 1 });
  store.getState().assignResource(childId, resId, 1);

  const before = store.getState().undoStack.length;
  const res = runInMcpTransaction(() => {
    draft.deleteTask(childId);
  });

  assert(res.ok, 'transactie hoort te slagen');
  assertEq(store.getState().undoStack.length, before + 1, 'één transactie-snapshot');
  assert(!store.getState().tasks.some((t) => t.id === childId), 'de taak hoort verwijderd te zijn');
  const parent = store.getState().tasks.find((t) => t.id === parentId);
  assert(!!parent && !parent.childIds.includes(childId), 'parent.childIds hoort de verwijzing kwijt te zijn');
  assert(!store.getState().sequences.some((s) => s.id === seqId), 'relaties naar de taak horen opgeruimd te zijn');
  assert(!store.getState().assignments.some((a) => a.taskId === childId), 'assignments op de taak horen opgeruimd te zijn');
});

// --- 5) addCalendar / updateCalendar (projectkalender-cache-sync, §9.1) ----------------------------
test('draft.addCalendar voegt toe, draft.updateCalendar synct de projectkalender-cache', () => {
  // Voorwaarde: de projectkalender staat in de bibliotheek (warm-up hierboven).
  const projCalId = store.getState().project.calendarId;
  assert(store.getState().calendars.some((c) => c.id === projCalId), 'voorwaarde: projectkalender staat in de bibliotheek');

  const beforeCount = store.getState().calendars.length;
  let newCalId = '';
  const res1 = runInMcpTransaction(() => {
    newCalId = draft.addCalendar({ ...store.getState().calendar, name: 'Extra kalender' });
  });
  assert(res1.ok, 'addCalendar-transactie hoort te slagen');
  assertEq(store.getState().calendars.length, beforeCount + 1, 'de bibliotheek hoort met 1 te groeien');
  // s.calendar blijft de cache van de projectkalender (die is niet gewijzigd).
  const projEntryA = store.getState().calendars.find((c) => c.id === projCalId);
  assertEq(JSON.stringify(store.getState().calendar), JSON.stringify(projEntryA), 's.calendar hoort consistent met de projectkalender-entry te blijven');

  // Wijzig de PROJECTkalender via bibliotheek-id ⇒ syncProjectCalendar hoort de cache mee te trekken.
  const res2 = runInMcpTransaction(() => {
    draft.updateCalendar(projCalId, { name: 'Projectkalender gewijzigd' });
  });
  assert(res2.ok, 'updateCalendar-transactie hoort te slagen');
  const projEntryB = store.getState().calendars.find((c) => c.id === projCalId);
  assertEq(projEntryB?.name, 'Projectkalender gewijzigd', 'de bibliotheek-entry hoort de nieuwe naam te dragen');
  assertEq(store.getState().calendar.name, 'Projectkalender gewijzigd', 's.calendar-cache hoort meegetrokken te zijn (§9.1)');
  assertEq(JSON.stringify(store.getState().calendar), JSON.stringify(projEntryB), 's.calendar hoort exact gelijk aan de bibliotheek-entry te zijn');
});

// --- 6) assignment-kwartet ------------------------------------------------------------------------
test('draft assignment-kwartet: assign/update/move/unassign met store-gelijke semantiek', () => {
  const t1 = store.getState().addTask({ name: 'asn-t1' });
  const t2 = store.getState().addTask({ name: 'asn-t2' });
  const resId = store.getState().addResource({ name: 'asn-res', type: 'LABOR', description: '', maxUnits: 1 });

  // assign
  let aid = '';
  const r1 = runInMcpTransaction(() => { aid = draft.assignResource(t1, resId, 1); });
  assert(r1.ok, 'assign-transactie hoort te slagen');
  let asn = store.getState().assignments.find((a) => a.id === aid);
  assertEq(asn?.taskId, t1, 'toewijzing hoort op t1 te staan');
  assert(store.getState().tasks.find((t) => t.id === t1)!.resourceIds.includes(resId), 't1.resourceIds hoort de resource te bevatten');

  // assign op een mijlpaal ⇒ fout (store no-op → hier throw ⇒ transactie faalt schoon)
  const ms = store.getState().addTask({ name: 'asn-ms', isMilestone: true });
  const rBad = runInMcpTransaction(() => { draft.assignResource(ms, resId, 1); });
  assert(!rBad.ok, 'toewijzen aan een mijlpaal hoort de transactie te laten falen');

  // update units
  const r2 = runInMcpTransaction(() => { draft.updateAssignment(aid, { unitsPerDay: 2 }); });
  assert(r2.ok, 'update-transactie hoort te slagen');
  asn = store.getState().assignments.find((a) => a.id === aid);
  assertEq(asn?.unitsPerDay, 2, 'eenheden/dag horen bijgewerkt te zijn');

  // move naar t2
  const r3 = runInMcpTransaction(() => { draft.moveAssignment(aid, t2); });
  assert(r3.ok, 'move-transactie hoort te slagen');
  asn = store.getState().assignments.find((a) => a.id === aid);
  assertEq(asn?.taskId, t2, 'toewijzing hoort verplaatst naar t2');
  assert(store.getState().tasks.find((t) => t.id === t2)!.resourceIds.includes(resId), 't2.resourceIds hoort de resource te bevatten');
  assert(!store.getState().tasks.find((t) => t.id === t1)!.resourceIds.includes(resId), 't1.resourceIds hoort de resource kwijt te zijn');

  // unassign
  const r4 = runInMcpTransaction(() => { draft.unassignResource(aid); });
  assert(r4.ok, 'unassign-transactie hoort te slagen');
  assert(!store.getState().assignments.some((a) => a.id === aid), 'toewijzing hoort verwijderd te zijn');
  assert(!store.getState().tasks.find((t) => t.id === t2)!.resourceIds.includes(resId), 't2.resourceIds hoort de resource kwijt te zijn');
});

// --- 7) applyLeveling / clearLeveling -------------------------------------------------------------
test('draft.applyLeveling zet delays; de eind-runCPM verwerkt ze precies één keer', () => {
  const id = store.getState().addTask({ name: 'lvl-task' });
  // Baseline zonder delay: de earlyStart-anker vastleggen.
  store.getState().runCPM();
  const baseStart = store.getState().tasks.find((t) => t.id === id)!.time.earlyStart;

  const before = store.getState().undoStack.length;
  const res = runInMcpTransaction(() => {
    draft.applyLeveling({
      delays: { [id]: 3 },
      unresolved: {}, unresolvedReasons: {}, shifts: {},
      projectEndBefore: '', projectEndAfter: '',
    });
  });

  assert(res.ok, 'transactie hoort te slagen');
  assertEq(store.getState().undoStack.length, before + 1, 'één transactie-snapshot (geen dubbele undo-stap)');
  const t = store.getState().tasks.find((x) => x.id === id);
  assertEq(t?.levelingDelay, 3, 'levelingDelay hoort gezet te zijn');
  assert(!store.getState().cpmResult?.error, 'cpmResult hoort geldig (geen error) te zijn na de eind-runCPM');
  assert(!store.getState().scheduleStale, 'de eind-runCPM hoort scheduleStale te wissen (schema is vers)');
  assert((t?.time.earlyStart ?? '') > baseStart, 'de delay hoort door de eind-runCPM verwerkt te zijn (earlyStart schuift op)');

  // clearLeveling ⇒ delay weg, earlyStart terug op de baseline.
  const res2 = runInMcpTransaction(() => { draft.clearLeveling(); });
  assert(res2.ok, 'clear-transactie hoort te slagen');
  const t2 = store.getState().tasks.find((x) => x.id === id);
  assertEq(t2?.levelingDelay, undefined, 'levelingDelay hoort gewist te zijn');
  assertEq(t2?.time.earlyStart, baseStart, 'earlyStart hoort terug op de baseline te staan');
});

// --- 8) setProject --------------------------------------------------------------------------------
test('draft.setProject wijzigt projectvelden binnen één transactie', () => {
  const before = store.getState().undoStack.length;
  const res = runInMcpTransaction(() => {
    draft.setProject({ name: 'Hernoemd project', author: 'MCP' });
  });
  assert(res.ok, 'transactie hoort te slagen');
  assertEq(store.getState().undoStack.length, before + 1, 'één transactie-snapshot');
  assertEq(store.getState().project.name, 'Hernoemd project', 'projectnaam hoort bijgewerkt te zijn');
  assertEq(store.getState().project.author, 'MCP', 'auteur hoort bijgewerkt te zijn');
});

await run();
