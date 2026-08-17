// Pure afleidingen achter de Gantt-weergave (K-item 33).
//
// Waarom dit bestand bestaat: alles hieronder woonde als `useMemo`-body in `GanttCanvas.tsx`. Dat
// zijn gewone berekeningen — geen DOM, geen React, geen store — maar zolang ze in een component
// zitten waarvan de enige uitvoer een beschilderd `<canvas>` is, zijn ze alleen te controleren door
// de app te starten en te kijken. De bestaande renderer-tests helpen daar niet: die bouwen hun
// `GanttRenderOptions` MET DE HAND op en draaien `GanttRenderer` rechtstreeks, dus ze staan
// stroomafwaarts van precies het rekenwerk dat hier stond. Een fout in `effectiveViewStart` of
// `contentSpanDays` bleef daardoor onzichtbaar tot een gebruiker een scheve tijdas zag.
//
// De regel voor dit bestand: **puur en bladvormig**. Geen React-imports, geen `useAppStore`, geen
// `document`/`window`. Alles komt via argumenten binnen. Zo draait `tests/planning/check-gantt-
// render-options.ts` het headless tegen dezelfde functies die de app gebruikt.
//
// Wat hier BEWUST niet in zit: de `useMemo`-aanroepen zelf. Die blijven in het component staan, mét
// hun dep-arrays. Dat is geen halfheid maar de vangrail — twee teken-callbacks zetten state tijdens
// het tekenen (achter een >1px-drempel, zie `drawPrimary`/`drawSecondary`), dus een verschoven
// memo-grens kan een renderlus opleveren. Die faalmodus ziet geen enkele headless test. Door alleen
// de INHOUD te verplaatsen is de hook-graaf per constructie ongewijzigd.
import type { Task } from '@/types/task';
import type { Sequence } from '@/types/sequence';
import type { WorkCalendar } from '@/types/calendar';
import type { ViewState, BarSplitMode, DurationDisplay } from '@/types/view';
import type { Resource } from '@/types/resource';
import type { Baseline } from '@/types/baseline';
import type { DurationSuffixes } from '@/utils/durationFormat';
import type { CPMResult } from '@/engine/scheduler/CPMSolver';
import type { ResourceLoadResult } from '@/engine/scheduler/ResourceLoad';
import type { ViewRow } from '@/engine/view/visibleRows';
import type { GanttAxis } from '@/engine/renderer/timeAxis';
import type { GanttRenderOptions } from '@/engine/renderer/GanttRenderer';
import type { HistogramSeries, HistogramPickerItem } from '@/engine/renderer/HistogramRenderer';
import type { TraceMode } from '@/state/slices/types';
import { traceFrom } from '@/engine/scheduler/graphWalk';
import { resolveGanttAxis } from '@/engine/renderer/workdayAxis';
import { CalendarEngine } from '@/engine/scheduler/CalendarEngine';
import { diffDays, formatDate, parseDate, addCalendarDays } from '@/utils/dateUtils';
import { ORIGIN_PADDING_DAYS } from '@/utils/ganttViewport';

/** Overlay-datums uit de actieve baseline, keyed op Task.id. */
export type BaselineOverlay = NonNullable<GanttRenderOptions['baselineOverlay']>;
/** Path-tracing-bundel zoals de renderer hem verwacht. */
export type GanttTrace = NonNullable<NonNullable<GanttRenderOptions['trace']>>;

/**
 * Overlay-map uit de actieve baseline. `undefined` (geen actieve baseline, of een id dat niet meer
 * bestaat) betekent voor de renderer: teken geen baseline-schaduwen.
 */
export function buildBaselineOverlay(
  baselines: Baseline[],
  activeBaselineId: string | null | undefined,
): BaselineOverlay | undefined {
  if (!activeBaselineId) return undefined;
  const active = baselines.find(b => b.id === activeBaselineId);
  if (!active) return undefined;
  const map: BaselineOverlay = new Map();
  for (const bt of active.tasks) {
    map.set(bt.taskId, { start: bt.start, finish: bt.finish, isMilestone: bt.isMilestone });
  }
  return map;
}

/**
 * Path tracing rond de (eerst) geselecteerde taak: transitieve voorgangers/opvolgers, met de
 * driving-ketens apart zodat de renderer die sterker kan tinten (MSP Task Path-conventie).
 */
