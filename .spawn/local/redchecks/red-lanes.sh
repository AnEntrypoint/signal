#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SRC=$1
T=$(mktemp -d "$HERE/.red-lanes.XXXXXX")
mkdir -p "$T/same" "$T/diff"
node -e "const fs=require('fs');const live=JSON.parse(fs.readFileSync(process.argv[1],'utf8'));const bits=live.laneBits;const mk=(d,b)=>{fs.writeFileSync(d+'/trace.json',JSON.stringify({reqs:[],consoles:[],errs:[],failed:[],okUrls:[],frames:[],laneBits:b}));};mk(process.argv[2],bits);mk(process.argv[3],(Number(bits)^1));" "$SRC" "$T/same" "$T/diff" || { echo RED_LANES_FAILED no-lane-bits; rm -rf "$T"; exit 1; }
LIVE_REFERENCE="$SRC" node "$HERE/browser-result.cjs" "$T/same" > "$T/same.out" 2>&1
LIVE_REFERENCE="$SRC" node "$HERE/browser-result.cjs" "$T/diff" > "$T/diff.out" 2>&1
SAME=0; grep -q 'LANE DRAW MISMATCH' "$T/same.out" && SAME=1
DIFF=0; grep -q 'LANE DRAW MISMATCH' "$T/diff.out" && DIFF=1
echo "same-bits mismatch=$SAME different-bits mismatch=$DIFF"
rm -rf "$T"
if [ "$SAME" -eq 0 ] && [ "$DIFF" -eq 1 ]; then echo RED_LANES_OK; exit 0; fi
echo RED_LANES_FAILED
exit 1
