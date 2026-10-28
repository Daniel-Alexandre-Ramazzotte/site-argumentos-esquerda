"use client";
import { useId, useState } from "react";
import { Download, Table2 } from "lucide-react";
import { DatasetExplorer } from "./dataset-explorer";
import { type Indicator, governments } from "@/data/historical";
import { useDatabaseData, usePrices } from "./database-data";

import { PriceDisplayToggle } from "./price-display-toggle";

const monthNumber = (month: string) =>
  Number(month.slice(0, 4)) * 12 + Number(month.slice(5)) - 1;
const monthLabel = (month: string) => `${month.slice(5)}/${month.slice(0, 4)}`;
const format = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
const definitions = [
  {
    code: "3698",
    name: "Média mensal de venda",
    color: "#1b6a4b",
    dash: undefined,
  },
  {
    code: "3695",
    name: "Fechamento mensal de venda",
    color: "#a46c25",
    dash: "6 4",
  },
] as const;

export function DollarExplorer({ datasets }: { datasets: Indicator[] }) {
  const [frequency, setFrequency] = useState("annual");
  return (
    <>
      <div
        className="frequency-switch"
        role="group"
        aria-label="Frequência do gráfico do dólar"
      >
        <button
          type="button"
          aria-pressed={frequency === "annual"}
          onClick={() => setFrequency("annual")}
        >
          Anual · dezembro
        </button>
        <button
          type="button"
          aria-pressed={frequency === "monthly"}
          onClick={() => setFrequency("monthly")}
        >
          Mensal · média e fechamento
        </button>
      </div>
      {frequency === "annual" ? (
        <DatasetExplorer datasets={datasets} />
      ) : (
        <MonthlyDollar />
      )}
    </>
  );
}

