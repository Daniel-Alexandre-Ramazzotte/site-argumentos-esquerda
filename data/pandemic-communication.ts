import type { TimelineEvent } from "@/components/interactive-timeline";
export type DatedPandemicEvent = TimelineEvent & { sortDate: string };
const cpi = {
  label: "Senado · relatório final da CPI da Pandemia",
  url: "https://www2.senado.leg.br/bdsf/bitstream/handle/id/607974/CPI_pandemia_relatorio_final_2021.pdf",
};
export const pandemicCommunication: DatedPandemicEvent[] = [
  {
    id: "pronunciamento-marco",
    sortDate: "2020-03-24",
    date: "24 MAR 2020",
    topic: "Comunicação",
    title: "Pronunciamento minimiza o risco e pede volta à normalidade",
    body: "Em rede nacional, Bolsonaro criticou o fechamento de escolas e o confinamento em massa e pediu retorno à normalidade. Ao falar sobre como supunha que a doença o afetaria pessoalmente, mencionou seu histórico de atleta e usou a expressão ‘gripezinha ou resfriadinho’. A SBIm contestou o pronunciamento e a orientação de abandonar o isolamento, em nota de 25 de março.",
    context:
      "A comunicação presidencial pode orientar a percepção de risco. O registro situa a expressão em sua frase original e documenta a divergência com uma entidade científica à época, sem transformar toda revisão de orientação sanitária em negacionismo.",
    limit:
      "Não inferimos quantas pessoas deixaram de se proteger por causa de uma fala nem calculamos mortes atribuídas a ela sem estudo específico. A caracterização crítica se apoia na minimização do risco e na contraposição às orientações documentadas.",
    sources: [
      {
        label: "Vídeo do pronunciamento · O Globo, 24/03/2020",
        url: "https://www.youtube.com/watch?v=tzd7wIHfUrk",
      },
      {
        label: "SBIm · posicionamento sobre o pronunciamento, 25/03/2020",
        url: "https://sbim.org.br/images/files/posicionamento-discurso-presidente-covid19-v3.pdf",
      },
      {
        label:
          "Agência Câmara · registro do pronunciamento e reação institucional",
        url: "https://www.camara.leg.br/noticias/647967-maia-critica-pronunciamento-de-bolsonaro-e-pede-sensatez-equilibrio-e-uniao",
      },
    ],
  },
  {
    id: "veto-mascaras",
    sortDate: "2020-07-03",
    date: "3 JUL 2020",
    topic: "Máscaras",
    title: "Vetos à obrigatoriedade de máscaras em estabelecimentos",
    body: "Ao sancionar a Lei 14.019/2020, Bolsonaro vetou dispositivos que previam uso obrigatório de máscaras em locais como comércio, escolas e igrejas. Entre as justificativas presidenciais estava a proteção de domicílios e a autonomia dos entes federados. O ato não proibiu o uso de máscaras nem eliminou todas as obrigações existentes.",
    context:
      "Além das falas, há decisões normativas documentadas sobre prevenção. A obrigação legal, o fornecimento de equipamentos e a orientação sanitária são dimensões diferentes.",
    limit:
      "O Congresso derrubou os vetos correspondentes em 19 de agosto de 2020. O registro não apresenta o veto como se continuasse em vigor nem o confunde com uma proibição de usar máscaras.",
    sources: [
      {
        label:
          "Agência Senado · vetos de 03/07/2020, com atualização posterior",
        url: "https://www12.senado.leg.br/noticias/materias/2020/07/03/bolsonaro-veta-uso-obrigatorio-de-mascara-no-comercio-em-escolas-e-em-igrejas",
      },
      {
        label: "Congresso · dispositivos e justificativas do Veto 25/2020",
        url: "https://legis.senado.leg.br/sdleg-getter/documento?disposition=inline&dm=8861684&ts=1713295569055",
      },
    ],
  },
  {
    id: "derrubada-veto-mascaras",
    sortDate: "2020-08-19",
    date: "19 AGO 2020",
    topic: "Máscaras",
    title: "Congresso derruba veto sobre máscaras",
    body: "Deputados e senadores derrubaram o veto parcial que afastava a obrigação de máscaras em estabelecimentos. A Agência Senado também registra a discussão sobre fornecimento gratuito para a população de menor renda.",
    context:
      "A resposta à pandemia envolveu Executivo, Congresso, Judiciário, estados, municípios e serviços de saúde. A posição do presidente não descreve automaticamente todas as ações do Estado brasileiro.",
    limit:
      "Derrubar um veto não mede o grau de cumprimento da regra ou a disponibilidade de equipamentos em cada local.",
    sources: [
      {
        label: "Agência Senado · derrubada do veto, 19/08/2020",
        url: "https://www12.senado.leg.br/noticias/noticias/materias/2020/08/19/derrubado-veto-de-bolsonaro-ao-uso-obrigatorio-de-mascara-na-pandemia",
      },
    ],
  },
  {
    id: "coronavac-recuo",
    sortDate: "2020-10-21",
    date: "21 OUT 2020",
    topic: "Vacinas",
    title: "Bolsonaro desautoriza intenção de compra da CoronaVac",
    body: "Um dia após o Ministério da Saúde anunciar negociação de 46 milhões de doses, Bolsonaro negou a compra da CoronaVac e desautorizou o encaminhamento de Eduardo Pazuello. A decisão foi noticiada pelo Senado e pela Reuters. A vacina ainda estava em desenvolvimento naquele momento; a autorização de uso e a contratação ocorreram depois.",
    context:
      "Exigir avaliação regulatória não impede distinguir essa etapa de um protocolo para negociar fornecimento. O episódio registra descontinuidade pública na negociação e conflito com o Instituto Butantan e o governo de São Paulo.",
    limit:
      "Não significa que o governo jamais comprou CoronaVac: a vacina foi posteriormente contratada e usada no SUS. Não se trata de doses já aprovadas e entregues naquele dia de outubro.",
    sources: [
      {
        label: "Agência Senado · recuo na compra, 21/10/2020",
        url: "https://www12.senado.leg.br/noticias/noticias/materias/2020/10/21/senadores-criticam-recuo-do-governo-na-compra-de-vacina-contra-coronavirus",
      },
      {
        label: "Reuters/UOL · declaração sobre cancelamento do protocolo",
        url: "https://economia.uol.com.br/noticias/reuters/2020/10/21/bolsonaro-diz-que-cancelou-acordo-com-butantan-e-nao-ira-gastar-com-vacina-que-desconhece.amp.htm",
      },
      cpi,
    ],
  },
  {
    id: "vacina-jacare",
    sortDate: "2020-12-17",
    date: "17 DEZ 2020",
    topic: "Vacinas",
    title: "Recusa pública de vacinação e ironia sobre ‘virar jacaré’",
    body: "Em discurso na Bahia, Bolsonaro disse que não pretendia se vacinar, alegando já ter tido a doença, e ironizou possíveis efeitos adversos da vacina da Pfizer com a imagem de alguém ‘virar um jacaré’. O contexto era a responsabilidade contratual por efeitos adversos. O episódio é apresentado como comunicação que põe a vacinação em dúvida, não como uma hipótese médica válida.",
    context:
      "O presidente era uma figura pública com alcance nacional. Uma recusa pessoal e uma ironia sobre segurança podem ser examinadas como desestímulo, mas isso não autoriza afirmar, sem documentação, que todo receptor interpretou a fala da mesma maneira.",
    limit:
      "Não atribuímos à vacina transformações biológicas impossíveis nem afirmamos risco zero para qualquer intervenção médica. Avaliação de benefícios e riscos exige dados clínicos e análise regulatória.",
    sources: [
      {
        label: "SBT News · discurso de 17/12, noticiado em 18/12/2020",
        url: "https://sbtnews.sbt.com.br/noticia/governo/157028-se-virar-jacare-e-problema-seu-diz-bolsonaro-sobre-vacina-da-pfizer",
      },
      cpi,
    ],
  },
  {
    id: "acao-restricoes",
    sortDate: "2021-03-19",
    date: "19 MAR 2021",
    topic: "Isolamento",
    title: "Ação contra restrições de comércio e circulação",
    body: "O STF informou que Bolsonaro ajuizou a ADI 6764 para suspender decretos da Bahia, do Distrito Federal e do Rio Grande do Sul que restringiam atividades não essenciais e estabeleciam toque de recolher. A ação invocava legalidade, proporcionalidade e liberdades econômica e de locomoção.",
    context:
      "O episódio mostra oposição institucional a restrições de circulação durante a crise. Discutir custos, duração e alcance de uma medida é diferente de negar toda evidência sobre redução de contatos. A análise histórica identifica a medida contestada e o argumento usado.",
    limit:
      "Ajuizar uma ação é exercício de uma prerrogativa e não comprova crime. O registro não equipara qualquer restrição local a um lockdown nacional nem afirma que o ajuizamento suspendeu automaticamente os decretos.",
    sources: [
      {
        label: "STF · notícia da ADI 6764, 19/03/2021",
        url: "https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=462626&ori=1",
      },
      {
        label:
          "Agência Senado · especialistas sobre medidas não farmacológicas, 24/06/2021",
        url: "https://www12.senado.leg.br/noticias/materias/2021/06/24/contra-novas-mortes-evitaveis-depoentes-defendem-vacinacao-e-lockdown",
      },
    ],
  },
  {
    id: "mascaras-parecer",
    sortDate: "2021-06-10",
    date: "10 JUN 2021",
    topic: "Máscaras",
    title: "Proposta de desobrigar máscaras para vacinados ou infectados",
    body: "Bolsonaro anunciou que solicitara ao ministro Marcelo Queiroga parecer para dispensar máscaras de pessoas vacinadas ou que já haviam se infectado. A proposta provocou contestação diante das condições epidemiológicas daquele momento. Em agosto, o Butantan explicou a importância das máscaras, inclusive diante da transmissão por pessoas sem sintomas, e refutou a alegação de que causariam hipóxia.",
    context:
      "Recomendações variam conforme transmissão, cobertura vacinal e ambiente. O questionamento deve ser situado em junho de 2021, sem transportar regras de fases posteriores da pandemia para aquele cenário.",
    limit:
      "Anúncio de parecer não é comprovação de publicação de uma norma que dispensou máscaras. O site não transforma uma orientação histórica em recomendação clínica atual.",
    sources: [
      {
        label:
          "Acervo do Senado · notícia de 11/06 sobre a declaração do dia anterior",
        url: "https://www2.senado.leg.br/jspui/bitstream/id/621376/1/noticia.html",
      },
      {
        label: "Instituto Butantan · explicação publicada em 12/08/2021",
        url: "https://www.butantan.gov.br/bubutantan/por-que-precisamos-usar-mascara-para-nos-proteger-contra-a-covid-19",
      },
    ],
  },
  {
    id: "vacina-aids",
    sortDate: "2021-10-21",
    date: "21 OUT 2021",
    topic: "Vacinas",
    title: "Live divulga associação falsa entre vacinação e Aids",
    body: "Bolsonaro leu em transmissão uma alegação de que pessoas completamente vacinadas contra a covid-19 estariam desenvolvendo Aids mais rapidamente. A associação foi refutada por autoridades de saúde. Em nota de 24 de outubro, o UNAIDS esclareceu que a vacina não transmite HIV e que não havia evidência da associação alegada. O Conselho Nacional de Saúde também registrou repúdio à declaração.",
    context:
      "Este caso permite distinguir opinião de desinformação verificável. O problema não é discutir políticas de vacinação, mas divulgar uma associação biomédica sem sustentação, que pode alimentar hesitação e estigma contra pessoas vivendo com HIV.",
    limit:
      "A falsidade da associação não determina, por si só, um desfecho criminal ou o tamanho de seu impacto sobre a cobertura vacinal. A nota do UNAIDS é apresentada como esclarecimento datado de 2021.",
    sources: [
      {
        label: "UNAIDS · esclarecimento de 24/10/2021",
        url: "https://unaids.org.br/2021/10/nota-de-esclarecimento-vacina-contra-covid19-e-aids/",
      },
      {
        label: "Conselho Nacional de Saúde · ata com a moção sobre a live",
        url: "https://www.gov.br/conselho-nacional-de-saude/pt-br/reunioes-do-conselho/atas-extraordinarias/2021/ata-da-72a-reuniao-extraordinarias-do-cns",
      },
      {
        label: "SBT · reportagem em vídeo sobre a live e sua remoção",
        url: "https://www.youtube.com/watch?v=pKeF0CurENo",
      },
    ],
  },
];

