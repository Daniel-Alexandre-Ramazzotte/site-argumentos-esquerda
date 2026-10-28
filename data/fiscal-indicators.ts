import type { Indicator } from "./historical";
import budget from "./budget.json";
import debt from "./debt.json";
export const budgetStages = [
  "Despesas Pagas",
  "Despesas Liquidadas",
  "Despesas Empenhadas",
] as const;
export function budgetIndicator(
  code: string,
  name: string,
  category: string,
  stage: string = budgetStages[0],
): Indicator {
  return {
    slug: `verbas-${code}`,
    title: `Verbas federais para ${name.toLocaleLowerCase("pt-BR")}`,
    category,
    unit: "R$ bilhões",
    seriesName: `${name} · União · ${stage.toLowerCase()}`,
    points: budget.map((row) => ({
      year: row.year,
      value:
        row.functions
          .filter((f) => f.code === code && f.stage === stage)
          .reduce((sum, f) => sum + f.value, 0) / 1e9,
    })),
    priceBasis: "nominal-brl",
    priceObservation: "annual-average",
    description: `Execução de despesas da União na função ${name}, com valores pagos, liquidados e empenhados.`,
    summary:
      "O orçamento autorizado e a despesa executada são etapas diferentes. A série principal mostra despesas pagas do exercício; o seletor oferece liquidação e empenho. Use o IPCA para comparar poder de compra.",
    findings: [
      {
        title: "Verbas federais",
        body: "São despesas da União, não a soma de União, estados e municípios. Transferências entre entes exigem cuidado para evitar dupla contagem.",
      },
      {
        title: "Função não é mínimo constitucional",
        body: "Classificação funcional não equivale automaticamente a ASPS na saúde ou MDE na educação. Este gráfico não basta para verificar mínimos constitucionais.",
      },
      {
        title: "Etapas da execução",
        body: "Empenho registra obrigação orçamentária; liquidação verifica o direito do credor; pagamento representa saída financeira. Este recorte do exercício não inclui automaticamente todos os pagamentos de restos a pagar.",
      },
    ],
    methodology: `Tesouro/Siconfi, DCA Anexo I-E, União (id_ente=1), 2014–2025. Função ${code}, ${stage}, sem somar subfunções. Bilhões de reais. Correção de fluxos anuais pelo IPCA médio dos doze meses para dezembro de 2025: aproximação sem a distribuição mensal dos pagamentos.`,
    caveat:
      "A extração começa em 2014. Inclui o recorte funcional informado pela União, não somente despesas discricionárias do Executivo ou obras. Não criamos observações desde 1985.",
    sources: [
      {
        label: "Tesouro · documentação Siconfi",
        url: "https://apidatalake.tesouro.gov.br/docs/siconfi/",
      },
      { label: "Siconfi · DCA I-E · União · 2025", url: budget.at(-1)!.source },
    ],
  };
}
export function debtIndicator(external = false, percent = true): Indicator {
  const code = external
    ? percent
      ? "BM12_DEXGFY12"
      : "BM12_DEXGFN12"
    : percent
      ? "BM12_DINGFY12"
      : "BM12_DINGFN12";
  const name = external ? "externa" : "interna";
  return {
    slug: `divida-${name}${percent ? "" : "-reais"}`,
    title: `Dívida ${name} líquida federal`,
    category: "Economia",
    seriesName: `Dívida ${name} líquida · ${percent ? "% do PIB" : "R$ bilhões"} · governo federal e Banco Central · dezembro`,
    unit: percent ? "% do PIB" : "R$ bilhões",
    points: debt[code].points
      .filter((p) => percent || p.year >= 1995)
      .map((p) => ({ ...p, value: p.value / (percent ? 1 : 1000) })),
    priceBasis: percent ? undefined : "nominal-brl",
    description: `Dívida ${name} líquida do governo federal e Banco Central, ${percent ? "em proporção do PIB" : "em bilhões de reais"}, ao fim de cada ano.`,
    summary:
      "A medida desconta ativos financeiros dos passivos no recorte federal e do Banco Central. Interna e externa distinguem a residência do credor, não simplesmente a moeda do contrato.",
    findings: [
      {
        title: "Líquida e bruta são diferentes",
        body: "Saldo líquido externo negativo significa ativos superiores aos passivos no recorte. Não significa ausência de dívida externa bruta ou quitação de todos os contratos.",
      },
      {
        title: "A relação com o PIB",
        body: "O indicador muda tanto pelo estoque quanto pelo PIB. Câmbio, juros, resultado fiscal e operações patrimoniais influenciam sua evolução.",
      },
      {
        title: "Escopos distintos",
        body: "Este recorte não equivale à dívida bruta do governo geral, que também abrange estados e municípios, nem à dívida externa total pública e privada do país.",
      },
    ],
    methodology: `Ipeadata, fonte Banco Central, ${code}, dezembro. ${percent ? "Percentual do PIB publicado pela fonte." : "Milhões de reais divididos por mil; a partir de 1995 para evitar moedas anteriores ao real. Correção opcional pelo IPCA de dezembro."}`,
    caveat:
      "Estoque no fim do ano. Revisões metodológicas e das Contas Nacionais podem alterar o histórico. Faixas de governos contextualizam o período, sem demonstrar causalidade.",
    sources: [
      { label: `Ipeadata/BCB · ${code}`, url: debt[code].source },
      {
        label: "BCB · estatísticas fiscais",
        url: "https://www.bcb.gov.br/estatisticas/estatisticasfiscais",
      },
    ],
  };
}
export const fiscalIndicators: Indicator[] = [
  budgetIndicator("06", "Segurança pública", "Segurança"),
  budgetIndicator("10", "Saúde", "Saúde"),
  budgetIndicator("12", "Educação", "Educação"),
  debtIndicator(),
  debtIndicator(true),
  {
    ...debtIndicator(),
    slug: "divida-bruta",
    title: "Dívida bruta do governo geral",
    seriesName: "Dívida bruta do governo geral · dezembro",
    points: debt["13762"].points,
    description:
      "Dívida bruta do governo geral (DBGG), em percentual do PIB, no encerramento de cada ano.",
    summary:
      "A DBGG é uma medida bruta de endividamento da União, estados e municípios. Não deduz ativos como as medidas líquidas federais das outras páginas.",
    methodology:
      "BCB, SGS 13762, metodologia da DBGG vigente a partir de 2008, retroativa desde 2006. Dezembro, percentual do PIB.",
    sources: [
      { label: "BCB · SGS 13762", url: debt["13762"].source },
      {
        label: "BCB · estatísticas fiscais",
        url: "https://www.bcb.gov.br/estatisticas/estatisticasfiscais",
      },
    ],
  },
];
