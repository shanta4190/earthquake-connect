import assert from 'node:assert/strict';
import { onRequest } from './functions/api/health.js';

const response = await onRequest({ env: { ENVIRONMENT: 'observation' } });
assert.equal(response.status, 200);
assert.equal(response.headers.get('content-type'), 'application/json');
assert.equal(response.headers.get('cache-control'), 'no-store');

const body = await response.json();
assert.equal(body.ok, true);
assert.equal(body.service, 'earthquake-connect');
assert.equal(body.mode, 'observation-only');
assert.equal(body.officialWarning, false);
assert.equal(body.version, '4.0');
assert.equal(body.frontend, 'cloudflare-pages');
assert.equal(body.dataPlane, 'separate');
assert.deepEqual(Object.keys(body).sort(), [
  'dataPlane',
  'frontend',
  'mode',
  'officialWarning',
  'ok',
  'service',
  'version',
]);

console.log('PASS: health endpoint contract is valid');
