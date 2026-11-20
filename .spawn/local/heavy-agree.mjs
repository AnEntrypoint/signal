import { fileURLToPath } from 'node:url';

export function verdictOf(text) {
  const match = /\b(clear|busy)\b/.exec(text);
  return match ? match[1] : 'unknown';
}

export function pidsOf(text) {
  return [...new Set([...text.matchAll(/pid=(\d+)/g)].map((match) => Number(match[1])))].sort((a, b) => a - b);
}

export function agree(ownText, checkerText) {
  const own = { verdict: verdictOf(ownText), pids: pidsOf(ownText) };
  const checker = { verdict: verdictOf(checkerText), pids: pidsOf(checkerText) };
  const verdictSame = own.verdict === checker.verdict;
  const pidsSame = JSON.stringify(own.pids) === JSON.stringify(checker.pids);
  return { agree: verdictSame && pidsSame, verdictSame, pidsSame, own, checker };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const res = agree(process.argv[2] || '', process.argv[3] || '');
  console.log('HEAVY_AGREE ' + (res.agree ? 'yes' : 'NO') + ' own=' + res.own.verdict + '[' + res.own.pids.join(',') + '] checker=' + res.checker.verdict + '[' + res.checker.pids.join(',') + ']');
  process.exit(res.agree ? 0 : 1);
}
