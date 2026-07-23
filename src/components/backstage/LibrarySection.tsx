import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Plus, Trash2, Star, Download, Upload, ArrowUpFromLine, Pencil, Check, X } from 'lucide-react';
import { useAppStore } from '@/state/appStore';
import { saveFileDialog } from '@/services/fileAccess';
import type { WorkCalendar } from '@/types/calendar';
import type { Resource } from '@/types/resource';
import './LibrarySection.css';

/**
 * Backstage → Bibliotheek (spec §3): bedrijven beheren, pool-inhoud tonen/bewerken/verwijderen,
 * promoveren, export/import. Export is tevens het backupmechanisme (spec §5).
 */
export function LibrarySection() {
  const { t } = useTranslation();
  const companies = useAppStore(s => s.companies);
  const pools = useAppStore(s => s.pools);
  const defaultCompanyId = useAppStore(s => s.defaultCompanyId);
  const addCompany = useAppStore(s => s.addCompany);
  const renameCompany = useAppStore(s => s.renameCompany);
  const removeCompany = useAppStore(s => s.removeCompany);
  const setDefaultCompany = useAppStore(s => s.setDefaultCompany);
  const removePoolCalendar = useAppStore(s => s.removePoolCalendar);
  const removePoolResource = useAppStore(s => s.removePoolResource);
  const updatePoolCalendar = useAppStore(s => s.updatePoolCalendar);
  const updatePoolResource = useAppStore(s => s.updatePoolResource);
  const promoteCalendarToPool = useAppStore(s => s.promoteCalendarToPool);
  const promoteResourceToPool = useAppStore(s => s.promoteResourceToPool);
  const exportPoolIFC = useAppStore(s => s.exportPoolIFC);
  const setUI = useAppStore(s => s.setUI);
  // Actieve document: bron voor "+ Uit project" (promoveren, spec §3).
  const projectCalendars = useAppStore(s => s.calendars);
  const projectResources = useAppStore(s => s.resources);

  const [selectedId, setSelectedId] = useState(defaultCompanyId);
  const selected = companies.find(c => c.id === selectedId) ?? companies[0];
  const pool = pools[selected.id];

  // Bedrijfsnaam als lokale draft (critreview taak 11): commit pas op blur/Enter i.p.v. een
  // store-write (en dus een undo-stap + persist) per toetsaanslag. Wisselt de gebruiker van
  // bedrijf, dan volgt de draft de nieuw geselecteerde naam.
  const [nameDraft, setNameDraft] = useState(selected.name);
  useEffect(() => setNameDraft(selected.name), [selected.id, selected.name]);
  const commitName = () => {
    if (nameDraft.trim() !== '' && nameDraft !== selected.name) renameCompany(selected.id, nameDraft);
    else setNameDraft(selected.name);
  };

  // Promote-keuzelijstjes (eindreview-fix): welk paneel (kalender/resource) staat open, plus een
  // korte succes-melding. Sluiten/wisselen van bedrijf reset beide — geen stale UI-state.
  const [promotePanel, setPromotePanel] = useState<'calendar' | 'resource' | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  useEffect(() => { setPromotePanel(null); setNotice(null); setEditingCalendarId(null); setEditingResourceId(null); }, [selected.id]);

  const onPromoteCalendar = (cal: WorkCalendar) => {
    const id = promoteCalendarToPool(selected.id, cal);
    if (id) setNotice(t('companyLibrary.added'));
  };
  const onPromoteResource = (res: Resource) => {
    const id = promoteResourceToPool(selected.id, res);
    if (id) setNotice(t('companyLibrary.added'));
  };

  // Pool-item bewerken (eindreview-fix): inline draft per item-soort, gecommit pas op "Opslaan"
  // (zelfde niet-per-toetsaanslag-patroon als `nameDraft` hierboven). Eén item tegelijk in
  // bewerkstand — wisselen van item of bedrijf sluit een openstaande bewerking.
  const [editingCalendarId, setEditingCalendarId] = useState<string | null>(null);
  const [calDraft, setCalDraft] = useState('');
  const startEditCalendar = (cal: WorkCalendar) => { setEditingCalendarId(cal.id); setCalDraft(cal.name); };
  const saveEditCalendar = () => {
    if (!editingCalendarId) return;
    const trimmed = calDraft.trim();
    if (trimmed !== '') updatePoolCalendar(selected.id, editingCalendarId, { name: trimmed });
    setEditingCalendarId(null);
  };

  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [resDraft, setResDraft] = useState({ name: '', costPerHour: '', maxUnits: '' });
  const startEditResource = (res: Resource) => {
    setEditingResourceId(res.id);
    setResDraft({
      name: res.name,
      costPerHour: res.costPerHour != null ? String(res.costPerHour) : '',
      maxUnits: String(res.maxUnits),
    });
  };
  const saveEditResource = () => {
    if (!editingResourceId) return;
    const trimmedName = resDraft.name.trim();
    const cost = resDraft.costPerHour.trim() === '' ? undefined : Number(resDraft.costPerHour);
    const units = Number(resDraft.maxUnits);
    updatePoolResource(selected.id, editingResourceId, {
      ...(trimmedName !== '' ? { name: trimmedName } : {}),
      costPerHour: Number.isFinite(cost) ? cost : undefined,
      ...(Number.isFinite(units) && units > 0 ? { maxUnits: units } : {}),
    });
    setEditingResourceId(null);
  };

  const onExport = async () => {
    const content = exportPoolIFC(selected.id);
    if (!content) return;
    await saveFileDialog(`bibliotheek-${selected.name}.ifc`, content, [{ name: 'IFC', extensions: ['ifc'] }]);
  };

  return (
    <div className="backstage-panel library-section">
      <h2>{t('companyLibrary.title')}</h2>
      <p className="library-intro">{t('companyLibrary.intro')}</p>

      <div className="library-layout">
        <aside className="library-companies">
          <div className="library-companies-head">
            <span>{t('companyLibrary.companies')}</span>
            <button onClick={() => setSelectedId(addCompany(t('companyLibrary.newCompany')))} title={t('companyLibrary.addCompany')}>
              <Plus size={14} />
            </button>
          </div>
          <ul>
            {companies.map(c => (
              <li key={c.id} className={c.id === selected.id ? 'active' : ''} onClick={() => setSelectedId(c.id)}>
                <Building2 size={13} />
                <span>{c.name}</span>
                {c.id === defaultCompanyId && <Star size={12} className="default-star" />}
              </li>
            ))}
          </ul>
        </aside>

        <section className="library-detail">
          <div className="library-detail-head">
            <input
              className="library-name-input"
              value={nameDraft}
              onChange={e => setNameDraft(e.target.value)}
              onBlur={commitName}
              onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur(); }}
              aria-label={t('companyLibrary.companyName')}
            />
            <div className="library-detail-actions">
              <button onClick={() => setDefaultCompany(selected.id)} disabled={selected.id === defaultCompanyId}>
                <Star size={13} /> {t('companyLibrary.setDefault')}
              </button>
              <button onClick={onExport}><Download size={13} /> {t('companyLibrary.export')}</button>
              <button onClick={() => setUI({ showPoolImportDialog: true })}><Upload size={13} /> {t('companyLibrary.import')}</button>
              <button
                className="danger"
                onClick={() => removeCompany(selected.id)}
                disabled={companies.length <= 1}
                title={companies.length <= 1 ? t('companyLibrary.cannotRemoveLast') : ''}
              >
                <Trash2 size={13} /> {t('companyLibrary.removeCompany')}
              </button>
            </div>
          </div>

          <p className="library-backup-hint">{t('companyLibrary.backupHint')}</p>

          {notice && (
            <p className="library-notice" data-ops-library-notice>
              <Check size={13} /> {notice}
            </p>
          )}

          <div className="library-pool">
            <h3>
              {t('companyLibrary.calendars')} <span className="pool-version">v{pool.poolVersion}</span>
              <button
                className="library-promote-toggle"
                onClick={() => { setPromotePanel(p => (p === 'calendar' ? null : 'calendar')); setNotice(null); }}
              >
                <Plus size={12} /> {t('companyLibrary.promoteFromProject')}
              </button>
            </h3>
            {promotePanel === 'calendar' && (
              <div className="library-promote-panel" data-ops-promote-calendar-panel>
                <ul>
                  {projectCalendars.map(cal => {
                    const linked = cal.libraryOrigin?.companyId === selected.id;
                    return (
                      <li key={cal.id}>
                        <span>{cal.name}</span>
                        {linked ? (
                          <span className="library-promote-linked">{t('companyLibrary.alreadyLinked')}</span>
                        ) : (
                          <button className="library-promote-item" onClick={() => onPromoteCalendar(cal)}>
                            <ArrowUpFromLine size={12} />
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {pool.calendars.length === 0 && <p className="empty">{t('companyLibrary.noCalendars')}</p>}
            <ul>
              {pool.calendars.map(cal => (
                editingCalendarId === cal.id ? (
                  <li key={cal.id} className="library-pool-item-edit">
                    <input
                      className="library-item-name-input"
                      value={calDraft}
                      onChange={e => setCalDraft(e.target.value)}
                      aria-label={t('companyLibrary.field.name')}
                      autoFocus
                    />
                    <div className="library-pool-item-edit-actions">
                      <button className="confirm-icon" onClick={saveEditCalendar} title={t('save')}><Check size={12} /></button>
                      <button className="cancel-icon" onClick={() => setEditingCalendarId(null)} title={t('cancel')}><X size={12} /></button>
                    </div>
                  </li>
                ) : (
                  <li key={cal.id}>
                    <span>{cal.name}</span>
                    <div className="library-pool-item-actions">
                      <button className="edit-icon" onClick={() => startEditCalendar(cal)} title={t('companyLibrary.editItem')}><Pencil size={12} /></button>
                      <button className="danger-icon" onClick={() => removePoolCalendar(selected.id, cal.id)}><Trash2 size={12} /></button>
                    </div>
                  </li>
                )
              ))}
            </ul>

            <h3>
              {t('companyLibrary.resources')}
              <button
                className="library-promote-toggle"
                onClick={() => { setPromotePanel(p => (p === 'resource' ? null : 'resource')); setNotice(null); }}
              >
                <Plus size={12} /> {t('companyLibrary.promoteFromProject')}
              </button>
            </h3>
            {promotePanel === 'resource' && (
              <div className="library-promote-panel" data-ops-promote-resource-panel>
                <ul>
                  {projectResources.map(res => {
                    const linked = res.libraryOrigin?.companyId === selected.id;
                    return (
                      <li key={res.id}>
                        <span>{res.name}</span>
                        {linked ? (
                          <span className="library-promote-linked">{t('companyLibrary.alreadyLinked')}</span>
                        ) : (
                          <button className="library-promote-item" onClick={() => onPromoteResource(res)}>
                            <ArrowUpFromLine size={12} />
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {pool.resources.length === 0 && <p className="empty">{t('companyLibrary.noResources')}</p>}
            <ul>
              {pool.resources.map(res => (
                editingResourceId === res.id ? (
                  <li key={res.id} className="library-pool-item-edit">
                    <input
                      className="library-item-name-input"
                      value={resDraft.name}
                      onChange={e => setResDraft(d => ({ ...d, name: e.target.value }))}
                      aria-label={t('companyLibrary.field.name')}
                      autoFocus
                    />
                    <input
                      className="library-item-number-input"
                      type="number"
                      value={resDraft.costPerHour}
                      onChange={e => setResDraft(d => ({ ...d, costPerHour: e.target.value }))}
                      aria-label={t('companyLibrary.field.costPerHour')}
                      title={t('companyLibrary.field.costPerHour')}
                    />
                    <input
                      className="library-item-number-input"
                      type="number"
                      min="0"
                      step="0.1"
                      value={resDraft.maxUnits}
                      onChange={e => setResDraft(d => ({ ...d, maxUnits: e.target.value }))}
                      aria-label={t('companyLibrary.field.maxUnits')}
                      title={t('companyLibrary.field.maxUnits')}
                    />
                    <div className="library-pool-item-edit-actions">
                      <button className="confirm-icon" onClick={saveEditResource} title={t('save')}><Check size={12} /></button>
                      <button className="cancel-icon" onClick={() => setEditingResourceId(null)} title={t('cancel')}><X size={12} /></button>
                    </div>
                  </li>
                ) : (
                  <li key={res.id}>
                    <span>{res.name}</span>
                    <div className="library-pool-item-actions">
                      <button className="edit-icon" onClick={() => startEditResource(res)} title={t('companyLibrary.editItem')}><Pencil size={12} /></button>
                      <button className="danger-icon" onClick={() => removePoolResource(selected.id, res.id)}><Trash2 size={12} /></button>
                    </div>
                  </li>
                )
              ))}
            </ul>
          </div>

          <p className="library-promote-hint">
            <ArrowUpFromLine size={13} /> {t('companyLibrary.promoteHint')}
          </p>
        </section>
      </div>
    </div>
  );
}
