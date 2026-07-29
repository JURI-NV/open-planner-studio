import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Plus, Link, Play, Undo2, Redo2, ZoomIn, ZoomOut,
  FileText, FolderOpen, Save, Printer, Trash2,
  Calendar, Settings, Info, Clock,
  ArrowRightLeft, Eye, EyeOff, SaveAll,
  Tags, ListOrdered, Hash,
  IndentIncrease, IndentDecrease,
  Users, BarChart3, Scale, Eraser, ChevronLeft, ChevronRight,
  ArrowLeftToLine, ArrowRightToLine, LayoutGrid, TrendingUp, CalendarDays,
  Keyboard, Pin, PinOff,
  CalendarClock, ChevronsDownUp, ChevronsUpDown,
} from 'lucide-react';
import { useAppStore } from '@/state/appStore';
import { createRelationWithFeedback } from '@/state/relationActions';
import { isTreeMode } from '@/engine/view/visibleRows';
import {
  saveShowHistogram, saveShowBaselineOverlay, saveShowProgressLine, saveShowStatusDateLine,
} from '@/utils/settingsStore';
import type { RibbonTab } from '@/state/slices/types';
import {
  BaselinesProgressGroupContent, MilestoneDropdown, TemplatesDropdown, RecentFilesDropdown,
  ExportDropdown, ResourceAssignDropdown, LayoutGroupContent, PresentationGroupContent,
  TimeScaleGroupContent, DisplayGroupContent, OverallocationIndicator, IfcInfo,
} from './ribbonWidgets';
import { AiServerGroup } from '@/components/ribbon/ai/AiServerGroup';
import { AiConnectionGroup } from '@/components/ribbon/ai/AiConnectionGroup';
import { AiSafetyGroup } from '@/components/ribbon/ai/AiSafetyGroup';
import { AiActivityGroup } from '@/components/ribbon/ai/AiActivityGroup';

/**
 * Declaratieve ribbon-config-registry (audit P18). Naar het model van ExtensionRibbonGroups:
 * elke tab is data (groepen → items) i.p.v. ~350 regels inline-JSX in één god-functie. Het
 * generieke render-pad staat in RibbonTabContent.tsx.
 *
 * Drie item-soorten dekken de herhaalde structuur (knop, knop-stapel), plus een
 * component-escape-hatch voor de écht complexe widgets (popovers, inputs, speciale panelen —
 * zie ribbonWidgets.tsx). Criterium voor de escape-hatch: eigen React-state, een popover, of
 * een niet-triviale layout die niet uit een knop-lijst volgt. De winst zit in de vele
 * herhaalde knoppen/groepen en de gedeelde definities (Bereken/Taak/Relatie/Trace/…), niet in
 * het in data persen van iedere widget.
 *
 * Vertaling: labels zijn i18n-SLEUTELS met namespace-prefix ('menu:ribbon.calculate'); de
 * vertaling gebeurt pas bij render. Dynamische props (onClick/active/disabled/icon/title) komen
 * uit een per-item `use`-hook die zélf zijn store-selectors ophaalt — zo loopt geen enkele
 * tab-wissel of knop-mutatie meer door één reuzenselector.
 */

/** Vertaal-sleutel met namespace-prefix. */
export type NsKey = `${'menu' | 'common' | 'task' | 'report'}:${string}`;

/** Dynamische, uit de store afgeleide props voor een knop-item. */
export interface RibbonButtonBinding {
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  /** Tooltip (kleine én grote knoppen). */
  title?: string;
  /** Icoon-override voor knoppen die van staat wisselen (bv. Pin/PinOff, Eye/EyeOff). */
  icon?: ReactNode;
}

export interface RibbonButtonSpec {
  kind: 'button' | 'small';
  id: string;
  icon: ReactNode;
  labelKey: NsKey;
  primary?: boolean;
  danger?: boolean;
  /** Hook: leest eigen store-state/acties en levert de dynamische props (optioneel = statisch). */
  use?: () => RibbonButtonBinding;
}

export interface RibbonStackSpec {
  kind: 'stack';
  id: string;
  /** Kleine knoppen, of een component-escape-hatch die zelf een `ribbon-btn small` rendert. */
  items: (RibbonButtonSpec | RibbonComponentSpec)[];
}

export interface RibbonComponentSpec {
  kind: 'component';
  id: string;
  Component: React.ComponentType;
}

export type RibbonItemSpec = RibbonButtonSpec | RibbonStackSpec | RibbonComponentSpec;

