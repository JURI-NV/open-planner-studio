import type { Project } from '@/types/project';
import type { WorkCalendar } from '@/types/calendar';
import type { Task } from '@/types/task';
import type { Sequence } from '@/types/sequence';
import type { Resource, ResourceAssignment } from '@/types/resource';
import type { ActivityCodeType, CustomFieldDef } from '@/types/structure';
import type { Baseline } from '@/types/baseline';
import type { CompanyPool } from '@/types/library';
import type { RecordedFieldKey } from '@/services/ifc/ifcTaskSlots';

/**
 * Eén gedeelde payload-vorm voor een ingelezen project (audit P1). De vier readers (`readIFC`,
 * `readMSPDI`, `readP6XML`, `readCSV`) gaven elk een eigen ad-hoc objectvorm terug (11/9/7/6
 * velden), die de store met `as`-casts moest verzoenen. Nu retourneren ze allemaal dit type:
 *
 *  - De **kernvelden** levert elk formaat altijd.
 *  - De **optionele velden** levert niet elk formaat: CSV/P6 kennen bv. geen baselines, alleen
 *    IFC kent activity-codes/custom-fields. Ontbrekend ⇒ afwezig (`undefined`), de aanroeper
 *    valt terug op `?? []` / `?? null`.
 *
 * `writeIFC` hergebruikt dit type (zie `WriteIFCInput` in `ifcWriter.ts`) omdat de writer exact
 * dezelfde payload nodig heeft — zo blijft de IFC-round-trip symmetrisch getypeerd.
 */
/**
 * Vertaalde teksten die een aanroeper aan een reader meegeeft. De readers zijn dienstlaag: ze
 * hebben geen `t(...)`, en `@/i18n/config` importeren is daar geen optie — die module raakt bij
 * module-init `document.documentElement`, wat de headless test-/scriptbundels (`tests/planning`,
 * `tests/mcp`, `scripts/verify-examples`) meteen sloopt met `document is not defined`.
 *
 * Zelfde patroon als `PrintOptions.labels` in `services/print/printPreview.ts`: de UI-laag lost de
 * tekst op en geeft 'm door. Elk veld is optioneel; ontbreekt het, dan valt de reader terug op een
 * Engelse default (net als `'Imported Calendar'` in de MSPDI-reader).
 */
export interface ImportLabels {
  /**
   * Projectnaam voor een bestand dat GEEN `IFCPROJECT` bevat — het noodgeval-pad voor een kapot of
   * vreemd bestand. Deze naam wordt bewust in de DATA gestempeld (anders zou de weergave terugvallen
   * op "naamloos", wat misleidend is zodra er wél taken uit het bestand komen); de taal van het
   * moment bakt daarmee in de naam, en de gebruiker hernoemt.
   */
  importedProject?: string;
}

export interface ImportResult {
  // Kernvelden — door elk formaat geleverd.
  project: Project;
  calendar: WorkCalendar;
  tasks: Task[];
  sequences: Sequence[];
  resources: Resource[];
  assignments: ResourceAssignment[];
  // Optionele velden — niet elk formaat levert deze.
  resourceCalendars?: WorkCalendar[];
  activityCodeTypes?: ActivityCodeType[];
  customFieldDefs?: CustomFieldDef[];
  baselines?: Baseline[];
  activeBaselineId?: string | null;
  /** OPTIONEEL — een pool-bestand (spec B1, §4) draagt zijn autoritatieve pool-JSON in het
   *  OPS_Library-pset; een gewoon projectbestand niet. Afwezig ⇒ geen pool-bestand. */
  libraryPool?: CompanyPool;
  /** OPTIONEEL — per taak-id welke IfcTaskTime-slots het bestand daadwerkelijk vulde: de zeven
   *  REKENSLOTS (`RECORDED_SLOT_KEYS`) én de twee INVOERSLOTS ScheduleStart/ScheduleFinish
   *  (`RECORDED_INPUT_SLOT_KEYS`) — de laatste twee zijn nodig als terugval-anker wanneer de
   *  rekenslots leeg zijn (issue #63). Alleen `readIFC` levert dit; CSV/MSPDI/P6/extensie-import
   *  kennen geen IfcTaskTime-slots en laten het weg. Nodig omdat `parseDateFromIFC` een `$`-slot als
   *  "vandaag" inleest — na het parsen is een leeg slot niet meer van een echte datum te
   *  onderscheiden. Een taak-id ZONDER IfcTaskTime krijgt een lege array (niet: ontbrekende sleutel)
   *  — "geen enkel slot gevuld" is een uitspraak, "onbekend" niet. */
  recordedFields?: Record<string, RecordedFieldKey[]>;
}
