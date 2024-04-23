import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { AlbumEntity } from "@/types/album";

type AlbumsByArtist = {
	artist_id: string,
	created_at: string,
	albums: AlbumEntity[]
}

export async function getAlbumsByArtist(
	client: SupabaseClient,
	artistId: string,
	count?: number
): Promise<PostgrestSingleResponse<AlbumsByArtist[]>> {
	let query = client
		.from("album_artists")
		.select("*, albums(*)")
		.eq("artist_id", artistId)

	if (count) {
		return query.limit(count)
	} else {
		return query;
	}
}