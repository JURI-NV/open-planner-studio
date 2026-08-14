// Meldingenkanaal-checks (bevinding K8) — headless tegen de ECHTE Zustand-store.
//
// Waarom deze batterij bestaat: de app had GEEN gebruikerszichtbaar foutkanaal. Mislukte opslag,
// mislukte auto-save, corrupte invoer en een kapotte updateketen hadden voor de gebruiker exact
// hetzelfde symptoom — niets. Het kanaal dat dat oplost heeft drie eigenschappen die stil kunnen
// afdrijven en die geen enkele CPM-case raakt:
//
//   1. SAMENVOUWEN. De auto-save probeert het elke 10 s opnieuw. Zonder `dedupeKey` levert één
//      aanhoudende schrijffout zes meldingen per minuut op en verdringt hij alles wat de
//      gebruiker echt moet lezen. De teller moet dus omhoog ZONDER dat de melding van plek
//      springt (een stapel die herordent is onleesbaar).
//   2. FOUTEN ZIJN PLAKKERIG. Bij het aftoppen op MAX_NOTIFICATIONS mag een fout nooit door een
//      info verdrongen worden — dan is de bevinding terug, alleen subtieler.
//   3. APP-GLOBAAL. Zou `notifications` in het documentcontract belanden, dan swapt de lijst bij
//      een tabwissel en landt hij in de undo-snapshot: een opslaanfout die verdwijnt zodra je van
//      tabblad wisselt of Ctrl+Z drukt. De laatste twee blokken bewaken exact dat.
//
// Draait via run.sh. Exit 0 = alles groen.
import { useAppStore } from '@/state/appStore';
import { MAX_NOTIFICATIONS } from '@/state/slices/uiSlice';
import { sameIFCSource } from '@/state/ifcSaveInput';
import { createRelationWithFeedback } from '@/state/relationActions';

const S = () => useAppStore.getState();
const N = () => S().ui.notifications;
const diffs: string[] = [];
let checks = 0;
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
  }
};
const truthy = (label: string, got: boolean) => {
  checks++;
  if (!got) diffs.push(`${label}: verwacht waar, kreeg onwaar`);
};

/** Leeg de lijst zonder aan te nemen hóé dat elders gebeurt (er is bewust geen clear-actie). */
const clearAll = () => { for (const n of [...N()]) S().dismissNotification(n.id); };

// ── 1. Basis: pushen, tellen, wegklikken ─────────────────────────────────────
S().newProject();
clearAll();
eq('1 verse start: geen meldingen', N().length, 0);

S().notify({ severity: 'error', messageKey: 'notifications.saveFailed', detail: 'EACCES' });
eq('2 één melding na één notify', N().length, 1);
eq('3 severity komt door', N()[0]?.severity, 'error');
eq('4 messageKey komt door', N()[0]?.messageKey, 'notifications.saveFailed');
eq('5 detail blijft rauw (bewust onvertaald)', N()[0]?.detail, 'EACCES');
eq('6 eerste voorkomen telt als 1', N()[0]?.count, 1);
truthy('7 melding krijgt een id', typeof N()[0]?.id === 'string' && N()[0]?.id.length > 0);

S().notify({ severity: 'info', messageKey: 'notifications.openFailed' });
eq('8 zonder dedupeKey stapelen meldingen', N().length, 2);
truthy('9 ids zijn uniek', N()[0]?.id !== N()[1].id);

const eersteId = N()[0]?.id;
S().dismissNotification(eersteId);
eq('10 wegklikken verwijdert er precies één', N().length, 1);
eq('11 de JUISTE is weg', N().some(n => n.id === eersteId), false);

S().dismissNotification('bestaat-niet');
eq('12 wegklikken van een onbekende id is een no-op', N().length, 1);

// ── 2. Samenvouwen op dedupeKey ──────────────────────────────────────────────
// Dit is de auto-save-storm: elke 10 s dezelfde fout. Eén regel, teller omhoog.
clearAll();
S().notify({ severity: 'error', messageKey: 'notifications.autoSaveFailed', detail: 'poging 1', dedupeKey: 'autosave' });
S().notify({ severity: 'error', messageKey: 'notifications.autoSaveFailed', detail: 'poging 2', dedupeKey: 'autosave' });
S().notify({ severity: 'error', messageKey: 'notifications.autoSaveFailed', detail: 'poging 3', dedupeKey: 'autosave' });
eq('13 drie identieke meldingen vouwen samen tot één regel', N().length, 1);
eq('14 de teller staat op 3', N()[0]?.count, 3);
eq('15 het detail is dat van de LAATSTE poging', N()[0]?.detail, 'poging 3');

