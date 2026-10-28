import json
import sys
from import_mobility import download, ROOT
from concurrent.futures import ThreadPoolExecutor
codes=('FAM_PBF','VAL_PBF','PES_BPC','VAL_BPC','FAM_AUXEMG','VAL_AUXEMG')
if '--normalize' in sys.argv:
    geoNames=json.loads((ROOT/'data/geography.json').read_text(encoding='utf-8'))['unemployment']
    names={g['id']:g['name'] for g in geoNames}
    # TERCODIGO da API usa as cinco regiões IBGE, como o mapa de nomes acima.
    result={}
    for code in ('FAM_PBF','VAL_PBF','PES_BPC','VAL_BPC'):
        rows=json.loads((ROOT/f'data/raw/social-ipeadata-{code}.json').read_text(encoding='utf-8'))['value']
        geos={}
        for r in rows:
            year=int(r['VALDATA'][:4])
            if year>2025 or r.get('VALVALOR') is None:continue
            if code in ('PES_BPC','VAL_BPC') and r['VALDATA'][5:7]!='12':continue
            level={'Brasil':'br','Estados':'state','Regiões':'region'}.get(r['NIVNOME'])
            if not level:continue
            ident='br' if level=='br' else f"{level}-{r['TERCODIGO']}"
            geo=geos.setdefault(ident,{'id':ident,'name':names.get(ident,ident),'level':level,'points':[]})
            geo['points'].append({'year':year,'value':r['VALVALOR']})
        for geo in geos.values():
            geo['points'].sort(key=lambda p:p['year'])
            assert len(geo['points'])==len(set(p['year'] for p in geo['points'])),(code,geo['id'])
        result[code]={'geographies':list(geos.values()),'source':f"https://www.ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='{code}')"}
    (ROOT/'data/social-programs.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    print([(c,len(v['geographies']),len(next(g for g in v['geographies'] if g['id']=='br')['points'])) for c,v in result.items()])
    sys.exit()
def one(code):
    url=f"https://www.ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='{code}')"
    rows=json.loads(download(url,f'social-ipeadata-{code}.json'))['value']
    rows=[r for r in rows if r.get('VALVALOR') is not None and int(r['VALDATA'][:4])<=2025]
    print(code,len(rows),rows[:1],rows[-1:],flush=True)
    # Bases sociais podem ser territoriais: não somar Brasil, UFs e municípios.
    result={'source':url,'rows':rows}
    return code,result
data=dict(ThreadPoolExecutor(max_workers=3).map(one,codes))
(ROOT/'data/social-programs-raw.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
