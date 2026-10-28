import Link from "next/link";
import Doctors from "@/app/saude/medicos/page";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getIndicators } from "@/lib/repository";

import { DatasetExplorer } from "@/components/dataset-explorer";
import { DollarExplorer } from "@/components/dollar-explorer";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const indicators = await getIndicators();
  const i = indicators.find((d) => d.slug === slug);
  return {
    title: `${i?.title ?? "Indicador"} | Brasil em Evidências`,
    description: i?.description,
  };
}
export default async function IndicatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const indicators = await getIndicators();
  const datasets = await getIndicators(slug);
  const indicator = indicators.find((i) => i.slug === slug);
  if (!indicator) notFound();
  if (slug === "medicos") return <Doctors />;
  return (
    <>
      <SiteHeader />
      <main className="wrap indicator-page">
        <Link href="/indicadores" className="back-link">
          <ArrowLeft size={16} />
          Todos os indicadores
        </Link>
        <div className="eyebrow">
          {indicator.category.toUpperCase()} · SÉRIES HISTÓRICAS
        </div>
        <h1>{indicator.title}</h1>
        <p className="page-deck">{indicator.description}</p>
        {slug === "dolar" ? (
          <DollarExplorer datasets={datasets} />
        ) : (
          <DatasetExplorer datasets={datasets} />
        )}
        <section className="related">
          <h2>Continue entendendo o Brasil</h2>
          <div>
            {indicators
              .filter((i) => i.slug !== slug)
              .slice(0, 3)
              .map((i) => (
                <Link key={i.slug} href={`/indicadores/${i.slug}`}>
                  {i.title}
                  <ArrowRight size={17} />
                </Link>
              ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