// Een andere dedupeKey is een andere melding.
S().notify({ severity: 'error', messageKey: 'notifications.saveFailed', dedupeKey: 'save' });
eq('16 een andere dedupeKey stapelt wél', N().length, 2);
eq('17 de samengevouwen teller blijft staan', N()[0]?.count, 3);

// Positie moet stabiel blijven: een herhaling mag de stapel niet herordenen.
// De meldingen worden hier uit elkaar gehouden op `detail` — `messageKey` is een GESLOTEN unie
// (`NotificationMessageKey`), dus verzonnen etiketten als 'a'/'b' zijn geen geldige sleutels meer.
clearAll();
S().notify({ severity: 'error', messageKey: 'notifications.saveFailed', detail: 'A', dedupeKey: 'k-a' });
S().notify({ severity: 'error', messageKey: 'notifications.openFailed', detail: 'B' });
S().notify({ severity: 'error', messageKey: 'notifications.saveFailed', detail: 'A', dedupeKey: 'k-a' });
eq('18 herhaling voegt geen regel toe', N().length, 2);
eq('19 de herhaalde melding blijft op zijn plek (geen sprong naar onder)', N().map(n => n.detail), ['A', 'B']);
eq('20 en heeft geteld', N()[0]?.count, 2);

// Zonder dedupeKey NOOIT samenvouwen, ook niet bij identieke inhoud — twee losse
// opslaanpogingen die allebei falen zijn twee gebeurtenissen.
clearAll();
S().notify({ severity: 'error', messageKey: 'notifications.saveFailed', detail: 'zelfde' });
S().notify({ severity: 'error', messageKey: 'notifications.saveFailed', detail: 'zelfde' });
eq('21 zonder dedupeKey blijven identieke meldingen los', N().length, 2);

// ── 3. Aftoppen: een fout mag nooit door een info verdrongen worden ──────────
clearAll();
truthy('22 opzet: het plafond is minstens 2', MAX_NOTIFICATIONS >= 2);
for (let i = 0; i < MAX_NOTIFICATIONS + 2; i++) {
  S().notify({ severity: 'info', messageKey: 'notifications.templateSaved', detail: `i${i}` });
}
eq('23 de lijst wordt afgetopt op MAX_NOTIFICATIONS', N().length, MAX_NOTIFICATIONS);
eq('24 de OUDSTE infos vallen eruit, de nieuwste blijven',
  N().map(n => n.detail), Array.from({ length: MAX_NOTIFICATIONS }, (_, k) => `i${k + 2}`));

// De kern van het blok: één fout onderaan een stroom infos moet blijven staan.
clearAll();
S().notify({ severity: 'error', messageKey: 'notifications.saveFailed', detail: 'DE-FOUT' });
for (let i = 0; i < MAX_NOTIFICATIONS + 3; i++) {
  S().notify({ severity: 'info', messageKey: 'notifications.templateSaved', detail: `spam${i}` });
}
eq('25 de lijst is afgetopt', N().length, MAX_NOTIFICATIONS);
truthy('26 de FOUT staat er nog — infos worden er eerder uitgegooid',
  N().some(n => n.detail === 'DE-FOUT'));
eq('27 en hij staat nog vooraan', N()[0]?.detail, 'DE-FOUT');

// Zijn het allemaal fouten, dan valt (noodgedwongen) de oudste eruit.
clearAll();
for (let i = 0; i < MAX_NOTIFICATIONS + 1; i++) {
  S().notify({ severity: 'error', messageKey: 'notifications.saveFailed', detail: `e${i}` });
}
eq('28 alleen fouten: afgetopt', N().length, MAX_NOTIFICATIONS);
eq('29 alleen fouten: de oudste valt eruit', N().some(n => n.detail === 'e0'), false);
eq('30 alleen fouten: de nieuwste staat erin', N().some(n => n.detail === `e${MAX_NOTIFICATIONS}`), true);

// ── 4. Het echte pad: runCPM meldt een onberekenbare planning ────────────────
// Vandaag hing dit aan een lokale useState in GanttCanvas, dus de cyclusfout was ONZICHTBAAR
// vanuit Backstage, de tabel en het rapport — juist de plekken waar je een export start.
clearAll();
S().newProject();
const c1 = S().addTask({ name: 'C1' });
const c2 = S().addTask({ name: 'C2' });
S().addSequence({ predecessorId: c1, successorId: c2, type: 'FINISH_START', lagDays: 0 });
S().addSequence({ predecessorId: c2, successorId: c1, type: 'FINISH_START', lagDays: 0 });
S().runCPM();
truthy('31 opzet: de solver meldt een cyclus', !!S().cpmResult?.error);
eq('32 runCPM heeft precies één melding gepusht', N().length, 1);
eq('33 de melding is een fout', N()[0]?.severity, 'error');
eq('34 het rauwe solver-bericht zit in detail', N()[0]?.detail, S().cpmResult?.error);
truthy('35 de melding is vertaalbaar (draagt een sleutel, geen kant-en-klare zin)',
  N()[0]?.messageKey.startsWith('notifications.'));

