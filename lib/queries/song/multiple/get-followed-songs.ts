import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { FollowedSongs } from "@/types/song";

export async function getFollowedSongs(
  client: SupabaseClient,
  userId?: string,
  count?: number
): Promise<PostgrestSingleResponse<FollowedSongs[]>> {
  let query = client
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (count) return query.limit(count);

  return query;
}