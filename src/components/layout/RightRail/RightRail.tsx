import { Suspense, lazy, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, Maximize2, PanelRightClose, X } from 'lucide-react';
import { useAppStore } from '@/state/appStore';
import { useSplitter } from '@/hooks/useSplitter';
import { TaskPropertiesPanel } from '@/components/panels/TaskPropertiesPanel';
import { ResourcePanelCompact } from '@/components/panels/ResourcePanelCompact';
import {
  RIGHT_PANEL_MIN_WIDTH,
  RAIL_SECTION_MIN_HEIGHT,
  saveRightPanelWidth,
  saveRailPropertiesHeight,
} from '@/utils/settingsStore';

const DebugTerminal = lazy(() => import('@/components/panels/DebugTerminal').then(m => ({ default: m.DebugTerminal })));
const AIActivityPanel = lazy(() => import('@/components/panels/AIActivityPanel').then(m => ({ default: m.AIActivityPanel })));

/**
 * De rechter-rail als ACCORDEON (issue #46, slotpunt).
 *
 * ── Wat hier is teruggedraaid ────────────────────────────────────────────────────────────────
 * Architect-besluit 5 van fase 2.10 luidde: "hergebruik de bestaande rechter-rail, mutueel
 * exclusief met het eigenschappenpaneel (resources gedockt ⇒ properties-rail tijdelijk vervangen).
 * Eén rail, geen tweede breedte/collapsed-veld." Dat was een bewuste soberheidskeuze — één breedte,
 * één inklapvlag — maar de melder van issue #46 liep er precies tegenaan: het Resourcedock
 * VERVANGT het eigenschappenpaneel, dus je verliest de taakeigenschappen zodra je de resources
 * erbij wilt. Zijn voorstel was het paneel te MINIMALISEREN in plaats van te vervangen.
 *
 * Wat blijft staan van dat besluit: **één rail en één breedte** — er is nog steeds precies één
 * `rightPanelWidth` en één breedte-splitter. Wat erbij komt is uitsluitend de verticale as: een
 * hoogteverdeling (`railPropertiesHeight`) en een inklapvlag per sectie.
 *
 * ── Het hoogtemodel ─────────────────────────────────────────────────────────────────────────
 * De rail huisvest maximaal twee secties: Eigenschappen (altijd) en de gedockte resourcelijst
 * (alleen bij `showResourcePanel && resourcePanelDocked`). Een samengevouwen sectie is exact zijn
 * kopbalk hoog. De verdeling is dan volledig bepaald door één regel:
 *
 *   - staan er twee secties OPEN → Eigenschappen krijgt `railPropertiesHeight` px, de
 *     resourcelijst de rest, met een sleepbare scheiding ertussen;
 *   - staat er één sectie open → die krijgt de volle resterende hoogte (`flex: 1`), ongeacht
 *     `railPropertiesHeight`. Geen loze witruimte, en geen tweede geval om te onderhouden.
 *
 * Zijn BEIDE secties samengevouwen, dan blijft de rail staan met twee balkjes boven elkaar (het
 * VS Code-gedrag). Bewust niet de rail automatisch mee inklappen: "sectie dicht" en "rail dicht"
 * zijn twee verschillende wensen — de eerste zegt "ik wil deze inhoud even niet", de tweede "geef
 * de Gantt die 280 px". Ze samenvoegen maakt bovendien het heropenen dubbelzinnig (welke sectie
 * komt er terug?). De rail als geheel inklappen kan gewoon met de knop rechts in de bovenste
 * kopbalk; de ingeklapte strip toont dan één klikbaar label per sectie, zodat je gericht
 * terugkeert naar de sectie die je wilde.
 */
