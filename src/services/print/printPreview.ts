import { Task } from '@/types/task';
import { Sequence } from '@/types/sequence';
import { WorkCalendar } from '@/types/calendar';
import { parseDate, formatDate, addCalendarDays, getWeekNumber, diffCalendarDays, isoDayOfWeek } from '@/utils/dateUtils';
import type { DateNotation } from '@/types/view';
import type { Draw2D } from '@/services/pdf/draw2d';
import { CanvasDraw2D } from '@/services/pdf/canvasDraw2d';
// Print-vriendelijk kleurschema — nu uit het centrale themapalet (audit C5/P17). De naam
// `PRINT_COLORS` blijft behouden zodat de teken-aanroepen ongewijzigd zijn; waarden zijn identiek.
import { PRINT_PALETTE as PRINT_COLORS } from '@/engine/renderer/themePalette';
import { dateToX as axisDateToX } from '@/engine/renderer/timeAxis';

// BASISmaten bij rapport-lettergrootte 100%. Niets tekent hier nog rechtstreeks mee: alle
// tekenhelpers rekenen met de geschaalde varianten uit {@link ReportMetrics}/{@link makeMetrics}.
const ROW_HEIGHT = 24;
const PROJECT_HEADER_HEIGHT = 64;
const TIMELINE_HEADER_HEIGHT = 44;
const TABLE_WIDTH = 450;
const FOOTER_HEIGHT = 50;
// Inter (gevendorde glyf-TTF, family 'InterPDF') eerst — deterministisch en inbedbaar zodat preview
// en de latere vector-export identieke measureText geven; systeem-stack als fallback zolang de
// FontFace nog niet geladen is (§5.1/K2 ontwerpdoc). De swap reflowt bewust bestaande exports.
const FONT_FAMILY = 'InterPDF, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

// Relatielijn-stub: de horizontale afstand die een relatielijn eerst rechtdoor loopt vóórdat hij
// verticaal afknikt (en spiegelbeeldig links van de opvolger bij de "omheen"-route). Dit is de
// x-positie van de VERTICALE knik, gerekend vanaf de rechterrand van de voorganger-balk.
const DEP_STUB = 6;
// Linkerpad van een taaklabel RECHTS van de balk. Bewust groter dan `DEP_STUB`: het label begint
// pas voorbij de verticale knik van de relatie die uit DEZE balk vertrekt (issue #25 punt 2).
// De koppeling is expliciet — verandert de stub, dan schuift het label mee. Let op: dit dekt alleen
// de EIGEN knik; willekeurige andere relatielijnen kunnen nog steeds over het label lopen. Daar is
// de halo voor ({@link fillTextWithHalo}).
const BAR_LABEL_GAP = DEP_STUB + 8;
// Kleine pad voor de LINKER fallback van een taaklabel; daar vertrekt geen eigen relatie-knik, dus
// daar is de grote gap niet nodig.
const BAR_LABEL_PAD_LEFT = 4;
// Horizontale pad (bij 100% rapport-lettergrootte) van de halo/knockout rondom een taaklabel:
// hoeveel de vrijgehouden papierkleur links en rechts buiten de tekst uitsteekt. Verticaal wordt de
// halo uit de fontgrootte afgeleid (zie `fillTextWithHalo`).
const BAR_LABEL_HALO_PAD_X = 2;

// Column definitions for the task table
const COL = {
  rowNum:    { x: 0,   w: 30  },
  wbs:       { x: 30,  w: 60  },
  name:      { x: 90,  w: 150 }, // flexible, actual end depends on remaining
  duration:  { x: 0,   w: 45  }, // positioned from right
  start:     { x: 0,   w: 70  },
  end:       { x: 0,   w: 70  },
  complete:  { x: 0,   w: 45  },
};

// Compute right-aligned column positions. `k` is de rapport-lettergrootteschaal (zie
// {@link ReportMetrics}); álle kolommaten schalen mee, want een grotere letter heeft een bredere
// kolom nodig. Bij k = 1 is dit rekenkundig exact de oude, ongeschaalde uitkomst.
function getColPositions(k: number) {
  const tableWidth = TABLE_WIDTH * k;
  const completeX = tableWidth - COL.complete.w * k;
  const endX = completeX - COL.end.w * k;
  const startX = endX - COL.start.w * k;
  const durationX = startX - COL.duration.w * k;
  const nameW = durationX - COL.name.x * k;
  return {
    rowNum: { x: COL.rowNum.x * k, w: COL.rowNum.w * k },
    wbs: { x: COL.wbs.x * k, w: COL.wbs.w * k },
    name: { x: COL.name.x * k, w: nameW },
    duration: { x: durationX, w: COL.duration.w * k },
    start: { x: startX, w: COL.start.w * k },
    end: { x: endX, w: COL.end.w * k },
    complete: { x: completeX, w: COL.complete.w * k },
  };
}

type ColPositions = ReturnType<typeof getColPositions>;

/**
 * De maatvoering van één rapport-render, geschaald met de instelbare rapport-lettergrootte
 * (issue #25 punt 4, rapport-helft). Alle tekenhelpers rekenen met dit object in plaats van met de
 * module-constanten hierboven — er mag geen pad overblijven waar nog een ONgeschaalde constante
 * gebruikt wordt, anders scheurt de layout bij een andere schaal.
 *
 * ==== WAAROM RELATIEF EN NIET UNIFORM (lees dit vóór je dit "vereenvoudigt") ====
 * Het hele rapport uniform opschalen is onder de fit-width-pagineerder een perfecte NO-OP. De
 * pagineerder schaalt de bron naar papier met `scale = printW / cw` (bronbreedte cw → printbreedte)
 * en berekent het aantal rijen per pagina als
 *     rows = ceil((ch − repeatH) / (printH / scale − repeatH)).
 * Vermenigvuldig je ALLE bronmaten met k, dan wordt de pagineerschaal `printW / (k·cw) = scale / k`
 * en krijgen in die rows-formule zowel `ch` en `repeatH` als `printH / scale` allemaal dezelfde
 * factor k — de uitkomst blijft exact gelijk. Op papier verandert er dus letterlijk niets: je zou
 * een knop bouwen die niets doet.
 *
 * Een rapport-lettergrootte is daarom alleen zinvol als RELATIEVE wijziging. We schalen daarom WEL:
 * alle fontgroottes, de rijhoogte, de beide kopstroken, de voettekst-strook, de tabelbreedte en de
 * kolombreedtes — en NIET de tijdlijn-zoom (px per dag). Netto op papier: tekst en tabel worden
 * echt groter, de chart-breedte krimpt navenant en er passen minder rijen op een vel. Precies wat
 * een gebruiker van "grotere letters" verwacht.
 *
 * Vuistregel voor losse offsets: alles in de TEKST-zones (project-kop, tijdschaal-kop, taaktabel,
 * voettekst, staaflabels) schaalt mee via {@link ReportMetrics.s}; de vaste decoraties in het
 * CHART-gebied (relatie-stub, pijlpunt, samenvattings-driehoekjes) blijven ongeschaald, want die
 * horen bij de ongeschaalde tijdlijn-geometrie.
 */
interface ReportMetrics {
  /** De schaalfactor zelf. 1 = 100% = byte-identiek aan het gedrag van vóór deze instelling. */
  k: number;
  /** Schaal een losse lengte/offset in de tekst-zones mee (paddings, baseline-correcties). */
  s(v: number): number;
  /** `font(9)` / `font(9, true)` → de CSS-fontstring met de geschaalde puntgrootte. */
  font(size: number, bold?: boolean): string;
  rowHeight: number;
  projectHeaderHeight: number;
  timelineHeaderHeight: number;
  totalHeaderHeight: number;
  tableWidth: number;
  footerHeight: number;
  cols: ColPositions;
}

/**
 * De aangeboden rapport-lettergroottes (percentage). Dit is de ENIGE bron van waarheid: de Select in
 * `ReportPanel` bouwt zijn opties hieruit en `makeMetrics` klemt op het bereik ervan. Stonden de
 * lijst en de klem los van elkaar, dan zou een waarde binnen de klem maar buiten de lijst (bv. 108)
 * wél geaccepteerd worden terwijl de Select 'm niet kan tonen — twee waarheden over hetzelfde.
 */
export const REPORT_FONT_SCALES = [90, 100, 110, 125] as const;

const REPORT_FONT_SCALE_MIN = Math.min(...REPORT_FONT_SCALES);
const REPORT_FONT_SCALE_MAX = Math.max(...REPORT_FONT_SCALES);

