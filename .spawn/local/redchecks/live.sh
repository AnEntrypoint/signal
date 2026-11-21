#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
. "$HERE/lib.sh"
MODE=$1
OUT=$2
CPORT=$3
LIVE=${4:-${LIVE_URL:-https://www.spawn.co/@lanmower/signal-stage}}
case "$MODE" in
  reference) TPL=live-probe.tpl.js ;;
  trace) TPL=live-trace.tpl.js ;;
  *) echo "ABORT: mode must be reference or trace"; exit 2 ;;
esac
mkdir -p "$OUT"
STAGE=$(mktemp -d "$HERE/.live-stage.XXXXXX")
rm -rf "$OUT/profile"
setsid env DISPLAY=:1 /usr/bin/chromium --user-data-dir="$OUT/profile" --remote-debugging-port="$CPORT" "${CHROME_BASE[@]}" about:blank > "$OUT/browser.out" 2>&1 &
echo $! > "$OUT/browser.pid"
wait_devtools "$CPORT" "$OUT/version.json"
WS=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$OUT/version.json','utf8')).webSocketDebuggerUrl)")
open_session "$WS"
node -e "const fs=require('fs');let t=fs.readFileSync(process.argv[1],'utf8');t=t.split('__OUT__').join(process.argv[5]).split('__LIVE__').join(process.argv[3]).split('__HERE__').join(process.argv[4]);fs.writeFileSync(process.argv[2]+'/probe.js',t)" "$HERE/$TPL" "$OUT" "$LIVE" "$HERE" "$STAGE"
PLAYWRITER_EXEC_TIMEOUT=300000 timeout 330 playwriter -s "$SESSION_ID" -e "$(cat "$OUT/probe.js")" > "$OUT/probe.out" 2>&1 &
T=$!
wait $T
PRC=$?
cp -r "$STAGE"/. "$OUT"/
rm -rf "$STAGE"
close_session "$SESSION_ID"
SNAP=$(mktemp)
snapshot_to "$SNAP"
TREE=$(descend_in "$SNAP" $(cat "$OUT/browser.pid"))
rm -f "$SNAP"
stop_pids $TREE
echo "browser tree pids: $TREE"
echo "probe rc=$PRC"
python3 -I "$HERE/pixel.py" "$OUT/canvas-a.png" "$OUT/canvas-b.png" > "$OUT/pixel.json"
if [ "$MODE" = reference ]; then
python3 -I - "$OUT" "$LIVE" > "$OUT/live-reference.json" <<'PY'
import json, sys
d, live = sys.argv[1], sys.argv[2]
p = json.load(open(d + '/live-probe.json'))
px = json.load(open(d + '/pixel.json'))
info = p.get('info') or {}
print(json.dumps({'source': 'live', 'url': live, 'session': p.get('session'), 'shown': info.get('shown'), 'canvases': info.get('canvases'), 'frames3s': info.get('frames3s'), 'laneBits': p.get('laneBits'), 'siteTree': p.get('siteTree'), 'engineLines': p.get('engineLines'), 'pixel': px}, indent=1))
PY
cat "$OUT/live-reference.json"
else
cat "$OUT/pixel.json"; echo
fi
