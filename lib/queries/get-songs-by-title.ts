import { createClient } from "@/lib/utils/supabase/client";
import { getSongsAll } from "./get-songs";
import { SupabaseClient } from "@supabase/supabase-js";

export function getSongsByTitle(client: SupabaseClient, title: string) {
  return client
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", {
      ascending: false,
    });
}