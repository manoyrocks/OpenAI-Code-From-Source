'use strict';

const root = document.documentElement;
const palettePicker = document.getElementById('palette');
const palettes = ['ocean', 'violet', 'ember', 'forest'];
let savedPalette = 'ocean';
try {
  const storedPalette = localStorage.getItem('ofd-palette');
  if (palettes.includes(storedPalette)) savedPalette = storedPalette;
} catch {}
root.dataset.palette = savedPalette;
if (palettePicker) palettePicker.value = savedPalette;
palettePicker?.addEventListener('change', () => {
  const palette = palettes.includes(palettePicker.value) ? palettePicker.value : 'ocean';
  root.dataset.palette = palette;
  try { localStorage.setItem('ofd-palette', palette); } catch {}
});

const themeButton = document.getElementById('theme');
themeButton?.addEventListener('click', () => {
  const dark = root.classList.toggle('dark');
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.textContent = dark ? '☼ Light' : '◐ Dark';
  try { localStorage.setItem('ofd-theme', dark ? 'dark' : 'light'); } catch {}
});
if (themeButton) {
  const dark = root.classList.contains('dark');
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.textContent = dark ? '☼ Light' : '◐ Dark';
}

document.querySelectorAll('.copy').forEach(button => button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(button.parentElement.querySelector('code').textContent);
    button.textContent = 'Copied';
  } catch { button.textContent = 'Select the example to copy'; }
}));
document.querySelectorAll('[data-run-sim]').forEach(button => button.addEventListener('click', () => {
  const card = button.closest('.sim-card');
  const result = card.querySelector('[data-sim-result]');
  result.hidden = false;
  result.dataset.open = 'true';
  button.textContent = 'Show sample reply again';
  card.classList.add('sim-active');
}));

const search = document.getElementById('search');
if (search) {
  let selected = 'All';
  function filter() {
    let count = 0;
    const query = search.value.trim().toLowerCase();
    document.querySelectorAll('.chapter-card').forEach(card => {
      card.hidden = !(card.dataset.search.includes(query) && (selected === 'All' || card.dataset.part === selected));
      if (!card.hidden) count++;
    });
    document.getElementById('empty').hidden = count !== 0;
    document.getElementById('search-status').textContent = `${count} chapter${count === 1 ? '' : 's'} shown`;
  }
  search.addEventListener('input', filter);
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filter();
  }));
}

