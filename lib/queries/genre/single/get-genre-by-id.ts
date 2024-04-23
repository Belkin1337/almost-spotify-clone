import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { GenreType } from "@/lib/constants/shared/genres-list";

export async function getGenreById(
	client: SupabaseClient,
	genreId: string
): Promise<PostgrestSingleResponse<GenreType>> {
	return client
		.from("genres")
		.select()
		.eq("id", genreId)
		.single()
}