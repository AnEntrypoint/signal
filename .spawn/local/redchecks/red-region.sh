#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SRC=$1
T=$(mktemp -d "$HERE/.red-region.XXXXXX")
mkdir -p "$T/run"
printf '%s' '{"reqs":[],"consoles":[],"errs":[],"failed":[],"okUrls":[],"frames":[{"url":"https://anentrypoint.github.io/signal/session/world:x@dev/","info":{"canvases":["1280x800"],"frames3s":180,"shown":false}}]}' > "$T/run/trace.json"
node -e "const fs=require('fs');const r=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));const p=process.argv[2];const t=JSON.parse(fs.readFileSync(p,'utf8'));t.laneBits=r.laneBits;fs.writeFileSync(p,JSON.stringify(t))" "$SRC/ref/live-reference.json" "$T/run/trace.json"
cp "$SRC/ref/live-reference.json" "$T/live.json"
cp "$SRC/ref/canvas-a.png" "$T/canvas-a.png"
cp "$SRC/ref/canvas-b.png" "$T/canvas-b.png"
python3 -I "$HERE/pixel.py" "$T/canvas-a.png" "$T/canvas-b.png" > "$T/run/pixel.json"
LIVE_REFERENCE="$T/live.json" node "$HERE/browser-result.cjs" "$T/run" > "$T/drawn.out" 2>&1; D=$?
python3 -I - "$T/canvas-a.png" "$T/moved.png" <<'PY'
import sys
from PIL import Image, ImageDraw
a = Image.open(sys.argv[1]).convert('RGB')
b = a.copy()
ImageDraw.Draw(b).rectangle([4, 4, 51, 61], fill=(255, 0, 0))
b.save(sys.argv[2])
PY
cp "$T/moved.png" "$T/canvas-b.png"
python3 -I "$HERE/pixel.py" "$T/canvas-a.png" "$T/canvas-b.png" > "$T/run/pixel.json"
echo "MUTATED the changed region is moved to (4,4)"
LIVE_REFERENCE="$T/live.json" node "$HERE/browser-result.cjs" "$T/run" > "$T/moved.out" 2>&1; M=$?
grep "REGION\|FAIL COUNT" "$T/moved.out" | head -n 3
cp "$SRC/ref/canvas-b.png" "$T/canvas-b.png"
cmp "$SRC/ref/canvas-b.png" "$T/canvas-b.png" && echo RESTORED_CMP_SAME
python3 -I "$HERE/pixel.py" "$T/canvas-a.png" "$T/canvas-b.png" > "$T/run/pixel.json"
echo "drawn pair rc=$D moved pair rc=$M"
HIT=0
grep -q "REGION OUTSIDE" "$T/moved.out" && HIT=1
DRAWN=0
grep -q "REGION" "$T/drawn.out" && DRAWN=1
rm -rf "$T"
if [ "$M" -ne 0 ] && [ "$HIT" -eq 1 ] && [ "$DRAWN" -eq 0 ]; then echo RED_REGION_OK; exit 0; fi
echo RED_REGION_FAILED
exit 1
