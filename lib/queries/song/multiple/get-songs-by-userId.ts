import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { SongEntity } from "@/types/song";

type GetSongsByUserReq = {
  client: SupabaseClient;
  userId: string;
  order?: 'from_the_end' | 'at_first'
};

export async function getSongsByUserId({
  client, 
  userId, 
  order 
}: GetSongsByUserReq): Promise<PostgrestSingleResponse<SongEntity[]>> {
  let query = client
    .from("songs")
    .select("*")
    .eq("user_id", userId);

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