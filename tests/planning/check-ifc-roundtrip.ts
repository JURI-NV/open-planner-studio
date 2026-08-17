// IFC-ROUND-TRIP-CONTRACT (fase 3, eerste helft van P11 uit docs/superpowers/modulariteit-audit.md,
// bevinding A2/F2). IFC 4.3 is het NATIVE bestandsformaat: opslaan = writeIFC, laden = readIFC. Het
// impliciete contract "alle domeindata moet door de IFC-laag round-trippen" had géén test — twee
// dataverlies-bugs (B4: IFCPanel schreef zonder baselines; F6: open-paden namen structuur niet over)
// waren daardoor onzichtbaar. Deze batterij maakt dat contract expliciet en bewaakt het permanent.
//
// AANPAK
//   1. Eén MAXIMAAL bevolkte fixture: elk veld van elk domeintype met een niet-default,
//      onderscheidende waarde (Task/TaskTime incl. constraints/actuals/notes/hammock/externalLinks/
//      activity-codes/custom-fields, Sequence alle 4 types + lag-varianten, Resource alle types +
//      curves + capaciteit, WorkCalendar + generation + shift + holidays, Project incl.
//      schedulingOptions/statusDate/progressMode, ActivityCode/CustomField-definities, Baselines).
//   2. COMPILE-AFDWINGING, op TWEE plekken (bevinding K10a — één was niet genoeg):
//      (2a) de kern-fixtures zijn `satisfies Required<...>` — een nieuw domeinveld moet een WAARDE
//           krijgen. Twee types kunnen NIET direct `satisfies Required<>` (mutueel-exclusieve
//           velden) → type-only getuige, zie WITNESS hieronder.
//      (2b) de VERGELIJKING (`canon`) is sleutel-gedreven: `satisfies CanonSpec<X>` =
//           `Record<keyof X, ...>` per domeintype — een nieuw veld moet ook een EXPLICIETE keuze
//           krijgen (meedoen of gemotiveerd overslaan). Zonder (2b) was de batterij NIET
//           zelf-uitbreidend: een nieuw veld kreeg wel een fixture-waarde maar stond in geen enkele
//           hand-opgesomde canon-literal, en round-tripte dus stil nul bytes. Zie het blok boven
//           `canon` voor de meting.
//      Beide leunen op tests/planning/tsconfig.check.json, want de hoofd-tsconfig sluit tests/ uit.
//   3. writeIFC(fixture) → readIFC → diepe, veld-voor-veld-vergelijking van de HELE ImportResult.
//      Gegenereerde ids (task/resource/sequence/kalender regenereren bij inlezen) worden
//      genormaliseerd via NATUURLIJKE SLEUTELS (wbsCode/naam) i.p.v. letterlijk vergeleken; alle
//      kruisverwijzingen (parentId/childIds/pred/succ/calendarId/taskId/resourceId/activityCodes)
//      worden naar die sleutels herschreven. Datum-normalisaties (het 07:00-anker) round-trippen
//      naar dag-datums en zijn in de fixture al in dag-vorm gekozen.
//   4. IDEMPOTENTIE: een TWEEDE round-trip (write→read→write→read) moet byte-stabiel zijn t.o.v. de
//      eerste (canon(rt1) === canon(rt2)).
//   5. KNOWN_GAPS: velden die NIET overleven, expliciet geclassificeerd + getest-als-bekend (elke
//      gap-assertie bewijst dat het verlies er NOG steeds is; verdwijnt het verlies — iemand fixt de
//      writer/reader — dan FAALT de assertie en herinnert die eraan de gap uit KNOWN_GAPS te halen).
//      GEEN productiecode-fix in dit pakket; de gaps zijn gerapporteerd aan de opdrachtgever.
//
// KNOWN_GAPS (write→read verlies), classificatie (b) bewuste normalisatie. De acht (a)-gaps
// (project.author/company/description/createdAt/modifiedAt, task.color/resourceIds,
// task.time.interferingFloat/isNearCritical/floatPath) zijn in werkpakket H2 GEDICHT — ze lopen nu
// door de echte round-trip-vergelijking. author/company via de IFCPERSON/IFCORGANIZATION-keten;
// description via de IFCWORKPLAN/IFCPROJECT.Description-slot; createdAt/modifiedAt via het
// OPS_ProjectSettings-pset; color via OPS_TaskAppearance; resourceIds herbouwd uit de assignments
// (enige bron van waarheid, geen dubbele opslag); de drie analyse-velden via OPS_Analysis. Wat
// bewust NIET round-trippt:
//   (b) resource.availability — @deprecated migratie-alleen veld; writer schrijft 'm bewust niet.
//   (b) task.time.durationMinutes / remainingMinutes — UUR-modus-velden; niet van toepassing in dag-modus
//                             (deze fixture is dag-modus). hun uur-round-trip is gedekt door
//                             tests/planning/check-adapters-hours.ts.
//   (b) resourceCalendars: de projectkalender-entry wordt bewust NIET in de bibliotheek gedupliceerd
//                             (writer filtert 'm eruit; reader geeft de bibliotheek zonder projectkalender).
//   project.startDate/endDate was hier ook zo'n (b)-normalisatie (→taak-span). Dat is GEDICHT: de
//   contractuele datums hebben nu eigen opslag in het OPS_ProjectSettings-pset en lopen door de
//   echte round-trip-vergelijking; de fixture kiest ze bewust LOS van de taak-span, zodat de
//   vergelijking het verschil ook echt kan zien. IFCWORKPLAN.StartTime/FinishTime blijft de
//   AFGELEIDE plan-omvang dragen. Zie blok (4) onderaan voor leeg-geval en legacy-terugval.
//   Overige bewuste (b)-normalisaties die de fixture al in genormaliseerde vorm kiest (dus GEEN
//   afwijking geven): ids regenereren (→ natuurlijke sleutels), project.calendarId→'cal-default',
//   ASAP-constraint niet geschreven, shift FIRST→undefined,
//   lagUnit WORKTIME→undefined, curve UNIFORM→undefined, progressMode RETAINED_LOGIC→undefined,
//   completion→1 decimaal, dag-duren integer, hoursPerDay=eind−startuur, priority 500 niet geschreven.

import { writeIFC } from '@/services/ifc/ifcWriter';
import { readIFC } from '@/services/ifc/ifcReader';
import { RECORDED_SLOT_KEYS } from '@/services/ifc/ifcTaskSlots';
import type { Task, TaskTime, ExternalLink } from '@/types/task';
import type { Sequence } from '@/types/sequence';
import type { Resource, ResourceAssignment } from '@/types/resource';
import type { Project, SchedulingOptions } from '@/types/project';
import type { WorkCalendar, CalendarGeneration, Holiday } from '@/types/calendar';
import type { ActivityCodeType, ActivityCodeValue, CustomFieldDef } from '@/types/structure';
import type { Baseline, BaselineTask } from '@/types/baseline';
import type { ImportResult } from '@/services/importTypes';

// tests/ valt buiten de hoofd-tsconfig; process is niet via @types/node beschikbaar in de
// dedicated round-trip-tsconfig (types:[]). Minimale, botsingvrije declaratie.
declare const process: { exit(code: number): never };

let checks = 0;
let fails = 0;
function assert(cond: boolean, msg: string): void {
  checks++;
  if (!cond) { fails++; console.log(`   XX ${msg}`); }
}

