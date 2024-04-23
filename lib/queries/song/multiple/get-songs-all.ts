import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { SongEntity } from "@/types/song";

export async function getSongsAll(
  client: SupabaseClient,
  count?: number
): Promise<PostgrestSingleResponse<SongEntity[]>> {
  let query = client
    .from("songs")
    .select("*")
    .order("created_at", {
      ascending: false,
    })

  if (count) {
    return query.limit(count)
  } else {
    return query;
  }
}