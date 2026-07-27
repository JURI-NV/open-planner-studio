import { useTranslation } from 'react-i18next';
import { Play, Square, Circle } from 'lucide-react';
import { useAppStore } from '@/state/appStore';
import { startMcpServer, stopMcpServer } from '@/services/mcp/server';
import { RibbonButton } from '@/components/layout/Ribbon/ribbonPrimitives';
import type { McpServerStatus } from '@/services/mcp/contracts';

/**
 * AI-ribbontab — groep **Server** (T14, spec §UI). Start/stop-knop + statusindicator, gevoed door
 * `ui.aiServerStatus` (uit / live op poort / poort-bezet mét melding / error). De bridge is
 * Tauri-only: in de web-build is de start-knop uitgeschakeld met een "alleen desktop"-tooltip
 * (`isTauri()`-gate). De statuskleur wordt ook als klein dotje in de statusbalk getoond (StatusBar).
 */

const isTauri = (): boolean => typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

/** Statuskleur per bridge-toestand — gedeeld met het statusbalk-dotje (zelfde semantiek). */
export const AI_STATUS_COLOR: Record<McpServerStatus['state'], string> = {
  off: 'var(--theme-text-muted)',
  live: 'var(--success)',
  'port-busy': 'var(--theme-warning-text)',
  error: 'var(--theme-critical-text)',
};

export function AiServerGroup() {
  const { t } = useTranslation('common');
  const status = useAppStore(s => s.ui.aiServerStatus);
  const running = status.state === 'live';
  const tauri = isTauri();

  const statusText = (() => {
    switch (status.state) {
      case 'live': return t('ai.statusLive', { port: status.port });
      case 'port-busy': return t('ai.statusPortBusy', { port: status.port });
      case 'error': return t('ai.statusError');
      default: return t('ai.statusOff');
    }
  })();

  const onToggle = () => {
    if (!tauri) return;
    if (running) void stopMcpServer();
    else void startMcpServer();
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {/* Wrapper-span draagt de native tooltip: RibbonButton kent zelf geen title-prop, en op een
          disabled knop vuurt onClick sowieso niet — de tooltip legt uit waaróm (alleen desktop). */}
      <span title={!tauri ? t('ai.desktopOnly') : undefined}>
        <RibbonButton
          icon={running ? <Square size={20} /> : <Play size={20} />}
          label={running ? t('ai.stop') : t('ai.start')}
          primary={!running}
          active={running}
          disabled={!tauri}
          onClick={onToggle}
        />
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 130 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Circle size={10} fill={AI_STATUS_COLOR[status.state]} color={AI_STATUS_COLOR[status.state]} />
          <span className="ribbon-info">{statusText}</span>
        </div>
        {!tauri && (
          <span className="ribbon-info" style={{ opacity: 0.7 }}>{t('ai.desktopOnly')}</span>
        )}
        {status.state === 'port-busy' && status.message && (
          <span className="ribbon-info" style={{ color: 'var(--theme-warning-text)' }}>{status.message}</span>
        )}
      </div>
    </div>
  );
}
