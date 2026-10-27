import type { Indicator } from "./historical";
import mobility from "./mobility.json";

export const fuelSource =
  "https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia/precos/precos-revenda-e-de-distribuicao-combustiveis/serie-historica-do-levantamento-de-precos";
const fuelDefinitions = [
  ["GASOLINACOMUM", "Gasolina comum", "R$/litro"],
  ["GASOLINAADITIVADA", "Gasolina aditivada", "R$/litro"],
  ["ETANOLHIDRATADO", "Etanol hidratado", "R$/litro"],
  ["OLEODIESEL", "Óleo diesel · série histórica / S500 comum", "R$/litro"],
  ["OLEODIESELS10", "Diesel S10", "R$/litro"],
  ["GNV", "Gás natural veicular (GNV)", "R$/m³"],
  ["GLP", "Gás de cozinha (GLP P13)", "R$/botijão de 13 kg"],
] as const;
export const fuelIndicators: Indicator[] = fuelDefinitions.map(
  ([key, name, unit], index) => {
    const geographies = mobility.fuels[key];
    return {
      slug: index === 0 ? "combustiveis" : `combustiveis-${key.toLowerCase()}`,
      title: "Como os preços dos combustíveis evoluíram?",
      category: "Economia",
      description:
        "Gasolina, etanol, diesel, GNV e gás de cozinha: preços de dezembro, com recortes por estado e região.",
      unit,
      priceBasis: "nominal-brl",
      seriesName: `${name} · preço médio em dezembro`,
      points: geographies.find((g) => g.id === "br")!.points,
      geographies,
      summary: `A série de ${name.toLowerCase()} compara o preço médio de revenda de dezembro de cada ano, na unidade indicada. É o valor nominal pesquisado pela ANP no varejo, não o preço cobrado pela Petrobras na refinaria nem a média anual. Escolha outro combustível e consulte Brasil, regiões e estados disponíveis.`,
      findings: [
        {
          title: "Compare o mesmo mês e o mesmo produto",
          body: "Dezembro oferece um recorte anual consistente, mas não revela todas as oscilações dentro do ano. Um pico no meio do ano pode não aparecer. Gasolina comum e aditivada, diesel histórico/S500 e S10 permanecem em séries separadas.",
        },
        {
          title: "Preço nominal não mede sozinho o poder de compra",
          body: "A opção nominal mostra os reais de cada época; a opção real aplica o IPCA e usa dezembro de 2025 como referência comum. Uma comparação do custo de abastecer precisa considerar também renda, consumo do veículo e distância percorrida. Correção monetária não transforma o IPCA na inflação específica de cada combustível.",
        },
        {
          title: "O preço final tem vários componentes",
          body: "Câmbio, petróleo, biocombustíveis, tributos, frete e margens de distribuição e revenda influenciam o preço. A marcação dos governos situa as datas; não demonstra que o presidente, sozinho, determinou cada variação.",
        },
      ],
      methodology:
        "ANP, planilhas mensais oficiais do levantamento de preços, Brasil, regiões e UFs, julho de 2001 em diante. Selecionamos exclusivamente o preço médio de revenda de dezembro, até 2025. Não calculamos médias simples dos estados para obter a média nacional. Produtos e territórios sem observação ficam ausentes. Desde o fim de outubro de 2004, os preços estaduais, regionais e nacionais passaram de média simples para ponderação pelas vendas informadas pelas distribuidoras.",
      caveat:
        "A cobertura amostral e a metodologia mudaram. A ANP informa suspensão da pesquisa entre 18/08 e 17/10/2020; esta série usa dezembro. GNV não tem observações em todas as UFs. Aditivada e S10 têm históricos mais curtos. A série de óleo diesel teve mudança de especificação: a planilha atual identifica o produto como diesel B S500 comum. O acervo não cria preços anteriores à pesquisa nem inclui dezembro de 2026, ainda não ocorrido na data da atualização.",
      sources: [
        {
          label: "ANP · séries mensais, planilhas e notas metodológicas",
          url: fuelSource,
        },
      ],
    };
  },
);

