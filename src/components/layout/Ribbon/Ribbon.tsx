import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { useAppStore } from '@/state/appStore';
import { useTranslation } from 'react-i18next';
import { RibbonTab } from '@/state/slices/types';
import { RibbonTabContent } from './RibbonTabContent';
import { ExtensionRibbonGroups } from './ribbonWidgets';
import { RibbonDensity, RibbonDensityContext } from './ribbonDensity';
import './Ribbon.css';

/**
 * Ribbon-schil (audit P18): tabs-balk + generiek render-pad. De dichtheid (vol/compact/icoon) is
 * volledig automatisch: een ResizeObserver meet of de inhoud van de actieve tab horizontaal past;
 * zo niet, dan schakelt {@link useRibbonAutoDensity} één stap compacter (vol → compact → alleen
 * iconen). Er is geen handmatige inklap-knop meer — het lint past zich vanzelf aan de breedte aan.
 * De gekozen dichtheid gaat via {@link RibbonDensityContext} naar de groep-componenten die zelf een
 * compacte vorm renderen (TimeScale/Layout/Baselines), zodat klasse en inhoud consistent blijven.
 */
function useRibbonAutoDensity(
  containerRef: RefObject<HTMLElement | null>,
  scrollRef: RefObject<HTMLElement | null>,
  activeTab: RibbonTab,
): RibbonDensity {
  const [density, setDensity] = useState<RibbonDensity>('full');
  const [, forceRemeasure] = useState(0);
  const lastWidth = useRef(0);

  // Bij tabwissel opnieuw vanaf 'full' evalueren (andere inhoud/breedte per tab).
  useLayoutEffect(() => { setDensity('full'); }, [activeTab]);

  // Stap compacter zolang de inhoud horizontaal overloopt. Draait na elke render en convergeert:
  // 'icon' overloopt = geen verandering meer (React bailt op gelijke state), dan blijft de bestaande
  // horizontale scroll als laatste vangnet.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth + 1) {
      setDensity(d => (d === 'full' ? 'compact' : d === 'compact' ? 'icon' : d));
    }
  });

  // Bij een breedte-wijziging van het lint (venster/paneel) terug naar 'full' en opnieuw laten
  // inklappen. Alleen op breedte reageren — de hoogte verandert mee met de dichtheid en zou anders
  // een lus veroorzaken.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    lastWidth.current = el.clientWidth;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (Math.abs(w - lastWidth.current) > 0.5) {
        lastWidth.current = w;
        // Terug naar 'full' én een re-meting forceren — ook als density al 'full' was (anders geen
        // re-render en meet de stap-omlaag-effect niet dat de inhoud nu overloopt).
        setDensity('full');
        forceRemeasure(t => t + 1);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  return density;
}

export function Ribbon() {
  const { t: tMenu } = useTranslation('menu');
  const setUI = useAppStore(s => s.setUI);
  const activeTab = useAppStore(s => s.ui.activeRibbonTab);
  // T14: het AI-tabblad verschijnt alleen bij ingeschakelde AI-modus (conditioneel, net als de
  // debug-terminal een paneel toont). Uitzetten verwijdert de tab; de reducer valt dan terug op
  // 'start' als dit tabblad actief was.
  const aiMode = useAppStore(s => s.ui.aiMode);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const density = useRibbonAutoDensity(containerRef, scrollRef, activeTab);

  const setActiveTab = useCallback((tab: RibbonTab) => {
    setUI({ activeRibbonTab: tab });
  }, [setUI]);

  const tabs: RibbonTab[] = [
    'start', 'planning', 'resources', 'relations', 'beeld', 'instellingen', 'table', 'ifc', 'report',
    ...(aiMode ? (['ai'] as RibbonTab[]) : []),
  ];

  const densityClass =
    density === 'icon' ? ' compact compact-icons' : density === 'compact' ? ' compact' : '';

  return (
    <div ref={containerRef} className={`ribbon-container${densityClass}`}>
      {/* Tabs — 'file' is de speciale amber backstage-tab links. */}
      <div className="ribbon-tabs" data-tour-anchor="ribbon-tabs">
        <button
          key="file"
          className={`ribbon-tab ribbon-tab--file ${activeTab === 'file' ? 'active' : ''}`}
          onClick={() => setActiveTab('file')}
        >
          {tMenu('ribbon.file')}
        </button>
        {tabs.map(tab => (
          <button
            key={tab}
            className={`ribbon-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tMenu(`ribbon.${tab === 'beeld' ? 'view' : tab === 'instellingen' ? 'settings' : tab}`)}
          </button>
        ))}
      </div>

      {/* Content — verborgen wanneer File-tab actief is (Backstage neemt de hele body over) */}
      {activeTab !== 'file' && (
        <div className="ribbon-content">
          <RibbonDensityContext.Provider value={density}>
            <div ref={scrollRef} className="ribbon-content-scroll">
              <RibbonTabContent tab={activeTab} />
              <ExtensionRibbonGroups tab={activeTab} />
            </div>
          </RibbonDensityContext.Provider>
        </div>
      )}
    </div>
  );
}