// ════════════════════════════════════════════════════════════════════════════════════════════════
//  FIXTURE — maximaal bevolkt, dag-modus. Kern-objecten zijn `satisfies Required<...>` zodat een
//  nieuw domeinveld hier een compile-fout geeft.
// ════════════════════════════════════════════════════════════════════════════════════════════════

// ── Kalenders ───────────────────────────────────────────────────────────────────────────────────
// Dag-kalenders: hoursPerDay = workEndHour − workStartHour (anders normaliseert de reader het weg),
// generation volledig (ruleSetId/region/breakChoice/jaren), niet-default shift, ≥1 holiday (anders
// houdt de reader de default-NL-holidays van createDefaultCalendar).
const PROJ_GEN: Required<CalendarGeneration> = {
  ruleSetId: 'NL', region: 'NB', breakChoice: 'zuid', generatedFromYear: 2025, generatedToYear: 2028,
};
const LIB_GEN: Required<CalendarGeneration> = {
  ruleSetId: 'DE', region: 'BY', breakChoice: 'noord', generatedFromYear: 2024, generatedToYear: 2027,
};
const projCal = {
  id: 'projcal', name: 'Projectkalender', description: 'Ma-vr 07-15 dag',
  workDays: [1, 2, 3, 4, 5], workStartHour: 7, workEndHour: 15, hoursPerDay: 8,
  holidays: [
    { name: 'Kerst', startDate: '2026-12-25', endDate: '2026-12-26' },
    { name: 'Nieuwjaar', startDate: '2027-01-01', endDate: '2027-01-01' },
  ],
  generation: PROJ_GEN, shift: 'SECOND',
  libraryOrigin: { companyId: 'c-fixture', libraryItemId: 'lib-projcal', poolVersion: 4 },
} satisfies Omit<Required<WorkCalendar>, 'workTime'>;
const libCal = {
  id: 'libcal', name: 'Sublokatie kalender', description: 'Ma-za 07-15',
  workDays: [1, 2, 3, 4, 5, 6], workStartHour: 7, workEndHour: 15, hoursPerDay: 8,
  holidays: [{ name: 'Bouwvakdag', startDate: '2026-07-27', endDate: '2026-07-31' }],
  generation: LIB_GEN, shift: 'THIRD',
  libraryOrigin: { companyId: 'c-fixture', libraryItemId: 'lib-libcal', poolVersion: 4 },
} satisfies Omit<Required<WorkCalendar>, 'workTime'>;

// Type-only VOLLEDIGHEIDSGETUIGE voor WorkCalendar: `workTime` aanwezig ⇒ UUR-kalender, wat de
// dag-modus-round-trip zou ontsporen (durationMinutes/echte tijden). De veld-volledigheid van
// WorkCalendar bewaken we daarom hier op typeniveau; de round-trip-fixtures blijven dag-modus. De
// uur-modus-round-trip (workTime/banden) is gedekt door check-adapters-hours.ts.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _CALENDAR_FIELD_WITNESS = {
  id: 'w', name: 'w', description: 'w', workDays: [1, 2, 3, 4, 5],
  workStartHour: 8, workEndHour: 16, hoursPerDay: 8, holidays: [],
  generation: PROJ_GEN, shift: 'FIRST',
  libraryOrigin: { companyId: 'c-fixture', libraryItemId: 'lib-witness', poolVersion: 1 },
  workTime: { byWeekday: { 1: [{ start: 480, end: 960 }], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [] } },
} satisfies Required<WorkCalendar>;
// `void`: de getuige bestaat puur op typeniveau, maar telt zo ook onder `noUnusedLocals` als
// gebruikt (tsconfig.tests.json checkt dit bestand mét die vlag).
void _CALENDAR_FIELD_WITNESS;

// ── Structuurdefinities (round-trippen verliesloos via OPS_StructureMeta-JSON, incl. ids/kleuren) ─
const activityCodeTypes = [
  {
    id: 'act-loc', name: 'Locatie', values: [
      { id: 'v-b1', code: 'B1', description: 'Blok 1', color: '#ff0000' },
      { id: 'v-b2', code: 'B2', description: 'Blok 2', color: '#00ff00' },
    ],
  },
  {
    id: 'act-dis', name: 'Discipline', values: [
      { id: 'v-ruw', code: 'RUW', description: 'Ruwbouw', color: '#0000ff' },
      { id: 'v-afb', code: 'AFB', description: 'Afbouw', color: '#ffff00' },
    ],
  },
] satisfies ActivityCodeType[];
const customFieldDefs = [
  { id: 'cf-text', name: 'Tekstveld', type: 'text' },
  { id: 'cf-num', name: 'Getalveld', type: 'number' },
  { id: 'cf-int', name: 'Integerveld', type: 'integer' },
  { id: 'cf-cost', name: 'Kostenveld', type: 'cost' },
  { id: 'cf-date', name: 'Datumveld', type: 'date' },
  { id: 'cf-bool', name: 'Booleanveld', type: 'boolean' },
] satisfies CustomFieldDef[];

// ── Taken ─────────────────────────────────────────────────────────────────────────────────────
// TP: summary-parent (childIds). TM: KITCHEN-SINK milestone (`satisfies Required<Task>` +
// Required<TaskTime>) — draagt élk Task/TaskTime-veld. Een milestone omdat milestoneKind/mandatory
// alleen voor milestones geschreven worden; scheduleDuration is dan per definitie 0. TX/TY: gewone
// leaf-taken (duur>0, relaties, assignments).
const plainTime = (start: string, finish: string, dur: number): TaskTime => ({
  durationType: 'WORKTIME', scheduleDuration: dur,
  scheduleStart: start, scheduleFinish: finish,
  earlyStart: start, earlyFinish: finish, lateStart: start, lateFinish: finish,
  freeFloat: 0, totalFloat: 0, isCritical: false, completion: 0,
});

const TP: Task = {
  id: 't-p', name: 'Fasering', description: 'Hoofdfase', wbsCode: '1',
  taskType: 'CONSTRUCTION', status: 'NOT_STARTED', isMilestone: false, priority: 500,
  parentId: null, childIds: ['t-m', 't-x', 't-y'], resourceIds: [],
  time: plainTime('2026-07-06', '2026-07-24', 14),
};

