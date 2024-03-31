import { SupabaseClient } from "@supabase/supabase-js";

export function getArtistById(client: SupabaseClient, artistId: string) {
  return client.from("artists").select("*").eq("id", artistId).single();
}