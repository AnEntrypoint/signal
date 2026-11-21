#!/usr/bin/env bash
set -u
R=/workspace/signal/world/signal-stage/.spawn/local/redchecks
S=/workspace/signal/pages-export
L=/tmp/verify/static/phase-c1
TH=2621440
BUDGET=1200
WAITED=0
mkdir -p "$L"
: > "$L/rc.txt"
say() { echo "$(date -u +%H:%M:%S) $*" | tee -a "$L/window.log"; }
mem() { awk '/^MemAvailable:/{print $2}' /proc/meminfo; }
gate() {
  local name=$1 kb
  while :; do
    kb=$(mem)
    if [ "$kb" -ge "$TH" ]; then say "MEM step=$name kb=$kb threshold=$TH ok waited=$WAITED s"; return 0; fi
    if [ "$WAITED" -ge "$BUDGET" ]; then say "MEM step=$name kb=$kb threshold=$TH GAVE_UP waited=$WAITED s"; return 1; fi
    say "MEM step=$name kb=$kb threshold=$TH waiting"
    sleep 30
    WAITED=$((WAITED+30))
  done
}
run() {
  local name=$1
  shift
  gate "$name" || { say "ABORT before $name memory gate gave up"; echo "ABORT $name" >> "$L/rc.txt"; exit 3; }
  timeout 1100 "$@" > "$L/rr-$name.out" 2>&1 & P=$!
  say "STEP $name pid=$P"
  wait $P
  rc=$?
  say "STEP $name rc=$rc"
  echo "$name $rc" >> "$L/rc.txt"
}
say "WINDOW_START memory-headroom gate threshold=$TH kB (2.5 GiB) budget=$BUDGET s"
vmstat 1 2 > "$L/vmstat-start.txt"
cat "$L/vmstat-start.txt" >> "$L/window.log"
say "VMSTAT_START second_sample si=$(awk 'NR==4{print $7}' "$L/vmstat-start.txt") so=$(awk 'NR==4{print $8}' "$L/vmstat-start.txt")"
run live-reference bash "$R/live-reference.sh" "$L" 9491
if [ ! -s "$L/live-reference.json" ]; then say "ABORT live reference missing"; exit 3; fi
export LIVE_REFERENCE=$L/live-reference.json
run proc-before bash "$R/proc-check.sh" phase-c-before
run witness bash "$R/browser-witness.sh" "$S"
run proc-after-witness bash "$R/proc-check.sh" phase-c-after-witness
run red-chunk bash "$R/red-chunk.sh" "$S"
run red-preload bash "$R/red-preload.sh" "$S"
run red-summary bash "$R/red-summary.sh" "$S"
run red-stale bash "$R/red-stale.sh"
run red-realm bash "$R/red-realm.sh" "$S"
run red-shown bash "$R/red-shown.sh"
run red-region bash "$R/red-region.sh" "$L"
run red-alive bash "$R/red-alive.sh" "$S"
run red-pixel bash "$R/red-pixel.sh" "$L"
run red-census bash "$R/red-census.sh" "$S" "$S"
run red-kernel bash "$R/red-kernel.sh" "$S" "$S"
run red-leak bash "$R/red-leak.sh" "$S"
run proc-after-red bash "$R/proc-check.sh" phase-c-after-red
say "MEM final kb=$(mem)"
say "VMSTAT_END $(vmstat 1 2 | tail -n 1)"
say "WINDOW_END fails=$(awk '$2!=0' "$L/rc.txt" | wc -l) waited=$WAITED s"
