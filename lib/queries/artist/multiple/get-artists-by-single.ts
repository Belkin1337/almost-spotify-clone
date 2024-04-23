import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { ArtistsBySingle } from "@/types/artist";

export async function getArtistsBySingle(
	client: SupabaseClient,
	singleId: string
): Promise<PostgrestSingleResponse<ArtistsBySingle[]>> {
	return client
		.from("singles_artists")
		.select("*, artists(*)")
		.eq("single_id", singleId)
		.order("created_at", {
			ascending: false
		})
}