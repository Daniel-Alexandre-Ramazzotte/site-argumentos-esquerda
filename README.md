# Brasil em Evidências

Portal factual em Next.js, React e TypeScript, com escala visual de 125%, navegação responsiva e análises em subpáginas próprias. Os cards abrem conteúdos internos; as fontes externas ficam nas referências das análises.

## Executar

```sh
npm install
npm run dev
```

Abra http://127.0.0.1:3000.

## Verificar e gerar versão estática

```sh
npm run typecheck
npm run build
```

A exportação estática fica em `out/`, com diretórios por rota (`trailingSlash: true`). Pode ser servida em hospedagem estática. O site não usa banco de dados nem recebe informações pessoais.

Com o Google Chrome instalado, execute `npm run test:e2e`. O Playwright inicia o servidor local automaticamente ou reutiliza um servidor existente. Os testes verificam as séries, navegação interna, busca, filtros, tabela, CSV, mandatos e layout a 125% em telas de 320, 390, 768 e 1280 px. Capturas são salvas em `artifacts/`.

## Indicadores e checagens

- `/indicadores/pobreza/`: pobreza e extrema pobreza, 2012–2024, linhas de US$ 6,85 e US$ 2,15 PPC de 2017 utilizadas pela SIS 2025.
- `/indicadores/criminalidade/`: taxa de homicídios registrados, 2013–2023, tabela 2.1 do Atlas da Violência 2025. Não representa todos os crimes; o último ano deste recorte não é apresentado como a última informação existente em todas as bases.
- `/indicadores/inflacao/`: IPCA acumulado no ano em dezembro, 1980–2025, com alternativa IGP-DI explicitamente separada.
- `/indicadores/inflacao-de-alimentos/`: grupo Alimentação e bebidas desde 1992, com recomposição dos meses antigos e mudanças de estrutura explicitadas.
- `/checagens/`: vereditos com explicação, alcance e referência, em páginas próprias. As interpretações conceituais não são atribuídas a pessoas sem evidência.

`data/historical.ts` contém textos, metadados e transcrições de pobreza e homicídios. `data/sidra.json` contém a importação dos preços; respostas originais estão em `data/raw/`. Para refazer a consulta de preços com acesso à rede, execute `python scripts/import_data.py`. As fontes, definições e períodos precisam ser revisados antes de substituir um recorte.

Os gráficos em SVG oferecem seleção de anos, pontos acessíveis por toque/foco, legenda, tabela e CSV do período. Destacam os mandatos do PT com faixas de fundo e 2020–2021 com uma faixa cinza. O afastamento de Dilma em 12/05/2016 é a transição visual para Temer; o valor anual de 2016 é identificado como compartilhado. As faixas não provam causalidade.

## Dossiês

`app/dossiers.tsx` reúne a cronologia de 2020–2021 e registros individuais com fonte, data, esfera de gestão e limites. Inclui propostas de vacinas, oxigênio, equipamentos, testagem, coordenação, comunicação e investigações de hospitais estaduais e federais do Rio. Os casos envolvendo integrantes da família Bolsonaro distinguem pessoas, suspeitas e decisões. A seleção não é exaustiva nem certifica o andamento atual de processos. Não existe sincronização automática com tribunais.

## Conteúdo

As páginas não alegam atualização em tempo real. Séries anuais excluem 2026 parcial. Verifique revisões estatísticas, andamento processual e normas antes de atualizar o conteúdo. O eixo vertical inclui zero; quando há deflação, também inclui valores negativos. Datas e fontes ficam nas próprias páginas.

O site distingue imputação, condenação, anulação processual e absolvição. A cronologia dos governos serve como contexto, sem atribuir causalidade só pela coincidência temporal. A descrição do chamado Petrolão é introdutória; ainda não há inventário individual de seus processos.

Fontes tipográficas Google Fonts carregam no navegador, com alternativas locais de sistema. A compilação independe do serviço de fontes.

## Economia, câmbio mensal e transportes

