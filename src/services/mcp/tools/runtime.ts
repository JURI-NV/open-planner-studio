// STUB — wordt bij F-merge vervangen door de F1-implementatie (T17).
//
// Minimale tool-runtime met EXACT de F1-contract-API (spec §Sessie-semantiek + §AI-backup). Doet
// precies genoeg om de mutatietools van T19 te bewijzen: envelop bouwen, de guards draaien
// (paused → readOnly → dialoog → backup → drift, in die volgorde), `ctx.ensureBackup` op de
// dispatch-grens awaiten (vóór de transactie) en `runInMcpTransaction` draaien. Geen extra features.
//
// COÖRDINATIE MET F1 (T17) — de échte runtime moet deze semantiek 1-op-1 behouden zodat de merge de
// tools ongemoeid laat:
//   - `runReadTool` bouwt de envelop + draait `fn(state)`; leestools kennen GEEN paused/readOnly/backup-
//     guard (spec: leestools mogen door bij pauze/alleen-lezen/drift).
//   - `runMutateTool` guard-volgorde: paused → readOnly → dialoog → ensureBackup(await) → drift(ná de
//     backup-await, direct vóór de transactie) → `runInMcpTransaction(fn)`. De backup-write is async en
//     wordt vóór de transactie geawait (WP0-invariant b: de transactie zelf is synchroon).
//   - Hard-stap-fouten uit een handler reizen als `McpStepError` (code + message) dwars door de
//     transactie-rollback: de handler `throw`t 'm binnen `fn`, de runtime vangt de code op en maakt er
//     een `McpToolErr` met díe code van. Zachte per-item-weigeringen lopen NIET via een throw maar via
//     `MutationOutcome.itemRejections` (de transactie commit; de geldige items blijven staan).
import { useAppStore } from '@/state/appStore';
import type { AppState } from '@/state/appStore';
import type {
  McpContext,
  McpEnvelope,
  McpErrorCode,
  McpToolDef,
  McpToolErr,
  McpToolOk,
  McpToolResult,
} from '../contracts';
import { runInMcpTransaction } from '@/state/mcpTransaction';
import { hasBlockingDialogOpen } from '@/hooks/keyboard/shortcutRegistry';

/** Uitkomst van een muterende handler: de `data`-payload + optionele zachte per-item-weigeringen. */
export interface MutationOutcome {
  data: unknown;
  itemRejections?: { id: string; reason: string }[];
}

/**
 * Harde stap-fout: een handler `throw`t deze binnen de mutate-`fn` om een STRUCTURELE fout te melden
 * (onbekende tool-args, kringverwijzing, taak-niet-gevonden bij een enkelvoudige tool). De code +
 * message overleven de transactie-rollback: `runMutateTool` vangt 'm op en maakt er een `McpToolErr`
 * met dezelfde code van. Zachte per-item-weigeringen gebruiken dit NIET (die lopen via
 * `MutationOutcome.itemRejections`).
 */
export class McpStepError extends Error {
  code: McpErrorCode;
  constructor(code: McpErrorCode, message: string) {
    super(message);
    this.name = 'McpStepError';
    this.code = code;
  }
}

/** Documenttitel-afleiding (stub-vorm): projectnaam of 'Naamloos'. De F1-runtime mag hier de
 *  filePath-basename-variant van `documentSlice.documentTitle` gebruiken; irrelevant voor de tools. */
function documentTitleOf(s: AppState): string {
  return s.project.name || 'Naamloos';
}

/**
 * Bouw de respons-envelop uit de LIVE store (spec §Sessie-semantiek). `paused`/`readOnly` staan hier
 * op hun store-onafhankelijke default (false); de `run*`-wrappers overschrijven ze uit de context
 * (die de ui-vlaggen draagt). `backupCreated` wordt door `runMutateTool` gezet op de call die 'm maakte.
 */
export function buildEnvelope(): McpEnvelope {
  const s = useAppStore.getState();
  return {
    activeDocumentId: s.activeDocumentId,
    documentTitle: documentTitleOf(s),
    scheduleStale: s.scheduleStale,
    paused: false,
    readOnly: false,
  };
}

/** Envelop met de context-vlaggen (paused/readOnly) ingevuld. */
function envelopeWithCtx(ctx: McpContext): McpEnvelope {
  const env = buildEnvelope();
  env.paused = ctx.paused;
  env.readOnly = ctx.readOnly;
  return env;
}

/** Bouw een `McpToolErr` met envelop + code + message. */
export function toolError(ctx: McpContext, code: McpErrorCode, message: string): McpToolErr {
  return { ok: false, envelope: envelopeWithCtx(ctx), error: message, code };
}

/**
 * Verankert het verwachte actieve document in de context (drift-anker). Wordt aangeroepen bij het
 * verzetten van het anker (dispatch-start, `switch_document`, `new_document`, `duplicate_document`,
 * `import_schedule`). Stub: leest simpelweg het huidige actieve document-id.
 */
export function bindExpectedDoc(ctx: McpContext): void {
  ctx.expectedDocId = useAppStore.getState().activeDocumentId;
}

/**
 * Leestool-wrapper: bouwt de envelop en draait `fn` op de huidige store-staat. GEEN guards — leestools
 * mogen door bij pauze/alleen-lezen/drift (de envelop meldt de status en het actieve document).
 */
