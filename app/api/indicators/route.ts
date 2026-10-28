import { getIndicators } from "@/lib/repository";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    return Response.json(await getIndicators());
  } catch {
    console.error("Falha ao consultar catálogo de indicadores no PostgreSQL");
    return Response.json(
      {
        error:
          "Banco de dados indisponível. Verifique a conexão e a importação.",
      },
      { status: 503 },
    );
  }
}
