"""Importa indicadores WDI e fontes fiscais oficiais; preserva metadados e originais."""
import json
import sys
from pathlib import Path
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor
from import_mobility import download as cached_download
from urllib.request import Request, urlopen
import ssl
import gzip
import re

ROOT=Path(__file__).resolve().parents[1]
RAW=ROOT/'data/raw'
def download(url,filename):
    if 'tesourotransparente.gov.br' not in url:
        return cached_download(url,filename)
    path=RAW/filename
    if path.exists(): return path.read_bytes()
    context=ssl.create_default_context()
    # Usa também autoridades confiáveis do Windows, sem desativar a verificação TLS.
    for store in ('ROOT','CA'):
        for cert,encoding,trust in ssl.enum_certificates(store):
            if encoding=='x509_asn':
                try: context.load_verify_locations(cadata=ssl.DER_cert_to_PEM_cert(cert))
                except ssl.SSLError: pass
    data=urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),context=context,timeout=90).read()
    if data.startswith(b'\x1f\x8b'): data=gzip.decompress(data)
    path.write_bytes(data)
    return data
CODES=['NY.GDP.MKTP.KD','NY.GDP.PCAP.KD','NY.GDP.MKTP.KD.ZG','NY.GDP.MKTP.CN',
       'SP.POP.TOTL','SP.POP.GROW','SP.DYN.CBRT.IN','SP.DYN.CDRT.IN','SP.DYN.TFRT.IN','SP.POP.65UP.TO.ZS',
       'SH.MED.PHYS.ZS','SP.DYN.LE00.IN','SP.DYN.IMRT.IN','SH.IMM.MEAS','SH.MED.BEDS.ZS',
       'DT.DOD.DECT.CD','BN.CAB.XOKA.GD.ZS']

def worldbank(code):
    url=f'https://api.worldbank.org/v2/country/BRA/indicator/{code}?format=json&per_page=1000'
    payload=json.loads(download(url,f'context-worldbank-{code}.json'))
    if len(payload)<2 or not payload[1]:
        raise ValueError(f'Sem observações para {code}')
    points=sorted([{'year':int(r['date']),'value':float(r['value'])} for r in payload[1] if r['value'] is not None and int(r['date'])<=2025],key=lambda r:r['year'])
    metaurl=f'https://api.worldbank.org/v2/indicator/{code}?format=json'
    metadata=json.loads(download(metaurl,f'context-meta-{code}.json'))[1][0]
    print(code,len(points),points[:1],points[-1:],flush=True)
    return code,{'points':points,'source':url,'metadata':metadata}

def wb():
    result={}
    with ThreadPoolExecutor(max_workers=3) as pool:
        for code,rows in pool.map(worldbank,CODES):
            if not rows['points']: raise ValueError(code)
            result[code]=rows
    (ROOT/'data/public-context.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')

def catalog():
    for query in ['cofog','despesa','orcamento','estoque da divida']:
        url='https://www.tesourotransparente.gov.br/ckan/api/3/action/package_search?q='+quote(query)+'&rows=8'
        payload=json.loads(download(url,f'treasury-search-{query.replace(" ","-")}.json'))
        for item in payload.get('result',{}).get('results',[]):
            print('DATASET',item['id'],item['title'],flush=True)
            for r in item.get('resources',[]):
                print('RESOURCE',r.get('name'),r.get('format'),r.get('url'),flush=True)

def probe():
    hosts=['https://apickan.tesouro.gov.br/ckan']
    def one(host):
        url=host+'/api/3/action/package_show?id=despesas-e-transferencias-totais'
        try:
            payload=json.loads(download(url,'treasury-package-'+host.split('/')[2]+'.json'))
            print('OK',host,payload.get('success'),flush=True)
            for r in payload.get('result',{}).get('resources',[]): print(r.get('name'),r.get('url'),flush=True)
        except Exception as exc: print('ERROR',host,str(exc)[:150],flush=True)
    with ThreadPoolExecutor(max_workers=3) as pool: list(pool.map(one,hosts))

