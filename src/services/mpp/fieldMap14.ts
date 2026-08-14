/**
 * Native MPP14-lezer (MS Project 2010–2021), alleen-lezen.
 * Afgeleid van de MPXJ-broncode (https://github.com/joniles/mpxj, © Jon Iles e.a.,
 * LGPL-2.1) — structuurkennis en veldconstanten geport naar TypeScript voor
 * Open Planner Studio (LGPL-3.0).
 *
 * Poort van `FieldMap.java`/`FieldMap14.java`: de veld→locatie-mapping (fixed-data-offset of
 * var-data-sleutel per veld) wordt DATA-GEDREVEN uit een `Props`-blok gelezen (`TASK_FIELD_MAP`
 * e.d.) — geen giga-statische offsettabel. Corpus-geverifieerd (2026-08-14, alle drie
 * ground-truth-bestanden, MS Project 16.0/2016+): de ECHTE offsets in het bestand wijken af van
 * FieldMap14.java's `getDefaultTaskData()`-fallback (bv. UNIQUE_ID op offset 4 i.p.v. 0, ID op
 * offset 0 i.p.v. 4) — de data-gedreven parse is dus geen overdreven voorzichtigheid maar de
 * enige correcte weg.
 *
 * De terugval-tabel is ALLES-OF-NIETS, per veld-map (T5-spec-review, I3 — correctie t.o.v. een
 * eerdere versie die per ONTBREKEND VELD terugviel op de default): de default-tabel beschrijft
 * een ANDERE fysieke recordlayout dan wat het bestand daadwerkelijk gebruikt (zie het
 * UNIQUE_ID-voorbeeld hierboven — dat is geen slordigheidje, het is een structureel andere
 * lay-out). Een enkel ontbrekend veld in een overigens data-gedreven field map per-veld met de
 * default MENGEN zou dus een offset uit de ÉÉN layout tegen bytes uit de ANDERE layout lezen —
 * stil verkeerde waarden, geen fout. `createTaskFieldMap` in FieldMap.java doet dan ook precies
 * dit: `TASK_FIELD_MAP`/`TASK_FIELD_MAP2` beide afwezig ⇒ volledig `getDefaultTaskData()`;
 * aanwezig ⇒ UITSLUITEND `createFieldMap(bytes)`, geen mix. Zie `buildFieldMap` hieronder.
 *
 * Vereenvoudiging t.o.v. de Java-bron (bewust, binnen scope): MPXJ's `FieldTypeHelper` vertaalt
 * een ruwe veld-id via een prefix (TASK_FIELD_BASE|...) naar een `TaskField`-enumwaarde, met een
 * MPP14-specifieke override-tabel (`MPPTaskField.mapMpp14`) voor een handvol velden (o.a.
 * SCHEDULED_START/FINISH/DURATION). Voor UITSLUITEND de velden die deze lezer nodig heeft, IS de
 * ruwe 16-bit-index (`typeValue & 0xFFFF`) al identiek aan de canonieke post-override-waarde die
 * `FieldMap14.getDefaultTaskData()` gebruikt (letterlijk gecontroleerd: 29→SCHEDULED_DURATION,
 * 35→SCHEDULED_START, 36→SCHEDULED_FINISH — precies de mapMpp14-overrides — de rest heeft sowieso
 * geen override). Er is dus geen aparte `mapMpp14`-poort nodig: de veld-id-constanten hieronder
 * ZIJN de indices om op te zoeken, zonder tussenlaag.
 *
 * Milestone/summary zitten BEWUST niet in dit bestand: MPXJ leest die niet via de field map maar
 * via losse bit-vlaggen in de FixedMeta-recordbytes zelf (`MPP14Reader`'s
 * `PROJECT20xx_TASK_META_DATA_BIT_FLAGS`) resp. leidt `summary` af uit "heeft kindtaken"
 * (`MPPReader.java`: `task.setSummary(task.hasChildTasks() || ...)`) — dat laatste is precies de
 * outline-level-stack-hiërarchie die `mppReader.ts` bouwt, dus hoeft niet via een apart veld.
 *
 * Poort-bronnen: FieldMap.java (`createFieldMap`, `createTaskFieldMap`/`createResourceFieldMap`/
 * `createAssignmentFieldMap`), FieldMap14.java (`getDefaultTaskData`/`getDefaultResourceData`/
 * `getDefaultAssignmentData`, MPP14-veld-id's), PropsKey.java (FIELD_MAP-sleutels).
 */
