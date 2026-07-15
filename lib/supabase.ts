import { createClient } from "@supabase/supabase-js";
/// This is the supabase client file it reads the keys from .env and connects to supabase.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);