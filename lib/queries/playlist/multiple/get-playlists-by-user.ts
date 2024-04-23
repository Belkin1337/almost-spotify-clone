import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { PlaylistEntity } from "@/types/playlist";

export async function getPlaylistsByUser(
	client: SupabaseClient,
	userId?: string,
	show_hidden_playlists?: boolean,
	count?: number
): Promise<PostgrestSingleResponse<PlaylistEntity[]>> {
	let query = client
		.from("playlists")
		.select("*")
		.eq("user_id", userId)

	// по умолчанию show_hidden_playlists = false / count = null
	//
	// show_hidden_playlists = если true - показывать приватные плейлисты юзера, иначе скрывать
	// count - кол-во выводимых элементов в результате запроса

	if (show_hidden_playlists) {
		if (count) {
			return query.limit(count)
		} else {
			return query
		}
	} else {
		if (count) {
			return query.contains("attributes", {
				is_public: true
			}).limit(count)
		} else {
			return query.contains("attributes", {
				is_public: true
			})
		}
	}
}