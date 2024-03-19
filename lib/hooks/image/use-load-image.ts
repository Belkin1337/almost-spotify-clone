"use client"

import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export function useLoadImage(image_path: string) {
  if (!image_path) return;

  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(image_path);

  return imageData.publicUrl;
}