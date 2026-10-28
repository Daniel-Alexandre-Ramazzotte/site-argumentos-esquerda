import { TopicDirectory } from "@/components/topic-directory";
export const metadata = {
  title: "Segurança e verbas federais | Brasil em Evidências",
};
export default function Security() {
  return (
    <TopicDirectory
      title="Segurança"
      eyebrow="VIOLÊNCIA, RECURSOS E RESPONSABILIDADES"
      scope="Segurança"
      description="Consulte a evolução da violência e das despesas federais em segurança pública. As polícias estaduais e os governos locais têm responsabilidades próprias; a série orçamentária da União não representa todo o gasto nacional."
    />
  );
}
