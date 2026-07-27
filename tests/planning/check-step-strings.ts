// STEP-string-veiligheid (bevinding K2) — headless tegen de ECHTE store + echte writeIFC/readIFC.
//
// Waarom deze batterij bestaat: de STEP-parser was string-ONVEILIG in drie lagen, en de writer
// schreef een header die niet eens syntactisch geldig was.
//
//   1. Sectie-split      `content.split('DATA;')[1]?.split('ENDSEC;')[0]` — een taaknaam met
//                        `ENDSEC;` kapte de datasectie af; de taken erná verdampten stil.
//   2. Commentaar-strip  een globale `/*…*/`-verwijdering vrat `/* … */` ook BINNEN een string,
//                        dus `Sloop /* let op */ klaar` werd `Sloop  klaar`.
//   3. Entity-regex      non-greedy tot de EERSTE `);` — een naam of notitie met `);` kapte de
//                        entiteit middenin af, waarna alle slots erná (duur! wbsCode!) wegvielen.
//   4. Header            `FILE_NAME('${project.name}.ifc', …)` interpoleerde naam/auteur/bedrijf
//                        RAUW. `Van 't Hof BV` levert syntactisch ongeldig STEP op, en `DATA;` in
//                        de projectnaam zet dat token vóór de echte sectiegrens ⇒ nul entiteiten.
//                        Onze eigen reader raakt de header nooit aan — daarom viel dit nooit op.
//
// `);` en `(…)` zijn normale Nederlandse plantekst ("Fase 1 (ruwbouw); fase 2"), en `writeIFC` is
// óók de auto-save. De ergste uitkomst is niet dataverlies maar een STILLE PLANNINGSWIJZIGING: een
// taak met duur 7 kwam terug met duur 5.
//
// De batterij draait de ECHTE keten — store → buildWriteIFCInput → writeIFC → readIFC — en
// vergelijkt veld voor veld. Draait via run.sh. Exit 0 = alles groen.
import { useAppStore } from '@/state/appStore';
import { writeIFC } from '@/services/ifc/ifcWriter';
import { readIFC } from '@/services/ifc/ifcReader';
import { buildWriteIFCInput } from '@/state/ifcSaveInput';
import type { ImportResult } from '@/services/importTypes';

const S = () => useAppStore.getState();
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

// ── Onafhankelijke STEP-header-lezer ─────────────────────────────────────────
// BEWUST niet de reader-helpers hergebruiken: de bewering is "het bestand is geldig STEP", en die
// mag niet worden bewezen met dezelfde code die hem zou moeten lezen. Dit is een minimale,
// zelfstandige implementatie van de STEP-quoteregels (`''` = ontsnapte apostrof).

/** Lees de argumenten van een STEP-instructie `NAAM(...)`; `null` = syntactisch stuk
 *  (niet-afgesloten string, niet-sluitende haak, geen `;` erachter). */
