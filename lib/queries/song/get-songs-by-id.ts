import { SongEntity } from "@/types/entities/song";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getSongsById(
  client: SupabaseClient, 
  songIds: string[]
): Promise<SongEntity[]> {
  try {
    const songsPromises = songIds.map(songId =>
      client
        .from("songs")
        .select("*")
        .eq("id", songId)
        .single()
    );

    const songsResponses = await Promise.all(songsPromises);
    const songs: SongEntity[] = songsResponses.map(response => response.data as SongEntity);

    return songs;
  } catch (error) {
    throw error;
  }
}