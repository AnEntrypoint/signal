#!/usr/bin/env bash
set -u
LABEL=$1
shift
SELF=" "
p=$$
while [ -n "$p" ] && [ "$p" -gt 1 ]; do
  SELF="$SELF$p "
  p=$(ps -o ppid= -p "$p" 2>/dev/null | tr -d ' ')
done
TMP=$(mktemp)
HITS=$(mktemp)
ps -eo pid=,args= > "$TMP"
grep -F 'browser-witness' "$TMP" | grep -v -F 'grep -F' > "$HITS"
echo "== proc-check $LABEL $(date -u +%H:%M:%S) browser-witness processes (this check's ancestry excluded)"
LEFT=0
while read -r pid args; do
  case "$SELF" in *" $pid "*) continue ;; esac
  echo "  $pid $args" | cut -c1-200
  LEFT=$((LEFT + 1))
done < "$HITS"
for pid in "$@"; do
  s=$(ps -o stat= -p "$pid" 2>/dev/null | tr -d ' ')
  case "$s" in ''|Z*) ;; *) echo "  recorded pid=$pid alive stat=$s"; LEFT=$((LEFT + 1)) ;; esac
done
rm -f "$TMP" "$HITS"
if [ "$LEFT" -eq 0 ]; then echo "PROC_CHECK $LABEL clear"; exit 0; fi
echo "PROC_CHECK $LABEL left=$LEFT"
exit 1
