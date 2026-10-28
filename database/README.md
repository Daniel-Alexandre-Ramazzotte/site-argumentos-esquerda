# PostgreSQL do Brasil em Perspectiva

O Next.js consulta o PostgreSQL no servidor. Não há retorno silencioso aos arquivos locais quando o banco está indisponível. As credenciais de leitura ficam apenas no servidor; o navegador recebe dados pela página e pela API de indicadores.

## Iniciar

```powershell
npm run db:setup
npm run db:up
npm run db:import
npm run db:verify
npm run dev
```

Abra http://127.0.0.1:3000. O PostgreSQL local fica em `127.0.0.1:5433`, banco `brasil_perspectiva`. As credenciais aleatórias estão no `.env`, ignorado pelo Git. Use `DATABASE_URL` no DBeaver/pgAdmin/psql para consultar. `DATABASE_ADMIN_URL` é exclusiva para manutenção/importação. Não exponha o banco diretamente na internet.

## Organização

- `core.series`: catálogo de séries e variantes, tema, fonte, definições e métodos.
- `core.observations`: observações numéricas normalizadas; chave por série, geografia, período e linha principal/secundária.
- `core.imports`: cargas concluídas e contagens.
- `raw.documents`: documentos agregados JSONB, checksum e origem da carga. Bases brutas baixadas em `data/raw` permanecem no cache local de importação e não são confundidas com as observações curadas. PDFs e caches grandes podem ser refeitos pelos importadores e não entram no Git.
- `editorial.records`: pesquisas, checagens e cronologias, preservando as fichas completas.
- Fontes: schemas `bcb`, `ibge`, `ipea`, `worldbank`, `tesouro`, `receita`, `saude`, `anp`, `outras_fontes`.
- Temas: `economia`, `emprego_renda`, `saude`, `educacao`, `seguranca`, `populacao`, `transporte`, `social`.

As fontes possuem visões de séries e observações; temas possuem visões de observações. A classificação principal não elimina as demais referências da série, preservadas em `definition.sources`. `bcb.monthly_credit` permite consultar observações mensais de juros e endividamento.

Para séries anuais, o campo `period` usa 1º de janeiro como chave do ano, não como data em que o fenômeno aconteceu. A metodologia informa se a observação corresponde a dezembro, quarto trimestre, ano inteiro ou edição de pesquisa. Uma lacuna não vira zero. Índices e contagens não recebem correção monetária.

## Atualizar e consultar

Execute os importadores de fontes desejados e depois `npm run db:import`. A carga é transacional e substitui observações das séries importadas, sem duplicar chaves; uma falha reverte a transação. Reimportar não duplica séries ou observações. O site usa uma conta com SELECT, sem permissão para alterar os dados.

Exemplos em `examples.sql`. `GET /api/health` confirma conexão e última carga. `GET /api/indicators` retorna o catálogo consultado no banco. O site precisa de Next.js em execução (`npm run build`, `npm start`); a versão atual não é exportação estática.

O volume Docker persiste os dados. `docker compose down` para os serviços preservando o volume; não use `down -v` se quiser manter o banco.
