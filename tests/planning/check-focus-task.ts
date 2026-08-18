// "Spring naar taak"-geometrie (issue #65, WBS-sprongknop bij afhankelijkheden): de twee pure
// functies die het zoomniveau en de scroll bepalen wanneer je vanuit een afhankelijkheidsregel
// naar de gekoppelde taak springt.
//
// EERLIJK OVER WAT DIT MEET. Checks 01/02/06 herhalen de formule uit de implementatie zelf — die
// zijn per constructie groen, net als bij `check-zoom-steps.ts`. Wat ze wél vangen: een refactor
// die de formule stilletjes verandert zonder deze suite bij te werken. De checks die de
// klemgrenzen op een vast getal pinnen (03, 04, 05, 07) zijn de echte regressiebewaking. De
// BEDRADING (GanttCanvas geeft de juiste argumenten door aan deze pure functies) is geen headless
// test — dat is een browser-pass, zie docs/self-test-harness.md, net als bij
// `check-gantt-render-options.ts`.
//
// Draait via run.sh. Exit 0 = alles groen.
import {
  computeFocusTaskHorizontal, computeFocusTaskScrollY,
  FOCUS_TASK_MIN_ZOOM, FOCUS_TASK_MAX_ZOOM,
} from '@/utils/ganttViewport';

let checks = 0;
const diffs: string[] = [];
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
  }
};
const close = (label: string, got: number, want: number, eps = 0.001) => {
  checks++;
  if (Math.abs(got - want) > eps) {
    diffs.push(`${label}: verwacht ≈${want}, kreeg ${got}`);
  }
};

// ── 1) Horizontaal: een taak van "normale" duur landt tussen de grenzen. ─────
{
  const { zoom, scrollX } = computeFocusTaskHorizontal(10, 100, 1000);
  close('01 zoom = (bruikbareBreedte × 20%) / duur', zoom, (1000 * 0.2) / 10);
  close('02 scrollX centreert het midden van de taak', scrollX, 100 * zoom - 1000 / 2);
}

// ── 2) Horizontaal: ondergrens (lange taak) en bovengrens (milestone). ──────
{
  const long = computeFocusTaskHorizontal(730, 400, 1000);
  eq('03 een taak van jaren klemt op de ondergrens', long.zoom, FOCUS_TASK_MIN_ZOOM);

  const milestone = computeFocusTaskHorizontal(0, 50, 1000);
  eq('04 een milestone (0 dagen) telt als 1 dag en klemt op de bovengrens', milestone.zoom, FOCUS_TASK_MAX_ZOOM);
}

// ── 3) Horizontaal: scrollX gaat nooit negatief. ────────────────────────────
{
  const { scrollX } = computeFocusTaskHorizontal(5, 1, 100);
  eq('05 scrollX klemt op 0', scrollX, 0);
}

// ── 4) Verticaal: rij wordt gecentreerd in de zichtbare hoogte. ─────────────
{
  const scrollY = computeFocusTaskScrollY(10, 28, 40, 600);
  close('06 verticaal centreren', scrollY, 10 * 28 + 28 / 2 - (600 - 40) / 2);
}

// ── 5) Verticaal: rij 0 in een ruime viewport klemt op 0, niet negatief. ────
{
  const scrollY = computeFocusTaskScrollY(0, 28, 40, 600);
  eq('07 rij 0 in een ruime viewport klemt op 0', scrollY, 0);
}

// ── Uitslag ──────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  focus-task: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  focus-task: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
