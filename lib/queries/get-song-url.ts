import { SupabaseClient } from "@supabase/supabase-js";

export async function getSongUrl(client: SupabaseClient, song_path: string): Promise<string> {
  const { data } = await client.storage.from("songs").getPublicUrl(song_path);

  return data.publicUrl;
}