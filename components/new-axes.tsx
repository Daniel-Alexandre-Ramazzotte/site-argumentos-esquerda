import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  Vote,
  Route,
  ChartNoAxesCombined,
} from "lucide-react";
const axes = [
  {
    title: "Economia",
    text: "Inflação, alimentos, combustíveis por estado e região e evolução do dólar desde o Plano Real.",
    href: "/economia",
    Icon: ChartNoAxesCombined,
  },
  {
    title: "Transportes",
    text: "Rodovias, ferrovias, hidrovias, portos e aviação, com indicadores e uma cronologia de obras e entregas.",
    href: "/transportes",
    Icon: Route,
  },
  {
    title: "Emprego e renda",
    text: "Desemprego, pobreza e industrialização, com filtros territoriais nas bases disponíveis.",
    href: "/emprego-e-renda",
    Icon: BriefcaseBusiness,
  },
  {
    title: "Educação",
    text: "PISA, concluintes, criação de universidades e produção científica ao longo do tempo.",
    href: "/educacao",
    Icon: GraduationCap,
  },
  {
    title: "Ameaça à democracia",
    text: "Antecedentes, documentos, investigações e decisões sobre os atos antidemocráticos.",
    href: "/democracia",
    Icon: Landmark,
  },
  {
    title: "Pesquisas eleitorais",
    text: "Fichas técnicas, cenários comparáveis, evolução e margens de erro declaradas.",
    href: "/pesquisas-eleitorais",
    Icon: Vote,
  },
];
export function NewAxes() {
  return (
    <section className="section wrap">
      <div className="eyebrow">UM PAÍS NÃO CABE EM UMA FRASE</div>
      <h2 className="axis-title">Olhe por diferentes eixos.</h2>
      <p className="dossier-lead">
        “O país acabou” é uma avaliação retórica. Para examiná-la, é preciso
        olhar dados, períodos, avanços e problemas concretos, sem escolher
        apenas os resultados favoráveis.
      </p>
      <div className="axes-grid">
        {axes.map((a) => (
          <Link key={a.href} href={a.href} className="axis-card">
            <a.Icon size={25} />
            <h3>{a.title}</h3>
            <p>{a.text}</p>
            <span>
              Entenda este eixo
              <ArrowRight size={17} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
