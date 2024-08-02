import { useMutation } from "@tanstack/react-query";
import { SongAttributes } from "@/types/song";
import { deleteFileFromBuckets } from "@/lib/utils/file/delete-file-from-buckets";

export function useDeleteSongFile() {
	const deleteSongFileMutation = useMutation({
		mutationFn: async (
			{ song_path }: SongAttributes
		) => {
			if (song_path) {
				const { fileData } = await deleteFileFromBuckets({
					bucket: "songs",
					path: song_path
				})

				return fileData;
			}
		}
	})

	return { deleteSongFileMutation }
}