import { getInt, getShort } from './mppPrimitives';
import type { Props } from './mppContainer';

/** Waar een veld leeft binnen de FixedData/Var2Data-blokken van een backend-storage
 *  (TBkndTask/TBkndRsc/TBkndAssn) — spiegelt `FieldMap.FieldItem`, alleen de twee locaties die
 *  deze lezer daadwerkelijk gebruikt (META_DATA/UNKNOWN worden genegeerd, zie moduleheader). */
export interface FieldEntry {
  location: 'fixed' | 'var';
  /** Alleen bij `location === 'fixed'` — byte-offset in het FixedData-item (blok 0; geen van de
   *  velden die deze lezer gebruikt leeft in Fixed2Data, corpus-geverifieerd). */
  fixedOffset?: number;
  /** Alleen bij `location === 'var'` — sleutel voor `Var2Data.getByteArray`/`getUnicodeString`. */
  varDataKey?: number;
}

/** Veld-id → locatie, voor precies de velden die deze lezer nodig heeft. */
export type FieldMapTable = ReadonlyMap<number, FieldEntry>;

const FIELD_MAP_ENTRY_SIZE = 28;
/** FieldMap.java: category 0x0B/0x64 zijn boolean-vlaggen in een apart meta-blok — de generieke
 *  field map kent geen locatie daarvoor (net als de Java-bron: "we just haven't worked out how to
 *  convert this into the actual location... For now we rely on the location in the file being
 *  fixed"). Geen van de velden die déze lezer nodig heeft valt in deze categorie (corpus-
 *  geverifieerd). De skip in `parseFieldMapBytes` hieronder ONTHOUDT zulke id's expliciet (in
 *  `metaDataIds`, zie het returntype) en `buildFieldMap` sluit ze STRUCTUREEL uit van de
 *  default-terugval (T5-spec-review, 4d — correctie: een eerdere versie liet de skip hier alleen
 *  "toevallig" veilig zijn omdat geen van de `defaults`-tabellen een META_DATA-veld-id bevat; die
 *  aanname stond nergens afgedwongen, dus een toekomstig default-entry voor zo'n id zou alsnog
 *  stil als FIXED_DATA/VAR_DATA zijn geïnterpreteerd — nu expliciet onmogelijk gemaakt). */
const META_DATA_CATEGORIES = new Set([0x0b, 0x64]);
/** FieldMap.java: dataBlockOffset 65535 ⇒ dit veld heeft geen vaste plek, dus VAR_DATA (of
 *  UNKNOWN als de var-data-sleutel ook 0 is — niet relevant voor onze velden). */
const NO_FIXED_OFFSET = 65535;

interface ParsedFieldMap {
  entries: Map<number, FieldEntry>;
  /** Veld-id's die de field-map-data zélf als META_DATA (boolean-vlag) categoriseert — zie
   *  `META_DATA_CATEGORIES` hierboven. `buildFieldMap` mag hiervoor NOOIT op `defaults`
   *  terugvallen, ook al staat het id niet in `entries`. */
  metaDataIds: Set<number>;
}

