import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { ArtistEntity } from "@/types/artist";

type ArtistOrderByFollowersType = {
	artists: ArtistEntity[]
}

export async function getArtistsOrderByFollowers(
	client: SupabaseClient,
	count: number = 10,
): Promise<PostgrestSingleResponse<ArtistOrderByFollowersType[]>> {
	let query = client
		.from("followed_artists")
		.select("*, artists(*)")

	if (count) return query.limit(count);

	return query;
}