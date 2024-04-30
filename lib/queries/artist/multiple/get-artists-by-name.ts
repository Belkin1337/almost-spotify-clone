import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { ArtistEntity } from "@/types/artist";

export async function getArtistsByName(
	client: SupabaseClient,
	name: string,
	count: number = 10
): Promise<PostgrestSingleResponse<ArtistEntity[]>> {
	let query = client
		.from("artists")
		.select("*")
		.ilike("name", `%${name}%`)
		.order("created_at", {
			ascending: false,
		});

	if (count) return query.limit(count)

	return query;
}