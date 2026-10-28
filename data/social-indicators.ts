import type { Indicator } from "./historical";
import data from "./social-programs.json";
export const socialIndicators: Indicator[] = (
  ["FAM_PBF", "VAL_PBF", "PES_BPC", "VAL_BPC"] as const
).map((code) => {
  const pbf = code.endsWith("PBF"),
    money = code.startsWith("VAL"),
    name = pbf ? "Bolsa Família e sucessão de programas" : "BPC";
  const geographies = data[code].geographies.map((g) => ({
    ...g,
    points: g.points.map((p) => ({
      ...p,
      value: p.value / (money ? 1e6 : 1e6),
    })),
  }));
  return {
    slug: `${pbf ? "bolsa-familia" : "bpc"}-${money ? "recursos" : "beneficios"}`,
    title: `${name}: ${money ? "recursos" : "benefícios"}`,
    seriesName: `${name} · ${money ? "transferências na posição de referência" : "benefícios na posição de referência"}`,
    category: "Programas sociais",
    unit: money ? "R$ bilhões" : "milhões de benefícios",
    priceBasis: money ? "nominal-brl" : undefined,
    points: geographies.find((g) => g.id === "br")!.points,
    geographies,
    description:
      "Evolução da série oficial Ipeadata, com as definições e recortes temporais próprios de cada programa.",
    summary:
      "Quantidade de benefícios e valor transferido são medidas diferentes. O total monetário de uma posição mensal não é a soma de recursos pagos no ano inteiro.",
    findings: [
      {
        title: "Posição e fluxo anual",
        body: "BPC usa dezembro de cada ano. As séries anuais do Bolsa Família são apresentadas como posição de referência conforme o metadado do Ipea, sem somar meses.",
      },
      {
        title: "Mudanças de programa",
        body: "Bolsa Família, Auxílio Brasil e o novo Bolsa Família têm regras diferentes. A continuidade do indicador cadastral não torna idênticos o desenho, os valores ou as condicionalidades.",
      },
      {
        title: "Benefícios não são pessoas",
        body: "Uma família pode reunir várias pessoas. Não compare beneficiários individuais do BPC e famílias do Bolsa Família como se fossem a mesma unidade.",
      },
    ],
    methodology: `Ipeadata, série ${code}, fonte administrativa dos programas. ${pbf ? "Base anual; o metadado descreve dezembro, embora a data técnica da API seja rotulada em janeiro do ano de referência. Essa rotulagem é preservada como ano, não reinterpretada como pagamento de janeiro." : "Base mensal, seleção de dezembro."} Valores monetários originais em R$ mil, divididos por um milhão para R$ bilhões; contagens divididas por um milhão.`,
    caveat:
      "Não é gasto anual total. Mudanças de critérios, revisões e diferenças cadastrais limitam a comparabilidade. A série não identifica isoladamente o efeito do programa sobre pobreza ou emprego.",
    sources: [
      { label: `Ipeadata · ${code}`, url: data[code].source },
      {
        label: "MDS · dados e ferramentas",
        url: "https://www.gov.br/mds/pt-br/orgaos/SAGICAD/dados-e-ferramentas-informacionais",
      },
    ],
  } as Indicator;
});
