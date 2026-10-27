import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { InteractiveTimeline } from "@/components/interactive-timeline";
import { democracyEvents } from "@/data/democracy";
export const metadata = {
  title: "Ameaça à democracia: documentos e cronologia | Brasil em Evidências",
};
export default function Democracy() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="wrap section directory-page">
          <div className="eyebrow">MEMÓRIA PÚBLICA · DOCUMENTOS E DECISÕES</div>
          <h1>Ameaça à democracia.</h1>
          <p className="page-deck">
            Antecedentes do 8 de janeiro, minuta do golpe, plano Punhal Verde e
            Amarelo e respostas institucionais. Selecione os eventos para ler o
            contexto e consultar documentos e reportagens.
          </p>
          <div className="evidence-types">
            <div>
              <strong>Documento</strong>
              <p>O que foi apreendido ou publicado.</p>
            </div>
            <div>
              <strong>Investigação</strong>
              <p>O que os órgãos de apuração concluíram.</p>
            </div>
            <div>
              <strong>Decisão</strong>
              <p>O que foi efetivamente julgado.</p>
            </div>
          </div>
          <InteractiveTimeline
            label="Cronologia dos atos antidemocráticos"
            events={democracyEvents}
          />
          <aside className="context-note">
            <p>
              Acervo inicial de eventos de 2022–2025, conferido em 26/10/2026.
              Não é uma lista exaustiva de todos os fatos, pessoas e processos.
              Autoria e responsabilidade são individuais; filiação partidária ou
              voto não estabelecem culpa.
            </p>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
