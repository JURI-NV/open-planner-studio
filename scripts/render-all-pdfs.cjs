/**
 * Headless Electron script: opens each example IFC file,
 * renders the report view, and exports as PNG + PDF.
 *
 * Usage: npx electron scripts/render-all-pdfs.cjs
 */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const EXAMPLES_DIR = path.join(__dirname, '..', 'examples');
const OUTPUT_DIR = path.join(__dirname, '..', 'output');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const ifcFiles = fs.readdirSync(EXAMPLES_DIR)
  .filter(f => f.endsWith('.ifc'))
  .sort();

console.log(`Found ${ifcFiles.length} IFC files to render`);

async function renderFile(win, ifcFile) {
  const filePath = path.join(EXAMPLES_DIR, ifcFile);
  const content = fs.readFileSync(filePath, 'utf-8');
  const baseName = path.basename(ifcFile, '.ifc');

  // Send IFC content to the renderer via a global variable to avoid string interpolation issues
  await win.webContents.executeJavaScript(`window.__IFC_CONTENT = ${JSON.stringify(content)}`);

  // Send IFC content to the renderer and tell it to render report + capture
  const result = await win.webContents.executeJavaScript(`
    (async () => {
      try {
        // Import the IFC reader and parse
        const { readIFC } = await import('/src/services/ifc/ifcReader.ts');
        const { useAppStore } = await import('/src/state/appStore.ts');
        const { renderPrintCanvas } = await import('/src/services/print/printPreview.ts');
        const { getLocalizedMonths, getLocalizedMonthsShort } = await import('/src/i18n/dateFormat.ts');

        const parsed = readIFC(window.__IFC_CONTENT);
        console.log('Parsed tasks:', parsed.tasks.length, 'sequences:', parsed.sequences.length);
        const store = useAppStore.getState();
        store.loadState(parsed);
        store.runCPM();

        // Wait a tick for state to settle
        await new Promise(r => setTimeout(r, 100));

        const state = useAppStore.getState();
        console.log('State tasks:', state.tasks.length, 'project:', state.project.name);

        // Create an offscreen canvas
        const canvas = document.createElement('canvas');

        const options = {
          showCritical: true,
          showFloat: true,
          showDeps: true,
          showWeekends: true,
          showLegend: true,
          showTaskNames: true,
          showCompletion: true,
          autoFit: true,
          paperSize: 'A3',
          orientation: 'landscape',
          companyName: 'Open Planner Studio',
          labels: {
            noTasks: 'Geen taken',
            printed: 'Afgedrukt:',
            legend: { criticalPath: 'Kritiek pad', normal: 'Normaal', milestone: 'Mijlpaal', summary: 'Samenvatting', float: 'Speling' },
            tableHeaders: { rowNum: '#', wbs: 'WBS', taskName: 'Taaknaam', start: 'Start', end: 'Einde', duration: 'Duur', completion: 'Volt.' },
          },
          localizedMonths: getLocalizedMonths('nl'),
          localizedMonthsShort: getLocalizedMonthsShort('nl'),
          locale: 'nl',
          projectStartDate: state.project.startDate,
          projectEndDate: state.project.endDate,
          projectAuthor: state.project.author || '',
        };

        renderPrintCanvas(canvas, state.tasks, state.sequences, state.calendar, state.project.name, options);

        return canvas.toDataURL('image/png');
      } catch (err) {
        return 'ERROR: ' + err.message + '\\n' + err.stack;
      }
    })()
  `);

  if (result.startsWith('ERROR:')) {
    console.error(`  FAILED: ${baseName}: ${result}`);
    return false;
  }

  // Save PNG
  const pngPath = path.join(OUTPUT_DIR, `${baseName}.png`);
  const base64Data = result.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync(pngPath, Buffer.from(base64Data, 'base64'));
  console.log(`  PNG: ${baseName}.png`);

  // Save PDF using the PNG file (avoids data URL size limits)
  const pdfPath = path.join(OUTPUT_DIR, `${baseName}.pdf`);
  try {
    const pdfWin = new BrowserWindow({
      show: false,
      width: 1587,
      height: 1123,
      webPreferences: { offscreen: true },
    });

    const pngFileUrl = `file:///${pngPath.replace(/\\/g, '/')}`;
    const htmlContent = `<!DOCTYPE html>
      <html><head><style>
        * { margin: 0; padding: 0; }
        body { display: flex; justify-content: center; background: white; }
        img { max-width: 100%; height: auto; }
        @page { size: A3 landscape; margin: 5mm; }
      </style></head><body>
      <img src="${pngFileUrl}" />
      </body></html>`;

    await pdfWin.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));
    await new Promise(r => setTimeout(r, 500));

    const pdfData = await pdfWin.webContents.printToPDF({
      landscape: true,
      pageSize: 'A3',
      printBackground: true,
      margins: { top: 0.2, bottom: 0.2, left: 0.2, right: 0.2 },
    });

    fs.writeFileSync(pdfPath, pdfData);
    console.log(`  PDF: ${baseName}.pdf`);
    pdfWin.close();
  } catch (pdfErr) {
    console.error(`  PDF failed: ${pdfErr.message}`);
  }

  return true;
}

app.whenReady().then(async () => {
  // Create main window with Vite dev server
  const win = new BrowserWindow({
    show: false,
    width: 1600,
    height: 1000,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: false,
    },
  });

  // Check if Vite dev server is running
  const VITE_URL = process.env.VITE_URL || 'http://localhost:3008';
  try {
    await win.loadURL(VITE_URL);
  } catch (err) {
    console.error('Vite dev server not running. Start it with: npm run dev');
    app.quit();
    return;
  }

  // Forward renderer console to main process
  win.webContents.on('console-message', (_event, _level, message) => {
    console.log(`  [renderer] ${message}`);
  });

  // Wait for app to initialize
  await new Promise(r => setTimeout(r, 2000));

  console.log('\nRendering all example schedules...\n');

  let success = 0;
  let failed = 0;

  for (const ifcFile of ifcFiles) {
    console.log(`Processing: ${ifcFile}`);
    const ok = await renderFile(win, ifcFile);
    if (ok) success++; else failed++;
  }

  console.log(`\nDone! ${success} succeeded, ${failed} failed`);
  console.log(`Output: ${OUTPUT_DIR}`);

  app.quit();
});