function MonthlyDollar() {
  const { mobility } = useDatabaseData();
  const { realValue } = usePrices();
  const id = useId();
  const [real, setReal] = useState(false);
  const convert = (p: { month: string; value: number }) => ({
    ...p,
    value: real ? realValue(p.value, p.month) : p.value,
  });
  const all = mobility.currency["3698"].monthly.map(convert);
  const first = all[0].month,
    last = all.at(-1)!.month;
  const [start, setStart] = useState(first),
    [end, setEnd] = useState(last);
  const [basis, setBasis] = useState("both"),
    [shade, setShade] = useState(true),
    [table, setTable] = useState(false),
    [selected, setSelected] = useState(last);
  const rows = all.filter((p) => p.month >= start && p.month <= end);
  const shown = definitions.filter((d) => basis === "both" || basis === d.code);
  const closing = new Map(
    mobility.currency["3695"].monthly
      .map(convert)
      .map((p) => [p.month, p.value]),
  );
  const active = rows.find((p) => p.month === selected) ?? rows.at(-1)!;
  const series = shown.map((d) => ({
    ...d,
    points: mobility.currency[d.code].monthly
      .map(convert)
      .filter((p) => p.month >= start && p.month <= end),
  }));
  const from = monthNumber(start),
    to = monthNumber(end) + 1;
  const left = 65,
    right = 965,
    top = 60,
    bottom = 350;
  const max =
    Math.ceil(
      Math.max(...series.flatMap((s) => s.points.map((p) => p.value))),
    ) || 1;
  const x = (month: number) =>
    left + ((month - from) / (to - from)) * (right - left);
  const y = (value: number) => bottom - (value / max) * (bottom - top);
  const tickStep = Math.max(1, Math.ceil(rows.length / 7));
  const csv =
    "mes;media_venda_R$_por_US$;fechamento_venda_R$_por_US$;referencia_monetaria\n" +
    rows
      .map(
        (p) =>
          `${p.month};${String(p.value).replace(".", ",")};${String(closing.get(p.month) ?? "").replace(".", ",")};${real ? "reais_de_dezembro_2025_IPCA" : "nominal"}`,
      )
      .join("\n");
  return (
    <>
      <div className="dataset-controls monthly-controls">
        <label>
          <span>Séries do dólar</span>
          <select
            aria-label="Séries mensais do dólar"
            value={basis}
            onChange={(e) => setBasis(e.target.value)}
          >
            <option value="both">Comparar média e fechamento</option>
            <option value="3698">Média mensal de venda</option>
            <option value="3695">Fechamento mensal de venda</option>
          </select>
        </label>
        <label>
          <span>Mês inicial</span>
          <input
            type="month"
            aria-label="Mês inicial"
            min={first}
            max={end}
            value={start}
            onChange={(e) => {
              if (e.target.value)
                setStart([first, e.target.value, end].sort()[1]);
            }}
          />
        </label>
        <label>
          <span>Mês final</span>
          <input
            type="month"
            aria-label="Mês final"
            min={start}
            max={last}
            value={end}
            onChange={(e) => {
              if (e.target.value)
                setEnd([start, e.target.value, last].sort()[1]);
            }}
          />
        </label>
      </div>
      <div className="period-presets monthly-presets">
        {[
          { name: "Desde o Plano Real", start: first },
          { name: "Desde 2003", start: "2003-01" },
          { name: "Desde 2019", start: "2019-01" },
          {
            name: "Últimos 5 anos",
            start: `${Number(last.slice(0, 4)) - 5}-${last.slice(5)}`,
          },
        ].map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => {
              setStart(p.start);
              setEnd(last);
            }}
          >
            {p.name}
          </button>
        ))}
      </div>
      <p className="coverage-note">
        Banco Central · julho de 1994 a setembro de 2026 · referência nacional
        em R$/US$. Setembro é o último mês importado; outubro de 2026 não é
        apresentado como mês completo. Média mensal e fechamento não são cotação
        turismo.
      </p>
      <PriceDisplayToggle real={real} onChange={setReal} currency />
      <div className="series-card">
        <div className="series-toolbar">
          <div>
            <h2>Dólar · evolução mensal</h2>
            <p>
              {monthLabel(start)} a {monthLabel(end)} · {rows.length} meses ·
              {real ? "reais de dez/2025" : "reais nominais"} por dólar
              americano
            </p>
          </div>
        </div>
        <div className="series-legend">
          {shown.map((d) => (
            <span key={d.code}>
              <i className="legend-line" style={{ background: d.color }} />
              {d.name}
              {d.code === "3695" ? " · linha tracejada" : ""}
            </span>
          ))}
          <label>
            <input
              type="checkbox"
              checked={shade}
              onChange={(e) => setShade(e.target.checked)}
            />
            <i className="pt-swatch" />
            Destacar governos do PT
          </label>
        </div>
        <p className="chart-scroll-hint">
          Deslize o gráfico no celular. Toque ou use Tab nos pontos para
          consultar cada mês.
        </p>
        <div className="series-scroll">
          <svg
            viewBox="0 0 1000 410"
            className="series-svg"
            role="group"
            aria-labelledby={`${id}-title`}
          >
            <title
              id={`${id}-title`}
            >{`Dólar mensal, ${monthLabel(start)} a ${monthLabel(end)}, ${shown.map((s) => s.name).join(" e ")}, ${real ? "reais de dezembro de 2025" : "reais nominais"} por dólar`}</title>
            {shade &&
              governments
                .filter((g) => g.pt && g.end * 12 > from && g.start * 12 < to)
                .map((g) => (
                  <rect
                    key={g.start}
                    data-pt-band="true"
                    x={x(Math.max(from, g.start * 12))}
                    y={top - 10}
                    width={
                      x(Math.min(to, g.end * 12)) -
                      x(Math.max(from, g.start * 12))
                    }
                    height={bottom - top + 10}
                    fill="#deebdc"
                  />
                ))}
            {from < 2022 * 12 && to > 2020 * 12 && (
              <rect
                x={x(Math.max(from, 2020 * 12))}
                y={top - 10}
                width={
                  x(Math.min(to, 2022 * 12)) - x(Math.max(from, 2020 * 12))
                }
                height={bottom - top + 10}
                fill="#77818a"
                opacity=".12"
              />
            )}
            {governments
              .filter((g) => g.end * 12 > from && g.start * 12 < to)
              .map((g) => {
                const a = x(Math.max(from, g.start * 12)),
                  b = x(Math.min(to, g.end * 12));
                return b - a > 45 ? (
                  <text
                    key={g.start}
                    x={(a + b) / 2}
                    y="34"
                    textAnchor="middle"
                    fontSize="11"
                    fill="#57694d"
                  >
                    {g.name}
                  </text>
                ) : null;
              })}
            {Array.from({ length: max + 1 }, (_, i) => (
              <g key={i}>
                <line
                  x1={left}
                  x2={right}
                  y1={y(i)}
                  y2={y(i)}
                  stroke="#dbe3d7"
                  strokeDasharray="3 5"
                />
                <text
                  x={left - 10}
                  y={y(i) + 4}
                  textAnchor="end"
                  fill="#6c7569"
                  fontSize="12"
                >
                  {i.toFixed(2).replace(".", ",")}
                </text>
              </g>
            ))}
            {rows
              .filter((_, i) => i % tickStep === 0 || i === rows.length - 1)
              .map((p) => (
                <text
                  key={p.month}
                  x={x(monthNumber(p.month) + 0.5)}
                  y={bottom + 28}
                  textAnchor="middle"
                  fill="#6c7569"
                  fontSize="11"
                >
                  {monthLabel(p.month)}
                </text>
              ))}
            {series.map((s) => (
              <g key={s.code}>
                <path
                  d={s.points
                    .map(
                      (p, i) =>
                        `${i && monthNumber(p.month) === monthNumber(s.points[i - 1].month) + 1 ? "L" : "M"}${x(monthNumber(p.month) + 0.5)},${y(p.value)}`,
                    )
                    .join(" ")}
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2.2"
                  strokeDasharray={s.dash}
                />
                {s.points.map((p) => (
                  <circle
                    key={p.month}
                    cx={x(monthNumber(p.month) + 0.5)}
                    cy={y(p.value)}
                    r={p.month === active.month ? 5 : 2.8}
                    fill={s.color}
                    stroke="white"
                    strokeWidth=".8"
                    role="button"
                    tabIndex={0}
                    aria-label={`${s.name}, ${monthLabel(p.month)}: R$ ${format(p.value)}`}
                    onMouseEnter={() => setSelected(p.month)}
                    onFocus={() => setSelected(p.month)}
                    onClick={() => setSelected(p.month)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(p.month);
                      }
                    }}
                  />
                ))}
              </g>
            ))}
          </svg>
        </div>
        <div className="series-readout" aria-live="polite">
          <strong>{monthLabel(active.month)}</strong>
          <span>Média: R$ {format(active.value)}</span>
          <span>
            Fechamento:{" "}
            {closing.has(active.month)
              ? `R$ ${format(closing.get(active.month)!)}`
              : "Não disponível"}
          </span>
          <span>por US$ 1</span>
        </div>
        <div className="chart-actions">
          <button
            type="button"
            onClick={() => setTable(!table)}
            aria-expanded={table}
          >
            <Table2 size={16} />
            {table ? "Ocultar tabela mensal" : "Ver tabela mensal"}
          </button>
          <a
            download={`dolar-mensal-${start}-${end}${real ? "-real-dez2025" : ""}.csv`}
            href={`data:text/csv;charset=utf-8,${encodeURIComponent("\uFEFF" + csv)}`}
          >
            <Download size={16} />
            Baixar CSV mensal
          </a>
        </div>
        {table && (
          <div className="series-scroll">
            <table>
              <caption>
                Dólar mensal ·{" "}
                {real ? "R$ de dez/2025 por US$" : "R$/US$ nominal"} · Banco
                Central · ambas as séries no período selecionado
              </caption>
              <thead>
                <tr>
                  <th scope="col">Mês</th>
                  <th scope="col">Média de venda</th>
                  <th scope="col">Fechamento de venda</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.month}>
                    <th scope="row">{monthLabel(p.month)}</th>
                    <td>{format(p.value)}</td>
                    <td>
                      {closing.has(p.month)
                        ? format(closing.get(p.month)!)
                        : "Não disponível"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <section className="analysis-layout">
        <article>
          <h2>Como ler as duas linhas</h2>
          <div className="finding">
            <div>
              <h3>Média do mês</h3>
              <p>
                SGS 3698: média de venda no período mensal publicada pelo Banco
                Central. Resume o nível da cotação no mês; não é obtida pelo
                site a partir da média entre abertura e fechamento.
              </p>
              <h3>Fechamento mensal</h3>
              <p>
                SGS 3695: cotação de venda de fim de período. É a referência de
                fechamento do mês, não a máxima, a mínima ou a média mensal.
              </p>
            </div>
          </div>
        </article>
        <aside className="method-card">
          <h3>Mesma moeda e unidade</h3>
          <p>
            As duas séries começam em julho de 1994 e usam reais por dólar. A
            visão mensal inclui meses completos de 2026; a visão anual compara
            dezembro até 2025.
          </p>
          <h3>Governos são contexto</h3>
          <p>
            Faixas verdes marcam mandatos do PT; a faixa cinza identifica
            2020–2021. Coincidência temporal não demonstra causalidade sobre a
            cotação.
          </p>
        </aside>
      </section>
      <section className="article-references">
        <h2>Fontes do gráfico mensal</h2>
        {definitions.map((d) => (
          <a
            href={mobility.currency[d.code].source}
            key={d.code}
            target="_blank"
            rel="noreferrer"
          >
            Banco Central · SGS {d.code} · {d.name}
          </a>
        ))}
      </section>
    </>
  );
}
