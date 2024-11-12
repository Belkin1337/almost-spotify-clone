"use server"

import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { SongEntity } from "@/types/song";

type AddSongToPlaylistQueryType = {
	songId: string,
	playlistId: string
}

export async function addSongToPlaylist({
	songId,
	playlistId,
}: AddSongToPlaylistQueryType) {
	const supabase = await createClient();
	
	const { data, error } = await supabase
	.from("song_playlists")
	.insert({
		song_id: songId, playlist_id: playlistId
	})
	.select()
	.single()
	
	if (error) throw new Error(error.message);
	
	return data as SongEntity
}