const TM = {
  id: 't-m', name: 'Oplevering', description: 'Contractuele opleverdatum', wbsCode: '1.1',
  taskType: 'INSTALLATION', status: 'COMPLETED', isMilestone: true, milestoneKind: 'FINISH',
  mandatory: true, priority: 700, levelingDelay: 3, parentId: 't-p', childIds: [],
  resourceIds: [], // milestone zonder assignments ⇒ afgeleide resourceIds is leeg (H2-fix)
  color: '#abcdef', // round-trippt via OPS_TaskAppearance (H2-fix)
  isHammock: true,
  activityCodes: { 'act-loc': 'v-b1', 'act-dis': 'v-ruw' },
  customFields: {
    'cf-text': 'hallo', 'cf-num': 3.14, 'cf-int': 7, 'cf-cost': 1250.5, 'cf-date': '2026-08-01', 'cf-bool': true,
  },
  constraint: { type: 'MSO', date: '2026-07-15', hard: true },
  constraint2: { type: 'FNLT', date: '2026-07-20' },
  // `satisfies Required<ExternalLink>`: dezelfde volledigheids-afdwinging als de andere getuigen in
  // dit bestand — een nieuw veld op ExternalLink geeft hier een compile-fout i.p.v. stil buiten de
  // round-trip te vallen. (De `ExternalLink`-import stond er al, maar werd nergens gebruikt.)
  externalLinks: [{
    id: 'e1', direction: 'predecessor', relType: 'FS', lagDays: 2, lagMinutes: 120,
    anchorDate: '2026-07-01',
    sourceRef: { projectId: 'p2', projectName: 'Ander project', taskId: 't9', taskName: 'Levering', filePath: '/x/ander.ifc' },
    sourceMissing: false,
  } satisfies Required<ExternalLink>],
  deadline: '2026-07-22',
  calendarId: 'libcal',
  notes: [{ id: 'n1', text: 'Keuring', done: true }, { id: 'n2', text: 'Sleuteloverdracht', done: false }],
  time: {
    durationType: 'WORKTIME', scheduleDuration: 0,
    durationMinutes: 480,           // (b) uur-modus-gap
    scheduleStart: '2026-07-24', scheduleFinish: '2026-07-24',
    earlyStart: '2026-07-24', earlyFinish: '2026-07-24', lateStart: '2026-07-24', lateFinish: '2026-07-24',
    freeFloat: 2, totalFloat: 3, isCritical: true,
    interferingFloat: 1.5, isNearCritical: true, floatPath: 1, // (a) analyse-gaps
    actualStart: '2026-07-24', actualFinish: '2026-07-24', actualDuration: 0,
    remainingTime: 0, remainingMinutes: 0, // remainingMinutes: (b) uur-modus-gap
    completion: 1,
  },
} satisfies Required<Task> & { time: Required<TaskTime> };

const TX: Task = {
  id: 't-x', name: 'Ruwbouw', description: 'Casco', wbsCode: '1.2',
  taskType: 'DEMOLITION', status: 'NOT_STARTED', isMilestone: false, priority: 500,
  parentId: 't-p', childIds: [], resourceIds: ['r-mem'], // afgeleid uit a1/a2 (H2-fix)
  time: plainTime('2026-07-06', '2026-07-10', 5),
};
const TY: Task = {
  id: 't-y', name: 'Installaties', description: 'E+W', wbsCode: '1.3',
  taskType: 'LOGISTIC', status: 'NOT_STARTED', isMilestone: false, priority: 500,
  parentId: 't-p', childIds: [], resourceIds: ['r-eq'], // afgeleid uit a3 (H2-fix)
  time: plainTime('2026-07-13', '2026-07-17', 5),
};
const tasks: Task[] = [TP, TM, TX, TY];