/**
 * Bouw de {@link ReportMetrics} voor een render. `reportFontScale` is een PERCENTAGE; ontbreekt hij
 * (of is hij onzin) dan geldt 100 ⇒ factor exact 1 ⇒ identieke output als voorheen. De klem volgt
 * {@link REPORT_FONT_SCALES}, zodat de engine precies accepteert wat de UI kan aanbieden.
 */
function makeMetrics(reportFontScale: number | undefined): ReportMetrics {
  const raw = reportFontScale ?? 100;
  const pct = Number.isFinite(raw)
    ? Math.max(REPORT_FONT_SCALE_MIN, Math.min(REPORT_FONT_SCALE_MAX, raw))
    : 100;
  const k = pct / 100;
  const projectHeaderHeight = PROJECT_HEADER_HEIGHT * k;
  const timelineHeaderHeight = TIMELINE_HEADER_HEIGHT * k;
  return {
    k,
    s: (v) => v * k,
    font: (size, bold) => `${bold ? 'bold ' : ''}${size * k}px ${FONT_FAMILY}`,
    rowHeight: ROW_HEIGHT * k,
    projectHeaderHeight,
    timelineHeaderHeight,
    // Bewust de SOM van de twee geschaalde hoogtes, niet `(PROJECT + TIMELINE) * k`: alleen zo valt
    // de kopstrook-grens gegarandeerd tot op de bit samen met waar de tijdschaal-kop eindigt.
    totalHeaderHeight: projectHeaderHeight + timelineHeaderHeight,
    tableWidth: TABLE_WIDTH * k,
    footerHeight: FOOTER_HEIGHT * k,
    cols: getColPositions(k),
  };
}

/** Paper sizes at 96 DPI (landscape) */
const PAPER_SIZES: Record<string, { w: number; h: number }> = {
  'A4-landscape': { w: 1123, h: 794 },
  'A4-portrait': { w: 794, h: 1123 },
  'A3-landscape': { w: 1587, h: 1123 },
  'A3-portrait': { w: 1123, h: 1587 },
  'A1-landscape': { w: 3179, h: 2245 },
  'A1-portrait': { w: 2245, h: 3179 },
};

export interface PrintOptions {
  showCritical: boolean;
  showFloat: boolean;
  showDeps: boolean;
  showWeekends: boolean;
  showLegend: boolean;
  showTaskNames: boolean;
  showCompletion: boolean;
  autoFit: boolean;
  customZoom: number;
  paperSize: 'A4' | 'A3' | 'A1';
  orientation: 'landscape' | 'portrait';
  companyName: string;
  labels?: {
    noTasks: string;
    printed: string;
    legend: { criticalPath: string; normal: string; milestone: string; summary: string; float: string; completion: string };
    tableHeaders: { rowNum: string; wbs: string; taskName: string; start: string; end: string; duration: string; completion: string };
    page: string;
    of: string;
  };
  localizedMonths?: string[];
  localizedMonthsShort?: string[];
  locale?: string;
  projectStartDate?: string;
  projectEndDate?: string;
  projectAuthor?: string;
  /** Datumnotatie (taak #53) voor de header- en tabel-datums; ontbreekt ⇒ dd-mm-jjjj. */
  dateNotation?: DateNotation;
  /**
   * Aantal paginabreedtes waarover de tijdlijn in de export uitgesmeerd wordt (issue #25 punt 5).
   * Beïnvloedt alleen de auto-fit-zoom hieronder (bij een handmatige zoom bepaalt de gebruiker de
   * breedte al zelf); de feitelijke tegeling gebeurt in de pagineerder, die hetzelfde getal als
   * `timelineColumns` moet krijgen. Default 1 = oud gedrag (alles op één paginabreedte).
   */
  timelineColumns?: number;
  /**
   * Lettergrootte van het GEGENEREERDE RAPPORT als percentage (issue #25 punt 4). 100 (of
   * ontbrekend) = het oude gedrag, byte-identiek. Werkt bewust RELATIEF: tekst, rijhoogtes,
   * kopstroken en tabelbreedte schalen mee, de tijdlijn-zoom niet — zie de uitgebreide afleiding
   * bij {@link ReportMetrics}, want uniform schalen zou onder de fit-width-pagineerder niets doen.
   */
  reportFontScale?: number;
}

interface PrintTask extends Task {
  _depth?: number;
}

/**
 * Format een datum volgens de datumnotatie-instelling (taak #53). Zelfde reorder-semantiek als
 * `displayDate` in @/utils/displayDate, maar bewust een kleine lokale kopie zodat deze pure
 * print-service niet de React/zustand-store-hook hoeft te importeren. Ontbreekt de notatie ⇒
 * dd-mm-jjjj (ongewijzigd oud gedrag).
 */
function formatDutchDate(d: Date, notation: DateNotation = 'dmy'): string {
  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = String(d.getUTCFullYear());
  switch (notation) {
    case 'mdy': return `${month}-${day}-${year}`;
    case 'ymd': return `${year}-${month}-${day}`;
    default:    return `${day}-${month}-${year}`;
  }
}

/** Format duration as "15d" */
function formatDuration(days: number): string {
  return `${days}d`;
}

/** Format completion as "75%" */
function formatCompletion(completion: number): string {
  return `${Math.round(completion * 100)}%`;
}

/**
 * Kort `text` in met een ellipsis ('…') zodat het binnen `maxWidth` (in dezelfde px-eenheid als
 * `d2d.measureText`, d.w.z. de logische/CSS-px van de huidige transform) past. Verwacht dat
 * `d2d.font` al is ingesteld. Geeft '' terug als er geen ruimte is. Wordt gebruikt om tekst nooit
 * over een kolomrand/canvasrand te laten lopen (klachten 4 en 7).
 */
function fitText(d2d: Draw2D, text: string, maxWidth: number): string {
  if (maxWidth <= 0) return '';
  if (d2d.measureText(text).width <= maxWidth) return text;
  const ellipsis = '…';
  // Binaire zoektocht naar de langste prefix die met ellipsis nog past.
  let lo = 0;
  let hi = text.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (d2d.measureText(text.slice(0, mid) + ellipsis).width <= maxWidth) lo = mid;
    else hi = mid - 1;
  }
  if (lo === 0) return d2d.measureText(ellipsis).width <= maxWidth ? ellipsis : '';
  return text.slice(0, lo) + ellipsis;
}

/**
 * Teken tekst met een HALO/KNOCKOUT: eerst een rechthoekje in de papierkleur precies achter de
 * tekst, daarna de tekst zelf. Waar een relatielijn over het label loopt wordt hij dus onderbroken,
 * en blijft de taaknaam leesbaar; overal daarbuiten blijft de lijn gewoon zichtbaar.
 *
 * ==== WAAROM EEN RECHTHOEK EN GEEN `strokeText`-CONTOUR (bewuste keuze, niet vergeten) ====
 * De klassieke halo is `strokeText` in de achtergrondkleur onder de `fillText` — dat volgt de
 * glyf-contouren en knipt dus minder weg. Die kan hier niet:
 *   1. `strokeText` zit NIET in de {@link Draw2D}-abstractie, en die abstractie heeft twee backends.
 *      De raster-backend zou 'm zo doorgeven, maar de vector-backend (`pdfVectorDraw2d.ts`) heeft
 *      DRIE tekst-paden (Latijns snelpad, RTL/bidi-shaping, CJK-runs) die elk hun eigen glyph- en
 *      matrix-emissie doen; stroke-modus zou in alle drie gedupliceerd moeten worden.
 *   2. Erger: een `strokeText` in de PDF is nóg een tekst-object. Elke taaknaam zou dan twee keer in
 *      de tekstlaag staan en dus twee keer uit een kopieer-/zoekactie komen — precies het probleem
 *      dat de vector-export elders (fase 2.1) bewust vermijdt.
 * Een oplossing die alleen in de raster-preview werkt is geen oplossing: preview en export moeten
 * WYSIWYG blijven. `fillRect` + `measureText` zitten wél in beide backends en worden er al volop
 * gebruikt, dus de rechthoek landt in preview én vector-PDF identiek. Prijs: hij knipt een strak
 * blokje uit de achtergrond (rasterlijnen/weekendarcering) i.p.v. de glyf-contour te volgen — voor
 * een leesbaar label op papier een prima ruil, en het maakt labels boven arcering meteen rustiger.
 *
 * In de vector-PDF klopt de z-volgorde vanzelf: de rechthoek is een VORM (die gaan in het gedeelde
 * Form-XObject, in tekenvolgorde — dus ná de relatielijnen, mits deze functie ook ná `drawDependencies`
 * wordt aangeroepen), en tekst wordt daar altijd bovenop het XObject geëmit.
 *
 * @param x     ankerpunt; bij align 'left' de linkerrand van de tekst, bij 'right' de rechterrand
 * @param y     baseline-y (verwacht `textBaseline === 'alphabetic'`)
 * @param sizePx  de GESCHAALDE fontgrootte in px (`m.s(9)`), voor de hoogte van de halo
 */
