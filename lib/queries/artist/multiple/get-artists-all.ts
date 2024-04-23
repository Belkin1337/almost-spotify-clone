import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { ArtistEntity } from "@/types/artist";

export async function getArtistsAll(
  client: SupabaseClient
): Promise<PostgrestSingleResponse<ArtistEntity[]>> {
  return client
    .from("artists")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
}