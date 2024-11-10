import { useMutation } from "@tanstack/react-query";
import { SongAttributes } from "@/types/song";
import { uploadFileToBuckets } from "@/lib/utils/file/upload-file-to-buckets";
import { MESSAGE_ERROR_FILE_UPLOAD } from "@/lib/constants/messages/messages";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { getArrayBuffer } from "@/components/forms/artist/hooks/use-create-artist-image";
import { encode } from "base64-arraybuffer"
import uniqueId from "uniqid"

export function useUploadSongImage() {
	const { toast } = useToast();
	
	const createSongImageMutation = useMutation({
		mutationFn: async({ image, title }: SongAttributes) => {
			if (!image || !title) return;
			
			const uniq = uniqueId()
			const fileName = `song-image-${title}-${uniq}`
			const base64File = await getArrayBuffer(image)
			const encodedFile = encode(base64File)
			
			return uploadFileToBuckets({
				fileName, bucket: "images", file: encodedFile, contentType: "image/png"
			})
		},
		onSuccess: (data) => {
			if (!data) return toast({
				title: MESSAGE_ERROR_FILE_UPLOAD,
				variant: "red"
			})
		},
		onError: e => {throw new Error(e.message)}
	});
	
	return { createSongImageMutation }
}