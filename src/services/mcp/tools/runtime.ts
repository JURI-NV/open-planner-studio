// MCP-bridge — tool-runtime (taak T17, spec §Sessie-semantiek & respons-contract, regels 115-116 +
// §UI/veiligheid 128-132).
//
// Deze laag zit BOVEN de dispatcher (die routeert puur) en ONDER de individuele tools. Elke tool
// wikkelt zijn kern in `runReadTool`/`runMutateTool`; die leveren:
//   - de envelop op elke respons (`buildEnvelope`);
//   - de guards in de door de spec vastgelegde volgorde;
//   - het drift-anker (fail-closed op een user-tabwissel);
//   - het AI-backup-hookpunt (async, geawait vóór de synchrone transactie — WP0-invariant b);
//   - de transactie-fout → nette McpErrorCode.
//
// De dispatcher heeft al een crash-barrière (-32603 bij een throw); toch maakt deze laag ZELF nette
// fouten i.p.v. te gooien — een tool-respons hoort een gestructureerde `McpToolResult` te zijn, niet
// een JSON-RPC-transportfout.

import { useAppStore } from '@/state/appStore';
import type { AppState } from '@/state/appStore';
import { runInMcpTransaction } from '@/state/mcpTransaction';
import { hasBlockingDialogOpen } from '@/hooks/keyboard/shortcutRegistry';
import type {
  McpContext,
  McpEnvelope,
  McpErrorCode,
  McpToolResult,
  McpToolErr,
  McpToolDef,
} from '../contracts';

/** Uitkomst van een muterende tool-kern: de payload plus optionele zachte per-item-weigeringen
 *  (spec §batch — een bulk mag deels slagen). */
export interface MutationOutcome {
  data: unknown;
  itemRejections?: { id: string; reason: string }[];
}

// --- Envelop -------------------------------------------------------------------------------------

/**
 * Bouw de respons-envelop uit de LIVE store-state (spec regel 115):
 *   - `activeDocumentId` — top-level doc-registry;
 *   - `documentTitle` — via de bestaande titel-afleiding (`getOpenDocuments()`, dat de interne
 *     `documentTitle(filePath, project)` van documentSlice gebruikt); zo blijft er één bron voor de
 *     titel (bestandsnaam zonder extensie, anders projectnaam, anders "Naamloos");
 *   - `scheduleStale` — top-level plannings-versheidsvlag;
 *   - `paused`/`readOnly` — de twee veiligheidsvlaggen, LIVE uit de ui-state. `McpContext.paused/
 *     readOnly` zijn een snapshot bij `buildMcpContext`; die gelijkheid geldt NIET meer zodra er een
 *     async grens tussen zit — tijdens de backup-await in `runMutateTool` kan de user de pauze-/
 *     alleen-lezen-schakelaar nog omzetten. Live lezen is dus bewust en gewenst: de envelop toont de
 *     status op respons-moment, en blijft — omdat de bindende signatuur `buildEnvelope()` géén ctx
 *     neemt — óók zonder ctx gezaghebbend.
 * `backupCreated` wordt hier NIET gezet — alleen `runMutateTool` voegt het toe op de call die de
 * backup maakte (spec regel 132: "vermeld in de envelop van die eerste mutatie").
 */
export function buildEnvelope(): McpEnvelope {
  const s = useAppStore.getState();
  const active = s.getOpenDocuments().find((d) => d.isActive);
  return {
    activeDocumentId: s.activeDocumentId,
    documentTitle: active ? active.title : '',
    scheduleStale: s.scheduleStale,
    paused: s.ui.aiPaused,
    readOnly: s.ui.aiReadOnly,
  };
}

// --- Dialoog-guard ------------------------------------------------------------------------------

/**
 * De ui-vlaggen die `hasBlockingDialogOpen()` (shortcutRegistry) als blokkerend beschouwt, in
 * dezelfde vololgorde. `hasBlockingDialogOpen()` is de gezaghebbende boolean-poort; deze lijst dient
 * alleen om de fout te BENOEMEN met welke vlag open staat (spec: "fout benoemt wélke dialoog/overlay").
 * Blijft die lijst en deze in sync — beide spiegelen de modale overlays van de app.
 */
const BLOCKING_UI_FLAGS = [
  'showTaskDialog', 'showProjectSettings', 'showProjectInfoDialog', 'showSettingsDialog',
  'showCalendarDialog', 'showUpdateDialog', 'showNewProjectDialog', 'showFeedbackDialog',
  'showStructureDialog', 'showLevelingDialog', 'showBaselineDialog', 'showColumnsDialog',
  'showFilterDialog', 'showLayoutsDialog', 'showProjectOverview', 'presentationMode',
  'showTourOverlay', 'showWelcomeDialog',
] as const;

