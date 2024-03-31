import { SupabaseClient } from "@supabase/supabase-js";

export function getArtistsByUserId(client: SupabaseClient, userId: string) {
  return client
    .from("artists")
    .select("*")
    .eq('user_id', userId)
    .order("created_at", {
      ascending: false,
    });
}