function fillTextWithHalo(
  d2d: Draw2D,
  m: ReportMetrics,
  text: string,
  x: number,
  y: number,
  align: 'left' | 'right',
  color: string,
  sizePx: number,
): void {
  if (!text) return;
  const width = d2d.measureText(text).width;
  const padX = m.s(BAR_LABEL_HALO_PAD_X);
  // Verticale extent rond de alfabetische baseline: ruim boven de hoogste ascender (0,85 em) en
  // onder de diepste descender (0,25 em) van Inter. Bewust uit de fontgrootte afgeleid en niet uit
  // een `measureText`-actualBoundingBox: die zit niet in de `Draw2D`-abstractie (en zou per backend
  // verschillen), terwijl deze benadering in beide backends per definitie identiek uitvalt.
  const top = y - sizePx * 0.85;
  const height = sizePx * 1.1;
  const left = (align === 'right' ? x - width : x) - padX;

  d2d.fillStyle = PRINT_COLORS.bg;
  d2d.fillRect(left, top, width + 2 * padX, height);

  d2d.fillStyle = color;
  d2d.textAlign = align;
  d2d.fillText(text, x, y);
}

/**
 * Teken een taaknaam-label bij een staaf (klachten 4b + 7). Probeert rechts van de staaf; loopt het
 * daar voorbij de canvasrand, dan wordt het links van de staaf getekend (rechts-uitgelijnd,
 * eindigend net vóór de staaf). Past het ook links niet, dan wordt het afgekort met '…' aan de kant
 * met de meeste ruimte. Zo valt een label nooit voorbij `canvasWidth` en overlapt het minder met
 * naburige staven.
 *
 * Elk label krijgt een halo/knockout ({@link fillTextWithHalo}) omdat de relatielijnen ONDER de
 * labels door lopen; zie de tekenvolgorde in `renderReport`.
 *
 * @param barRightX  x van de rechterrand van de staaf (incl. eventuele speling-indicator)
 * @param barLeftX   x van de linkerrand van de staaf
 * @param y          baseline-y voor de tekst (textBaseline blijft 'alphabetic')
 * @param fontSize   BASIS-fontgrootte (ongeschaald, zoals bij `m.font`); de helper schaalt zelf
 */
function drawBarLabel(
  d2d: Draw2D,
  m: ReportMetrics,
  name: string,
  barRightX: number,
  barLeftX: number,
  y: number,
  canvasWidth: number,
  color: string,
  fontSize: number,
  bold?: boolean,
) {
  const rightMargin = 10;
  d2d.font = m.font(fontSize, bold);
  d2d.fillStyle = color;
  d2d.textBaseline = 'alphabetic';
  const sizePx = m.s(fontSize);
  // Rechts: voorbij de verticale knik van de EIGEN uitgaande relatie beginnen (`BAR_LABEL_GAP` >
  // `DEP_STUB`), links de kleine pad — daar vertrekt geen eigen relatie-knik (issue #25 punt 2).
  // Dat houdt het label vrij van z'n eigen lijn; lijnen van ANDERE relaties kunnen er nog steeds
  // overheen lopen, en daarvoor is de halo.
  //
  // `BAR_LABEL_GAP`/`BAR_LABEL_PAD_LEFT` schalen bewust NIET mee met de rapport-lettergrootte: de
  // gap bestaat alleen om vrij te blijven van de verticale relatie-knik, en die knik (`DEP_STUB`)
  // zit in de ongeschaalde chart-geometrie. Zou de gap wél meeschalen, dan verbrak dat de expliciete
  // koppeling `BAR_LABEL_GAP = DEP_STUB + 8` en schoof het label bij 125% nodeloos van z'n staaf af.
  const rightStart = barRightX + BAR_LABEL_GAP;
  const rightAvail = canvasWidth - rightMargin - rightStart;
  const leftEnd = barLeftX - BAR_LABEL_PAD_LEFT;
  const leftAvail = leftEnd - m.tableWidth; // chart begint bij de (geschaalde) tabelbreedte
  const textWidth = d2d.measureText(name).width;

  if (textWidth <= rightAvail) {
    fillTextWithHalo(d2d, m, name, rightStart, y, 'left', color, sizePx);
  } else if (textWidth <= leftAvail) {
    fillTextWithHalo(d2d, m, name, leftEnd, y, 'right', color, sizePx);
  } else if (rightAvail >= leftAvail) {
    fillTextWithHalo(d2d, m, fitText(d2d, name, rightAvail), rightStart, y, 'left', color, sizePx);
  } else {
    fillTextWithHalo(d2d, m, fitText(d2d, name, leftAvail), leftEnd, y, 'right', color, sizePx);
  }
}

/**
 * Het resultaat van een print-render: de logische (CSS-px) afmetingen + de bevroren-kolombreedte.
 */
export interface RenderReportResult {
  width: number;
  height: number;
  /**
   * Breedte van de linker taaktabel-zone (de "frozen" naam-/info-kolommen links van het
   * Gantt-gebied), in LOGISCHE/CSS-px — dezelfde eenheid als `width`/`height` hierboven en als de
   * paginamaat die de PDF-laag (`miniPdf.canvasToPdfBytes`) uit `canvas.style.width` afleidt. Bewust
   * NIET in raster/device-px (`canvas.width` = logisch × devicePixelRatio): een andere golf gebruikt
   * dit om de tabelkolom per pagina te herhalen en werkt daarbij in hetzelfde logische coördinaten-
   * stelsel als de rest van het return-object; de raster-schaal komt daar apart bij.
   */
  tableWidth: number;
  /**
   * Hoogte (LOGISCHE/CSS-px, gemeten vanaf y = 0) van de kopstrook bovenaan de render: project-kop
   * + tijdschaal-kop. De pagineerders herhalen precies deze strook op elke pagina wanneer daarom
   * gevraagd wordt (issue #25 punt 1). Staat hier zodat de aanroeper de interne constanten van deze
   * module niet hoeft te kennen. 0 = geen herhaalbare kop (bv. de lege-project-render).
   */
  headerHeight: number;
}

/**
 * Render het print-rapport tegen een {@link Draw2D}-backend die door `makeDraw2D` geleverd wordt.
 * Alle teken-logica is backend-agnostisch; `makeDraw2D(logicalW, logicalH)` wordt exact één keer
 * aangeroepen zodra de logische afmetingen bekend zijn (vóór er getekend wordt) en de teruggegeven
 * `Draw2D` ontvangt vervolgens alle teken-aanroepen. Zo delen de raster-preview (canvas-backend) en
 * de vector-export (pdf-lib-backend) exact dezelfde renderer.
 *
 * @returns De logische (CSS-px) afmetingen + de bevroren-kolombreedte ({@link RenderReportResult}).
 */
