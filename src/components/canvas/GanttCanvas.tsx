import { useRef, useCallback, useMemo, useState } from 'react';
import { useAppStore } from '@/state/appStore';
import { useTranslation } from 'react-i18next';
import type { HistogramSeries, HistogramPickerItem } from '@/engine/renderer/HistogramRenderer';
import { saveBranchAsWbsTemplate } from '@/utils/wbsTemplates';
import { resolveUIFontStack } from '@/utils/uiFont';
import { MiniMap } from './MiniMap';
import { parseDate, parseInstant } from '@/utils/dateUtils';
import { effectiveCalendarByTask } from '@/services/subdayIo';
import { durationSuffixesFrom } from '@/utils/taskDuration';
import { Task } from '@/types/task';
import { isTreeMode } from '@/engine/view/visibleRows';
import { ContextMenu } from './ContextMenu';
// Issue #42/#45: reikwijdte (aangeklikte taak = handgreep, selectie = bereik) + de bulk-uitvoering
// als ÉÉN undo-stap. DOM-vrij afgezonderd zodat de regressiebatterij dezelfde functies draait.
import { contextMenuOutlineScope, contextMenuBulk } from './contextMenuScope';
import { RelationTypePopover } from './RelationTypePopover';
// Issue #58: hover-tooltip die zichzelf binnen het venster houdt (nodig zodra de titel wrapt).
import { HoverTooltip } from './HoverTooltip';
import { TaskTooltipContent } from './TaskTooltipContent';
import { getLocalizedMonths } from '@/i18n/dateFormat';
import { useTaskTypeLabels } from '@/i18n/taskTypes';
import { dateToX as axisDateToX } from '@/engine/renderer/timeAxis';
import { saveLeftPanelWidth, saveHistogramHeight } from '@/utils/settingsStore';
// K-item 33: de pure afleidingen achter de weergave + de opbouw van `GanttRenderOptions`. Ze zijn
// hierheen verhuisd zodat ze headless te controleren zijn; de `useMemo`-aanroepen hieronder blijven
// bewust in dit component staan (zie de kop van dat bestand voor waarom).
import {
  buildBaselineOverlay, buildTrace,
  buildHistogramPicker, buildHistogramSeries,
  type GanttRenderOptionsSourceInput,
} from './ganttRenderOptions';
import { useGanttRendererHost } from './hooks/useGanttRendererHost';
import { useGanttViewportCoordinator } from './hooks/useGanttViewportCoordinator';
import { useGanttHistogramInteraction } from './hooks/useGanttHistogramInteraction';
import type { HistogramRenderInput } from './hooks/ganttCoordinatorTypes';
import { useBarDrag } from './hooks/useBarDrag';
import { usePan } from './hooks/usePan';
import { useBoxSelect } from './hooks/useBoxSelect';
import { useRowDrag } from './hooks/useRowDrag';
import { useDependencyDraw } from './hooks/useDependencyDraw';

// Basisgeometrie op Tekengrootte 100% (issue #60): de component leidt hieruit de EFFECTIEVE
// `rowHeight`/`headerHeight` af (× ui.uiFontScale/100) — gebruik binnen de component die geschaalde
// waarden, nooit deze constanten direct, anders lopen tekenen en hit-testen uit de pas.
const ROW_HEIGHT = 28;
const HEADER_HEIGHT = 50;
// Halve breedte van de grijpzone rond de tabel/chart-scheiding (splitter).
const SPLITTER_GRAB_MARGIN = 4;
// Dikte van de ZWEVENDE scrollbalken over de panes (issue #22 horizontaal, #35 verticaal).
// Exact de `::-webkit-scrollbar`-maat uit globals.css (8px) — NIET ruimer. Stond eerst op 14 met
// als gedachte "dan plakt de balk niet tegen de canvasrand", maar dat leverde 6px dode strook op
// die als een veel te brede balk las (user-feedback bij #35). Sinds de balken overlays zijn is
// gelijkheid met globals.css bovendien functioneel: de strook is dan precies één scrollbalk dik,
// dus er ontstaat geen dode klikzone náást de balk die de kaart eronder afdekt.
const SCROLLBAR_GUTTER = 8;
// Breedte van de sleepbare ratio-balk tussen de twee panes — de mini-map-strook eronder laat
// exact dezelfde tussenruimte, anders schuift hij t.o.v. zijn pane.
const SPLIT_RATIO_BAR_WIDTH = 5;

interface ContextMenuState {
  x: number;
  y: number;
  task: Task | null;
  /** Fase 2.10 golf 2: rechtsklik landde op de balk zelf (i.p.v. alleen de rij) — bepaalt of de
   *  balk-specifieke items (relatie leggen vanaf hier / constraint instellen) getoond worden. */
  barHit: boolean;
  /** Fase 2.10 golf 2: rechtsklik op een bandkop-rij (gegroepeerde weergave). */
  group: { key: string; collapsed: boolean } | null;
}

interface TooltipState {
  x: number;
  y: number;
  task: Task;
}

