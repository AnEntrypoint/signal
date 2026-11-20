#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SITE="$1"
T=$(mktemp -d "$HERE/.red-realm.XXXXXX")
cp -r "$SITE" "$T/site"
node - "$T/site" <<'JS'
const fs = require("fs");
const path = require("path");
const root = process.argv[2];
const from = "characters`);return null});";
const to = "characters`);let r=RiI(e)?.sharedHost??e;if(!TW2(r))return null;let i=tdy.get(r);if(i!==void 0)return`${t}-${i}.${whv}`;return r.includes(\".\")?`${t}-${r}`:`${t}.${r}`});";
let n = 0;
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith(".mjs")) {
      const s = fs.readFileSync(p, "utf8");
      const k = s.split(from).length - 1;
      if (k) { n += k; fs.writeFileSync(p, s.split(from).join(to)); }
    }
  }
})(root);
if (n === 0) throw new Error("no realm rewrite to mutate");
console.log("MUTATED_REALM " + n);
JS
[ $? -eq 0 ] || { rm -rf "$T"; echo RED_REALM_FAILED; exit 1; }
LOG=$T/witness.log
timeout 900 bash "$HERE/browser-witness.sh" "$T/site" > "$LOG" 2>&1 &
W=$!
echo "red-realm witness timeout pid=$W"
wait $W
RRC=$?
echo "red-realm witness rc=$RRC"
grep "PROC_CHECK\|FAIL" "$LOG" | cut -c1-240 | head -n 12
HIT=0
grep -q "FAIL HTTP 404 .*authored-realm-kept-f239caa792d8b017.html" "$LOG" && grep -q "FAIL HTTP 404 .*kernel-witness-host" "$LOG" && HIT=1
rm -rf "$T"
if [ "$RRC" -ne 0 ] && [ "$HIT" -eq 1 ]; then echo RED_REALM_OK; exit 0; fi
echo RED_REALM_FAILED
exit 1
