// Ambiente globale voor de JURI-embed (T1.5): de buitenste Next.js-app zet dit vóórdat het
// OPS-bundle-scripttag laadt (embedding-route in juri-builder-evaluatie), zodat `useJuriEmbed`
// weet welk project geladen moet worden. `undefined` in élke andere build (Tauri, losstaande web) —
// géén `import`/`export` in dit bestand, dus globale merge (zelfde patroon als
// `file-system-access.d.ts`).
interface Window {
  __JURI_PROJECT_ID__?: string;
}
