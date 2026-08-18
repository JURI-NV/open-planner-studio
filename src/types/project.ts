/** Voortgangs-scheduling-modus (P6, fase 2.6). undefined ⇒ RETAINED_LOGIC (de default). */
export type ProgressMode = 'RETAINED_LOGIC' | 'PROGRESS_OVERRIDE';

/**
 * Project-scoped reken-opties (fase 2.9, §3.4/§7). ELKE default = het huidige gedrag ⇒ een afwezig
 * (of leeg) blok is byte-identiek aan vóór 2.9. Deze opties horen bij het BESTAND (net als
 * statusDate/progressMode), niet bij de app-settings — anders zou hetzelfde bestand op twee machines
 * een ander schema geven (§7). De solver leest ze via `CPMOptions.schedulingOptions`.
 */
export interface SchedulingOptions {
  /** Kalender voor relatie-lag (P6 4-way, Rapport B §7.1). Default 'predecessor' = de huidige
   *  LAG_CALENDAR-constante (lagCalendar.ts) ⇒ byte-identiek. */
  lagCalendar?: 'predecessor' | 'successor' | '24hour' | 'projectDefault';
  /** Kritiek-definitie. Default { mode:'totalFloat', threshold:0 } = het huidige tf≤0. */
  criticalDefinition?: { mode: 'totalFloat' | 'longestPath'; threshold?: number };  // threshold mag negatief (P6)
  /** TF-berekeningswijze. Default 'smallest' = de huidige min(finish,start)-float. */
  totalFloatMode?: 'start' | 'finish' | 'smallest';
  /** Open-ended taken kritiek? Default = huidig gedrag (een eindtaak krijgt tf via LF−EF). */
  makeOpenEndedCritical?: boolean;
  /** Near-critical-drempel in werkdagen (fractioneel in uur-modus). Default undefined ⇒ feature uit. */
  nearCriticalThreshold?: number;
  /** Multiple float paths. Default undefined ⇒ uit (byte-identiek). */
  floatPaths?: { enabled: boolean; method: 'FREE_FLOAT' | 'TOTAL_FLOAT'; maxPaths: number };
  /** T9 (voortgangsafronding, MSP-pariteit): MS Project hervat het restwerk van een IN PROGRESS-
   *  taak NIET op `max(statusDate, voorganger-druk)` (P6's eigen RETAINED_LOGIC-conventie, de
   *  huidige/default-berekening — zie `CPMSolver.ts`'s voortgangstak) maar op `actualStart +
   *  reeds-verstreken-duur` (`scheduleDuration/durationMinutes − remaining`, doorgesnapt via
   *  dezelfde werk-optelling als het restwerk zelf) — als DERDE, uitsluitend VERHOGENDE vloer naast
   *  de bestaande twee. Default `undefined`/`false` ⇒ het bestaande, P6-getrouwe gedrag, byte-
   *  identiek (bewaakt door `cases-progress.json`'s Scenario A/B/C, die P6's eigen gedocumenteerde
   *  RETAINED_LOGIC-semantiek toetsen — dít veld mag die niet stilzwijgend wijzigen). Uitsluitend
   *  `true` gezet door `mppReader.ts` (élke `.mpp`-import) — MSPDI/P6/CSV/IFC blijven op de
   *  bestaande P6-semantiek tot een eigen, apart gemeten reden om ze ook om te zetten. */
  resumeFromActualElapsed?: boolean;
  /** B1 (eindreview T16c, dossier (c)4-herdiagnose): MS Project verschuift een NIET-GESTARTE taak
   *  (`completion === 0`) NIET automatisch naar op-of-ná de statusdatum — dat "NIET GESTART:
   *  statusdatum als ondergrens"-gedrag (`CPMSolver.ts`'s forward-pass, vlak vóór
   *  `addDurationChecked`) is P6-eigen RETAINED_LOGIC-semantiek, net als `resumeFromActualElapsed`
   *  hierboven een P6-conventie vervangt voor de VOORTGANG-tak. Bewijs (reviewer-meting,
   *  `calendar-exception-precedence.mpp`, publiek MPXJ-fixture): mét de vloer wijkt de taak ~8 jaar
   *  af van MS Project se eigen opgeslagen Start/Finish (de statusdatum, 2023-05-01, ligt ver ná de
   *  taak se eigen 2015-10-01-anker); zónder de vloer is het resultaat minuut-exact. Een EIGEN,
   *  sibling-vlag i.p.v. hergebruik van `resumeFromActualElapsed` zelf: die twee bestrijken
   *  disjuncte taak-populaties (`completion > 0` resp. `completion === 0`) en een taak kan hooguit
   *  in één van beide vallen — samenvoegen tot één vlag zou geen enkel gedrag delen, alleen de
   *  "MSP-voortgangsconventie i.p.v. P6-RETAINED_LOGIC"-FAMILIE is gedeeld. Default `undefined`/
   *  `false` ⇒ het bestaande, P6-getrouwe gedrag, byte-identiek (bewaakt door dezelfde
   *  `cases-progress.json`-scenario's als `resumeFromActualElapsed`). Uitsluitend `true` gezet door
   *  `mppReader.ts` (élke `.mpp`-import); MSPDI/P6/CSV/IFC blijven op de bestaande P6-semantiek —
   *  het P6-pad (`progressMode`/statusdatum-gedreven planningen) behoudt de vloer bewust: dat is
   *  precies de RETAINED_LOGIC-conventie die P6 zélf documenteert. */
  unstartedIgnoresStatusDate?: boolean;
  /** Z12 (dossier out-of-sequence-actuals, retained logic): voor een taak die AANTOONBAAR
   *  out-of-sequence is met een FINISH_START-voorganger (`actualStart` vóór de herberekende — of,
   *  als bekend, de EIGEN opgeslagen — voorgangerfinish; dezelfde detectie als
   *  `CPMResult.outOfSequenceSequenceIds`, hier bewust beperkt tot FINISH_START, spiegelend het
   *  gemeten dossier) wordt de gewone RETAINED_LOGIC-herberekening ("max(dataDate, voorganger-druk)"
   *  + de `resumeFromActualElapsed`-vloer, `CPMSolver.ts`'s voortgangstak, BEIDE ONVERANDERD door
   *  deze vlag) vervangen door het reeds-ingelezen `task.time.scheduleFinish` — MSP's EIGEN,
   *  letterlijk opgeslagen finish voor die taak (nog ongewijzigd op het moment dat de forward-pas
   *  'm leest; `applyCpmResult` overschrijft dit veld pas ná afloop).
   *
   *  MEET-EERST-bevinding (twee kandidaat-formules eerst getoetst, geen van beide gekozen — zie
   *  hieronder waarom): op de root-cause-taak van het gemeten dossier ("Validate Technical
   *  Specification", twee OzBuild-bestanden, completion 8%/10%) geeft de bestaande RETAINED_LOGIC-
   *  vloer 6 dagen te laat t.o.v. MSP's eigen opgeslagen finish; PROGRESS_OVERRIDE (die de
   *  voorganger-druk óók laat vallen, maar daarbij ook de `resumeFromActualElapsed`-vloer overslaat)
   *  geeft 1 dag te vroeg. Een DERDE kandidaat — hervatting op `actualStart + reeds-verstreken-duur`
   *  (T9's `resumeFromActualElapsed`-mechanisme), MAAR ZONDER de voorganger-max — reproduceert MSP's
   *  eigen opgeslagen finish MINUUT-exact op beide bestanden (2019-01-03T17:00 resp.
   *  2025-01-07T17:00). Die formule bleek echter NIET te generaliseren: twee LATERE snapshots van
   *  exact dezelfde workshop-taak (OzBuild "After Para 28"/"End Para 29") hebben — geïsoleerd
   *  ingelezen — BYTE-VOOR-BYTE identieke `actualStart`/`completion`/voorganger-status voor deze
   *  taak/voorganger-combinatie, maar MSP's eigen opgeslagen finish is daar 2019-01-09T17:00 resp.
   *  2025-01-13T17:00 — precies de GEWONE RETAINED_LOGIC-uitkomst, dus GEEN uitzondering in díé
   *  snapshots. Twee bestanden met identieke zichtbare taakvelden maar een verschillend MSP-antwoord
   *  bewijst dat de out-of-sequence-uitzondering GEEN pure functie is van de huidige taakgrafiek —
   *  MSP's beslissing is kennelijk history-afhankelijk (bevroren op het moment dat de uitzondering
   *  ooit vuurde, niet bij elke herberekening opnieuw afgeleid uit actualStart/completion/voorganger-
   *  status) en dus met GEEN formule op basis van de huidige velden na te bootsen zonder de twee
   *  latere snapshots stuk te maken (geverifieerd: dezelfde derde-kandidaat-formule geeft daar 6
   *  dagen TE VROEG). Vandaar de ANKER-aanpak i.p.v. een vierde formule: `scheduleFinish` is per
   *  definitie MSP's eigen antwoord, ongeacht welke interne formule MSP zelf gebruikte, en levert zo
   *  op ALLE VIER de geverifieerde snapshots het juiste antwoord — ook op de twee die de
   *  geverifieerde formule zou breken. Zelfde soort "vertrouw het ingelezen anker"-redenering als
   *  `ownAnchor` voor wortel-taken (T7, §9/O2): de CPM-herberekening veronderstelt dat voorganger-
   *  druk betrouwbaar is, en precies dát valt weg zodra de taak aantoonbaar out-of-sequence is.
   *
   *  Default `undefined`/`false` ⇒ het bestaande, P6-getrouwe gedrag, byte-identiek (bewaakt door
   *  dezelfde `cases-progress.json`-scenario's als `resumeFromActualElapsed`/
   *  `unstartedIgnoresStatusDate`, met name Scenario B's `prog-B-oos-retained`/`prog-oos-fs`-familie
   *  — een P6-bron behoort een out-of-sequence-taak gewoon achter haar voorganger te laten wachten,
   *  dat is RETAINED_LOGIC's hele doel). Uitsluitend `true` gezet door `mppReader.ts` (élke
   *  `.mpp`-import, naast `unstartedIgnoresStatusDate`); MSPDI/P6/CSV/IFC blijven op de bestaande
   *  P6-semantiek — een `.mpp → MSPDI → herimport`-cyclus verliest deze vlag dus stil zodra MSPDI-
   *  export 'm niet meeschrijft (zie de `mspdiWriter.ts`-warn-registratie, Z14/O4). */
  outOfSequenceIgnoresPredecessorPressure?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string; // ISO 8601
  endDate: string;
  calendarId: string;
  createdAt: string;
  modifiedAt: string;
  author: string;
  company: string;
  /**
   * WBS-codes automatisch nummeren (1.2.3.4, afgeleid uit de boompositie): aan ⇒ live
   * hernummeren bij elke structuurmutatie; uit/ontbreekt ⇒ vrije tekst (bestaand gedrag),
   * met een expliciete "Hernummer WBS"-actie. Nieuwe projecten krijgen true; geladen
   * bestanden zonder vlag blijven op vrije tekst (MSP-stabiliteitsmodel: codes in
   * omloop worden niet stilzwijgend herschreven).
   */
  wbsAutoNumber?: boolean;
  /** P6 "data date" (fase 2.6): de grens verleden/toekomst. undefined = geen statusdatum ⇒ gedrag
   *  exact als vóór 2.6. Gezet ⇒ remaining werk kan niet vóór deze dag starten. */
  statusDate?: string;    // ISO — date-only in dag-modus; mag datetime zijn in uur-modus (fase 2.8b, §3.4)
  /** Voortgangs-scheduling-modus (fase 2.6). undefined ⇒ RETAINED_LOGIC. Documentinstelling. */
  progressMode?: ProgressMode;
  /** OPTIONEEL — project-scoped reken-opties (fase 2.9, §3.4/§7). Afwezig ⇒ elke default ⇒
   *  byte-identiek gedrag. */
  schedulingOptions?: SchedulingOptions;
  /** OPTIONEEL — projectbinding aan een bedrijfsbibliotheek (spec B1, §2). Afwezig ⇒ project is
   *  (nog) aan geen enkel bedrijf gebonden; heropening zonder de pool is onschuldig. `companyName`
   *  is een gedenormaliseerde cache zodat een gedeeld bestand het bedrijf toont zonder de pool. */
  companyId?: string;
  companyName?: string;
}

export interface ProjectStats {
  totalTasks: number;
  totalMilestones: number;
  criticalPathLength: number; // in work days
  totalFloat: number; // in work days
  percentComplete: number; // 0-100
}
