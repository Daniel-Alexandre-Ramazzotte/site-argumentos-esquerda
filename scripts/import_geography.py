"""Importa desagregações oficiais e mantém as respostas originais."""
import gzip
import json
import sys
from pathlib import Path
from urllib.request import urlopen
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parents[1]
RAW=ROOT/'data'/'raw'
RAW.mkdir(parents=True,exist_ok=True)
def read(url):
    data=urlopen(url,timeout=45).read()
    if data.startswith(b'\x1f\x8b'):data=gzip.decompress(data)
    return json.loads(data.decode('utf-8-sig'))
def save(name,data):
    (RAW/f'{name}.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
if '--inspect' in sys.argv:
    for table in (4099,5938,8888,7060):
        d=read(f'https://servicodados.ibge.gov.br/api/v3/agregados/{table}/metadados')
        print(table,d.get('nome'),d.get('periodicidade'))
        print('levels',d.get('nivelTerritorial'))
        print('variables',[(v['id'],v['nome']) for v in d.get('variaveis',[]) if table != 5938 or 'indústria' in v['nome'].lower()])
        for c in d.get('classificacoes',[]):
            print('classification',c['id'],[(v['id'],v['nome']) for v in c.get('categorias',[]) if any(s in v['nome'].lower() for s in ['transforma','geral','alimenta'])][:12])
    sys.exit(0)

if '--extended' in sys.argv:
    tasks=[]
    for name,table,start,end in [('prices-2006',2938,2006,2011),('prices-2012',1419,2012,2019),('prices-2020',7060,2020,2025)]:
        periods=','.join(f'{y}12' for y in range(start,end+1))
        tasks.append((name,f'https://apisidra.ibge.gov.br/values/t/{table}/n1/all/n6/all/n7/all/v/69/p/{periods}/c315/7169,7170?formato=json'))
    tasks.append(('industry-regional-share','https://apisidra.ibge.gov.br/values/t/5938/n1/all/n2/all/n3/all/v/520/p/all?formato=json'))
    tasks.append(('industry-regional-growth','https://apisidra.ibge.gov.br/values/t/8888/n1/all/n2/all/n3/all/v/11603/p/'+','.join(f'{y}12' for y in range(2003,2026))+'/c544/129316?formato=json'))
    for name,table in [('homicide-regions',2),('homicide-states',3)]:
        tasks.append((name,f'https://www.ipea.gov.br/dados-api/series-values/20/{table}'))
    def extended(task):
        name,url=task
        try:
            data=read(url);save(name,data);print(name,len(data) if isinstance(data,list) else str(data)[:100])
        except Exception as e:print(name,type(e).__name__,str(e))
    with ThreadPoolExecutor(max_workers=4) as pool:list(pool.map(extended,tasks))
    sys.exit(0)

def unemployment():
    periods=','.join(f'{y}04' for y in range(2012,2026))
    url=f'https://apisidra.ibge.gov.br/values/t/4099/n1/all/n2/all/n3/all/v/4099/p/{periods}?formato=json'
    d=read(url);save('unemployment-regional',d)
    print('unemployment',len(d),d[:2])
    return 'unemployment',{'raw':d,'source':url}
def poverty():
    url="https://www.ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='PNADCA_TXPNUF')"
    d=read(url);save('poverty-regional-ppc2021',d)
    print('poverty',len(d.get('value',[])),d.get('value',[])[:2])
    return 'poverty',{'raw':d,'source':url}
result={}
with ThreadPoolExecutor(max_workers=2) as pool:
    for name,data in pool.map(lambda f:f(),[unemployment,poverty]):result[name]=data
(ROOT/'data'/'geography-import.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
