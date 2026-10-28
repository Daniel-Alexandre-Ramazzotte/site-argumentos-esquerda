import Link from "next/link";
import { indicatorGroups, groupHref } from "@/data/indicator-groups";
import { TopicIcon } from "./topic-icon";
export function TopicGroups({ category }: { category: string }) {
  return (
    <section className="axes-grid">
      {indicatorGroups
        .filter((g) => g.category === category)
        .map((g) => (
          <Link key={g.slug} className="axis-card" href={groupHref(g)}>
            <TopicIcon topic={category} size={25} />
            <h3>{g.title}</h3>
            <p>{g.description}</p>
            <span>Escolha e compare as séries →</span>
          </Link>
        ))}
      {category === "Economia" &&
        [
          {
            title: "Orçamento federal",
            href: "/economia/orcamento",
            description: "Fatias e evolução das despesas por função e etapa.",
          },
          {
            title: "Dólar",
            href: "/indicadores/dolar",
            description:
              "Média e fechamento mensal, com valores nominais ou corrigidos.",
          },
          {
            title: "Combustíveis",
            href: "/indicadores/combustiveis",
            description: "Preços por produto, estado e região.",
          },
          {
            title: "Conta corrente",
            href: "/indicadores/conta-corrente",
            description:
              "Saldo de transações correntes com o exterior em relação ao PIB.",
          },
        ].map((g) => (
          <Link className="axis-card" href={g.href} key={g.href}>
            <TopicIcon topic={category} size={25} />
            <h3>{g.title}</h3>
            <p>{g.description}</p>
            <span>Explorar os dados →</span>
          </Link>
        ))}
    </section>
  );
}
