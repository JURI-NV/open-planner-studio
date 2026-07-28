#!/usr/bin/env bash
set -uo pipefail
ROOT_REPO="$(cd "$(dirname "$0")/../.." && pwd)"
fail() { echo "XX FAIL: $1"; exit 1; }
pass() { echo "OK: $1"; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
git init -q "$TMP/main"
# Identiteit expliciet in de tijdelijke repo zetten: een CI-runner heeft geen
# globale user.name/user.email, en dan faalt `git commit` met "unable to
# auto-detect email address". Dat viel hier niet op omdat het script geen `-e`
# heeft — de commit mislukte stil en liet alleen een `fatal:` in de log achter.
git -C "$TMP/main" config user.email "dev-server-test@example.invalid"
git -C "$TMP/main" config user.name "dev-server test"
git -C "$TMP/main" commit -q --allow-empty -m init || fail "kon de basiscommit niet maken"
mkdir -p "$TMP/main/scripts"
cp "$ROOT_REPO"/scripts/dev-port.mjs "$ROOT_REPO"/scripts/dev-lock.mjs "$ROOT_REPO"/scripts/dev-server.mjs "$TMP/main/scripts/"

# Deel 1: --print-plan alloceert + claimt slot + print poort, zonder vite te spawnen
# (cd naar de worktree: dev-server.mjs leidt de root af uit process.cwd(), net als `npm run dev`)
( cd "$TMP/main" && node scripts/dev-server.mjs --print-plan ) >"$TMP/p1.txt" 2>&1 || fail "dev-server --print-plan gaf een fout: $(cat "$TMP/p1.txt")"
grep -q "worktree" "$TMP/p1.txt" || fail "dev-server --print-plan printte geen worktree/poort-plan"
pass "dev-server --print-plan werkt en kiest een poort"

# Deel 2: twee worktrees → twee VERSCHILLENDE poorten
git -C "$TMP/main" worktree add -q "$TMP/wt-a" -b wt-a
git -C "$TMP/main" worktree add -q "$TMP/wt-b" -b wt-b
for w in wt-a wt-b; do mkdir -p "$TMP/$w/scripts"; cp "$TMP/main/scripts/"*.mjs "$TMP/$w/scripts/"; done
PA=$( cd "$TMP/wt-a" && node scripts/dev-server.mjs --print-plan 2>&1 | grep -oE 'localhost:[0-9]+' | cut -d: -f2)
PB=$( cd "$TMP/wt-b" && node scripts/dev-server.mjs --print-plan 2>&1 | grep -oE 'localhost:[0-9]+' | cut -d: -f2)
[ -n "$PA" ] && [ -n "$PB" ] || fail "kon poorten niet uitlezen (A=$PA B=$PB)"
[ "$PA" != "$PB" ] || fail "twee worktrees kregen dezelfde poort ($PA)"
pass "twee worktrees → twee poorten (A=$PA, B=$PB)"

PA2=$( cd "$TMP/wt-a" && node scripts/dev-server.mjs --print-plan 2>&1 | grep -oE 'localhost:[0-9]+' | cut -d: -f2)
[ "$PA" = "$PA2" ] || fail "wt-a poort niet stabiel ($PA vs $PA2)"
pass "toewijzing is idempotent (wt-a blijft $PA)"

# Deel 3: dubbelstart-weigering (levend guard-slot → tweede claim gooit)
node -e '
import("'"$TMP"'/wt-a/scripts/dev-lock.mjs").then(async (m) => {
  const p = await import("'"$TMP"'/wt-a/scripts/dev-port.mjs");
  const root = p.worktreeRoot("'"$TMP"'/wt-a");
  const rel = m.acquireGuardLock(root, 3099);
  try { m.acquireGuardLock(root, 3099); console.log("GEEN-WEIGERING"); process.exit(2); }
  catch { console.log("WEIGERING-OK"); rel(); process.exit(0); }
});
' >"$TMP/dbl.txt" 2>&1
grep -q "WEIGERING-OK" "$TMP/dbl.txt" || fail "tweede bewaker werd niet geweigerd: $(cat "$TMP/dbl.txt")"
pass "dubbelstart in hetzelfde worktree wordt geweigerd"

# Deel 4: botsende stempels herstellen zichzelf (het echte pad: echte flock,
# echte `git worktree list`, echte launch.json). We forceren de situatie die in
# de praktijk optrad: twee worktrees met exact dezelfde opsDevPort.
node --input-type=module -e '
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
for (const p of process.argv.slice(1)) {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, JSON.stringify({ opsDevPort: 3105 }));
}
' "$TMP/wt-a/.claude/launch.json" "$TMP/wt-b/.claude/launch.json" || fail "kon de botsende stempels niet schrijven"
PC=$( cd "$TMP/wt-a" && node scripts/dev-server.mjs --print-plan 2>&1 | grep -oE 'localhost:[0-9]+' | cut -d: -f2)
PD=$( cd "$TMP/wt-b" && node scripts/dev-server.mjs --print-plan 2>&1 | grep -oE 'localhost:[0-9]+' | cut -d: -f2)
[ -n "$PC" ] && [ -n "$PD" ] || fail "kon poorten niet uitlezen na botsing (A=$PC B=$PD)"
[ "$PC" != "$PD" ] || fail "botsende stempels bleven botsen (beide $PC)"
pass "botsende stempels lossen zichzelf op (A=$PC, B=$PD)"

# Convergentie: geen ping-pong bij een volgende start
PC2=$( cd "$TMP/wt-a" && node scripts/dev-server.mjs --print-plan 2>&1 | grep -oE 'localhost:[0-9]+' | cut -d: -f2)
PD2=$( cd "$TMP/wt-b" && node scripts/dev-server.mjs --print-plan 2>&1 | grep -oE 'localhost:[0-9]+' | cut -d: -f2)
[ "$PC" = "$PC2" ] && [ "$PD" = "$PD2" ] || fail "poorten niet stabiel na herstel (A=$PC/$PC2 B=$PD/$PD2)"
pass "na herstel zijn de poorten stabiel (A=$PC, B=$PD)"

echo "TOTAAL: dev-server integratie deel 1 groen"
