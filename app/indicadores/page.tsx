import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { IndicatorLibrary } from "@/components/indicator-library";
export const metadata = {
  title: "Entenda os indicadores | Brasil em Evidências",
};
export default function Indicators() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">BRASIL EM PERSPECTIVA</div>
        <h1>Entenda os indicadores.</h1>
        <p className="page-deck">
          Análises completas, séries históricas e gráficos interativos. Um tema
          por página, com o contexto necessário para interpretar os números.
        </p>
        <IndicatorLibrary />
      </main>
      <SiteFooter />
    </>
  );
}
