import { useLayoutEffect, useRef, type ReactNode } from 'react';

/**
 * De zwevende hover-tooltip van de Gantt (`.gantt-tooltip`), inclusief het binnen-beeld-houden.
 *
 * Issue #58: de tooltip stond simpelweg op `cursor + 16 / cursor − 10` zónder enige begrenzing.
 * Zolang de titel op één regel bleef viel dat nauwelijks op; nu hij wrapt (zie de CSS-toelichting
 * bij `.gantt-tooltip`) wordt de doos hóger, en dan wordt "hij valt onderaan van het scherm" het
 * volgende zichtbare probleem. Gemeten op de oude code: 95px onder de vensterrand bij een taak
 * onderin, en 219px buiten de rechterrand bij een taak helemaal rechts.
 *
 * Waarom een gemeten correctie en niet CSS: de breedte/hoogte van de doos hangt af van de inhoud
 * (aantal wrap-regels), en die kent alleen de layout. De correctie gaat daarom via `transform` ná
 * de layout maar vóór de paint (`useLayoutEffect`) — dat schrijft rechtstreeks in de stijl in
 * plaats van via state, zodat er geen tweede render per muisbeweging bijkomt.
 *
 * Horizontaal is de correctie een KLAP naar de andere zijde van de cursor (de tooltip zou anders de
 * balk bedekken waar je op staat); verticaal is het een schuif, want boven/onder de cursor is er
 * geen bedekkingsprobleem. Past hij in geen van beide richtingen (venster kleiner dan de tooltip),
 * dan wint de linker-/bovenrand: liever het begin van de tekst zichtbaar dan het eind.
 *
 * De grens is NIET alleen het venster maar de doorsnede van venster én de positionerende ouder:
 * het Gantt-pane staat op `overflow: hidden`, dus een tooltip die daar onderuit steekt wordt
 * afgeknipt (gemeten: pane-onderrand 913px in een venster van 950px — de laatste regel verdween
 * achter de statusbalk terwijl hij "in beeld" was). Alleen tegen het venster klemmen lost dat niet
 * op.
 */

/** Marge tot de rand waarbinnen de tooltip moet blijven. */
const VIEWPORT_MARGIN = 8;
/** Horizontale afstand tussen cursor en tooltip: de offset die de aanroeper in `left` verwerkte
 *  (16px voor de Gantt, 14px voor het histogram). Alleen gebruikt om bij het spiegelen dezelfde
 *  ruimte aan de andere kant te laten; een paar pixels verschil is puur cosmetisch. */
const CURSOR_GAP = 16;

/** Klem `v` in [lo, hi]; is dat interval leeg (doos past niet), dan wint `lo`. */
function clampInto(v: number, lo: number, hi: number): number {
  if (lo > hi) return lo;
  return Math.min(Math.max(v, lo), hi);
}

interface HoverTooltipProps {
  /** Positie t.o.v. de container waarin de tooltip staat (position: absolute). */
  left: number;
  top: number;
  children: ReactNode;
}

export function HoverTooltip({ left, top, children }: HoverTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Bewust ZONDER dependency-array: de doos verandert ook van formaat door inhoud die niet in
  // `left`/`top` zit (andere taak, andere taal, andere lettergrootte). Eén getBoundingClientRect
  // per render van een klein element is goedkoper dan het risico op een verouderde correctie.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transform = '';
    const r = el.getBoundingClientRect();

    // Zichtbaar gebied = venster ∩ positionerende ouder (die knipt met overflow: hidden).
    const parent = (el.offsetParent as HTMLElement | null)?.getBoundingClientRect();
    const bounds = {
      left: Math.max(0, parent?.left ?? 0),
      top: Math.max(0, parent?.top ?? 0),
      right: Math.min(window.innerWidth, parent?.right ?? window.innerWidth),
      bottom: Math.min(window.innerHeight, parent?.bottom ?? window.innerHeight),
    };

    // Horizontaal: past de rechterkant niet, dan naar de linkerzijde van de cursor spiegelen.
    const flipped = -(r.width + CURSOR_GAP * 2);
    const wanted = r.right > bounds.right - VIEWPORT_MARGIN ? flipped : 0;
    const dx = clampInto(wanted, bounds.left + VIEWPORT_MARGIN - r.left, bounds.right - VIEWPORT_MARGIN - r.right);

    // Verticaal: gewoon omhoog schuiven tot hij past.
    const dy = clampInto(0, bounds.top + VIEWPORT_MARGIN - r.top, bounds.bottom - VIEWPORT_MARGIN - r.bottom);

    el.style.transform = dx || dy ? `translate(${dx}px, ${dy}px)` : '';
  });

  return (
    <div ref={ref} className="gantt-tooltip" style={{ left, top }}>
      {children}
    </div>
  );
}
