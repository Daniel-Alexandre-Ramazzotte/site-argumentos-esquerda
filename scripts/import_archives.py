"""Consulta e preserva séries históricas; não emenda indicadores diferentes."""
import gzip
import json
import sys
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urlencode
from concurrent.futures import ThreadPoolExecutor
from math import prod

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'data' / 'raw'
RAW.mkdir(parents=True, exist_ok=True)
def read(url):
    data = urlopen(url, timeout=45).read()
    if data.startswith(b'\x1f\x8b'):
        data = gzip.decompress(data)
    return json.loads(data.decode('utf-8-sig'))
def save(name,data):
    (RAW / f'{name}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')

if '--social' in sys.argv:
    path=ROOT/'data'/'archives.json'
    result=json.loads(path.read_text(encoding='utf-8'))
    url="https://www.ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='DISOC_PPY')"
    raw=read(url);save('poverty-pnad-historical',raw)
    rows=raw.get('value',[])
    valid=[{'year':int(r['VALDATA'][:4]),'value':float(r['VALVALOR'])} for r in rows if r.get('VALVALOR') is not None]
    valid.sort(key=lambda r:r['year'])
    if not valid or len({r['year'] for r in valid})!=len(valid):raise ValueError('Série vazia ou com múltiplas regiões')
    result['povertyHistorical']={'points':valid,'source':url,'code':'DISOC_PPY'}
    rows=json.loads((RAW/'atlas-homicide-values.json').read_text(encoding='utf-8'))
    valid=sorted([{'year':int(r['periodo'][:4]),'value':round(float(r['valor']),2)} for r in rows if r['regiao_id']==1076],key=lambda r:r['year'])
    result['homicideHistorical']={'points':valid,'source':'https://www.ipea.gov.br/dados-api/series-values/20/1','region':1076}
    path.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    for key in ('povertyHistorical','homicideHistorical'):
        print(key,len(result[key]['points']),result[key]['points'][:2],result[key]['points'][-2:])
    sys.exit(0)

if '--discover' in sys.argv:
    def metadata():
        data = read('https://www.ipeadata.gov.br/api/odata4/Metadados')
        save('ipeadata-metadata',data)
        for s in data.get('value',[]):
            title = s.get('SERNOME','').lower()
            if ('pobreza' in title or 'homic' in title) and 'taxa' in title:
                print(json.dumps(s,ensure_ascii=True)[:4000])
    def homicide():
        for name,url in [('atlas-homicide-metadata','https://www.ipea.gov.br/cms/api/series/20'),('atlas-homicide-values','https://www.ipea.gov.br/dados-api/series-values/20/1')]:
            try:
                data=read(url);save(name,data)
                print(name,json.dumps(data,ensure_ascii=True)[:2200])
            except Exception as e:
                print(name,type(e).__name__,str(e))
    with ThreadPoolExecutor(max_workers=2) as pool:
        for future in [pool.submit(metadata),pool.submit(homicide)]:future.result()
    sys.exit(0)

def igp_chunk(first):
    last=min(first+9,2025)
    url='https://api.bcb.gov.br/dados/serie/bcdata.sgs.190/dados?'+urlencode({'formato':'json','dataInicial':f'01/01/{first}','dataFinal':f'31/12/{last}'})
    data=read(url);save(f'igpdi-{first}-{last}',data)
    return data
monthly={}
with ThreadPoolExecutor(max_workers=4) as pool:
    for rows in pool.map(igp_chunk,range(1945,2026,10)):
        for r in rows:
            day,month,year=map(int,r['data'].split('/'))
            key=(year,month)
            if key in monthly:raise ValueError('Mês duplicado')
            monthly[key]=float(r['valor'])
annual=[]
for year in range(1945,2026):
    rates=[monthly[(year,m)] for m in range(1,13)]
    annual.append({'year':year,'value':round((prod(1+r/100 for r in rates)-1)*100,2)})
result={'igpdi':{'points':annual,'source':'https://www3.bcb.gov.br/sgspub/consultarvalores/consultarValoresSeries.do?method=consultarSeries&series=190','method':'Taxas mensais FGV, republicadas pelo BCB, série 190. Acumulado anual calculado por multiplicação de 12 fatores mensais publicados; pode diferir por arredondamento.'}}
(ROOT/'data'/'archives.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print('igpdi',annual[0],annual[-1],len(annual))
