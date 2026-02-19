import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

// Singleton pattern to avoid multiple connections during Next.js hot reload
const globalForDb = globalThis as unknown as { pgClient: ReturnType<typeof postgres> };

export const pgClient =
  globalForDb.pgClient ?? postgres(connectionString);

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pgClient = pgClient;
}

export const db = drizzle(pgClient, { schema });
