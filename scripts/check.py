import json, pathlib, urllib.parse, zipfile
from html.parser import HTMLParser
ROOT=pathlib.Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):super().__init__();self.refs=[];self.ids=set();self.main=False
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='main':self.main=True
        if 'id' in a:
            assert a['id'] not in self.ids,'Duplicate HTML id';self.ids.add(a['id'])
        for key in ['href','src']:
            if key in a:self.refs.append(a[key])
pages=list((ROOT/'dist').glob('*.html'))
for path in pages:
    page=Page();page.feed(path.read_text(encoding='utf8'));assert page.main,path
    for ref in page.refs:
        url=urllib.parse.urlsplit(ref)
        if url.scheme or url.netloc or not url.path:continue
        assert (path.parent/url.path).is_file(),f'Broken local reference: {path.name} -> {ref}'
data=json.loads((ROOT/'content.json').read_text(encoding='utf8'))
module=json.loads((ROOT/'modules'/'introduction.json').read_text(encoding='utf8'))
data['chapters']=module['chapters']+data['chapters']
data['sources']+=module['sources']
source_ids={s['id'] for s in data['sources']}
assert len(source_ids)==len(data['sources'])
assert all(s.get('title') and s.get('url','').startswith('https://') for s in data['sources'])
assert len({c['slug'] for c in data['chapters']})==len(data['chapters'])
for c in data['chapters']:
    assert c['sources'] and set(c['sources'])<=source_ids
    assert len(c['apply'])==5 and len(c['sections'])>=3
    assert (ROOT/'book'/(c['slug']+'.md')).exists()
catalog=json.loads((ROOT/'dist'/'templates.json').read_text(encoding='utf8'))
for name,files in catalog.items():
    for required in ['README.md','AGENTS.md','SOURCES.md','package.json','server.mjs','public/index.html','.env.example']:
        assert required in files,(name,required)
    for path,body in files.items():
        assert pathlib.PurePosixPath(path).is_absolute() is False and '..' not in pathlib.PurePosixPath(path).parts
        assert body==(ROOT/'templates'/name/path).read_text(encoding='utf8')
with zipfile.ZipFile(ROOT/'dist'/'downloads'/'openai-from-docs.zip') as archive:
    assert archive.testzip() is None
    assert not any('/.openai/' in n or '/.git/' in n for n in archive.namelist())
assert len(pages)==len(data['chapters'])+7
landing=(ROOT/'dist'/'introduction.html').read_text(encoding='utf8')
app=(ROOT/'dist'/'app.js').read_text(encoding='utf8')
theme_css=(ROOT/'dist'/'journey.css').read_text(encoding='utf8')
assert landing.count('class="quest-node"')==4
assert landing.count('data-complete-step')==0  # completion controls live on lesson pages
assert all((ROOT/'dist'/(c['slug']+'.html')).read_text(encoding='utf8').count('data-complete-step')==1 for c in module['chapters'])
assert all(f'value="{palette}"' in landing for palette in ['ocean','violet','ember','forest'])
assert 'ofd-genai-101-progress' in app and '100 XP' in app and 'badgeNames' in app and "id=\"palette\"" in landing
assert '@media(prefers-reduced-motion:reduce)' in theme_css and 'perspective:' in theme_css
print(f'PASS: {len(pages)} pages, local references, chapter provenance, 2 template catalogs and portable ZIP.')
