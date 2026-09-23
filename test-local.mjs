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
assert.equal(body.environment, 'observation');
assert.equal(body.officialWarning, false);
assert.equal(body.official_warning, false);
assert.equal(typeof body.timestamp, 'string');
assert.ok(!Number.isNaN(Date.parse(body.timestamp)));

console.log('PASS: health endpoint contract is valid');
