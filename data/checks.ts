import { expandedChecks } from "./expanded-checks";
export type Check = {
  slug: string;
  title: string;
  verdict: string;
  topic: string;
  date: string;
  summary: string;
  explanation: string;
  limit: string;
  source: string;
  url: string;
  related: string | null;
  calculator?: boolean;
  videos?: { title: string; youtubeId: string; description: string }[];
  sections?: { title: string; body: string }[];
  sources?: { label: string; url: string }[];
};
export const checks: Check[] = [
  {
    slug: "imposto-sobre-pix",
    title: "“O governo criou um imposto específico sobre o Pix.”",
    verdict: "Falso",
    topic: "Tributos",
    date: "Esclarecimento de janeiro de 2026",
    summary:
      "A Receita Federal negou a criação de imposto específico sobre o Pix no esclarecimento consultado. O meio de pagamento não transforma, sozinho, uma transferência em fato gerador de imposto.",
    explanation:
      "É necessário distinguir a transferência da operação que ela paga. Uma venda ou prestação de serviço pode ter tributação própria, independentemente de ser recebida em Pix, cartão ou dinheiro. Obrigações de informação à Receita não são, por si só, novos impostos.",
    limit:
      "Esta checagem trata da alegação e do esclarecimento de janeiro de 2026. Não afirma que toda renda recebida por Pix é isenta, nem que não possam existir tarifas bancárias em situações previstas.",
    source: "Receita Federal · esclarecimento de janeiro de 2026",
    url: "https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/janeiro/receita-federal-orienta-a-populacao-sobre-fake-news-envolvendo-pix-e-tributacao",
    related: null,
  },
  {
    slug: "inflacao-menor-precos-menores",
    title: "“Se a inflação caiu, os preços voltaram ao que eram antes.”",
    verdict: "Enganoso",
    topic: "Economia",
    date: "Conceito estatístico · série até 2025",
    summary:
      "Inflação menor significa desaceleração da alta média de preços. Quando a taxa continua positiva, o nível médio de preços segue aumentando.",
    explanation:
      "Imagine uma cesta de R$ 100: com inflação de 10%, ela passa a R$ 110. Se a inflação seguinte for de 4%, vai a R$ 114,40. A taxa caiu, mas a cesta ficou mais cara. Este exemplo é ilustrativo; a série histórica do IPCA está disponível na análise.",
    limit:
      "Preços individuais podem cair mesmo com inflação geral positiva. Deflação é uma variação negativa do índice no período. Esta checagem examina uma interpretação estatística; não atribui a frase a uma pessoa específica.",
    source: "IBGE · explicação sobre inflação",
    url: "https://www.ibge.gov.br/explica/inflacao.php",
    related: "inflacao",
  },
  {
    slug: "homicidios-toda-criminalidade",
    title: "“A queda dos homicídios prova que todos os crimes diminuíram.”",
    verdict: "Não sustentado",
    topic: "Segurança",
    date: "Indicador do Atlas da Violência 2025",
    summary:
      "Uma série de homicídios mede violência letal segundo a definição da fonte. Não permite concluir que furtos, golpes ou todos os demais crimes também caíram.",
    explanation:
      "Cada crime tem registro e dinâmica próprios. Usar a série de homicídios para representar toda a criminalidade amplia a conclusão além do que o indicador mede.",
    limit:
      "Este é um exame de uma conclusão estatística, não uma medição de todos os crimes ou uma atribuição da frase a uma pessoa específica.",
    source: "Ipea e FBSP · Atlas da Violência 2025",
    url: "https://forumseguranca.org.br/wp-content/uploads/2025/05/atlas-violencia-2025.pdf",
    related: "criminalidade",
  },
  ...expandedChecks,
];
