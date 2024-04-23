import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { FollowedSongs } from "@/types/song";

export async function getFollowedSongs(
  client: SupabaseClient,
  userId: string
): Promise<PostgrestSingleResponse<FollowedSongs[]>> {
  return client
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });
}