// ── Relaties: alle 4 types + lag-varianten (vaste dagen / ELAPSEDTIME / procent / geen lag) ──────
// `Sequence` kan NIET direct `satisfies Required<Sequence>`: lagDays/lagMinutes/lagPercent zijn
// mutueel exclusief (lagPercent wint altijd in de writer en zou lagDays overschrijven). De
// veld-volledigheid bewaken we via een type-only getuige; de round-trip-relaties zijn realistisch.
const sequences: Sequence[] = [
  { id: 's1', predecessorId: 't-x', successorId: 't-m', type: 'FINISH_START', lagDays: 2, lagUnit: 'ELAPSEDTIME' },
  { id: 's2', predecessorId: 't-x', successorId: 't-y', type: 'START_START', lagDays: 0, lagPercent: 50 },
  { id: 's3', predecessorId: 't-y', successorId: 't-m', type: 'FINISH_FINISH', lagDays: 1 },
  { id: 's4', predecessorId: 't-x', successorId: 't-m', type: 'START_FINISH', lagDays: 0 },
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _SEQUENCE_FIELD_WITNESS = {
  id: 'w', predecessorId: 'a', successorId: 'b', type: 'FINISH_START',
  lagDays: 1, lagMinutes: 60, lagUnit: 'WORKTIME', lagPercent: 25,
} satisfies Required<Sequence>;
void _SEQUENCE_FIELD_WITNESS;

// ── Resources: alle types + ploeg-nesting + capaciteit/tarief/eenheid/tijd-gefaseerd ─────────────
const RCrew: Resource = { id: 'r-crew', name: 'Ploeg Alpha', type: 'CREW', description: 'Hoofdploeg', maxUnits: 1 };
const RMember = {
  id: 'r-mem', name: 'Timmerman Jan', type: 'LABOR', description: 'Ervaren timmerman',
  costPerHour: 42.5, availability: 0.9, // availability: (b) deprecated gap
  maxUnits: 3, calendarId: 'libcal',
  availabilitySteps: [{ from: '2026-07-06', maxUnits: 3 }, { from: '2026-07-20', maxUnits: 2 }],
  unitOfMeasure: 'uur', parentId: 'r-crew',
  libraryOrigin: { companyId: 'c-fixture', libraryItemId: 'lib-res1', poolVersion: 4 },
} satisfies Required<Resource>;
const REquip: Resource = { id: 'r-eq', name: 'Torenkraan', type: 'EQUIPMENT', description: 'Liebherr 200', maxUnits: 2 };
const RMat: Resource = { id: 'r-mat', name: 'Beton C30', type: 'MATERIAL', description: 'Stortbeton', maxUnits: 1, unitOfMeasure: 'm3' };
const RSub: Resource = { id: 'r-sub', name: 'Installateur BV', type: 'SUBCONTRACTOR', description: 'Onderaannemer', maxUnits: 1 };
const resources: Resource[] = [RCrew, RMember, REquip, RMat, RSub];

// ── Toewijzingen: incl. twee assignments van DEZELFDE resource op één taak (M3-uniciteit) + curve ─
const A1 = { id: 'a1', taskId: 't-x', resourceId: 'r-mem', unitsPerDay: 2, curve: 'BELL' } satisfies Required<ResourceAssignment>;
const assignments: ResourceAssignment[] = [
  A1,
  { id: 'a2', taskId: 't-x', resourceId: 'r-mem', unitsPerDay: 1, curve: 'LATE_PEAK' },
  { id: 'a3', taskId: 't-y', resourceId: 'r-eq', unitsPerDay: 1 }, // geen curve → UNIFORM-normalisatie
];

// ── Project incl. schedulingOptions/statusDate/progressMode/wbsAutoNumber ─────────────────────────
const SCHED_OPTS = {
  lagCalendar: 'successor',
  criticalDefinition: { mode: 'longestPath', threshold: -1 },
  totalFloatMode: 'finish',
  makeOpenEndedCritical: true,
  nearCriticalThreshold: 3,
  floatPaths: { enabled: true, method: 'TOTAL_FLOAT', maxPaths: 5 },
} satisfies Required<SchedulingOptions>;
const project = {
  id: 'proj-1', name: 'Nieuwbouw Testtoren', description: 'Beschrijving X', // description: (a) gap
  // CONTRACTUELE project-datums, bewust LOS van de taak-span (die loopt 2026-07-06 … 2026-07-24).
  // Vielen ze samen — zoals vóór deze fixture-fix — dan bewees de vergelijking hieronder NIETS:
  // de afgeleide planningsdatum uit IFCWORKPLAN was per constructie gelijk aan de contractuele.
  startDate: '2026-06-15', endDate: '2026-09-30', calendarId: 'projcal',
  createdAt: '2026-01-01T00:00:00.000Z', modifiedAt: '2026-06-01T00:00:00.000Z', // (a) gaps
  author: 'Ir. Testz', company: 'Bouw BV',                                       // (a) gaps
  wbsAutoNumber: true, statusDate: '2026-07-25', progressMode: 'PROGRESS_OVERRIDE',
  companyId: 'c-fixture', companyName: 'Fixture Bouw BV',
  schedulingOptions: SCHED_OPTS,
} satisfies Required<Project> & { schedulingOptions: Required<SchedulingOptions> };

// ── Baselines (round-trippen verliesloos via OPS_Baselines-JSON; taskId remapt via GlobalId) ──────
const baselines = [{
  id: 'bl-1', name: 'Nulmeting', createdAt: '2026-07-01T09:00:00.000Z',
  tasks: [
    { taskId: 't-m', start: '2026-07-24', finish: '2026-07-24', duration: 0, isMilestone: true, milestoneKind: 'FINISH' },
    { taskId: 't-x', start: '2026-07-06', finish: '2026-07-10', duration: 5, isMilestone: false, milestoneKind: 'START' },
  ],
  projectEnd: '2026-07-24', projectDuration: 14,
}] satisfies Baseline[];

export const fixture: ImportResult = {
  project, calendar: projCal, tasks, sequences, resources, assignments,
  resourceCalendars: [projCal, libCal], // projCal-entry wordt door de writer eruit gefilterd (b)
  activityCodeTypes, customFieldDefs, baselines, activeBaselineId: 'bl-1',
};

// ════════════════════════════════════════════════════════════════════════════════════════════════
//  CANONICALISATIE — vervang volatiele ids door natuurlijke sleutels, herschrijf kruisverwijzingen,
//  strip de KNOWN_GAPS-velden (aan BEIDE zijden, zodat ze geen mismatch geven; het VERLIES zelf
//  bewijzen we los in blok (3)). Levert een puur, vergelijkbaar objectboom.
//
//  SLEUTEL-GEDREVEN (bevinding K10a). De kop van dit bestand claimde dat de batterij ZELF-UITBREIDEND
//  is: een nieuw domeinveld geeft een compile-fout, dus de round-trip bewaakt het automatisch. Dat
//  klopte maar half — de FIXTURE was afgedwongen (`satisfies Required<...>`), de VERGELIJKING niet.
//  `canon` bouwde met de hand opgesomde object-literals; een nieuw veld stond daar simpelweg niet in
//  en werd dus nooit vergeleken. Gemeten (het onderzoek achter K10a): een veld toevoegen aan `Task`,
//  de twee compile-fouten oplossen die dat gaf (`src/engine/moveProject.ts` + de fixture hierboven)
//  en reader/writer NIET aanraken gaf gewoon `OK ifc-roundtrip: alle checks groen`, exit 0. Het veld
//  round-tripte nul bytes en geen enkele poort merkte het — exact de bugklasse (stil veldverlies)
//  waarvoor deze batterij bestaat.
//
//  Daarom is élke projectie hieronder een `satisfies CanonSpec<X>`-tabel, d.w.z.
//  `Record<keyof X, ...>`: dezelfde compile-time volledigheidstruc als `TASK_VERDICTS` in
//  `src/engine/moveProject.ts` en `DOCUMENT_FIELDS` in `src/state/documentContract.ts`. Elke sleutel
//  draagt een EXPLICIETE keuze — meedoen zoals hij is (`KEEP`), meedoen in geprojecteerde vorm
//  (`{ get, as? }`), of bewust niet vergelijken (`{ skip: '<reden>' }`, reden verplicht). Een nieuw
//  veld zonder cel geeft een compile-fout onder tests/planning/tsconfig.check.json.
// ════════════════════════════════════════════════════════════════════════════════════════════════

type Any = Record<string, unknown>;
const def = <T>(v: T | undefined): v is T => v !== undefined;

/** Volatiele id → leesbare, stabiele sleutel. Ids regenereren bij het inlezen, dus élke verwijzing
 *  naar een ander object wordt via deze kaarten naar een natuurlijke sleutel herschreven. */
interface Keys {
  /** kalender-id → kalendernaam (undefined blijft undefined: "projectkalender"). */
  cal(id: string | undefined): string | undefined;
  /** taak-id → wbsCode. */
  task(id: string): string;
  /** resource-id → resourcenaam. */
  res(id: string): string;
  /** activity-code-TYPE-id → typenaam. */
  codeType(id: string): string;
  /** activity-code-WAARDE-id → code. */
  codeValue(id: string): string;
  /** custom-field-definitie-id → veldnaam. */
  fieldDef(id: string): string;
}

/** "Doe mee aan de vergelijking, ongewijzigd, onder je eigen naam." */
const KEEP = { keep: true } as const;

/** Eén cel in een canon-tabel. De drie vormen zijn de enige toegestane keuzes per veld. */
type CanonCell<T> =
  | typeof KEEP
  | { readonly skip: string }                                     // reden verplicht
  | { readonly as?: string; readonly get: (o: T, k: Keys) => unknown };

/** DE tabelvorm: één cel per sleutel van het domeintype — geen sleutel mag ontbreken. */
type CanonSpec<T> = Record<keyof T, CanonCell<T>>;

/** Bouw het vergelijkbare object sleutel-voor-sleutel uit de tabel. */
function canonize<T extends object>(spec: CanonSpec<T>, o: T, k: Keys): Any {
  const src = o as unknown as Any;
  const out: Any = {};
  for (const key of Object.keys(spec) as (keyof T & string)[]) {
    const cell = spec[key];
    if ('skip' in cell) continue;
    if ('keep' in cell) out[key] = src[key];
    else out[cell.as ?? key] = cell.get(o, k);
  }
  return out;
}

// ── De veldtabellen ─────────────────────────────────────────────────────────────────────────────

const HOLIDAY_CANON = {
  name: KEEP, startDate: KEEP, endDate: KEEP,
} satisfies CanonSpec<Holiday>;

const CALENDAR_CANON = {
  id: { skip: 'regenereert bij inlezen; de NAAM is de natuurlijke sleutel (Keys.cal)' },
  name: KEEP, description: KEEP,
  workDays: { get: (c: WorkCalendar) => [...c.workDays] },
  workStartHour: KEEP, workEndHour: KEEP, hoursPerDay: KEEP,
  holidays: {
    get: (c: WorkCalendar, k: Keys) => [...c.holidays]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(h => canonize(HOLIDAY_CANON, h, k)),
  },
  generation: KEEP,
  workTime: { skip: 'aanwezig ⇒ UUR-kalender; deze fixture is dag-modus. Uur-round-trip: check-adapters-hours.ts' },
  shift: KEEP,
  libraryOrigin: KEEP,   // B1.1: herkomststempel round-trippt via OPS_LibraryOrigin
} satisfies CanonSpec<WorkCalendar>;

const TIME_CANON = {
  durationType: KEEP, scheduleDuration: KEEP,
  durationMinutes: { skip: '(b) UUR-modus-veld, n.v.t. in dag-modus; gedekt door check-adapters-hours.ts' },
  scheduleStart: KEEP, scheduleFinish: KEEP,
  earlyStart: KEEP, earlyFinish: KEEP, lateStart: KEEP, lateFinish: KEEP,
  freeFloat: KEEP, totalFloat: KEEP, isCritical: KEEP,
  // De drie analyse-velden round-trippen sinds pakket K BEWUST niet meer mee: de writer schrijft
  // `OPS_Analysis` niet langer omdat het pure runCPM-uitvoer is die élk laadpad herberekent (zie
  // ifcWriter.WRITTEN_PER_TASK_PSETS). Ze staan als (a)-gap in KNOWN_GAPS; het verlies zelf wordt
  // in blok (3) apart geassserteerd. De LEESkant blijft bestaande bestanden gewoon accepteren.
  interferingFloat: { skip: '(a) afgeleid; OPS_Analysis wordt sinds pakket K niet meer geschreven' },
  isNearCritical: { skip: '(a) afgeleid; OPS_Analysis wordt sinds pakket K niet meer geschreven' },
  floatPath: { skip: '(a) afgeleid; OPS_Analysis wordt sinds pakket K niet meer geschreven' },
  actualStart: KEEP, actualFinish: KEEP, actualDuration: KEEP, remainingTime: KEEP,
  remainingMinutes: { skip: '(b) UUR-modus-veld, n.v.t. in dag-modus (zie durationMinutes)' },
  completion: KEEP,
} satisfies CanonSpec<TaskTime>;

const TASK_CANON = {
  id: { skip: 'regenereert bij inlezen; wbsCode is de natuurlijke sleutel (Keys.task)' },
  name: KEEP, description: KEEP, wbsCode: KEEP, taskType: KEEP, status: KEEP,
  isMilestone: KEEP, milestoneKind: KEEP, mandatory: KEEP, priority: KEEP, levelingDelay: KEEP,
  parentId: { as: 'parent', get: (t: Task, k: Keys) => (t.parentId ? k.task(t.parentId) : null) },
  childIds: { as: 'children', get: (t: Task, k: Keys) => t.childIds.map(c => k.task(c)).sort() },
  time: { get: (t: Task, k: Keys) => canonize(TIME_CANON, t.time, k) },
  // color + resourceIds round-trippen sinds H2 (OPS_TaskAppearance resp. herbouw uit assignments).
  // resourceIds naar natuurlijke sleutels (resourcenaam) + gesorteerd (volgorde-onafhankelijk).
  resourceIds: { get: (t: Task, k: Keys) => [...t.resourceIds].map(id => k.res(id)).sort() },
  color: KEEP,
  activityCodes: {
    get: (t: Task, k: Keys) => t.activityCodes
      ? Object.fromEntries(Object.entries(t.activityCodes).map(([ty, va]) => [k.codeType(ty), k.codeValue(va)]))
      : undefined,
  },
  customFields: {
    get: (t: Task, k: Keys) => t.customFields
      ? Object.fromEntries(Object.entries(t.customFields).map(([d, v]) => [k.fieldDef(d), v]))
      : undefined,
  },
  constraint: KEEP, constraint2: KEEP, isHammock: KEEP, externalLinks: KEEP, deadline: KEEP,
  calendarId: { as: 'calendar', get: (t: Task, k: Keys) => k.cal(t.calendarId) },
  notes: KEEP,
} satisfies CanonSpec<Task>;

const SEQUENCE_CANON = {
  id: { skip: 'regenereert bij inlezen; de relatie is identificeerbaar via pred/succ/type' },
  predecessorId: { as: 'pred', get: (s: Sequence, k: Keys) => k.task(s.predecessorId) },
  successorId: { as: 'succ', get: (s: Sequence, k: Keys) => k.task(s.successorId) },
  type: KEEP, lagDays: KEEP, lagMinutes: KEEP, lagUnit: KEEP, lagPercent: KEEP,
} satisfies CanonSpec<Sequence>;

const RESOURCE_CANON = {
  id: { skip: 'regenereert bij inlezen; de NAAM is de natuurlijke sleutel (Keys.res)' },
  name: KEEP, type: KEEP, description: KEEP, costPerHour: KEEP,
  availability: { skip: '(b) @deprecated migratieveld; de writer schrijft het bewust niet (KNOWN_GAPS)' },
  maxUnits: KEEP,
  calendarId: { as: 'calendar', get: (r: Resource, k: Keys) => k.cal(r.calendarId) },
  availabilitySteps: KEEP, unitOfMeasure: KEEP,
  parentId: { as: 'parent', get: (r: Resource, k: Keys) => (r.parentId ? k.res(r.parentId) : undefined) },
  libraryOrigin: KEEP,   // B1.1: herkomststempel round-trippt via OPS_LibraryOrigin
} satisfies CanonSpec<Resource>;

const ASSIGNMENT_CANON = {
  id: { skip: 'regenereert bij inlezen; taak+resource+units identificeren de toewijzing' },
  taskId: { as: 'task', get: (a: ResourceAssignment, k: Keys) => k.task(a.taskId) },
  resourceId: { as: 'resource', get: (a: ResourceAssignment, k: Keys) => k.res(a.resourceId) },
  unitsPerDay: KEEP, curve: KEEP,
} satisfies CanonSpec<ResourceAssignment>;

const PROJECT_CANON = {
  id: { skip: 'documentinterne id; de reader genereert een eigen id, geen contractuele data' },
  name: KEEP,
  // description/author/company/createdAt/modifiedAt round-trippen sinds H2.
  description: KEEP, startDate: KEEP, endDate: KEEP,
  calendarId: { as: 'calendar', get: (p: Project, k: Keys) => k.cal(p.calendarId) },
  createdAt: KEEP, modifiedAt: KEEP, author: KEEP, company: KEEP,
  wbsAutoNumber: KEEP, statusDate: KEEP, progressMode: KEEP, schedulingOptions: KEEP,
  // B1.1: bedrijfsbinding round-trippt via OPS_CompanyBinding.
  companyId: KEEP, companyName: KEEP,
} satisfies CanonSpec<Project>;

const BASELINE_TASK_CANON = {
  taskId: { as: 'task', get: (bt: BaselineTask, k: Keys) => k.task(bt.taskId) },
  start: KEEP, finish: KEEP, duration: KEEP, isMilestone: KEEP, milestoneKind: KEEP,
} satisfies CanonSpec<BaselineTask>;

const BASELINE_CANON = {
  id: KEEP,   // baseline-ids round-trippen letterlijk mee (OPS_Baselines-JSON)
  name: KEEP, createdAt: KEEP,
  tasks: {
    get: (b: Baseline, k: Keys) => (b.tasks ?? []).map(bt => canonize(BASELINE_TASK_CANON, bt, k))
      .sort((x, y) => String(x.task).localeCompare(String(y.task))),
  },
  projectEnd: KEEP, projectDuration: KEEP,
} satisfies CanonSpec<Baseline>;

const CODE_VALUE_CANON = {
  id: { skip: 'de meta-JSON bewaart de id letterlijk; de CODE is hier de natuurlijke sleutel' },
  code: KEEP, description: KEEP, color: KEEP,
} satisfies CanonSpec<ActivityCodeValue>;

const CODE_TYPE_CANON = {
  id: { skip: 'de meta-JSON bewaart de id letterlijk; de NAAM is hier de natuurlijke sleutel' },
  name: KEEP,
  values: {
    get: (t: ActivityCodeType, k: Keys) => [...t.values]
      .sort((x, y) => x.code.localeCompare(y.code))
      .map(v => canonize(CODE_VALUE_CANON, v, k)),
  },
} satisfies CanonSpec<ActivityCodeType>;

const FIELD_DEF_CANON = {
  id: { skip: 'de meta-JSON bewaart de id letterlijk; de NAAM is hier de natuurlijke sleutel' },
  name: KEEP, type: KEEP,
} satisfies CanonSpec<CustomFieldDef>;

function canon(r: ImportResult): Any {
  const cals = [r.calendar, ...(r.resourceCalendars ?? [])];
  const calNameById = new Map(cals.map(c => [c.id, c.name]));
  const taskKeyById = new Map(r.tasks.map(t => [t.id, t.wbsCode]));
  const resNameById = new Map(r.resources.map(res => [res.id, res.name]));
  // activity-code/custom-field-id → leesbare sleutel (naam/code), voor robuustheid ook al bewaart
  // de meta-JSON de ids letterlijk.
  const typeNameById = new Map((r.activityCodeTypes ?? []).map(t => [t.id, t.name]));
  const codeById = new Map<string, string>();
  for (const t of r.activityCodeTypes ?? []) for (const v of t.values) codeById.set(v.id, v.code);
  const defNameById = new Map((r.customFieldDefs ?? []).map(d => [d.id, d.name]));

  const k: Keys = {
    cal: id => (id ? calNameById.get(id) ?? id : undefined),
    task: id => taskKeyById.get(id) ?? id,
    res: id => resNameById.get(id) ?? id,
    codeType: id => typeNameById.get(id) ?? id,
    codeValue: id => codeById.get(id) ?? id,
    fieldDef: id => defNameById.get(id) ?? id,
  };

  return {
    project: canonize(PROJECT_CANON, r.project, k),
    calendar: canonize(CALENDAR_CANON, r.calendar, k),
    resourceCalendars: (r.resourceCalendars ?? []).map(c => canonize(CALENDAR_CANON, c, k))
      .sort((a, b) => String(a.name).localeCompare(String(b.name))),
    tasks: [...r.tasks].sort((a, b) => a.wbsCode.localeCompare(b.wbsCode)).map(t => canonize(TASK_CANON, t, k)),
    sequences: [...r.sequences].map(s => canonize(SEQUENCE_CANON, s, k))
      .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
    resources: [...r.resources].sort((a, b) => a.name.localeCompare(b.name)).map(res => canonize(RESOURCE_CANON, res, k)),
    assignments: [...r.assignments].map(a => canonize(ASSIGNMENT_CANON, a, k))
      .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))),
    activityCodeTypes: [...(r.activityCodeTypes ?? [])]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(t => canonize(CODE_TYPE_CANON, t, k)),
    customFieldDefs: [...(r.customFieldDefs ?? [])]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(d => canonize(FIELD_DEF_CANON, d, k)),
    baselines: [...(r.baselines ?? [])].map(b => canonize(BASELINE_CANON, b, k))
      .sort((a, b) => String(a.id).localeCompare(String(b.id))),
    activeBaselineId: r.activeBaselineId ?? null,
  };
}

