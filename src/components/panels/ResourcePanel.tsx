import { useState, useMemo, useEffect, Fragment } from 'react';
import { useAppStore } from '@/state/appStore';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, Pencil, ChevronDown, ChevronRight, X, Check } from 'lucide-react';
import type { Resource, ResourceType, AvailabilityStep } from '@/types/resource';
import { createDefaultCalendar } from '@/engine/calendar/defaultCalendar';
import { formatDate } from '@/utils/dateUtils';
import { ResourceCalendarDialog } from '@/components/dialogs/ResourceCalendarDialog';
import { UnitsInput } from '@/components/common/UnitsInput';
import { DateTextInput } from '@/components/common/DateTextInput';

const RESOURCE_TYPES: ResourceType[] = ['LABOR', 'EQUIPMENT', 'MATERIAL', 'SUBCONTRACTOR', 'CREW'];

const TYPE_KEY = {
  LABOR: 'resource.type.labor',
  EQUIPMENT: 'resource.type.equipment',
  MATERIAL: 'resource.type.material',
  SUBCONTRACTOR: 'resource.type.subcontractor',
  CREW: 'resource.type.crew',
} as const satisfies Record<ResourceType, string>;

const NEW_CAL = '__new';

const cellInput = 'input !text-[11px] !px-1.5 !py-1 w-full';

/**
 * Resource-beheerpaneel (fase 2.5, §6.2) — full-panel, patroon `TableEditor`. Inline-bewerkbare
 * tabel over `s.resources` met kolommen naam/type/max.eenheden/kalender/tarief/eenheid/ploeg, plus
 * een uitklapbare availabilitySteps-subrij per resource. De kalender-dropdown verwijst naar
 * `s.resourceCalendars`; "Bewerken…" en "+ nieuwe kalender" openen de bestaande
 * `ResourceCalendarDialog`.
 */
