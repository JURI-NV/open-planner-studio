import { Fragment, useMemo, useState } from 'react';
import { useAppStore } from '@/state/appStore';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';
import type { CompanyPool } from '@/types/library';
import type { Resource } from '@/types/resource';
import {
  computeLibraryOccupancy,
  type OccupancyDocInput,
  type OccupancyRow,
} from '@/services/library/occupancy';
import { documentTitle, untitledOrdinals, displayDocumentTitle, documentColor } from '@/utils/documents';
import { maxUnitsOn } from '@/engine/scheduler/ResourceLoad';
import { parseDate, formatDate, addCalendarDays } from '@/utils/dateUtils';

/** Maximaal getoonde conflictdatums in de badge-tooltip/subregel (§5: "max. ~5, dan …"). */
const MAX_CONFLICT_DATES_SHOWN = 5;

/**
 * B1b — bezettingsoverzicht per bibliotheek over álle open documenten (spec
 * 2026-08-14-b1b-bezettingsoverzicht-design.md §5/§5a). Derde stand van de Resources-schakelaar
 * (`ui.resourcesView === 'occupancy'`, gerenderd vanuit `ResourcePanel` onder dezelfde
 * `linked`-conditie als de Bibliotheekweergave). Leesvenster: er valt hier niets te muteren.
 *
 * Aanlevering (§4.4): de bestaande `getOpenDocumentPayloads()` (actief document via
 * `capturePayload`, de rest per referentie), per document gemapt naar `OccupancyDocInput` met de
 * titel-afleiding van de tabbladen (`documentTitle` + `untitledOrdinals`). Geen nieuwe
 * store-actie of -veld: de aggregatie is een leesberekening in de weergavelaag.
 *
 * Prestaties (§7): lazy — dit component mount alleen in de Bezettingsweergave — en één `useMemo`
 * rond `computeLibraryOccupancy` met als afhankelijkheden de identiteiten van `s.documents`,
 * de pool en de top-level velden van het actieve document. Immer geeft nieuwe referenties bij
 * elke mutatie, dus dit is vanzelf correct; slapende payloads wijzigen alleen op de
 * verversingsgrenzen en die vervangen de payload-referentie.
 */
