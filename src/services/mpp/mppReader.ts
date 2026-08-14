/**
 * Native MPP14-lezer (MS Project 2010–2021), alleen-lezen.
 * Afgeleid van de MPXJ-broncode (https://github.com/joniles/mpxj, © Jon Iles e.a.,
 * LGPL-2.1) — structuurkennis en veldconstanten geport naar TypeScript voor
 * Open Planner Studio (LGPL-3.0).
 *
 * Entry point (T5-T7): `readMPP(bytes, labels) → ImportResult`. Flow: CfbFile → assertReadable
 * (formaatdetectie + wachtwoordpoort, T4) → Props (projecteigenschappen, `"   114"/Props`) →
 * FieldMap14 (T5) → taken uit `"   114"/TBkndTask` (FixedMeta/FixedData + VarMeta/Var2Data,
 * leesvolgorde van `MPP14Reader.processTaskData`) → kalenders uit `"   114"/TBkndCal` (T6,
 * `mppCalendars.ts`) — projectkalender + taak-/resourcekalenders → relaties uit `"   114"/
 * TBkndCons` (T7 — LET OP: dat is MPP-jargon voor RELATIES, niet datumconstraints, zie de
 * T7-sectie hieronder) + resources uit `"   114"/TBkndRsc` + assignments uit `"   114"/TBkndAssn`
 * (T7) — een compleet `ImportResult`, geen placeholders meer.
 *
 * Veldsemantiek is gespiegeld aan `readMSPDI` (mspdiReader.ts) — zelfde afronding voor duur,
 * dezelfde constrainttype-codes (`mspCodeToConstraint`, hergebruikt), dezelfde
 * progress-normalisatie (`normalizeImportedProgress`). Alles blijft DAG-modus (geen uur-modus
 * voor MPP in etappe 1 — de plan-tekst noemt dat expliciet).
 *
 * HIËRARCHIE/parentId — CORRECTIE (T5-spec-review, 2026-08-14): een eerdere versie van dit
 * bestand beweerde dat deze lezer hier bewust van MPXJ afweek door `TaskField.PARENT_TASK_
 * UNIQUE_ID` te negeren ten faveure van een outline-level-stack, en verklaarde de vergelijkings-
 * afwijkingen tegen de ground truth als "staleness" van dat veld. Beide beweringen zijn WEERLEGD
 * door een byte-voor-byte hermeting: `PARENT_TASK_UNIQUE_ID` is in alle drie corpusbestanden
 * 100% consistent met de outline-level-stack (0 verschillen op 51/134/215 taken — geen enkele
 * interne tegenstrijdigheid). Belangrijker: MPXJ's `MPP14Reader.processTaskData` vult
 * `m_parentTasks` wél (`m_parentTasks.put(task.getUniqueID(), PARENT_TASK_UNIQUE_ID)`), maar
 * leest die map NERGENS terug voor de hiërarchie — `ProjectFile.updateStructure()` (aangeroepen
 * door `MPPReader.read()` ná alle per-variant-lezers) bouwt de boom uit de taken GESORTEERD OP
 * ID, met het outline-level als enige dieptesignaal. Dat is EXACT wat deze lezer doet: de
 * outline-level-stack hieronder is dus geen vereenvoudiging t.o.v. MPXJ, maar de letterlijke
 * poort van hoe MPXJ het zelf doet.
 *
 * De WERKELIJKE oorzaak van de vergelijkingsafwijkingen tegen de MSPDI-ground-truth (zie de
 * T5-sectie van `tests/planning/check-mpp-import.ts` voor de volledige onderbouwing): de drie
 * `.mpp.xml`-bestanden zijn een ANDERE DOCUMENTVERSIE/-revisie dan de bijbehorende `.mpp`'s, geen
 * export van exact dezelfde staat. Signalen: alle drie XML's hebben compact herNUMMERDE UID==ID
 * 1..N (een echte MSPDI-export van dezelfde live state behoudt de bestaande unique-ID's, die zijn
 * na jaren editen nooit toevallig weer 1..N op een rij) — 27 van de 51 `.mpp`-unique-ID's in
 * bijlage 13 komen zelfs helemaal niet voor in die getallenreeks; taken zijn verplaatst (een
 * cut/paste-handtekening, niet een los "vergeten te herberekenen"-veld); en de projectstartdatum
 * van bijlage 7 verschilt ronduit tussen de twee bestanden (`.mpp` 2025-12-19 vs. `.mpp.xml`
 * 2025-12-08). Dat is een brongegeven van het corpus, niet iets een lezer kan overbruggen — zie de
 * per-veld-budgetten in `check-mpp-import.ts` voor de gemeten omvang per bestand.
 *
 * `task.getStart()`/`getFinish()` in MPP14Reader kan, voor HANDMATIG-geplande taken, afwijken van
 * `SCHEDULED_START`/`SCHEDULED_FINISH` (het veld dat déze lezer gebruikt) — MPXJ leest beide
 * (`TaskField.START` op een apart veld-id, 1283/1284) en kiest per taak op basis van de taakmodus
 * (auto/handmatig, een boolean die zelf weer in Fixed2Meta zit — buiten T5's veldenlijst). Voor
 * auto-geplande taken (de meerderheid in normale bestanden) is SCHEDULED_START/-FINISH exact de
 * datum die ook in de UI staat, dus dit blijft een bewuste, beperkte vereenvoudiging.
 *
 * Twee VERDER niet-geporte MPXJ-kwaliteitsfilters (T5-spec-review, 4c) — bewuste, gedocumenteerde
 * vereenvoudiging, geen bug: MPP14Reader's `createTaskMap` accepteert een taakrecord alleen als
 * (a) het bijbehorende `Fixed2Data`-record (via een heuristisch-gedimensioneerde `Fixed2Meta`,
 * kandidaten 92–96 bytes) ook niet-`null` is, én (b) de FixedData-recordlengte minstens 75% van
 * `fieldMap.getMaxFixedDataSize(0)` beslaat (het werkelijke maximale offset+grootte over ALLE
 * ~100 taakvelden in het bestand, niet alleen T5's kleine subset — dat maximum is met de huidige
 * veldenlijst niet betrouwbaar te berekenen). Deze lezer laat beide filters weg: de eenvoudiger
 * validatie (verwijderd-vlag + null-taak-grootte + spooktaak-check via VarMeta, zie
 * `collectValidTaskIndices`) haalt al taakaantal-pariteit (51/134/215) op alle drie ground-truth-
 * bestanden. Mocht een bredere corpuslezing (T9's crawl-smoke, 49 bestanden zonder ground truth)
 * ooit een telling laten afwijken, dan is dát het signaal om `Fixed2Data`/`getMaxFixedDataSize`
 * alsnog te porten — tot dan is dit een bewust uitgestelde uitbreiding, geen gat.
 */
import type { Project } from '@/types/project';
import type { Task, TaskConstraint } from '@/types/task';
import type { Sequence } from '@/types/sequence';
import type { Resource, ResourceAssignment, ResourceType } from '@/types/resource';
import type { ImportLabels, ImportResult } from '@/services/importTypes';
import { generateId } from '@/utils/id';
import { formatDate } from '@/utils/dateUtils';
import { normalizeImportedProgress } from '@/services/importNormalize';
import { tenthsOfMinutesToDays } from '@/services/importDurations';
import { mspCodeToConstraint, mspTypeToSequenceType } from '@/services/msproject/mspdiReader';
import { CfbFile } from './cfb';
import { assertReadable, detectApplicationVersion, Props } from './mppContainer';
import {
  FixedData, FixedMeta, Var2Data, VarMeta12,
  getDouble, getDuration, getDurationTimeUnits, getInt, getShort, getTimestamp, getUnicodeString,
} from './mppPrimitives';
import {
  AssignmentFieldId, ResourceFieldId, TaskFieldId,
  createAssignmentFieldMap, createResourceFieldMap, createTaskFieldMap,
  fixedOffsetOf, varDataKeyOf, type FieldMapTable,
} from './fieldMap14';
import { readCalendars, type CalendarReadResult } from './mppCalendars';
import { MAX_VAR_TEXT_BYTES } from './limits';

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

/**
 * C1 (T5-kwaliteitsreview, kritiek): het RUWE outline-level-veld (SHORT, 0..65535) stuurt zowel de
 * stackdiepte in `assignHierarchyAndWbs` als de lengte van de gegenereerde WBS-string
 * ("1.1.1. … .1", één segment per niveau) — ONGEKLEMD is dat een kwadratische geheugen-/tijdbom:
 * bij N taken met STRIKT OPLOPEND outline-level groeit de totale WBS-tekst O(N²) (elke taak op
 * niveau k draagt een string van O(k) tekens, gesommeerd over N ≈ N² tekens). Gemeten
 * (kwaliteitsreview): 20.000 strikt-oplopende niveaus (≈ 2 MB aan `.mpp`-invoer) gaf 461 MB
 * piekgeheugen en 2,3 s; 65.535 niveaus (het theoretische maximum van een SHORT) zou ≈ 5 GB geven.
 * Een geprepareerd bestand kan dit bewust forceren — dit is dus geen randgeval, maar een
 * hardingsvereiste net als de CFB-/VarMeta-klemmen elders in deze module (`collectValidTaskIndices`,
 * `mppPrimitives.ts`'s VarMeta12-clamp).
 *
 * `MAX_OUTLINE_LEVEL = 256` is de klem: ruim boven elke realistische WBS-diepte (het corpus gaat
 * niet voorbij één cijfer), maar laag genoeg om zowel de stackdiepte als de WBS-stringlengte per
 * taak hard te begrenzen — de totale kost wordt zo O(N × 256), lineair in N. Taken die dieper
 * zouden zitten dan de klem worden SIBLINGS op de klemdiepte (ze delen dezelfde geklemde
 * `outlineLevel`, dus de stack behandelt ze als broers/zussen op niveau 256 i.p.v. eindeloos door
 * te nesten) — een leesbaar, voorspelbaar degradatiepatroon voor een pathologisch bestand, in
 * plaats van een OOM-crash.
 */
