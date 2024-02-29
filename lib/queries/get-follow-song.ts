import { SupabaseClient, User } from "@supabase/supabase-js";

export const getFollowSong = (client: SupabaseClient, songId: string, userId: string) => {
  return client
    .from("liked_songs")
    .select("*")
    .eq("user_id", userId)
    .eq("song_id", songId)
    .single();
};