function readStepCall(text: string, name: string): string[] | null {
  const at = text.indexOf(`${name}(`);
  if (at < 0) return null;
  let i = at + name.length + 1;
  let depth = 1;
  let current = '';
  const args: string[] = [];
  while (i < text.length) {
    const ch = text[i];
    if (ch === "'") {
      // Stringliteral in zijn geheel overnemen; `''` binnenin sluit hem NIET af.
      let j = i + 1;
      let closed = false;
      while (j < text.length) {
        if (text[j] === "'") {
          if (text[j + 1] === "'") { j += 2; continue; }
          closed = true; break;
        }
        j++;
      }
      if (!closed) return null; // niet-afgesloten string ⇒ ongeldig
      current += text.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    if (ch === '(') { depth++; current += ch; i++; continue; }
    if (ch === ')') {
      depth--;
      if (depth === 0) { args.push(current); i++; break; }
      current += ch; i++; continue;
    }
    if (ch === ',' && depth === 1) { args.push(current); current = ''; i++; continue; }
    current += ch; i++;
  }
  if (depth !== 0) return null; // haak nooit gesloten ⇒ ongeldig
  while (i < text.length && /\s/.test(text[i])) i++;
  if (text[i] !== ';') return null; // instructie niet afgesloten ⇒ ongeldig
  return args;
}

/** `'Van ''t Hof BV'` → `Van 't Hof BV`. Een lijst-argument `('x')` wordt eerst uitgepakt. */
function unquote(arg: string | undefined): string | null {
  if (arg === undefined) return null;
  let s = arg.trim();
  if (s.startsWith('(') && s.endsWith(')')) s = s.slice(1, -1).trim();
  if (!s.startsWith("'") || !s.endsWith("'") || s.length < 2) return null;
  return s.slice(1, -1).replace(/''/g, "'");
}

// ── Gedeelde opzet-helpers ───────────────────────────────────────────────────
const setDur = (id: string, d: number) => {
  const t = S().tasks.find(x => x.id === id)!;
  S().updateTask(id, { time: { ...t.time, scheduleDuration: d } });
};
/** Exact het auto-save-/opslaan-pad: store → buildWriteIFCInput → writeIFC → readIFC. */
const save = (): string => writeIFC(buildWriteIFCInput(S()));
const roundTrip = (): ImportResult => readIFC(save());

// ════════════════════════════════════════════════════════════════════════════
//  1. Taaknaam met `);` — naam, DUUR en wbsCode moeten overleven
// ════════════════════════════════════════════════════════════════════════════
// De duur is hier het gevaarlijkste veld: de entity-regex kapte de IFCTASK af bij de eerste `);`
// in de naam, waardoor de TaskTime-ref wegviel en de reader terugviel op de default-duur 5.
const NAAM_HAAK = 'Levering (beton); wk 12';
S().newProject();
S().setProject({ name: 'K2-haakjes', startDate: '2031-04-07' });
const t1 = S().addTask({ name: NAAM_HAAK });
setDur(t1, 7);
S().updateTask(t1, { wbsCode: '1.4' });
S().runCPM();
const t1Store = S().tasks.find(t => t.id === t1)!;
eq('1a opzet: de store draagt de naam met `);`', t1Store.name, NAAM_HAAK);
eq('1b opzet: de store draagt duur 7', t1Store.time.scheduleDuration, 7);
eq('1c opzet: de store draagt wbsCode', t1Store.wbsCode, '1.4');

const rt1 = roundTrip();
eq('1d round-trip: precies één taak terug', rt1.tasks.length, 1);
eq('1e round-trip: taaknaam met `);` overleeft', rt1.tasks[0]?.name, NAAM_HAAK);
eq('1f round-trip: DUUR overleeft (stille planningswijziging!)', rt1.tasks[0]?.time.scheduleDuration, 7);
eq('1g round-trip: wbsCode overleeft', rt1.tasks[0]?.wbsCode, '1.4');

// ════════════════════════════════════════════════════════════════════════════
//  2. Taaknaam met `/* … */` — de commentaarstrip mag niet in een string vreten
// ════════════════════════════════════════════════════════════════════════════
const NAAM_COMMENT = 'Sloop /* let op */ klaar';
S().newProject();
S().setProject({ name: 'K2-commentaar', startDate: '2031-04-07' });
const t2 = S().addTask({ name: NAAM_COMMENT });
setDur(t2, 4);
S().runCPM();
const rt2 = roundTrip();
eq('2a round-trip: precies één taak terug', rt2.tasks.length, 1);
eq('2b round-trip: taaknaam met `/* */` blijft ongeschonden', rt2.tasks[0]?.name, NAAM_COMMENT);
eq('2c round-trip: duur overleeft', rt2.tasks[0]?.time.scheduleDuration, 4);

// ════════════════════════════════════════════════════════════════════════════
//  3. Taaknaam met `ENDSEC;` — het AANTAL taken moet kloppen
// ════════════════════════════════════════════════════════════════════════════
// De sectie-split kapte de datasectie af op het eerste `ENDSEC;`. Van tien taken kwamen er drie
// terug — geen leeg bestand (dat zou opvallen), maar een derde van de planning.
const NAAM_ENDSEC = 'Sloop ENDSEC; hergebruik';
S().newProject();
S().setProject({ name: 'K2-endsec', startDate: '2031-04-07' });
const taak3Ids: string[] = [];
for (let i = 1; i <= 10; i++) {
  taak3Ids.push(S().addTask({ name: i === 4 ? NAAM_ENDSEC : `Taak ${i}` }));
}
for (const id of taak3Ids) setDur(id, 3);
S().runCPM();
eq('3a opzet: tien taken in de store', S().tasks.length, 10);
const rt3 = roundTrip();
eq('3b round-trip: alle tien de taken komen terug', rt3.tasks.length, 10);
eq('3c round-trip: de taak met `ENDSEC;` draagt zijn eigen naam',
  rt3.tasks.map(t => t.name).filter(n => n === NAAM_ENDSEC).length, 1);
eq('3d round-trip: de taken NÁ de `ENDSEC;`-taak overleven',
  rt3.tasks.map(t => t.name).filter(n => /^Taak (5|6|7|8|9|10)$/.test(n)).length, 6);

// ════════════════════════════════════════════════════════════════════════════
//  4. Projectnaam met `ENDSEC;` respectievelijk `DATA;`
// ════════════════════════════════════════════════════════════════════════════
// De projectnaam staat ZOWEL in de header (rauw geïnterpoleerd) als in IFCPROJECT/IFCWORKPLAN.
// `DATA;` in de header zet de sectiegrens vóór de echte ⇒ nul entiteiten, alles weg.
for (const [label, projNaam] of [['4-endsec', 'Renovatie ENDSEC; fase 2'], ['4-data', 'Renovatie DATA; fase 2']] as const) {
  S().newProject();
  S().setProject({ name: projNaam, startDate: '2031-04-07' });
  const a = S().addTask({ name: 'Fundering' });
  const b = S().addTask({ name: 'Ruwbouw' });
  setDur(a, 5); setDur(b, 6);
  S().addSequence({ predecessorId: a, successorId: b, type: 'FINISH_START', lagDays: 0 });
  S().runCPM();
  const ifc = save();
  const rt = roundTrip();
  eq(`${label}a round-trip: beide taken komen terug`, rt.tasks.length, 2);
  eq(`${label}b round-trip: projectnaam overleeft`, rt.project.name, projNaam);
  eq(`${label}c round-trip: de tweede taak houdt zijn duur`,
    rt.tasks.find(t => t.name === 'Ruwbouw')?.time.scheduleDuration, 6);
  const args = readStepCall(ifc, 'FILE_NAME');
  truthy(`${label}d header: FILE_NAME is syntactisch geldig`, args !== null);
  eq(`${label}e header: FILE_NAME draagt de projectnaam als ÉÉN string`,
    unquote(args?.[0]), `${projNaam}.ifc`);
}

// ════════════════════════════════════════════════════════════════════════════
//  5. Apostrof in projectnaam / auteur / bedrijf
// ════════════════════════════════════════════════════════════════════════════
// `FILE_NAME('O'Hara Tower.ifc', …)` is al syntactisch ongeldig STEP — Synchro of BlenderBIM hoeft
// zo'n bestand niet te accepteren. De fix is NIET `'${ifcStr(x)}.ifc'` (dat levert `''O'Hara'.ifc'`,
// erger dan nu) maar `ifcStr(x + '.ifc')`.
const NAAM_APOSTROF = "O'Hara Tower";
const BEDRIJF_APOSTROF = "Van 't Hof BV";
const AUTEUR_APOSTROF = "Jan d'Hondt";
S().newProject();
S().setProject({
  name: NAAM_APOSTROF, author: AUTEUR_APOSTROF, company: BEDRIJF_APOSTROF, startDate: '2031-04-07',
});
const t5 = S().addTask({ name: "Steiger d'Artagnan plaatsen" });
setDur(t5, 2);
S().runCPM();
const ifc5 = save();
const rt5 = roundTrip();
eq('5a round-trip: projectnaam met apostrof overleeft', rt5.project.name, NAAM_APOSTROF);
eq('5b round-trip: auteur met apostrof overleeft', rt5.project.author, AUTEUR_APOSTROF);
eq('5c round-trip: bedrijf met apostrof overleeft', rt5.project.company, BEDRIJF_APOSTROF);
eq('5d round-trip: taaknaam met apostrof overleeft', rt5.tasks[0]?.name, "Steiger d'Artagnan plaatsen");

const args5 = readStepCall(ifc5, 'FILE_NAME');
truthy('5e header: FILE_NAME is syntactisch geldig STEP', args5 !== null);
eq('5f header: FILE_NAME telt zeven argumenten', args5?.length, 7);
eq('5g header: bestandsnaam-argument is één correct ontsnapte string',
  unquote(args5?.[0]), `${NAAM_APOSTROF}.ifc`);
eq('5h header: auteur-argument is één correct ontsnapte string',
  unquote(args5?.[2]), AUTEUR_APOSTROF);
eq('5i header: bedrijf-argument is één correct ontsnapte string',
  unquote(args5?.[3]), BEDRIJF_APOSTROF);

// ════════════════════════════════════════════════════════════════════════════
//  6. Notitie met `);`
// ════════════════════════════════════════════════════════════════════════════
// Notities gaan als JSON-blob door een IFCTEXT-property. `);` in de tekst kapte de
// IFCPROPERTYSINGLEVALUE af ⇒ `notes: undefined`, stil totaalverlies van het veld.
const NOTITIE = 'Hijskraan (2 stuks); vrijdag afmelden';
S().newProject();
S().setProject({ name: 'K2-notities', startDate: '2031-04-07' });
const t6 = S().addTask({ name: 'Hijswerk' });
setDur(t6, 3);
S().updateTask(t6, { notes: [{ id: 'n1', text: NOTITIE, done: false }] });
S().runCPM();
eq('6a opzet: de store draagt de notitie', S().tasks.find(t => t.id === t6)?.notes?.[0]?.text, NOTITIE);
const rt6 = roundTrip();
eq('6b round-trip: de notitie bestaat nog', rt6.tasks[0]?.notes?.length, 1);
eq('6c round-trip: de notitietekst met `);` overleeft', rt6.tasks[0]?.notes?.[0]?.text, NOTITIE);
eq('6d round-trip: taaknaam en duur overleven ernaast', rt6.tasks[0]?.time.scheduleDuration, 3);

// ════════════════════════════════════════════════════════════════════════════
//  7. Controlecase — zonder speciale tekens, gaat vandaag al goed
// ════════════════════════════════════════════════════════════════════════════
// Zonder deze case zou een regressie in de GEWONE weg (de fix die te veel wegneemt) onopgemerkt
// blijven: alle bovenstaande cases zouden dan nog steeds groen kunnen zijn.
S().newProject();
S().setProject({ name: 'Kantoorpand Noord', author: 'A. de Wit', company: 'OpenAEC', startDate: '2031-04-07' });
const c1 = S().addTask({ name: 'Beton besteld wk 12' });
const c2 = S().addTask({ name: 'Wapening vlechten' });
setDur(c1, 5); setDur(c2, 8);
S().updateTask(c1, { wbsCode: '2.1', description: 'Levering via depot' });
S().addSequence({ predecessorId: c1, successorId: c2, type: 'FINISH_START', lagDays: 2 });
S().runCPM();
const ifc7 = save();
const rt7 = roundTrip();
eq('7a controle: beide taken komen terug', rt7.tasks.length, 2);
eq('7b controle: eerste taaknaam', rt7.tasks[0]?.name, 'Beton besteld wk 12');
eq('7c controle: eerste duur', rt7.tasks[0]?.time.scheduleDuration, 5);
eq('7d controle: tweede duur', rt7.tasks[1]?.time.scheduleDuration, 8);
eq('7e controle: wbsCode', rt7.tasks[0]?.wbsCode, '2.1');
eq('7f controle: omschrijving', rt7.tasks[0]?.description, 'Levering via depot');
eq('7g controle: relatie met lag overleeft', rt7.sequences.length, 1);
eq('7h controle: lag-waarde', rt7.sequences[0]?.lagDays, 2);
eq('7i controle: projectnaam', rt7.project.name, 'Kantoorpand Noord');
eq('7j controle: auteur', rt7.project.author, 'A. de Wit');
eq('7k controle: bedrijf', rt7.project.company, 'OpenAEC');
const args7 = readStepCall(ifc7, 'FILE_NAME');
truthy('7l controle: header is syntactisch geldig', args7 !== null);
eq('7m controle: header draagt de bestandsnaam', unquote(args7?.[0]), 'Kantoorpand Noord.ifc');
eq('7n controle: header draagt de auteur', unquote(args7?.[2]), 'A. de Wit');
eq('7o controle: header draagt het bedrijf', unquote(args7?.[3]), 'OpenAEC');

// ════════════════════════════════════════════════════════════════════════════
//  8. ECHT commentaar moet nog steeds gestript worden — en mag de sectiegrens niet verzetten
// ════════════════════════════════════════════════════════════════════════════
// Case 2 bewijst dat de strip niet meer in een string vreet; deze bewijst de andere kant, die de
// round-trip niet kan dekken (onze writer schrijft zelf nooit commentaar). Handgeschreven STEP,
// rechtstreeks door `readIFC` — met commentaar TUSSEN twee argumenten, en met `DATA;`/`ENDSEC;`
// BINNEN het commentaar: die mogen de sectiegrenzen niet verzetten (tegen de oude code leverde dit
// bestand nul entiteiten op).
const HANDGESCHREVEN = [
  'ISO-10303-21;',
  'HEADER;',
  "FILE_NAME('X.ifc','2031-01-01T07:00:00',('A'),('B'),'x','y','');",
  'ENDSEC;',
  'DATA;',
  '/* commentaar met DATA; en ENDSEC; erin, tussen de entiteiten */',
  "#1=IFCPROJECT('g1',$,'Handgeschreven',$,$,$,$,$,$);",
  "#2=IFCTASK('g2',$,/* commentaar tussen args */'Taak A','omschrijving',$,'1.1',$,$,$,.F.,$,$,.CONSTRUCTION.);",
  "#3=IFCTASK('g3',$,'Taak B',$,$,$,$,$,$,.F.,$,$,.CONSTRUCTION.);",
  'ENDSEC;',
  'END-ISO-10303-21;',
].join('\n');
const rt8 = readIFC(HANDGESCHREVEN);
eq('8a handgeschreven: projectnaam gelezen', rt8.project.name, 'Handgeschreven');
eq('8b handgeschreven: beide taken gelezen', rt8.tasks.map(t => t.name), ['Taak A', 'Taak B']);
eq('8c handgeschreven: commentaar tussen args weggestript, omschrijving intact',
  rt8.tasks[0]?.description, 'omschrijving');
eq('8d handgeschreven: wbsCode intact', rt8.tasks[0]?.wbsCode, '1.1');

// ── Uitslag ──────────────────────────────────────────────────────────────────
if (diffs.length === 0) {
  console.log(`OK  step-strings-check: alle checks groen (${checks})`);
  process.exit(0);
} else {
  console.log(`XX  step-strings-check: ${diffs.length} afwijking(en) van ${checks}`);
  for (const d of diffs) console.log(`   - ${d}`);
  process.exit(1);
}
