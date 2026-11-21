#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SITE=$1
: "${WITNESS_LATENCY_MS:=1100}"
export WITNESS_LATENCY_MS
[ -d "$SITE" ] || { echo "ABORT: site dir not found: $SITE"; exit 2; }
SITE=$(cd "$SITE" && pwd)
RUN=$(mktemp -d "$HERE/.browser-witness.XXXXXX")
REG=$RUN/registry
SNAP=$RUN/snapshot.txt
SELF=" "
PORT=""
CHROME=""

reg() { echo "$1 $2" >> "$REG"; }

alive() {
  local s
  s=$(ps -o stat= -p "$1" 2>/dev/null | tr -d ' ')
  case "$s" in ''|Z*) return 1 ;; esac
  return 0
}

ancestry() {
  local p=$$ s=" "
  while [ -n "$p" ] && [ "$p" -gt 1 ]; do
    s="$s$p "
    p=$(ps -o ppid= -p "$p" 2>/dev/null | tr -d ' ')
  done
  echo "$s"
}

free_port() {
  local p
  for p in $(shuf -i 20000-60000 -n 40); do
    ss -ltn | grep -q ":$p " || { echo "$p"; return 0; }
  done
  return 1
}

snapshot() { ps -eo pid=,ppid=,args= > "$SNAP"; }

descend() {
  local frontier="$*" all="" next p
  while [ -n "$frontier" ]; do
    all="$all $frontier"
    next=""
    for p in $frontier; do
      next="$next $(awk -v q="$p" '$2==q{print $1}' "$SNAP")"
    done
    frontier=$(echo $next)
  done
  echo $all
}

stop_pids() {
  local p i left
  for p in "$@"; do kill -TERM "$p" 2>/dev/null; done
  for i in $(seq 1 20); do
    left=""
    for p in "$@"; do alive "$p" && left="$left $p"; done
    [ -z "$left" ] && return 0
    sleep 0.5
  done
  for p in $left; do kill -KILL "$p" 2>/dev/null; done
  sleep 1
  return 0
}

teardown() {
  local round roots targets runs cands p RPORT
  for round in 1 2 3; do
    snapshot
    roots=$(awk '$1!="relay"{print $2}' "$REG")
    targets=$(descend $roots)
    runs=$(grep -F "$RUN" "$SNAP" | grep -v -F 'grep -F' | awk '{print $1}')
    cands=""
    for p in $targets $runs; do
      case "$SELF" in *" $p "*) ;; *) alive "$p" && cands="$cands $p" ;; esac
    done
    cands=$(echo $cands | tr ' ' '\n' | sort -un | tr '\n' ' ')
    [ -z "$(echo $cands)" ] && break
    echo "teardown round $round stop by pid:$cands"
    stop_pids $cands
  done
  for p in $(awk '$1=="relay"{print $2}' "$REG"); do
    alive "$p" || continue
    RPORT=$(ss -ltnp | grep "pid=$p," | awk '{print $4}' | awk -F: '{print $NF}')
    if playwriter session list 2>&1 | grep -q "No active sessions" && ! ss -tn state established | grep -q ":$RPORT "; then
      stop_pids "$p"
      echo "relay pid=$p stopped: owned by this run, no sessions, no clients"
    else
      echo "relay pid=$p kept: in use"
    fi
  done
}

