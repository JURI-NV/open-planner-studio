/**
 * Native MPP14-lezer (MS Project 2010–2021), alleen-lezen.
 * Afgeleid van de MPXJ-broncode (https://github.com/joniles/mpxj, © Jon Iles e.a.,
 * LGPL-2.1) — structuurkennis en veldconstanten geport naar TypeScript voor
 * Open Planner Studio (LGPL-3.0).
 *
 * Entry point (T5): `readMPP(bytes, labels) → ImportResult`. Flow: CfbFile → assertReadable
 * (formaatdetectie + wachtwoordpoort, T4) → Props (projecteigenschappen, `"   114"/Props`) →
 * FieldMap14 (T5) → taken uit `"   114"/TBkndTask` (FixedMeta/FixedData + VarMeta/Var2Data,
 * leesvolgorde van `MPP14Reader.processTaskData`). Kalenders/relaties/resources/assignments
 * blijven lege arrays + een placeholder-standaardkalender (T6/T7 vullen ze), zoals `readCSV` dat
 * ook doet voor formaten zonder die data.
 *
 * Veldsemantiek is gespiegeld aan `readMSPDI` (mspdiReader.ts) — zelfde afronding voor duur,
 * dezelfde constrainttype-codes (`mspCodeToConstraint`, hergebruikt), dezelfde
 * progress-normalisatie (`normalizeImportedProgress`). Alles blijft DAG-modus (geen uur-modus
 * voor MPP in etappe 1 — de plan-tekst noemt dat expliciet).
 *
 * Twee dingen die MPXJ WEL doet en deze module BEWUST anders/eenvoudiger doet (corpus-
 * geverifieerd, gedocumenteerd i.p.v. stilzwijgend genegeerd):
 *  - Hiërarchie/parentId komt hier uit een OUTLINE-LEVEL-STACK over de taken in ID-volgorde
 *    (zoals de tekst van deze taak voorschrijft), niet uit `TaskField.PARENT_TASK_UNIQUE_ID`
 *    (dat MPXJ wél gebruikt). Corpusbevinding (zie `tests/planning/check-mpp-import.ts`'s T5-
 *    sectie voor het volledige verhaal): in ÉÉN van de drie ground-truth-bestanden draagt een
 *    handvol taken een PARENT_TASK_UNIQUE_ID die niet meer overeenkomt met hun huidige
 *    WBS-/documentpositie (MS-Project-eigen staleness na een verplaatsing, niet iets deze lezer
 *    kan detecteren of corrigeren) — zelfs MPXJ's eigen algoritme zou daar hetzelfde "verkeerde"
 *    antwoord geven. Outline-level-stack is voor de OVERGROTE meerderheid van taken (alle drie
 *    bestanden: 100% naam-matchbaar met de MSPDI-ground-truth) exact gelijk aan wat
 *    PARENT_TASK_UNIQUE_ID zou geven, dus geen kwaliteitsverlies t.o.v. dat veld — alleen geen
 *    wondermiddel voor bestanden met deze specifieke, zeldzame staleness.
 *  - `task.getStart()`/`getFinish()` in MPP14Reader kan, voor HANDMATIG-geplande taken, afwijken
 *    van `SCHEDULED_START`/`SCHEDULED_FINISH` (het veld dat déze lezer gebruikt) — MPXJ leest
 *    beide (`TaskField.START` op een apart veld-id, 1283/1284) en kiest per taak op basis van
 *    de taakmodus (auto/handmatig, een boolean die zelf weer in Fixed2Meta zit — buiten T5's
 *    veldenlijst). Voor auto-geplande taken (de meerderheid in normale bestanden) is
 *    SCHEDULED_START/-FINISH exact de datum die ook in de UI staat, dus dit is een bewuste,
 *    beperkte vereenvoudiging — zie het T5-rapport voor de risico-inschatting.
 */
import type { Project } from '@/types/project';
import type { Task, TaskConstraint } from '@/types/task';
import type { WorkCalendar } from '@/types/calendar';
import type { ImportLabels, ImportResult } from '@/services/importTypes';
import { createDefaultCalendar } from '@/engine/calendar/defaultCalendar';
import { generateId } from '@/utils/id';
import { formatDate } from '@/utils/dateUtils';
import { normalizeImportedProgress } from '@/services/importNormalize';
import { mspCodeToConstraint } from '@/services/msproject/mspdiReader';
import { CfbFile } from './cfb';
import { assertReadable, detectApplicationVersion, Props } from './mppContainer';
import { FixedData, FixedMeta, Var2Data, VarMeta12, getInt, getShort, getTimestamp, getUnicodeString } from './mppPrimitives';
import { TaskFieldId, createTaskFieldMap, fixedOffsetOf, varDataKeyOf, type FieldMapTable } from './fieldMap14';

