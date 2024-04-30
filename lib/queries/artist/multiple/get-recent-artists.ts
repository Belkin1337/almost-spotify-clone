import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { ArtistEntity } from "@/types/artist";

type RecentArtists = {
	user_id: string,
	artists: ArtistEntity[]
}

export async function getRecentArtists(
	client: SupabaseClient,
	userId: string,
	count?: number
): Promise<PostgrestSingleResponse<RecentArtists[]>> {
	let query = client
		.from("recent_artists")
		.select("*, artists(*)")
		.eq("user_id", userId)

	if (count) return query.limit(count)

	return query;
}