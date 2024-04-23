import { useUserQuery } from "@/lib/query/user/user-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { PlaylistEntity } from "@/types/playlist";
import { playlistByParamIdQueryKey } from "@/lib/querykeys/playlist";
import { useState } from "react";
import { userPlaylistsQueryKey } from "@/lib/querykeys/user";

const supabase = createClient();

export const useEditTypePlaylist = () => {
	const [playlistId, setPlalistId] = useState('');
	const queryClient = useQueryClient();
	const { data: user } = useUserQuery();

	const editType = useMutation({
		mutationFn: async (
			playlist: PlaylistEntity
		) => {
			if (user) {
				const currentType = playlist.attributes.is_public;

				try {
					const { data: updatedPlaylist, error: updatedPlaylistError } = await supabase
						.from("playlists")
						.update({
							attributes: {
								is_public: !currentType
							}
						})
						.eq("user_id", user?.id)
						.eq("id", playlist.id)
						.select()

					setPlalistId(playlist.id);

					if (updatedPlaylistError) {
						console.log(updatedPlaylistError.message)
						throw updatedPlaylistError;
					}

					if (updatedPlaylist) {
						return updatedPlaylist as PlaylistEntity[]
					}

				} catch (error) {
					throw error;
				}
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: playlistByParamIdQueryKey(playlistId)
			})

			queryClient.invalidateQueries({
				queryKey: userPlaylistsQueryKey(user?.id!, true)
			})

			queryClient.invalidateQueries({
				queryKey: userPlaylistsQueryKey(user?.id!, false)
			})
		}
	})

	return {
		editType
	}
}