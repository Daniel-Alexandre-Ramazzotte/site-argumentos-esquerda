import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { IndicatorLibrary } from "@/components/indicator-library";
import Link from "next/link";
import { TopicGroups } from "@/components/topic-groups";
export const metadata = { title: "Economia | Brasil em Evidências" };
export default function EconomyPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">PREÇOS, CÂMBIO E PODER DE COMPRA</div>
        <h1>Economia.</h1>
        <p className="page-deck">
          Inflação, alimentos, combustíveis e dólar, com gráficos históricos,
          períodos selecionáveis e metodologia. Compare a mesma unidade e o
          mesmo conceito ao longo do tempo.
        </p>
        <section className="method-grid">
          <article>
            <h3>Dívida interna e externa</h3>
            <p>
              Estoques, ativos e passivos, em reais e em relação ao PIB. Entenda
              os diferentes recortes de dívida.
            </p>
            <Link href="/economia/divida">Explore a dívida brasileira →</Link>
          </article>
          <article>
            <h3>Para onde vai o orçamento?</h3>
            <p>
              Fatias da execução federal por função, ano e etapa da despesa.
            </p>
            <Link href="/economia/orcamento">
              Veja as fatias do orçamento →
            </Link>
          </article>
          <article>
            <h3>Juros e dívida das famílias</h3>
            <p>
              Selic, juros do crédito, endividamento e comprometimento da renda
              são conceitos distintos.
            </p>
            <Link href="/indicadores/divida-familias">
              Consulte o endividamento →
            </Link>
          </article>
        </section>
        <TopicGroups category="Economia" />
      </main>
      <SiteFooter />
    </>
  );
}
