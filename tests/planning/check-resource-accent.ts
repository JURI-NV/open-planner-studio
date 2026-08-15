/**
 * Resource-accent op het scherm (#21 punt 1-nieuw) — regressiebatterij.
 *
 * Bewaakt: met `showResourceAccent: true` tekent de renderer onder élke bladbalk met resources een
 * dun streepje (h = 3, direct onder de balk) dat bij meerdere resources gesegmenteerd is naar rato
 * van unitsPerDay; zonder vlag (of `false`) tekent hij niets extra. Mijlpalen en samenvattingstaken
 * krijgen géén accent (geen bladbalk). De balkvulling zelf verandert nooit door de vlag — alleen
 * het streepje komt erbij (supplement, geen vervanging).
 *
 * Zelfde opzet als check-renderer-dateless.ts: de ECHTE GanttRenderer met een opnemende 2D-context-
 * stub; het accent is een fillRect (geen roundRect), dus de stub registreert fillRects.
 */
import { useAppStore } from '@/state/appStore';
import { GanttRenderer } from '@/engine/renderer/GanttRenderer';
import type { Task } from '@/types/task';
import type { ViewRow } from '@/engine/view/visibleRows';
import type { Resource, ResourceAssignment } from '@/types/resource';

// Node-shim (zelfde als check-renderer-dateless): readGanttPalette roept
// getComputedStyle(document.documentElement); zonder stub gooit dat in Node.
const g = globalThis as unknown as Record<string, unknown>;
g.document = { documentElement: {} };
g.getComputedStyle = () => ({ getPropertyValue: () => '' });

const S = () => useAppStore.getState();

let failures = 0;
const fail = (msg: string) => { console.log(`   XX ${msg}`); failures++; };
const ok = (cond: boolean, msg: string) => { if (!cond) fail(msg); };

// ── Opnemende 2D-context-stub (fillRects zijn het accent; roundRects de balken) ──────────────────
interface Rect { x: number; y: number; w: number; h: number; color: string; }
function makeCtx(): { ctx: CanvasRenderingContext2D; fillRects: Rect[] } {
  const fillRects: Rect[] = [];
  const st = { fillStyle: '' };
  const noop = () => {};
  const ctx = {
    strokeStyle: '', lineWidth: 1, font: '', textAlign: '', textBaseline: '',
    globalAlpha: 1, lineCap: '', lineJoin: '', shadowBlur: 0, shadowColor: '',
    set fillStyle(v: string) { st.fillStyle = v; }, get fillStyle() { return st.fillStyle; },
    fillRect: (x: number, y: number, w: number, h: number) => { fillRects.push({ x, y, w, h, color: st.fillStyle }); },
    strokeRect: noop, clearRect: noop, beginPath: noop, closePath: noop,
    moveTo: noop, lineTo: noop, arc: noop, arcTo: noop, ellipse: noop, rect: noop,
    roundRect: noop, fill: noop, stroke: noop, save: noop, restore: noop, clip: noop,
    translate: noop, scale: noop, rotate: noop,
    setLineDash: noop, getLineDash: () => [], fillText: noop, strokeText: noop,
    measureText: (t: string) => ({ width: String(t).length * 6 }),
    createLinearGradient: () => ({ addColorStop: noop }),
    createPattern: () => null,
    quadraticCurveTo: noop, bezierCurveTo: noop, drawImage: noop,
  };
  return { ctx: ctx as unknown as CanvasRenderingContext2D, fillRects };
}

// ── Fixture: echte store-taak (geldige CPM-datums) + resources 1:3 ──────────────────────────────
S().newProject();
S().addTask({ name: 'Balktaak' });
S().runCPM();
const task = S().tasks[0] as Task;

const R1: Resource = { id: 'ra1', name: 'Metselaar', type: 'LABOR', description: '', maxUnits: 1, color: '#111111' };
const R2: Resource = { id: 'ra2', name: 'Loodgieter', type: 'LABOR', description: '', maxUnits: 1, color: '#222222' };
const ASG: ResourceAssignment[] = [
  { id: 'aa1', taskId: task.id, resourceId: 'ra1', unitsPerDay: 1 },
  { id: 'aa2', taskId: task.id, resourceId: 'ra2', unitsPerDay: 3 },
];

const rows: ViewRow[] = [{ kind: 'task', task, depth: 0, dimmed: false }];
const W = 1200, H = 200, TTW = 300, ROWH = 28, HDRH = 60;

function render(showResourceAccent: boolean) {
  const st = S();
  const { ctx, fillRects } = makeCtx();
  const renderer = new GanttRenderer(ctx, {
    rows,
    sequences: [],
    calendar: st.calendar,
    view: { ...st.view, scrollX: 0, scrollY: 0 },
    selectedTaskIds: [],
    collapsedTaskIds: [],
    canvasWidth: W, canvasHeight: H, taskTableWidth: TTW, rowHeight: ROWH, headerHeight: HDRH,
    showResourceAccent,
    resources: [R1, R2],
    assignments: ASG,
  });
  renderer.render();
  return fillRects;
}

// De balk zelf: rowH 28, barH ≈ 0.55×28 ≈ 15; balk-y ≈ hdrH + (rowH−barH)/2 ≈ 60 + 6.5 = 66.5.
// Het accent: y ≈ balkY + barH + 1 ≈ 82.5, h = 3 — uniek herkenbaar aan h === 3 onder de kopstrook.
// Bewust GEEN x-filter op de tabelgrens: een taak die op de projectstart begint, laat haar balk
// precies ÓP taskTableWidth beginnen, en een strikte `> TTW` filtert dat eerste segment onterecht
// weg (gemeten: segment 1 op x = 300 = TTW werd gedropt terwijl segment 2 wel zichtbaar was).
const accents = (rects: Rect[]) => rects.filter(r => r.h === 3 && r.y > HDRH);

{
  const on = render(true);
  const a = accents(on);
  ok(a.length === 2, `accent aan: twee segmenten (1:3-verhouding), got ${a.length}`);
  if (a.length === 2) {
    ok(a[0].color === '#111111' && a[1].color === '#222222', 'accent: segmentkleuren volgen de resources');
    const total = a[0].w + a[1].w;
    ok(Math.abs(a[0].w / total - 0.25) < 0.03, `accent: verhouding ≈ 25/75 (got ${(a[0].w / total * 100).toFixed(1)}%)`);
    ok(Math.abs(a[1].x - (a[0].x + a[0].w)) < 1.5, 'accent: segmenten aaneengesloten');
  }
}
{
  const off = render(false);
  ok(accents(off).length === 0, 'accent uit: geen streepjes');
}

if (failures > 0) { console.log(`resource-accent: ${failures} faalregels`); process.exit(1); }
console.log('resource-accent: alles groen');
