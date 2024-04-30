import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { PlaylistEntity } from "@/types/playlist";
import uniqid from "uniqid";
import { playlistByParamIdQueryKey } from "@/lib/querykeys/playlist";

const supabase = createClient();
const uniqueID = uniqid();

export const useUploadPlaylistImage = () => {
	const queryClient = useQueryClient();

	const uploadPlaylistImageMutation = useMutation({
		mutationFn: async ({
			playlist,
			image_file,
			image_path
		}: {
			playlist: PlaylistEntity,
			image_file?: File,
			image_path?: string
		}) => {
			if (playlist) {
				if (image_file) {
					const { data: imageData, error: imageErr } = await supabase
						.storage
						.from("images")
						.upload(`image-${playlist.title}-${uniqueID}`, image_file, {
							upsert: true,
							contentType: "fileBody"
						});

					if (imageErr) return;

					return imageData;
				} else if (image_path) {
					const { data: imageData, error } = await supabase
						.from("playlists")
						.update({
							image_path: image_path
						})
						.eq("id", playlist.id)

					if (error) return;

					return imageData;
				}
			}
		},
		onSuccess: async (data,
			variables,
			context) => {
			await queryClient.invalidateQueries({
				queryKey: playlistByParamIdQueryKey(variables.playlist.id)
			})
		}
	})

	return { uploadPlaylistImageMutation }
}