import { useMutation } from "@tanstack/react-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { uploadFileToBuckets } from "@/lib/utils/file/upload-file-to-buckets";
import { MESSAGE_ERROR_FILE_UPLOAD } from "@/lib/constants/messages/messages";
import { useToast } from "@/lib/hooks/ui/use-toast";
import { getArrayBuffer } from "@/components/forms/artist/hooks/use-create-artist-image";
import { encode } from "base64-arraybuffer"
import uniqueId from "uniqid"

export const useCreateArtistCoverImage = () => {
	const { toast } = useToast();
	
	const uploadArtistCoverImageMutation = useMutation({
		mutationFn: async(values: ArtistAttributesType) => {
			if (!values.cover_image || !values.name) return;
			
			const uniq = uniqueId();
			const fileName = `artist-${uniq}`
			const base64File = await getArrayBuffer(values.cover_image)
			const encodedFile = encode(base64File)
			
			return uploadFileToBuckets({
				file: encodedFile, bucket: "images", fileName, contentType: "image/png"
			})
		},
		onSuccess: (data) => {
			if (!data) return toast({
				title: MESSAGE_ERROR_FILE_UPLOAD,
				variant: "red"
			})
		},
		onError: e => {throw new Error(e.message)}
	})
	
	return { uploadArtistCoverImageMutation }
}