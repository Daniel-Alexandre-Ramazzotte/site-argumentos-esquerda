# Estado do projeto — 28/10/2026

## Implementado e validado

- Entrada por temas com ícones grandes; sem a lista inicial de todos os indicadores.
- Agrupamentos em Economia, Transporte, Emprego e renda e Saúde; comparação de séries selecionáveis.
- Saúde, População, funcionamento da política, orçamento, dívida interna/externa, PIB, juros, endividamento, empresas, programas sociais e lucro/rentabilidade financeira.
- Médicos: total, densidade, formação, emprego formal e retrato de vínculos por empregador em 2023; fontes não emendadas.
- Estudos de mortes evitáveis na pandemia, com cenários e limites.
- PostgreSQL em Docker, 85 séries/variantes e 11.990 observações na carga atual, além de documentos agregados e registros editoriais. Schemas por fonte e tema; o site usa conta de leitura.
- Site migrado de exportação estática para Next.js no servidor. Instância de produção local em http://127.0.0.1:3001; desenvolvimento em 3000 quando ativo.
- TypeScript, build local, build Docker e 20 testes Playwright validados (19 na suíte final e o teste adicional de cenários na repetição focada). Produção respondeu 200 e não apresentou erros no navegador na verificação realizada.

## Limites que permanecem explícitos no produto

- Sem série validada de médicos autônomos; ausência de emprego formal não equivale a trabalho independente.
- Empregadores públicos/privados: retrato de vínculos de 2023, não série anual de pessoas exclusivas.
- Sem série harmonizada de hospitais/UBS construídos por governo; cadastro, financiamento, conclusão e funcionamento são etapas diferentes. A série de UPAs tem seu escopo próprio.
- Lucro real/presumido são regimes tributários. As séries da Receita mostram declarantes e receita bruta, não lucro líquido econômico.
- Deltas de CNPJs entre retratos de edições diferentes têm limitações cadastrais.
- Tailscale não foi encontrado instalado. Publicação externa não foi realizada; script preparado em scripts/publish-tailscale.ps1 depende de instalação/login e preserva publicações existentes.

## Operação

Leia PREFERENCIAS.md e database/README.md. Credenciais no .env ignorado pelo Git. npm run db:up; npm run db:import; npm run db:verify. A carga é transacional e não duplica observações. Não usar docker compose down -v para preservar dados. Não commitar .env ou caches de documentos grandes.

O usuário autorizou commit após validação, sem push. A retomada agendada para 27/10 não produziu relatório de conclusão; o trabalho foi retomado manualmente em 28/10. Não há novo agendamento recorrente.
