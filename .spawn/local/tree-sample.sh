#!/bin/bash
OUT="$1"
START=$(date +%s)
DIR=$(dirname "$0")
while :; do
  sleep 2
  B=$(cat "$OUT/browser.pid" 2>/dev/null)
  [ -n "$B" ] || exit 0
  kill -0 "$B" 2>/dev/null || exit 0
  TREE=$(node "$DIR/tree-rss.mjs" "$B" 2>/dev/null)
  [ -n "$TREE" ] || TREE=null
  ID=$(cat "$OUT/session.id" 2>/dev/null)
  WS=$(cat "$OUT/ws.pid" 2>/dev/null)
  PW=$(ps -eo pid=,rss=,args= | awk -v id="$ID" -v ws="$WS" 'id != "" && (index($0, "playwriter -s " id " ") || $1 == ws) {s += $2} END {print s + 0}')
  echo "{\"t\":$(date +%s%3N),\"elapsed\":$(( $(date +%s) - START )),\"playwriterKb\":$PW,\"tree\":$TREE}" >> "$OUT/tree-rss.jsonl"
done
