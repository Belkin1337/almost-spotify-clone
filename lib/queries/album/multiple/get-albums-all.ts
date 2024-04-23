import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { AlbumEntity } from "@/types/album";

export async function getAlbumsAll(
	client: SupabaseClient,
	count?: number
): Promise<PostgrestSingleResponse<AlbumEntity[]>> {
	let query = client
		.from("albums")
		.select("*")
		.order("created_at", {
			ascending: false
		})

	if (count) {
		return query.limit(count)
	} else {
		return query;
	}
}