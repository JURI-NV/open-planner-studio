// Onafhankelijke her-implementatie van de TBkndTask-scan (fase 3.8, etappe "MSP-pariteit", T1).
//
// T16-VEEGLIJST (herkomstvermelding aangevuld): net als `mppReader.ts`/`mppCalendars.ts`/
// `limits.ts` is de veldkennis in dit bestand (TaskField-id's, `Fixed2Meta`-bit-flags,
// `MPP14Reader.java`-leesvolgorde) afgeleid van de MPXJ-broncode
// (https://github.com/joniles/mpxj, © Jon Iles e.a., LGPL-2.1) — geport naar TypeScript voor
// Open Planner Studio (LGPL-3.0). Test-only (`tests/planning/`), maar wél een EIGEN, tweede poort
// van die veldkennis (zie "BEWUST EEN TWEEDE LUS" hieronder), dus draagt zijn eigen vermelding
// i.p.v. stilzwijgend op de src/-vermelding te leunen.
//
// BEWUST EEN TWEEDE LUS, GEEN HERGEBRUIK VAN `readTasks`. Dit bestand bestaat om `mppFidelity.ts`
// een grondwaarheid te geven die NIET via dezelfde code loopt als de lezer die getoetst wordt
// (`src/services/mpp/mppReader.ts`'s `readTasks`) — een bug in `readTasks` (bv. een verkeerd
// veld-offset, een verkeerde byte-volgorde) zou anders onopgemerkt blijven, want de "grondwaarheid"
// zou dezelfde fout maken. Deze module leest daarom ZELF, met een eigen lus, MS Projects eigen
// opgeslagen `SCHEDULED_START`/`SCHEDULED_FINISH` (TaskField 35/36) rechtstreeks uit `TBkndTask`'s
// `FixedMeta`/`FixedData`.
//
// EERLIJKE REIKWIJDTE VAN "ONAFHANKELIJK" (reviewbevinding L8): dit bestand deelt WEL
// `openMppProject` (dus ook `assertReadable`/CFB-parse/`detectApplicationVersion`/de Props-
// preambule) met `mppReader.ts` — die containerlaag ís de lezer, er bestaat geen tweede manier om
// een CFB-bestand te openen zonder 'm te herschrijven, en een bug dáár zou toch al als een
// leesfout naar voren komen (niet als een stille datumafwijking). Wat WEL onafhankelijk blijft —
// en waar de garantie van deze module om draait — is de TAAK-SCAN zelf: de `FixedMeta`/
// `FixedData`/`VarMeta`/`Var2Data`-lus over `TBkndTask`, de veld-offset-opzoeking en de
// waardedecodering. Deelt UITSLUITEND de laagste-niveau-primitieven (`mppPrimitives.ts`) en de
// veldkaart-opzoeker (`fieldMap14.ts`'s `fixedOffsetOf`/`varDataKeyOf`) — geen enkele aanroep naar
// `readTasks` zelf.
//
// BEKENDE BEPERKING (reviewbevinding L5 — L2/B3, T15-fixronde-iteratie-2): `SCHEDULED_START`/
// `SCHEDULED_FINISH` zijn de door MS Project herberekende datums voor AUTO_SCHEDULED-taken. Een
// HANDMATIG geplande taak (MPXJ `TaskMode.MANUALLY_SCHEDULED`, gelezen als bit-flag in `Fixed2Meta`
// — `PROJECT2010_TASK_META_DATA2_BIT_FLAGS`: offset 8 masker `0x08`; PROJECT2013/2016: offset 8
// masker `0x80`, zie `MPP14Reader.java`) ankert bij MSP op een ANDER veld-paar (`TaskField.START`/
// `FINISH`, veld-id 1283/1284): `MPP14Reader.java` schrijft `SCHEDULED_START` alléén naar
// `task.getStart()` als die nog leeg is, óf de taak AUTO_SCHEDULED is (regel ~1162–1176) — voor een
// manually-scheduled taak met een reeds gezet `Start`-veld blijft het rauwe, ONGESNAPTE `Start`
// dus staan. Deze scan leest dat paar niet apart, dus zo'n taak geeft hier een spookafwijking
// t.o.v. onze eigen (altijd automatisch herberekende) datums.
//
// CORPUSMETING (T15-fixronde-iteratie-2, 2026-08-17) — dit IS een meting, TASK_MODE-ZELF NIET
// (B3-correctie: eerdere formulering suggereerde ten onrechte dat de bit gelezen was). Corpusbrede
// probe op SNET/MSO-constraint-instanten buiten de werkband, op ROOT-taken (geen predecessor — de
// constraint is dan aantoonbaar de enige driver): **1 taak** waar MSP het rauwe constraint-instant
// behoudt (RAW) tegen **5** waar MSP wél naar de eerstvolgende werk-instant snapt (SNAPPED, incl.
// het publieke MPXJ-fixture `mpp14recurring.mpp`) — de RAW-uitzondering deelt kalender/band/
// constraint-tijdstip met een SNAPPED-geval, dus het snap-vs-raw-onderscheid zelf is GEEN
// constraint-semantiek. TASK_MODE (hierboven) is de BEST ONDERBOUWDE HYPOTHESE voor die
// discriminator — bekend byte-level mechanisme, juiste richting van het effect — maar de
// `Fixed2Meta`-bit is voor deze specifieke taken NOOIT daadwerkelijk uitgelezen; er is geen
// bevestiging dat de RAW-taak echt manually-scheduled is. Zie
// `docs/superpowers/plans/2026-08-15-plan-mpp-datumgetrouwheid.md` (§T15, dossier (c)5) voor de
// volledige meting, de hypothese-vs-meting-precisie, en de reden dat dit NIET binnen T15 is
// geïmplementeerd (eigen Fixed2Meta-taakrecordlezer + een nieuw scheduling-mode-concept in de
// solver — een feature, geen kleine tweak, en bovendien op een ongeverifieerde hypothese). Nog niet
// uitgesloten voor toekomstige corpusuitbreiding; eerste vervolgstap is de bit daadwerkelijk lezen.
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
import { MAX_VAR_TEXT_BYTES } from '@/services/mpp/limits';

const TASK_FIXED_META_ITEM_SIZE = 47;
const NULL_TASK_BLOCK_SIZE = 16;
const DELETED_TASK_FLAG = 0x02;
const FIRST_TASK_INDEX = 3;

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
      name: varData.getUnicodeString(uid, nameKey, MAX_VAR_TEXT_BYTES, 'n') || 'Task',
      start: data.length >= offStart + 4 ? getTimestamp(data, offStart, 's') : null,
      finish: data.length >= offFinish + 4 ? getTimestamp(data, offFinish, 'f') : null,
      durationRaw: offDur !== null && data.length >= offDur + 4 ? getInt(data, offDur, 'du') : 0,
      durUnit: offDurUnits !== null && data.length >= offDurUnits + 2 ? getDurationTimeUnits(getShort(data, offDurUnits, 'dun')) : '?',
    });
  }
  raws.sort((a, b) => a.id - b.id);
  return { raws, fieldMap: fm };
}
