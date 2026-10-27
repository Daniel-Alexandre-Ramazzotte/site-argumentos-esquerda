import index from "./price-index.json";
import type { Indicator } from "./historical";
export const priceBaseLabel = "dezembro de 2025";
export const priceBaseShort = "dez/2025";
const factors = new Map(index.points.map((p) => [p.month, p.factor]));
export function realValue(value: number, month: string): number {
  const factor = factors.get(month);
  if (factor === undefined) throw new Error(`IPCA indisponível para ${month}`);
  return value * factor;
}
export function realIndicator(indicator: Indicator): Indicator {
  if (indicator.priceBasis !== "nominal-brl") return indicator;
  const convert = (points: Indicator["points"]) =>
    points.map((p) => ({ ...p, value: realValue(p.value, `${p.year}-12`) }));
  return {
    ...indicator,
    priceBasis: "constant",
    unit: indicator.unit.replace("R$", `R$ de ${priceBaseShort}`),
    points: convert(indicator.points),
    secondary: indicator.secondary
      ? { ...indicator.secondary, points: convert(indicator.secondary.points) }
      : undefined,
  };
}