export function ResourcePanel() {
  const { t, i18n } = useTranslation('common');
  const resources = useAppStore(s => s.resources);
  const resourceCalendars = useAppStore(s => s.calendars);
  const assignments = useAppStore(s => s.assignments);
  const resourceLoadResult = useAppStore(s => s.resourceLoadResult);
  const hoursPerDay = useAppStore(s => s.calendar.hoursPerDay);
  const addResource = useAppStore(s => s.addResource);
  const updateResource = useAppStore(s => s.updateResource);
  const removeResource = useAppStore(s => s.removeResource);
  const addCalendar = useAppStore(s => s.addCalendar);
  const setUI = useAppStore(s => s.setUI);
  const project = useAppStore(s => s.project);
  const companies = useAppStore(s => s.companies);
  const pools = useAppStore(s => s.pools);
  const resourcesView = useAppStore(s => s.ui.resourcesView);
  const addPoolResource = useAppStore(s => s.addPoolResource);
  const removePoolResource = useAppStore(s => s.removePoolResource);
  const updatePoolResource = useAppStore(s => s.updatePoolResource);
  const addLibraryResourceToProject = useAppStore(s => s.addLibraryResourceToProject);
  const linked = !!project.companyId && companies.some(c => c.id === project.companyId);
  const pool = project.companyId ? pools[project.companyId] : undefined;

  // Kalender-editor: null = dicht, string = bewerk die id.
  const [calDialog, setCalDialog] = useState<string | null>(null);
  // Uitgeklapte availabilitySteps-subrij (één tegelijk).
  const [expandedSteps, setExpandedSteps] = useState<string | null>(null);
  // Resource die op verwijder-bevestiging wacht (bevinding 6, cascade-waarschuwing).
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  // Poolresource die op verwijder-bevestiging wacht (critreview 51ad2ec, fix 1): bedrijfsbrede
  // delete buiten undo krijgt dezelfde bevestigingsrem als de projectgrid-delete hierboven.
  const [confirmPoolDelete, setConfirmPoolDelete] = useState<string | null>(null);
  // Feedback op "Toewijzen aan project" (critreview 51ad2ec, fix 2): hergebruikt het
  // added/alreadyInProject-notice-patroon van de oude AddFromLibraryDialog.
  const [poolNotice, setPoolNotice] = useState<string | null>(null);

  // Bevestiging + notice horen bij de Bedrijfsweergave; reset zodra je 'm verlaat, zodat er geen
  // stale confirm-stap of melding terugkomt bij een latere terugkeer naar deze weergave.
  useEffect(() => {
    if (resourcesView !== 'company') { setConfirmPoolDelete(null); setPoolNotice(null); }
  }, [resourcesView]);

  const onAssignFromCompany = (resourceId: string) => {
    const result = addLibraryResourceToProject(project.companyId!, resourceId);
    setPoolNotice(result.added ? t('companyLibrary.added') : t('companyLibrary.alreadyInProject'));
  };

  // Default-weergave (spec §4): Bedrijfsweergave zodra de pool inhoud heeft; lege pool of los
  // project ⇒ Projectweergave. Draait bij koppeling-wissel, niet bij elke render/edit.
  useEffect(() => {
    if (!linked) { if (resourcesView !== 'project') setUI({ resourcesView: 'project' }); return; }
    const hasContent = (pool?.resources.length ?? 0) > 0;
    setUI({ resourcesView: hasContent ? 'company' : 'project' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.companyId, linked]);

  const crews = resources.filter(r => r.type === 'CREW');

  const numberFmt = useMemo(
    () => new Intl.NumberFormat(i18n.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [i18n.language],
  );

  // Kosten-totaal per resource (bevinding 8): Σ belaste eenheden × uren/dag × tarief.
  // uren = eenheden × hoursPerDay van de projectkalender; undefined = "—" (geen tarief of belasting).
  const costByResource = useMemo(() => {
    const map: Record<string, number | undefined> = {};
    for (const r of resources) {
      const load = resourceLoadResult?.load[r.id];
      if (!load || r.costPerHour == null) { map[r.id] = undefined; continue; }
      const totalUnits = Object.values(load).reduce((a, b) => a + b, 0);
      map[r.id] = totalUnits * hoursPerDay * r.costPerHour;
    }
    return map;
  }, [resources, resourceLoadResult, hoursPerDay]);

  const grandTotal = useMemo(() => {
    const vals = Object.values(costByResource).filter((v): v is number => v !== undefined);
    return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) : undefined;
  }, [costByResource]);

  const assignmentCount = (resourceId: string) =>
    assignments.filter(a => a.resourceId === resourceId).length;

  const requestRemove = (resourceId: string) => {
    if (assignmentCount(resourceId) > 0) {
      setConfirmDelete(resourceId);
    } else {
      removeResource(resourceId);
    }
  };

  const addRow = () => {
    addResource({ name: '', type: 'LABOR', description: '', maxUnits: 1 });
  };

  const patch = (id: string, updates: Partial<Resource>) => updateResource(id, updates);

  // "+ nieuwe kalender": maak direct een lege resource-kalender aan, koppel 'm en open de editor.
  const createAndEditCalendar = (resourceId: string) => {
    const { id: _drop, ...base } = createDefaultCalendar();
    void _drop;
    const id = addCalendar({ ...base, name: t('resource.calendarDialog.title') });
    updateResource(resourceId, { calendarId: id });
    setCalDialog(id);
  };

  const onCalendarChange = (resource: Resource, value: string) => {
    if (value === NEW_CAL) {
      createAndEditCalendar(resource.id);
      return;
    }
    updateResource(resource.id, { calendarId: value || undefined });
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden text-xs">
      <div className="flex items-center justify-between h-9 px-3 border-b border-border flex-shrink-0">
        <span className="ui-card-header !text-xs">{t('resource.panel.title')}</span>
        <div className="flex items-center gap-2">
          {linked && (
            <div className="flex items-center rounded-[8px] border border-border overflow-hidden" data-ops-resources-view-toggle>
              <button
                className={`px-2 py-1 ${resourcesView === 'company' ? 'bg-surface-hover font-semibold' : ''}`}
                onClick={() => setUI({ resourcesView: 'company' })}
              >{t('companyLibrary.companyView')}</button>
              <button
                className={`px-2 py-1 ${resourcesView === 'project' ? 'bg-surface-hover font-semibold' : ''}`}
                onClick={() => setUI({ resourcesView: 'project' })}
              >{t('companyLibrary.projectView')}</button>
            </div>
          )}
          <button onClick={addRow} className="btn btn--sm btn--primary flex items-center gap-1">
            <Plus size={13} /> {t('resource.panel.addRow')}
          </button>
          <button
            onClick={() => setUI({ showResourcePanel: false })}
            className="p-1 hover:bg-surface-hover rounded"
            title={t('close')}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {linked && resourcesView === 'company' && pool ? (
        <div className="flex flex-col flex-1 overflow-auto p-2 gap-2 text-xs">
          <p className="flex items-center gap-1.5 text-text-secondary italic" data-ops-company-view-hint>
            {t('companyLibrary.companyViewHint')}
          </p>
          {poolNotice && (
            <p className="flex items-center gap-1.5" style={{ color: 'var(--success)' }} data-ops-pool-assign-notice>
              <Check size={13} /> {poolNotice}
            </p>
          )}
          <button
            onClick={() => addPoolResource(project.companyId!, { name: t('resource.panel.addRow'), type: 'LABOR', description: '', maxUnits: 1 })}
            className="btn btn--sm btn--secondary self-start flex items-center gap-1"
          >
            <Plus size={12} /> {t('companyLibrary.addToCompany')}
          </button>
          <ul className="flex flex-col gap-1">
            {pool.resources.map(r => (
              <Fragment key={r.id}>
                <li className="flex items-center justify-between gap-2 px-2 py-1 rounded-[8px] border border-border">
                  <span>{r.name}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => onAssignFromCompany(r.id)} className="btn btn--sm btn--secondary">{t('companyLibrary.assignFromCompany')}</button>
                    <button onClick={() => updatePoolResource(project.companyId!, r.id, { name: prompt(t('companyLibrary.field.name'), r.name) || r.name })} className="p-1 hover:bg-surface-hover rounded" title={t('companyLibrary.editItem')}><Pencil size={12} /></button>
                    {confirmPoolDelete === r.id ? (
                      <>
                        <button
                          onClick={() => { removePoolResource(project.companyId!, r.id); setConfirmPoolDelete(null); }}
                          title={t('resource.panel.confirmDeleteYes')}
                          className="p-1 rounded hover:bg-surface-hover"
                          style={{ color: 'var(--error)' }}
                        ><Check size={12} /></button>
                        <button
                          onClick={() => setConfirmPoolDelete(null)}
                          title={t('resource.panel.confirmDeleteNo')}
                          className="p-1 rounded hover:bg-surface-hover text-text-secondary"
                        ><X size={12} /></button>
                      </>
                    ) : (
                      <button onClick={() => setConfirmPoolDelete(r.id)} className="p-1 hover:bg-surface-hover rounded"><Trash2 size={12} /></button>
                    )}
                  </div>
                </li>
                {confirmPoolDelete === r.id && (
                  <li className="px-3 py-1.5 text-[11px]" style={{ color: 'var(--error)' }} data-ops-pool-delete-confirm>
                    {t('companyLibrary.confirmRemoveResource', { name: r.name || r.id })}
                  </li>
                )}
              </Fragment>
            ))}
            {pool.resources.length === 0 && <li className="text-text-secondary italic px-2">{t('companyLibrary.noResources')}</li>}
          </ul>
        </div>
      ) : (
      <div className="flex-1 overflow-auto">
        {resources.length === 0 ? (
          <div className="p-4 text-text-secondary">{t('resource.panel.empty')}</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="sticky top-0 z-10" style={{ background: 'var(--theme-surface-alt)' }}>
                <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ minWidth: 160 }}>{t('resource.name')}</th>
                <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ width: 130 }}>{t('resource.typeLabel')}</th>
                <th className="text-right px-2 py-1.5 font-semibold border-b border-border" style={{ width: 110 }}>{t('resource.maxUnits')}</th>
                <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ width: 160 }}>{t('resource.calendarId')}</th>
                <th className="text-right px-2 py-1.5 font-semibold border-b border-border" style={{ width: 90 }}>{t('resource.costPerHour')}</th>
                <th className="text-right px-2 py-1.5 font-semibold border-b border-border" style={{ width: 100 }} title={t('resource.totalHint')}>{t('resource.total')}</th>
                <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ width: 90 }}>{t('resource.unitOfMeasure')}</th>
                <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ width: 120 }}>{t('resource.parent')}</th>
                <th className="border-b border-border" style={{ width: 34 }} />
              </tr>
            </thead>
            <tbody>
              {resources.map(r => {
                const stepsOpen = expandedSteps === r.id;
                const stepCount = r.availabilitySteps?.length ?? 0;
                const cost = costByResource[r.id];
                return (
                  <ResourceRow
                    key={r.id}
                    resource={r}
                    crews={crews}
                    resourceCalendars={resourceCalendars}
                    stepsOpen={stepsOpen}
                    stepCount={stepCount}
                    costLabel={cost === undefined ? '—' : numberFmt.format(cost)}
                    confirmingDelete={confirmDelete === r.id}
                    deleteCount={assignmentCount(r.id)}
                    onToggleSteps={() => setExpandedSteps(stepsOpen ? null : r.id)}
                    onPatch={updates => patch(r.id, updates)}
                    onRequestRemove={() => requestRemove(r.id)}
                    onConfirmRemove={() => { removeResource(r.id); setConfirmDelete(null); }}
                    onCancelRemove={() => setConfirmDelete(null)}
                    onCalendarChange={value => onCalendarChange(r, value)}
                    onEditCalendar={() => r.calendarId && setCalDialog(r.calendarId)}
                  />
                );
              })}
            </tbody>
            {grandTotal !== undefined && (
              <tfoot>
                <tr className="border-t border-border font-semibold">
                  <td className="px-2 py-1.5 text-text-secondary" colSpan={4}>{t('resource.total')}</td>
                  <td className="px-2 py-1.5 text-right" />
                  <td className="px-2 py-1.5 text-right">{numberFmt.format(grandTotal)}</td>
                  <td colSpan={3} />
                </tr>
              </tfoot>
            )}
          </table>
        )}
      </div>
      )}

      {calDialog !== null && (
        <ResourceCalendarDialog calendarId={calDialog} onClose={() => setCalDialog(null)} />
      )}
    </div>
  );
}

