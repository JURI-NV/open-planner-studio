/**
 * Pool-bestand (spec §4): één IFC 4.3-bestand per bedrijf met de kalenders/resources als echte
 * entiteiten (leesbaar voor derden) én de VOLLEDIGE pool als autoritatief `OPS_Library`-JSON
 * (verliesloos, incl. ids/versie). Delegeert aan de bestaande writeIFC/readIFC.
 */
import { writeIFC } from '@/services/ifc/ifcWriter';
import { readIFC } from '@/services/ifc/ifcReader';
import { createDefaultProject } from '@/state/slices/projectSlice';
import { createDefaultCalendar } from '@/engine/calendar/defaultCalendar';
import type { CompanyPool } from '@/types/library';

/** Serialiseer een pool naar een IFC-bestand (string). */
export function writePoolIFC(pool: CompanyPool): string {
  const project = {
    ...createDefaultProject(),
    name: `Bibliotheek — ${pool.companyName}`,
    company: pool.companyName,
    companyId: pool.companyId,
    companyName: pool.companyName,
  };
  return writeIFC({
    project,
    calendar: createDefaultCalendar(),
    tasks: [],
    sequences: [],
    resources: pool.resources,
    assignments: [],
    resourceCalendars: pool.calendars,
    libraryPool: pool,
  });
}

/** Lees een pool uit een IFC-bestand. Gooit als het bestand geen OPS_Library-pool draagt. */
export function readPoolIFC(content: string): CompanyPool {
  const result = readIFC(content);
  if (!result.libraryPool) {
    throw new Error('Dit IFC-bestand bevat geen bedrijfsbibliotheek (OPS_Library).');
  }
  return result.libraryPool;
}