export interface RibbonGroupSpec {
  id: string;
  labelKey: NsKey;
  items: RibbonItemSpec[];
}

export type RibbonTabConfig = RibbonGroupSpec[];

// ── Gedeelde item-definities (dedup: één bron i.p.v. 4-5 kopieën) ────────────────────────────

/** Bereken/CPM-knop — voorheen 4× letterlijk gekopieerd (start/planning/relations/table). */
const calcButton: RibbonButtonSpec = {
  kind: 'button', id: 'calc', icon: <Play size={20} />, labelKey: 'menu:ribbon.calculate', primary: true,
  use: () => {
    const runCPM = useAppStore(s => s.runCPM);
    return { onClick: () => runCPM() };
  },
};

/** Taak-toevoegen-knop (start + table). */
const addTaskButton: RibbonButtonSpec = {
  kind: 'button', id: 'addTask', icon: <Plus size={20} />, labelKey: 'menu:ribbon.task',
  use: () => {
    const addTask = useAppStore(s => s.addTask);
    const { t } = useTranslation('task');
    return {
      onClick: () => addTask({ name: t('defaultTask') }),
    };
  },
};

/** Relatie-modus-knop (start/planning/relations). */
const relationButton: RibbonButtonSpec = {
  kind: 'button', id: 'relation', icon: <Link size={20} />, labelKey: 'menu:ribbon.relation',
  use: () => {
    const setUI = useAppStore(s => s.setUI);
    const active = useAppStore(s => s.ui.showDependencyMode);
    const selectedTaskIds = useAppStore(s => s.selectedTaskIds);
    const { t } = useTranslation('menu');
    // issue #40: de knop doet twee dingen afhankelijk van de selectie. Dat verraste (de melder zag
    // "geen enkele actie"), dus de tooltip zegt vooraf wélke van de twee er nu gebeurt.
    const pairMode = selectedTaskIds.length === 2;
    return {
      active,
      title: pairMode
        ? t('ribbon.relationHintPair')
        : active ? t('ribbon.relationHintModeOff') : t('ribbon.relationHintModeOn'),
      onClick: () => {
        // issue #21 punt 4: bij precies 2 geselecteerde taken direct een Finish-Start-relatie
        // aanleggen (voorganger = eerst aangeklikt), via hetzelfde pad als
        // RelationsPanel.addFromSelection — zelfde actie, defaults (FS, lag 0) en duplicaat-guard.
        // Issue #40: nu via de gedeelde wrapper, zodat succes én een geweigerd duplicaat een
        // zichtbare melding geven in plaats van stil te blijven.
        // In alle andere gevallen (0/1/>2 geselecteerd) de relatiemodus togglen — die stuurt sinds
        // issue #40 écht gedrag aan (zie `ui.showDependencyMode`).
        if (pairMode) {
          createRelationWithFeedback(selectedTaskIds[0], selectedTaskIds[1]);
          return;
        }
        setUI({ showDependencyMode: !active });
      },
    };
  },
};

/** Kalender-knop (planning + instellingen). */
const calendarButton: RibbonButtonSpec = {
  kind: 'button', id: 'calendar', icon: <Calendar size={20} />, labelKey: 'menu:ribbon.calendar',
  use: () => {
    const setUI = useAppStore(s => s.setUI);
    return { onClick: () => setUI({ showCalendarDialog: true }) };
  },
};

/** Afdrukvoorbeeld-knop (beeld + report) — opent de Rapport-tab. */
const printPreviewButton: RibbonButtonSpec = {
  kind: 'button', id: 'printPreview', icon: <Printer size={20} />, labelKey: 'menu:ribbon.printPreview',
  use: () => {
    const setUI = useAppStore(s => s.setUI);
    return { onClick: () => setUI({ activeRibbonTab: 'report' }) };
  },
};

