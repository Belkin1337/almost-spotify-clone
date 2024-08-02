import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { FollowedArtistType } from "@/types/artist";

export type GetFollowArtist = {
	client: SupabaseClient,
	userId?: string,
	artistId: string,
}

export async function getFollowArtist({
	artistId, userId, client
}: GetFollowArtist): Promise<PostgrestSingleResponse<FollowedArtistType>> {
	return client
		.from("followed_artists")
		.select("*")
		.eq("user_id", userId)
		.eq("artist_id", artistId)
		.single()
}