"use server"

import { createClient } from "@/lib/utils/supabase/server/supabase-server";

type CreatePlaylistImageQueryType = {
	imagePath: string,
	playlistId: string
}

export async function createPlaylistImage({
	imagePath, playlistId
}: CreatePlaylistImageQueryType) {
	const supabase = await createClient();
	
	const { data, error } = await supabase
	.from("playlists")
	.update({
		image_path: imagePath
	})
	.eq("id", playlistId)
	.select()
	.single()
	
	if (error) throw new Error(error.message);
	
	return data
}