/**
 * Poort van `FieldMap.createFieldMap(byte[])`. Loopt in stappen van 28 bytes over de
 * veld-map-data (structuur: mask(4) + dataBlockOffset(2)@4 + ongebruikt(2) + typeValue(4)@12 +
 * ongebruikt(4) + category(2)@20 + ongebruikt(6)) en bouwt een generieke `id → FieldEntry`-tabel.
 * `useTypeAsVarDataKey()` is voor FieldMap14 altijd `true` (MPP14 gebruikt de typewaarde zelf als
 * var-data-sleutel; er is geen substitutietabel nodig voor de velden hier — corpus-geverifieerd),
 * dus de var-data-sleutel is simpelweg dezelfde 16-bit-index als de fixed-data-veld-id.
 */
function parseFieldMapBytes(bytes: Uint8Array): ParsedFieldMap {
  const entries = new Map<number, FieldEntry>();
  const metaDataIds = new Set<number>();
  let lastDataBlockOffset = 0;
  let dataBlockIndex = 0;
  for (let pos = 0; pos + FIELD_MAP_ENTRY_SIZE <= bytes.length; pos += FIELD_MAP_ENTRY_SIZE) {
    const dataBlockOffset = getShort(bytes, pos + 4, 'fieldMap14 dataBlockOffset');
    const typeValue = getInt(bytes, pos + 12, 'fieldMap14 typeValue');
    const category = getShort(bytes, pos + 20, 'fieldMap14 category');
    const index = typeValue & 0xffff;

    if (META_DATA_CATEGORIES.has(category)) {
      metaDataIds.add(index);
      continue;
    }

    if (dataBlockOffset !== NO_FIXED_OFFSET) {
      if (dataBlockOffset < lastDataBlockOffset) dataBlockIndex++;
      lastDataBlockOffset = dataBlockOffset;
      // Alleen blok 0 is relevant hier (zie moduleheader) — blok ≥1 (Fixed2Data) wordt niet
      // geparst door deze lezer, dus zulke entries blijven bewust ongebruikt in de tabel i.p.v.
      // een verkeerde offset tegen het verkeerde blok te suggereren.
      if (dataBlockIndex === 0) {
        entries.set(index, { location: 'fixed', fixedOffset: dataBlockOffset });
      }
    } else if (index !== 0) {
      entries.set(index, { location: 'var', varDataKey: index });
    }
  }
  return { entries, metaDataIds };
}

/** Bouwt de uiteindelijke tabel — ALLES-OF-NIETS per bron (T5-spec-review, I3; zie de
 *  moduleheader voor waarom een per-veld-mix stil verkeerde bytes zou lezen):
 *  - `fieldMapBytes` ontbreekt (geen `TASK_FIELD_MAP`/`TASK_FIELD_MAP2` e.d. in `Props`) ⇒
 *    volledig `defaults` (MPXJ: `createTaskFieldMap`'s `populateDefaultData`-tak).
 *  - `fieldMapBytes` aanwezig ⇒ UITSLUITEND de data-gedreven `entries` uit `parseFieldMapBytes` —
 *    `defaults` wordt dan HELEMAAL niet geraadpleegd, ook niet voor een veld dat toevallig
 *    ontbreekt in de geparste field map. `fixedOffsetOf`/`varDataKeyOf` geven voor zo'n veld dan
 *    `null` (net als voor elk ander onbekend veld) — de aanroeper (`readTasks`'s harde
 *    veldmap-check) bewaakt dat een té leeg resultaat een duidelijke fout geeft i.p.v. stil door
 *    te lezen met verkeerde offsets. `metaDataIds` blijft in `parseFieldMapBytes`'s returntype
 *    staan voor diagnose (bv. toekomstige logging), ook al heeft `buildFieldMap` het zelf niet
 *    meer nodig nu er geen merge-pad meer is dat het zou kunnen misbruiken. */
function buildFieldMap(fieldMapBytes: Uint8Array | null, defaults: Readonly<Record<number, FieldEntry>>): FieldMapTable {
  if (!fieldMapBytes) {
    const result = new Map<number, FieldEntry>();
    for (const key of Object.keys(defaults)) result.set(Number(key), defaults[Number(key)]);
    return result;
  }
  return parseFieldMapBytes(fieldMapBytes).entries;
}

