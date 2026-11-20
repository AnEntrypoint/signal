#!/bin/bash
OUT="$1"
CAP_KB="${MEM_CAP_KB:-4194304}"
RUN_S="${RUN_CAP_S:-540}"
START=$(date +%s)
while :; do
  sleep 5
  B=$(cat "$OUT/browser.pid" 2>/dev/null)
  [ -n "$B" ] || exit 0
  kill -0 "$B" 2>/dev/null || exit 0
  RSS=$(ps -eo pgid=,rss= | awk -v g="$B" '$1==g {s+=$2} END {print s+0}')
  ELAPSED=$(( $(date +%s) - START ))
  REASON=''
  [ "$RSS" -gt "$CAP_KB" ] && REASON="memory ${RSS}KB over cap ${CAP_KB}KB"
  [ "$ELAPSED" -gt "$RUN_S" ] && REASON="run ${ELAPSED}s over cap ${RUN_S}s"
  if [ -n "$REASON" ]; then
    echo "$REASON" > "$OUT/bound.reason"
    ps -eo pid=,pgid=,rss=,args= | awk -v g="$B" '$2==g' | sort -k3 -nr | head -5 | cut -c1-200 > "$OUT/bound.holder"
    HP=$(awk '/--type=renderer/ {print $1; exit}' "$OUT/bound.holder"); [ -n "$HP" ] || HP=$(awk 'NR==1 {print $1}' "$OUT/bound.holder")
    OVER=$(ps -eo pgid=,rss=,args= | awk -v g="$B" '$1==g && /--type=renderer/ && $2>1000000 {n++} END {print n+0}')
    timeout 10 node "${HOLDER_READER:-$(dirname "$0")/holder-read.mjs}" "${CDP_PORT:-9333}" "$HP" "$OVER" >> "$OUT/bound.holder" 2>> "$OUT/bound.holder.err"
    HOLDER_EVENTS_OUT="$OUT/holder-events.json" timeout 45 node "${HOLDER_MEMDUMP:-$(dirname "$0")/holder-memdump.mjs}" "${CDP_PORT:-9333}" "$HP" >> "$OUT/bound.holder" 2>> "$OUT/bound.holder.err"
    timeout 10 node "${HOLDER_PROC:-$(dirname "$0")/holder-proc.mjs}" /proc "$HP" /dev/shm >> "$OUT/bound.holder" 2>> "$OUT/bound.holder.err"
    kill -- -"$B" 2>/dev/null
    S=$(cat "$OUT/server.pid" 2>/dev/null)
    [ -n "$S" ] && kill -- -"$S" 2>/dev/null
    exit 0
  fi
done
