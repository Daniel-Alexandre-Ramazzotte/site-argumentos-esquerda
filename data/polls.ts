export type Poll = {
  id: string;
  institute: string;
  published: string;
  fieldStart: string;
  fieldEnd: string;
  year: number;
  office: string;
  round: 1 | 2;
  territory: string;
  scenario: string;
  sample: number;
  municipalities: number | null;
  method: string | null;
  population: string;
  commissioner: string | null;
  publisher: string;
  registration: string;
  registrationChecked: boolean;
  confidence: number | null;
  error: number | null;
  cost: number | null;
  funding: string | null;
  statistician: string | null;
  weighting: string | null;
  question: string | null;
  totals: Record<string, number>;
  valid: Record<string, number>;
  notes: string;
  source: { label: string; url: string };
  breakdowns?: {
    group: string;
    results: Record<string, number>;
    error: number | null;
  }[];
};
export const polls: Poll[] = [
  {
    id: "datafolha-2026-10-08",
    institute: "Datafolha",
    published: "2026-10-08",
    fieldStart: "2026-10-06",
    fieldEnd: "2026-10-07",
    year: 2026,
    office: "Presidência",
    round: 2,
    territory: "Brasil",
    scenario: "Lula × Flávio Bolsonaro",
    sample: 2520,
    municipalities: 153,
    method: null,
    population: "Eleitores brasileiros",
    commissioner: "Folha de S.Paulo e TV Globo",
    publisher: "Folha de S.Paulo",
    registration: "BR-02949/2026",
    registrationChecked: false,
    confidence: null,
    error: 2,
    cost: null,
    funding: null,
    statistician: null,
    weighting: null,
    question: null,
    totals: {
      Lula: 45,
      "Flávio Bolsonaro": 49,
      "Branco/nulo": 5,
      Indecisos: 1,
    },
    valid: { Lula: 48, "Flávio Bolsonaro": 52 },
    notes:
      "Divulgação primária consultada. Método detalhado, ponderações, custo e responsável técnico não foram identificados nessa publicação; os campos permanecem em aberto, sem preenchimento por suposição.",
    source: {
      label: "Folha/Datafolha · divulgação de 08/10/2026",
      url: "https://www1.folha.uol.com.br/poder/2026/10/datafolha-flavio-bolsonaro-tem-52-e-lula-48-em-votos-validos-no-segundo-turno.shtml",
    },
  },
  {
    id: "datafolha-2026-10-15",
    institute: "Datafolha",
    published: "2026-10-15",
    fieldStart: "2026-10-13",
    fieldEnd: "2026-10-14",
    year: 2026,
    office: "Presidência",
    round: 2,
    territory: "Brasil",
    scenario: "Lula × Flávio Bolsonaro",
    sample: 2520,
    municipalities: 153,
    method: null,
    population: "Eleitores brasileiros",
    commissioner: "Folha de S.Paulo",
    publisher: "Folha de S.Paulo",
    registration: "BR-00466/2026",
    registrationChecked: false,
    confidence: null,
    error: 2,
    cost: null,
    funding: null,
    statistician: null,
    weighting: null,
    question: null,
    totals: {
      Lula: 45,
      "Flávio Bolsonaro": 47,
      "Branco/nulo": 6,
      Indecisos: 2,
    },
    valid: { Lula: 49, "Flávio Bolsonaro": 51 },
    notes:
      "Margem de dois pontos declarada também para votos válidos na publicação. Campos não detalhados pela divulgação não foram inferidos. Recortes demográficos têm margens próprias; a margem geral não é aplicada automaticamente a eles.",
    source: {
      label: "Folha/Datafolha · divulgação de 15/10/2026",
      url: "https://www1.folha.uol.com.br/poder/2026/10/datafolha-flavio-bolsonaro-tem-51-e-lula-49-dos-votos-validos-um-empate-tecnico.shtml",
    },
    breakdowns: [
      {
        group: "Sudeste · votos totais",
        results: { Lula: 41, "Flávio Bolsonaro": 51 },
        error: null,
      },
      {
        group: "Sul · votos totais",
        results: { Lula: 35, "Flávio Bolsonaro": 57 },
        error: null,
      },
      {
        group: "Nordeste · votos totais",
        results: { Lula: 61, "Flávio Bolsonaro": 32 },
        error: null,
      },
      {
        group: "Mulheres · votos totais",
        results: { Lula: 49, "Flávio Bolsonaro": 40 },
        error: null,
      },
      {
        group: "Homens · votos totais",
        results: { Lula: 40, "Flávio Bolsonaro": 52 },
        error: null,
      },
      {
        group: "16–24 anos · votos totais",
        results: { Lula: 50, "Flávio Bolsonaro": 43 },
        error: 6,
      },
      {
        group: "Evangélicos · votos totais",
        results: { Lula: 29, "Flávio Bolsonaro": 62 },
        error: 4,
      },
    ],
  },
  {
    id: "atlas-2026-10-19",
    institute: "AtlasIntel",
    published: "2026-10-19",
    fieldStart: "2026-10-13",
    fieldEnd: "2026-10-18",
    year: 2026,
    office: "Presidência",
    round: 2,
    territory: "Brasil",
    scenario: "Lula × Flávio Bolsonaro",
    sample: 4998,
    municipalities: null,
    method: "Recrutamento digital aleatório (Atlas RDR)",
    population: "População adulta brasileira",
    commissioner: null,
    publisher: "AtlasIntel/Bloomberg",
    registration: "BR-02418/2026",
    registrationChecked: false,
    confidence: 95,
    error: 1,
    cost: null,
    funding: null,
    statistician: null,
    weighting:
      "Pós-estratificação iterativa por sexo, faixa etária, escolaridade, renda, região e comportamento eleitoral anterior, segundo a descrição metodológica.",
    question:
      "Em quem você votaria no segundo turno das eleições presidenciais se as eleições fossem hoje?",
    totals: {
      Lula: 47.6,
      "Flávio Bolsonaro": 49.8,
      "Branco/nulo/não sei": 2.6,
    },
    valid: { Lula: 48.9, "Flávio Bolsonaro": 51.1 },
    notes:
      "Relatório original de 20 páginas, ficha nas páginas 4–5 e resultados nas páginas 7–8. A margem nacional declarada não substitui a margem específica de um estrato. A parceria editorial impressa no relatório não foi presumida como contratante ou financiador jurídico.",
    source: {
      label: "AtlasIntel/Bloomberg · relatório original, 19/10/2026",
      url: "https://cdn1.atlasintel.org/pesquisa_atlas_bloomberg__nacional_261019_1_4df1944681acf96f.pdf",
    },
  },
];
