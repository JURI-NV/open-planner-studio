// MCP-toolregistry — vlakke lijst + naam→def-map over alle tool-modules.
//
// STRUCTUUR (parallellisatie-eis, spec §componenten): elke toekomstige `tools/*.ts`-module
// exporteert zijn eigen `McpToolDef[]`; deze registry importeert die arrays en slaat ze plat.
// Een latere F1/F2-baan voegt dus precies twee dingen toe: zijn eigen module én één regel in
// `MODULES` hieronder. Nu nog nul echte modules.
//
// `registerToolModules` VERVANGT de interne staat volledig (idempotent) zodat de headless tests
// met stub-modules kunnen werken. Validaties bij registratie zijn ONTWIKKELFOUTEN → harde throw:
//   - elke toolnaam moet de service-prefix `planner_` dragen (spec §Naamgeving);
//   - dubbele namen mogen niet;
//   - elke tool moet een niet-lege `description` hebben (dragend voor tools/list — de AI kiest erop).
import type { McpToolDef } from './contracts';
import { readTools } from './tools/readTools';
import { documentTools } from './tools/documentTools';
import { fileTools } from './tools/fileTools';

/** Service-prefix; alle toolnamen dragen hem (spec §Naamgeving — voorkomt botsingen met andere MCP-servers). */
export const TOOL_PREFIX = 'planner_';

// Latere banen breiden dit uit, bijv.:
//   const MODULES: McpToolDef[][] = [readTools, mutateTools, documentTools, batchTools];
const MODULES: McpToolDef[][] = [readTools, documentTools, fileTools];

let flatTools: McpToolDef[] = [];
let toolsByName = new Map<string, McpToolDef>();

/**
 * (Her)registreer de complete toolset uit een lijst van module-arrays. Vervangt de vorige staat.
 * Gooit bij een ontbrekende prefix, een dubbele naam of een lege description (ontwikkelfout, faalt vroeg).
 */
export function registerToolModules(defs: McpToolDef[][]): void {
  const flat: McpToolDef[] = [];
  const byName = new Map<string, McpToolDef>();
  for (const mod of defs) {
    for (const def of mod) {
      if (!def.name.startsWith(TOOL_PREFIX)) {
        throw new Error(`MCP-toolnaam mist de verplichte '${TOOL_PREFIX}'-prefix: '${def.name}'`);
      }
      if (byName.has(def.name)) {
        throw new Error(`Dubbele MCP-toolnaam bij registratie: '${def.name}'`);
      }
      if (def.description.trim() === '') {
        throw new Error(`MCP-tool '${def.name}' mist een (niet-lege) description`);
      }
      byName.set(def.name, def);
      flat.push(def);
    }
  }
  flatTools = flat;
  toolsByName = byName;
}

/** Alle geregistreerde tools als vlakke lijst (volgorde = registratievolgorde). */
export function getTools(): McpToolDef[] {
  return flatTools;
}

/** Zoek één tool op naam; `undefined` wanneer onbekend. */
export function getTool(name: string): McpToolDef | undefined {
  return toolsByName.get(name);
}

// Zelf-registratie bij module-load (nu nog leeg).
registerToolModules(MODULES);
