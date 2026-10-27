import type { Check } from "./checks";
export const expandedChecks: Check[] = [
  {
    slug: "enchentes-rio-grande-do-sul",
    title:
      "O governo federal abandonou o Rio Grande do Sul nas catástrofes climáticas?",
    verdict: "A ausência total é refutada",
    topic: "Desastres climáticos",
    date: "Enchentes de 2024 · balanço até março de 2026",
    summary:
      "Há ações e pagamentos federais documentados. Isso contradiz a ideia de ausência total de ajuda; não demonstra que toda necessidade foi atendida nem impede avaliar demora, alcance ou insuficiência da resposta.",
    explanation:
      "O Auxílio Reconstrução foi uma das medidas de apoio. No balanço federal até março de 2026, 430 mil famílias haviam sido beneficiadas, com R$ 2,2 bilhões em repasses. Não se deve somar indiscriminadamente transferências, crédito, renúncia fiscal e anúncios para apresentar tudo como dinheiro já pago.",
    limit:
      "“Abandono” pode expressar uma avaliação sobre suficiência ou execução. A pergunta precisa separar essa avaliação da alegação verificável de que não houve ação federal. O balanço citado é informação do Executivo, que deve ser confrontada com execução e controles independentes.",
    source: "Secom · balanço de apoio ao RS, abril de 2026",
    url: "https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2026/04/dois-anos-apos-enchentes-governo-do-brasil-avanca-nas-acoes-de-reconstrucao-do-rio-grande-do-sul-3",
    related: null,
    sections: [
      {
        title: "Auxílio, reconstrução e crédito são coisas diferentes",
        body: "Pagamento a uma família, contratação de moradia e oferta de financiamento têm efeitos e estágios distintos. O painel deve identificar a modalidade e o período, sem transformar anúncios em execução.",
      },
      {
        title: "Como avaliar criticamente a resposta",
        body: "Compare quantas famílias e municípios precisavam de atendimento, o prazo de cada ação e os valores efetivamente pagos. A existência de ajuda não encerra o debate sobre sua qualidade.",
      },
    ],
    sources: [
      {
        label: "CGU · prestação de contas e fiscalização das ações de 2024",
        url: "https://www.gov.br/cgu/pt-br/assuntos/noticias/2024/04/cgu-divulga-prestacao-de-contas-do-presidente-da-republica-de-2023/PCPR2024___Final.pdf",
      },
    ],
  },
  {
    slug: "aborto",
    title: "Lula quer liberar o aborto?",
    verdict: "É preciso identificar a proposta",
    topic: "Direitos e legislação",
    date: "Legislação e declarações são planos distintos",
    summary:
      "Garantir atendimento nas hipóteses já previstas em lei não equivale a legalizar o aborto em qualquer situação. Afirmar uma intenção do presidente exige uma declaração ou proposta datada e seu contexto.",
    explanation:
      "O art. 128 do Código Penal prevê hipóteses de aborto não punido quando praticado por médico, como risco à vida da gestante e gravidez decorrente de estupro. Há também a decisão do STF sobre anencefalia. Essas regras não foram criadas pelo governo atual.",
    limit:
      "Esta página não presume uma intenção íntima de Lula nem dá um veredito geral sobre toda declaração passada ou futura. Uma proposta concreta precisa ser identificada para verificar seu conteúdo e tramitação.",
    source: "Planalto · Código Penal, artigo 128",
    url: "https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm",
    related: null,
    videos: [
      {
        title:
          "Discurso de Bolsonaro sobre controle de natalidade · 13/07/2006",
        youtubeId: "MDCmI1sFibQ",
        description:
          "Registro de aproximadamente cinco minutos publicado pelo Poder360 a partir do acervo da TV Câmara. A referência a abortos aos oito meses trata da China; a proposta defendida para o Brasil, no discurso, é facilitar laqueadura e vasectomia.",
      },
    ],
    sections: [
      {
        title: "Atendimento legal não é mudança geral da lei",
        body: "Normas de organização dos serviços de saúde devem ser distinguidas de alterações das hipóteses legais. A discussão política e moral também não substitui a leitura do ato normativo.",
      },
      {
        title: "O vídeo de Bolsonaro e a referência aos oito meses",
        body: "No discurso de 13 de julho de 2006, Bolsonaro citou práticas que atribuía à China, incluindo aborto em gestação de oito meses, ao discutir crescimento populacional. Na sequência, defendeu facilitar laqueadura e vasectomia no Brasil. O recorte que junta essas frases para apresentá-lo como defensor de aborto aos oito meses omite esse contexto. A transcrição não sustenta a descrição de uma proposta de aborto para ‘limpeza populacional’ no Brasil.",
      },
      {
        title: "O discurso de 1992 também precisa de contexto",
        body: "Em 3 de abril de 1992, Bolsonaro associou pobreza e crescimento populacional e defendeu acesso a esterilização, além de citar uma reportagem sobre pílulas abortivas na China. Essas posições podem ser examinadas criticamente, mas mencionar o caso chinês não equivale a propor distribuir pílulas abortivas no Brasil. O histórico de Bolsonaro também não comprova, por si só, uma proposta de Lula: cada alegação precisa de evidência própria.",
      },
    ],
    sources: [
      {
        label: "Ministério da Saúde · interrupção gestacional prevista em lei",
        url: "https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-sexual-e-reprodutiva/interrupcao-gestacional-prevista-em-lei/interrupcao-gestacional-prevista-em-lei",
      },
      {
        label:
          "Câmara · transcrição do discurso de 13/07/2006 (cópia preservada pelo Poder360)",
        url: "https://static.poder360.com.br/2024/06/Discurso-JAIR-BOLSONARO-13jul2006.pdf",
      },
      {
        label: "Câmara · Diário de 04/04/1992, discurso da sessão anterior",
        url: "https://imagem.camara.gov.br/Imagem/d/pdf/DCD04ABR1992.pdf",
      },
      {
        label:
          "Comprova/CNN · checagem dos recortes e contexto dos dois discursos",
        url: "https://www.cnnbrasil.com.br/nacional/video-engana-ao-usar-discurso-de-bolsonaro-para-sugerir-que-ele-defende-aborto/",
      },
    ],
  },
  {
    slug: "comunismo",
    title: "Lula e o PT são comunistas?",
    verdict: "Rótulo exige definição",
    topic: "Política e economia",
    date: "Programa partidário e funcionamento institucional",
    summary:
      "O PT declara o socialismo democrático como objetivo em seus documentos. Isso não permite concluir automaticamente que os governos Lula aboliram a propriedade privada ou implantaram uma economia comunista.",
    explanation:
      "A Constituição mantém a livre iniciativa e a propriedade privada entre os princípios da ordem econômica. Programas redistributivos, empresas estatais, tributação e regulação podem existir em economias de mercado; sua existência não prova, por si só, a implantação do comunismo.",
    limit:
      "“Comunista” pode ser usado como identidade ideológica, categoria histórica ou acusação retórica. É preciso definir o sentido e examinar atos concretos, sem esconder o programa declarado do partido.",
    source: "PT · estrutura partidária e referência ao estatuto",
    url: "https://pt.org.br/estrutura-partidaria/",
    related: null,
    sections: [
      {
        title: "Autodefinição e política executada",
        body: "Um objetivo programático não é uma descrição automática de todas as medidas adotadas no governo. O julgamento deve identificar quais instituições, regras e relações de propriedade efetivamente mudaram.",
      },
    ],
    sources: [
      {
        label: "Constituição Federal · artigos 1º e 170",
        url: "https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm",
      },
    ],
  },
  {
    slug: "empresarios",
    title: "Lula é contra o empresário?",
    verdict: "Avaliação política, não fato binário",
    topic: "Empresas e economia",
    date: "Políticas e resultados com datas identificadas",
    summary:
      "A afirmação generaliza empresas muito diferentes. Para avaliá-la, é mais útil examinar lucro, investimento, crédito, tributação e políticas para pequenos negócios, sem atribuir todo resultado ao presidente.",
    explanation:
      "O Itaú informou resultado recorrente gerencial de R$ 41,4 bilhões em 2024. Esse exemplo mostra atividade empresarial e lucro sob o governo, mas não representa todas as empresas nem prova que o governo causou o resultado. Setores e portes enfrentam condições distintas.",
    limit:
      "Um exemplo de banco não resume o ambiente de todos os empresários. Lucro nominal, lucro real, lucro contábil e resultado recorrente não devem ser misturados.",
    source: "Itaú · resultado recorrente gerencial de 2024",
    url: "https://www.itau.com.br/imprensa",
    related: "industrializacao",
    sections: [
      {
        title: "Galípolo e o mandato do Banco Central",
        body: "Indicado por Lula e aprovado pelo Senado, Gabriel Galípolo assumiu mandato de 2025–2028. Mandato fixo e autonomia institucional são regras verificáveis; chamar toda decisão de “técnica” é uma avaliação. A autonomia foi estabelecida pela LC 179/2021, anterior ao terceiro mandato de Lula.",
      },
      {
        title: "MEIs: diferencie anúncio, projeto e lei",
        body: "A Câmara registrou em outubro de 2026 a sanção de medida que ampliou o limite do MEI e perdoou débitos abrangidos pela lei. O alcance precisa ser conferido no texto legal; isso não equivale ao perdão de qualquer dívida empresarial, inclusive bancária.",
      },
      {
        title: "Como comparar resultados de empresas",
        body: "Há também exemplos industriais: a WEG informou lucro líquido de cerca de R$ 6,04 bilhões em 2024. É um conceito diferente do resultado recorrente gerencial do Itaú; não os somamos como se fossem uma medida homogênea de lucro empresarial. Compare o mesmo conceito, período e porte, considerando juros, câmbio, demanda, tributos e estratégia.",
      },
    ],
    sources: [
      {
        label: "Senado · aprovação de Galípolo e duração do mandato",
        url: "https://www12.senado.leg.br/institucional/presidencia/noticia/rodrigo-pacheco/senado-federal-aprova-a-indicacao-de-gabriel-galipolo-para-a-presidencia-do-banco-central",
      },
      {
        label: "WEG · apresentação para investidores, resultado de 2024",
        url: "https://api.mziq.com/mzfilemanager/v2/d/50c1bd3e-8ac6-42d9-884f-b9d69f690602/0262d686-b1f8-36ec-fc9f-60844a227ce9?origin=1",
      },
      {
        label: "Câmara · sanção e medidas para MEIs, outubro de 2026",
        url: "https://www.camara.leg.br/noticias/1312795-motta-comemora-sancao-de-novo-limite-de-mei-e-o-perdao-de-dividas-de-microempreendedores",
      },
      {
        label: "Planalto · LC 179/2021, autonomia do Banco Central",
        url: "https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp179.htm",
      },
    ],
  },
  {
    slug: "financiamento-bolsa-familia",
    title: "Você paga o Bolsa Família?",
    verdict: "Financiamento coletivo",
    topic: "Renda e proteção social",
    date: "Simulação com referências fiscais de 2025",
    summary:
      "O programa é financiado pelo orçamento público. Isso não significa que exista uma cobrança individual identificável para ele. Beneficiários também pagam tributos, inclusive quando consomem.",
    explanation:
      "A simulação abaixo dimensiona um rateio proporcional sob hipóteses explícitas. Não transforma salário em imposto real nem afirma que uma parcela fixa do imposto de cada pessoa seja vinculada ao Bolsa Família.",
    limit:
      "As faixas são exemplos de renda, não estimativas observadas de carga tributária. O resultado não é uma contribuição individual exata nem uma cobrança adicional.",
    source: "Planalto · Lei 14.601/2023, Programa Bolsa Família",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14601.htm",
    related: "pobreza",
    calculator: true,
    sections: [
      {
        title: "Consumo e circulação de renda",
        body: "Famílias de baixa renda usam transferências para necessidades cotidianas, movimentando comércio e serviços. Estudo do Ipea publicado em 2013 estimou multiplicador de PIB de 1,78 para o Bolsa Família, usando uma matriz de 2009. É resultado de modelo e período específicos, não uma garantia de retorno fixo em 2025 ou 2026.",
      },
      {
        title: "Vacinação, saúde e escola",
        body: "A lei prevê acompanhamento pré-natal, vacinação, estado nutricional e frequência escolar. A exigência e o acompanhamento buscam ampliar acesso a direitos. A existência dessas regras não é, sozinha, uma estimativa causal de quanto a vacinação ou a aprendizagem melhoraram.",
      },
      {
        title: "Produção local e compra de alimentos",
        body: "O consumo pode favorecer o comércio local. Porém, não há regra geral que obrigue o beneficiário a comprar apenas de produtores locais. Compras públicas diretas da agricultura familiar são instrumentos de programas como PAA e alimentação escolar; não devem ser contabilizadas como se fossem a própria transferência do Bolsa Família.",
      },
    ],
    sources: [
      {
        label:
          "Ipea · efeitos multiplicadores, estudo de 2013 com matriz de 2009",
        url: "https://www.ipea.gov.br/agencia/images/stories/PDFs/131015_bolsa_familia_grafico.pdf",
      },
      {
        label: "MDS · condicionalidades de saúde e educação",
        url: "https://www.gov.br/mds/pt-br/acoes-e-programas/bolsa-familia/conheca-as-regras",
      },
      {
        label: "MDS · Programa de Aquisição de Alimentos, instrumento distinto",
        url: "https://www.gov.br/mds/pt-br/acoes-e-programas/acesso-a-alimentos-e-a-agua/programa-de-aquisicao-de-alimentos",
      },
    ],
  },
];