export function renderReport(
  makeDraw2D: (logicalW: number, logicalH: number) => Draw2D,
  tasks: Task[],
  sequences: Sequence[],
  calendar: WorkCalendar,
  projectName: string,
  options: PrintOptions,
): RenderReportResult {
  // Alle maatvoering loopt via dit object — de tekenhelpers lezen de module-constanten niet meer
  // rechtstreeks (zie {@link ReportMetrics} voor het waarom van relatief-schalen).
  const m = makeMetrics(options.reportFontScale);

  // Flatten and compute depth
  const flatTasks: PrintTask[] = [];
  const depthMap = new Map<string, number>();

  const addRecursive = (task: Task, depth: number) => {
    depthMap.set(task.id, depth);
    flatTasks.push(task);
    const children = tasks.filter(t => t.parentId === task.id);
    for (const child of children) {
      addRecursive(child, depth + 1);
    }
  };

  const roots = tasks.filter(t => !t.parentId);
  for (const root of roots) {
    addRecursive(root, 0);
  }
  for (const task of tasks) {
    if (!flatTasks.find(t => t.id === task.id)) {
      depthMap.set(task.id, 0);
      flatTasks.push(task);
    }
  }

  if (flatTasks.length === 0) {
    const d2d = makeDraw2D(600, 200);
    d2d.fillStyle = PRINT_COLORS.bg;
    d2d.fillRect(0, 0, 600, 200);
    d2d.fillStyle = PRINT_COLORS.textSecondary;
    d2d.font = m.font(14);
    d2d.textAlign = 'center';
    d2d.fillText(options.labels?.noTasks ?? 'No tasks to display', 300, 100);
    // Geen kop-/tijdschaalstrook in de lege-staat (alleen een centrale melding) ⇒ niets te herhalen.
    // Het meldingsvak zelf houdt z'n vaste 600×200; alleen de tekst erin volgt de schaal.
    return { width: 600, height: 200, tableWidth: m.tableWidth, headerHeight: 0 };
  }

  // Compute date range
  let minDate = new Date(8640000000000000);
  let maxDate = new Date(0);
  for (const t of flatTasks) {
    const s = parseDate(t.time.earlyStart || t.time.scheduleStart);
    const f = parseDate(t.time.earlyFinish || t.time.scheduleFinish);
    if (s < minDate) minDate = s;
    if (f > maxDate) maxDate = f;

    // Include float in date range
    if (options.showFloat && t.time.totalFloat > 0) {
      const floatEnd = addCalendarDays(f, t.time.totalFloat);
      if (floatEnd > maxDate) maxDate = floatEnd;
    }
  }

  // Add padding days
  minDate = addCalendarDays(minDate, -7);
  maxDate = addCalendarDays(maxDate, 14);

  const totalDays = diffCalendarDays(minDate, maxDate);

  // Calculate zoom: auto-fit or custom
  const paperKey = `${options.paperSize}-${options.orientation}`;
  const paper = PAPER_SIZES[paperKey] || PAPER_SIZES['A3-landscape'];
  const margins = 20; // left + right margins in px
  // Aantal paginabreedtes waarover de tijdlijn uitgesmeerd mag worden (issue #25 punt 5).
  const timelineColumns = Math.max(1, Math.floor(options.timelineColumns ?? 1));
  // Beschikbare chart-breedte over N papierbreedtes.
  //
  // AFLEIDING — de pagineerder tekent bij N fit-width-kolommen in totaal `canvasWidth +
  // (N-1)·tableWidth` bron-px (de naam-kolom wordt op elke volgende pagina herhaald) op N
  // paginabreedtes. Wil je dat die "virtuele" breedte precies N pagina's vult op ~1:1-schaal, dan:
  //     tableWidth + chartWidth + (N-1)·tableWidth = N·(paper.w - margins)
  //  ⇒  chartWidth = N·(paper.w - margins) - N·tableWidth = N·(paper.w - tableWidth - margins)
  // De N herhalingen van de naam-kolom zijn dus AL verrekend doordat we `tableWidth` binnen de
  // factor N aftrekken; er nog eens `tableWidth·(N-1)` bij optellen zou ze dubbel tellen en de
  // tijdlijn juist te breed (en dus na schaling te klein) maken. Bij N = 1 is dit exact de oude waarde.
  // `m.tableWidth` is de GESCHAALDE tabelbreedte: bij een grotere rapport-letter neemt de tabel meer
  // papier in en houdt de tijdlijn navenant minder over — precies de bedoelde ruil.
  const availableChartWidth = (paper.w - m.tableWidth - margins) * timelineColumns;

  let zoom: number;
  if (options.autoFit && totalDays > 0) {
    zoom = availableChartWidth / totalDays;
    // De klem blijft ONGESCHAALD: de tijdlijn-zoom (px per dag) is precies de maat die NIET meeschaalt,
    // anders zou het rapport uniform schalen en op papier niets veranderen (zie {@link ReportMetrics}).
    zoom = Math.max(5, Math.min(40, zoom));
  } else {
    zoom = options.customZoom || 22;
  }

  const chartWidth = totalDays * zoom;
  const canvasWidth = m.tableWidth + chartWidth;
  const canvasHeight = m.totalHeaderHeight + flatTasks.length * m.rowHeight + m.footerHeight;

  // Build holiday set
  const holidaySet = new Set<string>();
  for (const h of calendar.holidays) {
    const start = parseDate(h.startDate);
    const end = parseDate(h.endDate);
    const days = diffCalendarDays(start, end);
    for (let i = 0; i <= days; i++) {
      holidaySet.add(formatDate(addCalendarDays(start, i)));
    }
  }

  // Verkrijg de Draw2D-backend zodra de logische afmetingen bekend zijn (canvas-backend neemt de
  // dpr-scale + maat-setup over; vector-backend werkt 1:1 in logische px).
  const d2d = makeDraw2D(canvasWidth, canvasHeight);

  // Helper: date to X. Gedeeld met GanttRenderer/HistogramRenderer via `timeAxis.dateToX`
  // (issue #21 punt 5, fase 0-consolidatie); print heeft geen scrollX ⇒ `scrollX=0`. `minDate`/
  // `date` komen hier altijd uit `parseDate` (middernacht UTC), dus de fractionele
  // `daysFromStart`-berekening in `axisDateToX` is voor print altijd een geheel getal — identiek
  // aan de vroegere `diffCalendarDays(minDate, date) * zoom` (die intern ook afrondt, maar op een
  // al-geheel verschil is dat een no-op).
  const dateToX = (date: Date) => axisDateToX(date, minDate, m.tableWidth, zoom, 0);
  const chartTop = m.totalHeaderHeight;
  const chartBottom = canvasHeight - m.footerHeight;
  const rowToY = (i: number) => m.totalHeaderHeight + i * m.rowHeight;

  const cols = m.cols;

  // ==================== DRAW ====================

  // Background
  d2d.fillStyle = PRINT_COLORS.bg;
  d2d.fillRect(0, 0, canvasWidth, canvasHeight);

  // ---- PROJECT HEADER BOX ----
  drawProjectHeader(d2d, m, canvasWidth, projectName, options);

  // ---- GANTT CHART AREA ----

  // Grid background - weekend/holiday shading
  if (options.showWeekends) {
    for (let i = 0; i < totalDays; i++) {
      const date = addCalendarDays(minDate, i);
      const x = dateToX(date);
      const dow = isoDayOfWeek(date);
      const dateStr = formatDate(date);
      const isHoliday = holidaySet.has(dateStr);
      const isWeekend = dow === 6 || dow === 7;

      if (isHoliday) {
        d2d.fillStyle = PRINT_COLORS.gridHoliday;
        d2d.fillRect(x, chartTop, zoom, chartBottom - chartTop);
      } else if (isWeekend) {
        d2d.fillStyle = PRINT_COLORS.gridWeekend;
        d2d.fillRect(x, chartTop, zoom, chartBottom - chartTop);
      }
    }
  }

  // Alternating row backgrounds in chart area
  for (let i = 0; i < flatTasks.length; i++) {
    if (i % 2 === 0) {
      d2d.fillStyle = 'rgba(249, 250, 251, 0.3)';
      d2d.fillRect(m.tableWidth, rowToY(i), chartWidth, m.rowHeight);
    }
  }

  // Vertical grid lines
  for (let i = 0; i < totalDays; i++) {
    const date = addCalendarDays(minDate, i);
    const x = dateToX(date);
    const dow = isoDayOfWeek(date);

    d2d.strokeStyle = PRINT_COLORS.grid;
    d2d.lineWidth = dow === 1 ? 0.8 : 0.2;
    d2d.beginPath();
    d2d.moveTo(x, chartTop);
    d2d.lineTo(x, chartBottom);
    d2d.stroke();
  }

  // Horizontal grid lines in chart area
  for (let i = 0; i <= flatTasks.length; i++) {
    const y = rowToY(i);
    d2d.strokeStyle = PRINT_COLORS.grid;
    d2d.lineWidth = 0.3;
    d2d.beginPath();
    d2d.moveTo(m.tableWidth, y);
    d2d.lineTo(canvasWidth, y);
    d2d.stroke();
  }

  // Today line
  const today = new Date();
  const todayX = dateToX(today);
  if (todayX > m.tableWidth && todayX < canvasWidth) {
    d2d.strokeStyle = PRINT_COLORS.today;
    d2d.lineWidth = 1.5;
    d2d.setLineDash([5, 3]);
    d2d.beginPath();
    d2d.moveTo(todayX, chartTop);
    d2d.lineTo(todayX, chartBottom);
    d2d.stroke();
    d2d.setLineDash([]);

    // "Today" label
    d2d.fillStyle = PRINT_COLORS.today;
    d2d.font = m.font(7, true);
    d2d.textAlign = 'center';
    d2d.fillText('Today', todayX, chartTop - m.s(2));
    d2d.textAlign = 'left';
  }

  // Task bars
  const barHeight = m.rowHeight * 0.55;
  const barOffset = (m.rowHeight - barHeight) / 2;

  // De taaknaam-labels worden hier alleen VERZAMELD en pas ná de relatiepijlen getekend — zie de
  // uitleg bij `drawDependencies` verderop. Eén job per label; de geometrie is op dat moment al
  // uitgerekend, dus uitstellen kost niets.
  interface BarLabelJob {
    name: string;
    /** x van de rechterrand van de staaf/ruit (incl. eventuele speling-indicator). */
    barRightX: number;
    /** x van de linkerrand van de staaf/ruit. */
    barLeftX: number;
    /** baseline-y van de tekst. */
    y: number;
    /** Vetgedrukt (alleen samenvattingstaken). */
    bold: boolean;
  }
  const barLabelJobs: BarLabelJob[] = [];

  for (let i = 0; i < flatTasks.length; i++) {
    const task = flatTasks[i];
    const y = rowToY(i) + barOffset;

    if (task.isMilestone) {
      // Milestone diamond
      const date = parseDate(task.time.earlyStart || task.time.scheduleStart);
      const x = dateToX(date) + zoom / 2;
      const cy = y + barHeight / 2;
      const size = barHeight * 0.45;

      d2d.fillStyle = PRINT_COLORS.milestone;
      d2d.beginPath();
      d2d.moveTo(x, cy - size);
      d2d.lineTo(x + size, cy);
      d2d.lineTo(x, cy + size);
      d2d.lineTo(x - size, cy);
      d2d.closePath();
      d2d.fill();

      // Task name label (rechts van de ruit, valt terug naar links/ellipsis bij de rand)
      if (options.showTaskNames) {
        barLabelJobs.push({ name: task.name, barRightX: x + size, barLeftX: x - size, y: cy + m.s(3), bold: false });
      }
    } else if (task.childIds.length > 0) {
      // Summary bracket bar
      const start = parseDate(task.time.earlyStart || task.time.scheduleStart);
      const end = parseDate(task.time.earlyFinish || task.time.scheduleFinish);
      const x1 = dateToX(start);
      const x2 = dateToX(end) + zoom;
      const width = Math.max(x2 - x1, 3);
      const barY = y + barHeight * 0.3;
      const barH = barHeight * 0.3;

      d2d.fillStyle = PRINT_COLORS.summary;
      d2d.fillRect(x1, barY, width, barH);

      // Left triangle
      d2d.beginPath();
      d2d.moveTo(x1, barY);
      d2d.lineTo(x1, barY + barH + 5);
      d2d.lineTo(x1 + 6, barY + barH);
      d2d.closePath();
      d2d.fill();

      // Right triangle
      d2d.beginPath();
      d2d.moveTo(x1 + width, barY);
      d2d.lineTo(x1 + width, barY + barH + 5);
      d2d.lineTo(x1 + width - 6, barY + barH);
      d2d.closePath();
      d2d.fill();

      // Task name label (rechts van de balk, valt terug naar links/ellipsis bij de rand)
      if (options.showTaskNames) {
        barLabelJobs.push({ name: task.name, barRightX: x1 + width, barLeftX: x1, y: y + barHeight / 2 + m.s(3), bold: true });
      }
    } else {
      // Normal task bar
      const start = parseDate(task.time.earlyStart || task.time.scheduleStart);
      const end = parseDate(task.time.earlyFinish || task.time.scheduleFinish);
      const x1 = dateToX(start);
      const x2 = dateToX(end) + zoom;
      const width = Math.max(x2 - x1, 3);
      const isCritical = task.time.isCritical && options.showCritical;
      const color = isCritical ? PRINT_COLORS.critical : PRINT_COLORS.normal;

      // Main bar with rounded corners
      d2d.fillStyle = color;
      d2d.roundRect(x1, y, width, barHeight, 3);
      d2d.fill();

      // Completion overlay (darker shade)
      if (options.showCompletion && task.time.completion > 0) {
        const progressWidth = width * task.time.completion;
        d2d.fillStyle = isCritical ? PRINT_COLORS.criticalDark : PRINT_COLORS.normalDark;
        d2d.roundRect(x1, y, progressWidth, barHeight, 3);
        d2d.fill();
      }

      // Float indicator
      if (options.showFloat && task.time.totalFloat > 0 && !task.time.isCritical) {
        const floatWidth = task.time.totalFloat * zoom;
        d2d.fillStyle = PRINT_COLORS.float + '40';
        d2d.roundRect(x2, y + barHeight * 0.2, floatWidth, barHeight * 0.6, 2);
        d2d.fill();
      }

      // Task name label (rechts van de balk + eventuele speling; valt terug naar links/ellipsis bij de rand)
      if (options.showTaskNames) {
        const hasFloat = options.showFloat && task.time.totalFloat > 0 && !task.time.isCritical;
        const barRightX = x2 + (hasFloat ? task.time.totalFloat * zoom : 0);
        barLabelJobs.push({ name: task.name, barRightX, barLeftX: x1, y: y + barHeight / 2 + m.s(3), bold: false });
      }
    }
  }

  // ---- TEKENVOLGORDE IN HET CHART-GEBIED: staven → relatiepijlen → taaklabels ----
  //
  // 1. Relatiepijlen ná de staven (issue #25 punt 3). Stonden ze ervóór, dan schilderde elke balk
  //    die een lijn kruist die lijn gewoon weg; nu liggen de lijnen bovenop en zijn ze altijd
  //    zichtbaar.
  // 2. Maar de taaklabels moeten wéér boven de lijnen. Hier stond eerder de redenering dat dat niet
  //    hoefde omdat een label dankzij `BAR_LABEL_GAP` pas voorbij de verticale knik begint — dat
  //    argument gaat alleen op voor de knik van de EIGEN voorganger. Een relatie tussen twee heel
  //    andere taken (t1 → t3) knikt verticaal dwars door de rij van t2 heen en streepte het label
  //    van t2 zo doormidden. Daarom worden de labels nu als laatste getekend, met een halo/knockout
  //    in de papierkleur ({@link fillTextWithHalo}): de tekst blijft leesbaar wáár een lijn eroverheen
  //    zou lopen, en de lijn blijft zichtbaar overal daarbuiten.
  //
  // Dit geldt voor beide backends: in de raster-preview volgt de z-volgorde uit de tekenvolgorde
  // hieronder, en in de vector-PDF komen de halo-rechthoeken (vormen, dus in het Form-XObject) ná de
  // lijnen terwijl de tekst sowieso bovenop het XObject wordt geëmit — zelfde eindbeeld.
  if (options.showDeps) {
    drawDependencies(d2d, m, flatTasks, sequences, dateToX, rowToY, zoom);
  }

  for (const job of barLabelJobs) {
    drawBarLabel(d2d, m, job.name, job.barRightX, job.barLeftX, job.y, canvasWidth, PRINT_COLORS.text, 9, job.bold);
  }

  // ---- TIMELINE HEADER ----
  drawTimelineHeader(d2d, m, canvasWidth, minDate, totalDays, zoom, dateToX, options);

  // ---- TASK TABLE ----
  drawTaskTable(d2d, m, flatTasks, depthMap, canvasHeight, cols, options);

  // ---- FOOTER ----
  drawFooter(d2d, m, canvasWidth, canvasHeight, projectName, options);

  // Tabelbreedte en kophoogte gaan GESCHAALD terug: de pagineerder bevriest exact deze kolom en
  // herhaalt exact deze strook per pagina, dus die moeten de rapport-lettergrootte volgen.
  return { width: canvasWidth, height: canvasHeight, tableWidth: m.tableWidth, headerHeight: m.totalHeaderHeight };
}


