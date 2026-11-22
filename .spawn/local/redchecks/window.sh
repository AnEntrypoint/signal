#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
. "$HERE/lib.sh"
SITE=$(realpath "$1")
LIVE=$(realpath "$2")
OUT=$(realpath -m "$3")
PART=$4
PARTS="build-witness reds-a reds-b"
mkdir -p "$OUT"
LOG="$OUT/window.log"
export LIVE_REFERENCE="$LIVE/live-reference.json"
FAILED=0

step() {
  local name=$1 limit=$2 pass=$3
  shift 3
  if ! mem_gate "$name" >> "$LOG"; then
    echo "HOLD $name" >> "$LOG"
    FAILED=1
    return
  fi
  timeout "$limit" "$@" > "$OUT/$name.out" 2>&1 &
  local pid=$!
  echo "$name pid=$pid started $(date -u +%T)" >> "$LOG"
  wait "$pid"
  local rc=$?
  echo "$name rc=$rc ended $(date -u +%T)" >> "$LOG"
  [ "$rc" -eq 0 ] && grep -q "$pass" "$OUT/$name.out" || FAILED=1
}

witnesses() { local i; for i in "$@"; do step "witness-$i" 900 'WITNESS passed' bash "$HERE/browser-witness.sh" "$SITE"; done; }
reds() { local n; for n in "$@"; do step "red-$n" 1100 '_OK$' node "$HERE/red.cjs" "$n" "$SITE" "$LIVE"; done; }

case "$PART" in
  build-witness) step reproduce 1800 '^EXPORT_REPRODUCED' bash "$HERE/reproduce.sh" "$SITE"; witnesses 1 2 3 4 5 6 7 8 9 10 ;;
  reds-a) reds chunk preload summary stale realm shown alive census kernel ;;
  reds-b) reds leak lanes pixel region tree patches reproduce ;;
  verdict)
    for p in $PARTS; do grep -qx "PART $p OK" "$LOG" || { echo "WINDOW FAILED: part $p has no OK"; exit 1; }; done
    echo "WINDOW OK"
    exit 0 ;;
  *) echo "part must be one of: $PARTS verdict"; exit 2 ;;
esac

echo "LEFT $(ps -eo args= | grep -c '[b]rowser-witness.sh\|[r]ed.cjs')" >> "$LOG"
[ "$FAILED" -eq 0 ] && { echo "PART $PART OK" >> "$LOG"; exit 0; }
echo "PART $PART FAILED" >> "$LOG"
exit 1