/** Trace-groep (Task Path): predecessors/successors-toggle, gedeeld door planning + relations. */
const traceGroup: RibbonGroupSpec = {
  id: 'trace', labelKey: 'menu:ribbon.trace',
  items: [
    {
      kind: 'button', id: 'tracePred', icon: <ArrowLeftToLine size={20} />, labelKey: 'menu:ribbon.tracePredecessors',
      use: () => {
        const traceMode = useAppStore(s => s.ui.traceMode);
        const setUI = useAppStore(s => s.setUI);
        return {
          active: traceMode === 'predecessors' || traceMode === 'both',
          onClick: () => setUI({
            traceMode:
              traceMode === 'off' ? 'predecessors'
              : traceMode === 'predecessors' ? 'off'
              : traceMode === 'successors' ? 'both'
              : 'successors',
          }),
        };
      },
    },
    {
      kind: 'button', id: 'traceSucc', icon: <ArrowRightToLine size={20} />, labelKey: 'menu:ribbon.traceSuccessors',
      use: () => {
        const traceMode = useAppStore(s => s.ui.traceMode);
        const setUI = useAppStore(s => s.setUI);
        return {
          active: traceMode === 'successors' || traceMode === 'both',
          onClick: () => setUI({
            traceMode:
              traceMode === 'off' ? 'successors'
              : traceMode === 'successors' ? 'off'
              : traceMode === 'predecessors' ? 'both'
              : 'predecessors',
          }),
        };
      },
    },
  ],
};

// ── Per-tab configuratie ─────────────────────────────────────────────────────────────────────

const startTab: RibbonTabConfig = [
  {
    id: 'file', labelKey: 'menu:ribbon.file',
    items: [
      {
        kind: 'stack', id: 'fileStack1', items: [
          {
            kind: 'small', id: 'new', icon: <FileText size={14} />, labelKey: 'menu:ribbon.new',
            use: () => { const setUI = useAppStore(s => s.setUI); return { onClick: () => setUI({ showNewProjectDialog: true }) }; },
          },
          {
            kind: 'small', id: 'save', icon: <Save size={14} />, labelKey: 'menu:ribbon.save',
            use: () => { const saveFile = useAppStore(s => s.saveFile); return { onClick: () => { void saveFile(); } }; },
          },
          {
            kind: 'small', id: 'open', icon: <FolderOpen size={14} />, labelKey: 'menu:ribbon.open',
            use: () => {
              const openFile = useAppStore(s => s.openFile);
              const { t: tCommon } = useTranslation('common');
              return { onClick: () => { void openFile({ importedProject: tCommon('project.imported') }); } };
            },
          },
        ],
      },
      {
        // Save As + Recent + Export horen sámen in één verticale kolom (reviewbevinding pakket P:
        // los geplaatst renderden ze horizontaal en werd de groep ~2× zo breed).
        kind: 'stack', id: 'fileStack2', items: [
          {
            kind: 'small', id: 'saveAs', icon: <SaveAll size={14} />, labelKey: 'menu:backstage.saveAs',
            use: () => { const saveFileAs = useAppStore(s => s.saveFileAs); return { onClick: () => { void saveFileAs(); } }; },
          },
          { kind: 'component', id: 'recentFiles', Component: RecentFilesDropdown },
          { kind: 'component', id: 'export', Component: ExportDropdown },
        ],
      },
    ],
  },
  {
    id: 'edit', labelKey: 'menu:ribbon.edit',
    items: [
      {
        kind: 'stack', id: 'editStack', items: [
          {
            kind: 'small', id: 'undo', icon: <Undo2 size={14} />, labelKey: 'menu:ribbon.undo',
            use: () => {
              const undo = useAppStore(s => s.undo);
              const disabled = useAppStore(s => s.undoStack.length === 0);
              return { onClick: () => undo(), disabled };
            },
          },
          {
            kind: 'small', id: 'redo', icon: <Redo2 size={14} />, labelKey: 'menu:ribbon.redo',
            use: () => {
              const redo = useAppStore(s => s.redo);
              const disabled = useAppStore(s => s.redoStack.length === 0);
              return { onClick: () => redo(), disabled };
            },
          },
          {
            kind: 'small', id: 'delete', icon: <Trash2 size={14} />, labelKey: 'menu:ribbon.delete', danger: true,
            use: () => {
              const deleteTask = useAppStore(s => s.deleteTask);
              const selectedTaskIds = useAppStore(s => s.selectedTaskIds);
              return {
                onClick: () => { for (const id of selectedTaskIds) deleteTask(id); },
                disabled: selectedTaskIds.length === 0,
              };
            },
          },
        ],
      },
    ],
  },
  {
    id: 'tasks', labelKey: 'menu:ribbon.tasks',
    items: [
      addTaskButton,
      { kind: 'component', id: 'milestone', Component: MilestoneDropdown },
      relationButton,
    ],
  },
  { id: 'schedule', labelKey: 'menu:ribbon.schedule', items: [calcButton] },
  {
    id: 'zoom', labelKey: 'menu:ribbon.zoom',
    items: [
      {
        kind: 'stack', id: 'zoomStack', items: [
          {
            kind: 'small', id: 'zoomIn', icon: <ZoomIn size={14} />, labelKey: 'menu:ribbon.zoomIn',
            use: () => { const setZoom = useAppStore(s => s.setZoom); const zoom = useAppStore(s => s.view.zoom); return { onClick: () => setZoom(zoom + 10) }; },
          },
          {
            kind: 'small', id: 'zoomOut', icon: <ZoomOut size={14} />, labelKey: 'menu:ribbon.zoomOut',
            use: () => { const setZoom = useAppStore(s => s.setZoom); const zoom = useAppStore(s => s.view.zoom); return { onClick: () => setZoom(zoom - 5) }; },
          },
        ],
      },
    ],
  },
];