/** Recursief diepe vergelijking met pad-rapportage; undefined ≡ afwezig (canon dropt gestripte gaps). */
function collectDiffs(path: string, a: unknown, b: unknown, out: string[]): void {
  if (Array.isArray(a) || Array.isArray(b)) {
    const aa = Array.isArray(a) ? a : [];
    const bb = Array.isArray(b) ? b : [];
    if (aa.length !== bb.length) out.push(`${path}: array-lengte ${aa.length} ≠ ${bb.length}`);
    for (let i = 0; i < Math.max(aa.length, bb.length); i++) collectDiffs(`${path}[${i}]`, aa[i], bb[i], out);
    return;
  }
  const ao = a && typeof a === 'object' ? a as Any : undefined;
  const bo = b && typeof b === 'object' ? b as Any : undefined;
  if (ao || bo) {
    const keys = new Set([...Object.keys(ao ?? {}), ...Object.keys(bo ?? {})]);
    for (const k of [...keys].sort()) {
      const av = ao?.[k];
      const bv = bo?.[k];
      if (av === undefined && bv === undefined) continue;
      collectDiffs(path ? `${path}.${k}` : k, av, bv, out);
    }
    return;
  }
  if (a !== b) out.push(`${path}: verwacht ${JSON.stringify(a)} — kreeg ${JSON.stringify(b)}`);
}