// ── PropsKey-sleutels voor projecteigenschappen (PropsKey.java; gelezen uit `"   114"/Props`,
// NIET uit de root-`Props14`-stream — die draagt alleen de wachtwoordvlag, zie mppContainer.ts). ──
const PROPS_KEY_TITLE = 37748744;
const PROPS_KEY_PROJECT_START_DATE = 37748738;
const PROPS_KEY_PROJECT_FINISH_DATE = 37748739;
const PROPS_KEY_STATUS_DATE = 37748805;
const PROPS_KEY_MINUTES_PER_DAY = 37748765;

/** TBkndTask/FixedMeta-itemgrootte (MPP14Reader.java r. 993: `new FixedMeta(..., 47)`). */
const TASK_FIXED_META_ITEM_SIZE = 47;
/** Fixed-data-blokken kleiner dan dit zijn "null-taak"-plaatshouders (verwijderde/vrijgemaakte
 *  unique-ID's die geen echte taak dragen) — MPP14Reader.java's `NULL_TASK_BLOCK_SIZE`. */
const NULL_TASK_BLOCK_SIZE = 16;
/** Bit 0x02 in de eerste 4 bytes van een FixedMeta-item markeert een verwijderde taak
 *  (`createTaskMap`'s `flags & 0x02`-check). */
const DELETED_TASK_FLAG = 0x02;
/** De eerste drie FixedData-slots zijn geen taken (MPP14Reader.java's `createTaskMap`: "First
 *  three items are not tasks, so let's skip them"). */
const FIRST_TASK_INDEX = 3;

/** Milestone-vlag: `MppBitFlag(TaskField.MILESTONE, offset, mask, ...)` uit MPP14Reader.java's
 *  `PROJECT20xx_TASK_META_DATA_BIT_FLAGS`-tabellen. Voor déze lezer is alleen de MILESTONE-regel
 *  nodig (de rest van die tabellen — FLAG1..20, MARKED, ROLLUP, … — valt buiten T5's veldenlijst).
 *  Project 2013 en 2016+ delen dezelfde milestone-offset/-mask (alleen andere, voor ons
 *  irrelevante velden verschillen tussen die twee), dus twee gevallen volstaan: ≤2010 vs. 2013+.
 *  Onbekende/ontbrekende versie (`detectApplicationVersion` gaf `null`) valt terug op de
 *  modernste tabel — corpus-geverifieerd (alle drie bestanden: "Microsoft.Project 16.0"). */
function milestoneBitFlag(applicationVersion: number | null): { offset: number; mask: number } {
  return applicationVersion !== null && applicationVersion <= 14
    ? { offset: 8, mask: 0x20 } // PROJECT2010_TASK_META_DATA_BIT_FLAGS
    : { offset: 10, mask: 0x02 }; // PROJECT2013_/PROJECT2016_TASK_META_DATA_BIT_FLAGS
}

interface RawTaskRecord {
  uniqueId: number;
  id: number;
  outlineLevel: number;
  task: Task;
}

/** Poort van `MPP14Reader.processTaskData`'s `createTaskMap`, vereenvoudigd tot wat T5 nodig
 *  heeft: een `uniqueID → FixedData-index`-tabel, met verwijderde/null-/spooktaken eruit gefilterd
 *  (KRITIEK voor taakaantal-pariteit met de MSPDI-ground-truth). Java itereert ACHTERWAARTS en
 *  voegt alleen toe als de sleutel nog niet bestaat (bij duplicaten wint de LAATSTE/hoogste
 *  index); hier itereren we VOORWAARTS en overschrijven altijd — functioneel identiek resultaat,
 *  met een simpelere lus. */
