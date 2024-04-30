import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { UserEntity } from "@/types/user";

export type FollowedUserQueryType = {
	responder_id: string,
	initiator_id: string,
	users: UserEntity[]
}

export async function getFollowedUser(
	client: SupabaseClient,
	userId?: string,
	responderId?: string,
): Promise<PostgrestSingleResponse<FollowedUserQueryType>> {
	return client
		.from("followed_users")
		.select("*, users(*)")
		.eq("initiator_id", userId)
		.eq("responder_id", responderId)
		.single()
}