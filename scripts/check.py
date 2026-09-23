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
source_ids={s['id'] for s in data['sources']}
assert len(source_ids)==len(data['sources'])
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
print(f'PASS: {len(pages)} pages, local references, chapter provenance, 2 template catalogs and portable ZIP.')
