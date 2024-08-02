import { useMutation } from "@tanstack/react-query";
import { SongAttributes } from "@/types/song";
import { deleteFileFromBuckets } from "@/lib/utils/file/delete-file-from-buckets";

export function useDeleteSongImage() {
	const deleteSongImageMutation = useMutation({
		mutationFn: async (
			{ image_path }: SongAttributes
		) => {
			if (image_path) {
				const { fileData } = await deleteFileFromBuckets({
					bucket: "images",
					path: image_path
				})

				return fileData;
			}
		}
	})

	return { deleteSongImageMutation }
}