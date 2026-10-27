import type { Indicator } from "./historical";
import archives from "./archives.json";
import geo from "./geography.json";
import mobility from "./mobility.json";
import { fuelIndicators } from "./mobility-indicators";
const national = (key: "poverty" | "industryShare" | "industryGrowth") =>
  geo[key].find((g) => g.id === "br")!.points;
export function indicatorVariants(base: Indicator): Indicator[] {
  if (base.slug === "combustiveis") return fuelIndicators;
  if (base.slug === "dolar")
    return [
      base,
      {
        ...base,
        slug: "dolar-fechamento",
        seriesName: "Dólar comercial · venda · fim de dezembro",
        points: mobility.currency["3695"].points,
        summary:
          "Esta alternativa usa a taxa de venda no fim de dezembro publicada pelo Banco Central (SGS 3695). É uma observação de fechamento, diferente da média de dezembro da série principal. Mantém a unidade R$/US$ e o recorte desde 1994.",
        methodology:
          "Banco Central/SGS, série 3695, taxa de câmbio comercial, venda, fim de período, mensal. Seleção de dezembro de 1994 a 2025, em reais por dólar americano. Não é média mensal nem cotação turismo.",
      },
    ];
  const variant = (changes: Partial<Indicator>): Indicator => ({
    ...base,
    priceBasis: undefined,
    secondary: undefined,
    geographies: undefined,
    ...changes,
  });
  if (base.slug === "pobreza")
    return [
      base,
      variant({
        slug: "pobreza-pnad-historica",
        seriesName: "Pobreza · PNAD histórica",
        points: archives.povertyHistorical.points,
        summary:
          "A série histórica do Ipea/PNAD permite consultar 1976–2014, inclusive a ditadura e a redemocratização. Ela foi encerrada e usa linhas regionais diferentes da PNAD Contínua. As duas séries não são emendadas.",
        methodology:
          "Ipeadata, DISOC_PPY, taxa de pobreza P0, série inativa. Linhas de pobreza equivalentes ao dobro das linhas regionais de extrema pobreza, baseadas em cestas alimentares para 24 regiões. PNAD/IBGE, 1976–2014. Anos ausentes não são interpolados.",
        caveat:
          "Série histórica encerrada. Para os dados recentes ou recortes territoriais, selecione a PNAD Contínua. Não compare diretamente o nível desta série com as linhas internacionais PPC.",
        findings: [
          {
            title: "Há lacunas reais na pesquisa",
            body: "Alguns anos não tiveram PNAD ou não têm cálculo publicado. As linhas do gráfico são interrompidas nessas lacunas; não são criados valores.",
          },
          {
            title: "O critério mudou entre pesquisas",
            body: "A linha regional desta série não é a linha internacional de US$ 6,85 ou US$ 8,30 PPC. A troca de série altera a definição e fica explícita no seletor.",
          },
        ],
        sources: [
          {
            label: "Ipeadata · DISOC_PPY, série histórica e metadados",
            url: "https://www.ipeadata.gov.br/api/odata4/Metadados('DISOC_PPY')",
          },
        ],
      }),
      variant({
        slug: "pobreza-ppc2021",
        seriesName: "Pobreza · US$ 8,30 PPC 2021",
        points: national("poverty"),
        geographies: geo.poverty,
        summary:
          "Este recorte usa a linha de US$ 8,30 por dia em PPC de 2021 e permite consultar Brasil, regiões e estados. É uma definição diferente da linha de US$ 6,85 PPC de 2017; não substitua uma pela outra sem identificar a mudança.",
        methodology:
          "Ipeadata/IBGE, PNADCA_TXPNUF, linha de US$ 8,30 PPC 2021, renda domiciliar por pessoa. Dados 2012–2024. Excluímos 2025 porque os metadados o identificam como estimativa do Ipeadata. Taxas territoriais são as da fonte, sem média simples entre estados.",
        caveat:
          "Os metadados identificam diferenças entre entrevistas usadas em 2020–2022 e nos demais anos. As revisões da linha PPC e das ponderações impedem a emenda automática com a série SIS de US$ 6,85.",
        sources: [
          {
            label: "Ipeadata · PNADCA_TXPNUF, valores territoriais",
            url: "https://www.ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='PNADCA_TXPNUF')",
          },
        ],
        findings: [
          {
            title: "Mesma linha em todos os territórios",
            body: "O filtro troca a localidade dentro desta base, mantendo a definição da linha PPC identificada.",
          },
          {
            title: "Percentual e número de pessoas não são iguais",
            body: "Um estado pode ter proporção menor de pobreza e ainda reunir mais pessoas pobres por ter uma população maior.",
          },
        ],
      }),
    ];
  if (base.slug === "criminalidade")
    return [
      variant({
        slug: "homicidios-portal",
        seriesName: "Homicídios registrados · portal Atlas",
        points: archives.homicideHistorical.points,
        geographies: geo.crime,
        summary:
          "A base do portal Atlas da Violência permite consultar o Brasil desde 1990 e regiões e estados desde 2000, no recorte importado até 2024. As taxas desta base podem diferir de edições anteriores do relatório por revisão dos dados e denominadores.",
        methodology:
          "Portal Atlas/Ipea, série 20, taxa de homicídios registrados por 100 mil habitantes. Brasil: região 1076, 1990–2024; cinco grandes regiões e 27 UFs: 2000–2024. Metadados descrevem SIM, óbitos por residência e mudanças entre CID-9 e CID-10, além de fontes populacionais por período.",
        caveat:
          "Recorte do portal, separado da tabela do relatório Atlas 2025. Mudanças de classificação, cobertura de registros e população afetam comparações longas. Não há dado inventado para 1985.",
        sources: [
          {
            label: "Ipea · metadados da série 20",
            url: "https://www.ipea.gov.br/cms/api/series/20",
          },
          {
            label: "Ipea · portal Atlas da Violência",
            url: "https://www.ipea.gov.br/atlasviolencia/",
          },
        ],
      }),
      base,
    ];
  if (base.slug === "inflacao")
    return [
      base,
      variant({
        slug: "igpdi-historico",
        seriesName: "IGP-DI · indicador histórico distinto",
        points: archives.igpdi.points,
        summary:
          "Para consultar períodos anteriores à ditadura, oferecemos o IGP-DI desde 1945. Ele combina preços ao produtor, ao consumidor e da construção: não é o IPCA e não é ligado à sua linha no gráfico.",
        methodology:
          "FGV, IGP-DI, republicado no SGS/Banco Central, série 190. Acumulado anual calculado pela multiplicação dos 12 fatores mensais publicados. Pode diferir do acumulado divulgado por arredondamento. Anos completos de 1945–2025.",
        caveat:
          "O IGP-DI é um índice geral de preços de composição diferente do IPCA. Seu uso aqui é histórico; não representa uma extensão do IPCA para antes de 1980.",
        findings: [
          {
            title: "Dois índices, duas definições",
            body: "Escolher o IGP-DI troca o indicador, não apenas a data inicial. O nome e a fonte ficam visíveis no gráfico.",
          },
          {
            title: "O histórico inclui regimes distintos",
            body: "A opção de histórico completo mostra os anos anteriores a 1964 e o período da ditadura. O início padrão continua em 1985.",
          },
        ],
        sources: [
          {
            label: "Banco Central/FGV · SGS série 190, IGP-DI",
            url: archives.igpdi.source,
          },
        ],
      }),
    ];
  if (base.slug === "industrializacao")
    return [
      base,
      variant({
        slug: "industria-regional",
        seriesName: "Indústria total · participação no VAB",
        unit: "% do valor adicionado bruto",
        points: national("industryShare"),
        geographies: geo.industryShare,
        summary:
          "Este recorte mostra a participação da indústria total no valor adicionado de cada território. Ele inclui atividades além da transformação e usa valor adicionado bruto como denominador, não o PIB a preços de mercado.",
        methodology:
          "IBGE, Contas Regionais, SIDRA 5938, variável 520. Participação do valor adicionado bruto da indústria no VAB total, a preços correntes, referência 2010. Brasil, cinco regiões e 27 UFs, 2002–2023.",
        caveat:
          "Indústria total inclui extração, transformação, construção e utilidades. Não compare seu percentual diretamente com manufatura/PIB. Variação de participação não mede sozinha crescimento de volume.",
        sources: [
          {
            label: "IBGE/SIDRA · Contas Regionais, tabela 5938",
            url: "https://sidra.ibge.gov.br/tabela/5938",
          },
        ],
      }),
      variant({
        slug: "industria-producao-regional",
        seriesName: "Transformação · crescimento da produção física",
        unit: "% de variação no ano",
        points: national("industryGrowth"),
        geographies: geo.industryGrowth,
        summary:
          "A Pesquisa Industrial Mensal mostra a variação da produção física da indústria de transformação. Dezembro traz a variação acumulada do ano completo. O filtro oferece somente os territórios efetivamente pesquisados.",
        methodology:
          "IBGE, PIM-PF, SIDRA 8888, variável 11603, categoria 129316 (indústrias de transformação), dezembro de 2003–2025. Períodos territoriais variam conforme a cobertura da pesquisa.",
        caveat:
          "Nem todas as 27 UFs e grandes regiões são publicadas nesta pesquisa. Não criamos as localidades ausentes nem calculamos o indicador por média simples. É variação de volume, não valor nominal.",
        sources: [
          {
            label: "IBGE/SIDRA · PIM-PF, tabela 8888",
            url: "https://sidra.ibge.gov.br/tabela/8888",
          },
        ],
      }),
    ];
  if (base.slug === "pisa") {
    const item = (
      slug: string,
      name: string,
      years: number[],
      values: number[],
    ) =>
      variant({
        slug,
        seriesName: name,
        points: years.map((year, i) => ({ year, value: values[i] })),
      });
    return [
      base,
      item(
        "pisa-matematica",
        "PISA · matemática",
        [2003, 2006, 2009, 2012, 2015, 2018, 2022],
        [356, 370, 386, 389, 377, 384, 379],
      ),
      item(
        "pisa-ciencias",
        "PISA · ciências",
        [2006, 2009, 2012, 2015, 2018, 2022],
        [390, 405, 402, 401, 404, 403],
      ),
    ];
  }
  return [base];
}
