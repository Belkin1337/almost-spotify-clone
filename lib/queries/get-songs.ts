import { SupabaseClient } from "@supabase/supabase-js";

export function getSongsAll(client: SupabaseClient) {
  return client
    .from("songs")
    .select("*")
    .order("created_at", {
      ascending: false,
    });
}