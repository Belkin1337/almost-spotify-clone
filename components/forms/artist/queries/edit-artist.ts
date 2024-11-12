"use server"

import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";

export type UpdateArtistQueryType = {
	userId: string,
	values: ArtistAttributesType
}

export async function updateArtist({
	userId, values
}: UpdateArtistQueryType) {
	const supabase = await createClient();
	
	if (!values) return;
	
	const { cover_image_path, avatar_path, name, description } = values;
	
	const { data, error } = await supabase
	.from("artists")
	.update({
		user_id: userId, title: name, description, avatar_path, cover_image_path,
	})
	.eq('id', values.id)
	.select();
	
	if (error) throw new Error(error.message)
	
	return data
}