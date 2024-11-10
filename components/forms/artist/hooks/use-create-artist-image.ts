import { useMutation } from "@tanstack/react-query";
import { ArtistAttributesType } from "@/components/forms/artist/hooks/use-create-artist";
import { uploadFileToBuckets } from "@/lib/utils/file/upload-file-to-buckets";
import { MESSAGE_ERROR_FILE_UPLOAD } from "@/lib/constants/messages/messages";
import { useToast } from "@/lib/hooks/ui/use-toast";
import uniqueId from "uniqid"
import { encode } from "base64-arraybuffer"

export function getArrayBuffer(file: File): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		
		reader.onloadend = () => {
			const result = reader.result as ArrayBuffer;
			resolve(result);
		};
		
		reader.onerror = (error) => {
			reject(error);
		};
		
		reader.readAsArrayBuffer(file);
	});
}

export const useCreateArtistImage = () => {
	const { toast } = useToast();
	
	const uploadArtistImageMutation = useMutation({
		mutationFn: async(values: ArtistAttributesType) => {
			if (!values.avatar || !values.name) return;
			
			const uniq = uniqueId();
			const fileName = `artist-${uniq}`
			const base64File = await getArrayBuffer(values.avatar)
			const encodedFile = encode(base64File)
			
			return uploadFileToBuckets({
				fileName, file: encodedFile, bucket: "images", contentType: "image/png"
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
	
	return { uploadArtistImageMutation }
}