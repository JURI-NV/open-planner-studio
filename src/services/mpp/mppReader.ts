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
 * TBkndCons` (T7 — LET OP: dat is MPP-jargon voor RELATIES, niet datumconstraints) + resources
 * uit `"   114"/TBkndRsc` + assignments uit `"   114"/TBkndAssn` (T7, sinds T11 in `mppEntities.ts`
 * — zie diens moduleheader voor het waarom van die knip) — een compleet `ImportResult`, geen
 * placeholders meer.
 *
 * Veldsemantiek is gespiegeld aan `readMSPDI` (mspdiReader.ts) — zelfde afronding voor duur,
 * dezelfde constrainttype-codes (`mspCodeToConstraint`, hergebruikt), dezelfde
 * progress-normalisatie (`normalizeImportedProgress`).
 *
 * UURMODUS (etappe 1.5, 2026-08-15) — CORRECTIE t.o.v. de oorspronkelijke etappe-1-tekst hierboven
 * ("Alles blijft DAG-modus"): die vereenvoudiging is VERVALLEN. De bron draagt de precisie al
 * (duren in tienden van minuten, timestamps met een echte tijdcomponent, kalender-uurbanden — T6
 * las die al) — deze lezer spiegelt nu exact dezelfde (c)-discriminator-orkestratie als
 * `mspdiReader.ts` (zie `@/services/subdayIo`'s normatieve discriminator-tekst): een kalender
 * promoveert naar uur-modus zodra ze zelf afwijkt (discriminator (a)/(b) — meerdere banden per
 * werkdag, of een band die middernacht kruist) ÓF minstens één taak op die kalender een (c)-signaal
 * draagt (sub-dag-duur, `isSubDayMinutes`, of een Start/Finish die van het kalender-eigen anker
 * afwijkt, `hasNonAnchorTime`/`mppAnchorClock` hieronder). De promotie zelf is een LOSSE stap
 * (`promoteCalendarsForHourMode` in `mppCalendars.ts`) die pas draait NÁ een volledige taak-scan —
 * spiegelt mspdiReader's eigen tweefasen-opzet (`readMSPDI`: eerst alle `<Calendar>`-elementen
 * registreren, dan alle taken scannen op het (c)-signaal, dán pas promoveren, dán pas de
 * Task-objecten bouwen). `readTasks` hieronder doet dus drie passes over de geldige taken: (A) een
 * ruwe scan (Date-/getalwaarden, geen `Task`-object), (B) signaalverzameling + promotie, (C) de
 * uiteindelijke `Task`-objecten met de nu bekende dag/uur-beslissing per taak. Bij uur-modus komt
 * `Task.time.durationMinutes` uit de rauwe tienden-van-minuut-duur (geen dag-afronding),
 * `scheduleStart`/`scheduleFinish`/`actualStart`/`actualFinish`/constraint-/deadline-datums
 * behouden hun echte tijdcomponent (`formatInstant(..., 'hour')` i.p.v. `formatDate`), en
 * `TBkndCons`-lag voor een uur-modus-opvolger wordt minuut-precies (`Sequence.lagMinutes`,
 * `mppEntities.ts`'s `mppLagToSequenceFields`) — exact de velden die mspdiReader's uur-modus-pad
 * ook vult. Dag-modus-bestanden (geen enkel (a)/(b)/(c)-signaal op geen enkele kalender) doorlopen
 * dezelfde code maar met `isHour=false` overal, en blijven dus BYTE-VOOR-BYTE hetzelfde resultaat
 * opleveren als vóór etappe 1.5 — zie `check-mpp-import.ts`'s nieuwe uurmodus-sectie voor de
 * corpusmeting die dat bevestigt (inclusief de bevinding dat het corpusbestand "Bijlage 13" zelf,
 * ondanks de oorspronkelijke aanname, óók sub-dag-signaal draagt — de MSPDI-ground-truth van dát
 * bestand leest via de bestaande, ongewijzigde `readMSPDI` al 51/51 taken in uur-modus).
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
import type { WorkCalendar } from '@/types/calendar';
import type { ImportLabels, ImportResult } from '@/services/importTypes';
import { generateId } from '@/utils/id';
import { formatDate, formatInstant } from '@/utils/dateUtils';
import { normalizeImportedProgress } from '@/services/importNormalize';
import { tenthsOfMinutesToDays } from '@/services/importDurations';
import { mspCodeToConstraint } from '@/services/msproject/mspdiReader';
import { hasNonAnchorTime, isSubDayMinutes } from '@/services/subdayIo';
import { CfbFile } from './cfb';
import { assertReadable, detectApplicationVersion, Props } from './mppContainer';
import {
  FixedData, FixedMeta, Var2Data, VarMeta12,
  getInt, getShort, getTimestamp, getUnicodeString,
} from './mppPrimitives';
import {
  TaskFieldId,
  createAssignmentFieldMap, createResourceFieldMap, createTaskFieldMap,
  fixedOffsetOf, varDataKeyOf, type FieldMapTable,
} from './fieldMap14';
import { readCalendars, promoteCalendarsForHourMode, type CalendarReadResult } from './mppCalendars';
import { MAX_VAR_TEXT_BYTES } from './limits';
import { readRelations, readResources, readAssignments } from './mppEntities';

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

/** Rauwe timestamp (Date, tijdcomponent behouden) — de etappe-1.5-tegenhanger van de oude
 *  `readDateField` (die meteen naar een dag-alleen string formatteerde). De dag/uur-modus-
 *  beslissing valt pas ná de signaal-scan (Fase B hieronder), dus Fase A bewaart hier de rauwe
 *  `Date`; Fase C formatteert 'm dan met `formatDate` (dag) of `formatInstant(...,'hour')` (uur). */
function readTimestampField(data: Uint8Array, offset: number | null, ctx: string): Date | null {
  if (offset === null || data.length < offset + 4) return null;
  return getTimestamp(data, offset, ctx);
}

/** Synthetisch anker voor de MPP-datumdiscriminator (c) — spiegelt mspdiReader's vaste
 *  `MSP_TIME_ANCHOR` ('08:00:00', dezelfde waarde voor zowel Start als Finish), maar KALENDER-EIGEN
 *  i.p.v. globaal-vast: een rauw MPP-bestand kent geen eigen schrijfconventie zoals OPS's
 *  MSPDI-writer (die altijd letterlijk T08:00 plakt op een dag-modus-datum, ongeacht de kalender) —
 *  de kalender se EIGEN scalar-startuur (`workStartHour`, de nog-NIET-gepromoveerde, eerste-band-
 *  afgeleide waarde uit `buildCalendarFromDays`) is hier de betekenisvolle "dag-modus-verwachting":
 *  een taak die exact op het startuur van haar eigen kalender begint/eindigt draagt geen sub-dag-
 *  informatie, één die daarvan afwijkt (bv. een Finish midden op de dag, of een Start ná de lunch)
 *  wél — precies zoals mspdiReader's vaste anker dat voor MSPDI's OPS-eigen schrijfconventie doet. */
function mppAnchorClock(cal: WorkCalendar): string {
  return `${String(cal.workStartHour).padStart(2, '0')}:00:00`;
}

/** I2 (T5-kwaliteitsreview) — vervangt de vijf losse positionele parameters die `readTasks` eerst
 *  had; T6/T7 breiden dit uit i.p.v. de parameterlijst nog verder te laten groeien.
 *
 *  ETAPPE 1.5: `calResult` (T6's kalenders, UNGEPROMOVEERD — zie mppCalendars.ts's moduleheader)
 *  komt er sinds etappe 1.5 bij; `readMPP` roept `readCalendars` daarom nu VÓÓR `readTasks` aan
 *  (omgekeerde volgorde t.o.v. vóór deze etappe) — spiegelt mspdiReader's eigen volgorde
 *  (`parseCalendar` vóór de taken-lus). */
interface ReadTasksContext {
  cfb: CfbFile;
  taskFieldMap: FieldMapTable;
  hoursPerDay: number;
  statusDate: string | undefined;
  applicationVersion: number | null;
  calResult: CalendarReadResult;
}

/** I2 (T5-kwaliteitsreview) — bereidt de returnvorm voor op T6/T7:
 *  - `taskIdByUniqueId`: T7's TBkndCons-relaties en TBkndAssn-assignments verwijzen naar taken via
 *    hun MPP-uniqueID, niet via het gegenereerde `Task.id` — deze map is precies de vertaling die
 *    daarvoor nodig is (spiegelt mspdiReader's `uidToId`).
 *  - `taskHourById` (etappe 1.5, vervangt de oude `calendarUniqueIdByTaskId` — `Task.calendarId`
 *    wordt nu INLINE gezet tijdens Fase C hieronder, spiegelt mspdiReader's `taskCalendarId`-
 *    toewijzing tijdens de taken-lus, dus een aparte post-hoc-koppelstap in `readMPP` is niet meer
 *    nodig): per taak of ze in UUR-modus is — T7's `readRelations` gebruikt dit voor de
 *    lag-eenheid-keuze, spiegelt mspdiReader's `taskHourById`. */
interface ReadTasksResult {
  tasks: Task[];
  taskIdByUniqueId: Map<number, string>;
  taskHourById: Map<string, boolean>;
}

/** Fase A — rauwe scan: alle velden die `readTasks` nodig heeft, als getal/`Date`/string, NOG GEEN
 *  `Task`-object. Kalender-/dag-of-uur-modus-afhankelijke velden (start/finish/duur/actuals/
 *  constraintdatum/deadline) staan hier als rauwe waarde; Fase C formatteert ze pas, ná Fase B's
 *  signaal-scan + promotie. `effCal` is de EFFECTIEVE kalender (taak-override, anders de
 *  projectkalender) — al hier bepaald zodat Fase B er direct het (c)-signaal aan kan toekennen. */
interface RawTaskScan {
  uniqueId: number;
  id: number;
  outlineLevel: number;
  storedWbs: string | null;
  name: string;
  startTs: Date | null;
  finishTs: Date | null;
  durationRaw: number; // tienden van een minuut
  isMilestone: boolean;
  constraintCode: number | null;
  constraintDateTs: Date | null;
  deadlineTs: Date | null;
  percentComplete: number;
  actualStartTs: Date | null;
  actualFinishTs: Date | null;
  effCal: WorkCalendar;
  /** Alleen gezet als de taak een ECHTE, gevonden kalender-override droeg (spiegelt de oude
   *  `calendarUniqueIdByTaskId`-guard: `calendarUniqueIdRaw >= 0` ÉN de referentie wees naar een
   *  daadwerkelijk gelezen kalender) — bepaalt of Fase C `Task.calendarId` zet. */
  calendarOverride: WorkCalendar | null;
}

function readTasks(ctx: ReadTasksContext): ReadTasksResult {
  const { cfb, taskFieldMap, hoursPerDay, statusDate, applicationVersion, calResult } = ctx;
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

  // ── Fase A: rauwe scan (zie moduleheader "UURMODUS" + `RawTaskScan`) — nog geen `Task`-object,
  // wél al de effectieve kalender per taak (nodig voor Fase B's signaal-scan). ────────────────────
  const raws: RawTaskScan[] = [];
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

    const startTs = readTimestampField(data, scheduledStartOffset, 'TBkndTask scheduledStart');
    const finishTs = readTimestampField(data, scheduledFinishOffset, 'TBkndTask scheduledFinish');

    const durationRaw = durationOffset !== null && data.length >= durationOffset + 4
      ? getInt(data, durationOffset, 'TBkndTask duration')
      : 0;

    const isMilestone = !!metaItem && metaItem.length >= msOffset + 4
      && (getInt(metaItem, msOffset, 'TBkndTask milestone-flag') & msMask) !== 0;

    const constraintCode = constraintTypeOffset !== null && data.length >= constraintTypeOffset + 2
      ? getShort(data, constraintTypeOffset, 'TBkndTask constraintType')
      : null;
    const constraintDateTs = readTimestampField(data, constraintDateOffset, 'TBkndTask constraintDate');
    const deadlineTs = readTimestampField(data, deadlineOffset, 'TBkndTask deadline');
    const percentComplete = readPercentComplete(data, percentCompleteOffset);
    const actualStartTs = readTimestampField(data, actualStartOffset, 'TBkndTask actualStart');
    const actualFinishTs = readTimestampField(data, actualFinishOffset, 'TBkndTask actualFinish');

    // CALENDAR_UNIQUE_ID: -1 (of ontbrekend veld) = geen taak-kalender-override, spiegelt
    // MPP14Reader.java's `calendarID.intValue() == -1 ⇒ task.setCalendarUniqueID(null)`. `effCal` =
    // de gevonden override, anders de projectkalender (spiegelt mspdiReader's `effCalIdOfUid`);
    // `calendarOverride` blijft alleen gezet als de referentie ECHT naar een gelezen kalender wees
    // (Fase C zet `Task.calendarId` alleen dán — spiegelt het oude post-hoc-koppelgedrag exact).
    const calendarUniqueIdRaw = calendarUniqueIdOffset !== null && data.length >= calendarUniqueIdOffset + 4
      ? getInt(data, calendarUniqueIdOffset, 'TBkndTask calendarUniqueId')
      : -1;
    const calendarOverride = calendarUniqueIdRaw >= 0 ? (calResult.calendarByUniqueId.get(calendarUniqueIdRaw) ?? null) : null;
    const effCal = calendarOverride ?? calResult.projectCalendar;

    raws.push({
      uniqueId, id, outlineLevel, storedWbs, name, startTs, finishTs, durationRaw, isMilestone,
      constraintCode, constraintDateTs, deadlineTs, percentComplete, actualStartTs, actualFinishTs,
      effCal, calendarOverride,
    });
  }

  // ── Fase B: (c)-signaal per kalender verzamelen + promoveren (spiegelt mspdiReader's
  // `cSignalCalIds`-lus + `promoteHourCalendar`-lus in `readMSPDI`, vóór de taken-opbouw). Gebruikt
  // per taak de EFFECTIEVE kalender se nog-NIET-gepromoveerde `hoursPerDay` (scalar, uit
  // `buildCalendarFromDays`) — precies zoals mspdiReader's signaal-scan de SCALAR `cal.hoursPerDay`
  // leest vóór promotie. ───────────────────────────────────────────────────────────────────────
  const cSignalCals = new Set<WorkCalendar>();
  for (const raw of raws) {
    const cal = raw.effCal;
    const durMinutes = raw.durationRaw / 10;
    const durSignal = isSubDayMinutes(durMinutes, cal.hoursPerDay);
    const anchor = mppAnchorClock(cal);
    const dateSignal =
      (raw.startTs != null && hasNonAnchorTime(formatInstant(raw.startTs, 'hour'), anchor)) ||
      (raw.finishTs != null && hasNonAnchorTime(formatInstant(raw.finishTs, 'hour'), anchor));
    if (durSignal || dateSignal) cSignalCals.add(cal);
  }
  const hourModeCals = promoteCalendarsForHourMode(calResult.calendarByUniqueId, cSignalCals);

  // ── Fase C: de uiteindelijke `Task`-objecten, met de nu bekende dag/uur-beslissing per taak
  // (spiegelt mspdiReader's taken-opbouwlus, die ook pas ná de promotie-lus draait). ─────────────
  const taskIdByUniqueId = new Map<number, string>();
  const taskHourById = new Map<string, boolean>();
  const records: RawTaskRecord[] = [];
  for (const raw of raws) {
    const cal = raw.effCal;
    const isHour = hourModeCals.has(cal);
    const effHpd = cal.hoursPerDay;

    // Duur: uur ⇒ minuten (bron van waarheid, geen dag-afronding — spiegelt mspdiReader's §7.3-pad);
    // dag ⇒ het bestaande dag-pad, ONGEWIJZIGD op de PROJECT-brede `hoursPerDay` (niet `effHpd`) —
    // spiegelt exact het gedrag van vóór etappe 1.5, zodat een genuine dag-modus-bestand met een
    // taak-kalender-override (ander hoursPerDay dan het project) geen stille duurwijziging krijgt.
    const durationMinutes = isHour ? Math.round(raw.durationRaw / 10) : undefined;
    const duration = isHour
      ? (effHpd > 0 ? durationMinutes! / (effHpd * 60) : 0)
      : tenthsOfMinutesToDays(raw.durationRaw, hoursPerDay);

    const formatField = (ts: Date | null): string | undefined =>
      ts ? (isHour ? formatInstant(ts, 'hour') : formatDate(ts)) : undefined;
    const start = formatField(raw.startTs) ?? formatDate(new Date());
    const finish = formatField(raw.finishTs) ?? start;
    const actualStart = formatField(raw.actualStartTs);
    const actualFinish = formatField(raw.actualFinishTs);

    let constraint: TaskConstraint | undefined;
    if (raw.constraintCode !== null) {
      const mapped = mspCodeToConstraint(raw.constraintCode);
      if (mapped) {
        const constraintDate = formatField(raw.constraintDateTs);
        constraint = {
          type: mapped.type,
          ...(mapped.hard ? { hard: true } : {}),
          ...(constraintDate ? { date: constraintDate } : {}),
        };
      }
    }
    const deadline = formatField(raw.deadlineTs);

    let status: 'NOT_STARTED' | 'STARTED' | 'COMPLETED' = 'NOT_STARTED';
    if (raw.percentComplete >= 100) status = 'COMPLETED';
    else if (raw.percentComplete > 0) status = 'STARTED';

    const task: Task = {
      id: generateId('task'),
      name: raw.name,
      description: '',
      wbsCode: '', // wordt hieronder gezet — outline-nummering volgt pas ná de hiërarchie-opbouw
      taskType: 'CONSTRUCTION',
      status,
      isMilestone: raw.isMilestone,
      priority: 500,
      parentId: null,
      childIds: [],
      time: {
        durationType: 'WORKTIME',
        scheduleDuration: duration,
        ...(durationMinutes != null ? { durationMinutes } : {}),
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
        completion: raw.percentComplete / 100,
      },
      resourceIds: [],
      ...(constraint ? { constraint } : {}),
      ...(deadline ? { deadline } : {}),
      ...(raw.calendarOverride ? { calendarId: raw.calendarOverride.id } : {}),
    };
    records.push({ uniqueId: raw.uniqueId, id: raw.id, outlineLevel: raw.outlineLevel, storedWbs: raw.storedWbs, task });
    taskIdByUniqueId.set(raw.uniqueId, task.id);
    taskHourById.set(task.id, isHour);
  }

  // ID-volgorde = zowel de Gantt-/rijvolgorde die MS Project's eigen XML-export gebruikt, als
  // exact wat MPXJ's `ProjectFile.updateStructure()` zelf doet om de boom op te bouwen (zie
  // moduleheader) — nodig voor de outline-level-stack-hiërarchie in `assignHierarchyAndWbs`.
  records.sort((a, b) => a.id - b.id);
  assignHierarchyAndWbs(records);

  const tasks = records.map((r) => r.task);
  normalizeImportedProgress(tasks, statusDate);
  return { tasks, taskIdByUniqueId, taskHourById };
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

  // T6: echte kalenders uit `"   114"/TBkndCal` (mppCalendars.ts) — basiskalenders + afgeleide
  // (resource-)kalenders, met de projectkalender gekozen via DEFAULT_CALENDAR_NAME.
  // `calendarHoursPerDayOverride` (alleen niet-`null` als MINUTES_PER_DAY echt aanwezig/geldig
  // was, zie `parseProjectProperties`'s returntype) gaat MEE de aanroep in — spiegelt mspdiReader
  // (MinutesPerDay-override in `parseCalendar`). UURMODUS (etappe 1.5): `readCalendars` draait nu
  // VÓÓR `readTasks` (omgekeerde volgorde t.o.v. vóór deze etappe) — `readTasks` heeft de
  // kalender-objecten (met hun scalar, nog-NIET-gepromoveerde `hoursPerDay`/banden) nodig om het
  // (c)-signaal per taak te bepalen vóórdat `readTasks` ze zelf promoveert (zie mppCalendars.ts's
  // moduleheader en `readTasks`'s Fase B/C). De kalenders die hieronder in `calendar`/
  // `calResult.resourceCalendars` belanden zijn dus PAS na de `readTasks`-aanroep volledig
  // gepromoveerd — dat is geen probleem: het zijn dezelfde object-referenties, `readTasks` muteert
  // ze in-place (via `promoteHourCalendar`), en `readMPP` leest ze pas hieronder, ná die aanroep.
  const calResult = readCalendars(cfb, projectProps, applicationVersion, calendarHoursPerDayOverride);
  const calendar = calResult.projectCalendar;
  project.calendarId = calendar.id;

  // I2 (T5-kwaliteitsreview)/etappe 1.5: `readTasks` zet `Task.calendarId` nu INLINE (spiegelt
  // mspdiReader's `taskCalendarId`-toewijzing tijdens de taken-lus) — de oude post-hoc-koppelstap
  // (`calendarUniqueIdByTaskId` → `calResult.calendarByUniqueId`-lookup ná `readTasks`) is dus
  // vervallen; `taskHourById` voedt T7's relaties (lag-eenheid-keuze, spiegelt mspdiReader).
  const { tasks, taskIdByUniqueId, taskHourById } = readTasks({
    cfb, taskFieldMap, hoursPerDay, statusDate: project.statusDate, applicationVersion, calResult,
  });

  // T7: relaties/resources/assignments — compleet ImportResult, geen placeholders meer.
  const sequences = readRelations(cfb, applicationVersion, hoursPerDay, taskIdByUniqueId, taskHourById);

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
