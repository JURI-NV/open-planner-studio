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

// --- Stap-fout ----------------------------------------------------------------------------------

/**
 * Harde stap-fout: een tool-handler gooit deze BINNEN de `fn` van `runMutateTool` om een SPECIFIEKE
 * `McpErrorCode` te forceren, dwars door de transactie-rollback heen. `runMutateTool` vangt hem op
 * (de code overleeft de rollback, waar de kale transactie-foutstring dat niet doet) en maakt er een
 * `McpToolErr` met díe code van. Zachte per-item-weigeringen lopen NIET via een throw maar via
 * `MutationOutcome.itemRejections`.
 */
export class McpStepError extends Error {
  readonly code: McpErrorCode;
  constructor(code: McpErrorCode, message: string) {
    super(message);
    this.name = 'McpStepError';
    this.code = code;
  }
}

// --- Fout-helpers -------------------------------------------------------------------------------

/**
 * Een `McpToolErr` met de live envelop, waarvan `paused`/`readOnly` uit `ctx` worden overschreven —
 * zodat een foutrespons de veiligheidsvlaggen toont zoals de wrapper ze bij binnenkomst zag (de
 * guards evalueren immers tegen `ctx`). Alle guard-/foutpaden lopen hierlangs; de succes-envelop
 * gebruikt bewust de LIVE `buildEnvelope()` (respons-moment, zie de comment daar).
 */
export function toolError(ctx: McpContext, code: McpErrorCode, message: string): McpToolErr {
  const envelope = buildEnvelope();
  envelope.paused = ctx.paused;
  envelope.readOnly = ctx.readOnly;
  return { ok: false, code, error: message, envelope };
}

/**
 * Map een transactie-foutstring naar een code. De solver signaleert een kringverwijzing als
 * "Circular dependency detected: …" (CPMSolver.ts); dat en de Nederlandse varianten mappen we op
 * `CYCLE`. Elke andere transactie-fout (draft-primitief-throws: onbekend id, ongeldige eenheden, …)
 * is een validatiefout ⇒ `VALIDATION`. Een handler die een precieze code wil, gooit een
 * `McpStepError` — die omzeilt deze heuristiek. (Getypeerde transactie-foutcodes voor het niet-
 * McpStepError-pad zijn een genoteerde follow-up, buiten T17-scope.)
 */
function mapTransactionError(message: string): McpErrorCode {
  return /circular dependency|kringverwijzing|\bkring\b|cyclus|\bcycle\b/i.test(message) ? 'CYCLE' : 'VALIDATION';
}

// --- Gedeelde guards ----------------------------------------------------------------------------

/**
 * De guards die GEEN async grens kennen: pauze → alleen-lezen → dialoog. Gedeeld door
 * `runMutateTool` (vóór de backup-await) en `guardNonTransactional`. Retourneert een `McpToolErr` bij
 * een blokkade, anders null.
 *
 * GEËXPORTEERD (T21): de document-/bestands-tools hebben deze drie guards nodig ZONDER de
 * drift-check erachter — `switch_document` is per spec juist de drift-bevestiging en mag er niet
 * zelf op falen; `new_document`/`import_schedule` verzetten het anker sowieso. Zij hergebruiken
 * deze functie i.p.v. de volgorde én de dialoog-naamgeving te kopiëren (spec: de fout benoemt
 * wélke dialoog blokkeert).
 */
export function preBackupGuards(ctx: McpContext): McpToolErr | null {
  if (ctx.paused) {
    return toolError(ctx, 'PAUSED', 'De AI-bridge is door de gebruiker gepauzeerd; muterende tools zijn tijdelijk geweigerd.');
  }
  if (ctx.readOnly) {
    return toolError(ctx, 'READ_ONLY', 'De AI-bridge staat in alleen-lezen-modus; muterende tools zijn geweigerd zolang die actief is.');
  }
  if (hasBlockingDialogOpen()) {
    const name = blockingDialogName() ?? 'een dialoog';
    return toolError(ctx, 'DIALOG_OPEN', `Er staat een dialoog open (${name}); sluit die eerst voordat de AI wijzigingen maakt.`);
  }
  return null;
}

/**
 * Drift-check + anker-binding tegen het HUIDIGE actieve doc-id. Bij `runMutateTool` wordt dit PAS ná
 * de backup-await aangeroepen (de user kan tijdens die await nog wisselen). Is het anker gezet én ≠
 * het actieve doc ⇒ `DOC_DRIFT`; is het nog null ⇒ deze (eerste) muterende stap bindt het anker.
 */
function driftGuard(ctx: McpContext): McpToolErr | null {
  const activeId = useAppStore.getState().activeDocumentId;
  if (ctx.expectedDocId !== null && ctx.expectedDocId !== activeId) {
    return toolError(
      ctx,
      'DOC_DRIFT',
      `Actief document is gewijzigd: was ${ctx.expectedDocId}, nu ${activeId} — bevestig met switch_document`,
    );
  }
  if (ctx.expectedDocId === null) {
    ctx.expectedDocId = activeId; // eerste muterende stap bindt het anker aan het actieve document
  }
  return null;
}

