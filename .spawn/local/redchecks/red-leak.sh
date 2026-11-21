#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SITE=$1
LOG=$(mktemp "$HERE/.red-leak.XXXXXX")
WITNESS_LEAK=1 timeout 700 bash "$HERE/browser-witness.sh" "$SITE" > "$LOG" 2>&1 &
W=$!
echo "red witness timeout pid=$W"
wait $W
RRC=$?
echo "red witness rc=$RRC"
LEAK=$(awk -F= '/^LEAK_PID=/{print $2}' "$LOG")
echo "leaked pid=$LEAK"
grep "PROC_CHECK\|browser-witness-leak" "$LOG"
HIT=0
grep -q "PROC_CHECK after left=1" "$LOG" && HIT=1
if [ -n "$LEAK" ]; then
  kill -TERM "$LEAK" 2>/dev/null
  sleep 1
  kill -KILL "$LEAK" 2>/dev/null
fi
bash "$HERE/lib.sh" proc_check red-after-cleanup
CRC=$?
rm -f "$LOG"
if [ "$RRC" -ne 0 ] && [ "$HIT" -eq 1 ] && [ "$CRC" -eq 0 ]; then echo RED_CHECK_OK; exit 0; fi
echo RED_CHECK_FAILED
exit 1
