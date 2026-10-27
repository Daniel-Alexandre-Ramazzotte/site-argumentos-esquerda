import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { AccountabilityDossier } from "../dossiers";
import { ArrowUpRight } from "lucide-react";
const records = [
  {
    title: "Mensalão e a participação de integrantes do PL",
    text: "Na AP 470, o STF condenou Valdemar Costa Neto, do PL à época dos fatos, por corrupção passiva e lavagem de dinheiro. A decisão descreve recebimento de recursos indevidos em troca de apoio ao governo federal. A responsabilidade criminal é individual.",
    url: "https://noticias.stf.jus.br/postsnoticias/ap-470-stf-fixa-penas-do-deputado-federal-valdemar-costa-neto/",
  },
  {
    title: "Petrobras e o chamado Petrolão",
    text: "O termo reúne casos diferentes no debate público. É preciso identificar contratos, acusados e decisões de cada processo. A anulação de atos em um caso não invalida automaticamente todos os outros. Este acervo ainda não tem um inventário completo desses processos.",
    url: "https://portal.stf.jus.br/processos/",
  },
  {
    title: "Orçamento secreto e emendas RP 9",
    text: "O STF considerou inconstitucionais as práticas questionadas nas ações sobre emendas de relator. A questão envolve transparência e distribuição de recursos. Isso não equivale, por si só, a condenação criminal de todos os parlamentares por compra de votos.",
    url: "https://portal.stf.jus.br/processos/detalhe.asp?incidente=6492811",
  },
  {
    title: "Anulação dos processos de Lula",
    text: "Em 2021, o STF reconheceu a incompetência da 13ª Vara Federal de Curitiba e anulou atos decisórios nos processos abrangidos. Em decisão distinta, reconheceu a suspeição de Sergio Moro no caso do triplex. Anulação não é absolvição de mérito; condenação anulada não é condenação válida.",
    url: "https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=468086&ori=1",
  },
];
export const metadata = {
  title: "Justiça e corrupção: casos e decisões | Brasil em Evidências",
};
export default function Justice() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="wrap section directory-page">
          <div className="eyebrow">DOCUMENTOS E DECISÕES</div>
          <h1>Corrupção, processos e desfechos.</h1>
          <p className="page-deck">
            Acusação, condenação, anulação e absolvição têm significados
            diferentes. Entenda cada registro e o alcance da decisão.
          </p>
          <div className="record-grid">
            {records.map((r) => (
              <article className="record-card" key={r.title}>
                <h2>{r.title}</h2>
                <p>{r.text}</p>
                <details>
                  <summary>Referência documental</summary>
                  <a
                    className="text-link"
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Consultar registro do STF
                    <ArrowUpRight size={15} />
                  </a>
                </details>
              </article>
            ))}
          </div>
          <aside className="context-note">
            <p>
              “Sempre houve compra de votos” é uma generalização. Negociação
              política e execução de emendas não demonstram, por si sós,
              corrupção. Imputações criminais exigem exame individual.
            </p>
          </aside>
        </section>
        <AccountabilityDossier />
      </main>
      <SiteFooter />
    </>
  );
}
