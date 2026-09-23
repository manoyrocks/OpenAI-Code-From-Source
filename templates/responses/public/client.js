document.querySelector('form').addEventListener('submit',async event=>{
  event.preventDefault();const button=document.querySelector('button');button.disabled=true;document.getElementById('status').textContent='Waiting for response…';document.getElementById('result').textContent='';
  try{const response=await fetch('/api/respond',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({input:document.getElementById('input').value})});const body=await response.json();if(!response.ok)throw Error(body.error||'Request failed');document.getElementById('result').textContent=body.text;document.getElementById('status').textContent='Complete';}catch(error){document.getElementById('status').textContent=error.message;}finally{button.disabled=false;}
});
