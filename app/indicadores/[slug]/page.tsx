import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { indicators } from "@/data/historical";
import { indicatorVariants } from "@/data/variants";
import { DatasetExplorer } from "@/components/dataset-explorer";
import { DollarExplorer } from "@/components/dollar-explorer";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
export function generateStaticParams() {
  return indicators.map((i) => ({ slug: i.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
  const indicator = indicators.find((i) => i.slug === slug);
  if (!indicator) notFound();
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
          <DollarExplorer datasets={indicatorVariants(indicator)} />
        ) : (
          <DatasetExplorer datasets={indicatorVariants(indicator)} />
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
