// Web-opslaan-terugvalchecks — de download-route als de omgeving schrijven weigert.
//
// Waarom deze batterij bestaat (gemeten 2026-07-30). In de embedded webview van de Claude-
// desktopapp (Electron 42 / Chrome 148) bestáát de File System Access API compleet:
// `showSaveFilePicker`, `FileSystemWritableFileStream` en `createWritable` zijn alle drie
// aanwezig, en OPFS-handles schrijven gewoon. Maar een handle uit de bestandskiezer krijgt daar
// nooit een readwrite-grant, dus `createWritable` gooit `NotAllowedError`. De web-backend koos
// zijn route op feature-detectie ("bestaat de API?") in plaats van op werking, en gaf de rauwe
// DOMException door: de gebruiker kreeg "Failed to save" plus een browsertekst, en zijn werk
// bleef ongeschreven — terwijl de download-route in diezelfde omgeving prima werkt.
//
// Deze checks leggen drie dingen vast:
//   1. Een omgevingsweigering (NotAllowedError/SecurityError) valt terug op downloaden en levert
//      een geslaagde `SaveOutcome` met `viaDownload` op — géén throw.
//   2. Annuleren blijft `null` (geen fout, en zeker geen ongevraagde download), en een ECHTE
//      schrijffout (schijf vol, bestand weg) blijft doorgegeven worden als fout.
//   3. Na één weigering slaat de backend de kansloze kiezer/permissieprompt over.
// Plus: `saveFile` in de store zet die uitkomst om in de `info`-melding en géén `saveFailed`.
//
// Draait via run.sh. Exit 0 = alles groen.
import {
  saveFileDialogWeb, saveToRefWeb, webWriteRefusedByPlatform, resetWebWriteRefusalForTests,
} from '@/services/fileAccess/webBackend';
import type { FileRef } from '@/services/fileAccess';

const diffs: string[] = [];
let checks = 0;
const eq = (label: string, got: unknown, want: unknown) => {
  checks++;
  if (JSON.stringify(got) !== JSON.stringify(want)) {
    diffs.push(`${label}: verwacht ${JSON.stringify(want)}, kreeg ${JSON.stringify(got)}`);
  }
};

// ── Minimale DOM-stub ────────────────────────────────────────────────────────
// De web-backend raakt exact drie dingen aan: `window.showSaveFilePicker` (bestaan + aanroep),
// `document.createElement('a').click()` en `URL.createObjectURL`. Meer is er niet nodig.
interface Downloaded { name: string; bytes: number }
const downloads: Downloaded[] = [];
let lastBlob: Blob | null = null;

const g = globalThis as unknown as Record<string, unknown>;
g.document = {
  createElement: (tag: string) => {
    if (tag !== 'a') throw new Error(`onverwacht element: ${tag}`);
    const el = { href: '', download: '', click: () => { downloads.push({ name: el.download, bytes: lastBlob?.size ?? -1 }); } };
    return el;
  },
};
const realCreateObjectURL = URL.createObjectURL;
URL.createObjectURL = ((b: Blob) => { lastBlob = b; return 'blob:stub'; }) as typeof realCreateObjectURL;
URL.revokeObjectURL = (() => { /* niets */ }) as typeof URL.revokeObjectURL;

/** Fabriceer een handle waarvan `createWritable` gooit wat wij willen. */
type HandleOpts = { permission?: PermissionState; writeError?: DOMException | null };
let pickerCalls = 0;
let permissionCalls = 0;
const makeHandle = (opts: HandleOpts): FileSystemFileHandle => ({
  kind: 'file',
  name: 'project.ifc',
  isSameEntry: () => Promise.resolve(false),
  getFile: () => Promise.resolve(new File(['x'], 'project.ifc')),
  queryPermission: () => { permissionCalls++; return Promise.resolve(opts.permission ?? 'granted'); },
  requestPermission: () => { permissionCalls++; return Promise.resolve(opts.permission ?? 'granted'); },
  createWritable: () => {
    if (opts.writeError) return Promise.reject(opts.writeError);
    return Promise.resolve({ write: () => Promise.resolve(), close: () => Promise.resolve() } as unknown as FileSystemWritableFileStream);
  },
} as unknown as FileSystemFileHandle);

/** Zet `window` op met een kiezer die `handle` teruggeeft (of `pickerError` gooit). */
function installWindow(handle: FileSystemFileHandle | null, pickerError?: DOMException) {
  pickerCalls = 0;
  permissionCalls = 0;
  g.window = {
    showOpenFilePicker: () => Promise.resolve([]),
    showSaveFilePicker: () => {
      pickerCalls++;
      if (pickerError) return Promise.reject(pickerError);
      return Promise.resolve(handle!);
    },
  };
}

const refused = () => new DOMException(
  "Failed to execute 'createWritable' on 'FileSystemFileHandle': The request is not allowed by the user agent or the platform in the current context.",
  'NotAllowedError',
);
const FILTERS = [{ name: 'IFC Files', extensions: ['ifc'] }];

