import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/state/appStore';
import { loadMcpPort, saveMcpPort } from '@/utils/settingsStore';
import { ensureMcpToken, regenerateMcpToken } from '@/services/mcp/server';
import { ConfirmDialog } from '@/components/dialogs/ConfirmDialog';

/**
 * AI-ribbontab — groep **Verbinding** (T14, spec §UI):
 *  - poortveld (`loadMcpPort`/`saveMcpPort`), alleen wijzigbaar wanneer de server gestopt is;
 *  - tokenveld (verborgen; toon/verberg, kopieerknop, regenereerknop mét bevestigingswaarschuwing
 *    dat bestaande koppelingen breken);
 *  - de kant-en-klare `claude mcp add --transport http ops http://localhost:<poort>/mcp`-regel,
 *    inclusief de `Authorization: Bearer <token>`-header, met kopieerknop.
 *
 * Poort/token leven in localStorage (settingsStore), niet in de store — vandaar lokale React-state
 * die op mount uit de persistente laag wordt geïnitialiseerd. `ensureMcpToken` garandeert dat er een
 * token bestaat zodra de gebruiker dit tabblad opent.
 */

const fieldStyle: React.CSSProperties = {
  padding: '3px 6px',
  background: 'var(--theme-input-bg)',
  border: '1px solid var(--theme-control-border)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--theme-text)',
  fontSize: 11,
};

const iconBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 3,
  background: 'transparent',
  border: '1px solid var(--theme-control-border)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--theme-text)',
  cursor: 'pointer',
};

export function AiConnectionGroup() {
  const { t } = useTranslation('common');
  const serverState = useAppStore(s => s.ui.aiServerStatus.state);
  const setAiServerStatus = useAppStore(s => s.setAiServerStatus);

  const [port, setPort] = useState<number>(() => loadMcpPort());
  const [token, setToken] = useState<string>(() => ensureMcpToken());
  const [showToken, setShowToken] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Poort mag alleen wijzigen zolang de bridge niet draait (de draaiende server bindt de poort).
  const portLocked = serverState !== 'off';

  const connectCmd =
    `claude mcp add --transport http ops http://localhost:${port}/mcp --header "Authorization: Bearer ${token}"`;

  const copy = (text: string, key: string) => {
    void navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(c => (c === key ? null : c)), 1500);
  };

  const onPortChange = (raw: string) => {
    const n = parseInt(raw, 10);
    if (!Number.isFinite(n) || n <= 0) return;
    setPort(n);
    saveMcpPort(n);
    // Houd het off-statusobject (en dus de "uit"-weergave) in sync met de gekozen poort.
    setAiServerStatus({ state: 'off', port: n });
  };

  const onRegenerate = () => {
    const fresh = regenerateMcpToken();
    setToken(fresh);
    setShowToken(true);
    setConfirming(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11, minWidth: 300 }}>
      {/* Poort */}
      <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ minWidth: 44 }}>{t('ai.port')}</span>
        <input
          type="number"
          value={port}
          disabled={portLocked}
          title={portLocked ? t('ai.portLockedHint') : undefined}
          onChange={e => onPortChange(e.target.value)}
          style={{ ...fieldStyle, width: 80, opacity: portLocked ? 0.6 : 1 }}
        />
      </label>

      {/* Token */}
      <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ minWidth: 44 }}>{t('ai.token')}</span>
        <input
          type={showToken ? 'text' : 'password'}
          value={token}
          readOnly
          style={{ ...fieldStyle, flex: 1, minWidth: 120, fontFamily: 'monospace' }}
        />
        <button
          type="button"
          style={iconBtnStyle}
          title={showToken ? t('ai.hideToken') : t('ai.showToken')}
          aria-label={showToken ? t('ai.hideToken') : t('ai.showToken')}
          onClick={() => setShowToken(v => !v)}
        >
          {showToken ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>
        <button
          type="button"
          style={iconBtnStyle}
          title={t('ai.copy')}
          aria-label={t('ai.copy')}
          onClick={() => copy(token, 'token')}
        >
          {copied === 'token' ? <Check size={13} /> : <Copy size={13} />}
        </button>
        <button
          type="button"
          style={iconBtnStyle}
          title={t('ai.regenerate')}
          aria-label={t('ai.regenerate')}
          onClick={() => setConfirming(true)}
        >
          <RefreshCw size={13} />
        </button>
      </label>

      {/* Kant-en-klare verbindingsopdracht */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span className="ribbon-info">{t('ai.connectHint')}</span>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 4 }}>
          <code
            style={{
              ...fieldStyle,
              flex: 1,
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
              overflowX: 'auto',
              userSelect: 'all',
            }}
          >
            {connectCmd}
          </code>
          <button
            type="button"
            style={iconBtnStyle}
            title={t('ai.copy')}
            aria-label={t('ai.copy')}
            onClick={() => copy(connectCmd, 'cmd')}
          >
            {copied === 'cmd' ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      {confirming && (
        <ConfirmDialog
          message={t('ai.regenerateConfirm')}
          confirmLabel={t('ai.regenerate')}
          danger
          onConfirm={onRegenerate}
          onCancel={() => setConfirming(false)}
        />
      )}
    </div>
  );
}
