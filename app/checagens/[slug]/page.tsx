import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Check } from "@/data/checks";
import { getRecords } from "@/lib/repository";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { BolsaCalculator } from "@/components/bolsa-calculator";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const checks = await getRecords<Check>("checks");
  return {
    title: `${checks.find((c) => c.slug === slug)?.title ?? "Checagem"} | Brasil em Evidências`,
  };
}
export default async function CheckPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const checks = await getRecords<Check>("checks");
  const check = checks.find((c) => c.slug === slug);
  if (!check) notFound();
  return (
    <>
      <SiteHeader />
      <main className="wrap check-page">
        <Link href="/checagens" className="back-link">
          <ArrowLeft size={16} /> Todas as checagens
        </Link>
        <div className="eyebrow">CHECAGEM · {check.topic.toUpperCase()}</div>
        <h1>{check.title}</h1>
        <div className="verdict">
          <span>{check.verdict}</span>
          <p>{check.date}</p>
        </div>
        <p className="check-summary">{check.summary}</p>
        <article className="check-explanation">
          <h2>O que a evidência mostra</h2>
          <p>{check.explanation}</p>
          {check.calculator && <BolsaCalculator />}
          {check.sections?.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          {check.videos?.map((video) => (
            <figure className="evidence-video" key={video.youtubeId}>
              <h2>{video.title}</h2>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                title={video.title}
                loading="lazy"
                allow="encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <figcaption>{video.description}</figcaption>
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noreferrer"
              >
                Abrir vídeo no YouTube <ArrowUpRight size={16} />
              </a>
            </figure>
          ))}
          <h2>O alcance desta conclusão</h2>
          <p>{check.limit}</p>
          {check.related && (
            <Link
              className="button primary"
              href={`/indicadores/${check.related}`}
            >
              Explorar a série histórica relacionada
              <ArrowRight size={17} />
            </Link>
          )}
        </article>
        <section className="article-references">
          <h2>Referência da checagem</h2>
          <a href={check.url} target="_blank" rel="noreferrer">
            {check.source}
            <ArrowUpRight size={16} />
          </a>
          {check.sources?.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noreferrer"
            >
              {source.label}
              <ArrowUpRight size={16} />
            </a>
          ))}
          <p>
            Conferência editorial em 26/10/2026. O período do esclarecimento
            está identificado acima.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