export const MAX_OUTLINE_LEVEL = 256;

/** Klemt een ruw outline-level (SHORT, mogelijk 0 of tot 65535) naar `[1, MAX_OUTLINE_LEVEL]` —
 *  zie `MAX_OUTLINE_LEVEL`'s toelichting hierboven. Losse, geëxporteerde functie (i.p.v. inline in
 *  `readTasks`) zodat `check-mpp-import.ts` de klemgrenzen rechtstreeks kan testen zonder een
 *  volledig CFB-bestand te hoeven bouwen. */
export function clampOutlineLevel(raw: number): number {
  return Math.min(Math.max(raw, 1), MAX_OUTLINE_LEVEL);
}

/**
 * I1 (T5-kwaliteitsreview, kritiek): var-data-tekst (taaknaam, WBS-tekst) kan door MEERDERE
 * unique-ID's naar DEZELFDE gedeelde Var2Data-offset wijzen (legitiem, zie `Var2Data`'s
 * moduleheader in mppPrimitives.ts: "offsets kunnen herhalen wanneer items gededupliceerde
 * var-data delen"). Zonder een bovengrens kost het uitlezen van zo'n gedeelde string O(werkelijke
 * lengte) per taak die 'm deelt — bij N taken die naar één grote (bv. 500 KB) string wijzen dus
 * O(N × S). Gemeten (kwaliteitsreview): 1.000 taken × 500 KB gedeelde string ≈ 3,0 s. Deze
 * bovengrens (in BYTES, vóór UTF-16-decodering) wordt doorgegeven aan `Var2Data.getUnicodeString`,
 * die 'm weer doorgeeft aan `getUnicodeString` in mppPrimitives.ts — de scan-lus daar is zelf ook
 * door deze grens begrensd (niet alleen het eindresultaat), dus de kostenbovengrens is nu
 * O(N × MAX_VAR_TEXT_BYTES), lineair in N. 64 KiB is ruim boven elke realistische taaknaam/WBS-
 * tekst (het corpus blijft ver onder 1 KB), maar begrenst een geprepareerd bestand hard.
 *
 * Testdekking (T5-slot, precisering): alleen het PRIMITIEF is met een fixture gepind —
 * `check-mpp-import.ts`'s I1-regressietest roept `Var2Data.getUnicodeString(..., maxLength, ctx)`
 * rechtstreeks aan met een 400.000-byte gedeelde string en bewijst dat `maxLength` daar zowel het
 * resultaat als de scan-kosten begrenst. Dat `readTasks` hieronder dit primitief ook daadwerkelijk
 * met `MAX_VAR_TEXT_BYTES` aanroept (i.p.v. zonder grens) is NIET los end-to-end gepind: een
 * >64 KiB-var-data-stream past bewust niet door `buildNestedCfb`'s mini-stream-only-bouwer
 * (>4096 bytes per stream, zie mppFixtures.ts), dus die specifieke callsite-regressie steunt op
 * code-review-discipline (de aanroepen hieronder gebruiken zichtbaar `MAX_VAR_TEXT_BYTES`, geen
 * kale `varData.getUnicodeString(uniqueId, key)` zonder derde argument) in plaats van een
 * geautomatiseerde guard.
 *
 * T6-kwaliteitsreview (minor M4): deze constante woont sinds T6 in `./limits.ts` (bladmodule,
 * gedeeld met `mppCalendars.ts` — die had voorheen noodgedwongen een eigen kopie, want een
 * omgekeerde import vanuit `mppCalendars.ts` naar déze module zou een cyclus geven). Hier alleen
 * ge-re-importeerd zodat de rest van dit bestand ongewijzigd `MAX_VAR_TEXT_BYTES` kan blijven
 * gebruiken.
 */

/** Milestone-vlag: `MppBitFlag(TaskField.MILESTONE, offset, mask, ...)` uit MPP14Reader.java's
 *  `PROJECT20xx_TASK_META_DATA_BIT_FLAGS`-tabellen. Voor déze lezer is alleen de MILESTONE-regel
 *  nodig (de rest van die tabellen — FLAG1..20, MARKED, ROLLUP, … — valt buiten T5's veldenlijst).
 *  Project 2013 en 2016+ delen dezelfde milestone-offset/-mask (alleen andere, voor ons
 *  irrelevante velden verschillen tussen die twee), dus twee gevallen volstaan: ≤2010 vs. 2013+.
 *  ONBEKENDE versie (`detectApplicationVersion` gaf `null`) valt terug op de 2010-TABEL, niet de
 *  moderne (T5-spec-review, 4a — correctie t.o.v. een eerdere versie die hier de moderne tabel
 *  koos): MPXJ leest de versie via `NumberHelper.getInt(m_file.getProjectProperties().
 *  getApplicationVersion())`, en `NumberHelper.getInt(null)` levert `0` — `0 <= PROJECT_2010 (14)`
 *  is dus waar, en MPXJ valt zelf terug op de 2010-tabel, niet op 2013+. Corpus-geverifieerd
 *  levert alle drie bestanden altijd een echte versie op ("Microsoft.Project 16.0"), dus dit pad
 *  raakt het corpus niet — het is puur voor MPXJ-trouw bij een onherkenbare/afwezige versiestring
 *  in een ander bestand. */
function milestoneBitFlag(applicationVersion: number | null): { offset: number; mask: number } {
  const version = applicationVersion ?? 0; // MPXJ: NumberHelper.getInt(null) === 0
  return version <= 14
    ? { offset: 8, mask: 0x20 } // PROJECT2010_TASK_META_DATA_BIT_FLAGS
    : { offset: 10, mask: 0x02 }; // PROJECT2013_/PROJECT2016_TASK_META_DATA_BIT_FLAGS
}

interface RawTaskRecord {
  uniqueId: number;
  id: number;
  /** Al geklemd via `clampOutlineLevel` (C1) — nooit de rauwe SHORT-waarde. */
  outlineLevel: number;
  /** Expliciet door de gebruiker ingevoerde WBS-tekst, `null` als afwezig (het gebruikelijke
   *  geval, zie de toelichting bij `storedWbs` hierboven) — de outline-level-stack hieronder
   *  genereert dan zelf een WBS-code, net als MPXJ's `updateStructure()`. */
  storedWbs: string | null;
  task: Task;
}

/** Structurele ondergrens voor `assignHierarchyAndWbs` — bewust NIET de volledige `Task`, zodat
 *  een test duizenden lichte fixture-objecten kan bouwen zonder de hele `Task`-vorm (tijdvelden,
 *  resourceIds, …) te hoeven vullen (T5-kwaliteitsreview, I4/C1-regressie). Een echte `Task` is
 *  hier structureel altijd geldig, dus `readTasks` geeft 'm gewoon door. */
interface HierarchyTaskLike {
  id: string;
  parentId: string | null;
  childIds: string[];
  wbsCode: string;
}

/**
 * Hiërarchie via een outline-level-stack, GESORTEERD OP ID — dit is letterlijk hoe MPXJ's
 * `updateStructure()` het zelf doet (zie de moduleheader; `PARENT_TASK_UNIQUE_ID` wordt door MPXJ
 * gevuld maar nooit voor de boom gelezen). Genereert tegelijk de WBS-code als outline-nummering
 * ("1", "1.1", "1.2.1", …) over diezelfde boom — MPXJ doet dat ook zelf in `updateStructure()`,
 * want MPP slaat een auto-WBS niet op (zie de toelichting bij `storedWbs` in `RawTaskRecord`). Een
 * EXPLICIET door de gebruiker ingevoerde WBS-tekst (zeldzaam, corpus: nooit waargenomen) wint van
 * de gegenereerde vorm.
 *
 * Losse, geëxporteerde functie (T5-kwaliteitsreview, I2/C1) — `readTasks` roept 'm aan met de
 * echte `RawTaskRecord[]`, `check-mpp-import.ts`'s C1-regressietest met duizenden lichte
 * `HierarchyTaskLike`-fixtures (zie hierboven) om te bewijzen dat de klem in `clampOutlineLevel`
 * de kwadratische blowup daadwerkelijk voorkomt, zonder een navenant grote CFB-fixture te hoeven
 * bouwen. Verwacht `entries` al gesorteerd op `id` (de aanroeper doet dat). Muteert
 * `entries[i].task` in-place; retourneert niets.
 */
