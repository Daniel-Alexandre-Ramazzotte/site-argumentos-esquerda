import type { TimelineEvent } from "@/components/interactive-timeline";
export const transportEvents: TimelineEvent[] = [
  {
    id: "norte-sul-inicio",
    date: "1987",
    topic: "Ferrovias",
    kind: "Histórico",
    title: "Norte-Sul: início de uma obra que atravessou governos",
    body: "A construção da Ferrovia Norte-Sul começou em 1987. A expansão posterior envolveu obras públicas, subconcessões e execução pela iniciativa privada, em etapas ao longo de diferentes mandatos.",
    context:
      "A data de início não equivale à entrada em operação de todo o corredor. O histórico ajuda a reconhecer a continuidade de projetos de infraestrutura.",
    limit:
      "Este registro não atribui todos os quilômetros a um único governo nem inclui extensões futuras como obras concluídas.",
    sources: [
      {
        label: "Rumo · histórico da Malha Central e conclusão em 2023",
        url: "https://www.rumolog.com/nossas-malhas/",
      },
    ],
  },
  {
    id: "br163-2019",
    date: "28 NOV 2019",
    topic: "Rodovias",
    kind: "Conclusão de pavimentação",
    title: "Conclusão do asfalto no corredor Sinop–Miritituba da BR-163",
    body: "O Ministério da Infraestrutura informou a conclusão dos 51 km remanescentes entre Moraes Almeida e Novo Progresso, no Pará. A entrega conectou por asfalto o corredor entre Sinop e Miritituba.",
    context:
      "A intervenção final ocorreu no governo Bolsonaro, em uma rodovia e em obras iniciadas antes dele. A pavimentação desse corredor não significa conclusão de toda a BR-163 ou da Transamazônica.",
    limit:
      "O registro distingue o trecho entregue do tamanho total da rodovia. Manutenção, asfalto e duplicação não são contabilizados como uma mesma entrega.",
    sources: [
      {
        label: "Ministério dos Transportes · anúncio de conclusão, 28/11/2019",
        url: "https://www.gov.br/transportes/pt-br/assuntos/noticias/ultimas-noticias/governo-federal-conclui-asfaltamento-da-br-163-pa",
      },
    ],
  },
  {
    id: "salvador-terminal",
    date: "11 DEZ 2019",
    topic: "Aviação",
    kind: "Entrega de etapa",
    title: "Ampliação do terminal do aeroporto de Salvador",
    body: "Foi anunciada a entrega da primeira etapa da ampliação e modernização executada pela concessionária Vinci. A intervenção ampliou o terminal e incluiu pátios, pontes de embarque e sistemas aeroportuários.",
    context:
      "A concessionária assumiu a operação em 2018 e informa que o contrato de construção foi assinado em março daquele ano. Cerimônia, conclusão física e cumprimento de obrigações contratuais são marcos diferentes.",
    limit:
      "É uma expansão de aeroporto existente, não um aeroporto novo. A primeira etapa não representa a conclusão automática de todas as fases contratuais.",
    sources: [
      {
        label: "Ministério dos Transportes · entrega de etapa em Salvador",
        url: "https://www.gov.br/transportes/pt-br/assuntos/noticias/ultimas-noticias/aeroporto-de-salvador-conclui-1a-etapa-das-obras-de-ampliacao-e-melhorias",
      },
      {
        label: "Concessionária · contrato, início e fases das obras",
        url: "https://www.salvador-airport.com.br/pt-br/contrato-de-concessao",
      },
    ],
  },
  {
    id: "abuna",
    date: "MAI 2021",
    topic: "Rodovias",
    kind: "Entrega de obra",
    title: "Ponte do Abunã: ligação rodoviária sobre o Rio Madeira",
    body: "A ponte, com 1.517 metros, foi entregue em maio de 2021. O DNIT registra início da obra em 2014. A conexão substituiu a travessia por balsas nesse ponto de acesso ao Acre.",
    context:
      "O início ocorreu no governo Dilma e a entrega no governo Bolsonaro. Essa sequência permite reconhecer a contribuição de etapas distintas sem apagar a cronologia.",
    limit:
      "Uma ponte não deve ser convertida em quilômetros de estrada nova ou somada a obras de manutenção sem discriminar a categoria.",
    sources: [
      {
        label:
          "DNIT · retrospectiva 2021, histórico e entrega da Ponte do Abunã",
        url: "https://www.gov.br/dnit/pt-br/assuntos/noticias/diretoria-de-infraestrutura-rodoviaria-do-dnit-encerra-2021-com-diversas-entregas-pelo-pais/",
      },
    ],
  },
  {
    id: "norte-sul-2023",
    date: "2023",
    topic: "Ferrovias",
    kind: "Conclusão de etapa e operação",
    title: "Conclusão do último trecho da Norte-Sul",
    body: "A prestação de contas de 2023 registra a conclusão do último trecho do tramo central. A Rumo identifica 2023 como o ano de conclusão da Malha Central. O corredor conecta-se às redes de acesso aos portos do Norte e Sudeste.",
    context:
      "O histórico combina construção iniciada em 1987, investimentos em mandatos anteriores e conclusão da etapa em 2023, durante Lula. A ferrovia se conecta a outras malhas: não se deve dizer que cada quilômetro entre os dois portos pertence à Norte-Sul.",
    limit:
      "Não confundir leilão de concessão, assinatura contratual, obras e início da operação. Extensões planejadas não estão automaticamente entregues.",
    sources: [
      {
        label: "CGU/Presidência · prestação de contas de 2023",
        url: "https://www.gov.br/cgu/pt-br/assuntos/noticias/2024/04/cgu-divulga-prestacao-de-contas-do-presidente-da-republica-de-2023/PCPR2023_Final.pdf",
      },
      {
        label: "Rumo · Malha Central e histórico",
        url: "https://www.rumolog.com/nossas-malhas/",
      },
    ],
  },
  {
    id: "br470-2024",
    date: "5 NOV 2024",
    topic: "Rodovias",
    kind: "Entrega parcial",
    title: "BR-470/SC: novo viaduto e trecho duplicado",
    body: "O DNIT informou a liberação de um viaduto em Indaial e de mais um quilômetro duplicado na BR-470. É uma entrega parcial dentro de uma obra de ampliação da capacidade da via.",
    context:
      "A abertura de trechos melhora a circulação antes da conclusão de todo o empreendimento. A extensão de um lote, a extensão total do projeto e o trecho liberado precisam aparecer em contas separadas.",
    limit:
      "O evento de 2024 não é apresentado como conclusão integral da duplicação ou como cadastro atualizado de todos os trechos entregues até 2026.",
    sources: [
      {
        label: "DNIT · viaduto e trecho duplicado na BR-470/SC",
        url: "https://www.gov.br/dnit/pt-br/assuntos/noticias/dnit-entrega-mais-um-viaduto-e-um-quilometro-duplicado-na-br-470-sc",
      },
    ],
  },
  {
    id: "pedral-licenca",
    date: "26 MAI 2025",
    topic: "Hidrovias",
    kind: "Licenciamento",
    title: "Licença de instalação para o Pedral do Lourenço",
    body: "O Ministério de Portos e Aeroportos informou a licença do Ibama para intervenção no trecho rochoso do Rio Tocantins. O objetivo anunciado era ampliar as condições de passagem de embarcações de carga.",
    context:
      "Licenciamento, execução e benefício efetivamente observado são etapas distintas. As previsões de capacidade divulgadas pelo Executivo são projeções, não volumes de carga já realizados.",
    limit:
      "Não é registro de obra concluída. O projeto passou por controvérsias judiciais e ambientais; veja o evento de março de 2026.",
    sources: [
      {
        label:
          "Ministério de Portos e Aeroportos · licença e objetivos do projeto",
        url: "https://www.gov.br/portos-e-aeroportos/pt-br/assuntos/noticias/2025/05/remocao-do-pedral-do-lourenco-vai-ampliar-escoamento-da-producao-das-regioes-norte-e-centro-oeste",
      },
    ],
  },
  {
    id: "pedral-recurso",
    date: "10 MAR 2026",
    topic: "Hidrovias",
    kind: "Registro de recurso",
    title: "DPU recorre contra decisão de continuidade do projeto",
    body: "A Defensoria Pública da União divulgou recurso ao TRF1 contra decisão que autorizara a continuidade do projeto do Pedral do Lourenço, discutindo impactos sobre populações e direitos das comunidades afetadas.",
    context:
      "A análise de expansão logística inclui os requisitos ambientais e sociais. Um anúncio de capacidade futura não substitui licenciamento válido, consulta e acompanhamento das condições de execução.",
    limit:
      "O registro retrata o recurso noticiado em março de 2026, não afirma seu resultado posterior nem uma situação jurídica atualizada em tempo real.",
    sources: [
      {
        label: "DPU · recurso relativo ao Pedral do Lourenço, 10/03/2026",
        url: "https://direitoshumanos.dpu.def.br/dpu-recorre-contra-decisao-que-autorizou-retomada-de-obras-para-derrocagem-do-pedral-do-lourenco-no-para/",
      },
    ],
  },
];
