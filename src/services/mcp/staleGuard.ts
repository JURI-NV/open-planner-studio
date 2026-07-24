// Taak T7 — versheids-guard-helper (WP8). Puur een helper: geen tool, geen envelop, geen
// store-uitbreiding. Later gebruikt door `save_baseline`, de losse `level_resources` en
// `get_resource_histogram`, die vóór hun werk een verse planning nodig hebben maar geen extra
// undo-stap mogen achterlaten.
//
// De invariant die dit veilig maakt: `runCPM` pusht NOOIT een undo-snapshot (het schrijft alleen
// berekende velden terug via Immer; zie scheduleSlice.runCPM en transaction.ts — géén
// `beginUndoable`). Daarom kan deze helper stil herrekenen zonder de undo-stack te raken.
import { useAppStore } from '@/state/appStore';

/** Uitkomst van `ensureFreshSchedule`. */
export interface FreshResult {
  /** True wanneer de planning stale was en opnieuw is doorgerekend; false wanneer al vers. */
  recomputed: boolean;
  /** Gezet wanneer de herrekening in `cpmResult.error` eindigde (bv. kringverwijzing). De
   *  aanroepende tool beslist wat daarmee gebeurt (blokkeren, doorgeven, ...). */
  error?: string;
}

/**
 * Herrekent de planning ALLÉÉN wanneer die stale is.
 *
 * - `scheduleStale === false` ⇒ `{ recomputed: false }` en er wordt NIETS aangeraakt (geen
 *   onnodige recompute, `cpmResult`-referentie blijft ongewijzigd).
 * - `scheduleStale === true` ⇒ `runCPM()` wordt aangeroepen; daarna wordt `cpmResult.error`
 *   (indien gezet) als `error`-string teruggegeven. `runCPM` vangt kringverwijzingen zelf af en
 *   gooit niet — deze helper gooit dus evenmin.
 *
 * Pusht nooit een undo-snapshot (runCPM-invariant).
 */
export function ensureFreshSchedule(): FreshResult {
  const state = useAppStore.getState();
  if (!state.scheduleStale) {
    return { recomputed: false };
  }
  state.runCPM();
  // Verse referentie ná de recompute ophalen — runCPM heeft een nieuwe cpmResult gezet.
  const error = useAppStore.getState().cpmResult?.error;
  return error ? { recomputed: true, error } : { recomputed: true };
}
