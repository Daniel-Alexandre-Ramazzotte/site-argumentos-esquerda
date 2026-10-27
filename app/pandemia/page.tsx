import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { PandemicDossier } from "../dossiers";
export const metadata = {
  title: "Pandemia: cronologia e resposta pública | Brasil em Evidências",
};
export default function Pandemic() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="wrap section directory-page">
          <div className="eyebrow">DOSSIÊ ESPECIAL · COVID-19</div>
          <h1>A pandemia e as decisões públicas.</h1>
          <p className="page-deck">
            O choque global, o ponto de partida e a resposta de cada esfera de
            governo precisam ser examinados separadamente. A cronologia reúne
            equipamentos, assistência hospitalar, vacinas e comunicação pública.
          </p>
        </div>
        <PandemicDossier />
      </main>
      <SiteFooter />
    </>
  );
}
