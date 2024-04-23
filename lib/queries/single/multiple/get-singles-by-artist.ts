import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { SingleEntity } from "@/types/single";

type SinglesByArtist = {
	artist_id: string,
	singles: SingleEntity[]
}

export async function getSinglesByArtist(
	client: SupabaseClient,
	artistId: string,
	count?: number
): Promise<PostgrestSingleResponse<SinglesByArtist[]>> {
	let query = client
		.from("singles_artists")
		.select("*, singles(*)")
		.eq("artist_id", artistId)

	if (count) {
		return query.limit(count)
	} else {
		return query;
	}
}