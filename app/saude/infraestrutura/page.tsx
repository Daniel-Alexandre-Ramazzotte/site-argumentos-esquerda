import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { DatasetExplorer } from "@/components/dataset-explorer";
import { getIndicator } from "@/lib/repository";
export const metadata = {
  title: "Hospitais, UBS, UPAs e obras | Brasil em Evidências",
};
export default async function Infrastructure() {
  const upa = (await getIndicator("upas"))!;
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">SAÚDE · REDE E CONSTRUÇÃO</div>
        <h1>Hospitais, UBS e UPAs.</h1>
        <p className="page-deck">
          Obra selecionada, construção concluída, estabelecimento cadastrado e
          serviço funcionando são marcos diferentes. Esta página identifica
          quais dados estão disponíveis e quais não podem ser tratados como
          entregas.
        </p>
        <DatasetExplorer datasets={[upa]} />
        <section className="method-grid">
          <article>
            <h3>Hospitais e leitos</h3>
            <p>
              O CNES registra estabelecimentos e capacidade assistencial. Contar
              hospitais cadastrados não revela a data de construção; uma unidade
              pode ter sido reformada, recadastrada ou ter mudado de gestão.
            </p>
            <Link href="/indicadores/leitos-hospitalares">
              Ver a série de leitos por habitante →
            </Link>
            <p>
              <a href="https://datasus.saude.gov.br/cnes-estabelecimentos/">
                Fonte: CNES/Datasus
              </a>
            </p>
          </article>
          <article>
            <h3>UBS e obras concluídas</h3>
            <p>
              O Sismob permite acompanhar obras com transferências federais.
              Ainda não há aqui uma série histórica harmonizada de UBS
              construídas por ano: contratos, ampliações e reformas não serão
              contados como novas unidades.
            </p>
            <a href="https://sismobcidadao.saude.gov.br/">
              Consultar o registro oficial de obras →
            </a>
          </article>
          <article>
            <h3>Financiar e executar</h3>
            <p>
              Uma obra pode receber verba federal, ser executada pelo município
              e entrar em operação em outro mandato. A atribuição exige
              cronologia completa, sem transformar anúncios em entregas.
            </p>
            <a href="https://portalfns.saude.gov.br/sistemas/sismob/">
              Fundo Nacional de Saúde · método Sismob →
            </a>
          </article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
