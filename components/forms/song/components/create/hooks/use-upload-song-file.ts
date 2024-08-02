import { useMutation } from "@tanstack/react-query";
import { sanitizeName } from "@/lib/helpers/sanitaze-name";
import { SongAttributes } from "@/types/song";
import { uploadFileToBuckets } from "@/lib/utils/file/upload-file-to-buckets";

export function useUploadSongFile() {
	const createSongFileMutation = useMutation({
		mutationFn: async (
			values: SongAttributes
		) => {
			if (values.song) {
				const title = sanitizeName(values.title ? values.title : '');

				const { fileData } = await uploadFileToBuckets({
					type: "song",
					file: values.song,
					bucket: "songs",
					title: title
				})

				return fileData;
			}
		}
	});

	return { createSongFileMutation }
}