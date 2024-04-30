import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { UserEntity } from "@/types/user";

export async function getUsersByName(
	client: SupabaseClient,
	name: string,
	count?: number
): Promise<PostgrestSingleResponse<UserEntity[]>> {
	let query = client
		.from("users")
		.select("*")
		.ilike("full_name", `%${name}%`)
		.order("created_at", {
			ascending: false,
		});

	if (count) {
		return query.limit(count)
	} else {
		return query;
	}
}