#!/usr/bin/env node
// JURI Fase 0, T0.2 — .mpp-fideliteitsrapport.
//
// Leest een map met eigen `.mpp`-bestanden, haalt elk bestand door de bestaande, alleen-lezen
// `readMPP()` (src/services/mpp/mppReader.ts) en schrijft één CSV-rij per taak (WBS, naam, start,
// einde, duur, relaties/voorgangers, kalender-id) plus een per-bestand statusregel op stdout:
// gelukt / geweigerd (MPP8/9/12 of wachtwoord-versleuteld) / iets anders misgegaan.
//
// Raakt de app niet: geen store, geen React — puur leeswerk via de echte reader, zelfde patroon
// als scripts/generate-examples.ts (headless via scripts/run-ts.mjs / esbuild+Node).
//
//   node scripts/run-ts.mjs scripts/juri/mpp-report.ts <map-met-mpp-bestanden> [output.csv]
//
// LET OP (T0.2-scope): er zijn op het moment van schrijven GEEN eigen .mpp-voorbeeldbestanden
// beschikbaar. Dit script is dus NIET end-to-end getest tegen echte bestanden — alleen tegen de
// aanroepconventie/typechecking. Zie docs/juri/mpp-report-status.md.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { readMPP } from '@/services/mpp/mppReader';
import { MppUnsupportedError } from '@/services/mpp/errors';
import type { ImportResult } from '@/services/importTypes';
import type { Task } from '@/types/task';
import type { Sequence } from '@/types/sequence';

interface FileOutcome {
  file: string;
  status: 'ok' | 'rejected' | 'error';
  detail: string;
  taskCount?: number;
}

/** CSV-veld escapen (RFC 4180-achtig: quote zodra het veld een komma, quote of newline bevat). */
function csvField(value: string | number | undefined | null): string {
  const s = value === undefined || value === null ? '' : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

/** Voorgangers van een taak als leesbare "id(type,lag)"-lijst, gesorteerd voor determinisme. */
function relationsForTask(taskId: string, sequences: Sequence[]): string {
  return sequences
    .filter((s) => s.successorId === taskId)
    .map((s) => {
      const lag = s.lagMinutes !== undefined ? `${s.lagMinutes}min` : `${s.lagDays}d`;
      return `${s.predecessorId}(${s.type},${lag})`;
    })
    .sort()
    .join(' | ');
}

function taskRow(file: string, task: Task, sequences: Sequence[]): string[] {
  return [
    file,
    task.wbsCode,
    task.name,
    task.time.scheduleStart,
    task.time.scheduleFinish,
    task.time.durationMinutes !== undefined
      ? `${task.time.durationMinutes}min`
      : `${task.time.scheduleDuration}d`,
    relationsForTask(task.id, sequences),
    task.calendarId ?? '',
  ];
}

function describeRejection(err: MppUnsupportedError): string {
  return err.mppCode === 'MPP_LEGACY'
    ? `geweigerd (MPP8/9/12 — niet ondersteund): ${err.message}`
    : `geweigerd (wachtwoord-versleuteld): ${err.message}`;
}

function processFile(path: string): { outcome: FileOutcome; rows: string[][] } {
  let bytes: Uint8Array;
  try {
    bytes = new Uint8Array(readFileSync(path));
  } catch (err) {
    return {
      outcome: { file: path, status: 'error', detail: `kan bestand niet lezen: ${(err as Error).message}` },
      rows: [],
    };
  }

  let result: ImportResult;
  try {
    result = readMPP(bytes);
  } catch (err) {
    if (err instanceof MppUnsupportedError) {
      return { outcome: { file: path, status: 'rejected', detail: describeRejection(err) }, rows: [] };
    }
    return {
      outcome: { file: path, status: 'error', detail: `onverwachte fout: ${(err as Error).message}` },
      rows: [],
    };
  }

  const rows = result.tasks.map((t) => taskRow(path, t, result.sequences));
  return {
    outcome: { file: path, status: 'ok', detail: `${result.tasks.length} taken gelezen`, taskCount: result.tasks.length },
    rows,
  };
}

function main() {
  const [inputDir, outCsvArg] = process.argv.slice(2);
  if (!inputDir) {
    console.error('gebruik: node scripts/run-ts.mjs scripts/juri/mpp-report.ts <map-met-mpp-bestanden> [output.csv]');
    process.exit(2);
  }

  const dir = resolve(process.cwd(), inputDir);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    console.error(`geen map gevonden: ${dir}`);
    process.exit(2);
  }

  const outCsv = resolve(process.cwd(), outCsvArg ?? join('docs', 'juri', 'mpp-fidelity-report.csv'));
  mkdirSync(dirname(outCsv), { recursive: true });

  const mppFiles = readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith('.mpp'))
    .sort()
    .map((f) => join(dir, f));

  if (mppFiles.length === 0) {
    console.error(`geen .mpp-bestanden gevonden in ${dir}`);
    process.exit(2);
  }

  const header = ['bestand', 'wbs', 'naam', 'start', 'einde', 'duur', 'relaties', 'kalender_id'];
  const csvLines: string[] = [header.map(csvField).join(',')];
  const outcomes: FileOutcome[] = [];

  for (const file of mppFiles) {
    const { outcome, rows } = processFile(file);
    outcomes.push(outcome);
    for (const row of rows) csvLines.push(row.map(csvField).join(','));
  }

  writeFileSync(outCsv, csvLines.join('\n') + '\n', 'utf8');

  console.log('');
  console.log('=== .mpp-fideliteitsrapport ===');
  for (const o of outcomes) {
    const label = o.status === 'ok' ? 'OK' : o.status === 'rejected' ? 'GEWEIGERD' : 'FOUT';
    console.log(`${label.padEnd(10)} ${o.file} — ${o.detail}`);
  }
  const ok = outcomes.filter((o) => o.status === 'ok').length;
  const rejected = outcomes.filter((o) => o.status === 'rejected').length;
  const errored = outcomes.filter((o) => o.status === 'error').length;
  console.log('');
  console.log(`${outcomes.length} bestand(en): ${ok} gelukt, ${rejected} geweigerd, ${errored} fout.`);
  console.log(`CSV geschreven naar: ${outCsv}`);

  if (errored > 0) process.exit(1);
}

main();
