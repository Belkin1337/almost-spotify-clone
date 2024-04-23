import { AlbumEntity } from "@/types/album";
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";

export async function getAlbumById(
	client: SupabaseClient,
	albumId: string
): Promise<PostgrestSingleResponse<AlbumEntity>> {
	return client
		.from('albums')
		.select('*')
		.eq('id', albumId)
		.single()
}