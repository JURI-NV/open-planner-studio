import { useAppStore } from './appStore';
import { pushUndoSnapshot, enterBatch, exitBatch, isBatchActive, resetUndoCoalescing } from './transaction';

/**
 * Voer een reeks mutaties uit als ÉÉN ongedaan-maakbare stap (K-item 32).
 *
 * Het probleem. Elke mutator pusht zijn eigen deep-clone-snapshot. Een lus van n toevoegingen
 * kloont daardoor 1 + 2 + … + n taken — zuiver kwadratisch. Dat is geen theorie: `api.data.addTask`
 * is de enige manier waarop een extensie taken kan aanmaken, dus een importer die duizend taken
 * toevoegt betaalt duizend snapshots én laat duizend undo-stappen achter voor wat de gebruiker als
 * één handeling ziet.
 *
 * Deze functie neemt de snapshot één keer vooraf en onderdrukt die van de mutators. Kosten worden
 * lineair, en één bulk = één undo-stap.
 *
 * Bewust GEEN rollback bij een fout — dat is wat `runInMcpTransaction` doet, en dat vraagt om een
 * herintreedbaarheids-guard plus het terugzetten van de redo-stack. Hier is de belofte smaller en
 * eerlijker: één undo-stap en lineaire kosten. Gooit `fn`, dan blijft wat er al gemuteerd is staan
 * en dekt de ene snapshot precies de begintoestand — de gebruiker kan het in één keer terugdraaien.
 *
 * Genest aanroepen is veilig: de binnenste doet niets extra's, want de buitenste snapshot dekt de
 * hele reeks al. Vandaar een diepteteller in plaats van een vlag.
 */
export function withTransaction<T>(fn: () => T): T {
  if (isBatchActive()) return fn(); // genest: de buitenste transactie dekt dit al

  // Een bulk breekt een lopende coalescing-reeks af — anders zou de eerstvolgende toetsaanslag in
  // een datumveld op déze snapshot willen doorbouwen.
  resetUndoCoalescing();

  // De snapshot van de PLAIN pre-transactie-staat, niet van een draft. `createSnapshot` normaliseert
  // een draft zelf via `original()`, maar hier is de plain staat sowieso al bij de hand.
  const base = useAppStore.getState();
  useAppStore.setState((s) => {
    pushUndoSnapshot(s, base);
    s.redoStack = [];
  });

  enterBatch();
  try {
    return fn();
  } finally {
    // `finally`, zodat een throw in `fn` de suppressie niet laat hangen: elke volgende mutatie in
    // de app zou dan stilzwijgend geen undo-stap meer opleveren.
    exitBatch();
  }
}
