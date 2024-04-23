import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { SongAttributes, SongEntity } from "@/types/song";
import { useUserQuery } from "@/lib/query/user/user-query";
import { SingleEntity } from "@/types/single";

const supabase = createClient();

export const useCreateSingle = () => {
	const { data: user } = useUserQuery();

	const createSIngleMutation = useMutation({
		mutationFn: async ({
			song,
			imageData,
			values
		}: {
			song: SongEntity,
			imageData: { path: string },
			values: SongAttributes
		}) => {
			try {
				const { data: newSingle, error: singleSongError } = await supabase
					.from("singles")
					.insert({
						user_id: user?.id,
						title: song.title,
						image_url: imageData.path,
					})
					.select()

				if (singleSongError) return;

				if (newSingle && !singleSongError) {
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
	})

	return { createSingleMutation: createSIngleMutation }
}