/** Naam van de eerste open blokkerende ui-vlag, of null wanneer er geen open staat. */
function blockingDialogName(): string | null {
  const ui = useAppStore.getState().ui as unknown as Record<string, unknown>;
  for (const flag of BLOCKING_UI_FLAGS) {
    if (ui[flag]) return flag;
  }
  return null;
}

// --- Fout-helpers -------------------------------------------------------------------------------

/** Een `McpToolErr` met code, boodschap en de live envelop. */
function toolErr(code: McpErrorCode, error: string): McpToolErr {
  return { ok: false, code, error, envelope: buildEnvelope() };
}

/**
 * Map een transactie-foutstring naar een code. De solver signaleert een kringverwijzing als
 * "Circular dependency detected: …" (CPMSolver.ts); dat en de Nederlandse varianten mappen we op
 * `CYCLE`. Elke andere transactie-fout (draft-primitief-throws: onbekend id, ongeldige eenheden, …)
 * is een validatiefout ⇒ `VALIDATION`.
 */
function mapTransactionError(message: string): McpErrorCode {
  return /circular dependency|kringverwijzing|\bkring\b|cyclus|\bcycle\b/i.test(message) ? 'CYCLE' : 'VALIDATION';
}

// --- Leestool -----------------------------------------------------------------------------------

/**
 * Draai een leestool. Guards: ALLEEN de dialoog-guard (een open modaal betekent dat de user midden
 * in een handmatige actie zit — óók een lezing kan dan een half-bewerkte staat zien). GEEN drift-fail
 * (leestools mogen door, spec regel 116) en GEEN pauze-/alleen-lezen-blokkade (die raken alleen
 * mutaties). Een throw uit `fn` wordt een `INTERNAL`-fout — nooit een throw naar de dispatcher.
 */
export function runReadTool(ctx: McpContext, fn: (s: AppState) => unknown): McpToolResult {
  void ctx; // leestools gebruiken de ctx-guards niet; parameter blijft voor een uniform tool-oppervlak
  if (hasBlockingDialogOpen()) {
    const name = blockingDialogName() ?? 'een dialoog';
    return toolErr('DIALOG_OPEN', `Er staat een dialoog open (${name}); sluit die eerst voordat de AI de planning leest.`);
  }
  try {
    const data = fn(useAppStore.getState());
    return { ok: true, envelope: buildEnvelope(), data };
  } catch (e) {
    return toolErr('INTERNAL', e instanceof Error ? e.message : String(e));
  }
}

// --- Muterende tool -----------------------------------------------------------------------------

/**
 * Draai een muterende tool. Guard-volgorde is EXACT (spec §UI/veiligheid 128-132):
 *   1. `ctx.paused`  ⇒ `PAUSED`   — bridge blijft live, mutaties tijdelijk geweigerd.
 *   2. `ctx.readOnly` ⇒ `READ_ONLY`.
 *   3. dialoog open  ⇒ `DIALOG_OPEN` mét de vlag-naam.
 *   4. `await ctx.ensureBackup(docId, kind)` — een pad wordt een envelop-veld; een throw/reject ⇒
 *      `BACKUP_FAILED` VÓÓR enige mutatie (fail-safe, geen rollback nodig). De backup keyt op het
 *      doc-id ZOALS HET VÓÓR de await is (pre-await); dat is de door de spec bedoelde key.
 *   5. drift-check / anker-binding — bewust NÁ de backup-await (spec §Volgorde & atomiciteit): de
 *      backup-write is async (`writeTextFile`), en tijdens die await kan de user nog van tabblad
 *      wisselen — `switchDocument`/`newDocument` zijn synchrone store-acties op een user-klik, geen
 *      aparte MCP-call. Daarom lezen we het actieve doc-id PAS hier opnieuw. Is `expectedDocId` gezet
 *      én ≠ het (nu opnieuw gelezen) actieve doc ⇒ `DOC_DRIFT` ("was X, nu Y — bevestig met
 *      switch_document"); het reeds geschreven backup-bestand blijft dan onschadelijk staan (spec
 *      regel 131 staat dat expliciet toe). Is `expectedDocId` nog null, dan bindt deze eerste mutatie
 *      het anker aan het (post-await) actieve doc.
 *   6. `runInMcpTransaction(fn…)` — synchroon, dus geen verdere tabwissel mogelijk; bij succes komen
 *      `outcome.data` + `itemRejections` in de Ok-respons; een transactie-fout wordt via
 *      `mapTransactionError` een `CYCLE`/`VALIDATION`-fout.
 */
