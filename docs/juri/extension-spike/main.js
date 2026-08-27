/**
 * JURI Fase 0, T0.4 — extensie-spike HTTP.
 *
 * Doel: vaststellen of het extensiesysteem (docs/extensions.md) genoeg is voor een
 * server-backed save/load-flow, of dat een fork van src/services/fileAccess/ nodig is
 * (implementatieplan-claude-code.md, T0.4).
 *
 * Twee ribbon-knoppen:
 *  - "JURI: naar server sturen"  — leest de huidige planning via api.data.get*() en POST't
 *    'm als JSON naar een lokaal HTTP-endpoint.
 *  - "JURI: van server laden"    — GET't diezelfde URL terug en laadt het resultaat via
 *    api.data.loadProject(...).
 *
 * De HTTP-endpoint is in deze spike een triviale lokale echo-server (zie docs/juri/extension-
 * spike/README.md voor hoe deze extensie headless gedraaid en getest is) — dat is expliciet
 * toegestaan door de taakomschrijving, het punt van de spike is de extensie-kant, niet een echte
 * backend.
 *
 * BELANGRIJKSTE BEVINDING (zie docs/juri/extension-spike.md voor de volledige conclusie): dit
 * bestand kan de planning heen en weer sturen via een HANDMATIGE ribbon-knop, maar er is geen
 * enkele plek in de extensie-API (docs/extensions.md's "API-overzicht"-tabel: importers, data,
 * events, ui, settings, assets, pdfFonts) om Ctrl+S of "Bestand → Opslaan" te onderscheppen —
 * er is geen api.file.*, geen "before-save"-event, geen manier om saveFile()/saveToRef() in
 * src/services/fileAccess/ te vervangen of te overriden. Elke server-opslag via extensies is dus
 * noodzakelijk een TWEEDE, aparte actie naast de bestaande opslaan-flow — nooit een vervanging.
 */

const sdk = require('open-planner-studio');

/** Vaste lokale spike-URL — een echte implementatie zou dit via api.settings.get(...) configureerbaar
 *  maken; voor de spike is een vast adres genoeg om de mechaniek te bewijzen. */
const SPIKE_URL = 'http://127.0.0.1:8934/planning';

module.exports = {
  onLoad(api) {
    api.ui.showNotification(`JURI HTTP-spike geladen (host v${sdk.version}).`, 'info');

    api.ui.addRibbonButton({
      tab: 'planning',
      group: 'JURI-spike',
      label: 'JURI: naar server sturen',
      tooltip: 'Post de huidige planning naar het lokale spike-endpoint',
      onClick: async () => {
        const payload = {
          project: api.data.getProject(),
          calendar: api.data.getCalendar(),
          tasks: api.data.getTasks(),
          sequences: api.data.getSequences(),
          resources: api.data.getResources(),
          assignments: api.data.getAssignments(),
        };
        try {
          const res = await fetch(SPIKE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          api.ui.showNotification(`Planning gepost (${payload.tasks.length} taken).`, 'info');
        } catch (err) {
          api.ui.showNotification(`Post mislukt: ${err.message}`, 'error');
        }
      },
    });

    api.ui.addRibbonButton({
      tab: 'planning',
      group: 'JURI-spike',
      label: 'JURI: van server laden',
      tooltip: 'Lees de planning terug van het lokale spike-endpoint',
      onClick: async () => {
        try {
          const res = await fetch(SPIKE_URL);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const result = await res.json();
          api.data.loadProject(result);
          api.ui.showNotification(`Planning geladen (${result.tasks.length} taken).`, 'info');
        } catch (err) {
          api.ui.showNotification(`Laden mislukt: ${err.message}`, 'error');
        }
      },
    });

    api.events.on(sdk.hostEvents.scheduleCalculated, (data) => {
      const critical = data && typeof data === 'object' ? data.criticalTasks : '?';
      api.ui.showNotification(`Schema herberekend na server-round-trip — kritiek: ${critical}.`, 'info');
    });
  },

  onUnload() {},
};
