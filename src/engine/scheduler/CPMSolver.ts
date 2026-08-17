import { Task, type TaskConstraint, type ExternalLink } from '@/types/task';
import type { SchedulingOptions } from '@/types/project';
import { Sequence, LagUnit } from '@/types/sequence';
import type { WorkCalendar } from '@/types/calendar';
import { CalendarEngine } from './CalendarEngine';
import { resolveCalendar } from './resolveCalendar';
import {
  parseDate, formatDate, parseInstant, type DateMode,
} from '@/utils/dateUtils';
import {
  durationMinutesOf, durationDaysOf, elapsedMinutesOf, addElapsedMinutes, subtractElapsedMinutes,
  signedElapsedSpan,
} from './duration';
import { computeScheduleResults } from './scheduleAnalysis';
import {
  forwardConstraint, backwardConstraint, MS_PER_MIN, MS_PER_DAY, type RelationDeps,
} from './relationMath';

export interface CPMResult {
  tasks: Map<string, CPMTaskResult>;
  criticalPath: string[];
  /**
   * Ids van driving relaties (P6-definitie): de door de relatie gegenereerde grens ís de
   * aangenomen early-datum van de opvolger (relationship free float = 0). Gelijkspel is
   * toegestaan — een opvolger kan meerdere driving voorgangers hebben. Rekenresultaat,
   * wordt bewust niet gepersisteerd (ook niet in IFC).
   */
  drivingSequenceIds: string[];
  /** Vrije speling per relatie (werkdagen tussen de geëiste en de werkelijke vroegste datum
   *  van de opvolger). 0 = driving. Basis voor de relatietabel. */
  sequenceFreeFloat: Record<string, number>;
  /** Relaties met een lead (negatieve lag) die door de projectstart-vloer is afgekapt: de lead
   *  wilde de opvolger vóór het projectbegin trekken en is dus niet volledig benut. */
  truncatedLeadSequenceIds: string[];
  /** Taken waarvan de late-zijde-constraint (SNLT/FNLT/MSO/MFO) door de logica wordt
   *  overschreden — de bron van hun negatieve float. */
  violatedConstraintTaskIds: string[];
  /** Taken waarvan de vroege finish voorbij de (zachte) deadline valt. */
  missedDeadlineTaskIds: string[];
  /** Relaties waarvan de opvolger progress/actuals heeft die de voorganger-logica tegenspreekt
   *  (out-of-sequence, fase 2.6). Waarschuwing, geen fout — het gedrag volgt uit de progressMode. */
  outOfSequenceSequenceIds: string[];
  /** Near-critical-taken (fase 2.9, §4.6): 0 < tf ≤ drempel. Leeg als de drempel ongezet is. */
  nearCriticalTaskIds: string[];
  /** Alle kritieke ketens (fase 2.9, §4.6). ALTIJD aanwezig, lengte ≥1; `criticalPaths[0] ==
   *  criticalPath`. Staat `floatPaths` uit, dan is dit precies `[criticalPath]` — zo hoeven
   *  consumenten nooit op `undefined` te checken (byte-compat: één keten in een array gewikkeld). */
  criticalPaths: string[][];
  /** Float-path-nummer per taak (fase 2.9, §4.6): 1 = meest kritiek. Leeg als `floatPaths` uit. */
  floatPathByTask: Record<string, number>;
  /** Hammocks (§4.4) zónder finish-driver (geen FF/SF-voorganger): hun EF valt terug op de ES
   *  (nul-lengte). Waarschuwingssignaal — de span kan niet uit een finish-driver worden afgeleid. */
  hammockNoFinishDriverTaskIds: string[];
  /** OPTIONEEL (WP7 "Onwerkbaar-venster-detectie"): taak-ids waarvan de earlyFinish-berekening tegen
   *  de MAX_SCAN/MAX_DAYS-cap van `addWorkDays` liep — een kalender die het taakvenster onwerkbaar
   *  maakt levert anders stil een onzin-datum. ZACHTE, niet-blokkerende waarschuwing: `error` blijft
   *  leeg, de overige taken rekenen normaal door. Afwezig/leeg ⇒ byte-identiek default. */
  cappedTaskIds?: string[];
  /** OPTIONEEL (T8-rooktest): relatie-id's die de solver heeft genegeerd omdat voorganger of
   *  opvolger geen bladtaak is in de meegegeven set — typisch een relatie die een WBS-samenvattings-
   *  taak raakt (in MS Project legaal, maar deze solver rekent alleen bladtaken; de samenvatting
   *  krijgt zijn datums via de rollup in `applyCpmResult`, niet als eigen CPM-knoop). Interim-gedrag:
   *  genegeerd i.p.v. gecrasht — volledige samenvattingsrelatie-propagatie naar bladtaken is een
   *  aparte, grotere wijziging. Afwezig/leeg ⇒ byte-identiek default. */
  droppedSequenceIds?: string[];
  projectEnd: string;
  projectDuration: number; // work days
  error?: string; // Set if circular dependency detected
}

/** Voortgangs-opties (fase 2.6). Leeg ⇒ geen statusdatum-gedrag (byte-identiek aan vóór 2.6). */
export interface CPMOptions {
  dataDate?: string;                                     // ISO date; undefined ⇒ geen statusdatum-gedrag
  progressMode?: 'RETAINED_LOGIC' | 'PROGRESS_OVERRIDE'; // default RETAINED_LOGIC
  /** Project-scoped reken-opties (fase 2.9, §3.4). Afwezig ⇒ elke default ⇒ byte-identiek. In golf 0
   *  wordt dit blok alleen doorgegeven; de solver leest het nog nergens gedragswijzigend. */
  schedulingOptions?: SchedulingOptions;
  /** De geconfigureerde PROJECTSTARTDATUM (`Project.startDate`, ISO-datum), gebruikstest-bevinding
   *  2026-08: ondergrens voor de early-start-berekening van ELKE taak MET voorganger (en
   *  hammocks) — NIET uitsluitend tegen leads (T7-review M2, gecorrigeerd): ook een gewone FS/FF-
   *  relatie met lag 0 van een vroege wortel-taak (die sinds T7 z'n eigen anker vóór de
   *  projectstart mag houden, zie hieronder) wordt hier gevloerd. Alleen de gebruikerszichtbare
   *  markering (`truncatedLeadIds`, "afgekapte lead") is wél lead-specifiek — die signaleert
   *  uitsluitend een negatieve lag die de vloer raakt, niet elke geflooerde relatie in het
   *  algemeen. Vóór deze optie leidde de forward pass "de projectstart" stilzwijgend af als het
   *  minimum van de wortel-taken ONDERLING. Afwezig/onparseerbaar ⇒ terugval op het oude gedrag —
   *  byte-identiek voor elke bestaande aanroeper die deze optie niet meegeeft.
   *
   *  SINDS T7 (§9/O2, de brede regel "een ingelezen anker wordt nooit door de vloer overruled")
   *  klemt deze optie NIET meer de eigen ES van een taak ZONDER voorganger — die gebruikt altijd
   *  zijn eigen `scheduleStart` (`ownAnchor`), ook als die vóór de projectstart ligt. De vloer
   *  (`rootFloor`) is versmald tot uitsluitend de early-start-ondergrens voor taken MÉT voorganger
   *  (en hammocks) hierboven; zie de docstrings van `rootFloor`/`ownAnchor` in `CPMSolver` voor de
   *  volledige motivatie. */
  projectStartDate?: string;
}

/**
 * Eerste geldige werk-instant OP-of-NÁ `from`, in `eng` (dag ⇒ `nextWorkDay`, uur ⇒
 * `nextWorkInstant`). Top-level EXPORT (T7-review H1/H3) zodat zowel de solver zélf (`ownAnchor`/
 * `rootFloor` hierboven, via de instance-tunnel `snapOnOrAfter`) als `projectStartAnchorClamp.ts`
 * (de T7b-klem, aangeroepen vanuit zowel `projectSlice.setProject` als `mcpTransaction.ts`'s
 * `draft.setProject`) EXACT dezelfde anker-snap gebruiken. Vóór deze review deed de T7b-klem het
 * anker een kale datumstring toekennen zonder kalender-snap — in uurmodus landde dat na de
 * eerstvolgende `runCPM` op middernacht (H3a) i.p.v. de eerste werkband; nu delen beide plekken
 * één definitie, dus kan dat niet meer uiteenlopen. Puur, geen instantie-state.
 */
export function snapWorkInstantOnOrAfter(eng: CalendarEngine, from: Date): Date {
  return eng.isHourMode ? eng.nextWorkInstant(from) : eng.nextWorkDay(from);
}

/**
 * T15 (mijlpaal-met-duur, §9/O1 — "géén uitzondering maar een solver-bug"). MS Projects
 * `isMilestone`-vlag is een WEERGAVEmarkering die onafhankelijk van de opgeslagen duur gezet kan
 * worden ("Markeer taak als mijlpaal" in Taakinformatie) — MSP's eigen rekenkern plant zo'n taak
 * gewoon volgens haar eigen duur, ze klapt NIET stil om naar 0. Bewijs: `mpp14task.mpp` +
 * `mpp14task-from2013.mpp` (MSO-taak, `isMilestone=true`, duur 5 dagen — MSP-finish =
 * start + 5 werkdagen, PAS ná de duur) en `taskFlags-mpp14Project2010.mpp` +
 * `taskFlags-mpp14Project2013.mpp` ("Milestone: Yes", duur 8 dagen, zelfde patroon) — vier publieke
 * MPXJ-testfixtures waar de vlag én een reële duur allebei aanwezig zijn. Alle bestaande
 * duur-collapse-plekken in dit bestand testten uitsluitend de rauwe vlag; deze helper voegt de
 * duur-check toe zodat ALLEEN een taak die zelf ook daadwerkelijk 0 dagen/minuten duurt als
 * mijlpaal voor de PLANNING telt. Voor elke bestaande 0-duur-mijlpaal is dit byte-identiek aan de
 * kale vlag (dat IS precies de invariant die de rest van het corpus ongemoeid laat).
 */
function isZeroDurationMilestone(task: Task): boolean {
  return task.isMilestone && task.time.scheduleDuration === 0;
}

/**
 * Effectieve lag in dagen van een relatie: procent-lag wordt uit de ACTUELE voorgangerduur
 * opgelost (MSP-semantiek, afgerond op hele dagen), anders geldt lagDays. Gedeeld met de UI
 * (relatietabel-waarschuwingen) zodat er één definitie bestaat.
 *
 * `hoursPerDay` (optioneel, fase 2.10) = de dag↔minuut-factor van de kalender waarin de lag telt —
 * de VOORGANGER-kalender voor WORKTIME (`LAG_CALENDAR='predecessor'`), 24 voor ELAPSEDTIME. Alleen
 * mét die factor kan een lag die uitsluitend als `lagMinutes` bestaat (`lagDays = 0`) in DAGEN
 * uitgedrukt worden. Zonder de factor (UI-aanroepers) is de functie byte-identiek aan vóór 2.10.
 */
export function resolveEffectiveLagDays(seq: Sequence, predTask: Task, hoursPerDay?: number): number {
  if (typeof seq.lagPercent === 'number' && Number.isFinite(seq.lagPercent)) {
    const predDur = isZeroDurationMilestone(predTask) ? 0 : predTask.time.scheduleDuration;
    return Math.round((predDur * seq.lagPercent) / 100);
  }
  const days = Number.isFinite(seq.lagDays) ? seq.lagDays : 0;
  // Minuut-lag ZONDER dag-lag (fase 2.10). `p6xmlReader`/`mspdiReader` schrijven `lagDays: 0` +
  // `lagMinutes` zodra de OPVOLGER in uur-modus staat, terwijl de solver de lag in de VOORGANGER-
  // kalender oplost. Bij een DAG-voorganger viel de lag daardoor stil weg (exact lag 0, forward én
  // backward) — stil dataverlies op een reëel importpad. Reken hem om naar hele dagen met de
  // meegegeven factor; half rondt van nul af, zodat een lead (negatief) symmetrisch behandeld wordt.
  // `lagDays ≠ 0` blijft leidend: het IFC-pad vult beide velden (`parseDurationDays` rondt `PT4H`
  // naar boven op 1 dag) en blijft zo byte-identiek.
  if (
    days === 0 && typeof hoursPerDay === 'number' && hoursPerDay > 0 &&
    typeof seq.lagMinutes === 'number' && Number.isFinite(seq.lagMinutes) && seq.lagMinutes !== 0
  ) {
    const raw = seq.lagMinutes / (hoursPerDay * 60);
    return Math.sign(raw) * Math.round(Math.abs(raw));
  }
  return days;
}

export interface CPMTaskResult {
  earlyStart: string;
  earlyFinish: string;
  lateStart: string;
  lateFinish: string;
  totalFloat: number;
  freeFloat: number;
  isCritical: boolean;
  /** OPTIONEEL — interfererende speling = totalFloat − freeFloat (fase 2.9, §4.6). Alleen
   *  geschreven wanneer de analyse-laag draait; ongeschreven ⇒ byte-identiek default. */
  interferingFloat?: number;
  /** OPTIONEEL — near-critical (fase 2.9, §4.6). Alleen geschreven bij ingestelde drempel. */
  isNearCritical?: boolean;
  /** OPTIONEEL — float-path-nummer (fase 2.9, §4.6). Alleen geschreven bij floatPaths. */
  floatPath?: number;
}

