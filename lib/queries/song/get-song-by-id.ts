import { SupabaseClient } from "@supabase/supabase-js";

export function getSongById(client: SupabaseClient, songId: string) {
  return client
    .from('songs')
    .select('*')
    .eq('id', songId)
    .single();
}