/**
 * Render het print-rapport naar een canvas (raster/preview). Dunne wrapper over {@link renderReport}
 * met de canvas-backend: alle teken-logica leeft in `renderReport`, hier wordt alleen de Draw2D-
 * backend gekozen. Geeft de logische (CSS) afmetingen terug.
 *
 * `renderScale` overschrijft de raster-vs-logisch-multiplier (`canvas.width = logicalWidth *
 * renderScale`); default `window.devicePixelRatio || 2` zodat de on-screen preview z'n bestaande
 * gedrag houdt. De PDF-raster-export geeft een hogere vaste schaal door (zie `computeHighResScale`
 * in `@/utils/miniPdf`) zodat de geëxporteerde rasterresolutie niet afhangt van de schermdichtheid
 * van de exporterende gebruiker — een 1x/headless browser zou anders een wazig 96-DPI-beeld inbedden.
 */
export function renderPrintCanvas(
  canvas: HTMLCanvasElement,
  tasks: Task[],
  sequences: Sequence[],
  calendar: WorkCalendar,
  projectName: string,
  options: PrintOptions,
  renderScale?: number,
): RenderReportResult {
  const dpr = renderScale ?? (window.devicePixelRatio || 2);
  return renderReport(
    (w, h) => new CanvasDraw2D(canvas, w, h, dpr),
    tasks, sequences, calendar, projectName, options,
  );
}