export function GanttCanvas() {
  const { t: tTask, i18n } = useTranslation('task');
  const { t: tCommon } = useTranslation('common');
  const { t: tMenu } = useTranslation('menu');
  const { labels: taskTypeLabels } = useTaskTypeLabels();

  const tasks = useAppStore(s => s.tasks);
  const sequences = useAppStore(s => s.sequences);
  const calendar = useAppStore(s => s.calendar);
  const calendars = useAppStore(s => s.calendars);
  const barSplitMode = useAppStore(s => s.ui.barSplitMode);
  // Issue #21 punt 5 (fase 2): «alleen werkbare dagen tonen» — globale weergavevoorkeur.
  const compressNonWorkdays = useAppStore(s => s.ui.compressNonWorkdays);
  const enableHourPlanning = useAppStore(s => s.ui.enableHourPlanning);
  const durationDisplay = useAppStore(s => s.ui.durationDisplay);
  const view = useAppStore(s => s.view);
  const selectedTaskIds = useAppStore(s => s.selectedTaskIds);
  const collapsedTaskIds = useAppStore(s => s.ui.collapsedTaskIds);
  const selectTask = useAppStore(s => s.selectTask);
  const selectTasks = useAppStore(s => s.selectTasks);
  const deselectAll = useAppStore(s => s.deselectAll);
  const toggleCollapse = useAppStore(s => s.toggleCollapse);
  const addTask = useAppStore(s => s.addTask);
  const updateTask = useAppStore(s => s.updateTask);
  // Issue #40: de relatiemodus is een "plakkende Shift" — staat hij aan, dan armt een mousedown op
  // een balk hetzelfde dependency-tekenen als shift+slepen. Dit is de ENIGE lezer die gedrag
  // stuurt; vóór deze fix werd de vlag alleen geschreven (dode modus, knop deed niets zichtbaars).
  const dependencyMode = useAppStore(s => s.ui.showDependencyMode);
  // Issue #21 punt 1 (fase 2): store-actie uit fase 1 — verplaatst één taak naar een exacte
  // positie (reorder of reparent), gebruikt door useRowDrag bij mouseup.
  const moveTaskTo = useAppStore(s => s.moveTaskTo);
  // Issue #26 (vervolgmelding): dezelfde sleep, maar met de hele selectie — op het canvas is een
  // meervoudige selectie extra gewoon door de box-select.
  const moveTasksTo = useAppStore(s => s.moveTasksTo);
  const setScroll = useAppStore(s => s.setScroll);
  const setUI = useAppStore(s => s.setUI);
  // Fase 2.10 golf 2 (contextmenu's): golf-1-helpers + bestaande taak-acties die het contextmenu
  // nu ook ontsluit. De muterende taak-acties (in-/uitspringen, mijlpaal, kalender, voortgang,
  // prioriteit, verwijderen) lopen sinds issue #45 via `contextMenuBulk` en worden hier daarom niet
  // meer los uit de store getrokken.
  const pasteTasks = useAppStore(s => s.pasteTasks);
  const taskClipboard = useAppStore(s => s.taskClipboard);
  // Issue #35b: het bandkop-contextmenu bestaat alléén in gegroepeerde weergave, en daar neemt
  // `computeViewRows` de taak-collapse (collapsedTaskIds) volledig over door de groepsbanden. De oude
  // `expandAll`/`collapseAll` werken op summary-taken en zijn daar dus inert — vandaar dat
  // "Alles uit-/inklappen" in het bandkop-menu niets deed. Die items gebruiken nu de groepsacties
  // (zelfde als de Beeld-tab in gegroepeerde weergave).
  const expandAllGroups = useAppStore(s => s.expandAllGroups);
  const collapseAllGroups = useAppStore(s => s.collapseAllGroups);
  // Issue #42: het taakcontextmenu klapt APART in/uit (net als de Beeld-tab) en gebruikt daarom
  // dezelfde gerichte acties als `outlineGroup` — niet de toggle.
  const collapseTasks = useAppStore(s => s.collapseTasks);
  const expandTasks = useAppStore(s => s.expandTasks);
  const setZoom = useAppStore(s => s.setZoom);
  const setViewStartDate = useAppStore(s => s.setViewStartDate);
  const uiTheme = useAppStore(s => s.ui.uiTheme);
  // Primitive invalidatiesleutel voor Canvas-2D: CSS-variabelen veranderen buiten de teken-
  // callbackidentiteit om, dus elke canvaslaag krijgt dit expliciete thema-contract mee.
  const canvasThemeRevision = uiTheme;
  // Interface-lettertypefamilie (issue #25 punt 4) → concrete CSS font-stack voor de Canvas-2D-
  // renderers. De DOM krijgt de familie via CSS-variabelen, maar een canvas leest die niet, dus
  // resolven we hem hier één keer en geven we de string mee aan beide renderers. De waarde staat
  // ook in de deps van de teken-callbacks: zonder dat hertekent het canvas niet bij een wijziging
  // en lijkt de instelling stuk (de chrome schakelt wél om, de planning niet).
  const uiFontFamily = useAppStore(s => s.ui.uiFontFamily);
  const canvasFontFamily = resolveUIFontStack(uiFontFamily);
  // Issue #60: de Tekengrootte-instelling (ui.uiFontScale). De DOM-chrome schaalt via de rem-basis
  // (`--ui-font-scale` in App.tsx), maar een canvas leest geen CSS — de factor gaat daarom als
  // `fontScale` mee naar de renderer, en schaalt hier óók de rij-/headerhoogte: zonder dat zou
  // grotere tekst in de vaste 28px-rij clippen. Alle hit-tests, overlays en scrollgrenzen hieronder
  // rekenen met dezelfde geschaalde waarden, zodat tekenen en aanwijzen op de pixel blijven kloppen.
  const uiFontScale = useAppStore(s => s.ui.uiFontScale);
  const fontScale = uiFontScale / 100;
  const rowHeight = Math.round(ROW_HEIGHT * fontScale);
  const headerHeight = Math.round(HEADER_HEIGHT * fontScale);
  const weekStartDay = useAppStore(s => s.ui.weekStartDay);
  const enableQuarterHourZoom = useAppStore(s => s.ui.enableQuarterHourZoom);
  const scrollMode = useAppStore(s => s.ui.scrollMode);
  const positionDivision = useAppStore(s => s.ui.positionDivision);
  const modifierMap = useAppStore(s => s.ui.modifierMap);
  const traceMode = useAppStore(s => s.ui.traceMode);
  const cpmResult = useAppStore(s => s.cpmResult);
  // DE gedeelde zichtbare-rijenlijst (fase 2.7, §4.3): zelfde store-veld als TableEditor.
  const viewRows = useAppStore(s => s.viewRows);
  const setCollapsedGroupKey = useAppStore(s => s.setCollapsedGroupKey);
  const splitView = useAppStore(s => s.view.splitView);
  const setSplitView = useAppStore(s => s.setSplitView);
  const clearPendingFit = useAppStore(s => s.clearPendingFit);
  const clearPendingFocusTask = useAppStore(s => s.clearPendingFocusTask);
  const showMiniMap = useAppStore(s => s.ui.showMiniMap);
  const taskTableWidth = useAppStore(s => s.ui.leftPanelWidth);
  const showHistogram = useAppStore(s => s.ui.showHistogram);
  const histogramHeight = useAppStore(s => s.ui.histogramHeight);
  const histogramResourceId = useAppStore(s => s.view.histogramResourceId);
  const resourceLoadResult = useAppStore(s => s.resourceLoadResult);
  const scheduleStale = useAppStore(s => s.scheduleStale);
  // Voortgang & baselines (fase 2.6, §6)
  const statusDate = useAppStore(s => s.project.statusDate);
  const showBaselineOverlay = useAppStore(s => s.ui.showBaselineOverlay);
  const showProgressLine = useAppStore(s => s.ui.showProgressLine);
  // #21: resource-accent + de bijbehorende resources/toewijzingen (zelfde bron als de histogram/
  // tabelweergave — de renderer krijgt alles doorgegeven en leeft buiten de store).
  const showResourceAccent = useAppStore(s => s.ui.showResourceAccent);
  const barColorSelection = useAppStore(s => s.ui.barColorSelection);
  const activityCodeTypes = useAppStore(s => s.activityCodeTypes);
  const customFieldDefs = useAppStore(s => s.customFieldDefs);
  const resources = useAppStore(s => s.resources);
  const assignments = useAppStore(s => s.assignments);
  const showStatusDateLine = useAppStore(s => s.ui.showStatusDateLine);
  const baselines = useAppStore(s => s.baselines);
  const activeBaselineId = useAppStore(s => s.activeBaselineId);
  const setHistogramResource = useAppStore(s => s.setHistogramResource);

  const viewport = useGanttViewportCoordinator({
    tasks,
    rows: viewRows,
    calendar,
    view,
    taskTableWidth,
    histogramHeight,
    rowHeight,
    headerHeight,
    showHistogram,
    showMiniMap,
    compressNonWorkdays,
    enableQuarterHourZoom,
    scrollMode,
    positionDivision,
    modifierMap,
    setScroll,
    setZoom,
    setViewStartDate,
    clearPendingFit,
    clearPendingFocusTask,
    setSplitView,
    setTaskTableWidth: width => setUI({ leftPanelWidth: width }),
    setHistogramHeight: height => setUI({ histogramHeight: height }),
    persistTaskTableWidth: width => { void saveLeftPanelWidth(width); },
    persistHistogramHeight: height => { void saveHistogramHeight(height); },
  });
  const {
    paneRowRef,
    primaryContainerRef: containerRef,
    secondaryContainerRef,
    histogramContainerRef,
    primaryHScrollRef: hScrollRef,
    secondaryHScrollRef: hScrollSecondaryRef,
    sharedVScrollRef: vScrollRef,
  } = viewport.refs;
  const effectiveViewStart = viewport.effectiveViewStart;
  const effectiveView = viewport.effectiveView;
  const sharedAxis = viewport.sharedAxis;
  const totalContentWidth = viewport.primary.contentWidth;
  const secondaryContentWidth = viewport.secondary?.contentWidth ?? 0;
  const primaryChartWidth = viewport.primary.chartWidth;
  const secondaryChartWidth = viewport.secondary?.chartWidth ?? 0;
  const tableSplitter = viewport.splitters.table;
  const histogramSplitter = viewport.splitters.histogram;

  // Onderdrukt de eerstvolgende click-afhandeling ná een gepromoveerd kader (en na een Escape-annulering
  // ervan) — anders deselecteert/hertekent de gewone click-logica de zojuist gezette boxselectie.
  // Gedeeld met de pan- en box-select-hooks.
  const justBoxSelectedRef = useRef(false);
  // Issue #21 punt 1 (fase 2): zelfde onderdrukkingspatroon, maar voor rijsleep — anders zou de
  // click ná een mouseup-move (dat de rij daadwerkelijk verplaatst heeft) de selectie/inklap-
  // logica van handleClick alsnog triggeren.
  const justRowDraggedRef = useRef(false);
  const [cursor, setCursor] = useState('default');
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  // Fase 2.10 (item 3): popover die na een dependency-drag verschijnt om het relatietype/lag
  // meteen te corrigeren — de sequence zelf bestaat al (FS+lag0, zie de dependency-drag-mouseup
  // hieronder), dit is puur een correctie-UI.
  const [relationPopover, setRelationPopover] = useState<{ sequenceId: string; x: number; y: number } | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const localizedMonths = useMemo(() => getLocalizedMonths(i18n.language), [i18n.language]);
  // issue #21 punt 2 (vervolg: dagnamen): 7 weekdag-afkortingen in getUTCDay()-volgorde
  // (0=zondag … 6=zaterdag). Hergebruikt de bestaande kalender-vertalingen uit het menu-
  // namespace (ribbon.calendarDialog.days, ISO 1=ma … 7=zo) en remapt die naar Sun-first.
  // Gememoized op de gebonden vertaalfunctie, zodat een taalwissel de labels vernieuwt en de
  // renderer-opts tussen taalwissels stabiel blijven.
  const localizedWeekdays = useMemo(
    () => [
      tMenu('ribbon.calendarDialog.days.7'), // zo (getUTCDay 0 = zondag)
      tMenu('ribbon.calendarDialog.days.1'), // ma
      tMenu('ribbon.calendarDialog.days.2'), // di
      tMenu('ribbon.calendarDialog.days.3'), // wo
      tMenu('ribbon.calendarDialog.days.4'), // do
      tMenu('ribbon.calendarDialog.days.5'), // vr
      tMenu('ribbon.calendarDialog.days.6'), // za
    ],
    [tMenu],
  );
  // Vertaalde duur-eenheid-suffixen voor de duurkolom-weergave (§6.4/§11). De gebonden
  // vertaalfunctie wisselt mee met de taal; daarbuiten blijft de rendereroptie stabiel.
  const durationSuffixes = useMemo(() => durationSuffixesFrom(tCommon), [tCommon]);

  // Fase 2.8b (§6.1/§6.9): effectieve kalender per taak (task.calendarId → bibliotheek, anders de
  // projectkalender). De renderer leest hieruit per taak uur- vs dag-modus en de banden voor de
  // balk-opsplitsing. Gememoized zodat er niet per frame een map gebouwd wordt.
  const effectiveCalById = useMemo(
    () => effectiveCalendarByTask(tasks, calendar, calendars),
    [tasks, calendar, calendars],
  );

  // ── Muisgebaar-hooks (audit P20/B1) ───────────────────────────────────────
  // De interactie-logica die vroeger als losse state + effecten in dit component woonde, zit nu per
  // gebaar in een eigen hook (elk bezit zijn eigen state + window-listeners). De centrale
  // mousedown-dispatch (handleMouseDown) doet nog de hit-test en roept de juiste `start…`-functie
  // aan; de hover-guard leest de gebundelde `active`-vlaggen i.p.v. een lange lijst losse states.
  const barDrag = useBarDrag({ zoom: view.zoom, enableQuarterHourZoom, enableHourPlanning, calendar, effectiveCalById, compressNonWorkdays, updateTask });
  // Issue #51: tijdens een RAND-sleep zet de renderer een compact duur-pilletje tegen die balkrand.
  // De duur staat op dat moment al live in de store (elke mousemove commit een `updateTask`), dus
  // dit is puur "welke taak, welke rand" — er wordt hier niets herrekend. Een `body`-sleep
  // (verplaatsen) valt er BEWUST buiten: die verandert de duur niet, en een meelopend duurcijfer bij
  // een gebaar dat hem niet raakt is misleidend. De start/finish die dán wél schuiven staan al in de
  // taakregel links en in de balkpositie zelf.
  const durationDrag = useMemo(
    () => (barDrag.dragState && barDrag.dragState.edge !== 'body'
      ? { taskId: barDrag.dragState.taskId, edge: barDrag.dragState.edge }
      : undefined),
    [barDrag.dragState],
  );
  const pan = usePan({ setScroll, justBoxSelectedRef });

  // Baseline-overlay-Map uit de actieve baseline (fase 2.6, §6.2): keyed op Task.id (leaf-taken).
  const baselineOverlay = useMemo(
    () => buildBaselineOverlay(baselines, activeBaselineId),
    [baselines, activeBaselineId],
  );

  const columnHeaders = useMemo(() => ({
    wbs: tTask('table.wbs'),
    taskName: tTask('table.name'),
    duration: tTask('table.duration'),
  }), [tTask]);

  // Path tracing rond de (eerst) geselecteerde taak: transitieve voorgangers/opvolgers, met de
  // driving-ketens apart zodat de renderer die sterker kan tinten (MSP Task Path-conventie).
  const trace = useMemo(
    () => buildTrace(traceMode, selectedTaskIds, sequences, cpmResult),
    [traceMode, selectedTaskIds, sequences, cpmResult],
  );

  // --- Histogram (fase 2.5, §6.4) ---
  const histogramPicker = useMemo<HistogramPickerItem[]>(
    () => buildHistogramPicker(resources, resourceLoadResult, tCommon('resource.histogram.allResources')),
    [resources, resourceLoadResult, tCommon],
  );

  const histogramSeries = useMemo<HistogramSeries>(
    () => buildHistogramSeries(resourceLoadResult, histogramResourceId, resources),
    [resourceLoadResult, histogramResourceId, resources],
  );

  const histogramRenderInput = useMemo<HistogramRenderInput | undefined>(() => (
    showHistogram ? {
      series: histogramSeries,
      picker: histogramPicker,
      selectedResourceId: histogramResourceId,
      view: effectiveView,
      taskTableWidth,
      // Issue #21 punt 5 (fase 2, §10.1): dezelfde as-instantie als de primaire Gantt-pane.
      axis: sharedAxis,
      // Issue #25 punt 4: zelfde lettertypefamilie als de Gantt erboven en de DOM-chrome.
      fontFamily: canvasFontFamily,
      // Issue #60 (nazit uit de PR-review): zelfde tekstschaal als de Gantt erboven, anders staan
      // de strooklabels zichtbaar uit de pas op de gedeelde as.
      fontScale,
      labels: { unitsSuffix: tCommon('resource.histogram.units') },
      emptyHint: !resourceLoadResult
        ? tCommon('resource.histogram.noData')
        : resources.length === 0
          ? tCommon('resource.histogram.noResources')
          : undefined,
    } : undefined
  ), [showHistogram, histogramSeries, histogramPicker, histogramResourceId, effectiveView, taskTableWidth, resourceLoadResult, resources.length, tCommon, sharedAxis, canvasFontFamily, fontScale]);

  const primaryRenderInput = useMemo<GanttRenderOptionsSourceInput>(() => ({
    rows: viewRows,
    sequences,
    calendar,
    view: effectiveView,
    selectedTaskIds,
    collapsedTaskIds,
    cpmResult,
    statusDate,
    showStatusDateLine,
    showProgressLine,
    showResourceAccent,
    barColorSelection,
    activityCodeTypes,
    customFieldDefs,
    taskTypeLabels,
    barColorNoneLabel: tTask('structure.none'),
    resources,
    assignments,
    showBaselineOverlay,
    baselineOverlay,
    trace,
    taskTableWidth,
    rowHeight,
    headerHeight,
    localizedMonths,
    localizedWeekdays,
    columnHeaders,
    weekStartDay,
    enableQuarterHourZoom,
    effectiveCalById,
    barSplitMode,
    enableHourPlanning,
    durationDisplay,
    durationSuffixes,
    externalStaleLabel: tTask('externalLinks.stale'),
    durationDrag,
    highContrast: uiTheme === 'high-contrast',
    palette: undefined,
    darkTheme: uiTheme === 'dark',
    compressNonWorkdays,
    axis: sharedAxis,
    fontFamily: canvasFontFamily,
    fontScale,
  }), [viewRows, sequences, calendar, effectiveView, selectedTaskIds, collapsedTaskIds, cpmResult, statusDate, showStatusDateLine, showProgressLine, showResourceAccent, barColorSelection, activityCodeTypes, customFieldDefs, taskTypeLabels, resources, assignments, showBaselineOverlay, baselineOverlay, trace, taskTableWidth, rowHeight, headerHeight, localizedMonths, localizedWeekdays, columnHeaders, weekStartDay, enableQuarterHourZoom, effectiveCalById, barSplitMode, enableHourPlanning, durationDisplay, durationSuffixes, tTask, durationDrag, uiTheme, compressNonWorkdays, sharedAxis, canvasFontFamily, fontScale]);

  // Secondary houdt exact zijn eigen zoom/scrollX, gedeelde rows/scrollY en taskTableWidth 0.
  const secondaryRenderInput = useMemo<GanttRenderOptionsSourceInput | undefined>(() => (
    splitView ? {
      rows: viewRows,
      sequences,
      calendar,
      view: {
        ...effectiveView,
        zoom: splitView.secondaryZoom,
        scrollX: splitView.secondaryScrollX,
      },
      selectedTaskIds,
      collapsedTaskIds,
      cpmResult,
      statusDate,
      showStatusDateLine,
      showProgressLine,
      showResourceAccent,
      barColorSelection,
      activityCodeTypes,
      customFieldDefs,
      taskTypeLabels,
      barColorNoneLabel: tTask('structure.none'),
      resources,
      assignments,
      showBaselineOverlay,
      baselineOverlay,
      trace,
      taskTableWidth: 0,
      rowHeight,
      headerHeight,
      localizedMonths,
      localizedWeekdays,
      columnHeaders,
      weekStartDay,
      enableQuarterHourZoom,
      effectiveCalById,
      barSplitMode,
      // Deze velden voeden alleen de ontbrekende taaktabel of primaire rand-sleep.
      enableHourPlanning: undefined,
      durationDisplay: undefined,
      durationSuffixes: undefined,
      externalStaleLabel: tTask('externalLinks.stale'),
      durationDrag: undefined,
      highContrast: uiTheme === 'high-contrast',
      palette: undefined,
      darkTheme: uiTheme === 'dark',
      // Geen gedeelde primary/histogram-as: secondary heeft een eigen tijdvenster.
      compressNonWorkdays,
      axis: undefined,
      fontFamily: canvasFontFamily,
      fontScale,
    } : undefined
  ), [splitView, viewRows, sequences, calendar, effectiveView, selectedTaskIds, collapsedTaskIds, cpmResult, statusDate, showStatusDateLine, showProgressLine, showResourceAccent, barColorSelection, activityCodeTypes, customFieldDefs, taskTypeLabels, resources, assignments, showBaselineOverlay, baselineOverlay, trace, rowHeight, headerHeight, localizedMonths, localizedWeekdays, columnHeaders, weekStartDay, enableQuarterHourZoom, effectiveCalById, barSplitMode, tTask, uiTheme, compressNonWorkdays, canvasFontFamily, fontScale]);

  const {
    primaryCanvasRef: canvasRef,
    primaryRendererRef: rendererRef,
    secondaryCanvasRef,
    secondaryRendererRef,
    histogramCanvasRef,
    histogramRendererRef,
    dependencyCanvasRef: depLineCanvasRef,
  } = useGanttRendererHost({
    containers: {
      primaryContainerRef: containerRef,
      secondaryContainerRef,
      histogramContainerRef,
    },
    primary: primaryRenderInput,
    secondary: secondaryRenderInput,
    histogram: histogramRenderInput,
    renderRevision: canvasThemeRevision,
    onPrimarySize: viewport.onPrimarySize,
    onSecondarySize: viewport.onSecondarySize,
  });

  const formatHistogramContributionLabel = useCallback(
    (count: number, isoDate: string) => tCommon('resource.histogram.overallocatedTooltip', {
      count,
      date: isoDate,
    }),
    [tCommon],
  );
  const histogramInteraction = useGanttHistogramInteraction({
    canvasRef: histogramCanvasRef,
    rendererRef: histogramRendererRef,
    assignments,
    resources,
    tasks,
    selectedResourceId: histogramResourceId,
    selectResource: setHistogramResource,
    formatContributionLabel: formatHistogramContributionLabel,
  });
  const clearHistogramTooltip = histogramInteraction.clearTooltip;

  const boxSelect = useBoxSelect({ canvasRef, rendererRef, selectTasks, deselectAll, justBoxSelectedRef });
  const tasksById = useMemo(() => new Map(tasks.map(t => [t.id, t])), [tasks]);
  const rowDrag = useRowDrag({
    canvasRef, rendererRef, rows: viewRows, tasksById, moveTaskTo, selectedTaskIds, moveTasksTo,
    justRowDraggedRef, headerHeight,
  });
  const depDraw = useDependencyDraw({
    canvasRef,
    containerRef,
    depLineCanvasRef,
    rendererRef,
    onRelationCreated: useCallback(
      (sequenceId: string, x: number, y: number) => setRelationPopover({ sequenceId, x, y }),
      [],
    ),
  });

  // Selectie-klik in het secundaire pane (bandkop → collapse-toggle, net als links).
  const handleSecondaryClick = useCallback((e: React.MouseEvent) => {
    const canvas = secondaryCanvasRef.current;
    const renderer = secondaryRendererRef.current;
    if (!canvas || !renderer) return;
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    if (y < headerHeight) return;
    const row = renderer.getRowAtY(y);
    if (row?.kind === 'group') {
      setCollapsedGroupKey(row.key, !row.collapsed);
      return;
    }
    if (row?.kind === 'task') selectTask(row.task.id, e.ctrlKey || e.metaKey, e.shiftKey);
    else deselectAll();
  }, [secondaryCanvasRef, secondaryRendererRef, selectTask, deselectAll, setCollapsedGroupKey, headerHeight]);

  const defaultTaskName = tTask('defaultTask');
  const defaultMilestoneName = tTask('defaultMilestone');

  // WENS 2 (reveal-on-select): klikt de gebruiker een taak in de linker takenlijst en valt zijn
  // balk qua TIJD volledig buiten het zichtbare venster, scroll dan horizontaal zodat hij in beeld
  // komt (kleine marge). Al (deels) zichtbaar → niets doen (geen sprong). Alléén horizontaal
  // scrollen; zoom onaangeroerd. Gebruikt exact dezelfde effectiveViewStart/dateToX-conventie als de
  // renderer (effectiveViewStart = vroegste start − ORIGIN_PADDING_DAYS; content-x = tableW +
  // dagen·zoom) zodat de positie 1-op-1 klopt. Alles vers uit de store → geen closure-deps.
  const revealTaskIfOffscreen = useCallback((task: Task) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const startStr = task.time.earlyStart || task.time.scheduleStart;
    const endStr = task.time.earlyFinish || task.time.scheduleFinish;
    if (!startStr || !endStr) return; // geen datums (bv. ongeplande taak): niets te onthullen.

    const st = useAppStore.getState();
    const v = st.view;
    const tableW = st.ui.leftPanelWidth;
    const rect = canvas.getBoundingClientRect();
    const usable = rect.width - tableW;
    if (usable <= 0) return;

    // De viewportcoördinator levert exact dezelfde effectieve oorsprong aan tekenen, histogram en
    // deze reveal-route; de shell rekent de oorsprongsformule niet opnieuw uit.
    const evs = parseDate(effectiveViewStart);

    // Balk-uiteinden in content-x (dateToX zonder de −scrollX-term, dus `scrollX=0`), zelfde
    // uur/dag-splitsing als GanttRenderer.barGeometry: uur-taak [start, finish), dag-taak
    // [start, finish+1 dag]. Gedeeld met GanttRenderer/HistogramRenderer via `timeAxis.dateToX`
    // (issue #21 punt 5, fase 0-consolidatie) — zelfde formule, geen gedragswijziging.
    const hourMode = startStr.includes('T') || endStr.includes('T');
    const start = hourMode ? parseInstant(startStr) : parseDate(startStr);
    const end = hourMode ? parseInstant(endStr) : parseDate(endStr);
    const cx1 = axisDateToX(start, evs, tableW, v.zoom, 0);
    const cx2 = axisDateToX(end, evs, tableW, v.zoom, 0) + (hourMode ? 0 : v.zoom);

    // Zichtbaar content-venster: canvas-x = content-x − scrollX ∈ [tableW, rect.width].
    const visibleLeft = tableW + v.scrollX;
    const visibleRight = visibleLeft + usable;
    if (cx2 > visibleLeft && cx1 < visibleRight) return; // al (deels) in beeld → geen sprong.

    // Lijn de START links uit met een kleine marge (dekt ook een balk breder dan het venster).
    const REVEAL_MARGIN_PX = 40;
    st.setScroll(Math.max(0, cx1 - tableW - REVEAL_MARGIN_PX), v.scrollY);
  }, [canvasRef, effectiveViewStart]);

  // Click handler with collapse/expand, '+' button support, and multi-selection
  const handleClick = useCallback((e: React.MouseEvent) => {
    // Fase 2.10 golf 4: een net voltooid (of met Escape geannuleerd) selectie-kader onderdrukt de
    // eerstvolgende click — anders overschrijft/deselecteert de gewone klik-afhandeling hieronder
    // meteen de zojuist gezette boxselectie (of doet iets onbedoelds na de Escape-annulering).
    if (justBoxSelectedRef.current) {
      justBoxSelectedRef.current = false;
      return;
    }
    // Issue #21 punt 1 (fase 2): zelfde onderdrukking na een voltooide (of Escape-geannuleerde)
    // rijsleep — anders zou de klik die op de mouseup volgt de zojuist verplaatste/geannuleerde
    // taak alsnog laten in/uitklappen of anders selecteren.
    if (justRowDraggedRef.current) {
      justRowDraggedRef.current = false;
      return;
    }
    clearHistogramTooltip();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const renderer = rendererRef.current;
    if (!renderer) return;

    if (y < headerHeight) return;

    // Bandkop-rij (§4.5): alleen collapse-toggle, geen taak-interactie.
    const hitRow = renderer.getRowAtY(y);
    if (hitRow?.kind === 'group') {
      setCollapsedGroupKey(hitRow.key, !hitRow.collapsed);
      return;
    }

    // Check collapse/expand toggle
    if (renderer.isInTaskTable(x)) {
      const collapseTask = renderer.isCollapseToggle(x, y);
      if (collapseTask) {
        toggleCollapse(collapseTask.id);
        return;
      }

      // Check '+' button (add child task)
      // Issue #49, bewuste uitzondering: dit '+'-knopje staat ÓP een specifieke samenvattingsrij en
      // betekent "voeg een kind toe aan DEZE taak". Het is dus rij-gestuurd, niet selectie-gestuurd
      // — de gebruiker wijst het doel letterlijk aan. Hem meelaten lopen met "onder de selectie"
      // (zoals de lintknop) zou de enige directe manier om een subtaak te maken slopen en het
      // knopje tot een duplicaat van "+ Taak" maken; dat is precies de klacht uit issue #48.
      // De positie binnen die ouder blijft achteraan: er is geen anker, dus ook geen boommodus-
      // poort nodig (zie `taskInsertActions.canInsertRelative`).
      const addTarget = renderer.isAddButton(x, y);
      if (addTarget) {
        addTask({
          name: defaultTaskName,
          parentId: addTarget.id,
        });
        return;
      }
    }

    // Normal task selection with multi-select support
    const task = renderer.getTaskAtY(y);
    if (task) {
      if (e.shiftKey) {
        // Shift+click: range selection
        selectTask(task.id, false, true);
      } else if (e.ctrlKey || e.metaKey) {
        // Ctrl+click: toggle individual task in selection
        selectTask(task.id, true, false);
      } else {
        // Plain click: single select (deselect others)
        selectTask(task.id, false, false);
        // WENS 2: onthul de balk als hij qua tijd buiten beeld ligt, maar ALLEEN als de klik in de
        // linker takenlijst viel (niet bij ctrl/shift-multiselect, en niet bij een klik in het
        // Gantt-gebied zelf — anders springt het beeld weg bij wegklikken/verslepen daar).
        if (renderer.isInTaskTable(x)) {
          revealTaskIfOffscreen(task);
        }
      }
    } else {
      deselectAll();
    }
  }, [canvasRef, rendererRef, selectTask, deselectAll, toggleCollapse, addTask, defaultTaskName, setCollapsedGroupKey, revealTaskIfOffscreen, clearHistogramTooltip, headerHeight]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;

    const renderer = rendererRef.current;
    if (!renderer) return;

    const task = renderer.getTaskAtY(y);
    if (task) {
      setUI({ showTaskDialog: true, editingTaskId: task.id });
    }
  }, [canvasRef, rendererRef, setUI]);

  // Right-click context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // Fase 2.10 fix-golf 2: een balk-hover-tooltip die nog zichtbaar is bij het rechtsklikken zou
    // anders over de bovenste menu-items blijven hangen (z-tooltip > z-50 van het menu). Wissen is
    // de primaire fix; de z-index-bump hieronder is het vangnet voor tooltips die via mousemove
    // ná het openen alsnog opnieuw gezet zouden worden (zie de guard in handleMouseMove).
    setTooltip(null);
    clearHistogramTooltip();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const renderer = rendererRef.current;
    if (!renderer) return;

    if (y < headerHeight) return;

    // Bandkop-rij (fase 2.10 golf 2): eigen, klein contextmenu — zelfde detectie als handleClick.
    const hitRow = renderer.getRowAtY(y);
    if (hitRow?.kind === 'group') {
      setContextMenu({
        x: e.clientX, y: e.clientY, task: null, barHit: false,
        group: { key: hitRow.key, collapsed: hitRow.collapsed },
      });
      return;
    }

    const task = renderer.getTaskAtY(y);
    if (task) {
      // issue #21 punt 3: rechtsklik op een taak die al in de selectie zit behoudt de
      // multiselectie (standaard-UX) — alleen resetten naar enkele selectie als hij er nog niet
      // in zat. Zo werkt rechtsklik op één van meerdere geselecteerde balken als groepsactie.
      if (!selectedTaskIds.includes(task.id)) {
        selectTask(task.id, false);
      }
    }
    // `barHit` poort in ContextMenu.tsx precies één menu-item: `context.startRelationHere`
    // ("Relatie leggen vanaf hier"). Dat is een relatie-actie, geen sleep/resize-actie — dus
    // hoort hij de relatie-hittest te gebruiken, niet `getTaskBarBounds` (die is geschreven voor
    // slepen/resizen en weigert mijlpalen daarom terecht: een ruit heeft geen duur om te
    // resizen). Vóór de mijlpaal-fix (2026-08-14) miste een rechtsklik op een mijlpaal het item,
    // terwijl slepen vanaf diezelfde mijlpaal via `getRelationSourceAt` al wél werkte (zie
    // GanttRenderer.ts). Sinds het eigenaarsbesluit van 2026-08-15 geldt hetzelfde voor
    // verzamelbalken: `getRelationSourceAt` armt ze nu ook als bron, dus dit item verschijnt daar
    // óók. `getRelationSourceAt` geeft nog steeds null op de rij ernaast en op een datumloze taak
    // (geen zinnige balk om vanaf te starten) — die krijgen dan gewoon het rij-menu zonder het
    // relatie-item, zoals bedoeld. De uiteindelijke legaliteit (o.a. de voorouder-weigering) wordt
    // pas bij het loslaten bepaald, niet hier.
    const barHit = !!task && !!renderer.getRelationSourceAt(x, y);
    setContextMenu({ x: e.clientX, y: e.clientY, task, barHit, group: null });
  }, [canvasRef, rendererRef, selectTask, selectedTaskIds, clearHistogramTooltip, headerHeight]);

  // Drag and drop: mousedown (task move/resize + dependency drawing)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Issue #52 punt 2: middelste muisknop ingedrukt = pannen, in élke scroll-modus en ongeacht
    // wat er onder de cursor ligt (balk, tabel of lege achtergrond). preventDefault onderdrukt
    // meteen de browser-autoscroll die sommige platforms op middelklik starten. Loopt er al een
    // ánder gebaar (balk-drag/resize, relatie tekenen, rij-drag, box-select of een pan), dan
    // start er níét een tweede eroverheen — anders pant elke mousemove het beeld terwijl de
    // balk-drag doorloopt en landt de taak op een onbedoelde datum.
    if (e.button === 1) {
      e.preventDefault();
      if (barDrag.active || depDraw.active || boxSelect.active || rowDrag.active || pan.active) return;
      const v = useAppStore.getState().view;
      pan.startPan({
        button: 1,
        startClientX: e.clientX,
        startClientY: e.clientY,
        originScrollX: v.scrollX,
        originScrollY: v.scrollY,
      });
      return;
    }
    if (e.button !== 0) return;
    // Spiegelbeeld van de guard hierboven: tijdens een lopende middelklik-pan mag een linksklik
    // geen balk-drag/box-select armen bovenop het schuivende beeld.
    if (pan.active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const renderer = rendererRef.current;
    if (!renderer) return;

    // Splitter tussen takentabel en chart: heeft voorrang op alle andere
    // interacties (ook in de header, zodat de hele lijn grijpbaar is).
    if (Math.abs(x - taskTableWidth) <= SPLITTER_GRAB_MARGIN) {
      e.preventDefault();
      tableSplitter.start();
      return;
    }

    if (y < headerHeight) return;

    // Shift+drag tekent een relatie — en sinds issue #40 doet de relatiemodus exact hetzelfde
    // zónder toets ("plakkende Shift"), zodat de lint-knop/het contextmenu-item een écht gebaar
    // armen in plaats van een dode vlag te zetten. Bewust hetzelfde pad: een tweede interactie zou
    // met box-select (ctrl) en de balk-sleep om dezelfde muis-events vechten.
    //
    // Eigen hittest (spec 2026-08-14): getTaskBarBounds weigert mijlpalen omdat een ruit geen duur
    // heeft om te resizen — voor een relatie is dat geen bezwaar en was het een bug.
    if (e.shiftKey || dependencyMode) {
      const source = renderer.getRelationSourceAt(x, y);
      if (source) {
        e.preventDefault();
        depDraw.startDepDraw({
          sourceTaskId: source.id,
          sourceX: e.clientX,
          sourceY: e.clientY,
          currentX: e.clientX,
          currentY: e.clientY,
        });
        return;
      }
    }

    const hit = renderer.getTaskBarBounds(x, y);
    if (hit) {
      // issue #21 punt 3: Ctrl/Cmd-klik op een balk is een selectiegebaar, geen drag/resize.
      // Vroeger liep mousedown hier altijd door naar barDrag + een harde single-reset
      // (selectTask(id, false)), waarna handleClick's toggle het id er weer uit haalde → bij
      // ctrl+klik netto deselectie. Nu armen we niets en laat handleClick de toggle doen; zonder
      // modifier is het gedrag identiek aan vroeger (select + drag armen).
      // NB: shift heeft hierboven een eigen pad (dependency-tekenen) en doet geen reset, dus
      // shift+klik-range-select werkte al — shift bewust niet in deze check opgenomen.
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      barDrag.startBarDrag({
        taskId: hit.task.id,
        edge: hit.edge,
        startX: e.clientX,
        originalStart: hit.task.time.earlyStart || hit.task.time.scheduleStart,
        originalFinish: hit.task.time.earlyFinish || hit.task.time.scheduleFinish,
        originalDuration: hit.task.time.scheduleDuration,
        originalDurationMinutes: hit.task.time.durationMinutes,
      });
      selectTask(hit.task.id, false);
      return;
    }

    // No bar hit, lege achtergrond. Takentabel: pant nooit. Issue #21 punt 1 (fase 2, gebaar C uit
    // ontwerp-B): een kale mousedown (geen ctrl/meta/shift) op een taakrij in de tabel — alléén in
    // pure boommodus, anders is de zichtbare volgorde niet de structuur — start nu een
    // rijsleep-kandidaat i.p.v. box-select. Onder de drempel valt de klik door naar handleClick
    // (selectie blijft werken); Shift/Ctrl-Cmd op een taakrij en elke mousedown op niet-taakrijen
    // (bandkoppen, lege ruimte) blijven ongewijzigd box-select-kandidaat (fase 2.10 golf 4). Chart:
    // in 'drag' scroll mode wint pannen (map-style, ongewijzigd gedrag) — BEHALVE met Ctrl/Cmd
    // ingedrukt, dan box-select (anders is box-select in deze modus onbereikbaar). In de overige
    // scroll-modi is lege chart-achtergrond sowieso box-select-kandidaat.
    if (renderer.isInTaskTable(x)) {
      e.preventDefault();
      const rowTask = renderer.getTaskAtY(y);
      if (
        rowTask &&
        isTreeMode(view) &&
        !e.ctrlKey && !e.metaKey && !e.shiftKey &&
        !contextMenu
      ) {
        rowDrag.startRowDrag({ taskId: rowTask.id, startClientX: e.clientX, startClientY: e.clientY });
        return;
      }
      boxSelect.startBoxSelect({ startClientX: e.clientX, startClientY: e.clientY });
      return;
    }

    if (scrollMode === 'drag' && !(e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const v = useAppStore.getState().view;
      pan.startPan({
        button: 0,
        startClientX: e.clientX,
        startClientY: e.clientY,
        originScrollX: v.scrollX,
        originScrollY: v.scrollY,
      });
      return;
    }

    e.preventDefault();
    boxSelect.startBoxSelect({ startClientX: e.clientX, startClientY: e.clientY });
  }, [canvasRef, rendererRef, selectTask, scrollMode, taskTableWidth, tableSplitter, depDraw, barDrag, boxSelect, pan, rowDrag, view, contextMenu, dependencyMode, headerHeight]);

  // Cursor changes on hover + tooltip
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Fase 2.10 fix-golf 2: terwijl het contextmenu open staat mag een mousemove de balk-tooltip
    // niet opnieuw zetten (anders duikt hij, ondanks het wissen bij het openen, alsnog weer op
    // over de menu-items zodra de muis binnen het canvas beweegt). De gebundelde `active`-vlaggen
    // (audit P20) vervangen de vroegere lange lijst losse drag-states — één per gebaar-hook.
    if (barDrag.active || depDraw.active || pan.active || boxSelect.active || rowDrag.active || contextMenu) {
      setTooltip(null);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const renderer = rendererRef.current;
    if (!renderer) return;

    // Splitter-affordance: col-resize-cursor rond de tabel/chart-grens.
    if (Math.abs(x - taskTableWidth) <= SPLITTER_GRAB_MARGIN) {
      setCursor('col-resize');
      setTooltip(null);
      return;
    }

    if (y < headerHeight) {
      setCursor('default');
      setTooltip(null);
      return;
    }

    // Check for task bar edges
    const hit = renderer.getTaskBarBounds(x, y);
    if (hit) {
      // Issue #40: shift OF de relatiemodus armt het relatie-tekenen — en dat wint in mousedown
      // óók op de randen (die branch staat vóór de resize-branch), dus toont de cursor hier
      // hetzelfde. Zo is de actieve modus zichtbaar zodra je boven een balk komt.
      if (e.shiftKey || dependencyMode) {
        setCursor('crosshair');
      } else if (hit.edge === 'left' || hit.edge === 'right') {
        setCursor('ew-resize');
      } else {
        setCursor('grab');
      }
      // Show tooltip for the hovered task
      setTooltip({ x: e.clientX, y: e.clientY, task: hit.task });
      return;
    }

    // Check if hovering task row in gantt area (not just bar)
    const hoveredTask = renderer.getTaskAtY(y);
    if (hoveredTask && x >= taskTableWidth) {
      setTooltip({ x: e.clientX, y: e.clientY, task: hoveredTask });
    } else {
      setTooltip(null);
    }

    // Check for collapse toggle or '+' button
    if (renderer.isInTaskTable(x)) {
      if (renderer.isCollapseToggle(x, y) || renderer.isAddButton(x, y)) {
        setCursor('pointer');
        setTooltip(null);
        return;
      }
    }

    // In 'drag' scroll mode, show a grab affordance over the pannable chart
    // background so panning is discoverable — maar met Ctrl/Cmd ingedrukt schakelt de
    // achtergrond naar box-select, dus toon dan het crosshair (zelfde signaal als elders).
    if (scrollMode === 'drag' && x >= taskTableWidth) {
      setCursor(e.ctrlKey || e.metaKey ? 'crosshair' : 'grab');
      return;
    }

    setCursor('default');
  }, [canvasRef, rendererRef, barDrag.active, depDraw.active, pan.active, boxSelect.active, rowDrag.active, contextMenu, scrollMode, taskTableWidth, dependencyMode, headerHeight]);

  // Hide tooltip on mouse leave
  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Pane-rij (§10). De scrollbalken zijn ZWEVENDE overlays binnen deze rij en binnen de panes
          zelf (issue #35): ze staan niet meer als eigen kolom/rij in de layout. Dat was geen
          cosmetiek — een echte 8px-goot/-rij snoept die 8px van de kaart af en laat onder de
          takenlijst een strook achter die daar niets te zoeken heeft (de user: "het onderliggende
          paneel moet daar gewoon in doorlopen"). Als overlay houdt het canvas de volle hoogte en
          breedte en loopt het paneel eronder door tot de rand.
          `dir="ltr"` op de pane-rij is FUNCTIONEEL: de renderer kent geen RTL (`isInTaskTable` is
          letterlijk `canvasX < taskTableWidth`), dus de taaktabel wordt in ar/fa óók links
          getekend. Liet je deze rij mirroren, dan wisselen primair en secundair pane visueel van
          plek terwijl de mini-map-strook hieronder wél LTR gepind is — die kwam dan onder het
          VERKEERDE pane te liggen (gemeten in ar). Dezelfde pin houdt bovendien de ratio-sleep
          kloppend, die `clientX - rect.left` tegen `paneRowRef` rekent en dus een niet-gespiegelde
          rij veronderstelt, én zet de overlay-balken hieronder aan de kant waar ze horen. */}
      <div ref={paneRowRef} className="flex-1 min-w-0 flex overflow-hidden relative" dir="ltr">
      <div
        ref={containerRef}
        className="overflow-hidden relative"
        style={{ width: splitView ? `${splitView.ratio * 100}%` : '100%', flexShrink: 0 }}
      >
        <canvas
          ref={canvasRef}
          data-testid="gantt-primary-canvas"
          className="absolute inset-0"
          style={{
            cursor: tableSplitter.isResizing
              ? 'col-resize'
              : pan.panState
                ? 'grabbing'
                : barDrag.dragState
                  ? (barDrag.dragState.edge === 'body' ? 'grabbing' : 'ew-resize')
                  : depDraw.active
                    ? 'crosshair'
                    : boxSelect.boxSelectState
                      ? 'crosshair'
                      : rowDrag.rowDragState
                        ? 'grabbing'
                        // Issue #40: staat de relatiemodus aan, dan is een balk-cursor altijd het
                        // crosshair — ook als de muis sinds het aanzetten niet bewogen heeft (de
                        // hover-handler hierboven vuurt dan immers niet).
                        : dependencyMode && (cursor === 'grab' || cursor === 'ew-resize')
                          ? 'crosshair'
                          : cursor,
          }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onContextMenu={handleContextMenu}
        />
        {/* Overlay canvas for dependency drag line */}
        <canvas
          ref={depLineCanvasRef}
          className="absolute inset-0"
          style={{ pointerEvents: 'none' }}
        />

        {/* Box-selection kader (fase 2.10 golf 4): half-transparant rechthoekje tijdens de sleep,
            in viewport-coördinaten — hoeft niet mee te scrollen (§spec), de rij-intersectie zelf
            wordt op het actuele moment berekend (getTaskIdsInYRange). */}
        {boxSelect.boxSelectState && (() => {
          const boxSelectState = boxSelect.boxSelectState;
          const containerRect = containerRef.current?.getBoundingClientRect();
          const left = (containerRect?.left ?? 0);
          const top = (containerRect?.top ?? 0);
          const x1 = Math.min(boxSelectState.startClientX, boxSelectState.currentClientX) - left;
          const y1 = Math.min(boxSelectState.startClientY, boxSelectState.currentClientY) - top;
          const w = Math.abs(boxSelectState.currentClientX - boxSelectState.startClientX);
          const h = Math.abs(boxSelectState.currentClientY - boxSelectState.startClientY);
          return (
            <div
              data-testid="box-select-rect"
              className="absolute"
              style={{
                left: x1,
                top: y1,
                width: w,
                height: h,
                border: '1px solid var(--theme-accent)',
                pointerEvents: 'none',
                zIndex: 5,
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'var(--theme-accent)', opacity: 0.15 }} />
            </div>
          );
        })()}

        {/* Issue #21 punt 1 (fase 2, NIET fase 3): minimale invoeg-indicator, hergebruikt exact het
            box-select-overlaypatroon hierboven — dit is bewust sober (geen autoscroll, geen
            "verborgen kind"-label, geen bron-rij-dimming; dat is allemaal fase 3). Alleen zichtbaar
            bij een geldig doel (`dropTarget !== null`); canvas vult de container exact (`inset-0`),
            dus canvas-relatieve Y = container-relatieve Y, geen client→container-omrekening nodig
            zoals bij het box-selectiekader. */}
        {rowDrag.rowDragState?.dropTarget && rowDrag.rowDragState.hoverRowIndex !== null && (() => {
          const { hoverRowIndex, hoverZone } = rowDrag.rowDragState;
          const rowTop = headerHeight + hoverRowIndex * rowHeight - view.scrollY;
          if (hoverZone === 'nest') {
            return (
              <div
                data-testid="row-drag-nest"
                className="absolute"
                style={{
                  left: 0, right: 0, top: rowTop, height: rowHeight,
                  border: '1px solid var(--theme-accent)',
                  pointerEvents: 'none',
                  zIndex: 6,
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'var(--theme-accent)', opacity: 0.15 }} />
              </div>
            );
          }
          const lineTop = hoverZone === 'after' ? rowTop + rowHeight : rowTop;
          return (
            <div
              data-testid="row-drag-line"
              className="absolute"
              style={{ left: 0, right: 0, top: lineTop - 1, height: 2, background: 'var(--theme-accent)', pointerEvents: 'none', zIndex: 6 }}
            />
          );
        })()}

        {/* Tooltip — issue #58: HoverTooltip houdt de doos binnen het venster. Issue #65: de
            content zit sinds de extractie in TaskTooltipContent, gedeeld met de WBS-sprongknop
            in het eigenschappenpaneel. */}
        {tooltip && (
          <HoverTooltip left={tooltip.x + 16} top={tooltip.y - 10}>
            <TaskTooltipContent task={tooltip.task} />
          </HoverTooltip>
        )}

        {/* Horizontale scrollbalk van het primaire pane (issue #22, sinds #35 een overlay). Hij
            zweeft ONDERIN dit pane in plaats van in een eigen rij eronder, zodat het canvas de
            volle hoogte houdt en de kaart tot de onderrand doorloopt.
            Hij begint pas bij `taskTableWidth`: de taaktabel schuift horizontaal niet mee, dus een
            balk daaronder was verwarrend (#22) — en dát is precies wat de losse rij weer opleverde.
            DE VALKUIL: de scrollrange moet exact gelijk zijn aan de klem in `setScroll`
            (`maxScrollX = totalContentWidth − canvasbreedte`, gezet in `drawPrimary`). Dat klopt
            hier omdat zowel de zichtbare breedte (`left: taskTableWidth; right: 0` ⇒ paneBreedte −
            taskTableWidth) als de spacer (`totalContentWidth − taskTableWidth`) met dezelfde
            `taskTableWidth` krimpen. Laat hem dus NIET vóór de verticale balk stoppen (`right: 8`):
            dan is hij 8px smaller dan het chartgebied en loopt de DOM-range 8px uit de pas met
            `maxScrollX`. De 8×8px hoekoverlap met de verticale balk is bewust geaccepteerd. */}
        <div
          ref={hScrollRef}
          data-testid="gantt-hscroll"
          className="gantt-overlay-scrollbar absolute overflow-x-auto overflow-y-hidden"
          style={{ left: taskTableWidth, right: 0, bottom: 0, height: SCROLLBAR_GUTTER, zIndex: 4 }}
          onScroll={viewport.scrollHandlers.onPrimaryHorizontalScroll}
        >
          <div style={{ width: Math.max(1, totalContentWidth - taskTableWidth), height: 1 }} />
        </div>
      </div>
      {/* Secundair pane (§10): eigen tijdvenster, gedeelde rijen + verticale scroll */}
      {splitView && (
        <>
          <div
            data-testid="split-ratio-bar"
            onMouseDown={e => { e.preventDefault(); viewport.splitters.ratio.start(); }}
            style={{ width: SPLIT_RATIO_BAR_WIDTH, flexShrink: 0, cursor: 'col-resize', background: 'var(--theme-border)' }}
          />
          <div
            ref={secondaryContainerRef}
            data-testid="split-secondary-pane"
            className="flex-1 overflow-hidden relative"
          >
            <canvas
              ref={secondaryCanvasRef}
              data-testid="gantt-secondary-canvas"
              className="absolute inset-0"
              onClick={handleSecondaryClick}
            />
            {/* Eigen zwevende horizontale balk (issue #35 punt 1): dit pane heeft een EIGEN
                tijdvenster (`secondaryScrollX`/`secondaryZoom`) en geen taaktabel — drawSecondary
                tekent met `taskTableWidth: 0`, dus `left: 0` en de spacer is de volle
                `secondaryContentWidth`. Zichtbare breedte == canvasbreedte, dus de DOM-range is
                per constructie `secondaryContentWidth − canvasbreedte`. */}
            <div
              ref={hScrollSecondaryRef}
              data-testid="gantt-hscroll-secondary"
              className="gantt-overlay-scrollbar absolute overflow-x-auto overflow-y-hidden"
              style={{ left: 0, right: 0, bottom: 0, height: SCROLLBAR_GUTTER, zIndex: 4 }}
              onScroll={viewport.scrollHandlers.onSecondaryHorizontalScroll}
            >
              <div style={{ width: Math.max(1, secondaryContentWidth), height: 1 }} />
            </div>
          </div>
        </>
      )}
      {/* Verticale scrollbalk (issue #35 punt 2): snelle rij-navigatie voor grote WBS-structuren,
          waar alleen het muiswiel te traag was. Eén balk voor BEIDE panes — `view.scrollY` is
          gedeeld (drawSecondary hergebruikt hem) — dus hij zweeft rechts in de pane-RIJ, niet in
          één pane.
          De scrollrange moet EXACT gelijk zijn aan de klem in `setScroll`
          (`maxScrollY = rijen·ROW_HEIGHT − (paneHoogte − HEADER_HEIGHT)`), anders loopt de balk vóór
          of achter op het canvas. Daarom begint hij op `top: HEADER_HEIGHT` en loopt tot
          `bottom: 0`: dan is hij precies zo hoog als het rijen-gebied (paneHoogte − HEADER_HEIGHT)
          terwijl de spacer de volledige contenthoogte (rijen·ROW_HEIGHT) is — hetzelfde trucje als
          de `left: taskTableWidth` van de horizontale balk. Vroeger deed een leeg blokje van
          HEADER_HEIGHT dat werk in een echte goot-kolom; die kolom sneed 8px van de kaart af en is
          nu een overlay. */}
      <div
        ref={vScrollRef}
        data-testid="gantt-vscroll"
        className="gantt-overlay-scrollbar absolute overflow-y-auto overflow-x-hidden"
        style={{ right: 0, top: headerHeight, bottom: 0, width: SCROLLBAR_GUTTER, zIndex: 5 }}
        onScroll={viewport.scrollHandlers.onSharedVerticalScroll}
      >
        <div style={{ height: Math.max(1, viewRows.length * rowHeight), width: 1 }} />
      </div>
      </div>
      {/* Histogramstrook (fase 2.5, §6.4) — derde canvas met gedeelde X-as. Loopt over de volle
          breedte, net als de pane-rij hierboven: sinds de scrollbalken overlays zijn, is er geen
          goot meer om onder te blijven en dus ook geen opvulblokje meer nodig. */}
      {showHistogram && (
        <>
          <div
            className="histogram-splitter"
            onMouseDown={e => { e.preventDefault(); histogramSplitter.start(); }}
            style={{ height: 5, flexShrink: 0, cursor: 'row-resize', background: 'var(--theme-border)' }}
          />
          <div
            ref={histogramContainerRef}
            className="relative overflow-hidden"
            style={{ height: histogramHeight, flexShrink: 0 }}
            data-tour-anchor="histogram-strip"
          >
            <canvas
              ref={histogramCanvasRef}
              data-testid="gantt-histogram-canvas"
              className="absolute inset-0"
              style={{ cursor: 'pointer' }}
              onClick={histogramInteraction.onClick}
            />
            {/* Verouderd-hint (A6): het histogram volgt de belasting direct, maar de CPM-datums
                eronder kunnen na een datum-mutatie verouderd zijn — subtiel melden. */}
            {scheduleStale && (
              <div
                className="absolute top-1 right-2 text-[10px] px-1.5 py-0.5 rounded pointer-events-none"
                style={{ background: 'var(--theme-surface)', color: 'var(--theme-warning-text)', opacity: 0.9 }}
              >
                ⚠ {tCommon('resource.histogram.staleHint')}
              </div>
            )}
            {histogramInteraction.tooltip && (
              <HoverTooltip left={histogramInteraction.tooltip.x + 14} top={histogramInteraction.tooltip.y - 10}>
                {/* Issue #58 geldt hier net zo goed: dit zijn resourcenamen, tot 9 regels. */}
                {histogramInteraction.tooltip.lines.map((l, i) => (
                  <div key={i} className={i === 0 ? 'tooltip-title' : 'tooltip-row'}>{l}</div>
                ))}
              </HoverTooltip>
            )}
          </div>
        </>
      )}

      {/* Mini-map (fase 2.7, §11): thumbnail van de hele projectperiode + viewport-kader.
          Issue #35 punt 1: bij split view krijgt ELK pane een eigen strook — de tweede bestuurt
          `splitView.secondaryScrollX`/`secondaryZoom` i.p.v. de gedeelde `view`. De breedte-
          expressies (ratio-% + dezelfde 5px tussenruimte als de ratio-balk) zijn letterlijk die van
          de pane-rij, zodat elke strook onder zijn eigen pane ligt. Zonder split view: één strook
          over de volle breedte, exact zoals voorheen.
          `dir="ltr"` pint de rij net als de pane-rij: de panes zelf spiegelen niet mee met de
          leesrichting, dus deze stroken mogen dat ook niet — anders liggen ze in ar/fa onder het
          verkeerde pane. Er is geen opvulblokje meer nodig: de verticale scrollbalk is een overlay
          en neemt geen kolombreedte meer in. */}
      {showMiniMap && (
        <div className="flex" dir="ltr" style={{ flexShrink: 0 }}>
          <div style={{ width: splitView ? `${splitView.ratio * 100}%` : '100%', flexShrink: 0 }}>
            <MiniMap
              originDate={effectiveViewStart}
              chartWidth={primaryChartWidth}
              scrollX={viewport.primary.scrollX}
              zoom={viewport.primary.zoom}
              onScrollXChange={viewport.minimap.primaryScrollTo}
            />
          </div>
          {splitView && (
            <>
              <div style={{ width: SPLIT_RATIO_BAR_WIDTH, flexShrink: 0 }} />
              <div className="flex-1 min-w-0">
                <MiniMap
                  originDate={effectiveViewStart}
                  chartWidth={secondaryChartWidth}
                  scrollX={splitView.secondaryScrollX}
                  zoom={splitView.secondaryZoom}
                  onScrollXChange={viewport.minimap.secondaryScrollTo}
                  testId="minimap-secondary"
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          task={contextMenu.task}
          barHit={contextMenu.barHit}
          group={contextMenu.group}
          traceActive={traceMode !== 'off'}
          isTreeMode={isTreeMode(view)}
          calendars={calendars}
          canPaste={!!taskClipboard}
          onClose={() => setContextMenu(null)}
          onEdit={() => {
            if (contextMenu.task) setUI({ showTaskDialog: true, editingTaskId: contextMenu.task.id });
          }}
          onAddSubtask={() => {
            const parentId = contextMenu.task?.id || null;
            addTask({
              name: defaultTaskName,
              parentId,
            });
          }}
          onAddMilestone={() => {
            addTask({
              name: defaultMilestoneName,
              isMilestone: true,
              taskType: 'ATTENDANCE',
              parentId: contextMenu.task?.id || null,
            });
          }}
          onAddRelation={() => {
            // Issue #40: zette vroeger dezelfde dode vlag als de lint-knop (plus een nooit gelezen
            // `dependencySourceId`) en was dus óók een no-op. Nu armt het de echte relatiemodus.
            // De aangeklikte taak wordt geselecteerd zodat zichtbaar is vanaf welke balk je sleept.
            if (contextMenu.task) {
              selectTask(contextMenu.task.id, false);
              setUI({ showDependencyMode: true });
            }
          }}
          onSaveTemplate={() => {
            if (!contextMenu.task) return;
            const st = useAppStore.getState();
            const tpl = saveBranchAsWbsTemplate(contextMenu.task.name, contextMenu.task.id, st.tasks, st.sequences);
            // Bevinding K8: lokale toast-state is opgeheven; de sjabloonmelding gaat door het
            // gecentraliseerde kanaal (zichtbaar óók buiten de Gantt).
            st.notify({
              severity: 'info',
              messageKey: 'notifications.templateSaved',
              params: { name: tpl.name },
            });
          }}
          onTracePath={() => {
            if (traceMode !== 'off') {
              setUI({ traceMode: 'off' });
            } else if (contextMenu.task) {
              selectTask(contextMenu.task.id);
              setUI({ traceMode: 'both' });
            }
          }}
          onCollapse={() => {
            if (contextMenu.task) collapseTasks(contextMenuOutlineScope(contextMenu.task.id));
          }}
          onExpand={() => {
            if (contextMenu.task) expandTasks(contextMenuOutlineScope(contextMenu.task.id));
          }}
          onDelete={() => {
            if (contextMenu.task) contextMenuBulk.remove(contextMenu.task.id);
          }}
          onAddTask={() => {
            contextMenuBulk.addNearSelection(defaultTaskName);
          }}
          onInsertAbove={() => {
            if (contextMenu.task) contextMenuBulk.insert(contextMenu.task.id, 'above', defaultTaskName);
          }}
          onInsertBelow={() => {
            if (contextMenu.task) contextMenuBulk.insert(contextMenu.task.id, 'below', defaultTaskName);
          }}
          onIndent={() => { if (contextMenu.task) contextMenuBulk.indent(contextMenu.task.id); }}
          onOutdent={() => { if (contextMenu.task) contextMenuBulk.outdent(contextMenu.task.id); }}
          onToggleMilestone={() => {
            if (contextMenu.task) contextMenuBulk.toggleMilestone(contextMenu.task);
          }}
          onSetCalendar={(calendarId) => {
            if (contextMenu.task) contextMenuBulk.setCalendar(contextMenu.task.id, calendarId);
          }}
          onSetProgress={(completion) => {
            if (contextMenu.task) contextMenuBulk.setProgress(contextMenu.task.id, completion);
          }}
          onSetPriority={(priority) => {
            if (contextMenu.task) contextMenuBulk.setPriority(contextMenu.task.id, priority);
          }}
          onStartRelationFromBar={() => {
            // Zelfde route als `onAddRelation` (balk-contextmenu i.p.v. rij-contextmenu).
            if (contextMenu.task) {
              selectTask(contextMenu.task.id, false);
              setUI({ showDependencyMode: true });
            }
          }}
          onPaste={() => { pasteTasks(); }}
          onZoomReset={viewport.resetZoom}
          onFitToProject={viewport.fitToProject}
          onToggleGroupCollapse={() => {
            if (contextMenu.group) setCollapsedGroupKey(contextMenu.group.key, !contextMenu.group.collapsed);
          }}
          onExpandAll={() => expandAllGroups()}
          onCollapseAll={() => collapseAllGroups()}
        />
      )}

      {relationPopover && (
        <RelationTypePopover
          sequenceId={relationPopover.sequenceId}
          x={relationPopover.x}
          y={relationPopover.y}
          onClose={() => setRelationPopover(null)}
        />
      )}
    </div>
  );
}
