// Contracten voor de MCP-bridge (fase 1) — BEVROREN na fase 0.
// Normatief: docs/superpowers/specs/2026-07-24-mcp-bridge-design.md (v2.4).

/** Envelop op elke tool-respons (spec §Sessie-semantiek). */
export interface McpEnvelope {
  activeDocumentId: string;
  documentTitle: string;
  scheduleStale: boolean;
  paused: boolean;
  readOnly: boolean;
  /** Pad van de zojuist geschreven AI-backup; alleen gezet op de call die hem maakte. */
  backupCreated?: string;
}

export interface McpToolOk {
  ok: true;
  envelope: McpEnvelope;
  data: unknown;
  /** Per-item-zachte weigeringen binnen een bulk-call (spec §batch). */
  itemRejections?: { id: string; reason: string }[];
}

export type McpErrorCode =
  | 'DOC_DRIFT' | 'DIALOG_OPEN' | 'PAUSED' | 'READ_ONLY' | 'VALIDATION'
  | 'NOT_FOUND' | 'CYCLE' | 'STALE_PRECONDITION' | 'SCOPE' | 'BACKUP_FAILED' | 'INTERNAL';

export interface McpToolErr {
  ok: false;
  envelope?: McpEnvelope;
  error: string;
  code: McpErrorCode;
}

export type McpToolResult = McpToolOk | McpToolErr;

/**
 * Backup-hook (implementatie volgt in de UI-baan; hier alleen het type zodat
 * tool-banen tegen een stub kunnen bouwen). Draait op de dispatch-grens,
 * vóór runInMcpTransaction. Resolve = backup-pad, of null (geen backup nodig).
 */
export type EnsureBackupFn = (docId: string, kind: McpToolDef['kind']) => Promise<string | null>;

export interface McpContext {
  /** Drift-anker: verwacht actief document-id (null vóór de eerste document-binding). */
  expectedDocId: string | null;
  /** tempId→realId-map; de batch-executor bezit en vult deze. */
  tempIdMap: Map<string, string>;
  /** Vlaggen uit de ui-state, door de runtime ingevuld. */
  paused: boolean;
  readOnly: boolean;
  ensureBackup: EnsureBackupFn;
}

export interface McpToolAnnotations {
  readOnlyHint: boolean;
  destructiveHint: boolean;
  idempotentHint: boolean;
  openWorldHint: boolean;
}

export interface McpToolDef {
  /** Altijd met service-prefix: 'planner_add_tasks' (spec §Naamgeving). */
  name: string;
  /** Stuurt guards + backup-trigger. */
  kind: 'read' | 'mutate' | 'document' | 'other' | 'batch';
  /** Spec §Compositie: mag deze tool als batch-stap draaien? */
  batchable: boolean;
  /** JSON-schema; eenheden expliciet (completion 0-100). */
  inputSchema: object;
  annotations: McpToolAnnotations;
  /**
   * Async toegestaan (bestandstools doen echte I/O; de dispatcher awaits).
   * Batch-STAPPEN blijven synchroon (WP0-invariant b binnen runInMcpTransaction).
   */
  handler: (args: unknown, ctx: McpContext) => McpToolResult | Promise<McpToolResult>;
}

/** Eén regel in het AI-activiteitenpaneel. */
export interface ActivityEntry {
  ts: number;
  tool: string;
  summary: string;
  durationMs: number;
  ok: boolean;
  error?: string;
  substeps?: ActivityEntry[];
  argsJson: string;
  resultJson: string;
}

export interface McpServerStatus {
  state: 'off' | 'live' | 'port-busy' | 'error';
  port: number;
  message?: string;
}
