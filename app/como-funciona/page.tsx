import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
export const metadata = {
  title: "Como funciona a política brasileira | Brasil em Evidências",
};
const topics = [
  {
    name: "Presidente e Executivo federal",
    body: "O presidente dirige a administração federal com os ministros, executa políticas e o orçamento, apresenta propostas de lei e de orçamento, sanciona ou veta leis e exerce competências constitucionais em relações exteriores e defesa. Nomeações e atos devem respeitar limites legais, controles e, em alguns casos, aprovação do Senado. Um decreto não permite substituir qualquer lei.",
    source: "Constituição, arts. 76, 84 e 165",
  },
  {
    name: "Congresso Nacional",
    body: "Câmara e Senado discutem e aprovam leis e o orçamento, fiscalizam o Executivo e exercem competências próprias. Uma promessa presidencial que depende de lei ou de despesa autorizada exige articulação com o Congresso. O presidente pode vetar projetos, e o Congresso pode apreciar e derrubar vetos.",
    source: "Constituição, arts. 44–52, 66 e 166",
  },
  {
    name: "Judiciário e órgãos de controle",
    body: "O Judiciário resolve conflitos e controla a constitucionalidade nos processos de sua competência. O Ministério Público exerce funções próprias e não é subordinado ao presidente. O controle externo federal cabe ao Congresso com auxílio do TCU; o Executivo também possui controles internos.",
    source: "Constituição, arts. 70–74, 92, 102 e 127–129",
  },
  {
    name: "Saúde: o SUS é compartilhado",
    body: "União, estados e municípios têm responsabilidades na saúde. A direção nacional coordena sistemas e políticas; estados articulam redes regionais; municípios organizam e executam muitos serviços locais. O financiamento é compartilhado. Nem todo hospital é federal, e uma obra pode ser paga por um ente e executada por outro.",
    source: "Constituição, arts. 23 e 196–200; Lei 8.080, arts. 16–18",
  },
  {
    name: "Educação: redes distintas",
    body: "A União mantém seu sistema federal e exerce funções redistributiva e supletiva. Municípios atuam prioritariamente na educação infantil e no ensino fundamental; estados e Distrito Federal, no fundamental e médio. Há colaboração entre os sistemas. Resultados escolares não dependem exclusivamente da Presidência.",
    source: "Constituição, art. 211",
  },
  {
    name: "Segurança: responsabilidades diferentes",
    body: "Polícia Federal e Polícia Rodoviária Federal têm competências federais. Polícias civis, militares e penais estaduais têm atribuições próprias e se vinculam aos governos estaduais nos termos constitucionais. Municípios podem manter guardas conforme a lei. Investigar um crime estadual não é tarefa automática do presidente.",
    source: "Constituição, art. 144",
  },
];
export default function Politics() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">GUIA PARA COBRAR DE QUEM DECIDE</div>
        <h1>Como o Brasil funciona.</h1>
        <p className="page-deck">
          O presidente tem poder e responsabilidade, mas governa dentro de uma
          federação e da separação entre Poderes. Entender quem propõe, aprova,
          financia e executa ajuda a avaliar políticas e promessas.
        </p>
        <div className="civic-topics">
          {topics.map((topic, i) => (
            <details key={topic.name} open={i === 0}>
              <summary>{topic.name}</summary>
              <p>{topic.body}</p>
              <small>{topic.source}</small>
            </details>
          ))}
        </div>
        <h2>Do plano ao pagamento</h2>
        <ol className="civic-budget">
          <li>
            <strong>PPA:</strong> planejamento plurianual de diretrizes,
            objetivos e metas.
          </li>
          <li>
            <strong>LDO:</strong> prioridades e regras que orientam a elaboração
            do orçamento anual.
          </li>
          <li>
            <strong>LOA:</strong> estima receitas e fixa despesas do exercício,
            após tramitação e aprovação.
          </li>
          <li>
            <strong>Execução:</strong> empenho, liquidação e pagamento;
            contingenciamentos, vinculações e regras fiscais limitam decisões.
          </li>
          <li>
            <strong>Fiscalização:</strong> prestação de contas e controles
            internos, legislativos e dos tribunais de contas.
          </li>
        </ol>
        <section className="method-grid">
          <article>
            <h3>O presidente decide a Selic?</h3>
            <p>
              A meta Selic é deliberada pelo Copom, no Banco Central. Política
              fiscal, expectativas e condições internacionais podem influenciar
              a economia, mas a taxa não é um decreto presidencial.
            </p>
            <Link href="/indicadores/juros">Explore a série de juros →</Link>
          </article>
          <article>
            <h3>Quem construiu uma unidade?</h3>
            <p>
              Para atribuir uma entrega, verifique proposta, financiamento,
              início, conclusão e entrada em operação. Diferentes governos e
              entes podem participar dessas etapas.
            </p>
            <Link href="/saude/infraestrutura">
              Veja o caso da infraestrutura de saúde →
            </Link>
          </article>
        </section>
        <h2>Fontes e limites</h2>
        <p>
          Guia introdutório: não substitui a leitura das competências e exceções
          legais.{" "}
          <a
            href="https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html"
            target="_blank"
            rel="noreferrer"
          >
            Constituição Federal atualizada · Câmara
          </a>
          ;{" "}
          <a
            href="https://www2.camara.leg.br/legin/fed/lei/1990/lei-8080-19-setembro-1990-365093-normaatualizada-pl.html"
            target="_blank"
            rel="noreferrer"
          >
            Lei Orgânica da Saúde · arts. 16–18
          </a>
          ;{" "}
          <a
            href="https://www.bcb.gov.br/controleinflacao/taxaselic"
            target="_blank"
            rel="noreferrer"
          >
            BCB · taxa Selic
          </a>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
