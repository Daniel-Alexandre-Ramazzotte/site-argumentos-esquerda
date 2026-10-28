import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
  Vote,
  Route,
  ChartNoAxesCombined,
  HeartPulse,
  HandHeart,
  Users,
  Shield,
  BookOpen,
} from "lucide-react";
const axes = [
  {
    title: "Programas sociais",
    text: "Bolsa Família, BPC, auxílios e incentivos educacionais: regras, alcance e recursos.",
    href: "/programas-sociais",
    Icon: HandHeart,
  },
  {
    title: "Saúde",
    text: "Médicos, leitos, vacinação, expectativa de vida, mortalidade infantil e financiamento público.",
    href: "/saude",
    Icon: HeartPulse,
  },
  {
    title: "População",
    text: "Crescimento, natalidade, mortalidade, filhos por mulher e envelhecimento da população.",
    href: "/populacao",
    Icon: Users,
  },
  {
    title: "Segurança",
    text: "Violência, verbas federais e responsabilidades de cada esfera de governo.",
    href: "/seguranca",
    Icon: Shield,
  },
  {
    title: "Como o Brasil funciona",
    text: "Papel do presidente, Congresso e Justiça; competências de União, estados e municípios.",
    href: "/como-funciona",
    Icon: BookOpen,
  },
  {
    title: "Economia",
    text: "Inflação, alimentos, combustíveis por estado e região e evolução do dólar desde o Plano Real.",
    href: "/economia",
    Icon: ChartNoAxesCombined,
  },
  {
    title: "Transporte",
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
      <ThemeCards />
    </section>
  );
}

export function ThemeCards() {
  return (
    <div className="axes-grid theme-cards">
      {axes.map((a) => (
        <Link key={a.href} href={a.href} className="axis-card">
          <a.Icon size={52} aria-hidden="true" />
          <h3>{a.title}</h3>
          <p>{a.text}</p>
          <span>
            Entenda este eixo
            <ArrowRight size={17} />
          </span>
        </Link>
      ))}
    </div>
  );
}
