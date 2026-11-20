import { execFileSync } from 'node:child_process';

export function parsePs(text) {
  return text.split('\n').filter((line) => line.trim() !== '').map((line) => {
    const m = line.trim().match(/^(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(.*)$/);
    if (!m) return null;
    return { pid: Number(m[1]), ppid: Number(m[2]), pgid: Number(m[3]), rss: Number(m[4]), args: m[5] };
  }).filter(Boolean);
}

export function classify(row, leaderPid) {
  if (row.pid === leaderPid) return 'browser';
  const type = row.args.match(/--type=([a-z-]+)/);
  return type ? type[1] : 'other';
}

export function summarize(rows, groupId) {
  const members = rows.filter((row) => row.pgid === groupId);
  const byType = {};
  let total = 0;
  for (const row of members) {
    const kind = classify(row, groupId);
    byType[kind] = (byType[kind] || 0) + row.rss;
    total += row.rss;
  }
  return { groupId, count: members.length, totalKb: total, byType };
}

export function readRows() {
  return parsePs(execFileSync('ps', ['-eo', 'pid=,ppid=,pgid=,rss=,args='], { encoding: 'utf8', maxBuffer: 1 << 26 }));
}

const invoked = process.argv[1] && process.argv[1].endsWith('tree-rss.mjs');
if (invoked) {
  const groupId = Number(process.argv[2]);
  if (!Number.isInteger(groupId) || groupId <= 0) {
    console.error('usage: tree-rss.mjs <process-group-id>');
    process.exit(2);
  }
  console.log(JSON.stringify(summarize(readRows(), groupId)));
}
