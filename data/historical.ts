import sidra from "./sidra.json";
import geography from "./geography.json";
import { extraIndicators } from "./extra-indicators";
import { mobilityIndicators } from "./mobility-indicators";
export type Point = { year: number; value: number };
export type Geography = {
  id: string;
  name: string;
  level: string;
  points: Point[];
};
export type Indicator = {
  priceBasis?: "nominal-brl" | "constant";
  geographies?: Geography[];
  frequency?: "annual" | "cycles";
  locationName?: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  unit: string;
  seriesName: string;
  points: Point[];
  secondary?: { name: string; points: Point[] };
  summary: string;
  findings: { title: string; body: string }[];
  methodology: string;
  caveat: string;
  sources: { label: string; url: string }[];
};
const points = (first: number, values: number[]): Point[] =>
  values.map((value, i) => ({ year: first + i, value }));
export const indicators: Indicator[] = [
  ...mobilityIndicators,
  {
    slug: "pobreza",
    title: "Como a pobreza mudou ao longo do tempo?",
    category: "Emprego e renda",
    description:
      "A trajetória da pobreza monetária e da extrema pobreza, ano a ano, com o mesmo critério de comparação.",
    unit: "% da população",
    seriesName: "Pobreza",
    points: points(
      2012,
      [
        34.7, 32.5, 30.9, 31.7, 33.7, 33.7, 33.4, 32.6, 31.1, 36.8, 31.6, 27.3,
        23.1,
      ],
    ),
    secondary: {
      name: "Extrema pobreza",
      points: points(
        2012,
        [6.6, 5.8, 5.2, 5.6, 6.7, 7.3, 7.4, 7.4, 6.1, 9, 5.9, 4.4, 3.5],
      ),
    },
    summary:
      "A proporção de pessoas na pobreza caiu de 34,7% em 2012 para 23,1% em 2024, com altas e quedas no caminho. A melhora recente sucede o pico de 2021; a série permite enxergar ambos.",
    findings: [
      {
        title: "A queda não foi contínua",
        body: "A taxa recuou até 2014, voltou a subir e atingiu 36,8% em 2021. Em 2024, chegou ao menor valor deste recorte. Descrever o período inteiro como uma trajetória sem interrupções seria incorreto.",
      },
      {
        title: "Pobreza e extrema pobreza são linhas diferentes",
        body: "Em 2024, a extrema pobreza foi de 3,5%. A linha mais baixa identifica uma privação monetária mais intensa; não deve ser confundida com o total abaixo da linha de pobreza.",
      },
      {
        title: "A origem da renda importa",
        body: "O indicador reúne rendimentos domiciliares de diferentes origens. Atribuir uma mudança a determinada política exige examinar a composição da renda e avaliações dessa política, além de observar o gráfico.",
      },
    ],
    methodology:
      "IBGE, Síntese de Indicadores Sociais 2025, PNAD Contínua 2012–2024. Pobreza: renda domiciliar por pessoa inferior a US$ 6,85 PPC/dia; extrema pobreza: inferior a US$ 2,15 PPC/dia, nas linhas PPC de 2017 usadas na publicação. Percentuais arredondados a uma casa decimal.",
    caveat:
      "Linhas do Banco Mundial e ponderações das pesquisas podem mudar. Este recorte mantém a definição da publicação citada e não emenda séries antigas da PNAD com a PNAD Contínua.",
    sources: [
      {
        label: "IBGE · Síntese de Indicadores Sociais 2025",
        url: "https://agenciadenoticias.ibge.gov.br/media/com_mediaibge/arquivos/71016b2eb0a5feb8f7685271b1233db7.pdf",
      },
      {
        label: "Agência Gov · tabela anual reproduzida da divulgação do IBGE",
        url: "https://agenciagov.ebc.com.br/noticias/202512/8-6-milhoes-de-pessoas-sairam-da-pobreza-entre-2023-e-2024",
      },
    ],
  },
  {
    slug: "criminalidade",
    title: "O que a série de homicídios mostra?",
    category: "Segurança",
    description:
      "A evolução da violência letal no Brasil, sem confundir homicídios com toda a criminalidade.",
    unit: "por 100 mil habitantes",
    seriesName: "Homicídios registrados",
    points: points(
      2013,
      [28.8, 30.1, 29.1, 30.6, 31.8, 27.9, 21.7, 23.6, 22.5, 21.7, 21.2],
    ),
    summary:
      "Na edição 2025 do Atlas da Violência, a taxa de homicídios registrados vai de 28,8 em 2013 a 21,2 por 100 mil habitantes em 2023. A queda depois do pico de 2017 atravessa diferentes governos.",
    findings: [
      {
        title: "A trajetória atravessa diferentes mandatos",
        body: "O recorte sobe até 2017, cai em 2018 e 2019, volta a subir em 2020 e recua nos anos seguintes. Selecionar apenas duas datas esconde essas mudanças.",
      },
      {
        title: "Homicídios não são todos os crimes",
        body: "O indicador não mede furtos, roubos, fraudes digitais ou a percepção de insegurança. Uma queda da violência letal não demonstra que todas as formas de criminalidade diminuíram.",
      },
      {
        title: "A qualidade do registro tem limites",
        body: "Mortes violentas de causa indeterminada podem ocultar homicídios. O Atlas distingue registros oficiais de estimativas que tentam corrigir essa lacuna; aqui usamos apenas a série registrada.",
      },
    ],
    methodology:
      "Atlas da Violência 2025, tabela 2.1, linha Brasil, 2013–2023. Mortes por agressão, intervenção legal e operações de guerra (CID-10 X85–Y09 e Y35–Y36), por 100 mil habitantes. Bases SIM/Ministério da Saúde e população PNAD Contínua, segundo os critérios dessa edição.",
    caveat:
      "Recorte da edição 2025, não o último ano disponível de todas as bases de segurança. Não acrescentamos valores de outra edição com denominadores populacionais diferentes. Segurança envolve União, estados e municípios.",
    sources: [
      {
        label: "Ipea e FBSP · Atlas da Violência 2025, tabela 2.1, p. 14",
        url: "https://forumseguranca.org.br/wp-content/uploads/2025/05/atlas-violencia-2025.pdf",
      },
    ],
  },
  {
    slug: "inflacao",
    title: "Como a inflação mudou desde 1980?",
    category: "Economia",
    description:
      "O IPCA anual desde 1980, com a redemocratização e os períodos de hiperinflação em perspectiva.",
    unit: "% no ano",
    seriesName: "IPCA",
    points: sidra.ipca.points,
    geographies: geography.ipca,
    summary:
      "A inflação anual oscilou bastante desde 1980. Uma taxa menor significa que os preços subiram mais devagar; não significa que voltaram ao nível anterior. O início padrão é 1985; o histórico completo permite consultar anos anteriores.",
    findings: [
      {
        title: "Inflação menor não é preço menor",
        body: "Uma inflação de 4% depois de uma de 10% ainda indica aumento de preços. A alta acumulada em vários anos é calculada por multiplicação dos fatores anuais, não por soma das taxas.",
      },
      {
        title: "Há choques em vários períodos",
        body: "O IPCA anual foi de 10,67% em 2015 e 10,06% em 2021. O primeiro episódio antecede a COVID-19; o segundo ocorre durante a pandemia. O contexto de cada alta exige análise própria.",
      },
      {
        title: "Uma cesta média não é a cesta de toda família",
        body: "O IPCA combina grupos de consumo. O peso de alimentação, transporte e moradia muda a experiência de quem consome, mesmo quando a média nacional é a mesma.",
      },
    ],
    methodology:
      "Brasil: IBGE/SIDRA 1737, variável 69, dezembro de 1980–2025. Áreas do IPCA: tabelas 2938, 1419 e 7060, desde 2006 conforme disponibilidade. Áreas metropolitanas e municípios pesquisados não representam todos os estados. Não incluímos 2026 parcial.",
    caveat:
      "As faixas de governo situam a cronologia. O gráfico não isola efeitos de juros, câmbio, oferta, tributos ou preços internacionais e não comprova responsabilidade exclusiva de um presidente.",
    sources: [
      {
        label: "IBGE/SIDRA · tabela 1737, IPCA",
        url: "https://sidra.ibge.gov.br/tabela/1737",
      },
    ],
  },
  {
    slug: "inflacao-de-alimentos",
    title: "Por que os alimentos pesam tanto no bolso?",
    category: "Economia",
    description:
      "Alimentação e bebidas ao lado do IPCA geral, com desacelerações, altas e choques ao longo do tempo.",
    unit: "% no ano",
    seriesName: "Alimentação e bebidas",
    points: [
      ...sidra["food-1992"].points,
      ...sidra["food-2006"].points,
      ...sidra["food-2012"].points,
      ...sidra["food-2020"].points,
    ],
    secondary: {
      name: "IPCA geral",
      points: sidra.ipca.points.filter((p) => p.year >= 1992),
    },
    geographies: geography.food,
    summary:
      "A inflação de alimentação e bebidas pode ficar acima ou abaixo do IPCA geral. O grupo subiu 14,09% em 2020, desacelerou para 1,03% em 2023 e voltou a acelerar para 7,69% em 2024.",
    findings: [
      {
        title: "Alimentação não segue sempre a média",
        body: "Comparar as duas linhas mostra quando a alimentação subiu mais depressa que a cesta geral. Isso ajuda a entender por que a sensação no supermercado pode diferir da inflação anunciada.",
      },
      {
        title: "Desaceleração não reverte a alta anterior",
        body: "Em 2023, o grupo ainda teve variação positiva. Em 2017, a variação anual foi negativa: nesse recorte, houve queda média de preços no grupo.",
      },
      {
        title: "O grupo não é apenas supermercado",
        body: "Alimentação e bebidas inclui consumo no domicílio e fora dele. Não é uma série exclusivamente de cesta básica ou de comida comprada para consumir em casa.",
      },
    ],
    methodology:
      "Brasil 1992–2005: acumulado calculado pela multiplicação das 12 taxas mensais publicadas nas tabelas 58 (categoria 1313) e 655 (categoria 7170). Pode diferir do acumulado oficial pelo arredondamento mensal. De 2006 em diante: acumulado oficial de dezembro nas tabelas 2938, 1419 e 7060. 1991 não foi incluído por ausência de agosto na tabela consultada. Áreas pesquisadas: dados disponíveis desde 2006, sem representar todo o estado.",
    caveat:
      "O encadeamento segue o mesmo grupo do IPCA através de mudanças de estrutura. Não é uma cesta fixa de produtos. Não misturamos anos parciais com anos fechados.",
    sources: [
      {
        label: "IBGE/SIDRA · tabelas históricas 58 e 655",
        url: "https://sidra.ibge.gov.br/tabela/58",
      },
      {
        label: "IBGE/SIDRA · tabela 2938 (2006–2011)",
        url: "https://sidra.ibge.gov.br/tabela/2938",
      },
      {
        label: "IBGE/SIDRA · tabela 1419 (2012–2019)",
        url: "https://sidra.ibge.gov.br/tabela/1419",
      },
      {
        label: "IBGE/SIDRA · tabela 7060 (2020–2025)",
        url: "https://sidra.ibge.gov.br/tabela/7060",
      },
    ],
  },
  ...extraIndicators,
];
export const governments = [
  { name: "Pré-1964", start: 1900, end: 1964 + 91 / 366, pt: false },
  { name: "Ditadura", start: 1964 + 91 / 366, end: 1985 + 73 / 365, pt: false },
  { name: "Sarney", start: 1985 + 73 / 365, end: 1990 + 73 / 365, pt: false },
  { name: "Collor", start: 1990 + 73 / 365, end: 1992 + 275 / 366, pt: false },
  { name: "Itamar", start: 1992 + 275 / 366, end: 1995, pt: false },
  { name: "FHC", start: 1995, end: 2003, pt: false },
  { name: "Lula", start: 2003, end: 2011, pt: true },
  { name: "Dilma", start: 2011, end: 2016 + 132 / 366, pt: true },
  { name: "Temer", start: 2016 + 132 / 366, end: 2019, pt: false },
  { name: "Bolsonaro", start: 2019, end: 2023, pt: false },
  { name: "Lula", start: 2023, end: 2027, pt: true },
];
export function governmentAt(year: number) {
  if (year === 1964) return "Transição de 1964";
  if (year === 1985) return "Figueiredo / Sarney";
  if (year === 1990) return "Sarney / Collor";
  if (year === 1992) return "Collor / Itamar";
  return year === 2016
    ? "Dilma / Temer"
    : (governments.find((g) => year + 0.5 >= g.start && year + 0.5 < g.end)
        ?.name ?? "");
}
export const formatValue = (v: number) =>
  v.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
