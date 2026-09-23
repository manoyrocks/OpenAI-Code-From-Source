import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {makeHandler,outputText} from './server.mjs';
test('collects only text messages and rejects incomplete output',()=>{
  assert.equal(outputText({status:'completed',output:[{type:'reasoning'},{type:'message',content:[{type:'output_text',text:'A'},{type:'output_text',text:'B'}]}]}),'A\nB');
  assert.throws(()=>outputText({status:'incomplete',output:[]}));assert.throws(()=>outputText({status:'completed',output:[]}));
});
async function withServer(run,options={}){
  const server=http.createServer(makeHandler(options));await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin=`http://127.0.0.1:${server.address().port}`;
  try{await run(origin);}finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
}
const post=(origin,body,headers={})=>fetch(origin+'/api/respond',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
test('missing configuration produces an actionable error',()=>withServer(async origin=>assert.equal((await post(origin,{input:'Hi'})).status,503)));
test('rejects cross-origin requests before calling upstream',()=>withServer(async origin=>assert.equal((await post(origin,{input:'Hi'},{Origin:'https://untrusted.example'})).status,403)));
test('validates inputs without spending tokens',()=>withServer(async origin=>{assert.equal((await post(origin,{input:''})).status,400);assert.equal((await post(origin,{input:'x'.repeat(6001)})).status,400);},{apiKey:'test',model:'fixture',fetchImpl:()=>assert.fail('Must not call upstream')}));
test('sends configured contract and extracts completed output',()=>withServer(async origin=>{const response=await post(origin,{input:'Hi'});assert.equal(response.status,200);assert.deepEqual(await response.json(),{text:'Hello'});},{apiKey:'test',model:'fixture',fetchImpl:async(url,options)=>{assert.equal(url,'https://api.openai.com/v1/responses');assert.deepEqual(JSON.parse(options.body),{model:'fixture',input:'Hi',max_output_tokens:1200,store:false});return Response.json({status:'completed',output:[{type:'message',content:[{type:'output_text',text:'Hello'}]}]});}}));
test('does not leak upstream errors',()=>withServer(async origin=>{const response=await post(origin,{input:'Hi'});assert.equal(response.status,502);assert.equal((await response.json()).error,'Upstream request failed.');},{apiKey:'test',model:'fixture',fetchImpl:async()=>new Response('private details',{status:401})}));
