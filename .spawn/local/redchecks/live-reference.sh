#!/usr/bin/env bash
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$1
CPORT=$2
LIVE=$LIVE_URL
[ -z "$LIVE" ] && LIVE=https://www.spawn.co/@lanmower/signal-stage
mkdir -p "$OUT"
rm -rf "$OUT/profile"
setsid env DISPLAY=:1 /usr/bin/chromium --user-data-dir="$OUT/profile" --remote-debugging-port="$CPORT" --no-first-run --no-default-browser-check --enable-unsafe-webgpu --enable-features=Vulkan,WebGPU --use-angle=vulkan --use-vulkan=swiftshader --use-webgpu-adapter=swiftshader --enable-unsafe-swiftshader about:blank > "$OUT/browser.out" 2>&1 &
echo $! > "$OUT/browser.pid"
for i in $(seq 1 60); do curl -sf http://127.0.0.1:$CPORT/json/version > "$OUT/version.json" && break; sleep 0.5; done
WS=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$OUT/version.json','utf8')).webSocketDebuggerUrl)")
ID=$(playwriter session new --direct "$WS" 2>&1 | grep -o "Session [0-9]*" | awk '{print $2}')
node -e "const fs=require('fs');let t=fs.readFileSync(process.argv[1],'utf8');t=t.split('__OUT__').join(process.argv[2]).split('__LIVE__').join(process.argv[3]).split('__HERE__').join(process.argv[4]);fs.writeFileSync(process.argv[2]+'/probe.js',t)" "$HERE/live-probe.tpl.js" "$OUT" "$LIVE" "$HERE"
PLAYWRITER_EXEC_TIMEOUT=300000 timeout 330 playwriter -s "$ID" -e "$(cat "$OUT/probe.js")" > "$OUT/probe.out" 2>&1 &
T=$!
wait $T
PRC=$?
playwriter session delete "$ID" > /dev/null 2>&1
B=$(cat "$OUT/browser.pid")
SNAP=$(mktemp)
ps -eo pid=,ppid= > "$SNAP"
TREE="$B"; frontier="$B"
for d in $(seq 1 20); do next=""; for p in $frontier; do next="$next $(awk -v q=$p '$2==q{print $1}' "$SNAP")"; done; next=$(echo $next); [ -z "$next" ] && break; TREE="$TREE $next"; frontier="$next"; done
rm -f "$SNAP"
for p in $TREE; do kill -TERM $p 2>/dev/null; done
sleep 3
for p in $TREE; do s=$(ps -o stat= -p $p 2>/dev/null); if [ -n "$s" ]; then kill -KILL $p 2>/dev/null; fi; done
echo "browser tree pids: $TREE"
echo "probe rc=$PRC"
python3 -I "$HERE/pixel-compare.py" "$OUT/canvas-a.png" "$OUT/canvas-b.png" > "$OUT/pixel.json"
python3 -I - "$OUT" "$LIVE" > "$OUT/live-reference.json" <<'PY'
import json, sys
d, live = sys.argv[1], sys.argv[2]
p = json.load(open(d + '/live-probe.json'))
px = json.load(open(d + '/pixel.json'))
info = p.get('info') or {}
print(json.dumps({'source': 'live', 'url': live, 'session': p.get('session'), 'shown': info.get('shown'), 'canvases': info.get('canvases'), 'frames3s': info.get('frames3s'), 'laneBits': p.get('laneBits'), 'pixel': px}, indent=1))
PY
cat "$OUT/live-reference.json"
