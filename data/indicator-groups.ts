export type IndicatorGroup = {
  slug: string;
  title: string;
  description: string;
  category: string;
  indicators: string[];
  rates?: string[];
  defaultSlugs?: string[];
};
export const indicatorGroups: IndicatorGroup[] = [
  {
    slug: "empresas",
    title: "Empresas por regime tributário",
    description:
      "CNPJs declarantes e receita bruta nos regimes lucro real e presumido. Receita não é lucro líquido.",
    category: "Emprego e renda",
    indicators: [
      "empresas-lucro-real",
      "empresas-lucro-presumido",
      "empresas-lucro-real-receita",
      "empresas-lucro-presumido-receita",
    ],
    defaultSlugs: ["empresas-lucro-real", "empresas-lucro-presumido"],
  },
  {
    slug: "cnpjs",
    title: "Empresas ativas e delta do estoque",
    description:
      "Estoque publicado e diferenças entre retratos, com limites de comparabilidade cadastral.",
    category: "Emprego e renda",
    indicators: ["cnpjs-ativos", "cnpjs-ativos-delta"],
  },
  {
    slug: "bancos",
    title: "Lucro e rentabilidade dos bancos",
    description:
      "Lucro líquido, segmentos público e privado e ROE. Escopos bancário e SFN identificados, sem emenda automática.",
    category: "Economia",
    indicators: [
      "lucro-bancos",
      "lucro-sfn",
      "lucro-bancos-publicos",
      "lucro-bancos-privados",
      "rentabilidade-sfn",
    ],
    defaultSlugs: [
      "lucro-sfn",
      "lucro-bancos-publicos",
      "lucro-bancos-privados",
    ],
  },
  {
    slug: "atividade-economica",
    title: "PIB e atividade econômica",
    description:
      "PIB real, PIB por habitante e crescimento anual, com séries selecionáveis no mesmo gráfico.",
    category: "Economia",
    indicators: ["pib", "pib-per-capita", "crescimento-pib"],
    rates: ["crescimento-pib"],
  },
  {
    slug: "divida",
    title: "Dívida interna e externa",
    description:
      "Parcelas líquidas federais, dívida bruta e dívida externa total: compare os escopos e as trajetórias.",
    category: "Economia",
    indicators: [
      "divida-interna",
      "divida-externa",
      "divida-bruta",
      "divida-externa-total",
    ],
  },
  {
    slug: "juros-e-familias",
    title: "Juros e endividamento das famílias",
    description:
      "Selic, custo do crédito, dívida em relação à renda e comprometimento com parcelas.",
    category: "Economia",
    indicators: [
      "juros",
      "juros-pessoas-fisicas",
      "divida-familias",
      "comprometimento-renda",
    ],
  },
  {
    slug: "inflacao",
    title: "Inflação e alimentos",
    description:
      "Índice geral e alimentação no mesmo contexto, com recortes e metodologias próprios.",
    category: "Economia",
    indicators: ["inflacao", "inflacao-de-alimentos"],
  },
  {
    slug: "rede",
    title: "Malha e estrutura de transporte",
    description:
      "Rodovias federais e frota da navegação interior: estoques distintos da infraestrutura.",
    category: "Transporte",
    indicators: ["rodovias", "hidrovias"],
  },
  {
    slug: "movimentacao",
    title: "Cargas e passageiros por modal",
    description:
      "Ferrovias, contêineres nos portos e passageiros aéreos: compare a evolução sem igualar unidades.",
    category: "Transporte",
    indicators: ["ferrovias", "portos", "aviacao"],
  },
  {
    slug: "medicos",
    title: "Médicos: oferta, formação e atuação",
    description:
      "Densidade e total de médicos, com fontes, limites e seleção das séries disponíveis.",
    category: "Saúde",
    indicators: [
      "medicos-dmb",
      "medicos-total",
      "medicos-formados",
      "medicos-emprego-formal",
      "medicos",
    ],
    defaultSlugs: ["medicos-dmb", "medicos-total"],
  },
];

export function groupHref(g: IndicatorGroup) {
  const base =
    g.category === "Transporte"
      ? "/transportes"
      : g.category === "Saúde"
        ? "/saude"
        : g.category === "Emprego e renda"
          ? "/emprego-e-renda"
          : "/economia";
  return `${base}/${g.slug}`;
}
