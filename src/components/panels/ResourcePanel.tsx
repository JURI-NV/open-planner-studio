import { useState, useMemo, useEffect } from 'react';
import { useAppStore } from '@/state/appStore';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, Pencil, ChevronDown, ChevronRight, X, Check, Unlink2, Library } from 'lucide-react';
import type { Resource, ResourceType, AvailabilityStep } from '@/types/resource';
import { createDefaultCalendar } from '@/engine/calendar/defaultCalendar';
import { formatDate } from '@/utils/dateUtils';
import { ResourceCalendarDialog } from '@/components/dialogs/ResourceCalendarDialog';
import { UnitsInput } from '@/components/common/UnitsInput';
import { DateTextInput } from '@/components/common/DateTextInput';
import { isResourceFieldLocked, matchByName } from '@/services/library/libraryOps';

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
// Geërfd/read-only-velden (issue #19, punt D1 — user-feedback): platte tekst, GEEN uitgegrijsd
// invoerveld. Zelfde padding/tekstgrootte als `cellInput` (kolommen blijven uitgelijnd met de
// bewerkbare rijen), maar zonder de `.input`-rand/achtergrond en in de secundaire tekstkleur — zodat
// "dit reageert niet op een klik" al zichtbaar is vóórdat de gebruiker het probeert.
const cellStatic = 'block !text-[11px] !px-1.5 !py-1 w-full truncate text-text-secondary';

