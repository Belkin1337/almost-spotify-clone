import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { SongEntity } from "@/types/song";

type SongsByArtist = {
	artist_id: string,
	songs: SongEntity[]
}

export async function getSongsByArtist(
	client: SupabaseClient,
	artistId: string,
	count?: number,
): Promise<PostgrestSingleResponse<SongsByArtist[]>> {
	let query =  client
		.from("song_artists")
		.select("*, songs(*)")
		.eq("artist_id", artistId)
		.order("created_at", {
			ascending: false,
		});

	if (count) {
		return query.limit(count)
	} else {
		return query;
	}
}