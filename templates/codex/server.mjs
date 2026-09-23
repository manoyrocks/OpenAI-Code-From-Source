import http from 'node:http';
import {readFile} from 'node:fs/promises';
const allowed=new Map([['/','index.html'],['/style.css','style.css']]);
http.createServer(async(req,res)=>{
  const file=allowed.get(req.url);if(req.method!=='GET'||!file){res.writeHead(404);return res.end('Not found');}
  try{const body=await readFile(new URL('./public/'+file,import.meta.url));res.setHeader('Content-Type',file.endsWith('.css')?'text/css':'text/html; charset=utf-8');res.setHeader('X-Content-Type-Options','nosniff');res.end(body);}catch{res.writeHead(500);res.end('Unable to load page');}
}).listen(3000,'127.0.0.1',()=>console.log('Local app: http://127.0.0.1:3000'));
