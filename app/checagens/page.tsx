import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { FactChecks } from "@/components/fact-checks";
export const metadata = {
  title: "Checagem de fake news | Brasil em Evidências",
};
export default function Checks() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">ALEGAÇÃO, EVIDÊNCIA E CONCLUSÃO</div>
        <h1>Checagem de fake news.</h1>
        <p className="page-deck">
          Leia a alegação, entenda o que a evidência permite concluir e confira
          os limites. Cada checagem tem uma página própria.
        </p>
        <FactChecks />
        <aside className="context-note">
          <p>
            Vereditos se aplicam à frase e ao período identificados. Perguntas
            conceituais e alegações em circulação são identificadas no texto;
            não atribuímos autoria ou alcance sem comprovação.
          </p>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