run() {
  PORT=$(free_port) || return 1
  CHROME=$(free_port) || return 1
  while [ "$CHROME" = "$PORT" ]; do CHROME=$(free_port) || return 1; done
  : > "$REG"
  mkdir -p "$RUN/serve"
  ln -sfn "$SITE" "$RUN/serve/signal"
  bash "$HERE/proc-check.sh" before || { echo "ABORT: browser-witness processes present before the run"; return 2; }
  openssl req -x509 -newkey rsa:2048 -nodes -keyout "$RUN/key.pem" -out "$RUN/cert.pem" -days 1 -subj "/CN=anentrypoint.github.io" > /dev/null 2>&1 || { echo "ABORT: certificate"; return 1; }; setsid node "$HERE/browser-h2-server.cjs" "$PORT" "$RUN/serve" "$RUN/cert.pem" "$RUN/key.pem" > "$RUN/static-server.out" 2>&1 &
  reg static $!
  for i in $(seq 1 40); do curl -skf --resolve "anentrypoint.github.io:$PORT:127.0.0.1" "https://anentrypoint.github.io:$PORT/signal/" > /dev/null && break; sleep 0.5; done
  echo "static port=$PORT http=$(curl -sk --resolve "anentrypoint.github.io:$PORT:127.0.0.1" -o /dev/null -w %{http_code} "https://anentrypoint.github.io:$PORT/signal/")"
  setsid env DISPLAY=:1 /usr/bin/chromium --user-data-dir="$RUN/profile" --remote-debugging-port="$CHROME" --host-resolver-rules="MAP github.io 127.0.0.1, MAP *.github.io 127.0.0.1, MAP * ~NOTFOUND, EXCLUDE localhost, EXCLUDE 127.0.0.1" --ignore-certificate-errors --no-first-run --no-default-browser-check --enable-unsafe-webgpu --enable-features=Vulkan,WebGPU --use-angle=vulkan --use-vulkan=swiftshader --use-webgpu-adapter=swiftshader --enable-unsafe-swiftshader about:blank > "$RUN/browser.out" 2>&1 &
  reg browser $!
  for i in $(seq 1 60); do curl -sf "http://127.0.0.1:$CHROME/json/version" > "$RUN/version.json" && break; sleep 0.5; done
  WS=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$RUN/version.json','utf8')).webSocketDebuggerUrl)")
  PW0=$(pgrep -f playwriter-ws-server | tr '\n' ' ')
  for try in 1 2 3; do
    SESS=$(playwriter session new --direct "$WS" 2>&1)
    ID=$(echo "$SESS" | grep -o "Session [0-9]*" | awk '{print $2}')
    [ -n "$ID" ] && break
    sleep 3
  done
  for p in $(pgrep -f playwriter-ws-server); do
    case " $PW0 " in *" $p "*) ;; *) reg relay "$p" ;; esac
  done
  [ -z "$ID" ] && { echo "ABORT: no playwriter session: $(echo "$SESS" | head -c 400)"; return 1; }
  sed -e "s#__OUT__#$RUN#g" -e "s#__PORT__#$PORT#g" "$HERE/browser-trace.js" > "$RUN/trace.js"
  PLAYWRITER_EXEC_TIMEOUT=400000 timeout 420 playwriter -s "$ID" -e "$(cat "$RUN/trace.js")" > "$RUN/trace.out" 2>&1 &
  T=$!
  reg trace "$T"
  wait "$T"
  TRC=$?
  echo "trace rc=$TRC pid=$T"
  playwriter session delete "$ID" > /dev/null 2>&1
  WL=$(printenv WITNESS_LEAK)
  if [ "$WL" = 1 ]; then python3 -c "import time; time.sleep(900)" "$HERE/browser-witness-leak-$$" & LP=$!; sleep 0.5; echo "LEAK_PID=$LP"; fi
  python3 -I "$HERE/pixel-series.py" "$RUN" > "$RUN/pixel.json"
  node "$HERE/browser-result.cjs" "$RUN"
  ARC=$?
  echo "analysis rc=$ARC"
  [ "$TRC" -eq 0 ] && [ "$ARC" -eq 0 ]
}

SELF=$(ancestry)
run
RUNRC=$?
teardown
PIDS=$(awk '$1!="relay"{print $2}' "$REG")
bash "$HERE/proc-check.sh" after $PIDS
CHK=$?
[ "$(printenv WITNESS_KEEP_RUN)" = 1 ] || rm -rf "$RUN"
echo "run dir: $RUN"
if [ "$RUNRC" -eq 0 ] && [ "$CHK" -eq 0 ]; then echo "WITNESS passed"; exit 0; fi
echo "WITNESS failed run=$RUNRC check=$CHK"
exit 1
