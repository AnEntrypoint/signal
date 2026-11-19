#!/bin/bash
set -u
here=$(cd "$(dirname "$0")" && pwd)
dir=$(mktemp -d /tmp/stoprun-XXXXXX)
setsid sleep 900 & decoy=$!
setsid bash -c "sleep 900 & wait; : $dir/profile" & root=$!
sleep 1
child=$(ps -o pid= --ppid "$root" | tr -d ' ' | head -1)
echo "$root" > "$dir/browser.pid"
echo "$decoy" > "$dir/server.pid"
bash "$here/stop-run.sh" "$dir" > "$dir/stop.out" 2>&1
sleep 1
fail=0
kill -0 "$root" 2>/dev/null && { echo "FAIL root alive"; fail=1; }
[ -n "$child" ] && kill -0 "$child" 2>/dev/null && { echo "FAIL child alive"; fail=1; }
kill -0 "$decoy" 2>/dev/null || { echo "FAIL decoy killed"; fail=1; }
grep -q 'refused server' "$dir/stop.out" || { echo "FAIL decoy not refused"; fail=1; }
mkdir "$dir/gone" && cp "$dir/browser.pid" "$dir/gone/browser.pid" && echo 999999 > "$dir/gone/browser.pid" && bash "$here/stop-run.sh" "$dir/gone" > "$dir/gone.out" 2>&1; grep -q 'already exited' "$dir/gone.out" || { echo "FAIL gone pid not reported"; fail=1; }
kill -TERM "$decoy" 2>/dev/null
rm -rf "$dir"
if [ $fail -eq 0 ]; then echo PASS; else echo FAIL; cat "$dir/stop.out" 2>/dev/null; exit 1; fi
