import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { IndicatorLibrary } from "@/components/indicator-library";
export const metadata = { title: "Emprego e renda | Brasil em Evidências" };
export default function Employment() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">TRABALHO, RENDA E ESTRUTURA PRODUTIVA</div>
        <h1>Emprego e renda.</h1>
        <p className="page-deck">
          Desemprego, pobreza e industrialização contam partes diferentes da
          história. Explore as subpáginas e selecione estados e regiões nas
          séries que oferecem esses recortes.
        </p>
        <IndicatorLibrary scope="Emprego e renda" />
      </main>
      <SiteFooter />
    </>
  );
}
