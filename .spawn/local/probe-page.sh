#!/bin/bash
set -u
WORLD=/workspace/signal/world/signal-stage
TARGET="$1"
MODE="${2:-live}"
OUT=/tmp/verify/probe-$(date +%s)
mkdir -p "$OUT"
cd "$WORLD"
if [ "$MODE" = serve ]; then
  SNAPSHOT_ROOT=/workspace/signal PORT=4173 HOST=127.0.0.1 setsid nohup node .spawn/local/serve-local.mjs > "$OUT/server.out" 2>&1 < /dev/null &
  echo $! > "$OUT/server.pid"
  for i in $(seq 1 60); do curl -sf http://127.0.0.1:4173/__health > /dev/null && break; sleep 0.5; done
fi
setsid env DISPLAY=:1 /usr/bin/chromium --user-data-dir="$OUT/profile" --remote-debugging-port=9333 --host-resolver-rules="MAP * ~NOTFOUND, EXCLUDE localhost, EXCLUDE 127.0.0.1" --no-first-run --no-default-browser-check --enable-unsafe-webgpu --enable-features=Vulkan,WebGPU --use-angle=vulkan --use-vulkan=swiftshader --use-webgpu-adapter=swiftshader --enable-unsafe-swiftshader about:blank > "$OUT/browser.out" 2>&1 &
echo $! > "$OUT/browser.pid"
for i in $(seq 1 60); do curl -sf http://127.0.0.1:9333/json/version > "$OUT/version.json" && break; sleep 0.5; done
WS=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$OUT/version.json','utf8')).webSocketDebuggerUrl)")
ID=$(playwriter session new --direct "$WS" 2>&1 | grep -o 'Session [0-9]*' | awk '{print $2}')
PROBE="${PROBE:-.spawn/local/probe-page.js}"
sed -e "s|__TARGET__|$TARGET|" -e "s|__OUT__|$OUT|" -e "s|__KEEP__|${KEEP_PREBORN:-0}|" -e "s|__FORCE__|${FORCE_ROAD:-}|" -e "s|__SAMPLE__|${SAMPLE:-1}|" -e "s|__READ__|${READ:-1}|g" "$PROBE" > "$OUT/probe.js"
PLAYWRITER_EXEC_TIMEOUT=600000 timeout 630 playwriter -s "$ID" -e "$(cat "$OUT/probe.js")" > "$OUT/probe.out" 2>&1
echo "probe rc=$? session=$ID out=$OUT"
cut -c1-4000 "$OUT/probe.out"
kill -- -"$(cat $OUT/browser.pid)" 2>/dev/null
if [ "$MODE" = serve ]; then kill -- -"$(cat $OUT/server.pid)" 2>/dev/null; fi
sleep 2
echo "after: browser alive=$(kill -0 $(cat $OUT/browser.pid) 2>/dev/null && echo yes || echo no)"
