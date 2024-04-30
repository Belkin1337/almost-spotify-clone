import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { ArtistEntity } from "@/types/artist";

export async function getArtistsAll(
  client: SupabaseClient,
  count: number = 10,
): Promise<PostgrestSingleResponse<ArtistEntity[]>> {
  let query = client
    .from("artists")
    .select("*")
    .order("created_at", {
      ascending: false,
    })

  if (count) return query.limit(count)

  return query;
}