def fiscal_probe():
    base='https://apidatalake.tesouro.gov.br/ords/cdwhprd/siconfi/tt/'
    jobs=[('rreo-2025',base+'rreo?an_exercicio=2025&nr_periodo=6&co_tipo_demonstrativo=RREO&no_anexo=RREO-Anexo%2002&id_ente=1'),
          ('dca-function-2025',base+'dca?an_exercicio=2025&no_anexo=DCA-Anexo%20I-E&id_ente=1'),
          ('dca-2024',base+'dca?an_exercicio=2024&no_anexo=DCA-Anexo%20I-D&id_ente=1')]
    for name,url in jobs:
        try:
            result=json.loads(download(url,name+'.json'))
            print(name,'keys',list(result),'COUNT',len(result.get('items',[])),flush=True)
            print(json.dumps(result.get('items',[])[:7],ensure_ascii=True),flush=True)
        except Exception as exc: print(name,str(exc),flush=True)

def budget():
    result=[]
    base='https://apidatalake.tesouro.gov.br/ords/cdwhprd/siconfi/tt/dca'
    def one(year):
        url=f'{base}?an_exercicio={year}&no_anexo=DCA-Anexo%20I-E&id_ente=1'
        raw=json.loads(download(url,f'dca-functions-union-{year}.json'))
        if raw.get('hasMore'): raise ValueError(f'Paginação não resolvida: {year}')
        rows=raw.get('items',[])
        functions=[]
        for r in rows:
            if not re.match(r'^\d{2} - ',r['conta']): continue
            if r['coluna'] not in ('Despesas Pagas','Despesas Liquidadas','Despesas Empenhadas'): continue
            functions.append({'code':r['conta'][:2],'name':r['conta'][5:],'stage':r['coluna'],'value':r['valor']})
        if not functions: print('SEM DADOS DCA',year,flush=True);return None
        for stage in ('Despesas Pagas','Despesas Liquidadas','Despesas Empenhadas'):
            checks=[r for r in rows if r['coluna']==stage and r['conta'].replace('(', '').replace(')', '')=='Despesas Exceto Intraorçamentárias']
            selected=[r for r in functions if r['stage']==stage]
            if len({r['code'] for r in selected})!=len(selected): raise ValueError('Função duplicada')
            if len(checks)!=1 or abs(sum(r['value'] for r in selected)-checks[0]['valor'])>1:
                raise ValueError(f'Total por função não reconciliado: {year}, {stage}')
            print('DCA',year,stage,len(selected),round(sum(r['value'] for r in selected)/1e9,2),'reconciliado',flush=True)
        return {'year':year,'source':url,'functions':functions}
    with ThreadPoolExecutor(max_workers=3) as pool:
        for row in pool.map(one,range(2013,2026)):
            if row: result.append(row)
    if not result: raise ValueError('Sem dados fiscais')
    (ROOT/'data/budget.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')

def debt():
    codes=['BM12_DINGFN12','BM12_DEXGFN12','BM12_DINGFY12','BM12_DEXGFY12']
    result={}
    metadata=json.loads((RAW/'ipeadata-metadata.json').read_text(encoding='utf-8'))['value']
    for code in codes:
        url=f"https://www.ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='{code}')"
        rows=json.loads(download(url,f'context-ipeadata-{code}.json'))['value']
        points=sorted([{'year':int(r['VALDATA'][:4]),'value':float(r['VALVALOR'])} for r in rows if r['VALDATA'][5:7]=='12' and int(r['VALDATA'][:4])<=2025 and r.get('VALVALOR') is not None],key=lambda r:r['year'])
        result[code]={'points':points,'source':url,'metadata':next(r for r in metadata if r['SERCODIGO']==code)}
        print(code,len(points),points[:1],points[-1:],flush=True)
    for code in (13762,):
        url=f'https://api.bcb.gov.br/dados/serie/bcdata.sgs.{code}/dados?formato=json&dataInicial=01/01/2006&dataFinal=31/12/2025'
        rows=json.loads(download(url,f'context-bcb-{code}.json'))
        result[str(code)]={'points':[{'year':int(r['data'][-4:]),'value':float(r['valor'])} for r in rows if r['data'][3:5]=='12'],'source':url}
    (ROOT/'data/debt.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')

if __name__=='__main__':
    if '--probe' in sys.argv: probe()
    elif '--fiscal-probe' in sys.argv: fiscal_probe()
    elif '--budget' in sys.argv: budget()
    elif '--debt' in sys.argv: debt()
    elif '--catalog' in sys.argv: catalog()
    else: wb()
