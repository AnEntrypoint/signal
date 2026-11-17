import { randomBytes } from 'node:crypto';

const WORLD = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const GRANT_TTL_MS = 60 * 60 * 1000;

export function loopbackHosts(port) {
  return new Set([`127.0.0.1:${port}`, `localhost:${port}`]);
}

export function loopbackOrigins(port) {
  return new Set([`http://127.0.0.1:${port}`, `http://localhost:${port}`]);
}

const LOOPBACK_ADDRESSES = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);

export function isLoopbackRequest(req, port) {
  if (!loopbackHosts(port).has(req.headers.host)) return false;
  if (!LOOPBACK_ADDRESSES.has(req.socket.remoteAddress)) return false;
  if (req.headers.origin !== undefined && !loopbackOrigins(port).has(req.headers.origin)) return false;
  return true;
}

function unsigned(type, claims) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${encode({ alg: 'none', typ: type, local: true })}.${encode(claims)}.`;
}

export function answerLocalGrant(bodyText, nowMs) {
  let input;
  try {
    input = JSON.parse(bodyText);
  } catch {
    return null;
  }
  if (!input || typeof input !== 'object' || !WORLD.test(input.world)) return null;
  const personaId = 'local-' + randomBytes(15).toString('hex').slice(0, 29);
  const exp = nowMs + GRANT_TTL_MS;
  const claims = { world: input.world, persona: personaId, exp, local: true };
  const grantWire = unsigned('local-grant', claims);
  const presentationWire = unsigned('local-presentation', claims);
  if (input.edge === undefined) {
    return { grantWire, personaId, exp, presentationWire, edge: true };
  }
  return { grantWire, personaId, exp, presentationWire, admitted: true, mediaPass: unsigned('local-media', claims) };
}