/**
 * Resource-beheerpaneel (fase 2.5, §6.2; herzien issue #19 — bibliotheek = bron, project = inzet).
 * Twee weergaven, BEIDE met de volledige inline-tabel-editor (`ResourceRow`, gedeeld):
 *
 * - **Bibliotheekweergave** (`resourcesView === 'company'`): de POOL van het gekoppelde bedrijf —
 *   dit IS de bron. CRUD loopt uitsluitend via `addPoolResource`/`updatePoolResource`/
 *   `removePoolResource` (nooit de project-CRUD) en de kalender-kolom wijst naar `pools[cid].calendars`
 *   (niet de projectkalenders). Geen "Totaal"-kolom (dat is een projectberekening, geen
 *   poolgrootheid). "Ploeg"-kolom alleen als de pool zelf CREW-resources kent.
 * - **Projectweergave** (`resourcesView === 'project'`): wat dit project gebruikt, over
 *   `s.resources`. Een resource met een GELDIGE bibliotheekherkomst (stempel van het gekoppelde
 *   bedrijf, status ≠ 'removed' — zie `onOpenStatusForResource`/`isResourceFieldLocked`) toont
 *   naam/type/tarief/eenheid ÉN kalender READ-ONLY (bibliotheekafspraken: de bibliotheek bepaalt WAT
 *   een resource is en WANNEER hij werkt) — alleen max.eenheden blijft bewerkbaar (projectinzet:
 *   hoeveel dit ene project ervan opeist; zie de uitgebreide toelichting bij `ResourceRow`). Zo'n
 *   geërfde rij draagt een subtiel bibliotheek-icoontje; projecteigen rijen (los project, of een
 *   nieuwe resource via de "+ Nieuwe resource"-knop terwijl het project wél gekoppeld is) krijgen
 *   geen markering en blijven volledig bewerkbaar. "Losmaken van de bibliotheek" strip de stempel
 *   van precies dat ene item, waarna alle velden weer bewerkbaar zijn.
 *
 * De kalender-dropdown verwijst naar `s.calendars` (project) resp. `pools[cid].calendars` (bibliotheek);
 * "Bewerken…" en "+ nieuwe kalender" openen dezelfde `ResourceCalendarDialog`, die met een optionele
 * `poolCompanyId`-prop tussen beide bestemmingen schakelt.
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
  const unlinkResourceFromLibrary = useAppStore(s => s.unlinkResourceFromLibrary);
  const addCalendar = useAppStore(s => s.addCalendar);
  const setUI = useAppStore(s => s.setUI);
  const project = useAppStore(s => s.project);
  const companies = useAppStore(s => s.companies);
  const pools = useAppStore(s => s.pools);
  const resourcesView = useAppStore(s => s.ui.resourcesView);
  const addPoolResource = useAppStore(s => s.addPoolResource);
  const removePoolResource = useAppStore(s => s.removePoolResource);
  const updatePoolResource = useAppStore(s => s.updatePoolResource);
  const addPoolCalendar = useAppStore(s => s.addPoolCalendar);
  const addLibraryResourceToProject = useAppStore(s => s.addLibraryResourceToProject);
  const promoteResourceToPool = useAppStore(s => s.promoteResourceToPool);
  const linked = !!project.companyId && companies.some(c => c.id === project.companyId);
  const pool = project.companyId ? pools[project.companyId] : undefined;
  const inPoolView = linked && resourcesView === 'company' && !!pool;

  // Kalender-editor: null = dicht. `poolCompanyId` aanwezig ⇒ de dialoog bewerkt/maakt een
  // POOL-kalender (via addPoolCalendar/updatePoolCalendar) i.p.v. een projectkalender.
  const [calDialog, setCalDialog] = useState<{ id: string; poolCompanyId?: string } | null>(null);
  // Uitgeklapte availabilitySteps-subrij (één tegelijk) — gedeeld tussen beide weergaven; nooit
  // gelijktijdig zichtbaar omdat er maar één tabel tegelijk gerenderd wordt.
  const [expandedSteps, setExpandedSteps] = useState<string | null>(null);
  // Resource die op verwijder-bevestiging wacht (bevinding 6, cascade-waarschuwing) — Projectweergave.
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  // Poolresource die op verwijder-bevestiging wacht (critreview 51ad2ec, fix 1): bedrijfsbrede
  // delete buiten undo krijgt dezelfde bevestigingsrem als de projectgrid-delete hierboven.
  const [confirmPoolDelete, setConfirmPoolDelete] = useState<string | null>(null);
  // Feedback op "Toewijzen aan project" (critreview 51ad2ec, fix 2): hergebruikt het
  // added/alreadyInProject-notice-patroon van de oude AddFromLibraryDialog.
  const [poolNotice, setPoolNotice] = useState<string | null>(null);
  // Feedback op "Naar de bibliotheek" (issue #19, punt D5) — Projectweergave-tegenhanger van
  // `poolNotice`; apart gehouden omdat `poolNotice` bewust reset bij het verlaten van de
  // Bibliotheekweergave (zie de eerste useEffect hieronder) en deze notice juist in de
  // Projectweergave hoort te verschijnen.
  const [projectNotice, setProjectNotice] = useState<string | null>(null);
  // Net aangemaakte rij (issue #19, punt 3): het naamveld van deze rij krijgt autoFocus, in beide
  // weergaven. Native HTML-autofocus volstaat — de rij (en dus het input-element) bestaat pas sinds
  // de laatste render, dus React's reconciliatie hoeft 'm niet handmatig te herfocussen.
  const [newRowId, setNewRowId] = useState<string | null>(null);

  // Bevestiging + notice horen bij de Bibliotheekweergave; reset zodra je 'm verlaat, zodat er geen
  // stale confirm-stap of melding terugkomt bij een latere terugkeer naar deze weergave. Spiegel voor
  // `projectNotice` (Projectweergave — punt D5). `newRowId` (punt 3) reset bij ELKE weergavewissel: de
  // tabellen zijn wederzijds exclusief in de JSX (mount/unmount bij het wisselen), dus zonder deze
  // reset zou een eerder-aangemaakte rij bij terugkeer naar diezelfde weergave opnieuw autoFocus
  // krijgen (remount ⇒ het HTML-autofocus-attribuut vuurt opnieuw) — een ongewenste focus-steal die
  // niets met "zojuist aangemaakt" te maken heeft.
  useEffect(() => {
    if (resourcesView !== 'company') { setConfirmPoolDelete(null); setPoolNotice(null); }
    if (resourcesView !== 'project') { setConfirmDelete(null); setProjectNotice(null); }
    setNewRowId(null);
  }, [resourcesView]);

  const onAssignFromCompany = (resourceId: string) => {
    const result = addLibraryResourceToProject(project.companyId!, resourceId);
    setPoolNotice(result.added ? t('companyLibrary.added') : t('companyLibrary.alreadyInProject'));
  };

  // "Naar de bibliotheek" (issue #19, punt D5): tegenhanger van onAssignFromCompany. Dedup op naam
  // gebeurt in de store (`promoteResourceToPool` → `matchByName`) — hier wordt vooraf dezelfde matcher
  // geraadpleegd om de juiste melding te kiezen (nieuw poolitem vs. gekoppeld aan een bestaand item),
  // zonder de bestaande `string | null`-return van `promoteResourceToPool` te hoeven verbouwen (die
  // wordt elders/in tests al als kale pool-id gebruikt).
  const onPromoteResource = (resource: Resource) => {
    if (!project.companyId) return;
    const existingMatch = matchByName(resource.name, pool?.resources ?? []);
    promoteResourceToPool(project.companyId, resource, { dedupByName: true });
    setProjectNotice(existingMatch ? t('companyLibrary.linkedToExisting') : t('companyLibrary.added'));
  };

  // Default-weergave (spec §4): Bibliotheekweergave zodra de pool inhoud heeft; lege pool of los
  // project ⇒ Projectweergave. Draait bij koppeling-wissel, niet bij elke render/edit.
  useEffect(() => {
    if (!linked) { if (resourcesView !== 'project') setUI({ resourcesView: 'project' }); return; }
    const hasContent = (pool?.resources.length ?? 0) > 0;
    setUI({ resourcesView: hasContent ? 'company' : 'project' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.companyId, linked]);

  const crews = resources.filter(r => r.type === 'CREW');
  // Ploeg-kolom in de pool alleen tonen als de pool zelf CREW-resources kent (issue #19, punt 1) —
  // parentId is een geldig pool-lokaal veld (zie copyResourceToProject: het wordt bewust NIET
  // meegekopieerd naar het project, precies omdát het een pool-lokale verwijzing is).
  const poolCrews = pool ? pool.resources.filter(r => r.type === 'CREW') : [];
  const poolHasCrews = poolCrews.length > 0;

  const numberFmt = useMemo(
    () => new Intl.NumberFormat(i18n.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [i18n.language],
  );

  // Kosten-totaal per resource (bevinding 8): Σ belaste eenheden × uren/dag × tarief.
  // uren = eenheden × hoursPerDay van de projectkalender; undefined = "—" (geen tarief of belasting).
  // Puur een PROJECT-grootheid (leunt op resourceLoadResult/hoursPerDay van dit project) — de pool
  // heeft hier bewust geen equivalent (zie "Totaal" hieronder).
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
    const id = addResource({ name: '', type: 'LABOR', description: '', maxUnits: 1 });
    setNewRowId(id);
  };

  const addPoolRow = () => {
    if (!project.companyId) return;
    const id = addPoolResource(project.companyId, { name: '', type: 'LABOR', description: '', maxUnits: 1 });
    if (id) setNewRowId(id);
  };

  // Contextgevoelige "+ Nieuwe resource" (issue #19, punt 2): maakt een POOL-resource in de
  // Bibliotheekweergave, een PROJECT-resource in de Projectweergave — vervangt de oude aparte
  // "Nieuw in de bibliotheek"-knop (dubbelop geworden).
  const onAddClick = () => { if (inPoolView) addPoolRow(); else addRow(); };

  const patch = (id: string, updates: Partial<Resource>) => updateResource(id, updates);
  const poolPatch = (id: string, updates: Partial<Resource>) => {
    if (project.companyId) updatePoolResource(project.companyId, id, updates);
  };

  // "+ nieuwe kalender": maak direct een lege resource-kalender aan, koppel 'm en open de editor.
  const createAndEditCalendar = (resourceId: string) => {
    const { id: _drop, ...base } = createDefaultCalendar();
    void _drop;
    const id = addCalendar({ ...base, name: t('resource.calendarDialog.title') });
    updateResource(resourceId, { calendarId: id });
    setCalDialog({ id });
  };

  // Poolvariant: dezelfde flow, maar tegen de pool-kalenderbibliotheek van het gekoppelde bedrijf.
  const createAndEditPoolCalendar = (resourceId: string) => {
    if (!project.companyId) return;
    const { id: _drop, ...base } = createDefaultCalendar();
    void _drop;
    const id = addPoolCalendar(project.companyId, { ...base, name: t('resource.calendarDialog.title') });
    if (!id) return;
    updatePoolResource(project.companyId, resourceId, { calendarId: id });
    setCalDialog({ id, poolCompanyId: project.companyId });
  };

  const onCalendarChange = (resource: Resource, value: string) => {
    if (value === NEW_CAL) {
      createAndEditCalendar(resource.id);
      return;
    }
    updateResource(resource.id, { calendarId: value || undefined });
  };

  const onPoolCalendarChange = (resource: Resource, value: string) => {
    if (value === NEW_CAL) {
      createAndEditPoolCalendar(resource.id);
      return;
    }
    poolPatch(resource.id, { calendarId: value || undefined });
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
          <button onClick={onAddClick} className="btn btn--sm btn--primary flex items-center gap-1" data-ops-resource-add>
            <Plus size={13} /> {inPoolView ? t('resource.panel.addRowLibrary') : t('resource.panel.addRow')}
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

      {inPoolView && pool ? (
        <div className="flex-1 overflow-auto">
          <p className="flex items-center gap-1.5 text-text-secondary italic px-2 pt-2" data-ops-company-view-hint>
            {t('companyLibrary.companyViewHint')}
          </p>
          {poolNotice && (
            <p className="flex items-center gap-1.5 px-2" style={{ color: 'var(--success)' }} data-ops-pool-assign-notice>
              <Check size={13} /> {poolNotice}
            </p>
          )}
          {pool.resources.length === 0 ? (
            <div className="p-4 text-text-secondary">{t('companyLibrary.noResources')}</div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="sticky top-0 z-10" style={{ background: 'var(--theme-surface-alt)' }}>
                  <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ minWidth: 160 }}>{t('resource.name')}</th>
                  <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ width: 130 }}>{t('resource.typeLabel')}</th>
                  <th className="text-right px-2 py-1.5 font-semibold border-b border-border" style={{ width: 110 }}>{t('resource.maxUnits')}</th>
                  <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ width: 160 }}>{t('resource.calendarId')}</th>
                  <th className="text-right px-2 py-1.5 font-semibold border-b border-border" style={{ width: 90 }}>{t('resource.costPerHour')}</th>
                  <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ width: 90 }}>{t('resource.unitOfMeasure')}</th>
                  {poolHasCrews && (
                    <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ width: 120 }}>{t('resource.parent')}</th>
                  )}
                  <th className="border-b border-border" style={{ width: 190 }} />
                </tr>
              </thead>
              <tbody>
                {pool.resources.map(r => {
                  const stepsOpen = expandedSteps === r.id;
                  const stepCount = r.availabilitySteps?.length ?? 0;
                  return (
                    <ResourceRow
                      key={r.id}
                      resource={r}
                      variant="pool"
                      colCount={poolHasCrews ? 8 : 7}
                      crews={poolCrews}
                      calendarOptions={pool.calendars}
                      stepsOpen={stepsOpen}
                      stepCount={stepCount}
                      isNew={newRowId === r.id}
                      showParentColumn={poolHasCrews}
                      confirmingDelete={confirmPoolDelete === r.id}
                      confirmMessage={t('companyLibrary.confirmRemoveResource', { name: r.name || r.id })}
                      onToggleSteps={() => setExpandedSteps(stepsOpen ? null : r.id)}
                      onPatch={updates => poolPatch(r.id, updates)}
                      onRequestRemove={() => setConfirmPoolDelete(r.id)}
                      onConfirmRemove={() => { removePoolResource(project.companyId!, r.id); setConfirmPoolDelete(null); }}
                      onCancelRemove={() => setConfirmPoolDelete(null)}
                      onCalendarChange={value => onPoolCalendarChange(r, value)}
                      onEditCalendar={() => r.calendarId && setCalDialog({ id: r.calendarId, poolCompanyId: project.companyId! })}
                      onAssignToProject={() => onAssignFromCompany(r.id)}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : (
      <div className="flex-1 overflow-auto">
        {projectNotice && (
          <p className="flex items-center gap-1.5 px-2 pt-2" style={{ color: 'var(--success)' }} data-ops-project-promote-notice>
            <Check size={13} /> {projectNotice}
          </p>
        )}
        {resources.length === 0 ? (
          linked ? (
            // D4 (issue #19, user-feedback): een leeg Projectweergave — precies de instap-showcase-
            // situatie (project WEL gekoppeld, nog niets gematerialiseerd) — legt de tweedeling meteen
            // uit i.p.v. een kale lege tabel te tonen.
            <div className="p-4 text-text-secondary" data-ops-resource-empty-linked>
              <p>{t('resource.panel.emptyLinkedTitle')}</p>
              <p className="mt-1">{t('resource.panel.emptyLinkedHint')}</p>
            </div>
          ) : (
            <div className="p-4 text-text-secondary">{t('resource.panel.empty')}</div>
          )
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
                    variant="project"
                    colCount={9}
                    crews={crews}
                    calendarOptions={resourceCalendars}
                    stepsOpen={stepsOpen}
                    stepCount={stepCount}
                    isNew={newRowId === r.id}
                    showParentColumn
                    costLabel={cost === undefined ? '—' : numberFmt.format(cost)}
                    confirmingDelete={confirmDelete === r.id}
                    confirmMessage={t('resource.panel.confirmDelete', { name: r.name || r.id, count: assignmentCount(r.id) })}
                    onToggleSteps={() => setExpandedSteps(stepsOpen ? null : r.id)}
                    onPatch={updates => patch(r.id, updates)}
                    onRequestRemove={() => requestRemove(r.id)}
                    onConfirmRemove={() => { removeResource(r.id); setConfirmDelete(null); }}
                    onCancelRemove={() => setConfirmDelete(null)}
                    onCalendarChange={value => onCalendarChange(r, value)}
                    onEditCalendar={() => r.calendarId && setCalDialog({ id: r.calendarId })}
                    onUnlink={() => unlinkResourceFromLibrary(r.id)}
                    onPromoteToLibrary={linked ? () => onPromoteResource(r) : undefined}
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
        <ResourceCalendarDialog calendarId={calDialog.id} poolCompanyId={calDialog.poolCompanyId} onClose={() => setCalDialog(null)} />
      )}
    </div>
  );
}

/**
 * Gedeelde inline-tabelrij voor ZOWEL de Bibliotheekweergave (`variant="pool"`) als de
 * Projectweergave (`variant="project"`) — issue #19: de rolverdeling was omgekeerd (de bibliotheek,
 * de BRON, had alleen een `window.prompt()`-editor; het project had de volledige tabel). Nu delen
 * beide weergaven precies deze rij; alleen kolomkeuze, bestemming van de mutaties en de
 * read-only-gating verschillen per variant.
 */