export function runReadTool(ctx: McpContext, fn: (s: AppState) => unknown): McpToolResult {
  const data = fn(useAppStore.getState());
  const ok: McpToolOk = { ok: true, envelope: envelopeWithCtx(ctx), data };
  return ok;
}

/** Drift-detectie: is het actieve document nog het verwachte anker? */
function driftError(ctx: McpContext): McpToolErr | null {
  if (ctx.expectedDocId === null) return null;
  const active = useAppStore.getState().activeDocumentId;
  if (active !== ctx.expectedDocId) {
    return toolError(
      ctx,
      'DOC_DRIFT',
      `actief document is gewijzigd: was ${ctx.expectedDocId}, nu ${active} — bevestig met switch_document`,
    );
  }
  return null;
}

/**
 * Muterende-tool-wrapper. Guard-volgorde (spec §Sessie-semantiek / §AI-backup):
 *   1. paused → PAUSED   2. readOnly → READ_ONLY   3. blokkerende dialoog → DIALOG_OPEN
 *   4. ensureBackup(await, op de dispatch-grens, vóór de transactie) → mislukt ⇒ BACKUP_FAILED
 *   5. drift-check (ná de backup-await — tijdens de await kan de user nog wisselen) → DOC_DRIFT
 *   6. `runInMcpTransaction(fn)` — `fn` draait de draft-primitieven en levert de `MutationOutcome`.
 * Een `McpStepError` uit `fn` wordt opgevangen en als `McpToolErr` met díe code teruggegeven; elke
 * andere transactie-fout (bv. een kring die de eind-runCPM ving) wordt CYCLE/VALIDATION.
 */
export async function runMutateTool(
  ctx: McpContext,
  kind: McpToolDef['kind'],
  fn: () => MutationOutcome,
): Promise<McpToolResult> {
  if (ctx.paused) return toolError(ctx, 'PAUSED', 'de bridge is gepauzeerd door de gebruiker');
  if (ctx.readOnly) return toolError(ctx, 'READ_ONLY', 'de bridge staat in alleen-lezen-modus');
  if (hasBlockingDialogOpen()) {
    return toolError(ctx, 'DIALOG_OPEN', 'een blokkerende dialoog/overlay is open in de app');
  }

  // Backup op de dispatch-grens, vóór de (synchrone) transactie. Mislukt ⇒ fail-safe weigeren.
  const docId = useAppStore.getState().activeDocumentId;
  let backupPath: string | null = null;
  try {
    backupPath = await ctx.ensureBackup(docId, kind);
  } catch (e) {
    const reason = e instanceof Error ? e.message : String(e);
    return toolError(ctx, 'BACKUP_FAILED', `automatische backup mislukt, mutatie geweigerd: ${reason}`);
  }

  // Drift-check ná de backup-await (de user kan tijdens de await nog van tabblad wisselen).
  const drift = driftError(ctx);
  if (drift) return drift;

  // Transactie: één undo-stap, één herberekening. Hard-stap-fouten reizen via McpStepError.
  let outcome: MutationOutcome | undefined;
  let stepError: McpStepError | undefined;
  const res = runInMcpTransaction(() => {
    try {
      outcome = fn();
    } catch (e) {
      if (e instanceof McpStepError) stepError = e;
      throw e; // laat de transactie schoon terugrollen
    }
  });

  if (!res.ok) {
    if (stepError) return toolError(ctx, stepError.code, stepError.message);
    // Geen expliciete stap-fout ⇒ de eind-runCPM ving een kring (of een draft-vangrail gooide).
    const code: McpErrorCode = /kring|cycle|circular|cirkel/i.test(res.error) ? 'CYCLE' : 'VALIDATION';
    return toolError(ctx, code, res.error);
  }

  const env = envelopeWithCtx(ctx);
  if (backupPath) env.backupCreated = backupPath;
  const ok: McpToolOk = {
    ok: true,
    envelope: env,
    data: outcome!.data,
    ...(outcome!.itemRejections && outcome!.itemRejections.length > 0
      ? { itemRejections: outcome!.itemRejections }
      : {}),
  };
  return ok;
}

/**
 * Lichte guard voor niet-transactionele muterende tools (`undo`/`redo`/`run_cpm`): dezelfde
 * paused/readOnly/dialoog/drift-guards als `runMutateTool`, maar ZONDER backup en ZONDER transactie —
 * deze tools beheren hun eigen undo-stack (undo/redo) of zijn een pure herberekening (run_cpm) en
 * mogen dus niet in een `runInMcpTransaction` (dat zou een verkeerde undo-stap pushen). Retourneert
 * een `McpToolErr` bij een geblokkeerde guard, anders `null` (doorgaan).
 */
export function guardNonTransactional(ctx: McpContext): McpToolErr | null {
  if (ctx.paused) return toolError(ctx, 'PAUSED', 'de bridge is gepauzeerd door de gebruiker');
  if (ctx.readOnly) return toolError(ctx, 'READ_ONLY', 'de bridge staat in alleen-lezen-modus');
  if (hasBlockingDialogOpen()) {
    return toolError(ctx, 'DIALOG_OPEN', 'een blokkerende dialoog/overlay is open in de app');
  }
  const drift = driftError(ctx);
  if (drift) return drift;
  return null;
}
