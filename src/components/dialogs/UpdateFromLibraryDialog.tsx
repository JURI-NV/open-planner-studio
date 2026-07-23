import { useTranslation } from 'react-i18next';
import { X, RefreshCw, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/state/appStore';
import { Dialog } from '@/components/common/Dialog';
import type { ItemDiff } from '@/services/library';

/**
 * "Bijwerken vanuit bibliotheek" (spec §3): per gestempeld projectitem het verschil
 * (bibliotheekwaarde naast projectwaarde); user kiest per item. Verwijderd origineel ⇒ "bestaat niet
 * meer in bibliotheek". NOOIT een bulk-overschrijfknop.
 */
export function UpdateFromLibraryDialog() {
  const { t } = useTranslation('common');
  const open = useAppStore(s => s.ui.showUpdateFromLibraryDialog);
  const setUI = useAppStore(s => s.setUI);
  const resources = useAppStore(s => s.resources);
  const calendars = useAppStore(s => s.calendars);
  const diffResource = useAppStore(s => s.diffProjectResource);
  const diffCalendar = useAppStore(s => s.diffProjectCalendar);
  const updateResource = useAppStore(s => s.updateProjectResourceFromLibrary);
  const updateCalendar = useAppStore(s => s.updateProjectCalendarFromLibrary);
  const libraryLoaded = useAppStore(s => s.libraryLoaded);

  if (!open) return null;
  const close = () => setUI({ showUpdateFromLibraryDialog: false });

  // Zolang de bibliotheek nog laadt géén valse "bestaat niet meer"-badges tonen: renderDiff
  // valt zonder pool terug op status 'removed', wat tijdens het laden onterecht is.
  const stampedResources = libraryLoaded ? resources.filter(r => r.libraryOrigin) : [];
  const stampedCalendars = libraryLoaded ? calendars.filter(c => c.libraryOrigin) : [];

  // Veldnaam humaniseren via de field-map (alle 14 locales sinds taak 14); `defaultValue` vangt
  // alleen op als de sleutel ook in de fallback-taal (en, via fallbackLng) ontbreekt.
  const fieldLabel = (field: string) => t(`companyLibrary.field.${field}`, { defaultValue: field });

  // Waarde humaniseren i.p.v. rauwe JSON.stringify: getallen/strings direct, arrays/objecten als
  // aantal items (bijv. "8 feestdagen" — de noun komt van het veld zelf, verlaagd).
  const formatDiffValue = (value: unknown, field: string): string => {
    if (value === null || value === undefined) return '—';
    if (Array.isArray(value)) {
      return t('companyLibrary.diffArrayCount', { count: value.length, noun: fieldLabel(field).toLowerCase() });
    }
    if (typeof value === 'object') {
      return t('companyLibrary.diffObjectCount', { count: Object.keys(value as object).length });
    }
    return String(value);
  };

  // Een gestempeld item waarvan het bedrijf/de pool zelf niet meer bestaat levert `diff === null`
  // (i.p.v. `{status:'removed'}`, dat is voor een verwijderd POOL-ITEM binnen een nog bestaande pool).
  // Mag niet stil verdwijnen — zelfde behandeling als status 'removed' (critreview taak 12).
  const renderDiff = (key: string, name: string, diff: ItemDiff | null, onUpdate: () => void) => {
    const status = diff?.status ?? 'removed';
    return (
      <li key={key} className="flex flex-col gap-1.5 px-2 py-2 rounded-[8px] border border-border">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">{name}</span>
          {status === 'up-to-date' && <span className="badge badge--green">{t('companyLibrary.upToDate')}</span>}
          {status === 'removed' && (
            <span className="badge badge--red flex items-center gap-1">
              <AlertCircle size={11} /> {t('companyLibrary.removedFromLibrary')}
            </span>
          )}
        </div>
        {diff?.status === 'changed' && (
          <>
            <ul className="flex flex-col gap-0.5 text-text-secondary">
              {diff.fields.map(f => (
                <li key={f.field}>
                  <b className="text-text-primary">{fieldLabel(f.field)}</b>: {formatDiffValue(f.project, f.field)} → {formatDiffValue(f.library, f.field)}
                </li>
              ))}
            </ul>
            <button onClick={onUpdate} className="btn btn--sm btn--secondary flex items-center gap-1 self-start">
              <RefreshCw size={12} /> {t('companyLibrary.updateThis')}
            </button>
          </>
        )}
      </li>
    );
  };

  return (
    <Dialog
      onBackdropClick={close}
      onCancel={close}
      panelClassName="bg-surface border border-border rounded-[14px] shadow-[var(--shadow-pop)] w-[620px] max-h-[88vh] flex flex-col overflow-hidden"
      panelProps={{ 'data-ops-update-from-library-dialog': true }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
        <span className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
          {t('companyLibrary.updateTitle')}
        </span>
        <button onClick={close} className="p-1 hover:bg-surface-hover rounded-[8px]">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 text-xs">
        {stampedResources.length === 0 && stampedCalendars.length === 0 && (
          <p className="text-text-secondary italic">{t('companyLibrary.noStampedItems')}</p>
        )}

        {stampedResources.length > 0 && (
          <>
            <h3 className="font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{t('companyLibrary.resources')}</h3>
            <ul className="flex flex-col gap-2">
              {stampedResources.map(r => renderDiff(r.id, r.name, diffResource(r.id), () => updateResource(r.id)))}
            </ul>
          </>
        )}

        {stampedCalendars.length > 0 && (
          <>
            <h3 className="font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{t('companyLibrary.calendars')}</h3>
            <ul className="flex flex-col gap-2">
              {stampedCalendars.map(c => renderDiff(c.id, c.name, diffCalendar(c.id), () => updateCalendar(c.id)))}
            </ul>
          </>
        )}
      </div>

      <div className="flex justify-end gap-3 px-4 py-3 border-t border-border">
        <button onClick={close} className="btn btn--sm btn--primary">{t('close')}</button>
      </div>
    </Dialog>
  );
}
