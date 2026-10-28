import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { BudgetShares } from "@/components/budget-shares";
export const metadata = {
  title: "Fatias do orçamento federal | Brasil em Evidências",
};
export default function BudgetPage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">ECONOMIA · EXECUÇÃO DO ORÇAMENTO</div>
        <h1>Para onde vai a despesa federal?</h1>
        <p className="page-deck">
          Escolha o ano e a etapa para comparar as fatias por função. Os dados
          mostram execução informada pela União, de 2014 a 2025, com valores
          nominais ou corrigidos pelo IPCA.
        </p>
        <BudgetShares />
        <section className="method-grid">
          <article>
            <h3>Não é a LOA autorizada</h3>
            <p>
              Empenho, liquidação e pagamento são etapas da execução. A seleção
              não é a dotação inicial nem uma previsão de gastos futuros.
            </p>
          </article>
          <article>
            <h3>Encargos especiais não são só juros</h3>
            <p>
              Essa função reúne despesas que não se associam diretamente a um
              bem ou serviço, incluindo operações da dívida e transferências.
              Não rotulamos toda a fatia como juros. Refinanciamento e
              amortização afetam o denominador.
            </p>
          </article>
          <article>
            <h3>Sem duplicar funções e subfunções</h3>
            <p>
              Somamos somente as 28 funções, excluindo despesas
              intraorçamentárias. Os totais foram reconciliados com os agregados
              do demonstrativo em cada ano e etapa. Não é orçamento consolidado
              de todos os entes.
            </p>
          </article>
        </section>
        <p>
          Fonte:{" "}
          <a
            href="https://apidatalake.tesouro.gov.br/docs/siconfi/"
            target="_blank"
            rel="noreferrer"
          >
            Tesouro Nacional/Siconfi, DCA Anexo I-E, União
          </a>
          . A correção anual usa a média dos índices mensais do IPCA, pois este
          recorte não distribui pagamentos por mês. Corrigir valores não altera
          suas participações percentuais dentro do mesmo ano.
        </p>
        <div className="related-links">
          <Link href="/indicadores/verbas-10">
            Série de verbas para Saúde →
          </Link>
          <Link href="/indicadores/verbas-12">
            Série de verbas para Educação →
          </Link>
          <Link href="/indicadores/verbas-06">
            Série de verbas para Segurança →
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
