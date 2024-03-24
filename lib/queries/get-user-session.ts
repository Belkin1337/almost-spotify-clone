import { UserGeneric } from "@/types/entities/user";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";

export async function getUser(
  client: SupabaseClient, 
  userSessionId: string
): Promise<PostgrestSingleResponse<UserGeneric>> { 
  return await client
    .from("users")
    .select("*")
    .eq("id", userSessionId)
    .single();
}