/**
 * Leeg `CPMResult` voor de degradatiepaden in `solve()` (cyclus, kalender zonder werkdagen,
 * onparseerbare startdatum): alle verzamelingen leeg, alleen de foutmelding verschilt per pad.
 * Eén fabriek zodat de drie guards nooit kunnen divergeren.
 */
function emptyResult(error: string): CPMResult {
  return {
    tasks: new Map(),
    criticalPath: [],
    drivingSequenceIds: [],
    sequenceFreeFloat: {},
    truncatedLeadSequenceIds: [],
    violatedConstraintTaskIds: [],
    missedDeadlineTaskIds: [],
    outOfSequenceSequenceIds: [],
    nearCriticalTaskIds: [],
    criticalPaths: [[]],
    floatPathByTask: {},
    hammockNoFinishDriverTaskIds: [],
    projectEnd: '',
    projectDuration: 0,
    error,
  };
}

export class CPMSolver {
  private tasks: Map<string, Task>;
  private sequences: Sequence[];
  // Per-taak-kalender (fase 2.8a, §5.1): de projectdefault-engine voor project-brede grenslogica,
  // plus een cache van engines per bibliotheek-kalender. `calendarFor(task)` levert de engine waarin
  // de duur/constraints/float van díé taak rekenen; zonder afwijkende `task.calendarId` valt alles
  // terug op `projectEngine` ⇒ byte-identiek aan het één-kalender-gedrag van vóór 2.8a.
  private projectCal: WorkCalendar;
  private registry: WorkCalendar[];
  private projectEngine: CalendarEngine;
  private engineCache = new Map<string, CalendarEngine>();

  // Adjacency lists
  private successors: Map<string, Sequence[]>; // taskId -> outgoing sequences
  private predecessors: Map<string, Sequence[]>; // taskId -> incoming sequences

  // Per relatie de in de forward-pass gegenereerde (ruwe) vroegst-toegestane start van de
  // opvolger, vóór de projectstart-vloer en de werkdag-snap. Eén bron van waarheid voor
  // vrije speling én driving-markering, ongeacht lag-eenheid.
  private seqConstraint: Map<string, Date> = new Map();
  // Relaties waarvan de lead in de forward-pass door de projectstart-vloer is afgekapt.
  private truncatedLeadIds: string[] = [];
  // Taken met een harde MSO/MFO-pin (fase 2.9, §4.2) waarvan de voorganger-druk (`rawMax`) later
  // valt dan de pin ⇒ de logica is gebroken (taak start vóór z'n voorganger klaar is). Verzameld in
  // de forward pass, samengevoegd met `violatedConstraintTaskIds` in `computeResults`.
  private hardPinViolatedIds: string[] = [];
  // Hammocks (fase 2.9, §4.4) zónder finish-driver: EF valt terug op ES (nul-lengte). Verzameld in de
  // forward pass, gerapporteerd als waarschuwing in `hammockNoFinishDriverTaskIds`.
  private hammockNoFinishDriverIds: string[] = [];
  // Taken waarvan de earlyFinish-berekening tegen de MAX_SCAN/MAX_DAYS-cap van `addWorkDays` liep
  // (WP7 "Onwerkbaar-venster-detectie"): een onwerkbaar taakvenster (bv. een aaneengesloten holiday-
  // blok). Verzameld in de forward pass, zacht gerapporteerd als `cappedTaskIds`. Geen error, geen
  // rollback — de kalenderwijziging is legitiem; de waarschuwing wijst de te repareren taak aan.
  private cappedTaskIds: string[] = [];

  private options: CPMOptions;
  // Werkdag-gesnapte statusdatum (fase 2.6), of null ⇒ geen statusdatum-gedrag. Gezet in solve().
  private dataDate: Date | null = null;
  // RUWE (ongesnapte) geconfigureerde projectstartdatum, of null ⇒ geen ondergrens-gedrag (byte-
  // identiek aan vóór deze optie). Ongesnapt omdat elke wortel-taak 'm in zíjn EIGEN kalender snapt
  // (`rootFloor`) — een taak op een kalender met een afwijkende werkweek mag de vloer dus op een
  // andere dag landen dan de projectkalender zelf zou geven. Gezet in solve().
  private projectStartRaw: Date | null = null;
  // Relaties waarvan voorganger- of opvolger-id niet in `this.tasks` zit — genegeerd bij de
  // constructie (zie de guard hieronder). Constant per instance (afgeleid uit de constructor-
  // input), dus NIET onderdeel van de idempotentie-reset in solve().
  private readonly droppedSequenceIds: string[];
  // M7 (CPM-review): dedup-sleutel voor de dropped-relaties-waarschuwing hieronder, STATIC (gedeeld
  // over alle instanties) — `ResourceLeveler` bouwt binnen één nivelleeraanroep O(taken) solvers,
  // typisch allemaal met DEZELFDE gedropte relatieset (die hangt af van welke taak-ids bestaan, niet
  // van de per-kandidaat `levelingDelay`-varianten die tussen die constructies verschillen). Zonder
  // dedup logt dat de identieke waarschuwing tientallen tot honderden keren per nivellering. Een
  // ECHTE wijziging in de gedropte set (ander document, andere relaties) logt gewoon opnieuw.
  private static lastDroppedWarningSignature: string | null = null;

  constructor(
    tasks: Task[],
    sequences: Sequence[],
    projectCalendar: WorkCalendar,
    registry: WorkCalendar[] = [],
    options: CPMOptions = {},
  ) {
    this.tasks = new Map(tasks.map(t => [t.id, t]));

    // Guard (T8-rooktest, Bijlage 13): de aanroepers (`runCPM`/`levelResources` in
    // `scheduleSlice.ts`, de leveler in `ResourceLeveler.ts`, `benchmark/runner.ts`) geven hier
    // opzettelijk alleen BLADTAKEN aan mee (`childIds.length === 0`) — een samenvattingstaak krijgt
    // zijn datums via de rollup in `applyCpmResult`, niet als eigen CPM-knoop. `sequences` komt
    // ONGEFILTERD binnen: in MS Project is een relatie op een samenvattingstaak legaal (mspdiReader/
    // ifcReader/mppReader lezen 'm gewoon in), maar deze solver kent geen samenvattingstaken. Vóór
    // deze guard duwde zo'n relatie het niet-bestaande taak-id de topologische sortering in
    // (`topologicalSort` telt `inDegree` onvoorwaardelijk voor élke `successorId`, ook een dat niet
    // in `this.tasks` zit) en crashte de forward/backward pass op een `this.tasks.get(id)!`-aanname
    // zodra dat fantoom-id in `order` viel — geen nette foutmelding, een onbehandelde throw die
    // `openFile`s catch opslokt, zodat het bestand opent maar de planning stil onberekend blijft.
    //
    // Semantiek: een relatie die een taak raakt die niet in de meegegeven set zit wordt genegeerd
    // i.p.v. de solver te laten crashen. Dit blijft het VANGNET voor écht verweesde/ongeldige
    // taak-ids — sinds `expandSummaryRelations` (vervolgtaak op deze guard) herschrijven de reguliere
    // aanroepers (`runCPM`/`levelResources` in `scheduleSlice.ts`, de leveler in
    // `ResourceLeveler.ts`, `benchmark/runner.ts`) een relatie op een WBS-samenvattingstaak ZELF al
    // naar bladtaak-relaties vóórdat de solver ze ziet; die relaties bereiken deze guard dus normaal
    // niet meer. Een aanroeper die `expandSummaryRelations` overslaat (bv. rechtstreeks tegen de
    // solver getest) valt terug op het oude gedrag: droppen, niet crashen.
    const kept: Sequence[] = [];
    const dropped: string[] = [];
    for (const seq of sequences) {
      if (this.tasks.has(seq.predecessorId) && this.tasks.has(seq.successorId)) {
        kept.push(seq);
      } else {
        dropped.push(seq.id);
      }
    }
    this.sequences = kept;
    this.droppedSequenceIds = dropped;
    if (dropped.length > 0) {
      // M7: alleen loggen als de gedropte SET (niet de instantie) daadwerkelijk is veranderd sinds
      // de vorige constructie — zie de toelichting bij `lastDroppedWarningSignature`.
      const signature = [...dropped].sort().join(',');
      if (signature !== CPMSolver.lastDroppedWarningSignature) {
        CPMSolver.lastDroppedWarningSignature = signature;
        console.warn(
          `CPMSolver: ${dropped.length} relatie(s) genegeerd omdat voorganger of opvolger geen ` +
          'bladtaak is in de meegegeven set (verweesd/ongeldig taak-id, of een aanroeper die ' +
          `expandSummaryRelations niet gebruikt). Relatie-id's: ${dropped.join(', ')}.`,
        );
      }
    }

    this.projectCal = projectCalendar;
    this.registry = registry;
    this.projectEngine = new CalendarEngine(projectCalendar);
    this.engineCache.set(projectCalendar.id, this.projectEngine);
    this.options = options;
    this.successors = new Map();
    this.predecessors = new Map();

    for (const task of tasks) {
      this.successors.set(task.id, []);
      this.predecessors.set(task.id, []);
    }
    for (const seq of this.sequences) {
      this.successors.get(seq.predecessorId)?.push(seq);
      this.predecessors.get(seq.successorId)?.push(seq);
    }
  }

  /** Engine voor een concrete kalender (gecachet op kalender-id). */
  private engineForCal(cal: WorkCalendar): CalendarEngine {
    let e = this.engineCache.get(cal.id);
    if (!e) { e = new CalendarEngine(cal); this.engineCache.set(cal.id, e); }
    return e;
  }

  /** De kalender-engine waarin de duur/constraints/float van `task` rekenen (§5.2). */
  private calendarFor(task: Task): CalendarEngine {
    return this.engineForCal(resolveCalendar(task.calendarId, this.registry, this.projectCal));
  }

  // ═══════════════════════════════════════════════════════════════════════════
  //  Fase 2.8b (golf 2) — MODUS-BEWUSTE rekenkern (§5). Elke helper reduceert in
  //  DAG-modus tot exact de bestaande dag-expressie (byte-identiek); alleen een
  //  UUR-kalender (`isHourMode`) activeert het minuut-native pad. Zo blijven de 290
  //  dag-cases + 23 examples ongemoeid — de constructie, niet een her-derivatie (§2.2).
  // ═══════════════════════════════════════════════════════════════════════════
  private static readonly MS_PER_DAY = 86_400_000;

