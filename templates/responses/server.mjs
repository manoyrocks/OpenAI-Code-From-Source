import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';

export function outputText(response) {
  if(response.status !== 'completed') throw Error('Response incomplete');
  const text=(response.output??[]).filter(item=>item.type==='message').flatMap(item=>item.content??[]).filter(item=>item.type==='output_text').map(item=>item.text).join('\n');
  if(!text) throw Error('No text output');
  return text;
}
export function makeHandler({apiKey,model,fetchImpl=fetch}={}) {
  return async function handler(req,res) {
    res.setHeader('X-Content-Type-Options','nosniff');
    res.setHeader('Cache-Control','no-store');
    res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
    const send=(status,value)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(value));};
    // Loopback-only local starter. A public service must add real identity and quotas.
    if(!/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(req.headers.host??'')) return send(403,{error:'Invalid host'});
    if(req.method==='GET'&&['/','/client.js','/style.css'].includes(req.url)){
      const file=req.url==='/'?'index.html':req.url.slice(1);
      try{const content=await readFile(new URL(`./public/${file}`,import.meta.url));res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html; charset=utf-8');res.end(content);}catch{send(500,{error:'Static asset unavailable'});}return;
    }
    if(req.url!=='/api/respond'||req.method!=='POST')return send(404,{error:'Not found'});
    if(req.headers.origin!==`http://${req.headers.host}`)return send(403,{error:'Same-origin request required'});
    if(!req.headers['content-type']?.startsWith('application/json'))return send(415,{error:'JSON required'});
    if(!apiKey||!model)return send(503,{error:'Configure OPENAI_API_KEY and OPENAI_MODEL on the server.'});
    try{
      let body='',bytes=0;
      for await(const chunk of req){bytes+=chunk.length;if(bytes>20000){send(413,{error:'Request too large'});return;}body+=chunk.toString();}
      let input;try{input=JSON.parse(body).input;}catch{return send(400,{error:'Invalid JSON'});}
      if(typeof input!=='string'||!input.trim()||input.length>6000)return send(400,{error:'Enter 1–6000 characters.'});
      const upstream=await fetchImpl('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({model,input,max_output_tokens:1200,store:false}),signal:AbortSignal.timeout(45000)});
      if(!upstream.ok)return send(upstream.status===429?429:502,{error:upstream.status===429?'Upstream rate limit. Try later.':'Upstream request failed.'});
      const response=await upstream.json();let text;try{text=outputText(response);}catch{return send(502,{error:'No completed text response. Try a smaller request.'});}
      return send(200,{text});
    }catch{return send(502,{error:'Request failed or timed out.'});}
  };
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  const server=http.createServer(makeHandler({apiKey:process.env.OPENAI_API_KEY,model:process.env.OPENAI_MODEL}));
  server.requestTimeout=60000;server.headersTimeout=10000;
  const port=Number(process.env.PORT||3000);server.listen(port,'127.0.0.1',()=>console.log(`Local starter: http://127.0.0.1:${port}`));
}