export function buildTrace(
  traceMode: TraceMode,
  selectedTaskIds: string[],
  sequences: Sequence[],
  cpmResult: CPMResult | null | undefined,
): GanttTrace | undefined {
  if (traceMode === 'off' || selectedTaskIds.length === 0) return undefined;
  const focusId = selectedTaskIds[0];
  const drivingIds = cpmResult && !cpmResult.error
    ? new Set(cpmResult.drivingSequenceIds)
    : undefined;
  const tr = traceFrom(focusId, sequences, drivingIds);
  return {
    focusId,
    predecessors: traceMode !== 'successors' ? [...tr.predecessors] : [],
    drivingPredecessors: traceMode !== 'successors' ? [...tr.drivingPredecessors] : [],
    successors: traceMode !== 'predecessors' ? [...tr.successors] : [],
    drivenSuccessors: traceMode !== 'predecessors' ? [...tr.drivenSuccessors] : [],
  };
}

/**
 * Effectieve tijdas-oorsprong (de datum die op scrollX = 0 valt). De opgeslagen `viewStartDate`
 * staat standaard op "vandaag" en houdt geen rekening met taken die eerder beginnen; omdat de
 * horizontale scrollbar (en de `setScroll`-klem) alleen scrollX >= 0 toestaan, is alles links van
 * de oorsprong onbereikbaar. Pin de oorsprong daarom op de vroegste taakstart (of vandaag, wat
 * eerder is) minus een kleine marge, zodat taken in het verleden in beeld te scrollen zijn.
 */
export function computeEffectiveViewStart(tasks: Task[], viewStartDate: string): string {
  let earliest = parseDate(viewStartDate);
  for (const task of tasks) {
    const start = task.time.earlyStart || task.time.scheduleStart || task.time.lateStart;
    if (start) {
      const d = parseDate(start);
      if (d.getTime() < earliest.getTime()) earliest = d;
    }
  }
  return formatDate(addCalendarDays(earliest, -ORIGIN_PADDING_DAYS));
}

export interface SharedAxisInput {
  calendar: WorkCalendar;
  compressNonWorkdays: boolean;
  /** ISO-datum van de EFFECTIEVE oorsprong (`computeEffectiveViewStart`), niet `view.viewStartDate`. */
  viewStartDate: string;
  taskTableWidth: number;
  zoom: number;
  scrollX: number;
}

/**
 * Issue #21 punt 5 (fase 2, ontwerp §10.1 — BINDEND): ÉÉN gedeelde `GanttAxis`-instantie voor de
 * primaire Gantt-pane ÉN de Histogram (zelfde `taskTableWidth`/`effectiveView`, dus zelfde
 * kolomindeling) — anders schuiven de resource-staafjes onder de verkeerde kolommen zodra de as
 * gecomprimeerd is.
 *
 * LET OP: deze functie moet per render VERS aangeroepen worden (in het component via de dep-array
 * van de `useMemo`), zonder cross-render cache (§2.5). Bouw hier dus geen memoïsatie in: een as die
 * een kalenderwijziging overleeft, tekent stil op de oude werkdagen.
 */
export function buildSharedAxis(input: SharedAxisInput): GanttAxis {
  const engine = new CalendarEngine(input.calendar);
  return resolveGanttAxis({
    calendar: engine,
    compressNonWorkdays: input.compressNonWorkdays,
    origin: parseDate(input.viewStartDate),
    taskTableWidth: input.taskTableWidth,
    zoom: input.zoom,
    scrollX: input.scrollX,
  });
}

/**
 * Content-span in dagen vanaf de effectieve oorsprong — bewust ZONDER zoom/taskTableWidth, zodat
 * dezelfde span ook voor het secundaire split-view-venster (eigen zoom, geen taaktabel) gebruikt
 * kan worden zonder de compressie-logica te dupliceren (issue #35 punt 1). `null` = leeg project.
 */
export function computeContentSpanDays(
  tasks: Task[],
  effectiveViewStart: string,
  compressNonWorkdays: boolean,
  axis: GanttAxis,
): number | null {
  if (tasks.length === 0) return null;
  let maxDays = 365;
  for (const task of tasks) {
    const end = task.time.earlyFinish || task.time.scheduleFinish || task.time.lateFinish;
    if (end) {
      // Issue #21 punt 5 (fase 2, §10.2 eenheden-consistentie): bij compressie telt de
      // contentbreedte in WERKDAG-eenheden (`axis.daySpan`) i.p.v. kalenderdagen — anders is de
      // scrollbar te breed (kalenderdagen) of te smal t.o.v. wat er daadwerkelijk getekend wordt.
      const days = compressNonWorkdays
        ? axis.daySpan(parseDate(effectiveViewStart), parseDate(end))
        : diffDays(effectiveViewStart, end);
      if (days > maxDays) maxDays = days;
    }
  }
  return maxDays;
}

