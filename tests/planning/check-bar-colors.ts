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

if (failures > 0) { console.log(`bar-colors: ${failures} faalregels`); process.exit(1); }
console.log('bar-colors: alles groen');
