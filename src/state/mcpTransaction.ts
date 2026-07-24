import { useAppStore } from './appStore';
import { createSnapshot, restoreSnapshot, type Snapshot } from './snapshot';
import { resetUndoCoalescing, setMcpTransactionActive } from './transaction';

/**
 * Het transactieprimitief van de MCP-bridge (spec §Werkpakket 0).
 *
 * "Eén bulk/batch = één undo-stap, één herberekening". Elke bestaande store-mutator pusht zelf een
 * undo-snapshot (via `beginUndoable`) en veel draaien zelf `runCPM`/`recompute*`. Om een reeks
 * mutaties tot ÉÉN atomaire, ongedaan-maakbare stap samen te voegen zet deze helper:
 *
 *   1. neemt zelf ÉÉN snapshot vooraf en pusht die op de undo-stack (nieuwe undoable actie ⇒
 *      redo-stack wissen), in een eigen `set()`-producer;
 *   2. zet de suppressie-vlag aan zodat elke `beginUndoable` binnen de callback een no-op is;
 *   3. draait `fn()` — die mag meerdere `set()`-producers doen (draft-primitieven, T2);
 *   4. zet de vlag weer uit;
 *   5. draait ÉÉNMAAL de eindherberekening: `runCPM` (pusht per invariant a nooit een snapshot),
 *      `recomputeViewRows`, `recomputeResourceLoad`;
 *   6. bij een throw in `fn` óf een `cpmResult.error` ná stap 5: VOLLEDIGE rollback — de vooraf
 *      genomen snapshot terugzetten (`restoreSnapshot` herstelt óók `cpmResult`/kalenders/baselines,
 *      dus geen achterblijvende error-banner), de gepushte snapshot poppen, de redo-stack herstellen
 *      en `resetUndoCoalescing()`; return `{ ok: false }`;
 *   7. bij succes óók `resetUndoCoalescing()` — de handmatige push wijzigde de stackdiepte zonder de
 *      coalesce-marker te raken, en een latere keyed user-edit mag daar niet tegenaan coalescen.
 *
 * BEWUST: mutaties en `runCPM` leven in APARTE producers — genest `set()` binnen een Immer-producer
 * kan niet. De transactie draait volledig SYNCHROON (geen `await` tussen stappen), zodat de user
 * fysiek niet mid-transactie van document kan wisselen.
 */
export function runInMcpTransaction(fn: () => void): { ok: true } | { ok: false; error: string } {
  // Stap 1: snapshot van de PLAIN pre-transactie-staat (niet van een draft — zie beginUndoable/B1).
  const snapshot: Snapshot = createSnapshot(useAppStore.getState());
  // Redo-stack bewaren zodat een rollback exact terug is bij "vóór" (op succes wissen we hem, als
  // nieuwe undoable actie; bij rollback is er niets gebeurd en zetten we hem terug).
  const prevRedo = useAppStore.getState().redoStack;

  const rollback = (error: string): { ok: false; error: string } => {
    useAppStore.setState((s) => {
      restoreSnapshot(s, snapshot);
      s.undoStack.pop(); // de in stap 1 gepushte snapshot verwijderen (restoreSnapshot raakt undoStack niet)
      s.redoStack = prevRedo;
    });
    resetUndoCoalescing();
    return { ok: false, error };
  };

  // Stap 1 (vervolg): de vooraf-snapshot als enige undo-stap voor de hele transactie.
  useAppStore.setState((s) => {
    s.undoStack.push(snapshot);
    s.redoStack = [];
  });

  // Stap 2-4: suppressie aan, callback draaien, suppressie uit — óók bij een throw.
  setMcpTransactionActive(true);
  try {
    fn();
  } catch (e) {
    setMcpTransactionActive(false);
    return rollback(e instanceof Error ? e.message : String(e));
  }
  setMcpTransactionActive(false);

  // Stap 5: één eindherberekening.
  useAppStore.getState().runCPM();
  useAppStore.getState().recomputeViewRows();
  useAppStore.getState().recomputeResourceLoad();

  // Stap 6: een kringverwijzing (of andere solver-fout) ⇒ volledige rollback.
  const cpm = useAppStore.getState().cpmResult;
  if (cpm?.error) {
    return rollback(cpm.error);
  }

  // Stap 7: geslaagd — coalesce-marker resetten (de handmatige push wijzigde de stackdiepte).
  resetUndoCoalescing();
  return { ok: true };
}
