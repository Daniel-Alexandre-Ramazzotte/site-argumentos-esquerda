import type { Indicator } from "./historical";
import data from "./household-credit.json";
const specs = [
  [
    "4189",
    "juros",
    "Evolução dos juros no Brasil",
    "% ao ano",
    "Selic efetiva anualizada · dezembro",
    "Taxa Selic efetiva acumulada no mês, expressa em termos anuais. A série histórica começa em 1986; o recorte anual usa dezembro.",
    "A Selic efetiva não é a meta fixada pelo Copom nem a taxa paga pelo consumidor. Os patamares da hiperinflação dificultam a leitura; ajuste o período para examinar o pós-Real.",
  ],
  [
    "20716",
    "juros-pessoas-fisicas",
    "Juros do crédito à população",
    "% ao ano",
    "Juros de novas operações · pessoas físicas · dezembro",
    "Taxa média de juros das novas operações de crédito a pessoas físicas, livres e direcionadas, ponderada pelo valor das concessões.",
    "A taxa de dezembro não é a média anual nem o custo efetivo total de cada contrato. Mudanças na composição das modalidades também alteram a média.",
  ],
  [
    "29037",
    "divida-familias",
    "Endividamento das famílias",
    "% da renda acumulada em 12 meses",
    "Endividamento das famílias · dezembro",
    "Estoque de dívidas das famílias com o Sistema Financeiro Nacional em relação à renda nacional disponível bruta das famílias restrita, acumulada em doze meses.",
    "Não é a porcentagem de famílias endividadas ou inadimplentes. A série usa o conceito de renda revisado pelo BCB em 2021, sem emendar a antiga SGS 19882.",
  ],
  [
    "29034",
    "comprometimento-renda",
    "Quanto da renda paga dívidas?",
    "% da renda · ajuste sazonal",
    "Serviço da dívida das famílias · dezembro",
    "Comprometimento agregado da renda das famílias com juros e amortização de dívidas no Sistema Financeiro Nacional, na série com ajuste sazonal.",
    "Não é dívida total dividida pela renda anual, nem a prestação de uma família típica. Agregados nacionais não descrevem a distribuição entre faixas de renda.",
  ],
] as const;
export const creditIndicators: Indicator[] = specs.map(
  ([code, slug, title, unit, seriesName, description, caveat]) => ({
    slug,
    title,
    unit,
    seriesName,
    description,
    caveat,
    category: "Economia",
    points: data[code].points,
    summary: description,
    findings: [
      { title: "O conceito importa", body: caveat },
      {
        title: "Dezembro de cada ano",
        body: "O gráfico anual usa a observação de dezembro. O arquivo original preserva os dados mensais; não apresentamos o último mês de 2026 como se fosse dezembro ou um resultado anual fechado.",
      },
      {
        title: "Juros e dívida não são a mesma coisa",
        body: "Juros são o preço do crédito; endividamento é uma relação entre estoque de obrigações e renda; comprometimento mede o serviço da dívida. Crescimento do crédito não equivale automaticamente a maior inadimplência.",
      },
    ],
    methodology: `BCB, SGS ${code}. Seleção de dezembro dos anos completos disponíveis até 2025. A periodicidade original é mensal. ${description}`,
    sources: [
      {
        label: `Banco Central · metadados SGS ${code}`,
        url: `https://www3.bcb.gov.br/sgspub/consultarmetadados/consultarMetadadosSeries.do?method=consultarMetadadosSeriesInternet&hdOidSerieSelecionada=${code}`,
      },
      { label: "BCB · dados mensais originais", url: data[code].source },
    ],
  }),
);
