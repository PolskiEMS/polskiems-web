import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("Missing DATABASE_URL environment variable");
  }

  if (!_db) {
    const client = postgres(url, {
      prepare: false,
      ssl: "require",
      max: 1,
      idle_timeout: 5,
      connect_timeout: 5,
      max_lifetime: 300,
      connection: {
        application_name: "polskiems-vercel",
        statement_timeout: "15000",
      },
    });

    _db = drizzle(client);
  }

  return _db;
}
