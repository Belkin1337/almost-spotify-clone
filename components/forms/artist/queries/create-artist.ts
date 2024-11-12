"use server"

import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";

type CreateArtist = {
	userId: string,
	values: Pick<ArtistAttributesType, "name" | "description">,
	imagePath: string,
	imageCoverPath?: string
}

export async function createArtist({
	imageCoverPath, values, userId, imagePath
}: CreateArtist) {
	const supabase = await createClient();
	
	const { data, error } = await supabase
	.from("artists")
	.insert({
		user_id: userId,
		name: values.name,
		description: values.description,
		avatar_path: imagePath,
		cover_image_path: imageCoverPath
	})
	.select("id")
	.single()

	if (error) throw new Error(error.message)
	
	return data
}