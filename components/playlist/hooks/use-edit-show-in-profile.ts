import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserQuery } from "@/lib/query/user/user-query";
import { PlaylistEntity } from "@/types/playlist";
import { playlistByParamIdQueryKey } from "@/lib/querykeys/playlist";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";

const supabase = createClient();

export const useEditShowInProfile = () => {
	const [playlistId, setPlalistId] = useState('');
	const queryClient = useQueryClient();
	const { data: user } = useUserQuery();

	const editType = useMutation({
		mutationFn: async (
			playlist: PlaylistEntity
		) => {
			if (user) {
				const currentShow = playlist.attributes.is_show_profile;

				try {
					const { data: updatedPlaylist, error: updatedPlaylistError } = await supabase
						.from("playlists")
						.update({
							attributes: {
								is_show_profile: !currentShow
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
		}
	})

	return {
		editType
	}
}