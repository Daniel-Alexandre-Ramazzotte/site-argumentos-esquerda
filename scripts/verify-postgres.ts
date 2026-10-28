import { Pool } from "pg";
async function main() {
  const reader = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const counts = await reader.query(
      `SELECT (SELECT count(*)::int FROM core.series) AS series,(SELECT count(*)::int FROM core.observations) AS observations,(SELECT count(*)::int FROM raw.documents) AS documents`,
    );
    if (counts.rows[0].series < 50 || counts.rows[0].observations < 10000)
      throw new Error("Carga incompleta");
    const access = await reader.query(
      "SELECT has_table_privilege(current_user,'core.observations','INSERT') AS can_write",
    );
    if (access.rows[0].can_write)
      throw new Error("Usuário do site não deveria gravar observações");
    const invalid = await reader.query(
      `SELECT count(*)::int AS count FROM core.observations WHERE value::text IN ('NaN','Infinity','-Infinity')`,
    );
    if (invalid.rows[0].count) throw new Error("Valores inválidos");
    const sample = await reader.query(
      `SELECT slug,period,value,unit FROM economia.observations WHERE slug='pib' AND geo_id='br' ORDER BY period DESC LIMIT 1`,
    );
    if (!sample.rowCount) throw new Error("Visão temática sem PIB");
    console.log({
      verified: true,
      ...counts.rows[0],
      siteRoleReadOnly: true,
      pib: sample.rows[0],
    });
  } finally {
    await reader.end();
  }
}
main().catch(() => {
  console.error("Falha na verificação do PostgreSQL.");
  process.exitCode = 1;
});
