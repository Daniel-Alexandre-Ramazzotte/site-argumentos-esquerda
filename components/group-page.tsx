import Link from "next/link";
import { SiteHeader, SiteFooter } from "./site-shell";
import { SeriesComparison } from "./series-comparison";
import { DatasetExplorer } from "./dataset-explorer";
import { getIndicators } from "@/lib/repository";

import { groupHref, type IndicatorGroup } from "@/data/indicator-groups";
export async function GroupPage({
  group,
  children,
}: {
  group: IndicatorGroup;
  children?: React.ReactNode;
}) {
  const all = await getIndicators();
  const data = group.indicators
    .map((slug) => all.find((i) => i.slug === slug)!)
    .filter(Boolean);
  const variants = (
    await Promise.all(group.indicators.map((slug) => getIndicators(slug)))
  ).flat();
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">
          {group.category.toUpperCase()} · INDICADORES RELACIONADOS
        </div>
        <h1>{group.title}.</h1>
        <p className="page-deck">{group.description}</p>
        {children}
        <SeriesComparison
          datasets={data}
          rates={group.rates}
          defaultSlugs={group.defaultSlugs}
        />
        <h2>Detalhes, recortes e fontes de cada série</h2>
        <p>
          Selecione um indicador para consultar valores originais, recortes
          territoriais disponíveis e sua metodologia.
        </p>
        <DatasetExplorer datasets={variants} />
        <Link
          href={groupHref(group).split('/').slice(0,-1).join('/')}
        >
          ← Voltar aos temas
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
