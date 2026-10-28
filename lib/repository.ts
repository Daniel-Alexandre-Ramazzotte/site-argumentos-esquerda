import { cache } from "react";
import type { Indicator } from "@/data/historical";
import { database } from "./database";
type Stored = {
  id: string;
  definition: Omit<Indicator, "points">;
  parent_slug: string;
  is_primary: boolean;
};
export const getIndicators = cache(
  async (parentSlug?: string): Promise<Indicator[]> => {
    const pool = database();
    const rows = (
      await pool.query<Stored>(
        `SELECT id,definition,parent_slug,is_primary FROM core.series WHERE ${parentSlug ? "parent_slug=$1" : "is_primary=true"} ORDER BY (definition->>'catalogOrder')::int NULLS LAST,(definition->>'variantOrder')::int NULLS LAST,id`,
        parentSlug ? [parentSlug] : [],
      )
    ).rows;
    if (!rows.length) return [];
    const observations = (
      await pool.query<{
        series_id: string;
        geo_id: string;
        kind: string;
        year: number;
        value: string;
      }>(
        `SELECT series_id,geo_id,kind,extract(year from period)::int AS year,value::text FROM core.observations WHERE series_id=ANY($1::text[]) ORDER BY period`,
        [rows.map((r) => r.id)],
      )
    ).rows;
    return rows.map((row) => {
      const points = (geo: string, kind = "primary") =>
        observations
          .filter(
            (o) =>
              o.series_id === row.id && o.geo_id === geo && o.kind === kind,
          )
          .map((o) => ({ year: o.year, value: Number(o.value) }));
      const definition = row.definition;
      return {
        ...definition,
        points: points("br"),
        secondary: definition.secondary
          ? {
              name: definition.secondary.name,
              points: points("br", "secondary"),
            }
          : undefined,
        geographies: definition.geographies?.map((g) => ({
          ...g,
          points: points(g.id),
        })),
      } as Indicator;
    });
  },
);
export async function getIndicator(slug: string) {
  return (await getIndicators()).find((i) => i.slug === slug);
}
export const getDocument = cache(async <T>(name: string): Promise<T> => {
  const result = await database().query(
    "SELECT payload FROM raw.documents WHERE name=$1",
    [name],
  );
  if (!result.rows[0]) throw new Error(`Documento não importado: ${name}`);
  return result.rows[0].payload as T;
});
export async function getRecords<T>(collection: string): Promise<T[]> {
  return (
    await database().query(
      "SELECT payload FROM editorial.records WHERE collection=$1 ORDER BY id",
      [collection],
    )
  ).rows.map((r) => r.payload as T);
}
