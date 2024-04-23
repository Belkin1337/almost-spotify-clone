import { SupabaseClient } from "@supabase/supabase-js";

type GetFileFromImagesType = {
	client: SupabaseClient,
	image_path: string,
	bucket: string
}

export async function getFileFromImages({
	image_path,
	bucket,
	client
}: GetFileFromImagesType) {
	const { data, error } = await client
		.storage
		.from(bucket)
		.download(image_path)

	if (error) throw error;

	const url = URL.createObjectURL(data)

	return url;
}