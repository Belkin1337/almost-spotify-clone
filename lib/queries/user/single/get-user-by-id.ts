import { UserEntity } from "@/types/user";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";

export async function getUserById(
  client: SupabaseClient, 
  userId: string
): Promise<PostgrestSingleResponse<UserEntity>> {
  return client
    .from("users")
    .select("*")
    .eq('id', userId)
    .single()
}