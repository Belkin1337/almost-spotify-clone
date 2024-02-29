import { SupabaseClient } from "@supabase/supabase-js";

export function getSongsByUserId(client: SupabaseClient, userId: string) {
  return client
    .from("songs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });
}