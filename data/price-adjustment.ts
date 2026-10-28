import index from "./price-index.json";
import type { Indicator } from "./historical";
export const priceBaseLabel = "dezembro de 2025";
export const priceBaseShort = "dez/2025";
const factors = new Map(index.points.map((p) => [p.month, p.factor]));
export function realValue(
  value: number,
  month: string,
  priceData = index,
): number {
  const factor =
    priceData === index
      ? factors.get(month)
      : priceData.points.find((p) => p.month === month)?.factor;
  if (factor === undefined) throw new Error(`IPCA indisponível para ${month}`);
  return value * factor;
}
export function realAnnualFlow(
  value: number,
  year: number,
  priceData = index,
): number {
  const values = priceData.points.filter((p) => p.month.startsWith(`${year}-`));
  if (values.length !== 12) throw new Error(`IPCA anual incompleto: ${year}`);
  return value / (values.reduce((sum, p) => sum + 1 / p.factor, 0) / 12);
}
export function realIndicator(
  indicator: Indicator,
  priceData = index,
): Indicator {
  if (indicator.priceBasis !== "nominal-brl") return indicator;
  const convert = (points: Indicator["points"]) =>
    points.map((p) => ({
      ...p,
      value:
        indicator.priceObservation === "annual-average"
          ? realAnnualFlow(p.value, p.year, priceData)
          : realValue(p.value, `${p.year}-12`, priceData),
    }));
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
