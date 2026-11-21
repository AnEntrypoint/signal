#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
. "$HERE/lib.sh"
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

teardown() {
  local round roots targets runs cands p RPORT
  for round in 1 2 3; do
    snapshot_to "$SNAP"
    roots=$(awk '$1!="relay"{print $2}' "$REG")
    targets=$(descend_in "$SNAP" $roots)
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
  proc_check before || { echo "ABORT: browser-witness processes present before the run"; return 2; }
  openssl req -x509 -newkey rsa:2048 -nodes -keyout "$RUN/key.pem" -out "$RUN/cert.pem" -days 1 -subj "/CN=anentrypoint.github.io" > /dev/null 2>&1 || { echo "ABORT: certificate"; return 1; }; setsid node "$HERE/browser-h2-server.cjs" "$PORT" "$RUN/serve" "$RUN/cert.pem" "$RUN/key.pem" > "$RUN/static-server.out" 2>&1 &
  reg static $!
  for i in $(seq 1 40); do curl -skf --resolve "anentrypoint.github.io:$PORT:127.0.0.1" "https://anentrypoint.github.io:$PORT/signal/" > /dev/null && break; sleep 0.5; done
  echo "static port=$PORT http=$(curl -sk --resolve "anentrypoint.github.io:$PORT:127.0.0.1" -o /dev/null -w %{http_code} "https://anentrypoint.github.io:$PORT/signal/")"
  setsid env DISPLAY=:1 /usr/bin/chromium --user-data-dir="$RUN/profile" --remote-debugging-port="$CHROME" --host-resolver-rules="MAP github.io 127.0.0.1, MAP *.github.io 127.0.0.1, MAP * ~NOTFOUND, EXCLUDE localhost, EXCLUDE 127.0.0.1" --ignore-certificate-errors "${CHROME_BASE[@]}" about:blank > "$RUN/browser.out" 2>&1 &
  reg browser $!
  wait_devtools "$CHROME" "$RUN/version.json"
  WS=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$RUN/version.json','utf8')).webSocketDebuggerUrl)")
  PW0=$(pgrep -f playwriter-ws-server | tr '\n' ' ')
  open_session "$WS"
  ID=$SESSION_ID
  for p in $(pgrep -f playwriter-ws-server); do
    case " $PW0 " in *" $p "*) ;; *) reg relay "$p" ;; esac
  done
  [ -z "$ID" ] && { echo "ABORT: no playwriter session: $(echo "$SESSION_OUT" | head -c 400)"; return 1; }
  sed -e "s#__OUT__#$RUN#g" -e "s#__PORT__#$PORT#g" -e "s#__HERE__#$HERE#g" "$HERE/browser-trace.js" > "$RUN/trace.js"
  PLAYWRITER_EXEC_TIMEOUT=400000 timeout 420 playwriter -s "$ID" -e "$(cat "$RUN/trace.js")" > "$RUN/trace.out" 2>&1 &
  T=$!
  reg trace "$T"
  wait "$T"
  TRC=$?
  echo "trace rc=$TRC pid=$T"
  close_session "$ID"
  WL=$(printenv WITNESS_LEAK)
  if [ "$WL" = 1 ]; then python3 -c "import time; time.sleep(900)" "$HERE/browser-witness-leak-$$" & LP=$!; sleep 0.5; echo "LEAK_PID=$LP"; fi
  python3 -I "$HERE/pixel.py" series "$RUN" > "$RUN/pixel.json"
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
proc_check after $PIDS
CHK=$?
[ "$(printenv WITNESS_KEEP_RUN)" = 1 ] || rm -rf "$RUN"
echo "run dir: $RUN"
if [ "$RUNRC" -eq 0 ] && [ "$CHK" -eq 0 ]; then echo "WITNESS passed"; exit 0; fi
echo "WITNESS failed run=$RUNRC check=$CHK"
exit 1
