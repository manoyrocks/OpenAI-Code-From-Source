"""Create a portable text report from the original HTML study, preserving links."""
from html.parser import HTMLParser
from pathlib import Path
class Markdown(HTMLParser):
    def __init__(self):super().__init__();self.out=[];self.link=''
    def handle_starttag(self,tag,attrs):
        if tag in ['h1','h2','h3']:self.out.append('\n\n'+'#'*int(tag[1])+' ')
        elif tag in ['p','tr','div']:self.out.append('\n\n')
        elif tag in ['td','th']:self.out.append(' | ')
        elif tag=='a':self.link=dict(attrs).get('href','');self.out.append('[')
        elif tag=='code':self.out.append('`')
        elif tag=='br':self.out.append(' ')
    def handle_endtag(self,tag):
        if tag=='a':self.out.append(']('+self.link+')')
        elif tag=='code':self.out.append('`')
    def handle_data(self,data):self.out.append(data)
root=Path(__file__).resolve().parents[1]
parser=Markdown();parser.feed((root/'research'/'study.html').read_text(encoding='utf8'))
(root/'research'/'engineering-report.md').write_text(''.join(parser.out).strip()+'\n',encoding='utf8')
