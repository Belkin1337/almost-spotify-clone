"use server"

import { createClient } from "@/lib/utils/supabase/server/supabase-server";

type CreatePlaylistQueryType = {
	userId: string,
	title: string
}

export async function createPlaylist({
	userId, title
}: CreatePlaylistQueryType) {
	const supabase = await createClient();
	
	const { data, error } = await supabase
	.from("playlists")
	.insert({
		user_id: userId,
		title: title
	})
	.select();
	
	if (error) throw new Error(error.message)
	
	return data
}