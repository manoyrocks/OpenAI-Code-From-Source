import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('entrypoint includes accessible document metadata and its local stylesheet',async()=>{
  const html=await readFile(new URL('./public/index.html',import.meta.url),'utf8');
  assert.match(html,/<html lang="en">/);assert.match(html,/<main>/);assert.match(html,/<title>[^<]+<\/title>/);
  await readFile(new URL('./public/style.css',import.meta.url));
});
