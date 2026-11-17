#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.env.SNAPSHOT_ROOT || '/workspace/signal');
const records = readFileSync(join(ROOT, 'state/fetch-log.jsonl'), 'utf8').split('\n').filter(Boolean).map((line) => JSON.parse(line));
const served = records.filter((r) => r.served === true);
const failures = [];
for (const r of served) {
  if (typeof r.verified_against_name !== 'boolean') failures.push(r.url + ': verified_against_name is not recorded');
  if (!r.file) failures.push(r.url + ': served without a file');
  else if (!existsSync(join(ROOT, r.file))) failures.push(r.url + ': file missing ' + r.file);
  else if (createHash('sha256').update(readFileSync(join(ROOT, r.file))).digest('hex') !== r.sha256) failures.push(r.url + ': sha256 differs from the record');
}
const replacements = JSON.parse(readFileSync(new URL('./replacements/map.json', import.meta.url), 'utf8'));
for (const r of replacements) {
  if (!existsSync(join(ROOT, r.file))) failures.push(r.url + ': replacement file missing ' + r.file);
  else if (createHash('sha256').update(readFileSync(join(ROOT, r.file))).digest('hex') !== r.sha256) failures.push(r.url + ': replacement sha256 differs from the map');
}
const unverified = served.filter((r) => r.verified_against_name === false).map((r) => r.url.split('/').pop());
console.log('served=' + served.length + ' unverified=' + unverified.length + ' ' + unverified.join(' ') + ' replacements=' + replacements.length + ' failures=' + failures.length);
for (const f of failures) console.error(f);
process.exit(failures.length ? 1 : 0);
