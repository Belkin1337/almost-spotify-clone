import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { SongAttributes, SongEntity } from "@/types/song";
import { useUserQuery } from "@/lib/query/user/user-query";
import { SingleEntity } from "@/types/single";

const supabase = createClient();

type CreateSingleQueryType = {
	userId: string,
	title: string,
	imagePath: string
}

async function createSingleQuery({
	imagePath,
	title,
	userId
}: CreateSingleQueryType) {
	const { data: newSingle, error: newSingleErr } = await supabase
		.from("singles")
		.insert({
			user_id: userId,
			title: title, // song title
			image_url: imagePath,
		})
		.select()

	if (newSingleErr) throw newSingleErr;

	return { newSingle }
}

export const useCreateSingle = () => {
	const { data: user } = useUserQuery();

	const createSingleMutation = useMutation({
		mutationFn: async ({
			song,
			imageData,
			values
		}: {
			song: SongEntity,
			imageData: { path: string },
			values: SongAttributes
		}) => {
			if (user) {
				try {
					const { newSingle } = await createSingleQuery({
						title: song.title,
						userId: user.id,
						imagePath: imageData.path
					})

					if (newSingle) {
						if (values.artists) {
							const single: SingleEntity = newSingle[0];

							const { error: singlesSongsError } = await supabase
								.from("singles_songs")
								.insert({
									single_id: single.id,
									song_id: song.id
								})

							if (singlesSongsError) return;

							for (let i = 0; i < values.artists?.length; i++) {
								const artistId = values.artists ? values.artists[i] : 0;

								const { error } = await supabase
									.from("singles_artists")
									.insert({
										single_id: single.id,
										artist_id: artistId
									})

								if (error) return;
							}
						}
					}
				} catch (error) {
					throw error;
				}
			}
		}
	})

	return { createSingleMutation }
}