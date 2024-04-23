import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { ArtistEntity } from "@/types/artist";

export async function getArtistById(
  client: SupabaseClient,
  artistId: string
): Promise<PostgrestSingleResponse<ArtistEntity>> {
  return client
    .from("artists")
    .select("*")
    .eq("id", artistId)
    .single();
}