function collectValidTaskIndices(fixedMeta: FixedMeta, fixedData: FixedData, varMeta: VarMeta12, uniqueIdOffset: number): Map<number, number> {
  const itemCount = fixedMeta.getAdjustedItemCount();
  const validIndexByUniqueId = new Map<number, number>();
  const deletedIds = new Set<number>();

  for (let index = FIRST_TASK_INDEX; index < itemCount; index++) {
    const data = fixedData.getByteArrayValue(index);
    if (!data) continue;
    const metaItem = fixedMeta.getByteArrayValue(index);
    if (!metaItem || metaItem.length < 4) continue;

    const flags = getInt(metaItem, 0, 'TBkndTask/FixedMeta-flags');
    if ((flags & DELETED_TASK_FLAG) !== 0) {
      // Verwijderde-taak-marker: alleen de unique-ID onthouden (voor de spooktaak-check
      // hieronder) — MPP14Reader.java leest 'm hier als SHORT ("Only a short stored for deleted
      // tasks?"), niet als de gebruikelijke INT.
      if (data.length >= 2) deletedIds.add(getShort(data, 0, 'TBkndTask/FixedData deleted-uid'));
      continue;
    }
    if (data.length === NULL_TASK_BLOCK_SIZE) continue; // null-taak-plaatshouder

    if (data.length < uniqueIdOffset + 4) continue;
    const uniqueId = getInt(data, uniqueIdOffset, 'TBkndTask/FixedData uniqueId');
    validIndexByUniqueId.set(uniqueId, index); // latere/hogere index wint
  }

  // Spooktaak-check (MPP14Reader.java): een unique-ID die zowel als verwijderd gemarkeerd staat
  // ALS een normaal record heeft, telt alleen mee als er var-data voor bestaat.
  for (const uid of deletedIds) {
    if (validIndexByUniqueId.has(uid) && !varMeta.containsKey(uid)) {
      validIndexByUniqueId.delete(uid);
    }
  }

  return validIndexByUniqueId;
}

/** Duur in dagen, uit een ruwe MPP-waarde in TIENDEN VAN EEN MINUUT — dezelfde afrondings-
 *  semantiek als `parseMSPDuration` in mspdiReader.ts (`Math.round(minuten / (hoursPerDay*60))`).
 *  Vereenvoudiging (gedocumenteerd, T5-rapport): geen onderscheid elapsed-vs-werktijd-eenheden
 *  (`DurationUnits`-veld) — mspdiReader's dag-modus-pad maakt dat onderscheid ook niet. */
function durationTenthsOfMinuteToDays(tenths: number, hoursPerDay: number): number {
  const minutes = tenths / 10;
  const perDay = hoursPerDay * 60;
  return perDay > 0 ? Math.round(minutes / perDay) : 0;
}

/** Percent complete: SHORT, 0..100 direct (MPPUtility.getPercentage) — buiten dat bereik ⇒ 0
 *  (spiegelt de Java-bron: een ongeldige waarde levert daar `null`, hier de neutrale 0). */
function readPercentComplete(data: Uint8Array, offset: number | null): number {
  if (offset === null || data.length < offset + 2) return 0;
  const raw = getShort(data, offset, 'TBkndTask percentComplete');
  return raw >= 0 && raw <= 100 ? raw : 0;
}

function readDateField(data: Uint8Array, offset: number | null): string | undefined {
  if (offset === null || data.length < offset + 4) return undefined;
  const ts = getTimestamp(data, offset);
  return ts ? formatDate(ts) : undefined;
}

