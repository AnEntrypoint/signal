#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
. "$HERE/lib.sh"
SITE=$(realpath "$1")
LIVE=$(realpath "$2")
OUT=$(realpath -m "$3")
mkdir -p "$OUT"
LOG="$OUT/window.log"
: > "$LOG"
export LIVE_REFERENCE="$LIVE/live-reference.json"
FAILED=0

step() {
  local name=$1 limit=$2
  shift 2
  if ! mem_gate "$name" >> "$LOG"; then
    echo "HOLD $name" >> "$LOG"
    return 3
  fi
  timeout "$limit" "$@" > "$OUT/$name.out" 2>&1 &
  local pid=$!
  echo "$name pid=$pid started $(date -u +%T)" >> "$LOG"
  wait "$pid"
  local rc=$?
  echo "$name rc=$rc ended $(date -u +%T)" >> "$LOG"
  return "$rc"
}

for i in 1 2 3 4 5 6 7 8 9 10; do
  step "witness-$i" 900 bash "$HERE/browser-witness.sh" "$SITE" || FAILED=1
  grep -q "WITNESS passed" "$OUT/witness-$i.out" && grep -q "FAIL COUNT 0" "$OUT/witness-$i.out" || FAILED=1
done

for n in chunk preload summary stale realm shown alive census kernel leak lanes pixel region warm; do
  step "red-$n" 1100 node "$HERE/red.cjs" "$n" "$SITE" "$LIVE" || FAILED=1
  tail -n 1 "$OUT/red-$n.out" | grep -q "_OK$" || FAILED=1
done

echo "LEFT $(ps -eo args= | grep -c '[b]rowser-witness.sh\|[r]ed.cjs')" >> "$LOG"
if [ "$FAILED" -eq 0 ]; then echo "WINDOW OK" >> "$LOG"; exit 0; fi
echo "WINDOW FAILED" >> "$LOG"
exit 1
