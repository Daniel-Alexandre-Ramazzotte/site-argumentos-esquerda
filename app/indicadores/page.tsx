import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { ThemeCards } from "@/components/new-axes";
export const metadata = {
  title: "Brasil em Perspectiva | Brasil em Evidências",
};
export default function Indicators() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">BRASIL EM PERSPECTIVA</div>
        <h1>Brasil em Perspectiva.</h1>
        <p className="page-deck">
          Análises completas, séries históricas e gráficos interativos. Um tema
          por página, com o contexto necessário para interpretar os números.
        </p>
        <ThemeCards />
      </main>
      <SiteFooter />
    </>
  );
}
