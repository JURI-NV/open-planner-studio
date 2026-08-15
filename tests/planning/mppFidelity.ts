// Fidelity-meetkern (fase 3.8, etappe "MSP-pariteit", T1) — de pure functie die vaststelt hoe
// dicht `readMPP` + herberekening bij MS Projects EIGEN opgeslagen Start/Finish komt.
//
// TWEE LEVENS, ÉÉN IMPLEMENTATIE (plandocument §5): implementers/reviewers draaien deze module
// tijdens de etappe voor voor→na-cijfers, en `check-mpp-fidelity.ts` registreert 'm als
// regressietest. Beide lopen tegen de LIVE worktree — geen gepinde code-snapshot, geen tweede
// harnas dat kan afdrijven.
//
// KRITIEK ONTWERPPUNT (T1-acceptatie #1): dit bestand roept `solveProject` aan — NIET een losse
// `new CPMSolver(...).solve()` zoals het scratchpad-audit-harnas (`measure.ts`) nog deed. Het
// scratchpad-harnas is gepind op vóór de `expandSummaryRelations`-verzoening en meet dus een ANDER
// pad dan wat de app draait; `solveProject` (`src/engine/scheduler/solveProject.ts`) is sinds A3/M3
// de exacte kern die `scheduleSlice.runCPM` aanroept (leaf-filter → samenvattingsrelatie-propagatie
// → CPM → terugschrijven/rollup), dus dit bestand meet wat de gebruiker daadwerkelijk krijgt.
import { readMPP } from '@/services/mpp/mppReader';
import { solveProject } from '@/engine/scheduler/solveProject';
import { scanGroundTruthTasks, type RawTask } from './mppGroundTruth';
import { parseInstant } from '@/utils/dateUtils';
import type { Task } from '@/types/task';
import type { Sequence } from '@/types/sequence';
import type { Project } from '@/types/project';

const iso = (d: Date | null): string | null => (d ? d.toISOString().slice(0, 16) : null);
const dayOf = (s: string): string => s.slice(0, 10);

/** Vergelijk twee instant-strings (onze vorm kan date-only zijn in dagmodus). */
export function classify(ours: string | undefined, truth: string | null): 'exact' | 'sameday' | 'diff' | 'missing' {
  if (!truth) return 'missing';
  if (!ours) return 'missing';
  if (ours.length >= 16 && ours.slice(0, 16) === truth) return 'exact';
  if (ours.length === 10 && truth.slice(11) === '00:00' && ours === dayOf(truth)) return 'exact';
  if (dayOf(ours) === dayOf(truth)) return 'sameday';
  return 'diff';
}

function dayDelta(ours: string, truth: string): number {
  const a = parseInstant(dayOf(ours)).getTime();
  const b = parseInstant(dayOf(truth)).getTime();
  return Math.round((a - b) / 86400000);
}

/** Resultaat van `readMPP` + `solveProject` — de "onze-ES/onze-EF"-kant van de vergelijking. */
export interface SolvedMpp {
  tasks: Task[];
  sequences: Sequence[];
  project: Project;
  cpmError: string | null;
}

/**
 * Lees + reken door — EXACT de keten die `scheduleSlice.runCPM` draait (zie de moduleheader).
 * Gedeeld door `measureFidelity` hieronder én door `check-mpp-fidelity.ts`'s pad-pariteitscase
 * (die dit vergelijkt met wat de ECHTE store via `applyLoadedProject`+`runCPM` oplevert).
 */
export function solveMppBytes(bytes: Uint8Array): SolvedMpp {
  const result = readMPP(bytes);
  const cpm = solveProject({
    tasks: result.tasks,
    sequences: result.sequences,
    calendar: result.calendar,
    calendars: result.resourceCalendars ?? [],
    dataDate: result.project.statusDate,
    progressMode: result.project.progressMode,
    schedulingOptions: result.project.schedulingOptions,
    // Gebruikstest-bevinding 2026-08 (zelfde vloer als runCPM): ondergrens voor taken zonder
    // voorganger. T7 herijkt deze regel later in de etappe; dit meetscript volgt runCPM ongewijzigd.
    projectStartDate: result.project.startDate,
  });
  return { tasks: result.tasks, sequences: result.sequences, project: result.project, cpmError: cpm.error ?? null };
}

