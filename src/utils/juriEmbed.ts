/**
 * Zijn we ingebed in JURI (server-backend actief, `window.__JURI_PROJECT_ID__` gezet door
 * de inbeddingspagina)? Naar het patroon van `isTauri()` (`platform.ts`) — nieuw bestand in
 * plaats van een bestaand upstream-bestand wijzigen (CLAUDE-JURI.md-regel 6).
 */
export const isJuriEmbed = (): boolean =>
  typeof window !== 'undefined' && Boolean(window.__JURI_PROJECT_ID__);
