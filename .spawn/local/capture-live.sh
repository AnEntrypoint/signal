#!/bin/bash
set -u
WORLD=/workspace/signal/world/signal-stage
OUT=/tmp/verify/live-run-$(date +%s)
mkdir -p "$OUT"
cd "$WORLD"
setsid env DISPLAY=:1 /usr/bin/chromium --user-data-dir="$OUT/profile" --remote-debugging-port=9333 --no-first-run --no-default-browser-check --enable-unsafe-webgpu --enable-features=Vulkan,WebGPU --use-angle=vulkan --use-vulkan=swiftshader --use-webgpu-adapter=swiftshader --enable-unsafe-swiftshader about:blank > "$OUT/browser.out" 2>&1 &
echo $! > "$OUT/browser.pid"
for i in $(seq 1 60); do curl -sf http://127.0.0.1:9333/json/version > "$OUT/version.json" && break; sleep 0.5; done
WS=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$OUT/version.json','utf8')).webSocketDebuggerUrl)")
ID=$(playwriter session new --direct "$WS" 2>&1 | grep -o 'Session [0-9]*' | awk '{print $2}')
echo "session=$ID browser pid=$(cat $OUT/browser.pid)"
PLAYWRITER_EXEC_TIMEOUT=600000 timeout 630 playwriter -s "$ID" -e "$(cat "$WORLD/.spawn/local/capture-live.js")" > "$OUT/capture.out" 2>&1
echo "capture rc=$?"
cut -c1-3000 "$OUT/capture.out"
kill -- -"$(cat $OUT/browser.pid)" 2>/dev/null
sleep 2
echo "after: browser alive=$(kill -0 $(cat $OUT/browser.pid) 2>/dev/null && echo yes || echo no)"
echo "OUT=$OUT"
