"use client";
import { createContext, useContext } from "react";
import {
  realIndicator,
  realAnnualFlow,
  realValue,
} from "@/data/price-adjustment";
export type DatabaseData = {
  mobility: typeof import("@/data/mobility.json");
  prices: typeof import("@/data/price-index.json");
  budget: typeof import("@/data/budget.json");
  pandemic: typeof import("@/data/pandemic-estimates.json");
};
const Data = createContext<DatabaseData | null>(null);
export function DatabaseDataProvider({
  value,
  children,
}: {
  value: DatabaseData;
  children: React.ReactNode;
}) {
  return <Data.Provider value={value}>{children}</Data.Provider>;
}
export function useDatabaseData() {
  const data = useContext(Data);
  if (!data) throw new Error("Dados do PostgreSQL não fornecidos à página");
  return data;
}
export function usePrices() {
  const { prices } = useDatabaseData();
  return {
    realIndicator: (i: Parameters<typeof realIndicator>[0]) =>
      realIndicator(i, prices),
    realAnnualFlow: (v: number, y: number) => realAnnualFlow(v, y, prices),
    realValue: (v: number, m: string) => realValue(v, m, prices),
  };
}
