// T7b (plan-§9/O2-vervolg, orkestratorbesluit 2026-08-15 — optie B): projectstart-bewerkbescherming
// headless tegen de ECHTE Zustand-store, zelfde patroon als `check-move-project.ts`/`check-
// notifications.ts`.
//
// WAAROM DEZE CHECK BESTAAT (en niet meer in `cases-edge.json`): T7 maakte `CPMSolver` MSP-getrouw
// — een ingelezen anker wordt nooit meer door de projectstart-vloer overruled (§9/O2, de brede
// regel). Dat loste de importgetrouwheid op, maar verwijderde ook de bescherming tegen een ANDER,
// legitiem scenario: een gebruiker die de projectstartdatum via Projectinfo naar een latere datum
// verzet, terwijl een wortel-taak nog op haar oude (nu verouderde) `scheduleStart` staat. In de
// solver hebben "verouderd in-app-anker" en "aantoonbaar-eerder MS-Project-anker" EXACT dezelfde
// vorm (wortel-taak, `scheduleStart < project.startDate`, geen constraint) — de solver kan ze niet
// uit elkaar houden (architect-analyse, T7-escalatie). Het intentiesignaal "de gebruiker heeft
// zojuist zelf de projectstart verzet" bestaat wél op één plek: `projectSlice.setProject`. Deze
// check bewaakt die verplaatste bescherming rechtstreeks op het bewerkmoment.
//
// Draait via run.sh. Exit 0 = alles groen.
import { useAppStore } from '@/state/appStore';
import { createDefaultTaskTime } from '@/utils/taskDefaults';
import { createDefaultCalendar } from '@/engine/calendar/defaultCalendar';
import type { Sequence } from '@/types/sequence';

const S = () => useAppStore.getState();
const N = () => S().ui.notifications;
const diffs: string[] = [];
let checks = 0;
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
  }
};
/** Leeg de meldingenlijst zonder aan te nemen hóé dat elders gebeurt (zelfde precedent als
 *  `check-notifications.ts` — er is bewust geen clear-actie op de store zelf). */
const clearAll = () => { for (const n of [...N()]) S().dismissNotification(n.id); };

// ═══════════════════════════════════════════════════════════════════════════
// 1) De klem zelf: een LATERE startDate klemt wortel-ankers zonder voorganger/constraint vooruit
// ═══════════════════════════════════════════════════════════════════════════
S().newProject();
S().setProject({ startDate: '2026-06-01' });
clearAll();

// A/A2: wortel-taken zonder voorganger, zonder constraint, met een expliciet VROEG eigen anker —
// precies het T7-corpusscenario, hier gesimuleerd door de start met de hand vroeg te zetten.
const tA = S().addTask({ name: 'A', time: createDefaultTaskTime('2026-05-01', 5) });
const tA2 = S().addTask({ name: 'A2', time: createDefaultTaskTime('2026-05-15', 3) });
// B/C: C -> B (FS). B heeft dus een voorganger — geen wortel-anker, blijft ONGEMOEID ondanks een
// even vroeg eigen anker (de solver bepaalt B's ES toch al via de relatie, niet via ownAnchor).
const tC = S().addTask({ name: 'C', time: createDefaultTaskTime('2026-05-01', 2) });
const tB = S().addTask({ name: 'B', time: createDefaultTaskTime('2026-05-01', 2) });
S().addSequence({ predecessorId: tC, successorId: tB, type: 'FINISH_START', lagDays: 0 } as Omit<Sequence, 'id'>);
// D: wortel-taak MET een expliciete constraint (SNET vóór de nieuwe startdatum) — constraint wint
// altijd, ongeacht of de eigen start vóór of ná de nieuwe projectstart ligt.
const tD = S().addTask({
  name: 'D', time: createDefaultTaskTime('2026-05-01', 2),
  constraint: { type: 'SNET', date: '2026-05-10' },
});
// E: wortel-taak zonder voorganger/constraint, maar het eigen anker ligt al NÁ de nieuwe
// projectstart — niets te klemmen (`< updates.startDate` is dan false).
const tE = S().addTask({ name: 'E', time: createDefaultTaskTime('2026-09-01', 2) });

const undoLenBeforeClamp = S().undoStack.length;
S().setProject({ startDate: '2026-08-15' }); // LATER dan alle bovenstaande vroege ankers

eq('01 A (wortel, geen voorganger/constraint) klemt naar de nieuwe startdatum',
  S().tasks.find(t => t.id === tA)?.time.scheduleStart, '2026-08-15');
eq('02 A2 klemt eveneens', S().tasks.find(t => t.id === tA2)?.time.scheduleStart, '2026-08-15');
eq('03 B (heeft een voorganger C) blijft ongemoeid', S().tasks.find(t => t.id === tB)?.time.scheduleStart, '2026-05-01');
eq('04 C (zelf ook wortel, geen voorganger/constraint) klemt', S().tasks.find(t => t.id === tC)?.time.scheduleStart, '2026-08-15');
eq('05 D (expliciete SNET-constraint) blijft ongemoeid ondanks een vroeg eigen anker',
  S().tasks.find(t => t.id === tD)?.time.scheduleStart, '2026-05-01');
eq('06 D.constraint zelf blijft ongemoeid', S().tasks.find(t => t.id === tD)?.constraint, { type: 'SNET', date: '2026-05-10' });
eq('07 E (eigen anker al ná de nieuwe startdatum) blijft ongemoeid', S().tasks.find(t => t.id === tE)?.time.scheduleStart, '2026-09-01');
eq('08 project.startDate is de nieuwe datum', S().project.startDate, '2026-08-15');
eq('09 precies ÉÉN undo-stap voor de hele klem-transactie (klem + startDate samen)', S().undoStack.length, undoLenBeforeClamp + 1);