/** "Project verplaatsen…" (pakket D1) — schema-BREDE operatie, dus in de `schedule`-groep naast
 *  Bereken; geen structuur-, kalender- of baseline-actie. Uitgeschakeld zonder projectstartdatum
 *  (die is het referentiepunt van de verschuiving, R9). */
const moveProjectButton: RibbonButtonSpec = {
  kind: 'button', id: 'moveProject', icon: <CalendarClock size={20} />, labelKey: 'menu:ribbon.moveProject',
  use: () => {
    const setUI = useAppStore(s => s.setUI);
    const hasStart = useAppStore(s => !!s.project.startDate);
    return { onClick: () => setUI({ showMoveProjectDialog: true }), disabled: !hasStart };
  },
};

const planningTab: RibbonTabConfig = [
  { id: 'schedule', labelKey: 'menu:ribbon.schedule', items: [calcButton, moveProjectButton] },
  {
    id: 'relations', labelKey: 'menu:ribbon.relations',
    items: [
      relationButton,
      {
        kind: 'button', id: 'manage', icon: <ArrowRightLeft size={20} />, labelKey: 'menu:ribbon.manage',
        use: () => { const setUI = useAppStore(s => s.setUI); return { onClick: () => setUI({ activeRibbonTab: 'relations' }) }; },
      },
    ],
  },
  traceGroup,
  {
    id: 'calendar', labelKey: 'menu:ribbon.calendar',
    items: [
      calendarButton,
      {
        kind: 'button', id: 'holidays', icon: <Clock size={20} />, labelKey: 'menu:ribbon.holidays',
        use: () => { const setUI = useAppStore(s => s.setUI); return { onClick: () => setUI({ showCalendarDialog: true }) }; },
      },
    ],
  },
  {
    id: 'structure', labelKey: 'menu:ribbon.structure',
    items: [
      {
        kind: 'button', id: 'codesFields', icon: <Tags size={20} />, labelKey: 'menu:ribbon.codesFields',
        use: () => { const setUI = useAppStore(s => s.setUI); return { onClick: () => setUI({ showStructureDialog: true }) }; },
      },
      {
        kind: 'stack', id: 'structureStack1', items: [
          {
            kind: 'small', id: 'wbsAuto', icon: <Hash size={14} />, labelKey: 'menu:ribbon.wbsAuto',
            use: () => {
              const wbsAutoNumber = useAppStore(s => !!s.project.wbsAutoNumber);
              const setWbsAutoNumber = useAppStore(s => s.setWbsAutoNumber);
              return { onClick: () => setWbsAutoNumber(!wbsAutoNumber), active: wbsAutoNumber };
            },
          },
          {
            kind: 'small', id: 'renumberWbs', icon: <ListOrdered size={14} />, labelKey: 'menu:ribbon.renumberWbs',
            use: () => {
              const renumberWbs = useAppStore(s => s.renumberWbs);
              const wbsAutoNumber = useAppStore(s => !!s.project.wbsAutoNumber);
              return { onClick: () => renumberWbs(), disabled: wbsAutoNumber };
            },
          },
          { kind: 'component', id: 'templates', Component: TemplatesDropdown },
        ],
      },
      {
        kind: 'stack', id: 'structureStack2', items: [
          {
            kind: 'small', id: 'indent', icon: <IndentIncrease size={14} />, labelKey: 'menu:ribbon.indent',
            use: () => {
              const view = useAppStore(s => s.view);
              const selectedTaskIds = useAppStore(s => s.selectedTaskIds);
              const indentTasks = useAppStore(s => s.indentTasks);
              const { t: tCommon } = useTranslation('common');
              const treeMode = isTreeMode(view);
              return {
                onClick: () => indentTasks(selectedTaskIds),
                disabled: selectedTaskIds.length === 0 || !treeMode,
                title: !treeMode ? tCommon('view.structureLockedHint') : undefined,
              };
            },
          },
          {
            kind: 'small', id: 'outdent', icon: <IndentDecrease size={14} />, labelKey: 'menu:ribbon.outdent',
            use: () => {
              const view = useAppStore(s => s.view);
              const selectedTaskIds = useAppStore(s => s.selectedTaskIds);
              const outdentTasks = useAppStore(s => s.outdentTasks);
              const { t: tCommon } = useTranslation('common');
              const treeMode = isTreeMode(view);
              return {
                onClick: () => outdentTasks(selectedTaskIds),
                disabled: selectedTaskIds.length === 0 || !treeMode,
                title: !treeMode ? tCommon('view.structureLockedHint') : undefined,
              };
            },
          },
        ],
      },
    ],
  },
  {
    id: 'baselines', labelKey: 'menu:ribbon.baselines',
    items: [{ kind: 'component', id: 'baselinesProgress', Component: BaselinesProgressGroupContent }],
  },
];

