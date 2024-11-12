"use server"

import { ArtistEntity } from "@/types/artist";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";

export async function getArtistsByUserId(userId: string): Promise<ArtistEntity[]> {
	const supabase = await createClient();
	
	const { data, error } = await supabase
		.from("artists")
		.select("*")
		.eq('user_id', userId)
		.order("created_at", { ascending: false, });
	
	if (error) {
		throw new Error(error.message)
	}
	
	return data;
}