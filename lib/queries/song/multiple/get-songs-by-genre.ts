import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { SongEntity } from "@/types/song";

export async function getSongsByGenre(
	client: SupabaseClient,
	genreId: string,
	count?: number
): Promise<PostgrestSingleResponse<SongEntity[]>> {
	let query = client
		.from("songs")
		.select("*")
		.eq("genre", genreId)

	if (count) {
		return query.limit(count)
	} else {
		return query;
	}
}