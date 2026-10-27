import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { IndicatorLibrary } from "@/components/indicator-library";
import {
  InteractiveTimeline,
  type TimelineEvent,
} from "@/components/interactive-timeline";
const events: TimelineEvent[] = [
  {
    id: "unb",
    date: "15 DEZ 1961",
    topic: "Criação por lei",
    title: "Autorização para instituir a Universidade de Brasília",
    body: "A Lei 3.998 autorizou o Poder Executivo a instituir a Fundação Universidade de Brasília. O marco legal antecede a ditadura iniciada em 1964.",
    context:
      "Criação por lei, início de atividades, inauguração de campus e expansão de vagas são acontecimentos diferentes.",
    limit:
      "Esta cronologia é uma seleção documentada de instituições; não representa uma contagem completa das universidades brasileiras.",
    sources: [
      {
        label: "Planalto · Lei 3.998/1961",
        url: "https://www.planalto.gov.br/ccivil_03/leis/1950-1969/l3998.htm",
      },
    ],
  },
  {
    id: "ufabc",
    date: "26 JUL 2005",
    topic: "Criação por lei",
    title: "Criação da Universidade Federal do ABC",
    body: "A Lei 11.145 instituiu a Fundação Universidade Federal do ABC, vinculada ao Ministério da Educação.",
    context:
      "O ato legal permite identificar a data e o objeto da criação, em vez de confundir instituições novas com novos campi de universidades existentes.",
    limit:
      "A lei de criação não mede, isoladamente, vagas efetivamente ofertadas, concluintes ou qualidade da formação.",
    sources: [
      {
        label: "Câmara · Lei 11.145/2005",
        url: "https://www2.camara.leg.br/legin/fed/lei/2005/lei-11145-26-julho-2005-537923-norma-pl.html",
      },
    ],
  },
  {
    id: "unila",
    date: "12 JAN 2010",
    topic: "Criação por lei",
    title: "Criação da Universidade Federal da Integração Latino-Americana",
    body: "A Lei 12.189 criou a UNILA, com sede em Foz do Iguaçu, no Paraná.",
    context:
      "Universidades podem ter projetos institucionais e missões específicas. A contagem de instituições não substitui a análise de alcance e resultados.",
    limit:
      "Não somamos esse evento a uma suposta série anual completa de criações.",
    sources: [
      {
        label: "Planalto · Lei 12.189/2010",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12189.htm",
      },
    ],
  },
  {
    id: "unilab",
    date: "20 JUL 2010",
    topic: "Criação por lei",
    title:
      "Criação da Universidade da Integração Internacional da Lusofonia Afro-Brasileira",
    body: "A Lei 12.289 criou a UNILAB, com sede em Redenção, no Ceará.",
    context:
      "A instituição integra a expansão e diversificação do sistema federal. Seu desempenho requer indicadores próprios de acesso, permanência, formação e pesquisa.",
    limit:
      "Data de criação por lei, sem atribuição automática de todos os resultados posteriores ao governo daquela data.",
    sources: [
      {
        label: "Planalto · Lei 12.289/2010",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12289.htm",
      },
    ],
  },
  {
    id: "ufnt",
    date: "08 JUL 2019",
    topic: "Criação por lei",
    title: "Criação da Universidade Federal do Norte do Tocantins",
    body: "A Lei 13.856 criou a UFNT por desmembramento de estruturas da Universidade Federal do Tocantins.",
    context:
      "O caso ilustra por que criar uma instituição por desmembramento não equivale necessariamente a construir todos os seus campi do zero.",
    limit:
      "A origem institucional deve acompanhar o número de universidades para evitar contagens enganosas de expansão física.",
    sources: [
      {
        label: "Planalto · Lei 13.856/2019",
        url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13856.htm",
      },
    ],
  },
];
export const metadata = {
  title: "Educação: aprendizagem, formação e ciência | Brasil em Evidências",
};
export default function Education() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="wrap section directory-page">
          <div className="eyebrow">APRENDIZAGEM, FORMAÇÃO E CIÊNCIA</div>
          <h1>Educação em perspectiva.</h1>
          <p className="page-deck">
            Aumentar o acesso, formar mais pessoas e melhorar a aprendizagem são
            objetivos relacionados, mas não equivalentes. Aqui cada eixo tem uma
            série própria, com avanços e limitações à vista.
          </p>
          <IndicatorLibrary scope="Educação" />
        </section>
        <section className="dossier-section">
          <div className="wrap section">
            <div className="eyebrow">INSTITUIÇÕES E EXPANSÃO</div>
            <h2 className="axis-title">Universidades: marcos de criação.</h2>
            <p className="page-deck">
              Seleção de atos legais de diferentes períodos. A cronologia
              distingue a criação de uma universidade da abertura de cursos,
              campi e vagas.
            </p>
            <InteractiveTimeline
              events={events}
              label="Criação de universidades"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
