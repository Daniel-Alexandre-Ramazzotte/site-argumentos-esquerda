import { GroupPage } from "@/components/group-page";
import { indicatorGroups } from "@/data/indicator-groups";
import { getDocument } from "@/lib/repository";
type Physicians = typeof import("@/data/physicians.json");
export const metadata = {
  title: "Médicos: total, formação e atuação | Brasil em Evidências",
};
export default async function Doctors() {
  const data = await getDocument<Physicians>("physicians.json");
  return (
    <GroupPage group={indicatorGroups.find((g) => g.slug === "medicos")!}>
      <section className="method-grid">
        <article>
          <h3>Atuação independente</h3>
          <p>
            As bases importadas não oferecem uma série anual comparável de
            autônomos. Subtrair médicos com emprego formal do total não resolve:
            o restante pode incluir PJ, vínculos indiretos e outras situações.
          </p>
        </article>
        <article>
          <h3>Público e privado se sobrepõem</h3>
          <p>
            A mesma pessoa pode trabalhar nos dois setores. A natureza jurídica
            do empregador também não define se o atendimento é SUS: uma
            organização social privada pode operar um serviço público.
          </p>
        </article>
        <article>
          <h3>Fontes compatíveis</h3>
          <p>
            As linhas de total e densidade nesta comparação usam a Demografia
            Médica 2025. O ponto de 2024 é estimado. A série internacional
            anterior permanece disponível em sua metodologia própria, sem
            emenda.
          </p>
        </article>
      </section>
      <details className="research-card">
        <summary>Contratação por tipo de empregador · retrato de 2023</summary>
        <p>
          São <strong>vínculos formais</strong>, não pessoas únicas ou uma série
          anual de público/privado. Do total de 255.199 vínculos, 184.299
          pertenciam ao setor público, incluindo empresas estatais.
        </p>
        <table>
          <thead>
            <tr>
              <th>Empregador</th>
              <th>Vínculos formais</th>
            </tr>
          </thead>
          <tbody>
            {data.employers2023.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td>{r.value.toLocaleString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Fonte: Demografia Médica 2025, página 284, tabela 3, RAIS/MTE e
          GPDES/IESC/UFRJ. O retrato não inclui toda contratação por PJ ou
          cooperativa e não é uma contagem de quem atua exclusivamente no SUS ou
          em planos privados.
        </p>
        <a href={data.source} target="_blank" rel="noreferrer">
          Publicação e método completos →
        </a>
      </details>
    </GroupPage>
  );
}
