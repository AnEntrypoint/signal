#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SITE="$1"
SRC="$2"
T=$(mktemp -d "$HERE/.red-census.XXXXXX")
cp -r "$SITE" "$T/site"
[ -f "$T/site/world-store/worlds/bc986e1b5a084b6aadf3ef93cd1597b4/arrival-census/19c1489dab3e655521417de663b683930e2cc29a10f23d859a384885d25cc8b7/index.html" ] || { rm -rf "$T"; echo RED_CENSUS_FAILED missing-target; exit 1; }
rm -rf "$T/site/world-store/worlds/bc986e1b5a084b6aadf3ef93cd1597b4/arrival-census/19c1489dab3e655521417de663b683930e2cc29a10f23d859a384885d25cc8b7"
echo "MUTATED_CENSUS removed world-store/worlds/bc986e1b5a084b6aadf3ef93cd1597b4/arrival-census/19c1489dab3e655521417de663b683930e2cc29a10f23d859a384885d25cc8b7"
LOG=$T/witness.log
timeout 900 bash "$HERE/browser-witness.sh" "$T/site" > "$LOG" 2>&1 &
W=$!
echo "red-census witness timeout pid=$W"
wait $W
RRC=$?
echo "red-census witness rc=$RRC"
grep "PROC_CHECK\|FAIL" "$LOG" | cut -c1-240 | head -n 12
HIT=0
grep -q "FAIL HTTP 404 .*arrival-census" "$LOG" && HIT=1
mkdir -p "$T/site/world-store/worlds/bc986e1b5a084b6aadf3ef93cd1597b4/arrival-census/19c1489dab3e655521417de663b683930e2cc29a10f23d859a384885d25cc8b7" && cp -r "$SRC/world-store/worlds/bc986e1b5a084b6aadf3ef93cd1597b4/arrival-census/19c1489dab3e655521417de663b683930e2cc29a10f23d859a384885d25cc8b7/." "$T/site/world-store/worlds/bc986e1b5a084b6aadf3ef93cd1597b4/arrival-census/19c1489dab3e655521417de663b683930e2cc29a10f23d859a384885d25cc8b7/"
cmp "$SRC/world-store/worlds/bc986e1b5a084b6aadf3ef93cd1597b4/arrival-census/19c1489dab3e655521417de663b683930e2cc29a10f23d859a384885d25cc8b7/index.html" "$T/site/world-store/worlds/bc986e1b5a084b6aadf3ef93cd1597b4/arrival-census/19c1489dab3e655521417de663b683930e2cc29a10f23d859a384885d25cc8b7/index.html" && echo "RESTORED_CMP_SAME"
rm -rf "$T"
if [ "$RRC" -ne 0 ] && [ "$HIT" -eq 1 ]; then echo RED_CENSUS_OK; exit 0; fi
echo RED_CENSUS_FAILED
exit 1
