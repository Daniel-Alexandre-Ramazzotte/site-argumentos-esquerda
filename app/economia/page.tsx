import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { IndicatorLibrary } from "@/components/indicator-library";
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
        <IndicatorLibrary scope="Economia" />
      </main>
      <SiteFooter />
    </>
  );
}
