"use client";
import { useId, useState } from "react";
import { Download, Table2 } from "lucide-react";
import {
  type Indicator,
  formatValue,
  governmentAt,
  governments,
} from "@/data/historical";
export function TimeSeries({ indicator }: { indicator: Indicator }) {
  const id = useId(),
    all = indicator.points,
    first = all[0].year,
    last = all.at(-1)!.year;
  const [start, setStart] = useState(
      all.find((p) => p.year >= 1985)?.year ?? first,
    ),
    [end, setEnd] = useState(last),
    [shade, setShade] = useState(true),
    [table, setTable] = useState(false),
    [selected, setSelected] = useState(last);
  const values = all.filter((p) => p.year >= start && p.year <= end),
    secondary =
      indicator.secondary?.points.filter(
        (p) => p.year >= start && p.year <= end,
      ) ?? [];
  const selectedPoint =
      values.find((p) => p.year === selected) ?? values.at(-1)!,
    extra = secondary.find((p) => p.year === selectedPoint.year);
  const allValues = [...values, ...secondary].map((p) => p.value),
    low = Math.min(0, Math.floor(Math.min(...allValues) / 5) * 5),
    high = Math.ceil(Math.max(...allValues) / 5) * 5 || 5;
  const left = 65,
    right = 965,
    top = 65,
    bottom = 350,
    x = (year: number) =>
      left + ((year - start) / (end + 1 - start)) * (right - left),
    y = (v: number) => bottom - ((v - low) / (high - low)) * (bottom - top);
  const path = (list: typeof values) =>
    list
      .map(
        (p, i) =>
          `${i && (indicator.frequency === "cycles" || p.year === list[i - 1].year + 1) ? "L" : "M"}${x(p.year + 0.5)},${y(p.value)}`,
      )
      .join(" ");
  const csv =
    "ano;" +
    indicator.seriesName +
    ";" +
    (indicator.secondary?.name ?? "") +
    ";governo;localidade;unidade\n" +
    values
      .map(
        (p) =>
          `${p.year};${String(p.value).replace(".", ",")};${
            secondary
              .find((s) => s.year === p.year)
              ?.value.toString()
              .replace(".", ",") ?? ""
          };${governmentAt(p.year)};${indicator.locationName ?? "Brasil"};${indicator.unit}`,
      )
      .join("\n");
  return (
    <div className="series-card">
      <div className="series-toolbar">
        <div>
          <h2>{indicator.seriesName}</h2>
          <p>
            {indicator.locationName ?? "Brasil"} · {indicator.unit} ·{" "}
            {indicator.frequency === "cycles"
              ? "edições da avaliação"
              : indicator.frequency === "irregular"
                ? "anos disponíveis · lacunas preservadas"
                : "observações anuais"}
          </p>
        </div>
        <div className="year-controls">
          <label>
            De
            <select
              aria-label="Ano inicial"
              value={start}
              onChange={(e) => setStart(Number(e.target.value))}
            >
              {all
                .filter((p) => p.year <= end)
                .map((p) => (
                  <option key={p.year}>{p.year}</option>
                ))}
            </select>
          </label>
          <label>
            Até
            <select
              aria-label="Ano final"
              value={end}
              onChange={(e) => setEnd(Number(e.target.value))}
            >
              {all
                .filter((p) => p.year >= start)
                .map((p) => (
                  <option key={p.year}>{p.year}</option>
                ))}
            </select>
          </label>
        </div>
      </div>
      <div className="period-presets" aria-label="Atalhos de período">
        <button
          onClick={() => {
            setStart(all.find((p) => p.year >= 1985)?.year ?? first);
            setEnd(last);
          }}
        >
          Desde a redemocratização
        </button>
        {last >= 1995 && (
          <button
            onClick={() => {
              setStart(all.find((p) => p.year >= 1995)?.year ?? first);
              setEnd(last);
            }}
          >
            Após o Plano Real
          </button>
        )}
        <button
          onClick={() => {
            setStart(first);
            setEnd(last);
          }}
        >
          Histórico completo · desde {first}
        </button>
      </div>
      {first > 1985 && (
        <p className="coverage-note">
          Esta série começa em {first}. Não há valores anteriores neste recorte;
          o início foi ajustado ao primeiro ano disponível.
        </p>
      )}
      {Math.max(...allValues) > 100 && indicator.unit.includes("%") && (
        <p className="coverage-note">
          A hiperinflação amplia a escala vertical. Para examinar a fase
          recente, use “Após o Plano Real” ou selecione outro período.
        </p>
      )}
      <div className="series-legend">
        <span>
          <i className="legend-line" />
          {indicator.seriesName}
        </span>
        {indicator.secondary && (
          <span>
            <i className="legend-line secondary" />
            {indicator.secondary.name}
          </span>
        )}
        <label>
          <input
            type="checkbox"
            checked={shade}
            onChange={(e) => setShade(e.target.checked)}
          />
          <i className="pt-swatch" />
          Destacar governos do PT
        </label>
        <span>
          <i className="pandemic-swatch" />
          2020–2021
        </span>
        {start <= 1985 && end >= 1985 && <span>1985 · redemocratização</span>}
      </div>
      <p className="chart-scroll-hint">
        No celular, deslize na horizontal. Toque nos pontos ou use Tab para
        consultar cada ano.
      </p>
      <div className="series-scroll">
        <svg
          viewBox="0 0 1000 410"
          role="group"
          aria-labelledby={`${id}-title ${id}-desc`}
          className="series-svg"
        >
          <title id={`${id}-title`}>
            {`${indicator.seriesName} no Brasil, ${start} a ${end}`}
          </title>
          <desc id={`${id}-desc`}>
            Faixas verdes: mandatos do PT. Faixa cinza: 2020 e 2021. Os valores
            estão disponíveis em tabela. O ano de 2016 abrange Dilma e Temer.
          </desc>
          {start <= 1985 && end >= 1985 && (
            <line
              x1={x(1985)}
              x2={x(1985)}
              y1={top - 8}
              y2={bottom}
              stroke="#a86e2a"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
          )}
          {shade &&
            governments
              .filter((g) => g.pt && g.end > start && g.start < end + 1)
              .map((g) => (
                <rect
                  data-pt-band="true"
                  key={g.start}
                  x={x(Math.max(start, g.start))}
                  y={top - 8}
                  width={
                    x(Math.min(end + 1, g.end)) - x(Math.max(start, g.start))
                  }
                  height={bottom - top + 8}
                  fill="#deebdc"
                />
              ))}
          {end >= 2020 && start <= 2021 && (
            <rect
              x={x(Math.max(start, 2020))}
              y={top - 8}
              width={x(Math.min(end + 1, 2022)) - x(Math.max(start, 2020))}
              height={bottom - top + 8}
              fill="#77818a"
              opacity=".12"
            />
          )}
          {governments
            .filter((g) => g.end > start && g.start < end + 1)
            .map((g) => {
              const a = x(Math.max(start, g.start)),
                b = x(Math.min(end + 1, g.end));
              return (
                <g key={g.start}>
                  <line
                    x1={a}
                    x2={a}
                    y1={top - 15}
                    y2={bottom}
                    stroke="#a4b49d"
                    strokeDasharray="3 4"
                  />
                  <text
                    x={(a + b) / 2}
                    y="35"
                    textAnchor="middle"
                    fill={g.pt ? "#25623f" : "#70776e"}
                    fontSize={b - a < 60 ? 9 : 12}
                  >
                    {g.name}
                  </text>
                </g>
              );
            })}
          {Array.from(
            { length: 6 },
            (_, i) => low + ((high - low) * i) / 5,
          ).map((t) => (
            <g key={t}>
              <line
                x1={left}
                x2={right}
                y1={y(t)}
                y2={y(t)}
                stroke={t === 0 ? "#8b9989" : "#dbe3d7"}
                strokeDasharray={t === 0 ? "" : "3 5"}
              />
              <text
                x={left - 12}
                y={y(t) + 4}
                fontSize="12"
                textAnchor="end"
                fill="#6c7569"
              >
                {t.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}
              </text>
            </g>
          ))}
          <path d={path(values)} stroke="#1c6d4c" strokeWidth="3" fill="none" />
          {secondary.length > 0 && (
            <path
              d={path(secondary)}
              stroke="#b2762f"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              fill="none"
            />
          )}
          <line
            x1={x(selectedPoint.year + 0.5)}
            x2={x(selectedPoint.year + 0.5)}
            y1={top}
            y2={bottom}
            stroke="#1c6d4c"
            strokeDasharray="3 4"
            opacity=".4"
          />
          {values.map((p, i) => (
            <g key={p.year}>
              <circle
                cx={x(p.year + 0.5)}
                cy={y(p.value)}
                r={selectedPoint.year === p.year ? 6 : 4}
                fill="white"
                stroke="#1c6d4c"
                strokeWidth="2"
              />
              <circle
                cx={x(p.year + 0.5)}
                cy={y(p.value)}
                r="13"
                fill="transparent"
                role="button"
                tabIndex={0}
                aria-label={`${p.year}: ${formatValue(p.value)} ${indicator.unit}, ${governmentAt(p.year)}`}
                onFocus={() => setSelected(p.year)}
                onMouseEnter={() => setSelected(p.year)}
                onClick={() => setSelected(p.year)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(p.year);
                  }
                }}
              />
              {(values.length <= 14 ||
                i % 2 === 0 ||
                i === values.length - 1) && (
                <text
                  x={x(p.year + 0.5)}
                  y={bottom + 27}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6c7569"
                >
                  {p.year}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <div className="series-readout" aria-live="polite">
        <strong>
          {selectedPoint.year}
          <span> · {governmentAt(selectedPoint.year)}</span>
        </strong>
        <span>
          {indicator.seriesName}: <b>{formatValue(selectedPoint.value)}</b>{" "}
          {indicator.unit}
        </span>
        {extra && (
          <span>
            {indicator.secondary!.name}: <b>{formatValue(extra.value)}</b>{" "}
            {indicator.unit}
          </span>
        )}
      </div>
      <p className="series-context">
        Faixas indicam quem exercia a Presidência. Dilma foi afastada em
        12/05/2016; Temer assumiu interinamente nessa data e definitivamente em
        31/08. O valor anual de 2016 abrange os dois governos. A marcação não
        demonstra causalidade.
        {start < 1985 &&
          " O histórico distingue o período anterior a 1964 e a ditadura. O ano de 1985 inclui a transição Figueiredo/Sarney; 1990 e 1992 também tiveram mais de um presidente."}
      </p>
      <div className="series-actions">
        <button onClick={() => setTable(!table)} aria-expanded={table}>
          <Table2 size={16} />
          {table ? "Ocultar tabela" : "Ver tabela completa"}
        </button>
        <a
          href={
            "data:text/csv;charset=utf-8," + encodeURIComponent("\uFEFF" + csv)
          }
          download={`${indicator.slug}-${start}-${end}.csv`}
        >
          <Download size={16} />
          Baixar CSV deste período
        </a>
      </div>
      {table && (
        <div className="series-scroll">
          <table>
            <caption>
              {indicator.seriesName} · {indicator.unit}
            </caption>
            <thead>
              <tr>
                <th scope="col">Ano</th>
                <th scope="col">{indicator.seriesName}</th>
                {indicator.secondary && (
                  <th scope="col">{indicator.secondary.name}</th>
                )}
                <th scope="col">Presidência / período</th>
              </tr>
            </thead>
            <tbody>
              {values.map((p) => (
                <tr key={p.year}>
                  <th scope="row">{p.year}</th>
                  <td>{formatValue(p.value)}</td>
                  {indicator.secondary && (
                    <td>
                      {formatValue(
                        secondary.find((s) => s.year === p.year)!.value,
                      )}
                    </td>
                  )}
                  <td>{governmentAt(p.year)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
