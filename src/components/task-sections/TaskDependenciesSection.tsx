import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/state/appStore';
import { SequenceType, SEQUENCE_TYPE_OPTIONS } from '@/types/sequence';
import { Task } from '@/types/task';
import { SequenceLagInput } from '@/components/common/SequenceLagInput';
import { HoverTooltip } from '@/components/canvas/HoverTooltip';
import { TaskTooltipContent } from '@/components/canvas/TaskTooltipContent';
import { Trash2, Zap } from 'lucide-react';

interface HoverState { x: number; y: number; task: Task; }

/**
 * Afhankelijkheden (relatietabel: type + lag + driving-badge + verwijderen) — sectie 9 uit
 * `TaskPropertiesPanel` (fase 2.10, item 2). RELATIONEEL/storeful: roept `updateSequence`/
 * `removeSequence` rechtstreeks aan, identiek in paneel én dialoog (dialoog heeft altijd een
 * bestaand `task.id` — zie ontwerp-doc-vondst).
 *
 * Issue #65: het WBS-nummer van de gekoppelde taak is een knop — de eerdere richtingspijl (→/←)
 * ervoor is weg (eigenaarsbesluit 2026-08-18: alleen het nummer, geen pijltje).
 * Hover toont dezelfde `TaskTooltipContent` als het canvas (via de gedeelde, portal-gebaseerde
 * `HoverTooltip`); klik roept `focusOnTask` aan — selecteert de taak, klapt een ingeklapte
 * oudersketen uit, en laat GanttCanvas ernaartoe zoomen/scrollen. Dat laatste heeft een gemonte
 * `GanttCanvas` nodig om het `pendingFocusTaskId`-signaal ooit op te pikken en te wissen — die
 * garantie geldt alleen in het eigenschappenpaneel (`!isFullPanel`, App.tsx), niet in `TaskDialog`
 * (opent op elk tabblad via F2). `interactive=false` (hyperkritische review issue #65) valt daarom
 * terug op platte tekst (taaknaam), zonder knop/hover/klik.
 */
export function TaskDependenciesSection({ taskId, interactive = true }: { taskId: string; interactive?: boolean }) {
  const { t } = useTranslation('task');
  const tasks = useAppStore(s => s.tasks);
  const sequences = useAppStore(s => s.sequences);
  const cpmResult = useAppStore(s => s.cpmResult);
  const updateSequence = useAppStore(s => s.updateSequence);
  const removeSequence = useAppStore(s => s.removeSequence);
  const focusOnTask = useAppStore(s => s.focusOnTask);
  const [hover, setHover] = useState<HoverState | null>(null);

  // Spooktooltip (hyperkritische review issue #65): de hover werd voorheen alleen gewist door
  // onMouseLeave/onClick op de knop zelf. Wisselt de selectie (of verandert de sequence-lijst)
  // zonder dat de muis de knop verlaat — bv. Ctrl+Z, een pijltoets, of de AI-assistent die de
  // selectie verzet — dan bleef de tooltip van de vorige taak zweven, ook over dialogen heen (hij
  // rendert via een portal met een hoge z-index). Elke wissel van context wist 'm daarom expliciet.
  useEffect(() => {
    setHover(null);
  }, [taskId, sequences]);

  const taskSequences = sequences.filter(
    s => s.predecessorId === taskId || s.successorId === taskId
  );
  if (taskSequences.length === 0) return null;

  return (
    <>
      <div className="h-px" style={{ background: 'var(--theme-border-light)' }} />
      <span className="ui-card-header !text-xs">{t('properties.dependencies')}</span>
      {taskSequences.map(seq => {
        const other = seq.predecessorId === taskId
          ? tasks.find(t => t.id === seq.successorId)
          : tasks.find(t => t.id === seq.predecessorId);
        const isDriving = !!cpmResult && !cpmResult.error
          && cpmResult.drivingSequenceIds.includes(seq.id);
        return (
          <div key={seq.id} className="flex items-center gap-1 text-[10px]">
            {!interactive ? (
              <span className="flex-1 truncate">{other?.name || '?'}</span>
            ) : other ? (
              <button
                type="button"
                className="shrink-0 max-w-[45%] truncate"
                style={{ color: 'var(--theme-accent)' }}
                title={other.name}
                aria-label={t('properties.jumpToTask', { wbs: other.wbsCode || other.name })}
                onMouseMove={e => setHover({ x: e.clientX, y: e.clientY, task: other })}
                onMouseLeave={() => setHover(null)}
                onFocus={e => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setHover({ x: r.left, y: r.bottom, task: other });
                }}
                onBlur={() => setHover(null)}
                onClick={() => { setHover(null); focusOnTask(other.id); }}
              >
                {other.wbsCode || other.name}
              </button>
            ) : (
              <span className="flex-1 truncate">?</span>
            )}
            {isDriving && (
              <span title={t('properties.driving')} style={{ color: 'var(--theme-accent)' }}>
                <Zap size={10} />
              </span>
            )}
            <select
              value={seq.type}
              onChange={e => updateSequence(seq.id, { type: e.target.value as SequenceType })}
              className="input !text-[10px] !px-1 !py-0.5"
            >
              {SEQUENCE_TYPE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <SequenceLagInput
              seq={seq}
              title={t('properties.lag')}
              onCommit={patch => updateSequence(seq.id, patch)}
            />
            <button
              onClick={() => removeSequence(seq.id)}
              style={{ color: 'var(--error)' }}
            >
              <Trash2 size={10} />
            </button>
          </div>
        );
      })}
      {hover && (
        <HoverTooltip left={hover.x + 16} top={hover.y - 10}>
          <TaskTooltipContent task={hover.task} />
        </HoverTooltip>
      )}
    </>
  );
}
