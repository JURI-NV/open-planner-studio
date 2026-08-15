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

/**
 * T3 (fase 3.8, MSP-pariteit) — structurele klem op het aantal werktijd-BANDEN binnen ÉÉN 92-byte
 * kalender-uitzonderingsblok (`AbstractCalendarAndExceptionFactory.processCalendarExceptions`,
 * `readExceptionBands` in `mppCalendars.ts`).
 *
 * LAAG-3-FIX (Opus-review — de vorige versie van dit commentaar rekende de klem verkeerd uit): het
 * ANALYSEERDE alleen de DUUR-array (`+32 + i*4`, past 15× vóór de naam-vardata) en NEGEERDE dat de
 * START-array (`+20 + i*2`, 2-byte-stride) een VEEL knellendere grens is — start-slot `i` staat op
 * `20+2i`, wat exact BOTST met duur-slot 0 (op `+32`) zodra `20+2i>=32`, dus `i>=6`. Structureel
 * passen er dus hoogstens 6 NIET-OVERLAPPENDE periodes (`i=0..5`) vóór start-slot 6 al in duur-slot
 * 0 se bytes leest — gedemonstreerd (reviewer-repro): bij `periodCount=15` (de oude klem) las
 * periode-index 6+ een "fantoomband" uit wat feitelijk duur-/naamlengte-bytes van ANDERE periodes/
 * de naam-vardata waren. Geklemd op 5 (niet de structurele 6-slot-bovengrens): MS Project se eigen
 * UI staat de gebruiker hooguit 5 werktijdperiodes per uitzondering toe (dezelfde autoritatieve
 * grens als `MAX_DAY_HOUR_PERIODS`'s eigen toelichting citeert voor het 60-byte-dagblok) — 5 is dus
 * zowel de STRUCTURELE (5<6, geen overlap-risico) als de PRODUCT-grens, en dus de motiveerbaarste
 * keuze. (`MAX_DAY_HOUR_PERIODS` hierboven draagt dezelfde start/duur-overlapfout — dat is
 * PRE-EXISTING buiten deze taak se scope, gemeld voor een latere T-taak, hier bewust ongewijzigd.)
 * Een ongeklemde `periodCount` (SHORT, 0..65535) zou zonder deze klem tot 65535 iteraties per
 * uitzondering kunnen forceren; bij `MAX_CALENDAR_EXCEPTIONS` (2000) uitzonderingen per kalender is
 * dat tot 131 miljoen ongebruikte lus-iteraties (elke iteratie ná i=5 leest al buiten de bedoelde
 * band-slots en zou — vóór deze fix — een fantoomband kunnen opleveren, ná deze fix simpelweg niet
 * meer bereikt worden).
 */
export const MAX_EXCEPTION_BAND_PERIODS = 5;