  /** Parse een datum-string in de kalendermodus: dag ⇒ `parseDate` (middernacht, byte-identiek),
   *  uur ⇒ `parseInstant` (behoudt tijd-van-de-dag). */
  private parseIn(eng: CalendarEngine, iso: string): Date {
    return eng.isHourMode ? parseInstant(iso) : parseDate(iso);
  }
  /** Snap op-of-ná (voorwaarts): dag ⇒ `nextWorkDay`, uur ⇒ `nextWorkInstant`. Instance-tunnel naar
   *  de top-level, GEDEELDE `snapWorkInstantOnOrAfter` (T7-review H1/H3): één definitie voor de
   *  solver-interne aanroepen hier ÉN voor `projectStartAnchorClamp.ts` (de T7b-klem in
   *  `projectSlice.setProject`/`mcpTransaction.ts`'s `draft.setProject`) — geen tweede snap-
   *  implementatie die stil van deze kan afdrijven. */
  private snapOnOrAfter(eng: CalendarEngine, d: Date): Date {
    return snapWorkInstantOnOrAfter(eng, d);
  }
  /** Snap op-of-vóór (achterwaarts): dag ⇒ `prevWorkDay`, uur ⇒ `prevWorkInstant`. */
  private snapOnOrBefore(eng: CalendarEngine, d: Date): Date {
    return eng.isHourMode ? eng.prevWorkInstant(d) : eng.prevWorkDay(d);
  }
  /** Snap strikt ná: dag ⇒ `nextWorkDayAfter`, uur ⇒ `nextWorkInstantAfter`. */
  private snapStrictAfter(eng: CalendarEngine, d: Date): Date {
    return eng.isHourMode ? eng.nextWorkInstantAfter(d) : eng.nextWorkDayAfter(d);
  }
  /** Snap strikt vóór: dag ⇒ `prevWorkDayBefore`, uur ⇒ `prevWorkInstantBefore`. */
  private snapStrictBefore(eng: CalendarEngine, d: Date): Date {
    return eng.isHourMode ? eng.prevWorkInstantBefore(d) : eng.prevWorkDayBefore(d);
  }
  /** Voorwaartse her-snap van een OPVOLGER-earlyStart die MSP-pariteit (T6, §9/O6) respecteert voor
   *  een EINDmijlpaal: `snapOnOrAfter` normaliseert met `nextWorkInstant` (rand `[start,end)`), dat
   *  een instant EXACT op een band-eind (bv. di 17:00) altijd naar de volgende werk-instant duwt —
   *  precies de dubbele snap die `relationMath`'s FS-tak met de `lagIsZero`-kortsluiting al voorkomt
   *  vóórdat de waarde hier aankomt. Zonder deze wacht herintroduceert de generieke her-snap
   *  hieronder (regel 686/728, bestond al vóór T6 voor de "constrained root-taak op middernacht"-
   *  situatie) diezelfde bug op het volgende niveau. `snapOnOrBefore(...) === d` is de test "`d` is
   *  al een geldige `(start,end]`-instant" (band-interieur of band-eind) — precies de conventie
   *  waarmee `finishFromStart` een `ef` bouwt; bij een niet-milestone of een dag-kalender reduceert
   *  dit byte-identiek tot de kale `snapOnOrAfter`. */
  private snapSuccessorEarlyStart(eng: CalendarEngine, d: Date, task: Task): Date {
    // T8-review-BLOCKER (Opus-hercheck 72486257): een ELAPSEDTIME-opvolger krijgt hier GEEN
    // werk-instant-snap. Orkestratorbesluit op de semantische vraag ("mag een 24/7-taak op een
    // niet-werk-instant starten?"): JA — MS Project plant elapsed-taken puur in kalendertijd, de
    // werkkalender is er per definitie niet op van toepassing (dat IS het punt van ELAPSEDTIME).
    // Zonder deze bypass herintroduceerde deze generieke her-snap (die na ELKE forward-constraint-
    // berekening draait, dus ook ná H1's al-correcte `deps.startFromFinish`-uitkomst) precies de
    // H1-schending één stap verderop: een FF+0 naar een elapsed-opvolger die op zaterdag moest
    // landen, werd hier alsnog naar de eerstvolgende werk-instant/-dag geduwd — de opvolger se EF
    // schoof daardoor mee, ondanks dat forwardConstraint zelf al goed rekende. `task.isMilestone`
    // blijft uitgesloten (een mijlpaal heeft geen eigen duur/durationType-semantiek; de bestaande
    // FINISH-mijlpaal-tak hierboven regelt zijn eigen — orthogonale — landing).
    if (!task.isMilestone && task.time.durationType === 'ELAPSEDTIME') return d;
    if (eng.isHourMode && task.isMilestone && task.milestoneKind === 'FINISH') {
      if (this.snapOnOrBefore(eng, d).getTime() === d.getTime()) return d;
    }
    return this.snapOnOrAfter(eng, d);
  }
  private modeOf(eng: CalendarEngine): DateMode {
    return eng.isHourMode ? 'hour' : 'day';
  }
  /** UTC-middernacht van de dag die `d` bevat (voor de cross-modus-dagrand, §4.3/§5.2). */
  private startOfDay(d: Date): Date {
    return new Date(Math.floor(d.getTime() / CPMSolver.MS_PER_DAY) * CPMSolver.MS_PER_DAY);
  }

  /**
   * De `projectStart`-ONDERGRENS (T7, §9/O2): het MAXIMUM van de taak-eigen gesnapte
   * `scheduleStart` en de geconfigureerde projectstartdatum (zelf ook per `eng` gesnapt — een
   * taak op een afwijkende kalender mag de vloer dus op een andere dag landen dan de
   * projectkalender zelf zou geven). `projectStartRaw` afwezig (optie niet meegegeven, of
   * onparseerbaar) ⇒ puur de eigen start, byte-identiek aan vóór deze optie.
   *
   * UITSLUITEND nog gebruikt voor de `projectStart`-precompute hieronder in `forwardPass`
   * (taken MET voorganger + hammocks) — dat is de early-start-ONDERGRENS voor DIE hele categorie,
   * niet uitsluitend tegen relatie-LEADS (T7-review M2, gecorrigeerd): ook een gewone FS/FF-
   * relatie met lag 0 van een vroege wortel-taak wordt hier gevloerd, niet alleen een negatieve
   * lag. Alleen de gebruikerszichtbare `truncatedLeadIds`-markering is wél lead-specifiek. Dát is
   * exact de bescherming die het oorspronkelijke vloer-scenario (gebruikstest-bevinding 2026-08: een
   * VEROUDERDE `scheduleStart` — bv. gezet vóór een latere wijziging van de projectstartdatum —
   * die stil vóór het officiële projectbegin bleef doorlopen, in het verkeerde geval zelfs een
   * weekend "terug" t.o.v. een za/zo-projectstart) beoogde, en die blijft hier onverkort staan.
   *
   * Sinds T7 NIET meer gebruikt voor de eigen ES van een wortel-taak zelf (§9/O2, de brede regel:
   * "een ingelezen anker wordt nooit door de vloer overruled") — zie `ownAnchor` daarvoor. Vóór
   * T7 leverde deze functie ook dié waarde, wat 25 taken in 12 corpusbestanden vooruit duwde
   * t.o.v. hun eigen, in het bronbestand opgeslagen anker (11 met een expliciete SNET vóór
   * projectstart, 14 zonder enige constraint) — minuut-exactheid eist dat het eigen anker wint.
   *
   * T8-review-BLOCKER (Opus-hercheck 72486257, uitgebreid — derde gevonden hersnap-plek): `own`
   * snapte tot nu toe ALTIJD naar een werk-instant, ook voor een ELAPSEDTIME wortel-taak. Zo'n
   * taak levert de `projectStart`-vloer (het MINIMUM over alle wortel-taken hieronder) — een
   * elapsed wortel-taak met bv. een zaterdag-anker duwde die vloer dan naar maandag, wat via de
   * vloer óók niet-wortel-taken (SS/FS/…) onterecht dichttrok, ook al is de EIGEN ES van die
   * elapsed taak zelf al correct (`ownAnchor`, hierboven bewust ongesnapt). `elapsedTask`: geef
   * de rauwe `own` terug, ONGESNAPT — de `projectStartRaw`-vergelijking (een EXPLICIET door de
   * gebruiker gezette ondergrens) blijft wél gesnapt, net als een constraint (L1-afbakening: een
   * opgelegde grens is geen relatie-afgeleide instant). */
  private rootFloor(eng: CalendarEngine, scheduleStart: string, elapsedTask: boolean): Date {
    const own = elapsedTask
      ? this.parseIn(eng, scheduleStart)
      : this.snapOnOrAfter(eng, this.parseIn(eng, scheduleStart));
    if (!this.projectStartRaw) return own;
    const floor = this.snapOnOrAfter(eng, this.projectStartRaw);
    return floor > own ? floor : own;
  }

  /**
   * Taak-eigen gesnapte start, ONGEKLEMD tegen de projectstart (T7, §9/O2). Gebruikt voor de ES
   * van een taak ZONDER voorganger (`forwardPass`, `preds.length === 0`-tak): een ingelezen
   * anker wordt nooit door de vloer overruled, ook niet als het vóór de geconfigureerde
   * projectstartdatum ligt. De vloer zelf (`rootFloor`) bestaat nog onverkort — maar uitsluitend
   * nog als early-start-ondergrens voor taken MET voorganger (zie `rootFloor`'s docstring: dat
   * geldt breder dan alleen relatie-leads). Een taak zónder voorganger én zónder relatie kan dus vanaf nu vóór de
   * projectstart staan als het eigen anker dat zegt — exact de MS Project-semantiek die de
   * fidelity-audit meet.
   */
  private ownAnchor(eng: CalendarEngine, scheduleStart: string): Date {
    return this.snapOnOrAfter(eng, this.parseIn(eng, scheduleStart));
  }

  /** De mode-bewuste primitieven die de relatie-wiskunde (`relationMath.ts`, audit P15) injectief
   *  krijgt aangereikt. Ze blijven hier gedefinieerd (delen de dag↔uur-reductie met de rest van de
   *  solver); `forwardConstraint`/`backwardConstraint` draaien de FS/SS/FF/SF-formules erop. */
  private readonly relDeps: RelationDeps = {
    resolveLag: (seq, predTask, predEng) => this.resolveLag(seq, predTask, predEng),
    resolveEffectiveLagDays: (seq, predTask, predEng) =>
      resolveEffectiveLagDays(seq, predTask, predEng.hoursPerDay),
    resolveElapsedMinutes: (seq, predTask) => this.resolveElapsedMinutes(seq, predTask),
    shiftLagPred: (predEng, base, seq, predTask, sign) => this.shiftLagPred(predEng, base, seq, predTask, sign),
    startFromFinish: (eng, finish, task) => this.startFromFinish(eng, finish, task),
    finishFromStart: (eng, start, task) => this.finishFromStart(eng, start, task),
    snapOnOrAfter: (eng, d) => this.snapOnOrAfter(eng, d),
    snapOnOrBefore: (eng, d) => this.snapOnOrBefore(eng, d),
    snapStrictAfter: (eng, d) => this.snapStrictAfter(eng, d),
    snapStrictBefore: (eng, d) => this.snapStrictBefore(eng, d),
    startOfDay: (d) => this.startOfDay(d),
  };

  /** Vroege finish = start ⊕ duur (§5.1). Mijlpaal ⇒ 0; ELAPSEDTIME ⇒ kale 24/7-klokoptelling
   *  (T8, precedent `resolveElapsedMinutes`/`relationMath.ts`, GEEN kalenderband-toetsing); uur
   *  (WORKTIME) ⇒ `addWorkMinutes(durationMinutesOf)`; dag (WORKTIME) ⇒ `addWorkDays(durationDaysOf)`
   *  — LETTERLIJK de huidige regel (`durationDaysOf` levert op een dag-kalender altijd de integer
   *  `scheduleDuration`, nooit een fractionele dag, Bevinding 2). */
  private addDuration(eng: CalendarEngine, start: Date, task: Task): Date {
    return this.addDurationChecked(eng, start, task).date;
  }
  /** `addDuration` mét CAP-signaal (WP7): identieke datum-uitkomst, plus `capped` uit de dag-modus-
   *  `addWorkDaysChecked` — een onwerkbaar taakvenster (holiday-blok) dat de earlyFinish tegen de
   *  MAX_SCAN/MAX_DAYS-grens duwt. Mijlpaal, ELAPSEDTIME en uur-modus cappen hier nooit (`false`):
   *  een mijlpaal heeft geen duur, ELAPSEDTIME kent geen onwerkbaar-venster-begrip (24/7), en de
   *  minuut-lussen hebben hun eigen best-effort-terugval buiten dit signaal. */
  private addDurationChecked(eng: CalendarEngine, start: Date, task: Task): { date: Date; capped: boolean } {
    if (isZeroDurationMilestone(task)) return { date: new Date(start.getTime()), capped: false };
    if (task.time.durationType === 'ELAPSEDTIME') {
      return { date: addElapsedMinutes(start, elapsedMinutesOf(task, eng)), capped: false };
    }
    if (eng.isHourMode) return { date: eng.addWorkMinutes(start, durationMinutesOf(task, eng)), capped: false };
    return eng.addWorkDaysChecked(start, durationDaysOf(task, eng));
  }
  /** Late start = late finish ⊖ duur (§5.1, spiegel van `addDuration`). */
  private subDuration(eng: CalendarEngine, end: Date, task: Task): Date {
    if (isZeroDurationMilestone(task)) return new Date(end.getTime());
    if (task.time.durationType === 'ELAPSEDTIME') {
      return subtractElapsedMinutes(end, elapsedMinutesOf(task, eng));
    }
    return eng.isHourMode
      ? eng.subtractWorkMinutes(end, durationMinutesOf(task, eng))
      : eng.subtractWorkDays(end, durationDaysOf(task, eng));
  }

  /** WORKTIME-lag in MINUTEN in de voorganger-kalender (§5.2): procent ⇒ uit `durationMinutesOf(pred)`;
   *  `lagMinutes` ⇒ bron; anders `lagDays × pred-hoursPerDay × 60` (naakt getal = werkdagen). */
  private resolveLagMinutes(seq: Sequence, predTask: Task, predEng: CalendarEngine): number {
    if (typeof seq.lagPercent === 'number' && Number.isFinite(seq.lagPercent)) {
      const predMin = isZeroDurationMilestone(predTask) ? 0 : durationMinutesOf(predTask, predEng);
      return Math.round((predMin * seq.lagPercent) / 100);
    }
    if (typeof seq.lagMinutes === 'number' && Number.isFinite(seq.lagMinutes)) return seq.lagMinutes;
    const days = Number.isFinite(seq.lagDays) ? seq.lagDays : 0;
    return days * predEng.hoursPerDay * 60;
  }
  /** ELAPSEDTIME-lag in KLOK-minuten (24/7, §5.2): `lagMinutes` ⇒ bron; anders (procent/)dagen × 24 × 60. */
  private resolveElapsedMinutes(seq: Sequence, predTask: Task): number {
    if (typeof seq.lagMinutes === 'number' && Number.isFinite(seq.lagMinutes)) return seq.lagMinutes;
    return resolveEffectiveLagDays(seq, predTask) * 24 * 60;
  }
  /** Verschuif `base` met de relatie-lag in de VOORGANGER-engine (`LAG_CALENDAR='predecessor'`, §5.2).
   *  Uur-pred ⇒ minuten via `addWorkingMinutesSigned`; dag-pred ⇒ dagen via `addWorkingDaysSigned`
   *  (dag-lag blijft exact als nu). `sign` = +1 voorwaarts, −1 achterwaarts (spiegel). */
  private shiftLagPred(
    predEng: CalendarEngine, base: Date, seq: Sequence, predTask: Task, sign: 1 | -1,
  ): Date {
    if (predEng.isHourMode) {
      return predEng.addWorkingMinutesSigned(base, sign * this.resolveLagMinutes(seq, predTask, predEng));
    }
    // Dag-voorganger: WORKTIME-lag in dagen; `hoursPerDay` van de voorganger-kalender vertaalt een
    // lag die alleen als `lagMinutes` bestaat (fase 2.10, zie `resolveEffectiveLagDays`).
    return predEng.addWorkingDaysSigned(
      base, sign * resolveEffectiveLagDays(seq, predTask, predEng.hoursPerDay),
    );
  }

