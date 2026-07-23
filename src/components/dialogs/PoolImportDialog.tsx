import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, X } from 'lucide-react';
import { useAppStore } from '@/state/appStore';
import { readPoolIFC } from '@/services/library';
import { openFileDialog } from '@/services/fileAccess';
import { Dialog } from '@/components/common/Dialog';
import type { CompanyPool } from '@/types/library';

/**
 * Pool-import (spec §4): kies bestand → toon inhoud + demping-waarschuwing als de lokale pool
 * nieuwer is → vervang de HELE pool ná bevestiging. Legt het sync-probleem (§8.1) expliciet uit via
 * `syncNote` (bindend user-besluit — altijd zichtbaar, niet alleen bij de demping-waarschuwing).
 */
export function PoolImportDialog() {
  const { t } = useTranslation();
  const open = useAppStore(s => s.ui.showPoolImportDialog);
  const setUI = useAppStore(s => s.setUI);
  const companies = useAppStore(s => s.companies);
  const defaultCompanyId = useAppStore(s => s.defaultCompanyId);
  const isLocalPoolNewer = useAppStore(s => s.isLocalPoolNewer);
  const replacePool = useAppStore(s => s.replacePool);

  const [companyId, setCompanyId] = useState(defaultCompanyId);
  const [imported, setImported] = useState<CompanyPool | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;
  const close = () => { setImported(null); setError(null); setUI({ showPoolImportDialog: false }); };

  const pick = async () => {
    setError(null);
    const res = await openFileDialog([{ name: 'IFC', extensions: ['ifc'] }]);
    if (!res) return;
    try {
      setImported(readPoolIFC(res.content));
    } catch {
      setError(t('companyLibrary.importNotAPool'));
      setImported(null);
    }
  };

  const newer = imported ? isLocalPoolNewer(companyId, imported) : false;

  const confirm = () => {
    if (imported) replacePool(companyId, imported);
    close();
  };

  return (
    <Dialog
      onBackdropClick={close}
      onCancel={close}
      panelClassName="bg-surface border border-border rounded-[14px] shadow-[var(--shadow-pop)] w-[560px] max-h-[88vh] flex flex-col overflow-hidden"
      panelProps={{ 'data-ops-pool-import-dialog': true }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
        <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
          {t('companyLibrary.importTitle')}
        </span>
        <button onClick={close} className="p-1 hover:bg-surface-hover rounded-[8px]">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-text-secondary">{t('companyLibrary.importInto')}</span>
          <select
            value={companyId}
            onChange={e => setCompanyId(e.target.value)}
            className="input !text-xs !px-2.5 !py-1.5"
          >
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>

        <button onClick={pick} className="btn btn--sm btn--secondary self-start">
          {t('companyLibrary.chooseFile')}
        </button>

        {error && <p style={{ color: 'var(--error)' }}>{error}</p>}

        {imported && (
          <div className="flex flex-col gap-2">
            <p>{t('companyLibrary.importPreview', { calendars: imported.calendars.length, resources: imported.resources.length, version: imported.poolVersion })}</p>
            <p className="text-text-secondary">{t('companyLibrary.importReplaces')}</p>
            {newer && (
              <p className="alert alert--warning flex items-center gap-2">
                <AlertTriangle size={16} /> {t('companyLibrary.dempingWarning')}
              </p>
            )}
          </div>
        )}

        <p className="text-text-secondary border-t border-border pt-3">{t('companyLibrary.syncNote')}</p>
      </div>

      <div className="flex justify-end gap-3 px-4 py-3 border-t border-border">
        <button onClick={close} className="btn btn--sm btn--secondary">{t('cancel')}</button>
        <button onClick={confirm} disabled={!imported} className="btn btn--sm btn--primary">{t('companyLibrary.importConfirm')}</button>
      </div>
    </Dialog>
  );
}