/** Eén rij van een afwijkende taak, voor `OPS_MPP_FIDELITY_REPORT=detail` — het "detail-formaat"
 *  uit het scratchpad-harnas (§5: "Overneembaar: … het detail-formaat"). */
export interface DiffTaskDetail {
  id: string;
  name: string;
  msStart: string | null;
  ourStart: string;
  msFinish: string | null;
  ourFinish: string;
  startMark: ' ' | '~' | 'X';
  finishMark: ' ' | '~' | 'X';
  durationDays: number;
  isMilestone: boolean;
  constraint: string;
  completionPct: number;
  actualStart: string;
  calendarId: string;
  preds: string;
}

export interface FidelityRow {
  status: 'ok' | 'rejected' | 'error';
  /** Alleen bij status 'rejected': `MppUnsupportedError.mppCode` (MPP_LEGACY/MPP_ENCRYPTED — telt
   *  als overgeslagen, nooit als fout, eigenaarsbesluit O7). Bij 'error': de foutnaam/-boodschap. */
  errCode?: string;
  errMsg?: string;
  tasks: number;
  startExact: number;
  startSameday: number;
  startDiff: number;
  finishExact: number;
  finishSameday: number;
  finishDiff: number;
  /** Attribuut-emmers over taken met een AFWIJKENDE (andere dag) start — zelfde emmers als het
   *  scratchpad-harnas: welke eigenschap correleert met de afwijking. */
  diffBuckets: Record<string, number>;
  /** Per afwijkende (sameday of diff) taak — alleen gebruikt door de detail-rapportage;
   *  altijd berekend (corpus is klein genoeg, < 3413 taken totaal) zodat rapport- en toetsmodus
   *  exact dezelfde data zien (rapportmodus mag de poort niet kunnen verzwakken, T1-acceptatie #4). */
  diffTasks: DiffTaskDetail[];
}

function rejectedRow(errCode: string, errMsg: string): FidelityRow {
  return {
    status: 'rejected', errCode, errMsg, tasks: 0,
    startExact: 0, startSameday: 0, startDiff: 0, finishExact: 0, finishSameday: 0, finishDiff: 0,
    diffBuckets: {}, diffTasks: [],
  };
}

function errorRow(errMsg: string): FidelityRow {
  return {
    status: 'error', errMsg, tasks: 0,
    startExact: 0, startSameday: 0, startDiff: 0, finishExact: 0, finishSameday: 0, finishDiff: 0,
    diffBuckets: {}, diffTasks: [],
  };
}

/**
 * De meting zelf: `readMPP` + `solveProject` (via `solveMppBytes`) tegen de onafhankelijke
 * grondwaarheid (`scanGroundTruthTasks`). `errCode`/`status`-classificatie spiegelt
 * `check-mpp-import.ts`'s bestaande conventie (`err.mppCode` aanwezig ⇒ 'rejected'/overgeslagen,
 * anders 'error'/echte fout — eigenaarsbesluit O7: MPP_LEGACY telt nooit als fout).
 */
