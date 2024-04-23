import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { ArtistBySong } from "@/types/artist";

export async function getArtistBySong(
	client: SupabaseClient,
	songId?: string
): Promise<PostgrestSingleResponse<ArtistBySong[]>> {
	return client
		.from("song_artists")
		.select("*, artists(*)")
		.eq("song_id", songId)
}