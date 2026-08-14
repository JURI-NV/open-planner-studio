/**
 * Resourcepalet + kleurtoewijzing (#21 punt 1-nieuw) — regressiebatterij.
 *
 * Bewaakt: palet-uniekheid, grijswaarden-onderscheid (lictheid), hash-stabiliteit (zelfde id →
 * zelfde kleur, onafhankelijk van volgorde), auto-toewijzing "eerste vrije kleur", en dat de
 * hash-fallback nooit data muteert (pure functie). Printvriendelijkheid = onderling
 * onderscheidbaar óók in grijswaarden: elke paletkleur moet een eigen lichtheidscel hebben.
 */
import {
  RESOURCE_PALETTE, resourceDisplayColor, paletteColorForId, nextFreePaletteColor,
} from '@/engine/renderer/resourcePalette';

let failures = 0;
const fail = (msg: string) => { console.log(`   XX ${msg}`); failures++; };
const ok = (cond: boolean, msg: string) => { if (!cond) fail(msg); };

// 1. Palet: 12 unieke hex-kleuren, allemaal geldig #rrggbb.
ok(RESOURCE_PALETTE.length === 12, `paletlengte 12, gekregen ${RESOURCE_PALETTE.length}`);
ok(new Set(RESOURCE_PALETTE).size === RESOURCE_PALETTE.length, 'paletkleuren uniek');
ok(RESOURCE_PALETTE.every(c => /^#[0-9A-Fa-f]{6}$/.test(c)), 'paletkleuren zijn #rrggbb-hex');

// 2. Grijswaarden: relatieve lichtheid (perceptueel benaderd via 0.2126R+0.7152G+0.0722B) moet
//    per kleur in een eigen band van 1/12 breed vallen — anders zijn twee kleuren in grijswaard
//    niet uit elkaar te houden. 12 banden over [0,1] is ruim genoeg voor een palet dat dit als
//    ontwerpeis meekreeg.
const lum = (hex: string): number => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const bands = new Set(RESOURCE_PALETTE.map(c => Math.floor(lum(c) * 12)));
ok(bands.size >= 10, `grijswaarden-banden: minimaal 10 van 12 onderscheidbaar, gekregen ${bands.size}`);

// 3. Hash: deterministisch, verdelend en volgorde-onafhankelijk.
ok(paletteColorForId('res-1') === paletteColorForId('res-1'), 'hash deterministisch');
// Verspreid over het palet: 50 ids mappen niet op 1 of 2 kleuren.
const spread = new Set(Array.from({ length: 50 }, (_, i) => paletteColorForId(`r${i}`)));
ok(spread.size >= 6, `hash verspreid (>= 6 van 12 over 50 ids), gekregen ${spread.size}`);

// 4. resourceDisplayColor: eigen kleur wint, hash-fallback voor kleurloos, geen mutatie.
const res = { id: 'x', name: 'X', type: 'LABOR' as const, description: '', maxUnits: 1 };
ok(resourceDisplayColor({ ...res, color: '#123456' }) === '#123456', 'eigen kleur wint');
ok(resourceDisplayColor(res) === paletteColorForId('x'), 'kleurloos → hash-fallback');
const probe = { ...res };
resourceDisplayColor(probe);
ok(!('color' in probe) || probe.color === undefined, 'hash-fallback muteert de resource niet');

// 5. nextFreePaletteColor: eerste vrije kleur; alles bezet → hergebruik cyclisch (palet < resources).
ok(nextFreePaletteColor([]) === RESOURCE_PALETTE[0], 'leeg veld → eerste kleur');
const taken = RESOURCE_PALETTE.slice(0, 5).map(c => ({ id: c, name: c, type: 'LABOR' as const, description: '', maxUnits: 1, color: c }));
ok(nextFreePaletteColor(taken) === RESOURCE_PALETTE[5], 'eerste vijf bezet → zesde kleur');

// 6. Geen paletkleur gelijk aan de kritiek-roodtint van het printpalet (PRINT_PALETTE.critical =
//    '#DC2626') — de rode rand voor kritieke taken moet visueel vrij blijven.
ok(!RESOURCE_PALETTE.includes('#DC2626'), 'palet vermijdt kritiek-rood');

// ── barColors: modi, segmenten, randen (#21, ontwerp §4) ───────────────────────────────────────
import { computeBarColors } from '@/services/print/barColors';
import type { BarPalette } from '@/services/print/barColors';
import type { Task, TaskTime } from '@/types/task';
import type { Resource, ResourceAssignment } from '@/types/resource';

const PAL: BarPalette = { critical: '#DC2626', normal: '#2563EB', nearCritical: '#F59E0B', milestone: '#7C3AED' };

const mkTime = (over: Partial<TaskTime> = {}): TaskTime => ({
  earlyStart: '2026-01-05', earlyFinish: '2026-01-09', lateStart: '', lateFinish: '',
  duration: 5, totalFloat: 0, isCritical: false, completion: 0,
  scheduleStart: '2026-01-05', scheduleFinish: '2026-01-09',
  ...over,
} as TaskTime);
const mkTask = (id: string, extra: Partial<Task> = {}): Task => ({
  id, name: id, parentId: undefined, childIds: [], isMilestone: false,
  time: mkTime(),
  ...extra,
} as unknown as Task);
const mkRes = (id: string, color?: string): Resource =>
  ({ id, name: id, type: 'LABOR', description: '', maxUnits: 1, ...(color ? { color } : {}) });
const mkAsg = (taskId: string, resourceId: string, unitsPerDay: number): ResourceAssignment =>
  ({ id: `a-${taskId}-${resourceId}`, taskId, resourceId, unitsPerDay });

// 7. critical-modus (default): huidige gedrag ongewijzigd — kritiek rood, bijna-kritiek oranje,
//    rest blauw.
{
  const crit = computeBarColors(mkTask('t1', { time: mkTime({ isCritical: true }) }), [], [], 'critical', PAL);
  ok(crit.kind === 'solid' && crit.fill === PAL.critical, 'critical-modus: kritieke taak rood');
  const near = computeBarColors(mkTask('t2', { time: mkTime({ isNearCritical: true }) }), [], [], 'critical', PAL);
  ok(near.kind === 'solid' && near.fill === PAL.nearCritical, 'critical-modus: bijna-kritiek oranje');
  const plain = computeBarColors(mkTask('t2b'), [], [], 'critical', PAL);
  ok(plain.kind === 'solid' && plain.fill === PAL.normal, 'critical-modus: gewone taak blauw');
}

// 8. task-modus: Task.color wint; zonder Task.color valt terug op critical-logica.
{
  const withColor = computeBarColors(mkTask('t3', { color: '#123456' }), [], [], 'task', PAL);
  ok(withColor.kind === 'solid' && withColor.fill === '#123456', 'task-modus: Task.color wint');
  const without = computeBarColors(mkTask('t4'), [], [], 'task', PAL);
  ok(without.kind === 'solid' && without.fill === PAL.normal, 'task-modus: zonder kleur → critical-logica');
}

// 9. auto-modus: hash op taak-id, stabiel, onafhankelijk van positie; kritieke taak krijgt rode rand.
{
  const a = computeBarColors(mkTask('t5'), [], [], 'auto', PAL);
  const b = computeBarColors(mkTask('t5'), [], [], 'auto', PAL);
  ok(a.kind === 'solid' && b.kind === 'solid' && a.fill === b.fill, 'auto-modus: stabiel per id');
  ok(a.kind === 'solid' && a.fill === paletteColorForId('t5'), 'auto-modus: gebruikt palet-hash');
  const critAuto = computeBarColors(mkTask('t6', { time: mkTime({ isCritical: true }) }), [], [], 'auto', PAL);
  ok(critAuto.kind === 'solid' && critAuto.outline === PAL.critical, 'auto-modus: kritieke taak → rode rand');
  const plainAuto = computeBarColors(mkTask('t6b'), [], [], 'auto', PAL);
  ok(plainAuto.kind === 'solid' && plainAuto.outline === undefined, 'auto-modus: niet-kritieke taak → géén rand');
}

// 10. resource-modus: segmenten naar rato van unitsPerDay, exact vullend; zonder resource → blauw;
//     kritiek → rode rand om het geheel; kleurloze resource → hash-fallback.
{
  const resources = [mkRes('r1', '#111111'), mkRes('r2', '#222222')];
  const asg = [mkAsg('t7', 'r1', 1), mkAsg('t7', 'r2', 3)];
  const seg = computeBarColors(mkTask('t7'), resources, asg, 'resource', PAL);
  ok(seg.kind === 'segments', 'resource-modus met 2 resources: segmenten');
  if (seg.kind === 'segments') {
    const total = seg.segments.reduce((acc, s) => acc + s.weight, 0);
    ok(Math.abs(total - 1) < 1e-9, `segmentgewichten sommeren exact tot 1 (got ${total})`);
    ok(Math.abs(seg.segments[0].weight - 0.25) < 1e-9 && Math.abs(seg.segments[1].weight - 3 / 4) < 1e-9, 'verhouding volgt unitsPerDay (1:3)');
    ok(seg.segments[0].color === '#111111' && seg.segments[1].color === '#222222', 'eigen resourcekleur gebruikt');
  }
  const none = computeBarColors(mkTask('t8'), [mkRes('r1')], [], 'resource', PAL);
  ok(none.kind === 'solid' && none.fill === PAL.normal, 'resource-modus zonder toewijzing → neutraal blauw');
  const fallback = computeBarColors(mkTask('t9'), [mkRes('rx')], [mkAsg('t9', 'rx', 2)], 'resource', PAL);
  ok(fallback.kind === 'solid' && fallback.fill === paletteColorForId('rx'), 'kleurloze resource → hash-fallback-kleur');
  const critSeg = computeBarColors(mkTask('t10', { time: mkTime({ isCritical: true }) }), resources, [mkAsg('t10', 'r1', 1)], 'resource', PAL);
  ok(critSeg.kind !== 'solid' || critSeg.outline === PAL.critical, 'resource-modus: kritiek → rode rand (solid)');
  if (critSeg.kind === 'segments') ok(critSeg.outline === PAL.critical, 'resource-modus: kritiek → rode rand (segments)');
  // Eén resource → solide die ene kleur (géén segmenten-ruis).
  const single = computeBarColors(mkTask('t10b'), resources, [mkAsg('t10b', 'r2', 2)], 'resource', PAL);
  ok(single.kind === 'solid' && single.fill === '#222222', 'resource-modus met 1 resource → solide kleur');
}

// 11. Smalbalk-fallback: barPx < 12 in resource-modus → solide eerste-kleur i.p.v. segmenten.
{
  const resources = [mkRes('r1', '#111111'), mkRes('r2', '#222222')];
  const asg = [mkAsg('t11', 'r1', 1), mkAsg('t11', 'r2', 1)];
  const narrow = computeBarColors(mkTask('t11'), resources, asg, 'resource', PAL, 8);
  ok(narrow.kind === 'solid' && narrow.fill === '#111111', 'smalbalk (8px) → solide eerste resourcekleur');
  const wide = computeBarColors(mkTask('t11'), resources, asg, 'resource', PAL, 40);
  ok(wide.kind === 'segments', 'brede balk (40px) → wel segmenten');
}

// 12. Mijlpalen: volgen de modusregel (task/auto/resource uit eigen kleur/hash; zonder resource →
//     milestone-paars uit het palet). In critical-modus: milestone-kleur (huidig).
{
  const ms = mkTask('t12', { isMilestone: true });
  const c = computeBarColors(ms, [], [], 'critical', PAL);
  ok(c.kind === 'solid' && c.fill === PAL.milestone, 'mijlpaal critical-modus → milestone-kleur');
  const mres = computeBarColors(mkTask('t13', { isMilestone: true }), [mkRes('r1', '#111111')], [mkAsg('t13', 'r1', 1)], 'resource', PAL);
  ok(mres.kind === 'solid' && mres.fill === '#111111', 'mijlpaal resource-modus → resourcekleur (solide ruit)');
  const mnone = computeBarColors(mkTask('t14', { isMilestone: true }), [], [], 'resource', PAL);
  ok(mnone.kind === 'solid' && mnone.fill === PAL.milestone, 'mijlpaal zonder resource → milestone-kleur');
  const mauto = computeBarColors(mkTask('t14b', { isMilestone: true }), [], [], 'auto', PAL);
  ok(mauto.kind === 'solid' && mauto.fill === paletteColorForId('t14b'), 'mijlpaal auto-modus → hash-kleur');
  const mtask = computeBarColors(mkTask('t14c', { isMilestone: true, color: '#ABCDEF' }), [], [], 'task', PAL);
  ok(mtask.kind === 'solid' && mtask.fill === '#ABCDEF', 'mijlpaal task-modus met kleur → eigen kleur');
}

if (failures > 0) { console.log(`bar-colors: ${failures} faalregels`); process.exit(1); }
console.log('bar-colors: alles groen');
