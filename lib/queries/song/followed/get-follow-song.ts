import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { FollowedSong } from "../../../hooks/actions/song/use-follow-track";

export const getFollowSong = async (
  client: SupabaseClient,
  songId: string,
  userId: string
): Promise<PostgrestSingleResponse<FollowedSong> | null> => {
  const response = await client
    .from("liked_songs")
    .select("*")
    .eq("user_id", userId)
    .eq("song_id", songId)
    .single();

  return response;
};
