import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { GenreType } from "@/lib/constants/shared/genres-list";

export async function getGenreList(
	client: SupabaseClient
): Promise<PostgrestSingleResponse<GenreType[]>> {
	return client
		.from("genres")
		.select("*")
}