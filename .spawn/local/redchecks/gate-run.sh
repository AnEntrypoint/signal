#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SITE=$1
HEAVY=$2
GT=$(mktemp -d "$HERE/.gate.XXXXXX")
clear_now=0
for i in $(seq 1 40); do
  when=$(date -u +%H:%M:%S)
  ( timeout 30 node "$HEAVY" > "$GT/heavy-$i" 2>&1; echo "heavy rc=$?" >> "$GT/heavy-$i" ) &
  HP=$!
  timeout 30 vmstat 1 2 > "$GT/vm-$i" 2>&1
  wait $HP
  SI=$(awk 'NR==4{print $7}' "$GT/vm-$i")
  SO=$(awk 'NR==4{print $8}' "$GT/vm-$i")
  H=$(grep -c "HEAVY_JOBS clear" "$GT/heavy-$i")
  echo "attempt $i at $when UTC"
  cat "$GT/vm-$i"
  echo "second sample si=$SI so=$SO"
  cat "$GT/heavy-$i"
  if [ -n "$SI" ] && [ "$SI" -lt 1000 ] && [ "$SO" -lt 1000 ] && [ "$H" -ge 1 ]; then clear_now=1; break; fi
  sleep 60
done
echo "gate clear=$clear_now"
if [ "$clear_now" -ne 1 ]; then rm -rf "$GT"; echo GATE_BLOCKED; exit 3; fi
if [ "x$LIVE_DIR" != "x" ]; then
  bash "$HERE/live-reference.sh" "$LIVE_DIR" 9491
  export LIVE_REFERENCE="$LIVE_DIR/live-reference.json"
fi
bash "$HERE/proc-check.sh" gate-before
timeout 700 bash "$HERE/browser-witness.sh" "$SITE" &
W=$!
echo "witness timeout pid=$W"
wait $W
WRC=$?
echo "witness rc=$WRC"
bash "$HERE/proc-check.sh" gate-after-witness $W
AR=$?
timeout 700 bash "$HERE/red-leak.sh" "$SITE" &
R=$!
echo "red-leak timeout pid=$R"
wait $R
RRC=$?
echo "red-leak rc=$RRC"
bash "$HERE/proc-check.sh" gate-after-red $R
ZR=$?
rm -rf "$GT"
if [ "$WRC" -eq 0 ] && [ "$AR" -eq 0 ] && [ "$RRC" -eq 0 ] && [ "$ZR" -eq 0 ]; then echo GATE_WITNESS_AND_RED_PASSED; exit 0; fi
echo GATE_FAILED
exit 1
