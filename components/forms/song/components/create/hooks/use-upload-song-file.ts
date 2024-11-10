import { useMutation } from "@tanstack/react-query";
import { sanitizeName } from "@/lib/helpers/sanitaze-name";
import { SongAttributes } from "@/types/song";
import { uploadFileToBuckets } from "@/lib/utils/file/upload-file-to-buckets";
import { getArrayBuffer } from "@/components/forms/artist/hooks/use-create-artist-image";
import { encode } from "base64-arraybuffer"
import uniqueId from "uniqid"

export function useUploadSongFile() {
	const createSongFileMutation = useMutation({
		mutationFn: async(values: SongAttributes) => {
			if (!values.song) return;
			
			const uniq = uniqueId()
			const title = sanitizeName(values.title ? values.title : '');
			const fileName = `song-${title}-${uniq}`
			const base64File = await getArrayBuffer(values.song)
			const encodedFile = encode(base64File)
			
			return uploadFileToBuckets({
				fileName,
				file: encodedFile,
				bucket: "songs",
				contentType: "audio/mp4"
			})
		}
	});
	
	return { createSongFileMutation }
}