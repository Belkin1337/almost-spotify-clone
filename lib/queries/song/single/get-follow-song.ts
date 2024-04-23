import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { FollowedSong } from "@/components/song/child/song-follow-button/hooks/use-song-follow";

export const getFollowSong = async (
  client: SupabaseClient,
  songId: string,
  userId: string
): Promise<PostgrestSingleResponse<FollowedSong>> => {
  return client
    .from("liked_songs")
    .select("*")
    .eq("user_id", userId)
    .eq("song_id", songId)
    .single();
};