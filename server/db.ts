import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "../shared/schema";
import { getDatabaseUrl } from "../shared/supabase";

const DATABASE_URL = getDatabaseUrl();

console.log('Connecting to database with URL:', DATABASE_URL.replace(/:([^:@]+)@/, ':***@'));

const sql = postgres(DATABASE_URL, {
  max: 20,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
  connection: {
    application_name: 'las-tortillas-app'
  }
});

export const db = drizzle(sql, { schema });

// Test connection
export const testConnection = async () => {
  try {
    await sql`SELECT 1`;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};