// Nog eens rekenen op dezelfde kapotte planning mag geen tweede regel opleveren.
S().runCPM();
eq('36 herhaald rekenen vouwt samen', N().length, 1);
eq('37 en telt', N()[0]?.count, 2);

// Een gezonde planning meldt niets.
clearAll();
S().newProject();
const g1 = S().addTask({ name: 'G1' });
const g2 = S().addTask({ name: 'G2' });
S().addSequence({ predecessorId: g1, successorId: g2, type: 'FINISH_START', lagDays: 0 });
S().runCPM();
truthy('38 opzet: gezonde planning, geen solver-fout', !S().cpmResult?.error);
eq('39 een geslaagde berekening meldt niets', N().length, 0);

// ── 5. App-globaal: meldingen zijn GEEN documentdata ─────────────────────────
// Zouden ze in `DocumentPayload` zitten, dan verdwijnt een opslaanfout zodra je van tabblad
// wisselt. Dit blok faalt zodra iemand `notifications` aan het documentcontract toevoegt.
clearAll();
S().notify({ severity: 'error', messageKey: 'notifications.saveFailed', dedupeKey: 'blijf' });
const docA = S().activeDocumentId;
S().newDocument();
const docB = S().activeDocumentId;
truthy('40 opzet: er is een tweede document', docA !== docB);
eq('41 de melding overleeft het openen van een nieuw document', N().length, 1);
S().switchDocument(docA);
eq('42 de melding overleeft een documentwissel terug', N().length, 1);
eq('43 en is nog dezelfde melding', N()[0]?.dedupeKey, 'blijf');
S().switchDocument(docB);
S().closeDocument(docB);
eq('44 de melding overleeft het sluiten van een document', N().length, 1);

// ── 6. Meldingen zitten niet in de undo-snapshot ─────────────────────────────
clearAll();
S().newProject();
const u = S().addTask({ name: 'undo-mij' });
S().notify({ severity: 'error', messageKey: 'notifications.saveFailed' });
S().updateTask(u, { name: 'gewijzigd' });
eq('45 opzet: melding staat er vóór de undo', N().length, 1);
S().undo();
eq('46 undo draait de taak terug', S().tasks.find(t => t.id === u)?.name, 'undo-mij');
eq('47 maar laat de melding staan (niet in de snapshot)', N().length, 1);
S().redo();
eq('48 redo laat de melding óók staan', N().length, 1);

// `newProject` is een reset van de PROJECTdata, niet van de app-state.
S().newProject();
eq('49 newProject wist de meldingen niet', N().length, 1);

// ── 7. De I/O-paden melden nu écht (K8b) ────────────────────────────────────
// Deze twee paden zijn headless te draaien omdat ze afbreken vóór/op een browser-API die in Node
// niet bestaat — precies de faalmodus waar de gebruiker vandaag niets van zag.

// Een onleesbaar voorbeeldbestand: `readIFC` gooit sinds K4 een IfcParseError. Vroeger ging dat
// naar `console.error` en zag de gebruiker een leeg scherm zonder uitleg.
clearAll();
S().openExampleFromString('dit is geen IFC', 'kapot.ifc');
eq('50 een onleesbaar bestand meldt zich', N().length, 1);
eq('51 als fout', N()[0]?.severity, 'error');
eq('52 met de open-sleutel', N()[0]?.messageKey, 'notifications.openFailed');
truthy('53 en met de rauwe parserfout als detail', (N()[0]?.detail ?? '').length > 0);

// `saveFile` had helemaal GEEN try/catch, en de Tauri-backend vangt ook niets: een schijf vol of
// een geweigerde permissie leverde een afgewezen promise op die nergens landde. Headless klapt
// het pad al op `isTauri()` (geen `window`) — een andere oorzaak dan in productie, maar wél
// precies de vraag die hier telt: komt een gooiende opslagpoging bij de gebruiker aan in plaats
// van bij niemand. Wat deze batterij NIET kan halen is het geslaagde-opslag-pad; dat vereist een
// echte bestandsdialoog. De `sameIFCSource`-guard op dát pad wordt hieronder los getest.
clearAll();
S().newProject();
const sv = S().addTask({ name: 'niet-opgeslagen' });
truthy('54 opzet: het document is gewijzigd', S().isDirty === true);
let saveThrew = false;
await S().saveFile().catch(() => { saveThrew = true; });
eq('55 saveFile gooit niet meer naar de aanroeper', saveThrew, false);
eq('56 de mislukte opslag meldt zich', N().length, 1);
eq('57 met de opslaan-sleutel', N()[0]?.messageKey, 'notifications.saveFailed');
eq('58 en het document blijft gewijzigd (geen valse "opgeslagen")', S().isDirty, true);
truthy('59 de taak staat er nog', !!S().tasks.find(t => t.id === sv));

