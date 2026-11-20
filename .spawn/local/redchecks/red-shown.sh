#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
T=$(mktemp -d "$HERE/.red-shown.XXXXXX")
mk() { mkdir -p "$1"; printf '%s' "{\"reqs\":[],\"consoles\":[],\"errs\":[],\"failed\":[],\"okUrls\":[],\"frames\":[{\"url\":\"https://anentrypoint.github.io/signal/session/world:x@dev/\",\"info\":{\"canvases\":[\"1280x800\"],\"frames3s\":180,\"shown\":$2}}]}" > "$1/trace.json"; printf '%s' '{"present":true,"w":1280,"h":800,"changed":5000,"changedFrac":0.004883,"bbox":[0,0,600,600],"bboxW":600,"bboxH":600}' > "$1/pixel.json"; }
mk "$T/match" false
mk "$T/ahead" true
printf '%s' '{"source":"live","shown":false,"pixel":{"present":true,"changed":5000,"changedFrac":0.004883,"bboxW":600,"bboxH":600}}' > "$T/live.json"
LIVE_REFERENCE="$T/live.json" node "$HERE/browser-result.cjs" "$T/match" > "$T/match.out" 2>&1; S1=$?
LIVE_REFERENCE="$T/live.json" node "$HERE/browser-result.cjs" "$T/ahead" > "$T/ahead.out" 2>&1; S2=$?
echo "match rc=$S1 ahead rc=$S2"
grep "PARITY SHOWN" "$T/ahead.out" | head -n 2
rm -rf "$T"
if [ "$S1" -eq 0 ] && [ "$S2" -ne 0 ]; then echo RED_SHOWN_OK; exit 0; fi
echo RED_SHOWN_FAILED
exit 1