function firstByteArray(props: Props, keys: number[]): Uint8Array | null {
  for (const key of keys) {
    const value = props.getByteArray(key);
    if (value) return value;
  }
  return null;
}

// ── PropsKey-sleutels voor de drie field maps (PropsKey.java) ───────────────────────────────────
const PROPS_KEY_TASK_FIELD_MAP = 131092;
const PROPS_KEY_TASK_FIELD_MAP2 = 50331668;
const PROPS_KEY_RESOURCE_FIELD_MAP = 131093;
const PROPS_KEY_RESOURCE_FIELD_MAP2 = 50331669;
const PROPS_KEY_ASSIGNMENT_FIELD_MAP = 131095;
const PROPS_KEY_ASSIGNMENT_FIELD_MAP2 = 50331671;

// ── Taak-veld-id's (FieldMap14.java `getDefaultTaskData()` + MPP14-veld-id's; zie moduleheader
// voor waarom hier geen aparte mapMpp14-override nodig is) ──────────────────────────────────────
export const TaskFieldId = {
  UniqueId: 86,
  Id: 23,
  Name: 14,
  Wbs: 16,
  OutlineLevel: 249,
  ScheduledStart: 35,
  ScheduledFinish: 36,
  ScheduledDuration: 29,
  /** ACTUAL_DURATION_UNITS — dient als eenheden-bron voor SCHEDULED_DURATION (TaskField.java:
   *  `SCHEDULED_DURATION(DataType.DURATION, TaskField.ACTUAL_DURATION_UNITS)`). */
  DurationUnits: 181,
  ConstraintType: 17,
  ConstraintDate: 18,
  Deadline: 437,
  PercentComplete: 32,
  ActualStart: 41,
  ActualFinish: 42,
  /** Alleen de rauwe kalender-uniqueID; T6 vertaalt dit naar een echte `WorkCalendar`-referentie.
   *  T5 leest 'm nog niet uit (er is nog geen kalenderlaag om naar te verwijzen). */
  CalendarUniqueId: 401,
} as const;

/** Letterlijk uit `FieldMap14.getDefaultTaskData()` — alleen de entries voor `TaskFieldId`
 *  hierboven. Terugval voor het (zeldzame) geval dat `TASK_FIELD_MAP`/`TASK_FIELD_MAP2` in
 *  `Props` beide ontbreken. */
const DEFAULT_TASK_FIELDS: Readonly<Record<number, FieldEntry>> = {
  [TaskFieldId.UniqueId]: { location: 'fixed', fixedOffset: 0 },
  [TaskFieldId.Id]: { location: 'fixed', fixedOffset: 4 },
  [TaskFieldId.OutlineLevel]: { location: 'fixed', fixedOffset: 40 },
  [TaskFieldId.ScheduledDuration]: { location: 'fixed', fixedOffset: 42 },
  [TaskFieldId.DurationUnits]: { location: 'fixed', fixedOffset: 46 },
  [TaskFieldId.ConstraintType]: { location: 'fixed', fixedOffset: 56 },
  [TaskFieldId.ScheduledStart]: { location: 'fixed', fixedOffset: 64 },
  [TaskFieldId.ScheduledFinish]: { location: 'fixed', fixedOffset: 68 },
  [TaskFieldId.ActualStart]: { location: 'fixed', fixedOffset: 72 },
  [TaskFieldId.ActualFinish]: { location: 'fixed', fixedOffset: 76 },
  [TaskFieldId.ConstraintDate]: { location: 'fixed', fixedOffset: 80 },
  [TaskFieldId.PercentComplete]: { location: 'fixed', fixedOffset: 90 },
  [TaskFieldId.CalendarUniqueId]: { location: 'fixed', fixedOffset: 118 },
  [TaskFieldId.Deadline]: { location: 'fixed', fixedOffset: 122 },
  [TaskFieldId.Wbs]: { location: 'var', varDataKey: TaskFieldId.Wbs },
  [TaskFieldId.Name]: { location: 'var', varDataKey: TaskFieldId.Name },
};

