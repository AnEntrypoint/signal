#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SRC=$1
T=$(mktemp -d "$HERE/.red-pixel.XXXXXX")
mkdir -p "$T/run"
printf '%s' '{"reqs":[],"consoles":[],"errs":[],"failed":[],"okUrls":[],"frames":[{"url":"https://anentrypoint.github.io/signal/session/world:x@dev/","info":{"canvases":["1280x800"],"frames3s":180,"shown":false}}]}' > "$T/run/trace.json"
cp "$SRC/live-reference.json" "$T/live.json"
cp "$SRC/canvas-a.png" "$T/canvas-a.png"
cp "$SRC/canvas-b.png" "$T/canvas-b.png"
python3 -I "$HERE/pixel-compare.py" "$T/canvas-a.png" "$T/canvas-b.png" > "$T/run/pixel.json"
LIVE_REFERENCE="$T/live.json" node "$HERE/browser-result.cjs" "$T/run" > "$T/drawn.out" 2>&1; D=$?
cp "$T/canvas-a.png" "$T/canvas-b.png"
python3 -I "$HERE/pixel-compare.py" "$T/canvas-a.png" "$T/canvas-b.png" > "$T/run/pixel.json"
echo "MUTATED second shot is a copy of the first"
LIVE_REFERENCE="$T/live.json" node "$HERE/browser-result.cjs" "$T/run" > "$T/frozen.out" 2>&1; F=$?
grep "PIXEL FROZEN\|FAIL COUNT" "$T/frozen.out" | head -n 3
cp "$SRC/canvas-b.png" "$T/canvas-b.png"
cmp "$SRC/canvas-b.png" "$T/canvas-b.png" && echo RESTORED_CMP_SAME
python3 -I "$HERE/pixel-compare.py" "$T/canvas-a.png" "$T/canvas-b.png" > "$T/run/pixel.json"
echo "drawn pair rc=$D frozen pair rc=$F"
HIT=0
grep -q "PIXEL FROZEN" "$T/frozen.out" && HIT=1
DRAWN=0
grep -q "PIXEL FROZEN" "$T/drawn.out" && DRAWN=1
rm -rf "$T"
if [ "$F" -ne 0 ] && [ "$HIT" -eq 1 ] && [ "$DRAWN" -eq 0 ]; then echo RED_PIXEL_OK; exit 0; fi
echo RED_PIXEL_FAILED
exit 1