export const preventionTopics = [
  {
    title: "Minimização da doença e negacionismo",
    body: "A discussão não se resume a um rótulo. O pronunciamento de março de 2020 minimizou o risco e contestou o isolamento, enquanto a SBIm alertava para a gravidade da transmissão. A linha do tempo permite conferir a fala, sua situação e a resposta científica da época.",
  },
  {
    title: "Desestímulo à vacinação",
    body: "Recusa pública em se vacinar, ironias sobre efeitos adversos, recuo na negociação da CoronaVac e a associação falsa com Aids aparecem como episódios separados. A existência de compras e de uma campanha do SUS não apaga essas manifestações; tampouco permite dizer que toda ação governamental foi contrária às vacinas.",
  },
  {
    title: "Isolamento e lockdown",
    body: "O pronunciamento contra o confinamento e a ação para suspender restrições locais documentam a oposição do presidente. Medidas têm custos e dependem de duração, apoio de renda e condições sanitárias; isso exige avaliar sua execução, em vez de concluir que reduzir contatos seria sempre inútil.",
  },
  {
    title: "Máscaras e mensagens contraditórias",
    body: "A cronologia reúne os vetos, sua derrubada pelo Congresso e a proposta de dispensa para vacinados ou já infectados. Cada etapa identifica quem decidiu e quando. A resposta sanitária do Butantan aparece junto às declarações, para que o leitor possa confrontar orientação e evidência.",
  },
];
