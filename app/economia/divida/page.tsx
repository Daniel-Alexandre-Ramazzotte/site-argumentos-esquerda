import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { SeriesComparison } from "@/components/series-comparison";
import { DatasetExplorer } from "@/components/dataset-explorer";
import { getIndicators } from "@/lib/repository";
export const metadata = {
  title: "Dívida interna e externa do Brasil | Brasil em Evidências",
};
export default async function DebtPage() {
  const internal = await getIndicators("divida-interna"),
    external = await getIndicators("divida-externa");
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">ECONOMIA · ESTOQUES, ATIVOS E PASSIVOS</div>
        <h1>Dívida interna e externa.</h1>
        <p className="page-deck">
          Quanto o governo deve, a quem deve e quais ativos entram na conta?
          Compare as duas parcelas líquidas no mesmo recorte: governo federal e
          Banco Central.
        </p>
        <section className="method-grid">
          <article>
            <h3>Interna ou externa?</h3>
            <p>
              A classificação usa a residência do credor. Não basta olhar se a
              obrigação é denominada em reais ou dólares.
            </p>
          </article>
          <article>
            <h3>Por que a externa pode ser negativa?</h3>
            <p>
              Na dívida líquida, ativos são descontados dos passivos. Saldo
              negativo significa posição credora líquida nesse recorte, sem
              eliminar a dívida bruta.
            </p>
          </article>
          <article>
            <h3>O PIB e o câmbio importam</h3>
            <p>
              Uma relação dívida/PIB muda com o numerador e o denominador.
              Câmbio, juros e ativos externos influenciam a série; a faixa
              presidencial não prova uma causa.
            </p>
          </article>
        </section>
        <h2>Governo federal e Banco Central</h2>
        <SeriesComparison datasets={[internal[0], external[0]]} />
        <DatasetExplorer datasets={[...internal, ...external]} />
        <section className="method-grid">
          <article>
            <h3>Dívida bruta do governo geral</h3>
            <p>
              Outro indicador: abrange União, estados e municípios e não
              desconta ativos como a medida líquida.
            </p>
            <Link href="/indicadores/divida-bruta">Ver a série da DBGG →</Link>
          </article>
          <article>
            <h3>Dívida externa do país</h3>
            <p>
              Inclui obrigações públicas e privadas. A série em dólares
              correntes não é equivalente à dívida líquida federal.
            </p>
            <Link href="/indicadores/divida-externa-total">
              Ver dívida externa total →
            </Link>
          </article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