  /** Leid de opvolger-START af uit zijn geëiste FINISH (FF/SF, §5.2): ELAPSEDTIME ⇒ kale 24/7-
   *  klokaftrek (T8, vóór de hour/day-splitsing — geen kalenderband-toetsing, dus modus-onafhankelijk);
   *  uur (WORKTIME) ⇒ `subtractWorkMinutes`; dag (WORKTIME) ⇒ `addWorkingDaysSigned(−(dur−1))` — de
   *  bestaande inclusieve-dag-aftrek. Mijlpaal-afhandeling ONGEWIJZIGD per tak (Bevinding, T8-review:
   *  de dag-tak snapt een mijlpaal via `addWorkingDaysSigned(finish, 0)` = `nextWorkDay`, de uur-tak
   *  geeft de rauwe finish terug ongesnapt — niet symmetrisch, dus niet naar bóven de modus-split
   *  te hijsen zonder dat gedrag te veranderen). */
  private startFromFinish(eng: CalendarEngine, finish: Date, task: Task): Date {
    if (eng.isHourMode) {
      if (isZeroDurationMilestone(task)) return new Date(finish.getTime());
      if (task.time.durationType === 'ELAPSEDTIME') {
        return subtractElapsedMinutes(finish, elapsedMinutesOf(task, eng));
      }
      return eng.subtractWorkMinutes(finish, durationMinutesOf(task, eng));
    }
    if (!task.isMilestone && task.time.durationType === 'ELAPSEDTIME') {
      return subtractElapsedMinutes(finish, elapsedMinutesOf(task, eng));
    }
    const dur = isZeroDurationMilestone(task) ? 0 : task.time.scheduleDuration;
    return eng.addWorkingDaysSigned(finish, -(dur > 0 ? dur - 1 : 0));
  }
  /** Leid de voorganger-FINISH af uit zijn late START (SS/SF backward, §5.2, spiegel van
   *  `startFromFinish`): ELAPSEDTIME ⇒ kale 24/7-klokoptelling (T8); uur (WORKTIME) ⇒ `addWorkMinutes`;
   *  dag (WORKTIME) ⇒ `addWorkingDaysSigned(dur−1)`. Zelfde mijlpaal-asymmetrie-voorbehoud als
   *  `startFromFinish` hierboven. */
  private finishFromStart(eng: CalendarEngine, start: Date, task: Task): Date {
    if (eng.isHourMode) {
      if (isZeroDurationMilestone(task)) return new Date(start.getTime());
      if (task.time.durationType === 'ELAPSEDTIME') {
        return addElapsedMinutes(start, elapsedMinutesOf(task, eng));
      }
      return eng.addWorkMinutes(start, durationMinutesOf(task, eng));
    }
    if (!task.isMilestone && task.time.durationType === 'ELAPSEDTIME') {
      return addElapsedMinutes(start, elapsedMinutesOf(task, eng));
    }
    const dur = isZeroDurationMilestone(task) ? 0 : task.time.scheduleDuration;
    return eng.addWorkingDaysSigned(start, dur > 0 ? dur - 1 : 0);
  }
  /** Getekende float in eigen-kalender-WERKDAGEN (§5.5, Bevinding 1): uur ⇒ fractioneel
   *  `workMinutesBetween / (hoursPerDay × 60)`; dag ⇒ de bestaande integer `signedWorkDays`.
   *  ELAPSEDTIME (T8, msp-14-mutatiebewijs): `a`/`b` mogen op een niet-werkdag liggen (24/7-taak) —
   *  `workDaysBetween`/`signedWorkDays` gaan daar stuk (spook-tf, zie `signedElapsedSpan`'s
   *  moduleheader in `duration.ts`), dus een ELAPSEDTIME-taak krijgt de kale klok-span i.p.v.
   *  werkdag-telling. `task` optioneel: afwezig (of WORKTIME) ⇒ exact de oude twee takken. */
  private signedFloat(a: Date, b: Date, eng: CalendarEngine, task?: Task): number {
    if (task?.time.durationType === 'ELAPSEDTIME') return signedElapsedSpan(a, b, eng);
    if (eng.isHourMode) return eng.workMinutesBetween(a, b) / (eng.hoursPerDay * 60);
    return this.signedWorkDays(a, b, eng);
  }

  solve(): CPMResult {
    // Idempotentie: reset ALLE per-solve accumulerende instance-state, zodat een tweede
    // solve() op dezelfde instance byte-identiek is aan een verse instance (geen duplicaten
    // uit een vorige run in de side-channels). De overige velden zijn constructor-vast
    // (graaf/kalenders/opties) of worden per solve onvoorwaardelijk herschreven; de
    // engine-cache is deterministisch per kalender-id en mag blijven staan.
    this.seqConstraint.clear();
    this.truncatedLeadIds = [];
    this.hardPinViolatedIds = [];
    this.hammockNoFinishDriverIds = [];
    this.cappedTaskIds = [];
    this.dataDate = null; // wordt hieronder herzet; zo blijft hij ook over guard-returns heen nooit stale
    this.projectStartRaw = null; // idem — herzet vóór elke solve, nooit stale over guard-returns heen

    // Check for circular dependencies before running CPM
    const cycle = this.detectCycle();
    if (cycle) {
      const cycleNames = cycle.map(id => this.tasks.get(id)?.name || id).join(' -> ');
      return emptyResult(`Circular dependency detected: ${cycleNames}`);
    }

    // Guard: een kalender zonder werkdagen zou anders (via de MAX_SCAN-fallback) stil
    // datums ver in de toekomst opleveren zonder enige waarschuwing. Degradeer met een fout.
    if (!this.projectEngine.hasWorkingDays()) {
      return emptyResult('Kalender heeft geen werkdagen ingesteld');
    }

    // Guard: een taak met een onparseerbare startdatum zou anders Invalid Dates
    // opleveren die het formatteren laten crashen (en vóór de lus-grenzen: hangen).
    // Degradeer netjes met een foutmelding i.p.v. te crashen.
    for (const task of this.tasks.values()) {
      if (isNaN(parseDate(task.time.scheduleStart).getTime())) {
        return emptyResult(`Ongeldige startdatum voor taak "${task.name}"`);
      }
    }

    // Werkdag-gesnapte statusdatum (fase 2.6). Ongeldig/afwezig ⇒ null (alle voortgangstakken no-op).
    // Uur-projectkalender ⇒ instant-snap via `nextWorkInstant` (§5.3); dag ⇒ `nextWorkDay` (byte-identiek).
    const dd = this.options.dataDate ? this.parseIn(this.projectEngine, this.options.dataDate) : null;
    this.dataDate = dd && !isNaN(dd.getTime()) ? this.snapOnOrAfter(this.projectEngine, dd) : null;

    // Projectstartdatum (RUW, ongesnapt — zie `rootFloor`/`projectStartRaw`). Date-only strings
    // (het enige wat de wizard/`DateTextInput` produceren) parsen via `parseDate` modus-onafhankelijk
    // identiek aan `parseInstant`, dus één simpele `parseDate` hier volstaat (geen `this.parseIn`
    // nodig — die zou voor een instant-projectkalender de tijd-component willen behouden, die
    // `project.startDate` nooit heeft).
    const psd = this.options.projectStartDate ? parseDate(this.options.projectStartDate) : null;
    this.projectStartRaw = psd && !isNaN(psd.getTime()) ? psd : null;

    const order = this.topologicalSort();
    const earlyDates = this.forwardPass(order);
    const lateDates = this.backwardPass(order, earlyDates);
    this.applyAlap(order, earlyDates, lateDates);
    const outOfSequenceSequenceIds = this.detectOutOfSequence(earlyDates);
    // Resultaat-post-pass (geëxtraheerd naar `scheduleAnalysis.ts`): pure functie over de vaste
    // early/late-datums + de forward-pass-side-channels; de helpers zijn stateless en gebonden.
    const result = computeScheduleResults({
      order,
      earlyDates,
      lateDates,
      outOfSequenceSequenceIds,
      tasks: this.tasks,
      sequences: this.sequences,
      successors: this.successors,
      seqConstraint: this.seqConstraint,
      schedulingOptions: this.options.schedulingOptions,
      dataDate: this.dataDate,
      truncatedLeadIds: this.truncatedLeadIds,
      hardPinViolatedIds: this.hardPinViolatedIds,
      hammockNoFinishDriverIds: this.hammockNoFinishDriverIds,
      projectEngine: this.projectEngine,
      calendarFor: (t) => this.calendarFor(t),
      signedFloat: (a, b, eng, task) => this.signedFloat(a, b, eng, task),
      constraintInstant: (c, eng) => this.constraintInstant(c, eng),
      snapOnOrAfter: (eng, d) => this.snapOnOrAfter(eng, d),
      snapOnOrBefore: (eng, d) => this.snapOnOrBefore(eng, d),
      modeOf: (eng) => this.modeOf(eng),
    });
    // Zachte WP7-waarschuwing: alleen bij een echt onwerkbaar venster het veld zetten, zodat een
    // normale solve byte-identiek blijft (veld afwezig ⇒ geen wijziging aan bestaande consumenten).
    // N4 (Opus-review, T9): `Set`-dedupe — sinds T9's voortgangstak TWEE aparte checked-aanroepen
    // per taak kan doen (de `elapsedAnchor`-hervattingspunt-berekening én de `ef`-restwerk-optelling
    // erna), kan dezelfde `taskId` twee keer gepusht worden als BEIDE tegen de onwerkbaar-venster-cap
    // lopen — vóór T9 kon een taak hoogstens via één pad hier terechtkomen, dus dit kon niet.
    if (this.cappedTaskIds.length > 0) result.cappedTaskIds = [...new Set(this.cappedTaskIds)];
    // T8-rooktest: idem voor relaties die een niet-bladtaak raakten en al bij de constructie
    // genegeerd zijn (zie de guard in de constructor) — byte-identiek default zolang dat niet gebeurt.
    if (this.droppedSequenceIds.length > 0) result.droppedSequenceIds = [...this.droppedSequenceIds];
    return result;
  }

  /** Detect cycles using DFS. Returns array of task IDs in the cycle, or null. */
  private detectCycle(): string[] | null {
    const color = new Map<string, number>();
    const parent = new Map<string, string | null>();

    for (const id of this.tasks.keys()) {
      color.set(id, 0); // WHITE
    }

    for (const id of this.tasks.keys()) {
      if (color.get(id) === 0) {
        const cycle = this.dfsVisit(id, color, parent);
        if (cycle) return cycle;
      }
    }
    return null;
  }

  private dfsVisit(
    u: string,
    color: Map<string, number>,
    parent: Map<string, string | null>,
  ): string[] | null {
    color.set(u, 1); // GRAY

    for (const seq of this.successors.get(u) || []) {
      const v = seq.successorId;
      if (!this.tasks.has(v)) continue;

      if (color.get(v) === 1) { // GRAY = back edge
        // Back edge found - reconstruct cycle
        const cycle: string[] = [v, u];
        let current = u;
        while (current !== v) {
          const p = parent.get(current);
          if (p === null || p === undefined) break;
          cycle.push(p);
          current = p;
          if (current === v) break;
        }
        cycle.reverse();
        return cycle;
      }

      if (color.get(v) === 0) { // WHITE
        parent.set(v, u);
        const cycle = this.dfsVisit(v, color, parent);
        if (cycle) return cycle;
      }
    }

    color.set(u, 2); // BLACK
    return null;
  }

  private topologicalSort(): string[] {
    const inDegree = new Map<string, number>();
    for (const id of this.tasks.keys()) {
      inDegree.set(id, 0);
    }
    for (const seq of this.sequences) {
      inDegree.set(seq.successorId, (inDegree.get(seq.successorId) || 0) + 1);
    }

    const queue: string[] = [];
    for (const [id, deg] of inDegree) {
      if (deg === 0) queue.push(id);
    }

    const result: string[] = [];
    while (queue.length > 0) {
      const id = queue.shift()!;
      result.push(id);
      for (const seq of this.successors.get(id) || []) {
        const newDeg = (inDegree.get(seq.successorId) || 1) - 1;
        inDegree.set(seq.successorId, newDeg);
        if (newDeg === 0) queue.push(seq.successorId);
      }
    }

    // Tasks not in the dependency graph (isolated) are still included
    for (const id of this.tasks.keys()) {
      if (!result.includes(id)) result.push(id);
    }

    return result;
  }

