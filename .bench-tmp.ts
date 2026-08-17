import './tests/planning/domStub';
import { useAppStore } from '@/state/appStore';
import { withTransaction } from '@/state/batchTransaction';
import { computeResourceLoad } from '@/engine/scheduler/ResourceLoad';
import { readIFC } from '@/services/ifc/ifcReader';
import { buildWriteIFCInput } from '@/state/ifcSaveInput';

const S = () => useAppStore.getState();
const ms = (l: string, n: number, f: () => void) => { const a = process.hrtime.bigint(); for (let i=0;i<n;i++) f(); console.log(`  ${l.padEnd(46)} ${(Number(process.hrtime.bigint()-a)/1e6/n).toFixed(0)} ms`); };
const N = Number(process.argv[2] || 5000);
S().newProject();
const ids: string[] = [];
withTransaction(() => { for (let i = 0; i < N; i++) ids.push(S().addTask({ name: `Taak ${i}` })); });
const resIds: string[] = [];
for (let i = 0; i < 80; i++) resIds.push(S().addResource({ name: `R${i}`, type: 'LABOR', description: '', maxUnits: 2 }));
withTransaction(() => { for (let i = 1; i < N; i++) S().addSequence({ predecessorId: ids[i-1], successorId: ids[i], type: 'FINISH_START', lagDays: 0 }); });
withTransaction(() => { for (let i = 0; i < N; i++) S().assignResource(ids[i], resIds[i % 80], 1); });
S().runCPM();

const st = S();
const session = new (await import('node:inspector/promises')).Session();
session.connect(); await session.post('Profiler.enable'); await session.post('Profiler.start');
const a = process.hrtime.bigint();
for (let i = 0; i < 20; i++) computeResourceLoad(st.resources, st.assignments, st.tasks, st.calendar, st.calendars);
console.log('computeResourceLoad:', (Number(process.hrtime.bigint() - a) / 1e6 / 20).toFixed(1), 'ms');
const { profile } = await session.post('Profiler.stop');
(await import('node:fs')).writeFileSync(process.argv[3], JSON.stringify(profile));
