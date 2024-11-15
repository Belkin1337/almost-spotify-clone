"use server"

import { SongEntity } from "@/types/song";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";

export async function getFollowedSongs(
  userId: string, count?: number
): Promise<SongEntity[]> {
  const supabase = await createClient()
  
  let query = supabase
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (count) query.limit(count);

  const { data, error } = await query;
  
  if (error) {
    throw new Error(error.message)
  }
  
  return data.flatMap(item => item.songs);
}