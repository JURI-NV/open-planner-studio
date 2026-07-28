import { createContext, useContext } from 'react';

/**
 * Ribbon-dichtheid: `full` (grote knoppen) → `compact` (platte kleine knoppen mét label) →
 * `icon` (alleen iconen). Automatisch bepaald door de beschikbare breedte (zie de ResizeObserver
 * in Ribbon.tsx) en via context gedeeld met de groep-componenten die zelf een compacte vorm
 * renderen (TimeScale/Layout/Baselines). Zo lezen de container-klasse én de inhoud in dezelfde
 * render dezelfde waarde — geen desync van één render zoals bij een losse store-vlag.
 */
export type RibbonDensity = 'full' | 'compact' | 'icon';

export const RibbonDensityContext = createContext<RibbonDensity>('full');

export const useRibbonDensity = (): RibbonDensity => useContext(RibbonDensityContext);
