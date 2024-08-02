import { User } from "@supabase/supabase-js";

export interface UserEntity extends User {
  id: string;
  full_name: string;
  avatar_url?: string;
  attributes?: {
    is_public: boolean,
    is_shuffle: boolean
  }
}

export interface FollowedUsersEntity {
  id: string,
  user_id: string,
  subscriber_id: string,
  created_at?: string
}