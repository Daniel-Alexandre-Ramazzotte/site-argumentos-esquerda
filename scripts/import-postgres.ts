import { Pool } from "pg";
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { indicators, type Indicator } from "../data/historical";
import { indicatorVariants } from "../data/variants";
import { polls } from "../data/polls";
import { checks } from "../data/checks";
import { democracyEvents } from "../data/democracy";
import {
  pandemicCommunication,
  preventionTopics,
} from "../data/pandemic-communication";
import { transportEvents } from "../data/transport-events";
async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_ADMIN_URL });
  const hash = (s: string) => createHash("sha256").update(s).digest("hex");
  const client = await pool.connect();
  const themes: Record<string, string> = {
    Economia: "economia",
    "Emprego e renda": "emprego_renda",
    Saúde: "saude",
    Educação: "educacao",
    Segurança: "seguranca",
    População: "populacao",
    Transporte: "transporte",
    "Programas sociais": "social",
  };
  function provider(i: Indicator) {
    const links = i.sources.map((s) => s.url).join(" ");
    return /tesouro|siconfi/.test(links)
      ? "tesouro"
      : /ipeadata/.test(links)
        ? "ipea"
        : /bcb.gov/.test(links)
          ? "bcb"
          : /worldbank/.test(links)
            ? "worldbank"
            : /ibge/.test(links)
              ? "ibge"
              : /receitafederal/.test(links)
                ? "receita"
                : /saude|fm.usp/.test(links)
                  ? "saude"
                  : /anp/.test(links)
                    ? "anp"
                    : "outras_fontes";
  }
  try {
    await client.query("BEGIN");
    await client.query(await readFile("database/schema.sql", "utf8"));
    const importId = (
      await client.query("INSERT INTO core.imports DEFAULT VALUES RETURNING id")
    ).rows[0].id;
    let documentCount = 0,
      seriesCount = 0,
      observationCount = 0;
    for (const file of await readdir("data")) {
      if (!file.endsWith(".json") || file.endsWith("-raw.json")) continue;
      const content = await readFile("data/" + file, "utf8");
      await client.query(
        "INSERT INTO raw.documents(name,sha256,payload,import_id) VALUES($1,$2,$3,$4) ON CONFLICT(name) DO UPDATE SET sha256=excluded.sha256,payload=excluded.payload,import_id=excluded.import_id,imported_at=now()",
        [file, hash(content), content, importId],
      );
      documentCount++;
    }
    for (const [order, base] of indicators.entries()) {
      for (const [variantOrder, i] of indicatorVariants(base).entries()) {
        const id = hash(base.slug + "|" + i.slug + "|" + i.seriesName).slice(
          0,
          28,
        );
        const { points, geographies, secondary, ...metadata } = i;
        const definition = {
          ...metadata,
          catalogOrder: order,
          variantOrder,
          frequency: i.frequency ?? "annual",
          geographies: geographies?.map(({ points, ...g }) => g),
          secondary: secondary ? { name: secondary.name } : undefined,
        };
        await client.query(
          `INSERT INTO core.series(id,parent_slug,slug,provider,theme,is_primary,definition,import_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT(id) DO UPDATE SET definition=excluded.definition,provider=excluded.provider,theme=excluded.theme,is_primary=excluded.is_primary,import_id=excluded.import_id`,
          [
            id,
            base.slug,
            i.slug,
            provider(i),
            i.category,
            variantOrder === 0,
            definition,
            importId,
          ],
        );
        const obs = new Map<
          string,
          { geo_id: string; period: string; kind: string; value: number }
        >();
        function add(geo: string, values: typeof points, kind = "primary") {
          for (const p of values) {
            if (!Number.isFinite(p.value))
              throw new Error(`Valor inválido ${i.slug}`);
            const period = `${p.year}-01-01`;
            obs.set(`${geo}|${period}|${kind}`, {
              geo_id: geo,
              period,
              kind,
              value: p.value,
            });
          }
        }
        add("br", points);
        if (secondary) add("br", secondary.points, "secondary");
        for (const g of geographies ?? []) add(g.id, g.points);
        await client.query("DELETE FROM core.observations WHERE series_id=$1", [
          id,
        ]);
        await client.query(
          `INSERT INTO core.observations(series_id,geo_id,period,kind,value) SELECT $1,x.geo_id,x.period::date,x.kind,x.value FROM jsonb_to_recordset($2::jsonb) AS x(geo_id text,period text,kind text,value numeric)`,
          [id, JSON.stringify([...obs.values()])],
        );
        seriesCount++;
        observationCount += obs.size;
      }
    }
    // Remove somente versões que não fazem mais parte desta carga completa.
    await client.query("DELETE FROM core.series WHERE import_id<>$1", [
      importId,
    ]);
    const collections = {
      polls,
      checks,
      democracy: democracyEvents,
      pandemic: pandemicCommunication,
      prevention: preventionTopics,
      transport: transportEvents,
    };
    for (const [collection, records] of Object.entries(collections)) {
      await client.query("DELETE FROM editorial.records WHERE collection=$1", [
        collection,
      ]);
      for (const [index, record] of records.entries())
        await client.query(
          "INSERT INTO editorial.records(collection,id,payload) VALUES($1,$2,$3)",
          [
            collection,
            String(
              (record as { id?: string; slug?: string }).id ??
                (record as { slug?: string }).slug ??
                index,
            ),
            record,
          ],
        );
    }
    for (const source of [
      "bcb",
      "ibge",
      "ipea",
      "worldbank",
      "tesouro",
      "receita",
      "saude",
      "anp",
      "outras_fontes",
    ]) {
      await client.query(
        `CREATE SCHEMA IF NOT EXISTS ${source}; CREATE OR REPLACE VIEW ${source}.series AS SELECT * FROM core.series WHERE provider='${source}'; CREATE OR REPLACE VIEW ${source}.observations AS SELECT * FROM core.observations_catalog WHERE provider='${source}';`,
      );
    }
    for (const [label, schema] of Object.entries(themes))
      await client.query(
        `CREATE SCHEMA IF NOT EXISTS ${schema}; CREATE OR REPLACE VIEW ${schema}.observations AS SELECT * FROM core.observations_catalog WHERE theme='${label.replaceAll("'", "''")}';`,
      );
    await client.query(
      `CREATE OR REPLACE VIEW bcb.monthly_credit AS SELECT item.key AS sgs_code,point->>'month' AS month,(point->>'value')::numeric AS value FROM raw.documents d CROSS JOIN LATERAL jsonb_each(d.payload) item CROSS JOIN LATERAL jsonb_array_elements(item.value->'monthly') point WHERE d.name='household-credit.json';`,
    );
    await client.query(
      "UPDATE core.imports SET completed_at=now(),series_count=$2,observation_count=$3,document_count=$4 WHERE id=$1",
      [importId, seriesCount, observationCount, documentCount],
    );
    if (process.env.DATABASE_READER_PASSWORD) {
      if (
        !(
          await client.query(
            "SELECT 1 FROM pg_roles WHERE rolname='brasil_reader'",
          )
        ).rowCount
      ) {
        const sql = (
          await client.query(
            "SELECT format('CREATE ROLE brasil_reader LOGIN PASSWORD %L',$1::text) AS sql",
            [process.env.DATABASE_READER_PASSWORD],
          )
        ).rows[0].sql;
        await client.query(sql);
      }
      const grant = (
        await client.query(
          "SELECT format('GRANT CONNECT ON DATABASE %I TO brasil_reader',current_database()) AS sql",
        )
      ).rows[0].sql;
      await client.query(grant);
      for (const schema of new Set([
        "core",
        "raw",
        "editorial",
        ...Object.values(themes),
        "bcb",
        "ibge",
        "ipea",
        "worldbank",
        "tesouro",
        "receita",
        "saude",
        "anp",
        "outras_fontes",
      ]))
        await client.query(
          `GRANT USAGE ON SCHEMA ${schema} TO brasil_reader; GRANT SELECT ON ALL TABLES IN SCHEMA ${schema} TO brasil_reader;`,
        );
    }
    await client.query("COMMIT");
    console.log({
      series: seriesCount,
      observations: observationCount,
      documents: documentCount,
      importId,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}
main().catch((error) => {
  console.error("Falha na importação PostgreSQL. A transação foi revertida.", {
    code: error.code,
    message: error.message,
  });
  process.exitCode = 1;
});
