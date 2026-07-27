import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { useAppStore } from '@/state/appStore';
import { useTranslation } from 'react-i18next';
import { Select } from '@/components/common/Select';
import { DateTextInput } from '@/components/common/DateTextInput';
import { formatDate } from '@/utils/dateUtils';
import { PROJECT_TEMPLATES, templatePhases, buildGeneratedCalendar, type TemplateKey } from '@/utils/projectTemplates';
import { CalendarGeneratorFields } from '@/components/dialogs/CalendarGeneratorFields';
import { CalcOptionsSection } from '@/components/dialogs/CalcOptionsSection';
import { computeGenerateSpan, type HolidayGenParams } from '@/engine/calendar/generateCalendarHolidays';
import type { HolidayCountry } from '@/engine/calendar/holidays';
import { WIZARD_PRESETS, SHIFT_PRESET_LABEL, shiftPresetPatch, type ShiftPresetKey } from '@/utils/shiftPresets';
import type { SchedulingOptions } from '@/types/project';

/** Wizard-generatorstatus: `HolidayGenParams` uitgebreid met de wizard-only pseudo-keuze
 *  `'custom'` ("Aangepast…", ontwerp §7.2) — die opent na aanmaken de kalenderdialoog i.p.v.
 *  een land-set te genereren. */
type WizardCalendarState = Omit<HolidayGenParams, 'country'> & { country: HolidayCountry | 'none' | 'custom' };

const DEFAULT_WIZARD_CALENDAR: WizardCalendarState = {
  country: 'NL', region: undefined, bouwvak: 'geen', // default GEEN bouwvak (harde eis)
};

/** Pseudo-waarde voor de "+ Nieuwe resourcebibliotheek…"-optie in de bibliotheek-select (issue #19). */
const NEW_COMPANY_OPTION = '__new__';

export interface ProjectInfoPanelContentHandle {
  /** Committeert de huidige draft — wizard ⇒ createNewProject + bibliotheek-koppeling; edit ⇒
   *  setProject + bibliotheek-(ont)koppeling (+ runCPM als de Berekening-sectie wijzigde). */
  submit: () => void;
}

export interface ProjectInfoPanelContentProps {
  /** 'wizard' = nieuw-project-wizard (ui.showNewProjectDialog): toont sjabloon/ploeg-preset/
   *  kalender-generator, geen Berekening-sectie.
   *  'edit' = bestaand project bewerken — zowel de dialoog-op-bestaand-project als de
   *  Backstage → Projectinfo-sectie draaien in deze modus. */
  mode: 'wizard' | 'edit';
  /** Aangeroepen NA een geslaagde submit(); de wrapper bepaalt wat "klaar" betekent (dialoog sluiten,
   *  Backstage terug naar Start-tab). */
  onDone: () => void;
}

/**
 * Eén gedeelde projectinfo-velden-UI (issue #19), naar het model van `SettingsPanelContent`: dezelfde
 * veld-rendering + commit-logica draait achter twee chrome's — `ProjectInfoDialog` (tevens de
 * nieuw-project-wizard) en de Backstage → Projectinfo-sectie (`ProjectInfoSection` in Backstage.tsx).
 * Beide worden dunne wrappers die alleen hun eigen container/knoppen + de Dialog-chrome (Esc/backdrop/
 * Enter) leveren.
 *
 * Anders dan Settings (live-apply, geen pending state) werkt projectinfo met een LOKALE DRAFT +
 * expliciete commit: de wrapper bezit de knoppen en roept `submit()` aan via een `ref`
 * (`ProjectInfoPanelContentHandle`) — nodig omdat `Dialog`'s Enter-afhandeling (`onConfirm`) op het
 * BUITENSTE element zit, vóór dit component gemount wordt.
 *
 * Commit-semantiek (KRITISCH, ongewijzigd t.o.v. de oude losse implementaties in ProjectInfoDialog en
 * Backstage's ProjectInfoSection):
 *  - `mode="wizard"`: `createNewProject(...)` + bibliotheek-koppeling (`bindProjectToCompany`) +
 *    herkenning (`computeRecognition` → evt. `showLibraryLinkDialog`).
 *  - `mode="edit"`: `setProject(...)` + bibliotheek-(ont)koppeling (`bindProjectToCompany`/
 *    `unbindProject`) + (bij gewijzigde Berekening-sectie) `runCPM()`.
 */
