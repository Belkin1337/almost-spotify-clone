"use server"

import { PlaylistEntity } from "@/types/playlist";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";

export type GetPlaylistsByUser = {
	userId: string,
	show_hidden_playlists?: boolean,
	count?: number
}

export async function getPlaylistsByUser({
	userId, show_hidden_playlists, count
}: GetPlaylistsByUser): Promise<PlaylistEntity[]> {
	const supabase = await createClient()
	
	let query = supabase
	.from("playlists")
	.select("*")
	.eq("user_id", userId)
	
	// по умолчанию show_hidden_playlists = false / count = null
	//
	// show_hidden_playlists = если true - показывать приватные плейлисты юзера, иначе скрывать
	// count - кол-во выводимых элементов в результате запроса
	
	if (show_hidden_playlists) {
		if (count) query.limit(count)
	} else {
		if (count) {
			query.contains("attributes", { is_public: true }).limit(count)
		} else {
			query.contains("attributes", { is_public: true })
		}
	}
	
	const { data, error } = await query;
	
	if (error) {
		throw new Error(error.message)
	}
	
	return data;
}