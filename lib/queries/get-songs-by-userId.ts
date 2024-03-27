import { SupabaseClient } from "@supabase/supabase-js";

type GetSongsByUserReq = {
  client: SupabaseClient;
  userId: string;
  order?: 'from_the_end' | 'at_first'
};

export function getSongsByUserId({ 
  client, 
  userId, 
  order 
}: GetSongsByUserReq) {
  let query = client.from("songs").select("*").eq("user_id", userId);

  if (order) {
    if (order === 'at_first') {
      query = query.order("created_at", {
        ascending: true,
      });
    } else {
      query = query.order("created_at", {
        ascending: false,
      });
    }
  } else {
    query = query.order("created_at", {
      ascending: false,
    });
  }

  return query;
}