export function RightRail() {
  const { t } = useTranslation('common');
  const setUI = useAppStore(s => s.setUI);
  const rightPanelCollapsed = useAppStore(s => s.ui.rightPanelCollapsed);
  const rightPanelWidth = useAppStore(s => s.ui.rightPanelWidth);
  const showResourcePanel = useAppStore(s => s.ui.showResourcePanel);
  const resourcePanelDocked = useAppStore(s => s.ui.resourcePanelDocked);
  const propsCollapsed = useAppStore(s => s.ui.railPropertiesCollapsed);
  const resCollapsed = useAppStore(s => s.ui.railResourcesCollapsed);
  const propsHeight = useAppStore(s => s.ui.railPropertiesHeight);
  const debugTerminalEnabled = useAppStore(s => s.ui.debugTerminalEnabled);
  const debugTerminalOpen = useAppStore(s => s.ui.debugTerminalOpen);
  const aiMode = useAppStore(s => s.ui.aiMode);
  const aiActivityOpen = useAppStore(s => s.ui.aiActivityOpen);

  /** Bestaat de resource-sectie überhaupt in de rail? (Het VOLLEDIGE resourcepaneel is iets
   *  anders: dat vervangt de hele werkruimte en komt hier niet langs — App.tsx rendert deze rail
   *  dan niet.) */
  const dockPresent = showResourcePanel && resourcePanelDocked;
  const bothOpen = dockPresent && !propsCollapsed && !resCollapsed;

  /** Container waarbinnen de twee secties gestapeld staan — de referentie voor de sleepklem. */
  const stackRef = useRef<HTMLDivElement>(null);

  // Breedte slepen (ongewijzigd t.o.v. de oude rail): één splitter, één `rightPanelWidth`.
  const widthSplitter = useSplitter({
    min: RIGHT_PANEL_MIN_WIDTH,
    max: () => Math.round(window.innerWidth * 0.6),
    computeSize: e => Math.round(window.innerWidth - e.clientX),
    onResize: w => useAppStore.getState().setUI({ rightPanelWidth: w }),
    onCommit: () => { void saveRightPanelWidth(useAppStore.getState().ui.rightPanelWidth); },
  });

  // Hoogte slepen — hetzelfde `useSplitter`-patroon, nu op de verticale as. De bovengrens is
  // dynamisch: de stapel-hoogte minus de minimumhoogte van de onderste sectie, zodat de
  // resourcelijst nooit tot 0 px wordt geknepen. Beide grenzen zijn in px van de stapel-top af.
  const heightSplitter = useSplitter({
    min: RAIL_SECTION_MIN_HEIGHT,
    max: () => {
      const h = stackRef.current?.getBoundingClientRect().height ?? 0;
      return Math.max(RAIL_SECTION_MIN_HEIGHT, Math.round(h - RAIL_SECTION_MIN_HEIGHT));
    },
    computeSize: e => {
      const top = stackRef.current?.getBoundingClientRect().top ?? 0;
      return Math.round(e.clientY - top);
    },
    onResize: h => useAppStore.getState().setUI({ railPropertiesHeight: h }),
    onCommit: () => { void saveRailPropertiesHeight(useAppStore.getState().ui.railPropertiesHeight); },
  });

  // ── Ingeklapte rail: de verticale strip ────────────────────────────────────────────────────
  // Eén klikbaar label per AANWEZIGE sectie. Klikken klapt de rail uit én opent gericht díé
  // sectie — anders zou de gebruiker na het uitklappen alsnog moeten raden welk balkje hij nodig
  // heeft. Dit is ook precies het beeld dat de melder als referentie meestuurde.
  if (rightPanelCollapsed) {
    return (
      <div className="ui-card flex flex-col items-center justify-center gap-4 py-4 overflow-hidden" style={{ width: 28 }}>
        <RailStripLabel
          label={t('properties')}
          title={t('sidebar.expandRail')}
          onClick={() => setUI({ rightPanelCollapsed: false, railPropertiesCollapsed: false })}
        />
        {dockPresent && (
          <RailStripLabel
            label={t('resource.compact.title')}
            title={t('sidebar.expandRail')}
            onClick={() => setUI({ rightPanelCollapsed: false, railResourcesCollapsed: false })}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="ui-card flex flex-col overflow-hidden"
      style={{ width: rightPanelWidth, minWidth: RIGHT_PANEL_MIN_WIDTH, position: 'relative' }}
      data-tour-anchor="properties-panel"
      data-ops-rail
    >
      {/* Sleepgrijpzone voor de BREEDTE (fase 2.10, punt 3 — ongewijzigd overgenomen): geen
          zichtbare balk, maar een onzichtbare grijpzone over de binnenrand van het paneel, zelfde
          patroon als de tabel/chart-splitter in GanttCanvas. `insetInlineStart` i.p.v. `left`
          zodat de zone in RTL (ar/fa) meespiegelt naar de juiste rand. Neemt geen ruimte in. */}
      <div
        onMouseDown={e => { e.preventDefault(); widthSplitter.start(); }}
        style={{ position: 'absolute', insetInlineStart: -4, top: 0, bottom: 0, width: 8, cursor: 'col-resize', zIndex: 10 }}
        data-ops-right-panel-resize
      />

      <div ref={stackRef} className="flex-1 flex flex-col overflow-hidden" style={{ minHeight: 0 }}>
        <RailSection
          id="properties"
          title={t('properties')}
          collapsed={propsCollapsed}
          // Zonder resourcesectie is er niets om tegen af te wegen: een accordeon van één heeft
          // geen vouw. De twisty verdwijnt dan, zodat de gebruiker zichzelf niet in een rail van
          // 280 px met één balkje erin kan klikken. De rail als geheel wegklappen kan gewoon met de
          // knop ernaast — precies zoals vóór deze wijziging.
          showToggle={dockPresent}
          onToggle={() => setUI({ railPropertiesCollapsed: !propsCollapsed })}
          // De rail-als-geheel-knop hangt aan de BOVENSTE kopbalk (Eigenschappen staat er altijd
          // en altijd bovenaan), zodat er precies één zo'n knop is en die niet verspringt.
          onCollapseRail={() => setUI({ rightPanelCollapsed: true })}
          collapseRailTitle={t('sidebar.collapseRail')}
          // Vaste hoogte alleen als er écht twee secties openstaan; anders vult de open sectie
          // de rail (`flex: 1`) en is er niets te verdelen.
          fixedHeight={bothOpen ? propsHeight : undefined}
          grow={!propsCollapsed && !bothOpen}
        >
          <TaskPropertiesPanel />
        </RailSection>

        {bothOpen && (
          // Onzichtbare horizontale grijpzone tussen de twee secties — spiegelbeeld van de
          // breedte-grijpzone hierboven: geen eigen balk, alleen een cursor. De zichtbare
          // scheiding is de `border-t` van de kopbalk van de sectie eronder.
          <div
            onMouseDown={e => { e.preventDefault(); heightSplitter.start(); }}
            style={{ height: 0, position: 'relative', zIndex: 10, flexShrink: 0 }}
          >
            <div style={{ position: 'absolute', insetInline: 0, top: -4, height: 8, cursor: 'row-resize' }} data-ops-rail-resize />
          </div>
        )}

        {dockPresent && (
          <RailSection
            id="resources"
            title={t('resource.compact.title')}
            collapsed={resCollapsed}
            onToggle={() => setUI({ railResourcesCollapsed: !resCollapsed })}
            withTopBorder
            grow={!resCollapsed}
            actions={
              <>
                <button
                  onClick={() => setUI({ resourcePanelDocked: false })}
                  title={t('resource.compact.expandFull')}
                  className="p-0.5 hover:bg-surface-hover rounded text-text-secondary"
                >
                  <Maximize2 size={13} />
                </button>
                <button
                  onClick={() => setUI({ showResourcePanel: false, resourcePanelDocked: false })}
                  title={t('resource.compact.closeDock')}
                  className="p-0.5 hover:bg-surface-hover rounded text-text-secondary"
                >
                  <X size={14} />
                </button>
              </>
            }
          >
            <ResourcePanelCompact />
          </RailSection>
        )}
      </div>

      {debugTerminalEnabled && debugTerminalOpen && (
        <Suspense fallback={null}><DebugTerminal /></Suspense>
      )}
      {aiMode && aiActivityOpen && (
        <Suspense fallback={null}><AIActivityPanel /></Suspense>
      )}
    </div>
  );
}

/** Eén verticaal label in de ingeklapte strip. */
function RailStripLabel({ label, title, onClick }: { label: string; title: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex flex-col items-center gap-2 cursor-pointer hover:bg-surface-hover rounded py-2 w-full"
      data-ops-rail-strip
    >
      <ChevronRight size={14} className="text-text-secondary ops-icon-inline-flip" />
      <span
        className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        {label}
      </span>
    </button>
  );
}

interface RailSectionProps {
  id: string;
  title: string;
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  /** Extra knoppen rechts in de kopbalk (bv. "volledig paneel" / "dock sluiten"). */
  actions?: React.ReactNode;
  /** De knop die de HELE rail inklapt — hangt alleen aan de bovenste sectie. */
  onCollapseRail?: () => void;
  collapseRailTitle?: string;
  /** Vaste hoogte in px (alleen wanneer beide secties openstaan). */
  fixedHeight?: number;
  /** Vult deze sectie de resterende ruimte? */
  grow?: boolean;
  withTopBorder?: boolean;
  /** Toon de in-/uitklap-twisty? Uit wanneer deze sectie de enige in de rail is. */
  showToggle?: boolean;
}

function RailSection({
  id, title, collapsed, onToggle, children, actions, onCollapseRail, collapseRailTitle,
  fixedHeight, grow, withTopBorder, showToggle = true,
}: RailSectionProps) {
  const { t } = useTranslation('common');
  // Drie elkaar uitsluitende hoogtemodi — de hele verdeling zit in deze ene expressie:
  //   samengevouwen → precies de kopbalk; groeiend → de resterende ruimte; anders → vaste hoogte.
  //
  // Twee details die pas bij het NAmeten bleken te kloppen, allebei voor de rail die KORTER is dan
  // de opgeslagen verdeling (laag venster, geopende debugterminal, uitgeklapt AI-paneel):
  //
  //  1. De vaste-hoogte-tak staat op `flex-shrink: 1` (`0 1 auto`), niet op `0 0 auto`. Anders
  //     weigert de vastgezette sectie te krimpen en wordt alle overloop op de andere afgewenteld.
  //  2. Béide takken hebben een `minHeight` van precies één kopbalk (`2rem`, dezelfde `h-8` als de
  //     kopbalk zelf — en dus meeschalend met de interface-lettertypeschaal). Zonder die op de
  //     GROEIENDE tak is `flex: 1 1 0` bij negatieve vrije ruimte gewoon 0 px: gemeten op 1280×430
  //     kromp de resourcelijst dan tot 1 px terwijl Eigenschappen 146 px hield — de lijst verdween
  //     zonder dat iets dat aangaf. Met de klem houden beide secties minstens hun kopbalk.
  const HEADER = '2rem';
  const style: React.CSSProperties = collapsed
    ? { flex: '0 0 auto' }
    : grow
      ? { flex: '1 1 0', minHeight: HEADER }
      : { flex: '0 1 auto', height: fixedHeight, minHeight: HEADER };

  return (
    <div
      className={`flex flex-col overflow-hidden${withTopBorder ? ' border-t border-border' : ''}`}
      style={style}
      data-ops-rail-section={id}
      data-ops-collapsed={collapsed ? 'true' : 'false'}
    >
      <div className="flex items-center h-8 px-2 border-b border-border flex-shrink-0">
        {showToggle ? (
          <button
            onClick={onToggle}
            title={collapsed ? t('sidebar.expand') : t('sidebar.collapse')}
            aria-expanded={!collapsed}
            className="flex items-center gap-1 flex-1 min-w-0 text-start hover:bg-surface-hover rounded px-1 py-0.5 -mx-1"
          >
            {collapsed
              ? <ChevronRight size={13} className="text-text-secondary flex-shrink-0 ops-icon-inline-flip" />
              : <ChevronDown size={13} className="text-text-secondary flex-shrink-0" />}
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary truncate">
              {title}
            </span>
          </button>
        ) : (
          <span className="flex-1 min-w-0 px-1 text-[10px] font-bold uppercase tracking-wider text-text-secondary truncate">
            {title}
          </span>
        )}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {actions}
          {onCollapseRail && (
            <button
              onClick={onCollapseRail}
              title={collapseRailTitle}
              className="p-0.5 hover:bg-surface-hover rounded text-text-secondary"
            >
              <PanelRightClose size={14} className="ops-icon-inline-flip" />
            </button>
          )}
        </div>
      </div>
      {!collapsed && <div className="flex-1 overflow-y-auto">{children}</div>}
    </div>
  );
}
