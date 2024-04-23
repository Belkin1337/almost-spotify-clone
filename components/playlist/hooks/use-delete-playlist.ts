import { useUserQuery } from "@/lib/query/user/user-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlaylistEntity } from "@/types/playlist";
import { userPlaylistsQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export const useDeletePlaylist = () => {
	const queryClient = useQueryClient()
	const { data: user } = useUserQuery();

	const deletePlaylistMutation = useMutation({
		mutationFn: async (
			playlist: PlaylistEntity
		) => {
			if (user) {
				try {
					const { error } = await supabase
						.from("playlists")
						.delete()
						.eq("id", playlist.id)
						.eq("user_id", user.id)

					if (error) {
						console.log(error.message)
						throw error;
					}
				} catch (error) {
					throw error;
				}
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: userPlaylistsQueryKey(user?.id!, true)
			})

			await queryClient.invalidateQueries({
				queryKey: userPlaylistsQueryKey(user?.id!, false)
			})
		}
	})

	return { deletePlaylist: deletePlaylistMutation }
}