// ════════════════════════════════════════════════════════════════════════════════════════════════
//  DE CHECK
// ════════════════════════════════════════════════════════════════════════════════════════════════

// (1) Round-trip + veld-voor-veld. `expected` = de fixture met de bewuste (b)-normalisaties die het
//     canon-model niet al dekt: de projectkalender-entry uit de bibliotheek filteren (writer dedupt).
const expectedInput: ImportResult = { ...fixture, resourceCalendars: (fixture.resourceCalendars ?? []).filter(c => c.id !== fixture.project.calendarId) };
const rt1 = readIFC(writeIFC(fixture));
const rt2 = readIFC(writeIFC(rt1));

{
  const diffs: string[] = [];
  collectDiffs('', canon(expectedInput), canon(rt1), diffs);
  assert(diffs.length === 0, `round-trip-afwijkingen (${diffs.length}):\n${diffs.map(d => `        - ${d}`).join('\n')}`);

  // (1b) De aanwezigheidsregistratie (§9r) rust op de writer-conventie "altijd een waarde, nooit
  // `$`" voor de rekenslots. Een door OPS zelf geschreven bestand moet dus ALLE zeven rekenslots
  // als aanwezig melden — schrijft de writer later ooit "alleen wat gezet is" over deze slots heen,
  // dan zakt "datums zoals opgeslagen" stil terug op herberekenen, met een verder groene suite.
  assert(rt1.tasks.every(t => (rt1.recordedFields?.[t.id] ?? []).length === RECORDED_SLOT_KEYS.length),
    '(1b) een door OPS zelf geschreven bestand moet ALLE rekenslots als aanwezig melden');
}

// (2) Idempotentie: tweede round-trip byte-stabiel t.o.v. de eerste (normalisatie is stabiel).
{
  const diffs: string[] = [];
  collectDiffs('', canon(rt1), canon(rt2), diffs);
  assert(diffs.length === 0, `idempotentie-afwijkingen (${diffs.length}):\n${diffs.map(d => `        - ${d}`).join('\n')}`);
}

// (3) KNOWN_GAPS — getest-als-bekend: elke assertie bewijst dat het verlies er NOG is. Faalt er één,
//     dan is de gap gedicht → haal 'm uit KNOWN_GAPS en neem 'm op in de round-trip-vergelijking.
{
  const tByWbs = (r: ImportResult, wbs: string) => r.tasks.find(t => t.wbsCode === wbs)!;
  const rMem = rt1.resources.find(r => r.name === 'Timmerman Jan')!;
  const tmOut = tByWbs(rt1, '1.1'); // Oplevering (kitchen-sink)
  const txOut = tByWbs(rt1, '1.2'); // Ruwbouw

  // De gaps author/company/description/createdAt/modifiedAt/color/resourceIds zijn in H2 gedicht —
  // die lopen nu door de echte round-trip-vergelijking hierboven.
  //
  // (a) HEROPEND in pakket K: interferingFloat/isNearCritical/floatPath. De writer schrijft de
  // `OPS_Analysis`-pset bewust niet meer — het is pure runCPM-uitvoer zonder gebruikersinvoer, die
  // élk laadpad direct herberekent (gemeten: 589/589 taken bit-exact identiek na runCPM), en hij
  // kostte ~157 kB over de publieke voorbeeldset plus ~21% van elke auto-save-schrijfactie.
  // Deze drie asserties bewijzen dat het verlies er is én bedoeld is: gaat er één falen, dan
  // schrijft iemand de pset weer en moet dit besluit opnieuw gewogen worden (niet de assert
  // aanpassen). De LEESkant is ongemoeid: bestaande bestanden mét de pset laden gewoon.
  assert(tmOut.time.interferingFloat === undefined && def(TM.time.interferingFloat), '(a) time.interferingFloat — afgeleid, OPS_Analysis niet meer geschreven');
  assert(tmOut.time.isNearCritical === undefined && def(TM.time.isNearCritical), '(a) time.isNearCritical — afgeleid, OPS_Analysis niet meer geschreven');
  assert(tmOut.time.floatPath === undefined && def(TM.time.floatPath), '(a) time.floatPath — afgeleid, OPS_Analysis niet meer geschreven');
  assert(tmOut.time.durationMinutes === undefined && def(TM.time.durationMinutes), '(b) time.durationMinutes n.v.t. in dag-modus');
  assert(tmOut.time.remainingMinutes === undefined && def(TM.time.remainingMinutes), '(b) time.remainingMinutes n.v.t. in dag-modus');
  assert(rMem.availability === undefined && def(RMember.availability), '(b) resource.availability (deprecated) niet geschreven');
  void txOut;
}

