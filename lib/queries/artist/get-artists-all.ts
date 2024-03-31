import { SupabaseClient } from "@supabase/supabase-js";

export function getArtistsAll(client: SupabaseClient) {
  return client
    .from("artists")
    .select("*")
    .order("created_at", {
      ascending: false,
    });
}