  private forwardPass(order: string[]): Map<string, { es: Date; ef: Date }> {
    const results = new Map<string, { es: Date; ef: Date }>();
    // Vroegste projectstart (= vroegste start onder de taken zónder voorganger, ELK al geklemd op
    // de geconfigureerde projectstartdatum via `rootFloor` — gebruikstest-bevinding 2026-08). Dient
    // als ondergrens zodat een negatieve lag (lead) een taak niet vóór het projectbegin trekt.
    // Vooraf bepaald, zodat de topologische volgorde de uitkomst niet beïnvloedt. Sinds T7 (§9/O2)
    // is dit de ENIGE plek waar `rootFloor` nog klemt — de eigen ES-tak van een wortel-taak
    // hieronder gebruikt `ownAnchor` (ongeklemd); deze precompute-lus en `hammockEarlyStart`
    // (die `projectStart` als basis gebruikt) blijven ongewijzigd.
    let projectStart: Date | null = null;
    for (const t of this.tasks.values()) {
      if ((this.predecessors.get(t.id) || []).length > 0) continue;
      const eng = this.calendarFor(t);
      const s = this.rootFloor(eng, t.time.scheduleStart, !t.isMilestone && t.time.durationType === 'ELAPSEDTIME');
      if (!projectStart || s < projectStart) projectStart = s;
    }

    for (const taskId of order) {
      const task = this.tasks.get(taskId)!;
      const cal = this.calendarFor(task);
      const preds = this.predecessors.get(taskId) || [];

      // ── Hammock / Level of Effort (§4.4) ───────────────────────────────────
      // Een hammock loopt mee in topologische volgorde (drivers staan er per definitie vóór). ES =
      // de gewone forward-max over SS/FS-voorganger-bounds + projectstart-vloer; EF = de max over de
      // FF/SF-voorganger-bounds (ondergrens ES). De AFGELEIDE duur (span ES→EF) wordt naar
      // `scheduleDuration` (+ `durationMinutes` op een uur-kalender) geschreven; eigen duur-invoer
      // wordt genegeerd. `isHammock` afwezig ⇒ deze tak draait niet (byte-identiek).
      if (task.isHammock) {
        const es = this.hammockEarlyStart(task, preds, results, projectStart, cal);
        const { ef, hasFinishDriver } = this.hammockEarlyFinish(task, preds, results, es, cal);
        if (!hasFinishDriver) this.hammockNoFinishDriverIds.push(taskId);
        // T8 (T10-reviewtoevoeging): een ELAPSEDTIME-hammock drukt zijn afgeleide span uit in KLOK-
        // tijd, niet in WERKtijd — `cal.workMinutesBetween`/`workDaysBetween` tellen alleen tijd
        // binnen kalenderbanden, wat voor een 24/7-taak een te korte duur zou geven. De
        // uur-omrekening deelt daarbij door de VASTE klokdag (24 × 60), NOOIT door `cal.hoursPerDay`
        // — dat zou dezelfde dubbele-deling-valkuil zijn die T10 in de lezer fixte, hier toegepast
        // op de duur-herberekening i.p.v. op de leeskant.
        if (task.time.durationType === 'ELAPSEDTIME') {
          if (cal.isHourMode) {
            const mins = Math.round((ef.getTime() - es.getTime()) / MS_PER_MIN);
            task.time.durationMinutes = mins;
            task.time.scheduleDuration = mins / (24 * 60);
          } else {
            task.time.scheduleDuration = (ef.getTime() - es.getTime()) / MS_PER_DAY;
          }
        } else if (cal.isHourMode) {
          const mins = cal.workMinutesBetween(es, ef);
          task.time.durationMinutes = mins;
          task.time.scheduleDuration = mins / (cal.hoursPerDay * 60);
        } else {
          task.time.scheduleDuration = cal.workDaysBetween(es, ef);
        }
        results.set(taskId, { es, ef });
        continue;
      }

      let earlyStart: Date;

      if (preds.length === 0) {
        // T8-review-BLOCKER (Opus-hercheck 72486257, uitgebreid): dezelfde bypass als
        // `snapSuccessorEarlyStart` hieronder — hier voor de WORTEL-taak-tegenhanger. Zonder wacht
        // duwde `ownAnchor`s `snapOnOrAfter` een elapsed-taak met een op zichzelf staand weekend-
        // anker (bv. ingelezen scheduleStart = zaterdag, geen voorganger) alsnog naar maandag —
        // dezelfde H1-schending, maar op de EIGEN-anker-plek i.p.v. de relatie-plek (gevonden bij het
        // doorzoeken van alle hersnap-plekken die de reviewer vroeg). Het constraint-PAD
        // (`applyForwardConstraints`/`forwardBoundOf`) blijft bewust ONGEMOEID — dat is de al-
        // gedocumenteerde L1-afbakening (zie `hardPinStart`): een SNET/MSO-datum snapt nog steeds
        // naar een werk-instant, ook op een elapsed taak.
        const rootElapsed = !task.isMilestone && task.time.durationType === 'ELAPSEDTIME';
        // Geen voorganger: de eigen geplande start, ONGEKLEMD tegen de projectstart (T7, §9/O2 —
        // "een ingelezen anker wordt nooit door de vloer overruled"; zie `ownAnchor`). Een harde
        // MSO/MFO-pin (hieronder in `applyForwardConstraints`) wint hier nog steeds
        // onvoorwaardelijk: die controleert `hardPinStart` EERST en retourneert dan meteen, vóór
        // deze waarde ooit gezien wordt.
        earlyStart = rootElapsed
          ? this.parseIn(cal, task.time.scheduleStart)
          : this.ownAnchor(cal, task.time.scheduleStart);
        // Geen voorganger-druk ⇒ rawMax null ⇒ een (root-)pin kan de logica niet breken (§4.2).
        earlyStart = this.applyForwardConstraints(task, earlyStart, null, cal);
        // Fase 2.8b (golf 3): her-snap ná de constraint — spiegelt de voorganger-tak (regel 466).
        // `applyForwardConstraint` levert een DAG-conceptuele grens (`nextWorkDay`/
        // `addWorkingDaysSigned`, §5.2), in uur-modus een middernacht-instant die NIET op een
        // werk-instant valt; zonder her-snap rapporteert een constrained root-taak zijn ES op 00:00
        // i.p.v. de bandstart (de `earlyFinish` rekent al vanaf de bandstart ⇒ interne inconsistentie).
        // Idempotent in dag-modus (`nextWorkDay` van een werkdag = diezelfde werkdag) en bij een
        // niet-bindende constraint (ES al gesnapt op regel 429) ⇒ byte-identiek voor de 290.
        // `rootElapsed` slaat deze her-snap over (zelfde MSP-pariteitsgrond als hierboven) — een
        // ONgeconstrainde elapsed wortel-taak had hier toch al niets te her-snappen; alleen mét een
        // (werk-instant-snappende) constraint kan deze tak ooit iets anders dan het rauwe anker geven.
        earlyStart = rootElapsed ? earlyStart : this.snapOnOrAfter(cal, earlyStart);
      } else {
        // Early start = max van alle voorganger-constraints, met de projectstart als ondergrens.
        // Die ondergrens is correct vóór ÉLKE relatie: relatie-constraints (FS/SS/FF/SF) zijn
        // ondergrenzen ("niet eerder dan…"), nooit gelijkheden — een taak start dus op z'n
        // vroegst bij het projectbegin. Zo blijft een niet-bindende FF/SF gewoon op de anker
        // (de opvolger haalt de eis vanzelf) en wordt een lead niet vóór dag 1 getrokken.
        earlyStart = projectStart ? new Date(projectStart.getTime()) : new Date(0);
        let rawMax: Date | null = null;
        for (const seq of preds) {
          const predResult = results.get(seq.predecessorId);
          const predTask = this.tasks.get(seq.predecessorId);
          if (!predResult || !predTask) continue;
          const constraintDate = forwardConstraint(
            this.relDeps, predResult, predTask, seq, task, this.calendarFor(predTask), cal,
          );
          this.seqConstraint.set(seq.id, constraintDate);
          if (!rawMax || constraintDate > rawMax) rawMax = constraintDate;
          if (constraintDate > earlyStart) {
            earlyStart = constraintDate;
          }
        }
        // Vloer-afkap: wilde óók de strengste relatie de taak nog vóór het projectbegin trekken,
        // markeer dan de bindende lead(s) als afgekapt — de gebruiker moet kunnen zien dat een
        // lead niet volledig benut wordt. Gedomineerde leads zijn gewoon non-driving, geen afkap.
        if (rawMax && projectStart && rawMax < projectStart) {
          for (const seq of preds) {
            const c = this.seqConstraint.get(seq.id);
            const predTask = this.tasks.get(seq.predecessorId);
            if (!c || !predTask) continue;
            // Zelfde lag-resolutie als de relatie-wiskunde zelf (incl. `lagMinutes`-only, fase 2.10),
            // anders wordt een lead die alleen in minuten bestaat niet als afgekapt gemarkeerd.
            const predLagDays = resolveEffectiveLagDays(
              seq, predTask, this.calendarFor(predTask).hoursPerDay,
            );
            if (formatDate(c) === formatDate(rawMax) && predLagDays < 0) {
              this.truncatedLeadIds.push(seq.id);
            }
          }
        }
        // `rawMax` (voorganger-druk) voedt de harde-pin-logicaschending-detectie (§4.2).
        earlyStart = this.applyForwardConstraints(task, earlyStart, rawMax, cal);
        earlyStart = this.snapSuccessorEarlyStart(cal, earlyStart, task);
      }

      // Nivelleer-vertraging (fase 2.5, §5.6): schuif de zojuist bepaalde — al werkdag-gesnapte,
      // constraint-toegepaste — early start met de door de leveler gezette `levelingDelay` op.
      // Beide takken hierboven (geen-voorgangers én met-voorgangers) eindigen met een werkdag,
      // dus addWorkingDaysSigned krijgt gegarandeerd een werkdag (invariant). Zo lopen de
      // verschoven datums gewoon door de backward pass -> float wordt eerlijk herrekend (geen
      // phantom float, §10-P2). `levelingDelay` undefined of 0 => exacte no-op (alle bestaande
      // cases blijven ongewijzigd).
      if (task.levelingDelay) {
        earlyStart = cal.addWorkingDaysSigned(earlyStart, task.levelingDelay);
      }

      // Voortgang (fase 2.6): actual-pinning + data-date-vloer. dataDate === null ⇒ elke tak is
      // een no-op (backwards-compat). `earlyStart` is hier al de retained-logic voorganger-druk.
      const dataDate = this.dataDate;
      {
        const t = task.time;
        if (t.actualFinish && t.completion >= 1) {
          // (1) VOLTOOID: volledig gepind op actuals — geen forward-drift voorbij actualFinish.
          let es = this.parseIn(cal, t.actualStart ?? t.actualFinish);
          // Milestone: start én finish landen op dezelfde werk(dag)-grens (snap op-of-ná, niet -vóór).
          let ef = task.isMilestone
            ? this.snapOnOrAfter(cal, this.parseIn(cal, t.actualFinish))
            : this.snapOnOrBefore(cal, this.parseIn(cal, t.actualFinish));
          // Inversie-randgeval: het HELE geregistreerde venster valt in onwerkbare tijd (weekend,
          // bouwvak, feestdagenblok) — dan snapt de start vóóruit tot ná de finish, die achteruit
          // snapte. Er bestaat dan geen werkdag binnen het feit, dus één van beide moet wijken.
          // Dat MOET de start zijn: een taak die is afgemeld hoort per definitie in het VERLEDEN,
          // nooit voorbij zijn eigen `actualFinish` (en al helemaal niet voorbij de statusdatum).
          // Vroeger stond hier `ef = es` — dat tilde een op 2 augustus afgemelde taak naar de eerste
          // werkdag ná de bouwvak (24 augustus, een week ná de statusdatum) en vertraagde daarmee óók
          // zijn opvolger een dag. Met `es = ef` landt het paar op de laatste werkdag op-of-vóór de
          // `actualFinish` en start de opvolger op de eerste werkdag daarna — precies waar het feit
          // hem zet. Buiten dit randgeval (ef ≥ es) verandert er niets.
          if (ef < es) es = ef;
          results.set(taskId, { es, ef });
          continue;
        }
        if (dataDate && (t.actualStart || t.completion > 0) && t.completion < 1) {
          // (2) IN PROGRESS — actualStart (store-route) óf impliciete actualStart = de gewone
          //     forward-pass-earlyStart (2b, vangnet voor rauwe legacy/externe data).
          const actualES = t.actualStart
            ? this.snapOnOrAfter(cal, this.parseIn(cal, t.actualStart))
            : earlyStart;
          // Restwerk: uur ⇒ `remainingMinutes ?? durationMinutes × (1−completion)`; dag ⇒ werkdagen (§5.3).
          const totalSpan = cal.isHourMode ? durationMinutesOf(task, cal) : t.scheduleDuration;
          const remaining = cal.isHourMode
            ? Math.max(0, t.remainingMinutes ?? Math.round(totalSpan * (1 - t.completion)))
            : Math.max(0, t.remainingTime ?? Math.round(totalSpan * (1 - t.completion)));
          // M2 (Opus-review, 2026-08-17): ELAPSEDTIME-bewustheid — T8 maakte de rest van de solver
          // elapsed-bewust (`addDurationChecked` hierboven: `addElapsedMinutes(start,
          // elapsedMinutesOf(task, eng))`, GEEN kalenderband-toetsing); deze voortgangstak rekende
          // tot nu toe ONVOORWAARDELIJK met `cal.addWorkMinutes`/`cal.addWorkDaysChecked` (WERKtijd),
          // dus een ELAPSEDTIME-taak met `completion > 0` klapte stil om naar WORKTIME-semantiek —
          // precies het gat dat T8 elders dichtte. `totalSpan`/`remaining` hierboven staan al in de
          // "eigen eenheid" van de taak (minuten in uur-modus, dagen in dag-modus — BEIDE al
          // elapsed-klok-consistent gevuld voor een ELAPSEDTIME-taak, zie `mppReader.ts`'s
          // `raw.isElapsedDuration`-tak voor zowel `duration`/`durationMinutes` als
          // `remainingTime`/`remainingMinutes`); alleen de dag→minuut-omrekening ontbreekt nog voor
          // het dag-modus-pad — exact dezelfde stap als `elapsedMinutesOf`'s eigen dag-tak
          // (`scheduleDuration × 24 × 60`). `isElapsedTask` sluit een mijlpaal uit (spiegelt de
          // `!task.isMilestone && durationType === 'ELAPSEDTIME'`-guard die overal elders in dit
          // bestand staat — een mijlpaal heeft geen eigen duur-/durationType-semantiek).
          const isElapsedTask = !task.isMilestone && t.durationType === 'ELAPSEDTIME';
          const remainingElapsedMinutes = isElapsedTask ? (cal.isHourMode ? remaining : remaining * 24 * 60) : 0;
          let remStart = dataDate;                                  // ondergrens: statusdatum
          if (this.options.progressMode !== 'PROGRESS_OVERRIDE') {
            // RETAINED_LOGIC: remaining respecteert óók de voorganger-druk (earlyStart).
            if (earlyStart > remStart) remStart = earlyStart;
            // T9 (voortgangsafronding, MEET-EERST-bevinding): MS Project hervat het restwerk NIET
            // op de statusdatum zelf, maar op `actualStart + reeds-verstreken-duur` (het reeds
            // AFGEWERKTE deel, `totalSpan − remaining`, vanaf de eigen `actualES`), doorgesnapt via
            // dezelfde werk-optelling als het restwerk zelf. Bewijs (corpusreconstructie, OzBuild
            // "Create Technical Specification": completion 20%, scheduleDuration 5d, remainingTime
            // (nu EXACT uit MSP, zie mppReader.ts) 4d ⇒ verstreken 1d; actualStart vr 07-12 08:00 +
            // 1 werkdag = za 08-12 → doorgesnapt naar ma 10-12 08:00; + 4 werkdagen restwerk = MSP's
            // eigen opgeslagen finish woe 12-12 17:00 EXACT. De statusdatum-vloer (`dataDate`) alléén
            // gaf hier vr 07-12 (te vroeg — MSP's eigen "reeds verstreken" venster loopt door tot in
            // het weekend, dat P6-achtige RETAINED_LOGIC-model kent dat venster niet).
            //
            // NIET UNIVERSEEL: dit is AANTOONBAAR MSP-eigen gedrag, geen (her)ontdekte P6-regel —
            // P6's eigen, gedocumenteerde RETAINED_LOGIC ("max(dataDate, voorganger-druk)", zónder
            // een derde "verstreken-vanaf-actualStart"-vloer) staat letterlijk getest in
            // `cases-progress.json`'s Scenario A/B/C (§3.3-ontwerp, uit een P6-bronvergelijking).
            // Die scenario's zetten `actualStart` BEWUST los van "wat %complete impliceert" om
            // precies de voorganger-druk/statusdatum-interactie te isoleren — met deze vloer
            // ONVOORWAARDELIJK aan zou Scenario A-taak B (dur 5, completion 0.4, actualStart ==
            // statusDate ⇒ elapsed 2 dagen ná een actualStart die zelf al op de statusdatum ligt)
            // stilzwijgend 2 werkdagen later landen — een BESLIST, expliciet geciteerd P6-gedrag
            // breken zonder eigen meting. Vandaar de `resumeFromActualElapsed`-vlag
            // (`SchedulingOptions`, project.ts): default `undefined`/`false` ⇒ deze hele tak is een
            // no-op (byte-identiek aan vóór T9), UITSLUITEND `true` voor `.mpp`-imports
            // (`mppReader.ts` zet 'm project-breed — élke MPP-taak toont dit gedrag, corpusbreed
            // gemeten, geen per-taak-signaal nodig).
            // M1 (Opus-review, 2026-08-17): deze vloer is UITSLUITEND geldig als er nog restwerk
            // ná het "verstreken" venster geplaatst moet worden (`remaining > 0`) — het is per
            // constructie de hervattingsPUNT voor dat restwerk, geen op-zichzelf-staande finish. De
            // `elapsed + 1`-telescopie hierboven (dag ÉÉN NA het verstreken venster) is correct
            // WANNEER `remaining ≥ 1` daarna nog aangevuld wordt (het `+1` en het `−1`-effect van
            // `remaining` heffen elkaar precies op: dag `elapsed+1` + `(remaining−1)` verder =
            // dag `elapsed+remaining` = dag `totalSpan` vanaf `actualES` — exact de natuurlijke
            // finish). Bij `remaining === 0` (bv. `RemainingDuration=0` terwijl `PercentComplete<100`
            // — inconsistente brondata, of een taak die precies aan haar volledige duur zit) valt
            // die opheffing weg: `addWorkDaysChecked(remStart, 0)`/`addWorkMinutes(remStart, 0)`
            // hieronder geven `remStart` ONGEWIJZIGD terug (geen "dag −1"-tegenhanger), dus de finish
            // zou dan blijven staan op de HERVATTINGSpunt-instant zelf — één werkdag/bandgat VOORBIJ
            // de natuurlijke finish (gemeten: uur ma 16:00 → di 08:00; dag vr 10-07 → ma 13-07).
            // Bij `remaining === 0` treedt deze vloer daarom NIET in werking — `remStart` blijft op
            // de bestaande `max(dataDate, voorganger-druk)`-waarde (byte-identiek aan vóór T9 voor
            // dit randgeval), zie `cases-progress.json`'s `prog-T9-remaining-nul-natuurlijke-finish`.
            const elapsed = this.options.schedulingOptions?.resumeFromActualElapsed && remaining > 0
              ? Math.max(0, totalSpan - remaining)
              : 0;
            if (elapsed > 0) {
              // M2: ELAPSEDTIME rekent hier 24/7 in klok-minuten (`addElapsedMinutes`, T8-precedent)
              // — GEEN `snapOnOrAfter` (die zou een legitiem weekend-/nachtinstant, precies het punt
              // van ELAPSEDTIME, alsnog naar de eerstvolgende werkband duwen) en GEEN dag-inclusieve
              // `+1`-telescopie (die hoort bij `addWorkDaysChecked`s "hoeveelste-werkdag"-conventie,
              // niet bij een kale klok-optelling). Uur (WORKTIME): `addWorkMinutes` is een echte
              // klok-optelling (kan exact op een bandgrens landen, bv. vr 17:00) — `snapOnOrAfter`
              // duwt zo'n grensinstant door naar de eerstvolgende geldige werk-instant (ma 08:00),
              // precies zoals elders in deze functie (`actualES`) een opgeslagen datum snapt. Dag
              // (WORKTIME): `addWorkDaysChecked(actualES, N)` is INCLUSIEF (dag 1 = `actualES` zelf,
              // de "hoeveelste-werkdag-vanaf-hier"-conventie die ook `remaining`/`ef` verderop
              // gebruikt) — de dag ÉÉN NA de `elapsed`-ste werkdag is dus dag `elapsed + 1`, niet dag
              // `elapsed` (anders zou elapsed=1 op `actualES` zelf blijven staan i.p.v. doorschuiven
              // naar de eerstvolgende werkdag — geverifieerd tegen `CalendarEngine.addWorkDaysChecked`:
              // dag 1 vanaf een vrijdag = die vrijdag zelf, dag 2 = de eerstvolgende maandag).
              const elapsedAnchor = isElapsedTask
                ? addElapsedMinutes(actualES, cal.isHourMode ? elapsed : elapsed * 24 * 60)
                : cal.isHourMode
                  ? this.snapOnOrAfter(cal, cal.addWorkMinutes(actualES, elapsed))
                  : (() => {
                      const r = cal.addWorkDaysChecked(actualES, elapsed + 1);
                      if (r.capped) this.cappedTaskIds.push(taskId);
                      return r.date;
                    })();
              if (elapsedAnchor > remStart) remStart = elapsedAnchor;
            }
          }
          let ef: Date;
          if (isElapsedTask) {
            ef = addElapsedMinutes(remStart, remainingElapsedMinutes);
          } else if (cal.isHourMode) {
            ef = cal.addWorkMinutes(remStart, remaining);
          } else {
            // WP7: ook het rest-werk-pad kan tegen de onwerkbaar-venster-cap lopen ⇒ checked-variant.
            const r = cal.addWorkDaysChecked(remStart, remaining);
            ef = r.date;
            if (r.capped) this.cappedTaskIds.push(taskId);
          }
          results.set(taskId, { es: actualES, ef });
          continue;
        }
        if (dataDate && t.completion === 0 && earlyStart < dataDate) {
          // (3) NIET GESTART: statusdatum als ondergrens (remaining werk nooit in het verleden).
          earlyStart = dataDate;
        }
      }

      const { date: earlyFinish, capped } = this.addDurationChecked(cal, earlyStart, task);
      if (capped) this.cappedTaskIds.push(taskId); // WP7: onwerkbaar venster ⇒ zachte waarschuwing

      results.set(taskId, { es: earlyStart, ef: earlyFinish });
    }

    return results;
  }

