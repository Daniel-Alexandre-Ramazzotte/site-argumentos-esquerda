"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Indicator } from "@/data/historical";
import { TimeSeries } from "./time-series";
import { PriceDisplayToggle } from "./price-display-toggle";
import { realIndicator } from "@/data/price-adjustment";
export function DatasetExplorer({ datasets }: { datasets: Indicator[] }) {
  const defaultIndex = Math.max(
    0,
    datasets.findIndex(
      (d) => d.points[0].year <= 1985 && d.points.at(-1)!.year >= 1985,
    ),
  );
  const [datasetIndex, setDatasetIndex] = useState(defaultIndex),
    [real, setReal] = useState(false),
    [level, setLevel] = useState("br"),
    [territory, setTerritory] = useState("br");
  const data = datasets[datasetIndex],
    geos = data.geographies ?? [],
    levels = [
      ...new Set(geos.filter((g) => g.id !== "br").map((g) => g.level)),
    ];
  const options = geos.filter((g) => g.level === level),
    chosen = geos.find((g) => g.id === territory && g.level === level);
  const effective =
    chosen && level !== "br"
      ? {
          ...data,
          points: chosen.points,
          secondary: undefined,
          locationName: chosen.name,
        }
      : { ...data, locationName: "Brasil" };
  const names: Record<string, string> = {
    br: "Brasil",
    region: "Grandes regiões",
    state: "Estados e Distrito Federal",
    area: "Áreas pesquisadas pelo IPCA",
  };
  return (
    <>
      <div className="dataset-controls">
        {datasets.length > 1 && (
          <label>
            <span>Indicador e metodologia</span>
            <select
              aria-label="Indicador e metodologia"
              value={datasetIndex}
              onChange={(e) => {
                setDatasetIndex(Number(e.target.value));
                setLevel("br");
                setTerritory("br");
              }}
            >
              {datasets.map((d, i) => (
                <option value={i} key={d.slug}>
                  {d.seriesName} · {d.points[0].year}–{d.points.at(-1)!.year}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          <span>Visualizar por</span>
          <select
            aria-label="Visualizar por"
            value={level}
            onChange={(e) => {
              const v = e.target.value;
              setLevel(v);
              setTerritory(geos.find((g) => g.level === v)?.id ?? "br");
            }}
          >
            <option value="br">Brasil</option>
            {levels.map((l) => (
              <option value={l} key={l}>
                {names[l] ?? l}
              </option>
            ))}
          </select>
        </label>
        {level !== "br" && (
          <label>
            <span>Escolha a localidade</span>
            <select
              aria-label="Escolha a localidade"
              value={chosen?.id ?? ""}
              onChange={(e) => setTerritory(e.target.value)}
            >
              {options.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      {!levels.length && (
        <p className="coverage-note">
          Esta série está disponível apenas para o Brasil neste acervo.{" "}
          {datasets.some((d) => d.geographies?.length)
            ? "Selecione uma série territorial no campo acima para consultar estados e regiões."
            : "Não exibimos filtros territoriais sem dados compatíveis."}
        </p>
      )}
      <div className="indicator-summary">
        <p>{data.summary}</p>
        <div>
          <strong>{effective.locationName}</strong>
          <span>
            {effective.points[0].year}–{effective.points.at(-1)!.year} ·{" "}
            {effective.unit}
          </span>
        </div>
      </div>
      {data.priceBasis === "nominal-brl" && (
        <PriceDisplayToggle
          real={real}
          onChange={setReal}
          currency={data.slug.startsWith("dolar")}
        />
      )}
      {data.priceBasis === "constant" && (
        <p className="coverage-note">
          Esta série monetária já está em preços constantes, na base indicada na
          unidade. Não aplicamos uma segunda correção pelo IPCA.
        </p>
      )}
      <TimeSeries
        key={`${data.slug}-${effective.locationName}`}
        indicator={
          real && data.priceBasis === "nominal-brl"
            ? realIndicator(effective)
            : effective
        }
      />
      <div className="analysis-layout">
        <article>
          <div className="eyebrow">LEITURA DOS DADOS</div>
          <h2>O que podemos concluir?</h2>
          {data.findings.map((f, i) => (
            <section className="finding" key={f.title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </section>
          ))}
        </article>
        <aside className="method-card">
          <div className="eyebrow">COMO ESTA SÉRIE FOI CONSTRUÍDA</div>
          <h3>Definição e metodologia</h3>
          <p>{data.methodology}</p>
          <h3>Limites da comparação</h3>
          <p>{data.caveat}</p>
        </aside>
      </div>
      <section className="article-references">
        <h2>De onde vêm os números</h2>
        <p>
          O conteúdo e os gráficos estão nesta página. Os documentos permitem
          auditar as séries. Recortes conferidos em 26/10/2026; sem atualização
          automática.
        </p>
        {data.sources.map((s) => (
          <a href={s.url} key={s.url} target="_blank" rel="noreferrer">
            {s.label}
            <ArrowUpRight size={16} />
          </a>
        ))}
      </section>
    </>
  );
}
