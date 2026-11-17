#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { answerLocalGrant, isLoopbackRequest } from './replacements/grant-local.mjs';

const PORT = Number(process.env.TEST_PORT || 4311);
const WORLD = 'bc986e1b-5a08-4b6a-adf3-ef93cd1597b4';
const failures = [];
const expect = (ok, label) => { if (!ok) failures.push(label); };

const fake = (host, origin, address = '127.0.0.1') => ({ headers: { host, ...(origin === undefined ? {} : { origin }) }, socket: { remoteAddress: address } });
expect(isLoopbackRequest(fake(`127.0.0.1:${PORT}`), PORT), 'loopback host accepted');
expect(isLoopbackRequest(fake(`localhost:${PORT}`, `http://localhost:${PORT}`), PORT), 'localhost origin accepted');
expect(!isLoopbackRequest(fake(`evil.example:${PORT}`), PORT), 'foreign host rejected');
expect(!isLoopbackRequest(fake(`127.0.0.1:${PORT}`, 'https://evil.example'), PORT), 'foreign origin rejected');
expect(!isLoopbackRequest(fake(`127.0.0.1:${PORT}`, undefined, '10.1.2.3'), PORT), 'non-loopback socket rejected');
expect(answerLocalGrant('{"world":"not-a-world"}', Date.now()) === null, 'bad world refused');
const shape = answerLocalGrant(JSON.stringify({ world: WORLD }), Date.now());
expect(shape && ['grantWire', 'personaId', 'exp', 'presentationWire', 'edge'].every((k) => k in shape), 'world-only grant keys');
const admitted = answerLocalGrant(JSON.stringify({ world: WORLD, edge: true }), Date.now());
expect(admitted && ['grantWire', 'personaId', 'exp', 'presentationWire', 'admitted', 'mediaPass'].every((k) => k in admitted), 'edge grant keys');
expect(shape && shape.grantWire.split('.').length === 3, 'grant token has three parts');

const request = (host, { method = 'POST', origin, body = JSON.stringify({ world: WORLD }), path = '/api/session/grant' } = {}) => new Promise((resolve, reject) => {
  const headers = { host, 'content-type': 'application/json', 'content-length': Buffer.byteLength(body) };
  if (origin !== undefined) headers.origin = origin;
  const req = http.request({ host: '127.0.0.1', port: PORT, path, method, headers }, (res) => {
    let text = '';
    res.on('data', (c) => { text += c; });
    res.on('end', () => resolve({ status: res.statusCode, text }));
  });
  req.on('error', reject);
  req.end(body);
});

const server = spawn(process.execPath, [fileURLToPath(new URL('./serve-local.mjs', import.meta.url))], {
  env: { ...process.env, SNAPSHOT_ROOT: process.env.SNAPSHOT_ROOT || '/workspace/signal', PORT: String(PORT), HOST: '127.0.0.1' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('server did not start')), 15000);
    server.stdout.on('data', (c) => { if (String(c).includes('local Spawn snapshot')) { clearTimeout(timer); resolve(); } });
    server.on('exit', (code) => reject(new Error('server exited ' + code)));
  });
  const loop = await request(`127.0.0.1:${PORT}`);
  expect(loop.status === 200, 'loopback grant status 200, got ' + loop.status);
  expect(loop.status === 200 && 'grantWire' in JSON.parse(loop.text), 'loopback grant body has grantWire');
  const foreignHost = await request(`evil.example:${PORT}`);
  expect(foreignHost.status === 503, 'foreign Host gets the 503 stub, got ' + foreignHost.status);
  const foreignOrigin = await request(`127.0.0.1:${PORT}`, { origin: 'https://evil.example' });
  expect(foreignOrigin.status === 503, 'foreign Origin gets the 503 stub, got ' + foreignOrigin.status);
  const getGrant = await request(`127.0.0.1:${PORT}`, { method: 'GET' });
  expect(getGrant.status === 503, 'GET grant gets the 503 stub, got ' + getGrant.status);
  const sdk = await request(`127.0.0.1:${PORT}`, { path: '/api/sdk/v1/x/agent/rooms' });
  expect(sdk.status === 503, 'sdk call stays the 503 stub, got ' + sdk.status);
  console.log(`grant loopback=${loop.status} foreignHost=${foreignHost.status} foreignOrigin=${foreignOrigin.status} get=${getGrant.status} sdk=${sdk.status}`);
} catch (error) {
  failures.push(String(error.message || error));
} finally {
  server.kill('SIGTERM');
}
console.log('grant-local failures=' + failures.length);
for (const f of failures) console.error(f);
process.exit(failures.length ? 1 : 0);
