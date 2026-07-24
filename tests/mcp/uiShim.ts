// Aanvulling op de harness-DOM-shim, ALLEEN nodig voor cases die (transitief) `@/i18n/config` laden —
// zoals cases-runtime.ts, dat via `shortcutRegistry` (hasBlockingDialogOpen) de i18n-init meesleept.
// Die init zet bij module-load `document.documentElement.dir`; de harness-shim definieert enkel
// `createElement`. Importeer dit ná './harness' (dat `globalThis.document` zet) en vóór de modules
// die shortcutRegistry/i18n binnenhalen. Bewust een los bestand, zodat de gedeelde harness ongemoeid
// blijft (parallelle banen delen die).
const doc = (globalThis as unknown as { document?: Record<string, unknown> }).document;
if (doc && !doc.documentElement) {
  doc.documentElement = { dir: 'ltr', lang: 'nl', setAttribute() {}, style: {} };
}