  /** Hammock-ES (§4.4): de gewone forward-`max` over de START-drivers (SS/FS-voorgangers), met de
   *  projectstart als vloer. FF/SF-voorgangers (finish-drivers) doen hier NIET mee — die bepalen de
   *  EF. `forwardConstraint` levert voor SS/FS een start-grens; `seqConstraint` wordt bewust NIET
   *  gezet, zodat de hammock-relaties buiten de driving-/float-path-analyse blijven (§4.4).
   *
   *  BEKENDE BEPERKING (L4, T6-her-review, §9/O1): een hammock-taak die TEGELIJK `isMilestone` is,
   *  volgt de MSP-instantconventie hier NIET — `snapOnOrAfter` is de kale her-snap, niet de
   *  mijlpaal-bewuste `landRawInstant`/`snapSuccessorEarlyStart`. Bewust niet gefixt: de combinatie
   *  hammock+mijlpaal is pathologisch (een hammock leidt zijn eigen duur af uit ES→EF; een mijlpaal
   *  hééft geen duur) en geen van beide bronbestandsformaten (`.mpp`/MSPDI) schrijft 'm zo. */
  private hammockEarlyStart(
    task: Task,
    preds: Sequence[],
    results: Map<string, { es: Date; ef: Date }>,
    projectStart: Date | null,
    cal: CalendarEngine,
  ): Date {
    let es = projectStart ? new Date(projectStart.getTime()) : new Date(0);
    for (const seq of preds) {
      if (seq.type !== 'START_START' && seq.type !== 'FINISH_START') continue;
      const predResult = results.get(seq.predecessorId);
      const predTask = this.tasks.get(seq.predecessorId);
      if (!predResult || !predTask) continue;
      const c = forwardConstraint(
        this.relDeps, predResult, predTask, seq, task, this.calendarFor(predTask), cal,
      );
      if (c > es) es = c;
    }
    return this.snapOnOrAfter(cal, es);
  }

  /** Hammock-EF (§4.4): de `max` over de FINISH-drivers (FF/SF-voorgangers), met ondergrens `es` (een
   *  hammock is nooit negatief lang). `forwardConstraint` levert de start-equivalente grens; die
   *  wordt via `finishFromStart` terug naar de finish-grens vertaald (de duur-conversie valt weg — de
   *  finish is duur-onafhankelijk, dus idempotent ongeacht de genegeerde duur-invoer). Zonder
   *  finish-driver valt EF terug op ES (nul-lengte, met waarschuwing bij de aanroeper). */
  private hammockEarlyFinish(
    task: Task,
    preds: Sequence[],
    results: Map<string, { es: Date; ef: Date }>,
    es: Date,
    cal: CalendarEngine,
  ): { ef: Date; hasFinishDriver: boolean } {
    let ef: Date | null = null;
    for (const seq of preds) {
      if (seq.type !== 'FINISH_FINISH' && seq.type !== 'START_FINISH') continue;
      const predResult = results.get(seq.predecessorId);
      const predTask = this.tasks.get(seq.predecessorId);
      if (!predResult || !predTask) continue;
      const startEquiv = forwardConstraint(
        this.relDeps, predResult, predTask, seq, task, this.calendarFor(predTask), cal,
      );
      const finishBound = this.finishFromStart(cal, startEquiv, task);
      if (!ef || finishBound > ef) ef = finishBound;
    }
    const hasFinishDriver = ef !== null;
    let earlyFinish = ef ?? new Date(es.getTime());
    if (earlyFinish < es) earlyFinish = new Date(es.getTime());   // vloer: nooit negatief lang
    return { ef: earlyFinish, hasFinishDriver };
  }

