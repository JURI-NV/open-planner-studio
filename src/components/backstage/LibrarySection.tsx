import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Plus, Trash2, Star, Download, Upload, ArrowUpFromLine } from 'lucide-react';
import { useAppStore } from '@/state/appStore';
import { saveFileDialog } from '@/services/fileAccess';
import './LibrarySection.css';

/**
 * Backstage → Bibliotheek (spec §3): bedrijven beheren, pool-inhoud tonen/verwijderen, promoveren,
 * export/import. Export is tevens het backupmechanisme (spec §5).
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
  const exportPoolIFC = useAppStore(s => s.exportPoolIFC);
  const setUI = useAppStore(s => s.setUI);

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

          <div className="library-pool">
            <h3>{t('companyLibrary.calendars')} <span className="pool-version">v{pool.poolVersion}</span></h3>
            {pool.calendars.length === 0 && <p className="empty">{t('companyLibrary.noCalendars')}</p>}
            <ul>
              {pool.calendars.map(cal => (
                <li key={cal.id}>
                  <span>{cal.name}</span>
                  <button className="danger-icon" onClick={() => removePoolCalendar(selected.id, cal.id)}><Trash2 size={12} /></button>
                </li>
              ))}
            </ul>

            <h3>{t('companyLibrary.resources')}</h3>
            {pool.resources.length === 0 && <p className="empty">{t('companyLibrary.noResources')}</p>}
            <ul>
              {pool.resources.map(res => (
                <li key={res.id}>
                  <span>{res.name}</span>
                  <button className="danger-icon" onClick={() => removePoolResource(selected.id, res.id)}><Trash2 size={12} /></button>
                </li>
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
