// supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_KEY"),
  {
    localStorage: window.localStorage,
    persistSession: true,
  },
);

export default supabaseClient;
