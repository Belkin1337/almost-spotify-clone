import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client/supabase-client";
import { PlaylistEntity } from "@/types/playlist";
import { playlistByParamIdQueryKey } from "@/lib/querykeys/playlist";
import { uploadFileToBuckets } from "@/lib/utils/file/upload-file-to-buckets";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { MESSAGE_ERROR_FILE_UPLOAD } from "@/lib/constants/messages/messages";

const supabase = createClient();

type CreatePlaylistImageQueryType = {
	imagePath: string,
	playlistId: string
}

async function createPlaylistImageQuery({
	imagePath,
	playlistId
}: CreatePlaylistImageQueryType) {
	const { data: imageData, error: createdPlaylistImageErr } = await supabase
		.from("playlists")
		.update({
			image_path: imagePath
		})
		.eq("id", playlistId)
		.select()

	if (createdPlaylistImageErr) throw createdPlaylistImageErr;

	return { imageData }
}

export const useUploadPlaylistImage = () => {
	const queryClient = useQueryClient();

	const { toast } = useToast();

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
					const { fileData } = await uploadFileToBuckets({
						title: playlist.title,
						type: "playlist",
						bucket: "images",
						file: image_file,
					})

					return fileData;
				} else if (image_path) {
					const { imageData } = await createPlaylistImageQuery({
						imagePath: image_path,
						playlistId: playlist.id
					})

					return imageData;
				}
			}
		},
		onSuccess: async (
			data,
			variables,
			context
		) => {
			await queryClient.invalidateQueries({
				queryKey: playlistByParamIdQueryKey(variables.playlist.id)
			})
		},
		onError: () => {
			toast({
				title: MESSAGE_ERROR_FILE_UPLOAD,
				variant: "red"
			})
		}
	})

	return { uploadPlaylistImageMutation }
}