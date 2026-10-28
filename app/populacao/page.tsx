import { TopicDirectory } from "@/components/topic-directory";
export const metadata = {
  title: "População e transição demográfica | Brasil em Evidências",
};
export default function Population() {
  return (
    <TopicDirectory
      title="População"
      eyebrow="NASCER, VIVER E ENVELHECER"
      scope="População"
      description="Como o Brasil cresceu e como sua estrutura demográfica está mudando. Explore população, crescimento, natalidade, mortalidade, filhos por mulher e envelhecimento, com histórico desde 1960 quando disponível."
    />
  );
}
