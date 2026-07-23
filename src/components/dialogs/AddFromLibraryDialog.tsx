import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Plus, Check } from 'lucide-react';
import { useAppStore } from '@/state/appStore';
import { Dialog } from '@/components/common/Dialog';

/**
 * "Toevoegen uit bibliotheek" (spec §3): kies bedrijf (selector alleen bij ≥2 bedrijven, §2) en
 * items; toevoegen kopieert met stempel + dedup ("al in project"-melding).
 */
export function AddFromLibraryDialog() {
  const { t } = useTranslation('common');
  const open = useAppStore(s => s.ui.showAddFromLibraryDialog);
  const setUI = useAppStore(s => s.setUI);
  const companies = useAppStore(s => s.companies);
  const pools = useAppStore(s => s.pools);
  const project = useAppStore(s => s.project);
  const defaultCompanyId = useAppStore(s => s.defaultCompanyId);
  const addResource = useAppStore(s => s.addLibraryResourceToProject);
  const addCalendar = useAppStore(s => s.addLibraryCalendarToProject);

  // Voorselectie: het gebonden bedrijf van het project, anders het standaardbedrijf.
  const [companyId, setCompanyId] = useState(project.companyId ?? defaultCompanyId);
  const [notice, setNotice] = useState<string | null>(null);

  // Clamp bij openen naar een nog geldig bedrijf (zelfde reden als PoolImportDialog, critreview
  // taak 11): voorkomt een stille no-op als het voorgeselecteerde bedrijf inmiddels weg is.
  useEffect(() => {
    if (!open) return;
    setNotice(null);
    const preferred = project.companyId ?? defaultCompanyId;
    const valid = companies.some(c => c.id === preferred) ? preferred : companies[0]?.id;
    if (valid) setCompanyId(valid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;
  const close = () => { setNotice(null); setUI({ showAddFromLibraryDialog: false }); };
  const pool = pools[companyId];
  if (!pool) return null;

  const onAddResource = (id: string) => {
    const r = addResource(companyId, id);
    setNotice(r.added ? t('companyLibrary.added') : t('companyLibrary.alreadyInProject'));
  };
  const onAddCalendar = (id: string) => {
    const r = addCalendar(companyId, id);
    setNotice(r.added ? t('companyLibrary.added') : t('companyLibrary.alreadyInProject'));
  };

  return (
    <Dialog
      onBackdropClick={close}
      onCancel={close}
      panelClassName="bg-surface border border-border rounded-[14px] shadow-[var(--shadow-pop)] w-[520px] max-h-[88vh] flex flex-col overflow-hidden"
      panelProps={{ 'data-ops-add-from-library-dialog': true }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
        <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
          {t('companyLibrary.addTitle')}
        </span>
        <button onClick={close} className="p-1 hover:bg-surface-hover rounded-[8px]">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 text-xs">
        {/* Bedrijfsselector alleen bij ≥2 bedrijven (spec §2) — eenpitters zien het bedrijvenconcept
            niet en werken stilzwijgend met het enige bedrijf. */}
        {companies.length >= 2 && (
          <select
            value={companyId}
            onChange={e => setCompanyId(e.target.value)}
            className="input !text-xs !px-2.5 !py-1.5"
            aria-label={t('companyLibrary.importInto')}
          >
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        )}

        {notice && (
          <p className="flex items-center gap-1.5" style={{ color: 'var(--success)' }} data-ops-add-from-library-notice>
            <Check size={13} /> {notice}
          </p>
        )}

        <h3 className="font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{t('companyLibrary.resources')}</h3>
        {pool.resources.length === 0 && <p className="text-text-secondary italic">{t('companyLibrary.noResources')}</p>}
        <ul className="flex flex-col gap-1">
          {pool.resources.map(r => (
            <li key={r.id} className="flex items-center justify-between gap-2 px-2 py-1 rounded-[8px] hover:bg-surface-hover">
              <span>{r.name}</span>
              <button onClick={() => onAddResource(r.id)} className="btn btn--sm btn--secondary flex items-center gap-1">
                <Plus size={13} /> {t('add')}
              </button>
            </li>
          ))}
        </ul>

        <h3 className="font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{t('companyLibrary.calendars')}</h3>
        {pool.calendars.length === 0 && <p className="text-text-secondary italic">{t('companyLibrary.noCalendars')}</p>}
        <ul className="flex flex-col gap-1">
          {pool.calendars.map(c => (
            <li key={c.id} className="flex items-center justify-between gap-2 px-2 py-1 rounded-[8px] hover:bg-surface-hover">
              <span>{c.name}</span>
              <button onClick={() => onAddCalendar(c.id)} className="btn btn--sm btn--secondary flex items-center gap-1">
                <Plus size={13} /> {t('add')}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-end gap-3 px-4 py-3 border-t border-border">
        <button onClick={close} className="btn btn--sm btn--primary">{t('close')}</button>
      </div>
    </Dialog>
  );
}
