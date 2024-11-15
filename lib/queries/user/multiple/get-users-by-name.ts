"use server"

import { UserEntity } from "@/types/user";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";

export async function getUsersByName(
	name: string, count?: number
): Promise<UserEntity[]> {
	const supabase = await createClient();
	
	let query = supabase
		.from("users")
		.select("*")
		.ilike("full_name", `%${name}%`)
		.order("created_at", { ascending: false });

	if (count) query.limit(count)
	
	const { data, error } = await query;
	
	if (error) {
		throw new Error(error.message)
	}
	
	return data;
}