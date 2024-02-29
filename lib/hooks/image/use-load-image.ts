"use client"

import { createClient } from "@/lib/utils/supabase/client";
import { SongEntity } from "@/types/entities/song";

const supabase = createClient();

export function useLoadImage(song: SongEntity) {

  if (!song || !song.image_path) {
    return null;
  }

  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
}
