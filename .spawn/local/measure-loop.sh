#!/bin/bash
# Times the offline checks and the local run from a cold start, one step at a time.
# Usage: measure-loop.sh <out-dir>. Each step prints its wall time and the host load before and after.
set -u
ROOT=/workspace/signal
WORLD=$ROOT/world/signal-stage
OUT=${1:?out dir}
PW=/config/.gmnew/versions/e59d2c1-1/pw
PORT=9333
WITNESS=${WITNESS:-$WORLD/.spawn/local/witness-headed.js}
mkdir -p "$OUT"
load() { cut -d' ' -f1-3 /proc/loadavg; }
hogs() { ps -eo pcpu,args --sort=-pcpu | grep -v "ps -eo" | sed -n "1,3p" | cut -c1-60 | tr "\n" "|"; }
step() {
  local name=$1; shift
  local l0; l0=$(load)
  local h0; h0=$(hogs)
  local t0; t0=$(date +%s.%N)
  "$@" > "$OUT/$name.log" 2>&1
  local rc=$?
  local t1; t1=$(date +%s.%N)
  printf '%-22s rc=%s wall=%6.2fs load_before=[%s] load_after=[%s] hogs_before=[%s]\n' "$name" "$rc" "$(echo "$t1 - $t0" | bc)" "$l0" "$(load)" "$h0" | tee -a "$OUT/summary.txt"
}
stop_server() {
  local pid; pid=$(ss -ltnp 2>/dev/null | grep '127.0.0.1:4173' | grep -o 'pid=[0-9]*' | head -1 | cut -d= -f2)
  if [ -n "$pid" ]; then kill "$pid"; for _ in $(seq 1 100); do ss -ltn | grep -q '127.0.0.1:4173' || break; sleep 0.05; done; fi
}
start_server() {
  cd "$WORLD" && SNAPSHOT_ROOT=$ROOT PORT=4173 HOST=127.0.0.1 setsid nohup node .spawn/local/serve-local.mjs > "$OUT/server.out" 2>&1 < /dev/null &
  for _ in $(seq 1 600); do curl -sf http://127.0.0.1:4173/__health > "$OUT/health.json" && return 0; sleep 0.05; done
  return 1
}
start_browser() {
  setsid env DISPLAY=:1 /usr/bin/chromium --user-data-dir="$OUT/profile" --remote-debugging-port=$PORT --no-first-run --no-default-browser-check about:blank > "$OUT/browser-start.out" 2>&1 &
  echo $! > "$OUT/browser.pid"
  for _ in $(seq 1 600); do
    local ws; ws=$(curl -sf http://127.0.0.1:$PORT/json/version | grep -o '"webSocketDebuggerUrl": *"[^"]*"' | cut -d'"' -f4)
    if [ -n "$ws" ]; then echo "$ws" > "$OUT/browser.key"; return 0; fi
    sleep 0.05
  done
  return 1
}
witness() {
  cd "$PW" || return 1
  local id; id=$(node node_modules/.bin/playwriter session new --direct "$(cat "$OUT/browser.key")" 2>&1 | grep -o 'Session [0-9]*' | awk '{print $2}')
  PLAYWRITER_EXEC_TIMEOUT=300000 timeout 330 node node_modules/.bin/playwriter -s "$id" -e "$(cat "$WITNESS")"
}
stop_browser() {
  local pid; pid=$(cat "$OUT/browser.pid" 2>/dev/null)
  [ -n "$pid" ] && kill -- -"$pid" 2>/dev/null
  for _ in $(seq 1 100); do pgrep -g "$pid" > /dev/null 2>&1 || break; sleep 0.05; done
  echo "browser group $pid remaining: $(pgrep -g "$pid" 2>/dev/null | wc -l)"
}
stop_server; step stop-old-server true
step world-check node "$ROOT/scripts/check-world.mjs"
step snapshot-check python3 "$ROOT/verify.py"
step server-start start_server
step headed-browser-start start_browser
step headed-witness witness
step headed-browser-stop stop_browser
stop_server; step stop-server true