// (4) B1 (§6) — projectbinding + herkomststempels expliciet: round-trippen door het project-IFC.
{
  assert(rt1.project.companyId === 'c-fixture', 'project.companyId round-trip');
  assert(rt1.project.companyName === 'Fixture Bouw BV', 'project.companyName round-trip');
  const rMem = rt1.resources.find(r => r.name === 'Timmerman Jan')!;
  assert(rMem.libraryOrigin?.companyId === 'c-fixture'
    && rMem.libraryOrigin?.libraryItemId === 'lib-res1'
    && rMem.libraryOrigin?.poolVersion === 4, 'resource.libraryOrigin round-trip');
  const rtProjCal = rt1.calendar;
  assert(rtProjCal.libraryOrigin?.companyId === 'c-fixture'
    && rtProjCal.libraryOrigin?.libraryItemId === 'lib-projcal'
    && rtProjCal.libraryOrigin?.poolVersion === 4, 'projectkalender.libraryOrigin round-trip');
  const rtLibCal = (rt1.resourceCalendars ?? []).find(c => c.name === 'Sublokatie kalender')!;
  assert(rtLibCal.libraryOrigin?.companyId === 'c-fixture'
    && rtLibCal.libraryOrigin?.libraryItemId === 'lib-libcal'
    && rtLibCal.libraryOrigin?.poolVersion === 4, 'bibliotheekkalender.libraryOrigin round-trip');
}

