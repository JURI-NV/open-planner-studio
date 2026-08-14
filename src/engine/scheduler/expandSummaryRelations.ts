import type { Task } from '@/types/task';
import type { Sequence } from '@/types/sequence';

/**
 * Volledige samenvattingsrelatie-propagatie (vervolg op 489a9ef2). `CPMSolver` kent alleen
 * bladtaken (`childIds.length === 0`) als knopen; een relatie die een WBS-samenvattingstaak raakt
 * kan de solver dus niet zelf verwerken. 489a9ef2 loste de crash op door zulke relaties te droppen
 * (`CPMResult.droppedSequenceIds`) — een bewuste tussenoplossing die op een echt corpusbestand
 * (Bijlage 13 Productieplanning.mpp) 28 van de 105 relaties liet vallen: een kwart van de logica.
 *
 * MS Project-semantiek (referentie: de MSPDI-export van datzelfde bestand, die MS Project's eigen
 * berekende datums bevat) past een relatie op een samenvattingstaak toe op ELK onderliggend
 * bladkind:
 *   - samenvatting als VOORGANGER: elke bladafstammeling wordt zelf voorganger van de opvolger.
 *     Met FS betekent dat "wacht tot de hele tak klaar is" — dat volgt vanzelf uit de bestaande
 *     forward-pass, die per opvolger de MAX neemt over alle inkomende relatie-constraints. Er is
 *     dus geen aparte "laatste kind"-berekening nodig: één relatie per bladkind is voldoende, de
 *     solver doet de rest.
 *   - samenvatting als OPVOLGER: elke bladafstammeling wordt zelf opvolger van de voorganger — elk
 *     kind wacht op diezelfde voorganger, onafhankelijk van de andere kinderen.
 *   - beide kanten samenvatting: het kruisproduct van de twee (herschreven) kanten.
 *   - geneste samenvattingen: `leafDescendantsOf` daalt recursief af tot bladtaken, cyclusvast (een
 *     `visited`-set voorkomt oneindige recursie als `childIds` ooit corrupt een cyclus vormt).
 *
 * Lag/type van de oorspronkelijke relatie blijft op elke gegenereerde bladrelatie staan (spread);
 * alleen `id`/`predecessorId`/`successorId` wijzigen. Synthetische ids zijn afleidbaar van het
 * origineel (`${seq.id}::exp-<n>`) — deze functie is PUUR en schrijft niets naar de store; de
 * synthetische relaties bestaan alleen als solver-invoer.
 */

/**
 * Kwadratische-explosie-klem, analoog aan `CalendarEngine.MAX_SCAN`/`MAX_DAYS`: het kruisproduct
 * van twee samenvattingstakken met N resp. M bladkinderen genereert N×M relaties. Eén relatie
 * tussen twee samenvattingen van elk 500 bladkinderen is al 250.000 combinaties — precies het soort
 * gat dat hier eerder is gevonden (K-items). Harde bovengrens op het TOTAAL aantal synthetische
 * relaties dat deze functie over ALLE input-relaties samen mag produceren.
 *
 * Gedrag bij overschrijding: een relatie waarvan het eigen kruisproduct niet meer past wordt
 * ATOMAIR gedropt (nooit een gedeeltelijke — dus semantisch onjuiste — subset van bladrelaties) en
 * ELKE volgende relatie die zelf óók expansie nodig heeft, wordt daarna eveneens gedropt (geen
 * her-proberen op een kleiner kruisproduct verderop in de lijst — voorspelbaar "op is op"-gedrag
 * i.p.v. afhankelijk van invoervolgorde toch soms slagen). Relaties die al bladtaak-naar-bladtaak
 * waren (geen expansie nodig) blijven ONGEMOEID doorlopen — zij tellen niet mee tegen de klem, want
 * die groeien nooit kwadratisch (hooguit lineair met het aantal relaties, zoals vóór deze wijziging).
 */
export const MAX_EXPANDED_RELATIONS = 50_000;

export interface ExpandSummaryRelationsResult {
  /** Bladtaak-naar-bladtaak relaties, geschikt om direct aan `CPMSolver` te voeren. */
  sequences: Sequence[];
  /** Ids van ORIGINELE relaties die niet konden worden gerepresenteerd: een samenvatting zonder
   *  bladafstammelingen (lege/kapotte tak), of de MAX_EXPANDED_RELATIONS-klem. Bedoeld om door de
   *  aanroeper samengevoegd te worden met `CPMResult.droppedSequenceIds` (de 489a9ef2-guard in de
   *  solver zelf blijft het vangnet voor écht verweesde/ongeldige taak-ids). */
  droppedSequenceIds: string[];
}