/** Contentbreedte (px) van een tijdvenster met de gegeven zoom en tabelbreedte. */
export function contentWidthFor(
  contentSpanDays: number | null,
  zoom: number,
  tableWidth: number,
): number {
  return contentSpanDays === null
    ? 2000
    : Math.max(2000, (contentSpanDays * 1.2) * zoom + tableWidth);
}

/**
 * Resourcekiezer-lijst onder het histogram: de "alle resources"-somrij plus één rij per resource,
 * elk met de vlag of er overbelaste dagen zijn. Materiaal telt niet mee in de somrij (§6.4).
 */
export function buildHistogramPicker(
  resources: Resource[],
  resourceLoadResult: ResourceLoadResult | null | undefined,
  allResourcesLabel: string,
): HistogramPickerItem[] {
  const over = resourceLoadResult?.overallocatedDays ?? {};
  const anyRenewableOver = resources.some(
    r => r.type !== 'MATERIAL' && (over[r.id]?.length ?? 0) > 0,
  );
  const items: HistogramPickerItem[] = [
    { id: undefined, label: allResourcesLabel, overallocated: anyRenewableOver },
  ];
  for (const r of resources) {
    items.push({ id: r.id, label: r.name || r.id, overallocated: (over[r.id]?.length ?? 0) > 0 });
  }
  return items;
}

/**
 * Belasting/capaciteit-reeks voor het histogram: één resource, of de som over alle renewables
 * wanneer er geen resource gekozen is (materiaal telt niet mee, §6.4).
 */
export function buildHistogramSeries(
  resourceLoadResult: ResourceLoadResult | null | undefined,
  histogramResourceId: string | undefined,
  resources: Resource[],
): HistogramSeries {
  if (!resourceLoadResult) return { load: {}, capacity: {}, overSet: new Set<string>() };
  const { load, capacity, overallocatedDays } = resourceLoadResult;
  if (histogramResourceId) {
    return {
      load: load[histogramResourceId] ?? {},
      capacity: capacity[histogramResourceId] ?? {},
      overSet: new Set(overallocatedDays[histogramResourceId] ?? []),
    };
  }
  const aggLoad: Record<string, number> = {};
  const aggCap: Record<string, number> = {};
  for (const r of resources) {
    if (r.type === 'MATERIAL') continue;
    const l = load[r.id];
    const cp = capacity[r.id];
    if (l) for (const iso in l) aggLoad[iso] = (aggLoad[iso] ?? 0) + l[iso];
    if (cp) for (const iso in cp) aggCap[iso] = (aggCap[iso] ?? 0) + cp[iso];
  }
  const overSet = new Set<string>();
  for (const iso in aggLoad) if (aggLoad[iso] > (aggCap[iso] ?? 0) + 1e-9) overSet.add(iso);
  return { load: aggLoad, capacity: aggCap, overSet };
}

/**
 * Invoer voor `buildGanttRenderOptions`. **Alle velden zijn verplicht**, ook de velden die de
 * renderer zelf optioneel houdt. Dat is opzet: de twee panes (primair en de split-view-pane)
 * verschilden vóór deze extractie in twee met de hand bijgehouden objectliteralen, en een veld dat
 * aan één kant vergeten werd viel nergens om. Nu breekt een nieuw veld BEIDE aanroepplekken op
 * compileertijd, precies zoals `DOCUMENT_FIELDS` dat voor het documentcontract doet — wie een veld
 * bewust wil weglaten schrijft `undefined` op, zichtbaar in de diff en met een reden erbij.
 */
