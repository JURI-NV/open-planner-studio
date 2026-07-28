// @ts-check
//
// Minimale ESLint-flat-config (K-item 28) — bewust GEEN stijlregels.
//
// Deze repo heeft geen formatter en geen stijlconventie in code; die discussie hoort hier niet.
// Wat hier staat is de kleine set regels die dingen vangt die `tsc` niet ziet en die in dit project
// aantoonbaar zijn misgegaan:
//
//   no-floating-promises  — een `Promise` zonder await/catch. De faalmodus is stil: de actie lijkt
//                           te slagen, de fout verdwijnt als unhandled rejection. Dit is de duurste
//                           regel (vereist type-informatie) en de enige reden dat deze config
//                           type-aware is.
//   no-misused-promises   — een async functie als event-handler of in een `if`, waar de Promise
//                           zelf (altijd truthy) wordt gebruikt in plaats van zijn resultaat.
//   no-control-regex      — de klasse waar de NUL-byte in `visibleRows.ts` onder viel: een
//                           stuurteken in een reguliere expressie is bijna altijd per ongeluk.
//
// Bewust NIET opgenomen:
//   import/no-cycle       — `npm run verify:cycles` doet dit al, en beter: die kijkt naar de graaf
//                           ná type-erasure (dus geen valse treffers op `import type`) en toont het
//                           volledige pad. Zou hier een tweede, zwakkere bron van waarheid zijn.
//   no-console            — `scripts/` en `tests/` zijn juist gebouwd op console-uitvoer (de
//                           OK/XX-regels ZIJN het testresultaat), en `src/` heeft een eigen log-bus
//                           achter de DebugTerminal. Een regel die overal een uitzondering nodig
//                           heeft, bewaakt niets.
//
// Alleen `src/` wordt getypecheckt door de type-aware regels; `scripts/` en `tests/` vallen onder
// `tsconfig.tests.json` en hebben hun eigen poort (`npm run typecheck`).
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'src-tauri/**', 'public/**', 'tests/**/.*.mjs'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [tseslint.configs.base],
    // De achttien `exhaustive-deps`-disables staan nu formeel "ongebruikt" (de regel staat uit),
    // maar ze documenteren bewuste keuzes en moeten blijven staan voor wie de regel ooit aanzet.
    // Zonder dit meldt ESLint ze als overbodig en haalt `--fix` ze weg.
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    // De plugin wordt geregistreerd maar zijn regels staan hieronder bewust UIT. Reden: er staan
    // achttien `// eslint-disable-next-line react-hooks/exhaustive-deps` in de code. Zonder de
    // plugin faalt ESLint op elk daarvan met "Definition for rule was not found" — achttien
    // schijnfouten die het echte signaal ondersneeuwen. Wil je exhaustive-deps ooit áán zetten,
    // dan is dat een eigen traject (het is een luidruchtige regel op een codebase van deze leeftijd).
    plugins: { 'react-hooks': reactHooks },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      'no-control-regex': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
);