function readTasks(cfb: CfbFile, taskFieldMap: FieldMapTable, hoursPerDay: number, statusDate: string | undefined, applicationVersion: number | null): Task[] {
  const fixedMetaBytes = cfb.getStream(['   114', 'TBkndTask', 'FixedMeta']);
  const fixedDataBytes = cfb.getStream(['   114', 'TBkndTask', 'FixedData']);
  const varMetaBytes = cfb.getStream(['   114', 'TBkndTask', 'VarMeta']);
  if (!fixedMetaBytes || !fixedDataBytes || !varMetaBytes) {
    throw new Error('MPP: "   114"/TBkndTask mist een vereiste stream (FixedMeta/FixedData/VarMeta)');
  }
  const var2DataBytes = cfb.getStream(['   114', 'TBkndTask', 'Var2Data']); // legitiem afwezig (zie mppPrimitives.ts)

  const fixedMeta = FixedMeta.withItemSize(fixedMetaBytes, TASK_FIXED_META_ITEM_SIZE, 'TBkndTask/FixedMeta');
  const fixedData = FixedData.fromMeta(fixedMeta, fixedDataBytes, 0, 0, 'TBkndTask/FixedData');
  const varMeta = new VarMeta12(varMetaBytes, 'TBkndTask/VarMeta');
  const varData = new Var2Data(varMeta, var2DataBytes);

  const uniqueIdOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.UniqueId);
  const idOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.Id);
  const outlineLevelOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.OutlineLevel);
  const scheduledStartOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.ScheduledStart);
  const scheduledFinishOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.ScheduledFinish);
  const durationOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.ScheduledDuration);
  const constraintTypeOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.ConstraintType);
  const constraintDateOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.ConstraintDate);
  const deadlineOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.Deadline);
  const percentCompleteOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.PercentComplete);
  const actualStartOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.ActualStart);
  const actualFinishOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.ActualFinish);
  const nameKey = varDataKeyOf(taskFieldMap, TaskFieldId.Name);
  const wbsKey = varDataKeyOf(taskFieldMap, TaskFieldId.Wbs);

  if (uniqueIdOffset === null || idOffset === null) {
    throw new Error('MPP: taak-veldmap mist UNIQUE_ID/ID — kan taken niet lezen');
  }

  const validIndices = collectValidTaskIndices(fixedMeta, fixedData, varMeta, uniqueIdOffset);
  const { offset: msOffset, mask: msMask } = milestoneBitFlag(applicationVersion);

  const records: RawTaskRecord[] = [];
  for (const [uniqueId, index] of validIndices) {
    if (uniqueId === 0) continue; // projectsamenvattingstaak (net als mspdiReader's uid===0-skip)
    const data = fixedData.getByteArrayValue(index);
    if (!data) continue;
    const metaItem = fixedMeta.getByteArrayValue(index);

    const id = data.length >= idOffset + 4 ? getInt(data, idOffset, 'TBkndTask id') : uniqueId;
    const outlineLevelRaw = outlineLevelOffset !== null && data.length >= outlineLevelOffset + 2
      ? getShort(data, outlineLevelOffset, 'TBkndTask outlineLevel')
      : 1;
    const outlineLevel = outlineLevelRaw >= 1 ? outlineLevelRaw : 1;

    const name = (nameKey !== null ? varData.getUnicodeString(uniqueId, nameKey) : null) || 'Task';
    const wbs = (wbsKey !== null ? varData.getUnicodeString(uniqueId, wbsKey) : null) || `${uniqueId}`;

    const start = readDateField(data, scheduledStartOffset) ?? formatDate(new Date());
    const finish = readDateField(data, scheduledFinishOffset) ?? start;

    const durationRaw = durationOffset !== null && data.length >= durationOffset + 4
      ? getInt(data, durationOffset, 'TBkndTask duration')
      : 0;
    const duration = durationTenthsOfMinuteToDays(durationRaw, hoursPerDay);

    const isMilestone = !!metaItem && metaItem.length >= msOffset + 4
      && (getInt(metaItem, msOffset, 'TBkndTask milestone-flag') & msMask) !== 0;

    let constraint: TaskConstraint | undefined;
    if (constraintTypeOffset !== null && data.length >= constraintTypeOffset + 2) {
      const code = getShort(data, constraintTypeOffset, 'TBkndTask constraintType');
      const mapped = mspCodeToConstraint(code);
      if (mapped) {
        const constraintDate = readDateField(data, constraintDateOffset);
        constraint = {
          type: mapped.type,
          ...(mapped.hard ? { hard: true } : {}),
          ...(constraintDate ? { date: constraintDate } : {}),
        };
      }
    }
    const deadline = readDateField(data, deadlineOffset);
    const percentComplete = readPercentComplete(data, percentCompleteOffset);
    const actualStart = readDateField(data, actualStartOffset);
    const actualFinish = readDateField(data, actualFinishOffset);

    let status: 'NOT_STARTED' | 'STARTED' | 'COMPLETED' = 'NOT_STARTED';
    if (percentComplete >= 100) status = 'COMPLETED';
    else if (percentComplete > 0) status = 'STARTED';

    const task: Task = {
      id: generateId('task'),
      name,
      description: '',
      wbsCode: wbs,
      taskType: 'CONSTRUCTION',
      status,
      isMilestone,
      priority: 500,
      parentId: null,
      childIds: [],
      time: {
        durationType: 'WORKTIME',
        scheduleDuration: duration,
        scheduleStart: start,
        scheduleFinish: finish,
        earlyStart: start,
        earlyFinish: finish,
        lateStart: start,
        lateFinish: finish,
        freeFloat: 0,
        totalFloat: 0,
        isCritical: false,
        actualStart,
        actualFinish,
        completion: percentComplete / 100,
      },
      resourceIds: [],
      ...(constraint ? { constraint } : {}),
      ...(deadline ? { deadline } : {}),
    };
    records.push({ uniqueId, id, outlineLevel, task });
  }

  // ID-volgorde = de Gantt-/rijvolgorde die MS Project's eigen XML-export ook gebruikt (zie
  // moduleheader) — nodig voor zowel de outline-level-stack-hiërarchie hieronder als de
  // positie-gematchte corpusvergelijking in T5's testuitbreiding.
  records.sort((a, b) => a.id - b.id);

  // Hiërarchie via een outline-level-stack (taakopdracht T5, letterlijk voorgeschreven i.p.v.
  // MPXJ's PARENT_TASK_UNIQUE_ID-veld — zie moduleheader).
  const stack: { id: string; level: number; task: Task }[] = [];
  for (const rec of records) {
    while (stack.length > 0 && stack[stack.length - 1].level >= rec.outlineLevel) stack.pop();
    const parent = stack[stack.length - 1];
    if (parent) {
      rec.task.parentId = parent.task.id;
      parent.task.childIds.push(rec.task.id);
    }
    stack.push({ id: rec.task.id, level: rec.outlineLevel, task: rec.task });
  }

  const tasks = records.map((r) => r.task);
  normalizeImportedProgress(tasks, statusDate);
  return tasks;
}

