#!/usr/bin/env bash
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
SITE="$1"
T=$(mktemp -d "$HERE/.red-preload.XXXXXX")
cp -r "$SITE" "$T/site"
node -e '
const fs = require("fs");
const path = require("path");
const root = process.argv[1];
let n = 0;
const re = /(<link rel="preload" as="fetch" crossorigin href=")\/signal\/world-store\/git\/bc986e1b5a084b6aadf3ef93cd1597b4\/ui\/(b045b55fce1634c701a585b3012693fbc125cc3f0b2039e844b16cfcafecbff6\.css)"/g;
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith(".html")) {
      const s = fs.readFileSync(p, "utf8");
      const k = [...s.matchAll(re)].length;
      if (k) {
        n += k;
        fs.writeFileSync(p, s.replace(re, (m, head, file) => head + "/signal/__local/https%3A%2F%2Fplay.spawn.co%2Fworld-store%2Fgit%2Fbc986e1b5a084b6aadf3ef93cd1597b4%2Fui%2F" + file + "\""));
      }
    }
  }
})(root);
if (n === 0) throw new Error("no preload to mutate");
console.log("MUTATED_PRELOAD " + n);
' "$T/site" || { rm -rf "$T"; echo RED_PRELOAD_FAILED; exit 1; }
LOG=$T/witness.log
timeout 900 bash "$HERE/browser-witness.sh" "$T/site" > "$LOG" 2>&1 &
W=$!
echo "red-preload witness timeout pid=$W"
wait $W
RRC=$?
echo "red-preload witness rc=$RRC"
grep "PROC_CHECK\|FAIL" "$LOG" | cut -c1-240 | head -n 12
HIT=0
grep -q "FAIL CONSOLE warning .*preloaded using link preload" "$LOG" && HIT=1
rm -rf "$T"
if [ "$RRC" -ne 0 ] && [ "$HIT" -eq 1 ]; then echo RED_PRELOAD_OK; exit 0; fi
echo RED_PRELOAD_FAILED
exit 1
