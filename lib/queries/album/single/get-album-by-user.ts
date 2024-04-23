import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { AlbumEntity } from "@/types/album";

export async function getAlbumByUser(
	client: SupabaseClient,
	userId: string
): Promise<PostgrestSingleResponse<AlbumEntity[]>> {
	return client
		.from("albums")
		.select("*")
		.eq("user_id", userId)
		.order("created_at", {
			ascending: false
		})
}