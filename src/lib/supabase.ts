import { createClient } from "@supabase/supabase-js";

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

// Server-side client — uses service role key, never expose to the browser.
// Supabase's Database generic doesn't thread correctly with JSONB array columns
// in the Row/Insert types; query results are typed explicitly at call sites.
export function createServerClient() {
  return createClient(
    getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } }
  );
}