  /**
   * Out-of-sequence-detectie (fase 2.6, §4.4): relaties waarvan de opvolger progress/actuals heeft
   * die de voorganger-logica tegenspreekt. Waarschuwing, geen correctie — het gedrag volgt uit de
   * die de voorganger-logica tegenspreekt. Waarschuwing, geen correctie — het gedrag volgt uit de
   * gekozen progressMode. Zonder statusdatum: geen detectie (no-op, backwards-compat).
   */
  private detectOutOfSequence(earlyDates: Map<string, { es: Date; ef: Date }>): string[] {
    if (!this.dataDate) return [];
    const out: string[] = [];
    for (const seq of this.sequences) {
      const pred = this.tasks.get(seq.predecessorId);
      const succ = this.tasks.get(seq.successorId);
      if (!pred || !succ) continue;
      // Sub-dag-actuals moeten in uur-modus als out-of-sequence tellen ⇒ `parseInstant` (§5.3);
      // elke taak in zijn eigen engine. Dag ⇒ `parseDate` (byte-identiek).
      const succEng = this.calendarFor(succ);
      const predEng = this.calendarFor(pred);
      const succAS = succ.time.actualStart ? this.parseIn(succEng, succ.time.actualStart) : null;
      const succAF = succ.time.actualFinish ? this.parseIn(succEng, succ.time.actualFinish) : null;
      const predAS = pred.time.actualStart ? this.parseIn(predEng, pred.time.actualStart) : null;
      const predAF = pred.time.actualFinish ? this.parseIn(predEng, pred.time.actualFinish) : null;
      const predEF = earlyDates.get(seq.predecessorId)?.ef ?? null;
      switch (seq.type) {
        case 'START_START': {
          // Opvolger gestart vóór de voorganger.
          if (succAS && predAS && succAS < predAS) out.push(seq.id);
          break;
        }
        case 'FINISH_FINISH':
        case 'START_FINISH': {
          // Finish-zijde: opvolger voltooid terwijl de voorganger nog niet voltooid is (of eerder).
          if (succAF) {
            const predFin = predAF ?? predEF;
            if (!predAF || (predFin && succAF < predFin)) out.push(seq.id);
          }
          break;
        }
        case 'FINISH_START':
        default: {
          // Opvolger gestart terwijl de voorganger nog niet voltooid is (of vóór diens finish).
          if (succAS) {
            const prefEF = predAF ?? predEF;
            if (!predAF || (prefEF && succAS < prefEF)) out.push(seq.id);
          }
          break;
        }
      }
    }
    return out;
  }

  /** Getekend werkdag-verschil in kalender `eng`: a≤b ⇒ +stappen, a>b ⇒ −stappen (negatief mogelijk). */
  private signedWorkDays(a: Date, b: Date, eng: CalendarEngine): number {
    return a <= b
      ? eng.workDaysBetween(a, b) - 1
      : -(eng.workDaysBetween(b, a) - 1);
  }

  /** Constraint-instant in de kalendermodus (§4.1), of null bij afwezig/onparseerbaar (soft:
   *  negeren). Dag ⇒ `parseDate` (middernacht, byte-identiek); uur ⇒ `parseInstant` (behoudt tijd-
   *  van-de-dag). Een date-only-string op een uur-taak = middernacht ⇒ dag-verankerd: de instant-
   *  vinders snappen hem naar de eerste/laatste werk-instant van die dag (S13). Een datetime-string
   *  draagt tijd-van-de-dag en wordt tot de minuut gehonoreerd. */
  private constraintInstant(c: TaskConstraint | undefined, eng: CalendarEngine): Date | null {
    const raw = c?.date;
    if (!raw) return null;
    const d = this.parseIn(eng, raw);
    return isNaN(d.getTime()) ? null : d;
  }

  /** De harde-pin-START (§4.2), of null als de PRIMAIRE constraint geen harde MSO/MFO-pin is.
   *  MSO pint de START op de datum; MFO pint de FINISH ⇒ start = finish ⊖ duur. Modus-neutraal
   *  (dag: bevroren dag-primitieven; uur: instant-vinders + minuut-aftrek via `durationMinutesOf`).
   *
   *  T8-REIKWIJDTE (L1, T8-review — correctie op de T8-commitboodschap, die "MSO/MFO-constraints"
   *  noemde als afnemer van `finishFromStart`/`startFromFinish`): dat klopt alleen voor de
   *  DUUR-terugstap hier (MFO ⇒ `startFromFinish`, hierbeneden MSO ⇒ `addDuration`) — dié is
   *  ELAPSEDTIME-bewust sinds T8. De CONSTRAINT-SNAP zelf (`this.snapOnOrAfter(eng, d)` hierboven,
   *  en `constraintInstant`/`snapOnOrBefore` in de soft-constraint-tegenhangers `forwardBoundOf`/
   *  `backwardBoundOf` hieronder) is dat NIET: een MSO/MFO-datum op een taak snapt altijd naar een
   *  WERK-instant, ook als die taak zelf ELAPSEDTIME is. Bewuste afbakening (niet gefixt in T8 of
   *  deze reviewronde) — geen synthetische case dekt dit, dus geen mutatiebewijs voor deze regel. */
  private hardPinStart(task: Task, eng: CalendarEngine): Date | null {
    const c = task.constraint;
    if (!c?.hard || (c.type !== 'MSO' && c.type !== 'MFO')) return null;
    const d = this.constraintInstant(c, eng);
    if (!d) return null;
    const snapped = this.snapOnOrAfter(eng, d);
    return c.type === 'MSO' ? snapped : this.startFromFinish(eng, snapped, task);
  }

  /** De harde-pin-FINISH (§4.2), spiegel van `hardPinStart` (⇒ EF=LF én ES=LS op de pin, tf=0).
   *  MFO: EF = snap(datum); MSO: EF = gepinde-start ⊕ duur. */
  private hardPinFinish(task: Task, eng: CalendarEngine): Date | null {
    const c = task.constraint;
    if (!c?.hard || (c.type !== 'MSO' && c.type !== 'MFO')) return null;
    const d = this.constraintInstant(c, eng);
    if (!d) return null;
    const snapped = this.snapOnOrAfter(eng, d);
    return c.type === 'MFO' ? snapped : this.addDuration(eng, snapped, task);
  }

  /**
   * Detector-gate voor de harde-pin-logica-schending (fase 2.10, P1). Een taak met een geregistreerd
   * feit (`actualStart` gezet voor MSO, `actualFinish` gezet voor MFO) waarvan dat feit EXACT op de
   * pin valt, heeft de pin al aantoonbaar gerespecteerd — een later/gevloerd berekende voorganger-EF
   * (`rawMax`, bv. via een niet-afgemelde startmijlpaal die door de data-date-vloer omhoog is
   * geschoven) is dan een achterhaald forward-signaal, geen echte logica-schending. Wijkt het
   * geregistreerde feit zelf af van de pin (te vroeg/te laat), of ontbreekt het feit nog, dan gate
   * dit NIETS — de bestaande melding blijft vuren. Bewust smal: alleen dit ene detector-moment,
   * de data-date-vloer zelf (§P6) blijft ongewijzigd.
   */
  private hardPinRespectedByActual(task: Task, eng: CalendarEngine): boolean {
    const c = task.constraint;
    if (!c?.hard || (c.type !== 'MSO' && c.type !== 'MFO')) return false;
    const t = task.time;
    if (c.type === 'MSO') {
      if (!t.actualStart) return false;
      const pin = this.hardPinStart(task, eng);
      if (!pin) return false;
      const actualES = this.snapOnOrAfter(eng, this.parseIn(eng, t.actualStart));
      return formatDate(actualES) === formatDate(pin);
    }
    // MFO
    if (!t.actualFinish) return false;
    const pinFinish = this.hardPinFinish(task, eng);
    if (!pinFinish) return false;
    const actualEF = this.snapOnOrAfter(eng, this.parseIn(eng, t.actualFinish));
    return formatDate(actualEF) === formatDate(pinFinish);
  }

  /** Forward-ondergrens (start) van ÉÉN soft constraint (§4.1/§4.3), of null zonder forward-effect.
   *  SNET/MSO ⇒ start-ondergrens; FNET/MFO ⇒ finish-ondergrens vertaald naar de start. Dag-modus
   *  reduceert byte-identiek tot `nextWorkDay`/`addWorkingDaysSigned`; uur-modus gebruikt de instant-
   *  vinders + de minuut-aftrek van `startFromFinish` (via `durationMinutesOf`).
   *
   *  BEKENDE BEPERKING (L5, T6-her-review, §9/O6): een SNET/MSO exact op een band-eind (bv.
   *  "niet vóór di 17:00") volgt de mijlpaal-instantconventie NIET — `snapOnOrAfter` snapt hier
   *  altijd vooruit via `nextWorkInstant`, ook op een eindmijlpaal. Bewust: een constraint is een
   *  door de gebruiker/bronbestand OPGELEGDE ondergrens ("niet eerder dan X"), geen door een relatie
   *  AFGELEIDE landingsinstant — "niet eerder dan 17:00" wordt door MS Project zelf ook gelezen als
   *  "dus ten vroegste de eerstvolgende werk-instant ná 17:00", niet als "land exact op 17:00". De
   *  MSP-pariteitsconventie (T6) geldt voor relatie-afgeleide instanten (FS/FF/SF-grenzen), niet
   *  voor constraint-ondergrenzen.
   *
   *  VERWANTE OORZAAK (T6-her-review): de `dataDate`-vloer ("NIET GESTART", `forwardPass`) snapt
   *  in de PROJECT-kalender (`this.projectEngine`), niet in de eigen kalender van de taak — bij
   *  verschillende bandstructuren kan dat een ES opleveren die in de EIGEN taak-kalender géén
   *  `[start,end)`-instant is. Dat is precies het mechanisme achter `msp-06` in
   *  `cases-msp-pariteit.json` (en de FS-tak-verbreding rond `predEndsBeginOfDay` in
   *  `relationMath.ts`, L3): een relatie-afgeleide instant kan dus, via een taak wiens ES zelf al
   *  "vuil" is t.o.v. haar eigen kalender, alsnog een constraint-achtig gemengd-kalender-effect
   *  krijgen — niet gefixt hier (dit blok blijft puur constraint-ondergrenzen), maar wel de
   *  brug tussen deze beperking en de mijlpaal-instantconventie hierboven. */
  private forwardBoundOf(task: Task, c: TaskConstraint | undefined, eng: CalendarEngine): Date | null {
    const d = this.constraintInstant(c, eng);
    if (!c || !d) return null;
    if (c.type === 'SNET' || c.type === 'MSO') return this.snapOnOrAfter(eng, d);
    if (c.type === 'FNET' || c.type === 'MFO') {
      return this.startFromFinish(eng, this.snapOnOrAfter(eng, d), task);
    }
    return null;
  }

  /** Backward-bovengrens (late finish) van ÉÉN soft constraint (§4.1/§4.3), of null zonder backward-
   *  effect. FNLT/MFO ⇒ finish-bovengrens direct; SNLT/MSO ⇒ start-bovengrens vertaald naar de finish.
   *  Dag-modus byte-identiek (`prevWorkDay`/`addWorkingDaysSigned`); uur-modus via de instant-vinders. */
  private backwardBoundOf(task: Task, c: TaskConstraint | undefined, eng: CalendarEngine): Date | null {
    const d = this.constraintInstant(c, eng);
    if (!c || !d) return null;
    const dW = this.snapOnOrBefore(eng, d);
    if (c.type === 'FNLT' || c.type === 'MFO') return dW;
    if (c.type === 'SNLT' || c.type === 'MSO') return this.finishFromStart(eng, dW, task);
    return null;
  }

  /** Externe-link-lag in MINUTEN (uur-modus, §4.5): `lagMinutes` ⇒ bron; anders `lagDays × hoursPerDay ×
   *  60` (naakt getal = werkdagen — dezelfde conventie als de Sequence-lag, 2.8b §3.3). */
  private externalLagMinutes(link: ExternalLink, eng: CalendarEngine): number {
    if (typeof link.lagMinutes === 'number' && Number.isFinite(link.lagMinutes)) return link.lagMinutes;
    const days = typeof link.lagDays === 'number' && Number.isFinite(link.lagDays) ? link.lagDays : 0;
    return days * eng.hoursPerDay * 60;
  }
  /** Externe-link-lag in DAGEN (dag-modus). Afwezig ⇒ 0. */
  private externalLagDays(link: ExternalLink): number {
    return typeof link.lagDays === 'number' && Number.isFinite(link.lagDays) ? link.lagDays : 0;
  }

