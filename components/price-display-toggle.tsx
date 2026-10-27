"use client";
export function PriceDisplayToggle({
  real,
  onChange,
  currency = false,
}: {
  real: boolean;
  onChange: (real: boolean) => void;
  currency?: boolean;
}) {
  return (
    <div className="price-display">
      <div className="price-display-heading">
        <strong>Como comparar os valores</strong>
        <div
          className="price-switch"
          role="group"
          aria-label="Exibição dos valores monetários"
        >
          <button
            type="button"
            aria-pressed={!real}
            onClick={() => onChange(false)}
          >
            Valor nominal
          </button>
          <button
            type="button"
            aria-pressed={real}
            onClick={() => onChange(true)}
          >
            Valor real · IPCA
          </button>
        </div>
      </div>
      <p>
        {real
          ? "Valores corrigidos pelo IPCA nacional para reais de dezembro de 2025. A mesma referência é usada em todos os estados e regiões."
          : "Valores em reais da época, sem correção pela inflação."}
        {currency &&
          " No dólar, a opção real corrige somente o valor em reais por US$; não é uma taxa de câmbio real ou efetiva, pois não incorpora a inflação dos Estados Unidos."}
      </p>
      {real && (
        <details>
          <summary>Ver cálculo e fonte da correção</summary>
          <p>
            Valor real = valor nominal × número-índice do IPCA de dezembro de
            2025 ÷ número-índice do mês observado. Nos gráficos anuais de
            preços, o mês observado é dezembro. Índices mensais são usados sem
            arredondar os fatores de cálculo; o arredondamento ocorre apenas na
            apresentação.
          </p>
          <a
            href="https://sidra.ibge.gov.br/tabela/1737"
            target="_blank"
            rel="noreferrer"
          >
            IBGE/SIDRA · tabela 1737 · número-índice do IPCA (variável 2266)
          </a>
        </details>
      )}
    </div>
  );
}
