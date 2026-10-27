import type { Indicator } from "./historical";
import dev from "./development.json";
import geo from "./geography.json";
const national = (key: keyof typeof geo) =>
  geo[key].find((g) => g.id === "br")!.points;
const years = (first: number, values: number[]) =>
  values.map((value, i) => ({ year: first + i, value }));
const pisaYears = [2000, 2003, 2006, 2009, 2012, 2015, 2018, 2022];
export const extraIndicators: Indicator[] = [
  {
    slug: "desemprego",
    title: "Como o desemprego evoluiu?",
    category: "Emprego e renda",
    description:
      "Taxa de desocupação no quarto trimestre de cada ano, com comparação entre Brasil, estados e regiões.",
    unit: "% da força de trabalho",
    seriesName: "Taxa de desocupação · 4º trimestre",
    points: national("unemployment"),
    geographies: geo.unemployment,
    summary:
      "A taxa de desocupação mede a parcela da força de trabalho que estava sem trabalho, disponível e buscando ocupação segundo a definição da PNAD Contínua. O gráfico usa sempre o quarto trimestre, sem confundir esse recorte com a média anual.",
    findings: [
      {
        title: "A comparação usa o mesmo trimestre",
        body: "Comparar o quarto trimestre de cada ano reduz a mistura de períodos sazonais distintos. Ainda assim, a taxa do trimestre não é a média anual divulgada pelo IBGE.",
      },
      {
        title: "Estar fora da força de trabalho é diferente",
        body: "Pessoas que não procuram trabalho ou não estão disponíveis podem ficar fora do denominador. Desalento, informalidade, renda e subutilização ajudam a completar a análise.",
      },
      {
        title: "O Brasil não tem um mercado de trabalho único",
        body: "O seletor permite consultar regiões e unidades da federação. As taxas regionais são as publicadas pela fonte; não fazemos médias simples entre taxas de estados.",
      },
    ],
    methodology:
      "IBGE, PNAD Contínua trimestral, tabela SIDRA 4099, variável 4099, pessoas de 14 anos ou mais. Observações do quarto trimestre de 2012–2025. Base nacional e as cinco grandes regiões e 27 UFs. Não emendamos esta série com a antiga PME, de cobertura metropolitana distinta.",
    caveat:
      "A série comparável começa em 2012. O site informa esse limite em vez de criar valores desde 1985. A taxa descreve o período, mas não atribui por si só efeitos causais a um governo.",
    sources: [
      {
        label: "IBGE/SIDRA · tabela 4099, PNAD Contínua trimestral",
        url: "https://sidra.ibge.gov.br/tabela/4099",
      },
    ],
  },
  {
    slug: "industrializacao",
    priceBasis: "constant",
    title: "O Brasil está se industrializando?",
    category: "Emprego e renda",
    description:
      "A trajetória da indústria de transformação, distinguindo produção real, participação econômica e evolução regional.",
    unit: "US$ bilhões constantes de 2015",
    seriesName: "Valor adicionado real da manufatura",
    points: dev["NV.IND.MANF.KD"].points.map((p) => ({
      ...p,
      value: p.value / 1e9,
    })),
    summary:
      "Produção real e participação da indústria na economia são medidas diferentes. Uma indústria pode produzir mais em termos reais e perder participação se outros setores crescerem mais. Consulte também as bases regionais no seletor de séries.",
    findings: [
      {
        title: "O volume real tem uma história longa",
        body: "A base permite consultar desde 1960, inclusive anos anteriores a 1964. Valores constantes retiram o efeito da inflação na medida usada pela fonte; não são faturamento nominal em reais.",
      },
      {
        title: "Participação e tamanho não são equivalentes",
        body: "A fatia da manufatura no PIB muda com preços relativos e com o crescimento de outros setores. Não é uma medida direta de quantidade produzida.",
      },
      {
        title: "O recorte territorial exige outra base",
        body: "As Contas Regionais medem indústria total e a PIM mede produção física. São oferecidas como séries separadas, sem trocar silenciosamente a definição de manufatura pela de indústria total.",
      },
    ],
    methodology:
      "Banco Mundial/WDI, NV.IND.MANF.KD, valor adicionado da manufatura em dólares constantes de 2015, convertido para bilhões. Série publicada 1960–2025. O filtro padrão começa em 1985; o histórico completo inclui os anos anteriores.",
    caveat:
      "Conversão monetária e revisões das Contas Nacionais afetam a série. A base nacional do Banco Mundial não é desagregada automaticamente entre estados. Não apresentamos zeros antigos da série de participação como ausência de indústria.",
    sources: [
      {
        label:
          "Banco Mundial · valor adicionado da manufatura, preços constantes",
        url: "https://data.worldbank.org/indicator/NV.IND.MANF.KD?locations=BR",
      },
    ],
  },
  {
    slug: "pisa",
    title: "O que o PISA mostra sobre a aprendizagem?",
    category: "Educação",
    description:
      "Leitura, matemática e ciências por edição, com limites de comparabilidade e a estagnação recente à vista.",
    unit: "pontos PISA",
    seriesName: "PISA · leitura",
    frequency: "cycles",
    points: pisaYears.map((year, i) => ({
      year,
      value: [396, 403, 393, 412, 407, 407, 413, 410][i],
    })),
    summary:
      "Na base de tendências do PISA 2022, a leitura no Brasil passou de 396 pontos em 2000 para 410 em 2022. As edições recentes não mostram um avanço contínuo. Uma diferença pontual não prova uma mudança estatisticamente significativa.",
    findings: [
      {
        title: "A avaliação não acontece todos os anos",
        body: "Os pontos representam edições do exame, não valores anuais estimados. A edição prevista para 2021 foi adiada para 2022; não há uma observação intermediária criada pelo site.",
      },
      {
        title: "A expansão de acesso não garante aprendizagem",
        body: "Matrículas, conclusão e resultados de aprendizagem são indicadores diferentes. A melhora de um deles não permite presumir a melhora dos outros.",
      },
      {
        title: "Comparações precisam respeitar a base",
        body: "A tabela de tendências da OCDE pode revisar estimativas de edições antigas. Utilizamos uma única edição da base para evitar misturar pontuações de relatórios incompatíveis.",
      },
    ],
    methodology:
      "OCDE, PISA 2022 Results, volume I, tabelas de tendências I.B1.5.4–I.B1.5.6, Brasil. Leitura desde 2000; matemática comparável desde 2003; ciências desde 2006, disponíveis em séries separadas. Pontos arredondados conforme a publicação.",
    caveat:
      "Amostra de estudantes de 15 anos, não de toda a população. Esta versão usa resultados nacionais; não oferece ranking de UFs sem validação da representatividade amostral. Pequenas diferenças exigem considerar erros de estimação.",
    sources: [
      {
        label: "OCDE · PISA 2022, tendências de desempenho do Brasil",
        url: "https://www.oecd.org/en/publications/pisa-2022-results-volume-i_53f23881-en/full-report/overview-of-performance-trends_ae540546.html",
      },
    ],
  },
  {
    slug: "concluintes",
    title: "Quantas pessoas concluem a graduação?",
    category: "Educação",
    description:
      "Concluintes por ano, com a diferença entre o total e a modalidade a distância claramente identificada.",
    unit: "conclusões de graduação",
    seriesName: "Concluintes · total",
    points: years(
      2014,
      [
        1027092, 1150067, 1169449, 1199769, 1264288, 1250076, 1278622, 1327188,
        1287456, 1374669, 1333828,
      ],
    ),
    secondary: {
      name: "Concluintes EaD · parte do total",
      points: years(
        2014,
        [
          189788, 233704, 230717, 252163, 273873, 316039, 400393, 485141,
          483834, 591284, 604742,
        ],
      ),
    },
    summary:
      "O Censo da Educação Superior registra conclusões em instituições públicas e privadas. Em 2024, foram 1.333.828 conclusões, somando 729.086 presenciais e 604.742 a distância. Conclusões não são o número de cursos criados.",
    findings: [
      {
        title: "O total reúne redes públicas e privadas",
        body: "Não se deve atribuir todas as conclusões às universidades federais. O Censo considera instituições com naturezas administrativas e modalidades diferentes.",
      },
      {
        title: "A modalidade mudou de peso",
        body: "O número de conclusões a distância cresceu no recorte, enquanto o presencial recuou nos anos finais. O total sozinho esconde essa transformação.",
      },
      {
        title: "Conclusão não mede qualidade isoladamente",
        body: "O diploma é um indicador de formação. Aprendizagem, condições de oferta, inserção profissional e resultados de pesquisa precisam de outros indicadores.",
      },
    ],
    methodology:
      "MEC/Inep, apresentação do Censo da Educação Superior 2024, gráfico 72, Brasil 2014–2024. Total calculado pela soma dos concluintes presenciais e EaD de cada ano. A série EaD é um subconjunto do total; as duas linhas não devem ser somadas novamente.",
    caveat:
      "Número de conclusões de cursos, não necessariamente pessoas únicas ao longo de vários anos. O recorte nacional desta versão não oferece desagregação territorial sem a importação das tabelas correspondentes.",
    sources: [
      {
        label:
          "Inep · apresentação do Censo da Educação Superior 2024, gráfico 72",
        url: "https://download.inep.gov.br/educacao_superior/censo_superior/documentos/2024/apresentacao_censo_da_educacao_superior_2024.pdf",
      },
    ],
  },
  {
    slug: "pesquisa-cientifica",
    title: "Como a produção científica brasileira evoluiu?",
    category: "Educação",
    description:
      "Artigos científicos e técnicos ao longo do tempo, distinguindo volume de publicação e impacto científico.",
    unit: "artigos · contagem da fonte",
    seriesName: "Artigos científicos e técnicos",
    points: dev["IP.JRN.ARTC.SC"].points,
    summary:
      "O volume de artigos é uma dimensão da capacidade científica. Não é sinônimo de relevância, qualidade ou impacto: esses aspectos também dependem de citações comparáveis, áreas de conhecimento, inovação e contribuição social.",
    findings: [
      {
        title: "A produção tem trajetória própria",
        body: "O gráfico permite acompanhar a produção registrada pela base. A contagem tem valores fracionários na origem; não é uma lista de documentos exclusivos de autores brasileiros.",
      },
      {
        title: "Mais publicações não garantem mais impacto",
        body: "Uma avaliação de relevância exige indicadores normalizados por área e tempo de publicação. Comparar citações acumuladas de artigos antigos e recentes sem a mesma janela distorce a conclusão.",
      },
      {
        title: "Há desafios documentados",
        body: "Relatório do MCTI registra FWCI médio de 0,86 no triênio 2020–2022, abaixo da referência mundial 1. Esse recorte não deve ser transformado em uma tendência anual que o documento não fornece.",
      },
    ],
    methodology:
      "Banco Mundial/WDI, indicador IP.JRN.ARTC.SC, artigos científicos e técnicos, Brasil, 1996–2023. Mantida a contagem publicada, inclusive valores fracionários. A série não abrange toda forma de produção acadêmica nem todos os efeitos sociais da pesquisa.",
    caveat:
      "Afiliações e colaboração podem produzir contagem fracionada. A base importada é nacional; não é repartida por estados sem uma fonte de afiliação consistente. O indicador de impacto citado usa outra base e outro período, identificados no texto.",
    sources: [
      {
        label: "Banco Mundial · artigos científicos e técnicos",
        url: "https://data.worldbank.org/indicator/IP.JRN.ARTC.SC?locations=BR",
      },
      {
        label: "MCTI · evolução e impacto dos parques tecnológicos, 2025",
        url: "https://repositorio.mcti.gov.br/bitstream/mctic/7170/1/2025_evolucao_impacto_potencial_parques_tecnologicos_brasil.pdf",
      },
    ],
  },
];
