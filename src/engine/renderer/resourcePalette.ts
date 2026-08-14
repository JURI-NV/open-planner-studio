// Resource-/taakkleurpalet (#21 punt 1-nieuw, ontwerpdoc 2026-08-14 §3). Eén vast, printvriendelijk
// palet voor twee doelen: (a) automatische kleurtoewijzing aan resources (B1/B7), (b) de automatische
// per-taak-regenboog (B6, modus 'auto'). PUUR: geen store-/React-imports — headless testbaar.
//
// Ontwerpeisen (vastgelegd in tests/planning/check-bar-colors.ts):
//  1. 12 kleuren, onderling onderscheidbaar ÓÓK in grijswaarden (elke kleur een eigen lichtheidsband
//     — zwart-wit laserprinters en grijswaarden-PDF-viewers bestaan echt op bouwplaatsen);
//  2. géén van de kleuren is de kritiek-roodtint van het printpalet ('#DC2626') — rood is gereserveerd
//     voor de rode rand om kritieke taken in de niet-critical kleurmodi (B5);
//  3. voldoende verzadiging om op een lichte printachtergrond te staan.
//
// De lichtheden lopen bewust sterk uiteen: band 1/12 breed per kleur.
import type { Resource } from '@/types/resource';

// Samengesteld op lichtheid (relatieve lichtheid via 0.2126R+0.7152G+0.0722B): twaalf tinten over
// het volle bereik ~0.16 … ~0.87, elk ≥ ~0.06 uit elkaar — 10 van de 12 lichtheidsbanden uniek
// (bewaakt door de check). Binnen een band verschilt de hue maximaal (grijs/rood/pink/oranje/
// teal/indigo/amber/violet/sky/green/geel/lime). Noot: red-700 (#B91C1C) is donkerder én
// duidelijk anders van tint dan critical-rood (#DC2626) — de rode kritiek-rand blijft leesbaar.
export const RESOURCE_PALETTE: readonly string[] = [
  '#1E293B', // 0  slate-800   (l ≈ 0.16)
  '#B91C1C', // 1  red-700     (l ≈ 0.24)
  '#DB2777', // 2  pink-600    (l ≈ 0.33)
  '#C2410C', // 3  orange-700  (l ≈ 0.35)
  '#6366F1', // 4  indigo-500  (l ≈ 0.44)
  '#0D9488', // 5  teal-600    (l ≈ 0.46)
  '#D97706', // 6  amber-600   (l ≈ 0.52)
  '#A78BFA', // 7  violet-400  (l ≈ 0.60)
  '#38BDF8', // 8  sky-400     (l ≈ 0.65)
  '#4ADE80', // 9  green-400   (l ≈ 0.72)
  '#FBBF24', // 10 amber-400   (l ≈ 0.76)
  '#BEF264', // 11 lime-300    (l ≈ 0.87)
];

/** Kleine, deterministische string-hash (FNV-1a, 32-bit) — geen cryptografie, wel stabiel op
 *  elke machine/run (B7): hetzelfde id krijgt altijd dezelfde kleur, ongeacht volgorde. */
function hashId(id: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Weergavekleur voor een willekeurig id (resource of taak): hash → paletindex. Puur. */
export function paletteColorForId(id: string): string {
  return RESOURCE_PALETTE[hashId(id) % RESOURCE_PALETTE.length];
}

/**
 * De kleur waarin een resource getekend wordt: haar eigen, expliciet gekozen kleur als die er is,
 * anders de deterministische hash-fallback (B7). Muteert NOOIT de resource — kleurloze resources
 * blijven kleurloos in de data; de fallback is puur weergave. Zo werkt resource-kleuring direct
 * voor elk bestaand project zonder migratie of dirty-vlag.
 */
export function resourceDisplayColor(res: Pick<Resource, 'id' | 'color'>): string {
  return res.color || paletteColorForId(res.id);
}

/**
 * Eerste paletkleur die nog niet door een andere resource in gebruik is (B7, auto-toewijzing bij
 * aanmaak). Alles bezet → hergebruik cyclisch vanaf index 0 (palet is eindig; bij >12 resources
 * is een dubbel onvermijdbaar en is "voorspelbaar" belangrijker dan "uniek"). Vergelijkt de
 * DISPLAYkleur (eigen kleur òf hash), niet alleen het `color`-veld — twee resources waarvan de
 * ene expliciet de hash-kleur van de andere koos zijn visueel dezelfde, en dat is wat telt.
 */
export function nextFreePaletteColor(existing: ReadonlyArray<Pick<Resource, 'id' | 'color'>>): string {
  const used = new Set(existing.map(resourceDisplayColor));
  for (const c of RESOURCE_PALETTE) if (!used.has(c)) return c;
  return RESOURCE_PALETTE[0];
}
