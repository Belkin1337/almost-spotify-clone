import { SupabaseClient } from "@supabase/supabase-js";

export async function getUserAvatar(
	client: SupabaseClient,
	userId: string
) {
	return client
		.storage
		.from('users')
		.download(userId + '-avatar')
}