// --- Leestool -----------------------------------------------------------------------------------

/**
 * Draai een leestool. Guards: ALLEEN de dialoog-guard (een open modaal betekent dat de user midden
 * in een handmatige actie zit — óók een lezing kan dan een half-bewerkte staat zien). GEEN drift-fail
 * (leestools mogen door, spec regel 116) en GEEN pauze-/alleen-lezen-blokkade (die raken alleen
 * mutaties). Een throw uit `fn` wordt een `INTERNAL`-fout — nooit een throw naar de dispatcher.
 */
export function runReadTool(ctx: McpContext, fn: (s: AppState) => unknown): McpToolResult {
  if (hasBlockingDialogOpen()) {
    const name = blockingDialogName() ?? 'een dialoog';
    return toolError(ctx, 'DIALOG_OPEN', `Er staat een dialoog open (${name}); sluit die eerst voordat de AI de planning leest.`);
  }
  try {
    const data = fn(useAppStore.getState());
    return { ok: true, envelope: buildEnvelope(), data };
  } catch (e) {
    return toolError(ctx, 'INTERNAL', e instanceof Error ? e.message : String(e));
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
 *      `outcome.data` + `itemRejections` in de Ok-respons. Een transactie-fout wordt een `McpToolErr`:
 *      gooit de handler een `McpStepError`, dan wint díe code; anders classificeert
 *      `mapTransactionError` de foutstring als `CYCLE`/`VALIDATION`.
 */
export async function runMutateTool(
  ctx: McpContext,
  kind: McpToolDef['kind'],
  fn: () => MutationOutcome,
): Promise<McpToolResult> {
  // (1-3) pauze → alleen-lezen → dialoog (geen async grens; gedeeld met guardNonTransactional).
  const preErr = preBackupGuards(ctx);
  if (preErr) return preErr;

  // (4) AI-backup: async, VÓÓR de drift-check en de synchrone transactie (WP0-invariant b + spec
  //     §Volgorde & atomiciteit). De backup keyt op het doc-id ZOALS HET NU is (pre-await): een
  //     eventuele tabwissel gebeurt pas tijdens de await hieronder, en de drift-check daarna vangt
  //     dat af. Mislukt de backup ⇒ weigeren vóór er iets gemuteerd is (geen rollback nodig).
  const backupDocId = useAppStore.getState().activeDocumentId;
  let backupPath: string | null = null;
  try {
    backupPath = await ctx.ensureBackup(backupDocId, kind);
  } catch (e) {
    return toolError(ctx, 'BACKUP_FAILED', `AI-backup vóór de wijziging is mislukt: ${e instanceof Error ? e.message : String(e)}`);
  }

  // (5) drift-check / anker-binding — PAS NU, ná de backup-await: tijdens die await kan de user van
  //     tabblad zijn gewisseld (synchrone store-actie op een klik). Een gedrifte call laat het reeds
  //     geschreven backup-bestand onschadelijk staan.
  const driftErr = driftGuard(ctx);
  if (driftErr) return driftErr;

  // (6) de eigenlijke mutatie als één atomaire, ongedaan-maakbare transactie. Een handler mag een
  //     `McpStepError` gooien om een precieze code te forceren; die vangen we hier op (zijn code
  //     overleeft de transactie-rollback, de kale foutstring niet) en zetten we óm in een McpToolErr.
  let outcome: MutationOutcome | undefined;
  // Bewust ZONDER `= null`-initialisatie: een `let x = null` laat de control-flow-analyse `x` als
  // "definitief null" over de closure-grens dragen (⇒ `never` ná de call). Een kale union-declaratie
  // behoudt het type dat de closure-assign nodig heeft.
  let stepError: McpStepError | undefined;
  const res = runInMcpTransaction(() => {
    try {
      outcome = fn();
    } catch (e) {
      if (e instanceof McpStepError) stepError = e;
      throw e; // door laten gaan zodat de transactie schoon terugrolt
    }
  });
  if (!res.ok) {
    // De transactie is al schoon teruggerold; het backup-bestand (indien gemaakt) blijft onschadelijk
    // staan (spec regel 131). Een expliciete McpStepError-code wint van de string-heuristiek.
    if (stepError) return toolError(ctx, stepError.code, stepError.message);
    return toolError(ctx, mapTransactionError(res.error), res.error);
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

// --- Niet-transactionele guard ------------------------------------------------------------------

/**
 * Dezelfde guards als `runMutateTool` (pauze → alleen-lezen → dialoog → drift + anker-binding), maar
 * ZONDER de AI-backup en ZONDER `runInMcpTransaction`. Voor tools die niet in een MCP-transactie
 * horen: `undo`/`redo` beheren hun eigen undo-stack, en `run_cpm` is een pure recompute (pusht per
 * invariant geen undo-snapshot). Er is hier geen async grens, dus de drift-check volgt direct op de
 * dialoog-guard. Retourneert een `McpToolErr` bij een blokkade, anders `null` (de tool mag door).
 */
export function guardNonTransactional(ctx: McpContext): McpToolErr | null {
  const preErr = preBackupGuards(ctx);
  if (preErr) return preErr;
  return driftGuard(ctx);
}
