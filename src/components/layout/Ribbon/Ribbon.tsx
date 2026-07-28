import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { useAppStore } from '@/state/appStore';
import { useTranslation } from 'react-i18next';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { saveRibbonCompact } from '@/utils/settingsStore';
import { RibbonTab } from '@/state/slices/types';
import { RibbonTabContent } from './RibbonTabContent';
import { ExtensionRibbonGroups } from './ribbonWidgets';
import { RibbonDensity, RibbonDensityContext } from './ribbonDensity';
import './Ribbon.css';

/**
 * Ribbon-schil (audit P18): tabs-balk + generiek render-pad + inklap-toggle. De dichtheid
 * (vol/compact/icoon) is een combinatie van automatisch en handmatig: een ResizeObserver meet of
 * de inhoud van de actieve tab horizontaal past; zo niet, dan schakelt {@link useRibbonAutoDensity}
 * één stap compacter (vol → compact → alleen iconen). Daarnaast kan de gebruiker via de
 * `.ribbon-collapse-toggle`-knop `ui.ribbonCompact` aanzetten — dat is een ONDERGRENS, geen
 * absolute waarde: staat hij aan, dan is de effectieve dichtheid minimaal 'compact' (de
 * automatische dichtheid mag 'm nog verder naar 'icon' duwen, maar nooit terug naar 'full'). Staat
 * hij uit, dan is de effectieve dichtheid gewoon de automatische. De gekozen (effectieve) dichtheid
 * gaat via {@link RibbonDensityContext} naar de groep-componenten die zelf een compacte vorm
 * renderen (TimeScale/Layout/Baselines), zodat container-klasse en inhoud consistent blijven.
 */
function useRibbonAutoDensity(
  containerRef: RefObject<HTMLElement | null>,
  scrollRef: RefObject<HTMLElement | null>,
  activeTab: RibbonTab,
  manualCompact: boolean,
): RibbonDensity {
  const [density, setDensity] = useState<RibbonDensity>('full');
  const [, forceRemeasure] = useState(0);
  const lastWidth = useRef(0);

  // Bij tabwissel opnieuw vanaf 'full' evalueren (andere inhoud/breedte per tab). Óók bij het
  // omzetten van de handmatige knop: zolang die aan staat meet dit effect de compacte inhoud (die
  // breder is dan de volle) en loopt de ladder door naar 'icon'. Zonder deze reset bleef die stand
  // hangen zodra de gebruiker weer uitklapte, waardoor het lint op een breed scherm in icoon-modus
  // bleef staan i.p.v. terug te gaan naar 'full'.
  useLayoutEffect(() => { setDensity('full'); }, [activeTab, manualCompact]);

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
  const ribbonCompact = useAppStore(s => s.ui.ribbonCompact);
  // T14: het AI-tabblad verschijnt alleen bij ingeschakelde AI-modus (conditioneel, net als de
  // debug-terminal een paneel toont). Uitzetten verwijdert de tab; de reducer valt dan terug op
  // 'start' als dit tabblad actief was.
  const aiMode = useAppStore(s => s.ui.aiMode);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoDensity = useRibbonAutoDensity(containerRef, scrollRef, activeTab, ribbonCompact);
  // Handmatig kiezen wint volledig: kiest de gebruiker compact, dan is het compact — automatisch
  // mag daar niet meer overheen. Dat is bewust géén ondergrens-met-doorschuif-naar-'icon', want de
  // compacte strip is BREDER dan de volle weergave (bij het platslaan worden verticale knop-stapels
  // horizontale rijen: 3 knoppen gaan van ~70px naar ~210px). De automatische ladder zou dus altijd
  // meteen naar 'icon' doorschieten en de gekozen strip-mét-labels nooit tonen. Zonder handmatige
  // keuze bepaalt de automaat alles zoals voorheen.
  // Puur afgeleid uit bestaande state — geen eigen setState, dus geen renderlus mogelijk.
  const density: RibbonDensity = ribbonCompact ? 'compact' : autoDensity;

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
          {/* Compacte-modus-toggle rechtsonder (Word-web-stijl): ↑ = inklappen, ↓ = uitklappen.
              Sibling van .ribbon-content-scroll (niet erin) zodat position:absolute t.o.v.
              .ribbon-content de knop een vaste plek in de hoek geeft, los van scroll/inhoud —
              en in élke dichtheid (ook 'icon') zichtbaar en klikbaar blijft. */}
          <button
            className="ribbon-collapse-toggle"
            title={tMenu(ribbonCompact ? 'ribbon.expandRibbon' : 'ribbon.collapseRibbon')}
            aria-label={tMenu(ribbonCompact ? 'ribbon.expandRibbon' : 'ribbon.collapseRibbon')}
            onClick={() => {
              const next = !ribbonCompact;
              setUI({ ribbonCompact: next });
              void saveRibbonCompact(next);
            }}
          >
            {ribbonCompact ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
