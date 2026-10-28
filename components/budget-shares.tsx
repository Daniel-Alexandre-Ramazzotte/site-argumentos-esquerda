"use client";
import { useState } from "react";
import { useDatabaseData, usePrices } from "./database-data";
const budgetStages = [
  "Despesas Pagas",
  "Despesas Liquidadas",
  "Despesas Empenhadas",
];

import { PriceDisplayToggle } from "./price-display-toggle";
const money = (v: number) =>
  v.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
export function BudgetShares() {
  const { budget: data } = useDatabaseData();
  const { realAnnualFlow } = usePrices();
  const [year, setYear] = useState(data.at(-1)!.year),
    [stage, setStage] = useState<string>(budgetStages[0]),
    [real, setReal] = useState(false);
  const rows = data
    .find((row) => row.year === year)!
    .functions.filter((f) => f.stage === stage)
    .sort((a, b) => b.value - a.value);
  const total = rows.reduce((sum, f) => sum + f.value, 0);
  const amount = (v: number) => (real ? realAnnualFlow(v, year) : v) / 1e9;
  const csv = [
    "ano;funcao;etapa;valor_bilhoes;percentual;referencia",
    ...rows.map(
      (f) =>
        `${year};${f.name};${stage};${amount(f.value).toString().replace(".", ",")};${((100 * f.value) / total).toString().replace(".", ",")};${real ? "IPCA dez2025 media anual" : "nominal"}`,
    ),
  ].join("\n");
  return (
    <section className="series-card">
      <div className="dataset-controls">
        <label>
          Ano do orçamento
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {data.map((row) => (
              <option key={row.year}>{row.year}</option>
            ))}
          </select>
        </label>
        <label>
          Etapa da despesa
          <select value={stage} onChange={(e) => setStage(e.target.value)}>
            {budgetStages.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <PriceDisplayToggle real={real} onChange={setReal} />
      <div className="budget-total">
        <span>
          União · {year} · {stage.toLowerCase()}
        </span>
        <strong>
          R$ {money(amount(total))} bilhões{real ? " de dez/2025" : ""}
        </strong>
        <p>
          Despesas por função, exceto intraorçamentárias. Denominador: soma das
          28 funções deste demonstrativo.
        </p>
      </div>
      <div
        className="budget-bars"
        aria-label="Participação de cada função na despesa federal"
      >
        {rows.map((f) => (
          <div key={f.code} className="budget-row">
            <div>
              <strong>{f.name}</strong>
              <span>
                {money((100 * f.value) / total)}% · R$ {money(amount(f.value))}{" "}
                bi
              </span>
            </div>
            <meter
              min={0}
              max={100}
              value={(100 * f.value) / total}
              aria-label={`${f.name}: ${money((100 * f.value) / total)} por cento`}
            />
          </div>
        ))}
      </div>
      <details>
        <summary>Ver tabela completa dos valores</summary>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Função</th>
                <th>R$ bilhões{real ? " de dez/2025" : ""}</th>
                <th>Participação</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((f) => (
                <tr key={f.code}>
                  <td>
                    {f.code} · {f.name}
                  </td>
                  <td>{money(amount(f.value))}</td>
                  <td>{money((100 * f.value) / total)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <a
        download={`orcamento-uniao-${year}-${real ? "real" : "nominal"}.csv`}
        href={`data:text/csv;charset=utf-8,${encodeURIComponent("\uFEFF" + csv)}`}
      >
        Baixar dados em CSV
      </a>
    </section>
  );
}
