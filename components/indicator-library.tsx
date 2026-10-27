"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, ArrowRight, ChartNoAxesCombined } from "lucide-react";
import { indicators } from "@/data/historical";
export function IndicatorLibrary({ scope }: { scope?: string }) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("Todos");
  const normalized = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const items = indicators.filter(
    (i) =>
      (!scope || i.category === scope) &&
      (category === "Todos" || i.category === category) &&
      normalized(i.title + " " + i.description + " " + i.slug).includes(
        normalized(query),
      ),
  );
  return (
    <>
      <div className="toolbar">
        <div className="filters" aria-label="Filtrar indicadores">
          {(scope
            ? ["Todos"]
            : [
                "Todos",
                "Economia",
                "Emprego e renda",
                "Segurança",
                "Educação",
                "Transportes",
              ]
          ).map((c) => (
            <button
              key={c}
              aria-pressed={c === category}
              className={c === category ? "active" : ""}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search">
          <Search size={17} />
          <input
            aria-label="Buscar indicadores"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pobreza, inflação, segurança..."
          />
        </label>
      </div>
      <div className="article-grid">
        {items.map((i) => (
          <article className="article-card" key={i.slug}>
            <div className="card-top">
              <ChartNoAxesCombined size={25} strokeWidth={1.5} />
              <span>{i.category}</span>
            </div>
            <h3>
              <Link href={`/indicadores/${i.slug}`}>{i.title}</Link>
            </h3>
            <p>{i.description}</p>
            <div className="card-range">
              {i.points[0].year} — {i.points.at(-1)!.year} · {i.points.length}{" "}
              observações
            </div>
            <Link className="source-link" href={`/indicadores/${i.slug}`}>
              Ler análise e explorar gráfico
              <ArrowRight size={17} />
            </Link>
          </article>
        ))}
      </div>
      {!items.length && (
        <p className="empty">
          Nenhum indicador encontrado. Tente outra palavra ou selecione “Todos”.
        </p>
      )}
    </>
  );
}