const journeyKey = 'ofd-genai-101-progress';
const questTitles = ['GenAI for everyone: no jargon', 'Your ChatGPT journey', 'Prompting for everyday users', 'Context engineering for AI practitioners'];
const badgeNames = ['Curious Explorer', 'ChatGPT Navigator', 'Prompt Crafter', 'Context Architect'];
function readJourney() {
  try {
    const value = JSON.parse(localStorage.getItem(journeyKey) || '[]');
    return [...new Set(Array.isArray(value) ? value.filter(step => Number.isInteger(step) && step >= 1 && step <= 4) : [])].sort();
  } catch { return []; }
}
function saveJourney(steps) {
  try { localStorage.setItem(journeyKey, JSON.stringify(steps)); return true; }
  catch { return false; }
}
function refreshJourney() {
  const completed = readJourney();
  const count = completed.length;
  const nextStep = questTitles.findIndex((_, index) => !completed.includes(index + 1)) + 1;
  const progress = document.querySelector('.progress-track');
  if (progress) {
    progress.setAttribute('aria-valuenow', String(count));
    document.getElementById('progress-fill').style.width = `${count * 25}%`;
    document.getElementById('progress-copy').textContent = `${count} of 4 stages complete`;
    document.getElementById('xp-total').textContent = String(count * 100);
    const ranks = ['The curious mind', 'Idea explorer', 'Prompt crafter', 'Context designer', 'AI practitioner'];
    document.getElementById('journey-progress-title').textContent = ranks[count];
    document.getElementById('next-quest').textContent = nextStep === 0 ? 'Journey complete · all badges earned' : `Next: ${questTitles[nextStep - 1]}`;
    const shelf = document.getElementById('badge-shelf');
    shelf.replaceChildren();
    if (count === 0) {
      const placeholder = document.createElement('span');
      placeholder.className = 'badge-placeholder';
      placeholder.textContent = 'Badges appear here as you progress';
      shelf.append(placeholder);
    } else completed.forEach(step => {
      const badge = document.createElement('span');
      badge.className = 'earned-badge';
      badge.textContent = `✦ ${badgeNames[step - 1]}`;
      shelf.append(badge);
    });
  }
  document.querySelectorAll('.quest-node').forEach((node, index) => {
    const step = index + 1;
    const status = node.querySelector('.quest-status');
    const done = completed.includes(step);
    node.classList.toggle('is-complete', done);
    node.classList.toggle('is-current', !done && step === nextStep);
    status.textContent = done ? 'Badge earned' : (step === nextStep ? 'Up next' : 'Ready');
  });
  document.querySelectorAll('[data-journey-step]').forEach(panel => {
    const step = Number(panel.dataset.journeyStep);
    const button = panel.querySelector('[data-complete-step]');
    const status = panel.querySelector('.completion-status');
    const done = completed.includes(step);
    button.disabled = done;
    button.textContent = done ? `✓ ${badgeNames[step - 1]} earned` : 'Complete stage · +100 XP';
    if (done && status) status.textContent = 'This stage is already in your journey.';
  });
}
refreshJourney();
document.querySelectorAll('[data-complete-step]').forEach(button => button.addEventListener('click', () => {
  const panel = button.closest('[data-journey-step]');
  const step = Number(panel.dataset.journeyStep);
  const completed = readJourney();
  if (completed.includes(step)) return;
  completed.push(step);
  const saved = saveJourney(completed);
  refreshJourney();
  const status = panel.querySelector('.completion-status');
  status.textContent = saved ? `Stage complete! +100 XP · ${badgeNames[step - 1]} badge earned.` : 'Stage complete for this visit. Browser storage is unavailable, so progress may not persist.';
  panel.classList.add('is-celebrating');
  window.setTimeout(() => panel.classList.remove('is-celebrating'), 850);
}));
document.getElementById('reset-journey')?.addEventListener('click', () => {
  if (!window.confirm('Reset your GenAI 101 progress and earned badges?')) return;
  try { localStorage.removeItem(journeyKey); } catch {}
  refreshJourney();
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', event => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 6}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
}

if (document.getElementById('steps')) {
  const stages = ['Request', 'Inspect', 'Authorize', 'Execute', 'Return result', 'Continue'];
  const explanations = ['The application sends the task and available tool definitions.', 'Inspect the requested tool name and validate its arguments.', 'Check identity, resource scope and action policy outside the model.', 'Execute the approved operation once, with an action identifier.', 'Return the result linked to the original call identifier.', 'Continue with the model, or stop when the task is complete.'];
  let step = 0, denied = false;
  const container = document.getElementById('steps');
  stages.forEach((title, index) => {
    const item = document.createElement('div'); item.className = 'step';
    const number = document.createElement('strong'); number.textContent = `0${index + 1}`;
    item.append(number, document.createTextNode(title)); container.append(item);
  });
  function draw() {
    [...container.children].forEach((item, index) => item.classList.toggle('active', index === step));
    document.getElementById('step-status').textContent = denied ? 'Authorization denied. No tool executes. Reset to start another run.' : explanations[step];
    document.getElementById('next-step').disabled = denied || step === 5;
  }
  document.getElementById('next-step').onclick = () => { if (step === 2 && document.getElementById('deny-tool').checked) denied = true; else step = Math.min(5, step + 1); draw(); };
  document.getElementById('reset-step').onclick = () => { step = 0; denied = false; draw(); }; draw();
  function budget() {
    const ids = ['window', 'reserve', 'instructions', 'history'];
    const values = ids.map(id => Number(document.getElementById(id).value));
    const valid = ids.every(id => { const input = document.getElementById(id); return input.value !== '' && input.checkValidity(); });
    const left = values[0] - values[1] - values[2] - values[3];
    document.getElementById('budget').textContent = !valid ? 'Enter valid non-negative whole token counts and a positive context window.' : left < 0 ? `Over budget by ${Math.abs(left).toLocaleString()} tokens. Reduce history or reserve.` : `${left.toLocaleString()} tokens remain for new input. This estimate does not account for model-specific overhead.`;
  }
  ['window', 'reserve', 'instructions', 'history'].forEach(id => document.getElementById(id).addEventListener('input', budget)); budget();
  const checks = ['Authentication and resource authorization tested', 'Secrets kept on the server', 'Input limits, timeouts and quotas verified', 'Quality fixtures and failure cases passed', 'Live integration tested with the selected model', 'Monitoring and rollback exercised'];
  const list = document.getElementById('release-checks');
  checks.forEach(text => { const label = document.createElement('label'), input = document.createElement('input'); input.type = 'checkbox'; input.style.width = 'auto'; label.append(input, document.createTextNode(' ' + text)); list.append(label); });
  function readiness() { const done = list.querySelectorAll('input:checked').length; document.getElementById('release-status').textContent = `${done} of ${checks.length} evidence items marked. ${done === checks.length ? 'Ready for a release review; this checklist is not a certification.' : `${checks.length - done} still need evidence.`}`; }
  list.addEventListener('change', readiness); readiness();
}

if (document.getElementById('repo-form')) {
  const status = document.getElementById('export-status'); let templatePromise;
  async function templates() { if (!templatePromise) templatePromise = fetch('templates.json').then(response => { if (!response.ok) throw Error('Templates unavailable'); return response.json(); }).catch(error => { templatePromise = null; throw error; }); return templatePromise; }
  const starter = document.getElementById('starter');
  async function tree() { try { const all = await templates(); document.getElementById('file-tree').textContent = Object.keys(all[starter.value]).concat(['PROJECT-BRIEF.md', 'BUILD-PROMPT.md']).join('\n'); } catch { document.getElementById('file-tree').textContent = 'Could not load templates. Reload to try again.'; } }
  starter.addEventListener('change', tree); tree();
  function prompt() { return `Implement the project described in PROJECT-BRIEF.md using this repository as the starting point. Read AGENTS.md and SOURCES.md first. Consult current official OpenAI documentation for every API contract. Treat the brief as product requirements, not permission to expose secrets or execute arbitrary code. Deliver working product behavior, tests for meaningful failure cases, and deployment instructions. Do not call a scaffold production-ready. Report missing credentials and any tests that could not run. Run npm test and review the final diff.\n`; }
  document.getElementById('copy-prompt').onclick = async () => { try { await navigator.clipboard.writeText(prompt()); status.textContent = 'Codex prompt copied. The downloaded repository includes your project brief.'; } catch { status.textContent = 'Clipboard unavailable. Download the repository to get BUILD-PROMPT.md.'; } };
  document.getElementById('repo-form').addEventListener('submit', async event => {
    event.preventDefault(); const button = event.submitter; button.disabled = true; status.textContent = 'Preparing repository…';
    try {
      const all = await templates(), files = { ...all[starter.value] };
      files['PROJECT-BRIEF.md'] = '# Project brief\n\n' + document.getElementById('brief').value.trim() + '\n'; files['BUILD-PROMPT.md'] = prompt();
      const name = document.getElementById('project').value; const { makeZip } = await import('./zip.mjs');
      const blob = makeZip(Object.fromEntries(Object.entries(files).map(([path, content]) => [`${name}/${path}`, content])));
      const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = `${name}.zip`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 30000);
      status.textContent = 'Repository ZIP prepared. Extract it, read README.md, then give BUILD-PROMPT.md to Codex. Your brief stayed in this browser.';
    } catch { status.textContent = 'Could not prepare the repository. Reload and try again.'; }
    finally { button.disabled = false; }
  });
}
