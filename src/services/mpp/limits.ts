/**
 * Native MPP14-lezer (MS Project 2010–2021), alleen-lezen.
 * Afgeleid van de MPXJ-broncode (https://github.com/joniles/mpxj, © Jon Iles e.a.,
 * LGPL-2.1) — structuurkennis en veldconstanten geport naar TypeScript voor
 * Open Planner Studio (LGPL-3.0).
 *
 * T6-kwaliteitsreview (minor M4) — gedeelde harding-klemmen als BLADMODULE: importeert bewust NIETS
 * uit `mppReader.ts`/`mppCalendars.ts` (patroon `src/state/slices/defaults.ts`: een bladmodule mag
 * nooit terug-importeren uit de modules die HEM importeren, anders ontstaat de cyclus die
 * `verify:cycles` bewaakt). Vóór deze module hielden `mppReader.ts` en `mppCalendars.ts` elk hun
 * EIGEN kopie van `MAX_VAR_TEXT_BYTES` aan (letterlijk dezelfde waarde, met commentaar dat uitlegde
 * waarom een gedeelde import niet kon) — deze module lost dat structureel op: beide importeren nu
 * DEZELFDE constante.
 */

/**
 * I1-stijl klem (T5-kwaliteitsreview) — begrenst het scan-/decodeerwerk van `getUnicodeString`
 * (taaknamen, WBS-tekst, kalendernamen, uitzonderingsnamen, …) tegen een gedeelde, gededupliceerde
 * var-data-offset (zie Var2Data's moduleheader in `mppPrimitives.ts`): meerdere unique-ID's kunnen
 * naar DEZELFDE grote string wijzen, dus zonder bovengrens kost het uitlezen ervan O(werkelijke
 * lengte) PER verwijzing. 64 KiB is ruim boven elke realistische naam/tekst in het corpus (dat blijft
 * ver onder 1 KB), maar begrenst een geprepareerd bestand hard. Zie `mppReader.ts`'s I1-toelichting
 * (`readTasks`) voor de volledige kosten-analyse.
 */
export const MAX_VAR_TEXT_BYTES = 65_536;
