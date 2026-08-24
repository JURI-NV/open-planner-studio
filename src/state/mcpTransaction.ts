// Compatibiliteitsadapter voor de gemounte app-singleton. De transactiekern en alle draftlogica
// wonen in de contextfactory; deze module bindt uitsluitend de bestaande publieke exports.
import { appStoreContext } from './appStore';
import { createMcpTransactions } from './runtime/createMcpTransactions';

export const mcpTransactions = createMcpTransactions(appStoreContext);
export const draft = mcpTransactions.draft;

export type LegacyMcpTransactionResult =
  | { ok: true; timephasedGuidanceLost: number }
  | { ok: false; error: string };

export function runInMcpTransaction(fn: () => void): LegacyMcpTransactionResult {
  const result = mcpTransactions.run(fn);
  return result.ok
    ? { ok: true, timephasedGuidanceLost: result.timephasedGuidanceLost }
    : result;
}

export type {
  BulkTaskItem,
  McpDraft,
  McpTransactions,
  McpTransactionResult,
} from './runtime/createMcpTransactions';