/** Lege, cache-gedeelde constante voor "geen bladafstammelingen" (kapotte/lege tak). */
const NONE: string[] = [];

export function expandSummaryRelations(tasks: Task[], sequences: Sequence[]): ExpandSummaryRelationsResult {
  const byId = new Map(tasks.map((t) => [t.id, t]));
  const leafDescCache = new Map<string, string[]>();

  // Recursief (geneste samenvattingen) tot bladtaken, cyclusvast via een visited-set per aanroep
  // (corrupte `childIds` mag nooit een oneindige lus geven) en gecached over relaties heen (een
  // groot bestand kan dezelfde samenvatting als kant van meerdere relaties hebben).
  function leafDescendantsOf(rootId: string): string[] {
    const cached = leafDescCache.get(rootId);
    if (cached) return cached;
    const root = byId.get(rootId);
    if (!root) return NONE;
    if (root.childIds.length === 0) {
      const self = [rootId];
      leafDescCache.set(rootId, self);
      return self;
    }
    const out: string[] = [];
    const visited = new Set<string>([rootId]);
    const stack: string[] = [...root.childIds];
    while (stack.length > 0) {
      const id = stack.pop()!;
      if (visited.has(id)) continue; // cyclus of dubbele boomverwijzing — stil negeren, niet crashen
      visited.add(id);
      const t = byId.get(id);
      if (!t) continue; // verweesd kind-id — geen bladtaak om te representeren
      if (t.childIds.length === 0) {
        out.push(id);
      } else {
        stack.push(...t.childIds);
      }
    }
    leafDescCache.set(rootId, out);
    return out;
  }

  const outSeqs: Sequence[] = [];
  const dropped: string[] = [];
  let budget = MAX_EXPANDED_RELATIONS;
  let budgetExhausted = false;

  for (const seq of sequences) {
    const predTask = byId.get(seq.predecessorId);
    const succTask = byId.get(seq.successorId);
    if (!predTask || !succTask) {
      // Geen samenvattingsgeval — een echt verweesd/ongeldig taak-id. Ongewijzigd doorgeven; de
      // bestaande CPMSolver-constructor-guard (489a9ef2) droppt 'm met zijn eigen waarschuwing.
      outSeqs.push(seq);
      continue;
    }
    const predIsLeaf = predTask.childIds.length === 0;
    const succIsLeaf = succTask.childIds.length === 0;
    if (predIsLeaf && succIsLeaf) {
      outSeqs.push(seq); // geen samenvatting aan weerskant — niets te expanderen
      continue;
    }

    const predIds = predIsLeaf ? [predTask.id] : leafDescendantsOf(predTask.id);
    const succIds = succIsLeaf ? [succTask.id] : leafDescendantsOf(succTask.id);
    if (predIds.length === 0 || succIds.length === 0) {
      // Samenvatting zonder bladafstammelingen (lege of kapotte tak) — niets om te representeren.
      dropped.push(seq.id);
      continue;
    }

    if (budgetExhausted) {
      dropped.push(seq.id);
      continue;
    }

    const size = predIds.length * succIds.length; // ruwe bovengrens; p===s-zelfrelaties (zeldzaam,
    // alleen bij corrupte data) tellen conservatief mee — nooit tegen de klem in.
    if (size > budget) {
      budgetExhausted = true;
      dropped.push(seq.id);
      console.warn(
        `expandSummaryRelations: MAX_EXPANDED_RELATIONS (${MAX_EXPANDED_RELATIONS}) bereikt bij ` +
        `relatie "${seq.id}" (${predIds.length}×${succIds.length}=${size} combinaties). Deze en alle ` +
        'volgende relaties die zelf óók expansie nodig hebben, worden genegeerd i.p.v. de solver ' +
        'te laten vastlopen/OOM\'en.',
      );
      continue;
    }

    let n = 0;
    for (const p of predIds) {
      for (const s of succIds) {
        if (p === s) continue; // zelfde bladtaak aan beide kanten — geen zelf-relatie genereren
        outSeqs.push({ ...seq, id: `${seq.id}::exp-${n++}`, predecessorId: p, successorId: s });
      }
    }
    budget -= size;
  }

  return { sequences: outSeqs, droppedSequenceIds: dropped };
}
