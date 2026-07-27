// MCP-toolregistry — de publieke ingang: importeert alle tool-modules en registreert ze bij load.
//
// STRUCTUUR (parallellisatie-eis, spec §componenten): elke `tools/*.ts`-module exporteert zijn eigen
// `McpToolDef[]`; deze registry importeert die arrays en slaat ze plat. Een baan voegt dus precies
// twee dingen toe: zijn eigen module én één regel in `MODULES` hieronder.
//
// De registratie-STAAT zelf (`registerToolModules`/`getTool`/`getTools`/`TOOL_PREFIX`) leeft in de
// leaf-module `toolIndex.ts` en wordt hier ongewijzigd doorgegeven. Reden: `tools/batchTool.ts` moet
// tools kunnen opzoeken; zou dat via dít bestand lopen, dan ontstond een import-cyclus die afhankelijk
// van de laadvolgorde in een temporal-dead-zone-fout eindigt (zie de kop van `toolIndex.ts`).
// Consumenten (dispatcher, server, tests) blijven gewoon hier importeren.
import type { McpToolDef } from './contracts';
import { registerToolModules } from './toolIndex';
import { readTools } from './tools/readTools';
import { taskTools } from './tools/taskTools';
import { calendarResourceTools } from './tools/calendarResourceTools';
import { documentTools } from './tools/documentTools';
import { fileTools } from './tools/fileTools';
import { batchTools } from './tools/batchTool';

export { TOOL_PREFIX, registerToolModules, getTool, getTools } from './toolIndex';

// Volgorde = registratievolgorde = de volgorde waarin `tools/list` ze teruggeeft.
// Batch staat bewust achteraan: hij dispatcht de andere tools, dus lezen we hem als sluitstuk.
const MODULES: McpToolDef[][] = [
  readTools,
  taskTools,
  calendarResourceTools,
  documentTools,
  fileTools,
  batchTools,
];

// Zelf-registratie bij module-load.
registerToolModules(MODULES);
