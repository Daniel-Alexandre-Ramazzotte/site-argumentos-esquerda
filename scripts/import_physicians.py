"""Importa Demografia Médica 2025; preserva contagens, fontes e limites."""
import json
import sys
from import_mobility import download, ROOT

if '--normalize-report' in sys.argv:
    import pymupdf
    import re
    doc=pymupdf.open(ROOT/'data/raw/demografia-medica-2025.pdf')
    numeric=lambda s: int(s.replace('.',''))
    # Tabela 2, página impressa 46: colunas ano, estoque, entradas, saídas, saldo.
    table=doc[46].get_text().split('Tabela 2',1)[1].split('Fonte:',1)[0]
    records=re.findall(r'\b(20\d{2})\*?\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)',table)
    total=[{'year':int(y),'value':numeric(n)} for y,n,*_ in records if int(y)<=2024]
    assert len(total)==25 and total[-1]['value']==597428
    historic=[(1980,113495,121150573),(1990,131278,146917459),(2000,205296,174697935),(2010,304406,194751339),(2020,480882,209166909),(2024,597428,212583750)]
    density=[{'year':y,'value':n/pop*1000} for y,n,pop in historic]
    table=doc[282].get_text().split('Ano',1)[1]
    formal=[{'year':int(y),'value':numeric(n)} for y,n in re.findall(r'\b(20\d{2})\s+([\d.]+)\s+[\d.]+\s+\d+,\d',table)]
    assert len(formal)==12 and formal[-1]['value']==190917
    output={'source':'https://bvsms.saude.gov.br/bvs/publicacoes/demografia_medica_brasil_2025.pdf','total':[{'year':y,'value':n} for y,n,_ in historic[:2]]+total,'density':density,'formal':formal,
        'graduates':[{'year':2010+i,'value':v} for i,v in enumerate([12982,14556,16280,16425,16043,17042,16568,17130,19234,20316,25052,23811,25535,32611])],
        'employers2023':[{'name':name,'value':n} for name,n in [('Público federal',11678),('Público estadual',43404),('Público municipal',113506),('Empresa estatal',15711),('Empresa privada',13057),('Entidade sem fins lucrativos',55210),('Outros empregadores',2633)]]}
    assert sum(r['value'] for r in output['employers2023'])==255199
    (ROOT/'data/physicians.json').write_text(json.dumps(output,ensure_ascii=False,indent=2),encoding='utf-8')
    print('DMB',len(total),'estoques',len(density),'densidades',len(formal),'emprego formal')
    sys.exit()

if '--report' in sys.argv:
    import pymupdf
    url = 'https://bvsms.saude.gov.br/bvs/publicacoes/demografia_medica_brasil_2025.pdf'
    raw = download(url, 'demografia-medica-2025.pdf')
    doc = pymupdf.open(stream=raw,filetype='pdf')
    text='\n'.join(p.get_text() for p in doc)
    (ROOT/'data/raw/demografia-medica-2025.txt').write_text(text,encoding='utf-8')
    sys.stdout.reconfigure(encoding='utf-8')
    for i,p in enumerate(doc):
        t=p.get_text()
        if ('1910' in t or 'concluintes' in t.lower() or 'exclusivamente' in t.lower() or 'autônom' in t.lower()):
            print('PAGINA',i+1,t[:1800],flush=True)
    sys.exit()
print("Use --report para baixar o documento e --normalize-report para gerar data/physicians.json.")
