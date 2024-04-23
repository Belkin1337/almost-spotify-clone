import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { AlbumBySong } from "@/types/album";

export async function getAlbumBySong(
	client: SupabaseClient,
	songId: string
): Promise<PostgrestSingleResponse<AlbumBySong[]>> {
	return client
		.from("song_albums")
		.select("*, albums(*)")
		.eq("song_id", songId)
		.order("created_at", {
			ascending: false
		})
}