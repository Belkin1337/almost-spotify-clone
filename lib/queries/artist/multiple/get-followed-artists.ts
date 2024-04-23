import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { FollowedArtists } from "@/types/artist";

export async function getFollowedArtists(
	client: SupabaseClient,
	userId?: string
): Promise<PostgrestSingleResponse<FollowedArtists[]>> {
	return client
		.from("followed_artists")
		.select("*, artists(*)")
		.eq("user_id", userId)
		.order("created_at", {
			ascending: false
		})
}