export async function runMutateTool(
  ctx: McpContext,
  kind: McpToolDef['kind'],
  fn: () => MutationOutcome,
): Promise<McpToolResult> {
  // (1) pauze — vóór alles: een gepauzeerde bridge mag zelfs de guards-erna niet raken.
  if (ctx.paused) {
    return toolErr('PAUSED', 'De AI-bridge is door de gebruiker gepauzeerd; muterende tools zijn tijdelijk geweigerd.');
  }
  // (2) alleen-lezen.
  if (ctx.readOnly) {
    return toolErr('READ_ONLY', 'De AI-bridge staat in alleen-lezen-modus; muterende tools zijn geweigerd zolang die actief is.');
  }
  // (3) dialoog-guard.
  if (hasBlockingDialogOpen()) {
    const name = blockingDialogName() ?? 'een dialoog';
    return toolErr('DIALOG_OPEN', `Er staat een dialoog open (${name}); sluit die eerst voordat de AI wijzigingen maakt.`);
  }
  // (4) AI-backup: async, VÓÓR de drift-check en de synchrone transactie (WP0-invariant b + spec
  //     §Volgorde & atomiciteit). De backup keyt op het doc-id ZOALS HET NU is (pre-await): een
  //     eventuele tabwissel gebeurt pas tijdens de await hieronder, en de drift-check daarna vangt
  //     dat af. Mislukt de backup ⇒ weigeren vóór er iets gemuteerd is (geen rollback nodig).
  const backupDocId = useAppStore.getState().activeDocumentId;
  let backupPath: string | null = null;
  try {
    backupPath = await ctx.ensureBackup(backupDocId, kind);
  } catch (e) {
    return toolErr('BACKUP_FAILED', `AI-backup vóór de wijziging is mislukt: ${e instanceof Error ? e.message : String(e)}`);
  }

  // (5) drift-check / anker-binding — PAS NU, ná de backup-await: tijdens die await kan de user van
  //     tabblad zijn gewisseld (synchrone store-actie op een klik). Daarom het actieve doc-id hier
  //     opnieuw lezen. Een gedrifte call laat het reeds geschreven backup-bestand onschadelijk staan.
  const activeId = useAppStore.getState().activeDocumentId;
  if (ctx.expectedDocId !== null && ctx.expectedDocId !== activeId) {
    return toolErr(
      'DOC_DRIFT',
      `Actief document is gewijzigd: was ${ctx.expectedDocId}, nu ${activeId} — bevestig met switch_document`,
    );
  }
  if (ctx.expectedDocId === null) {
    ctx.expectedDocId = activeId; // eerste mutatie bindt het anker aan het (post-await) actieve document
  }

  // (6) de eigenlijke mutatie als één atomaire, ongedaan-maakbare transactie.
  let outcome: MutationOutcome | undefined;
  const res = runInMcpTransaction(() => {
    outcome = fn();
  });
  if (!res.ok) {
    // De transactie is al schoon teruggerold; het backup-bestand (indien gemaakt) blijft onschadelijk
    // staan (spec regel 131). We melden een nette code i.p.v. het backup-veld — er is niets gemuteerd.
    return toolErr(mapTransactionError(res.error), res.error);
  }

  const envelope = buildEnvelope();
  if (backupPath) envelope.backupCreated = backupPath;
  const ok: McpToolResult = { ok: true, envelope, data: outcome!.data };
  if (outcome!.itemRejections && outcome!.itemRejections.length > 0) {
    ok.itemRejections = outcome!.itemRejections;
  }
  return ok;
}

// --- Drift-anker verzetten ----------------------------------------------------------------------

/**
 * Verzet het drift-anker naar het HUIDIGE actieve document (spec §drift-anker, regels 57/111/116).
 * Document-tools (`switch_document`, `new_document`, `duplicate_document`) en `import_schedule` roepen
 * dit ná hun documentwissel, zodat de eerstvolgende mutatie tegen het nieuwe document ankert i.p.v.
 * onterecht op drift te falen.
 */
export function bindExpectedDoc(ctx: McpContext): void {
  ctx.expectedDocId = useAppStore.getState().activeDocumentId;
}
