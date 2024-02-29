import { User } from "@supabase/supabase-js";

export interface UserEntity {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
}

export interface UserGeneric extends User, UserEntity {}