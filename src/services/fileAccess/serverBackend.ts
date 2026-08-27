import type { FileFilter, FileRef, OpenDialogOpts, OpenedFile, SaveOutcome } from './index';

/**
 * Derde `fileAccess`-backend: de JURI-server (T1.1/T1.2, zie `docs/juri/ontwerp-serverbackend.md`).
 *
 * Alleen bereikbaar via een `{ kind: 'server' }`-ref, die op zijn beurt alleen ontstaat via de
 * embed-bootstrap (`useJuriEmbed`, T1.5) — nooit via een bestandskiezer. Vandaar dat
 * `openFileDialogServer`/`saveFileDialogServer` hieronder bewuste no-op-stubs zijn: ze bestaan
 * uitsluitend om de 5-functie-vorm van de andere twee backends te spiegelen (exhaustiviteit in
 * `index.ts`), maar worden in de praktijk nooit aangeroepen.
 *
 * Foutconventie (zelfde als `webBackend.ts`): een netwerk-/HTTP-fout wordt NOOIT een geworpen
 * exception — altijd `null`/`false`, zodat de aanroeper (fileSlice) zijn bestaande foutafhandeling
 * kan hergebruiken.
 */

/** JSON-vorm van `GET /api/planning/{projectId}/document` (contract T1.2). */
type ServerDocumentResponse =
  | { exists: false }
  | {
      exists: true;
      revision: number;
      updatedAt: string;
      updatedByEmail: string | null;
      sizeBytes: number;
      /** Kortlevende SAS-URL — de daadwerkelijke IFC-tekst wordt via een TWEEDE, gewone GET
       *  daarnaartoe opgehaald (geen sessiecookie nodig/gewenst op die URL). */
      contentUrl: string;
    };

/** JSON-vorm van `PUT /api/planning/{projectId}/document` (contract T1.2). */
interface ServerSaveResponse {
  revision: number;
  updatedAt: string;
  checkpointCreated: boolean;
}

function apiBase(): string {
  // Alleen relevant wanneer `activeBackend()` al 'server' koos — dat gebeurt uitsluitend als deze
  // env-var gezet is (zie `index.ts`'s `SERVER_BACKEND_ENABLED`), dus hier geen extra guard nodig.
  return import.meta.env.VITE_JURI_API_BASE_URL as string;
}

function documentUrl(projectId: string): string {
  return `${apiBase()}/api/planning/${encodeURIComponent(projectId)}/document`;
}

/** Openen via picker: niet van toepassing voor de server-backend (spec §1 van de ontwerpnota — een
 *  server-ref ontstaat alleen via de embed-bootstrap, nooit via een dialoog). */
export async function openFileDialogServer(_filters: FileFilter[], _opts?: OpenDialogOpts): Promise<OpenedFile | null> {
  return null;
}

/** "Opslaan als" via picker: idem — de embed kent geen "opslaan als", alleen in-place opslaan naar
 *  het project dat de outer app al gekozen heeft. */
export async function saveFileDialogServer(_defaultName: string, _content: string, _filters: FileFilter[]): Promise<SaveOutcome | null> {
  return null;
}

/** In-place opslaan naar `{ kind: 'server' }`. `false` bij elke netwerk-/HTTP-fout — de aanroeper
 *  (`fileSlice.saveFile`) behandelt dat identiek aan een geweigerde web-handle. */
export async function saveToRefServer(ref: FileRef, content: string): Promise<boolean> {
  if (ref.kind !== 'server') return false;
  try {
    const res = await fetch(documentUrl(ref.projectId), {
      method: 'PUT',
      credentials: 'include', // sessiecookie (embed = same-origin), geen los token (zie CLAUDE-JURI.md §4).
      headers: { 'Content-Type': 'text/plain' },
      body: content,
    });
    if (!res.ok) return false;
    // Body wordt niet verder gebruikt (revision/checkpointCreated zijn nu geen state hier), maar
    // wél gelezen zodat een niet-JSON-antwoord (proxy-foutpagina e.d.) hier al opvalt als `false`
    // i.p.v. pas bij de volgende GET.
    await res.json() as ServerSaveResponse;
    return true;
  } catch {
    return false;
  }
}

/** Inhoud van een server-ref herlezen: eerst de metadata + SAS-URL ophalen, dan de IFC-tekst zelf
 *  via een tweede, gewone GET. `null` bij elke fout, of als er nog niets is opgeslagen (spec §2 van
 *  de ontwerpnota: een vers, nog nooit opgeslagen project is GEEN fout — `useJuriEmbed` behandelt
 *  dat als "begin bij een leeg document"). */
export async function readFromRefServer(ref: FileRef): Promise<string | null> {
  if (ref.kind !== 'server') return null;
  try {
    const res = await fetch(documentUrl(ref.projectId), { credentials: 'include' });
    if (!res.ok) return null;
    const data = await res.json() as ServerDocumentResponse;
    if (!data.exists) return null;
    // De SAS-URL is zelf de autorisatie — geen sessiecookie meesturen (andere host, en niet nodig).
    const contentRes = await fetch(data.contentUrl);
    if (!contentRes.ok) return null;
    return await contentRes.text();
  } catch {
    return null;
  }
}

/** Bytes herlezen: een server-ref wijst per constructie nooit naar binaire inhoud (opslaan schrijft
 *  altijd IFC-tekst, zie `saveToRefServer`/`fileSlice.saveFile`) — bewuste no-op, geen gat in de
 *  exhaustiviteit (zie ontwerpnota §1, "Toelichting `readBytesFromRef`"). */
export async function readBytesFromRefServer(_ref: FileRef): Promise<Uint8Array | null> {
  return null;
}