/** Poort van `FieldMap.createTaskFieldMap(Props)`. */
export function createTaskFieldMap(props: Props): FieldMapTable {
  const bytes = firstByteArray(props, [PROPS_KEY_TASK_FIELD_MAP, PROPS_KEY_TASK_FIELD_MAP2]);
  return buildFieldMap(bytes, DEFAULT_TASK_FIELDS);
}

// ── Resource-veld-id's (T7 gebruikt deze; hier al gebouwd zoals het plan voorschrijft) ──────────
export const ResourceFieldId = {
  UniqueId: 27,
  Name: 1,
  MaxUnits: 4,
} as const;

const DEFAULT_RESOURCE_FIELDS: Readonly<Record<number, FieldEntry>> = {
  [ResourceFieldId.UniqueId]: { location: 'fixed', fixedOffset: 0 },
  [ResourceFieldId.MaxUnits]: { location: 'fixed', fixedOffset: 44 },
  [ResourceFieldId.Name]: { location: 'var', varDataKey: ResourceFieldId.Name },
};

/** Poort van `FieldMap.createResourceFieldMap(Props)`. */
export function createResourceFieldMap(props: Props): FieldMapTable {
  const bytes = firstByteArray(props, [PROPS_KEY_RESOURCE_FIELD_MAP, PROPS_KEY_RESOURCE_FIELD_MAP2]);
  return buildFieldMap(bytes, DEFAULT_RESOURCE_FIELDS);
}

// ── Assignment-veld-id's (T7 gebruikt deze) ──────────────────────────────────────────────────────
export const AssignmentFieldId = {
  UniqueId: 0,
  TaskUniqueId: 1,
  ResourceUniqueId: 2,
  Units: 7,
} as const;

const DEFAULT_ASSIGNMENT_FIELDS: Readonly<Record<number, FieldEntry>> = {
  [AssignmentFieldId.UniqueId]: { location: 'fixed', fixedOffset: 0 },
  [AssignmentFieldId.TaskUniqueId]: { location: 'fixed', fixedOffset: 4 },
  [AssignmentFieldId.ResourceUniqueId]: { location: 'fixed', fixedOffset: 8 },
  [AssignmentFieldId.Units]: { location: 'fixed', fixedOffset: 46 },
};

/** Poort van `FieldMap.createAssignmentFieldMap(Props)`. */
export function createAssignmentFieldMap(props: Props): FieldMapTable {
  const bytes = firstByteArray(props, [PROPS_KEY_ASSIGNMENT_FIELD_MAP, PROPS_KEY_ASSIGNMENT_FIELD_MAP2]);
  return buildFieldMap(bytes, DEFAULT_ASSIGNMENT_FIELDS);
}

// ── Accessors ─────────────────────────────────────────────────────────────────────────────────

/** Fixed-data-byte-offset voor `fieldId`, of `null` als het veld niet in FIXED_DATA leeft (of
 *  helemaal niet in de tabel voorkomt). */
export function fixedOffsetOf(map: FieldMapTable, fieldId: number): number | null {
  const entry = map.get(fieldId);
  return entry && entry.location === 'fixed' && entry.fixedOffset !== undefined ? entry.fixedOffset : null;
}

/** Var-data-sleutel voor `fieldId`, of `null` als het veld niet in VAR_DATA leeft. */
export function varDataKeyOf(map: FieldMapTable, fieldId: number): number | null {
  const entry = map.get(fieldId);
  return entry && entry.location === 'var' && entry.varDataKey !== undefined ? entry.varDataKey : null;
}
