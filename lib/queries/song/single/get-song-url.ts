import { SupabaseClient } from "@supabase/supabase-js";

export async function getSongUrl(
  client: SupabaseClient, 
  song_path: string
) {
  return client
    .storage
    .from("songs")
    .getPublicUrl(song_path)
}