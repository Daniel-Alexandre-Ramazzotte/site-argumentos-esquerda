import {
  ChartNoAxesCombined,
  BriefcaseBusiness,
  Shield,
  GraduationCap,
  Route,
  HeartPulse,
  Users,
  HandHeart,
  Landmark,
} from "lucide-react";
const icons: Record<string, typeof ChartNoAxesCombined> = {
  Economia: ChartNoAxesCombined,
  "Emprego e renda": BriefcaseBusiness,
  Segurança: Shield,
  Educação: GraduationCap,
  Transporte: Route,
  Saúde: HeartPulse,
  População: Users,
  "Programas sociais": HandHeart,
};
export function TopicIcon({
  topic,
  size = 20,
}: {
  topic: string;
  size?: number;
}) {
  const Icon = icons[topic] ?? Landmark;
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}
