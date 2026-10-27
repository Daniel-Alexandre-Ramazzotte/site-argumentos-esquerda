"""Importação de séries públicas do Banco Mundial; preserva unidades e fontes."""
import gzip
import json
from pathlib import Path
from urllib.request import urlopen
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parents[1]
RAW=ROOT/'data'/'raw'
RAW.mkdir(parents=True,exist_ok=True)
def fetch(code):
    url=f'https://api.worldbank.org/v2/country/BRA/indicator/{code}?format=json&per_page=1000'
    raw=urlopen(url,timeout=45).read()
    if raw.startswith(b'\x1f\x8b'):raw=gzip.decompress(raw)
    data=json.loads(raw.decode('utf-8-sig'))
    (RAW/f'worldbank-{code}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
    rows=data[1]
    points=sorted([{'year':int(r['date']),'value':float(r['value'])} for r in rows if r['value'] is not None and int(r['date'])<=2025],key=lambda r:r['year'])
    if not points:raise ValueError(f'Nenhum valor: {code}')
    return code,{'points':points,'source':url,'label':rows[0]['indicator']['value']}
result={}
with ThreadPoolExecutor(max_workers=3) as pool:
    for code,data in pool.map(fetch,['NV.IND.MANF.ZS','NV.IND.MANF.KD','IP.JRN.ARTC.SC']):
        result[code]=data
        print(code,len(data['points']),data['points'][:2],data['points'][-2:])
(ROOT/'data'/'development.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