export function measureFidelity(bytes: Uint8Array): FidelityRow {
  let solved: SolvedMpp;
  try {
    solved = solveMppBytes(bytes);
  } catch (e: unknown) {
    const err = e as { mppCode?: string; message?: unknown; name?: unknown };
    if (err && typeof err.mppCode === 'string') {
      return rejectedRow(err.mppCode, String(err.message ?? e).slice(0, 200));
    }
    return errorRow(String((e as Error)?.message ?? e).slice(0, 300));
  }

  let raws: RawTask[];
  try {
    ({ raws } = scanGroundTruthTasks(bytes));
  } catch (e: unknown) {
    return errorRow(`scanGroundTruthTasks: ${String((e as Error)?.message ?? e)}`);
  }

  const { tasks, sequences, project } = solved;
  if (raws.length !== tasks.length) {
    return errorRow(`grondwaarheid-uitlijning mislukt: ${raws.length} raw vs ${tasks.length} taken (readTasks/scanGroundTruthTasks lopen niet meer synchroon op ID)`);
  }

  const truthStart = new Map<string, string | null>();
  const truthFinish = new Map<string, string | null>();
  raws.forEach((r, i) => {
    truthStart.set(tasks[i].id, iso(r.start));
    truthFinish.set(tasks[i].id, iso(r.finish));
  });

  if (solved.cpmError) {
    return errorRow(`CPM-fout: ${solved.cpmError}`);
  }

  const predsOf = new Map<string, string[]>();
  const byId = new Map(tasks.map((t) => [t.id, t]));
  for (const s of sequences) {
    const list = predsOf.get(s.successorId) ?? [];
    list.push(`${byId.get(s.predecessorId)?.name.slice(0, 18) ?? '?'}[${s.type}]`);
    predsOf.set(s.successorId, list);
  }

  let se = 0, ss = 0, sd = 0, fe = 0, fs = 0, fd = 0;
  const buckets: Record<string, number> = {};
  const bump = (k: string) => { buckets[k] = (buckets[k] ?? 0) + 1; };
  const diffTasks: DiffTaskDetail[] = [];

  for (const t of tasks) {
    const truthS = truthStart.get(t.id) ?? null;
    const truthF = truthFinish.get(t.id) ?? null;
    const cs = classify(t.time.earlyStart, truthS);
    const cf = classify(t.time.earlyFinish, truthF);

    if (cs === 'exact') se++;
    else if (cs === 'sameday') ss++;
    else if (cs === 'diff') {
      sd++;
      if (truthS && dayDelta(t.time.earlyStart, truthS) !== 0) {
        if (truthS < project.startDate) bump('storedVoorProjectstart');
        if ((t.time.completion ?? 0) > 0) bump('heeftVoortgang');
        if (t.childIds.length > 0) bump('samenvattingstaak');
        if (t.constraint) bump('heeftConstraint');
        bump(dayDelta(t.time.earlyStart, truthS) > 0 ? 'wijLater' : 'wijVroeger');
        bump('totaal');
      }
    }

    if (cf === 'exact') fe++;
    else if (cf === 'sameday') fs++;
    else if (cf === 'diff') fd++;

    if (cs !== 'exact' || cf !== 'exact') {
      const mark = (c: ReturnType<typeof classify>): ' ' | '~' | 'X' => (c === 'exact' ? ' ' : c === 'sameday' ? '~' : 'X');
      diffTasks.push({
        id: t.id,
        name: t.name,
        msStart: truthS,
        ourStart: t.time.earlyStart,
        msFinish: truthF,
        ourFinish: t.time.earlyFinish,
        startMark: mark(cs),
        finishMark: mark(cf),
        durationDays: t.time.scheduleDuration,
        isMilestone: t.isMilestone,
        constraint: t.constraint ? `${t.constraint.type}${t.constraint.date ?? ''}` : '-',
        completionPct: Math.round((t.time.completion ?? 0) * 100),
        actualStart: t.time.actualStart ?? '-',
        calendarId: t.calendarId ?? '-',
        preds: (predsOf.get(t.id) ?? []).join(','),
      });
    }
  }

  return {
    status: 'ok',
    tasks: tasks.length,
    startExact: se, startSameday: ss, startDiff: sd,
    finishExact: fe, finishSameday: fs, finishDiff: fd,
    diffBuckets: buckets,
    diffTasks,
  };
}