export function assignHierarchyAndWbs<T extends HierarchyTaskLike>(
  entries: { outlineLevel: number; storedWbs: string | null; task: T }[],
): void {
  const stack: { task: T; wbs: string; level: number; childCount: number }[] = [];
  let rootCount = 0;
  for (const rec of entries) {
    while (stack.length > 0 && stack[stack.length - 1].level >= rec.outlineLevel) stack.pop();
    const parent = stack[stack.length - 1];
    let generatedWbs: string;
    if (parent) {
      parent.childCount++;
      generatedWbs = `${parent.wbs}.${parent.childCount}`;
      rec.task.parentId = parent.task.id;
      parent.task.childIds.push(rec.task.id);
    } else {
      rootCount++;
      generatedWbs = `${rootCount}`;
    }
    rec.task.wbsCode = rec.storedWbs || generatedWbs;
    // I2/C1-restpunt: geen los `id`-veld meer op de stack-entry (dood veld — alleen `task.id` werd
    // ooit gelezen, via `parent.task.id` hierboven).
    stack.push({ task: rec.task, wbs: generatedWbs, level: rec.outlineLevel, childCount: 0 });
  }
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
    // Null-taak-plaatshouder: MPXJ VOEGT deze wél toe aan `m_file` (`task.setNull(true)`, met de
    // ID/unique-ID uit de 16 bytes) — puur om ID-CONTINUÏTEIT te bewaren voor latere taken in
    // dezelfde iteratie (bookkeeping, zie `m_nullTaskOrder`). Zo'n plaatshouder is nooit zichtbaar
    // in de UI en dus ook nooit in een native XML-export, dus deze lezer slaat 'm bewust over i.p.v.
    // 'm als onzichtbare taak te materialiseren. VERKLAART wél de ID-gaten die je in bijlage 7 kunt
    // tegenkomen als je ruw door TBkndTask/FixedData loopt (T5-spec-review, 4b) — dat zijn geen
    // ontbrekende/foutief-uitgesloten taken, maar precies deze plaatshouders.
    if (data.length === NULL_TASK_BLOCK_SIZE) continue;

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

/** Percent complete: SHORT, 0..100 direct (MPPUtility.getPercentage) — buiten dat bereik ⇒ 0
 *  (spiegelt de Java-bron: een ongeldige waarde levert daar `null`, hier de neutrale 0). */
function readPercentComplete(data: Uint8Array, offset: number | null): number {
  if (offset === null || data.length < offset + 2) return 0;
  const raw = getShort(data, offset, 'TBkndTask percentComplete');
  return raw >= 0 && raw <= 100 ? raw : 0;
}

function readDateField(data: Uint8Array, offset: number | null, ctx: string): string | undefined {
  if (offset === null || data.length < offset + 4) return undefined;
  const ts = getTimestamp(data, offset, ctx);
  return ts ? formatDate(ts) : undefined;
}

/** I2 (T5-kwaliteitsreview) — vervangt de vijf losse positionele parameters die `readTasks` eerst
 *  had; T6/T7 breiden dit uit i.p.v. de parameterlijst nog verder te laten groeien. */
interface ReadTasksContext {
  cfb: CfbFile;
  taskFieldMap: FieldMapTable;
  hoursPerDay: number;
  statusDate: string | undefined;
  applicationVersion: number | null;
}

/** I2 (T5-kwaliteitsreview) — bereidt de returnvorm voor op T6/T7:
 *  - `taskIdByUniqueId`: T7's TBkndCons-relaties en TBkndAssn-assignments verwijzen naar taken via
 *    hun MPP-uniqueID, niet via het gegenereerde `Task.id` — deze map is precies de vertaling die
 *    daarvoor nodig is (spiegelt mspdiReader's `uidToId`).
 *  - `calendarUniqueIdByTaskId`: de rauwe `TaskField.CALENDAR_UNIQUE_ID`-waarde per taak (al hier
 *    gelezen, zie `TaskFieldId.CalendarUniqueId`), zodat T6 'm — ná het bouwen van de echte
 *    kalenders — kan vertalen naar `Task.calendarId`. T5 zelf doet niets met deze twee maps (er is
 *    nog geen kalender-/relatielaag om ze tegen te gebruiken), `readMPP` haalt er nu alleen
 *    `tasks` uit. */
interface ReadTasksResult {
  tasks: Task[];
  taskIdByUniqueId: Map<number, string>;
  calendarUniqueIdByTaskId: Map<string, number>;
}

function readTasks(ctx: ReadTasksContext): ReadTasksResult {
  const { cfb, taskFieldMap, hoursPerDay, statusDate, applicationVersion } = ctx;
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
  const calendarUniqueIdOffset = fixedOffsetOf(taskFieldMap, TaskFieldId.CalendarUniqueId);
  const nameKey = varDataKeyOf(taskFieldMap, TaskFieldId.Name);
  const wbsKey = varDataKeyOf(taskFieldMap, TaskFieldId.Wbs);

  // Harde veldmap-check (T5-kwaliteitsreview-minor): UNIQUE_ID/ID alleen was te zwak — een
  // taaklijst zonder NAME (var-data) of zonder SCHEDULED_START/FINISH (fixed-data) is geen
  // leesbaar bestand maar een mis-parse (bv. de verkeerde `TASK_FIELD_MAP`/`TASK_FIELD_MAP2`-
  // sleutel gebruikt, of I3's alles-of-niets-terugval trof een field map die dit specifieke veld
  // simpelweg niet bevat) — beter hard falen dan stilzwijgend taken zonder naam/datum opleveren.
  if (uniqueIdOffset === null || idOffset === null || nameKey === null || scheduledStartOffset === null || scheduledFinishOffset === null) {
    throw new Error('MPP: taak-veldmap mist UNIQUE_ID/ID/NAME/SCHEDULED_START/SCHEDULED_FINISH — kan taken niet betrouwbaar lezen');
  }

  const validIndices = collectValidTaskIndices(fixedMeta, fixedData, varMeta, uniqueIdOffset);
  const { offset: msOffset, mask: msMask } = milestoneBitFlag(applicationVersion);

  const taskIdByUniqueId = new Map<number, string>();
  const calendarUniqueIdByTaskId = new Map<string, number>();

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
    const outlineLevel = clampOutlineLevel(outlineLevelRaw); // C1

    const name = varData.getUnicodeString(uniqueId, nameKey, MAX_VAR_TEXT_BYTES, 'TBkndTask name') || 'Task';
    // WBS-veld (T5-spec-review, 3): MPP slaat een AUTO-genereerde WBS-code niet op — het var-data-
    // veld is in het corpus voor elke taak leeg. MPXJ genereert 'm zelf in `updateStructure()`
    // (outline-nummering "1.2.3" over de afgeleide hiërarchie); `assignHierarchyAndWbs` spiegelt
    // dat verderop — hier alleen een EXPLICIETE, door de gebruiker ingevoerde WBS-tekst vasthouden
    // (`storedWbs`), zodat een bestand dat 'm wél draagt die overschrijft i.p.v. altijd de
    // gegenereerde vorm te forceren. `MAX_VAR_TEXT_BYTES` (I1) begrenst ook hier het scan-/
    // decodeerwerk, net als bij `name`.
    const storedWbs = wbsKey !== null ? varData.getUnicodeString(uniqueId, wbsKey, MAX_VAR_TEXT_BYTES, 'TBkndTask wbs') : null;

    const start = readDateField(data, scheduledStartOffset, 'TBkndTask scheduledStart') ?? formatDate(new Date());
    const finish = readDateField(data, scheduledFinishOffset, 'TBkndTask scheduledFinish') ?? start;

    const durationRaw = durationOffset !== null && data.length >= durationOffset + 4
      ? getInt(data, durationOffset, 'TBkndTask duration')
      : 0;
    // `tenthsOfMinutesToDays` (T7-kwaliteitsreview M2: gedeeld met mspdiReader.ts, zie
    // importDurations.ts) — dezelfde afrondingssemantiek als `parseMSPDuration` in mspdiReader.ts
    // (`Math.round(minuten / (hoursPerDay*60))`). Vereenvoudiging (gedocumenteerd, T5-rapport): geen
    // onderscheid elapsed-vs-werktijd-eenheden (`DurationUnits`-veld) — mspdiReader's dag-modus-pad
    // maakt dat onderscheid ook niet.
    const duration = tenthsOfMinutesToDays(durationRaw, hoursPerDay);

    const isMilestone = !!metaItem && metaItem.length >= msOffset + 4
      && (getInt(metaItem, msOffset, 'TBkndTask milestone-flag') & msMask) !== 0;

    let constraint: TaskConstraint | undefined;
    if (constraintTypeOffset !== null && data.length >= constraintTypeOffset + 2) {
      const code = getShort(data, constraintTypeOffset, 'TBkndTask constraintType');
      const mapped = mspCodeToConstraint(code);
      if (mapped) {
        const constraintDate = readDateField(data, constraintDateOffset, 'TBkndTask constraintDate');
        constraint = {
          type: mapped.type,
          ...(mapped.hard ? { hard: true } : {}),
          ...(constraintDate ? { date: constraintDate } : {}),
        };
      }
    }
    const deadline = readDateField(data, deadlineOffset, 'TBkndTask deadline');
    const percentComplete = readPercentComplete(data, percentCompleteOffset);
    const actualStart = readDateField(data, actualStartOffset, 'TBkndTask actualStart');
    const actualFinish = readDateField(data, actualFinishOffset, 'TBkndTask actualFinish');

    let status: 'NOT_STARTED' | 'STARTED' | 'COMPLETED' = 'NOT_STARTED';
    if (percentComplete >= 100) status = 'COMPLETED';
    else if (percentComplete > 0) status = 'STARTED';

    const task: Task = {
      id: generateId('task'),
      name,
      description: '',
      wbsCode: '', // wordt hieronder gezet — outline-nummering volgt pas ná de hiërarchie-opbouw
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
    records.push({ uniqueId, id, outlineLevel, storedWbs, task });
    taskIdByUniqueId.set(uniqueId, task.id);

    // CALENDAR_UNIQUE_ID: -1 (of ontbrekend veld) = geen taak-kalender-override, spiegelt
    // MPP14Reader.java's `calendarID.intValue() == -1 ⇒ task.setCalendarUniqueID(null)` — alleen
    // een echte (≥0) waarde komt in de map terecht, T6 vertaalt 'm naar `Task.calendarId`.
    const calendarUniqueIdRaw = calendarUniqueIdOffset !== null && data.length >= calendarUniqueIdOffset + 4
      ? getInt(data, calendarUniqueIdOffset, 'TBkndTask calendarUniqueId')
      : -1;
    if (calendarUniqueIdRaw >= 0) calendarUniqueIdByTaskId.set(task.id, calendarUniqueIdRaw);
  }

  // ID-volgorde = zowel de Gantt-/rijvolgorde die MS Project's eigen XML-export gebruikt, als
  // exact wat MPXJ's `ProjectFile.updateStructure()` zelf doet om de boom op te bouwen (zie
  // moduleheader) — nodig voor de outline-level-stack-hiërarchie in `assignHierarchyAndWbs`.
  records.sort((a, b) => a.id - b.id);
  assignHierarchyAndWbs(records);

  const tasks = records.map((r) => r.task);
  normalizeImportedProgress(tasks, statusDate);
  return { tasks, taskIdByUniqueId, calendarUniqueIdByTaskId };
}

/** `parseProjectProperties`'s resultaat — `calendarHoursPerDayOverride` is `null` wanneer
 *  MINUTES_PER_DAY afwezig/ongeldig was (zie de klem-toelichting bij `hoursPerDay` hieronder): in
 *  dat geval blijft de kalender se EIGEN, uit haar werktijd-banden afgeleide `hoursPerDay` staan
 *  (T6) i.p.v. die blind te overschrijven met de 8-uursdag-terugval die `hoursPerDay` zelf gebruikt
 *  voor de taakduur-afronding — spiegelt mspdiReader's `if (minutesPerDay > 0) calendar.hoursPerDay
 *  = ...` (alleen overschrijven als de projecteigenschap ECHT aanwezig was). */
function parseProjectProperties(
  props: Props,
  labels: ImportLabels | undefined,
): { project: Project; hoursPerDay: number; calendarHoursPerDayOverride: number | null } {
  const titleBytes = props.getByteArray(PROPS_KEY_TITLE);
  const name = (titleBytes ? getUnicodeString(titleBytes, 0, MAX_VAR_TEXT_BYTES, 'Props title') : '') || labels?.importedProject || 'MS Project Import';

  const startBytes = props.getByteArray(PROPS_KEY_PROJECT_START_DATE);
  const finishBytes = props.getByteArray(PROPS_KEY_PROJECT_FINISH_DATE);
  const startDate = startBytes && startBytes.length >= 4 ? getTimestamp(startBytes, 0, 'Props startDate') : null;
  const finishDate = finishBytes && finishBytes.length >= 4 ? getTimestamp(finishBytes, 0, 'Props finishDate') : null;

  // minutesPerDay-klem (T5-kwaliteitsreview-minor): een dag heeft hoogstens 1440 minuten — zonder
  // bovengrens zou een corrupt/hostile Props-veld een absurde `hoursPerDay` (en dus een absurde
  // duur-in-dagen-afronding, zie `tenthsOfMinutesToDays`) kunnen opleveren i.p.v. netjes op
  // de 8-uursdag-default terug te vallen.
  const minutesPerDay = props.getInt(PROPS_KEY_MINUTES_PER_DAY);
  const minutesPerDayValid = minutesPerDay > 0 && minutesPerDay <= 1440;
  const hoursPerDay = minutesPerDayValid ? minutesPerDay / 60 : 8;

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
  const statusDate = statusBytes && statusBytes.length >= 4 ? getTimestamp(statusBytes, 0, 'Props statusDate') : null;
  if (statusDate) project.statusDate = formatDate(statusDate);

  return { project, hoursPerDay, calendarHoursPerDayOverride: minutesPerDayValid ? hoursPerDay : null };
}

// ═══════════════════════════════════════════════════════════════════════════════════════════
// T7 — relaties (TBkndCons), resources (TBkndRsc) en assignments (TBkndAssn).
//
// LET OP DE NAAMSVERWARRING uit het plan: "constraints" is in MPP-bestandsjargon TBkndCons =
// de RELATIE-/link-data (`ConstraintFactory.java`) — taak-DATUMconstraints kwamen al uit het
// taak-fieldmap in T5 (`TaskFieldId.ConstraintType`/`ConstraintDate`). Poort-bronnen:
// `ConstraintFactory.java` (relaties), `MPP14Reader.java`'s `createResourceMap`/
// `processResourceData` (resources) en `ResourceAssignmentFactory.java` (assignments).
//
// Alle drie functies volgen `readCalendars`'s I1-les (T6-kwaliteitsreview): een dunne, ALTIJD-
// vangende wrapper rond de eigenlijke `*Unsafe`-implementatie — een kapotte/afwezige backend-
// storage voor relaties/resources/assignments mag `readMPP` niet laten falen, taken en kalenders
// zijn dan al gelezen en blijven bruikbaar. Anders dan calendars is de terugval hier een lege
// array (geen "generieke default"-equivalent nodig — een lege relatie-/resource-/assignmentlijst
// is een geldig, leeg `ImportResult`-onderdeel, spiegelt `readCSV` voor formaten zonder die data).
//
// BEWUSTE ASYMMETRIE (T7-kwaliteitsreview, M5) t.o.v. T5's `readTasks`: die gooit HARD zodra de
// taak-veldmap UNIQUE_ID/ID/NAME/SCHEDULED_START/SCHEDULED_FINISH mist (taken zonder naam/datum
// zijn geen leesbaar bestand maar een mis-parse), terwijl `readResourcesUnsafe`/
// `readAssignmentsUnsafe` hierboven bij een onvolledige veldmap stil een LEGE lijst teruggeven i.p.v.
// te gooien. Geen inconsistentie: taken zijn de RUGGENGRAAT van het document (zonder taken is er
// niets zinvols te tonen), relaties/resources/assignments zijn AANVULLEND — een deelresultaat (taken
// + kalenders, zonder relaties/resources) is voor de gebruiker bruikbaarder dan de hele import te
// laten falen op een veld dat deze etappe toevallig niet kent.
//
// TWEE VERDERE, ongenoemde MPXJ-afwijkingen (T7-spec-review, B6) — bewust, gedocumenteerd, en
// GEMETEN als 0-voorkomens over het volledige beschikbare materiaal (drie ground-truth-bestanden +
// 49-bestand-crawl, 52 bestanden/650 assignments samen, T7-spec-review-meting 2026-08-14):
//  (a) `ResourceAssignmentFactory.java` vult een TE KORT assignment-FixedData-record aan met
//      nullbytes tot `fieldMap.getMaxFixedDataSize(0)` vóórdat het de velden leest (`if (data.length
//      < fieldMap.getMaxFixedDataSize(0)) { newData = new byte[maxSize]; arraycopy(data, newData); }
//      data = newData;`). `readAssignmentsUnsafe` doet dat niet — elk per-veld-`data.length`-check
//      hierboven (bv. `data.length >= unitsOffset + 8`) slaat een veld gewoon over/default'', i.p.v.
//      het transparant als nullen te lezen. Op elk bestand in dit corpus+crawl is `TBkndAssn/
//      FixedData` se lengte een EXACT veelvoud van 110 bytes (`FixedData.withoutMeta`'s itemSize),
//      dus deze situatie doet zich hier nooit voor — een toekomstig bestand met een afgekapte
//      laatste record zou wél verschillend gedrag kunnen zien (deze lezer laat 'm dan gewoon
//      onvolledig/overgeslagen, i.p.v. de MPXJ-nulvulling).
//  (b) `ResourceAssignmentFactory.java` dedupliceert: `if (task.getExistingResourceAssignment
//      (resource) != null) continue;` — een taak+resource-paar dat MEERDERE malen in TBkndAssn
//      voorkomt, levert bij MPXJ maar ÉÉN `ResourceAssignment`. `readAssignmentsUnsafe` dedupliceert
//      niet — elk geldig record wordt een eigen `ResourceAssignment`, ook bij een herhaald paar.
//      Over alle 52 beschikbare bestanden komt geen enkel taak+resource-paar dubbel voor (gemeten:
//      0 van 650), dus dit verschil is hier onobserveerbaar — een bestand waarin een gebruiker
//      dezelfde resource tweemaal aan dezelfde taak toewijst (bv. via een editor-bug of handmatige
//      TBkndAssn-manipulatie) zou hier WEL twee assignments opleveren i.p.v. MPXJ's ene.
//
// DUPLICAAT-OFFSET-AMPLIFICATIE (T7-kwaliteitsreview, M8): net als T5's I1 voor Var2Data al
// vaststelde, kost een gedeelde/dubbele offset hier hoogstens INPUT-LINEAIRE tijd — elke duplicaat-
// verwijzing (VarMeta se dedup bij resourcenamen, of TBkndCons/TBkndAssn se `FixedData.
// getIndexFromOffset`) triggert precies één O(1)-lookup (mppPrimitives.ts se I2-hardening), geen
// amplificatie — dus bewust GEEN aparte klem hier, binnen hetzelfde precedent als T5.
// ═══════════════════════════════════════════════════════════════════════════════════════════

/** TBkndCons/FixedMeta-itemgrootte (ConstraintFactory.java: `new FixedMeta(..., 10)`). */
const CONS_FIXED_META_ITEM_SIZE = 10;
/** TBkndCons/FixedData-itemgrootte — ALTIJD 20, ongeacht wat de meta zelf rapporteert
 *  (ConstraintFactory.java: `new FixedData(consFixedMeta, 20, ...)`, de `withItemSizeOverride`-
 *  variant van `FixedData`, zie mppPrimitives.ts se moduleheader "meta's itemSize is fout"). */
const CONS_FIXED_DATA_ITEM_SIZE = 20;

/**
 * Ruwe TBkndCons-lag (tienden-van-minuut, MPPUtility.getDuration se javadoc: "value is given in
 * 1/10 of minute" — ONGEACHT welke eenheidscode `unitCode` claimt) + eenheidscode →
 * `Sequence`-lagvelden. Spiegelt mspdiReader's lag-afhandeling (spiegelplicht, T7-taaktekst) maar
 * vanuit MPP se eigen eenheidscodering (`getDurationTimeUnits`, mppPrimitives.ts):
 *  - percent/elapsedPercent: /10 — T7-spec-review (B2), BESLUIT: `mspdiReader.ts` behandelt
 *    `LinkLag` bij LagFormat 19/20 als TIENDEN VAN EEN PROCENT (`seq.lagPercent = link.lag / 10`,
 *    zie de `ELAPSED_DURATION_FORMATS`-sectie daar en `mspdiWriter.ts`'s spiegelbeeldige
 *    `Math.round(seq.lagPercent * 10)` — een round-trip-consistent, project-eigen domeinconventie).
 *    MPXJ se eigen `ConstraintFactory`/`MPPUtility.getDuration` laat de MPP-ruwe waarde voor
 *    percent-eenheden ONGESCHAALD (geen /10) — maar MPXJ se `MSPDIReader.java` doet dat ZELF óók
 *    (`Duration.getInstance(lag, lagUnits)` zonder /10 voor `TimeUnit.PERCENT`); dat is dus geen
 *    signaal dat de MPP- en MSPDI-schaal VERSCHILLEN, alleen dat MPXJ se eigen `Duration`-model de
 *    schaal niet normaliseert. Om beide OPS-lezers dezelfde domeinsemantiek (HELE procenten in
 *    `Sequence.lagPercent`) te laten leveren, past deze functie dezelfde /10 toe als mspdiReader.ts
 *    — vóór deze fix gaf een percent-lag hier 100× de waarde die mspdiReader voor eenzelfde
 *    LinkLag-getal zou leveren (T7-spec-review, B2).
 *  - elke andere "elapsed"-variant (minuten/uren/dagen/weken/maanden delen allemaal dezelfde ruwe
 *    tienden-van-minuut-basis): kalenderdag-omrekening via `getDuration(rawLag, 'elapsedDays')`
 *    (mppPrimitives.ts — T7-kwaliteitsreview M1: hergebruikt i.p.v. een losse `rawLag/10/60/24`-
 *    inline-formule; `getDuration`'s `elapsedDays`-tak deelt door 14400 = 24*60*10, wiskundig
 *    identiek), afgerond op hele dagen — identiek aan mspdiReader's ELAPSED_DURATION_FORMATS-tak.
 *  - elke WORKTIME-variant (niet-elapsed): dezelfde omrekening als taakduur
 *    (`tenthsOfMinutesToDays`, gedeeld met mspdiReader.ts — T7-kwaliteitsreview M2, zie
 *    `@/services/importDurations`) — spiegelt mspdiReader's "anders"-tak. MPP kent geen
 *    hour-mode-taken in etappe 1 (moduleheader: "Alles blijft DAG-modus"), dus mspdiReader's
 *    `lagMinutes`-tak (hour-mode-opvolger) heeft hier bewust geen tegenhanger.
 *
 * ⚠️ Dekkingsvoorbehoud (T7-spec-review, B1): het corpus (§Corpus & referentiemateriaal) draagt
 * uitsluitend FINISH_START-relaties met lag=0 — de type-tabel (`mspTypeToSequenceType`) en alle
 * lag-takken hierboven (WORKTIME met een echte dagenwaarde, ELAPSED, percent/elapsedPercent) worden
 * dus UITSLUITEND door de synthetische fixtures in `check-mpp-relations.ts` gedekt, niet door het
 * corpus. Zie de moduleheader daar voor de volledige toelichting.
 */
type SequenceLagFields = Pick<Sequence, 'lagDays'> & Partial<Pick<Sequence, 'lagMinutes' | 'lagUnit' | 'lagPercent'>>;

function mppLagToSequenceFields(rawLag: number, unitCode: number, hoursPerDay: number): SequenceLagFields {
  if (rawLag === -1) return { lagDays: 0 }; // MPPUtility.getAdjustedDuration: duration===-1 ⇒ geen lag
  const unit = getDurationTimeUnits(unitCode);
  if (unit === 'percent' || unit === 'elapsedPercent') {
    const fields: SequenceLagFields = { lagDays: 0, lagPercent: rawLag / 10 };
    if (unit === 'elapsedPercent') fields.lagUnit = 'ELAPSEDTIME';
    return fields;
  }
  if (unit.startsWith('elapsed')) {
    return { lagDays: Math.round(getDuration(rawLag, 'elapsedDays')), lagUnit: 'ELAPSEDTIME' };
  }
  return { lagDays: tenthsOfMinutesToDays(rawLag, hoursPerDay) };
}

/** Poort van `ConstraintFactory.process` (T7, stap 1) — `"   114"/TBkndCons` → `Sequence[]`.
 *  Geëxporteerd (spiegelt `readCalendars`'s testbaarheidspatroon, T6) zodat
 *  `check-mpp-relations.ts` 'm los kan aanroepen zonder de volledige `readMPP` te hoeven draaien. */
export function readRelations(
  cfb: CfbFile,
  applicationVersion: number | null,
  hoursPerDay: number,
  taskIdByUniqueId: ReadonlyMap<number, string>,
): Sequence[] {
  try {
    return readRelationsUnsafe(cfb, applicationVersion, hoursPerDay, taskIdByUniqueId);
  } catch {
    return [];
  }
}

function readRelationsUnsafe(
  cfb: CfbFile,
  applicationVersion: number | null,
  hoursPerDay: number,
  taskIdByUniqueId: ReadonlyMap<number, string>,
): Sequence[] {
  const label = '"   114"/TBkndCons';
  const fixedMetaBytes = cfb.getStream(['   114', 'TBkndCons', 'FixedMeta']);
  const fixedDataBytes = cfb.getStream(['   114', 'TBkndCons', 'FixedData']);
  if (!fixedMetaBytes || !fixedDataBytes) return []; // legitiem afwezig (geen relaties in dit bestand)

  const fixedMeta = FixedMeta.withItemSize(fixedMetaBytes, CONS_FIXED_META_ITEM_SIZE, `${label}/FixedMeta`);
  const fixedData = FixedData.withItemSizeOverride(fixedMeta, CONS_FIXED_DATA_ITEM_SIZE, fixedDataBytes, `${label}/FixedData`);

  // project15 (ConstraintFactory.java): mppFileType===14 (altijd waar — assertReadable/T4 laat
  // alleen MPP14 door) && applicationVersion > PROJECT_2010(14) — dezelfde "modern"-drempel als
  // elders (mppCalendars.ts se useModernOffsets, milestoneBitFlag hierboven).
  const project15 = (applicationVersion ?? 0) > 14;
  const durationOffset = project15 ? 14 : 16;
  const durationUnitsOffset = project15 ? 18 : 14;

  const sequences: Sequence[] = [];
  // GEKLEMD (mppPrimitives.ts se FixedMeta-I1) — ConstraintFactory.java gebruikt hier de RUWE
  // headerwaarde als lusbovengrens (plan-waarschuwing); onze klem is al veilig, dus geen aparte
  // klem nodig op dit niveau.
  const itemCount = fixedMeta.getItemCount();
  for (let index = 0; index < itemCount; index++) {
    const metaItem = fixedMeta.getByteArrayValue(index);
    if (!metaItem || metaItem.length < 8) continue;
    // Verwijderd-vlag: SHORT (niet BYTE — zie de asymmetrie met TBkndAssn hieronder), spiegelt
    // ConstraintFactory.java se "SourceForge bug 2209477"-commentaar letterlijk.
    if (getShort(metaItem, 0, `${label}/FixedMeta deleted-flag`) !== 0) continue;

    const dataOffset = getInt(metaItem, 4, `${label}/FixedMeta offset`);
    const dataIndex = fixedData.getIndexFromOffset(dataOffset);
    if (dataIndex === -1) continue;
    const data = fixedData.getByteArrayValue(dataIndex);
    if (!data || data.length < 14) continue;

    const predecessorUid = getInt(data, 4, `${label}/FixedData taskId1`);
    const successorUid = getInt(data, 8, `${label}/FixedData taskId2`);
    if (predecessorUid === 0 || successorUid === 0) continue; // relatie met de projectsamenvattingstaak
    if (predecessorUid === successorUid) continue; // circulaire relatie (ConstraintFactory.java)

    // Relatie naar een niet-bestaande/gefilterde taak overslaan — spiegelt MPXJ se
    // `task1 != null && task2 != null`-guard (getTaskByUniqueID geeft null voor een taak die T5's
    // `collectValidTaskIndices` al wegfilterde, bv. een null-/spooktaak).
    const predecessorId = taskIdByUniqueId.get(predecessorUid);
    const successorId = taskIdByUniqueId.get(successorUid);
    if (!predecessorId || !successorId) continue;

    const relationTypeRaw = getShort(data, 12, `${label}/FixedData type`);
    const type = mspTypeToSequenceType(relationTypeRaw);

    const lagRaw = data.length >= durationOffset + 4 ? getInt(data, durationOffset, `${label}/FixedData lag`) : -1;
    const lagUnitsRaw = data.length >= durationUnitsOffset + 2 ? getShort(data, durationUnitsOffset, `${label}/FixedData lagUnits`) : 0;

    sequences.push({
      id: generateId('seq'),
      predecessorId,
      successorId,
      type,
      ...mppLagToSequenceFields(lagRaw, lagUnitsRaw, hoursPerDay),
    });
  }
  return sequences;
}

/** TBkndRsc/FixedMeta-itemgrootte (MPP14Reader.java: `new FixedMeta(..., 37)`). */
const RESOURCE_FIXED_META_ITEM_SIZE = 37;
/** TBkndRsc/Fixed2Meta-itemgrootte-KANDIDATEN (MPP14Reader.java: `new FixedMeta(...,
 *  rscFixedData, 50, 51)` — de heuristische variant, `FixedMeta.withHeuristicItemSize`). */
const RESOURCE_FIXED2_META_ITEM_SIZES = [50, 51];

/** Bit die WORK vs. niet-WORK onderscheidt in het TBkndRsc/FixedMeta-item (37 bytes) — spiegelt
 *  MPP14Reader.java se `processResourceData`-tabelkeuze, zelfde "modern"-drempel als
 *  `milestoneBitFlag`/mppCalendars.ts se `useModernOffsets`. */
function resourceTypeBitFlag(applicationVersion: number | null): { offset: number; mask: number } {
  const version = applicationVersion ?? 0;
  return version > 14
    ? { offset: 12, mask: 0x10 } // PROJECT2013_RESOURCE_META_DATA_BIT_FLAGS
    : { offset: 9, mask: 0x02 }; // PROJECT2010_RESOURCE_META_DATA_BIT_FLAGS
}

/**
 * T7-spec-review (B7, CORRECTIE): een eerdere versie van dit bestand beweerde dat het WORK/niet-
 * WORK-onderscheid hierboven het enige geporte resourcetype-signaal was, en dat MPXJ het COST-vs-
 * MATERIAL-onderscheid via "een bit in Fixed2Data" trekt — BEIDE beweringen waren fout. MPXJ leest
 * de COST-bit uit **Fixed2META**, niet Fixed2Data (`MPP14Reader.java`: `byte[] metaData2 =
 * rscFixed2Meta.getByteArrayValue(offset); ... if ((metaData2[8] & 0x10) != 0)
 * resource.setType(COST); else resource.setType(MATERIAL);`), en die stream is WEL aanwezig in
 * alle drie ground-truth-bestanden (679/526/424 bytes) — "buiten scope" was dus geen juiste
 * motivering. Alsnog geport:
 *  - `Fixed2Meta` wordt met dezelfde heuristische constructor gelezen als MPXJ gebruikt
 *    (`FixedMeta.withHeuristicItemSize`, kandidaten 50/51 tegen `rscFixedData`'s itemcount als
 *    ankerpunt — al geport in T4/`mppPrimitives.ts`, hier voor het eerst daadwerkelijk gebruikt).
 *  - Defensief: de stream kan legitiem ontbreken (oudere/kleinere bestanden) — dan blijft het
 *    gedrag exact zoals vóór deze fix (niet-WORK ⇒ MATERIAL).
 *  - **Cost → LABOR** (niet MATERIAL): spiegelt mspdiReader.ts se eigen collapse (r. 180:
 *    `type: type === 0 ? 'MATERIAL' : 'LABOR'` — UITSLUITEND MSP-Type 0 is MATERIAL, alles anders
 *    (Work ÉN Cost) is LABOR). `ResourceType` in dit project heeft sowieso geen `'COST'`-waarde
 *    (`src/types/resource.ts`); MATERIAL zou een Cost-resource dus fout hebben ingedeeld.
 *
 * Gemeten uitkomst per corpusbestand (T7-spec-review, B5) staat in `check-mpp-relations.ts` se
 * corpussectie, mét het versieverschil-voorbehoud dat ook de rest van de T5/T7-vergelijkingen kent.
 */
function isFixed2MetaCostBit(fixed2Meta: FixedMeta | null, index: number): boolean {
  const item = fixed2Meta?.getByteArrayValue(index) ?? null;
  return !!item && item.length > 8 && (item[8] & 0x10) !== 0;
}

export interface ReadResourcesResult {
  resources: Resource[];
  resourceIdByUniqueId: Map<number, string>;
}

/** T7-kwaliteitsreview (I1, BLOKKEREND): een module-singleton hier (`const EMPTY = {...}`,
 *  teruggegeven bij elke lege/foute lezing) zou ÉÉN gedeelde array-/Map-instantie over ALLE
 *  aanroepen zijn — die instantie gaat de Zustand-store in (multi-document: elk open document kan
 *  z'n eigen `ImportResult` binnenhalen) en Immer's autoFreeze bevriest 'm bij de eerste mutatie-
 *  poging MODULE-BREED, dus een latere, ANDERE lege lezing zou tegen een bevroren object aanlopen.
 *  Spiegelt daarom `mppCalendars.ts`'s `fallbackResult()`-patroon: een FACTORY die bij elke aanroep
 *  een verse `{ resources: [], resourceIdByUniqueId: new Map() }` teruggeeft. */
function emptyResourcesResult(): ReadResourcesResult {
  return { resources: [], resourceIdByUniqueId: new Map() };
}

/** Poort van `MPP14Reader.processResourceData`/`createResourceMap` (T7, stap 2) — `"   114"/
 *  TBkndRsc` → `Resource[]`. Geëxporteerd, zelfde testbaarheidsreden als `readRelations`
 *  hierboven. `labels` (T7-spec-review, B3): zie `readResourcesUnsafe`'s UID-0-toelichting. */
export function readResources(
  cfb: CfbFile,
  resourceFieldMap: FieldMapTable,
  applicationVersion: number | null,
  calResult: CalendarReadResult,
  labels?: ImportLabels,
): ReadResourcesResult {
  try {
    return readResourcesUnsafe(cfb, resourceFieldMap, applicationVersion, calResult, labels);
  } catch {
    return emptyResourcesResult();
  }
}

function readResourcesUnsafe(
  cfb: CfbFile,
  resourceFieldMap: FieldMapTable,
  applicationVersion: number | null,
  calResult: CalendarReadResult,
  labels: ImportLabels | undefined,
): ReadResourcesResult {
  const label = '"   114"/TBkndRsc';
  const fixedMetaBytes = cfb.getStream(['   114', 'TBkndRsc', 'FixedMeta']);
  const fixedDataBytes = cfb.getStream(['   114', 'TBkndRsc', 'FixedData']);
  const varMetaBytes = cfb.getStream(['   114', 'TBkndRsc', 'VarMeta']);
  if (!fixedMetaBytes || !fixedDataBytes || !varMetaBytes) return emptyResourcesResult();
  const var2DataBytes = cfb.getStream(['   114', 'TBkndRsc', 'Var2Data']); // legitiem afwezig (mppPrimitives.ts)

  const fixedMeta = FixedMeta.withItemSize(fixedMetaBytes, RESOURCE_FIXED_META_ITEM_SIZE, `${label}/FixedMeta`);
  const fixedData = FixedData.fromMeta(fixedMeta, fixedDataBytes, 0, 0, `${label}/FixedData`);
  const varMeta = new VarMeta12(varMetaBytes, `${label}/VarMeta`);
  const varData = new Var2Data(varMeta, var2DataBytes);

  // B7: Fixed2Meta is OPTIONEEL op storage-niveau (defensief — zie `isFixed2MetaCostBit`'s
  // toelichting); ontbreekt/onleesbaar ⇒ `fixed2Meta` blijft `null` en elke resource valt terug op
  // het WORK-bit-only-gedrag van vóór deze fix.
  const fixed2MetaBytes = cfb.getStream(['   114', 'TBkndRsc', 'Fixed2Meta']);
  let fixed2Meta: FixedMeta | null = null;
  if (fixed2MetaBytes) {
    try {
      fixed2Meta = FixedMeta.withHeuristicItemSize(fixed2MetaBytes, fixedData, RESOURCE_FIXED2_META_ITEM_SIZES, `${label}/Fixed2Meta`);
    } catch {
      fixed2Meta = null;
    }
  }

  const uniqueIdOffset = fixedOffsetOf(resourceFieldMap, ResourceFieldId.UniqueId);
  const nameKey = varDataKeyOf(resourceFieldMap, ResourceFieldId.Name);
  const maxUnitsOffset = fixedOffsetOf(resourceFieldMap, ResourceFieldId.MaxUnits);
  if (uniqueIdOffset === null || nameKey === null) return emptyResourcesResult();

  // Poort van `createResourceMap` (MPP14Reader.java r. 935-958): uniqueID→FixedData-index, gebouwd
  // via een SHORT-read op `uniqueIdOffset` — een letterlijke MPXJ-eigenaardigheid (het veld is een
  // 4-byte INT volgens de field map, maar `createResourceMap` leest 'm toch als SHORT). Puur een
  // interne join-sleutel; de ECHTE unique-ID komt uit `varMeta.getUniqueIdentifierArray()`
  // hieronder. Op elk realistisch bestand (resourceaantallen ruim < 65536, plan-corpus: 5-9) is de
  // truncatie een no-op — T7 spiegelt de Java-bron hier bewust letterlijk i.p.v. 'm te "corrigeren"
  // naar een INT-read.
  const { offset: typeOffset, mask: typeMask } = resourceTypeBitFlag(applicationVersion);
  const indexByShortUid = new Map<number, number>();
  const itemCount = fixedMeta.getAdjustedItemCount();
  for (let index = 0; index < itemCount; index++) {
    const data = fixedData.getByteArrayValue(index);
    if (!data || data.length < uniqueIdOffset + 2) continue;
    const shortUid = getShort(data, uniqueIdOffset, `${label}/FixedData uniqueId (short, spiegelt MPXJ)`);
    if (!indexByShortUid.has(shortUid)) indexByShortUid.set(shortUid, index); // eerste-wint, spiegelt Java's containsKey-guard
  }

  const resources: Resource[] = [];
  const resourceIdByUniqueId = new Map<number, string>();
  // Iterate op VarMeta se echte unique-ID's (spiegelt `rscVarMeta.getUniqueIdentifierArray()`) —
  // uniqueID 0 is een GELDIGE resource-id (plan-waarschuwing, geverifieerd via mppCalendars.ts's
  // T6-spec-review-fix-toelichting: bijlage 13 se afgeleide kalenders dragen resource-ID's t/m 0),
  // dus GEEN uid===0-skip zoals bij taken (waar 0 de projectsamenvattingstaak is).
  for (const uniqueId of varMeta.getUniqueIdentifierArray()) {
    const index = indexByShortUid.get(uniqueId);
    if (index === undefined) continue;
    const data = fixedData.getByteArrayValue(index);
    if (!data) continue;

    // T7-spec-review (B3, BESLUIT): uniqueID 0 is MPP's ingebouwde "niet-toegewezen"-plaatshouder —
    // MPXJ zelf SLAAT dit record OVER (`createResourceMap`'s `data.length < maxFixedDataSize`-
    // guard, niet geport — zie de taakvariant se toelichting bij `collectValidTaskIndices`), dus
    // MPXJ's eigen resourcetelling voor dit corpus zou 8/6/4 zijn, NIET 9/7/5. MS Project schrijft
    // datzelfde record echter WÉL naar zijn eigen MSPDI-export (als "Niet toegekend", maxUnits 1) —
    // deze lezer kiest bewust voor COUNT-PARITEIT MET readMSPDI (9/7/5) i.p.v. MPXJ-pariteit: het
    // record blijft dus gematerialiseerd, maar met een VASTE, betekenisvolle vorm in plaats van de
    // velden van een placeholder-FixedData-record te vertrouwen (die record is typisch te kort/leeg
    // om een geldige naam/MAX_UNITS/type uit te lezen — vandaar hieronder de VASTE vorm i.p.v. de
    // normale per-veld-afleiding). `isUnassignedPlaceholder` overschrijft UITSLUITEND naam/type/
    // maxUnits — calendarId-koppeling (verderop) blijft de normale afleiding volgen: T6 heeft al
    // vastgesteld dat resource-uniqueID 0 een geldig kalender-koppelpunt kan zijn (bijlage 13's
    // afgeleide kalenders dragen resource-ID's t/m 0), dat blijft ongewijzigd. Zie
    // `check-mpp-relations.ts`'s moduleheader voor deze bewuste MPXJ-divergentie (9/7/5 vs. 8/6/4).
    const isUnassignedPlaceholder = uniqueId === 0;

    const name = isUnassignedPlaceholder
      ? (labels?.unassignedResource || 'Unassigned')
      : varData.getUnicodeString(uniqueId, nameKey, MAX_VAR_TEXT_BYTES, `${label}/name[uid=${uniqueId}]`) || 'Resource';

    let type: ResourceType;
    if (isUnassignedPlaceholder) {
      type = 'LABOR';
    } else {
      const metaItem = fixedMeta.getByteArrayValue(index);
      const isWork = !!metaItem && metaItem.length > typeOffset && (metaItem[typeOffset] & typeMask) !== 0;
      // B7: niet-WORK ⇒ Fixed2Meta se COST-bit beslist tussen LABOR (Cost, spiegelt mspdiReader se
      // collapse) en MATERIAL — zie `isFixed2MetaCostBit`'s toelichting hierboven.
      type = isWork || isFixed2MetaCostBit(fixed2Meta, index) ? 'LABOR' : 'MATERIAL';
    }

    // MAX_UNITS (DataType.UNITS, FieldMap.java): 8-byte double. FieldMap.java's eigen `/100`
    // ("ignore the amount if result will be less than 0.1%") levert MPXJ's PERCENT-schaal op
    // (100.0 = voltijds) — dít project rekent in de FRACTIE-schaal die mspdiReader ook gebruikt
    // (`Resource.maxUnits`'s docblok: "1 = 100%"), dus daar bovenop nóg een `/100`. Corpus-
    // geverifieerd tegen de MSPDI-ground-truth (T7): zonder de tweede `/100` gaf elke resource
    // 100× de verwachte waarde (bv. "Tom" 200 i.p.v. 2, "malic" 150 i.p.v. 1.5) — dezelfde
    // afleiding als ASSIGNMENT_UNITS hieronder.
    let maxUnits = 1;
    if (!isUnassignedPlaceholder && maxUnitsOffset !== null && data.length >= maxUnitsOffset + 8) {
      const rawUnits = getDouble(data, maxUnitsOffset, `${label}/FixedData maxUnits`);
      maxUnits = (Math.abs(rawUnits) < 0.1 ? 0 : rawUnits) / 100 / 100;
    }

    const resource: Resource = { id: generateId('res'), name, type, description: '', maxUnits };
    const calUid = calResult.resourceCalendarUniqueIdByResourceUniqueId.get(uniqueId);
    if (calUid !== undefined) {
      const cal = calResult.calendarByUniqueId.get(calUid);
      if (cal) resource.calendarId = cal.id;
    }

    resources.push(resource);
    resourceIdByUniqueId.set(uniqueId, resource.id);
  }
  return { resources, resourceIdByUniqueId };
}

/** TBkndAssn/FixedMeta-itemgrootte (MPP14Reader.java: `new FixedMeta(..., 34)`). */
const ASSIGNMENT_FIXED_META_ITEM_SIZE = 34;
/** TBkndAssn/FixedData-itemgrootte — GEEN meta-afgeleide offset/grootte, contigue blokken van 110
 *  bytes vanaf offset 0 (MPP14Reader.java: `new FixedData(110, ...)`, de `withoutMeta`-variant). */
const ASSIGNMENT_FIXED_DATA_ITEM_SIZE = 110;

/** Poort van `ResourceAssignmentFactory.process` (T7, stap 2) — `"   114"/TBkndAssn` →
 *  `ResourceAssignment[]`, met mspdiReader se `unitsPerDay`-afleiding. Geëxporteerd, zelfde
 *  testbaarheidsreden als `readRelations` hierboven. */
export function readAssignments(
  cfb: CfbFile,
  assignmentFieldMap: FieldMapTable,
  taskIdByUniqueId: ReadonlyMap<number, string>,
  resourceIdByUniqueId: ReadonlyMap<number, string>,
): ResourceAssignment[] {
  try {
    return readAssignmentsUnsafe(cfb, assignmentFieldMap, taskIdByUniqueId, resourceIdByUniqueId);
  } catch {
    return [];
  }
}

function readAssignmentsUnsafe(
  cfb: CfbFile,
  assignmentFieldMap: FieldMapTable,
  taskIdByUniqueId: ReadonlyMap<number, string>,
  resourceIdByUniqueId: ReadonlyMap<number, string>,
): ResourceAssignment[] {
  const label = '"   114"/TBkndAssn';
  const fixedMetaBytes = cfb.getStream(['   114', 'TBkndAssn', 'FixedMeta']);
  const fixedDataBytes = cfb.getStream(['   114', 'TBkndAssn', 'FixedData']);
  const varMetaBytes = cfb.getStream(['   114', 'TBkndAssn', 'VarMeta']);
  if (!fixedMetaBytes || !fixedDataBytes || !varMetaBytes) return [];

  const fixedMeta = FixedMeta.withItemSize(fixedMetaBytes, ASSIGNMENT_FIXED_META_ITEM_SIZE, `${label}/FixedMeta`);
  const fixedData = FixedData.withoutMeta(ASSIGNMENT_FIXED_DATA_ITEM_SIZE, fixedDataBytes, `${label}/FixedData`);
  const varMeta = new VarMeta12(varMetaBytes, `${label}/VarMeta`);

  const uniqueIdOffset = fixedOffsetOf(assignmentFieldMap, AssignmentFieldId.UniqueId);
  const taskUidOffset = fixedOffsetOf(assignmentFieldMap, AssignmentFieldId.TaskUniqueId);
  const resourceUidOffset = fixedOffsetOf(assignmentFieldMap, AssignmentFieldId.ResourceUniqueId);
  const unitsOffset = fixedOffsetOf(assignmentFieldMap, AssignmentFieldId.Units);
  if (uniqueIdOffset === null || taskUidOffset === null || resourceUidOffset === null) return [];

  const assignments: ResourceAssignment[] = [];
  // GEKLEMD (mppPrimitives.ts se FixedMeta-I1) — ResourceAssignmentFactory.java gebruikt hier
  // `assnFixedMeta.getItemCount()` (de RUWE headerwaarde) als lusbovengrens; onze klem is al veilig.
  const itemCount = fixedMeta.getItemCount();
  for (let index = 0; index < itemCount; index++) {
    const meta = fixedMeta.getByteArrayValue(index);
    // Verwijderd-vlag: hier een enkele BYTE (`meta[0] !== 0`), NIET de SHORT-check van TBkndCons
    // hierboven — spiegelt ResourceAssignmentFactory.java letterlijk (`meta[0] != 0`).
    if (!meta || meta.length < 8 || meta[0] !== 0) continue;

    const offset = getInt(meta, 4, `${label}/FixedMeta offset`);
    const dataIndex = fixedData.getIndexFromOffset(offset);
    if (dataIndex === -1) continue;
    const data = fixedData.getByteArrayValue(dataIndex);
    if (!data || data.length < uniqueIdOffset + 4) continue;

    const uid = getInt(data, uniqueIdOffset, `${label}/FixedData uniqueId`);
    if (!varMeta.containsKey(uid)) continue; // spiegelt `assnVarMeta.getUniqueIdentifierSet().contains(varDataId)`

    if (data.length < taskUidOffset + 4 || data.length < resourceUidOffset + 4) continue;
    const taskUid = getInt(data, taskUidOffset, `${label}/FixedData taskUid`);
    const resourceUid = getInt(data, resourceUidOffset, `${label}/FixedData resourceUid`);
    const taskId = taskIdByUniqueId.get(taskUid);
    const resourceId = resourceIdByUniqueId.get(resourceUid);
    // Onvindbare taak/resource ⇒ overslaan — spiegelt mspdiReader se assignmentsectie
    // (`if (!taskId || !resourceId) continue;`), en dekt tegelijk MPXJ se ASSIGNMENT_NULL_RESOURCE_ID
    // (-65535)-sentinel: die uid komt nooit in `resourceIdByUniqueId` voor, dus de lookup faalt vanzelf.
    if (!taskId || !resourceId) continue;

    // ASSIGNMENT_UNITS (DataType.UNITS, FieldMap.java): 8-byte double. Zelfde dubbele `/100` als
    // `readResourcesUnsafe`'s MAX_UNITS hierboven — MPXJ's eigen `/100` levert de PERCENT-schaal op
    // (100.0 = voltijds), dit project rekent in de FRACTIE-schaal (`ResourceAssignment.unitsPerDay`'s
    // docblok: "1 = 100%", spiegelt mspdiReader's `<Units>`-lezing). Corpus-geverifieerd: zonder de
    // tweede `/100` gaf elke assignment 100 i.p.v. 1.
    let unitsPerDay = 1;
    if (unitsOffset !== null && data.length >= unitsOffset + 8) {
      const rawUnits = getDouble(data, unitsOffset, `${label}/FixedData units`);
      unitsPerDay = (Math.abs(rawUnits) < 0.1 ? 0 : rawUnits) / 100 / 100;
    }

    assignments.push({ id: generateId('asgn'), taskId, resourceId, unitsPerDay });
  }
  return assignments;
}

/**
 * Entry point (T5-T7). `.mpp` (MPP14) → compleet `ImportResult`, met dezelfde veldsemantiek als
 * `readMSPDI`.
 */
/**
 * T6-kwaliteitsreview (minor M6): de container-/Props-/versiepreambule van `readMPP` (CfbFile →
 * `assertReadable` → `detectApplicationVersion` → `"   114"/Props`) geëxtraheerd tot een losse,
 * geëxporteerde functie — vóór deze fix hield `check-mpp-import.ts`'s T6-crawl-sectie een HANDMATIGE
 * kopie van precies deze vier stappen aan (om bij `readCalendars` te kunnen zonder de volledige
 * `readMPP` te hoeven draaien), met het risico dat de twee stilzwijgend uit elkaar lopen zodra deze
 * preambule ooit verandert. Nu is er ÉÉN bron: zowel `readMPP` hieronder als testcode importeren
 * `openMppProject`.
 */
export interface OpenMppProject {
  cfb: CfbFile;
  projectProps: Props;
  applicationVersion: number | null;
}

export function openMppProject(bytes: Uint8Array): OpenMppProject {
  const cfb = new CfbFile(bytes);
  assertReadable(cfb); // gooit MppUnsupportedError voor legacy/versleuteld, of een gewone Error
  // voor een onherkenbaar bestand (T4).

  const applicationVersion = detectApplicationVersion(cfb);

  const projectPropsBytes = cfb.getStream(['   114', 'Props']);
  if (!projectPropsBytes) {
    throw new Error('MPP: "   114"/Props ontbreekt — geen geldig MPP14-bestand');
  }
  const projectProps = new Props(projectPropsBytes, '   114/Props');

  return { cfb, projectProps, applicationVersion };
}

export function readMPP(bytes: Uint8Array, labels?: ImportLabels): ImportResult {
  const { cfb, projectProps, applicationVersion } = openMppProject(bytes);

  const { project, hoursPerDay, calendarHoursPerDayOverride } = parseProjectProperties(projectProps, labels);

  const taskFieldMap = createTaskFieldMap(projectProps);
  // I2 (T5-kwaliteitsreview): `readTasks` geeft ook `taskIdByUniqueId`/`calendarUniqueIdByTaskId`
  // terug — T6 gebruikt hier `calendarUniqueIdByTaskId` om `Task.calendarId` te koppelen aan de
  // echte, hieronder gelezen kalenders; `taskIdByUniqueId` voedt T7's relaties/assignments.
  const { tasks, taskIdByUniqueId, calendarUniqueIdByTaskId } = readTasks({
    cfb, taskFieldMap, hoursPerDay, statusDate: project.statusDate, applicationVersion,
  });

  // T6: echte kalenders uit `"   114"/TBkndCal` (mppCalendars.ts) — basiskalenders + afgeleide
  // (resource-)kalenders, met de projectkalender gekozen via DEFAULT_CALENDAR_NAME.
  // `calendarHoursPerDayOverride` (alleen niet-`null` als MINUTES_PER_DAY echt aanwezig/geldig
  // was, zie `parseProjectProperties`'s returntype) gaat MEE de aanroep in i.p.v. er ná op de
  // teruggegeven kalender te worden nagestempeld (T6-spec-review-fix, minor b) — `readCalendars`
  // past 'm intern toe VÓÓR `promoteHourCalendar`, zodat promotie (die `hoursPerDay` opnieuw kan
  // afleiden zodra de kalender daadwerkelijk banden draagt) het laatste woord houdt, exact zoals
  // mspdiReader (MinutesPerDay-override in `parseCalendar`, `promoteHourCalendar` draait daarna).
  const calResult = readCalendars(cfb, projectProps, applicationVersion, calendarHoursPerDayOverride);
  const calendar = calResult.projectCalendar;
  project.calendarId = calendar.id;

  // Taak-kalenders: de rauwe CALENDAR_UNIQUE_ID uit T5 vertalen naar de echte, hierboven gelezen
  // kalender — alleen zetten wanneer de referentie daadwerkelijk naar een gelezen kalender wijst
  // (spiegelt mspdiReader's `taskCalUid > 1 ? calUidToId.get(taskCalUid) : undefined`-terugval:
  // een onbekende/lege verwijzing laat `task.calendarId` op `undefined`, wat de engine als "gebruik
  // de projectkalender" leest).
  if (calendarUniqueIdByTaskId.size > 0) {
    const taskById = new Map(tasks.map((t) => [t.id, t]));
    for (const [taskId, calUid] of calendarUniqueIdByTaskId) {
      const cal = calResult.calendarByUniqueId.get(calUid);
      const task = cal && taskById.get(taskId);
      if (task) task.calendarId = cal.id;
    }
  }

  // T7: relaties/resources/assignments — compleet ImportResult, geen placeholders meer.
  const sequences = readRelations(cfb, applicationVersion, hoursPerDay, taskIdByUniqueId);

  const resourceFieldMap = createResourceFieldMap(projectProps);
  const { resources, resourceIdByUniqueId } = readResources(cfb, resourceFieldMap, applicationVersion, calResult, labels);

  const assignmentFieldMap = createAssignmentFieldMap(projectProps);
  const assignments = readAssignments(cfb, assignmentFieldMap, taskIdByUniqueId, resourceIdByUniqueId);

  return {
    project,
    calendar,
    tasks,
    sequences,
    resources,
    assignments,
    resourceCalendars: calResult.resourceCalendars,
  };
}
