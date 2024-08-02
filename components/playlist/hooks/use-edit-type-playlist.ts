import { useUserQuery } from "@/lib/query/user/user-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { PlaylistEntity } from "@/types/playlist";
import { playlistByParamIdQueryKey } from "@/lib/querykeys/playlist";
import { userPlaylistsQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export const useEditTypePlaylist = () => {
	const qc = useQueryClient();
	const { data: user } = useUserQuery();

	const editTypePlaylistMutation = useMutation({
		mutationFn: async (playlist: PlaylistEntity) => {
			if (user) {
				if (playlist.user_id === user.id) {
					const currentType = playlist.attributes.is_public;

					try {
						const { data, error } = await supabase
							.from("playlists")
							.update({
								attributes: { is_public: !currentType }
							})
							.eq("user_id", user?.id)
							.eq("id", playlist.id)
							.select()

						if (error) return;

						return data as PlaylistEntity[]
					} catch (error) {
						throw error;
					}
				}
			}
		},
		onSuccess: async (variables) => {
			if (variables) {
				await Promise.all([
					qc.invalidateQueries({ queryKey: playlistByParamIdQueryKey(variables[0].id) }),
					qc.invalidateQueries({ queryKey: userPlaylistsQueryKey(user?.id, true) }),
					qc.invalidateQueries({ queryKey: userPlaylistsQueryKey(user?.id, false) })
				])
			}
		},
		onError: (e) => { throw new Error(e.message) }
	})

	return { editTypePlaylistMutation }
}