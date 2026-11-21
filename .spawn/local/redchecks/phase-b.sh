#!/usr/bin/env bash
R=/workspace/signal/world/signal-stage/.spawn/local/redchecks
S=/workspace/signal/pages-export
H=/tmp/verify/heavy495/scripts/heavy-jobs.cjs
L=/tmp/verify/static/phase-b5
mkdir -p "$L"
export LIVE_DIR=$L
export LIVE_REFERENCE=$L/live-reference.json
cd "$R"
echo "PHASE_B_START $(date -u +%H:%M:%S)"
timeout 3000 bash gate-run.sh "$S" "$H" > "$L/gate.out" 2>&1 & G=$!
echo "gate-run pid=$G"
wait $G
echo "gate-run rc=$?"
grep "attempt\|second sample\|HEAVY_JOBS\|gate clear\|RESULT\|FAIL\|GATE" "$L/gate.out" | cut -c1-400 | tail -n 40
run() {
  local name=$1; shift
  timeout 1100 bash "$@" > "$L/rr-$name.out" 2>&1 & P=$!
  echo "$name pid=$P start=$(date -u +%H:%M:%S)"
  wait $P
  echo "$name rc=$?"
  tail -n 2 "$L/rr-$name.out" | cut -c1-240
}
run red-chunk red-chunk.sh "$S"
run red-preload red-preload.sh "$S"
run red-summary red-summary.sh "$S"
run red-stale red-stale.sh
run red-realm red-realm.sh "$S"
run red-shown red-shown.sh
run red-census red-census.sh "$S" "$S"
run red-kernel red-kernel.sh "$S" "$S"
run red-pixel red-pixel.sh "$L"
run red-region red-region.sh "$L"
run red-alive red-alive.sh "$S"
echo "leftover: $(ls -A | grep -c '^\.red-\|^\.browser-witness\|^\.gate\.')"
echo PHASE_B_DONE $(date -u +%H:%M:%S)
