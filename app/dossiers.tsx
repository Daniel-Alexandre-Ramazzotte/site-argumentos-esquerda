"use client";
import { useState } from "react";
import { InteractiveTimeline } from "@/components/interactive-timeline";
import {
  pandemicCommunication,
  preventionTopics,
} from "@/data/pandemic-communication";
import {
  ArrowUpRight,
  Search,
  Clock3,
  FileText,
  ChevronDown,
} from "lucide-react";

type Reference = { label: string; url: string };
type RecordItem = {
  id: string;
  date: string;
  topic: string;
  title: string;
  body: string;
  limit: string;
  sources: Reference[];
};
const cpi: Reference = {
  label: "Senado · relatório final da CPI (2021)",
  url: "https://www2.senado.leg.br/bdsf/bitstream/handle/id/607974/CPI_pandemia_relatorio_final_2021.pdf",
};
const tcu: Reference = {
  label: "TCU · cinco ciclos de acompanhamento (2020–2021)",
  url: "https://portal.tcu.gov.br/imprensa/noticias/publicacoes-resumem-acompanhamento-do-tcu-sobre-conduta-do-ministerio-da-saude-na-pandemia",
};
const pfizer: Reference = {
  label: "Senado · depoimento de Carlos Murillo, 13/05/2021",
  url: "https://www12.senado.leg.br/noticias/materias/2021/05/13/representante-da-pfizer-confirma-governo-nao-respondeu-ofertas-feitas-em-agosto-de-2020",
};
const timeline: RecordItem[] = [
  {
    id: "oms",
    date: "11 MAR 2020",
    topic: "Contexto",
    title: "OMS caracteriza a COVID-19 como pandemia",
    body: "O marco situa a crise sanitária internacional. Para comparar países ou governos, é necessário considerar exposição ao vírus, perfil etário e capacidade dos sistemas de saúde.",
    limit:
      "A classificação sanitária não determina a responsabilidade por cada decisão nacional.",
    sources: [
      {
        label: "OPAS/OMS · cronologia da resposta",
        url: "https://www.paho.org/en/news/2-7-2020-timeline-whos-response-covid-19",
      },
    ],
  },
  {
    id: "respiradores",
    date: "MAR–JUN 2020",
    topic: "Gestão e insumos",
    title: "Contratos de respiradores sob fiscalização",
    body: "O segundo acompanhamento do TCU examinou contratos federais de respiradores e solicitou documentação sobre estratégia de compras, necessidades, cronogramas e distribuição de equipamentos.",
    limit:
      "Uma solicitação de informações não comprova fraude. Contratos estaduais e federais precisam ser identificados separadamente.",
    sources: [
      {
        label: "TCU · segundo relatório de acompanhamento",
        url: "https://pesquisa.apps.tcu.gov.br/redireciona/acordao-completo/ACORDAO-COMPLETO-2420064",
      },
    ],
  },
  {
    id: "pfizer-ofertas",
    date: "14–26 AGO 2020",
    topic: "Vacinas",
    title: "Ofertas da Pfizer e ausência de resposta conclusiva",
    body: "Segundo Carlos Murillo, em depoimento à CPI, a Pfizer enviou propostas em agosto. A oferta de 26 de agosto previa 1,5 milhão de doses em 2020; o executivo relatou ausência de resposta governamental no prazo da proposta.",
    limit:
      "Era um cronograma proposto, sujeito à contratação e às condições regulatórias e de fornecimento. Não eram doses já entregues.",
    sources: [pfizer],
  },
  {
    id: "pfizer-virus",
    date: "10 NOV 2020",
    topic: "Vacinas",
    title: "Élcio Franco alega vírus na rede ao responder à Pfizer",
    body: "Em e-mail de 10 de novembro de 2020, Élcio Franco, então secretário-executivo do Ministério da Saúde no governo Bolsonaro, atribuiu dificuldades para acessar e analisar arquivos da Pfizer a um problema de vírus na rede da pasta. A mensagem foi noticiada em maio de 2021 e a justificativa aparece em documentos da CPI. Em depoimento em 9 de junho, Franco também alegou problemas técnicos e disse que o e-mail do ministério ficou inoperante entre 5 e 12 de novembro.",
    limit:
      "A autoria documentada é de Élcio Franco, não uma declaração pessoal de Bolsonaro. Registrar a alegação não comprova o incidente técnico nem explica, por si só, os meses anteriores e posteriores de negociação.",
    sources: [
      {
        label: "Senado · documento da CPI sobre a alegação de vírus na rede",
        url: "https://legis.senado.leg.br/sdleg-getter/documento/download/da7e0096-a2a8-4fb5-93be-a98d8cb0a9b1",
      },
      {
        label: "Senado · depoimento de Élcio Franco, 09/06/2021",
        url: "https://www12.senado.leg.br/noticias/materias/2021/06/09/cpi-senadores-cobram-elcio-franco-sobre-demora-na-compra-de-vacinas",
      },
      {
        label:
          "VoxMS · reportagem sobre o e-mail de 10/11, publicada em 25/05/2021",
        url: "https://www.voxms.com.br/saude/braco-direito-de-pazuello-diz-que-virus-no-computador-atrasou-resposta-a-pfizer",
      },
    ],
  },
  {
    id: "manaus",
    date: "14–15 JAN 2021",
    topic: "Gestão e insumos",
    title: "Colapso de oxigênio em Manaus",
    body: "O relatório da CPI registra a falta de oxigênio na rede hospitalar. O TCU também apontou atuação reativa do Ministério da Saúde no acompanhamento de estoques e na aquisição do insumo.",
    limit:
      "Oxigênio medicinal e respiradores são insumos distintos. A apuração envolve atribuições federais e estaduais.",
    sources: [cpi, tcu],
  },
  {
    id: "anvisa",
    date: "17 JAN 2021",
    topic: "Vacinas",
    title: "Anvisa autoriza uso emergencial de duas vacinas",
    body: "A agência aprovou o uso emergencial da CoronaVac e da vacina Oxford/AstraZeneca. A autorização regulatória é uma etapa distinta da negociação, compra e distribuição.",
    limit:
      "O marco não significa que todos os imunizantes já tivessem autorização ou disponibilidade na mesma data.",
    sources: [
      {
        label: "Anvisa · decisão de 17/01/2021",
        url: "https://www.gov.br/anvisa/pt-br/assuntos/paf/noticias-anvisa/2021/anvisa-aprova-por-unanimidade-uso-emergencial-das-vacinas",
      },
    ],
  },
  {
    id: "fala",
    date: "18 MAR 2021",
    topic: "Comunicação",
    title: "Bolsonaro imita uma pessoa com falta de ar",
    body: "Na transmissão, Bolsonaro imitou falta de ar ao defender o chamado tratamento inicial e criticar orientações associadas ao ex-ministro Mandetta. A gravação permite conferir a conduta e seu contexto.",
    limit:
      "O gesto é verificável. Descrevê-lo como “zombar da morte de pessoas” acrescenta uma interpretação da intenção, que deve ser identificada como tal.",
    sources: [
      {
        label: "Registro em vídeo · Poder360, publicado em 18/03/2021",
        url: "https://www.youtube.com/watch?v=NTFj1xAwg2M",
      },
    ],
  },
  {
    id: "pfizer-contrato",
    date: "MAR 2021",
    topic: "Vacinas",
    title: "Primeiro contrato da Pfizer",
    body: "O primeiro contrato foi fechado em março de 2021, meses após as propostas de agosto de 2020, conforme o resumo do depoimento publicado pela TV Senado.",
    limit:
      "O intervalo documenta a cronologia. Uma estimativa de mortes evitáveis exige estudo específico e não decorre apenas dessas datas.",
    sources: [
      {
        label: "TV Senado · resumo do depoimento, 14/05/2021",
        url: "https://www12.senado.leg.br/tv/plenario-e-comissoes/cpi-da-pandemia/2021/05/veja-um-resumo-do-depoimento-do-gerente-da-pfizer-na-cpi-da-pandemia",
      },
    ],
  },
  {
    id: "cpi-final",
    date: "26 OUT 2021",
    topic: "Fiscalização",
    title: "Relatório final da CPI da Pandemia",
    body: "A comissão consolidou suas conclusões sobre ações e omissões na resposta à crise. O documento permite consultar depoimentos e fundamentos das recomendações.",
    limit:
      "Recomendação de indiciamento por CPI não equivale a denúncia recebida ou condenação criminal.",
    sources: [cpi],
  },
];
const pandemicContext: Record<string, string> = {
  oms: "Este é um marco internacional, anterior aos eventos posteriores da resposta brasileira. A análise separa a existência do choque global das decisões tomadas em cada país.",
  respiradores:
    "Uma compra emergencial envolve planejamento, escolha do fornecedor, contratação, entrega e distribuição. A fiscalização citada trata de contratos do Ministério da Saúde; não deve ser confundida com investigações de compras de governos estaduais.",
  "pfizer-ofertas":
    "A sequência permite comparar a data da oferta com a contratação posterior. O depoimento identifica a proposta e o cronograma que a empresa apresentou, sem garantir que todas as entregas previstas ocorreriam automaticamente.",
  "pfizer-virus":
    "As primeiras ofertas já haviam sido apresentadas em agosto de 2020. A alegação de indisponibilidade em parte de novembro deve ser confrontada com toda a cronologia, inclusive outros canais de contato. A responsabilidade da gestão e a autoria de cada declaração são apresentadas separadamente.",
  manaus:
    "A crise não se resume à disponibilidade de ventiladores. A ventilação hospitalar depende de oxigênio medicinal e de uma rede de abastecimento, estoques e logística. Os documentos citados tratam da resposta de diferentes gestores.",
  anvisa:
    "Autorização para uso emergencial, registro definitivo, assinatura de contrato e entrega de doses são marcos diferentes. Separá-los evita concluir que a mera existência de uma proposta já significava vacinação disponível.",
  fala: "O registro audiovisual documenta a manifestação pública do então presidente. O contexto é a defesa de uma abordagem de tratamento e a crítica a orientações atribuídas ao ex-ministro; o leitor pode conferir o vídeo original citado.",
  "pfizer-contrato":
    "A negociação começou antes da assinatura. A comparação cronológica é verificável; quantificar impactos sanitários dessa demora exige modelos e estudos adicionais, com hipóteses explícitas.",
  "cpi-final":
    "O relatório organiza depoimentos, documentos e recomendações de responsabilização. Uma conclusão parlamentar, a abertura de investigação e uma decisão criminal têm natureza e efeitos distintos.",
};
const pandemicDates: Record<string, string> = {
  oms: "2020-03-11",
  respiradores: "2020-03-25",
  "pfizer-ofertas": "2020-08-14",
  "pfizer-virus": "2020-11-10",
  manaus: "2021-01-14",
  anvisa: "2021-01-17",
  fala: "2021-03-18",
  "pfizer-contrato": "2021-03-01",
  "cpi-final": "2021-10-26",
};
const pandemicEvents = [
  ...timeline.map((event) => ({
    ...event,
    context: pandemicContext[event.id],
    sortDate: pandemicDates[event.id],
  })),
  ...pandemicCommunication,
].sort((a, b) => a.sortDate.localeCompare(b.sortDate));
const failures: RecordItem[] = [
  {
    id: "coordenacao",
    date: "2020–2021",
    topic: "Coordenação federal",
    title: "Planejamento e coordenação nacional",
    body: "O TCU concluiu que o governo federal não exercia adequadamente a função de planejamento central para elaborar cenários, identificar riscos e estabelecer ações de enfrentamento.",
    limit:
      "Trata-se de conclusão de fiscalização administrativa; responsabilidades pessoais e criminais exigem apuração própria.",
    sources: [
      {
        label: "TCU · falhas no planejamento estratégico, julho de 2021",
        url: "https://portal.tcu.gov.br/data/pages/8A81881F7A76D4A1017A82C7663668C9.htm",
      },
    ],
  },
  {
    id: "testagem",
    date: "2020–2021",
    topic: "Testagem",
    title: "Testes sem estratégia definida de distribuição",
    body: "O acompanhamento do TCU apontou distribuição orientada pela demanda dos estados, sem critério específico nem vínculo com uma estratégia definida.",
    limit:
      "O achado trata da política federal analisada, não de toda testagem realizada no país.",
    sources: [tcu],
  },
  {
    id: "medicamentos",
    date: "2020–2021",
    topic: "Medicamentos",
    title: "Defesa do chamado tratamento precoce",
    body: "A CPI examinou a promoção de medicamentos como cloroquina e hidroxicloroquina no enfrentamento da COVID-19 e criticou a aposta no chamado tratamento precoce.",
    limit:
      "A discussão é sobre uso contra a COVID-19. A eficácia de um medicamento em outra doença não valida esse uso. Este acervo não oferece orientação clínica.",
    sources: [cpi],
  },
  {
    id: "oxigenio",
    date: "2021",
    topic: "Assistência hospitalar",
    title: "Resposta reativa na crise de oxigênio",
    body: "O TCU identificou reação tardia no monitoramento e na aquisição de oxigênio para apoiar estados e municípios em situação crítica.",
    limit:
      "O relatório não autoriza atribuir toda a cadeia de abastecimento exclusivamente à União.",
    sources: [tcu],
  },
];
const cases: RecordItem[] = [
  {
    id: "reuniao-ministerial-pf",
    date: "22 ABR 2020 · VÍDEO PÚBLICO EM 22 MAI",
    topic: "Jair Bolsonaro",
    title: "Reunião ministerial: família, segurança e troca de ministro",
    body: "Na reunião, Bolsonaro disse: “Eu não vou esperar foder a minha família toda”. Em seguida, falou em substituir alguém da segurança, seu chefe e, se necessário, o ministro. O trecho registra sua manifestação; a transcrição usa “família”, e não a formulação “meu filho”. A gravação foi divulgada por decisão do STF no inquérito sobre a alegação de interferência política na Polícia Federal apresentada por Sergio Moro. Bolsonaro sustentou que falava de segurança pessoal.",
    limit:
      "A fala é um registro documental e não uma condenação por corrupção. Em março de 2022, o relatório da PF concluiu não haver elementos mínimos de materialidade criminal atribuível a Bolsonaro nesse inquérito; conclusão policial, pedido da PGR e decisão judicial são atos distintos. Não apresentamos este episódio como prova automática de culpa de seus familiares.",
    sources: [
      {
        label: "Assistir ao trecho · vídeo da reunião (1min47s), Poder360",
        url: "https://www.youtube.com/watch?v=Xn7ZQkHIWZE",
      },
      {
        label: "Laudo da PF · transcrição da reunião de 22/04/2020",
        url: "https://static.poder360.com.br/2020/05/transcricao-video-reuniao22abr.pdf",
      },
      {
        label: "STF · decisão que tornou pública a gravação, 22/05/2020",
        url: "https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=443959&tip=UN",
      },
      {
        label: "STF · relatório final da PF encaminhado à PGR, março de 2022",
        url: "https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=486020&ori=1",
      },
    ],
  },
  {
    id: "moro-demissao",
    date: "24 ABR 2020",
    topic: "Jair Bolsonaro",
    title: "Moro deixa o Ministério da Justiça e alega interferência na PF",
    body: "Sergio Moro anunciou sua saída após a exoneração do diretor-geral da PF, Maurício Valeixo. Segundo o relato do então ministro, Bolsonaro queria trocar o comando sem apresentar razão técnica, ter contato direto para obter informações de investigações e relatórios e substituir superintendentes, começando pelo Rio de Janeiro. Moro afirmou que isso rompia a autonomia prometida ao assumir o cargo. No mesmo dia, Bolsonaro negou interferência e acusou Moro de condicionar a troca à indicação para uma vaga no STF.",
    limit:
      "São alegações públicas de Moro e a resposta de Bolsonaro, não fatos criminais presumidos como provados. A PF concluiu, em 2022, não haver elementos mínimos de materialidade delitiva atribuível ao presidente no âmbito investigado. A notícia da demissão e o vídeo da reunião devem ser lidos com esse andamento, sem confundir crítica política com condenação judicial.",
    sources: [
      {
        label:
          "Agência Câmara · notícia da demissão e alegações de Moro, 24/04/2020",
        url: "https://www.camara.leg.br/noticias/656653-ao-se-demitir-moro-aponta-tentativa-de-interferencia-politica-na-policia-federal/",
      },
      {
        label: "Assistir à coletiva completa de demissão · VEJA, 24/04/2020",
        url: "https://www.youtube.com/watch?v=5sh2Z4z0eu4",
      },
      {
        label: "Rádio Senado · resposta de Bolsonaro no mesmo dia",
        url: "https://www12.senado.leg.br/radio/1/noticia/2020/04/24/bolsonaro-nega-interferencia-na-pf-e-faz-acusacoes-contra-moro",
      },
      {
        label: "STF · conclusão do relatório policial e envio à PGR em 2022",
        url: "https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=486020&ori=1",
      },
    ],
  },
  {
    id: "flavio",
    date: "DECISÕES DE 2021",
    topic: "Flávio Bolsonaro",
    title: "Suspeita de rachadinha no gabinete da Alerj",
    body: "A denúncia tratou de suposto recolhimento de parcelas de salários de assessores. Em novembro de 2021, a Segunda Turma do STF anulou quatro dos cinco relatórios financeiros do Coaf que embasaram a acusação, por considerar sua obtenção incompatível com as regras aplicáveis.",
    limit:
      "Este registro descreve aquela decisão, não o andamento integral atual. Anulação de provas não é condenação nem absolvição de mérito.",
    sources: [
      {
        label: "STF · HC 201965, 30/11/2021",
        url: "https://noticias.stf.jus.br/postsnoticias/2a-turma-decide-que-provas-contra-flavio-bolsonaro-no-caso-das-chamadas-rachadinhas-sao-ilegais/",
      },
    ],
  },
  {
    id: "carlos",
    date: "REGISTRO DE FEV 2026",
    topic: "Carlos Bolsonaro",
    title: "Investigação sobre suspeita de rachadinha",
    body: "O UOL informou, com base em manifestação do Ministério Público do Rio, a determinação de diligências complementares na investigação envolvendo Carlos Bolsonaro. A reportagem relata que o arquivamento anterior foi considerado prematuro.",
    limit:
      "A informação registra uma investigação, não uma condenação. Fonte jornalística; o andamento posterior precisa ser consultado nos autos.",
    sources: [
      {
        label: "UOL · reportagem de 24/02/2026",
        url: "https://noticias.uol.com.br/politica/ultimas-noticias/2026/02/24/justica-reabre-investigacao-contra-carlos-bolsonaro-por-suposta-rachadinha.htm",
      },
    ],
  },
  {
    id: "adriano",
    date: "VÍNCULOS NOTICIADOS EM 2020",
    topic: "Flávio Bolsonaro",
    title: "Adriano da Nóbrega: homenagens e familiares no gabinete",
    body: "Reportagens documentaram a contratação da mãe e da então esposa de Adriano da Nóbrega pelo gabinete de Flávio e a homenagem concedida ao ex-policial na Alerj. Adriano era apontado por investigadores como integrante de milícia.",
    limit:
      "Contratação de familiares e homenagem não demonstram, por si sós, participação de Flávio em milícia ou em crimes atribuídos a Adriano.",
    sources: [
      {
        label: "Folha de S.Paulo · reportagem de 10/02/2020",
        url: "https://www1.folha.uol.com.br/poder/2020/02/entenda-a-morte-de-miliciano-e-os-elos-dele-com-flavio-bolsonaro.shtml",
      },
    ],
  },
  {
    id: "joias",
    date: "REGISTROS DE MAR 2026",
    topic: "Jair Bolsonaro",
    title: "Joias e presentes recebidos em viagens oficiais",
    body: "A investigação apurou suposto desvio de presentes oficiais. Em março de 2026, a PGR pediu o arquivamento; posteriormente, Alexandre de Moraes solicitou novo parecer da Procuradoria, segundo a Agência Brasil.",
    limit:
      "Pedido de arquivamento e decisão de arquivar são atos distintos. Este registro não afirma um desfecho posterior nem condenação.",
    sources: [
      {
        label: "Agência Brasil · pedido da PGR, 05/03/2026",
        url: "https://agenciabrasil.ebc.com.br/justica/noticia/2026-03/pgr-pede-arquivamento-de-inquerito-sobre-desvio-de-joias-por-bolsonaro",
      },
      {
        label: "Agência Brasil · novo parecer, 19/03/2026",
        url: "https://agenciabrasil.ebc.com.br/justica/noticia/2026-03/stf-pede-novo-parecer-da-pgr-sobre-caso-das-joias-saudita",
      },
    ],
  },
];
const rio: RecordItem[] = [
  {
    id: "iabas",
    date: "CONTRATOS DE 2020",
    topic: "Rede estadual",
    title: "Iabas e hospitais de campanha",
    body: "A documentação da Controladoria-Geral do Estado registra auditoria do contrato 027/2020 com o Iabas para implantação de hospitais de campanha. As investigações sobre a saúde estadual no período também alcançaram o governo Wilson Witzel.",
    limit:
      "A auditoria e a investigação não equivalem a condenação criminal. A gestão era estadual; não se deve atribuir esses contratos automaticamente ao presidente da República.",
    sources: [
      {
        label: "CGE-RJ · relatório de contas de governo de 2020",
        url: "https://cge.rj.gov.br/wp-content/uploads/2025/08/Contas-de-Governo-2020.pdf",
      },
      {
        label: "Acervo do Senado · Operação Placebo, 2020",
        url: "https://www2.senado.leg.br/jspui/bitstream/id/574620/1/noticia.html",
      },
    ],
  },
  {
    id: "bonsucesso",
    date: "CONTRATOS DE 2020 · APURAÇÃO EM 2025",
    topic: "Rede federal",
    title: "Hospital Federal de Bonsucesso",
    body: "Em julho de 2025, a CGU divulgou força-tarefa sobre indícios de contratações fraudulentas de medicamentos e luvas em 2020, durante a pandemia. A operação reuniu CGU, PF, Receita Federal e Gaeco/MPF.",
    limit:
      "O comunicado descreve indícios e diligências. Não estabelece condenação nem responsabilidade criminal automática do presidente ou de seus familiares.",
    sources: [
      {
        label: "CGU · força-tarefa e objeto da investigação, julho de 2025",
        url: "https://www.gov.br/cgu/pt-br/assuntos/noticias/2025/07/forca-tarefa-apura-desvios-de-recursos-publicos-na-compra-de-medicamentos-e-luvas-em-hospital-federal-do-rio-de-janeiro",
      },
    ],
  },
];
function References({ items }: { items: Reference[] }) {
  return (
    <div className="record-sources">
      {items.map((s) => (
        <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
          {s.label}
          <ArrowUpRight size={14} />
        </a>
      ))}
    </div>
  );
}
function RecordCard({ item }: { item: RecordItem }) {
  return (
    <article className="record-card" id={item.id}>
      <div className="record-meta">
        <span>{item.date}</span>
        <span>{item.topic}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <details>
        <summary>
          Contexto e limites <ChevronDown size={15} />
        </summary>
        <p>{item.limit}</p>
      </details>
      <References items={item.sources} />
    </article>
  );
}
export function PandemicDossier() {
  return (
    <section id="linha-do-tempo" className="dossier-section">
      <div className="wrap section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <Clock3 size={14} /> CRONOLOGIA DOCUMENTADA · 2020–2021
            </div>
            <h2>A resposta à pandemia, em perspectiva.</h2>
          </div>
          <a
            className="text-link"
            href={cpi.url}
            target="_blank"
            rel="noreferrer"
          >
            Abrir relatório da CPI <ArrowUpRight size={15} />
          </a>
        </div>
        <p className="dossier-lead">
          Vacinas são uma parte da história. Explore também compras de
          equipamentos, assistência hospitalar, testagem, coordenação e
          comunicação pública.
        </p>
        <InteractiveTimeline
          label="Linha do tempo da pandemia"
          events={pandemicEvents}
        />
        <section
          className="prevention-topics"
          aria-labelledby="prevention-heading"
        >
          <div className="subsection-heading">
            <div className="eyebrow">
              COMUNICAÇÃO PÚBLICA E MEDIDAS DE PREVENÇÃO
            </div>
            <h3 id="prevention-heading">
              Negacionismo, vacinação, isolamento e máscaras.
            </h3>
            <p>
              Leia os argumentos e confira os episódios na cronologia acima. A
              análise distingue uma declaração, uma decisão administrativa, uma
              alegação falsa e a avaliação feita por entidades científicas.
            </p>
          </div>
          <div className="prevention-grid">
            {preventionTopics.map((topic) => (
              <article className="prevention-card" key={topic.title}>
                <h4>{topic.title}</h4>
                <p>{topic.body}</p>
              </article>
            ))}
          </div>
          <p className="coverage-note">
            O histórico não atribui um número de mortes ou recusas de vacina a
            uma fala isolada. Esses efeitos exigem estudos próprios; aqui, as
            manifestações, decisões e respostas das instituições estão
            documentadas com suas datas.
          </p>
        </section>
        <div className="subsection-heading">
          <div className="eyebrow">ACHADOS DE FISCALIZAÇÃO</div>
          <h3>Falhas apontadas nos documentos</h3>
          <p>
            Cada registro identifica o órgão que fez a avaliação. Não são
            conclusões criminais produzidas por este site.
          </p>
        </div>
        <div className="record-grid">
          {failures.map((item) => (
            <RecordCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
export function AccountabilityDossier() {
  const [query, setQuery] = useState("");
  const visible = cases.filter((c) =>
    `${c.title} ${c.topic} ${c.body}`
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes(
        query
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase(),
      ),
  );
  return (
    <>
      <section id="casos-bolsonaro" className="section wrap">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <FileText size={14} /> PESSOAS, FATOS E SITUAÇÃO DOCUMENTADA
            </div>
            <h2>Registros envolvendo integrantes da família Bolsonaro.</h2>
          </div>
        </div>
        <p className="dossier-lead">
          Seleção inicial de casos públicos. A lista não é exaustiva;
          parentesco, filiação partidária ou vínculo social não estabelecem
          responsabilidade criminal coletiva.
        </p>
        <label className="search case-search">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar casos documentados"
            placeholder="Buscar pessoa ou caso..."
          />
        </label>
        <div className="record-grid">
          {visible.map((item) => (
            <RecordCard key={item.id} item={item} />
          ))}
        </div>
        {!visible.length && (
          <p className="empty">
            Nenhum registro encontrado. Tente o nome da pessoa ou do caso.
          </p>
        )}
      </section>
      <section id="hospitais-rio" className="rio-section">
        <div className="wrap section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">SAÚDE PÚBLICA · RIO DE JANEIRO</div>
              <h2>Hospitais na pandemia: quem administrava?</h2>
            </div>
          </div>
          <p className="dossier-lead">
            Contratos estaduais e federais têm gestores e apurações diferentes.
            Estes registros identificam a esfera responsável antes de discutir
            as suspeitas.
          </p>
          <div className="record-grid">
            {rio.map((item) => (
              <RecordCard key={item.id} item={item} />
            ))}
          </div>
          <aside className="context-note">
            <FileText size={20} />
            <p>
              <strong>Escopo desta versão:</strong> registros históricos com
              datas e fontes. Não é uma certidão atualizada de antecedentes nem
              um levantamento de todas as acusações. Consulte o órgão
              responsável para saber de decisões posteriores.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
