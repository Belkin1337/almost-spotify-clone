"use server"

import { createClient } from "@/lib/utils/supabase/server/supabase-server";

export async function getUserById(id: string) {
	const supabase = await createClient();
	
	const { data, error } = await supabase
		.from("users")
		.select("*")
		.eq("id", id)
		.single()
	
	if (error) {
		throw new Error(error.message)
	}
	
	return data;
}