function parseProjectProperties(props: Props, labels: ImportLabels | undefined): { project: Project; hoursPerDay: number } {
  const titleBytes = props.getByteArray(PROPS_KEY_TITLE);
  const name = (titleBytes ? getUnicodeString(titleBytes, 0) : '') || labels?.importedProject || 'MS Project Import';

  const startBytes = props.getByteArray(PROPS_KEY_PROJECT_START_DATE);
  const finishBytes = props.getByteArray(PROPS_KEY_PROJECT_FINISH_DATE);
  const startDate = startBytes && startBytes.length >= 4 ? getTimestamp(startBytes, 0) : null;
  const finishDate = finishBytes && finishBytes.length >= 4 ? getTimestamp(finishBytes, 0) : null;

  const minutesPerDay = props.getInt(PROPS_KEY_MINUTES_PER_DAY);
  const hoursPerDay = minutesPerDay > 0 ? minutesPerDay / 60 : 8;

  const project: Project = {
    id: generateId('proj'),
    name,
    description: '',
    startDate: startDate ? formatDate(startDate) : formatDate(new Date()),
    endDate: finishDate ? formatDate(finishDate) : '',
    calendarId: 'cal-default',
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    author: '',
    company: '',
  };

  const statusBytes = props.getByteArray(PROPS_KEY_STATUS_DATE);
  const statusDate = statusBytes && statusBytes.length >= 4 ? getTimestamp(statusBytes, 0) : null;
  if (statusDate) project.statusDate = formatDate(statusDate);

  return { project, hoursPerDay };
}

/**
 * Entry point (T5). `.mpp` (MPP14) → `ImportResult`, met dezelfde veldsemantiek als `readMSPDI`.
 * Kalenders/relaties/resources/assignments zijn in deze taak nog lege arrays + een
 * placeholder-standaardkalender (T6/T7 vullen ze) — zie de moduleheader.
 */
export function readMPP(bytes: Uint8Array, labels?: ImportLabels): ImportResult {
  const cfb = new CfbFile(bytes);
  assertReadable(cfb); // gooit MppUnsupportedError voor legacy/versleuteld, of een gewone Error
  // voor een onherkenbaar bestand (T4).

  const applicationVersion = detectApplicationVersion(cfb);

  const projectPropsBytes = cfb.getStream(['   114', 'Props']);
  if (!projectPropsBytes) {
    throw new Error('MPP: "   114"/Props ontbreekt — geen geldig MPP14-bestand');
  }
  const projectProps = new Props(projectPropsBytes, '   114/Props');

  const { project, hoursPerDay } = parseProjectProperties(projectProps, labels);

  const taskFieldMap = createTaskFieldMap(projectProps);
  const tasks = readTasks(cfb, taskFieldMap, hoursPerDay, project.statusDate, applicationVersion);

  // Placeholder-kalender (T6 vervangt dit door de echte TBkndCal-afgeleide kalender(s)) — zelfde
  // patroon als readCSV. `hoursPerDay` wordt wél al meegenomen zodat een meteen-berekenen vóór T6
  // niet stilzwijgend op de generieke 8-uursdag terugvalt terwijl het bestand iets anders zegt.
  const calendar: WorkCalendar = createDefaultCalendar();
  calendar.hoursPerDay = hoursPerDay;
  project.calendarId = calendar.id;

  return {
    project,
    calendar,
    tasks,
    sequences: [],
    resources: [],
    assignments: [],
  };
}
