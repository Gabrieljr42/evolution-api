import assert from 'node:assert/strict';

import { validate } from 'jsonschema';

import { webhookSchema } from './webhook.schema';
import { persistedWebhookUrl } from './webhook.url';

const padded = { webhook: { enabled: true, url: '  https://example.com/hook  ' } };
const paddedResult = validate(padded, webhookSchema);
assert.equal(paddedResult.valid, false, 'whitespace-padded URL must be rejected');
console.log('whitespace-padded URL rejected');

const ftp = { webhook: { enabled: true, url: 'ftp://example.com/hook' } };
const ftpResult = validate(ftp, webhookSchema);
assert.equal(ftpResult.valid, false, 'URL without http/https must be rejected');
console.log('URL without http/https rejected');

const https = { webhook: { enabled: true, url: 'https://example.com/hook' } };
const httpsResult = validate(https, webhookSchema);
assert.equal(httpsResult.valid, true, 'normal https:// URL must be accepted');
console.log('normal https:// URL accepted');

const persisted = persistedWebhookUrl('  https://example.com/hook  ');
assert.equal(persisted, 'https://example.com/hook');
console.log('persisted value is trimmed', persisted);
