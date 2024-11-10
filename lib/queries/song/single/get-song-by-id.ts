"use server"

import { SongEntity } from "@/types/song";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";

export async function getSongById(
  songId: string
): Promise<SongEntity> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('id', songId)
    .single()

  if (error) {
    throw new Error(error.message)
  }
  
  return data;
}