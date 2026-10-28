import type { Indicator } from "./historical";
import data from "./business.json";
const sources = [
  {
    label: "Receita Federal · estudos setoriais",
    url: "https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/estudos/pessoas-juridicas-por-setor/estudos-setoriais-das-pessoas-juridicas",
  },
];
export const businessIndicators: Indicator[] = (
  ["LUCRO REAL", "LUCRO PRESUMIDO"] as const
).flatMap((regime, i) =>
  [false, true].map(
    (revenue) =>
      ({
        slug: `empresas-${i === 0 ? "lucro-real" : "lucro-presumido"}${revenue ? "-receita" : ""}`,
        title: `${revenue ? "Receita bruta" : "CNPJs declarantes"} · ${regime.toLowerCase()}`,
        seriesName: `${regime} · ${revenue ? "receita bruta" : "CNPJs declarantes"}`,
        category: "Emprego e renda",
        unit: revenue ? "R$ bilhões" : "CNPJs",
        points: data.regimes[regime][revenue ? "revenue" : "count"].map(
          (p) => ({ ...p, value: p.value / (revenue ? 1e9 : 1) }),
        ),
        priceBasis: revenue ? "nominal-brl" : undefined,
        priceObservation: revenue ? "annual-average" : undefined,
        description:
          "Evolução dos dados declarados à Receita por regime tributário. Lucro real e presumido são regimes fiscais; receita bruta não é lucro líquido.",
        summary:
          "Contagem de declarantes e receita bruta são indicadores de alcance e atividade. Não medem o resultado financeiro líquido das empresas.",
        findings: [
          {
            title: "Regime não é lucro",
            body: "Uma empresa no lucro real pode apresentar prejuízo. Receita bruta não desconta todas as despesas.",
          },
          {
            title: "Declarantes não são todas as empresas ativas",
            body: "O universo tributário não equivale ao estoque de CNPJs ativos do Mapa de Empresas.",
          },
          {
            title: "Edições e cobertura",
            body: "Mudanças de regime, declarações, conceitos e revisões podem influenciar as comparações entre publicações.",
          },
        ],
        methodology:
          "Receita, tabelas resumo 2016–2018, 2019–2020, 2021–2022; tabela 08 por forma de tributação de 2023 e 2024. Apenas categorias exatas LUCRO REAL e LUCRO PRESUMIDO. Receitas antigas em milhões convertidas a reais antes da apresentação em bilhões. Correção opcional pelo IPCA médio anual.",
        caveat:
          "Não é uma série de lucro econômico. Regimes mistos não foram agregados. Bases de edições diferentes podem sofrer mudanças de cobertura e método.",
        sources,
      }) as Indicator,
  ),
);
businessIndicators.push({
  slug: "cnpjs-ativos",
  title: "Empresas ativas e variação do estoque",
  seriesName: "Empresas ativas · retratos dos boletins",
  category: "Emprego e renda",
  unit: "unidades cadastrais",
  points: data.activeSnapshots,
  description:
    "Retratos de empresas ativas ao final de 2020–2024, incluindo matrizes, filiais e MEI.",
  summary:
    "Delta = estoque publicado no ano menos estoque anterior. Entre edições distintas, essa diferença pode incluir revisões e mudanças cadastrais, além de abertura e baixa.",
  findings: [
    {
      title: "Delta não é fluxo puro",
      body: "Não equivale automaticamente a aberturas menos baixas nem à criação de empregos.",
    },
    {
      title: "Cuidado com 2020–2021",
      body: "O total publicado cai entre essas edições. Não atribuímos essa diferença ao fechamento econômico sem reconciliar cobertura e revisões.",
    },
    {
      title: "O que é contado",
      body: "A base inclui matrizes, filiais e MEI, não somente empresas empregadoras.",
    },
  ],
  methodology:
    "Boletins do terceiro quadrimestre do Mapa de Empresas, total ativo publicado em cada edição de 2020–2024. Retratos não harmonizados em uma extração única.",
  caveat:
    "A diferença entre retratos não sustenta atribuição causal a governos. Não é série ajustada de criação líquida de empresas.",
  sources: [
    {
      label: "Mapa de Empresas · painéis e metodologia",
      url: "https://www.gov.br/empresas-e-negocios/pt-br/mapa-de-empresas/painel-mapa-de-empresas",
    },
  ],
});

const stock = businessIndicators.find((i) => i.slug === "cnpjs-ativos")!;
businessIndicators.push({
  ...stock,
  slug: "cnpjs-ativos-delta",
  title: "Variação entre retratos de empresas ativas",
  seriesName: "Delta do estoque publicado ? edições distintas",
  points: data.activeSnapshots
    .slice(1)
    .map((p, i) => ({
      year: p.year,
      value: p.value - data.activeSnapshots[i].value,
    })),
});
