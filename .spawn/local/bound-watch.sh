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
    kill -- -"$B" 2>/dev/null
    S=$(cat "$OUT/server.pid" 2>/dev/null)
    [ -n "$S" ] && kill -- -"$S" 2>/dev/null
    exit 0
  fi
done