async function main() {
  // ── 1. Omgevingsweigering → download in plaats van een doorgegeven DOMException ──────────
  resetWebWriteRefusalForTests();
  downloads.length = 0;
  installWindow(makeHandle({ writeError: refused() }));
  let outcome = await saveFileDialogWeb('plan.ifc', 'IFC-DATA', FILTERS);
  eq('1a weigering gooit niet maar levert een uitkomst', outcome !== null, true);
  eq('1b uitkomst is als download gemarkeerd', outcome?.viaDownload, true);
  eq('1c geen herbruikbare ref na een download', outcome?.ref, null);
  eq('1d het bestand is echt gedownload', downloads, [{ name: 'plan.ifc', bytes: 8 }]);
  eq('1e de omgevingsweigering is onthouden', webWriteRefusedByPlatform(), true);

  // ── 2. Na de weigering geen kansloze kiezer meer ─────────────────────────────────────────
  downloads.length = 0;
  installWindow(makeHandle({ writeError: refused() }));
  outcome = await saveFileDialogWeb('plan2.ifc', 'IFC', FILTERS);
  eq('2a kiezer wordt overgeslagen zodra de omgeving geweigerd heeft', pickerCalls, 0);
  eq('2b het bestand komt er alsnog', downloads.map(d => d.name), ['plan2.ifc']);

  // ── 3. saveToRefWeb: weigering onthouden, en daarna geen permissieprompt meer ────────────
  resetWebWriteRefusalForTests();
  installWindow(null);
  const ref: FileRef = { kind: 'handle', handle: makeHandle({ writeError: refused() }) };
  eq('3a in-place schrijven mislukt', await saveToRefWeb(ref, 'IFC'), false);
  eq('3b en is als omgevingsweigering onthouden', webWriteRefusedByPlatform(), true);
  const naEerste = permissionCalls;
  eq('3c tweede poging vraagt geen permissie meer', await saveToRefWeb(ref, 'IFC') === false && permissionCalls === naEerste, true);

  // ── 4. Annuleren is geen fout en levert GEEN download ────────────────────────────────────
  resetWebWriteRefusalForTests();
  downloads.length = 0;
  installWindow(null, new DOMException('The user aborted a request.', 'AbortError'));
  eq('4a annuleren geeft null', await saveFileDialogWeb('plan.ifc', 'IFC', FILTERS), null);
  eq('4b annuleren downloadt niets', downloads.length, 0);
  eq('4c annuleren zet de omgeving niet op geweigerd', webWriteRefusedByPlatform(), false);

  // ── 5. Een ECHTE schrijffout blijft een fout ─────────────────────────────────────────────
  resetWebWriteRefusalForTests();
  downloads.length = 0;
  installWindow(makeHandle({ writeError: new DOMException('disk full', 'QuotaExceededError') }));
  let threw = '';
  try {
    await saveFileDialogWeb('plan.ifc', 'IFC', FILTERS);
  } catch (err) {
    threw = (err as DOMException).name;
  }
  eq('5a schijf vol wordt doorgegeven als fout', threw, 'QuotaExceededError');
  eq('5b en wordt niet stil omgezet in een download', downloads.length, 0);
  eq('5c en zet de omgeving niet op geweigerd', webWriteRefusedByPlatform(), false);

  // ── 6. Zonder File System Access API (Firefox/Safari) blijft de download-route staan ─────
  resetWebWriteRefusalForTests();
  downloads.length = 0;
  g.window = {};
  outcome = await saveFileDialogWeb('plan.ifc', 'IFC', FILTERS);
  eq('6a download-terugval zonder FSA', downloads.map(d => d.name), ['plan.ifc']);
  eq('6b ook daar als download gemarkeerd', outcome?.viaDownload, true);

  // ── 7. De store zet dit om in een info-melding, niet in "opslaan mislukt" ────────────────
  // Pas hier importeren: de store trekt het halve `src/`-oppervlak mee en heeft aan de DOM-stub
  // hierboven genoeg, maar de checks 1-6 moeten los van de store bewijsbaar blijven.
  resetWebWriteRefusalForTests();
  downloads.length = 0;
  installWindow(makeHandle({ writeError: refused() }));
  const { useAppStore } = await import('@/state/appStore');
  const S = () => useAppStore.getState();
  S().newProject();
  S().addTask({ name: 'A' });
  await S().saveFile();
  const notes = S().ui.notifications.map(n => ({ sev: n.severity, key: n.messageKey }));
  eq('7a het project is als download opgeslagen', downloads.length, 1);
  eq('7b één melding, en dat is de download-info', notes, [{ sev: 'info', key: 'notifications.savedViaDownload' }]);
  eq('7c geen rauwe browserfout als detail', S().ui.notifications[0]?.detail, undefined);
  eq('7d het document geldt als opgeslagen', S().isDirty, false);

  // ── Rapport ───────────────────────────────────────────────────────────────────────────────
  if (diffs.length === 0) {
    console.log(`   web-opslaan-terugval: ${checks}/${checks} alles groen`);
  } else {
    for (const d of diffs) console.log(`   XX ${d}`);
    console.log(`   web-opslaan-terugval: ${checks - diffs.length}/${checks} groen, ${diffs.length} afwijking(en)`);
    process.exitCode = 1;
  }
}

void main();
