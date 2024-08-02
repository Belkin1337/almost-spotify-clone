import { SupabaseClient } from "@supabase/supabase-js";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";

export async function getUserAvatar(
	client: SupabaseClient,
	userId?: string
) {
	const { data, error } = await client
		.storage
		.from('users')
		.download(userId + '-avatar')

	if (error || 'error' in data) return nullAvatarImage;

	const avatar = URL.createObjectURL(data);

	return avatar;
}