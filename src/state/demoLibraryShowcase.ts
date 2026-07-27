/**
 * Bedrading voor "showcase-voorbeelden delen één demo-resourcebibliotheek" (issue #19, user-verzoek).
 * Gedeelde helper voor de twee aanroeppunten die een showcase-voorbeeld openen — Backstage
 * (`ExamplesSection.handleOpen`) en `HelpPanel` (`handleOpenExample`) — zodat de logica niet
 * dupliceert.
 *
 * Roep dit NA `openExampleFromString`/`applyLoadedProject` (het document moet al volledig geladen
 * zijn — `openExampleFromString` laadt bewust LOS, herkomststempels/binding zijn dus al gestript) en
 * VÓÓR `runCPM()`.
 *
 * Seedt de demo-pool idempotent, koppelt het net-geladen project eraan, en linkt automatisch elke
 * ONDUBBELZINNIGE naam-match (`computeRecognition`/`linkRecognizedItems`) — zonder het
 * afwijkingenscherm aan de gebruiker te tonen: dit is een demo, geen vraag.
 */
import { useAppStore } from './appStore';

export function applyDemoLibraryToShowcaseProject(): void {
  const store = useAppStore.getState();
  const companyId = store.seedDemoLibrary();
  store.bindProjectToCompany(companyId);
  const links = store.computeRecognition()
    .filter((c) => c.suggestedPoolId !== null)
    .map((c) => ({ kind: c.kind, projectId: c.projectId, poolId: c.suggestedPoolId as string }));
  if (links.length > 0) store.linkRecognizedItems(links);
}
