import { SupabaseClient } from "@supabase/supabase-js";

export function getUserById(client: SupabaseClient, userId: string) {
  return client
    .from("users")
    .select("*")
    .eq('id', userId)
    .single()
}