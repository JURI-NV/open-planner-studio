// Kleine registratie van het zichtbare Gantt-tijdvenster (fase 2.7, §3.3) + de gedeelde
// fit-to-project-berekening.
// GanttCanvas registreert bij elke render de breedte van het primaire chart-gedeelte
// (containerbreedte − takentabel), zodat store-acties zoals `setTimeScale` de
// recenter-ankerformule (viewportmidden vasthouden) kunnen toepassen zonder dat de
// store aan React/DOM hangt. Headless (tests) blijft de breedte null → geen recenter.

import { parseDate, diffCalendarDays, addCalendarDays, formatDate } from '@/utils/dateUtils';
import type { Task } from '@/types/task';

/** Dagen links-padding die het canvas vóór de vroegste taak toevoegt: de renderer-origin op
 *  scrollX=0 is (effectiveViewStart − ORIGIN_PADDING_DAYS). Gedeeld door GanttCanvas (render),
 *  useZoomShortcuts (Ctrl+0-fit) en de open-fit (fileSlice.requestFitToProject → GanttCanvas). */
export const ORIGIN_PADDING_DAYS = 14;

/**
 * Effectieve tijdas-oorsprong (de datum die op scrollX = 0 valt) — DE ene bron voor die formule.
 *
 * De opgeslagen `viewStartDate` staat standaard op "vandaag" en houdt geen rekening met taken die
 * eerder beginnen; omdat de horizontale scrollbar (en de `setScroll`-klem) alleen scrollX >= 0
 * toestaan, is alles links van de oorsprong onbereikbaar. Vandaar: pin de oorsprong op de vroegste
 * taakstart (of `viewStartDate`, wat eerder is) minus {@link ORIGIN_PADDING_DAYS}.
 *
 * Deze functie woont HIER, en niet bij de renderopties, om een reden: hij hoort bij
 * `ORIGIN_PADDING_DAYS` en bij zijn twee andere gebruikers ({@link computeScrollToDate} hieronder,
 * en indirect de fit-berekening). Tot K-item 33 stond de lus drie keer los in de codebase — in de
 * render-memo, in `GanttCanvas.revealTaskIfOffscreen` en hier — alleen bij elkaar gehouden door
 * commentaarregels die pariteit beloofden. Zet hem dus niet in een module die `ganttViewport`
 * importeert: dat maakt hergebruik hier onmogelijk (circulaire import) en de derde kopie
 * onvermijdelijk.
 *
 * Verliesvrij t.o.v. de rauwe `Date`-variant voor elke geldige ISO-datum vanaf jaar 100:
 * `parseDate` kapt altijd naar UTC-middernacht en `addCalendarDays` houdt die vast, dus de
 * format/parse-heenweg voegt niets toe en haalt niets weg. (Onder jaar 100 loopt de
 * twee-cijferige-jaarafbeelding van `Date.UTC` ertussen — praktisch onbereikbaar, maar het is geen
 * absolute garantie.)
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

/** Resultaat van {@link computeFitToProject}: de zoom + scroll waarmee het HELE project
 *  (vroegste start … laatste finish) edge-to-edge in het chart-gedeelte past. */
export interface FitToProject {
  zoom: number;
  viewStartDate: string;
  scrollX: number;
}

/**
 * Bereken de zoom + scroll zodat de volledige projectperiode edge-to-edge in het zichtbare
 * chart-gedeelte past. ÉÉN bron van waarheid, gedeeld door de Ctrl+0-handler (useZoomShortcuts)
 * en de open-fit (GanttCanvas op het `pendingFit`-signaal) — zodat beide nooit uit elkaar lopen.
 *
 * `usableWidth` = containerbreedte − takentabelbreedte (de store kent die breedte niet; de
 * aanroeper meet ze). Spiegelt de veldvolgorde van `GanttCanvas.effectiveViewStart` /
 * content-width zodat de span exact klopt met wat de renderer tekent. Geeft `null` bij een leeg
 * project of een niet-zinnige breedte (≤ 0) — de aanroeper houdt dan zijn eigen gedrag aan.
 */
export function computeFitToProject(
  tasks: Task[],
  usableWidth: number,
  enableQuarterHourZoom: boolean,
): FitToProject | null {
  if (tasks.length === 0 || usableWidth <= 0) return null;
  let minStart: string | null = null;
  let maxFinish: string | null = null;
  for (const task of tasks) {
    const s = task.time.earlyStart || task.time.scheduleStart || task.time.lateStart;
    const f = task.time.earlyFinish || task.time.scheduleFinish || task.time.lateFinish || s;
    if (s && (!minStart || s < minStart)) minStart = s;
    if (f && (!maxFinish || f > maxFinish)) maxFinish = f;
  }
  if (!minStart || !maxFinish) return null;
  const span = Math.max(1, diffCalendarDays(parseDate(minStart), parseDate(maxFinish)) + 1);
  const max = enableQuarterHourZoom ? 1000 : 400;
  const zoom = Math.max(0.5, Math.min(max, usableWidth / span));
  // De renderer-origin op scrollX=0 is (minStart − ORIGIN_PADDING_DAYS); scroll door
  // ORIGIN_PADDING_DAYS·zoom zodat minStart op de chart-linkerrand landt en maxFinish exact op
  // de rechterrand → alles past edge-to-edge.
  return { zoom, viewStartDate: minStart, scrollX: ORIGIN_PADDING_DAYS * zoom };
}