// ── 8. `sameIFCSource`: de wacht op verouderde inhoud ───────────────────────
// `saveFile` serialiseert, wacht dán op een native dialoog die minuten open kan staan, en wist
// dán `isDirty`. Alles wat de gebruiker ondertussen typt gold als opgeslagen maar stond nergens.
// De vergelijking hieronder is wat dat tegenhoudt; hij moet dus zowel gelijk als ONgelijk kunnen
// zeggen. Referentievergelijking volstaat omdat Immer elk gemuteerd veld vervangt.
S().newProject();
const voor = S();
truthy('60 dezelfde state is aan zichzelf gelijk', sameIFCSource(voor, S()));
const bewerkt = S().addTask({ name: 'tijdens de dialoog getypt' });
truthy('61 opzet: de taak is toegevoegd', !!S().tasks.find(t => t.id === bewerkt));
truthy('62 een taakmutatie tijdens de await wordt gezien', !sameIFCSource(voor, S()));
// Een puur UI-wijziging is GEEN inhoudswijziging — anders zou `isDirty` nooit meer gewist worden
// zodra de gebruiker tijdens de dialoog ook maar een paneel opent.
const naTaak = S();
S().setUI({ rightPanelCollapsed: !S().ui.rightPanelCollapsed });
truthy('63 een UI-wijziging telt niet als inhoudswijziging', sameIFCSource(naTaak, S()));

// ── 9. Relatie leggen meldt zich (issue #40) ────────────────────────────────
// De Relatie-knop legde bij 2 selecties wél een relatie aan, maar volstrekt geluidloos — en een
// geweigerd duplicaat was helemaal niet van "de knop doet niets" te onderscheiden. Alle drie de
// callsites (lint-knop, Relaties-paneel, slepen in de Gantt) lopen nu door deze ene wrapper.
clearAll();
S().newProject();
const rA = S().addTask({ name: 'Fundering' });
const rB = S().addTask({ name: 'Wanden' });
const rel1 = createRelationWithFeedback(rA, rB);
truthy('64 de relatie is aangemaakt', !!rel1 && S().sequences.some(q => q.id === rel1));
eq('65 en meldt zich', N().length, 1);
eq('66 met de aanmaak-sleutel', N()[0]?.messageKey, 'notifications.relationCreated');
eq('67 en de namen als parameters', N()[0]?.params, { predecessor: 'Fundering', successor: 'Wanden' });

// Exact hetzelfde nog eens: `addSequence` weigert het duplicaat stil — de wrapper doet dat niet.
const rel2 = createRelationWithFeedback(rA, rB);
eq('68 een duplicaat levert geen id op', rel2, null);
eq('69 en geen tweede relatie', S().sequences.length, 1);
eq('70 maar wél een melding', N().length, 2);
eq('71 met de duplicaat-sleutel', N()[1]?.messageKey, 'notifications.relationDuplicate');

// Herhalen vouwt samen (dedupeKey) i.p.v. de stapel vol te rammen.
createRelationWithFeedback(rA, rB);
eq('72 herhaald duplicaat vouwt samen', N().length, 2);
eq('73 en telt', N()[1]?.count, 2);

// Verzameltaak-eindpunt (spec 2026-08-14): dezelfde weigeringsweg als het duplicaat hierboven,
// maar met een ANDERE reden — `REJECTION_MESSAGE['summary-endpoint']` zou zonder deze check
// onopgemerkt naar de duplicaat-sleutel kunnen wijzen en de gebruiker "relatie bestaat al" tonen
// voor een relatie die de solver toch al als spookrelatie zou weggooien.
clearAll();
S().newProject();
const rFase = S().addTask({ name: 'Fase' });
S().addTask({ name: 'Kind', parentId: rFase });
const rLos = S().addTask({ name: 'Los' });
const rel3 = createRelationWithFeedback(rFase, rLos);
eq('74 een verzameltaak-eindpunt levert geen id op', rel3, null);
eq('75 en geen relatie erbij', S().sequences.length, 0);
eq('76 maar wél een melding', N().length, 1);
eq('77 met de verzameltaak-sleutel', N()[0]?.messageKey, 'notifications.relationSummaryEndpoint');

// ── Uitkomst ────────────────────────────────────────────────────────────────
if (diffs.length) {
  console.log(`XX  notifications: ${diffs.length} van de ${checks} checks FOUT`);
  for (const d of diffs) console.log(`    - ${d}`);
  process.exit(1);
}
console.log(`OK  notifications: alle checks groen (${checks})`);
