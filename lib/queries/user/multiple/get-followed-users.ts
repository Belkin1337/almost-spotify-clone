"use server"

import { UserEntity } from "@/types/user";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";

export async function getFollowedUsers(
	userId: string, count?: number,
): Promise<Array<UserEntity>> {
	const supabase = await createClient();
	
	let query = supabase
	.from("followed_users")
	.select("*, users(*)")
	.eq("initiator_id", userId)
	
	if (count) {
		query.limit(count)
	}
	
	const { data, error } = await query;
	
	if (error) {
		throw new Error(error.message)
	}
	
	return data.map(item => item.users);
}

export async function getFollowedUsersCount(
	userId: string,
): Promise<number> {
	const supabase = await createClient();
	
	let query = supabase
	.from("followed_users")
	.select("*", { count: "exact", head: true })
	.eq("initiator_id", userId)
	
	const { count, error } = await query;
	
	if (error) {
		throw new Error(error.message)
	}
	
	return count ?? 0;
}