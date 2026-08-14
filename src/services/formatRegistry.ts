// Eén registry voor de extensie→reader-dispatch, die tot nu toe 5× gedupliceerd was
// (fileSlice.openFile/openRecentFile/parseExternalSource, fileTools.parseByExtension,
// devBridge.openFromPath) plus de bijbehorende exportlijst (Backstage). Pure refactor —
// gedrag ongewijzigd (fase 3.8 etappe 1, taak T1).

import { readIFC } from '@/services/ifc/ifcReader';
import { readCSV } from '@/services/csv/csvReader';
import { readMSPDI } from '@/services/msproject/mspdiReader';
import { readP6XML } from '@/services/p6/p6xmlReader';
import type { ImportLabels, ImportResult } from '@/services/importTypes';
import type { FileFilter } from '@/services/fileAccess';

/** Invoer voor een reader: tekstformaten krijgen `text`, binaire formaten `bytes`. */
export interface FormatInput { name: string; text?: string; bytes?: Uint8Array }

export interface ReadFormat {
  id: string;
  extensions: string[];
  kind: 'text' | 'binary';
  /** Dialoogfilterlabel — bewust hard-coded Engels (bestaande conventie: 'IFC Files'). */
  filterName: string;
  read(input: FormatInput, labels?: ImportLabels): Promise<ImportResult>;
}

/** Kies de juiste XML-reader op basis van inhoudsmarkers (P6 vóór MS Project).
 *  Gooit bij een onbekend formaat i.p.v. stil als MSPDI te parsen.
 *  Geëxporteerd voor `planner_import_schedule` (MCP), dat dezelfde formaatherkenning gebruikt. */
export function parseProjectXml(content: string): ImportResult {
  const isP6 = content.includes('APIBusinessObjects') || content.includes('Primavera');
  const isMsProject =
    content.includes('schemas.microsoft.com/project') || content.includes('<Project');
  if (isP6) return readP6XML(content);
  if (isMsProject) return readMSPDI(content);
  throw new Error('Onbekend XML-formaat: geen MS Project- of Primavera-markers gevonden');
}

// Volgorde = bestaande filtervolgorde in openFile ('All Supported' met ifc,csv,xml).
const READ_FORMATS: ReadFormat[] = [
  { id: 'ifc', extensions: ['ifc'], kind: 'text', filterName: 'IFC Files',
    read: async (i, labels) => readIFC(i.text ?? '', labels) },
  { id: 'csv', extensions: ['csv'], kind: 'text', filterName: 'CSV Files',
    read: async (i) => readCSV(i.text ?? '') },
  { id: 'xml', extensions: ['xml'], kind: 'text', filterName: 'XML Files',
    read: async (i) => parseProjectXml(i.text ?? '') },
];

/** Extensie-match; onbekende extensie ⇒ IFC (bestaand gedrag: de else-tak van alle vijf kopieën). */
export function readFormatForFile(name: string): ReadFormat {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return READ_FORMATS.find((f) => f.extensions.includes(ext)) ?? READ_FORMATS[0];
}

export function openDialogFilters(): FileFilter[] {
  return [
    { name: 'All Supported', extensions: READ_FORMATS.flatMap((f) => f.extensions) },
    ...READ_FORMATS.map((f) => ({ name: f.filterName, extensions: f.extensions })),
  ];
}

export function binaryExtensions(): string[] {
  return READ_FORMATS.filter((f) => f.kind === 'binary').flatMap((f) => f.extensions);
}

export function parseOpenedFile(input: FormatInput, labels?: ImportLabels): Promise<ImportResult> {
  return readFormatForFile(input.name).read(input, labels);
}

/** Vertaalsleutel voor een mislukte open-actie. Duck-typed op `mppCode` zodat deze module de
 *  (lazy geladen) mpp-chunk niet statisch hoeft te importeren. */
export function importErrorMessageKey(err: unknown): string {
  const code = (err as { mppCode?: string } | null | undefined)?.mppCode;
  if (code === 'MPP_ENCRYPTED') return 'notifications.mppEncrypted';
  if (code === 'MPP_LEGACY') return 'notifications.mppLegacy';
  return 'notifications.openFailed';
}

// ── Export-kant ──

export type ExportFormat = 'ifc' | 'csv' | 'mspdi' | 'p6';

export interface ExportFormatMeta { format: ExportFormat; icon: string; labelKey: string; descKey: string }

/** Volgorde = bestaande Backstage-volgorde. */
export const EXPORT_FORMATS: ExportFormatMeta[] = [
  { format: 'csv', icon: 'CSV', labelKey: 'export.csvLabel', descKey: 'export.csvDesc' },
  { format: 'mspdi', icon: 'XML', labelKey: 'export.mspdiLabel', descKey: 'export.mspdiDesc' },
  { format: 'p6', icon: 'P6', labelKey: 'export.p6Label', descKey: 'export.p6Desc' },
  { format: 'ifc', icon: 'IFC', labelKey: 'export.ifcLabel', descKey: 'export.ifcDesc' },
];
