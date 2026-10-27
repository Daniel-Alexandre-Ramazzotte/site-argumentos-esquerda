import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { checks } from "@/data/checks";
export function FactChecks() {
  return (
    <div className="check-grid">
      {checks.map((c) => (
        <article className="check-card" key={c.slug}>
          <div className="check-meta">
            <span>
              <ShieldCheck size={15} />
              {c.verdict}
            </span>
            <span>{c.topic}</span>
          </div>
          <h3>
            <Link href={`/checagens/${c.slug}`}>{c.title}</Link>
          </h3>
          <p>{c.summary}</p>
          <Link href={`/checagens/${c.slug}`} className="source-link">
            Entenda a checagem <ArrowRight size={16} />
          </Link>
        </article>
      ))}
    </div>
  );
}