function ResourceRow({
  resource, crews, resourceCalendars, stepsOpen, stepCount, costLabel,
  confirmingDelete, deleteCount,
  onToggleSteps, onPatch, onRequestRemove, onConfirmRemove, onCancelRemove,
  onCalendarChange, onEditCalendar,
}: {
  resource: Resource;
  crews: Resource[];
  resourceCalendars: { id: string; name: string }[];
  stepsOpen: boolean;
  stepCount: number;
  costLabel: string;
  confirmingDelete: boolean;
  deleteCount: number;
  onToggleSteps: () => void;
  onPatch: (updates: Partial<Resource>) => void;
  onRequestRemove: () => void;
  onConfirmRemove: () => void;
  onCancelRemove: () => void;
  onCalendarChange: (value: string) => void;
  onEditCalendar: () => void;
}) {
  const { t } = useTranslation('common');
  const isMaterial = resource.type === 'MATERIAL';
  // Projectweergave-markeringen (spec §3/§4, taak 18): 'deviated'/'removed' komen uit de
  // grens-1/4-classificatie (onOpenStatusForResource, taak 7) — null/'in-sync'/'behind'/'unbound'
  // tonen bewust niets ('behind' is na een grens al stil ververst; zie taakbrief).
  const onOpenStatusForResource = useAppStore(s => s.onOpenStatusForResource);
  const setUI = useAppStore(s => s.setUI);
  const openStatus = onOpenStatusForResource(resource.id);

  return (
    <>
      <tr className="border-b border-border-light hover:bg-surface-hover">
        <td className="px-2 py-1">
          <div className="flex items-center gap-1">
            <input
              value={resource.name}
              onChange={e => onPatch({ name: e.target.value })}
              className={cellInput}
              placeholder={t('resource.name')}
            />
            {openStatus === 'deviated' && (
              <button
                type="button"
                className="badge badge--red shrink-0"
                onClick={() => setUI({ showLibraryLinkDialog: true })}
                title={t('companyLibrary.deviates')}
                data-ops-resource-deviates
              >
                {t('companyLibrary.deviates')}
              </button>
            )}
            {openStatus === 'removed' && (
              <span className="badge badge--red shrink-0" title={t('companyLibrary.notInCompany')} data-ops-resource-removed>
                {t('companyLibrary.notInCompany')}
              </span>
            )}
          </div>
        </td>
        <td className="px-2 py-1">
          <select
            value={resource.type}
            onChange={e => onPatch({ type: e.target.value as ResourceType })}
            className={cellInput}
          >
            {RESOURCE_TYPES.map(rt => (
              <option key={rt} value={rt}>{t(TYPE_KEY[rt])}</option>
            ))}
          </select>
        </td>
        <td className="px-2 py-1">
          <div className="flex items-center gap-1 justify-end">
            <UnitsInput
              value={resource.maxUnits}
              ariaLabel={t('resource.maxUnits')}
              onCommit={n => onPatch({ maxUnits: n })}
              className={cellInput + ' text-right'}
            />
            <button
              onClick={onToggleSteps}
              title={t('resource.availabilityStepsEditor.title')}
              className="p-0.5 rounded hover:bg-surface-hover text-text-secondary flex-shrink-0"
            >
              {stepsOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
              {stepCount > 0 && <span className="text-[9px] ml-0.5">{stepCount}</span>}
            </button>
          </div>
        </td>
        <td className="px-2 py-1">
          <div className="flex items-center gap-1">
            <select
              value={resource.calendarId ?? ''}
              onChange={e => onCalendarChange(e.target.value)}
              className={cellInput}
            >
              <option value="">{t('resource.projectCalendar')}</option>
              {resourceCalendars.map(c => (
                <option key={c.id} value={c.id}>{c.name || c.id}</option>
              ))}
              <option value={NEW_CAL}>+ {t('resource.calendarDialog.title')}</option>
            </select>
            <button
              onClick={onEditCalendar}
              disabled={!resource.calendarId}
              title={t('resource.editCalendar')}
              className="p-0.5 rounded hover:bg-surface-hover text-text-secondary disabled:opacity-30 flex-shrink-0"
            >
              <Pencil size={12} />
            </button>
          </div>
        </td>
        <td className="px-2 py-1">
          <input
            type="number"
            min={0}
            step="any"
            value={resource.costPerHour ?? ''}
            onChange={e => {
              const raw = e.target.value;
              if (raw === '') { onPatch({ costPerHour: undefined }); return; }
              const n = parseFloat(raw);
              if (Number.isFinite(n)) onPatch({ costPerHour: n });
            }}
            className={cellInput + ' text-right'}
          />
        </td>
        <td className="px-2 py-1 text-right tabular-nums" title={t('resource.totalHint')}>
          {costLabel}
        </td>
        <td className="px-2 py-1">
          <input
            value={resource.unitOfMeasure ?? ''}
            disabled={!isMaterial}
            onChange={e => onPatch({ unitOfMeasure: e.target.value || undefined })}
            className={cellInput + ' disabled:opacity-30'}
          />
        </td>
        <td className="px-2 py-1">
          <select
            value={resource.parentId ?? ''}
            onChange={e => onPatch({ parentId: e.target.value || undefined })}
            className={cellInput}
          >
            <option value="">{t('resource.noParent')}</option>
            {crews.filter(c => c.id !== resource.id).map(c => (
              <option key={c.id} value={c.id}>{c.name || c.id}</option>
            ))}
          </select>
        </td>
        <td className="px-1 py-1 text-center">
          {confirmingDelete ? (
            <div className="flex items-center gap-0.5 justify-center">
              <button
                onClick={onConfirmRemove}
                title={t('resource.panel.confirmDeleteYes')}
                className="p-1 rounded hover:bg-surface-hover"
                style={{ color: 'var(--error)' }}
              >
                <Check size={13} />
              </button>
              <button
                onClick={onCancelRemove}
                title={t('resource.panel.confirmDeleteNo')}
                className="p-1 rounded hover:bg-surface-hover text-text-secondary"
              >
                <X size={13} />
              </button>
            </div>
          ) : (
            <button
              onClick={onRequestRemove}
              title={t('resource.panel.deleteRow')}
              className="p-1 rounded hover:bg-surface-hover"
              style={{ color: 'var(--error)' }}
            >
              <Trash2 size={13} />
            </button>
          )}
        </td>
      </tr>
      {confirmingDelete && (
        <tr style={{ background: 'var(--theme-surface-alt)' }}>
          <td colSpan={9} className="px-3 py-1.5 text-[11px]" style={{ color: 'var(--error)' }}>
            {t('resource.panel.confirmDelete', { name: resource.name || resource.id, count: deleteCount })}
          </td>
        </tr>
      )}
      {stepsOpen && (
        <tr style={{ background: 'var(--theme-surface-alt)' }}>
          <td colSpan={9} className="px-3 py-2">
            <AvailabilityStepsEditor
              steps={resource.availabilitySteps ?? []}
              onChange={steps => onPatch({ availabilitySteps: steps.length > 0 ? steps : undefined })}
            />
          </td>
        </tr>
      )}
    </>
  );
}

function AvailabilityStepsEditor({ steps, onChange }: {
  steps: AvailabilityStep[];
  onChange: (steps: AvailabilityStep[]) => void;
}) {
  const { t } = useTranslation('common');

  const update = (idx: number, patch: Partial<AvailabilityStep>) => {
    onChange(steps.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  };
  const remove = (idx: number) => onChange(steps.filter((_, i) => i !== idx));
  const add = () => onChange([...steps, { from: formatDate(new Date()), maxUnits: 1 }]);

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--theme-text-muted)' }}>
        {t('resource.availabilityStepsEditor.title')}
      </span>
      {steps.length === 0 && (
        <span className="text-[10px] text-text-secondary">{t('resource.availabilityStepsEditor.empty')}</span>
      )}
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <label className="text-[10px] text-text-secondary">{t('resource.availabilityStepsEditor.from')}</label>
          <DateTextInput
            value={s.from}
            onCommit={v => update(i, { from: v })}
            className="input !text-[11px] !px-1.5 !py-1"
            ariaLabel={t('resource.availabilityStepsEditor.from')}
          />
          <label className="text-[10px] text-text-secondary">{t('resource.availabilityStepsEditor.maxUnits')}</label>
          <UnitsInput
            value={s.maxUnits}
            ariaLabel={t('resource.availabilityStepsEditor.maxUnits')}
            onCommit={n => update(i, { maxUnits: n })}
            className="input !text-[11px] !px-1.5 !py-1 w-20 text-right"
          />
          <button onClick={() => remove(i)} className="p-0.5 rounded hover:bg-surface-hover" style={{ color: 'var(--error)' }}>
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button onClick={add} className="btn btn--sm btn--secondary self-start flex items-center gap-1 mt-1">
        <Plus size={12} /> {t('resource.availabilityStepsEditor.addStep')}
      </button>
    </div>
  );
}