// ── Melding: severity info, juiste sleutel, juiste teller (A + A2 + C = 3 geklemde ankers) ──────
eq('10 precies één melding', N().length, 1);
eq('11 severity info', N()[0]?.severity, 'info');
eq('12 messageKey', N()[0]?.messageKey, 'notifications.projectStartAnchorsClamped');
eq('13 count = precies de geklemde ankers (A, A2, C — niet B/D/E)', N()[0]?.params, { count: 3 });
eq('14 dedupeKey', N()[0]?.dedupeKey, 'project-start-anchors-clamped');

// ═══════════════════════════════════════════════════════════════════════════
// 2) Undo/redo: de klem hoort bij dezelfde transactie als de startDate-wijziging
// ═══════════════════════════════════════════════════════════════════════════
S().undo();
eq('20 undo herstelt project.startDate', S().project.startDate, '2026-06-01');
eq('21 undo herstelt het geklemde taakanker A', S().tasks.find(t => t.id === tA)?.time.scheduleStart, '2026-05-01');
eq('22 undo herstelt het geklemde taakanker A2', S().tasks.find(t => t.id === tA2)?.time.scheduleStart, '2026-05-15');
eq('23 undo herstelt het geklemde taakanker C', S().tasks.find(t => t.id === tC)?.time.scheduleStart, '2026-05-01');
S().redo();
eq('24 redo klemt opnieuw', S().tasks.find(t => t.id === tA)?.time.scheduleStart, '2026-08-15');
eq('25 redo herstelt project.startDate', S().project.startDate, '2026-08-15');

// ═══════════════════════════════════════════════════════════════════════════
// 3) No-op-paden: alleen een ECHTE verzetting naar een LATERE datum klemt
// ═══════════════════════════════════════════════════════════════════════════
S().newProject();
S().setProject({ startDate: '2026-08-15' });
const t3 = S().addTask({ name: 'X', time: createDefaultTaskTime('2026-05-01', 5) });
clearAll();

// 3a — EERDERE datum: geen klem, geen melding.
S().setProject({ startDate: '2026-06-01' });
eq('30 een EERDERE startDate klemt niets', S().tasks.find(t => t.id === t3)?.time.scheduleStart, '2026-05-01');
eq('31 geen melding bij een eerdere startDate', N().length, 0);
eq('32 project.startDate is wél gewoon bijgewerkt', S().project.startDate, '2026-06-01');

// 3b — DEZELFDE datum (het no-op-guard-pad, pakket H): geen undo-stap, geen klem, geen melding.
clearAll();
const undoLenBeforeSame = S().undoStack.length;
S().setProject({ startDate: '2026-06-01' });
eq('33 identieke startDate is een volledige no-op (geen undo-stap)', S().undoStack.length, undoLenBeforeSame);
eq('34 geen melding bij een ongewijzigde startDate', N().length, 0);

// 3c — een LATERE datum zonder klembare wortel-taken (alle taken hebben al een latere eigen start,
// een constraint, of een voorganger): geen melding, want `clampedAnchors` blijft 0.
S().newProject();
S().setProject({ startDate: '2026-06-01' });
const t3c = S().addTask({ name: 'Y', time: createDefaultTaskTime('2026-09-01', 2) }); // al ná de nieuwe datum
clearAll();
S().setProject({ startDate: '2026-08-15' });
eq('35 niets te klemmen => geen melding', N().length, 0);
eq('36 taak Y blijft op zijn eigen (latere) anker', S().tasks.find(t => t.id === t3c)?.time.scheduleStart, '2026-09-01');

// ═══════════════════════════════════════════════════════════════════════════
// 4) Geïmporteerde bestanden raken dit pad NIET (kern van het orkestratorbesluit — importgetrouwheid
// (T7) en bewerkbescherming (T7b) staan volledig los van elkaar): `loadState` (en daarmee elk
// open-pad, dat allemaal via `applyLoadedProject` loopt) hydrateert de payload rechtstreeks via het
// documentcontract en roept `setProject` NERGENS aan — dus de klem/melding vuurt hier niet, ook al
// heeft de geladen `project.startDate` precies dezelfde vorm (later dan een wortel-taak-anker
// zonder constraint) als de trigger hierboven.
// ═══════════════════════════════════════════════════════════════════════════
S().newProject();
S().setProject({ startDate: '2026-05-01' });
const t4 = S().addTask({ name: 'Geïmporteerde taak', time: createDefaultTaskTime('2026-05-01', 5) });
const loadedProject = { ...S().project, startDate: '2026-08-15' }; // MSP-bestand: latere projectstart, oud taakanker intact
const loadedTasks = S().tasks;
clearAll();
S().loadState({
  project: loadedProject,
  calendar: createDefaultCalendar(),
  tasks: loadedTasks,
  sequences: [],
  resources: [],
  assignments: [],
});
eq('40 loadState klemt het geïmporteerde taakanker NIET', S().tasks.find(t => t.id === t4)?.time.scheduleStart, '2026-05-01');
eq('41 loadState vuurt de klem-melding niet af', N().some(n => n.messageKey === 'notifications.projectStartAnchorsClamped'), false);
eq('42 project.startDate komt wél gewoon over uit het geladen bestand', S().project.startDate, '2026-08-15');

// ── Afronding ────────────────────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  project-start-anchor: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  project-start-anchor: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