/** Draw the project header box at the top of the page */
function drawProjectHeader(
  d2d: Draw2D,
  m: ReportMetrics,
  canvasWidth: number,
  projectName: string,
  options: PrintOptions,
) {
  const hh = m.projectHeaderHeight;
  // De regel-y's en de horizontale pad schalen mee met de strookhoogte; bleven ze vast, dan zouden
  // de drie regels bij 125% over elkaar heen lopen (regelafstand 14 px bij een 11,25 px-letter).
  const pad = m.s(10);

  // Background
  d2d.fillStyle = PRINT_COLORS.bg;
  d2d.fillRect(0, 0, canvasWidth, hh);

  // Border
  d2d.strokeStyle = PRINT_COLORS.borderDark;
  d2d.lineWidth = 1;
  d2d.strokeRect(0.5, 0.5, canvasWidth - 1, hh - 1);

  // Right-aligned branding — eerst tekenen + meten, zodat we de projectnaam ernaast kunnen inkorten
  // en overlap voorkomen (klacht 7).
  const brandText = 'Open Planner Studio';
  d2d.fillStyle = PRINT_COLORS.textSecondary;
  d2d.font = m.font(8);
  d2d.textBaseline = 'middle';
  d2d.textAlign = 'right';
  d2d.fillText(brandText, canvasWidth - pad, m.s(16));
  const brandWidth = d2d.measureText(brandText).width;

  // Project name (large, bold) — inkorten zodat hij niet tot in de branding loopt
  d2d.fillStyle = PRINT_COLORS.text;
  d2d.font = m.font(14, true);
  d2d.textBaseline = 'middle';
  d2d.textAlign = 'left';
  const nameMaxW = (canvasWidth - pad - brandWidth - m.s(12)) - pad;
  d2d.fillText(fitText(d2d, projectName, nameMaxW), pad, m.s(16));

  // Row 2: Company | Author | Print date | Version
  d2d.font = m.font(9);
  d2d.fillStyle = PRINT_COLORS.textSecondary;
  const row2Y = m.s(34);
  const rowMaxW = canvasWidth - 2 * pad; // binnen de paginabreedte houden (klacht 7)

  const companyLabel = options.companyName || '';
  const authorLabel = options.projectAuthor || '';
  const printLocale = options.locale ?? 'nl';
  const printDate = new Date().toLocaleDateString(printLocale, { day: '2-digit', month: 'long', year: 'numeric' });

  let row2Text = '';
  if (companyLabel) row2Text += companyLabel;
  if (authorLabel) row2Text += (row2Text ? '  |  ' : '') + authorLabel;
  row2Text += (row2Text ? '  |  ' : '') + `${options.labels?.printed ?? 'Printed:'} ${printDate}`;

  d2d.fillText(fitText(d2d, row2Text, rowMaxW), pad, row2Y);

  // Row 3: Project dates and duration
  const row3Y = m.s(48);
  let row3Text = '';
  if (options.projectStartDate) {
    const sd = parseDate(options.projectStartDate);
    row3Text += `Start: ${formatDutchDate(sd, options.dateNotation)}`;
  }
  if (options.projectEndDate) {
    const ed = parseDate(options.projectEndDate);
    row3Text += (row3Text ? '  |  ' : '') + `Eind: ${formatDutchDate(ed, options.dateNotation)}`;
  }
  if (options.projectStartDate && options.projectEndDate) {
    const sd = parseDate(options.projectStartDate);
    const ed = parseDate(options.projectEndDate);
    const dur = diffCalendarDays(sd, ed);
    row3Text += `  |  Duur: ${dur}d`;
  }

  d2d.fillText(fitText(d2d, row3Text, rowMaxW), pad, row3Y);

  d2d.textAlign = 'left';
  d2d.textBaseline = 'alphabetic';
}


/** Draw the timeline header with month/week/day rows */
function drawTimelineHeader(
  d2d: Draw2D,
  m: ReportMetrics,
  canvasWidth: number,
  minDate: Date,
  totalDays: number,
  zoom: number,
  dateToX: (d: Date) => number,
  options: PrintOptions,
) {
  const top = m.projectHeaderHeight;
  const h = m.timelineHeaderHeight;
  const monthRowH = h / 2;
  const weekRowH = h / 2;

  // Background
  d2d.fillStyle = PRINT_COLORS.headerBg;
  d2d.fillRect(0, top, canvasWidth, h);

  // Bottom border
  d2d.strokeStyle = PRINT_COLORS.border;
  d2d.lineWidth = 1;
  d2d.beginPath();
  d2d.moveTo(0, top + h);
  d2d.lineTo(canvasWidth, top + h);
  d2d.stroke();

  // Mid border between month and week rows
  d2d.strokeStyle = PRINT_COLORS.grid;
  d2d.lineWidth = 0.5;
  d2d.beginPath();
  d2d.moveTo(m.tableWidth, top + monthRowH);
  d2d.lineTo(canvasWidth, top + monthRowH);
  d2d.stroke();

  const months = options.localizedMonths ?? ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

  let lastMonth = -1;
  let lastWeek = -1;
  // Rechterrand (x) van het laatst getekende maand-/weeklabel, om overlap te vermijden (klacht 7).
  let lastMonthLabelRight = -Infinity;
  let lastWeekLabelRight = -Infinity;

  for (let i = 0; i < totalDays; i++) {
    const date = addCalendarDays(minDate, i);
    const x = dateToX(date);
    const month = date.getUTCMonth();
    const weekNum = getWeekNumber(date);
    const dow = isoDayOfWeek(date);

    // Month headers (capitalize first letter)
    if (month !== lastMonth) {
      lastMonth = month;
      const monthName = months[month];
      const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      const label = `${capitalizedMonth} ${date.getUTCFullYear()}`;

      // Vertical separator
      d2d.strokeStyle = PRINT_COLORS.border;
      d2d.lineWidth = 0.5;
      d2d.beginPath();
      d2d.moveTo(x, top);
      d2d.lineTo(x, top + monthRowH);
      d2d.stroke();

      // Alleen het label tekenen als het niet over het vorige maandlabel heen loopt (klacht 7);
      // liever een gat dan over-elkaar-lopende tekst.
      // Label-offsets/-tussenruimtes horen bij de TEKST en schalen dus mee.
      d2d.font = m.font(10, true);
      const monthLabelStart = x + m.s(4);
      if (monthLabelStart >= lastMonthLabelRight + m.s(6)) {
        d2d.fillStyle = PRINT_COLORS.text;
        d2d.textBaseline = 'middle';
        d2d.textAlign = 'left';
        d2d.fillText(label, monthLabelStart, top + monthRowH / 2);
        lastMonthLabelRight = monthLabelStart + d2d.measureText(label).width;
      }
    }

    // Week headers
    if (dow === 1 && weekNum !== lastWeek) {
      lastWeek = weekNum;

      // Vertical separator
      d2d.strokeStyle = PRINT_COLORS.grid;
      d2d.lineWidth = 0.5;
      d2d.beginPath();
      d2d.moveTo(x, top + monthRowH);
      d2d.lineTo(x, top + h);
      d2d.stroke();

      // Alleen tekenen als er ruimte is t.o.v. het vorige weeklabel (klacht 7).
      const weekLabel = `W${weekNum}`;
      const weekLabelStart = x + m.s(2);
      d2d.font = m.font(9);
      if (weekLabelStart >= lastWeekLabelRight + m.s(4)) {
        d2d.fillStyle = PRINT_COLORS.textSecondary;
        d2d.textAlign = 'left';
        d2d.textBaseline = 'middle';
        d2d.fillText(weekLabel, weekLabelStart, top + monthRowH + weekRowH / 2);
        lastWeekLabelRight = weekLabelStart + d2d.measureText(weekLabel).width;
      }
    }

    // Day numbers if zoom is large enough
    if (zoom > 15) {
      const dayNum = date.getUTCDate();
      if (dow !== 6 && dow !== 7) { // Skip weekend days for cleaner display
        d2d.fillStyle = PRINT_COLORS.textSecondary;
        d2d.font = m.font(7);
        d2d.textAlign = 'center';
        d2d.textBaseline = 'bottom';
        d2d.fillText(String(dayNum), x + zoom / 2, top + h - m.s(1));
      }
    }
  }

  // Table header area (left side of timeline header)
  d2d.fillStyle = PRINT_COLORS.headerBg;
  d2d.fillRect(0, top, m.tableWidth, h);

  // Table column headers
  const cols = m.cols;
  d2d.fillStyle = PRINT_COLORS.text;
  d2d.font = m.font(9, true);
  d2d.textBaseline = 'middle';
  d2d.textAlign = 'center';
  const headerY = top + h / 2;

  const th = options.labels?.tableHeaders;
  d2d.fillText(th?.rowNum ?? '#', cols.rowNum.x + cols.rowNum.w / 2, headerY);
  d2d.fillText(th?.wbs ?? 'WBS', cols.wbs.x + cols.wbs.w / 2, headerY);

  d2d.textAlign = 'left';
  d2d.fillText(th?.taskName ?? 'Taaknaam', cols.name.x + m.s(4), headerY);

  d2d.textAlign = 'center';
  d2d.fillText(th?.duration ?? 'Duur', cols.duration.x + cols.duration.w / 2, headerY);
  d2d.fillText(th?.start ?? 'Start', cols.start.x + cols.start.w / 2, headerY);
  d2d.fillText(th?.end ?? 'Einde', cols.end.x + cols.end.w / 2, headerY);
  d2d.fillText(th?.completion ?? 'Volt.', cols.complete.x + cols.complete.w / 2, headerY);

  // Column separator lines in header
  d2d.strokeStyle = PRINT_COLORS.border;
  d2d.lineWidth = 0.5;
  const colBorders = [cols.wbs.x, cols.name.x, cols.duration.x, cols.start.x, cols.end.x, cols.complete.x, m.tableWidth];
  for (const cx of colBorders) {
    d2d.beginPath();
    d2d.moveTo(cx, top);
    d2d.lineTo(cx, top + h);
    d2d.stroke();
  }

  // Bottom border for header
  d2d.strokeStyle = PRINT_COLORS.borderDark;
  d2d.lineWidth = 1;
  d2d.beginPath();
  d2d.moveTo(0, top + h);
  d2d.lineTo(m.tableWidth, top + h);
  d2d.stroke();

  d2d.textBaseline = 'alphabetic';
  d2d.textAlign = 'left';
}