export interface GanttRenderOptionsInput {
  rows: ViewRow[];
  sequences: Sequence[];
  calendar: WorkCalendar;
  /** Het tijdvenster van DEZE pane (primair: `effectiveView`; secundair: idem met eigen zoom/scrollX). */
  view: ViewState;
  selectedTaskIds: string[];
  collapsedTaskIds: string[];
  /** Rauw resultaat; de driving/violated/missed-lijsten worden hier één keer uitgepakt. */
  cpmResult: CPMResult | null | undefined;
  statusDate: string | undefined;
  showStatusDateLine: boolean;
  showProgressLine: boolean;
  showBaselineOverlay: boolean;
  baselineOverlay: BaselineOverlay | undefined;
  trace: GanttTrace | undefined;
  canvasWidth: number;
  canvasHeight: number;
  /** 0 voor de secundaire pane — die tekent geen taaktabel. */
  taskTableWidth: number;
  rowHeight: number;
  headerHeight: number;
  localizedMonths: string[];
  localizedWeekdays: string[];
  columnHeaders: { wbs: string; taskName: string; duration: string };
  weekStartDay: 'monday' | 'sunday';
  enableQuarterHourZoom: boolean;
  effectiveCalById: Map<string, WorkCalendar>;
  barSplitMode: BarSplitMode;
  /** Alleen gelezen in `drawTaskTable` (die bij `taskTableWidth <= 0` meteen terugkeert) en in het
   *  sleep-pilletje. De secundaire pane heeft geen van beide en geeft daarom `undefined` mee. */
  enableHourPlanning: boolean | undefined;
  durationDisplay: DurationDisplay | undefined;
  durationSuffixes: DurationSuffixes | undefined;
  /** Vertaald "verouderd"-badgelabel op een externe ghost-balk. Dit is GEEN tabelveld: het wordt in
   *  de CHART getekend (`drawTaskBars` → `drawExternalGhosts`), dus een pane die het weglaat valt
   *  terug op de hardgecodeerde NL-tekst in de renderer. */
  externalStaleLabel: string | undefined;
  /** `undefined` zolang er geen rand-sleep loopt (of in een pane die geen sleep toont). */
  durationDrag: { taskId: string; edge: 'left' | 'right' } | undefined;
  highContrast: boolean;
  compressNonWorkdays: boolean;
  /** `undefined` ⇒ de renderer bouwt zelf een as uit `calendar`+`compressNonWorkdays`+`view`. */
  axis: GanttAxis | undefined;
  fontFamily: string;
  fontScale: number;
}

/**
 * Zet de invoer om in het `GanttRenderOptions`-object dat `GanttRenderer` verwacht. Puur — geen
 * store, geen DOM — en daarom headless assertbaar (`tests/planning/check-gantt-render-options.ts`).
 */
export function buildGanttRenderOptions(input: GanttRenderOptionsInput): GanttRenderOptions {
  // Eén plek waar het CPM-resultaat wordt uitgepakt. Een resultaat MET fout telt als "nog niets
  // berekend": de drie lijsten gaan dan op undefined, zodat de renderer neutraal tekent in plaats
  // van markeringen uit een mislukte berekening te tonen.
  const cpm = input.cpmResult && !input.cpmResult.error ? input.cpmResult : undefined;
  return {
    rows: input.rows,
    sequences: input.sequences,
    calendar: input.calendar,
    view: input.view,
    selectedTaskIds: input.selectedTaskIds,
    collapsedTaskIds: input.collapsedTaskIds,
    drivingSequenceIds: cpm?.drivingSequenceIds,
    violatedConstraintTaskIds: cpm?.violatedConstraintTaskIds,
    missedDeadlineTaskIds: cpm?.missedDeadlineTaskIds,
    statusDate: input.statusDate,
    showStatusDateLine: input.showStatusDateLine,
    showProgressLine: input.showProgressLine,
    showBaselineOverlay: input.showBaselineOverlay,
    baselineOverlay: input.baselineOverlay,
    trace: input.trace,
    canvasWidth: input.canvasWidth,
    canvasHeight: input.canvasHeight,
    taskTableWidth: input.taskTableWidth,
    rowHeight: input.rowHeight,
    headerHeight: input.headerHeight,
    localizedMonths: input.localizedMonths,
    localizedWeekdays: input.localizedWeekdays,
    columnHeaders: input.columnHeaders,
    weekStartDay: input.weekStartDay,
    enableQuarterHourZoom: input.enableQuarterHourZoom,
    effectiveCalById: input.effectiveCalById,
    barSplitMode: input.barSplitMode,
    enableHourPlanning: input.enableHourPlanning,
    durationDisplay: input.durationDisplay,
    durationSuffixes: input.durationSuffixes,
    externalStaleLabel: input.externalStaleLabel,
    durationDrag: input.durationDrag,
    highContrast: input.highContrast,
    compressNonWorkdays: input.compressNonWorkdays,
    axis: input.axis,
    fontFamily: input.fontFamily,
    fontScale: input.fontScale,
  };
}