/**
 * Gedeelde item-specs (issue #46c): "Vastzetten" en "Histogram" staan zowel op de Resources-tab als
 * onder Beeld → Panelen. Bewust GEDUPLICEERD (niet verplaatst) — de melder vroeg er expliciet om ze
 * ook onder Beeld te zien, zonder ze bij Resources weg te halen. Eén definitie, twee callsites, in
 * lijn met `calcButton`/`relationButton`/`calendarButton`/`printPreviewButton` hierboven.
 */
const dockResourcePanelButton: RibbonButtonSpec = {
  kind: 'button', id: 'dockResourcePanel', icon: <Pin size={20} />, labelKey: 'menu:ribbon.dockResourcePanel',
  use: () => {
    const setUI = useAppStore(s => s.setUI);
    const showResourcePanel = useAppStore(s => s.ui.showResourcePanel);
    const resourcePanelDocked = useAppStore(s => s.ui.resourcePanelDocked);
    const onClick = () => {
      if (showResourcePanel && resourcePanelDocked) {
        setUI({ showResourcePanel: false, resourcePanelDocked: false });
      } else {
        setUI({ showResourcePanel: true, resourcePanelDocked: true });
      }
    };
    return {
      icon: resourcePanelDocked ? <PinOff size={20} /> : <Pin size={20} />,
      onClick,
      active: showResourcePanel && resourcePanelDocked,
    };
  },
};

const toggleHistogramButton: RibbonButtonSpec = {
  kind: 'button', id: 'toggleHistogram', icon: <BarChart3 size={20} />, labelKey: 'menu:ribbon.toggleHistogram',
  use: () => {
    const showHistogram = useAppStore(s => s.ui.showHistogram);
    const setUI = useAppStore(s => s.setUI);
    return {
      active: showHistogram,
      onClick: () => { const next = !showHistogram; setUI({ showHistogram: next }); void saveShowHistogram(next); },
    };
  },
};

