import { notFound } from "next/navigation";
import { indicatorGroups } from "@/data/indicator-groups";
import { GroupPage } from "@/components/group-page";
export function generateStaticParams() {
  return indicatorGroups
    .filter((g) => g.category === "Economia" && g.slug !== "divida")
    .map((g) => ({ tema: g.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ tema: string }>;
}) {
  const { tema } = await params;
  const group = indicatorGroups.find(
    (g) => g.category === "Economia" && g.slug === tema,
  );
  if (!group) notFound();
  return <GroupPage group={group} />;
}
