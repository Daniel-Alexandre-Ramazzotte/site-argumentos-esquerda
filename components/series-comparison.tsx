"use client";
import { useId, useState } from "react";
import { PriceDisplayToggle } from "./price-display-toggle";
import { usePrices } from "./database-data";
import { formatValue, governments, type Indicator } from "@/data/historical";
const colors = ["#26805d", "#aa651b", "#7771cc", "#2586a5", "#c55368"];
export function SeriesComparison({
  datasets: inputDatasets,
  rates = [],
  defaultSlugs,
}: {
  datasets: Indicator[];
  rates?: string[];
  defaultSlugs?: string[];
}) {
  const { realIndicator } = usePrices();
  const id = useId();
  const [real, setReal] = useState(false);
  const datasets = inputDatasets.map((d) => (real ? realIndicator(d) : d));
  const years = [
    ...new Set(datasets.flatMap((d) => d.points.map((p) => p.year))),
  ].sort((a, b) => a - b);
  const [enabled, setEnabled] = useState(
      defaultSlugs ?? datasets.map((d) => d.slug),
    ),
    [start, setStart] = useState(years.find((y) => y >= 1985) ?? years[0]),
    [end, setEnd] = useState(years.at(-1)!),
    [shade, setShade] = useState(true);
  const active = datasets.filter((d) => enabled.includes(d.slug));
  const mixed = new Set(active.map((d) => d.unit)).size > 1;
  const units = [...new Set(active.map((d) => d.unit))];
  const indexed =
    units.length > 2 || (mixed && active.some((d) => rates.includes(d.slug)));
  const levels = active.filter((d) => !rates.includes(d.slug));
  const commonYear = years.find(
    (y) =>
      y >= start &&
      y <= end &&
      levels.every((d) => d.points.some((p) => p.year === y && p.value > 0)),
  );
  const lines = active.map((d) => {
    const right = indexed ? rates.includes(d.slug) : d.unit !== units[0];
    const base = d.points.find((p) => p.year === commonYear);
    const points = d.points
      .filter((p) => p.year >= start && p.year <= end)
      .map((p) => ({
        ...p,
        value:
          indexed && !right
            ? base && base.value > 0
              ? (p.value / base.value) * 100
              : NaN
            : p.value,
        original: p.value,
      }))
      .filter((p) => Number.isFinite(p.value));
    return {
      ...d,
      right,
      points,
      color:
        colors[datasets.findIndex((s) => s.slug === d.slug) % colors.length],
    };
  });
  const bounds = (right: boolean) => {
    const vs = lines
      .filter((d) => d.right === right)
      .flatMap((d) => d.points.map((p) => p.value));
    const lo = Math.min(0, ...vs),
      hi = Math.max(0, ...vs);
    return [lo, hi === lo ? lo + 1 : hi];
  };
  const leftBounds = bounds(false),
    rightBounds = bounds(true);
  const x = (year: number) =>
    70 + ((year - start) / Math.max(1, end - start)) * 850;
  const y = (v: number, right: boolean) => {
    const [lo, hi] = right ? rightBounds : leftBounds;
    return 340 - ((v - lo) / (hi - lo)) * 265;
  };
  const labelLeft = indexed
    ? `Índice ${commonYear ?? "sem base comum"} = 100`
    : (units[0] ?? "");
  const labelRight = indexed ? "Crescimento · % ao ano" : (units[1] ?? "");
  const csv = [
    "ano;" + active.map((d) => `${d.seriesName} (${d.unit})`).join(";"),
    ...years
      .filter((y) => y >= start && y <= end)
      .map(
        (y) =>
          `${y};` +
          active
            .map(
              (d) =>
                d.points
                  .find((p) => p.year === y)
                  ?.value.toString()
                  .replace(".", ",") ?? "",
            )
            .join(";"),
      ),
  ].join("\n");
  return (
    <section className="series-card comparison">
      <h2>Compare os indicadores no mesmo gráfico</h2>
      {inputDatasets.some((d) => d.priceBasis === "nominal-brl") && (
        <PriceDisplayToggle real={real} onChange={setReal} />
      )}
      <div
        className="comparison-toggles"
        role="group"
        aria-label="Séries no gráfico"
      >
        {datasets.map((d, i) => (
          <button
            key={d.slug}
            type="button"
            aria-pressed={enabled.includes(d.slug)}
            onClick={() =>
              setEnabled((prev) =>
                prev.includes(d.slug)
                  ? prev.filter((s) => s !== d.slug)
                  : [...prev, d.slug],
              )
            }
          >
            <span style={{ background: colors[i % colors.length] }} />
            {d.seriesName}
          </button>
        ))}
      </div>
      <div className="dataset-controls">
        <label>
          De
          <select
            aria-label="Comparação: ano inicial"
            value={start}
            onChange={(e) => {
              const n = Number(e.target.value);
              setStart(n);
              if (n > end) setEnd(n);
            }}
          >
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
        <label>
          Até
          <select
            aria-label="Comparação: ano final"
            value={end}
            onChange={(e) => {
              const n = Number(e.target.value);
              setEnd(n);
              if (n < start) setStart(n);
            }}
          >
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="comparison-shade">
        <input
          type="checkbox"
          checked={shade}
          onChange={(e) => setShade(e.target.checked)}
        />{" "}
        Destacar governos do PT
      </label>
      <p className="comparison-scale">
        Eixo esquerdo: <strong>{labelLeft}</strong>
        {lines.some((l) => l.right) && (
          <>
            {" "}
            · Eixo direito: <strong>{labelRight}</strong>
          </>
        )}
        .{" "}
        {indexed
          ? rates.length
            ? "As séries de nível usam a mesma base 100; a taxa de crescimento mantém sua unidade percentual."
            : "As séries usam uma base comum igual a 100 para comparar a evolução relativa, não seus valores absolutos."
          : "Os valores mantêm as unidades originais. Quando diferentes, usam eixos distintos."}{" "}
        Consulte os valores originais na tabela.
      </p>
      {active.length === 0 ? (
        <p role="status">
          Escolha ao menos um indicador para visualizar o gráfico.
        </p>
      ) : (
        <div className="comparison-scroll">
          <svg
            viewBox="0 0 1000 410"
            role="img"
            aria-labelledby={`${id}-title`}
            className="series-svg"
          >
            <title
              id={`${id}-title`}
            >{`Comparação de ${active.map((d) => d.seriesName).join(", ")}. Valores originais na tabela.`}</title>
            {shade &&
              governments
                .filter((g) => g.pt && g.end > start && g.start <= end)
                .map((g) => (
                  <rect
                    key={g.start}
                    data-pt-band="true"
                    x={x(Math.max(start, g.start))}
                    y={60}
                    width={Math.max(
                      0,
                      x(Math.min(end, g.end)) - x(Math.max(start, g.start)),
                    )}
                    height={280}
                    fill="#e8f1df"
                  />
                ))}
            {[0, 1, 2, 3, 4].map((t) => {
              const f = t / 4;
              return (
                <g key={t}>
                  <line
                    x1={70}
                    x2={920}
                    y1={340 - f * 265}
                    y2={340 - f * 265}
                    stroke="#cbd5c8"
                    strokeDasharray="3 5"
                  />
                  <text
                    x={62}
                    y={344 - f * 265}
                    textAnchor="end"
                    fontSize={11}
                    fill="currentColor"
                  >
                    {formatValue(
                      leftBounds[0] + f * (leftBounds[1] - leftBounds[0]),
                    )}
                  </text>
                  {lines.some((l) => l.right) && (
                    <text
                      x={930}
                      y={344 - f * 265}
                      fontSize={11}
                      fill="currentColor"
                    >
                      {formatValue(
                        rightBounds[0] + f * (rightBounds[1] - rightBounds[0]),
                      )}
                    </text>
                  )}
                </g>
              );
            })}
            {lines.map((line) => (
              <g key={line.slug}>
                <path
                  data-series={line.slug}
                  d={line.points
                    .map(
                      (p, i) =>
                        `${i && p.year === line.points[i - 1].year + 1 ? "L" : "M"}${x(p.year)},${y(p.value, line.right)}`,
                    )
                    .join(" ")}
                  fill="none"
                  stroke={line.color}
                  strokeWidth={2.5}
                />
                {line.points.map((p) => (
                  <circle
                    key={p.year}
                    cx={x(p.year)}
                    cy={y(p.value, line.right)}
                    r={3.5}
                    fill={line.color}
                    tabIndex={0}
                    role="img"
                    aria-label={`${line.seriesName}, ${p.year}: ${formatValue(p.original)} ${line.unit}`}
                  >
                    <title>{`${line.seriesName} · ${p.year}: ${formatValue(p.original)} ${line.unit}`}</title>
                  </circle>
                ))}
              </g>
            ))}
            {years
              .filter((v) => v >= start && v <= end)
              .filter(
                (_, i, a) =>
                  i === 0 ||
                  i === a.length - 1 ||
                  i % Math.max(1, Math.ceil(a.length / 9)) === 0,
              )
              .map((v) => (
                <text
                  key={v}
                  x={x(v)}
                  y={370}
                  textAnchor="middle"
                  fontSize={12}
                  fill="currentColor"
                >
                  {v}
                </text>
              ))}
          </svg>
        </div>
      )}
      <details>
        <summary>Ver valores originais e unidades</summary>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Ano</th>
                {active.map((d) => (
                  <th key={d.slug}>
                    {d.seriesName}
                    <br />
                    {d.unit}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {years
                .filter((y) => y >= start && y <= end)
                .map((y) => (
                  <tr key={y}>
                    <td>{y}</td>
                    {active.map((d) => (
                      <td key={d.slug}>
                        {d.points.some((p) => p.year === y)
                          ? formatValue(
                              d.points.find((p) => p.year === y)!.value,
                            )
                          : "Sem observação"}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </details>
      <a
        download="comparacao-indicadores.csv"
        href={`data:text/csv;charset=utf-8,${encodeURIComponent("\uFEFF" + csv)}`}
      >
        Baixar séries selecionadas em CSV
      </a>
      <p>
        Sem interpolação de lacunas. Correlação entre linhas e coincidência com
        mandatos não demonstram causalidade.
      </p>
    </section>
  );
}
