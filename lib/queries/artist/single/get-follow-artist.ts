import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { FollowedArtistType } from "@/types/artist";

export async function getFollowArtist(
	client: SupabaseClient,
	userId?: string,
	artistId?: string,
): Promise<PostgrestSingleResponse<FollowedArtistType>> {
	return client
		.from("followed_artists")
		.select("*")
		.eq("user_id", userId)
		.eq("artist_id", artistId)
		.single()
}