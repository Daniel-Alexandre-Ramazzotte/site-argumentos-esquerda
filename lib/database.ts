import { Pool } from "pg";
const globalDb = globalThis as unknown as { perspectivePool?: Pool };
export function database() {
  if (!process.env.DATABASE_URL)
    throw new Error(
      "DATABASE_URL não configurada. Execute npm run db:setup e npm run db:import.",
    );
  return (globalDb.perspectivePool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 8,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
  }));
}
