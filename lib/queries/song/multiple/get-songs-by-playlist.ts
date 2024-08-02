import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { SongEntity } from "@/types/song";

export type SongsByPlaylist = {
	playlist_id: string,
	songs: SongEntity[]
}

export async function getSongsByPlaylist(
	client: SupabaseClient,
	playlistId: string
): Promise<PostgrestSingleResponse<SongsByPlaylist[]>> {
	return client
		.from("song_playlists")
		.select("*, songs(*)")
		.eq("playlist_id", playlistId)
		.order("created_at", {
			ascending: false
		})
}