// (5) Contractuele projectdatums — de drie gevallen van de OPS_ProjectSettings-opslag. Het GEVULDE
//     geval loopt al door de vergelijking in (1) (fixture: 2026-06-15 … 2026-09-30, bewust los van
//     de taak-span 2026-07-06 … 2026-07-24). Hier de twee andere:
{
  // (4a) Een bewust LEEG gelaten einddatum moet leeg terugkomen. Zou de writer 'm — volgens de
  //      golden rule "alleen schrijven wat gezet is" — weglaten, dan viel de lezer terug op
  //      IFCWORKPLAN.FinishTime en stond de AFGELEIDE datum 2026-07-24 er alsnog in: dezelfde bug,
  //      alleen verplaatst naar het lege geval.
  const emptyEnd: ImportResult = { ...fixture, project: { ...fixture.project, endDate: '' } };
  const rtEmpty = readIFC(writeIFC(emptyEnd));
  assert(rtEmpty.project.endDate === '', `lege endDate moet leeg terugkomen — kreeg ${JSON.stringify(rtEmpty.project.endDate)}`);
  assert(rtEmpty.project.startDate === '2026-06-15', `gevulde startDate naast een lege endDate — kreeg ${JSON.stringify(rtEmpty.project.startDate)}`);

  // (4b) Terugval voor bestanden ZONDER de nieuwe pset-velden (vóór deze versie, of van een ander
  //      tool): die moeten zich exact gedragen als voorheen — de afgeleide plan-omvang uit
  //      IFCWORKPLAN. Gesimuleerd door precies die twee property-regels uit het bestand te knippen;
  //      de pset houdt dan losse verwijzingen over, die de lezer al negeert.
  const legacy = writeIFC(fixture).split('\n')
    .filter(l => !/IFCPROPERTYSINGLEVALUE\('Project(Start|End)Date'/.test(l)).join('\n');
  const rtLegacy = readIFC(legacy);
  assert(rtLegacy.project.startDate === '2026-07-06', `zonder pset-veld terugvallen op IFCWORKPLAN.StartTime — kreeg ${JSON.stringify(rtLegacy.project.startDate)}`);
  assert(rtLegacy.project.endDate === '2026-07-24', `zonder pset-veld terugvallen op IFCWORKPLAN.FinishTime — kreeg ${JSON.stringify(rtLegacy.project.endDate)}`);

  // (4c) De IFCWORKPLAN-slots zelf blijven ONGEWIJZIGD de afgeleide plan-omvang dragen (semantisch
  //      juist; andere IFC-tools lezen die slots). Dat is precies waarom de contractuele datums een
  //      eigen plek nodig hadden in plaats van dit slot over te nemen.
  const wpLine = writeIFC(fixture).split('\n').find(l => l.includes('IFCWORKPLAN('))!;
  assert(wpLine.includes("'2026-07-06") && wpLine.includes("'2026-07-24"),
    `IFCWORKPLAN moet de AFGELEIDE taak-span houden (2026-07-06 … 2026-07-24) — kreeg: ${wpLine}`);
  assert(!wpLine.includes('2026-06-15') && !wpLine.includes('2026-09-30'),
    `IFCWORKPLAN mag de CONTRACTUELE datums niet dragen — kreeg: ${wpLine}`);
}

// ════════════════════════════════════════════════════════════════════════════════════════════════
// (5) B8 — GlobalId-uitgifte: uniciteit, en de ONTKOPPELING van de baseline-remap.
//
// `ifcGuid` is een 32-bits hash, geen UUID. Twee dingen zijn nu geborgd, en de volgorde waarin ze
// zijn aangepakt is wezenlijk: eerst de ontkoppeling (de writer schrijft wég welk GlobalId hij per
// baseline-taak gebruikte), pas daarna de botsingscheck. Andersom zou een gesuffixt GlobalId de
// remap breken, omdat de reader de hash dan nog zelf herberekende.
{
  const ifc = writeIFC(fixture);

  // (5a) Elk ENTITY-GlobalId komt precies één keer voor. Let op de ankering op `#N=`: een naïeve
  //      scan op `IFC…('…')` telt ook `IFCTEXT('<guid>')` mee, en dat zijn juist de bedoelde
  //      VERWIJZINGEN naar een GlobalId (ParentGuid, en de resource-GUID als property-naam van een
  //      toewijzing). Die horen te herhalen; entity-id's niet.
  const entityGuids = [...ifc.matchAll(/^#\d+=IFC[A-Z]+\('([0-9A-Za-z_$]{22})'/gm)].map(m => m[1]);
  const dupes = entityGuids.filter((g, i) => entityGuids.indexOf(g) !== i);
  assert(entityGuids.length > 20, `verwachtte een flink aantal entity-GlobalIds — kreeg ${entityGuids.length}`);
  assert(dupes.length === 0, `entity-GlobalIds moeten uniek zijn — dubbel: ${[...new Set(dupes)].join(', ')}`);

  // (5b) De writer schrijft de taak→GlobalId-map expliciet weg, zodat de reader niets hoeft te
  //      herberekenen.
  assert(ifc.includes("'TaskGuids'"), 'writeBaselineMeta moet een TaskGuids-map schrijven zolang er baselines zijn');

  const baseRt = readIFC(ifc);
  const bt0 = baseRt.baselines![0].tasks[0];
  assert(baseRt.tasks.some(t => t.id === bt0.taskId),
    'basisgeval: de baseline-taak moet normaal op een bestaande taak worden geremapt');

  // (5c) En de reader GEBRUIKT die map. Bewijs: wijs in de map de eerste baseline-taak naar het
  //      GlobalId van een ÁNDERE taak. Herberekende de reader nog zelf, dan verandert er niets;
  //      volgt hij de map, dan landt de baseline-taak op die andere taak.
  const other = baseRt.tasks.find(t => t.id !== bt0.taskId)!;
  const otherLine = ifc.split('\n').find(l => l.includes('=IFCTASK(') && l.includes(`'${other.name}'`))!;
  const otherGuid = /=IFCTASK\('([0-9A-Za-z_$]{22})'/.exec(otherLine)![1];
  const mapLine = ifc.split('\n').find(l => l.includes("'TaskGuids'"))!;
  const origGuid = /IFCTEXT\('.*?:.*?([0-9A-Za-z_$]{22})/.exec(mapLine)?.[1];
  assert(!!origGuid, 'kon het eerste GlobalId in de TaskGuids-map niet uitlezen');
  const tampered = ifc.replace(mapLine, mapLine.replace(origGuid!, otherGuid));
  const rtTampered = readIFC(tampered);
  // NB: `readIFC` genereert per leesbeurt NIEUWE taak-id's, dus vergelijken met een id uit een
  //     eerdere leesbeurt kan niet — we identificeren de doeltaak op naam binnen dezelfde beurt.
  const otherInTampered = rtTampered.tasks.find(t => t.name === other.name)!;
  assert(rtTampered.baselines![0].tasks.some(bt => bt.taskId === otherInTampered.id),
    'de reader moet de expliciete TaskGuids-map volgen, niet de hash herberekenen (B8-ontkoppeling)');

  // (5d) Terugval voor bestanden van vóór deze wijziging: haal de map weg en de remap moet nog
  //      steeds werken via de herberekende hash.
  const legacy = ifc.split('\n').filter(l => !l.includes("'TaskGuids'")).join('\n');
  const rtLegacyGuids = readIFC(legacy);
  assert(rtLegacyGuids.tasks.some(t => t.id === rtLegacyGuids.baselines![0].tasks[0].taskId),
    'zonder TaskGuids-map (oud bestand) moet de remap terugvallen op het herberekenen van de hash');
}

// (6) Aanwezigheidsregistratie (issue #63, taak 1: "Aanwezigheid van rekenslots vastleggen in de
// IFC-lezer"): `$`-rekenslots tellen NIET als opgeslagen datum. parseDateFromIFC maakt van `$` de
// datum van VANDAAG — zonder aanwezigheidsregistratie zou een extern geëxporteerd bestand (alleen
// ScheduleStart/ScheduleFinish gevuld) er uitzien alsof het early-datums draagt, en zou "datums
// zoals opgeslagen" het hele project op vandaag zetten.
{
  const TT_LEEG = [
    'ISO-10303-21;', 'HEADER;',
    "FILE_NAME('X.ifc','2031-01-01T07:00:00',('A'),('B'),'x','y','');",
    'ENDSEC;', 'DATA;',
    "#1=IFCPROJECT('g1',$,'Extern',$,$,$,$,$,$);",
    // IfcTaskTime met alleen ScheduleStart/ScheduleFinish; alle rekenslots (EarlyStart t/m
    // IsCritical) op `$`.
    "#9=IFCTASKTIME('T',.PREDICTED.,$,.WORKTIME.,$,'2026-03-02','2026-03-06',$,$,$,$,$,$,$,$,$,$,$,$,$);",
    "#2=IFCTASK('g2',$,'Extern A',$,$,'1.1',$,$,$,.F.,$,#9,.CONSTRUCTION.);",
    // Taak ZONDER IfcTaskTime-referentie (taskTime-slot op `$`) — moet ook een lege lijst geven,
    // niet een ontbrekende entry (het contract in extractTasks: "geen slot gevuld" ≠ "onbekend").
    "#3=IFCTASK('g3',$,'Zonder tijd',$,$,'1.2',$,$,$,.F.,$,$,.CONSTRUCTION.);",
    'ENDSEC;', 'END-ISO-10303-21;',
  ].join('\n');
  const rtLeeg = readIFC(TT_LEEG);
  assert(rtLeeg.tasks.length === 2, `9r fixture moet precies twee taken opleveren — kreeg ${rtLeeg.tasks.length}`);
  const leegId = rtLeeg.tasks.find(t => t.wbsCode === '1.1')!.id;
  assert(JSON.stringify(rtLeeg.recordedFields?.[leegId]) === JSON.stringify([]),
    `9r geen rekenslot als aanwezig gemeld — kreeg ${JSON.stringify(rtLeeg.recordedFields?.[leegId])}`);
  assert(rtLeeg.tasks.find(t => t.wbsCode === '1.1')!.time.scheduleStart === '2026-03-02',
    `9r scheduleStart moet gewoon gelezen worden — kreeg ${rtLeeg.tasks.find(t => t.wbsCode === '1.1')!.time.scheduleStart}`);
  const zonderTijdId = rtLeeg.tasks.find(t => t.wbsCode === '1.2')!.id;
  assert(JSON.stringify(rtLeeg.recordedFields?.[zonderTijdId]) === JSON.stringify([]),
    `9r taak zonder IfcTaskTime moet ook een lege lijst geven (niet ontbrekend) — kreeg ${JSON.stringify(rtLeeg.recordedFields?.[zonderTijdId])}`);

  // Tegenproef: mét gevulde rekenslots worden ze WEL gemeld (freeFloat blijft bewust `$`, dus die
  // hoort NIET in de lijst — bewijst dat het per-slot en niet per-IfcTaskTime wordt geregistreerd).
  const TT_VOL = [
    'ISO-10303-21;', 'HEADER;',
    "FILE_NAME('X.ifc','2031-01-01T07:00:00',('A'),('B'),'x','y','');",
    'ENDSEC;', 'DATA;',
    "#1=IFCPROJECT('g1',$,'Extern',$,$,$,$,$,$);",
    "#9=IFCTASKTIME('T',.PREDICTED.,$,.WORKTIME.,$,'2026-03-02','2026-03-06','2026-03-02','2026-03-06','2026-03-04','2026-03-10',$,'P2D',.T.,$,$,$,$,$,$);",
    "#2=IFCTASK('g2',$,'Extern A',$,$,'1.1',$,$,$,.F.,$,#9,.CONSTRUCTION.);",
    'ENDSEC;', 'END-ISO-10303-21;',
  ].join('\n');
  const rtVol = readIFC(TT_VOL);
  assert(rtVol.tasks.length === 1, `9r VOL-fixture moet precies één taak opleveren — kreeg ${rtVol.tasks.length}`);
  const wantVol = ['earlyStart', 'earlyFinish', 'lateStart', 'lateFinish', 'totalFloat', 'isCritical'];
  assert(JSON.stringify(rtVol.recordedFields?.[rtVol.tasks[0].id]) === JSON.stringify(wantVol),
    `9r gevulde rekenslots wél gemeld — kreeg ${JSON.stringify(rtVol.recordedFields?.[rtVol.tasks[0].id])}`);
}

// ════════════════════════════════════════════════════════════════════════════════════════════════
if (fails === 0) {
  console.log(`OK  ifc-roundtrip: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  ifc-roundtrip: ${fails}/${checks} checks GEFAALD`);
  process.exit(1);
}
