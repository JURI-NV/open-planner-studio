// Onafhankelijke her-implementatie van de TBkndTask-scan (fase 3.8, etappe "MSP-pariteit", T1).
//
// BEWUST EEN TWEEDE LUS, GEEN HERGEBRUIK VAN `readTasks`. Dit bestand bestaat om `mppFidelity.ts`
// een grondwaarheid te geven die NIET via dezelfde code loopt als de lezer die getoetst wordt
// (`src/services/mpp/mppReader.ts`'s `readTasks`) — een bug in `readTasks` (bv. een verkeerd
// veld-offset, een verkeerde byte-volgorde) zou anders onopgemerkt blijven, want de "grondwaarheid"
// zou dezelfde fout maken. Deze module leest daarom ZELF, met een eigen lus, MS Projects eigen
// opgeslagen `SCHEDULED_START`/`SCHEDULED_FINISH` (TaskField 35/36) rechtstreeks uit `TBkndTask`'s
// `FixedMeta`/`FixedData`, en deelt UITSLUITEND de laagste-niveau-primitieven
// (`mppPrimitives.ts`) en de veldkaart-opzoeker (`fieldMap14.ts`'s `fixedOffsetOf`/
// `varDataKeyOf`) — geen enkele aanroep naar `readTasks`/`readMPP` zelf.
//
// Overgenomen (nagenoeg letterlijk) uit het scratchpad-audit-harnas (`measure.ts`'s `rawScan()`,
// gepind op snapshot 97368f7d — zie het plandocument §5 "Het gedeelde meetscript"). Het filter voor
// verwijderde/spooktaken spiegelt bewust `mppReader.ts`'s `collectValidTaskIndices` (zelfde
// `DELETED_TASK_FLAG`/null-blok-check) — niet omdat dit bestand die functie hergebruikt (dat zou de
// onafhankelijkheid weer opheffen), maar omdat de RUWE TBkndTask-laag dezelfde structurele
// eigenaardigheden kent ongeacht wie hem leest.
import { openMppProject } from '@/services/mpp/mppReader';
import {
  createTaskFieldMap, TaskFieldId, fixedOffsetOf, varDataKeyOf, type FieldMapTable,
} from '@/services/mpp/fieldMap14';
import {
  FixedData, FixedMeta, Var2Data, VarMeta12, getInt, getShort, getTimestamp, getDurationTimeUnits,
} from '@/services/mpp/mppPrimitives';

const TASK_FIXED_META_ITEM_SIZE = 47;
const NULL_TASK_BLOCK_SIZE = 16;
const DELETED_TASK_FLAG = 0x02;
const FIRST_TASK_INDEX = 3;
const MAX_TEXT = 65536;

export interface RawTask {
  uniqueId: number;
  /** Taak-ID (kolomvolgorde in MS Project) — de join-sleutel naar `Task.id` in `readMPP`'s output. */
  id: number;
  name: string;
  start: Date | null;
  finish: Date | null;
  /** SCHEDULED_DURATION, ruwe tienden-van-minuut — niet gebruikt door de pariteitsmeting zelf
   *  (die vergelijkt alleen start/finish), aangehouden voor toekomstige metingen op dezelfde scan
   *  (ELAPSED-duur e.d.) zodat die geen derde lus hoeven te bouwen. */
  durationRaw: number;
  durUnit: string;
}

/**
 * Eigen TBkndTask-lus: leest MS Projects EIGEN opgeslagen Start/Finish + duur per taak.
 * Gesorteerd op taak-ID (dezelfde volgorde als `readMPP`'s `tasks` — beide sorteren op ID), zodat
 * de aanroeper positioneel kan aligneren zonder een aparte join-stap.
 */
export function scanGroundTruthTasks(bytes: Uint8Array): { raws: RawTask[]; fieldMap: FieldMapTable } {
  const { cfb, projectProps } = openMppProject(bytes);
  const fm = createTaskFieldMap(projectProps);
  const fixedMetaBytes = cfb.getStream(['   114', 'TBkndTask', 'FixedMeta'])!;
  const fixedDataBytes = cfb.getStream(['   114', 'TBkndTask', 'FixedData'])!;
  const varMetaBytes = cfb.getStream(['   114', 'TBkndTask', 'VarMeta'])!;
  const var2DataBytes = cfb.getStream(['   114', 'TBkndTask', 'Var2Data']);
  const fixedMeta = FixedMeta.withItemSize(fixedMetaBytes, TASK_FIXED_META_ITEM_SIZE, 'ground-truth/meta');
  const fixedData = FixedData.fromMeta(fixedMeta, fixedDataBytes, 0, 0, 'ground-truth/data');
  const varMeta = new VarMeta12(varMetaBytes, 'ground-truth/varmeta');
  const varData = new Var2Data(varMeta, var2DataBytes);

  const offUid = fixedOffsetOf(fm, TaskFieldId.UniqueId)!;
  const offId = fixedOffsetOf(fm, TaskFieldId.Id)!;
  const offStart = fixedOffsetOf(fm, TaskFieldId.ScheduledStart)!;
  const offFinish = fixedOffsetOf(fm, TaskFieldId.ScheduledFinish)!;
  const offDur = fixedOffsetOf(fm, TaskFieldId.ScheduledDuration);
  const offDurUnits = fixedOffsetOf(fm, TaskFieldId.DurationUnits);
  const nameKey = varDataKeyOf(fm, TaskFieldId.Name)!;

  const byUid = new Map<number, number>();
  const deleted = new Set<number>();
  const count = fixedMeta.getAdjustedItemCount();
  for (let i = FIRST_TASK_INDEX; i < count; i++) {
    const data = fixedData.getByteArrayValue(i);
    if (!data) continue;
    const meta = fixedMeta.getByteArrayValue(i);
    if (!meta || meta.length < 4) continue;
    if ((getInt(meta, 0, 'f') & DELETED_TASK_FLAG) !== 0) {
      if (data.length >= 2) deleted.add(getShort(data, 0, 'd'));
      continue;
    }
    if (data.length === NULL_TASK_BLOCK_SIZE) continue;
    if (data.length < offUid + 4) continue;
    byUid.set(getInt(data, offUid, 'uid'), i);
  }
  for (const uid of deleted) if (byUid.has(uid) && !varMeta.containsKey(uid)) byUid.delete(uid);

  const raws: RawTask[] = [];
  for (const [uid, idx] of byUid) {
    if (uid === 0) continue; // projectsamenvattingstaak — readTasks slaat 'm ook over
    const data = fixedData.getByteArrayValue(idx)!;
    raws.push({
      uniqueId: uid,
      id: data.length >= offId + 4 ? getInt(data, offId, 'id') : uid,
      name: varData.getUnicodeString(uid, nameKey, MAX_TEXT, 'n') || 'Task',
      start: data.length >= offStart + 4 ? getTimestamp(data, offStart, 's') : null,
      finish: data.length >= offFinish + 4 ? getTimestamp(data, offFinish, 'f') : null,
      durationRaw: offDur !== null && data.length >= offDur + 4 ? getInt(data, offDur, 'du') : 0,
      durUnit: offDurUnits !== null && data.length >= offDurUnits + 2 ? getDurationTimeUnits(getShort(data, offDurUnits, 'dun')) : '?',
    });
  }
  raws.sort((a, b) => a.id - b.id);
  return { raws, fieldMap: fm };
}
