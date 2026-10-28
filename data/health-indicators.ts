import type { Indicator } from "./historical";
import data from "./physicians.json";
import infrastructure from "./health-infrastructure.json";
const source = {
  label: "FMUSP/MS/AMB · Demografia Médica 2025",
  url: data.source,
};
const base = {
  category: "Saúde",
  description:
    "Oferta, formação e emprego médico: pessoas, registros e vínculos são medidas distintas.",
  summary:
    "O mesmo médico pode ter vários registros e empregos. As séries mantêm separados estoque de profissionais, graduação anual e pessoas com emprego formal.",
  findings: [
    {
      title: "Contagem de indivíduos",
      body: "O total nacional usa indivíduos, evitando contar a mesma pessoa uma vez por CRM. A densidade usa a população correspondente da tabela da publicação.",
    },
    {
      title: "Estimativas identificadas",
      body: "2024 é uma estimativa do modelo da publicação. A projeção de 2025 não foi incluída como observação realizada.",
    },
    {
      title: "Formação e emprego",
      body: "Diplomas, inscrições primárias no CRM e estoque ativo são conceitos distintos. Não são parcelas somáveis.",
    },
  ],
  methodology:
    "Scheffer (coord.), Demografia Médica 2025. Total: tabelas 1 e 2, páginas impressas 43 e 46. Densidade: indivíduos/população × 1.000 nos anos da tabela 1. Dados de 2024 estimados. Lacunas preservadas.",
  caveat:
    "Não emendamos DMB e WDI: cobertura e fontes diferem. Estes dados não medem horas de atendimento ou disponibilidade exclusiva ao SUS.",
  sources: [source],
};
export const healthIndicators: Indicator[] = [
  {
    ...base,
    slug: "medicos-dmb",
    title: "Médicos por habitante · Demografia Médica",
    seriesName: "Médicos por mil habitantes · DMB",
    unit: "médicos por mil habitantes",
    points: data.density,
    frequency: "irregular",
  },
  {
    ...base,
    slug: "medicos-total",
    title: "Total de médicos",
    seriesName: "Total de médicos · indivíduos · DMB",
    unit: "pessoas",
    points: data.total,
    frequency: "irregular",
  },
  {
    ...base,
    slug: "medicos-formados",
    title: "Médicos formados por ano",
    seriesName: "Concluintes de medicina · Inep",
    unit: "concluintes por ano",
    points: data.graduates,
    methodology:
      "Inep, Censo da Educação Superior 2010–2023, slide 3 da apresentação à Comissão de Saúde da Câmara em 10/06/2025. Não é contagem de inscritos no Enade ou de registros primários nos CRMs.",
    sources: [
      {
        label: "Inep · apresentação na Câmara · slide 3",
        url: "https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cssf/apresentacoes-em-eventos/eventos-2025/10-06-2025-audiencia-publica-qualidade-do-ensino-de-medicina-e-exame-de-proficiencia/apresentacoes-ministerio-da-educacao/instituto-nacional-de-estudos-e-pesquisas-educacionais-anisio-teixeira-ministerio-da-educacao/view",
      },
    ],
  },
  {
    ...base,
    slug: "medicos-emprego-formal",
    title: "Médicos com emprego formal",
    seriesName: "Médicos com emprego formal · RAIS",
    unit: "pessoas",
    points: data.formal,
    methodology:
      "DMB 2025, página 282, tabela 1, RAIS/MTE e GPDES/IESC/UFRJ. Pessoas com contratos ativos em dezembro, ocupações assistenciais CBO 2251, 2252 e 2253.",
    caveat:
      "Total menos emprego formal não mede autônomos. PJ, contratação indireta, outras ocupações e limites cadastrais impedem essa equivalência.",
  },
  {
    ...base,
    slug: "upas",
    title: "UPAs em funcionamento",
    seriesName: "UPAs em funcionamento · construídas com recursos do MS",
    unit: "unidades",
    points: infrastructure.upa.find((g) => g.id === "br")!.points,
    geographies: infrastructure.upa,
    description:
      "UPAs em funcionamento construídas com recursos do Ministério da Saúde, conforme o indicador oficial, com estados e regiões.",
    summary:
      "Este estoque não é a quantidade de obras entregues por um presidente em cada ano. O metadado admite unidades em funcionamento mesmo em construção, habilitadas ou não.",
    methodology:
      "MS, indicador MGDI UPA 24h, recurso upacrm_json. Dezembro de 2016–2025, Brasil, regiões e UFs. Os totais repetidos em linhas municipais são deduplicados, nunca somados. Agosto de 2026 não substitui dezembro no gráfico anual.",
    caveat:
      "Não abrange automaticamente todas as UPAs. Financiamento federal não implica execução direta pela União. Para atribuir a obra, verificar Sismob, financiamento, conclusão e operação.",
    sources: [
      {
        label: "MS · definição do indicador UPA",
        url: "https://dadosabertos.saude.gov.br/dataset/mgdi-unidade-de-pronto-atendimento-upa-24h/resource/upacrm_json",
      },
      {
        label: "MS · dados originais",
        url: "https://demas-dados-abertos.s3.amazonaws.com/json/upacrm.json.zip",
      },
    ],
  },
];
