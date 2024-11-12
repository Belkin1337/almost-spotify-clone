"use server"

import { createClient } from "@/lib/utils/supabase/server/supabase-server";

type CreatePlaylistUsersQueryType = {
	playlistId: string,
	userId: string
}

export async function createPlaylistUsers({
	userId, playlistId
}: CreatePlaylistUsersQueryType) {
	const supabase = await createClient();
	
	const { error } = await supabase
	.from("playlists_users")
	.insert({
		playlist_id: playlistId,
		user_id: userId
	})
	
	if (error) throw new Error(error.message);
}