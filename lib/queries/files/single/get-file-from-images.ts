import { SupabaseClient } from "@supabase/supabase-js";

export async function getFileFromImages({
	image_path,
	bucket,
	client
}: {
	client: SupabaseClient,
	image_path: string,
	bucket: string
}) {
	return client
		.storage
		.from(bucket)
		.download(image_path)
}