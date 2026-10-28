import { getRecords } from "@/lib/repository";
import type { Poll } from "@/data/polls";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { PollsDashboard } from "@/components/polls-dashboard";
export const metadata = {
  title:
    "Pesquisas eleitorais: evolução e fichas técnicas | Brasil em Evidências",
};
export default async function Polls() {
  const polls = await getRecords<Poll>("polls");
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">
          CENÁRIOS COMPARÁVEIS · METODOLOGIA À VISTA
        </div>
        <h1>Pesquisas eleitorais.</h1>
        <p className="page-deck">
          Percentuais contam apenas parte da história. Consulte o campo, a
          amostra, os métodos, os registros informados e as margens declaradas
          de cada levantamento.
        </p>
        <PollsDashboard polls={polls} />
      </main>
      <SiteFooter />
    </>
  );
}
