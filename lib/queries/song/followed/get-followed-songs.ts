import { SupabaseClient } from "@supabase/supabase-js";

export function getFollowedSongs(client: SupabaseClient, userId: string) {
  return client
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });
}