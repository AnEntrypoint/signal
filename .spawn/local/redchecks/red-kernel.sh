#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SITE="$1"
SRC="$2"
T=$(mktemp -d "$HERE/.red-kernel.XXXXXX")
cp -r "$SITE" "$T/site"
[ -f "$T/site/kernel-witness/index.html" ] || { rm -rf "$T"; echo RED_KERNEL_FAILED missing-target; exit 1; }
rm -rf "$T/site/kernel-witness"
echo "MUTATED_KERNEL removed kernel-witness"
LOG=$T/witness.log
timeout 900 bash "$HERE/browser-witness.sh" "$T/site" > "$LOG" 2>&1 &
W=$!
echo "red-kernel witness timeout pid=$W"
wait $W
RRC=$?
echo "red-kernel witness rc=$RRC"
grep "PROC_CHECK\|FAIL" "$LOG" | cut -c1-240 | head -n 12
HIT=0
grep -q "FAIL HTTP 404 .*kernel-witness" "$LOG" && HIT=1
mkdir -p "$T/site/kernel-witness" && cp -r "$SRC/kernel-witness/." "$T/site/kernel-witness/"
cmp "$SRC/kernel-witness/index.html" "$T/site/kernel-witness/index.html" && echo "RESTORED_CMP_SAME"
rm -rf "$T"
if [ "$RRC" -ne 0 ] && [ "$HIT" -eq 1 ]; then echo RED_KERNEL_OK; exit 0; fi
echo RED_KERNEL_FAILED
exit 1
