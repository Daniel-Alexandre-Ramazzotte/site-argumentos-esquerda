"""Importa recortes anuais oficiais do SIDRA, preservando as respostas brutas."""
import json
import sys
import gzip
from math import prod
from pathlib import Path
from urllib.request import urlopen
from concurrent.futures import ThreadPoolExecutor

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / 'data' / 'raw'
TARGET.mkdir(parents=True, exist_ok=True)

def read_url(url):
    data = urlopen(url, timeout=40).read()
    if data.startswith(b'\x1f\x8b'):
        data = gzip.decompress(data)
    return data.decode('utf-8-sig')

if '--inspect' in sys.argv:
    for table in (58, 655):
        url = f'https://servicodados.ibge.gov.br/api/v3/agregados/{table}/metadados'
        meta = json.loads(read_url(url))
        print(table, meta.get('nome'), meta.get('periodicidade'))
        for classification in meta.get('classificacoes', []):
            categories = [c for c in classification.get('categorias', []) if 'alimenta' in c.get('nome', '').lower() or c.get('id') == 7170]
            print('classification', classification['id'], json.dumps(categories, ensure_ascii=True)[:2000])
    sys.exit(0)

def fetch(spec):
    name, table, start, end, group = spec
    periods = ','.join(f'{y}12' for y in range(start, end + 1))
    url = f'https://apisidra.ibge.gov.br/values/t/{table}/n1/all/v/69/p/{periods}'
    if group:
        url += '/c315/7170'
    url += '?formato=json'
    raw = read_url(url)
    rows = json.loads(raw)
    if not isinstance(rows, list):
        raise ValueError(f'{name}: {str(rows)[:300]}')
    (TARGET / f'{name}.json').write_text(raw, encoding='utf-8')
    result = []
    for row in rows[1:]:
        period = next((row[k] for k in row if k.endswith('C') and str(row[k]).endswith('12') and len(str(row[k])) == 6), None)
        if period is None or row['V'] in ('...', '-', '..', 'X'):
            raise ValueError(f'Linha sem valor anual válido: {row}')
        result.append({'year': int(period[:4]), 'value': float(row['V'])})
    if len(result) != end - start + 1:
        raise ValueError(f'{name}: número inesperado de observações')
    return name, {'source': url, 'points': result}

def historical_food():
    observations = {}
    urls = []
    for name, table, classification, category, first_month, last_month in [
        ('food-monthly-1991', 58, 72, 1313, 199101, 199907),
        ('food-monthly-1999', 655, 315, 7170, 199908, 200512),
    ]:
        months = [f'{year}{month:02}' for year in range(1991, 2006) for month in range(1, 13) if first_month <= year * 100 + month <= last_month]
        url = f'https://apisidra.ibge.gov.br/values/t/{table}/n1/all/v/63/p/{",".join(months)}/c{classification}/{category}?formato=json'
        raw = read_url(url)
        rows = json.loads(raw)
        if not isinstance(rows, list):
            raise ValueError(f'{name}: {str(rows)[:300]}')
        (TARGET / f'{name}.json').write_text(raw, encoding='utf-8')
        for row in rows[1:]:
            period = next((str(v) for k, v in row.items() if k.endswith('C') and str(v) in months), None)
            if period is None or row['V'] in ('...', '-', '..', 'X'):
                raise ValueError(f'Mês sem valor: {row}')
            if period in observations:
                raise ValueError(f'Mês duplicado: {period}')
            observations[period] = float(row['V'])
        urls.append(url)
    annual = []
    for year in range(1991, 2006):
        if year == 1991 and '199108' not in observations:
            continue  # Mês ausente na tabela; não inventar um acumulado anual.
        rates = [observations[f'{year}{m:02}'] for m in range(1, 13)]
        annual.append({'year': year, 'value': round((prod(1 + rate / 100 for rate in rates) - 1) * 100, 2)})
    if len(observations) != 15 * 12 - 1:
        raise ValueError('Histórico mensal incompleto')
    return {'sources': urls, 'method': 'Acumulação multiplicativa de 12 taxas mensais publicadas, arredondada a duas casas; pode diferir do acumulado oficial pelo arredondamento dos dados mensais.', 'points': annual}

specs = [('ipca',1737,1980,2025,False), ('food-2020',7060,2020,2025,True), ('food-2012',1419,2012,2019,True), ('food-2006',2938,2006,2011,True)]
result = {}
with ThreadPoolExecutor(max_workers=4) as pool:
    for name, data in pool.map(fetch, specs):
        result[name] = data
        print(name, json.dumps(data['points']))
result['food-1992'] = historical_food()
print('food-1992', json.dumps(result['food-1992']['points']))
(ROOT / 'data' / 'sidra.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
