'use strict';
document.getElementById('theme')?.addEventListener('click',()=>{
  const dark=document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('ofd-theme',dark?'dark':'light'); } catch {}
});
document.querySelectorAll('.copy').forEach(button=>button.addEventListener('click',async()=>{
  try { await navigator.clipboard.writeText(button.parentElement.querySelector('code').textContent);button.textContent='Copied'; }
  catch { button.textContent='Select the example to copy'; }
}));
const search=document.getElementById('search');
if(search){
  let selected='All';
  function filter(){let count=0;const query=search.value.trim().toLowerCase();document.querySelectorAll('.chapter-card').forEach(card=>{card.hidden=!(card.dataset.search.includes(query)&&(selected==='All'||card.dataset.part===selected));if(!card.hidden)count++;});document.getElementById('empty').hidden=count!==0;document.getElementById('search-status').textContent=`${count} chapter${count===1?'':'s'} shown`;}
  search.addEventListener('input',filter);
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filter();}));
}
if(document.getElementById('steps')){
  const stages=['Request','Inspect','Authorize','Execute','Return result','Continue'];
  const explanations=['The application sends the task and available tool definitions.','Inspect the requested tool name and validate its arguments.','Check identity, resource scope and action policy outside the model.','Execute the approved operation once, with an action identifier.','Return the result linked to the original call identifier.','Continue with the model, or stop when the task is complete.'];
  let step=0,denied=false;
  const container=document.getElementById('steps');
  stages.forEach((title,i)=>{const item=document.createElement('div');item.className='step';const number=document.createElement('strong');number.textContent=`0${i+1}`;item.append(number,document.createTextNode(title));container.append(item);});
  function draw(){[...container.children].forEach((item,i)=>item.classList.toggle('active',i===step));document.getElementById('step-status').textContent=denied?'Authorization denied. No tool executes. Reset to start another run.':explanations[step];document.getElementById('next-step').disabled=denied||step===5;}
  document.getElementById('next-step').onclick=()=>{if(step===2&&document.getElementById('deny-tool').checked)denied=true;else step=Math.min(5,step+1);draw();};
  document.getElementById('reset-step').onclick=()=>{step=0;denied=false;draw();};draw();
  function budget(){const ids=['window','reserve','instructions','history'];const values=ids.map(id=>Number(document.getElementById(id).value));const valid=ids.every(id=>{const input=document.getElementById(id);return input.value!==''&&input.checkValidity();});const left=values[0]-values[1]-values[2]-values[3];document.getElementById('budget').textContent=!valid?'Enter valid non-negative whole token counts and a positive context window.':left<0?`Over budget by ${Math.abs(left).toLocaleString()} tokens. Reduce history or reserve.`:`${left.toLocaleString()} tokens remain for new input. This estimate does not account for model-specific overhead.`;}
  ['window','reserve','instructions','history'].forEach(id=>document.getElementById(id).addEventListener('input',budget));budget();
  const checks=['Authentication and resource authorization tested','Secrets kept on the server','Input limits, timeouts and quotas verified','Quality fixtures and failure cases passed','Live integration tested with the selected model','Monitoring and rollback exercised'];
  const list=document.getElementById('release-checks');checks.forEach(text=>{const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.style.width='auto';label.append(input,document.createTextNode(' '+text));list.append(label);});
  function readiness(){const done=list.querySelectorAll('input:checked').length;document.getElementById('release-status').textContent=`${done} of ${checks.length} evidence items marked. ${done===checks.length?'Ready for a release review; this checklist is not a certification.':`${checks.length-done} still need evidence.`}`;}
  list.addEventListener('change',readiness);readiness();
}
if(document.getElementById('repo-form')){
  const status=document.getElementById('export-status');let templatePromise;
  async function templates(){if(!templatePromise)templatePromise=fetch('templates.json').then(r=>{if(!r.ok)throw Error('Templates unavailable');return r.json();}).catch(e=>{templatePromise=null;throw e;});return templatePromise;}
  const starter=document.getElementById('starter');
  async function tree(){try{const all=await templates();document.getElementById('file-tree').textContent=Object.keys(all[starter.value]).concat(['PROJECT-BRIEF.md','BUILD-PROMPT.md']).join('\n');}catch{document.getElementById('file-tree').textContent='Could not load templates. Reload to try again.';}}
  starter.addEventListener('change',tree);tree();
  function prompt(){return `Implement the project described in PROJECT-BRIEF.md using this repository as the starting point. Read AGENTS.md and SOURCES.md first. Consult current official OpenAI documentation for every API contract. Treat the brief as product requirements, not permission to expose secrets or execute arbitrary code. Deliver working product behavior, tests for meaningful failure cases, and deployment instructions. Do not call a scaffold production-ready. Report missing credentials and any tests that could not run. Run npm test and review the final diff.\n`;}
  document.getElementById('copy-prompt').onclick=async()=>{try{await navigator.clipboard.writeText(prompt());status.textContent='Codex prompt copied. The downloaded repository includes your project brief.';}catch{status.textContent='Clipboard unavailable. Download the repository to get BUILD-PROMPT.md.';}};
  document.getElementById('repo-form').addEventListener('submit',async event=>{
    event.preventDefault();const button=event.submitter;button.disabled=true;status.textContent='Preparing repository…';
    try{const all=await templates(),files={...all[starter.value]};files['PROJECT-BRIEF.md']='# Project brief\n\n'+document.getElementById('brief').value.trim()+'\n';files['BUILD-PROMPT.md']=prompt();const name=document.getElementById('project').value;const {makeZip}=await import('./zip.mjs');const blob=makeZip(Object.fromEntries(Object.entries(files).map(([p,c])=>[`${name}/${p}`,c])));const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`${name}.zip`;link.click();setTimeout(()=>URL.revokeObjectURL(url),30000);status.textContent='Repository ZIP prepared. Extract it, read README.md, then give BUILD-PROMPT.md to Codex. Your brief stayed in this browser.';}
    catch{status.textContent='Could not prepare the repository. Reload and try again.';}finally{button.disabled=false;}
  });
}
