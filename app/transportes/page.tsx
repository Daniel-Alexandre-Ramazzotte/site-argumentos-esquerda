import Link from "next/link";
import { ArrowRight, Route, TrainFront, Ship, Plane } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { IndicatorLibrary } from "@/components/indicator-library";
import { TopicGroups } from "@/components/topic-groups";
import { InteractiveTimeline } from "@/components/interactive-timeline";
import { transportEvents } from "@/data/transport-events";
export const metadata = {
  title: "Transporte e infraestrutura | Brasil em Evidências",
};
const modes = [
  {
    title: "Rodovias",
    Icon: Route,
    text: "Construção, pavimentação, duplicação, pontes e manutenção: cada intervenção com sua definição.",
    href: "/transportes/rede",
  },
  {
    title: "Ferrovias",
    Icon: TrainFront,
    text: "Novos trechos, concessões, terminais e carga transportada, com a trajetória das obras.",
    href: "/transportes/movimentacao",
  },
  {
    title: "Portos e hidrovias",
    Icon: Ship,
    text: "Embarcações, contêineres, acessos e navegabilidade, incluindo os requisitos ambientais e sociais.",
    href: "/transportes/rede",
  },
  {
    title: "Aviação",
    Icon: Plane,
    text: "Ampliação de terminais e utilização do transporte aéreo em uma série que começa em 1970.",
    href: "/transportes/movimentacao",
  },
];
export default function TransportPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">INFRAESTRUTURA, CONEXÕES E MOBILIDADE</div>
        <h1>Transporte.</h1>
        <p className="page-deck">
          Como o Brasil amplia e utiliza suas conexões? Consulte séries
          históricas e uma cronologia de obras, distinguindo o que foi
          planejado, contratado, executado e aberto à população.
        </p>
        <div className="axes-grid transport-modes">
          {modes.map((mode) => (
            <Link className="axis-card" href={mode.href} key={mode.title}>
              <mode.Icon size={25} />
              <h2>{mode.title}</h2>
              <p>{mode.text}</p>
              <span>
                Ver indicadores
                <ArrowRight size={17} />
              </span>
            </Link>
          ))}
        </div>
        <section className="transport-guide">
          <h2>O que conta como ampliação?</h2>
          <div className="evidence-types">
            <div>
              <strong>Construção e pavimentação</strong>
              <p>
                Abertura de uma via e aplicação de pavimento em uma estrada
                existente são serviços diferentes. O estoque federal também muda
                com transferências de jurisdição.
              </p>
            </div>
            <div>
              <strong>Duplicação e modernização</strong>
              <p>
                Aumentam capacidade, segurança ou qualidade. Não significam
                necessariamente mais quilômetros de traçado nem podem ser
                somadas como novas estradas.
              </p>
            </div>
            <div>
              <strong>Operação e resultado</strong>
              <p>
                Passageiros, carga e frota ajudam a observar o uso dos modais.
                Aumento de movimento não comprova, sozinho, construção ou efeito
                causal de uma obra.
              </p>
            </div>
          </div>
        </section>
        <section className="transport-history">
          <div className="eyebrow">OBRAS E ETAPAS DOCUMENTADAS</div>
          <h2>Quem começou, quem continuou, o que foi entregue.</h2>
          <p className="dossier-lead">
            Seleção de eventos com fontes e estágio identificado. Projetos podem
            atravessar vários governos; licença, anúncio e inauguração não são
            tratados como equivalentes.
          </p>
          <InteractiveTimeline
            label="Linha do tempo de transporte"
            events={transportEvents}
          />
        </section>
        <section className="transport-indicators">
          <div className="eyebrow">SÉRIES COM DEFINIÇÕES SEPARADAS</div>
          <h2>Veja a evolução de cada modal.</h2>
          <p className="dossier-lead">
            O período disponível está identificado em cada análise. As séries
            nacionais aqui importadas não têm desagregação territorial
            incorporada; isso é diferente dos combustíveis, que já permitem
            estados e regiões.
          </p>
          <TopicGroups category="Transporte" />
        </section>
        <div className="related">
          <h2>Transporte também passa pelo custo de energia.</h2>
          <div>
            <Link href="/indicadores/combustiveis">
              Evolução dos combustíveis
              <ArrowRight size={17} />
            </Link>
            <Link href="/indicadores/dolar">
              Evolução do dólar
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
