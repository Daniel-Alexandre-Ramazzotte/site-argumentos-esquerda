import Link from "next/link";
import { SiteHeader, SiteFooter } from "./site-shell";
import { IndicatorLibrary } from "./indicator-library";
export function TopicDirectory({
  title,
  eyebrow,
  description,
  scope,
  children,
}: {
  title: string;
  eyebrow: string;
  description: string;
  scope: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}.</h1>
        <p className="page-deck">{description}</p>
        {children}
        <IndicatorLibrary scope={scope} />
        <div className="related-links">
          <Link href="/como-funciona">Quem faz o quê no poder público? →</Link>
          <Link href="/economia/orcamento">
            Explore as fatias do orçamento federal →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