const resourcesTab: RibbonTabConfig = [
  {
    id: 'resourceManagement', labelKey: 'menu:ribbon.resourceManagement',
    items: [
      {
        kind: 'button', id: 'openResourcePanel', icon: <Users size={20} />, labelKey: 'menu:ribbon.openResourcePanel',
        use: () => {
          const setUI = useAppStore(s => s.setUI);
          const showResourcePanel = useAppStore(s => s.ui.showResourcePanel);
          const resourcePanelDocked = useAppStore(s => s.ui.resourcePanelDocked);
          return {
            onClick: () => setUI({ showResourcePanel: true, resourcePanelDocked: false }),
            active: showResourcePanel && !resourcePanelDocked,
          };
        },
      },
      dockResourcePanelButton,
      {
        kind: 'button', id: 'newResource', icon: <Plus size={20} />, labelKey: 'menu:ribbon.newResource',
        // Issue #48-1: deze knop persisteerde direct een NAAMLOZE resource (`addResource` ⇒ undo-stap
        // + een lege rij die blijft staan als je niets typt), terwijl de "+ Nieuwe resource"-knop in
        // het paneel al gesaneerd was tot een concept-rij (critreview-bevinding F10). Nu neemt de
        // lintknop diezelfde route: alleen een verzoek-vlag zetten, `ResourcePanel` opent de draft en
        // maakt pas bij een niet-lege naam écht een resource aan — in de bibliotheek of het project,
        // afhankelijk van de actieve weergave. Daarom ook expliciet `resourcePanelDocked: false`
        // (zoals `openResourcePanel` hierboven): in de gedockte rail bestaat het paneel niet en is de
        // naam readonly, dus daar zou de zojuist aangevraagde resource onbenoembaar zijn.
        use: () => {
          const setUI = useAppStore(s => s.setUI);
          return {
            onClick: () => setUI({ showResourcePanel: true, resourcePanelDocked: false, pendingNewResource: true }),
          };
        },
      },
    ],
  },
  {
    id: 'resourceAssignment', labelKey: 'menu:ribbon.resourceAssignment',
    items: [{ kind: 'component', id: 'resourceAssign', Component: ResourceAssignDropdown }],
  },
  {
    id: 'histogram', labelKey: 'menu:ribbon.histogram',
    items: [
      toggleHistogramButton,
      {
        kind: 'stack', id: 'histogramStack', items: [
          {
            kind: 'small', id: 'prevResource', icon: <ChevronLeft size={14} />, labelKey: 'menu:ribbon.prevResource',
            use: () => {
              const resources = useAppStore(s => s.resources);
              const showHistogram = useAppStore(s => s.ui.showHistogram);
              const histogramResourceId = useAppStore(s => s.view.histogramResourceId);
              const setHistogramResource = useAppStore(s => s.setHistogramResource);
              const cycle = () => {
                const ids: (string | undefined)[] = [undefined, ...resources.map(r => r.id)];
                const cur = ids.findIndex(id => id === histogramResourceId);
                setHistogramResource(ids[(cur - 1 + ids.length) % ids.length]);
              };
              return { onClick: cycle, disabled: !showHistogram || resources.length === 0 };
            },
          },
          {
            kind: 'small', id: 'nextResource', icon: <ChevronRight size={14} />, labelKey: 'menu:ribbon.nextResource',
            use: () => {
              const resources = useAppStore(s => s.resources);
              const showHistogram = useAppStore(s => s.ui.showHistogram);
              const histogramResourceId = useAppStore(s => s.view.histogramResourceId);
              const setHistogramResource = useAppStore(s => s.setHistogramResource);
              const cycle = () => {
                const ids: (string | undefined)[] = [undefined, ...resources.map(r => r.id)];
                const cur = ids.findIndex(id => id === histogramResourceId);
                setHistogramResource(ids[(cur + 1 + ids.length) % ids.length]);
              };
              return { onClick: cycle, disabled: !showHistogram || resources.length === 0 };
            },
          },
        ],
      },
    ],
  },
  {
    id: 'leveling', labelKey: 'menu:ribbon.leveling',
    items: [
      {
        kind: 'button', id: 'levelResources', icon: <Scale size={20} />, labelKey: 'menu:ribbon.levelResourcesDialog',
        use: () => { const setUI = useAppStore(s => s.setUI); return { onClick: () => setUI({ showLevelingDialog: true }) }; },
      },
      {
        kind: 'button', id: 'clearLeveling', icon: <Eraser size={20} />, labelKey: 'menu:ribbon.clearLeveling',
        use: () => {
          const clearLeveling = useAppStore(s => s.clearLeveling);
          const hasLeveling = useAppStore(s => s.tasks.some(t => t.levelingDelay !== undefined));
          return { onClick: () => clearLeveling(), disabled: !hasLeveling };
        },
      },
    ],
  },
  {
    id: 'overallocationIndicator', labelKey: 'menu:ribbon.overallocationIndicator',
    items: [{ kind: 'component', id: 'overallocation', Component: OverallocationIndicator }],
  },
];

const relationsTab: RibbonTabConfig = [
  { id: 'relations', labelKey: 'menu:ribbon.relations', items: [relationButton] },
  traceGroup,
  { id: 'schedule', labelKey: 'menu:ribbon.schedule', items: [calcButton] },
];

/**
 * Overzicht-groep (issue #35 punt 3): in- en uitklappen zijn APARTE knoppen, niet één toggle —
 * met een toggle kun je een gemengde selectie nooit in één keer dezelfde kant op zetten.
 *
 * De knoppen zijn MODUS-BEWUST en dus nooit uitgeschakeld:
 *  - boommodus: de selectie; zonder selectie het hele plan (`collapseTasks`/`expandTasks`);
 *  - gegroepeerde weergave: alle groepsbanden (`collapseAllGroups`/`expandAllGroups`), want daar
 *    negeert `computeViewRows` de taak-collapse volledig — de bandkoppen nemen het over.
 * Een taakselectie heeft in gegroepeerde weergave bewust GEEN effect: dezelfde taak kan in
 * meerdere banden vallen (resource-groepering) en een band is geen taak, dus er is geen zinnige
 * vertaling van "deze taken" naar "deze banden". Alles-of-niets is daar het enige eerlijke gedrag.
 */
