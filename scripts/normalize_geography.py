"""Normaliza recortes já baixados sem calcular médias simples entre territórios."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
RAW=ROOT/'data'/'raw'
STATES={'11':'Rondônia','12':'Acre','13':'Amazonas','14':'Roraima','15':'Pará','16':'Amapá','17':'Tocantins','21':'Maranhão','22':'Piauí','23':'Ceará','24':'Rio Grande do Norte','25':'Paraíba','26':'Pernambuco','27':'Alagoas','28':'Sergipe','29':'Bahia','31':'Minas Gerais','32':'Espírito Santo','33':'Rio de Janeiro','35':'São Paulo','41':'Paraná','42':'Santa Catarina','43':'Rio Grande do Sul','50':'Mato Grosso do Sul','51':'Mato Grosso','52':'Goiás','53':'Distrito Federal'}
REGIONS={'1':'Norte','2':'Nordeste','3':'Sudeste','4':'Sul','5':'Centro-Oeste'}
def load(name):return json.loads((RAW/f'{name}.json').read_text(encoding='utf-8'))
def sidra(names,category=None):
    geos={}
    for name in names:
        for row in load(name)[1:]:
            if category and row.get('D4C')!=category:continue
            if row['V'] in ('...','..','-','X'):continue
            code,level=row['D1C'],row['NC']
            kind={'1':'br','2':'region','3':'state'}.get(level,'area')
            key='br' if kind=='br' else f'{kind}-{code}'
            geo=geos.setdefault(key,{'id':key,'name':row['D1N'],'level':kind,'points':[]})
            year=int(row['D3C'][:4])
            if any(p['year']==year for p in geo['points']):raise ValueError(f'Duplicado {key} {year}')
            geo['points'].append({'year':year,'value':float(row['V'])})
    for geo in geos.values():geo['points'].sort(key=lambda p:p['year'])
    return sorted(geos.values(),key=lambda g:(g['level'],g['name']))
result={
 'unemployment':sidra(['unemployment-regional']),
 'ipca':sidra(['prices-2006','prices-2012','prices-2020'],'7169'),
 'food':sidra(['prices-2006','prices-2012','prices-2020'],'7170'),
 'industryShare':sidra(['industry-regional-share']),
 'industryGrowth':sidra(['industry-regional-growth']),
}
poverty={}
for r in load('poverty-regional-ppc2021')['value']:
    year=int(r['VALDATA'][:4])
    if year>2024 or r['VALVALOR'] is None:continue
    code=r['TERCODIGO'];kind={'Brasil':'br','Estados':'state','Regiões':'region'}[r['NIVNOME']]
    key='br' if kind=='br' else f'{kind}-{code}'
    name='Brasil' if kind=='br' else (STATES if kind=='state' else REGIONS)[code]
    g=poverty.setdefault(key,{'id':key,'name':name,'level':kind,'points':[]})
    g['points'].append({'year':year,'value':float(r['VALVALOR'])})
for g in poverty.values():g['points'].sort(key=lambda p:p['year'])
result['poverty']=list(poverty.values())
crime={}
for kind,name in [('region','homicide-regions'),('state','homicide-states')]:
    for r in load(name):
        code=str(r['regiao_id']);key=f'{kind}-{code}'
        g=crime.setdefault(key,{'id':key,'name':(REGIONS if kind=='region' else STATES)[code],'level':kind,'points':[]})
        g['points'].append({'year':int(r['periodo'][:4]),'value':round(float(r['valor']),2)})
for g in crime.values():g['points'].sort(key=lambda p:p['year'])
result['crime']=list(crime.values())
(ROOT/'data'/'geography.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
for name,geos in result.items():print(name,len(geos),'territórios',sorted(set(g['level'] for g in geos)))
