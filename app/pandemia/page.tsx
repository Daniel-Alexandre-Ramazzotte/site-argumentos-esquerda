import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { PandemicDossier } from "../dossiers";
import Link from "next/link";
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
        <section className="wrap research-card">
          <h2>Mortes evitáveis: o que dizem os estudos?</h2>
          <p>
            Pesquisas e depoimentos de epidemiologistas estimam o efeito de
            respostas alternativas. Compare cenários, períodos e limites, sem
            somar estimativas que se sobrepõem.
          </p>
          <Link href="/pandemia/mortes-evitaveis">
            Explore os estudos e compare os cenários →
          </Link>
        </section>
        <PandemicDossier />
      </main>
      <SiteFooter />
    </>
  );
}
