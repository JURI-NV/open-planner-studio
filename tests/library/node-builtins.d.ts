// Minimale ambient module-declaraties voor de node:-builtins die `check-i18n-plurals.ts` gebruikt.
// Deze checksuite draait bewust met `"types": []` (zie tsconfig.check.json) — geen @types/node, om
// botsingen met de DOM-lib van de hoofd-tsconfig te vermijden (hetzelfde patroon als de losse
// `declare const process` in de check-bestanden zelf). Een los .d.ts-bestand (geen top-level
// import/export) is voor TS een "script", niet een module — alleen zo telt `declare module 'node:x'`
// als een VERSE ambient declaratie i.p.v. een augmentation-poging op een nog onbekende module.
declare module 'node:fs' {
  export function readFileSync(path: string, encoding: 'utf8'): string;
}
declare module 'node:url' {
  export function fileURLToPath(url: string): string;
}
declare module 'node:path' {
  export function dirname(path: string): string;
  export function join(...paths: string[]): string;
}