const outlineGroup: RibbonGroupSpec = {
  id: 'outline', labelKey: 'menu:ribbon.outline',
  items: [{
    kind: 'stack', id: 'outlineStack', items: [
      {
        kind: 'small', id: 'collapseTasks', icon: <ChevronsDownUp size={14} />, labelKey: 'menu:ribbon.collapseTasks',
        use: () => {
          const collapseTasks = useAppStore(s => s.collapseTasks);
          const collapseAllGroups = useAppStore(s => s.collapseAllGroups);
          const selectedTaskIds = useAppStore(s => s.selectedTaskIds);
          const grouped = useAppStore(s => (s.view.group?.length ?? 0) > 0);
          const { t } = useTranslation('menu');
          return {
            onClick: () => (grouped ? collapseAllGroups() : collapseTasks(selectedTaskIds)),
            title: t(grouped ? 'ribbon.collapseGroupsTitle' : 'ribbon.collapseTasksTitle'),
          };
        },
      },
      {
        kind: 'small', id: 'expandTasks', icon: <ChevronsUpDown size={14} />, labelKey: 'menu:ribbon.expandTasks',
        use: () => {
          const expandTasks = useAppStore(s => s.expandTasks);
          const expandAllGroups = useAppStore(s => s.expandAllGroups);
          const selectedTaskIds = useAppStore(s => s.selectedTaskIds);
          const grouped = useAppStore(s => (s.view.group?.length ?? 0) > 0);
          const { t } = useTranslation('menu');
          return {
            onClick: () => (grouped ? expandAllGroups() : expandTasks(selectedTaskIds)),
            title: t(grouped ? 'ribbon.expandGroupsTitle' : 'ribbon.expandTasksTitle'),
          };
        },
      },
    ],
  }],
};

const beeldTab: RibbonTabConfig = [
  { id: 'timeScale', labelKey: 'menu:ribbon.timeScale', items: [{ kind: 'component', id: 'timeScale', Component: TimeScaleGroupContent }] },
  { id: 'display', labelKey: 'menu:ribbon.display', items: [{ kind: 'component', id: 'display', Component: DisplayGroupContent }] },
  outlineGroup,
  { id: 'layout', labelKey: 'menu:ribbon.layout', items: [{ kind: 'component', id: 'layout', Component: LayoutGroupContent }] },
  { id: 'presentation', labelKey: 'menu:ribbon.presentationMode', items: [{ kind: 'component', id: 'presentation', Component: PresentationGroupContent }] },
  {
    id: 'panels', labelKey: 'menu:ribbon.panels',
    items: [
      {
        kind: 'button', id: 'properties', icon: <Eye size={20} />, labelKey: 'menu:ribbon.properties',
        use: () => {
          const rightPanelCollapsed = useAppStore(s => s.ui.rightPanelCollapsed);
          const setUI = useAppStore(s => s.setUI);
          return {
            icon: !rightPanelCollapsed ? <Eye size={20} /> : <EyeOff size={20} />,
            active: !rightPanelCollapsed,
            onClick: () => setUI({ rightPanelCollapsed: !rightPanelCollapsed }),
          };
        },
      },
      // Issue #46c: dezelfde twee paneelknoppen als op de Resources-tab (gedeelde specs hierboven).
      dockResourcePanelButton,
      toggleHistogramButton,
    ],
  },
  {
    id: 'overlays', labelKey: 'menu:ribbon.baselines',
    items: [
      {
        kind: 'stack', id: 'overlaysStack', items: [
          {
            kind: 'small', id: 'toggleBaselineOverlay', icon: <LayoutGrid size={14} />, labelKey: 'menu:ribbon.toggleBaselineOverlay',
            use: () => {
              const showBaselineOverlay = useAppStore(s => s.ui.showBaselineOverlay);
              const setUI = useAppStore(s => s.setUI);
              return { active: showBaselineOverlay, onClick: () => { const next = !showBaselineOverlay; setUI({ showBaselineOverlay: next }); void saveShowBaselineOverlay(next); } };
            },
          },
          {
            kind: 'small', id: 'toggleProgressLine', icon: <TrendingUp size={14} />, labelKey: 'menu:ribbon.toggleProgressLine',
            use: () => {
              const showProgressLine = useAppStore(s => s.ui.showProgressLine);
              const setUI = useAppStore(s => s.setUI);
              return { active: showProgressLine, onClick: () => { const next = !showProgressLine; setUI({ showProgressLine: next }); void saveShowProgressLine(next); } };
            },
          },
          {
            kind: 'small', id: 'toggleStatusDateLine', icon: <CalendarDays size={14} />, labelKey: 'menu:ribbon.toggleStatusDateLine',
            use: () => {
              const showStatusDateLine = useAppStore(s => s.ui.showStatusDateLine);
              const setUI = useAppStore(s => s.setUI);
              return { active: showStatusDateLine, onClick: () => { const next = !showStatusDateLine; setUI({ showStatusDateLine: next }); void saveShowStatusDateLine(next); } };
            },
          },
        ],
      },
    ],
  },
];

