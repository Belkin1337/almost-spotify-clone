import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { SongAttributes, SongEntity } from "@/types/song";
import { useDeleteSongFile } from "@/components/forms/song/hooks/use-delete-song-file";
import { useDeleteSongImage } from "@/components/forms/song/hooks/use-delete-song-image";
import { useUserQuery } from "@/lib/query/user/user-query";
import { userSongsQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export function useDeleteSong() {
	const queryClient = useQueryClient()
	const { data: user } = useUserQuery();

	const { deleteSongFile } = useDeleteSongFile()
	const { deleteSongImage } = useDeleteSongImage()

	const deleteSong = useMutation({
		mutationFn: async (
			values: SongAttributes
		) => {
			if (user) {
				try {
					await Promise.all([deleteSongFile.mutateAsync(values), deleteSongImage.mutateAsync(values)])

					const { data: deletedSong, error } = await supabase
						.from("songs")
						.delete()
						.eq('id', values.id)
						.select();

					if (deletedSong && !error) {
						return deletedSong as SongEntity[];
					}
				} catch (e) {
					throw e;
				}
			}
		},
		onSuccess: () => {
			return queryClient.invalidateQueries({
				queryKey: userSongsQueryKey(user?.id!)
			})
		}
	})

	return {
		deleteSong
	}
}