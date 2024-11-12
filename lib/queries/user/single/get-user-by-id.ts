"use server"

import { UserEntity } from "@/types/user";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";

export async function getUserById(userId: string): Promise<UserEntity> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq('id', userId)
    .single()
  
  if (error) {
    throw new Error(error.message)
  }
  
  return data;
}