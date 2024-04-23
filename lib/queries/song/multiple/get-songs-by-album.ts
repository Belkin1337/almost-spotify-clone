import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { SongsByAlbum } from "@/types/song";

export async function getSongsByAlbum(
	client: SupabaseClient,
	albumId: string
): Promise<PostgrestSingleResponse<SongsByAlbum[]>> {
	return client
		.from("song_albums")
		.select("*, songs(*)")
		.eq("album_id", albumId)
		.order("created_at", {
			ascending: false
		})
}