export function ResourceRow({
  resource, variant, colCount, crews, calendarOptions, stepsOpen, stepCount, costLabel, isNew,
  showParentColumn = true,
  confirmingDelete, confirmMessage,
  onToggleSteps, onPatch, onRequestRemove, onConfirmRemove, onCancelRemove,
  onCalendarChange, onEditCalendar, onAssignToProject, onUnlink, onPromoteToLibrary,
}: {
  resource: Resource;
  variant: 'project' | 'pool';
  /** Aantal kolommen van DEZE tabel — voor de colSpan van de confirm-/steps-subrij. */
  colCount: number;
  crews: Resource[];
  calendarOptions: { id: string; name: string }[];
  stepsOpen: boolean;
  stepCount: number;
  /** Alleen aanwezig in de Projectweergave — de pool kent geen "Totaal"-kolom (dat is een
   *  projectberekening, zie de toelichting bovenaan dit bestand). */
  costLabel?: string;
  isNew: boolean;
  showParentColumn?: boolean;
  confirmingDelete: boolean;
  confirmMessage: string;
  onToggleSteps: () => void;
  onPatch: (updates: Partial<Resource>) => void;
  onRequestRemove: () => void;
  onConfirmRemove: () => void;
  onCancelRemove: () => void;
  onCalendarChange: (value: string) => void;
  onEditCalendar: () => void;
  /** Pool-only: "Toewijzen aan project" (behouden op de bestaande plek, expliciete user-wens). */
  onAssignToProject?: () => void;
  /** Project-only: "Losmaken van de bibliotheek" — alleen zichtbaar/zinvol op een geërfde (locked) rij. */
  onUnlink?: () => void;
  /** Project-only, tegenhanger van `onAssignToProject` (issue #19, punt D5): "naar de bibliotheek"
   *  op een ONGESTEMPELDE rij — alleen aanwezig (van de aanroeper) als het project aan een bedrijf
   *  gekoppeld is; de rij zelf toont 'm alleen als `!resource.libraryOrigin`. */
  onPromoteToLibrary?: () => void;
}) {
  const { t } = useTranslation('common');
  const isMaterial = resource.type === 'MATERIAL';
  const isPool = variant === 'pool';
  // Projectweergave-markeringen (spec §3/§4, taak 18): 'deviated'/'removed' komen uit de
  // grens-1/4-classificatie (onOpenStatusForResource, taak 7) — null/'in-sync'/'behind'/'unbound'
  // tonen bewust niets ('behind' is na een grens al stil ververst; zie taakbrief). Pool-rijen hebben
  // geen "openings-status" — ze ZIJN de bron.
  const onOpenStatusForResource = useAppStore(s => s.onOpenStatusForResource);
  const setUI = useAppStore(s => s.setUI);
  const openStatus = isPool ? null : onOpenStatusForResource(resource.id);

  // Geërfd-gating (issue #19, punt 4 — bijgesteld op user-feedback: de kalender hoort óók bij de
  // bibliotheek, niet bij de projectinzet). Rationale voor de user: DE BIBLIOTHEEK BEPAALT WAT EEN
  // RESOURCE IS EN WANNEER HIJ WERKT (naam, type, tarief/uur, eenheid, kalender — vastgelegd door het
  // bedrijf, geldt voor elk project dat deze resource gebruikt, hoort dus alleen in de
  // Bibliotheekweergave gewijzigd te worden); HET PROJECT BEPAALT ALLEEN HOEVEEL JE ERVAN INZET
  // (max.eenheden — de allocatiegrootheid waar een later bezettingsoverzicht, schaarste over
  // projecten heen, op leunt). Max.eenheden blijft dus het ENIGE bewerkbare veld op een geërfde rij.
  // `isResourceFieldLocked` (services/library/libraryOps.ts) is de gedeelde, headless-testbare
  // pure functie achter dit besluit. 'removed' (het poolorigineel bestaat niet meer) telt bewust NIET
  // als "geldige herkomst": de stempel wijst dan nergens meer naar, dus zo'n rij is feitelijk een wees
  // en blijft volledig bewerkbaar (met de bestaande expliciete "Verwijder uit project"-actie hieronder)
  // in plaats van muurvast te zitten op een dode referentie.
  // D1 (user-feedback): een geërfd/locked veld rendert als PLATTE TEKST (`cellStatic`), niet als een
  // uitgegrijsd invoerveld — "waarom reageert dit niet op een klik" is zichtbaar vóórdat de gebruiker
  // het probeert. Elke gegate cel hieronder vertakt zelf op `locked` (static <span> vs. echt invoerveld).
  const locked = !isPool && isResourceFieldLocked(openStatus);

  return (
    <>
      <tr className="border-b border-border-light hover:bg-surface-hover" data-ops-pool-resource-row={isPool ? true : undefined}>
        <td className="px-2 py-1">
          <div className="flex items-center gap-1 min-w-0">
            {locked ? (
              <span className={cellStatic} title={t('resource.inheritedFieldHint')}>
                {resource.name || '—'}
              </span>
            ) : (
              <input
                value={resource.name}
                onChange={e => onPatch({ name: e.target.value })}
                className={cellInput}
                placeholder={t('resource.name')}
                autoFocus={isNew}
              />
            )}
            {locked && (
              // Rustige, subtiele herkomstmarkering (user-wens B): een klein bibliotheek-icoontje
              // i.p.v. een tekstbadge — de rode "wijkt af"/"niet meer in de bibliotheek"-badges
              // hierboven blijven de aandachttrekkers; dit is puur een oogopslag-signaal. `title` op
              // de omringende span (niet rechtstreeks op het SVG-icoon) voor betrouwbare tooltips.
              <span
                className="shrink-0 inline-flex items-center text-text-secondary"
                title={t('resource.fromLibraryBadge')}
                data-ops-resource-inherited
              >
                <Library size={12} />
              </span>
            )}
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
              <>
                <span className="badge badge--red shrink-0" title={t('companyLibrary.notInCompany')} data-ops-resource-removed>
                  {t('companyLibrary.notInCompany')}
                </span>
                {/* Wees-actie bedraden (spec §4, eindreview-bevinding 1): expliciete, gelabelde
                    verwijderknop voor een 'removed'-materialisatie — hergebruikt hetzelfde
                    verwijderpad (onRequestRemove/cascade-confirm) als de rij-Trash2, geen nieuw
                    verwijdermechanisme. */}
                <button
                  type="button"
                  onClick={onRequestRemove}
                  className="btn btn--sm btn--secondary shrink-0 !py-0.5 !px-1.5 !text-[10px]"
                  title={t('companyLibrary.removeFromProject')}
                  data-ops-resource-remove-orphan
                >
                  {t('companyLibrary.removeFromProject')}
                </button>
              </>
            )}
          </div>
        </td>
        <td className="px-2 py-1">
          {locked ? (
            <span className={cellStatic} title={t('resource.inheritedFieldHint')}>
              {t(TYPE_KEY[resource.type])}
            </span>
          ) : (
            <select
              value={resource.type}
              onChange={e => onPatch({ type: e.target.value as ResourceType })}
              className={cellInput}
            >
              {RESOURCE_TYPES.map(rt => (
                <option key={rt} value={rt}>{t(TYPE_KEY[rt])}</option>
              ))}
            </select>
          )}
        </td>
        <td className="px-2 py-1">
          {/* Max.eenheden: het ENIGE veld dat op een geërfde rij bewerkbaar blijft (projectinzet) —
              ALTIJD een echt invoerveld, nooit `cellStatic`, ook niet op een geërfde/locked resource. */}
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
          <div className="flex items-center gap-1 min-w-0">
            {/* Kalender is (bijgesteld user-feedback) een BIBLIOTHEEKAFSPRAAK — "wanneer de resource
                werkt" — dus locked net als naam/type/tarief/eenheid op een geërfde rij: platte tekst
                i.p.v. een uitgegrijsde dropdown. Het "Bewerken…"-potlood blijft werken: dat bewerkt de
                KALENDER-ENTITEIT zelf (gedeeld, evt. door meer taken/resources gebruikt), niet de
                toewijzing van DEZE rij — dat is een bewust ander besluit dan de rij-lock. */}
            {locked ? (
              <span className={cellStatic} title={t('resource.inheritedFieldHint')}>
                {resource.calendarId
                  ? (calendarOptions.find(c => c.id === resource.calendarId)?.name || resource.calendarId)
                  : t('resource.projectCalendar')}
              </span>
            ) : (
              <select
                value={resource.calendarId ?? ''}
                onChange={e => onCalendarChange(e.target.value)}
                className={cellInput}
              >
                <option value="">{isPool ? t('resource.noCalendar') : t('resource.projectCalendar')}</option>
                {calendarOptions.map(c => (
                  <option key={c.id} value={c.id}>{c.name || c.id}</option>
                ))}
                <option value={NEW_CAL}>+ {t('resource.calendarDialog.title')}</option>
              </select>
            )}
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
          {locked ? (
            <span className={cellStatic + ' text-right'} title={t('resource.inheritedFieldHint')}>
              {resource.costPerHour != null ? resource.costPerHour : '—'}
            </span>
          ) : (
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
          )}
        </td>
        {costLabel !== undefined && (
          <td className="px-2 py-1 text-right tabular-nums" title={t('resource.totalHint')}>
            {costLabel}
          </td>
        )}
        <td className="px-2 py-1">
          {locked ? (
            <span className={cellStatic} title={t('resource.inheritedFieldHint')}>
              {isMaterial ? (resource.unitOfMeasure || '—') : '—'}
            </span>
          ) : (
            <input
              value={resource.unitOfMeasure ?? ''}
              disabled={!isMaterial}
              onChange={e => onPatch({ unitOfMeasure: e.target.value || undefined })}
              className={cellInput + ' disabled:opacity-30'}
            />
          )}
        </td>
        {showParentColumn && (
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
        )}
        <td className="px-1 py-1 text-center">
          <div className="flex items-center gap-0.5 justify-center">
            {isPool && onAssignToProject && !confirmingDelete && (
              <button
                onClick={onAssignToProject}
                className="btn btn--sm btn--secondary !py-0.5 !px-1.5 !text-[10px]"
              >
                {t('companyLibrary.assignFromCompany')}
              </button>
            )}
            {/* Tegenhanger van "Toewijzen aan project" (issue #19, punt D5): alleen op een
                ONGESTEMPELDE Projectweergave-rij, en alleen als de aanroeper 'm meegeeft (project aan
                een bedrijf gekoppeld — zie ResourcePanel). */}
            {!isPool && !resource.libraryOrigin && onPromoteToLibrary && !confirmingDelete && (
              <button
                onClick={onPromoteToLibrary}
                title={t('resource.promoteToLibrary')}
                className="btn btn--sm btn--secondary !py-0.5 !px-1.5 !text-[10px]"
                data-ops-resource-promote
              >
                {t('resource.promoteToLibrary')}
              </button>
            )}
            {locked && onUnlink && !confirmingDelete && (
              <button
                onClick={onUnlink}
                title={t('resource.unlinkFromLibrary')}
                className="p-1 rounded hover:bg-surface-hover text-text-secondary"
                data-ops-resource-unlink
              >
                <Unlink2 size={13} />
              </button>
            )}
            {confirmingDelete ? (
              <>
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
              </>
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
          </div>
        </td>
      </tr>
      {confirmingDelete && (
        <tr style={{ background: 'var(--theme-surface-alt)' }} data-ops-pool-delete-confirm={isPool ? true : undefined}>
          <td colSpan={colCount} className="px-3 py-1.5 text-[11px]" style={{ color: 'var(--error)' }}>
            {confirmMessage}
          </td>
        </tr>
      )}
      {stepsOpen && (
        <tr style={{ background: 'var(--theme-surface-alt)' }}>
          <td colSpan={colCount} className="px-3 py-2">
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
