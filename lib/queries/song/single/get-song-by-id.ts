import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { SongEntity } from "@/types/song";

export async function getSongById(
  client: SupabaseClient,
  songId: string
): Promise<PostgrestSingleResponse<SongEntity>> {
  return client
    .from('songs')
    .select('*')
    .eq('id', songId)
    .single();
}