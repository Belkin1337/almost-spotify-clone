"use server"

import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { SingleEntity } from "@/types/single";

type CreateSingleQueryType = {
	userId: string,
	title: string,
	imagePath: string,
	artists: Array<string>,
	songId: string
}

type CreateSingleArtists = {
	singleId: string,
	artistId: string
}

type CreateSingleSongs = Pick<CreateSingleArtists, "singleId">
	& Pick<CreateSingleQueryType, "songId">

async function createSingleSongs({
	singleId, songId
}: CreateSingleSongs) {
	const supabase = await createClient()
	
	const { error } = await supabase
	.from("singles_songs")
	.insert({
		single_id: singleId, song_id: songId
	})
	
	if (error) {
		throw new Error(error.message)
	}
}

async function createSingleArtists({
	singleId, artistId
}: CreateSingleArtists) {
	const supabase = await createClient();
	
	const { error } = await supabase
	.from("singles_artists")
	.insert({
		single_id: singleId, artist_id: artistId
	})
	
	if (error) {
		throw new Error(error.message);
	}
}

export async function createSingle({
	imagePath, title, userId, artists, songId
}: CreateSingleQueryType) {
	const supabase = await createClient();
	
	const { data, error } = await supabase
	.from("singles")
	.insert({
		user_id: userId, title, image_url: imagePath,
	})
	.select()
	.single()
	
	if (error) {
		throw new Error(error.message)
	}
	
	const single = data as SingleEntity;
	
	if (single) {
		for (let i = 0; i < artists?.length; i++) {
			const artistId = artists ? artists[i] : "0";
			
			await createSingleArtists({ singleId: single.id, artistId })
		}
		
		await createSingleSongs({ songId, singleId: single.id })
	}
	
	return single
}