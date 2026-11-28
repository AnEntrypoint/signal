#!/usr/bin/env bash
set -u
cd /workspace/signal/world/signal-stage || exit 1
HEAD_SHORT=$(git rev-parse --short HEAD)
SITE=/workspace/signal/pages-export
LIVE=/workspace/tmp/signal/phase-f
OUT=${OUT:-/workspace/tmp/signal/export-split-$HEAD_SHORT}
W=$PWD/.spawn/local/redchecks/window.sh
mkdir -p "$OUT"
rc=0
if [ "$#" -eq 0 ]; then PARTS='build-witness reds-a reds-b'; else PARTS="$*"; fi
for p in $PARTS; do
  GATE_EXCLUSIVE=1 node /workspace/hyperagent/scripts/gate-ticket.cjs run "signal-export-$HEAD_SHORT-$p" -- bash "$W" "$SITE" "$LIVE" "$OUT" "$p" > "$OUT/$p.part" 2>&1
  pr=$?
  echo "${p}_gate_rc=$pr"
  rc=$(( rc | pr ))
done
if [ "$#" -eq 0 ]; then
  bash "$W" "$SITE" "$LIVE" "$OUT" verdict > "$OUT/verdict.part" 2>&1
  vr=$?
  echo "verdict_rc=$vr"
  rc=$(( rc | vr ))
fi
echo "export-parts_DONE $rc"
exit $rc
