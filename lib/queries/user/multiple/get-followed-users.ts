import { PostgrestResponse, PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { UserEntity } from "@/types/user";

type FollowedUserType = {
	userId: string,
	users: Array<UserEntity>
}

type FollowedUserCountType = {
	count: number
}

export async function getFollowedUsers(
	client: SupabaseClient,
	userId: string,
	count?: number,
): Promise<PostgrestSingleResponse<FollowedUserType[]>> {
	let query = client
		.from("followed_users")
		.select("*, users(*)")
		.eq("initiator_id", userId)

	if (count) return query.limit(count)

	return query;
}

export async function getFollowedUsersCount(
	client: SupabaseClient,
	userId: string,
): Promise<PostgrestResponse<FollowedUserCountType>> {
	let query = client
		.from("followed_users")
		.select("*", { count: "exact", head: true })
		.eq("initiator_id", userId)

	return query;
}