/** Draw the task table (left side) */
function drawTaskTable(
  d2d: Draw2D,
  m: ReportMetrics,
  flatTasks: PrintTask[],
  depthMap: Map<string, number>,
  canvasHeight: number,
  cols: ColPositions,
  options: PrintOptions,
) {
  const chartBottom = canvasHeight - m.footerHeight;
  // Cel-padding: schaalt mee met de kolombreedtes, anders vreet een grotere letter de padding op.
  const cellPad = m.s(4);

  // Table background
  d2d.fillStyle = PRINT_COLORS.bg;
  d2d.fillRect(0, m.totalHeaderHeight, m.tableWidth, chartBottom - m.totalHeaderHeight);

  // Task rows
  for (let i = 0; i < flatTasks.length; i++) {
    const task = flatTasks[i];
    const y = m.totalHeaderHeight + i * m.rowHeight;
    const depth = depthMap.get(task.id) || 0;
    const textY = y + m.rowHeight / 2;
    // Inspringing per hiërarchieniveau schaalt mee: de naamkolom is breder geworden, dus een vaste
    // 12 px zou de boomstructuur bij een grote letter optisch platslaan.
    const indent = depth * m.s(12);
    const isSummary = task.childIds.length > 0;

    // Alternating row background
    if (i % 2 === 0) {
      d2d.fillStyle = PRINT_COLORS.rowEven;
      d2d.fillRect(0, y, m.tableWidth, m.rowHeight);
    }

    // Row border
    d2d.strokeStyle = PRINT_COLORS.grid;
    d2d.lineWidth = 0.3;
    d2d.beginPath();
    d2d.moveTo(0, y + m.rowHeight);
    d2d.lineTo(m.tableWidth, y + m.rowHeight);
    d2d.stroke();

    // Row number
    d2d.fillStyle = PRINT_COLORS.textSecondary;
    d2d.font = m.font(8);
    d2d.textAlign = 'right';
    d2d.textBaseline = 'middle';
    d2d.fillText(String(i + 1), cols.rowNum.x + cols.rowNum.w - cellPad, textY);

    // WBS
    d2d.fillStyle = PRINT_COLORS.textSecondary;
    d2d.font = m.font(8);
    d2d.textAlign = 'left';
    d2d.fillText(task.wbsCode || '', cols.wbs.x + cellPad, textY);

    // Name with indentation — afkorten met ellipsis i.p.v. hard clippen (klacht 4a)
    d2d.fillStyle = isSummary ? PRINT_COLORS.summary : PRINT_COLORS.text;
    d2d.font = m.font(9, isSummary);
    d2d.textAlign = 'left';
    const nameX = cols.name.x + cellPad + indent;
    const nameAvail = cols.name.x + cols.name.w - m.s(2) - nameX; // kleine padding vóór de kolomrand
    d2d.fillText(fitText(d2d, task.name, nameAvail), nameX, textY);

    // Duration
    d2d.fillStyle = PRINT_COLORS.textSecondary;
    d2d.font = m.font(8);
    d2d.textAlign = 'right';
    d2d.textBaseline = 'middle';
    d2d.fillText(formatDuration(task.time.scheduleDuration), cols.duration.x + cols.duration.w - cellPad, textY);

    // Start date
    const startStr = task.time.earlyStart || task.time.scheduleStart;
    if (startStr) {
      const sd = parseDate(startStr);
      d2d.fillText(formatDutchDate(sd, options.dateNotation), cols.start.x + cols.start.w - cellPad, textY);
    }

    // End date
    const endStr = task.time.earlyFinish || task.time.scheduleFinish;
    if (endStr) {
      const ed = parseDate(endStr);
      d2d.fillText(formatDutchDate(ed, options.dateNotation), cols.end.x + cols.end.w - cellPad, textY);
    }

    // Completion
    if (options.showCompletion) {
      d2d.fillText(formatCompletion(task.time.completion), cols.complete.x + cols.complete.w - cellPad, textY);
    }

    d2d.textAlign = 'left';
    d2d.textBaseline = 'alphabetic';
  }

  // Column separator lines throughout the table
  d2d.strokeStyle = PRINT_COLORS.grid;
  d2d.lineWidth = 0.5;
  const colBorders = [cols.wbs.x, cols.name.x, cols.duration.x, cols.start.x, cols.end.x, cols.complete.x];
  for (const cx of colBorders) {
    d2d.beginPath();
    d2d.moveTo(cx, m.totalHeaderHeight);
    d2d.lineTo(cx, chartBottom);
    d2d.stroke();
  }

  // Table right border (thick)
  d2d.strokeStyle = PRINT_COLORS.borderDark;
  d2d.lineWidth = 1;
  d2d.beginPath();
  d2d.moveTo(m.tableWidth, m.projectHeaderHeight);
  d2d.lineTo(m.tableWidth, chartBottom);
  d2d.stroke();

  // Table left border
  d2d.beginPath();
  d2d.moveTo(0, m.projectHeaderHeight);
  d2d.lineTo(0, chartBottom);
  d2d.stroke();
}


