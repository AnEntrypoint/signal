#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SITE=$1
T=$(mktemp -d "$HERE/.red-alive.XXXXXX")
cp -r "$SITE" "$T/site"
F="$T/site/session/world:bc986e1b-5a08-4b6a-adf3-ef93cd1597b4@dev/index.html"
node -e "const fs=require('fs');const f=process.argv[1];const s=fs.readFileSync(f,'utf8');const h='<head>';if(s.indexOf(h)<0)process.exit(3);fs.writeFileSync(f,s.replace(h,h+'<script>(function(){var r=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=function(cb){return setTimeout(function(){r(cb)},2000)}})();</script>'))" "$F"
INJ=$?
echo "MUTATED session frame rAF throttled to one callback per 2 s (inject rc=$INJ)"
LOG=$T/witness.log
timeout 900 bash "$HERE/browser-witness.sh" "$T/site" > "$LOG" 2>&1 &
W=$!
echo "red-alive witness timeout pid=$W"
wait $W
RRC=$?
echo "red-alive witness rc=$RRC"
grep "PROC_CHECK\|FAIL\|RESULT" "$LOG" | cut -c1-260 | head -n 12
HIT=0
grep -q "FAIL ALIVE" "$LOG" && HIT=1
rm -rf "$T"
if [ "$INJ" -eq 0 ] && [ "$RRC" -ne 0 ] && [ "$HIT" -eq 1 ]; then echo RED_ALIVE_OK; exit 0; fi
echo RED_ALIVE_FAILED
exit 1
