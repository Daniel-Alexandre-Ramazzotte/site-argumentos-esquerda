-- Conectar com o DATABASE_URL (leitura) configurado no .env.
-- Catálogo por fonte e tema:
SELECT provider, theme, count(*) AS series FROM core.series GROUP BY 1,2 ORDER BY 1,2;

-- PIB e PIB por habitante (unidades próprias):
SELECT slug,period,value,unit FROM economia.observations
WHERE slug IN ('pib','pib-per-capita','crescimento-pib') AND geo_id='br' AND kind='primary'
ORDER BY period,slug;

-- Dívida líquida federal, % PIB. Não somar DBGG a estas parcelas:
SELECT slug,period,value,unit FROM economia.observations
WHERE slug IN ('divida-interna','divida-externa') AND geo_id='br'
ORDER BY period,slug;

-- Fonte BCB, inclusive os meses que não aparecem no gráfico anual:
SELECT * FROM bcb.monthly_credit WHERE sgs_code='29037' ORDER BY month;

-- UPAs de São Paulo, conforme o escopo do indicador:
SELECT period,value,unit FROM saude.observations WHERE slug='upas' AND geo_id='state-35' ORDER BY period;

-- Dados agregados originais e rastreabilidade da carga:
SELECT name,sha256,imported_at FROM raw.documents ORDER BY name;
SELECT * FROM core.imports ORDER BY id DESC;

-- Ficha técnica completa das pesquisas eleitorais:
SELECT payload FROM editorial.records WHERE collection='polls';

-- Cenários contrafactuais, sem somar alternativas sobrepostas:
SELECT payload->>'baseline' AS baseline,payload->'scenarios' AS scenarios
FROM raw.documents WHERE name='pandemic-estimates.json';
