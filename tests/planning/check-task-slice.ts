// H1 (Opus-review T15-fixronde, B1-BLOKKER): store-niveau-bewijs voor `applyProgressInvariants`
// (taskSlice.ts) — vóór de fix viel `completion===1` zonder statusdatum terug op
// `formatDate(new Date())` ("vandaag"). Het commentaar bij `applyProgressInvariants` verwees al
// naar dit bestand/deze case-id vóórdat ze bestonden (B1-bevinding) — dit bestand IS nu dat bewijs.
//
// Ankerdatum ver in het verleden (2015-01-05, een maandag): "vandaag" (de dag waarop deze test
// draait) kan daar nooit toevallig mee samenvallen, dus een terugkerende mutatie-regressie (de
// vandaag-fallback komt terug) kan niet per ongeluk groen uitslaan omdat de testdatum toevallig
// overeenkomt met de systeemdatum.
//
// Twee beweringen, in één scenario:
//   1. 100%-completion ZONDER statusdatum ⇒ `actualFinish` wordt de taak se EIGEN geplande finish
//      (earlyFinish, ná runCPM), NOOIT de kalenderdag van vandaag.
//   2. Dezelfde mutatie zet `scheduleStale` ALTIJD op true, óók zonder statusdatum (H1's tweede
//      helft: de oude `stale: !!s.project.statusDate` was een kunstmatige poort).
//
// Draait via run.sh. Exit 0 = alles groen.

import { useAppStore } from '@/state/appStore';
import { createDefaultTaskTime } from '@/utils/taskDefaults';
import type { Task } from '@/types/task';

const S = () => useAppStore.getState();

let checks = 0;
const diffs: string[] = [];
function ok(label: string, cond: boolean): void {
  checks++;
  if (!cond) diffs.push(label);
}

const task = (id: string): Task | undefined => S().tasks.find(t => t.id === id);

// ── Setup: verse project, taak met een anker VER in het verleden, geen statusdatum. ──
S().newProject();
ok('setup: fris project heeft geen statusdatum', S().project.statusDate === undefined);

const idA = S().addTask({
  name: 'A',
  time: createDefaultTaskTime('2015-01-05', 5),
});
S().runCPM();
ok('setup: runCPM zet scheduleStale terug op false', S().scheduleStale === false);

const plannedFinish = task(idA)?.time.earlyFinish;
ok(`setup: taak heeft een berekende earlyFinish (kreeg: ${plannedFinish})`, !!plannedFinish && plannedFinish.startsWith('2015-01'));

// ── Mutatie: 100% invullen, GEEN statusdatum. ──
S().setTaskProgress(idA, 1);
const afterA = task(idA);

// Bewering 1: actualFinish = de EIGEN geplande finish, niet vandaag.
ok(
  `prog-h1-geen-teleport-naar-vandaag: actualFinish (${afterA?.time.actualFinish}) === eigen geplande finish (${plannedFinish}), NIET vandaag`,
  afterA?.time.actualFinish === plannedFinish,
);
ok(
  `prog-h1-geen-teleport-naar-vandaag: actualFinish valt niet toevallig in het huidige kalenderjaar (${afterA?.time.actualFinish})`,
  !!afterA?.time.actualFinish && !afterA.time.actualFinish.startsWith(new Date().getFullYear().toString()),
);
ok('prog-h1-geen-teleport-naar-vandaag: completion blijft 1', afterA?.time.completion === 1);
ok('prog-h1-geen-teleport-naar-vandaag: status COMPLETED', afterA?.status === 'COMPLETED');

// Bewering 2: scheduleStale wordt ALTIJD gezet, ook zonder statusdatum (H1, tweede helft).
ok(
  `prog-h1-stale-zonder-statusdatum: scheduleStale === true ná setTaskProgress(...,1) zonder statusdatum (kreeg: ${S().scheduleStale})`,
  S().scheduleStale === true,
);

// ── Controle: setActualStart/setActualFinish zetten ÓÓK altijd stale, zonder statusdatum. ──
S().runCPM(); // reset scheduleStale=false vóór de volgende losse mutaties
const idB = S().addTask({ name: 'B', time: createDefaultTaskTime('2015-02-02', 3) });
S().runCPM();
ok('controle-setup: scheduleStale weer false ná de tweede runCPM', S().scheduleStale === false);
S().setActualStart(idB, '2015-02-02');
ok(
  `prog-h1-stale-zonder-statusdatum (setActualStart): scheduleStale === true (kreeg: ${S().scheduleStale})`,
  S().scheduleStale === true,
);

S().runCPM();
S().setActualFinish(idB, '2015-02-04');
ok(
  `prog-h1-stale-zonder-statusdatum (setActualFinish): scheduleStale === true (kreeg: ${S().scheduleStale})`,
  S().scheduleStale === true,
);

if (diffs.length === 0) {
  console.log(`OK  task-slice-check: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  task-slice-check: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
