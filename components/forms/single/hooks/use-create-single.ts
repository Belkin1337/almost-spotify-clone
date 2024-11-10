import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SongAttributes, SongEntity } from "@/types/song";
import { USER_QUERY_KEY } from "@/lib/query/user/user-query";
import { SingleEntity } from "@/types/single";
import { UserEntity } from "@/types/user";

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

type CreateSingle = {
	song: SongEntity,
	imageData: { path: string },
	values: SongAttributes
}

export const useCreateSingle = () => {
	const qc = useQueryClient()
	const user = qc.getQueryData<UserEntity>(USER_QUERY_KEY)

	const createSingleMutation = useMutation({
		mutationFn: async ({
			song, imageData, values
		}: CreateSingle) => {
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