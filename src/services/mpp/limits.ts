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
 * T3 (fase 3.8, MSP-pariteit) — structurele klem op het aantal werktijd-BANDEN binnen ÉÉN
 * 92-byte kalender-uitzonderingsblok (`AbstractCalendarAndExceptionFactory.processCalendarExceptions`,
 * `readExceptionBands` in `mppCalendars.ts`). Spiegelt `MAX_DAY_HOUR_PERIODS`'s klemdiscipline
 * (die hetzelfde doet voor het 60-byte WEEKDAG-blok) maar dan voor het 92-byte UITZONDERINGS-blok:
 * duur staat op `+32 + i*4` (2-byte read), en dat past hoogstens `Math.floor((92-32-2)/4)+1 = 15`
 * keer (`i=0..14`, de 15e slot eindigt exact op byte 90, de 16e (`i=15`) zou op byte 92+ lezen —
 * buiten dit blok, in de naam-vardata van de VOLGENDE uitzondering). Geklemd op de STRUCTURELE
 * capaciteit van het blok zelf, niet een losse marge — een ongeklemde `periodCount` (SHORT,
 * 0..65535) zou anders tot 65535 iteraties per uitzondering kunnen forceren, wat bij
 * `MAX_CALENDAR_EXCEPTIONS` (2000) uitzonderingen per kalender tot 131 miljoen ongebruikte
 * lus-iteraties zou kunnen oplopen (elke iteratie ná i=14 leest toch al buiten het blok en zou de
 * bestaande `data.length<...`-grenscontrole in `readExceptionBands` raken, dus geen crash — wél
 * onnodig CPU-werk zonder deze klem).
 */
export const MAX_EXCEPTION_BAND_PERIODS = 15;

/**
 * T3 (fase 3.8, MSP-pariteit) — bovengrens op het aantal datums dat `expandRecurrence` uit ÉÉN
 * recurrente uitzondering genereert (poort van `RecurringData.populateDates()`,
 * `org.mpxj.RecurringData`). Gemeten corpuswaarde (plan §1.2.1, causale audit 2026-08-15): 368
 * niet-geflattende recurrente records over het HELE corpus samen (YEARLY-absoluut 295,
 * YEARLY-relatief 13, MONTHLY-absoluut 7, MONTHLY-relatief 21, WEEKLY 23, DAILY-met-frequentie 9)
 * — de overgrote meerderheid (80%) is YEARLY en genereert dus hoogstens enkele tientallen datums
 * (één per jaar over een paar decennia). 3660 (≈ 10 jaar dagelijks, of ≈ 70 jaar wekelijks) is ruim
 * boven elk realistisch herhalingspatroon in een bouwplanning-kalender (jaarlijkse feestdagen over
 * hoogstens enkele decennia).
 *
 * Ergste geval ZONDER deze klem: een geprepareerd bestand kan `fromDate`/`toDate` (elk een SHORT,
 * MPP-epoch-dagen) tot het volledige bereik van ~65534 dagen (~179 jaar) laten claimen. Een WEEKLY-
 * uitzondering met frequentie 1 en alle 7 dagen aangevinkt zou dan tot ~179×365 ≈ 65.000 datums per
 * RECORD kunnen genereren; met `MAX_CALENDAR_EXCEPTIONS` (2000) uitzonderingen per kalender zou dat
 * zonder klem tot ~130 miljoen `Map`-inserts kunnen oplopen — ver voorbij `MAX_TOTAL_HOLIDAY_SLOTS`
 * (100.000) se eigen vangnet, dat pas NA generatie decrementeert (`expandRecurrence` zelf moet dus
 * ONAFHANKELIJK van het budget al begrensd zijn, anders kost de generatie-LUS zelf al te veel CPU
 * vóór het budget kan ingrijpen). Elke generatiefunctie (`getDailyDates`/`getWeeklyDates`/
 * `getMonthlyAbsoluteDates`/… in `mppCalendars.ts`) stopt hard zodra dit aantal bereikt is,
 * ongeacht `finishDate`/`occurrences`.
 */
export const MAX_RECURRENCE_DATES = 3_660;
