// MCP-dispatcher — minimale streamable-HTTP-JSON-RPC-afhandeling zonder SDK-dependency.
//
// Ontvangt de RAUWE HTTP-body (JSON-RPC) en geeft de RAUWE respons-body terug; de Rust-shell
// forwardt alleen bytes (spec §Architectuur: "TS weet niets van HTTP"). Tools-only subset:
// initialize / notifications/initialized / tools/list / tools/call / ping.
//
// Guards (drift, pauze/alleen-lezen, AI-backup, transactie) zitten NIET hier — die draaien in een
// hogere laag op de dispatch-grens (spec §Sessie-semantiek / §AI-backup). Deze laag routeert puur.
import type { McpContext, McpToolResult, McpToolDef } from './contracts';
import { getTools, getTool } from './toolRegistry';

/** serverInfo.name in de initialize-respons. */
export const MCP_SERVER_NAME = 'open-planner-studio';
/** serverInfo.version in de initialize-respons (informatief; los van de app-CalVer / Cargo 0.1.0). */
export const MCP_SERVER_VERSION = '0.1.0';
/** Onze default MCP-protocolversie wanneer de client er geen bekende meestuurt. */
export const DEFAULT_PROTOCOL_VERSION = '2025-06-18';

/** Protocolversies die we herkennen en dus mogen echoën (nieuwste eerst). */
const KNOWN_PROTOCOL_VERSIONS = new Set(['2025-06-18', '2025-03-26', '2024-11-05']);

type JsonRpcId = string | number | null;

// --- JSON-RPC-encoders ---------------------------------------------------------------------------

function resultMsg(id: JsonRpcId, result: unknown): string {
  return JSON.stringify({ jsonrpc: '2.0', id, result });
}

function errorMsg(id: JsonRpcId, code: number, message: string): string {
  return JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } });
}

// --- Verpakkers ----------------------------------------------------------------------------------

/**
 * Eén list-item voor tools/list. De bevroren `McpToolDef` heeft geen los `description`-veld; de
 * MCP-toolbeschrijving komt daarom uit de standaard JSON-Schema-`description` op het inputSchema.
 */
function toolListEntry(def: McpToolDef): object {
  const schema = def.inputSchema as { description?: unknown };
  const description = typeof schema?.description === 'string' ? schema.description : '';
  return {
    name: def.name,
    description,
    inputSchema: def.inputSchema,
    annotations: def.annotations,
  };
}

/** Verpak een `McpToolResult` als MCP-tool-result (content-tekst + structuredContent + isError). */
function wrapToolResult(result: McpToolResult): object {
  return {
    content: [{ type: 'text', text: JSON.stringify(result) }],
    structuredContent: result,
    isError: !result.ok,
  };
}

// --- Dispatch ------------------------------------------------------------------------------------

/**
 * Verwerk één rauwe JSON-RPC-body en geef de rauwe respons-body terug.
 * Notificaties (bericht zonder `id`) leveren een lege string op — geen respons.
 */
export async function handleMcpMessage(rawBody: string, ctx: McpContext): Promise<string> {
  let msg: any;
  try {
    msg = JSON.parse(rawBody);
  } catch {
    return errorMsg(null, -32700, 'Parse error');
  }

  // Batch-arrays worden bewust niet ondersteund (tools-only subset).
  if (Array.isArray(msg)) {
    return errorMsg(null, -32600, 'Batch-arrays van JSON-RPC-berichten worden niet ondersteund');
  }
  if (msg === null || typeof msg !== 'object') {
    return errorMsg(null, -32600, 'Ongeldig JSON-RPC-bericht');
  }

  const isNotification = !('id' in msg);
  const id: JsonRpcId = isNotification ? null : msg.id;
  const method: unknown = msg.method;

  if (typeof method !== 'string') {
    return isNotification ? '' : errorMsg(id, -32600, 'Ongeldig JSON-RPC-bericht: ontbrekende methode');
  }

  // Notificaties (o.a. notifications/initialized): geen respons.
  if (isNotification) {
    return '';
  }

  switch (method) {
    case 'initialize': {
      const clientVersion: unknown = msg.params?.protocolVersion;
      const protocolVersion =
        typeof clientVersion === 'string' && KNOWN_PROTOCOL_VERSIONS.has(clientVersion)
          ? clientVersion
          : DEFAULT_PROTOCOL_VERSION;
      return resultMsg(id, {
        protocolVersion,
        capabilities: { tools: {} },
        serverInfo: { name: MCP_SERVER_NAME, version: MCP_SERVER_VERSION },
      });
    }

    case 'ping':
      return resultMsg(id, {});

    case 'tools/list':
      return resultMsg(id, { tools: getTools().map(toolListEntry) });

    case 'tools/call': {
      const name: unknown = msg.params?.name;
      const def = typeof name === 'string' ? getTool(name) : undefined;
      if (!def) {
        return errorMsg(id, -32602, `Onbekende tool: ${String(name)}`);
      }
      const result = await def.handler(msg.params?.arguments, ctx);
      return resultMsg(id, wrapToolResult(result));
    }

    default:
      return errorMsg(id, -32601, `Onbekende methode: ${method}`);
  }
}
