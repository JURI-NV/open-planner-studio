# Datumgetrouwheid .mpp-import — Implementatieplan (fase 3.8, etappe "MSP-pariteit")

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development` (aanbevolen) of `superpowers:executing-plans`. Stappen gebruiken checkbox-syntax.
> **Regelnummers in dit plan zijn indicatief — verifieer altijd op INHOUD (grep op de genoemde symboolnaam), nooit op regelnummer.**
> Opgesteld door architect-agent (Opus) 2026-08-15; orkestratorbesluiten op de openstaande vragen staan in §9.

## 1. Doel en scope

**Doel (acceptatiecriterium van de etappe, letterlijk):** na `readMPP` + herberekening (`runCPM`/`solveProject`) zijn start- én einddatum van elke taak in het volledige corpus tot op de minuut identiek aan de door MS Project zélf in datzelfde bestand opgeslagen `SCHEDULED_START`/`SCHEDULED_FINISH` (veld 35/36). Enige toegestane uitzondering: taken die in het bronbestand aantoonbaar gesplitst of resource-genivelleerd zijn — die worden bij openen gemeld en in de gids gedocumenteerd. De fidelity-meting wordt een herhaalbare regressietest met gepinde per-bestand-baselines en nette CI-skip. Alle claims mutatie-bewezen, `npm run verify` groen.

### 1.1 Gemeten uitgangspositie (2026-08-15, gepind op 97368f7d; hergemeten door de architect)

| meting | waarde |
|---|---|
| corpus | 661 `.mpp`; 445 geweigerd (`MPP_LEGACY`, buiten scope); 216 leesbaar; 174 met taken; **3413 taken** |
| leespariteit (ruwe scan vs. `readMPP`) | 3413/3413 (100%) — de lezer leest de velden correct |
| ná herberekening | start 3094 exact (90,7%), finish 2938 exact (86,1%) |
| bestanden 100% exact | 142/216 (= 100/174 met taken; 42 bestanden hebben 0 taken) |
| taken met ≥1 afwijking | 483 (313 start-afwijkingen + 450 finish-afwijkingen) |

### 1.2 Oorzaken, causaal gemeten (niet geschat)

1. **Recurrente kalenderuitzonderingen niet geëxpandeerd.** Whatif-run (jaarlijkse feestdagen zelf geïnjecteerd): startDiff 313 → 227 (−86, 27%), finishDiff 450 → 355 (−95, 21%). Corpusbrede telling van OVERGESLAGEN uitzonderingsrecords: `recType` 2 (jaarlijks-absoluut) **295**, 3 (jaarlijks-relatief) 13, 4 (maandelijks-absoluut) 7, 5 (maandelijks-relatief) 21, 6 (wekelijks) 23, 7 (dagelijks met frequentie) 9 → **368 niet-werkende recurrente records**. 44 van de 74 afwijkende bestanden hebben er minstens één.
2. **Werkende uitzonderingsdagen** (`periodCount > 0` — een uitzondering die werktijd definieert): corpusbreed **57 records** (recType 1: 48, 3: 1, 4: 2, 5: 3, 6: 3), in 10 bestanden, waarvan 6 afwijkend. Dit is géén rest-post: het is een modelgat (`WorkCalendar` kent alleen niet-werkende `holidays`).
3. **Mijlpaal-instantconventie (NIEUW — stond niet in de audit).** MS Project zet een mijlpaal na een FS-relatie op de *finish-instant* van de voorganger (`…T17:00`); wij snappen naar de volgende werk-instant (`volgende dag T08:00`). Gemeten patroon "MSP 17:00 → onze 08:00": **92 finish-afwijkingen** en **32 start-afwijkingen**, waarvan 31 op taken met duur 0 (zuivere conventie), verspreid over **31 bestanden**. Van alle 483 afwijkende taken zijn er 43 mijlpaal.
4. **Projectstart-vloer.** Zonder vloer (`NO_PSD`-run): startDiff 313 → 288 (−25), finishDiff 450 → 431 (−19), 100%-exacte bestanden 142 → 149. **Geen enkel bestand wordt slechter.** 25 taken over 12 bestanden. *Belangrijke nuance t.o.v. de goal-tekst:* slechts **11** van die 25 taken hebben een expliciete constraint (SNET) vóór de projectstart; de overige **14** hebben helemaal géén constraint — hun eigen opgeslagen anker ligt gewoon vóór de projectstart. De regel "expliciete constraint wint" dekt dus minder dan de helft (zie T7 + §9/O2).
5. **ELAPSED-duureenheden.** 5 taken in 1 bestand (`mpp14duration.mpp`). Duur-eenheden corpusbreed: `days` 3066, `hours` 202, `minutes` 133, `weeks` 6, `months` 1, `elapsed*` 5. De lezer negeert `DurationUnits` (veld 181) volledig: 1 `elapsedDay` (1440 klok-min) wordt nu 3 werkdagen.
6. **Voortgangsafronding.** `heeftVoortgang`-emmer: 14 afwijkende starts. Klein; meet-eerst-taak.
7. **Split / leveling / resource-contouring (toegestane uitzondering).** Proxy "MSP-eigen venster in werkminuten > MSP-eigen duur": **108 taken** (`spanGt`), aanwezig in 56 van de 74 afwijkende bestanden; `spanLt` 22. Twee sub-categorieën die de goal-tekst niet noemt: **resource-contouring** (`mpp14resource.mpp`, "Contoured Task") en **mijlpaal-met-duur** (`mpp14task.mpp`: `isMilestone` én duur 5 dagen, MSP-finish = start+5d) — zie §9/O1.

### 1.3 Wél in scope

Kalenderuitzonderingen (recurrent + werkend, incl. precedentie en overerving), projectstart-vloer, mijlpaal-instantconventie, ELAPSED-duur, voortgangsafronding, detectie + melding + gidsdocumentatie van splits/leveling, de fidelity-regressietest met gepinde baselines, en de residu-iteratie tot de goal gehaald is.

### 1.4 Niet in scope (eigenaarsbesluit 2026-08-15)

- **Taak-splitsen als feature** (onderbroken balken plannen/renderen/bewerken) — aparte etappe ná deze goal.
- **Resource-leveling als feature** (nivelleren, contouren, effort-driven herverdeling) — idem. `ResourceLeveler.ts` blijft ongemoeid.
- `.mpp`-export, MPP8/9/12, wachtwoordbestanden, baselines/custom fields uit `.mpp`.
- Herstructurering van `WorkCalendar` buiten wat T2 nodig heeft.

---

## 2. Takenlijst

Elke taak: **doel → bestanden → mutatie-bewijsbare acceptatie → afhankelijkheden → risico**.
**Vaste poort per taak:** `npm run typecheck` groen + `npm test` (exitcode is de poort, nooit de tail) + de eigen acceptatie. Elke taak eindigt met een commit die de **gemeten voor→na-cijfers** uit het fidelity-harnas in het bericht draagt.

---

### BAAN M — meting

#### T1 — Fidelity-harnas naar de repo, tegen de LIVE worktree

**Doel.** Het scratchpad-harnas (`measure.ts`, gepind op snapshot 97368f7d) wordt één in-repo artefact dat (a) implementers/reviewers tijdens de etappe als meetscript gebruiken en (b) de regressietest ís. Eén bron, twee modi — geen tweede implementatie die kan afdrijven.

**Bestanden (nieuw, tenzij anders vermeld).**
- `tests/planning/mppGroundTruth.ts` — de **onafhankelijke** her-implementatie van de TBkndTask-scan (eigen lus; deelt alleen `mppPrimitives`/`fieldMap14`). Overnemen uit `measure.ts` `rawScan()`. **Moduleheader moet expliciet vermelden dat dit bewust een tweede lus is en waarom** (een bug in `readTasks` mag hier niet meeliften).
- `tests/planning/mppFidelity.ts` — pure meetkern: `measureFidelity(bytes) → FidelityRow`. Roept `readMPP` (live) + **`solveProject`** (live rekenkern uit `src/engine/scheduler/solveProject.ts`) aan — níét `CPMSolver` los, zoals het scratchpad-harnas nog doet; dat harnas is gepind op vóór de `expandSummaryRelations`-verzoening en zou dus een ander pad meten dan de app.
- `tests/planning/check-mpp-fidelity.ts` — de check. Drie modi via env:
  - default: assert tegen de gepinde baseline;
  - `OPS_MPP_FIDELITY_REPORT=detail`: print per afwijkende taak `naam | MSP-start | onze-ES | MSP-finish | onze-EF | duur | mijlpaal | constraint | %voltooid | kalender | voorgangers` (het `detail`-formaat uit het scratchpad-harnas) plus de attribuut-emmers;
  - `OPS_MPP_FIDELITY_REPORT=baseline`: print het complete nieuwe baseline-JSON naar stdout (de mens plakt het in het baselinebestand — de check schrijft **nooit** zelf een bestand).
- `tests/planning/mpp-fidelity-baseline.json` — de pins (zie §6).
- `tests/planning/run.sh` — registratie binnen het `RUN_HOLIDAYS`-blok, met `bundle_check`, ná `check-mpp-summary-relations`. **Gemeten:** een volledige scan over alle 658 crawl-bestanden kost < 1 s; de tijdzone-matrix (6×) is dus geen probleem en levert bovendien gratis tz-dekking op echte data.

**Ontwerpeisen.**
- Beide corpuswortels via de bestaande conventie: `OPS_MPP_CORPUS` (default `/home/nozzit/open-aec/voor claude/test bestanden voor file implementation`) én `OPS_MPP_CRAWL` (default `…/voor claude/testdata-crawl`), beide met nette skip-OK-regel bij afwezigheid — kopieer de formulering uit `check-mpp-relations.ts` / `check-mpp-calendars.ts`.
- `MPP_LEGACY`-weigeringen tellen als "overgeslagen", nooit als fout.
- **Per veldsoort pinnen, geen som per bestand:** per bestand `tasks`, `startExact`, `startSameday`, `startDiff`, `finishExact`, `finishSameday`, `finishDiff` — elk met `===`. Plus twee globale pins: het aantal gepinde bestanden dat daadwerkelijk gezien is, en de **expliciete lijst** van bestanden met ≥1 afwijking (zodat een nieuw afwijkend bestand rood wordt, ook als een ander bestand tegelijk verbetert).
- Eén **pad-pariteitscase**: één bestand end-to-end door de échte store (`applyLoadedProject` + `runCPM`, patroon `check-mpp-open-guard.ts`) en vergelijken met wat `mppFidelity` via `solveProject` oplevert. Wijken die af, dan meet de test niet wat de app doet.

**Acceptatie (mutatie-bewijs).**
1. Verwijder de `expandSummaryRelations`-aanroep in `solveProject.ts` → check ROOD (bewijst dat de echte kern gemeten wordt). Herstellen.
2. Wijzig één teller in de baseline met ±1 → ROOD op precies dat bestand en dat veld.
3. Zet beide env-vars naar een niet-bestaand pad → exitcode 0 met twee OK-skipregels.
4. Draai met `OPS_MPP_FIDELITY_REPORT=detail` terwijl mutatie 2 actief is → nog steeds ROOD (rapportmodus verzwakt de poort niet).
5. Wijzig in `mppGroundTruth.ts` het offset-veld van `ScheduledStart` naar `ScheduledFinish` → massaal ROOD (bewijst dat de grondwaarheid echt uit het bestand komt).

**Afhankelijk van:** niets. **Blokkeert:** alle meet-claims van T2–T12 en de eindpoort T15.
**Risico:** laag-midden (alleen testcode), maar het is de fundering — kwaliteitsreview op Opus.

---

### BAAN K — kalender

#### T2 — Kalendermodel: werkende uitzonderingen + platte, per-datum-unieke materialisatie

**Doel.** `WorkCalendar` kan een dag-uitzondering dragen die de dag **werkend** maakt (evt. met afwijkende banden). De engine respecteert dat in dag- én uurmodus.

**Ontwerp (bewust plat).** MPXJ lost precedentie op in `ProjectCalendar.populateExpandedExceptions()` (verifieer op inhoud: `src/main/java/org/mpxj/ProjectCalendar.java`): recurrente uitzonderingen in de volgorde `WEEKLY → MONTHLY → YEARLY → DAILY` in een per-datum-map, daarná overschrijven niet-recurrente uitzonderingen alles. Wij doen diezelfde resolutie **bij het parsen** (T3/T4) en houden het runtime-model plat en per-datum-uniek. Voorstel:

```ts
// src/types/calendar.ts
/** Dag-uitzondering die werktijd TOEVOEGT/AANPAST (MS Project: "werkende uitzondering"). */
export interface WorkingException {
  name: string;
  startDate: string; // ISO date
  endDate: string;
  /** Banden in minuten-vanaf-middernacht, zelfde canonieke vorm als WorkTimeBands. Leeg = de
   *  weekdag-standaardbanden gelden (dag wordt werkend zonder afwijkende uren). */
  bands?: { start: number; end: number }[];
}
// WorkCalendar krijgt: workingExceptions?: WorkingException[]
```
Invariant, hard te documenteren én te testen: **een datum komt nooit in `holidays` én in `workingExceptions` voor** — de parser lost dat op. `workingExceptions` afwezig ⇒ byte-identiek gedrag.

**Bestanden.** `src/types/calendar.ts`; `src/engine/scheduler/CalendarEngine.ts` (verifieer op inhoud: `holidaySet`, `holidayDaySet`, `holidayWorkdayIdxSorted`, `isWorkDay`, `isHoliday`, `workDaysBetween` + de binary-search-helper, `bandsStartingOn`, `addWorkDays`); `tests/planning/check-calendar-hours.ts`; `tests/planning/cases-kalenders.json`.

**Let op:** `workDaysBetween` telt nu "werk-weekdagen − feestdagen-op-een-werkweekdag" via binary search. Een werkende uitzondering op een zaterdag **voegt** een werkdag toe; dat vraagt een tweede gesorteerde index (`workingExceptionOnNonWorkWeekdayIdxSorted`) — anders klopt de telling stil niet meer. Dit is de meest waarschijnlijke stille bug in deze taak.

**Acceptatie (mutatie-bewijs).**
> **Wijziging tijdens uitvoering (2026-08-15, goedgekeurd door orkestrator):** `cases-kalenders.json` wordt geïnterpreteerd door `tests/planning/harness.ts` (gedeelde infra, geen baan-eigendom), en dat `Cal`-type kent geen `workingExceptions` — een JSON-case zou stil niets testen. Daarom bewijst T2 acceptatie 1–4 als directe CalendarEngine-unit-tests in `check-calendar-hours.ts`; de CPM-end-to-end-cases via de harness zijn verplaatst naar T13 (zie daar).
1. Cases (a)–(c) als unit-tests in `check-calendar-hours.ts`: (a) werkende zaterdag in een taakduur → één werkdag extra; (b) werkende uitzondering met afwijkende banden (06:00–12:00) op een uurkalender → `workMinutesBetween` = 360 die dag; (c) werkende uitzondering die op een feestdag valt (precedentie) → dag telt als werkend.
2. Mutatie: laat `isWorkDay` `workingExceptions` negeren → (a) en (c) ROOD.
3. Mutatie: laat `bandsStartingOn` de override-banden negeren → (b) ROOD.
4. Mutatie: sla de nieuwe index in `workDaysBetween` over (val terug op de oude telling) → (a) ROOD.
5. **Byte-identiek zonder uitzonderingen:** alle 455 bestaande cases groen zonder ook maar één verwachte waarde aan te passen. Wordt een bestaande case aangepast, dan is dat een gedragswijziging die expliciet gemotiveerd moet worden in de commit.

**Afhankelijk van:** niets (T1 alleen om te meten). **Blokkeert:** T3, T4, T5.
**Risico:** hoog — raakt de heetste engine-lus. Kwaliteitsreview op Opus.

#### T3 — MPP: recurrente uitzonderingen expanderen + werkende uitzonderingen lezen

**Doel.** `parseExceptions` levert wat MS Project bedoelt in plaats van alleen de al-platte records.

**Bestanden.** `src/services/mpp/mppCalendars.ts` (verifieer op inhoud: `parseExceptions`, `isFlattenedNonRecurring`, `materializeDerived`/`budgetedInherit`, `HolidayBudget`, `MAX_CALENDAR_EXCEPTIONS`, `MAX_TOTAL_HOLIDAY_SLOTS`); `src/services/mpp/limits.ts` (nieuwe klem, zie hardening); `tests/planning/check-mpp-calendars.ts`.

**Referentie (verifieer op inhoud, niet op regelnummer):**
`voor claude/testdata-crawl/mpxj/src/main/java/org/mpxj/mpp/AbstractCalendarAndExceptionFactory.java` → `processCalendarExceptions` en `readRecurringData`; `…/org/mpxj/RecurringData.java` → `populateDates()`/`getDates()`; `…/org/mpxj/ProjectCalendar.java` → `populateExpandedExceptions()` en `ORDERED_RECURRENCE_TYPES`.

Concreet uit de Java-bron (alle offsets relatief aan het 92-byte-uitzonderingsblok):
- `+4` = `occurrences` (SHORT) — wij lezen dit nu niet;
- `+14` = `periodCount`; is die ≠ 0, dan volgen **werktijdbanden**: starttijd op `+20 + i*2`, duur op `+32 + i*4` (`MPPUtility.getTime` / `getDuration`), eind = start + duur;
- `+72` = `recurrenceTypeValue`; `RECURRENCE_TYPES` = `{null, DAILY, YEARLY, YEARLY(relatief), MONTHLY, MONTHLY(relatief), WEEKLY, DAILY}`;
- DAILY: frequentie 1 bij `recType===1`, anders `+76`; **DAILY met frequentie 1 wordt door MPXJ zelf platgeslagen** (dat doen wij al goed);
- WEEKLY: dagen-bitmap op `+76` (byte), frequentie `+78` (SHORT);
- MONTHLY absoluut: dagnummer `+76` (byte), frequentie `+78` (byte); relatief: weekdag `+77`−2, dagnummer `+76`+1, frequentie `+78` (SHORT);
- YEARLY absoluut: dagnummer `+77`, maand `+76`+1; relatief: weekdag `+78`−2, dagnummer `+77`+1, maand `+76`+1.

**Verplichte stappen.**
- [ ] Port `readRecurringData` volledig (alle 4 types × relatief/absoluut) en een `expandRecurrence(rd) → ISO-datums`-functie (poort van `RecurringData.populateDates`), begrensd op `startDate..finishDate` **én** `occurrences`.
- [ ] Werkende uitzondering (`periodCount > 0`) → `WorkingException` met banden; niet-werkend → `Holiday` (huidig gedrag).
- [ ] Precedentie exact als MPXJ: recurrente in volgorde WEEKLY → MONTHLY → YEARLY → DAILY in een per-datum-map, dan niet-recurrente eroverheen; resultaat per datum uniek en verdeeld over `holidays`/`workingExceptions`.
- [ ] Overervingsregel afgeleide kalender: **eigen uitzondering wint per datum van de basiskalender** (MPXJ valt pas op de ouder terug als de eigen kalender die datum niet kent). De huidige `[...base.holidays, ...own]`-concat kan dat niet uitdrukken zodra werkende uitzonderingen bestaan — hier moet dezelfde per-datum-map overheen.
- [ ] **Probe vóór implementatie:** `processWorkWeeks` (werkweken — alternatieve weekpatronen per datumbereik) lezen wij nergens. Meet met een wegwerp-probe hoeveel corpusbestanden een niet-lege werkweek-blok hebben; is dat > 0 en verklaart het afwijkingen, dan is dat **T3b** (apart, zelfde baan). Anders documenteren als bekend gat in de gids.

**Acceptatie (mutatie-bewijs).**
1. Fidelity-harnas: `startDiff` daalt met minstens **80** en `finishDiff` met minstens **90** t.o.v. de T1-baseline (de whatif-run bewijst 86/95 alleen al voor jaarlijks-absoluut; de overige types komen erbij). Exacte nieuwe waarden worden gepind.
2. Mutatie: schakel de YEARLY-tak in `expandRecurrence` uit → fidelity ROOD op een lijst van ≥ 30 bestanden.
3. Mutatie: laat de niet-recurrente-overlay weg (precedentie) → `calendar-exception-precedence*.mpp` ROOD (die vier bestanden bestaan precies hiervoor in de MPXJ-testset).
4. Mutatie: negeer `periodCount > 0` → de 10 bestanden met werkende uitzonderingen ROOD.
5. Vijandige synthetische fixture in `check-mpp-calendars.ts`: uitzondering met `occurrences=65535`, bereik 1984–2149 → moet klemmen (geen hang, geen geheugenexplosie), gemeten looptijd < 100 ms.

**Afhankelijk van:** T2. **Blokkeert:** T13.
**Risico:** hoog (grootste enkele winst, byte-niveau). Kwaliteitsreview op Opus.

#### T4 — MSPDI: dezelfde uitzonderingssemantiek

**Doel.** Wat T3 uit `.mpp` haalt, moet `readMSPDI` uit `<Exception>` halen — anders divergeren de twee MS-Project-paden en is de `.mpp.xml`-kruiscontrole waardeloos.

**Bestanden.** `src/services/msproject/mspdiReader.ts` (verifieer op inhoud: `applyCalendarBody`, de `<Exception>`-lus, `promoteHourCalendar`); `tests/planning/check-adapters-hours.ts`.

**Acceptatie.** `<Exception>` met `DayWorking=1` + `<WorkingTimes>` → `WorkingException` met banden; `<RecurringExceptionType>` wordt geëxpandeerd. Mutatie: negeer `DayWorking` → nieuwe case ROOD. Regressie: de drie `.mpp.xml`-ground-truths blijven binnen hun bestaande per-veldsoort-budgetten in `check-mpp-import.ts` (T5-sectie).
**Afhankelijk van:** T2 (model), T3 (gedeelde expansie-helper — hergebruik die, bouw geen tweede). **Risico:** midden.

#### T5 — IFC-round-trip voor werkende uitzonderingen

**Doel.** Nieuwe kalenderdata overleeft opslaan+heropenen. Zonder dit is elke import stil dataverlies bij de eerste Ctrl+S (CLAUDE.md: "IFC is the native file format, not a sidecar").

**Bestanden.** `src/services/ifc/ifcWriter.ts` (verifieer op inhoud: de `IFCWORKCALENDAR`-bouwer, de `holidayRefs`-lus, `ExceptionTimes` arg 6); `src/services/ifc/ifcReader.ts` (verifieer: `exceptionRefs`/`holidays`-lus); `tests/planning/check-ifc-roundtrip.ts`.

**Ontwerp (HERZIEN 2026-08-15 na spec-reviewbevinding — het oorspronkelijke ontwerp was fout).** ~~Een werkende uitzondering = `IFCWORKTIME` met gevulde `RecurrencePattern` (arg 3); een feestdag houdt `$`.~~ Dat onderscheid is NIET robuust: IFC 4.3 reserveert `RecurrencePattern` niet voor werkende uitzonderingen — een spec-conforme externe tool schrijft een recurrente feestdag ("elke 25 december") met exact zo'n gevulde ref, en die zou dan als wérkdag ingelezen worden (bewezen met een geconstrueerd fragment; regressie t.o.v. het conservatieve pre-T5-gedrag). **Herzien ontwerp:** de discriminator is een expliciete `OPS_`-pset-markering volgens het gevestigde patroon (zie `writeCalendarGenerationMeta`/herkomststempels): de writer markeert de werkende-uitzondering-`IFCWORKTIME`'s ondubbelzinnig via een OPS-pset (vlag of referentielijst); de banden mogen in de recurrence-`TimePeriods` blijven als datadrager. De reader behandelt een `IfcWorkTime` in `ExceptionTimes` alléén als werkende uitzondering wanneer de OPS-markering aanwezig is — anders als feestdag, óók met gevulde `RecurrencePattern` (het conservatieve oude gedrag voor externe bestanden). Extra acceptatiecase: een extern-stijl fragment met recurrente feestdag (gevulde `RecurrencePattern`, geen OPS-markering) leest als féést-dag — mutatiebewijs: discriminator terugzetten naar "recurrence-ref gevuld" → deze case ROOD. Backwards compatible: bestaande bestanden schrijven/lezen byte-identiek.

**Acceptatie (mutatie-bewijs).**
1. De `satisfies Required<WorkCalendar>`-fixture in `check-ifc-roundtrip.ts` geeft een **compile-fout** zodra T2 het veld toevoegt — dat is het bewijs dat het contract sluit; los die op door het veld écht te vullen, niet door de fixture te verzwakken.
2. Mutatie: laat de banden weg in de writer → round-trip ROOD (veld-voor-veld).
3. Idempotentie-check blijft groen (writeIFC∘readIFC∘writeIFC).
4. Kalender zónder werkende uitzonderingen: geschreven IFC byte-identiek aan vóór deze taak (`verify:examples` groen zonder regeneratie).

**Afhankelijk van:** T2. **Risico:** midden.

---

### BAAN S — solver

#### T6 — Mijlpaal-instantconventie (MSP: mijlpaal landt op de finish-instant van de voorganger)

**Doel.** Een mijlpaal die via FS aan een voorganger hangt, krijgt MS Projects eigen klokstand (`…T17:00`), niet de volgende werk-instant (`…+1 dag T08:00`).

**Meting die deze taak rechtvaardigt.** 92 finish-afwijkingen en 32 start-afwijkingen volgen exact het patroon "MSP 17:00 → onze 08:00"; 31 daarvan zijn duur-0-mijlpalen, verspreid over 31 bestanden. Voorbeeld (`mpp14baseline.mpp`, taak "Complete"): MSP `2006-09-14T17:00`, wij `2006-09-15T08:00`.

**Bestanden.** `src/engine/scheduler/relationMath.ts` (verifieer op inhoud: `relationBoundaryFlags`, `forwardHour`'s `FINISH_START`-tak met `succIsFinishMs`/`predEndsBeginOfDay`, `backwardHour`); `src/engine/scheduler/CPMSolver.ts` (verifieer: `hammockEarlyFinish`, `finishFromStart`, de `isMilestone`-takken); `tests/planning/cases-milestone-kinds.json`, `cases-milestones.json`, nieuw `tests/planning/cases-msp-pariteit.json`.

**Aanpak (in deze volgorde, meet-eerst).**
- [ ] De machinerie bestáát al: `milestoneKind: 'START' | 'FINISH'` met `succIsFinishMs` in `relationMath`. Geen enkele lezer zet 'm (`mppReader`/`mspdiReader` zetten alleen `isMilestone`). Onderzoek eerst of het volstaat om (a) `milestoneKind` af te leiden bij import — anker op een bandeinde ⇒ `FINISH`, op een bandbegin ⇒ `START` — en (b) `availableStart`/`nextWorkInstant` correct te laten omgaan met een instant exact op een bandgrens. **Die (b)-helft moet gemeten worden: `availableStart(17:00)` levert nu vermoedelijk `volgende dag 08:00`, ook met `succIsFinishMs`.**
- [ ] De import-afleiding (a) hoort in BAAN L (`mppReader.ts`) — zie T11. Deze taak levert alleen de solverkant + de synthetische cases.
- [ ] Blijkt (a)+(b) niet te volstaan, dan een expliciete duur-0-regel in de FS-tak. **Niet** de algemene snap-semantiek voor taken mét duur wijzigen: die is corpusbreed correct (een gewone taak ná een 17:00-finish start wél de volgende dag 08:00).

**Acceptatie (mutatie-bewijs).**
1. Nieuwe cases in `cases-msp-pariteit.json`: uurkalender 08:00–17:00, taak A eindigt di 17:00, mijlpaal M via FS → `M.earlyStart === M.earlyFinish === di 17:00`; controle-case: taak B (duur 1d) via FS → `wo 08:00` (ongewijzigd).
2. Mutatie: draai de nieuwe mijlpaaltak terug → beide fidelity-tellers stijgen met de gepinde bedragen én de nieuwe case ROOD.
3. Mutatie: pas de regel ook op duur>0 toe → de controle-case ROOD.
4. Dagmodus byte-identiek (in dagmodus bestaat de klokstand niet): alle bestaande cases groen zonder aanpassing.

**Afhankelijk van:** niets. **Blokkeert:** T13. **Risico:** hoog (raakt gedeelde relatie-wiskunde). Kwaliteitsreview op Opus.

> **Bevinding tijdens uitvoering (2026-08-15):** T6 is **corpus-dormant** tot T11 — geen lezer zet `milestoneKind`, dus `succIsFinishMs` is op het corpus overal false en T6's corpusdelta is vandaag exact 0 (schoon geïsoleerd gemeten). De verwachte ~92 finish-/~32 start-verbetering materialiseert pas bij T13 wanneer T6+T11 samen zijn geïntegreerd — T13's hermeting moet dat gecombineerde effect verantwoorden, niet per taak. Er bleken bovendien twéé onafhankelijke dubbel-snap-plekken (forwardHour-FS-tak én de generieke her-snap in forwardPass), beide apart mutatie-bewezen op case msp-01.

#### T7 — Projectstart-vloer: nooit een ingelezen anker overrulen

**Doel.** De vloer (`rootFloor`) mag geen taak vooruit klemmen die in het bronbestand aantoonbaar eerder start.

**Meting.** Vloer uitzetten: −25 start-, −19 finish-afwijkingen, +7 volledig exacte bestanden, **0 bestanden slechter**. Van de 25 taken hebben er 11 een expliciete SNET vóór projectstart; 14 hebben geen enkele constraint.

**Bestanden.** `src/engine/scheduler/CPMSolver.ts` (verifieer op inhoud: `rootFloor`, `projectStartRaw`, de `projectStart`-precompute in `forwardPass`, `applyForwardConstraints`); `src/engine/scheduler/solveProject.ts` (alleen doc-commentaar bij `projectStartDate`); `tests/planning/cases-driving.json`, `cases-move-project.json`, `cases-boundary.json`.

**Verplichte volgorde.**
- [ ] Zoek éérst de gebruikstest-bevinding 2026-08 terug die de vloer introduceerde (grep `gebruikstest-bevinding 2026-08` in `src/`, en `projectstart-vloer` in `tests/planning/cases-*.json` — `cases-driving.json` en `cases-move-project.json` leunen er expliciet op) en schrijf op wélk scenario de vloer beschermt.
- [ ] Formuleer dan de smalste regel die beide bedient. Kandidaat: de vloer geldt uitsluitend als ondergrens tegen **relatie-leads** (dat is de tekst in `forwardPass` zelf) en **niet** meer als klem op het eigen anker van een taak zonder voorganger — dus `rootFloor` levert het eigen anker, terwijl de `projectStart`-ondergrens in de voorganger-tak blijft staan. Verifieer die kandidaat tegen beide case-bestanden **en** tegen de 12 corpusbestanden.
- [ ] Lukt dat niet zonder een bestaande case te breken: **escaleren naar de orkestrator met de meting**, niet stilzwijgend een case herschrijven.

**Acceptatie (mutatie-bewijs).**
1. De 12 corpusbestanden met `storedVoorProjectstart` bereiken 0 start- en 0 finish-afwijkingen op die taken.
2. `cases-driving.json` en `cases-move-project.json` blijven groen **zonder** aangepaste verwachtingen.
3. Mutatie: zet de oude `rootFloor`-max terug → fidelity ROOD op precies die 12 bestanden.
4. Mutatie: verwijder óók de `projectStart`-ondergrens in de voorganger-tak → de lead-afkap-cases in `cases-driving.json`/`cases-lag-advanced.json` ROOD (bewijst dat de smalle regel écht smal is).

**Afhankelijk van:** niets. **Risico:** midden-hoog (bekende gebruikersfunctie). Kwaliteitsreview op Opus.

#### T8 — ELAPSED-duur rekent in kalendertijd

**Doel.** Een taak met een elapsed-duureenheid loopt 24/7 door, zoals MS Project.

**Bestanden.** `src/engine/scheduler/CPMSolver.ts` (verifieer: `finishFromStart`, `startFromFinish`, de `durationMinutesOf`/`durationDaysOf`-aanroepen); `src/engine/scheduler/duration.ts`; `tests/planning/cases-msp-pariteit.json`.
De leeskant (`durationType: 'ELAPSEDTIME'` zetten uit veld `DurationUnits`=181) zit in **T10** — disjunct bestand, expliciete afhankelijkheid.

**Precedent om te hergebruiken:** `resolveElapsedMinutes` + de `lagUnit === 'ELAPSEDTIME'`-takken in `relationMath.ts` doen dit al voor lags. Zelfde semantiek, niet een tweede variant.

**Toegevoegd uit T10-review (2026-08-15):** de uurmodus-herberekening van `scheduleDuration` in `CPMSolver` (verifieer op inhoud: `mins / (cal.hoursPerDay * 60)` in de uur-tak) is elapsed-naïef — dezelfde dubbele-deling-valkuil als de dag-modus die T10 in de lezer fixte. T8 moet deze tak `durationType`-bewust maken én een case toevoegen die uurmodus+ELAPSEDTIME `scheduleDuration` pint (T10's corpuscase test dat bewust nog niet). De lezer-kant (uurmodus in `mppReader.ts`) volgt dezelfde conventie en is dan automatisch consistent.

**Acceptatie (mutatie-bewijs).**
1. `mpp14duration.mpp` bereikt 0 afwijkingen (nu 3 finish-afwijkingen: 1 elapsed dag = +24 klok-uur, 1 elapsed week = +7 kalenderdagen, 1 elapsed maand = +30 kalenderdagen).
2. Nieuwe cases: taak met `durationType: 'ELAPSEDTIME'`, 2 dagen, start vrijdag → finish zondag (niet dinsdag).
3. Mutatie: negeer `durationType` in `finishFromStart` → case + `mpp14duration.mpp` ROOD.
4. Taken met `WORKTIME` (3408 van de 3413) volledig ongewijzigd.

**Afhankelijk van:** T10 (voor de corpusclaim); de synthetische cases kunnen eerder. **Risico:** laag-midden.

#### T9 — Voortgangsafronding (MEET-EERST)

**Doel.** Geen klokstanden produceren die MS Project nooit toont, ná de voortgangsverwerking.

**Werkwijze.** Deze taak start **na** T13's hermeting. Draai `OPS_MPP_FIDELITY_REPORT=detail` en filter op taken met `completion > 0`; classificeer het restant. Pas dán een fix ontwerpen in `CPMSolver`'s voortgangstak (verifieer op inhoud: `dataDate`-blok, `actualFinish && completion >= 1`, de `snapOnOrBefore`/`snapOnOrAfter`-inversieregel) en/of `applyCpmResult`.
**Bestanden.** `src/engine/scheduler/CPMSolver.ts`, `src/engine/scheduler/applyCpmResult.ts`, `tests/planning/cases-progress.json`.
**Acceptatie.** Elke resterende voortgang-gerelateerde afwijking is óf weg, óf gepind mét geschreven, bewijsbare reden. Mutatie: draai de fix terug → de betrokken bestanden ROOD. `cases-progress.json` blijft groen zonder aangepaste verwachtingen.
**Afhankelijk van:** T13. **Risico:** onbekend tot gemeten — daarom meet-eerst.

---

### BAAN L — lezer, melding, gids

#### T10 — `DurationUnits` lezen → `durationType`

**Doel.** Elapsed-eenheden overleven de import.
**Bestanden.** `src/services/mpp/mppReader.ts` (verifieer op inhoud: fase C, `durationMinutes`/`duration`-berekening, `tenthsOfMinutesToDays`, `time: { durationType: 'WORKTIME', … }`); `src/services/mpp/fieldMap14.ts` (`TaskFieldId.DurationUnits` bestaat al: 181 — nu ook echt gebruiken in `readTasks`); `tests/planning/check-mpp-import.ts`.
**Acceptatie.** Mutatie: hardcodeer `durationType: 'WORKTIME'` terug → de nieuwe leescase in `check-mpp-import.ts` ROOD (5 taken in `mpp14duration.mpp` met `elapsedMinutes/Hours/Days/Weeks/Months`). Let op de conversie: `getDuration()` in `mppPrimitives.ts` rekent elapsed al in klok-minuten — de dag-omrekening in `mppReader` mag die niet nóg eens door `hoursPerDay` delen.
**Afhankelijk van:** niets. **Blokkeert:** T8's corpusclaim. **Risico:** laag.

#### T11 — `milestoneKind` afleiden bij import

**Doel.** T6 de informatie geven die MS Project impliciet in de opgeslagen instant stopt.
**Bestanden.** `src/services/mpp/mppReader.ts`; de MSPDI-kant (`mspdiReader.ts`) **staat in BAAN K** — coördineer: deze taak wacht tot T4 gemerged is, of de MSPDI-kant verhuist naar T4.
**Ontwerp.** Alleen voor `isMilestone`-taken in uurmodus: anker exact op een bandeinde ⇒ `milestoneKind: 'FINISH'`; op een bandbegin ⇒ `'START'`; elders ⇒ niet zetten (huidig gedrag).
**Acceptatie.** Mutatie: laat de afleiding weg → de 31 mijlpaalbestanden ROOD in fidelity. Leescase in `check-mpp-import.ts`: bekende mijlpaal krijgt `FINISH`.
**Afhankelijk van:** T6 (semantiek). **Risico:** laag-midden.

#### T12 — Split-/leveling-detectie, melding in 14 talen, gidsartikel

**Doel.** De toegestane uitzondering wordt zichtbaar voor de gebruiker en gedocumenteerd. **Uitsluitend detectie + melding + documentatie — geen splits/leveling als feature.**

**Bestanden.** `src/services/mpp/mppReader.ts` (detectie); `src/services/importTypes.ts` (nieuw veld op `ImportResult`, bv. `sourceScheduleNotes?: { splitTasks: number; leveledTasks: number }` — **geen** nieuw persistent taakveld, zie §9/O3); `src/state/slices/fileSlice.ts` (verifieer op inhoud: `applyLoadedProject`, het `summaryRelationsDropped`-blok — dat is het te kopiëren patroon: `get().notify({ severity:'info', messageKey, params, dedupeKey })`); `src/i18n/locales/*/common.json` (14 talen); `public/docs/nl/gids-msproject-import.md` + `public/docs/en/gids-msproject-import.md` + `public/docs/manifest.json`; `tests/planning/check-notifications.ts`, `tests/planning/check-mpp-import.ts`.

**Detectiebronnen, in volgorde van bewijskracht.**
1. **Expliciet uit het bestand:** `LEVELING_DELAY` (TaskField; via `fixedOffsetOf(fm, id)` — de field map komt uit het bestand zelf, dus het volstaat de id-constante toe te voegen) ≠ 0, en de splits-array uit de taak-`Var2Data` (verifieer of MPXJ die in MPP14 leest: grep `setSplits`/`SPLITS` in `voor claude/testdata-crawl/mpxj/src/main/java/org/mpxj/mpp/`). Lukt de splits-bytes niet betrouwbaar, dan:
2. **Afgeleid, aantoonbaar:** MSP-eigen venster (`workMinutesBetween(storedStart, storedFinish)` in de effectieve kalender) > MSP-eigen duur ⇒ onderbroken of vertraagde balk. Gemeten: 108 taken. **Deze meting is pas betrouwbaar ná T3** (een gemiste feestdag geeft een vals positief) — daarom draait deze detectie op de gerepareerde kalender.

**Meldingstekst (nl, bron voor de 12 vertalingen; en verplicht).** Neutraal, tellend, niet-blokkerend, `severity: 'info'`, `dedupeKey: 'mpp-split-leveled'`, met `{{count}}` en volledige CLDR-pluralcategorieën (`verify:i18n` rekent met categorieën, niet met sleutelvergelijking; `zh/ja/ko` géén `_one`, `pl` `few`/`many`, `es/fr/it/pt` `many`):
> "Dit MS Project-bestand bevat {{count}} taak/taken met een onderbroken, genivelleerde of resource-gedreven planning. Open Planner Studio rekent die aaneengesloten door; hun datums kunnen daardoor afwijken van MS Project. Zie de gids: MS Project-import."

**Gidsartikel (nl + en, manifest-entry, binnen de `miniMarkdown`-subset: geen tabellen, geen blockquotes, geen h4, alleen `docs://`/`examples://`-links).** Secties: wat wél 1-op-1 overkomt (na deze etappe: datums op de minuut), wat niet (gesplitste taken, resource-nivellering, resource-contouring), waarom, en wat de gebruiker kan doen.

**Acceptatie (mutatie-bewijs).**
1. Mutatie: verwijder de `notify`-aanroep → nieuwe case in `check-notifications.ts` ROOD.
2. Mutatie: verwijder één taal uit de sleutelset → `verify:i18n` ROOD.
3. Mutatie: hernoem het gids-id in het manifest → `verify:docs` ROOD.
4. De melding verschijnt **niet** bij een bestand zónder splits/leveling (negatieve case, `Bijlage 13 Productieplanning.mpp`: `spanGt = 0`).
5. De detectie telt exact de gepinde aantallen per corpusbestand (nieuwe pins in het fidelity-baselinebestand).

**Afhankelijk van:** T3 (betrouwbare detectie). **Risico:** laag-midden; veel oppervlak (14 talen + docs).

---

### SERIEEL

#### T13 — Integratie, hermeting, herpinnen

**Doel.** Alle banen samen, één hermeting, nieuwe baselines.
**Stappen.** Banen mergen → `OPS_MPP_FIDELITY_REPORT=baseline` draaien → nieuwe pins committen → `npm run verify` → het resterende afwijkingsbeeld classificeren en aan T9/T15 doorgeven.
**Extra stap (uit T2-afwijking 2026-08-15):** `tests/planning/harness.ts` (gedeelde infra) additief uitbreiden: `Cal`-type + de `addCalendar`/`setCalendar`-call-sites krijgen een `workingExceptions`-veld, en dan alsnog de drie CPM-end-to-end-cases (werkende zaterdag / eigen banden / precedentie boven feestdag) in `cases-kalenders.json` — met mutatiebewijs dat de case rood wordt wanneer `isWorkDay` workingExceptions negeert (anders test de JSON-case stil niets, zoals T2 constateerde).
**Extra stap (uit T2-Opus-review LAAG-7, 2026-08-15):** afnemers buiten de engine die `calendar.holidays` rechtstreeks lezen of weekend hardcoderen worden `workingExceptions`-bewust of krijgen een expliciet-gedocumenteerde beperking: `src/services/print/printPreview.ts` (eigen holidaySet + `dow===6||7`-weekend — een werkende zaterdag print nu als weekend), `GanttRenderer.ts` feestdag-label (arcering is al correct via `isWorkDay`), en de exporterende paden `mspdiWriter`/`p6xmlWriter`/`freePeriods`/`extMappers` (verliezen workingExceptions nu stil bij export). Per afnemer: fixen of als bekende beperking in de gids/TODO vastleggen — niet stilzwijgend laten liggen.
**Acceptatie.** `npm run verify` groen; elke baseline-wijziging in het commitbericht verantwoord met "welke taak, welk gemeten effect".
**Afhankelijk van:** T2–T8, T10–T12.

#### T14 — Gebruikstest in de browser (aparte agent, DIRECT na T13)

**Doel.** Bewijzen dat het in de échte app klopt, niet alleen headless. **Bewust hier gepland, niet aan het eind.**
**Werkwijze.** Zie `docs/self-test-harness.md`, tier 1: `npm run dev` (poort per worktree — lees hem uit de dev-serveruitvoer of uit `.claude/launch.json`, neem nooit 3007 aan), Playwright-MCP + `window.__OPS__`; assert op **store-state**, niet op canvas-pixels.
**Scenario's.** (1) Open `Bijlage 20 productieplanning PKB.mpp` → geen melding, datums in de tabel gelijk aan MS Project. (2) Open een OzBuild-workshopbestand met feestdagen → Gantt toont de kerstdagen als vrij. (3) Open een bestand met leveling → melding verschijnt precies één keer, met het juiste aantal, en de gidslink werkt. (4) Open → opslaan als IFC → heropenen → kalenderuitzonderingen (ook de werkende) staan er nog, datums identiek. (5) Taalwissel naar `pl` en `ja` → meldingstekst correct meervoudig, geen Engelse terugval.
**Acceptatie.** Bevindingen als losse, benoemde items terug naar de orkestrator; blokkerende bevindingen worden taken vóór T15.

#### T15 — Residu-iteratie tot de goal

**Doel.** Van "veel beter" naar "de goal".
**Werkwijze.** Itereer: `OPS_MPP_FIDELITY_REPORT=detail` → classificeer élke resterende afwijkende taak → één van drie uitkomsten:
- **(a)** het is een echte bug → eigen mini-taak in de juiste baan, met mutatiebewijs;
- **(b)** de taak is aantoonbaar gesplitst/genivelleerd/resource-gedreven → moet in de T12-detectie vallen (zo niet: detectie verbreden) en in de gids staan;
- **(c)** geen van beide → **escaleren**, niet stilzwijgend pinnen. Pinnen mag alleen met een geschreven, gemeten reden in het baselinebestand én akkoord van de orkestrator.
**Uitgangscriterium.** Elke taak in het corpus valt in (a-opgelost) of (b). Categorie (c) is leeg of expliciet door de eigenaar geaccordeerd.

#### T16 — Eindreview, `verify`, documentatie bijwerken

`npm run verify` groen; `docs/TODO.md` bijgewerkt; MPXJ-attributie in nieuwe/gewijzigde bestanden intact (LGPL-2.1-herkomst); hyperkritische eindreview (Opus) op de volledige diff van de etappe.

---

## 3. Parallelliseringsschema

```
                    T1 (baan M — harnas)      ← eerst, iedereen meet hierop
                             │
        ┌────────────────────┼────────────────────┬─────────────────────┐
     BAAN K                BAAN S              BAAN L                (T9 wacht)
   T2 → T3 → T4          T6 ─┐  T7 ─┐        T10 ─┐  T11 ─┐
        └→ T5             T8 ─┘     │        T12 ─┘       │
                                    ▼                     ▼
                    ══════════ SYNC: T13 integratie + hermeting ══════════
                                    │
                                T14 gebruikstest (aparte agent, browser)
                                    │
                            T9 (voortgang, meet-eerst) → T15 residu → T16
```

**Strikt disjuncte bestandslijsten per baan** (één taak tegelijk per baan; `run.sh` wordt door precies één taak aangeraakt: T1):

| baan | exclusief eigendom |
|---|---|
| M | `tests/planning/mppFidelity.ts`, `mppGroundTruth.ts`, `check-mpp-fidelity.ts`, `mpp-fidelity-baseline.json`, `tests/planning/run.sh` |
| K | `src/types/calendar.ts`, `src/engine/scheduler/CalendarEngine.ts`, `src/services/mpp/mppCalendars.ts`, `src/services/mpp/limits.ts`, `src/services/msproject/mspdiReader.ts`, `src/services/ifc/ifcWriter.ts`, `src/services/ifc/ifcReader.ts`, `tests/planning/check-mpp-calendars.ts`, `check-calendar-hours.ts`, `check-adapters-hours.ts`, `check-ifc-roundtrip.ts`, `cases-kalenders.json` |
| S | `src/engine/scheduler/CPMSolver.ts`, `relationMath.ts`, `applyCpmResult.ts`, `duration.ts`, `solveProject.ts` (alleen commentaar), `tests/planning/cases-msp-pariteit.json` (nieuw), `cases-milestones.json`, `cases-milestone-kinds.json`, `cases-driving.json`, `cases-move-project.json`, `cases-progress.json` |
| L | `src/services/mpp/mppReader.ts`, `src/services/mpp/fieldMap14.ts`, `src/services/importTypes.ts`, `src/state/slices/fileSlice.ts`, `src/i18n/locales/**`, `public/docs/**`, `tests/planning/check-mpp-import.ts`, `check-notifications.ts` |

**Twee bekende raakvlakken, expliciet geregeld.** (1) `mspdiReader.ts` hoort bij K; T11 (baan L) wacht daarop of draagt zijn MSPDI-helft over aan T4. (2) `limits.ts` hoort bij K; heeft baan L een klem nodig, dan komt die tijdelijk lokaal in `mppReader.ts` en verhuist bij T13.

---

## 4. Modeltoewijzing

| rol | model | waarom |
|---|---|---|
| implementers (alle T-taken) | **Sonnet** | uitvoerend werk met scherpe specificatie en harde poorten |
| kwaliteitsreviews T1, T2, T3, T6, T7 + eindreview T16 | **Opus** | de taken met de grootste blast radius: harnas, engine-lus, byte-parsing, relatie-wiskunde |
| mechanische spec-reviews (T4, T5, T8, T9, T10, T11, T12) | **Sonnet** | contract-/volledigheidscontrole tegen dit plan |
| gebruikstest T14 | **Sonnet** (aparte agent, browser) | scenario-uitvoering |
| **nooit** | **Fable** | — |

---

## 5. Het gedeelde meetscript

**Eén artefact, twee levens** (details in T1):

**(a) Tijdens de etappe** — `bash tests/planning/run.sh check-mpp-fidelity` of direct de gebundelde check met `OPS_MPP_FIDELITY_REPORT=detail`. Implementers draaien dit vóór en ná elke wijziging en zetten de voor→na-cijfers in het commitbericht; reviewers draaien exact hetzelfde commando — geen privé-harnas meer, geen gepinde code-snapshot. Het meet tegen de **live worktree** via `readMPP` + `solveProject`.

**(b) Als regressietest** — dezelfde module, default-modus, geregistreerd in `run.sh` binnen `RUN_HOLIDAYS`, dus ook in de tijdzone-matrix (gemeten: < 1 s per volledige corpusronde). Assertievorm:

```
per corpusbestand, met === (geen <=, geen som):
  tasks, startExact, startSameday, startDiff, finishExact, finishSameday, finishDiff
globaal:
  aantal gepinde bestanden dat gezien is === pinned.length
  de VERZAMELING bestanden met ≥1 afwijking === de gepinde verzameling   ← vangt een nieuw
                                                                            afwijkend bestand,
                                                                            ook als een ander
                                                                            tegelijk verbetert
```

Géén somtotalen per bestand: een compensatie (start beter, finish slechter) moet rood worden. Ontbreekt het corpus, dan één OK-skipregel per wortel en exit 0 — nooit invloed op het eindoordeel van de suite (conventie C3 uit `check-mpp-import.ts`).

**Het scratchpad-harnas wordt niet gemigreerd maar heríngericht.** Overneembaar: `rawScan` (→ `mppGroundTruth.ts`), `classify`/`dayDelta`, de attribuut-emmers, het `detail`-formaat, de `spanEq/spanGt/spanLt`-meting (wordt T12's detector). Bewust **niet** overnemen: het `snap/`-mechanisme en `build.sh` (die pinnen juist op oude code — precies wat we niet willen), de `NO_PSD`-env-schakelaar (was een eenmalige causaliteitstest) en de `whatif`-modus (heeft zijn werk gedaan; de causaliteit staat nu in dit plan).

---

## 6. Baselinebeleid en privacy

**Waar de pins leven: in de repo**, als `tests/planning/mpp-fidelity-baseline.json`. **Sleutel = SHA-256 van de bestandsbytes (eerste 16 hex-tekens), niet de bestandsnaam.**

Argumentatie:
- **Corpusinhoud komt nooit in de repo** — een baseline bevat alleen tellingen, geen taaknamen, geen datums, geen structuur.
- **Bestandsnamen kunnen gevoelig zijn** ("Bijlage 13 …", "Productie planning"). Content-hash-sleutels lekken niets. Voor bestanden onder de crawl-wortel (publieke MPXJ-junit-data en OzBuild-workshopmateriaal — geen bedrijfsdata) mag een leesbaar `label` mee voor de diagnose; voor bestanden onder `OPS_MPP_CORPUS` blijft dat veld leeg. **Precedent, wel opmerken:** de drie bedrijfsbestandsnamen staan al letterlijk in `tests/planning/check-mpp-import.ts` (`EXPECTED_TASK_COUNTS`) — dit plan breidt die blootstelling níét uit (zie §9/O4).
- **Content-adressering is bovendien functioneel beter:** wordt een corpusbestand in MS Project bewerkt, dan verandert de hash en meldt de check "ongepind bestand", in plaats van stilletjes een verkeerde pin toe te passen.
- **Een externe map is géén betere plek:** een baseline náást het corpus is niet versiebeheerd, niet reviewbaar en niet reproduceerbaar in CI — dan verliest de "herhaalbare regressietest" precies zijn waarde. De privacyreden vervalt zodra de sleutels gehasht zijn.

Herpinnen gaat altijd via `OPS_MPP_FIDELITY_REPORT=baseline` → uitvoer met de hand in het bestand plakken → commitbericht vermeldt welke taak welke tellers waarom verandert. De check schrijft nooit zelf.

---

## 7. Hardening-checklist — kopieer dit blok ONGEWIJZIGD in élke implementer-prompt

- [ ] **Geen allocaties of lussen uit ongevalideerde bestandswaarden.** Elke telling/lengte/offset uit het bestand wordt geklemd vóór gebruik; de klem staat in `src/services/mpp/limits.ts` met een **meetcommentaar** erbij (wat is de gemeten corpuswaarde, waarom is deze bovengrens ruim, en wat kost het ergste geval zonder klem).
- [ ] **Strings gechunkt en begrensd.** Geen `String.fromCharCode(...bigArray)`; hergebruik het bestaande gechunkte pad in `mppPrimitives.getUnicodeString` en `MAX_VAR_TEXT_BYTES`.
- [ ] **Geen module-level muteerbare singletons.** Caches horen aan een instantie of aan een expliciet meegegeven context (patroon: de `HolidayBudget`-factory in `mppCalendars.ts`). Een module-scope `Map` die tussen documenten blijft leven is een bug, geen optimalisatie.
- [ ] **Elke nieuwe `try`/`catch`-wrapper krijgt een eigen rode-pad-fixture** die aantoonbaar door die `catch` gaat — een `catch` zonder test is een stille faalmodus.
- [ ] **Fixtures schrijf je nooit naar de implementatie toe.** Bouw de verwachting uit de specificatie/de MPXJ-bron/de MS Project-uitvoer, niet uit wat de code nu toevallig oplevert. Moet een bestaande verwachting wijzigen, dan is dát het te motiveren feit.
- [ ] **Testcommentaren claimen alleen wat mutatie-bewezen is.** Schrijf je "vangt X", dan heb je X daadwerkelijk gemuteerd en de test rood gezien. Anders formuleer je het zwakker.
- [ ] **Binaire testdata nooit door `TextEncoder`.** Bouw `Uint8Array`/`DataView` direct; `TextEncoder` maakt van elke byte ≥ 0x80 stil twee bytes.
- [ ] **Exitcode is de poort, nooit de tail-uitvoer.** De planningssuite print "alles groen" ook bij exit 1 als het bundelen faalt.
- [ ] **Byte-identiek waar niets zou mogen wijzigen.** Een nieuw optioneel veld dat afwezig is ⇒ exact hetzelfde gedrag als daarvoor; bewijs dat met de bestaande 455 cases zónder aangepaste verwachtingen.
- [ ] **Nooit de corpusbestanden of hun inhoud committen** (bedrijfsdata/licentie). Ook geen fragmenten in commitberichten, testcommentaren of foutmeldingen.

---

## 8. Openstaande vragen van de architect

O1 (breedte van de toegestane uitzondering), O2 (projectstart-regel dekt 14/25 niet), O3 (persistent taakveld?), O4 (baselinebeleid/hashes), O5 (werkweken-probe → T3b?), O6 (mijlpaalconventie engine-breed?), O7 (MPP_LEGACY = overgeslagen?). Beantwoord in §9.

## 9. Orkestratorbesluiten op §8 (2026-08-15)

- **O1 — uitzondering verbreed naar "resource-gedreven planning".** De goal-formulering "gesplitst of resource-genivelleerd" wordt gelezen als de familie *resource-gedreven planningsafwijkingen*: nivellering, leveling delay én resource-contouring/timephased werk. De melding en de gids benoemen alle drie. **Mijlpaal-met-duur is géén uitzondering maar een solver-bug** — kleine extra fix in baan S (onder T6 of als mini-taak in T15), met eigen case + mutatiebewijs.
- **O2 — de brede regel.** T7 implementeert "een ingelezen anker wordt nooit door de vloer overruled" (de vloer versmalt tot ondergrens tegen relatie-leads), want de goal eist minuut-exactheid óók voor de 14 constraint-loze taken. De bestaande cases zijn de wacht: breekt er één, dan escaleert de implementer naar de orkestrator met de meting — die beslist dan of de eigenaar gevraagd moet worden. Het oorspronkelijke vloer-scenario wordt door de implementer teruggezocht (verplichte stap 1 van T7) en gedocumenteerd in de commit.
- **O3 — geen persistent taakveld.** Melding alleen bij openen (patroon `summaryRelationsDropped`), geen documentcontract-impact. Persistente herkomstmarkering hoort bij de latere splits-etappe.
- **O4 — hash-gesleutelde pins in de repo, akkoord.** Leesbare labels alleen voor crawl-bestanden (publiek materiaal); bedrijfsbestanden hash-only. De drie bestaande bedrijfsbestandsnamen in `check-mpp-import.ts` blijven in deze etappe staan (precedent niet uitbreiden, wel aan de eigenaar gemeld als optioneel op te schonen).
- **O5 — T3b vooraf goedgekeurd** mits de probe > 0 relevante bestanden meet én werkweken aantoonbaar afwijkingen verklaren; anders gidsvermelding als bekende beperking.
- **O6 — mijlpaalconventie engine-breed, akkoord.** MS Project-semantiek is de gekozen norm (zelfde eigenaarslijn als de verzamelrelatie-verzoening) en P6 hanteert dezelfde conventie. Het is een gedragswijziging in uurmodus voor bestaande gebruikers; wordt vermeld in de gids en te zijner tijd in de releasetekst.
- **O7 — bevestigd:** `MPP_LEGACY`-weigeringen tellen als "overgeslagen", nooit als fout. De goal gaat over wat geïmporteerd wórdt.
