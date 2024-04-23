import { SupabaseClient } from "@supabase/supabase-js";

export async function getSongsBySingle(
	client: SupabaseClient,
	singleId: string
) {
	return client
		.from("singles_songs")
		.select("*, songs(*)")
		.eq("single_id", singleId)
		.order("created_at", {
			ascending: false
		})
}