const instellingenTab: RibbonTabConfig = [
  {
    id: 'project', labelKey: 'menu:ribbon.project',
    items: [
      {
        kind: 'button', id: 'projectInfo', icon: <Info size={20} />, labelKey: 'menu:ribbon.projectInfo',
        use: () => { const setUI = useAppStore(s => s.setUI); return { onClick: () => setUI({ showProjectInfoDialog: true }) }; },
      },
      {
        kind: 'button', id: 'projectSettings', icon: <Settings size={20} />, labelKey: 'menu:ribbon.projectSettings',
        use: () => { const setUI = useAppStore(s => s.setUI); return { onClick: () => setUI({ showSettingsDialog: true }) }; },
      },
    ],
  },
  { id: 'calendar', labelKey: 'menu:ribbon.calendar', items: [calendarButton] },
  {
    id: 'shortcuts', labelKey: 'common:shortcuts.title',
    items: [{
      kind: 'small', id: 'shortcuts', icon: <Keyboard size={14} />, labelKey: 'common:shortcuts.title',
      use: () => { const setUI = useAppStore(s => s.setUI); return { onClick: () => setUI({ showShortcutsDialog: true }) }; },
    }],
  },
];

const tableTab: RibbonTabConfig = [
  { id: 'table', labelKey: 'task:table.title', items: [calcButton, addTaskButton] },
];

const ifcTab: RibbonTabConfig = [
  { id: 'ifc', labelKey: 'menu:ribbon.ifc', items: [{ kind: 'component', id: 'ifcInfo', Component: IfcInfo }] },
];

const reportTab: RibbonTabConfig = [
  { id: 'reporting', labelKey: 'menu:ribbon.reporting', items: [printPreviewButton] },
];

/** AI-tab (T14/T15/T16) — conditioneel zichtbaar (alleen bij `ui.aiMode`; zie Ribbon.tsx). Vier
 *  groepen, alle component-escape-hatches (eigen state, inputs, popover/confirm). De veiligheidsgroep
 *  (pauze/alleen-lezen/backup) is T16; de activiteit-groep (T15) toggelt het activiteitenpaneel. */
const aiTab: RibbonTabConfig = [
  { id: 'aiServer', labelKey: 'menu:ribbon.aiServer', items: [{ kind: 'component', id: 'aiServer', Component: AiServerGroup }] },
  { id: 'aiConnection', labelKey: 'menu:ribbon.aiConnection', items: [{ kind: 'component', id: 'aiConnection', Component: AiConnectionGroup }] },
  { id: 'aiSafety', labelKey: 'menu:ribbon.aiSafety', items: [{ kind: 'component', id: 'aiSafety', Component: AiSafetyGroup }] },
  { id: 'aiActivity', labelKey: 'menu:ribbon.aiActivity', items: [{ kind: 'component', id: 'aiActivity', Component: AiActivityGroup }] },
];

/** De registry: actieve-tab → groepen. 'file' heeft geen ribbon-inhoud (Backstage neemt over). */
export const RIBBON_TABS: Record<Exclude<RibbonTab, 'file'>, RibbonTabConfig> = {
  start: startTab,
  planning: planningTab,
  resources: resourcesTab,
  relations: relationsTab,
  beeld: beeldTab,
  instellingen: instellingenTab,
  table: tableTab,
  ifc: ifcTab,
  report: reportTab,
  ai: aiTab,
};
