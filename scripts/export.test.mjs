import test from 'node:test';
import assert from 'node:assert/strict';
import {makeZip} from '../dist/zip.mjs';
import {readFile} from 'node:fs/promises';
test('ZIP rejects parent traversal and absolute paths',()=>{
  for(const path of ['../escape','/absolute','a/../escape','a//b','C:/escape','a\\b']) assert.throws(()=>makeZip({[path]:'bad'}));
});
test('ZIP stores UTF-8 files and complete central-directory offsets',async()=>{
  const data=new Uint8Array(await makeZip({'repo/README.md':'Unicode: café →','repo/.env.example':'KEY=\n'}).arrayBuffer());
  const view=new DataView(data.buffer),end=data.length-22;
  assert.equal(view.getUint32(0,true),0x04034b50);assert.equal(view.getUint32(end,true),0x06054b50);assert.equal(view.getUint16(end+10,true),2);
  const central=view.getUint32(end+16,true);assert.equal(view.getUint32(central,true),0x02014b50);assert.equal(central+view.getUint32(end+12,true),end);
  assert.ok(new TextDecoder().decode(data).includes('Unicode: café →'));
});
test('each export contains runnable application files',async()=>{
  const catalog=JSON.parse(await readFile(new URL('../dist/templates.json',import.meta.url),'utf8'));
  for(const files of Object.values(catalog)){
    assert.ok(files['server.mjs']);assert.ok(files['public/index.html']);assert.ok(files['AGENTS.md']);assert.equal(JSON.parse(files['package.json']).scripts.test,'node --test');
    const blob=makeZip(Object.fromEntries(Object.entries(files).map(([p,c])=>['project/'+p,c])));assert.ok(blob.size>1000);
  }
});