  /**
   * Forward-ondergrens (start-equivalent) van een externe PREDECESSOR-link (§4.5). De bevroren
   * `anchorDate` speelt de rol van de driving-datum van de externe taak (de ververs-actie schrijft
   * daar de source-`earlyFinish` bij FS/FF resp. `earlyStart` bij SS/SF in — §refreshExternalAnchors).
   * Het TWEEDE relType-teken bepaalt de zijde: FS/SS ⇒ START-grens, FF/SF ⇒ FINISH-grens (via
   * `startFromFinish` naar een start terugvertaald). Het EERSTE teken de dag-boundary-overgang:
   * alleen FS (externe finish → mijn start) krijgt de `nextWorkDayAfter`-+1 (spiegel van
   * `forwardConstraint` FS); SS/FF/SF ankeren op dezelfde grens (geen +1). In uur-modus valt de
   * +1 weg (continue tijd) ⇒ `nextWorkInstant`. `sourceMissing` speelt GEEN rol — er wordt altijd op
   * het anker gerekend (P6 External Dates). Retourneert null voor een successor-link.
   */
  private externalForwardBound(task: Task, link: ExternalLink, eng: CalendarEngine): Date | null {
    if (link.direction !== 'predecessor') return null;
    const anchor = this.parseIn(eng, link.anchorDate);
    if (isNaN(anchor.getTime())) return null;
    const rel = link.relType;
    const startSide = rel === 'FS' || rel === 'SS';   // tweede teken S ⇒ mijn start; F ⇒ mijn finish
    if (eng.isHourMode) {
      const shifted = eng.addWorkingMinutesSigned(anchor, this.externalLagMinutes(link, eng));
      return startSide ? shifted : this.startFromFinish(eng, shifted, task);
    }
    const lag = this.externalLagDays(link);
    // FS: de werkdag ná het finish-anker (finish→start). Anders: het anker zelf (addWorkingDaysSigned
    // snapt zelf voorwaarts naar een werkdag). Beide takken tellen daarna `lag` werkdagen bij.
    const base = rel === 'FS' ? eng.nextWorkDayAfter(anchor) : anchor;
    const shifted = eng.addWorkingDaysSigned(base, lag);
    return startSide ? shifted : this.startFromFinish(eng, shifted, task);
  }

  /**
   * Backward-bovengrens (late finish) van een externe SUCCESSOR-link (§4.5). Spiegel van
   * `externalForwardBound`: `anchorDate` is de driving-datum van de externe opvolger. Het EERSTE
   * relType-teken bepaalt mijn zijde: FS/FF ⇒ LF-grens direct; SS/SF ⇒ LS-grens (via `finishFromStart`
   * naar mijn LF vertaald). De dag-boundary-overgang zit alleen op FS (mijn finish → externe start ⇒
   * `prevWorkDayBefore`, spiegel van de forward-FS); SS/FF/SF ankeren op `prevWorkDay`. Uur-modus:
   * continue tijd ⇒ geen −1. Retourneert null voor een predecessor-link.
   */
  private externalBackwardBound(task: Task, link: ExternalLink, eng: CalendarEngine): Date | null {
    if (link.direction !== 'successor') return null;
    const anchor = this.parseIn(eng, link.anchorDate);
    if (isNaN(anchor.getTime())) return null;
    const rel = link.relType;
    const finishSide = rel === 'FS' || rel === 'FF';   // eerste teken F ⇒ mijn finish; S ⇒ mijn start
    if (eng.isHourMode) {
      const shifted = eng.addWorkingMinutesSigned(anchor, -this.externalLagMinutes(link, eng));
      return finishSide ? shifted : this.finishFromStart(eng, shifted, task);
    }
    const lag = this.externalLagDays(link);
    const base = rel === 'FS' ? eng.prevWorkDayBefore(anchor) : eng.prevWorkDay(anchor);
    const shifted = eng.addWorkingDaysSigned(base, -lag);
    return finishSide ? shifted : this.finishFromStart(eng, shifted, task);
  }

  /**
   * Vroege-zijde constraints (fase 2.3, uitgebreid 2.9 §4.1-4.3). Een harde MSO/MFO-pin
   * OVERSCHRIJFT de voorganger-druk onvoorwaardelijk (barrière, §4.2) en registreert een
   * logica-schending zodra die druk (`rawMax`, of null bij een worteltaak) later valt dan de pin
   * — dán start de taak vóór z'n voorganger klaar is. Zonder pin stapelen de PRIMAIRE en
   * SECUNDAIRE forward-constraints (SNET/FNET/MSO/MFO) als max-ondergrenzen. `hard`/`constraint2`
   * afwezig ⇒ exact de bestaande soft-tak (byte-identiek: de 319 cases kennen ze nergens).
   */
  private applyForwardConstraints(task: Task, earlyStart: Date, rawMax: Date | null, eng: CalendarEngine): Date {
    const pin = this.hardPinStart(task, eng);
    if (pin) {
      // Fase 2.10 (P1): een gevloerde/berekende voorganger-EF (bv. een niet-afgemelde startmijlpaal
      // ná de data-date-vloer) mag geen valse schending melden op een taak die al een geregistreerd
      // feit heeft dat de pin AANTOONBAAR respecteert (§ gate hieronder). Een ECHTE schending —
      // actual wijkt af van de pin, of er is nog geen feit en de logica is structureel te laat —
      // blijft gewoon vuren.
      if (rawMax && rawMax > pin && !this.hardPinRespectedByActual(task, eng)) {
        this.hardPinViolatedIds.push(task.id);
      }
      return pin;
    }
    let es = earlyStart;
    for (const cc of [task.constraint, task.constraint2]) {
      const bound = this.forwardBoundOf(task, cc, eng);
      if (bound && bound > es) es = bound;
    }
    // Externe predecessor-links (§4.5): bevroren forward-ondergrenzen, gestapeld als extra max-terms
    // (net als een SNET/FNET). Afwezig ⇒ deze lus draait niet (byte-identiek).
    if (task.externalLinks && task.externalLinks.length > 0) {
      for (const link of task.externalLinks) {
        const bound = this.externalForwardBound(task, link, eng);
        if (bound && bound > es) es = bound;
      }
    }
    return es;
  }

  /**
   * Late-zijde grenzen (fase 2.3, uitgebreid 2.9 §4.1-4.3). Een harde MSO/MFO-pin zet de late
   * finish ONVOORWAARDELIJK op de gepinde waarde (override de successor-druk) ⇒ LS=ES/LF=EF ⇒
   * tf=0 op de pin, en een strengere late-constraint verder downstream propageert zijn negatieve
   * float NIET dóór de pin heen (P6-barrière, §4.2). Zonder pin stapelen de PRIMAIRE en SECUNDAIRE
   * backward-constraints (SNLT/FNLT/MSO/MFO) + de zachte deadline als min-bovengrenzen; vroege
   * datums bewegen nooit, overschrijding wordt negatieve float.
   */
  private applyBackwardBound(task: Task, lateFinish: Date, eng: CalendarEngine): Date {
    const pinFinish = this.hardPinFinish(task, eng);
    if (pinFinish) return pinFinish;
    let lf = lateFinish;
    for (const cc of [task.constraint, task.constraint2]) {
      const bound = this.backwardBoundOf(task, cc, eng);
      if (bound && bound < lf) lf = bound;
    }
    // Externe successor-links (§4.5): bevroren backward-bovengrenzen (net als een SNLT/FNLT).
    // Afwezig ⇒ deze lus draait niet (byte-identiek).
    if (task.externalLinks && task.externalLinks.length > 0) {
      for (const link of task.externalLinks) {
        const bound = this.externalBackwardBound(task, link, eng);
        if (bound && bound < lf) lf = bound;
      }
    }
    if (task.deadline) {
      const dl = parseDate(task.deadline);
      if (!isNaN(dl.getTime())) {
        const dlW = eng.prevWorkDay(dl);
        if (dlW < lf) lf = dlW;
      }
    }
    return lf;
  }

  /**
   * ALAP (P6-semantiek, zero free float): schuif de vroege datums van ALAP-taken op met
   * hun eigen vrije speling — opvolgers bewegen per definitie niet. Draait ná de backward
   * pass; de constraint-cache van uitgaande relaties wordt geactualiseerd zodat de
   * relatie-floats en driving-markering daarna kloppen (de relatie wordt precies bindend).
   */
  private applyAlap(
    order: string[],
    earlyDates: Map<string, { es: Date; ef: Date }>,
    lateDates: Map<string, { ls: Date; lf: Date }>,
  ): void {
    for (const taskId of order) {
      const task = this.tasks.get(taskId);
      if (task?.constraint?.type !== 'ALAP') continue;
      const early = earlyDates.get(taskId);
      const late = lateDates.get(taskId);
      if (!early || !late) continue;

      const cal = this.calendarFor(task);
      const succs = this.successors.get(taskId) || [];
      let ff = Infinity;
      if (succs.length === 0) {
        ff = this.signedWorkDays(early.ef, late.lf, cal);
      } else {
        for (const seq of succs) {
          const cRaw = this.seqConstraint.get(seq.id);
          const succEarly = earlyDates.get(seq.successorId);
          const succTask = this.tasks.get(seq.successorId);
          if (!cRaw || !succEarly || !succTask) continue;
          const succCal = this.calendarFor(succTask);
          const f = succCal.workDaysBetween(succCal.nextWorkDay(cRaw), succEarly.es) - 1;
          if (f < ff) ff = f;
        }
      }
      if (!Number.isFinite(ff) || ff <= 0) continue;

      early.es = cal.addWorkingDaysSigned(early.es, ff);
      early.ef = cal.addWorkingDaysSigned(early.ef, ff);
      for (const seq of succs) {
        const succTask = this.tasks.get(seq.successorId);
        if (!succTask) continue;
        this.seqConstraint.set(
          seq.id,
          forwardConstraint(this.relDeps, early, task, seq, succTask, cal, this.calendarFor(succTask)),
        );
      }
    }
  }

  /** Effectieve lag van een relatie: dagen (via resolveEffectiveLagDays) + eenheid. De dag↔minuut-
   *  factor waarmee een `lagMinutes`-only-lag in dagen wordt uitgedrukt volgt de eenheid: WORKTIME
   *  telt in WERKuren van de VOORGANGER-kalender (§5.2), ELAPSEDTIME 24/7 in klokuren — exact de
   *  factoren die `resolveLagMinutes`/`resolveElapsedMinutes` in uur-modus gebruiken. */
  private resolveLag(seq: Sequence, predTask: Task, predEng: CalendarEngine): { days: number; unit: LagUnit } {
    const unit: LagUnit = seq.lagUnit === 'ELAPSEDTIME' ? 'ELAPSEDTIME' : 'WORKTIME';
    const hpd = unit === 'ELAPSEDTIME' ? 24 : predEng.hoursPerDay;
    return { days: resolveEffectiveLagDays(seq, predTask, hpd), unit };
  }

  private backwardPass(
    order: string[],
    earlyDates: Map<string, { es: Date; ef: Date }>,
  ): Map<string, { ls: Date; lf: Date }> {
    const results = new Map<string, { ls: Date; lf: Date }>();

    // Find project end date (latest early finish)
    let projectEnd = new Date(0);
    for (const { ef } of earlyDates.values()) {
      if (ef > projectEnd) projectEnd = ef;
    }

    // Backward pass in reverse topological order
    const reversed = [...order].reverse();

    for (const taskId of reversed) {
      const task = this.tasks.get(taskId)!;
      const succs = this.successors.get(taskId) || [];

      // Hammock (§4.4, normatief): een gevolg, geen oorzaak. GEEN backward-`min`-doorgifte; per
      // definitie `LS = ES` en `LF = EF` (⇒ tf=ff=0, kritiek-neutraal — geforceerd in computeResults).
      // De gewone min-combinatie wordt overgeslagen.
      if (task.isHammock) {
        const ed = earlyDates.get(taskId)!;
        results.set(taskId, { ls: new Date(ed.es.getTime()), lf: new Date(ed.ef.getTime()) });
        continue;
      }

      // Niets kan ná het projecteinde eindigen — dat is de bovengrens voor élke taak. Opvolger-
      // constraints kunnen de late finish alleen verder naar voren halen. (Voorheen kon een
      // Start-Start-opvolger een late finish ná het projecteinde opleveren, waardoor de
      // voorganger ten onrechte speling/niet-kritiek kreeg.)
      const predCal = this.calendarFor(task);
      let lateFinish = projectEnd;
      for (const seq of succs) {
        const succResult = results.get(seq.successorId);
        const succTask = this.tasks.get(seq.successorId);
        if (!succResult || !succTask) continue;
        // Een hammock is een gevolg, geen oorzaak (§4.4): hij legt GEEN backward-druk op zijn
        // voorgangers (drivers). Een strakke opvolger van de hammock kan zo nooit via de hammock heen
        // negatieve float op de start-/finish-driver leggen — de driver ziet alleen zijn eigen
        // (niet-hammock) opvolgers.
        if (succTask.isHammock) continue;
        const constraintDate = backwardConstraint(
          this.relDeps, succResult, seq, task, succTask, predCal, this.calendarFor(succTask),
        );
        if (constraintDate < lateFinish) {
          lateFinish = constraintDate;
        }
      }

      // Late-zijde datum-constraints + deadline (fase 2.3) als extra bovengrens.
      lateFinish = this.applyBackwardBound(task, lateFinish, predCal);

      const lateStart = this.subDuration(predCal, lateFinish, task);

      results.set(taskId, { ls: lateStart, lf: lateFinish });
    }

    return results;
  }

}
