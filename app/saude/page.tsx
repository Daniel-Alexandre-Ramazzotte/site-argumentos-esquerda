import Link from "next/link";
import { TopicDirectory } from "@/components/topic-directory";
export const metadata = {
  title: "Saúde: acesso, estrutura e resultados | Brasil em Evidências",
};
export default function Health() {
  return (
    <TopicDirectory
      title="Saúde"
      eyebrow="ESTRUTURA, PREVENÇÃO E QUALIDADE DE VIDA"
      scope="Saúde"
      description="Médicos e leitos por habitante, expectativa de vida, mortalidade infantil, vacinação e execução de verbas federais. Cada indicador mede uma parte do acesso e dos resultados da saúde."
    >
      <section className="method-grid">
        <article>
          <h3>Mais médicos: onde e para quem?</h3>
          <p>
            A densidade nacional não mostra a distribuição por município,
            especialidade ou atendimento ao SUS. Os anos sem observação
            continuam vazios, sem interpolação.
          </p>
        </article>
        <article>
          <h3>Hospitais, UBS e UPAs</h3>
          <p>
            Unidade cadastrada, obra concluída e serviço em funcionamento são
            situações diferentes. Consulte a página de infraestrutura para
            entender os registros e acompanhar as bases oficiais.
          </p>
          <Link href="/saude/infraestrutura">Entenda a rede e as obras →</Link>
        </article>
        <article>
          <h3>Financiamento e responsabilidades</h3>
          <p>
            O SUS tem gestão e financiamento compartilhados. A série de verbas
            abaixo cobre a União; estados e municípios também financiam e operam
            serviços.
          </p>
        </article>
      </section>
    </TopicDirectory>
  );
}