export const ProjectInfoPanelContent = forwardRef<ProjectInfoPanelContentHandle, ProjectInfoPanelContentProps>(
  function ProjectInfoPanelContent({ mode, onDone }, ref) {
    const isNew = mode === 'wizard';
    const { t: tMenu } = useTranslation('menu');
    const { t: tCommon } = useTranslation('common');
    const project = useAppStore(s => s.project);
    const activeRibbonTab = useAppStore(s => s.ui.activeRibbonTab);
    const setProject = useAppStore(s => s.setProject);
    const createNewProject = useAppStore(s => s.createNewProject);
    const setUI = useAppStore(s => s.setUI);
    const runCPM = useAppStore(s => s.runCPM);

    const [name, setName] = useState(isNew ? '' : project.name);
    const [description, setDescription] = useState(isNew ? '' : project.description);
    const [author, setAuthor] = useState(isNew ? '' : project.author);
    const [company, setCompany] = useState(isNew ? '' : project.company);
    const [startDate, setStartDate] = useState(isNew ? formatDate(new Date()) : project.startDate);
    const [endDate, setEndDate] = useState(isNew ? '' : project.endDate);
    // Berekening-sectie als DRAFT (fase 2.9-fix): net als Naam/Omschrijving bewerkt de Berekening-sectie
    // een lokale kopie; de store wijzigt pas op submit() (consistent Annuleren-gedrag). Vers gemount ⇒
    // initialiseert uit het huidige project.
    const [schedulingOptions, setSchedulingOptions] = useState<SchedulingOptions>(
      isNew ? {} : (project.schedulingOptions ?? {}),
    );
    // Bouwmodus (2026-07-13): in bouw-agnostische modus (bouwmodus UIT) start de kalender-generator op
    // `country: 'none'` (geen NL-feestdagen) i.p.v. NL. Het component wordt vers gemount, dus de
    // useState-initializer leest de vlag eenmalig — geen re-init nodig.
    const constructionMode = useAppStore(s => s.ui.constructionMode);
    const [calState, setCalState] = useState<WizardCalendarState>(() =>
      constructionMode
        ? DEFAULT_WIZARD_CALENDAR
        : { country: 'none', region: undefined, bouwvak: 'geen' },
    );
    const [template, setTemplate] = useState<TemplateKey>('empty');
    const companies = useAppStore(s => s.companies);
    const defaultCompanyId = useAppStore(s => s.defaultCompanyId);
    const bindProjectToCompany = useAppStore(s => s.bindProjectToCompany);
    const unbindProject = useAppStore(s => s.unbindProject);
    const addCompany = useAppStore(s => s.addCompany);
    // Voorselectie: het gekoppelde bedrijf, anders het standaardbedrijf (spec §2 — gekoppeld is de norm).
    const [linkedCompanyId, setLinkedCompanyId] = useState<string>(isNew ? defaultCompanyId : (project.companyId ?? ''));
    // Ploeg-preset (§6.7): default 'day' = dag-kalender (byte-identiek). Alleen zichtbaar met
    // Urenplanning aan; een niet-default preset materialiseert workTime + shift op de nieuwe kalender.
    const enableHourPlanning = useAppStore(s => s.ui.enableHourPlanning);
    const [shiftPreset, setShiftPreset] = useState<ShiftPresetKey>('day');

    // Generatie-spanne bij aanmaak (§4.4): nog geen projecteinde bekend ⇒ startjaar−1..+3.
    const calSpan = useMemo(() => computeGenerateSpan(startDate, endDate || undefined), [startDate, endDate]);

    const handleSubmit = () => {
      if (isNew) {
        const isCustom = calState.country === 'custom';
        const calendar = isCustom
          ? buildGeneratedCalendar({ country: 'none', bouwvak: 'geen' }, calSpan)
          : buildGeneratedCalendar(calState as HolidayGenParams, calSpan);
        // Ploeg-preset materialiseren (§6.7): default 'day' laat de kalender een dag-kalender (geen
        // workTime); een niet-default preset zet workTime + shift + scalar-fallback op nieuwe entries.
        if (enableHourPlanning && shiftPreset !== 'day') {
          const patch = shiftPresetPatch(shiftPreset);
          calendar.workTime = patch.workTime;
          calendar.shift = patch.shift;
          calendar.workDays = patch.workDays;
          calendar.workStartHour = patch.workStartHour;
          calendar.workEndHour = patch.workEndHour;
          calendar.hoursPerDay = patch.hoursPerDay;
        }
        createNewProject({
          name, description, author, company, startDate, endDate,
          calendar,
          phaseNames: templatePhases(template),
        });
        // Spec §2/§5: koppel aan het gekozen bedrijf (default = standaardbedrijf). Herkenning start
        // pas als het project al inhoud heeft — bij een vers, leeg project is dat een no-op.
        if (linkedCompanyId) {
          bindProjectToCompany(linkedCompanyId);
          if (useAppStore.getState().computeRecognition().some(c => c.suggestedPoolId)) {
            useAppStore.getState().setUI({ showLibraryLinkDialog: true });
          }
        }
        // Verlaat de Backstage zodat het nieuwe project meteen zichtbaar is; "Aangepast…" opent
        // meteen de kalenderdialoog zodat de gebruiker de kalender handmatig kan samenstellen (§7.2).
        setUI({
          showNewProjectDialog: false,
          ...(isCustom ? { showCalendarDialog: true } : {}),
          ...(activeRibbonTab === 'file' ? { activeRibbonTab: 'start' as const } : {}),
        });
      } else {
        // Committeer de metadata + de Berekening-draft in één keer. `schedulingOptions` alleen aanraken
        // als hij daadwerkelijk wijzigde (anders geen spurious dirty / geen onnodige herberekening).
        // Genormaliseerd via JSON-roundtrip zodat undefined-sleutels verdwijnen ⇒ leeg wordt `undefined`
        // (byte-identiek met "geen opties").
        const normalized = JSON.parse(JSON.stringify(schedulingOptions)) as SchedulingOptions;
        const soChanged = JSON.stringify(normalized) !== JSON.stringify(project.schedulingOptions ?? {});
        setProject({
          name, description, author, company, startDate, endDate,
          ...(soChanged
            ? { schedulingOptions: Object.keys(normalized).length > 0 ? normalized : undefined }
            : {}),
        });
        const prevCompany = project.companyId ?? '';
        if (linkedCompanyId !== prevCompany) {
          if (linkedCompanyId) {
            bindProjectToCompany(linkedCompanyId);
            if (useAppStore.getState().computeRecognition().some(c => c.suggestedPoolId)) {
              useAppStore.getState().setUI({ showLibraryLinkDialog: true });
            }
          } else {
            unbindProject();
          }
        }
        if (soChanged) runCPM();
      }
      onDone();
    };

    useImperativeHandle(ref, () => ({ submit: handleSubmit }));

    const inputCls =
      'px-2 py-1.5 bg-surface border-[1.5px] border-[var(--theme-control-border)] rounded-[8px] text-text-primary focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(217,119,6,0.2)] transition-[border-color,box-shadow]';

    const templateLabel: Record<TemplateKey, string> = {
      empty: tMenu('newProject.tmplEmpty'),
      woningbouw: tMenu('newProject.tmplWoningbouw'),
      utiliteit: tMenu('newProject.tmplUtiliteit'),
    };
    // Bouwmodus UIT (bouw-agnostisch): alleen "Leeg" aanbieden — de bouwsjablonen (woningbouw/
    // utiliteit) zijn bouwjargon en vervallen uit de keuzelijst. Default stond al op 'empty'.
    const templateOptions = PROJECT_TEMPLATES
      .filter(t => constructionMode || t.key === 'empty')
      .map(t => ({ value: t.key, label: templateLabel[t.key] }));

    // "+ Nieuwe resourcebibliotheek…" (issue #19): direct vanuit de selector een nieuwe, lege
    // resourcebibliotheek aanmaken en meteen als koppeling kiezen — zonder eerst naar Backstage →
    // Bibliotheek te hoeven. De koppeling zelf committeert pas op submit() (zelfde als een bestaande
    // resourcebibliotheek kiezen).
    const handleCompanySelectChange = (value: string) => {
      if (value === NEW_COMPANY_OPTION) {
        const newId = addCompany(tCommon('companyLibrary.newCompany'));
        setLinkedCompanyId(newId);
      } else {
        setLinkedCompanyId(value);
      }
    };

    return (
      <div className="flex flex-col gap-3 text-xs" data-ops-project-info-panel>
        <div className="flex flex-col gap-1">
          <label className="text-text-secondary font-medium">{tMenu('projectInfo.name')}</label>
          <input value={name} onChange={e => setName(e.target.value)} className={inputCls} autoFocus />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-text-secondary font-medium">{tMenu('projectInfo.description')}</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className={`${inputCls} resize-none`} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-text-secondary font-medium">{tMenu('projectInfo.author')}</label>
            <input value={author} onChange={e => setAuthor(e.target.value)} className={inputCls} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-text-secondary font-medium">{tCommon('companyLibrary.linkedCompany')}</label>
            <select
              value={linkedCompanyId}
              onChange={e => handleCompanySelectChange(e.target.value)}
              className={inputCls}
              data-ops-project-company-select
            >
              <option value="">{tCommon('companyLibrary.noCompanyLinked')}</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              <option value={NEW_COMPANY_OPTION}>{tCommon('companyLibrary.addNewOption')}</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-text-secondary font-medium">{tCommon('companyLibrary.clientOrg')}</label>
          <input value={company} onChange={e => setCompany(e.target.value)} className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-text-secondary font-medium">{tMenu('projectInfo.startDate')}</label>
            <DateTextInput value={startDate} onCommit={setStartDate} className={inputCls} ariaLabel={tMenu('projectInfo.startDate')} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-text-secondary font-medium">{tMenu('projectInfo.endDate')}</label>
            <DateTextInput value={endDate} onCommit={setEndDate} className={inputCls} ariaLabel={tMenu('projectInfo.endDate')} />
          </div>
        </div>

        {isNew && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-text-secondary font-medium">{tMenu('newProject.template')}</label>
              <Select aria-label={tMenu('newProject.template')} value={template}
                onChange={v => setTemplate(v as TemplateKey)} options={templateOptions} />
            </div>

            {/* Ploeg-preset (§6.7) — alleen met Urenplanning aan; default 'Dagdienst' = dag-kalender. */}
            {enableHourPlanning && (
              <div className="flex flex-col gap-1">
                <label className="text-text-secondary font-medium">{tCommon('calendar.worktime.shiftPreset')}</label>
                <Select aria-label={tCommon('calendar.worktime.shiftPreset')} value={shiftPreset}
                  onChange={v => setShiftPreset(v as ShiftPresetKey)}
                  options={WIZARD_PRESETS.map(k => ({ value: k, label: tCommon(SHIFT_PRESET_LABEL[k] as 'calendar.shift.day') }))} />
              </div>
            )}

            {/* Feestdagen-generator (fase 2.8a, §7.2): land/regio, bouwvak (default GEEN — harde
                eis) + compacte preview. "Aangepast…" (extra optie in de land-select) verbergt de
                rest van de generator (leeg gestart; de kalenderdialoog opent na aanmaken om
                handmatig te bewerken, zie `handleSubmit`). */}
            <div className="h-px" style={{ background: 'var(--theme-border-light)' }} />
            <span className="text-text-secondary font-medium">{tMenu('wizard.calendar.country')}</span>
            <CalendarGeneratorFields
              value={calState}
              onChange={patch => setCalState(s => ({ ...s, ...patch }))}
              fromYear={calSpan.from}
              toYear={calSpan.to}
              noneLabel={tMenu('wizard.calendar.none')}
              extraCountryOptions={[{ value: 'custom', label: tMenu('wizard.calendar.custom') }]}
            />
          </>
        )}

        {/* Berekening-sectie (fase 2.9 §5.7/§7, besluit B5) — alleen bij het bewerken van een
            bestaand project (niet in de nieuw-project-wizard). Draait nu identiek op beide
            edit-oppervlakken (dialoog én Backstage). */}
        {!isNew && <CalcOptionsSection value={schedulingOptions} onChange={setSchedulingOptions} />}
      </div>
    );
  },
);
