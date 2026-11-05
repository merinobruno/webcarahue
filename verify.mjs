import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(resolve(root, 'dist/index.html'), 'utf8');
const script = readFileSync(resolve(root, 'dist/app.js'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML ids must be unique');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const path = match[1];
  if (!/^(https?:|tel:)/.test(path)) assert.ok(existsSync(resolve(root, 'dist', path)), `Missing local asset: ${path}`);
}
for (const match of html.matchAll(/href="#([^"/]+)"/g)) assert.ok(ids.includes(match[1]), `Missing anchor: ${match[1]}`);
for (const key of ['ortopedia', 'cirugia', 'audifonos', 'estetica', 'deportes', 'alquileres']) {
  assert.ok(html.includes(`href="#area/${key}"`), `Missing area link: ${key}`);
  assert.ok(script.includes(`${key}: { title:`), `Missing area data: ${key}`);
}
for (const link of ['c05m4i', 'pnnjna', '8pdguh', 'v8d94i', 'rtgh5n']) assert.ok(script.includes(`https://wa.link/${link}`));
assert.ok(!html.includes('mailto:'), 'Do not invent an email address');
assert.ok(!html.includes('<form'), 'Contact routing must not imply server submission');
console.log('Passed: unique ids, local assets, anchors, six specialty routes, five official contact channels, no fake form or email.');
