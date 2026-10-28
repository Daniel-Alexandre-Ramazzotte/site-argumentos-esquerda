import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { SeriesComparison } from "@/components/series-comparison";
import { DatasetExplorer } from "@/components/dataset-explorer";
import { getIndicators } from "@/lib/repository";
const programs = [
  {
    name: "Bolsa Família",
    text: "Transferência de renda com benefícios vinculados à composição familiar e condicionalidades de saúde e educação. O desenho foi reformulado ao longo do tempo; o programa de 2023 substituiu o Auxílio Brasil.",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14601.htm",
    source: "Lei 14.601/2023",
  },
  {
    name: "BPC",
    text: "Benefício assistencial destinado a pessoas idosas a partir de 65 anos e pessoas com deficiência em situação de baixa renda, conforme os requisitos legais. Não é aposentadoria e não exige contribuição prévia ao INSS.",
    url: "https://www.gov.br/inss/pt-br/direitos-e-deveres/beneficios-assistenciais/beneficio-assistencial-a-pessoa-idosa-bpc-loas",
    source: "INSS · BPC",
  },
  {
    name: "Auxílio Emergencial",
    text: "Proteção temporária de renda durante a pandemia, com fases e regras próprias em 2020 e 2021. Foi aprovado pelo Congresso e sancionado pela Presidência; não é um benefício permanente em vigor para novas inscrições.",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l13982.htm",
    source: "Lei 13.982/2020",
  },
  {
    name: "Pé-de-Meia",
    text: "Incentivo financeiro educacional, na modalidade de poupança, para apoiar permanência e conclusão do ensino médio público pelos estudantes elegíveis. O acesso segue critérios e calendários próprios.",
    url: "https://www.gov.br/mec/pt-br/pe-de-meia/pe-de-meia",
    source: "MEC · programa e critérios",
  },
  {
    name: "Cadastro Único",
    text: "Instrumento de identificação socioeconômica utilizado por vários programas. Estar cadastrado não garante recebimento automático de cada benefício, e o cadastro não é, por si só, uma transferência de dinheiro.",
    url: "https://www.gov.br/mds/pt-br/acoes-e-programas/cadastro-unico",
    source: "MDS · Cadastro Único",
  },
];
export const metadata = {
  title: "Incentivos e programas sociais | Brasil em Evidências",
};
export default async function Social() {
  const socialIndicators = (await getIndicators()).filter(
    (i) => i.category === "Programas sociais",
  );
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">PROTEÇÃO SOCIAL · ACESSO E RESULTADOS</div>
        <h1>Incentivos e programas sociais.</h1>
        <p className="page-deck">
          Bolsa Família, BPC, auxílios e incentivos educacionais têm objetivos e
          públicos distintos. Compare alcance e recursos das séries disponíveis
          e entenda as regras sem tratar todos os benefícios como se fossem
          iguais.
        </p>
        <div className="social-programs">
          {programs.map((p) => (
            <article key={p.name}>
              <h2>{p.name}</h2>
              <p>{p.text}</p>
              <a href={p.url} target="_blank" rel="noreferrer">
                {p.source} →
              </a>
            </article>
          ))}
        </div>
        <SeriesComparison
          datasets={socialIndicators.filter((i) =>
            i.slug.endsWith("beneficios"),
          )}
        />
        <h2>Recursos e recortes territoriais</h2>
        <DatasetExplorer datasets={socialIndicators} />
        <section className="research-card">
          <h2>Qual é o impacto?</h2>
          <p>
            Gasto e número de benefícios descrevem alcance, mas não provam,
            sozinhos, redução causal da pobreza. Avaliações precisam considerar
            emprego, renda, preços, composição familiar e a comparação com um
            cenário sem o programa.
          </p>
          <Link href="/indicadores/pobreza">
            Compare também a evolução da pobreza →
          </Link>
          <p>
            <Link href="/checagens/financiamento-bolsa-familia">
              Tributos, financiamento e efeitos do Bolsa Família →
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
