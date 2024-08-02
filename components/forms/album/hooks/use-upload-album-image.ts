import { useMutation } from "@tanstack/react-query";
import { AlbumAttributes } from "@/components/forms/album/hooks/use-create-album";
import { uploadFileToBuckets } from "@/lib/utils/file/upload-file-to-buckets";
import { MESSAGE_ERROR_FILE_UPLOAD } from "@/lib/constants/messages/messages";
import { useToast } from "@/lib/hooks/ui/use-toast";

export const useUploadAlbumImage = () => {
	const { toast } = useToast();

	const uploadAlbumImageMutation = useMutation({
		mutationFn: async (values: AlbumAttributes) => {
			try {
				const { fileData } = await uploadFileToBuckets({
					bucket: "images",
					file: values.image_url,
					type: "album",
					title: values.title
				})

				return fileData;
			} catch (e) {
				throw e;
			}
		},
		onError: () => {
			toast({
				title: MESSAGE_ERROR_FILE_UPLOAD,
				variant: "red"
			})
		}
	});

	return { uploadAlbumImageMutation }
}