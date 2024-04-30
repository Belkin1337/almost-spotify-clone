import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { ArtistEntity } from "@/types/artist";

export async function getArtistsOrderByListeners(
	client: SupabaseClient,
	count: number = 10
): Promise<PostgrestSingleResponse<ArtistEntity[]>> {
	let query = client
		.from("listeners_artists")
		.select("*, artists(*)")

	if (count) return query.limit(count)

	return query;
}