- `/economia/` reúne inflação, alimentos, combustíveis e dólar.
- `/indicadores/combustiveis/` oferece sete produtos: gasolina comum/aditivada, etanol, diesel histórico/S500, S10, GNV e GLP. Usa a **média oficial de revenda de dezembro**, não média anual. O histórico começa em 2001 conforme produto e território, termina em 2025 e permite Brasil, regiões e UFs disponíveis. Não gera médias nacionais a partir de médias simples dos estados. As mudanças de amostragem, ponderação e especificação estão descritas na análise.
- `/indicadores/dolar/` alterna visão anual (dezembro de 1994–2025) e mensal (julho de 1994–setembro de 2026). Na visão mensal, média de venda SGS 3698 e fechamento SGS 3695 podem ser sobrepostos ou exibidos individualmente. Há filtros de mês, governos, leitura por ponto, tabela e CSV com ambas as séries. Não inclui outubro incompleto nem converte moedas anteriores ao real.
- `/transportes/` contém análises internas para rodovias, ferrovias, navegação interior, portos e aviação, além de oito eventos clicáveis com etapas, contexto e fontes. Os recortes históricos de malha federal, movimentação ferroviária e frota vêm de gráficos identificados do ONTL/Infra S.A., com fontes DNIT, ANTT e ANTAQ. Aviação e contêineres usam WDI. **Estoque, fluxo de carga, frota e obras entregues são conceitos separados.** Não há desagregação territorial de transportes importada nesta versão.

`data/mobility.json` guarda os dados normalizados; `data/mobility-indicators.ts` as definições e análises; `data/transport-events.ts` a cronologia. `python scripts/import_mobility.py` reprocessa planilhas ANP e séries BCB/WDI, preservando os originais em `data/raw/`. `--currency-only` atualiza apenas o recorte cambial fixado no script, `--documents` preserva e renderiza as páginas de conferência do diagnóstico, e `--inspect` mostra a estrutura das fontes. Downloads usam cache: para uma nova edição, reveja os cortes temporais e renomeie ou atualize conscientemente os arquivos de origem.

Os novos registros da pandemia identificam Élcio Franco como autor do e-mail de 10/11/2020 sobre vírus na rede, sem atribuí-lo pessoalmente a Bolsonaro. A seção de justiça inclui vídeo/transcrição da reunião de 22/04/2020 e a demissão de Moro em 24/04, com alegações, resposta e a conclusão policial de 2022. A checagem sobre aborto inclui o registro integral de 2006 e esclarece que a referência a oito meses tratava da China, não de uma proposta brasileira de aborto naquele estágio.

## Aparência e valores reais

O botão de tema no cabeçalho alterna modo claro/escuro e preserva a escolha no navegador. Na primeira visita, respeita a preferência do sistema. `app/theme.css` adapta superfícies, textos, controles e elementos dos SVGs; não aplica inversão de cores às páginas ou aos vídeos.

Os gráficos monetários nominais em reais (combustíveis e dólar, anual e mensal) oferecem **Valor nominal / Valor real · IPCA**. A base comum é **dezembro de 2025**, usando `valor × índice_IPCA_dez2025 / índice_IPCA_mês_observado`, com o número-índice nacional da tabela SIDRA 1737, variável 2266. Nos recortes anuais de dezembro, o deflator também é de dezembro; não se usa a inflação anual inteira sobre um preço médio anual. Tabelas e CSVs acompanham a escolha e identificam a referência monetária. A série mensal de 2026 pode ser trazida a preços de dezembro de 2025 pelo mesmo quociente de índices.

`data/price-index.json` preserva os índices e fatores, e `data/price-adjustment.ts` aplica a correção. Para importar o recorte fixado no script: `python scripts/import_mobility.py --inflation-only`. Não há arredondamento de fatores antes do cálculo. A correção do dólar ajusta **apenas seu preço em reais por US$**: não é câmbio real efetivo, que exigiria outra metodologia e inflação externa. Taxas, contagens e séries já expressas em preços constantes não recebem uma segunda correção.

A cronologia da pandemia também inclui manifestações sobre vacinação, minimização da doença, oposição às restrições de circulação, vetos a máscaras e sua derrubada pelo Congresso, com fontes contemporâneas e respostas de entidades científicas. `data/pandemic-communication.ts` contém os oito eventos e os quatro textos explicativos; os eventos são integrados em ordem temporal à cronologia existente. A barra superior chama a biblioteca de **Brasil Em Perspectiva**; Economia e Transportes permanecem acessíveis pelos cards da página inicial.
