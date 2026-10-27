import type { TimelineEvent } from "@/components/interactive-timeline";
const cpmi = {
  label: "Senado · relatório final da CPMI do 8 de Janeiro (2023)",
  url: "https://www2.senado.leg.br/bdsf/handle/id/768601",
};
const contragolpe = {
  label: "MJSP/PF · Operação Contragolpe, 19/11/2024",
  url: "https://www.gov.br/mj/pt-br/assuntos/noticias/policia-federal-desarticula-organizacao-criminosa-que-planejou-golpe-de-estado",
};
export const democracyEvents: TimelineEvent[] = [
  {
    id: "embaixadores",
    date: "18 JUL 2022",
    topic: "Antecedentes",
    kind: "Evento examinado pela Justiça Eleitoral",
    title: "Reunião com embaixadores e ataques ao sistema eleitoral",
    body: "Jair Bolsonaro reuniu representantes diplomáticos e apresentou questionamentos ao sistema eleitoral. O episódio foi julgado pelo TSE em 2023, por abuso de poder político e uso indevido dos meios de comunicação.",
    context:
      "O ato antecede a eleição e integra o contexto de deslegitimação do processo eleitoral. A decisão eleitoral deve ser distinguida das ações criminais posteriores.",
    limit:
      "Inelegibilidade é uma sanção eleitoral. Não equivale, por si só, a condenação penal por golpe de Estado.",
    sources: [
      {
        label: "TSE · julgamento da reunião com embaixadores, 30/06/2023",
        url: "https://www.tse.jus.br/comunicacao/noticias/2023/Junho/por-maioria-de-votos-tse-declara-bolsonaro-inelegivel-por-8-anos",
      },
    ],
  },
  {
    id: "pos-eleicao",
    date: "OUT–NOV 2022",
    topic: "Antecedentes",
    title: "Contestação do resultado e mobilizações pós-eleição",
    body: "O relatório da CPMI examina a mobilização após o segundo turno, bloqueios e acampamentos que defendiam intervenção contra o resultado eleitoral.",
    context:
      "A cronologia do 8 de janeiro tem antecedentes. Esses eventos precisam ser examinados segundo a conduta de seus participantes e as provas de cada caso.",
    limit:
      "Participação em uma manifestação, identidade política e responsabilidade por um crime não são categorias equivalentes. A imputação deve ser individualizada.",
    sources: [cpmi],
  },
  {
    id: "punhal-plano",
    date: "NOV–DEZ 2022",
    topic: "Documentos",
    kind: "Plano identificado pela investigação",
    title: "O plano Punhal Verde e Amarelo",
    body: "Segundo a PF, o planejamento identificado previa impedir a posse do governo eleito e incluía ações contra Lula, Geraldo Alckmin e Alexandre de Moraes. Sua divulgação ocorreu na Operação Contragolpe, em novembro de 2024.",
    context:
      "A investigação identificou planejamento para dezembro de 2022. A data do plano não deve ser confundida com a data em que foi divulgado ao público.",
    limit:
      "A existência, autoria e participação de cada pessoa precisam ser relacionadas às provas e decisões correspondentes. Não se atribui envolvimento a todos os apoiadores de um partido.",
    sources: [contragolpe],
  },
  {
    id: "aeroporto",
    date: "24 DEZ 2022",
    topic: "Ataques",
    kind: "Fato com condenação judicial documentada",
    title: "Artefato explosivo próximo ao aeroporto de Brasília",
    body: "Um artefato foi colocado em caminhão de combustível próximo ao aeroporto e identificado antes de explodir. Em maio de 2023, a Justiça do Distrito Federal condenou dois envolvidos no caso.",
    context:
      "O episódio é anterior ao ataque às sedes dos Poderes. A documentação judicial descreve responsáveis e condutas específicas.",
    limit:
      "Este registro descreve a decisão de primeira instância divulgada em 11/05/2023. Não certifica o andamento recursal atual nem estende a condenação a outras pessoas.",
    sources: [
      {
        label: "TJDFT · condenação dos envolvidos, 11/05/2023",
        url: "https://www.tjdft.jus.br/institucional/imprensa/noticias/2023/maio/justica-condena-envolvidos-no-caso-de-bomba-proxima-ao-aeroporto-de-brasilia",
      },
    ],
  },
  {
    id: "oito-janeiro",
    date: "08 JAN 2023",
    topic: "Ataques",
    kind: "Ataques às sedes dos Três Poderes",
    title: "Invasão e depredação do Congresso, Planalto e STF",
    body: "Manifestantes invadiram e depredaram as sedes dos Três Poderes em Brasília, defendendo ruptura contra o resultado da eleição. Os acontecimentos deram origem a investigações, ações penais e à CPMI.",
    context:
      "A destruição física é um fato documentado. A participação na execução, no financiamento ou no planejamento exige apuração própria para cada pessoa.",
    limit:
      "Não se deve presumir culpa coletiva de eleitores ou confundir protesto pacífico com invasão e violência.",
    sources: [
      {
        label:
          "Senado · reconstrução dos acontecimentos e consequências legislativas",
        url: "https://www12.senado.leg.br/noticias/materias/2024/01/05/ataques-de-8-de-janeiro-tiveram-reflexo-na-agenda-legislativa-em-2023",
      },
      cpmi,
    ],
  },
  {
    id: "minuta",
    date: "JAN 2023",
    topic: "Documentos",
    kind: "Documento apreendido",
    title: "A minuta encontrada na residência de Anderson Torres",
    body: "Uma minuta de decreto apreendida pela PF propunha instaurar estado de defesa na sede do TSE. A apreensão foi noticiada em 12 de janeiro; Torres afirmou que o documento não tinha viabilidade jurídica e seria descartado.",
    context:
      "Minuta é uma proposta de texto, não um decreto publicado. O conteúdo e sua relação com outras provas foram discutidos nas investigações e processos.",
    limit:
      "Existem diferentes documentos chamados de “minuta do golpe”. A apreensão de um texto e a prova de participação no plano são questões a serem examinadas nos autos.",
    sources: [
      {
        label: "Reuters/UOL · apreensão e conteúdo, 12/01/2023",
        url: "https://noticias.uol.com.br/ultimas-noticias/reuters/2023/01/12/pf-encontra-na-casa-de-ex-ministro-de-bolsonaro-minuta-de-decreto-para-intervir-no-tse-diz-fonte.htm",
      },
      {
        label: "Jota · versão apresentada por Torres à PF, 02/02/2023",
        url: "https://www.jota.info/stf/do-supremo/torres-diz-a-pf-que-nao-denunciou-minuta-de-golpe-por-considera-la-sem-valor",
      },
    ],
  },
  {
    id: "tse",
    date: "30 JUN 2023",
    topic: "Decisões",
    kind: "Decisão eleitoral",
    title: "TSE declara Bolsonaro inelegível no caso dos embaixadores",
    body: "Por maioria, o TSE declarou Bolsonaro inelegível por oito anos contados a partir das eleições de 2022, no julgamento da reunião com embaixadores.",
    context:
      "O fundamento foi eleitoral. Essa decisão é distinta das condenações criminais relacionadas à tentativa de golpe.",
    limit:
      "O registro se refere ao julgamento daquela data. Outras decisões e recursos têm fundamentos e efeitos próprios.",
    sources: [
      {
        label: "TSE · decisão de 30/06/2023",
        url: "https://www.tse.jus.br/comunicacao/noticias/2023/Junho/por-maioria-de-votos-tse-declara-bolsonaro-inelegivel-por-8-anos",
      },
    ],
  },
  {
    id: "cpmi",
    date: "18 OUT 2023",
    topic: "Apuração",
    kind: "Relatório parlamentar aprovado",
    title: "Aprovação do relatório final da CPMI",
    body: "A comissão aprovou o relatório por 20 votos a 11, com uma abstenção. A divulgação da Câmara registra pedidos de indiciamento de 61 pessoas.",
    context:
      "O relatório reúne documentos, depoimentos e conclusões parlamentares e permite acompanhar a sequência dos fatos examinados.",
    limit:
      "Pedido de indiciamento parlamentar não equivale a denúncia recebida ou condenação judicial. Houve votos e relatórios divergentes.",
    sources: [
      {
        label: "Câmara · votação e conclusões do relatório, 18/10/2023",
        url: "https://www.camara.leg.br/noticias/1008264-CPMI-DO-8-DE-JANEIRO-APROVA-RELATORIO-QUE-PEDE-O-INDICIAMENTO-DE-BOLSONARO",
      },
      cpmi,
    ],
  },
  {
    id: "tempus",
    date: "08 FEV 2024",
    topic: "Apuração",
    kind: "Operação policial",
    title: "Operação Tempus Veritatis",
    body: "A PF deflagrou operação para apurar organização suspeita de atuar na tentativa de golpe de Estado e de abolição do Estado Democrático de Direito.",
    context:
      "A investigação alcançou o núcleo político e militar e o uso de documentos e articulações associados à tentativa de ruptura.",
    limit:
      "Operação policial e medidas cautelares são etapas da investigação, não condenações por si sós.",
    sources: [
      {
        label: "PF · comunicado da Operação Tempus Veritatis",
        url: "https://www.gov.br/pf/pt-br/assuntos/noticias/2024/02/policia-federal-apura-tentativa-de-golpe-de-estado-e-abolicao-do-estado-democratico-de-direito",
      },
    ],
  },
  {
    id: "contragolpe",
    date: "19 NOV 2024",
    topic: "Apuração",
    kind: "Divulgação de investigação",
    title: "Operação Contragolpe revela o planejamento contra autoridades",
    body: "A PF divulgou a investigação de planejamento para impedir a posse e restringir o exercício do Judiciário. O comunicado descreve o plano Punhal Verde e Amarelo e a atuação investigada em novembro e dezembro de 2022.",
    context:
      "Este é o marco de divulgação da apuração, posterior à data dos fatos investigados.",
    limit:
      "Não confunda o comunicado de 2024 com uma decisão criminal sobre todos os investigados. Consulte os julgamentos posteriores e as condutas de cada réu.",
    sources: [contragolpe],
  },
  {
    id: "nucleo-um",
    date: "11 SET 2025",
    topic: "Decisões",
    kind: "Condenação criminal",
    title: "STF condena os réus do Núcleo 1",
    body: "A Primeira Turma do STF condenou Bolsonaro e outros sete réus na ação da trama golpista. Para Bolsonaro, a decisão foi por quatro votos a um. As penas e os enquadramentos são individualizados.",
    context:
      "O registro identifica uma decisão judicial, e não apenas a existência de acusações ou de relatório policial. As defesas contestaram a condenação.",
    limit:
      "O julgamento de um núcleo não substitui o exame dos demais. Esta ficha registra a decisão da data indicada e não certifica, sozinha, trânsito em julgado ou execução atual.",
    sources: [
      {
        label: "STF · julgamento do Núcleo 1, 11/09/2025",
        url: "https://noticias.stf.jus.br/postsnoticias/stf-condena-os-oito-reus-da-acao-por-golpe-de-estado/",
      },
      {
        label: "Agência Brasil · resultado e enquadramentos do julgamento",
        url: "https://agenciabrasil.ebc.com.br/justica/noticia/2025-09/por-4-1-stf-condena-bolsonaro-e-mais-sete-pela-trama-golpista",
      },
    ],
  },
  {
    id: "nucleo-dois",
    date: "16 DEZ 2025",
    topic: "Decisões",
    kind: "Condenação criminal · AP 2693",
    title: "Julgamento do Núcleo 2 e os documentos do plano",
    body: "O STF informou a condenação de cinco réus do Núcleo 2. O comunicado relaciona esse núcleo à minuta, ao monitoramento de autoridades e a ações examinadas no processo.",
    context:
      "Os diferentes núcleos têm réus, condutas, provas e decisões próprios. A organização por processo evita tratar todo o caso como uma única condenação indiferenciada.",
    limit:
      "O registro não apresenta uma certidão de todos os desfechos ou recursos posteriores.",
    sources: [
      {
        label: "STF · julgamento do Núcleo 2, AP 2693",
        url: "https://noticias.stf.jus.br/postsnoticias/primeira-turma-do-stf-condena-cinco-reus-do-nucleo-2-por-tentativa-de-golpe/",
      },
    ],
  },
];
