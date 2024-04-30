import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { UserEntity } from "@/types/user";

type FollowedUser = {
	userId: string,
	users: Array<UserEntity>
}

export async function getFollowedUsers(
	client: SupabaseClient,
	userId: string,
	count?: number
): Promise<PostgrestSingleResponse<FollowedUser[]>> {
	let query = client
		.from("followed_users")
		.select("*, users(*)")
		.eq("initiator_id", userId)

	if (count) {
		return query.limit(count)
	} else {
		return query;
	}
}