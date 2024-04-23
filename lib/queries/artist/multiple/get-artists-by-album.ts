import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { ArtistsByAlbum } from "@/types/artist";

export async function getArtistsByAlbum(
	client: SupabaseClient,
	albumId: string
): Promise<PostgrestSingleResponse<ArtistsByAlbum[]>> {
	return client
		.from("album_artists")
		.select("*, artists(*)")
		.eq("album_id", albumId)
		.order("created_at", {
			ascending: false
		})
}