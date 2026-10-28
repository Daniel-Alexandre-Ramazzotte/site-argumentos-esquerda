import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { AvoidableDeaths } from "@/components/avoidable-deaths";
export const metadata = {
  title:
    "Mortes evitáveis na pandemia: estudos e limites | Brasil em Evidências",
};
export default function AvoidablePage() {
  return (
    <>
      <SiteHeader />
      <main className="wrap section directory-page">
        <div className="eyebrow">PANDEMIA · O QUE AS PESQUISAS ESTIMAM</div>
        <h1>Quantas vidas poderiam ter sido poupadas?</h1>
        <p className="page-deck">
          Estudos estimam perdas evitáveis sob respostas diferentes à pandemia.
          Eles sustentam a análise de decisões públicas, mas respondem a
          perguntas distintas: não há um único total comprovado de mortes
          individualmente atribuídas a Bolsonaro.
        </p>
        <section className="method-grid">
          <article>
            <h3>Uma decisão muda o risco</h3>
            <p>
              Comunicação pública, prevenção, coordenação e vacinação podem
              alterar exposição, proteção e sobrecarga dos serviços. Estimar o
              efeito depende do cenário que teria substituído a resposta
              observada.
            </p>
          </article>
          <article>
            <h3>Não some estes números</h3>
            <p>
              Os mesmos óbitos podem aparecer em modelos diferentes. Cenários de
              vacinação e prevenção também se sobrepõem. Somá-los produziria
              dupla contagem.
            </p>
          </article>
          <article>
            <h3>Estimativa não é contagem individual</h3>
            <p>
              Um cenário hipotético depende de hipóteses. Não identifica a causa
              de cada óbito nem determina, sozinho, responsabilidade jurídica
              individual.
            </p>
          </article>
        </section>
        <article className="research-card">
          <div className="eyebrow">
            ARTIGO CIENTÍFICO · REVISTA BRASILEIRA DE EPIDEMIOLOGIA · 2023
          </div>
          <h2>Vacinação e prevenção: cenários alternativos</h2>
          <p>
            <strong>
              Samantha Rodrigues de Araújo, João Flávio de Freitas Almeida,
              Lásara Fabrícia Rodrigues e Elaine Leandro Machado.
            </strong>{" "}
            Modelo SEIRS, Brasil, 8/3/2020–5/6/2022: antecipação para 8/12/2020,
            doses adicionais e medidas não farmacológicas.
          </p>
          <p>
            <strong>Hipóteses e limites:</strong> o cenário ampliado pressupõe
            80% vacinados até maio de 2021. O modelo simplifica diferenças
            populacionais, marcas e disponibilidade de vacinas. Os resultados
            dependem dessas hipóteses; não são uma faixa de incerteza causal
            sobre uma pessoa.
          </p>
          <a
            href="https://www.scielo.br/j/rbepid/a/Csj3NQBSBj4rqDQ4qSdrNDM/?lang=en"
            target="_blank"
            rel="noreferrer"
          >
            Leia o estudo completo e a tabela 1 →
          </a>
          <AvoidableDeaths />
        </article>
        <article className="research-card">
          <div className="eyebrow">ARTIGO CIENTÍFICO · VACCINE · 2024</div>
          <h2>Mais de 117 mil mortes evitáveis no cenário de antecipação</h2>
          <p>
            <strong>Emil Kupek, Departamento de Saúde Pública da UFSC.</strong>{" "}
            Análise de 2020 ao primeiro semestre de 2023, com regressão binomial
            negativa relacionando cobertura vacinal e desfechos graves.
          </p>
          <p>
            O cenário simula, no último trimestre de 2020, o número de vacinados
            efetivamente alcançado no primeiro trimestre de 2021. Estima mais de
            117 mil mortes e 277 mil hospitalizações evitáveis.
          </p>
          <p>
            <strong>Limite:</strong> a proteção agregada inclui efeitos de
            outras medidas, embora a regressão disponha apenas da cobertura
            vacinal. A hipótese não comprova que todas as doses estariam
            disponíveis naquele trimestre, nem isola uma decisão presidencial.
          </p>
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/38631953/"
            target="_blank"
            rel="noreferrer"
          >
            Resumo, autoria e DOI do estudo →
          </a>
        </article>
        <article className="research-card">
          <div className="eyebrow">
            DEPOIMENTO DE EPIDEMIOLOGISTA · CPI · 24/06/2021
          </div>
          <h2>Pedro Hallal e a comparação de cerca de 400 mil mortes</h2>
          <p>
            O epidemiologista e pesquisador da UFPel comparou a mortalidade
            brasileira à média mundial. No momento do depoimento, estimou cerca
            de 400 mil mortes poupadas se o país tivesse acompanhado essa média,
            defendendo vacinação tempestiva, máscaras, distanciamento e
            orientação pública.
          </p>
          <p>
            <strong>Limite:</strong> trata-se de um benchmark descritivo
            apresentado na CPI, não de um experimento ou modelo causal ajustado
            por idade, condições sociais, subnotificação e diferenças entre
            países. Não apresentamos esse número como uma medição exata do
            efeito pessoal de Bolsonaro.
          </p>
          <a
            href="https://www12.senado.leg.br/noticias/materias/2021/06/24/pesquisas-apontam-que-400-mil-mortes-poderiam-ser-evitadas-governistas-questionam"
            target="_blank"
            rel="noreferrer"
          >
            Registro do Senado, argumentos e questionamentos →
          </a>
        </article>
        <h2>Como usar estes resultados no argumento</h2>
        <p>
          A pandemia foi um choque global, mas a resposta pública influenciou
          seus danos. Os trabalhos apresentados estimam benefícios de cenários
          de vacinação e prevenção mais eficazes. A crítica às decisões do
          governo Bolsonaro deve relacionar atos documentados a esses
          mecanismos, explicitando as hipóteses e sem transformar um cenário em
          certeza individual.
        </p>
        <Link href="/pandemia#linha-do-tempo">
          Voltar à cronologia documentada das decisões →
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
