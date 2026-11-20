#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SITE="$1"
T=$(mktemp -d "$HERE/.red-summary.XXXXXX")
cp -r "$SITE" "$T/site"
node -e '
const fs = require("fs");
const path = require("path");
const root = process.argv[1];
let n = 0;
const from = "let a=null;if(a===null)return null;";
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith(".mjs")) {
      const s = fs.readFileSync(p, "utf8");
      const k = s.split(from).length - 1;
      if (k) { n += k; fs.writeFileSync(p, s.split(from).join("let a=v7();if(a===null)return null;")); }
    }
  }
})(root);
if (n === 0) throw new Error("no summary patch to mutate");
console.log("MUTATED_SUMMARY " + n);
' "$T/site" || { rm -rf "$T"; echo RED_SUMMARY_FAILED; exit 1; }
LOG=$T/witness.log
timeout 900 bash "$HERE/browser-witness.sh" "$T/site" > "$LOG" 2>&1 &
W=$!
echo "red-summary witness timeout pid=$W"
wait $W
RRC=$?
echo "red-summary witness rc=$RRC"
grep "PROC_CHECK\|FAIL" "$LOG" | cut -c1-240 | head -n 12
HIT=0
grep -q "FAIL HTTP 404 .*/summary/" "$LOG" && HIT=1
rm -rf "$T"
if [ "$RRC" -ne 0 ] && [ "$HIT" -eq 1 ]; then echo RED_SUMMARY_OK; exit 0; fi
echo RED_SUMMARY_FAILED
exit 1