export function ResourceOccupancyView({ companyId, pool }: { companyId: string; pool: CompanyPool }) {
  const { t, i18n } = useTranslation('common');

  // §7-afhankelijkheden. De top-level velden van het actieve document staan hier uitsluitend als
  // memo-triggers: `getOpenDocumentPayloads()` leest ze zelf vers via `capturePayload`, maar zonder
  // deze subscriptions zou een bewerking in het actieve document de memo niet ongeldig maken.
  const documents = useAppStore(s => s.documents);
  const activeResources = useAppStore(s => s.resources);
  const activeAssignments = useAppStore(s => s.assignments);
  const activeTasks = useAppStore(s => s.tasks);
  const activeCalendar = useAppStore(s => s.calendar);
  const activeCalendars = useAppStore(s => s.calendars);
  const activeScheduleStale = useAppStore(s => s.scheduleStale);
  const getOpenDocumentPayloads = useAppStore(s => s.getOpenDocumentPayloads);

  const untitledLabel = t('project.untitled');

  const { rows, anyStale } = useMemo(() => {
    const payloads = getOpenDocumentPayloads();
    // Zelfde titel-afleiding als de tabbladen: rauwe titels eerst, dan volgnummers voor naamloze
    // documenten, dan het vertaalde label eromheen (zie `getOpenDocuments`/`useDocumentCards`).
    const rawTitles = payloads.map(({ payload }) => documentTitle(payload.filePath, payload.project.name));
    const ordinals = untitledOrdinals(rawTitles);
    const inputs: OccupancyDocInput[] = payloads.map(({ id, payload }, i) => ({
      docId: id,
      title: displayDocumentTitle(rawTitles[i], ordinals[i], untitledLabel),
      scheduleStale: payload.scheduleStale,
      companyId: payload.project.companyId ?? null,
      resources: payload.resources,
      assignments: payload.assignments,
      tasks: payload.tasks,
      calendar: payload.calendar,
      calendars: payload.calendars,
    }));
    const result = computeLibraryOccupancy(companyId, pool, inputs);
    // Weergavesortering (§5): conflicten bovenaan (meeste conflictdagen eerst), daarna alfabetisch
    // op poolnaam — de kern levert bewust de neutrale poolvolgorde.
    const sorted = [...result.rows].sort((a, b) =>
      (b.conflictDays.length - a.conflictDays.length) || a.name.localeCompare(b.name, i18n.language));
    return { rows: sorted, anyStale: result.anyStale };
    // De actieve-documentvelden zijn pure memo-triggers (zie het commentaar bij de subscriptions).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    documents, pool, companyId, untitledLabel, i18n.language,
    activeResources, activeAssignments, activeTasks, activeCalendar, activeCalendars, activeScheduleStale,
  ]);

  // Uitklap (chevron) en histogram-selectie zijn twee losse assen: uitklappen toont de
  // per-document-subregel (§5), selecteren voedt het histogram eronder (§5a).
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Piek/capaciteit met één decimaal ("3,0 / 2,0", §5) — de "/" is opmaak, geen tekst.
  const unitsFmt = useMemo(
    () => new Intl.NumberFormat(i18n.language, { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    [i18n.language],
  );

  // Vaste kleur per document (§5a): het bestaande identiteitskleur-palet van de document-chrome,
  // gezaaid op de docId zodat óók een variant-duplicaat (zelfde project-id) een eigen kleur krijgt.
  const colorOf = (docId: string) => documentColor(docId);

  const selectedRow = selectedItem !== null ? rows.find(r => r.libraryItemId === selectedItem) : undefined;
  const selectedPoolItem = selectedRow ? pool.resources.find(r => r.id === selectedRow.libraryItemId) : undefined;

  /** Totale periode van een rij: min `firstDay` … max `lastDay` over de documenten (§5). */
  const rowPeriod = (row: OccupancyRow): string => {
    let first: string | null = null;
    let last: string | null = null;
    for (const d of row.docs) {
      if (d.firstDay !== null && (first === null || d.firstDay < first)) first = d.firstDay;
      if (d.lastDay !== null && (last === null || d.lastDay > last)) last = d.lastDay;
    }
    return first !== null && last !== null ? `${first} – ${last}` : '—';
  };

  /** De eerste ~5 conflictdatums, daarna "… en {{count}} meer" (§5). */
  const conflictDatesLabel = (row: OccupancyRow): string => {
    const shown = row.conflictDays.slice(0, MAX_CONFLICT_DATES_SHOWN);
    const rest = row.conflictDays.length - shown.length;
    return rest > 0
      ? `${shown.join(', ')} ${t('resource.occupancy.moreDays', { count: rest })}`
      : shown.join(', ');
  };

  return (
    <div className="flex-1 overflow-auto" data-ops-occupancy-view>
      {anyStale && (
        // Zelfde waarschuwingsbanner-vorm als de Bibliotheekweergave-hint: semantische
        // --warning-token + per-thema --theme-warning-text, leesbaar in alle drie de thema's.
        <div
          className="flex items-center gap-2 mx-2 mt-2 px-2.5 py-1.5 rounded-[8px] border font-medium"
          style={{
            background: 'color-mix(in srgb, var(--warning) 14%, transparent)',
            borderColor: 'var(--warning)',
            color: 'var(--theme-warning-text)',
          }}
          role="alert"
          data-ops-occupancy-stale-banner
        >
          <AlertTriangle size={14} className="shrink-0" aria-hidden />
          <span>{t('resource.occupancy.staleBanner')}</span>
        </div>
      )}

      {rows.length === 0 ? (
        <div className="p-4 text-text-secondary" data-ops-occupancy-empty>{t('resource.occupancy.empty')}</div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="sticky top-0 z-10" style={{ background: 'var(--theme-surface-alt)' }}>
              <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ minWidth: 160 }}>{t('resource.name')}</th>
              <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ width: 120 }}>{t('resource.occupancy.documents')}</th>
              <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ width: 190 }}>{t('resource.occupancy.period')}</th>
              <th className="text-right px-2 py-1.5 font-semibold border-b border-border" style={{ width: 130 }}>
                {t('resource.occupancy.peak')} / {t('resource.occupancy.capacity')}
              </th>
              <th className="text-left px-2 py-1.5 font-semibold border-b border-border" style={{ width: 190 }} />
            </tr>
          </thead>
          <tbody>
            {rows.map(row => {
              const open = expandedItem === row.libraryItemId;
              const isSelected = selectedItem === row.libraryItemId;
              const hasConflict = row.conflictDays.length > 0;
              return (
                <Fragment key={row.libraryItemId}>
                  <tr
                    className={`border-b border-border-light cursor-pointer ${isSelected ? 'bg-surface-hover' : 'hover:bg-surface-hover'}`}
                    onClick={() => setSelectedItem(isSelected ? null : row.libraryItemId)}
                    aria-selected={isSelected}
                    data-ops-occupancy-row={row.libraryItemId}
                  >
                    <td className="px-2 py-1.5">
                      <div className="flex items-center gap-1 min-w-0">
                        <button
                          onClick={e => { e.stopPropagation(); setExpandedItem(open ? null : row.libraryItemId); }}
                          title={t('resource.occupancy.documents')}
                          className="p-0.5 rounded hover:bg-surface-hover text-text-secondary flex-shrink-0"
                          data-ops-occupancy-expand
                        >
                          {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                        </button>
                        <span className="truncate font-medium">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-2 py-1.5 text-text-secondary">
                      {t('resource.occupancy.docCount', { count: row.docs.length })}
                    </td>
                    <td className="px-2 py-1.5 tabular-nums text-text-secondary">{rowPeriod(row)}</td>
                    <td
                      className="px-2 py-1.5 text-right tabular-nums"
                      style={hasConflict ? { color: 'var(--error)' } : undefined}
                    >
                      {unitsFmt.format(row.totalPeak)} / {unitsFmt.format(row.capacityAtPeak)}
                    </td>
                    <td className="px-2 py-1.5">
                      {hasConflict && (
                        <span
                          className="badge badge--red"
                          title={conflictDatesLabel(row)}
                          data-ops-occupancy-conflict
                        >
                          {t('resource.occupancy.conflictDays', { count: row.conflictDays.length })}
                        </span>
                      )}
                    </td>
                  </tr>
                  {open && (
                    // Zelfde subrij-patroon als de availabilitySteps-uitklap in `ResourcePanel`.
                    <tr style={{ background: 'var(--theme-surface-alt)' }} data-ops-occupancy-docs={row.libraryItemId}>
                      <td colSpan={5} className="px-3 py-2">
                        <div className="flex flex-col gap-1">
                          {hasConflict && (
                            <span className="text-[10px]" style={{ color: 'var(--error)' }}>
                              {conflictDatesLabel(row)}
                            </span>
                          )}
                          {row.docs.map(doc => (
                            <div key={doc.docId} className="flex items-center gap-2 min-w-0">
                              <span
                                className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
                                style={{ background: colorOf(doc.docId) }}
                                aria-hidden
                              />
                              <span className="truncate font-medium">{doc.title || untitledLabel}</span>
                              <span className="tabular-nums text-text-secondary">
                                {doc.firstDay !== null && doc.lastDay !== null ? `${doc.firstDay} – ${doc.lastDay}` : '—'}
                              </span>
                              <span className="tabular-nums text-text-secondary">
                                {t('resource.occupancy.peak')}: {unitsFmt.format(doc.peak)}
                              </span>
                              {doc.scheduleStale && (
                                <span
                                  className="inline-flex items-center gap-1 flex-shrink-0"
                                  style={{ color: 'var(--theme-warning-text)' }}
                                  title={t('resource.occupancy.staleDoc')}
                                  data-ops-occupancy-stale-doc
                                >
                                  <AlertTriangle size={12} aria-hidden />
                                  <span className="text-[10px]">{t('resource.occupancy.staleDoc')}</span>
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      )}

      {/* §5a: histogram voor het geselecteerde poolitem; zonder selectie de hint. */}
      {rows.length > 0 && (
        <div className="px-3 py-2 border-t border-border" data-ops-occupancy-histogram-section>
          {selectedRow && selectedPoolItem ? (
            <OccupancyHistogram
              row={selectedRow}
              poolItem={selectedPoolItem}
              colorOf={colorOf}
              untitledLabel={untitledLabel}
            />
          ) : (
            <p className="text-text-secondary">{t('resource.occupancy.selectHint')}</p>
          )}
        </div>
      )}

      {/* Permanente voetnoot (§5, scope-grens 2): zichtbaar in het product zelf, niet alleen docs. */}
      <p className="px-3 py-2 text-[10px]" style={{ color: 'var(--theme-text-muted)' }} data-ops-occupancy-machine-only>
        {t('resource.occupancy.machineOnly')}
      </p>
    </div>
  );
}

// --- §5a: SVG-histogram per geselecteerd poolitem ------------------------------------------------

/** Vaste tekenmaten van het histogram (viewBox-eenheden ≈ px; horizontaal scrollbaar). */
const CHART = {
  plotHeight: 130,
  axisGap: 16,     // ruimte onder de plot voor datumlabels
  padLeft: 34,     // ruimte links voor de y-as-waarden
  padRight: 8,
  padTop: 8,
  minDayWidth: 4,
  maxDayWidth: 16,
  targetWidth: 760, // richtbreedte; meer dagen ⇒ breder (scroll), minder ⇒ bredere staven
};

/**
 * Gestapeld daghistogram voor één poolitem (§5a): per ISO-dag de bijdrage per document (vaste
 * kleur per document + legenda), de capaciteitslijn van het poolitem via `maxUnitsOn` per dag
 * (availabilitySteps-knikken zichtbaar als trapjes) en de conflictdagen rood gemarkeerd — dat is
 * letterlijk `row.conflictDays` uit de kern, geen tweede berekening. SVG in de DOM; bewust niet de
 * canvas-`HistogramRenderer` (die hangt aan de tijdschaal van het actieve project).
 */
function OccupancyHistogram({ row, poolItem, colorOf, untitledLabel }: {
  row: OccupancyRow;
  poolItem: Resource;
  colorOf: (docId: string) => string;
  untitledLabel: string;
}) {
  const { t } = useTranslation('common');

  const chart = useMemo(() => {
    // Doorlopende dag-as van de vroegste tot de laatste geboekte dag, zodat de tijd proportioneel
    // blijft en de capaciteitslijn ook over boekingsloze dagen doorloopt.
    let first: string | null = null;
    let last: string | null = null;
    for (const d of row.docs) {
      if (d.firstDay !== null && (first === null || d.firstDay < first)) first = d.firstDay;
      if (d.lastDay !== null && (last === null || d.lastDay > last)) last = d.lastDay;
    }
    if (first === null || last === null) return null;

    const days: string[] = [];
    for (let d = parseDate(first); ; d = addCalendarDays(d, 1)) {
      const iso = formatDate(d);
      if (iso > last) break;
      days.push(iso);
    }

    const capacity = days.map(iso => maxUnitsOn(poolItem, iso));
    const stacks = days.map(iso => row.docs.map(doc => doc.dailyLoad[iso] ?? 0));
    const sums = stacks.map(stack => stack.reduce((a, b) => a + b, 0));
    const maxY = Math.max(1, ...sums, ...capacity) * 1.1;

    const dayWidth = Math.max(
      CHART.minDayWidth,
      Math.min(CHART.maxDayWidth, Math.floor(CHART.targetWidth / days.length)),
    );
    const width = CHART.padLeft + days.length * dayWidth + CHART.padRight;
    const height = CHART.padTop + CHART.plotHeight + CHART.axisGap;
    const conflictSet = new Set(row.conflictDays);

    // Datumlabels: eerste + laatste dag, en bij een langere as de maandovergangen ertussen.
    const labelIdx = new Set<number>([0, days.length - 1]);
    if (days.length > 45) {
      days.forEach((iso, i) => { if (iso.endsWith('-01')) labelIdx.add(i); });
    }

    return { days, capacity, stacks, maxY, dayWidth, width, height, conflictSet, labelIdx };
  }, [row, poolItem]);

  if (chart === null) {
    // Alle boekingen van deze rij zijn 0 eenheden — er valt niets te stapelen.
    return <p className="text-text-secondary">{t('resource.occupancy.empty')}</p>;
  }

  const { days, capacity, stacks, maxY, dayWidth, width, height, conflictSet, labelIdx } = chart;
  const yOf = (units: number) => CHART.padTop + CHART.plotHeight * (1 - units / maxY);
  const xOf = (i: number) => CHART.padLeft + i * dayWidth;

  // Capaciteits-traplijn: horizontaal per dag, verticaal op elke knik.
  let capPath = '';
  for (let i = 0; i < days.length; i++) {
    const y = yOf(capacity[i]);
    if (i === 0) capPath += `M ${xOf(0)} ${y}`;
    else if (capacity[i] !== capacity[i - 1]) capPath += ` L ${xOf(i)} ${yOf(capacity[i - 1])} L ${xOf(i)} ${y}`;
    capPath += ` L ${xOf(i + 1)} ${y}`;
  }

  return (
    <div className="flex flex-col gap-1.5" data-ops-occupancy-histogram={row.libraryItemId}>
      <span className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--theme-text-muted)' }}>
        {row.name}
      </span>
      <div className="overflow-x-auto">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={row.name}
          style={{ display: 'block' }}
        >
          {/* Conflictdagen (§6-definitie, uit `row.conflictDays`): rode band over de volle hoogte. */}
          {days.map((iso, i) => conflictSet.has(iso) && (
            <rect
              key={`c-${iso}`}
              x={xOf(i)}
              y={CHART.padTop}
              width={dayWidth}
              height={CHART.plotHeight}
              fill="var(--error)"
              opacity={0.16}
            />
          ))}
          {/* Gestapelde bijdrage per document, in de vaste documentvolgorde van de rij. */}
          {days.map((iso, i) => {
            let acc = 0;
            return stacks[i].map((units, di) => {
              if (units <= 0) return null;
              const y0 = yOf(acc);
              acc += units;
              const y1 = yOf(acc);
              return (
                <rect
                  key={`${iso}-${row.docs[di].docId}`}
                  x={xOf(i) + 0.5}
                  y={y1}
                  width={Math.max(1, dayWidth - 1)}
                  height={Math.max(0.5, y0 - y1)}
                  fill={colorOf(row.docs[di].docId)}
                />
              );
            });
          })}
          {/* Nullijn + y-as-waarden. */}
          <line
            x1={CHART.padLeft} y1={yOf(0)} x2={xOf(days.length)} y2={yOf(0)}
            stroke="var(--theme-border)" strokeWidth={1}
          />
          <text x={CHART.padLeft - 4} y={yOf(0) + 3} textAnchor="end" fontSize={9} fill="var(--theme-text-muted)">0</text>
          {/* Capaciteitslijn van het poolitem (maxUnitsOn per dag — knikken zichtbaar). */}
          <path d={capPath} fill="none" stroke="var(--theme-text-dim)" strokeWidth={1.5} strokeDasharray="5 3" />
          <text
            x={CHART.padLeft - 4}
            y={yOf(capacity[0]) + 3}
            textAnchor="end"
            fontSize={9}
            fill="var(--theme-text-dim)"
          >{capacity[0]}</text>
          {/* Datumlabels. */}
          {days.map((iso, i) => labelIdx.has(i) && (
            <text
              key={`l-${iso}`}
              x={xOf(i)}
              y={CHART.padTop + CHART.plotHeight + 11}
              fontSize={8}
              fill="var(--theme-text-muted)"
            >{iso}</text>
          ))}
        </svg>
      </div>
      {/* Legenda: de documenttitels met hun vaste kleur (zelfde kleuren als de uitklap-subregels). */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1" data-ops-occupancy-legend>
        {row.docs.map(doc => (
          <span key={doc.docId} className="inline-flex items-center gap-1.5 min-w-0">
            <span className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: colorOf(doc.docId) }} aria-hidden />
            <span className="truncate text-[10px] text-text-secondary">{doc.title || untitledLabel}</span>
            {doc.scheduleStale && (
              <AlertTriangle size={11} style={{ color: 'var(--theme-warning-text)' }} aria-label={t('resource.occupancy.staleDoc')} />
            )}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <svg width={18} height={8} aria-hidden><line x1={0} y1={4} x2={18} y2={4} stroke="var(--theme-text-dim)" strokeWidth={1.5} strokeDasharray="5 3" /></svg>
          <span className="text-[10px] text-text-secondary">{t('resource.occupancy.capacity')}</span>
        </span>
      </div>
    </div>
  );
}
