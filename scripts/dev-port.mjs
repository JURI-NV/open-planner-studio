// scripts/dev-port.mjs
import { readFileSync, realpathSync, writeFileSync, renameSync, mkdirSync } from 'node:fs';
import { basename, join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:net';
import { withAllocLock } from './dev-lock.mjs';

export const MIN_PORT = 3007;
export const MAX_PORT = 3106;

/**
 * Laagste poort in [MIN_PORT, MAX_PORT] die noch geclaimd noch gebonden is.
 * Puur: `claimed` is een Set<number>, `isBound` een predicaat (port) => boolean.
 */
export function chooseFreePort(claimed, isBound) {
  for (let port = MIN_PORT; port <= MAX_PORT; port++) {
    if (!claimed.has(port) && !isBound(port)) return port;
  }
  throw new Error(`Geen vrije dev-poort in ${MIN_PORT}-${MAX_PORT}`);
}

/** De opsDevPort-markering uit <root>/.claude/launch.json, of null. Gooit nooit. */
export function readRecordedPort(root, readFile = readFileSync) {
  if (!root) return null;
  try {
    const json = JSON.parse(readFile(join(root, '.claude', 'launch.json'), 'utf8'));
    const p = json?.opsDevPort;
    return Number.isInteger(p) && p >= MIN_PORT && p <= MAX_PORT ? p : null;
  } catch {
    return null;
  }
}

/** Absolute, symlink-resolved worktree-root, of null buiten een git-worktree. */
export function worktreeRoot(cwd = process.cwd()) {
  try {
    const top = execFileSync('git', ['rev-parse', '--show-toplevel'], {
      cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return top ? realpathSync(top) : null;
  } catch {
    return null;
  }
}

export function worktreeSlug(root) {
  return root ? basename(root) : 'unknown';
}

/** Resolvet true als `port` op 127.0.0.1 gebonden kan worden. */
export function isPortFree(port) {
  return new Promise((resolve) => {
    const srv = createServer();
    srv.once('error', () => resolve(false));
    srv.once('listening', () => srv.close(() => resolve(true)));
    srv.listen(port, '127.0.0.1');
  });
}

function defaultLaunchJson() {
  return {
    version: '0.0.1',
    configurations: [
      { name: 'dev', runtimeExecutable: 'npm', runtimeArgs: ['run', 'dev'], port: MIN_PORT },
      { name: 'preview', runtimeExecutable: 'npm', runtimeArgs: ['run', 'preview'], port: 4173 },
    ],
  };
}

/** Schrijf opsDevPort (bron van waarheid) + configurations[dev].port (voor preview_start), atomair. */
export function stampLaunchJson(root, port) {
  const file = join(root, '.claude', 'launch.json');
  let json;
  try { json = JSON.parse(readFileSync(file, 'utf8')); }
  catch { json = defaultLaunchJson(); }
  if (!json || typeof json !== 'object' || Array.isArray(json)) json = defaultLaunchJson();
  json.opsDevPort = port;
  json.configurations = Array.isArray(json.configurations) ? json.configurations : [];
  const dev = json.configurations.find((c) => c && c.name === 'dev');
  if (dev) dev.port = port;
  else json.configurations.unshift({ name: 'dev', runtimeExecutable: 'npm', runtimeArgs: ['run', 'dev'], port });
  mkdirSync(dirname(file), { recursive: true });
  const tmp = `${file}.tmp-${process.pid}`;
  writeFileSync(tmp, `${JSON.stringify(json, null, 2)}\n`);
  renameSync(tmp, file);
}

/** Pad naar zijn symlink-vrije vorm, of ongewijzigd als dat niet kan (weg/geen rechten). */
function resolvedPath(p) {
  try { return realpathSync(p); } catch { return p; }
}

/** Wijzen twee worktree-paden naar dezelfde map? `git worktree list` is niet realpath-genormaliseerd. */
function isSameRoot(a, b) {
  return a === b || resolvedPath(a) === resolvedPath(b);
}

function listWorktreePaths(root) {
  const out = execFileSync('git', ['worktree', 'list', '--porcelain'], {
    cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
  });
  return out.split('\n')
    .filter((l) => l.startsWith('worktree '))
    .map((l) => l.slice('worktree '.length).trim());
}

/**
 * Wijst dit worktree één keer een unieke poort toe en legt 'm vast. Idempotent.
 *
 * Een reeds gestempelde poort wordt **gevalideerd**, niet blind vertrouwd: staat
 * exact dezelfde poort óók in de `launch.json` van een ánder worktree, dan geeft
 * de aanroeper toe — hij zoekt een verse vrije poort en stempelt die; de ander
 * behoudt zijn stempel. Zo lost een dubbele stempel zichzelf in één start op
 * (en niet in een ping-pong: de toegevende partij ziet binnen dezelfde flock de
 * al-bijgewerkte stempels van de anderen).
 *
 * Het herstelsignaal is bewust **configuratie**-niveau (twee worktrees met
 * dezelfde stempel) en NIET runtime-niveau (de poort is op dit moment gebonden).
 * Onze eigen draaiende dev-server bindt namelijk juist onze eigen poort — en
 * `allocatePort` draait in `tauri-dev.mjs` vóór `acquireGuardLock` — dus
 * herstellen op "bezet" zou de poort van een volstrekt normaal draaiend worktree
 * laten verspringen. Bezetting mag alleen meewegen bij het kiezen van een
 * nieuwe poort, nooit bij het afkeuren van de eigen bestaande stempel.
 *
 * deps injecteerbaar voor tests: { recorded, listPaths, portFree, stamp, lock }.
 */
export async function allocatePort(root, deps = {}) {
  const {
    recorded = readRecordedPort,
    listPaths = listWorktreePaths,
    portFree = isPortFree,
    stamp = stampLaunchJson,
    lock = withAllocLock,
  } = deps;

  // Álles binnen de flock, inclusief de validatie van de bestaande stempel: zou
  // de controle erbuiten vallen, dan kunnen twee worktrees elkaars botsing
  // tegelijk "oplossen" en opnieuw op dezelfde poort landen — precies de race
  // die dit repareert.
  return lock(root, async () => {
    const mine = recorded(root);

    // Poorten die door de ÁNDERE worktrees zijn vastgelegd (onszelf overslaan,
    // anders zou onze eigen stempel als botsing tellen).
    const claimed = new Set();
    for (const p of listPaths(root)) {
      if (isSameRoot(p, root)) continue;
      const port = recorded(p);
      if (port != null) claimed.add(port);
    }

    // Onze stempel is uniek → ongemoeid laten: zelfde poort terug, geen nieuwe stempel.
    if (mine != null && !claimed.has(mine)) return mine;

    const bound = new Set();
    for (let p = MIN_PORT; p <= MAX_PORT; p++) {
      if (!claimed.has(p) && !(await portFree(p))) bound.add(p);
    }
    let port;
    try {
      port = chooseFreePort(claimed, (p) => bound.has(p));
    } catch {
      throw new Error(
        `Geen vrije dev-poort in ${MIN_PORT}-${MAX_PORT} voor worktree "${worktreeSlug(root)}"`
        + ` — ${claimed.size} poort(en) geclaimd door andere worktrees, ${bound.size} in gebruik.`
        + ' Sluit een dev-server af of verruim het bereik in scripts/dev-port.mjs.',
      );
    }
    stamp(root, port);
    return port;
  });
}
