"""Preserva relatórios primários para conferência editorial; não inventa campos ausentes."""
import re
import json
from pathlib import Path
from urllib.request import urlopen
import fitz
ROOT=Path(__file__).resolve().parents[1]
RAW=ROOT/'data'/'raw'
html=urlopen('https://atlasintel.org/polls/general-release-polls',timeout=40).read().decode('utf-8')
(RAW/'atlas-public-polls.html').write_text(html,encoding='utf-8')
urls=list(dict.fromkeys(re.findall(r'https://cdn1\.atlasintel\.org/[^"<>\s]+\.pdf',html)))
print('reports',len(urls),'pagination',re.findall(r'href="([^"]*page=[^"]*)"',html)[:6])
print('national reports',[u for u in urls if 'nacional' in u.lower()][:10])
url='https://cdn1.atlasintel.org/pesquisa_atlas_bloomberg__nacional_261019_1_4df1944681acf96f.pdf'
content=urlopen(url,timeout=40).read()
(RAW/'atlas-national-2026-10-19.pdf').write_bytes(content)
document=fitz.open(stream=content,filetype='pdf')
text='\n\n'.join(f'PAGE {i+1}\n'+page.get_text() for i,page in enumerate(document))
(RAW/'atlas-national-2026-10-19.txt').write_text(text,encoding='utf-8')
print('pages',len(document))
print(text[:18000].encode('ascii','backslashreplace').decode())