/** Draw dependency lines with arrowheads */
function drawDependencies(
  d2d: Draw2D,
  m: ReportMetrics,
  flatTasks: PrintTask[],
  sequences: Sequence[],
  dateToX: (d: Date) => number,
  rowToY: (i: number) => number,
  zoom: number,
) {
  d2d.strokeStyle = PRINT_COLORS.dependency;
  d2d.fillStyle = PRINT_COLORS.dependency;
  d2d.lineWidth = 1.2;

  for (const seq of sequences) {
    const predIdx = flatTasks.findIndex(t => t.id === seq.predecessorId);
    const succIdx = flatTasks.findIndex(t => t.id === seq.successorId);
    if (predIdx < 0 || succIdx < 0) continue;

    const pred = flatTasks[predIdx];
    const succ = flatTasks[succIdx];
    const predY = rowToY(predIdx) + m.rowHeight / 2;
    const succY = rowToY(succIdx) + m.rowHeight / 2;

    const predEnd = parseDate(pred.time.earlyFinish || pred.time.scheduleFinish);
    const succStart = parseDate(succ.time.earlyStart || succ.time.scheduleStart);
    const fromX = dateToX(predEnd) + zoom;
    const toX = dateToX(succStart);

    // Twee routes (issue #25 punt 3):
    //  - VOORWAARTS (`toX >= fromX + 2*DEP_STUB`): de opvolger begint ruim rechts van de voorganger,
    //    dus de klassieke route volstaat — stukje rechtdoor, verticale knik, dan rechtdoor de
    //    opvolger-balk in.
    //  - TERUGWAARTS (`toX < fromX + 2*DEP_STUB`): de opvolger begint links van waar de lijn
    //    uitkomt. Het horizontale segment zou dan op `succY` achteruit dwars DOOR de opvolger-balk
    //    lopen. In plaats daarvan gaan we "omheen" via de rijgoot: de horizontale scheiding tussen
    //    twee rijen (bovenrand van de opvolger-rij als die eronder ligt, onderrand als hij erboven
    //    ligt), een paar px de rij in zodat de lijn nét naast de rasterlijn valt.
    d2d.beginPath();
    if (toX >= fromX + 2 * DEP_STUB) {
      const midX = fromX + DEP_STUB;
      d2d.moveTo(fromX, predY);
      d2d.lineTo(midX, predY);
      d2d.lineTo(midX, succY);
      d2d.lineTo(toX, succY);
    } else {
      const gutterInset = 2;
      const gutterY = succIdx > predIdx
        ? rowToY(succIdx) + gutterInset            // opvolger eronder ⇒ goot = bovenrand opvolger-rij
        : rowToY(succIdx) + m.rowHeight - gutterInset; // opvolger erboven ⇒ goot = onderrand opvolger-rij
      const outX = fromX + DEP_STUB;
      const inX = toX - DEP_STUB;
      d2d.moveTo(fromX, predY);
      d2d.lineTo(outX, predY);
      d2d.lineTo(outX, gutterY);
      d2d.lineTo(inX, gutterY);
      d2d.lineTo(inX, succY);
      d2d.lineTo(toX, succY);
    }
    d2d.stroke();

    // Arrowhead (filled triangle)
    d2d.beginPath();
    d2d.moveTo(toX, succY);
    d2d.lineTo(toX - 5, succY - 3);
    d2d.lineTo(toX - 5, succY + 3);
    d2d.closePath();
    d2d.fill();
  }
}


/** Draw the footer with project info, legend, and page number */
function drawFooter(
  d2d: Draw2D,
  m: ReportMetrics,
  canvasWidth: number,
  canvasHeight: number,
  projectName: string,
  options: PrintOptions,
) {
  const footerTop = canvasHeight - m.footerHeight;
  // Alles in de voettekst is tekst-zone: de marge, de regelafstanden en de legenda-blokjes schalen
  // mee met de strookhoogte, anders staan de twee regels bij 125% over elkaar.
  const pad = m.s(10);

  // Background
  d2d.fillStyle = PRINT_COLORS.surface;
  d2d.fillRect(0, footerTop, canvasWidth, m.footerHeight);

  // Top border
  d2d.strokeStyle = PRINT_COLORS.borderDark;
  d2d.lineWidth = 1;
  d2d.beginPath();
  d2d.moveTo(0, footerTop);
  d2d.lineTo(canvasWidth, footerTop);
  d2d.stroke();

  const midY = footerTop + m.footerHeight / 2;

  // Left: Project name + print date (breedtes meten voor de dynamische legenda-layout)
  d2d.fillStyle = PRINT_COLORS.text;
  d2d.font = m.font(10, true);
  d2d.textAlign = 'left';
  d2d.textBaseline = 'middle';
  d2d.fillText(projectName, pad, midY - m.s(8));
  const leftNameW = d2d.measureText(projectName).width;

  d2d.fillStyle = PRINT_COLORS.textSecondary;
  d2d.font = m.font(8);
  const printLocale = options.locale ?? 'nl';
  const dateStr = new Date().toLocaleDateString(printLocale, { day: '2-digit', month: 'long', year: 'numeric' });
  const dateText = `${options.labels?.printed ?? 'Afgedrukt:'} ${dateStr}`;
  d2d.fillText(dateText, pad, midY + m.s(8));
  const leftBlockRight = pad + Math.max(leftNameW, d2d.measureText(dateText).width);

  // Right: Page number + branding (breedtes meten, dan tekenen)
  const pageLabel = options.labels?.page ?? 'Pagina';
  const ofLabel = options.labels?.of ?? 'van';
  const pageText = `${pageLabel} 1 ${ofLabel} 1`;
  const brandText = 'Open Planner Studio';
  d2d.font = m.font(9);
  const pageW = d2d.measureText(pageText).width;
  d2d.font = m.font(8);
  const brandW = d2d.measureText(brandText).width;
  const rightBlockLeft = canvasWidth - pad - Math.max(pageW, brandW);

  d2d.fillStyle = PRINT_COLORS.textSecondary;
  d2d.textAlign = 'right';
  d2d.textBaseline = 'middle';
  d2d.font = m.font(9);
  d2d.fillText(pageText, canvasWidth - pad, midY - m.s(6));
  d2d.font = m.font(8);
  d2d.fillText(brandText, canvasWidth - pad, midY + m.s(8));

  // Center: Legend — dynamisch tussen het linker- en rechterblok, items weglaten bij te weinig
  // ruimte i.p.v. over de blokken heen tekenen (klacht 7).
  if (options.showLegend) {
    const availLeft = leftBlockRight + m.s(16);
    const availRight = rightBlockLeft - m.s(16);
    const availSpan = availRight - availLeft;
    if (availSpan > m.s(20)) {
      const lg = options.labels?.legend;
      // De legenda-blokjes zijn op de 8px-legendatekst gemaat; ze schalen dus met de letter mee.
      const swatchW = m.s(16);
      const swatchH = m.s(10);
      const gap = m.s(16);
      const labelPad = m.s(4);
      type LegendItem = { label: string; draw: (x: number) => void };
      const items: LegendItem[] = [];

      if (options.showCritical) {
        items.push({ label: lg?.criticalPath ?? 'Kritiek pad', draw: (x) => {
          d2d.fillStyle = PRINT_COLORS.critical;
          d2d.roundRect(x, midY - swatchH / 2, swatchW, swatchH, m.s(2));
          d2d.fill();
        } });
      }
      items.push({ label: lg?.normal ?? 'Normaal', draw: (x) => {
        d2d.fillStyle = PRINT_COLORS.normal;
        d2d.roundRect(x, midY - swatchH / 2, swatchW, swatchH, m.s(2));
        d2d.fill();
      } });
      items.push({ label: lg?.milestone ?? 'Mijlpaal', draw: (x) => {
        d2d.fillStyle = PRINT_COLORS.milestone;
        const mx = x + swatchW / 2;
        d2d.beginPath();
        d2d.moveTo(mx, midY - m.s(5));
        d2d.lineTo(mx + m.s(5), midY);
        d2d.lineTo(mx, midY + m.s(5));
        d2d.lineTo(mx - m.s(5), midY);
        d2d.closePath();
        d2d.fill();
      } });
      items.push({ label: lg?.summary ?? 'Samenvatting', draw: (x) => {
        d2d.fillStyle = PRINT_COLORS.summary;
        d2d.fillRect(x, midY - m.s(2), swatchW, m.s(4));
        d2d.beginPath();
        d2d.moveTo(x, midY - m.s(2));
        d2d.lineTo(x, midY + m.s(5));
        d2d.lineTo(x + m.s(4), midY + m.s(2));
        d2d.closePath();
        d2d.fill();
      } });
      if (options.showFloat) {
        items.push({ label: lg?.float ?? 'Speling', draw: (x) => {
          d2d.fillStyle = PRINT_COLORS.float + '40';
          d2d.fillRect(x, midY - m.s(4), swatchW, m.s(8));
        } });
      }

      d2d.font = m.font(8);
      d2d.textBaseline = 'middle';
      const widths = items.map(it => swatchW + labelPad + d2d.measureText(it.label).width);
      const measure = (n: number) => widths.slice(0, n).reduce((a, b) => a + b, 0) + gap * Math.max(0, n - 1);
      let visible = items.length;
      while (visible > 0 && measure(visible) > availSpan) visible--;

      let lx = availLeft + Math.max(0, (availSpan - measure(visible)) / 2);
      for (let k = 0; k < visible; k++) {
        items[k].draw(lx);
        d2d.fillStyle = PRINT_COLORS.textSecondary;
        d2d.textAlign = 'left';
        d2d.fillText(items[k].label, lx + swatchW + labelPad, midY);
        lx += widths[k] + gap;
      }
    }
  }

  d2d.textAlign = 'left';
  d2d.textBaseline = 'alphabetic';
}
