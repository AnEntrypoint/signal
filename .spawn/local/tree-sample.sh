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
  PW=$(ps -eo rss=,args= | awk '/playwriter/ && !/awk/ {s+=$1} END {print s+0}')
  echo "{\"t\":$(date +%s%3N),\"elapsed\":$(( $(date +%s) - START )),\"playwriterKb\":$PW,\"tree\":${TREE:-null}}" >> "$OUT/tree-rss.jsonl"
done