/** Kleine marge (in dagen) die vóór de doeldatum zichtbaar blijft, zodat hij niet exact tegen de
 *  chart-linkerrand plakt (analoog aan de "reveal on select"-marge in
 *  GanttCanvas.revealTaskIfOffscreen). */
const SCROLL_TO_DATE_MARGIN_DAYS = 3;

/** Minimale slice van app-state die {@link computeScrollToDate} nodig heeft. Bewust GEEN
 *  `AppState`-import — dit bestand blijft headless/pure zoals de rest van `ganttViewport.ts`; een
 *  volledige store-snapshot (`useAppStore.getState()`) voldoet hier structureel aan. */
export interface ScrollToDateState {
  tasks: Task[];
  view: { viewStartDate: string; zoom: number };
  project: { statusDate?: string };
}

/**
 * Bereken de `scrollX` zodat `date` (default: `project.statusDate`, anders vandaag) links met een
 * kleine marge in het chart-gedeelte in beeld komt. Zoom en `view.viewStartDate` blijven
 * onaangeroerd. Deelt sinds K-item 33 LETTERLIJK {@link computeEffectiveViewStart} met de renderer
 * in plaats van een eigen kopie van die lus, zodat de gesprongen positie 1-op-1 klopt met wat er
 * getekend wordt — die pariteit werd hiervóór alleen door deze commentaarregel beloofd. Gebruikt
 * door `Ctrl/Cmd+Home` (sneltoets-register, fase 2.10 golf 1).
 */
export function computeScrollToDate(date: string | undefined, state: ScrollToDateState): number {
  const target = date || state.project.statusDate || formatDate(new Date());
  const effectiveViewStart = parseDate(computeEffectiveViewStart(state.tasks, state.view.viewStartDate));

  const days = diffCalendarDays(effectiveViewStart, parseDate(target));
  return Math.max(0, (days - SCROLL_TO_DATE_MARGIN_DAYS) * state.view.zoom);
}

let chartWidth: number | null = null;

export function setGanttChartWidth(width: number): void {
  chartWidth = Number.isFinite(width) && width > 0 ? width : null;
}

export function getGanttChartWidth(): number | null {
  return chartWidth;
}

/**
 * Max. scrollbare grenzen (fase 2.8a QA, fix 2): `setScroll` klemde `scrollX`/`scrollY` alleen
 * naar beneden (`>= 0`), zonder bovengrens — een taakbalk-laag die volledig verdwijnt na een
 * (per ongeluk) verticale overscroll (bv. platte wheel-scroll in "position"-modus buiten de
 * rechtsboven-hoek, of horizontaal scrollen na een extreme zoom-uit/-in-cyclus) kwam daardoor
 * NOOIT meer in beeld terug — geen enkele render-pass herstelde het, want er was simpelweg geen
 * geldige boventgrens om naar terug te klemmen. GanttCanvas registreert bij elke render de
 * werkelijke inhoudsgrenzen (rijen×rowHeight, totale dagbreedte×zoom) zodat `setScroll` daar
 * altijd binnen blijft. Headless (tests): beide blijven null → geen bovengrens (ongewijzigd
 * gedrag, zelfde precedent als `chartWidth` hierboven).
 */
let maxScrollX: number | null = null;
let maxScrollY: number | null = null;

export function setGanttScrollBounds(bounds: { maxScrollX: number; maxScrollY: number }): void {
  maxScrollX = Number.isFinite(bounds.maxScrollX) ? Math.max(0, bounds.maxScrollX) : null;
  maxScrollY = Number.isFinite(bounds.maxScrollY) ? Math.max(0, bounds.maxScrollY) : null;
}

export function clampGanttScroll(x: number, y: number): { x: number; y: number } {
  return {
    x: maxScrollX !== null ? Math.min(x, maxScrollX) : x,
    y: maxScrollY !== null ? Math.min(y, maxScrollY) : y,
  };
}

/**
 * De laatst geregistreerde scrolbare grenzen (of `null` als er nog geen render-pass langskwam,
 * bv. headless). De wheel-handler leest `maxScrollY` om te bepalen of een verticale wheel-scroll
 * überhaupt iets kán bewegen: past het hele project verticaal in beeld (`maxScrollY <= 0`), dan
 * is verticaal scrollen een no-op en valt de handler terug op horizontaal — anders voelt het
 * gewone wiel "dood" (§keys-modus: plat wiel = verticaal per default).
 */
export function getGanttScrollBounds(): { maxScrollX: number | null; maxScrollY: number | null } {
  return { maxScrollX, maxScrollY };
}
