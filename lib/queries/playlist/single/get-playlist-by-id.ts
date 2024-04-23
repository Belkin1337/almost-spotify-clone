import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { PlaylistEntity } from "@/types/playlist";

export async function getPlaylistById(
	client: SupabaseClient,
	playlistId: string
): Promise<PostgrestSingleResponse<PlaylistEntity>> {
	return client
		.from("playlists")
		.select("*")
		.eq("id", playlistId)
		.single()
}