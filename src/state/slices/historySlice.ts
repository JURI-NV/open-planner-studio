import { createSnapshot, restoreSnapshot, type Snapshot } from '../snapshot';
import { resetUndoCoalescing, pushUndoSnapshot } from '../transaction';
import type { AppSlice } from './types';

export interface HistorySlice {
  undoStack: Snapshot[];
  redoStack: Snapshot[];
  undo: () => void;
  redo: () => void;
}

export const createHistorySlice: AppSlice<HistorySlice> = (set, get) => ({
  undoStack: [],
  redoStack: [],

  undo: () => {
    // Een undo breekt elke lopende coalesce-reeks af (pakket H): de eerstvolgende keyed mutatie
    // moet gegarandeerd een verse snapshot pushen.
    resetUndoCoalescing();
    set((s) => {
      if (s.undoStack.length === 0) return;
      s.redoStack.push(createSnapshot(s));
      restoreSnapshot(s, s.undoStack.pop()!);
    });
    get().recomputeViewRows();
  },

  redo: () => {
    resetUndoCoalescing(); // idem als bij undo — zie daar.
    set((s) => {
      if (s.redoStack.length === 0) return;
      // Via de helper, zodat de MAX_UNDO-grens en het coalesce-volgnummer op één plek blijven.
      pushUndoSnapshot(s);
      restoreSnapshot(s, s.redoStack.pop()!);
    });
    get().recomputeViewRows();
  },
});
