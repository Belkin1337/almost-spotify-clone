import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { ArtistEntity } from "@/types/artist";

export async function getArtistsByUserId(
	client: SupabaseClient,
	userId: string
): Promise<PostgrestSingleResponse<ArtistEntity[]>> {
	return client
		.from("artists")
		.select("*")
		.eq('user_id', userId)
		.order("created_at", {
			ascending: false,
		});
}