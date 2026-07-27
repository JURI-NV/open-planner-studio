/**
 * Demo-resourcebibliotheek (issue #19, user-verzoek): de drie showcase-voorbeelden (`public/examples/`,
 * `category: 'showcase'`) delen voortaan één gedeelde pool, zodat een nieuwe gebruiker "dezelfde ploeg
 * in twee projecten" direct in actie ziet — Timmerlieden/Installateurs/Stukadoors/Schilders komen
 * LETTERLIJK zo terug in zowel `showcase-rijwoningen-de-akkers.ifc` als
 * `showcase-appartementencomplex.ifc`, zodat de naam-herkenning (`matchByName`) ze automatisch koppelt.
 *
 * Puur data-/bouwmodule — geen store-afhankelijkheid (zie `librarySlice.seedDemoLibrary` voor de
 * store-integratie: dezelfde `set`/`persist`-laag als een gewone bibliotheek, hier alleen de
 * INHOUD). `buildDemoLibrarySeed()` genereert verse id's per aanroep (niet deterministisch qua id's),
 * maar de INHOUD (namen/type/maxUnits/costPerHour/kalenders) ligt vast.
 */
import type { Company, CompanyPool } from '@/types/library';
import type { WorkCalendar } from '@/types/calendar';
import type { Resource } from '@/types/resource';
import { generateId } from '@/utils/id';

/** Vast, herkenbaar id — nooit dubbel aangemaakt (spec: idempotente seed). Net als
 *  `DEFAULT_COMPANY_ID` in `@/types/library` is dit géén i18n-string: de bibliotheeknaam is
 *  opgeslagen data, geen UI-tekst. */
export const DEMO_COMPANY_ID = 'demo-resourcebibliotheek';

/** Vaste naam-literal (net als `createDefaultCompany()` in `@/types/library`) — bewust GEEN `t(...)`. */
const DEMO_COMPANY_NAME = 'Demo-resourcebibliotheek';

function buildBouwkalenderNL(): WorkCalendar {
  return {
    id: generateId('cal'),
    name: 'Bouwkalender NL',
    description: 'Standaard Nederlandse bouwkalender: maandag t/m vrijdag, 07:00-16:00.',
    workDays: [1, 2, 3, 4, 5],
    workStartHour: 7,
    workEndHour: 16,
    hoursPerDay: 8,
    holidays: [],
  };
}

function buildMetselploegKalender(): WorkCalendar {
  return {
    id: generateId('cal'),
    name: 'Metselploeg 4-daagse week',
    description: 'Verkorte werkweek voor de metselploeg: maandag t/m donderdag, 07:00-16:00.',
    workDays: [1, 2, 3, 4],
    workStartHour: 7,
    workEndHour: 16,
    hoursPerDay: 8,
    holidays: [],
  };
}

/** Bouw de vaste demo-bedrijf + -pool (spec: letterlijke inhoud uit de opdracht). */
export function buildDemoLibrarySeed(): { company: Company; pool: CompanyPool } {
  const company: Company = { id: DEMO_COMPANY_ID, name: DEMO_COMPANY_NAME };

  const bouwkalenderNL = buildBouwkalenderNL();
  const metselploegKalender = buildMetselploegKalender();

  // Bedraad ná id-toekenning: Metselploeg.calendarId verwijst naar de zojuist gegenereerde
  // 4-daagse-week-kalender-id.
  const resources: Resource[] = [
    { id: generateId('res'), name: 'Timmerlieden', type: 'LABOR', description: 'Timmerploeg voor ruwbouw en afbouw.', maxUnits: 4, costPerHour: 45 },
    { id: generateId('res'), name: 'Installateurs', type: 'LABOR', description: 'Elektrotechnische en werktuigbouwkundige installaties.', maxUnits: 4, costPerHour: 48 },
    { id: generateId('res'), name: 'Stukadoors', type: 'LABOR', description: 'Pleisterwerk op wanden en plafonds.', maxUnits: 3, costPerHour: 42 },
    { id: generateId('res'), name: 'Schilders', type: 'LABOR', description: 'Schilderwerk binnen en buiten.', maxUnits: 4, costPerHour: 38 },
    { id: generateId('res'), name: 'Metselaars', type: 'LABOR', description: 'Metselwerk voor gevels en binnenspouwbladen.', maxUnits: 6, costPerHour: 46 },
    { id: generateId('res'), name: 'Metselploeg', type: 'CREW', description: 'Doorschuivende metselploeg per woning.', maxUnits: 1, calendarId: metselploegKalender.id },
    { id: generateId('res'), name: 'Beton C20/25', type: 'MATERIAL', description: 'Standaard funderings- en constructiebeton.', maxUnits: 999, unitOfMeasure: 'm³' },
    { id: generateId('res'), name: 'Betonvlechters', type: 'LABOR', description: 'Wapeningsvlechtwerk.', maxUnits: 4, costPerHour: 44 },
    { id: generateId('res'), name: 'Tegelzetters', type: 'LABOR', description: 'Tegelwerk in badkamers en keukens.', maxUnits: 3, costPerHour: 43 },
    { id: generateId('res'), name: 'Keukenmonteurs', type: 'LABOR', description: 'Montage van keukens.', maxUnits: 2, costPerHour: 46 },
    { id: generateId('res'), name: 'Torenkraan', type: 'EQUIPMENT', description: 'Torenkraan voor verticaal transport.', maxUnits: 1, costPerHour: 120 },
    { id: generateId('res'), name: 'Beton C30/37', type: 'MATERIAL', description: 'Hogesterktebeton voor constructieve stort.', maxUnits: 999, unitOfMeasure: 'm³' },
    { id: generateId('res'), name: 'Gevelbouwer', type: 'SUBCONTRACTOR', description: 'Onderaannemer gevelbekleding.', maxUnits: 2, costPerHour: 60 },
    { id: generateId('res'), name: 'Liftleverancier', type: 'SUBCONTRACTOR', description: 'Onderaannemer levering en montage van de lift.', maxUnits: 1, costPerHour: 90 },
  ];

  const pool: CompanyPool = {
    companyId: company.id,
    companyName: company.name,
    poolVersion: 1,
    modifiedAt: new Date().toISOString(),
    calendars: [bouwkalenderNL, metselploegKalender],
    resources,
  };

  return { company, pool };
}
