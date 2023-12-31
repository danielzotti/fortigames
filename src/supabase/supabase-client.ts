import { createClient } from "@supabase/supabase-js";
import { Database } from "~/types/database.types";

export const supabaseClient = createClient<Database>(
  import.meta.env.PUBLIC_SUPABASE_URL || "",
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "",
);
