"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, ArrowRight, ChartNoAxesCombined } from "lucide-react";
import type { Indicator } from "@/data/historical";
import { TopicIcon } from "./topic-icon";
import { indicatorGroups, groupHref } from "@/data/indicator-groups";
export function IndicatorLibrary({ scope }: { scope?: string }) {
  const [indicators, setIndicators] = useState<Indicator[]>([]),
    [error, setError] = useState(false),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/indicators", { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setIndicators)
      .catch((e) => {
        if (e.name !== "AbortError") setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("");
  const normalized = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const filtered = indicators.filter(
    (i) =>
      (!scope || i.category === scope) &&
      (!category || i.category === category) &&
      normalized(i.title + " " + i.description + " " + i.slug).includes(
        normalized(query),
      ),
  );
  const seen = new Set<string>();
  const items = filtered.flatMap(i=>{
    const group=indicatorGroups.find(g=>g.indicators.includes(i.slug));
    const key=group?`${group.category}/${group.slug}`:i.slug;
    if(seen.has(key))return [];
    seen.add(key);
    return [{...i,title:group?.title??i.title,description:group?.description??i.description,href:group?groupHref(group):`/indicadores/${i.slug}`,group}];
  });
  return (
    <>
      <div className="toolbar">
        <div className="filters" aria-label="Filtrar indicadores">
          {(scope
            ? []
            : [
                "Economia",
                "Emprego e renda",
                "Segurança",
                "Educação",
                "Transporte",
                "Saúde",
                "População",
              ]
          ).map((c) => (
            <button
              key={c}
              aria-pressed={c === category}
              className={c === category ? "active" : ""}
              onClick={() => setCategory((current) => (current === c ? "" : c))}
            >
              <TopicIcon topic={c} size={17} />
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
              <TopicIcon topic={i.category} size={25} />
              <span>{i.category}</span>
            </div>
            <h3>
              <Link
                  href={i.href}
              >
                {i.title}
              </Link>
            </h3>
            <p>{i.description}</p>
            <div className="card-range">
              {i.group?`${i.group.indicators.length} séries relacionadas`:`${i.points[0].year} — ${i.points.at(-1)!.year} · ${i.points.length} observações`}
            </div>
            <Link
              className="source-link"
              href={i.href}
            >
              Ler análise e explorar gráfico
              <ArrowRight size={17} />
            </Link>
          </article>
        ))}
      </div>
      {loading && <p role="status">Carregando indicadores…</p>}
      {error && (
        <p role="alert">
          Não foi possível consultar os indicadores. Verifique a conexão com o
          banco e recarregue a página.
        </p>
      )}
      {!loading && !error && !items.length && (
        <p className="empty">
          Nenhum indicador encontrado. Tente outra palavra ou clique novamente
          no tema ativo para limpar o filtro.
        </p>
      )}
    </>
  );
}
