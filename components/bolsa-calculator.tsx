"use client";
import { useState } from "react";
const BUDGET = 158.63,
  REVENUE = 2886,
  RATIO = BUDGET / REVENUE;
const brackets = [
  { label: "Até R$ 2 mil", income: 2000 },
  { label: "R$ 2 mil a R$ 5 mil", income: 3500 },
  { label: "R$ 5 mil a R$ 10 mil", income: 7500 },
  { label: "R$ 10 mil a R$ 20 mil", income: 15000 },
  { label: "Acima de R$ 20 mil", income: 25000 },
];
const money = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export function BolsaCalculator() {
  const [income, setIncome] = useState(3500),
    [taxRate, setTaxRate] = useState(10);
  const estimatedTax = (income * taxRate) / 100,
    allocation = estimatedTax * RATIO;
  return (
    <section className="bolsa-calculator">
      <div className="eyebrow">
        SIMULAÇÃO EXPLICADA · NÃO É UMA MEDIÇÃO INDIVIDUAL
      </div>
      <h2>Uma forma de dimensionar o financiamento.</h2>
      <p>
        O salário não informa sozinho os impostos pagos. Este modelo usa uma
        hipótese ajustável de tributos federais e um rateio proporcional de
        referência. Não calcula sua carga tributária real.
      </p>
      <div className="calculator-inputs">
        <label>
          Renda mensal ilustrativa
          <input
            type="number"
            aria-label="Renda mensal ilustrativa"
            min="0"
            max="1000000"
            step="100"
            value={income}
            onChange={(e) =>
              setIncome(Math.max(0, Math.min(1000000, Number(e.target.value))))
            }
          />
        </label>
        <label>
          Hipótese de tributos federais: <strong>{taxRate}% da renda</strong>
          <input
            type="range"
            aria-label="Hipótese de tributos federais"
            min="0"
            max="40"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="calculator-result" aria-live="polite">
        <div>
          <span>Tributos federais hipotéticos</span>
          <strong>
            {money(estimatedTax)}
            <small>/mês</small>
          </strong>
        </div>
        <div>
          <span>Rateio ilustrativo para o programa</span>
          <strong>
            {money(allocation)}
            <small>/mês</small>
          </strong>
        </div>
      </div>
      <div className="series-scroll">
        <table>
          <caption>
            Exemplos por faixa de renda, com a hipótese escolhida de {taxRate}%
          </caption>
          <thead>
            <tr>
              <th scope="col">Faixa mensal</th>
              <th scope="col">Renda usada no exemplo</th>
              <th scope="col">Tributos hipotéticos</th>
              <th scope="col">Rateio ilustrativo</th>
            </tr>
          </thead>
          <tbody>
            {brackets.map((b) => (
              <tr key={b.label}>
                <th scope="row">{b.label}</th>
                <td>{money(b.income)}</td>
                <td>{money((b.income * taxRate) / 100)}</td>
                <td>{money(((b.income * taxRate) / 100) * RATIO)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <details className="calculator-method">
        <summary>Veja a fórmula e suas limitações</summary>
        <p>
          Referência: dotação da LOA 2025 para transferência do Bolsa Família de
          R$ 158,63 bilhões ÷ arrecadação federal informada para 2025 de R$
          2.886 bilhões ≈{" "}
          {(RATIO * 100).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
          %. Valor ilustrativo = renda × hipótese de tributos federais × essa
          relação.
        </p>
        <p>
          O numerador é orçamento autorizado, não execução comprovada; o
          denominador é arrecadação agregada. A relação não é uma vinculação
          legal de impostos ao programa. União, estados e municípios têm
          tributos e receitas diferentes; os beneficiários também pagam
          impostos, inclusive no consumo. Não interpretamos o exemplo como a
          contribuição média real de uma faixa salarial.
        </p>
      </details>
      <div className="record-sources">
        <a
          href="https://www.gov.br/planejamento/pt-br/assuntos/orcamento/orcamento-cidadao/25_06_2025_1420_oc_loa_2025.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Orçamento Cidadão · LOA 2025
        </a>
        <a
          href="https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/janeiro/arrecadacao-de-receitas-federais-alcanca-r-2-886-trilhoes-em-2025"
          target="_blank"
          rel="noreferrer"
        >
          Receita Federal · arrecadação de 2025
        </a>
      </div>
    </section>
  );
}
