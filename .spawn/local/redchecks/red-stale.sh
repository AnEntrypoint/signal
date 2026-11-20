#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
REPO=$(cd "$HERE/../../.." && pwd)
T=$(mktemp -d "$HERE/.red-stale.XXXXXX")
mkdir "$T/site"
git -C "$REPO" archive "${STALE_REF:-cf87fbf6f1853fc7263bff217b70f95882d8bed8}" | tar -x -C "$T/site"
LOG=$T/witness.log
timeout 700 bash "$HERE/browser-witness.sh" "$T/site" > "$LOG" 2>&1 &
W=$!
echo "red-stale witness timeout pid=$W"
wait $W
RRC=$?
echo "red-stale witness rc=$RRC"
grep "PROC_CHECK\|RESULT\|FAIL" "$LOG" | cut -c1-240 | head -n 40
HIT=0
grep -q "FAIL HTTP 404 .*26ceb10f-49e18729068cd5df.mjs" "$LOG" && HIT=1
rm -rf "$T"
if [ "$RRC" -ne 0 ] && [ "$HIT" -eq 1 ]; then echo RED_STALE_OK; exit 0; fi
echo RED_STALE_FAILED
exit 1
