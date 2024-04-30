// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useUserQuery } from "@/lib/query/user/user-query";
// import { PlaylistEntity } from "@/types/playlist";
// import { playlistByParamIdQueryKey } from "@/lib/querykeys/playlist";
// import { createClient } from "@/lib/utils/supabase/client/supabase-client";
//
// const supabase = createClient();
//
// export const useEditShowInProfile = () => {
// 	const queryClient = useQueryClient();
//
// 	const { data: user } = useUserQuery();
//
// 	const editPlaylistTypeMutation = useMutation({
// 		mutationFn: async (playlist: PlaylistEntity) => {
// 			if (user) {
// 				const currentShow = playlist.attributes.is_show_profile;
//
// 				try {
// 					const { data: updatedPlaylist, error: updatedPlaylistError } = await supabase
// 						.from("playlists")
// 						.update({
// 							attributes: {
// 								is_show_profile: !currentShow
// 							}
// 						})
// 						.eq("user_id", user?.id)
// 						.eq("id", playlist.id)
// 						.select()
//
// 					if (updatedPlaylistError) throw updatedPlaylistError;
//
// 					if (updatedPlaylist && !updatedPlaylistError) {
// 						return updatedPlaylist as PlaylistEntity[]
// 					}
// 				} catch (error) {
// 					throw error;
// 				}
// 			}
// 		},
// 		onSuccess: async (variables) => {
// 			if (variables) {
// 				await queryClient.invalidateQueries({
// 					queryKey: playlistByParamIdQueryKey(variables[0].id)
// 				})
// 			}
// 		}
// 	})
//
// 	return { editPlaylistTypeMutation }
// }