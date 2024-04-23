import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { SingleEntity } from "@/types/single";

export async function getSingleById(
	client: SupabaseClient,
	singleId: string
): Promise<PostgrestSingleResponse<SingleEntity>> {
	return client
		.from("singles")
		.select("*")
		.eq("id", singleId)
		.single()
}