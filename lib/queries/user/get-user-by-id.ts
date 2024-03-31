import { UserGeneric } from "@/types/entities/user";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";

export async function getUserById(
  client: SupabaseClient, 
  userId: string
): Promise<PostgrestSingleResponse<UserGeneric>> {
  return client
    .from("users")
    .select("*")
    .eq('id', userId)
    .single()
}