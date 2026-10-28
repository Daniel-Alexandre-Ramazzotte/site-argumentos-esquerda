"use client";
import { useState } from "react";
import { useDatabaseData } from "./database-data";
const n = (v: number) => v.toLocaleString("pt-BR");
export function AvoidableDeaths() {
  const { pandemic } = useDatabaseData();
  const { scenarios, baseline } = pandemic;
  const [selected, setSelected] = useState(0);
  const s = scenarios[selected];
  return (
    <section className="series-card">
      <h2>Compare os cenários do modelo</h2>
      <label className="scenario-select">
        Cenário alternativo
        <select
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
        >
          {scenarios.map((s, i) => (
            <option key={s.name} value={i}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <div aria-live="polite">
        <p>
          <strong>{n(s.avoided)} mortes evitáveis estimadas</strong> neste
          cenário.
        </p>
        <div
          className="death-bar"
          role="img"
          aria-label={`Base histórica: ${baseline} mortes. Cenário alternativo: ${s.remaining} mortes, ${s.avoided} evitadas.`}
        >
          <span style={{ width: `${(100 * s.remaining) / baseline}%` }} />
          <span style={{ width: `${(100 * s.avoided) / baseline}%` }} />
        </div>
        <p className="death-legend">
          <span>● {n(s.remaining)} no cenário</span>
          <span>● {n(s.avoided)} evitadas no modelo</span>
        </p>
      </div>
      <details>
        <summary>Dados da comparação</summary>
        <table>
          <thead>
            <tr>
              <th>Cenário</th>
              <th>Mortes</th>
              <th>Evitáveis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Base histórica utilizada</td>
              <td>{n(baseline)}</td>
              <td>—</td>
            </tr>
            {scenarios.map((s) => (
              <tr key={s.name}>
                <td>{s.name}</td>
                <td>{n(s.remaining)}</td>
                <td>{n(s.avoided)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <p>
        Fonte: Araújo e colaboradores (2023), tabela 1. Cenários alternativos,
        não parcelas somáveis. Valores pontuais, sem intervalo de confiança
        apresentado aqui.
      </p>
    </section>
  );
}