export const dollarIndicator: Indicator = {
  priceBasis: "nominal-brl",
  slug: "dolar",
  title: "Como o dólar evoluiu desde o Plano Real?",
  category: "Economia",
  description:
    "Cotação de venda do dólar em reais, em dezembro de cada ano, com a alternativa de fechamento do período.",
  unit: "R$/US$",
  seriesName: "Dólar comercial · venda · média de dezembro",
  points: mobility.currency["3698"].points,
  summary:
    "O gráfico mostra quantos reais eram necessários para comprar um dólar, pela média de venda de dezembro publicada pelo Banco Central. Uma alta significa desvalorização nominal do real frente ao dólar; uma queda, valorização. Não é a cotação do dólar turismo e não inclui tarifas ou impostos de uma compra de moeda.",
  findings: [
    {
      title: "O recorte começa com o real",
      body: "A primeira observação exibida é dezembro de 1994. Valores anteriores envolvem outras moedas e sucessivas reformas monetárias. Não os emendamos como se fossem uma série contínua de reais por dólar desde 1985.",
    },
    {
      title: "Média e fechamento são medidas diferentes",
      body: "A série principal usa a média mensal de dezembro, não a média de todos os meses do ano. O seletor oferece também a cotação de venda de fim de dezembro. A escolha pode mudar uma comparação e deve ser mantida entre períodos.",
    },
    {
      title: "Câmbio responde ao Brasil e ao exterior",
      body: "Juros relativos, inflação, fluxos de capital, risco, comércio e choques internacionais influenciam a cotação. O gráfico permite confrontar afirmações sobre datas e níveis, mas não isola o efeito causal de uma gestão.",
    },
  ],
  methodology:
    "Banco Central, Sistema Gerenciador de Séries Temporais (SGS), série 3698: taxa de câmbio comercial, venda, média de período, mensal. Seleção do mês de dezembro de 1994 a 2025. A alternativa SGS 3695 usa fim de período. Unidade: real por dólar americano, valores nominais.",
  caveat:
    "Sem desagregação por estado: trata-se de uma referência cambial nacional. O gráfico anual não representa máximas diárias nem a trajetória dentro de cada ano. Uma série de câmbio real efetivo seria outro indicador e não é substituída por esta cotação nominal.",
  sources: [
    {
      label: "Banco Central · SGS 3698, média mensal de venda",
      url: mobility.currency["3698"].source,
    },
    {
      label: "Banco Central · SGS 3695, venda no fim de período",
      url: mobility.currency["3695"].source,
    },
  ],
};

export const transportSource =
  "https://ontl.infrasa.gov.br/wp-content/uploads/2026/01/Diagnostico_logistico-2023-database_2010_2022-ajustado-1.pdf";
const annual = (first: number, values: number[]) =>
  values.map((value, i) => ({ year: first + i, value }));
