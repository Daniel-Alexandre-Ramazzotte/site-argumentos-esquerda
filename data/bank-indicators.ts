import type { Indicator } from "./historical";
import data from "./bank-profit.json";
const source2024 = {
  label: "BCB · REF abril/2024 · gráfico 1.2.3.1",
  url: "https://www.bcb.gov.br/content/publicacoes/ref/202404/RELESTAB202404-refAnexoEstatistico.xlsx",
};
const source2026 = {
  label: "BCB · REF maio/2026 · gráfico 1.2.3.1",
  url: "https://www.bcb.gov.br/content/publicacoes/ref/202605/RELESTAB202605-refAnexoEstatistico.xlsx",
};
const base = {
  category: "Economia",
  description:
    "Lucro líquido e rentabilidade das instituições financeiras, com separação de escopos e valores nominais ou corrigidos pela inflação.",
  summary:
    "Lucro absoluto e retorno sobre patrimônio são medidas diferentes. As edições do REF também usam escopos e revisões distintos: não emendamos sistema bancário e SFN em uma linha única.",
  findings: [
    {
      title: "Lucro não é receita",
      body: "Lucro líquido considera receitas, despesas, provisões e tributos. Não equivale ao total de juros cobrados ou ao spread.",
    },
    {
      title: "Lucro e rentabilidade",
      body: "ROE é retorno sobre patrimônio, em percentual. O lucro pode crescer com o tamanho do sistema sem crescer na mesma proporção que o ROE.",
    },
    {
      title: "Mudanças de escopo",
      body: "A série do REF 2024 cobre o sistema bancário. O REF 2026 abrange SFN e exclui os conglomerados Master e BRB em todas as datas para comparabilidade. As linhas são separadas.",
    },
  ],
  methodology:
    "Banco Central, anexos estatísticos do Relatório de Estabilidade Financeira. Seleção de dezembro; lucro acumulado nos últimos doze meses. Dados originais em reais convertidos para bilhões. Correção de fluxo anual pelo IPCA médio do ano, quando selecionada.",
  caveat:
    "SFN inclui segmentos não bancários. Não compare variações entre linhas de escopos diferentes como se fossem uma série contínua. Uma alta de lucro não comprova causalidade de uma política governamental.",
  sources: [source2024, source2026],
};
export const bankIndicators: Indicator[] = [
  {
    ...base,
    slug: "lucro-bancos",
    title: "Lucro do sistema bancário",
    seriesName: "Lucro líquido · sistema bancário · REF 2024",
    unit: "R$ bilhões",
    priceBasis: "nominal-brl",
    priceObservation: "annual-average",
    points: data.profit,
  },
  ...(
    [
      ["profit", "lucro-sfn", "Lucro líquido · SFN"],
      ["privateS1", "lucro-bancos-privados", "Lucro líquido · S1 privados"],
      ["public", "lucro-bancos-publicos", "Lucro líquido · segmento público"],
      ["roe", "rentabilidade-sfn", "ROE · SFN"],
    ] as const
  ).map(
    ([key, slug, title]) =>
      ({
        ...base,
        slug,
        title,
        seriesName: `${title} · REF 2026`,
        unit: key === "roe" ? "% ao ano" : "R$ bilhões",
        priceBasis: key === "roe" ? undefined : "nominal-brl",
        priceObservation: key === "roe" ? undefined : "annual-average",
        points: data.sfn.map((p) => ({ year: p.year, value: p[key] })),
        sources: [source2026],
      }) as Indicator,
  ),
];
