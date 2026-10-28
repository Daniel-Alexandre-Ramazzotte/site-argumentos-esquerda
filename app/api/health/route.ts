import { database } from "@/lib/database";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const { rows } = await database().query(
      "SELECT completed_at,series_count,observation_count FROM core.imports WHERE completed_at IS NOT NULL ORDER BY id DESC LIMIT 1",
    );
    return Response.json({ database: "ok", import: rows[0] ?? null });
  } catch {
    return Response.json({ database: "unavailable" }, { status: 503 });
  }
}
