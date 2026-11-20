#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SITE=$1
CHUNK=session/world:bc986e1b-5a08-4b6a-adf3-ef93cd1597b4@dev/60d2a80e-a7bd2cc76ec022ef.mjs
T=$(mktemp -d "$HERE/.red-chunk.XXXXXX")
cp -r "$SITE" "$T/site"
rm "$T/site/$CHUNK"
LOG=$T/witness.log
timeout 700 bash "$HERE/browser-witness.sh" "$T/site" > "$LOG" 2>&1 &
W=$!
echo "red-chunk witness timeout pid=$W"
wait $W
RRC=$?
echo "red-chunk witness rc=$RRC"
grep "PROC_CHECK\|FAIL" "$LOG" | cut -c1-240 | head -n 12
HIT=0
grep -q "FAIL HTTP 404 .*60d2a80e-a7bd2cc76ec022ef.mjs" "$LOG" && HIT=1
if [ "$HIT" -ne 1 ]; then tail -n 25 "$LOG" | cut -c1-240; fi
rm -rf "$T"
if [ "$RRC" -ne 0 ] && [ "$HIT" -eq 1 ]; then echo RED_CHUNK_OK; exit 0; fi
echo RED_CHUNK_FAILED
exit 1