export const transportIndicators: Indicator[] = [
  {
    slug: "rodovias",
    title: "Como a malha rodoviária federal evoluiu?",
    category: "Transportes",
    description:
      "Extensão pavimentada e não pavimentada das rodovias federais, sem confundir estoque de estradas com obras entregues.",
    unit: "mil km",
    seriesName: "Malha federal pavimentada",
    points: annual(
      2010,
      [
        62.1, 64, 64.7, 64.9, 66.3, 64.9, 64.8, 65.5, 65.4, 65.5, 64.2, 65.7,
        65.8,
      ],
    ),
    secondary: {
      name: "Malha federal não pavimentada",
      points: annual(
        2010,
        [13.8, 13, 12.8, 12.5, 12.8, 11.5, 11.7, 10.7, 10.4, 10, 9.5, 9.4, 8.4],
      ),
    },
    summary:
      "A pavimentação amplia a utilidade da rede existente, enquanto duplicações aumentam capacidade e manutenção preserva a circulação. Nenhuma dessas medidas é automaticamente equivalente a abrir uma estrada nova. Esta série é o estoque de rodovias sob jurisdição federal no recorte publicado pelo ONTL.",
    findings: [
      {
        title: "A malha pode mudar de jurisdição",
        body: "Uma rodovia estadualizada deixa o estoque federal sem necessariamente desaparecer fisicamente. Federalizações e revisões cadastrais também alteram a comparação. Por isso, a diferença entre dois anos não é uma contagem direta de quilômetros construídos pelo governo.",
      },
      {
        title: "Duplicação e restauração precisam de contas próprias",
        body: "Reasfaltar uma estrada existente não acrescenta, necessariamente, extensão à malha. Para avaliar entregas, identifique o trecho, o serviço, a extensão liberada ao tráfego e a data de recebimento.",
      },
      {
        title: "Uma obra pode atravessar vários governos",
        body: "Projeto, licenciamento, contratação, execução e abertura ao tráfego podem ocorrer em mandatos diferentes. A cronologia de obras desta seção registra etapas, sem atribuir toda a obra exclusivamente a quem participou da inauguração.",
      },
    ],
    methodology:
      "DNIT, conforme gráfico da página 19 do Diagnóstico Logístico 2010–2022, ONTL/Infra S.A. (2023). Transcrição dos rótulos publicados em mil quilômetros, com precisão de uma casa decimal. Apenas malha federal; não inclui toda a rede estadual e municipal.",
    caveat:
      "Recorte histórico encerrado em 2022 nesta edição. Não representa o cadastro atual nem uma série de construção anual. Não somamos balanços que misturam implantação, pavimentação, adequação e recuperação como se todos fossem novas estradas.",
    sources: [
      {
        label:
          "ONTL/Infra S.A. · Diagnóstico Logístico, página 19 · fonte DNIT",
        url: transportSource,
      },
    ],
  },
  {
    slug: "ferrovias",
    title: "Como o transporte ferroviário de cargas evoluiu?",
    category: "Transportes",
    description:
      "Carga movimentada por ferrovias e uma cronologia de expansão, concessão e entrada em operação.",
    unit: "milhões de toneladas úteis",
    seriesName: "Carga ferroviária · toneladas úteis",
    points: annual(
      2010,
      [
        435.2, 454.4, 453.2, 450.7, 465.1, 491.6, 503.8, 538.8, 569.9, 494.9,
        489.3, 506.8,
      ],
    ),
    summary:
      "A carga transportada mede utilização da rede ferroviária, não quilômetros de trilhos construídos. A ampliação pode envolver novas linhas, terminais, duplicações, acesso a portos e recuperação de trechos. O volume também depende da demanda e da composição das cargas.",
    findings: [
      {
        title: "Tonelada útil não é tonelada-quilômetro",
        body: "TU mede massa transportada. TKU incorpora a distância. Não juntamos os dois conceitos no mesmo eixo nem interpretamos uma alta de volume como igual crescimento da extensão dos trilhos.",
      },
      {
        title: "Concessão não é inauguração",
        body: "Um leilão ou contrato define direitos e obrigações; a infraestrutura pode já existir ou ainda precisar de obras. A Norte-Sul aparece na cronologia com etapas de diferentes governos.",
      },
    ],
    methodology:
      "ANTT, série de TU reproduzida no gráfico da página 39 do Diagnóstico Logístico 2010–2022. O gráfico consultado contém rótulos de 2010 a 2021; não inferimos um valor de 2022 a partir de percentuais arredondados do texto.",
    caveat:
      "Série nacional histórica de movimentação, sem recorte estadual incorporado nesta versão. Não mede transporte urbano de passageiros nem infraestrutura recém-construída.",
    sources: [
      {
        label:
          "ONTL/Infra S.A. · Diagnóstico Logístico, página 39 · fonte ANTT",
        url: transportSource,
      },
    ],
  },
  {
    slug: "hidrovias",
    title: "Como a navegação interior ampliou sua frota?",
    category: "Transportes",
    description:
      "Embarcações de navegação interior e intervenções para ampliar a capacidade dos corredores hidroviários.",
    unit: "embarcações",
    seriesName: "Frota de navegação interior",
    points: annual(2010, [
      748 + 478 + 33 + 84,
      811 + 518 + 37 + 106,
      915 + 552 + 49 + 109,
      1015 + 581 + 59 + 127,
      1164 + 631 + 67 + 153,
      1356 + 664 + 120 + 190,
      1513 + 686 + 139 + 191,
      1615 + 711 + 153 + 193,
      1730 + 718 + 169 + 222,
      1778 + 724 + 178 + 251,
      1883 + 757 + 202 + 261,
      1972 + 759 + 203 + 232,
      2101 + 797 + 207 + 255,
    ]),
    summary:
      "A frota de navegação interior é uma medida da oferta de embarcações. Para ampliar o uso dos rios, também importam terminais, eclusas, dragagem, sinalização e condições ambientais. Mais embarcações não significam, automaticamente, mais quilômetros navegáveis durante todo o ano.",
    findings: [
      {
        title: "Capacidade depende também do rio",
        body: "Estiagens, calado, barragens e restrições de passagem afetam a navegação. Obras exigem análise de impactos e participação das comunidades afetadas; uma licença ou previsão não é entrega concluída.",
      },
      {
        title: "Frota não é fluxo de carga",
        body: "Contamos as categorias publicadas pela ANTAQ: balsas/barcaças/chatas, rebocadores/empurradores, lanchas e outros. Não convertemos a quantidade de unidades em toneladas transportadas ou capacidade sem conhecer as características de cada embarcação.",
      },
    ],
    methodology:
      "Soma, para cada ano, das quatro categorias de embarcações apresentadas na página 55 do Diagnóstico Logístico 2010–2022, fonte ANTAQ. Série de 2010 a 2022; sem interpolação.",
    caveat:
      "Recorte nacional histórico da frota, não da extensão hidroviária nem de obras entregues. O gráfico não mede, por si só, a distribuição territorial ou a disponibilidade operacional de cada embarcação.",
    sources: [
      {
        label:
          "ONTL/Infra S.A. · Diagnóstico Logístico, página 55 · fonte ANTAQ",
        url: transportSource,
      },
    ],
  },
  {
    slug: "portos",
    title: "Como a movimentação de contêineres nos portos evoluiu?",
    category: "Transportes",
    description:
      "Volume portuário em TEUs, uma medida de utilização que complementa a análise da expansão dos terminais.",
    unit: "milhões de TEUs",
    seriesName: "Movimentação portuária de contêineres",
    points: mobility.transport["IS.SHP.GOOD.TU"].points.map((p) => ({
      ...p,
      value: p.value / 1e6,
    })),
    summary:
      "TEU é a unidade equivalente a um contêiner de vinte pés. A série mede o fluxo portuário de contêineres e não todas as cargas dos portos brasileiros. Ela ajuda a observar a utilização dos terminais, junto à capacidade, aos acessos terrestres e às obras de expansão.",
    findings: [
      {
        title: "Nem toda carga está em contêiner",
        body: "Minério, grãos e combustíveis também passam pelos portos como granéis. Não tratamos o volume em TEU como se fosse a tonelagem total do setor.",
      },
      {
        title: "Movimentação e capacidade são diferentes",
        body: "Um porto pode movimentar mais utilizando melhor a infraestrutura existente, e pode ampliar instalações antes de a demanda crescer. Para atribuir resultados a uma obra específica, é preciso avaliar capacidade e operação do terminal.",
      },
    ],
    methodology:
      "Banco Mundial/WDI, IS.SHP.GOOD.TU, container port traffic, convertido de TEUs para milhões de TEUs. Observações publicadas de 2010 a 2024; fonte e cobertura seguem os metadados do WDI.",
    caveat:
      "Base nacional, sem recorte por porto ou UF incorporado nesta versão. Não mede novas obras, investimento, tonelagem total ou participação de todos os modais no transporte de cargas.",
    sources: [
      {
        label: "Banco Mundial · movimentação portuária de contêineres",
        url: "https://data.worldbank.org/indicator/IS.SHP.GOOD.TU?locations=BR",
      },
    ],
  },
  {
    slug: "aviacao",
    title: "Como o transporte aéreo de passageiros evoluiu?",
    category: "Transportes",
    description:
      "Série desde 1970, com o recorte padrão a partir de 1985, para acompanhar a utilização do transporte aéreo.",
    unit: "milhões de passageiros",
    seriesName:
      "Passageiros transportados por empresas aéreas registradas no país",
    points: mobility.transport["IS.AIR.PSGR"].points.map((p) => ({
      ...p,
      value: p.value / 1e6,
    })),
    summary:
      "A série acompanha passageiros transportados pelas empresas aéreas registradas no Brasil, segundo a definição internacional da fonte. Não é uma contagem de pessoas únicas nem a soma de embarques e desembarques de todos os aeroportos brasileiros. A queda da pandemia aparece no histórico.",
    findings: [
      {
        title: "Mais passageiros não é o mesmo que mais aeroportos",
        body: "A utilização depende de renda, oferta de voos, tarifas, turismo e condições sanitárias. Expansão de pistas e terminais deve ser documentada separadamente.",
      },
      {
        title: "A série longa inclui crises e recuperação",
        body: "O histórico completo começa em 1970, enquanto a visualização padrão começa em 1985. Não substituímos dados ausentes por zero e não atribuímos toda mudança de tráfego a decisões de um único governo.",
      },
    ],
    methodology:
      "Banco Mundial/WDI, IS.AIR.PSGR, com origem ICAO. Serviços domésticos e internacionais das empresas registradas no país, conforme metadados do indicador. Dados 1970–2023; valores convertidos para milhões.",
    caveat:
      "Cobertura distinta das estatísticas de movimento de aeroportos da ANAC. Sem recorte por estado nesta base. Não é uma medida direta de construção de aeroportos, acessibilidade da tarifa ou qualidade do serviço.",
    sources: [
      {
        label:
          "Banco Mundial · transporte aéreo de passageiros, metodologia ICAO",
        url: "https://data.worldbank.org/indicator/IS.AIR.PSGR?locations=BR",
      },
    ],
  },
];

export const mobilityIndicators = [
  fuelIndicators[0],
  dollarIndicator,
  ...transportIndicators,
];
