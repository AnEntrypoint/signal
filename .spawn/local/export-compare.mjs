#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

function hashes(dir) {
  const out = new Map();
  const walk = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else out.set(relative(dir, full).split(sep).join('/'), createHash('sha256').update(readFileSync(full)).digest('hex'));
    }
  };
  walk(dir);
  return out;
}

export function compareTrees(rebuilt, deployed) {
  const fresh = hashes(rebuilt);
  const kept = hashes(deployed);
  const problems = [];
  for (const [rel, sha] of kept) {
    if (!fresh.has(rel)) problems.push('MISSING ' + rel);
    else if (fresh.get(rel) !== sha) problems.push('DIFFERENT ' + rel);
  }
  for (const rel of fresh.keys()) if (!kept.has(rel)) problems.push('EXTRA ' + rel);
  return { files: kept.size, problems };
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const [rebuilt, deployed] = process.argv.slice(2).map((dir) => resolve(dir));
  const { files, problems } = compareTrees(rebuilt, deployed);
  for (const problem of problems.slice(0, 50)) console.log('FAIL ' + problem);
  console.log(problems.length === 0 ? 'EXPORT_REPRODUCED ' + files + ' files' : 'EXPORT_DIFFERS ' + problems.length + ' of ' + files);
  process.exit(problems.length === 0 ? 0 : 1);
}
