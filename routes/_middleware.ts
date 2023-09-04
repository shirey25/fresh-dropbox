// deno-lint-ignore-file no-explicit-any

import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getCookies } from "$std/http/cookie.ts";

export interface State {
  token: string | null;
  supabaseClient: SupabaseClient<any, "public", any>;
}

export async function handler(req: Request, ctx: MiddlewareHandlerContext<State>) {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseKey = Deno.env.get("SUPABASE_KEY") || "";
  const client = createClient(supabaseUrl, supabaseKey);

  ctx.state.supabaseClient = client;

  const supaCreds = getCookies(req.headers)["supaLogin"];

  if (!supaCreds) {
    return ctx.next();
  }

  // Replaced `getUser` with `api.getUser` as `getUser` is not a direct method on the Supabase client
  const { data, error } = await client.auth.api.getUser(supaCreds);

  if (error) {
    console.log(error.message);
    ctx.state.token = null;
  } else {
    ctx.state.token = supaCreds;
  }

  return await ctx.next();
}